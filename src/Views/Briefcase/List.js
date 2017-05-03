/**
 * @class crm.Views.Offline.List
 *
 * @extends argos._ListBase
 * @requires argos._ListBase
 *
 *
 */
import declare from 'dojo/_base/declare';
import _ListBase from 'argos/_ListBase';
import lang from 'dojo/_base/lang';
import format from '../../Format';
import MODEL_TYPES from 'argos/Models/Types';
import OfflineManager from 'argos/Offline/Manager';
import OfflineDetail from '../Offline/Detail';
import _ListOfflineMixin from 'argos/Offline/_ListOfflineMixin';
import getResource from 'argos/I18n';

const resource = getResource('briefcaseList');

export default declare('crm.Views.Briefcase', [_ListBase, _ListOfflineMixin], {
  id: 'briefcase_list',
  idProperty: 'id',
  detailView: 'offline_detail',
  enableSearch: false,
  enableActions: true,
  enableOfflineSupport: true,
  resourceKind: '',
  entityName: 'Briefcase',
  titleText: resource.titleText,
  pageSize: 1000,
  autoNavigateToBriefcase: true,
  itemTemplate: new Simplate([
    '<p class="listview-heading">{%: $$.getTitle($) %}</p>',
    '<p class="micro-text">{%: $$.getOfflineDate($) %}</p>',
  ]),
  refreshRequiredFor: function refreshRequiredFor() {
    return true;
  },
  getModel: function getModel() {
    const model = App.ModelManager.getModel('Briefcase', MODEL_TYPES.OFFLINE);
    return model;
  },
  getTitle: function getTitle(entry) {
    return entry && entry.description;
  },
  getOfflineDate: function getOfflineDate(entry) {
    if (entry && entry.modifyDate) {
      return format.relativeDate(entry.modifyDate);
    }
    return '';
  },
  _hasValidOptions: function _hasValidOptions(options) {
    return options;
  },
  createToolLayout: function createToolLayout() {
    const tools = {
      tbar: [{
        id: 'resync',
        svg: 'roles',
        action: 'briefCaseList',
        security: '',
      }],
    };
    return tools;
  },
  createIndicatorLayout: function createIndicatorLayout() {
    return [];
  },
  getItemIconClass: function getItemIconClass(entry) {
    let iconClass;
    iconClass = entry.iconClass;
    if (!iconClass) {
      iconClass = 'url';
    }
    return iconClass;
  },
  navigateToDetailView: function navigateToDetailView(key, descriptor, additionalOptions) {
    const entry = this.entries && this.entries[key];
    this.navigateToOfflineDetailView(entry, additionalOptions);
  },
  navigateToOnlineDetailView: function navigateToDetailView(entry, additionalOptions) {
    const view = this.app.getView(entry.viewId);

    let options = {
      descriptor: entry.description, // keep for backwards compat
      title: entry.description,
      key: entry.entityId,
      fromContext: this,
    };

    if (additionalOptions) {
      options = lang.mixin(options, additionalOptions);
    }

    if (view) {
      view.show(options);
    }
  },
  navigateToOfflineDetailView: function navigateToOfflineDetailView(entry, additionalOptions) {
    const view = this.getDetailView(entry.entityName);
    let options = {
      descriptor: entry.description, // keep for backwards compat
      title: entry.description,
      key: entry.entityId,
      fromContext: this,
      offlineContext: {
        entityId: entry.entityId,
        entityName: entry.entityName,
        viewId: entry.viewId,
        source: entry,
      },
    };
    if (additionalOptions) {
      options = lang.mixin(options, additionalOptions);
    }

    if (view) {
      view.show(options);
    }
  },
  getDetailView: function getDetailView(entityName) {
    const viewId = `${this.detailView}_${entityName}`;
    let view = this.app.getView(viewId);

    if (view) {
      return view;
    }

    this.app.registerView(new OfflineDetail({ id: viewId }));
    view = this.app.getView(viewId);
    return view;
  },
  createActionLayout: function createActionLayout() {
    return this.actions || (this.actions = [{
      id: 'remove',
      cls: 'fa fa-remove fa-2x',
      label: resource.removeText,
      action: 'removeItemAction',
    }, {
      id: 'resync',
      cls: 'fa fa-suitcase fa-2x',
      label: resource.reBriefcaseText,
      action: 'reBriefcaseItemAction',
    }, {
      id: 'navToOnline',
      cls: 'fa fa-level-down fa-2x',
      label: resource.goToOnlineText,
      action: 'navToOnlineView',
    }, {
      id: 'navToOffline',
      cls: 'fa fa-level-down fa-2x',
      label: resource.goToOfflineText,
      action: 'navToOfflineView',
    }]);
  },
  navToOnlineView: function navToOnlineVie(action, selection) {
    const briefcaseId = selection.tag.attributes['data-key'].value;
    const briefcase = this.entries[briefcaseId];
    this.navigateToOnlineDetailView(briefcase);
  },
  navToOfflineView: function navToOfflineView(action, selection) {
    const briefcaseId = selection.tag.attributes['data-key'].value;
    const briefcase = this.entries[briefcaseId];
    this.navigateToOfflineDetailView(briefcase);
  },
  removeItemAction: function removeItemAction(action, selection) { // eslint-disable-line
    const briefcaseId = selection.tag.attributes['data-key'].value;
    OfflineManager.removeBriefcase(briefcaseId).then(() => {
      this.clear();
      this.refreshRequired = true;
      this.refresh();
    }, (error) => {
      console.error(error);// eslint-disable-line
    });
  },
  reBriefcaseItemAction: function reBriefcase(action, selection) { // eslint-disable-line
    const briefcaseId = selection.tag.attributes['data-key'].value;
    const briefcase = this.entries[briefcaseId];
    if (briefcase) {
      this.briefCaseItem(briefcase);
    }
  },
  onListBriefcased: function onListBriefcased() {
    this.clear();
    this.refreshRequired = true;
    this.refresh();
  },
  createBriefcaseEntity: function createBriefcaseEntity(entry) {
    const entity = {
      entityId: entry.entityId,
      entityName: entry.entityName,
      options: {
        includeRelated: true,
        viewId: entry.viewId,
        iconClass: entry.iconClass,
      },
    };
    return entity;
  },
  isDisabled: function isDisabled() {
    return !App.enableOfflineSupport;
  },
});

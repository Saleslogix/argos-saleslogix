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
import _CardLayoutListMixin from '../_CardLayoutListMixin';
import lang from 'dojo/_base/lang';
import format from '../../Format';
import MODEL_TYPES from 'argos/Models/Types';

export default declare('crm.Views.Briefcase', [_ListBase, _CardLayoutListMixin], {
  id: 'briefcase_list',
  idProperty: 'id',
  detailView: 'briefcase_detail',
  enableSearch: false,
  enableActions: true,
  enableOfflineSupport: true,
  resourceKind: '',
  entityName: 'Briefcase',
  titleText: 'My Briefcase',

  itemTemplate: new Simplate([
    '<h3>{%: $$.getTitle($) %}</h3>',
    '<h4>{%: $$.getOfflineDate($) %}</h4>',
  ]),
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
  createIndicatorLayout: function createIndicatorLayout() {
    return [];
  },
  getItemIconClass: function getItemIconClass(entry) {
    let iconClass;
    iconClass = entry.iconClass;
    if (!iconClass) {
      iconClass = 'fa fa-cloud fa-2x';
    }
    return iconClass;
  },
  navigateToDetailView: function navigateToDetailView(key, descriptor, additionalOptions) {
    const entry = this.entries && this.entries[key];
    const detailViewId = this.getDetailViewId(entry);
    const view = this.app.getView(detailViewId);

    let options = {
      descriptor: entry.description, // keep for backwards compat
      title: entry.description,
      key: entry.entitiyId,
      fromContext: this,
    };

    if (additionalOptions) {
      options = lang.mixin(options, additionalOptions);
    }

    if (view) {
      view.show(options);
    }
  },
  getDetailViewId: function getDetailViewId(entry) {
    if (entry.viewId) {
      return entry.viewId;
    }
    return this.detailView;
  },
});

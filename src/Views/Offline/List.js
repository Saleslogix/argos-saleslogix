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
import format from '../../Format';
import lang from 'dojo/_base/lang';
import MODEL_TYPES from 'argos/Models/Types';
import OfflineDetail from './Detail';
import getResource from 'argos/I18n';

const resource = getResource('offlineList');

export default declare('crm.Views.Offline.List', [_ListBase], {
  id: 'offline_list',
  detailView: 'offline_detail',
  enableSearch: false,
  enableActions: true,
  resourceKind: '',
  entityName: '',
  titleText: resource.titleText,
  offlineText: resource.offlineText,
  pageSize: 1000,
  itemIndicatorTemplate: new Simplate([
    '<span{% if ($.iconCls) { %} class="{%= $.iconCls %}" {% } %} style="color:black; margin:0" >',
    '{% if ($.showIcon === false) { %}',
    '{%: $.label + " " +  $.valueText %}',
    '{% } else if ($.indicatorIcon && !$.iconCls) { %}',
    '<img src="{%= $.indicatorIcon %}" alt="{%= $.label %}" />',
    '{% } %}',
    '</span>',
  ]),
  itemTemplate: new Simplate([
    '<p>{%: $$.getDescription($) %}</p>',
    '<p class="micro-text">{%: $$.getOfflineDate($) %}</p>',
  ]),
  getDescription: function getDescription(entry) {
    return this._model.getEntityDescription(entry);
  },
  getOfflineDate: function getOfflineDate(entry) {
    if (entry && entry.$offlineDate) {
      return format.relativeDate(entry.$offlineDate);
    }
    return '';
  },
  getItemIconClass: function getItemIconClass(entry) {
    let iconClass;
    iconClass = this._model.getIconClass(entry);
    if (!iconClass) {
      iconClass = 'url';
    }
    return iconClass;
  },
  show: function show(options) {
    this._initOfflineView(options);
    this.inherited(arguments);
  },
  _initOfflineView: function _initOfflineView(options) {
    this.offlineContext = {
      parentEntry: null,
      parentEntityId: null,
      entityName: null,
      entityId: null,
      viewId: null,
      source: null,
    };
    this.refreshRequired = true;
    lang.mixin(this.offlineContext, options.offlineContext);
    this._model = App.ModelManager.getModel(this.offlineContext.entityName, MODEL_TYPES.OFFLINE);
    this._entityView = this.getEntityView();
    if (this._entityView && this._entityView._clearGroupMode && this._entityView.groupsMode) {
      this._entityView._clearGroupMode(); // For list views that are left in group mode we need to reset to use the card template.
    }
  },
  onTransitionTo: function onTransitionTo() {
    this.inherited(arguments);
    App.setToolBarMode(false);
  },
  _buildQueryExpression: function _buildQueryExpression() {
    if (this.offlineContext && this.offlineContext.queryExpression) {
      return this.offlineContext.queryExpression;
    }
  },
  _hasValidOptions: function _hasValidOptions(options) {
    return options;
  },
  createToolLayout: function createToolLayout() {
    this.toolsAdded = false;
    return { tbar: [] };
  },
  createIndicatorLayout: function createIndicatorLayout() {
    return this.itemIndicators || (this.itemIndicators = [{
      id: 'offline',
      showIcon: false,
      location: 'top',
      onApply: function onApply(entry, view) {
        this.isEnable = true;
        this.valueText = view.getOfflineDate(entry);
        this.label = view.offlineText;
      },
    }]);
  },
  getEntityView: function getEntityView() {
    const newViewId = `${this.id}_${this.offlineContext.viewId}`;
    const view = App.getView(this.offlineContext.viewId);

    if (this._entityView) {
      this._entityView.destroy();
      this._entityView = null;
    }

    if (view) {
      const ViewCtor = view.constructor;
      this._entityView = new ViewCtor({ id: newViewId });
    }
    return this._entityView;
  },
  createItemRowNode: function createItemRowNode(entry) {
    if (this._entityView) {
      return this._entityView.createItemRowNode(entry);
    }
    return this.inherited(arguments);
  },
  navigateToDetailView: function navigateToDetailView(key, descriptor, additionalOptions) {
    this.navigateToOfflineDetailView(key, descriptor, additionalOptions);
  },
  navigateToOfflineDetailView: function navigateToOfflineDetailView(key, descriptor, additionalOptions) {
    const entry = this.entries && this.entries[key];
    const desc = this.getDescription(entry);
    const view = this.getDetailView();
    let options = {
      descriptor: entry.description || desc, // keep for backwards compat
      title: entry.description || desc,
      key,
      fromContext: this,
      offlineContext: {
        entityId: this._model.getEntityId(entry),
        entityName: this._model.entityName,
        viewId: this._model.detailViewId,
        offlineDate: entry.$offlineDate,
        source: entry,
      },
    };
    if (additionalOptions) {
      options = lang.mixin(options, additionalOptions);
    }

    // Ensure we have a valid offline detail view and the
    // entity has a detail view that it can use for layout.
    const modelDetailView = this._model.detailViewId;
    const impliedDetailView = `${this._model.entityName.toLowerCase()}_detail`;
    if (view && App.getView(modelDetailView || impliedDetailView)) {
      view.show(options);
    }
  },
  getDetailView: function getDetailView() {
    const viewId = `${this.detailView}_${this._model.entityName}`;
    let view = this.app.getView(viewId);

    if (view) {
      return view;
    }

    this.app.registerView(new OfflineDetail({ id: viewId }));
    view = this.app.getView(viewId);
    return view;
  },

});

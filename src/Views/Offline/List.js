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
import format from '../../Format';
import lang from 'dojo/_base/lang';
import MODEL_TYPES from 'argos/Models/Types';

export default declare('crm.Views.Offline.List', [_ListBase, _CardLayoutListMixin], {
  id: 'offline_list',
  detailView: 'offline_detail',
  enableSearch: false,
  enableActions: true,
  resourceKind: '',
  entityName: '',
  titleText: '',

  itemTemplate: new Simplate([
    '<h3>{%: $$.getDescription($) %}</h3>',
    '<h4>{%: $$.getOfflineDate($) %}</h4>',
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
      iconClass = 'fa fa-cloud fa-2x';
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
  },
  _buildQueryExpression: function _buildQueryExpression() {
    return this.offlineContext.queryExpression;
  },
  _hasValidOptions: function _hasValidOptions(options) {
    return options;
  },
  createIndicatorLayout: function createIndicatorLayout() {
    return [];
  },
  getDetailViewId: function getDetailViewId(entry) {
    if (entry && entry.viewId) {
      return entry.viewId;
    }
    return this.detailView;
  },
  getEntityView: function getEntityView() {
    return App.getView(this.offlineContext.viewId);
  },
  createItemRowNode: function createItemRowNode(entry) {
    const view = this.getEntityView();
    if (view) {
      return view.createItemRowNode(entry);
    }
    return this.inherited(arguments);
  },
});

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
import OfflineManager from 'argos/Offline/Manager';
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
      parentEntity: null,
      parentEntityId: null,
      entityName: null,
      entityId: null,
      viewId: null,
      source: null,
    };
    this.refreshRequired = true;
    lang.mixin(this.offlineContext, options.offlineContext);
    this._model = App.ModelManager.getModel(this.offlineContext.entityName, MODEL_TYPES.OFFLINE);

    const views = App.getViews()
      .filter((view) => {
        return view.id === this.offlineContext.viewId;
      });

    this._entityView = views[0];
    // this.itemTemplate  = this._entityView.itemTemplate;
  },
  _xbuildQueryExpression: function _xbuildQueryExpression() {
    return function queryFn(doc, emit) {
      emit(doc.modifyDate);
    };
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
});

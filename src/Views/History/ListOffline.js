import declare from 'dojo/_base/declare';
import _ListBase from 'argos/_ListBase';
import MODEL_TYPES from 'argos/Models/Types';
import getResource from 'argos/I18n';
import MODEL_NAMES from '../../Models/Names';

const resource = getResource('historyListOffline');

const __class = declare('crm.Views.Account.ListOffline', [_ListBase], {
  // Localization
  titleText: resource.titleText,

  // Templates
  itemTemplate: new Simplate([`
    <p>{%: $.Text %}</p>
  `]),

  // View Properties
  detailView: 'history_detail_offline',
  id: 'history_list_offline',
  security: 'Entities/Account/View',
  insertView: 'history_edit_offline',
  editView: 'history_edit',
  entityName: 'History',
  pageSize: 100,
  resourceKind: 'history',
  modelName: MODEL_NAMES.HISTORY,
  enableOfflineSupport: true,
  enableOnlineSupport: true,
  enableSearch: false,
  expose: true,
  labelProperty: 'Text',
  enableActions: true,
  query: function query(doc, emit) {
    if (doc && doc.entity && typeof doc.entity.Text === 'string') {
      emit(doc);
    }
  },
  getIdentity: function getIdentity(entry) {
    return entry && entry.$offlineDate;
  },
  getTitle: function getTitle() {
    return resource.widgetTitle;
  },
  getModel: function getModel() {
    const model = App.ModelManager.getModel(MODEL_NAMES.HISTORY, MODEL_TYPES.OFFLINE);
    return model;
  },
  createActionLayout: function createActionLayout() {
    return this.actions || (this.actions = [{
      id: 'edit',
      cls: 'edit',
      label: resource.saveToCRMText,
      security: 'Entities/Account/Edit',
      action: 'navigateToEditView',
      enabled: function enabled() {
        return App.isOnline();
      },
    }]);
  },
  navigateToEditView: function navigateToEditView(action, selection) {
    const view = this.app.getView(this.editView);
    const key = selection.data[this.idProperty];
    const options = {
      key,
      selectedEntry: selection.data,
      fromContext: this,
      insert: true,
      fromOffline: true,
    };

    if (view) {
      view.show(options);
    }
  },
  show: function show() {
    this.refreshRequired = true;
    this.inherited(arguments);
  },
  _onRefresh: function _onRefresh(args) {
    this.inherited(arguments);
    if (typeof args === 'undefined' || args === null) {
      return;
    }

    const entry = args.data;
    if (typeof entry === 'undefined' || entry == null) {
      return;
    }

    if (args.resourceKind === 'history' && typeof args.id === 'undefined' && typeof args.key === 'undefined') {
      entry.UID = args.UID;
      this.removeEntry(entry);
      this.refreshRequired = true;
    }

    // Edit will pass response message from pouch that the data was saved: { ok: true, ... }
    if (entry.ok === true) {
      this.refreshRequired = true;
    }
  },
  removeEntry: function removeEntry(entry) {
    const model = this.getModel();
    model.deleteEntry(entry);
  },
});

export default __class;

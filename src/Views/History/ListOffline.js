import declare from 'dojo/_base/declare';
import _ListBase from 'argos/_ListBase';
import MODEL_TYPES from 'argos/Models/Types';
import getResource from 'argos/I18n'; // eslint-disable-line
import MODEL_NAMES from '../../Models/Names';

const __class = declare('crm.Views.Account.ListOffline', [_ListBase], {
  // Localization
  titleText: 'Offline Notes',

  // Templates
  itemTemplate: new Simplate([`
    <p>time: {%: Locale.formatDate($.StartDate) %}</p>
  `]),

  // View Properties
  detailView: 'history_detail_offline',
  id: 'history_list_offline',
  security: 'Entities/Account/View',
  insertView: 'history_edit_offline',
  entityName: 'History',
  pageSize: 100,
  resourceKind: 'history',
  modelName: MODEL_NAMES.HISTORY,
  enableOfflineSupport: true,
  enableOnlineSupport: true, // TODO: don't show this when online, set to false when done testing.
  enableSearch: false,
  expose: true,
  labelProperty: 'Text',

  getModel: function getModel() {
    const model = App.ModelManager.getModel(MODEL_NAMES.HISTORY, MODEL_TYPES.OFFLINE);
    return model;
  },
});

export default __class;

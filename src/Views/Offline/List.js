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
import Store from 'argos/Store/PouchDB';

export default declare('crm.Views.Offline.List', [_ListBase], {
  id: 'offline_list',
  idProperty: 'id',
  detailView: 'offline_detail',
  offlineSupport: true,

  titleText: 'Recently Viewed',

  OFFLINE_DB_NAME: 'crm-offline',

  itemTemplate: new Simplate([
    '<h3>{%: $$.getTitle($) %}</h3>',
  ]),

  getTitle: function getTitle(entry) {
    return entry && entry.doc && entry.doc.entity && entry.doc.entity.$descriptor;
  },

  // TODO: Move to a mixin
  createStore: function createStore() {
    return new Store({
      databaseName: this.OFFLINE_DB_NAME,
    });
  },
  _buildQueryExpression: function _buildQueryExpression() {
    return function queryFn(doc, emit) {
      emit(doc);
    };
  },
  _applyStateToQueryOptions: function _applyStateToQueryOptions(queryOptions) {
    queryOptions.include_docs = true;
    return queryOptions;
  },
});

/**
 * @class crm.Views.Offline.Detail
 *
 *
 * @extends argos._DetailBase
 * @requires argos._DetailBase
 *
 */
import declare from 'dojo/_base/declare';
import _DetailBase from 'argos/_DetailBase';
import Store from 'argos/Store/PouchDB';

export default declare('crm.Views.Offline.Detail', [_DetailBase], {
  id: 'offline_detail',
  titleText: 'Recently Viewed Detail',

  idProperty: 'id',
  offlineSupport: true,

  OFFLINE_DB_NAME: 'crm-offline',
  offlineDoc: null,
  createStore: function createStore() {
    return new Store({
      databaseName: this.OFFLINE_DB_NAME,
    });
  },
  _applyStateToGetOptions: function _applyStateToGetOptions() {},
  _buildGetExpression: function _buildGetExpression() {
    const options = this.options;
    return options && (options.id || options.key);
  },
  preProcessEntry: function preProcessEntry(entry) {
    this.offlineDoc = entry;
    return entry.entity;
  },
  createLayout: function createLayout() {
    const views = App.getViews().filter((view) => {
      return view.id === this.offlineDoc.storedBy && view.createLayout;
    });

    const view = views[0];
    let layout = [];
    if (view) {
      view.entry = this.entry.entity;
      layout = view.createLayout.apply(view);
    }

    return layout;
  },
});

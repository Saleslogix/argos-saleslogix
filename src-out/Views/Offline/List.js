define('crm/Views/Offline/List', ['exports', 'module', 'dojo/_base/declare', 'argos/_ListBase', '../_CardLayoutListMixin', './_OfflineRightDrawerListMixin', 'argos/Store/PouchDB'], function (exports, module, _dojo_baseDeclare, _argos_ListBase, _CardLayoutListMixin2, _OfflineRightDrawerListMixin2, _argosStorePouchDB) {
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  /**
   * @class crm.Views.Offline.List
   *
   * @extends argos._ListBase
   * @requires argos._ListBase
   *
   *
   */

  var _declare = _interopRequireDefault(_dojo_baseDeclare);

  var _ListBase2 = _interopRequireDefault(_argos_ListBase);

  var _CardLayoutListMixin3 = _interopRequireDefault(_CardLayoutListMixin2);

  var _OfflineRightDrawerListMixin3 = _interopRequireDefault(_OfflineRightDrawerListMixin2);

  var _Store = _interopRequireDefault(_argosStorePouchDB);

  module.exports = (0, _declare['default'])('crm.Views.Offline.List', [_ListBase2['default'], _CardLayoutListMixin3['default'], _OfflineRightDrawerListMixin3['default']], {
    id: 'offline_list',
    idProperty: 'id',
    detailView: 'offline_detail',
    offlineSupport: true,
    enableSearch: false,
    enableActions: true,

    titleText: 'Recently Viewed',

    OFFLINE_DB_NAME: 'crm-offline',

    itemTemplate: new Simplate(['<h3>{%: $$.getTitle($) %}</h3>']),

    getTitle: function getTitle(entry) {
      return entry && entry.doc && entry.doc.entity && entry.doc.entity.$descriptor;
    },

    // TODO: Move to a mixin
    createStore: function createStore() {
      return new _Store['default']({
        databaseName: this.OFFLINE_DB_NAME
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
    createIndicatorLayout: function createIndicatorLayout() {
      return [];
    },
    getItemIconClass: function getItemIconClass(entry) {
      var entityName = entry.doc.entityName;

      var mapping = this.entityMappings[entityName];
      var iconClass = mapping.iconClass;

      var results = '';
      if (iconClass) {
        results = 'fa ' + iconClass + ' fa-2x';
      }
      return results;
    },
    activateEntityFilter: function activateEntityFilter(entityName) {
      // TODO: Filter and refresh the view.
      return entityName;
    },
    // Localization
    entityText: {
      'Contact': 'Contacts',
      'Account': 'Accounts',
      'Opportunity': 'Opportunities',
      'Ticket': 'Tickets',
      'Lead': 'Leads',
      'Activity': 'Activities',
      'History': 'History'
    },
    entityMappings: {
      'Contact': {
        iconClass: 'fa-user'
      },
      'Account': {
        iconClass: 'fa-building-o'
      },
      'Opportunity': {
        iconClass: 'fa-money'
      },
      'Ticket': {
        iconClass: 'fa-clipboard'
      },
      'Lead': {
        iconClass: 'fa-filter'
      },
      'Activity': {
        iconClass: 'fa-calendar-o'
      },
      'History': {
        iconClass: 'fa-history'
      }
    }
  });
});

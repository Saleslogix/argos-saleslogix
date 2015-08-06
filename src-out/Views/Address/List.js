define('crm/Views/Address/List', ['exports', 'module', 'dojo/_base/declare', 'dojo/_base/lang', 'dojo/string', 'dojo/dom-attr', 'dojo/query', '../../Format', 'argos/List'], function (exports, module, _dojo_baseDeclare, _dojo_baseLang, _dojoString, _dojoDomAttr, _dojoQuery, _Format, _argosList) {
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _declare = _interopRequireDefault(_dojo_baseDeclare);

  var _lang = _interopRequireDefault(_dojo_baseLang);

  var _string = _interopRequireDefault(_dojoString);

  var _domAttr = _interopRequireDefault(_dojoDomAttr);

  var _query = _interopRequireDefault(_dojoQuery);

  var _format = _interopRequireDefault(_Format);

  var _List = _interopRequireDefault(_argosList);

  /**
   * @class crm.Views.Address.List
   *
   * @extends argos.List
   *
   * @requires argos.List
   *
   * @requires crm.Format
   *
   */
  var __class = (0, _declare['default'])('crm.Views.Address.List', [_List['default']], {
    // Templates
    itemTemplate: new Simplate(['<h3>{%: $.$descriptor %}</h3>', '<h4>{%= crm.Format.address($, true) %}</h4>']),

    // Localization
    titleText: 'Addresses',

    // View Properties
    detailView: null,
    id: 'address_list',
    security: null, // 'Entities/Address/View',
    insertSecurity: 'Entities/Address/Add',
    insertView: 'address_edit',
    resourceKind: 'addresses',
    allowSelection: true,
    enableActions: true,

    formatSearchQuery: function formatSearchQuery(searchQuery) {
      return _string['default'].substitute('(Description like "${0}%" or City like "${0}%")', [this.escapeSearchQuery(searchQuery.toUpperCase())]);
    },
    // Disable Add/Insert on toolbar
    createToolLayout: function createToolLayout() {
      return this.tools || (this.tools = {
        tbar: []
      });
    },
    selectEntry: function selectEntry(params) {
      var row = (0, _query['default'])(params.$source).closest('[data-key]')[0];
      var key = row ? _domAttr['default'].get(row, 'data-key') : false;

      if (this._selectionModel && key) {
        App.showMapForAddress(_format['default'].address(this.entries[key], true, ' '));
      }
    }
  });

  _lang['default'].setObject('Mobile.SalesLogix.Views.Address.List', __class);
  module.exports = __class;
});

define('crm/Views/Event/List', ['exports', 'module', 'dojo/_base/declare', 'dojo/_base/lang', 'dojo/string', 'crm/Format', 'argos/List'], function (exports, module, _dojo_baseDeclare, _dojo_baseLang, _dojoString, _crmFormat, _argosList) {
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    var _declare = _interopRequireDefault(_dojo_baseDeclare);

    var _lang = _interopRequireDefault(_dojo_baseLang);

    var _string = _interopRequireDefault(_dojoString);

    var _format = _interopRequireDefault(_crmFormat);

    var _List = _interopRequireDefault(_argosList);

    /**
     * @class crm.Views.Event.List
     *
     * @extends argos.List
     *
     * @requires crm.Format
     */
    var __class = (0, _declare['default'])('crm.Views.Event.List', [_List['default']], {
        // Localization
        titleText: 'Events',
        eventDateFormatText: 'M/D/YYYY',
        eventText: 'Event',

        //Templates
        itemTemplate: new Simplate(['<h3>{%= $.Description %}</h3>', '<h4>', '{%: crm.Format.date($.StartDate, $$.eventDateFormatText) %}', '&nbsp;-&nbsp;', '{%: crm.Format.date($.EndDate, $$.eventDateFormatText) %}', '</h4>']),

        //View Properties
        id: 'event_list',
        security: null, //'Entities/Event/View',
        detailView: 'event_detail',
        insertView: 'event_edit',
        queryOrderBy: 'StartDate asc',
        queryWhere: null,
        querySelect: ['Description', 'StartDate', 'EndDate', 'UserId', 'Type'],
        resourceKind: 'events',

        formatSearchQuery: function formatSearchQuery(searchQuery) {
            return _string['default'].substitute('upper(Description) like "%${0}%"', [this.escapeSearchQuery(searchQuery.toUpperCase())]);
        }
    });

    _lang['default'].setObject('Mobile.SalesLogix.Views.Event.List', __class);
    module.exports = __class;
});

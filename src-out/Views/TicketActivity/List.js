define('crm/Views/TicketActivity/List', ['exports', 'module', 'dojo/_base/declare', 'dojo/_base/array', 'dojo/string', 'dojo/dom-style', 'dojo/dom-geometry', 'dojo/query', 'dojo/topic', 'dojo/_base/lang', '../../Format', 'argos/List'], function (exports, module, _dojo_baseDeclare, _dojo_baseArray, _dojoString, _dojoDomStyle, _dojoDomGeometry, _dojoQuery, _dojoTopic, _dojo_baseLang, _Format, _argosList) {
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    var _declare = _interopRequireDefault(_dojo_baseDeclare);

    var _array = _interopRequireDefault(_dojo_baseArray);

    var _string = _interopRequireDefault(_dojoString);

    var _domStyle = _interopRequireDefault(_dojoDomStyle);

    var _domGeom = _interopRequireDefault(_dojoDomGeometry);

    var _query = _interopRequireDefault(_dojoQuery);

    var _topic = _interopRequireDefault(_dojoTopic);

    var _lang = _interopRequireDefault(_dojo_baseLang);

    var _format = _interopRequireDefault(_Format);

    var _List = _interopRequireDefault(_argosList);

    /**
     * @class crm.Views.TicketActivity.List
     *
     * @extends argos.List
     *
     * @requires crm.Format
    */
    var __class = (0, _declare['default'])('crm.Views.TicketActivity.List', [_List['default']], {
        //Templates
        itemTemplate: new Simplate(['<h3>{%: $.Ticket.TicketNumber %}</h3>', '<h4>{%: crm.Format.date($.AssignedDate, $$.startDateFormatText) %}</h4>', '<div class="note-text-item">', '<div class="note-text-wrap">', '{%: $.ActivityDescription %}', '</div>', '<div class="note-text-more"></div>', '</div>']),

        //Localization
        titleText: 'Ticket Activities',
        startDateFormatText: 'MM/DD/YYYY h:mm A',

        //View Properties
        id: 'ticketactivity_list',
        security: 'Entities/TicketActivity/View',
        expose: false,
        detailView: 'ticketactivity_detail',
        insertView: 'ticketactivity_edit',
        queryOrderBy: 'AssignedDate asc',
        querySelect: ['ActivityDescription', 'ActivityTypeCode', 'AssignedDate', 'CompletedDate', 'ElapsedUnits', 'FollowUp', 'PublicAccessCode', 'Rate', 'RateTypeDescription/Amount', 'RateTypeDescription/RateTypeCode', 'RateTypeDescription/TypeDescription', 'TotalFee', 'TotalLabor', 'TotalParts', 'Units', 'Ticket/Account/AccountName', 'Ticket/TicketNumber', 'Ticket/Contact/Name', 'User/UserInfo/LastName', 'User/UserInfo/FirstName'],
        resourceKind: 'ticketActivities',

        _onResize: function _onResize() {
            (0, _query['default'])('.note-text-item', this.contentNode).forEach(function (node) {
                var wrapNode = (0, _query['default'])('.note-text-wrap', node)[0],
                    moreNode = (0, _query['default'])('.note-text-more', node)[0];
                if (_domGeom['default'].getMarginBox(node).h < _domGeom['default'].getMarginBox(wrapNode).h) {
                    _domStyle['default'].set(moreNode, 'visibility', 'visible');
                } else {
                    _domStyle['default'].set(moreNode, 'visibility', 'hidden');
                }
            });
        },
        processData: function processData() {
            this.inherited(arguments);
            this._onResize();
        },
        postCreate: function postCreate() {
            this.inherited(arguments);
            this.own(_topic['default'].subscribe('/app/resize', _lang['default'].hitch(this, this._onResize)));
        },
        formatSearchQuery: function formatSearchQuery(searchQuery) {
            return _string['default'].substitute('ActivityDescription like "${0}%"', [this.escapeSearchQuery(searchQuery.toUpperCase())]);
        }
    });

    _lang['default'].setObject('Mobile.SalesLogix.Views.TicketActivity.List', __class);
    module.exports = __class;
});

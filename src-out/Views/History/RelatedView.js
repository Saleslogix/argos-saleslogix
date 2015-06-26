define('crm/Views/History/RelatedView', ['exports', 'module', 'dojo/_base/declare', 'dojo/_base/lang', '../../Format', 'argos/Convert', 'argos/RelatedViewWidget'], function (exports, module, _dojo_baseDeclare, _dojo_baseLang, _Format, _argosConvert, _argosRelatedViewWidget) {
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    var _declare = _interopRequireDefault(_dojo_baseDeclare);

    var _lang = _interopRequireDefault(_dojo_baseLang);

    var _format = _interopRequireDefault(_Format);

    var _convert = _interopRequireDefault(_argosConvert);

    var _RelatedViewWidget = _interopRequireDefault(_argosRelatedViewWidget);

    /**
     * @class crm.Views.History.RelatedView
     *
     * @extends argos.RelatedViewWidget
     *
     * @requires argos.Convert
     *
     * @requires crm.Format
     *
     */
    var __class = (0, _declare['default'])('crm.Views.History.RelatedView', [_RelatedViewWidget['default']], {
        regardingText: 'Regarding',
        byText: 'wrote ',
        id: 'relatedNotes',
        titleText: 'Notes',
        detailViewId: 'history_detail',
        listViewId: 'history_related',
        listViewWhere: null,
        enabled: true,
        showTab: false,
        enableActions: false,
        showTotalInTab: false,
        hideWhenNoData: true,
        resourceKind: 'history',
        select: ['Type', 'ModifyDate', 'CompleteDate', 'UserName', 'Description', 'Notes', 'AccountName'],
        where: null,
        sort: 'ModifyDate desc',
        pageSize: 3,
        relatedItemIconTemplate: new Simplate(['<div class="user-icon">{%: crm.Format.formatUserInitial($.UserName) %}</div>']),
        relatedItemHeaderTemplate: new Simplate(['<h4 ><strong>{%: $$.getDescription($) %} </strong></h4>', '<h4>{%: crm.Format.formatByUser($.UserName) %} {%: $$.byText %}  {%: crm.Format.relativeDate($.ModifyDate, false) %}</h4>']),
        relatedItemDetailTemplate: new Simplate(['<div class="note-text-wrap">', '<h4>{%: $.Notes %} ... </h4>', '</div>']),
        relatedViewHeaderTemplate: new Simplate(['<div class="line-bar"></div>']),
        getDescription: function getDescription(entry) {
            return entry.Description ? entry.Description : entry.$descriptor;
        }
    });

    _lang['default'].setObject('Mobile.SalesLogix.Views.History.RelatedView', __class);
    module.exports = __class;
});

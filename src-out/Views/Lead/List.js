define('crm/Views/Lead/List', ['exports', 'module', 'dojo/_base/declare', 'dojo/_base/lang', 'dojo/string', '../../Action', 'argos/Format', 'argos/Utility', 'argos/List', '../_GroupListMixin', '../_MetricListMixin', '../_RightDrawerListMixin', '../_CardLayoutListMixin'], function (exports, module, _dojo_baseDeclare, _dojo_baseLang, _dojoString, _Action, _argosFormat, _argosUtility, _argosList, _GroupListMixin2, _MetricListMixin2, _RightDrawerListMixin2, _CardLayoutListMixin2) {
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    var _declare = _interopRequireDefault(_dojo_baseDeclare);

    var _lang = _interopRequireDefault(_dojo_baseLang);

    var _string = _interopRequireDefault(_dojoString);

    var _action = _interopRequireDefault(_Action);

    var _format = _interopRequireDefault(_argosFormat);

    var _utility = _interopRequireDefault(_argosUtility);

    var _List = _interopRequireDefault(_argosList);

    var _GroupListMixin3 = _interopRequireDefault(_GroupListMixin2);

    var _MetricListMixin3 = _interopRequireDefault(_MetricListMixin2);

    var _RightDrawerListMixin3 = _interopRequireDefault(_RightDrawerListMixin2);

    var _CardLayoutListMixin3 = _interopRequireDefault(_CardLayoutListMixin2);

    /**
     * @class crm.Views.Lead.List
     *
     * @extends argos.List
     * @mixins crm.Views._RightDrawerListMixin
     * @mixins crm.Views._MetricListMixin
     * @mixins crm.Views._GroupListMixin
     * @mixins crm.Views._CardLayoutListMixin
     *
     * @requires argos.Format
     * @requires argos.Utility
     *
     * @requires crm.Action
     */
    var __class = (0, _declare['default'])('crm.Views.Lead.List', [_List['default'], _RightDrawerListMixin3['default'], _MetricListMixin3['default'], _CardLayoutListMixin3['default'], _GroupListMixin3['default']], {
        //Templates
        itemTemplate: new Simplate(['<h3>{%: $.LeadNameLastFirst %}</h3>', '<h4>', '{%: $$.joinFields(" | ", [$.Title, $.Company]) %}', '</h4>', '{% if ($.WorkPhone) { %}', '<h4>', '{%: $$.phoneAbbreviationText %} <span class="href" data-action="callWork" data-key="{%: $.$key %}">{%: argos.Format.phone($.WorkPhone) %}</span>', '</h4>', '{% } %}', '{% if ($.Mobile) { %}', '<h4>', '{%: $$.mobileAbbreviationText %} <span class="href" data-action="callMobile" data-key="{%: $.$key %}">{%: argos.Format.phone($.Mobile) %}</span>', '</h4>', '{% } %}', '{% if ($.TollFree) { %}', '<h4>', '{%: $$.tollFreeAbbreviationText %} {%: argos.Format.phone($.TollFree) %}', '</h4>', '{% } %}', '<h4>{%: $.WebAddress %}</h4>', '{% if ($.Email) { %}', '<h4>', '<span class="href" data-action="sendEmail" data-key="{%: $.$key %}">{%: $.Email %}</span>', '</h4>', '{% } %}']),

        joinFields: function joinFields(sep, fields) {
            return _utility['default'].joinFields(sep, fields);
        },
        callWork: function callWork(params) {
            this.invokeActionItemBy(function (action) {
                return action.id === 'callWork';
            }, params.key);
        },
        callMobile: function callMobile(params) {
            this.invokeActionItemBy(function (action) {
                return action.id === 'callMobile';
            }, params.key);
        },
        sendEmail: function sendEmail(params) {
            this.invokeActionItemBy(function (action) {
                return action.id === 'sendEmail';
            }, params.key);
        },

        //Localization
        titleText: 'Leads',
        activitiesText: 'Activities',
        notesText: 'Notes',
        scheduleText: 'Schedule',
        emailedText: 'E-mailed ${0}',
        calledText: 'Called ${0}',
        editActionText: 'Edit',
        callMobileActionText: 'Call Mobile',
        callWorkActionText: 'Call Work',
        sendEmailActionText: 'Email',
        addNoteActionText: 'Add Note',
        addActivityActionText: 'Add Activity',
        addAttachmentActionText: 'Add Attachment',
        phoneAbbreviationText: 'Work: ',
        mobileAbbreviationText: 'Mobile: ',
        tollFreeAbbreviationText: 'Toll Free: ',

        //View Properties
        detailView: 'lead_detail',
        itemIconClass: 'fa fa-filter fa-2x',
        iconTemplate: new Simplate(['<span class="fa-stack">', '<i class="fa fa-square-o fa-stack-2x"></i>', '<i class="fa fa-user fa-stack-1x fa-inverse"></i>', '</span>']),
        id: 'lead_list',
        security: 'Entities/Lead/View',
        insertView: 'lead_edit',
        queryOrderBy: 'LastNameUpper,FirstName',
        querySelect: ['Company', 'LeadNameLastFirst', 'WebAddress', 'Email', 'WorkPhone', 'Mobile', 'TollFree', 'Title', 'ModifyDate'],
        resourceKind: 'leads',
        entityName: 'Lead',
        groupsEnabled: true,
        allowSelection: true,
        enableActions: true,
        createActionLayout: function createActionLayout() {
            return this.actions || (this.actions = [{
                id: 'edit',
                cls: 'fa fa-pencil fa-2x',
                label: this.editActionText,
                action: 'navigateToEditView'
            }, {
                id: 'callWork',
                cls: 'fa fa-phone-square fa-2x',
                label: this.callWorkActionText,
                enabled: _action['default'].hasProperty.bindDelegate(this, 'WorkPhone'),
                fn: _action['default'].callPhone.bindDelegate(this, 'WorkPhone')
            }, {
                id: 'callMobile',
                cls: 'fa fa-mobile fa-2x',
                label: this.callMobileActionText,
                enabled: _action['default'].hasProperty.bindDelegate(this, 'Mobile'),
                fn: _action['default'].callPhone.bindDelegate(this, 'Mobile')
            }, {
                id: 'sendEmail',
                cls: 'fa fa-envelope fa-2x',
                label: this.sendEmailActionText,
                enabled: _action['default'].hasProperty.bindDelegate(this, 'Email'),
                fn: _action['default'].sendEmail.bindDelegate(this, 'Email')
            }, {
                id: 'addNote',
                cls: 'fa fa-edit fa-2x',
                label: this.addNoteActionText,
                fn: _action['default'].addNote.bindDelegate(this)
            }, {
                id: 'addActivity',
                cls: 'fa fa-calendar fa-2x',
                label: this.addActivityActionText,
                fn: _action['default'].addActivity.bindDelegate(this)
            }, {
                id: 'addAttachment',
                cls: 'fa fa-paperclip fa-2x',
                label: this.addAttachmentActionText,
                fn: _action['default'].addAttachment.bindDelegate(this)
            }]);
        },

        formatSearchQuery: function formatSearchQuery(searchQuery) {
            return _string['default'].substitute('(LastNameUpper like "${0}%" or upper(FirstName) like "${0}%" or CompanyUpper like "${0}%" or upper(LeadNameLastFirst) like "%${0}%")', [this.escapeSearchQuery(searchQuery.toUpperCase())]);
        }
    });

    _lang['default'].setObject('Mobile.SalesLogix.Views.Lead.List', __class);
    module.exports = __class;
});

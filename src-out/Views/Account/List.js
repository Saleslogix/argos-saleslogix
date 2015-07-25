define('crm/Views/Account/List', ['exports', 'module', 'dojo/_base/declare', 'dojo/_base/lang', 'dojo/_base/array', 'dojo/string', '../../Action', 'argos/Format', 'argos/Utility', 'argos/Convert', 'argos/List', '../_GroupListMixin', '../_MetricListMixin', '../_CardLayoutListMixin', '../_RightDrawerListMixin', '../../OfflineManager'], function (exports, module, _dojo_baseDeclare, _dojo_baseLang, _dojo_baseArray, _dojoString, _Action, _argosFormat, _argosUtility, _argosConvert, _argosList, _GroupListMixin2, _MetricListMixin2, _CardLayoutListMixin2, _RightDrawerListMixin2, _OfflineManager) {
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    var _declare = _interopRequireDefault(_dojo_baseDeclare);

    var _lang = _interopRequireDefault(_dojo_baseLang);

    var _array = _interopRequireDefault(_dojo_baseArray);

    var _string = _interopRequireDefault(_dojoString);

    var _action = _interopRequireDefault(_Action);

    var _format = _interopRequireDefault(_argosFormat);

    var _utility = _interopRequireDefault(_argosUtility);

    var _Cmonvert = _interopRequireDefault(_argosConvert);

    var _List = _interopRequireDefault(_argosList);

    var _GroupListMixin3 = _interopRequireDefault(_GroupListMixin2);

    var _MetricListMixin3 = _interopRequireDefault(_MetricListMixin2);

    var _CardLayoutListMixin3 = _interopRequireDefault(_CardLayoutListMixin2);

    var _RightDrawerListMixin3 = _interopRequireDefault(_RightDrawerListMixin2);

    var _OfflineManager2 = _interopRequireDefault(_OfflineManager);

    /**
     * @class crm.Views.Account.List
     *
     * @extends argos.List
     * @requires argos.List
     * @requires argos.Format
     * @requires argos.Utility
     * @requires argos.Convert
     *
     * @requires crm.Action
     * @requires crm.Views._GroupListMixin
     * @requires crm.Views._MetricListMixin
     * @requires crm.Views._CardLayoutListMixin
     * @requires crm.Views._RightDrawerListMixin
     *
     */
    var __class = (0, _declare['default'])('crm.Views.Account.List', [_List['default'], _RightDrawerListMixin3['default'], _MetricListMixin3['default'], _CardLayoutListMixin3['default'], _GroupListMixin3['default']], {
        //Templates
        itemTemplate: new Simplate(['<h3>{%: $.AccountName %}</h3>', '<h4>{%: $.Industry %}</h4>', '<h4>', '{%: $$.joinFields(" | ", [$.Type, $.SubType]) %}', '</h4>', '<h4>{%: $.AccountManager && $.AccountManager.UserInfo ? $.AccountManager.UserInfo.UserName : "" %} | {%: $.Owner.OwnerDescription %}</h4>', '<h4>{%: $.WebAddress %}</h4>', '{% if ($.MainPhone) { %}', '<h4>', '{%: $$.phoneAbbreviationText %} <span class="href" data-action="callMain" data-key="{%: $.$key %}">{%: argos.Format.phone($.MainPhone) %}</span>', '</h4>', '{% } %}', '{% if ($.Fax) { %}', '<h4>', '{%: $$.faxAbbreviationText + argos.Format.phone($.Fax) %}', '</h4>', '{% } %}']),
        groupsEnabled: true,
        enableDynamicGroupLayout: true,
        groupLayoutItemTemplate: new Simplate(['<div style="float:left; ">', '<h3><span class="group-label">{%= $$.getGroupFieldLabelByName($,"AccountName") %} </span><span class="group-entry"><strong>{%= $$.getGroupFieldValueByName($,"AccountName") %}</strong></span></h2>', '<h4><span class="group-label">{%= $$.getGroupFieldLabelByName($,"MainPhone") %} </span><span class="group-entry">{%= $$.getGroupFieldValueByName($, "MainPhone") %}</span></h4>', '</div><div style="float:left;">', '<h4><span class="group-label">{%= $$.getGroupFieldLabelByName($,"Status") %} </span><span class="group-entry">{%= $$.getGroupFieldValueByName($, "Status") %}</span></h4>', '<h4><span class="group-label">{%= $$.getGroupFieldLabelByName($,"Type") %} </span><span class="group-entry">{%= $$.getGroupFieldValueByName($, "Type") %}</span></h4>', '</div>']),

        joinFields: function joinFields(sep, fields) {
            return _utility['default'].joinFields(sep, fields);
        },

        //Localization
        titleText: 'Accounts',
        activitiesText: 'Activities',
        notesText: 'Notes',
        scheduleText: 'Schedule',
        editActionText: 'Edit',
        callMainActionText: 'Call Main',
        viewContactsActionText: 'Contacts',
        addNoteActionText: 'Add Note',
        addActivityActionText: 'Add Activity',
        addAttachmentActionText: 'Add Attachment',
        phoneAbbreviationText: 'Phone: ',
        faxAbbreviationText: 'Fax: ',
        offlineText: 'Offline',

        //View Properties
        detailView: 'account_detail',
        itemIconClass: 'fa fa-building-o fa-2x',
        id: 'account_list',
        security: 'Entities/Account/View',
        insertView: 'account_edit',
        queryOrderBy: 'AccountNameUpper',
        insertSecurity: 'Entities/Account/Add',
        querySelect: ['AccountName', 'AccountManager/UserInfo/UserName', 'AccountManager/UserInfo/LastName', 'AccountManager/UserInfo/FirstName', 'Owner/OwnerDescription', 'WebAddress', 'Industry', 'LeadSource/Description', 'MainPhone', 'Fax', 'Status', 'SubType', 'Type', 'ModifyDate'],
        resourceKind: 'accounts',
        entityName: 'Account',
        allowSelection: true,
        enableActions: true,
        pageSize: 10,
        offlineIds: null,
        onTransitionTo: function onTransitionTo() {
            _OfflineManager2['default'].getAllIds().then((function (results) {
                this.offlineIds = results;
            }).bind(this), function (err) {
                console.error(err);
            });

            this.inherited(arguments);
        },
        callMain: function callMain(params) {
            this.invokeActionItemBy(function (action) {
                return action.id === 'callMain';
            }, params.key);
        },
        createActionLayout: function createActionLayout() {
            return this.actions || (this.actions = [{
                id: 'edit',
                cls: 'fa fa-pencil fa-2x',
                label: this.editActionText,
                action: 'navigateToEditView'
            }, {
                id: 'callMain',
                cls: 'fa fa-phone-square fa-2x',
                label: this.callMainActionText,
                enabled: _action['default'].hasProperty.bindDelegate(this, 'MainPhone'),
                fn: _action['default'].callPhone.bindDelegate(this, 'MainPhone')
            }, {
                id: 'viewContacts',
                label: this.viewContactsActionText,
                fn: this.navigateToRelatedView.bindDelegate(this, 'contact_related', 'Account.id eq "${0}"')
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
            return _string['default'].substitute('AccountNameUpper like "${0}%"', [this.escapeSearchQuery(searchQuery.toUpperCase())]);
        }
    });

    _lang['default'].setObject('Mobile.SalesLogix.Views.Account.List', __class);
    module.exports = __class;
});

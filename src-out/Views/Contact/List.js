define('crm/Views/Contact/List', ['exports', 'module', 'dojo/_base/declare', 'dojo/_base/lang', 'dojo/string', 'dojo/_base/array', 'crm/Action', 'argos/Format', 'argos/Convert', 'argos/List', '../_GroupListMixin', '../_MetricListMixin', '../_CardLayoutListMixin', '../_RightDrawerListMixin'], function (exports, module, _dojo_baseDeclare, _dojo_baseLang, _dojoString, _dojo_baseArray, _crmAction, _argosFormat, _argosConvert, _argosList, _GroupListMixin2, _MetricListMixin2, _CardLayoutListMixin2, _RightDrawerListMixin2) {
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _declare = _interopRequireDefault(_dojo_baseDeclare);

  var _lang = _interopRequireDefault(_dojo_baseLang);

  var _string = _interopRequireDefault(_dojoString);

  var _array = _interopRequireDefault(_dojo_baseArray);

  var _action = _interopRequireDefault(_crmAction);

  var _format = _interopRequireDefault(_argosFormat);

  var _Convert = _interopRequireDefault(_argosConvert);

  var _List = _interopRequireDefault(_argosList);

  var _GroupListMixin3 = _interopRequireDefault(_GroupListMixin2);

  var _MetricListMixin3 = _interopRequireDefault(_MetricListMixin2);

  var _CardLayoutListMixin3 = _interopRequireDefault(_CardLayoutListMixin2);

  var _RightDrawerListMixin3 = _interopRequireDefault(_RightDrawerListMixin2);

  /**
   * @class crm.Views.Contact.List
   *
   * @extends argos.List
   * @mixins crm.Views._RightDrawerListMixin
   * @mixins crm.Views._MetricListMixin
   * @mixins crm.Views._CardLayoutListMixin
   *
   * @requires argos.List
   * @requires argos.Format
   * @requires argos.Convert
   * @requires crm.Views._RightDrawerListMixin
   * @requires crm.Views._GroupListMixin
   * @requires crm.Views._MetricListMixin
   * @requires crm.Views._CardLayoutListMixin
   * @requires crm.Action
   *
   */
  var __class = (0, _declare['default'])('crm.Views.Contact.List', [_List['default'], _RightDrawerListMixin3['default'], _MetricListMixin3['default'], _CardLayoutListMixin3['default'], _GroupListMixin3['default']], {
    //Template
    //Card Layout
    itemIconClass: 'fa fa-user fa-2x',
    itemTemplate: new Simplate(['<h3>{%: $.NameLF %}</h3>', '<h4>{% if($.Title) { %} {%: $.Title %} | {% } %} {%: $.AccountName %}</h4>', '<h4>{%: $.WebAddress %}</h4>', '{% if ($.WorkPhone) { %}', '<h4>', '{%: $$.phoneAbbreviationText %} <span class="href" data-action="callWork" data-key="{%: $.$key %}">{%: argos.Format.phone($.WorkPhone) %}</span>', '</h4>', '{% } %}', '{% if ($.Mobile) { %}', '<h4>', '{%: $$.mobileAbbreviationText %} <span class="href" data-action="callMobile" data-key="{%: $.$key %}">{%: argos.Format.phone($.Mobile) %}</span>', '</h4>', '{% } %}', '{% if ($.Email) { %}', '<h4>', '<span class="href" data-action="sendEmail" data-key="{%: $.$key %}">{%: $.Email %}</span>', '</h4>', '{% } %}']),

    //Localization
    titleText: 'Contacts',
    activitiesText: 'Activities',
    notesText: 'Notes',
    scheduleText: 'Schedule',
    editActionText: 'Edit',
    callMainActionText: 'Call Main',
    callWorkActionText: 'Call Work',
    callMobileActionText: 'Call Mobile',
    sendEmailActionText: 'Email',
    viewAccountActionText: 'Account',
    addNoteActionText: 'Add Note',
    addActivityActionText: 'Add Activity',
    addAttachmentActionText: 'Add Attachment',
    phoneAbbreviationText: 'Work: ',
    mobileAbbreviationText: 'Mobile: ',

    //View Properties
    detailView: 'contact_detail',
    iconClass: 'fa fa-user fa-lg',
    id: 'contact_list',
    security: 'Entities/Contact/View',
    insertView: 'contact_edit',
    queryOrderBy: 'LastNameUpper,FirstName',
    querySelect: ['AccountName', 'Account/AccountName', 'NameLF', 'WorkPhone', 'Mobile', 'Email', 'Title', 'LastHistoryDate', 'ModifyDate'],
    resourceKind: 'contacts',
    entityName: 'Contact',
    groupsEnabled: true,
    enableActions: true,
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
        id: 'viewAccount',
        label: this.viewAccountActionText,
        enabled: _action['default'].hasProperty.bindDelegate(this, 'Account.$key'),
        fn: _action['default'].navigateToEntity.bindDelegate(this, {
          view: 'account_detail',
          keyProperty: 'Account.$key',
          textProperty: 'AccountName'
        })
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
      return _string['default'].substitute('(LastNameUpper like "${0}%" or upper(FirstName) like "${0}%" or upper(NameLF) like "%${0}%")', [this.escapeSearchQuery(searchQuery.toUpperCase())]);
    }
  });

  _lang['default'].setObject('Mobile.SalesLogix.Views.Contact.List', __class);
  module.exports = __class;
});

define('crm/Views/Ticket/List', ['exports', 'module', 'dojo/_base/declare', 'dojo/_base/lang', 'dojo/string', 'dojo/_base/array', '../../Action', '../../Format', 'argos/List', '../_GroupListMixin', '../_MetricListMixin', '../_RightDrawerListMixin', '../_CardLayoutListMixin'], function (exports, module, _dojo_baseDeclare, _dojo_baseLang, _dojoString, _dojo_baseArray, _Action, _Format, _argosList, _GroupListMixin2, _MetricListMixin2, _RightDrawerListMixin2, _CardLayoutListMixin2) {
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _declare = _interopRequireDefault(_dojo_baseDeclare);

  var _lang = _interopRequireDefault(_dojo_baseLang);

  var _string = _interopRequireDefault(_dojoString);

  var _array = _interopRequireDefault(_dojo_baseArray);

  var _action = _interopRequireDefault(_Action);

  var _format = _interopRequireDefault(_Format);

  var _List = _interopRequireDefault(_argosList);

  var _GroupListMixin3 = _interopRequireDefault(_GroupListMixin2);

  var _MetricListMixin3 = _interopRequireDefault(_MetricListMixin2);

  var _RightDrawerListMixin3 = _interopRequireDefault(_RightDrawerListMixin2);

  var _CardLayoutListMixin3 = _interopRequireDefault(_CardLayoutListMixin2);

  /**
   * @class crm.Views.Ticket.List
   *
   * @extends argos.List
   * @mixins crm.Views._RightDrawerListMixin
   * @mixins crm.Views._MetricListMixin
   * @mixins crm.Views._GroupListMixin
   * @mixins crm.Views._CardLayoutListMixin
   *
   * @requires crm.Action
   * @requires crm.Format
   */
  var __class = (0, _declare['default'])('crm.Views.Ticket.List', [_List['default'], _RightDrawerListMixin3['default'], _MetricListMixin3['default'], _CardLayoutListMixin3['default'], _GroupListMixin3['default']], {
    //Templates
    itemTemplate: new Simplate(['<h3>{%: $.TicketNumber %}</h3>', '<h4>{%: $.Subject %}</h3>', '{% if(($.Account) && (!$.Contact)) { %}', '<h4>{%: $$.viewContactActionText + ": " + $.Account.AccountName %}</h4>', '{% } %}', '{% if(($.Account) && ($.Contact)) { %}', '<h4>{%: $$.viewContactActionText + ": " + $.Contact.NameLF + " | " + $.Account.AccountName %}</h4>', '{% } %}', '<h4> {%: $.AssignedTo ? ($$.assignedToText + $.AssignedTo.OwnerDescription) : this.notAssignedText %}</h4>', '{% if($.Urgency) { %}', '<h4>{%: $$.urgencyText + $.Urgency.Description %}</h4>', '{% } %}', '{% if($.Area) { %}', '<h4>{%: $$._areaCategoryIssueText($) %}</h4>', '{% } %}', '{% if($.CreateDate) { %}', '<h4>{%: $$.createdOnText %}  {%: crm.Format.relativeDate($.CreateDate) %}</h4>', '{% } %}', '{% if($.ModifyDate) { %}', '<h4>{%: $$.modifiedText %}  {%: crm.Format.relativeDate($.ModifyDate) %}</h4>', '{% } %}', '{% if($.NeededByDate) { %}', '<h4>{%: $$.neededByText %}  {%: crm.Format.relativeDate($.NeededByDate) %}</h4>', '{% } %}']),

    _areaCategoryIssueText: function _areaCategoryIssueText(feedItem) {
      var results = [feedItem.Area, feedItem.Category, feedItem.Issue];
      return _array['default'].filter(results, function (item) {
        return item !== '' && typeof item !== 'undefined' && item !== null;
      }).join(' > ');
    },

    //Localization
    titleText: 'Tickets',
    activitiesText: 'Activities',
    scheduleText: 'Schedule',
    notAssignedText: 'Not assigned',
    editActionText: 'Edit',
    viewAccountActionText: 'Account',
    viewContactActionText: 'Contact',
    addNoteActionText: 'Add Note',
    addActivityActionText: 'Add Activity',
    addAttachmentActionText: 'Add Attachment',
    assignedToText: 'Assigned To: ',
    urgencyText: 'Urgency: ',
    createdOnText: 'Created  ',
    modifiedText: 'Modified ',
    neededByText: 'Needed  ',

    //View Properties
    detailView: 'ticket_detail',
    itemIconClass: 'fa fa-clipboard fa-2x',
    id: 'ticket_list',
    security: 'Entities/Ticket/View',
    insertView: 'ticket_edit',
    queryOrderBy: 'TicketNumber',
    querySelect: ['Account/AccountName', 'Account/MainPhone', 'Area', 'Category', 'Issue', 'AssignedTo/OwnerDescription', 'Contact/NameLF', 'Contact/WorkPhone', 'ReceivedDate', 'StatusCode', 'Subject', 'TicketNumber', 'UrgencyCode', 'Urgency/Description', 'ModifyDate', 'CreateDate', 'NeededByDate'],
    resourceKind: 'tickets',
    entityName: 'Ticket',
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
        id: 'viewAccount',
        label: this.viewAccountActionText,
        enabled: _action['default'].hasProperty.bindDelegate(this, 'Account.$key'),
        fn: _action['default'].navigateToEntity.bindDelegate(this, {
          view: 'account_detail',
          keyProperty: 'Account.$key',
          textProperty: 'Account.AccountName'
        })
      }, {
        id: 'viewContact',
        label: this.viewContactActionText,
        enabled: _action['default'].hasProperty.bindDelegate(this, 'Contact.$key'),
        fn: _action['default'].navigateToEntity.bindDelegate(this, {
          view: 'contact_detail',
          keyProperty: 'Contact.$key',
          textProperty: 'Contact.NameLF'
        })
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
      return _string['default'].substitute('TicketNumber like "${0}%" or AlternateKeySuffix like "${0}%" or upper(Subject) like "${0}%" or Account.AccountNameUpper like "${0}%"', [this.escapeSearchQuery(searchQuery.toUpperCase())]);
    }
  });

  _lang['default'].setObject('Mobile.SalesLogix.Views.Ticket.List', __class);
  module.exports = __class;
});

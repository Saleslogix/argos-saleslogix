define('crm/Views/Opportunity/List', ['exports', 'module', 'dojo/_base/declare', 'dojo/_base/lang', 'dojo/string', '../../Action', '../../Format', 'argos/List', '../_GroupListMixin', '../_MetricListMixin', '../_RightDrawerListMixin', '../_CardLayoutListMixin'], function (exports, module, _dojo_baseDeclare, _dojo_baseLang, _dojoString, _Action, _Format, _argosList, _GroupListMixin2, _MetricListMixin2, _RightDrawerListMixin2, _CardLayoutListMixin2) {
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _declare = _interopRequireDefault(_dojo_baseDeclare);

  var _lang = _interopRequireDefault(_dojo_baseLang);

  var _string = _interopRequireDefault(_dojoString);

  var _action = _interopRequireDefault(_Action);

  var _format = _interopRequireDefault(_Format);

  var _List = _interopRequireDefault(_argosList);

  var _GroupListMixin3 = _interopRequireDefault(_GroupListMixin2);

  var _MetricListMixin3 = _interopRequireDefault(_MetricListMixin2);

  var _RightDrawerListMixin3 = _interopRequireDefault(_RightDrawerListMixin2);

  var _CardLayoutListMixin3 = _interopRequireDefault(_CardLayoutListMixin2);

  /**
   * @class crm.Views.Opportunity.List
   *
   * @extends argos.List
   * @mixins crm.Views._RightDrawerListMixin
   * @mixins crm.Views._MetricListMixin
   * @mixins crm.Views._GroupListMixin
   * @mixins crm.Views._CardLayoutListMixin
   *
   * @requires argos.Format
   *
   * @requires crm.Action
   * @requires crm.Format
   */
  var __class = (0, _declare['default'])('crm.Views.Opportunity.List', [_List['default'], _RightDrawerListMixin3['default'], _MetricListMixin3['default'], _CardLayoutListMixin3['default'], _GroupListMixin3['default']], {
    // Templates
    // TODO: Support ExchangeRateCode with proper symbol
    itemTemplate: new Simplate(['<h3>{%: $.Description %}</h3>', '{% if ($.Account) { %}', '<h4>', '{%: $.Account.AccountName %}', '</h4>', '<h4>', '{% if ($.Account.AccountManager && $.Account.AccountManager.UserInfo) { %}', '{%: $.Account.AccountManager.UserInfo.UserName %}', '{% if ($.Account && $.Account.AccountManager.UserInfo.Region) { %}', ' | {%: $.Account.AccountManager.UserInfo.Region %}', '{% } %}', '{% } %}', '</h4>', '{% } %}', '<h4>', '{%: $.Status %}', '{% if ($.Stage) { %}', ' | {%: $.Stage %}', '{% } %}', '</h4>', '{% if ($.SalesPotential) { %}', '<h4><strong>', '{% if (App.hasMultiCurrency()) { %}', '{%: crm.Format.multiCurrency($.SalesPotential * $.ExchangeRate, $.ExchangeRateCode) %}', '{% } else { %}', '{%: crm.Format.multiCurrency($.SalesPotential, App.getBaseExchangeRate().code) %}', '{% } %}', '</strong></h4>', '{% } %}', '<h4>{%: $$.formatDate($) %}</h4>']),

    // Localization
    titleText: 'Opportunities',
    activitiesText: 'Activities',
    notesText: 'Notes',
    scheduleText: 'Schedule',
    editActionText: 'Edit',
    viewAccountActionText: 'Account',
    viewContactsActionText: 'Contacts',
    viewProductsActionText: 'Products',
    addNoteActionText: 'Add Note',
    addActivityActionText: 'Add Activity',
    addAttachmentActionText: 'Add Attachment',
    actualCloseText: 'Closed ',
    estimatedCloseText: 'Estimated close ',
    quickEditActionText: 'Quick Edit',

    // View Properties
    id: 'opportunity_list',
    security: 'Entities/Opportunity/View',
    itemIconClass: 'fa fa-money fa-2x',
    detailView: 'opportunity_detail',
    insertView: 'opportunity_edit',
    queryOrderBy: 'EstimatedClose desc',
    querySelect: ['Account/AccountName', 'Account/AccountManager/UserInfo/UserName', 'Account/AccountManager/UserInfo/Region', 'Description', 'Stage', 'Status', 'SalesPotential', 'ExchangeRate', 'ExchangeRateCode', 'ModifyDate', 'ActualClose', 'EstimatedClose'],
    resourceKind: 'opportunities',
    entityName: 'Opportunity',
    groupsEnabled: true,
    allowSelection: true,
    enableActions: true,

    formatDate: function formatDate(entry) {
      if (entry.Status === 'Open' && entry.EstimatedClose) {
        return this.estimatedCloseText + _format['default'].relativeDate(entry.EstimatedClose);
      } else if (entry.ActualClose) {
        return this.actualCloseText + _format['default'].relativeDate(entry.ActualClose);
      }

      return '';
    },
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
        id: 'viewContacts',
        label: this.viewContactsActionText,
        fn: this.navigateToRelatedView.bindDelegate(this, 'opportunitycontact_related', 'Opportunity.Id eq "${0}"')
      }, {
        id: 'viewProducts',
        label: this.viewProductsActionText,
        fn: this.navigateToRelatedView.bindDelegate(this, 'opportunityproduct_related', 'Opportunity.Id eq "${0}"')
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
      }, {
        id: 'quickEdit',
        cls: 'fa fa-pencil fa-2x',
        label: this.quickEditActionText,
        editView: 'opportunity_quick_edit',
        action: 'navigateToQuickEdit'
      }]);
    },

    formatSearchQuery: function formatSearchQuery(searchQuery) {
      return _string['default'].substitute('(upper(Description) like "${0}%" or Account.AccountNameUpper like "${0}%")', [this.escapeSearchQuery(searchQuery.toUpperCase())]);
    },
    groupFieldFormatter: {
      'CloseProbability': {
        name: 'CloseProbability',
        formatter: function formatter(value) {
          return _format['default'].fixedLocale(value, 0) + '%';
        }
      }
    }
  });

  _lang['default'].setObject('Mobile.SalesLogix.Views.Opportunity.List', __class);
  module.exports = __class;
});

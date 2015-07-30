define('crm/Views/OpportunityContact/Edit', ['exports', 'module', 'dojo/_base/declare', 'dojo/_base/lang', '../../Format', 'argos/Utility', 'argos/Edit'], function (exports, module, _dojo_baseDeclare, _dojo_baseLang, _Format, _argosUtility, _argosEdit) {
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _declare = _interopRequireDefault(_dojo_baseDeclare);

  var _lang = _interopRequireDefault(_dojo_baseLang);

  var _format = _interopRequireDefault(_Format);

  var _utility = _interopRequireDefault(_argosUtility);

  var _Edit = _interopRequireDefault(_argosEdit);

  /**
   * @class crm.Views.OpportunityContact.Edit
   *
   * @extends argos.Edit
   *
   * @requires argos.Utility
   */
  var __class = (0, _declare['default'])('crm.Views.OpportunityContact.Edit', [_Edit['default']], {
    //Localization
    titleText: 'Edit Opp. Contact',
    nameText: 'name',
    accountNameText: 'account',
    contactTitleText: 'title',
    salesRoleText: 'role',
    salesRoleTitleText: 'Role',
    personalBenefitsText: 'personal ben.',
    strategyText: 'strategy',
    issuesText: 'issues',
    standingText: 'standing',
    standingTitleText: 'Standing',
    contactText: 'Contact',
    competitorPrefText: 'competitor pref',

    //View Properties
    entityName: 'OpportunityContact',
    id: 'opportunitycontact_edit',
    insertSecurity: 'Entities/Contact/Add',
    updateSecurity: 'Entities/Contact/Edit',
    querySelect: ['Contact/Account/AccountName', 'Contact/NameLF', 'Contact/Title'],
    resourceKind: 'opportunityContacts',

    createLayout: function createLayout() {
      return this.layout || (this.layout = [{
        title: this.contactText,
        name: 'ContactSection',
        children: [{
          formatValue: _format['default'].nameLF,
          label: this.nameText,
          name: 'ContactName',
          type: 'text',
          property: 'Contact.NameLF',
          readonly: true,
          exclude: true
        }, {
          label: this.accountNameText,
          name: 'ContactAccountName',
          property: 'Contact.AccountName',
          type: 'text',
          readonly: true,
          exclude: true
        }, {
          label: this.contactTitleText,
          name: 'ContactTitle',
          property: 'Contact.Title',
          type: 'text',
          readonly: true,
          exclude: true
        }]
      }, {
        label: this.salesRoleText,
        name: 'SalesRole',
        property: 'SalesRole',
        type: 'picklist',
        title: this.salesRoleTitleText,
        picklist: 'Role'
      }, {
        label: this.standingText,
        name: 'Standing',
        property: 'Standing',
        type: 'picklist',
        title: this.standingTitleText,
        picklist: 'Standing'
      }, {
        label: this.personalBenefitsText,
        name: 'PersonalBenefits',
        property: 'PersonalBenefits',
        type: 'text'
      }, {
        label: this.competitorPrefText,
        name: 'Competitors',
        property: 'Competitors',
        textProperty: 'CompetitorName',
        view: 'competitor_related',
        type: 'lookup'
      }, {
        label: this.strategyText,
        name: 'Strategy',
        property: 'Strategy',
        type: 'textarea'
      }, {
        label: this.issuesText,
        name: 'Issues',
        property: 'Issues',
        type: 'textarea'
      }, {
        name: 'OpportunityKey',
        property: 'Opportunity.$key',
        type: 'hidden',
        include: true
      }, {
        name: 'ContactKey',
        property: 'Contact.$key',
        type: 'hidden',
        include: true
      }]);
    }
  });

  _lang['default'].setObject('Mobile.SalesLogix.Views.OpportunityContact.Edit', __class);
  module.exports = __class;
});

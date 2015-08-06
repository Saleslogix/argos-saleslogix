define('crm/Views/Account/Edit', ['exports', 'module', 'dojo/_base/declare', 'dojo/_base/lang', 'dojo/string', '../../Validator', '../../Format', '../../Template', 'argos/Edit'], function (exports, module, _dojo_baseDeclare, _dojo_baseLang, _dojoString, _Validator, _Format, _Template, _argosEdit) {
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _declare = _interopRequireDefault(_dojo_baseDeclare);

  var _lang = _interopRequireDefault(_dojo_baseLang);

  var _string = _interopRequireDefault(_dojoString);

  var _validator = _interopRequireDefault(_Validator);

  var _format = _interopRequireDefault(_Format);

  var _template = _interopRequireDefault(_Template);

  var _Edit = _interopRequireDefault(_argosEdit);

  /**
   * @class crm.Views.Account.Edit
   *
   * @extends argos.Edit
   *
   * @requires argos.Edit
   * @requires crm.Format
   * @requires crm.Validator
   * @requires crm.Template
   *
   */
  var __class = (0, _declare['default'])('crm.Views.Account.Edit', [_Edit['default']], {
    // Localization
    accountStatusTitleText: 'Account Status',
    accountSubTypeTitleText: 'Account Subtype',
    accountText: 'account',
    accountTypeTitleText: 'Account Type',
    acctMgrText: 'acct mgr',
    businessDescriptionText: 'bus desc',
    businessDescriptionTitleText: 'Business Description',
    descriptionText: 'desc',
    faxText: 'fax',
    fullAddressText: 'address',
    importSourceText: 'lead source',
    industryText: 'industry',
    industryTitleText: 'Industry',
    ownerText: 'owner',
    phoneText: 'phone',
    statusText: 'status',
    subTypeText: 'subtype',
    titleText: 'Account',
    typeText: 'type',
    webText: 'web',

    // View Properties
    entityName: 'Account',
    id: 'account_edit',
    insertSecurity: 'Entities/Account/Add',
    updateSecurity: 'Entities/Account/Edit',
    querySelect: ['AccountManager/UserInfo/FirstName', 'AccountManager/UserInfo/LastName', 'AccountName', 'Address/*', 'BusinessDescription', 'Description', 'Fax', 'Industry', 'LeadSource/Description', 'MainPhone', 'Notes', 'Owner/OwnerDescription', 'Status', 'SubType', 'Type', 'User/UserInfo/UserName', 'WebAddress'],
    resourceKind: 'accounts',

    formatDependentPicklist: function formatDependentPicklist(dependentValue, nformat) {
      return _string['default'].substitute(nformat, [dependentValue]);
    },
    applyContext: function applyContext(templateEntry) {
      this.inherited(arguments);

      this.fields.AccountManager.setValue(App.context.user);
      this.fields.Owner.setValue(App.context.defaultOwner);

      this.fields.Type.setValue(templateEntry.Type);
      this.fields.Status.setValue(templateEntry.Status);
    },
    createLayout: function createLayout() {
      return this.layout || (this.layout = [{
        label: this.accountText,
        name: 'AccountName',
        property: 'AccountName',
        type: 'text',
        validator: _validator['default'].notEmpty,
        autoFocus: true
      }, {
        label: this.webText,
        name: 'WebAddress',
        property: 'WebAddress',
        renderer: _format['default'].link,
        type: 'text',
        inputType: 'url',
        maxTextLength: 128,
        validator: _validator['default'].exceedsMaxTextLength
      }, {
        label: this.phoneText,
        name: 'MainPhone',
        property: 'MainPhone',
        type: 'phone',
        maxTextLength: 32,
        validator: _validator['default'].exceedsMaxTextLength
      }, {
        emptyText: '',
        formatValue: _format['default'].address.bindDelegate(this, [true], true),
        label: this.fullAddressText,
        name: 'Address',
        property: 'Address',
        type: 'address',
        view: 'address_edit'
      }, {
        label: this.faxText,
        name: 'Fax',
        property: 'Fax',
        type: 'phone',
        maxTextLength: 32,
        validator: _validator['default'].exceedsMaxTextLength
      }, {
        label: this.typeText,
        name: 'Type',
        property: 'Type',
        picklist: 'Account Type',
        requireSelection: true,
        title: this.accountTypeTitleText,
        type: 'picklist'
      }, {
        dependsOn: 'Type',
        label: this.subTypeText,
        name: 'SubType',
        property: 'SubType',
        picklist: this.formatDependentPicklist.bindDelegate(this, 'Account ${0}', true),
        requireSelection: false,
        title: this.accountSubTypeTitleText,
        type: 'picklist',
        maxTextLength: 64,
        validator: _validator['default'].exceedsMaxTextLength
      }, {
        label: this.statusText,
        name: 'Status',
        property: 'Status',
        picklist: 'Account Status',
        requireSelection: false,
        title: this.accountStatusTitleText,
        type: 'picklist'
      }, {
        label: this.industryText,
        name: 'Industry',
        property: 'Industry',
        picklist: 'Industry',
        requireSelection: false,
        title: this.industryTitleText,
        type: 'picklist',
        maxTextLength: 64,
        validator: _validator['default'].exceedsMaxTextLength
      }, {
        label: this.businessDescriptionText,
        name: 'BusinessDescription',
        property: 'BusinessDescription',
        noteProperty: false,
        title: this.businessDescriptionTitleText,
        type: 'note',
        view: 'text_edit'
      }, {
        label: this.acctMgrText,
        name: 'AccountManager',
        property: 'AccountManager',
        textProperty: 'UserInfo',
        textTemplate: _template['default'].nameLF,
        type: 'lookup',
        view: 'user_list'
      }, {
        label: this.ownerText,
        name: 'Owner',
        property: 'Owner',
        textProperty: 'OwnerDescription',
        type: 'lookup',
        view: 'owner_list'
      }, {
        label: this.importSourceText,
        name: 'LeadSource',
        property: 'LeadSource',
        textProperty: 'Description',
        type: 'lookup',
        view: 'leadsource_list'
      }]);
    }
  });

  _lang['default'].setObject('Mobile.SalesLogix.Views.Account.Edit', __class);
  module.exports = __class;
});

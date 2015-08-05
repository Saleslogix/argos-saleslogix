define('crm/Views/Lead/Edit', ['exports', 'module', 'dojo/_base/declare', 'dojo/_base/lang', '../../Format', '../../Validator', 'argos/Edit'], function (exports, module, _dojo_baseDeclare, _dojo_baseLang, _Format, _Validator, _argosEdit) {
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _declare = _interopRequireDefault(_dojo_baseDeclare);

  var _lang = _interopRequireDefault(_dojo_baseLang);

  var _format = _interopRequireDefault(_Format);

  var _validator = _interopRequireDefault(_Validator);

  var _Edit = _interopRequireDefault(_argosEdit);

  /**
   * @class crm.Views.Lead.Edit
   *
   * @extends argos.Edit
   *
   * @requires crm.Format
   * @requires crm.Validator
   */
  var __class = (0, _declare['default'])('crm.Views.Lead.Edit', [_Edit['default']], {
    //Localization
    accountText: 'account',
    addressText: 'address',
    businessText: 'bus desc',
    businessTitleText: 'Business Description',
    companyText: 'company',
    contactTitleText: 'title',
    emailText: 'email',
    faxText: 'fax',
    importSourceText: 'lead source',
    industryText: 'industry',
    industryTitleText: 'Industry',
    interestsText: 'interests',
    leadNameLastFirstText: 'name',
    leadOwnerText: 'owner',
    nameText: 'name',
    notesText: 'comments',
    notesTitleText: 'Comments',
    sicCodeText: 'sic code',
    titleText: 'Lead',
    titleTitleText: 'Title',
    tollFreeText: 'toll free',
    webText: 'web',
    workText: 'work phone',
    mobileText: 'mobile phone',

    //View Properties
    entityName: 'Lead',
    id: 'lead_edit',
    insertSecurity: 'Entities/Lead/Add',
    updateSecurity: 'Entities/Lead/Edit',
    querySelect: ['BusinessDescription', 'Company', 'Email', 'FirstName', 'FullAddress', 'Industry', 'Interests', 'LastName', 'LeadNameLastFirst', 'LeadSource/Description', 'MiddleName', 'Mobile', 'Notes', 'Prefix', 'SICCode', 'Suffix', 'Title', 'TollFree', 'WebAddress', 'WorkPhone'],
    resourceKind: 'leads',

    createLayout: function createLayout() {
      return this.layout || (this.layout = [{
        applyTo: '',
        formatValue: _format['default'].nameLF,
        label: this.leadNameLastFirstText,
        name: 'LeadNameLastFirst',
        property: 'LeadNameLastFirst',
        type: 'name',
        validator: _validator['default'].name,
        view: 'name_edit'
      }, {
        label: this.companyText,
        name: 'Company',
        property: 'Company',
        type: 'text',
        maxTextLength: 128,
        validator: _validator['default'].exceedsMaxTextLength
      }, {
        label: this.webText,
        name: 'WebAddress',
        property: 'WebAddress',
        type: 'text',
        inputType: 'url',
        maxTextLength: 128,
        validator: _validator['default'].exceedsMaxTextLength
      }, {
        label: this.workText,
        name: 'WorkPhone',
        property: 'WorkPhone',
        type: 'phone',
        maxTextLength: 32,
        validator: _validator['default'].exceedsMaxTextLength
      }, {
        label: this.mobileText,
        name: 'Mobile',
        property: 'Mobile',
        type: 'phone',
        maxTextLength: 32,
        validator: _validator['default'].exceedsMaxTextLength
      }, {
        label: this.tollFreeText,
        name: 'TollFree',
        property: 'TollFree',
        type: 'phone',
        maxTextLength: 32,
        validator: _validator['default'].exceedsMaxTextLength
      }, {
        label: this.emailText,
        name: 'Email',
        property: 'Email',
        type: 'text',
        inputType: 'email'
      }, {
        label: this.contactTitleText,
        name: 'Title',
        property: 'Title',
        picklist: 'Title',
        title: this.titleTitleText,
        type: 'picklist',
        orderBy: 'text asc',
        maxTextLength: 64,
        validator: _validator['default'].exceedsMaxTextLength
      }, {
        emptyText: '',
        formatValue: _format['default'].address.bindDelegate(this, true),
        label: this.addressText,
        name: 'Address',
        property: 'Address',
        type: 'address',
        view: 'address_edit'
      }, {
        label: this.importSourceText,
        name: 'LeadSource',
        property: 'LeadSource',
        view: 'leadsource_list',
        textProperty: 'Description',
        type: 'lookup',
        validator: _validator['default'].exists
      }, {
        label: this.interestsText,
        name: 'Interests',
        property: 'Interests',
        type: 'text',
        maxTextLength: 128,
        validator: _validator['default'].exceedsMaxTextLength
      }, {
        label: this.industryText,
        name: 'Industry',
        property: 'Industry',
        picklist: 'Industry',
        title: this.industryTitleText,
        type: 'picklist',
        maxTextLength: 64,
        validator: _validator['default'].exceedsMaxTextLength
      }, {
        label: this.sicCodeText,
        name: 'SICCode',
        property: 'SICCode',
        type: 'text',
        maxTextLength: 64,
        validator: _validator['default'].exceedsMaxTextLength
      }, {
        label: this.businessText,
        name: 'BusinessDescription',
        property: 'BusinessDescription',
        noteProperty: false,
        title: this.businessTitleText,
        type: 'note',
        view: 'text_edit'
      }, {
        label: this.notesText,
        name: 'Notes',
        property: 'Notes',
        noteProperty: false,
        title: this.notesTitleText,
        type: 'note',
        view: 'text_edit'
      }, {
        label: this.leadOwnerText,
        name: 'Owner',
        property: 'Owner',
        textProperty: 'OwnerDescription',
        type: 'lookup',
        view: 'owner_list'
      }]);
    }
  });

  _lang['default'].setObject('Mobile.SalesLogix.Views.Lead.Edit', __class);
  module.exports = __class;
});

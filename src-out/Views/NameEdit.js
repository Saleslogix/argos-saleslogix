define('crm/Views/NameEdit', ['exports', 'module', 'dojo/_base/declare', 'dojo/_base/lang', '../Validator', 'argos/Edit'], function (exports, module, _dojo_baseDeclare, _dojo_baseLang, _Validator, _argosEdit) {
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _declare = _interopRequireDefault(_dojo_baseDeclare);

  var _lang = _interopRequireDefault(_dojo_baseLang);

  var _validator = _interopRequireDefault(_Validator);

  var _Edit = _interopRequireDefault(_argosEdit);

  /**
   * @class crm.Views.NameEdit
   *
   *
   * @extends argos.Edit
   *
   */
  var __class = (0, _declare['default'])('crm.Views.NameEdit', [_Edit['default']], {
    //Localization
    titleText: 'Edit Name',
    firstNameText: 'first',
    middleNameText: 'middle',
    lastNameText: 'last',
    prefixText: 'prefix',
    prefixTitleText: 'Name Prefix',
    suffixText: 'suffix',
    suffixTitleText: 'Name Suffix',

    //View Properties
    id: 'name_edit',

    createLayout: function createLayout() {
      return this.layout || (this.layout = [{
        emptyText: '',
        label: this.prefixText,
        name: 'Prefix',
        property: 'Prefix',
        picklist: 'Name Prefix',
        requireSelection: true,
        title: this.prefixTitleText,
        type: 'picklist'
      }, {
        name: 'FirstName',
        property: 'FirstName',
        label: this.firstNameText,
        type: 'text',
        maxTextLength: 32,
        validator: _validator['default'].exceedsMaxTextLength
      }, {
        name: 'MiddleName',
        property: 'MiddleName',
        label: this.middleNameText,
        type: 'text',
        maxTextLength: 32,
        validator: _validator['default'].exceedsMaxTextLength
      }, {
        name: 'LastName',
        property: 'LastName',
        label: this.lastNameText,
        type: 'text',
        maxTextLength: 32,
        validator: _validator['default'].exceedsMaxTextLength
      }, {
        emptyText: '',
        label: this.suffixText,
        name: 'Suffix',
        property: 'Suffix',
        picklist: 'Name Suffix',
        requireSelection: true,
        title: this.suffixTitleText,
        type: 'picklist'
      }]);
    }
  });

  _lang['default'].setObject('Mobile.SalesLogix.Views.NameEdit', __class);
  module.exports = __class;
});

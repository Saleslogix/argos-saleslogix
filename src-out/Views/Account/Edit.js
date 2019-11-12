define('crm/Views/Account/Edit', ['module', 'exports', 'dojo/_base/declare', 'dojo/string', '../../Validator', '../../Format', '../../Template', 'argos/Edit', 'argos/I18n'], function (module, exports, _declare, _string, _Validator, _Format, _Template, _Edit, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _string2 = _interopRequireDefault(_string);

  var _Validator2 = _interopRequireDefault(_Validator);

  var _Format2 = _interopRequireDefault(_Format);

  var _Template2 = _interopRequireDefault(_Template);

  var _Edit2 = _interopRequireDefault(_Edit);

  var _I18n2 = _interopRequireDefault(_I18n);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var resource = (0, _I18n2.default)('accountEdit');

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
  /* Copyright 2017 Infor
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *    http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   */

  var __class = (0, _declare2.default)('crm.Views.Account.Edit', [_Edit2.default], {
    // Localization
    accountStatusTitleText: resource.accountStatusTitleText,
    accountSubTypeTitleText: resource.accountSubTypeTitleText,
    accountText: resource.accountText,
    accountTypeTitleText: resource.accountTypeTitleText,
    acctMgrText: resource.acctMgrText,
    businessDescriptionText: resource.businessDescriptionText,
    businessDescriptionTitleText: resource.businessDescriptionTitleText,
    descriptionText: resource.descriptionText,
    faxText: resource.faxText,
    fullAddressText: resource.fullAddressText,
    importSourceText: resource.importSourceText,
    industryText: resource.industryText,
    industryTitleText: resource.industryTitleText,
    ownerText: resource.ownerText,
    phoneText: resource.phoneText,
    statusText: resource.statusText,
    subTypeText: resource.subTypeText,
    titleText: resource.titleText,
    typeText: resource.typeText,
    webText: resource.webText,

    // View Properties
    entityName: 'Account',
    id: 'account_edit',
    insertSecurity: 'Entities/Account/Add',
    updateSecurity: 'Entities/Account/Edit',
    querySelect: ['AccountManager/UserInfo/FirstName', 'AccountManager/UserInfo/LastName', 'AccountName', 'Address/*', 'BusinessDescription', 'Description', 'Fax', 'Industry', 'LeadSource/Description', 'MainPhone', 'Notes', 'Owner/OwnerDescription', 'Status', 'SubType', 'Type', 'User/UserInfo/UserName', 'WebAddress'],
    queryInclude: ['$permissions'],
    resourceKind: 'accounts',

    formatDependentPicklist: function formatDependentPicklist(dependentValue, nformat) {
      return _string2.default.substitute(nformat, [dependentValue]);
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
        validator: _Validator2.default.notEmpty,
        autoFocus: true
      }, {
        label: this.webText,
        name: 'WebAddress',
        property: 'WebAddress',
        renderer: _Format2.default.link,
        type: 'text',
        inputType: 'url',
        maxTextLength: 128,
        validator: _Validator2.default.exceedsMaxTextLength
      }, {
        label: this.phoneText,
        name: 'MainPhone',
        property: 'MainPhone',
        type: 'phone',
        maxTextLength: 32,
        validator: _Validator2.default.exceedsMaxTextLength
      }, {
        emptyText: '',
        formatValue: _Format2.default.address.bindDelegate(this, [true], true),
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
        validator: _Validator2.default.exceedsMaxTextLength
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
        validator: _Validator2.default.exceedsMaxTextLength
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
        validator: _Validator2.default.exceedsMaxTextLength
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
        textTemplate: _Template2.default.nameLF,
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

  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9WaWV3cy9BY2NvdW50L0VkaXQuanMiXSwibmFtZXMiOlsicmVzb3VyY2UiLCJfX2NsYXNzIiwiYWNjb3VudFN0YXR1c1RpdGxlVGV4dCIsImFjY291bnRTdWJUeXBlVGl0bGVUZXh0IiwiYWNjb3VudFRleHQiLCJhY2NvdW50VHlwZVRpdGxlVGV4dCIsImFjY3RNZ3JUZXh0IiwiYnVzaW5lc3NEZXNjcmlwdGlvblRleHQiLCJidXNpbmVzc0Rlc2NyaXB0aW9uVGl0bGVUZXh0IiwiZGVzY3JpcHRpb25UZXh0IiwiZmF4VGV4dCIsImZ1bGxBZGRyZXNzVGV4dCIsImltcG9ydFNvdXJjZVRleHQiLCJpbmR1c3RyeVRleHQiLCJpbmR1c3RyeVRpdGxlVGV4dCIsIm93bmVyVGV4dCIsInBob25lVGV4dCIsInN0YXR1c1RleHQiLCJzdWJUeXBlVGV4dCIsInRpdGxlVGV4dCIsInR5cGVUZXh0Iiwid2ViVGV4dCIsImVudGl0eU5hbWUiLCJpZCIsImluc2VydFNlY3VyaXR5IiwidXBkYXRlU2VjdXJpdHkiLCJxdWVyeVNlbGVjdCIsInF1ZXJ5SW5jbHVkZSIsInJlc291cmNlS2luZCIsImZvcm1hdERlcGVuZGVudFBpY2tsaXN0IiwiZGVwZW5kZW50VmFsdWUiLCJuZm9ybWF0Iiwic3Vic3RpdHV0ZSIsImFwcGx5Q29udGV4dCIsInRlbXBsYXRlRW50cnkiLCJpbmhlcml0ZWQiLCJhcmd1bWVudHMiLCJmaWVsZHMiLCJBY2NvdW50TWFuYWdlciIsInNldFZhbHVlIiwiQXBwIiwiY29udGV4dCIsInVzZXIiLCJPd25lciIsImRlZmF1bHRPd25lciIsIlR5cGUiLCJTdGF0dXMiLCJjcmVhdGVMYXlvdXQiLCJsYXlvdXQiLCJsYWJlbCIsIm5hbWUiLCJwcm9wZXJ0eSIsInR5cGUiLCJ2YWxpZGF0b3IiLCJub3RFbXB0eSIsImF1dG9Gb2N1cyIsInJlbmRlcmVyIiwibGluayIsImlucHV0VHlwZSIsIm1heFRleHRMZW5ndGgiLCJleGNlZWRzTWF4VGV4dExlbmd0aCIsImVtcHR5VGV4dCIsImZvcm1hdFZhbHVlIiwiYWRkcmVzcyIsImJpbmREZWxlZ2F0ZSIsInZpZXciLCJwaWNrbGlzdCIsInJlcXVpcmVTZWxlY3Rpb24iLCJ0aXRsZSIsImRlcGVuZHNPbiIsIm5vdGVQcm9wZXJ0eSIsInRleHRQcm9wZXJ0eSIsInRleHRUZW1wbGF0ZSIsIm5hbWVMRiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXVCQSxNQUFNQSxXQUFXLG9CQUFZLGFBQVosQ0FBakI7O0FBRUE7Ozs7Ozs7Ozs7O0FBekJBOzs7Ozs7Ozs7Ozs7Ozs7QUFvQ0EsTUFBTUMsVUFBVSx1QkFBUSx3QkFBUixFQUFrQyxnQkFBbEMsRUFBMEM7QUFDeEQ7QUFDQUMsNEJBQXdCRixTQUFTRSxzQkFGdUI7QUFHeERDLDZCQUF5QkgsU0FBU0csdUJBSHNCO0FBSXhEQyxpQkFBYUosU0FBU0ksV0FKa0M7QUFLeERDLDBCQUFzQkwsU0FBU0ssb0JBTHlCO0FBTXhEQyxpQkFBYU4sU0FBU00sV0FOa0M7QUFPeERDLDZCQUF5QlAsU0FBU08sdUJBUHNCO0FBUXhEQyxrQ0FBOEJSLFNBQVNRLDRCQVJpQjtBQVN4REMscUJBQWlCVCxTQUFTUyxlQVQ4QjtBQVV4REMsYUFBU1YsU0FBU1UsT0FWc0M7QUFXeERDLHFCQUFpQlgsU0FBU1csZUFYOEI7QUFZeERDLHNCQUFrQlosU0FBU1ksZ0JBWjZCO0FBYXhEQyxrQkFBY2IsU0FBU2EsWUFiaUM7QUFjeERDLHVCQUFtQmQsU0FBU2MsaUJBZDRCO0FBZXhEQyxlQUFXZixTQUFTZSxTQWZvQztBQWdCeERDLGVBQVdoQixTQUFTZ0IsU0FoQm9DO0FBaUJ4REMsZ0JBQVlqQixTQUFTaUIsVUFqQm1DO0FBa0J4REMsaUJBQWFsQixTQUFTa0IsV0FsQmtDO0FBbUJ4REMsZUFBV25CLFNBQVNtQixTQW5Cb0M7QUFvQnhEQyxjQUFVcEIsU0FBU29CLFFBcEJxQztBQXFCeERDLGFBQVNyQixTQUFTcUIsT0FyQnNDOztBQXVCeEQ7QUFD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QVBMLE9BckZrQyxFQTZGbEM7QUFDRGhCLGVBQU8sS0FBS2xDLFNBRFg7QUFFRG1DLGNBQU0sT0FGTDtBQUdEQyxrQkFBVSxPQUhUO0FBSURvQixzQkFBYyxrQkFKYjtBQUtEbkIsY0FBTSxRQUxMO0FBTURhLGNBQU07QUFOTCxPQTdGa0MsRUFvR2xDO0FBQ0RoQixlQUFPLEtBQUtyQyxnQkFEWDtBQUVEc0MsY0FBTSxZQUZMO0FBR0RDLGtCQUFVLFlBSFQ7QUFJRG9CLHNCQUFjLGFBSmI7QUFLRG5CLGNBQU0sUUFMTDtBQU1EYSxjQUFNO0FBTkwsT0FwR2tDLENBQTlCLENBQVA7QUE0R0Q7QUE3S3VELEdBQTFDLENBQWhCOztvQkFnTGVoRSxPIiwiZmlsZSI6IkVkaXQuanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IDIwMTcgSW5mb3JcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG5pbXBvcnQgZGVjbGFyZSBmcm9tICdkb2pvL19iYXNlL2RlY2xhcmUnO1xyXG5pbXBvcnQgc3RyaW5nIGZyb20gJ2Rvam8vc3RyaW5nJztcclxuaW1wb3J0IHZhbGlkYXRvciBmcm9tICcuLi8uLi9WYWxpZGF0b3InO1xyXG5pbXBvcnQgZm9ybWF0IGZyb20gJy4uLy4uL0Zvcm1hdCc7XHJcbmltcG9ydCB0ZW1wbGF0ZSBmcm9tICcuLi8uLi9UZW1wbGF0ZSc7XHJcbmltcG9ydCBFZGl0IGZyb20gJ2FyZ29zL0VkaXQnO1xyXG5pbXBvcnQgZ2V0UmVzb3VyY2UgZnJvbSAnYXJnb3MvSTE4bic7XHJcblxyXG5jb25zdCByZXNvdXJjZSA9IGdldFJlc291cmNlKCdhY2NvdW50RWRpdCcpO1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBjcm0uVmlld3MuQWNjb3VudC5FZGl0XHJcbiAqXHJcbiAqIEBleHRlbmRzIGFyZ29zLkVkaXRcclxuICpcclxuICogQHJlcXVpcmVzIGFyZ29zLkVkaXRcclxuICogQHJlcXVpcmVzIGNybS5Gb3JtYXRcclxuICogQHJlcXVpcmVzIGNybS5WYWxpZGF0b3JcclxuICogQHJlcXVpcmVzIGNybS5UZW1wbGF0ZVxyXG4gKlxyXG4gKi9cclxuY29uc3QgX19jbGFzcyA9IGRlY2xhcmUoJ2NybS5WaWV3cy5BY2NvdW50LkVkaXQnLCBbRWRpdF0sIHtcclxuICAvLyBMb2NhbGl6YXRpb25cclxuICBhY2NvdW50U3RhdHVzVGl0bGVUZXh0OiByZXNvdXJjZS5hY2NvdW50U3RhdHVzVGl0bGVUZXh0LFxyXG4gIGFjY291bnRTdWJUeXBlVGl0bGVUZXh0OiByZXNvdXJjZS5hY2NvdW50U3ViVHlwZVRpdGxlVGV4dCxcclxuICBhY2NvdW50VGV4dDogcmVzb3VyY2UuYWNjb3VudFRleHQsXHJcbiAgYWNjb3VudFR5cGVUaXRsZVRleHQ6IHJlc291cmNlLmFjY291bnRUeXBlVGl0bGVUZXh0LFxyXG4gIGFjY3RNZ3JUZXh0OiByZXNvdXJjZS5hY2N0TWdyVGV4dCxcclxuICBidXNpbmVzc0Rlc2NyaXB0aW9uVGV4dDogcmVzb3VyY2UuYnVzaW5lc3NEZXNjcmlwdGlvblRleHQsXHJcbiAgYnVzaW5lc3NEZXNjcmlwdGlvblRpdGxlVGV4dDogcmVzb3VyY2UuYnVzaW5lc3NEZXNjcmlwdGlvblRpdGxlVGV4dCxcclxuICBkZXNjcmlwdGlvblRleHQ6IHJlc291cmNlLmRlc2NyaXB0aW9uVGV4dCxcclxuICBmYXhUZXh0OiByZXNvdXJjZS5mYXhUZXh0LFxyXG4gIGZ1bGxBZGRyZXNzVGV4dDogcmVzb3VyY2UuZnVsbEFkZHJlc3NUZXh0LFxyXG4gIGltcG9ydFNvdXJjZVRleHQ6IHJlc291cmNlLmltcG9ydFNvdXJjZVRleHQsXHJcbiAgaW5kdXN0cnlUZXh0OiByZXNvdXJjZS5pbmR1c3RyeVRleHQsXHJcbiAgaW5kdXN0cnlUaXRsZVRleHQ6IHJlc291cmNlLmluZHVzdHJ5VGl0bGVUZXh0LFxyXG4gIG93bmVyVGV4dDogcmVzb3VyY2Uub3duZXJUZXh0LFxyXG4gIHBob25lVGV4dDogcmVzb3VyY2UucGhvbmVUZXh0LFxyXG4gIHN0YXR1c1RleHQ6IHJlc291cmNlLnN0YXR1c1RleHQsXHJcbiAgc3ViVHlwZVRleHQ6IHJlc291cmNlLnN1YlR5cGVUZXh0LFxyXG4gIHRpdGxlVGV4dDogcmVzb3VyY2UudGl0bGVUZXh0LFxyXG4gIHR5cGVUZXh0OiByZXNvdXJjZS50eXBlVGV4dCxcclxuICB3ZWJUZXh0OiByZXNvdXJjZS53ZWJUZXh0LFxyXG5cclxuICAvLyBWaWV3IFByb3BlcnRpZXNcclxuICBlbnRpdHlOYW1lOiAnQWNjb3VudCcsXHJcbiAgaWQ6ICdhY2NvdW50X2VkaXQnLFxyXG4gIGluc2VydFNlY3VyaXR5OiAnRW50aXRpZXMvQWNjb3VudC9BZGQnLFxyXG4gIHVwZGF0ZVNlY3VyaXR5OiAnRW50aXRpZXMvQWNjb3VudC9FZGl0JyxcclxuICBxdWVyeVNlbGVjdDogW1xyXG4gICAgJ0FjY291bnRNYW5hZ2VyL1VzZXJJbmZvL0ZpcnN0TmFtZScsXHJcbiAgICAnQWNjb3VudE1hbmFnZXIvVXNlckluZm8vTGFzdE5hbWUnLFxyXG4gICAgJ0FjY291bnROYW1lJyxcclxuICAgICdBZGRyZXNzLyonLFxyXG4gICAgJ0J1c2luZXNzRGVzY3JpcHRpb24nLFxyXG4gICAgJ0Rlc2NyaXB0aW9uJyxcclxuICAgICdGYXgnLFxyXG4gICAgJ0luZHVzdHJ5JyxcclxuICAgICdMZWFkU291cmNlL0Rlc2NyaXB0aW9uJyxcclxuICAgICdNYWluUGhvbmUnLFxyXG4gICAgJ05vdGVzJyxcclxuICAgICdPd25lci9Pd25lckRlc2NyaXB0aW9uJyxcclxuICAgICdTdGF0dXMnLFxyXG4gICAgJ1N1YlR5cGUnLFxyXG4gICAgJ1R5cGUnLFxyXG4gICAgJ1VzZXIvVXNlckluZm8vVXNlck5hbWUnLFxyXG4gICAgJ1dlYkFkZHJlc3MnLFxyXG4gIF0sXHJcbiAgcXVlcnlJbmNsdWRlOiBbXHJcbiAgICAnJHBlcm1pc3Npb25zJyxcclxuICBdLFxyXG4gIHJlc291cmNlS2luZDogJ2FjY291bnRzJyxcclxuXHJcbiAgZm9ybWF0RGVwZW5kZW50UGlja2xpc3Q6IGZ1bmN0aW9uIGZvcm1hdERlcGVuZGVudFBpY2tsaXN0KGRlcGVuZGVudFZhbHVlLCBuZm9ybWF0KSB7XHJcbiAgICByZXR1cm4gc3RyaW5nLnN1YnN0aXR1dGUobmZvcm1hdCwgW2RlcGVuZGVudFZhbHVlXSk7XHJcbiAgfSxcclxuICBhcHBseUNvbnRleHQ6IGZ1bmN0aW9uIGFwcGx5Q29udGV4dCh0ZW1wbGF0ZUVudHJ5KSB7XHJcbiAgICB0aGlzLmluaGVyaXRlZChhcmd1bWVudHMpO1xyXG5cclxuICAgIHRoaXMuZmllbGRzLkFjY291bnRNYW5hZ2VyLnNldFZhbHVlKEFwcC5jb250ZXh0LnVzZXIpO1xyXG4gICAgdGhpcy5maWVsZHMuT3duZXIuc2V0VmFsdWUoQXBwLmNvbnRleHQuZGVmYXVsdE93bmVyKTtcclxuXHJcbiAgICB0aGlzLmZpZWxkcy5UeXBlLnNldFZhbHVlKHRlbXBsYXRlRW50cnkuVHlwZSk7XHJcbiAgICB0aGlzLmZpZWxkcy5TdGF0dXMuc2V0VmFsdWUodGVtcGxhdGVFbnRyeS5TdGF0dXMpO1xyXG4gIH0sXHJcbiAgY3JlYXRlTGF5b3V0OiBmdW5jdGlvbiBjcmVhdGVMYXlvdXQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5sYXlvdXQgfHwgKHRoaXMubGF5b3V0ID0gW3tcclxuICAgICAgbGFiZWw6IHRoaXMuYWNjb3VudFRleHQsXHJcbiAgICAgIG5hbWU6ICdBY2NvdW50TmFtZScsXHJcbiAgICAgIHByb3BlcnR5OiAnQWNjb3VudE5hbWUnLFxyXG4gICAgICB0eXBlOiAndGV4dCcsXHJcbiAgICAgIHZhbGlkYXRvcjogdmFsaWRhdG9yLm5vdEVtcHR5LFxyXG4gICAgICBhdXRvRm9jdXM6IHRydWUsXHJcbiAgICB9LCB7XHJcbiAgICAgIGxhYmVsOiB0aGlzLndlYlRleHQsXHJcbiAgICAgIG5hbWU6ICdXZWJBZGRyZXNzJyxcclxuICAgICAgcHJvcGVydHk6ICdXZWJBZGRyZXNzJyxcclxuICAgICAgcmVuZGVyZXI6IGZvcm1hdC5saW5rLFxyXG4gICAgICB0eXBlOiAndGV4dCcsXHJcbiAgICAgIGlucHV0VHlwZTogJ3VybCcsXHJcbiAgICAgIG1heFRleHRMZW5ndGg6IDEyOCxcclxuICAgICAgdmFsaWRhdG9yOiB2YWxpZGF0b3IuZXhjZWVkc01heFRleHRMZW5ndGgsXHJcbiAgICB9LCB7XHJcbiAgICAgIGxhYmVsOiB0aGlzLnBob25lVGV4dCxcclxuICAgICAgbmFtZTogJ01haW5QaG9uZScsXHJcbiAgICAgIHByb3BlcnR5OiAnTWFpblBob25lJyxcclxuICAgICAgdHlwZTogJ3Bob25lJyxcclxuICAgICAgbWF4VGV4dExlbmd0aDogMzIsXHJcbiAgICAgIHZhbGlkYXRvcjogdmFsaWRhdG9yLmV4Y2VlZHNNYXhUZXh0TGVuZ3RoLFxyXG4gICAgfSwge1xyXG4gICAgICBlbXB0eVRleHQ6ICcnLFxyXG4gICAgICBmb3JtYXRWYWx1ZTogZm9ybWF0LmFkZHJlc3MuYmluZERlbGVnYXRlKHRoaXMsIFt0cnVlXSwgdHJ1ZSksXHJcbiAgICAgIGxhYmVsOiB0aGlzLmZ1bGxBZGRyZXNzVGV4dCxcclxuICAgICAgbmFtZTogJ0FkZHJlc3MnLFxyXG4gICAgICBwcm9wZXJ0eTogJ0FkZHJlc3MnLFxyXG4gICAgICB0eXBlOiAnYWRkcmVzcycsXHJcbiAgICAgIHZpZXc6ICdhZGRyZXNzX2VkaXQnLFxyXG4gICAgfSwge1xyXG4gICAgICBsYWJlbDogdGhpcy5mYXhUZXh0LFxyXG4gICAgICBuYW1lOiAnRmF4JyxcclxuICAgICAgcHJvcGVydHk6ICdGYXgnLFxyXG4gICAgICB0eXBlOiAncGhvbmUnLFxyXG4gICAgICBtYXhUZXh0TGVuZ3RoOiAzMixcclxuICAgICAgdmFsaWRhdG9yOiB2YWxpZGF0b3IuZXhjZWVkc01heFRleHRMZW5ndGgsXHJcbiAgICB9LCB7XHJcbiAgICAgIGxhYmVsOiB0aGlzLnR5cGVUZXh0LFxyXG4gICAgICBuYW1lOiAnVHlwZScsXHJcbiAgICAgIHByb3BlcnR5OiAnVHlwZScsXHJcbiAgICAgIHBpY2tsaXN0OiAnQWNjb3VudCBUeXBlJyxcclxuICAgICAgcmVxdWlyZVNlbGVjdGlvbjogdHJ1ZSxcclxuICAgICAgdGl0bGU6IHRoaXMuYWNjb3VudFR5cGVUaXRsZVRleHQsXHJcbiAgICAgIHR5cGU6ICdwaWNrbGlzdCcsXHJcbiAgICB9LCB7XHJcbiAgICAgIGRlcGVuZHNPbjogJ1R5cGUnLFxyXG4gICAgICBsYWJlbDogdGhpcy5zdWJUeXBlVGV4dCxcclxuICAgICAgbmFtZTogJ1N1YlR5cGUnLFxyXG4gICAgICBwcm9wZXJ0eTogJ1N1YlR5cGUnLFxyXG4gICAgICBwaWNrbGlzdDogdGhpcy5mb3JtYXREZXBlbmRlbnRQaWNrbGlzdC5iaW5kRGVsZWdhdGUoXHJcbiAgICAgICAgdGhpcywgJ0FjY291bnQgJHswfScsIHRydWVcclxuICAgICAgKSxcclxuICAgICAgcmVxdWlyZVNlbGVjdGlvbjogZmFsc2UsXHJcbiAgICAgIHRpdGxlOiB0aGlzLmFjY291bnRTdWJUeXBlVGl0bGVUZXh0LFxyXG4gICAgICB0eXBlOiAncGlja2xpc3QnLFxyXG4gICAgICBtYXhUZXh0TGVuZ3RoOiA2NCxcclxuICAgICAgdmFsaWRhdG9yOiB2YWxpZGF0b3IuZXhjZWVkc01heFRleHRMZW5ndGgsXHJcbiAgICB9LCB7XHJcbiAgICAgIGxhYmVsOiB0aGlzLnN0YXR1c1RleHQsXHJcbiAgICAgIG5hbWU6ICdTdGF0dXMnLFxyXG4gICAgICBwcm9wZXJ0eTogJ1N0YXR1cycsXHJcbiAgICAgIHBpY2tsaXN0OiAnQWNjb3VudCBTdGF0dXMnLFxyXG4gICAgICByZXF1aXJlU2VsZWN0aW9uOiBmYWxzZSxcclxuICAgICAgdGl0bGU6IHRoaXMuYWNjb3VudFN0YXR1c1RpdGxlVGV4dCxcclxuICAgICAgdHlwZTogJ3BpY2tsaXN0JyxcclxuICAgIH0sIHtcclxuICAgICAgbGFiZWw6IHRoaXMuaW5kdXN0cnlUZXh0LFxyXG4gICAgICBuYW1lOiAnSW5kdXN0cnknLFxyXG4gICAgICBwcm9wZXJ0eTogJ0luZHVzdHJ5JyxcclxuICAgICAgcGlja2xpc3Q6ICdJbmR1c3RyeScsXHJcbiAgICAgIHJlcXVpcmVTZWxlY3Rpb246IGZhbHNlLFxyXG4gICAgICB0aXRsZTogdGhpcy5pbmR1c3RyeVRpdGxlVGV4dCxcclxuICAgICAgdHlwZTogJ3BpY2tsaXN0JyxcclxuICAgICAgbWF4VGV4dExlbmd0aDogNjQsXHJcbiAgICAgIHZhbGlkYXRvcjogdmFsaWRhdG9yLmV4Y2VlZHNNYXhUZXh0TGVuZ3RoLFxyXG4gICAgfSwge1xyXG4gICAgICBsYWJlbDogdGhpcy5idXNpbmVzc0Rlc2NyaXB0aW9uVGV4dCxcclxuICAgICAgbmFtZTogJ0J1c2luZXNzRGVzY3JpcHRpb24nLFxyXG4gICAgICBwcm9wZXJ0eTogJ0J1c2luZXNzRGVzY3JpcHRpb24nLFxyXG4gICAgICBub3RlUHJvcGVydHk6IGZhbHNlLFxyXG4gICAgICB0aXRsZTogdGhpcy5idXNpbmVzc0Rlc2NyaXB0aW9uVGl0bGVUZXh0LFxyXG4gICAgICB0eXBlOiAnbm90ZScsXHJcbiAgICAgIHZpZXc6ICd0ZXh0X2VkaXQnLFxyXG4gICAgfSwge1xyXG4gICAgICBsYWJlbDogdGhpcy5hY2N0TWdyVGV4dCxcclxuICAgICAgbmFtZTogJ0FjY291bnRNYW5hZ2VyJyxcclxuICAgICAgcHJvcGVydHk6ICdBY2NvdW50TWFuYWdlcicsXHJcbiAgICAgIHRleHRQcm9wZXJ0eTogJ1VzZXJJbmZvJyxcclxuICAgICAgdGV4dFRlbXBsYXRlOiB0ZW1wbGF0ZS5uYW1lTEYsXHJcbiAgICAgIHR5cGU6ICdsb29rdXAnLFxyXG4gICAgICB2aWV3OiAndXNlcl9saXN0JyxcclxuICAgIH0sIHtcclxuICAgICAgbGFiZWw6IHRoaXMub3duZXJUZXh0LFxyXG4gICAgICBuYW1lOiAnT3duZXInLFxyXG4gICAgICBwcm9wZXJ0eTogJ093bmVyJyxcclxuICAgICAgdGV4dFByb3BlcnR5OiAnT3duZXJEZXNjcmlwdGlvbicsXHJcbiAgICAgIHR5cGU6ICdsb29rdXAnLFxyXG4gICAgICB2aWV3OiAnb3duZXJfbGlzdCcsXHJcbiAgICB9LCB7XHJcbiAgICAgIGxhYmVsOiB0aGlzLmltcG9ydFNvdXJjZVRleHQsXHJcbiAgICAgIG5hbWU6ICdMZWFkU291cmNlJyxcclxuICAgICAgcHJvcGVydHk6ICdMZWFkU291cmNlJyxcclxuICAgICAgdGV4dFByb3BlcnR5OiAnRGVzY3JpcHRpb24nLFxyXG4gICAgICB0eXBlOiAnbG9va3VwJyxcclxuICAgICAgdmlldzogJ2xlYWRzb3VyY2VfbGlzdCcsXHJcbiAgICB9XSk7XHJcbiAgfSxcclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBfX2NsYXNzO1xyXG4iXX0=
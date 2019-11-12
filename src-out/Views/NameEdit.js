define('crm/Views/NameEdit', ['module', 'exports', 'dojo/_base/declare', '../Validator', 'argos/Edit', 'argos/I18n'], function (module, exports, _declare, _Validator, _Edit, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _Validator2 = _interopRequireDefault(_Validator);

  var _Edit2 = _interopRequireDefault(_Edit);

  var _I18n2 = _interopRequireDefault(_I18n);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

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

  var resource = (0, _I18n2.default)('nameEdit');

  /**
   * @class crm.Views.NameEdit
   *
   *
   * @extends argos.Edit
   *
   */
  var __class = (0, _declare2.default)('crm.Views.NameEdit', [_Edit2.default], {
    // Localization
    titleText: resource.titleText,
    firstNameText: resource.firstNameText,
    middleNameText: resource.middleNameText,
    lastNameText: resource.lastNameText,
    prefixText: resource.prefixText,
    prefixTitleText: resource.prefixTitleText,
    suffixText: resource.suffixText,
    suffixTitleText: resource.suffixTitleText,

    // View Properties
    id: 'name_edit',

    createLayout: function createLayout() {
      return this.layout || (this.layout = [{
        emptyText: '',
        label: this.prefixText,
        name: 'Prefix',
        property: 'Prefix',
        picklist: 'Name Prefix',
        picklistOptions: function picklistOptions(entry) {
          // Checks if entry is a Contact
          if (entry.hasOwnProperty('NameLF')) {
            return {
              filterByLanguage: true,
              language: entry.LocationCode && entry.LocationCode.trim() || App.getCurrentLocale(),
              storageMode: 'text'
            };
          }
          return {
            filterByLanguage: false,
            language: ' ',
            storageMode: 'text'
          };
        },
        languageCodeProperty: 'LocationCode',
        requireSelection: true,
        storageMode: 'text',
        title: this.prefixTitleText,
        type: 'picklist'
      }, {
        name: 'FirstName',
        property: 'FirstName',
        label: this.firstNameText,
        type: 'text',
        maxTextLength: 32,
        validator: _Validator2.default.exceedsMaxTextLength
      }, {
        name: 'MiddleName',
        property: 'MiddleName',
        label: this.middleNameText,
        type: 'text',
        maxTextLength: 32,
        validator: _Validator2.default.exceedsMaxTextLength
      }, {
        name: 'LastName',
        property: 'LastName',
        label: this.lastNameText,
        type: 'text',
        maxTextLength: 32,
        validator: _Validator2.default.exceedsMaxTextLength
      }, {
        emptyText: '',
        label: this.suffixText,
        name: 'Suffix',
        property: 'Suffix',
        picklist: 'Name Suffix',
        picklistOptions: function picklistOptions(entry) {
          // Checks if entry is a Contact
          if (entry.hasOwnProperty('NameLF')) {
            return {
              filterByLanguage: true,
              language: entry.LocationCode && entry.LocationCode.trim() || App.getCurrentLocale(),
              storageMode: 'text'
            };
          }
          return {
            filterByLanguage: false,
            language: ' ',
            storageMode: 'text'
          };
        },
        languageCodeProperty: 'LocationCode',
        requireSelection: true,
        storageMode: 'text',
        title: this.suffixTitleText,
        type: 'picklist'
      }]);
    }
  });

  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9WaWV3cy9OYW1lRWRpdC5qcyJdLCJuYW1lcyI6WyJyZXNvdXJjZSIsIl9fY2xhc3MiLCJ0aXRsZVRleHQiLCJmaXJzdE5hbWVUZXh0IiwibWlkZGxlTmFtZVRleHQiLCJsYXN0TmFtZVRleHQiLCJwcmVmaXhUZXh0IiwicHJlZml4VGl0bGVUZXh0Iiwic3VmZml4VGV4dCIsInN1ZmZpeFRpdGxlVGV4dCIsImlkIiwiY3JlYXRlTGF5b3V0IiwibGF5b3V0IiwiZW1wdHlUZXh0IiwibGFiZWwiLCJuYW1lIiwicHJvcGVydHkiLCJwaWNrbGlzdCIsInBpY2tsaXN0T3B0aW9ucyIsImVudHJ5IiwiaGFzT3duUHJvcGVydHkiLCJmaWx0ZXJCeUxhbmd1YWdlIiwibGFuZ3VhZ2UiLCJMb2NhdGlvbkNvZGUiLCJ0cmltIiwiQXBwIiwiZ2V0Q3VycmVudExvY2FsZSIsInN0b3JhZ2VNb2RlIiwibGFuZ3VhZ2VDb2RlUHJvcGVydHkiLCJyZXF1aXJlU2VsZWN0aW9uIiwidGl0bGUiLCJ0eXBlIiwibWF4VGV4dExlbmd0aCIsInZhbGlkYXRvciIsImV4Y2VlZHNNYXhUZXh0TGVuZ3RoIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7OztBQW9CQSxNQUFNQSxXQUFXLG9CQUFZLFVBQVosQ0FBakI7O0FBRUE7Ozs7Ozs7QUFPQSxNQUFNQyxVQUFVLHVCQUFRLG9CQUFSLEVBQThCLGdCQUE5QixFQUFzQztBQUNwRDtBQUNBQyxlQUFXRixTQUFTRSxTQUZnQztBQUdwREMsbUJBQWVILFNBQVNHLGFBSDRCO0FBSXBEQyxvQkFBZ0JKLFNBQVNJLGNBSjJCO0FBS3BEQyxrQkFBY0wsU0FBU0ssWUFMNkI7QUFNcERDLGdCQUFZTixTQUFTTSxVQU4rQjtBQU9wREMscUJBQWlCUCxTQUFTTyxlQVAwQjtBQVFwREMsZ0JBQVlSLFNBQVNRLFVBUitCO0FBU3BEQyxxQkFBaUJULFNBQVNTLGVBVDBCOztBQVdwRDtBQUNBQyxRQUFJLFdBWmdEOztBQWNwREMsa0JBQWMsU0FBU0EsWUFBVCxHQUF3QjtBQUNwQyxhQUFPLEtBQUtDLE1BQUwsS0FBZ0IsS0FBS0EsTUFBTCxHQUFjLENBQUM7QUFDcENDLG1CQUFXLEVBRHlCO0FBRXBDQyxlQUFPLEtBQUtSLFVBRndCO0FBR3BDUyxjQUFNLFFBSDhCO0FBSXBDQyxrQkFBVSxRQUowQjtBQUtwQ0Msa0JBQVUsYUFMMEI7QUFNcENDLHlCQUFpQix5QkFBQ0MsS0FBRCxFQUFXO0FBQzFCO0FBQ0EsY0FBSUEsTUFBTUMsY0FBTixDQUFxQixRQUFyQixDQUFKLEVBQW9DO0FBQ2xDLG1CQUFPO0FBQ0xDLGdDQUFrQixJQURiO0FBRUxDLHdCQUFVSCxNQUFNSSxZQUFOLElBQXNCSixNQUFNSSxZQUFOLENBQW1CQyxJQUFuQixFQUF0QixJQUFtREMsSUFBSUMsZ0JBQUosRUFGeEQ7QUFHTEMsMkJBQWE7QUFIUixhQUFQO0FBS0Q7QUFDRCxpQkFBTztBQUNMTiw4QkFBa0IsS0FEYjtBQUVMQyxzQkFBVSxHQUZMO0FBR0xLLHlCQUFhO0FBSFIsV0FBUDtBQUtELFNBcEJtQztBQXFCcENDLDhCQUFzQixjQXJCYztBQXNCcENDLDBCQUFrQixJQXRCa0I7QUF1QnBDRixxQkFBYSxNQXZCdUI7QUF3QnBDRyxlQUFPLEtBQUt2QixlQXhCd0I7QUF5QnBDd0IsY0FBTTtBQXpCOEIsT0FBRCxFQTBCbEM7QUFDRGhCLGNBQU0sV0FETDtBQUVEQyxrQkFBVSxXQUZUO0FBR0RGLGVBQU8sS0FBS1gsYUFIWDtBQUlENEIsY0FBTSxNQUpMO0FBS0RDLHVCQUFlLEVBTGQ7QUFNREMsbUJBQVcsb0JBQVVDO0FBTnBCLE9BMUJrQyxFQWlDbEM7QUFDRG5CLGNBQU0sWUFETDtBQUVEQyxrQkFBVSxZQUZUO0FBR0RGLGVBQU8sS0FBS1YsY0FIWDtBQUlEMkIsY0FBTSxNQUpMO0FBS0RDLHVCQUFlLEVBTGQ7QUFNREMsbUJBQVcsb0JBQVVDO0FBTnBCLE9BakNrQyxFQXdDbEM7QUFDRG5CLGNBQU0sVUFETDtBQUVEQyxrQkFBVSxVQUZUO0FBR0RGLGVBQU8sS0FBS1QsWUFIWDtBQUlEMEIsY0FBTSxNQUpMO0FBS0RDLHVCQUFlLEVBTGQ7QUFNREMsbUJBQVcsb0JBQVVDO0FBTnBCLE9BeENrQyxFQStDbEM7QUFDRHJCLG1CQUFXLEVBRFY7QUFFREMsZUFBTyxLQUFLTixVQUZYO0FBR0RPLGNBQU0sUUFITDtBQUlEQyxrQkFBVSxRQUpUO0FBS0RDLGtCQUFVLGFBTFQ7QUFNREMseUJBQWlCLHlCQUFDQyxLQUFELEVBQVc7QUFDMUI7QUFDQSxjQUFJQSxNQUFNQyxjQUFOLENBQXFCLFFBQXJCLENBQUosRUFBb0M7QUFDbEMsbUJBQU87QUFDTEMsZ0NBQWtCLElBRGI7QUFFTEMsd0JBQVVILE1BQU1JLFlBQU4sSUFBc0JKLE1BQU1JLFlBQU4sQ0FBbUJDLElBQW5CLEVBQXRCLElBQW1EQyxJQUFJQyxnQkFBSixFQUZ4RDtBQUdMQywyQkFBYTtBQUhSLGFBQVA7QUFLRDtBQUNELGlCQUFPO0FBQ0xOLDhCQUFrQixLQURiO0FBRUxDLHNCQUFVLEdBRkw7QUFHTEsseUJBQWE7QUFIUixXQUFQO0FBS0QsU0FwQkE7QUFxQkRDLDhCQUFzQixjQXJCckI7QUFzQkRDLDBCQUFrQixJQXRCakI7QUF1QkRGLHFCQUFhLE1BdkJaO0FBd0JERyxlQUFPLEtBQUtyQixlQXhCWDtBQXlCRHNCLGNBQU07QUF6QkwsT0EvQ2tDLENBQTlCLENBQVA7QUEwRUQ7QUF6Rm1ELEdBQXRDLENBQWhCOztvQkE0RmU5QixPIiwiZmlsZSI6Ik5hbWVFZGl0LmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAyMDE3IEluZm9yXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuaW1wb3J0IGRlY2xhcmUgZnJvbSAnZG9qby9fYmFzZS9kZWNsYXJlJztcclxuaW1wb3J0IHZhbGlkYXRvciBmcm9tICcuLi9WYWxpZGF0b3InO1xyXG5pbXBvcnQgRWRpdCBmcm9tICdhcmdvcy9FZGl0JztcclxuaW1wb3J0IGdldFJlc291cmNlIGZyb20gJ2FyZ29zL0kxOG4nO1xyXG5cclxuY29uc3QgcmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgnbmFtZUVkaXQnKTtcclxuXHJcbi8qKlxyXG4gKiBAY2xhc3MgY3JtLlZpZXdzLk5hbWVFZGl0XHJcbiAqXHJcbiAqXHJcbiAqIEBleHRlbmRzIGFyZ29zLkVkaXRcclxuICpcclxuICovXHJcbmNvbnN0IF9fY2xhc3MgPSBkZWNsYXJlKCdjcm0uVmlld3MuTmFtZUVkaXQnLCBbRWRpdF0sIHtcclxuICAvLyBMb2NhbGl6YXRpb25cclxuICB0aXRsZVRleHQ6IHJlc291cmNlLnRpdGxlVGV4dCxcclxuICBmaXJzdE5hbWVUZXh0OiByZXNvdXJjZS5maXJzdE5hbWVUZXh0LFxyXG4gIG1pZGRsZU5hbWVUZXh0OiByZXNvdXJjZS5taWRkbGVOYW1lVGV4dCxcclxuICBsYXN0TmFtZVRleHQ6IHJlc291cmNlLmxhc3ROYW1lVGV4dCxcclxuICBwcmVmaXhUZXh0OiByZXNvdXJjZS5wcmVmaXhUZXh0LFxyXG4gIHByZWZpeFRpdGxlVGV4dDogcmVzb3VyY2UucHJlZml4VGl0bGVUZXh0LFxyXG4gIHN1ZmZpeFRleHQ6IHJlc291cmNlLnN1ZmZpeFRleHQsXHJcbiAgc3VmZml4VGl0bGVUZXh0OiByZXNvdXJjZS5zdWZmaXhUaXRsZVRleHQsXHJcblxyXG4gIC8vIFZpZXcgUHJvcGVydGllc1xyXG4gIGlkOiAnbmFtZV9lZGl0JyxcclxuXHJcbiAgY3JlYXRlTGF5b3V0OiBmdW5jdGlvbiBjcmVhdGVMYXlvdXQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5sYXlvdXQgfHwgKHRoaXMubGF5b3V0ID0gW3tcclxuICAgICAgZW1wdHlUZXh0OiAnJyxcclxuICAgICAgbGFiZWw6IHRoaXMucHJlZml4VGV4dCxcclxuICAgICAgbmFtZTogJ1ByZWZpeCcsXHJcbiAgICAgIHByb3BlcnR5OiAnUHJlZml4JyxcclxuICAgICAgcGlja2xpc3Q6ICdOYW1lIFByZWZpeCcsXHJcbiAgICAgIHBpY2tsaXN0T3B0aW9uczogKGVudHJ5KSA9PiB7XHJcbiAgICAgICAgLy8gQ2hlY2tzIGlmIGVudHJ5IGlzIGEgQ29udGFjdFxyXG4gICAgICAgIGlmIChlbnRyeS5oYXNPd25Qcm9wZXJ0eSgnTmFtZUxGJykpIHtcclxuICAgICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGZpbHRlckJ5TGFuZ3VhZ2U6IHRydWUsXHJcbiAgICAgICAgICAgIGxhbmd1YWdlOiBlbnRyeS5Mb2NhdGlvbkNvZGUgJiYgZW50cnkuTG9jYXRpb25Db2RlLnRyaW0oKSB8fCBBcHAuZ2V0Q3VycmVudExvY2FsZSgpLFxyXG4gICAgICAgICAgICBzdG9yYWdlTW9kZTogJ3RleHQnLFxyXG4gICAgICAgICAgfTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgIGZpbHRlckJ5TGFuZ3VhZ2U6IGZhbHNlLFxyXG4gICAgICAgICAgbGFuZ3VhZ2U6ICcgJyxcclxuICAgICAgICAgIHN0b3JhZ2VNb2RlOiAndGV4dCcsXHJcbiAgICAgICAgfTtcclxuICAgICAgfSxcclxuICAgICAgbGFuZ3VhZ2VDb2RlUHJvcGVydHk6ICdMb2NhdGlvbkNvZGUnLFxyXG4gICAgICByZXF1aXJlU2VsZWN0aW9uOiB0cnVlLFxyXG4gICAgICBzdG9yYWdlTW9kZTogJ3RleHQnLFxyXG4gICAgICB0aXRsZTogdGhpcy5wcmVmaXhUaXRsZVRleHQsXHJcbiAgICAgIHR5cGU6ICdwaWNrbGlzdCcsXHJcbiAgICB9LCB7XHJcbiAgICAgIG5hbWU6ICdGaXJzdE5hbWUnLFxyXG4gICAgICBwcm9wZXJ0eTogJ0ZpcnN0TmFtZScsXHJcbiAgICAgIGxhYmVsOiB0aGlzLmZpcnN0TmFtZVRleHQsXHJcbiAgICAgIHR5cGU6ICd0ZXh0JyxcclxuICAgICAgbWF4VGV4dExlbmd0aDogMzIsXHJcbiAgICAgIHZhbGlkYXRvcjogdmFsaWRhdG9yLmV4Y2VlZHNNYXhUZXh0TGVuZ3RoLFxyXG4gICAgfSwge1xyXG4gICAgICBuYW1lOiAnTWlkZGxlTmFtZScsXHJcbiAgICAgIHByb3BlcnR5OiAnTWlkZGxlTmFtZScsXHJcbiAgICAgIGxhYmVsOiB0aGlzLm1pZGRsZU5hbWVUZXh0LFxyXG4gICAgICB0eXBlOiAndGV4dCcsXHJcbiAgICAgIG1heFRleHRMZW5ndGg6IDMyLFxyXG4gICAgICB2YWxpZGF0b3I6IHZhbGlkYXRvci5leGNlZWRzTWF4VGV4dExlbmd0aCxcclxuICAgIH0sIHtcclxuICAgICAgbmFtZTogJ0xhc3ROYW1lJyxcclxuICAgICAgcHJvcGVydHk6ICdMYXN0TmFtZScsXHJcbiAgICAgIGxhYmVsOiB0aGlzLmxhc3ROYW1lVGV4dCxcclxuICAgICAgdHlwZTogJ3RleHQnLFxyXG4gICAgICBtYXhUZXh0TGVuZ3RoOiAzMixcclxuICAgICAgdmFsaWRhdG9yOiB2YWxpZGF0b3IuZXhjZWVkc01heFRleHRMZW5ndGgsXHJcbiAgICB9LCB7XHJcbiAgICAgIGVtcHR5VGV4dDogJycsXHJcbiAgICAgIGxhYmVsOiB0aGlzLnN1ZmZpeFRleHQsXHJcbiAgICAgIG5hbWU6ICdTdWZmaXgnLFxyXG4gICAgICBwcm9wZXJ0eTogJ1N1ZmZpeCcsXHJcbiAgICAgIHBpY2tsaXN0OiAnTmFtZSBTdWZmaXgnLFxyXG4gICAgICBwaWNrbGlzdE9wdGlvbnM6IChlbnRyeSkgPT4ge1xyXG4gICAgICAgIC8vIENoZWNrcyBpZiBlbnRyeSBpcyBhIENvbnRhY3RcclxuICAgICAgICBpZiAoZW50cnkuaGFzT3duUHJvcGVydHkoJ05hbWVMRicpKSB7XHJcbiAgICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBmaWx0ZXJCeUxhbmd1YWdlOiB0cnVlLFxyXG4gICAgICAgICAgICBsYW5ndWFnZTogZW50cnkuTG9jYXRpb25Db2RlICYmIGVudHJ5LkxvY2F0aW9uQ29kZS50cmltKCkgfHwgQXBwLmdldEN1cnJlbnRMb2NhbGUoKSxcclxuICAgICAgICAgICAgc3RvcmFnZU1vZGU6ICd0ZXh0JyxcclxuICAgICAgICAgIH07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICBmaWx0ZXJCeUxhbmd1YWdlOiBmYWxzZSxcclxuICAgICAgICAgIGxhbmd1YWdlOiAnICcsXHJcbiAgICAgICAgICBzdG9yYWdlTW9kZTogJ3RleHQnLFxyXG4gICAgICAgIH07XHJcbiAgICAgIH0sXHJcbiAgICAgIGxhbmd1YWdlQ29kZVByb3BlcnR5OiAnTG9jYXRpb25Db2RlJyxcclxuICAgICAgcmVxdWlyZVNlbGVjdGlvbjogdHJ1ZSxcclxuICAgICAgc3RvcmFnZU1vZGU6ICd0ZXh0JyxcclxuICAgICAgdGl0bGU6IHRoaXMuc3VmZml4VGl0bGVUZXh0LFxyXG4gICAgICB0eXBlOiAncGlja2xpc3QnLFxyXG4gICAgfV0pO1xyXG4gIH0sXHJcbn0pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgX19jbGFzcztcclxuIl19
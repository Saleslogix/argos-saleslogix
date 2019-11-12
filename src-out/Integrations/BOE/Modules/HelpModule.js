define('crm/Integrations/BOE/Modules/HelpModule', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', './_Module', 'argos/I18n'], function (module, exports, _declare, _lang, _Module2, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _lang2 = _interopRequireDefault(_lang);

  var _Module3 = _interopRequireDefault(_Module2);

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

  var resource = (0, _I18n2.default)('helpModule');

  var __class = (0, _declare2.default)('crm.Integrations.BOE.Modules.HelpModule', [_Module3.default], {
    sectionTitleText: resource.sectionTitleText,
    init: function init() {},
    loadViews: function loadViews() {},
    loadCustomizations: function loadCustomizations() {
      var am = this.applicationModule;
      var onHelpRowCreated = crm.Views.Help.prototype.onHelpRowCreated;
      am.registerCustomization('detail', 'help', {
        at: function at(row) {
          return row.name === 'HelpSection';
        },
        type: 'insert',
        where: 'after',
        value: {
          title: this.sectionTitleText,
          name: 'BOEHelpSection',
          children: [{
            name: 'BOEHelp',
            devRoot: 'argos-icboe',
            baseUrl: 'help/locales/icboe',
            fileName: 'help.html',
            defaultUrl: 'help/locales/icboe/en/help.html',
            onCreate: onHelpRowCreated
          }]
        }
      });
    },
    loadToolbars: function loadToolbars() {}
  });

  _lang2.default.setObject('icboe.Modules.HelpModule', __class);
  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQk9FL01vZHVsZXMvSGVscE1vZHVsZS5qcyJdLCJuYW1lcyI6WyJyZXNvdXJjZSIsIl9fY2xhc3MiLCJzZWN0aW9uVGl0bGVUZXh0IiwiaW5pdCIsImxvYWRWaWV3cyIsImxvYWRDdXN0b21pemF0aW9ucyIsImFtIiwiYXBwbGljYXRpb25Nb2R1bGUiLCJvbkhlbHBSb3dDcmVhdGVkIiwiY3JtIiwiVmlld3MiLCJIZWxwIiwicHJvdG90eXBlIiwicmVnaXN0ZXJDdXN0b21pemF0aW9uIiwiYXQiLCJyb3ciLCJuYW1lIiwidHlwZSIsIndoZXJlIiwidmFsdWUiLCJ0aXRsZSIsImNoaWxkcmVuIiwiZGV2Um9vdCIsImJhc2VVcmwiLCJmaWxlTmFtZSIsImRlZmF1bHRVcmwiLCJvbkNyZWF0ZSIsImxvYWRUb29sYmFycyIsInNldE9iamVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7QUFvQkEsTUFBTUEsV0FBVyxvQkFBWSxZQUFaLENBQWpCOztBQUVBLE1BQU1DLFVBQVUsdUJBQVEseUNBQVIsRUFBbUQsa0JBQW5ELEVBQThEO0FBQzVFQyxzQkFBa0JGLFNBQVNFLGdCQURpRDtBQUU1RUMsVUFBTSxTQUFTQSxJQUFULEdBQWdCLENBQ3JCLENBSDJFO0FBSTVFQyxlQUFXLFNBQVNBLFNBQVQsR0FBcUIsQ0FDL0IsQ0FMMkU7QUFNNUVDLHdCQUFvQixTQUFTQSxrQkFBVCxHQUE4QjtBQUNoRCxVQUFNQyxLQUFLLEtBQUtDLGlCQUFoQjtBQUNBLFVBQU1DLG1CQUFtQkMsSUFBSUMsS0FBSixDQUFVQyxJQUFWLENBQWVDLFNBQWYsQ0FBeUJKLGdCQUFsRDtBQUNBRixTQUFHTyxxQkFBSCxDQUF5QixRQUF6QixFQUFtQyxNQUFuQyxFQUEyQztBQUN6Q0MsWUFBSSxZQUFDQyxHQUFELEVBQVM7QUFDWCxpQkFBT0EsSUFBSUMsSUFBSixLQUFhLGFBQXBCO0FBQ0QsU0FId0M7QUFJekNDLGNBQU0sUUFKbUM7QUFLekNDLGVBQU8sT0FMa0M7QUFNekNDLGVBQU87QUFDTEMsaUJBQU8sS0FBS2xCLGdCQURQO0FBRUxjLGdCQUFNLGdCQUZEO0FBR0xLLG9CQUFVLENBQUM7QUFDVEwsa0JBQU0sU0FERztBQUVUTSxxQkFBUyxhQUZBO0FBR1RDLHFCQUFTLG9CQUhBO0FBSVRDLHNCQUFVLFdBSkQ7QUFLVEMsd0JBQVksaUNBTEg7QUFNVEMsc0JBQVVsQjtBQU5ELFdBQUQ7QUFITDtBQU5rQyxPQUEzQztBQW1CRCxLQTVCMkU7QUE2QjVFbUIsa0JBQWMsU0FBU0EsWUFBVCxHQUF3QixDQUNyQztBQTlCMkUsR0FBOUQsQ0FBaEI7O0FBaUNBLGlCQUFLQyxTQUFMLENBQWUsMEJBQWYsRUFBMkMzQixPQUEzQztvQkFDZUEsTyIsImZpbGUiOiJIZWxwTW9kdWxlLmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAyMDE3IEluZm9yXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuaW1wb3J0IGRlY2xhcmUgZnJvbSAnZG9qby9fYmFzZS9kZWNsYXJlJztcclxuaW1wb3J0IGxhbmcgZnJvbSAnZG9qby9fYmFzZS9sYW5nJztcclxuaW1wb3J0IF9Nb2R1bGUgZnJvbSAnLi9fTW9kdWxlJztcclxuaW1wb3J0IGdldFJlc291cmNlIGZyb20gJ2FyZ29zL0kxOG4nO1xyXG5cclxuY29uc3QgcmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgnaGVscE1vZHVsZScpO1xyXG5cclxuY29uc3QgX19jbGFzcyA9IGRlY2xhcmUoJ2NybS5JbnRlZ3JhdGlvbnMuQk9FLk1vZHVsZXMuSGVscE1vZHVsZScsIFtfTW9kdWxlXSwge1xyXG4gIHNlY3Rpb25UaXRsZVRleHQ6IHJlc291cmNlLnNlY3Rpb25UaXRsZVRleHQsXHJcbiAgaW5pdDogZnVuY3Rpb24gaW5pdCgpIHtcclxuICB9LFxyXG4gIGxvYWRWaWV3czogZnVuY3Rpb24gbG9hZFZpZXdzKCkge1xyXG4gIH0sXHJcbiAgbG9hZEN1c3RvbWl6YXRpb25zOiBmdW5jdGlvbiBsb2FkQ3VzdG9taXphdGlvbnMoKSB7XHJcbiAgICBjb25zdCBhbSA9IHRoaXMuYXBwbGljYXRpb25Nb2R1bGU7XHJcbiAgICBjb25zdCBvbkhlbHBSb3dDcmVhdGVkID0gY3JtLlZpZXdzLkhlbHAucHJvdG90eXBlLm9uSGVscFJvd0NyZWF0ZWQ7XHJcbiAgICBhbS5yZWdpc3RlckN1c3RvbWl6YXRpb24oJ2RldGFpbCcsICdoZWxwJywge1xyXG4gICAgICBhdDogKHJvdykgPT4ge1xyXG4gICAgICAgIHJldHVybiByb3cubmFtZSA9PT0gJ0hlbHBTZWN0aW9uJztcclxuICAgICAgfSxcclxuICAgICAgdHlwZTogJ2luc2VydCcsXHJcbiAgICAgIHdoZXJlOiAnYWZ0ZXInLFxyXG4gICAgICB2YWx1ZToge1xyXG4gICAgICAgIHRpdGxlOiB0aGlzLnNlY3Rpb25UaXRsZVRleHQsXHJcbiAgICAgICAgbmFtZTogJ0JPRUhlbHBTZWN0aW9uJyxcclxuICAgICAgICBjaGlsZHJlbjogW3tcclxuICAgICAgICAgIG5hbWU6ICdCT0VIZWxwJyxcclxuICAgICAgICAgIGRldlJvb3Q6ICdhcmdvcy1pY2JvZScsXHJcbiAgICAgICAgICBiYXNlVXJsOiAnaGVscC9sb2NhbGVzL2ljYm9lJyxcclxuICAgICAgICAgIGZpbGVOYW1lOiAnaGVscC5odG1sJyxcclxuICAgICAgICAgIGRlZmF1bHRVcmw6ICdoZWxwL2xvY2FsZXMvaWNib2UvZW4vaGVscC5odG1sJyxcclxuICAgICAgICAgIG9uQ3JlYXRlOiBvbkhlbHBSb3dDcmVhdGVkLFxyXG4gICAgICAgIH1dLFxyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcbiAgfSxcclxuICBsb2FkVG9vbGJhcnM6IGZ1bmN0aW9uIGxvYWRUb29sYmFycygpIHtcclxuICB9LFxyXG59KTtcclxuXHJcbmxhbmcuc2V0T2JqZWN0KCdpY2JvZS5Nb2R1bGVzLkhlbHBNb2R1bGUnLCBfX2NsYXNzKTtcclxuZXhwb3J0IGRlZmF1bHQgX19jbGFzcztcclxuIl19
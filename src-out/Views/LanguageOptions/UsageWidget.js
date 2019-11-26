define('crm/Views/LanguageOptions/UsageWidget', ['module', 'exports', 'dojo/_base/declare', 'dojo/aspect', 'dojo/string', 'argos/RelatedViewManager', 'argos/_RelatedViewWidgetBase', 'argos/Dropdown', 'argos/I18n', 'argos/LanguageService'], function (module, exports, _declare, _aspect, _string, _RelatedViewManager, _RelatedViewWidgetBase2, _Dropdown, _I18n, _LanguageService) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _aspect2 = _interopRequireDefault(_aspect);

  var _string2 = _interopRequireDefault(_string);

  var _RelatedViewManager2 = _interopRequireDefault(_RelatedViewManager);

  var _RelatedViewWidgetBase3 = _interopRequireDefault(_RelatedViewWidgetBase2);

  var _Dropdown2 = _interopRequireDefault(_Dropdown);

  var _I18n2 = _interopRequireDefault(_I18n);

  var _LanguageService2 = _interopRequireDefault(_LanguageService);

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

  var resource = (0, _I18n2.default)('languageUsageWidget');

  var __class = (0, _declare2.default)('crm.Views.LanguageOptions.UsageWidget', [_RelatedViewWidgetBase3.default], {
    // Localization
    regionText: resource.regionText,
    languageText: resource.languageText,
    toastTitle: resource.toastTitle,
    toastMessage: resource.toastMessage,
    invalidLanguageError: resource.invalidLanguageError,
    invalidRegionError: resource.invalidRegionError,
    languageService: null,
    cls: 'related-language-usage-widget',
    relatedContentTemplate: new Simplate(['<div class="language-usage">', '<span data-dojo-attach-point="_languageNode" ></span>', '<span data-dojo-attach-point="_regionThanNode" ></span>', '</div>']),
    onInit: function onInit() {
      var _this = this;

      this.languageService = new _LanguageService2.default();
      this.onLoad();
      if (this.owner) {
        _aspect2.default.after(this.owner, 'show', function () {
          _this.onRefreshView();
        });

        _aspect2.default.after(this.owner, 'save', function () {
          _this.onSave();
        });
      }
    },
    onLoad: function onLoad() {
      var language = this.languageService.getLanguage('language');
      var region = this.languageService.getRegion('region');
      this.initUI(language || 'en', region || 'en');
    },
    initUI: function initUI(lang, region) {
      var locales = [];
      for (var key in window.languages) {
        if (window.languages.hasOwnProperty(key)) {
          locales.push({ value: key, text: window.languages[key], key: key });
        }
      }
      if (!this._languageDropdown) {
        this._languageDropdown = new _Dropdown2.default({
          id: 'language-dropdown',
          onSelectScope: this,
          label: this.languageText
        });
        this._languageDropdown.createList({
          items: locales
        });
        $(this._languageNode).append(this._languageDropdown.domNode);
        this._languageDropdown.setValue(lang);
        try {
          this._languageDropdown.getValue();
        } catch (e) {
          console.error(_string2.default.substitute(this.invalidLanguageError, [lang])); // eslint-disable-line
          this._languageDropdown.setValue('en');
          this.languageService.setLanguage('en');
        }
      }

      if (!this._regionDropdown) {
        this._regionDropdown = new _Dropdown2.default({
          id: 'region-dropdown',
          onSelectScope: this,
          label: this.regionText
        });
        this._regionDropdown.createList({
          items: locales
        });
        $(this._regionThanNode).append(this._regionDropdown.domNode);
        this._regionDropdown.setValue(region);
        try {
          this._regionDropdown.getValue();
        } catch (e) {
          console.error(_string2.default.substitute(this.invalidRegionError, [region])); // eslint-disable-line
          this._regionDropdown.setValue('en');
          this.languageService.setRegion('en');
        }
      }
    },
    onRefreshView: function onRefreshView() {
      this.onLoad();
    },
    destroy: function destroy() {
      if (this._regionDropdown) {
        this._regionDropdown.destroy();
      }
      if (this._languageDropdown) {
        this._languageDropdown.destroy();
      }
      this.inherited(destroy, arguments);
    },
    onSave: function onSave() {
      var language = this._languageDropdown.getValue();
      var region = this._regionDropdown.getValue();

      try {
        this.languageService.setLanguage(language);
        this.languageService.setRegion(region);
        App.clearMetricPreferences();
        App.clearQuickActionPreferences();
        App.toast.add({
          message: this.toastMessage,
          title: this.toastTitle,
          toastTime: 3000
        });
      } catch (e) {
        console.error(e); // eslint-disable-line
      }
    }
  });
  var rvm = new _RelatedViewManager2.default();
  rvm.registerType('languageUsageWidget', __class);
  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9WaWV3cy9MYW5ndWFnZU9wdGlvbnMvVXNhZ2VXaWRnZXQuanMiXSwibmFtZXMiOlsicmVzb3VyY2UiLCJfX2NsYXNzIiwicmVnaW9uVGV4dCIsImxhbmd1YWdlVGV4dCIsInRvYXN0VGl0bGUiLCJ0b2FzdE1lc3NhZ2UiLCJpbnZhbGlkTGFuZ3VhZ2VFcnJvciIsImludmFsaWRSZWdpb25FcnJvciIsImxhbmd1YWdlU2VydmljZSIsImNscyIsInJlbGF0ZWRDb250ZW50VGVtcGxhdGUiLCJTaW1wbGF0ZSIsIm9uSW5pdCIsIm9uTG9hZCIsIm93bmVyIiwiYWZ0ZXIiLCJvblJlZnJlc2hWaWV3Iiwib25TYXZlIiwibGFuZ3VhZ2UiLCJnZXRMYW5ndWFnZSIsInJlZ2lvbiIsImdldFJlZ2lvbiIsImluaXRVSSIsImxhbmciLCJsb2NhbGVzIiwia2V5Iiwid2luZG93IiwibGFuZ3VhZ2VzIiwiaGFzT3duUHJvcGVydHkiLCJwdXNoIiwidmFsdWUiLCJ0ZXh0IiwiX2xhbmd1YWdlRHJvcGRvd24iLCJpZCIsIm9uU2VsZWN0U2NvcGUiLCJsYWJlbCIsImNyZWF0ZUxpc3QiLCJpdGVtcyIsIiQiLCJfbGFuZ3VhZ2VOb2RlIiwiYXBwZW5kIiwiZG9tTm9kZSIsInNldFZhbHVlIiwiZ2V0VmFsdWUiLCJlIiwiY29uc29sZSIsImVycm9yIiwic3Vic3RpdHV0ZSIsInNldExhbmd1YWdlIiwiX3JlZ2lvbkRyb3Bkb3duIiwiX3JlZ2lvblRoYW5Ob2RlIiwic2V0UmVnaW9uIiwiZGVzdHJveSIsImluaGVyaXRlZCIsImFyZ3VtZW50cyIsIkFwcCIsImNsZWFyTWV0cmljUHJlZmVyZW5jZXMiLCJjbGVhclF1aWNrQWN0aW9uUHJlZmVyZW5jZXMiLCJ0b2FzdCIsImFkZCIsIm1lc3NhZ2UiLCJ0aXRsZSIsInRvYXN0VGltZSIsInJ2bSIsInJlZ2lzdGVyVHlwZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7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Q0EsVUFBTXZCLFNBQVMsS0FBSzZCLGVBQUwsQ0FBcUJOLFFBQXJCLEVBQWY7O0FBRUEsVUFBSTtBQUNGLGFBQUtuQyxlQUFMLENBQXFCd0MsV0FBckIsQ0FBaUM5QixRQUFqQztBQUNBLGFBQUtWLGVBQUwsQ0FBcUIyQyxTQUFyQixDQUErQi9CLE1BQS9CO0FBQ0FtQyxZQUFJQyxzQkFBSjtBQUNBRCxZQUFJRSwyQkFBSjtBQUNBRixZQUFJRyxLQUFKLENBQVVDLEdBQVYsQ0FBYztBQUNaQyxtQkFBUyxLQUFLdkQsWUFERjtBQUVad0QsaUJBQU8sS0FBS3pELFVBRkE7QUFHWjBELHFCQUFXO0FBSEMsU0FBZDtBQUtELE9BVkQsQ0FVRSxPQUFPbEIsQ0FBUCxFQUFVO0FBQ1ZDLGdCQUFRQyxLQUFSLENBQWNGLENBQWQsRUFEVSxDQUNRO0FBQ25CO0FBQ0Y7QUE5R3dGLEdBQTNFLENBQWhCO0FBZ0hBLE1BQU1tQixNQUFNLGtDQUFaO0FBQ0FBLE1BQUlDLFlBQUosQ0FBaUIscUJBQWpCLEVBQXdDL0QsT0FBeEM7b0JBQ2VBLE8iLCJmaWxlIjoiVXNhZ2VXaWRnZXQuanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IDIwMTcgSW5mb3JcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG5pbXBvcnQgZGVjbGFyZSBmcm9tICdkb2pvL19iYXNlL2RlY2xhcmUnO1xyXG5pbXBvcnQgYXNwZWN0IGZyb20gJ2Rvam8vYXNwZWN0JztcclxuaW1wb3J0IHN0cmluZyBmcm9tICdkb2pvL3N0cmluZyc7XHJcbmltcG9ydCBSZWxhdGVkVmlld01hbmFnZXIgZnJvbSAnYXJnb3MvUmVsYXRlZFZpZXdNYW5hZ2VyJztcclxuaW1wb3J0IF9SZWxhdGVkVmlld1dpZGdldEJhc2UgZnJvbSAnYXJnb3MvX1JlbGF0ZWRWaWV3V2lkZ2V0QmFzZSc7XHJcbmltcG9ydCBEcm9wZG93biBmcm9tICdhcmdvcy9Ecm9wZG93bic7XHJcbmltcG9ydCBnZXRSZXNvdXJjZSBmcm9tICdhcmdvcy9JMThuJztcclxuaW1wb3J0IExhbmd1YWdlU2VydmljZSBmcm9tICdhcmdvcy9MYW5ndWFnZVNlcnZpY2UnO1xyXG5cclxuY29uc3QgcmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgnbGFuZ3VhZ2VVc2FnZVdpZGdldCcpO1xyXG5cclxuY29uc3QgX19jbGFzcyA9IGRlY2xhcmUoJ2NybS5WaWV3cy5MYW5ndWFnZU9wdGlvbnMuVXNhZ2VXaWRnZXQnLCBbX1JlbGF0ZWRWaWV3V2lkZ2V0QmFzZV0sIHtcclxuICAvLyBMb2NhbGl6YXRpb25cclxuICByZWdpb25UZXh0OiByZXNvdXJjZS5yZWdpb25UZXh0LFxyXG4gIGxhbmd1YWdlVGV4dDogcmVzb3VyY2UubGFuZ3VhZ2VUZXh0LFxyXG4gIHRvYXN0VGl0bGU6IHJlc291cmNlLnRvYXN0VGl0bGUsXHJcbiAgdG9hc3RNZXNzYWdlOiByZXNvdXJjZS50b2FzdE1lc3NhZ2UsXHJcbiAgaW52YWxpZExhbmd1YWdlRXJyb3I6IHJlc291cmNlLmludmFsaWRMYW5ndWFnZUVycm9yLFxyXG4gIGludmFsaWRSZWdpb25FcnJvcjogcmVzb3VyY2UuaW52YWxpZFJlZ2lvbkVycm9yLFxyXG4gIGxhbmd1YWdlU2VydmljZTogbnVsbCxcclxuICBjbHM6ICdyZWxhdGVkLWxhbmd1YWdlLXVzYWdlLXdpZGdldCcsXHJcbiAgcmVsYXRlZENvbnRlbnRUZW1wbGF0ZTogbmV3IFNpbXBsYXRlKFtcclxuICAgICc8ZGl2IGNsYXNzPVwibGFuZ3VhZ2UtdXNhZ2VcIj4nLFxyXG4gICAgJzxzcGFuIGRhdGEtZG9qby1hdHRhY2gtcG9pbnQ9XCJfbGFuZ3VhZ2VOb2RlXCIgPjwvc3Bhbj4nLFxyXG4gICAgJzxzcGFuIGRhdGEtZG9qby1hdHRhY2gtcG9pbnQ9XCJfcmVnaW9uVGhhbk5vZGVcIiA+PC9zcGFuPicsXHJcbiAgICAnPC9kaXY+JyxcclxuICBdKSxcclxuICBvbkluaXQ6IGZ1bmN0aW9uIG9uSW5pdCgpIHtcclxuICAgIHRoaXMubGFuZ3VhZ2VTZXJ2aWNlID0gbmV3IExhbmd1YWdlU2VydmljZSgpO1xyXG4gICAgdGhpcy5vbkxvYWQoKTtcclxuICAgIGlmICh0aGlzLm93bmVyKSB7XHJcbiAgICAgIGFzcGVjdC5hZnRlcih0aGlzLm93bmVyLCAnc2hvdycsICgpID0+IHtcclxuICAgICAgICB0aGlzLm9uUmVmcmVzaFZpZXcoKTtcclxuICAgICAgfSk7XHJcblxyXG4gICAgICBhc3BlY3QuYWZ0ZXIodGhpcy5vd25lciwgJ3NhdmUnLCAoKSA9PiB7XHJcbiAgICAgICAgdGhpcy5vblNhdmUoKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBvbkxvYWQ6IGZ1bmN0aW9uIG9uTG9hZCgpIHtcclxuICAgIGNvbnN0IGxhbmd1YWdlID0gdGhpcy5sYW5ndWFnZVNlcnZpY2UuZ2V0TGFuZ3VhZ2UoJ2xhbmd1YWdlJyk7XHJcbiAgICBjb25zdCByZWdpb24gPSB0aGlzLmxhbmd1YWdlU2VydmljZS5nZXRSZWdpb24oJ3JlZ2lvbicpO1xyXG4gICAgdGhpcy5pbml0VUkobGFuZ3VhZ2UgfHwgJ2VuJywgcmVnaW9uIHx8ICdlbicpO1xyXG4gIH0sXHJcbiAgaW5pdFVJOiBmdW5jdGlvbiBpbml0VUkobGFuZywgcmVnaW9uKSB7XHJcbiAgICBjb25zdCBsb2NhbGVzID0gW107XHJcbiAgICBmb3IgKGNvbnN0IGtleSBpbiB3aW5kb3cubGFuZ3VhZ2VzKSB7XHJcbiAgICAgIGlmICh3aW5kb3cubGFuZ3VhZ2VzLmhhc093blByb3BlcnR5KGtleSkpIHtcclxuICAgICAgICBsb2NhbGVzLnB1c2goeyB2YWx1ZToga2V5LCB0ZXh0OiB3aW5kb3cubGFuZ3VhZ2VzW2tleV0sIGtleSB9KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYgKCF0aGlzLl9sYW5ndWFnZURyb3Bkb3duKSB7XHJcbiAgICAgIHRoaXMuX2xhbmd1YWdlRHJvcGRvd24gPSBuZXcgRHJvcGRvd24oe1xyXG4gICAgICAgIGlkOiAnbGFuZ3VhZ2UtZHJvcGRvd24nLFxyXG4gICAgICAgIG9uU2VsZWN0U2NvcGU6IHRoaXMsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMubGFuZ3VhZ2VUZXh0LFxyXG4gICAgICB9KTtcclxuICAgICAgdGhpcy5fbGFuZ3VhZ2VEcm9wZG93bi5jcmVhdGVMaXN0KHtcclxuICAgICAgICBpdGVtczogbG9jYWxlcyxcclxuICAgICAgfSk7XHJcbiAgICAgICQodGhpcy5fbGFuZ3VhZ2VOb2RlKS5hcHBlbmQodGhpcy5fbGFuZ3VhZ2VEcm9wZG93bi5kb21Ob2RlKTtcclxuICAgICAgdGhpcy5fbGFuZ3VhZ2VEcm9wZG93bi5zZXRWYWx1ZShsYW5nKTtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICB0aGlzLl9sYW5ndWFnZURyb3Bkb3duLmdldFZhbHVlKCk7XHJcbiAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKHN0cmluZy5zdWJzdGl0dXRlKHRoaXMuaW52YWxpZExhbmd1YWdlRXJyb3IsIFtsYW5nXSkpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXHJcbiAgICAgICAgdGhpcy5fbGFuZ3VhZ2VEcm9wZG93bi5zZXRWYWx1ZSgnZW4nKTtcclxuICAgICAgICB0aGlzLmxhbmd1YWdlU2VydmljZS5zZXRMYW5ndWFnZSgnZW4nKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmICghdGhpcy5fcmVnaW9uRHJvcGRvd24pIHtcclxuICAgICAgdGhpcy5fcmVnaW9uRHJvcGRvd24gPSBuZXcgRHJvcGRvd24oe1xyXG4gICAgICAgIGlkOiAncmVnaW9uLWRyb3Bkb3duJyxcclxuICAgICAgICBvblNlbGVjdFNjb3BlOiB0aGlzLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLnJlZ2lvblRleHQsXHJcbiAgICAgIH0pO1xyXG4gICAgICB0aGlzLl9yZWdpb25Ecm9wZG93bi5jcmVhdGVMaXN0KHtcclxuICAgICAgICBpdGVtczogbG9jYWxlcyxcclxuICAgICAgfSk7XHJcbiAgICAgICQodGhpcy5fcmVnaW9uVGhhbk5vZGUpLmFwcGVuZCh0aGlzLl9yZWdpb25Ecm9wZG93bi5kb21Ob2RlKTtcclxuICAgICAgdGhpcy5fcmVnaW9uRHJvcGRvd24uc2V0VmFsdWUocmVnaW9uKTtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICB0aGlzLl9yZWdpb25Ecm9wZG93bi5nZXRWYWx1ZSgpO1xyXG4gICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgY29uc29sZS5lcnJvcihzdHJpbmcuc3Vic3RpdHV0ZSh0aGlzLmludmFsaWRSZWdpb25FcnJvciwgW3JlZ2lvbl0pKTsgIC8vIGVzbGludC1kaXNhYmxlLWxpbmVcclxuICAgICAgICB0aGlzLl9yZWdpb25Ecm9wZG93bi5zZXRWYWx1ZSgnZW4nKTtcclxuICAgICAgICB0aGlzLmxhbmd1YWdlU2VydmljZS5zZXRSZWdpb24oJ2VuJyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIG9uUmVmcmVzaFZpZXc6IGZ1bmN0aW9uIG9uUmVmcmVzaFZpZXcoKSB7XHJcbiAgICB0aGlzLm9uTG9hZCgpO1xyXG4gIH0sXHJcbiAgZGVzdHJveTogZnVuY3Rpb24gZGVzdHJveSgpIHtcclxuICAgIGlmICh0aGlzLl9yZWdpb25Ecm9wZG93bikge1xyXG4gICAgICB0aGlzLl9yZWdpb25Ecm9wZG93bi5kZXN0cm95KCk7XHJcbiAgICB9XHJcbiAgICBpZiAodGhpcy5fbGFuZ3VhZ2VEcm9wZG93bikge1xyXG4gICAgICB0aGlzLl9sYW5ndWFnZURyb3Bkb3duLmRlc3Ryb3koKTtcclxuICAgIH1cclxuICAgIHRoaXMuaW5oZXJpdGVkKGRlc3Ryb3ksIGFyZ3VtZW50cyk7XHJcbiAgfSxcclxuICBvblNhdmU6IGZ1bmN0aW9uIG9uU2F2ZSgpIHtcclxuICAgIGNvbnN0IGxhbmd1YWdlID0gdGhpcy5fbGFuZ3VhZ2VEcm9wZG93bi5nZXRWYWx1ZSgpO1xyXG4gICAgY29uc3QgcmVnaW9uID0gdGhpcy5fcmVnaW9uRHJvcGRvd24uZ2V0VmFsdWUoKTtcclxuXHJcbiAgICB0cnkge1xyXG4gICAgICB0aGlzLmxhbmd1YWdlU2VydmljZS5zZXRMYW5ndWFnZShsYW5ndWFnZSk7XHJcbiAgICAgIHRoaXMubGFuZ3VhZ2VTZXJ2aWNlLnNldFJlZ2lvbihyZWdpb24pO1xyXG4gICAgICBBcHAuY2xlYXJNZXRyaWNQcmVmZXJlbmNlcygpO1xyXG4gICAgICBBcHAuY2xlYXJRdWlja0FjdGlvblByZWZlcmVuY2VzKCk7XHJcbiAgICAgIEFwcC50b2FzdC5hZGQoe1xyXG4gICAgICAgIG1lc3NhZ2U6IHRoaXMudG9hc3RNZXNzYWdlLFxyXG4gICAgICAgIHRpdGxlOiB0aGlzLnRvYXN0VGl0bGUsXHJcbiAgICAgICAgdG9hc3RUaW1lOiAzMDAwLFxyXG4gICAgICB9KTtcclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgY29uc29sZS5lcnJvcihlKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxyXG4gICAgfVxyXG4gIH0sXHJcbn0pO1xyXG5jb25zdCBydm0gPSBuZXcgUmVsYXRlZFZpZXdNYW5hZ2VyKCk7XHJcbnJ2bS5yZWdpc3RlclR5cGUoJ2xhbmd1YWdlVXNhZ2VXaWRnZXQnLCBfX2NsYXNzKTtcclxuZXhwb3J0IGRlZmF1bHQgX19jbGFzcztcclxuIl19
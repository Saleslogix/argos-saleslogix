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
      this.inherited(arguments);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9WaWV3cy9MYW5ndWFnZU9wdGlvbnMvVXNhZ2VXaWRnZXQuanMiXSwibmFtZXMiOlsicmVzb3VyY2UiLCJfX2NsYXNzIiwicmVnaW9uVGV4dCIsImxhbmd1YWdlVGV4dCIsInRvYXN0VGl0bGUiLCJ0b2FzdE1lc3NhZ2UiLCJpbnZhbGlkTGFuZ3VhZ2VFcnJvciIsImludmFsaWRSZWdpb25FcnJvciIsImxhbmd1YWdlU2VydmljZSIsImNscyIsInJlbGF0ZWRDb250ZW50VGVtcGxhdGUiLCJTaW1wbGF0ZSIsIm9uSW5pdCIsIm9uTG9hZCIsIm93bmVyIiwiYWZ0ZXIiLCJvblJlZnJlc2hWaWV3Iiwib25TYXZlIiwibGFuZ3VhZ2UiLCJnZXRMYW5ndWFnZSIsInJlZ2lvbiIsImdldFJlZ2lvbiIsImluaXRVSSIsImxhbmciLCJsb2NhbGVzIiwia2V5Iiwid2luZG93IiwibGFuZ3VhZ2VzIiwiaGFzT3duUHJvcGVydHkiLCJwdXNoIiwidmFsdWUiLCJ0ZXh0IiwiX2xhbmd1YWdlRHJvcGRvd24iLCJpZCIsIm9uU2VsZWN0U2NvcGUiLCJsYWJlbCIsImNyZWF0ZUxpc3QiLCJpdGVtcyIsIiQiLCJfbGFuZ3VhZ2VOb2RlIiwiYXBwZW5kIiwiZG9tTm9kZSIsInNldFZhbHVlIiwiZ2V0VmFsdWUiLCJlIiwiY29uc29sZSIsImVycm9yIiwic3Vic3RpdHV0ZSIsInNldExhbmd1YWdlIiwiX3JlZ2lvbkRyb3Bkb3duIiwiX3JlZ2lvblRoYW5Ob2RlIiwic2V0UmVnaW9uIiwiZGVzdHJveSIsImluaGVyaXRlZCIsImFyZ3VtZW50cyIsIkFwcCIsImNsZWFyTWV0cmljUHJlZmVyZW5jZXMiLCJjbGVhclF1aWNrQWN0aW9uUHJlZmVyZW5jZXMiLCJ0b2FzdCIsImFkZCIsIm1lc3NhZ2UiLCJ0aXRsZSIsInRvYXN0VGltZSIsInJ2bSIsInJlZ2lzdGVyVHlwZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7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UyxLQUFLNkIsZUFBTCxDQUFxQk4sUUFBckIsRUFBZjs7QUFFQSxVQUFJO0FBQ0YsYUFBS25DLGVBQUwsQ0FBcUJ3QyxXQUFyQixDQUFpQzlCLFFBQWpDO0FBQ0EsYUFBS1YsZUFBTCxDQUFxQjJDLFNBQXJCLENBQStCL0IsTUFBL0I7QUFDQW1DLFlBQUlDLHNCQUFKO0FBQ0FELFlBQUlFLDJCQUFKO0FBQ0FGLFlBQUlHLEtBQUosQ0FBVUMsR0FBVixDQUFjO0FBQ1pDLG1CQUFTLEtBQUt2RCxZQURGO0FBRVp3RCxpQkFBTyxLQUFLekQsVUFGQTtBQUdaMEQscUJBQVc7QUFIQyxTQUFkO0FBS0QsT0FWRCxDQVVFLE9BQU9sQixDQUFQLEVBQVU7QUFDVkMsZ0JBQVFDLEtBQVIsQ0FBY0YsQ0FBZCxFQURVLENBQ1E7QUFDbkI7QUFDRjtBQTlHd0YsR0FBM0UsQ0FBaEI7QUFnSEEsTUFBTW1CLE1BQU0sa0NBQVo7QUFDQUEsTUFBSUMsWUFBSixDQUFpQixxQkFBakIsRUFBd0MvRCxPQUF4QztvQkFDZUEsTyIsImZpbGUiOiJVc2FnZVdpZGdldC5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBDb3B5cmlnaHQgMjAxNyBJbmZvclxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBkZWNsYXJlIGZyb20gJ2Rvam8vX2Jhc2UvZGVjbGFyZSc7XHJcbmltcG9ydCBhc3BlY3QgZnJvbSAnZG9qby9hc3BlY3QnO1xyXG5pbXBvcnQgc3RyaW5nIGZyb20gJ2Rvam8vc3RyaW5nJztcclxuaW1wb3J0IFJlbGF0ZWRWaWV3TWFuYWdlciBmcm9tICdhcmdvcy9SZWxhdGVkVmlld01hbmFnZXInO1xyXG5pbXBvcnQgX1JlbGF0ZWRWaWV3V2lkZ2V0QmFzZSBmcm9tICdhcmdvcy9fUmVsYXRlZFZpZXdXaWRnZXRCYXNlJztcclxuaW1wb3J0IERyb3Bkb3duIGZyb20gJ2FyZ29zL0Ryb3Bkb3duJztcclxuaW1wb3J0IGdldFJlc291cmNlIGZyb20gJ2FyZ29zL0kxOG4nO1xyXG5pbXBvcnQgTGFuZ3VhZ2VTZXJ2aWNlIGZyb20gJ2FyZ29zL0xhbmd1YWdlU2VydmljZSc7XHJcblxyXG5jb25zdCByZXNvdXJjZSA9IGdldFJlc291cmNlKCdsYW5ndWFnZVVzYWdlV2lkZ2V0Jyk7XHJcblxyXG5jb25zdCBfX2NsYXNzID0gZGVjbGFyZSgnY3JtLlZpZXdzLkxhbmd1YWdlT3B0aW9ucy5Vc2FnZVdpZGdldCcsIFtfUmVsYXRlZFZpZXdXaWRnZXRCYXNlXSwge1xyXG4gIC8vIExvY2FsaXphdGlvblxyXG4gIHJlZ2lvblRleHQ6IHJlc291cmNlLnJlZ2lvblRleHQsXHJcbiAgbGFuZ3VhZ2VUZXh0OiByZXNvdXJjZS5sYW5ndWFnZVRleHQsXHJcbiAgdG9hc3RUaXRsZTogcmVzb3VyY2UudG9hc3RUaXRsZSxcclxuICB0b2FzdE1lc3NhZ2U6IHJlc291cmNlLnRvYXN0TWVzc2FnZSxcclxuICBpbnZhbGlkTGFuZ3VhZ2VFcnJvcjogcmVzb3VyY2UuaW52YWxpZExhbmd1YWdlRXJyb3IsXHJcbiAgaW52YWxpZFJlZ2lvbkVycm9yOiByZXNvdXJjZS5pbnZhbGlkUmVnaW9uRXJyb3IsXHJcbiAgbGFuZ3VhZ2VTZXJ2aWNlOiBudWxsLFxyXG4gIGNsczogJ3JlbGF0ZWQtbGFuZ3VhZ2UtdXNhZ2Utd2lkZ2V0JyxcclxuICByZWxhdGVkQ29udGVudFRlbXBsYXRlOiBuZXcgU2ltcGxhdGUoW1xyXG4gICAgJzxkaXYgY2xhc3M9XCJsYW5ndWFnZS11c2FnZVwiPicsXHJcbiAgICAnPHNwYW4gZGF0YS1kb2pvLWF0dGFjaC1wb2ludD1cIl9sYW5ndWFnZU5vZGVcIiA+PC9zcGFuPicsXHJcbiAgICAnPHNwYW4gZGF0YS1kb2pvLWF0dGFjaC1wb2ludD1cIl9yZWdpb25UaGFuTm9kZVwiID48L3NwYW4+JyxcclxuICAgICc8L2Rpdj4nLFxyXG4gIF0pLFxyXG4gIG9uSW5pdDogZnVuY3Rpb24gb25Jbml0KCkge1xyXG4gICAgdGhpcy5sYW5ndWFnZVNlcnZpY2UgPSBuZXcgTGFuZ3VhZ2VTZXJ2aWNlKCk7XHJcbiAgICB0aGlzLm9uTG9hZCgpO1xyXG4gICAgaWYgKHRoaXMub3duZXIpIHtcclxuICAgICAgYXNwZWN0LmFmdGVyKHRoaXMub3duZXIsICdzaG93JywgKCkgPT4ge1xyXG4gICAgICAgIHRoaXMub25SZWZyZXNoVmlldygpO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGFzcGVjdC5hZnRlcih0aGlzLm93bmVyLCAnc2F2ZScsICgpID0+IHtcclxuICAgICAgICB0aGlzLm9uU2F2ZSgpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9LFxyXG4gIG9uTG9hZDogZnVuY3Rpb24gb25Mb2FkKCkge1xyXG4gICAgY29uc3QgbGFuZ3VhZ2UgPSB0aGlzLmxhbmd1YWdlU2VydmljZS5nZXRMYW5ndWFnZSgnbGFuZ3VhZ2UnKTtcclxuICAgIGNvbnN0IHJlZ2lvbiA9IHRoaXMubGFuZ3VhZ2VTZXJ2aWNlLmdldFJlZ2lvbigncmVnaW9uJyk7XHJcbiAgICB0aGlzLmluaXRVSShsYW5ndWFnZSB8fCAnZW4nLCByZWdpb24gfHwgJ2VuJyk7XHJcbiAgfSxcclxuICBpbml0VUk6IGZ1bmN0aW9uIGluaXRVSShsYW5nLCByZWdpb24pIHtcclxuICAgIGNvbnN0IGxvY2FsZXMgPSBbXTtcclxuICAgIGZvciAoY29uc3Qga2V5IGluIHdpbmRvdy5sYW5ndWFnZXMpIHtcclxuICAgICAgaWYgKHdpbmRvdy5sYW5ndWFnZXMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xyXG4gICAgICAgIGxvY2FsZXMucHVzaCh7IHZhbHVlOiBrZXksIHRleHQ6IHdpbmRvdy5sYW5ndWFnZXNba2V5XSwga2V5IH0pO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAoIXRoaXMuX2xhbmd1YWdlRHJvcGRvd24pIHtcclxuICAgICAgdGhpcy5fbGFuZ3VhZ2VEcm9wZG93biA9IG5ldyBEcm9wZG93bih7XHJcbiAgICAgICAgaWQ6ICdsYW5ndWFnZS1kcm9wZG93bicsXHJcbiAgICAgICAgb25TZWxlY3RTY29wZTogdGhpcyxcclxuICAgICAgICBsYWJlbDogdGhpcy5sYW5ndWFnZVRleHQsXHJcbiAgICAgIH0pO1xyXG4gICAgICB0aGlzLl9sYW5ndWFnZURyb3Bkb3duLmNyZWF0ZUxpc3Qoe1xyXG4gICAgICAgIGl0ZW1zOiBsb2NhbGVzLFxyXG4gICAgICB9KTtcclxuICAgICAgJCh0aGlzLl9sYW5ndWFnZU5vZGUpLmFwcGVuZCh0aGlzLl9sYW5ndWFnZURyb3Bkb3duLmRvbU5vZGUpO1xyXG4gICAgICB0aGlzLl9sYW5ndWFnZURyb3Bkb3duLnNldFZhbHVlKGxhbmcpO1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIHRoaXMuX2xhbmd1YWdlRHJvcGRvd24uZ2V0VmFsdWUoKTtcclxuICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3Ioc3RyaW5nLnN1YnN0aXR1dGUodGhpcy5pbnZhbGlkTGFuZ3VhZ2VFcnJvciwgW2xhbmddKSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcclxuICAgICAgICB0aGlzLl9sYW5ndWFnZURyb3Bkb3duLnNldFZhbHVlKCdlbicpO1xyXG4gICAgICAgIHRoaXMubGFuZ3VhZ2VTZXJ2aWNlLnNldExhbmd1YWdlKCdlbicpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCF0aGlzLl9yZWdpb25Ecm9wZG93bikge1xyXG4gICAgICB0aGlzLl9yZWdpb25Ecm9wZG93biA9IG5ldyBEcm9wZG93bih7XHJcbiAgICAgICAgaWQ6ICdyZWdpb24tZHJvcGRvd24nLFxyXG4gICAgICAgIG9uU2VsZWN0U2NvcGU6IHRoaXMsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMucmVnaW9uVGV4dCxcclxuICAgICAgfSk7XHJcbiAgICAgIHRoaXMuX3JlZ2lvbkRyb3Bkb3duLmNyZWF0ZUxpc3Qoe1xyXG4gICAgICAgIGl0ZW1zOiBsb2NhbGVzLFxyXG4gICAgICB9KTtcclxuICAgICAgJCh0aGlzLl9yZWdpb25UaGFuTm9kZSkuYXBwZW5kKHRoaXMuX3JlZ2lvbkRyb3Bkb3duLmRvbU5vZGUpO1xyXG4gICAgICB0aGlzLl9yZWdpb25Ecm9wZG93bi5zZXRWYWx1ZShyZWdpb24pO1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIHRoaXMuX3JlZ2lvbkRyb3Bkb3duLmdldFZhbHVlKCk7XHJcbiAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICBjb25zb2xlLmVycm9yKHN0cmluZy5zdWJzdGl0dXRlKHRoaXMuaW52YWxpZFJlZ2lvbkVycm9yLCBbcmVnaW9uXSkpOyAgLy8gZXNsaW50LWRpc2FibGUtbGluZVxyXG4gICAgICAgIHRoaXMuX3JlZ2lvbkRyb3Bkb3duLnNldFZhbHVlKCdlbicpO1xyXG4gICAgICAgIHRoaXMubGFuZ3VhZ2VTZXJ2aWNlLnNldFJlZ2lvbignZW4nKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgb25SZWZyZXNoVmlldzogZnVuY3Rpb24gb25SZWZyZXNoVmlldygpIHtcclxuICAgIHRoaXMub25Mb2FkKCk7XHJcbiAgfSxcclxuICBkZXN0cm95OiBmdW5jdGlvbiBkZXN0cm95KCkge1xyXG4gICAgaWYgKHRoaXMuX3JlZ2lvbkRyb3Bkb3duKSB7XHJcbiAgICAgIHRoaXMuX3JlZ2lvbkRyb3Bkb3duLmRlc3Ryb3koKTtcclxuICAgIH1cclxuICAgIGlmICh0aGlzLl9sYW5ndWFnZURyb3Bkb3duKSB7XHJcbiAgICAgIHRoaXMuX2xhbmd1YWdlRHJvcGRvd24uZGVzdHJveSgpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5pbmhlcml0ZWQoYXJndW1lbnRzKTtcclxuICB9LFxyXG4gIG9uU2F2ZTogZnVuY3Rpb24gb25TYXZlKCkge1xyXG4gICAgY29uc3QgbGFuZ3VhZ2UgPSB0aGlzLl9sYW5ndWFnZURyb3Bkb3duLmdldFZhbHVlKCk7XHJcbiAgICBjb25zdCByZWdpb24gPSB0aGlzLl9yZWdpb25Ecm9wZG93bi5nZXRWYWx1ZSgpO1xyXG5cclxuICAgIHRyeSB7XHJcbiAgICAgIHRoaXMubGFuZ3VhZ2VTZXJ2aWNlLnNldExhbmd1YWdlKGxhbmd1YWdlKTtcclxuICAgICAgdGhpcy5sYW5ndWFnZVNlcnZpY2Uuc2V0UmVnaW9uKHJlZ2lvbik7XHJcbiAgICAgIEFwcC5jbGVhck1ldHJpY1ByZWZlcmVuY2VzKCk7XHJcbiAgICAgIEFwcC5jbGVhclF1aWNrQWN0aW9uUHJlZmVyZW5jZXMoKTtcclxuICAgICAgQXBwLnRvYXN0LmFkZCh7XHJcbiAgICAgICAgbWVzc2FnZTogdGhpcy50b2FzdE1lc3NhZ2UsXHJcbiAgICAgICAgdGl0bGU6IHRoaXMudG9hc3RUaXRsZSxcclxuICAgICAgICB0b2FzdFRpbWU6IDMwMDAsXHJcbiAgICAgIH0pO1xyXG4gICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICBjb25zb2xlLmVycm9yKGUpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXHJcbiAgICB9XHJcbiAgfSxcclxufSk7XHJcbmNvbnN0IHJ2bSA9IG5ldyBSZWxhdGVkVmlld01hbmFnZXIoKTtcclxucnZtLnJlZ2lzdGVyVHlwZSgnbGFuZ3VhZ2VVc2FnZVdpZGdldCcsIF9fY2xhc3MpO1xyXG5leHBvcnQgZGVmYXVsdCBfX2NsYXNzO1xyXG4iXX0=
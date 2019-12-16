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
define("crm/Views/LanguageOptions/Edit", ["exports", "dojo/_base/declare", "argos/_EditBase", "argos/_RelatedViewWidgetEditMixin", "dojo/Deferred", "argos/I18n"], function (_exports, _declare, _EditBase2, _RelatedViewWidgetEditMixin, _Deferred, _I18n) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports["default"] = void 0;
  _declare = _interopRequireDefault(_declare);
  _EditBase2 = _interopRequireDefault(_EditBase2);
  _RelatedViewWidgetEditMixin = _interopRequireDefault(_RelatedViewWidgetEditMixin);
  _Deferred = _interopRequireDefault(_Deferred);
  _I18n = _interopRequireDefault(_I18n);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
  var resource = (0, _I18n["default"])('languageOptionsEdit');

  var __class = (0, _declare["default"])('crm.Views.LanguageOptions.Edit', [_EditBase2["default"], _RelatedViewWidgetEditMixin["default"]], {
    // Localization
    titleText: resource.titleText,
    // View Properties
    id: 'language_options_edit',
    createLayout: function createLayout() {
      return this.layout || (this.layout = [{
        relatedView: {
          widgetType: 'languageUsageWidget',
          id: 'language_usage_widget'
        }
      }]);
    },
    requestData: function requestData() {
      var _this = this;

      return this.getLanguageOptions().then(function (data) {
        _this._onGetComplete(data);
      }, function (err) {
        _this._onGetError(null, err);
      });
    },
    getLanguageOptions: function getLanguageOptions() {
      var def = new _Deferred["default"]();
      def.resolve({});
      return def.promise;
    },
    onRefreshUpdate: function onRefreshUpdate() {
      this.requestData();
    },
    transitionAway: function transitionAway() {
      // force soho dropdown to close since they dont close on a button click elsewhere on UI
      $(this.relatedViewManagers.language_usage_widget.relatedViews.language_usage_widget_undefined._regionDropdown.dropdownSelect).data('dropdown').close();
      $(this.relatedViewManagers.language_usage_widget.relatedViews.language_usage_widget_undefined._languageDropdown.dropdownSelect).data('dropdown').close();
      this.inherited(transitionAway, arguments);
    }
  });

  var _default = __class;
  _exports["default"] = _default;
});
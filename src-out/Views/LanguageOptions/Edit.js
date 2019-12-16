define('crm/Views/LanguageOptions/Edit', ['module', 'exports', 'dojo/_base/declare', 'argos/_EditBase', 'argos/_RelatedViewWidgetEditMixin', 'dojo/Deferred', 'argos/I18n'], function (module, exports, _declare, _EditBase2, _RelatedViewWidgetEditMixin, _Deferred, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _EditBase3 = _interopRequireDefault(_EditBase2);

  var _RelatedViewWidgetEditMixin2 = _interopRequireDefault(_RelatedViewWidgetEditMixin);

  var _Deferred2 = _interopRequireDefault(_Deferred);

  var _I18n2 = _interopRequireDefault(_I18n);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var resource = (0, _I18n2.default)('languageOptionsEdit');

  /**
   * @class crm.Views.OfflineOptions.Edit
   *
   * @extends argos.Edit
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

  var __class = (0, _declare2.default)('crm.Views.LanguageOptions.Edit', [_EditBase3.default, _RelatedViewWidgetEditMixin2.default], {
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
      var def = new _Deferred2.default();
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

  exports.default = __class;
  module.exports = exports['default'];
});
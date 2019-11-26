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

import declare from 'dojo/_base/declare';
import _EditBase from 'argos/_EditBase';
import _RelatedWidgetEditMixin from 'argos/_RelatedViewWidgetEditMixin';
import Deferred from 'dojo/Deferred';
import getResource from 'argos/I18n';

const resource = getResource('languageOptionsEdit');

/**
 * @class crm.Views.OfflineOptions.Edit
 *
 * @extends argos.Edit
 *
 */
const __class = declare('crm.Views.LanguageOptions.Edit', [_EditBase, _RelatedWidgetEditMixin], {
  // Localization
  titleText: resource.titleText,
  // View Properties
  id: 'language_options_edit',
  createLayout: function createLayout() {
    return this.layout || (this.layout = [{
      relatedView: {
        widgetType: 'languageUsageWidget',
        id: 'language_usage_widget',
      },
    }]);
  },
  requestData: function requestData() {
    return this.getLanguageOptions().then((data) => {
      this._onGetComplete(data);
    }, (err) => {
      this._onGetError(null, err);
    });
  },
  getLanguageOptions: function getLanguageOptions() {
    const def = new Deferred();
    def.resolve({ });
    return def.promise;
  },
  onRefreshUpdate: function onRefreshUpdate() {
    this.requestData();
  },
  transitionAway: function transitionAway() {
    // force soho dropdown to close since they dont close on a button click elsewhere on UI
    $(this.relatedViewManagers
      .language_usage_widget
      .relatedViews
      .language_usage_widget_undefined
      ._regionDropdown
      .dropdownSelect).data('dropdown').close();
    $(this.relatedViewManagers
      .language_usage_widget
      .relatedViews
      .language_usage_widget_undefined
      ._languageDropdown
      .dropdownSelect).data('dropdown').close();
    this.inherited(transitionAway, arguments);
  },
});

export default __class;

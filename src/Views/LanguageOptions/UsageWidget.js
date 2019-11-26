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
import aspect from 'dojo/aspect';
import string from 'dojo/string';
import RelatedViewManager from 'argos/RelatedViewManager';
import _RelatedViewWidgetBase from 'argos/_RelatedViewWidgetBase';
import Dropdown from 'argos/Dropdown';
import getResource from 'argos/I18n';
import LanguageService from 'argos/LanguageService';

const resource = getResource('languageUsageWidget');

const __class = declare('crm.Views.LanguageOptions.UsageWidget', [_RelatedViewWidgetBase], {
  // Localization
  regionText: resource.regionText,
  languageText: resource.languageText,
  toastTitle: resource.toastTitle,
  toastMessage: resource.toastMessage,
  invalidLanguageError: resource.invalidLanguageError,
  invalidRegionError: resource.invalidRegionError,
  languageService: null,
  cls: 'related-language-usage-widget',
  relatedContentTemplate: new Simplate([
    '<div class="language-usage">',
    '<span data-dojo-attach-point="_languageNode" ></span>',
    '<span data-dojo-attach-point="_regionThanNode" ></span>',
    '</div>',
  ]),
  onInit: function onInit() {
    this.languageService = new LanguageService();
    this.onLoad();
    if (this.owner) {
      aspect.after(this.owner, 'show', () => {
        this.onRefreshView();
      });

      aspect.after(this.owner, 'save', () => {
        this.onSave();
      });
    }
  },
  onLoad: function onLoad() {
    const language = this.languageService.getLanguage('language');
    const region = this.languageService.getRegion('region');
    this.initUI(language || 'en', region || 'en');
  },
  initUI: function initUI(lang, region) {
    const locales = [];
    for (const key in window.languages) {
      if (window.languages.hasOwnProperty(key)) {
        locales.push({ value: key, text: window.languages[key], key });
      }
    }
    if (!this._languageDropdown) {
      this._languageDropdown = new Dropdown({
        id: 'language-dropdown',
        onSelectScope: this,
        label: this.languageText,
      });
      this._languageDropdown.createList({
        items: locales,
      });
      $(this._languageNode).append(this._languageDropdown.domNode);
      this._languageDropdown.setValue(lang);
      try {
        this._languageDropdown.getValue();
      } catch (e) {
        console.error(string.substitute(this.invalidLanguageError, [lang])); // eslint-disable-line
        this._languageDropdown.setValue('en');
        this.languageService.setLanguage('en');
      }
    }

    if (!this._regionDropdown) {
      this._regionDropdown = new Dropdown({
        id: 'region-dropdown',
        onSelectScope: this,
        label: this.regionText,
      });
      this._regionDropdown.createList({
        items: locales,
      });
      $(this._regionThanNode).append(this._regionDropdown.domNode);
      this._regionDropdown.setValue(region);
      try {
        this._regionDropdown.getValue();
      } catch (e) {
        console.error(string.substitute(this.invalidRegionError, [region]));  // eslint-disable-line
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
    const language = this._languageDropdown.getValue();
    const region = this._regionDropdown.getValue();

    try {
      this.languageService.setLanguage(language);
      this.languageService.setRegion(region);
      App.clearMetricPreferences();
      App.clearQuickActionPreferences();
      App.toast.add({
        message: this.toastMessage,
        title: this.toastTitle,
        toastTime: 3000,
      });
    } catch (e) {
      console.error(e); // eslint-disable-line
    }
  },
});
const rvm = new RelatedViewManager();
rvm.registerType('languageUsageWidget', __class);
export default __class;

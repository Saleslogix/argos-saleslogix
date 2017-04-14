import declare from 'dojo/_base/declare';
import aspect from 'dojo/aspect';
import RelatedViewManager from 'argos/RelatedViewManager';
import _RelatedViewWidgetBase from 'argos/_RelatedViewWidgetBase';
import Dropdown from 'argos/Dropdown';
import getResource from 'argos/I18n';

const resource = getResource('languageUsageWidget');

const __class = declare('crm.Views.LanguageOptions.UsageWidget', [_RelatedViewWidgetBase], {
  // Localization
  regionText: resource.regionText,
  languageText: resource.languageText,
  toastTitle: resource.toastTitle,
  toastMessage: resource.toastMessage,

  cls: 'related-language-usage-widget',
  relatedContentTemplate: new Simplate([
    '<div class="language-usage">',
    '<span data-dojo-attach-point="_languageNode" ></span>',
    '<span data-dojo-attach-point="_regionThanNode" ></span>',
    '</div>',
  ]),
  onInit: function onInit() {
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
    let language;
    let region;
    if (window.localStorage) {
      language = window.localStorage.getItem('language');
      region = window.localStorage.getItem('region');
    }
    this.initUI(language || 'en', region || 'en');
  },
  initUI: function initUI(lang, region) {
    const locales = [];
    window.supportedLocales.forEach((locale) => {
      locales.push({ item: locale, value: locale, key: locale });
    });
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
    const language = this._languageDropdown.getValue();
    const region = this._regionDropdown.getValue();

    try {
      if (window.localStorage) {
        window.localStorage.setItem('language', language);
        window.localStorage.setItem('region', region);

        App.toast.add({
          message: this.toastMessage,
          title: this.toastTitle,
          toastTime: 3000,
        });
      }
    } catch (e) {
      console.error(e); // eslint-disable-line
    }
  },
});
const rvm = new RelatedViewManager();
rvm.registerType('languageUsageWidget', __class);
export default __class;

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
    this.inherited(arguments);
  },
});

export default __class;

import declare from 'dojo/_base/declare';
import _EditBase from 'argos/_EditBase';
import _RelatedWidgetEditMixin from 'argos/_RelatedViewWidgetEditMixin';
import Deferred from 'dojo/Deferred';
import getResource from 'argos/I18n';

const resource = getResource('offlineOptionsEdit');

/**
 * @class crm.Views.OfflineOptions.Edit
 *
 * @extends argos.Edit
 *
 */
const __class = declare('crm.Views.OfflineOptions.Edit', [_EditBase, _RelatedWidgetEditMixin], {
  // Localization
  titleText: resource.titleText,
  multiColumnView: false,
  // View Properties
  id: 'offline_options_edit',
  createLayout: function createLayout() {
    return this.layout || (this.layout = [{
      relatedView: {
        widgetType: 'offlineUsageWidget',
        id: 'offline_usage_widget',
      },
    }]);
  },
  requestData: function requestData() {
    return this.getOfflineOptions().then((data) => {
      this._onGetComplete(data);
    }, (err) => {
      this._onGetError(null, err);
    });
  },
  getOfflineOptions: function getOfflineOptions() {
    const def = new Deferred();
    def.resolve({ maxdays: 5 });
    return def.promise;
  },
  onRefreshUpdate: function onRefreshUpdate() {
    this.requestData();
  },
  transitionAway: function transitionAway() {
    // force soho dropdown to close since they dont close on a button click elsewhere on UI
    $(this.relatedViewManagers
      .offline_usage_widget
      .relatedViews
      .offline_usage_widget_undefined
      ._olderThanDropdown
      .dropdownSelect).data('dropdown').close();
    this.inherited(arguments);
  },
});

export default __class;

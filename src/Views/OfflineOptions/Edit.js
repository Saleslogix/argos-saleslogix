import declare from 'dojo/_base/declare';
import Edit from 'argos/Edit';
import Deferred from 'dojo/Deferred';

const resource = window.localeContext.getEntitySync('offlineOptionsEdit').attributes;

/**
 * @class crm.Views.OfflineOptions.Edit
 *
 * @extends argos.Edit
 *
 */
const __class = declare('crm.Views.OfflineOptions.Edit', [Edit], {
  // Localization
  titleText: resource.titleText,
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
    def.resolve({maxdays: 5});
    return def.promise;
  },
  onRefreshUpdate: function onRefreshUpdate() {
    this.requestData();
  },
});

export default __class;

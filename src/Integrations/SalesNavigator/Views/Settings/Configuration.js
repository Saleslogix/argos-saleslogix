import declare from 'dojo/_base/declare';
import _EditBase from 'argos/_EditBase';
import getResource from 'argos/I18n';
import WidgetTypes from '../../WidgetTypes';

const resource = getResource('salesNavigator');

/**
 * @class crm.Views.OfflineOptions.Edit
 *
 * @extends argos.Edit
 *
 */
const __class = declare('crm.Integrations.SalesNavigator.Settings.Configuration', [_EditBase], {
  // Localization
  titleText: resource.salesNavigatorConfiguration,
  detailsText: resource.accountWidgetSettings,

  // View Properties
  id: 'sales_navigator_configuration_edit',

  createLayout: function createLayout() {
    return this.layout || (this.layout = [{
      label: resource.responsiveWidget,
      name: 'AccountResponsive',
      property: 'AccountResponsive',
      type: 'boolean',
    }, {
      label: resource.smallWidgetType,
      name: 'AccountSmallWidgetType',
      property: 'AccountSmallWidgetType',
      title: resource.smallAccountWidgetType,
      type: 'select',
      view: 'sales_navigator_select_list',
      data: this.createWidgetTypeData.bindDelegate(this),
    }, {
      title: resource.contactWidgetSettings,
      name: 'ContactWidgetSettings',
      children: [{
        label: resource.responsiveWidget,
        name: 'ContactResponsive',
        property: 'ContactResponsive',
        type: 'boolean',
      }, {
        label: resource.smallWidgetType,
        name: 'ContactSmallWidgetType',
        property: 'ContactSmallWidgetType',
        title: resource.smallContactWidgetType,
        type: 'select',
        view: 'sales_navigator_select_list',
        data: this.createWidgetTypeData.bindDelegate(this),
      }],
    }, {
      title: resource.leadWidgetSettings,
      name: 'LeadWidgetSettings',
      children: [{
        label: resource.responsiveWidget,
        name: 'LeadResponsive',
        property: 'LeadResponsive',
        type: 'boolean',
      }, {
        label: resource.smallWidgetType,
        name: 'LeadSmallWidgetType',
        property: 'LeadSmallWidgetType',
        title: resource.smallLeadWidgetType,
        type: 'select',
        view: 'sales_navigator_select_list',
        data: this.createWidgetTypeData.bindDelegate(this),
      }],
    }]);
  },
  convertEntry: function convertEntry(entry) {
    const accountWidgetType = WidgetTypes[entry.accounts.smallWidgetType];
    const contactWidgetType = WidgetTypes[entry.contacts.smallWidgetType];
    const leadWidgetType = WidgetTypes[entry.leads.smallWidgetType];

    entry.AccountResponsive = entry.accounts.isResponsive;
    entry.AccountSmallWidgetType = resource[accountWidgetType.value] || accountWidgetType.text;
    entry.ContactResponsive = entry.contacts.isResponsive;
    entry.ContactSmallWidgetType = resource[contactWidgetType.value] || contactWidgetType.text;
    entry.LeadResponsive = entry.leads.isResponsive;
    entry.LeadSmallWidgetType = resource[leadWidgetType.value] || leadWidgetType.text;

    return entry;
  },
  createWidgetTypeData: function createWidgetTypeData() {
    const list = [];
    const smallWidgetTypes = Object.keys(WidgetTypes).filter(value => WidgetTypes[value].width.minimum === WidgetTypes.simple.width.minimum);

    smallWidgetTypes.forEach((type) => {
      list.push({
        $key: WidgetTypes[type].value,
        $descriptor: resource[type] || WidgetTypes[type].text,
        description: resource[`${type}Description`] || WidgetTypes[type].description,
      });
    });

    return {
      $resources: list,
    };
  },
  requestData: function requestData() {
    return this._onGetComplete(Object.assign({}, this.app.salesNavigatorSettings));
  },
  onRefreshUpdate: function onRefreshUpdate() {
    this.requestData();
  },
  onPutComplete: function onPutComplete() {
    this.enable();

    this.onUpdateCompleted();
  },
  onUpdate: function onUpdate(values) {
    const revertEntry = Object.assign({}, this.app.salesNavigatorSettings);

    if (values.AccountResponsive !== undefined) {
      revertEntry.accounts.isResponsive = values.AccountResponsive;
    }
    if (values.AccountSmallWidgetType !== undefined) {
      revertEntry.accounts.smallWidgetType = values.AccountSmallWidgetType;
    }
    if (values.ContactResponsive !== undefined) {
      revertEntry.contacts.isResponsive = values.ContactResponsive;
    }
    if (values.ContactSmallWidgetType !== undefined) {
      revertEntry.contacts.smallWidgetType = values.ContactSmallWidgetType;
    }
    if (values.LeadResponsive !== undefined) {
      revertEntry.leads.isResponsive = values.LeadResponsive;
    }
    if (values.LeadSmallWidgetType !== undefined) {
      revertEntry.leads.smallWidgetType = values.LeadSmallWidgetType;
    }

    this.app.salesNavigatorSettings = Object.assign({}, this.app.salesNavigatorSettings, revertEntry);
    this.app.saveNavigatorSettings(this.app.salesNavigatorSettings);

    this.onPutComplete();
  },
});

export default __class;

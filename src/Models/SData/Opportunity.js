import declare from 'dojo/_base/declare';
import _SDataModelBase from 'argos/Models/_SDataModelBase';
import Manager from 'argos/Models/Manager';
import MODEL_TYPE from 'argos/Models/Types';
import MODEL_NAMES from '../Names';

const __class = declare('crm.Models.SData.Opportunity', [_SDataModelBase], {
  entityName: 'Opportunity',
  entityDisplayName: 'Opportunity',
  entityDisplayNamePlural: 'Opportunities',
  iconClass: 'fa fa-money fa-2x',
  resourceKind: 'opportunities',
  modelName: 'Opportunity',
  security: 'Entities/Opportunity/View',
  querySelect: [
    'Account/AccountName',
    'Account/WebAddress',
    'Account/MainPhone',
    'Account/Fax',
    'Account/Address/*',
    'AccountManager/UserInfo/FirstName',
    'AccountManager/UserInfo/LastName',
    'CloseProbability',
    'Description',
    'EstimatedClose',
    'ExchangeRate',
    'ExchangeRateCode',
    'ExchangeRateDate',
    'ExchangeRateLocked',
    'LeadSource/Description',
    'Owner/OwnerDescription',
    'Reseller/AccountName',
    'SalesPotential',
    'Stage',
    'Status',
    'Type',
    'Weighted',
  ],
  createQueryModels: function createQueryModels() {
    return [{
      name: 'list',
      queryOrderBy: 'EstimatedClose desc',
      querySelect: [
        'Account/AccountName',
        'Account/AccountManager/UserInfo/UserName',
        'Account/AccountManager/UserInfo/Region',
        'Description',
        'Stage',
        'Status',
        'SalesPotential',
        'ExchangeRate',
        'ExchangeRateCode',
        'ModifyDate',
        'ActualClose',
        'EstimatedClose',
      ],
    }, {
      name: 'detail',
      querySelect: [
        'Account/AccountName',
        'Account/WebAddress',
        'Account/MainPhone',
        'Account/Fax',
        'Account/Address/*',
        'AccountManager/UserInfo/FirstName',
        'AccountManager/UserInfo/LastName',
        'CloseProbability',
        'Description',
        'EstimatedClose',
        'ExchangeRate',
        'ExchangeRateCode',
        'ExchangeRateDate',
        'ExchangeRateLocked',
        'LeadSource/Description',
        'Owner/OwnerDescription',
        'Reseller/AccountName',
        'SalesPotential',
        'Stage',
        'Status',
        'Type',
        'Weighted',
      ],
    }];
  },
});

Manager.register(MODEL_NAMES.OPPORTUNITY, MODEL_TYPE.SDATA, __class);
export default __class;

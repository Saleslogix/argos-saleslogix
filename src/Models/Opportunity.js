import declare from 'dojo/_base/declare';
import _ModelBase from 'argos/_ModelBase';
import _SDataModelMixin from 'argos/_SDataModelMixin';

export default declare('crm.Models.Opportunity', [_ModelBase, _SDataModelMixin], {
  entityName: 'Opportunity',
  resourceKind: 'opportunities',
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
});

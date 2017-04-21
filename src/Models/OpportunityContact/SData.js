import declare from 'dojo/_base/declare';
import Base from './Base';
import _SDataModelBase from 'argos/Models/_SDataModelBase';
import Manager from 'argos/Models/Manager';
import MODEL_TYPE from 'argos/Models/Types';
import MODEL_NAMES from '../Names';

const __class = declare('crm.Models.OpportunityContact.SData', [Base, _SDataModelBase], {
  id: 'opportunity_contact_sdata_model',
  createQueryModels: function createQueryModels() {
    return [{
      name: 'list',
      queryOrderBy: 'Contact.NameLF',
      querySelect: [
        'Contact/Account/AccountName',
        'Contact/AccountName',
        'SalesRole',
        'IsPrimary',
        'Contact/NameLF',
        'Contact/Title',
      ],
    }, {
      name: 'detail',
      querySelect: [
        'Opportunity/Description',
        'Contact/Account/AccountName',
        'Contact/AccountName',
        'SalesRole',
        'Contact/NameLF',
        'Contact/Title',
        'IsPrimary',
        'Competitors/CompetitorName',
        'Issues',
        'PersonalBenefits',
        'Standing',
        'Strategy',
      ],
    }];
  },
});

Manager.register(MODEL_NAMES.OPPORTUNITYCONTACT, MODEL_TYPE.SDATA, __class);
export default __class;

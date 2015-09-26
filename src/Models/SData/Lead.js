import declare from 'dojo/_base/declare';
import _SDataModelBase from 'argos/Models/_SDataModelBase';
import Manager from 'argos/Models/Manager';
import MODEL_TYPE from 'argos/Models/Types';
import MODEL_NAMES from '../Names';

const __class = declare('crm.Models.SData.Lead', [_SDataModelBase], {
  entityName: 'Lead',
  entityDisplayName: 'Lead',
  entityDisplayNamePlural: 'Leads',
  iconClass: 'fa fa-filter fa-2x',
  resourceKind: 'leads',
  security: 'Entities/Lead/View',
  createQueryModels: function createQueryModels() {
    return [{
      name: 'list',
      queryOrderBy: 'LastNameUpper,FirstName',
      querySelect: [
        'Company',
        'LeadNameLastFirst',
        'WebAddress',
        'Email',
        'WorkPhone',
        'Mobile',
        'TollFree',
        'Title',
        'ModifyDate',
      ],
    }, {
      name: 'detail',
      querySelect: [
        'Address/*',
        'BusinessDescription',
        'Company',
        'CreateDate',
        'CreateUser',
        'Email',
        'FirstName',
        'FullAddress',
        'Industry',
        'Interests',
        'LastName',
        'LeadNameLastFirst',
        'LeadSource/Description',
        'MiddleName',
        'Mobile',
        'Notes',
        'Owner/OwnerDescription',
        'Prefix',
        'SICCode',
        'Suffix',
        'Title',
        'TollFree',
        'WebAddress',
        'WorkPhone',
      ],
    }];
  },
});

Manager.register(MODEL_NAMES.LEAD, MODEL_TYPE.SDATA, __class);
export default __class;

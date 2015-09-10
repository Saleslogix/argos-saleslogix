import declare from 'dojo/_base/declare';
import _ModelBase from 'argos/Models/_ModelBase';
import _SDataModelMixin from 'argos/Models/_SDataModelMixin';
import Manager from 'argos/Models/Manager';
import MODEL_TYPE from 'argos/Models/Types';
import MODEL_NAMES from '../Names';

const __class = declare('crm.Models.SData.Lead', [_ModelBase, _SDataModelMixin], {
  entityName: 'Lead',
  entityDisplayName: 'Lead',
  entityDisplayNamePlural: 'Leads',
  iconClass: 'fa fa-filter fa-2x',
  resourceKind: 'leads',
  security: 'Entities/Lead/View',
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
});

Manager.register(MODEL_NAMES.LEAD, MODEL_TYPE.SDATA, __class);
export default __class;

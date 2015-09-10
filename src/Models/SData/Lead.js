import declare from 'dojo/_base/declare';
import _ModelBase from 'argos/Models/_ModelBase';
import _SDataModelMixin from 'argos/Models/_SDataModelMixin';

export default declare('crm.Models.SData.Lead', [_ModelBase, _SDataModelMixin], {
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

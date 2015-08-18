import declare from 'dojo/_base/declare';
import _ModelBase from 'argos/_ModelBase';
import _SDataModelMixin from 'argos/_SDataModelMixin';
import Deferred from 'dojo/Deferred';

export default declare('crm.Models.Lead', [_ModelBase, _SDataModelMixin], {
  entityName: 'Lead',
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
   'WorkPhone'
  ]
  
});

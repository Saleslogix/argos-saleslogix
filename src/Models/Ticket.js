import declare from 'dojo/_base/declare';
import _ModelBase from 'argos/_ModelBase';
import _SDataModelMixin from 'argos/_SDataModelMixin';
import Deferred from 'dojo/Deferred';

export default declare('crm.Models.Ticket', [_ModelBase, _SDataModelMixin], {
  entityName: 'Ticket',
  resourceKind: 'tickets',
  security: 'Entities/Ticket/View',
  querySelect: [
      'Account/AccountName',
      'Account/MainPhone',
      'Area',
      'AssignedDate',
      'AssignedTo/OwnerDescription',
      'Category',
      'Contact/NameLF',
      'Contact/WorkPhone',
      'Contract/ReferenceNumber',
      'Issue',
      'NeededByDate',
      'Notes',
      'ViaCode',
      'StatusCode',
      'UrgencyCode',
      'Subject',
      'TicketNumber',
      'TicketProblem/Notes',
      'TicketSolution/Notes',
      'Urgency/Description',
      'Urgency/UrgencyCode',
      'CompletedBy/OwnerDescription'
  ]
  
});

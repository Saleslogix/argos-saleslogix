import declare from 'dojo/_base/declare';
import string from 'dojo/string';
import all from 'dojo/promise/all';
import Deferred from 'dojo/Deferred';
import _SDataModelBase from 'argos/Models/_SDataModelBase';
import ErrorManager from 'argos/ErrorManager';
import Manager from 'argos/Models/Manager';
import MODEL_TYPE from 'argos/Models/Types';
import MODEL_NAMES from '../Names';

const __class = declare('crm.Models.SData.Activity', [_SDataModelBase], {
  entityName: 'Activity',
  entityDisplayName: 'Activity',
  entityDisplayNamePlural: 'Activities',
  iconClass: 'fa fa-list-ul fa-2x',
  resourceKind: 'activities',
  contractName: 'system',
  recurringActivityIdSeparator: ';',
  activityIndicatorIconByType: {
    'atToDo': 'fa fa-list-ul',
    'atPhoneCall': 'fa fa-phone',
    'atAppointment': 'fa fa-calendar-o',
    'atLiterature': 'fa fa-book',
    'atPersonal': 'fa fa-check-square-o',
    'atQuestion': 'fa fa-question-circle',
    'atNote': 'fa fa-file-text-o',
    'atEMail': 'fa fa-envelope',
  },
  activityTypeText: {
    'atToDo': 'To-Do',
    'atPhoneCall': 'Phone Call',
    'atAppointment': 'Meeting',
    'atLiterature': 'Lit Request',
    'atPersonal': 'Personal',
    'atQuestion': 'Question',
    'atNote': 'Note',
    'atEMail': 'Email',
  },
  createQueryModels: function createQueryModels() {
    return [{
      name: 'list',
      queryOrderBy: 'StartDate desc',
      querySelect: [
        'Description',
        'StartDate',
        'Type',
        'AccountId',
        'AccountName',
        'ContactId',
        'ContactName',
        'PhoneNumber',
        'LeadId',
        'LeadName',
        'TicketId',
        'OpportunityId',
        'Leader',
        'UserId',
        'Timeless',
        'Alarm',
        'Priority',
        'ModifyDate',
        'RecurrenceState',
        'Recurring',
      ],
      queryInclude: [
        '$descriptors',
      ],
      resourceKind: 'activities',
      contractName: 'system',
    }, {
      name: 'detail',
      querySelect: [
        'AccountId',
        'AccountName',
        'Alarm',
        'AlarmTime',
        'Category',
        'Company',
        'ContactId',
        'ContactName',
        'Description',
        'Duration',
        'Leader/$key',
        'LeadId',
        'LeadName',
        'Location',
        'LongNotes',
        'OpportunityId',
        'OpportunityName',
        'PhoneNumber',
        'Priority',
        'Rollover',
        'StartDate',
        'EndDate',
        'TicketId',
        'TicketNumber',
        'Timeless',
        'Type',
        'Recurring',
        'RecurPeriod',
        'RecurPeriodSpec',
        'RecurIterations',
        'RecurrenceState',
        'AllowAdd',
        'AllowEdit',
        'AllowDelete',
        'AllowComplete',
      ],
    }, {
      name: 'edit',
    }];
  },
  createRelationships: function createRelationships() {
    let rel;
    rel = this.relationships || (this.relationships = [ {
      name: 'Account',
      displayName: 'Account',
      propertyName: 'Account',
      type: 'ManyToOne',
      parentEntity: 'Activity',
      parentProperty: 'AccountId',
      childEntity: 'Account',
      childProperty: 'AccountId',
      childDataPath: 'Id',
      queryModelName: 'detail',
    }, {
      name: 'Contact',
      displayName: 'Contact',
      propertyName: 'Contact',
      type: 'ManyToOne',
      parentEntity: 'Activity',
      parentProperty: 'ContactId',
      childEntity: 'Contact',
      childProperty: 'ContactId',
      childDataPath: 'Id',
      queryModelName: 'detail',
    }, {
      name: 'Ticket',
      displayName: 'Ticket',
      propertyName: 'Ticket',
      type: 'ManyToOne',
      parentEntity: 'Activity',
      parentProperty: 'TicketId',
      childEntity: 'Ticket',
      childProperty: 'TicketId',
      childDataPath: 'Id',
      queryModelName: 'detail',
    }, {
      name: 'Opportunity',
      displayName: 'Opportunity',
      propertyName: 'Opportunnity',
      type: 'ManyToOne',
      parentEntity: 'Activity',
      parentProperty: 'OpportunityId',
      childEntity: 'OpportunityId',
      childProperty: 'OpportunityId',
      childDataPath: 'Id',
      queryModelName: 'detail',
    }, {
      name: 'Lead',
      displayName: 'Lead',
      propertyName: 'Lead',
      type: 'ManyToOne',
      parentEntity: 'Activity',
      parentProperty: 'LeadId',
      childEntity: 'Lead',
      childProperty: 'LeadId',
      childDataPath: 'Id',
      queryModelName: 'detail',
    }]);
    return rel;
  },
  createRequestPromise: function createRequestPromise(key, querySelect, resourceKind, contractName, options) {
    const request = new Sage.SData.Client.SDataSingleResourceRequest(App.getService())
      .setResourceKind(resourceKind)
      .setResourceSelector(string.substitute("'${0}'", [key]))
      .setContractName(contractName)
      .setQueryArg('select', querySelect.join(','));
    const def = new Deferred();

    request.read({
      success: (data) => {
        def.resolve(data);
      },
      failure: (response, o) => {
        ErrorManager.addError(response, o, options, 'failure');
        def.reject(response);
      },
    });
    return def.promise;
  },
  getEntry: function getEntry(options) {
    const results$ = this.inherited(arguments);
    return results$.then((entry) => {
      const leader$ = this.createRequestPromise(entry.Leader.$key, [
          'UserInfo/FirstName',
          'UserInfo/LastName',
      ], 'users', 'dynamic', options);
      const queryModel = this._getQueryModelByName('detail');
      const recurrence$ = this.createRequestPromise(entry.$key.split(this.recurringActivityIdSeparator).shift(),
        queryModel.querySelect,
        this.resourceKind,
        this.contractName,
        options);

      return all([leader$, recurrence$])
        .then(([leader, recurrence]) => {
          entry.Leader = leader;
          entry.recurrence = recurrence;
          return entry;
        });
    });
  },
  getIconClass: function getIconClass(entry) {
    let cls = this.iconClass;
    if (entry && entry.Type) {
      cls = this.activityIndicatorIconByType[entry.Type];
      if (cls) {
        cls = cls + ' fa-2x';
      }
    }
    return cls;
  },
  getTypeText: function getTypeText(entry) {
    let name = '';
    if (entry && entry.Type) {
      name = this.activityTypeText[entry.Type];
    }
    return name;
  },
});

Manager.register(MODEL_NAMES.ACTIVITY, MODEL_TYPE.SDATA, __class);
export default __class;

define('crm/Views/History/Edit', ['module', 'exports', 'dojo/_base/declare', 'dojo/string', '../../Environment', '../../Validator', 'argos/Utility', 'argos/Edit', 'argos/I18n'], function (module, exports, _declare, _string, _Environment, _Validator, _Utility, _Edit, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _string2 = _interopRequireDefault(_string);

  var _Environment2 = _interopRequireDefault(_Environment);

  var _Validator2 = _interopRequireDefault(_Validator);

  var _Utility2 = _interopRequireDefault(_Utility);

  var _Edit2 = _interopRequireDefault(_Edit);

  var _I18n2 = _interopRequireDefault(_I18n);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var resource = (0, _I18n2.default)('historyEdit'); /* Copyright 2017 Infor
                                                      *
                                                      * Licensed under the Apache License, Version 2.0 (the "License");
                                                      * you may not use this file except in compliance with the License.
                                                      * You may obtain a copy of the License at
                                                      *
                                                      *    http://www.apache.org/licenses/LICENSE-2.0
                                                      *
                                                      * Unless required by applicable law or agreed to in writing, software
                                                      * distributed under the License is distributed on an "AS IS" BASIS,
                                                      * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
                                                      * See the License for the specific language governing permissions and
                                                      * limitations under the License.
                                                      */

  var dtFormatResource = (0, _I18n2.default)('historyEditDateTimeFormat');

  /**
   * @class crm.Views.History.Edit
   *
   * @extends argos.Edit
   *
   * @requires argos.Utility
   *
   * @requires crm.Environment
   * @requires crm.Validator
   */
  var __class = (0, _declare2.default)('crm.Views.History.Edit', [_Edit2.default], {
    // Localization
    accountText: resource.accountText,
    noteDescriptionTitleText: resource.noteDescriptionTitleText,
    contactText: resource.contactText,
    longNotesText: resource.longNotesText,
    longNotesTitleText: resource.longNotesTitleText,
    opportunityText: resource.opportunityText,
    ticketNumberText: resource.ticketNumberText,
    regardingText: resource.regardingText,
    isLeadText: resource.isLeadText,
    startingText: resource.startingText,
    startingFormatText: dtFormatResource.startingFormatText,
    startingFormatText24: dtFormatResource.startingFormatText24,
    titleText: resource.titleText,
    companyText: resource.companyText,
    leadText: resource.leadText,
    relatedItemsText: resource.relatedItemsText,
    yesText: resource.yesText,
    noText: resource.noText,
    validationText: resource.validationText,
    validationCanEditText: resource.validationCanEditText,
    // View Properties
    id: 'history_edit',
    fieldsForLeads: ['AccountName', 'Lead'],
    fieldsForStandard: ['Account', 'Contact', 'Opportunity', 'Ticket'],
    entityName: 'History',
    resourceKind: 'history',
    insertSecurity: null, // 'Entities/History/Add',
    updateSecurity: null, // 'Entities/History/Edit',
    querySelect: ['AccountId', 'AccountName', 'Category', 'ModifyDate', 'CompletedDate', 'ContactId', 'ContactName', 'CompletedUser', 'Description', 'Duration', 'Notes', 'LongNotes', 'OpportunityId', 'OpportunityName', 'Priority', 'StartDate', 'TicketId', 'TicketNumber', 'LeadId', 'LeadName', 'Timeless', 'Type', 'UserName', 'UserId'],
    queryInclude: ['$permissions'],
    existsRE: /^[\w]{12}$/,
    init: function init() {
      this.inherited(arguments);

      this.connect(this.fields.Lead, 'onChange', this.onLeadChange);
      this.connect(this.fields.IsLead, 'onChange', this.onIsLeadChange);

      this.connect(this.fields.Account, 'onChange', this.onAccountChange);
      this.connect(this.fields.Contact, 'onChange', this.onAccountDependentChange);
      this.connect(this.fields.Opportunity, 'onChange', this.onAccountDependentChange);
      this.connect(this.fields.Ticket, 'onChange', this.onAccountDependentChange);
    },
    isHistoryForLead: function isHistoryForLead(entry) {
      return entry && this.existsRE.test(entry.LeadId);
    },
    isInLeadContext: function isInLeadContext() {
      var insert = this.options && this.options.insert;
      var entry = this.options && this.options.entry;
      var context = this._getNavContext();
      var isLeadContext = false;

      if (context && context.resourceKind === 'leads') {
        isLeadContext = true;
      }

      var lead = insert && isLeadContext || this.isHistoryForLead(entry);
      return !!lead;
    },
    beforeTransitionTo: function beforeTransitionTo() {
      this.inherited(arguments);

      // we hide the lead or standard fields here, as the view is currently hidden, in order to prevent flashing.
      // the value for the 'IsLead' field will be set later, based on the value derived here.

      // todo: there is an issue when refreshing the edit view as options.isLead is persisted in the navigation state.
      if (this.options.isForLead !== undefined) {
        return;
      }

      this.options.isForLead = this.isInLeadContext();

      if (this.options.isForLead) {
        this.showFieldsForLead();
      } else {
        this.showFieldsForStandard();
      }
    },
    setOfflineNoteData: function setOfflineNoteData() {
      var entry = this.options && this.options.selectedEntry;
      if (!entry) {
        return;
      }

      this.setUserContext();
      this.fields.Text.setValue(entry.Text);
      var start = moment(entry.StartDate);
      this.fields.StartDate.setValue(start.toDate());
    },
    _buildRefreshMessage: function _buildRefreshMessage() {
      var base = this.inherited(arguments);
      var entry = this.options && this.options.selectedEntry;
      if (entry && this.options.fromOffline) {
        base.UID = entry.UID;
      }

      return base;
    },
    onIsLeadChange: function onIsLeadChange(value) {
      this.options.isForLead = value;

      if (this.options.isForLead) {
        this.showFieldsForLead();
      } else {
        this.showFieldsForStandard();
      }
    },
    onLeadChange: function onLeadChange(value, field) {
      var selection = field.getSelection();

      if (selection && this.insert) {
        this.fields.AccountName.setValue(_Utility2.default.getValue(selection, 'Company'));
      }
    },
    onAccountChange: function onAccountChange(value) {
      var fields = this.fields;
      ['Contact', 'Opportunity', 'Ticket'].forEach(function (f) {
        if (value) {
          fields[f].dependsOn = 'Account';
          fields[f].where = 'Account.Id eq "' + (value.AccountId || value.key) + '"';

          if (fields[f].currentSelection && fields[f].currentSelection.Account.$key !== (value.AccountId || value.key)) {
            fields[f].setValue(false);
          }
        } else {
          fields[f].dependsOn = null;
          fields[f].where = 'Account.AccountName ne null';
          fields[f].setValue(false);
        }
      });
    },
    onAccountDependentChange: function onAccountDependentChange(value, field) {
      if (value && !field.dependsOn && field.currentSelection && field.currentSelection.Account) {
        var accountField = this.fields.Account;
        accountField.setValue({
          AccountId: field.currentSelection.Account.$key,
          AccountName: field.currentSelection.Account.AccountName
        });
        this.onAccountChange(accountField.getValue(), accountField);
      }
    },
    showFieldsForLead: function showFieldsForLead() {
      var _this = this;

      this.fieldsForStandard.concat(this.fieldsForStandard).forEach(function (item) {
        if (_this.fields[item]) {
          _this.fields[item].hide();
        }
      }, this);

      this.fieldsForLeads.forEach(function (item) {
        if (_this.fields[item]) {
          _this.fields[item].show();
        }
      }, this);
    },
    showFieldsForStandard: function showFieldsForStandard() {
      var _this2 = this;

      this.fieldsForStandard.concat(this.fieldsForLeads).forEach(function (item) {
        if (_this2.fields[item]) {
          _this2.fields[item].hide();
        }
      }, this);

      this.fieldsForStandard.forEach(function (item) {
        if (_this2.fields[item]) {
          _this2.fields[item].show();
        }
      }, this);
    },
    onInsertSuccess: function onInsertSuccess() {
      _Environment2.default.refreshStaleDetailViews();
      this.inherited(arguments);
    },
    applyContext: function applyContext() {
      var found = this._getNavContext();

      var lookup = {
        accounts: this.applyAccountContext,
        contacts: this.applyContactContext,
        opportunities: this.applyOpportunityContext,
        leads: this.applyLeadContext,
        tickets: this.applyTicketContext
      };

      if (found && lookup[found.resourceKind]) {
        lookup[found.resourceKind].call(this, found);
      }

      this.setUserContext();
      this.fields.StartDate.setValue(new Date());
      this.fields.Text.setValue('');
    },
    setUserContext: function setUserContext() {
      var user = App.context && App.context.user;

      this.fields.Type.setValue('atNote');
      this.fields.UserId.setValue(user && user.$key);
      this.fields.UserName.setValue(user && user.$descriptor);
    },
    _getNavContext: function _getNavContext() {
      var found = App.queryNavigationContext(function (o) {
        var context = o.options && o.options.source || o;
        return (/^(accounts|contacts|opportunities|leads|tickets)$/.test(context.resourceKind) && context.key
        );
      });
      found = found && found.options && found.options.source || found;
      return found;
    },
    applyAccountContext: function applyAccountContext(context) {
      var accountField = this.fields.Account;
      var accountValue = {
        AccountId: context.key,
        AccountName: context.descriptor
      };
      accountField.setValue(accountValue);
      this.onAccountChange(accountValue, accountField);
    },
    applyLeadContext: function applyLeadContext(context) {
      var view = App.getView(context.id);
      var entry = context.entry || view && view.entry;

      if (!entry || !entry.$key) {
        return;
      }

      var leadField = this.fields.Lead;
      var leadValue = {
        LeadId: entry.$key,
        LeadName: entry.$descriptor
      };

      leadField.setValue(leadValue);
      this.onLeadChange(leadValue, leadField);

      this.fields.AccountName.setValue(entry.Company);

      var isLeadField = this.fields.IsLead;
      isLeadField.setValue(context.resourceKind === 'leads');
      this.onIsLeadChange(isLeadField.getValue(), isLeadField);
    },
    applyOpportunityContext: function applyOpportunityContext(context) {
      var opportunityField = this.fields.Opportunity;
      var accountEntry = void 0;

      opportunityField.setValue({
        OpportunityId: context.key,
        OpportunityName: context.descriptor
      });

      this.onAccountDependentChange(opportunityField.getValue, opportunityField);

      if (context.entry && context.entry.Account) {
        accountEntry = context.entry.Account;
      } else {
        var view = App.getView(context.id);
        var entry = view && view.entry;
        accountEntry = entry && entry.Account;
      }

      if (accountEntry) {
        var accountField = this.fields.Account;
        accountField.setValue({
          AccountId: accountEntry.$key,
          AccountName: accountEntry.AccountName
        });
        this.onAccountChange(accountField.getValue(), accountField);
      }

      // todo: find a good way to get the primary contact and apply
    },
    applyContactContext: function applyContactContext(context) {
      var contactField = this.fields.Contact;
      var accountEntry = void 0;
      contactField.setValue({
        ContactId: context.key,
        ContactName: context.descriptor
      });

      this.onAccountDependentChange(contactField.getValue(), contactField);

      if (context.entry && context.entry.Account) {
        accountEntry = context.entry.Account;
      } else {
        var view = App.getView(context.id);
        var entry = view && view.entry;
        accountEntry = entry && entry.Account;
      }

      if (accountEntry) {
        var accountField = this.fields.Account;
        accountField.setValue({
          AccountId: accountEntry.$key,
          AccountName: accountEntry.AccountName
        });
        this.onAccountChange(accountField.getValue(), accountField);
      }
    },
    applyTicketContext: function applyTicketContext(context) {
      var ticketField = this.fields.Ticket;
      var accountEntry = void 0;
      var contactEntry = void 0;
      ticketField.setValue({
        TicketId: context.key,
        TicketNumber: context.descriptor
      });
      this.onAccountDependentChange(ticketField.getValue(), ticketField);

      if (context.entry && context.entry.Account) {
        accountEntry = context.entry.Account;
        contactEntry = context.entry.Contact;
      } else {
        var view = App.getView(context.id);
        var entry = view && view.entry;
        accountEntry = entry && entry.Account;
        contactEntry = entry && entry.Contact;
      }

      if (accountEntry) {
        var accountField = this.fields.Account;
        accountField.setValue({
          AccountId: accountEntry.$key,
          AccountName: accountEntry.AccountName
        });
        this.onAccountChange(accountField.getValue(), accountField);
      }

      if (contactEntry) {
        var contactField = this.fields.Contact;
        contactField.setValue({
          ContactId: contactEntry.$key,
          ContactName: contactEntry.NameLF
        });
        this.onAccountDependentChange(contactField.getValue(), contactField);
      }
    },
    onRefreshInsert: function onRefreshInsert() {
      if (this.options.fromOffline) {
        this.setOfflineNoteData();
        $(this.domNode).removeClass('panel-loading');
      } else {
        this.inherited(arguments);
      }
    },
    setValues: function setValues(values) {
      this.inherited(arguments);
      var isLeadField = this.fields.IsLead;
      if (this.isInLeadContext()) {
        isLeadField.setValue(true);
        this.onIsLeadChange(true, isLeadField);
        var field = this.fields.Lead;
        var value = _Utility2.default.getValue(values, field.applyTo, {});
        field.setValue(value, !this.inserting);
        var leadCompany = _Utility2.default.getValue(values, 'AccountName');
        if (leadCompany) {
          this.fields.AccountName.setValue(leadCompany);
        }
      } else {
        isLeadField.setValue(false);
      }

      var longNotes = _Utility2.default.getValue(values, 'LongNotes');
      if (longNotes) {
        this.fields.Text.setValue(longNotes);
      }

      var insert = this.options && this.options.insert;
      this.context = this._getNavContext();
      // entry may have been passed as full entry, reapply context logic to extract properties
      if (insert && this.context && this.context.resourceKind) {
        var lookup = {
          accounts: this.applyAccountContext,
          contacts: this.applyContactContext,
          opportunities: this.applyOpportunityContext,
          leads: this.applyLeadContext,
          tickets: this.applyTicketContext
        };
        lookup[this.context.resourceKind].call(this, this.context);
      }
      this.enableFields();
      var denyEdit = !this.currentUserCanEdit();
      if (denyEdit) {
        this.disableFields();
      }
    },
    disableFields: function disableFields(predicate) {
      for (var name in this.fields) {
        if (!predicate || predicate(this.fields[name])) {
          this.fields[name].disable();
        }
      }
    },
    enableFields: function enableFields(predicate) {
      for (var name in this.fields) {
        if (!predicate || predicate(this.fields[name])) {
          this.fields[name].enable();
        }
      }
    },
    currentUserCanEdit: function currentUserCanEdit() {
      var entry = this.options.entry || this.entry;
      var insert = this.options && this.options.insert;
      if (!insert) {
        if (App.context.user.$key === 'ADMIN') {
          return true;
        }
        return entry && entry.UserId === App.context.user.$key;
      }
      return true;
    },
    formatDependentQuery: function formatDependentQuery(dependentValue, format, property) {
      var theProperty = property || '$key';
      var propertyValue = _Utility2.default.getValue(dependentValue, theProperty);
      if (propertyValue) {
        return _string2.default.substitute(format, [propertyValue]);
      }
      return '';
    },
    getValues: function getValues() {
      var values = this.inherited(arguments);

      if (this.fields.Text.isDirty()) {
        var text = this.fields.Text.getValue();

        values = values || {};
        values.LongNotes = text;
        values.Notes = text && text.length > 250 ? text.substr(0, 250) : text;
      }

      return values;
    },
    _lookupApplyTo: function _lookupApplyTo(payload, value) {
      if (value === null) {
        payload[this.valueKeyProperty] = null;
        payload[this.valueTextProperty] = null;
      }
    },
    createLayout: function createLayout() {
      return this.layout || (this.layout = [{
        title: this.longNotesTitleText,
        name: 'NotesSection',
        children: [{
          name: 'Text',
          property: 'Text',
          label: this.longNotesText,
          cls: 'row-edit-text',
          type: 'textarea',
          autoFocus: true
        }]
      }, {
        title: this.detailsText,
        name: 'DetailsSection',
        children: [{
          name: 'Type',
          property: 'Type',
          type: 'hidden'
        }, {
          name: 'UserId',
          property: 'UserId',
          type: 'hidden'
        }, {
          name: 'UserName',
          property: 'UserName',
          type: 'hidden'
        }, {
          label: this.startingText,
          name: 'StartDate',
          property: 'StartDate',
          type: 'date',
          showTimePicker: true,
          dateFormatText: App.is24HourClock() ? this.startingFormatText24 : this.startingFormatText,
          minValue: new Date(1900, 0, 1),
          validator: [_Validator2.default.exists, _Validator2.default.isDateInRange]
        }, {
          dependsOn: 'Type',
          label: this.regardingText,
          name: 'Description',
          property: 'Description',
          picklist: 'Note Regarding',
          orderBy: 'text asc',
          title: this.noteDescriptionTitleText,
          type: 'picklist',
          maxTextLength: 64,
          validator: _Validator2.default.exceedsMaxTextLength
        }]
      }, {
        title: this.relatedItemsText,
        name: 'RelatedItemsSection',
        children: [{
          label: this.isLeadText,
          name: 'IsLead',
          include: false,
          type: 'boolean',
          onText: this.yesText,
          offText: this.noText
        }, {
          label: this.accountText,
          name: 'Account',
          property: 'Account',
          type: 'lookup',
          requireSelection: false,
          emptyText: '',
          applyTo: this._lookupApplyTo,
          valueKeyProperty: 'AccountId',
          valueTextProperty: 'AccountName',
          view: 'account_related',
          validator: {
            fn: function validateAccount(value, field) {
              var insert = field.owner.options && field.owner.options.insert;
              if (insert && !value) {
                return true;
              }
              return false;
            }.bindDelegate(this),
            message: this.validationText
          }
        }, {
          dependsOn: 'Account',
          label: this.contactText,
          name: 'Contact',
          property: 'Contact',
          type: 'lookup',
          requireSelection: false,
          emptyText: '',
          applyTo: this._lookupApplyTo,
          valueKeyProperty: 'ContactId',
          valueTextProperty: 'ContactName',
          view: 'contact_related',
          where: this.formatDependentQuery.bindDelegate(this, 'Account.Id eq "${0}"', 'AccountId')
        }, {
          dependsOn: 'Account',
          label: this.opportunityText,
          name: 'Opportunity',
          property: 'Opportunity',
          type: 'lookup',
          requireSelection: false,
          emptyText: '',
          applyTo: this._lookupApplyTo,
          valueKeyProperty: 'OpportunityId',
          valueTextProperty: 'OpportunityName',
          view: 'opportunity_related',
          where: this.formatDependentQuery.bindDelegate(this, 'Account.Id eq "${0}"', 'AccountId')
        }, {
          dependsOn: 'Account',
          label: this.ticketNumberText,
          name: 'Ticket',
          property: 'Ticket',
          type: 'lookup',
          requireSelection: false,
          emptyText: '',
          applyTo: this._lookupApplyTo,
          valueKeyProperty: 'TicketId',
          valueTextProperty: 'TicketNumber',
          view: 'ticket_related',
          where: this.formatDependentQuery.bindDelegate(this, 'Account.Id eq "${0}"', 'AccountId')
        }, {
          label: this.leadText,
          name: 'Lead',
          property: 'Lead',
          type: 'lookup',
          requireSelection: false,
          emptyText: '',
          applyTo: this._lookupApplyTo,
          valueKeyProperty: 'LeadId',
          valueTextProperty: 'LeadName',
          view: 'lead_related',
          validator: _Validator2.default.exists
        }, {
          label: this.companyText,
          name: 'AccountName',
          property: 'AccountName',
          type: 'text'
        }, {
          label: 'UserId',
          name: 'UserId',
          property: 'UserId',
          type: 'hidden',
          validator: {
            fn: function validateUserId(value, field) {
              var canEdit = field.owner.currentUserCanEdit();
              if (!canEdit) {
                return true;
              }
              return false;
            }.bindDelegate(this),
            message: this.validationCanEditText
          }
        }]
      }]);
    }
  });

  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9WaWV3cy9IaXN0b3J5L0VkaXQuanMiXSwibmFtZXMiOlsicmVzb3VyY2UiLCJkdEZvcm1hdFJlc291cmNlIiwiX19jbGFzcyIsImFjY291bnRUZXh0Iiwibm90ZURlc2NyaXB0aW9uVGl0bGVUZXh0IiwiY29udGFjdFRleHQiLCJsb25nTm90ZXNUZXh0IiwibG9uZ05vdGVzVGl0bGVUZXh0Iiwib3Bwb3J0dW5pdHlUZXh0IiwidGlja2V0TnVtYmVyVGV4dCIsInJlZ2FyZGluZ1RleHQiLCJpc0xlYWRUZXh0Iiwic3RhcnRpbmdUZXh0Iiwic3RhcnRpbmdGb3JtYXRUZXh0Iiwic3RhcnRpbmdGb3JtYXRUZXh0MjQiLCJ0aXRsZVRleHQiLCJjb21wYW55VGV4dCIsImxlYWRUZXh0IiwicmVsYXRlZEl0ZW1zVGV4dCIsInllc1RleHQiLCJub1RleHQiLCJ2YWxpZGF0aW9uVGV4dCIsInZhbGlkYXRpb25DYW5FZGl0VGV4dCIsImlkIiwiZmllbGRzRm9yTGVhZHMiLCJmaWVsZHNGb3JTdGFuZGFyZCIsImVudGl0eU5hbWUiLCJyZXNvdXJjZUtpbmQiLCJpbnNlcnRTZWN1cml0eSIsInVwZGF0ZVNlY3VyaXR5IiwicXVlcnlTZWxlY3QiLCJxdWVyeUluY2x1ZGUiLCJleGlzdHNSRSIsImluaXQiLCJpbmhlcml0ZWQiLCJhcmd1bWVudHMiLCJjb25uZWN0IiwiZmllbGRzIiwiTGVhZCIsIm9uTGVhZENoYW5nZSIsIklzTGVhZCIsIm9uSXNMZWFkQ2hhbmdlIiwiQWNjb3VudCIsIm9uQWNjb3VudENoYW5nZSIsIkNvbnRhY3QiLCJvbkFjY291bnREZXBlbmRlbnRDaGFuZ2UiLCJPcHBvcnR1bml0eSIsIlRpY2tldCIsImlzSGlzdG9yeUZvckxlYWQiLCJlbnRyeSIsInRlc3QiLCJMZWFkSWQiLCJpc0luTGVhZENvbnRleHQiLCJpbnNlcnQiLCJvcHRpb25zIiwiY29udGV4dCIsIl9nZXROYXZDb250ZXh0IiwiaXNMZWFkQ29udGV4dCIsImxlYWQiLCJiZWZvcmVUcmFuc2l0aW9uVG8iLCJpc0ZvckxlYWQiLCJ1bmRlZmluZWQiLCJzaG93RmllbGRzRm9yTGVhZCIsInNob3dGaWVsZHNGb3JTdGFuZGFyZCIsInNldE9mZmxpbmVOb3RlRGF0YSIsInNlbGVjdGVkRW50cnkiLCJzZXRVc2VyQ29udGV4dCIsIlRleHQiLCJzZXRWYWx1ZSIsInN0YXJ0IiwibW9tZW50IiwiU3RhcnREYXRlIiwidG9EYXRlIiwiX2J1aWxkUmVmcmVzaE1lc3NhZ2UiLCJiYXNlIiwiZnJvbU9mZmxpbmUiLCJVSUQiLCJ2YWx1ZSIsImZpZWxkIiwic2VsZWN0aW9uIiwiZ2V0U2VsZWN0aW9uIiwiQWNjb3VudE5hbWUiLCJnZXRWYWx1ZSIsImZvckVhY2giLCJmIiwiZGVwZW5kc09uIiwid2hlcmUiLCJBY2NvdW50SWQiLCJrZXkiLCJjdXJyZW50U2VsZWN0aW9uIiwiJGtleSIsImFjY291bnRGaWVsZCIsImNvbmNhdCIsIml0ZW0iLCJoaWRlIiwic2hvdyIsIm9uSW5zZXJ0U3VjY2VzcyIsInJlZnJlc2hTdGFsZURldGFpbFZpZXdzIiwiYXBwbHlDb250ZXh0IiwiZm91bmQiLCJsb29rdXAiLCJhY2NvdW50cyIsImFwcGx5QWNjb3VudENvbnRleHQiLCJjb250YWN0cyIsImFwcGx5Q29udGFjdENvbnRleHQiLCJvcHBvcnR1bml0aWVzIiwiYXBwbHlPcHBvcnR1bml0eUNvbnRleHQiLCJsZWFkcyIsImFwcGx5TGVhZENvbnRleHQiLCJ0aWNrZXRzIiwiYXBwbHlUaWNrZXRDb250ZXh0IiwiY2FsbCIsIkRhdGUiLCJ1c2VyIiwiQXBwIiwiVHlwZSIsIlVzZXJJZCIsIlVzZXJOYW1lIiwiJGRlc2NyaXB0b3IiLCJxdWVyeU5hdmlnYXRpb25Db250ZXh0IiwibyIsInNvdXJjZSIsImFjY291bnRWYWx1ZSIsImRlc2NyaXB0b3IiLCJ2aWV3IiwiZ2V0VmlldyIsImxlYWRGaWVsZCIsImxlYWRWYWx1ZSIsIkxlYWROYW1lIiwiQ29tcGFueSIsImlzTGVhZEZpZWxkIiwib3Bwb3J0dW5pdHlGaWVsZCIsImFjY291bnRFbnRyeSIsIk9wcG9ydHVuaXR5SWQiLCJPcHBvcnR1bml0eU5hbWUiLCJjb250YWN0RmllbGQiLCJDb250YWN0SWQiLCJDb250YWN0TmFtZSIsInRpY2tldEZpZWxkIiwiY29udGFjdEVudHJ5IiwiVGlja2V0SWQiLCJUaWNrZXROdW1iZXIiLCJOYW1lTEYiLCJvblJlZnJlc2hJbnNlcnQiLCIkIiwiZG9tTm9kZSIsInJlbW92ZUNsYXNzIiwic2V0VmFsdWVzIiwidmFsdWVzIiwiYXBwbHlUbyIsImluc2VydGluZyIsImxlYWRDb21wYW55IiwibG9uZ05vdGVzIiwiZW5hYmxlRmllbGRzIiwiZGVueUVkaXQiLCJjdXJyZW50VXNlckNhbkVkaXQiLCJkaXNhYmxlRmllbGRzIiwicHJlZGljYXRlIiwibmFtZSIsImRpc2FibGUiLCJlbmFibGUiLCJmb3JtYXREZXBlbmRlbnRRdWVyeSIsImRlcGVuZGVudFZhbHVlIiwiZm9ybWF0IiwicHJvcGVydHkiLCJ0aGVQcm9wZXJ0eSIsInByb3BlcnR5VmFsdWUiLCJzdWJzdGl0dXRlIiwiZ2V0VmFsdWVzIiwiaXNEaXJ0eSIsInRleHQiLCJMb25nTm90ZXMiLCJOb3RlcyIsImxlbmd0aCIsInN1YnN0ciIsIl9sb29rdXBBcHBseVRvIiwicGF5bG9hZCIsInZhbHVlS2V5UHJvcGVydHkiLCJ2YWx1ZVRleHRQcm9wZXJ0eSIsImNyZWF0ZUxheW91dCIsImxheW91dCIsInRpdGxlIiwiY2hpbGRyZW4iLCJsYWJlbCIsImNscyIsInR5cGUiLCJhdXRvRm9jdXMiLCJkZXRhaWxzVGV4dCIsInNob3dUaW1lUGlja2VyIiwiZGF0ZUZvcm1hdFRleHQiLCJpczI0SG91ckNsb2NrIiwibWluVmFsdWUiLCJ2YWxpZGF0b3IiLCJleGlzdHMiLCJpc0RhdGVJblJhbmdlIiwicGlja2xpc3QiLCJvcmRlckJ5IiwibWF4VGV4dExlbmd0aCIsImV4Y2VlZHNNYXhUZXh0TGVuZ3RoIiwiaW5jbHVkZSIsIm9uVGV4dCIsIm9mZlRleHQiLCJyZXF1aXJlU2VsZWN0aW9uIiwiZW1wdHlUZXh0IiwiZm4iLCJ2YWxpZGF0ZUFjY291bnQiLCJvd25lciIsImJpbmREZWxlZ2F0ZSIsIm1lc3NhZ2UiLCJ2YWxpZGF0ZVVzZXJJZCIsImNhbkVkaXQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF1QkEsTUFBTUEsV0FBVyxvQkFBWSxhQUFaLENBQWpCLEMsQ0F2QkE7Ozs7Ozs7Ozs7Ozs7OztBQXdCQSxNQUFNQyxtQkFBbUIsb0JBQVksMkJBQVosQ0FBekI7O0FBRUE7Ozs7Ozs7Ozs7QUFVQSxNQUFNQyxVQUFVLHVCQUFRLHdCQUFSLEVBQWtDLGdCQUFsQyxFQUEwQztBQUN4RDtBQUNBQyxpQkFBYUgsU0FBU0csV0FGa0M7QUFHeERDLDhCQUEwQkosU0FBU0ksd0JBSHFCO0FBSXhEQyxpQkFBYUwsU0FBU0ssV0FKa0M7QUFLeERDLG1CQUFlTixTQUFTTSxhQUxnQztBQU14REMsd0JBQW9CUCxTQUFTTyxrQkFOMkI7QUFPeERDLHFCQUFpQlIsU0FBU1EsZUFQOEI7QUFReERDLHNCQUFrQlQsU0FBU1MsZ0JBUjZCO0FBU3hEQyxtQkFBZVYsU0FBU1UsYUFUZ0M7QUFVeERDLGdCQUFZWCxTQUFTVyxVQVZtQztBQVd4REMsa0JBQWNaLFNBQVNZLFlBWGlDO0FBWXhEQyx3QkFBb0JaLGlCQUFpQlksa0JBWm1CO0FBYXhEQywwQkFBc0JiLGlCQUFpQmEsb0JBYmlCO0FBY3hEQyxlQUFXZixTQUFTZSxTQWRvQztBQWV4REMsaUJBQWFoQixTQUFTZ0IsV0Fma0M7QUFnQnhEQyxjQUFVakIsU0FBU2lCLFFBaEJxQztBQWlCeERDLHNCQUFrQmxCLFNBQVNrQixnQkFqQjZCO0FBa0J4REMsYUFBU25CLFNBQVNtQixPQWxCc0M7QUFtQnhEQyxZQUFRcEIsU0FBU29CLE1BbkJ1QztBQW9CeERDLG9CQUFnQnJCLFNBQVNxQixjQXBCK0I7QUFxQnhEQywyQkFBdUJ0QixTQUFTc0IscUJBckJ3QjtBQXNCeEQ7QUFDQUMsUUFBSSxjQXZCb0Q7QUF3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QU9EdEQsbUJBQVMsS0FBSzBCLGNBUGI7QUFRREUsNEJBQWtCLFFBUmpCO0FBU0RDLDZCQUFtQixVQVRsQjtBQVVEdEQsZ0JBQU0sY0FWTDtBQVdEb0UscUJBQVcsb0JBQVVDO0FBWHBCLFNBekVPLEVBcUZQO0FBQ0RWLGlCQUFPLEtBQUt2SyxXQURYO0FBRUQ4SSxnQkFBTSxhQUZMO0FBR0RNLG9CQUFVLGFBSFQ7QUFJRHFCLGdCQUFNO0FBSkwsU0FyRk8sRUEwRlA7QUFDREYsaUJBQU8sUUFETjtBQUVEekIsZ0JBQU0sUUFGTDtBQUdETSxvQkFBVSxRQUhUO0FBSURxQixnQkFBTSxRQUpMO0FBS0RPLHFCQUFXO0FBQ1RZLGdCQUFLLFNBQVNLLGNBQVQsQ0FBd0JwSSxLQUF4QixFQUErQkMsS0FBL0IsRUFBc0M7QUFDekMsa0JBQU1vSSxVQUFVcEksTUFBTWdJLEtBQU4sQ0FBWW5ELGtCQUFaLEVBQWhCO0FBQ0Esa0JBQUksQ0FBQ3VELE9BQUwsRUFBYztBQUNaLHVCQUFPLElBQVA7QUFDRDtBQUNELHFCQUFPLEtBQVA7QUFDRCxhQU5HLENBTURILFlBTkMsQ0FNWSxJQU5aLENBREs7QUFRVEMscUJBQVMsS0FBSzFMO0FBUkw7QUFMVixTQTFGTztBQUhULE9BbERrQyxDQUE5QixDQUFQO0FBZ0tEO0FBOW1CdUQsR0FBMUMsQ0FBaEI7O29CQWluQmVwQixPIiwiZmlsZSI6IkVkaXQuanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IDIwMTcgSW5mb3JcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG5pbXBvcnQgZGVjbGFyZSBmcm9tICdkb2pvL19iYXNlL2RlY2xhcmUnO1xyXG5pbXBvcnQgc3RyaW5nIGZyb20gJ2Rvam8vc3RyaW5nJztcclxuaW1wb3J0IGVudmlyb25tZW50IGZyb20gJy4uLy4uL0Vudmlyb25tZW50JztcclxuaW1wb3J0IHZhbGlkYXRvciBmcm9tICcuLi8uLi9WYWxpZGF0b3InO1xyXG5pbXBvcnQgdXRpbGl0eSBmcm9tICdhcmdvcy9VdGlsaXR5JztcclxuaW1wb3J0IEVkaXQgZnJvbSAnYXJnb3MvRWRpdCc7XHJcbmltcG9ydCBnZXRSZXNvdXJjZSBmcm9tICdhcmdvcy9JMThuJztcclxuXHJcbmNvbnN0IHJlc291cmNlID0gZ2V0UmVzb3VyY2UoJ2hpc3RvcnlFZGl0Jyk7XHJcbmNvbnN0IGR0Rm9ybWF0UmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgnaGlzdG9yeUVkaXREYXRlVGltZUZvcm1hdCcpO1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBjcm0uVmlld3MuSGlzdG9yeS5FZGl0XHJcbiAqXHJcbiAqIEBleHRlbmRzIGFyZ29zLkVkaXRcclxuICpcclxuICogQHJlcXVpcmVzIGFyZ29zLlV0aWxpdHlcclxuICpcclxuICogQHJlcXVpcmVzIGNybS5FbnZpcm9ubWVudFxyXG4gKiBAcmVxdWlyZXMgY3JtLlZhbGlkYXRvclxyXG4gKi9cclxuY29uc3QgX19jbGFzcyA9IGRlY2xhcmUoJ2NybS5WaWV3cy5IaXN0b3J5LkVkaXQnLCBbRWRpdF0sIHtcclxuICAvLyBMb2NhbGl6YXRpb25cclxuICBhY2NvdW50VGV4dDogcmVzb3VyY2UuYWNjb3VudFRleHQsXHJcbiAgbm90ZURlc2NyaXB0aW9uVGl0bGVUZXh0OiByZXNvdXJjZS5ub3RlRGVzY3JpcHRpb25UaXRsZVRleHQsXHJcbiAgY29udGFjdFRleHQ6IHJlc291cmNlLmNvbnRhY3RUZXh0LFxyXG4gIGxvbmdOb3Rlc1RleHQ6IHJlc291cmNlLmxvbmdOb3Rlc1RleHQsXHJcbiAgbG9uZ05vdGVzVGl0bGVUZXh0OiByZXNvdXJjZS5sb25nTm90ZXNUaXRsZVRleHQsXHJcbiAgb3Bwb3J0dW5pdHlUZXh0OiByZXNvdXJjZS5vcHBvcnR1bml0eVRleHQsXHJcbiAgdGlja2V0TnVtYmVyVGV4dDogcmVzb3VyY2UudGlja2V0TnVtYmVyVGV4dCxcclxuICByZWdhcmRpbmdUZXh0OiByZXNvdXJjZS5yZWdhcmRpbmdUZXh0LFxyXG4gIGlzTGVhZFRleHQ6IHJlc291cmNlLmlzTGVhZFRleHQsXHJcbiAgc3RhcnRpbmdUZXh0OiByZXNvdXJjZS5zdGFydGluZ1RleHQsXHJcbiAgc3RhcnRpbmdGb3JtYXRUZXh0OiBkdEZvcm1hdFJlc291cmNlLnN0YXJ0aW5nRm9ybWF0VGV4dCxcclxuICBzdGFydGluZ0Zvcm1hdFRleHQyNDogZHRGb3JtYXRSZXNvdXJjZS5zdGFydGluZ0Zvcm1hdFRleHQyNCxcclxuICB0aXRsZVRleHQ6IHJlc291cmNlLnRpdGxlVGV4dCxcclxuICBjb21wYW55VGV4dDogcmVzb3VyY2UuY29tcGFueVRleHQsXHJcbiAgbGVhZFRleHQ6IHJlc291cmNlLmxlYWRUZXh0LFxyXG4gIHJlbGF0ZWRJdGVtc1RleHQ6IHJlc291cmNlLnJlbGF0ZWRJdGVtc1RleHQsXHJcbiAgeWVzVGV4dDogcmVzb3VyY2UueWVzVGV4dCxcclxuICBub1RleHQ6IHJlc291cmNlLm5vVGV4dCxcclxuICB2YWxpZGF0aW9uVGV4dDogcmVzb3VyY2UudmFsaWRhdGlvblRleHQsXHJcbiAgdmFsaWRhdGlvbkNhbkVkaXRUZXh0OiByZXNvdXJjZS52YWxpZGF0aW9uQ2FuRWRpdFRleHQsXHJcbiAgLy8gVmlldyBQcm9wZXJ0aWVzXHJcbiAgaWQ6ICdoaXN0b3J5X2VkaXQnLFxyXG4gIGZpZWxkc0ZvckxlYWRzOiBbJ0FjY291bnROYW1lJywgJ0xlYWQnXSxcclxuICBmaWVsZHNGb3JTdGFuZGFyZDogWydBY2NvdW50JywgJ0NvbnRhY3QnLCAnT3Bwb3J0dW5pdHknLCAnVGlja2V0J10sXHJcbiAgZW50aXR5TmFtZTogJ0hpc3RvcnknLFxyXG4gIHJlc291cmNlS2luZDogJ2hpc3RvcnknLFxyXG4gIGluc2VydFNlY3VyaXR5OiBudWxsLCAvLyAnRW50aXRpZXMvSGlzdG9yeS9BZGQnLFxyXG4gIHVwZGF0ZVNlY3VyaXR5OiBudWxsLCAvLyAnRW50aXRpZXMvSGlzdG9yeS9FZGl0JyxcclxuICBxdWVyeVNlbGVjdDogW1xyXG4gICAgJ0FjY291bnRJZCcsXHJcbiAgICAnQWNjb3VudE5hbWUnLFxyXG4gICAgJ0NhdGVnb3J5JyxcclxuICAgICdNb2RpZnlEYXRlJyxcclxuICAgICdDb21wbGV0ZWREYXRlJyxcclxuICAgICdDb250YWN0SWQnLFxyXG4gICAgJ0NvbnRhY3ROYW1lJyxcclxuICAgICdDb21wbGV0ZWRVc2VyJyxcclxuICAgICdEZXNjcmlwdGlvbicsXHJcbiAgICAnRHVyYXRpb24nLFxyXG4gICAgJ05vdGVzJyxcclxuICAgICdMb25nTm90ZXMnLFxyXG4gICAgJ09wcG9ydHVuaXR5SWQnLFxyXG4gICAgJ09wcG9ydHVuaXR5TmFtZScsXHJcbiAgICAnUHJpb3JpdHknLFxyXG4gICAgJ1N0YXJ0RGF0ZScsXHJcbiAgICAnVGlja2V0SWQnLFxyXG4gICAgJ1RpY2tldE51bWJlcicsXHJcbiAgICAnTGVhZElkJyxcclxuICAgICdMZWFkTmFtZScsXHJcbiAgICAnVGltZWxlc3MnLFxyXG4gICAgJ1R5cGUnLFxyXG4gICAgJ1VzZXJOYW1lJyxcclxuICAgICdVc2VySWQnLFxyXG4gIF0sXHJcbiAgcXVlcnlJbmNsdWRlOiBbXHJcbiAgICAnJHBlcm1pc3Npb25zJyxcclxuICBdLFxyXG4gIGV4aXN0c1JFOiAvXltcXHddezEyfSQvLFxyXG4gIGluaXQ6IGZ1bmN0aW9uIGluaXQoKSB7XHJcbiAgICB0aGlzLmluaGVyaXRlZChhcmd1bWVudHMpO1xyXG5cclxuICAgIHRoaXMuY29ubmVjdCh0aGlzLmZpZWxkcy5MZWFkLCAnb25DaGFuZ2UnLCB0aGlzLm9uTGVhZENoYW5nZSk7XHJcbiAgICB0aGlzLmNvbm5lY3QodGhpcy5maWVsZHMuSXNMZWFkLCAnb25DaGFuZ2UnLCB0aGlzLm9uSXNMZWFkQ2hhbmdlKTtcclxuXHJcbiAgICB0aGlzLmNvbm5lY3QodGhpcy5maWVsZHMuQWNjb3VudCwgJ29uQ2hhbmdlJywgdGhpcy5vbkFjY291bnRDaGFuZ2UpO1xyXG4gICAgdGhpcy5jb25uZWN0KHRoaXMuZmllbGRzLkNvbnRhY3QsICdvbkNoYW5nZScsIHRoaXMub25BY2NvdW50RGVwZW5kZW50Q2hhbmdlKTtcclxuICAgIHRoaXMuY29ubmVjdCh0aGlzLmZpZWxkcy5PcHBvcnR1bml0eSwgJ29uQ2hhbmdlJywgdGhpcy5vbkFjY291bnREZXBlbmRlbnRDaGFuZ2UpO1xyXG4gICAgdGhpcy5jb25uZWN0KHRoaXMuZmllbGRzLlRpY2tldCwgJ29uQ2hhbmdlJywgdGhpcy5vbkFjY291bnREZXBlbmRlbnRDaGFuZ2UpO1xyXG4gIH0sXHJcbiAgaXNIaXN0b3J5Rm9yTGVhZDogZnVuY3Rpb24gaXNIaXN0b3J5Rm9yTGVhZChlbnRyeSkge1xyXG4gICAgcmV0dXJuIGVudHJ5ICYmIHRoaXMuZXhpc3RzUkUudGVzdChlbnRyeS5MZWFkSWQpO1xyXG4gIH0sXHJcbiAgaXNJbkxlYWRDb250ZXh0OiBmdW5jdGlvbiBpc0luTGVhZENvbnRleHQoKSB7XHJcbiAgICBjb25zdCBpbnNlcnQgPSB0aGlzLm9wdGlvbnMgJiYgdGhpcy5vcHRpb25zLmluc2VydDtcclxuICAgIGNvbnN0IGVudHJ5ID0gdGhpcy5vcHRpb25zICYmIHRoaXMub3B0aW9ucy5lbnRyeTtcclxuICAgIGNvbnN0IGNvbnRleHQgPSB0aGlzLl9nZXROYXZDb250ZXh0KCk7XHJcbiAgICBsZXQgaXNMZWFkQ29udGV4dCA9IGZhbHNlO1xyXG5cclxuICAgIGlmIChjb250ZXh0ICYmIGNvbnRleHQucmVzb3VyY2VLaW5kID09PSAnbGVhZHMnKSB7XHJcbiAgICAgIGlzTGVhZENvbnRleHQgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGxlYWQgPSAoaW5zZXJ0ICYmIGlzTGVhZENvbnRleHQpIHx8IHRoaXMuaXNIaXN0b3J5Rm9yTGVhZChlbnRyeSk7XHJcbiAgICByZXR1cm4gISFsZWFkO1xyXG4gIH0sXHJcbiAgYmVmb3JlVHJhbnNpdGlvblRvOiBmdW5jdGlvbiBiZWZvcmVUcmFuc2l0aW9uVG8oKSB7XHJcbiAgICB0aGlzLmluaGVyaXRlZChhcmd1bWVudHMpO1xyXG5cclxuICAgIC8vIHdlIGhpZGUgdGhlIGxlYWQgb3Igc3RhbmRhcmQgZmllbGRzIGhlcmUsIGFzIHRoZSB2aWV3IGlzIGN1cnJlbnRseSBoaWRkZW4sIGluIG9yZGVyIHRvIHByZXZlbnQgZmxhc2hpbmcuXHJcbiAgICAvLyB0aGUgdmFsdWUgZm9yIHRoZSAnSXNMZWFkJyBmaWVsZCB3aWxsIGJlIHNldCBsYXRlciwgYmFzZWQgb24gdGhlIHZhbHVlIGRlcml2ZWQgaGVyZS5cclxuXHJcbiAgICAvLyB0b2RvOiB0aGVyZSBpcyBhbiBpc3N1ZSB3aGVuIHJlZnJlc2hpbmcgdGhlIGVkaXQgdmlldyBhcyBvcHRpb25zLmlzTGVhZCBpcyBwZXJzaXN0ZWQgaW4gdGhlIG5hdmlnYXRpb24gc3RhdGUuXHJcbiAgICBpZiAodGhpcy5vcHRpb25zLmlzRm9yTGVhZCAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLm9wdGlvbnMuaXNGb3JMZWFkID0gdGhpcy5pc0luTGVhZENvbnRleHQoKTtcclxuXHJcbiAgICBpZiAodGhpcy5vcHRpb25zLmlzRm9yTGVhZCkge1xyXG4gICAgICB0aGlzLnNob3dGaWVsZHNGb3JMZWFkKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLnNob3dGaWVsZHNGb3JTdGFuZGFyZCgpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgc2V0T2ZmbGluZU5vdGVEYXRhOiBmdW5jdGlvbiBzZXRPZmZsaW5lTm90ZURhdGEoKSB7XHJcbiAgICBjb25zdCBlbnRyeSA9IHRoaXMub3B0aW9ucyAmJiB0aGlzLm9wdGlvbnMuc2VsZWN0ZWRFbnRyeTtcclxuICAgIGlmICghZW50cnkpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuc2V0VXNlckNvbnRleHQoKTtcclxuICAgIHRoaXMuZmllbGRzLlRleHQuc2V0VmFsdWUoZW50cnkuVGV4dCk7XHJcbiAgICBjb25zdCBzdGFydCA9IG1vbWVudChlbnRyeS5TdGFydERhdGUpO1xyXG4gICAgdGhpcy5maWVsZHMuU3RhcnREYXRlLnNldFZhbHVlKHN0YXJ0LnRvRGF0ZSgpKTtcclxuICB9LFxyXG4gIF9idWlsZFJlZnJlc2hNZXNzYWdlOiBmdW5jdGlvbiBfYnVpbGRSZWZyZXNoTWVzc2FnZSgpIHtcclxuICAgIGNvbnN0IGJhc2UgPSB0aGlzLmluaGVyaXRlZChhcmd1bWVudHMpO1xyXG4gICAgY29uc3QgZW50cnkgPSB0aGlzLm9wdGlvbnMgJiYgdGhpcy5vcHRpb25zLnNlbGVjdGVkRW50cnk7XHJcbiAgICBpZiAoZW50cnkgJiYgdGhpcy5vcHRpb25zLmZyb21PZmZsaW5lKSB7XHJcbiAgICAgIGJhc2UuVUlEID0gZW50cnkuVUlEO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBiYXNlO1xyXG4gIH0sXHJcbiAgb25Jc0xlYWRDaGFuZ2U6IGZ1bmN0aW9uIG9uSXNMZWFkQ2hhbmdlKHZhbHVlKSB7XHJcbiAgICB0aGlzLm9wdGlvbnMuaXNGb3JMZWFkID0gdmFsdWU7XHJcblxyXG4gICAgaWYgKHRoaXMub3B0aW9ucy5pc0ZvckxlYWQpIHtcclxuICAgICAgdGhpcy5zaG93RmllbGRzRm9yTGVhZCgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5zaG93RmllbGRzRm9yU3RhbmRhcmQoKTtcclxuICAgIH1cclxuICB9LFxyXG4gIG9uTGVhZENoYW5nZTogZnVuY3Rpb24gb25MZWFkQ2hhbmdlKHZhbHVlLCBmaWVsZCkge1xyXG4gICAgY29uc3Qgc2VsZWN0aW9uID0gZmllbGQuZ2V0U2VsZWN0aW9uKCk7XHJcblxyXG4gICAgaWYgKHNlbGVjdGlvbiAmJiB0aGlzLmluc2VydCkge1xyXG4gICAgICB0aGlzLmZpZWxkcy5BY2NvdW50TmFtZS5zZXRWYWx1ZSh1dGlsaXR5LmdldFZhbHVlKHNlbGVjdGlvbiwgJ0NvbXBhbnknKSk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBvbkFjY291bnRDaGFuZ2U6IGZ1bmN0aW9uIG9uQWNjb3VudENoYW5nZSh2YWx1ZSkge1xyXG4gICAgY29uc3QgZmllbGRzID0gdGhpcy5maWVsZHM7XHJcbiAgICBbJ0NvbnRhY3QnLCAnT3Bwb3J0dW5pdHknLCAnVGlja2V0J10uZm9yRWFjaCgoZikgPT4ge1xyXG4gICAgICBpZiAodmFsdWUpIHtcclxuICAgICAgICBmaWVsZHNbZl0uZGVwZW5kc09uID0gJ0FjY291bnQnO1xyXG4gICAgICAgIGZpZWxkc1tmXS53aGVyZSA9IGBBY2NvdW50LklkIGVxIFwiJHt2YWx1ZS5BY2NvdW50SWQgfHwgdmFsdWUua2V5fVwiYDtcclxuXHJcbiAgICAgICAgaWYgKGZpZWxkc1tmXS5jdXJyZW50U2VsZWN0aW9uICYmIGZpZWxkc1tmXS5jdXJyZW50U2VsZWN0aW9uLkFjY291bnQuJGtleSAhPT0gKHZhbHVlLkFjY291bnRJZCB8fCB2YWx1ZS5rZXkpKSB7XHJcbiAgICAgICAgICBmaWVsZHNbZl0uc2V0VmFsdWUoZmFsc2UpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBmaWVsZHNbZl0uZGVwZW5kc09uID0gbnVsbDtcclxuICAgICAgICBmaWVsZHNbZl0ud2hlcmUgPSAnQWNjb3VudC5BY2NvdW50TmFtZSBuZSBudWxsJztcclxuICAgICAgICBmaWVsZHNbZl0uc2V0VmFsdWUoZmFsc2UpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9LFxyXG4gIG9uQWNjb3VudERlcGVuZGVudENoYW5nZTogZnVuY3Rpb24gb25BY2NvdW50RGVwZW5kZW50Q2hhbmdlKHZhbHVlLCBmaWVsZCkge1xyXG4gICAgaWYgKHZhbHVlICYmICFmaWVsZC5kZXBlbmRzT24gJiYgZmllbGQuY3VycmVudFNlbGVjdGlvbiAmJiBmaWVsZC5jdXJyZW50U2VsZWN0aW9uLkFjY291bnQpIHtcclxuICAgICAgY29uc3QgYWNjb3VudEZpZWxkID0gdGhpcy5maWVsZHMuQWNjb3VudDtcclxuICAgICAgYWNjb3VudEZpZWxkLnNldFZhbHVlKHtcclxuICAgICAgICBBY2NvdW50SWQ6IGZpZWxkLmN1cnJlbnRTZWxlY3Rpb24uQWNjb3VudC4ka2V5LFxyXG4gICAgICAgIEFjY291bnROYW1lOiBmaWVsZC5jdXJyZW50U2VsZWN0aW9uLkFjY291bnQuQWNjb3VudE5hbWUsXHJcbiAgICAgIH0pO1xyXG4gICAgICB0aGlzLm9uQWNjb3VudENoYW5nZShhY2NvdW50RmllbGQuZ2V0VmFsdWUoKSwgYWNjb3VudEZpZWxkKTtcclxuICAgIH1cclxuICB9LFxyXG4gIHNob3dGaWVsZHNGb3JMZWFkOiBmdW5jdGlvbiBzaG93RmllbGRzRm9yTGVhZCgpIHtcclxuICAgIHRoaXMuZmllbGRzRm9yU3RhbmRhcmQuY29uY2F0KHRoaXMuZmllbGRzRm9yU3RhbmRhcmQpLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgaWYgKHRoaXMuZmllbGRzW2l0ZW1dKSB7XHJcbiAgICAgICAgdGhpcy5maWVsZHNbaXRlbV0uaGlkZSgpO1xyXG4gICAgICB9XHJcbiAgICB9LCB0aGlzKTtcclxuXHJcbiAgICB0aGlzLmZpZWxkc0ZvckxlYWRzLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgaWYgKHRoaXMuZmllbGRzW2l0ZW1dKSB7XHJcbiAgICAgICAgdGhpcy5maWVsZHNbaXRlbV0uc2hvdygpO1xyXG4gICAgICB9XHJcbiAgICB9LCB0aGlzKTtcclxuICB9LFxyXG4gIHNob3dGaWVsZHNGb3JTdGFuZGFyZDogZnVuY3Rpb24gc2hvd0ZpZWxkc0ZvclN0YW5kYXJkKCkge1xyXG4gICAgdGhpcy5maWVsZHNGb3JTdGFuZGFyZC5jb25jYXQodGhpcy5maWVsZHNGb3JMZWFkcykuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICBpZiAodGhpcy5maWVsZHNbaXRlbV0pIHtcclxuICAgICAgICB0aGlzLmZpZWxkc1tpdGVtXS5oaWRlKCk7XHJcbiAgICAgIH1cclxuICAgIH0sIHRoaXMpO1xyXG5cclxuICAgIHRoaXMuZmllbGRzRm9yU3RhbmRhcmQuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICBpZiAodGhpcy5maWVsZHNbaXRlbV0pIHtcclxuICAgICAgICB0aGlzLmZpZWxkc1tpdGVtXS5zaG93KCk7XHJcbiAgICAgIH1cclxuICAgIH0sIHRoaXMpO1xyXG4gIH0sXHJcbiAgb25JbnNlcnRTdWNjZXNzOiBmdW5jdGlvbiBvbkluc2VydFN1Y2Nlc3MoKSB7XHJcbiAgICBlbnZpcm9ubWVudC5yZWZyZXNoU3RhbGVEZXRhaWxWaWV3cygpO1xyXG4gICAgdGhpcy5pbmhlcml0ZWQoYXJndW1lbnRzKTtcclxuICB9LFxyXG4gIGFwcGx5Q29udGV4dDogZnVuY3Rpb24gYXBwbHlDb250ZXh0KCkge1xyXG4gICAgY29uc3QgZm91bmQgPSB0aGlzLl9nZXROYXZDb250ZXh0KCk7XHJcblxyXG4gICAgY29uc3QgbG9va3VwID0ge1xyXG4gICAgICBhY2NvdW50czogdGhpcy5hcHBseUFjY291bnRDb250ZXh0LFxyXG4gICAgICBjb250YWN0czogdGhpcy5hcHBseUNvbnRhY3RDb250ZXh0LFxyXG4gICAgICBvcHBvcnR1bml0aWVzOiB0aGlzLmFwcGx5T3Bwb3J0dW5pdHlDb250ZXh0LFxyXG4gICAgICBsZWFkczogdGhpcy5hcHBseUxlYWRDb250ZXh0LFxyXG4gICAgICB0aWNrZXRzOiB0aGlzLmFwcGx5VGlja2V0Q29udGV4dCxcclxuICAgIH07XHJcblxyXG4gICAgaWYgKGZvdW5kICYmIGxvb2t1cFtmb3VuZC5yZXNvdXJjZUtpbmRdKSB7XHJcbiAgICAgIGxvb2t1cFtmb3VuZC5yZXNvdXJjZUtpbmRdLmNhbGwodGhpcywgZm91bmQpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuc2V0VXNlckNvbnRleHQoKTtcclxuICAgIHRoaXMuZmllbGRzLlN0YXJ0RGF0ZS5zZXRWYWx1ZShuZXcgRGF0ZSgpKTtcclxuICAgIHRoaXMuZmllbGRzLlRleHQuc2V0VmFsdWUoJycpO1xyXG4gIH0sXHJcbiAgc2V0VXNlckNvbnRleHQ6IGZ1bmN0aW9uIHNldFVzZXJDb250ZXh0KCkge1xyXG4gICAgY29uc3QgdXNlciA9IEFwcC5jb250ZXh0ICYmIEFwcC5jb250ZXh0LnVzZXI7XHJcblxyXG4gICAgdGhpcy5maWVsZHMuVHlwZS5zZXRWYWx1ZSgnYXROb3RlJyk7XHJcbiAgICB0aGlzLmZpZWxkcy5Vc2VySWQuc2V0VmFsdWUodXNlciAmJiB1c2VyLiRrZXkpO1xyXG4gICAgdGhpcy5maWVsZHMuVXNlck5hbWUuc2V0VmFsdWUodXNlciAmJiB1c2VyLiRkZXNjcmlwdG9yKTtcclxuICB9LFxyXG4gIF9nZXROYXZDb250ZXh0OiBmdW5jdGlvbiBfZ2V0TmF2Q29udGV4dCgpIHtcclxuICAgIGxldCBmb3VuZCA9IEFwcC5xdWVyeU5hdmlnYXRpb25Db250ZXh0KChvKSA9PiB7XHJcbiAgICAgIGNvbnN0IGNvbnRleHQgPSAoby5vcHRpb25zICYmIG8ub3B0aW9ucy5zb3VyY2UpIHx8IG87XHJcbiAgICAgIHJldHVybiAoL14oYWNjb3VudHN8Y29udGFjdHN8b3Bwb3J0dW5pdGllc3xsZWFkc3x0aWNrZXRzKSQvKS50ZXN0KGNvbnRleHQucmVzb3VyY2VLaW5kKSAmJiBjb250ZXh0LmtleTtcclxuICAgIH0pO1xyXG4gICAgZm91bmQgPSAoZm91bmQgJiYgZm91bmQub3B0aW9ucyAmJiBmb3VuZC5vcHRpb25zLnNvdXJjZSkgfHwgZm91bmQ7XHJcbiAgICByZXR1cm4gZm91bmQ7XHJcbiAgfSxcclxuICBhcHBseUFjY291bnRDb250ZXh0OiBmdW5jdGlvbiBhcHBseUFjY291bnRDb250ZXh0KGNvbnRleHQpIHtcclxuICAgIGNvbnN0IGFjY291bnRGaWVsZCA9IHRoaXMuZmllbGRzLkFjY291bnQ7XHJcbiAgICBjb25zdCBhY2NvdW50VmFsdWUgPSB7XHJcbiAgICAgIEFjY291bnRJZDogY29udGV4dC5rZXksXHJcbiAgICAgIEFjY291bnROYW1lOiBjb250ZXh0LmRlc2NyaXB0b3IsXHJcbiAgICB9O1xyXG4gICAgYWNjb3VudEZpZWxkLnNldFZhbHVlKGFjY291bnRWYWx1ZSk7XHJcbiAgICB0aGlzLm9uQWNjb3VudENoYW5nZShhY2NvdW50VmFsdWUsIGFjY291bnRGaWVsZCk7XHJcbiAgfSxcclxuICBhcHBseUxlYWRDb250ZXh0OiBmdW5jdGlvbiBhcHBseUxlYWRDb250ZXh0KGNvbnRleHQpIHtcclxuICAgIGNvbnN0IHZpZXcgPSBBcHAuZ2V0Vmlldyhjb250ZXh0LmlkKTtcclxuICAgIGNvbnN0IGVudHJ5ID0gY29udGV4dC5lbnRyeSB8fCAodmlldyAmJiB2aWV3LmVudHJ5KTtcclxuXHJcbiAgICBpZiAoIWVudHJ5IHx8ICFlbnRyeS4ka2V5KSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBsZWFkRmllbGQgPSB0aGlzLmZpZWxkcy5MZWFkO1xyXG4gICAgY29uc3QgbGVhZFZhbHVlID0ge1xyXG4gICAgICBMZWFkSWQ6IGVudHJ5LiRrZXksXHJcbiAgICAgIExlYWROYW1lOiBlbnRyeS4kZGVzY3JpcHRvcixcclxuICAgIH07XHJcblxyXG4gICAgbGVhZEZpZWxkLnNldFZhbHVlKGxlYWRWYWx1ZSk7XHJcbiAgICB0aGlzLm9uTGVhZENoYW5nZShsZWFkVmFsdWUsIGxlYWRGaWVsZCk7XHJcblxyXG4gICAgdGhpcy5maWVsZHMuQWNjb3VudE5hbWUuc2V0VmFsdWUoZW50cnkuQ29tcGFueSk7XHJcblxyXG4gICAgY29uc3QgaXNMZWFkRmllbGQgPSB0aGlzLmZpZWxkcy5Jc0xlYWQ7XHJcbiAgICBpc0xlYWRGaWVsZC5zZXRWYWx1ZShjb250ZXh0LnJlc291cmNlS2luZCA9PT0gJ2xlYWRzJyk7XHJcbiAgICB0aGlzLm9uSXNMZWFkQ2hhbmdlKGlzTGVhZEZpZWxkLmdldFZhbHVlKCksIGlzTGVhZEZpZWxkKTtcclxuICB9LFxyXG4gIGFwcGx5T3Bwb3J0dW5pdHlDb250ZXh0OiBmdW5jdGlvbiBhcHBseU9wcG9ydHVuaXR5Q29udGV4dChjb250ZXh0KSB7XHJcbiAgICBjb25zdCBvcHBvcnR1bml0eUZpZWxkID0gdGhpcy5maWVsZHMuT3Bwb3J0dW5pdHk7XHJcbiAgICBsZXQgYWNjb3VudEVudHJ5O1xyXG5cclxuICAgIG9wcG9ydHVuaXR5RmllbGQuc2V0VmFsdWUoe1xyXG4gICAgICBPcHBvcnR1bml0eUlkOiBjb250ZXh0LmtleSxcclxuICAgICAgT3Bwb3J0dW5pdHlOYW1lOiBjb250ZXh0LmRlc2NyaXB0b3IsXHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLm9uQWNjb3VudERlcGVuZGVudENoYW5nZShvcHBvcnR1bml0eUZpZWxkLmdldFZhbHVlLCBvcHBvcnR1bml0eUZpZWxkKTtcclxuXHJcbiAgICBpZiAoY29udGV4dC5lbnRyeSAmJiBjb250ZXh0LmVudHJ5LkFjY291bnQpIHtcclxuICAgICAgYWNjb3VudEVudHJ5ID0gY29udGV4dC5lbnRyeS5BY2NvdW50O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc3QgdmlldyA9IEFwcC5nZXRWaWV3KGNvbnRleHQuaWQpO1xyXG4gICAgICBjb25zdCBlbnRyeSA9IHZpZXcgJiYgdmlldy5lbnRyeTtcclxuICAgICAgYWNjb3VudEVudHJ5ID0gZW50cnkgJiYgZW50cnkuQWNjb3VudDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoYWNjb3VudEVudHJ5KSB7XHJcbiAgICAgIGNvbnN0IGFjY291bnRGaWVsZCA9IHRoaXMuZmllbGRzLkFjY291bnQ7XHJcbiAgICAgIGFjY291bnRGaWVsZC5zZXRWYWx1ZSh7XHJcbiAgICAgICAgQWNjb3VudElkOiBhY2NvdW50RW50cnkuJGtleSxcclxuICAgICAgICBBY2NvdW50TmFtZTogYWNjb3VudEVudHJ5LkFjY291bnROYW1lLFxyXG4gICAgICB9KTtcclxuICAgICAgdGhpcy5vbkFjY291bnRDaGFuZ2UoYWNjb3VudEZpZWxkLmdldFZhbHVlKCksIGFjY291bnRGaWVsZCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gdG9kbzogZmluZCBhIGdvb2Qgd2F5IHRvIGdldCB0aGUgcHJpbWFyeSBjb250YWN0IGFuZCBhcHBseVxyXG4gIH0sXHJcbiAgYXBwbHlDb250YWN0Q29udGV4dDogZnVuY3Rpb24gYXBwbHlDb250YWN0Q29udGV4dChjb250ZXh0KSB7XHJcbiAgICBjb25zdCBjb250YWN0RmllbGQgPSB0aGlzLmZpZWxkcy5Db250YWN0O1xyXG4gICAgbGV0IGFjY291bnRFbnRyeTtcclxuICAgIGNvbnRhY3RGaWVsZC5zZXRWYWx1ZSh7XHJcbiAgICAgIENvbnRhY3RJZDogY29udGV4dC5rZXksXHJcbiAgICAgIENvbnRhY3ROYW1lOiBjb250ZXh0LmRlc2NyaXB0b3IsXHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLm9uQWNjb3VudERlcGVuZGVudENoYW5nZShjb250YWN0RmllbGQuZ2V0VmFsdWUoKSwgY29udGFjdEZpZWxkKTtcclxuXHJcbiAgICBpZiAoY29udGV4dC5lbnRyeSAmJiBjb250ZXh0LmVudHJ5LkFjY291bnQpIHtcclxuICAgICAgYWNjb3VudEVudHJ5ID0gY29udGV4dC5lbnRyeS5BY2NvdW50O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc3QgdmlldyA9IEFwcC5nZXRWaWV3KGNvbnRleHQuaWQpO1xyXG4gICAgICBjb25zdCBlbnRyeSA9IHZpZXcgJiYgdmlldy5lbnRyeTtcclxuICAgICAgYWNjb3VudEVudHJ5ID0gZW50cnkgJiYgZW50cnkuQWNjb3VudDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoYWNjb3VudEVudHJ5KSB7XHJcbiAgICAgIGNvbnN0IGFjY291bnRGaWVsZCA9IHRoaXMuZmllbGRzLkFjY291bnQ7XHJcbiAgICAgIGFjY291bnRGaWVsZC5zZXRWYWx1ZSh7XHJcbiAgICAgICAgQWNjb3VudElkOiBhY2NvdW50RW50cnkuJGtleSxcclxuICAgICAgICBBY2NvdW50TmFtZTogYWNjb3VudEVudHJ5LkFjY291bnROYW1lLFxyXG4gICAgICB9KTtcclxuICAgICAgdGhpcy5vbkFjY291bnRDaGFuZ2UoYWNjb3VudEZpZWxkLmdldFZhbHVlKCksIGFjY291bnRGaWVsZCk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBhcHBseVRpY2tldENvbnRleHQ6IGZ1bmN0aW9uIGFwcGx5VGlja2V0Q29udGV4dChjb250ZXh0KSB7XHJcbiAgICBjb25zdCB0aWNrZXRGaWVsZCA9IHRoaXMuZmllbGRzLlRpY2tldDtcclxuICAgIGxldCBhY2NvdW50RW50cnk7XHJcbiAgICBsZXQgY29udGFjdEVudHJ5O1xyXG4gICAgdGlja2V0RmllbGQuc2V0VmFsdWUoe1xyXG4gICAgICBUaWNrZXRJZDogY29udGV4dC5rZXksXHJcbiAgICAgIFRpY2tldE51bWJlcjogY29udGV4dC5kZXNjcmlwdG9yLFxyXG4gICAgfSk7XHJcbiAgICB0aGlzLm9uQWNjb3VudERlcGVuZGVudENoYW5nZSh0aWNrZXRGaWVsZC5nZXRWYWx1ZSgpLCB0aWNrZXRGaWVsZCk7XHJcblxyXG4gICAgaWYgKGNvbnRleHQuZW50cnkgJiYgY29udGV4dC5lbnRyeS5BY2NvdW50KSB7XHJcbiAgICAgIGFjY291bnRFbnRyeSA9IGNvbnRleHQuZW50cnkuQWNjb3VudDtcclxuICAgICAgY29udGFjdEVudHJ5ID0gY29udGV4dC5lbnRyeS5Db250YWN0O1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgY29uc3QgdmlldyA9IEFwcC5nZXRWaWV3KGNvbnRleHQuaWQpO1xyXG4gICAgICBjb25zdCBlbnRyeSA9IHZpZXcgJiYgdmlldy5lbnRyeTtcclxuICAgICAgYWNjb3VudEVudHJ5ID0gZW50cnkgJiYgZW50cnkuQWNjb3VudDtcclxuICAgICAgY29udGFjdEVudHJ5ID0gZW50cnkgJiYgZW50cnkuQ29udGFjdDtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoYWNjb3VudEVudHJ5KSB7XHJcbiAgICAgIGNvbnN0IGFjY291bnRGaWVsZCA9IHRoaXMuZmllbGRzLkFjY291bnQ7XHJcbiAgICAgIGFjY291bnRGaWVsZC5zZXRWYWx1ZSh7XHJcbiAgICAgICAgQWNjb3VudElkOiBhY2NvdW50RW50cnkuJGtleSxcclxuICAgICAgICBBY2NvdW50TmFtZTogYWNjb3VudEVudHJ5LkFjY291bnROYW1lLFxyXG4gICAgICB9KTtcclxuICAgICAgdGhpcy5vbkFjY291bnRDaGFuZ2UoYWNjb3VudEZpZWxkLmdldFZhbHVlKCksIGFjY291bnRGaWVsZCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGNvbnRhY3RFbnRyeSkge1xyXG4gICAgICBjb25zdCBjb250YWN0RmllbGQgPSB0aGlzLmZpZWxkcy5Db250YWN0O1xyXG4gICAgICBjb250YWN0RmllbGQuc2V0VmFsdWUoe1xyXG4gICAgICAgIENvbnRhY3RJZDogY29udGFjdEVudHJ5LiRrZXksXHJcbiAgICAgICAgQ29udGFjdE5hbWU6IGNvbnRhY3RFbnRyeS5OYW1lTEYsXHJcbiAgICAgIH0pO1xyXG4gICAgICB0aGlzLm9uQWNjb3VudERlcGVuZGVudENoYW5nZShjb250YWN0RmllbGQuZ2V0VmFsdWUoKSwgY29udGFjdEZpZWxkKTtcclxuICAgIH1cclxuICB9LFxyXG4gIG9uUmVmcmVzaEluc2VydDogZnVuY3Rpb24gb25SZWZyZXNoSW5zZXJ0KCkge1xyXG4gICAgaWYgKHRoaXMub3B0aW9ucy5mcm9tT2ZmbGluZSkge1xyXG4gICAgICB0aGlzLnNldE9mZmxpbmVOb3RlRGF0YSgpO1xyXG4gICAgICAkKHRoaXMuZG9tTm9kZSkucmVtb3ZlQ2xhc3MoJ3BhbmVsLWxvYWRpbmcnKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuaW5oZXJpdGVkKGFyZ3VtZW50cyk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBzZXRWYWx1ZXM6IGZ1bmN0aW9uIHNldFZhbHVlcyh2YWx1ZXMpIHtcclxuICAgIHRoaXMuaW5oZXJpdGVkKGFyZ3VtZW50cyk7XHJcbiAgICBjb25zdCBpc0xlYWRGaWVsZCA9IHRoaXMuZmllbGRzLklzTGVhZDtcclxuICAgIGlmICh0aGlzLmlzSW5MZWFkQ29udGV4dCgpKSB7XHJcbiAgICAgIGlzTGVhZEZpZWxkLnNldFZhbHVlKHRydWUpO1xyXG4gICAgICB0aGlzLm9uSXNMZWFkQ2hhbmdlKHRydWUsIGlzTGVhZEZpZWxkKTtcclxuICAgICAgY29uc3QgZmllbGQgPSB0aGlzLmZpZWxkcy5MZWFkO1xyXG4gICAgICBjb25zdCB2YWx1ZSA9IHV0aWxpdHkuZ2V0VmFsdWUodmFsdWVzLCBmaWVsZC5hcHBseVRvLCB7fSk7XHJcbiAgICAgIGZpZWxkLnNldFZhbHVlKHZhbHVlLCAhdGhpcy5pbnNlcnRpbmcpO1xyXG4gICAgICBjb25zdCBsZWFkQ29tcGFueSA9IHV0aWxpdHkuZ2V0VmFsdWUodmFsdWVzLCAnQWNjb3VudE5hbWUnKTtcclxuICAgICAgaWYgKGxlYWRDb21wYW55KSB7XHJcbiAgICAgICAgdGhpcy5maWVsZHMuQWNjb3VudE5hbWUuc2V0VmFsdWUobGVhZENvbXBhbnkpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpc0xlYWRGaWVsZC5zZXRWYWx1ZShmYWxzZSk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgbG9uZ05vdGVzID0gdXRpbGl0eS5nZXRWYWx1ZSh2YWx1ZXMsICdMb25nTm90ZXMnKTtcclxuICAgIGlmIChsb25nTm90ZXMpIHtcclxuICAgICAgdGhpcy5maWVsZHMuVGV4dC5zZXRWYWx1ZShsb25nTm90ZXMpO1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IGluc2VydCA9IHRoaXMub3B0aW9ucyAmJiB0aGlzLm9wdGlvbnMuaW5zZXJ0O1xyXG4gICAgdGhpcy5jb250ZXh0ID0gdGhpcy5fZ2V0TmF2Q29udGV4dCgpO1xyXG4gICAgLy8gZW50cnkgbWF5IGhhdmUgYmVlbiBwYXNzZWQgYXMgZnVsbCBlbnRyeSwgcmVhcHBseSBjb250ZXh0IGxvZ2ljIHRvIGV4dHJhY3QgcHJvcGVydGllc1xyXG4gICAgaWYgKGluc2VydCAmJiB0aGlzLmNvbnRleHQgJiYgdGhpcy5jb250ZXh0LnJlc291cmNlS2luZCkge1xyXG4gICAgICBjb25zdCBsb29rdXAgPSB7XHJcbiAgICAgICAgYWNjb3VudHM6IHRoaXMuYXBwbHlBY2NvdW50Q29udGV4dCxcclxuICAgICAgICBjb250YWN0czogdGhpcy5hcHBseUNvbnRhY3RDb250ZXh0LFxyXG4gICAgICAgIG9wcG9ydHVuaXRpZXM6IHRoaXMuYXBwbHlPcHBvcnR1bml0eUNvbnRleHQsXHJcbiAgICAgICAgbGVhZHM6IHRoaXMuYXBwbHlMZWFkQ29udGV4dCxcclxuICAgICAgICB0aWNrZXRzOiB0aGlzLmFwcGx5VGlja2V0Q29udGV4dCxcclxuICAgICAgfTtcclxuICAgICAgbG9va3VwW3RoaXMuY29udGV4dC5yZXNvdXJjZUtpbmRdLmNhbGwodGhpcywgdGhpcy5jb250ZXh0KTtcclxuICAgIH1cclxuICAgIHRoaXMuZW5hYmxlRmllbGRzKCk7XHJcbiAgICBjb25zdCBkZW55RWRpdCA9ICF0aGlzLmN1cnJlbnRVc2VyQ2FuRWRpdCgpO1xyXG4gICAgaWYgKGRlbnlFZGl0KSB7XHJcbiAgICAgIHRoaXMuZGlzYWJsZUZpZWxkcygpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgZGlzYWJsZUZpZWxkczogZnVuY3Rpb24gZGlzYWJsZUZpZWxkcyhwcmVkaWNhdGUpIHtcclxuICAgIGZvciAoY29uc3QgbmFtZSBpbiB0aGlzLmZpZWxkcykge1xyXG4gICAgICBpZiAoIXByZWRpY2F0ZSB8fCBwcmVkaWNhdGUodGhpcy5maWVsZHNbbmFtZV0pKSB7XHJcbiAgICAgICAgdGhpcy5maWVsZHNbbmFtZV0uZGlzYWJsZSgpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICBlbmFibGVGaWVsZHM6IGZ1bmN0aW9uIGVuYWJsZUZpZWxkcyhwcmVkaWNhdGUpIHtcclxuICAgIGZvciAoY29uc3QgbmFtZSBpbiB0aGlzLmZpZWxkcykge1xyXG4gICAgICBpZiAoIXByZWRpY2F0ZSB8fCBwcmVkaWNhdGUodGhpcy5maWVsZHNbbmFtZV0pKSB7XHJcbiAgICAgICAgdGhpcy5maWVsZHNbbmFtZV0uZW5hYmxlKCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIGN1cnJlbnRVc2VyQ2FuRWRpdDogZnVuY3Rpb24gY3VycmVudFVzZXJDYW5FZGl0KCkge1xyXG4gICAgY29uc3QgZW50cnkgPSB0aGlzLm9wdGlvbnMuZW50cnkgfHwgdGhpcy5lbnRyeTtcclxuICAgIGNvbnN0IGluc2VydCA9IHRoaXMub3B0aW9ucyAmJiB0aGlzLm9wdGlvbnMuaW5zZXJ0O1xyXG4gICAgaWYgKCFpbnNlcnQpIHtcclxuICAgICAgaWYgKEFwcC5jb250ZXh0LnVzZXIuJGtleSA9PT0gJ0FETUlOJykge1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBlbnRyeSAmJiAoZW50cnkuVXNlcklkID09PSBBcHAuY29udGV4dC51c2VyLiRrZXkpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfSxcclxuICBmb3JtYXREZXBlbmRlbnRRdWVyeTogZnVuY3Rpb24gZm9ybWF0RGVwZW5kZW50UXVlcnkoZGVwZW5kZW50VmFsdWUsIGZvcm1hdCwgcHJvcGVydHkpIHtcclxuICAgIGNvbnN0IHRoZVByb3BlcnR5ID0gcHJvcGVydHkgfHwgJyRrZXknO1xyXG4gICAgY29uc3QgcHJvcGVydHlWYWx1ZSA9IHV0aWxpdHkuZ2V0VmFsdWUoZGVwZW5kZW50VmFsdWUsIHRoZVByb3BlcnR5KTtcclxuICAgIGlmIChwcm9wZXJ0eVZhbHVlKSB7XHJcbiAgICAgIHJldHVybiBzdHJpbmcuc3Vic3RpdHV0ZShmb3JtYXQsIFtwcm9wZXJ0eVZhbHVlXSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gJyc7XHJcbiAgfSxcclxuICBnZXRWYWx1ZXM6IGZ1bmN0aW9uIGdldFZhbHVlcygpIHtcclxuICAgIGxldCB2YWx1ZXMgPSB0aGlzLmluaGVyaXRlZChhcmd1bWVudHMpO1xyXG5cclxuICAgIGlmICh0aGlzLmZpZWxkcy5UZXh0LmlzRGlydHkoKSkge1xyXG4gICAgICBjb25zdCB0ZXh0ID0gdGhpcy5maWVsZHMuVGV4dC5nZXRWYWx1ZSgpO1xyXG5cclxuICAgICAgdmFsdWVzID0gdmFsdWVzIHx8IHt9O1xyXG4gICAgICB2YWx1ZXMuTG9uZ05vdGVzID0gdGV4dDtcclxuICAgICAgdmFsdWVzLk5vdGVzID0gdGV4dCAmJiB0ZXh0Lmxlbmd0aCA+IDI1MCA/IHRleHQuc3Vic3RyKDAsIDI1MCkgOiB0ZXh0O1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB2YWx1ZXM7XHJcbiAgfSxcclxuICBfbG9va3VwQXBwbHlUbzogZnVuY3Rpb24gX2xvb2t1cEFwcGx5VG8ocGF5bG9hZCwgdmFsdWUpIHtcclxuICAgIGlmICh2YWx1ZSA9PT0gbnVsbCkge1xyXG4gICAgICBwYXlsb2FkW3RoaXMudmFsdWVLZXlQcm9wZXJ0eV0gPSBudWxsO1xyXG4gICAgICBwYXlsb2FkW3RoaXMudmFsdWVUZXh0UHJvcGVydHldID0gbnVsbDtcclxuICAgIH1cclxuICB9LFxyXG4gIGNyZWF0ZUxheW91dDogZnVuY3Rpb24gY3JlYXRlTGF5b3V0KCkge1xyXG4gICAgcmV0dXJuIHRoaXMubGF5b3V0IHx8ICh0aGlzLmxheW91dCA9IFt7XHJcbiAgICAgIHRpdGxlOiB0aGlzLmxvbmdOb3Rlc1RpdGxlVGV4dCxcclxuICAgICAgbmFtZTogJ05vdGVzU2VjdGlvbicsXHJcbiAgICAgIGNoaWxkcmVuOiBbe1xyXG4gICAgICAgIG5hbWU6ICdUZXh0JyxcclxuICAgICAgICBwcm9wZXJ0eTogJ1RleHQnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLmxvbmdOb3Rlc1RleHQsXHJcbiAgICAgICAgY2xzOiAncm93LWVkaXQtdGV4dCcsXHJcbiAgICAgICAgdHlwZTogJ3RleHRhcmVhJyxcclxuICAgICAgICBhdXRvRm9jdXM6IHRydWUsXHJcbiAgICAgIH1dLFxyXG4gICAgfSwge1xyXG4gICAgICB0aXRsZTogdGhpcy5kZXRhaWxzVGV4dCxcclxuICAgICAgbmFtZTogJ0RldGFpbHNTZWN0aW9uJyxcclxuICAgICAgY2hpbGRyZW46IFt7XHJcbiAgICAgICAgbmFtZTogJ1R5cGUnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnVHlwZScsXHJcbiAgICAgICAgdHlwZTogJ2hpZGRlbicsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnVXNlcklkJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ1VzZXJJZCcsXHJcbiAgICAgICAgdHlwZTogJ2hpZGRlbicsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnVXNlck5hbWUnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnVXNlck5hbWUnLFxyXG4gICAgICAgIHR5cGU6ICdoaWRkZW4nLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbGFiZWw6IHRoaXMuc3RhcnRpbmdUZXh0LFxyXG4gICAgICAgIG5hbWU6ICdTdGFydERhdGUnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnU3RhcnREYXRlJyxcclxuICAgICAgICB0eXBlOiAnZGF0ZScsXHJcbiAgICAgICAgc2hvd1RpbWVQaWNrZXI6IHRydWUsXHJcbiAgICAgICAgZGF0ZUZvcm1hdFRleHQ6IChBcHAuaXMyNEhvdXJDbG9jaygpKSA/IHRoaXMuc3RhcnRpbmdGb3JtYXRUZXh0MjQgOiB0aGlzLnN0YXJ0aW5nRm9ybWF0VGV4dCxcclxuICAgICAgICBtaW5WYWx1ZTogKG5ldyBEYXRlKDE5MDAsIDAsIDEpKSxcclxuICAgICAgICB2YWxpZGF0b3I6IFtcclxuICAgICAgICAgIHZhbGlkYXRvci5leGlzdHMsXHJcbiAgICAgICAgICB2YWxpZGF0b3IuaXNEYXRlSW5SYW5nZSxcclxuICAgICAgICBdLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgZGVwZW5kc09uOiAnVHlwZScsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMucmVnYXJkaW5nVGV4dCxcclxuICAgICAgICBuYW1lOiAnRGVzY3JpcHRpb24nLFxyXG4gICAgICAgIHByb3BlcnR5OiAnRGVzY3JpcHRpb24nLFxyXG4gICAgICAgIHBpY2tsaXN0OiAnTm90ZSBSZWdhcmRpbmcnLFxyXG4gICAgICAgIG9yZGVyQnk6ICd0ZXh0IGFzYycsXHJcbiAgICAgICAgdGl0bGU6IHRoaXMubm90ZURlc2NyaXB0aW9uVGl0bGVUZXh0LFxyXG4gICAgICAgIHR5cGU6ICdwaWNrbGlzdCcsXHJcbiAgICAgICAgbWF4VGV4dExlbmd0aDogNjQsXHJcbiAgICAgICAgdmFsaWRhdG9yOiB2YWxpZGF0b3IuZXhjZWVkc01heFRleHRMZW5ndGgsXHJcbiAgICAgIH1dLFxyXG4gICAgfSwge1xyXG4gICAgICB0aXRsZTogdGhpcy5yZWxhdGVkSXRlbXNUZXh0LFxyXG4gICAgICBuYW1lOiAnUmVsYXRlZEl0ZW1zU2VjdGlvbicsXHJcbiAgICAgIGNoaWxkcmVuOiBbe1xyXG4gICAgICAgIGxhYmVsOiB0aGlzLmlzTGVhZFRleHQsXHJcbiAgICAgICAgbmFtZTogJ0lzTGVhZCcsXHJcbiAgICAgICAgaW5jbHVkZTogZmFsc2UsXHJcbiAgICAgICAgdHlwZTogJ2Jvb2xlYW4nLFxyXG4gICAgICAgIG9uVGV4dDogdGhpcy55ZXNUZXh0LFxyXG4gICAgICAgIG9mZlRleHQ6IHRoaXMubm9UZXh0LFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbGFiZWw6IHRoaXMuYWNjb3VudFRleHQsXHJcbiAgICAgICAgbmFtZTogJ0FjY291bnQnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnQWNjb3VudCcsXHJcbiAgICAgICAgdHlwZTogJ2xvb2t1cCcsXHJcbiAgICAgICAgcmVxdWlyZVNlbGVjdGlvbjogZmFsc2UsXHJcbiAgICAgICAgZW1wdHlUZXh0OiAnJyxcclxuICAgICAgICBhcHBseVRvOiB0aGlzLl9sb29rdXBBcHBseVRvLFxyXG4gICAgICAgIHZhbHVlS2V5UHJvcGVydHk6ICdBY2NvdW50SWQnLFxyXG4gICAgICAgIHZhbHVlVGV4dFByb3BlcnR5OiAnQWNjb3VudE5hbWUnLFxyXG4gICAgICAgIHZpZXc6ICdhY2NvdW50X3JlbGF0ZWQnLFxyXG4gICAgICAgIHZhbGlkYXRvcjoge1xyXG4gICAgICAgICAgZm46IChmdW5jdGlvbiB2YWxpZGF0ZUFjY291bnQodmFsdWUsIGZpZWxkKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGluc2VydCA9IGZpZWxkLm93bmVyLm9wdGlvbnMgJiYgZmllbGQub3duZXIub3B0aW9ucy5pbnNlcnQ7XHJcbiAgICAgICAgICAgIGlmICgoaW5zZXJ0KSAmJiAoIXZhbHVlKSkge1xyXG4gICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgIH0pLmJpbmREZWxlZ2F0ZSh0aGlzKSxcclxuICAgICAgICAgIG1lc3NhZ2U6IHRoaXMudmFsaWRhdGlvblRleHQsXHJcbiAgICAgICAgfSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIGRlcGVuZHNPbjogJ0FjY291bnQnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLmNvbnRhY3RUZXh0LFxyXG4gICAgICAgIG5hbWU6ICdDb250YWN0JyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0NvbnRhY3QnLFxyXG4gICAgICAgIHR5cGU6ICdsb29rdXAnLFxyXG4gICAgICAgIHJlcXVpcmVTZWxlY3Rpb246IGZhbHNlLFxyXG4gICAgICAgIGVtcHR5VGV4dDogJycsXHJcbiAgICAgICAgYXBwbHlUbzogdGhpcy5fbG9va3VwQXBwbHlUbyxcclxuICAgICAgICB2YWx1ZUtleVByb3BlcnR5OiAnQ29udGFjdElkJyxcclxuICAgICAgICB2YWx1ZVRleHRQcm9wZXJ0eTogJ0NvbnRhY3ROYW1lJyxcclxuICAgICAgICB2aWV3OiAnY29udGFjdF9yZWxhdGVkJyxcclxuICAgICAgICB3aGVyZTogdGhpcy5mb3JtYXREZXBlbmRlbnRRdWVyeS5iaW5kRGVsZWdhdGUoXHJcbiAgICAgICAgICB0aGlzLCAnQWNjb3VudC5JZCBlcSBcIiR7MH1cIicsICdBY2NvdW50SWQnXHJcbiAgICAgICAgKSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIGRlcGVuZHNPbjogJ0FjY291bnQnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLm9wcG9ydHVuaXR5VGV4dCxcclxuICAgICAgICBuYW1lOiAnT3Bwb3J0dW5pdHknLFxyXG4gICAgICAgIHByb3BlcnR5OiAnT3Bwb3J0dW5pdHknLFxyXG4gICAgICAgIHR5cGU6ICdsb29rdXAnLFxyXG4gICAgICAgIHJlcXVpcmVTZWxlY3Rpb246IGZhbHNlLFxyXG4gICAgICAgIGVtcHR5VGV4dDogJycsXHJcbiAgICAgICAgYXBwbHlUbzogdGhpcy5fbG9va3VwQXBwbHlUbyxcclxuICAgICAgICB2YWx1ZUtleVByb3BlcnR5OiAnT3Bwb3J0dW5pdHlJZCcsXHJcbiAgICAgICAgdmFsdWVUZXh0UHJvcGVydHk6ICdPcHBvcnR1bml0eU5hbWUnLFxyXG4gICAgICAgIHZpZXc6ICdvcHBvcnR1bml0eV9yZWxhdGVkJyxcclxuICAgICAgICB3aGVyZTogdGhpcy5mb3JtYXREZXBlbmRlbnRRdWVyeS5iaW5kRGVsZWdhdGUoXHJcbiAgICAgICAgICB0aGlzLCAnQWNjb3VudC5JZCBlcSBcIiR7MH1cIicsICdBY2NvdW50SWQnXHJcbiAgICAgICAgKSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIGRlcGVuZHNPbjogJ0FjY291bnQnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLnRpY2tldE51bWJlclRleHQsXHJcbiAgICAgICAgbmFtZTogJ1RpY2tldCcsXHJcbiAgICAgICAgcHJvcGVydHk6ICdUaWNrZXQnLFxyXG4gICAgICAgIHR5cGU6ICdsb29rdXAnLFxyXG4gICAgICAgIHJlcXVpcmVTZWxlY3Rpb246IGZhbHNlLFxyXG4gICAgICAgIGVtcHR5VGV4dDogJycsXHJcbiAgICAgICAgYXBwbHlUbzogdGhpcy5fbG9va3VwQXBwbHlUbyxcclxuICAgICAgICB2YWx1ZUtleVByb3BlcnR5OiAnVGlja2V0SWQnLFxyXG4gICAgICAgIHZhbHVlVGV4dFByb3BlcnR5OiAnVGlja2V0TnVtYmVyJyxcclxuICAgICAgICB2aWV3OiAndGlja2V0X3JlbGF0ZWQnLFxyXG4gICAgICAgIHdoZXJlOiB0aGlzLmZvcm1hdERlcGVuZGVudFF1ZXJ5LmJpbmREZWxlZ2F0ZShcclxuICAgICAgICAgIHRoaXMsICdBY2NvdW50LklkIGVxIFwiJHswfVwiJywgJ0FjY291bnRJZCdcclxuICAgICAgICApLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbGFiZWw6IHRoaXMubGVhZFRleHQsXHJcbiAgICAgICAgbmFtZTogJ0xlYWQnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnTGVhZCcsXHJcbiAgICAgICAgdHlwZTogJ2xvb2t1cCcsXHJcbiAgICAgICAgcmVxdWlyZVNlbGVjdGlvbjogZmFsc2UsXHJcbiAgICAgICAgZW1wdHlUZXh0OiAnJyxcclxuICAgICAgICBhcHBseVRvOiB0aGlzLl9sb29rdXBBcHBseVRvLFxyXG4gICAgICAgIHZhbHVlS2V5UHJvcGVydHk6ICdMZWFkSWQnLFxyXG4gICAgICAgIHZhbHVlVGV4dFByb3BlcnR5OiAnTGVhZE5hbWUnLFxyXG4gICAgICAgIHZpZXc6ICdsZWFkX3JlbGF0ZWQnLFxyXG4gICAgICAgIHZhbGlkYXRvcjogdmFsaWRhdG9yLmV4aXN0cyxcclxuICAgICAgfSwge1xyXG4gICAgICAgIGxhYmVsOiB0aGlzLmNvbXBhbnlUZXh0LFxyXG4gICAgICAgIG5hbWU6ICdBY2NvdW50TmFtZScsXHJcbiAgICAgICAgcHJvcGVydHk6ICdBY2NvdW50TmFtZScsXHJcbiAgICAgICAgdHlwZTogJ3RleHQnLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbGFiZWw6ICdVc2VySWQnLFxyXG4gICAgICAgIG5hbWU6ICdVc2VySWQnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnVXNlcklkJyxcclxuICAgICAgICB0eXBlOiAnaGlkZGVuJyxcclxuICAgICAgICB2YWxpZGF0b3I6IHtcclxuICAgICAgICAgIGZuOiAoZnVuY3Rpb24gdmFsaWRhdGVVc2VySWQodmFsdWUsIGZpZWxkKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNhbkVkaXQgPSBmaWVsZC5vd25lci5jdXJyZW50VXNlckNhbkVkaXQoKTtcclxuICAgICAgICAgICAgaWYgKCFjYW5FZGl0KSB7XHJcbiAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgfSkuYmluZERlbGVnYXRlKHRoaXMpLFxyXG4gICAgICAgICAgbWVzc2FnZTogdGhpcy52YWxpZGF0aW9uQ2FuRWRpdFRleHQsXHJcbiAgICAgICAgfSxcclxuICAgICAgfV0sXHJcbiAgICB9XSk7XHJcbiAgfSxcclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBfX2NsYXNzO1xyXG4iXX0=
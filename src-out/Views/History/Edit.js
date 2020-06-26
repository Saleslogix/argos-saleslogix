define("crm/Views/History/Edit", ["exports", "dojo/_base/declare", "dojo/string", "../../Environment", "../../Validator", "argos/Utility", "argos/Edit", "argos/I18n"], function (_exports, _declare, _string, _Environment, _Validator, _Utility, _Edit, _I18n) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports["default"] = void 0;
  _declare = _interopRequireDefault(_declare);
  _string = _interopRequireDefault(_string);
  _Environment = _interopRequireDefault(_Environment);
  _Validator = _interopRequireDefault(_Validator);
  _Utility = _interopRequireDefault(_Utility);
  _Edit = _interopRequireDefault(_Edit);
  _I18n = _interopRequireDefault(_I18n);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

  /* Copyright 2017 Infor
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
  var resource = (0, _I18n["default"])('historyEdit');
  var dtFormatResource = (0, _I18n["default"])('historyEditDateTimeFormat');

  var __class = (0, _declare["default"])('crm.Views.History.Edit', [_Edit["default"]], {
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
    insertSecurity: null,
    // 'Entities/History/Add',
    updateSecurity: null,
    // 'Entities/History/Edit',
    querySelect: ['AccountId', 'AccountName', 'Category', 'ModifyDate', 'CompletedDate', 'ContactId', 'ContactName', 'CompletedUser', 'Description', 'Duration', 'Notes', 'LongNotes', 'OpportunityId', 'OpportunityName', 'Priority', 'StartDate', 'TicketId', 'TicketNumber', 'LeadId', 'LeadName', 'Timeless', 'Type', 'UserName', 'UserId'],
    queryInclude: ['$permissions'],
    existsRE: /^[\w]{12}$/,
    init: function init() {
      this.inherited(init, arguments);
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
      this.inherited(beforeTransitionTo, arguments); // we hide the lead or standard fields here, as the view is currently hidden, in order to prevent flashing.
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
      var base = this.inherited(_buildRefreshMessage, arguments);
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
        this.fields.AccountName.setValue(_Utility["default"].getValue(selection, 'Company'));
      }
    },
    onAccountChange: function onAccountChange(value) {
      var fields = this.fields;
      ['Contact', 'Opportunity', 'Ticket'].forEach(function (f) {
        if (value) {
          fields[f].dependsOn = 'Account';
          fields[f].where = "Account.Id eq \"".concat(value.AccountId || value.key, "\"");

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
      _Environment["default"].refreshStaleDetailViews();

      this.inherited(onInsertSuccess, arguments);
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
        return /^(accounts|contacts|opportunities|leads|tickets)$/.test(context.resourceKind) && context.key;
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
      var accountEntry;
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
      } // todo: find a good way to get the primary contact and apply

    },
    applyContactContext: function applyContactContext(context) {
      var contactField = this.fields.Contact;
      var accountEntry;
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
      var accountEntry;
      var contactEntry;
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
        this.inherited(onRefreshInsert, arguments);
      }
    },
    setValues: function setValues(values) {
      this.inherited(setValues, arguments);
      var isLeadField = this.fields.IsLead;

      if (this.isInLeadContext()) {
        isLeadField.setValue(true);
        this.onIsLeadChange(true, isLeadField);
        var field = this.fields.Lead;

        var value = _Utility["default"].getValue(values, field.applyTo, {});

        field.setValue(value, !this.inserting);

        var leadCompany = _Utility["default"].getValue(values, 'AccountName');

        if (leadCompany) {
          this.fields.AccountName.setValue(leadCompany);
        }
      } else {
        isLeadField.setValue(false);
      }

      var longNotes = _Utility["default"].getValue(values, 'LongNotes');

      if (longNotes) {
        this.fields.Text.setValue(longNotes);
      }

      var insert = this.options && this.options.insert;
      this.context = this._getNavContext(); // entry may have been passed as full entry, reapply context logic to extract properties

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

      var propertyValue = _Utility["default"].getValue(dependentValue, theProperty);

      if (propertyValue) {
        return _string["default"].substitute(format, [propertyValue]);
      }

      return '';
    },
    getValues: function getValues() {
      var values = this.inherited(getValues, arguments);

      if (this.fields.Text.isDirty()) {
        var text = this.fields.Text.getValue();
        values = values || {};
        values.LongNotes = text;
        values.Notes = text && text.length > 250 ? text.substr(0, 250) : text;
      }

      if (this.fields.IsLead.getValue() === false) {
        values.LeadId = null;
        values.LeadName = null;
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
          validator: [_Validator["default"].exists, _Validator["default"].isDateInRange]
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
          validator: _Validator["default"].exceedsMaxTextLength
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
          validator: _Validator["default"].exists
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

  var _default = __class;
  _exports["default"] = _default;
});
define("crm/Views/Ticket/Edit", ["exports", "dojo/_base/declare", "dojo/_base/lang", "../../Format", "../../Validator", "argos/ErrorManager", "argos/Edit", "argos/I18n"], function (_exports, _declare, _lang, _Format, _Validator, _ErrorManager, _Edit, _I18n) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports["default"] = void 0;
  _declare = _interopRequireDefault(_declare);
  _lang = _interopRequireDefault(_lang);
  _Format = _interopRequireDefault(_Format);
  _Validator = _interopRequireDefault(_Validator);
  _ErrorManager = _interopRequireDefault(_ErrorManager);
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
  var resource = (0, _I18n["default"])('ticketEdit');

  var __class = (0, _declare["default"])('crm.Views.Ticket.Edit', [_Edit["default"]], {
    // Localization
    accountText: resource.accountText,
    areaText: resource.areaText,
    assignedDateText: resource.assignedDateText,
    assignedToText: resource.assignedToText,
    categoryText: resource.categoryText,
    contactText: resource.contactText,
    contractText: resource.contractText,
    descriptionText: resource.descriptionText,
    descriptionTitleText: resource.descriptionTitleText,
    issueText: resource.issueText,
    needByText: resource.needByText,
    notesText: resource.notesText,
    notesTitleText: resource.notesTitleText,
    phoneText: resource.phoneText,
    relatedActivitiesText: resource.relatedActivitiesText,
    relatedItemsText: resource.relatedItemsText,
    resolutionText: resource.resolutionText,
    resolutionTitleText: resource.resolutionTitleText,
    sourceText: resource.sourceText,
    sourceTitleText: resource.sourceTitleText,
    statusText: resource.statusText,
    subjectText: resource.subjectText,
    ticketAreaTitleText: resource.ticketAreaTitleText,
    ticketCategoryTitleText: resource.ticketCategoryTitleText,
    ticketIdText: resource.ticketIdText,
    ticketIssueTitleText: resource.ticketIssueTitleText,
    ticketStatusTitleText: resource.ticketStatusTitleText,
    ticketUrgencyTitleText: resource.ticketUrgencyTitleText,
    titleText: resource.titleText,
    urgencyText: resource.urgencyText,
    // View Properties
    entityName: 'Ticket',
    id: 'ticket_edit',
    insertSecurity: 'Entities/Ticket/Add',
    updateSecurity: 'Entities/Ticket/Edit',
    querySelect: ['Account/AccountName', 'Account/MainPhone', 'Area', 'AssignedDate', 'AssignedTo/OwnerDescription', 'Category', 'Contact/NameLF', 'Contact/WorkPhone', 'Contract/ReferenceNumber', 'Issue', 'NeededByDate', 'Notes', 'ViaCode', 'StatusCode', 'UrgencyCode', 'Subject', 'TicketNumber', 'TicketProblem/Notes', 'TicketSolution/Notes', 'Urgency/Description', 'Urgency/UrgencyCode', 'CompletedBy/OwnerDescription'],
    queryInclude: ['$permissions'],
    resourceKind: 'tickets',
    init: function init() {
      this.inherited(init, arguments);
      this.connect(this.fields.Account, 'onChange', this.onAccountChange);
      this.connect(this.fields.Contact, 'onChange', this.onContactChange);
      this.connect(this.fields.Urgency, 'onChange', this.onUrgencyChange);
      this.connect(this.fields.Area, 'onChange', this.onAreaChange);
      this.connect(this.fields.Category, 'onChange', this.onCategoryChange);
    },
    convertEntry: function convertEntry() {
      var entry = this.inherited(convertEntry, arguments);

      if (!this.options.entry) {
        if (entry.StatusCode) {
          this.requestCodeData('name eq "Ticket Status"', entry.StatusCode, this.fields.StatusCode, entry, 'Status');
        }

        if (entry.ViaCode) {
          this.requestCodeData('name eq "Source"', entry.ViaCode, this.fields.ViaCode, entry, 'SourceText');
        }
      }

      return entry;
    },
    processTemplateEntry: function processTemplateEntry(entry) {
      this.inherited(processTemplateEntry, arguments);

      if (entry.StatusCode) {
        this.requestCodeData('name eq "Ticket Status"', entry.StatusCode, this.fields.StatusCode, entry, 'Status');
      }
    },
    createPicklistRequest: function createPicklistRequest(name) {
      var request = new Sage.SData.Client.SDataResourceCollectionRequest(App.getService()).setResourceKind('picklists').setContractName('system');
      var uri = request.getUri();
      uri.setPathSegment(Sage.SData.Client.SDataUri.ResourcePropertyIndex, 'items');
      uri.setCollectionPredicate(name);
      request.allowCacheUse = true;
      return request;
    },
    requestCodeData: function requestCodeData(picklistName, code, field, entry, name) {
      var request = this.createPicklistRequest(picklistName);
      request.read({
        success: _lang["default"].hitch(this, this.onRequestCodeDataSuccess, code, field, entry, name),
        failure: this.onRequestCodeDataFailure,
        scope: this
      });
    },
    onRequestCodeDataSuccess: function onRequestCodeDataSuccess(code, field, entry, name, feed) {
      var value = this.processCodeDataFeed(feed, code);
      entry[name] = value;
      field.setValue(code);
      field.setText(value);
    },
    onRequestCodeDataFailure: function onRequestCodeDataFailure(response, o) {
      _ErrorManager["default"].addError(response, o, this.options, 'failure');
    },
    processCodeDataFeed: function processCodeDataFeed(feed, currentValue, options) {
      var keyProperty = options && options.keyProperty ? options.keyProperty : '$key';
      var textProperty = options && options.textProperty ? options.textProperty : 'text';

      for (var i = 0; i < feed.$resources.length; i++) {
        if (feed.$resources[i][keyProperty] === currentValue) {
          return feed.$resources[i][textProperty];
        }
      }

      return currentValue;
    },
    setValues: function setValues(entry) {
      this.inherited(setValues, arguments);

      if (entry.SourceText) {
        this.fields.ViaCode.setText(entry.SourceText);
      }

      if (entry.Status) {
        this.fields.StatusCode.setText(entry.Status);
      }
    },
    onUrgencyChange: function onUrgencyChange(value, field) {
      var selection = field.getSelection();

      if (selection) {
        this.fields.UrgencyCode.setValue(selection.UrgencyCode);
      }
    },
    onContactChange: function onContactChange(value, field) {
      var selection = field.getSelection();
      var accountField = this.fields.Account;

      if (selection && selection.Account && !accountField.getValue()) {
        accountField.setValue({
          $key: selection.Account.$key,
          AccountName: selection.Account.AccountName
        });
      }
    },
    onAccountChange: function onAccountChange(value, field) {
      var selection = field.getSelection();

      if (selection && selection.$key) {
        var request = new Sage.SData.Client.SDataResourcePropertyRequest(this.getService()).setResourceKind('accounts').setResourceSelector("'".concat(selection.$key, "'")).setResourceProperty('Contacts').setQueryArg('count', 1).setQueryArg('select', 'NameLF').setQueryArg('where', 'IsPrimary eq true');
        request.readFeed({
          success: function success(feed) {
            if (feed && feed.$resources) {
              this.fields.Contact.setValue(feed.$resources[0]);
            }
          },
          failure: function failure() {},
          scope: this
        });
      }
    },
    onAreaChange: function onAreaChange() {
      this.fields.Issue.clearValue();
      this.fields.Category.clearValue();
    },
    onCategoryChange: function onCategoryChange() {
      this.fields.Issue.clearValue();
    },
    formatAccountQuery: function formatAccountQuery() {
      var value = this.fields.Account.getValue();
      var key = value && value.$key;
      return key ? "Account.id eq \"".concat(key, "\"") : false;
    },
    applyContext: function applyContext() {
      var found = App.queryNavigationContext(function (o) {
        return /^(accounts|contacts)$/.test(o.resourceKind) && o.key;
      });
      var lookup = {
        accounts: this.applyAccountContext,
        contacts: this.applyContactContext
      };

      if (found && lookup[found.resourceKind]) {
        lookup[found.resourceKind].call(this, found);
      }
    },
    applyAccountContext: function applyAccountContext(context) {
      var view = App.getView(context.id);
      var entry = view && view.entry;
      var accountField = this.fields.Account;
      accountField.setValue(entry);
      this.onAccountChange(entry, accountField);
    },
    applyContactContext: function applyContactContext(context) {
      var view = App.getView(context.id);
      var entry = view && view.entry;
      var accountField = this.fields.Account;
      accountField.setValue(entry.Account);
      this.onAccountChange(entry.Account, accountField);
      this.fields.Contact.setValue(entry);
    },
    formatCategoryQuery: function formatCategoryQuery(value) {
      return {
        Area: value // dependent value

      };
    },
    formatIssueQuery: function formatIssueQuery(value) {
      return {
        Area: this.fields.Area.getValue(),
        Category: value // dependent value

      };
    },
    includeIfValueExists: function includeIfValueExists(value) {
      return value;
    },
    createLayout: function createLayout() {
      return this.layout || (this.layout = [{
        label: this.accountText,
        name: 'Account',
        property: 'Account',
        textProperty: 'AccountName',
        type: 'lookup',
        requireSelection: true,
        validator: _Validator["default"].exists,
        view: 'account_related'
      }, {
        label: this.contactText,
        name: 'Contact',
        property: 'Contact',
        textProperty: 'NameLF',
        type: 'lookup',
        requireSelection: true,
        validator: _Validator["default"].exists,
        view: 'contact_related',
        where: this.formatAccountQuery.bindDelegate(this)
      }, {
        label: this.contractText,
        name: 'Contract',
        property: 'Contract',
        textProperty: 'ReferenceNumber',
        type: 'lookup',
        requireSelection: true,
        view: 'contract_related',
        where: this.formatAccountQuery.bindDelegate(this)
      }, {
        label: this.areaText,
        name: 'Area',
        property: 'Area',
        title: this.ticketAreaTitleText,
        type: 'lookup',
        requireSelection: true,
        valueKeyProperty: false,
        valueTextProperty: false,
        view: 'areacategoryissue_lookup'
      }, {
        label: this.categoryText,
        name: 'Category',
        property: 'Category',
        title: this.ticketCategoryTitleText,
        type: 'lookup',
        requireSelection: true,
        dependsOn: 'Area',
        valueKeyProperty: false,
        valueTextProperty: false,
        where: this.formatCategoryQuery.bindDelegate(this),
        view: 'areacategoryissue_lookup'
      }, {
        label: this.issueText,
        name: 'Issue',
        property: 'Issue',
        title: this.ticketIssueTitleText,
        type: 'lookup',
        requireSelection: true,
        dependsOn: 'Category',
        valueKeyProperty: false,
        valueTextProperty: false,
        where: this.formatIssueQuery.bindDelegate(this),
        view: 'areacategoryissue_lookup'
      }, {
        label: this.sourceText,
        name: 'ViaCode',
        property: 'ViaCode',
        picklist: 'Source',
        requireSelection: true,
        storageMode: 'id',
        title: this.sourceTitleText,
        type: 'picklist'
      }, {
        label: this.statusText,
        name: 'StatusCode',
        property: 'StatusCode',
        picklist: 'Ticket Status',
        requireSelection: true,
        storageMode: 'id',
        title: this.ticketStatusTitleText,
        type: 'picklist'
      }, {
        name: 'UrgencyCode',
        property: 'UrgencyCode',
        type: 'hidden'
      }, {
        label: this.urgencyText,
        name: 'Urgency',
        property: 'Urgency',
        title: this.ticketUrgencyTitleText,
        requireSelection: true,
        textProperty: 'Description',
        type: 'lookup',
        view: 'urgency_list'
      }, {
        label: this.needByText,
        name: 'NeededByDate',
        property: 'NeededByDate',
        renderer: _Format["default"].date,
        type: 'date'
      }, {
        label: this.assignedDateText,
        name: 'AssignedDate',
        property: 'AssignedDate',
        renderer: _Format["default"].date,
        type: 'date'
      }, {
        label: this.assignedToText,
        name: 'AssignedTo',
        property: 'AssignedTo',
        textProperty: 'OwnerDescription',
        type: 'lookup',
        view: 'owner_list'
      }, {
        label: this.subjectText,
        name: 'Subject',
        property: 'Subject',
        type: 'text'
      }, {
        name: 'TicketProblem.$key',
        property: 'TicketProblem.$key',
        type: 'hidden',
        include: this.includeIfValueExists
      }, {
        label: this.descriptionText,
        name: 'TicketProblem.Notes',
        property: 'TicketProblem.Notes',
        title: this.descriptionTitleText,
        type: 'note',
        view: 'text_edit'
      }, {
        name: 'TicketSolution.$key',
        property: 'TicketSolution.$key',
        type: 'hidden',
        include: this.includeIfValueExists
      }, {
        label: this.resolutionText,
        name: 'TicketSolution.Notes',
        property: 'TicketSolution.Notes',
        title: this.resolutionTitleText,
        type: 'note',
        view: 'text_edit'
      }, {
        label: this.notesText,
        name: 'Notes',
        property: 'Notes',
        noteProperty: false,
        title: this.notesTitleText,
        type: 'note',
        view: 'text_edit'
      }]);
    }
  });

  var _default = __class;
  _exports["default"] = _default;
});
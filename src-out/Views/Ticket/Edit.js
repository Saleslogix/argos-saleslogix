define('crm/Views/Ticket/Edit', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', '../../Format', '../../Validator', 'argos/ErrorManager', 'argos/Edit', 'argos/I18n'], function (module, exports, _declare, _lang, _Format, _Validator, _ErrorManager, _Edit, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _lang2 = _interopRequireDefault(_lang);

  var _Format2 = _interopRequireDefault(_Format);

  var _Validator2 = _interopRequireDefault(_Validator);

  var _ErrorManager2 = _interopRequireDefault(_ErrorManager);

  var _Edit2 = _interopRequireDefault(_Edit);

  var _I18n2 = _interopRequireDefault(_I18n);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var resource = (0, _I18n2.default)('ticketEdit');

  /**
   * @class crm.Views.Ticket.Edit
   *
   * @extends argos.Edit
   *
   * @requires argos.ErrorManager
   *
   * @requires crm.Format
   * @requires crm.Validator
   */
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

  var __class = (0, _declare2.default)('crm.Views.Ticket.Edit', [_Edit2.default], {
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
        success: _lang2.default.hitch(this, this.onRequestCodeDataSuccess, code, field, entry, name),
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
      _ErrorManager2.default.addError(response, o, this.options, 'failure');
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
        var request = new Sage.SData.Client.SDataResourcePropertyRequest(this.getService()).setResourceKind('accounts').setResourceSelector('\'' + selection.$key + '\'').setResourceProperty('Contacts').setQueryArg('count', 1).setQueryArg('select', 'NameLF').setQueryArg('where', 'IsPrimary eq true');

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

      return key ? 'Account.id eq "' + key + '"' : false;
    },
    applyContext: function applyContext() {
      var found = App.queryNavigationContext(function (o) {
        return (/^(accounts|contacts)$/.test(o.resourceKind) && o.key
        );
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
        validator: _Validator2.default.exists,
        view: 'account_related'
      }, {
        label: this.contactText,
        name: 'Contact',
        property: 'Contact',
        textProperty: 'NameLF',
        type: 'lookup',
        requireSelection: true,
        validator: _Validator2.default.exists,
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
        renderer: _Format2.default.date,
        type: 'date'
      }, {
        label: this.assignedDateText,
        name: 'AssignedDate',
        property: 'AssignedDate',
        renderer: _Format2.default.date,
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

  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9WaWV3cy9UaWNrZXQvRWRpdC5qcyJdLCJuYW1lcyI6WyJyZXNvdXJjZSIsIl9fY2xhc3MiLCJhY2NvdW50VGV4dCIsImFyZWFUZXh0IiwiYXNzaWduZWREYXRlVGV4dCIsImFzc2lnbmVkVG9UZXh0IiwiY2F0ZWdvcnlUZXh0IiwiY29udGFjdFRleHQiLCJjb250cmFjdFRleHQiLCJkZXNjcmlwdGlvblRleHQiLCJkZXNjcmlwdGlvblRpdGxlVGV4dCIsImlzc3VlVGV4dCIsIm5lZWRCeVRleHQiLCJub3Rlc1RleHQiLCJub3Rlc1RpdGxlVGV4dCIsInBob25lVGV4dCIsInJlbGF0ZWRBY3Rpdml0aWVzVGV4dCIsInJlbGF0ZWRJdGVtc1RleHQiLCJyZXNvbHV0aW9uVGV4dCIsInJlc29sdXRpb25UaXRsZVRleHQiLCJzb3VyY2VUZXh0Iiwic291cmNlVGl0bGVUZXh0Iiwic3RhdHVzVGV4dCIsInN1YmplY3RUZXh0IiwidGlja2V0QXJlYVRpdGxlVGV4dCIsInRpY2tldENhdGVnb3J5VGl0bGVUZXh0IiwidGlja2V0SWRUZXh0IiwidGlja2V0SXNzdWVUaXRsZVRleHQiLCJ0aWNrZXRTdGF0dXNUaXRsZVRleHQiLCJ0aWNrZXRVcmdlbmN5VGl0bGVUZXh0IiwidGl0bGVUZXh0IiwidXJnZW5jeVRleHQiLCJlbnRpdHlOYW1lIiwiaWQiLCJpbnNlcnRTZWN1cml0eSIsInVwZGF0ZVNlY3VyaXR5IiwicXVlcnlTZWxlY3QiLCJxdWVyeUluY2x1ZGUiLCJyZXNvdXJjZUtpbmQiLCJpbml0IiwiaW5oZXJpdGVkIiwiYXJndW1lbnRzIiwiY29ubmVjdCIsImZpZWxkcyIsIkFjY291bnQiLCJvbkFjY291bnRDaGFuZ2UiLCJDb250YWN0Iiwib25Db250YWN0Q2hhbmdlIiwiVXJnZW5jeSIsIm9uVXJnZW5jeUNoYW5nZSIsIkFyZWEiLCJvbkFyZWFDaGFuZ2UiLCJDYXRlZ29yeSIsIm9uQ2F0ZWdvcnlDaGFuZ2UiLCJjb252ZXJ0RW50cnkiLCJlbnRyeSIsIm9wdGlvbnMiLCJTdGF0dXNDb2RlIiwicmVxdWVzdENvZGVEYXRhIiwiVmlhQ29kZSIsInByb2Nlc3NUZW1wbGF0ZUVudHJ5IiwiY3JlYXRlUGlja2xpc3RSZXF1ZXN0IiwibmFtZSIsInJlcXVlc3QiLCJTYWdlIiwiU0RhdGEiLCJDbGllbnQiLCJTRGF0YVJlc291cmNlQ29sbGVjdGlvblJlcXVlc3QiLCJBcHAiLCJnZXRTZXJ2aWNlIiwic2V0UmVzb3VyY2VLaW5kIiwic2V0Q29udHJhY3ROYW1lIiwidXJpIiwiZ2V0VXJpIiwic2V0UGF0aFNlZ21lbnQiLCJTRGF0YVVyaSIsIlJlc291cmNlUHJvcGVydHlJbmRleCIsInNldENvbGxlY3Rpb25QcmVkaWNhdGUiLCJhbGxvd0NhY2hlVXNlIiwicGlja2xpc3ROYW1lIiwiY29kZSIsImZpZWxkIiwicmVhZCIsInN1Y2Nlc3MiLCJoaXRjaCIsIm9uUmVxdWVzdENvZGVEYXRhU3VjY2VzcyIsImZhaWx1cmUiLCJvblJlcXVlc3RDb2RlRGF0YUZhaWx1cmUiLCJzY29wZSIsImZlZWQiLCJ2YWx1ZSIsInByb2Nlc3NDb2RlRGF0YUZlZWQiLCJzZXRWYWx1ZSIsInNldFRleHQiLCJyZXNwb25zZSIsIm8iLCJhZGRFcnJvciIsImN1cnJlbnRWYWx1ZSIsImtleVByb3BlcnR5IiwidGV4dFByb3BlcnR5IiwiaSIsIiRyZXNvdXJjZXMiLCJsZW5ndGgiLCJzZXRWYWx1ZXMiLCJTb3VyY2VUZXh0IiwiU3RhdHVzIiwic2VsZWN0aW9uIiwiZ2V0U2VsZWN0aW9uIiwiVXJnZW5jeUNvZGUiLCJhY2NvdW50RmllbGQiLCJnZXRWYWx1ZSIsIiRrZXkiLCJBY2NvdW50TmFtZSIsIlNEYXRhUmVzb3VyY2VQcm9wZXJ0eVJlcXVlc3QiLCJzZXRSZXNvdXJjZVNlbGVjdG9yIiwic2V0UmVzb3VyY2VQcm9wZXJ0eSIsInNldFF1ZXJ5QXJnIiwicmVhZEZlZWQiLCJJc3N1ZSIsImNsZWFyVmFsdWUiLCJmb3JtYXRBY2NvdW50UXVlcnkiLCJrZXkiLCJhcHBseUNvbnRleHQiLCJmb3VuZCIsInF1ZXJ5TmF2aWdhdGlvbkNvbnRleHQiLCJ0ZXN0IiwibG9va3VwIiwiYWNjb3VudHMiLCJhcHBseUFjY291bnRDb250ZXh0IiwiY29udGFjdHMiLCJhcHBseUNvbnRhY3RDb250ZXh0IiwiY2FsbCIsImNvbnRleHQiLCJ2aWV3IiwiZ2V0VmlldyIsImZvcm1hdENhdGVnb3J5UXVlcnkiLCJmb3JtYXRJc3N1ZVF1ZXJ5IiwiaW5jbHVkZUlmVmFsdWVFeGlzdHMiLCJjcmVhdGVMYXlvdXQiLCJsYXlvdXQiLCJsYWJlbCIsInByb3BlcnR5IiwidHlwZSIsInJlcXVpcmVTZWxlY3Rpb24iLCJ2YWxpZGF0b3IiLCJleGlzdHMiLCJ3aGVyZSIsImJpbmREZWxlZ2F0ZSIsInRpdGxlIiwidmFsdWVLZXlQcm9wZXJ0eSIsInZhbHVlVGV4dFByb3BlcnR5IiwiZGVwZW5kc09uIiwicGlja2xpc3QiLCJzdG9yYWdlTW9kZSIsInJlbmRlcmVyIiwiZGF0ZSIsImluY2x1ZGUiLCJub3RlUHJvcGVydHkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF1QkEsTUFBTUEsV0FBVyxvQkFBWSxZQUFaLENBQWpCOztBQUVBOzs7Ozs7Ozs7O0FBekJBOzs7Ozs7Ozs7Ozs7Ozs7QUFtQ0EsTUFBTUMsVUFBVSx1QkFBUSx1QkFBUixFQUFpQyxnQkFBakMsRUFBeUM7QUFDdkQ7QUFDQUMsaUJBQWFGLFNBQVNFLFdBRmlDO0FBR3ZEQyxjQUFVSCxTQUFTRyxRQUhvQztBQUl2REMsc0JBQWtCSixTQUFTSSxnQkFKNEI7QUFLdkRDLG9CQUFnQkwsU0FBU0ssY0FMOEI7QUFNdkRDLGtCQUFjTixTQUFTTSxZQU5nQztBQU92REMsaUJBQWFQLFNBQVNPLFdBUGlDO0FBUXZEQyxrQkFBY1IsU0FBU1EsWUFSZ0M7QUFTdkRDLHFCQUFpQlQsU0FBU1MsZUFUNkI7QUFVdkRDLDBCQUFzQlYsU0FBU1Usb0JBVndCO0FBV3ZEQyxlQUFXWCxTQUFTVyxTQVhtQztBQVl2REMsZ0JBQVla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TTtBQVBMLE9BN0lrQyxDQUE5QixDQUFQO0FBc0pEO0FBalpzRCxHQUF6QyxDQUFoQjs7b0JBb1plcEksTyIsImZpbGUiOiJFZGl0LmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAyMDE3IEluZm9yXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuaW1wb3J0IGRlY2xhcmUgZnJvbSAnZG9qby9fYmFzZS9kZWNsYXJlJztcclxuaW1wb3J0IGxhbmcgZnJvbSAnZG9qby9fYmFzZS9sYW5nJztcclxuaW1wb3J0IGZvcm1hdCBmcm9tICcuLi8uLi9Gb3JtYXQnO1xyXG5pbXBvcnQgdmFsaWRhdG9yIGZyb20gJy4uLy4uL1ZhbGlkYXRvcic7XHJcbmltcG9ydCBFcnJvck1hbmFnZXIgZnJvbSAnYXJnb3MvRXJyb3JNYW5hZ2VyJztcclxuaW1wb3J0IEVkaXQgZnJvbSAnYXJnb3MvRWRpdCc7XHJcbmltcG9ydCBnZXRSZXNvdXJjZSBmcm9tICdhcmdvcy9JMThuJztcclxuXHJcbmNvbnN0IHJlc291cmNlID0gZ2V0UmVzb3VyY2UoJ3RpY2tldEVkaXQnKTtcclxuXHJcbi8qKlxyXG4gKiBAY2xhc3MgY3JtLlZpZXdzLlRpY2tldC5FZGl0XHJcbiAqXHJcbiAqIEBleHRlbmRzIGFyZ29zLkVkaXRcclxuICpcclxuICogQHJlcXVpcmVzIGFyZ29zLkVycm9yTWFuYWdlclxyXG4gKlxyXG4gKiBAcmVxdWlyZXMgY3JtLkZvcm1hdFxyXG4gKiBAcmVxdWlyZXMgY3JtLlZhbGlkYXRvclxyXG4gKi9cclxuY29uc3QgX19jbGFzcyA9IGRlY2xhcmUoJ2NybS5WaWV3cy5UaWNrZXQuRWRpdCcsIFtFZGl0XSwge1xyXG4gIC8vIExvY2FsaXphdGlvblxyXG4gIGFjY291bnRUZXh0OiByZXNvdXJjZS5hY2NvdW50VGV4dCxcclxuICBhcmVhVGV4dDogcmVzb3VyY2UuYXJlYVRleHQsXHJcbiAgYXNzaWduZWREYXRlVGV4dDogcmVzb3VyY2UuYXNzaWduZWREYXRlVGV4dCxcclxuICBhc3NpZ25lZFRvVGV4dDogcmVzb3VyY2UuYXNzaWduZWRUb1RleHQsXHJcbiAgY2F0ZWdvcnlUZXh0OiByZXNvdXJjZS5jYXRlZ29yeVRleHQsXHJcbiAgY29udGFjdFRleHQ6IHJlc291cmNlLmNvbnRhY3RUZXh0LFxyXG4gIGNvbnRyYWN0VGV4dDogcmVzb3VyY2UuY29udHJhY3RUZXh0LFxyXG4gIGRlc2NyaXB0aW9uVGV4dDogcmVzb3VyY2UuZGVzY3JpcHRpb25UZXh0LFxyXG4gIGRlc2NyaXB0aW9uVGl0bGVUZXh0OiByZXNvdXJjZS5kZXNjcmlwdGlvblRpdGxlVGV4dCxcclxuICBpc3N1ZVRleHQ6IHJlc291cmNlLmlzc3VlVGV4dCxcclxuICBuZWVkQnlUZXh0OiByZXNvdXJjZS5uZWVkQnlUZXh0LFxyXG4gIG5vdGVzVGV4dDogcmVzb3VyY2Uubm90ZXNUZXh0LFxyXG4gIG5vdGVzVGl0bGVUZXh0OiByZXNvdXJjZS5ub3Rlc1RpdGxlVGV4dCxcclxuICBwaG9uZVRleHQ6IHJlc291cmNlLnBob25lVGV4dCxcclxuICByZWxhdGVkQWN0aXZpdGllc1RleHQ6IHJlc291cmNlLnJlbGF0ZWRBY3Rpdml0aWVzVGV4dCxcclxuICByZWxhdGVkSXRlbXNUZXh0OiByZXNvdXJjZS5yZWxhdGVkSXRlbXNUZXh0LFxyXG4gIHJlc29sdXRpb25UZXh0OiByZXNvdXJjZS5yZXNvbHV0aW9uVGV4dCxcclxuICByZXNvbHV0aW9uVGl0bGVUZXh0OiByZXNvdXJjZS5yZXNvbHV0aW9uVGl0bGVUZXh0LFxyXG4gIHNvdXJjZVRleHQ6IHJlc291cmNlLnNvdXJjZVRleHQsXHJcbiAgc291cmNlVGl0bGVUZXh0OiByZXNvdXJjZS5zb3VyY2VUaXRsZVRleHQsXHJcbiAgc3RhdHVzVGV4dDogcmVzb3VyY2Uuc3RhdHVzVGV4dCxcclxuICBzdWJqZWN0VGV4dDogcmVzb3VyY2Uuc3ViamVjdFRleHQsXHJcbiAgdGlja2V0QXJlYVRpdGxlVGV4dDogcmVzb3VyY2UudGlja2V0QXJlYVRpdGxlVGV4dCxcclxuICB0aWNrZXRDYXRlZ29yeVRpdGxlVGV4dDogcmVzb3VyY2UudGlja2V0Q2F0ZWdvcnlUaXRsZVRleHQsXHJcbiAgdGlja2V0SWRUZXh0OiByZXNvdXJjZS50aWNrZXRJZFRleHQsXHJcbiAgdGlja2V0SXNzdWVUaXRsZVRleHQ6IHJlc291cmNlLnRpY2tldElzc3VlVGl0bGVUZXh0LFxyXG4gIHRpY2tldFN0YXR1c1RpdGxlVGV4dDogcmVzb3VyY2UudGlja2V0U3RhdHVzVGl0bGVUZXh0LFxyXG4gIHRpY2tldFVyZ2VuY3lUaXRsZVRleHQ6IHJlc291cmNlLnRpY2tldFVyZ2VuY3lUaXRsZVRleHQsXHJcbiAgdGl0bGVUZXh0OiByZXNvdXJjZS50aXRsZVRleHQsXHJcbiAgdXJnZW5jeVRleHQ6IHJlc291cmNlLnVyZ2VuY3lUZXh0LFxyXG5cclxuICAvLyBWaWV3IFByb3BlcnRpZXNcclxuICBlbnRpdHlOYW1lOiAnVGlja2V0JyxcclxuICBpZDogJ3RpY2tldF9lZGl0JyxcclxuICBpbnNlcnRTZWN1cml0eTogJ0VudGl0aWVzL1RpY2tldC9BZGQnLFxyXG4gIHVwZGF0ZVNlY3VyaXR5OiAnRW50aXRpZXMvVGlja2V0L0VkaXQnLFxyXG4gIHF1ZXJ5U2VsZWN0OiBbXHJcbiAgICAnQWNjb3VudC9BY2NvdW50TmFtZScsXHJcbiAgICAnQWNjb3VudC9NYWluUGhvbmUnLFxyXG4gICAgJ0FyZWEnLFxyXG4gICAgJ0Fzc2lnbmVkRGF0ZScsXHJcbiAgICAnQXNzaWduZWRUby9Pd25lckRlc2NyaXB0aW9uJyxcclxuICAgICdDYXRlZ29yeScsXHJcbiAgICAnQ29udGFjdC9OYW1lTEYnLFxyXG4gICAgJ0NvbnRhY3QvV29ya1Bob25lJyxcclxuICAgICdDb250cmFjdC9SZWZlcmVuY2VOdW1iZXInLFxyXG4gICAgJ0lzc3VlJyxcclxuICAgICdOZWVkZWRCeURhdGUnLFxyXG4gICAgJ05vdGVzJyxcclxuICAgICdWaWFDb2RlJyxcclxuICAgICdTdGF0dXNDb2RlJyxcclxuICAgICdVcmdlbmN5Q29kZScsXHJcbiAgICAnU3ViamVjdCcsXHJcbiAgICAnVGlja2V0TnVtYmVyJyxcclxuICAgICdUaWNrZXRQcm9ibGVtL05vdGVzJyxcclxuICAgICdUaWNrZXRTb2x1dGlvbi9Ob3RlcycsXHJcbiAgICAnVXJnZW5jeS9EZXNjcmlwdGlvbicsXHJcbiAgICAnVXJnZW5jeS9VcmdlbmN5Q29kZScsXHJcbiAgICAnQ29tcGxldGVkQnkvT3duZXJEZXNjcmlwdGlvbicsXHJcbiAgXSxcclxuICBxdWVyeUluY2x1ZGU6IFtcclxuICAgICckcGVybWlzc2lvbnMnLFxyXG4gIF0sXHJcbiAgcmVzb3VyY2VLaW5kOiAndGlja2V0cycsXHJcblxyXG4gIGluaXQ6IGZ1bmN0aW9uIGluaXQoKSB7XHJcbiAgICB0aGlzLmluaGVyaXRlZChpbml0LCBhcmd1bWVudHMpO1xyXG5cclxuICAgIHRoaXMuY29ubmVjdCh0aGlzLmZpZWxkcy5BY2NvdW50LCAnb25DaGFuZ2UnLCB0aGlzLm9uQWNjb3VudENoYW5nZSk7XHJcbiAgICB0aGlzLmNvbm5lY3QodGhpcy5maWVsZHMuQ29udGFjdCwgJ29uQ2hhbmdlJywgdGhpcy5vbkNvbnRhY3RDaGFuZ2UpO1xyXG4gICAgdGhpcy5jb25uZWN0KHRoaXMuZmllbGRzLlVyZ2VuY3ksICdvbkNoYW5nZScsIHRoaXMub25VcmdlbmN5Q2hhbmdlKTtcclxuICAgIHRoaXMuY29ubmVjdCh0aGlzLmZpZWxkcy5BcmVhLCAnb25DaGFuZ2UnLCB0aGlzLm9uQXJlYUNoYW5nZSk7XHJcbiAgICB0aGlzLmNvbm5lY3QodGhpcy5maWVsZHMuQ2F0ZWdvcnksICdvbkNoYW5nZScsIHRoaXMub25DYXRlZ29yeUNoYW5nZSk7XHJcbiAgfSxcclxuICBjb252ZXJ0RW50cnk6IGZ1bmN0aW9uIGNvbnZlcnRFbnRyeSgpIHtcclxuICAgIGNvbnN0IGVudHJ5ID0gdGhpcy5pbmhlcml0ZWQoY29udmVydEVudHJ5LCBhcmd1bWVudHMpO1xyXG5cclxuICAgIGlmICghdGhpcy5vcHRpb25zLmVudHJ5KSB7XHJcbiAgICAgIGlmIChlbnRyeS5TdGF0dXNDb2RlKSB7XHJcbiAgICAgICAgdGhpcy5yZXF1ZXN0Q29kZURhdGEoJ25hbWUgZXEgXCJUaWNrZXQgU3RhdHVzXCInLCBlbnRyeS5TdGF0dXNDb2RlLCB0aGlzLmZpZWxkcy5TdGF0dXNDb2RlLCBlbnRyeSwgJ1N0YXR1cycpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoZW50cnkuVmlhQ29kZSkge1xyXG4gICAgICAgIHRoaXMucmVxdWVzdENvZGVEYXRhKCduYW1lIGVxIFwiU291cmNlXCInLCBlbnRyeS5WaWFDb2RlLCB0aGlzLmZpZWxkcy5WaWFDb2RlLCBlbnRyeSwgJ1NvdXJjZVRleHQnKTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBlbnRyeTtcclxuICB9LFxyXG4gIHByb2Nlc3NUZW1wbGF0ZUVudHJ5OiBmdW5jdGlvbiBwcm9jZXNzVGVtcGxhdGVFbnRyeShlbnRyeSkge1xyXG4gICAgdGhpcy5pbmhlcml0ZWQocHJvY2Vzc1RlbXBsYXRlRW50cnksIGFyZ3VtZW50cyk7XHJcblxyXG4gICAgaWYgKGVudHJ5LlN0YXR1c0NvZGUpIHtcclxuICAgICAgdGhpcy5yZXF1ZXN0Q29kZURhdGEoJ25hbWUgZXEgXCJUaWNrZXQgU3RhdHVzXCInLCBlbnRyeS5TdGF0dXNDb2RlLCB0aGlzLmZpZWxkcy5TdGF0dXNDb2RlLCBlbnRyeSwgJ1N0YXR1cycpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgY3JlYXRlUGlja2xpc3RSZXF1ZXN0OiBmdW5jdGlvbiBjcmVhdGVQaWNrbGlzdFJlcXVlc3QobmFtZSkge1xyXG4gICAgY29uc3QgcmVxdWVzdCA9IG5ldyBTYWdlLlNEYXRhLkNsaWVudC5TRGF0YVJlc291cmNlQ29sbGVjdGlvblJlcXVlc3QoQXBwLmdldFNlcnZpY2UoKSlcclxuICAgICAgLnNldFJlc291cmNlS2luZCgncGlja2xpc3RzJylcclxuICAgICAgLnNldENvbnRyYWN0TmFtZSgnc3lzdGVtJyk7XHJcblxyXG4gICAgY29uc3QgdXJpID0gcmVxdWVzdC5nZXRVcmkoKTtcclxuICAgIHVyaS5zZXRQYXRoU2VnbWVudChTYWdlLlNEYXRhLkNsaWVudC5TRGF0YVVyaS5SZXNvdXJjZVByb3BlcnR5SW5kZXgsICdpdGVtcycpO1xyXG4gICAgdXJpLnNldENvbGxlY3Rpb25QcmVkaWNhdGUobmFtZSk7XHJcblxyXG4gICAgcmVxdWVzdC5hbGxvd0NhY2hlVXNlID0gdHJ1ZTtcclxuICAgIHJldHVybiByZXF1ZXN0O1xyXG4gIH0sXHJcbiAgcmVxdWVzdENvZGVEYXRhOiBmdW5jdGlvbiByZXF1ZXN0Q29kZURhdGEocGlja2xpc3ROYW1lLCBjb2RlLCBmaWVsZCwgZW50cnksIG5hbWUpIHtcclxuICAgIGNvbnN0IHJlcXVlc3QgPSB0aGlzLmNyZWF0ZVBpY2tsaXN0UmVxdWVzdChwaWNrbGlzdE5hbWUpO1xyXG4gICAgcmVxdWVzdC5yZWFkKHtcclxuICAgICAgc3VjY2VzczogbGFuZy5oaXRjaCh0aGlzLCB0aGlzLm9uUmVxdWVzdENvZGVEYXRhU3VjY2VzcywgY29kZSwgZmllbGQsIGVudHJ5LCBuYW1lKSxcclxuICAgICAgZmFpbHVyZTogdGhpcy5vblJlcXVlc3RDb2RlRGF0YUZhaWx1cmUsXHJcbiAgICAgIHNjb3BlOiB0aGlzLFxyXG4gICAgfSk7XHJcbiAgfSxcclxuICBvblJlcXVlc3RDb2RlRGF0YVN1Y2Nlc3M6IGZ1bmN0aW9uIG9uUmVxdWVzdENvZGVEYXRhU3VjY2Vzcyhjb2RlLCBmaWVsZCwgZW50cnksIG5hbWUsIGZlZWQpIHtcclxuICAgIGNvbnN0IHZhbHVlID0gdGhpcy5wcm9jZXNzQ29kZURhdGFGZWVkKGZlZWQsIGNvZGUpO1xyXG4gICAgZW50cnlbbmFtZV0gPSB2YWx1ZTtcclxuICAgIGZpZWxkLnNldFZhbHVlKGNvZGUpO1xyXG4gICAgZmllbGQuc2V0VGV4dCh2YWx1ZSk7XHJcbiAgfSxcclxuICBvblJlcXVlc3RDb2RlRGF0YUZhaWx1cmU6IGZ1bmN0aW9uIG9uUmVxdWVzdENvZGVEYXRhRmFpbHVyZShyZXNwb25zZSwgbykge1xyXG4gICAgRXJyb3JNYW5hZ2VyLmFkZEVycm9yKHJlc3BvbnNlLCBvLCB0aGlzLm9wdGlvbnMsICdmYWlsdXJlJyk7XHJcbiAgfSxcclxuICBwcm9jZXNzQ29kZURhdGFGZWVkOiBmdW5jdGlvbiBwcm9jZXNzQ29kZURhdGFGZWVkKGZlZWQsIGN1cnJlbnRWYWx1ZSwgb3B0aW9ucykge1xyXG4gICAgY29uc3Qga2V5UHJvcGVydHkgPSBvcHRpb25zICYmIG9wdGlvbnMua2V5UHJvcGVydHkgPyBvcHRpb25zLmtleVByb3BlcnR5IDogJyRrZXknO1xyXG4gICAgY29uc3QgdGV4dFByb3BlcnR5ID0gb3B0aW9ucyAmJiBvcHRpb25zLnRleHRQcm9wZXJ0eSA/IG9wdGlvbnMudGV4dFByb3BlcnR5IDogJ3RleHQnO1xyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZmVlZC4kcmVzb3VyY2VzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGlmIChmZWVkLiRyZXNvdXJjZXNbaV1ba2V5UHJvcGVydHldID09PSBjdXJyZW50VmFsdWUpIHtcclxuICAgICAgICByZXR1cm4gZmVlZC4kcmVzb3VyY2VzW2ldW3RleHRQcm9wZXJ0eV07XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gY3VycmVudFZhbHVlO1xyXG4gIH0sXHJcblxyXG4gIHNldFZhbHVlczogZnVuY3Rpb24gc2V0VmFsdWVzKGVudHJ5KSB7XHJcbiAgICB0aGlzLmluaGVyaXRlZChzZXRWYWx1ZXMsIGFyZ3VtZW50cyk7XHJcblxyXG4gICAgaWYgKGVudHJ5LlNvdXJjZVRleHQpIHtcclxuICAgICAgdGhpcy5maWVsZHMuVmlhQ29kZS5zZXRUZXh0KGVudHJ5LlNvdXJjZVRleHQpO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChlbnRyeS5TdGF0dXMpIHtcclxuICAgICAgdGhpcy5maWVsZHMuU3RhdHVzQ29kZS5zZXRUZXh0KGVudHJ5LlN0YXR1cyk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBvblVyZ2VuY3lDaGFuZ2U6IGZ1bmN0aW9uIG9uVXJnZW5jeUNoYW5nZSh2YWx1ZSwgZmllbGQpIHtcclxuICAgIGNvbnN0IHNlbGVjdGlvbiA9IGZpZWxkLmdldFNlbGVjdGlvbigpO1xyXG4gICAgaWYgKHNlbGVjdGlvbikge1xyXG4gICAgICB0aGlzLmZpZWxkcy5VcmdlbmN5Q29kZS5zZXRWYWx1ZShzZWxlY3Rpb24uVXJnZW5jeUNvZGUpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgb25Db250YWN0Q2hhbmdlOiBmdW5jdGlvbiBvbkNvbnRhY3RDaGFuZ2UodmFsdWUsIGZpZWxkKSB7XHJcbiAgICBjb25zdCBzZWxlY3Rpb24gPSBmaWVsZC5nZXRTZWxlY3Rpb24oKTtcclxuICAgIGNvbnN0IGFjY291bnRGaWVsZCA9IHRoaXMuZmllbGRzLkFjY291bnQ7XHJcblxyXG4gICAgaWYgKHNlbGVjdGlvbiAmJiBzZWxlY3Rpb24uQWNjb3VudCAmJiAhYWNjb3VudEZpZWxkLmdldFZhbHVlKCkpIHtcclxuICAgICAgYWNjb3VudEZpZWxkLnNldFZhbHVlKHtcclxuICAgICAgICAka2V5OiBzZWxlY3Rpb24uQWNjb3VudC4ka2V5LFxyXG4gICAgICAgIEFjY291bnROYW1lOiBzZWxlY3Rpb24uQWNjb3VudC5BY2NvdW50TmFtZSxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBvbkFjY291bnRDaGFuZ2U6IGZ1bmN0aW9uIG9uQWNjb3VudENoYW5nZSh2YWx1ZSwgZmllbGQpIHtcclxuICAgIGNvbnN0IHNlbGVjdGlvbiA9IGZpZWxkLmdldFNlbGVjdGlvbigpO1xyXG5cclxuICAgIGlmIChzZWxlY3Rpb24gJiYgc2VsZWN0aW9uLiRrZXkpIHtcclxuICAgICAgY29uc3QgcmVxdWVzdCA9IG5ldyBTYWdlLlNEYXRhLkNsaWVudC5TRGF0YVJlc291cmNlUHJvcGVydHlSZXF1ZXN0KHRoaXMuZ2V0U2VydmljZSgpKVxyXG4gICAgICAgIC5zZXRSZXNvdXJjZUtpbmQoJ2FjY291bnRzJylcclxuICAgICAgICAuc2V0UmVzb3VyY2VTZWxlY3RvcihgJyR7c2VsZWN0aW9uLiRrZXl9J2ApXHJcbiAgICAgICAgLnNldFJlc291cmNlUHJvcGVydHkoJ0NvbnRhY3RzJylcclxuICAgICAgICAuc2V0UXVlcnlBcmcoJ2NvdW50JywgMSlcclxuICAgICAgICAuc2V0UXVlcnlBcmcoJ3NlbGVjdCcsICdOYW1lTEYnKVxyXG4gICAgICAgIC5zZXRRdWVyeUFyZygnd2hlcmUnLCAnSXNQcmltYXJ5IGVxIHRydWUnKTtcclxuXHJcbiAgICAgIHJlcXVlc3QucmVhZEZlZWQoe1xyXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uIHN1Y2Nlc3MoZmVlZCkge1xyXG4gICAgICAgICAgaWYgKGZlZWQgJiYgZmVlZC4kcmVzb3VyY2VzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZmllbGRzLkNvbnRhY3Quc2V0VmFsdWUoZmVlZC4kcmVzb3VyY2VzWzBdKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGZhaWx1cmU6IGZ1bmN0aW9uIGZhaWx1cmUoKSB7fSxcclxuICAgICAgICBzY29wZTogdGhpcyxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBvbkFyZWFDaGFuZ2U6IGZ1bmN0aW9uIG9uQXJlYUNoYW5nZSgpIHtcclxuICAgIHRoaXMuZmllbGRzLklzc3VlLmNsZWFyVmFsdWUoKTtcclxuICAgIHRoaXMuZmllbGRzLkNhdGVnb3J5LmNsZWFyVmFsdWUoKTtcclxuICB9LFxyXG4gIG9uQ2F0ZWdvcnlDaGFuZ2U6IGZ1bmN0aW9uIG9uQ2F0ZWdvcnlDaGFuZ2UoKSB7XHJcbiAgICB0aGlzLmZpZWxkcy5Jc3N1ZS5jbGVhclZhbHVlKCk7XHJcbiAgfSxcclxuICBmb3JtYXRBY2NvdW50UXVlcnk6IGZ1bmN0aW9uIGZvcm1hdEFjY291bnRRdWVyeSgpIHtcclxuICAgIGNvbnN0IHZhbHVlID0gdGhpcy5maWVsZHMuQWNjb3VudC5nZXRWYWx1ZSgpO1xyXG4gICAgY29uc3Qga2V5ID0gdmFsdWUgJiYgdmFsdWUuJGtleTtcclxuXHJcbiAgICByZXR1cm4ga2V5ID8gYEFjY291bnQuaWQgZXEgXCIke2tleX1cImAgOiBmYWxzZTtcclxuICB9LFxyXG4gIGFwcGx5Q29udGV4dDogZnVuY3Rpb24gYXBwbHlDb250ZXh0KCkge1xyXG4gICAgY29uc3QgZm91bmQgPSBBcHAucXVlcnlOYXZpZ2F0aW9uQ29udGV4dCgobykgPT4ge1xyXG4gICAgICByZXR1cm4gKC9eKGFjY291bnRzfGNvbnRhY3RzKSQvKS50ZXN0KG8ucmVzb3VyY2VLaW5kKSAmJiBvLmtleTtcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IGxvb2t1cCA9IHtcclxuICAgICAgYWNjb3VudHM6IHRoaXMuYXBwbHlBY2NvdW50Q29udGV4dCxcclxuICAgICAgY29udGFjdHM6IHRoaXMuYXBwbHlDb250YWN0Q29udGV4dCxcclxuICAgIH07XHJcblxyXG4gICAgaWYgKGZvdW5kICYmIGxvb2t1cFtmb3VuZC5yZXNvdXJjZUtpbmRdKSB7XHJcbiAgICAgIGxvb2t1cFtmb3VuZC5yZXNvdXJjZUtpbmRdLmNhbGwodGhpcywgZm91bmQpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgYXBwbHlBY2NvdW50Q29udGV4dDogZnVuY3Rpb24gYXBwbHlBY2NvdW50Q29udGV4dChjb250ZXh0KSB7XHJcbiAgICBjb25zdCB2aWV3ID0gQXBwLmdldFZpZXcoY29udGV4dC5pZCk7XHJcbiAgICBjb25zdCBlbnRyeSA9IHZpZXcgJiYgdmlldy5lbnRyeTtcclxuXHJcbiAgICBjb25zdCBhY2NvdW50RmllbGQgPSB0aGlzLmZpZWxkcy5BY2NvdW50O1xyXG4gICAgYWNjb3VudEZpZWxkLnNldFZhbHVlKGVudHJ5KTtcclxuICAgIHRoaXMub25BY2NvdW50Q2hhbmdlKGVudHJ5LCBhY2NvdW50RmllbGQpO1xyXG4gIH0sXHJcbiAgYXBwbHlDb250YWN0Q29udGV4dDogZnVuY3Rpb24gYXBwbHlDb250YWN0Q29udGV4dChjb250ZXh0KSB7XHJcbiAgICBjb25zdCB2aWV3ID0gQXBwLmdldFZpZXcoY29udGV4dC5pZCk7XHJcbiAgICBjb25zdCBlbnRyeSA9IHZpZXcgJiYgdmlldy5lbnRyeTtcclxuXHJcbiAgICBjb25zdCBhY2NvdW50RmllbGQgPSB0aGlzLmZpZWxkcy5BY2NvdW50O1xyXG4gICAgYWNjb3VudEZpZWxkLnNldFZhbHVlKGVudHJ5LkFjY291bnQpO1xyXG4gICAgdGhpcy5vbkFjY291bnRDaGFuZ2UoZW50cnkuQWNjb3VudCwgYWNjb3VudEZpZWxkKTtcclxuXHJcbiAgICB0aGlzLmZpZWxkcy5Db250YWN0LnNldFZhbHVlKGVudHJ5KTtcclxuICB9LFxyXG4gIGZvcm1hdENhdGVnb3J5UXVlcnk6IGZ1bmN0aW9uIGZvcm1hdENhdGVnb3J5UXVlcnkodmFsdWUpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIEFyZWE6IHZhbHVlLCAvLyBkZXBlbmRlbnQgdmFsdWVcclxuICAgIH07XHJcbiAgfSxcclxuICBmb3JtYXRJc3N1ZVF1ZXJ5OiBmdW5jdGlvbiBmb3JtYXRJc3N1ZVF1ZXJ5KHZhbHVlKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICBBcmVhOiB0aGlzLmZpZWxkcy5BcmVhLmdldFZhbHVlKCksXHJcbiAgICAgIENhdGVnb3J5OiB2YWx1ZSwgLy8gZGVwZW5kZW50IHZhbHVlXHJcbiAgICB9O1xyXG4gIH0sXHJcbiAgaW5jbHVkZUlmVmFsdWVFeGlzdHM6IGZ1bmN0aW9uIGluY2x1ZGVJZlZhbHVlRXhpc3RzKHZhbHVlKSB7XHJcbiAgICByZXR1cm4gdmFsdWU7XHJcbiAgfSxcclxuICBjcmVhdGVMYXlvdXQ6IGZ1bmN0aW9uIGNyZWF0ZUxheW91dCgpIHtcclxuICAgIHJldHVybiB0aGlzLmxheW91dCB8fCAodGhpcy5sYXlvdXQgPSBbe1xyXG4gICAgICBsYWJlbDogdGhpcy5hY2NvdW50VGV4dCxcclxuICAgICAgbmFtZTogJ0FjY291bnQnLFxyXG4gICAgICBwcm9wZXJ0eTogJ0FjY291bnQnLFxyXG4gICAgICB0ZXh0UHJvcGVydHk6ICdBY2NvdW50TmFtZScsXHJcbiAgICAgIHR5cGU6ICdsb29rdXAnLFxyXG4gICAgICByZXF1aXJlU2VsZWN0aW9uOiB0cnVlLFxyXG4gICAgICB2YWxpZGF0b3I6IHZhbGlkYXRvci5leGlzdHMsXHJcbiAgICAgIHZpZXc6ICdhY2NvdW50X3JlbGF0ZWQnLFxyXG4gICAgfSwge1xyXG4gICAgICBsYWJlbDogdGhpcy5jb250YWN0VGV4dCxcclxuICAgICAgbmFtZTogJ0NvbnRhY3QnLFxyXG4gICAgICBwcm9wZXJ0eTogJ0NvbnRhY3QnLFxyXG4gICAgICB0ZXh0UHJvcGVydHk6ICdOYW1lTEYnLFxyXG4gICAgICB0eXBlOiAnbG9va3VwJyxcclxuICAgICAgcmVxdWlyZVNlbGVjdGlvbjogdHJ1ZSxcclxuICAgICAgdmFsaWRhdG9yOiB2YWxpZGF0b3IuZXhpc3RzLFxyXG4gICAgICB2aWV3OiAnY29udGFjdF9yZWxhdGVkJyxcclxuICAgICAgd2hlcmU6IHRoaXMuZm9ybWF0QWNjb3VudFF1ZXJ5LmJpbmREZWxlZ2F0ZSh0aGlzKSxcclxuICAgIH0sIHtcclxuICAgICAgbGFiZWw6IHRoaXMuY29udHJhY3RUZXh0LFxyXG4gICAgICBuYW1lOiAnQ29udHJhY3QnLFxyXG4gICAgICBwcm9wZXJ0eTogJ0NvbnRyYWN0JyxcclxuICAgICAgdGV4dFByb3BlcnR5OiAnUmVmZXJlbmNlTnVtYmVyJyxcclxuICAgICAgdHlwZTogJ2xvb2t1cCcsXHJcbiAgICAgIHJlcXVpcmVTZWxlY3Rpb246IHRydWUsXHJcbiAgICAgIHZpZXc6ICdjb250cmFjdF9yZWxhdGVkJyxcclxuICAgICAgd2hlcmU6IHRoaXMuZm9ybWF0QWNjb3VudFF1ZXJ5LmJpbmREZWxlZ2F0ZSh0aGlzKSxcclxuICAgIH0sIHtcclxuICAgICAgbGFiZWw6IHRoaXMuYXJlYVRleHQsXHJcbiAgICAgIG5hbWU6ICdBcmVhJyxcclxuICAgICAgcHJvcGVydHk6ICdBcmVhJyxcclxuICAgICAgdGl0bGU6IHRoaXMudGlja2V0QXJlYVRpdGxlVGV4dCxcclxuICAgICAgdHlwZTogJ2xvb2t1cCcsXHJcbiAgICAgIHJlcXVpcmVTZWxlY3Rpb246IHRydWUsXHJcbiAgICAgIHZhbHVlS2V5UHJvcGVydHk6IGZhbHNlLFxyXG4gICAgICB2YWx1ZVRleHRQcm9wZXJ0eTogZmFsc2UsXHJcbiAgICAgIHZpZXc6ICdhcmVhY2F0ZWdvcnlpc3N1ZV9sb29rdXAnLFxyXG4gICAgfSwge1xyXG4gICAgICBsYWJlbDogdGhpcy5jYXRlZ29yeVRleHQsXHJcbiAgICAgIG5hbWU6ICdDYXRlZ29yeScsXHJcbiAgICAgIHByb3BlcnR5OiAnQ2F0ZWdvcnknLFxyXG4gICAgICB0aXRsZTogdGhpcy50aWNrZXRDYXRlZ29yeVRpdGxlVGV4dCxcclxuICAgICAgdHlwZTogJ2xvb2t1cCcsXHJcbiAgICAgIHJlcXVpcmVTZWxlY3Rpb246IHRydWUsXHJcbiAgICAgIGRlcGVuZHNPbjogJ0FyZWEnLFxyXG4gICAgICB2YWx1ZUtleVByb3BlcnR5OiBmYWxzZSxcclxuICAgICAgdmFsdWVUZXh0UHJvcGVydHk6IGZhbHNlLFxyXG4gICAgICB3aGVyZTogdGhpcy5mb3JtYXRDYXRlZ29yeVF1ZXJ5LmJpbmREZWxlZ2F0ZSh0aGlzKSxcclxuICAgICAgdmlldzogJ2FyZWFjYXRlZ29yeWlzc3VlX2xvb2t1cCcsXHJcbiAgICB9LCB7XHJcbiAgICAgIGxhYmVsOiB0aGlzLmlzc3VlVGV4dCxcclxuICAgICAgbmFtZTogJ0lzc3VlJyxcclxuICAgICAgcHJvcGVydHk6ICdJc3N1ZScsXHJcbiAgICAgIHRpdGxlOiB0aGlzLnRpY2tldElzc3VlVGl0bGVUZXh0LFxyXG4gICAgICB0eXBlOiAnbG9va3VwJyxcclxuICAgICAgcmVxdWlyZVNlbGVjdGlvbjogdHJ1ZSxcclxuICAgICAgZGVwZW5kc09uOiAnQ2F0ZWdvcnknLFxyXG4gICAgICB2YWx1ZUtleVByb3BlcnR5OiBmYWxzZSxcclxuICAgICAgdmFsdWVUZXh0UHJvcGVydHk6IGZhbHNlLFxyXG4gICAgICB3aGVyZTogdGhpcy5mb3JtYXRJc3N1ZVF1ZXJ5LmJpbmREZWxlZ2F0ZSh0aGlzKSxcclxuICAgICAgdmlldzogJ2FyZWFjYXRlZ29yeWlzc3VlX2xvb2t1cCcsXHJcbiAgICB9LCB7XHJcbiAgICAgIGxhYmVsOiB0aGlzLnNvdXJjZVRleHQsXHJcbiAgICAgIG5hbWU6ICdWaWFDb2RlJyxcclxuICAgICAgcHJvcGVydHk6ICdWaWFDb2RlJyxcclxuICAgICAgcGlja2xpc3Q6ICdTb3VyY2UnLFxyXG4gICAgICByZXF1aXJlU2VsZWN0aW9uOiB0cnVlLFxyXG4gICAgICBzdG9yYWdlTW9kZTogJ2lkJyxcclxuICAgICAgdGl0bGU6IHRoaXMuc291cmNlVGl0bGVUZXh0LFxyXG4gICAgICB0eXBlOiAncGlja2xpc3QnLFxyXG4gICAgfSwge1xyXG4gICAgICBsYWJlbDogdGhpcy5zdGF0dXNUZXh0LFxyXG4gICAgICBuYW1lOiAnU3RhdHVzQ29kZScsXHJcbiAgICAgIHByb3BlcnR5OiAnU3RhdHVzQ29kZScsXHJcbiAgICAgIHBpY2tsaXN0OiAnVGlja2V0IFN0YXR1cycsXHJcbiAgICAgIHJlcXVpcmVTZWxlY3Rpb246IHRydWUsXHJcbiAgICAgIHN0b3JhZ2VNb2RlOiAnaWQnLFxyXG4gICAgICB0aXRsZTogdGhpcy50aWNrZXRTdGF0dXNUaXRsZVRleHQsXHJcbiAgICAgIHR5cGU6ICdwaWNrbGlzdCcsXHJcbiAgICB9LCB7XHJcbiAgICAgIG5hbWU6ICdVcmdlbmN5Q29kZScsXHJcbiAgICAgIHByb3BlcnR5OiAnVXJnZW5jeUNvZGUnLFxyXG4gICAgICB0eXBlOiAnaGlkZGVuJyxcclxuICAgIH0sIHtcclxuICAgICAgbGFiZWw6IHRoaXMudXJnZW5jeVRleHQsXHJcbiAgICAgIG5hbWU6ICdVcmdlbmN5JyxcclxuICAgICAgcHJvcGVydHk6ICdVcmdlbmN5JyxcclxuICAgICAgdGl0bGU6IHRoaXMudGlja2V0VXJnZW5jeVRpdGxlVGV4dCxcclxuICAgICAgcmVxdWlyZVNlbGVjdGlvbjogdHJ1ZSxcclxuICAgICAgdGV4dFByb3BlcnR5OiAnRGVzY3JpcHRpb24nLFxyXG4gICAgICB0eXBlOiAnbG9va3VwJyxcclxuICAgICAgdmlldzogJ3VyZ2VuY3lfbGlzdCcsXHJcbiAgICB9LCB7XHJcbiAgICAgIGxhYmVsOiB0aGlzLm5lZWRCeVRleHQsXHJcbiAgICAgIG5hbWU6ICdOZWVkZWRCeURhdGUnLFxyXG4gICAgICBwcm9wZXJ0eTogJ05lZWRlZEJ5RGF0ZScsXHJcbiAgICAgIHJlbmRlcmVyOiBmb3JtYXQuZGF0ZSxcclxuICAgICAgdHlwZTogJ2RhdGUnLFxyXG4gICAgfSwge1xyXG4gICAgICBsYWJlbDogdGhpcy5hc3NpZ25lZERhdGVUZXh0LFxyXG4gICAgICBuYW1lOiAnQXNzaWduZWREYXRlJyxcclxuICAgICAgcHJvcGVydHk6ICdBc3NpZ25lZERhdGUnLFxyXG4gICAgICByZW5kZXJlcjogZm9ybWF0LmRhdGUsXHJcbiAgICAgIHR5cGU6ICdkYXRlJyxcclxuICAgIH0sIHtcclxuICAgICAgbGFiZWw6IHRoaXMuYXNzaWduZWRUb1RleHQsXHJcbiAgICAgIG5hbWU6ICdBc3NpZ25lZFRvJyxcclxuICAgICAgcHJvcGVydHk6ICdBc3NpZ25lZFRvJyxcclxuICAgICAgdGV4dFByb3BlcnR5OiAnT3duZXJEZXNjcmlwdGlvbicsXHJcbiAgICAgIHR5cGU6ICdsb29rdXAnLFxyXG4gICAgICB2aWV3OiAnb3duZXJfbGlzdCcsXHJcbiAgICB9LCB7XHJcbiAgICAgIGxhYmVsOiB0aGlzLnN1YmplY3RUZXh0LFxyXG4gICAgICBuYW1lOiAnU3ViamVjdCcsXHJcbiAgICAgIHByb3BlcnR5OiAnU3ViamVjdCcsXHJcbiAgICAgIHR5cGU6ICd0ZXh0JyxcclxuICAgIH0sIHtcclxuICAgICAgbmFtZTogJ1RpY2tldFByb2JsZW0uJGtleScsXHJcbiAgICAgIHByb3BlcnR5OiAnVGlja2V0UHJvYmxlbS4ka2V5JyxcclxuICAgICAgdHlwZTogJ2hpZGRlbicsXHJcbiAgICAgIGluY2x1ZGU6IHRoaXMuaW5jbHVkZUlmVmFsdWVFeGlzdHMsXHJcbiAgICB9LCB7XHJcbiAgICAgIGxhYmVsOiB0aGlzLmRlc2NyaXB0aW9uVGV4dCxcclxuICAgICAgbmFtZTogJ1RpY2tldFByb2JsZW0uTm90ZXMnLFxyXG4gICAgICBwcm9wZXJ0eTogJ1RpY2tldFByb2JsZW0uTm90ZXMnLFxyXG4gICAgICB0aXRsZTogdGhpcy5kZXNjcmlwdGlvblRpdGxlVGV4dCxcclxuICAgICAgdHlwZTogJ25vdGUnLFxyXG4gICAgICB2aWV3OiAndGV4dF9lZGl0JyxcclxuICAgIH0sIHtcclxuICAgICAgbmFtZTogJ1RpY2tldFNvbHV0aW9uLiRrZXknLFxyXG4gICAgICBwcm9wZXJ0eTogJ1RpY2tldFNvbHV0aW9uLiRrZXknLFxyXG4gICAgICB0eXBlOiAnaGlkZGVuJyxcclxuICAgICAgaW5jbHVkZTogdGhpcy5pbmNsdWRlSWZWYWx1ZUV4aXN0cyxcclxuICAgIH0sIHtcclxuICAgICAgbGFiZWw6IHRoaXMucmVzb2x1dGlvblRleHQsXHJcbiAgICAgIG5hbWU6ICdUaWNrZXRTb2x1dGlvbi5Ob3RlcycsXHJcbiAgICAgIHByb3BlcnR5OiAnVGlja2V0U29sdXRpb24uTm90ZXMnLFxyXG4gICAgICB0aXRsZTogdGhpcy5yZXNvbHV0aW9uVGl0bGVUZXh0LFxyXG4gICAgICB0eXBlOiAnbm90ZScsXHJcbiAgICAgIHZpZXc6ICd0ZXh0X2VkaXQnLFxyXG4gICAgfSwge1xyXG4gICAgICBsYWJlbDogdGhpcy5ub3Rlc1RleHQsXHJcbiAgICAgIG5hbWU6ICdOb3RlcycsXHJcbiAgICAgIHByb3BlcnR5OiAnTm90ZXMnLFxyXG4gICAgICBub3RlUHJvcGVydHk6IGZhbHNlLFxyXG4gICAgICB0aXRsZTogdGhpcy5ub3Rlc1RpdGxlVGV4dCxcclxuICAgICAgdHlwZTogJ25vdGUnLFxyXG4gICAgICB2aWV3OiAndGV4dF9lZGl0JyxcclxuICAgIH1dKTtcclxuICB9LFxyXG59KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IF9fY2xhc3M7XHJcbiJdfQ==
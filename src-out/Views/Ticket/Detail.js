define("crm/Views/Ticket/Detail", ["exports", "dojo/_base/declare", "../../Format", "../../Models/Names", "argos/Detail", "argos/I18n"], function (_exports, _declare, _Format, _Names, _Detail, _I18n) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports["default"] = void 0;
  _declare = _interopRequireDefault(_declare);
  _Format = _interopRequireDefault(_Format);
  _Names = _interopRequireDefault(_Names);
  _Detail = _interopRequireDefault(_Detail);
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
  var resource = (0, _I18n["default"])('ticketDetail');

  var __class = (0, _declare["default"])('crm.Views.Ticket.Detail', [_Detail["default"]], {
    // Localization
    accountText: resource.accountText,
    areaText: resource.areaText,
    assignedDateText: resource.assignedDateText,
    assignedToText: resource.assignedToText,
    completedByText: resource.completedByText,
    categoryText: resource.categoryText,
    contactText: resource.contactText,
    contractText: resource.contractText,
    descriptionText: resource.descriptionText,
    issueText: resource.issueText,
    needByText: resource.needByText,
    notesText: resource.notesText,
    phoneText: resource.phoneText,
    actionsText: resource.actionsText,
    relatedAttachmentText: resource.relatedAttachmentText,
    relatedAttachmentTitleText: resource.relatedAttachmentTitleText,
    relatedActivitiesText: resource.relatedActivitiesText,
    relatedItemsText: resource.relatedItemsText,
    resolutionText: resource.resolutionText,
    sourceText: resource.sourceText,
    statusText: resource.statusText,
    subjectText: resource.subjectText,
    ticketIdText: resource.ticketIdText,
    titleText: resource.titleText,
    urgencyText: resource.urgencyText,
    scheduleActivityText: resource.scheduleActivityText,
    relatedTicketActivitiesText: resource.relatedTicketActivitiesText,
    loadingText: resource.loadingText,
    entityText: resource.entityText,
    // View Properties
    id: 'ticket_detail',
    editView: 'ticket_edit',
    enableOffline: true,
    resourceKind: 'tickets',
    modelName: _Names["default"].TICKET,
    scheduleActivity: function scheduleActivity() {
      App.navigateToActivityInsertView();
    },
    formatPicklist: function formatPicklist(property) {
      return _Format["default"].picklist(this.app.picklistService, this._model, property, undefined, undefined, {
        display: _Format["default"].PicklistDataDisplayType.TEXT,
        storage: _Format["default"].PicklistStorageType.ID
      });
    },
    createLayout: function createLayout() {
      return this.layout || (this.layout = [{
        list: true,
        title: this.actionsText,
        cls: 'action-list',
        name: 'QuickActionsSection',
        children: [{
          name: 'ScheduleActivityAction',
          property: 'TicketNumber',
          label: this.scheduleActivityText,
          iconClass: 'calendar',
          action: 'scheduleActivity'
        }]
      }, {
        title: this.detailsText,
        name: 'DetailsSection',
        children: [{
          name: 'Account.AccountName',
          property: 'Account.AccountName',
          descriptor: 'Account.AccountName',
          label: this.accountText,
          view: 'account_detail',
          key: 'Account.$key'
        }, {
          name: 'Contact.NameLF',
          property: 'Contact.NameLF',
          descriptor: 'Contact.NameLF',
          label: this.contactText,
          view: 'contact_detail',
          key: 'Contact.$key'
        }, {
          label: this.assignedToText,
          name: 'AssignedTo.OwnerDescription',
          property: 'AssignedTo.OwnerDescription'
        }, {
          label: this.urgencyText,
          name: 'Urgency.Description',
          property: 'Urgency.Description'
        }, {
          label: this.needByText,
          name: 'NeededByDate',
          property: 'NeededByDate',
          renderer: _Format["default"].date
        }, {
          label: this.areaText,
          name: 'Area',
          property: 'Area'
        }, {
          label: this.categoryText,
          name: 'Category',
          property: 'Category'
        }, {
          label: this.issueText,
          name: 'Issue',
          property: 'Issue'
        }, {
          label: this.subjectText,
          name: 'Subject',
          property: 'Subject'
        }, {
          label: this.descriptionText,
          name: 'TicketProblem.Notes',
          property: 'TicketProblem.Notes'
        }, {
          label: this.statusText,
          name: 'StatusCode',
          property: 'StatusCode',
          renderer: this.formatPicklist('StatusCode')
        }, {
          label: this.completedByText,
          name: 'CompletedBy.OwnerDescription',
          property: 'CompletedBy.OwnerDescription'
        }, {
          label: this.contractText,
          name: 'Contract.ReferenceNumber',
          property: 'Contract.ReferenceNumber'
        }, {
          label: this.sourceText,
          name: 'ViaCode',
          property: 'ViaCode',
          renderer: this.formatPicklist('ViaCode')
        }, {
          label: this.assignedDateText,
          name: 'AssignedDate',
          property: 'AssignedDate',
          renderer: _Format["default"].date
        }, {
          label: this.resolutionText,
          name: 'TicketSolution.Notes',
          property: 'TicketSolution.Notes'
        }, {
          label: this.notesText,
          name: 'Notes',
          property: 'Notes'
        }]
      }, {
        list: true,
        title: this.relatedItemsText,
        name: 'RelatedItemsSection',
        children: [{
          name: 'ActivityRelated',
          label: this.relatedActivitiesText,
          view: 'activity_related',
          where: this.formatRelatedQuery.bindDelegate(this, 'TicketId eq "${0}"')
        }, {
          name: 'TicketActivityRelated',
          label: this.relatedTicketActivitiesText,
          view: 'ticketactivity_related',
          where: this.formatRelatedQuery.bindDelegate(this, 'Ticket.Id eq "${0}"')
        }, {
          name: 'AttachmentRelated',
          label: this.relatedAttachmentText,
          where: this.formatRelatedQuery.bindDelegate(this, 'ticketId eq "${0}"'),
          // must be lower case because of feed
          view: 'ticket_attachment_related',
          title: this.relatedAttachmentTitleText
        }]
      }]);
    }
  });

  var _default = __class;
  _exports["default"] = _default;
});
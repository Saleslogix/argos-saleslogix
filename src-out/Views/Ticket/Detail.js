define('crm/Views/Ticket/Detail', ['module', 'exports', 'dojo/_base/declare', '../../Format', '../../Models/Names', 'argos/Detail', 'argos/I18n'], function (module, exports, _declare, _Format, _Names, _Detail, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _Format2 = _interopRequireDefault(_Format);

  var _Names2 = _interopRequireDefault(_Names);

  var _Detail2 = _interopRequireDefault(_Detail);

  var _I18n2 = _interopRequireDefault(_I18n);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var resource = (0, _I18n2.default)('ticketDetail');

  /**
   * @class crm.Views.Ticket.Detail
   *
   * @extends argos.Detail
   *
   * @requires argos.ErrorManager
   *
   * @requires crm.Format
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

  var __class = (0, _declare2.default)('crm.Views.Ticket.Detail', [_Detail2.default], {
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
    modelName: _Names2.default.TICKET,

    scheduleActivity: function scheduleActivity() {
      App.navigateToActivityInsertView();
    },
    formatPicklist: function formatPicklist(property) {
      return _Format2.default.picklist(this.app.picklistService, this._model, property, undefined, undefined, {
        display: _Format2.default.PicklistDataDisplayType.TEXT,
        storage: _Format2.default.PicklistStorageType.ID
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
          renderer: _Format2.default.date
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
          renderer: _Format2.default.date
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
          where: this.formatRelatedQuery.bindDelegate(this, 'ticketId eq "${0}"'), // must be lower case because of feed
          view: 'ticket_attachment_related',
          title: this.relatedAttachmentTitleText
        }]
      }]);
    }
  });

  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9WaWV3cy9UaWNrZXQvRGV0YWlsLmpzIl0sIm5hbWVzIjpbInJlc291cmNlIiwiX19jbGFzcyIsImFjY291bnRUZXh0IiwiYXJlYVRleHQiLCJhc3NpZ25lZERhdGVUZXh0IiwiYXNzaWduZWRUb1RleHQiLCJjb21wbGV0ZWRCeVRleHQiLCJjYXRlZ29yeVRleHQiLCJjb250YWN0VGV4dCIsImNvbnRyYWN0VGV4dCIsImRlc2NyaXB0aW9uVGV4dCIsImlzc3VlVGV4dCIsIm5lZWRCeVRleHQiLCJub3Rlc1RleHQiLCJwaG9uZVRleHQiLCJhY3Rpb25zVGV4dCIsInJlbGF0ZWRBdHRhY2htZW50VGV4dCIsInJlbGF0ZWRBdHRhY2htZW50VGl0bGVUZXh0IiwicmVsYXRlZEFjdGl2aXRpZXNUZXh0IiwicmVsYXRlZEl0ZW1zVGV4dCIsInJlc29sdXRpb25UZXh0Iiwic291cmNlVGV4dCIsInN0YXR1c1RleHQiLCJzdWJqZWN0VGV4dCIsInRpY2tldElkVGV4dCIsInRpdGxlVGV4dCIsInVyZ2VuY3lUZXh0Iiwic2NoZWR1bGVBY3Rpdml0eVRleHQiLCJyZWxhdGVkVGlja2V0QWN0aXZpdGllc1RleHQiLCJsb2FkaW5nVGV4dCIsImVudGl0eVRleHQiLCJpZCIsImVkaXRWaWV3IiwiZW5hYmxlT2ZmbGluZSIsInJlc291cmNlS2luZCIsIm1vZGVsTmFtZSIsIlRJQ0tFVCIsInNjaGVkdWxlQWN0aXZpdHkiLCJBcHAiLCJuYXZpZ2F0ZVRvQWN0aXZpdHlJbnNlcnRWaWV3IiwiZm9ybWF0UGlja2xpc3QiLCJwcm9wZXJ0eSIsInBpY2tsaXN0IiwiYXBwIiwicGlja2xpc3RTZXJ2aWNlIiwiX21vZGVsIiwidW5kZWZpbmVkIiwiZGlzcGxheSIsIlBpY2tsaXN0RGF0YURpc3BsYXlUeXBlIiwiVEVYVCIsInN0b3JhZ2UiLCJQaWNrbGlzdFN0b3JhZ2VUeXBlIiwiSUQiLCJjcmVhdGVMYXlvdXQiLCJsYXlvdXQiLCJsaXN0IiwidGl0bGUiLCJjbHMiLCJuYW1lIiwiY2hpbGRyZW4iLCJsYWJlbCIsImljb25DbGFzcyIsImFjdGlvbiIsImRldGFpbHNUZXh0IiwiZGVzY3JpcHRvciIsInZpZXciLCJrZXkiLCJyZW5kZXJlciIsImRhdGUiLCJ3aGVyZSIsImZvcm1hdFJlbGF0ZWRRdWVyeSIsImJpbmREZWxlZ2F0ZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBcUJBLE1BQU1BLFdBQVcsb0JBQVksY0FBWixDQUFqQjs7QUFFQTs7Ozs7Ozs7O0FBdkJBOzs7Ozs7Ozs7Ozs7Ozs7QUFnQ0EsTUFBTUMsVUFBVSx1QkFBUSx5QkFBUixFQUFtQyxrQkFBbkMsRUFBNkM7QUFDM0Q7QUFDQUMsaUJBQWFGLFNBQVNFLFdBRnFDO0FBRzNEQyxjQUFVSCxTQUFTRyxRQUh3QztBQUkzREMsc0JBQWtCSixTQUFTSSxnQkFKZ0M7QUFLM0RDLG9CQUFnQkwsU0FBU0ssY0FMa0M7QUFNM0RDLHFCQUFpQk4sU0FBU00sZUFOaUM7QUFPM0RDLGtCQUFjUCxTQUFTTyxZQVBvQztBQVEzREMsaUJBQWFSLFNBQVNRLFdBUnFDO0FBUzNEQyxrQkFBY1QsU0FBU1MsWUFUb0M7QUFVM0RDLHFCQUFpQlYsU0FBU1UsZUFWaUM7QUFXM0RDLGVBQVdYLFNBQVNXLFNBWHVDO0FBWTNEQyxnQkFBWVosU0FBU1ksVUFac0M7QUFhM0RDLGVBQVdiLFNBQVNhLFNBYnVDO0FBYzNEQyxlQUFXZCxTQUFTYyxTQWR1QztBQWUzREMsaUJBQWFmLFNBQVNlLFdBZnFDO0FBZ0IzREMsMkJBQXVCaEIsU0FBU2dCLHFCQWhCMkI7QUFpQjNEQyxnQ0FBNEJqQixTQUFTaUIsMEJBakJzQjtBQWtCM0RDLDJCQUF1QmxCLFNBQVNrQixxQkFsQjJCO0FBbUIzREMsc0JBQWtCbkIsU0FBU21CLGdCQW5CZ0M7QUFvQjNEQyxvQkFBZ0JwQixTQUFTb0IsY0FwQmtDO0FBcUIzREMsZ0JBQVlyQixTQUFTcUIsVUFyQnNDO0FBc0IzREMsZ0JBQVl0QixTQUFTc0IsVUF0QnNDO0FBdUIzREMs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LENBQXFDLElBQXJDLEVBQTJDLG9CQUEzQztBQUpFLFNBQUQsRUFLUDtBQUNEYixnQkFBTSx1QkFETDtBQUVERSxpQkFBTyxLQUFLaEMsMkJBRlg7QUFHRHFDLGdCQUFNLHdCQUhMO0FBSURJLGlCQUFPLEtBQUtDLGtCQUFMLENBQXdCQyxZQUF4QixDQUFxQyxJQUFyQyxFQUEyQyxxQkFBM0M7QUFKTixTQUxPLEVBVVA7QUFDRGIsZ0JBQU0sbUJBREw7QUFFREUsaUJBQU8sS0FBSzVDLHFCQUZYO0FBR0RxRCxpQkFBTyxLQUFLQyxrQkFBTCxDQUF3QkMsWUFBeEIsQ0FBcUMsSUFBckMsRUFBMkMsb0JBQTNDLENBSE4sRUFHd0U7QUFDekVOLGdCQUFNLDJCQUpMO0FBS0RULGlCQUFPLEtBQUt2QztBQUxYLFNBVk87QUFKVCxPQTlGa0MsQ0FBOUIsQ0FBUDtBQW9IRDtBQXRLMEQsR0FBN0MsQ0FBaEI7O29CQXlLZWhCLE8iLCJmaWxlIjoiRGV0YWlsLmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAyMDE3IEluZm9yXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuaW1wb3J0IGRlY2xhcmUgZnJvbSAnZG9qby9fYmFzZS9kZWNsYXJlJztcclxuaW1wb3J0IGZvcm1hdCBmcm9tICcuLi8uLi9Gb3JtYXQnO1xyXG5pbXBvcnQgTU9ERUxfTkFNRVMgZnJvbSAnLi4vLi4vTW9kZWxzL05hbWVzJztcclxuaW1wb3J0IERldGFpbCBmcm9tICdhcmdvcy9EZXRhaWwnO1xyXG5pbXBvcnQgZ2V0UmVzb3VyY2UgZnJvbSAnYXJnb3MvSTE4bic7XHJcblxyXG5jb25zdCByZXNvdXJjZSA9IGdldFJlc291cmNlKCd0aWNrZXREZXRhaWwnKTtcclxuXHJcbi8qKlxyXG4gKiBAY2xhc3MgY3JtLlZpZXdzLlRpY2tldC5EZXRhaWxcclxuICpcclxuICogQGV4dGVuZHMgYXJnb3MuRGV0YWlsXHJcbiAqXHJcbiAqIEByZXF1aXJlcyBhcmdvcy5FcnJvck1hbmFnZXJcclxuICpcclxuICogQHJlcXVpcmVzIGNybS5Gb3JtYXRcclxuICovXHJcbmNvbnN0IF9fY2xhc3MgPSBkZWNsYXJlKCdjcm0uVmlld3MuVGlja2V0LkRldGFpbCcsIFtEZXRhaWxdLCB7XHJcbiAgLy8gTG9jYWxpemF0aW9uXHJcbiAgYWNjb3VudFRleHQ6IHJlc291cmNlLmFjY291bnRUZXh0LFxyXG4gIGFyZWFUZXh0OiByZXNvdXJjZS5hcmVhVGV4dCxcclxuICBhc3NpZ25lZERhdGVUZXh0OiByZXNvdXJjZS5hc3NpZ25lZERhdGVUZXh0LFxyXG4gIGFzc2lnbmVkVG9UZXh0OiByZXNvdXJjZS5hc3NpZ25lZFRvVGV4dCxcclxuICBjb21wbGV0ZWRCeVRleHQ6IHJlc291cmNlLmNvbXBsZXRlZEJ5VGV4dCxcclxuICBjYXRlZ29yeVRleHQ6IHJlc291cmNlLmNhdGVnb3J5VGV4dCxcclxuICBjb250YWN0VGV4dDogcmVzb3VyY2UuY29udGFjdFRleHQsXHJcbiAgY29udHJhY3RUZXh0OiByZXNvdXJjZS5jb250cmFjdFRleHQsXHJcbiAgZGVzY3JpcHRpb25UZXh0OiByZXNvdXJjZS5kZXNjcmlwdGlvblRleHQsXHJcbiAgaXNzdWVUZXh0OiByZXNvdXJjZS5pc3N1ZVRleHQsXHJcbiAgbmVlZEJ5VGV4dDogcmVzb3VyY2UubmVlZEJ5VGV4dCxcclxuICBub3Rlc1RleHQ6IHJlc291cmNlLm5vdGVzVGV4dCxcclxuICBwaG9uZVRleHQ6IHJlc291cmNlLnBob25lVGV4dCxcclxuICBhY3Rpb25zVGV4dDogcmVzb3VyY2UuYWN0aW9uc1RleHQsXHJcbiAgcmVsYXRlZEF0dGFjaG1lbnRUZXh0OiByZXNvdXJjZS5yZWxhdGVkQXR0YWNobWVudFRleHQsXHJcbiAgcmVsYXRlZEF0dGFjaG1lbnRUaXRsZVRleHQ6IHJlc291cmNlLnJlbGF0ZWRBdHRhY2htZW50VGl0bGVUZXh0LFxyXG4gIHJlbGF0ZWRBY3Rpdml0aWVzVGV4dDogcmVzb3VyY2UucmVsYXRlZEFjdGl2aXRpZXNUZXh0LFxyXG4gIHJlbGF0ZWRJdGVtc1RleHQ6IHJlc291cmNlLnJlbGF0ZWRJdGVtc1RleHQsXHJcbiAgcmVzb2x1dGlvblRleHQ6IHJlc291cmNlLnJlc29sdXRpb25UZXh0LFxyXG4gIHNvdXJjZVRleHQ6IHJlc291cmNlLnNvdXJjZVRleHQsXHJcbiAgc3RhdHVzVGV4dDogcmVzb3VyY2Uuc3RhdHVzVGV4dCxcclxuICBzdWJqZWN0VGV4dDogcmVzb3VyY2Uuc3ViamVjdFRleHQsXHJcbiAgdGlja2V0SWRUZXh0OiByZXNvdXJjZS50aWNrZXRJZFRleHQsXHJcbiAgdGl0bGVUZXh0OiByZXNvdXJjZS50aXRsZVRleHQsXHJcbiAgdXJnZW5jeVRleHQ6IHJlc291cmNlLnVyZ2VuY3lUZXh0LFxyXG4gIHNjaGVkdWxlQWN0aXZpdHlUZXh0OiByZXNvdXJjZS5zY2hlZHVsZUFjdGl2aXR5VGV4dCxcclxuICByZWxhdGVkVGlja2V0QWN0aXZpdGllc1RleHQ6IHJlc291cmNlLnJlbGF0ZWRUaWNrZXRBY3Rpdml0aWVzVGV4dCxcclxuICBsb2FkaW5nVGV4dDogcmVzb3VyY2UubG9hZGluZ1RleHQsXHJcbiAgZW50aXR5VGV4dDogcmVzb3VyY2UuZW50aXR5VGV4dCxcclxuXHJcbiAgLy8gVmlldyBQcm9wZXJ0aWVzXHJcbiAgaWQ6ICd0aWNrZXRfZGV0YWlsJyxcclxuICBlZGl0VmlldzogJ3RpY2tldF9lZGl0JyxcclxuICBlbmFibGVPZmZsaW5lOiB0cnVlLFxyXG4gIHJlc291cmNlS2luZDogJ3RpY2tldHMnLFxyXG4gIG1vZGVsTmFtZTogTU9ERUxfTkFNRVMuVElDS0VULFxyXG5cclxuICBzY2hlZHVsZUFjdGl2aXR5OiBmdW5jdGlvbiBzY2hlZHVsZUFjdGl2aXR5KCkge1xyXG4gICAgQXBwLm5hdmlnYXRlVG9BY3Rpdml0eUluc2VydFZpZXcoKTtcclxuICB9LFxyXG4gIGZvcm1hdFBpY2tsaXN0OiBmdW5jdGlvbiBmb3JtYXRQaWNrbGlzdChwcm9wZXJ0eSkge1xyXG4gICAgcmV0dXJuIGZvcm1hdC5waWNrbGlzdCh0aGlzLmFwcC5waWNrbGlzdFNlcnZpY2UsIHRoaXMuX21vZGVsLCBwcm9wZXJ0eSwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHtcclxuICAgICAgZGlzcGxheTogZm9ybWF0LlBpY2tsaXN0RGF0YURpc3BsYXlUeXBlLlRFWFQsXHJcbiAgICAgIHN0b3JhZ2U6IGZvcm1hdC5QaWNrbGlzdFN0b3JhZ2VUeXBlLklELFxyXG4gICAgfSk7XHJcbiAgfSxcclxuXHJcbiAgY3JlYXRlTGF5b3V0OiBmdW5jdGlvbiBjcmVhdGVMYXlvdXQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5sYXlvdXQgfHwgKHRoaXMubGF5b3V0ID0gW3tcclxuICAgICAgbGlzdDogdHJ1ZSxcclxuICAgICAgdGl0bGU6IHRoaXMuYWN0aW9uc1RleHQsXHJcbiAgICAgIGNsczogJ2FjdGlvbi1saXN0JyxcclxuICAgICAgbmFtZTogJ1F1aWNrQWN0aW9uc1NlY3Rpb24nLFxyXG4gICAgICBjaGlsZHJlbjogW3tcclxuICAgICAgICBuYW1lOiAnU2NoZWR1bGVBY3Rpdml0eUFjdGlvbicsXHJcbiAgICAgICAgcHJvcGVydHk6ICdUaWNrZXROdW1iZXInLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLnNjaGVkdWxlQWN0aXZpdHlUZXh0LFxyXG4gICAgICAgIGljb25DbGFzczogJ2NhbGVuZGFyJyxcclxuICAgICAgICBhY3Rpb246ICdzY2hlZHVsZUFjdGl2aXR5JyxcclxuICAgICAgfV0sXHJcbiAgICB9LCB7XHJcbiAgICAgIHRpdGxlOiB0aGlzLmRldGFpbHNUZXh0LFxyXG4gICAgICBuYW1lOiAnRGV0YWlsc1NlY3Rpb24nLFxyXG4gICAgICBjaGlsZHJlbjogW3tcclxuICAgICAgICBuYW1lOiAnQWNjb3VudC5BY2NvdW50TmFtZScsXHJcbiAgICAgICAgcHJvcGVydHk6ICdBY2NvdW50LkFjY291bnROYW1lJyxcclxuICAgICAgICBkZXNjcmlwdG9yOiAnQWNjb3VudC5BY2NvdW50TmFtZScsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMuYWNjb3VudFRleHQsXHJcbiAgICAgICAgdmlldzogJ2FjY291bnRfZGV0YWlsJyxcclxuICAgICAgICBrZXk6ICdBY2NvdW50LiRrZXknLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ0NvbnRhY3QuTmFtZUxGJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0NvbnRhY3QuTmFtZUxGJyxcclxuICAgICAgICBkZXNjcmlwdG9yOiAnQ29udGFjdC5OYW1lTEYnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLmNvbnRhY3RUZXh0LFxyXG4gICAgICAgIHZpZXc6ICdjb250YWN0X2RldGFpbCcsXHJcbiAgICAgICAga2V5OiAnQ29udGFjdC4ka2V5JyxcclxuICAgICAgfSwge1xyXG4gICAgICAgIGxhYmVsOiB0aGlzLmFzc2lnbmVkVG9UZXh0LFxyXG4gICAgICAgIG5hbWU6ICdBc3NpZ25lZFRvLk93bmVyRGVzY3JpcHRpb24nLFxyXG4gICAgICAgIHByb3BlcnR5OiAnQXNzaWduZWRUby5Pd25lckRlc2NyaXB0aW9uJyxcclxuICAgICAgfSwge1xyXG4gICAgICAgIGxhYmVsOiB0aGlzLnVyZ2VuY3lUZXh0LFxyXG4gICAgICAgIG5hbWU6ICdVcmdlbmN5LkRlc2NyaXB0aW9uJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ1VyZ2VuY3kuRGVzY3JpcHRpb24nLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbGFiZWw6IHRoaXMubmVlZEJ5VGV4dCxcclxuICAgICAgICBuYW1lOiAnTmVlZGVkQnlEYXRlJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ05lZWRlZEJ5RGF0ZScsXHJcbiAgICAgICAgcmVuZGVyZXI6IGZvcm1hdC5kYXRlLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbGFiZWw6IHRoaXMuYXJlYVRleHQsXHJcbiAgICAgICAgbmFtZTogJ0FyZWEnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnQXJlYScsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBsYWJlbDogdGhpcy5jYXRlZ29yeVRleHQsXHJcbiAgICAgICAgbmFtZTogJ0NhdGVnb3J5JyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0NhdGVnb3J5JyxcclxuICAgICAgfSwge1xyXG4gICAgICAgIGxhYmVsOiB0aGlzLmlzc3VlVGV4dCxcclxuICAgICAgICBuYW1lOiAnSXNzdWUnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnSXNzdWUnLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbGFiZWw6IHRoaXMuc3ViamVjdFRleHQsXHJcbiAgICAgICAgbmFtZTogJ1N1YmplY3QnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnU3ViamVjdCcsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBsYWJlbDogdGhpcy5kZXNjcmlwdGlvblRleHQsXHJcbiAgICAgICAgbmFtZTogJ1RpY2tldFByb2JsZW0uTm90ZXMnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnVGlja2V0UHJvYmxlbS5Ob3RlcycsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBsYWJlbDogdGhpcy5zdGF0dXNUZXh0LFxyXG4gICAgICAgIG5hbWU6ICdTdGF0dXNDb2RlJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ1N0YXR1c0NvZGUnLFxyXG4gICAgICAgIHJlbmRlcmVyOiB0aGlzLmZvcm1hdFBpY2tsaXN0KCdTdGF0dXNDb2RlJyksXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBsYWJlbDogdGhpcy5jb21wbGV0ZWRCeVRleHQsXHJcbiAgICAgICAgbmFtZTogJ0NvbXBsZXRlZEJ5Lk93bmVyRGVzY3JpcHRpb24nLFxyXG4gICAgICAgIHByb3BlcnR5OiAnQ29tcGxldGVkQnkuT3duZXJEZXNjcmlwdGlvbicsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBsYWJlbDogdGhpcy5jb250cmFjdFRleHQsXHJcbiAgICAgICAgbmFtZTogJ0NvbnRyYWN0LlJlZmVyZW5jZU51bWJlcicsXHJcbiAgICAgICAgcHJvcGVydHk6ICdDb250cmFjdC5SZWZlcmVuY2VOdW1iZXInLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbGFiZWw6IHRoaXMuc291cmNlVGV4dCxcclxuICAgICAgICBuYW1lOiAnVmlhQ29kZScsXHJcbiAgICAgICAgcHJvcGVydHk6ICdWaWFDb2RlJyxcclxuICAgICAgICByZW5kZXJlcjogdGhpcy5mb3JtYXRQaWNrbGlzdCgnVmlhQ29kZScpLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbGFiZWw6IHRoaXMuYXNzaWduZWREYXRlVGV4dCxcclxuICAgICAgICBuYW1lOiAnQXNzaWduZWREYXRlJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0Fzc2lnbmVkRGF0ZScsXHJcbiAgICAgICAgcmVuZGVyZXI6IGZvcm1hdC5kYXRlLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbGFiZWw6IHRoaXMucmVzb2x1dGlvblRleHQsXHJcbiAgICAgICAgbmFtZTogJ1RpY2tldFNvbHV0aW9uLk5vdGVzJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ1RpY2tldFNvbHV0aW9uLk5vdGVzJyxcclxuICAgICAgfSwge1xyXG4gICAgICAgIGxhYmVsOiB0aGlzLm5vdGVzVGV4dCxcclxuICAgICAgICBuYW1lOiAnTm90ZXMnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnTm90ZXMnLFxyXG4gICAgICB9XSxcclxuICAgIH0sIHtcclxuICAgICAgbGlzdDogdHJ1ZSxcclxuICAgICAgdGl0bGU6IHRoaXMucmVsYXRlZEl0ZW1zVGV4dCxcclxuICAgICAgbmFtZTogJ1JlbGF0ZWRJdGVtc1NlY3Rpb24nLFxyXG4gICAgICBjaGlsZHJlbjogW3tcclxuICAgICAgICBuYW1lOiAnQWN0aXZpdHlSZWxhdGVkJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5yZWxhdGVkQWN0aXZpdGllc1RleHQsXHJcbiAgICAgICAgdmlldzogJ2FjdGl2aXR5X3JlbGF0ZWQnLFxyXG4gICAgICAgIHdoZXJlOiB0aGlzLmZvcm1hdFJlbGF0ZWRRdWVyeS5iaW5kRGVsZWdhdGUodGhpcywgJ1RpY2tldElkIGVxIFwiJHswfVwiJyksXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnVGlja2V0QWN0aXZpdHlSZWxhdGVkJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5yZWxhdGVkVGlja2V0QWN0aXZpdGllc1RleHQsXHJcbiAgICAgICAgdmlldzogJ3RpY2tldGFjdGl2aXR5X3JlbGF0ZWQnLFxyXG4gICAgICAgIHdoZXJlOiB0aGlzLmZvcm1hdFJlbGF0ZWRRdWVyeS5iaW5kRGVsZWdhdGUodGhpcywgJ1RpY2tldC5JZCBlcSBcIiR7MH1cIicpLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ0F0dGFjaG1lbnRSZWxhdGVkJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5yZWxhdGVkQXR0YWNobWVudFRleHQsXHJcbiAgICAgICAgd2hlcmU6IHRoaXMuZm9ybWF0UmVsYXRlZFF1ZXJ5LmJpbmREZWxlZ2F0ZSh0aGlzLCAndGlja2V0SWQgZXEgXCIkezB9XCInKSwgLy8gbXVzdCBiZSBsb3dlciBjYXNlIGJlY2F1c2Ugb2YgZmVlZFxyXG4gICAgICAgIHZpZXc6ICd0aWNrZXRfYXR0YWNobWVudF9yZWxhdGVkJyxcclxuICAgICAgICB0aXRsZTogdGhpcy5yZWxhdGVkQXR0YWNobWVudFRpdGxlVGV4dCxcclxuICAgICAgfV0sXHJcbiAgICB9XSk7XHJcbiAgfSxcclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBfX2NsYXNzO1xyXG4iXX0=
define('crm/Views/TicketActivity/Detail', ['module', 'exports', 'dojo/_base/declare', '../../Format', '../../Template', 'argos/Detail', 'argos/I18n', '../../Models/Names'], function (module, exports, _declare, _Format, _Template, _Detail, _I18n, _Names) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _Format2 = _interopRequireDefault(_Format);

  var _Template2 = _interopRequireDefault(_Template);

  var _Detail2 = _interopRequireDefault(_Detail);

  var _I18n2 = _interopRequireDefault(_I18n);

  var _Names2 = _interopRequireDefault(_Names);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

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

  var resource = (0, _I18n2.default)('ticketActivityDetail');

  /**
   * @class crm.Views.TicketActivity.Detail
   *
   * @extends argos.Detail
   *
   * @requires argos.ErrorManager
   * @requires argos.Format
   *
   * @requires crm.Format
   * @requires crm.Template
   */

  // import 'dojo/NodeList-manipulate';
  var __class = (0, _declare2.default)('crm.Views.TicketActivity.Detail', [_Detail2.default], {
    // Localization
    titleText: resource.titleText,
    accountText: resource.accountText,
    contactText: resource.contactText,
    typeText: resource.typeText,
    publicAccessText: resource.publicAccessText,
    assignedDateText: resource.assignedDateText,
    completedDateText: resource.completedDateText,
    followUpText: resource.followUpText,
    unitsText: resource.unitsText,
    elapsedUnitsText: resource.elapsedUnitsText,
    rateTypeDescriptionText: resource.rateTypeDescriptionText,
    rateText: resource.rateText,
    totalLaborText: resource.totalLaborText,
    totalPartsText: resource.totalPartsText,
    totalFeeText: resource.totalFeeText,
    activityDescriptionText: resource.activityDescriptionText,
    ticketNumberText: resource.ticketNumberText,
    userText: resource.userText,
    entityText: resource.entityText,
    completeTicketText: resource.completeTicketText,
    relatedItemsText: resource.relatedItemsText,
    relatedTicketActivityItemText: resource.relatedTicketActivityItemText,

    // View Properties
    id: 'ticketactivity_detail',
    editView: 'ticketactivity_edit',

    querySelect: [],
    modelName: _Names2.default.TICKETACTIVITY,
    resourceKind: 'ticketActivities',

    formatPicklist: function formatPicklist(property) {
      // TODO: This should be changed on the entity level...
      // Special case since this is for some reason stored as $key value on the entity
      return _Format2.default.picklist(this.app.picklistService, this._model, property, undefined, undefined, {
        display: 2,
        storage: 1
      });
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
    setNodeText: function setNodeText(node, value) {
      $(node).removeClass('content-loading');

      $('span', node).text(value);
    },

    createLayout: function createLayout() {
      return this.layout || (this.layout = [{
        title: this.detailsText,
        name: 'DetailsSection',
        children: [{
          label: this.activityDescriptionText,
          name: 'ActivityDescription',
          property: 'ActivityDescription'
        }, {
          label: this.ticketNumberText,
          name: 'Ticket.TicketNumber',
          property: 'Ticket.TicketNumber',
          view: 'ticket_detail',
          key: 'Ticket.$key'
        }, {
          name: 'Ticket.Account.AccountName',
          property: 'Ticket.Account.AccountName',
          descriptor: 'Ticket.Account.AccountName',
          label: this.accountText,
          view: 'account_detail',
          key: 'Ticket.Account.$key'
        }, {
          name: 'Ticket.Contact',
          property: 'Ticket.Contact.Name',
          descriptor: 'Ticket.Contact.Name',
          label: this.contactText,
          view: 'contact_detail',
          key: 'Ticket.Contact.$key'
        }, {
          name: 'User.UserInfo',
          property: 'User.UserInfo',
          label: this.userText,
          tpl: _Template2.default.nameLF
        }, {
          label: this.typeText,
          name: 'ActivityTypeCode',
          property: 'ActivityTypeCode',
          renderer: this.formatPicklist('ActivityTypeCode')
        }, {
          label: this.publicAccessText,
          name: 'PublicAccessCode',
          property: 'PublicAccessCode',
          renderer: this.formatPicklist('PublicAccessCode')
        }, {
          label: this.assignedDateText,
          name: 'AssignedDate',
          property: 'AssignedDate',
          renderer: _Format2.default.date
        }, {
          label: this.completedDateText,
          name: 'CompletedDate',
          property: 'CompletedDate',
          renderer: _Format2.default.date
        }, {
          label: this.followUpText,
          name: 'FollowUp',
          property: 'FollowUp',
          renderer: _Format2.default.yesNo
        }, {
          label: this.unitsText,
          name: 'Units',
          property: 'Units'
        }, {
          label: this.elapsedUnitsText,
          name: 'ElapsedUnits',
          property: 'ElapsedUnits',
          renderer: _Format2.default.fixedLocale
        }, {
          label: this.rateTypeDescriptionText,
          name: 'RateTypeDescription.RateTypeCode',
          property: 'RateTypeDescription.RateTypeCode'
        }, {
          label: this.rateText,
          name: 'Rate',
          property: 'Rate',
          renderer: _Format2.default.currency
        }, {
          label: this.totalLaborText,
          name: 'TotalLabor',
          property: 'TotalLabor',
          renderer: _Format2.default.currency
        }, {
          label: this.totalPartsText,
          name: 'TotalParts',
          property: 'TotalParts',
          renderer: _Format2.default.currency
        }, {
          label: this.totalFeeText,
          name: 'TotalFee',
          property: 'TotalFee',
          renderer: _Format2.default.currency
        }]
      }, {
        list: true,
        title: this.relatedItemsText,
        name: 'RelatedItemsSection',
        children: [{
          name: 'TicketActivityItemRelated',
          label: this.relatedTicketActivityItemText,
          where: this.formatRelatedQuery.bindDelegate(this, 'TicketActivity.Id eq "${0}"'),
          view: 'ticketactivityitem_related'
        }]
      }]);
    }
  });

  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9WaWV3cy9UaWNrZXRBY3Rpdml0eS9EZXRhaWwuanMiXSwibmFtZXMiOlsicmVzb3VyY2UiLCJfX2NsYXNzIiwidGl0bGVUZXh0IiwiYWNjb3VudFRleHQiLCJjb250YWN0VGV4dCIsInR5cGVUZXh0IiwicHVibGljQWNjZXNzVGV4dCIsImFzc2lnbmVkRGF0ZVRleHQiLCJjb21wbGV0ZWREYXRlVGV4dCIsImZvbGxvd1VwVGV4dCIsInVuaXRzVGV4dCIsImVsYXBzZWRVbml0c1RleHQiLCJyYXRlVHlwZURlc2NyaXB0aW9uVGV4dCIsInJhdGVUZXh0IiwidG90YWxMYWJvclRleHQiLCJ0b3RhbFBhcnRzVGV4dCIsInRvdGFsRmVlVGV4dCIsImFjdGl2aXR5RGVzY3JpcHRpb25UZXh0IiwidGlja2V0TnVtYmVyVGV4dCIsInVzZXJUZXh0IiwiZW50aXR5VGV4dCIsImNvbXBsZXRlVGlja2V0VGV4dCIsInJlbGF0ZWRJdGVtc1RleHQiLCJyZWxhdGVkVGlja2V0QWN0aXZpdHlJdGVtVGV4dCIsImlkIiwiZWRpdFZpZXciLCJxdWVyeVNlbGVjdCIsIm1vZGVsTmFtZSIsIlRJQ0tFVEFDVElWSVRZIiwicmVzb3VyY2VLaW5kIiwiZm9ybWF0UGlja2xpc3QiLCJwcm9wZXJ0eSIsInBpY2tsaXN0IiwiYXBwIiwicGlja2xpc3RTZXJ2aWNlIiwiX21vZGVsIiwidW5kZWZpbmVkIiwiZGlzcGxheSIsInN0b3JhZ2UiLCJwcm9jZXNzQ29kZURhdGFGZWVkIiwiZmVlZCIsImN1cnJlbnRWYWx1ZSIsIm9wdGlvbnMiLCJrZXlQcm9wZXJ0eSIsInRleHRQcm9wZXJ0eSIsImkiLCIkcmVzb3VyY2VzIiwibGVuZ3RoIiwic2V0Tm9kZVRleHQiLCJub2RlIiwidmFsdWUiLCIkIiwicmVtb3ZlQ2xhc3MiLCJ0ZXh0IiwiY3JlYXRlTGF5b3V0IiwibGF5b3V0IiwidGl0bGUiLCJkZXRhaWxzVGV4dCIsIm5hbWUiLCJjaGlsZHJlbiIsImxhYmVsIiwidmlldyIsImtleSIsImRlc2NyaXB0b3IiLCJ0cGwiLCJuYW1lTEYiLCJyZW5kZXJlciIsImRhdGUiLCJ5ZXNObyIsImZpeGVkTG9jYWxlIiwiY3VycmVuY3kiLCJsaXN0Iiwid2hlcmUiLCJmb3JtYXRSZWxhdGVkUXVlcnkiLCJiaW5kRGVsZWdhdGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7OztBQXVCQSxNQUFNQSxXQUFXLG9CQUFZLHNCQUFaLENBQWpCOztBQUVBOzs7Ozs7Ozs7Ozs7QUFMQTtBQWdCQSxNQUFNQyxVQUFVLHVCQUFRLGlDQUFSLEVBQTJDLGtCQUEzQyxFQUFxRDtBQUNuRTtBQUNBQyxlQUFXRixTQUFTRSxTQUYrQztBQUduRUMsaUJBQWFILFNBQVNHLFdBSDZDO0FBSW5FQyxpQkFBYUosU0FBU0ksV0FKNkM7QUFLbkVDLGNBQVVMLFNBQVNLLFFBTGdEO0FBTW5FQyxzQkFBa0JOLFNBQVNNLGdCQU53QztBQU9uRUMsc0JBQWtCUCxTQUFTTyxnQkFQd0M7QUFRbkVDLHVCQUFtQlIsU0FBU1EsaUJBUnVDO0FBU25FQyxrQkFBY1QsU0FBU1MsWUFUNEM7QUFVbkVDLGVBQVdWLFNBQVNVLFNBVitDO0FBV25FQyxzQkFBa0JYLFNBQVNXLGdCQVh3QztBQVluRUMsNkJBQXlCWixTQUFTWSx1QkFaaUM7QUFhbkVDLGNBQVViLFNBQVNhLFFBYmdEO0FBY25FQyxvQkFBZ0JkLFNBQVNjLGNBZDBDO0FBZW5FQyxvQkFBZ0JmLFNBQVNlLGNBZjBDO0FBZ0JuRUMsa0JBQWNoQixTQUFTZ0IsWUFoQjRDO0FBaUJuRUMsNkJBQXlCakIsU0FBU2lCLHVCQWpCaUM7QUFrQm5FQyxzQkFBa0JsQixTQUFTa0IsZ0JBbEJ3QztBQW1CbkVDLGNBQVVuQixTQUFTbUIsUUFuQmdEO0FBb0JuRUMsZ0JBQVlwQixTQUFTb0IsVUFwQjhDO0FBcUJuRUMsd0JBQW9CckIsU0FBU3FCLGtCQXJCc0M7QUFzQm5FQyxzQkFBa0J0QixTQUFTc0IsZ0JBdEJ3QztBQXVCbkVDLG1DQUErQnZCLFNBQVN1Qiw2QkF2QjJCOztBQXlCbkU7QUFDQUMsUUFBSSx1QkExQitEO0FBMkJuRUMsY0FBVSxxQkEzQnlEOztBQTZCbkVDLGlCQUFhLEVBN0JzRDtBQThCbkVDLGVBQVcsZ0JBQVlDLGNBOUI0QztBQStCbkVDLGtCQUFjLGtCQS9CcUQ7O0FBaUNuRUMsb0JBQWdCLFNBQVNBLGNBQVQsQ0FBd0JDLFFBQXhCLEVBQWtDO0FBQ2hEO0FBQ0E7QUFDQSxhQUFPLGlCQUFPQyxRQUFQLENBQWdCLEtBQUtDLEdBQUwsQ0FBU0MsZUFBekIsRUFBMEMsS0FBS0MsTUFBL0MsRUFBdURKLFFBQXZELEVBQWlFSyxTQUFqRSxFQUE0RUEsU0FBNUUsRUFBdUY7QUFDNUZDLGlCQUFTLENBRG1GO0FBRTVGQyxpQkFBUztBQUZtRixPQUF2RixDQUFQO0FBSUQsS0F4Q2tFO0FBeUNuRUMseUJBQXFCLFNBQVNBLG1CQUFULENBQTZCQyxJQUE3QixFQUFtQ0MsWUFBbkMsRUFBaURDLE9BQWpELEVBQTBEO0FBQzdFLFVBQU1DLGNBQWNELFdBQVdBLFFBQVFDLFdBQW5CLEdBQWlDRCxRQUFRQyxXQUF6QyxHQUF1RCxNQUEzRTtBQUNBLFVBQU1DLGVBQWVGLFdBQVdBLFFBQVFFLFlBQW5CLEdBQWtDRixRQUFRRSxZQUExQyxHQUF5RCxNQUE5RTs7QUFFQSxXQUFLLElBQUlDLElBQUksQ0FBYixFQUFnQkEsSUFBSUwsS0FBS00sVUFBTCxDQUFnQkMsTUFBcEMsRUFBNENGLEdBQTVDLEVBQWlEO0FBQy9DLFlBQUlMLEtBQUtNLFVBQUwsQ0FBZ0JELENBQWhCLEVBQW1CRixXQUFuQixNQUFvQ0YsWUFBeEMsRUFBc0Q7QUFDcEQsaUJBQU9ELEtBQUtNLFVBQUwsQ0FBZ0JELENBQWhCLEVBQW1CRCxZQUFuQixDQUFQO0FBQ0Q7QUFDRjs7QUFFRCxhQUFPSCxZQUFQO0FBQ0QsS0FwRGtFO0FBcURuRU8saUJBQWEsU0FBU0EsV0FBVCxDQUFxQkMsSUFBckIsRUFBMkJDLEtBQTNCLEVBQWtDO0FBQzdDQyxRQUFFRixJQUFGLEVBQVFHLFdBQVIsQ0FBb0IsaUJBQXBCOztBQUVBRCxRQUFFLE1BQUYsRUFBVUYsSUFBVixFQUFnQkksSUFBaEIsQ0FBcUJILEtBQXJCO0FBQ0QsS0F6RGtFOztBQTJEbkVJLGtCQUFjLFNBQVNBLFlBQVQsR0FBd0I7QUFDcEMsYUFBTyxLQUFLQyxNQUFMLEtBQWdCLEtBQUtBLE1BQUwsR0FBYyxDQUFDO0FBQ3BDQyxlQUFPLEtBQUtDLFdBRHdCO0FBRXBDQyxjQUFNLGdCQUY4QjtBQUdwQ0Msa0JBQVUsQ0FBQztBQUNUQyxpQkFBTyxLQUFLM0MsdUJBREg7QUFFVHlDLGdCQUFNLHFCQUZHO0FBR1QzQixvQkFBVTtBQUhELFNBQUQsRUFJUDtBQUNENkIsaUJBQU8sS0FBSzFDLGdCQURYO0FBRUR3QyxnQkFBTSxxQkFGTDtBQUdEM0Isb0JBQVUscUJBSFQ7QUFJRDhCLGdCQUFNLGVBSkw7QUFLREMsZUFBSztBQUxKLFNBSk8sRUFVUDtBQUNESixnQkFBTSw0QkFETDtBQUVEM0Isb0JBQVUsNEJBRlQ7QUFHRGdDLHNCQUFZLDRCQUhYO0FBSURILGlCQUFPLEtBQUt6RCxXQUpYO0FBS0QwRCxnQkFBTSxnQkFMTDtBQU1EQyxlQUFLO0FBTkosU0FWTyxFQWlCUDtBQUNESixnQkFBTSxnQkFETDtBQUVEM0Isb0JBQVUscUJBRlQ7QUFHRGdDLHNCQUFZLHFCQUhYO0FBSURILGlCQUFPLEtBQUt4RCxXQUpYO0FBS0R5RCxnQkFBTSxnQkFMTDtBQU1EQyxlQUFLO0FBTkosU0FqQk8sRUF3QlA7QUFDREosZ0JBQU0sZUFETDtBQUVEM0Isb0JBQVUsZUFGVDtBQUdENkIsaUJBQU8sS0FBS3pDLFFBSFg7QUFJRDZDLGVBQUssbUJBQVNDO0FBSmIsU0F4Qk8sRUE2QlA7QUFDREwsaUJBQU8sS0FBS3ZELFFBRFg7QUFFRHFELGdCQUFNLGtCQUZMO0FBR0QzQixvQkFBVSxrQkFIVDtBQUlEbUMsb0JBQVUsS0FBS3BDLGNBQUwsQ0FBb0Isa0JBQXBCO0FBSlQsU0E3Qk8sRUFrQ1A7QUFDRDhCLGlCQUFPLEtBQUt0RCxnQkFEWDtBQUVEb0QsZ0JBQU0sa0JBRkw7QUFHRDNCLG9CQUFVLGtCQUhUO0FBSURtQyxvQkFBVSxLQUFLcEMsY0FBTCxDQUFvQixrQkFBcEI7QUFKVCxTQWxDTyxFQXVDUDtBQUNEOEIsaUJBQU8sS0FBS3JELGdCQURYO0FBRURtRCxnQkFBTSxjQUZMO0FBR0QzQixvQkFBVSxjQUhUO0FBSURtQyxvQkFBVSxpQkFBT0M7QUFKaEIsU0F2Q08sRUE0Q1A7QUFDRFAsaUJBQU8sS0FBS3BELGlCQURYO0FBRURrRCxnQkFBTSxlQUZMO0FBR0QzQixvQkFBVSxlQUhUO0FBSURtQyxvQkFBVSxpQkFBT0M7QUFKaEIsU0E1Q08sRUFpRFA7QUFDRFAsaUJBQU8sS0FBS25ELFlBRFg7QUFFRGlELGdCQUFNLFVBRkw7QUFHRDNCLG9CQUFVLFVBSFQ7QUFJRG1DLG9CQUFVLGlCQUFPRTtBQUpoQixTQWpETyxFQXNEUDtBQUNEUixpQkFBTyxLQUFLbEQsU0FEWDtBQUVEZ0QsZ0JBQU0sT0FGTDtBQUdEM0Isb0JBQVU7QUFIVCxTQXRETyxFQTBEUDtBQUNENkIsaUJBQU8sS0FBS2pELGdCQURYO0FBRUQrQyxnQkFBTSxjQUZMO0FBR0QzQixvQkFBVSxjQUhUO0FBSURtQyxvQkFBVSxpQkFBT0c7QUFKaEIsU0ExRE8sRUErRFA7QUFDRFQsaUJBQU8sS0FBS2hELHVCQURYO0FBRUQ4QyxnQkFBTSxrQ0FGTDtBQUdEM0Isb0JBQVU7QUFIVCxTQS9ETyxFQW1FUDtBQUNENkIsaUJBQU8sS0FBSy9DLFFBRFg7QUFFRDZDLGdCQUFNLE1BRkw7QUFHRDNCLG9CQUFVLE1BSFQ7QUFJRG1DLG9CQUFVLGlCQUFPSTtBQUpoQixTQW5FTyxFQXdFUDtBQUNEVixpQkFBTyxLQUFLOUMsY0FEWDtBQUVENEMsZ0JBQU0sWUFGTDtBQUdEM0Isb0JBQVUsWUFIVDtBQUlEbUMsb0JBQVUsaUJBQU9JO0FBSmhCLFNBeEVPLEVBNkVQO0FBQ0RWLGlCQUFPLEtBQUs3QyxjQURYO0FBRUQyQyxnQkFBTSxZQUZMO0FBR0QzQixvQkFBVSxZQUhUO0FBSURtQyxvQkFBVSxpQkFBT0k7QUFKaEIsU0E3RU8sRUFrRlA7QUFDRFYsaUJBQU8sS0FBSzVDLFlBRFg7QUFFRDBDLGdCQUFNLFVBRkw7QUFHRDNCLG9CQUFVLFVBSFQ7QUFJRG1DLG9CQUFVLGlCQUFPSTtBQUpoQixTQWxGTztBQUgwQixPQUFELEVBMkZsQztBQUNEQyxjQUFNLElBREw7QUFFRGYsZUFBTyxLQUFLbEMsZ0JBRlg7QUFHRG9DLGNBQU0scUJBSEw7QUFJREMsa0JBQVUsQ0FBQztBQUNURCxnQkFBTSwyQkFERztBQUVURSxpQkFBTyxLQUFLckMsNkJBRkg7QUFHVGlELGlCQUFPLEtBQUtDLGtCQUFMLENBQXdCQyxZQUF4QixDQUFxQyxJQUFyQyxFQUEyQyw2QkFBM0MsQ0FIRTtBQUlUYixnQkFBTTtBQUpHLFNBQUQ7QUFKVCxPQTNGa0MsQ0FBOUIsQ0FBUDtBQXNHRDtBQWxLa0UsR0FBckQsQ0FBaEI7O29CQXFLZTVELE8iLCJmaWxlIjoiRGV0YWlsLmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAyMDE3IEluZm9yXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuaW1wb3J0IGRlY2xhcmUgZnJvbSAnZG9qby9fYmFzZS9kZWNsYXJlJztcclxuaW1wb3J0IGZvcm1hdCBmcm9tICcuLi8uLi9Gb3JtYXQnO1xyXG5pbXBvcnQgdGVtcGxhdGUgZnJvbSAnLi4vLi4vVGVtcGxhdGUnO1xyXG5pbXBvcnQgRGV0YWlsIGZyb20gJ2FyZ29zL0RldGFpbCc7XHJcbmltcG9ydCBnZXRSZXNvdXJjZSBmcm9tICdhcmdvcy9JMThuJztcclxuLy8gaW1wb3J0ICdkb2pvL05vZGVMaXN0LW1hbmlwdWxhdGUnO1xyXG5pbXBvcnQgTU9ERUxfTkFNRVMgZnJvbSAnLi4vLi4vTW9kZWxzL05hbWVzJztcclxuXHJcbmNvbnN0IHJlc291cmNlID0gZ2V0UmVzb3VyY2UoJ3RpY2tldEFjdGl2aXR5RGV0YWlsJyk7XHJcblxyXG4vKipcclxuICogQGNsYXNzIGNybS5WaWV3cy5UaWNrZXRBY3Rpdml0eS5EZXRhaWxcclxuICpcclxuICogQGV4dGVuZHMgYXJnb3MuRGV0YWlsXHJcbiAqXHJcbiAqIEByZXF1aXJlcyBhcmdvcy5FcnJvck1hbmFnZXJcclxuICogQHJlcXVpcmVzIGFyZ29zLkZvcm1hdFxyXG4gKlxyXG4gKiBAcmVxdWlyZXMgY3JtLkZvcm1hdFxyXG4gKiBAcmVxdWlyZXMgY3JtLlRlbXBsYXRlXHJcbiAqL1xyXG5jb25zdCBfX2NsYXNzID0gZGVjbGFyZSgnY3JtLlZpZXdzLlRpY2tldEFjdGl2aXR5LkRldGFpbCcsIFtEZXRhaWxdLCB7XHJcbiAgLy8gTG9jYWxpemF0aW9uXHJcbiAgdGl0bGVUZXh0OiByZXNvdXJjZS50aXRsZVRleHQsXHJcbiAgYWNjb3VudFRleHQ6IHJlc291cmNlLmFjY291bnRUZXh0LFxyXG4gIGNvbnRhY3RUZXh0OiByZXNvdXJjZS5jb250YWN0VGV4dCxcclxuICB0eXBlVGV4dDogcmVzb3VyY2UudHlwZVRleHQsXHJcbiAgcHVibGljQWNjZXNzVGV4dDogcmVzb3VyY2UucHVibGljQWNjZXNzVGV4dCxcclxuICBhc3NpZ25lZERhdGVUZXh0OiByZXNvdXJjZS5hc3NpZ25lZERhdGVUZXh0LFxyXG4gIGNvbXBsZXRlZERhdGVUZXh0OiByZXNvdXJjZS5jb21wbGV0ZWREYXRlVGV4dCxcclxuICBmb2xsb3dVcFRleHQ6IHJlc291cmNlLmZvbGxvd1VwVGV4dCxcclxuICB1bml0c1RleHQ6IHJlc291cmNlLnVuaXRzVGV4dCxcclxuICBlbGFwc2VkVW5pdHNUZXh0OiByZXNvdXJjZS5lbGFwc2VkVW5pdHNUZXh0LFxyXG4gIHJhdGVUeXBlRGVzY3JpcHRpb25UZXh0OiByZXNvdXJjZS5yYXRlVHlwZURlc2NyaXB0aW9uVGV4dCxcclxuICByYXRlVGV4dDogcmVzb3VyY2UucmF0ZVRleHQsXHJcbiAgdG90YWxMYWJvclRleHQ6IHJlc291cmNlLnRvdGFsTGFib3JUZXh0LFxyXG4gIHRvdGFsUGFydHNUZXh0OiByZXNvdXJjZS50b3RhbFBhcnRzVGV4dCxcclxuICB0b3RhbEZlZVRleHQ6IHJlc291cmNlLnRvdGFsRmVlVGV4dCxcclxuICBhY3Rpdml0eURlc2NyaXB0aW9uVGV4dDogcmVzb3VyY2UuYWN0aXZpdHlEZXNjcmlwdGlvblRleHQsXHJcbiAgdGlja2V0TnVtYmVyVGV4dDogcmVzb3VyY2UudGlja2V0TnVtYmVyVGV4dCxcclxuICB1c2VyVGV4dDogcmVzb3VyY2UudXNlclRleHQsXHJcbiAgZW50aXR5VGV4dDogcmVzb3VyY2UuZW50aXR5VGV4dCxcclxuICBjb21wbGV0ZVRpY2tldFRleHQ6IHJlc291cmNlLmNvbXBsZXRlVGlja2V0VGV4dCxcclxuICByZWxhdGVkSXRlbXNUZXh0OiByZXNvdXJjZS5yZWxhdGVkSXRlbXNUZXh0LFxyXG4gIHJlbGF0ZWRUaWNrZXRBY3Rpdml0eUl0ZW1UZXh0OiByZXNvdXJjZS5yZWxhdGVkVGlja2V0QWN0aXZpdHlJdGVtVGV4dCxcclxuXHJcbiAgLy8gVmlldyBQcm9wZXJ0aWVzXHJcbiAgaWQ6ICd0aWNrZXRhY3Rpdml0eV9kZXRhaWwnLFxyXG4gIGVkaXRWaWV3OiAndGlja2V0YWN0aXZpdHlfZWRpdCcsXHJcblxyXG4gIHF1ZXJ5U2VsZWN0OiBbXSxcclxuICBtb2RlbE5hbWU6IE1PREVMX05BTUVTLlRJQ0tFVEFDVElWSVRZLFxyXG4gIHJlc291cmNlS2luZDogJ3RpY2tldEFjdGl2aXRpZXMnLFxyXG5cclxuICBmb3JtYXRQaWNrbGlzdDogZnVuY3Rpb24gZm9ybWF0UGlja2xpc3QocHJvcGVydHkpIHtcclxuICAgIC8vIFRPRE86IFRoaXMgc2hvdWxkIGJlIGNoYW5nZWQgb24gdGhlIGVudGl0eSBsZXZlbC4uLlxyXG4gICAgLy8gU3BlY2lhbCBjYXNlIHNpbmNlIHRoaXMgaXMgZm9yIHNvbWUgcmVhc29uIHN0b3JlZCBhcyAka2V5IHZhbHVlIG9uIHRoZSBlbnRpdHlcclxuICAgIHJldHVybiBmb3JtYXQucGlja2xpc3QodGhpcy5hcHAucGlja2xpc3RTZXJ2aWNlLCB0aGlzLl9tb2RlbCwgcHJvcGVydHksIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB7XHJcbiAgICAgIGRpc3BsYXk6IDIsXHJcbiAgICAgIHN0b3JhZ2U6IDEsXHJcbiAgICB9KTtcclxuICB9LFxyXG4gIHByb2Nlc3NDb2RlRGF0YUZlZWQ6IGZ1bmN0aW9uIHByb2Nlc3NDb2RlRGF0YUZlZWQoZmVlZCwgY3VycmVudFZhbHVlLCBvcHRpb25zKSB7XHJcbiAgICBjb25zdCBrZXlQcm9wZXJ0eSA9IG9wdGlvbnMgJiYgb3B0aW9ucy5rZXlQcm9wZXJ0eSA/IG9wdGlvbnMua2V5UHJvcGVydHkgOiAnJGtleSc7XHJcbiAgICBjb25zdCB0ZXh0UHJvcGVydHkgPSBvcHRpb25zICYmIG9wdGlvbnMudGV4dFByb3BlcnR5ID8gb3B0aW9ucy50ZXh0UHJvcGVydHkgOiAndGV4dCc7XHJcblxyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBmZWVkLiRyZXNvdXJjZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgaWYgKGZlZWQuJHJlc291cmNlc1tpXVtrZXlQcm9wZXJ0eV0gPT09IGN1cnJlbnRWYWx1ZSkge1xyXG4gICAgICAgIHJldHVybiBmZWVkLiRyZXNvdXJjZXNbaV1bdGV4dFByb3BlcnR5XTtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBjdXJyZW50VmFsdWU7XHJcbiAgfSxcclxuICBzZXROb2RlVGV4dDogZnVuY3Rpb24gc2V0Tm9kZVRleHQobm9kZSwgdmFsdWUpIHtcclxuICAgICQobm9kZSkucmVtb3ZlQ2xhc3MoJ2NvbnRlbnQtbG9hZGluZycpO1xyXG5cclxuICAgICQoJ3NwYW4nLCBub2RlKS50ZXh0KHZhbHVlKTtcclxuICB9LFxyXG5cclxuICBjcmVhdGVMYXlvdXQ6IGZ1bmN0aW9uIGNyZWF0ZUxheW91dCgpIHtcclxuICAgIHJldHVybiB0aGlzLmxheW91dCB8fCAodGhpcy5sYXlvdXQgPSBbe1xyXG4gICAgICB0aXRsZTogdGhpcy5kZXRhaWxzVGV4dCxcclxuICAgICAgbmFtZTogJ0RldGFpbHNTZWN0aW9uJyxcclxuICAgICAgY2hpbGRyZW46IFt7XHJcbiAgICAgICAgbGFiZWw6IHRoaXMuYWN0aXZpdHlEZXNjcmlwdGlvblRleHQsXHJcbiAgICAgICAgbmFtZTogJ0FjdGl2aXR5RGVzY3JpcHRpb24nLFxyXG4gICAgICAgIHByb3BlcnR5OiAnQWN0aXZpdHlEZXNjcmlwdGlvbicsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBsYWJlbDogdGhpcy50aWNrZXROdW1iZXJUZXh0LFxyXG4gICAgICAgIG5hbWU6ICdUaWNrZXQuVGlja2V0TnVtYmVyJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ1RpY2tldC5UaWNrZXROdW1iZXInLFxyXG4gICAgICAgIHZpZXc6ICd0aWNrZXRfZGV0YWlsJyxcclxuICAgICAgICBrZXk6ICdUaWNrZXQuJGtleScsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnVGlja2V0LkFjY291bnQuQWNjb3VudE5hbWUnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnVGlja2V0LkFjY291bnQuQWNjb3VudE5hbWUnLFxyXG4gICAgICAgIGRlc2NyaXB0b3I6ICdUaWNrZXQuQWNjb3VudC5BY2NvdW50TmFtZScsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMuYWNjb3VudFRleHQsXHJcbiAgICAgICAgdmlldzogJ2FjY291bnRfZGV0YWlsJyxcclxuICAgICAgICBrZXk6ICdUaWNrZXQuQWNjb3VudC4ka2V5JyxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdUaWNrZXQuQ29udGFjdCcsXHJcbiAgICAgICAgcHJvcGVydHk6ICdUaWNrZXQuQ29udGFjdC5OYW1lJyxcclxuICAgICAgICBkZXNjcmlwdG9yOiAnVGlja2V0LkNvbnRhY3QuTmFtZScsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMuY29udGFjdFRleHQsXHJcbiAgICAgICAgdmlldzogJ2NvbnRhY3RfZGV0YWlsJyxcclxuICAgICAgICBrZXk6ICdUaWNrZXQuQ29udGFjdC4ka2V5JyxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdVc2VyLlVzZXJJbmZvJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ1VzZXIuVXNlckluZm8nLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLnVzZXJUZXh0LFxyXG4gICAgICAgIHRwbDogdGVtcGxhdGUubmFtZUxGLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbGFiZWw6IHRoaXMudHlwZVRleHQsXHJcbiAgICAgICAgbmFtZTogJ0FjdGl2aXR5VHlwZUNvZGUnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnQWN0aXZpdHlUeXBlQ29kZScsXHJcbiAgICAgICAgcmVuZGVyZXI6IHRoaXMuZm9ybWF0UGlja2xpc3QoJ0FjdGl2aXR5VHlwZUNvZGUnKSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIGxhYmVsOiB0aGlzLnB1YmxpY0FjY2Vzc1RleHQsXHJcbiAgICAgICAgbmFtZTogJ1B1YmxpY0FjY2Vzc0NvZGUnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnUHVibGljQWNjZXNzQ29kZScsXHJcbiAgICAgICAgcmVuZGVyZXI6IHRoaXMuZm9ybWF0UGlja2xpc3QoJ1B1YmxpY0FjY2Vzc0NvZGUnKSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIGxhYmVsOiB0aGlzLmFzc2lnbmVkRGF0ZVRleHQsXHJcbiAgICAgICAgbmFtZTogJ0Fzc2lnbmVkRGF0ZScsXHJcbiAgICAgICAgcHJvcGVydHk6ICdBc3NpZ25lZERhdGUnLFxyXG4gICAgICAgIHJlbmRlcmVyOiBmb3JtYXQuZGF0ZSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIGxhYmVsOiB0aGlzLmNvbXBsZXRlZERhdGVUZXh0LFxyXG4gICAgICAgIG5hbWU6ICdDb21wbGV0ZWREYXRlJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0NvbXBsZXRlZERhdGUnLFxyXG4gICAgICAgIHJlbmRlcmVyOiBmb3JtYXQuZGF0ZSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIGxhYmVsOiB0aGlzLmZvbGxvd1VwVGV4dCxcclxuICAgICAgICBuYW1lOiAnRm9sbG93VXAnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnRm9sbG93VXAnLFxyXG4gICAgICAgIHJlbmRlcmVyOiBmb3JtYXQueWVzTm8sXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBsYWJlbDogdGhpcy51bml0c1RleHQsXHJcbiAgICAgICAgbmFtZTogJ1VuaXRzJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ1VuaXRzJyxcclxuICAgICAgfSwge1xyXG4gICAgICAgIGxhYmVsOiB0aGlzLmVsYXBzZWRVbml0c1RleHQsXHJcbiAgICAgICAgbmFtZTogJ0VsYXBzZWRVbml0cycsXHJcbiAgICAgICAgcHJvcGVydHk6ICdFbGFwc2VkVW5pdHMnLFxyXG4gICAgICAgIHJlbmRlcmVyOiBmb3JtYXQuZml4ZWRMb2NhbGUsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBsYWJlbDogdGhpcy5yYXRlVHlwZURlc2NyaXB0aW9uVGV4dCxcclxuICAgICAgICBuYW1lOiAnUmF0ZVR5cGVEZXNjcmlwdGlvbi5SYXRlVHlwZUNvZGUnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnUmF0ZVR5cGVEZXNjcmlwdGlvbi5SYXRlVHlwZUNvZGUnLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbGFiZWw6IHRoaXMucmF0ZVRleHQsXHJcbiAgICAgICAgbmFtZTogJ1JhdGUnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnUmF0ZScsXHJcbiAgICAgICAgcmVuZGVyZXI6IGZvcm1hdC5jdXJyZW5jeSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIGxhYmVsOiB0aGlzLnRvdGFsTGFib3JUZXh0LFxyXG4gICAgICAgIG5hbWU6ICdUb3RhbExhYm9yJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ1RvdGFsTGFib3InLFxyXG4gICAgICAgIHJlbmRlcmVyOiBmb3JtYXQuY3VycmVuY3ksXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBsYWJlbDogdGhpcy50b3RhbFBhcnRzVGV4dCxcclxuICAgICAgICBuYW1lOiAnVG90YWxQYXJ0cycsXHJcbiAgICAgICAgcHJvcGVydHk6ICdUb3RhbFBhcnRzJyxcclxuICAgICAgICByZW5kZXJlcjogZm9ybWF0LmN1cnJlbmN5LFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbGFiZWw6IHRoaXMudG90YWxGZWVUZXh0LFxyXG4gICAgICAgIG5hbWU6ICdUb3RhbEZlZScsXHJcbiAgICAgICAgcHJvcGVydHk6ICdUb3RhbEZlZScsXHJcbiAgICAgICAgcmVuZGVyZXI6IGZvcm1hdC5jdXJyZW5jeSxcclxuICAgICAgfV0sXHJcbiAgICB9LCB7XHJcbiAgICAgIGxpc3Q6IHRydWUsXHJcbiAgICAgIHRpdGxlOiB0aGlzLnJlbGF0ZWRJdGVtc1RleHQsXHJcbiAgICAgIG5hbWU6ICdSZWxhdGVkSXRlbXNTZWN0aW9uJyxcclxuICAgICAgY2hpbGRyZW46IFt7XHJcbiAgICAgICAgbmFtZTogJ1RpY2tldEFjdGl2aXR5SXRlbVJlbGF0ZWQnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLnJlbGF0ZWRUaWNrZXRBY3Rpdml0eUl0ZW1UZXh0LFxyXG4gICAgICAgIHdoZXJlOiB0aGlzLmZvcm1hdFJlbGF0ZWRRdWVyeS5iaW5kRGVsZWdhdGUodGhpcywgJ1RpY2tldEFjdGl2aXR5LklkIGVxIFwiJHswfVwiJyksXHJcbiAgICAgICAgdmlldzogJ3RpY2tldGFjdGl2aXR5aXRlbV9yZWxhdGVkJyxcclxuICAgICAgfV0sXHJcbiAgICB9XSk7XHJcbiAgfSxcclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBfX2NsYXNzO1xyXG4iXX0=
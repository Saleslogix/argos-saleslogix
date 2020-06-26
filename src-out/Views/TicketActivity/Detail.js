define("crm/Views/TicketActivity/Detail", ["exports", "dojo/_base/declare", "../../Format", "../../Template", "argos/Detail", "argos/I18n", "../../Models/Names"], function (_exports, _declare, _Format, _Template, _Detail, _I18n, _Names) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports["default"] = void 0;
  _declare = _interopRequireDefault(_declare);
  _Format = _interopRequireDefault(_Format);
  _Template = _interopRequireDefault(_Template);
  _Detail = _interopRequireDefault(_Detail);
  _I18n = _interopRequireDefault(_I18n);
  _Names = _interopRequireDefault(_Names);

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
  var resource = (0, _I18n["default"])('ticketActivityDetail');

  var __class = (0, _declare["default"])('crm.Views.TicketActivity.Detail', [_Detail["default"]], {
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
    modelName: _Names["default"].TICKETACTIVITY,
    resourceKind: 'ticketActivities',
    formatPicklist: function formatPicklist(property) {
      // TODO: This should be changed on the entity level...
      // Special case since this is for some reason stored as $key value on the entity
      return _Format["default"].picklist(this.app.picklistService, this._model, property, undefined, undefined, {
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
          tpl: _Template["default"].nameLF
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
          renderer: _Format["default"].date
        }, {
          label: this.completedDateText,
          name: 'CompletedDate',
          property: 'CompletedDate',
          renderer: _Format["default"].date
        }, {
          label: this.followUpText,
          name: 'FollowUp',
          property: 'FollowUp',
          renderer: _Format["default"].yesNo
        }, {
          label: this.unitsText,
          name: 'Units',
          property: 'Units'
        }, {
          label: this.elapsedUnitsText,
          name: 'ElapsedUnits',
          property: 'ElapsedUnits',
          renderer: _Format["default"].fixedLocale
        }, {
          label: this.rateTypeDescriptionText,
          name: 'RateTypeDescription.RateTypeCode',
          property: 'RateTypeDescription.RateTypeCode'
        }, {
          label: this.rateText,
          name: 'Rate',
          property: 'Rate',
          renderer: _Format["default"].currency
        }, {
          label: this.totalLaborText,
          name: 'TotalLabor',
          property: 'TotalLabor',
          renderer: _Format["default"].currency
        }, {
          label: this.totalPartsText,
          name: 'TotalParts',
          property: 'TotalParts',
          renderer: _Format["default"].currency
        }, {
          label: this.totalFeeText,
          name: 'TotalFee',
          property: 'TotalFee',
          renderer: _Format["default"].currency
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

  var _default = __class;
  _exports["default"] = _default;
});
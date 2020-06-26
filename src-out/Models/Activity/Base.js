define("crm/Models/Activity/Base", ["exports", "dojo/_base/declare", "argos/Models/_ModelBase", "../Names", "./ActivityTypeText", "./ActivityTypeIcon", "argos/I18n"], function (_exports, _declare, _ModelBase2, _Names, _ActivityTypeText, _ActivityTypeIcon, _I18n) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports["default"] = void 0;
  _declare = _interopRequireDefault(_declare);
  _ModelBase2 = _interopRequireDefault(_ModelBase2);
  _Names = _interopRequireDefault(_Names);
  _ActivityTypeText = _interopRequireDefault(_ActivityTypeText);
  _ActivityTypeIcon = _interopRequireDefault(_ActivityTypeIcon);
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
  var resource = (0, _I18n["default"])('activityModel');
  var attendeeResource = (0, _I18n["default"])('activityAttendeeModel');
  var accountResource = (0, _I18n["default"])('accountModel');
  var contactResource = (0, _I18n["default"])('contactModel');
  var oppResource = (0, _I18n["default"])('opportunityModel');
  var ticketResource = (0, _I18n["default"])('ticketModel');
  var leadResource = (0, _I18n["default"])('leadModel');
  var activityTypeResource = (0, _I18n["default"])('activityTypeText');

  var __class = (0, _declare["default"])('crm.Models.Activity.Base', [_ModelBase2["default"]], {
    modelName: _Names["default"].ACTIVITY,
    entityName: 'Activity',
    entityDisplayName: resource.entityDisplayName,
    entityDisplayNamePlural: resource.entityDisplayNamePlural,
    iconClass: 'bullet-list',
    resourceKind: 'activities',
    contractName: 'system',
    recurringActivityIdSeparator: ';',
    activityTypeText: {
      atToDo: activityTypeResource.atToDoText,
      atPhoneCall: activityTypeResource.atPhoneCallText,
      atAppointment: activityTypeResource.atAppointmentText,
      atLiterature: activityTypeResource.atLiteratureText,
      atPersonal: activityTypeResource.atPersonalText,
      atQuestion: activityTypeResource.atQuestionText,
      atNote: activityTypeResource.atNoteText,
      atEMail: activityTypeResource.atEMailText
    },
    createPicklists: function createPicklists() {
      return this.picklists || (this.picklists = [{
        name: 'Priorities',
        property: 'Priorities'
      }]);
    },
    createRelationships: function createRelationships() {
      var rel = this.relationships || (this.relationships = [{
        name: 'Account',
        displayName: accountResource.entityDisplayName,
        type: 'ManyToOne',
        parentProperty: 'AccountId',
        relatedEntity: 'Account'
      }, {
        name: 'Contact',
        displayName: contactResource.entityDisplayName,
        type: 'ManyToOne',
        parentProperty: 'ContactId',
        relatedEntity: 'Contact'
      }, {
        name: 'Ticket',
        displayName: ticketResource.entityDisplayName,
        type: 'ManyToOne',
        parentProperty: 'TicketId',
        relatedEntity: 'Ticket'
      }, {
        name: 'Opportunity',
        displayName: oppResource.entityDisplayName,
        type: 'ManyToOne',
        parentProperty: 'OpportunityId',
        relatedEntity: 'Opportunity'
      }, {
        name: 'Lead',
        displayName: leadResource.entityDisplayName,
        type: 'ManyToOne',
        parentProperty: 'LeadId',
        relatedEntity: 'Lead'
      }, {
        name: 'ActivityAttendees',
        displayName: attendeeResource.entityDisplayName,
        type: 'OneToMany',
        relatedEntity: 'ActivityAttendee',
        relatedProperty: 'ActivityId'
      }]);
      return rel;
    },
    getIconClass: function getIconClass(entry) {
      var cls = this.iconClass;

      if (entry && entry.Type) {
        cls = _ActivityTypeIcon["default"][entry.Type];

        if (cls) {
          cls = "".concat(cls);
        }
      }

      return cls;
    },
    getEntityDescription: function getEntityDescription(entry) {
      if (entry) {
        var type = entry.Type || '';
        var titleText = this.activityTypeText[type] ? "".concat(this.activityTypeText[type], " - ").concat(entry.Description) : entry.$descriptor;
        return titleText;
      }

      return '';
    },
    getTypeText: function getTypeText(entry) {
      var name = '';

      if (entry && entry.Type) {
        name = _ActivityTypeText["default"][entry.Type];
      }

      return name;
    },
    isActivityRecurring: function isActivityRecurring(entry) {
      return entry && (entry.Recurring || entry.RecurrenceState === 'rstOccurrence');
    }
  });

  var _default = __class;
  _exports["default"] = _default;
});
define("crm/Models/TicketActivity/Base", ["exports", "dojo/_base/declare", "argos/Models/_ModelBase", "../Names", "argos/I18n"], function (_exports, _declare, _ModelBase2, _Names, _I18n) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports["default"] = void 0;
  _declare = _interopRequireDefault(_declare);
  _ModelBase2 = _interopRequireDefault(_ModelBase2);
  _Names = _interopRequireDefault(_Names);
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
  var resource = (0, _I18n["default"])('ticketActivityModel');

  var __class = (0, _declare["default"])('crm.Models.TicketActivity.Base', [_ModelBase2["default"]], {
    entityName: 'TicketActivity',
    entityDisplayName: resource.entityDisplayName,
    entityDisplayNamePlural: resource.entityDisplayNamePlural,
    iconClass: 'bullet-list',
    resourceKind: 'ticketActivities',
    security: 'Entities/Ticket/View',
    modelName: _Names["default"].TICKETACTIVITY,
    createPicklists: function createPicklists() {
      return this.picklists || (this.picklists = [{
        name: 'Ticket Activity',
        property: 'ActivityTypeCode'
      }, {
        name: 'Ticket Activity Public Access',
        property: 'PublicAccessCode'
      }]);
    },
    createRelationships: function createRelationships() {
      var rel = this.relationships || (this.relationships = []);
      return rel;
    }
  });

  var _default = __class;
  _exports["default"] = _default;
});
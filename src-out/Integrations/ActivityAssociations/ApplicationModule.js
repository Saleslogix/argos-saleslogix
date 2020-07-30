define('crm/Integrations/ActivityAssociations/ApplicationModule', ['module', 'exports', 'dojo/_base/declare', 'argos/ApplicationModule', 'argos/I18n', './Views/List', './Models/ActivityAssociation/Offline', './Models/ActivityAssociation/SData'], function (module, exports, _declare, _ApplicationModule, _I18n, _List) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _ApplicationModule2 = _interopRequireDefault(_ApplicationModule);

  var _I18n2 = _interopRequireDefault(_I18n);

  var _List2 = _interopRequireDefault(_List);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /* Copyright 2020 Infor
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

  var resource = (0, _I18n2.default)('activityAssociationModule');

  var __class = (0, _declare2.default)('crm.Integrations.ActivityAssociations.ApplicationModule', [_ApplicationModule2.default], {
    hasNewActivityAssociations: function hasNewActivityAssociations() {
      return this.application.context.enableActivityAssociations === true;
    },
    loadViewsDynamic: function loadViews() {
      if (!this.hasNewActivityAssociations()) {
        return;
      }

      this.registerView(new _List2.default({
        id: 'activity_association_related'
      }));
    },
    loadCustomizationsDynamic: function loadCustomizations() {
      if (!this.hasNewActivityAssociations()) {
        return;
      }

      this.registerCustomization('detail', 'activity_detail', {
        at: function at(row) {
          return row.name === 'AccountName';
        },

        type: 'remove'
      });

      this.registerCustomization('detail', 'activity_detail', {
        at: function at(row) {
          return row.name === 'ContactName';
        },

        type: 'remove'
      });

      this.registerCustomization('detail', 'activity_detail', {
        at: function at(row) {
          return row.name === 'OpportunityName';
        },

        type: 'remove'
      });

      this.registerCustomization('detail', 'activity_detail', {
        at: function at(row) {
          return row.name === 'TicketNumber';
        },

        type: 'remove'
      });

      this.registerCustomization('detail', 'activity_detail', {
        at: function at(row) {
          return row.name === 'LeadName';
        },

        type: 'remove'
      });

      this.registerCustomization('detail', 'activity_detail', {
        at: function at(row) {
          return row.name === 'AttendeeRelated';
        },

        type: 'insert',
        value: {
          name: 'AssociationRelated',
          label: resource.relatedAssociationText,
          where: function where(entry) {
            return 'ActivityId eq "' + entry.$key + '"';
          },
          view: 'activity_association_related',
          title: resource.relatedAssociationTitleText
        }
      });
    },
    loadAppStatePromises: function loadAppStatePromises() {
      var app = this.application;
      this.registerAppStatePromise(function () {
        return new Promise(function (resolve) {
          // We are going to query the new activityAssociation endpoint to see if it 404 errors.
          // This will tell us what the server supports for activity associations, which started in 8.4.0.4
          var request = new Sage.SData.Client.SDataResourceCollectionRequest(app.getService()).setContractName('dynamic').setResourceKind('activityAssociations').setQueryArg('select', '$key').setQueryArg('count', 1);

          request.read({
            success: function success() {
              resolve(true);
              app.context.enableActivityAssociations = true;
            },
            failure: function failure() {
              resolve(false);
              app.context.enableActivityAssociations = false;
            }
          });
        });
      });
    }
  });

  exports.default = __class;
  module.exports = exports['default'];
});
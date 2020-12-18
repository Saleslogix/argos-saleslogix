define('crm/Integrations/ActivityAssociations/ApplicationModule', ['module', 'exports', 'dojo/_base/declare', 'argos/ApplicationModule', 'argos/I18n', './Views/ActivityAssociation/List', './Views/HistoryAssociation/List', './Models/ActivityAssociation/Offline', './Models/ActivityAssociation/SData', './Models/HistoryAssociation/Offline', './Models/HistoryAssociation/SData'], function (module, exports, _declare, _ApplicationModule, _I18n, _List, _List3) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _ApplicationModule2 = _interopRequireDefault(_ApplicationModule);

  var _I18n2 = _interopRequireDefault(_I18n);

  var _List2 = _interopRequireDefault(_List);

  var _List4 = _interopRequireDefault(_List3);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var resource = (0, _I18n2.default)('activityAssociationModule'); /* Copyright 2020 Infor
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

  var __class = (0, _declare2.default)('crm.Integrations.ActivityAssociations.ApplicationModule', [_ApplicationModule2.default], {
    hasNewActivityAssociations: function hasNewActivityAssociations() {
      return this.application.context.enableActivityAssociations === true;
    },
    loadViewsDynamic: function loadViews() {
      if (!this.hasNewActivityAssociations()) {
        return;
      }

      this.registerView(new _List2.default({
        id: 'activity_association_related',
        expose: false
      }));
      this.registerView(new _List4.default({
        id: 'history_association_related',
        expose: false
      }));
    },
    loadCustomizationsDynamic: function loadCustomizations() {
      var _this = this;

      if (!this.hasNewActivityAssociations()) {
        return;
      }

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

      this.registerCustomization('detail', 'history_detail', {
        at: function at(row) {
          return row.name === 'AttendeeRelated';
        },
        type: 'insert',
        value: {
          name: 'AssociationRelated',
          label: resource.relatedAssociationText,
          where: function where(entry) {
            return 'HistoryId eq "' + entry.$key + '"';
          },
          view: 'history_association_related',
          title: resource.relatedHistoryAssociationTitleText
        }
      });

      // Remove "for lead" toggle on activity edit, along with company, always show lead lookup
      crm.Views.Activity.Edit.prototype.fieldsForLeads = [];
      crm.Views.Activity.Edit.prototype.fieldsForStandard = [];
      crm.Views.Activity.Edit.prototype.onLeadChange = function () {};
      var companyEditAt = function companyEditAt(row) {
        return row.name === 'AccountName' && row.type === 'text';
      };
      this.registerCustomization('edit', 'activity_edit', {
        at: function at(row) {
          return row.name === 'IsLead';
        },
        type: 'remove'
      });
      this.registerCustomization('edit', 'activity_edit', {
        at: companyEditAt,
        type: 'modify',
        value: {
          name: 'AccountName',
          property: 'AccountName',
          type: 'hidden',
          include: false
        }
      });

      // Remove "for lead" toggle on activity complete, along with company, always show lead lookup
      crm.Views.Activity.Complete.prototype.fieldsForLeads = [];
      crm.Views.Activity.Complete.prototype.fieldsForStandard = [];
      crm.Views.Activity.Complete.prototype.onLeadChange = function () {};
      this.registerCustomization('edit', 'activity_complete', {
        at: function at(row) {
          return row.name === 'IsLead';
        },
        type: 'remove'
      });
      this.registerCustomization('edit', 'activity_complete', {
        at: companyEditAt,
        type: 'modify',
        value: {
          name: 'AccountName',
          property: 'AccountName',
          type: 'hidden',
          include: false
        }
      });

      // Remove "for lead" toggle on history edit, along with company, always show lead lookup
      crm.Views.History.Edit.prototype.fieldsForLeads = [];
      crm.Views.History.Edit.prototype.fieldsForStandard = [];
      crm.Views.History.Edit.prototype.onLeadChange = function () {};
      this.registerCustomization('edit', 'history_edit', {
        at: function at(row) {
          return row.name === 'IsLead';
        },
        type: 'remove'
      });
      this.registerCustomization('edit', 'history_edit', {
        at: companyEditAt,
        type: 'modify',
        value: {
          name: 'AccountName',
          property: 'AccountName',
          type: 'hidden',
          include: false
        }
      });

      // Remove the "company" field, which is the second AccountName binding
      var companyAt = function companyAt(row) {
        return row.name === 'AccountName' && typeof row.view === 'undefined';
      };
      this.registerCustomization('detail', 'activity_detail', {
        at: companyAt,
        type: 'remove'
      });

      this.registerCustomization('detail', 'history_detail', {
        at: companyAt,
        type: 'remove'
      });

      var removeExcludedProperty = ['AccountName', 'ContactName', 'OpportunityName', 'TicketNumber'];
      removeExcludedProperty.forEach(function (prop) {
        var at = function at(row) {
          return row.name === prop;
        };
        _this.registerCustomization('detail', 'activity_detail', {
          at: at,
          type: 'modify',
          value: {
            exclude: null
          }
        });
        _this.registerCustomization('detail', 'history_detail', {
          at: at,
          type: 'modify',
          value: {
            exclude: null
          }
        });
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
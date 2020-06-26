define("crm/Views/Opportunity/QuickEdit", ["exports", "dojo/_base/declare", "../../Validator", "../../SalesProcessUtility", "argos/Edit", "argos/I18n"], function (_exports, _declare, _Validator, _SalesProcessUtility, _Edit, _I18n) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports["default"] = void 0;
  _declare = _interopRequireDefault(_declare);
  _Validator = _interopRequireDefault(_Validator);
  _SalesProcessUtility = _interopRequireDefault(_SalesProcessUtility);
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
  var resource = (0, _I18n["default"])('opportunityQuickEdit');

  var __class = (0, _declare["default"])('crm.Views.Opportunity.QuickEdit', [_Edit["default"]], {
    // Localization
    estCloseText: resource.estCloseText,
    detailsText: resource.detailsText,
    opportunityStageTitleText: resource.opportunityStageTitleText,
    opportunityText: resource.opportunityText,
    stageText: resource.stageText,
    statusOpenText: resource.statusOpenText,
    statusClosedLostText: resource.statusClosedLostText,
    statusClosedWonText: resource.statusClosedWonText,
    salesProcessText: resource.salesProcessText,
    probabilityText: resource.probabilityText,
    probabilityTitleText: resource.probabilityTitleText,
    potentialText: resource.potentialText,
    // View Properties
    entityName: 'Opportunity',
    id: 'opportunity_quick_edit',
    resourceKind: 'opportunities',
    insertSecurity: 'Entities/Opportunity/Add',
    updateSecurity: 'Entities/Opportunity/Edit',
    querySelect: ['Account/AccountName', 'CloseProbability', 'EstimatedClose', 'ExchangeRate', 'ExchangeRateCode', 'ExchangeRateDate', 'ExchangeRateLocked', 'SalesPotential', 'Stage', 'status'],
    queryInclude: ['$permissions'],
    init: function init() {
      this.inherited(init, arguments);
    },
    applyContext: function applyContext(templateEntry) {
      this.fields.EstimatedClose.setValue(templateEntry.EstimatedClose);
    },
    createLayout: function createLayout() {
      var details = {
        title: this.detailsText,
        name: 'OpportunityDetailsEdit',
        children: [{
          relatedView: {
            widgetType: 'relatedContext',
            id: 'opp_related_context_quickEdit'
          }
        }, {
          label: this.stageText,
          name: 'Stage',
          property: 'Stage',
          picklist: 'Opportunity Stage',
          requireSelection: true,
          enabled: false,
          title: this.opportunityStageTitleText,
          type: 'picklist'
        }, {
          label: this.probabilityText,
          name: 'CloseProbability',
          property: 'CloseProbability',
          picklist: 'Opportunity Probability',
          title: this.probabilityTitleText,
          type: 'picklist',
          validator: [_Validator["default"].isInt32, _Validator["default"].isInteger]
        }, {
          label: this.potentialText,
          name: 'SalesPotential',
          property: 'SalesPotential',
          precision: 2,
          type: 'multiCurrency',
          validationTrigger: 'keyup',
          validator: _Validator["default"].isCurrency
        }, {
          label: this.estCloseText,
          name: 'EstimatedClose',
          property: 'EstimatedClose',
          type: 'date',
          timeless: true,
          validator: _Validator["default"].exists
        }]
      };
      var layout = this.layout || (this.layout = []);

      if (layout.length > 0) {
        return layout;
      }

      layout.push(details);
      return layout;
    },
    setValues: function setValues(values) {
      this.inherited(setValues, arguments);
      this.enableStage(values.$key);
      this.enableProbability(values);
      this.fields.SalesPotential.setCurrencyCode(App.getBaseExchangeRate().code);
    },
    enableStage: function enableStage(opportunityId) {
      var _this = this;

      var field = this.fields.Stage;
      var label = this.stageText;

      if (!field) {
        return;
      }

      field.disable();

      _SalesProcessUtility["default"].getSalesProcessByEntityId(opportunityId).then(function (salesProcess) {
        if (salesProcess) {
          field.disable();
          label = _this.salesProcessText + salesProcess.$descriptor;

          _this.setStageLabel(label);
        } else {
          field.enable();
        }
      });

      this.setStageLabel(label);
    },
    setStageLabel: function setStageLabel(label) {
      var field = this.fields.Stage;

      if (field && field.domNode) {
        var node = $('[for="Stage"]', field.domNode);

        if (node && node.length > 0) {
          $(node[0]).attr('innerHTML', label); // TODO: SDK's _Field should provide a label setter
        }
      }
    },
    enableProbability: function enableProbability(entry) {
      var field = this.fields.CloseProbability;

      if (!field) {
        return;
      }

      field.enable();

      if (this.isClosed(entry)) {
        field.disable();
      }
    },
    isClosed: function isClosed(entry) {
      var status = entry.Status;

      if (status === this.statusClosedWonText || status === this.statusClosedLostText) {
        return true;
      }

      return false;
    }
  });

  var _default = __class;
  _exports["default"] = _default;
});
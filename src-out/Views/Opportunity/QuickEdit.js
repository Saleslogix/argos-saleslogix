define('crm/Views/Opportunity/QuickEdit', ['module', 'exports', 'dojo/_base/declare', '../../Validator', '../../SalesProcessUtility', 'argos/Edit', 'argos/I18n'], function (module, exports, _declare, _Validator, _SalesProcessUtility, _Edit, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _Validator2 = _interopRequireDefault(_Validator);

  var _SalesProcessUtility2 = _interopRequireDefault(_SalesProcessUtility);

  var _Edit2 = _interopRequireDefault(_Edit);

  var _I18n2 = _interopRequireDefault(_I18n);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var resource = (0, _I18n2.default)('opportunityQuickEdit');

  /**
   * @class crm.Views.Opportunity.QuickEdit
   *
   * @extends argos.Edit
   *
   * @requires argos.Utility
   *
   * @requires crm.Validator
   * @requires crm.Template
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

  var __class = (0, _declare2.default)('crm.Views.Opportunity.QuickEdit', [_Edit2.default], {
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
          validator: [_Validator2.default.isInt32, _Validator2.default.isInteger]
        }, {
          label: this.potentialText,
          name: 'SalesPotential',
          property: 'SalesPotential',
          precision: 2,
          type: 'multiCurrency',
          validationTrigger: 'keyup',
          validator: _Validator2.default.isCurrency
        }, {
          label: this.estCloseText,
          name: 'EstimatedClose',
          property: 'EstimatedClose',
          type: 'date',
          timeless: true,
          validator: _Validator2.default.exists
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
      _SalesProcessUtility2.default.getSalesProcessByEntityId(opportunityId).then(function (salesProcess) {
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

  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9WaWV3cy9PcHBvcnR1bml0eS9RdWlja0VkaXQuanMiXSwibmFtZXMiOlsicmVzb3VyY2UiLCJfX2NsYXNzIiwiZXN0Q2xvc2VUZXh0IiwiZGV0YWlsc1RleHQiLCJvcHBvcnR1bml0eVN0YWdlVGl0bGVUZXh0Iiwib3Bwb3J0dW5pdHlUZXh0Iiwic3RhZ2VUZXh0Iiwic3RhdHVzT3BlblRleHQiLCJzdGF0dXNDbG9zZWRMb3N0VGV4dCIsInN0YXR1c0Nsb3NlZFdvblRleHQiLCJzYWxlc1Byb2Nlc3NUZXh0IiwicHJvYmFiaWxpdHlUZXh0IiwicHJvYmFiaWxpdHlUaXRsZVRleHQiLCJwb3RlbnRpYWxUZXh0IiwiZW50aXR5TmFtZSIsImlkIiwicmVzb3VyY2VLaW5kIiwiaW5zZXJ0U2VjdXJpdHkiLCJ1cGRhdGVTZWN1cml0eSIsInF1ZXJ5U2VsZWN0IiwicXVlcnlJbmNsdWRlIiwiaW5pdCIsImluaGVyaXRlZCIsImFyZ3VtZW50cyIsImFwcGx5Q29udGV4dCIsInRlbXBsYXRlRW50cnkiLCJmaWVsZHMiLCJFc3RpbWF0ZWRDbG9zZSIsInNldFZhbHVlIiwiY3JlYXRlTGF5b3V0IiwiZGV0YWlscyIsInRpdGxlIiwibmFtZSIsImNoaWxkcmVuIiwicmVsYXRlZFZpZXciLCJ3aWRnZXRUeXBlIiwibGFiZWwiLCJwcm9wZXJ0eSIsInBpY2tsaXN0IiwicmVxdWlyZVNlbGVjdGlvbiIsImVuYWJsZWQiLCJ0eXBlIiwidmFsaWRhdG9yIiwiaXNJbnQzMiIsImlzSW50ZWdlciIsInByZWNpc2lvbiIsInZhbGlkYXRpb25UcmlnZ2VyIiwiaXNDdXJyZW5jeSIsInRpbWVsZXNzIiwiZXhpc3RzIiwibGF5b3V0IiwibGVuZ3RoIiwicHVzaCIsInNldFZhbHVlcyIsInZhbHVlcyIsImVuYWJsZVN0YWdlIiwiJGtleSIsImVuYWJsZVByb2JhYmlsaXR5IiwiU2FsZXNQb3RlbnRpYWwiLCJzZXRDdXJyZW5jeUNvZGUiLCJBcHAiLCJnZXRCYXNlRXhjaGFuZ2VSYXRlIiwiY29kZSIsIm9wcG9ydHVuaXR5SWQiLCJmaWVsZCIsIlN0YWdlIiwiZGlzYWJsZSIsImdldFNhbGVzUHJvY2Vzc0J5RW50aXR5SWQiLCJ0aGVuIiwic2FsZXNQcm9jZXNzIiwiJGRlc2NyaXB0b3IiLCJzZXRTdGFnZUxhYmVsIiwiZW5hYmxlIiwiZG9tTm9kZSIsIm5vZGUiLCIkIiwiYXR0ciIsImVudHJ5IiwiQ2xvc2VQcm9iYWJpbGl0eSIsImlzQ2xvc2VkIiwic3RhdHVzIiwiU3RhdHVzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFzQkEsTUFBTUEsV0FBVyxvQkFBWSxzQkFBWixDQUFqQjs7QUFFQTs7Ozs7Ozs7OztBQXhCQTs7Ozs7Ozs7Ozs7Ozs7O0FBa0NBLE1BQU1DLFVBQVUsdUJBQVEsaUNBQVIsRUFBMkMsZ0JBQTNDLEVBQW1EO0FBQ2pFO0FBQ0FDLGtCQUFjRixTQUFTRSxZQUYwQztBQUdqRUMsaUJBQWFILFNBQVNHLFdBSDJDO0FBSWpFQywrQkFBMkJKLFNBQVNJLHlCQUo2QjtBQUtqRUMscUJBQWlCTCxTQUFTSyxlQUx1QztBQU1qRUMsZUFBV04sU0FBU00sU0FONkM7QUFPakVDLG9CQUFnQlAsU0FBU08sY0FQd0M7QUFRakVDLDBCQUFzQlIsU0FBU1Esb0JBUmtDO0FBU2pFQyx5QkFBcUJULFNBQVNTLG1CQVRtQztBQVVqRUMsc0JBQWtCVixTQUFTVSxnQkFWc0M7QUFXakVDLHFCQUFpQlgsU0FBU1csZUFYdUM7QUFZakVDLDBCQUFzQlosU0FBU1ksb0JBWmtDO0FBYWpFQyxtQkFBZWIsU0FBU2EsYUFieUM7O0FBZWpFO0FBQ0FDLGdCQUFZLGFBaEJxRDtBQWlCakVDLFFBQUksd0JBakI2RDtBQWtCakVDLGtCQUFjLGVBbEJtRDtBQW1CakVDLG9CQUFnQiwwQkFuQmlEO0FBb0JqRUMsb0JBQWdCLDJCQXBCaUQ7QUFxQmpFQyxpQkFBYSxDQUNYLHFCQURXLEVBRVgsa0JBRlcsRUFHWCxnQkFIVyxFQUlYLGNBSlcsRUFLWCxrQkFMVyxF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ckpnRSxHQUFuRCxDQUFoQjs7b0JBd0plUCxPIiwiZmlsZSI6IlF1aWNrRWRpdC5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBDb3B5cmlnaHQgMjAxNyBJbmZvclxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBkZWNsYXJlIGZyb20gJ2Rvam8vX2Jhc2UvZGVjbGFyZSc7XHJcbmltcG9ydCB2YWxpZGF0b3IgZnJvbSAnLi4vLi4vVmFsaWRhdG9yJztcclxuaW1wb3J0IHNhbGVzUHJvY2Vzc1V0aWxpdHkgZnJvbSAnLi4vLi4vU2FsZXNQcm9jZXNzVXRpbGl0eSc7XHJcbmltcG9ydCBFZGl0IGZyb20gJ2FyZ29zL0VkaXQnO1xyXG5pbXBvcnQgZ2V0UmVzb3VyY2UgZnJvbSAnYXJnb3MvSTE4bic7XHJcblxyXG5cclxuY29uc3QgcmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgnb3Bwb3J0dW5pdHlRdWlja0VkaXQnKTtcclxuXHJcbi8qKlxyXG4gKiBAY2xhc3MgY3JtLlZpZXdzLk9wcG9ydHVuaXR5LlF1aWNrRWRpdFxyXG4gKlxyXG4gKiBAZXh0ZW5kcyBhcmdvcy5FZGl0XHJcbiAqXHJcbiAqIEByZXF1aXJlcyBhcmdvcy5VdGlsaXR5XHJcbiAqXHJcbiAqIEByZXF1aXJlcyBjcm0uVmFsaWRhdG9yXHJcbiAqIEByZXF1aXJlcyBjcm0uVGVtcGxhdGVcclxuICovXHJcbmNvbnN0IF9fY2xhc3MgPSBkZWNsYXJlKCdjcm0uVmlld3MuT3Bwb3J0dW5pdHkuUXVpY2tFZGl0JywgW0VkaXRdLCB7XHJcbiAgLy8gTG9jYWxpemF0aW9uXHJcbiAgZXN0Q2xvc2VUZXh0OiByZXNvdXJjZS5lc3RDbG9zZVRleHQsXHJcbiAgZGV0YWlsc1RleHQ6IHJlc291cmNlLmRldGFpbHNUZXh0LFxyXG4gIG9wcG9ydHVuaXR5U3RhZ2VUaXRsZVRleHQ6IHJlc291cmNlLm9wcG9ydHVuaXR5U3RhZ2VUaXRsZVRleHQsXHJcbiAgb3Bwb3J0dW5pdHlUZXh0OiByZXNvdXJjZS5vcHBvcnR1bml0eVRleHQsXHJcbiAgc3RhZ2VUZXh0OiByZXNvdXJjZS5zdGFnZVRleHQsXHJcbiAgc3RhdHVzT3BlblRleHQ6IHJlc291cmNlLnN0YXR1c09wZW5UZXh0LFxyXG4gIHN0YXR1c0Nsb3NlZExvc3RUZXh0OiByZXNvdXJjZS5zdGF0dXNDbG9zZWRMb3N0VGV4dCxcclxuICBzdGF0dXNDbG9zZWRXb25UZXh0OiByZXNvdXJjZS5zdGF0dXNDbG9zZWRXb25UZXh0LFxyXG4gIHNhbGVzUHJvY2Vzc1RleHQ6IHJlc291cmNlLnNhbGVzUHJvY2Vzc1RleHQsXHJcbiAgcHJvYmFiaWxpdHlUZXh0OiByZXNvdXJjZS5wcm9iYWJpbGl0eVRleHQsXHJcbiAgcHJvYmFiaWxpdHlUaXRsZVRleHQ6IHJlc291cmNlLnByb2JhYmlsaXR5VGl0bGVUZXh0LFxyXG4gIHBvdGVudGlhbFRleHQ6IHJlc291cmNlLnBvdGVudGlhbFRleHQsXHJcblxyXG4gIC8vIFZpZXcgUHJvcGVydGllc1xyXG4gIGVudGl0eU5hbWU6ICdPcHBvcnR1bml0eScsXHJcbiAgaWQ6ICdvcHBvcnR1bml0eV9xdWlja19lZGl0JyxcclxuICByZXNvdXJjZUtpbmQ6ICdvcHBvcnR1bml0aWVzJyxcclxuICBpbnNlcnRTZWN1cml0eTogJ0VudGl0aWVzL09wcG9ydHVuaXR5L0FkZCcsXHJcbiAgdXBkYXRlU2VjdXJpdHk6ICdFbnRpdGllcy9PcHBvcnR1bml0eS9FZGl0JyxcclxuICBxdWVyeVNlbGVjdDogW1xyXG4gICAgJ0FjY291bnQvQWNjb3VudE5hbWUnLFxyXG4gICAgJ0Nsb3NlUHJvYmFiaWxpdHknLFxyXG4gICAgJ0VzdGltYXRlZENsb3NlJyxcclxuICAgICdFeGNoYW5nZVJhdGUnLFxyXG4gICAgJ0V4Y2hhbmdlUmF0ZUNvZGUnLFxyXG4gICAgJ0V4Y2hhbmdlUmF0ZURhdGUnLFxyXG4gICAgJ0V4Y2hhbmdlUmF0ZUxvY2tlZCcsXHJcbiAgICAnU2FsZXNQb3RlbnRpYWwnLFxyXG4gICAgJ1N0YWdlJyxcclxuICAgICdzdGF0dXMnLFxyXG4gIF0sXHJcbiAgcXVlcnlJbmNsdWRlOiBbXHJcbiAgICAnJHBlcm1pc3Npb25zJyxcclxuICBdLFxyXG4gIGluaXQ6IGZ1bmN0aW9uIGluaXQoKSB7XHJcbiAgICB0aGlzLmluaGVyaXRlZChpbml0LCBhcmd1bWVudHMpO1xyXG4gIH0sXHJcbiAgYXBwbHlDb250ZXh0OiBmdW5jdGlvbiBhcHBseUNvbnRleHQodGVtcGxhdGVFbnRyeSkge1xyXG4gICAgdGhpcy5maWVsZHMuRXN0aW1hdGVkQ2xvc2Uuc2V0VmFsdWUodGVtcGxhdGVFbnRyeS5Fc3RpbWF0ZWRDbG9zZSk7XHJcbiAgfSxcclxuICBjcmVhdGVMYXlvdXQ6IGZ1bmN0aW9uIGNyZWF0ZUxheW91dCgpIHtcclxuICAgIGNvbnN0IGRldGFpbHMgPSB7XHJcbiAgICAgIHRpdGxlOiB0aGlzLmRldGFpbHNUZXh0LFxyXG4gICAgICBuYW1lOiAnT3Bwb3J0dW5pdHlEZXRhaWxzRWRpdCcsXHJcbiAgICAgIGNoaWxkcmVuOiBbe1xyXG4gICAgICAgIHJlbGF0ZWRWaWV3OiB7XHJcbiAgICAgICAgICB3aWRnZXRUeXBlOiAncmVsYXRlZENvbnRleHQnLFxyXG4gICAgICAgICAgaWQ6ICdvcHBfcmVsYXRlZF9jb250ZXh0X3F1aWNrRWRpdCcsXHJcbiAgICAgICAgfSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIGxhYmVsOiB0aGlzLnN0YWdlVGV4dCxcclxuICAgICAgICBuYW1lOiAnU3RhZ2UnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnU3RhZ2UnLFxyXG4gICAgICAgIHBpY2tsaXN0OiAnT3Bwb3J0dW5pdHkgU3RhZ2UnLFxyXG4gICAgICAgIHJlcXVpcmVTZWxlY3Rpb246IHRydWUsXHJcbiAgICAgICAgZW5hYmxlZDogZmFsc2UsXHJcbiAgICAgICAgdGl0bGU6IHRoaXMub3Bwb3J0dW5pdHlTdGFnZVRpdGxlVGV4dCxcclxuICAgICAgICB0eXBlOiAncGlja2xpc3QnLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbGFiZWw6IHRoaXMucHJvYmFiaWxpdHlUZXh0LFxyXG4gICAgICAgIG5hbWU6ICdDbG9zZVByb2JhYmlsaXR5JyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0Nsb3NlUHJvYmFiaWxpdHknLFxyXG4gICAgICAgIHBpY2tsaXN0OiAnT3Bwb3J0dW5pdHkgUHJvYmFiaWxpdHknLFxyXG4gICAgICAgIHRpdGxlOiB0aGlzLnByb2JhYmlsaXR5VGl0bGVUZXh0LFxyXG4gICAgICAgIHR5cGU6ICdwaWNrbGlzdCcsXHJcbiAgICAgICAgdmFsaWRhdG9yOiBbXHJcbiAgICAgICAgICB2YWxpZGF0b3IuaXNJbnQzMixcclxuICAgICAgICAgIHZhbGlkYXRvci5pc0ludGVnZXIsXHJcbiAgICAgICAgXSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIGxhYmVsOiB0aGlzLnBvdGVudGlhbFRleHQsXHJcbiAgICAgICAgbmFtZTogJ1NhbGVzUG90ZW50aWFsJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ1NhbGVzUG90ZW50aWFsJyxcclxuICAgICAgICBwcmVjaXNpb246IDIsXHJcbiAgICAgICAgdHlwZTogJ211bHRpQ3VycmVuY3knLFxyXG4gICAgICAgIHZhbGlkYXRpb25UcmlnZ2VyOiAna2V5dXAnLFxyXG4gICAgICAgIHZhbGlkYXRvcjogdmFsaWRhdG9yLmlzQ3VycmVuY3ksXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBsYWJlbDogdGhpcy5lc3RDbG9zZVRleHQsXHJcbiAgICAgICAgbmFtZTogJ0VzdGltYXRlZENsb3NlJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0VzdGltYXRlZENsb3NlJyxcclxuICAgICAgICB0eXBlOiAnZGF0ZScsXHJcbiAgICAgICAgdGltZWxlc3M6IHRydWUsXHJcbiAgICAgICAgdmFsaWRhdG9yOiB2YWxpZGF0b3IuZXhpc3RzLFxyXG4gICAgICB9XSxcclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgbGF5b3V0ID0gdGhpcy5sYXlvdXQgfHwgKHRoaXMubGF5b3V0ID0gW10pO1xyXG5cclxuICAgIGlmIChsYXlvdXQubGVuZ3RoID4gMCkge1xyXG4gICAgICByZXR1cm4gbGF5b3V0O1xyXG4gICAgfVxyXG5cclxuICAgIGxheW91dC5wdXNoKGRldGFpbHMpO1xyXG4gICAgcmV0dXJuIGxheW91dDtcclxuICB9LFxyXG4gIHNldFZhbHVlczogZnVuY3Rpb24gc2V0VmFsdWVzKHZhbHVlcykge1xyXG4gICAgdGhpcy5pbmhlcml0ZWQoc2V0VmFsdWVzLCBhcmd1bWVudHMpO1xyXG4gICAgdGhpcy5lbmFibGVTdGFnZSh2YWx1ZXMuJGtleSk7XHJcbiAgICB0aGlzLmVuYWJsZVByb2JhYmlsaXR5KHZhbHVlcyk7XHJcbiAgICB0aGlzLmZpZWxkcy5TYWxlc1BvdGVudGlhbC5zZXRDdXJyZW5jeUNvZGUoQXBwLmdldEJhc2VFeGNoYW5nZVJhdGUoKS5jb2RlKTtcclxuICB9LFxyXG4gIGVuYWJsZVN0YWdlOiBmdW5jdGlvbiBlbmFibGVTdGFnZShvcHBvcnR1bml0eUlkKSB7XHJcbiAgICBjb25zdCBmaWVsZCA9IHRoaXMuZmllbGRzLlN0YWdlO1xyXG4gICAgbGV0IGxhYmVsID0gdGhpcy5zdGFnZVRleHQ7XHJcblxyXG4gICAgaWYgKCFmaWVsZCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgZmllbGQuZGlzYWJsZSgpO1xyXG4gICAgc2FsZXNQcm9jZXNzVXRpbGl0eS5nZXRTYWxlc1Byb2Nlc3NCeUVudGl0eUlkKG9wcG9ydHVuaXR5SWQpLnRoZW4oKHNhbGVzUHJvY2VzcykgPT4ge1xyXG4gICAgICBpZiAoc2FsZXNQcm9jZXNzKSB7XHJcbiAgICAgICAgZmllbGQuZGlzYWJsZSgpO1xyXG4gICAgICAgIGxhYmVsID0gdGhpcy5zYWxlc1Byb2Nlc3NUZXh0ICsgc2FsZXNQcm9jZXNzLiRkZXNjcmlwdG9yO1xyXG4gICAgICAgIHRoaXMuc2V0U3RhZ2VMYWJlbChsYWJlbCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZmllbGQuZW5hYmxlKCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgdGhpcy5zZXRTdGFnZUxhYmVsKGxhYmVsKTtcclxuICB9LFxyXG4gIHNldFN0YWdlTGFiZWw6IGZ1bmN0aW9uIHNldFN0YWdlTGFiZWwobGFiZWwpIHtcclxuICAgIGNvbnN0IGZpZWxkID0gdGhpcy5maWVsZHMuU3RhZ2U7XHJcbiAgICBpZiAoZmllbGQgJiYgZmllbGQuZG9tTm9kZSkge1xyXG4gICAgICBjb25zdCBub2RlID0gJCgnW2Zvcj1cIlN0YWdlXCJdJywgZmllbGQuZG9tTm9kZSk7XHJcbiAgICAgIGlmIChub2RlICYmIG5vZGUubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICQobm9kZVswXSkuYXR0cignaW5uZXJIVE1MJywgbGFiZWwpOyAvLyBUT0RPOiBTREsncyBfRmllbGQgc2hvdWxkIHByb3ZpZGUgYSBsYWJlbCBzZXR0ZXJcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgZW5hYmxlUHJvYmFiaWxpdHk6IGZ1bmN0aW9uIGVuYWJsZVByb2JhYmlsaXR5KGVudHJ5KSB7XHJcbiAgICBjb25zdCBmaWVsZCA9IHRoaXMuZmllbGRzLkNsb3NlUHJvYmFiaWxpdHk7XHJcbiAgICBpZiAoIWZpZWxkKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGZpZWxkLmVuYWJsZSgpO1xyXG4gICAgaWYgKHRoaXMuaXNDbG9zZWQoZW50cnkpKSB7XHJcbiAgICAgIGZpZWxkLmRpc2FibGUoKTtcclxuICAgIH1cclxuICB9LFxyXG4gIGlzQ2xvc2VkOiBmdW5jdGlvbiBpc0Nsb3NlZChlbnRyeSkge1xyXG4gICAgY29uc3Qgc3RhdHVzID0gZW50cnkuU3RhdHVzO1xyXG4gICAgaWYgKChzdGF0dXMgPT09IHRoaXMuc3RhdHVzQ2xvc2VkV29uVGV4dCkgfHwgKHN0YXR1cyA9PT0gdGhpcy5zdGF0dXNDbG9zZWRMb3N0VGV4dCkpIHtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfSxcclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBfX2NsYXNzO1xyXG4iXX0=
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
      this.inherited(arguments);
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
      this.inherited(arguments);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9WaWV3cy9PcHBvcnR1bml0eS9RdWlja0VkaXQuanMiXSwibmFtZXMiOlsicmVzb3VyY2UiLCJfX2NsYXNzIiwiZXN0Q2xvc2VUZXh0IiwiZGV0YWlsc1RleHQiLCJvcHBvcnR1bml0eVN0YWdlVGl0bGVUZXh0Iiwib3Bwb3J0dW5pdHlUZXh0Iiwic3RhZ2VUZXh0Iiwic3RhdHVzT3BlblRleHQiLCJzdGF0dXNDbG9zZWRMb3N0VGV4dCIsInN0YXR1c0Nsb3NlZFdvblRleHQiLCJzYWxlc1Byb2Nlc3NUZXh0IiwicHJvYmFiaWxpdHlUZXh0IiwicHJvYmFiaWxpdHlUaXRsZVRleHQiLCJwb3RlbnRpYWxUZXh0IiwiZW50aXR5TmFtZSIsImlkIiwicmVzb3VyY2VLaW5kIiwiaW5zZXJ0U2VjdXJpdHkiLCJ1cGRhdGVTZWN1cml0eSIsInF1ZXJ5U2VsZWN0IiwicXVlcnlJbmNsdWRlIiwiaW5pdCIsImluaGVyaXRlZCIsImFyZ3VtZW50cyIsImFwcGx5Q29udGV4dCIsInRlbXBsYXRlRW50cnkiLCJmaWVsZHMiLCJFc3RpbWF0ZWRDbG9zZSIsInNldFZhbHVlIiwiY3JlYXRlTGF5b3V0IiwiZGV0YWlscyIsInRpdGxlIiwibmFtZSIsImNoaWxkcmVuIiwicmVsYXRlZFZpZXciLCJ3aWRnZXRUeXBlIiwibGFiZWwiLCJwcm9wZXJ0eSIsInBpY2tsaXN0IiwicmVxdWlyZVNlbGVjdGlvbiIsImVuYWJsZWQiLCJ0eXBlIiwidmFsaWRhdG9yIiwiaXNJbnQzMiIsImlzSW50ZWdlciIsInByZWNpc2lvbiIsInZhbGlkYXRpb25UcmlnZ2VyIiwiaXNDdXJyZW5jeSIsInRpbWVsZXNzIiwiZXhpc3RzIiwibGF5b3V0IiwibGVuZ3RoIiwicHVzaCIsInNldFZhbHVlcyIsInZhbHVlcyIsImVuYWJsZVN0YWdlIiwiJGtleSIsImVuYWJsZVByb2JhYmlsaXR5IiwiU2FsZXNQb3RlbnRpYWwiLCJzZXRDdXJyZW5jeUNvZGUiLCJBcHAiLCJnZXRCYXNlRXhjaGFuZ2VSYXRlIiwiY29kZSIsIm9wcG9ydHVuaXR5SWQiLCJmaWVsZCIsIlN0YWdlIiwiZGlzYWJsZSIsImdldFNhbGVzUHJvY2Vzc0J5RW50aXR5SWQiLCJ0aGVuIiwic2FsZXNQcm9jZXNzIiwiJGRlc2NyaXB0b3IiLCJzZXRTdGFnZUxhYmVsIiwiZW5hYmxlIiwiZG9tTm9kZSIsIm5vZGUiLCIkIiwiYXR0ciIsImVudHJ5IiwiQ2xvc2VQcm9iYWJpbGl0eSIsImlzQ2xvc2VkIiwic3RhdHVzIiwiU3RhdHVzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFzQkEsTUFBTUEsV0FBVyxvQkFBWSxzQkFBWixDQUFqQjs7QUFFQTs7Ozs7Ozs7OztBQXhCQTs7Ozs7Ozs7Ozs7Ozs7O0FBa0NBLE1BQU1DLFVBQVUsdUJBQVEsaUNBQVIsRUFBMkMsZ0JBQTNDLEVBQW1EO0FBQ2pFO0FBQ0FDLGtCQUFjRixTQUFTRSxZQUYwQztBQUdqRUMsaUJBQWFILFNBQVNHLFdBSDJDO0FBSWpFQywrQkFBMkJKLFNBQVNJLHlCQUo2QjtBQUtqRUMscUJBQWlCTCxTQUFTSyxlQUx1QztBQU1qRUMsZUFBV04sU0FBU00sU0FONkM7QUFPakVDLG9CQUFnQlAsU0FBU08sY0FQd0M7QUFRakVDLDBCQUFzQlIsU0FBU1Esb0JBUmtDO0FBU2pFQyx5QkFBcUJULFNBQVNTLG1CQVRtQztBQVVqRUMsc0JBQWtCVixTQUFTVSxnQkFWc0M7QUFXakVDLHFCQUFpQlgsU0FBU1csZUFYdUM7QUFZakVDLDBCQUFzQlosU0FBU1ksb0JBWmtDO0FBYWpFQyxtQkFBZWIsU0FBU2EsYUFieUM7O0FBZWpFO0FBQ0FDLGdCQUFZLGFBaEJxRDtBQWlCakVDLFFBQUksd0JBakI2RDtBQWtCakVDLGtCQUFjLGVBbEJtRDtBQW1CakVDLG9CQUFnQiwwQkFuQmlEO0FBb0JqRUMsb0JBQWdCLDJCQXBCaUQ7QUFxQmpFQyxpQkFBYSxDQUNYLHFCQURXLEVBRVgsa0JBRlcsRUFHWCxnQkFIVyxFQUlYLGNBSlcsRUFLWCxrQkFMVyxF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LCJmaWxlIjoiUXVpY2tFZGl0LmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAyMDE3IEluZm9yXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuaW1wb3J0IGRlY2xhcmUgZnJvbSAnZG9qby9fYmFzZS9kZWNsYXJlJztcclxuaW1wb3J0IHZhbGlkYXRvciBmcm9tICcuLi8uLi9WYWxpZGF0b3InO1xyXG5pbXBvcnQgc2FsZXNQcm9jZXNzVXRpbGl0eSBmcm9tICcuLi8uLi9TYWxlc1Byb2Nlc3NVdGlsaXR5JztcclxuaW1wb3J0IEVkaXQgZnJvbSAnYXJnb3MvRWRpdCc7XHJcbmltcG9ydCBnZXRSZXNvdXJjZSBmcm9tICdhcmdvcy9JMThuJztcclxuXHJcblxyXG5jb25zdCByZXNvdXJjZSA9IGdldFJlc291cmNlKCdvcHBvcnR1bml0eVF1aWNrRWRpdCcpO1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBjcm0uVmlld3MuT3Bwb3J0dW5pdHkuUXVpY2tFZGl0XHJcbiAqXHJcbiAqIEBleHRlbmRzIGFyZ29zLkVkaXRcclxuICpcclxuICogQHJlcXVpcmVzIGFyZ29zLlV0aWxpdHlcclxuICpcclxuICogQHJlcXVpcmVzIGNybS5WYWxpZGF0b3JcclxuICogQHJlcXVpcmVzIGNybS5UZW1wbGF0ZVxyXG4gKi9cclxuY29uc3QgX19jbGFzcyA9IGRlY2xhcmUoJ2NybS5WaWV3cy5PcHBvcnR1bml0eS5RdWlja0VkaXQnLCBbRWRpdF0sIHtcclxuICAvLyBMb2NhbGl6YXRpb25cclxuICBlc3RDbG9zZVRleHQ6IHJlc291cmNlLmVzdENsb3NlVGV4dCxcclxuICBkZXRhaWxzVGV4dDogcmVzb3VyY2UuZGV0YWlsc1RleHQsXHJcbiAgb3Bwb3J0dW5pdHlTdGFnZVRpdGxlVGV4dDogcmVzb3VyY2Uub3Bwb3J0dW5pdHlTdGFnZVRpdGxlVGV4dCxcclxuICBvcHBvcnR1bml0eVRleHQ6IHJlc291cmNlLm9wcG9ydHVuaXR5VGV4dCxcclxuICBzdGFnZVRleHQ6IHJlc291cmNlLnN0YWdlVGV4dCxcclxuICBzdGF0dXNPcGVuVGV4dDogcmVzb3VyY2Uuc3RhdHVzT3BlblRleHQsXHJcbiAgc3RhdHVzQ2xvc2VkTG9zdFRleHQ6IHJlc291cmNlLnN0YXR1c0Nsb3NlZExvc3RUZXh0LFxyXG4gIHN0YXR1c0Nsb3NlZFdvblRleHQ6IHJlc291cmNlLnN0YXR1c0Nsb3NlZFdvblRleHQsXHJcbiAgc2FsZXNQcm9jZXNzVGV4dDogcmVzb3VyY2Uuc2FsZXNQcm9jZXNzVGV4dCxcclxuICBwcm9iYWJpbGl0eVRleHQ6IHJlc291cmNlLnByb2JhYmlsaXR5VGV4dCxcclxuICBwcm9iYWJpbGl0eVRpdGxlVGV4dDogcmVzb3VyY2UucHJvYmFiaWxpdHlUaXRsZVRleHQsXHJcbiAgcG90ZW50aWFsVGV4dDogcmVzb3VyY2UucG90ZW50aWFsVGV4dCxcclxuXHJcbiAgLy8gVmlldyBQcm9wZXJ0aWVzXHJcbiAgZW50aXR5TmFtZTogJ09wcG9ydHVuaXR5JyxcclxuICBpZDogJ29wcG9ydHVuaXR5X3F1aWNrX2VkaXQnLFxyXG4gIHJlc291cmNlS2luZDogJ29wcG9ydHVuaXRpZXMnLFxyXG4gIGluc2VydFNlY3VyaXR5OiAnRW50aXRpZXMvT3Bwb3J0dW5pdHkvQWRkJyxcclxuICB1cGRhdGVTZWN1cml0eTogJ0VudGl0aWVzL09wcG9ydHVuaXR5L0VkaXQnLFxyXG4gIHF1ZXJ5U2VsZWN0OiBbXHJcbiAgICAnQWNjb3VudC9BY2NvdW50TmFtZScsXHJcbiAgICAnQ2xvc2VQcm9iYWJpbGl0eScsXHJcbiAgICAnRXN0aW1hdGVkQ2xvc2UnLFxyXG4gICAgJ0V4Y2hhbmdlUmF0ZScsXHJcbiAgICAnRXhjaGFuZ2VSYXRlQ29kZScsXHJcbiAgICAnRXhjaGFuZ2VSYXRlRGF0ZScsXHJcbiAgICAnRXhjaGFuZ2VSYXRlTG9ja2VkJyxcclxuICAgICdTYWxlc1BvdGVudGlhbCcsXHJcbiAgICAnU3RhZ2UnLFxyXG4gICAgJ3N0YXR1cycsXHJcbiAgXSxcclxuICBxdWVyeUluY2x1ZGU6IFtcclxuICAgICckcGVybWlzc2lvbnMnLFxyXG4gIF0sXHJcbiAgaW5pdDogZnVuY3Rpb24gaW5pdCgpIHtcclxuICAgIHRoaXMuaW5oZXJpdGVkKGFyZ3VtZW50cyk7XHJcbiAgfSxcclxuICBhcHBseUNvbnRleHQ6IGZ1bmN0aW9uIGFwcGx5Q29udGV4dCh0ZW1wbGF0ZUVudHJ5KSB7XHJcbiAgICB0aGlzLmZpZWxkcy5Fc3RpbWF0ZWRDbG9zZS5zZXRWYWx1ZSh0ZW1wbGF0ZUVudHJ5LkVzdGltYXRlZENsb3NlKTtcclxuICB9LFxyXG4gIGNyZWF0ZUxheW91dDogZnVuY3Rpb24gY3JlYXRlTGF5b3V0KCkge1xyXG4gICAgY29uc3QgZGV0YWlscyA9IHtcclxuICAgICAgdGl0bGU6IHRoaXMuZGV0YWlsc1RleHQsXHJcbiAgICAgIG5hbWU6ICdPcHBvcnR1bml0eURldGFpbHNFZGl0JyxcclxuICAgICAgY2hpbGRyZW46IFt7XHJcbiAgICAgICAgcmVsYXRlZFZpZXc6IHtcclxuICAgICAgICAgIHdpZGdldFR5cGU6ICdyZWxhdGVkQ29udGV4dCcsXHJcbiAgICAgICAgICBpZDogJ29wcF9yZWxhdGVkX2NvbnRleHRfcXVpY2tFZGl0JyxcclxuICAgICAgICB9LFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbGFiZWw6IHRoaXMuc3RhZ2VUZXh0LFxyXG4gICAgICAgIG5hbWU6ICdTdGFnZScsXHJcbiAgICAgICAgcHJvcGVydHk6ICdTdGFnZScsXHJcbiAgICAgICAgcGlja2xpc3Q6ICdPcHBvcnR1bml0eSBTdGFnZScsXHJcbiAgICAgICAgcmVxdWlyZVNlbGVjdGlvbjogdHJ1ZSxcclxuICAgICAgICBlbmFibGVkOiBmYWxzZSxcclxuICAgICAgICB0aXRsZTogdGhpcy5vcHBvcnR1bml0eVN0YWdlVGl0bGVUZXh0LFxyXG4gICAgICAgIHR5cGU6ICdwaWNrbGlzdCcsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBsYWJlbDogdGhpcy5wcm9iYWJpbGl0eVRleHQsXHJcbiAgICAgICAgbmFtZTogJ0Nsb3NlUHJvYmFiaWxpdHknLFxyXG4gICAgICAgIHByb3BlcnR5OiAnQ2xvc2VQcm9iYWJpbGl0eScsXHJcbiAgICAgICAgcGlja2xpc3Q6ICdPcHBvcnR1bml0eSBQcm9iYWJpbGl0eScsXHJcbiAgICAgICAgdGl0bGU6IHRoaXMucHJvYmFiaWxpdHlUaXRsZVRleHQsXHJcbiAgICAgICAgdHlwZTogJ3BpY2tsaXN0JyxcclxuICAgICAgICB2YWxpZGF0b3I6IFtcclxuICAgICAgICAgIHZhbGlkYXRvci5pc0ludDMyLFxyXG4gICAgICAgICAgdmFsaWRhdG9yLmlzSW50ZWdlcixcclxuICAgICAgICBdLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbGFiZWw6IHRoaXMucG90ZW50aWFsVGV4dCxcclxuICAgICAgICBuYW1lOiAnU2FsZXNQb3RlbnRpYWwnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnU2FsZXNQb3RlbnRpYWwnLFxyXG4gICAgICAgIHByZWNpc2lvbjogMixcclxuICAgICAgICB0eXBlOiAnbXVsdGlDdXJyZW5jeScsXHJcbiAgICAgICAgdmFsaWRhdGlvblRyaWdnZXI6ICdrZXl1cCcsXHJcbiAgICAgICAgdmFsaWRhdG9yOiB2YWxpZGF0b3IuaXNDdXJyZW5jeSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIGxhYmVsOiB0aGlzLmVzdENsb3NlVGV4dCxcclxuICAgICAgICBuYW1lOiAnRXN0aW1hdGVkQ2xvc2UnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnRXN0aW1hdGVkQ2xvc2UnLFxyXG4gICAgICAgIHR5cGU6ICdkYXRlJyxcclxuICAgICAgICB0aW1lbGVzczogdHJ1ZSxcclxuICAgICAgICB2YWxpZGF0b3I6IHZhbGlkYXRvci5leGlzdHMsXHJcbiAgICAgIH1dLFxyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBsYXlvdXQgPSB0aGlzLmxheW91dCB8fCAodGhpcy5sYXlvdXQgPSBbXSk7XHJcblxyXG4gICAgaWYgKGxheW91dC5sZW5ndGggPiAwKSB7XHJcbiAgICAgIHJldHVybiBsYXlvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgbGF5b3V0LnB1c2goZGV0YWlscyk7XHJcbiAgICByZXR1cm4gbGF5b3V0O1xyXG4gIH0sXHJcbiAgc2V0VmFsdWVzOiBmdW5jdGlvbiBzZXRWYWx1ZXModmFsdWVzKSB7XHJcbiAgICB0aGlzLmluaGVyaXRlZChhcmd1bWVudHMpO1xyXG4gICAgdGhpcy5lbmFibGVTdGFnZSh2YWx1ZXMuJGtleSk7XHJcbiAgICB0aGlzLmVuYWJsZVByb2JhYmlsaXR5KHZhbHVlcyk7XHJcbiAgICB0aGlzLmZpZWxkcy5TYWxlc1BvdGVudGlhbC5zZXRDdXJyZW5jeUNvZGUoQXBwLmdldEJhc2VFeGNoYW5nZVJhdGUoKS5jb2RlKTtcclxuICB9LFxyXG4gIGVuYWJsZVN0YWdlOiBmdW5jdGlvbiBlbmFibGVTdGFnZShvcHBvcnR1bml0eUlkKSB7XHJcbiAgICBjb25zdCBmaWVsZCA9IHRoaXMuZmllbGRzLlN0YWdlO1xyXG4gICAgbGV0IGxhYmVsID0gdGhpcy5zdGFnZVRleHQ7XHJcblxyXG4gICAgaWYgKCFmaWVsZCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgZmllbGQuZGlzYWJsZSgpO1xyXG4gICAgc2FsZXNQcm9jZXNzVXRpbGl0eS5nZXRTYWxlc1Byb2Nlc3NCeUVudGl0eUlkKG9wcG9ydHVuaXR5SWQpLnRoZW4oKHNhbGVzUHJvY2VzcykgPT4ge1xyXG4gICAgICBpZiAoc2FsZXNQcm9jZXNzKSB7XHJcbiAgICAgICAgZmllbGQuZGlzYWJsZSgpO1xyXG4gICAgICAgIGxhYmVsID0gdGhpcy5zYWxlc1Byb2Nlc3NUZXh0ICsgc2FsZXNQcm9jZXNzLiRkZXNjcmlwdG9yO1xyXG4gICAgICAgIHRoaXMuc2V0U3RhZ2VMYWJlbChsYWJlbCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZmllbGQuZW5hYmxlKCk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgdGhpcy5zZXRTdGFnZUxhYmVsKGxhYmVsKTtcclxuICB9LFxyXG4gIHNldFN0YWdlTGFiZWw6IGZ1bmN0aW9uIHNldFN0YWdlTGFiZWwobGFiZWwpIHtcclxuICAgIGNvbnN0IGZpZWxkID0gdGhpcy5maWVsZHMuU3RhZ2U7XHJcbiAgICBpZiAoZmllbGQgJiYgZmllbGQuZG9tTm9kZSkge1xyXG4gICAgICBjb25zdCBub2RlID0gJCgnW2Zvcj1cIlN0YWdlXCJdJywgZmllbGQuZG9tTm9kZSk7XHJcbiAgICAgIGlmIChub2RlICYmIG5vZGUubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICQobm9kZVswXSkuYXR0cignaW5uZXJIVE1MJywgbGFiZWwpOyAvLyBUT0RPOiBTREsncyBfRmllbGQgc2hvdWxkIHByb3ZpZGUgYSBsYWJlbCBzZXR0ZXJcclxuICAgICAgfVxyXG4gICAgfVxyXG4gIH0sXHJcbiAgZW5hYmxlUHJvYmFiaWxpdHk6IGZ1bmN0aW9uIGVuYWJsZVByb2JhYmlsaXR5KGVudHJ5KSB7XHJcbiAgICBjb25zdCBmaWVsZCA9IHRoaXMuZmllbGRzLkNsb3NlUHJvYmFiaWxpdHk7XHJcbiAgICBpZiAoIWZpZWxkKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGZpZWxkLmVuYWJsZSgpO1xyXG4gICAgaWYgKHRoaXMuaXNDbG9zZWQoZW50cnkpKSB7XHJcbiAgICAgIGZpZWxkLmRpc2FibGUoKTtcclxuICAgIH1cclxuICB9LFxyXG4gIGlzQ2xvc2VkOiBmdW5jdGlvbiBpc0Nsb3NlZChlbnRyeSkge1xyXG4gICAgY29uc3Qgc3RhdHVzID0gZW50cnkuU3RhdHVzO1xyXG4gICAgaWYgKChzdGF0dXMgPT09IHRoaXMuc3RhdHVzQ2xvc2VkV29uVGV4dCkgfHwgKHN0YXR1cyA9PT0gdGhpcy5zdGF0dXNDbG9zZWRMb3N0VGV4dCkpIHtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfSxcclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBfX2NsYXNzO1xyXG4iXX0=
define('crm/Views/Opportunity/Edit', ['module', 'exports', 'dojo/_base/declare', '../../Validator', '../../Template', 'argos/Utility', 'argos/Edit', 'argos/I18n'], function (module, exports, _declare, _Validator, _Template, _Utility, _Edit, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _Validator2 = _interopRequireDefault(_Validator);

  var _Template2 = _interopRequireDefault(_Template);

  var _Utility2 = _interopRequireDefault(_Utility);

  var _Edit2 = _interopRequireDefault(_Edit);

  var _I18n2 = _interopRequireDefault(_I18n);

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

  var resource = (0, _I18n2.default)('opportunityEdit');
  var dtFormatResource = (0, _I18n2.default)('opportunityEditDateTimeFormat');

  /**
   * @class crm.Views.Opportunity.Edit
   *
   * @extends argos.Edit
   *
   * @requires argos.Utility
   *
   * @requires crm.Validator
   * @requires crm.Template
   */
  var __class = (0, _declare2.default)('crm.Views.Opportunity.Edit', [_Edit2.default], {
    // Localization
    accountText: resource.accountText,
    acctMgrText: resource.acctMgrText,
    estCloseText: resource.estCloseText,
    importSourceText: resource.importSourceText,
    detailsText: resource.detailsText,
    opportunityStatusTitleText: resource.opportunityStatusTitleText,
    opportunityText: resource.opportunityText,
    opportunityTypeTitleText: resource.opportunityTypeTitleText,
    ownerText: resource.ownerText,
    potentialText: resource.potentialText,
    probabilityText: resource.probabilityText,
    probabilityTitleText: resource.probabilityTitleText,
    resellerText: resource.resellerText,
    statusText: resource.statusText,
    titleText: resource.titleText,
    typeText: resource.typeText,
    multiCurrencyText: resource.multiCurrencyText,
    multiCurrencyRateText: resource.multiCurrencyRateText,
    multiCurrencyCodeText: resource.multiCurrencyCodeText,
    multiCurrencyDateText: resource.multiCurrencyDateText,
    multiCurrencyLockedText: resource.multiCurrencyLockedText,
    exchangeRateDateFormatText: dtFormatResource.exchangeRateDateFormatText,
    exchangeRateDateFormatText24: dtFormatResource.exchangeRateDateFormatText24,
    subTypePickListResellerText: resource.subTypePickListResellerText,

    // View Properties
    entityName: 'Opportunity',
    id: 'opportunity_edit',
    resourceKind: 'opportunities',
    insertSecurity: 'Entities/Opportunity/Add',
    updateSecurity: 'Entities/Opportunity/Edit',
    querySelect: ['Account/AccountName', 'AccountManager/UserInfo/FirstName', 'AccountManager/UserInfo/LastName', 'CloseProbability', 'Contacts', 'Description', 'EstimatedClose', 'ExchangeRate', 'ExchangeRateCode', 'ExchangeRateDate', 'ExchangeRateLocked', 'LeadSource/Description', 'Owner/OwnerDescription', 'Reseller/AccountName', 'SalesPotential', 'Stage', 'Status', 'Type', 'Weighted'],
    queryInclude: ['$permissions'],
    init: function init() {
      this.inherited(arguments);
      this.connect(this.fields.Account, 'onChange', this.onAccountChange);

      if (App.hasMultiCurrency()) {
        this.connect(this.fields.ExchangeRateCode, 'onChange', this.onExchangeRateCodeChange);
        this.connect(this.fields.ExchangeRateLocked, 'onChange', this.onExchangeRateLockedChange);
      }
    },
    applyContext: function applyContext(templateEntry) {
      var found = App.queryNavigationContext(function (o) {
        return (/^(accounts|contacts)$/.test(o.resourceKind) && o.key
        );
      });

      var lookup = {
        accounts: this.applyAccountContext,
        contacts: this.applyContactContext
      };

      if (found && lookup[found.resourceKind]) {
        lookup[found.resourceKind].call(this, found);
      } else {
        this.applyDefaultContext(templateEntry);
      }

      this.fields.Status.setValue(templateEntry.Status);
      this.fields.CloseProbability.setValue(templateEntry.CloseProbability);
      this.fields.EstimatedClose.setValue(templateEntry.EstimatedClose);

      if (App.hasMultiCurrency() && templateEntry) {
        if (templateEntry.ExchangeRateCode) {
          this.fields.ExchangeRateCode.setValue({
            $key: templateEntry.ExchangeRateCode,
            $descriptor: templateEntry.ExchangeRateCode
          });
        }

        if (templateEntry.ExchangeRate) {
          this.fields.ExchangeRate.setValue(templateEntry.ExchangeRate);
        }

        if (templateEntry.ExchangeRateDate) {
          this.fields.ExchangeRateDate.setValue(templateEntry.ExchangeRateDate);
        }
      }
    },
    setValues: function setValues(values) {
      this.inherited(arguments);
      if (App.hasMultiCurrency()) {
        if (values && values.ExchangeRateCode) {
          this.fields.ExchangeRateCode.setValue({
            $key: values.ExchangeRateCode,
            $descriptor: values.ExchangeRateCode
          });
        }

        if (!App.canLockOpportunityRate()) {
          this.fields.ExchangeRateLocked.disable();
        }

        if (!App.canChangeOpportunityRate()) {
          this.fields.ExchangeRate.disable();
          this.fields.ExchangeRateCode.disable();
        }

        this.fields.ExchangeRateDate.disable();
      }

      this.fields.SalesPotential.setCurrencyCode(App.getBaseExchangeRate().code);
    },
    getValues: function getValues() {
      var values = this.inherited(arguments);

      if (values) {
        var code = values.ExchangeRateCode;
        values.ExchangeRateCode = code && code.$key;
      }

      return values;
    },
    applyDefaultContext: function applyDefaultContext() {
      this.fields.AccountManager.setValue(App.context.user);
      this.fields.Owner.setValue(App.context.defaultOwner);
    },
    applyAccountContext: function applyAccountContext(context) {
      var view = App.getView(context.id);
      var entry = view && view.entry;

      this.fields.Account.setValue(entry);
      this.fields.AccountManager.setValue(_Utility2.default.getValue(entry, 'AccountManager'));
      this.fields.Owner.setValue(_Utility2.default.getValue(entry, 'Owner'));
    },
    applyContactContext: function applyContactContext(context) {
      var view = App.getView(context.id);
      var entry = view && view.entry;

      this.fields.Account.setValue(_Utility2.default.getValue(entry, 'Account'));
      this.fields.AccountManager.setValue(_Utility2.default.getValue(entry, 'AccountManager'));
      this.fields.Owner.setValue(_Utility2.default.getValue(entry, 'Owner'));
      this.fields['Contacts.$resources[0].Contact.$key'].setValue(entry.$key);
    },
    onExchangeRateCodeChange: function onExchangeRateCodeChange(value, field) {
      var selection = field.getSelection();
      if (selection && selection.Rate) {
        this.fields.ExchangeRate.setValue(selection.Rate);
        this.fields.ExchangeRateDate.setValue(new Date(Date.now()));
      }
    },
    onExchangeRateLockedChange: function onExchangeRateLockedChange(value) {
      if (value === true) {
        this.fields.ExchangeRate.disable();
        this.fields.ExchangeRateCode.disable();
      } else if (!App.canChangeOpportunityRate()) {
        this.fields.ExchangeRate.disable();
        this.fields.ExchangeRateCode.disable();
      } else {
        this.fields.ExchangeRate.enable();
        this.fields.ExchangeRateCode.enable();
      }

      this.fields.ExchangeRateDate.setValue(new Date(Date.now()));
    },
    onAccountChange: function onAccountChange(value, field) {
      var selection = field.getSelection();

      // todo: match behavior in web client; if the account manager (AM) is explicitly set, it should stay, otherwise
      // it should be set to the AM for the selected account (and change each time).
      if (selection && this.insert) {
        this.fields.AccountManager.setValue(_Utility2.default.getValue(selection, 'AccountManager'));
      }
    },
    createLayout: function createLayout() {
      var details = {
        title: this.detailsText,
        name: 'OpportunityDetailsEdit',
        children: [{
          label: this.opportunityText,
          name: 'Description',
          property: 'Description',
          type: 'text',
          maxTextLength: 64,
          validator: [_Validator2.default.notEmpty, _Validator2.default.exceedsMaxTextLength],
          autoFocus: true
        }, {
          label: this.accountText,
          name: 'Account',
          property: 'Account',
          textProperty: 'AccountName',
          type: 'lookup',
          validator: _Validator2.default.exists,
          view: 'account_related',
          viewMixin: {
            hasSettings: false
          }
        }, {
          label: this.acctMgrText,
          name: 'AccountManager',
          property: 'AccountManager',
          textProperty: 'UserInfo',
          textTemplate: _Template2.default.nameLF,
          type: 'lookup',
          view: 'user_list'
        }, {
          label: this.resellerText,
          name: 'Reseller',
          property: 'Reseller',
          textProperty: 'AccountName',
          type: 'lookup',
          view: 'account_related',
          where: 'upper(SubType) eq "' + this.subTypePickListResellerText + '"',
          viewMixin: {
            hasSettings: false,
            onTransitionTo: function onTransitionTo(self) {
              // Clear the initial where clause, allowing the user to search for others if they want
              self.options.where = '';
            }
          }
        }, {
          label: this.estCloseText,
          name: 'EstimatedClose',
          property: 'EstimatedClose',
          type: 'date',
          timeless: true,
          validator: _Validator2.default.exists
        }, {
          label: this.potentialText,
          name: 'SalesPotential',
          property: 'SalesPotential',
          precision: 2,
          type: 'multiCurrency',
          validationTrigger: 'keyup',
          validator: _Validator2.default.isCurrency
        }, {
          label: this.typeText,
          name: 'Type',
          property: 'Type',
          picklist: 'Opportunity Type',
          title: this.opportunityTypeTitleText,
          type: 'picklist',
          maxTextLength: 64,
          validator: _Validator2.default.exceedsMaxTextLength
        }, {
          label: this.statusText,
          name: 'Status',
          property: 'Status',
          picklist: 'Opportunity Status',
          requireSelection: true,
          title: this.opportunityStatusTitleText,
          type: 'picklist'
        }, {
          label: this.importSourceText,
          name: 'LeadSource',
          property: 'LeadSource',
          textProperty: 'Description',
          type: 'lookup',
          view: 'leadsource_list'
        }, {
          label: this.ownerText,
          name: 'Owner',
          property: 'Owner',
          keyProperty: '$key',
          textProperty: 'OwnerDescription',
          type: 'lookup',
          validator: _Validator2.default.exists,
          view: 'owner_list'
        }, {
          label: this.probabilityText,
          name: 'CloseProbability',
          property: 'CloseProbability',
          picklist: 'Opportunity Probability',
          title: this.probabilityTitleText,
          type: 'picklist',
          validator: [_Validator2.default.isInt32, _Validator2.default.isInteger]
        }, {
          name: 'Contacts.$resources[0].Contact.$key',
          property: 'Contacts.$resources[0].Contact.$key',
          type: 'hidden'
        }]
      };

      var multiCurrency = {
        title: this.multiCurrencyText,
        name: 'OpportunityMultiCurrencyEdit',
        children: [{
          label: this.multiCurrencyRateText,
          name: 'ExchangeRate',
          property: 'ExchangeRate',
          type: 'text',
          validator: _Validator2.default.isDecimal
        }, {
          label: this.multiCurrencyCodeText,
          name: 'ExchangeRateCode',
          property: 'ExchangeRateCode',
          textProperty: '$key',
          type: 'lookup',
          view: 'exchangerate_lookup'
        }, {
          label: this.multiCurrencyLockedText,
          name: 'ExchangeRateLocked',
          property: 'ExchangeRateLocked',
          type: 'boolean'
        }, {
          label: this.multiCurrencyDateText,
          name: 'ExchangeRateDate',
          property: 'ExchangeRateDate',
          type: 'date',
          timeless: false,
          dateFormatText: App.is24HourClock() ? this.exchangeRateDateFormatText24 : this.exchangeRateDateFormatText,
          disabled: true // TODO: Create an SDK issue for this (NOT WORKING!!!)
        }]
      };

      var layout = this.layout || (this.layout = []);

      if (layout.length > 0) {
        return layout;
      }

      layout.push(details);

      if (App.hasMultiCurrency()) {
        layout.push(multiCurrency);
      }

      return layout;
    }
  });

  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9WaWV3cy9PcHBvcnR1bml0eS9FZGl0LmpzIl0sIm5hbWVzIjpbInJlc291cmNlIiwiZHRGb3JtYXRSZXNvdXJjZSIsIl9fY2xhc3MiLCJhY2NvdW50VGV4dCIsImFjY3RNZ3JUZXh0IiwiZXN0Q2xvc2VUZXh0IiwiaW1wb3J0U291cmNlVGV4dCIsImRldGFpbHNUZXh0Iiwib3Bwb3J0dW5pdHlTdGF0dXNUaXRsZVRleHQiLCJvcHBvcnR1bml0eVRleHQiLCJvcHBvcnR1bml0eVR5cGVUaXRsZVRleHQiLCJvd25lclRleHQiLCJwb3RlbnRpYWxUZXh0IiwicHJvYmFiaWxpdHlUZXh0IiwicHJvYmFiaWxpdHlUaXRsZVRleHQiLCJyZXNlbGxlclRleHQiLCJzdGF0dXNUZXh0IiwidGl0bGVUZXh0IiwidHlwZVRleHQiLCJtdWx0aUN1cnJlbmN5VGV4dCIsIm11bHRpQ3VycmVuY3lSYXRlVGV4dCIsIm11bHRpQ3VycmVuY3lDb2RlVGV4dCIsIm11bHRpQ3VycmVuY3lEYXRlVGV4dCIsIm11bHRpQ3VycmVuY3lMb2NrZWRUZXh0IiwiZXhjaGFuZ2VSYXRlRGF0ZUZvcm1hdFRleHQiLCJleGNoYW5nZVJhdGVEYXRlRm9ybWF0VGV4dDI0Iiwic3ViVHlwZVBpY2tMaXN0UmVzZWxsZXJUZXh0IiwiZW50aXR5TmFtZSIsImlkIiwicmVzb3VyY2VLaW5kIiwiaW5zZXJ0U2VjdXJpdHkiLCJ1cGRhdGVTZWN1cml0eSIsInF1ZXJ5U2VsZWN0IiwicXVlcnlJbmNsdWRlIiwiaW5pdCIsImluaGVyaXRlZCIsImFyZ3VtZW50cyIsImNvbm5lY3QiLCJmaWVsZHMiLCJBY2NvdW50Iiwib25BY2NvdW50Q2hhbmdlIiwiQXBwIiwiaGFzTXVsdGlDdXJyZW5jeSIsIkV4Y2hhbmdlUmF0ZUNvZGUiLCJvbkV4Y2hhbmdlUmF0ZUNvZGVDaGFuZ2UiLCJFeGNoYW5nZVJhdGVMb2NrZWQiLCJvbkV4Y2hhbmdlUmF0ZUxvY2tlZENoYW5nZSIsImFwcGx5Q29udGV4dCIsInRlbXBsYXRlRW50cnkiLCJmb3VuZCIsInF1ZXJ5TmF2aWdhdGlvbkNvbnRleHQiLCJvIiwidGVzdCIsImtleSIsImxvb2t1cCIsImFjY291bnRzIiwiYXBwbHlBY2NvdW50Q29udGV4dCIsImNvbnRhY3RzIiwiYXBwbHlDb250YWN0Q29udGV4dCIsImNhbGwiLCJhcHBseURlZmF1bHRDb250ZXh0IiwiU3RhdHVzIiwic2V0VmFsdWUiLCJDbG9zZVByb2JhYmlsaXR5IiwiRXN0aW1hdGVkQ2xvc2UiLCIka2V5IiwiJGRlc2NyaXB0b3IiLCJFeGNoYW5nZVJhdGUiLCJFeGNoYW5nZVJhdGVEYXRlIiwic2V0VmFsdWVzIiwidmFsdWVzIiwiY2FuTG9ja09wcG9ydHVuaXR5UmF0ZSIsImRpc2FibGUiLCJjYW5DaGFuZ2VPcHBvcnR1bml0eVJhdGUiLCJTYWxlc1BvdGVudGlhbCIsInNldEN1cnJlbmN5Q29kZSIsImdldEJhc2VFeGNoYW5nZVJhdGUiLCJjb2RlIiwiZ2V0VmFsdWVzIiwiQWNjb3VudE1hbmFnZXIiLCJjb250ZXh0IiwidXNlciIsIk93bmVyIiwiZGVmYXVsdE93bmVyIiwidmlldyIsImdldFZpZXciLCJlbnRyeSIsImdldFZhbHVlIiwidmFsdWUiLCJmaWVsZCIsInNlbGVjdGlvbiIsImdldFNlbGVjdGlvbiIsIlJhdGUiLCJEYXRlIiwibm93IiwiZW5hYmxlIiwiaW5zZXJ0IiwiY3JlYXRlTGF5b3V0IiwiZGV0YWlscyIsInRpdGxlIiwibmFtZSIsImNoaWxkcmVuIiwibGFiZWwiLCJwcm9wZXJ0eSIsInR5cGUiLCJtYXhUZXh0TGVuZ3RoIiwidmFsaWRhdG9yIiwibm90RW1wdHkiLCJleGNlZWRzTWF4VGV4dExlbmd0aCIsImF1dG9Gb2N1cyIsInRleHRQcm9wZXJ0eSIsImV4aXN0cyIsInZpZXdNaXhpbiIsImhhc1NldHRpbmdzIiwidGV4dFRlbXBsYXRlIiwibmFtZUxGIiwid2hlcmUiLCJvblRyYW5zaXRpb25UbyIsInNlbGYiLCJvcHRpb25zIiwidGltZWxlc3MiLCJwcmVjaXNpb24iLCJ2YWxpZGF0aW9uVHJpZ2dlciIsImlzQ3VycmVuY3kiLCJwaWNrbGlzdCIsInJlcXVpcmVTZWxlY3Rpb24iLCJrZXlQcm9wZXJ0eSIsImlzSW50MzIiLCJpc0ludGVnZXIiLCJtdWx0aUN1cnJlbmN5IiwiaXNEZWNpbWFsIiwiZGF0ZUZvcm1hdFRleHQiLCJpczI0SG91ckNsb2NrIiwiZGlzYWJsZWQiLCJsYXlvdXQiLCJsZW5ndGgiLCJwdXNoIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7QUFzQkEsTUFBTUEsV0FBVyxvQkFBWSxpQkFBWixDQUFqQjtBQUNBLE1BQU1DLG1CQUFtQixvQkFBWSwrQkFBWixDQUF6Qjs7QUFFQTs7Ozs7Ozs7OztBQVVBLE1BQU1DLFVBQVUsdUJBQVEsNEJBQVIsRUFBc0MsZ0JBQXRDLEVBQThDO0FBQzVEO0FBQ0FDLGlCQUFhSCxTQUFTRyxXQUZzQztBQUc1REMsaUJBQWFKLFNBQVNJLFdBSHNDO0FBSTVEQyxrQkFBY0wsU0FBU0ssWUFKcUM7QUFLNURDLHNCQUFrQk4sU0FBU00sZ0JBTGlDO0FBTTVEQyxpQkFBYVAsU0FBU08sV0FOc0M7QUFPNURDLGdDQUE0QlIsU0FBU1EsMEJBUHVCO0FBUTVEQyxxQkFBaUJULFNBQVNTLGVBUmtDO0FBUzVEQyw4QkFBMEJWLFNBQVNVLHdCQVR5QjtBQVU1REMsZUFBV1gsU0FBU1csU0FWd0M7QUFXNURDLG1CQUFlWixTQUFTWSxhQVhvQztBQVk1REMscUJBQWlCYixTQUFTYSxlQVprQztBQWE1REMsMEJBQXNCZCxTQUFTYyxvQkFiNkI7QUFjNURDLGtCQUFjZixTQUFTZSxZQWRxQztBQWU1REMsZ0JBQVloQixTQUFTZ0IsVUFmdUM7QUFnQjVEQyxlQUFXakIsU0FBU2lCLFNBaEJ3QztBQWlCNURDLGNBQVVsQixTQUFTa0IsUUFqQnlDO0FBa0I1REMsdUJBQW1CbkIsU0FBU21CLGlCQWxCZ0M7QUFtQjVEQywyQkFBdUJwQixTQUFTb0IscUJBbkI0QjtBQW9CNURD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QUFHREcsb0JBQVUsa0JBSFQ7QUFJRE8sd0JBQWMsTUFKYjtBQUtETixnQkFBTSxRQUxMO0FBTURwQixnQkFBTTtBQU5MLFNBTk8sRUFhUDtBQUNEa0IsaUJBQU8sS0FBSy9FLHVCQURYO0FBRUQ2RSxnQkFBTSxvQkFGTDtBQUdERyxvQkFBVSxvQkFIVDtBQUlEQyxnQkFBTTtBQUpMLFNBYk8sRUFrQlA7QUFDREYsaUJBQU8sS0FBS2hGLHFCQURYO0FBRUQ4RSxnQkFBTSxrQkFGTDtBQUdERyxvQkFBVSxrQkFIVDtBQUlEQyxnQkFBTSxNQUpMO0FBS0RnQixvQkFBVSxLQUxUO0FBTURXLDBCQUFpQjFGLElBQUkyRixhQUFKLEVBQUQsR0FBd0IsS0FBSzNHLDRCQUE3QixHQUE0RCxLQUFLRCwwQkFOaEY7QUFPRDZHLG9CQUFVLElBUFQsQ0FPZTtBQVBmLFNBbEJPO0FBSFUsT0FBdEI7O0FBZ0NBLFVBQU1DLFNBQVMsS0FBS0EsTUFBTCxLQUFnQixLQUFLQSxNQUFMLEdBQWMsRUFBOUIsQ0FBZjs7QUFFQSxVQUFJQSxPQUFPQyxNQUFQLEdBQWdCLENBQXBCLEVBQXVCO0FBQ3JCLGVBQU9ELE1BQVA7QUFDRDs7QUFFREEsYUFBT0UsSUFBUCxDQUFZdEMsT0FBWjs7QUFFQSxVQUFJekQsSUFBSUMsZ0JBQUosRUFBSixFQUE0QjtBQUMxQjRGLGVBQU9FLElBQVAsQ0FBWVAsYUFBWjtBQUNEOztBQUVELGFBQU9LLE1BQVA7QUFDRDtBQTVWMkQsR0FBOUMsQ0FBaEI7O29CQStWZXBJLE8iLCJmaWxlIjoiRWRpdC5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBDb3B5cmlnaHQgMjAxNyBJbmZvclxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBkZWNsYXJlIGZyb20gJ2Rvam8vX2Jhc2UvZGVjbGFyZSc7XHJcbmltcG9ydCB2YWxpZGF0b3IgZnJvbSAnLi4vLi4vVmFsaWRhdG9yJztcclxuaW1wb3J0IHRlbXBsYXRlIGZyb20gJy4uLy4uL1RlbXBsYXRlJztcclxuaW1wb3J0IHV0aWxpdHkgZnJvbSAnYXJnb3MvVXRpbGl0eSc7XHJcbmltcG9ydCBFZGl0IGZyb20gJ2FyZ29zL0VkaXQnO1xyXG5pbXBvcnQgZ2V0UmVzb3VyY2UgZnJvbSAnYXJnb3MvSTE4bic7XHJcblxyXG5jb25zdCByZXNvdXJjZSA9IGdldFJlc291cmNlKCdvcHBvcnR1bml0eUVkaXQnKTtcclxuY29uc3QgZHRGb3JtYXRSZXNvdXJjZSA9IGdldFJlc291cmNlKCdvcHBvcnR1bml0eUVkaXREYXRlVGltZUZvcm1hdCcpO1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBjcm0uVmlld3MuT3Bwb3J0dW5pdHkuRWRpdFxyXG4gKlxyXG4gKiBAZXh0ZW5kcyBhcmdvcy5FZGl0XHJcbiAqXHJcbiAqIEByZXF1aXJlcyBhcmdvcy5VdGlsaXR5XHJcbiAqXHJcbiAqIEByZXF1aXJlcyBjcm0uVmFsaWRhdG9yXHJcbiAqIEByZXF1aXJlcyBjcm0uVGVtcGxhdGVcclxuICovXHJcbmNvbnN0IF9fY2xhc3MgPSBkZWNsYXJlKCdjcm0uVmlld3MuT3Bwb3J0dW5pdHkuRWRpdCcsIFtFZGl0XSwge1xyXG4gIC8vIExvY2FsaXphdGlvblxyXG4gIGFjY291bnRUZXh0OiByZXNvdXJjZS5hY2NvdW50VGV4dCxcclxuICBhY2N0TWdyVGV4dDogcmVzb3VyY2UuYWNjdE1nclRleHQsXHJcbiAgZXN0Q2xvc2VUZXh0OiByZXNvdXJjZS5lc3RDbG9zZVRleHQsXHJcbiAgaW1wb3J0U291cmNlVGV4dDogcmVzb3VyY2UuaW1wb3J0U291cmNlVGV4dCxcclxuICBkZXRhaWxzVGV4dDogcmVzb3VyY2UuZGV0YWlsc1RleHQsXHJcbiAgb3Bwb3J0dW5pdHlTdGF0dXNUaXRsZVRleHQ6IHJlc291cmNlLm9wcG9ydHVuaXR5U3RhdHVzVGl0bGVUZXh0LFxyXG4gIG9wcG9ydHVuaXR5VGV4dDogcmVzb3VyY2Uub3Bwb3J0dW5pdHlUZXh0LFxyXG4gIG9wcG9ydHVuaXR5VHlwZVRpdGxlVGV4dDogcmVzb3VyY2Uub3Bwb3J0dW5pdHlUeXBlVGl0bGVUZXh0LFxyXG4gIG93bmVyVGV4dDogcmVzb3VyY2Uub3duZXJUZXh0LFxyXG4gIHBvdGVudGlhbFRleHQ6IHJlc291cmNlLnBvdGVudGlhbFRleHQsXHJcbiAgcHJvYmFiaWxpdHlUZXh0OiByZXNvdXJjZS5wcm9iYWJpbGl0eVRleHQsXHJcbiAgcHJvYmFiaWxpdHlUaXRsZVRleHQ6IHJlc291cmNlLnByb2JhYmlsaXR5VGl0bGVUZXh0LFxyXG4gIHJlc2VsbGVyVGV4dDogcmVzb3VyY2UucmVzZWxsZXJUZXh0LFxyXG4gIHN0YXR1c1RleHQ6IHJlc291cmNlLnN0YXR1c1RleHQsXHJcbiAgdGl0bGVUZXh0OiByZXNvdXJjZS50aXRsZVRleHQsXHJcbiAgdHlwZVRleHQ6IHJlc291cmNlLnR5cGVUZXh0LFxyXG4gIG11bHRpQ3VycmVuY3lUZXh0OiByZXNvdXJjZS5tdWx0aUN1cnJlbmN5VGV4dCxcclxuICBtdWx0aUN1cnJlbmN5UmF0ZVRleHQ6IHJlc291cmNlLm11bHRpQ3VycmVuY3lSYXRlVGV4dCxcclxuICBtdWx0aUN1cnJlbmN5Q29kZVRleHQ6IHJlc291cmNlLm11bHRpQ3VycmVuY3lDb2RlVGV4dCxcclxuICBtdWx0aUN1cnJlbmN5RGF0ZVRleHQ6IHJlc291cmNlLm11bHRpQ3VycmVuY3lEYXRlVGV4dCxcclxuICBtdWx0aUN1cnJlbmN5TG9ja2VkVGV4dDogcmVzb3VyY2UubXVsdGlDdXJyZW5jeUxvY2tlZFRleHQsXHJcbiAgZXhjaGFuZ2VSYXRlRGF0ZUZvcm1hdFRleHQ6IGR0Rm9ybWF0UmVzb3VyY2UuZXhjaGFuZ2VSYXRlRGF0ZUZvcm1hdFRleHQsXHJcbiAgZXhjaGFuZ2VSYXRlRGF0ZUZvcm1hdFRleHQyNDogZHRGb3JtYXRSZXNvdXJjZS5leGNoYW5nZVJhdGVEYXRlRm9ybWF0VGV4dDI0LFxyXG4gIHN1YlR5cGVQaWNrTGlzdFJlc2VsbGVyVGV4dDogcmVzb3VyY2Uuc3ViVHlwZVBpY2tMaXN0UmVzZWxsZXJUZXh0LFxyXG5cclxuICAvLyBWaWV3IFByb3BlcnRpZXNcclxuICBlbnRpdHlOYW1lOiAnT3Bwb3J0dW5pdHknLFxyXG4gIGlkOiAnb3Bwb3J0dW5pdHlfZWRpdCcsXHJcbiAgcmVzb3VyY2VLaW5kOiAnb3Bwb3J0dW5pdGllcycsXHJcbiAgaW5zZXJ0U2VjdXJpdHk6ICdFbnRpdGllcy9PcHBvcnR1bml0eS9BZGQnLFxyXG4gIHVwZGF0ZVNlY3VyaXR5OiAnRW50aXRpZXMvT3Bwb3J0dW5pdHkvRWRpdCcsXHJcbiAgcXVlcnlTZWxlY3Q6IFtcclxuICAgICdBY2NvdW50L0FjY291bnROYW1lJyxcclxuICAgICdBY2NvdW50TWFuYWdlci9Vc2VySW5mby9GaXJzdE5hbWUnLFxyXG4gICAgJ0FjY291bnRNYW5hZ2VyL1VzZXJJbmZvL0xhc3ROYW1lJyxcclxuICAgICdDbG9zZVByb2JhYmlsaXR5JyxcclxuICAgICdDb250YWN0cycsXHJcbiAgICAnRGVzY3JpcHRpb24nLFxyXG4gICAgJ0VzdGltYXRlZENsb3NlJyxcclxuICAgICdFeGNoYW5nZVJhdGUnLFxyXG4gICAgJ0V4Y2hhbmdlUmF0ZUNvZGUnLFxyXG4gICAgJ0V4Y2hhbmdlUmF0ZURhdGUnLFxyXG4gICAgJ0V4Y2hhbmdlUmF0ZUxvY2tlZCcsXHJcbiAgICAnTGVhZFNvdXJjZS9EZXNjcmlwdGlvbicsXHJcbiAgICAnT3duZXIvT3duZXJEZXNjcmlwdGlvbicsXHJcbiAgICAnUmVzZWxsZXIvQWNjb3VudE5hbWUnLFxyXG4gICAgJ1NhbGVzUG90ZW50aWFsJyxcclxuICAgICdTdGFnZScsXHJcbiAgICAnU3RhdHVzJyxcclxuICAgICdUeXBlJyxcclxuICAgICdXZWlnaHRlZCcsXHJcbiAgXSxcclxuICBxdWVyeUluY2x1ZGU6IFtcclxuICAgICckcGVybWlzc2lvbnMnLFxyXG4gIF0sXHJcbiAgaW5pdDogZnVuY3Rpb24gaW5pdCgpIHtcclxuICAgIHRoaXMuaW5oZXJpdGVkKGFyZ3VtZW50cyk7XHJcbiAgICB0aGlzLmNvbm5lY3QodGhpcy5maWVsZHMuQWNjb3VudCwgJ29uQ2hhbmdlJywgdGhpcy5vbkFjY291bnRDaGFuZ2UpO1xyXG5cclxuICAgIGlmIChBcHAuaGFzTXVsdGlDdXJyZW5jeSgpKSB7XHJcbiAgICAgIHRoaXMuY29ubmVjdCh0aGlzLmZpZWxkcy5FeGNoYW5nZVJhdGVDb2RlLCAnb25DaGFuZ2UnLCB0aGlzLm9uRXhjaGFuZ2VSYXRlQ29kZUNoYW5nZSk7XHJcbiAgICAgIHRoaXMuY29ubmVjdCh0aGlzLmZpZWxkcy5FeGNoYW5nZVJhdGVMb2NrZWQsICdvbkNoYW5nZScsIHRoaXMub25FeGNoYW5nZVJhdGVMb2NrZWRDaGFuZ2UpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgYXBwbHlDb250ZXh0OiBmdW5jdGlvbiBhcHBseUNvbnRleHQodGVtcGxhdGVFbnRyeSkge1xyXG4gICAgY29uc3QgZm91bmQgPSBBcHAucXVlcnlOYXZpZ2F0aW9uQ29udGV4dCgobykgPT4ge1xyXG4gICAgICByZXR1cm4gKC9eKGFjY291bnRzfGNvbnRhY3RzKSQvKS50ZXN0KG8ucmVzb3VyY2VLaW5kKSAmJiBvLmtleTtcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IGxvb2t1cCA9IHtcclxuICAgICAgYWNjb3VudHM6IHRoaXMuYXBwbHlBY2NvdW50Q29udGV4dCxcclxuICAgICAgY29udGFjdHM6IHRoaXMuYXBwbHlDb250YWN0Q29udGV4dCxcclxuICAgIH07XHJcblxyXG4gICAgaWYgKGZvdW5kICYmIGxvb2t1cFtmb3VuZC5yZXNvdXJjZUtpbmRdKSB7XHJcbiAgICAgIGxvb2t1cFtmb3VuZC5yZXNvdXJjZUtpbmRdLmNhbGwodGhpcywgZm91bmQpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5hcHBseURlZmF1bHRDb250ZXh0KHRlbXBsYXRlRW50cnkpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuZmllbGRzLlN0YXR1cy5zZXRWYWx1ZSh0ZW1wbGF0ZUVudHJ5LlN0YXR1cyk7XHJcbiAgICB0aGlzLmZpZWxkcy5DbG9zZVByb2JhYmlsaXR5LnNldFZhbHVlKHRlbXBsYXRlRW50cnkuQ2xvc2VQcm9iYWJpbGl0eSk7XHJcbiAgICB0aGlzLmZpZWxkcy5Fc3RpbWF0ZWRDbG9zZS5zZXRWYWx1ZSh0ZW1wbGF0ZUVudHJ5LkVzdGltYXRlZENsb3NlKTtcclxuXHJcbiAgICBpZiAoQXBwLmhhc011bHRpQ3VycmVuY3koKSAmJiB0ZW1wbGF0ZUVudHJ5KSB7XHJcbiAgICAgIGlmICh0ZW1wbGF0ZUVudHJ5LkV4Y2hhbmdlUmF0ZUNvZGUpIHtcclxuICAgICAgICB0aGlzLmZpZWxkcy5FeGNoYW5nZVJhdGVDb2RlLnNldFZhbHVlKHtcclxuICAgICAgICAgICRrZXk6IHRlbXBsYXRlRW50cnkuRXhjaGFuZ2VSYXRlQ29kZSxcclxuICAgICAgICAgICRkZXNjcmlwdG9yOiB0ZW1wbGF0ZUVudHJ5LkV4Y2hhbmdlUmF0ZUNvZGUsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICh0ZW1wbGF0ZUVudHJ5LkV4Y2hhbmdlUmF0ZSkge1xyXG4gICAgICAgIHRoaXMuZmllbGRzLkV4Y2hhbmdlUmF0ZS5zZXRWYWx1ZSh0ZW1wbGF0ZUVudHJ5LkV4Y2hhbmdlUmF0ZSk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIGlmICh0ZW1wbGF0ZUVudHJ5LkV4Y2hhbmdlUmF0ZURhdGUpIHtcclxuICAgICAgICB0aGlzLmZpZWxkcy5FeGNoYW5nZVJhdGVEYXRlLnNldFZhbHVlKHRlbXBsYXRlRW50cnkuRXhjaGFuZ2VSYXRlRGF0ZSk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIHNldFZhbHVlczogZnVuY3Rpb24gc2V0VmFsdWVzKHZhbHVlcykge1xyXG4gICAgdGhpcy5pbmhlcml0ZWQoYXJndW1lbnRzKTtcclxuICAgIGlmIChBcHAuaGFzTXVsdGlDdXJyZW5jeSgpKSB7XHJcbiAgICAgIGlmICh2YWx1ZXMgJiYgdmFsdWVzLkV4Y2hhbmdlUmF0ZUNvZGUpIHtcclxuICAgICAgICB0aGlzLmZpZWxkcy5FeGNoYW5nZVJhdGVDb2RlLnNldFZhbHVlKHtcclxuICAgICAgICAgICRrZXk6IHZhbHVlcy5FeGNoYW5nZVJhdGVDb2RlLFxyXG4gICAgICAgICAgJGRlc2NyaXB0b3I6IHZhbHVlcy5FeGNoYW5nZVJhdGVDb2RlLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoIUFwcC5jYW5Mb2NrT3Bwb3J0dW5pdHlSYXRlKCkpIHtcclxuICAgICAgICB0aGlzLmZpZWxkcy5FeGNoYW5nZVJhdGVMb2NrZWQuZGlzYWJsZSgpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoIUFwcC5jYW5DaGFuZ2VPcHBvcnR1bml0eVJhdGUoKSkge1xyXG4gICAgICAgIHRoaXMuZmllbGRzLkV4Y2hhbmdlUmF0ZS5kaXNhYmxlKCk7XHJcbiAgICAgICAgdGhpcy5maWVsZHMuRXhjaGFuZ2VSYXRlQ29kZS5kaXNhYmxlKCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMuZmllbGRzLkV4Y2hhbmdlUmF0ZURhdGUuZGlzYWJsZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuZmllbGRzLlNhbGVzUG90ZW50aWFsLnNldEN1cnJlbmN5Q29kZShBcHAuZ2V0QmFzZUV4Y2hhbmdlUmF0ZSgpLmNvZGUpO1xyXG4gIH0sXHJcbiAgZ2V0VmFsdWVzOiBmdW5jdGlvbiBnZXRWYWx1ZXMoKSB7XHJcbiAgICBjb25zdCB2YWx1ZXMgPSB0aGlzLmluaGVyaXRlZChhcmd1bWVudHMpO1xyXG5cclxuICAgIGlmICh2YWx1ZXMpIHtcclxuICAgICAgY29uc3QgY29kZSA9IHZhbHVlcy5FeGNoYW5nZVJhdGVDb2RlO1xyXG4gICAgICB2YWx1ZXMuRXhjaGFuZ2VSYXRlQ29kZSA9IGNvZGUgJiYgY29kZS4ka2V5O1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB2YWx1ZXM7XHJcbiAgfSxcclxuICBhcHBseURlZmF1bHRDb250ZXh0OiBmdW5jdGlvbiBhcHBseURlZmF1bHRDb250ZXh0KCkge1xyXG4gICAgdGhpcy5maWVsZHMuQWNjb3VudE1hbmFnZXIuc2V0VmFsdWUoQXBwLmNvbnRleHQudXNlcik7XHJcbiAgICB0aGlzLmZpZWxkcy5Pd25lci5zZXRWYWx1ZShBcHAuY29udGV4dC5kZWZhdWx0T3duZXIpO1xyXG4gIH0sXHJcbiAgYXBwbHlBY2NvdW50Q29udGV4dDogZnVuY3Rpb24gYXBwbHlBY2NvdW50Q29udGV4dChjb250ZXh0KSB7XHJcbiAgICBjb25zdCB2aWV3ID0gQXBwLmdldFZpZXcoY29udGV4dC5pZCk7XHJcbiAgICBjb25zdCBlbnRyeSA9IHZpZXcgJiYgdmlldy5lbnRyeTtcclxuXHJcbiAgICB0aGlzLmZpZWxkcy5BY2NvdW50LnNldFZhbHVlKGVudHJ5KTtcclxuICAgIHRoaXMuZmllbGRzLkFjY291bnRNYW5hZ2VyLnNldFZhbHVlKHV0aWxpdHkuZ2V0VmFsdWUoZW50cnksICdBY2NvdW50TWFuYWdlcicpKTtcclxuICAgIHRoaXMuZmllbGRzLk93bmVyLnNldFZhbHVlKHV0aWxpdHkuZ2V0VmFsdWUoZW50cnksICdPd25lcicpKTtcclxuICB9LFxyXG4gIGFwcGx5Q29udGFjdENvbnRleHQ6IGZ1bmN0aW9uIGFwcGx5Q29udGFjdENvbnRleHQoY29udGV4dCkge1xyXG4gICAgY29uc3QgdmlldyA9IEFwcC5nZXRWaWV3KGNvbnRleHQuaWQpO1xyXG4gICAgY29uc3QgZW50cnkgPSB2aWV3ICYmIHZpZXcuZW50cnk7XHJcblxyXG4gICAgdGhpcy5maWVsZHMuQWNjb3VudC5zZXRWYWx1ZSh1dGlsaXR5LmdldFZhbHVlKGVudHJ5LCAnQWNjb3VudCcpKTtcclxuICAgIHRoaXMuZmllbGRzLkFjY291bnRNYW5hZ2VyLnNldFZhbHVlKHV0aWxpdHkuZ2V0VmFsdWUoZW50cnksICdBY2NvdW50TWFuYWdlcicpKTtcclxuICAgIHRoaXMuZmllbGRzLk93bmVyLnNldFZhbHVlKHV0aWxpdHkuZ2V0VmFsdWUoZW50cnksICdPd25lcicpKTtcclxuICAgIHRoaXMuZmllbGRzWydDb250YWN0cy4kcmVzb3VyY2VzWzBdLkNvbnRhY3QuJGtleSddLnNldFZhbHVlKGVudHJ5LiRrZXkpO1xyXG4gIH0sXHJcbiAgb25FeGNoYW5nZVJhdGVDb2RlQ2hhbmdlOiBmdW5jdGlvbiBvbkV4Y2hhbmdlUmF0ZUNvZGVDaGFuZ2UodmFsdWUsIGZpZWxkKSB7XHJcbiAgICBjb25zdCBzZWxlY3Rpb24gPSBmaWVsZC5nZXRTZWxlY3Rpb24oKTtcclxuICAgIGlmIChzZWxlY3Rpb24gJiYgc2VsZWN0aW9uLlJhdGUpIHtcclxuICAgICAgdGhpcy5maWVsZHMuRXhjaGFuZ2VSYXRlLnNldFZhbHVlKHNlbGVjdGlvbi5SYXRlKTtcclxuICAgICAgdGhpcy5maWVsZHMuRXhjaGFuZ2VSYXRlRGF0ZS5zZXRWYWx1ZShuZXcgRGF0ZShEYXRlLm5vdygpKSk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBvbkV4Y2hhbmdlUmF0ZUxvY2tlZENoYW5nZTogZnVuY3Rpb24gb25FeGNoYW5nZVJhdGVMb2NrZWRDaGFuZ2UodmFsdWUpIHtcclxuICAgIGlmICh2YWx1ZSA9PT0gdHJ1ZSkge1xyXG4gICAgICB0aGlzLmZpZWxkcy5FeGNoYW5nZVJhdGUuZGlzYWJsZSgpO1xyXG4gICAgICB0aGlzLmZpZWxkcy5FeGNoYW5nZVJhdGVDb2RlLmRpc2FibGUoKTtcclxuICAgIH0gZWxzZSBpZiAoIUFwcC5jYW5DaGFuZ2VPcHBvcnR1bml0eVJhdGUoKSkge1xyXG4gICAgICB0aGlzLmZpZWxkcy5FeGNoYW5nZVJhdGUuZGlzYWJsZSgpO1xyXG4gICAgICB0aGlzLmZpZWxkcy5FeGNoYW5nZVJhdGVDb2RlLmRpc2FibGUoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuZmllbGRzLkV4Y2hhbmdlUmF0ZS5lbmFibGUoKTtcclxuICAgICAgdGhpcy5maWVsZHMuRXhjaGFuZ2VSYXRlQ29kZS5lbmFibGUoKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmZpZWxkcy5FeGNoYW5nZVJhdGVEYXRlLnNldFZhbHVlKG5ldyBEYXRlKERhdGUubm93KCkpKTtcclxuICB9LFxyXG4gIG9uQWNjb3VudENoYW5nZTogZnVuY3Rpb24gb25BY2NvdW50Q2hhbmdlKHZhbHVlLCBmaWVsZCkge1xyXG4gICAgY29uc3Qgc2VsZWN0aW9uID0gZmllbGQuZ2V0U2VsZWN0aW9uKCk7XHJcblxyXG4gICAgLy8gdG9kbzogbWF0Y2ggYmVoYXZpb3IgaW4gd2ViIGNsaWVudDsgaWYgdGhlIGFjY291bnQgbWFuYWdlciAoQU0pIGlzIGV4cGxpY2l0bHkgc2V0LCBpdCBzaG91bGQgc3RheSwgb3RoZXJ3aXNlXHJcbiAgICAvLyBpdCBzaG91bGQgYmUgc2V0IHRvIHRoZSBBTSBmb3IgdGhlIHNlbGVjdGVkIGFjY291bnQgKGFuZCBjaGFuZ2UgZWFjaCB0aW1lKS5cclxuICAgIGlmIChzZWxlY3Rpb24gJiYgdGhpcy5pbnNlcnQpIHtcclxuICAgICAgdGhpcy5maWVsZHMuQWNjb3VudE1hbmFnZXIuc2V0VmFsdWUodXRpbGl0eS5nZXRWYWx1ZShzZWxlY3Rpb24sICdBY2NvdW50TWFuYWdlcicpKTtcclxuICAgIH1cclxuICB9LFxyXG4gIGNyZWF0ZUxheW91dDogZnVuY3Rpb24gY3JlYXRlTGF5b3V0KCkge1xyXG4gICAgY29uc3QgZGV0YWlscyA9IHtcclxuICAgICAgdGl0bGU6IHRoaXMuZGV0YWlsc1RleHQsXHJcbiAgICAgIG5hbWU6ICdPcHBvcnR1bml0eURldGFpbHNFZGl0JyxcclxuICAgICAgY2hpbGRyZW46IFt7XHJcbiAgICAgICAgbGFiZWw6IHRoaXMub3Bwb3J0dW5pdHlUZXh0LFxyXG4gICAgICAgIG5hbWU6ICdEZXNjcmlwdGlvbicsXHJcbiAgICAgICAgcHJvcGVydHk6ICdEZXNjcmlwdGlvbicsXHJcbiAgICAgICAgdHlwZTogJ3RleHQnLFxyXG4gICAgICAgIG1heFRleHRMZW5ndGg6IDY0LFxyXG4gICAgICAgIHZhbGlkYXRvcjogW1xyXG4gICAgICAgICAgdmFsaWRhdG9yLm5vdEVtcHR5LFxyXG4gICAgICAgICAgdmFsaWRhdG9yLmV4Y2VlZHNNYXhUZXh0TGVuZ3RoLFxyXG4gICAgICAgIF0sXHJcbiAgICAgICAgYXV0b0ZvY3VzOiB0cnVlLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbGFiZWw6IHRoaXMuYWNjb3VudFRleHQsXHJcbiAgICAgICAgbmFtZTogJ0FjY291bnQnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnQWNjb3VudCcsXHJcbiAgICAgICAgdGV4dFByb3BlcnR5OiAnQWNjb3VudE5hbWUnLFxyXG4gICAgICAgIHR5cGU6ICdsb29rdXAnLFxyXG4gICAgICAgIHZhbGlkYXRvcjogdmFsaWRhdG9yLmV4aXN0cyxcclxuICAgICAgICB2aWV3OiAnYWNjb3VudF9yZWxhdGVkJyxcclxuICAgICAgICB2aWV3TWl4aW46IHtcclxuICAgICAgICAgIGhhc1NldHRpbmdzOiBmYWxzZSxcclxuICAgICAgICB9LFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbGFiZWw6IHRoaXMuYWNjdE1nclRleHQsXHJcbiAgICAgICAgbmFtZTogJ0FjY291bnRNYW5hZ2VyJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0FjY291bnRNYW5hZ2VyJyxcclxuICAgICAgICB0ZXh0UHJvcGVydHk6ICdVc2VySW5mbycsXHJcbiAgICAgICAgdGV4dFRlbXBsYXRlOiB0ZW1wbGF0ZS5uYW1lTEYsXHJcbiAgICAgICAgdHlwZTogJ2xvb2t1cCcsXHJcbiAgICAgICAgdmlldzogJ3VzZXJfbGlzdCcsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBsYWJlbDogdGhpcy5yZXNlbGxlclRleHQsXHJcbiAgICAgICAgbmFtZTogJ1Jlc2VsbGVyJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ1Jlc2VsbGVyJyxcclxuICAgICAgICB0ZXh0UHJvcGVydHk6ICdBY2NvdW50TmFtZScsXHJcbiAgICAgICAgdHlwZTogJ2xvb2t1cCcsXHJcbiAgICAgICAgdmlldzogJ2FjY291bnRfcmVsYXRlZCcsXHJcbiAgICAgICAgd2hlcmU6IGB1cHBlcihTdWJUeXBlKSBlcSBcIiR7dGhpcy5zdWJUeXBlUGlja0xpc3RSZXNlbGxlclRleHR9XCJgLFxyXG4gICAgICAgIHZpZXdNaXhpbjoge1xyXG4gICAgICAgICAgaGFzU2V0dGluZ3M6IGZhbHNlLFxyXG4gICAgICAgICAgb25UcmFuc2l0aW9uVG86IGZ1bmN0aW9uIG9uVHJhbnNpdGlvblRvKHNlbGYpIHtcclxuICAgICAgICAgICAgLy8gQ2xlYXIgdGhlIGluaXRpYWwgd2hlcmUgY2xhdXNlLCBhbGxvd2luZyB0aGUgdXNlciB0byBzZWFyY2ggZm9yIG90aGVycyBpZiB0aGV5IHdhbnRcclxuICAgICAgICAgICAgc2VsZi5vcHRpb25zLndoZXJlID0gJyc7XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBsYWJlbDogdGhpcy5lc3RDbG9zZVRleHQsXHJcbiAgICAgICAgbmFtZTogJ0VzdGltYXRlZENsb3NlJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0VzdGltYXRlZENsb3NlJyxcclxuICAgICAgICB0eXBlOiAnZGF0ZScsXHJcbiAgICAgICAgdGltZWxlc3M6IHRydWUsXHJcbiAgICAgICAgdmFsaWRhdG9yOiB2YWxpZGF0b3IuZXhpc3RzLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbGFiZWw6IHRoaXMucG90ZW50aWFsVGV4dCxcclxuICAgICAgICBuYW1lOiAnU2FsZXNQb3RlbnRpYWwnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnU2FsZXNQb3RlbnRpYWwnLFxyXG4gICAgICAgIHByZWNpc2lvbjogMixcclxuICAgICAgICB0eXBlOiAnbXVsdGlDdXJyZW5jeScsXHJcbiAgICAgICAgdmFsaWRhdGlvblRyaWdnZXI6ICdrZXl1cCcsXHJcbiAgICAgICAgdmFsaWRhdG9yOiB2YWxpZGF0b3IuaXNDdXJyZW5jeSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIGxhYmVsOiB0aGlzLnR5cGVUZXh0LFxyXG4gICAgICAgIG5hbWU6ICdUeXBlJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ1R5cGUnLFxyXG4gICAgICAgIHBpY2tsaXN0OiAnT3Bwb3J0dW5pdHkgVHlwZScsXHJcbiAgICAgICAgdGl0bGU6IHRoaXMub3Bwb3J0dW5pdHlUeXBlVGl0bGVUZXh0LFxyXG4gICAgICAgIHR5cGU6ICdwaWNrbGlzdCcsXHJcbiAgICAgICAgbWF4VGV4dExlbmd0aDogNjQsXHJcbiAgICAgICAgdmFsaWRhdG9yOiB2YWxpZGF0b3IuZXhjZWVkc01heFRleHRMZW5ndGgsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBsYWJlbDogdGhpcy5zdGF0dXNUZXh0LFxyXG4gICAgICAgIG5hbWU6ICdTdGF0dXMnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnU3RhdHVzJyxcclxuICAgICAgICBwaWNrbGlzdDogJ09wcG9ydHVuaXR5IFN0YXR1cycsXHJcbiAgICAgICAgcmVxdWlyZVNlbGVjdGlvbjogdHJ1ZSxcclxuICAgICAgICB0aXRsZTogdGhpcy5vcHBvcnR1bml0eVN0YXR1c1RpdGxlVGV4dCxcclxuICAgICAgICB0eXBlOiAncGlja2xpc3QnLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbGFiZWw6IHRoaXMuaW1wb3J0U291cmNlVGV4dCxcclxuICAgICAgICBuYW1lOiAnTGVhZFNvdXJjZScsXHJcbiAgICAgICAgcHJvcGVydHk6ICdMZWFkU291cmNlJyxcclxuICAgICAgICB0ZXh0UHJvcGVydHk6ICdEZXNjcmlwdGlvbicsXHJcbiAgICAgICAgdHlwZTogJ2xvb2t1cCcsXHJcbiAgICAgICAgdmlldzogJ2xlYWRzb3VyY2VfbGlzdCcsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBsYWJlbDogdGhpcy5vd25lclRleHQsXHJcbiAgICAgICAgbmFtZTogJ093bmVyJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ093bmVyJyxcclxuICAgICAgICBrZXlQcm9wZXJ0eTogJyRrZXknLFxyXG4gICAgICAgIHRleHRQcm9wZXJ0eTogJ093bmVyRGVzY3JpcHRpb24nLFxyXG4gICAgICAgIHR5cGU6ICdsb29rdXAnLFxyXG4gICAgICAgIHZhbGlkYXRvcjogdmFsaWRhdG9yLmV4aXN0cyxcclxuICAgICAgICB2aWV3OiAnb3duZXJfbGlzdCcsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBsYWJlbDogdGhpcy5wcm9iYWJpbGl0eVRleHQsXHJcbiAgICAgICAgbmFtZTogJ0Nsb3NlUHJvYmFiaWxpdHknLFxyXG4gICAgICAgIHByb3BlcnR5OiAnQ2xvc2VQcm9iYWJpbGl0eScsXHJcbiAgICAgICAgcGlja2xpc3Q6ICdPcHBvcnR1bml0eSBQcm9iYWJpbGl0eScsXHJcbiAgICAgICAgdGl0bGU6IHRoaXMucHJvYmFiaWxpdHlUaXRsZVRleHQsXHJcbiAgICAgICAgdHlwZTogJ3BpY2tsaXN0JyxcclxuICAgICAgICB2YWxpZGF0b3I6IFtcclxuICAgICAgICAgIHZhbGlkYXRvci5pc0ludDMyLFxyXG4gICAgICAgICAgdmFsaWRhdG9yLmlzSW50ZWdlcixcclxuICAgICAgICBdLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ0NvbnRhY3RzLiRyZXNvdXJjZXNbMF0uQ29udGFjdC4ka2V5JyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0NvbnRhY3RzLiRyZXNvdXJjZXNbMF0uQ29udGFjdC4ka2V5JyxcclxuICAgICAgICB0eXBlOiAnaGlkZGVuJyxcclxuICAgICAgfV0sXHJcbiAgICB9O1xyXG5cclxuICAgIGNvbnN0IG11bHRpQ3VycmVuY3kgPSB7XHJcbiAgICAgIHRpdGxlOiB0aGlzLm11bHRpQ3VycmVuY3lUZXh0LFxyXG4gICAgICBuYW1lOiAnT3Bwb3J0dW5pdHlNdWx0aUN1cnJlbmN5RWRpdCcsXHJcbiAgICAgIGNoaWxkcmVuOiBbe1xyXG4gICAgICAgIGxhYmVsOiB0aGlzLm11bHRpQ3VycmVuY3lSYXRlVGV4dCxcclxuICAgICAgICBuYW1lOiAnRXhjaGFuZ2VSYXRlJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0V4Y2hhbmdlUmF0ZScsXHJcbiAgICAgICAgdHlwZTogJ3RleHQnLFxyXG4gICAgICAgIHZhbGlkYXRvcjogdmFsaWRhdG9yLmlzRGVjaW1hbCxcclxuICAgICAgfSwge1xyXG4gICAgICAgIGxhYmVsOiB0aGlzLm11bHRpQ3VycmVuY3lDb2RlVGV4dCxcclxuICAgICAgICBuYW1lOiAnRXhjaGFuZ2VSYXRlQ29kZScsXHJcbiAgICAgICAgcHJvcGVydHk6ICdFeGNoYW5nZVJhdGVDb2RlJyxcclxuICAgICAgICB0ZXh0UHJvcGVydHk6ICcka2V5JyxcclxuICAgICAgICB0eXBlOiAnbG9va3VwJyxcclxuICAgICAgICB2aWV3OiAnZXhjaGFuZ2VyYXRlX2xvb2t1cCcsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBsYWJlbDogdGhpcy5tdWx0aUN1cnJlbmN5TG9ja2VkVGV4dCxcclxuICAgICAgICBuYW1lOiAnRXhjaGFuZ2VSYXRlTG9ja2VkJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0V4Y2hhbmdlUmF0ZUxvY2tlZCcsXHJcbiAgICAgICAgdHlwZTogJ2Jvb2xlYW4nLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbGFiZWw6IHRoaXMubXVsdGlDdXJyZW5jeURhdGVUZXh0LFxyXG4gICAgICAgIG5hbWU6ICdFeGNoYW5nZVJhdGVEYXRlJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0V4Y2hhbmdlUmF0ZURhdGUnLFxyXG4gICAgICAgIHR5cGU6ICdkYXRlJyxcclxuICAgICAgICB0aW1lbGVzczogZmFsc2UsXHJcbiAgICAgICAgZGF0ZUZvcm1hdFRleHQ6IChBcHAuaXMyNEhvdXJDbG9jaygpKSA/IHRoaXMuZXhjaGFuZ2VSYXRlRGF0ZUZvcm1hdFRleHQyNCA6IHRoaXMuZXhjaGFuZ2VSYXRlRGF0ZUZvcm1hdFRleHQsXHJcbiAgICAgICAgZGlzYWJsZWQ6IHRydWUsIC8vIFRPRE86IENyZWF0ZSBhbiBTREsgaXNzdWUgZm9yIHRoaXMgKE5PVCBXT1JLSU5HISEhKVxyXG4gICAgICB9XSxcclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgbGF5b3V0ID0gdGhpcy5sYXlvdXQgfHwgKHRoaXMubGF5b3V0ID0gW10pO1xyXG5cclxuICAgIGlmIChsYXlvdXQubGVuZ3RoID4gMCkge1xyXG4gICAgICByZXR1cm4gbGF5b3V0O1xyXG4gICAgfVxyXG5cclxuICAgIGxheW91dC5wdXNoKGRldGFpbHMpO1xyXG5cclxuICAgIGlmIChBcHAuaGFzTXVsdGlDdXJyZW5jeSgpKSB7XHJcbiAgICAgIGxheW91dC5wdXNoKG11bHRpQ3VycmVuY3kpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBsYXlvdXQ7XHJcbiAgfSxcclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBfX2NsYXNzO1xyXG4iXX0=
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
      this.inherited(init, arguments);
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
      this.inherited(setValues, arguments);
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
      var values = this.inherited(getValues, arguments);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9WaWV3cy9PcHBvcnR1bml0eS9FZGl0LmpzIl0sIm5hbWVzIjpbInJlc291cmNlIiwiZHRGb3JtYXRSZXNvdXJjZSIsIl9fY2xhc3MiLCJhY2NvdW50VGV4dCIsImFjY3RNZ3JUZXh0IiwiZXN0Q2xvc2VUZXh0IiwiaW1wb3J0U291cmNlVGV4dCIsImRldGFpbHNUZXh0Iiwib3Bwb3J0dW5pdHlTdGF0dXNUaXRsZVRleHQiLCJvcHBvcnR1bml0eVRleHQiLCJvcHBvcnR1bml0eVR5cGVUaXRsZVRleHQiLCJvd25lclRleHQiLCJwb3RlbnRpYWxUZXh0IiwicHJvYmFiaWxpdHlUZXh0IiwicHJvYmFiaWxpdHlUaXRsZVRleHQiLCJyZXNlbGxlclRleHQiLCJzdGF0dXNUZXh0IiwidGl0bGVUZXh0IiwidHlwZVRleHQiLCJtdWx0aUN1cnJlbmN5VGV4dCIsIm11bHRpQ3VycmVuY3lSYXRlVGV4dCIsIm11bHRpQ3VycmVuY3lDb2RlVGV4dCIsIm11bHRpQ3VycmVuY3lEYXRlVGV4dCIsIm11bHRpQ3VycmVuY3lMb2NrZWRUZXh0IiwiZXhjaGFuZ2VSYXRlRGF0ZUZvcm1hdFRleHQiLCJleGNoYW5nZVJhdGVEYXRlRm9ybWF0VGV4dDI0Iiwic3ViVHlwZVBpY2tMaXN0UmVzZWxsZXJUZXh0IiwiZW50aXR5TmFtZSIsImlkIiwicmVzb3VyY2VLaW5kIiwiaW5zZXJ0U2VjdXJpdHkiLCJ1cGRhdGVTZWN1cml0eSIsInF1ZXJ5U2VsZWN0IiwicXVlcnlJbmNsdWRlIiwiaW5pdCIsImluaGVyaXRlZCIsImFyZ3VtZW50cyIsImNvbm5lY3QiLCJmaWVsZHMiLCJBY2NvdW50Iiwib25BY2NvdW50Q2hhbmdlIiwiQXBwIiwiaGFzTXVsdGlDdXJyZW5jeSIsIkV4Y2hhbmdlUmF0ZUNvZGUiLCJvbkV4Y2hhbmdlUmF0ZUNvZGVDaGFuZ2UiLCJFeGNoYW5nZVJhdGVMb2NrZWQiLCJvbkV4Y2hhbmdlUmF0ZUxvY2tlZENoYW5nZSIsImFwcGx5Q29udGV4dCIsInRlbXBsYXRlRW50cnkiLCJmb3VuZCIsInF1ZXJ5TmF2aWdhdGlvbkNvbnRleHQiLCJvIiwidGVzdCIsImtleSIsImxvb2t1cCIsImFjY291bnRzIiwiYXBwbHlBY2NvdW50Q29udGV4dCIsImNvbnRhY3RzIiwiYXBwbHlDb250YWN0Q29udGV4dCIsImNhbGwiLCJhcHBseURlZmF1bHRDb250ZXh0IiwiU3RhdHVzIiwic2V0VmFsdWUiLCJDbG9zZVByb2JhYmlsaXR5IiwiRXN0aW1hdGVkQ2xvc2UiLCIka2V5IiwiJGRlc2NyaXB0b3IiLCJFeGNoYW5nZVJhdGUiLCJFeGNoYW5nZVJhdGVEYXRlIiwic2V0VmFsdWVzIiwidmFsdWVzIiwiY2FuTG9ja09wcG9ydHVuaXR5UmF0ZSIsImRpc2FibGUiLCJjYW5DaGFuZ2VPcHBvcnR1bml0eVJhdGUiLCJTYWxlc1BvdGVudGlhbCIsInNldEN1cnJlbmN5Q29kZSIsImdldEJhc2VFeGNoYW5nZVJhdGUiLCJjb2RlIiwiZ2V0VmFsdWVzIiwiQWNjb3VudE1hbmFnZXIiLCJjb250ZXh0IiwidXNlciIsIk93bmVyIiwiZGVmYXVsdE93bmVyIiwidmlldyIsImdldFZpZXciLCJlbnRyeSIsImdldFZhbHVlIiwidmFsdWUiLCJmaWVsZCIsInNlbGVjdGlvbiIsImdldFNlbGVjdGlvbiIsIlJhdGUiLCJEYXRlIiwibm93IiwiZW5hYmxlIiwiaW5zZXJ0IiwiY3JlYXRlTGF5b3V0IiwiZGV0YWlscyIsInRpdGxlIiwibmFtZSIsImNoaWxkcmVuIiwibGFiZWwiLCJwcm9wZXJ0eSIsInR5cGUiLCJtYXhUZXh0TGVuZ3RoIiwidmFsaWRhdG9yIiwibm90RW1wdHkiLCJleGNlZWRzTWF4VGV4dExlbmd0aCIsImF1dG9Gb2N1cyIsInRleHRQcm9wZXJ0eSIsImV4aXN0cyIsInZpZXdNaXhpbiIsImhhc1NldHRpbmdzIiwidGV4dFRlbXBsYXRlIiwibmFtZUxGIiwid2hlcmUiLCJvblRyYW5zaXRpb25UbyIsInNlbGYiLCJvcHRpb25zIiwidGltZWxlc3MiLCJwcmVjaXNpb24iLCJ2YWxpZGF0aW9uVHJpZ2dlciIsImlzQ3VycmVuY3kiLCJwaWNrbGlzdCIsInJlcXVpcmVTZWxlY3Rpb24iLCJrZXlQcm9wZXJ0eSIsImlzSW50MzIiLCJpc0ludGVnZXIiLCJtdWx0aUN1cnJlbmN5IiwiaXNEZWNpbWFsIiwiZGF0ZUZvcm1hdFRleHQiLCJpczI0SG91ckNsb2NrIiwiZGlzYWJsZWQiLCJsYXlvdXQiLCJsZW5ndGgiLCJwdXNoIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7QUFzQkEsTUFBTUEsV0FBVyxvQkFBWSxpQkFBWixDQUFqQjtBQUNBLE1BQU1DLG1CQUFtQixvQkFBWSwrQkFBWixDQUF6Qjs7QUFFQTs7Ozs7Ozs7OztBQVVBLE1BQU1DLFVBQVUsdUJBQVEsNEJBQVIsRUFBc0MsZ0JBQXRDLEVBQThDO0FBQzVEO0FBQ0FDLGlCQUFhSCxTQUFTRyxXQUZzQztBQUc1REMsaUJBQWFKLFNBQVNJLFdBSHNDO0FBSTVEQyxrQkFBY0wsU0FBU0ssWUFKcUM7QUFLNURDLHNCQUFrQk4sU0FBU00sZ0JBTGlDO0FBTTVEQyxpQkFBYVAsU0FBU08sV0FOc0M7QUFPNURDLGdDQUE0QlIsU0FBU1EsMEJBUHVCO0FBUTVEQyxxQkFBaUJULFNBQVNTLGVBUmtDO0FBUzVEQyw4QkFBMEJWLFNBQVNVLHdCQVR5QjtBQVU1REMsZUFBV1gsU0FBU1csU0FWd0M7QUFXNURDLG1CQUFlWixTQUFTWSxhQVhvQztBQVk1REMscUJBQWlCYixTQUFTYSxlQVprQztBQWE1REMsMEJBQXNCZCxTQUFTYyxvQkFiNkI7QUFjNURDLGtCQUFjZixTQUFTZSxZQWRxQztBQWU1REMsZ0JBQVloQixTQUFTZ0IsVUFmdUM7QUFnQjVEQyxlQUFXakIsU0FBU2lCLFNBaEJ3QztBQWlCNURDLGNBQVVsQixTQUFTa0IsUUFqQnlDO0FBa0I1REMsdUJBQW1CbkIsU0FBU21CLGlCQWxCZ0M7QUFtQjVEQywyQkFBdUJwQixTQUFTb0IscUJBbkI0QjtBQW9CNURDLDJCQUF1QnJCLFNBQVNxQixxQkFwQjRCO0FBcUI1REMsMkJBQXVCdEIsU0FBU3NCLHFCQXJCNEI7QUFzQjVEQyw2QkFBeUJ2QixTQUFTdUIsdUJBdEIwQjtBQXVCNURDLGdDQUE0QnZCLGlCQUFpQnVCLDBCQXZCZTtBQXdCNURDLGtDQUE4QnhCLGlCQUFpQndCLDRCQXhCYTtBQXlCNURDLGlDQUE2QjFCLFNBQVMwQiwyQkF6QnNCOztBQTJCNUQ7QUFDQUMsZ0JBQVksYUE1QmdEO0FBNkI1REMsUUFBSSxrQkE3QndEO0FBOEI1REMsa0JBQWMsZUE5QjhDO0FBK0I1REMsb0JBQWdCLDBCQS9CNEM7QUFnQzVEQyxvQkFBZ0IsMkJBaEM0QztBQWlDNURDLGlCQUFhLENBQ1gscUJBRFcsRUFFWCxtQ0FGVyxFQUdYLGtDQUhXLEVBSVgsa0JBSlcsRUFLWCxVQUxXLEVBTVgsYUFOVyxFQU9YLGdCQVBXLEVBUVgsY0FSVyxFQVNYLGtCQVRXLEVBVVgsa0JBVlcsRUFXWCxvQkFYVyxFQVlYLHdCQVpXLEVBYVgsd0JBYlcsRUFjWCxzQkFkVyxFQWVYLGdCQWZXLEVBZ0JYLE9BaEJXLEVBaUJYLFFBakJXLEVBa0JYLE1BbEJXLEVBbUJYLFVBbkJXLENBakMrQztBQXNENURDLGtCQUFjLENBQ1osY0FEWSxDQXREOEM7QUF5RDVEQyxVQUFNLFNBQVNBLElBQVQsR0FBZ0I7QUFDcEIsV0FBS0MsU0FBTCxDQUFlRCxJQUFmLEVBQXFCRSxTQUFyQjtBQUNBLFdBQUtDLE9BQUwsQ0FBYSxLQUFLQyxNQUFMLENBQVlDLE9BQXpCLEVBQWtDLFVBQWxDLEVBQThDLEtBQUtDLGVBQW5EOztBQUVBLFVBQUlDLElBQUlDLGdCQUFKLEVBQUosRUFBNEI7QUFDMUIsYUFBS0wsT0FBTCxDQUFhLEtBQUtDLE1BQUwsQ0FBWUssZ0JBQXpCLEVBQTJDLFVBQTNDLEVBQXVELEtBQUtDLHdCQUE1RDtBQUNBLGFBQUtQLE9BQUwsQ0FBYSxLQUFLQyxNQUFMLENBQVlPLGtCQUF6QixFQUE2QyxVQUE3QyxFQUF5RCxLQUFLQywwQkFBOUQ7QUFDRDtBQUNGLEtBakUyRDtBQWtFNURDLGtCQUFjLFNBQVNBLFlBQVQsQ0FBc0JDLGFBQXRCLEVBQXFDO0FBQ2pELFVBQU1DLFFBQVFSLElBQUlTLHNCQUFKLENBQTJCLFVBQUNDLENBQUQsRUFBTztBQUM5QyxlQUFRLHdCQUFELENBQTBCQyxJQUExQixDQUErQkQsRUFBRXRCLFlBQWpDLEtBQWtEc0IsRUFBRUU7QUFBM0Q7QUFDRCxPQUZhLENBQWQ7O0FBSUEsVUFBTUMsU0FBUztBQUNiQyxrQkFBVSxLQUFLQyxtQkFERjtBQUViQyxrQkFBVSxLQUFLQztBQUZGLE9BQWY7O0FBS0EsVUFBSVQsU0FBU0ssT0FBT0wsTUFBTXBCLFlBQWIsQ0FBYixFQUF5QztBQUN2Q3lCLGVBQU9MLE1BQU1wQixZQUFiLEVBQTJCOEIsSUFBM0IsQ0FBZ0MsSUFBaEMsRUFBc0NWLEtBQXRDO0FBQ0QsT0FGRCxNQUVPO0FBQ0wsYUFBS1csbUJBQUwsQ0FBeUJaLGFBQXpCO0FBQ0Q7O0FBRUQsV0FBS1YsTUFBTCxDQUFZdUIsTUFBWixDQUFtQkMsUUFBbkIsQ0FBNEJkLGNBQWNhLE1BQTFDO0FBQ0EsV0FBS3ZCLE1BQUwsQ0FBWXlCLGdCQUFaLENBQTZCRCxRQUE3QixDQUFzQ2QsY0FBY2UsZ0JBQXBEO0FBQ0EsV0FBS3pCLE1BQUwsQ0FBWTBCLGNBQVosQ0FBMkJGLFFBQTNCLENBQW9DZCxjQUFjZ0IsY0FBbEQ7O0FBRUEsVUFBSXZCLElBQUlDLGdCQUFKLE1BQTBCTSxhQUE5QixFQUE2QztBQUMzQyxZQUFJQSxjQUFjTCxnQkFBbEIsRUFBb0M7QUFDbEMsZUFBS0wsTUFBTCxDQUFZSyxnQkFBWixDQUE2Qm1CLFFBQTdCLENBQXNDO0FBQ3BDRyxrQkFBTWpCLGNBQWNMLGdCQURnQjtBQUVwQ3VCLHlCQUFhbEIsY0FBY0w7QUFGUyxXQUF0QztBQUlEOztBQUVELFlBQUlLLGNBQWNtQixZQUFsQixFQUFnQztBQUM5QixlQUFLN0IsTUFBTCxDQUFZNkIsWUFBWixDQUF5QkwsUUFBekIsQ0FBa0NkLGNBQWNtQixZQUFoRDtBQUNEOztBQUVELFlBQUluQixjQUFjb0IsZ0JBQWxCLEVBQW9DO0FBQ2xDLGVBQUs5QixNQUFMLENBQVk4QixnQkFBWixDQUE2Qk4sUUFBN0IsQ0FBc0NkLGNBQWNvQixnQkFBcEQ7QUFDRDtBQUNGO0FBQ0YsS0F0RzJEO0FBdUc1REMsZUFBVyxTQUFTQSxTQUFULENBQW1CQyxNQUFuQixFQUEyQjtBQUNwQyxXQUFLbkMsU0FBTCxDQUFla0MsU0FBZixFQUEwQmpDLFNBQTFCO0FBQ0EsVUFBSUssSUFBSUMsZ0JBQUosRUFBSixFQUE0QjtBQUMxQixZQUFJNEIsVUFBVUEsT0FBTzNCLGdCQUFyQixFQUF1QztBQUNyQyxlQUFLTCxNQUFMLENBQVlLLGdCQUFaLENBQTZCbUIsUUFBN0IsQ0FBc0M7QUFDcENHLGtCQUFNSyxPQUFPM0IsZ0JBRHVCO0FBRXBDdUIseUJBQWFJLE9BQU8zQjtBQUZnQixXQUF0QztBQUlEOztBQUVELFlBQUksQ0FBQ0YsSUFBSThCLHNCQUFKLEVBQUwsRUFBbUM7QUFDakMsZUFBS2pDLE1BQUwsQ0FBWU8sa0JBQVosQ0FBK0IyQixPQUEvQjtBQUNEOztBQUVELFlBQUksQ0FBQy9CLElBQUlnQyx3QkFBSixFQUFMLEVBQXFDO0FBQ25DLGVBQUtuQyxNQUFMLENBQVk2QixZQUFaLENBQXlCSyxPQUF6QjtBQUNBLGVBQUtsQyxNQUFMLENBQVlLLGdCQUFaLENBQTZCNkIsT0FBN0I7QUFDRDs7QUFFRCxhQUFLbEMsTUFBTCxDQUFZOEIsZ0JBQVosQ0FBNkJJLE9BQTdCO0FBQ0Q7O0FBRUQsV0FBS2xDLE1BQUwsQ0FBWW9DLGNBQVosQ0FBMkJDLGVBQTNCLENBQTJDbEMsSUFBSW1DLG1CQUFKLEdBQTBCQyxJQUFyRTtBQUNELEtBOUgyRDtBQStINURDLGVBQVcsU0FBU0EsU0FBVCxHQUFxQjtBQUM5QixVQUFNUixTQUFTLEtBQUtuQyxTQUFMLENBQWUyQyxTQUFmLEVBQTBCMUMsU0FBMUIsQ0FBZjs7QUFFQSxVQUFJa0MsTUFBSixFQUFZO0FBQ1YsWUFBTU8sT0FBT1AsT0FBTzNCLGdCQUFwQjtBQUNBMkIsZUFBTzNCLGdCQUFQLEdBQTBCa0MsUUFBUUEsS0FBS1osSUFBdkM7QUFDRDs7QUFFRCxhQUFPSyxNQUFQO0FBQ0QsS0F4STJEO0FBeUk1RFYseUJBQXFCLFNBQVNBLG1CQUFULEdBQStCO0FBQ2xELFdBQUt0QixNQUFMLENBQVl5QyxjQUFaLENBQTJCakIsUUFBM0IsQ0FBb0NyQixJQUFJdUMsT0FBSixDQUFZQyxJQUFoRDtBQUNBLFdBQUszQyxNQUFMLENBQVk0QyxLQUFaLENBQWtCcEIsUUFBbEIsQ0FBMkJyQixJQUFJdUMsT0FBSixDQUFZRyxZQUF2QztBQUNELEtBNUkyRDtBQTZJNUQzQix5QkFBcUIsU0FBU0EsbUJBQVQsQ0FBNkJ3QixPQUE3QixFQUFzQztBQUN6RCxVQUFNSSxPQUFPM0MsSUFBSTRDLE9BQUosQ0FBWUwsUUFBUXBELEVBQXBCLENBQWI7QUFDQSxVQUFNMEQsUUFBUUYsUUFBUUEsS0FBS0UsS0FBM0I7O0FBRUEsV0FBS2hELE1BQUwsQ0FBWUMsT0FBWixDQUFvQnVCLFFBQXBCLENBQTZCd0IsS0FBN0I7QUFDQSxXQUFLaEQsTUFBTCxDQUFZeUMsY0FBWixDQUEyQmpCLFFBQTNCLENBQW9DLGtCQUFReUIsUUFBUixDQUFpQkQsS0FBakIsRUFBd0IsZ0JBQXhCLENBQXBDO0FBQ0EsV0FBS2hELE1BQUwsQ0FBWTRDLEtBQVosQ0FBa0JwQixRQUFsQixDQUEyQixrQkFBUXlCLFFBQVIsQ0FBaUJELEtBQWpCLEVBQXdCLE9BQXhCLENBQTNCO0FBQ0QsS0FwSjJEO0FBcUo1RDVCLHlCQUFxQixTQUFTQSxtQkFBVCxDQUE2QnNCLE9BQTdCLEVBQXNDO0FBQ3pELFVBQU1JLE9BQU8zQyxJQUFJNEMsT0FBSixDQUFZTCxRQUFRcEQsRUFBcEIsQ0FBYjtBQUNBLFVBQU0wRCxRQUFRRixRQUFRQSxLQUFLRSxLQUEzQjs7QUFFQSxXQUFLaEQsTUFBTCxDQUFZQyxPQUFaLENBQW9CdUIsUUFBcEIsQ0FBNkIsa0JBQVF5QixRQUFSLENBQWlCRCxLQUFqQixFQUF3QixTQUF4QixDQUE3QjtBQUNBLFdBQUtoRCxNQUFMLENBQVl5QyxjQUFaLENBQTJCakIsUUFBM0IsQ0FBb0Msa0JBQVF5QixRQUFSLENBQWlCRCxLQUFqQixFQUF3QixnQkFBeEIsQ0FBcEM7QUFDQSxXQUFLaEQsTUFBTCxDQUFZNEMsS0FBWixDQUFrQnBCLFFBQWxCLENBQTJCLGtCQUFReUIsUUFBUixDQUFpQkQsS0FBakIsRUFBd0IsT0FBeEIsQ0FBM0I7QUFDQSxXQUFLaEQsTUFBTCxDQUFZLHFDQUFaLEVBQW1Ed0IsUUFBbkQsQ0FBNER3QixNQUFNckIsSUFBbEU7QUFDRCxLQTdKMkQ7QUE4SjVEckIsOEJBQTBCLFNBQVNBLHdCQUFULENBQWtDNEMsS0FBbEMsRUFBeUNDLEtBQXpDLEVBQWdEO0FBQ3hFLFVBQU1DLFlBQVlELE1BQU1FLFlBQU4sRUFBbEI7QUFDQSxVQUFJRCxhQUFhQSxVQUFVRSxJQUEzQixFQUFpQztBQUMvQixhQUFLdEQsTUFBTCxDQUFZNkIsWUFBWixDQUF5QkwsUUFBekIsQ0FBa0M0QixVQUFVRSxJQUE1QztBQUNBLGFBQUt0RCxNQUFMLENBQVk4QixnQkFBWixDQUE2Qk4sUUFBN0IsQ0FBc0MsSUFBSStCLElBQUosQ0FBU0EsS0FBS0MsR0FBTCxFQUFULENBQXRDO0FBQ0Q7QUFDRixLQXBLMkQ7QUFxSzVEaEQsZ0NBQTRCLFNBQVNBLDBCQUFULENBQW9DMEMsS0FBcEMsRUFBMkM7QUFDckUsVUFBSUEsVUFBVSxJQUFkLEVBQW9CO0FBQ2xCLGFBQUtsRCxNQUFMLENBQVk2QixZQUFaLENBQXlCSyxPQUF6QjtBQUNBLGFBQUtsQyxNQUFMLENBQVlLLGdCQUFaLENBQTZCNkIsT0FBN0I7QUFDRCxPQUhELE1BR08sSUFBSSxDQUFDL0IsSUFBSWdDLHdCQUFKLEVBQUwsRUFBcUM7QUFDMUMsYUFBS25DLE1BQUwsQ0FBWTZCLFlBQVosQ0FBeUJLLE9BQXpCO0FBQ0EsYUFBS2xDLE1BQUwsQ0FBWUssZ0JBQVosQ0FBNkI2QixPQUE3QjtBQUNELE9BSE0sTUFHQTtBQUNMLGFBQUtsQyxNQUFMLENBQVk2QixZQUFaLENBQXlCNEIsTUFBekI7QUFDQSxhQUFLekQsTUFBTCxDQUFZSyxnQkFBWixDQUE2Qm9ELE1BQTdCO0FBQ0Q7O0FBRUQsV0FBS3pELE1BQUwsQ0FBWThCLGdCQUFaLENBQTZCTixRQUE3QixDQUFzQyxJQUFJK0IsSUFBSixDQUFTQSxLQUFLQyxHQUFMLEVBQVQsQ0FBdEM7QUFDRCxLQWxMMkQ7QUFtTDVEdEQscUJBQWlCLFNBQVNBLGVBQVQsQ0FBeUJnRCxLQUF6QixFQUFnQ0MsS0FBaEMsRUFBdUM7QUFDdEQsVUFBTUMsWUFBWUQsTUFBTUUsWUFBTixFQUFsQjs7QUFFQTtBQUNBO0FBQ0EsVUFBSUQsYUFBYSxLQUFLTSxNQUF0QixFQUE4QjtBQUM1QixhQUFLMUQsTUFBTCxDQUFZeUMsY0FBWixDQUEyQmpCLFFBQTNCLENBQW9DLGtCQUFReUIsUUFBUixDQUFpQkcsU0FBakIsRUFBNEIsZ0JBQTVCLENBQXBDO0FBQ0Q7QUFDRixLQTNMMkQ7QUE0TDVETyxrQkFBYyxTQUFTQSxZQUFULEdBQXdCO0FBQ3BDLFVBQU1DLFVBQVU7QUFDZEMsZUFBTyxLQUFLNUYsV0FERTtBQUVkNkYsY0FBTSx3QkFGUTtBQUdkQyxrQkFBVSxDQUFDO0FBQ1RDLGlCQUFPLEtBQUs3RixlQURIO0FBRVQyRixnQkFBTSxhQUZHO0FBR1RHLG9CQUFVLGFBSEQ7QUFJVEMsZ0JBQU0sTUFKRztBQUtUQyx5QkFBZSxFQUxOO0FBTVRDLHFCQUFXLENBQ1Qsb0JBQVVDLFFBREQsRUFFVCxvQkFBVUMsb0JBRkQsQ0FORjtBQVVUQyxxQkFBVztBQVZGLFNBQUQsRUFXUDtBQUNEUCxpQkFBTyxLQUFLbkcsV0FEWDtBQUVEaUcsZ0JBQU0sU0FGTDtBQUdERyxvQkFBVSxTQUhUO0FBSURPLHdCQUFjLGFBSmI7QUFLRE4sZ0JBQU0sUUFMTDtBQU1ERSxxQkFBVyxvQkFBVUssTUFOcEI7QUFPRDNCLGdCQUFNLGlCQVBMO0FBUUQ0QixxQkFBVztBQUNUQyx5QkFBYTtBQURKO0FBUlYsU0FYTyxFQXNCUDtBQUNEWCxpQkFBTyxLQUFLbEcsV0FEWDtBQUVEZ0csZ0JBQU0sZ0JBRkw7QUFHREcsb0JBQVUsZ0JBSFQ7QUFJRE8sd0JBQWMsVUFKYjtBQUtESSx3QkFBYyxtQkFBU0MsTUFMdEI7QUFNRFgsZ0JBQU0sUUFOTDtBQU9EcEIsZ0JBQU07QUFQTCxTQXRCTyxFQThCUDtBQUNEa0IsaUJBQU8sS0FBS3ZGLFlBRFg7QUFFRHFGLGdCQUFNLFVBRkw7QUFHREcsb0JBQVUsVUFIVDtBQUlETyx3QkFBYyxhQUpiO0FBS0ROLGdCQUFNLFFBTEw7QUFNRHBCLGdCQUFNLGlCQU5MO0FBT0RnQyx5Q0FBNkIsS0FBSzFGLDJCQUFsQyxNQVBDO0FBUURzRixxQkFBVztBQUNUQyx5QkFBYSxLQURKO0FBRVRJLDRCQUFnQixTQUFTQSxjQUFULENBQXdCQyxJQUF4QixFQUE4QjtBQUM1QztBQUNBQSxtQkFBS0MsT0FBTCxDQUFhSCxLQUFiLEdBQXFCLEVBQXJCO0FBQ0Q7QUFMUTtBQVJWLFNBOUJPLEVBNkNQO0FBQ0RkLGlCQUFPLEtBQUtqRyxZQURYO0FBRUQrRixnQkFBTSxnQkFGTDtBQUdERyxvQkFBVSxnQkFIVDtBQUlEQyxnQkFBTSxNQUpMO0FBS0RnQixvQkFBVSxJQUxUO0FBTURkLHFCQUFXLG9CQUFVSztBQU5wQixTQTdDTyxFQW9EUDtBQUNEVCxpQkFBTyxLQUFLMUYsYUFEWDtBQUVEd0YsZ0JBQU0sZ0JBRkw7QUFHREcsb0JBQVUsZ0JBSFQ7QUFJRGtCLHFCQUFXLENBSlY7QUFLRGpCLGdCQUFNLGVBTEw7QUFNRGtCLDZCQUFtQixPQU5sQjtBQU9EaEIscUJBQVcsb0JBQVVpQjtBQVBwQixTQXBETyxFQTREUDtBQUNEckIsaUJBQU8sS0FBS3BGLFFBRFg7QUFFRGtGLGdCQUFNLE1BRkw7QUFHREcsb0JBQVUsTUFIVDtBQUlEcUIsb0JBQVUsa0JBSlQ7QUFLRHpCLGlCQUFPLEtBQUt6Rix3QkFMWDtBQU1EOEYsZ0JBQU0sVUFOTDtBQU9EQyx5QkFBZSxFQVBkO0FBUURDLHFCQUFXLG9CQUFVRTtBQVJwQixTQTVETyxFQXFFUDtBQUNETixpQkFBTyxLQUFLdEYsVUFEWDtBQUVEb0YsZ0JBQU0sUUFGTDtBQUdERyxvQkFBVSxRQUhUO0FBSURxQixvQkFBVSxvQkFKVDtBQUtEQyw0QkFBa0IsSUFMakI7QUFNRDFCLGlCQUFPLEtBQUszRiwwQkFOWDtBQU9EZ0csZ0JBQU07QUFQTCxTQXJFTyxFQTZFUDtBQUNERixpQkFBTyxLQUFLaEcsZ0JBRFg7QUFFRDhGLGdCQUFNLFlBRkw7QUFHREcsb0JBQVUsWUFIVDtBQUlETyx3QkFBYyxhQUpiO0FBS0ROLGdCQUFNLFFBTEw7QUFNRHBCLGdCQUFNO0FBTkwsU0E3RU8sRUFvRlA7QUFDRGtCLGlCQUFPLEtBQUszRixTQURYO0FBRUR5RixnQkFBTSxPQUZMO0FBR0RHLG9CQUFVLE9BSFQ7QUFJRHVCLHVCQUFhLE1BSlo7QUFLRGhCLHdCQUFjLGtCQUxiO0FBTUROLGdCQUFNLFFBTkw7QUFPREUscUJBQVcsb0JBQVVLLE1BUHBCO0FBUUQzQixnQkFBTTtBQVJMLFNBcEZPLEVBNkZQO0FBQ0RrQixpQkFBTyxLQUFLekYsZUFEWDtBQUVEdUYsZ0JBQU0sa0JBRkw7QUFHREcsb0JBQVUsa0JBSFQ7QUFJRHFCLG9CQUFVLHlCQUpUO0FBS0R6QixpQkFBTyxLQUFLckYsb0JBTFg7QUFNRDBGLGdCQUFNLFVBTkw7QUFPREUscUJBQVcsQ0FDVCxvQkFBVXFCLE9BREQsRUFFVCxvQkFBVUMsU0FGRDtBQVBWLFNBN0ZPLEVBd0dQO0FBQ0Q1QixnQkFBTSxxQ0FETDtBQUVERyxvQkFBVSxxQ0FGVDtBQUdEQyxnQkFBTTtBQUhMLFNBeEdPO0FBSEksT0FBaEI7O0FBa0hBLFVBQU15QixnQkFBZ0I7QUFDcEI5QixlQUFPLEtBQUtoRixpQkFEUTtBQUVwQmlGLGNBQU0sOEJBRmM7QUFHcEJDLGtCQUFVLENBQUM7QUFDVEMsaUJBQU8sS0FBS2xGLHFCQURIO0FBRVRnRixnQkFBTSxjQUZHO0FBR1RHLG9CQUFVLGNBSEQ7QUFJVEMsZ0JBQU0sTUFKRztBQUtURSxxQkFBVyxvQkFBVXdCO0FBTFosU0FBRCxFQU1QO0FBQ0Q1QixpQkFBTyxLQUFLakYscUJBRFg7QUFFRCtFLGdCQUFNLGtCQUZMO0FBR0RHLG9CQUFVLGtCQUhUO0FBSURPLHdCQUFjLE1BSmI7QUFLRE4sZ0JBQU0sUUFMTDtBQU1EcEIsZ0JBQU07QUFOTCxTQU5PLEVBYVA7QUFDRGtCLGlCQUFPLEtBQUsvRSx1QkFEWDtBQUVENkUsZ0JBQU0sb0JBRkw7QUFHREcsb0JBQVUsb0JBSFQ7QUFJREMsZ0JBQU07QUFKTCxTQWJPLEVBa0JQO0FBQ0RGLGlCQUFPLEtBQUtoRixxQkFEWDtBQUVEOEUsZ0JBQU0sa0JBRkw7QUFHREcsb0JBQVUsa0JBSFQ7QUFJREMsZ0JBQU0sTUFKTDtBQUtEZ0Isb0JBQVUsS0FMVDtBQU1EVywwQkFBaUIxRixJQUFJMkYsYUFBSixFQUFELEdBQXdCLEtBQUszRyw0QkFBN0IsR0FBNEQsS0FBS0QsMEJBTmhGO0FBT0Q2RyxvQkFBVSxJQVBULENBT2U7QUFQZixTQWxCTztBQUhVLE9BQXRCOztBQWdDQSxVQUFNQyxTQUFTLEtBQUtBLE1BQUwsS0FBZ0IsS0FBS0EsTUFBTCxHQUFjLEVBQTlCLENBQWY7O0FBRUEsVUFBSUEsT0FBT0MsTUFBUCxHQUFnQixDQUFwQixFQUF1QjtBQUNyQixlQUFPRCxNQUFQO0FBQ0Q7O0FBRURBLGFBQU9FLElBQVAsQ0FBWXRDLE9BQVo7O0FBRUEsVUFBSXpELElBQUlDLGdCQUFKLEVBQUosRUFBNEI7QUFDMUI0RixlQUFPRSxJQUFQLENBQVlQLGFBQVo7QUFDRDs7QUFFRCxhQUFPSyxNQUFQO0FBQ0Q7QUE1VjJELEdBQTlDLENBQWhCOztvQkErVmVwSSxPIiwiZmlsZSI6IkVkaXQuanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IDIwMTcgSW5mb3JcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG5pbXBvcnQgZGVjbGFyZSBmcm9tICdkb2pvL19iYXNlL2RlY2xhcmUnO1xyXG5pbXBvcnQgdmFsaWRhdG9yIGZyb20gJy4uLy4uL1ZhbGlkYXRvcic7XHJcbmltcG9ydCB0ZW1wbGF0ZSBmcm9tICcuLi8uLi9UZW1wbGF0ZSc7XHJcbmltcG9ydCB1dGlsaXR5IGZyb20gJ2FyZ29zL1V0aWxpdHknO1xyXG5pbXBvcnQgRWRpdCBmcm9tICdhcmdvcy9FZGl0JztcclxuaW1wb3J0IGdldFJlc291cmNlIGZyb20gJ2FyZ29zL0kxOG4nO1xyXG5cclxuY29uc3QgcmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgnb3Bwb3J0dW5pdHlFZGl0Jyk7XHJcbmNvbnN0IGR0Rm9ybWF0UmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgnb3Bwb3J0dW5pdHlFZGl0RGF0ZVRpbWVGb3JtYXQnKTtcclxuXHJcbi8qKlxyXG4gKiBAY2xhc3MgY3JtLlZpZXdzLk9wcG9ydHVuaXR5LkVkaXRcclxuICpcclxuICogQGV4dGVuZHMgYXJnb3MuRWRpdFxyXG4gKlxyXG4gKiBAcmVxdWlyZXMgYXJnb3MuVXRpbGl0eVxyXG4gKlxyXG4gKiBAcmVxdWlyZXMgY3JtLlZhbGlkYXRvclxyXG4gKiBAcmVxdWlyZXMgY3JtLlRlbXBsYXRlXHJcbiAqL1xyXG5jb25zdCBfX2NsYXNzID0gZGVjbGFyZSgnY3JtLlZpZXdzLk9wcG9ydHVuaXR5LkVkaXQnLCBbRWRpdF0sIHtcclxuICAvLyBMb2NhbGl6YXRpb25cclxuICBhY2NvdW50VGV4dDogcmVzb3VyY2UuYWNjb3VudFRleHQsXHJcbiAgYWNjdE1nclRleHQ6IHJlc291cmNlLmFjY3RNZ3JUZXh0LFxyXG4gIGVzdENsb3NlVGV4dDogcmVzb3VyY2UuZXN0Q2xvc2VUZXh0LFxyXG4gIGltcG9ydFNvdXJjZVRleHQ6IHJlc291cmNlLmltcG9ydFNvdXJjZVRleHQsXHJcbiAgZGV0YWlsc1RleHQ6IHJlc291cmNlLmRldGFpbHNUZXh0LFxyXG4gIG9wcG9ydHVuaXR5U3RhdHVzVGl0bGVUZXh0OiByZXNvdXJjZS5vcHBvcnR1bml0eVN0YXR1c1RpdGxlVGV4dCxcclxuICBvcHBvcnR1bml0eVRleHQ6IHJlc291cmNlLm9wcG9ydHVuaXR5VGV4dCxcclxuICBvcHBvcnR1bml0eVR5cGVUaXRsZVRleHQ6IHJlc291cmNlLm9wcG9ydHVuaXR5VHlwZVRpdGxlVGV4dCxcclxuICBvd25lclRleHQ6IHJlc291cmNlLm93bmVyVGV4dCxcclxuICBwb3RlbnRpYWxUZXh0OiByZXNvdXJjZS5wb3RlbnRpYWxUZXh0LFxyXG4gIHByb2JhYmlsaXR5VGV4dDogcmVzb3VyY2UucHJvYmFiaWxpdHlUZXh0LFxyXG4gIHByb2JhYmlsaXR5VGl0bGVUZXh0OiByZXNvdXJjZS5wcm9iYWJpbGl0eVRpdGxlVGV4dCxcclxuICByZXNlbGxlclRleHQ6IHJlc291cmNlLnJlc2VsbGVyVGV4dCxcclxuICBzdGF0dXNUZXh0OiByZXNvdXJjZS5zdGF0dXNUZXh0LFxyXG4gIHRpdGxlVGV4dDogcmVzb3VyY2UudGl0bGVUZXh0LFxyXG4gIHR5cGVUZXh0OiByZXNvdXJjZS50eXBlVGV4dCxcclxuICBtdWx0aUN1cnJlbmN5VGV4dDogcmVzb3VyY2UubXVsdGlDdXJyZW5jeVRleHQsXHJcbiAgbXVsdGlDdXJyZW5jeVJhdGVUZXh0OiByZXNvdXJjZS5tdWx0aUN1cnJlbmN5UmF0ZVRleHQsXHJcbiAgbXVsdGlDdXJyZW5jeUNvZGVUZXh0OiByZXNvdXJjZS5tdWx0aUN1cnJlbmN5Q29kZVRleHQsXHJcbiAgbXVsdGlDdXJyZW5jeURhdGVUZXh0OiByZXNvdXJjZS5tdWx0aUN1cnJlbmN5RGF0ZVRleHQsXHJcbiAgbXVsdGlDdXJyZW5jeUxvY2tlZFRleHQ6IHJlc291cmNlLm11bHRpQ3VycmVuY3lMb2NrZWRUZXh0LFxyXG4gIGV4Y2hhbmdlUmF0ZURhdGVGb3JtYXRUZXh0OiBkdEZvcm1hdFJlc291cmNlLmV4Y2hhbmdlUmF0ZURhdGVGb3JtYXRUZXh0LFxyXG4gIGV4Y2hhbmdlUmF0ZURhdGVGb3JtYXRUZXh0MjQ6IGR0Rm9ybWF0UmVzb3VyY2UuZXhjaGFuZ2VSYXRlRGF0ZUZvcm1hdFRleHQyNCxcclxuICBzdWJUeXBlUGlja0xpc3RSZXNlbGxlclRleHQ6IHJlc291cmNlLnN1YlR5cGVQaWNrTGlzdFJlc2VsbGVyVGV4dCxcclxuXHJcbiAgLy8gVmlldyBQcm9wZXJ0aWVzXHJcbiAgZW50aXR5TmFtZTogJ09wcG9ydHVuaXR5JyxcclxuICBpZDogJ29wcG9ydHVuaXR5X2VkaXQnLFxyXG4gIHJlc291cmNlS2luZDogJ29wcG9ydHVuaXRpZXMnLFxyXG4gIGluc2VydFNlY3VyaXR5OiAnRW50aXRpZXMvT3Bwb3J0dW5pdHkvQWRkJyxcclxuICB1cGRhdGVTZWN1cml0eTogJ0VudGl0aWVzL09wcG9ydHVuaXR5L0VkaXQnLFxyXG4gIHF1ZXJ5U2VsZWN0OiBbXHJcbiAgICAnQWNjb3VudC9BY2NvdW50TmFtZScsXHJcbiAgICAnQWNjb3VudE1hbmFnZXIvVXNlckluZm8vRmlyc3ROYW1lJyxcclxuICAgICdBY2NvdW50TWFuYWdlci9Vc2VySW5mby9MYXN0TmFtZScsXHJcbiAgICAnQ2xvc2VQcm9iYWJpbGl0eScsXHJcbiAgICAnQ29udGFjdHMnLFxyXG4gICAgJ0Rlc2NyaXB0aW9uJyxcclxuICAgICdFc3RpbWF0ZWRDbG9zZScsXHJcbiAgICAnRXhjaGFuZ2VSYXRlJyxcclxuICAgICdFeGNoYW5nZVJhdGVDb2RlJyxcclxuICAgICdFeGNoYW5nZVJhdGVEYXRlJyxcclxuICAgICdFeGNoYW5nZVJhdGVMb2NrZWQnLFxyXG4gICAgJ0xlYWRTb3VyY2UvRGVzY3JpcHRpb24nLFxyXG4gICAgJ093bmVyL093bmVyRGVzY3JpcHRpb24nLFxyXG4gICAgJ1Jlc2VsbGVyL0FjY291bnROYW1lJyxcclxuICAgICdTYWxlc1BvdGVudGlhbCcsXHJcbiAgICAnU3RhZ2UnLFxyXG4gICAgJ1N0YXR1cycsXHJcbiAgICAnVHlwZScsXHJcbiAgICAnV2VpZ2h0ZWQnLFxyXG4gIF0sXHJcbiAgcXVlcnlJbmNsdWRlOiBbXHJcbiAgICAnJHBlcm1pc3Npb25zJyxcclxuICBdLFxyXG4gIGluaXQ6IGZ1bmN0aW9uIGluaXQoKSB7XHJcbiAgICB0aGlzLmluaGVyaXRlZChpbml0LCBhcmd1bWVudHMpO1xyXG4gICAgdGhpcy5jb25uZWN0KHRoaXMuZmllbGRzLkFjY291bnQsICdvbkNoYW5nZScsIHRoaXMub25BY2NvdW50Q2hhbmdlKTtcclxuXHJcbiAgICBpZiAoQXBwLmhhc011bHRpQ3VycmVuY3koKSkge1xyXG4gICAgICB0aGlzLmNvbm5lY3QodGhpcy5maWVsZHMuRXhjaGFuZ2VSYXRlQ29kZSwgJ29uQ2hhbmdlJywgdGhpcy5vbkV4Y2hhbmdlUmF0ZUNvZGVDaGFuZ2UpO1xyXG4gICAgICB0aGlzLmNvbm5lY3QodGhpcy5maWVsZHMuRXhjaGFuZ2VSYXRlTG9ja2VkLCAnb25DaGFuZ2UnLCB0aGlzLm9uRXhjaGFuZ2VSYXRlTG9ja2VkQ2hhbmdlKTtcclxuICAgIH1cclxuICB9LFxyXG4gIGFwcGx5Q29udGV4dDogZnVuY3Rpb24gYXBwbHlDb250ZXh0KHRlbXBsYXRlRW50cnkpIHtcclxuICAgIGNvbnN0IGZvdW5kID0gQXBwLnF1ZXJ5TmF2aWdhdGlvbkNvbnRleHQoKG8pID0+IHtcclxuICAgICAgcmV0dXJuICgvXihhY2NvdW50c3xjb250YWN0cykkLykudGVzdChvLnJlc291cmNlS2luZCkgJiYgby5rZXk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCBsb29rdXAgPSB7XHJcbiAgICAgIGFjY291bnRzOiB0aGlzLmFwcGx5QWNjb3VudENvbnRleHQsXHJcbiAgICAgIGNvbnRhY3RzOiB0aGlzLmFwcGx5Q29udGFjdENvbnRleHQsXHJcbiAgICB9O1xyXG5cclxuICAgIGlmIChmb3VuZCAmJiBsb29rdXBbZm91bmQucmVzb3VyY2VLaW5kXSkge1xyXG4gICAgICBsb29rdXBbZm91bmQucmVzb3VyY2VLaW5kXS5jYWxsKHRoaXMsIGZvdW5kKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuYXBwbHlEZWZhdWx0Q29udGV4dCh0ZW1wbGF0ZUVudHJ5KTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmZpZWxkcy5TdGF0dXMuc2V0VmFsdWUodGVtcGxhdGVFbnRyeS5TdGF0dXMpO1xyXG4gICAgdGhpcy5maWVsZHMuQ2xvc2VQcm9iYWJpbGl0eS5zZXRWYWx1ZSh0ZW1wbGF0ZUVudHJ5LkNsb3NlUHJvYmFiaWxpdHkpO1xyXG4gICAgdGhpcy5maWVsZHMuRXN0aW1hdGVkQ2xvc2Uuc2V0VmFsdWUodGVtcGxhdGVFbnRyeS5Fc3RpbWF0ZWRDbG9zZSk7XHJcblxyXG4gICAgaWYgKEFwcC5oYXNNdWx0aUN1cnJlbmN5KCkgJiYgdGVtcGxhdGVFbnRyeSkge1xyXG4gICAgICBpZiAodGVtcGxhdGVFbnRyeS5FeGNoYW5nZVJhdGVDb2RlKSB7XHJcbiAgICAgICAgdGhpcy5maWVsZHMuRXhjaGFuZ2VSYXRlQ29kZS5zZXRWYWx1ZSh7XHJcbiAgICAgICAgICAka2V5OiB0ZW1wbGF0ZUVudHJ5LkV4Y2hhbmdlUmF0ZUNvZGUsXHJcbiAgICAgICAgICAkZGVzY3JpcHRvcjogdGVtcGxhdGVFbnRyeS5FeGNoYW5nZVJhdGVDb2RlLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAodGVtcGxhdGVFbnRyeS5FeGNoYW5nZVJhdGUpIHtcclxuICAgICAgICB0aGlzLmZpZWxkcy5FeGNoYW5nZVJhdGUuc2V0VmFsdWUodGVtcGxhdGVFbnRyeS5FeGNoYW5nZVJhdGUpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAodGVtcGxhdGVFbnRyeS5FeGNoYW5nZVJhdGVEYXRlKSB7XHJcbiAgICAgICAgdGhpcy5maWVsZHMuRXhjaGFuZ2VSYXRlRGF0ZS5zZXRWYWx1ZSh0ZW1wbGF0ZUVudHJ5LkV4Y2hhbmdlUmF0ZURhdGUpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgfSxcclxuICBzZXRWYWx1ZXM6IGZ1bmN0aW9uIHNldFZhbHVlcyh2YWx1ZXMpIHtcclxuICAgIHRoaXMuaW5oZXJpdGVkKHNldFZhbHVlcywgYXJndW1lbnRzKTtcclxuICAgIGlmIChBcHAuaGFzTXVsdGlDdXJyZW5jeSgpKSB7XHJcbiAgICAgIGlmICh2YWx1ZXMgJiYgdmFsdWVzLkV4Y2hhbmdlUmF0ZUNvZGUpIHtcclxuICAgICAgICB0aGlzLmZpZWxkcy5FeGNoYW5nZVJhdGVDb2RlLnNldFZhbHVlKHtcclxuICAgICAgICAgICRrZXk6IHZhbHVlcy5FeGNoYW5nZVJhdGVDb2RlLFxyXG4gICAgICAgICAgJGRlc2NyaXB0b3I6IHZhbHVlcy5FeGNoYW5nZVJhdGVDb2RlLFxyXG4gICAgICAgIH0pO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoIUFwcC5jYW5Mb2NrT3Bwb3J0dW5pdHlSYXRlKCkpIHtcclxuICAgICAgICB0aGlzLmZpZWxkcy5FeGNoYW5nZVJhdGVMb2NrZWQuZGlzYWJsZSgpO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoIUFwcC5jYW5DaGFuZ2VPcHBvcnR1bml0eVJhdGUoKSkge1xyXG4gICAgICAgIHRoaXMuZmllbGRzLkV4Y2hhbmdlUmF0ZS5kaXNhYmxlKCk7XHJcbiAgICAgICAgdGhpcy5maWVsZHMuRXhjaGFuZ2VSYXRlQ29kZS5kaXNhYmxlKCk7XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRoaXMuZmllbGRzLkV4Y2hhbmdlUmF0ZURhdGUuZGlzYWJsZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuZmllbGRzLlNhbGVzUG90ZW50aWFsLnNldEN1cnJlbmN5Q29kZShBcHAuZ2V0QmFzZUV4Y2hhbmdlUmF0ZSgpLmNvZGUpO1xyXG4gIH0sXHJcbiAgZ2V0VmFsdWVzOiBmdW5jdGlvbiBnZXRWYWx1ZXMoKSB7XHJcbiAgICBjb25zdCB2YWx1ZXMgPSB0aGlzLmluaGVyaXRlZChnZXRWYWx1ZXMsIGFyZ3VtZW50cyk7XHJcblxyXG4gICAgaWYgKHZhbHVlcykge1xyXG4gICAgICBjb25zdCBjb2RlID0gdmFsdWVzLkV4Y2hhbmdlUmF0ZUNvZGU7XHJcbiAgICAgIHZhbHVlcy5FeGNoYW5nZVJhdGVDb2RlID0gY29kZSAmJiBjb2RlLiRrZXk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHZhbHVlcztcclxuICB9LFxyXG4gIGFwcGx5RGVmYXVsdENvbnRleHQ6IGZ1bmN0aW9uIGFwcGx5RGVmYXVsdENvbnRleHQoKSB7XHJcbiAgICB0aGlzLmZpZWxkcy5BY2NvdW50TWFuYWdlci5zZXRWYWx1ZShBcHAuY29udGV4dC51c2VyKTtcclxuICAgIHRoaXMuZmllbGRzLk93bmVyLnNldFZhbHVlKEFwcC5jb250ZXh0LmRlZmF1bHRPd25lcik7XHJcbiAgfSxcclxuICBhcHBseUFjY291bnRDb250ZXh0OiBmdW5jdGlvbiBhcHBseUFjY291bnRDb250ZXh0KGNvbnRleHQpIHtcclxuICAgIGNvbnN0IHZpZXcgPSBBcHAuZ2V0Vmlldyhjb250ZXh0LmlkKTtcclxuICAgIGNvbnN0IGVudHJ5ID0gdmlldyAmJiB2aWV3LmVudHJ5O1xyXG5cclxuICAgIHRoaXMuZmllbGRzLkFjY291bnQuc2V0VmFsdWUoZW50cnkpO1xyXG4gICAgdGhpcy5maWVsZHMuQWNjb3VudE1hbmFnZXIuc2V0VmFsdWUodXRpbGl0eS5nZXRWYWx1ZShlbnRyeSwgJ0FjY291bnRNYW5hZ2VyJykpO1xyXG4gICAgdGhpcy5maWVsZHMuT3duZXIuc2V0VmFsdWUodXRpbGl0eS5nZXRWYWx1ZShlbnRyeSwgJ093bmVyJykpO1xyXG4gIH0sXHJcbiAgYXBwbHlDb250YWN0Q29udGV4dDogZnVuY3Rpb24gYXBwbHlDb250YWN0Q29udGV4dChjb250ZXh0KSB7XHJcbiAgICBjb25zdCB2aWV3ID0gQXBwLmdldFZpZXcoY29udGV4dC5pZCk7XHJcbiAgICBjb25zdCBlbnRyeSA9IHZpZXcgJiYgdmlldy5lbnRyeTtcclxuXHJcbiAgICB0aGlzLmZpZWxkcy5BY2NvdW50LnNldFZhbHVlKHV0aWxpdHkuZ2V0VmFsdWUoZW50cnksICdBY2NvdW50JykpO1xyXG4gICAgdGhpcy5maWVsZHMuQWNjb3VudE1hbmFnZXIuc2V0VmFsdWUodXRpbGl0eS5nZXRWYWx1ZShlbnRyeSwgJ0FjY291bnRNYW5hZ2VyJykpO1xyXG4gICAgdGhpcy5maWVsZHMuT3duZXIuc2V0VmFsdWUodXRpbGl0eS5nZXRWYWx1ZShlbnRyeSwgJ093bmVyJykpO1xyXG4gICAgdGhpcy5maWVsZHNbJ0NvbnRhY3RzLiRyZXNvdXJjZXNbMF0uQ29udGFjdC4ka2V5J10uc2V0VmFsdWUoZW50cnkuJGtleSk7XHJcbiAgfSxcclxuICBvbkV4Y2hhbmdlUmF0ZUNvZGVDaGFuZ2U6IGZ1bmN0aW9uIG9uRXhjaGFuZ2VSYXRlQ29kZUNoYW5nZSh2YWx1ZSwgZmllbGQpIHtcclxuICAgIGNvbnN0IHNlbGVjdGlvbiA9IGZpZWxkLmdldFNlbGVjdGlvbigpO1xyXG4gICAgaWYgKHNlbGVjdGlvbiAmJiBzZWxlY3Rpb24uUmF0ZSkge1xyXG4gICAgICB0aGlzLmZpZWxkcy5FeGNoYW5nZVJhdGUuc2V0VmFsdWUoc2VsZWN0aW9uLlJhdGUpO1xyXG4gICAgICB0aGlzLmZpZWxkcy5FeGNoYW5nZVJhdGVEYXRlLnNldFZhbHVlKG5ldyBEYXRlKERhdGUubm93KCkpKTtcclxuICAgIH1cclxuICB9LFxyXG4gIG9uRXhjaGFuZ2VSYXRlTG9ja2VkQ2hhbmdlOiBmdW5jdGlvbiBvbkV4Y2hhbmdlUmF0ZUxvY2tlZENoYW5nZSh2YWx1ZSkge1xyXG4gICAgaWYgKHZhbHVlID09PSB0cnVlKSB7XHJcbiAgICAgIHRoaXMuZmllbGRzLkV4Y2hhbmdlUmF0ZS5kaXNhYmxlKCk7XHJcbiAgICAgIHRoaXMuZmllbGRzLkV4Y2hhbmdlUmF0ZUNvZGUuZGlzYWJsZSgpO1xyXG4gICAgfSBlbHNlIGlmICghQXBwLmNhbkNoYW5nZU9wcG9ydHVuaXR5UmF0ZSgpKSB7XHJcbiAgICAgIHRoaXMuZmllbGRzLkV4Y2hhbmdlUmF0ZS5kaXNhYmxlKCk7XHJcbiAgICAgIHRoaXMuZmllbGRzLkV4Y2hhbmdlUmF0ZUNvZGUuZGlzYWJsZSgpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5maWVsZHMuRXhjaGFuZ2VSYXRlLmVuYWJsZSgpO1xyXG4gICAgICB0aGlzLmZpZWxkcy5FeGNoYW5nZVJhdGVDb2RlLmVuYWJsZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuZmllbGRzLkV4Y2hhbmdlUmF0ZURhdGUuc2V0VmFsdWUobmV3IERhdGUoRGF0ZS5ub3coKSkpO1xyXG4gIH0sXHJcbiAgb25BY2NvdW50Q2hhbmdlOiBmdW5jdGlvbiBvbkFjY291bnRDaGFuZ2UodmFsdWUsIGZpZWxkKSB7XHJcbiAgICBjb25zdCBzZWxlY3Rpb24gPSBmaWVsZC5nZXRTZWxlY3Rpb24oKTtcclxuXHJcbiAgICAvLyB0b2RvOiBtYXRjaCBiZWhhdmlvciBpbiB3ZWIgY2xpZW50OyBpZiB0aGUgYWNjb3VudCBtYW5hZ2VyIChBTSkgaXMgZXhwbGljaXRseSBzZXQsIGl0IHNob3VsZCBzdGF5LCBvdGhlcndpc2VcclxuICAgIC8vIGl0IHNob3VsZCBiZSBzZXQgdG8gdGhlIEFNIGZvciB0aGUgc2VsZWN0ZWQgYWNjb3VudCAoYW5kIGNoYW5nZSBlYWNoIHRpbWUpLlxyXG4gICAgaWYgKHNlbGVjdGlvbiAmJiB0aGlzLmluc2VydCkge1xyXG4gICAgICB0aGlzLmZpZWxkcy5BY2NvdW50TWFuYWdlci5zZXRWYWx1ZSh1dGlsaXR5LmdldFZhbHVlKHNlbGVjdGlvbiwgJ0FjY291bnRNYW5hZ2VyJykpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgY3JlYXRlTGF5b3V0OiBmdW5jdGlvbiBjcmVhdGVMYXlvdXQoKSB7XHJcbiAgICBjb25zdCBkZXRhaWxzID0ge1xyXG4gICAgICB0aXRsZTogdGhpcy5kZXRhaWxzVGV4dCxcclxuICAgICAgbmFtZTogJ09wcG9ydHVuaXR5RGV0YWlsc0VkaXQnLFxyXG4gICAgICBjaGlsZHJlbjogW3tcclxuICAgICAgICBsYWJlbDogdGhpcy5vcHBvcnR1bml0eVRleHQsXHJcbiAgICAgICAgbmFtZTogJ0Rlc2NyaXB0aW9uJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0Rlc2NyaXB0aW9uJyxcclxuICAgICAgICB0eXBlOiAndGV4dCcsXHJcbiAgICAgICAgbWF4VGV4dExlbmd0aDogNjQsXHJcbiAgICAgICAgdmFsaWRhdG9yOiBbXHJcbiAgICAgICAgICB2YWxpZGF0b3Iubm90RW1wdHksXHJcbiAgICAgICAgICB2YWxpZGF0b3IuZXhjZWVkc01heFRleHRMZW5ndGgsXHJcbiAgICAgICAgXSxcclxuICAgICAgICBhdXRvRm9jdXM6IHRydWUsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBsYWJlbDogdGhpcy5hY2NvdW50VGV4dCxcclxuICAgICAgICBuYW1lOiAnQWNjb3VudCcsXHJcbiAgICAgICAgcHJvcGVydHk6ICdBY2NvdW50JyxcclxuICAgICAgICB0ZXh0UHJvcGVydHk6ICdBY2NvdW50TmFtZScsXHJcbiAgICAgICAgdHlwZTogJ2xvb2t1cCcsXHJcbiAgICAgICAgdmFsaWRhdG9yOiB2YWxpZGF0b3IuZXhpc3RzLFxyXG4gICAgICAgIHZpZXc6ICdhY2NvdW50X3JlbGF0ZWQnLFxyXG4gICAgICAgIHZpZXdNaXhpbjoge1xyXG4gICAgICAgICAgaGFzU2V0dGluZ3M6IGZhbHNlLFxyXG4gICAgICAgIH0sXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBsYWJlbDogdGhpcy5hY2N0TWdyVGV4dCxcclxuICAgICAgICBuYW1lOiAnQWNjb3VudE1hbmFnZXInLFxyXG4gICAgICAgIHByb3BlcnR5OiAnQWNjb3VudE1hbmFnZXInLFxyXG4gICAgICAgIHRleHRQcm9wZXJ0eTogJ1VzZXJJbmZvJyxcclxuICAgICAgICB0ZXh0VGVtcGxhdGU6IHRlbXBsYXRlLm5hbWVMRixcclxuICAgICAgICB0eXBlOiAnbG9va3VwJyxcclxuICAgICAgICB2aWV3OiAndXNlcl9saXN0JyxcclxuICAgICAgfSwge1xyXG4gICAgICAgIGxhYmVsOiB0aGlzLnJlc2VsbGVyVGV4dCxcclxuICAgICAgICBuYW1lOiAnUmVzZWxsZXInLFxyXG4gICAgICAgIHByb3BlcnR5OiAnUmVzZWxsZXInLFxyXG4gICAgICAgIHRleHRQcm9wZXJ0eTogJ0FjY291bnROYW1lJyxcclxuICAgICAgICB0eXBlOiAnbG9va3VwJyxcclxuICAgICAgICB2aWV3OiAnYWNjb3VudF9yZWxhdGVkJyxcclxuICAgICAgICB3aGVyZTogYHVwcGVyKFN1YlR5cGUpIGVxIFwiJHt0aGlzLnN1YlR5cGVQaWNrTGlzdFJlc2VsbGVyVGV4dH1cImAsXHJcbiAgICAgICAgdmlld01peGluOiB7XHJcbiAgICAgICAgICBoYXNTZXR0aW5nczogZmFsc2UsXHJcbiAgICAgICAgICBvblRyYW5zaXRpb25UbzogZnVuY3Rpb24gb25UcmFuc2l0aW9uVG8oc2VsZikge1xyXG4gICAgICAgICAgICAvLyBDbGVhciB0aGUgaW5pdGlhbCB3aGVyZSBjbGF1c2UsIGFsbG93aW5nIHRoZSB1c2VyIHRvIHNlYXJjaCBmb3Igb3RoZXJzIGlmIHRoZXkgd2FudFxyXG4gICAgICAgICAgICBzZWxmLm9wdGlvbnMud2hlcmUgPSAnJztcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIGxhYmVsOiB0aGlzLmVzdENsb3NlVGV4dCxcclxuICAgICAgICBuYW1lOiAnRXN0aW1hdGVkQ2xvc2UnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnRXN0aW1hdGVkQ2xvc2UnLFxyXG4gICAgICAgIHR5cGU6ICdkYXRlJyxcclxuICAgICAgICB0aW1lbGVzczogdHJ1ZSxcclxuICAgICAgICB2YWxpZGF0b3I6IHZhbGlkYXRvci5leGlzdHMsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBsYWJlbDogdGhpcy5wb3RlbnRpYWxUZXh0LFxyXG4gICAgICAgIG5hbWU6ICdTYWxlc1BvdGVudGlhbCcsXHJcbiAgICAgICAgcHJvcGVydHk6ICdTYWxlc1BvdGVudGlhbCcsXHJcbiAgICAgICAgcHJlY2lzaW9uOiAyLFxyXG4gICAgICAgIHR5cGU6ICdtdWx0aUN1cnJlbmN5JyxcclxuICAgICAgICB2YWxpZGF0aW9uVHJpZ2dlcjogJ2tleXVwJyxcclxuICAgICAgICB2YWxpZGF0b3I6IHZhbGlkYXRvci5pc0N1cnJlbmN5LFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbGFiZWw6IHRoaXMudHlwZVRleHQsXHJcbiAgICAgICAgbmFtZTogJ1R5cGUnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnVHlwZScsXHJcbiAgICAgICAgcGlja2xpc3Q6ICdPcHBvcnR1bml0eSBUeXBlJyxcclxuICAgICAgICB0aXRsZTogdGhpcy5vcHBvcnR1bml0eVR5cGVUaXRsZVRleHQsXHJcbiAgICAgICAgdHlwZTogJ3BpY2tsaXN0JyxcclxuICAgICAgICBtYXhUZXh0TGVuZ3RoOiA2NCxcclxuICAgICAgICB2YWxpZGF0b3I6IHZhbGlkYXRvci5leGNlZWRzTWF4VGV4dExlbmd0aCxcclxuICAgICAgfSwge1xyXG4gICAgICAgIGxhYmVsOiB0aGlzLnN0YXR1c1RleHQsXHJcbiAgICAgICAgbmFtZTogJ1N0YXR1cycsXHJcbiAgICAgICAgcHJvcGVydHk6ICdTdGF0dXMnLFxyXG4gICAgICAgIHBpY2tsaXN0OiAnT3Bwb3J0dW5pdHkgU3RhdHVzJyxcclxuICAgICAgICByZXF1aXJlU2VsZWN0aW9uOiB0cnVlLFxyXG4gICAgICAgIHRpdGxlOiB0aGlzLm9wcG9ydHVuaXR5U3RhdHVzVGl0bGVUZXh0LFxyXG4gICAgICAgIHR5cGU6ICdwaWNrbGlzdCcsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBsYWJlbDogdGhpcy5pbXBvcnRTb3VyY2VUZXh0LFxyXG4gICAgICAgIG5hbWU6ICdMZWFkU291cmNlJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0xlYWRTb3VyY2UnLFxyXG4gICAgICAgIHRleHRQcm9wZXJ0eTogJ0Rlc2NyaXB0aW9uJyxcclxuICAgICAgICB0eXBlOiAnbG9va3VwJyxcclxuICAgICAgICB2aWV3OiAnbGVhZHNvdXJjZV9saXN0JyxcclxuICAgICAgfSwge1xyXG4gICAgICAgIGxhYmVsOiB0aGlzLm93bmVyVGV4dCxcclxuICAgICAgICBuYW1lOiAnT3duZXInLFxyXG4gICAgICAgIHByb3BlcnR5OiAnT3duZXInLFxyXG4gICAgICAgIGtleVByb3BlcnR5OiAnJGtleScsXHJcbiAgICAgICAgdGV4dFByb3BlcnR5OiAnT3duZXJEZXNjcmlwdGlvbicsXHJcbiAgICAgICAgdHlwZTogJ2xvb2t1cCcsXHJcbiAgICAgICAgdmFsaWRhdG9yOiB2YWxpZGF0b3IuZXhpc3RzLFxyXG4gICAgICAgIHZpZXc6ICdvd25lcl9saXN0JyxcclxuICAgICAgfSwge1xyXG4gICAgICAgIGxhYmVsOiB0aGlzLnByb2JhYmlsaXR5VGV4dCxcclxuICAgICAgICBuYW1lOiAnQ2xvc2VQcm9iYWJpbGl0eScsXHJcbiAgICAgICAgcHJvcGVydHk6ICdDbG9zZVByb2JhYmlsaXR5JyxcclxuICAgICAgICBwaWNrbGlzdDogJ09wcG9ydHVuaXR5IFByb2JhYmlsaXR5JyxcclxuICAgICAgICB0aXRsZTogdGhpcy5wcm9iYWJpbGl0eVRpdGxlVGV4dCxcclxuICAgICAgICB0eXBlOiAncGlja2xpc3QnLFxyXG4gICAgICAgIHZhbGlkYXRvcjogW1xyXG4gICAgICAgICAgdmFsaWRhdG9yLmlzSW50MzIsXHJcbiAgICAgICAgICB2YWxpZGF0b3IuaXNJbnRlZ2VyLFxyXG4gICAgICAgIF0sXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnQ29udGFjdHMuJHJlc291cmNlc1swXS5Db250YWN0LiRrZXknLFxyXG4gICAgICAgIHByb3BlcnR5OiAnQ29udGFjdHMuJHJlc291cmNlc1swXS5Db250YWN0LiRrZXknLFxyXG4gICAgICAgIHR5cGU6ICdoaWRkZW4nLFxyXG4gICAgICB9XSxcclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgbXVsdGlDdXJyZW5jeSA9IHtcclxuICAgICAgdGl0bGU6IHRoaXMubXVsdGlDdXJyZW5jeVRleHQsXHJcbiAgICAgIG5hbWU6ICdPcHBvcnR1bml0eU11bHRpQ3VycmVuY3lFZGl0JyxcclxuICAgICAgY2hpbGRyZW46IFt7XHJcbiAgICAgICAgbGFiZWw6IHRoaXMubXVsdGlDdXJyZW5jeVJhdGVUZXh0LFxyXG4gICAgICAgIG5hbWU6ICdFeGNoYW5nZVJhdGUnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnRXhjaGFuZ2VSYXRlJyxcclxuICAgICAgICB0eXBlOiAndGV4dCcsXHJcbiAgICAgICAgdmFsaWRhdG9yOiB2YWxpZGF0b3IuaXNEZWNpbWFsLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbGFiZWw6IHRoaXMubXVsdGlDdXJyZW5jeUNvZGVUZXh0LFxyXG4gICAgICAgIG5hbWU6ICdFeGNoYW5nZVJhdGVDb2RlJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0V4Y2hhbmdlUmF0ZUNvZGUnLFxyXG4gICAgICAgIHRleHRQcm9wZXJ0eTogJyRrZXknLFxyXG4gICAgICAgIHR5cGU6ICdsb29rdXAnLFxyXG4gICAgICAgIHZpZXc6ICdleGNoYW5nZXJhdGVfbG9va3VwJyxcclxuICAgICAgfSwge1xyXG4gICAgICAgIGxhYmVsOiB0aGlzLm11bHRpQ3VycmVuY3lMb2NrZWRUZXh0LFxyXG4gICAgICAgIG5hbWU6ICdFeGNoYW5nZVJhdGVMb2NrZWQnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnRXhjaGFuZ2VSYXRlTG9ja2VkJyxcclxuICAgICAgICB0eXBlOiAnYm9vbGVhbicsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBsYWJlbDogdGhpcy5tdWx0aUN1cnJlbmN5RGF0ZVRleHQsXHJcbiAgICAgICAgbmFtZTogJ0V4Y2hhbmdlUmF0ZURhdGUnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnRXhjaGFuZ2VSYXRlRGF0ZScsXHJcbiAgICAgICAgdHlwZTogJ2RhdGUnLFxyXG4gICAgICAgIHRpbWVsZXNzOiBmYWxzZSxcclxuICAgICAgICBkYXRlRm9ybWF0VGV4dDogKEFwcC5pczI0SG91ckNsb2NrKCkpID8gdGhpcy5leGNoYW5nZVJhdGVEYXRlRm9ybWF0VGV4dDI0IDogdGhpcy5leGNoYW5nZVJhdGVEYXRlRm9ybWF0VGV4dCxcclxuICAgICAgICBkaXNhYmxlZDogdHJ1ZSwgLy8gVE9ETzogQ3JlYXRlIGFuIFNESyBpc3N1ZSBmb3IgdGhpcyAoTk9UIFdPUktJTkchISEpXHJcbiAgICAgIH1dLFxyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBsYXlvdXQgPSB0aGlzLmxheW91dCB8fCAodGhpcy5sYXlvdXQgPSBbXSk7XHJcblxyXG4gICAgaWYgKGxheW91dC5sZW5ndGggPiAwKSB7XHJcbiAgICAgIHJldHVybiBsYXlvdXQ7XHJcbiAgICB9XHJcblxyXG4gICAgbGF5b3V0LnB1c2goZGV0YWlscyk7XHJcblxyXG4gICAgaWYgKEFwcC5oYXNNdWx0aUN1cnJlbmN5KCkpIHtcclxuICAgICAgbGF5b3V0LnB1c2gobXVsdGlDdXJyZW5jeSk7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIGxheW91dDtcclxuICB9LFxyXG59KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IF9fY2xhc3M7XHJcbiJdfQ==
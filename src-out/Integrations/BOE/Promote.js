define('crm/Integrations/BOE/Promote', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', 'dojo/string', 'dojo/when', 'argos/Models/Adapter', 'argos/Dialogs/BusyIndicator', 'dojo/Deferred', 'argos/Dropdown', 'dijit/_Widget', 'argos/_Templated', './Models/Names', 'argos/I18n'], function (module, exports, _declare, _lang, _string, _when, _Adapter, _BusyIndicator, _Deferred, _Dropdown, _Widget2, _Templated2, _Names, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _lang2 = _interopRequireDefault(_lang);

  var _string2 = _interopRequireDefault(_string);

  var _when2 = _interopRequireDefault(_when);

  var _Adapter2 = _interopRequireDefault(_Adapter);

  var _BusyIndicator2 = _interopRequireDefault(_BusyIndicator);

  var _Deferred2 = _interopRequireDefault(_Deferred);

  var _Dropdown2 = _interopRequireDefault(_Dropdown);

  var _Widget3 = _interopRequireDefault(_Widget2);

  var _Templated3 = _interopRequireDefault(_Templated2);

  var _Names2 = _interopRequireDefault(_Names);

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

  var resource = (0, _I18n2.default)('promote');

  /**
   * @class crm.Integrations.BOE.Promote
   */
  var __class = (0, _declare2.default)('crm.Integrations.BOE.Promote', [_Widget3.default, _Templated3.default], /** @lends crm.Integrations.BOE.Promote */{
    widgetTemplate: new Simplate(['<div class="modal__content" data-dojo-attach-point="promoteNode">', '<div class="modal__header__title">{%: $.promoteTitle %}</div>', '<div class="modal__header__title">{%: $.searchResults %}</div>', '<p class="modal__content__text">{%: $.multiSystemDetected %}</p>', '<div class="modal__header__title">{%: $.createLink %}</div>', '<div class="promote__options">', '<div class="promote__row">', '<label class="promote__row__label">{%: $.backOffice %}</label>', '<div data-dojo-attach-point="backOfficeNode"></div>', '</div>', '<div class="promote__row">', '<label class="promote__row__label">{%: $.accountingEntity %}</label>', '<div data-dojo-attach-point="accountingNode"></div>', '</div>', '</div>', '</div>']),

    promoteTitle: resource.promoteTitle,
    searchResults: resource.searchResults,
    multiSystemDetected: resource.multiSystemDetected,
    createLink: resource.createLink,
    backOffice: resource.backOffice,
    accountingEntity: resource.accountingEntity,
    cancelText: resource.cancelText,
    promoteText: resource.promoteText,
    noBackOfficesText: resource.noBackOfficesText,
    promotionRequested: resource.promotionRequested,
    promotionText: resource.promotionText,
    errorMessage: resource.errorMessage,
    promoteIcon: 'upload',

    _accountingDeferred: null,
    _accountingDropdown: null,
    _accountingBusy: null,
    _accountingSelections: null,
    _accountingEntitiesEntries: null,
    _backOfficeSelections: null,
    _backOfficeEntries: null,
    _backOfficeDropdown: null,
    _busy: null,
    _endPoints: null,
    _firstLoad: null,
    _operatingCompanyModel: null,

    initBackOfficeModel: function initBackOfficeModel() {
      var model = this.getModel(_Names2.default.BACKOFFICE);
      if (model) {
        this._backOfficeModel = model;
        this._backOfficeModel.init();
        this.getBackOfficeEntries();
      }
    },
    getBackOfficeEntries: function getBackOfficeEntries() {
      var query = this._backOfficeModel.getEntries(null, {
        returnQueryResults: true,
        queryModelName: 'list-active'
      });
      (0, _when2.default)(query, this.processBackOfficeEntries.bind(this), this._onQueryFailure.bind(this));
    },
    initAccountingEntitiesModel: function initAccountingEntitiesModel() {
      var model = this.getModel(_Names2.default.BACKOFFICEACCOUNTINGENTITY);
      if (model) {
        this._accountingEntityModel = model;
        this._accountingEntityModel.init();
      }
    },
    getAccountingEntitiesEntries: function getAccountingEntitiesEntries(backOfficeKey) {
      if (backOfficeKey) {
        if (this._backOfficeEntries.length) {
          var query = this._accountingEntityModel.getEntries('BackOffice.$key eq "' + backOfficeKey + '"', {
            returnQueryResults: true,
            queryModelName: 'list'
          });
          (0, _when2.default)(query, this.processAccountingEntries.bind(this), this._onQueryFailure.bind(this));
          return;
        }
      }
      App.modal.disableClose = false;
      App.modal.resolveDeferred(true);
      App.modal.showToolbar = true;
      App.modal.createSimpleDialog({ title: 'alert', content: this.noBackOfficesText });
    },
    initIntegrationMappingModel: function initIntegrationMappingModel() {
      var model = this.getModel(_Names2.default.OPERATINGCOMPANY);
      if (model) {
        this._operatingCompanyModel = model;
        this._operatingCompanyModel.init();
      }
    },
    /**
     * Returns a new instance of a model for the view.
     */
    getModel: function getModel(modelName) {
      var model = _Adapter2.default.getModel(modelName);
      return model;
    },
    _promote: function _promote(options, scope) {
      var _this = this;

      if (options && scope) {
        var entry = {
          $name: 'PromoteToBackOffice',
          request: options
        };
        var request = new Sage.SData.Client.SDataServiceOperationRequest(scope.getService()).setResourceKind('backOffices').setContractName('dynamic').setOperationName('PromoteToBackOffice');

        request.execute(entry, {
          success: function success() {
            var toast = {
              title: _this.promotionRequested,
              message: _this.promotionText,
              icon: _this.promoteIcon
            };
            App.toast.add(toast);
            scope._refreshClicked();
          },
          failure: function failure(err) {
            App.toast.add({ title: 'Error', message: _string2.default.substitute(_this.errorMessage, { reason: err.statusText }) });
          },
          scope: this
        });
      }
    },
    promoteToBackOffice: function _promoteToBackOffice(entry, entityName, scope) {
      var _this2 = this;

      if (!entry || !entityName || !scope) {
        return;
      }
      var readyToPromote = this.checkEntryFor(entry, ['ErpLogicalId', 'ErpAccountingEntityId']);
      if (readyToPromote) {
        this._promote({
          entityName: entityName,
          entityId: entry.$key,
          logicalId: entry.ErpLogicalId,
          accountingEntityId: entry.ErpAccountingEntityId
        }, scope);
        return;
      }
      this.getAccountingSystem().then(function (value) {
        if (!value) {
          App.modal.showToolbar = true;
          var toolbar = [{
            action: 'cancel',
            className: 'button--flat button--flat--split',
            text: _this2.cancelText
          }, {
            action: 'resolve',
            className: 'button--flat button--flat--split',
            text: _this2.promoteText
          }];

          App.modal.add(_this2, toolbar).then(function (data) {
            _this2._promote({
              entityName: entityName,
              entityId: entry.$key,
              logicalId: data.ErpLogicalId,
              accountingEntityId: data.ErpAccountingEntityId
            }, scope);
          });
        } else {
          var data = _this2.getContent();
          _this2._promote({
            entityName: entityName,
            entityId: entry.$key,
            logicalId: data.ErpLogicalId,
            accountingEntityId: data.ErpAccountingEntityId
          }, scope);
        }
      });
    },
    processBackOfficeEntries: function processBackOfficeEntries(entries) {
      var _this3 = this;

      this._backOfficeEntries = entries;
      this._backOfficeSelections = [];
      this._backOfficeEntries.forEach(function (entry) {
        _this3._backOfficeSelections.push({
          value: entry.$key,
          text: entry.BackOfficeName
        });
      });
      if (this._backOfficeSelections[0]) {
        this.getAccountingEntitiesEntries(this._backOfficeSelections[0].value);
      } else {
        this.getAccountingEntitiesEntries(null);
      }
    },
    processAccountingEntries: function processAccountingEntries(entries) {
      var _this4 = this;

      this._accountingEntitiesEntries = entries;
      this._accountingSelections = [];
      this._accountingEntitiesEntries.forEach(function (entry) {
        _this4._accountingSelections.push({
          value: entry.$key,
          text: entry.Name
        });
      });
      if (this._firstLoad) {
        this.createBackOfficeDropdown();
        this.createAccountingDropdown();
        if (this._backOfficeSelections.length !== 1 || this._accountingSelections.length !== 1) {
          this._firstLoad = false;
          this._busy.complete();
          App.modal.disableClose = false;
          App.modal.resolveDeferred(true);
          this._accountingDeferred.resolve(false);
        } else {
          // Promote Account with entities in backoffices and accountingEntities
          this._busy.complete();
          App.modal.disableClose = false;
          App.modal.resolveDeferred(true);
          this._accountingDeferred.resolve(true);
        }
      } else {
        this.createAccountingDropdown();
      }
    },
    _onQueryFailure: function _onQueryFailure(err) {
      App.modal.hide();
      this.createAlertDialog(err);
      console.error(err); // eslint-disable-line
    },
    checkEntryFor: function checkEntryFor(entry) {
      var properties = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

      var hasAllProperties = true;
      properties.forEach(function (property) {
        if (!entry[property]) {
          hasAllProperties = false;
        }
      });
      return hasAllProperties;
    },
    clearLoading: function clearLoading(node) {
      $(node).empty();
    },
    createAlertDialog: function createAlertDialog(err) {
      this._busy.complete(true);
      App.modal.disableClose = false;
      App.modal.showToolbar = true;
      App.modal.resolveDeferred(true);
      return App.modal.createSimpleDialog({ title: 'alert', content: err, getContent: function getContent() {
          return;
        }, leftButton: 'cancel', rightButton: 'confirm' });
    },
    createAccountingDropdown: function createAccountingDropdown() {
      if (this._accountingDropdown) {
        this.clearLoading(this.accountingNode);
        this._accountingDropdown.destroy();
      }
      this._accountingDropdown = new _Dropdown2.default({ id: 'accountingDropdown', dropdownClass: 'promote__dropdown' });
      this._accountingDropdown.createList({ items: this._accountingSelections, defaultValue: this._accountingSelections[0] ? this._accountingSelections[0].value : '' }); // TODO: change the defaultValue selected
      $(this.accountingNode).append(this._accountingDropdown.domNode);
      return this;
    },
    createBackOfficeDropdown: function createBackOfficeDropdown() {
      if (!this._backOfficeDropdown) {
        this._backOfficeDropdown = new _Dropdown2.default({ id: 'backOfficeDropdown', dropdownClass: 'promote__dropdown', onSelect: this.updateAccountingDropdown, onSelectScope: this });
        this._backOfficeDropdown.createList({ items: this._backOfficeSelections, defaultValue: this._backOfficeSelections[0] ? this._backOfficeSelections[0].value : '' }); // TODO: change the defaultValue selected
        $(this.backOfficeNode).append(this._backOfficeDropdown.domNode);
      }
      return this;
    },
    getAccountingSystem: function getAccountingSystem() {
      if (!this._busy) {
        this._busy = new _BusyIndicator2.default({ id: this.id + '__busyIndicator' });
        this._accountingBusy = new _BusyIndicator2.default({ id: this.id + '__busyIndicator__accounting', size: 'small', label: null, containerClass: 'busyField' });
        this._accountingBusy.start();
      }
      this._firstLoad = true;
      App.modal.showToolbar = false;
      App.modal.disableClose = true;
      App.modal.add(this._busy);
      this._busy.start();
      this._accountingDeferred = new _Deferred2.default();
      this.initBackOfficeModel();
      this.initIntegrationMappingModel();
      this.initAccountingEntitiesModel();
      return this._accountingDeferred.promise;
    },
    getContent: function getContent() {
      var _this5 = this;

      return {
        ErpLogicalId: this._backOfficeEntries.find(function (value) {
          return value.$key === _this5._backOfficeDropdown.getValue();
        }).LogicalId,
        ErpAccountingEntityId: this._accountingEntitiesEntries.find(function (value) {
          return value.$key === _this5._accountingDropdown.getValue();
        }).AcctEntityExtId
      };
    },
    setLoading: function setLoading(node) {
      $(node).empty().append(this._accountingBusy.domNode);
    },
    show: function show() {
      if (!this._backOfficeModel) {
        this.getAccountingSystem();
      }
      return this;
    },
    updateAccountingDropdown: function updateAccountingDropdown() {
      this.setLoading(this.accountingNode);
      this.getAccountingEntitiesEntries(this._backOfficeDropdown.getValue());
    },
    transitionAway: function transitionAway() {
      // force soho dropdown to close since they dont close on a button click elsewhere on UI
      $(this._backOfficeDropdown.dropdownSelect).data('dropdown').close();
      $(this._accountingDropdown.dropdownSelect).data('dropdown').close();
      this.inherited(arguments);
    }
  });

  _lang2.default.setObject('icboe.Promote', __class);
  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQk9FL1Byb21vdGUuanMiXSwibmFtZXMiOlsicmVzb3VyY2UiLCJfX2NsYXNzIiwid2lkZ2V0VGVtcGxhdGUiLCJTaW1wbGF0ZSIsInByb21vdGVUaXRsZSIsInNlYXJjaFJlc3VsdHMiLCJtdWx0aVN5c3RlbURldGVjdGVkIiwiY3JlYXRlTGluayIsImJhY2tPZmZpY2UiLCJhY2NvdW50aW5nRW50aXR5IiwiY2FuY2VsVGV4dCIsInByb21vdGVUZXh0Iiwibm9CYWNrT2ZmaWNlc1RleHQiLCJwcm9tb3Rpb25SZXF1ZXN0ZWQiLCJwcm9tb3Rpb25UZXh0IiwiZXJyb3JNZXNzYWdlIiwicHJvbW90ZUljb24iLCJfYWNjb3VudGluZ0RlZmVycmVkIiwiX2FjY291bnRpbmdEcm9wZG93biIsIl9hY2NvdW50aW5nQnVzeSIsIl9hY2NvdW50aW5nU2VsZWN0aW9ucyIsIl9hY2NvdW50aW5nRW50aXRpZXNFbnRyaWVzIiwiX2JhY2tPZmZpY2VTZWxlY3Rpb25zIiwiX2JhY2tPZmZpY2VFbnRyaWVzIiwiX2JhY2tPZmZpY2VEcm9wZG93biIsIl9idXN5IiwiX2VuZFBvaW50cyIsIl9maXJzdExvYWQiLCJfb3BlcmF0aW5nQ29tcGFueU1vZGVsIiwiaW5pdEJhY2tPZmZpY2VNb2RlbCIsIm1vZGVsIiwiZ2V0TW9kZWwiLCJCQUNLT0ZGSUNFIiwiX2JhY2tPZmZpY2VNb2RlbCIsImluaXQiLCJnZXRCYWNrT2ZmaWNlRW50cmllcyIsInF1ZXJ5IiwiZ2V0RW50cmllcyIsInJldHVyblF1ZXJ5UmVzdWx0cyIsInF1ZXJ5TW9kZWxOYW1lIiwicHJvY2Vzc0JhY2tPZmZpY2VFbnRyaWVzIiwiYmluZCIsIl9vblF1ZXJ5RmFpbHVyZSIsImluaXRBY2NvdW50aW5nRW50aXRpZXNNb2RlbCIsIkJBQ0tPRkZJQ0VBQ0NPVU5USU5HRU5USVRZIiwiX2FjY291bnRpbmdFbnRpdHlNb2RlbCIsImdldEFjY291bnRpbmdFbnRpdGllc0VudHJpZXMiLCJiYWNrT2ZmaWNlS2V5IiwibGVuZ3RoIiwicHJvY2Vzc0FjY291bnRpbmdFbnRyaWVzIiwiQXBwIiwibW9kYWwiLCJkaXNhYmxlQ2xvc2UiLCJyZXNvbHZlRGVmZXJyZWQiLCJzaG93VG9vbGJhciIsImNyZWF0ZVNpbXBsZURpYWxvZyIsInRpdGxlIiwiY29udGVudCIsImluaXRJbnRlZ3JhdGlvbk1hcHBpbmdNb2RlbCIsIk9QRVJBVElOR0NPTVBBTlkiLCJtb2RlbE5hbWUiLCJfcHJvbW90ZSIsIm9wdGlvbnMiLCJzY29wZSIsImVudHJ5IiwiJG5hbWUiLCJyZXF1ZXN0IiwiU2FnZSIsIlNEYXRhIiwiQ2xpZW50IiwiU0RhdGFTZXJ2aWNlT3BlcmF0aW9uUmVxdWVzdCIsImdldFNlcnZpY2UiLCJzZXRSZXNvdXJjZUtpbmQiLCJzZXRDb250cmFjdE5hbWUiLCJzZXRPcGVyYXRpb25OYW1lIiwiZXhlY3V0ZSIsInN1Y2Nlc3MiLCJ0b2FzdCIsIm1lc3NhZ2UiLCJpY29uIiwiYWRkIiwiX3JlZnJlc2hDbGlja2VkIiwiZmFpbHVyZSIsImVyciIsInN1YnN0aXR1dGUiLCJyZWFzb24iLCJzdGF0dXNUZXh0IiwicHJvbW90ZVRvQmFja09mZmljZSIsIl9wcm9tb3RlVG9CYWNrT2ZmaWNlIiwiZW50aXR5TmFtZSIsInJlYWR5VG9Qcm9tb3RlIiwiY2hlY2tFbnRyeUZvciIsImVudGl0eUlkIiwiJGtleSIsImxvZ2ljYWxJZCIsIkVycExvZ2ljYWxJZCIsImFjY291bnRpbmdFbnRpdHlJZCIsIkVycEFjY291bnRpbmdFbnRpdHlJZCIsImdldEFjY291bnRpbmdTeXN0ZW0iLCJ0aGVuIiwidmFsdWUiLCJ0b29sYmFyIiwiYWN0aW9uIiwiY2xhc3NOYW1lIiwidGV4dCIsImRhdGEiLCJnZXRDb250ZW50IiwiZW50cmllcyIsImZvckVhY2giLCJwdXNoIiwiQmFja09mZmljZU5hbWUiLCJOYW1lIiwiY3JlYXRlQmFja09mZmljZURyb3Bkb3duIiwiY3JlYXRlQWNjb3VudGluZ0Ryb3Bkb3duIiwiY29tcGxldGUiLCJyZXNvbHZlIiwiaGlkZSIsImNyZWF0ZUFsZXJ0RGlhbG9nIiwiY29uc29sZSIsImVycm9yIiwicHJvcGVydGllcyIsImhhc0FsbFByb3BlcnRpZXMiLCJwcm9wZXJ0eSIsImNsZWFyTG9hZGluZyIsIm5vZGUiLCIkIiwiZW1wdHkiLCJsZWZ0QnV0dG9uIiwicmlnaHRCdXR0b24iLCJhY2NvdW50aW5nTm9kZSIsImRlc3Ryb3kiLCJpZCIsImRyb3Bkb3duQ2xhc3MiLCJjcmVhdGVMaXN0IiwiaXRlbXMiLCJkZWZhdWx0VmFsdWUiLCJhcHBlbmQiLCJkb21Ob2RlIiwib25TZWxlY3QiLCJ1cGRhdGVBY2NvdW50aW5nRHJvcGRvd24iLCJvblNlbGVjdFNjb3BlIiwiYmFja09mZmljZU5vZGUiLCJzaXplIiwibGFiZWwiLCJjb250YWluZXJDbGFzcyIsInN0YXJ0IiwicHJvbWlzZSIsImZpbmQiLCJnZXRWYWx1ZSIsIkxvZ2ljYWxJZCIsIkFjY3RFbnRpdHlFeHRJZCIsInNldExvYWRpbmciLCJzaG93IiwidHJhbnNpdGlvbkF3YXkiLCJkcm9wZG93blNlbGVjdCIsImNsb3NlIiwiaW5oZXJpdGVkIiwiYXJndW1lbnRzIiwic2V0T2JqZWN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7QUE2QkEsTUFBTUEsV0FBVyxvQkFBWSxTQUFaLENBQWpCOztBQUVBOzs7QUFHQSxNQUFNQyxVQUFVLHVCQUFRLDhCQUFSLEVBQXdDLHVDQUF4QyxFQUErRCwwQ0FBMEM7QUFDdkhDLG9CQUFnQixJQUFJQyxRQUFKLENBQWEsQ0FDM0IsbUVBRDJCLEVBRTNCLCtEQUYyQixFQUczQixnRUFIMkIsRUFJM0Isa0VBSjJCLEVBSzNCLDZEQUwyQixFQU0zQixnQ0FOMkIsRUFPM0IsNEJBUDJCLEVBUTNCLGdFQVIyQixFQVMzQixxREFUMkIsRUFVM0IsUUFWMkIsRUFXM0IsNEJBWDJCLEVBWTNCLHNFQVoyQixFQWEzQixxREFiMkIs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QUNyRSxpQkFBT0EsTUFBTVAsSUFBTixLQUFlLE9BQUszRSxtQkFBTCxDQUF5QmtJLFFBQXpCLEVBQXRCO0FBQ0QsU0FGc0IsRUFFcEJFO0FBTkUsT0FBUDtBQVFELEtBL1JzSDtBQWdTdkhDLGdCQUFZLFNBQVNBLFVBQVQsQ0FBb0IzQixJQUFwQixFQUEwQjtBQUNwQ0MsUUFBRUQsSUFBRixFQUFRRSxLQUFSLEdBQWdCVSxNQUFoQixDQUF1QixLQUFLckgsZUFBTCxDQUFxQnNILE9BQTVDO0FBQ0QsS0FsU3NIO0FBbVN2SGUsVUFBTSxTQUFTQSxJQUFULEdBQWdCO0FBQ3BCLFVBQUksQ0FBQyxLQUFLdkgsZ0JBQVYsRUFBNEI7QUFDMUIsYUFBS2lFLG1CQUFMO0FBQ0Q7QUFDRCxhQUFPLElBQVA7QUFDRCxLQXhTc0g7QUF5U3ZIeUMsOEJBQTBCLFNBQVNBLHdCQUFULEdBQW9DO0FBQzVELFdBQUtZLFVBQUwsQ0FBZ0IsS0FBS3RCLGNBQXJCO0FBQ0EsV0FBS25GLDRCQUFMLENBQWtDLEtBQUt0QixtQkFBTCxDQUF5QjRILFFBQXpCLEVBQWxDO0FBQ0QsS0E1U3NIO0FBNlN2SEssb0JBQWdCLFNBQVNBLGNBQVQsR0FBMEI7QUFDeEM7QUFDQTVCLFFBQUUsS0FBS3JHLG1CQUFMLENBQXlCa0ksY0FBM0IsRUFBMkNqRCxJQUEzQyxDQUFnRCxVQUFoRCxFQUE0RGtELEtBQTVEO0FBQ0E5QixRQUFFLEtBQUszRyxtQkFBTCxDQUF5QndJLGNBQTNCLEVBQTJDakQsSUFBM0MsQ0FBZ0QsVUFBaEQsRUFBNERrRCxLQUE1RDtBQUNBLFdBQUtDLFNBQUwsQ0FBZUMsU0FBZjtBQUNEO0FBbFRzSCxHQUF6RyxDQUFoQjs7QUFxVEEsaUJBQUtDLFNBQUwsQ0FBZSxlQUFmLEVBQWdDN0osT0FBaEM7b0JBQ2VBLE8iLCJmaWxlIjoiUHJvbW90ZS5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBDb3B5cmlnaHQgMjAxNyBJbmZvclxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBkZWNsYXJlIGZyb20gJ2Rvam8vX2Jhc2UvZGVjbGFyZSc7XHJcbmltcG9ydCBsYW5nIGZyb20gJ2Rvam8vX2Jhc2UvbGFuZyc7XHJcbmltcG9ydCBzdHJpbmcgZnJvbSAnZG9qby9zdHJpbmcnO1xyXG5pbXBvcnQgd2hlbiBmcm9tICdkb2pvL3doZW4nO1xyXG5pbXBvcnQgQWRhcHRlciBmcm9tICdhcmdvcy9Nb2RlbHMvQWRhcHRlcic7XHJcbmltcG9ydCBCdXN5SW5kaWNhdG9yIGZyb20gJ2FyZ29zL0RpYWxvZ3MvQnVzeUluZGljYXRvcic7XHJcbmltcG9ydCBEZWZlcnJlZCBmcm9tICdkb2pvL0RlZmVycmVkJztcclxuaW1wb3J0IERyb3Bkb3duIGZyb20gJ2FyZ29zL0Ryb3Bkb3duJztcclxuaW1wb3J0IF9XaWRnZXQgZnJvbSAnZGlqaXQvX1dpZGdldCc7XHJcbmltcG9ydCBfVGVtcGxhdGVkIGZyb20gJ2FyZ29zL19UZW1wbGF0ZWQnO1xyXG5pbXBvcnQgTU9ERUxfTkFNRVMgZnJvbSAnLi9Nb2RlbHMvTmFtZXMnO1xyXG5pbXBvcnQgZ2V0UmVzb3VyY2UgZnJvbSAnYXJnb3MvSTE4bic7XHJcblxyXG5cclxuY29uc3QgcmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgncHJvbW90ZScpO1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBjcm0uSW50ZWdyYXRpb25zLkJPRS5Qcm9tb3RlXHJcbiAqL1xyXG5jb25zdCBfX2NsYXNzID0gZGVjbGFyZSgnY3JtLkludGVncmF0aW9ucy5CT0UuUHJvbW90ZScsIFtfV2lkZ2V0LCBfVGVtcGxhdGVkXSwgLyoqIEBsZW5kcyBjcm0uSW50ZWdyYXRpb25zLkJPRS5Qcm9tb3RlICove1xyXG4gIHdpZGdldFRlbXBsYXRlOiBuZXcgU2ltcGxhdGUoW1xyXG4gICAgJzxkaXYgY2xhc3M9XCJtb2RhbF9fY29udGVudFwiIGRhdGEtZG9qby1hdHRhY2gtcG9pbnQ9XCJwcm9tb3RlTm9kZVwiPicsXHJcbiAgICAnPGRpdiBjbGFzcz1cIm1vZGFsX19oZWFkZXJfX3RpdGxlXCI+eyU6ICQucHJvbW90ZVRpdGxlICV9PC9kaXY+JyxcclxuICAgICc8ZGl2IGNsYXNzPVwibW9kYWxfX2hlYWRlcl9fdGl0bGVcIj57JTogJC5zZWFyY2hSZXN1bHRzICV9PC9kaXY+JyxcclxuICAgICc8cCBjbGFzcz1cIm1vZGFsX19jb250ZW50X190ZXh0XCI+eyU6ICQubXVsdGlTeXN0ZW1EZXRlY3RlZCAlfTwvcD4nLFxyXG4gICAgJzxkaXYgY2xhc3M9XCJtb2RhbF9faGVhZGVyX190aXRsZVwiPnslOiAkLmNyZWF0ZUxpbmsgJX08L2Rpdj4nLFxyXG4gICAgJzxkaXYgY2xhc3M9XCJwcm9tb3RlX19vcHRpb25zXCI+JyxcclxuICAgICc8ZGl2IGNsYXNzPVwicHJvbW90ZV9fcm93XCI+JyxcclxuICAgICc8bGFiZWwgY2xhc3M9XCJwcm9tb3RlX19yb3dfX2xhYmVsXCI+eyU6ICQuYmFja09mZmljZSAlfTwvbGFiZWw+JyxcclxuICAgICc8ZGl2IGRhdGEtZG9qby1hdHRhY2gtcG9pbnQ9XCJiYWNrT2ZmaWNlTm9kZVwiPjwvZGl2PicsXHJcbiAgICAnPC9kaXY+JyxcclxuICAgICc8ZGl2IGNsYXNzPVwicHJvbW90ZV9fcm93XCI+JyxcclxuICAgICc8bGFiZWwgY2xhc3M9XCJwcm9tb3RlX19yb3dfX2xhYmVsXCI+eyU6ICQuYWNjb3VudGluZ0VudGl0eSAlfTwvbGFiZWw+JyxcclxuICAgICc8ZGl2IGRhdGEtZG9qby1hdHRhY2gtcG9pbnQ9XCJhY2NvdW50aW5nTm9kZVwiPjwvZGl2PicsXHJcbiAgICAnPC9kaXY+JyxcclxuICAgICc8L2Rpdj4nLFxyXG4gICAgJzwvZGl2PicsXHJcbiAgXSksXHJcblxyXG4gIHByb21vdGVUaXRsZTogcmVzb3VyY2UucHJvbW90ZVRpdGxlLFxyXG4gIHNlYXJjaFJlc3VsdHM6IHJlc291cmNlLnNlYXJjaFJlc3VsdHMsXHJcbiAgbXVsdGlTeXN0ZW1EZXRlY3RlZDogcmVzb3VyY2UubXVsdGlTeXN0ZW1EZXRlY3RlZCxcclxuICBjcmVhdGVMaW5rOiByZXNvdXJjZS5jcmVhdGVMaW5rLFxyXG4gIGJhY2tPZmZpY2U6IHJlc291cmNlLmJhY2tPZmZpY2UsXHJcbiAgYWNjb3VudGluZ0VudGl0eTogcmVzb3VyY2UuYWNjb3VudGluZ0VudGl0eSxcclxuICBjYW5jZWxUZXh0OiByZXNvdXJjZS5jYW5jZWxUZXh0LFxyXG4gIHByb21vdGVUZXh0OiByZXNvdXJjZS5wcm9tb3RlVGV4dCxcclxuICBub0JhY2tPZmZpY2VzVGV4dDogcmVzb3VyY2Uubm9CYWNrT2ZmaWNlc1RleHQsXHJcbiAgcHJvbW90aW9uUmVxdWVzdGVkOiByZXNvdXJjZS5wcm9tb3Rpb25SZXF1ZXN0ZWQsXHJcbiAgcHJvbW90aW9uVGV4dDogcmVzb3VyY2UucHJvbW90aW9uVGV4dCxcclxuICBlcnJvck1lc3NhZ2U6IHJlc291cmNlLmVycm9yTWVzc2FnZSxcclxuICBwcm9tb3RlSWNvbjogJ3VwbG9hZCcsXHJcblxyXG4gIF9hY2NvdW50aW5nRGVmZXJyZWQ6IG51bGwsXHJcbiAgX2FjY291bnRpbmdEcm9wZG93bjogbnVsbCxcclxuICBfYWNjb3VudGluZ0J1c3k6IG51bGwsXHJcbiAgX2FjY291bnRpbmdTZWxlY3Rpb25zOiBudWxsLFxyXG4gIF9hY2NvdW50aW5nRW50aXRpZXNFbnRyaWVzOiBudWxsLFxyXG4gIF9iYWNrT2ZmaWNlU2VsZWN0aW9uczogbnVsbCxcclxuICBfYmFja09mZmljZUVudHJpZXM6IG51bGwsXHJcbiAgX2JhY2tPZmZpY2VEcm9wZG93bjogbnVsbCxcclxuICBfYnVzeTogbnVsbCxcclxuICBfZW5kUG9pbnRzOiBudWxsLFxyXG4gIF9maXJzdExvYWQ6IG51bGwsXHJcbiAgX29wZXJhdGluZ0NvbXBhbnlNb2RlbDogbnVsbCxcclxuXHJcbiAgaW5pdEJhY2tPZmZpY2VNb2RlbDogZnVuY3Rpb24gaW5pdEJhY2tPZmZpY2VNb2RlbCgpIHtcclxuICAgIGNvbnN0IG1vZGVsID0gdGhpcy5nZXRNb2RlbChNT0RFTF9OQU1FUy5CQUNLT0ZGSUNFKTtcclxuICAgIGlmIChtb2RlbCkge1xyXG4gICAgICB0aGlzLl9iYWNrT2ZmaWNlTW9kZWwgPSBtb2RlbDtcclxuICAgICAgdGhpcy5fYmFja09mZmljZU1vZGVsLmluaXQoKTtcclxuICAgICAgdGhpcy5nZXRCYWNrT2ZmaWNlRW50cmllcygpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgZ2V0QmFja09mZmljZUVudHJpZXM6IGZ1bmN0aW9uIGdldEJhY2tPZmZpY2VFbnRyaWVzKCkge1xyXG4gICAgY29uc3QgcXVlcnkgPSB0aGlzLl9iYWNrT2ZmaWNlTW9kZWwuZ2V0RW50cmllcyhudWxsLCB7XHJcbiAgICAgIHJldHVyblF1ZXJ5UmVzdWx0czogdHJ1ZSxcclxuICAgICAgcXVlcnlNb2RlbE5hbWU6ICdsaXN0LWFjdGl2ZScsXHJcbiAgICB9KTtcclxuICAgIHdoZW4ocXVlcnksIHRoaXMucHJvY2Vzc0JhY2tPZmZpY2VFbnRyaWVzLmJpbmQodGhpcyksIHRoaXMuX29uUXVlcnlGYWlsdXJlLmJpbmQodGhpcykpO1xyXG4gIH0sXHJcbiAgaW5pdEFjY291bnRpbmdFbnRpdGllc01vZGVsOiBmdW5jdGlvbiBpbml0QWNjb3VudGluZ0VudGl0aWVzTW9kZWwoKSB7XHJcbiAgICBjb25zdCBtb2RlbCA9IHRoaXMuZ2V0TW9kZWwoTU9ERUxfTkFNRVMuQkFDS09GRklDRUFDQ09VTlRJTkdFTlRJVFkpO1xyXG4gICAgaWYgKG1vZGVsKSB7XHJcbiAgICAgIHRoaXMuX2FjY291bnRpbmdFbnRpdHlNb2RlbCA9IG1vZGVsO1xyXG4gICAgICB0aGlzLl9hY2NvdW50aW5nRW50aXR5TW9kZWwuaW5pdCgpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgZ2V0QWNjb3VudGluZ0VudGl0aWVzRW50cmllczogZnVuY3Rpb24gZ2V0QWNjb3VudGluZ0VudGl0aWVzRW50cmllcyhiYWNrT2ZmaWNlS2V5KSB7XHJcbiAgICBpZiAoYmFja09mZmljZUtleSkge1xyXG4gICAgICBpZiAodGhpcy5fYmFja09mZmljZUVudHJpZXMubGVuZ3RoKSB7XHJcbiAgICAgICAgY29uc3QgcXVlcnkgPSB0aGlzLl9hY2NvdW50aW5nRW50aXR5TW9kZWwuZ2V0RW50cmllcyhgQmFja09mZmljZS4ka2V5IGVxIFwiJHtiYWNrT2ZmaWNlS2V5fVwiYCwge1xyXG4gICAgICAgICAgcmV0dXJuUXVlcnlSZXN1bHRzOiB0cnVlLFxyXG4gICAgICAgICAgcXVlcnlNb2RlbE5hbWU6ICdsaXN0JyxcclxuICAgICAgICB9KTtcclxuICAgICAgICB3aGVuKHF1ZXJ5LCB0aGlzLnByb2Nlc3NBY2NvdW50aW5nRW50cmllcy5iaW5kKHRoaXMpLCB0aGlzLl9vblF1ZXJ5RmFpbHVyZS5iaW5kKHRoaXMpKTtcclxuICAgICAgICByZXR1cm47XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIEFwcC5tb2RhbC5kaXNhYmxlQ2xvc2UgPSBmYWxzZTtcclxuICAgIEFwcC5tb2RhbC5yZXNvbHZlRGVmZXJyZWQodHJ1ZSk7XHJcbiAgICBBcHAubW9kYWwuc2hvd1Rvb2xiYXIgPSB0cnVlO1xyXG4gICAgQXBwLm1vZGFsLmNyZWF0ZVNpbXBsZURpYWxvZyh7IHRpdGxlOiAnYWxlcnQnLCBjb250ZW50OiB0aGlzLm5vQmFja09mZmljZXNUZXh0IH0pO1xyXG4gIH0sXHJcbiAgaW5pdEludGVncmF0aW9uTWFwcGluZ01vZGVsOiBmdW5jdGlvbiBpbml0SW50ZWdyYXRpb25NYXBwaW5nTW9kZWwoKSB7XHJcbiAgICBjb25zdCBtb2RlbCA9IHRoaXMuZ2V0TW9kZWwoTU9ERUxfTkFNRVMuT1BFUkFUSU5HQ09NUEFOWSk7XHJcbiAgICBpZiAobW9kZWwpIHtcclxuICAgICAgdGhpcy5fb3BlcmF0aW5nQ29tcGFueU1vZGVsID0gbW9kZWw7XHJcbiAgICAgIHRoaXMuX29wZXJhdGluZ0NvbXBhbnlNb2RlbC5pbml0KCk7XHJcbiAgICB9XHJcbiAgfSxcclxuICAvKipcclxuICAgKiBSZXR1cm5zIGEgbmV3IGluc3RhbmNlIG9mIGEgbW9kZWwgZm9yIHRoZSB2aWV3LlxyXG4gICAqL1xyXG4gIGdldE1vZGVsOiBmdW5jdGlvbiBnZXRNb2RlbChtb2RlbE5hbWUpIHtcclxuICAgIGNvbnN0IG1vZGVsID0gQWRhcHRlci5nZXRNb2RlbChtb2RlbE5hbWUpO1xyXG4gICAgcmV0dXJuIG1vZGVsO1xyXG4gIH0sXHJcbiAgX3Byb21vdGU6IGZ1bmN0aW9uIF9wcm9tb3RlKG9wdGlvbnMsIHNjb3BlKSB7XHJcbiAgICBpZiAob3B0aW9ucyAmJiBzY29wZSkge1xyXG4gICAgICBjb25zdCBlbnRyeSA9IHtcclxuICAgICAgICAkbmFtZTogJ1Byb21vdGVUb0JhY2tPZmZpY2UnLFxyXG4gICAgICAgIHJlcXVlc3Q6IG9wdGlvbnMsXHJcbiAgICAgIH07XHJcbiAgICAgIGNvbnN0IHJlcXVlc3QgPSBuZXcgU2FnZS5TRGF0YS5DbGllbnQuU0RhdGFTZXJ2aWNlT3BlcmF0aW9uUmVxdWVzdChzY29wZS5nZXRTZXJ2aWNlKCkpXHJcbiAgICAgICAgLnNldFJlc291cmNlS2luZCgnYmFja09mZmljZXMnKVxyXG4gICAgICAgIC5zZXRDb250cmFjdE5hbWUoJ2R5bmFtaWMnKVxyXG4gICAgICAgIC5zZXRPcGVyYXRpb25OYW1lKCdQcm9tb3RlVG9CYWNrT2ZmaWNlJyk7XHJcblxyXG4gICAgICByZXF1ZXN0LmV4ZWN1dGUoZW50cnksIHtcclxuICAgICAgICBzdWNjZXNzOiAoKSA9PiB7XHJcbiAgICAgICAgICBjb25zdCB0b2FzdCA9IHtcclxuICAgICAgICAgICAgdGl0bGU6IHRoaXMucHJvbW90aW9uUmVxdWVzdGVkLFxyXG4gICAgICAgICAgICBtZXNzYWdlOiB0aGlzLnByb21vdGlvblRleHQsXHJcbiAgICAgICAgICAgIGljb246IHRoaXMucHJvbW90ZUljb24sXHJcbiAgICAgICAgICB9O1xyXG4gICAgICAgICAgQXBwLnRvYXN0LmFkZCh0b2FzdCk7XHJcbiAgICAgICAgICBzY29wZS5fcmVmcmVzaENsaWNrZWQoKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGZhaWx1cmU6IChlcnIpID0+IHtcclxuICAgICAgICAgIEFwcC50b2FzdC5hZGQoeyB0aXRsZTogJ0Vycm9yJywgbWVzc2FnZTogc3RyaW5nLnN1YnN0aXR1dGUodGhpcy5lcnJvck1lc3NhZ2UsIHsgcmVhc29uOiBlcnIuc3RhdHVzVGV4dCB9KSB9KTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIHNjb3BlOiB0aGlzLFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9LFxyXG4gIHByb21vdGVUb0JhY2tPZmZpY2U6IGZ1bmN0aW9uIF9wcm9tb3RlVG9CYWNrT2ZmaWNlKGVudHJ5LCBlbnRpdHlOYW1lLCBzY29wZSkge1xyXG4gICAgaWYgKCFlbnRyeSB8fCAhZW50aXR5TmFtZSB8fCAhc2NvcGUpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG4gICAgY29uc3QgcmVhZHlUb1Byb21vdGUgPSB0aGlzLmNoZWNrRW50cnlGb3IoZW50cnksIFsnRXJwTG9naWNhbElkJywgJ0VycEFjY291bnRpbmdFbnRpdHlJZCddKTtcclxuICAgIGlmIChyZWFkeVRvUHJvbW90ZSkge1xyXG4gICAgICB0aGlzLl9wcm9tb3RlKHtcclxuICAgICAgICBlbnRpdHlOYW1lLFxyXG4gICAgICAgIGVudGl0eUlkOiBlbnRyeS4ka2V5LFxyXG4gICAgICAgIGxvZ2ljYWxJZDogZW50cnkuRXJwTG9naWNhbElkLFxyXG4gICAgICAgIGFjY291bnRpbmdFbnRpdHlJZDogZW50cnkuRXJwQWNjb3VudGluZ0VudGl0eUlkLFxyXG4gICAgICB9LCBzY29wZSk7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIHRoaXMuZ2V0QWNjb3VudGluZ1N5c3RlbSgpLnRoZW4oKHZhbHVlKSA9PiB7XHJcbiAgICAgIGlmICghdmFsdWUpIHtcclxuICAgICAgICBBcHAubW9kYWwuc2hvd1Rvb2xiYXIgPSB0cnVlO1xyXG4gICAgICAgIGNvbnN0IHRvb2xiYXIgPSBbXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIGFjdGlvbjogJ2NhbmNlbCcsXHJcbiAgICAgICAgICAgIGNsYXNzTmFtZTogJ2J1dHRvbi0tZmxhdCBidXR0b24tLWZsYXQtLXNwbGl0JyxcclxuICAgICAgICAgICAgdGV4dDogdGhpcy5jYW5jZWxUZXh0LFxyXG4gICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICBhY3Rpb246ICdyZXNvbHZlJyxcclxuICAgICAgICAgICAgY2xhc3NOYW1lOiAnYnV0dG9uLS1mbGF0IGJ1dHRvbi0tZmxhdC0tc3BsaXQnLFxyXG4gICAgICAgICAgICB0ZXh0OiB0aGlzLnByb21vdGVUZXh0LFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICBdO1xyXG5cclxuICAgICAgICBBcHAubW9kYWwuYWRkKHRoaXMsIHRvb2xiYXIpLnRoZW4oKGRhdGEpID0+IHtcclxuICAgICAgICAgIHRoaXMuX3Byb21vdGUoe1xyXG4gICAgICAgICAgICBlbnRpdHlOYW1lLFxyXG4gICAgICAgICAgICBlbnRpdHlJZDogZW50cnkuJGtleSxcclxuICAgICAgICAgICAgbG9naWNhbElkOiBkYXRhLkVycExvZ2ljYWxJZCxcclxuICAgICAgICAgICAgYWNjb3VudGluZ0VudGl0eUlkOiBkYXRhLkVycEFjY291bnRpbmdFbnRpdHlJZCxcclxuICAgICAgICAgIH0sIHNjb3BlKTtcclxuICAgICAgICB9KTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zdCBkYXRhID0gdGhpcy5nZXRDb250ZW50KCk7XHJcbiAgICAgICAgdGhpcy5fcHJvbW90ZSh7XHJcbiAgICAgICAgICBlbnRpdHlOYW1lLFxyXG4gICAgICAgICAgZW50aXR5SWQ6IGVudHJ5LiRrZXksXHJcbiAgICAgICAgICBsb2dpY2FsSWQ6IGRhdGEuRXJwTG9naWNhbElkLFxyXG4gICAgICAgICAgYWNjb3VudGluZ0VudGl0eUlkOiBkYXRhLkVycEFjY291bnRpbmdFbnRpdHlJZCxcclxuICAgICAgICB9LCBzY29wZSk7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gIH0sXHJcbiAgcHJvY2Vzc0JhY2tPZmZpY2VFbnRyaWVzOiBmdW5jdGlvbiBwcm9jZXNzQmFja09mZmljZUVudHJpZXMoZW50cmllcykge1xyXG4gICAgdGhpcy5fYmFja09mZmljZUVudHJpZXMgPSBlbnRyaWVzO1xyXG4gICAgdGhpcy5fYmFja09mZmljZVNlbGVjdGlvbnMgPSBbXTtcclxuICAgIHRoaXMuX2JhY2tPZmZpY2VFbnRyaWVzLmZvckVhY2goKGVudHJ5KSA9PiB7XHJcbiAgICAgIHRoaXMuX2JhY2tPZmZpY2VTZWxlY3Rpb25zLnB1c2goe1xyXG4gICAgICAgIHZhbHVlOiBlbnRyeS4ka2V5LFxyXG4gICAgICAgIHRleHQ6IGVudHJ5LkJhY2tPZmZpY2VOYW1lLFxyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gICAgaWYgKHRoaXMuX2JhY2tPZmZpY2VTZWxlY3Rpb25zWzBdKSB7XHJcbiAgICAgIHRoaXMuZ2V0QWNjb3VudGluZ0VudGl0aWVzRW50cmllcyh0aGlzLl9iYWNrT2ZmaWNlU2VsZWN0aW9uc1swXS52YWx1ZSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmdldEFjY291bnRpbmdFbnRpdGllc0VudHJpZXMobnVsbCk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBwcm9jZXNzQWNjb3VudGluZ0VudHJpZXM6IGZ1bmN0aW9uIHByb2Nlc3NBY2NvdW50aW5nRW50cmllcyhlbnRyaWVzKSB7XHJcbiAgICB0aGlzLl9hY2NvdW50aW5nRW50aXRpZXNFbnRyaWVzID0gZW50cmllcztcclxuICAgIHRoaXMuX2FjY291bnRpbmdTZWxlY3Rpb25zID0gW107XHJcbiAgICB0aGlzLl9hY2NvdW50aW5nRW50aXRpZXNFbnRyaWVzLmZvckVhY2goKGVudHJ5KSA9PiB7XHJcbiAgICAgIHRoaXMuX2FjY291bnRpbmdTZWxlY3Rpb25zLnB1c2goe1xyXG4gICAgICAgIHZhbHVlOiBlbnRyeS4ka2V5LFxyXG4gICAgICAgIHRleHQ6IGVudHJ5Lk5hbWUsXHJcbiAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgICBpZiAodGhpcy5fZmlyc3RMb2FkKSB7XHJcbiAgICAgIHRoaXMuY3JlYXRlQmFja09mZmljZURyb3Bkb3duKCk7XHJcbiAgICAgIHRoaXMuY3JlYXRlQWNjb3VudGluZ0Ryb3Bkb3duKCk7XHJcbiAgICAgIGlmICh0aGlzLl9iYWNrT2ZmaWNlU2VsZWN0aW9ucy5sZW5ndGggIT09IDEgfHwgdGhpcy5fYWNjb3VudGluZ1NlbGVjdGlvbnMubGVuZ3RoICE9PSAxKSB7XHJcbiAgICAgICAgdGhpcy5fZmlyc3RMb2FkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5fYnVzeS5jb21wbGV0ZSgpO1xyXG4gICAgICAgIEFwcC5tb2RhbC5kaXNhYmxlQ2xvc2UgPSBmYWxzZTtcclxuICAgICAgICBBcHAubW9kYWwucmVzb2x2ZURlZmVycmVkKHRydWUpO1xyXG4gICAgICAgIHRoaXMuX2FjY291bnRpbmdEZWZlcnJlZC5yZXNvbHZlKGZhbHNlKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICAvLyBQcm9tb3RlIEFjY291bnQgd2l0aCBlbnRpdGllcyBpbiBiYWNrb2ZmaWNlcyBhbmQgYWNjb3VudGluZ0VudGl0aWVzXHJcbiAgICAgICAgdGhpcy5fYnVzeS5jb21wbGV0ZSgpO1xyXG4gICAgICAgIEFwcC5tb2RhbC5kaXNhYmxlQ2xvc2UgPSBmYWxzZTtcclxuICAgICAgICBBcHAubW9kYWwucmVzb2x2ZURlZmVycmVkKHRydWUpO1xyXG4gICAgICAgIHRoaXMuX2FjY291bnRpbmdEZWZlcnJlZC5yZXNvbHZlKHRydWUpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmNyZWF0ZUFjY291bnRpbmdEcm9wZG93bigpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgX29uUXVlcnlGYWlsdXJlOiBmdW5jdGlvbiBfb25RdWVyeUZhaWx1cmUoZXJyKSB7XHJcbiAgICBBcHAubW9kYWwuaGlkZSgpO1xyXG4gICAgdGhpcy5jcmVhdGVBbGVydERpYWxvZyhlcnIpO1xyXG4gICAgY29uc29sZS5lcnJvcihlcnIpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXHJcbiAgfSxcclxuICBjaGVja0VudHJ5Rm9yOiBmdW5jdGlvbiBjaGVja0VudHJ5Rm9yKGVudHJ5LCBwcm9wZXJ0aWVzID0gW10pIHtcclxuICAgIGxldCBoYXNBbGxQcm9wZXJ0aWVzID0gdHJ1ZTtcclxuICAgIHByb3BlcnRpZXMuZm9yRWFjaCgocHJvcGVydHkpID0+IHtcclxuICAgICAgaWYgKCFlbnRyeVtwcm9wZXJ0eV0pIHtcclxuICAgICAgICBoYXNBbGxQcm9wZXJ0aWVzID0gZmFsc2U7XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGhhc0FsbFByb3BlcnRpZXM7XHJcbiAgfSxcclxuICBjbGVhckxvYWRpbmc6IGZ1bmN0aW9uIGNsZWFyTG9hZGluZyhub2RlKSB7XHJcbiAgICAkKG5vZGUpLmVtcHR5KCk7XHJcbiAgfSxcclxuICBjcmVhdGVBbGVydERpYWxvZzogZnVuY3Rpb24gY3JlYXRlQWxlcnREaWFsb2coZXJyKSB7XHJcbiAgICB0aGlzLl9idXN5LmNvbXBsZXRlKHRydWUpO1xyXG4gICAgQXBwLm1vZGFsLmRpc2FibGVDbG9zZSA9IGZhbHNlO1xyXG4gICAgQXBwLm1vZGFsLnNob3dUb29sYmFyID0gdHJ1ZTtcclxuICAgIEFwcC5tb2RhbC5yZXNvbHZlRGVmZXJyZWQodHJ1ZSk7XHJcbiAgICByZXR1cm4gQXBwLm1vZGFsLmNyZWF0ZVNpbXBsZURpYWxvZyh7IHRpdGxlOiAnYWxlcnQnLCBjb250ZW50OiBlcnIsIGdldENvbnRlbnQ6ICgpID0+IHsgcmV0dXJuOyB9LCBsZWZ0QnV0dG9uOiAnY2FuY2VsJywgcmlnaHRCdXR0b246ICdjb25maXJtJyB9KTtcclxuICB9LFxyXG4gIGNyZWF0ZUFjY291bnRpbmdEcm9wZG93bjogZnVuY3Rpb24gY3JlYXRlQWNjb3VudGluZ0Ryb3Bkb3duKCkge1xyXG4gICAgaWYgKHRoaXMuX2FjY291bnRpbmdEcm9wZG93bikge1xyXG4gICAgICB0aGlzLmNsZWFyTG9hZGluZyh0aGlzLmFjY291bnRpbmdOb2RlKTtcclxuICAgICAgdGhpcy5fYWNjb3VudGluZ0Ryb3Bkb3duLmRlc3Ryb3koKTtcclxuICAgIH1cclxuICAgIHRoaXMuX2FjY291bnRpbmdEcm9wZG93biA9IG5ldyBEcm9wZG93bih7IGlkOiAnYWNjb3VudGluZ0Ryb3Bkb3duJywgZHJvcGRvd25DbGFzczogJ3Byb21vdGVfX2Ryb3Bkb3duJyB9KTtcclxuICAgIHRoaXMuX2FjY291bnRpbmdEcm9wZG93bi5jcmVhdGVMaXN0KHsgaXRlbXM6IHRoaXMuX2FjY291bnRpbmdTZWxlY3Rpb25zLCBkZWZhdWx0VmFsdWU6IHRoaXMuX2FjY291bnRpbmdTZWxlY3Rpb25zWzBdID8gdGhpcy5fYWNjb3VudGluZ1NlbGVjdGlvbnNbMF0udmFsdWUgOiAnJyB9KTsgLy8gVE9ETzogY2hhbmdlIHRoZSBkZWZhdWx0VmFsdWUgc2VsZWN0ZWRcclxuICAgICQodGhpcy5hY2NvdW50aW5nTm9kZSkuYXBwZW5kKHRoaXMuX2FjY291bnRpbmdEcm9wZG93bi5kb21Ob2RlKTtcclxuICAgIHJldHVybiB0aGlzO1xyXG4gIH0sXHJcbiAgY3JlYXRlQmFja09mZmljZURyb3Bkb3duOiBmdW5jdGlvbiBjcmVhdGVCYWNrT2ZmaWNlRHJvcGRvd24oKSB7XHJcbiAgICBpZiAoIXRoaXMuX2JhY2tPZmZpY2VEcm9wZG93bikge1xyXG4gICAgICB0aGlzLl9iYWNrT2ZmaWNlRHJvcGRvd24gPSBuZXcgRHJvcGRvd24oeyBpZDogJ2JhY2tPZmZpY2VEcm9wZG93bicsIGRyb3Bkb3duQ2xhc3M6ICdwcm9tb3RlX19kcm9wZG93bicsIG9uU2VsZWN0OiB0aGlzLnVwZGF0ZUFjY291bnRpbmdEcm9wZG93biwgb25TZWxlY3RTY29wZTogdGhpcyB9KTtcclxuICAgICAgdGhpcy5fYmFja09mZmljZURyb3Bkb3duLmNyZWF0ZUxpc3QoeyBpdGVtczogdGhpcy5fYmFja09mZmljZVNlbGVjdGlvbnMsIGRlZmF1bHRWYWx1ZTogdGhpcy5fYmFja09mZmljZVNlbGVjdGlvbnNbMF0gPyB0aGlzLl9iYWNrT2ZmaWNlU2VsZWN0aW9uc1swXS52YWx1ZSA6ICcnIH0pOyAvLyBUT0RPOiBjaGFuZ2UgdGhlIGRlZmF1bHRWYWx1ZSBzZWxlY3RlZFxyXG4gICAgICAkKHRoaXMuYmFja09mZmljZU5vZGUpLmFwcGVuZCh0aGlzLl9iYWNrT2ZmaWNlRHJvcGRvd24uZG9tTm9kZSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9LFxyXG4gIGdldEFjY291bnRpbmdTeXN0ZW06IGZ1bmN0aW9uIGdldEFjY291bnRpbmdTeXN0ZW0oKSB7XHJcbiAgICBpZiAoIXRoaXMuX2J1c3kpIHtcclxuICAgICAgdGhpcy5fYnVzeSA9IG5ldyBCdXN5SW5kaWNhdG9yKHsgaWQ6IGAke3RoaXMuaWR9X19idXN5SW5kaWNhdG9yYCB9KTtcclxuICAgICAgdGhpcy5fYWNjb3VudGluZ0J1c3kgPSBuZXcgQnVzeUluZGljYXRvcih7IGlkOiBgJHt0aGlzLmlkfV9fYnVzeUluZGljYXRvcl9fYWNjb3VudGluZ2AsIHNpemU6ICdzbWFsbCcsIGxhYmVsOiBudWxsLCBjb250YWluZXJDbGFzczogJ2J1c3lGaWVsZCcgfSk7XHJcbiAgICAgIHRoaXMuX2FjY291bnRpbmdCdXN5LnN0YXJ0KCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLl9maXJzdExvYWQgPSB0cnVlO1xyXG4gICAgQXBwLm1vZGFsLnNob3dUb29sYmFyID0gZmFsc2U7XHJcbiAgICBBcHAubW9kYWwuZGlzYWJsZUNsb3NlID0gdHJ1ZTtcclxuICAgIEFwcC5tb2RhbC5hZGQodGhpcy5fYnVzeSk7XHJcbiAgICB0aGlzLl9idXN5LnN0YXJ0KCk7XHJcbiAgICB0aGlzLl9hY2NvdW50aW5nRGVmZXJyZWQgPSBuZXcgRGVmZXJyZWQoKTtcclxuICAgIHRoaXMuaW5pdEJhY2tPZmZpY2VNb2RlbCgpO1xyXG4gICAgdGhpcy5pbml0SW50ZWdyYXRpb25NYXBwaW5nTW9kZWwoKTtcclxuICAgIHRoaXMuaW5pdEFjY291bnRpbmdFbnRpdGllc01vZGVsKCk7XHJcbiAgICByZXR1cm4gdGhpcy5fYWNjb3VudGluZ0RlZmVycmVkLnByb21pc2U7XHJcbiAgfSxcclxuICBnZXRDb250ZW50OiBmdW5jdGlvbiBnZXRDb250ZW50KCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgRXJwTG9naWNhbElkOiB0aGlzLl9iYWNrT2ZmaWNlRW50cmllcy5maW5kKCh2YWx1ZSkgPT4ge1xyXG4gICAgICAgIHJldHVybiB2YWx1ZS4ka2V5ID09PSB0aGlzLl9iYWNrT2ZmaWNlRHJvcGRvd24uZ2V0VmFsdWUoKTtcclxuICAgICAgfSkuTG9naWNhbElkLFxyXG4gICAgICBFcnBBY2NvdW50aW5nRW50aXR5SWQ6IHRoaXMuX2FjY291bnRpbmdFbnRpdGllc0VudHJpZXMuZmluZCgodmFsdWUpID0+IHtcclxuICAgICAgICByZXR1cm4gdmFsdWUuJGtleSA9PT0gdGhpcy5fYWNjb3VudGluZ0Ryb3Bkb3duLmdldFZhbHVlKCk7XHJcbiAgICAgIH0pLkFjY3RFbnRpdHlFeHRJZCxcclxuICAgIH07XHJcbiAgfSxcclxuICBzZXRMb2FkaW5nOiBmdW5jdGlvbiBzZXRMb2FkaW5nKG5vZGUpIHtcclxuICAgICQobm9kZSkuZW1wdHkoKS5hcHBlbmQodGhpcy5fYWNjb3VudGluZ0J1c3kuZG9tTm9kZSk7XHJcbiAgfSxcclxuICBzaG93OiBmdW5jdGlvbiBzaG93KCkge1xyXG4gICAgaWYgKCF0aGlzLl9iYWNrT2ZmaWNlTW9kZWwpIHtcclxuICAgICAgdGhpcy5nZXRBY2NvdW50aW5nU3lzdGVtKCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9LFxyXG4gIHVwZGF0ZUFjY291bnRpbmdEcm9wZG93bjogZnVuY3Rpb24gdXBkYXRlQWNjb3VudGluZ0Ryb3Bkb3duKCkge1xyXG4gICAgdGhpcy5zZXRMb2FkaW5nKHRoaXMuYWNjb3VudGluZ05vZGUpO1xyXG4gICAgdGhpcy5nZXRBY2NvdW50aW5nRW50aXRpZXNFbnRyaWVzKHRoaXMuX2JhY2tPZmZpY2VEcm9wZG93bi5nZXRWYWx1ZSgpKTtcclxuICB9LFxyXG4gIHRyYW5zaXRpb25Bd2F5OiBmdW5jdGlvbiB0cmFuc2l0aW9uQXdheSgpIHtcclxuICAgIC8vIGZvcmNlIHNvaG8gZHJvcGRvd24gdG8gY2xvc2Ugc2luY2UgdGhleSBkb250IGNsb3NlIG9uIGEgYnV0dG9uIGNsaWNrIGVsc2V3aGVyZSBvbiBVSVxyXG4gICAgJCh0aGlzLl9iYWNrT2ZmaWNlRHJvcGRvd24uZHJvcGRvd25TZWxlY3QpLmRhdGEoJ2Ryb3Bkb3duJykuY2xvc2UoKTtcclxuICAgICQodGhpcy5fYWNjb3VudGluZ0Ryb3Bkb3duLmRyb3Bkb3duU2VsZWN0KS5kYXRhKCdkcm9wZG93bicpLmNsb3NlKCk7XHJcbiAgICB0aGlzLmluaGVyaXRlZChhcmd1bWVudHMpO1xyXG4gIH0sXHJcbn0pO1xyXG5cclxubGFuZy5zZXRPYmplY3QoJ2ljYm9lLlByb21vdGUnLCBfX2NsYXNzKTtcclxuZXhwb3J0IGRlZmF1bHQgX19jbGFzcztcclxuIl19
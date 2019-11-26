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
      this.inherited(transitionAway, arguments);
    }
  });

  _lang2.default.setObject('icboe.Promote', __class);
  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQk9FL1Byb21vdGUuanMiXSwibmFtZXMiOlsicmVzb3VyY2UiLCJfX2NsYXNzIiwid2lkZ2V0VGVtcGxhdGUiLCJTaW1wbGF0ZSIsInByb21vdGVUaXRsZSIsInNlYXJjaFJlc3VsdHMiLCJtdWx0aVN5c3RlbURldGVjdGVkIiwiY3JlYXRlTGluayIsImJhY2tPZmZpY2UiLCJhY2NvdW50aW5nRW50aXR5IiwiY2FuY2VsVGV4dCIsInByb21vdGVUZXh0Iiwibm9CYWNrT2ZmaWNlc1RleHQiLCJwcm9tb3Rpb25SZXF1ZXN0ZWQiLCJwcm9tb3Rpb25UZXh0IiwiZXJyb3JNZXNzYWdlIiwicHJvbW90ZUljb24iLCJfYWNjb3VudGluZ0RlZmVycmVkIiwiX2FjY291bnRpbmdEcm9wZG93biIsIl9hY2NvdW50aW5nQnVzeSIsIl9hY2NvdW50aW5nU2VsZWN0aW9ucyIsIl9hY2NvdW50aW5nRW50aXRpZXNFbnRyaWVzIiwiX2JhY2tPZmZpY2VTZWxlY3Rpb25zIiwiX2JhY2tPZmZpY2VFbnRyaWVzIiwiX2JhY2tPZmZpY2VEcm9wZG93biIsIl9idXN5IiwiX2VuZFBvaW50cyIsIl9maXJzdExvYWQiLCJfb3BlcmF0aW5nQ29tcGFueU1vZGVsIiwiaW5pdEJhY2tPZmZpY2VNb2RlbCIsIm1vZGVsIiwiZ2V0TW9kZWwiLCJCQUNLT0ZGSUNFIiwiX2JhY2tPZmZpY2VNb2RlbCIsImluaXQiLCJnZXRCYWNrT2ZmaWNlRW50cmllcyIsInF1ZXJ5IiwiZ2V0RW50cmllcyIsInJldHVyblF1ZXJ5UmVzdWx0cyIsInF1ZXJ5TW9kZWxOYW1lIiwicHJvY2Vzc0JhY2tPZmZpY2VFbnRyaWVzIiwiYmluZCIsIl9vblF1ZXJ5RmFpbHVyZSIsImluaXRBY2NvdW50aW5nRW50aXRpZXNNb2RlbCIsIkJBQ0tPRkZJQ0VBQ0NPVU5USU5HRU5USVRZIiwiX2FjY291bnRpbmdFbnRpdHlNb2RlbCIsImdldEFjY291bnRpbmdFbnRpdGllc0VudHJpZXMiLCJiYWNrT2ZmaWNlS2V5IiwibGVuZ3RoIiwicHJvY2Vzc0FjY291bnRpbmdFbnRyaWVzIiwiQXBwIiwibW9kYWwiLCJkaXNhYmxlQ2xvc2UiLCJyZXNvbHZlRGVmZXJyZWQiLCJzaG93VG9vbGJhciIsImNyZWF0ZVNpbXBsZURpYWxvZyIsInRpdGxlIiwiY29udGVudCIsImluaXRJbnRlZ3JhdGlvbk1hcHBpbmdNb2RlbCIsIk9QRVJBVElOR0NPTVBBTlkiLCJtb2RlbE5hbWUiLCJfcHJvbW90ZSIsIm9wdGlvbnMiLCJzY29wZSIsImVudHJ5IiwiJG5hbWUiLCJyZXF1ZXN0IiwiU2FnZSIsIlNEYXRhIiwiQ2xpZW50IiwiU0RhdGFTZXJ2aWNlT3BlcmF0aW9uUmVxdWVzdCIsImdldFNlcnZpY2UiLCJzZXRSZXNvdXJjZUtpbmQiLCJzZXRDb250cmFjdE5hbWUiLCJzZXRPcGVyYXRpb25OYW1lIiwiZXhlY3V0ZSIsInN1Y2Nlc3MiLCJ0b2FzdCIsIm1lc3NhZ2UiLCJpY29uIiwiYWRkIiwiX3JlZnJlc2hDbGlja2VkIiwiZmFpbHVyZSIsImVyciIsInN1YnN0aXR1dGUiLCJyZWFzb24iLCJzdGF0dXNUZXh0IiwicHJvbW90ZVRvQmFja09mZmljZSIsIl9wcm9tb3RlVG9CYWNrT2ZmaWNlIiwiZW50aXR5TmFtZSIsInJlYWR5VG9Qcm9tb3RlIiwiY2hlY2tFbnRyeUZvciIsImVudGl0eUlkIiwiJGtleSIsImxvZ2ljYWxJZCIsIkVycExvZ2ljYWxJZCIsImFjY291bnRpbmdFbnRpdHlJZCIsIkVycEFjY291bnRpbmdFbnRpdHlJZCIsImdldEFjY291bnRpbmdTeXN0ZW0iLCJ0aGVuIiwidmFsdWUiLCJ0b29sYmFyIiwiYWN0aW9uIiwiY2xhc3NOYW1lIiwidGV4dCIsImRhdGEiLCJnZXRDb250ZW50IiwiZW50cmllcyIsImZvckVhY2giLCJwdXNoIiwiQmFja09mZmljZU5hbWUiLCJOYW1lIiwiY3JlYXRlQmFja09mZmljZURyb3Bkb3duIiwiY3JlYXRlQWNjb3VudGluZ0Ryb3Bkb3duIiwiY29tcGxldGUiLCJyZXNvbHZlIiwiaGlkZSIsImNyZWF0ZUFsZXJ0RGlhbG9nIiwiY29uc29sZSIsImVycm9yIiwicHJvcGVydGllcyIsImhhc0FsbFByb3BlcnRpZXMiLCJwcm9wZXJ0eSIsImNsZWFyTG9hZGluZyIsIm5vZGUiLCIkIiwiZW1wdHkiLCJsZWZ0QnV0dG9uIiwicmlnaHRCdXR0b24iLCJhY2NvdW50aW5nTm9kZSIsImRlc3Ryb3kiLCJpZCIsImRyb3Bkb3duQ2xhc3MiLCJjcmVhdGVMaXN0IiwiaXRlbXMiLCJkZWZhdWx0VmFsdWUiLCJhcHBlbmQiLCJkb21Ob2RlIiwib25TZWxlY3QiLCJ1cGRhdGVBY2NvdW50aW5nRHJvcGRvd24iLCJvblNlbGVjdFNjb3BlIiwiYmFja09mZmljZU5vZGUiLCJzaXplIiwibGFiZWwiLCJjb250YWluZXJDbGFzcyIsInN0YXJ0IiwicHJvbWlzZSIsImZpbmQiLCJnZXRWYWx1ZSIsIkxvZ2ljYWxJZCIsIkFjY3RFbnRpdHlFeHRJZCIsInNldExvYWRpbmciLCJzaG93IiwidHJhbnNpdGlvbkF3YXkiLCJkcm9wZG93blNlbGVjdCIsImNsb3NlIiwiaW5oZXJpdGVkIiwiYXJndW1lbnRzIiwic2V0T2JqZWN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7QUE2QkEsTUFBTUEsV0FBVyxvQkFBWSxTQUFaLENBQWpCOztBQUVBOzs7QUFHQSxNQUFNQyxVQUFVLHVCQUFRLDhCQUFSLEVBQXdDLHVDQUF4QyxFQUErRCwwQ0FBMEM7QUFDdkhDLG9CQUFnQixJQUFJQyxRQUFKLENBQWEsQ0FDM0IsbUVBRDJCLEVBRTNCLCtEQUYyQixFQUczQixnRUFIMkIsRUFJM0Isa0VBSjJCLEVBSzNCLDZEQUwyQixFQU0zQixnQ0FOMkIsRUFPM0IsNEJBUDJCLEVBUTNCLGdFQVIyQixFQVMzQixxREFUMkIsRUFVM0IsUUFWMkIsRUFXM0IsNEJBWDJCLEVBWTNCLHNFQVoyQixFQWEzQixxREFiMkIs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QUNyRSxpQkFBT0EsTUFBTVAsSUFBTixLQUFlLE9BQUszRSxtQkFBTCxDQUF5QmtJLFFBQXpCLEVBQXRCO0FBQ0QsU0FGc0IsRUFFcEJFO0FBTkUsT0FBUDtBQVFELEtBL1JzSDtBQWdTdkhDLGdCQUFZLFNBQVNBLFVBQVQsQ0FBb0IzQixJQUFwQixFQUEwQjtBQUNwQ0MsUUFBRUQsSUFBRixFQUFRRSxLQUFSLEdBQWdCVSxNQUFoQixDQUF1QixLQUFLckgsZUFBTCxDQUFxQnNILE9BQTVDO0FBQ0QsS0FsU3NIO0FBbVN2SGUsVUFBTSxTQUFTQSxJQUFULEdBQWdCO0FBQ3BCLFVBQUksQ0FBQyxLQUFLdkgsZ0JBQVYsRUFBNEI7QUFDMUIsYUFBS2lFLG1CQUFMO0FBQ0Q7QUFDRCxhQUFPLElBQVA7QUFDRCxLQXhTc0g7QUF5U3ZIeUMsOEJBQTBCLFNBQVNBLHdCQUFULEdBQW9DO0FBQzVELFdBQUtZLFVBQUwsQ0FBZ0IsS0FBS3RCLGNBQXJCO0FBQ0EsV0FBS25GLDRCQUFMLENBQWtDLEtBQUt0QixtQkFBTCxDQUF5QjRILFFBQXpCLEVBQWxDO0FBQ0QsS0E1U3NIO0FBNlN2SEssb0JBQWdCLFNBQVNBLGNBQVQsR0FBMEI7QUFDeEM7QUFDQTVCLFFBQUUsS0FBS3JHLG1CQUFMLENBQXlCa0ksY0FBM0IsRUFBMkNqRCxJQUEzQyxDQUFnRCxVQUFoRCxFQUE0RGtELEtBQTVEO0FBQ0E5QixRQUFFLEtBQUszRyxtQkFBTCxDQUF5QndJLGNBQTNCLEVBQTJDakQsSUFBM0MsQ0FBZ0QsVUFBaEQsRUFBNERrRCxLQUE1RDtBQUNBLFdBQUtDLFNBQUwsQ0FBZUgsY0FBZixFQUErQkksU0FBL0I7QUFDRDtBQWxUc0gsR0FBekcsQ0FBaEI7O0FBcVRBLGlCQUFLQyxTQUFMLENBQWUsZUFBZixFQUFnQzdKLE9BQWhDO29CQUNlQSxPIiwiZmlsZSI6IlByb21vdGUuanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IDIwMTcgSW5mb3JcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG5pbXBvcnQgZGVjbGFyZSBmcm9tICdkb2pvL19iYXNlL2RlY2xhcmUnO1xyXG5pbXBvcnQgbGFuZyBmcm9tICdkb2pvL19iYXNlL2xhbmcnO1xyXG5pbXBvcnQgc3RyaW5nIGZyb20gJ2Rvam8vc3RyaW5nJztcclxuaW1wb3J0IHdoZW4gZnJvbSAnZG9qby93aGVuJztcclxuaW1wb3J0IEFkYXB0ZXIgZnJvbSAnYXJnb3MvTW9kZWxzL0FkYXB0ZXInO1xyXG5pbXBvcnQgQnVzeUluZGljYXRvciBmcm9tICdhcmdvcy9EaWFsb2dzL0J1c3lJbmRpY2F0b3InO1xyXG5pbXBvcnQgRGVmZXJyZWQgZnJvbSAnZG9qby9EZWZlcnJlZCc7XHJcbmltcG9ydCBEcm9wZG93biBmcm9tICdhcmdvcy9Ecm9wZG93bic7XHJcbmltcG9ydCBfV2lkZ2V0IGZyb20gJ2Rpaml0L19XaWRnZXQnO1xyXG5pbXBvcnQgX1RlbXBsYXRlZCBmcm9tICdhcmdvcy9fVGVtcGxhdGVkJztcclxuaW1wb3J0IE1PREVMX05BTUVTIGZyb20gJy4vTW9kZWxzL05hbWVzJztcclxuaW1wb3J0IGdldFJlc291cmNlIGZyb20gJ2FyZ29zL0kxOG4nO1xyXG5cclxuXHJcbmNvbnN0IHJlc291cmNlID0gZ2V0UmVzb3VyY2UoJ3Byb21vdGUnKTtcclxuXHJcbi8qKlxyXG4gKiBAY2xhc3MgY3JtLkludGVncmF0aW9ucy5CT0UuUHJvbW90ZVxyXG4gKi9cclxuY29uc3QgX19jbGFzcyA9IGRlY2xhcmUoJ2NybS5JbnRlZ3JhdGlvbnMuQk9FLlByb21vdGUnLCBbX1dpZGdldCwgX1RlbXBsYXRlZF0sIC8qKiBAbGVuZHMgY3JtLkludGVncmF0aW9ucy5CT0UuUHJvbW90ZSAqL3tcclxuICB3aWRnZXRUZW1wbGF0ZTogbmV3IFNpbXBsYXRlKFtcclxuICAgICc8ZGl2IGNsYXNzPVwibW9kYWxfX2NvbnRlbnRcIiBkYXRhLWRvam8tYXR0YWNoLXBvaW50PVwicHJvbW90ZU5vZGVcIj4nLFxyXG4gICAgJzxkaXYgY2xhc3M9XCJtb2RhbF9faGVhZGVyX190aXRsZVwiPnslOiAkLnByb21vdGVUaXRsZSAlfTwvZGl2PicsXHJcbiAgICAnPGRpdiBjbGFzcz1cIm1vZGFsX19oZWFkZXJfX3RpdGxlXCI+eyU6ICQuc2VhcmNoUmVzdWx0cyAlfTwvZGl2PicsXHJcbiAgICAnPHAgY2xhc3M9XCJtb2RhbF9fY29udGVudF9fdGV4dFwiPnslOiAkLm11bHRpU3lzdGVtRGV0ZWN0ZWQgJX08L3A+JyxcclxuICAgICc8ZGl2IGNsYXNzPVwibW9kYWxfX2hlYWRlcl9fdGl0bGVcIj57JTogJC5jcmVhdGVMaW5rICV9PC9kaXY+JyxcclxuICAgICc8ZGl2IGNsYXNzPVwicHJvbW90ZV9fb3B0aW9uc1wiPicsXHJcbiAgICAnPGRpdiBjbGFzcz1cInByb21vdGVfX3Jvd1wiPicsXHJcbiAgICAnPGxhYmVsIGNsYXNzPVwicHJvbW90ZV9fcm93X19sYWJlbFwiPnslOiAkLmJhY2tPZmZpY2UgJX08L2xhYmVsPicsXHJcbiAgICAnPGRpdiBkYXRhLWRvam8tYXR0YWNoLXBvaW50PVwiYmFja09mZmljZU5vZGVcIj48L2Rpdj4nLFxyXG4gICAgJzwvZGl2PicsXHJcbiAgICAnPGRpdiBjbGFzcz1cInByb21vdGVfX3Jvd1wiPicsXHJcbiAgICAnPGxhYmVsIGNsYXNzPVwicHJvbW90ZV9fcm93X19sYWJlbFwiPnslOiAkLmFjY291bnRpbmdFbnRpdHkgJX08L2xhYmVsPicsXHJcbiAgICAnPGRpdiBkYXRhLWRvam8tYXR0YWNoLXBvaW50PVwiYWNjb3VudGluZ05vZGVcIj48L2Rpdj4nLFxyXG4gICAgJzwvZGl2PicsXHJcbiAgICAnPC9kaXY+JyxcclxuICAgICc8L2Rpdj4nLFxyXG4gIF0pLFxyXG5cclxuICBwcm9tb3RlVGl0bGU6IHJlc291cmNlLnByb21vdGVUaXRsZSxcclxuICBzZWFyY2hSZXN1bHRzOiByZXNvdXJjZS5zZWFyY2hSZXN1bHRzLFxyXG4gIG11bHRpU3lzdGVtRGV0ZWN0ZWQ6IHJlc291cmNlLm11bHRpU3lzdGVtRGV0ZWN0ZWQsXHJcbiAgY3JlYXRlTGluazogcmVzb3VyY2UuY3JlYXRlTGluayxcclxuICBiYWNrT2ZmaWNlOiByZXNvdXJjZS5iYWNrT2ZmaWNlLFxyXG4gIGFjY291bnRpbmdFbnRpdHk6IHJlc291cmNlLmFjY291bnRpbmdFbnRpdHksXHJcbiAgY2FuY2VsVGV4dDogcmVzb3VyY2UuY2FuY2VsVGV4dCxcclxuICBwcm9tb3RlVGV4dDogcmVzb3VyY2UucHJvbW90ZVRleHQsXHJcbiAgbm9CYWNrT2ZmaWNlc1RleHQ6IHJlc291cmNlLm5vQmFja09mZmljZXNUZXh0LFxyXG4gIHByb21vdGlvblJlcXVlc3RlZDogcmVzb3VyY2UucHJvbW90aW9uUmVxdWVzdGVkLFxyXG4gIHByb21vdGlvblRleHQ6IHJlc291cmNlLnByb21vdGlvblRleHQsXHJcbiAgZXJyb3JNZXNzYWdlOiByZXNvdXJjZS5lcnJvck1lc3NhZ2UsXHJcbiAgcHJvbW90ZUljb246ICd1cGxvYWQnLFxyXG5cclxuICBfYWNjb3VudGluZ0RlZmVycmVkOiBudWxsLFxyXG4gIF9hY2NvdW50aW5nRHJvcGRvd246IG51bGwsXHJcbiAgX2FjY291bnRpbmdCdXN5OiBudWxsLFxyXG4gIF9hY2NvdW50aW5nU2VsZWN0aW9uczogbnVsbCxcclxuICBfYWNjb3VudGluZ0VudGl0aWVzRW50cmllczogbnVsbCxcclxuICBfYmFja09mZmljZVNlbGVjdGlvbnM6IG51bGwsXHJcbiAgX2JhY2tPZmZpY2VFbnRyaWVzOiBudWxsLFxyXG4gIF9iYWNrT2ZmaWNlRHJvcGRvd246IG51bGwsXHJcbiAgX2J1c3k6IG51bGwsXHJcbiAgX2VuZFBvaW50czogbnVsbCxcclxuICBfZmlyc3RMb2FkOiBudWxsLFxyXG4gIF9vcGVyYXRpbmdDb21wYW55TW9kZWw6IG51bGwsXHJcblxyXG4gIGluaXRCYWNrT2ZmaWNlTW9kZWw6IGZ1bmN0aW9uIGluaXRCYWNrT2ZmaWNlTW9kZWwoKSB7XHJcbiAgICBjb25zdCBtb2RlbCA9IHRoaXMuZ2V0TW9kZWwoTU9ERUxfTkFNRVMuQkFDS09GRklDRSk7XHJcbiAgICBpZiAobW9kZWwpIHtcclxuICAgICAgdGhpcy5fYmFja09mZmljZU1vZGVsID0gbW9kZWw7XHJcbiAgICAgIHRoaXMuX2JhY2tPZmZpY2VNb2RlbC5pbml0KCk7XHJcbiAgICAgIHRoaXMuZ2V0QmFja09mZmljZUVudHJpZXMoKTtcclxuICAgIH1cclxuICB9LFxyXG4gIGdldEJhY2tPZmZpY2VFbnRyaWVzOiBmdW5jdGlvbiBnZXRCYWNrT2ZmaWNlRW50cmllcygpIHtcclxuICAgIGNvbnN0IHF1ZXJ5ID0gdGhpcy5fYmFja09mZmljZU1vZGVsLmdldEVudHJpZXMobnVsbCwge1xyXG4gICAgICByZXR1cm5RdWVyeVJlc3VsdHM6IHRydWUsXHJcbiAgICAgIHF1ZXJ5TW9kZWxOYW1lOiAnbGlzdC1hY3RpdmUnLFxyXG4gICAgfSk7XHJcbiAgICB3aGVuKHF1ZXJ5LCB0aGlzLnByb2Nlc3NCYWNrT2ZmaWNlRW50cmllcy5iaW5kKHRoaXMpLCB0aGlzLl9vblF1ZXJ5RmFpbHVyZS5iaW5kKHRoaXMpKTtcclxuICB9LFxyXG4gIGluaXRBY2NvdW50aW5nRW50aXRpZXNNb2RlbDogZnVuY3Rpb24gaW5pdEFjY291bnRpbmdFbnRpdGllc01vZGVsKCkge1xyXG4gICAgY29uc3QgbW9kZWwgPSB0aGlzLmdldE1vZGVsKE1PREVMX05BTUVTLkJBQ0tPRkZJQ0VBQ0NPVU5USU5HRU5USVRZKTtcclxuICAgIGlmIChtb2RlbCkge1xyXG4gICAgICB0aGlzLl9hY2NvdW50aW5nRW50aXR5TW9kZWwgPSBtb2RlbDtcclxuICAgICAgdGhpcy5fYWNjb3VudGluZ0VudGl0eU1vZGVsLmluaXQoKTtcclxuICAgIH1cclxuICB9LFxyXG4gIGdldEFjY291bnRpbmdFbnRpdGllc0VudHJpZXM6IGZ1bmN0aW9uIGdldEFjY291bnRpbmdFbnRpdGllc0VudHJpZXMoYmFja09mZmljZUtleSkge1xyXG4gICAgaWYgKGJhY2tPZmZpY2VLZXkpIHtcclxuICAgICAgaWYgKHRoaXMuX2JhY2tPZmZpY2VFbnRyaWVzLmxlbmd0aCkge1xyXG4gICAgICAgIGNvbnN0IHF1ZXJ5ID0gdGhpcy5fYWNjb3VudGluZ0VudGl0eU1vZGVsLmdldEVudHJpZXMoYEJhY2tPZmZpY2UuJGtleSBlcSBcIiR7YmFja09mZmljZUtleX1cImAsIHtcclxuICAgICAgICAgIHJldHVyblF1ZXJ5UmVzdWx0czogdHJ1ZSxcclxuICAgICAgICAgIHF1ZXJ5TW9kZWxOYW1lOiAnbGlzdCcsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgd2hlbihxdWVyeSwgdGhpcy5wcm9jZXNzQWNjb3VudGluZ0VudHJpZXMuYmluZCh0aGlzKSwgdGhpcy5fb25RdWVyeUZhaWx1cmUuYmluZCh0aGlzKSk7XHJcbiAgICAgICAgcmV0dXJuO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBBcHAubW9kYWwuZGlzYWJsZUNsb3NlID0gZmFsc2U7XHJcbiAgICBBcHAubW9kYWwucmVzb2x2ZURlZmVycmVkKHRydWUpO1xyXG4gICAgQXBwLm1vZGFsLnNob3dUb29sYmFyID0gdHJ1ZTtcclxuICAgIEFwcC5tb2RhbC5jcmVhdGVTaW1wbGVEaWFsb2coeyB0aXRsZTogJ2FsZXJ0JywgY29udGVudDogdGhpcy5ub0JhY2tPZmZpY2VzVGV4dCB9KTtcclxuICB9LFxyXG4gIGluaXRJbnRlZ3JhdGlvbk1hcHBpbmdNb2RlbDogZnVuY3Rpb24gaW5pdEludGVncmF0aW9uTWFwcGluZ01vZGVsKCkge1xyXG4gICAgY29uc3QgbW9kZWwgPSB0aGlzLmdldE1vZGVsKE1PREVMX05BTUVTLk9QRVJBVElOR0NPTVBBTlkpO1xyXG4gICAgaWYgKG1vZGVsKSB7XHJcbiAgICAgIHRoaXMuX29wZXJhdGluZ0NvbXBhbnlNb2RlbCA9IG1vZGVsO1xyXG4gICAgICB0aGlzLl9vcGVyYXRpbmdDb21wYW55TW9kZWwuaW5pdCgpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgLyoqXHJcbiAgICogUmV0dXJucyBhIG5ldyBpbnN0YW5jZSBvZiBhIG1vZGVsIGZvciB0aGUgdmlldy5cclxuICAgKi9cclxuICBnZXRNb2RlbDogZnVuY3Rpb24gZ2V0TW9kZWwobW9kZWxOYW1lKSB7XHJcbiAgICBjb25zdCBtb2RlbCA9IEFkYXB0ZXIuZ2V0TW9kZWwobW9kZWxOYW1lKTtcclxuICAgIHJldHVybiBtb2RlbDtcclxuICB9LFxyXG4gIF9wcm9tb3RlOiBmdW5jdGlvbiBfcHJvbW90ZShvcHRpb25zLCBzY29wZSkge1xyXG4gICAgaWYgKG9wdGlvbnMgJiYgc2NvcGUpIHtcclxuICAgICAgY29uc3QgZW50cnkgPSB7XHJcbiAgICAgICAgJG5hbWU6ICdQcm9tb3RlVG9CYWNrT2ZmaWNlJyxcclxuICAgICAgICByZXF1ZXN0OiBvcHRpb25zLFxyXG4gICAgICB9O1xyXG4gICAgICBjb25zdCByZXF1ZXN0ID0gbmV3IFNhZ2UuU0RhdGEuQ2xpZW50LlNEYXRhU2VydmljZU9wZXJhdGlvblJlcXVlc3Qoc2NvcGUuZ2V0U2VydmljZSgpKVxyXG4gICAgICAgIC5zZXRSZXNvdXJjZUtpbmQoJ2JhY2tPZmZpY2VzJylcclxuICAgICAgICAuc2V0Q29udHJhY3ROYW1lKCdkeW5hbWljJylcclxuICAgICAgICAuc2V0T3BlcmF0aW9uTmFtZSgnUHJvbW90ZVRvQmFja09mZmljZScpO1xyXG5cclxuICAgICAgcmVxdWVzdC5leGVjdXRlKGVudHJ5LCB7XHJcbiAgICAgICAgc3VjY2VzczogKCkgPT4ge1xyXG4gICAgICAgICAgY29uc3QgdG9hc3QgPSB7XHJcbiAgICAgICAgICAgIHRpdGxlOiB0aGlzLnByb21vdGlvblJlcXVlc3RlZCxcclxuICAgICAgICAgICAgbWVzc2FnZTogdGhpcy5wcm9tb3Rpb25UZXh0LFxyXG4gICAgICAgICAgICBpY29uOiB0aGlzLnByb21vdGVJY29uLFxyXG4gICAgICAgICAgfTtcclxuICAgICAgICAgIEFwcC50b2FzdC5hZGQodG9hc3QpO1xyXG4gICAgICAgICAgc2NvcGUuX3JlZnJlc2hDbGlja2VkKCk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBmYWlsdXJlOiAoZXJyKSA9PiB7XHJcbiAgICAgICAgICBBcHAudG9hc3QuYWRkKHsgdGl0bGU6ICdFcnJvcicsIG1lc3NhZ2U6IHN0cmluZy5zdWJzdGl0dXRlKHRoaXMuZXJyb3JNZXNzYWdlLCB7IHJlYXNvbjogZXJyLnN0YXR1c1RleHQgfSkgfSk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzY29wZTogdGhpcyxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBwcm9tb3RlVG9CYWNrT2ZmaWNlOiBmdW5jdGlvbiBfcHJvbW90ZVRvQmFja09mZmljZShlbnRyeSwgZW50aXR5TmFtZSwgc2NvcGUpIHtcclxuICAgIGlmICghZW50cnkgfHwgIWVudGl0eU5hbWUgfHwgIXNjb3BlKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuICAgIGNvbnN0IHJlYWR5VG9Qcm9tb3RlID0gdGhpcy5jaGVja0VudHJ5Rm9yKGVudHJ5LCBbJ0VycExvZ2ljYWxJZCcsICdFcnBBY2NvdW50aW5nRW50aXR5SWQnXSk7XHJcbiAgICBpZiAocmVhZHlUb1Byb21vdGUpIHtcclxuICAgICAgdGhpcy5fcHJvbW90ZSh7XHJcbiAgICAgICAgZW50aXR5TmFtZSxcclxuICAgICAgICBlbnRpdHlJZDogZW50cnkuJGtleSxcclxuICAgICAgICBsb2dpY2FsSWQ6IGVudHJ5LkVycExvZ2ljYWxJZCxcclxuICAgICAgICBhY2NvdW50aW5nRW50aXR5SWQ6IGVudHJ5LkVycEFjY291bnRpbmdFbnRpdHlJZCxcclxuICAgICAgfSwgc2NvcGUpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB0aGlzLmdldEFjY291bnRpbmdTeXN0ZW0oKS50aGVuKCh2YWx1ZSkgPT4ge1xyXG4gICAgICBpZiAoIXZhbHVlKSB7XHJcbiAgICAgICAgQXBwLm1vZGFsLnNob3dUb29sYmFyID0gdHJ1ZTtcclxuICAgICAgICBjb25zdCB0b29sYmFyID0gW1xyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBhY3Rpb246ICdjYW5jZWwnLFxyXG4gICAgICAgICAgICBjbGFzc05hbWU6ICdidXR0b24tLWZsYXQgYnV0dG9uLS1mbGF0LS1zcGxpdCcsXHJcbiAgICAgICAgICAgIHRleHQ6IHRoaXMuY2FuY2VsVGV4dCxcclxuICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgYWN0aW9uOiAncmVzb2x2ZScsXHJcbiAgICAgICAgICAgIGNsYXNzTmFtZTogJ2J1dHRvbi0tZmxhdCBidXR0b24tLWZsYXQtLXNwbGl0JyxcclxuICAgICAgICAgICAgdGV4dDogdGhpcy5wcm9tb3RlVGV4dCxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgXTtcclxuXHJcbiAgICAgICAgQXBwLm1vZGFsLmFkZCh0aGlzLCB0b29sYmFyKS50aGVuKChkYXRhKSA9PiB7XHJcbiAgICAgICAgICB0aGlzLl9wcm9tb3RlKHtcclxuICAgICAgICAgICAgZW50aXR5TmFtZSxcclxuICAgICAgICAgICAgZW50aXR5SWQ6IGVudHJ5LiRrZXksXHJcbiAgICAgICAgICAgIGxvZ2ljYWxJZDogZGF0YS5FcnBMb2dpY2FsSWQsXHJcbiAgICAgICAgICAgIGFjY291bnRpbmdFbnRpdHlJZDogZGF0YS5FcnBBY2NvdW50aW5nRW50aXR5SWQsXHJcbiAgICAgICAgICB9LCBzY29wZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc3QgZGF0YSA9IHRoaXMuZ2V0Q29udGVudCgpO1xyXG4gICAgICAgIHRoaXMuX3Byb21vdGUoe1xyXG4gICAgICAgICAgZW50aXR5TmFtZSxcclxuICAgICAgICAgIGVudGl0eUlkOiBlbnRyeS4ka2V5LFxyXG4gICAgICAgICAgbG9naWNhbElkOiBkYXRhLkVycExvZ2ljYWxJZCxcclxuICAgICAgICAgIGFjY291bnRpbmdFbnRpdHlJZDogZGF0YS5FcnBBY2NvdW50aW5nRW50aXR5SWQsXHJcbiAgICAgICAgfSwgc2NvcGUpO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICB9LFxyXG4gIHByb2Nlc3NCYWNrT2ZmaWNlRW50cmllczogZnVuY3Rpb24gcHJvY2Vzc0JhY2tPZmZpY2VFbnRyaWVzKGVudHJpZXMpIHtcclxuICAgIHRoaXMuX2JhY2tPZmZpY2VFbnRyaWVzID0gZW50cmllcztcclxuICAgIHRoaXMuX2JhY2tPZmZpY2VTZWxlY3Rpb25zID0gW107XHJcbiAgICB0aGlzLl9iYWNrT2ZmaWNlRW50cmllcy5mb3JFYWNoKChlbnRyeSkgPT4ge1xyXG4gICAgICB0aGlzLl9iYWNrT2ZmaWNlU2VsZWN0aW9ucy5wdXNoKHtcclxuICAgICAgICB2YWx1ZTogZW50cnkuJGtleSxcclxuICAgICAgICB0ZXh0OiBlbnRyeS5CYWNrT2ZmaWNlTmFtZSxcclxuICAgICAgfSk7XHJcbiAgICB9KTtcclxuICAgIGlmICh0aGlzLl9iYWNrT2ZmaWNlU2VsZWN0aW9uc1swXSkge1xyXG4gICAgICB0aGlzLmdldEFjY291bnRpbmdFbnRpdGllc0VudHJpZXModGhpcy5fYmFja09mZmljZVNlbGVjdGlvbnNbMF0udmFsdWUpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5nZXRBY2NvdW50aW5nRW50aXRpZXNFbnRyaWVzKG51bGwpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgcHJvY2Vzc0FjY291bnRpbmdFbnRyaWVzOiBmdW5jdGlvbiBwcm9jZXNzQWNjb3VudGluZ0VudHJpZXMoZW50cmllcykge1xyXG4gICAgdGhpcy5fYWNjb3VudGluZ0VudGl0aWVzRW50cmllcyA9IGVudHJpZXM7XHJcbiAgICB0aGlzLl9hY2NvdW50aW5nU2VsZWN0aW9ucyA9IFtdO1xyXG4gICAgdGhpcy5fYWNjb3VudGluZ0VudGl0aWVzRW50cmllcy5mb3JFYWNoKChlbnRyeSkgPT4ge1xyXG4gICAgICB0aGlzLl9hY2NvdW50aW5nU2VsZWN0aW9ucy5wdXNoKHtcclxuICAgICAgICB2YWx1ZTogZW50cnkuJGtleSxcclxuICAgICAgICB0ZXh0OiBlbnRyeS5OYW1lLFxyXG4gICAgICB9KTtcclxuICAgIH0pO1xyXG4gICAgaWYgKHRoaXMuX2ZpcnN0TG9hZCkge1xyXG4gICAgICB0aGlzLmNyZWF0ZUJhY2tPZmZpY2VEcm9wZG93bigpO1xyXG4gICAgICB0aGlzLmNyZWF0ZUFjY291bnRpbmdEcm9wZG93bigpO1xyXG4gICAgICBpZiAodGhpcy5fYmFja09mZmljZVNlbGVjdGlvbnMubGVuZ3RoICE9PSAxIHx8IHRoaXMuX2FjY291bnRpbmdTZWxlY3Rpb25zLmxlbmd0aCAhPT0gMSkge1xyXG4gICAgICAgIHRoaXMuX2ZpcnN0TG9hZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuX2J1c3kuY29tcGxldGUoKTtcclxuICAgICAgICBBcHAubW9kYWwuZGlzYWJsZUNsb3NlID0gZmFsc2U7XHJcbiAgICAgICAgQXBwLm1vZGFsLnJlc29sdmVEZWZlcnJlZCh0cnVlKTtcclxuICAgICAgICB0aGlzLl9hY2NvdW50aW5nRGVmZXJyZWQucmVzb2x2ZShmYWxzZSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gUHJvbW90ZSBBY2NvdW50IHdpdGggZW50aXRpZXMgaW4gYmFja29mZmljZXMgYW5kIGFjY291bnRpbmdFbnRpdGllc1xyXG4gICAgICAgIHRoaXMuX2J1c3kuY29tcGxldGUoKTtcclxuICAgICAgICBBcHAubW9kYWwuZGlzYWJsZUNsb3NlID0gZmFsc2U7XHJcbiAgICAgICAgQXBwLm1vZGFsLnJlc29sdmVEZWZlcnJlZCh0cnVlKTtcclxuICAgICAgICB0aGlzLl9hY2NvdW50aW5nRGVmZXJyZWQucmVzb2x2ZSh0cnVlKTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5jcmVhdGVBY2NvdW50aW5nRHJvcGRvd24oKTtcclxuICAgIH1cclxuICB9LFxyXG4gIF9vblF1ZXJ5RmFpbHVyZTogZnVuY3Rpb24gX29uUXVlcnlGYWlsdXJlKGVycikge1xyXG4gICAgQXBwLm1vZGFsLmhpZGUoKTtcclxuICAgIHRoaXMuY3JlYXRlQWxlcnREaWFsb2coZXJyKTtcclxuICAgIGNvbnNvbGUuZXJyb3IoZXJyKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxyXG4gIH0sXHJcbiAgY2hlY2tFbnRyeUZvcjogZnVuY3Rpb24gY2hlY2tFbnRyeUZvcihlbnRyeSwgcHJvcGVydGllcyA9IFtdKSB7XHJcbiAgICBsZXQgaGFzQWxsUHJvcGVydGllcyA9IHRydWU7XHJcbiAgICBwcm9wZXJ0aWVzLmZvckVhY2goKHByb3BlcnR5KSA9PiB7XHJcbiAgICAgIGlmICghZW50cnlbcHJvcGVydHldKSB7XHJcbiAgICAgICAgaGFzQWxsUHJvcGVydGllcyA9IGZhbHNlO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBoYXNBbGxQcm9wZXJ0aWVzO1xyXG4gIH0sXHJcbiAgY2xlYXJMb2FkaW5nOiBmdW5jdGlvbiBjbGVhckxvYWRpbmcobm9kZSkge1xyXG4gICAgJChub2RlKS5lbXB0eSgpO1xyXG4gIH0sXHJcbiAgY3JlYXRlQWxlcnREaWFsb2c6IGZ1bmN0aW9uIGNyZWF0ZUFsZXJ0RGlhbG9nKGVycikge1xyXG4gICAgdGhpcy5fYnVzeS5jb21wbGV0ZSh0cnVlKTtcclxuICAgIEFwcC5tb2RhbC5kaXNhYmxlQ2xvc2UgPSBmYWxzZTtcclxuICAgIEFwcC5tb2RhbC5zaG93VG9vbGJhciA9IHRydWU7XHJcbiAgICBBcHAubW9kYWwucmVzb2x2ZURlZmVycmVkKHRydWUpO1xyXG4gICAgcmV0dXJuIEFwcC5tb2RhbC5jcmVhdGVTaW1wbGVEaWFsb2coeyB0aXRsZTogJ2FsZXJ0JywgY29udGVudDogZXJyLCBnZXRDb250ZW50OiAoKSA9PiB7IHJldHVybjsgfSwgbGVmdEJ1dHRvbjogJ2NhbmNlbCcsIHJpZ2h0QnV0dG9uOiAnY29uZmlybScgfSk7XHJcbiAgfSxcclxuICBjcmVhdGVBY2NvdW50aW5nRHJvcGRvd246IGZ1bmN0aW9uIGNyZWF0ZUFjY291bnRpbmdEcm9wZG93bigpIHtcclxuICAgIGlmICh0aGlzLl9hY2NvdW50aW5nRHJvcGRvd24pIHtcclxuICAgICAgdGhpcy5jbGVhckxvYWRpbmcodGhpcy5hY2NvdW50aW5nTm9kZSk7XHJcbiAgICAgIHRoaXMuX2FjY291bnRpbmdEcm9wZG93bi5kZXN0cm95KCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLl9hY2NvdW50aW5nRHJvcGRvd24gPSBuZXcgRHJvcGRvd24oeyBpZDogJ2FjY291bnRpbmdEcm9wZG93bicsIGRyb3Bkb3duQ2xhc3M6ICdwcm9tb3RlX19kcm9wZG93bicgfSk7XHJcbiAgICB0aGlzLl9hY2NvdW50aW5nRHJvcGRvd24uY3JlYXRlTGlzdCh7IGl0ZW1zOiB0aGlzLl9hY2NvdW50aW5nU2VsZWN0aW9ucywgZGVmYXVsdFZhbHVlOiB0aGlzLl9hY2NvdW50aW5nU2VsZWN0aW9uc1swXSA/IHRoaXMuX2FjY291bnRpbmdTZWxlY3Rpb25zWzBdLnZhbHVlIDogJycgfSk7IC8vIFRPRE86IGNoYW5nZSB0aGUgZGVmYXVsdFZhbHVlIHNlbGVjdGVkXHJcbiAgICAkKHRoaXMuYWNjb3VudGluZ05vZGUpLmFwcGVuZCh0aGlzLl9hY2NvdW50aW5nRHJvcGRvd24uZG9tTm9kZSk7XHJcbiAgICByZXR1cm4gdGhpcztcclxuICB9LFxyXG4gIGNyZWF0ZUJhY2tPZmZpY2VEcm9wZG93bjogZnVuY3Rpb24gY3JlYXRlQmFja09mZmljZURyb3Bkb3duKCkge1xyXG4gICAgaWYgKCF0aGlzLl9iYWNrT2ZmaWNlRHJvcGRvd24pIHtcclxuICAgICAgdGhpcy5fYmFja09mZmljZURyb3Bkb3duID0gbmV3IERyb3Bkb3duKHsgaWQ6ICdiYWNrT2ZmaWNlRHJvcGRvd24nLCBkcm9wZG93bkNsYXNzOiAncHJvbW90ZV9fZHJvcGRvd24nLCBvblNlbGVjdDogdGhpcy51cGRhdGVBY2NvdW50aW5nRHJvcGRvd24sIG9uU2VsZWN0U2NvcGU6IHRoaXMgfSk7XHJcbiAgICAgIHRoaXMuX2JhY2tPZmZpY2VEcm9wZG93bi5jcmVhdGVMaXN0KHsgaXRlbXM6IHRoaXMuX2JhY2tPZmZpY2VTZWxlY3Rpb25zLCBkZWZhdWx0VmFsdWU6IHRoaXMuX2JhY2tPZmZpY2VTZWxlY3Rpb25zWzBdID8gdGhpcy5fYmFja09mZmljZVNlbGVjdGlvbnNbMF0udmFsdWUgOiAnJyB9KTsgLy8gVE9ETzogY2hhbmdlIHRoZSBkZWZhdWx0VmFsdWUgc2VsZWN0ZWRcclxuICAgICAgJCh0aGlzLmJhY2tPZmZpY2VOb2RlKS5hcHBlbmQodGhpcy5fYmFja09mZmljZURyb3Bkb3duLmRvbU5vZGUpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfSxcclxuICBnZXRBY2NvdW50aW5nU3lzdGVtOiBmdW5jdGlvbiBnZXRBY2NvdW50aW5nU3lzdGVtKCkge1xyXG4gICAgaWYgKCF0aGlzLl9idXN5KSB7XHJcbiAgICAgIHRoaXMuX2J1c3kgPSBuZXcgQnVzeUluZGljYXRvcih7IGlkOiBgJHt0aGlzLmlkfV9fYnVzeUluZGljYXRvcmAgfSk7XHJcbiAgICAgIHRoaXMuX2FjY291bnRpbmdCdXN5ID0gbmV3IEJ1c3lJbmRpY2F0b3IoeyBpZDogYCR7dGhpcy5pZH1fX2J1c3lJbmRpY2F0b3JfX2FjY291bnRpbmdgLCBzaXplOiAnc21hbGwnLCBsYWJlbDogbnVsbCwgY29udGFpbmVyQ2xhc3M6ICdidXN5RmllbGQnIH0pO1xyXG4gICAgICB0aGlzLl9hY2NvdW50aW5nQnVzeS5zdGFydCgpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5fZmlyc3RMb2FkID0gdHJ1ZTtcclxuICAgIEFwcC5tb2RhbC5zaG93VG9vbGJhciA9IGZhbHNlO1xyXG4gICAgQXBwLm1vZGFsLmRpc2FibGVDbG9zZSA9IHRydWU7XHJcbiAgICBBcHAubW9kYWwuYWRkKHRoaXMuX2J1c3kpO1xyXG4gICAgdGhpcy5fYnVzeS5zdGFydCgpO1xyXG4gICAgdGhpcy5fYWNjb3VudGluZ0RlZmVycmVkID0gbmV3IERlZmVycmVkKCk7XHJcbiAgICB0aGlzLmluaXRCYWNrT2ZmaWNlTW9kZWwoKTtcclxuICAgIHRoaXMuaW5pdEludGVncmF0aW9uTWFwcGluZ01vZGVsKCk7XHJcbiAgICB0aGlzLmluaXRBY2NvdW50aW5nRW50aXRpZXNNb2RlbCgpO1xyXG4gICAgcmV0dXJuIHRoaXMuX2FjY291bnRpbmdEZWZlcnJlZC5wcm9taXNlO1xyXG4gIH0sXHJcbiAgZ2V0Q29udGVudDogZnVuY3Rpb24gZ2V0Q29udGVudCgpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgIEVycExvZ2ljYWxJZDogdGhpcy5fYmFja09mZmljZUVudHJpZXMuZmluZCgodmFsdWUpID0+IHtcclxuICAgICAgICByZXR1cm4gdmFsdWUuJGtleSA9PT0gdGhpcy5fYmFja09mZmljZURyb3Bkb3duLmdldFZhbHVlKCk7XHJcbiAgICAgIH0pLkxvZ2ljYWxJZCxcclxuICAgICAgRXJwQWNjb3VudGluZ0VudGl0eUlkOiB0aGlzLl9hY2NvdW50aW5nRW50aXRpZXNFbnRyaWVzLmZpbmQoKHZhbHVlKSA9PiB7XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlLiRrZXkgPT09IHRoaXMuX2FjY291bnRpbmdEcm9wZG93bi5nZXRWYWx1ZSgpO1xyXG4gICAgICB9KS5BY2N0RW50aXR5RXh0SWQsXHJcbiAgICB9O1xyXG4gIH0sXHJcbiAgc2V0TG9hZGluZzogZnVuY3Rpb24gc2V0TG9hZGluZyhub2RlKSB7XHJcbiAgICAkKG5vZGUpLmVtcHR5KCkuYXBwZW5kKHRoaXMuX2FjY291bnRpbmdCdXN5LmRvbU5vZGUpO1xyXG4gIH0sXHJcbiAgc2hvdzogZnVuY3Rpb24gc2hvdygpIHtcclxuICAgIGlmICghdGhpcy5fYmFja09mZmljZU1vZGVsKSB7XHJcbiAgICAgIHRoaXMuZ2V0QWNjb3VudGluZ1N5c3RlbSgpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXM7XHJcbiAgfSxcclxuICB1cGRhdGVBY2NvdW50aW5nRHJvcGRvd246IGZ1bmN0aW9uIHVwZGF0ZUFjY291bnRpbmdEcm9wZG93bigpIHtcclxuICAgIHRoaXMuc2V0TG9hZGluZyh0aGlzLmFjY291bnRpbmdOb2RlKTtcclxuICAgIHRoaXMuZ2V0QWNjb3VudGluZ0VudGl0aWVzRW50cmllcyh0aGlzLl9iYWNrT2ZmaWNlRHJvcGRvd24uZ2V0VmFsdWUoKSk7XHJcbiAgfSxcclxuICB0cmFuc2l0aW9uQXdheTogZnVuY3Rpb24gdHJhbnNpdGlvbkF3YXkoKSB7XHJcbiAgICAvLyBmb3JjZSBzb2hvIGRyb3Bkb3duIHRvIGNsb3NlIHNpbmNlIHRoZXkgZG9udCBjbG9zZSBvbiBhIGJ1dHRvbiBjbGljayBlbHNld2hlcmUgb24gVUlcclxuICAgICQodGhpcy5fYmFja09mZmljZURyb3Bkb3duLmRyb3Bkb3duU2VsZWN0KS5kYXRhKCdkcm9wZG93bicpLmNsb3NlKCk7XHJcbiAgICAkKHRoaXMuX2FjY291bnRpbmdEcm9wZG93bi5kcm9wZG93blNlbGVjdCkuZGF0YSgnZHJvcGRvd24nKS5jbG9zZSgpO1xyXG4gICAgdGhpcy5pbmhlcml0ZWQodHJhbnNpdGlvbkF3YXksIGFyZ3VtZW50cyk7XHJcbiAgfSxcclxufSk7XHJcblxyXG5sYW5nLnNldE9iamVjdCgnaWNib2UuUHJvbW90ZScsIF9fY2xhc3MpO1xyXG5leHBvcnQgZGVmYXVsdCBfX2NsYXNzO1xyXG4iXX0=
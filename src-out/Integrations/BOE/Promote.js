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

  const resource = (0, _I18n2.default)('promote');

  const __class = (0, _declare2.default)('crm.Integrations.BOE.Promote', [_Widget3.default, _Templated3.default], {
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
      const model = this.getModel(_Names2.default.BACKOFFICE);
      if (model) {
        this._backOfficeModel = model;
        this._backOfficeModel.init();
        this.getBackOfficeEntries();
      }
    },
    getBackOfficeEntries: function getBackOfficeEntries() {
      const query = this._backOfficeModel.getEntries(null, {
        returnQueryResults: true,
        queryModelName: 'list-active'
      });
      (0, _when2.default)(query, this.processBackOfficeEntries.bind(this), this._onQueryFailure.bind(this));
    },
    initAccountingEntitiesModel: function initAccountingEntitiesModel() {
      const model = this.getModel(_Names2.default.BACKOFFICEACCOUNTINGENTITY);
      if (model) {
        this._accountingEntityModel = model;
        this._accountingEntityModel.init();
      }
    },
    getAccountingEntitiesEntries: function getAccountingEntitiesEntries(backOfficeKey) {
      if (backOfficeKey) {
        if (this._backOfficeEntries.length) {
          const query = this._accountingEntityModel.getEntries(`BackOffice.$key eq "${backOfficeKey}"`, {
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
      const model = this.getModel(_Names2.default.OPERATINGCOMPANY);
      if (model) {
        this._operatingCompanyModel = model;
        this._operatingCompanyModel.init();
      }
    },
    /*
     * Returns a new instance of a model for the view.
     */
    getModel: function getModel(modelName) {
      const model = _Adapter2.default.getModel(modelName);
      return model;
    },
    _promote: function _promote(options, scope) {
      if (options && scope) {
        const entry = {
          $name: 'PromoteToBackOffice',
          request: options
        };
        const request = new Sage.SData.Client.SDataServiceOperationRequest(scope.getService()).setResourceKind('backOffices').setContractName('dynamic').setOperationName('PromoteToBackOffice');

        request.execute(entry, {
          success: () => {
            const toast = {
              title: this.promotionRequested,
              message: this.promotionText,
              icon: this.promoteIcon
            };
            App.toast.add(toast);
            scope._refreshClicked();
          },
          failure: err => {
            App.toast.add({ title: 'Error', message: _string2.default.substitute(this.errorMessage, { reason: err.statusText }) });
          },
          scope: this
        });
      }
    },
    promoteToBackOffice: function _promoteToBackOffice(entry, entityName, scope) {
      if (!entry || !entityName || !scope) {
        return;
      }
      const readyToPromote = this.checkEntryFor(entry, ['ErpLogicalId', 'ErpAccountingEntityId']);
      if (readyToPromote) {
        this._promote({
          entityName,
          entityId: entry.$key,
          logicalId: entry.ErpLogicalId,
          accountingEntityId: entry.ErpAccountingEntityId
        }, scope);
        return;
      }
      this.getAccountingSystem().then(value => {
        if (!value) {
          App.modal.showToolbar = true;
          const toolbar = [{
            action: 'cancel',
            className: 'button--flat button--flat--split',
            text: this.cancelText
          }, {
            action: 'resolve',
            className: 'button--flat button--flat--split',
            text: this.promoteText
          }];

          App.modal.add(this, toolbar).then(data => {
            this._promote({
              entityName,
              entityId: entry.$key,
              logicalId: data.ErpLogicalId,
              accountingEntityId: data.ErpAccountingEntityId
            }, scope);
          });
        } else {
          const data = this.getContent();
          this._promote({
            entityName,
            entityId: entry.$key,
            logicalId: data.ErpLogicalId,
            accountingEntityId: data.ErpAccountingEntityId
          }, scope);
        }
      });
    },
    processBackOfficeEntries: function processBackOfficeEntries(entries) {
      this._backOfficeEntries = entries;
      this._backOfficeSelections = [];
      this._backOfficeEntries.forEach(entry => {
        this._backOfficeSelections.push({
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
      this._accountingEntitiesEntries = entries;
      this._accountingSelections = [];
      this._accountingEntitiesEntries.forEach(entry => {
        this._accountingSelections.push({
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
    checkEntryFor: function checkEntryFor(entry, properties = []) {
      let hasAllProperties = true;
      properties.forEach(property => {
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
      return App.modal.createSimpleDialog({ title: 'alert', content: err, getContent: () => {
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
        this._busy = new _BusyIndicator2.default({ id: `${this.id}__busyIndicator` });
        this._accountingBusy = new _BusyIndicator2.default({ id: `${this.id}__busyIndicator__accounting`, size: 'small', label: null, containerClass: 'busyField' });
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
      return {
        ErpLogicalId: this._backOfficeEntries.find(value => {
          return value.$key === this._backOfficeDropdown.getValue();
        }).LogicalId,
        ErpAccountingEntityId: this._accountingEntitiesEntries.find(value => {
          return value.$key === this._accountingDropdown.getValue();
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
define('crm/Views/OfflineOptions/UsageWidget', ['module', 'exports', 'dojo/_base/declare', 'dojo/aspect', '../../Format', 'argos/Utility', 'argos/Offline/Manager', 'argos/RelatedViewManager', 'argos/_RelatedViewWidgetBase', 'argos/Dropdown', 'argos/Dialogs/BusyIndicator', 'argos/ErrorManager', 'argos/I18n'], function (module, exports, _declare, _aspect, _Format, _Utility, _Manager, _RelatedViewManager, _RelatedViewWidgetBase2, _Dropdown, _BusyIndicator, _ErrorManager, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _aspect2 = _interopRequireDefault(_aspect);

  var _Format2 = _interopRequireDefault(_Format);

  var _Utility2 = _interopRequireDefault(_Utility);

  var _Manager2 = _interopRequireDefault(_Manager);

  var _RelatedViewManager2 = _interopRequireDefault(_RelatedViewManager);

  var _RelatedViewWidgetBase3 = _interopRequireDefault(_RelatedViewWidgetBase2);

  var _Dropdown2 = _interopRequireDefault(_Dropdown);

  var _BusyIndicator2 = _interopRequireDefault(_BusyIndicator);

  var _ErrorManager2 = _interopRequireDefault(_ErrorManager);

  var _I18n2 = _interopRequireDefault(_I18n);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var resource = (0, _I18n2.default)('offlineUsageWidget'); /* Copyright 2017 Infor
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

  var __class = (0, _declare2.default)('crm.Views.OfflineOptions.UsageWidget', [_RelatedViewWidgetBase3.default], {

    totalUsageText: resource.totalUsageText,
    countText: resource.countText,
    sizeText: resource.sizeText,
    sizeAVGText: resource.sizeAVGText,
    oldestText: resource.oldestText,
    newestText: resource.newestText,
    clearDataText: resource.clearDataText,
    clearRecentText: resource.clearRecentText,
    clearBriefcasedText: resource.clearBriefcasedText,
    olderThanText: resource.olderThanText,
    showUsageText: resource.showUsageText,
    processingText: resource.processingText,
    calculatingUsageText: resource.calculatingUsageText,
    clearingDataText: resource.clearingDataText,
    lastClearedText: resource.lastClearedText,

    cls: 'related-offline-usage-widget',
    relatedContentTemplate: new Simplate(['<div class="offline-usage">', '<span class="label">{%: $$.olderThanText %}</span>', '&nbsp;<span data-dojo-attach-point="_olderThanNode" style="display:inline-block"></span>&nbsp;', '<div data-dojo-attach-point="_lastClearDateNode"></div>', '<p><button class="btn-secondary" data-dojo-attach-event="onclick:onClearAllData">{%: $$.clearDataText %}</button></p>', '<p><button class="btn-secondary" data-dojo-attach-event="onclick:onClearBriefcasedData">{%: $$.clearBriefcasedText %}</button></p>', '<p><button class="btn-secondary" data-dojo-attach-event="onclick:onClearRecentData">{%: $$.clearRecentText %}</button></p>', '<p><button class="btn-secondary" data-dojo-attach-event="onclick:onShowUsage">{%: $$.showUsageText %}</button></p>', '<div data-dojo-attach-point="usageNode" style="margin-top:2rem;">', '</div>']),
    errorTemplate: new Simplate(['<div class="error">', '<span class="fa fa-waring fa-2x"></span>', '<h2>{%= $.message %}</h2>', '</div>']),
    usageHeaderTemplate: new Simplate(['<div class="offline-usage-header twelve columns">', '{%! $$.usageItemTemplate %}', '</div>']),
    usageItemTemplate: new Simplate(['<div class="offline-usage-item widget">', '<div class="widget-header">', '{% if ($.iconClass) { %}\n    <button type="button" class="btn-icon hide-focus">\n    <svg class="icon" focusable="false" aria-hidden="true" role="presentation">\n      <use xlink:href="#icon-{%= $.iconClass %}"></use>\n    </svg>\n    </button>\n    {% } %}', '<h2 class="widget-title">{%: $.label %}</h2>', '</div>', '<div class="content card-content">', '<div class="item"><div class="label">{%: $$.countText %}</div> <span class="value">{%: $.count %}</span><span class="value percent">{%: $.countPercent %}</span></div>', '<div class="item"><div class="label">{%: $$.sizeText %}</div> <span class="value">{%: $.size %}</span><span class="value percent">{%: $.sizePercent %}</span></div>', '<div class="item"><div class="label">{%: $$.sizeAVGText %}</div> <span class="value">{%: $.sizeAVG %}</span></div>', '<div class="bar"></div>', '<div class="item"><div class="label small">{%: $$.oldestText %}</div> <span class="value small">{%: $.oldestDate %}</span></div>', '<div class="item"><div class="label small">{%: $$.newestText %}</div> <span class="value small">{%: $.newestDate %}</span></div>', '</div>', '</div>']),
    lastClearDateTemplate: new Simplate(['<span class="label">', '{%: $$.lastClearedText %}', '</span', '<span class="value">', ' {%: $.lastClearedDate %}', '</span']),
    /*
     * SoHo class to be applied on multi column.
     */
    multiColumnClass: 'four',
    /*
     * Number of columns in view
     */
    multiColumnCount: 3,
    onInit: function onInit() {
      var _this = this;

      this.onLoad();
      if (this.owner) {
        _aspect2.default.after(this.owner, 'show', function () {
          _this.onRefreshView();
        });

        _aspect2.default.after(this.owner, 'save', function () {
          _this.onSave();
        });
      }
    },
    onLoad: function onLoad() {
      var options = _Manager2.default.getOptions();
      this._options = {
        clearOlderThan: options.clearOlderThan,
        lastClearedDate: options.lastClearedDate
      };
      this._olderThanValues = _Manager2.default.getClearOlderThanValues();
      this.initUI(options.clearOlderThan);
    },
    initUI: function initUI(clearOlderThan) {
      if (!this._olderThanDropdown) {
        this._olderThanDropdown = new _Dropdown2.default({
          id: 'olderThan-dropdown ' + this.id,
          onSelect: this.olderThanSelect,
          onSelectScope: this,
          dropdownClass: 'input-xs'
        });
        this._olderThanDropdown.createList({
          items: this._olderThanValues,
          defaultValue: this._options.clearOlderThan
        });
        $(this._olderThanNode).append(this._olderThanDropdown.domNode);
        this.setLastClearedDate(this._options.lastClearedDate);
      } else {
        try {
          this._olderThanDropdown.setValue(clearOlderThan);
        } catch (err) {
          // There is a wierd lifecycle error going on here, with initUI being called twice
          // TODO: Refactor
        }
      }
    },
    setLastClearedDate: function setLastClearedDate(lastClearedDate) {
      var values = {
        lastClearedDate: lastClearedDate ? _Format2.default.relativeDate(lastClearedDate) : ''
      };
      this._options.lastClearedDate = lastClearedDate;
      var clearDateNode = this.lastClearDateTemplate.apply(values, this);
      $(this._lastClearDateNode).empty().append(clearDateNode);
    },
    olderThanSelect: function olderThanSelect() {
      this._options.clearOlderThan = this._olderThanDropdown.getValue();
    },
    onShowUsage: function onShowUsage() {
      var _this2 = this;

      if (this._showingUsage) {
        this.destroyUsage();
      } else {
        this.showProcessing(true, this.calculatingUsageText);
        this.getUsage().then(function (data) {
          _this2.showProcessing(false);
          _this2.processUsage(data);
        }, function (err) {
          _this2.showError(resource.errorCalculatingText, err);
        });
      }
    },
    showProcessing: function showProcessing(show, message) {
      if (show) {
        if (this.usageNode) {
          this._indicator = new _BusyIndicator2.default({
            id: 'busyIndicator__offlineusage',
            label: message
          });
          App.modal.disableClose = true;
          App.modal.showToolbar = false;
          App.modal.add(this._indicator);
          this._indicator.start();
        }
      } else {
        if (this._indicator) {
          this._indicator.complete(true);
          this._indicator = null;
        }
        App.modal.disableClose = false;
        App.modal.hide();

        this.destroyUsage();
      }
    },
    showError: function showError(message, error) {
      var _this3 = this;

      if (this.usageNode) {
        this.showProcessing(false);
        _ErrorManager2.default.addSimpleError(message, error);
        _ErrorManager2.default.showErrorDialog(null, message, function () {
          _this3.onRefreshView();
        });
      }
    },
    onClearAllData: function onClearAllData() {
      var _this4 = this;

      this.showProcessing(true, this.clearingDataText);
      _Manager2.default.clearAllData().then(function () {
        _this4.showProcessing(false);
        _this4.setLastClearedDate(moment().toDate());
      }, function (err) {
        _this4.showError(resource.errorClearingDataText, err);
      });
    },
    onClearRecentData: function onClearRecentData() {
      var _this5 = this;

      this.showProcessing(true, this.clearingDataText);
      _Manager2.default.clearRecentData(this._options.clearOlderThan).then(function () {
        _this5.showProcessing(false);
        _this5.setLastClearedDate(moment().toDate());
      }, function (err) {
        _this5.showError(resource.errorClearingDataText, err);
      });
    },
    onClearBriefcasedData: function onClearBriefcasedData() {
      var _this6 = this;

      this.showProcessing(true, this.clearingDataText);
      _Manager2.default.clearBriefcaseData(this._options.clearOlderThan).then(function () {
        _this6.showProcessing(false);
        _this6.setLastClearedDate(moment().toDate());
      }, function (err) {
        _this6.showError(resource.errorClearingDataText, err);
      });
    },
    getUsage: function getUsage() {
      return _Manager2.default.getUsage();
    },
    processUsage: function processUsage(usage) {
      var i = void 0;
      var docfrag = document.createDocumentFragment();
      var totalItem = {};
      var oldestDate = void 0;
      var newestDate = void 0;
      totalItem.iconClass = 'server';
      totalItem.label = this.totalUsageText;
      totalItem.entityName = '*';
      totalItem.size = _Format2.default.bigNumber(_Utility2.default.getValue(usage, 'size'));
      totalItem.sizePercent = _Format2.default.percent(1);
      totalItem.count = _Format2.default.bigNumber(_Utility2.default.getValue(usage, 'count'));
      totalItem.countPercent = _Format2.default.percent(1);
      totalItem.sizeAVG = _Format2.default.bigNumber(_Utility2.default.getValue(usage, 'sizeAVG'));
      oldestDate = _Utility2.default.getValue(usage, 'oldestDate');
      newestDate = _Utility2.default.getValue(usage, 'newestDate');
      totalItem.oldestDate = oldestDate ? _Format2.default.relativeDate(oldestDate) : '';
      totalItem.newestDate = newestDate ? _Format2.default.relativeDate(newestDate) : '';
      var headerNode = $(this.usageHeaderTemplate.apply(totalItem, this));
      var columnHeaderNode = $('<div class="row"></div>').append(headerNode);
      docfrag.appendChild(columnHeaderNode.get(0));
      this._selectFields = {};
      var entities = usage.entities;
      var row = [];
      for (i = 0; i < entities.length; i++) {
        var entity = entities[i];
        try {
          var item = {};
          item.iconClass = entity.iconClass;
          item.label = entity.description;
          item.entityName = entity.entityName;
          item.size = _Format2.default.bigNumber(_Utility2.default.getValue(entity, 'size'));
          item.sizePercent = _Format2.default.percent(_Utility2.default.getValue(entity, 'sizePercent'));
          item.sizeAVG = _Format2.default.bigNumber(_Utility2.default.getValue(entity, 'sizeAVG'));
          item.count = _Format2.default.bigNumber(_Utility2.default.getValue(entity, 'count'));
          item.countPercent = _Format2.default.percent(_Utility2.default.getValue(entity, 'countPercent'));
          oldestDate = _Utility2.default.getValue(entity, 'oldestDate');
          newestDate = _Utility2.default.getValue(entity, 'newestDate');
          item.oldestDate = oldestDate ? _Format2.default.relativeDate(oldestDate) : '';
          item.newestDate = newestDate ? _Format2.default.relativeDate(newestDate) : '';
          var itemNode = $(this.usageItemTemplate.apply(item, this)).get(0);

          var column = $('<div class="' + this.multiColumnClass + ' columns">').append(itemNode);
          row.push(column);
          if ((i + 1) % this.multiColumnCount === 0 || i === entities.length - 1) {
            (function () {
              var rowTemplate = $('<div class="row"></div>');
              row.forEach(function (element) {
                rowTemplate.append(element);
              });
              docfrag.appendChild(rowTemplate.get(0));
              row = [];
            })();
          }
        } catch (err) {
          console.log(err); // eslint-disable-line
        }
      }
      $(this.usageNode).append(docfrag);
      this._showingUsage = true;
    },
    destroyUsage: function destroyUsage() {
      if (this.usageNode) {
        var node = $('<div></div>');
        $(this.usageNode).empty().append(node);
        this._showingUsage = false;
      }
    },
    onRefreshView: function onRefreshView() {
      this.destroyUsage();
      this.onLoad();
    },
    destroy: function destroy() {
      if (this._olderThanDropdown) {
        this._olderThanDropdown.destroy();
      }
      this.inherited(destroy, arguments);
    },
    onSave: function onSave() {
      var options = _Manager2.default.getOptions();
      options.clearOlderThan = this._options.clearOlderThan;
      _Manager2.default.saveOptions(options);
    }

  });
  var rvm = new _RelatedViewManager2.default();
  rvm.registerType('offlineUsageWidget', __class);
  exports.default = __class;
  module.exports = exports['default'];
});
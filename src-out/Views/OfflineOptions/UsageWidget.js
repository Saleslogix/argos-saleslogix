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

  var resource = (0, _I18n2.default)('offlineUsageWidget');

  /**
   * @class crm.Views.OfflineOptions.UsageWidget
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

  var __class = (0, _declare2.default)('crm.Views.OfflineOptions.UsageWidget', [_RelatedViewWidgetBase3.default], /** @lends crm.Views.OfflineOptions.UsageWidget# */{

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
    relatedContentTemplate: new Simplate(['<div class="offline-usage">', '<span class="label">{%: $$.olderThanText %}</span>', '&nbsp;<span data-dojo-attach-point="_olderThanNode" style="display:inline-block"></span>&nbsp;', '<div data-dojo-attach-point="_lastClearDateNode"></div>', '<div><button class="button actionButton" data-dojo-attach-event="onclick:onClearAllData">{%: $$.clearDataText %}</button></div>', '<div><button class="button actionButton" data-dojo-attach-event="onclick:onClearBriefcasedData">{%: $$.clearBriefcasedText %}</button></div>', '<div><button class="button actionButton" data-dojo-attach-event="onclick:onClearRecentData">{%: $$.clearRecentText %}</button></div>', '<div><button class="button actionButton" data-dojo-attach-event="onclick:onShowUsage">{%: $$.showUsageText %}</button></div>', '<div data-dojo-attach-point="usageNode" style="margin-top:2rem;">', '</div>']),
    errorTemplate: new Simplate(['<div class="error">', '<span class="fa fa-waring fa-2x"></span>', '<h2>{%= $.message %}</h2>', '</div>']),
    usageHeaderTemplate: new Simplate(['<div class="offline-usage-header twelve columns">', '{%! $$.usageItemTemplate %}', '</div>']),
    usageItemTemplate: new Simplate(['<div class="offline-usage-item widget">', '<div class="widget-header">', '{% if ($.iconClass) { %}\n    <button type="button" class="btn-icon hide-focus">\n    <svg class="icon" focusable="false" aria-hidden="true" role="presentation">\n      <use xlink:href="#icon-{%= $.iconClass %}"></use>\n    </svg>\n    </button>\n    {% } %}', '<h2 class="widget-title">{%: $.label %}</h2>', '</div>', '<div class="content card-content">', '<div class="item"><div class="label">{%: $$.countText %}</div> <span class="value">{%: $.count %}</span><span class="value percent">{%: $.countPercent %}</span></div>', '<div class="item"><div class="label">{%: $$.sizeText %}</div> <span class="value">{%: $.size %}</span><span class="value percent">{%: $.sizePercent %}</span></div>', '<div class="item"><div class="label">{%: $$.sizeAVGText %}</div> <span class="value">{%: $.sizeAVG %}</span></div>', '<div class="bar"></div>', '<div class="item"><div class="label small">{%: $$.oldestText %}</div> <span class="value small">{%: $.oldestDate %}</span></div>', '<div class="item"><div class="label small">{%: $$.newestText %}</div> <span class="value small">{%: $.newestDate %}</span></div>', '</div>', '</div>']),
    lastClearDateTemplate: new Simplate(['<span class="label">', '{%: $$.lastClearedText %}', '</span', '<span class="value">', ' {%: $.lastClearedDate %}', '</span']),
    /**
     * @property {string}
     * SoHo class to be applied on multi column.
     */
    multiColumnClass: 'four',
    /**
     * @property {number}
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
      this.inherited(arguments);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9WaWV3cy9PZmZsaW5lT3B0aW9ucy9Vc2FnZVdpZGdldC5qcyJdLCJuYW1lcyI6WyJyZXNvdXJjZSIsIl9fY2xhc3MiLCJ0b3RhbFVzYWdlVGV4dCIsImNvdW50VGV4dCIsInNpemVUZXh0Iiwic2l6ZUFWR1RleHQiLCJvbGRlc3RUZXh0IiwibmV3ZXN0VGV4dCIsImNsZWFyRGF0YVRleHQiLCJjbGVhclJlY2VudFRleHQiLCJjbGVhckJyaWVmY2FzZWRUZXh0Iiwib2xkZXJUaGFuVGV4dCIsInNob3dVc2FnZVRleHQiLCJwcm9jZXNzaW5nVGV4dCIsImNhbGN1bGF0aW5nVXNhZ2VUZXh0IiwiY2xlYXJpbmdEYXRhVGV4dCIsImxhc3RDbGVhcmVkVGV4dCIsImNscyIsInJlbGF0ZWRDb250ZW50VGVtcGxhdGUiLCJTaW1wbGF0ZSIsImVycm9yVGVtcGxhdGUiLCJ1c2FnZUhlYWRlclRlbXBsYXRlIiwidXNhZ2VJdGVtVGVtcGxhdGUiLCJsYXN0Q2xlYXJEYXRlVGVtcGxhdGUiLCJtdWx0aUNvbHVtbkNsYXNzIiwibXVsdGlDb2x1bW5Db3VudCIsIm9uSW5pdCIsIm9uTG9hZCIsIm93bmVyIiwiYWZ0ZXIiLCJvblJlZnJlc2hWaWV3Iiwib25TYXZlIiwib3B0aW9ucyIsImdldE9wdGlvbnMiLCJfb3B0aW9ucyIsImNsZWFyT2xkZXJUaGFuIiwibGFzdENsZWFyZWREYXRlIiwiX29sZGVyVGhhblZhbHVlcyIsImdldENsZWFyT2xkZXJUaGFuVmFsdWVzIiwiaW5pdFVJIiwiX29sZGVyVGhhbkRyb3Bkb3duIiwiaWQiLCJvblNlbGVjdCIsIm9sZGVyVGhhblNlbGVjdCIsIm9uU2VsZWN0U2NvcGUiLCJkcm9wZG93bkNsYXNzIiwiY3JlYXRlTGlzdCIsIml0ZW1zIiwiZGVmYXVsdFZhbHVlIiwiJCIsIl9vbGRlclRoYW5Ob2RlIiwiYXBwZW5kIiwiZG9tTm9kZSIsInNldExhc3RDbGVhcmVkRGF0ZSIsInNldFZhbHVlIiwiZXJyIiwidmFsdWVzIiwicmVsYXRpdmVEYXRlIiwiY2xlYXJEYXRlTm9kZSIsImFwcGx5IiwiX2xhc3RDbGVhckRhdGVOb2RlIiwiZW1wdHkiLCJnZXRWYWx1ZSIsIm9uU2hvd1VzYWdlIiwiX3Nob3dpbmdVc2FnZSIsImRlc3Ryb3lVc2FnZSIsInNob3dQcm9jZXNzaW5nIiwiZ2V0VXNhZ2UiLCJ0aGVuIiwiZGF0YSIsInByb2Nlc3NVc2FnZSIsInNob3dFcnJvciIsImVycm9yQ2FsY3VsYXRpbmdUZXh0Iiwic2hvdyIsIm1lc3NhZ2UiLCJ1c2FnZU5vZGUiLCJfaW5kaWNhdG9yIiwibGFiZWwiLCJBcHAiLCJtb2RhbCIsImRpc2FibGVDbG9zZSIsInNob3dUb29sYmFyIiwiYWRkIiwic3RhcnQiLCJjb21wbGV0ZSIsImhpZGUiLCJlcnJvciIsImFkZFNpbXBsZUVycm9yIiwic2hvd0Vycm9yRGlhbG9nIiwib25DbGVhckFsbERhdGEiLCJjbGVhckFsbERhdGEiLCJtb21lbnQiLCJ0b0RhdGUiLCJlcnJvckNsZWFyaW5nRGF0YVRleHQiLCJvbkNsZWFyUmVjZW50RGF0YSIsImNsZWFyUmVjZW50RGF0YSIsIm9uQ2xlYXJCcmllZmNhc2VkRGF0YSIsImNsZWFyQnJpZWZjYXNlRGF0YSIsInVzYWdlIiwiaSIsImRvY2ZyYWciLCJkb2N1bWVudCIsImNyZWF0ZURvY3VtZW50RnJhZ21lbnQiLCJ0b3RhbEl0ZW0iLCJvbGRlc3REYXRlIiwibmV3ZXN0RGF0ZSIsImljb25DbGFzcyIsImVudGl0eU5hbWUiLCJzaXplIiwiYmlnTnVtYmVyIiwic2l6ZVBlcmNlbnQiLCJwZXJjZW50IiwiY291bnQiLCJjb3VudFBlcmNlbnQiLCJzaXplQVZHIiwiaGVhZGVyTm9kZSIsImNvbHVtbkhlYWRlck5vZGUiLCJhcHBlbmRDaGlsZCIsImdldCIsIl9zZWxlY3RGaWVsZHMiLCJlbnRpdGllcyIsInJvdyIsImxlbmd0aCIsImVudGl0eSIsIml0ZW0iLCJkZXNjcmlwdGlvbiIsIml0ZW1Ob2RlIiwiY29sdW1uIiwicHVzaCIsInJvd1RlbXBsYXRlIiwiZm9yRWFjaCIsImVsZW1lbnQiLCJjb25zb2xlIiwibG9nIiwibm9kZSIsImRlc3Ryb3kiLCJpbmhlcml0ZWQiLCJhcmd1bWVudHMiLCJzYXZlT3B0aW9ucyIsInJ2bSIsInJlZ2lzdGVyVHlwZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBNEJBLE1BQU1BLFdBQVcsb0JBQVksb0JBQVosQ0FBakI7O0FBRUE7OztBQTlCQTs7Ozs7Ozs7Ozs7Ozs7O0FBaUNBLE1BQU1DLFVBQVUsdUJBQVEsc0NBQVIsRUFBZ0QsaUNBQWhELEVBQTBFLG1EQUFtRDs7QUFFM0lDLG9CQUFnQkYsU0FBU0UsY0FGa0g7QUFHM0lDLGVBQVdILFNBQVNHLFNBSHVIO0FBSTNJQyxjQUFVSixTQUFTSSxRQUp3SDtBQUszSUMsaUJBQWFMLFNBQVNLLFdBTHFIO0FBTTNJQyxnQkFBWU4sU0FBU00sVUFOc0g7QUFPM0lDLGdCQUFZUCxTQUFTTyxVQVBzSDtBQVEzSUMsbUJBQWVSLFNBQVNRLGFBUm1IO0FBUzNJQyxxQkFBaUJULFNBQVNTLGVBVGlIO0FBVTNJQyx5QkFBcUJWLFNBQVNVLG1CQVY2RztBQVczSUMsbUJBQWVYLFNBQVNXLGFBWG1IO0FBWTNJQyxtQkFBZVosU0FBU1ksYUFabUg7QUFhM0lDLG9CQUFnQmIsU0FBU2EsY0Fia0g7QUFjM0lDLDBCQUFzQmQsU0FBU2Msb0JBZDRHO0FBZTNJQyxzQkFBa0JmLFNBQVNlLGdCQWZnSDtBQWdCM0lDLHFCQUFpQmhCLFNBQVNnQixlQWhCaUg7O0FBa0IzSUMsU0FBSyw4QkFsQnNJO0FBbUIzSUMsNEJBQXdCLElBQUlDLFFBQUosQ0FBYSxDQUNuQyw2QkFEbUMsRUFFbkMsb0RBRm1DLEVBR25DLGdHQUhtQyxFQUluQyx5REFKbUMsRUFLbkMsaUlBTG1DLEVBTW5DLDhJQU5tQyxFQU9uQyxzSUFQbUMsRUFRbkMsOEhBUm1DLEVBU25DLG1FQVRtQyxFQVVuQyxRQVZtQyxDQUFiLENBbkJtSDtBQStCM0lDLG1CQUFlLElBQUlE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QVNBLFlBQVQsR0FBd0I7QUFDcEMsVUFBSSxLQUFLVSxTQUFULEVBQW9CO0FBQ2xCLFlBQU0yRCxPQUFPckYsRUFBRSxhQUFGLENBQWI7QUFDQUEsVUFBRSxLQUFLMEIsU0FBUCxFQUFrQmQsS0FBbEIsR0FBMEJWLE1BQTFCLENBQWlDbUYsSUFBakM7QUFDQSxhQUFLdEUsYUFBTCxHQUFxQixLQUFyQjtBQUNEO0FBQ0YsS0FyUjBJO0FBc1IzSWxDLG1CQUFlLFNBQVNBLGFBQVQsR0FBeUI7QUFDdEMsV0FBS21DLFlBQUw7QUFDQSxXQUFLdEMsTUFBTDtBQUNELEtBelIwSTtBQTBSM0k0RyxhQUFTLFNBQVNBLE9BQVQsR0FBbUI7QUFDMUIsVUFBSSxLQUFLL0Ysa0JBQVQsRUFBNkI7QUFDM0IsYUFBS0Esa0JBQUwsQ0FBd0IrRixPQUF4QjtBQUNEO0FBQ0QsV0FBS0MsU0FBTCxDQUFlQyxTQUFmO0FBQ0QsS0EvUjBJO0FBZ1MzSTFHLFlBQVEsU0FBU0EsTUFBVCxHQUFrQjtBQUN4QixVQUFNQyxVQUFVLGtCQUFlQyxVQUFmLEVBQWhCO0FBQ0FELGNBQVFHLGNBQVIsR0FBeUIsS0FBS0QsUUFBTCxDQUFjQyxjQUF2QztBQUNBLHdCQUFldUcsV0FBZixDQUEyQjFHLE9BQTNCO0FBQ0Q7O0FBcFMwSSxHQUE3SCxDQUFoQjtBQXVTQSxNQUFNMkcsTUFBTSxrQ0FBWjtBQUNBQSxNQUFJQyxZQUFKLENBQWlCLG9CQUFqQixFQUF1QzNJLE9BQXZDO29CQUNlQSxPIiwiZmlsZSI6IlVzYWdlV2lkZ2V0LmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAyMDE3IEluZm9yXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuaW1wb3J0IGRlY2xhcmUgZnJvbSAnZG9qby9fYmFzZS9kZWNsYXJlJztcclxuaW1wb3J0IGFzcGVjdCBmcm9tICdkb2pvL2FzcGVjdCc7XHJcbmltcG9ydCBmb3JtYXQgZnJvbSAnLi4vLi4vRm9ybWF0JztcclxuaW1wb3J0IHV0aWxpdHkgZnJvbSAnYXJnb3MvVXRpbGl0eSc7XHJcbmltcG9ydCBvZmZsaW5lTWFuYWdlciBmcm9tICdhcmdvcy9PZmZsaW5lL01hbmFnZXInO1xyXG5pbXBvcnQgUmVsYXRlZFZpZXdNYW5hZ2VyIGZyb20gJ2FyZ29zL1JlbGF0ZWRWaWV3TWFuYWdlcic7XHJcbmltcG9ydCBfUmVsYXRlZFZpZXdXaWRnZXRCYXNlIGZyb20gJ2FyZ29zL19SZWxhdGVkVmlld1dpZGdldEJhc2UnO1xyXG5pbXBvcnQgRHJvcGRvd24gZnJvbSAnYXJnb3MvRHJvcGRvd24nO1xyXG5pbXBvcnQgQnVzeUluZGljYXRvciBmcm9tICdhcmdvcy9EaWFsb2dzL0J1c3lJbmRpY2F0b3InO1xyXG5pbXBvcnQgRXJyb3JNYW5hZ2VyIGZyb20gJ2FyZ29zL0Vycm9yTWFuYWdlcic7XHJcbmltcG9ydCBnZXRSZXNvdXJjZSBmcm9tICdhcmdvcy9JMThuJztcclxuXHJcblxyXG5jb25zdCByZXNvdXJjZSA9IGdldFJlc291cmNlKCdvZmZsaW5lVXNhZ2VXaWRnZXQnKTtcclxuXHJcbi8qKlxyXG4gKiBAY2xhc3MgY3JtLlZpZXdzLk9mZmxpbmVPcHRpb25zLlVzYWdlV2lkZ2V0XHJcbiAqL1xyXG5jb25zdCBfX2NsYXNzID0gZGVjbGFyZSgnY3JtLlZpZXdzLk9mZmxpbmVPcHRpb25zLlVzYWdlV2lkZ2V0JywgW19SZWxhdGVkVmlld1dpZGdldEJhc2VdLCAvKiogQGxlbmRzIGNybS5WaWV3cy5PZmZsaW5lT3B0aW9ucy5Vc2FnZVdpZGdldCMgKi97XHJcblxyXG4gIHRvdGFsVXNhZ2VUZXh0OiByZXNvdXJjZS50b3RhbFVzYWdlVGV4dCxcclxuICBjb3VudFRleHQ6IHJlc291cmNlLmNvdW50VGV4dCxcclxuICBzaXplVGV4dDogcmVzb3VyY2Uuc2l6ZVRleHQsXHJcbiAgc2l6ZUFWR1RleHQ6IHJlc291cmNlLnNpemVBVkdUZXh0LFxyXG4gIG9sZGVzdFRleHQ6IHJlc291cmNlLm9sZGVzdFRleHQsXHJcbiAgbmV3ZXN0VGV4dDogcmVzb3VyY2UubmV3ZXN0VGV4dCxcclxuICBjbGVhckRhdGFUZXh0OiByZXNvdXJjZS5jbGVhckRhdGFUZXh0LFxyXG4gIGNsZWFyUmVjZW50VGV4dDogcmVzb3VyY2UuY2xlYXJSZWNlbnRUZXh0LFxyXG4gIGNsZWFyQnJpZWZjYXNlZFRleHQ6IHJlc291cmNlLmNsZWFyQnJpZWZjYXNlZFRleHQsXHJcbiAgb2xkZXJUaGFuVGV4dDogcmVzb3VyY2Uub2xkZXJUaGFuVGV4dCxcclxuICBzaG93VXNhZ2VUZXh0OiByZXNvdXJjZS5zaG93VXNhZ2VUZXh0LFxyXG4gIHByb2Nlc3NpbmdUZXh0OiByZXNvdXJjZS5wcm9jZXNzaW5nVGV4dCxcclxuICBjYWxjdWxhdGluZ1VzYWdlVGV4dDogcmVzb3VyY2UuY2FsY3VsYXRpbmdVc2FnZVRleHQsXHJcbiAgY2xlYXJpbmdEYXRhVGV4dDogcmVzb3VyY2UuY2xlYXJpbmdEYXRhVGV4dCxcclxuICBsYXN0Q2xlYXJlZFRleHQ6IHJlc291cmNlLmxhc3RDbGVhcmVkVGV4dCxcclxuXHJcbiAgY2xzOiAncmVsYXRlZC1vZmZsaW5lLXVzYWdlLXdpZGdldCcsXHJcbiAgcmVsYXRlZENvbnRlbnRUZW1wbGF0ZTogbmV3IFNpbXBsYXRlKFtcclxuICAgICc8ZGl2IGNsYXNzPVwib2ZmbGluZS11c2FnZVwiPicsXHJcbiAgICAnPHNwYW4gY2xhc3M9XCJsYWJlbFwiPnslOiAkJC5vbGRlclRoYW5UZXh0ICV9PC9zcGFuPicsXHJcbiAgICAnJm5ic3A7PHNwYW4gZGF0YS1kb2pvLWF0dGFjaC1wb2ludD1cIl9vbGRlclRoYW5Ob2RlXCIgc3R5bGU9XCJkaXNwbGF5OmlubGluZS1ibG9ja1wiPjwvc3Bhbj4mbmJzcDsnLFxyXG4gICAgJzxkaXYgZGF0YS1kb2pvLWF0dGFjaC1wb2ludD1cIl9sYXN0Q2xlYXJEYXRlTm9kZVwiPjwvZGl2PicsXHJcbiAgICAnPGRpdj48YnV0dG9uIGNsYXNzPVwiYnV0dG9uIGFjdGlvbkJ1dHRvblwiIGRhdGEtZG9qby1hdHRhY2gtZXZlbnQ9XCJvbmNsaWNrOm9uQ2xlYXJBbGxEYXRhXCI+eyU6ICQkLmNsZWFyRGF0YVRleHQgJX08L2J1dHRvbj48L2Rpdj4nLFxyXG4gICAgJzxkaXY+PGJ1dHRvbiBjbGFzcz1cImJ1dHRvbiBhY3Rpb25CdXR0b25cIiBkYXRhLWRvam8tYXR0YWNoLWV2ZW50PVwib25jbGljazpvbkNsZWFyQnJpZWZjYXNlZERhdGFcIj57JTogJCQuY2xlYXJCcmllZmNhc2VkVGV4dCAlfTwvYnV0dG9uPjwvZGl2PicsXHJcbiAgICAnPGRpdj48YnV0dG9uIGNsYXNzPVwiYnV0dG9uIGFjdGlvbkJ1dHRvblwiIGRhdGEtZG9qby1hdHRhY2gtZXZlbnQ9XCJvbmNsaWNrOm9uQ2xlYXJSZWNlbnREYXRhXCI+eyU6ICQkLmNsZWFyUmVjZW50VGV4dCAlfTwvYnV0dG9uPjwvZGl2PicsXHJcbiAgICAnPGRpdj48YnV0dG9uIGNsYXNzPVwiYnV0dG9uIGFjdGlvbkJ1dHRvblwiIGRhdGEtZG9qby1hdHRhY2gtZXZlbnQ9XCJvbmNsaWNrOm9uU2hvd1VzYWdlXCI+eyU6ICQkLnNob3dVc2FnZVRleHQgJX08L2J1dHRvbj48L2Rpdj4nLFxyXG4gICAgJzxkaXYgZGF0YS1kb2pvLWF0dGFjaC1wb2ludD1cInVzYWdlTm9kZVwiIHN0eWxlPVwibWFyZ2luLXRvcDoycmVtO1wiPicsXHJcbiAgICAnPC9kaXY+JyxcclxuICBdKSxcclxuICBlcnJvclRlbXBsYXRlOiBuZXcgU2ltcGxhdGUoW1xyXG4gICAgJzxkaXYgY2xhc3M9XCJlcnJvclwiPicsXHJcbiAgICAnPHNwYW4gY2xhc3M9XCJmYSBmYS13YXJpbmcgZmEtMnhcIj48L3NwYW4+JyxcclxuICAgICc8aDI+eyU9ICQubWVzc2FnZSAlfTwvaDI+JyxcclxuICAgICc8L2Rpdj4nLFxyXG4gIF0pLFxyXG4gIHVzYWdlSGVhZGVyVGVtcGxhdGU6IG5ldyBTaW1wbGF0ZShbXHJcbiAgICAnPGRpdiBjbGFzcz1cIm9mZmxpbmUtdXNhZ2UtaGVhZGVyIHR3ZWx2ZSBjb2x1bW5zXCI+JyxcclxuICAgICd7JSEgJCQudXNhZ2VJdGVtVGVtcGxhdGUgJX0nLFxyXG4gICAgJzwvZGl2PicsXHJcbiAgXSksXHJcbiAgdXNhZ2VJdGVtVGVtcGxhdGU6IG5ldyBTaW1wbGF0ZShbXHJcbiAgICAnPGRpdiBjbGFzcz1cIm9mZmxpbmUtdXNhZ2UtaXRlbSB3aWRnZXRcIj4nLFxyXG4gICAgJzxkaXYgY2xhc3M9XCJ3aWRnZXQtaGVhZGVyXCI+JyxcclxuICAgIGB7JSBpZiAoJC5pY29uQ2xhc3MpIHsgJX1cclxuICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuLWljb24gaGlkZS1mb2N1c1wiPlxyXG4gICAgPHN2ZyBjbGFzcz1cImljb25cIiBmb2N1c2FibGU9XCJmYWxzZVwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiIHJvbGU9XCJwcmVzZW50YXRpb25cIj5cclxuICAgICAgPHVzZSB4bGluazpocmVmPVwiI2ljb24teyU9ICQuaWNvbkNsYXNzICV9XCI+PC91c2U+XHJcbiAgICA8L3N2Zz5cclxuICAgIDwvYnV0dG9uPlxyXG4gICAgeyUgfSAlfWAsXHJcbiAgICAnPGgyIGNsYXNzPVwid2lkZ2V0LXRpdGxlXCI+eyU6ICQubGFiZWwgJX08L2gyPicsXHJcbiAgICAnPC9kaXY+JyxcclxuICAgICc8ZGl2IGNsYXNzPVwiY29udGVudCBjYXJkLWNvbnRlbnRcIj4nLFxyXG4gICAgJzxkaXYgY2xhc3M9XCJpdGVtXCI+PGRpdiBjbGFzcz1cImxhYmVsXCI+eyU6ICQkLmNvdW50VGV4dCAlfTwvZGl2PiA8c3BhbiBjbGFzcz1cInZhbHVlXCI+eyU6ICQuY291bnQgJX08L3NwYW4+PHNwYW4gY2xhc3M9XCJ2YWx1ZSBwZXJjZW50XCI+eyU6ICQuY291bnRQZXJjZW50ICV9PC9zcGFuPjwvZGl2PicsXHJcbiAgICAnPGRpdiBjbGFzcz1cIml0ZW1cIj48ZGl2IGNsYXNzPVwibGFiZWxcIj57JTogJCQuc2l6ZVRleHQgJX08L2Rpdj4gPHNwYW4gY2xhc3M9XCJ2YWx1ZVwiPnslOiAkLnNpemUgJX08L3NwYW4+PHNwYW4gY2xhc3M9XCJ2YWx1ZSBwZXJjZW50XCI+eyU6ICQuc2l6ZVBlcmNlbnQgJX08L3NwYW4+PC9kaXY+JyxcclxuICAgICc8ZGl2IGNsYXNzPVwiaXRlbVwiPjxkaXYgY2xhc3M9XCJsYWJlbFwiPnslOiAkJC5zaXplQVZHVGV4dCAlfTwvZGl2PiA8c3BhbiBjbGFzcz1cInZhbHVlXCI+eyU6ICQuc2l6ZUFWRyAlfTwvc3Bhbj48L2Rpdj4nLFxyXG4gICAgJzxkaXYgY2xhc3M9XCJiYXJcIj48L2Rpdj4nLFxyXG4gICAgJzxkaXYgY2xhc3M9XCJpdGVtXCI+PGRpdiBjbGFzcz1cImxhYmVsIHNtYWxsXCI+eyU6ICQkLm9sZGVzdFRleHQgJX08L2Rpdj4gPHNwYW4gY2xhc3M9XCJ2YWx1ZSBzbWFsbFwiPnslOiAkLm9sZGVzdERhdGUgJX08L3NwYW4+PC9kaXY+JyxcclxuICAgICc8ZGl2IGNsYXNzPVwiaXRlbVwiPjxkaXYgY2xhc3M9XCJsYWJlbCBzbWFsbFwiPnslOiAkJC5uZXdlc3RUZXh0ICV9PC9kaXY+IDxzcGFuIGNsYXNzPVwidmFsdWUgc21hbGxcIj57JTogJC5uZXdlc3REYXRlICV9PC9zcGFuPjwvZGl2PicsXHJcbiAgICAnPC9kaXY+JyxcclxuICAgICc8L2Rpdj4nLFxyXG4gIF0pLFxyXG4gIGxhc3RDbGVhckRhdGVUZW1wbGF0ZTogbmV3IFNpbXBsYXRlKFtcclxuICAgICc8c3BhbiBjbGFzcz1cImxhYmVsXCI+JyxcclxuICAgICd7JTogJCQubGFzdENsZWFyZWRUZXh0ICV9JyxcclxuICAgICc8L3NwYW4nLFxyXG4gICAgJzxzcGFuIGNsYXNzPVwidmFsdWVcIj4nLFxyXG4gICAgJyB7JTogJC5sYXN0Q2xlYXJlZERhdGUgJX0nLFxyXG4gICAgJzwvc3BhbicsXHJcbiAgXSksXHJcbiAgLyoqXHJcbiAgICogQHByb3BlcnR5IHtzdHJpbmd9XHJcbiAgICogU29IbyBjbGFzcyB0byBiZSBhcHBsaWVkIG9uIG11bHRpIGNvbHVtbi5cclxuICAgKi9cclxuICBtdWx0aUNvbHVtbkNsYXNzOiAnZm91cicsXHJcbiAgLyoqXHJcbiAgICogQHByb3BlcnR5IHtudW1iZXJ9XHJcbiAgICogTnVtYmVyIG9mIGNvbHVtbnMgaW4gdmlld1xyXG4gICAqL1xyXG4gIG11bHRpQ29sdW1uQ291bnQ6IDMsXHJcbiAgb25Jbml0OiBmdW5jdGlvbiBvbkluaXQoKSB7XHJcbiAgICB0aGlzLm9uTG9hZCgpO1xyXG4gICAgaWYgKHRoaXMub3duZXIpIHtcclxuICAgICAgYXNwZWN0LmFmdGVyKHRoaXMub3duZXIsICdzaG93JywgKCkgPT4ge1xyXG4gICAgICAgIHRoaXMub25SZWZyZXNoVmlldygpO1xyXG4gICAgICB9KTtcclxuXHJcbiAgICAgIGFzcGVjdC5hZnRlcih0aGlzLm93bmVyLCAnc2F2ZScsICgpID0+IHtcclxuICAgICAgICB0aGlzLm9uU2F2ZSgpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9LFxyXG4gIG9uTG9hZDogZnVuY3Rpb24gb25Mb2FkKCkge1xyXG4gICAgY29uc3Qgb3B0aW9ucyA9IG9mZmxpbmVNYW5hZ2VyLmdldE9wdGlvbnMoKTtcclxuICAgIHRoaXMuX29wdGlvbnMgPSB7XHJcbiAgICAgIGNsZWFyT2xkZXJUaGFuOiBvcHRpb25zLmNsZWFyT2xkZXJUaGFuLFxyXG4gICAgICBsYXN0Q2xlYXJlZERhdGU6IG9wdGlvbnMubGFzdENsZWFyZWREYXRlLFxyXG4gICAgfTtcclxuICAgIHRoaXMuX29sZGVyVGhhblZhbHVlcyA9IG9mZmxpbmVNYW5hZ2VyLmdldENsZWFyT2xkZXJUaGFuVmFsdWVzKCk7XHJcbiAgICB0aGlzLmluaXRVSShvcHRpb25zLmNsZWFyT2xkZXJUaGFuKTtcclxuICB9LFxyXG4gIGluaXRVSTogZnVuY3Rpb24gaW5pdFVJKGNsZWFyT2xkZXJUaGFuKSB7XHJcbiAgICBpZiAoIXRoaXMuX29sZGVyVGhhbkRyb3Bkb3duKSB7XHJcbiAgICAgIHRoaXMuX29sZGVyVGhhbkRyb3Bkb3duID0gbmV3IERyb3Bkb3duKHtcclxuICAgICAgICBpZDogYG9sZGVyVGhhbi1kcm9wZG93biAke3RoaXMuaWR9YCxcclxuICAgICAgICBvblNlbGVjdDogdGhpcy5vbGRlclRoYW5TZWxlY3QsXHJcbiAgICAgICAgb25TZWxlY3RTY29wZTogdGhpcyxcclxuICAgICAgICBkcm9wZG93bkNsYXNzOiAnaW5wdXQteHMnLFxyXG4gICAgICB9KTtcclxuICAgICAgdGhpcy5fb2xkZXJUaGFuRHJvcGRvd24uY3JlYXRlTGlzdCh7XHJcbiAgICAgICAgaXRlbXM6IHRoaXMuX29sZGVyVGhhblZhbHVlcyxcclxuICAgICAgICBkZWZhdWx0VmFsdWU6IHRoaXMuX29wdGlvbnMuY2xlYXJPbGRlclRoYW4sXHJcbiAgICAgIH0pO1xyXG4gICAgICAkKHRoaXMuX29sZGVyVGhhbk5vZGUpLmFwcGVuZCh0aGlzLl9vbGRlclRoYW5Ecm9wZG93bi5kb21Ob2RlKTtcclxuICAgICAgdGhpcy5zZXRMYXN0Q2xlYXJlZERhdGUodGhpcy5fb3B0aW9ucy5sYXN0Q2xlYXJlZERhdGUpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICB0aGlzLl9vbGRlclRoYW5Ecm9wZG93bi5zZXRWYWx1ZShjbGVhck9sZGVyVGhhbik7XHJcbiAgICAgIH0gY2F0Y2ggKGVycikge1xyXG4gICAgICAgIC8vIFRoZXJlIGlzIGEgd2llcmQgbGlmZWN5Y2xlIGVycm9yIGdvaW5nIG9uIGhlcmUsIHdpdGggaW5pdFVJIGJlaW5nIGNhbGxlZCB0d2ljZVxyXG4gICAgICAgIC8vIFRPRE86IFJlZmFjdG9yXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIHNldExhc3RDbGVhcmVkRGF0ZTogZnVuY3Rpb24gc2V0TGFzdENsZWFyZWREYXRlKGxhc3RDbGVhcmVkRGF0ZSkge1xyXG4gICAgY29uc3QgdmFsdWVzID0ge1xyXG4gICAgICBsYXN0Q2xlYXJlZERhdGU6IChsYXN0Q2xlYXJlZERhdGUpID8gZm9ybWF0LnJlbGF0aXZlRGF0ZShsYXN0Q2xlYXJlZERhdGUpIDogJycsXHJcbiAgICB9O1xyXG4gICAgdGhpcy5fb3B0aW9ucy5sYXN0Q2xlYXJlZERhdGUgPSBsYXN0Q2xlYXJlZERhdGU7XHJcbiAgICBjb25zdCBjbGVhckRhdGVOb2RlID0gdGhpcy5sYXN0Q2xlYXJEYXRlVGVtcGxhdGUuYXBwbHkodmFsdWVzLCB0aGlzKTtcclxuICAgICQodGhpcy5fbGFzdENsZWFyRGF0ZU5vZGUpLmVtcHR5KCkuYXBwZW5kKGNsZWFyRGF0ZU5vZGUpO1xyXG4gIH0sXHJcbiAgb2xkZXJUaGFuU2VsZWN0OiBmdW5jdGlvbiBvbGRlclRoYW5TZWxlY3QoKSB7XHJcbiAgICB0aGlzLl9vcHRpb25zLmNsZWFyT2xkZXJUaGFuID0gdGhpcy5fb2xkZXJUaGFuRHJvcGRvd24uZ2V0VmFsdWUoKTtcclxuICB9LFxyXG4gIG9uU2hvd1VzYWdlOiBmdW5jdGlvbiBvblNob3dVc2FnZSgpIHtcclxuICAgIGlmICh0aGlzLl9zaG93aW5nVXNhZ2UpIHtcclxuICAgICAgdGhpcy5kZXN0cm95VXNhZ2UoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuc2hvd1Byb2Nlc3NpbmcodHJ1ZSwgdGhpcy5jYWxjdWxhdGluZ1VzYWdlVGV4dCk7XHJcbiAgICAgIHRoaXMuZ2V0VXNhZ2UoKS50aGVuKChkYXRhKSA9PiB7XHJcbiAgICAgICAgdGhpcy5zaG93UHJvY2Vzc2luZyhmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5wcm9jZXNzVXNhZ2UoZGF0YSk7XHJcbiAgICAgIH0sIChlcnIpID0+IHtcclxuICAgICAgICB0aGlzLnNob3dFcnJvcihyZXNvdXJjZS5lcnJvckNhbGN1bGF0aW5nVGV4dCwgZXJyKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBzaG93UHJvY2Vzc2luZzogZnVuY3Rpb24gc2hvd1Byb2Nlc3Npbmcoc2hvdywgbWVzc2FnZSkge1xyXG4gICAgaWYgKHNob3cpIHtcclxuICAgICAgaWYgKHRoaXMudXNhZ2VOb2RlKSB7XHJcbiAgICAgICAgdGhpcy5faW5kaWNhdG9yID0gbmV3IEJ1c3lJbmRpY2F0b3Ioe1xyXG4gICAgICAgICAgaWQ6ICdidXN5SW5kaWNhdG9yX19vZmZsaW5ldXNhZ2UnLFxyXG4gICAgICAgICAgbGFiZWw6IG1lc3NhZ2UsXHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgQXBwLm1vZGFsLmRpc2FibGVDbG9zZSA9IHRydWU7XHJcbiAgICAgICAgQXBwLm1vZGFsLnNob3dUb29sYmFyID0gZmFsc2U7XHJcbiAgICAgICAgQXBwLm1vZGFsLmFkZCh0aGlzLl9pbmRpY2F0b3IpO1xyXG4gICAgICAgIHRoaXMuX2luZGljYXRvci5zdGFydCgpO1xyXG4gICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBpZiAodGhpcy5faW5kaWNhdG9yKSB7XHJcbiAgICAgICAgdGhpcy5faW5kaWNhdG9yLmNvbXBsZXRlKHRydWUpO1xyXG4gICAgICAgIHRoaXMuX2luZGljYXRvciA9IG51bGw7XHJcbiAgICAgIH1cclxuICAgICAgQXBwLm1vZGFsLmRpc2FibGVDbG9zZSA9IGZhbHNlO1xyXG4gICAgICBBcHAubW9kYWwuaGlkZSgpO1xyXG5cclxuICAgICAgdGhpcy5kZXN0cm95VXNhZ2UoKTtcclxuICAgIH1cclxuICB9LFxyXG4gIHNob3dFcnJvcjogZnVuY3Rpb24gc2hvd0Vycm9yKG1lc3NhZ2UsIGVycm9yKSB7XHJcbiAgICBpZiAodGhpcy51c2FnZU5vZGUpIHtcclxuICAgICAgdGhpcy5zaG93UHJvY2Vzc2luZyhmYWxzZSk7XHJcbiAgICAgIEVycm9yTWFuYWdlci5hZGRTaW1wbGVFcnJvcihtZXNzYWdlLCBlcnJvcik7XHJcbiAgICAgIEVycm9yTWFuYWdlci5zaG93RXJyb3JEaWFsb2cobnVsbCwgbWVzc2FnZSwgKCkgPT4ge1xyXG4gICAgICAgIHRoaXMub25SZWZyZXNoVmlldygpO1xyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9LFxyXG4gIG9uQ2xlYXJBbGxEYXRhOiBmdW5jdGlvbiBvbkNsZWFyQWxsRGF0YSgpIHtcclxuICAgIHRoaXMuc2hvd1Byb2Nlc3NpbmcodHJ1ZSwgdGhpcy5jbGVhcmluZ0RhdGFUZXh0KTtcclxuICAgIG9mZmxpbmVNYW5hZ2VyLmNsZWFyQWxsRGF0YSgpLnRoZW4oKCkgPT4ge1xyXG4gICAgICB0aGlzLnNob3dQcm9jZXNzaW5nKGZhbHNlKTtcclxuICAgICAgdGhpcy5zZXRMYXN0Q2xlYXJlZERhdGUobW9tZW50KCkudG9EYXRlKCkpO1xyXG4gICAgfSwgKGVycikgPT4ge1xyXG4gICAgICB0aGlzLnNob3dFcnJvcihyZXNvdXJjZS5lcnJvckNsZWFyaW5nRGF0YVRleHQsIGVycik7XHJcbiAgICB9KTtcclxuICB9LFxyXG4gIG9uQ2xlYXJSZWNlbnREYXRhOiBmdW5jdGlvbiBvbkNsZWFyUmVjZW50RGF0YSgpIHtcclxuICAgIHRoaXMuc2hvd1Byb2Nlc3NpbmcodHJ1ZSwgdGhpcy5jbGVhcmluZ0RhdGFUZXh0KTtcclxuICAgIG9mZmxpbmVNYW5hZ2VyLmNsZWFyUmVjZW50RGF0YSh0aGlzLl9vcHRpb25zLmNsZWFyT2xkZXJUaGFuKS50aGVuKCgpID0+IHtcclxuICAgICAgdGhpcy5zaG93UHJvY2Vzc2luZyhmYWxzZSk7XHJcbiAgICAgIHRoaXMuc2V0TGFzdENsZWFyZWREYXRlKG1vbWVudCgpLnRvRGF0ZSgpKTtcclxuICAgIH0sIChlcnIpID0+IHtcclxuICAgICAgdGhpcy5zaG93RXJyb3IocmVzb3VyY2UuZXJyb3JDbGVhcmluZ0RhdGFUZXh0LCBlcnIpO1xyXG4gICAgfSk7XHJcbiAgfSxcclxuICBvbkNsZWFyQnJpZWZjYXNlZERhdGE6IGZ1bmN0aW9uIG9uQ2xlYXJCcmllZmNhc2VkRGF0YSgpIHtcclxuICAgIHRoaXMuc2hvd1Byb2Nlc3NpbmcodHJ1ZSwgdGhpcy5jbGVhcmluZ0RhdGFUZXh0KTtcclxuICAgIG9mZmxpbmVNYW5hZ2VyLmNsZWFyQnJpZWZjYXNlRGF0YSh0aGlzLl9vcHRpb25zLmNsZWFyT2xkZXJUaGFuKS50aGVuKCgpID0+IHtcclxuICAgICAgdGhpcy5zaG93UHJvY2Vzc2luZyhmYWxzZSk7XHJcbiAgICAgIHRoaXMuc2V0TGFzdENsZWFyZWREYXRlKG1vbWVudCgpLnRvRGF0ZSgpKTtcclxuICAgIH0sIChlcnIpID0+IHtcclxuICAgICAgdGhpcy5zaG93RXJyb3IocmVzb3VyY2UuZXJyb3JDbGVhcmluZ0RhdGFUZXh0LCBlcnIpO1xyXG4gICAgfSk7XHJcbiAgfSxcclxuICBnZXRVc2FnZTogZnVuY3Rpb24gZ2V0VXNhZ2UoKSB7XHJcbiAgICByZXR1cm4gb2ZmbGluZU1hbmFnZXIuZ2V0VXNhZ2UoKTtcclxuICB9LFxyXG4gIHByb2Nlc3NVc2FnZTogZnVuY3Rpb24gcHJvY2Vzc1VzYWdlKHVzYWdlKSB7XHJcbiAgICBsZXQgaTtcclxuICAgIGNvbnN0IGRvY2ZyYWcgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KCk7XHJcbiAgICBjb25zdCB0b3RhbEl0ZW0gPSB7fTtcclxuICAgIGxldCBvbGRlc3REYXRlO1xyXG4gICAgbGV0IG5ld2VzdERhdGU7XHJcbiAgICB0b3RhbEl0ZW0uaWNvbkNsYXNzID0gJ3NlcnZlcic7XHJcbiAgICB0b3RhbEl0ZW0ubGFiZWwgPSB0aGlzLnRvdGFsVXNhZ2VUZXh0O1xyXG4gICAgdG90YWxJdGVtLmVudGl0eU5hbWUgPSAnKic7XHJcbiAgICB0b3RhbEl0ZW0uc2l6ZSA9IGZvcm1hdC5iaWdOdW1iZXIodXRpbGl0eS5nZXRWYWx1ZSh1c2FnZSwgJ3NpemUnKSk7XHJcbiAgICB0b3RhbEl0ZW0uc2l6ZVBlcmNlbnQgPSBmb3JtYXQucGVyY2VudCgxKTtcclxuICAgIHRvdGFsSXRlbS5jb3VudCA9IGZvcm1hdC5iaWdOdW1iZXIodXRpbGl0eS5nZXRWYWx1ZSh1c2FnZSwgJ2NvdW50JykpO1xyXG4gICAgdG90YWxJdGVtLmNvdW50UGVyY2VudCA9IGZvcm1hdC5wZXJjZW50KDEpO1xyXG4gICAgdG90YWxJdGVtLnNpemVBVkcgPSBmb3JtYXQuYmlnTnVtYmVyKHV0aWxpdHkuZ2V0VmFsdWUodXNhZ2UsICdzaXplQVZHJykpO1xyXG4gICAgb2xkZXN0RGF0ZSA9IHV0aWxpdHkuZ2V0VmFsdWUodXNhZ2UsICdvbGRlc3REYXRlJyk7XHJcbiAgICBuZXdlc3REYXRlID0gdXRpbGl0eS5nZXRWYWx1ZSh1c2FnZSwgJ25ld2VzdERhdGUnKTtcclxuICAgIHRvdGFsSXRlbS5vbGRlc3REYXRlID0gKG9sZGVzdERhdGUpID8gZm9ybWF0LnJlbGF0aXZlRGF0ZShvbGRlc3REYXRlKSA6ICcnO1xyXG4gICAgdG90YWxJdGVtLm5ld2VzdERhdGUgPSAobmV3ZXN0RGF0ZSkgPyBmb3JtYXQucmVsYXRpdmVEYXRlKG5ld2VzdERhdGUpIDogJyc7XHJcbiAgICBjb25zdCBoZWFkZXJOb2RlID0gJCh0aGlzLnVzYWdlSGVhZGVyVGVtcGxhdGUuYXBwbHkodG90YWxJdGVtLCB0aGlzKSk7XHJcbiAgICBjb25zdCBjb2x1bW5IZWFkZXJOb2RlID0gJCgnPGRpdiBjbGFzcz1cInJvd1wiPjwvZGl2PicpLmFwcGVuZChoZWFkZXJOb2RlKTtcclxuICAgIGRvY2ZyYWcuYXBwZW5kQ2hpbGQoY29sdW1uSGVhZGVyTm9kZS5nZXQoMCkpO1xyXG4gICAgdGhpcy5fc2VsZWN0RmllbGRzID0ge307XHJcbiAgICBjb25zdCBlbnRpdGllcyA9IHVzYWdlLmVudGl0aWVzO1xyXG4gICAgbGV0IHJvdyA9IFtdO1xyXG4gICAgZm9yIChpID0gMDsgaSA8IGVudGl0aWVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGNvbnN0IGVudGl0eSA9IGVudGl0aWVzW2ldO1xyXG4gICAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IGl0ZW0gPSB7fTtcclxuICAgICAgICBpdGVtLmljb25DbGFzcyA9IGVudGl0eS5pY29uQ2xhc3M7XHJcbiAgICAgICAgaXRlbS5sYWJlbCA9IGVudGl0eS5kZXNjcmlwdGlvbjtcclxuICAgICAgICBpdGVtLmVudGl0eU5hbWUgPSBlbnRpdHkuZW50aXR5TmFtZTtcclxuICAgICAgICBpdGVtLnNpemUgPSBmb3JtYXQuYmlnTnVtYmVyKHV0aWxpdHkuZ2V0VmFsdWUoZW50aXR5LCAnc2l6ZScpKTtcclxuICAgICAgICBpdGVtLnNpemVQZXJjZW50ID0gZm9ybWF0LnBlcmNlbnQodXRpbGl0eS5nZXRWYWx1ZShlbnRpdHksICdzaXplUGVyY2VudCcpKTtcclxuICAgICAgICBpdGVtLnNpemVBVkcgPSBmb3JtYXQuYmlnTnVtYmVyKHV0aWxpdHkuZ2V0VmFsdWUoZW50aXR5LCAnc2l6ZUFWRycpKTtcclxuICAgICAgICBpdGVtLmNvdW50ID0gZm9ybWF0LmJpZ051bWJlcih1dGlsaXR5LmdldFZhbHVlKGVudGl0eSwgJ2NvdW50JykpO1xyXG4gICAgICAgIGl0ZW0uY291bnRQZXJjZW50ID0gZm9ybWF0LnBlcmNlbnQodXRpbGl0eS5nZXRWYWx1ZShlbnRpdHksICdjb3VudFBlcmNlbnQnKSk7XHJcbiAgICAgICAgb2xkZXN0RGF0ZSA9IHV0aWxpdHkuZ2V0VmFsdWUoZW50aXR5LCAnb2xkZXN0RGF0ZScpO1xyXG4gICAgICAgIG5ld2VzdERhdGUgPSB1dGlsaXR5LmdldFZhbHVlKGVudGl0eSwgJ25ld2VzdERhdGUnKTtcclxuICAgICAgICBpdGVtLm9sZGVzdERhdGUgPSAob2xkZXN0RGF0ZSkgPyBmb3JtYXQucmVsYXRpdmVEYXRlKG9sZGVzdERhdGUpIDogJyc7XHJcbiAgICAgICAgaXRlbS5uZXdlc3REYXRlID0gKG5ld2VzdERhdGUpID8gZm9ybWF0LnJlbGF0aXZlRGF0ZShuZXdlc3REYXRlKSA6ICcnO1xyXG4gICAgICAgIGNvbnN0IGl0ZW1Ob2RlID0gJCh0aGlzLnVzYWdlSXRlbVRlbXBsYXRlLmFwcGx5KGl0ZW0sIHRoaXMpKS5nZXQoMCk7XHJcblxyXG4gICAgICAgIGNvbnN0IGNvbHVtbiA9ICQoYDxkaXYgY2xhc3M9XCIke3RoaXMubXVsdGlDb2x1bW5DbGFzc30gY29sdW1uc1wiPmApLmFwcGVuZChpdGVtTm9kZSk7XHJcbiAgICAgICAgcm93LnB1c2goY29sdW1uKTtcclxuICAgICAgICBpZiAoKGkgKyAxKSAlIHRoaXMubXVsdGlDb2x1bW5Db3VudCA9PT0gMCB8fCBpID09PSBlbnRpdGllcy5sZW5ndGggLSAxKSB7XHJcbiAgICAgICAgICBjb25zdCByb3dUZW1wbGF0ZSA9ICQoJzxkaXYgY2xhc3M9XCJyb3dcIj48L2Rpdj4nKTtcclxuICAgICAgICAgIHJvdy5mb3JFYWNoKChlbGVtZW50KSA9PiB7XHJcbiAgICAgICAgICAgIHJvd1RlbXBsYXRlLmFwcGVuZChlbGVtZW50KTtcclxuICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgZG9jZnJhZy5hcHBlbmRDaGlsZChyb3dUZW1wbGF0ZS5nZXQoMCkpO1xyXG4gICAgICAgICAgcm93ID0gW107XHJcbiAgICAgICAgfVxyXG4gICAgICB9IGNhdGNoIChlcnIpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhlcnIpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgICQodGhpcy51c2FnZU5vZGUpLmFwcGVuZChkb2NmcmFnKTtcclxuICAgIHRoaXMuX3Nob3dpbmdVc2FnZSA9IHRydWU7XHJcbiAgfSxcclxuICBkZXN0cm95VXNhZ2U6IGZ1bmN0aW9uIGRlc3Ryb3lVc2FnZSgpIHtcclxuICAgIGlmICh0aGlzLnVzYWdlTm9kZSkge1xyXG4gICAgICBjb25zdCBub2RlID0gJCgnPGRpdj48L2Rpdj4nKTtcclxuICAgICAgJCh0aGlzLnVzYWdlTm9kZSkuZW1wdHkoKS5hcHBlbmQobm9kZSk7XHJcbiAgICAgIHRoaXMuX3Nob3dpbmdVc2FnZSA9IGZhbHNlO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgb25SZWZyZXNoVmlldzogZnVuY3Rpb24gb25SZWZyZXNoVmlldygpIHtcclxuICAgIHRoaXMuZGVzdHJveVVzYWdlKCk7XHJcbiAgICB0aGlzLm9uTG9hZCgpO1xyXG4gIH0sXHJcbiAgZGVzdHJveTogZnVuY3Rpb24gZGVzdHJveSgpIHtcclxuICAgIGlmICh0aGlzLl9vbGRlclRoYW5Ecm9wZG93bikge1xyXG4gICAgICB0aGlzLl9vbGRlclRoYW5Ecm9wZG93bi5kZXN0cm95KCk7XHJcbiAgICB9XHJcbiAgICB0aGlzLmluaGVyaXRlZChhcmd1bWVudHMpO1xyXG4gIH0sXHJcbiAgb25TYXZlOiBmdW5jdGlvbiBvblNhdmUoKSB7XHJcbiAgICBjb25zdCBvcHRpb25zID0gb2ZmbGluZU1hbmFnZXIuZ2V0T3B0aW9ucygpO1xyXG4gICAgb3B0aW9ucy5jbGVhck9sZGVyVGhhbiA9IHRoaXMuX29wdGlvbnMuY2xlYXJPbGRlclRoYW47XHJcbiAgICBvZmZsaW5lTWFuYWdlci5zYXZlT3B0aW9ucyhvcHRpb25zKTtcclxuICB9LFxyXG5cclxufSk7XHJcbmNvbnN0IHJ2bSA9IG5ldyBSZWxhdGVkVmlld01hbmFnZXIoKTtcclxucnZtLnJlZ2lzdGVyVHlwZSgnb2ZmbGluZVVzYWdlV2lkZ2V0JywgX19jbGFzcyk7XHJcbmV4cG9ydCBkZWZhdWx0IF9fY2xhc3M7XHJcbiJdfQ==
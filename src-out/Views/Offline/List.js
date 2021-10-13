define('crm/Views/Offline/List', ['module', 'exports', 'dojo/_base/declare', 'argos/_ListBase', '../../Format', 'dojo/_base/lang', 'argos/Models/Types', './Detail', 'argos/I18n'], function (module, exports, _declare, _ListBase2, _Format, _lang, _Types, _Detail, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _ListBase3 = _interopRequireDefault(_ListBase2);

  var _Format2 = _interopRequireDefault(_Format);

  var _lang2 = _interopRequireDefault(_lang);

  var _Types2 = _interopRequireDefault(_Types);

  var _Detail2 = _interopRequireDefault(_Detail);

  var _I18n2 = _interopRequireDefault(_I18n);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var resource = (0, _I18n2.default)('offlineList'); /* Copyright 2017 Infor
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

  exports.default = (0, _declare2.default)('crm.Views.Offline.List', [_ListBase3.default], {
    id: 'offline_list',
    detailView: 'offline_detail',
    enableSearch: false,
    enableActions: true,
    resourceKind: '',
    entityName: '',
    titleText: resource.titleText,
    offlineText: resource.offlineText,
    pageSize: 1000,
    itemIndicatorTemplate: new Simplate(['<span{% if ($.iconCls) { %} class="{%= $.iconCls %}" {% } %} style="color:black; margin:0" >', '{% if ($.showIcon === false) { %}', '{%: $.label + " " +  $.valueText %}', '{% } else if ($.indicatorIcon && !$.iconCls) { %}', '<img src="{%= $.indicatorIcon %}" alt="{%= $.label %}" />', '{% } %}', '</span>']),
    itemTemplate: new Simplate(['<p>{%: $$.getDescription($) %}</p>', '<p class="micro-text">{%: $$.getOfflineDate($) %}</p>']),
    getDescription: function getDescription(entry) {
      return this._model.getEntityDescription(entry);
    },
    getOfflineDate: function getOfflineDate(entry) {
      if (entry && entry.$offlineDate) {
        return _Format2.default.relativeDate(entry.$offlineDate);
      }
      return '';
    },
    getItemIconClass: function getItemIconClass(entry) {
      var iconClass = void 0;
      iconClass = this._model.getIconClass(entry);
      if (!iconClass) {
        iconClass = 'url';
      }
      return iconClass;
    },
    show: function show(options) {
      this._initOfflineView(options);
      this.inherited(show, arguments);
    },
    _initOfflineView: function _initOfflineView(options) {
      this.offlineContext = {
        parentEntry: null,
        parentEntityId: null,
        entityName: null,
        entityId: null,
        viewId: null,
        source: null
      };
      this.refreshRequired = true;
      _lang2.default.mixin(this.offlineContext, options.offlineContext);
      this._model = App.ModelManager.getModel(this.offlineContext.entityName, _Types2.default.OFFLINE);
      this._entityView = this.getEntityView();
      if (this._entityView && this._entityView._clearGroupMode && this._entityView.groupsMode) {
        this._entityView._clearGroupMode(); // For list views that are left in group mode we need to reset to use the card template.
      }
    },
    onTransitionTo: function onTransitionTo() {
      this.inherited(onTransitionTo, arguments);
      App.setToolBarMode(false);
    },
    _applyStateToQueryOptions: function _applyStateToQueryOptions(queryOptions) {
      if (this.offlineContext && this.offlineContext.queryExpression) {
        queryOptions.filter = this.offlineContext.queryExpression;
      }

      return queryOptions;
    },
    _hasValidOptions: function _hasValidOptions(options) {
      return options;
    },
    createToolLayout: function createToolLayout() {
      this.toolsAdded = false;
      return { tbar: [] };
    },
    createIndicatorLayout: function createIndicatorLayout() {
      return this.itemIndicators || (this.itemIndicators = [{
        id: 'offline',
        showIcon: false,
        location: 'top',
        onApply: function onApply(entry, view) {
          this.isEnable = true;
          this.valueText = view.getOfflineDate(entry);
          this.label = view.offlineText;
        }
      }]);
    },
    getEntityView: function getEntityView() {
      var newViewId = this.id + '_' + this.offlineContext.viewId;
      var view = App.getView(this.offlineContext.viewId);

      if (this._entityView) {
        this._entityView.destroy();
        this._entityView = null;
      }

      if (view) {
        var ViewCtor = view.constructor;
        this._entityView = new ViewCtor({ id: newViewId });
      }
      return this._entityView;
    },
    createItemRowNode: function createItemRowNode(entry) {
      if (this._entityView) {
        return this._entityView.createItemRowNode(entry);
      }
      return this.inherited(createItemRowNode, arguments);
    },
    navigateToDetailView: function navigateToDetailView(key, descriptor, additionalOptions) {
      this.navigateToOfflineDetailView(key, descriptor, additionalOptions);
    },
    navigateToOfflineDetailView: function navigateToOfflineDetailView(key, descriptor, additionalOptions) {
      var entry = this.entries && this.entries[key];
      var desc = this.getDescription(entry);
      var view = this.getDetailView();
      var options = {
        descriptor: entry.description || desc, // keep for backwards compat
        title: entry.description || desc,
        key: key,
        fromContext: this,
        offlineContext: {
          entityId: this._model.getEntityId(entry),
          entityName: this._model.entityName,
          viewId: this._model.detailViewId,
          offlineDate: entry.$offlineDate,
          source: entry
        }
      };
      if (additionalOptions) {
        options = _lang2.default.mixin(options, additionalOptions);
      }

      // Ensure we have a valid offline detail view and the
      // entity has a detail view that it can use for layout.
      var modelDetailView = this._model.detailViewId;
      var impliedDetailView = this._model.entityName.toLowerCase() + '_detail';
      if (view && App.getView(modelDetailView || impliedDetailView)) {
        view.show(options);
      }
    },
    getDetailView: function getDetailView() {
      var viewId = this.detailView + '_' + this._model.entityName;
      var view = this.app.getView(viewId);

      if (view) {
        return view;
      }

      this.app.registerView(new _Detail2.default({ id: viewId }));
      view = this.app.getView(viewId);
      return view;
    }

  });
  module.exports = exports['default'];
});
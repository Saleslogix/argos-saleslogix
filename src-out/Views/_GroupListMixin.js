define("crm/Views/_GroupListMixin", ["exports", "dojo/_base/declare", "dojo/json", "argos/Utility", "argos/_ListBase", "../GroupUtility", "dojo/when", "dojo/_base/lang", "argos/Store/SData", "dojo/Deferred", "../Action", "../Models/Activity/ActivityTypeText", "argos/I18n"], function (_exports, _declare, _json, _Utility, _ListBase2, _GroupUtility, _when, _lang, _SData, _Deferred, _Action, _ActivityTypeText, _I18n) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports["default"] = void 0;
  _declare = _interopRequireDefault(_declare);
  _json = _interopRequireDefault(_json);
  _Utility = _interopRequireDefault(_Utility);
  _ListBase2 = _interopRequireDefault(_ListBase2);
  _GroupUtility = _interopRequireDefault(_GroupUtility);
  _when = _interopRequireDefault(_when);
  _lang = _interopRequireDefault(_lang);
  _SData = _interopRequireDefault(_SData);
  _Deferred = _interopRequireDefault(_Deferred);
  _Action = _interopRequireDefault(_Action);
  _ActivityTypeText = _interopRequireDefault(_ActivityTypeText);
  _I18n = _interopRequireDefault(_I18n);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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

  /**
   * @module crm/Views/_GroupListMixin
   */
  var resource = (0, _I18n["default"])('groupListMixin');
  /**
   * @class
   * @alias module:crm/Views/_GroupListMixin
   * @mixin
   * @classdesc Mixin for slx group list layouts.
   * @since 3.1
   */

  var __class = (0, _declare["default"])('crm.Views._GroupListMixin', null,
  /** @lends module:crm/Views/_GroupListMixin.prototype */
  {
    noDefaultGroupText: resource.noDefaultGroupText,
    currentGroupNotFoundText: resource.currentGroupNotFoundText,
    groupTemplateSummaryText: resource.groupTemplateSummaryText,
    groupTemplateDetailText: resource.groupTemplateDetailText,
    groupsModeText: resource.groupsModeText,
    hasDefaultGroup: true,
    noDefaultGroupTemplate: new Simplate(['<li class="no-data" data-action="openConfigure">', '<p class="listview-heading">{%= $$._getNoDefaultGroupMessage() %}</p>', '</li>']),
    currentGoupNotFoundTemplate: new Simplate(['<li class="no-data">', '<p class="listview-heading">{%= $$._getCurrentGroupNotFoundMessage() %}</p>', '</li>']),
    _getNoDefaultGroupMessage: function _getNoDefaultGroupMessage() {
      return resource.noDefaultGroupText;
    },
    _getCurrentGroupNotFoundMessage: function _getCurrentGroupNotFoundMessage() {
      return resource.currentGroupNotFoundText;
    },
    openConfigure: function openConfigure() {
      if (this._selectGroups) {
        this._selectGroups();
      }
    },
    // View Properties
    entityName: null,
    groupsEnabled: false,
    groupsMode: false,
    currentGroupId: null,
    _currentGroup: null,
    _groupInitialized: false,
    _originalProps: null,
    overrideGroupLayoutName: '@MobileLayout',
    _overrideLayoutInitalized: false,
    _overrideGroupLayout: null,
    enableDynamicGroupLayout: true,
    enableOverrideLayout: false,
    selectedColumns: null,
    layout: null,
    postMixInProperties: function postMixInProperties() {
      if (!App.enableGroups) {
        this.groupsMode = false;
        this.groupsEnabled = false;
      }

      if (this.groupsEnabled) {
        this.groupsMode = true;
      }

      this.inherited(postMixInProperties, arguments);
    },
    startup: function startup() {
      this.createGroupTemplates();
      this.inherited(startup, arguments);
    },
    getTitle: function getTitle(entry, labelProperty) {
      // labelproperty will default to the group's family, which doesn't work with all groups...
      var value = _Utility["default"].getValue(entry, labelProperty);

      if (value) {
        return value;
      } // Try to extract a description


      value = _Utility["default"].getValue(entry, '$descriptor') || _Utility["default"].getValue(entry, 'DESCRIPTION');

      if (value) {
        return value;
      } // Fallback to the first layout item


      var firstLayoutItem = this.layout && this.layout[0];

      if (firstLayoutItem && firstLayoutItem.alias) {
        return _Utility["default"].getValue(entry, firstLayoutItem.alias);
      } // Should never land here


      console.warn("No descriptor found for ".concat(labelProperty)); // eslint-disable-line

      return '';
    },
    requestData: function requestData() {
      try {
        if (!this._groupInitialized && this.groupsMode) {
          $(this.domNode).addClass('list-loading');

          this._setLoading();

          this.initGroup();
        } else {
          this.inherited(requestData, arguments);
        }
      } catch (e) {
        console.error(e); // eslint-disable-line
      }
    },
    joinFields: function joinFields(sep, fields) {
      return _Utility["default"].joinFields(sep, fields);
    },
    getDescriptor: function getDescriptor(entity) {
      return entity.$descriptor || entity.$key || 'unknown';
    },
    getCurrentGroup: function getCurrentGroup() {
      return this._currentGroup;
    },
    setCurrentGroup: function setCurrentGroup(group) {
      if (group) {
        this.hasDefaultGroup = true;
        this._groupInitialized = false;
        this._currentGroup = group;
        this.currentGroupId = group.$key;

        _GroupUtility["default"].setDefaultGroupPreference(this.entityName, group.name);
      }
    },
    getDefaultGroup: function getDefaultGroup() {
      var defaultGroup = null;
      var defaultGroupName = null;
      defaultGroup = _GroupUtility["default"].getDefaultGroup(this.entityName);

      if (defaultGroup) {
        return defaultGroup;
      }

      defaultGroupName = _GroupUtility["default"].getDefaultGroupPreference(this.entityName);

      if (defaultGroupName) {
        this._requestGroup(defaultGroupName);
      } else {
        // No default group preference
        this.set('listContent', this.noDefaultGroupTemplate.apply(this));
        this.hasDefaultGroup = false;
      }

      return null;
    },
    initOverrideGroupLayout: function initOverrideGroupLayout() {
      var _this = this;

      this._requestOverrideGroupLayout().then(function (result) {
        _this._overrideLayoutInitalized = true;
        _this._overrideGroupLayout = result && result.length > 0 ? result[0].layout : null;

        _this.initGroup();
      });
    },
    initGroup: function initGroup() {
      if (this.enableOverrideLayout && !this._overrideLayoutInitalized && !this._overrideGroupLayout) {
        this.initOverrideGroupLayout();
        return;
      }

      var group = this.getCurrentGroup();

      if (!group) {
        group = this.getDefaultGroup();
        this.setCurrentGroup(group);
      }

      if (group) {
        this._onApplyGroup(group);
      }
    },
    clear: function clear() {
      this.inherited(clear, arguments);

      this._clearResolvedEntryCache();
    },
    _onApplyGroup: function _onApplyGroup(group) {
      if (!group) {
        throw new Error('Group not found.');
      }

      this._fieldFormatters = {};

      this._startGroupMode();

      this._clearResolvedEntryCache(); // Set the toolbar title to the current group displayName


      var title = this.getGroupTitle(group);
      App.setPrimaryTitle(title);
      this.set('title', title);

      if (this._groupInitialized) {
        return;
      }

      this.layout = _GroupUtility["default"].getLayout(group);
      this.selectColumns = _GroupUtility["default"].getColumnNames(this.layout);
      this.itemTemplate = this.getItemTemplate(); // Create a custom request that the store will use to execute the group query

      this.request = _GroupUtility["default"].createGroupRequest({
        groupId: group.$key,
        connection: this.getConnection()
      }); // Try to select the entity id as well

      this.selectColumns.push("".concat(group.family, "ID"));
      this.querySelect = this.selectColumns;
      this.queryOrderBy = '';
      this.idProperty = "".concat(group.family.toUpperCase(), "ID");
      this.labelProperty = group.family.toUpperCase();
      this.store = null;
      this.clear(true);
      this.refreshRequired = true;
      this._groupInitialized = true;
      this.requestData();
    },
    _requestOverrideGroupLayout: function _requestOverrideGroupLayout() {
      var def = new _Deferred["default"]();
      var groupName = this.overrideGroupLayoutName;
      var store = new _SData["default"]({
        service: App.services.crm,
        resourceKind: 'groups',
        contractName: 'system',
        where: "((upper(family) eq '".concat(this.entityName.toUpperCase(), "') and (upper(Name) eq '").concat(groupName.toUpperCase(), "'))"),
        include: ['layout', 'tableAliases'],
        idProperty: '$key',
        applicationName: 'slx',
        scope: this
      });

      if (store) {
        var queryResults = store.query();
        (0, _when["default"])(queryResults, function (relatedFeed) {
          def.resolve(relatedFeed);
        }, function () {
          def.resolve(null);
        });
      }

      return def.promise;
    },
    _requestGroup: function _requestGroup(groupName, groupId, onSuccess) {
      var store;

      if (typeof groupName === 'string' && groupName !== '') {
        store = new _SData["default"]({
          service: App.services.crm,
          resourceKind: 'groups',
          contractName: 'system',
          where: "((upper(family) eq '".concat(this.entityName.toUpperCase(), "') and (upper(Name) eq '").concat(groupName.toUpperCase(), "') or PluginId eq '").concat(groupId, "')"),
          include: ['layout', 'tableAliases'],
          idProperty: '$key',
          applicationName: 'slx',
          scope: this
        });
      }

      if (store) {
        var queryResults = store.query();

        (function queryWhen(context, queryResult) {
          try {
            (0, _when["default"])(queryResult, function queryResultFn(groupFeed) {
              if (typeof onSuccess === 'function') {
                onSuccess.apply(this, arguments);
              } else {
                this._onGroupRequestSuccess(groupFeed);
              }
            }.bind(context));
          } catch (error) {
            console.log('Error fetching group data:' + error); // eslint-disable-line
          }
        })(this, queryResults);
      }
    },

    /**
     * Sets the titlebar to the current group's displayName.
     */
    setPrimaryTitle: function setPrimaryTitle() {
      var group = this._currentGroup;

      if (group) {
        var title = this.getGroupTitle(group);
        this.set('title', title);
      }

      this.inherited(setPrimaryTitle, arguments);
    },
    _onGroupRequestSuccess: function _onGroupRequestSuccess(result) {
      if (result.length > 0) {
        var group = result[0];
        this.setCurrentGroup(group);

        _GroupUtility["default"].addToGroupPreferences([group], this.entityName);

        this._onApplyGroup(group);
      } else {
        var title = this.getGroupTitle();
        App.setPrimaryTitle(title);
        this.set('title', title);

        this._selectGroups();
      } // Reload the right menu


      this.onTransitionAway();
      this.loadRightDrawer();
      $(this.domNode).removeClass('list-loading');
      this.listLoading = false;
    },
    _onGroupRequestFaild: function _onGroupRequestFaild() {},

    /**
     *
     * @param {string} group.displayName
     */
    getGroupTitle: function getGroupTitle(group) {
      return group.displayName;
    },

    /**
     *
     */
    getItemTemplate: function getItemTemplate() {
      var layout = this.enableOverrideLayout && this._overrideGroupLayout ? this._overrideGroupLayout : this.layout;

      if (this.enableDynamicGroupLayout) {
        var layoutTemplate = this.getSelectedGroupLayoutTemplate();

        if (layoutTemplate) {
          if (layoutTemplate.type === 'Dynamic') {
            return this.getDynamicLayoutItemTemplate(layout, layoutTemplate.options);
          }

          if (layoutTemplate.template) {
            return new Simplate(layoutTemplate.template);
          }
        }

        return this.defaultGroupLayoutItemTemplate;
      }

      var template = layout.map(this.getItemLayoutTemplate);
      return new Simplate(template);
    },
    getItemLayoutTemplate: function getItemLayoutTemplate(item) {
      var jsonString = _json["default"].stringify(item);

      var template = ['<p class="micro-text"><span class="group-label">', item.caption, "</span> <span class=\"group-entry\">{%= $$.groupTransformValue($[$$.getFieldNameByLayout(".concat(jsonString, ")],").concat(jsonString, ",$$.getFormatterByLayout(").concat(jsonString, ")) %}</span>"), '</p>'].join('');
      return template;
    },
    defaultGroupLayoutItemTemplate: new Simplate(['<p class="micro-text">{%= $$.getGroupFieldValueByIndex($, 0, true) %}</p>', '<p class="micro-text"><span class="group-label">{%= $$.getGroupFieldLabelByIndex(1) %} </span><span class="group-entry">{%= $$.getGroupFieldValueByIndex($, 1, true) %}</span></p>', '<p class="micro-text"><span class="group-label">{%= $$.getGroupFieldLabelByIndex(2) %} </span><span class="group-entry">{%= $$.getGroupFieldValueByIndex($, 2, true) %}</span></p>']),
    createGroupTemplateLayouts: function createGroupTemplateLayouts() {
      this.groupTemplateLayouts = [{
        name: 'Summary',
        displayName: resource.groupTemplateSummaryText,
        type: 'Dynamic',
        options: {
          columns: [{
            id: 'col1',
            rows: 3
          }]
        }
      }, {
        name: 'Detail',
        displayName: resource.groupTemplateDetailText,
        type: 'Dynamic',
        options: {
          columns: [{
            id: 'col1',
            rows: 3
          }, {
            id: 'col2',
            rows: 3
          }, {
            id: 'col3',
            rows: 3
          }]
        }
      }];
      return this.groupTemplateLayouts;
    },
    getSelectedGroupLayoutTemplate: function getSelectedGroupLayoutTemplate() {
      var name = _GroupUtility["default"].getSelectedGroupLayoutTemplate(this.entityName);

      name = name ? name : '';
      var layoutTemplate = null;
      this.groupTemplateLayouts.forEach(function (item) {
        if (item.name === name) {
          layoutTemplate = item;
        }
      });

      if (!layoutTemplate) {
        layoutTemplate = this.groupTemplateLayouts[0];
      }

      return layoutTemplate;
    },
    createGroupTemplates: function createGroupTemplates() {
      this.groupTemplateLayouts = this._createCustomizedLayout(this.createGroupTemplateLayouts(), 'group-templates');
    },
    getDynamicLayoutItemTemplate: function getDynamicLayoutItemTemplate(layout, options) {
      var layoutOptions = this.applyDynamicLayoutOptions(options);
      var rows = 0;
      var columns = 1;
      var column = 1;
      var row = 1;
      columns = layoutOptions.columns.length;
      layoutOptions.columns.forEach(function (item) {
        rows = rows + item.rows;
      });
      var template = [];
      template.push('<div class="group-item">');
      template.push('<p>');
      template.push("{%= $$.getGroupFieldValueByName($,\"".concat(layout[0].propertyPath, "\", true) %}"));
      template.push('</p">');

      for (var i = 0; i < layout.length; i++) {
        var columnItem = layoutOptions.columns[column - 1];

        if (columnItem && column <= columns && i !== 0) {
          if (row === 1) {
            var columnClass = columnItem.clss || '';
            template.push("<div class=\"micro-text group-column ".concat(columnClass, "\">"));
          }

          var item = layout[i];

          if (item && columnItem.rows > 0) {
            if (i !== 0) {
              template.push('<div>');

              if (!columnItem.hideLabels) {
                template.push("<span class=\"group-label\">".concat(this.getGroupFieldLabelByName(item.propertyPath), " </span>"));
              }

              var formatOptions = this.getGroupFieldFormatOptions(item);
              var formatClss = formatOptions.clss || '';

              var jsonString = _json["default"].stringify(formatOptions);

              if (item.format === 'Phone') {
                template.push("<span class=\"hyperlink\" data-action=\"groupInvokeListAction\" data-name=\"callPhone\" data-key=\"{%:$$.getGroupItemKey($)%}\" data-propertyname=\"".concat(item.propertyPath, "\">{%= $$.getGroupFieldValueByName($,\"").concat(item.propertyPath, "\", true,").concat(jsonString, ") %}</span>"));
              } else if (item.propertyPath === 'Email') {
                template.push("<span class=\"hyperlink\" data-action=\"groupInvokeListAction\" data-name=\"sendEmail\" data-key=\"{%:$$.getGroupItemKey($)%}\" data-propertyname=\"".concat(item.propertyPath, "\">{%= $$.getGroupFieldValueByName($,\"").concat(item.propertyPath, "\", true,").concat(jsonString, ") %}</span>"));
              } else {
                template.push("<span class=\"group-entry ".concat(formatClss, "\">{%= $$.getGroupFieldValueByName($,\"").concat(item.propertyPath, "\", true,").concat(jsonString, ") %}</span>"));
              }

              template.push('</div>');
            }
          }

          row++;

          if (row === columnItem.rows + 1) {
            row = 1;
            column++;
            template.push('</div>');
          }
        }
      }

      if (row !== 1) {
        template.push('</div>');
      }

      template.push('</div>');
      return new Simplate(template);
    },
    applyDynamicLayoutOptions: function applyDynamicLayoutOptions(options) {
      var layoutOptions = {
        columns: [{
          rows: 3
        }]
      };

      _lang["default"].mixin(layoutOptions, options);

      return layoutOptions;
    },
    getGroupItemKey: function getGroupItemKey(groupEntry) {
      return groupEntry[this.idProperty];
    },
    getGroupFieldFormatOptions: function getGroupFieldFormatOptions(layoutItem) {
      var formatter = this.getFormatterByLayout(layoutItem);
      var options = {
        formatString: formatter && formatter.formatString ? formatter.formatString : null
      };

      if (formatter && formatter.options) {
        _lang["default"].mixin(options, formatter.options);
      }

      return options;
    },
    getGroupFieldLabelByName: function getGroupFieldLabelByName(name) {
      var layout = this.enableOverrideLayout && this._overrideGroupLayout ? this._overrideGroupLayout : this.layout;
      var layoutItem = null;
      layout.forEach(function (item) {
        if (item.propertyPath === name) {
          layoutItem = item;
        }
      });

      if (layoutItem) {
        return layoutItem.caption;
      }

      return '';
    },
    getGroupFieldValueByName: function getGroupFieldValueByName(entry, name, applyFormat, formatOptions) {
      var layout = this.enableOverrideLayout && this._overrideGroupLayout ? this._overrideGroupLayout : this.layout;
      var layoutItem = null;
      layout.forEach(function (item) {
        if (item.propertyPath === name) {
          layoutItem = item;
        }
      });
      return this.getGroupFieldValue(entry, layoutItem, applyFormat, formatOptions);
    },
    getGroupFieldLabelByIndex: function getGroupFieldLabelByIndex(layoutIndex) {
      var layout = this.enableOverrideLayout && this._overrideGroupLayout ? this._overrideGroupLayout : this.layout;

      if (layout[layoutIndex]) {
        return layout[layoutIndex].caption;
      }

      return '';
    },
    getGroupFieldValueByIndex: function getGroupFieldValueByIndex(entry, layoutIndex, applyFormat, formatOptions) {
      var layout = this.enableOverrideLayout && this._overrideGroupLayout ? this._overrideGroupLayout : this.layout;
      var layoutItem = layout[layoutIndex];
      return this.getGroupFieldValue(entry, layoutItem, applyFormat, formatOptions);
    },
    getGroupFieldValue: function getGroupFieldValue(entry, layoutItem, applyFormat, formatOptions) {
      var value = null;
      var formatter = null;

      if (layoutItem && applyFormat) {
        var fieldName = this.getFieldNameByLayout(layoutItem);

        if (applyFormat) {
          formatter = this.getFormatterByLayout(layoutItem);
        }

        if (formatter) {
          value = this.groupTransformValue(entry[fieldName], layoutItem, formatter, formatOptions);
        } else {
          value = entry[fieldName];
        }
      } else if (layoutItem) {
        var _fieldName = this.getFieldNameByLayout(layoutItem);

        value = entry[_fieldName];
      } else {
        value = null;
      }

      return value;
    },
    getFormatterByLayout: function getFormatterByLayout(layoutItem) {
      if (!this._fieldFormatters) {
        this._fieldFormatters = {};
      }

      var path = "".concat(layoutItem.propertyPath, "_").concat(layoutItem.index);
      var formatter = this._fieldFormatters[path];

      if (!formatter) {
        formatter = this.getGroupFieldFormatter(layoutItem);
        this._fieldFormatters[path] = formatter;
      }

      return formatter;
    },
    getGroupFieldFormatter: function getGroupFieldFormatter(layoutItem) {
      var formatter;

      if (this.groupFieldFormatter) {
        formatter = this.groupFieldFormatter[layoutItem.propertyPath];
      }

      if (!formatter) {
        formatter = _GroupUtility["default"].getFormatterByLayout(layoutItem);
      }

      return formatter;
    },
    groupTransformValue: function groupTransformValue(value, layout, formatter, formatOptions) {
      try {
        return formatter.formatter(value, formatter.formatString, formatOptions);
      } catch (e) {
        return value;
      }
    },
    getFieldNameByLayout: function getFieldNameByLayout(layoutItem) {
      return _GroupUtility["default"].getFieldNameByLayout(layoutItem);
    },
    _startGroupMode: function _startGroupMode() {
      if (this._originalProps) {
        return;
      }

      this._originalProps = {};
      var original = this._originalProps;
      original.request = this.request ? this.request.clone() : null;
      original.querySelect = this.querySelect;
      original.queryOrderBy = this.queryOrderBy;
      original.idProperty = this.idProperty;
      original.labelProperty = this.labelProperty;
      original.store = this.store;
      original.rowTemplate = this.rowTemplate;
      original.itemTemplate = this.itemTemplate;
      original.itemFooterTemplate = this.itemFooterTemplate;
      original.relatedViews = this.relatedViews;
      original.title = this.get('title');
      original._model = this._model;
      this._model = null;
      this.itemFooterTemplate = new Simplate(['<div></div>']);
      this.groupsMode = true;
    },
    _clearGroupMode: function _clearGroupMode() {
      var original = this._originalProps;
      this.groupsMode = false;

      if (!original) {
        return;
      }

      this.request = original.request || null;
      this.querySelect = original.querySelect;
      this.queryOrderBy = original.queryOrderBy;
      this.idProperty = original.idProperty;
      this.labelProperty = original.labelProperty;
      this.set('store', original.store);
      this.rowTemplate = original.rowTemplate;
      this.itemTemplate = original.itemTemplate;
      this.relatedViews = original.relatedViews;
      this.itemFooterTemplate = original.itemFooterTemplate;
      this._model = original._model;
      this._originalProps = null;
      this._groupInitialized = false;
      this._currentGroup = null;
      this.currentGroupId = null;
      App.setPrimaryTitle(original.title);
      this.set('title', original.title);
      this.clear();
      this.refreshRequired = true;
    },
    _onQueryError: function _onQueryError(queryOptions, error) {
      if (this.groupsEnabled && this.groupsMode) {
        if (error.status === 404) {
          try {
            this._onGroupNotFound();

            return;
          } catch (e) {
            console.error(e); // eslint-disable-line
          }
        }
      }

      this.inherited(_onQueryError, arguments);
    },
    _onGroupNotFound: function _onGroupNotFound() {
      _GroupUtility["default"].removeGroupPreferences(this.currentGroupId, this.entityName);

      this.refreshRightDrawer();
      $(this.domNode).removeClass('list-loading');
      this.set('listContent', this.currentGoupNotFoundTemplate.apply(this));
    },
    activateEntry: function activateEntry(params) {
      if (this.groupsEnabled && this.groupsMode && !params.resolved) {
        this._groupActivateEntry(params);
      } else {
        this.inherited(activateEntry, arguments);
      }
    },
    _groupActivateEntry: function _groupActivateEntry(params) {
      var self = this;

      if (params.key) {
        var resolvedEntry = this._getResolvedEntry(params.key);

        if (!resolvedEntry) {
          this._fetchResolvedEntry(params.key).then(function (resolvedEnt) {
            params.descriptor = resolvedEnt.$descriptor;
            params.resolved = true;
            self.activateEntry(params);
          });
        } else {
          params.descriptor = resolvedEntry.$descriptor;
          params.resolved = true;
          this.activateEntry(params);
        }
      }
    },
    _invokeAction: function _invokeAction(theAction) {
      var selection = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (this.groupsEnabled && this.groupsMode && !selection.resolved) {
        this._groupInvokeAction(theAction, selection);
      } else {
        this.inherited(_invokeAction, arguments);
      }
    },
    _groupInvokeAction: function _groupInvokeAction(theAction, selection) {
      var self = this;

      var resolvedEntry = this._getResolvedEntry(selection.data.$key);

      if (!resolvedEntry) {
        this._fetchResolvedEntry(selection.data.$key).then(function (resolvedEnt) {
          self._invokeAction(theAction, {
            data: resolvedEnt,
            resolved: true
          });
        });
      } else {
        this._invokeAction(theAction, {
          data: resolvedEntry,
          resolved: true
        });
      }
    },
    showActionPanel: function showActionPanel(rowNode) {
      if (this.groupsEnabled && this.groupsMode) {
        this._groupShowActionPanel(rowNode);
      } else {
        this.inherited(showActionPanel, arguments);
      }
    },
    _groupShowActionPanel: function _groupShowActionPanel(rowNode) {
      var selection = this._getCurrentSelection();

      var self = this;

      var resolvedEntry = this._getResolvedEntry(selection.data.$key);

      if (!resolvedEntry) {
        this._fetchResolvedEntry(selection.data.$key).then(function (resolvedEnt) {
          self._groupCheckActionState(resolvedEnt, rowNode);
        });
      } else {
        this._groupCheckActionState(resolvedEntry, rowNode);
      }
    },
    _groupApplyActionPanel: function _groupApplyActionPanel(rowNode) {
      _ListBase2["default"].prototype.showActionPanel.call(this, rowNode);
    },
    _getCurrentSelection: function _getCurrentSelection() {
      var selectedItems = this.get('selectionModel').getSelections();
      var selection;

      for (var key in selectedItems) {
        if (selectedItems.hasOwnProperty(key)) {
          selection = selectedItems[key];
          selection.data.$key = key;
          break;
        }
      }

      return selection;
    },
    _fetchResolvedEntry: function _fetchResolvedEntry(entryKey) {
      var def = new _Deferred["default"]();
      var self = this;
      var store = new _SData["default"]({
        service: App.services.crm,
        resourceKind: this.resourceKind,
        contractName: this.contractName,
        scope: this
      });
      var select = this._originalProps.querySelect; // Use querySelect from the model if available
      // TODO: Expose _getQueryModelByName better somehow

      if (this._originalProps._model) {
        var queryModel = this._originalProps._model._getQueryModelByName('list');

        if (queryModel && queryModel.querySelect) {
          select = queryModel.querySelect;
        }
      }

      var queryOptions = {
        select: select,
        where: "Id eq '".concat(entryKey, "'")
      };
      var queryResults = store.query(null, queryOptions);
      (0, _when["default"])(queryResults, function (feed) {
        var entry = feed[0];
        entry[self.idProperty] = entry.$key; // we need this because the group key is different, and it used later on when invoking an action;

        self._addResolvedEntry(entry);

        def.resolve(entry);
      }, function (err) {
        def.reject(err);
      });
      return def.promise;
    },
    _clearResolvedEntryCache: function _clearResolvedEntryCache() {
      this._resolvedEntryCache = {};
    },
    _getResolvedEntry: function _getResolvedEntry(entryKey) {
      if (!this._resolvedEntryCache) {
        this._resolvedEntryCache = {};
      }

      return this._resolvedEntryCache[entryKey];
    },
    _addResolvedEntry: function _addResolvedEntry(entry) {
      this._resolvedEntryCache[entry.$key] = entry;
    },
    _groupCheckActionState: function _groupCheckActionState(resolvedEntry, rowNode) {
      var resolvedSelection = {
        data: resolvedEntry
      };

      this._applyStateToActions(resolvedSelection, rowNode);
    },
    _refreshList: function _refreshList() {
      var self = this;

      if (this.groupsEnabled && this.groupList && this._currentGroup) {
        this._requestGroup(this._currentGroup.name, this._currentGroup.$key, function checkGroup(results) {
          var group = results[0];

          if (group) {
            _GroupUtility["default"].addToGroupPreferences([group], this.entityName);

            self.setCurrentGroup(group);
            this.refreshRightDrawer();
          } // Note this is what this.inherited(_refreshList, arguments) calls, but that may change
          // Can't call this.inherited asynchronously...


          self.forceRefresh();
        });
      } else {
        this.inherited(_refreshList, arguments);
      }
    },
    groupInvokeListAction: function groupInvokeListAction(params) {
      var _this2 = this;

      var key = params.key;
      var propertyName = params.propertyname;
      var actionName = params.name;

      var resolvedEntry = this._getResolvedEntry(key);

      if (!resolvedEntry) {
        this._fetchResolvedEntry(key).then(function (resolvedEnt) {
          var options = {
            selection: {
              data: resolvedEnt
            },
            propertyName: propertyName
          };

          _this2.groupInvokeActionByName(actionName, options);
        });
      } else {
        var options = {
          selection: {
            data: resolvedEntry
          },
          propertyName: propertyName
        };
        this.groupInvokeActionByName(actionName, options);
      }
    },
    groupInvokeActionByName: function groupInvokeActionByName(actionName, options) {
      var opt = options;

      if (!opt) {
        opt = {};
      }

      switch (actionName) {
        case 'callPhone':
          _Action["default"].callPhone.call(this, null, opt.selection, opt.propertyName, _ActivityTypeText["default"].atPhoneCall);

          break;

        case 'sendEmail':
          _Action["default"].sendEmail.call(this, null, opt.selection, opt.propertyName);

          break;

        default:
          break;
      }
    },
    getContextSnapShot: function getContextSnapShot(options) {
      var snapShot;

      if (this._groupInitialized && this.groupsMode) {
        var entry = this.entries[options.key];
        var template = this.rowTemplate;
        snapShot = template.apply(entry, this);
        return snapShot;
      }

      snapShot = this.inherited(getContextSnapShot, arguments);
      return snapShot;
    },
    initModel: function initModel() {
      if (!this._groupInitialized || !this.groupsMode) {
        this.inherited(initModel, arguments);
      }
    }
  });

  var _default = __class;
  _exports["default"] = _default;
});
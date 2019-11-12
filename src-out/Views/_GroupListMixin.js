define('crm/Views/_GroupListMixin', ['module', 'exports', 'dojo/_base/declare', 'dojo/json', 'argos/Utility', 'argos/_ListBase', '../GroupUtility', 'dojo/when', 'dojo/_base/lang', 'argos/Store/SData', 'dojo/Deferred', '../Action', '../Models/Activity/ActivityTypeText', 'argos/I18n'], function (module, exports, _declare, _json, _Utility, _ListBase2, _GroupUtility, _when, _lang, _SData, _Deferred, _Action, _ActivityTypeText, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _json2 = _interopRequireDefault(_json);

  var _Utility2 = _interopRequireDefault(_Utility);

  var _ListBase3 = _interopRequireDefault(_ListBase2);

  var _GroupUtility2 = _interopRequireDefault(_GroupUtility);

  var _when2 = _interopRequireDefault(_when);

  var _lang2 = _interopRequireDefault(_lang);

  var _SData2 = _interopRequireDefault(_SData);

  var _Deferred2 = _interopRequireDefault(_Deferred);

  var _Action2 = _interopRequireDefault(_Action);

  var _ActivityTypeText2 = _interopRequireDefault(_ActivityTypeText);

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

  var resource = (0, _I18n2.default)('groupListMixin');

  /**
   * @class crm.Views._GroupListMixin
   * @classdesc Mixin for slx group list layouts.
   * @since 3.1
   */
  var __class = (0, _declare2.default)('crm.Views._GroupListMixin', null, {
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
      this.inherited(arguments);
    },
    startup: function startup() {
      this.createGroupTemplates();
      this.inherited(arguments);
    },
    requestData: function requestData() {
      try {
        if (!this._groupInitialized && this.groupsMode) {
          $(this.domNode).addClass('list-loading');
          this._setLoading();
          this.initGroup();
        } else {
          this.inherited(arguments);
        }
      } catch (e) {
        console.error(e); // eslint-disable-line
      }
    },

    joinFields: function joinFields(sep, fields) {
      return _Utility2.default.joinFields(sep, fields);
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
        _GroupUtility2.default.setDefaultGroupPreference(this.entityName, group.name);
      }
    },
    getDefaultGroup: function getDefaultGroup() {
      var defaultGroup = null;
      var defaultGroupName = null;

      defaultGroup = _GroupUtility2.default.getDefaultGroup(this.entityName);

      if (defaultGroup) {
        return defaultGroup;
      }

      defaultGroupName = _GroupUtility2.default.getDefaultGroupPreference(this.entityName);
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
      this.inherited(arguments);
      this._clearResolvedEntryCache();
    },
    _onApplyGroup: function _onApplyGroup(group) {
      if (!group) {
        throw new Error('Group not found.');
      }
      this._fieldFormatters = {};
      this._startGroupMode();
      this._clearResolvedEntryCache();

      // Set the toolbar title to the current group displayName
      var title = this.getGroupTitle(group);
      App.setPrimaryTitle(title);
      this.set('title', title);

      if (this._groupInitialized) {
        return;
      }

      this.layout = _GroupUtility2.default.getLayout(group);
      this.selectColumns = _GroupUtility2.default.getColumnNames(this.layout);
      this.itemTemplate = this.getItemTemplate();

      // Create a custom request that the store will use to execute the group query
      this.request = _GroupUtility2.default.createGroupRequest({
        groupId: group.$key,
        connection: this.getConnection()
      });

      // Try to select the entity id as well
      this.selectColumns.push(group.family + 'ID');
      this.querySelect = this.selectColumns;
      this.queryOrderBy = '';
      this.idProperty = group.family.toUpperCase() + 'ID';
      this.labelProperty = group.family.toUpperCase();
      this.store = null;
      this.clear(true);
      this.refreshRequired = true;
      this._groupInitialized = true;
      this.requestData();
    },
    _requestOverrideGroupLayout: function _requestOverrideGroupLayout() {
      var def = new _Deferred2.default();
      var groupName = this.overrideGroupLayoutName;
      var store = new _SData2.default({
        service: App.services.crm,
        resourceKind: 'groups',
        contractName: 'system',
        where: '((upper(family) eq \'' + this.entityName.toUpperCase() + '\') and (upper(Name) eq \'' + groupName.toUpperCase() + '\'))',
        include: ['layout', 'tableAliases'],
        idProperty: '$key',
        applicationName: 'slx',
        scope: this
      });

      if (store) {
        var queryResults = store.query();
        (0, _when2.default)(queryResults, function (relatedFeed) {
          def.resolve(relatedFeed);
        }, function () {
          def.resolve(null);
        });
      }
      return def.promise;
    },
    _requestGroup: function _requestGroup(groupName, groupId, onSuccess) {
      var store = void 0;
      if (typeof groupName === 'string' && groupName !== '') {
        store = new _SData2.default({
          service: App.services.crm,
          resourceKind: 'groups',
          contractName: 'system',
          where: '((upper(family) eq \'' + this.entityName.toUpperCase() + '\') and (upper(Name) eq \'' + groupName.toUpperCase() + '\') or PluginId eq \'' + groupId + '\')',
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
            (0, _when2.default)(queryResult, function queryResultFn(groupFeed) {
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
    setPrimaryTitle: function setPrimaryTitle() {
      var group = this._currentGroup;

      if (group) {
        var title = this.getGroupTitle(group);
        this.set('title', title);
      }

      this.inherited(arguments);
    },
    _onGroupRequestSuccess: function _onGroupRequestSuccess(result) {
      if (result.length > 0) {
        var group = result[0];
        this.setCurrentGroup(group);
        _GroupUtility2.default.addToGroupPreferences([group], this.entityName);
        this._onApplyGroup(group);
      } else {
        var title = this.getGroupTitle();
        App.setPrimaryTitle(title);
        this.set('title', title);
        this._selectGroups();
      }

      // Reload the right menu
      this.onTransitionAway();
      this.loadRightDrawer();

      $(this.domNode).removeClass('list-loading');
      this.listLoading = false;
    },
    _onGroupRequestFaild: function _onGroupRequestFaild() {},
    getGroupTitle: function getGroupTitle(group) {
      return group.displayName;
    },
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
      var jsonString = _json2.default.stringify(item);
      var template = ['<p class="micro-text"><span class="group-label">', item.caption, '</span> <span class="group-entry">{%= $$.groupTransformValue($[$$.getFieldNameByLayout(' + jsonString + ')],' + jsonString + ',$$.getFormatterByLayout(' + jsonString + ')) %}</span>', '</p>'].join('');

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
      var name = _GroupUtility2.default.getSelectedGroupLayoutTemplate(this.entityName);
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
      template.push('{%= $$.getGroupFieldValueByName($,"' + layout[0].propertyPath + '", true) %}');
      template.push('</p">');
      for (var i = 0; i < layout.length; i++) {
        var columnItem = layoutOptions.columns[column - 1];
        if (columnItem && column <= columns && i !== 0) {
          if (row === 1) {
            var columnClass = columnItem.clss || '';
            template.push('<div class="micro-text group-column ' + columnClass + '">');
          }
          var item = layout[i];
          if (item && columnItem.rows > 0) {
            if (i !== 0) {
              template.push('<div>');
              if (!columnItem.hideLabels) {
                template.push('<span class="group-label">' + this.getGroupFieldLabelByName(item.propertyPath) + ' </span>');
              }

              var formatOptions = this.getGroupFieldFormatOptions(item);
              var formatClss = formatOptions.clss || '';
              var jsonString = _json2.default.stringify(formatOptions);
              if (item.format === 'Phone') {
                template.push('<span class="hyperlink" data-action="groupInvokeListAction" data-name="callPhone" data-key="{%:$$.getGroupItemKey($)%}" data-propertyname="' + item.propertyPath + '">{%= $$.getGroupFieldValueByName($,"' + item.propertyPath + '", true,' + jsonString + ') %}</span>');
              } else if (item.propertyPath === 'Email') {
                template.push('<span class="hyperlink" data-action="groupInvokeListAction" data-name="sendEmail" data-key="{%:$$.getGroupItemKey($)%}" data-propertyname="' + item.propertyPath + '">{%= $$.getGroupFieldValueByName($,"' + item.propertyPath + '", true,' + jsonString + ') %}</span>');
              } else {
                template.push('<span class="group-entry ' + formatClss + '">{%= $$.getGroupFieldValueByName($,"' + item.propertyPath + '", true,' + jsonString + ') %}</span>');
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
      _lang2.default.mixin(layoutOptions, options);
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
        _lang2.default.mixin(options, formatter.options);
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
      var path = layoutItem.propertyPath + '_' + layoutItem.index;
      var formatter = this._fieldFormatters[path];
      if (!formatter) {
        formatter = this.getGroupFieldFormatter(layoutItem);
        this._fieldFormatters[path] = formatter;
      }
      return formatter;
    },
    getGroupFieldFormatter: function getGroupFieldFormatter(layoutItem) {
      var formatter = void 0;
      if (this.groupFieldFormatter) {
        formatter = this.groupFieldFormatter[layoutItem.propertyPath];
      }
      if (!formatter) {
        formatter = _GroupUtility2.default.getFormatterByLayout(layoutItem);
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
      return _GroupUtility2.default.getFieldNameByLayout(layoutItem);
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
      this.inherited(arguments);
    },
    _onGroupNotFound: function _onGroupNotFound() {
      _GroupUtility2.default.removeGroupPreferences(this.currentGroupId, this.entityName);
      this.refreshRightDrawer();
      $(this.domNode).removeClass('list-loading');
      this.set('listContent', this.currentGoupNotFoundTemplate.apply(this));
    },
    activateEntry: function activateEntry(params) {
      if (this.groupsEnabled && this.groupsMode && !params.resolved) {
        this._groupActivateEntry(params);
      } else {
        this.inherited(arguments);
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
        this.inherited(arguments);
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
        this.inherited(arguments);
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
      _ListBase3.default.prototype.showActionPanel.call(this, rowNode);
    },
    _getCurrentSelection: function _getCurrentSelection() {
      var selectedItems = this.get('selectionModel').getSelections();
      var selection = void 0;
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
      var def = new _Deferred2.default();
      var self = this;
      var store = new _SData2.default({
        service: App.services.crm,
        resourceKind: this.resourceKind,
        contractName: this.contractName,
        scope: this
      });

      var select = this._originalProps.querySelect;

      // Use querySelect from the model if available
      // TODO: Expose _getQueryModelByName better somehow
      if (this._originalProps._model) {
        var queryModel = this._originalProps._model._getQueryModelByName('list');
        if (queryModel && queryModel.querySelect) {
          select = queryModel.querySelect;
        }
      }

      var queryOptions = {
        select: select,
        where: 'Id eq \'' + entryKey + '\''
      };

      var queryResults = store.query(null, queryOptions);

      (0, _when2.default)(queryResults, function (feed) {
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
            _GroupUtility2.default.addToGroupPreferences([group], this.entityName);
            self.setCurrentGroup(group);
            this.refreshRightDrawer();
          }
          // Note this is what this.inherited(arguments) calls, but that may change
          // Can't call this.inherited asynchronously...
          self.forceRefresh();
        });
      } else {
        this.inherited(arguments);
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
          _Action2.default.callPhone.call(this, null, opt.selection, opt.propertyName, _ActivityTypeText2.default.atPhoneCall);
          break;
        case 'sendEmail':
          _Action2.default.sendEmail.call(this, null, opt.selection, opt.propertyName);
          break;
        default:
          break;
      }
    },
    getContextSnapShot: function getContextSnapShot(options) {
      var snapShot = void 0;
      if (this._groupInitialized && this.groupsMode) {
        var entry = this.entries[options.key];
        var template = this.rowTemplate;
        snapShot = template.apply(entry, this);
        return snapShot;
      }
      snapShot = this.inherited(arguments);

      return snapShot;
    },
    initModel: function initModel() {
      if (!this._groupInitialized || !this.groupsMode) {
        this.inherited(arguments);
      }
    }
  });

  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9WaWV3cy9fR3JvdXBMaXN0TWl4aW4uanMiXSwibmFtZXMiOlsicmVzb3VyY2UiLCJfX2NsYXNzIiwibm9EZWZhdWx0R3JvdXBUZXh0IiwiY3VycmVudEdyb3VwTm90Rm91bmRUZXh0IiwiZ3JvdXBUZW1wbGF0ZVN1bW1hcnlUZXh0IiwiZ3JvdXBUZW1wbGF0ZURldGFpbFRleHQiLCJncm91cHNNb2RlVGV4dCIsImhhc0RlZmF1bHRHcm91cCIsIm5vRGVmYXVsdEdyb3VwVGVtcGxhdGUiLCJTaW1wbGF0ZSIsImN1cnJlbnRHb3VwTm90Rm91bmRUZW1wbGF0ZSIsIl9nZXROb0RlZmF1bHRHcm91cE1lc3NhZ2UiLCJfZ2V0Q3VycmVudEdyb3VwTm90Rm91bmRNZXNzYWdlIiwib3BlbkNvbmZpZ3VyZSIsIl9zZWxlY3RHcm91cHMiLCJlbnRpdHlOYW1lIiwiZ3JvdXBzRW5hYmxlZCIsImdyb3Vwc01vZGUiLCJjdXJyZW50R3JvdXBJZCIsIl9jdXJyZW50R3JvdXAiLCJfZ3JvdXBJbml0aWFsaXplZCIsIl9vcmlnaW5hbFByb3BzIiwib3ZlcnJpZGVHcm91cExheW91dE5hbWUiLCJfb3ZlcnJpZGVMYXlvdXRJbml0YWxpemVkIiwiX292ZXJyaWRlR3JvdXBMYXlvdXQiLCJlbmFibGVEeW5hbWljR3JvdXBMYXlvdXQiLCJlbmFibGVPdmVycmlkZUxheW91dCIsInNlbGVjdGVkQ29sdW1ucyIsImxheW91dCIsInBvc3RNaXhJblByb3BlcnRpZXMiLCJBcHAiLCJlbmFibGVHcm91cHMiLCJpbmhlcml0ZWQiLCJhcmd1bWVudHMiLCJzdGFydHVwIiwiY3JlYXRlR3JvdXBUZW1wbGF0ZXMiLCJyZXF1ZXN0RGF0YSIsIiQiLCJkb21Ob2RlIiwiYWRkQ2xhc3MiLCJfc2V0TG9hZGluZyIsImluaXRHcm91cCIsImUiLCJjb25zb2xlIiwiZXJyb3IiLCJqb2luRmllbGRzIiwic2VwIiwiZmllbGRzIiwiZ2V0RGVzY3JpcHRvciIsImVudGl0eSIsIiRkZXNjcmlwdG9yIiwiJGtleSIsImdldEN1cnJlbnRHcm91cCIsInNldEN1cnJlbnRHcm91cCIsImdyb3VwIiwic2V0RGVmYXVsdEdyb3VwUHJlZmVyZW5jZSIsIm5hbWUiLCJnZXREZWZhdWx0R3JvdXAiLCJkZWZhdWx0R3JvdXAiLCJkZWZhdWx0R3JvdXBOYW1lIiwiZ2V0RGVmYXVsdEdyb3VwUHJlZmVyZW5jZSIsIl9yZXF1ZXN0R3JvdXAiLCJzZXQiLCJhcHBseSIsImluaXRPdmVycmlkZUdyb3VwTGF5b3V0IiwiX3JlcXVlc3RPdmVycmlkZUdyb3VwTGF5b3V0IiwidGhlbiIsInJlc3VsdCIsImxlbmd0aCIsIl9vbkFwcGx5R3JvdXAiLCJjbGVhciIsIl9jbGVhclJlc29sdmVkRW50cnlDYWNoZSIsIkVycm9yIiwiX2ZpZWxkRm9ybWF0dGVycyIsIl9zdGFydEdyb3VwTW9kZSIsInRpdGxlIiwiZ2V0R3JvdXBUaXRsZSIsInNldFByaW1hcnlUaXRsZSIsImdldExheW91dCIsInNlbGVjdENvbHVtbnMiLCJnZXRDb2x1bW5OYW1lcyIsIml0ZW1UZW1wbGF0ZSIsImdldEl0ZW1UZW1wbGF0ZSIsInJlcXVlc3QiLCJjcmVhdGVHcm91cFJlcXVlc3QiLCJncm91cElkIiwiY29ubmVjdGlvbiIsImdldENvbm5lY3Rpb24iLCJwdXNoIiwiZmFtaWx5IiwicXVlcnlTZWxlY3QiLCJxdWVyeU9yZGVyQnkiLCJpZFByb3BlcnR5IiwidG9VcHBlckNhc2UiLCJsYWJlbFByb3BlcnR5Iiwic3RvcmUiLCJyZWZyZXNoUmVxdWlyZWQiLCJkZWYiLCJncm91cE5hbWUiLCJzZXJ2aWNlIiwic2VydmljZXMiLCJjcm0iLCJyZXNvdXJjZUtpbmQiLCJjb250cmFjdE5hbWUiLCJ3aGVyZSIsImluY2x1ZGUiLCJhcHBsaWNhdGlvbk5hbWUiLCJzY29wZSIsInF1ZXJ5UmVzdWx0cyIsInF1ZXJ5IiwicmVsYXRlZEZlZWQiLCJyZXNvbHZlIiwicHJvbWlzZSIsIm9uU3VjY2VzcyIsInF1ZXJ5V2hlbiIsImNvbnRleHQiLCJxdWVyeVJlc3VsdCIsInF1ZXJ5UmVzdWx0Rm4iLCJncm91cEZlZWQiLCJfb25Hcm91cFJlcXVlc3RTdWNjZXNzIiwiYmluZCIsImxvZyIsImFkZFRvR3JvdXBQcmVmZXJlbmNlcyIsIm9uVHJhbnNpdGlvbkF3YXkiLCJsb2FkUmlnaHREcmF3ZXIiLCJyZW1vdmVDbGFzcyIsImxpc3RMb2FkaW5nIiwiX29uR3JvdXBSZXF1ZXN0RmFpbGQiLCJkaXNwbGF5TmFtZSIsImxheW91dFRlbXBsYXRlIiwiZ2V0U2VsZWN0ZWRHcm91cExheW91dFRlbXBsYXRlIiwidHlwZSIsImdldER5bmFtaWNMYXlvdXRJdGVtVGVtcGxhdGUiLCJvcHRpb25zIiwidGVtcGxhdGUiLCJkZWZhdWx0R3JvdXBMYXlvdXRJdGVtVGVtcGxhdGUiLCJtYXAiLCJnZXRJdGVtTGF5b3V0VGVtcGxhdGUiLCJpdGVtIiwianNvblN0cmluZyIsInN0cmluZ2lmeSIsImNhcHRpb24iLCJqb2luIiwiY3JlYXRlR3JvdXBUZW1wbGF0ZUxheW91dHMiLCJncm91cFRlbXBsYXRlTGF5b3V0cyIsImNvbHVtbnMiLCJpZCIsInJvd3MiLCJmb3JFYWNoIiwiX2NyZWF0ZUN1c3RvbWl6ZWRMYXlvdXQiLCJsYXlvdXRPcHRpb25zIiwiYXBwbHlEeW5hbWljTGF5b3V0T3B0aW9ucyIsImNvbHVtbiIsInJvdyIsInByb3BlcnR5UGF0aCIsImkiLCJjb2x1bW5JdGVtIiwiY29sdW1uQ2xhc3MiLCJjbHNzIiwiaGlkZUxhYmVscyIsImdldEdyb3VwRmllbGRMYWJlbEJ5TmFtZSIsImZvcm1hdE9wdGlvbnMiLCJnZXRHcm91cEZpZWxkRm9ybWF0T3B0aW9ucyIsImZvcm1hdENsc3MiLCJmb3JtYXQiLCJtaXhpbiIsImdldEdyb3VwSXRlbUtleSIsImdyb3VwRW50cnkiLCJsYXlvdXRJdGVtIiwiZm9ybWF0dGVyIiwiZ2V0Rm9ybWF0dGVyQnlMYXlvdXQiLCJmb3JtYXRTdHJpbmciLCJnZXRHcm91cEZpZWxkVmFsdWVCeU5hbWUiLCJlbnRyeSIsImFwcGx5Rm9ybWF0IiwiZ2V0R3JvdXBGaWVsZFZhbHVlIiwiZ2V0R3JvdXBGaWVsZExhYmVsQnlJbmRleCIsImxheW91dEluZGV4IiwiZ2V0R3JvdXBGaWVsZFZhbHVlQnlJbmRleCIsInZhbHVlIiwiZmllbGROYW1lIiwiZ2V0RmllbGROYW1lQnlMYXlvdXQiLCJncm91cFRyYW5zZm9ybVZhbHVlIiwicGF0aCIsImluZGV4IiwiZ2V0R3JvdXBGaWVsZEZvcm1hdHRlciIsImdyb3VwRmllbGRGb3JtYXR0ZXIiLCJvcmlnaW5hbCIsImNsb25lIiwicm93VGVtcGxhdGUiLCJpdGVtRm9vdGVyVGVtcGxhdGUiLCJyZWxhdGVkVmlld3MiLCJnZXQiLCJfbW9kZWwiLCJfY2xlYXJHcm91cE1vZGUiLCJfb25RdWVyeUVycm9yIiwicXVlcnlPcHRpb25zIiwic3RhdHVzIiwiX29uR3JvdXBOb3RGb3VuZCIsInJlbW92ZUdyb3VwUHJlZmVyZW5jZXMiLCJyZWZyZXNoUmlnaHREcmF3ZXIiLCJhY3RpdmF0ZUVudHJ5IiwicGFyYW1zIiwicmVzb2x2ZWQiLCJfZ3JvdXBBY3RpdmF0ZUVudHJ5Iiwic2VsZiIsImtleSIsInJlc29sdmVkRW50cnkiLCJfZ2V0UmVzb2x2ZWRFbnRyeSIsIl9mZXRjaFJlc29sdmVkRW50cnkiLCJyZXNvbHZlZEVudCIsImRlc2NyaXB0b3IiLCJfaW52b2tlQWN0aW9uIiwidGhlQWN0aW9uIiwic2VsZWN0aW9uIiwiX2dyb3VwSW52b2tlQWN0aW9uIiwiZGF0YSIsInNob3dBY3Rpb25QYW5lbCIsInJvd05vZGUiLCJfZ3JvdXBTaG93QWN0aW9uUGFuZWwiLCJfZ2V0Q3VycmVudFNlbGVjdGlvbiIsIl9ncm91cENoZWNrQWN0aW9uU3RhdGUiLCJfZ3JvdXBBcHBseUFjdGlvblBhbmVsIiwicHJvdG90eXBlIiwiY2FsbCIsInNlbGVjdGVkSXRlbXMiLCJnZXRTZWxlY3Rpb25zIiwiaGFzT3duUHJvcGVydHkiLCJlbnRyeUtleSIsInNlbGVjdCIsInF1ZXJ5TW9kZWwiLCJfZ2V0UXVlcnlNb2RlbEJ5TmFtZSIsImZlZWQiLCJfYWRkUmVzb2x2ZWRFbnRyeSIsImVyciIsInJlamVjdCIsIl9yZXNvbHZlZEVudHJ5Q2FjaGUiLCJyZXNvbHZlZFNlbGVjdGlvbiIsIl9hcHBseVN0YXRlVG9BY3Rpb25zIiwiX3JlZnJlc2hMaXN0IiwiZ3JvdXBMaXN0IiwiY2hlY2tHcm91cCIsInJlc3VsdHMiLCJmb3JjZVJlZnJlc2giLCJncm91cEludm9rZUxpc3RBY3Rpb24iLCJwcm9wZXJ0eU5hbWUiLCJwcm9wZXJ0eW5hbWUiLCJhY3Rpb25OYW1lIiwiZ3JvdXBJbnZva2VBY3Rpb25CeU5hbWUiLCJvcHQiLCJjYWxsUGhvbmUiLCJhdFBob25lQ2FsbCIsInNlbmRFbWFpbCIsImdldENvbnRleHRTbmFwU2hvdCIsInNuYXBTaG90IiwiZW50cmllcyIsImluaXRNb2RlbCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7O0FBNkJBLE1BQU1BLFdBQVcsb0JBQVksZ0JBQVosQ0FBakI7O0FBRUE7Ozs7O0FBS0EsTUFBTUMsVUFBVSx1QkFBUSwyQkFBUixFQUFxQyxJQUFyQyxFQUEyQztBQUN6REMsd0JBQW9CRixTQUFTRSxrQkFENEI7QUFFekRDLDhCQUEwQkgsU0FBU0csd0JBRnNCO0FBR3pEQyw4QkFBMEJKLFNBQVNJLHdCQUhzQjtBQUl6REMsNkJBQXlCTCxTQUFTSyx1QkFKdUI7QUFLekRDLG9CQUFnQk4sU0FBU00sY0FMZ0M7QUFNekRDLHFCQUFpQixJQU53QztBQU96REMsNEJBQXdCLElBQUlDLFFBQUosQ0FBYSxDQUNuQyxrREFEbUMsRUFFbkMsdUVBRm1DLEVBR25DLE9BSG1DLENBQWIsQ0FQaUM7QUFZekRDLGlDQUE2QixJQUFJRCxRQUFKLENBQWEsQ0FDeEMsc0JBRHdDLEVBRXhDLDZFQUZ3QyxFQUd4QyxPQUh3QyxDQUFiLENBWjRCOztBQWtCekRFLCtCQUEyQixTQUFTQSx5QkFBVCxHQUFxQztBQUM5RCxhQUFPWCxTQUFTRSxrQkFBaEI7QUFD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LElBQUluQyxTQUF0QyxFQUFpRG1DLElBQUlKLFlBQXJELEVBQW1FLDJCQUFpQk0sV0FBcEY7QUFDQTtBQUNGLGFBQUssV0FBTDtBQUNFLDJCQUFPQyxTQUFQLENBQWlCNUIsSUFBakIsQ0FBc0IsSUFBdEIsRUFBNEIsSUFBNUIsRUFBa0N5QixJQUFJbkMsU0FBdEMsRUFBaURtQyxJQUFJSixZQUFyRDtBQUNBO0FBQ0Y7QUFDRTtBQVJKO0FBVUQsS0E1eEJ3RDtBQTZ4QnpEUSx3QkFBb0IsU0FBU0Esa0JBQVQsQ0FBNEJ4SCxPQUE1QixFQUFxQztBQUN2RCxVQUFJeUgsaUJBQUo7QUFDQSxVQUFJLEtBQUsxTyxpQkFBTCxJQUEwQixLQUFLSCxVQUFuQyxFQUErQztBQUM3QyxZQUFNNEosUUFBUSxLQUFLa0YsT0FBTCxDQUFhMUgsUUFBUXlFLEdBQXJCLENBQWQ7QUFDQSxZQUFNeEUsV0FBVyxLQUFLdUQsV0FBdEI7QUFDQWlFLG1CQUFXeEgsU0FBU3ZFLEtBQVQsQ0FBZThHLEtBQWYsRUFBc0IsSUFBdEIsQ0FBWDtBQUNBLGVBQU9pRixRQUFQO0FBQ0Q7QUFDREEsaUJBQVcsS0FBSzlOLFNBQUwsQ0FBZUMsU0FBZixDQUFYOztBQUVBLGFBQU82TixRQUFQO0FBQ0QsS0F4eUJ3RDtBQXl5QnpERSxlQUFXLFNBQVNBLFNBQVQsR0FBcUI7QUFDOUIsVUFBSSxDQUFDLEtBQUs1TyxpQkFBTixJQUEyQixDQUFDLEtBQUtILFVBQXJDLEVBQWlEO0FBQy9DLGFBQUtlLFNBQUwsQ0FBZUMsU0FBZjtBQUNEO0FBQ0Y7QUE3eUJ3RCxHQUEzQyxDQUFoQjs7b0JBZ3pCZWhDLE8iLCJmaWxlIjoiX0dyb3VwTGlzdE1peGluLmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAyMDE3IEluZm9yXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuaW1wb3J0IGRlY2xhcmUgZnJvbSAnZG9qby9fYmFzZS9kZWNsYXJlJztcclxuaW1wb3J0IGpzb24gZnJvbSAnZG9qby9qc29uJztcclxuaW1wb3J0IHV0aWxpdHkgZnJvbSAnYXJnb3MvVXRpbGl0eSc7XHJcbmltcG9ydCBfTGlzdEJhc2UgZnJvbSAnYXJnb3MvX0xpc3RCYXNlJztcclxuaW1wb3J0IEdyb3VwVXRpbGl0eSBmcm9tICcuLi9Hcm91cFV0aWxpdHknO1xyXG5pbXBvcnQgd2hlbiBmcm9tICdkb2pvL3doZW4nO1xyXG5pbXBvcnQgbGFuZyBmcm9tICdkb2pvL19iYXNlL2xhbmcnO1xyXG5pbXBvcnQgU0RhdGFTdG9yZSBmcm9tICdhcmdvcy9TdG9yZS9TRGF0YSc7XHJcbmltcG9ydCBEZWZlcnJlZCBmcm9tICdkb2pvL0RlZmVycmVkJztcclxuaW1wb3J0IGFjdGlvbiBmcm9tICcuLi9BY3Rpb24nO1xyXG5pbXBvcnQgQWN0aXZpdHlUeXBlVGV4dCBmcm9tICcuLi9Nb2RlbHMvQWN0aXZpdHkvQWN0aXZpdHlUeXBlVGV4dCc7XHJcbmltcG9ydCBnZXRSZXNvdXJjZSBmcm9tICdhcmdvcy9JMThuJztcclxuXHJcblxyXG5jb25zdCByZXNvdXJjZSA9IGdldFJlc291cmNlKCdncm91cExpc3RNaXhpbicpO1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBjcm0uVmlld3MuX0dyb3VwTGlzdE1peGluXHJcbiAqIEBjbGFzc2Rlc2MgTWl4aW4gZm9yIHNseCBncm91cCBsaXN0IGxheW91dHMuXHJcbiAqIEBzaW5jZSAzLjFcclxuICovXHJcbmNvbnN0IF9fY2xhc3MgPSBkZWNsYXJlKCdjcm0uVmlld3MuX0dyb3VwTGlzdE1peGluJywgbnVsbCwge1xyXG4gIG5vRGVmYXVsdEdyb3VwVGV4dDogcmVzb3VyY2Uubm9EZWZhdWx0R3JvdXBUZXh0LFxyXG4gIGN1cnJlbnRHcm91cE5vdEZvdW5kVGV4dDogcmVzb3VyY2UuY3VycmVudEdyb3VwTm90Rm91bmRUZXh0LFxyXG4gIGdyb3VwVGVtcGxhdGVTdW1tYXJ5VGV4dDogcmVzb3VyY2UuZ3JvdXBUZW1wbGF0ZVN1bW1hcnlUZXh0LFxyXG4gIGdyb3VwVGVtcGxhdGVEZXRhaWxUZXh0OiByZXNvdXJjZS5ncm91cFRlbXBsYXRlRGV0YWlsVGV4dCxcclxuICBncm91cHNNb2RlVGV4dDogcmVzb3VyY2UuZ3JvdXBzTW9kZVRleHQsXHJcbiAgaGFzRGVmYXVsdEdyb3VwOiB0cnVlLFxyXG4gIG5vRGVmYXVsdEdyb3VwVGVtcGxhdGU6IG5ldyBTaW1wbGF0ZShbXHJcbiAgICAnPGxpIGNsYXNzPVwibm8tZGF0YVwiIGRhdGEtYWN0aW9uPVwib3BlbkNvbmZpZ3VyZVwiPicsXHJcbiAgICAnPHAgY2xhc3M9XCJsaXN0dmlldy1oZWFkaW5nXCI+eyU9ICQkLl9nZXROb0RlZmF1bHRHcm91cE1lc3NhZ2UoKSAlfTwvcD4nLFxyXG4gICAgJzwvbGk+JyxcclxuICBdKSxcclxuICBjdXJyZW50R291cE5vdEZvdW5kVGVtcGxhdGU6IG5ldyBTaW1wbGF0ZShbXHJcbiAgICAnPGxpIGNsYXNzPVwibm8tZGF0YVwiPicsXHJcbiAgICAnPHAgY2xhc3M9XCJsaXN0dmlldy1oZWFkaW5nXCI+eyU9ICQkLl9nZXRDdXJyZW50R3JvdXBOb3RGb3VuZE1lc3NhZ2UoKSAlfTwvcD4nLFxyXG4gICAgJzwvbGk+JyxcclxuICBdKSxcclxuXHJcbiAgX2dldE5vRGVmYXVsdEdyb3VwTWVzc2FnZTogZnVuY3Rpb24gX2dldE5vRGVmYXVsdEdyb3VwTWVzc2FnZSgpIHtcclxuICAgIHJldHVybiByZXNvdXJjZS5ub0RlZmF1bHRHcm91cFRleHQ7XHJcbiAgfSxcclxuICBfZ2V0Q3VycmVudEdyb3VwTm90Rm91bmRNZXNzYWdlOiBmdW5jdGlvbiBfZ2V0Q3VycmVudEdyb3VwTm90Rm91bmRNZXNzYWdlKCkge1xyXG4gICAgcmV0dXJuIHJlc291cmNlLmN1cnJlbnRHcm91cE5vdEZvdW5kVGV4dDtcclxuICB9LFxyXG4gIG9wZW5Db25maWd1cmU6IGZ1bmN0aW9uIG9wZW5Db25maWd1cmUoKSB7XHJcbiAgICBpZiAodGhpcy5fc2VsZWN0R3JvdXBzKSB7XHJcbiAgICAgIHRoaXMuX3NlbGVjdEdyb3VwcygpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgLy8gVmlldyBQcm9wZXJ0aWVzXHJcbiAgZW50aXR5TmFtZTogbnVsbCxcclxuICBncm91cHNFbmFibGVkOiBmYWxzZSxcclxuICBncm91cHNNb2RlOiBmYWxzZSxcclxuICBjdXJyZW50R3JvdXBJZDogbnVsbCxcclxuICBfY3VycmVudEdyb3VwOiBudWxsLFxyXG4gIF9ncm91cEluaXRpYWxpemVkOiBmYWxzZSxcclxuICBfb3JpZ2luYWxQcm9wczogbnVsbCxcclxuICBvdmVycmlkZUdyb3VwTGF5b3V0TmFtZTogJ0BNb2JpbGVMYXlvdXQnLFxyXG4gIF9vdmVycmlkZUxheW91dEluaXRhbGl6ZWQ6IGZhbHNlLFxyXG4gIF9vdmVycmlkZUdyb3VwTGF5b3V0OiBudWxsLFxyXG4gIGVuYWJsZUR5bmFtaWNHcm91cExheW91dDogdHJ1ZSxcclxuICBlbmFibGVPdmVycmlkZUxheW91dDogZmFsc2UsXHJcblxyXG4gIHNlbGVjdGVkQ29sdW1uczogbnVsbCxcclxuICBsYXlvdXQ6IG51bGwsXHJcblxyXG4gIHBvc3RNaXhJblByb3BlcnRpZXM6IGZ1bmN0aW9uIHBvc3RNaXhJblByb3BlcnRpZXMoKSB7XHJcbiAgICBpZiAoIUFwcC5lbmFibGVHcm91cHMpIHtcclxuICAgICAgdGhpcy5ncm91cHNNb2RlID0gZmFsc2U7XHJcbiAgICAgIHRoaXMuZ3JvdXBzRW5hYmxlZCA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICh0aGlzLmdyb3Vwc0VuYWJsZWQpIHtcclxuICAgICAgdGhpcy5ncm91cHNNb2RlID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIHRoaXMuaW5oZXJpdGVkKGFyZ3VtZW50cyk7XHJcbiAgfSxcclxuICBzdGFydHVwOiBmdW5jdGlvbiBzdGFydHVwKCkge1xyXG4gICAgdGhpcy5jcmVhdGVHcm91cFRlbXBsYXRlcygpO1xyXG4gICAgdGhpcy5pbmhlcml0ZWQoYXJndW1lbnRzKTtcclxuICB9LFxyXG4gIHJlcXVlc3REYXRhOiBmdW5jdGlvbiByZXF1ZXN0RGF0YSgpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGlmICghdGhpcy5fZ3JvdXBJbml0aWFsaXplZCAmJiB0aGlzLmdyb3Vwc01vZGUpIHtcclxuICAgICAgICAkKHRoaXMuZG9tTm9kZSkuYWRkQ2xhc3MoJ2xpc3QtbG9hZGluZycpO1xyXG4gICAgICAgIHRoaXMuX3NldExvYWRpbmcoKTtcclxuICAgICAgICB0aGlzLmluaXRHcm91cCgpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuaW5oZXJpdGVkKGFyZ3VtZW50cyk7XHJcbiAgICAgIH1cclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgY29uc29sZS5lcnJvcihlKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIGpvaW5GaWVsZHM6IGZ1bmN0aW9uIGpvaW5GaWVsZHMoc2VwLCBmaWVsZHMpIHtcclxuICAgIHJldHVybiB1dGlsaXR5LmpvaW5GaWVsZHMoc2VwLCBmaWVsZHMpO1xyXG4gIH0sXHJcbiAgZ2V0RGVzY3JpcHRvcjogZnVuY3Rpb24gZ2V0RGVzY3JpcHRvcihlbnRpdHkpIHtcclxuICAgIHJldHVybiBlbnRpdHkuJGRlc2NyaXB0b3IgfHwgZW50aXR5LiRrZXkgfHwgJ3Vua25vd24nO1xyXG4gIH0sXHJcbiAgZ2V0Q3VycmVudEdyb3VwOiBmdW5jdGlvbiBnZXRDdXJyZW50R3JvdXAoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fY3VycmVudEdyb3VwO1xyXG4gIH0sXHJcbiAgc2V0Q3VycmVudEdyb3VwOiBmdW5jdGlvbiBzZXRDdXJyZW50R3JvdXAoZ3JvdXApIHtcclxuICAgIGlmIChncm91cCkge1xyXG4gICAgICB0aGlzLmhhc0RlZmF1bHRHcm91cCA9IHRydWU7XHJcbiAgICAgIHRoaXMuX2dyb3VwSW5pdGlhbGl6ZWQgPSBmYWxzZTtcclxuICAgICAgdGhpcy5fY3VycmVudEdyb3VwID0gZ3JvdXA7XHJcbiAgICAgIHRoaXMuY3VycmVudEdyb3VwSWQgPSBncm91cC4ka2V5O1xyXG4gICAgICBHcm91cFV0aWxpdHkuc2V0RGVmYXVsdEdyb3VwUHJlZmVyZW5jZSh0aGlzLmVudGl0eU5hbWUsIGdyb3VwLm5hbWUpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgZ2V0RGVmYXVsdEdyb3VwOiBmdW5jdGlvbiBnZXREZWZhdWx0R3JvdXAoKSB7XHJcbiAgICBsZXQgZGVmYXVsdEdyb3VwID0gbnVsbDtcclxuICAgIGxldCBkZWZhdWx0R3JvdXBOYW1lID0gbnVsbDtcclxuXHJcbiAgICBkZWZhdWx0R3JvdXAgPSBHcm91cFV0aWxpdHkuZ2V0RGVmYXVsdEdyb3VwKHRoaXMuZW50aXR5TmFtZSk7XHJcblxyXG4gICAgaWYgKGRlZmF1bHRHcm91cCkge1xyXG4gICAgICByZXR1cm4gZGVmYXVsdEdyb3VwO1xyXG4gICAgfVxyXG5cclxuICAgIGRlZmF1bHRHcm91cE5hbWUgPSBHcm91cFV0aWxpdHkuZ2V0RGVmYXVsdEdyb3VwUHJlZmVyZW5jZSh0aGlzLmVudGl0eU5hbWUpO1xyXG4gICAgaWYgKGRlZmF1bHRHcm91cE5hbWUpIHtcclxuICAgICAgdGhpcy5fcmVxdWVzdEdyb3VwKGRlZmF1bHRHcm91cE5hbWUpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gTm8gZGVmYXVsdCBncm91cCBwcmVmZXJlbmNlXHJcbiAgICAgIHRoaXMuc2V0KCdsaXN0Q29udGVudCcsIHRoaXMubm9EZWZhdWx0R3JvdXBUZW1wbGF0ZS5hcHBseSh0aGlzKSk7XHJcbiAgICAgIHRoaXMuaGFzRGVmYXVsdEdyb3VwID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfSxcclxuICBpbml0T3ZlcnJpZGVHcm91cExheW91dDogZnVuY3Rpb24gaW5pdE92ZXJyaWRlR3JvdXBMYXlvdXQoKSB7XHJcbiAgICB0aGlzLl9yZXF1ZXN0T3ZlcnJpZGVHcm91cExheW91dCgpLnRoZW4oKHJlc3VsdCkgPT4ge1xyXG4gICAgICB0aGlzLl9vdmVycmlkZUxheW91dEluaXRhbGl6ZWQgPSB0cnVlO1xyXG4gICAgICB0aGlzLl9vdmVycmlkZUdyb3VwTGF5b3V0ID0gKHJlc3VsdCAmJiAocmVzdWx0Lmxlbmd0aCA+IDApKSA/IHJlc3VsdFswXS5sYXlvdXQgOiBudWxsO1xyXG4gICAgICB0aGlzLmluaXRHcm91cCgpO1xyXG4gICAgfSk7XHJcbiAgfSxcclxuICBpbml0R3JvdXA6IGZ1bmN0aW9uIGluaXRHcm91cCgpIHtcclxuICAgIGlmICh0aGlzLmVuYWJsZU92ZXJyaWRlTGF5b3V0ICYmICF0aGlzLl9vdmVycmlkZUxheW91dEluaXRhbGl6ZWQgJiYgIXRoaXMuX292ZXJyaWRlR3JvdXBMYXlvdXQpIHtcclxuICAgICAgdGhpcy5pbml0T3ZlcnJpZGVHcm91cExheW91dCgpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBsZXQgZ3JvdXAgPSB0aGlzLmdldEN1cnJlbnRHcm91cCgpO1xyXG5cclxuICAgIGlmICghZ3JvdXApIHtcclxuICAgICAgZ3JvdXAgPSB0aGlzLmdldERlZmF1bHRHcm91cCgpO1xyXG4gICAgICB0aGlzLnNldEN1cnJlbnRHcm91cChncm91cCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGdyb3VwKSB7XHJcbiAgICAgIHRoaXMuX29uQXBwbHlHcm91cChncm91cCk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBjbGVhcjogZnVuY3Rpb24gY2xlYXIoKSB7XHJcbiAgICB0aGlzLmluaGVyaXRlZChhcmd1bWVudHMpO1xyXG4gICAgdGhpcy5fY2xlYXJSZXNvbHZlZEVudHJ5Q2FjaGUoKTtcclxuICB9LFxyXG4gIF9vbkFwcGx5R3JvdXA6IGZ1bmN0aW9uIF9vbkFwcGx5R3JvdXAoZ3JvdXApIHtcclxuICAgIGlmICghZ3JvdXApIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdHcm91cCBub3QgZm91bmQuJyk7XHJcbiAgICB9XHJcbiAgICB0aGlzLl9maWVsZEZvcm1hdHRlcnMgPSB7fTtcclxuICAgIHRoaXMuX3N0YXJ0R3JvdXBNb2RlKCk7XHJcbiAgICB0aGlzLl9jbGVhclJlc29sdmVkRW50cnlDYWNoZSgpO1xyXG5cclxuICAgIC8vIFNldCB0aGUgdG9vbGJhciB0aXRsZSB0byB0aGUgY3VycmVudCBncm91cCBkaXNwbGF5TmFtZVxyXG4gICAgY29uc3QgdGl0bGUgPSB0aGlzLmdldEdyb3VwVGl0bGUoZ3JvdXApO1xyXG4gICAgQXBwLnNldFByaW1hcnlUaXRsZSh0aXRsZSk7XHJcbiAgICB0aGlzLnNldCgndGl0bGUnLCB0aXRsZSk7XHJcblxyXG4gICAgaWYgKHRoaXMuX2dyb3VwSW5pdGlhbGl6ZWQpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMubGF5b3V0ID0gR3JvdXBVdGlsaXR5LmdldExheW91dChncm91cCk7XHJcbiAgICB0aGlzLnNlbGVjdENvbHVtbnMgPSBHcm91cFV0aWxpdHkuZ2V0Q29sdW1uTmFtZXModGhpcy5sYXlvdXQpO1xyXG4gICAgdGhpcy5pdGVtVGVtcGxhdGUgPSB0aGlzLmdldEl0ZW1UZW1wbGF0ZSgpO1xyXG5cclxuICAgIC8vIENyZWF0ZSBhIGN1c3RvbSByZXF1ZXN0IHRoYXQgdGhlIHN0b3JlIHdpbGwgdXNlIHRvIGV4ZWN1dGUgdGhlIGdyb3VwIHF1ZXJ5XHJcbiAgICB0aGlzLnJlcXVlc3QgPSBHcm91cFV0aWxpdHkuY3JlYXRlR3JvdXBSZXF1ZXN0KHtcclxuICAgICAgZ3JvdXBJZDogZ3JvdXAuJGtleSxcclxuICAgICAgY29ubmVjdGlvbjogdGhpcy5nZXRDb25uZWN0aW9uKCksXHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBUcnkgdG8gc2VsZWN0IHRoZSBlbnRpdHkgaWQgYXMgd2VsbFxyXG4gICAgdGhpcy5zZWxlY3RDb2x1bW5zLnB1c2goYCR7Z3JvdXAuZmFtaWx5fUlEYCk7XHJcbiAgICB0aGlzLnF1ZXJ5U2VsZWN0ID0gdGhpcy5zZWxlY3RDb2x1bW5zO1xyXG4gICAgdGhpcy5xdWVyeU9yZGVyQnkgPSAnJztcclxuICAgIHRoaXMuaWRQcm9wZXJ0eSA9IGAke2dyb3VwLmZhbWlseS50b1VwcGVyQ2FzZSgpfUlEYDtcclxuICAgIHRoaXMubGFiZWxQcm9wZXJ0eSA9IGdyb3VwLmZhbWlseS50b1VwcGVyQ2FzZSgpO1xyXG4gICAgdGhpcy5zdG9yZSA9IG51bGw7XHJcbiAgICB0aGlzLmNsZWFyKHRydWUpO1xyXG4gICAgdGhpcy5yZWZyZXNoUmVxdWlyZWQgPSB0cnVlO1xyXG4gICAgdGhpcy5fZ3JvdXBJbml0aWFsaXplZCA9IHRydWU7XHJcbiAgICB0aGlzLnJlcXVlc3REYXRhKCk7XHJcbiAgfSxcclxuICBfcmVxdWVzdE92ZXJyaWRlR3JvdXBMYXlvdXQ6IGZ1bmN0aW9uIF9yZXF1ZXN0T3ZlcnJpZGVHcm91cExheW91dCgpIHtcclxuICAgIGNvbnN0IGRlZiA9IG5ldyBEZWZlcnJlZCgpO1xyXG4gICAgY29uc3QgZ3JvdXBOYW1lID0gdGhpcy5vdmVycmlkZUdyb3VwTGF5b3V0TmFtZTtcclxuICAgIGNvbnN0IHN0b3JlID0gbmV3IFNEYXRhU3RvcmUoe1xyXG4gICAgICBzZXJ2aWNlOiBBcHAuc2VydmljZXMuY3JtLFxyXG4gICAgICByZXNvdXJjZUtpbmQ6ICdncm91cHMnLFxyXG4gICAgICBjb250cmFjdE5hbWU6ICdzeXN0ZW0nLFxyXG4gICAgICB3aGVyZTogYCgodXBwZXIoZmFtaWx5KSBlcSAnJHt0aGlzLmVudGl0eU5hbWUudG9VcHBlckNhc2UoKX0nKSBhbmQgKHVwcGVyKE5hbWUpIGVxICcke2dyb3VwTmFtZS50b1VwcGVyQ2FzZSgpfScpKWAsXHJcbiAgICAgIGluY2x1ZGU6IFsnbGF5b3V0JywgJ3RhYmxlQWxpYXNlcyddLFxyXG4gICAgICBpZFByb3BlcnR5OiAnJGtleScsXHJcbiAgICAgIGFwcGxpY2F0aW9uTmFtZTogJ3NseCcsXHJcbiAgICAgIHNjb3BlOiB0aGlzLFxyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKHN0b3JlKSB7XHJcbiAgICAgIGNvbnN0IHF1ZXJ5UmVzdWx0cyA9IHN0b3JlLnF1ZXJ5KCk7XHJcbiAgICAgIHdoZW4ocXVlcnlSZXN1bHRzLCAocmVsYXRlZEZlZWQpID0+IHtcclxuICAgICAgICBkZWYucmVzb2x2ZShyZWxhdGVkRmVlZCk7XHJcbiAgICAgIH0sICgpID0+IHtcclxuICAgICAgICBkZWYucmVzb2x2ZShudWxsKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZGVmLnByb21pc2U7XHJcbiAgfSxcclxuICBfcmVxdWVzdEdyb3VwOiBmdW5jdGlvbiBfcmVxdWVzdEdyb3VwKGdyb3VwTmFtZSwgZ3JvdXBJZCwgb25TdWNjZXNzKSB7XHJcbiAgICBsZXQgc3RvcmU7XHJcbiAgICBpZiAodHlwZW9mIGdyb3VwTmFtZSA9PT0gJ3N0cmluZycgJiYgZ3JvdXBOYW1lICE9PSAnJykge1xyXG4gICAgICBzdG9yZSA9IG5ldyBTRGF0YVN0b3JlKHtcclxuICAgICAgICBzZXJ2aWNlOiBBcHAuc2VydmljZXMuY3JtLFxyXG4gICAgICAgIHJlc291cmNlS2luZDogJ2dyb3VwcycsXHJcbiAgICAgICAgY29udHJhY3ROYW1lOiAnc3lzdGVtJyxcclxuICAgICAgICB3aGVyZTogYCgodXBwZXIoZmFtaWx5KSBlcSAnJHt0aGlzLmVudGl0eU5hbWUudG9VcHBlckNhc2UoKX0nKSBhbmQgKHVwcGVyKE5hbWUpIGVxICcke2dyb3VwTmFtZS50b1VwcGVyQ2FzZSgpfScpIG9yIFBsdWdpbklkIGVxICcke2dyb3VwSWR9JylgLFxyXG4gICAgICAgIGluY2x1ZGU6IFsnbGF5b3V0JywgJ3RhYmxlQWxpYXNlcyddLFxyXG4gICAgICAgIGlkUHJvcGVydHk6ICcka2V5JyxcclxuICAgICAgICBhcHBsaWNhdGlvbk5hbWU6ICdzbHgnLFxyXG4gICAgICAgIHNjb3BlOiB0aGlzLFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoc3RvcmUpIHtcclxuICAgICAgY29uc3QgcXVlcnlSZXN1bHRzID0gc3RvcmUucXVlcnkoKTtcclxuXHJcbiAgICAgIChmdW5jdGlvbiBxdWVyeVdoZW4oY29udGV4dCwgcXVlcnlSZXN1bHQpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgd2hlbihxdWVyeVJlc3VsdCwgZnVuY3Rpb24gcXVlcnlSZXN1bHRGbihncm91cEZlZWQpIHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBvblN1Y2Nlc3MgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgICBvblN1Y2Nlc3MuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICB0aGlzLl9vbkdyb3VwUmVxdWVzdFN1Y2Nlc3MoZ3JvdXBGZWVkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfS5iaW5kKGNvbnRleHQpKTtcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coJ0Vycm9yIGZldGNoaW5nIGdyb3VwIGRhdGE6JyArIGVycm9yKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxyXG4gICAgICAgIH1cclxuICAgICAgfSkodGhpcywgcXVlcnlSZXN1bHRzKTtcclxuICAgIH1cclxuICB9LFxyXG4gIHNldFByaW1hcnlUaXRsZTogZnVuY3Rpb24gc2V0UHJpbWFyeVRpdGxlKCkge1xyXG4gICAgY29uc3QgZ3JvdXAgPSB0aGlzLl9jdXJyZW50R3JvdXA7XHJcblxyXG4gICAgaWYgKGdyb3VwKSB7XHJcbiAgICAgIGNvbnN0IHRpdGxlID0gdGhpcy5nZXRHcm91cFRpdGxlKGdyb3VwKTtcclxuICAgICAgdGhpcy5zZXQoJ3RpdGxlJywgdGl0bGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuaW5oZXJpdGVkKGFyZ3VtZW50cyk7XHJcbiAgfSxcclxuICBfb25Hcm91cFJlcXVlc3RTdWNjZXNzOiBmdW5jdGlvbiBfb25Hcm91cFJlcXVlc3RTdWNjZXNzKHJlc3VsdCkge1xyXG4gICAgaWYgKHJlc3VsdC5sZW5ndGggPiAwKSB7XHJcbiAgICAgIGNvbnN0IGdyb3VwID0gcmVzdWx0WzBdO1xyXG4gICAgICB0aGlzLnNldEN1cnJlbnRHcm91cChncm91cCk7XHJcbiAgICAgIEdyb3VwVXRpbGl0eS5hZGRUb0dyb3VwUHJlZmVyZW5jZXMoW2dyb3VwXSwgdGhpcy5lbnRpdHlOYW1lKTtcclxuICAgICAgdGhpcy5fb25BcHBseUdyb3VwKGdyb3VwKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnN0IHRpdGxlID0gdGhpcy5nZXRHcm91cFRpdGxlKCk7XHJcbiAgICAgIEFwcC5zZXRQcmltYXJ5VGl0bGUodGl0bGUpO1xyXG4gICAgICB0aGlzLnNldCgndGl0bGUnLCB0aXRsZSk7XHJcbiAgICAgIHRoaXMuX3NlbGVjdEdyb3VwcygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFJlbG9hZCB0aGUgcmlnaHQgbWVudVxyXG4gICAgdGhpcy5vblRyYW5zaXRpb25Bd2F5KCk7XHJcbiAgICB0aGlzLmxvYWRSaWdodERyYXdlcigpO1xyXG5cclxuICAgICQodGhpcy5kb21Ob2RlKS5yZW1vdmVDbGFzcygnbGlzdC1sb2FkaW5nJyk7XHJcbiAgICB0aGlzLmxpc3RMb2FkaW5nID0gZmFsc2U7XHJcbiAgfSxcclxuICBfb25Hcm91cFJlcXVlc3RGYWlsZDogZnVuY3Rpb24gX29uR3JvdXBSZXF1ZXN0RmFpbGQoKSB7XHJcblxyXG4gIH0sXHJcbiAgZ2V0R3JvdXBUaXRsZTogZnVuY3Rpb24gZ2V0R3JvdXBUaXRsZShncm91cCkge1xyXG4gICAgcmV0dXJuIGdyb3VwLmRpc3BsYXlOYW1lO1xyXG4gIH0sXHJcbiAgZ2V0SXRlbVRlbXBsYXRlOiBmdW5jdGlvbiBnZXRJdGVtVGVtcGxhdGUoKSB7XHJcbiAgICBjb25zdCBsYXlvdXQgPSAodGhpcy5lbmFibGVPdmVycmlkZUxheW91dCAmJiB0aGlzLl9vdmVycmlkZUdyb3VwTGF5b3V0KSA/IHRoaXMuX292ZXJyaWRlR3JvdXBMYXlvdXQgOiB0aGlzLmxheW91dDtcclxuICAgIGlmICh0aGlzLmVuYWJsZUR5bmFtaWNHcm91cExheW91dCkge1xyXG4gICAgICBjb25zdCBsYXlvdXRUZW1wbGF0ZSA9IHRoaXMuZ2V0U2VsZWN0ZWRHcm91cExheW91dFRlbXBsYXRlKCk7XHJcbiAgICAgIGlmIChsYXlvdXRUZW1wbGF0ZSkge1xyXG4gICAgICAgIGlmIChsYXlvdXRUZW1wbGF0ZS50eXBlID09PSAnRHluYW1pYycpIHtcclxuICAgICAgICAgIHJldHVybiB0aGlzLmdldER5bmFtaWNMYXlvdXRJdGVtVGVtcGxhdGUobGF5b3V0LCBsYXlvdXRUZW1wbGF0ZS5vcHRpb25zKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGxheW91dFRlbXBsYXRlLnRlbXBsYXRlKSB7XHJcbiAgICAgICAgICByZXR1cm4gbmV3IFNpbXBsYXRlKGxheW91dFRlbXBsYXRlLnRlbXBsYXRlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHRoaXMuZGVmYXVsdEdyb3VwTGF5b3V0SXRlbVRlbXBsYXRlO1xyXG4gICAgfVxyXG4gICAgY29uc3QgdGVtcGxhdGUgPSBsYXlvdXQubWFwKHRoaXMuZ2V0SXRlbUxheW91dFRlbXBsYXRlKTtcclxuICAgIHJldHVybiBuZXcgU2ltcGxhdGUodGVtcGxhdGUpO1xyXG4gIH0sXHJcbiAgZ2V0SXRlbUxheW91dFRlbXBsYXRlOiBmdW5jdGlvbiBnZXRJdGVtTGF5b3V0VGVtcGxhdGUoaXRlbSkge1xyXG4gICAgY29uc3QganNvblN0cmluZyA9IGpzb24uc3RyaW5naWZ5KGl0ZW0pO1xyXG4gICAgY29uc3QgdGVtcGxhdGUgPSBbJzxwIGNsYXNzPVwibWljcm8tdGV4dFwiPjxzcGFuIGNsYXNzPVwiZ3JvdXAtbGFiZWxcIj4nLCBpdGVtLmNhcHRpb24sIGA8L3NwYW4+IDxzcGFuIGNsYXNzPVwiZ3JvdXAtZW50cnlcIj57JT0gJCQuZ3JvdXBUcmFuc2Zvcm1WYWx1ZSgkWyQkLmdldEZpZWxkTmFtZUJ5TGF5b3V0KCR7anNvblN0cmluZ30pXSwke2pzb25TdHJpbmd9LCQkLmdldEZvcm1hdHRlckJ5TGF5b3V0KCR7anNvblN0cmluZ30pKSAlfTwvc3Bhbj5gLCAnPC9wPiddLmpvaW4oJycpO1xyXG5cclxuICAgIHJldHVybiB0ZW1wbGF0ZTtcclxuICB9LFxyXG4gIGRlZmF1bHRHcm91cExheW91dEl0ZW1UZW1wbGF0ZTogbmV3IFNpbXBsYXRlKFtcclxuICAgICc8cCBjbGFzcz1cIm1pY3JvLXRleHRcIj57JT0gJCQuZ2V0R3JvdXBGaWVsZFZhbHVlQnlJbmRleCgkLCAwLCB0cnVlKSAlfTwvcD4nLFxyXG4gICAgJzxwIGNsYXNzPVwibWljcm8tdGV4dFwiPjxzcGFuIGNsYXNzPVwiZ3JvdXAtbGFiZWxcIj57JT0gJCQuZ2V0R3JvdXBGaWVsZExhYmVsQnlJbmRleCgxKSAlfSA8L3NwYW4+PHNwYW4gY2xhc3M9XCJncm91cC1lbnRyeVwiPnslPSAkJC5nZXRHcm91cEZpZWxkVmFsdWVCeUluZGV4KCQsIDEsIHRydWUpICV9PC9zcGFuPjwvcD4nLFxyXG4gICAgJzxwIGNsYXNzPVwibWljcm8tdGV4dFwiPjxzcGFuIGNsYXNzPVwiZ3JvdXAtbGFiZWxcIj57JT0gJCQuZ2V0R3JvdXBGaWVsZExhYmVsQnlJbmRleCgyKSAlfSA8L3NwYW4+PHNwYW4gY2xhc3M9XCJncm91cC1lbnRyeVwiPnslPSAkJC5nZXRHcm91cEZpZWxkVmFsdWVCeUluZGV4KCQsIDIsIHRydWUpICV9PC9zcGFuPjwvcD4nLFxyXG4gIF0pLFxyXG4gIGNyZWF0ZUdyb3VwVGVtcGxhdGVMYXlvdXRzOiBmdW5jdGlvbiBjcmVhdGVHcm91cFRlbXBsYXRlTGF5b3V0cygpIHtcclxuICAgIHRoaXMuZ3JvdXBUZW1wbGF0ZUxheW91dHMgPSBbe1xyXG4gICAgICBuYW1lOiAnU3VtbWFyeScsXHJcbiAgICAgIGRpc3BsYXlOYW1lOiByZXNvdXJjZS5ncm91cFRlbXBsYXRlU3VtbWFyeVRleHQsXHJcbiAgICAgIHR5cGU6ICdEeW5hbWljJyxcclxuICAgICAgb3B0aW9uczoge1xyXG4gICAgICAgIGNvbHVtbnM6IFt7XHJcbiAgICAgICAgICBpZDogJ2NvbDEnLFxyXG4gICAgICAgICAgcm93czogMyxcclxuICAgICAgICB9XSxcclxuICAgICAgfSxcclxuICAgIH0sIHtcclxuICAgICAgbmFtZTogJ0RldGFpbCcsXHJcbiAgICAgIGRpc3BsYXlOYW1lOiByZXNvdXJjZS5ncm91cFRlbXBsYXRlRGV0YWlsVGV4dCxcclxuICAgICAgdHlwZTogJ0R5bmFtaWMnLFxyXG4gICAgICBvcHRpb25zOiB7XHJcbiAgICAgICAgY29sdW1uczogW3tcclxuICAgICAgICAgIGlkOiAnY29sMScsXHJcbiAgICAgICAgICByb3dzOiAzLFxyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgIGlkOiAnY29sMicsXHJcbiAgICAgICAgICByb3dzOiAzLFxyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgIGlkOiAnY29sMycsXHJcbiAgICAgICAgICByb3dzOiAzLFxyXG4gICAgICAgIH1dLFxyXG4gICAgICB9LFxyXG4gICAgfV07XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuZ3JvdXBUZW1wbGF0ZUxheW91dHM7XHJcbiAgfSxcclxuICBnZXRTZWxlY3RlZEdyb3VwTGF5b3V0VGVtcGxhdGU6IGZ1bmN0aW9uIGdldFNlbGVjdGVkR3JvdXBMYXlvdXRUZW1wbGF0ZSgpIHtcclxuICAgIGxldCBuYW1lID0gR3JvdXBVdGlsaXR5LmdldFNlbGVjdGVkR3JvdXBMYXlvdXRUZW1wbGF0ZSh0aGlzLmVudGl0eU5hbWUpO1xyXG4gICAgbmFtZSA9IChuYW1lKSA/IG5hbWUgOiAnJztcclxuICAgIGxldCBsYXlvdXRUZW1wbGF0ZSA9IG51bGw7XHJcbiAgICB0aGlzLmdyb3VwVGVtcGxhdGVMYXlvdXRzLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgaWYgKGl0ZW0ubmFtZSA9PT0gbmFtZSkge1xyXG4gICAgICAgIGxheW91dFRlbXBsYXRlID0gaXRlbTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBpZiAoIWxheW91dFRlbXBsYXRlKSB7XHJcbiAgICAgIGxheW91dFRlbXBsYXRlID0gdGhpcy5ncm91cFRlbXBsYXRlTGF5b3V0c1swXTtcclxuICAgIH1cclxuICAgIHJldHVybiBsYXlvdXRUZW1wbGF0ZTtcclxuICB9LFxyXG4gIGNyZWF0ZUdyb3VwVGVtcGxhdGVzOiBmdW5jdGlvbiBjcmVhdGVHcm91cFRlbXBsYXRlcygpIHtcclxuICAgIHRoaXMuZ3JvdXBUZW1wbGF0ZUxheW91dHMgPSB0aGlzLl9jcmVhdGVDdXN0b21pemVkTGF5b3V0KHRoaXMuY3JlYXRlR3JvdXBUZW1wbGF0ZUxheW91dHMoKSwgJ2dyb3VwLXRlbXBsYXRlcycpO1xyXG4gIH0sXHJcbiAgZ2V0RHluYW1pY0xheW91dEl0ZW1UZW1wbGF0ZTogZnVuY3Rpb24gZ2V0RHluYW1pY0xheW91dEl0ZW1UZW1wbGF0ZShsYXlvdXQsIG9wdGlvbnMpIHtcclxuICAgIGNvbnN0IGxheW91dE9wdGlvbnMgPSB0aGlzLmFwcGx5RHluYW1pY0xheW91dE9wdGlvbnMob3B0aW9ucyk7XHJcbiAgICBsZXQgcm93cyA9IDA7XHJcbiAgICBsZXQgY29sdW1ucyA9IDE7XHJcbiAgICBsZXQgY29sdW1uID0gMTtcclxuICAgIGxldCByb3cgPSAxO1xyXG4gICAgY29sdW1ucyA9IGxheW91dE9wdGlvbnMuY29sdW1ucy5sZW5ndGg7XHJcbiAgICBsYXlvdXRPcHRpb25zLmNvbHVtbnMuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICByb3dzID0gcm93cyArIGl0ZW0ucm93cztcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IHRlbXBsYXRlID0gW107XHJcbiAgICB0ZW1wbGF0ZS5wdXNoKCc8ZGl2IGNsYXNzPVwiZ3JvdXAtaXRlbVwiPicpO1xyXG4gICAgdGVtcGxhdGUucHVzaCgnPHA+Jyk7XHJcbiAgICB0ZW1wbGF0ZS5wdXNoKGB7JT0gJCQuZ2V0R3JvdXBGaWVsZFZhbHVlQnlOYW1lKCQsXCIke2xheW91dFswXS5wcm9wZXJ0eVBhdGh9XCIsIHRydWUpICV9YCk7XHJcbiAgICB0ZW1wbGF0ZS5wdXNoKCc8L3BcIj4nKTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGF5b3V0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGNvbnN0IGNvbHVtbkl0ZW0gPSBsYXlvdXRPcHRpb25zLmNvbHVtbnNbY29sdW1uIC0gMV07XHJcbiAgICAgIGlmICgoY29sdW1uSXRlbSkgJiYgKGNvbHVtbiA8PSBjb2x1bW5zKSAmJiAoaSAhPT0gMCkpIHtcclxuICAgICAgICBpZiAocm93ID09PSAxKSB7XHJcbiAgICAgICAgICBjb25zdCBjb2x1bW5DbGFzcyA9IGNvbHVtbkl0ZW0uY2xzcyB8fCAnJztcclxuICAgICAgICAgIHRlbXBsYXRlLnB1c2goYDxkaXYgY2xhc3M9XCJtaWNyby10ZXh0IGdyb3VwLWNvbHVtbiAke2NvbHVtbkNsYXNzfVwiPmApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBpdGVtID0gbGF5b3V0W2ldO1xyXG4gICAgICAgIGlmIChpdGVtICYmIChjb2x1bW5JdGVtLnJvd3MgPiAwKSkge1xyXG4gICAgICAgICAgaWYgKGkgIT09IDApIHtcclxuICAgICAgICAgICAgdGVtcGxhdGUucHVzaCgnPGRpdj4nKTtcclxuICAgICAgICAgICAgaWYgKCFjb2x1bW5JdGVtLmhpZGVMYWJlbHMpIHtcclxuICAgICAgICAgICAgICB0ZW1wbGF0ZS5wdXNoKGA8c3BhbiBjbGFzcz1cImdyb3VwLWxhYmVsXCI+JHt0aGlzLmdldEdyb3VwRmllbGRMYWJlbEJ5TmFtZShpdGVtLnByb3BlcnR5UGF0aCl9IDwvc3Bhbj5gKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3QgZm9ybWF0T3B0aW9ucyA9IHRoaXMuZ2V0R3JvdXBGaWVsZEZvcm1hdE9wdGlvbnMoaXRlbSk7XHJcbiAgICAgICAgICAgIGNvbnN0IGZvcm1hdENsc3MgPSBmb3JtYXRPcHRpb25zLmNsc3MgfHwgJyc7XHJcbiAgICAgICAgICAgIGNvbnN0IGpzb25TdHJpbmcgPSBqc29uLnN0cmluZ2lmeShmb3JtYXRPcHRpb25zKTtcclxuICAgICAgICAgICAgaWYgKGl0ZW0uZm9ybWF0ID09PSAnUGhvbmUnKSB7XHJcbiAgICAgICAgICAgICAgdGVtcGxhdGUucHVzaChgPHNwYW4gY2xhc3M9XCJoeXBlcmxpbmtcIiBkYXRhLWFjdGlvbj1cImdyb3VwSW52b2tlTGlzdEFjdGlvblwiIGRhdGEtbmFtZT1cImNhbGxQaG9uZVwiIGRhdGEta2V5PVwieyU6JCQuZ2V0R3JvdXBJdGVtS2V5KCQpJX1cIiBkYXRhLXByb3BlcnR5bmFtZT1cIiR7aXRlbS5wcm9wZXJ0eVBhdGh9XCI+eyU9ICQkLmdldEdyb3VwRmllbGRWYWx1ZUJ5TmFtZSgkLFwiJHtpdGVtLnByb3BlcnR5UGF0aH1cIiwgdHJ1ZSwke2pzb25TdHJpbmd9KSAlfTwvc3Bhbj5gKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChpdGVtLnByb3BlcnR5UGF0aCA9PT0gJ0VtYWlsJykge1xyXG4gICAgICAgICAgICAgIHRlbXBsYXRlLnB1c2goYDxzcGFuIGNsYXNzPVwiaHlwZXJsaW5rXCIgZGF0YS1hY3Rpb249XCJncm91cEludm9rZUxpc3RBY3Rpb25cIiBkYXRhLW5hbWU9XCJzZW5kRW1haWxcIiBkYXRhLWtleT1cInslOiQkLmdldEdyb3VwSXRlbUtleSgkKSV9XCIgZGF0YS1wcm9wZXJ0eW5hbWU9XCIke2l0ZW0ucHJvcGVydHlQYXRofVwiPnslPSAkJC5nZXRHcm91cEZpZWxkVmFsdWVCeU5hbWUoJCxcIiR7aXRlbS5wcm9wZXJ0eVBhdGh9XCIsIHRydWUsJHtqc29uU3RyaW5nfSkgJX08L3NwYW4+YCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgdGVtcGxhdGUucHVzaChgPHNwYW4gY2xhc3M9XCJncm91cC1lbnRyeSAke2Zvcm1hdENsc3N9XCI+eyU9ICQkLmdldEdyb3VwRmllbGRWYWx1ZUJ5TmFtZSgkLFwiJHtpdGVtLnByb3BlcnR5UGF0aH1cIiwgdHJ1ZSwke2pzb25TdHJpbmd9KSAlfTwvc3Bhbj5gKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0ZW1wbGF0ZS5wdXNoKCc8L2Rpdj4nKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcm93Kys7XHJcbiAgICAgICAgaWYgKHJvdyA9PT0gY29sdW1uSXRlbS5yb3dzICsgMSkge1xyXG4gICAgICAgICAgcm93ID0gMTtcclxuICAgICAgICAgIGNvbHVtbisrO1xyXG4gICAgICAgICAgdGVtcGxhdGUucHVzaCgnPC9kaXY+Jyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAocm93ICE9PSAxKSB7XHJcbiAgICAgIHRlbXBsYXRlLnB1c2goJzwvZGl2PicpO1xyXG4gICAgfVxyXG4gICAgdGVtcGxhdGUucHVzaCgnPC9kaXY+Jyk7XHJcbiAgICByZXR1cm4gbmV3IFNpbXBsYXRlKHRlbXBsYXRlKTtcclxuICB9LFxyXG4gIGFwcGx5RHluYW1pY0xheW91dE9wdGlvbnM6IGZ1bmN0aW9uIGFwcGx5RHluYW1pY0xheW91dE9wdGlvbnMob3B0aW9ucykge1xyXG4gICAgY29uc3QgbGF5b3V0T3B0aW9ucyA9IHtcclxuICAgICAgY29sdW1uczogW3tcclxuICAgICAgICByb3dzOiAzLFxyXG4gICAgICB9XSxcclxuICAgIH07XHJcbiAgICBsYW5nLm1peGluKGxheW91dE9wdGlvbnMsIG9wdGlvbnMpO1xyXG4gICAgcmV0dXJuIGxheW91dE9wdGlvbnM7XHJcbiAgfSxcclxuICBnZXRHcm91cEl0ZW1LZXk6IGZ1bmN0aW9uIGdldEdyb3VwSXRlbUtleShncm91cEVudHJ5KSB7XHJcbiAgICByZXR1cm4gZ3JvdXBFbnRyeVt0aGlzLmlkUHJvcGVydHldO1xyXG4gIH0sXHJcbiAgZ2V0R3JvdXBGaWVsZEZvcm1hdE9wdGlvbnM6IGZ1bmN0aW9uIGdldEdyb3VwRmllbGRGb3JtYXRPcHRpb25zKGxheW91dEl0ZW0pIHtcclxuICAgIGNvbnN0IGZvcm1hdHRlciA9IHRoaXMuZ2V0Rm9ybWF0dGVyQnlMYXlvdXQobGF5b3V0SXRlbSk7XHJcbiAgICBjb25zdCBvcHRpb25zID0ge1xyXG4gICAgICBmb3JtYXRTdHJpbmc6IChmb3JtYXR0ZXIgJiYgZm9ybWF0dGVyLmZvcm1hdFN0cmluZykgPyBmb3JtYXR0ZXIuZm9ybWF0U3RyaW5nIDogbnVsbCxcclxuICAgIH07XHJcblxyXG4gICAgaWYgKChmb3JtYXR0ZXIgJiYgZm9ybWF0dGVyLm9wdGlvbnMpKSB7XHJcbiAgICAgIGxhbmcubWl4aW4ob3B0aW9ucywgZm9ybWF0dGVyLm9wdGlvbnMpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG9wdGlvbnM7XHJcbiAgfSxcclxuICBnZXRHcm91cEZpZWxkTGFiZWxCeU5hbWU6IGZ1bmN0aW9uIGdldEdyb3VwRmllbGRMYWJlbEJ5TmFtZShuYW1lKSB7XHJcbiAgICBjb25zdCBsYXlvdXQgPSAodGhpcy5lbmFibGVPdmVycmlkZUxheW91dCAmJiB0aGlzLl9vdmVycmlkZUdyb3VwTGF5b3V0KSA/IHRoaXMuX292ZXJyaWRlR3JvdXBMYXlvdXQgOiB0aGlzLmxheW91dDtcclxuICAgIGxldCBsYXlvdXRJdGVtID0gbnVsbDtcclxuICAgIGxheW91dC5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgIGlmIChpdGVtLnByb3BlcnR5UGF0aCA9PT0gbmFtZSkge1xyXG4gICAgICAgIGxheW91dEl0ZW0gPSBpdGVtO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIGlmIChsYXlvdXRJdGVtKSB7XHJcbiAgICAgIHJldHVybiBsYXlvdXRJdGVtLmNhcHRpb247XHJcbiAgICB9XHJcbiAgICByZXR1cm4gJyc7XHJcbiAgfSxcclxuICBnZXRHcm91cEZpZWxkVmFsdWVCeU5hbWU6IGZ1bmN0aW9uIGdldEdyb3VwRmllbGRWYWx1ZUJ5TmFtZShlbnRyeSwgbmFtZSwgYXBwbHlGb3JtYXQsIGZvcm1hdE9wdGlvbnMpIHtcclxuICAgIGNvbnN0IGxheW91dCA9ICh0aGlzLmVuYWJsZU92ZXJyaWRlTGF5b3V0ICYmIHRoaXMuX292ZXJyaWRlR3JvdXBMYXlvdXQpID8gdGhpcy5fb3ZlcnJpZGVHcm91cExheW91dCA6IHRoaXMubGF5b3V0O1xyXG4gICAgbGV0IGxheW91dEl0ZW0gPSBudWxsO1xyXG4gICAgbGF5b3V0LmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgaWYgKGl0ZW0ucHJvcGVydHlQYXRoID09PSBuYW1lKSB7XHJcbiAgICAgICAgbGF5b3V0SXRlbSA9IGl0ZW07XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHRoaXMuZ2V0R3JvdXBGaWVsZFZhbHVlKGVudHJ5LCBsYXlvdXRJdGVtLCBhcHBseUZvcm1hdCwgZm9ybWF0T3B0aW9ucyk7XHJcbiAgfSxcclxuICBnZXRHcm91cEZpZWxkTGFiZWxCeUluZGV4OiBmdW5jdGlvbiBnZXRHcm91cEZpZWxkTGFiZWxCeUluZGV4KGxheW91dEluZGV4KSB7XHJcbiAgICBjb25zdCBsYXlvdXQgPSAodGhpcy5lbmFibGVPdmVycmlkZUxheW91dCAmJiB0aGlzLl9vdmVycmlkZUdyb3VwTGF5b3V0KSA/IHRoaXMuX292ZXJyaWRlR3JvdXBMYXlvdXQgOiB0aGlzLmxheW91dDtcclxuICAgIGlmIChsYXlvdXRbbGF5b3V0SW5kZXhdKSB7XHJcbiAgICAgIHJldHVybiBsYXlvdXRbbGF5b3V0SW5kZXhdLmNhcHRpb247XHJcbiAgICB9XHJcbiAgICByZXR1cm4gJyc7XHJcbiAgfSxcclxuICBnZXRHcm91cEZpZWxkVmFsdWVCeUluZGV4OiBmdW5jdGlvbiBnZXRHcm91cEZpZWxkVmFsdWVCeUluZGV4KGVudHJ5LCBsYXlvdXRJbmRleCwgYXBwbHlGb3JtYXQsIGZvcm1hdE9wdGlvbnMpIHtcclxuICAgIGNvbnN0IGxheW91dCA9ICh0aGlzLmVuYWJsZU92ZXJyaWRlTGF5b3V0ICYmIHRoaXMuX292ZXJyaWRlR3JvdXBMYXlvdXQpID8gdGhpcy5fb3ZlcnJpZGVHcm91cExheW91dCA6IHRoaXMubGF5b3V0O1xyXG4gICAgY29uc3QgbGF5b3V0SXRlbSA9IGxheW91dFtsYXlvdXRJbmRleF07XHJcbiAgICByZXR1cm4gdGhpcy5nZXRHcm91cEZpZWxkVmFsdWUoZW50cnksIGxheW91dEl0ZW0sIGFwcGx5Rm9ybWF0LCBmb3JtYXRPcHRpb25zKTtcclxuICB9LFxyXG4gIGdldEdyb3VwRmllbGRWYWx1ZTogZnVuY3Rpb24gZ2V0R3JvdXBGaWVsZFZhbHVlKGVudHJ5LCBsYXlvdXRJdGVtLCBhcHBseUZvcm1hdCwgZm9ybWF0T3B0aW9ucykge1xyXG4gICAgbGV0IHZhbHVlID0gbnVsbDtcclxuICAgIGxldCBmb3JtYXR0ZXIgPSBudWxsO1xyXG5cclxuICAgIGlmICgobGF5b3V0SXRlbSkgJiYgKGFwcGx5Rm9ybWF0KSkge1xyXG4gICAgICBjb25zdCBmaWVsZE5hbWUgPSB0aGlzLmdldEZpZWxkTmFtZUJ5TGF5b3V0KGxheW91dEl0ZW0pO1xyXG4gICAgICBpZiAoYXBwbHlGb3JtYXQpIHtcclxuICAgICAgICBmb3JtYXR0ZXIgPSB0aGlzLmdldEZvcm1hdHRlckJ5TGF5b3V0KGxheW91dEl0ZW0pO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChmb3JtYXR0ZXIpIHtcclxuICAgICAgICB2YWx1ZSA9IHRoaXMuZ3JvdXBUcmFuc2Zvcm1WYWx1ZShlbnRyeVtmaWVsZE5hbWVdLCBsYXlvdXRJdGVtLCBmb3JtYXR0ZXIsIGZvcm1hdE9wdGlvbnMpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHZhbHVlID0gZW50cnlbZmllbGROYW1lXTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChsYXlvdXRJdGVtKSB7XHJcbiAgICAgIGNvbnN0IGZpZWxkTmFtZSA9IHRoaXMuZ2V0RmllbGROYW1lQnlMYXlvdXQobGF5b3V0SXRlbSk7XHJcbiAgICAgIHZhbHVlID0gZW50cnlbZmllbGROYW1lXTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHZhbHVlID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdmFsdWU7XHJcbiAgfSxcclxuICBnZXRGb3JtYXR0ZXJCeUxheW91dDogZnVuY3Rpb24gZ2V0Rm9ybWF0dGVyQnlMYXlvdXQobGF5b3V0SXRlbSkge1xyXG4gICAgaWYgKCF0aGlzLl9maWVsZEZvcm1hdHRlcnMpIHtcclxuICAgICAgdGhpcy5fZmllbGRGb3JtYXR0ZXJzID0ge307XHJcbiAgICB9XHJcbiAgICBjb25zdCBwYXRoID0gYCR7bGF5b3V0SXRlbS5wcm9wZXJ0eVBhdGh9XyR7bGF5b3V0SXRlbS5pbmRleH1gO1xyXG4gICAgbGV0IGZvcm1hdHRlciA9IHRoaXMuX2ZpZWxkRm9ybWF0dGVyc1twYXRoXTtcclxuICAgIGlmICghZm9ybWF0dGVyKSB7XHJcbiAgICAgIGZvcm1hdHRlciA9IHRoaXMuZ2V0R3JvdXBGaWVsZEZvcm1hdHRlcihsYXlvdXRJdGVtKTtcclxuICAgICAgdGhpcy5fZmllbGRGb3JtYXR0ZXJzW3BhdGhdID0gZm9ybWF0dGVyO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZvcm1hdHRlcjtcclxuICB9LFxyXG4gIGdldEdyb3VwRmllbGRGb3JtYXR0ZXI6IGZ1bmN0aW9uIGdldEdyb3VwRmllbGRGb3JtYXR0ZXIobGF5b3V0SXRlbSkge1xyXG4gICAgbGV0IGZvcm1hdHRlcjtcclxuICAgIGlmICh0aGlzLmdyb3VwRmllbGRGb3JtYXR0ZXIpIHtcclxuICAgICAgZm9ybWF0dGVyID0gdGhpcy5ncm91cEZpZWxkRm9ybWF0dGVyW2xheW91dEl0ZW0ucHJvcGVydHlQYXRoXTtcclxuICAgIH1cclxuICAgIGlmICghZm9ybWF0dGVyKSB7XHJcbiAgICAgIGZvcm1hdHRlciA9IEdyb3VwVXRpbGl0eS5nZXRGb3JtYXR0ZXJCeUxheW91dChsYXlvdXRJdGVtKTtcclxuICAgIH1cclxuICAgIHJldHVybiBmb3JtYXR0ZXI7XHJcbiAgfSxcclxuICBncm91cFRyYW5zZm9ybVZhbHVlOiBmdW5jdGlvbiBncm91cFRyYW5zZm9ybVZhbHVlKHZhbHVlLCBsYXlvdXQsIGZvcm1hdHRlciwgZm9ybWF0T3B0aW9ucykge1xyXG4gICAgdHJ5IHtcclxuICAgICAgcmV0dXJuIGZvcm1hdHRlci5mb3JtYXR0ZXIodmFsdWUsIGZvcm1hdHRlci5mb3JtYXRTdHJpbmcsIGZvcm1hdE9wdGlvbnMpO1xyXG4gICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICB9XHJcbiAgfSxcclxuICBnZXRGaWVsZE5hbWVCeUxheW91dDogZnVuY3Rpb24gZ2V0RmllbGROYW1lQnlMYXlvdXQobGF5b3V0SXRlbSkge1xyXG4gICAgcmV0dXJuIEdyb3VwVXRpbGl0eS5nZXRGaWVsZE5hbWVCeUxheW91dChsYXlvdXRJdGVtKTtcclxuICB9LFxyXG4gIF9zdGFydEdyb3VwTW9kZTogZnVuY3Rpb24gX3N0YXJ0R3JvdXBNb2RlKCkge1xyXG4gICAgaWYgKHRoaXMuX29yaWdpbmFsUHJvcHMpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuX29yaWdpbmFsUHJvcHMgPSB7fTtcclxuXHJcbiAgICBjb25zdCBvcmlnaW5hbCA9IHRoaXMuX29yaWdpbmFsUHJvcHM7XHJcblxyXG4gICAgb3JpZ2luYWwucmVxdWVzdCA9IHRoaXMucmVxdWVzdCA/IHRoaXMucmVxdWVzdC5jbG9uZSgpIDogbnVsbDtcclxuICAgIG9yaWdpbmFsLnF1ZXJ5U2VsZWN0ID0gdGhpcy5xdWVyeVNlbGVjdDtcclxuICAgIG9yaWdpbmFsLnF1ZXJ5T3JkZXJCeSA9IHRoaXMucXVlcnlPcmRlckJ5O1xyXG4gICAgb3JpZ2luYWwuaWRQcm9wZXJ0eSA9IHRoaXMuaWRQcm9wZXJ0eTtcclxuICAgIG9yaWdpbmFsLmxhYmVsUHJvcGVydHkgPSB0aGlzLmxhYmVsUHJvcGVydHk7XHJcbiAgICBvcmlnaW5hbC5zdG9yZSA9IHRoaXMuc3RvcmU7XHJcbiAgICBvcmlnaW5hbC5yb3dUZW1wbGF0ZSA9IHRoaXMucm93VGVtcGxhdGU7XHJcbiAgICBvcmlnaW5hbC5pdGVtVGVtcGxhdGUgPSB0aGlzLml0ZW1UZW1wbGF0ZTtcclxuICAgIG9yaWdpbmFsLml0ZW1Gb290ZXJUZW1wbGF0ZSA9IHRoaXMuaXRlbUZvb3RlclRlbXBsYXRlO1xyXG4gICAgb3JpZ2luYWwucmVsYXRlZFZpZXdzID0gdGhpcy5yZWxhdGVkVmlld3M7XHJcbiAgICBvcmlnaW5hbC50aXRsZSA9IHRoaXMuZ2V0KCd0aXRsZScpO1xyXG4gICAgb3JpZ2luYWwuX21vZGVsID0gdGhpcy5fbW9kZWw7XHJcblxyXG4gICAgdGhpcy5fbW9kZWwgPSBudWxsO1xyXG4gICAgdGhpcy5pdGVtRm9vdGVyVGVtcGxhdGUgPSBuZXcgU2ltcGxhdGUoWyc8ZGl2PjwvZGl2PiddKTtcclxuXHJcbiAgICB0aGlzLmdyb3Vwc01vZGUgPSB0cnVlO1xyXG4gIH0sXHJcbiAgX2NsZWFyR3JvdXBNb2RlOiBmdW5jdGlvbiBfY2xlYXJHcm91cE1vZGUoKSB7XHJcbiAgICBjb25zdCBvcmlnaW5hbCA9IHRoaXMuX29yaWdpbmFsUHJvcHM7XHJcblxyXG4gICAgdGhpcy5ncm91cHNNb2RlID0gZmFsc2U7XHJcblxyXG4gICAgaWYgKCFvcmlnaW5hbCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5yZXF1ZXN0ID0gb3JpZ2luYWwucmVxdWVzdCB8fCBudWxsO1xyXG4gICAgdGhpcy5xdWVyeVNlbGVjdCA9IG9yaWdpbmFsLnF1ZXJ5U2VsZWN0O1xyXG4gICAgdGhpcy5xdWVyeU9yZGVyQnkgPSBvcmlnaW5hbC5xdWVyeU9yZGVyQnk7XHJcbiAgICB0aGlzLmlkUHJvcGVydHkgPSBvcmlnaW5hbC5pZFByb3BlcnR5O1xyXG4gICAgdGhpcy5sYWJlbFByb3BlcnR5ID0gb3JpZ2luYWwubGFiZWxQcm9wZXJ0eTtcclxuICAgIHRoaXMuc2V0KCdzdG9yZScsIG9yaWdpbmFsLnN0b3JlKTtcclxuICAgIHRoaXMucm93VGVtcGxhdGUgPSBvcmlnaW5hbC5yb3dUZW1wbGF0ZTtcclxuICAgIHRoaXMuaXRlbVRlbXBsYXRlID0gb3JpZ2luYWwuaXRlbVRlbXBsYXRlO1xyXG4gICAgdGhpcy5yZWxhdGVkVmlld3MgPSBvcmlnaW5hbC5yZWxhdGVkVmlld3M7XHJcbiAgICB0aGlzLml0ZW1Gb290ZXJUZW1wbGF0ZSA9IG9yaWdpbmFsLml0ZW1Gb290ZXJUZW1wbGF0ZTtcclxuICAgIHRoaXMuX21vZGVsID0gb3JpZ2luYWwuX21vZGVsO1xyXG5cclxuICAgIHRoaXMuX29yaWdpbmFsUHJvcHMgPSBudWxsO1xyXG5cclxuICAgIHRoaXMuX2dyb3VwSW5pdGlhbGl6ZWQgPSBmYWxzZTtcclxuICAgIHRoaXMuX2N1cnJlbnRHcm91cCA9IG51bGw7XHJcbiAgICB0aGlzLmN1cnJlbnRHcm91cElkID0gbnVsbDtcclxuICAgIEFwcC5zZXRQcmltYXJ5VGl0bGUob3JpZ2luYWwudGl0bGUpO1xyXG4gICAgdGhpcy5zZXQoJ3RpdGxlJywgb3JpZ2luYWwudGl0bGUpO1xyXG5cclxuICAgIHRoaXMuY2xlYXIoKTtcclxuICAgIHRoaXMucmVmcmVzaFJlcXVpcmVkID0gdHJ1ZTtcclxuICB9LFxyXG4gIF9vblF1ZXJ5RXJyb3I6IGZ1bmN0aW9uIF9vblF1ZXJ5RXJyb3IocXVlcnlPcHRpb25zLCBlcnJvcikge1xyXG4gICAgaWYgKHRoaXMuZ3JvdXBzRW5hYmxlZCAmJiB0aGlzLmdyb3Vwc01vZGUpIHtcclxuICAgICAgaWYgKGVycm9yLnN0YXR1cyA9PT0gNDA0KSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIHRoaXMuX29uR3JvdXBOb3RGb3VuZCgpO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHRoaXMuaW5oZXJpdGVkKGFyZ3VtZW50cyk7XHJcbiAgfSxcclxuICBfb25Hcm91cE5vdEZvdW5kOiBmdW5jdGlvbiBfb25Hcm91cE5vdEZvdW5kKCkge1xyXG4gICAgR3JvdXBVdGlsaXR5LnJlbW92ZUdyb3VwUHJlZmVyZW5jZXModGhpcy5jdXJyZW50R3JvdXBJZCwgdGhpcy5lbnRpdHlOYW1lKTtcclxuICAgIHRoaXMucmVmcmVzaFJpZ2h0RHJhd2VyKCk7XHJcbiAgICAkKHRoaXMuZG9tTm9kZSkucmVtb3ZlQ2xhc3MoJ2xpc3QtbG9hZGluZycpO1xyXG4gICAgdGhpcy5zZXQoJ2xpc3RDb250ZW50JywgdGhpcy5jdXJyZW50R291cE5vdEZvdW5kVGVtcGxhdGUuYXBwbHkodGhpcykpO1xyXG4gIH0sXHJcbiAgYWN0aXZhdGVFbnRyeTogZnVuY3Rpb24gYWN0aXZhdGVFbnRyeShwYXJhbXMpIHtcclxuICAgIGlmICh0aGlzLmdyb3Vwc0VuYWJsZWQgJiYgdGhpcy5ncm91cHNNb2RlICYmICFwYXJhbXMucmVzb2x2ZWQpIHtcclxuICAgICAgdGhpcy5fZ3JvdXBBY3RpdmF0ZUVudHJ5KHBhcmFtcyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmluaGVyaXRlZChhcmd1bWVudHMpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgX2dyb3VwQWN0aXZhdGVFbnRyeTogZnVuY3Rpb24gX2dyb3VwQWN0aXZhdGVFbnRyeShwYXJhbXMpIHtcclxuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xyXG5cclxuICAgIGlmIChwYXJhbXMua2V5KSB7XHJcbiAgICAgIGNvbnN0IHJlc29sdmVkRW50cnkgPSB0aGlzLl9nZXRSZXNvbHZlZEVudHJ5KHBhcmFtcy5rZXkpO1xyXG4gICAgICBpZiAoIXJlc29sdmVkRW50cnkpIHtcclxuICAgICAgICB0aGlzLl9mZXRjaFJlc29sdmVkRW50cnkocGFyYW1zLmtleSkudGhlbigocmVzb2x2ZWRFbnQpID0+IHtcclxuICAgICAgICAgIHBhcmFtcy5kZXNjcmlwdG9yID0gcmVzb2x2ZWRFbnQuJGRlc2NyaXB0b3I7XHJcbiAgICAgICAgICBwYXJhbXMucmVzb2x2ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgc2VsZi5hY3RpdmF0ZUVudHJ5KHBhcmFtcyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcGFyYW1zLmRlc2NyaXB0b3IgPSByZXNvbHZlZEVudHJ5LiRkZXNjcmlwdG9yO1xyXG4gICAgICAgIHBhcmFtcy5yZXNvbHZlZCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5hY3RpdmF0ZUVudHJ5KHBhcmFtcyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIF9pbnZva2VBY3Rpb246IGZ1bmN0aW9uIF9pbnZva2VBY3Rpb24odGhlQWN0aW9uLCBzZWxlY3Rpb24gPSB7fSkge1xyXG4gICAgaWYgKHRoaXMuZ3JvdXBzRW5hYmxlZCAmJiB0aGlzLmdyb3Vwc01vZGUgJiYgIXNlbGVjdGlvbi5yZXNvbHZlZCkge1xyXG4gICAgICB0aGlzLl9ncm91cEludm9rZUFjdGlvbih0aGVBY3Rpb24sIHNlbGVjdGlvbik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmluaGVyaXRlZChhcmd1bWVudHMpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgX2dyb3VwSW52b2tlQWN0aW9uOiBmdW5jdGlvbiBfZ3JvdXBJbnZva2VBY3Rpb24odGhlQWN0aW9uLCBzZWxlY3Rpb24pIHtcclxuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xyXG4gICAgY29uc3QgcmVzb2x2ZWRFbnRyeSA9IHRoaXMuX2dldFJlc29sdmVkRW50cnkoc2VsZWN0aW9uLmRhdGEuJGtleSk7XHJcbiAgICBpZiAoIXJlc29sdmVkRW50cnkpIHtcclxuICAgICAgdGhpcy5fZmV0Y2hSZXNvbHZlZEVudHJ5KHNlbGVjdGlvbi5kYXRhLiRrZXkpLnRoZW4oKHJlc29sdmVkRW50KSA9PiB7XHJcbiAgICAgICAgc2VsZi5faW52b2tlQWN0aW9uKHRoZUFjdGlvbiwge1xyXG4gICAgICAgICAgZGF0YTogcmVzb2x2ZWRFbnQsXHJcbiAgICAgICAgICByZXNvbHZlZDogdHJ1ZSxcclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLl9pbnZva2VBY3Rpb24odGhlQWN0aW9uLCB7XHJcbiAgICAgICAgZGF0YTogcmVzb2x2ZWRFbnRyeSxcclxuICAgICAgICByZXNvbHZlZDogdHJ1ZSxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBzaG93QWN0aW9uUGFuZWw6IGZ1bmN0aW9uIHNob3dBY3Rpb25QYW5lbChyb3dOb2RlKSB7XHJcbiAgICBpZiAodGhpcy5ncm91cHNFbmFibGVkICYmIHRoaXMuZ3JvdXBzTW9kZSkge1xyXG4gICAgICB0aGlzLl9ncm91cFNob3dBY3Rpb25QYW5lbChyb3dOb2RlKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuaW5oZXJpdGVkKGFyZ3VtZW50cyk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBfZ3JvdXBTaG93QWN0aW9uUGFuZWw6IGZ1bmN0aW9uIF9ncm91cFNob3dBY3Rpb25QYW5lbChyb3dOb2RlKSB7XHJcbiAgICBjb25zdCBzZWxlY3Rpb24gPSB0aGlzLl9nZXRDdXJyZW50U2VsZWN0aW9uKCk7XHJcbiAgICBjb25zdCBzZWxmID0gdGhpcztcclxuICAgIGNvbnN0IHJlc29sdmVkRW50cnkgPSB0aGlzLl9nZXRSZXNvbHZlZEVudHJ5KHNlbGVjdGlvbi5kYXRhLiRrZXkpO1xyXG4gICAgaWYgKCFyZXNvbHZlZEVudHJ5KSB7XHJcbiAgICAgIHRoaXMuX2ZldGNoUmVzb2x2ZWRFbnRyeShzZWxlY3Rpb24uZGF0YS4ka2V5KS50aGVuKChyZXNvbHZlZEVudCkgPT4ge1xyXG4gICAgICAgIHNlbGYuX2dyb3VwQ2hlY2tBY3Rpb25TdGF0ZShyZXNvbHZlZEVudCwgcm93Tm9kZSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5fZ3JvdXBDaGVja0FjdGlvblN0YXRlKHJlc29sdmVkRW50cnksIHJvd05vZGUpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgX2dyb3VwQXBwbHlBY3Rpb25QYW5lbDogZnVuY3Rpb24gX2dyb3VwQXBwbHlBY3Rpb25QYW5lbChyb3dOb2RlKSB7XHJcbiAgICBfTGlzdEJhc2UucHJvdG90eXBlLnNob3dBY3Rpb25QYW5lbC5jYWxsKHRoaXMsIHJvd05vZGUpO1xyXG4gIH0sXHJcbiAgX2dldEN1cnJlbnRTZWxlY3Rpb246IGZ1bmN0aW9uIF9nZXRDdXJyZW50U2VsZWN0aW9uKCkge1xyXG4gICAgY29uc3Qgc2VsZWN0ZWRJdGVtcyA9IHRoaXMuZ2V0KCdzZWxlY3Rpb25Nb2RlbCcpLmdldFNlbGVjdGlvbnMoKTtcclxuICAgIGxldCBzZWxlY3Rpb247XHJcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBzZWxlY3RlZEl0ZW1zKSB7XHJcbiAgICAgIGlmIChzZWxlY3RlZEl0ZW1zLmhhc093blByb3BlcnR5KGtleSkpIHtcclxuICAgICAgICBzZWxlY3Rpb24gPSBzZWxlY3RlZEl0ZW1zW2tleV07XHJcbiAgICAgICAgc2VsZWN0aW9uLmRhdGEuJGtleSA9IGtleTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHNlbGVjdGlvbjtcclxuICB9LFxyXG4gIF9mZXRjaFJlc29sdmVkRW50cnk6IGZ1bmN0aW9uIF9mZXRjaFJlc29sdmVkRW50cnkoZW50cnlLZXkpIHtcclxuICAgIGNvbnN0IGRlZiA9IG5ldyBEZWZlcnJlZCgpO1xyXG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XHJcbiAgICBjb25zdCBzdG9yZSA9IG5ldyBTRGF0YVN0b3JlKHtcclxuICAgICAgc2VydmljZTogQXBwLnNlcnZpY2VzLmNybSxcclxuICAgICAgcmVzb3VyY2VLaW5kOiB0aGlzLnJlc291cmNlS2luZCxcclxuICAgICAgY29udHJhY3ROYW1lOiB0aGlzLmNvbnRyYWN0TmFtZSxcclxuICAgICAgc2NvcGU6IHRoaXMsXHJcbiAgICB9KTtcclxuXHJcbiAgICBsZXQgc2VsZWN0ID0gdGhpcy5fb3JpZ2luYWxQcm9wcy5xdWVyeVNlbGVjdDtcclxuXHJcbiAgICAvLyBVc2UgcXVlcnlTZWxlY3QgZnJvbSB0aGUgbW9kZWwgaWYgYXZhaWxhYmxlXHJcbiAgICAvLyBUT0RPOiBFeHBvc2UgX2dldFF1ZXJ5TW9kZWxCeU5hbWUgYmV0dGVyIHNvbWVob3dcclxuICAgIGlmICh0aGlzLl9vcmlnaW5hbFByb3BzLl9tb2RlbCkge1xyXG4gICAgICBjb25zdCBxdWVyeU1vZGVsID0gdGhpcy5fb3JpZ2luYWxQcm9wcy5fbW9kZWwuX2dldFF1ZXJ5TW9kZWxCeU5hbWUoJ2xpc3QnKTtcclxuICAgICAgaWYgKHF1ZXJ5TW9kZWwgJiYgcXVlcnlNb2RlbC5xdWVyeVNlbGVjdCkge1xyXG4gICAgICAgIHNlbGVjdCA9IHF1ZXJ5TW9kZWwucXVlcnlTZWxlY3Q7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBxdWVyeU9wdGlvbnMgPSB7XHJcbiAgICAgIHNlbGVjdCxcclxuICAgICAgd2hlcmU6IGBJZCBlcSAnJHtlbnRyeUtleX0nYCxcclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgcXVlcnlSZXN1bHRzID0gc3RvcmUucXVlcnkobnVsbCwgcXVlcnlPcHRpb25zKTtcclxuXHJcbiAgICB3aGVuKHF1ZXJ5UmVzdWx0cywgKGZlZWQpID0+IHtcclxuICAgICAgY29uc3QgZW50cnkgPSBmZWVkWzBdO1xyXG4gICAgICBlbnRyeVtzZWxmLmlkUHJvcGVydHldID0gZW50cnkuJGtleTsgLy8gd2UgbmVlZCB0aGlzIGJlY2F1c2UgdGhlIGdyb3VwIGtleSBpcyBkaWZmZXJlbnQsIGFuZCBpdCB1c2VkIGxhdGVyIG9uIHdoZW4gaW52b2tpbmcgYW4gYWN0aW9uO1xyXG4gICAgICBzZWxmLl9hZGRSZXNvbHZlZEVudHJ5KGVudHJ5KTtcclxuICAgICAgZGVmLnJlc29sdmUoZW50cnkpO1xyXG4gICAgfSwgKGVycikgPT4ge1xyXG4gICAgICBkZWYucmVqZWN0KGVycik7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gZGVmLnByb21pc2U7XHJcbiAgfSxcclxuICBfY2xlYXJSZXNvbHZlZEVudHJ5Q2FjaGU6IGZ1bmN0aW9uIF9jbGVhclJlc29sdmVkRW50cnlDYWNoZSgpIHtcclxuICAgIHRoaXMuX3Jlc29sdmVkRW50cnlDYWNoZSA9IHt9O1xyXG4gIH0sXHJcbiAgX2dldFJlc29sdmVkRW50cnk6IGZ1bmN0aW9uIF9nZXRSZXNvbHZlZEVudHJ5KGVudHJ5S2V5KSB7XHJcbiAgICBpZiAoIXRoaXMuX3Jlc29sdmVkRW50cnlDYWNoZSkge1xyXG4gICAgICB0aGlzLl9yZXNvbHZlZEVudHJ5Q2FjaGUgPSB7fTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLl9yZXNvbHZlZEVudHJ5Q2FjaGVbZW50cnlLZXldO1xyXG4gIH0sXHJcbiAgX2FkZFJlc29sdmVkRW50cnk6IGZ1bmN0aW9uIF9hZGRSZXNvbHZlZEVudHJ5KGVudHJ5KSB7XHJcbiAgICB0aGlzLl9yZXNvbHZlZEVudHJ5Q2FjaGVbZW50cnkuJGtleV0gPSBlbnRyeTtcclxuICB9LFxyXG4gIF9ncm91cENoZWNrQWN0aW9uU3RhdGU6IGZ1bmN0aW9uIF9ncm91cENoZWNrQWN0aW9uU3RhdGUocmVzb2x2ZWRFbnRyeSwgcm93Tm9kZSkge1xyXG4gICAgY29uc3QgcmVzb2x2ZWRTZWxlY3Rpb24gPSB7XHJcbiAgICAgIGRhdGE6IHJlc29sdmVkRW50cnksXHJcbiAgICB9O1xyXG4gICAgdGhpcy5fYXBwbHlTdGF0ZVRvQWN0aW9ucyhyZXNvbHZlZFNlbGVjdGlvbiwgcm93Tm9kZSk7XHJcbiAgfSxcclxuICBfcmVmcmVzaExpc3Q6IGZ1bmN0aW9uIF9yZWZyZXNoTGlzdCgpIHtcclxuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xyXG4gICAgaWYgKHRoaXMuZ3JvdXBzRW5hYmxlZCAmJiB0aGlzLmdyb3VwTGlzdCAmJiB0aGlzLl9jdXJyZW50R3JvdXApIHtcclxuICAgICAgdGhpcy5fcmVxdWVzdEdyb3VwKHRoaXMuX2N1cnJlbnRHcm91cC5uYW1lLCB0aGlzLl9jdXJyZW50R3JvdXAuJGtleSwgZnVuY3Rpb24gY2hlY2tHcm91cChyZXN1bHRzKSB7XHJcbiAgICAgICAgY29uc3QgZ3JvdXAgPSByZXN1bHRzWzBdO1xyXG4gICAgICAgIGlmIChncm91cCkge1xyXG4gICAgICAgICAgR3JvdXBVdGlsaXR5LmFkZFRvR3JvdXBQcmVmZXJlbmNlcyhbZ3JvdXBdLCB0aGlzLmVudGl0eU5hbWUpO1xyXG4gICAgICAgICAgc2VsZi5zZXRDdXJyZW50R3JvdXAoZ3JvdXApO1xyXG4gICAgICAgICAgdGhpcy5yZWZyZXNoUmlnaHREcmF3ZXIoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gTm90ZSB0aGlzIGlzIHdoYXQgdGhpcy5pbmhlcml0ZWQoYXJndW1lbnRzKSBjYWxscywgYnV0IHRoYXQgbWF5IGNoYW5nZVxyXG4gICAgICAgIC8vIENhbid0IGNhbGwgdGhpcy5pbmhlcml0ZWQgYXN5bmNocm9ub3VzbHkuLi5cclxuICAgICAgICBzZWxmLmZvcmNlUmVmcmVzaCgpO1xyXG4gICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuaW5oZXJpdGVkKGFyZ3VtZW50cyk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBncm91cEludm9rZUxpc3RBY3Rpb246IGZ1bmN0aW9uIGdyb3VwSW52b2tlTGlzdEFjdGlvbihwYXJhbXMpIHtcclxuICAgIGNvbnN0IGtleSA9IHBhcmFtcy5rZXk7XHJcbiAgICBjb25zdCBwcm9wZXJ0eU5hbWUgPSBwYXJhbXMucHJvcGVydHluYW1lO1xyXG4gICAgY29uc3QgYWN0aW9uTmFtZSA9IHBhcmFtcy5uYW1lO1xyXG4gICAgY29uc3QgcmVzb2x2ZWRFbnRyeSA9IHRoaXMuX2dldFJlc29sdmVkRW50cnkoa2V5KTtcclxuICAgIGlmICghcmVzb2x2ZWRFbnRyeSkge1xyXG4gICAgICB0aGlzLl9mZXRjaFJlc29sdmVkRW50cnkoa2V5KS50aGVuKChyZXNvbHZlZEVudCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XHJcbiAgICAgICAgICBzZWxlY3Rpb246IHtcclxuICAgICAgICAgICAgZGF0YTogcmVzb2x2ZWRFbnQsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgcHJvcGVydHlOYW1lLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5ncm91cEludm9rZUFjdGlvbkJ5TmFtZShhY3Rpb25OYW1lLCBvcHRpb25zKTtcclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zdCBvcHRpb25zID0ge1xyXG4gICAgICAgIHNlbGVjdGlvbjoge1xyXG4gICAgICAgICAgZGF0YTogcmVzb2x2ZWRFbnRyeSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHByb3BlcnR5TmFtZSxcclxuICAgICAgfTtcclxuICAgICAgdGhpcy5ncm91cEludm9rZUFjdGlvbkJ5TmFtZShhY3Rpb25OYW1lLCBvcHRpb25zKTtcclxuICAgIH1cclxuICB9LFxyXG4gIGdyb3VwSW52b2tlQWN0aW9uQnlOYW1lOiBmdW5jdGlvbiBncm91cEludm9rZUFjdGlvbkJ5TmFtZShhY3Rpb25OYW1lLCBvcHRpb25zKSB7XHJcbiAgICBsZXQgb3B0ID0gb3B0aW9ucztcclxuICAgIGlmICghb3B0KSB7XHJcbiAgICAgIG9wdCA9IHt9O1xyXG4gICAgfVxyXG4gICAgc3dpdGNoIChhY3Rpb25OYW1lKSB7XHJcbiAgICAgIGNhc2UgJ2NhbGxQaG9uZSc6XHJcbiAgICAgICAgYWN0aW9uLmNhbGxQaG9uZS5jYWxsKHRoaXMsIG51bGwsIG9wdC5zZWxlY3Rpb24sIG9wdC5wcm9wZXJ0eU5hbWUsIEFjdGl2aXR5VHlwZVRleHQuYXRQaG9uZUNhbGwpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdzZW5kRW1haWwnOlxyXG4gICAgICAgIGFjdGlvbi5zZW5kRW1haWwuY2FsbCh0aGlzLCBudWxsLCBvcHQuc2VsZWN0aW9uLCBvcHQucHJvcGVydHlOYW1lKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICB9LFxyXG4gIGdldENvbnRleHRTbmFwU2hvdDogZnVuY3Rpb24gZ2V0Q29udGV4dFNuYXBTaG90KG9wdGlvbnMpIHtcclxuICAgIGxldCBzbmFwU2hvdDtcclxuICAgIGlmICh0aGlzLl9ncm91cEluaXRpYWxpemVkICYmIHRoaXMuZ3JvdXBzTW9kZSkge1xyXG4gICAgICBjb25zdCBlbnRyeSA9IHRoaXMuZW50cmllc1tvcHRpb25zLmtleV07XHJcbiAgICAgIGNvbnN0IHRlbXBsYXRlID0gdGhpcy5yb3dUZW1wbGF0ZTtcclxuICAgICAgc25hcFNob3QgPSB0ZW1wbGF0ZS5hcHBseShlbnRyeSwgdGhpcyk7XHJcbiAgICAgIHJldHVybiBzbmFwU2hvdDtcclxuICAgIH1cclxuICAgIHNuYXBTaG90ID0gdGhpcy5pbmhlcml0ZWQoYXJndW1lbnRzKTtcclxuXHJcbiAgICByZXR1cm4gc25hcFNob3Q7XHJcbiAgfSxcclxuICBpbml0TW9kZWw6IGZ1bmN0aW9uIGluaXRNb2RlbCgpIHtcclxuICAgIGlmICghdGhpcy5fZ3JvdXBJbml0aWFsaXplZCB8fCAhdGhpcy5ncm91cHNNb2RlKSB7XHJcbiAgICAgIHRoaXMuaW5oZXJpdGVkKGFyZ3VtZW50cyk7XHJcbiAgICB9XHJcbiAgfSxcclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBfX2NsYXNzO1xyXG4iXX0=
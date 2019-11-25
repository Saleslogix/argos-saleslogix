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
    getTitle: function getTitle(entry, labelProperty) {
      // labelproperty will default to the group's family, which doesn't work with all groups...
      var value = _Utility2.default.getValue(entry, labelProperty);
      if (value) {
        return value;
      }

      // Try to extract a description
      value = _Utility2.default.getValue(entry, '$descriptor') || _Utility2.default.getValue(entry, 'DESCRIPTION');
      if (value) {
        return value;
      }

      // Fallback to the first layout item
      var firstLayoutItem = this.layout && this.layout[0];
      if (firstLayoutItem && firstLayoutItem.alias) {
        return _Utility2.default.getValue(entry, firstLayoutItem.alias);
      }

      // Should never land here
      console.warn('No descriptor found for ' + labelProperty); // eslint-disable-line
      return '';
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9WaWV3cy9fR3JvdXBMaXN0TWl4aW4uanMiXSwibmFtZXMiOlsicmVzb3VyY2UiLCJfX2NsYXNzIiwibm9EZWZhdWx0R3JvdXBUZXh0IiwiY3VycmVudEdyb3VwTm90Rm91bmRUZXh0IiwiZ3JvdXBUZW1wbGF0ZVN1bW1hcnlUZXh0IiwiZ3JvdXBUZW1wbGF0ZURldGFpbFRleHQiLCJncm91cHNNb2RlVGV4dCIsImhhc0RlZmF1bHRHcm91cCIsIm5vRGVmYXVsdEdyb3VwVGVtcGxhdGUiLCJTaW1wbGF0ZSIsImN1cnJlbnRHb3VwTm90Rm91bmRUZW1wbGF0ZSIsIl9nZXROb0RlZmF1bHRHcm91cE1lc3NhZ2UiLCJfZ2V0Q3VycmVudEdyb3VwTm90Rm91bmRNZXNzYWdlIiwib3BlbkNvbmZpZ3VyZSIsIl9zZWxlY3RHcm91cHMiLCJlbnRpdHlOYW1lIiwiZ3JvdXBzRW5hYmxlZCIsImdyb3Vwc01vZGUiLCJjdXJyZW50R3JvdXBJZCIsIl9jdXJyZW50R3JvdXAiLCJfZ3JvdXBJbml0aWFsaXplZCIsIl9vcmlnaW5hbFByb3BzIiwib3ZlcnJpZGVHcm91cExheW91dE5hbWUiLCJfb3ZlcnJpZGVMYXlvdXRJbml0YWxpemVkIiwiX292ZXJyaWRlR3JvdXBMYXlvdXQiLCJlbmFibGVEeW5hbWljR3JvdXBMYXlvdXQiLCJlbmFibGVPdmVycmlkZUxheW91dCIsInNlbGVjdGVkQ29sdW1ucyIsImxheW91dCIsInBvc3RNaXhJblByb3BlcnRpZXMiLCJBcHAiLCJlbmFibGVHcm91cHMiLCJpbmhlcml0ZWQiLCJhcmd1bWVudHMiLCJzdGFydHVwIiwiY3JlYXRlR3JvdXBUZW1wbGF0ZXMiLCJnZXRUaXRsZSIsImVudHJ5IiwibGFiZWxQcm9wZXJ0eSIsInZhbHVlIiwiZ2V0VmFsdWUiLCJmaXJzdExheW91dEl0ZW0iLCJhbGlhcyIsImNvbnNvbGUiLCJ3YXJuIiwicmVxdWVzdERhdGEiLCIkIiwiZG9tTm9kZSIsImFkZENsYXNzIiwiX3NldExvYWRpbmciLCJpbml0R3JvdXAiLCJlIiwiZXJyb3IiLCJqb2luRmllbGRzIiwic2VwIiwiZmllbGRzIiwiZ2V0RGVzY3JpcHRvciIsImVudGl0eSIsIiRkZXNjcmlwdG9yIiwiJGtleSIsImdldEN1cnJlbnRHcm91cCIsInNldEN1cnJlbnRHcm91cCIsImdyb3VwIiwic2V0RGVmYXVsdEdyb3VwUHJlZmVyZW5jZSIsIm5hbWUiLCJnZXREZWZhdWx0R3JvdXAiLCJkZWZhdWx0R3JvdXAiLCJkZWZhdWx0R3JvdXBOYW1lIiwiZ2V0RGVmYXVsdEdyb3VwUHJlZmVyZW5jZSIsIl9yZXF1ZXN0R3JvdXAiLCJzZXQiLCJhcHBseSIsImluaXRPdmVycmlkZUdyb3VwTGF5b3V0IiwiX3JlcXVlc3RPdmVycmlkZUdyb3VwTGF5b3V0IiwidGhlbiIsInJlc3VsdCIsImxlbmd0aCIsIl9vbkFwcGx5R3JvdXAiLCJjbGVhciIsIl9jbGVhclJlc29sdmVkRW50cnlDYWNoZSIsIkVycm9yIiwiX2ZpZWxkRm9ybWF0dGVycyIsIl9zdGFydEdyb3VwTW9kZSIsInRpdGxlIiwiZ2V0R3JvdXBUaXRsZSIsInNldFByaW1hcnlUaXRsZSIsImdldExheW91dCIsInNlbGVjdENvbHVtbnMiLCJnZXRDb2x1bW5OYW1lcyIsIml0ZW1UZW1wbGF0ZSIsImdldEl0ZW1UZW1wbGF0ZSIsInJlcXVlc3QiLCJjcmVhdGVHcm91cFJlcXVlc3QiLCJncm91cElkIiwiY29ubmVjdGlvbiIsImdldENvbm5lY3Rpb24iLCJwdXNoIiwiZmFtaWx5IiwicXVlcnlTZWxlY3QiLCJxdWVyeU9yZGVyQnkiLCJpZFByb3BlcnR5IiwidG9VcHBlckNhc2UiLCJzdG9yZSIsInJlZnJlc2hSZXF1aXJlZCIsImRlZiIsImdyb3VwTmFtZSIsInNlcnZpY2UiLCJzZXJ2aWNlcyIsImNybSIsInJlc291cmNlS2luZCIsImNvbnRyYWN0TmFtZSIsIndoZXJlIiwiaW5jbHVkZSIsImFwcGxpY2F0aW9uTmFtZSIsInNjb3BlIiwicXVlcnlSZXN1bHRzIiwicXVlcnkiLCJyZWxhdGVkRmVlZCIsInJlc29sdmUiLCJwcm9taXNlIiwib25TdWNjZXNzIiwicXVlcnlXaGVuIiwiY29udGV4dCIsInF1ZXJ5UmVzdWx0IiwicXVlcnlSZXN1bHRGbiIsImdyb3VwRmVlZCIsIl9vbkdyb3VwUmVxdWVzdFN1Y2Nlc3MiLCJiaW5kIiwibG9nIiwiYWRkVG9Hcm91cFByZWZlcmVuY2VzIiwib25UcmFuc2l0aW9uQXdheSIsImxvYWRSaWdodERyYXdlciIsInJlbW92ZUNsYXNzIiwibGlzdExvYWRpbmciLCJfb25Hcm91cFJlcXVlc3RGYWlsZCIsImRpc3BsYXlOYW1lIiwibGF5b3V0VGVtcGxhdGUiLCJnZXRTZWxlY3RlZEdyb3VwTGF5b3V0VGVtcGxhdGUiLCJ0eXBlIiwiZ2V0RHluYW1pY0xheW91dEl0ZW1UZW1wbGF0ZSIsIm9wdGlvbnMiLCJ0ZW1wbGF0ZSIsImRlZmF1bHRHcm91cExheW91dEl0ZW1UZW1wbGF0ZSIsIm1hcCIsImdldEl0ZW1MYXlvdXRUZW1wbGF0ZSIsIml0ZW0iLCJqc29uU3RyaW5nIiwic3RyaW5naWZ5IiwiY2FwdGlvbiIsImpvaW4iLCJjcmVhdGVHcm91cFRlbXBsYXRlTGF5b3V0cyIsImdyb3VwVGVtcGxhdGVMYXlvdXRzIiwiY29sdW1ucyIsImlkIiwicm93cyIsImZvckVhY2giLCJfY3JlYXRlQ3VzdG9taXplZExheW91dCIsImxheW91dE9wdGlvbnMiLCJhcHBseUR5bmFtaWNMYXlvdXRPcHRpb25zIiwiY29sdW1uIiwicm93IiwicHJvcGVydHlQYXRoIiwiaSIsImNvbHVtbkl0ZW0iLCJjb2x1bW5DbGFzcyIsImNsc3MiLCJoaWRlTGFiZWxzIiwiZ2V0R3JvdXBGaWVsZExhYmVsQnlOYW1lIiwiZm9ybWF0T3B0aW9ucyIsImdldEdyb3VwRmllbGRGb3JtYXRPcHRpb25zIiwiZm9ybWF0Q2xzcyIsImZvcm1hdCIsIm1peGluIiwiZ2V0R3JvdXBJdGVtS2V5IiwiZ3JvdXBFbnRyeSIsImxheW91dEl0ZW0iLCJmb3JtYXR0ZXIiLCJnZXRGb3JtYXR0ZXJCeUxheW91dCIsImZvcm1hdFN0cmluZyIsImdldEdyb3VwRmllbGRWYWx1ZUJ5TmFtZSIsImFwcGx5Rm9ybWF0IiwiZ2V0R3JvdXBGaWVsZFZhbHVlIiwiZ2V0R3JvdXBGaWVsZExhYmVsQnlJbmRleCIsImxheW91dEluZGV4IiwiZ2V0R3JvdXBGaWVsZFZhbHVlQnlJbmRleCIsImZpZWxkTmFtZSIsImdldEZpZWxkTmFtZUJ5TGF5b3V0IiwiZ3JvdXBUcmFuc2Zvcm1WYWx1ZSIsInBhdGgiLCJpbmRleCIsImdldEdyb3VwRmllbGRGb3JtYXR0ZXIiLCJncm91cEZpZWxkRm9ybWF0dGVyIiwib3JpZ2luYWwiLCJjbG9uZSIsInJvd1RlbXBsYXRlIiwiaXRlbUZvb3RlclRlbXBsYXRlIiwicmVsYXRlZFZpZXdzIiwiZ2V0IiwiX21vZGVsIiwiX2NsZWFyR3JvdXBNb2RlIiwiX29uUXVlcnlFcnJvciIsInF1ZXJ5T3B0aW9ucyIsInN0YXR1cyIsIl9vbkdyb3VwTm90Rm91bmQiLCJyZW1vdmVHcm91cFByZWZlcmVuY2VzIiwicmVmcmVzaFJpZ2h0RHJhd2VyIiwiYWN0aXZhdGVFbnRyeSIsInBhcmFtcyIsInJlc29sdmVkIiwiX2dyb3VwQWN0aXZhdGVFbnRyeSIsInNlbGYiLCJrZXkiLCJyZXNvbHZlZEVudHJ5IiwiX2dldFJlc29sdmVkRW50cnkiLCJfZmV0Y2hSZXNvbHZlZEVudHJ5IiwicmVzb2x2ZWRFbnQiLCJkZXNjcmlwdG9yIiwiX2ludm9rZUFjdGlvbiIsInRoZUFjdGlvbiIsInNlbGVjdGlvbiIsIl9ncm91cEludm9rZUFjdGlvbiIsImRhdGEiLCJzaG93QWN0aW9uUGFuZWwiLCJyb3dOb2RlIiwiX2dyb3VwU2hvd0FjdGlvblBhbmVsIiwiX2dldEN1cnJlbnRTZWxlY3Rpb24iLCJfZ3JvdXBDaGVja0FjdGlvblN0YXRlIiwiX2dyb3VwQXBwbHlBY3Rpb25QYW5lbCIsInByb3RvdHlwZSIsImNhbGwiLCJzZWxlY3RlZEl0ZW1zIiwiZ2V0U2VsZWN0aW9ucyIsImhhc093blByb3BlcnR5IiwiZW50cnlLZXkiLCJzZWxlY3QiLCJxdWVyeU1vZGVsIiwiX2dldFF1ZXJ5TW9kZWxCeU5hbWUiLCJmZWVkIiwiX2FkZFJlc29sdmVkRW50cnkiLCJlcnIiLCJyZWplY3QiLCJfcmVzb2x2ZWRFbnRyeUNhY2hlIiwicmVzb2x2ZWRTZWxlY3Rpb24iLCJfYXBwbHlTdGF0ZVRvQWN0aW9ucyIsIl9yZWZyZXNoTGlzdCIsImdyb3VwTGlzdCIsImNoZWNrR3JvdXAiLCJyZXN1bHRzIiwiZm9yY2VSZWZyZXNoIiwiZ3JvdXBJbnZva2VMaXN0QWN0aW9uIiwicHJvcGVydHlOYW1lIiwicHJvcGVydHluYW1lIiwiYWN0aW9uTmFtZSIsImdyb3VwSW52b2tlQWN0aW9uQnlOYW1lIiwib3B0IiwiY2FsbFBob25lIiwiYXRQaG9uZUNhbGwiLCJzZW5kRW1haWwiLCJnZXRDb250ZXh0U25hcFNob3QiLCJzbmFwU2hvdCIsImVudHJpZXMiLCJpbml0TW9kZWwiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7OztBQTZCQSxNQUFNQSxXQUFXLG9CQUFZLGdCQUFaLENBQWpCOztBQUVBOzs7OztBQUtBLE1BQU1DLFVBQVUsdUJBQVEsMkJBQVIsRUFBcUMsSUFBckMsRUFBMkM7QUFDekRDLHdCQUFvQkYsU0FBU0Usa0JBRDRCO0FBRXpEQyw4QkFBMEJILFNBQVNHLHdCQUZzQjtBQUd6REMsOEJBQTBCSixTQUFTSSx3QkFIc0I7QUFJekRDLDZCQUF5QkwsU0FBU0ssdUJBSnVCO0FBS3pEQyxvQkFBZ0JOLFNBQVNNLGNBTGdDO0FBTXpEQyxxQkFBaUIsSUFOd0M7QUFPekRDLDRCQUF3QixJQUFJQyxRQUFKLENBQWEsQ0FDbkMsa0RBRG1DLEVBRW5DLHVFQUZtQyxFQUduQyxPQUhtQyxDQUFiLENBUGlDO0FBWXpEQyxpQ0FBNkIsSUFBSUQsUUFBSixDQUFhLENBQ3hDLHNCQUR3QyxFQUV4Qyw2RUFGd0MsRUFHeEMsT0FId0MsQ0FBYixDQVo0Qjs7QUFrQnpERSwrQkFBMkIsU0FBU0EseUJBQVQsR0FBcUM7QUFDOUQsYUFBT1gsU0FBU0Usa0JBQWhCO0FBQ0QsS0FwQndEO0FBcUJ6RFUscUNBQWlDLFNBQVNBLCtCQUFULEdBQTJDO0FBQzFFLGFBQU9aLFNBQVNHLHdCQUFoQjtBQUNELEtBdkJ3RDtBQXdCekRVLG1CQUFlLFNBQVNBLGFBQVQsR0FBeUI7QUFDdEMsVUFBSSxLQUFLQyxhQUFULEVBQXdCO0FBQ3RCLGFBQUtBLGFBQUw7QUFDRDtBQUNGLEtBNUJ3RDtBQTZCekQ7QUFDQUMsZ0JBQVksSUE5QjZDO0FBK0J6REMsbUJBQWUsS0EvQjBDO0FBZ0N6REMsZ0JBQVksS0FoQzZDO0FBaUN6REMsb0JBQWdCLElBakN5QztBQWtDekRDLG1CQUFlLElBbEMwQztBQW1DekRDLHVCQUFtQixLQW5Dc0M7QUFvQ3pEQyxvQkFBZ0IsSUFwQ3lDO0FBcUN6REMsNkJBQXlCLGVBckNnQztBQXNDekRDLCtCQUEyQixLQXRDOEI7QUF1Q3pEQywwQkFBc0IsSUF2Q21DO0FBd0N6REMsOEJBQTBCLElBeEMrQjtBQXlDekRDLDBCQUFzQixLQXpDbUM7O0FBMkN6REMscUJBQWlCLElBM0N3QztBQTRDekRDLFlBQVEsSUE1Q2lEOztBQThDekRDLHlCQUFxQixTQUFTQSxtQkFBVCxHQUErQjtBQUNsRCxVQUFJLENBQUNDLElBQUlDLFlBQVQsRUFBdUI7QUFDckIsYUFBS2QsVUFBTCxHQUFrQixLQUFsQjtBQUNBLGFBQUtELGFBQUwsR0FBcUIsS0FBckI7QUFDRDs7QUFFRCxVQUFJLEtBQUtBLGFBQVQsRUFBd0I7QUFDdEIsYUFBS0MsVUFBTCxHQUFrQixJQUFsQjtBQUNEO0FBQ0QsV0FBS2UsU0FBTCxDQUFlQyxTQUFmO0FBQ0QsS0F4RHdEO0FBeUR6REMsYUFBUyxTQUFTQSxPQUFULEdBQW1CO0FBQzFCLFdBQUtDLG9CQUFMO0FBQ0EsV0FBS0gsU0FBTCxDQUFlQyxTQUFmO0FBQ0QsS0E1RHdEO0FBNkR6REcsY0FBVSxTQUFTQSxRQUFULENBQWtCQyxLQUFsQixFQUF5QkMsYUFBekIsRUFBd0M7QUFDaEQ7QUFDQSxVQUFJQyxRQUFRLGtCQUFRQyxRQUFSLENBQWlCSCxLQUFqQixFQUF3QkMsYUFBeEIsQ0FBWjtBQUNBLFVBQUlDLEtBQUosRUFBVztBQUNULGVBQU9BLEtBQVA7QUFDRDs7QUFFRDtBQUNBQSxjQUFRLGtCQUFRQyxRQUFSLENBQWlCSCxLQUFqQixFQUF3QixhQUF4QixLQUEwQyxrQkFBUUcsUUFBUixDQUFpQkgsS0FBakIsRUFBd0IsYUFBeEIsQ0FBbEQ7QUFDQSxVQUFJRSxLQUFKLEVBQVc7QUFDVCxlQUFPQSxLQUFQO0FBQ0Q7O0FBRUQ7QUFDQSxVQUFNRSxrQkFBa0IsS0FBS2IsTUFBTCxJQUFlLEtBQUtBLE1BQUwsQ0FBWSxDQUFaLENBQXZDO0FBQ0EsVUFBSWEsbUJBQW1CQSxnQkFBZ0JDLEtBQXZDLEVBQThDO0FBQzVDLGVBQU8sa0JBQVFGLFFBQVIsQ0FBaUJILEtBQWpCLEVBQXdCSSxnQkFBZ0JDLEtBQXhDLENBQVA7QUFDRDs7QUFFRDtBQUNBQyxjQUFRQyxJQUFSLDhCQUF3Q04sYUFBeEMsRUFwQmdELENBb0JVO0FBQzFELGFBQU8sRUFBUDtBQUNELEtBbkZ3RDtBQW9GekRPLGlCQUFhLFNBQVNBLFdBQVQsR0FBdUI7QUFDbEMsVUFBSTtBQUNGLFlBQUksQ0FBQyxLQUFLekIsaUJBQU4sSUFBMkIsS0FBS0gsVUFBcEMsRUFBZ0Q7QUFDOUM2QixZQUFFLEtBQUtDLE9BQVAsRUFBZ0JDLFFBQWhCLENBQXlCLGNBQXpCO0FBQ0EsZUFBS0MsV0FBTDtBQUNBLGVBQUtDLFNBQUw7QUFDRCxTQUpELE1BSU87QUFDTCxlQUFLbEIsU0FBTCxDQUFlQyxTQUFmO0FBQ0Q7QUFDRixPQVJELENBUUUsT0FBT2tCLENBQVAsRUFBVTtBQUNWUixnQkFBUVMsS0FBUixDQUFjRCxDQUFkLEVBRFUsQ0FDUTtBQUNuQjtBQUNGLEtBaEd3RDs7QUFrR3pERSxnQkFBWSxTQUFTQSxVQUFULENBQW9CQyxHQUFwQixFQUF5QkMsTUFBekIsRUFBaUM7QUFDM0MsYUFBTyxrQkFBUUYsVUFBUixDQUFtQkMsR0FBbkIsRUFBd0JDLE1BQXhCLENBQVA7QUFDRCxLQXBHd0Q7QUFxR3pEQyxtQkFBZSxTQUFTQSxhQUFULENBQXVCQyxNQUF2QixFQUErQjtBQUM1QyxhQUFPQSxPQUFPQyxXQUFQLElBQXNCRCxPQUFPRSxJQUE3QixJQUFxQyxTQUE1QztBQUNELEtBdkd3RDtBQXdHekRDLHFCQUFpQixTQUFTQSxlQUFULEdBQTJCO0FBQzFDLGFBQU8sS0FBS3pDLGFBQVo7QUFDRCxLQTFHd0Q7QUEyR3pEMEMscUJBQWlCLFNBQVNBLGVBQVQsQ0FBeUJDLEtBQXpCLEVBQWdDO0FBQy9DLFVBQUlBLEtBQUosRUFBVztBQUNULGFBQUt2RCxlQUFMLEdBQXVCLElBQXZCO0FBQ0EsYUFBS2EsaUJBQUwsR0FBeUIsS0FBekI7QUFDQSxhQUFLRCxhQUFMLEdBQXFCMkMsS0FBckI7QUFDQSxhQUFLNUMsY0FBTCxHQUFzQjRDLE1BQU1ILElBQTVCO0FBQ0EsK0JBQWFJLHlCQUFiLENBQXVDLEtBQUtoRCxVQUE1QyxFQUF3RCtDLE1BQU1FLElBQTlEO0FBQ0Q7QUFDRixLQW5Id0Q7QUFvSHpEQyxxQkFBaUIsU0FBU0EsZUFBVCxHQUEyQjtBQUMxQyxVQUFJQyxlQUFlLElBQW5CO0FBQ0EsVUFBSUMsbUJBQW1CLElBQXZCOztBQUVBRCxxQkFBZSx1QkFBYUQsZUFBYixDQUE2QixLQUFLbEQsVUFBbEMsQ0FBZjs7QUFFQSxVQUFJbUQsWUFBSixFQUFrQjtBQUNoQixlQUFPQSxZQUFQO0FBQ0Q7O0FBRURDLHlCQUFtQix1QkFBYUMseUJBQWIsQ0FBdUMsS0FBS3JELFVBQTVDLENBQW5CO0FBQ0EsVUFBSW9ELGdCQUFKLEVBQXNCO0FBQ3BCLGFBQUtFLGFBQUwsQ0FBbUJGLGdCQUFuQjtBQUNELE9BRkQsTUFFTztBQUNMO0FBQ0EsYUFBS0csR0FBTCxDQUFTLGFBQVQsRUFBd0IsS0FBSzlELHNCQUFMLENBQTRCK0QsS0FBNUIsQ0FBa0MsSUFBbEMsQ0FBeEI7QUFDQSxhQUFLaEUsZUFBTCxHQUF1QixLQUF2QjtBQUNEOztBQUVELGFBQU8sSUFBUDtBQUNELEtBeEl3RDtBQXlJekRpRSw2QkFBeUIsU0FBU0EsdUJBQVQsR0FBbUM7QUFBQTs7QUFDMUQsV0FBS0MsMkJBQUwsR0FBbUNDLElBQW5DLENBQXdDLFVBQUNDLE1BQUQsRUFBWTtBQUNsRCxjQUFLcEQseUJBQUwsR0FBaUMsSUFBakM7QUFDQSxjQUFLQyxvQkFBTCxHQUE2Qm1ELFVBQVdBLE9BQU9DLE1BQVAsR0FBZ0IsQ0FBNUIsR0FBa0NELE9BQU8sQ0FBUCxFQUFVL0MsTUFBNUMsR0FBcUQsSUFBakY7QUFDQSxjQUFLc0IsU0FBTDtBQUNELE9BSkQ7QUFLRCxLQS9Jd0Q7QUFnSnpEQSxlQUFXLFNBQVNBLFNBQVQsR0FBcUI7QUFDOUIsVUFBSSxLQUFLeEIsb0JBQUwsSUFBNkIsQ0FBQyxLQUFLSCx5QkFBbkMsSUFBZ0UsQ0FBQyxLQUFLQyxvQkFBMUUsRUFBZ0c7QUFDOUYsYUFBS2dELHVCQUFMO0FBQ0E7QUFDRDtBQUNELFVBQUlWLFFBQVEsS0FBS0YsZUFBTCxFQUFaOztBQUVBLFVBQUksQ0FBQ0UsS0FBTCxFQUFZO0FBQ1ZBLGdCQUFRLEtBQUtHLGVBQUwsRUFBUjtBQUNBLGFBQUtKLGVBQUwsQ0FBcUJDLEtBQXJCO0FBQ0Q7O0FBRUQsVUFBSUEsS0FBSixFQUFXO0FBQ1QsYUFBS2UsYUFBTCxDQUFtQmYsS0FBbkI7QUFDRDtBQUNGLEtBL0p3RDtBQWdLekRnQixXQUFPLFNBQVNBLEtBQVQsR0FBaUI7QUFDdEIsV0FBSzlDLFNBQUwsQ0FBZUMsU0FBZjtBQUNBLFdBQUs4Qyx3QkFBTDtBQUNELEtBbkt3RDtBQW9LekRGLG1CQUFlLFNBQVNBLGFBQVQsQ0FBdUJmLEtBQXZCLEVBQThCO0FBQzNDLFVBQUksQ0FBQ0EsS0FBTCxFQUFZO0FBQ1YsY0FBTSxJQUFJa0IsS0FBSixDQUFVLGtCQUFWLENBQU47QUFDRDtBQUNELFdBQUtDLGdCQUFMLEdBQXdCLEVBQXhCO0FBQ0EsV0FBS0MsZUFBTDtBQUNBLFdBQUtILHdCQUFMOztBQUVBO0FBQ0EsVUFBTUksUUFBUSxLQUFLQyxhQUFMLENBQW1CdEIsS0FBbkIsQ0FBZDtBQUNBaEMsVUFBSXVELGVBQUosQ0FBb0JGLEtBQXBCO0FBQ0EsV0FBS2IsR0FBTCxDQUFTLE9BQVQsRUFBa0JhLEtBQWxCOztBQUVBLFVBQUksS0FBSy9ELGlCQUFULEVBQTRCO0FBQzFCO0FBQ0Q7O0FBRUQsV0FBS1EsTUFBTCxHQUFjLHVCQUFhMEQsU0FBYixDQUF1QnhCLEtBQXZCLENBQWQ7QUFDQSxXQUFLeUIsYUFBTCxHQUFxQix1QkFBYUMsY0FBYixDQUE0QixLQUFLNUQsTUFBakMsQ0FBckI7QUFDQSxXQUFLNkQsWUFBTCxHQUFvQixLQUFLQyxlQUFMLEVBQXBCOztBQUVBO0FBQ0EsV0FBS0MsT0FBTCxHQUFlLHVCQUFhQyxrQkFBYixDQUFnQztBQUM3Q0MsaUJBQVMvQixNQUFNSCxJQUQ4QjtBQUU3Q21DLG9CQUFZLEtBQUtDLGFBQUw7QUFGaUMsT0FBaEMsQ0FBZjs7QUFLQTtBQUNBLFdBQUtSLGFBQUwsQ0FBbUJTLElBQW5CLENBQTJCbEMsTUFBTW1DLE1BQWpDO0FBQ0EsV0FBS0MsV0FBTCxHQUFtQixLQUFLWCxhQUF4QjtBQUNBLFdBQUtZLFlBQUwsR0FBb0IsRUFBcEI7QUFDQSxXQUFLQyxVQUFMLEdBQXFCdEMsTUFBTW1DLE1BQU4sQ0FBYUksV0FBYixFQUFyQjtBQUNBLFdBQUsvRCxhQUFMLEdBQXFCd0IsTUFBTW1DLE1BQU4sQ0FBYUksV0FBYixFQUFyQjtBQUNBLFdBQUtDLEtBQUwsR0FBYSxJQUFiO0FBQ0EsV0FBS3hCLEtBQUwsQ0FBVyxJQUFYO0FBQ0EsV0FBS3lCLGVBQUwsR0FBdUIsSUFBdkI7QUFDQSxXQUFLbkYsaUJBQUwsR0FBeUIsSUFBekI7QUFDQSxXQUFLeUIsV0FBTDtBQUNELEtBMU13RDtBQTJNekQ0QixpQ0FBNkIsU0FBU0EsMkJBQVQsR0FBdUM7QUFDbEUsVUFBTStCLE1BQU0sd0JBQVo7QUFDQSxVQUFNQyxZQUFZLEtBQUtuRix1QkFBdkI7QUFDQSxVQUFNZ0YsUUFBUSxvQkFBZTtBQUMzQkksaUJBQVM1RSxJQUFJNkUsUUFBSixDQUFhQyxHQURLO0FBRTNCQyxzQkFBYyxRQUZhO0FBRzNCQyxzQkFBYyxRQUhhO0FBSTNCQyx5Q0FBOEIsS0FBS2hHLFVBQUwsQ0FBZ0JzRixXQUFoQixFQUE5QixrQ0FBc0ZJLFVBQVVKLFdBQVYsRUFBdEYsU0FKMkI7QUFLM0JXLGlCQUFTLENBQUMsUUFBRCxFQUFXLGNBQVgsQ0FMa0I7QUFNM0JaLG9CQUFZLE1BTmU7QUFPM0JhLHlCQUFpQixLQVBVO0FBUTNCQyxlQUFPO0FBUm9CLE9BQWYsQ0FBZDs7QUFXQSxVQUFJWixLQUFKLEVBQVc7QUFDVCxZQUFNYSxlQUFlYixNQUFNYyxLQUFOLEVBQXJCO0FBQ0EsNEJBQUtELFlBQUwsRUFBbUIsVUFBQ0UsV0FBRCxFQUFpQjtBQUNsQ2IsY0FBSWMsT0FBSixDQUFZRCxXQUFaO0FBQ0QsU0FGRCxFQUVHLFlBQU07QUFDUGIsY0FBSWMsT0FBSixDQUFZLElBQVo7QUFDRCxTQUpEO0FBS0Q7QUFDRCxhQUFPZCxJQUFJZSxPQUFYO0FBQ0QsS0FsT3dEO0FBbU96RGxELG1CQUFlLFNBQVNBLGFBQVQsQ0FBdUJvQyxTQUF2QixFQUFrQ1osT0FBbEMsRUFBMkMyQixTQUEzQyxFQUFzRDtBQUNuRSxVQUFJbEIsY0FBSjtBQUNBLFVBQUksT0FBT0csU0FBUCxLQUFxQixRQUFyQixJQUFpQ0EsY0FBYyxFQUFuRCxFQUF1RDtBQUNyREgsZ0JBQVEsb0JBQWU7QUFDckJJLG1CQUFTNUUsSUFBSTZFLFFBQUosQ0FBYUMsR0FERDtBQUVyQkMsd0JBQWMsUUFGTztBQUdyQkMsd0JBQWMsUUFITztBQUlyQkMsMkNBQThCLEtBQUtoRyxVQUFMLENBQWdCc0YsV0FBaEIsRUFBOUIsa0NBQXNGSSxVQUFVSixXQUFWLEVBQXRGLDZCQUFtSVIsT0FBbkksUUFKcUI7QUFLckJtQixtQkFBUyxDQUFDLFFBQUQsRUFBVyxjQUFYLENBTFk7QUFNckJaLHNCQUFZLE1BTlM7QUFPckJhLDJCQUFpQixLQVBJO0FBUXJCQyxpQkFBTztBQVJjLFNBQWYsQ0FBUjtBQVVEOztBQUVELFVBQUlaLEtBQUosRUFBVztBQUNULFlBQU1hLGVBQWViLE1BQU1jLEtBQU4sRUFBckI7O0FBRUEsU0FBQyxTQUFTSyxTQUFULENBQW1CQyxPQUFuQixFQUE0QkMsV0FBNUIsRUFBeUM7QUFDeEMsY0FBSTtBQUNGLGdDQUFLQSxXQUFMLEVBQWtCLFNBQVNDLGFBQVQsQ0FBdUJDLFNBQXZCLEVBQWtDO0FBQ2xELGtCQUFJLE9BQU9MLFNBQVAsS0FBcUIsVUFBekIsRUFBcUM7QUFDbkNBLDBCQUFVakQsS0FBVixDQUFnQixJQUFoQixFQUFzQnRDLFNBQXRCO0FBQ0QsZUFGRCxNQUVPO0FBQ0wscUJBQUs2RixzQkFBTCxDQUE0QkQsU0FBNUI7QUFDRDtBQUNGLGFBTmlCLENBTWhCRSxJQU5nQixDQU1YTCxPQU5XLENBQWxCO0FBT0QsV0FSRCxDQVFFLE9BQU90RSxLQUFQLEVBQWM7QUFDZFQsb0JBQVFxRixHQUFSLENBQVksK0JBQStCNUUsS0FBM0MsRUFEYyxDQUNxQztBQUNwRDtBQUNGLFNBWkQsRUFZRyxJQVpILEVBWVMrRCxZQVpUO0FBYUQ7QUFDRixLQW5Rd0Q7QUFvUXpEOUIscUJBQWlCLFNBQVNBLGVBQVQsR0FBMkI7QUFDMUMsVUFBTXZCLFFBQVEsS0FBSzNDLGFBQW5COztBQUVBLFVBQUkyQyxLQUFKLEVBQVc7QUFDVCxZQUFNcUIsUUFBUSxLQUFLQyxhQUFMLENBQW1CdEIsS0FBbkIsQ0FBZDtBQUNBLGFBQUtRLEdBQUwsQ0FBUyxPQUFULEVBQWtCYSxLQUFsQjtBQUNEOztBQUVELFdBQUtuRCxTQUFMLENBQWVDLFNBQWY7QUFDRCxLQTdRd0Q7QUE4UXpENkYsNEJBQXdCLFNBQVNBLHNCQUFULENBQWdDbkQsTUFBaEMsRUFBd0M7QUFDOUQsVUFBSUEsT0FBT0MsTUFBUCxHQUFnQixDQUFwQixFQUF1QjtBQUNyQixZQUFNZCxRQUFRYSxPQUFPLENBQVAsQ0FBZDtBQUNBLGFBQUtkLGVBQUwsQ0FBcUJDLEtBQXJCO0FBQ0EsK0JBQWFtRSxxQkFBYixDQUFtQyxDQUFDbkUsS0FBRCxDQUFuQyxFQUE0QyxLQUFLL0MsVUFBakQ7QUFDQSxhQUFLOEQsYUFBTCxDQUFtQmYsS0FBbkI7QUFDRCxPQUxELE1BS087QUFDTCxZQUFNcUIsUUFBUSxLQUFLQyxhQUFMLEVBQWQ7QUFDQXRELFlBQUl1RCxlQUFKLENBQW9CRixLQUFwQjtBQUNBLGFBQUtiLEdBQUwsQ0FBUyxPQUFULEVBQWtCYSxLQUFsQjtBQUNBLGFBQUtyRSxhQUFMO0FBQ0Q7O0FBRUQ7QUFDQSxXQUFLb0gsZ0JBQUw7QUFDQSxXQUFLQyxlQUFMOztBQUVBckYsUUFBRSxLQUFLQyxPQUFQLEVBQWdCcUYsV0FBaEIsQ0FBNEIsY0FBNUI7QUFDQSxXQUFLQyxXQUFMLEdBQW1CLEtBQW5CO0FBQ0QsS0FqU3dEO0FBa1N6REMsMEJBQXNCLFNBQVNBLG9CQUFULEdBQWdDLENBRXJELENBcFN3RDtBQXFTekRsRCxtQkFBZSxTQUFTQSxhQUFULENBQXVCdEIsS0FBdkIsRUFBOEI7QUFDM0MsYUFBT0EsTUFBTXlFLFdBQWI7QUFDRCxLQXZTd0Q7QUF3U3pEN0MscUJBQWlCLFNBQVNBLGVBQVQsR0FBMkI7QUFDMUMsVUFBTTlELFNBQVUsS0FBS0Ysb0JBQUwsSUFBNkIsS0FBS0Ysb0JBQW5DLEdBQTJELEtBQUtBLG9CQUFoRSxHQUF1RixLQUFLSSxNQUEzRztBQUNBLFVBQUksS0FBS0gsd0JBQVQsRUFBbUM7QUFDakMsWUFBTStHLGlCQUFpQixLQUFLQyw4QkFBTCxFQUF2QjtBQUNBLFlBQUlELGNBQUosRUFBb0I7QUFDbEIsY0FBSUEsZUFBZUUsSUFBZixLQUF3QixTQUE1QixFQUF1QztBQUNyQyxtQkFBTyxLQUFLQyw0QkFBTCxDQUFrQy9HLE1BQWxDLEVBQTBDNEcsZUFBZUksT0FBekQsQ0FBUDtBQUNEO0FBQ0QsY0FBSUosZUFBZUssUUFBbkIsRUFBNkI7QUFDM0IsbUJBQU8sSUFBSXBJLFFBQUosQ0FBYStILGVBQWVLLFFBQTVCLENBQVA7QUFDRDtBQUNGO0FBQ0QsZUFBTyxLQUFLQyw4QkFBWjtBQUNEO0FBQ0QsVUFBTUQsV0FBV2pILE9BQU9tSCxHQUFQLENBQVcsS0FBS0MscUJBQWhCLENBQWpCO0FBQ0EsYUFBTyxJQUFJdkksUUFBSixDQUFhb0ksUUFBYixDQUFQO0FBQ0QsS0F4VHdEO0FBeVR6REcsMkJBQXVCLFNBQVNBLHFCQUFULENBQStCQyxJQUEvQixFQUFxQztBQUMxRCxVQUFNQyxhQUFhLGVBQUtDLFNBQUwsQ0FBZUYsSUFBZixDQUFuQjtBQUNBLFVBQU1KLFdBQVcsQ0FBQyxrREFBRCxFQUFxREksS0FBS0csT0FBMUQsOEZBQTZKRixVQUE3SixXQUE2S0EsVUFBN0ssaUNBQW1OQSxVQUFuTixtQkFBNk8sTUFBN08sRUFBcVBHLElBQXJQLENBQTBQLEVBQTFQLENBQWpCOztBQUVBLGFBQU9SLFFBQVA7QUFDRCxLQTlUd0Q7QUErVHpEQyxvQ0FBZ0MsSUFBSXJJLFFBQUosQ0FBYSxDQUMzQywyRUFEMkMsRUFFM0Msb0xBRjJDLEVBRzNDLG9MQUgyQyxDQUFiLENBL1R5QjtBQW9VekQ2SSxnQ0FBNEIsU0FBU0EsMEJBQVQsR0FBc0M7QUFDaEUsV0FBS0Msb0JBQUwsR0FBNEIsQ0FBQztBQUMzQnZGLGNBQU0sU0FEcUI7QUFFM0J1RSxxQkFBYXZJLFNBQVNJLHdCQUZLO0FBRzNCc0ksY0FBTSxTQUhxQjtBQUkzQkUsaUJBQVM7QUFDUFksbUJBQVMsQ0FBQztBQUNSQyxnQkFBSSxNQURJO0FBRVJDLGtCQUFNO0FBRkUsV0FBRDtBQURGO0FBSmtCLE9BQUQsRUFVekI7QUFDRDFGLGNBQU0sUUFETDtBQUVEdUUscUJBQWF2SSxTQUFTSyx1QkFGckI7QUFHRHFJLGNBQU0sU0FITDtBQUlERSxpQkFBUztBQUNQWSxtQkFBUyxDQUFDO0FBQ1JDLGdCQUFJLE1BREk7QUFFUkMsa0JBQU07QUFGRSxXQUFELEVBR047QUFDREQsZ0JBQUksTUFESDtBQUVEQyxrQkFBTTtBQUZMLFdBSE0sRUFNTjtBQUNERCxnQkFBSSxNQURIO0FBRURDLGtCQUFNO0FBRkwsV0FOTTtBQURGO0FBSlIsT0FWeUIsQ0FBNUI7O0FBNEJBLGFBQU8sS0FBS0gsb0JBQVo7QUFDRCxLQWxXd0Q7QUFtV3pEZCxvQ0FBZ0MsU0FBU0EsOEJBQVQsR0FBMEM7QUFDeEUsVUFBSXpFLE9BQU8sdUJBQWF5RSw4QkFBYixDQUE0QyxLQUFLMUgsVUFBakQsQ0FBWDtBQUNBaUQsYUFBUUEsSUFBRCxHQUFTQSxJQUFULEdBQWdCLEVBQXZCO0FBQ0EsVUFBSXdFLGlCQUFpQixJQUFyQjtBQUNBLFdBQUtlLG9CQUFMLENBQTBCSSxPQUExQixDQUFrQyxVQUFDVixJQUFELEVBQVU7QUFDMUMsWUFBSUEsS0FBS2pGLElBQUwsS0FBY0EsSUFBbEIsRUFBd0I7QUFDdEJ3RSwyQkFBaUJTLElBQWpCO0FBQ0Q7QUFDRixPQUpEO0FBS0EsVUFBSSxDQUFDVCxjQUFMLEVBQXFCO0FBQ25CQSx5QkFBaUIsS0FBS2Usb0JBQUwsQ0FBMEIsQ0FBMUIsQ0FBakI7QUFDRDtBQUNELGFBQU9mLGNBQVA7QUFDRCxLQWhYd0Q7QUFpWHpEckcsMEJBQXNCLFNBQVNBLG9CQUFULEdBQWdDO0FBQ3BELFdBQUtvSCxvQkFBTCxHQUE0QixLQUFLSyx1QkFBTCxDQUE2QixLQUFLTiwwQkFBTCxFQUE3QixFQUFnRSxpQkFBaEUsQ0FBNUI7QUFDRCxLQW5Yd0Q7QUFvWHpEWCxrQ0FBOEIsU0FBU0EsNEJBQVQsQ0FBc0MvRyxNQUF0QyxFQUE4Q2dILE9BQTlDLEVBQXVEO0FBQ25GLFVBQU1pQixnQkFBZ0IsS0FBS0MseUJBQUwsQ0FBK0JsQixPQUEvQixDQUF0QjtBQUNBLFVBQUljLE9BQU8sQ0FBWDtBQUNBLFVBQUlGLFVBQVUsQ0FBZDtBQUNBLFVBQUlPLFNBQVMsQ0FBYjtBQUNBLFVBQUlDLE1BQU0sQ0FBVjtBQUNBUixnQkFBVUssY0FBY0wsT0FBZCxDQUFzQjVFLE1BQWhDO0FBQ0FpRixvQkFBY0wsT0FBZCxDQUFzQkcsT0FBdEIsQ0FBOEIsVUFBQ1YsSUFBRCxFQUFVO0FBQ3RDUyxlQUFPQSxPQUFPVCxLQUFLUyxJQUFuQjtBQUNELE9BRkQ7O0FBSUEsVUFBTWIsV0FBVyxFQUFqQjtBQUNBQSxlQUFTN0MsSUFBVCxDQUFjLDBCQUFkO0FBQ0E2QyxlQUFTN0MsSUFBVCxDQUFjLEtBQWQ7QUFDQTZDLGVBQVM3QyxJQUFULHlDQUFvRHBFLE9BQU8sQ0FBUCxFQUFVcUksWUFBOUQ7QUFDQXBCLGVBQVM3QyxJQUFULENBQWMsT0FBZDtBQUNBLFdBQUssSUFBSWtFLElBQUksQ0FBYixFQUFnQkEsSUFBSXRJLE9BQU9nRCxNQUEzQixFQUFtQ3NGLEdBQW5DLEVBQXdDO0FBQ3RDLFlBQU1DLGFBQWFOLGNBQWNMLE9BQWQsQ0FBc0JPLFNBQVMsQ0FBL0IsQ0FBbkI7QUFDQSxZQUFLSSxVQUFELElBQWlCSixVQUFVUCxPQUEzQixJQUF3Q1UsTUFBTSxDQUFsRCxFQUFzRDtBQUNwRCxjQUFJRixRQUFRLENBQVosRUFBZTtBQUNiLGdCQUFNSSxjQUFjRCxXQUFXRSxJQUFYLElBQW1CLEVBQXZDO0FBQ0F4QixxQkFBUzdDLElBQVQsMENBQXFEb0UsV0FBckQ7QUFDRDtBQUNELGNBQU1uQixPQUFPckgsT0FBT3NJLENBQVAsQ0FBYjtBQUNBLGNBQUlqQixRQUFTa0IsV0FBV1QsSUFBWCxHQUFrQixDQUEvQixFQUFtQztBQUNqQyxnQkFBSVEsTUFBTSxDQUFWLEVBQWE7QUFDWHJCLHVCQUFTN0MsSUFBVCxDQUFjLE9BQWQ7QUFDQSxrQkFBSSxDQUFDbUUsV0FBV0csVUFBaEIsRUFBNEI7QUFDMUJ6Qix5QkFBUzdDLElBQVQsZ0NBQTJDLEtBQUt1RSx3QkFBTCxDQUE4QnRCLEtBQUtnQixZQUFuQyxDQUEzQztBQUNEOztBQUVELGtCQUFNTyxnQkFBZ0IsS0FBS0MsMEJBQUwsQ0FBZ0N4QixJQUFoQyxDQUF0QjtBQUNBLGtCQUFNeUIsYUFBYUYsY0FBY0gsSUFBZCxJQUFzQixFQUF6QztBQUNBLGtCQUFNbkIsYUFBYSxlQUFLQyxTQUFMLENBQWVxQixhQUFmLENBQW5CO0FBQ0Esa0JBQUl2QixLQUFLMEIsTUFBTCxLQUFnQixPQUFwQixFQUE2QjtBQUMzQjlCLHlCQUFTN0MsSUFBVCxpSkFBNEppRCxLQUFLZ0IsWUFBakssNkNBQXFOaEIsS0FBS2dCLFlBQTFOLGdCQUFpUGYsVUFBalA7QUFDRCxlQUZELE1BRU8sSUFBSUQsS0FBS2dCLFlBQUwsS0FBc0IsT0FBMUIsRUFBbUM7QUFDeENwQix5QkFBUzdDLElBQVQsaUpBQTRKaUQsS0FBS2dCLFlBQWpLLDZDQUFxTmhCLEtBQUtnQixZQUExTixnQkFBaVBmLFVBQWpQO0FBQ0QsZUFGTSxNQUVBO0FBQ0xMLHlCQUFTN0MsSUFBVCwrQkFBMEMwRSxVQUExQyw2Q0FBNEZ6QixLQUFLZ0IsWUFBakcsZ0JBQXdIZixVQUF4SDtBQUNEO0FBQ0RMLHVCQUFTN0MsSUFBVCxDQUFjLFFBQWQ7QUFDRDtBQUNGO0FBQ0RnRTtBQUNBLGNBQUlBLFFBQVFHLFdBQVdULElBQVgsR0FBa0IsQ0FBOUIsRUFBaUM7QUFDL0JNLGtCQUFNLENBQU47QUFDQUQ7QUFDQWxCLHFCQUFTN0MsSUFBVCxDQUFjLFFBQWQ7QUFDRDtBQUNGO0FBQ0Y7QUFDRCxVQUFJZ0UsUUFBUSxDQUFaLEVBQWU7QUFDYm5CLGlCQUFTN0MsSUFBVCxDQUFjLFFBQWQ7QUFDRDtBQUNENkMsZUFBUzdDLElBQVQsQ0FBYyxRQUFkO0FBQ0EsYUFBTyxJQUFJdkYsUUFBSixDQUFhb0ksUUFBYixDQUFQO0FBQ0QsS0E3YXdEO0FBOGF6RGlCLCtCQUEyQixTQUFTQSx5QkFBVCxDQUFtQ2xCLE9BQW5DLEVBQTRDO0FBQ3JFLFVBQU1pQixnQkFBZ0I7QUFDcEJMLGlCQUFTLENBQUM7QUFDUkUsZ0JBQU07QUFERSxTQUFEO0FBRFcsT0FBdEI7QUFLQSxxQkFBS2tCLEtBQUwsQ0FBV2YsYUFBWCxFQUEwQmpCLE9BQTFCO0FBQ0EsYUFBT2lCLGFBQVA7QUFDRCxLQXRid0Q7QUF1YnpEZ0IscUJBQWlCLFNBQVNBLGVBQVQsQ0FBeUJDLFVBQXpCLEVBQXFDO0FBQ3BELGFBQU9BLFdBQVcsS0FBSzFFLFVBQWhCLENBQVA7QUFDRCxLQXpid0Q7QUEwYnpEcUUsZ0NBQTRCLFNBQVNBLDBCQUFULENBQW9DTSxVQUFwQyxFQUFnRDtBQUMxRSxVQUFNQyxZQUFZLEtBQUtDLG9CQUFMLENBQTBCRixVQUExQixDQUFsQjtBQUNBLFVBQU1uQyxVQUFVO0FBQ2RzQyxzQkFBZUYsYUFBYUEsVUFBVUUsWUFBeEIsR0FBd0NGLFVBQVVFLFlBQWxELEdBQWlFO0FBRGpFLE9BQWhCOztBQUlBLFVBQUtGLGFBQWFBLFVBQVVwQyxPQUE1QixFQUFzQztBQUNwQyx1QkFBS2dDLEtBQUwsQ0FBV2hDLE9BQVgsRUFBb0JvQyxVQUFVcEMsT0FBOUI7QUFDRDtBQUNELGFBQU9BLE9BQVA7QUFDRCxLQXBjd0Q7QUFxY3pEMkIsOEJBQTBCLFNBQVNBLHdCQUFULENBQWtDdkcsSUFBbEMsRUFBd0M7QUFDaEUsVUFBTXBDLFNBQVUsS0FBS0Ysb0JBQUwsSUFBNkIsS0FBS0Ysb0JBQW5DLEdBQTJELEtBQUtBLG9CQUFoRSxHQUF1RixLQUFLSSxNQUEzRztBQUNBLFVBQUltSixhQUFhLElBQWpCO0FBQ0FuSixhQUFPK0gsT0FBUCxDQUFlLFVBQUNWLElBQUQsRUFBVTtBQUN2QixZQUFJQSxLQUFLZ0IsWUFBTCxLQUFzQmpHLElBQTFCLEVBQWdDO0FBQzlCK0csdUJBQWE5QixJQUFiO0FBQ0Q7QUFDRixPQUpEO0FBS0EsVUFBSThCLFVBQUosRUFBZ0I7QUFDZCxlQUFPQSxXQUFXM0IsT0FBbEI7QUFDRDtBQUNELGFBQU8sRUFBUDtBQUNELEtBamR3RDtBQWtkekQrQiw4QkFBMEIsU0FBU0Esd0JBQVQsQ0FBa0M5SSxLQUFsQyxFQUF5QzJCLElBQXpDLEVBQStDb0gsV0FBL0MsRUFBNERaLGFBQTVELEVBQTJFO0FBQ25HLFVBQU01SSxTQUFVLEtBQUtGLG9CQUFMLElBQTZCLEtBQUtGLG9CQUFuQyxHQUEyRCxLQUFLQSxvQkFBaEUsR0FBdUYsS0FBS0ksTUFBM0c7QUFDQSxVQUFJbUosYUFBYSxJQUFqQjtBQUNBbkosYUFBTytILE9BQVAsQ0FBZSxVQUFDVixJQUFELEVBQVU7QUFDdkIsWUFBSUEsS0FBS2dCLFlBQUwsS0FBc0JqRyxJQUExQixFQUFnQztBQUM5QitHLHVCQUFhOUIsSUFBYjtBQUNEO0FBQ0YsT0FKRDtBQUtBLGFBQU8sS0FBS29DLGtCQUFMLENBQXdCaEosS0FBeEIsRUFBK0IwSSxVQUEvQixFQUEyQ0ssV0FBM0MsRUFBd0RaLGFBQXhELENBQVA7QUFDRCxLQTNkd0Q7QUE0ZHpEYywrQkFBMkIsU0FBU0EseUJBQVQsQ0FBbUNDLFdBQW5DLEVBQWdEO0FBQ3pFLFVBQU0zSixTQUFVLEtBQUtGLG9CQUFMLElBQTZCLEtBQUtGLG9CQUFuQyxHQUEyRCxLQUFLQSxvQkFBaEUsR0FBdUYsS0FBS0ksTUFBM0c7QUFDQSxVQUFJQSxPQUFPMkosV0FBUCxDQUFKLEVBQXlCO0FBQ3ZCLGVBQU8zSixPQUFPMkosV0FBUCxFQUFvQm5DLE9BQTNCO0FBQ0Q7QUFDRCxhQUFPLEVBQVA7QUFDRCxLQWxld0Q7QUFtZXpEb0MsK0JBQTJCLFNBQVNBLHlCQUFULENBQW1DbkosS0FBbkMsRUFBMENrSixXQUExQyxFQUF1REgsV0FBdkQsRUFBb0VaLGFBQXBFLEVBQW1GO0FBQzVHLFVBQU01SSxTQUFVLEtBQUtGLG9CQUFMLElBQTZCLEtBQUtGLG9CQUFuQyxHQUEyRCxLQUFLQSxvQkFBaEUsR0FBdUYsS0FBS0ksTUFBM0c7QUFDQSxVQUFNbUosYUFBYW5KLE9BQU8ySixXQUFQLENBQW5CO0FBQ0EsYUFBTyxLQUFLRixrQkFBTCxDQUF3QmhKLEtBQXhCLEVBQStCMEksVUFBL0IsRUFBMkNLLFdBQTNDLEVBQXdEWixhQUF4RCxDQUFQO0FBQ0QsS0F2ZXdEO0FBd2V6RGEsd0JBQW9CLFNBQVNBLGtCQUFULENBQTRCaEosS0FBNUIsRUFBbUMwSSxVQUFuQyxFQUErQ0ssV0FBL0MsRUFBNERaLGFBQTVELEVBQTJFO0FBQzdGLFVBQUlqSSxRQUFRLElBQVo7QUFDQSxVQUFJeUksWUFBWSxJQUFoQjs7QUFFQSxVQUFLRCxVQUFELElBQWlCSyxXQUFyQixFQUFtQztBQUNqQyxZQUFNSyxZQUFZLEtBQUtDLG9CQUFMLENBQTBCWCxVQUExQixDQUFsQjtBQUNBLFlBQUlLLFdBQUosRUFBaUI7QUFDZkosc0JBQVksS0FBS0Msb0JBQUwsQ0FBMEJGLFVBQTFCLENBQVo7QUFDRDtBQUNELFlBQUlDLFNBQUosRUFBZTtBQUNiekksa0JBQVEsS0FBS29KLG1CQUFMLENBQXlCdEosTUFBTW9KLFNBQU4sQ0FBekIsRUFBMkNWLFVBQTNDLEVBQXVEQyxTQUF2RCxFQUFrRVIsYUFBbEUsQ0FBUjtBQUNELFNBRkQsTUFFTztBQUNMakksa0JBQVFGLE1BQU1vSixTQUFOLENBQVI7QUFDRDtBQUNGLE9BVkQsTUFVTyxJQUFJVixVQUFKLEVBQWdCO0FBQ3JCLFlBQU1VLGFBQVksS0FBS0Msb0JBQUwsQ0FBMEJYLFVBQTFCLENBQWxCO0FBQ0F4SSxnQkFBUUYsTUFBTW9KLFVBQU4sQ0FBUjtBQUNELE9BSE0sTUFHQTtBQUNMbEosZ0JBQVEsSUFBUjtBQUNEOztBQUVELGFBQU9BLEtBQVA7QUFDRCxLQTlmd0Q7QUErZnpEMEksMEJBQXNCLFNBQVNBLG9CQUFULENBQThCRixVQUE5QixFQUEwQztBQUM5RCxVQUFJLENBQUMsS0FBSzlGLGdCQUFWLEVBQTRCO0FBQzFCLGFBQUtBLGdCQUFMLEdBQXdCLEVBQXhCO0FBQ0Q7QUFDRCxVQUFNMkcsT0FBVWIsV0FBV2QsWUFBckIsU0FBcUNjLFdBQVdjLEtBQXREO0FBQ0EsVUFBSWIsWUFBWSxLQUFLL0YsZ0JBQUwsQ0FBc0IyRyxJQUF0QixDQUFoQjtBQUNBLFVBQUksQ0FBQ1osU0FBTCxFQUFnQjtBQUNkQSxvQkFBWSxLQUFLYyxzQkFBTCxDQUE0QmYsVUFBNUIsQ0FBWjtBQUNBLGFBQUs5RixnQkFBTCxDQUFzQjJHLElBQXRCLElBQThCWixTQUE5QjtBQUNEO0FBQ0QsYUFBT0EsU0FBUDtBQUNELEtBMWdCd0Q7QUEyZ0J6RGMsNEJBQXdCLFNBQVNBLHNCQUFULENBQWdDZixVQUFoQyxFQUE0QztBQUNsRSxVQUFJQyxrQkFBSjtBQUNBLFVBQUksS0FBS2UsbUJBQVQsRUFBOEI7QUFDNUJmLG9CQUFZLEtBQUtlLG1CQUFMLENBQXlCaEIsV0FBV2QsWUFBcEMsQ0FBWjtBQUNEO0FBQ0QsVUFBSSxDQUFDZSxTQUFMLEVBQWdCO0FBQ2RBLG9CQUFZLHVCQUFhQyxvQkFBYixDQUFrQ0YsVUFBbEMsQ0FBWjtBQUNEO0FBQ0QsYUFBT0MsU0FBUDtBQUNELEtBcGhCd0Q7QUFxaEJ6RFcseUJBQXFCLFNBQVNBLG1CQUFULENBQTZCcEosS0FBN0IsRUFBb0NYLE1BQXBDLEVBQTRDb0osU0FBNUMsRUFBdURSLGFBQXZELEVBQXNFO0FBQ3pGLFVBQUk7QUFDRixlQUFPUSxVQUFVQSxTQUFWLENBQW9CekksS0FBcEIsRUFBMkJ5SSxVQUFVRSxZQUFyQyxFQUFtRFYsYUFBbkQsQ0FBUDtBQUNELE9BRkQsQ0FFRSxPQUFPckgsQ0FBUCxFQUFVO0FBQ1YsZUFBT1osS0FBUDtBQUNEO0FBQ0YsS0EzaEJ3RDtBQTRoQnpEbUosMEJBQXNCLFNBQVNBLG9CQUFULENBQThCWCxVQUE5QixFQUEwQztBQUM5RCxhQUFPLHVCQUFhVyxvQkFBYixDQUFrQ1gsVUFBbEMsQ0FBUDtBQUNELEtBOWhCd0Q7QUEraEJ6RDdGLHFCQUFpQixTQUFTQSxlQUFULEdBQTJCO0FBQzFDLFVBQUksS0FBSzdELGNBQVQsRUFBeUI7QUFDdkI7QUFDRDs7QUFFRCxXQUFLQSxjQUFMLEdBQXNCLEVBQXRCOztBQUVBLFVBQU0ySyxXQUFXLEtBQUszSyxjQUF0Qjs7QUFFQTJLLGVBQVNyRyxPQUFULEdBQW1CLEtBQUtBLE9BQUwsR0FBZSxLQUFLQSxPQUFMLENBQWFzRyxLQUFiLEVBQWYsR0FBc0MsSUFBekQ7QUFDQUQsZUFBUzlGLFdBQVQsR0FBdUIsS0FBS0EsV0FBNUI7QUFDQThGLGVBQVM3RixZQUFULEdBQXdCLEtBQUtBLFlBQTdCO0FBQ0E2RixlQUFTNUYsVUFBVCxHQUFzQixLQUFLQSxVQUEzQjtBQUNBNEYsZUFBUzFKLGFBQVQsR0FBeUIsS0FBS0EsYUFBOUI7QUFDQTBKLGVBQVMxRixLQUFULEdBQWlCLEtBQUtBLEtBQXRCO0FBQ0EwRixlQUFTRSxXQUFULEdBQXVCLEtBQUtBLFdBQTVCO0FBQ0FGLGVBQVN2RyxZQUFULEdBQXdCLEtBQUtBLFlBQTdCO0FBQ0F1RyxlQUFTRyxrQkFBVCxHQUE4QixLQUFLQSxrQkFBbkM7QUFDQUgsZUFBU0ksWUFBVCxHQUF3QixLQUFLQSxZQUE3QjtBQUNBSixlQUFTN0csS0FBVCxHQUFpQixLQUFLa0gsR0FBTCxDQUFTLE9BQVQsQ0FBakI7QUFDQUwsZUFBU00sTUFBVCxHQUFrQixLQUFLQSxNQUF2Qjs7QUFFQSxXQUFLQSxNQUFMLEdBQWMsSUFBZDtBQUNBLFdBQUtILGtCQUFMLEdBQTBCLElBQUkxTCxRQUFKLENBQWEsQ0FBQyxhQUFELENBQWIsQ0FBMUI7O0FBRUEsV0FBS1EsVUFBTCxHQUFrQixJQUFsQjtBQUNELEtBempCd0Q7QUEwakJ6RHNMLHFCQUFpQixTQUFTQSxlQUFULEdBQTJCO0FBQzFDLFVBQU1QLFdBQVcsS0FBSzNLLGNBQXRCOztBQUVBLFdBQUtKLFVBQUwsR0FBa0IsS0FBbEI7O0FBRUEsVUFBSSxDQUFDK0ssUUFBTCxFQUFlO0FBQ2I7QUFDRDs7QUFFRCxXQUFLckcsT0FBTCxHQUFlcUcsU0FBU3JHLE9BQVQsSUFBb0IsSUFBbkM7QUFDQSxXQUFLTyxXQUFMLEdBQW1COEYsU0FBUzlGLFdBQTVCO0FBQ0EsV0FBS0MsWUFBTCxHQUFvQjZGLFNBQVM3RixZQUE3QjtBQUNBLFdBQUtDLFVBQUwsR0FBa0I0RixTQUFTNUYsVUFBM0I7QUFDQSxXQUFLOUQsYUFBTCxHQUFxQjBKLFNBQVMxSixhQUE5QjtBQUNBLFdBQUtnQyxHQUFMLENBQVMsT0FBVCxFQUFrQjBILFNBQVMxRixLQUEzQjtBQUNBLFdBQUs0RixXQUFMLEdBQW1CRixTQUFTRSxXQUE1QjtBQUNBLFdBQUt6RyxZQUFMLEdBQW9CdUcsU0FBU3ZHLFlBQTdCO0FBQ0EsV0FBSzJHLFlBQUwsR0FBb0JKLFNBQVNJLFlBQTdCO0FBQ0EsV0FBS0Qsa0JBQUwsR0FBMEJILFNBQVNHLGtCQUFuQztBQUNBLFdBQUtHLE1BQUwsR0FBY04sU0FBU00sTUFBdkI7O0FBRUEsV0FBS2pMLGNBQUwsR0FBc0IsSUFBdEI7O0FBRUEsV0FBS0QsaUJBQUwsR0FBeUIsS0FBekI7QUFDQSxXQUFLRCxhQUFMLEdBQXFCLElBQXJCO0FBQ0EsV0FBS0QsY0FBTCxHQUFzQixJQUF0QjtBQUNBWSxVQUFJdUQsZUFBSixDQUFvQjJHLFNBQVM3RyxLQUE3QjtBQUNBLFdBQUtiLEdBQUwsQ0FBUyxPQUFULEVBQWtCMEgsU0FBUzdHLEtBQTNCOztBQUVBLFdBQUtMLEtBQUw7QUFDQSxXQUFLeUIsZUFBTCxHQUF1QixJQUF2QjtBQUNELEtBemxCd0Q7QUEwbEJ6RGlHLG1CQUFlLFNBQVNBLGFBQVQsQ0FBdUJDLFlBQXZCLEVBQXFDckosS0FBckMsRUFBNEM7QUFDekQsVUFBSSxLQUFLcEMsYUFBTCxJQUFzQixLQUFLQyxVQUEvQixFQUEyQztBQUN6QyxZQUFJbUMsTUFBTXNKLE1BQU4sS0FBaUIsR0FBckIsRUFBMEI7QUFDeEIsY0FBSTtBQUNGLGlCQUFLQyxnQkFBTDtBQUNBO0FBQ0QsV0FIRCxDQUdFLE9BQU94SixDQUFQLEVBQVU7QUFDVlIsb0JBQVFTLEtBQVIsQ0FBY0QsQ0FBZCxFQURVLENBQ1E7QUFDbkI7QUFDRjtBQUNGO0FBQ0QsV0FBS25CLFNBQUwsQ0FBZUMsU0FBZjtBQUNELEtBdG1Cd0Q7QUF1bUJ6RDBLLHNCQUFrQixTQUFTQSxnQkFBVCxHQUE0QjtBQUM1Qyw2QkFBYUMsc0JBQWIsQ0FBb0MsS0FBSzFMLGNBQXpDLEVBQXlELEtBQUtILFVBQTlEO0FBQ0EsV0FBSzhMLGtCQUFMO0FBQ0EvSixRQUFFLEtBQUtDLE9BQVAsRUFBZ0JxRixXQUFoQixDQUE0QixjQUE1QjtBQUNBLFdBQUs5RCxHQUFMLENBQVMsYUFBVCxFQUF3QixLQUFLNUQsMkJBQUwsQ0FBaUM2RCxLQUFqQyxDQUF1QyxJQUF2QyxDQUF4QjtBQUNELEtBNW1Cd0Q7QUE2bUJ6RHVJLG1CQUFlLFNBQVNBLGFBQVQsQ0FBdUJDLE1BQXZCLEVBQStCO0FBQzVDLFVBQUksS0FBSy9MLGFBQUwsSUFBc0IsS0FBS0MsVUFBM0IsSUFBeUMsQ0FBQzhMLE9BQU9DLFFBQXJELEVBQStEO0FBQzdELGFBQUtDLG1CQUFMLENBQXlCRixNQUF6QjtBQUNELE9BRkQsTUFFTztBQUNMLGFBQUsvSyxTQUFMLENBQWVDLFNBQWY7QUFDRDtBQUNGLEtBbm5Cd0Q7QUFvbkJ6RGdMLHlCQUFxQixTQUFTQSxtQkFBVCxDQUE2QkYsTUFBN0IsRUFBcUM7QUFDeEQsVUFBTUcsT0FBTyxJQUFiOztBQUVBLFVBQUlILE9BQU9JLEdBQVgsRUFBZ0I7QUFDZCxZQUFNQyxnQkFBZ0IsS0FBS0MsaUJBQUwsQ0FBdUJOLE9BQU9JLEdBQTlCLENBQXRCO0FBQ0EsWUFBSSxDQUFDQyxhQUFMLEVBQW9CO0FBQ2xCLGVBQUtFLG1CQUFMLENBQXlCUCxPQUFPSSxHQUFoQyxFQUFxQ3pJLElBQXJDLENBQTBDLFVBQUM2SSxXQUFELEVBQWlCO0FBQ3pEUixtQkFBT1MsVUFBUCxHQUFvQkQsWUFBWTdKLFdBQWhDO0FBQ0FxSixtQkFBT0MsUUFBUCxHQUFrQixJQUFsQjtBQUNBRSxpQkFBS0osYUFBTCxDQUFtQkMsTUFBbkI7QUFDRCxXQUpEO0FBS0QsU0FORCxNQU1PO0FBQ0xBLGlCQUFPUyxVQUFQLEdBQW9CSixjQUFjMUosV0FBbEM7QUFDQXFKLGlCQUFPQyxRQUFQLEdBQWtCLElBQWxCO0FBQ0EsZUFBS0YsYUFBTCxDQUFtQkMsTUFBbkI7QUFDRDtBQUNGO0FBQ0YsS0Fyb0J3RDtBQXNvQnpEVSxtQkFBZSxTQUFTQSxhQUFULENBQXVCQyxTQUF2QixFQUFrRDtBQUFBLFVBQWhCQyxTQUFnQix1RUFBSixFQUFJOztBQUMvRCxVQUFJLEtBQUszTSxhQUFMLElBQXNCLEtBQUtDLFVBQTNCLElBQXlDLENBQUMwTSxVQUFVWCxRQUF4RCxFQUFrRTtBQUNoRSxhQUFLWSxrQkFBTCxDQUF3QkYsU0FBeEIsRUFBbUNDLFNBQW5DO0FBQ0QsT0FGRCxNQUVPO0FBQ0wsYUFBSzNMLFNBQUwsQ0FBZUMsU0FBZjtBQUNEO0FBQ0YsS0E1b0J3RDtBQTZvQnpEMkwsd0JBQW9CLFNBQVNBLGtCQUFULENBQTRCRixTQUE1QixFQUF1Q0MsU0FBdkMsRUFBa0Q7QUFDcEUsVUFBTVQsT0FBTyxJQUFiO0FBQ0EsVUFBTUUsZ0JBQWdCLEtBQUtDLGlCQUFMLENBQXVCTSxVQUFVRSxJQUFWLENBQWVsSyxJQUF0QyxDQUF0QjtBQUNBLFVBQUksQ0FBQ3lKLGFBQUwsRUFBb0I7QUFDbEIsYUFBS0UsbUJBQUwsQ0FBeUJLLFVBQVVFLElBQVYsQ0FBZWxLLElBQXhDLEVBQThDZSxJQUE5QyxDQUFtRCxVQUFDNkksV0FBRCxFQUFpQjtBQUNsRUwsZUFBS08sYUFBTCxDQUFtQkMsU0FBbkIsRUFBOEI7QUFDNUJHLGtCQUFNTixXQURzQjtBQUU1QlAsc0JBQVU7QUFGa0IsV0FBOUI7QUFJRCxTQUxEO0FBTUQsT0FQRCxNQU9PO0FBQ0wsYUFBS1MsYUFBTCxDQUFtQkMsU0FBbkIsRUFBOEI7QUFDNUJHLGdCQUFNVCxhQURzQjtBQUU1Qkosb0JBQVU7QUFGa0IsU0FBOUI7QUFJRDtBQUNGLEtBN3BCd0Q7QUE4cEJ6RGMscUJBQWlCLFNBQVNBLGVBQVQsQ0FBeUJDLE9BQXpCLEVBQWtDO0FBQ2pELFVBQUksS0FBSy9NLGFBQUwsSUFBc0IsS0FBS0MsVUFBL0IsRUFBMkM7QUFDekMsYUFBSytNLHFCQUFMLENBQTJCRCxPQUEzQjtBQUNELE9BRkQsTUFFTztBQUNMLGFBQUsvTCxTQUFMLENBQWVDLFNBQWY7QUFDRDtBQUNGLEtBcHFCd0Q7QUFxcUJ6RCtMLDJCQUF1QixTQUFTQSxxQkFBVCxDQUErQkQsT0FBL0IsRUFBd0M7QUFDN0QsVUFBTUosWUFBWSxLQUFLTSxvQkFBTCxFQUFsQjtBQUNBLFVBQU1mLE9BQU8sSUFBYjtBQUNBLFVBQU1FLGdCQUFnQixLQUFLQyxpQkFBTCxDQUF1Qk0sVUFBVUUsSUFBVixDQUFlbEssSUFBdEMsQ0FBdEI7QUFDQSxVQUFJLENBQUN5SixhQUFMLEVBQW9CO0FBQ2xCLGFBQUtFLG1CQUFMLENBQXlCSyxVQUFVRSxJQUFWLENBQWVsSyxJQUF4QyxFQUE4Q2UsSUFBOUMsQ0FBbUQsVUFBQzZJLFdBQUQsRUFBaUI7QUFDbEVMLGVBQUtnQixzQkFBTCxDQUE0QlgsV0FBNUIsRUFBeUNRLE9BQXpDO0FBQ0QsU0FGRDtBQUdELE9BSkQsTUFJTztBQUNMLGFBQUtHLHNCQUFMLENBQTRCZCxhQUE1QixFQUEyQ1csT0FBM0M7QUFDRDtBQUNGLEtBaHJCd0Q7QUFpckJ6REksNEJBQXdCLFNBQVNBLHNCQUFULENBQWdDSixPQUFoQyxFQUF5QztBQUMvRCx5QkFBVUssU0FBVixDQUFvQk4sZUFBcEIsQ0FBb0NPLElBQXBDLENBQXlDLElBQXpDLEVBQStDTixPQUEvQztBQUNELEtBbnJCd0Q7QUFvckJ6REUsMEJBQXNCLFNBQVNBLG9CQUFULEdBQWdDO0FBQ3BELFVBQU1LLGdCQUFnQixLQUFLakMsR0FBTCxDQUFTLGdCQUFULEVBQTJCa0MsYUFBM0IsRUFBdEI7QUFDQSxVQUFJWixrQkFBSjtBQUNBLFdBQUssSUFBTVIsR0FBWCxJQUFrQm1CLGFBQWxCLEVBQWlDO0FBQy9CLFlBQUlBLGNBQWNFLGNBQWQsQ0FBNkJyQixHQUE3QixDQUFKLEVBQXVDO0FBQ3JDUSxzQkFBWVcsY0FBY25CLEdBQWQsQ0FBWjtBQUNBUSxvQkFBVUUsSUFBVixDQUFlbEssSUFBZixHQUFzQndKLEdBQXRCO0FBQ0E7QUFDRDtBQUNGO0FBQ0QsYUFBT1EsU0FBUDtBQUNELEtBL3JCd0Q7QUFnc0J6REwseUJBQXFCLFNBQVNBLG1CQUFULENBQTZCbUIsUUFBN0IsRUFBdUM7QUFDMUQsVUFBTWpJLE1BQU0sd0JBQVo7QUFDQSxVQUFNMEcsT0FBTyxJQUFiO0FBQ0EsVUFBTTVHLFFBQVEsb0JBQWU7QUFDM0JJLGlCQUFTNUUsSUFBSTZFLFFBQUosQ0FBYUMsR0FESztBQUUzQkMsc0JBQWMsS0FBS0EsWUFGUTtBQUczQkMsc0JBQWMsS0FBS0EsWUFIUTtBQUkzQkksZUFBTztBQUpvQixPQUFmLENBQWQ7O0FBT0EsVUFBSXdILFNBQVMsS0FBS3JOLGNBQUwsQ0FBb0I2RSxXQUFqQzs7QUFFQTtBQUNBO0FBQ0EsVUFBSSxLQUFLN0UsY0FBTCxDQUFvQmlMLE1BQXhCLEVBQWdDO0FBQzlCLFlBQU1xQyxhQUFhLEtBQUt0TixjQUFMLENBQW9CaUwsTUFBcEIsQ0FBMkJzQyxvQkFBM0IsQ0FBZ0QsTUFBaEQsQ0FBbkI7QUFDQSxZQUFJRCxjQUFjQSxXQUFXekksV0FBN0IsRUFBMEM7QUFDeEN3SSxtQkFBU0MsV0FBV3pJLFdBQXBCO0FBQ0Q7QUFDRjs7QUFFRCxVQUFNdUcsZUFBZTtBQUNuQmlDLHNCQURtQjtBQUVuQjNILDRCQUFpQjBILFFBQWpCO0FBRm1CLE9BQXJCOztBQUtBLFVBQU10SCxlQUFlYixNQUFNYyxLQUFOLENBQVksSUFBWixFQUFrQnFGLFlBQWxCLENBQXJCOztBQUVBLDBCQUFLdEYsWUFBTCxFQUFtQixVQUFDMEgsSUFBRCxFQUFVO0FBQzNCLFlBQU14TSxRQUFRd00sS0FBSyxDQUFMLENBQWQ7QUFDQXhNLGNBQU02SyxLQUFLOUcsVUFBWCxJQUF5Qi9ELE1BQU1zQixJQUEvQixDQUYyQixDQUVVO0FBQ3JDdUosYUFBSzRCLGlCQUFMLENBQXVCek0sS0FBdkI7QUFDQW1FLFlBQUljLE9BQUosQ0FBWWpGLEtBQVo7QUFDRCxPQUxELEVBS0csVUFBQzBNLEdBQUQsRUFBUztBQUNWdkksWUFBSXdJLE1BQUosQ0FBV0QsR0FBWDtBQUNELE9BUEQ7O0FBU0EsYUFBT3ZJLElBQUllLE9BQVg7QUFDRCxLQXR1QndEO0FBdXVCekR4Qyw4QkFBMEIsU0FBU0Esd0JBQVQsR0FBb0M7QUFDNUQsV0FBS2tLLG1CQUFMLEdBQTJCLEVBQTNCO0FBQ0QsS0F6dUJ3RDtBQTB1QnpENUIsdUJBQW1CLFNBQVNBLGlCQUFULENBQTJCb0IsUUFBM0IsRUFBcUM7QUFDdEQsVUFBSSxDQUFDLEtBQUtRLG1CQUFWLEVBQStCO0FBQzdCLGFBQUtBLG1CQUFMLEdBQTJCLEVBQTNCO0FBQ0Q7QUFDRCxhQUFPLEtBQUtBLG1CQUFMLENBQXlCUixRQUF6QixDQUFQO0FBQ0QsS0EvdUJ3RDtBQWd2QnpESyx1QkFBbUIsU0FBU0EsaUJBQVQsQ0FBMkJ6TSxLQUEzQixFQUFrQztBQUNuRCxXQUFLNE0sbUJBQUwsQ0FBeUI1TSxNQUFNc0IsSUFBL0IsSUFBdUN0QixLQUF2QztBQUNELEtBbHZCd0Q7QUFtdkJ6RDZMLDRCQUF3QixTQUFTQSxzQkFBVCxDQUFnQ2QsYUFBaEMsRUFBK0NXLE9BQS9DLEVBQXdEO0FBQzlFLFVBQU1tQixvQkFBb0I7QUFDeEJyQixjQUFNVDtBQURrQixPQUExQjtBQUdBLFdBQUsrQixvQkFBTCxDQUEwQkQsaUJBQTFCLEVBQTZDbkIsT0FBN0M7QUFDRCxLQXh2QndEO0FBeXZCekRxQixrQkFBYyxTQUFTQSxZQUFULEdBQXdCO0FBQ3BDLFVBQU1sQyxPQUFPLElBQWI7QUFDQSxVQUFJLEtBQUtsTSxhQUFMLElBQXNCLEtBQUtxTyxTQUEzQixJQUF3QyxLQUFLbE8sYUFBakQsRUFBZ0U7QUFDOUQsYUFBS2tELGFBQUwsQ0FBbUIsS0FBS2xELGFBQUwsQ0FBbUI2QyxJQUF0QyxFQUE0QyxLQUFLN0MsYUFBTCxDQUFtQndDLElBQS9ELEVBQXFFLFNBQVMyTCxVQUFULENBQW9CQyxPQUFwQixFQUE2QjtBQUNoRyxjQUFNekwsUUFBUXlMLFFBQVEsQ0FBUixDQUFkO0FBQ0EsY0FBSXpMLEtBQUosRUFBVztBQUNULG1DQUFhbUUscUJBQWIsQ0FBbUMsQ0FBQ25FLEtBQUQsQ0FBbkMsRUFBNEMsS0FBSy9DLFVBQWpEO0FBQ0FtTSxpQkFBS3JKLGVBQUwsQ0FBcUJDLEtBQXJCO0FBQ0EsaUJBQUsrSSxrQkFBTDtBQUNEO0FBQ0Q7QUFDQTtBQUNBSyxlQUFLc0MsWUFBTDtBQUNELFNBVkQ7QUFXRCxPQVpELE1BWU87QUFDTCxhQUFLeE4sU0FBTCxDQUFlQyxTQUFmO0FBQ0Q7QUFDRixLQTF3QndEO0FBMndCekR3TiwyQkFBdUIsU0FBU0EscUJBQVQsQ0FBK0IxQyxNQUEvQixFQUF1QztBQUFBOztBQUM1RCxVQUFNSSxNQUFNSixPQUFPSSxHQUFuQjtBQUNBLFVBQU11QyxlQUFlM0MsT0FBTzRDLFlBQTVCO0FBQ0EsVUFBTUMsYUFBYTdDLE9BQU8vSSxJQUExQjtBQUNBLFVBQU1vSixnQkFBZ0IsS0FBS0MsaUJBQUwsQ0FBdUJGLEdBQXZCLENBQXRCO0FBQ0EsVUFBSSxDQUFDQyxhQUFMLEVBQW9CO0FBQ2xCLGFBQUtFLG1CQUFMLENBQXlCSCxHQUF6QixFQUE4QnpJLElBQTlCLENBQW1DLFVBQUM2SSxXQUFELEVBQWlCO0FBQ2xELGNBQU0zRSxVQUFVO0FBQ2QrRSx1QkFBVztBQUNURSxvQkFBTU47QUFERyxhQURHO0FBSWRtQztBQUpjLFdBQWhCO0FBTUEsaUJBQUtHLHVCQUFMLENBQTZCRCxVQUE3QixFQUF5Q2hILE9BQXpDO0FBQ0QsU0FSRDtBQVNELE9BVkQsTUFVTztBQUNMLFlBQU1BLFVBQVU7QUFDZCtFLHFCQUFXO0FBQ1RFLGtCQUFNVDtBQURHLFdBREc7QUFJZHNDO0FBSmMsU0FBaEI7QUFNQSxhQUFLRyx1QkFBTCxDQUE2QkQsVUFBN0IsRUFBeUNoSCxPQUF6QztBQUNEO0FBQ0YsS0FueUJ3RDtBQW95QnpEaUgsNkJBQXlCLFNBQVNBLHVCQUFULENBQWlDRCxVQUFqQyxFQUE2Q2hILE9BQTdDLEVBQXNEO0FBQzdFLFVBQUlrSCxNQUFNbEgsT0FBVjtBQUNBLFVBQUksQ0FBQ2tILEdBQUwsRUFBVTtBQUNSQSxjQUFNLEVBQU47QUFDRDtBQUNELGNBQVFGLFVBQVI7QUFDRSxhQUFLLFdBQUw7QUFDRSwyQkFBT0csU0FBUCxDQUFpQjFCLElBQWpCLENBQXNCLElBQXRCLEVBQTRCLElBQTVCLEVBQWtDeUIsSUFBSW5DLFNBQXRDLEVBQWlEbUMsSUFBSUosWUFBckQsRUFBbUUsMkJBQWlCTSxXQUFwRjtBQUNBO0FBQ0YsYUFBSyxXQUFMO0FBQ0UsMkJBQU9DLFNBQVAsQ0FBaUI1QixJQUFqQixDQUFzQixJQUF0QixFQUE0QixJQUE1QixFQUFrQ3lCLElBQUluQyxTQUF0QyxFQUFpRG1DLElBQUlKLFlBQXJEO0FBQ0E7QUFDRjtBQUNFO0FBUko7QUFVRCxLQW56QndEO0FBb3pCekRRLHdCQUFvQixTQUFTQSxrQkFBVCxDQUE0QnRILE9BQTVCLEVBQXFDO0FBQ3ZELFVBQUl1SCxpQkFBSjtBQUNBLFVBQUksS0FBSy9PLGlCQUFMLElBQTBCLEtBQUtILFVBQW5DLEVBQStDO0FBQzdDLFlBQU1vQixRQUFRLEtBQUsrTixPQUFMLENBQWF4SCxRQUFRdUUsR0FBckIsQ0FBZDtBQUNBLFlBQU10RSxXQUFXLEtBQUtxRCxXQUF0QjtBQUNBaUUsbUJBQVd0SCxTQUFTdEUsS0FBVCxDQUFlbEMsS0FBZixFQUFzQixJQUF0QixDQUFYO0FBQ0EsZUFBTzhOLFFBQVA7QUFDRDtBQUNEQSxpQkFBVyxLQUFLbk8sU0FBTCxDQUFlQyxTQUFmLENBQVg7O0FBRUEsYUFBT2tPLFFBQVA7QUFDRCxLQS96QndEO0FBZzBCekRFLGVBQVcsU0FBU0EsU0FBVCxHQUFxQjtBQUM5QixVQUFJLENBQUMsS0FBS2pQLGlCQUFOLElBQTJCLENBQUMsS0FBS0gsVUFBckMsRUFBaUQ7QUFDL0MsYUFBS2UsU0FBTCxDQUFlQyxTQUFmO0FBQ0Q7QUFDRjtBQXAwQndELEdBQTNDLENBQWhCOztvQkF1MEJlaEMsTyIsImZpbGUiOiJfR3JvdXBMaXN0TWl4aW4uanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IDIwMTcgSW5mb3JcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG5pbXBvcnQgZGVjbGFyZSBmcm9tICdkb2pvL19iYXNlL2RlY2xhcmUnO1xyXG5pbXBvcnQganNvbiBmcm9tICdkb2pvL2pzb24nO1xyXG5pbXBvcnQgdXRpbGl0eSBmcm9tICdhcmdvcy9VdGlsaXR5JztcclxuaW1wb3J0IF9MaXN0QmFzZSBmcm9tICdhcmdvcy9fTGlzdEJhc2UnO1xyXG5pbXBvcnQgR3JvdXBVdGlsaXR5IGZyb20gJy4uL0dyb3VwVXRpbGl0eSc7XHJcbmltcG9ydCB3aGVuIGZyb20gJ2Rvam8vd2hlbic7XHJcbmltcG9ydCBsYW5nIGZyb20gJ2Rvam8vX2Jhc2UvbGFuZyc7XHJcbmltcG9ydCBTRGF0YVN0b3JlIGZyb20gJ2FyZ29zL1N0b3JlL1NEYXRhJztcclxuaW1wb3J0IERlZmVycmVkIGZyb20gJ2Rvam8vRGVmZXJyZWQnO1xyXG5pbXBvcnQgYWN0aW9uIGZyb20gJy4uL0FjdGlvbic7XHJcbmltcG9ydCBBY3Rpdml0eVR5cGVUZXh0IGZyb20gJy4uL01vZGVscy9BY3Rpdml0eS9BY3Rpdml0eVR5cGVUZXh0JztcclxuaW1wb3J0IGdldFJlc291cmNlIGZyb20gJ2FyZ29zL0kxOG4nO1xyXG5cclxuXHJcbmNvbnN0IHJlc291cmNlID0gZ2V0UmVzb3VyY2UoJ2dyb3VwTGlzdE1peGluJyk7XHJcblxyXG4vKipcclxuICogQGNsYXNzIGNybS5WaWV3cy5fR3JvdXBMaXN0TWl4aW5cclxuICogQGNsYXNzZGVzYyBNaXhpbiBmb3Igc2x4IGdyb3VwIGxpc3QgbGF5b3V0cy5cclxuICogQHNpbmNlIDMuMVxyXG4gKi9cclxuY29uc3QgX19jbGFzcyA9IGRlY2xhcmUoJ2NybS5WaWV3cy5fR3JvdXBMaXN0TWl4aW4nLCBudWxsLCB7XHJcbiAgbm9EZWZhdWx0R3JvdXBUZXh0OiByZXNvdXJjZS5ub0RlZmF1bHRHcm91cFRleHQsXHJcbiAgY3VycmVudEdyb3VwTm90Rm91bmRUZXh0OiByZXNvdXJjZS5jdXJyZW50R3JvdXBOb3RGb3VuZFRleHQsXHJcbiAgZ3JvdXBUZW1wbGF0ZVN1bW1hcnlUZXh0OiByZXNvdXJjZS5ncm91cFRlbXBsYXRlU3VtbWFyeVRleHQsXHJcbiAgZ3JvdXBUZW1wbGF0ZURldGFpbFRleHQ6IHJlc291cmNlLmdyb3VwVGVtcGxhdGVEZXRhaWxUZXh0LFxyXG4gIGdyb3Vwc01vZGVUZXh0OiByZXNvdXJjZS5ncm91cHNNb2RlVGV4dCxcclxuICBoYXNEZWZhdWx0R3JvdXA6IHRydWUsXHJcbiAgbm9EZWZhdWx0R3JvdXBUZW1wbGF0ZTogbmV3IFNpbXBsYXRlKFtcclxuICAgICc8bGkgY2xhc3M9XCJuby1kYXRhXCIgZGF0YS1hY3Rpb249XCJvcGVuQ29uZmlndXJlXCI+JyxcclxuICAgICc8cCBjbGFzcz1cImxpc3R2aWV3LWhlYWRpbmdcIj57JT0gJCQuX2dldE5vRGVmYXVsdEdyb3VwTWVzc2FnZSgpICV9PC9wPicsXHJcbiAgICAnPC9saT4nLFxyXG4gIF0pLFxyXG4gIGN1cnJlbnRHb3VwTm90Rm91bmRUZW1wbGF0ZTogbmV3IFNpbXBsYXRlKFtcclxuICAgICc8bGkgY2xhc3M9XCJuby1kYXRhXCI+JyxcclxuICAgICc8cCBjbGFzcz1cImxpc3R2aWV3LWhlYWRpbmdcIj57JT0gJCQuX2dldEN1cnJlbnRHcm91cE5vdEZvdW5kTWVzc2FnZSgpICV9PC9wPicsXHJcbiAgICAnPC9saT4nLFxyXG4gIF0pLFxyXG5cclxuICBfZ2V0Tm9EZWZhdWx0R3JvdXBNZXNzYWdlOiBmdW5jdGlvbiBfZ2V0Tm9EZWZhdWx0R3JvdXBNZXNzYWdlKCkge1xyXG4gICAgcmV0dXJuIHJlc291cmNlLm5vRGVmYXVsdEdyb3VwVGV4dDtcclxuICB9LFxyXG4gIF9nZXRDdXJyZW50R3JvdXBOb3RGb3VuZE1lc3NhZ2U6IGZ1bmN0aW9uIF9nZXRDdXJyZW50R3JvdXBOb3RGb3VuZE1lc3NhZ2UoKSB7XHJcbiAgICByZXR1cm4gcmVzb3VyY2UuY3VycmVudEdyb3VwTm90Rm91bmRUZXh0O1xyXG4gIH0sXHJcbiAgb3BlbkNvbmZpZ3VyZTogZnVuY3Rpb24gb3BlbkNvbmZpZ3VyZSgpIHtcclxuICAgIGlmICh0aGlzLl9zZWxlY3RHcm91cHMpIHtcclxuICAgICAgdGhpcy5fc2VsZWN0R3JvdXBzKCk7XHJcbiAgICB9XHJcbiAgfSxcclxuICAvLyBWaWV3IFByb3BlcnRpZXNcclxuICBlbnRpdHlOYW1lOiBudWxsLFxyXG4gIGdyb3Vwc0VuYWJsZWQ6IGZhbHNlLFxyXG4gIGdyb3Vwc01vZGU6IGZhbHNlLFxyXG4gIGN1cnJlbnRHcm91cElkOiBudWxsLFxyXG4gIF9jdXJyZW50R3JvdXA6IG51bGwsXHJcbiAgX2dyb3VwSW5pdGlhbGl6ZWQ6IGZhbHNlLFxyXG4gIF9vcmlnaW5hbFByb3BzOiBudWxsLFxyXG4gIG92ZXJyaWRlR3JvdXBMYXlvdXROYW1lOiAnQE1vYmlsZUxheW91dCcsXHJcbiAgX292ZXJyaWRlTGF5b3V0SW5pdGFsaXplZDogZmFsc2UsXHJcbiAgX292ZXJyaWRlR3JvdXBMYXlvdXQ6IG51bGwsXHJcbiAgZW5hYmxlRHluYW1pY0dyb3VwTGF5b3V0OiB0cnVlLFxyXG4gIGVuYWJsZU92ZXJyaWRlTGF5b3V0OiBmYWxzZSxcclxuXHJcbiAgc2VsZWN0ZWRDb2x1bW5zOiBudWxsLFxyXG4gIGxheW91dDogbnVsbCxcclxuXHJcbiAgcG9zdE1peEluUHJvcGVydGllczogZnVuY3Rpb24gcG9zdE1peEluUHJvcGVydGllcygpIHtcclxuICAgIGlmICghQXBwLmVuYWJsZUdyb3Vwcykge1xyXG4gICAgICB0aGlzLmdyb3Vwc01vZGUgPSBmYWxzZTtcclxuICAgICAgdGhpcy5ncm91cHNFbmFibGVkID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHRoaXMuZ3JvdXBzRW5hYmxlZCkge1xyXG4gICAgICB0aGlzLmdyb3Vwc01vZGUgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgdGhpcy5pbmhlcml0ZWQoYXJndW1lbnRzKTtcclxuICB9LFxyXG4gIHN0YXJ0dXA6IGZ1bmN0aW9uIHN0YXJ0dXAoKSB7XHJcbiAgICB0aGlzLmNyZWF0ZUdyb3VwVGVtcGxhdGVzKCk7XHJcbiAgICB0aGlzLmluaGVyaXRlZChhcmd1bWVudHMpO1xyXG4gIH0sXHJcbiAgZ2V0VGl0bGU6IGZ1bmN0aW9uIGdldFRpdGxlKGVudHJ5LCBsYWJlbFByb3BlcnR5KSB7XHJcbiAgICAvLyBsYWJlbHByb3BlcnR5IHdpbGwgZGVmYXVsdCB0byB0aGUgZ3JvdXAncyBmYW1pbHksIHdoaWNoIGRvZXNuJ3Qgd29yayB3aXRoIGFsbCBncm91cHMuLi5cclxuICAgIGxldCB2YWx1ZSA9IHV0aWxpdHkuZ2V0VmFsdWUoZW50cnksIGxhYmVsUHJvcGVydHkpO1xyXG4gICAgaWYgKHZhbHVlKSB7XHJcbiAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBUcnkgdG8gZXh0cmFjdCBhIGRlc2NyaXB0aW9uXHJcbiAgICB2YWx1ZSA9IHV0aWxpdHkuZ2V0VmFsdWUoZW50cnksICckZGVzY3JpcHRvcicpIHx8IHV0aWxpdHkuZ2V0VmFsdWUoZW50cnksICdERVNDUklQVElPTicpO1xyXG4gICAgaWYgKHZhbHVlKSB7XHJcbiAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBGYWxsYmFjayB0byB0aGUgZmlyc3QgbGF5b3V0IGl0ZW1cclxuICAgIGNvbnN0IGZpcnN0TGF5b3V0SXRlbSA9IHRoaXMubGF5b3V0ICYmIHRoaXMubGF5b3V0WzBdO1xyXG4gICAgaWYgKGZpcnN0TGF5b3V0SXRlbSAmJiBmaXJzdExheW91dEl0ZW0uYWxpYXMpIHtcclxuICAgICAgcmV0dXJuIHV0aWxpdHkuZ2V0VmFsdWUoZW50cnksIGZpcnN0TGF5b3V0SXRlbS5hbGlhcyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gU2hvdWxkIG5ldmVyIGxhbmQgaGVyZVxyXG4gICAgY29uc29sZS53YXJuKGBObyBkZXNjcmlwdG9yIGZvdW5kIGZvciAke2xhYmVsUHJvcGVydHl9YCk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcclxuICAgIHJldHVybiAnJztcclxuICB9LFxyXG4gIHJlcXVlc3REYXRhOiBmdW5jdGlvbiByZXF1ZXN0RGF0YSgpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGlmICghdGhpcy5fZ3JvdXBJbml0aWFsaXplZCAmJiB0aGlzLmdyb3Vwc01vZGUpIHtcclxuICAgICAgICAkKHRoaXMuZG9tTm9kZSkuYWRkQ2xhc3MoJ2xpc3QtbG9hZGluZycpO1xyXG4gICAgICAgIHRoaXMuX3NldExvYWRpbmcoKTtcclxuICAgICAgICB0aGlzLmluaXRHcm91cCgpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHRoaXMuaW5oZXJpdGVkKGFyZ3VtZW50cyk7XHJcbiAgICAgIH1cclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgY29uc29sZS5lcnJvcihlKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIGpvaW5GaWVsZHM6IGZ1bmN0aW9uIGpvaW5GaWVsZHMoc2VwLCBmaWVsZHMpIHtcclxuICAgIHJldHVybiB1dGlsaXR5LmpvaW5GaWVsZHMoc2VwLCBmaWVsZHMpO1xyXG4gIH0sXHJcbiAgZ2V0RGVzY3JpcHRvcjogZnVuY3Rpb24gZ2V0RGVzY3JpcHRvcihlbnRpdHkpIHtcclxuICAgIHJldHVybiBlbnRpdHkuJGRlc2NyaXB0b3IgfHwgZW50aXR5LiRrZXkgfHwgJ3Vua25vd24nO1xyXG4gIH0sXHJcbiAgZ2V0Q3VycmVudEdyb3VwOiBmdW5jdGlvbiBnZXRDdXJyZW50R3JvdXAoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fY3VycmVudEdyb3VwO1xyXG4gIH0sXHJcbiAgc2V0Q3VycmVudEdyb3VwOiBmdW5jdGlvbiBzZXRDdXJyZW50R3JvdXAoZ3JvdXApIHtcclxuICAgIGlmIChncm91cCkge1xyXG4gICAgICB0aGlzLmhhc0RlZmF1bHRHcm91cCA9IHRydWU7XHJcbiAgICAgIHRoaXMuX2dyb3VwSW5pdGlhbGl6ZWQgPSBmYWxzZTtcclxuICAgICAgdGhpcy5fY3VycmVudEdyb3VwID0gZ3JvdXA7XHJcbiAgICAgIHRoaXMuY3VycmVudEdyb3VwSWQgPSBncm91cC4ka2V5O1xyXG4gICAgICBHcm91cFV0aWxpdHkuc2V0RGVmYXVsdEdyb3VwUHJlZmVyZW5jZSh0aGlzLmVudGl0eU5hbWUsIGdyb3VwLm5hbWUpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgZ2V0RGVmYXVsdEdyb3VwOiBmdW5jdGlvbiBnZXREZWZhdWx0R3JvdXAoKSB7XHJcbiAgICBsZXQgZGVmYXVsdEdyb3VwID0gbnVsbDtcclxuICAgIGxldCBkZWZhdWx0R3JvdXBOYW1lID0gbnVsbDtcclxuXHJcbiAgICBkZWZhdWx0R3JvdXAgPSBHcm91cFV0aWxpdHkuZ2V0RGVmYXVsdEdyb3VwKHRoaXMuZW50aXR5TmFtZSk7XHJcblxyXG4gICAgaWYgKGRlZmF1bHRHcm91cCkge1xyXG4gICAgICByZXR1cm4gZGVmYXVsdEdyb3VwO1xyXG4gICAgfVxyXG5cclxuICAgIGRlZmF1bHRHcm91cE5hbWUgPSBHcm91cFV0aWxpdHkuZ2V0RGVmYXVsdEdyb3VwUHJlZmVyZW5jZSh0aGlzLmVudGl0eU5hbWUpO1xyXG4gICAgaWYgKGRlZmF1bHRHcm91cE5hbWUpIHtcclxuICAgICAgdGhpcy5fcmVxdWVzdEdyb3VwKGRlZmF1bHRHcm91cE5hbWUpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gTm8gZGVmYXVsdCBncm91cCBwcmVmZXJlbmNlXHJcbiAgICAgIHRoaXMuc2V0KCdsaXN0Q29udGVudCcsIHRoaXMubm9EZWZhdWx0R3JvdXBUZW1wbGF0ZS5hcHBseSh0aGlzKSk7XHJcbiAgICAgIHRoaXMuaGFzRGVmYXVsdEdyb3VwID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfSxcclxuICBpbml0T3ZlcnJpZGVHcm91cExheW91dDogZnVuY3Rpb24gaW5pdE92ZXJyaWRlR3JvdXBMYXlvdXQoKSB7XHJcbiAgICB0aGlzLl9yZXF1ZXN0T3ZlcnJpZGVHcm91cExheW91dCgpLnRoZW4oKHJlc3VsdCkgPT4ge1xyXG4gICAgICB0aGlzLl9vdmVycmlkZUxheW91dEluaXRhbGl6ZWQgPSB0cnVlO1xyXG4gICAgICB0aGlzLl9vdmVycmlkZUdyb3VwTGF5b3V0ID0gKHJlc3VsdCAmJiAocmVzdWx0Lmxlbmd0aCA+IDApKSA/IHJlc3VsdFswXS5sYXlvdXQgOiBudWxsO1xyXG4gICAgICB0aGlzLmluaXRHcm91cCgpO1xyXG4gICAgfSk7XHJcbiAgfSxcclxuICBpbml0R3JvdXA6IGZ1bmN0aW9uIGluaXRHcm91cCgpIHtcclxuICAgIGlmICh0aGlzLmVuYWJsZU92ZXJyaWRlTGF5b3V0ICYmICF0aGlzLl9vdmVycmlkZUxheW91dEluaXRhbGl6ZWQgJiYgIXRoaXMuX292ZXJyaWRlR3JvdXBMYXlvdXQpIHtcclxuICAgICAgdGhpcy5pbml0T3ZlcnJpZGVHcm91cExheW91dCgpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBsZXQgZ3JvdXAgPSB0aGlzLmdldEN1cnJlbnRHcm91cCgpO1xyXG5cclxuICAgIGlmICghZ3JvdXApIHtcclxuICAgICAgZ3JvdXAgPSB0aGlzLmdldERlZmF1bHRHcm91cCgpO1xyXG4gICAgICB0aGlzLnNldEN1cnJlbnRHcm91cChncm91cCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGdyb3VwKSB7XHJcbiAgICAgIHRoaXMuX29uQXBwbHlHcm91cChncm91cCk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBjbGVhcjogZnVuY3Rpb24gY2xlYXIoKSB7XHJcbiAgICB0aGlzLmluaGVyaXRlZChhcmd1bWVudHMpO1xyXG4gICAgdGhpcy5fY2xlYXJSZXNvbHZlZEVudHJ5Q2FjaGUoKTtcclxuICB9LFxyXG4gIF9vbkFwcGx5R3JvdXA6IGZ1bmN0aW9uIF9vbkFwcGx5R3JvdXAoZ3JvdXApIHtcclxuICAgIGlmICghZ3JvdXApIHtcclxuICAgICAgdGhyb3cgbmV3IEVycm9yKCdHcm91cCBub3QgZm91bmQuJyk7XHJcbiAgICB9XHJcbiAgICB0aGlzLl9maWVsZEZvcm1hdHRlcnMgPSB7fTtcclxuICAgIHRoaXMuX3N0YXJ0R3JvdXBNb2RlKCk7XHJcbiAgICB0aGlzLl9jbGVhclJlc29sdmVkRW50cnlDYWNoZSgpO1xyXG5cclxuICAgIC8vIFNldCB0aGUgdG9vbGJhciB0aXRsZSB0byB0aGUgY3VycmVudCBncm91cCBkaXNwbGF5TmFtZVxyXG4gICAgY29uc3QgdGl0bGUgPSB0aGlzLmdldEdyb3VwVGl0bGUoZ3JvdXApO1xyXG4gICAgQXBwLnNldFByaW1hcnlUaXRsZSh0aXRsZSk7XHJcbiAgICB0aGlzLnNldCgndGl0bGUnLCB0aXRsZSk7XHJcblxyXG4gICAgaWYgKHRoaXMuX2dyb3VwSW5pdGlhbGl6ZWQpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMubGF5b3V0ID0gR3JvdXBVdGlsaXR5LmdldExheW91dChncm91cCk7XHJcbiAgICB0aGlzLnNlbGVjdENvbHVtbnMgPSBHcm91cFV0aWxpdHkuZ2V0Q29sdW1uTmFtZXModGhpcy5sYXlvdXQpO1xyXG4gICAgdGhpcy5pdGVtVGVtcGxhdGUgPSB0aGlzLmdldEl0ZW1UZW1wbGF0ZSgpO1xyXG5cclxuICAgIC8vIENyZWF0ZSBhIGN1c3RvbSByZXF1ZXN0IHRoYXQgdGhlIHN0b3JlIHdpbGwgdXNlIHRvIGV4ZWN1dGUgdGhlIGdyb3VwIHF1ZXJ5XHJcbiAgICB0aGlzLnJlcXVlc3QgPSBHcm91cFV0aWxpdHkuY3JlYXRlR3JvdXBSZXF1ZXN0KHtcclxuICAgICAgZ3JvdXBJZDogZ3JvdXAuJGtleSxcclxuICAgICAgY29ubmVjdGlvbjogdGhpcy5nZXRDb25uZWN0aW9uKCksXHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBUcnkgdG8gc2VsZWN0IHRoZSBlbnRpdHkgaWQgYXMgd2VsbFxyXG4gICAgdGhpcy5zZWxlY3RDb2x1bW5zLnB1c2goYCR7Z3JvdXAuZmFtaWx5fUlEYCk7XHJcbiAgICB0aGlzLnF1ZXJ5U2VsZWN0ID0gdGhpcy5zZWxlY3RDb2x1bW5zO1xyXG4gICAgdGhpcy5xdWVyeU9yZGVyQnkgPSAnJztcclxuICAgIHRoaXMuaWRQcm9wZXJ0eSA9IGAke2dyb3VwLmZhbWlseS50b1VwcGVyQ2FzZSgpfUlEYDtcclxuICAgIHRoaXMubGFiZWxQcm9wZXJ0eSA9IGdyb3VwLmZhbWlseS50b1VwcGVyQ2FzZSgpO1xyXG4gICAgdGhpcy5zdG9yZSA9IG51bGw7XHJcbiAgICB0aGlzLmNsZWFyKHRydWUpO1xyXG4gICAgdGhpcy5yZWZyZXNoUmVxdWlyZWQgPSB0cnVlO1xyXG4gICAgdGhpcy5fZ3JvdXBJbml0aWFsaXplZCA9IHRydWU7XHJcbiAgICB0aGlzLnJlcXVlc3REYXRhKCk7XHJcbiAgfSxcclxuICBfcmVxdWVzdE92ZXJyaWRlR3JvdXBMYXlvdXQ6IGZ1bmN0aW9uIF9yZXF1ZXN0T3ZlcnJpZGVHcm91cExheW91dCgpIHtcclxuICAgIGNvbnN0IGRlZiA9IG5ldyBEZWZlcnJlZCgpO1xyXG4gICAgY29uc3QgZ3JvdXBOYW1lID0gdGhpcy5vdmVycmlkZUdyb3VwTGF5b3V0TmFtZTtcclxuICAgIGNvbnN0IHN0b3JlID0gbmV3IFNEYXRhU3RvcmUoe1xyXG4gICAgICBzZXJ2aWNlOiBBcHAuc2VydmljZXMuY3JtLFxyXG4gICAgICByZXNvdXJjZUtpbmQ6ICdncm91cHMnLFxyXG4gICAgICBjb250cmFjdE5hbWU6ICdzeXN0ZW0nLFxyXG4gICAgICB3aGVyZTogYCgodXBwZXIoZmFtaWx5KSBlcSAnJHt0aGlzLmVudGl0eU5hbWUudG9VcHBlckNhc2UoKX0nKSBhbmQgKHVwcGVyKE5hbWUpIGVxICcke2dyb3VwTmFtZS50b1VwcGVyQ2FzZSgpfScpKWAsXHJcbiAgICAgIGluY2x1ZGU6IFsnbGF5b3V0JywgJ3RhYmxlQWxpYXNlcyddLFxyXG4gICAgICBpZFByb3BlcnR5OiAnJGtleScsXHJcbiAgICAgIGFwcGxpY2F0aW9uTmFtZTogJ3NseCcsXHJcbiAgICAgIHNjb3BlOiB0aGlzLFxyXG4gICAgfSk7XHJcblxyXG4gICAgaWYgKHN0b3JlKSB7XHJcbiAgICAgIGNvbnN0IHF1ZXJ5UmVzdWx0cyA9IHN0b3JlLnF1ZXJ5KCk7XHJcbiAgICAgIHdoZW4ocXVlcnlSZXN1bHRzLCAocmVsYXRlZEZlZWQpID0+IHtcclxuICAgICAgICBkZWYucmVzb2x2ZShyZWxhdGVkRmVlZCk7XHJcbiAgICAgIH0sICgpID0+IHtcclxuICAgICAgICBkZWYucmVzb2x2ZShudWxsKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gZGVmLnByb21pc2U7XHJcbiAgfSxcclxuICBfcmVxdWVzdEdyb3VwOiBmdW5jdGlvbiBfcmVxdWVzdEdyb3VwKGdyb3VwTmFtZSwgZ3JvdXBJZCwgb25TdWNjZXNzKSB7XHJcbiAgICBsZXQgc3RvcmU7XHJcbiAgICBpZiAodHlwZW9mIGdyb3VwTmFtZSA9PT0gJ3N0cmluZycgJiYgZ3JvdXBOYW1lICE9PSAnJykge1xyXG4gICAgICBzdG9yZSA9IG5ldyBTRGF0YVN0b3JlKHtcclxuICAgICAgICBzZXJ2aWNlOiBBcHAuc2VydmljZXMuY3JtLFxyXG4gICAgICAgIHJlc291cmNlS2luZDogJ2dyb3VwcycsXHJcbiAgICAgICAgY29udHJhY3ROYW1lOiAnc3lzdGVtJyxcclxuICAgICAgICB3aGVyZTogYCgodXBwZXIoZmFtaWx5KSBlcSAnJHt0aGlzLmVudGl0eU5hbWUudG9VcHBlckNhc2UoKX0nKSBhbmQgKHVwcGVyKE5hbWUpIGVxICcke2dyb3VwTmFtZS50b1VwcGVyQ2FzZSgpfScpIG9yIFBsdWdpbklkIGVxICcke2dyb3VwSWR9JylgLFxyXG4gICAgICAgIGluY2x1ZGU6IFsnbGF5b3V0JywgJ3RhYmxlQWxpYXNlcyddLFxyXG4gICAgICAgIGlkUHJvcGVydHk6ICcka2V5JyxcclxuICAgICAgICBhcHBsaWNhdGlvbk5hbWU6ICdzbHgnLFxyXG4gICAgICAgIHNjb3BlOiB0aGlzLFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoc3RvcmUpIHtcclxuICAgICAgY29uc3QgcXVlcnlSZXN1bHRzID0gc3RvcmUucXVlcnkoKTtcclxuXHJcbiAgICAgIChmdW5jdGlvbiBxdWVyeVdoZW4oY29udGV4dCwgcXVlcnlSZXN1bHQpIHtcclxuICAgICAgICB0cnkge1xyXG4gICAgICAgICAgd2hlbihxdWVyeVJlc3VsdCwgZnVuY3Rpb24gcXVlcnlSZXN1bHRGbihncm91cEZlZWQpIHtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiBvblN1Y2Nlc3MgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgICBvblN1Y2Nlc3MuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICB0aGlzLl9vbkdyb3VwUmVxdWVzdFN1Y2Nlc3MoZ3JvdXBGZWVkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgfS5iaW5kKGNvbnRleHQpKTtcclxuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgICAgY29uc29sZS5sb2coJ0Vycm9yIGZldGNoaW5nIGdyb3VwIGRhdGE6JyArIGVycm9yKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxyXG4gICAgICAgIH1cclxuICAgICAgfSkodGhpcywgcXVlcnlSZXN1bHRzKTtcclxuICAgIH1cclxuICB9LFxyXG4gIHNldFByaW1hcnlUaXRsZTogZnVuY3Rpb24gc2V0UHJpbWFyeVRpdGxlKCkge1xyXG4gICAgY29uc3QgZ3JvdXAgPSB0aGlzLl9jdXJyZW50R3JvdXA7XHJcblxyXG4gICAgaWYgKGdyb3VwKSB7XHJcbiAgICAgIGNvbnN0IHRpdGxlID0gdGhpcy5nZXRHcm91cFRpdGxlKGdyb3VwKTtcclxuICAgICAgdGhpcy5zZXQoJ3RpdGxlJywgdGl0bGUpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuaW5oZXJpdGVkKGFyZ3VtZW50cyk7XHJcbiAgfSxcclxuICBfb25Hcm91cFJlcXVlc3RTdWNjZXNzOiBmdW5jdGlvbiBfb25Hcm91cFJlcXVlc3RTdWNjZXNzKHJlc3VsdCkge1xyXG4gICAgaWYgKHJlc3VsdC5sZW5ndGggPiAwKSB7XHJcbiAgICAgIGNvbnN0IGdyb3VwID0gcmVzdWx0WzBdO1xyXG4gICAgICB0aGlzLnNldEN1cnJlbnRHcm91cChncm91cCk7XHJcbiAgICAgIEdyb3VwVXRpbGl0eS5hZGRUb0dyb3VwUHJlZmVyZW5jZXMoW2dyb3VwXSwgdGhpcy5lbnRpdHlOYW1lKTtcclxuICAgICAgdGhpcy5fb25BcHBseUdyb3VwKGdyb3VwKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnN0IHRpdGxlID0gdGhpcy5nZXRHcm91cFRpdGxlKCk7XHJcbiAgICAgIEFwcC5zZXRQcmltYXJ5VGl0bGUodGl0bGUpO1xyXG4gICAgICB0aGlzLnNldCgndGl0bGUnLCB0aXRsZSk7XHJcbiAgICAgIHRoaXMuX3NlbGVjdEdyb3VwcygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFJlbG9hZCB0aGUgcmlnaHQgbWVudVxyXG4gICAgdGhpcy5vblRyYW5zaXRpb25Bd2F5KCk7XHJcbiAgICB0aGlzLmxvYWRSaWdodERyYXdlcigpO1xyXG5cclxuICAgICQodGhpcy5kb21Ob2RlKS5yZW1vdmVDbGFzcygnbGlzdC1sb2FkaW5nJyk7XHJcbiAgICB0aGlzLmxpc3RMb2FkaW5nID0gZmFsc2U7XHJcbiAgfSxcclxuICBfb25Hcm91cFJlcXVlc3RGYWlsZDogZnVuY3Rpb24gX29uR3JvdXBSZXF1ZXN0RmFpbGQoKSB7XHJcblxyXG4gIH0sXHJcbiAgZ2V0R3JvdXBUaXRsZTogZnVuY3Rpb24gZ2V0R3JvdXBUaXRsZShncm91cCkge1xyXG4gICAgcmV0dXJuIGdyb3VwLmRpc3BsYXlOYW1lO1xyXG4gIH0sXHJcbiAgZ2V0SXRlbVRlbXBsYXRlOiBmdW5jdGlvbiBnZXRJdGVtVGVtcGxhdGUoKSB7XHJcbiAgICBjb25zdCBsYXlvdXQgPSAodGhpcy5lbmFibGVPdmVycmlkZUxheW91dCAmJiB0aGlzLl9vdmVycmlkZUdyb3VwTGF5b3V0KSA/IHRoaXMuX292ZXJyaWRlR3JvdXBMYXlvdXQgOiB0aGlzLmxheW91dDtcclxuICAgIGlmICh0aGlzLmVuYWJsZUR5bmFtaWNHcm91cExheW91dCkge1xyXG4gICAgICBjb25zdCBsYXlvdXRUZW1wbGF0ZSA9IHRoaXMuZ2V0U2VsZWN0ZWRHcm91cExheW91dFRlbXBsYXRlKCk7XHJcbiAgICAgIGlmIChsYXlvdXRUZW1wbGF0ZSkge1xyXG4gICAgICAgIGlmIChsYXlvdXRUZW1wbGF0ZS50eXBlID09PSAnRHluYW1pYycpIHtcclxuICAgICAgICAgIHJldHVybiB0aGlzLmdldER5bmFtaWNMYXlvdXRJdGVtVGVtcGxhdGUobGF5b3V0LCBsYXlvdXRUZW1wbGF0ZS5vcHRpb25zKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGxheW91dFRlbXBsYXRlLnRlbXBsYXRlKSB7XHJcbiAgICAgICAgICByZXR1cm4gbmV3IFNpbXBsYXRlKGxheW91dFRlbXBsYXRlLnRlbXBsYXRlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHRoaXMuZGVmYXVsdEdyb3VwTGF5b3V0SXRlbVRlbXBsYXRlO1xyXG4gICAgfVxyXG4gICAgY29uc3QgdGVtcGxhdGUgPSBsYXlvdXQubWFwKHRoaXMuZ2V0SXRlbUxheW91dFRlbXBsYXRlKTtcclxuICAgIHJldHVybiBuZXcgU2ltcGxhdGUodGVtcGxhdGUpO1xyXG4gIH0sXHJcbiAgZ2V0SXRlbUxheW91dFRlbXBsYXRlOiBmdW5jdGlvbiBnZXRJdGVtTGF5b3V0VGVtcGxhdGUoaXRlbSkge1xyXG4gICAgY29uc3QganNvblN0cmluZyA9IGpzb24uc3RyaW5naWZ5KGl0ZW0pO1xyXG4gICAgY29uc3QgdGVtcGxhdGUgPSBbJzxwIGNsYXNzPVwibWljcm8tdGV4dFwiPjxzcGFuIGNsYXNzPVwiZ3JvdXAtbGFiZWxcIj4nLCBpdGVtLmNhcHRpb24sIGA8L3NwYW4+IDxzcGFuIGNsYXNzPVwiZ3JvdXAtZW50cnlcIj57JT0gJCQuZ3JvdXBUcmFuc2Zvcm1WYWx1ZSgkWyQkLmdldEZpZWxkTmFtZUJ5TGF5b3V0KCR7anNvblN0cmluZ30pXSwke2pzb25TdHJpbmd9LCQkLmdldEZvcm1hdHRlckJ5TGF5b3V0KCR7anNvblN0cmluZ30pKSAlfTwvc3Bhbj5gLCAnPC9wPiddLmpvaW4oJycpO1xyXG5cclxuICAgIHJldHVybiB0ZW1wbGF0ZTtcclxuICB9LFxyXG4gIGRlZmF1bHRHcm91cExheW91dEl0ZW1UZW1wbGF0ZTogbmV3IFNpbXBsYXRlKFtcclxuICAgICc8cCBjbGFzcz1cIm1pY3JvLXRleHRcIj57JT0gJCQuZ2V0R3JvdXBGaWVsZFZhbHVlQnlJbmRleCgkLCAwLCB0cnVlKSAlfTwvcD4nLFxyXG4gICAgJzxwIGNsYXNzPVwibWljcm8tdGV4dFwiPjxzcGFuIGNsYXNzPVwiZ3JvdXAtbGFiZWxcIj57JT0gJCQuZ2V0R3JvdXBGaWVsZExhYmVsQnlJbmRleCgxKSAlfSA8L3NwYW4+PHNwYW4gY2xhc3M9XCJncm91cC1lbnRyeVwiPnslPSAkJC5nZXRHcm91cEZpZWxkVmFsdWVCeUluZGV4KCQsIDEsIHRydWUpICV9PC9zcGFuPjwvcD4nLFxyXG4gICAgJzxwIGNsYXNzPVwibWljcm8tdGV4dFwiPjxzcGFuIGNsYXNzPVwiZ3JvdXAtbGFiZWxcIj57JT0gJCQuZ2V0R3JvdXBGaWVsZExhYmVsQnlJbmRleCgyKSAlfSA8L3NwYW4+PHNwYW4gY2xhc3M9XCJncm91cC1lbnRyeVwiPnslPSAkJC5nZXRHcm91cEZpZWxkVmFsdWVCeUluZGV4KCQsIDIsIHRydWUpICV9PC9zcGFuPjwvcD4nLFxyXG4gIF0pLFxyXG4gIGNyZWF0ZUdyb3VwVGVtcGxhdGVMYXlvdXRzOiBmdW5jdGlvbiBjcmVhdGVHcm91cFRlbXBsYXRlTGF5b3V0cygpIHtcclxuICAgIHRoaXMuZ3JvdXBUZW1wbGF0ZUxheW91dHMgPSBbe1xyXG4gICAgICBuYW1lOiAnU3VtbWFyeScsXHJcbiAgICAgIGRpc3BsYXlOYW1lOiByZXNvdXJjZS5ncm91cFRlbXBsYXRlU3VtbWFyeVRleHQsXHJcbiAgICAgIHR5cGU6ICdEeW5hbWljJyxcclxuICAgICAgb3B0aW9uczoge1xyXG4gICAgICAgIGNvbHVtbnM6IFt7XHJcbiAgICAgICAgICBpZDogJ2NvbDEnLFxyXG4gICAgICAgICAgcm93czogMyxcclxuICAgICAgICB9XSxcclxuICAgICAgfSxcclxuICAgIH0sIHtcclxuICAgICAgbmFtZTogJ0RldGFpbCcsXHJcbiAgICAgIGRpc3BsYXlOYW1lOiByZXNvdXJjZS5ncm91cFRlbXBsYXRlRGV0YWlsVGV4dCxcclxuICAgICAgdHlwZTogJ0R5bmFtaWMnLFxyXG4gICAgICBvcHRpb25zOiB7XHJcbiAgICAgICAgY29sdW1uczogW3tcclxuICAgICAgICAgIGlkOiAnY29sMScsXHJcbiAgICAgICAgICByb3dzOiAzLFxyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgIGlkOiAnY29sMicsXHJcbiAgICAgICAgICByb3dzOiAzLFxyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgIGlkOiAnY29sMycsXHJcbiAgICAgICAgICByb3dzOiAzLFxyXG4gICAgICAgIH1dLFxyXG4gICAgICB9LFxyXG4gICAgfV07XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuZ3JvdXBUZW1wbGF0ZUxheW91dHM7XHJcbiAgfSxcclxuICBnZXRTZWxlY3RlZEdyb3VwTGF5b3V0VGVtcGxhdGU6IGZ1bmN0aW9uIGdldFNlbGVjdGVkR3JvdXBMYXlvdXRUZW1wbGF0ZSgpIHtcclxuICAgIGxldCBuYW1lID0gR3JvdXBVdGlsaXR5LmdldFNlbGVjdGVkR3JvdXBMYXlvdXRUZW1wbGF0ZSh0aGlzLmVudGl0eU5hbWUpO1xyXG4gICAgbmFtZSA9IChuYW1lKSA/IG5hbWUgOiAnJztcclxuICAgIGxldCBsYXlvdXRUZW1wbGF0ZSA9IG51bGw7XHJcbiAgICB0aGlzLmdyb3VwVGVtcGxhdGVMYXlvdXRzLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgaWYgKGl0ZW0ubmFtZSA9PT0gbmFtZSkge1xyXG4gICAgICAgIGxheW91dFRlbXBsYXRlID0gaXRlbTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBpZiAoIWxheW91dFRlbXBsYXRlKSB7XHJcbiAgICAgIGxheW91dFRlbXBsYXRlID0gdGhpcy5ncm91cFRlbXBsYXRlTGF5b3V0c1swXTtcclxuICAgIH1cclxuICAgIHJldHVybiBsYXlvdXRUZW1wbGF0ZTtcclxuICB9LFxyXG4gIGNyZWF0ZUdyb3VwVGVtcGxhdGVzOiBmdW5jdGlvbiBjcmVhdGVHcm91cFRlbXBsYXRlcygpIHtcclxuICAgIHRoaXMuZ3JvdXBUZW1wbGF0ZUxheW91dHMgPSB0aGlzLl9jcmVhdGVDdXN0b21pemVkTGF5b3V0KHRoaXMuY3JlYXRlR3JvdXBUZW1wbGF0ZUxheW91dHMoKSwgJ2dyb3VwLXRlbXBsYXRlcycpO1xyXG4gIH0sXHJcbiAgZ2V0RHluYW1pY0xheW91dEl0ZW1UZW1wbGF0ZTogZnVuY3Rpb24gZ2V0RHluYW1pY0xheW91dEl0ZW1UZW1wbGF0ZShsYXlvdXQsIG9wdGlvbnMpIHtcclxuICAgIGNvbnN0IGxheW91dE9wdGlvbnMgPSB0aGlzLmFwcGx5RHluYW1pY0xheW91dE9wdGlvbnMob3B0aW9ucyk7XHJcbiAgICBsZXQgcm93cyA9IDA7XHJcbiAgICBsZXQgY29sdW1ucyA9IDE7XHJcbiAgICBsZXQgY29sdW1uID0gMTtcclxuICAgIGxldCByb3cgPSAxO1xyXG4gICAgY29sdW1ucyA9IGxheW91dE9wdGlvbnMuY29sdW1ucy5sZW5ndGg7XHJcbiAgICBsYXlvdXRPcHRpb25zLmNvbHVtbnMuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICByb3dzID0gcm93cyArIGl0ZW0ucm93cztcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IHRlbXBsYXRlID0gW107XHJcbiAgICB0ZW1wbGF0ZS5wdXNoKCc8ZGl2IGNsYXNzPVwiZ3JvdXAtaXRlbVwiPicpO1xyXG4gICAgdGVtcGxhdGUucHVzaCgnPHA+Jyk7XHJcbiAgICB0ZW1wbGF0ZS5wdXNoKGB7JT0gJCQuZ2V0R3JvdXBGaWVsZFZhbHVlQnlOYW1lKCQsXCIke2xheW91dFswXS5wcm9wZXJ0eVBhdGh9XCIsIHRydWUpICV9YCk7XHJcbiAgICB0ZW1wbGF0ZS5wdXNoKCc8L3BcIj4nKTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGF5b3V0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGNvbnN0IGNvbHVtbkl0ZW0gPSBsYXlvdXRPcHRpb25zLmNvbHVtbnNbY29sdW1uIC0gMV07XHJcbiAgICAgIGlmICgoY29sdW1uSXRlbSkgJiYgKGNvbHVtbiA8PSBjb2x1bW5zKSAmJiAoaSAhPT0gMCkpIHtcclxuICAgICAgICBpZiAocm93ID09PSAxKSB7XHJcbiAgICAgICAgICBjb25zdCBjb2x1bW5DbGFzcyA9IGNvbHVtbkl0ZW0uY2xzcyB8fCAnJztcclxuICAgICAgICAgIHRlbXBsYXRlLnB1c2goYDxkaXYgY2xhc3M9XCJtaWNyby10ZXh0IGdyb3VwLWNvbHVtbiAke2NvbHVtbkNsYXNzfVwiPmApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBpdGVtID0gbGF5b3V0W2ldO1xyXG4gICAgICAgIGlmIChpdGVtICYmIChjb2x1bW5JdGVtLnJvd3MgPiAwKSkge1xyXG4gICAgICAgICAgaWYgKGkgIT09IDApIHtcclxuICAgICAgICAgICAgdGVtcGxhdGUucHVzaCgnPGRpdj4nKTtcclxuICAgICAgICAgICAgaWYgKCFjb2x1bW5JdGVtLmhpZGVMYWJlbHMpIHtcclxuICAgICAgICAgICAgICB0ZW1wbGF0ZS5wdXNoKGA8c3BhbiBjbGFzcz1cImdyb3VwLWxhYmVsXCI+JHt0aGlzLmdldEdyb3VwRmllbGRMYWJlbEJ5TmFtZShpdGVtLnByb3BlcnR5UGF0aCl9IDwvc3Bhbj5gKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3QgZm9ybWF0T3B0aW9ucyA9IHRoaXMuZ2V0R3JvdXBGaWVsZEZvcm1hdE9wdGlvbnMoaXRlbSk7XHJcbiAgICAgICAgICAgIGNvbnN0IGZvcm1hdENsc3MgPSBmb3JtYXRPcHRpb25zLmNsc3MgfHwgJyc7XHJcbiAgICAgICAgICAgIGNvbnN0IGpzb25TdHJpbmcgPSBqc29uLnN0cmluZ2lmeShmb3JtYXRPcHRpb25zKTtcclxuICAgICAgICAgICAgaWYgKGl0ZW0uZm9ybWF0ID09PSAnUGhvbmUnKSB7XHJcbiAgICAgICAgICAgICAgdGVtcGxhdGUucHVzaChgPHNwYW4gY2xhc3M9XCJoeXBlcmxpbmtcIiBkYXRhLWFjdGlvbj1cImdyb3VwSW52b2tlTGlzdEFjdGlvblwiIGRhdGEtbmFtZT1cImNhbGxQaG9uZVwiIGRhdGEta2V5PVwieyU6JCQuZ2V0R3JvdXBJdGVtS2V5KCQpJX1cIiBkYXRhLXByb3BlcnR5bmFtZT1cIiR7aXRlbS5wcm9wZXJ0eVBhdGh9XCI+eyU9ICQkLmdldEdyb3VwRmllbGRWYWx1ZUJ5TmFtZSgkLFwiJHtpdGVtLnByb3BlcnR5UGF0aH1cIiwgdHJ1ZSwke2pzb25TdHJpbmd9KSAlfTwvc3Bhbj5gKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChpdGVtLnByb3BlcnR5UGF0aCA9PT0gJ0VtYWlsJykge1xyXG4gICAgICAgICAgICAgIHRlbXBsYXRlLnB1c2goYDxzcGFuIGNsYXNzPVwiaHlwZXJsaW5rXCIgZGF0YS1hY3Rpb249XCJncm91cEludm9rZUxpc3RBY3Rpb25cIiBkYXRhLW5hbWU9XCJzZW5kRW1haWxcIiBkYXRhLWtleT1cInslOiQkLmdldEdyb3VwSXRlbUtleSgkKSV9XCIgZGF0YS1wcm9wZXJ0eW5hbWU9XCIke2l0ZW0ucHJvcGVydHlQYXRofVwiPnslPSAkJC5nZXRHcm91cEZpZWxkVmFsdWVCeU5hbWUoJCxcIiR7aXRlbS5wcm9wZXJ0eVBhdGh9XCIsIHRydWUsJHtqc29uU3RyaW5nfSkgJX08L3NwYW4+YCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgdGVtcGxhdGUucHVzaChgPHNwYW4gY2xhc3M9XCJncm91cC1lbnRyeSAke2Zvcm1hdENsc3N9XCI+eyU9ICQkLmdldEdyb3VwRmllbGRWYWx1ZUJ5TmFtZSgkLFwiJHtpdGVtLnByb3BlcnR5UGF0aH1cIiwgdHJ1ZSwke2pzb25TdHJpbmd9KSAlfTwvc3Bhbj5gKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0ZW1wbGF0ZS5wdXNoKCc8L2Rpdj4nKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcm93Kys7XHJcbiAgICAgICAgaWYgKHJvdyA9PT0gY29sdW1uSXRlbS5yb3dzICsgMSkge1xyXG4gICAgICAgICAgcm93ID0gMTtcclxuICAgICAgICAgIGNvbHVtbisrO1xyXG4gICAgICAgICAgdGVtcGxhdGUucHVzaCgnPC9kaXY+Jyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAocm93ICE9PSAxKSB7XHJcbiAgICAgIHRlbXBsYXRlLnB1c2goJzwvZGl2PicpO1xyXG4gICAgfVxyXG4gICAgdGVtcGxhdGUucHVzaCgnPC9kaXY+Jyk7XHJcbiAgICByZXR1cm4gbmV3IFNpbXBsYXRlKHRlbXBsYXRlKTtcclxuICB9LFxyXG4gIGFwcGx5RHluYW1pY0xheW91dE9wdGlvbnM6IGZ1bmN0aW9uIGFwcGx5RHluYW1pY0xheW91dE9wdGlvbnMob3B0aW9ucykge1xyXG4gICAgY29uc3QgbGF5b3V0T3B0aW9ucyA9IHtcclxuICAgICAgY29sdW1uczogW3tcclxuICAgICAgICByb3dzOiAzLFxyXG4gICAgICB9XSxcclxuICAgIH07XHJcbiAgICBsYW5nLm1peGluKGxheW91dE9wdGlvbnMsIG9wdGlvbnMpO1xyXG4gICAgcmV0dXJuIGxheW91dE9wdGlvbnM7XHJcbiAgfSxcclxuICBnZXRHcm91cEl0ZW1LZXk6IGZ1bmN0aW9uIGdldEdyb3VwSXRlbUtleShncm91cEVudHJ5KSB7XHJcbiAgICByZXR1cm4gZ3JvdXBFbnRyeVt0aGlzLmlkUHJvcGVydHldO1xyXG4gIH0sXHJcbiAgZ2V0R3JvdXBGaWVsZEZvcm1hdE9wdGlvbnM6IGZ1bmN0aW9uIGdldEdyb3VwRmllbGRGb3JtYXRPcHRpb25zKGxheW91dEl0ZW0pIHtcclxuICAgIGNvbnN0IGZvcm1hdHRlciA9IHRoaXMuZ2V0Rm9ybWF0dGVyQnlMYXlvdXQobGF5b3V0SXRlbSk7XHJcbiAgICBjb25zdCBvcHRpb25zID0ge1xyXG4gICAgICBmb3JtYXRTdHJpbmc6IChmb3JtYXR0ZXIgJiYgZm9ybWF0dGVyLmZvcm1hdFN0cmluZykgPyBmb3JtYXR0ZXIuZm9ybWF0U3RyaW5nIDogbnVsbCxcclxuICAgIH07XHJcblxyXG4gICAgaWYgKChmb3JtYXR0ZXIgJiYgZm9ybWF0dGVyLm9wdGlvbnMpKSB7XHJcbiAgICAgIGxhbmcubWl4aW4ob3B0aW9ucywgZm9ybWF0dGVyLm9wdGlvbnMpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG9wdGlvbnM7XHJcbiAgfSxcclxuICBnZXRHcm91cEZpZWxkTGFiZWxCeU5hbWU6IGZ1bmN0aW9uIGdldEdyb3VwRmllbGRMYWJlbEJ5TmFtZShuYW1lKSB7XHJcbiAgICBjb25zdCBsYXlvdXQgPSAodGhpcy5lbmFibGVPdmVycmlkZUxheW91dCAmJiB0aGlzLl9vdmVycmlkZUdyb3VwTGF5b3V0KSA/IHRoaXMuX292ZXJyaWRlR3JvdXBMYXlvdXQgOiB0aGlzLmxheW91dDtcclxuICAgIGxldCBsYXlvdXRJdGVtID0gbnVsbDtcclxuICAgIGxheW91dC5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgIGlmIChpdGVtLnByb3BlcnR5UGF0aCA9PT0gbmFtZSkge1xyXG4gICAgICAgIGxheW91dEl0ZW0gPSBpdGVtO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIGlmIChsYXlvdXRJdGVtKSB7XHJcbiAgICAgIHJldHVybiBsYXlvdXRJdGVtLmNhcHRpb247XHJcbiAgICB9XHJcbiAgICByZXR1cm4gJyc7XHJcbiAgfSxcclxuICBnZXRHcm91cEZpZWxkVmFsdWVCeU5hbWU6IGZ1bmN0aW9uIGdldEdyb3VwRmllbGRWYWx1ZUJ5TmFtZShlbnRyeSwgbmFtZSwgYXBwbHlGb3JtYXQsIGZvcm1hdE9wdGlvbnMpIHtcclxuICAgIGNvbnN0IGxheW91dCA9ICh0aGlzLmVuYWJsZU92ZXJyaWRlTGF5b3V0ICYmIHRoaXMuX292ZXJyaWRlR3JvdXBMYXlvdXQpID8gdGhpcy5fb3ZlcnJpZGVHcm91cExheW91dCA6IHRoaXMubGF5b3V0O1xyXG4gICAgbGV0IGxheW91dEl0ZW0gPSBudWxsO1xyXG4gICAgbGF5b3V0LmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgaWYgKGl0ZW0ucHJvcGVydHlQYXRoID09PSBuYW1lKSB7XHJcbiAgICAgICAgbGF5b3V0SXRlbSA9IGl0ZW07XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHRoaXMuZ2V0R3JvdXBGaWVsZFZhbHVlKGVudHJ5LCBsYXlvdXRJdGVtLCBhcHBseUZvcm1hdCwgZm9ybWF0T3B0aW9ucyk7XHJcbiAgfSxcclxuICBnZXRHcm91cEZpZWxkTGFiZWxCeUluZGV4OiBmdW5jdGlvbiBnZXRHcm91cEZpZWxkTGFiZWxCeUluZGV4KGxheW91dEluZGV4KSB7XHJcbiAgICBjb25zdCBsYXlvdXQgPSAodGhpcy5lbmFibGVPdmVycmlkZUxheW91dCAmJiB0aGlzLl9vdmVycmlkZUdyb3VwTGF5b3V0KSA/IHRoaXMuX292ZXJyaWRlR3JvdXBMYXlvdXQgOiB0aGlzLmxheW91dDtcclxuICAgIGlmIChsYXlvdXRbbGF5b3V0SW5kZXhdKSB7XHJcbiAgICAgIHJldHVybiBsYXlvdXRbbGF5b3V0SW5kZXhdLmNhcHRpb247XHJcbiAgICB9XHJcbiAgICByZXR1cm4gJyc7XHJcbiAgfSxcclxuICBnZXRHcm91cEZpZWxkVmFsdWVCeUluZGV4OiBmdW5jdGlvbiBnZXRHcm91cEZpZWxkVmFsdWVCeUluZGV4KGVudHJ5LCBsYXlvdXRJbmRleCwgYXBwbHlGb3JtYXQsIGZvcm1hdE9wdGlvbnMpIHtcclxuICAgIGNvbnN0IGxheW91dCA9ICh0aGlzLmVuYWJsZU92ZXJyaWRlTGF5b3V0ICYmIHRoaXMuX292ZXJyaWRlR3JvdXBMYXlvdXQpID8gdGhpcy5fb3ZlcnJpZGVHcm91cExheW91dCA6IHRoaXMubGF5b3V0O1xyXG4gICAgY29uc3QgbGF5b3V0SXRlbSA9IGxheW91dFtsYXlvdXRJbmRleF07XHJcbiAgICByZXR1cm4gdGhpcy5nZXRHcm91cEZpZWxkVmFsdWUoZW50cnksIGxheW91dEl0ZW0sIGFwcGx5Rm9ybWF0LCBmb3JtYXRPcHRpb25zKTtcclxuICB9LFxyXG4gIGdldEdyb3VwRmllbGRWYWx1ZTogZnVuY3Rpb24gZ2V0R3JvdXBGaWVsZFZhbHVlKGVudHJ5LCBsYXlvdXRJdGVtLCBhcHBseUZvcm1hdCwgZm9ybWF0T3B0aW9ucykge1xyXG4gICAgbGV0IHZhbHVlID0gbnVsbDtcclxuICAgIGxldCBmb3JtYXR0ZXIgPSBudWxsO1xyXG5cclxuICAgIGlmICgobGF5b3V0SXRlbSkgJiYgKGFwcGx5Rm9ybWF0KSkge1xyXG4gICAgICBjb25zdCBmaWVsZE5hbWUgPSB0aGlzLmdldEZpZWxkTmFtZUJ5TGF5b3V0KGxheW91dEl0ZW0pO1xyXG4gICAgICBpZiAoYXBwbHlGb3JtYXQpIHtcclxuICAgICAgICBmb3JtYXR0ZXIgPSB0aGlzLmdldEZvcm1hdHRlckJ5TGF5b3V0KGxheW91dEl0ZW0pO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChmb3JtYXR0ZXIpIHtcclxuICAgICAgICB2YWx1ZSA9IHRoaXMuZ3JvdXBUcmFuc2Zvcm1WYWx1ZShlbnRyeVtmaWVsZE5hbWVdLCBsYXlvdXRJdGVtLCBmb3JtYXR0ZXIsIGZvcm1hdE9wdGlvbnMpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHZhbHVlID0gZW50cnlbZmllbGROYW1lXTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChsYXlvdXRJdGVtKSB7XHJcbiAgICAgIGNvbnN0IGZpZWxkTmFtZSA9IHRoaXMuZ2V0RmllbGROYW1lQnlMYXlvdXQobGF5b3V0SXRlbSk7XHJcbiAgICAgIHZhbHVlID0gZW50cnlbZmllbGROYW1lXTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHZhbHVlID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdmFsdWU7XHJcbiAgfSxcclxuICBnZXRGb3JtYXR0ZXJCeUxheW91dDogZnVuY3Rpb24gZ2V0Rm9ybWF0dGVyQnlMYXlvdXQobGF5b3V0SXRlbSkge1xyXG4gICAgaWYgKCF0aGlzLl9maWVsZEZvcm1hdHRlcnMpIHtcclxuICAgICAgdGhpcy5fZmllbGRGb3JtYXR0ZXJzID0ge307XHJcbiAgICB9XHJcbiAgICBjb25zdCBwYXRoID0gYCR7bGF5b3V0SXRlbS5wcm9wZXJ0eVBhdGh9XyR7bGF5b3V0SXRlbS5pbmRleH1gO1xyXG4gICAgbGV0IGZvcm1hdHRlciA9IHRoaXMuX2ZpZWxkRm9ybWF0dGVyc1twYXRoXTtcclxuICAgIGlmICghZm9ybWF0dGVyKSB7XHJcbiAgICAgIGZvcm1hdHRlciA9IHRoaXMuZ2V0R3JvdXBGaWVsZEZvcm1hdHRlcihsYXlvdXRJdGVtKTtcclxuICAgICAgdGhpcy5fZmllbGRGb3JtYXR0ZXJzW3BhdGhdID0gZm9ybWF0dGVyO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZvcm1hdHRlcjtcclxuICB9LFxyXG4gIGdldEdyb3VwRmllbGRGb3JtYXR0ZXI6IGZ1bmN0aW9uIGdldEdyb3VwRmllbGRGb3JtYXR0ZXIobGF5b3V0SXRlbSkge1xyXG4gICAgbGV0IGZvcm1hdHRlcjtcclxuICAgIGlmICh0aGlzLmdyb3VwRmllbGRGb3JtYXR0ZXIpIHtcclxuICAgICAgZm9ybWF0dGVyID0gdGhpcy5ncm91cEZpZWxkRm9ybWF0dGVyW2xheW91dEl0ZW0ucHJvcGVydHlQYXRoXTtcclxuICAgIH1cclxuICAgIGlmICghZm9ybWF0dGVyKSB7XHJcbiAgICAgIGZvcm1hdHRlciA9IEdyb3VwVXRpbGl0eS5nZXRGb3JtYXR0ZXJCeUxheW91dChsYXlvdXRJdGVtKTtcclxuICAgIH1cclxuICAgIHJldHVybiBmb3JtYXR0ZXI7XHJcbiAgfSxcclxuICBncm91cFRyYW5zZm9ybVZhbHVlOiBmdW5jdGlvbiBncm91cFRyYW5zZm9ybVZhbHVlKHZhbHVlLCBsYXlvdXQsIGZvcm1hdHRlciwgZm9ybWF0T3B0aW9ucykge1xyXG4gICAgdHJ5IHtcclxuICAgICAgcmV0dXJuIGZvcm1hdHRlci5mb3JtYXR0ZXIodmFsdWUsIGZvcm1hdHRlci5mb3JtYXRTdHJpbmcsIGZvcm1hdE9wdGlvbnMpO1xyXG4gICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICB9XHJcbiAgfSxcclxuICBnZXRGaWVsZE5hbWVCeUxheW91dDogZnVuY3Rpb24gZ2V0RmllbGROYW1lQnlMYXlvdXQobGF5b3V0SXRlbSkge1xyXG4gICAgcmV0dXJuIEdyb3VwVXRpbGl0eS5nZXRGaWVsZE5hbWVCeUxheW91dChsYXlvdXRJdGVtKTtcclxuICB9LFxyXG4gIF9zdGFydEdyb3VwTW9kZTogZnVuY3Rpb24gX3N0YXJ0R3JvdXBNb2RlKCkge1xyXG4gICAgaWYgKHRoaXMuX29yaWdpbmFsUHJvcHMpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuX29yaWdpbmFsUHJvcHMgPSB7fTtcclxuXHJcbiAgICBjb25zdCBvcmlnaW5hbCA9IHRoaXMuX29yaWdpbmFsUHJvcHM7XHJcblxyXG4gICAgb3JpZ2luYWwucmVxdWVzdCA9IHRoaXMucmVxdWVzdCA/IHRoaXMucmVxdWVzdC5jbG9uZSgpIDogbnVsbDtcclxuICAgIG9yaWdpbmFsLnF1ZXJ5U2VsZWN0ID0gdGhpcy5xdWVyeVNlbGVjdDtcclxuICAgIG9yaWdpbmFsLnF1ZXJ5T3JkZXJCeSA9IHRoaXMucXVlcnlPcmRlckJ5O1xyXG4gICAgb3JpZ2luYWwuaWRQcm9wZXJ0eSA9IHRoaXMuaWRQcm9wZXJ0eTtcclxuICAgIG9yaWdpbmFsLmxhYmVsUHJvcGVydHkgPSB0aGlzLmxhYmVsUHJvcGVydHk7XHJcbiAgICBvcmlnaW5hbC5zdG9yZSA9IHRoaXMuc3RvcmU7XHJcbiAgICBvcmlnaW5hbC5yb3dUZW1wbGF0ZSA9IHRoaXMucm93VGVtcGxhdGU7XHJcbiAgICBvcmlnaW5hbC5pdGVtVGVtcGxhdGUgPSB0aGlzLml0ZW1UZW1wbGF0ZTtcclxuICAgIG9yaWdpbmFsLml0ZW1Gb290ZXJUZW1wbGF0ZSA9IHRoaXMuaXRlbUZvb3RlclRlbXBsYXRlO1xyXG4gICAgb3JpZ2luYWwucmVsYXRlZFZpZXdzID0gdGhpcy5yZWxhdGVkVmlld3M7XHJcbiAgICBvcmlnaW5hbC50aXRsZSA9IHRoaXMuZ2V0KCd0aXRsZScpO1xyXG4gICAgb3JpZ2luYWwuX21vZGVsID0gdGhpcy5fbW9kZWw7XHJcblxyXG4gICAgdGhpcy5fbW9kZWwgPSBudWxsO1xyXG4gICAgdGhpcy5pdGVtRm9vdGVyVGVtcGxhdGUgPSBuZXcgU2ltcGxhdGUoWyc8ZGl2PjwvZGl2PiddKTtcclxuXHJcbiAgICB0aGlzLmdyb3Vwc01vZGUgPSB0cnVlO1xyXG4gIH0sXHJcbiAgX2NsZWFyR3JvdXBNb2RlOiBmdW5jdGlvbiBfY2xlYXJHcm91cE1vZGUoKSB7XHJcbiAgICBjb25zdCBvcmlnaW5hbCA9IHRoaXMuX29yaWdpbmFsUHJvcHM7XHJcblxyXG4gICAgdGhpcy5ncm91cHNNb2RlID0gZmFsc2U7XHJcblxyXG4gICAgaWYgKCFvcmlnaW5hbCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5yZXF1ZXN0ID0gb3JpZ2luYWwucmVxdWVzdCB8fCBudWxsO1xyXG4gICAgdGhpcy5xdWVyeVNlbGVjdCA9IG9yaWdpbmFsLnF1ZXJ5U2VsZWN0O1xyXG4gICAgdGhpcy5xdWVyeU9yZGVyQnkgPSBvcmlnaW5hbC5xdWVyeU9yZGVyQnk7XHJcbiAgICB0aGlzLmlkUHJvcGVydHkgPSBvcmlnaW5hbC5pZFByb3BlcnR5O1xyXG4gICAgdGhpcy5sYWJlbFByb3BlcnR5ID0gb3JpZ2luYWwubGFiZWxQcm9wZXJ0eTtcclxuICAgIHRoaXMuc2V0KCdzdG9yZScsIG9yaWdpbmFsLnN0b3JlKTtcclxuICAgIHRoaXMucm93VGVtcGxhdGUgPSBvcmlnaW5hbC5yb3dUZW1wbGF0ZTtcclxuICAgIHRoaXMuaXRlbVRlbXBsYXRlID0gb3JpZ2luYWwuaXRlbVRlbXBsYXRlO1xyXG4gICAgdGhpcy5yZWxhdGVkVmlld3MgPSBvcmlnaW5hbC5yZWxhdGVkVmlld3M7XHJcbiAgICB0aGlzLml0ZW1Gb290ZXJUZW1wbGF0ZSA9IG9yaWdpbmFsLml0ZW1Gb290ZXJUZW1wbGF0ZTtcclxuICAgIHRoaXMuX21vZGVsID0gb3JpZ2luYWwuX21vZGVsO1xyXG5cclxuICAgIHRoaXMuX29yaWdpbmFsUHJvcHMgPSBudWxsO1xyXG5cclxuICAgIHRoaXMuX2dyb3VwSW5pdGlhbGl6ZWQgPSBmYWxzZTtcclxuICAgIHRoaXMuX2N1cnJlbnRHcm91cCA9IG51bGw7XHJcbiAgICB0aGlzLmN1cnJlbnRHcm91cElkID0gbnVsbDtcclxuICAgIEFwcC5zZXRQcmltYXJ5VGl0bGUob3JpZ2luYWwudGl0bGUpO1xyXG4gICAgdGhpcy5zZXQoJ3RpdGxlJywgb3JpZ2luYWwudGl0bGUpO1xyXG5cclxuICAgIHRoaXMuY2xlYXIoKTtcclxuICAgIHRoaXMucmVmcmVzaFJlcXVpcmVkID0gdHJ1ZTtcclxuICB9LFxyXG4gIF9vblF1ZXJ5RXJyb3I6IGZ1bmN0aW9uIF9vblF1ZXJ5RXJyb3IocXVlcnlPcHRpb25zLCBlcnJvcikge1xyXG4gICAgaWYgKHRoaXMuZ3JvdXBzRW5hYmxlZCAmJiB0aGlzLmdyb3Vwc01vZGUpIHtcclxuICAgICAgaWYgKGVycm9yLnN0YXR1cyA9PT0gNDA0KSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIHRoaXMuX29uR3JvdXBOb3RGb3VuZCgpO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHRoaXMuaW5oZXJpdGVkKGFyZ3VtZW50cyk7XHJcbiAgfSxcclxuICBfb25Hcm91cE5vdEZvdW5kOiBmdW5jdGlvbiBfb25Hcm91cE5vdEZvdW5kKCkge1xyXG4gICAgR3JvdXBVdGlsaXR5LnJlbW92ZUdyb3VwUHJlZmVyZW5jZXModGhpcy5jdXJyZW50R3JvdXBJZCwgdGhpcy5lbnRpdHlOYW1lKTtcclxuICAgIHRoaXMucmVmcmVzaFJpZ2h0RHJhd2VyKCk7XHJcbiAgICAkKHRoaXMuZG9tTm9kZSkucmVtb3ZlQ2xhc3MoJ2xpc3QtbG9hZGluZycpO1xyXG4gICAgdGhpcy5zZXQoJ2xpc3RDb250ZW50JywgdGhpcy5jdXJyZW50R291cE5vdEZvdW5kVGVtcGxhdGUuYXBwbHkodGhpcykpO1xyXG4gIH0sXHJcbiAgYWN0aXZhdGVFbnRyeTogZnVuY3Rpb24gYWN0aXZhdGVFbnRyeShwYXJhbXMpIHtcclxuICAgIGlmICh0aGlzLmdyb3Vwc0VuYWJsZWQgJiYgdGhpcy5ncm91cHNNb2RlICYmICFwYXJhbXMucmVzb2x2ZWQpIHtcclxuICAgICAgdGhpcy5fZ3JvdXBBY3RpdmF0ZUVudHJ5KHBhcmFtcyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmluaGVyaXRlZChhcmd1bWVudHMpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgX2dyb3VwQWN0aXZhdGVFbnRyeTogZnVuY3Rpb24gX2dyb3VwQWN0aXZhdGVFbnRyeShwYXJhbXMpIHtcclxuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xyXG5cclxuICAgIGlmIChwYXJhbXMua2V5KSB7XHJcbiAgICAgIGNvbnN0IHJlc29sdmVkRW50cnkgPSB0aGlzLl9nZXRSZXNvbHZlZEVudHJ5KHBhcmFtcy5rZXkpO1xyXG4gICAgICBpZiAoIXJlc29sdmVkRW50cnkpIHtcclxuICAgICAgICB0aGlzLl9mZXRjaFJlc29sdmVkRW50cnkocGFyYW1zLmtleSkudGhlbigocmVzb2x2ZWRFbnQpID0+IHtcclxuICAgICAgICAgIHBhcmFtcy5kZXNjcmlwdG9yID0gcmVzb2x2ZWRFbnQuJGRlc2NyaXB0b3I7XHJcbiAgICAgICAgICBwYXJhbXMucmVzb2x2ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgc2VsZi5hY3RpdmF0ZUVudHJ5KHBhcmFtcyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcGFyYW1zLmRlc2NyaXB0b3IgPSByZXNvbHZlZEVudHJ5LiRkZXNjcmlwdG9yO1xyXG4gICAgICAgIHBhcmFtcy5yZXNvbHZlZCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5hY3RpdmF0ZUVudHJ5KHBhcmFtcyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIF9pbnZva2VBY3Rpb246IGZ1bmN0aW9uIF9pbnZva2VBY3Rpb24odGhlQWN0aW9uLCBzZWxlY3Rpb24gPSB7fSkge1xyXG4gICAgaWYgKHRoaXMuZ3JvdXBzRW5hYmxlZCAmJiB0aGlzLmdyb3Vwc01vZGUgJiYgIXNlbGVjdGlvbi5yZXNvbHZlZCkge1xyXG4gICAgICB0aGlzLl9ncm91cEludm9rZUFjdGlvbih0aGVBY3Rpb24sIHNlbGVjdGlvbik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmluaGVyaXRlZChhcmd1bWVudHMpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgX2dyb3VwSW52b2tlQWN0aW9uOiBmdW5jdGlvbiBfZ3JvdXBJbnZva2VBY3Rpb24odGhlQWN0aW9uLCBzZWxlY3Rpb24pIHtcclxuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xyXG4gICAgY29uc3QgcmVzb2x2ZWRFbnRyeSA9IHRoaXMuX2dldFJlc29sdmVkRW50cnkoc2VsZWN0aW9uLmRhdGEuJGtleSk7XHJcbiAgICBpZiAoIXJlc29sdmVkRW50cnkpIHtcclxuICAgICAgdGhpcy5fZmV0Y2hSZXNvbHZlZEVudHJ5KHNlbGVjdGlvbi5kYXRhLiRrZXkpLnRoZW4oKHJlc29sdmVkRW50KSA9PiB7XHJcbiAgICAgICAgc2VsZi5faW52b2tlQWN0aW9uKHRoZUFjdGlvbiwge1xyXG4gICAgICAgICAgZGF0YTogcmVzb2x2ZWRFbnQsXHJcbiAgICAgICAgICByZXNvbHZlZDogdHJ1ZSxcclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLl9pbnZva2VBY3Rpb24odGhlQWN0aW9uLCB7XHJcbiAgICAgICAgZGF0YTogcmVzb2x2ZWRFbnRyeSxcclxuICAgICAgICByZXNvbHZlZDogdHJ1ZSxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBzaG93QWN0aW9uUGFuZWw6IGZ1bmN0aW9uIHNob3dBY3Rpb25QYW5lbChyb3dOb2RlKSB7XHJcbiAgICBpZiAodGhpcy5ncm91cHNFbmFibGVkICYmIHRoaXMuZ3JvdXBzTW9kZSkge1xyXG4gICAgICB0aGlzLl9ncm91cFNob3dBY3Rpb25QYW5lbChyb3dOb2RlKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuaW5oZXJpdGVkKGFyZ3VtZW50cyk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBfZ3JvdXBTaG93QWN0aW9uUGFuZWw6IGZ1bmN0aW9uIF9ncm91cFNob3dBY3Rpb25QYW5lbChyb3dOb2RlKSB7XHJcbiAgICBjb25zdCBzZWxlY3Rpb24gPSB0aGlzLl9nZXRDdXJyZW50U2VsZWN0aW9uKCk7XHJcbiAgICBjb25zdCBzZWxmID0gdGhpcztcclxuICAgIGNvbnN0IHJlc29sdmVkRW50cnkgPSB0aGlzLl9nZXRSZXNvbHZlZEVudHJ5KHNlbGVjdGlvbi5kYXRhLiRrZXkpO1xyXG4gICAgaWYgKCFyZXNvbHZlZEVudHJ5KSB7XHJcbiAgICAgIHRoaXMuX2ZldGNoUmVzb2x2ZWRFbnRyeShzZWxlY3Rpb24uZGF0YS4ka2V5KS50aGVuKChyZXNvbHZlZEVudCkgPT4ge1xyXG4gICAgICAgIHNlbGYuX2dyb3VwQ2hlY2tBY3Rpb25TdGF0ZShyZXNvbHZlZEVudCwgcm93Tm9kZSk7XHJcbiAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgdGhpcy5fZ3JvdXBDaGVja0FjdGlvblN0YXRlKHJlc29sdmVkRW50cnksIHJvd05vZGUpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgX2dyb3VwQXBwbHlBY3Rpb25QYW5lbDogZnVuY3Rpb24gX2dyb3VwQXBwbHlBY3Rpb25QYW5lbChyb3dOb2RlKSB7XHJcbiAgICBfTGlzdEJhc2UucHJvdG90eXBlLnNob3dBY3Rpb25QYW5lbC5jYWxsKHRoaXMsIHJvd05vZGUpO1xyXG4gIH0sXHJcbiAgX2dldEN1cnJlbnRTZWxlY3Rpb246IGZ1bmN0aW9uIF9nZXRDdXJyZW50U2VsZWN0aW9uKCkge1xyXG4gICAgY29uc3Qgc2VsZWN0ZWRJdGVtcyA9IHRoaXMuZ2V0KCdzZWxlY3Rpb25Nb2RlbCcpLmdldFNlbGVjdGlvbnMoKTtcclxuICAgIGxldCBzZWxlY3Rpb247XHJcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBzZWxlY3RlZEl0ZW1zKSB7XHJcbiAgICAgIGlmIChzZWxlY3RlZEl0ZW1zLmhhc093blByb3BlcnR5KGtleSkpIHtcclxuICAgICAgICBzZWxlY3Rpb24gPSBzZWxlY3RlZEl0ZW1zW2tleV07XHJcbiAgICAgICAgc2VsZWN0aW9uLmRhdGEuJGtleSA9IGtleTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHNlbGVjdGlvbjtcclxuICB9LFxyXG4gIF9mZXRjaFJlc29sdmVkRW50cnk6IGZ1bmN0aW9uIF9mZXRjaFJlc29sdmVkRW50cnkoZW50cnlLZXkpIHtcclxuICAgIGNvbnN0IGRlZiA9IG5ldyBEZWZlcnJlZCgpO1xyXG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XHJcbiAgICBjb25zdCBzdG9yZSA9IG5ldyBTRGF0YVN0b3JlKHtcclxuICAgICAgc2VydmljZTogQXBwLnNlcnZpY2VzLmNybSxcclxuICAgICAgcmVzb3VyY2VLaW5kOiB0aGlzLnJlc291cmNlS2luZCxcclxuICAgICAgY29udHJhY3ROYW1lOiB0aGlzLmNvbnRyYWN0TmFtZSxcclxuICAgICAgc2NvcGU6IHRoaXMsXHJcbiAgICB9KTtcclxuXHJcbiAgICBsZXQgc2VsZWN0ID0gdGhpcy5fb3JpZ2luYWxQcm9wcy5xdWVyeVNlbGVjdDtcclxuXHJcbiAgICAvLyBVc2UgcXVlcnlTZWxlY3QgZnJvbSB0aGUgbW9kZWwgaWYgYXZhaWxhYmxlXHJcbiAgICAvLyBUT0RPOiBFeHBvc2UgX2dldFF1ZXJ5TW9kZWxCeU5hbWUgYmV0dGVyIHNvbWVob3dcclxuICAgIGlmICh0aGlzLl9vcmlnaW5hbFByb3BzLl9tb2RlbCkge1xyXG4gICAgICBjb25zdCBxdWVyeU1vZGVsID0gdGhpcy5fb3JpZ2luYWxQcm9wcy5fbW9kZWwuX2dldFF1ZXJ5TW9kZWxCeU5hbWUoJ2xpc3QnKTtcclxuICAgICAgaWYgKHF1ZXJ5TW9kZWwgJiYgcXVlcnlNb2RlbC5xdWVyeVNlbGVjdCkge1xyXG4gICAgICAgIHNlbGVjdCA9IHF1ZXJ5TW9kZWwucXVlcnlTZWxlY3Q7XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBxdWVyeU9wdGlvbnMgPSB7XHJcbiAgICAgIHNlbGVjdCxcclxuICAgICAgd2hlcmU6IGBJZCBlcSAnJHtlbnRyeUtleX0nYCxcclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgcXVlcnlSZXN1bHRzID0gc3RvcmUucXVlcnkobnVsbCwgcXVlcnlPcHRpb25zKTtcclxuXHJcbiAgICB3aGVuKHF1ZXJ5UmVzdWx0cywgKGZlZWQpID0+IHtcclxuICAgICAgY29uc3QgZW50cnkgPSBmZWVkWzBdO1xyXG4gICAgICBlbnRyeVtzZWxmLmlkUHJvcGVydHldID0gZW50cnkuJGtleTsgLy8gd2UgbmVlZCB0aGlzIGJlY2F1c2UgdGhlIGdyb3VwIGtleSBpcyBkaWZmZXJlbnQsIGFuZCBpdCB1c2VkIGxhdGVyIG9uIHdoZW4gaW52b2tpbmcgYW4gYWN0aW9uO1xyXG4gICAgICBzZWxmLl9hZGRSZXNvbHZlZEVudHJ5KGVudHJ5KTtcclxuICAgICAgZGVmLnJlc29sdmUoZW50cnkpO1xyXG4gICAgfSwgKGVycikgPT4ge1xyXG4gICAgICBkZWYucmVqZWN0KGVycik7XHJcbiAgICB9KTtcclxuXHJcbiAgICByZXR1cm4gZGVmLnByb21pc2U7XHJcbiAgfSxcclxuICBfY2xlYXJSZXNvbHZlZEVudHJ5Q2FjaGU6IGZ1bmN0aW9uIF9jbGVhclJlc29sdmVkRW50cnlDYWNoZSgpIHtcclxuICAgIHRoaXMuX3Jlc29sdmVkRW50cnlDYWNoZSA9IHt9O1xyXG4gIH0sXHJcbiAgX2dldFJlc29sdmVkRW50cnk6IGZ1bmN0aW9uIF9nZXRSZXNvbHZlZEVudHJ5KGVudHJ5S2V5KSB7XHJcbiAgICBpZiAoIXRoaXMuX3Jlc29sdmVkRW50cnlDYWNoZSkge1xyXG4gICAgICB0aGlzLl9yZXNvbHZlZEVudHJ5Q2FjaGUgPSB7fTtcclxuICAgIH1cclxuICAgIHJldHVybiB0aGlzLl9yZXNvbHZlZEVudHJ5Q2FjaGVbZW50cnlLZXldO1xyXG4gIH0sXHJcbiAgX2FkZFJlc29sdmVkRW50cnk6IGZ1bmN0aW9uIF9hZGRSZXNvbHZlZEVudHJ5KGVudHJ5KSB7XHJcbiAgICB0aGlzLl9yZXNvbHZlZEVudHJ5Q2FjaGVbZW50cnkuJGtleV0gPSBlbnRyeTtcclxuICB9LFxyXG4gIF9ncm91cENoZWNrQWN0aW9uU3RhdGU6IGZ1bmN0aW9uIF9ncm91cENoZWNrQWN0aW9uU3RhdGUocmVzb2x2ZWRFbnRyeSwgcm93Tm9kZSkge1xyXG4gICAgY29uc3QgcmVzb2x2ZWRTZWxlY3Rpb24gPSB7XHJcbiAgICAgIGRhdGE6IHJlc29sdmVkRW50cnksXHJcbiAgICB9O1xyXG4gICAgdGhpcy5fYXBwbHlTdGF0ZVRvQWN0aW9ucyhyZXNvbHZlZFNlbGVjdGlvbiwgcm93Tm9kZSk7XHJcbiAgfSxcclxuICBfcmVmcmVzaExpc3Q6IGZ1bmN0aW9uIF9yZWZyZXNoTGlzdCgpIHtcclxuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xyXG4gICAgaWYgKHRoaXMuZ3JvdXBzRW5hYmxlZCAmJiB0aGlzLmdyb3VwTGlzdCAmJiB0aGlzLl9jdXJyZW50R3JvdXApIHtcclxuICAgICAgdGhpcy5fcmVxdWVzdEdyb3VwKHRoaXMuX2N1cnJlbnRHcm91cC5uYW1lLCB0aGlzLl9jdXJyZW50R3JvdXAuJGtleSwgZnVuY3Rpb24gY2hlY2tHcm91cChyZXN1bHRzKSB7XHJcbiAgICAgICAgY29uc3QgZ3JvdXAgPSByZXN1bHRzWzBdO1xyXG4gICAgICAgIGlmIChncm91cCkge1xyXG4gICAgICAgICAgR3JvdXBVdGlsaXR5LmFkZFRvR3JvdXBQcmVmZXJlbmNlcyhbZ3JvdXBdLCB0aGlzLmVudGl0eU5hbWUpO1xyXG4gICAgICAgICAgc2VsZi5zZXRDdXJyZW50R3JvdXAoZ3JvdXApO1xyXG4gICAgICAgICAgdGhpcy5yZWZyZXNoUmlnaHREcmF3ZXIoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gTm90ZSB0aGlzIGlzIHdoYXQgdGhpcy5pbmhlcml0ZWQoYXJndW1lbnRzKSBjYWxscywgYnV0IHRoYXQgbWF5IGNoYW5nZVxyXG4gICAgICAgIC8vIENhbid0IGNhbGwgdGhpcy5pbmhlcml0ZWQgYXN5bmNocm9ub3VzbHkuLi5cclxuICAgICAgICBzZWxmLmZvcmNlUmVmcmVzaCgpO1xyXG4gICAgICB9KTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuaW5oZXJpdGVkKGFyZ3VtZW50cyk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBncm91cEludm9rZUxpc3RBY3Rpb246IGZ1bmN0aW9uIGdyb3VwSW52b2tlTGlzdEFjdGlvbihwYXJhbXMpIHtcclxuICAgIGNvbnN0IGtleSA9IHBhcmFtcy5rZXk7XHJcbiAgICBjb25zdCBwcm9wZXJ0eU5hbWUgPSBwYXJhbXMucHJvcGVydHluYW1lO1xyXG4gICAgY29uc3QgYWN0aW9uTmFtZSA9IHBhcmFtcy5uYW1lO1xyXG4gICAgY29uc3QgcmVzb2x2ZWRFbnRyeSA9IHRoaXMuX2dldFJlc29sdmVkRW50cnkoa2V5KTtcclxuICAgIGlmICghcmVzb2x2ZWRFbnRyeSkge1xyXG4gICAgICB0aGlzLl9mZXRjaFJlc29sdmVkRW50cnkoa2V5KS50aGVuKChyZXNvbHZlZEVudCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XHJcbiAgICAgICAgICBzZWxlY3Rpb246IHtcclxuICAgICAgICAgICAgZGF0YTogcmVzb2x2ZWRFbnQsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgcHJvcGVydHlOYW1lLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5ncm91cEludm9rZUFjdGlvbkJ5TmFtZShhY3Rpb25OYW1lLCBvcHRpb25zKTtcclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zdCBvcHRpb25zID0ge1xyXG4gICAgICAgIHNlbGVjdGlvbjoge1xyXG4gICAgICAgICAgZGF0YTogcmVzb2x2ZWRFbnRyeSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHByb3BlcnR5TmFtZSxcclxuICAgICAgfTtcclxuICAgICAgdGhpcy5ncm91cEludm9rZUFjdGlvbkJ5TmFtZShhY3Rpb25OYW1lLCBvcHRpb25zKTtcclxuICAgIH1cclxuICB9LFxyXG4gIGdyb3VwSW52b2tlQWN0aW9uQnlOYW1lOiBmdW5jdGlvbiBncm91cEludm9rZUFjdGlvbkJ5TmFtZShhY3Rpb25OYW1lLCBvcHRpb25zKSB7XHJcbiAgICBsZXQgb3B0ID0gb3B0aW9ucztcclxuICAgIGlmICghb3B0KSB7XHJcbiAgICAgIG9wdCA9IHt9O1xyXG4gICAgfVxyXG4gICAgc3dpdGNoIChhY3Rpb25OYW1lKSB7XHJcbiAgICAgIGNhc2UgJ2NhbGxQaG9uZSc6XHJcbiAgICAgICAgYWN0aW9uLmNhbGxQaG9uZS5jYWxsKHRoaXMsIG51bGwsIG9wdC5zZWxlY3Rpb24sIG9wdC5wcm9wZXJ0eU5hbWUsIEFjdGl2aXR5VHlwZVRleHQuYXRQaG9uZUNhbGwpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdzZW5kRW1haWwnOlxyXG4gICAgICAgIGFjdGlvbi5zZW5kRW1haWwuY2FsbCh0aGlzLCBudWxsLCBvcHQuc2VsZWN0aW9uLCBvcHQucHJvcGVydHlOYW1lKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICB9LFxyXG4gIGdldENvbnRleHRTbmFwU2hvdDogZnVuY3Rpb24gZ2V0Q29udGV4dFNuYXBTaG90KG9wdGlvbnMpIHtcclxuICAgIGxldCBzbmFwU2hvdDtcclxuICAgIGlmICh0aGlzLl9ncm91cEluaXRpYWxpemVkICYmIHRoaXMuZ3JvdXBzTW9kZSkge1xyXG4gICAgICBjb25zdCBlbnRyeSA9IHRoaXMuZW50cmllc1tvcHRpb25zLmtleV07XHJcbiAgICAgIGNvbnN0IHRlbXBsYXRlID0gdGhpcy5yb3dUZW1wbGF0ZTtcclxuICAgICAgc25hcFNob3QgPSB0ZW1wbGF0ZS5hcHBseShlbnRyeSwgdGhpcyk7XHJcbiAgICAgIHJldHVybiBzbmFwU2hvdDtcclxuICAgIH1cclxuICAgIHNuYXBTaG90ID0gdGhpcy5pbmhlcml0ZWQoYXJndW1lbnRzKTtcclxuXHJcbiAgICByZXR1cm4gc25hcFNob3Q7XHJcbiAgfSxcclxuICBpbml0TW9kZWw6IGZ1bmN0aW9uIGluaXRNb2RlbCgpIHtcclxuICAgIGlmICghdGhpcy5fZ3JvdXBJbml0aWFsaXplZCB8fCAhdGhpcy5ncm91cHNNb2RlKSB7XHJcbiAgICAgIHRoaXMuaW5oZXJpdGVkKGFyZ3VtZW50cyk7XHJcbiAgICB9XHJcbiAgfSxcclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBfX2NsYXNzO1xyXG4iXX0=
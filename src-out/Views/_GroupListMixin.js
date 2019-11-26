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
      this.inherited(postMixInProperties, arguments);
    },
    startup: function startup() {
      this.createGroupTemplates();
      this.inherited(startup, arguments);
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
          this.inherited(requestData, arguments);
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
      this.inherited(clear, arguments);
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

      this.inherited(setPrimaryTitle, arguments);
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
      this.inherited(_onQueryError, arguments);
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
          // Note this is what this.inherited(_refreshList, arguments) calls, but that may change
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
      snapShot = this.inherited(getContextSnapShot, arguments);

      return snapShot;
    },
    initModel: function initModel() {
      if (!this._groupInitialized || !this.groupsMode) {
        this.inherited(initModel, arguments);
      }
    }
  });

  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9WaWV3cy9fR3JvdXBMaXN0TWl4aW4uanMiXSwibmFtZXMiOlsicmVzb3VyY2UiLCJfX2NsYXNzIiwibm9EZWZhdWx0R3JvdXBUZXh0IiwiY3VycmVudEdyb3VwTm90Rm91bmRUZXh0IiwiZ3JvdXBUZW1wbGF0ZVN1bW1hcnlUZXh0IiwiZ3JvdXBUZW1wbGF0ZURldGFpbFRleHQiLCJncm91cHNNb2RlVGV4dCIsImhhc0RlZmF1bHRHcm91cCIsIm5vRGVmYXVsdEdyb3VwVGVtcGxhdGUiLCJTaW1wbGF0ZSIsImN1cnJlbnRHb3VwTm90Rm91bmRUZW1wbGF0ZSIsIl9nZXROb0RlZmF1bHRHcm91cE1lc3NhZ2UiLCJfZ2V0Q3VycmVudEdyb3VwTm90Rm91bmRNZXNzYWdlIiwib3BlbkNvbmZpZ3VyZSIsIl9zZWxlY3RHcm91cHMiLCJlbnRpdHlOYW1lIiwiZ3JvdXBzRW5hYmxlZCIsImdyb3Vwc01vZGUiLCJjdXJyZW50R3JvdXBJZCIsIl9jdXJyZW50R3JvdXAiLCJfZ3JvdXBJbml0aWFsaXplZCIsIl9vcmlnaW5hbFByb3BzIiwib3ZlcnJpZGVHcm91cExheW91dE5hbWUiLCJfb3ZlcnJpZGVMYXlvdXRJbml0YWxpemVkIiwiX292ZXJyaWRlR3JvdXBMYXlvdXQiLCJlbmFibGVEeW5hbWljR3JvdXBMYXlvdXQiLCJlbmFibGVPdmVycmlkZUxheW91dCIsInNlbGVjdGVkQ29sdW1ucyIsImxheW91dCIsInBvc3RNaXhJblByb3BlcnRpZXMiLCJBcHAiLCJlbmFibGVHcm91cHMiLCJpbmhlcml0ZWQiLCJhcmd1bWVudHMiLCJzdGFydHVwIiwiY3JlYXRlR3JvdXBUZW1wbGF0ZXMiLCJnZXRUaXRsZSIsImVudHJ5IiwibGFiZWxQcm9wZXJ0eSIsInZhbHVlIiwiZ2V0VmFsdWUiLCJmaXJzdExheW91dEl0ZW0iLCJhbGlhcyIsImNvbnNvbGUiLCJ3YXJuIiwicmVxdWVzdERhdGEiLCIkIiwiZG9tTm9kZSIsImFkZENsYXNzIiwiX3NldExvYWRpbmciLCJpbml0R3JvdXAiLCJlIiwiZXJyb3IiLCJqb2luRmllbGRzIiwic2VwIiwiZmllbGRzIiwiZ2V0RGVzY3JpcHRvciIsImVudGl0eSIsIiRkZXNjcmlwdG9yIiwiJGtleSIsImdldEN1cnJlbnRHcm91cCIsInNldEN1cnJlbnRHcm91cCIsImdyb3VwIiwic2V0RGVmYXVsdEdyb3VwUHJlZmVyZW5jZSIsIm5hbWUiLCJnZXREZWZhdWx0R3JvdXAiLCJkZWZhdWx0R3JvdXAiLCJkZWZhdWx0R3JvdXBOYW1lIiwiZ2V0RGVmYXVsdEdyb3VwUHJlZmVyZW5jZSIsIl9yZXF1ZXN0R3JvdXAiLCJzZXQiLCJhcHBseSIsImluaXRPdmVycmlkZUdyb3VwTGF5b3V0IiwiX3JlcXVlc3RPdmVycmlkZUdyb3VwTGF5b3V0IiwidGhlbiIsInJlc3VsdCIsImxlbmd0aCIsIl9vbkFwcGx5R3JvdXAiLCJjbGVhciIsIl9jbGVhclJlc29sdmVkRW50cnlDYWNoZSIsIkVycm9yIiwiX2ZpZWxkRm9ybWF0dGVycyIsIl9zdGFydEdyb3VwTW9kZSIsInRpdGxlIiwiZ2V0R3JvdXBUaXRsZSIsInNldFByaW1hcnlUaXRsZSIsImdldExheW91dCIsInNlbGVjdENvbHVtbnMiLCJnZXRDb2x1bW5OYW1lcyIsIml0ZW1UZW1wbGF0ZSIsImdldEl0ZW1UZW1wbGF0ZSIsInJlcXVlc3QiLCJjcmVhdGVHcm91cFJlcXVlc3QiLCJncm91cElkIiwiY29ubmVjdGlvbiIsImdldENvbm5lY3Rpb24iLCJwdXNoIiwiZmFtaWx5IiwicXVlcnlTZWxlY3QiLCJxdWVyeU9yZGVyQnkiLCJpZFByb3BlcnR5IiwidG9VcHBlckNhc2UiLCJzdG9yZSIsInJlZnJlc2hSZXF1aXJlZCIsImRlZiIsImdyb3VwTmFtZSIsInNlcnZpY2UiLCJzZXJ2aWNlcyIsImNybSIsInJlc291cmNlS2luZCIsImNvbnRyYWN0TmFtZSIsIndoZXJlIiwiaW5jbHVkZSIsImFwcGxpY2F0aW9uTmFtZSIsInNjb3BlIiwicXVlcnlSZXN1bHRzIiwicXVlcnkiLCJyZWxhdGVkRmVlZCIsInJlc29sdmUiLCJwcm9taXNlIiwib25TdWNjZXNzIiwicXVlcnlXaGVuIiwiY29udGV4dCIsInF1ZXJ5UmVzdWx0IiwicXVlcnlSZXN1bHRGbiIsImdyb3VwRmVlZCIsIl9vbkdyb3VwUmVxdWVzdFN1Y2Nlc3MiLCJiaW5kIiwibG9nIiwiYWRkVG9Hcm91cFByZWZlcmVuY2VzIiwib25UcmFuc2l0aW9uQXdheSIsImxvYWRSaWdodERyYXdlciIsInJlbW92ZUNsYXNzIiwibGlzdExvYWRpbmciLCJfb25Hcm91cFJlcXVlc3RGYWlsZCIsImRpc3BsYXlOYW1lIiwibGF5b3V0VGVtcGxhdGUiLCJnZXRTZWxlY3RlZEdyb3VwTGF5b3V0VGVtcGxhdGUiLCJ0eXBlIiwiZ2V0RHluYW1pY0xheW91dEl0ZW1UZW1wbGF0ZSIsIm9wdGlvbnMiLCJ0ZW1wbGF0ZSIsImRlZmF1bHRHcm91cExheW91dEl0ZW1UZW1wbGF0ZSIsIm1hcCIsImdldEl0ZW1MYXlvdXRUZW1wbGF0ZSIsIml0ZW0iLCJqc29uU3RyaW5nIiwic3RyaW5naWZ5IiwiY2FwdGlvbiIsImpvaW4iLCJjcmVhdGVHcm91cFRlbXBsYXRlTGF5b3V0cyIsImdyb3VwVGVtcGxhdGVMYXlvdXRzIiwiY29sdW1ucyIsImlkIiwicm93cyIsImZvckVhY2giLCJfY3JlYXRlQ3VzdG9taXplZExheW91dCIsImxheW91dE9wdGlvbnMiLCJhcHBseUR5bmFtaWNMYXlvdXRPcHRpb25zIiwiY29sdW1uIiwicm93IiwicHJvcGVydHlQYXRoIiwiaSIsImNvbHVtbkl0ZW0iLCJjb2x1bW5DbGFzcyIsImNsc3MiLCJoaWRlTGFiZWxzIiwiZ2V0R3JvdXBGaWVsZExhYmVsQnlOYW1lIiwiZm9ybWF0T3B0aW9ucyIsImdldEdyb3VwRmllbGRGb3JtYXRPcHRpb25zIiwiZm9ybWF0Q2xzcyIsImZvcm1hdCIsIm1peGluIiwiZ2V0R3JvdXBJdGVtS2V5IiwiZ3JvdXBFbnRyeSIsImxheW91dEl0ZW0iLCJmb3JtYXR0ZXIiLCJnZXRGb3JtYXR0ZXJCeUxheW91dCIsImZvcm1hdFN0cmluZyIsImdldEdyb3VwRmllbGRWYWx1ZUJ5TmFtZSIsImFwcGx5Rm9ybWF0IiwiZ2V0R3JvdXBGaWVsZFZhbHVlIiwiZ2V0R3JvdXBGaWVsZExhYmVsQnlJbmRleCIsImxheW91dEluZGV4IiwiZ2V0R3JvdXBGaWVsZFZhbHVlQnlJbmRleCIsImZpZWxkTmFtZSIsImdldEZpZWxkTmFtZUJ5TGF5b3V0IiwiZ3JvdXBUcmFuc2Zvcm1WYWx1ZSIsInBhdGgiLCJpbmRleCIsImdldEdyb3VwRmllbGRGb3JtYXR0ZXIiLCJncm91cEZpZWxkRm9ybWF0dGVyIiwib3JpZ2luYWwiLCJjbG9uZSIsInJvd1RlbXBsYXRlIiwiaXRlbUZvb3RlclRlbXBsYXRlIiwicmVsYXRlZFZpZXdzIiwiZ2V0IiwiX21vZGVsIiwiX2NsZWFyR3JvdXBNb2RlIiwiX29uUXVlcnlFcnJvciIsInF1ZXJ5T3B0aW9ucyIsInN0YXR1cyIsIl9vbkdyb3VwTm90Rm91bmQiLCJyZW1vdmVHcm91cFByZWZlcmVuY2VzIiwicmVmcmVzaFJpZ2h0RHJhd2VyIiwiYWN0aXZhdGVFbnRyeSIsInBhcmFtcyIsInJlc29sdmVkIiwiX2dyb3VwQWN0aXZhdGVFbnRyeSIsInNlbGYiLCJrZXkiLCJyZXNvbHZlZEVudHJ5IiwiX2dldFJlc29sdmVkRW50cnkiLCJfZmV0Y2hSZXNvbHZlZEVudHJ5IiwicmVzb2x2ZWRFbnQiLCJkZXNjcmlwdG9yIiwiX2ludm9rZUFjdGlvbiIsInRoZUFjdGlvbiIsInNlbGVjdGlvbiIsIl9ncm91cEludm9rZUFjdGlvbiIsImRhdGEiLCJzaG93QWN0aW9uUGFuZWwiLCJyb3dOb2RlIiwiX2dyb3VwU2hvd0FjdGlvblBhbmVsIiwiX2dldEN1cnJlbnRTZWxlY3Rpb24iLCJfZ3JvdXBDaGVja0FjdGlvblN0YXRlIiwiX2dyb3VwQXBwbHlBY3Rpb25QYW5lbCIsInByb3RvdHlwZSIsImNhbGwiLCJzZWxlY3RlZEl0ZW1zIiwiZ2V0U2VsZWN0aW9ucyIsImhhc093blByb3BlcnR5IiwiZW50cnlLZXkiLCJzZWxlY3QiLCJxdWVyeU1vZGVsIiwiX2dldFF1ZXJ5TW9kZWxCeU5hbWUiLCJmZWVkIiwiX2FkZFJlc29sdmVkRW50cnkiLCJlcnIiLCJyZWplY3QiLCJfcmVzb2x2ZWRFbnRyeUNhY2hlIiwicmVzb2x2ZWRTZWxlY3Rpb24iLCJfYXBwbHlTdGF0ZVRvQWN0aW9ucyIsIl9yZWZyZXNoTGlzdCIsImdyb3VwTGlzdCIsImNoZWNrR3JvdXAiLCJyZXN1bHRzIiwiZm9yY2VSZWZyZXNoIiwiZ3JvdXBJbnZva2VMaXN0QWN0aW9uIiwicHJvcGVydHlOYW1lIiwicHJvcGVydHluYW1lIiwiYWN0aW9uTmFtZSIsImdyb3VwSW52b2tlQWN0aW9uQnlOYW1lIiwib3B0IiwiY2FsbFBob25lIiwiYXRQaG9uZUNhbGwiLCJzZW5kRW1haWwiLCJnZXRDb250ZXh0U25hcFNob3QiLCJzbmFwU2hvdCIsImVudHJpZXMiLCJpbml0TW9kZWwiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7OztBQTZCQSxNQUFNQSxXQUFXLG9CQUFZLGdCQUFaLENBQWpCOztBQUVBOzs7OztBQUtBLE1BQU1DLFVBQVUsdUJBQVEsMkJBQVIsRUFBcUMsSUFBckMsRUFBMkM7QUFDekRDLHdCQUFvQkYsU0FBU0Usa0JBRDRCO0FBRXpEQyw4QkFBMEJILFNBQVNHLHdCQUZzQjtBQUd6REMsOEJBQTBCSixTQUFTSSx3QkFIc0I7QUFJekRDLDZCQUF5QkwsU0FBU0ssdUJBSnVCO0FBS3pEQyxvQkFBZ0JOLFNBQVNNLGNBTGdDO0FBTXpEQyxxQkFBaUIsSUFOd0M7QUFPekRDLDRCQUF3QixJQUFJQyxRQUFKLENBQWEsQ0FDbkMsa0RBRG1DLEVBRW5DLHVFQUZtQyxFQUduQyxPQUhtQyxDQUFiLENBUGlDO0FBWXpEQyxpQ0FBNkIsSUFBSUQsUUFBSixDQUFhLENBQ3hDLHNCQUR3QyxFQUV4Qyw2RUFGd0MsRUFHeEMsT0FId0MsQ0FBYixDQVo0Qjs7QUFrQnpERSwrQkFBMkIsU0FBU0EseUJBQVQsR0FBcUM7QUFDOUQsYUFBT1gsU0FBU0Usa0JBQWhCO0FBQ0QsS0FwQndEO0FBcUJ6RFUscUNBQWlDLFNBQVNBLCtCQUFULEdBQTJDO0FBQzFFLGFBQU9aLFNBQVNHLHdCQUFoQjtBQUNELEtBdkJ3RDtBQXdCekRVLG1CQUFlLFNBQVNBLGFBQVQsR0FBeUI7QUFDdEMsVUFBSSxLQUFLQyxhQUFULEVBQXdCO0FBQ3RCLGFBQUtBLGFBQUw7QUFDRDtBQUNGLEtBNUJ3RDtBQTZCekQ7QUFDQUMsZ0JBQVksSUE5QjZDO0FBK0J6REMsbUJBQWUsS0EvQjBDO0FBZ0N6REMsZ0JBQVksS0FoQzZDO0FBaUN6REMsb0JBQWdCLElBakN5QztBQWtDekRDLG1CQUFlLElBbEMwQztBQW1DekRDLHVCQUFtQixLQW5Dc0M7QUFvQ3pEQyxvQkFBZ0IsSUFwQ3lDO0FBcUN6REMsNkJBQXlCLGVBckNnQztBQXNDekRDLCtCQUEyQixLQXRDOEI7QUF1Q3pEQywwQkFBc0IsSUF2Q21DO0FBd0N6REMsOEJBQTBCLElBeEMrQjtBQXlDekRDLDBCQUFzQixLQXpDbUM7O0FBMkN6REMscUJBQWlCLElBM0N3QztBQTRDekRDLFlBQVEsSUE1Q2lEOztBQThDekRDLHlCQUFxQixTQUFTQSxtQkFBVCxHQUErQjtBQUNsRCxVQUFJLENBQUNDLElBQUlDLFlBQVQsRUFBdUI7QUFDckIsYUFBS2QsVUFBTCxHQUFrQixLQUFsQjtBQUNBLGFBQUtELGFBQUwsR0FBcUIsS0FBckI7QUFDRDs7QUFFRCxVQUFJLEtBQUtBLGFBQVQsRUFBd0I7QUFDdEIsYUFBS0MsVUFBTCxHQUFrQixJQUFsQjtBQUNEO0FBQ0QsV0FBS2UsU0FBTCxDQUFlSCxtQkFBZixFQUFvQ0ksU0FBcEM7QUFDRCxLQXhEd0Q7QUF5RHpEQyxhQUFTLFNBQVNBLE9BQVQsR0FBbUI7QUFDMUIsV0FBS0Msb0JBQUw7QUFDQSxXQUFLSCxTQUFMLENBQWVFLE9BQWYsRUFBd0JELFNBQXhCO0FBQ0QsS0E1RHdEO0FBNkR6REcsY0FBVSxTQUFTQSxRQUFULENBQWtCQyxLQUFsQixFQUF5QkMsYUFBekIsRUFBd0M7QUFDaEQ7QUFDQSxVQUFJQyxRQUFRLGtCQUFRQyxRQUFSLENBQWlCSCxLQUFqQixFQUF3QkMsYUFBeEIsQ0FBWjtBQUNBLFVBQUlDLEtBQUosRUFBVztBQUNULGVBQU9BLEtBQVA7QUFDRDs7QUFFRDtBQUNBQSxjQUFRLGtCQUFRQyxRQUFSLENBQWlCSCxLQUFqQixFQUF3QixhQUF4QixLQUEwQyxrQkFBUUcsUUFBUixDQUFpQkgsS0FBakIsRUFBd0IsYUFBeEIsQ0FBbEQ7QUFDQSxVQUFJRSxLQUFKLEVBQVc7QUFDVCxlQUFPQSxLQUFQO0FBQ0Q7O0FBRUQ7QUFDQSxVQUFNRSxrQkFBa0IsS0FBS2IsTUFBTCxJQUFlLEtBQUtBLE1BQUwsQ0FBWSxDQUFaLENBQXZDO0FBQ0EsVUFBSWEsbUJBQW1CQSxnQkFBZ0JDLEtBQXZDLEVBQThDO0FBQzVDLGVBQU8sa0JBQVFGLFFBQVIsQ0FBaUJILEtBQWpCLEVBQXdCSSxnQkFBZ0JDLEtBQXhDLENBQVA7QUFDRDs7QUFFRDtBQUNBQyxjQUFRQyxJQUFSLDhCQUF3Q04sYUFBeEMsRUFwQmdELENBb0JVO0FBQzFELGFBQU8sRUFBUDtBQUNELEtBbkZ3RDtBQW9GekRPLGlCQUFhLFNBQVNBLFdBQVQsR0FBdUI7QUFDbEMsVUFBSTtBQUNGLFlBQUksQ0FBQyxLQUFLekIsaUJBQU4sSUFBMkIsS0FBS0gsVUFBcEMsRUFBZ0Q7QUFDOUM2QixZQUFFLEtBQUtDLE9BQVAsRUFBZ0JDLFFBQWhCLENBQXlCLGNBQXpCO0FBQ0EsZUFBS0MsV0FBTDtBQUNBLGVBQUtDLFNBQUw7QUFDRCxTQUpELE1BSU87QUFDTCxlQUFLbEIsU0FBTCxDQUFlYSxXQUFmLEVBQTRCWixTQUE1QjtBQUNEO0FBQ0YsT0FSRCxDQVFFLE9BQU9rQixDQUFQLEVBQVU7QUFDVlIsZ0JBQVFTLEtBQVIsQ0FBY0QsQ0FBZCxFQURVLENBQ1E7QUFDbkI7QUFDRixLQWhHd0Q7O0FBa0d6REUsZ0JBQVksU0FBU0EsVUFBVCxDQUFvQkMsR0FBcEIsRUFBeUJDLE1BQXpCLEVBQWlDO0FBQzNDLGFBQU8sa0JBQVFGLFVBQVIsQ0FBbUJDLEdBQW5CLEVBQXdCQyxNQUF4QixDQUFQO0FBQ0QsS0FwR3dEO0FBcUd6REMsbUJBQWUsU0FBU0EsYUFBVCxDQUF1QkMsTUFBdkIsRUFBK0I7QUFDNUMsYUFBT0EsT0FBT0MsV0FBUCxJQUFzQkQsT0FBT0UsSUFBN0IsSUFBcUMsU0FBNUM7QUFDRCxLQXZHd0Q7QUF3R3pEQyxxQkFBaUIsU0FBU0EsZUFBVCxHQUEyQjtBQUMxQyxhQUFPLEtBQUt6QyxhQUFaO0FBQ0QsS0ExR3dEO0FBMkd6RDBDLHFCQUFpQixTQUFTQSxlQUFULENBQXlCQyxLQUF6QixFQUFnQztBQUMvQyxVQUFJQSxLQUFKLEVBQVc7QUFDVCxhQUFLdkQsZUFBTCxHQUF1QixJQUF2QjtBQUNBLGFBQUthLGlCQUFMLEdBQXlCLEtBQXpCO0FBQ0EsYUFBS0QsYUFBTCxHQUFxQjJDLEtBQXJCO0FBQ0EsYUFBSzVDLGNBQUwsR0FBc0I0QyxNQUFNSCxJQUE1QjtBQUNBLCtCQUFhSSx5QkFBYixDQUF1QyxLQUFLaEQsVUFBNUMsRUFBd0QrQyxNQUFNRSxJQUE5RDtBQUNEO0FBQ0YsS0FuSHdEO0FBb0h6REMscUJBQWlCLFNBQVNBLGVBQVQsR0FBMkI7QUFDMUMsVUFBSUMsZUFBZSxJQUFuQjtBQUNBLFVBQUlDLG1CQUFtQixJQUF2Qjs7QUFFQUQscUJBQWUsdUJBQWFELGVBQWIsQ0FBNkIsS0FBS2xELFVBQWxDLENBQWY7O0FBRUEsVUFBSW1ELFlBQUosRUFBa0I7QUFDaEIsZUFBT0EsWUFBUDtBQUNEOztBQUVEQyx5QkFBbUIsdUJBQWFDLHlCQUFiLENBQXVDLEtBQUtyRCxVQUE1QyxDQUFuQjtBQUNBLFVBQUlvRCxnQkFBSixFQUFzQjtBQUNwQixhQUFLRSxhQUFMLENBQW1CRixnQkFBbkI7QUFDRCxPQUZELE1BRU87QUFDTDtBQUNBLGFBQUtHLEdBQUwsQ0FBUyxhQUFULEVBQXdCLEtBQUs5RCxzQkFBTCxDQUE0QitELEtBQTVCLENBQWtDLElBQWxDLENBQXhCO0FBQ0EsYUFBS2hFLGVBQUwsR0FBdUIsS0FBdkI7QUFDRDs7QUFFRCxhQUFPLElBQVA7QUFDRCxLQXhJd0Q7QUF5SXpEaUUsNkJBQXlCLFNBQVNBLHVCQUFULEdBQW1DO0FBQUE7O0FBQzFELFdBQUtDLDJCQUFMLEdBQW1DQyxJQUFuQyxDQUF3QyxVQUFDQyxNQUFELEVBQVk7QUFDbEQsY0FBS3BELHlCQUFMLEdBQWlDLElBQWpDO0FBQ0EsY0FBS0Msb0JBQUwsR0FBNkJtRCxVQUFXQSxPQUFPQyxNQUFQLEdBQWdCLENBQTVCLEdBQWtDRCxPQUFPLENBQVAsRUFBVS9DLE1BQTVDLEdBQXFELElBQWpGO0FBQ0EsY0FBS3NCLFNBQUw7QUFDRCxPQUpEO0FBS0QsS0EvSXdEO0FBZ0p6REEsZUFBVyxTQUFTQSxTQUFULEdBQXFCO0FBQzlCLFVBQUksS0FBS3hCLG9CQUFMLElBQTZCLENBQUMsS0FBS0gseUJBQW5DLElBQWdFLENBQUMsS0FBS0Msb0JBQTFFLEVBQWdHO0FBQzlGLGFBQUtnRCx1QkFBTDtBQUNBO0FBQ0Q7QUFDRCxVQUFJVixRQUFRLEtBQUtGLGVBQUwsRUFBWjs7QUFFQSxVQUFJLENBQUNFLEtBQUwsRUFBWTtBQUNWQSxnQkFBUSxLQUFLRyxlQUFMLEVBQVI7QUFDQSxhQUFLSixlQUFMLENBQXFCQyxLQUFyQjtBQUNEOztBQUVELFVBQUlBLEtBQUosRUFBVztBQUNULGFBQUtlLGFBQUwsQ0FBbUJmLEtBQW5CO0FBQ0Q7QUFDRixLQS9Kd0Q7QUFnS3pEZ0IsV0FBTyxTQUFTQSxLQUFULEdBQWlCO0FBQ3RCLFdBQUs5QyxTQUFMLENBQWU4QyxLQUFmLEVBQXNCN0MsU0FBdEI7QUFDQSxXQUFLOEMsd0JBQUw7QUFDRCxLQW5Ld0Q7QUFvS3pERixtQkFBZSxTQUFTQSxhQUFULENBQXVCZixLQUF2QixFQUE4QjtBQUMzQyxVQUFJLENBQUNBLEtBQUwsRUFBWTtBQUNWLGNBQU0sSUFBSWtCLEtBQUosQ0FBVSxrQkFBVixDQUFOO0FBQ0Q7QUFDRCxXQUFLQyxnQkFBTCxHQUF3QixFQUF4QjtBQUNBLFdBQUtDLGVBQUw7QUFDQSxXQUFLSCx3QkFBTDs7QUFFQTtBQUNBLFVBQU1JLFFBQVEsS0FBS0MsYUFBTCxDQUFtQnRCLEtBQW5CLENBQWQ7QUFDQWhDLFVBQUl1RCxlQUFKLENBQW9CRixLQUFwQjtBQUNBLFdBQUtiLEdBQUwsQ0FBUyxPQUFULEVBQWtCYSxLQUFsQjs7QUFFQSxVQUFJLEtBQUsvRCxpQkFBVCxFQUE0QjtBQUMxQjtBQUNEOztBQUVELFdBQUtRLE1BQUwsR0FBYyx1QkFBYTBELFNBQWIsQ0FBdUJ4QixLQUF2QixDQUFkO0FBQ0EsV0FBS3lCLGFBQUwsR0FBcUIsdUJBQWFDLGNBQWIsQ0FBNEIsS0FBSzVELE1BQWpDLENBQXJCO0FBQ0EsV0FBSzZELFlBQUwsR0FBb0IsS0FBS0MsZUFBTCxFQUFwQjs7QUFFQTtBQUNBLFdBQUtDLE9BQUwsR0FBZSx1QkFBYUMsa0JBQWIsQ0FBZ0M7QUFDN0NDLGlCQUFTL0IsTUFBTUgsSUFEOEI7QUFFN0NtQyxvQkFBWSxLQUFLQyxhQUFMO0FBRmlDLE9BQWhDLENBQWY7O0FBS0E7QUFDQSxXQUFLUixhQUFMLENBQW1CUyxJQUFuQixDQUEyQmxDLE1BQU1tQyxNQUFqQztBQUNBLFdBQUtDLFdBQUwsR0FBbUIsS0FBS1gsYUFBeEI7QUFDQSxXQUFLWSxZQUFMLEdBQW9CLEVBQXBCO0FBQ0EsV0FBS0MsVUFBTCxHQUFxQnRDLE1BQU1tQyxNQUFOLENBQWFJLFdBQWIsRUFBckI7QUFDQSxXQUFLL0QsYUFBTCxHQUFxQndCLE1BQU1tQyxNQUFOLENBQWFJLFdBQWIsRUFBckI7QUFDQSxXQUFLQyxLQUFMLEdBQWEsSUFBYjtBQUNBLFdBQUt4QixLQUFMLENBQVcsSUFBWDtBQUNBLFdBQUt5QixlQUFMLEdBQXVCLElBQXZCO0FBQ0EsV0FBS25GLGlCQUFMLEdBQXlCLElBQXpCO0FBQ0EsV0FBS3lCLFdBQUw7QUFDRCxLQTFNd0Q7QUEyTXpENEIsaUNBQTZCLFNBQVNBLDJCQUFULEdBQXVDO0FBQ2xFLFVBQU0rQixNQUFNLHdCQUFaO0FBQ0EsVUFBTUMsWUFBWSxLQUFLbkYsdUJBQXZCO0FBQ0EsVUFBTWdGLFFBQVEsb0JBQWU7QUFDM0JJLGlCQUFTNUUsSUFBSTZFLFFBQUosQ0FBYUMsR0FESztBQUUzQkMsc0JBQWMsUUFGYTtBQUczQkMsc0JBQWMsUUFIYTtBQUkzQkMseUNBQThCLEtBQUtoRyxVQUFMLENBQWdCc0YsV0FBaEIsRUFBOUIsa0NBQXNGSSxVQUFVSixXQUFWLEVBQXRGLFNBSjJCO0FBSzNCVyxpQkFBUyxDQUFDLFFBQUQsRUFBVyxjQUFYLENBTGtCO0FBTTNCWixvQkFBWSxNQU5lO0FBTzNCYSx5QkFBaUIsS0FQVTtBQVEzQkMsZUFBTztBQVJvQixPQUFmLENBQWQ7O0FBV0EsVUFBSVosS0FBSixFQUFXO0FBQ1QsWUFBTWEsZUFBZWIsTUFBTWMsS0FBTixFQUFyQjtBQUNBLDRCQUFLRCxZQUFMLEVBQW1CLFVBQUNFLFdBQUQsRUFBaUI7QUFDbENiLGNBQUljLE9BQUosQ0FBWUQsV0FBWjtBQUNELFNBRkQsRUFFRyxZQUFNO0FBQ1BiLGNBQUljLE9BQUosQ0FBWSxJQUFaO0FBQ0QsU0FKRDtBQUtEO0FBQ0QsYUFBT2QsSUFBSWUsT0FBWDtBQUNELEtBbE93RDtBQW1PekRsRCxtQkFBZSxTQUFTQSxhQUFULENBQXVCb0MsU0FBdkIsRUFBa0NaLE9BQWxDLEVBQTJDMkIsU0FBM0MsRUFBc0Q7QUFDbkUsVUFBSWxCLGNBQUo7QUFDQSxVQUFJLE9BQU9HLFNBQVAsS0FBcUIsUUFBckIsSUFBaUNBLGNBQWMsRUFBbkQsRUFBdUQ7QUFDckRILGdCQUFRLG9CQUFlO0FBQ3JCSSxtQkFBUzVFLElBQUk2RSxRQUFKLENBQWFDLEdBREQ7QUFFckJDLHdCQUFjLFFBRk87QUFHckJDLHdCQUFjLFFBSE87QUFJckJDLDJDQUE4QixLQUFLaEcsVUFBTCxDQUFnQnNGLFdBQWhCLEVBQTlCLGtDQUFzRkksVUFBVUosV0FBVixFQUF0Riw2QkFBbUlSLE9BQW5JLFFBSnFCO0FBS3JCbUIsbUJBQVMsQ0FBQyxRQUFELEVBQVcsY0FBWCxDQUxZO0FBTXJCWixzQkFBWSxNQU5TO0FBT3JCYSwyQkFBaUIsS0FQSTtBQVFyQkMsaUJBQU87QUFSYyxTQUFmLENBQVI7QUFVRDs7QUFFRCxVQUFJWixLQUFKLEVBQVc7QUFDVCxZQUFNYSxlQUFlYixNQUFNYyxLQUFOLEVBQXJCOztBQUVBLFNBQUMsU0FBU0ssU0FBVCxDQUFtQkMsT0FBbkIsRUFBNEJDLFdBQTVCLEVBQXlDO0FBQ3hDLGNBQUk7QUFDRixnQ0FBS0EsV0FBTCxFQUFrQixTQUFTQyxhQUFULENBQXVCQyxTQUF2QixFQUFrQztBQUNsRCxrQkFBSSxPQUFPTCxTQUFQLEtBQXFCLFVBQXpCLEVBQXFDO0FBQ25DQSwwQkFBVWpELEtBQVYsQ0FBZ0IsSUFBaEIsRUFBc0J0QyxTQUF0QjtBQUNELGVBRkQsTUFFTztBQUNMLHFCQUFLNkYsc0JBQUwsQ0FBNEJELFNBQTVCO0FBQ0Q7QUFDRixhQU5pQixDQU1oQkUsSUFOZ0IsQ0FNWEwsT0FOVyxDQUFsQjtBQU9ELFdBUkQsQ0FRRSxPQUFPdEUsS0FBUCxFQUFjO0FBQ2RULG9CQUFRcUYsR0FBUixDQUFZLCtCQUErQjVFLEtBQTNDLEVBRGMsQ0FDcUM7QUFDcEQ7QUFDRixTQVpELEVBWUcsSUFaSCxFQVlTK0QsWUFaVDtBQWFEO0FBQ0YsS0FuUXdEO0FBb1F6RDlCLHFCQUFpQixTQUFTQSxlQUFULEdBQTJCO0FBQzFDLFVBQU12QixRQUFRLEtBQUszQyxhQUFuQjs7QUFFQSxVQUFJMkMsS0FBSixFQUFXO0FBQ1QsWUFBTXFCLFFBQVEsS0FBS0MsYUFBTCxDQUFtQnRCLEtBQW5CLENBQWQ7QUFDQSxhQUFLUSxHQUFMLENBQVMsT0FBVCxFQUFrQmEsS0FBbEI7QUFDRDs7QUFFRCxXQUFLbkQsU0FBTCxDQUFlcUQsZUFBZixFQUFnQ3BELFNBQWhDO0FBQ0QsS0E3UXdEO0FBOFF6RDZGLDRCQUF3QixTQUFTQSxzQkFBVCxDQUFnQ25ELE1BQWhDLEVBQXdDO0FBQzlELFVBQUlBLE9BQU9DLE1BQVAsR0FBZ0IsQ0FBcEIsRUFBdUI7QUFDckIsWUFBTWQsUUFBUWEsT0FBTyxDQUFQLENBQWQ7QUFDQSxhQUFLZCxlQUFMLENBQXFCQyxLQUFyQjtBQUNBLCtCQUFhbUUscUJBQWIsQ0FBbUMsQ0FBQ25FLEtBQUQsQ0FBbkMsRUFBNEMsS0FBSy9DLFVBQWpEO0FBQ0EsYUFBSzhELGFBQUwsQ0FBbUJmLEtBQW5CO0FBQ0QsT0FMRCxNQUtPO0FBQ0wsWUFBTXFCLFFBQVEsS0FBS0MsYUFBTCxFQUFkO0FBQ0F0RCxZQUFJdUQsZUFBSixDQUFvQkYsS0FBcEI7QUFDQSxhQUFLYixHQUFMLENBQVMsT0FBVCxFQUFrQmEsS0FBbEI7QUFDQSxhQUFLckUsYUFBTDtBQUNEOztBQUVEO0FBQ0EsV0FBS29ILGdCQUFMO0FBQ0EsV0FBS0MsZUFBTDs7QUFFQXJGLFFBQUUsS0FBS0MsT0FBUCxFQUFnQnFGLFdBQWhCLENBQTRCLGNBQTVCO0FBQ0EsV0FBS0MsV0FBTCxHQUFtQixLQUFuQjtBQUNELEtBalN3RDtBQWtTekRDLDBCQUFzQixTQUFTQSxvQkFBVCxHQUFnQyxDQUVyRCxDQXBTd0Q7QUFxU3pEbEQsbUJBQWUsU0FBU0EsYUFBVCxDQUF1QnRCLEtBQXZCLEVBQThCO0FBQzNDLGFBQU9BLE1BQU15RSxXQUFiO0FBQ0QsS0F2U3dEO0FBd1N6RDdDLHFCQUFpQixTQUFTQSxlQUFULEdBQTJCO0FBQzFDLFVBQU05RCxTQUFVLEtBQUtGLG9CQUFMLElBQTZCLEtBQUtGLG9CQUFuQyxHQUEyRCxLQUFLQSxvQkFBaEUsR0FBdUYsS0FBS0ksTUFBM0c7QUFDQSxVQUFJLEtBQUtILHdCQUFULEVBQW1DO0FBQ2pDLFlBQU0rRyxpQkFBaUIsS0FBS0MsOEJBQUwsRUFBdkI7QUFDQSxZQUFJRCxjQUFKLEVBQW9CO0FBQ2xCLGNBQUlBLGVBQWVFLElBQWYsS0FBd0IsU0FBNUIsRUFBdUM7QUFDckMsbUJBQU8sS0FBS0MsNEJBQUwsQ0FBa0MvRyxNQUFsQyxFQUEwQzRHLGVBQWVJLE9BQXpELENBQVA7QUFDRDtBQUNELGNBQUlKLGVBQWVLLFFBQW5CLEVBQTZCO0FBQzNCLG1CQUFPLElBQUlwSSxRQUFKLENBQWErSCxlQUFlSyxRQUE1QixDQUFQO0FBQ0Q7QUFDRjtBQUNELGVBQU8sS0FBS0MsOEJBQVo7QUFDRDtBQUNELFVBQU1ELFdBQVdqSCxPQUFPbUgsR0FBUCxDQUFXLEtBQUtDLHFCQUFoQixDQUFqQjtBQUNBLGFBQU8sSUFBSXZJLFFBQUosQ0FBYW9JLFFBQWIsQ0FBUDtBQUNELEtBeFR3RDtBQXlUekRHLDJCQUF1QixTQUFTQSxxQkFBVCxDQUErQkMsSUFBL0IsRUFBcUM7QUFDMUQsVUFBTUMsYUFBYSxlQUFLQyxTQUFMLENBQWVGLElBQWYsQ0FBbkI7QUFDQSxVQUFNSixXQUFXLENBQUMsa0RBQUQsRUFBcURJLEtBQUtHLE9BQTFELDhGQUE2SkYsVUFBN0osV0FBNktBLFVBQTdLLGlDQUFtTkEsVUFBbk4sbUJBQTZPLE1BQTdPLEVBQXFQRyxJQUFyUCxDQUEwUCxFQUExUCxDQUFqQjs7QUFFQSxhQUFPUixRQUFQO0FBQ0QsS0E5VHdEO0FBK1R6REMsb0NBQWdDLElBQUlySSxRQUFKLENBQWEsQ0FDM0MsMkVBRDJDLEVBRTNDLG9MQUYyQyxFQUczQyxvTEFIMkMsQ0FBYixDQS9UeUI7QUFvVXpENkksZ0NBQTRCLFNBQVNBLDBCQUFULEdBQXNDO0FBQ2hFLFdBQUtDLG9CQUFMLEdBQTRCLENBQUM7QUFDM0J2RixjQUFNLFNBRHFCO0FBRTNCdUUscUJBQWF2SSxTQUFTSSx3QkFGSztBQUczQnNJLGNBQU0sU0FIcUI7QUFJM0JFLGlCQUFTO0FBQ1BZLG1CQUFTLENBQUM7QUFDUkMsZ0JBQUksTUFESTtBQUVSQyxrQkFBTTtBQUZFLFdBQUQ7QUFERjtBQUprQixPQUFELEVBVXpCO0FBQ0QxRixjQUFNLFFBREw7QUFFRHVFLHFCQUFhdkksU0FBU0ssdUJBRnJCO0FBR0RxSSxjQUFNLFNBSEw7QUFJREUsaUJBQVM7QUFDUFksbUJBQVMsQ0FBQztBQUNSQyxnQkFBSSxNQURJO0FBRVJDLGtCQUFNO0FBRkUsV0FBRCxFQUdOO0FBQ0RELGdCQUFJLE1BREg7QUFFREMsa0JBQU07QUFGTCxXQUhNLEVBTU47QUFDREQsZ0JBQUksTUFESDtBQUVEQyxrQkFBTTtBQUZMLFdBTk07QUFERjtBQUpSLE9BVnlCLENBQTVCOztBQTRCQSxhQUFPLEtBQUtILG9CQUFaO0FBQ0QsS0FsV3dEO0FBbVd6RGQsb0NBQWdDLFNBQVNBLDhCQUFULEdBQTBDO0FBQ3hFLFVBQUl6RSxPQUFPLHVCQUFheUUsOEJBQWIsQ0FBNEMsS0FBSzFILFVBQWpELENBQVg7QUFDQWlELGFBQVFBLElBQUQsR0FBU0EsSUFBVCxHQUFnQixFQUF2QjtBQUNBLFVBQUl3RSxpQkFBaUIsSUFBckI7QUFDQSxXQUFLZSxvQkFBTCxDQUEwQkksT0FBMUIsQ0FBa0MsVUFBQ1YsSUFBRCxFQUFVO0FBQzFDLFlBQUlBLEtBQUtqRixJQUFMLEtBQWNBLElBQWxCLEVBQXdCO0FBQ3RCd0UsMkJBQWlCUyxJQUFqQjtBQUNEO0FBQ0YsT0FKRDtBQUtBLFVBQUksQ0FBQ1QsY0FBTCxFQUFxQjtBQUNuQkEseUJBQWlCLEtBQUtlLG9CQUFMLENBQTBCLENBQTFCLENBQWpCO0FBQ0Q7QUFDRCxhQUFPZixjQUFQO0FBQ0QsS0FoWHdEO0FBaVh6RHJHLDBCQUFzQixTQUFTQSxvQkFBVCxHQUFnQztBQUNwRCxXQUFLb0gsb0JBQUwsR0FBNEIsS0FBS0ssdUJBQUwsQ0FBNkIsS0FBS04sMEJBQUwsRUFBN0IsRUFBZ0UsaUJBQWhFLENBQTVCO0FBQ0QsS0FuWHdEO0FBb1h6RFgsa0NBQThCLFNBQVNBLDRCQUFULENBQXNDL0csTUFBdEMsRUFBOENnSCxPQUE5QyxFQUF1RDtBQUNuRixVQUFNaUIsZ0JBQWdCLEtBQUtDLHlCQUFMLENBQStCbEIsT0FBL0IsQ0FBdEI7QUFDQSxVQUFJYyxPQUFPLENBQVg7QUFDQSxVQUFJRixVQUFVLENBQWQ7QUFDQSxVQUFJTyxTQUFTLENBQWI7QUFDQSxVQUFJQyxNQUFNLENBQVY7QUFDQVIsZ0JBQVVLLGNBQWNMLE9BQWQsQ0FBc0I1RSxNQUFoQztBQUNBaUYsb0JBQWNMLE9BQWQsQ0FBc0JHLE9BQXRCLENBQThCLFVBQUNWLElBQUQsRUFBVTtBQUN0Q1MsZUFBT0EsT0FBT1QsS0FBS1MsSUFBbkI7QUFDRCxPQUZEOztBQUlBLFVBQU1iLFdBQVcsRUFBakI7QUFDQUEsZUFBUzdDLElBQVQsQ0FBYywwQkFBZDtBQUNBNkMsZUFBUzdDLElBQVQsQ0FBYyxLQUFkO0FBQ0E2QyxlQUFTN0MsSUFBVCx5Q0FBb0RwRSxPQUFPLENBQVAsRUFBVXFJLFlBQTlEO0FBQ0FwQixlQUFTN0MsSUFBVCxDQUFjLE9BQWQ7QUFDQSxXQUFLLElBQUlrRSxJQUFJLENBQWIsRUFBZ0JBLElBQUl0SSxPQUFPZ0QsTUFBM0IsRUFBbUNzRixHQUFuQyxFQUF3QztBQUN0QyxZQUFNQyxhQUFhTixjQUFjTCxPQUFkLENBQXNCTyxTQUFTLENBQS9CLENBQW5CO0FBQ0EsWUFBS0ksVUFBRCxJQUFpQkosVUFBVVAsT0FBM0IsSUFBd0NVLE1BQU0sQ0FBbEQsRUFBc0Q7QUFDcEQsY0FBSUYsUUFBUSxDQUFaLEVBQWU7QUFDYixnQkFBTUksY0FBY0QsV0FBV0UsSUFBWCxJQUFtQixFQUF2QztBQUNBeEIscUJBQVM3QyxJQUFULDBDQUFxRG9FLFdBQXJEO0FBQ0Q7QUFDRCxjQUFNbkIsT0FBT3JILE9BQU9zSSxDQUFQLENBQWI7QUFDQSxjQUFJakIsUUFBU2tCLFdBQVdULElBQVgsR0FBa0IsQ0FBL0IsRUFBbUM7QUFDakMsZ0JBQUlRLE1BQU0sQ0FBVixFQUFhO0FBQ1hyQix1QkFBUzdDLElBQVQsQ0FBYyxPQUFkO0FBQ0Esa0JBQUksQ0FBQ21FLFdBQVdHLFVBQWhCLEVBQTRCO0FBQzFCekIseUJBQVM3QyxJQUFULGdDQUEyQyxLQUFLdUUsd0JBQUwsQ0FBOEJ0QixLQUFLZ0IsWUFBbkMsQ0FBM0M7QUFDRDs7QUFFRCxrQkFBTU8sZ0JBQWdCLEtBQUtDLDBCQUFMLENBQWdDeEIsSUFBaEMsQ0FBdEI7QUFDQSxrQkFBTXlCLGFBQWFGLGNBQWNILElBQWQsSUFBc0IsRUFBekM7QUFDQSxrQkFBTW5CLGFBQWEsZUFBS0MsU0FBTCxDQUFlcUIsYUFBZixDQUFuQjtBQUNBLGtCQUFJdkIsS0FBSzBCLE1BQUwsS0FBZ0IsT0FBcEIsRUFBNkI7QUFDM0I5Qix5QkFBUzdDLElBQVQsaUpBQTRKaUQsS0FBS2dCLFlBQWpLLDZDQUFxTmhCLEtBQUtnQixZQUExTixnQkFBaVBmLFVBQWpQO0FBQ0QsZUFGRCxNQUVPLElBQUlELEtBQUtnQixZQUFMLEtBQXNCLE9BQTFCLEVBQW1DO0FBQ3hDcEIseUJBQVM3QyxJQUFULGlKQUE0SmlELEtBQUtnQixZQUFqSyw2Q0FBcU5oQixLQUFLZ0IsWUFBMU4sZ0JBQWlQZixVQUFqUDtBQUNELGVBRk0sTUFFQTtBQUNMTCx5QkFBUzdDLElBQVQsK0JBQTBDMEUsVUFBMUMsNkNBQTRGekIsS0FBS2dCLFlBQWpHLGdCQUF3SGYsVUFBeEg7QUFDRDtBQUNETCx1QkFBUzdDLElBQVQsQ0FBYyxRQUFkO0FBQ0Q7QUFDRjtBQUNEZ0U7QUFDQSxjQUFJQSxRQUFRRyxXQUFXVCxJQUFYLEdBQWtCLENBQTlCLEVBQWlDO0FBQy9CTSxrQkFBTSxDQUFOO0FBQ0FEO0FBQ0FsQixxQkFBUzdDLElBQVQsQ0FBYyxRQUFkO0FBQ0Q7QUFDRjtBQUNGO0FBQ0QsVUFBSWdFLFFBQVEsQ0FBWixFQUFlO0FBQ2JuQixpQkFBUzdDLElBQVQsQ0FBYyxRQUFkO0FBQ0Q7QUFDRDZDLGVBQVM3QyxJQUFULENBQWMsUUFBZDtBQUNBLGFBQU8sSUFBSXZGLFFBQUosQ0FBYW9JLFFBQWIsQ0FBUDtBQUNELEtBN2F3RDtBQThhekRpQiwrQkFBMkIsU0FBU0EseUJBQVQsQ0FBbUNsQixPQUFuQyxFQUE0QztBQUNyRSxVQUFNaUIsZ0JBQWdCO0FBQ3BCTCxpQkFBUyxDQUFDO0FBQ1JFLGdCQUFNO0FBREUsU0FBRDtBQURXLE9BQXRCO0FBS0EscUJBQUtrQixLQUFMLENBQVdmLGFBQVgsRUFBMEJqQixPQUExQjtBQUNBLGFBQU9pQixhQUFQO0FBQ0QsS0F0YndEO0FBdWJ6RGdCLHFCQUFpQixTQUFTQSxlQUFULENBQXlCQyxVQUF6QixFQUFxQztBQUNwRCxhQUFPQSxXQUFXLEtBQUsxRSxVQUFoQixDQUFQO0FBQ0QsS0F6YndEO0FBMGJ6RHFFLGdDQUE0QixTQUFTQSwwQkFBVCxDQUFvQ00sVUFBcEMsRUFBZ0Q7QUFDMUUsVUFBTUMsWUFBWSxLQUFLQyxvQkFBTCxDQUEwQkYsVUFBMUIsQ0FBbEI7QUFDQSxVQUFNbkMsVUFBVTtBQUNkc0Msc0JBQWVGLGFBQWFBLFVBQVVFLFlBQXhCLEdBQXdDRixVQUFVRSxZQUFsRCxHQUFpRTtBQURqRSxPQUFoQjs7QUFJQSxVQUFLRixhQUFhQSxVQUFVcEMsT0FBNUIsRUFBc0M7QUFDcEMsdUJBQUtnQyxLQUFMLENBQVdoQyxPQUFYLEVBQW9Cb0MsVUFBVXBDLE9BQTlCO0FBQ0Q7QUFDRCxhQUFPQSxPQUFQO0FBQ0QsS0FwY3dEO0FBcWN6RDJCLDhCQUEwQixTQUFTQSx3QkFBVCxDQUFrQ3ZHLElBQWxDLEVBQXdDO0FBQ2hFLFVBQU1wQyxTQUFVLEtBQUtGLG9CQUFMLElBQTZCLEtBQUtGLG9CQUFuQyxHQUEyRCxLQUFLQSxvQkFBaEUsR0FBdUYsS0FBS0ksTUFBM0c7QUFDQSxVQUFJbUosYUFBYSxJQUFqQjtBQUNBbkosYUFBTytILE9BQVAsQ0FBZSxVQUFDVixJQUFELEVBQVU7QUFDdkIsWUFBSUEsS0FBS2dCLFlBQUwsS0FBc0JqRyxJQUExQixFQUFnQztBQUM5QitHLHVCQUFhOUIsSUFBYjtBQUNEO0FBQ0YsT0FKRDtBQUtBLFVBQUk4QixVQUFKLEVBQWdCO0FBQ2QsZUFBT0EsV0FBVzNCLE9BQWxCO0FBQ0Q7QUFDRCxhQUFPLEVBQVA7QUFDRCxLQWpkd0Q7QUFrZHpEK0IsOEJBQTBCLFNBQVNBLHdCQUFULENBQWtDOUksS0FBbEMsRUFBeUMyQixJQUF6QyxFQUErQ29ILFdBQS9DLEVBQTREWixhQUE1RCxFQUEyRTtBQUNuRyxVQUFNNUksU0FBVSxLQUFLRixvQkFBTCxJQUE2QixLQUFLRixvQkFBbkMsR0FBMkQsS0FBS0Esb0JBQWhFLEdBQXVGLEtBQUtJLE1BQTNHO0FBQ0EsVUFBSW1KLGFBQWEsSUFBakI7QUFDQW5KLGFBQU8rSCxPQUFQLENBQWUsVUFBQ1YsSUFBRCxFQUFVO0FBQ3ZCLFlBQUlBLEtBQUtnQixZQUFMLEtBQXNCakcsSUFBMUIsRUFBZ0M7QUFDOUIrRyx1QkFBYTlCLElBQWI7QUFDRDtBQUNGLE9BSkQ7QUFLQSxhQUFPLEtBQUtvQyxrQkFBTCxDQUF3QmhKLEtBQXhCLEVBQStCMEksVUFBL0IsRUFBMkNLLFdBQTNDLEVBQXdEWixhQUF4RCxDQUFQO0FBQ0QsS0EzZHdEO0FBNGR6RGMsK0JBQTJCLFNBQVNBLHlCQUFULENBQW1DQyxXQUFuQyxFQUFnRDtBQUN6RSxVQUFNM0osU0FBVSxLQUFLRixvQkFBTCxJQUE2QixLQUFLRixvQkFBbkMsR0FBMkQsS0FBS0Esb0JBQWhFLEdBQXVGLEtBQUtJLE1BQTNHO0FBQ0EsVUFBSUEsT0FBTzJKLFdBQVAsQ0FBSixFQUF5QjtBQUN2QixlQUFPM0osT0FBTzJKLFdBQVAsRUFBb0JuQyxPQUEzQjtBQUNEO0FBQ0QsYUFBTyxFQUFQO0FBQ0QsS0FsZXdEO0FBbWV6RG9DLCtCQUEyQixTQUFTQSx5QkFBVCxDQUFtQ25KLEtBQW5DLEVBQTBDa0osV0FBMUMsRUFBdURILFdBQXZELEVBQW9FWixhQUFwRSxFQUFtRjtBQUM1RyxVQUFNNUksU0FBVSxLQUFLRixvQkFBTCxJQUE2QixLQUFLRixvQkFBbkMsR0FBMkQsS0FBS0Esb0JBQWhFLEdBQXVGLEtBQUtJLE1BQTNHO0FBQ0EsVUFBTW1KLGFBQWFuSixPQUFPMkosV0FBUCxDQUFuQjtBQUNBLGFBQU8sS0FBS0Ysa0JBQUwsQ0FBd0JoSixLQUF4QixFQUErQjBJLFVBQS9CLEVBQTJDSyxXQUEzQyxFQUF3RFosYUFBeEQsQ0FBUDtBQUNELEtBdmV3RDtBQXdlekRhLHdCQUFvQixTQUFTQSxrQkFBVCxDQUE0QmhKLEtBQTVCLEVBQW1DMEksVUFBbkMsRUFBK0NLLFdBQS9DLEVBQTREWixhQUE1RCxFQUEyRTtBQUM3RixVQUFJakksUUFBUSxJQUFaO0FBQ0EsVUFBSXlJLFlBQVksSUFBaEI7O0FBRUEsVUFBS0QsVUFBRCxJQUFpQkssV0FBckIsRUFBbUM7QUFDakMsWUFBTUssWUFBWSxLQUFLQyxvQkFBTCxDQUEwQlgsVUFBMUIsQ0FBbEI7QUFDQSxZQUFJSyxXQUFKLEVBQWlCO0FBQ2ZKLHNCQUFZLEtBQUtDLG9CQUFMLENBQTBCRixVQUExQixDQUFaO0FBQ0Q7QUFDRCxZQUFJQyxTQUFKLEVBQWU7QUFDYnpJLGtCQUFRLEtBQUtvSixtQkFBTCxDQUF5QnRKLE1BQU1vSixTQUFOLENBQXpCLEVBQTJDVixVQUEzQyxFQUF1REMsU0FBdkQsRUFBa0VSLGFBQWxFLENBQVI7QUFDRCxTQUZELE1BRU87QUFDTGpJLGtCQUFRRixNQUFNb0osU0FBTixDQUFSO0FBQ0Q7QUFDRixPQVZELE1BVU8sSUFBSVYsVUFBSixFQUFnQjtBQUNyQixZQUFNVSxhQUFZLEtBQUtDLG9CQUFMLENBQTBCWCxVQUExQixDQUFsQjtBQUNBeEksZ0JBQVFGLE1BQU1vSixVQUFOLENBQVI7QUFDRCxPQUhNLE1BR0E7QUFDTGxKLGdCQUFRLElBQVI7QUFDRDs7QUFFRCxhQUFPQSxLQUFQO0FBQ0QsS0E5ZndEO0FBK2Z6RDBJLDBCQUFzQixTQUFTQSxvQkFBVCxDQUE4QkYsVUFBOUIsRUFBMEM7QUFDOUQsVUFBSSxDQUFDLEtBQUs5RixnQkFBVixFQUE0QjtBQUMxQixhQUFLQSxnQkFBTCxHQUF3QixFQUF4QjtBQUNEO0FBQ0QsVUFBTTJHLE9BQVViLFdBQVdkLFlBQXJCLFNBQXFDYyxXQUFXYyxLQUF0RDtBQUNBLFVBQUliLFlBQVksS0FBSy9GLGdCQUFMLENBQXNCMkcsSUFBdEIsQ0FBaEI7QUFDQSxVQUFJLENBQUNaLFNBQUwsRUFBZ0I7QUFDZEEsb0JBQVksS0FBS2Msc0JBQUwsQ0FBNEJmLFVBQTVCLENBQVo7QUFDQSxhQUFLOUYsZ0JBQUwsQ0FBc0IyRyxJQUF0QixJQUE4QlosU0FBOUI7QUFDRDtBQUNELGFBQU9BLFNBQVA7QUFDRCxLQTFnQndEO0FBMmdCekRjLDRCQUF3QixTQUFTQSxzQkFBVCxDQUFnQ2YsVUFBaEMsRUFBNEM7QUFDbEUsVUFBSUMsa0JBQUo7QUFDQSxVQUFJLEtBQUtlLG1CQUFULEVBQThCO0FBQzVCZixvQkFBWSxLQUFLZSxtQkFBTCxDQUF5QmhCLFdBQVdkLFlBQXBDLENBQVo7QUFDRDtBQUNELFVBQUksQ0FBQ2UsU0FBTCxFQUFnQjtBQUNkQSxvQkFBWSx1QkFBYUMsb0JBQWIsQ0FBa0NGLFVBQWxDLENBQVo7QUFDRDtBQUNELGFBQU9DLFNBQVA7QUFDRCxLQXBoQndEO0FBcWhCekRXLHlCQUFxQixTQUFTQSxtQkFBVCxDQUE2QnBKLEtBQTdCLEVBQW9DWCxNQUFwQyxFQUE0Q29KLFNBQTVDLEVBQXVEUixhQUF2RCxFQUFzRTtBQUN6RixVQUFJO0FBQ0YsZUFBT1EsVUFBVUEsU0FBVixDQUFvQnpJLEtBQXBCLEVBQTJCeUksVUFBVUUsWUFBckMsRUFBbURWLGFBQW5ELENBQVA7QUFDRCxPQUZELENBRUUsT0FBT3JILENBQVAsRUFBVTtBQUNWLGVBQU9aLEtBQVA7QUFDRDtBQUNGLEtBM2hCd0Q7QUE0aEJ6RG1KLDBCQUFzQixTQUFTQSxvQkFBVCxDQUE4QlgsVUFBOUIsRUFBMEM7QUFDOUQsYUFBTyx1QkFBYVcsb0JBQWIsQ0FBa0NYLFVBQWxDLENBQVA7QUFDRCxLQTloQndEO0FBK2hCekQ3RixxQkFBaUIsU0FBU0EsZUFBVCxHQUEyQjtBQUMxQyxVQUFJLEtBQUs3RCxjQUFULEVBQXlCO0FBQ3ZCO0FBQ0Q7O0FBRUQsV0FBS0EsY0FBTCxHQUFzQixFQUF0Qjs7QUFFQSxVQUFNMkssV0FBVyxLQUFLM0ssY0FBdEI7O0FBRUEySyxlQUFTckcsT0FBVCxHQUFtQixLQUFLQSxPQUFMLEdBQWUsS0FBS0EsT0FBTCxDQUFhc0csS0FBYixFQUFmLEdBQXNDLElBQXpEO0FBQ0FELGVBQVM5RixXQUFULEdBQXVCLEtBQUtBLFdBQTVCO0FBQ0E4RixlQUFTN0YsWUFBVCxHQUF3QixLQUFLQSxZQUE3QjtBQUNBNkYsZUFBUzVGLFVBQVQsR0FBc0IsS0FBS0EsVUFBM0I7QUFDQTRGLGVBQVMxSixhQUFULEdBQXlCLEtBQUtBLGFBQTlCO0FBQ0EwSixlQUFTMUYsS0FBVCxHQUFpQixLQUFLQSxLQUF0QjtBQUNBMEYsZUFBU0UsV0FBVCxHQUF1QixLQUFLQSxXQUE1QjtBQUNBRixlQUFTdkcsWUFBVCxHQUF3QixLQUFLQSxZQUE3QjtBQUNBdUcsZUFBU0csa0JBQVQsR0FBOEIsS0FBS0Esa0JBQW5DO0FBQ0FILGVBQVNJLFlBQVQsR0FBd0IsS0FBS0EsWUFBN0I7QUFDQUosZUFBUzdHLEtBQVQsR0FBaUIsS0FBS2tILEdBQUwsQ0FBUyxPQUFULENBQWpCO0FBQ0FMLGVBQVNNLE1BQVQsR0FBa0IsS0FBS0EsTUFBdkI7O0FBRUEsV0FBS0EsTUFBTCxHQUFjLElBQWQ7QUFDQSxXQUFLSCxrQkFBTCxHQUEwQixJQUFJMUwsUUFBSixDQUFhLENBQUMsYUFBRCxDQUFiLENBQTFCOztBQUVBLFdBQUtRLFVBQUwsR0FBa0IsSUFBbEI7QUFDRCxLQXpqQndEO0FBMGpCekRzTCxxQkFBaUIsU0FBU0EsZUFBVCxHQUEyQjtBQUMxQyxVQUFNUCxXQUFXLEtBQUszSyxjQUF0Qjs7QUFFQSxXQUFLSixVQUFMLEdBQWtCLEtBQWxCOztBQUVBLFVBQUksQ0FBQytLLFFBQUwsRUFBZTtBQUNiO0FBQ0Q7O0FBRUQsV0FBS3JHLE9BQUwsR0FBZXFHLFNBQVNyRyxPQUFULElBQW9CLElBQW5DO0FBQ0EsV0FBS08sV0FBTCxHQUFtQjhGLFNBQVM5RixXQUE1QjtBQUNBLFdBQUtDLFlBQUwsR0FBb0I2RixTQUFTN0YsWUFBN0I7QUFDQSxXQUFLQyxVQUFMLEdBQWtCNEYsU0FBUzVGLFVBQTNCO0FBQ0EsV0FBSzlELGFBQUwsR0FBcUIwSixTQUFTMUosYUFBOUI7QUFDQSxXQUFLZ0MsR0FBTCxDQUFTLE9BQVQsRUFBa0IwSCxTQUFTMUYsS0FBM0I7QUFDQSxXQUFLNEYsV0FBTCxHQUFtQkYsU0FBU0UsV0FBNUI7QUFDQSxXQUFLekcsWUFBTCxHQUFvQnVHLFNBQVN2RyxZQUE3QjtBQUNBLFdBQUsyRyxZQUFMLEdBQW9CSixTQUFTSSxZQUE3QjtBQUNBLFdBQUtELGtCQUFMLEdBQTBCSCxTQUFTRyxrQkFBbkM7QUFDQSxXQUFLRyxNQUFMLEdBQWNOLFNBQVNNLE1BQXZCOztBQUVBLFdBQUtqTCxjQUFMLEdBQXNCLElBQXRCOztBQUVBLFdBQUtELGlCQUFMLEdBQXlCLEtBQXpCO0FBQ0EsV0FBS0QsYUFBTCxHQUFxQixJQUFyQjtBQUNBLFdBQUtELGNBQUwsR0FBc0IsSUFBdEI7QUFDQVksVUFBSXVELGVBQUosQ0FBb0IyRyxTQUFTN0csS0FBN0I7QUFDQSxXQUFLYixHQUFMLENBQVMsT0FBVCxFQUFrQjBILFNBQVM3RyxLQUEzQjs7QUFFQSxXQUFLTCxLQUFMO0FBQ0EsV0FBS3lCLGVBQUwsR0FBdUIsSUFBdkI7QUFDRCxLQXpsQndEO0FBMGxCekRpRyxtQkFBZSxTQUFTQSxhQUFULENBQXVCQyxZQUF2QixFQUFxQ3JKLEtBQXJDLEVBQTRDO0FBQ3pELFVBQUksS0FBS3BDLGFBQUwsSUFBc0IsS0FBS0MsVUFBL0IsRUFBMkM7QUFDekMsWUFBSW1DLE1BQU1zSixNQUFOLEtBQWlCLEdBQXJCLEVBQTBCO0FBQ3hCLGNBQUk7QUFDRixpQkFBS0MsZ0JBQUw7QUFDQTtBQUNELFdBSEQsQ0FHRSxPQUFPeEosQ0FBUCxFQUFVO0FBQ1ZSLG9CQUFRUyxLQUFSLENBQWNELENBQWQsRUFEVSxDQUNRO0FBQ25CO0FBQ0Y7QUFDRjtBQUNELFdBQUtuQixTQUFMLENBQWV3SyxhQUFmLEVBQThCdkssU0FBOUI7QUFDRCxLQXRtQndEO0FBdW1CekQwSyxzQkFBa0IsU0FBU0EsZ0JBQVQsR0FBNEI7QUFDNUMsNkJBQWFDLHNCQUFiLENBQW9DLEtBQUsxTCxjQUF6QyxFQUF5RCxLQUFLSCxVQUE5RDtBQUNBLFdBQUs4TCxrQkFBTDtBQUNBL0osUUFBRSxLQUFLQyxPQUFQLEVBQWdCcUYsV0FBaEIsQ0FBNEIsY0FBNUI7QUFDQSxXQUFLOUQsR0FBTCxDQUFTLGFBQVQsRUFBd0IsS0FBSzVELDJCQUFMLENBQWlDNkQsS0FBakMsQ0FBdUMsSUFBdkMsQ0FBeEI7QUFDRCxLQTVtQndEO0FBNm1CekR1SSxtQkFBZSxTQUFTQSxhQUFULENBQXVCQyxNQUF2QixFQUErQjtBQUM1QyxVQUFJLEtBQUsvTCxhQUFMLElBQXNCLEtBQUtDLFVBQTNCLElBQXlDLENBQUM4TCxPQUFPQyxRQUFyRCxFQUErRDtBQUM3RCxhQUFLQyxtQkFBTCxDQUF5QkYsTUFBekI7QUFDRCxPQUZELE1BRU87QUFDTCxhQUFLL0ssU0FBTCxDQUFlOEssYUFBZixFQUE4QjdLLFNBQTlCO0FBQ0Q7QUFDRixLQW5uQndEO0FBb25CekRnTCx5QkFBcUIsU0FBU0EsbUJBQVQsQ0FBNkJGLE1BQTdCLEVBQXFDO0FBQ3hELFVBQU1HLE9BQU8sSUFBYjs7QUFFQSxVQUFJSCxPQUFPSSxHQUFYLEVBQWdCO0FBQ2QsWUFBTUMsZ0JBQWdCLEtBQUtDLGlCQUFMLENBQXVCTixPQUFPSSxHQUE5QixDQUF0QjtBQUNBLFlBQUksQ0FBQ0MsYUFBTCxFQUFvQjtBQUNsQixlQUFLRSxtQkFBTCxDQUF5QlAsT0FBT0ksR0FBaEMsRUFBcUN6SSxJQUFyQyxDQUEwQyxVQUFDNkksV0FBRCxFQUFpQjtBQUN6RFIsbUJBQU9TLFVBQVAsR0FBb0JELFlBQVk3SixXQUFoQztBQUNBcUosbUJBQU9DLFFBQVAsR0FBa0IsSUFBbEI7QUFDQUUsaUJBQUtKLGFBQUwsQ0FBbUJDLE1BQW5CO0FBQ0QsV0FKRDtBQUtELFNBTkQsTUFNTztBQUNMQSxpQkFBT1MsVUFBUCxHQUFvQkosY0FBYzFKLFdBQWxDO0FBQ0FxSixpQkFBT0MsUUFBUCxHQUFrQixJQUFsQjtBQUNBLGVBQUtGLGFBQUwsQ0FBbUJDLE1BQW5CO0FBQ0Q7QUFDRjtBQUNGLEtBcm9Cd0Q7QUFzb0J6RFUsbUJBQWUsU0FBU0EsYUFBVCxDQUF1QkMsU0FBdkIsRUFBa0Q7QUFBQSxVQUFoQkMsU0FBZ0IsdUVBQUosRUFBSTs7QUFDL0QsVUFBSSxLQUFLM00sYUFBTCxJQUFzQixLQUFLQyxVQUEzQixJQUF5QyxDQUFDME0sVUFBVVgsUUFBeEQsRUFBa0U7QUFDaEUsYUFBS1ksa0JBQUwsQ0FBd0JGLFNBQXhCLEVBQW1DQyxTQUFuQztBQUNELE9BRkQsTUFFTztBQUNMLGFBQUszTCxTQUFMLENBQWV5TCxhQUFmLEVBQThCeEwsU0FBOUI7QUFDRDtBQUNGLEtBNW9Cd0Q7QUE2b0J6RDJMLHdCQUFvQixTQUFTQSxrQkFBVCxDQUE0QkYsU0FBNUIsRUFBdUNDLFNBQXZDLEVBQWtEO0FBQ3BFLFVBQU1ULE9BQU8sSUFBYjtBQUNBLFVBQU1FLGdCQUFnQixLQUFLQyxpQkFBTCxDQUF1Qk0sVUFBVUUsSUFBVixDQUFlbEssSUFBdEMsQ0FBdEI7QUFDQSxVQUFJLENBQUN5SixhQUFMLEVBQW9CO0FBQ2xCLGFBQUtFLG1CQUFMLENBQXlCSyxVQUFVRSxJQUFWLENBQWVsSyxJQUF4QyxFQUE4Q2UsSUFBOUMsQ0FBbUQsVUFBQzZJLFdBQUQsRUFBaUI7QUFDbEVMLGVBQUtPLGFBQUwsQ0FBbUJDLFNBQW5CLEVBQThCO0FBQzVCRyxrQkFBTU4sV0FEc0I7QUFFNUJQLHNCQUFVO0FBRmtCLFdBQTlCO0FBSUQsU0FMRDtBQU1ELE9BUEQsTUFPTztBQUNMLGFBQUtTLGFBQUwsQ0FBbUJDLFNBQW5CLEVBQThCO0FBQzVCRyxnQkFBTVQsYUFEc0I7QUFFNUJKLG9CQUFVO0FBRmtCLFNBQTlCO0FBSUQ7QUFDRixLQTdwQndEO0FBOHBCekRjLHFCQUFpQixTQUFTQSxlQUFULENBQXlCQyxPQUF6QixFQUFrQztBQUNqRCxVQUFJLEtBQUsvTSxhQUFMLElBQXNCLEtBQUtDLFVBQS9CLEVBQTJDO0FBQ3pDLGFBQUsrTSxxQkFBTCxDQUEyQkQsT0FBM0I7QUFDRCxPQUZELE1BRU87QUFDTCxhQUFLL0wsU0FBTCxDQUFlOEwsZUFBZixFQUFnQzdMLFNBQWhDO0FBQ0Q7QUFDRixLQXBxQndEO0FBcXFCekQrTCwyQkFBdUIsU0FBU0EscUJBQVQsQ0FBK0JELE9BQS9CLEVBQXdDO0FBQzdELFVBQU1KLFlBQVksS0FBS00sb0JBQUwsRUFBbEI7QUFDQSxVQUFNZixPQUFPLElBQWI7QUFDQSxVQUFNRSxnQkFBZ0IsS0FBS0MsaUJBQUwsQ0FBdUJNLFVBQVVFLElBQVYsQ0FBZWxLLElBQXRDLENBQXRCO0FBQ0EsVUFBSSxDQUFDeUosYUFBTCxFQUFvQjtBQUNsQixhQUFLRSxtQkFBTCxDQUF5QkssVUFBVUUsSUFBVixDQUFlbEssSUFBeEMsRUFBOENlLElBQTlDLENBQW1ELFVBQUM2SSxXQUFELEVBQWlCO0FBQ2xFTCxlQUFLZ0Isc0JBQUwsQ0FBNEJYLFdBQTVCLEVBQXlDUSxPQUF6QztBQUNELFNBRkQ7QUFHRCxPQUpELE1BSU87QUFDTCxhQUFLRyxzQkFBTCxDQUE0QmQsYUFBNUIsRUFBMkNXLE9BQTNDO0FBQ0Q7QUFDRixLQWhyQndEO0FBaXJCekRJLDRCQUF3QixTQUFTQSxzQkFBVCxDQUFnQ0osT0FBaEMsRUFBeUM7QUFDL0QseUJBQVVLLFNBQVYsQ0FBb0JOLGVBQXBCLENBQW9DTyxJQUFwQyxDQUF5QyxJQUF6QyxFQUErQ04sT0FBL0M7QUFDRCxLQW5yQndEO0FBb3JCekRFLDBCQUFzQixTQUFTQSxvQkFBVCxHQUFnQztBQUNwRCxVQUFNSyxnQkFBZ0IsS0FBS2pDLEdBQUwsQ0FBUyxnQkFBVCxFQUEyQmtDLGFBQTNCLEVBQXRCO0FBQ0EsVUFBSVosa0JBQUo7QUFDQSxXQUFLLElBQU1SLEdBQVgsSUFBa0JtQixhQUFsQixFQUFpQztBQUMvQixZQUFJQSxjQUFjRSxjQUFkLENBQTZCckIsR0FBN0IsQ0FBSixFQUF1QztBQUNyQ1Esc0JBQVlXLGNBQWNuQixHQUFkLENBQVo7QUFDQVEsb0JBQVVFLElBQVYsQ0FBZWxLLElBQWYsR0FBc0J3SixHQUF0QjtBQUNBO0FBQ0Q7QUFDRjtBQUNELGFBQU9RLFNBQVA7QUFDRCxLQS9yQndEO0FBZ3NCekRMLHlCQUFxQixTQUFTQSxtQkFBVCxDQUE2Qm1CLFFBQTdCLEVBQXVDO0FBQzFELFVBQU1qSSxNQUFNLHdCQUFaO0FBQ0EsVUFBTTBHLE9BQU8sSUFBYjtBQUNBLFVBQU01RyxRQUFRLG9CQUFlO0FBQzNCSSxpQkFBUzVFLElBQUk2RSxRQUFKLENBQWFDLEdBREs7QUFFM0JDLHNCQUFjLEtBQUtBLFlBRlE7QUFHM0JDLHNCQUFjLEtBQUtBLFlBSFE7QUFJM0JJLGVBQU87QUFKb0IsT0FBZixDQUFkOztBQU9BLFVBQUl3SCxTQUFTLEtBQUtyTixjQUFMLENBQW9CNkUsV0FBakM7O0FBRUE7QUFDQTtBQUNBLFVBQUksS0FBSzdFLGNBQUwsQ0FBb0JpTCxNQUF4QixFQUFnQztBQUM5QixZQUFNcUMsYUFBYSxLQUFLdE4sY0FBTCxDQUFvQmlMLE1BQXBCLENBQTJCc0Msb0JBQTNCLENBQWdELE1BQWhELENBQW5CO0FBQ0EsWUFBSUQsY0FBY0EsV0FBV3pJLFdBQTdCLEVBQTBDO0FBQ3hDd0ksbUJBQVNDLFdBQVd6SSxXQUFwQjtBQUNEO0FBQ0Y7O0FBRUQsVUFBTXVHLGVBQWU7QUFDbkJpQyxzQkFEbUI7QUFFbkIzSCw0QkFBaUIwSCxRQUFqQjtBQUZtQixPQUFyQjs7QUFLQSxVQUFNdEgsZUFBZWIsTUFBTWMsS0FBTixDQUFZLElBQVosRUFBa0JxRixZQUFsQixDQUFyQjs7QUFFQSwwQkFBS3RGLFlBQUwsRUFBbUIsVUFBQzBILElBQUQsRUFBVTtBQUMzQixZQUFNeE0sUUFBUXdNLEtBQUssQ0FBTCxDQUFkO0FBQ0F4TSxjQUFNNkssS0FBSzlHLFVBQVgsSUFBeUIvRCxNQUFNc0IsSUFBL0IsQ0FGMkIsQ0FFVTtBQUNyQ3VKLGFBQUs0QixpQkFBTCxDQUF1QnpNLEtBQXZCO0FBQ0FtRSxZQUFJYyxPQUFKLENBQVlqRixLQUFaO0FBQ0QsT0FMRCxFQUtHLFVBQUMwTSxHQUFELEVBQVM7QUFDVnZJLFlBQUl3SSxNQUFKLENBQVdELEdBQVg7QUFDRCxPQVBEOztBQVNBLGFBQU92SSxJQUFJZSxPQUFYO0FBQ0QsS0F0dUJ3RDtBQXV1QnpEeEMsOEJBQTBCLFNBQVNBLHdCQUFULEdBQW9DO0FBQzVELFdBQUtrSyxtQkFBTCxHQUEyQixFQUEzQjtBQUNELEtBenVCd0Q7QUEwdUJ6RDVCLHVCQUFtQixTQUFTQSxpQkFBVCxDQUEyQm9CLFFBQTNCLEVBQXFDO0FBQ3RELFVBQUksQ0FBQyxLQUFLUSxtQkFBVixFQUErQjtBQUM3QixhQUFLQSxtQkFBTCxHQUEyQixFQUEzQjtBQUNEO0FBQ0QsYUFBTyxLQUFLQSxtQkFBTCxDQUF5QlIsUUFBekIsQ0FBUDtBQUNELEtBL3VCd0Q7QUFndkJ6REssdUJBQW1CLFNBQVNBLGlCQUFULENBQTJCek0sS0FBM0IsRUFBa0M7QUFDbkQsV0FBSzRNLG1CQUFMLENBQXlCNU0sTUFBTXNCLElBQS9CLElBQXVDdEIsS0FBdkM7QUFDRCxLQWx2QndEO0FBbXZCekQ2TCw0QkFBd0IsU0FBU0Esc0JBQVQsQ0FBZ0NkLGFBQWhDLEVBQStDVyxPQUEvQyxFQUF3RDtBQUM5RSxVQUFNbUIsb0JBQW9CO0FBQ3hCckIsY0FBTVQ7QUFEa0IsT0FBMUI7QUFHQSxXQUFLK0Isb0JBQUwsQ0FBMEJELGlCQUExQixFQUE2Q25CLE9BQTdDO0FBQ0QsS0F4dkJ3RDtBQXl2QnpEcUIsa0JBQWMsU0FBU0EsWUFBVCxHQUF3QjtBQUNwQyxVQUFNbEMsT0FBTyxJQUFiO0FBQ0EsVUFBSSxLQUFLbE0sYUFBTCxJQUFzQixLQUFLcU8sU0FBM0IsSUFBd0MsS0FBS2xPLGFBQWpELEVBQWdFO0FBQzlELGFBQUtrRCxhQUFMLENBQW1CLEtBQUtsRCxhQUFMLENBQW1CNkMsSUFBdEMsRUFBNEMsS0FBSzdDLGFBQUwsQ0FBbUJ3QyxJQUEvRCxFQUFxRSxTQUFTMkwsVUFBVCxDQUFvQkMsT0FBcEIsRUFBNkI7QUFDaEcsY0FBTXpMLFFBQVF5TCxRQUFRLENBQVIsQ0FBZDtBQUNBLGNBQUl6TCxLQUFKLEVBQVc7QUFDVCxtQ0FBYW1FLHFCQUFiLENBQW1DLENBQUNuRSxLQUFELENBQW5DLEVBQTRDLEtBQUsvQyxVQUFqRDtBQUNBbU0saUJBQUtySixlQUFMLENBQXFCQyxLQUFyQjtBQUNBLGlCQUFLK0ksa0JBQUw7QUFDRDtBQUNEO0FBQ0E7QUFDQUssZUFBS3NDLFlBQUw7QUFDRCxTQVZEO0FBV0QsT0FaRCxNQVlPO0FBQ0wsYUFBS3hOLFNBQUwsQ0FBZW9OLFlBQWYsRUFBNkJuTixTQUE3QjtBQUNEO0FBQ0YsS0Exd0J3RDtBQTJ3QnpEd04sMkJBQXVCLFNBQVNBLHFCQUFULENBQStCMUMsTUFBL0IsRUFBdUM7QUFBQTs7QUFDNUQsVUFBTUksTUFBTUosT0FBT0ksR0FBbkI7QUFDQSxVQUFNdUMsZUFBZTNDLE9BQU80QyxZQUE1QjtBQUNBLFVBQU1DLGFBQWE3QyxPQUFPL0ksSUFBMUI7QUFDQSxVQUFNb0osZ0JBQWdCLEtBQUtDLGlCQUFMLENBQXVCRixHQUF2QixDQUF0QjtBQUNBLFVBQUksQ0FBQ0MsYUFBTCxFQUFvQjtBQUNsQixhQUFLRSxtQkFBTCxDQUF5QkgsR0FBekIsRUFBOEJ6SSxJQUE5QixDQUFtQyxVQUFDNkksV0FBRCxFQUFpQjtBQUNsRCxjQUFNM0UsVUFBVTtBQUNkK0UsdUJBQVc7QUFDVEUsb0JBQU1OO0FBREcsYUFERztBQUlkbUM7QUFKYyxXQUFoQjtBQU1BLGlCQUFLRyx1QkFBTCxDQUE2QkQsVUFBN0IsRUFBeUNoSCxPQUF6QztBQUNELFNBUkQ7QUFTRCxPQVZELE1BVU87QUFDTCxZQUFNQSxVQUFVO0FBQ2QrRSxxQkFBVztBQUNURSxrQkFBTVQ7QUFERyxXQURHO0FBSWRzQztBQUpjLFNBQWhCO0FBTUEsYUFBS0csdUJBQUwsQ0FBNkJELFVBQTdCLEVBQXlDaEgsT0FBekM7QUFDRDtBQUNGLEtBbnlCd0Q7QUFveUJ6RGlILDZCQUF5QixTQUFTQSx1QkFBVCxDQUFpQ0QsVUFBakMsRUFBNkNoSCxPQUE3QyxFQUFzRDtBQUM3RSxVQUFJa0gsTUFBTWxILE9BQVY7QUFDQSxVQUFJLENBQUNrSCxHQUFMLEVBQVU7QUFDUkEsY0FBTSxFQUFOO0FBQ0Q7QUFDRCxjQUFRRixVQUFSO0FBQ0UsYUFBSyxXQUFMO0FBQ0UsMkJBQU9HLFNBQVAsQ0FBaUIxQixJQUFqQixDQUFzQixJQUF0QixFQUE0QixJQUE1QixFQUFrQ3lCLElBQUluQyxTQUF0QyxFQUFpRG1DLElBQUlKLFlBQXJELEVBQW1FLDJCQUFpQk0sV0FBcEY7QUFDQTtBQUNGLGFBQUssV0FBTDtBQUNFLDJCQUFPQyxTQUFQLENBQWlCNUIsSUFBakIsQ0FBc0IsSUFBdEIsRUFBNEIsSUFBNUIsRUFBa0N5QixJQUFJbkMsU0FBdEMsRUFBaURtQyxJQUFJSixZQUFyRDtBQUNBO0FBQ0Y7QUFDRTtBQVJKO0FBVUQsS0FuekJ3RDtBQW96QnpEUSx3QkFBb0IsU0FBU0Esa0JBQVQsQ0FBNEJ0SCxPQUE1QixFQUFxQztBQUN2RCxVQUFJdUgsaUJBQUo7QUFDQSxVQUFJLEtBQUsvTyxpQkFBTCxJQUEwQixLQUFLSCxVQUFuQyxFQUErQztBQUM3QyxZQUFNb0IsUUFBUSxLQUFLK04sT0FBTCxDQUFheEgsUUFBUXVFLEdBQXJCLENBQWQ7QUFDQSxZQUFNdEUsV0FBVyxLQUFLcUQsV0FBdEI7QUFDQWlFLG1CQUFXdEgsU0FBU3RFLEtBQVQsQ0FBZWxDLEtBQWYsRUFBc0IsSUFBdEIsQ0FBWDtBQUNBLGVBQU84TixRQUFQO0FBQ0Q7QUFDREEsaUJBQVcsS0FBS25PLFNBQUwsQ0FBZWtPLGtCQUFmLEVBQW1Dak8sU0FBbkMsQ0FBWDs7QUFFQSxhQUFPa08sUUFBUDtBQUNELEtBL3pCd0Q7QUFnMEJ6REUsZUFBVyxTQUFTQSxTQUFULEdBQXFCO0FBQzlCLFVBQUksQ0FBQyxLQUFLalAsaUJBQU4sSUFBMkIsQ0FBQyxLQUFLSCxVQUFyQyxFQUFpRDtBQUMvQyxhQUFLZSxTQUFMLENBQWVxTyxTQUFmLEVBQTBCcE8sU0FBMUI7QUFDRDtBQUNGO0FBcDBCd0QsR0FBM0MsQ0FBaEI7O29CQXUwQmVoQyxPIiwiZmlsZSI6Il9Hcm91cExpc3RNaXhpbi5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBDb3B5cmlnaHQgMjAxNyBJbmZvclxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBkZWNsYXJlIGZyb20gJ2Rvam8vX2Jhc2UvZGVjbGFyZSc7XHJcbmltcG9ydCBqc29uIGZyb20gJ2Rvam8vanNvbic7XHJcbmltcG9ydCB1dGlsaXR5IGZyb20gJ2FyZ29zL1V0aWxpdHknO1xyXG5pbXBvcnQgX0xpc3RCYXNlIGZyb20gJ2FyZ29zL19MaXN0QmFzZSc7XHJcbmltcG9ydCBHcm91cFV0aWxpdHkgZnJvbSAnLi4vR3JvdXBVdGlsaXR5JztcclxuaW1wb3J0IHdoZW4gZnJvbSAnZG9qby93aGVuJztcclxuaW1wb3J0IGxhbmcgZnJvbSAnZG9qby9fYmFzZS9sYW5nJztcclxuaW1wb3J0IFNEYXRhU3RvcmUgZnJvbSAnYXJnb3MvU3RvcmUvU0RhdGEnO1xyXG5pbXBvcnQgRGVmZXJyZWQgZnJvbSAnZG9qby9EZWZlcnJlZCc7XHJcbmltcG9ydCBhY3Rpb24gZnJvbSAnLi4vQWN0aW9uJztcclxuaW1wb3J0IEFjdGl2aXR5VHlwZVRleHQgZnJvbSAnLi4vTW9kZWxzL0FjdGl2aXR5L0FjdGl2aXR5VHlwZVRleHQnO1xyXG5pbXBvcnQgZ2V0UmVzb3VyY2UgZnJvbSAnYXJnb3MvSTE4bic7XHJcblxyXG5cclxuY29uc3QgcmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgnZ3JvdXBMaXN0TWl4aW4nKTtcclxuXHJcbi8qKlxyXG4gKiBAY2xhc3MgY3JtLlZpZXdzLl9Hcm91cExpc3RNaXhpblxyXG4gKiBAY2xhc3NkZXNjIE1peGluIGZvciBzbHggZ3JvdXAgbGlzdCBsYXlvdXRzLlxyXG4gKiBAc2luY2UgMy4xXHJcbiAqL1xyXG5jb25zdCBfX2NsYXNzID0gZGVjbGFyZSgnY3JtLlZpZXdzLl9Hcm91cExpc3RNaXhpbicsIG51bGwsIHtcclxuICBub0RlZmF1bHRHcm91cFRleHQ6IHJlc291cmNlLm5vRGVmYXVsdEdyb3VwVGV4dCxcclxuICBjdXJyZW50R3JvdXBOb3RGb3VuZFRleHQ6IHJlc291cmNlLmN1cnJlbnRHcm91cE5vdEZvdW5kVGV4dCxcclxuICBncm91cFRlbXBsYXRlU3VtbWFyeVRleHQ6IHJlc291cmNlLmdyb3VwVGVtcGxhdGVTdW1tYXJ5VGV4dCxcclxuICBncm91cFRlbXBsYXRlRGV0YWlsVGV4dDogcmVzb3VyY2UuZ3JvdXBUZW1wbGF0ZURldGFpbFRleHQsXHJcbiAgZ3JvdXBzTW9kZVRleHQ6IHJlc291cmNlLmdyb3Vwc01vZGVUZXh0LFxyXG4gIGhhc0RlZmF1bHRHcm91cDogdHJ1ZSxcclxuICBub0RlZmF1bHRHcm91cFRlbXBsYXRlOiBuZXcgU2ltcGxhdGUoW1xyXG4gICAgJzxsaSBjbGFzcz1cIm5vLWRhdGFcIiBkYXRhLWFjdGlvbj1cIm9wZW5Db25maWd1cmVcIj4nLFxyXG4gICAgJzxwIGNsYXNzPVwibGlzdHZpZXctaGVhZGluZ1wiPnslPSAkJC5fZ2V0Tm9EZWZhdWx0R3JvdXBNZXNzYWdlKCkgJX08L3A+JyxcclxuICAgICc8L2xpPicsXHJcbiAgXSksXHJcbiAgY3VycmVudEdvdXBOb3RGb3VuZFRlbXBsYXRlOiBuZXcgU2ltcGxhdGUoW1xyXG4gICAgJzxsaSBjbGFzcz1cIm5vLWRhdGFcIj4nLFxyXG4gICAgJzxwIGNsYXNzPVwibGlzdHZpZXctaGVhZGluZ1wiPnslPSAkJC5fZ2V0Q3VycmVudEdyb3VwTm90Rm91bmRNZXNzYWdlKCkgJX08L3A+JyxcclxuICAgICc8L2xpPicsXHJcbiAgXSksXHJcblxyXG4gIF9nZXROb0RlZmF1bHRHcm91cE1lc3NhZ2U6IGZ1bmN0aW9uIF9nZXROb0RlZmF1bHRHcm91cE1lc3NhZ2UoKSB7XHJcbiAgICByZXR1cm4gcmVzb3VyY2Uubm9EZWZhdWx0R3JvdXBUZXh0O1xyXG4gIH0sXHJcbiAgX2dldEN1cnJlbnRHcm91cE5vdEZvdW5kTWVzc2FnZTogZnVuY3Rpb24gX2dldEN1cnJlbnRHcm91cE5vdEZvdW5kTWVzc2FnZSgpIHtcclxuICAgIHJldHVybiByZXNvdXJjZS5jdXJyZW50R3JvdXBOb3RGb3VuZFRleHQ7XHJcbiAgfSxcclxuICBvcGVuQ29uZmlndXJlOiBmdW5jdGlvbiBvcGVuQ29uZmlndXJlKCkge1xyXG4gICAgaWYgKHRoaXMuX3NlbGVjdEdyb3Vwcykge1xyXG4gICAgICB0aGlzLl9zZWxlY3RHcm91cHMoKTtcclxuICAgIH1cclxuICB9LFxyXG4gIC8vIFZpZXcgUHJvcGVydGllc1xyXG4gIGVudGl0eU5hbWU6IG51bGwsXHJcbiAgZ3JvdXBzRW5hYmxlZDogZmFsc2UsXHJcbiAgZ3JvdXBzTW9kZTogZmFsc2UsXHJcbiAgY3VycmVudEdyb3VwSWQ6IG51bGwsXHJcbiAgX2N1cnJlbnRHcm91cDogbnVsbCxcclxuICBfZ3JvdXBJbml0aWFsaXplZDogZmFsc2UsXHJcbiAgX29yaWdpbmFsUHJvcHM6IG51bGwsXHJcbiAgb3ZlcnJpZGVHcm91cExheW91dE5hbWU6ICdATW9iaWxlTGF5b3V0JyxcclxuICBfb3ZlcnJpZGVMYXlvdXRJbml0YWxpemVkOiBmYWxzZSxcclxuICBfb3ZlcnJpZGVHcm91cExheW91dDogbnVsbCxcclxuICBlbmFibGVEeW5hbWljR3JvdXBMYXlvdXQ6IHRydWUsXHJcbiAgZW5hYmxlT3ZlcnJpZGVMYXlvdXQ6IGZhbHNlLFxyXG5cclxuICBzZWxlY3RlZENvbHVtbnM6IG51bGwsXHJcbiAgbGF5b3V0OiBudWxsLFxyXG5cclxuICBwb3N0TWl4SW5Qcm9wZXJ0aWVzOiBmdW5jdGlvbiBwb3N0TWl4SW5Qcm9wZXJ0aWVzKCkge1xyXG4gICAgaWYgKCFBcHAuZW5hYmxlR3JvdXBzKSB7XHJcbiAgICAgIHRoaXMuZ3JvdXBzTW9kZSA9IGZhbHNlO1xyXG4gICAgICB0aGlzLmdyb3Vwc0VuYWJsZWQgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAodGhpcy5ncm91cHNFbmFibGVkKSB7XHJcbiAgICAgIHRoaXMuZ3JvdXBzTW9kZSA9IHRydWU7XHJcbiAgICB9XHJcbiAgICB0aGlzLmluaGVyaXRlZChwb3N0TWl4SW5Qcm9wZXJ0aWVzLCBhcmd1bWVudHMpO1xyXG4gIH0sXHJcbiAgc3RhcnR1cDogZnVuY3Rpb24gc3RhcnR1cCgpIHtcclxuICAgIHRoaXMuY3JlYXRlR3JvdXBUZW1wbGF0ZXMoKTtcclxuICAgIHRoaXMuaW5oZXJpdGVkKHN0YXJ0dXAsIGFyZ3VtZW50cyk7XHJcbiAgfSxcclxuICBnZXRUaXRsZTogZnVuY3Rpb24gZ2V0VGl0bGUoZW50cnksIGxhYmVsUHJvcGVydHkpIHtcclxuICAgIC8vIGxhYmVscHJvcGVydHkgd2lsbCBkZWZhdWx0IHRvIHRoZSBncm91cCdzIGZhbWlseSwgd2hpY2ggZG9lc24ndCB3b3JrIHdpdGggYWxsIGdyb3Vwcy4uLlxyXG4gICAgbGV0IHZhbHVlID0gdXRpbGl0eS5nZXRWYWx1ZShlbnRyeSwgbGFiZWxQcm9wZXJ0eSk7XHJcbiAgICBpZiAodmFsdWUpIHtcclxuICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFRyeSB0byBleHRyYWN0IGEgZGVzY3JpcHRpb25cclxuICAgIHZhbHVlID0gdXRpbGl0eS5nZXRWYWx1ZShlbnRyeSwgJyRkZXNjcmlwdG9yJykgfHwgdXRpbGl0eS5nZXRWYWx1ZShlbnRyeSwgJ0RFU0NSSVBUSU9OJyk7XHJcbiAgICBpZiAodmFsdWUpIHtcclxuICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEZhbGxiYWNrIHRvIHRoZSBmaXJzdCBsYXlvdXQgaXRlbVxyXG4gICAgY29uc3QgZmlyc3RMYXlvdXRJdGVtID0gdGhpcy5sYXlvdXQgJiYgdGhpcy5sYXlvdXRbMF07XHJcbiAgICBpZiAoZmlyc3RMYXlvdXRJdGVtICYmIGZpcnN0TGF5b3V0SXRlbS5hbGlhcykge1xyXG4gICAgICByZXR1cm4gdXRpbGl0eS5nZXRWYWx1ZShlbnRyeSwgZmlyc3RMYXlvdXRJdGVtLmFsaWFzKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBTaG91bGQgbmV2ZXIgbGFuZCBoZXJlXHJcbiAgICBjb25zb2xlLndhcm4oYE5vIGRlc2NyaXB0b3IgZm91bmQgZm9yICR7bGFiZWxQcm9wZXJ0eX1gKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxyXG4gICAgcmV0dXJuICcnO1xyXG4gIH0sXHJcbiAgcmVxdWVzdERhdGE6IGZ1bmN0aW9uIHJlcXVlc3REYXRhKCkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgaWYgKCF0aGlzLl9ncm91cEluaXRpYWxpemVkICYmIHRoaXMuZ3JvdXBzTW9kZSkge1xyXG4gICAgICAgICQodGhpcy5kb21Ob2RlKS5hZGRDbGFzcygnbGlzdC1sb2FkaW5nJyk7XHJcbiAgICAgICAgdGhpcy5fc2V0TG9hZGluZygpO1xyXG4gICAgICAgIHRoaXMuaW5pdEdyb3VwKCk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5pbmhlcml0ZWQocmVxdWVzdERhdGEsIGFyZ3VtZW50cyk7XHJcbiAgICAgIH1cclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgY29uc29sZS5lcnJvcihlKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxyXG4gICAgfVxyXG4gIH0sXHJcblxyXG4gIGpvaW5GaWVsZHM6IGZ1bmN0aW9uIGpvaW5GaWVsZHMoc2VwLCBmaWVsZHMpIHtcclxuICAgIHJldHVybiB1dGlsaXR5LmpvaW5GaWVsZHMoc2VwLCBmaWVsZHMpO1xyXG4gIH0sXHJcbiAgZ2V0RGVzY3JpcHRvcjogZnVuY3Rpb24gZ2V0RGVzY3JpcHRvcihlbnRpdHkpIHtcclxuICAgIHJldHVybiBlbnRpdHkuJGRlc2NyaXB0b3IgfHwgZW50aXR5LiRrZXkgfHwgJ3Vua25vd24nO1xyXG4gIH0sXHJcbiAgZ2V0Q3VycmVudEdyb3VwOiBmdW5jdGlvbiBnZXRDdXJyZW50R3JvdXAoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5fY3VycmVudEdyb3VwO1xyXG4gIH0sXHJcbiAgc2V0Q3VycmVudEdyb3VwOiBmdW5jdGlvbiBzZXRDdXJyZW50R3JvdXAoZ3JvdXApIHtcclxuICAgIGlmIChncm91cCkge1xyXG4gICAgICB0aGlzLmhhc0RlZmF1bHRHcm91cCA9IHRydWU7XHJcbiAgICAgIHRoaXMuX2dyb3VwSW5pdGlhbGl6ZWQgPSBmYWxzZTtcclxuICAgICAgdGhpcy5fY3VycmVudEdyb3VwID0gZ3JvdXA7XHJcbiAgICAgIHRoaXMuY3VycmVudEdyb3VwSWQgPSBncm91cC4ka2V5O1xyXG4gICAgICBHcm91cFV0aWxpdHkuc2V0RGVmYXVsdEdyb3VwUHJlZmVyZW5jZSh0aGlzLmVudGl0eU5hbWUsIGdyb3VwLm5hbWUpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgZ2V0RGVmYXVsdEdyb3VwOiBmdW5jdGlvbiBnZXREZWZhdWx0R3JvdXAoKSB7XHJcbiAgICBsZXQgZGVmYXVsdEdyb3VwID0gbnVsbDtcclxuICAgIGxldCBkZWZhdWx0R3JvdXBOYW1lID0gbnVsbDtcclxuXHJcbiAgICBkZWZhdWx0R3JvdXAgPSBHcm91cFV0aWxpdHkuZ2V0RGVmYXVsdEdyb3VwKHRoaXMuZW50aXR5TmFtZSk7XHJcblxyXG4gICAgaWYgKGRlZmF1bHRHcm91cCkge1xyXG4gICAgICByZXR1cm4gZGVmYXVsdEdyb3VwO1xyXG4gICAgfVxyXG5cclxuICAgIGRlZmF1bHRHcm91cE5hbWUgPSBHcm91cFV0aWxpdHkuZ2V0RGVmYXVsdEdyb3VwUHJlZmVyZW5jZSh0aGlzLmVudGl0eU5hbWUpO1xyXG4gICAgaWYgKGRlZmF1bHRHcm91cE5hbWUpIHtcclxuICAgICAgdGhpcy5fcmVxdWVzdEdyb3VwKGRlZmF1bHRHcm91cE5hbWUpO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLy8gTm8gZGVmYXVsdCBncm91cCBwcmVmZXJlbmNlXHJcbiAgICAgIHRoaXMuc2V0KCdsaXN0Q29udGVudCcsIHRoaXMubm9EZWZhdWx0R3JvdXBUZW1wbGF0ZS5hcHBseSh0aGlzKSk7XHJcbiAgICAgIHRoaXMuaGFzRGVmYXVsdEdyb3VwID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG51bGw7XHJcbiAgfSxcclxuICBpbml0T3ZlcnJpZGVHcm91cExheW91dDogZnVuY3Rpb24gaW5pdE92ZXJyaWRlR3JvdXBMYXlvdXQoKSB7XHJcbiAgICB0aGlzLl9yZXF1ZXN0T3ZlcnJpZGVHcm91cExheW91dCgpLnRoZW4oKHJlc3VsdCkgPT4ge1xyXG4gICAgICB0aGlzLl9vdmVycmlkZUxheW91dEluaXRhbGl6ZWQgPSB0cnVlO1xyXG4gICAgICB0aGlzLl9vdmVycmlkZUdyb3VwTGF5b3V0ID0gKHJlc3VsdCAmJiAocmVzdWx0Lmxlbmd0aCA+IDApKSA/IHJlc3VsdFswXS5sYXlvdXQgOiBudWxsO1xyXG4gICAgICB0aGlzLmluaXRHcm91cCgpO1xyXG4gICAgfSk7XHJcbiAgfSxcclxuICBpbml0R3JvdXA6IGZ1bmN0aW9uIGluaXRHcm91cCgpIHtcclxuICAgIGlmICh0aGlzLmVuYWJsZU92ZXJyaWRlTGF5b3V0ICYmICF0aGlzLl9vdmVycmlkZUxheW91dEluaXRhbGl6ZWQgJiYgIXRoaXMuX292ZXJyaWRlR3JvdXBMYXlvdXQpIHtcclxuICAgICAgdGhpcy5pbml0T3ZlcnJpZGVHcm91cExheW91dCgpO1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICBsZXQgZ3JvdXAgPSB0aGlzLmdldEN1cnJlbnRHcm91cCgpO1xyXG5cclxuICAgIGlmICghZ3JvdXApIHtcclxuICAgICAgZ3JvdXAgPSB0aGlzLmdldERlZmF1bHRHcm91cCgpO1xyXG4gICAgICB0aGlzLnNldEN1cnJlbnRHcm91cChncm91cCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGdyb3VwKSB7XHJcbiAgICAgIHRoaXMuX29uQXBwbHlHcm91cChncm91cCk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBjbGVhcjogZnVuY3Rpb24gY2xlYXIoKSB7XHJcbiAgICB0aGlzLmluaGVyaXRlZChjbGVhciwgYXJndW1lbnRzKTtcclxuICAgIHRoaXMuX2NsZWFyUmVzb2x2ZWRFbnRyeUNhY2hlKCk7XHJcbiAgfSxcclxuICBfb25BcHBseUdyb3VwOiBmdW5jdGlvbiBfb25BcHBseUdyb3VwKGdyb3VwKSB7XHJcbiAgICBpZiAoIWdyb3VwKSB7XHJcbiAgICAgIHRocm93IG5ldyBFcnJvcignR3JvdXAgbm90IGZvdW5kLicpO1xyXG4gICAgfVxyXG4gICAgdGhpcy5fZmllbGRGb3JtYXR0ZXJzID0ge307XHJcbiAgICB0aGlzLl9zdGFydEdyb3VwTW9kZSgpO1xyXG4gICAgdGhpcy5fY2xlYXJSZXNvbHZlZEVudHJ5Q2FjaGUoKTtcclxuXHJcbiAgICAvLyBTZXQgdGhlIHRvb2xiYXIgdGl0bGUgdG8gdGhlIGN1cnJlbnQgZ3JvdXAgZGlzcGxheU5hbWVcclxuICAgIGNvbnN0IHRpdGxlID0gdGhpcy5nZXRHcm91cFRpdGxlKGdyb3VwKTtcclxuICAgIEFwcC5zZXRQcmltYXJ5VGl0bGUodGl0bGUpO1xyXG4gICAgdGhpcy5zZXQoJ3RpdGxlJywgdGl0bGUpO1xyXG5cclxuICAgIGlmICh0aGlzLl9ncm91cEluaXRpYWxpemVkKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmxheW91dCA9IEdyb3VwVXRpbGl0eS5nZXRMYXlvdXQoZ3JvdXApO1xyXG4gICAgdGhpcy5zZWxlY3RDb2x1bW5zID0gR3JvdXBVdGlsaXR5LmdldENvbHVtbk5hbWVzKHRoaXMubGF5b3V0KTtcclxuICAgIHRoaXMuaXRlbVRlbXBsYXRlID0gdGhpcy5nZXRJdGVtVGVtcGxhdGUoKTtcclxuXHJcbiAgICAvLyBDcmVhdGUgYSBjdXN0b20gcmVxdWVzdCB0aGF0IHRoZSBzdG9yZSB3aWxsIHVzZSB0byBleGVjdXRlIHRoZSBncm91cCBxdWVyeVxyXG4gICAgdGhpcy5yZXF1ZXN0ID0gR3JvdXBVdGlsaXR5LmNyZWF0ZUdyb3VwUmVxdWVzdCh7XHJcbiAgICAgIGdyb3VwSWQ6IGdyb3VwLiRrZXksXHJcbiAgICAgIGNvbm5lY3Rpb246IHRoaXMuZ2V0Q29ubmVjdGlvbigpLFxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gVHJ5IHRvIHNlbGVjdCB0aGUgZW50aXR5IGlkIGFzIHdlbGxcclxuICAgIHRoaXMuc2VsZWN0Q29sdW1ucy5wdXNoKGAke2dyb3VwLmZhbWlseX1JRGApO1xyXG4gICAgdGhpcy5xdWVyeVNlbGVjdCA9IHRoaXMuc2VsZWN0Q29sdW1ucztcclxuICAgIHRoaXMucXVlcnlPcmRlckJ5ID0gJyc7XHJcbiAgICB0aGlzLmlkUHJvcGVydHkgPSBgJHtncm91cC5mYW1pbHkudG9VcHBlckNhc2UoKX1JRGA7XHJcbiAgICB0aGlzLmxhYmVsUHJvcGVydHkgPSBncm91cC5mYW1pbHkudG9VcHBlckNhc2UoKTtcclxuICAgIHRoaXMuc3RvcmUgPSBudWxsO1xyXG4gICAgdGhpcy5jbGVhcih0cnVlKTtcclxuICAgIHRoaXMucmVmcmVzaFJlcXVpcmVkID0gdHJ1ZTtcclxuICAgIHRoaXMuX2dyb3VwSW5pdGlhbGl6ZWQgPSB0cnVlO1xyXG4gICAgdGhpcy5yZXF1ZXN0RGF0YSgpO1xyXG4gIH0sXHJcbiAgX3JlcXVlc3RPdmVycmlkZUdyb3VwTGF5b3V0OiBmdW5jdGlvbiBfcmVxdWVzdE92ZXJyaWRlR3JvdXBMYXlvdXQoKSB7XHJcbiAgICBjb25zdCBkZWYgPSBuZXcgRGVmZXJyZWQoKTtcclxuICAgIGNvbnN0IGdyb3VwTmFtZSA9IHRoaXMub3ZlcnJpZGVHcm91cExheW91dE5hbWU7XHJcbiAgICBjb25zdCBzdG9yZSA9IG5ldyBTRGF0YVN0b3JlKHtcclxuICAgICAgc2VydmljZTogQXBwLnNlcnZpY2VzLmNybSxcclxuICAgICAgcmVzb3VyY2VLaW5kOiAnZ3JvdXBzJyxcclxuICAgICAgY29udHJhY3ROYW1lOiAnc3lzdGVtJyxcclxuICAgICAgd2hlcmU6IGAoKHVwcGVyKGZhbWlseSkgZXEgJyR7dGhpcy5lbnRpdHlOYW1lLnRvVXBwZXJDYXNlKCl9JykgYW5kICh1cHBlcihOYW1lKSBlcSAnJHtncm91cE5hbWUudG9VcHBlckNhc2UoKX0nKSlgLFxyXG4gICAgICBpbmNsdWRlOiBbJ2xheW91dCcsICd0YWJsZUFsaWFzZXMnXSxcclxuICAgICAgaWRQcm9wZXJ0eTogJyRrZXknLFxyXG4gICAgICBhcHBsaWNhdGlvbk5hbWU6ICdzbHgnLFxyXG4gICAgICBzY29wZTogdGhpcyxcclxuICAgIH0pO1xyXG5cclxuICAgIGlmIChzdG9yZSkge1xyXG4gICAgICBjb25zdCBxdWVyeVJlc3VsdHMgPSBzdG9yZS5xdWVyeSgpO1xyXG4gICAgICB3aGVuKHF1ZXJ5UmVzdWx0cywgKHJlbGF0ZWRGZWVkKSA9PiB7XHJcbiAgICAgICAgZGVmLnJlc29sdmUocmVsYXRlZEZlZWQpO1xyXG4gICAgICB9LCAoKSA9PiB7XHJcbiAgICAgICAgZGVmLnJlc29sdmUobnVsbCk7XHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGRlZi5wcm9taXNlO1xyXG4gIH0sXHJcbiAgX3JlcXVlc3RHcm91cDogZnVuY3Rpb24gX3JlcXVlc3RHcm91cChncm91cE5hbWUsIGdyb3VwSWQsIG9uU3VjY2Vzcykge1xyXG4gICAgbGV0IHN0b3JlO1xyXG4gICAgaWYgKHR5cGVvZiBncm91cE5hbWUgPT09ICdzdHJpbmcnICYmIGdyb3VwTmFtZSAhPT0gJycpIHtcclxuICAgICAgc3RvcmUgPSBuZXcgU0RhdGFTdG9yZSh7XHJcbiAgICAgICAgc2VydmljZTogQXBwLnNlcnZpY2VzLmNybSxcclxuICAgICAgICByZXNvdXJjZUtpbmQ6ICdncm91cHMnLFxyXG4gICAgICAgIGNvbnRyYWN0TmFtZTogJ3N5c3RlbScsXHJcbiAgICAgICAgd2hlcmU6IGAoKHVwcGVyKGZhbWlseSkgZXEgJyR7dGhpcy5lbnRpdHlOYW1lLnRvVXBwZXJDYXNlKCl9JykgYW5kICh1cHBlcihOYW1lKSBlcSAnJHtncm91cE5hbWUudG9VcHBlckNhc2UoKX0nKSBvciBQbHVnaW5JZCBlcSAnJHtncm91cElkfScpYCxcclxuICAgICAgICBpbmNsdWRlOiBbJ2xheW91dCcsICd0YWJsZUFsaWFzZXMnXSxcclxuICAgICAgICBpZFByb3BlcnR5OiAnJGtleScsXHJcbiAgICAgICAgYXBwbGljYXRpb25OYW1lOiAnc2x4JyxcclxuICAgICAgICBzY29wZTogdGhpcyxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHN0b3JlKSB7XHJcbiAgICAgIGNvbnN0IHF1ZXJ5UmVzdWx0cyA9IHN0b3JlLnF1ZXJ5KCk7XHJcblxyXG4gICAgICAoZnVuY3Rpb24gcXVlcnlXaGVuKGNvbnRleHQsIHF1ZXJ5UmVzdWx0KSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIHdoZW4ocXVlcnlSZXN1bHQsIGZ1bmN0aW9uIHF1ZXJ5UmVzdWx0Rm4oZ3JvdXBGZWVkKSB7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygb25TdWNjZXNzID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgICAgb25TdWNjZXNzLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgdGhpcy5fb25Hcm91cFJlcXVlc3RTdWNjZXNzKGdyb3VwRmVlZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIH0uYmluZChjb250ZXh0KSk7XHJcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgICAgIGNvbnNvbGUubG9nKCdFcnJvciBmZXRjaGluZyBncm91cCBkYXRhOicgKyBlcnJvcik7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcclxuICAgICAgICB9XHJcbiAgICAgIH0pKHRoaXMsIHF1ZXJ5UmVzdWx0cyk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBzZXRQcmltYXJ5VGl0bGU6IGZ1bmN0aW9uIHNldFByaW1hcnlUaXRsZSgpIHtcclxuICAgIGNvbnN0IGdyb3VwID0gdGhpcy5fY3VycmVudEdyb3VwO1xyXG5cclxuICAgIGlmIChncm91cCkge1xyXG4gICAgICBjb25zdCB0aXRsZSA9IHRoaXMuZ2V0R3JvdXBUaXRsZShncm91cCk7XHJcbiAgICAgIHRoaXMuc2V0KCd0aXRsZScsIHRpdGxlKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmluaGVyaXRlZChzZXRQcmltYXJ5VGl0bGUsIGFyZ3VtZW50cyk7XHJcbiAgfSxcclxuICBfb25Hcm91cFJlcXVlc3RTdWNjZXNzOiBmdW5jdGlvbiBfb25Hcm91cFJlcXVlc3RTdWNjZXNzKHJlc3VsdCkge1xyXG4gICAgaWYgKHJlc3VsdC5sZW5ndGggPiAwKSB7XHJcbiAgICAgIGNvbnN0IGdyb3VwID0gcmVzdWx0WzBdO1xyXG4gICAgICB0aGlzLnNldEN1cnJlbnRHcm91cChncm91cCk7XHJcbiAgICAgIEdyb3VwVXRpbGl0eS5hZGRUb0dyb3VwUHJlZmVyZW5jZXMoW2dyb3VwXSwgdGhpcy5lbnRpdHlOYW1lKTtcclxuICAgICAgdGhpcy5fb25BcHBseUdyb3VwKGdyb3VwKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIGNvbnN0IHRpdGxlID0gdGhpcy5nZXRHcm91cFRpdGxlKCk7XHJcbiAgICAgIEFwcC5zZXRQcmltYXJ5VGl0bGUodGl0bGUpO1xyXG4gICAgICB0aGlzLnNldCgndGl0bGUnLCB0aXRsZSk7XHJcbiAgICAgIHRoaXMuX3NlbGVjdEdyb3VwcygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFJlbG9hZCB0aGUgcmlnaHQgbWVudVxyXG4gICAgdGhpcy5vblRyYW5zaXRpb25Bd2F5KCk7XHJcbiAgICB0aGlzLmxvYWRSaWdodERyYXdlcigpO1xyXG5cclxuICAgICQodGhpcy5kb21Ob2RlKS5yZW1vdmVDbGFzcygnbGlzdC1sb2FkaW5nJyk7XHJcbiAgICB0aGlzLmxpc3RMb2FkaW5nID0gZmFsc2U7XHJcbiAgfSxcclxuICBfb25Hcm91cFJlcXVlc3RGYWlsZDogZnVuY3Rpb24gX29uR3JvdXBSZXF1ZXN0RmFpbGQoKSB7XHJcblxyXG4gIH0sXHJcbiAgZ2V0R3JvdXBUaXRsZTogZnVuY3Rpb24gZ2V0R3JvdXBUaXRsZShncm91cCkge1xyXG4gICAgcmV0dXJuIGdyb3VwLmRpc3BsYXlOYW1lO1xyXG4gIH0sXHJcbiAgZ2V0SXRlbVRlbXBsYXRlOiBmdW5jdGlvbiBnZXRJdGVtVGVtcGxhdGUoKSB7XHJcbiAgICBjb25zdCBsYXlvdXQgPSAodGhpcy5lbmFibGVPdmVycmlkZUxheW91dCAmJiB0aGlzLl9vdmVycmlkZUdyb3VwTGF5b3V0KSA/IHRoaXMuX292ZXJyaWRlR3JvdXBMYXlvdXQgOiB0aGlzLmxheW91dDtcclxuICAgIGlmICh0aGlzLmVuYWJsZUR5bmFtaWNHcm91cExheW91dCkge1xyXG4gICAgICBjb25zdCBsYXlvdXRUZW1wbGF0ZSA9IHRoaXMuZ2V0U2VsZWN0ZWRHcm91cExheW91dFRlbXBsYXRlKCk7XHJcbiAgICAgIGlmIChsYXlvdXRUZW1wbGF0ZSkge1xyXG4gICAgICAgIGlmIChsYXlvdXRUZW1wbGF0ZS50eXBlID09PSAnRHluYW1pYycpIHtcclxuICAgICAgICAgIHJldHVybiB0aGlzLmdldER5bmFtaWNMYXlvdXRJdGVtVGVtcGxhdGUobGF5b3V0LCBsYXlvdXRUZW1wbGF0ZS5vcHRpb25zKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGxheW91dFRlbXBsYXRlLnRlbXBsYXRlKSB7XHJcbiAgICAgICAgICByZXR1cm4gbmV3IFNpbXBsYXRlKGxheW91dFRlbXBsYXRlLnRlbXBsYXRlKTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgcmV0dXJuIHRoaXMuZGVmYXVsdEdyb3VwTGF5b3V0SXRlbVRlbXBsYXRlO1xyXG4gICAgfVxyXG4gICAgY29uc3QgdGVtcGxhdGUgPSBsYXlvdXQubWFwKHRoaXMuZ2V0SXRlbUxheW91dFRlbXBsYXRlKTtcclxuICAgIHJldHVybiBuZXcgU2ltcGxhdGUodGVtcGxhdGUpO1xyXG4gIH0sXHJcbiAgZ2V0SXRlbUxheW91dFRlbXBsYXRlOiBmdW5jdGlvbiBnZXRJdGVtTGF5b3V0VGVtcGxhdGUoaXRlbSkge1xyXG4gICAgY29uc3QganNvblN0cmluZyA9IGpzb24uc3RyaW5naWZ5KGl0ZW0pO1xyXG4gICAgY29uc3QgdGVtcGxhdGUgPSBbJzxwIGNsYXNzPVwibWljcm8tdGV4dFwiPjxzcGFuIGNsYXNzPVwiZ3JvdXAtbGFiZWxcIj4nLCBpdGVtLmNhcHRpb24sIGA8L3NwYW4+IDxzcGFuIGNsYXNzPVwiZ3JvdXAtZW50cnlcIj57JT0gJCQuZ3JvdXBUcmFuc2Zvcm1WYWx1ZSgkWyQkLmdldEZpZWxkTmFtZUJ5TGF5b3V0KCR7anNvblN0cmluZ30pXSwke2pzb25TdHJpbmd9LCQkLmdldEZvcm1hdHRlckJ5TGF5b3V0KCR7anNvblN0cmluZ30pKSAlfTwvc3Bhbj5gLCAnPC9wPiddLmpvaW4oJycpO1xyXG5cclxuICAgIHJldHVybiB0ZW1wbGF0ZTtcclxuICB9LFxyXG4gIGRlZmF1bHRHcm91cExheW91dEl0ZW1UZW1wbGF0ZTogbmV3IFNpbXBsYXRlKFtcclxuICAgICc8cCBjbGFzcz1cIm1pY3JvLXRleHRcIj57JT0gJCQuZ2V0R3JvdXBGaWVsZFZhbHVlQnlJbmRleCgkLCAwLCB0cnVlKSAlfTwvcD4nLFxyXG4gICAgJzxwIGNsYXNzPVwibWljcm8tdGV4dFwiPjxzcGFuIGNsYXNzPVwiZ3JvdXAtbGFiZWxcIj57JT0gJCQuZ2V0R3JvdXBGaWVsZExhYmVsQnlJbmRleCgxKSAlfSA8L3NwYW4+PHNwYW4gY2xhc3M9XCJncm91cC1lbnRyeVwiPnslPSAkJC5nZXRHcm91cEZpZWxkVmFsdWVCeUluZGV4KCQsIDEsIHRydWUpICV9PC9zcGFuPjwvcD4nLFxyXG4gICAgJzxwIGNsYXNzPVwibWljcm8tdGV4dFwiPjxzcGFuIGNsYXNzPVwiZ3JvdXAtbGFiZWxcIj57JT0gJCQuZ2V0R3JvdXBGaWVsZExhYmVsQnlJbmRleCgyKSAlfSA8L3NwYW4+PHNwYW4gY2xhc3M9XCJncm91cC1lbnRyeVwiPnslPSAkJC5nZXRHcm91cEZpZWxkVmFsdWVCeUluZGV4KCQsIDIsIHRydWUpICV9PC9zcGFuPjwvcD4nLFxyXG4gIF0pLFxyXG4gIGNyZWF0ZUdyb3VwVGVtcGxhdGVMYXlvdXRzOiBmdW5jdGlvbiBjcmVhdGVHcm91cFRlbXBsYXRlTGF5b3V0cygpIHtcclxuICAgIHRoaXMuZ3JvdXBUZW1wbGF0ZUxheW91dHMgPSBbe1xyXG4gICAgICBuYW1lOiAnU3VtbWFyeScsXHJcbiAgICAgIGRpc3BsYXlOYW1lOiByZXNvdXJjZS5ncm91cFRlbXBsYXRlU3VtbWFyeVRleHQsXHJcbiAgICAgIHR5cGU6ICdEeW5hbWljJyxcclxuICAgICAgb3B0aW9uczoge1xyXG4gICAgICAgIGNvbHVtbnM6IFt7XHJcbiAgICAgICAgICBpZDogJ2NvbDEnLFxyXG4gICAgICAgICAgcm93czogMyxcclxuICAgICAgICB9XSxcclxuICAgICAgfSxcclxuICAgIH0sIHtcclxuICAgICAgbmFtZTogJ0RldGFpbCcsXHJcbiAgICAgIGRpc3BsYXlOYW1lOiByZXNvdXJjZS5ncm91cFRlbXBsYXRlRGV0YWlsVGV4dCxcclxuICAgICAgdHlwZTogJ0R5bmFtaWMnLFxyXG4gICAgICBvcHRpb25zOiB7XHJcbiAgICAgICAgY29sdW1uczogW3tcclxuICAgICAgICAgIGlkOiAnY29sMScsXHJcbiAgICAgICAgICByb3dzOiAzLFxyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgIGlkOiAnY29sMicsXHJcbiAgICAgICAgICByb3dzOiAzLFxyXG4gICAgICAgIH0sIHtcclxuICAgICAgICAgIGlkOiAnY29sMycsXHJcbiAgICAgICAgICByb3dzOiAzLFxyXG4gICAgICAgIH1dLFxyXG4gICAgICB9LFxyXG4gICAgfV07XHJcblxyXG4gICAgcmV0dXJuIHRoaXMuZ3JvdXBUZW1wbGF0ZUxheW91dHM7XHJcbiAgfSxcclxuICBnZXRTZWxlY3RlZEdyb3VwTGF5b3V0VGVtcGxhdGU6IGZ1bmN0aW9uIGdldFNlbGVjdGVkR3JvdXBMYXlvdXRUZW1wbGF0ZSgpIHtcclxuICAgIGxldCBuYW1lID0gR3JvdXBVdGlsaXR5LmdldFNlbGVjdGVkR3JvdXBMYXlvdXRUZW1wbGF0ZSh0aGlzLmVudGl0eU5hbWUpO1xyXG4gICAgbmFtZSA9IChuYW1lKSA/IG5hbWUgOiAnJztcclxuICAgIGxldCBsYXlvdXRUZW1wbGF0ZSA9IG51bGw7XHJcbiAgICB0aGlzLmdyb3VwVGVtcGxhdGVMYXlvdXRzLmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgaWYgKGl0ZW0ubmFtZSA9PT0gbmFtZSkge1xyXG4gICAgICAgIGxheW91dFRlbXBsYXRlID0gaXRlbTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBpZiAoIWxheW91dFRlbXBsYXRlKSB7XHJcbiAgICAgIGxheW91dFRlbXBsYXRlID0gdGhpcy5ncm91cFRlbXBsYXRlTGF5b3V0c1swXTtcclxuICAgIH1cclxuICAgIHJldHVybiBsYXlvdXRUZW1wbGF0ZTtcclxuICB9LFxyXG4gIGNyZWF0ZUdyb3VwVGVtcGxhdGVzOiBmdW5jdGlvbiBjcmVhdGVHcm91cFRlbXBsYXRlcygpIHtcclxuICAgIHRoaXMuZ3JvdXBUZW1wbGF0ZUxheW91dHMgPSB0aGlzLl9jcmVhdGVDdXN0b21pemVkTGF5b3V0KHRoaXMuY3JlYXRlR3JvdXBUZW1wbGF0ZUxheW91dHMoKSwgJ2dyb3VwLXRlbXBsYXRlcycpO1xyXG4gIH0sXHJcbiAgZ2V0RHluYW1pY0xheW91dEl0ZW1UZW1wbGF0ZTogZnVuY3Rpb24gZ2V0RHluYW1pY0xheW91dEl0ZW1UZW1wbGF0ZShsYXlvdXQsIG9wdGlvbnMpIHtcclxuICAgIGNvbnN0IGxheW91dE9wdGlvbnMgPSB0aGlzLmFwcGx5RHluYW1pY0xheW91dE9wdGlvbnMob3B0aW9ucyk7XHJcbiAgICBsZXQgcm93cyA9IDA7XHJcbiAgICBsZXQgY29sdW1ucyA9IDE7XHJcbiAgICBsZXQgY29sdW1uID0gMTtcclxuICAgIGxldCByb3cgPSAxO1xyXG4gICAgY29sdW1ucyA9IGxheW91dE9wdGlvbnMuY29sdW1ucy5sZW5ndGg7XHJcbiAgICBsYXlvdXRPcHRpb25zLmNvbHVtbnMuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICByb3dzID0gcm93cyArIGl0ZW0ucm93cztcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IHRlbXBsYXRlID0gW107XHJcbiAgICB0ZW1wbGF0ZS5wdXNoKCc8ZGl2IGNsYXNzPVwiZ3JvdXAtaXRlbVwiPicpO1xyXG4gICAgdGVtcGxhdGUucHVzaCgnPHA+Jyk7XHJcbiAgICB0ZW1wbGF0ZS5wdXNoKGB7JT0gJCQuZ2V0R3JvdXBGaWVsZFZhbHVlQnlOYW1lKCQsXCIke2xheW91dFswXS5wcm9wZXJ0eVBhdGh9XCIsIHRydWUpICV9YCk7XHJcbiAgICB0ZW1wbGF0ZS5wdXNoKCc8L3BcIj4nKTtcclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGF5b3V0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGNvbnN0IGNvbHVtbkl0ZW0gPSBsYXlvdXRPcHRpb25zLmNvbHVtbnNbY29sdW1uIC0gMV07XHJcbiAgICAgIGlmICgoY29sdW1uSXRlbSkgJiYgKGNvbHVtbiA8PSBjb2x1bW5zKSAmJiAoaSAhPT0gMCkpIHtcclxuICAgICAgICBpZiAocm93ID09PSAxKSB7XHJcbiAgICAgICAgICBjb25zdCBjb2x1bW5DbGFzcyA9IGNvbHVtbkl0ZW0uY2xzcyB8fCAnJztcclxuICAgICAgICAgIHRlbXBsYXRlLnB1c2goYDxkaXYgY2xhc3M9XCJtaWNyby10ZXh0IGdyb3VwLWNvbHVtbiAke2NvbHVtbkNsYXNzfVwiPmApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCBpdGVtID0gbGF5b3V0W2ldO1xyXG4gICAgICAgIGlmIChpdGVtICYmIChjb2x1bW5JdGVtLnJvd3MgPiAwKSkge1xyXG4gICAgICAgICAgaWYgKGkgIT09IDApIHtcclxuICAgICAgICAgICAgdGVtcGxhdGUucHVzaCgnPGRpdj4nKTtcclxuICAgICAgICAgICAgaWYgKCFjb2x1bW5JdGVtLmhpZGVMYWJlbHMpIHtcclxuICAgICAgICAgICAgICB0ZW1wbGF0ZS5wdXNoKGA8c3BhbiBjbGFzcz1cImdyb3VwLWxhYmVsXCI+JHt0aGlzLmdldEdyb3VwRmllbGRMYWJlbEJ5TmFtZShpdGVtLnByb3BlcnR5UGF0aCl9IDwvc3Bhbj5gKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3QgZm9ybWF0T3B0aW9ucyA9IHRoaXMuZ2V0R3JvdXBGaWVsZEZvcm1hdE9wdGlvbnMoaXRlbSk7XHJcbiAgICAgICAgICAgIGNvbnN0IGZvcm1hdENsc3MgPSBmb3JtYXRPcHRpb25zLmNsc3MgfHwgJyc7XHJcbiAgICAgICAgICAgIGNvbnN0IGpzb25TdHJpbmcgPSBqc29uLnN0cmluZ2lmeShmb3JtYXRPcHRpb25zKTtcclxuICAgICAgICAgICAgaWYgKGl0ZW0uZm9ybWF0ID09PSAnUGhvbmUnKSB7XHJcbiAgICAgICAgICAgICAgdGVtcGxhdGUucHVzaChgPHNwYW4gY2xhc3M9XCJoeXBlcmxpbmtcIiBkYXRhLWFjdGlvbj1cImdyb3VwSW52b2tlTGlzdEFjdGlvblwiIGRhdGEtbmFtZT1cImNhbGxQaG9uZVwiIGRhdGEta2V5PVwieyU6JCQuZ2V0R3JvdXBJdGVtS2V5KCQpJX1cIiBkYXRhLXByb3BlcnR5bmFtZT1cIiR7aXRlbS5wcm9wZXJ0eVBhdGh9XCI+eyU9ICQkLmdldEdyb3VwRmllbGRWYWx1ZUJ5TmFtZSgkLFwiJHtpdGVtLnByb3BlcnR5UGF0aH1cIiwgdHJ1ZSwke2pzb25TdHJpbmd9KSAlfTwvc3Bhbj5gKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChpdGVtLnByb3BlcnR5UGF0aCA9PT0gJ0VtYWlsJykge1xyXG4gICAgICAgICAgICAgIHRlbXBsYXRlLnB1c2goYDxzcGFuIGNsYXNzPVwiaHlwZXJsaW5rXCIgZGF0YS1hY3Rpb249XCJncm91cEludm9rZUxpc3RBY3Rpb25cIiBkYXRhLW5hbWU9XCJzZW5kRW1haWxcIiBkYXRhLWtleT1cInslOiQkLmdldEdyb3VwSXRlbUtleSgkKSV9XCIgZGF0YS1wcm9wZXJ0eW5hbWU9XCIke2l0ZW0ucHJvcGVydHlQYXRofVwiPnslPSAkJC5nZXRHcm91cEZpZWxkVmFsdWVCeU5hbWUoJCxcIiR7aXRlbS5wcm9wZXJ0eVBhdGh9XCIsIHRydWUsJHtqc29uU3RyaW5nfSkgJX08L3NwYW4+YCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgdGVtcGxhdGUucHVzaChgPHNwYW4gY2xhc3M9XCJncm91cC1lbnRyeSAke2Zvcm1hdENsc3N9XCI+eyU9ICQkLmdldEdyb3VwRmllbGRWYWx1ZUJ5TmFtZSgkLFwiJHtpdGVtLnByb3BlcnR5UGF0aH1cIiwgdHJ1ZSwke2pzb25TdHJpbmd9KSAlfTwvc3Bhbj5gKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0ZW1wbGF0ZS5wdXNoKCc8L2Rpdj4nKTtcclxuICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcm93Kys7XHJcbiAgICAgICAgaWYgKHJvdyA9PT0gY29sdW1uSXRlbS5yb3dzICsgMSkge1xyXG4gICAgICAgICAgcm93ID0gMTtcclxuICAgICAgICAgIGNvbHVtbisrO1xyXG4gICAgICAgICAgdGVtcGxhdGUucHVzaCgnPC9kaXY+Jyk7XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICBpZiAocm93ICE9PSAxKSB7XHJcbiAgICAgIHRlbXBsYXRlLnB1c2goJzwvZGl2PicpO1xyXG4gICAgfVxyXG4gICAgdGVtcGxhdGUucHVzaCgnPC9kaXY+Jyk7XHJcbiAgICByZXR1cm4gbmV3IFNpbXBsYXRlKHRlbXBsYXRlKTtcclxuICB9LFxyXG4gIGFwcGx5RHluYW1pY0xheW91dE9wdGlvbnM6IGZ1bmN0aW9uIGFwcGx5RHluYW1pY0xheW91dE9wdGlvbnMob3B0aW9ucykge1xyXG4gICAgY29uc3QgbGF5b3V0T3B0aW9ucyA9IHtcclxuICAgICAgY29sdW1uczogW3tcclxuICAgICAgICByb3dzOiAzLFxyXG4gICAgICB9XSxcclxuICAgIH07XHJcbiAgICBsYW5nLm1peGluKGxheW91dE9wdGlvbnMsIG9wdGlvbnMpO1xyXG4gICAgcmV0dXJuIGxheW91dE9wdGlvbnM7XHJcbiAgfSxcclxuICBnZXRHcm91cEl0ZW1LZXk6IGZ1bmN0aW9uIGdldEdyb3VwSXRlbUtleShncm91cEVudHJ5KSB7XHJcbiAgICByZXR1cm4gZ3JvdXBFbnRyeVt0aGlzLmlkUHJvcGVydHldO1xyXG4gIH0sXHJcbiAgZ2V0R3JvdXBGaWVsZEZvcm1hdE9wdGlvbnM6IGZ1bmN0aW9uIGdldEdyb3VwRmllbGRGb3JtYXRPcHRpb25zKGxheW91dEl0ZW0pIHtcclxuICAgIGNvbnN0IGZvcm1hdHRlciA9IHRoaXMuZ2V0Rm9ybWF0dGVyQnlMYXlvdXQobGF5b3V0SXRlbSk7XHJcbiAgICBjb25zdCBvcHRpb25zID0ge1xyXG4gICAgICBmb3JtYXRTdHJpbmc6IChmb3JtYXR0ZXIgJiYgZm9ybWF0dGVyLmZvcm1hdFN0cmluZykgPyBmb3JtYXR0ZXIuZm9ybWF0U3RyaW5nIDogbnVsbCxcclxuICAgIH07XHJcblxyXG4gICAgaWYgKChmb3JtYXR0ZXIgJiYgZm9ybWF0dGVyLm9wdGlvbnMpKSB7XHJcbiAgICAgIGxhbmcubWl4aW4ob3B0aW9ucywgZm9ybWF0dGVyLm9wdGlvbnMpO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIG9wdGlvbnM7XHJcbiAgfSxcclxuICBnZXRHcm91cEZpZWxkTGFiZWxCeU5hbWU6IGZ1bmN0aW9uIGdldEdyb3VwRmllbGRMYWJlbEJ5TmFtZShuYW1lKSB7XHJcbiAgICBjb25zdCBsYXlvdXQgPSAodGhpcy5lbmFibGVPdmVycmlkZUxheW91dCAmJiB0aGlzLl9vdmVycmlkZUdyb3VwTGF5b3V0KSA/IHRoaXMuX292ZXJyaWRlR3JvdXBMYXlvdXQgOiB0aGlzLmxheW91dDtcclxuICAgIGxldCBsYXlvdXRJdGVtID0gbnVsbDtcclxuICAgIGxheW91dC5mb3JFYWNoKChpdGVtKSA9PiB7XHJcbiAgICAgIGlmIChpdGVtLnByb3BlcnR5UGF0aCA9PT0gbmFtZSkge1xyXG4gICAgICAgIGxheW91dEl0ZW0gPSBpdGVtO1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIGlmIChsYXlvdXRJdGVtKSB7XHJcbiAgICAgIHJldHVybiBsYXlvdXRJdGVtLmNhcHRpb247XHJcbiAgICB9XHJcbiAgICByZXR1cm4gJyc7XHJcbiAgfSxcclxuICBnZXRHcm91cEZpZWxkVmFsdWVCeU5hbWU6IGZ1bmN0aW9uIGdldEdyb3VwRmllbGRWYWx1ZUJ5TmFtZShlbnRyeSwgbmFtZSwgYXBwbHlGb3JtYXQsIGZvcm1hdE9wdGlvbnMpIHtcclxuICAgIGNvbnN0IGxheW91dCA9ICh0aGlzLmVuYWJsZU92ZXJyaWRlTGF5b3V0ICYmIHRoaXMuX292ZXJyaWRlR3JvdXBMYXlvdXQpID8gdGhpcy5fb3ZlcnJpZGVHcm91cExheW91dCA6IHRoaXMubGF5b3V0O1xyXG4gICAgbGV0IGxheW91dEl0ZW0gPSBudWxsO1xyXG4gICAgbGF5b3V0LmZvckVhY2goKGl0ZW0pID0+IHtcclxuICAgICAgaWYgKGl0ZW0ucHJvcGVydHlQYXRoID09PSBuYW1lKSB7XHJcbiAgICAgICAgbGF5b3V0SXRlbSA9IGl0ZW07XHJcbiAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIHRoaXMuZ2V0R3JvdXBGaWVsZFZhbHVlKGVudHJ5LCBsYXlvdXRJdGVtLCBhcHBseUZvcm1hdCwgZm9ybWF0T3B0aW9ucyk7XHJcbiAgfSxcclxuICBnZXRHcm91cEZpZWxkTGFiZWxCeUluZGV4OiBmdW5jdGlvbiBnZXRHcm91cEZpZWxkTGFiZWxCeUluZGV4KGxheW91dEluZGV4KSB7XHJcbiAgICBjb25zdCBsYXlvdXQgPSAodGhpcy5lbmFibGVPdmVycmlkZUxheW91dCAmJiB0aGlzLl9vdmVycmlkZUdyb3VwTGF5b3V0KSA/IHRoaXMuX292ZXJyaWRlR3JvdXBMYXlvdXQgOiB0aGlzLmxheW91dDtcclxuICAgIGlmIChsYXlvdXRbbGF5b3V0SW5kZXhdKSB7XHJcbiAgICAgIHJldHVybiBsYXlvdXRbbGF5b3V0SW5kZXhdLmNhcHRpb247XHJcbiAgICB9XHJcbiAgICByZXR1cm4gJyc7XHJcbiAgfSxcclxuICBnZXRHcm91cEZpZWxkVmFsdWVCeUluZGV4OiBmdW5jdGlvbiBnZXRHcm91cEZpZWxkVmFsdWVCeUluZGV4KGVudHJ5LCBsYXlvdXRJbmRleCwgYXBwbHlGb3JtYXQsIGZvcm1hdE9wdGlvbnMpIHtcclxuICAgIGNvbnN0IGxheW91dCA9ICh0aGlzLmVuYWJsZU92ZXJyaWRlTGF5b3V0ICYmIHRoaXMuX292ZXJyaWRlR3JvdXBMYXlvdXQpID8gdGhpcy5fb3ZlcnJpZGVHcm91cExheW91dCA6IHRoaXMubGF5b3V0O1xyXG4gICAgY29uc3QgbGF5b3V0SXRlbSA9IGxheW91dFtsYXlvdXRJbmRleF07XHJcbiAgICByZXR1cm4gdGhpcy5nZXRHcm91cEZpZWxkVmFsdWUoZW50cnksIGxheW91dEl0ZW0sIGFwcGx5Rm9ybWF0LCBmb3JtYXRPcHRpb25zKTtcclxuICB9LFxyXG4gIGdldEdyb3VwRmllbGRWYWx1ZTogZnVuY3Rpb24gZ2V0R3JvdXBGaWVsZFZhbHVlKGVudHJ5LCBsYXlvdXRJdGVtLCBhcHBseUZvcm1hdCwgZm9ybWF0T3B0aW9ucykge1xyXG4gICAgbGV0IHZhbHVlID0gbnVsbDtcclxuICAgIGxldCBmb3JtYXR0ZXIgPSBudWxsO1xyXG5cclxuICAgIGlmICgobGF5b3V0SXRlbSkgJiYgKGFwcGx5Rm9ybWF0KSkge1xyXG4gICAgICBjb25zdCBmaWVsZE5hbWUgPSB0aGlzLmdldEZpZWxkTmFtZUJ5TGF5b3V0KGxheW91dEl0ZW0pO1xyXG4gICAgICBpZiAoYXBwbHlGb3JtYXQpIHtcclxuICAgICAgICBmb3JtYXR0ZXIgPSB0aGlzLmdldEZvcm1hdHRlckJ5TGF5b3V0KGxheW91dEl0ZW0pO1xyXG4gICAgICB9XHJcbiAgICAgIGlmIChmb3JtYXR0ZXIpIHtcclxuICAgICAgICB2YWx1ZSA9IHRoaXMuZ3JvdXBUcmFuc2Zvcm1WYWx1ZShlbnRyeVtmaWVsZE5hbWVdLCBsYXlvdXRJdGVtLCBmb3JtYXR0ZXIsIGZvcm1hdE9wdGlvbnMpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHZhbHVlID0gZW50cnlbZmllbGROYW1lXTtcclxuICAgICAgfVxyXG4gICAgfSBlbHNlIGlmIChsYXlvdXRJdGVtKSB7XHJcbiAgICAgIGNvbnN0IGZpZWxkTmFtZSA9IHRoaXMuZ2V0RmllbGROYW1lQnlMYXlvdXQobGF5b3V0SXRlbSk7XHJcbiAgICAgIHZhbHVlID0gZW50cnlbZmllbGROYW1lXTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHZhbHVlID0gbnVsbDtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdmFsdWU7XHJcbiAgfSxcclxuICBnZXRGb3JtYXR0ZXJCeUxheW91dDogZnVuY3Rpb24gZ2V0Rm9ybWF0dGVyQnlMYXlvdXQobGF5b3V0SXRlbSkge1xyXG4gICAgaWYgKCF0aGlzLl9maWVsZEZvcm1hdHRlcnMpIHtcclxuICAgICAgdGhpcy5fZmllbGRGb3JtYXR0ZXJzID0ge307XHJcbiAgICB9XHJcbiAgICBjb25zdCBwYXRoID0gYCR7bGF5b3V0SXRlbS5wcm9wZXJ0eVBhdGh9XyR7bGF5b3V0SXRlbS5pbmRleH1gO1xyXG4gICAgbGV0IGZvcm1hdHRlciA9IHRoaXMuX2ZpZWxkRm9ybWF0dGVyc1twYXRoXTtcclxuICAgIGlmICghZm9ybWF0dGVyKSB7XHJcbiAgICAgIGZvcm1hdHRlciA9IHRoaXMuZ2V0R3JvdXBGaWVsZEZvcm1hdHRlcihsYXlvdXRJdGVtKTtcclxuICAgICAgdGhpcy5fZmllbGRGb3JtYXR0ZXJzW3BhdGhdID0gZm9ybWF0dGVyO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZvcm1hdHRlcjtcclxuICB9LFxyXG4gIGdldEdyb3VwRmllbGRGb3JtYXR0ZXI6IGZ1bmN0aW9uIGdldEdyb3VwRmllbGRGb3JtYXR0ZXIobGF5b3V0SXRlbSkge1xyXG4gICAgbGV0IGZvcm1hdHRlcjtcclxuICAgIGlmICh0aGlzLmdyb3VwRmllbGRGb3JtYXR0ZXIpIHtcclxuICAgICAgZm9ybWF0dGVyID0gdGhpcy5ncm91cEZpZWxkRm9ybWF0dGVyW2xheW91dEl0ZW0ucHJvcGVydHlQYXRoXTtcclxuICAgIH1cclxuICAgIGlmICghZm9ybWF0dGVyKSB7XHJcbiAgICAgIGZvcm1hdHRlciA9IEdyb3VwVXRpbGl0eS5nZXRGb3JtYXR0ZXJCeUxheW91dChsYXlvdXRJdGVtKTtcclxuICAgIH1cclxuICAgIHJldHVybiBmb3JtYXR0ZXI7XHJcbiAgfSxcclxuICBncm91cFRyYW5zZm9ybVZhbHVlOiBmdW5jdGlvbiBncm91cFRyYW5zZm9ybVZhbHVlKHZhbHVlLCBsYXlvdXQsIGZvcm1hdHRlciwgZm9ybWF0T3B0aW9ucykge1xyXG4gICAgdHJ5IHtcclxuICAgICAgcmV0dXJuIGZvcm1hdHRlci5mb3JtYXR0ZXIodmFsdWUsIGZvcm1hdHRlci5mb3JtYXRTdHJpbmcsIGZvcm1hdE9wdGlvbnMpO1xyXG4gICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICB9XHJcbiAgfSxcclxuICBnZXRGaWVsZE5hbWVCeUxheW91dDogZnVuY3Rpb24gZ2V0RmllbGROYW1lQnlMYXlvdXQobGF5b3V0SXRlbSkge1xyXG4gICAgcmV0dXJuIEdyb3VwVXRpbGl0eS5nZXRGaWVsZE5hbWVCeUxheW91dChsYXlvdXRJdGVtKTtcclxuICB9LFxyXG4gIF9zdGFydEdyb3VwTW9kZTogZnVuY3Rpb24gX3N0YXJ0R3JvdXBNb2RlKCkge1xyXG4gICAgaWYgKHRoaXMuX29yaWdpbmFsUHJvcHMpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuX29yaWdpbmFsUHJvcHMgPSB7fTtcclxuXHJcbiAgICBjb25zdCBvcmlnaW5hbCA9IHRoaXMuX29yaWdpbmFsUHJvcHM7XHJcblxyXG4gICAgb3JpZ2luYWwucmVxdWVzdCA9IHRoaXMucmVxdWVzdCA/IHRoaXMucmVxdWVzdC5jbG9uZSgpIDogbnVsbDtcclxuICAgIG9yaWdpbmFsLnF1ZXJ5U2VsZWN0ID0gdGhpcy5xdWVyeVNlbGVjdDtcclxuICAgIG9yaWdpbmFsLnF1ZXJ5T3JkZXJCeSA9IHRoaXMucXVlcnlPcmRlckJ5O1xyXG4gICAgb3JpZ2luYWwuaWRQcm9wZXJ0eSA9IHRoaXMuaWRQcm9wZXJ0eTtcclxuICAgIG9yaWdpbmFsLmxhYmVsUHJvcGVydHkgPSB0aGlzLmxhYmVsUHJvcGVydHk7XHJcbiAgICBvcmlnaW5hbC5zdG9yZSA9IHRoaXMuc3RvcmU7XHJcbiAgICBvcmlnaW5hbC5yb3dUZW1wbGF0ZSA9IHRoaXMucm93VGVtcGxhdGU7XHJcbiAgICBvcmlnaW5hbC5pdGVtVGVtcGxhdGUgPSB0aGlzLml0ZW1UZW1wbGF0ZTtcclxuICAgIG9yaWdpbmFsLml0ZW1Gb290ZXJUZW1wbGF0ZSA9IHRoaXMuaXRlbUZvb3RlclRlbXBsYXRlO1xyXG4gICAgb3JpZ2luYWwucmVsYXRlZFZpZXdzID0gdGhpcy5yZWxhdGVkVmlld3M7XHJcbiAgICBvcmlnaW5hbC50aXRsZSA9IHRoaXMuZ2V0KCd0aXRsZScpO1xyXG4gICAgb3JpZ2luYWwuX21vZGVsID0gdGhpcy5fbW9kZWw7XHJcblxyXG4gICAgdGhpcy5fbW9kZWwgPSBudWxsO1xyXG4gICAgdGhpcy5pdGVtRm9vdGVyVGVtcGxhdGUgPSBuZXcgU2ltcGxhdGUoWyc8ZGl2PjwvZGl2PiddKTtcclxuXHJcbiAgICB0aGlzLmdyb3Vwc01vZGUgPSB0cnVlO1xyXG4gIH0sXHJcbiAgX2NsZWFyR3JvdXBNb2RlOiBmdW5jdGlvbiBfY2xlYXJHcm91cE1vZGUoKSB7XHJcbiAgICBjb25zdCBvcmlnaW5hbCA9IHRoaXMuX29yaWdpbmFsUHJvcHM7XHJcblxyXG4gICAgdGhpcy5ncm91cHNNb2RlID0gZmFsc2U7XHJcblxyXG4gICAgaWYgKCFvcmlnaW5hbCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5yZXF1ZXN0ID0gb3JpZ2luYWwucmVxdWVzdCB8fCBudWxsO1xyXG4gICAgdGhpcy5xdWVyeVNlbGVjdCA9IG9yaWdpbmFsLnF1ZXJ5U2VsZWN0O1xyXG4gICAgdGhpcy5xdWVyeU9yZGVyQnkgPSBvcmlnaW5hbC5xdWVyeU9yZGVyQnk7XHJcbiAgICB0aGlzLmlkUHJvcGVydHkgPSBvcmlnaW5hbC5pZFByb3BlcnR5O1xyXG4gICAgdGhpcy5sYWJlbFByb3BlcnR5ID0gb3JpZ2luYWwubGFiZWxQcm9wZXJ0eTtcclxuICAgIHRoaXMuc2V0KCdzdG9yZScsIG9yaWdpbmFsLnN0b3JlKTtcclxuICAgIHRoaXMucm93VGVtcGxhdGUgPSBvcmlnaW5hbC5yb3dUZW1wbGF0ZTtcclxuICAgIHRoaXMuaXRlbVRlbXBsYXRlID0gb3JpZ2luYWwuaXRlbVRlbXBsYXRlO1xyXG4gICAgdGhpcy5yZWxhdGVkVmlld3MgPSBvcmlnaW5hbC5yZWxhdGVkVmlld3M7XHJcbiAgICB0aGlzLml0ZW1Gb290ZXJUZW1wbGF0ZSA9IG9yaWdpbmFsLml0ZW1Gb290ZXJUZW1wbGF0ZTtcclxuICAgIHRoaXMuX21vZGVsID0gb3JpZ2luYWwuX21vZGVsO1xyXG5cclxuICAgIHRoaXMuX29yaWdpbmFsUHJvcHMgPSBudWxsO1xyXG5cclxuICAgIHRoaXMuX2dyb3VwSW5pdGlhbGl6ZWQgPSBmYWxzZTtcclxuICAgIHRoaXMuX2N1cnJlbnRHcm91cCA9IG51bGw7XHJcbiAgICB0aGlzLmN1cnJlbnRHcm91cElkID0gbnVsbDtcclxuICAgIEFwcC5zZXRQcmltYXJ5VGl0bGUob3JpZ2luYWwudGl0bGUpO1xyXG4gICAgdGhpcy5zZXQoJ3RpdGxlJywgb3JpZ2luYWwudGl0bGUpO1xyXG5cclxuICAgIHRoaXMuY2xlYXIoKTtcclxuICAgIHRoaXMucmVmcmVzaFJlcXVpcmVkID0gdHJ1ZTtcclxuICB9LFxyXG4gIF9vblF1ZXJ5RXJyb3I6IGZ1bmN0aW9uIF9vblF1ZXJ5RXJyb3IocXVlcnlPcHRpb25zLCBlcnJvcikge1xyXG4gICAgaWYgKHRoaXMuZ3JvdXBzRW5hYmxlZCAmJiB0aGlzLmdyb3Vwc01vZGUpIHtcclxuICAgICAgaWYgKGVycm9yLnN0YXR1cyA9PT0gNDA0KSB7XHJcbiAgICAgICAgdHJ5IHtcclxuICAgICAgICAgIHRoaXMuX29uR3JvdXBOb3RGb3VuZCgpO1xyXG4gICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmVcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHRoaXMuaW5oZXJpdGVkKF9vblF1ZXJ5RXJyb3IsIGFyZ3VtZW50cyk7XHJcbiAgfSxcclxuICBfb25Hcm91cE5vdEZvdW5kOiBmdW5jdGlvbiBfb25Hcm91cE5vdEZvdW5kKCkge1xyXG4gICAgR3JvdXBVdGlsaXR5LnJlbW92ZUdyb3VwUHJlZmVyZW5jZXModGhpcy5jdXJyZW50R3JvdXBJZCwgdGhpcy5lbnRpdHlOYW1lKTtcclxuICAgIHRoaXMucmVmcmVzaFJpZ2h0RHJhd2VyKCk7XHJcbiAgICAkKHRoaXMuZG9tTm9kZSkucmVtb3ZlQ2xhc3MoJ2xpc3QtbG9hZGluZycpO1xyXG4gICAgdGhpcy5zZXQoJ2xpc3RDb250ZW50JywgdGhpcy5jdXJyZW50R291cE5vdEZvdW5kVGVtcGxhdGUuYXBwbHkodGhpcykpO1xyXG4gIH0sXHJcbiAgYWN0aXZhdGVFbnRyeTogZnVuY3Rpb24gYWN0aXZhdGVFbnRyeShwYXJhbXMpIHtcclxuICAgIGlmICh0aGlzLmdyb3Vwc0VuYWJsZWQgJiYgdGhpcy5ncm91cHNNb2RlICYmICFwYXJhbXMucmVzb2x2ZWQpIHtcclxuICAgICAgdGhpcy5fZ3JvdXBBY3RpdmF0ZUVudHJ5KHBhcmFtcyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmluaGVyaXRlZChhY3RpdmF0ZUVudHJ5LCBhcmd1bWVudHMpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgX2dyb3VwQWN0aXZhdGVFbnRyeTogZnVuY3Rpb24gX2dyb3VwQWN0aXZhdGVFbnRyeShwYXJhbXMpIHtcclxuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xyXG5cclxuICAgIGlmIChwYXJhbXMua2V5KSB7XHJcbiAgICAgIGNvbnN0IHJlc29sdmVkRW50cnkgPSB0aGlzLl9nZXRSZXNvbHZlZEVudHJ5KHBhcmFtcy5rZXkpO1xyXG4gICAgICBpZiAoIXJlc29sdmVkRW50cnkpIHtcclxuICAgICAgICB0aGlzLl9mZXRjaFJlc29sdmVkRW50cnkocGFyYW1zLmtleSkudGhlbigocmVzb2x2ZWRFbnQpID0+IHtcclxuICAgICAgICAgIHBhcmFtcy5kZXNjcmlwdG9yID0gcmVzb2x2ZWRFbnQuJGRlc2NyaXB0b3I7XHJcbiAgICAgICAgICBwYXJhbXMucmVzb2x2ZWQgPSB0cnVlO1xyXG4gICAgICAgICAgc2VsZi5hY3RpdmF0ZUVudHJ5KHBhcmFtcyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcGFyYW1zLmRlc2NyaXB0b3IgPSByZXNvbHZlZEVudHJ5LiRkZXNjcmlwdG9yO1xyXG4gICAgICAgIHBhcmFtcy5yZXNvbHZlZCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5hY3RpdmF0ZUVudHJ5KHBhcmFtcyk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9LFxyXG4gIF9pbnZva2VBY3Rpb246IGZ1bmN0aW9uIF9pbnZva2VBY3Rpb24odGhlQWN0aW9uLCBzZWxlY3Rpb24gPSB7fSkge1xyXG4gICAgaWYgKHRoaXMuZ3JvdXBzRW5hYmxlZCAmJiB0aGlzLmdyb3Vwc01vZGUgJiYgIXNlbGVjdGlvbi5yZXNvbHZlZCkge1xyXG4gICAgICB0aGlzLl9ncm91cEludm9rZUFjdGlvbih0aGVBY3Rpb24sIHNlbGVjdGlvbik7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmluaGVyaXRlZChfaW52b2tlQWN0aW9uLCBhcmd1bWVudHMpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgX2dyb3VwSW52b2tlQWN0aW9uOiBmdW5jdGlvbiBfZ3JvdXBJbnZva2VBY3Rpb24odGhlQWN0aW9uLCBzZWxlY3Rpb24pIHtcclxuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xyXG4gICAgY29uc3QgcmVzb2x2ZWRFbnRyeSA9IHRoaXMuX2dldFJlc29sdmVkRW50cnkoc2VsZWN0aW9uLmRhdGEuJGtleSk7XHJcbiAgICBpZiAoIXJlc29sdmVkRW50cnkpIHtcclxuICAgICAgdGhpcy5fZmV0Y2hSZXNvbHZlZEVudHJ5KHNlbGVjdGlvbi5kYXRhLiRrZXkpLnRoZW4oKHJlc29sdmVkRW50KSA9PiB7XHJcbiAgICAgICAgc2VsZi5faW52b2tlQWN0aW9uKHRoZUFjdGlvbiwge1xyXG4gICAgICAgICAgZGF0YTogcmVzb2x2ZWRFbnQsXHJcbiAgICAgICAgICByZXNvbHZlZDogdHJ1ZSxcclxuICAgICAgICB9KTtcclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLl9pbnZva2VBY3Rpb24odGhlQWN0aW9uLCB7XHJcbiAgICAgICAgZGF0YTogcmVzb2x2ZWRFbnRyeSxcclxuICAgICAgICByZXNvbHZlZDogdHJ1ZSxcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBzaG93QWN0aW9uUGFuZWw6IGZ1bmN0aW9uIHNob3dBY3Rpb25QYW5lbChyb3dOb2RlKSB7XHJcbiAgICBpZiAodGhpcy5ncm91cHNFbmFibGVkICYmIHRoaXMuZ3JvdXBzTW9kZSkge1xyXG4gICAgICB0aGlzLl9ncm91cFNob3dBY3Rpb25QYW5lbChyb3dOb2RlKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMuaW5oZXJpdGVkKHNob3dBY3Rpb25QYW5lbCwgYXJndW1lbnRzKTtcclxuICAgIH1cclxuICB9LFxyXG4gIF9ncm91cFNob3dBY3Rpb25QYW5lbDogZnVuY3Rpb24gX2dyb3VwU2hvd0FjdGlvblBhbmVsKHJvd05vZGUpIHtcclxuICAgIGNvbnN0IHNlbGVjdGlvbiA9IHRoaXMuX2dldEN1cnJlbnRTZWxlY3Rpb24oKTtcclxuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xyXG4gICAgY29uc3QgcmVzb2x2ZWRFbnRyeSA9IHRoaXMuX2dldFJlc29sdmVkRW50cnkoc2VsZWN0aW9uLmRhdGEuJGtleSk7XHJcbiAgICBpZiAoIXJlc29sdmVkRW50cnkpIHtcclxuICAgICAgdGhpcy5fZmV0Y2hSZXNvbHZlZEVudHJ5KHNlbGVjdGlvbi5kYXRhLiRrZXkpLnRoZW4oKHJlc29sdmVkRW50KSA9PiB7XHJcbiAgICAgICAgc2VsZi5fZ3JvdXBDaGVja0FjdGlvblN0YXRlKHJlc29sdmVkRW50LCByb3dOb2RlKTtcclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLl9ncm91cENoZWNrQWN0aW9uU3RhdGUocmVzb2x2ZWRFbnRyeSwgcm93Tm9kZSk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBfZ3JvdXBBcHBseUFjdGlvblBhbmVsOiBmdW5jdGlvbiBfZ3JvdXBBcHBseUFjdGlvblBhbmVsKHJvd05vZGUpIHtcclxuICAgIF9MaXN0QmFzZS5wcm90b3R5cGUuc2hvd0FjdGlvblBhbmVsLmNhbGwodGhpcywgcm93Tm9kZSk7XHJcbiAgfSxcclxuICBfZ2V0Q3VycmVudFNlbGVjdGlvbjogZnVuY3Rpb24gX2dldEN1cnJlbnRTZWxlY3Rpb24oKSB7XHJcbiAgICBjb25zdCBzZWxlY3RlZEl0ZW1zID0gdGhpcy5nZXQoJ3NlbGVjdGlvbk1vZGVsJykuZ2V0U2VsZWN0aW9ucygpO1xyXG4gICAgbGV0IHNlbGVjdGlvbjtcclxuICAgIGZvciAoY29uc3Qga2V5IGluIHNlbGVjdGVkSXRlbXMpIHtcclxuICAgICAgaWYgKHNlbGVjdGVkSXRlbXMuaGFzT3duUHJvcGVydHkoa2V5KSkge1xyXG4gICAgICAgIHNlbGVjdGlvbiA9IHNlbGVjdGVkSXRlbXNba2V5XTtcclxuICAgICAgICBzZWxlY3Rpb24uZGF0YS4ka2V5ID0ga2V5O1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc2VsZWN0aW9uO1xyXG4gIH0sXHJcbiAgX2ZldGNoUmVzb2x2ZWRFbnRyeTogZnVuY3Rpb24gX2ZldGNoUmVzb2x2ZWRFbnRyeShlbnRyeUtleSkge1xyXG4gICAgY29uc3QgZGVmID0gbmV3IERlZmVycmVkKCk7XHJcbiAgICBjb25zdCBzZWxmID0gdGhpcztcclxuICAgIGNvbnN0IHN0b3JlID0gbmV3IFNEYXRhU3RvcmUoe1xyXG4gICAgICBzZXJ2aWNlOiBBcHAuc2VydmljZXMuY3JtLFxyXG4gICAgICByZXNvdXJjZUtpbmQ6IHRoaXMucmVzb3VyY2VLaW5kLFxyXG4gICAgICBjb250cmFjdE5hbWU6IHRoaXMuY29udHJhY3ROYW1lLFxyXG4gICAgICBzY29wZTogdGhpcyxcclxuICAgIH0pO1xyXG5cclxuICAgIGxldCBzZWxlY3QgPSB0aGlzLl9vcmlnaW5hbFByb3BzLnF1ZXJ5U2VsZWN0O1xyXG5cclxuICAgIC8vIFVzZSBxdWVyeVNlbGVjdCBmcm9tIHRoZSBtb2RlbCBpZiBhdmFpbGFibGVcclxuICAgIC8vIFRPRE86IEV4cG9zZSBfZ2V0UXVlcnlNb2RlbEJ5TmFtZSBiZXR0ZXIgc29tZWhvd1xyXG4gICAgaWYgKHRoaXMuX29yaWdpbmFsUHJvcHMuX21vZGVsKSB7XHJcbiAgICAgIGNvbnN0IHF1ZXJ5TW9kZWwgPSB0aGlzLl9vcmlnaW5hbFByb3BzLl9tb2RlbC5fZ2V0UXVlcnlNb2RlbEJ5TmFtZSgnbGlzdCcpO1xyXG4gICAgICBpZiAocXVlcnlNb2RlbCAmJiBxdWVyeU1vZGVsLnF1ZXJ5U2VsZWN0KSB7XHJcbiAgICAgICAgc2VsZWN0ID0gcXVlcnlNb2RlbC5xdWVyeVNlbGVjdDtcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0IHF1ZXJ5T3B0aW9ucyA9IHtcclxuICAgICAgc2VsZWN0LFxyXG4gICAgICB3aGVyZTogYElkIGVxICcke2VudHJ5S2V5fSdgLFxyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBxdWVyeVJlc3VsdHMgPSBzdG9yZS5xdWVyeShudWxsLCBxdWVyeU9wdGlvbnMpO1xyXG5cclxuICAgIHdoZW4ocXVlcnlSZXN1bHRzLCAoZmVlZCkgPT4ge1xyXG4gICAgICBjb25zdCBlbnRyeSA9IGZlZWRbMF07XHJcbiAgICAgIGVudHJ5W3NlbGYuaWRQcm9wZXJ0eV0gPSBlbnRyeS4ka2V5OyAvLyB3ZSBuZWVkIHRoaXMgYmVjYXVzZSB0aGUgZ3JvdXAga2V5IGlzIGRpZmZlcmVudCwgYW5kIGl0IHVzZWQgbGF0ZXIgb24gd2hlbiBpbnZva2luZyBhbiBhY3Rpb247XHJcbiAgICAgIHNlbGYuX2FkZFJlc29sdmVkRW50cnkoZW50cnkpO1xyXG4gICAgICBkZWYucmVzb2x2ZShlbnRyeSk7XHJcbiAgICB9LCAoZXJyKSA9PiB7XHJcbiAgICAgIGRlZi5yZWplY3QoZXJyKTtcclxuICAgIH0pO1xyXG5cclxuICAgIHJldHVybiBkZWYucHJvbWlzZTtcclxuICB9LFxyXG4gIF9jbGVhclJlc29sdmVkRW50cnlDYWNoZTogZnVuY3Rpb24gX2NsZWFyUmVzb2x2ZWRFbnRyeUNhY2hlKCkge1xyXG4gICAgdGhpcy5fcmVzb2x2ZWRFbnRyeUNhY2hlID0ge307XHJcbiAgfSxcclxuICBfZ2V0UmVzb2x2ZWRFbnRyeTogZnVuY3Rpb24gX2dldFJlc29sdmVkRW50cnkoZW50cnlLZXkpIHtcclxuICAgIGlmICghdGhpcy5fcmVzb2x2ZWRFbnRyeUNhY2hlKSB7XHJcbiAgICAgIHRoaXMuX3Jlc29sdmVkRW50cnlDYWNoZSA9IHt9O1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRoaXMuX3Jlc29sdmVkRW50cnlDYWNoZVtlbnRyeUtleV07XHJcbiAgfSxcclxuICBfYWRkUmVzb2x2ZWRFbnRyeTogZnVuY3Rpb24gX2FkZFJlc29sdmVkRW50cnkoZW50cnkpIHtcclxuICAgIHRoaXMuX3Jlc29sdmVkRW50cnlDYWNoZVtlbnRyeS4ka2V5XSA9IGVudHJ5O1xyXG4gIH0sXHJcbiAgX2dyb3VwQ2hlY2tBY3Rpb25TdGF0ZTogZnVuY3Rpb24gX2dyb3VwQ2hlY2tBY3Rpb25TdGF0ZShyZXNvbHZlZEVudHJ5LCByb3dOb2RlKSB7XHJcbiAgICBjb25zdCByZXNvbHZlZFNlbGVjdGlvbiA9IHtcclxuICAgICAgZGF0YTogcmVzb2x2ZWRFbnRyeSxcclxuICAgIH07XHJcbiAgICB0aGlzLl9hcHBseVN0YXRlVG9BY3Rpb25zKHJlc29sdmVkU2VsZWN0aW9uLCByb3dOb2RlKTtcclxuICB9LFxyXG4gIF9yZWZyZXNoTGlzdDogZnVuY3Rpb24gX3JlZnJlc2hMaXN0KCkge1xyXG4gICAgY29uc3Qgc2VsZiA9IHRoaXM7XHJcbiAgICBpZiAodGhpcy5ncm91cHNFbmFibGVkICYmIHRoaXMuZ3JvdXBMaXN0ICYmIHRoaXMuX2N1cnJlbnRHcm91cCkge1xyXG4gICAgICB0aGlzLl9yZXF1ZXN0R3JvdXAodGhpcy5fY3VycmVudEdyb3VwLm5hbWUsIHRoaXMuX2N1cnJlbnRHcm91cC4ka2V5LCBmdW5jdGlvbiBjaGVja0dyb3VwKHJlc3VsdHMpIHtcclxuICAgICAgICBjb25zdCBncm91cCA9IHJlc3VsdHNbMF07XHJcbiAgICAgICAgaWYgKGdyb3VwKSB7XHJcbiAgICAgICAgICBHcm91cFV0aWxpdHkuYWRkVG9Hcm91cFByZWZlcmVuY2VzKFtncm91cF0sIHRoaXMuZW50aXR5TmFtZSk7XHJcbiAgICAgICAgICBzZWxmLnNldEN1cnJlbnRHcm91cChncm91cCk7XHJcbiAgICAgICAgICB0aGlzLnJlZnJlc2hSaWdodERyYXdlcigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBOb3RlIHRoaXMgaXMgd2hhdCB0aGlzLmluaGVyaXRlZChfcmVmcmVzaExpc3QsIGFyZ3VtZW50cykgY2FsbHMsIGJ1dCB0aGF0IG1heSBjaGFuZ2VcclxuICAgICAgICAvLyBDYW4ndCBjYWxsIHRoaXMuaW5oZXJpdGVkIGFzeW5jaHJvbm91c2x5Li4uXHJcbiAgICAgICAgc2VsZi5mb3JjZVJlZnJlc2goKTtcclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmluaGVyaXRlZChfcmVmcmVzaExpc3QsIGFyZ3VtZW50cyk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBncm91cEludm9rZUxpc3RBY3Rpb246IGZ1bmN0aW9uIGdyb3VwSW52b2tlTGlzdEFjdGlvbihwYXJhbXMpIHtcclxuICAgIGNvbnN0IGtleSA9IHBhcmFtcy5rZXk7XHJcbiAgICBjb25zdCBwcm9wZXJ0eU5hbWUgPSBwYXJhbXMucHJvcGVydHluYW1lO1xyXG4gICAgY29uc3QgYWN0aW9uTmFtZSA9IHBhcmFtcy5uYW1lO1xyXG4gICAgY29uc3QgcmVzb2x2ZWRFbnRyeSA9IHRoaXMuX2dldFJlc29sdmVkRW50cnkoa2V5KTtcclxuICAgIGlmICghcmVzb2x2ZWRFbnRyeSkge1xyXG4gICAgICB0aGlzLl9mZXRjaFJlc29sdmVkRW50cnkoa2V5KS50aGVuKChyZXNvbHZlZEVudCkgPT4ge1xyXG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XHJcbiAgICAgICAgICBzZWxlY3Rpb246IHtcclxuICAgICAgICAgICAgZGF0YTogcmVzb2x2ZWRFbnQsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgcHJvcGVydHlOYW1lLFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5ncm91cEludm9rZUFjdGlvbkJ5TmFtZShhY3Rpb25OYW1lLCBvcHRpb25zKTtcclxuICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICBjb25zdCBvcHRpb25zID0ge1xyXG4gICAgICAgIHNlbGVjdGlvbjoge1xyXG4gICAgICAgICAgZGF0YTogcmVzb2x2ZWRFbnRyeSxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHByb3BlcnR5TmFtZSxcclxuICAgICAgfTtcclxuICAgICAgdGhpcy5ncm91cEludm9rZUFjdGlvbkJ5TmFtZShhY3Rpb25OYW1lLCBvcHRpb25zKTtcclxuICAgIH1cclxuICB9LFxyXG4gIGdyb3VwSW52b2tlQWN0aW9uQnlOYW1lOiBmdW5jdGlvbiBncm91cEludm9rZUFjdGlvbkJ5TmFtZShhY3Rpb25OYW1lLCBvcHRpb25zKSB7XHJcbiAgICBsZXQgb3B0ID0gb3B0aW9ucztcclxuICAgIGlmICghb3B0KSB7XHJcbiAgICAgIG9wdCA9IHt9O1xyXG4gICAgfVxyXG4gICAgc3dpdGNoIChhY3Rpb25OYW1lKSB7XHJcbiAgICAgIGNhc2UgJ2NhbGxQaG9uZSc6XHJcbiAgICAgICAgYWN0aW9uLmNhbGxQaG9uZS5jYWxsKHRoaXMsIG51bGwsIG9wdC5zZWxlY3Rpb24sIG9wdC5wcm9wZXJ0eU5hbWUsIEFjdGl2aXR5VHlwZVRleHQuYXRQaG9uZUNhbGwpO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdzZW5kRW1haWwnOlxyXG4gICAgICAgIGFjdGlvbi5zZW5kRW1haWwuY2FsbCh0aGlzLCBudWxsLCBvcHQuc2VsZWN0aW9uLCBvcHQucHJvcGVydHlOYW1lKTtcclxuICAgICAgICBicmVhaztcclxuICAgICAgZGVmYXVsdDpcclxuICAgICAgICBicmVhaztcclxuICAgIH1cclxuICB9LFxyXG4gIGdldENvbnRleHRTbmFwU2hvdDogZnVuY3Rpb24gZ2V0Q29udGV4dFNuYXBTaG90KG9wdGlvbnMpIHtcclxuICAgIGxldCBzbmFwU2hvdDtcclxuICAgIGlmICh0aGlzLl9ncm91cEluaXRpYWxpemVkICYmIHRoaXMuZ3JvdXBzTW9kZSkge1xyXG4gICAgICBjb25zdCBlbnRyeSA9IHRoaXMuZW50cmllc1tvcHRpb25zLmtleV07XHJcbiAgICAgIGNvbnN0IHRlbXBsYXRlID0gdGhpcy5yb3dUZW1wbGF0ZTtcclxuICAgICAgc25hcFNob3QgPSB0ZW1wbGF0ZS5hcHBseShlbnRyeSwgdGhpcyk7XHJcbiAgICAgIHJldHVybiBzbmFwU2hvdDtcclxuICAgIH1cclxuICAgIHNuYXBTaG90ID0gdGhpcy5pbmhlcml0ZWQoZ2V0Q29udGV4dFNuYXBTaG90LCBhcmd1bWVudHMpO1xyXG5cclxuICAgIHJldHVybiBzbmFwU2hvdDtcclxuICB9LFxyXG4gIGluaXRNb2RlbDogZnVuY3Rpb24gaW5pdE1vZGVsKCkge1xyXG4gICAgaWYgKCF0aGlzLl9ncm91cEluaXRpYWxpemVkIHx8ICF0aGlzLmdyb3Vwc01vZGUpIHtcclxuICAgICAgdGhpcy5pbmhlcml0ZWQoaW5pdE1vZGVsLCBhcmd1bWVudHMpO1xyXG4gICAgfVxyXG4gIH0sXHJcbn0pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgX19jbGFzcztcclxuIl19
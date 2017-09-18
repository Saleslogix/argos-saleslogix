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

import declare from 'dojo/_base/declare';
import json from 'dojo/json';
import utility from 'argos/Utility';
import _ListBase from 'argos/_ListBase';
import GroupUtility from '../GroupUtility';
import when from 'dojo/when';
import lang from 'dojo/_base/lang';
import SDataStore from 'argos/Store/SData';
import Deferred from 'dojo/Deferred';
import action from '../Action';
import ActivityTypeText from '../Models/Activity/ActivityTypeText';
import getResource from 'argos/I18n';


const resource = getResource('groupListMixin');

/**
 * @class crm.Views._GroupListMixin
 * @classdesc Mixin for slx group list layouts.
 * @since 3.1
 */
const __class = declare('crm.Views._GroupListMixin', null, {
  noDefaultGroupText: resource.noDefaultGroupText,
  currentGroupNotFoundText: resource.currentGroupNotFoundText,
  groupTemplateSummaryText: resource.groupTemplateSummaryText,
  groupTemplateDetailText: resource.groupTemplateDetailText,
  groupsModeText: resource.groupsModeText,
  hasDefaultGroup: true,
  noDefaultGroupTemplate: new Simplate([
    '<li class="no-data" data-action="openConfigure">',
    '<p class="listview-heading">{%= $$._getNoDefaultGroupMessage() %}</p>',
    '</li>',
  ]),
  currentGoupNotFoundTemplate: new Simplate([
    '<li class="no-data">',
    '<p class="listview-heading">{%= $$._getCurrentGroupNotFoundMessage() %}</p>',
    '</li>',
  ]),

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
    return utility.joinFields(sep, fields);
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
      GroupUtility.setDefaultGroupPreference(this.entityName, group.name);
    }
  },
  getDefaultGroup: function getDefaultGroup() {
    let defaultGroup = null;
    let defaultGroupName = null;

    defaultGroup = GroupUtility.getDefaultGroup(this.entityName);

    if (defaultGroup) {
      return defaultGroup;
    }

    defaultGroupName = GroupUtility.getDefaultGroupPreference(this.entityName);
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
    this._requestOverrideGroupLayout().then((result) => {
      this._overrideLayoutInitalized = true;
      this._overrideGroupLayout = (result && (result.length > 0)) ? result[0].layout : null;
      this.initGroup();
    });
  },
  initGroup: function initGroup() {
    if (this.enableOverrideLayout && !this._overrideLayoutInitalized && !this._overrideGroupLayout) {
      this.initOverrideGroupLayout();
      return;
    }
    let group = this.getCurrentGroup();

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
    const title = this.getGroupTitle(group);
    App.setPrimaryTitle(title);
    this.set('title', title);

    if (this._groupInitialized) {
      return;
    }

    this.layout = GroupUtility.getLayout(group);
    this.selectColumns = GroupUtility.getColumnNames(this.layout);
    this.itemTemplate = this.getItemTemplate();

    // Create a custom request that the store will use to execute the group query
    this.request = GroupUtility.createGroupRequest({
      groupId: group.$key,
      connection: this.getConnection(),
    });

    // Try to select the entity id as well
    this.selectColumns.push(`${group.family}ID`);
    this.querySelect = this.selectColumns;
    this.queryOrderBy = '';
    this.idProperty = `${group.family.toUpperCase()}ID`;
    this.labelProperty = group.family.toUpperCase();
    this.store = null;
    this.clear(true);
    this.refreshRequired = true;
    this._groupInitialized = true;
    this.requestData();
  },
  _requestOverrideGroupLayout: function _requestOverrideGroupLayout() {
    const def = new Deferred();
    const groupName = this.overrideGroupLayoutName;
    const store = new SDataStore({
      service: App.services.crm,
      resourceKind: 'groups',
      contractName: 'system',
      where: `((upper(family) eq '${this.entityName.toUpperCase()}') and (upper(Name) eq '${groupName.toUpperCase()}'))`,
      include: ['layout', 'tableAliases'],
      idProperty: '$key',
      applicationName: 'slx',
      scope: this,
    });

    if (store) {
      const queryResults = store.query();
      when(queryResults, (relatedFeed) => {
        def.resolve(relatedFeed);
      }, () => {
        def.resolve(null);
      });
    }
    return def.promise;
  },
  _requestGroup: function _requestGroup(groupName, groupId, onSuccess) {
    let store;
    if (typeof groupName === 'string' && groupName !== '') {
      store = new SDataStore({
        service: App.services.crm,
        resourceKind: 'groups',
        contractName: 'system',
        where: `((upper(family) eq '${this.entityName.toUpperCase()}') and (upper(Name) eq '${groupName.toUpperCase()}') or PluginId eq '${groupId}')`,
        include: ['layout', 'tableAliases'],
        idProperty: '$key',
        applicationName: 'slx',
        scope: this,
      });
    }

    if (store) {
      const queryResults = store.query();

      (function queryWhen(context, queryResult) {
        try {
          when(queryResult, function queryResultFn(groupFeed) {
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
    const group = this._currentGroup;

    if (group) {
      const title = this.getGroupTitle(group);
      this.set('title', title);
    }

    this.inherited(arguments);
  },
  _onGroupRequestSuccess: function _onGroupRequestSuccess(result) {
    if (result.length > 0) {
      const group = result[0];
      this.setCurrentGroup(group);
      GroupUtility.addToGroupPreferences([group], this.entityName);
      this._onApplyGroup(group);
    } else {
      const title = this.getGroupTitle();
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
  _onGroupRequestFaild: function _onGroupRequestFaild() {

  },
  getGroupTitle: function getGroupTitle(group) {
    return group.displayName;
  },
  getItemTemplate: function getItemTemplate() {
    const layout = (this.enableOverrideLayout && this._overrideGroupLayout) ? this._overrideGroupLayout : this.layout;
    if (this.enableDynamicGroupLayout) {
      const layoutTemplate = this.getSelectedGroupLayoutTemplate();
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
    const template = layout.map(this.getItemLayoutTemplate);
    return new Simplate(template);
  },
  getItemLayoutTemplate: function getItemLayoutTemplate(item) {
    const jsonString = json.stringify(item);
    const template = ['<p class="micro-text"><span class="group-label">', item.caption, `</span> <span class="group-entry">{%= $$.groupTransformValue($[$$.getFieldNameByLayout(${jsonString})],${jsonString},$$.getFormatterByLayout(${jsonString})) %}</span>`, '</p>'].join('');

    return template;
  },
  defaultGroupLayoutItemTemplate: new Simplate([
    '<p class="micro-text">{%= $$.getGroupFieldValueByIndex($, 0, true) %}</p>',
    '<p class="micro-text"><span class="group-label">{%= $$.getGroupFieldLabelByIndex(1) %} </span><span class="group-entry">{%= $$.getGroupFieldValueByIndex($, 1, true) %}</span></p>',
    '<p class="micro-text"><span class="group-label">{%= $$.getGroupFieldLabelByIndex(2) %} </span><span class="group-entry">{%= $$.getGroupFieldValueByIndex($, 2, true) %}</span></p>',
  ]),
  createGroupTemplateLayouts: function createGroupTemplateLayouts() {
    this.groupTemplateLayouts = [{
      name: 'Summary',
      displayName: resource.groupTemplateSummaryText,
      type: 'Dynamic',
      options: {
        columns: [{
          id: 'col1',
          rows: 3,
        }],
      },
    }, {
      name: 'Detail',
      displayName: resource.groupTemplateDetailText,
      type: 'Dynamic',
      options: {
        columns: [{
          id: 'col1',
          rows: 3,
        }, {
          id: 'col2',
          rows: 3,
        }, {
          id: 'col3',
          rows: 3,
        }],
      },
    }];

    return this.groupTemplateLayouts;
  },
  getSelectedGroupLayoutTemplate: function getSelectedGroupLayoutTemplate() {
    let name = GroupUtility.getSelectedGroupLayoutTemplate(this.entityName);
    name = (name) ? name : '';
    let layoutTemplate = null;
    this.groupTemplateLayouts.forEach((item) => {
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
    const layoutOptions = this.applyDynamicLayoutOptions(options);
    let rows = 0;
    let columns = 1;
    let column = 1;
    let row = 1;
    columns = layoutOptions.columns.length;
    layoutOptions.columns.forEach((item) => {
      rows = rows + item.rows;
    });

    const template = [];
    template.push('<div class="group-item">');
    template.push('<p>');
    template.push(`{%= $$.getGroupFieldValueByName($,"${layout[0].propertyPath}", true) %}`);
    template.push('</p">');
    for (let i = 0; i < layout.length; i++) {
      const columnItem = layoutOptions.columns[column - 1];
      if ((columnItem) && (column <= columns) && (i !== 0)) {
        if (row === 1) {
          const columnClass = columnItem.clss || '';
          template.push(`<div class="micro-text group-column ${columnClass}">`);
        }
        const item = layout[i];
        if (item && (columnItem.rows > 0)) {
          if (i !== 0) {
            template.push('<div>');
            if (!columnItem.hideLabels) {
              template.push(`<span class="group-label">${this.getGroupFieldLabelByName(item.propertyPath)} </span>`);
            }

            const formatOptions = this.getGroupFieldFormatOptions(item);
            const formatClss = formatOptions.clss || '';
            const jsonString = json.stringify(formatOptions);
            if (item.format === 'Phone') {
              template.push(`<span class="hyperlink" data-action="groupInvokeListAction" data-name="callPhone" data-key="{%:$$.getGroupItemKey($)%}" data-propertyname="${item.propertyPath}">{%= $$.getGroupFieldValueByName($,"${item.propertyPath}", true,${jsonString}) %}</span>`);
            } else if (item.propertyPath === 'Email') {
              template.push(`<span class="hyperlink" data-action="groupInvokeListAction" data-name="sendEmail" data-key="{%:$$.getGroupItemKey($)%}" data-propertyname="${item.propertyPath}">{%= $$.getGroupFieldValueByName($,"${item.propertyPath}", true,${jsonString}) %}</span>`);
            } else {
              template.push(`<span class="group-entry ${formatClss}">{%= $$.getGroupFieldValueByName($,"${item.propertyPath}", true,${jsonString}) %}</span>`);
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
    const layoutOptions = {
      columns: [{
        rows: 3,
      }],
    };
    lang.mixin(layoutOptions, options);
    return layoutOptions;
  },
  getGroupItemKey: function getGroupItemKey(groupEntry) {
    return groupEntry[this.idProperty];
  },
  getGroupFieldFormatOptions: function getGroupFieldFormatOptions(layoutItem) {
    const formatter = this.getFormatterByLayout(layoutItem);
    const options = {
      formatString: (formatter && formatter.formatString) ? formatter.formatString : null,
    };

    if ((formatter && formatter.options)) {
      lang.mixin(options, formatter.options);
    }
    return options;
  },
  getGroupFieldLabelByName: function getGroupFieldLabelByName(name) {
    const layout = (this.enableOverrideLayout && this._overrideGroupLayout) ? this._overrideGroupLayout : this.layout;
    let layoutItem = null;
    layout.forEach((item) => {
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
    const layout = (this.enableOverrideLayout && this._overrideGroupLayout) ? this._overrideGroupLayout : this.layout;
    let layoutItem = null;
    layout.forEach((item) => {
      if (item.propertyPath === name) {
        layoutItem = item;
      }
    });
    return this.getGroupFieldValue(entry, layoutItem, applyFormat, formatOptions);
  },
  getGroupFieldLabelByIndex: function getGroupFieldLabelByIndex(layoutIndex) {
    const layout = (this.enableOverrideLayout && this._overrideGroupLayout) ? this._overrideGroupLayout : this.layout;
    if (layout[layoutIndex]) {
      return layout[layoutIndex].caption;
    }
    return '';
  },
  getGroupFieldValueByIndex: function getGroupFieldValueByIndex(entry, layoutIndex, applyFormat, formatOptions) {
    const layout = (this.enableOverrideLayout && this._overrideGroupLayout) ? this._overrideGroupLayout : this.layout;
    const layoutItem = layout[layoutIndex];
    return this.getGroupFieldValue(entry, layoutItem, applyFormat, formatOptions);
  },
  getGroupFieldValue: function getGroupFieldValue(entry, layoutItem, applyFormat, formatOptions) {
    let value = null;
    let formatter = null;

    if ((layoutItem) && (applyFormat)) {
      const fieldName = this.getFieldNameByLayout(layoutItem);
      if (applyFormat) {
        formatter = this.getFormatterByLayout(layoutItem);
      }
      if (formatter) {
        value = this.groupTransformValue(entry[fieldName], layoutItem, formatter, formatOptions);
      } else {
        value = entry[fieldName];
      }
    } else if (layoutItem) {
      const fieldName = this.getFieldNameByLayout(layoutItem);
      value = entry[fieldName];
    } else {
      value = null;
    }

    return value;
  },
  getFormatterByLayout: function getFormatterByLayout(layoutItem) {
    if (!this._fieldFormatters) {
      this._fieldFormatters = {};
    }
    const path = `${layoutItem.propertyPath}_${layoutItem.index}`;
    let formatter = this._fieldFormatters[path];
    if (!formatter) {
      formatter = this.getGroupFieldFormatter(layoutItem);
      this._fieldFormatters[path] = formatter;
    }
    return formatter;
  },
  getGroupFieldFormatter: function getGroupFieldFormatter(layoutItem) {
    let formatter;
    if (this.groupFieldFormatter) {
      formatter = this.groupFieldFormatter[layoutItem.propertyPath];
    }
    if (!formatter) {
      formatter = GroupUtility.getFormatterByLayout(layoutItem);
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
    return GroupUtility.getFieldNameByLayout(layoutItem);
  },
  _startGroupMode: function _startGroupMode() {
    if (this._originalProps) {
      return;
    }

    this._originalProps = {};

    const original = this._originalProps;

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
    const original = this._originalProps;

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
    GroupUtility.removeGroupPreferences(this.currentGroupId, this.entityName);
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
    const self = this;

    if (params.key) {
      const resolvedEntry = this._getResolvedEntry(params.key);
      if (!resolvedEntry) {
        this._fetchResolvedEntry(params.key).then((resolvedEnt) => {
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
  _invokeAction: function _invokeAction(theAction, selection = {}) {
    if (this.groupsEnabled && this.groupsMode && !selection.resolved) {
      this._groupInvokeAction(theAction, selection);
    } else {
      this.inherited(arguments);
    }
  },
  _groupInvokeAction: function _groupInvokeAction(theAction, selection) {
    const self = this;
    const resolvedEntry = this._getResolvedEntry(selection.data.$key);
    if (!resolvedEntry) {
      this._fetchResolvedEntry(selection.data.$key).then((resolvedEnt) => {
        self._invokeAction(theAction, {
          data: resolvedEnt,
          resolved: true,
        });
      });
    } else {
      this._invokeAction(theAction, {
        data: resolvedEntry,
        resolved: true,
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
    const selection = this._getCurrentSelection();
    const self = this;
    const resolvedEntry = this._getResolvedEntry(selection.data.$key);
    if (!resolvedEntry) {
      this._fetchResolvedEntry(selection.data.$key).then((resolvedEnt) => {
        self._groupCheckActionState(resolvedEnt, rowNode);
      });
    } else {
      this._groupCheckActionState(resolvedEntry, rowNode);
    }
  },
  _groupApplyActionPanel: function _groupApplyActionPanel(rowNode) {
    _ListBase.prototype.showActionPanel.call(this, rowNode);
  },
  _getCurrentSelection: function _getCurrentSelection() {
    const selectedItems = this.get('selectionModel').getSelections();
    let selection;
    for (const key in selectedItems) {
      if (selectedItems.hasOwnProperty(key)) {
        selection = selectedItems[key];
        selection.data.$key = key;
        break;
      }
    }
    return selection;
  },
  _fetchResolvedEntry: function _fetchResolvedEntry(entryKey) {
    const def = new Deferred();
    const self = this;
    const store = new SDataStore({
      service: App.services.crm,
      resourceKind: this.resourceKind,
      contractName: this.contractName,
      scope: this,
    });

    let select = this._originalProps.querySelect;

    // Use querySelect from the model if available
    // TODO: Expose _getQueryModelByName better somehow
    if (this._originalProps._model) {
      const queryModel = this._originalProps._model._getQueryModelByName('list');
      if (queryModel && queryModel.querySelect) {
        select = queryModel.querySelect;
      }
    }

    const queryOptions = {
      select,
      where: `Id eq '${entryKey}'`,
    };

    const queryResults = store.query(null, queryOptions);

    when(queryResults, (feed) => {
      const entry = feed[0];
      entry[self.idProperty] = entry.$key; // we need this because the group key is different, and it used later on when invoking an action;
      self._addResolvedEntry(entry);
      def.resolve(entry);
    }, (err) => {
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
    const resolvedSelection = {
      data: resolvedEntry,
    };
    this._applyStateToActions(resolvedSelection, rowNode);
  },
  _refreshList: function _refreshList() {
    const self = this;
    if (this.groupsEnabled && this.groupList && this._currentGroup) {
      this._requestGroup(this._currentGroup.name, this._currentGroup.$key, function checkGroup(results) {
        const group = results[0];
        if (group) {
          GroupUtility.addToGroupPreferences([group], this.entityName);
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
    const key = params.key;
    const propertyName = params.propertyname;
    const actionName = params.name;
    const resolvedEntry = this._getResolvedEntry(key);
    if (!resolvedEntry) {
      this._fetchResolvedEntry(key).then((resolvedEnt) => {
        const options = {
          selection: {
            data: resolvedEnt,
          },
          propertyName,
        };
        this.groupInvokeActionByName(actionName, options);
      });
    } else {
      const options = {
        selection: {
          data: resolvedEntry,
        },
        propertyName,
      };
      this.groupInvokeActionByName(actionName, options);
    }
  },
  groupInvokeActionByName: function groupInvokeActionByName(actionName, options) {
    let opt = options;
    if (!opt) {
      opt = {};
    }
    switch (actionName) {
      case 'callPhone':
        action.callPhone.call(this, null, opt.selection, opt.propertyName, ActivityTypeText.atPhoneCall);
        break;
      case 'sendEmail':
        action.sendEmail.call(this, null, opt.selection, opt.propertyName);
        break;
      default:
        break;
    }
  },
  getContextSnapShot: function getContextSnapShot(options) {
    let snapShot;
    if (this._groupInitialized && this.groupsMode) {
      const entry = this.entries[options.key];
      const template = this.rowTemplate;
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
  },
});

export default __class;

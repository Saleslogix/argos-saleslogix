define('crm/Views/_GroupListMixin', ['exports', 'module', 'dojo/_base/declare', 'dojo/json', 'dojo/dom-class', 'dojo/dom-construct', 'argos/Utility', '../GroupUtility', 'dojo/when', 'dojo/_base/lang', 'argos/Store/SData', 'dojo/Deferred', '../Action'], function (exports, module, _dojo_baseDeclare, _dojoJson, _dojoDomClass, _dojoDomConstruct, _argosUtility, _GroupUtility, _dojoWhen, _dojo_baseLang, _argosStoreSData, _dojoDeferred, _Action) {
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _declare = _interopRequireDefault(_dojo_baseDeclare);

  var _json = _interopRequireDefault(_dojoJson);

  var _domClass = _interopRequireDefault(_dojoDomClass);

  var _domConstruct = _interopRequireDefault(_dojoDomConstruct);

  var _utility = _interopRequireDefault(_argosUtility);

  var _GroupUtility2 = _interopRequireDefault(_GroupUtility);

  var _when = _interopRequireDefault(_dojoWhen);

  var _lang = _interopRequireDefault(_dojo_baseLang);

  var _SDataStore = _interopRequireDefault(_argosStoreSData);

  var _Deferred = _interopRequireDefault(_dojoDeferred);

  var _action = _interopRequireDefault(_Action);

  var mixinName = 'crm.Views._GroupListMixin';

  /**
   * @class crm.Views._GroupListMixin
   *
   * Mixin for slx group list layouts.
   *
   * @since 3.1
   *
   *
   */
  var __class = (0, _declare['default'])('crm.Views._GroupListMixin', null, {
    noDefaultGroupText: 'No default group set. Click here to configure groups.',
    currentGroupNotFoundText: 'The current group was not found.',
    groupTemplateSummaryText: 'Summary',
    groupTemplateDetailText: 'Detail',
    hasDefaultGroup: true,
    noDefaultGroupTemplate: new Simplate(['<li class="no-data" data-action="openConfigure">', '<h3>{%= $$._getNoDefaultGroupMessage() %}</h3>', '</li>']),
    currentGoupNotFoundTemplate: new Simplate(['<li class="no-data">', '<h3>{%= $$._getCurrentGroupNotFoundMessage() %}</h3>', '</li>']),

    _getNoDefaultGroupMessage: function _getNoDefaultGroupMessage() {
      var mixin = _lang['default'].getObject(mixinName);
      if (mixin) {
        return mixin.prototype.noDefaultGroupText;
      }
    },
    _getCurrentGroupNotFoundMessage: function _getCurrentGroupNotFoundMessage() {
      var mixin = _lang['default'].getObject(mixinName);
      if (mixin) {
        return mixin.prototype.currentGroupNotFoundText;
      }
    },
    openConfigure: function openConfigure() {
      if (this._selectGroups) {
        this._selectGroups();
      }
    },
    groupsModeText: 'You are currently in groups mode. Perform a search or click a hashtag to exit groups mode.',
    // View Properties
    entityName: null,
    groupsEnabled: false,
    groupsMode: false,
    currentGroupId: null,
    _currentGroup: null,
    _groupInitalized: false,
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
        if (!this._groupInitalized && this.groupsMode) {
          _domClass['default'].add(this.domNode, 'list-loading');
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
      return _utility['default'].joinFields(sep, fields);
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
        this._groupInitalized = false;
        this._currentGroup = group;
        this.currentGroupId = group.$key;
        _GroupUtility2['default'].setDefaultGroupPreference(this.entityName, group.name);
      }
    },
    getDefaultGroup: function getDefaultGroup() {
      var defaultGroup = null;
      var defaultGroupName = null;

      defaultGroup = _GroupUtility2['default'].getDefaultGroup(this.entityName);

      if (defaultGroup) {
        return defaultGroup;
      }

      defaultGroupName = _GroupUtility2['default'].getDefaultGroupPreference(this.entityName);
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
      this._requestOverrideGroupLayout().then((function groupLayoutOverride(result) {
        this._overrideLayoutInitalized = true;
        this._overrideGroupLayout = result && result.length > 0 ? result[0].layout : null;
        this.initGroup();
      }).bind(this));
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

      if (this._groupInitalized) {
        return;
      }

      this.layout = _GroupUtility2['default'].getLayout(group);
      this.selectColumns = _GroupUtility2['default'].getColumnNames(this.layout);
      this.itemTemplate = this.getItemTemplate();

      // Create a custom request that the store will use to execute the group query
      this.request = _GroupUtility2['default'].createGroupRequest({
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
      this._groupInitalized = true;
      this.requestData();
    },
    _requestOverrideGroupLayout: function _requestOverrideGroupLayout() {
      var def = new _Deferred['default']();
      var groupName = this.overrideGroupLayoutName;
      var store = new _SDataStore['default']({
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
        (0, _when['default'])(queryResults, function setDeferredResolve(relatedFeed) {
          def.resolve(relatedFeed);
        }, function setDeferredResolveError() {
          def.resolve(null);
        });
      }
      return def.promise;
    },
    _requestGroup: function _requestGroup(groupName, groupId, onSuccess) {
      var store = undefined;
      if (typeof groupName === 'string' && groupName !== '') {
        store = new _SDataStore['default']({
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
            (0, _when['default'])(queryResult, (function queryResultFn(groupFeed) {
              if (typeof onSuccess === 'function') {
                onSuccess.apply(this, arguments);
              } else {
                this._onGroupRequestSuccess(groupFeed);
              }
            }).bind(context));
          } catch (error) {
            console.log('Error fetching group data:' + error); // eslint-disable-line
          }
        })(this, queryResults);
      }
    },
    _onGroupRequestSuccess: function _onGroupRequestSuccess(result) {
      if (result.length > 0) {
        var group = result[0];
        this.setCurrentGroup(group);
        _GroupUtility2['default'].addToGroupPreferences([group], this.entityName);
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

      _domClass['default'].remove(this.domNode, 'list-loading');
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
      var jsonString = _json['default'].stringify(item);
      var template = ['<h4><span class="group-label">', item.caption, '</span> <span class="group-entry">{%= $$.groupTransformValue($[$$.getFieldNameByLayout(' + jsonString + ')],' + jsonString + ',$$.getFormatterByLayout(' + jsonString + ')) %}</span>', '</h4>'].join('');

      return template;
    },
    defaultGroupLayoutItemTemplate: new Simplate(['<div><h2><span class="group-entry-header">{%= $$.getGroupFieldValueByIndex($, 0, true) %}</span></h2></div>', '<h4><span class="group-label">{%= $$.getGroupFieldLabelByIndex(1) %} </span><span class="group-entry">{%= $$.getGroupFieldValueByIndex($, 1, true) %}</span></h4>', '<h4><span class="group-label">{%= $$.getGroupFieldLabelByIndex(2) %} </span><span class="group-entry">{%= $$.getGroupFieldValueByIndex($, 2, true) %}</span></h4>']),
    createGroupTemplateLayouts: function createGroupTemplateLayouts() {
      var mixin = _lang['default'].getObject(mixinName);
      this.groupTemplateLayouts = [{
        name: 'Summary',
        displayName: mixin ? mixin.prototype.groupTemplateSummaryText : this.groupTemplateSummaryText,
        type: 'Dynamic',
        options: {
          columns: [{
            id: 'col1',
            rows: 3
          }]
        }
      }, {
        name: 'Detail',
        displayName: mixin ? mixin.prototype.groupTemplateDetailText : this.groupTemplateDetailText,
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
      var name = _GroupUtility2['default'].getSelectedGroupLayoutTemplate(this.entityName);
      name = name ? name : '';
      var layoutTemplate = null;
      this.groupTemplateLayouts.forEach(function setLayoutTemplate(item) {
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
      layoutOptions.columns.forEach(function incrementRows(item) {
        rows = rows + item.rows;
      });
      var columnWidth = _utility['default'].roundNumberTo(100 / columns, 0);

      var template = [];
      template.push('<div class="group-item">');
      template.push('<div class="group-item-header">');
      template.push('<h2><span class="group-entry-header">{%= $$.getGroupFieldValueByName($,"' + layout[0].propertyPath + '", true) %}</span></h2>');
      template.push('</div">');
      for (var i = 0; i < layout.length; i++) {
        var columnItem = layoutOptions.columns[column - 1];
        if (columnItem && column <= columns && i !== 0) {
          if (row === 1) {
            var columnStyle = columnItem.style || 'width:' + columnWidth + '%;';
            var columnClass = columnItem.clss || '';
            template.push('<div class="group-column ' + columnClass + '"  style="' + columnStyle + '">');
          }
          var item = layout[i];
          if (item && columnItem.rows > 0) {
            if (i !== 0) {
              template.push('<h3>');
              if (!columnItem.hideLabels) {
                template.push('<span class="group-label">' + this.getGroupFieldLabelByName(item.propertyPath) + ' </span>');
              }

              var formatOptions = this.getGroupFieldFormatOptions(item);
              var formatClss = formatOptions.clss || '';
              var jsonString = _json['default'].stringify(formatOptions);
              if (item.format === 'Phone') {
                template.push('<span class="href" data-action="groupInvokeListAction" data-name="callPhone" data-key="{%:$$.getGroupItemKey($)%}" data-propertyname="' + item.propertyPath + '">{%= $$.getGroupFieldValueByName($,"' + item.propertyPath + '", true,' + jsonString + ') %}</span>');
              } else if (item.propertyPath === 'Email') {
                template.push('<span class="href" data-action="groupInvokeListAction" data-name="sendEmail" data-key="{%:$$.getGroupItemKey($)%}" data-propertyname="' + item.propertyPath + '">{%= $$.getGroupFieldValueByName($,"' + item.propertyPath + '", true,' + jsonString + ') %}</span>');
              } else {
                template.push('<span class="group-entry ' + formatClss + '">{%= $$.getGroupFieldValueByName($,"' + item.propertyPath + '", true,' + jsonString + ') %}</span>');
              }
              template.push('</h3>');
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
      _lang['default'].mixin(layoutOptions, options);
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
        _lang['default'].mixin(options, formatter.options);
      }
      return options;
    },
    getGroupFieldLabelByName: function getGroupFieldLabelByName(name) {
      var layout = this.enableOverrideLayout && this._overrideGroupLayout ? this._overrideGroupLayout : this.layout;
      var layoutItem = null;
      layout.forEach(function setLayoutItem(item) {
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
      layout.forEach(function setLayoutItem(item) {
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
        var fieldName = this.getFieldNameByLayout(layoutItem);
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
      var path = layoutItem.propertyPath + '_' + layoutItem.index;
      var formatter = this._fieldFormatters[path];
      if (!formatter) {
        formatter = this.getGroupFieldFormatter(layoutItem);
        this._fieldFormatters[path] = formatter;
      }
      return formatter;
    },
    getGroupFieldFormatter: function getGroupFieldFormatter(layoutItem) {
      var formatter = undefined;
      if (this.groupFieldFormatter) {
        formatter = this.groupFieldFormatter[layoutItem.propertyPath];
      }
      if (!formatter) {
        formatter = _GroupUtility2['default'].getFormatterByLayout(layoutItem);
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
      return _GroupUtility2['default'].getFieldNameByLayout(layoutItem);
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

      this._originalProps = null;

      this._groupInitalized = false;
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
      _GroupUtility2['default'].removeGroupPreferences(this.currentGroupId, this.entityName);
      this.refreshRightDrawer();
      _domClass['default'].remove(this.domNode, 'list-loading');
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
          this._fetchResolvedEntry(params.key).then(function postFetchResolvedEntry(resolvedEnt) {
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
    _invokeAction: function _invokeAction(theAction, selection) {
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
        this._fetchResolvedEntry(selection.data.$key).then(function postFetchResolvedEntry(resolvedEnt) {
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
        this._fetchResolvedEntry(selection.data.$key).then(function postFetchResolvedEntry(resolvedEnt) {
          self._groupCheckActionState(resolvedEnt);
          self._groupApplyActionPanel(rowNode);
        });
      } else {
        this._groupCheckActionState(resolvedEntry);
        this._groupApplyActionPanel(rowNode);
      }
    },
    _groupApplyActionPanel: function _groupApplyActionPanel(rowNode) {
      _domClass['default'].add(rowNode, 'list-action-selected');
      this.onApplyRowActionPanel(this.actionsNode, rowNode);
      _domConstruct['default'].place(this.actionsNode, rowNode, 'after');
    },
    _getCurrentSelection: function _getCurrentSelection() {
      var selectedItems = this.get('selectionModel').getSelections();
      var selection = undefined;
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
      var def = new _Deferred['default']();
      var self = this;
      var store = new _SDataStore['default']({
        service: App.services.crm,
        resourceKind: this.resourceKind,
        contractName: this.contractName,
        scope: this
      });

      var queryOptions = {
        select: this._originalProps.querySelect,
        where: 'Id eq \'' + entryKey + '\''
      };

      var queryResults = store.query(null, queryOptions);

      (0, _when['default'])(queryResults, function postWhen(feed) {
        var entry = feed[0];
        entry[self.idProperty] = entry.$key; // we need this because the group key is different, and it used later on when invoking an action;
        self._addResolvedEntry(entry);
        def.resolve(entry);
      }, function postWhenError(err) {
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
    _groupCheckActionState: function _groupCheckActionState(resolvedEntry) {
      var resolvedSelection = {
        data: resolvedEntry
      };
      this._applyStateToActions(resolvedSelection);
    },
    onToolLayoutCreated: function onToolLayoutCreated(tools) {
      if (tools && !this._refreshAdded && !window.App.supportsTouch()) {
        var refreshTool = {
          id: 'refresh',
          cls: 'fa fa-refresh fa-fw fa-lg',
          action: '_refreshList'

        };
        if (tools.tbar) {
          tools.tbar.push(refreshTool);
          this._refreshAdded = true;
        }
      }
      this.inherited(arguments);
    },
    _refreshList: function _refreshList() {
      var self = this;
      if (this.groupsEnabled && this.groupList && this._currentGroup) {
        this._requestGroup(this._currentGroup.name, this._currentGroup.$key, function checkGroup(results) {
          var group = results[0];
          if (group) {
            _GroupUtility2['default'].addToGroupPreferences([group], this.entityName);
            self.setCurrentGroup(group);
            this.refreshRightDrawer();
          }

          self.clear();
          self.refreshRequired = true;
          self.refresh();
        });
      } else {
        this.clear();
        this.refreshRequired = true;
        this.refresh();
      }
    },
    groupInvokeListAction: function groupInvokeListAction(params) {
      var key = params.key;
      var propertyName = params.propertyname;
      var actionName = params.name;
      var resolvedEntry = this._getResolvedEntry(key);
      if (!resolvedEntry) {
        this._fetchResolvedEntry(key).then((function setOptionsforGroupAction(resolvedEnt) {
          var options = {
            selection: {
              data: resolvedEnt
            },
            propertyName: propertyName
          };
          this.groupInvokeActionByName(actionName, options);
        }).bind(this));
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
          _action['default'].callPhone.call(this, null, opt.selection, opt.propertyName);
          break;
        case 'sendEmail':
          _action['default'].sendEmail.call(this, null, opt.selection, opt.propertyName);
          break;
        default:
          break;
      }
    },
    getContextSnapShot: function getContextSnapShot(options) {
      var snapShot = undefined;
      if (this._groupInitalized && this.groupsMode) {
        var entry = this.entries[options.key];
        var template = this.itemRowContainerTemplate;
        snapShot = template.apply(entry, this);
        return snapShot;
      }
      snapShot = this.inherited(arguments);

      return snapShot;
    }
  });

  _lang['default'].setObject('Mobile.SalesLogix.Views._GroupListMixin', __class);
  module.exports = __class;
});

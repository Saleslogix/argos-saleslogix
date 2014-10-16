/* Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.*/

/**
 * @class Mobile.SalesLogix.Views._GroupListMixin
 *
 * Mixin for slx group list layouts.
 *
 * @since 3.1
 *
 *
 */
define('Mobile/SalesLogix/Views/_GroupListMixin', [
    'dojo/_base/declare',
    'dojo/string',
    'dojo/json',
    'dojo/dom-style',
    'dojo/dom-class',
    'dojo/query',
    'dojo/dom-attr',
    'dojo/dom-construct',
    'Sage/Platform/Mobile/Format',
    'Sage/Platform/Mobile/Utility',
    'Mobile/SalesLogix/GroupUtility',
    'dojo/when',
    'dojo/_base/lang',
    'Sage/Platform/Mobile/Store/SData'
], function(
    declare,
    string,
    json,
    domStyle,
    domClass,
    query,
    domAttr,
    domConstruct,
    format,
    utility,
    GroupUtility,
    when,
    lang,
    SDataStore
) {
    var mixinName = 'Mobile.SalesLogix.Views._GroupListMixin';

    return declare('Mobile.SalesLogix.Views._GroupListMixin', null, {
        noDefaultGroupText: 'No default group set. Click here to configure groups.',
        currentGroupNotFoundText: 'The current group was not found.',
        noDefaultGroupTemplate: new Simplate([
            '<li class="no-data" data-action="openConfigure">',
            '<h3>{%= $$._getNoDefaultGroupMessage() %}</h3>',
            '</li>'
        ]),
        currentGoupNotFoundTemplate: new Simplate([
           '<li class="no-data">',
           '<h3>{%= $$._getCurrentGroupNotFoundMessage() %}</h3>',
           '</li>'
        ]),
        _getNoDefaultGroupMessage: function() {
            var mixin = lang.getObject(mixinName);
            if (mixin) {
                return mixin.prototype.noDefaultGroupText;
            }
        },
        _getCurrentGroupNotFoundMessage: function() {
            var mixin = lang.getObject(mixinName);
            if (mixin) {
                return mixin.prototype.currentGroupNotFoundText;
            }
        },
        openConfigure: function() {
            if (this._selectGroups) {
                this._selectGroups();
            }
        },
        groupsModeText: 'You are currently in groups mode. Perform a search or click a hashtag to exit groups mode.',
        //View Properties
        entityName: null,
        groupsEnabled: false,
        groupsMode: false,
        currentGroupId: null,
        _currentGroup: null,
        _groupInitalized: false,
        _originalProps: null,

        selectedColumns: null,
        layout: null,

        postMixInProperties: function() {
            if (!App.enableGroups) {
                this.groupsMode = false;
                this.groupsEnabled = false;
            }

            if (this.groupsEnabled) {
                this.groupsMode = true;
            }

            this.inherited(arguments);
        },

        requestData: function() {
            try {
                if (!this._groupInitalized && this.groupsMode) {
                    domClass.add(this.domNode, 'list-loading');
                    this.listLoading = true;
                    this.initGroup();
                } else {
                    this.inherited(arguments);
                }
            } catch (e) {
                console.error(e);
            }
        },

        joinFields: function(sep, fields) {
            return utility.joinFields(sep, fields);
        },
        getDescriptor: function(entity) {
            return entity.$descriptor || entity.$key || "unknown";
        },
        getCurrentGroup: function() {
            return this._currentGroup;
        },
        setCurrentGroup: function(group) {
            if (group) {
                this._groupInitalized = false;
                this._currentGroup = group;
                this.currentGroupId = group.$key;
                GroupUtility.setDefaultGroupPreference(this.entityName, group.name);
            }
        },
        getDefaultGroup: function() {
            var defaultGroup,
                defaultGroupName = null;

            defaultGroup = GroupUtility.getDefaultGroup(this.entityName);

            if (defaultGroup) {
                return defaultGroup;
            } else {
                defaultGroupName = GroupUtility.getDefaultGroupPreference(this.entityName);
                if (defaultGroupName) {
                    this._requestGroup(defaultGroupName);
                } else {
                    // No default group preference
                    this.set('listContent', this.noDefaultGroupTemplate.apply(this));
                }
            }

            return null;
        },
        initGroup: function() {
            var group;
            group = this.getCurrentGroup();

            if (!group) {
                group = this.getDefaultGroup();
                this.setCurrentGroup(group);
            }

            if (group) {
                this._onApplyGroup(group);
            }
        },
        clear: function() {
            this.inherited(arguments);
            this._clearResolvedEntryCache();
        },
        _onApplyGroup: function(group) {
            var template, title;

            if (!group) {
                throw new Error("Group not found.");
            }
            this._fieldFormatters = {};
            this._startGroupMode();
            this._clearResolvedEntryCache();

            // Set the toolbar title to the current group displayName
            title = this.getGroupTitle(group);
            App.setPrimaryTitle(title);
            this.set('title', title);

            if (this._groupInitalized) {
                return;
            }

            this.layout = GroupUtility.getLayout(group);
            this.selectColumns = GroupUtility.getColumnNames(this.layout);

            template = this.layout.map( this.getItemLayoutTemplate);
            this.itemTemplate = new Simplate(template);

            // Create a custom request that the store will use to execute the group query
            this.request = GroupUtility.createGroupRequest({
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
        _requestGroup: function(groupName, groupId, onSuccess) {
            var store = null, queryResults;

            if (typeof groupName === 'string' && groupName !== '') {
                store = new SDataStore({
                    service: App.services.crm,
                    resourceKind: 'groups',
                    contractName: 'system',
                    where: "((upper(family) eq '" + this.entityName.toUpperCase() + "') and (upper(Name) eq '" + groupName.toUpperCase() + "') or PluginId eq '" + groupId + "')",
                    include: ['layout', 'tableAliases'],
                    idProperty: '$key',
                    applicationName: 'slx',
                    scope: this
                });
            }

            if (store) {
                queryResults = store.query();

                (function(context, queryResults) {
                    try {
                        when(queryResults, function(groupFeed) {
                            if (typeof onSuccess === 'function') {
                                onSuccess.apply(this, arguments);
                            } else {
                                this._onGroupRequestSuccess(groupFeed);
                            }
                        }.bind(context));
                    }
                    catch (error) {
                        console.log('Error fetching group data:' + error);
                    }
                })(this, queryResults);

            }
        },
        _onGroupRequestSuccess: function(result) {
            var group, title;
            if (result.length > 0) {
                group = result[0];
                this.setCurrentGroup(group);
                GroupUtility.addToGroupPreferences([group], this.entityName);
                this._onApplyGroup(group);
            } else {
                title = this.getGroupTitle();
                App.setPrimaryTitle(title);
                this.set('title', title);
                this._selectGroups();
            }

            // Reload the right menu
            this.onTransitionAway();
            this.loadRightDrawer();

            domClass.remove(this.domNode, 'list-loading');
            this.listLoading = false;
        },
        _onGroupRequestFaild: function(result) {

        },
        getGroupTitle: function(group) {
            var title = '';
            if (group && typeof group.displayName === 'string') {
                title = group.displayName;
            }

            return group.displayName;
        },
        getItemLayoutTemplate: function(item) {
            var template, jsonString;
            jsonString = json.stringify(item);

            template = ["<h4><span class=\"group-label\">", item.caption, "</span> <span class=\"group-entry\">{%= $$.groupTransformValue($[$$.getFieldNameByLayout(" + jsonString + ")]," + jsonString + ",$$.getFormatterByLayout(" + jsonString + ")) %}</span>", "</h4>"].join('');

            return template;

        },
        getFormatterByLayout: function(layoutItem) {
            var formatter, path;
            if (!this._fieldFormatters) {
                this._fieldFormatters = {};
            }
            path = layoutItem.propertyPath + '_' + layoutItem.index;
            formatter = this._fieldFormatters[path];
            if (!formatter) {
                formatter = this.getGroupFieldFormatter(layoutItem);
                this._fieldFormatters[path] = formatter;
            }
            return formatter;
        },
        getGroupFieldFormatter: function(layoutItem){
            var formatter;
            if (this.groupFieldFormatter) {
                formatter = this.groupFieldFormatter[layoutItem.propertyPath];
            }
            if (!formatter) {
                formatter = GroupUtility.getFormatterByLayout(layoutItem);
            }
            return formatter;
        },
        groupTransformValue: function(value, layout, formatter) {
            try{
                return formatter.formatter(value, formatter.formatString);
            } catch (e) {
                return value;
            }
        },
        getFieldNameByLayout: function(layoutItem) {
            return GroupUtility.getFieldNameByLayout(layoutItem);
        },
        _startGroupMode: function() {
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
        _clearGroupMode: function() {
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
            this.itemFooterTemplate =  original.itemFooterTemplate;

            this._originalProps = null;

            this._groupInitalized = false;
            this._currentGroup = null;
            this.currentGroupId = null;
            App.setPrimaryTitle(original.title);
            this.set('title', original.title);

            this.clear();
            this.refreshRequired = true;
        },
        onProcessRelatedViews: function(entry, rowNode, entries) {
            if (this.groupsEnabled) {
                return;
            }

            this.inherited(arguments);
        },
        _onQueryError: function(queryOptions, error) {
            if (this.groupsEnabled && this.groupsMode) {
                if (error.status === 404) {
                    try{
                        this._onGroupNotFound();
                        return;
                    } catch (e) {
                        console.error(e);
                    }
                }
            }
            this.inherited(arguments);
        },
        _onGroupNotFound: function() {
            GroupUtility.removeGroupPreferences(this.currentGroupId, this.entityName);
            this.refreshRightDrawer();
            domClass.remove(this.domNode, 'list-loading');
            this.set('listContent', this.currentGoupNotFoundTemplate.apply(this));

        },
        activateEntry: function(params) {
            if (this.groupsEnabled && this.groupsMode && !params.resolved) {
                this._groupActivateEntry(params);
            } else {
                this.inherited(arguments);
            }
        },
        _groupActivateEntry: function(params) {
            var resolvedEntry, self = this;

            if (params.key) {
                resolvedEntry = this._getResolvedEntry(params.key);
                if (!resolvedEntry) {
                    this._fetchResolvedEntry(params.key).then(function(resolvedEntry) {
                        params.descriptor = resolvedEntry.$descriptor;
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
        _invokeAction: function(action, selection) {
            if (this.groupsEnabled && this.groupsMode && !selection.resolved) {
                this._groupInvokeAction(action, selection);
            } else {
                this.inherited(arguments);
            }
        },
        _groupInvokeAction: function(action, selection) {
            var resolvedEntry, self = this;
            resolvedEntry = this._getResolvedEntry(selection.data.$key);
            if (!resolvedEntry) {
                this._fetchResolvedEntry(selection.data.$key).then(function(resolvedEntry) {
                    self._invokeAction(action, {
                        data: resolvedEntry,
                        resolved:true
                    });
                });
            } else {
                this._invokeAction(action, {
                    data: resolvedEntry,
                    resolved: true
                });
            }

        },
        showActionPanel: function(rowNode) {
            if (this.groupsEnabled && this.groupsMode) {
                this._groupShowActionPanel(rowNode);
            } else {
                this.inherited(arguments);
            }
        },
        _groupShowActionPanel: function(rowNode) {
            var selection, self, resolvedEntry;
            selection = this._getCurrentSelection();
            self = this;
            resolvedEntry = this._getResolvedEntry(selection.data.$key);
            if (!resolvedEntry) {
                this._fetchResolvedEntry(selection.data.$key).then(function(resolvedEntry) {
                    self._groupCheckActionState(resolvedEntry);
                    self._groupApplyActionPanel(rowNode);
                });
            } else {
                this._groupCheckActionState(resolvedEntry);
                this._groupApplyActionPanel(rowNode);
            }
        },
        _groupApplyActionPanel: function(rowNode) {
            domClass.add(rowNode, 'list-action-selected');
            this.onApplyRowActionPanel(this.actionsNode, rowNode);
            domConstruct.place(this.actionsNode, rowNode, 'after');
        },
        _getCurrentSelection:function(){
            var selection, selectedItems, key;
            selectedItems = this.get('selectionModel').getSelections();
            for (key in selectedItems) {
                selection = selectedItems[key];
                selection.data['$key'] = key;
                break;
            }
            return selection;
        },
        _fetchResolvedEntry: function(entryKey) {
            return new Promise(function(resolve, reject) {
                var self, store, queryOptions, queryResults;
                self = this;
                store = new SDataStore({
                    service: App.services['crm'],
                    resourceKind: this.resourceKind,
                    contractName: this.contractName,
                    scope: this
                });

                queryOptions = {
                    select: this._originalProps.querySelect,
                    where: "Id eq '" + entryKey + "'"
                };

                queryResults = store.query(null, queryOptions);

                Promise.resolve(queryResults).then(function(feed) {
                    var entry = feed[0];
                    entry[self.idProperty] = entry.$key; // we need this because the group key is different, and it used later on when invoking an action;
                    self._addResolvedEntry(entry);
                    resolve(entry);
                }, function(err) {
                    reject(err);
                });
            }.bind(this));
        },
        _clearResolvedEntryCache: function() {
             this._resolvedEntryCache = {};
        },
        _getResolvedEntry: function(entryKey) {
            if (!this._resolvedEntryCache) {
                this._resolvedEntryCache = {};
            }
            return this._resolvedEntryCache[entryKey];
        },
        _addResolvedEntry:function(entry){
           this._resolvedEntryCache[entry.$key] = entry;
        },
        _groupCheckActionState: function(resolvedEntry) {
            var resolvedSelection, key;

            resolvedSelection = {
                data: resolvedEntry
            };
            this._applyStateToActions(resolvedSelection);
        },
        onToolLayoutCreated: function(tools) {
            var refreshTool;

            if (tools && !this._refreshAdded) {
                refreshTool = {
                    id: 'refresh',
                    cls: 'fa fa-refresh fa-fw fa-lg',
                    action: '_refreshList'

                };
                if (tools['tbar']) {
                    tools['tbar'].push(refreshTool);
                    this._refreshAdded = true;
                }
            }
            this.inherited(arguments);
        },
        _refreshList: function() {
            var self = this;
            if (this.groupsEnabled && this.groupList && this._currentGroup) {
                this._requestGroup(this._currentGroup.name, this._currentGroup.$key, function(results) {
                    var group = results[0];
                    if (group) {
                        GroupUtility.addToGroupPreferences([group], this.entityName);
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
        }
    });
});


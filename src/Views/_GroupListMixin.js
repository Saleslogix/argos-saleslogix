/* Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.*/

/**
 * @class Mobile.SalesLogix.Views._GroupListMixin
 *
 * Mixin for slx group list layouts.
 *
 * @since 3.0
 *
 *
 */
define('Mobile/SalesLogix/Views/_GroupListMixin', [
    'dojo/_base/declare',
    'dojo/_base/array',
    'dojo/string',
    'dojo/json',
    'dojo/dom-style',
    'dojo/dom-class',
    'Sage/Platform/Mobile/Format',
    'Sage/Platform/Mobile/Utility',
    'Mobile/SalesLogix/GroupUtility',
    'dojo/when',
    'dojo/_base/lang',
    'Sage/Platform/Mobile/Store/SData'
], function(
    declare,
    array,
    string,
    json,
    domStyle,
    domClass,
    format,
    utility,
    GroupUtility,
    when,
    lang,
    SDataStore
) {
    var mixinName = 'Mobile.SalesLogix.Views._GroupListMixin';

    return declare('Mobile.SalesLogix.Views._GroupListMixin', null, {
        noDefaultGroupText: 'No default group set. Open the right menu and press configure under the groups section to setup groups.',
        noDefaultGroupTemplate: new Simplate([
            '<li class="no-data">',
            '<h3>{%= $$._getNoDefaultGroupMessage() %}</h3>',
            '</li>'
        ]),
        _getNoDefaultGroupMessage: function() {
            var mixin = lang.getObject(mixinName);
            if (mixin) {
                return mixin.prototype.noDefaultGroupText;
            }
        },
        groupsModeText: 'You are currently in groups mode. Perform a search or click a hashtag to exit groups mode.',
        //View Properties
        entityName: null,
        groupsMode: false,
        currentGroupId: null,
        _currentGroup: null,
        _groupInitalized: false,
        _originalProps: null,

        selectedColumns: null,
        layout: null,

        constructor: function() {
            if (!App.enableGroups) {
                this.groupsMode = false;
            }
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
                if (this.currentGroupId !== group.$key) {
                    this.groupsMode = true;
                    this._groupInitalized = false;
                    this._currentGroup = group;
                    this.currentGroupId = group.$key;
                    GroupUtility.setDefaultGroupPreference(this.entityName, group.name);
                }
            }
        },
        getDefaultGroup: function() {
            var defaultGroup = null,
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
        _onApplyGroup: function(group) {
            var template = [], layout, selectColumns, title;

            if (!group) {
                throw new Error("Group not found.");
            }

            this._startGroupMode();

            // Set the toolbar title to the current group displayName
            title = this.getGroupTitle(group);
            App.setPrimaryTitle(title);
            this.set('title', title);

            if (this._groupInitalized) {
                return;
            }

            this.layout = GroupUtility.getLayout(group);
            this.selectColumns = GroupUtility.getColumnNames(this.layout);

            template = array.map(this.layout, this.getItemLayoutTemplate);
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
        _requestGroup: function(groupName, onSuccess) {
            var store = null, queryResults;

            if (typeof groupName === 'string' && groupName !== '') {
                store = new SDataStore({
                    service: App.services.crm,
                    resourceKind: 'groups',
                    contractName: 'system',
                    where: "((upper(family) eq '" + this.entityName.toUpperCase() + "') and (upper(Name) eq '" + groupName.toUpperCase() + "'))",
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
                        when(queryResults, lang.hitch(context, function(groupFeed) {
                            if (typeof onSuccess === 'function') {
                                onSuccess.apply(this, arguments);
                            } else {
                                this._onGroupRequestSuccess(groupFeed);
                            }
                        }));
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

            if (item.index === 0) {
                template = ["<h4><strong>", item.caption, " : {%= $$.getFormatterByLayout(" + jsonString + ")($[$$.getFieldNameByLayout(" + jsonString + ")]) %}", "</strong></h4>"].join('');
            } else {
                template = ["<h4>", item.caption, " : {%= $$.getFormatterByLayout(" + jsonString + ")($[$$.getFieldNameByLayout(" + jsonString + ")]) %}", "</h4>"].join('');
            }

            return template;

        },
        getFormatterByLayout: function(layoutItem) {
            return GroupUtility.getFormatterByLayout(layoutItem);
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

            if (this.groupsNode) {
                domStyle.set(this.groupsNode, {
                    display: 'block'
                });

                this.groupsNode.innerHTML = this.groupsModeText;
            }

            this.groupsMode = true;
        },
        _clearGroupMode: function() {
            var original = this._originalProps;

            if (!this.groupsMode || !original) {
                this.groupsMode = false;// Ensure this is off
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

            this.groupsMode = false;
            this._groupInitalized = false;
            this._currentGroup = null;
            this.currentGroupId = null;
            App.setPrimaryTitle(original.title);
            this.set('title', original.title);

            this.clear();
            this.refreshRequired = true;

            if (this.groupsNode) {
                domStyle.set(this.groupsNode, {
                    display: 'none'
                });
                this.groupsNode.innerHTML = '';
             }
        },
        onProcessRelatedViews: function(entry, rowNode, entries) {
            if (this.groupsMode) {
                return;
            }

            this.inherited(arguments);
        }
    });
});


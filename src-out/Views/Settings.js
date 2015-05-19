/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */
/**
 * @class crm.Views.Settings
 *
 *
 * @extends argos.List
 *
 */
define('crm/Views/Settings', [
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/_base/connect',
    './_CardLayoutListMixin',
    'argos/List'
], function (declare, lang, connect, _CardLayoutListMixin, List) {
    var __class = declare('crm.Views.Settings', [List, _CardLayoutListMixin], {
        //Templates
        itemIconTemplate: new Simplate([
            '<button data-action="{%= $.action %}" {% if ($.view) { %}data-view="{%= $.view %}"{% } %} class="list-item-selector button visible">',
            '{% if ($$.getItemIconClass($)) { %}',
            '<span class="{%= $$.getItemIconClass($) %}"></span>',
            '{% } else { %}',
            '<img id="list-item-image_{%: $.$key %}" src="{%: $$.getItemIconSource($) %}" alt="{%: $$.getItemIconAlt($) %}" class="icon" />',
            '{% } %}',
            '</button>'
        ]),
        itemTemplate: new Simplate([
            '<h3 data-action="{%= $.action %}">{%: $.title %}</h3>'
        ]),
        itemRowContainerTemplate: new Simplate([
            '<li data-action="{%= $.action %}" {% if ($.view) { %}data-view="{%= $.view %}"{% } %}>',
            '{%! $$.itemRowContentTemplate %}',
            '</li>'
        ]),
        //Localization
        clearLocalStorageTitleText: 'Clear Storage',
        clearAuthenticationTitleText: 'Clear Saved Credentials',
        errorLogTitleText: 'View Error Logs',
        localStorageClearedText: 'Local storage cleared successfully.',
        credentialsClearedText: 'Saved credentials cleared successfully.',
        titleText: 'Settings',
        //View Properties
        id: 'settings',
        expose: false,
        enableSearch: false,
        enablePullToRefresh: false,
        selectionOnly: true,
        allowSelection: false,
        actions: null,
        actionOrder: [
            'clearAuthentication',
            'clearLocalStorage',
            'viewErrorLogs'
        ],
        createActions: function () {
            this.actions = {
                'clearLocalStorage': {
                    title: this.clearLocalStorageTitleText,
                    cls: 'fa fa-database fa-2x'
                },
                'clearAuthentication': {
                    title: this.clearAuthenticationTitleText,
                    cls: 'fa fa-unlock fa-2x'
                },
                'viewErrorLogs': {
                    title: this.errorLogTitleText,
                    cls: 'fa fa-list-alt fa-2x'
                }
            };
        },
        getItemIconClass: function (entry) {
            return entry.cls;
        },
        createIndicatorLayout: function () {
            return this.itemIndicators || (this.itemIndicators = []);
        },
        viewErrorLogs: function () {
            var view = App.getView('errorlog_list');
            if (view) {
                view.show();
            }
        },
        clearLocalStorage: function () {
            if (window.localStorage) {
                window.localStorage.clear();
            }
            connect.publish('/app/refresh', [{
                    resourceKind: 'localStorage'
                }]);
            alert(this.localStorageClearedText);
        },
        clearAuthentication: function () {
            if (window.localStorage) {
                window.localStorage.removeItem('credentials');
            }
            alert(this.credentialsClearedText);
        },
        hasMoreData: function () {
            return false;
        },
        requestData: function () {
            var list, i, action;
            list = [];
            for (i = 0; i < this.actionOrder.length; i++) {
                action = this.actions[this.actionOrder[i]];
                if (action) {
                    list.push({
                        action: this.actionOrder[i],
                        title: action.title,
                        icon: action.icon,
                        cls: action.cls
                    });
                }
            }
            this.processData(list);
        },
        init: function () {
            this.inherited(arguments);
            this.createActions();
        },
        createToolLayout: function () {
            return this.tools || (this.tools = {
                tbar: []
            });
        }
    });
    lang.setObject('Mobile.SalesLogix.Views.Settings', __class);
    return __class;
});

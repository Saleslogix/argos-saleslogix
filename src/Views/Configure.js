/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */

/**
 * @class crm.Views.Configure
 *
 *
 * @extends argos._ConfigureBase
 *
 */
define('crm/Views/Configure', [
    'dojo/_base/declare',
    'dojo/_base/array',
    'dojo/_base/lang',
    'dojo/query',
    'dojo/string',
    'dojo/dom-attr',
    'dojo/dom-class',
    'dojo/store/Memory',
    'argos/_ConfigureBase'
], function(
    declare,
    array,
    lang,
    query,
    string,
    domAttr,
    domClass,
    Memory,
    _ConfigureBase
) {

    var __class = declare('crm.Views.Configure', [_ConfigureBase], {
        // Localization
        titleText: 'Configure',

        //View Properties
        id: 'configure',
        idProperty: '$key',
        labelProperty: '$descriptor',

        onSave: function() {
            var view;

            App.preferences.home = App.preferences.home || {};
            App.preferences.configure = App.preferences.configure || {};

            App.preferences.configure.order = this.getOrderedKeys();
            App.preferences.home.visible = this.getSelectedKeys();

            App.persistPreferences();

            ReUI.back();
            view = App.getView('left_drawer');
            if (view) {
                view.refresh();
            }
        },
        createStore: function() {
            var list = [],
                lookup = {},
                exposed = App.getExposedViews(),
                order = this.getSavedOrderedKeys(),
                i,
                n,
                view;

            for (i = 0; i < exposed.length; i++) {
                lookup[exposed[i]] = true;
            }

            for (i = 0; i < order.length; i++) {
                if (lookup[order[i]]) {
                    delete lookup[order[i]];
                }
            }

            for (n in lookup) {
                if (lookup.hasOwnProperty(n)) {
                    order.push(n);
                }
            }

            for (i = 0; i < order.length; i++) {
                view = App.getView(order[i]);
                if (view && App.hasAccessTo(view.getSecurity()) && exposed.indexOf(order[i]) >= 0) {
                    list.push({
                        '$key': view.id,
                        '$descriptor': view.titleText,
                        'icon': view.icon
                    });
                } else {
                    order.splice(i, 1);
                    i -= 1;
                }
            }

            return Memory({data: list});
        },
        getSavedOrderedKeys: function() {
            return (App.preferences.configure && App.preferences.configure.order) || [];
        },
        getSavedSelectedKeys: function() {
            return (App.preferences.home && App.preferences.home.visible) || [];
        }
    });

    lang.setObject('Mobile.SalesLogix.Views.Configure', __class);
    return __class;
});


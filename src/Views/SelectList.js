/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */

/**
 * @class Mobile.SalesLogix.Views.SelectList
 *
 *
 * @extends Sage.Platform.Mobile.List
 *
 */
define('Mobile/SalesLogix/Views/SelectList', [
    'dojo/_base/declare',
    'dojo/store/Memory',
    'Sage/Platform/Mobile/List'
], function(
    declare,
    Memory,
    List
) {

    return declare('Mobile.SalesLogix.Views.SelectList', [List], {
        //Templates
        itemTemplate: new Simplate([
            '<h3>{%: $.$descriptor %}</h3>'
        ]),

        //View Properties
        id: 'select_list',
        expose: false,

        refreshRequiredFor: function(options) {
            if (this.options) {
                return options ? (this.options.data != options.data) : false;
            } else {
                return true;
            }
        },
        hasMoreData: function() {
            return false;
        },
        requestData: function() {
            this.store = null;
            this.inherited(arguments);
        },
        createStore: function() {
            // caller is responsible for passing in a well-structured feed object.
            var store, data = this.expandExpression(this.options && this.options.data && this.options.data.$resources);
            store = Memory({data: data});
            store.idProperty = '$key';
            return store;
        }
    });
});


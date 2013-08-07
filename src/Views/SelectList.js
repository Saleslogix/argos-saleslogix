/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */
define('Mobile/SalesLogix/Views/SelectList', [
    'dojo/_base/declare',
    'Sage/Platform/Mobile/List'
], function(
    declare,
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
            // caller is responsible for passing in a well-structured feed object.
            var data = this.expandExpression(this.options && this.options.data);
            if (data) {
                this.processFeed(data);
            }
        }
    });
});


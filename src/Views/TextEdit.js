/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */
define('Mobile/SalesLogix/Views/TextEdit', [
    'dojo/_base/declare',
    'Sage/Platform/Mobile/Edit'
], function(
    declare,
    Edit
) {

    return declare('Mobile.SalesLogix.Views.TextEdit', [Edit], {
        //View Properties
        id: 'text_edit',
        titleText: 'Edit Text',

        createLayout: function() {
            return this.layout || (this.layout = [{
                label: '',
                cls: 'note-text-row',
                name: 'Notes',
                type: 'textarea'
            }]);
        }
    });
});


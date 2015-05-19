/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */
/**
 * @class crm.Views.TextEdit
 *
 *
 * @extends argos.Edit
 *
 */
define('crm/Views/TextEdit', [
    'dojo/_base/declare',
    'dojo/_base/lang',
    'argos/Edit'
], function (declare, lang, Edit) {
    var __class = declare('crm.Views.TextEdit', [Edit], {
        //View Properties
        id: 'text_edit',
        titleText: 'Edit Text',
        createLayout: function () {
            return this.layout || (this.layout = [{
                    label: '',
                    cls: 'note-text-row',
                    name: 'Notes',
                    type: 'textarea'
                }]);
        }
    });
    lang.setObject('Mobile.SalesLogix.Views.TextEdit', __class);
    return __class;
});

/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/List.js"/>

define('Mobile/SalesLogix/Views/Address/List', ['Sage/Platform/Mobile/List'], function() {

    return dojo.declare('Mobile.SalesLogix.Views.Address.List', [Sage.Platform.Mobile.List], {
        //Templates
        itemTemplate: new Simplate([
            '<h4>{%: $.$descriptor %}</h4>',
            '<div class="note-text-item">',
                '<div class="note-text-wrap">',
                    '{%: Mobile.SalesLogix.Format.address($, true, "\\n") %}',
                    '<em>{%: $.IsPrimary ? " - Primary" : "" %}</em>',
                '</div>',
            '</div>'
        ]),

        //Localization
        titleText: 'Additional Addresses',

        //View Properties        
        detailView: 'account_detail',
        icon: 'content/images/icons/Map_24.png',
        id: 'address_list',
        security: null, //'Entities/Address/View',
        insertSecurity: 'Entities/Address/Add',
        insertView: 'address_edit',
        // queryOrderBy: '',
        // querySelect: [],
        queryWhere: 'EntityId eq "${0}" and id ne "${1}"',
        resourceKind: 'addresses',

        formatSearchQuery: function(query) {
            return dojo.string.substitute(query, [this.entry.EntityId, this.entry[$key]]);
        },
        // Disable Add/Insert on toolbar
        createToolLayout: function() {
            return this.tools || (this.tools = {
                tbar: []
            });
        },
        isNavigationDisabled: function() { return true; }
    });
    
});
/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/List.js"/>

define('Mobile/SalesLogix/Views/Address/List', ['Sage/Platform/Mobile/List'], function() {

    return dojo.declare('Mobile.SalesLogix.Views.Address.List', [Sage.Platform.Mobile.List], {
        //Templates
        rowTemplate: new Simplate([
            '<li data-action="activateEntry" data-key="{%= $.$key %}" data-descriptor="{%: $.$descriptor %}">',
            '<div data-action="selectEntry" class="list-item-selector"></div>',
            '{%! $$.itemTemplate %}',
            '</li>'
        ]),
        itemTemplate: new Simplate([
            '<div>',
                '<h3>{%: $.$descriptor %}</h3>',
                '<h4>{%= Mobile.SalesLogix.Format.address($, true) %}</h4>',
            '</div>'
        ]),

        //Localization
        titleText: 'Addresses',

        //View Properties        
        detailView: null,
        icon: 'content/images/icons/Map_24.png',
        id: 'address_list',
        security: null, //'Entities/Address/View',
        insertSecurity: 'Entities/Address/Add',
        insertView: 'address_edit',
        resourceKind: 'addresses',

        queryWhere: function() {
            return dojo.string.substitute('EntityId eq "${0}"', [this.feed.$resources[0].EntityId]);
        },
        formatSearchQuery: function(query) {
            return dojo.string.substitute('(Description like "${0}%" or City like "${0}%")', [this.escapeSearchQuery(query.toUpperCase())]);
        },
        // Disable Add/Insert on toolbar
        createToolLayout: function() {
            return this.tools || (this.tools = {
                tbar: []
            });
        },
        selectEntry: function(params) {
            var row = dojo.query(params.$source).closest('[data-key]')[0],
                key = row ? row.getAttribute('data-key') : false;

            if (this._selectionModel && key)
                App.showMapForAddress(Mobile.SalesLogix.Format.address(this.entries[key], true, ' '));
        }
    });
    
});
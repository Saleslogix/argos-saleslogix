/// <reference path="../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../argos-sdk/src/Detail.js"/>

define('Mobile/SalesLogix/Views/PickList', ['Sage/Platform/Mobile/List'], function() {
    dojo.declare('Mobile.SalesLogix.Views.PickList', [Sage.Platform.Mobile.List], {
        //Templates
        itemTemplate: new Simplate([
            '<h3>{%: $.text %}</h3>'
        ]),

        //View Properties
        id: 'pick_list',
        expose: false,
        resourceKind: 'picklists',
        resourceProperty: 'items',

        formatSearchQuery: function(query) {
            return dojo.string.substitute('upper(text) like "${0}%"', [this.escapeSearchQuery(query.toUpperCase())]);
        },
        show: function(options) {
            this.set('title', options && options.title || this.title);
            this.inherited(arguments);
        },
        createRequest: function() {
            return Mobile.SalesLogix.Views.PickList.superclass.createRequest.call(this)
                .setContractName('system');
        }
    });
});
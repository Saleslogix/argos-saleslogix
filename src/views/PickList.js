/// <reference path="../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../argos-sdk/src/Detail.js"/>

Ext.namespace("Mobile.SalesLogix");

Mobile.SalesLogix.PickList = Ext.extend(Sage.Platform.Mobile.List, {
    //Templates
    contentTemplate: new Simplate([
        '<h3>{%: $.text %}</h3>'
    ]),    

    //View Properties
    id: 'pick_list',
    expose: false,
    resourceKind: 'picklists',
    resourceProperty: 'items',

    formatSearchQuery: function(query) {
        return String.format('upper(text) like "{0}%"', query.toUpperCase());
    },
    show: function(options) {
        this.setTitle(options && options.title || this.title);

        Mobile.SalesLogix.PickList.superclass.show.apply(this, arguments);
    },
    createRequest: function() {
        return Mobile.SalesLogix.PickList.superclass.createRequest.call(this)
            .setContractName('system');        
    }
});
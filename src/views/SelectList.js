/// <reference path="../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../argos-sdk/src/Detail.js"/>

Ext.namespace("Mobile.SalesLogix");

Mobile.SalesLogix.SelectList = Ext.extend(Sage.Platform.Mobile.List, {
    //Templates
    contentTemplate: new Simplate([
        '<h3>{%: $.$descriptor %}</h3>'
    ]),

    //View Properties
    id: 'select_list',
    expose: false,

    refreshRequiredFor: function(options) {
        if (this.options)
            return options ? (this.options.data != options.data) : false;
        else
            return true;
    },
    hasMoreData: function() {
        return false;
    },
    requestData: function() {
        // caller is responsible for passing in a well-structured feed object.
        var data = this.expandExpression(this.options && this.options.data);
        if (data) this.processFeed(data);        
    }
});
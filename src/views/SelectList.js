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

    requestData: function() {
        var data = this.expandExpression(this.options && this.options.data);
        if (data)
        {
            this.processFeed({
                '$itemsPerPage': 25,
                '$resources': data,
                '$startIndex': 1,
                '$totalResults': data.length
            });
        }
    }
});
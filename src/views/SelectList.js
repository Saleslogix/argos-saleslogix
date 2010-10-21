/// <reference path="../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../argos-sdk/src/Detail.js"/>

Ext.namespace("Mobile.SalesLogix");

Mobile.SalesLogix.SelectList = Ext.extend(Sage.Platform.Mobile.List, {
    // todo: disable search until implemented
    id: 'select_list',
    expose: false,
    contentTemplate: new Simplate([
        '<h3>{%: $.$descriptor %}</h3>'
    ]),
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
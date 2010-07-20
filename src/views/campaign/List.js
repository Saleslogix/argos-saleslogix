/// <reference path="../../../../ext/ext-core-debug.js"/>
/// <reference path="../../../../Simplate.js"/>
/// <reference path="../../../../sdata/SDataResourceCollectionRequest.js"/>
/// <reference path="../../../../sdata/SDataService.js"/>
/// <reference path="../../../../platform/View.js"/>
/// <reference path="../../../../platform/List.js"/>

Ext.namespace("Mobile.SalesLogix.Campaign");

Mobile.SalesLogix.Campaign.List = Ext.extend(Sage.Platform.Mobile.List, {   
    contentTemplate: new Simplate([
        '<a href="#campaign_detail" target="_detail" m:key="{%= $key %}" m:descriptor="{%: $descriptor %}">',
        '<h3>{%: $["CampaignName"] %}</h3>',
        '</a>'
    ]),    
    constructor: function(o) {
        Mobile.SalesLogix.Campaign.List.superclass.constructor.call(this);        
        
        Ext.apply(this, o, {
            id: 'campaign_list',
            title: 'Campaigns',
            resourceKind: 'campaigns',
            pageSize: 10,
            icon: 'content/images/campaigns_detail_24x24.gif'
        });

        Ext.apply(this.tools || {}, {            
            fbar: [{
                name: 'test',
                title: 'note',                        
                cls: 'tool-note',  
                icon: 'content/images/Note_32x32.gif',               
                fn: function() { alert("one"); },
                scope: this                
            },{
                name: 'test2',
                title: 'note',                        
                icon: 'content/images/Whats_New_3D_Files_32x32.gif',             
                fn: function() { alert("two");},
                scope: this                
            }]            
        })
    },  
    formatSearchQuery: function(query) {
        return String.format('CampaignName like "%{0}%"', query);
    },
    createRequest: function() {
        var request = Mobile.SalesLogix.Campaign.List.superclass.createRequest.call(this);

        request
            .setQueryArgs({
                'orderby': 'CampaignName',
                'select': 'CampaignName'                
            });

        return request;
    }
});
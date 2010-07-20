/// <reference path="../../../../ext/ext-core-debug.js"/>
/// <reference path="../../../../Simplate.js"/>
/// <reference path="../../../../sdata/SDataResourceCollectionRequest.js"/>
/// <reference path="../../../../sdata/SDataService.js"/>
/// <reference path="../../../../platform/View.js"/>
/// <reference path="../../../../platform/List.js"/>

Ext.namespace("Mobile.SalesLogix.Account");

Mobile.SalesLogix.Account.List = Ext.extend(Sage.Platform.Mobile.List, {   
    itemTemplate: new Simplate([
        '<li>',
		'<input type="checkbox" m:key="{%= $key %}" class="list_view_selector"/>',
        '<a href="#account_detail" target="_detail" m:key="{%= $key %}" m:descriptor="{%: $descriptor %}">',
        '<h3>{%: $["AccountName"] %}</h3>',
        '<h4>{%: $["AccountManager"] ? $ ["AccountManager"]["UserInfo"]["UserName"] : "" %}</h4>',
        '</a>',
        '</li>'
    ]),    
    constructor: function(o) {
        Mobile.SalesLogix.Account.List.superclass.constructor.call(this);        
        
        Ext.apply(this, o, {
            id: 'account_list',
            title: 'Accounts',
            resourceKind: 'accounts',
            pageSize: 10,
            icon: 'content/images/Accounts_24x24.gif'
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
            },{
                name: 'test3',
                title: 'starIt',
                icon: 'content/images/To_Do_32x32.gif',
                fn: function() {
					if (this.isActive()) {
					    var checked_records = this.el.query("input.list_view_selector:checked");
						var checked_keys = [];
						for (var i = 0, len = checked_records.length; i < len; i++) {
						    checked_keys.push(checked_records[i].getAttribute("m:key"));
						}
						alert(checked_keys.join(","));
					}
				},
                scope: this
            }]            
        })
    },  
    formatSearchQuery: function(query) {
        return String.format('AccountName like "%{0}%"', query);
    },
    createRequest: function() {
        var request = Mobile.SalesLogix.Account.List.superclass.createRequest.call(this);

        request
            .setQueryArgs({
                'include': 'AccountManager/UserInfo',
                'orderby': 'AccountName',                
                'select': [
                    'AccountName',
                    'AccountManager/UserInfo/UserName'
                ].join(',')
            });

        return request;
    }
});
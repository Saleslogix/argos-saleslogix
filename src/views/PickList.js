Ext.namespace("Mobile.SalesLogix");

Mobile.SalesLogix.PickList = Ext.extend(Sage.Platform.Mobile.List, {
    id: 'pick_list',
    expose: false,
    resourceKind: 'picklists',
    resourceProperty: 'items',
    contentTemplate: new Simplate([
        '<h3>{%: $.text %}</h3>'
    ]),    
    formatSearchQuery: function(query) {
        return String.format('text like "%{0}%"', query);
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

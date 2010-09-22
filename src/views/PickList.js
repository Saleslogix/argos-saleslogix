Ext.namespace("Mobile.SalesLogix");

Mobile.SalesLogix.PickList = Ext.extend(Sage.Platform.Mobile.List, {
    resourceProperty: 'items',
    contentTemplate: new Simplate([
        '<a target="_detail" data-key="{%= $key %}" data-descriptor="{%: $descriptor %}">',
        '<h3>{%: $.text %}</h3>',
        '</a>'
    ]),
    constructor: function(o) {
        Mobile.SalesLogix.PickList.superclass.constructor.call(this);

        Ext.apply(this, o, {
            id: 'pick_list',
            pageSize: 25,
            expose: false
        });
    },
    formatSearchQuery: function(query) {
        return String.format('text like "%{0}%"', query);
    },
    createRequest: function() {
        var request = Mobile.SalesLogix.PickList.superclass.createRequest.call(this);

        request
            .setContractName('system')
            .setDataSet('-')
            .setResourceKind('picklists')
            .setQueryArg('format', 'json');

        return request;
    }
});

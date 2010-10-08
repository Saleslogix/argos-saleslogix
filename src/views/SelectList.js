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
            this.processFeed(data);
        }
    }
});

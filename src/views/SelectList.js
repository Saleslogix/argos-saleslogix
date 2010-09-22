Ext.namespace("Mobile.SalesLogix");

Mobile.SalesLogix.SelectList = Ext.extend(Sage.Platform.Mobile.List, {
    itemTemplate: new Simplate([
        '<li>',
        '<div data-key="{%= $["$key"] %}" class="list-item-selector"></div>',
        '<a target="_detail" data-key="{%= $key %}">',
        '<h3>{%= $descriptor %}</h3>',
        '</a>',
        '</li>'
    ]),
    constructor: function(o) {
        Mobile.SalesLogix.SelectList.superclass.constructor.call(this);

        Ext.apply(this, o, {
            id: 'select_list',
            pageSize: 25,
            expose: false
        });
    },
    show: function(options) {
        var ent;
        this.list = {};
        
        for (var i = 0, len = options.list.length; i < len; i++) 
        {
            ent = options.list[i];
            ent.sort = i;
            this.list[ent['$key']] = ent;
        }
        Mobile.SalesLogix.SelectList.superclass.show.call(this, options);
    },
    refresh: function() {
        var o = [];
        this.entries = {};
        for (var entry in this.list)
        {
            this.entries[entry] = this.list[entry];
            o.push(this.itemTemplate.apply(this.list[entry]));
        }
        Ext.DomHelper.overwrite(Ext.get('select_list'), o.join(''));
    }
});

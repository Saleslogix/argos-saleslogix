define('Mobile/SalesLogix/Views/SelectList', [
    'dojo/_base/declare',
    'dojo/store/Memory',
    'argos/List'
], function(
    declare,
    Memory,
    List
) {

    return declare('Mobile.SalesLogix.Views.SelectList', [List], {
        //Templates
        itemTemplate: new Simplate([
            '<h3>{%: $.$descriptor %}</h3>'
        ]),

        //View Properties
        id: 'select_list',
        expose: false,
        memory: null,

        onActivate: function() {
            if (this.memory && this.memory.setData)
                this.memory.setData(this.options && this.options.data['$resources']);
        },
        refreshRequiredFor: function(options) {
            if (this.options)
                return options ? (this.options.data != options.data) : false;
            else
                return true;
        },
        hasMoreData: function() {
            return false;
        },
        createStore: function() {
            this.memory = this.memory || new Memory({
                idProperty: '$key',
                data: this.options && this.options.data['$resources']
            });

            return this.memory;
        }
    });
});
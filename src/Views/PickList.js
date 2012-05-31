define('Mobile/SalesLogix/Views/PickList', [
    'dojo/_base/declare',
    'dojo/string',
    'Sage/Platform/Mobile/List'
], function(
    declare,
    string,
    List
) {

    return declare('Mobile.SalesLogix.Views.PickList', [List], {
        //Templates
        rowTemplate: new Simplate([
            '<li data-action="activateEntry" data-key="{%: $.$key %}" data-descriptor="{%: $.$descriptor %}">',
            '<div data-action="selectEntry" class="list-item-selector"></div>',
            '<div class="list-item-content">{%! $$.itemTemplate %}</div>',
            '</li>'
        ]),

        itemTemplate: new Simplate([
            '<h3>{%: $.text %}</h3>'
        ]),

        //View Properties
        id: 'pick_list',
        expose: false,
        resourceKind: 'picklists',
        resourceProperty: 'items',

        show: function(options) {
            this.set('title', options && options.title || this.title);
            this.inherited(arguments);
        },
        processFeed: function(feed) {
            this.inherited(arguments);
            this._loadPreviousSelections();
        },
        formatSearchQuery: function(searchQuery) {
            return string.substitute('upper(text) like "${0}%"', [this.escapeSearchQuery(searchQuery.toUpperCase())]);
        },
        createRequest: function() {
            return this.inherited(arguments).setContractName('system');
        }
    });
});
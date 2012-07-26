define('Mobile/SalesLogix/Views/PickList', [
    'dojo/_base/declare',
    'dojo/string',
    'Sage/Platform/Mobile/List',
    'Sage/Platform/Mobile/_SDataListMixin'
], function(
    declare,
    string,
    List,
    _SDataListMixin
) {

    return declare('Mobile.SalesLogix.Views.PickList', [List, _SDataListMixin], {
        //Templates
        rowTemplate: new Simplate([
            '<li data-action="activateEntry" data-key="{%: $.$key %}" data-descriptor="{%: $.$descriptor %}">',
            '<div data-action="selectEntry" class="list-item-selector"></div>',
            '{%! $$.itemTemplate %}',
            '</li>'
        ]),

        itemTemplate: new Simplate([
            '<h3>{%: $.text %}</h3>'
        ]),

        //View Properties
        id: 'pick_list',
        expose: false,
        contractName: 'system',
        resourceKind: 'picklists',
        resourceProperty: 'items',

        /* todo: implement loading of previous selections */
        /*
        processFeed: function(feed) {
            this.inherited(arguments);
            this._loadPreviousSelections();
        },
        */
        formatSearchQuery: function(searchQuery) {
            return string.substitute('upper(text) like "${0}%"', [this.escapeSearchQuery(searchQuery.toUpperCase())]);
        }
    });
});
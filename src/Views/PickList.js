/// <reference path="../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../argos-sdk/src/Detail.js"/>

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
            '<li data-action="activateEntry" ',
                '{% if($$.pickListType === "text" && $$.multi) { %}',
                    'data-key="{%: $.$descriptor %}" ',
                '{% } else { %}',
                    'data-key="{%: $.$key %}" ',
                '{% } %}',

                'data-descriptor="{%: $.$descriptor %}" ',

                '{% if($$.multi && $$._selectionModel.selections[$.$descriptor]) { %}',
                    'class="{%: $$.listSelectedClass %}"',
                '{% } %}',
            '>',
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
        resourceKind: 'picklists',
        resourceProperty: 'items',
        listSelectedClass: 'list-item-selected',

        multi: false,
        previousSelections: null,
        pickListType: null,

        show: function(options) {
            this.set('title', options && options.title || this.title);

            this.multi = options.multi || false;
            this.previousSelections = options.previousSelections || [];
            this.pickListType = options.pickListType;
            if(this.multi && this.pickListType === 'text') {
                this.enableMultiSelection();
            }
            this.inherited(arguments);
        },
        enableMultiSelection: function(){
            this.allowSelection = true;
            this.selectionOnly = true;
            this.autoClearSelection = false;
            this._selectionModel.singleSelection = false;
        },
        formatSearchQuery: function(searchQuery) {
            return string.substitute('upper(text) like "${0}%"', [this.escapeSearchQuery(searchQuery.toUpperCase())]);
        },
        createRequest: function() {
            return Mobile.SalesLogix.Views.PickList.superclass.createRequest.call(this)
                .setContractName('system');
        }
    });
});
/// <reference path="../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../argos-sdk/src/Detail.js"/>

define('Mobile/SalesLogix/Views/PickList', ['Sage/Platform/Mobile/List'], function() {

    return dojo.declare('Mobile.SalesLogix.Views.PickList', [Sage.Platform.Mobile.List], {
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
        transitionTo: function(){
            if(this.multi)
                this.loadPreviousSelections();
            this.inherited(arguments);
        },
        enableMultiSelection: function(){
            this.allowSelection = true;
            this.selectionOnly = true;
            this.autoClearSelection = false;
            this._selectionModel.singleSelection = false;
        },
        loadPreviousSelections: function(){
            var selections = this.previousSelections,
                selectionsLength = selections.length,
                i,
                data,
                key;

            for(i = 0; i < selectionsLength; i += 1){
                data = selections[i];
                key = data;
                this._selectionModel.select(key, data);
            }
        },
        formatSearchQuery: function(query) {
            return dojo.string.substitute('upper(text) like "${0}%"', [this.escapeSearchQuery(query.toUpperCase())]);
        },
        createRequest: function() {
            return Mobile.SalesLogix.Views.PickList.superclass.createRequest.call(this)
                .setContractName('system');
        }
    });
});
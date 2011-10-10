/// <reference path="../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../argos-sdk/src/Detail.js"/>

define('Mobile/SalesLogix/Views/PickList', ['Sage/Platform/Mobile/List'], function() {

    return dojo.declare('Mobile.SalesLogix.Views.PickList', [Sage.Platform.Mobile.List], {
        //Templates
        itemTemplate: new Simplate([
            '<h3>{%: $.text %}</h3>'
        ]),

        //View Properties
        id: 'pick_list',
        expose: false,
        resourceKind: 'picklists',
        resourceProperty: 'items',

        multi: false,
        selections: {},
        previousSelections: [],

        show: function(options) {
            this.set('title', options && options.title || this.title);
            this.multi = options.multi || false;
            if(this.multi) {
                this.previousSelections = options.selections;
            }
            this.inherited(arguments);
        },
        clear: function(){
            this.inherited(arguments);
            this.clearSelections();
        },
        processFeed: function(){
            this.inherited(arguments);
            this.loadSelections();
        },
        emptySelection: function() {
            if(this.multi)
                this.clearSelections();

            this.inherited(arguments);
        },
        loadSelections: function(){
            var selections = this.previousSelections,
                selectionsLength = selections.length,
                i,
                queryTemplate = '[data-descriptor="${0}"]',
                data,
                node,
                nodeKey;

            for(i = 0; i < selectionsLength; i += 1){
                data = selections[i];
                node = dojo.query(dojo.string.substitute(queryTemplate, [data]));
                if(node.length === 0) continue;
                nodeKey = dojo.attr(node[0], 'data-key');
                this.select(nodeKey, data, node[0]);
            }
        },
        clearSelections: function(){
            for (var key in this.selections){
                this.deselect(key, this.selections[key].data, this.selections[key].node);
            }
            this.selections = {};
        },
        activateEntry: function(){
            if(this.multi){
                this.toggle(arguments);
            } else {
                this.inherited(arguments);
            }
        },
        toggle: function(params) {
            var key = params[0].key,
                data = params[0].descriptor,
                node = params[0]['$source'];

            if (this.isSelected(key, data, node)) {
                this.deselect(key, data, node);
            } else {
                this.select(key, data, node);
            }
        },
        select: function(key, data, node) {
            if (!this.selections.hasOwnProperty(key)) {
                this.selections[key] = {data: data, node: node};
                dojo.addClass(node, 'list-item-selected');
            }
        },
        deselect: function(key, data, node) {
            if (this.selections.hasOwnProperty(key)) {
                delete this.selections[key];
                dojo.removeClass(node, 'list-item-selected');
            }
        },
        isSelected: function(key) {
            return this.selections[key];
        },
        getSelections: function() {
            var selections = [];
            for (var key in this.selections) {
                if (this.selections.hasOwnProperty(key)) {
                    selections.push(this.selections[key].data);
                }
            }
         return selections;
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
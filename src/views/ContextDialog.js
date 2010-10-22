/// <reference path="../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../argos-sdk/src/Detail.js"/>

Ext.namespace("Mobile.SalesLogix");

/// this is a very simple home view.
Mobile.SalesLogix.ContextDialog = Ext.extend(Sage.Platform.Mobile.View, {
    attachmentPoints: {
        contentEl: '.list-content'
    },
    activitiesText: 'Activities',
    cancelText: 'Cancel',
    contextItems: [],
    detailView: false,
    notesText: 'Notes',
    parentViewId: '',
    relatedKey: false,
    viewTemplate: new Simplate([
        '<div id="{%= id %}" class="dialog">',
            '<fieldset>',
                '<ul class="list-content"></ul>',
            '</fieldset>',
        '</div>'
    ]),
    itemTemplate: new Simplate([
        '<li data-action="activateButton" data-view="{%= $.view %}" ',
            'data-descriptor="{%: $.$descriptor %}" data-where="{%= $.where %}">',
        '<a href="#" class="button activities blueButton">{%: $.title %}</a>',
        '</li>'
    ]),
    cancelButtonTemplate: new Simplate([
        '<li data-action="dismissDialog">',
        '<a href="#" class="button dismissButton redButton">{%: $.cancelText %}</a>',
        '</li>'
    ]),
    activateButton: function(params) {
        var o = {
                'key': this.relatedKey
            },
            navigateToRelatedView = Sage.Platform.Mobile.Detail.prototype.navigateToRelatedView;

        if (params.where) o.where = String.format(params.where, this.relatedKey);

        navigateToRelatedView.call(this, params.view, o, params.descriptor);
    },
    constructor: function(o) {
        Mobile.SalesLogix.ContextDialog.superclass.constructor.call(this);

        Ext.apply(this, o, {
            id: 'context_dialog',
            expose: false
        });
    },
    processTemplate: function() {
        var menu = [],
            item;

        for (var i = 0; i < this.contextItems.length; i++)
        {
            item = this.contextItems[i];

            item.title = item.descriptor = this[(item['$key']+'Text')] || item['$key'];

            menu.push(this.itemTemplate.apply(item, this));
        }

        menu.push(this.cancelButtonTemplate.apply(this));
        this.contentEl.update(menu.join(''));
    },
    refreshRequiredFor: function(options) {
        return this.parentViewId !== options.parentViewId;
    },
    show: function(options) {
        Mobile.SalesLogix.ContextDialog.superclass.show.call(this, options);

        this.contextItems = options.contextItems;

        if (this.refreshRequiredFor(options))
        {
            this.processTemplate();
        }

        this.detailView = App.getView(options.detailView);
        this.relatedKey = options.key;
        this.parentViewId = options.parentViewId;
    },
    dismissDialog: function() {
        this.detailView = false;
        this.relatedKey = false;
        this.parentViewId = '';
        this.contextItems = [];
        this.el.dom.removeAttribute('selected');
    }
});
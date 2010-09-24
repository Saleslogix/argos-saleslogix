/// <reference path="../../../ext/ext-core-debug.js"/>
/// <reference path="../../../reui/reui.js"/>
/// <reference path="../../../platform/Application.js"/>
/// <reference path="../../../platform/View.js"/>
/// <reference path="Application.js"/>

Ext.namespace("Mobile.SalesLogix");

/// this is a very simple home view.
Mobile.SalesLogix.ContextDialog = Ext.extend(Sage.Platform.Mobile.View, {
    cancelText: 'Cancel',
    activitiesText: 'Activities',
    notesText: 'Notes',
    detailView: '',
    relatedKey: '',
    viewTemplate: new Simplate([
        '<form id="{%= id %}" class="dialog">',
            '<fieldset>',
                '<ul>',
                    '<li><a href="" class="button activities blueButton">{%= $.activitiesText %}</a></li>',
                    '<li><a href="" class="button notes blueButton">{%= $.notesText %}</a></li>',
                    '<li><a type="cancel" class="button dismissButton redButton">{%= $.cancelText %}</a></li>',
                '</ul>',
            '</fieldset>',
        '</form>'
    ]),
    constructor: function(o) {
        Mobile.SalesLogix.ContextDialog.superclass.constructor.call(this);

        Ext.apply(this, o, {
            id: 'context_dialog',
            expose: false
        });
    },
    init: function() {
        Mobile.SalesLogix.ContextDialog.superclass.init.call(this);
        var getRelatedOptionsFromLayout = function(detailView, type) {
            for (var i = detailView.layout.length - 1; i >= 0; i--) {
                var as = detailView.layout[i].as;
                if (!as) continue;
                for (var j = as.length - 1; j >= 0; j--) {
                    if (as[j].view == type) {
                        return as[j];
                    }
                }
            }
        };

        var handlerForRelatedType = function(evt, el, o, scope, related_view) {
            scope.dismissDialog();

            var detailView = App.getView(scope.detailView),
                o = {},
                activityRelatedOptions = getRelatedOptionsFromLayout(detailView, related_view);
            o.where = detailView.expandExpression(activityRelatedOptions.where, {"$key": scope.relatedKey});

            detailView.navigateToRelatedView(related_view, o);
            //Reset key and descriptor
            scope.detailView = '';
            scope.relatedKey = '';
        };

        this.el
            .on('submit', function(evt, el, o) {
                return false;
            }, this, { preventDefault: true, stopPropagation: true })
            .dom.onsubmit = false; // fix for iui shenanigans

        this.el.select('.dismissButton')
            .on('click', function(evt, el, o) {
                this.dismissDialog();
            }, this, { preventDefault: true, stopPropagation: true });

        this.el.select('.activities')
            .on('click', function(evt, el, o) {
                handlerForRelatedType(evt, el, o, this, "activity_related");
            }, this, { preventDefault: true, stopPropagation: true });

        this.el.select('.notes')
            .on('click', function(evt, el, o) {
                handlerForRelatedType(evt, el, o, this, "note_related");
            }, this, { preventDefault: true, stopPropagation: true });
    },

    show: function(options) {
        Mobile.SalesLogix.ContextDialog.superclass.show.call(this);

        this.detailView = App.getView(options.detailView);
        this.relatedKey = options.key;
    },

    dismissDialog: function() {
        this.el.dom.removeAttribute('selected');
    }
});

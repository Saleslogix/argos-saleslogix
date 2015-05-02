/*
 * See copyright file.
 */

define('crm/Views/RelatedEditWidget', [
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/_base/event',
    'dojo/on',
    'dojo/string',
    'dojo/dom-class',
    'dojo/when',
    'dojo/_base/Deferred',
    'dojo/dom-construct',
    'dojo/query',
    'dojo/dom-attr',
    'dojo/_base/connect',
    'dojo/_base/array',
    'argos/Utility',
    'argos/Format',
    'argos/RelatedViewManager',
    'argos/_RelatedViewWidgetBase',
    'argos/Edit'
], function(
    declare,
    lang,
    event,
    on,
    string,
    domClass,
    when,
    Deferred,
    domConstruct,
    query,
    domAttr,
    connect,
    array,
    utility,
    format,
    RelatedViewManager,
    _RelatedViewWidgetBase,
    Edit
) {
    var rvm, __class;
    __class = declare('crm.Views.RelatedEditWidget', [_RelatedViewWidgetBase], {
        cls: 'related-edit-widget',
        owner: null,
        id: 'related-edit-widget',
        editView: null,
        toolBarTemplate: new Simplate([
           '<div class="toolBar">',
              '<button class="button toolButton toolButton-right  fa fa-save fa-fw fa-lg" data-action="save"></button>',
           '<div>'
        ]),
        onLoad: function() {
            this.processEntry(this.parentEntry);
        },
        processEntry: function(entry) {
            var toolBarNode,
                options,
                editView,
                ctor;
            ctor = (this.editView) ? this.editView : Edit;
            editView = new ctor({ id: this.id + '_edit' });
            if (editView && !editView._started) {
                editView.sectionBeginTemplate = new Simplate([
                     '<fieldset class="{%= ($.cls || $.options.cls) %}">'
                ]);
                editView.init();
                editView._started = true;
                editView.onUpdateCompleted = this.onUpdateCompleted.bind(this);
            }
            //Add the toolbar for save
            toolBarNode = domConstruct.toDom(this.toolBarTemplate.apply(entry, this));
            on(toolBarNode, 'click', this.onInvokeToolBarAction.bind(this));
            domConstruct.place(toolBarNode, this.containerNode, 'last');

            //Add the edit view to view
            editView.placeAt(this.containerNode, 'last');

            options = {
                select: this.getEditSelect(),
                key: entry.$key
            };
            editView.options = options;
            editView.activate();
            editView.requestData();
            this.editViewInstance = editView;
        },
        onInvokeToolBarAction: function(evt) {
            this.editViewInstance.save();
            event.stop(evt);
        },
        getEditLayout: function() {
            var editLayout = [];
            if (this.layout) {
                this.layout.forEach(function(item) {
                    if (!item.readonly) {
                        editLayout.push(item);
                    }
                }.bind(this));
            }
            return editLayout;
        },
        getEditSelect: function() {
            var select = null;
            if (this.formModel) {
                select = this.formModel.getEditSelect();
            }
            return select;
        },
        onUpdateCompleted: function() {
            if (this.owner && this.owner._refreshClicked) {
                this.owner._refreshClicked();
            }
            this.inherited(arguments);
        },
        destroy: function() {
            array.forEach(this._subscribes, function(handle) {
                connect.unsubscribe(handle);
            });

            if (this.editViewInstance) {
                for (var name in this.editViewInstance.fields) {
                    if (this.editViewInstance.fields.hasOwnProperty(name)) {
                        this.editViewInstance.fields[name].destroy();
                    }
                }
                this.editViewInstance.destroy();
            }
            this.inherited(arguments);
        }
    });
    rvm = new RelatedViewManager();
    rvm.registerType('relatedEdit', __class);
    return __class;
});

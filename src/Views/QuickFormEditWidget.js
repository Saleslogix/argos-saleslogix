/* 
 * See copyright file.
 */


define('crm/Views/QuickFormEditWidget', [
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
    'dijit/_Widget',
    'argos/_Templated',
    'argos/RelatedViewManager',
    'argos/RelatedViewDetailWidget',
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
    _Widget,
    _Templated,
    RelatedViewManager,
    RelatedViewDetailWidget,
    Edit
    ) {
    var quickFormEdit = declare('crm.Views.QuickFormEditWidget', [RelatedViewDetailWidget], {
        owner: null,
        id: 'quickform-related-edit-view',
        icon: 'content/images/icons/ContactProfile_48x48.png',
        iconClass: 'fa fa-building-o fa-2x',
        rows: 3,
        quickFormName: null,
        quickFormModel: null,
        quickFormService: null,
        toolBarTemplate: new Simplate([
           '<div class="toolBar">',
               //'<h2>mytoolbar</h2>',
              '<button class="button toolButton toolButton-right  fa fa-save fa-fw fa-lg" data-action="save"></button>',
           '<div>'
        ]),
        onInit: function(options) {
            this._isInitLoad = true;
            this.quickFormService = App.serviceManager.get('quickFormService');
            this.entityService = App.serviceManager.get('entityService');
            this.inherited(arguments);
        },
        onLoad: function () {
            var promise;

            if (!this.loadingNode) {
                this.loadingNode = domConstruct.toDom(this.loadingTemplate.apply(this));
                domConstruct.place(this.loadingNode, this.contentNode, 'last', this);
            }
            domClass.toggle(this.loadingNode, 'loading');

            if (this.quickFormService) {
                if ((!this.quickFormName) && (this.entityName)) {
                    this.quickFormName = this.entityName + "MobileDetail";
                }
                if (this.quickFormName) {
                    promise = this.quickFormService.getModel(this.quickFormName);
                    promise.then(function (formModel) {
                        if (formModel) {
                            domClass.toggle(this.loadingNode, 'loading');
                            this.processFormModel(formModel);
                        }
                    }.bind(this));
                }
            }
        },
        processEntityModel: function (entityModel) {

        },
        processEntry: function (entry) {
            var toolBarNode,
                options,
                editView = new Edit({ id: this.id + '_edit' });

            if (editView && !editView._started) {
                editView.sectionBeginTemplate = new Simplate([
                     '<fieldset class="{%= ($.cls || $.options.cls) %}">'
                ]);
                editView.layout = this.getEditLayout();
                editView.resourceKind = this.resourceKind;
                editView.entry = entry;
                editView.init();
                editView._started = true;
            }
            //Add the toolbar for save
            toolBarNode = domConstruct.toDom(this.toolBarTemplate.apply(entry, this));
            on(toolBarNode, 'click', lang.hitch(this, this.onInvokeToolBarAction));
            domConstruct.place(toolBarNode, this.contentNode, 'last');

            //Add the edit view to view
            editView.placeAt(this.contentNode, 'last');

            options = {
                entry: entry,
                key: entry.$key
            };
            editView.options = options;
            editView.activate();
            editView.requestData();
            this.editViewInstance = editView;

        },
        processFormModel: function(formModel){
            var promise, queryOptions;
            this.quickFormModel = formModel;
            this.layout = formModel.layout;
            this.formModel = formModel;
            
            if (!this.entityName) {
                this.entityName = formModel.getMainEntityName();
            }
            queryOptions = {
                select: formModel.getSelect(),
                include: formModel.getInclude()
            };

            if (this.owner.entry) {
                promise = this.entityService.getEntityById(this.entityName, this.parentKey, queryOptions);
                promise.then(function (entity) {
                    this.entry = entity;
                    if (entity) {
                        domClass.toggle(this.loadingNode, 'loading');
                        this.processEntry(entity);
                    }
                }.bind(this));
            }
        },
        onInvokeToolBarAction: function (evt) {
            this.editViewInstance.save();
            event.stop(evt);

        },
        getEditLayout:function(){
            var editLayout = [];
            if (this.layout) {
                this.layout.forEach(function (item) {
                    if (!item.readonly) {
                         editLayout.push(item);
                    }
                }.bind(this));
            }
            return editLayout;
        },
        destroy: function () {
            array.forEach(this._subscribes, function (handle) {
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
    var rvm = new RelatedViewManager();
    rvm.registerType('quickFormEdit', quickFormEdit);
    return quickFormEdit;
});

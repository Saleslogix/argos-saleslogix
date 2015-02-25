/* 
 * See copyright file.
 */


define('crm/Views/QuickFormDetailWidget', [
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
    'argos/ErrorManager',
    'argos/FieldManager'



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
    ErrorManager,
    FieldManager
) {
    var quickFormView = declare('crm.Views.QuickFormDetailWidget', [RelatedViewDetailWidget], {
        owner: null,
        id: 'quickform-related-detail-view',
        icon: 'content/images/icons/ContactProfile_48x48.png',
        iconClass: 'fa fa-building-o fa-2x',
        rows: 3,
        quickFormName: null,
        quickFormModel: null,
        quickFormService: null,
        itemContentTemplate: new Simplate([
          '{%! $$.itemHeaderTemplate %}'
        ]),
        itemIconTemplate: new Simplate([
            '<div class="selector">',
            '{% if ($$.iconClass) { %}',
               '<div class="icon {%= $$.iconClass %}"></div>',
            '{% } %}',
            '</div>',
        ]),
        itemHeaderTemplate: new Simplate([
          '<div class="header {%: $$.headerClass %}">',
              '{%! $$.itemIconTemplate %}',
              '<h3>{%: $.HeaderValue %}</h3>',
          '</div>'
        ]),
        itemRowTemplate: new Simplate([
            '<div class="row {%: $$.rowClass %}" data-property="{%: $.$layout.property %}" data-rowindex="{%: $.$index %}">',
                 '{%! $$.itemTemplate %}',
            '</div>'
        ]),
        itemTemplate: new Simplate([
            '<div id="label" class="labelCell">',
              '{%! $$.itemLabelTemplate %}',
            '</div>',
            '<div id="value" class="valueCell">',
               '<div class="value">',
                   '<h4>{%! $$.itemValueTemplate %}</h4>',
                '</div>',
            '</div>'
        ]),
        itemLabelTemplate: new Simplate([
            '{% if ($.$layout.readonly) { %}',
                 '<div class="label"><h4>{%: $.$layout.label %}</h4></div>',
            '{% } else { %}',
                '<div class="label edit"><h4>{%: $.$layout.label %}</h4></div>',
            '{% } %}'
        ]),
        itemValueTemplate: new Simplate([
                '{%: $.$value %}',
        ]),
        itemEditRowTemplate: new Simplate([
            '<div class="label"><h4>{%: $.label %}</h4></div>',
            '<div class="editCell {%: $$.editCls %}" data-edit-field="{%: $.name %}" data-rowindex="{%: $.$index %}" data-field-type="{%: $.type %}">',
           '</div>'
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
                if ((!this.quickFormName) && (this.owner.entityName)) {
                    this.quickFormName = this.owner.entityName + "MobileDetail";
                }
                if (this.quickFormName) {
                    promise = this.quickFormService.getModel(this.quickFormName);
                    promise.then(function (formModel) {
                        if (formModel) {
                            this.processFormModel(formModel);
                            domClass.toggle(this.loadingNode, 'loading');
                        }
                    }.bind(this));
                }
            }
            
        },
        processEntry:function(entry){
            var docFrag, itemsFrag, contentNode, colNode, 
                rowFrag, rowNode, rowCount,
                lastrow, headerValue, 
                itemsNode, layout, 
                item,  
                rowData, rowHTML, rowValueTpl;
            layout = this.layout;
            docFrag = document.createDocumentFragment();
            if (layout.length > 0) {
                headerValue = this.getValue(layout[0], entry);
            }
            contentNode = domConstruct.toDom(this.itemContentTemplate.apply({ HeaderValue: headerValue }, this));
            docFrag.appendChild(contentNode);
            itemsFrag = document.createDocumentFragment();
            itemsNode = domConstruct.toDom('<div class="content-items"></div>');
            rowCount = 0;
            lastrow = false;
            rowValueTpl = this.itemValueTemplate;

            for (var i = 0; i < layout.length; i++) {
                item = layout[i];
                if (layout[0].name != item.name) {
                    if (rowCount === 0) {
                        rowFrag = document.createDocumentFragment();
                        colNode = domConstruct.toDom('<div class="column"></div>');
                        lastrow = false;
                    }

                    if (rowCount <= this.rows - 1)  {
                        rowData = {
                            $index: i,
                            $layout: item,
                            $value: this.getValue(item, entry)
                        };

                        if (item.renderer) {
                            this.itemValueTemplate = new Simplate([rowData.$value]);
                        } else if (item.tpl) {
                            rowData = rowData.$value;
                            if (!rowData) {
                                rowData = {};
                            }

                            rowData.$layout = item;
                            rowData.$index = i;
                            this.itemValueTemplate = item.tpl;
                        } else {
                            this.itemValueTemplate = rowValueTpl;
                        }

                        rowNode = domConstruct.toDom(this.itemRowTemplate.apply(rowData, this));
                        rowFrag.appendChild(rowNode);
                        if ((rowCount === this.rows-1)||(layout.length === i+1)) {
                            lastrow = true;
                        } else {
                            rowCount++;
                        }

                    }

                    if (lastrow) {
                        domConstruct.place(rowFrag, colNode, 'last');
                        itemsFrag.appendChild(colNode);
                        rowCount = 0;
                        lastrow = false;
                    }

                }
            }

            if (itemsFrag.childNodes.length > 0) {
                domConstruct.place(itemsFrag, itemsNode, 'last');
                docFrag.appendChild(itemsNode);

            }

            if (docFrag.childNodes.length > 0) {
                domConstruct.place(docFrag, this.contentNode, 'last');
            }

        },
        getValue: function(layoutItem, entry){
            var value = '', rendered;
            value = utility.getValue(entry, layoutItem.valuePropertyPath, '');
            if (layoutItem['renderer'] && typeof layoutItem['renderer'] === 'function') {
                rendered = layoutItem['renderer'].call(this, value);
                value = layoutItem['encode'] === true
                    ? format.encode(rendered)
                    : rendered;
            }
            return value;
        },
        onRefreshView: function(evt) {
            this._onRefreshView();
            evt.stopPropagation();
        },
        _onRefreshView: function() {
            this.onLoad();
        },
        _onAppRefresh: function(data) {
            if (data && data.data) {
                if(data.resourceKind === this.resourceKind){
                    if (this.parentEntry && (this.parentEntry[this.parentProperty] === utility.getValue(data.data, this.relatedProperty, ''))) {
                        this._onRefreshView();
                    } else {
                        if(this.editViewId === data.id){
                            this._onRefreshView();
                        }
                        if (this.editViewId === data.id) {
                            this._onRefreshView();
                        }
                    }
                }
            }
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
                promise = this.entityService.getEntityById(this.entityName, this.owner.entry.$key, queryOptions);
                promise.then(function (entity) {
                    this.entry = entity;
                    if (entity) {
                        domClass.toggle(this.loadingNode, 'loading');
                        this.processEntry(entity);
                    }
                }.bind(this));
            }
        }
    });
    var rvm = new RelatedViewManager();
    rvm.registerType('quickFormDetail', quickFormView);
    return quickFormView;
});

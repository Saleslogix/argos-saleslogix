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
    '../Action',
    'argos/_ActionMixin',

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
    action,
    _ActionMixin

) {
    var quickFormView = declare('crm.Views.QuickFormDetailWidget', [RelatedViewDetailWidget, _ActionMixin], {
        owner: null,
        id: 'quickform-related-detail-view',
        icon: 'content/images/icons/ContactProfile_48x48.png',
        iconClass: 'fa fa-building-o fa-2x',
        rows: 3,
        quickFormName: null,
        quickFormModel: null,
        quickFormService: null,
        showHeader: true,
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
                   '{%! $$.itemValueTemplate %}',
                '</div>',
            '</div>'
        ]),
        itemLabelTemplate: new Simplate([
            '<div class="label">{%: $.$layout.label %}</div>'
        ]),
        itemValueTemplate: new Simplate([
                '{%: $.$value %}',
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
    
            this.buildView(entry, this.layout);
        },
        buildView: function (entry, layout) {
            var contentNode,
                contentFrag,
                columns,
                colFrag,
                colNode,
                rowNode,
                rowFrag,
                rowData,
                rowHtml,
                rowValueTpl,
                headerValue,
                index,
                itemsFrag, 
                itemsNode;

            contentFrag = document.createDocumentFragment();
            columns = this.getColumnLayout(layout);
            if (this.showHeader) {
                if (columns.length > 0) {
                    headerValue = this.getValue(columns[0].rows[0], entry);
                }
                contentNode = domConstruct.toDom(this.itemContentTemplate.apply({ HeaderValue: headerValue }, this));
                contentFrag.appendChild(contentNode);
            }
            itemsFrag = document.createDocumentFragment();
            itemsNode = domConstruct.toDom('<div class="content-items"></div>');
            rowValueTpl = this.itemValueTemplate;
            index = 0;
            columns.forEach(function (column) {
                index++;
                colNode = domConstruct.toDom('<div class="column"></div>');
                if (column.rows) {
                    column.rows.forEach(function (item) {
                        if ((item.column === 0) && (item.row === 0)&& (this.showHeader)) {
                            return;
                        }
                        rowFrag = document.createDocumentFragment();
                        rowData = {
                            $index: index,
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
                            rowData.$index = index;
                            this.itemValueTemplate = item.tpl;
                        } else {
                            this.itemValueTemplate = rowValueTpl;
                        }
                        rowNode = domConstruct.toDom(this.itemRowTemplate.apply(rowData, this));
                        rowFrag.appendChild(rowNode);
                        domConstruct.place(rowFrag, colNode, 'last');
                    }.bind(this));
                    itemsFrag.appendChild(colNode);
                }
            }.bind(this));

            if (itemsFrag.childNodes.length > 0) {
                domConstruct.place(itemsFrag, itemsNode, 'last');
                contentFrag.appendChild(itemsNode);
            }

            if (contentFrag.childNodes.length > 0) {
                domConstruct.place(contentFrag, this.contentNode, 'last');
            }

        },
        getColumnLayout:function(layout){
            var column, colIndex, columns = [];
            if (layout) {
                layout.sort(function (itemA, itemB) {
                    var aIndex, bIndex;
                    aIndex = itemA.column ? itemA.column: 0;
                    bIndex = itemB.column ? itemB.column: 0;
                    return aIndex - bIndex;
                });
                colIndex = 0;
                layout.forEach(function (item) {
                    if (!item.column) {
                        item.column = 0;
                    }
                    if(colIndex !== item.column){
                        colIndex++;
                        column = null;
                    }
                    if (!column) {
                        column = { id: item.column, rows: [] };
                        columns.push(column);
                    }
                    column.rows.push(item);
                 }.bind(this));
            }
            columns.forEach(function (column) {
                if (column.rows) {
                    column.rows.sort(function (itemA, itemB) {
                        var aIndex, bIndex;
                        aIndex = itemA.row ? itemA.row : 0;
                        bIndex = itemB.row ? itemB.row : 0;
                        return aIndex - bIndex;
                    });
                }
             });
             return columns;
        },
        getValue: function(layoutItem, entry){
            var value = '', values, rendered;
            if (Array.isArray(layoutItem.valuePropertyPath)) {
                if (layoutItem.applyTo === '.') {
                    value = {};
                    //values = {};
                    layoutItem.valuePropertyPath.forEach(function (path) {
                        value[path] = utility.getValue(entry, path, '');
                    }.bind(this));
                } else {
                    value = utility.getValue(entry, layoutItem.parentPropertyPath, '');
                }
                
            } else {
                value = utility.getValue(entry, layoutItem.valuePropertyPath, '');
            }
            if (layoutItem['renderer'] && typeof layoutItem['renderer'] === 'function') {
                rendered = layoutItem['renderer'].call(this, value, layoutItem.valuePropertyPath);
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
            this.layout = formModel.getLayout();
            this.formModel = formModel;
            if (!this.entityName) {
                this.entityName = formModel.getMainEntityName();
            }
            if (this.formModel.modelData.entity.ImagePath) {
                this.iconClass = this.formModel.modelData.entity.ImagePath;
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
        },
        invokeAction: function (action, params, evt, el) {
            var resolvedEntry, selection, propertyName, actionName, options;
            propertyName = params.propertyname;
            actionName = params.name;
           if (this.entry) {
                options = {
                    selection: {
                        data: this.entry
                    },
                    propertyName: propertyName
                };
                this._invokeActionByName(actionName, options);
            }

        },
        _invokeActionByName: function (actionName, options) {
            if (!options) {
                options = {};
            }
            switch (actionName) {
                case 'callPhone':
                    action.callPhone.call(this, null, options.selection, options.propertyName);
                    break;
                case 'sendEmail':
                    action.sendEmail.call(this, null, options.selection, options.propertyName);
                    break;
                default:
                    break;
            }

        },
        setSource:function(){
        }
    });
    var rvm = new RelatedViewManager();
    rvm.registerType('quickFormDetail', quickFormView);
    return quickFormView;
});

define('crm/Views/SpeedSearchList', ['exports', 'module', 'dojo/_base/declare', 'dojo/_base/lang', 'dojo/_base/array', 'dojo/dom-class', 'dojo/dom-construct', 'dojo/string', 'dojo/query', 'dojo/dom-attr', '../SpeedSearchWidget', 'argos/List', 'argos/_LegacySDataListMixin', './_SpeedSearchRightDrawerListMixin', './_CardLayoutListMixin'], function (exports, module, _dojo_baseDeclare, _dojo_baseLang, _dojo_baseArray, _dojoDomClass, _dojoDomConstruct, _dojoString, _dojoQuery, _dojoDomAttr, _SpeedSearchWidget, _argosList, _argos_LegacySDataListMixin, _SpeedSearchRightDrawerListMixin2, _CardLayoutListMixin2) {
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    var _declare = _interopRequireDefault(_dojo_baseDeclare);

    var _lang = _interopRequireDefault(_dojo_baseLang);

    var _array = _interopRequireDefault(_dojo_baseArray);

    var _domClass = _interopRequireDefault(_dojoDomClass);

    var _domConstruct = _interopRequireDefault(_dojoDomConstruct);

    var _string = _interopRequireDefault(_dojoString);

    var _query = _interopRequireDefault(_dojoQuery);

    var _domAttr = _interopRequireDefault(_dojoDomAttr);

    var _SpeedSearchWidget2 = _interopRequireDefault(_SpeedSearchWidget);

    var _List = _interopRequireDefault(_argosList);

    var _LegacySDataListMixin2 = _interopRequireDefault(_argos_LegacySDataListMixin);

    var _SpeedSearchRightDrawerListMixin3 = _interopRequireDefault(_SpeedSearchRightDrawerListMixin2);

    var _CardLayoutListMixin3 = _interopRequireDefault(_CardLayoutListMixin2);

    /**
     * @class crm.Views.SpeedSearchList
     *
     *
     * @extends argos.List
     * @mixins crm.Views._SpeedSearchRightDrawerListMixin
     * @mixins crm.Views._CardLayoutListMixin
     *
     */
    var __class = (0, _declare['default'])('crm.Views.SpeedSearchList', [_List['default'], _LegacySDataListMixin2['default'], _SpeedSearchRightDrawerListMixin3['default'], _CardLayoutListMixin3['default']], {
        //Templates
        itemTemplate: new Simplate(['<h4><strong>{%: $.$heading %}</strong></h4>', '{%! $$.fieldTemplate %}']),

        fieldTemplate: new Simplate(['<ul class="speedsearch-fields">', '{% for(var i = 0; i < $.fields.length; i++) { %}', '<li><h4><span>{%= $.fields[i].fieldName %}</span> {%= $.fields[i].fieldValue %}</h4></li>', '{% } %}', '</ul>']),

        //Localization
        titleText: 'SpeedSearch',

        //View Properties
        id: 'speedsearch_list',
        enableSearch: true,
        enableActions: true,
        searchWidgetClass: _SpeedSearchWidget2['default'],
        expose: false,
        activeIndexes: ['Account', 'Contact', 'Lead', 'Activity', 'History', 'Opportunity', 'Ticket'],
        indexes: [{ indexName: 'Account', indexType: 1, isSecure: true }, { indexName: 'Activity', indexType: 1, isSecure: false }, { indexName: 'Contact', indexType: 1, isSecure: true }, { indexName: 'History', indexType: 1, isSecure: false }, { indexName: 'Lead', indexType: 1, isSecure: true }, { indexName: 'Opportunity', indexType: 1, isSecure: true }, { indexName: 'Ticket', indexType: 1, isSecure: false }],
        types: ['Account', 'Activity', 'Contact', 'History', 'Lead', 'Opportunity', 'Ticket'],
        indexesText: {
            'Account': 'Account',
            'Activity': 'Activity',
            'Contact': 'Contact',
            'History': 'History',
            'Lead': 'Lead',
            'Opportunity': 'Opportunity',
            'Ticket': 'Ticket'
        },
        itemIconByType: {
            'Contact': 'fa-user',
            'Account': 'fa-building-o',
            'Opportunity': 'fa-money',
            'Ticket': 'fa-clipboard',
            'Lead': 'fa-filter',
            'Activity': 'fa-calendar-o',
            'History': 'fa-history'
        },
        currentPage: null,

        clear: function clear() {
            this.inherited(arguments);
            this.currentPage = 0;
        },
        _formatFieldName: function _formatFieldName() {},
        getItemIconClass: function getItemIconClass(entry) {
            var cls,
                typeCls,
                type = entry && entry.type;
            cls = this.itemIconClass;
            typeCls = this.itemIconByType[type];
            if (typeCls) {
                cls = typeCls;
            }

            if (cls) {
                cls = 'fa ' + cls + ' fa-2x';
            }

            return cls;
        },
        extractTypeFromItem: function extractTypeFromItem(item) {
            for (var i = 0; i < this.types.length; i++) {
                if (item.source.indexOf(this.types[i]) !== -1) {
                    return this.types[i];
                }
            }

            return null;
        },
        extractDescriptorFromItem: function extractDescriptorFromItem(item) {
            var descriptor, entityName, rest;

            descriptor = item && item.uiDisplayName;

            if (descriptor) {
                descriptor = descriptor.split(':');
                entityName = descriptor[0];
                rest = descriptor[1];
            }

            return rest;
        },
        extractKeyFromItem: function extractKeyFromItem(item) {
            // Extract the entityId from the display name, which is the last 12 characters
            var displayName, len;
            displayName = item.displayName;
            if (!displayName) {
                return '';
            }

            len = displayName.length;
            return displayName.substring(len - 12);
        },
        more: function more() {
            this.currentPage += 1;
            this.inherited(arguments);
        },
        hasMoreData: function hasMoreData() {
            var total, count;
            total = this.feed.totalCount;
            count = (this.currentPage + 1) * this.pageSize;
            return count < total;
        },
        processFeed: function processFeed(feed) {
            var i, entry, docfrag, remaining, rowNode;

            if (!this.feed) {
                this.set('listContent', '');
            }

            this.feed = feed = feed.response;

            if (feed.totalCount === 0) {
                this.set('listContent', this.noDataTemplate.apply(this));
            } else if (feed.items) {
                docfrag = document.createDocumentFragment();

                for (i = 0; i < feed.items.length; i++) {
                    entry = feed.items[i];
                    entry.type = this.extractTypeFromItem(entry);
                    entry.$descriptor = entry.$descriptor || entry.uiDisplayName;
                    entry.$key = this.extractKeyFromItem(entry);
                    entry.$heading = this.extractDescriptorFromItem(entry);
                    entry.synopsis = window.unescape(entry.synopsis);
                    entry.fields = _array['default'].filter(entry.fields, function (field) {
                        return field.fieldName !== 'seccodelist' && field.fieldName !== 'filename';
                    });

                    this.entries[entry.$key] = entry;
                    rowNode = _domConstruct['default'].toDom(this.rowTemplate.apply(entry, this));
                    docfrag.appendChild(rowNode);
                    this.onApplyRowTemplate(entry, rowNode);
                }

                if (docfrag.childNodes.length > 0) {
                    _domConstruct['default'].place(docfrag, this.contentNode, 'last');
                }
            }

            if (typeof feed.totalCount !== 'undefined') {
                remaining = this.feed.totalCount - (this.currentPage + 1) * this.pageSize;
                this.set('remainingContent', _string['default'].substitute(this.remainingText, [remaining]));
            }

            _domClass['default'].toggle(this.domNode, 'list-has-more', this.hasMoreData());
        },
        createRequest: function createRequest() {
            var request = new Sage.SData.Client.SDataServiceOperationRequest(this.getService()).setContractName('system').setOperationName('executeSearch');
            return request;
        },
        createSearchEntry: function createSearchEntry() {
            var entry = {
                request: {
                    docTextItem: -1,
                    searchText: this.query,
                    searchType: App.speedSearch.searchType,
                    noiseFile: 'PMINoise.dat',
                    includeStemming: App.speedSearch.includeStemming,
                    includeThesaurus: App.speedSearch.includeThesaurus,
                    includePhonic: App.speedSearch.includePhonic,
                    useFrequentFilter: App.speedSearch.useFrequentFilter,
                    indexes: this.getActiveIndexes(),
                    whichPage: this.currentPage,
                    itemsPerPage: this.pageSize,
                    filters: null
                },
                response: null
            };

            return entry;
        },
        getActiveIndexes: function getActiveIndexes() {
            var results = [],
                self = this;
            _array['default'].forEach(this.activeIndexes, function (indexName) {
                _array['default'].forEach(self.indexes, function (index) {
                    if (index.indexName === indexName) {
                        results.push(index);
                    }
                });
            });

            return results;
        },
        requestData: function requestData() {
            _domClass['default'].add(this.domNode, 'list-loading');

            var request = this.createRequest(),
                entry = this.createSearchEntry();

            request.execute(entry, {
                success: _lang['default'].hitch(this, this.onRequestDataSuccess),
                failture: _lang['default'].hitch(this, this.onRequestDataFailure)
            });
        },
        navigateToDetailView: function navigateToDetailView(key, type) {
            var view = App.getView(type.toLowerCase() + '_detail');

            if (view) {
                view.show({
                    key: key
                });
            }
        },
        createToolLayout: function createToolLayout() {
            return this.tools || (this.tools = {
                'tbar': []
            });
        },
        getItemIconAlt: function getItemIconAlt(entry) {
            return entry.type;
        },
        getItemDescriptor: function getItemDescriptor(entry) {
            return entry.type;
        },
        createIndicatorLayout: function createIndicatorLayout() {
            return this.itemIndicators || (this.itemIndicators = [{
                id: 'speadSearchIcon',
                icon: '',
                location: 'top',
                onApply: function onApply(entry, parent) {
                    parent.applyActivityIndicator(entry, this);
                }
            }]);
        },
        applyActivityIndicator: function applyActivityIndicator(entry, indicator) {
            indicator.isEnabled = true;
            indicator.showIcon = false;
            indicator.label = this.indexesText[entry.type];
            indicator.valueText = this.indexesText[entry.type];
        },
        _intSearchExpressionNode: function _intSearchExpressionNode() {
            var html, listNode;
            listNode = (0, _query['default'])('#' + this.id);
            if (listNode[0]) {
                html = this.searchExpressionTemplate.apply(this);
                _domConstruct['default'].place(html, listNode[0], 'first');
            }
        },
        _isIndexActive: function _isIndexActive(indexName) {
            var indexFound = false;
            if (this.activeIndexes.indexOf(indexName) > -1) {
                indexFound = true;
            }
            return indexFound;
        },
        selectIndex: function selectIndex(e) {
            var button = e.$source,
                indexName = _domAttr['default'].get(button, 'data-index'),
                activated = this.activateIndex(indexName);
            if (activated) {
                _domClass['default'].add(button, 'card-layout-speed-search-index-selected');
            } else {
                _domClass['default'].remove(button, 'card-layout-speed-search-index-selected');
            }
        },
        activateIndex: function activateIndex(indexName) {
            var activated = false,
                tempActiveIndex = [],
                indexFound = false;
            if (this.activeIndexes.indexOf(indexName) > -1) {
                indexFound = true;
            }
            if (indexFound) {
                _array['default'].forEach(this.activeIndexes, function (aIndexName) {
                    if (aIndexName !== indexName) {
                        tempActiveIndex.push(aIndexName);
                    }
                });
                this.activeIndexes = tempActiveIndex;
                activated = false;
            } else {
                this.activeIndexes.push(indexName);
                activated = true;
            }

            return activated;
        }
    });

    _lang['default'].setObject('Mobile.SalesLogix.Views.SpeedSearchList', __class);
    module.exports = __class;
});

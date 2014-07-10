/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */

/**
 * @class Mobile.SalesLogix.Views.SpeedSearchList
 *
 *
 * @extends Sage.Platform.Mobile.List
 * @mixins Mobile.SalesLogix.Views._SpeedSearchRightDrawerListMixin
 * @mixins Mobile.SalesLogix.Views._CardLayoutListMixin
 *
 */
define('Mobile/SalesLogix/Views/SpeedSearchList', [
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/_base/array',
    'dojo/dom-class',
    'dojo/dom-construct',
    'dojo/string',
    'dojo/query',
    'dojo/dom-attr',
    'Mobile/SalesLogix/SpeedSearchWidget',
    'Sage/Platform/Mobile/List',
    'Sage/Platform/Mobile/_LegacySDataListMixin',
    'Mobile/SalesLogix/Views/_SpeedSearchRightDrawerListMixin',
    'Mobile/SalesLogix/Views/_CardLayoutListMixin'
], function(
    declare,
    lang,
    array,
    domClass,
    domConstruct,
    string,
    query,
    domAttr,
    SpeedSearchWidget,
    List,
    _LegacySDataListMixin,
    _SpeedSearchRightDrawerListMixin,
    _CardLayoutListMixin
) {

    return declare('Mobile.SalesLogix.Views.SpeedSearchList', [List, _LegacySDataListMixin, _SpeedSearchRightDrawerListMixin, _CardLayoutListMixin], {
        //Templates
        itemTemplate: new Simplate([
          '<h4><strong>{%: $.$heading %}</strong></h4>',
          '{% if ($$.showSynopsis) { %}',
               '<div class="card-layout-speed-search-synopsis note-text-wrap">',
                '{%= $.synopsis %}',
               '</div>',
           '{% } %}'
        ]),

        //Localization
        titleText: 'SpeedSearch',

        //View Properties
        id: 'speedsearch_list',
        enableSearch: true,
        enableActions: true,
        searchWidgetClass: SpeedSearchWidget,
        expose: false,
        showSynopsis: false,
        activeIndexes: ['Account', 'Contact', 'Lead', 'Activity', 'History', 'Opportunity', 'Ticket'],
        indexes: [
            {indexName: 'Account', indexType: 1, isSecure: true},
            {indexName: 'Activity', indexType: 1, isSecure: false},
            {indexName: 'Contact', indexType: 1, isSecure: true},
            {indexName: 'History', indexType: 1, isSecure: false},
            {indexName: 'Lead', indexType: 1, isSecure: true},
            {indexName: 'Opportunity', indexType: 1, isSecure: true},
            {indexName: 'Ticket', indexType: 1, isSecure: false}
        ],
        types: ['Account', 'Activity','Contact', 'History', 'Lead', 'Opportunity', 'Ticket'],
        indexesText: {
            'Account': 'Account',
            'Activity': 'Activity',
            'Contact': 'Contact',
            'History': 'History',
            'Lead': 'Lead',
            'Opportunity': 'Opportunity',
            'Ticket': 'Ticket'
        },
        currentPage: null,

        clear: function() {
            this.inherited(arguments);
            this.currentPage = 0;
        },
        extractTypeFromItem: function(item) {
            for (var i = 0; i < this.types.length; i++) {
                if (item.source.indexOf(this.types[i]) !== -1) {
                    return this.types[i];
                }
            }

            return null;
        },
        extractDescriptorFromItem: function(item, type) {
            var descriptor = '';

            switch (type) {
                case 'Account':
                    descriptor = this.getFieldValue(item.fields, 'account');
                    break;
                case 'Activity':
                    descriptor = string.substitute('${subject} (${date_created})', this.getFieldValues(item.fields, ['subject', 'date_created']));
                    break;
                case 'Contact':
                    descriptor = string.substitute('${firstname} ${lastname} (${account})', this.getFieldValues(item.fields, ['firstname', 'lastname', 'account']));
                    break;
                case 'Lead':
                    descriptor = string.substitute('${firstname} ${lastname} (${account})', this.getFieldValues(item.fields, ['firstname', 'lastname', 'account']));
                    break;
                case 'Opportunity':
                    descriptor = this.getFieldValue(item.fields, 'subject');
                    break;
                case 'History':
                    descriptor = string.substitute('${subject} (${date_created})', this.getFieldValues(item.fields, ['subject', 'date_created']));
                    break;
                case 'Ticket':
                    descriptor = item.uiDisplayName;
                    break;
            }
            return descriptor;
        },
        extractKeyFromItem: function(item) {
            // Extract the entityId from the display name, which is the last 12 characters
            var displayName, len;
            displayName = item.displayName;
            if (!displayName) {
                return '';
            }

            len = displayName.length;
            return displayName.substring(len - 12);
        },
        getFieldValue: function(fields, name) {
            for (var i = 0; i < fields.length; i++) {
                var field = fields[i];
                if (field.fieldName == name) {
                    return field.fieldValue;
                }
            }

            return '';
        },
        getFieldValues: function(fields, names) {
            var results = {};

            // Assign each field in the results to an empty string,
            // so that dojo's string substitute won't blow up on undefined.
            array.forEach(names, function(name) {
                results[name] = '';
            });

            array.forEach(fields, function(field) {
                array.forEach(names, function(name, i) {
                    if (field.fieldName === name) {
                        results[name] = field.fieldValue;
                    }
                });
            });

            return results;
        },
        more: function() {
            this.currentPage += 1;
            this.inherited(arguments);
        },
        hasMoreData: function() {
            var total, count;
            total = this.feed.totalCount;
            count = (this.currentPage + 1) * this.pageSize;
            return count < total;
        },
        processFeed: function(feed) {
            if (!this.feed) {
                this.set('listContent', '');
            }

            this.feed = feed = feed.response;

            if (feed.totalCount === 0) {
                this.set('listContent', this.noDataTemplate.apply(this));
            } else if (feed.items) {

                var docfrag = document.createDocumentFragment();

                for (var i = 0; i < feed.items.length; i++) {
                    var entry = feed.items[i];
                    var rowNode;
                    var synopNode;
                    entry.type = this.extractTypeFromItem(entry);
                    entry.$descriptor = entry.$descriptor || entry.uiDisplayName; 
                    entry.$key = this.extractKeyFromItem(entry);
                    entry.$heading = this.extractDescriptorFromItem(entry, entry.type);
                    entry.synopsis = unescape(entry.synopsis);
                    this.entries[entry.$key] = entry;
                    rowNode = domConstruct.toDom(this.rowTemplate.apply(entry, this));
                    docfrag.appendChild(rowNode);
                    this.onApplyRowTemplate(entry, rowNode);
                }

                if (docfrag.childNodes.length > 0) {
                    domConstruct.place(docfrag, this.contentNode, 'last');
                }
            }

            if (typeof feed.totalCount !== 'undefined') {
                var remaining = this.feed.totalCount - ((this.currentPage + 1) * this.pageSize);
                this.set('remainingContent', string.substitute(this.remainingText, [remaining]));
            }

            domClass.toggle(this.domNode, 'list-has-more', this.hasMoreData());
        },
        createRequest: function() {
            var request = new Sage.SData.Client.SDataServiceOperationRequest(this.getService())
                .setContractName('system')
                .setOperationName('executeSearch');
            return request;
        },
        createSearchEntry: function() {
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
        getActiveIndexes: function() {
            var results = [], self = this;
            array.forEach(this.activeIndexes, function(indexName) {
                array.forEach(self.indexes, function(index) {
                    if (index.indexName === indexName) {
                        results.push(index);
                    }
                });
            });

            return results;
        },
        requestData: function() {
            domClass.add(this.domNode, 'list-loading');

            var request = this.createRequest(),
                entry = this.createSearchEntry();

            request.execute(entry, {
                success: lang.hitch(this, this.onRequestDataSuccess),
                failture: lang.hitch(this, this.onRequestDataFailure)
            });
        },
        navigateToDetailView: function(key, type) {
            var view = App.getView(type.toLowerCase() + '_detail');

            if (view) {
                view.show({
                    key: key
                });
            }
        },
        createToolLayout: function() {
            return this.tools || (this.tools = {
                'tbar': []
            });
        },
        getItemIconAlt: function(entry) {
            return entry.type;
        },
        getItemDescriptor: function(entry) {
            return entry.type;
        },
        createIndicatorLayout: function() {
            return this.itemIndicators || (this.itemIndicators = [{
                id: 'speadSearchIcon',
                icon: '',
                location: 'top',
                onApply: function(entry, parent) {
                    parent.applyActivityIndicator(entry, this);
                }
            }]
            );
        },
        applyActivityIndicator: function(entry, indicator) {
            var dataType = entry['type'];
            indicator.isEnabled = true;
            indicator.showIcon = false;
            indicator.label = this.indexesText[entry.type];
            indicator.valueText = this.indexesText[entry.type];

        },
        _intSearchExpressionNode: function() {
            var html, listNode;
            listNode = query('#' + this.id);
            if (listNode[0]) {
                html = this.searchExpressionTemplate.apply(this);
                domConstruct.place(html, listNode[0], 'first');
            }
        },
        _isIndexActive:function(indexName)
        {
            var indexFound = false;
            if (this.activeIndexes.indexOf(indexName) > -1) {
                indexFound = true;
            }
            return indexFound;
        },
        selectIndex: function(e) {
            var button = e.$source,
            indexName = domAttr.get(button, 'data-index'), 
            activated = this.activateIndex(indexName);
            if (activated) {
                domClass.add(button, 'card-layout-speed-search-index-selected');
            } else {
                domClass.remove(button, 'card-layout-speed-search-index-selected');
            }
        },
        activateIndex: function(indexName) {
            var activated = false,
            tempActiveIndex = [],
            indexFound = false;
            if (this.activeIndexes.indexOf(indexName) > -1) {
                indexFound = true;
            }
            if (indexFound) {
                array.forEach(this.activeIndexes, function(aIndexName) {
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
});


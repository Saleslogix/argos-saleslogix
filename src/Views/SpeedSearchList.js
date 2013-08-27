/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
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
    _SpeedSearchRightDrawerListMixin,
    _CardLayoutListMixin
) {

    return declare('Mobile.SalesLogix.Views.SpeedSearchList', [List, _SpeedSearchRightDrawerListMixin, _CardLayoutListMixin], {
        //Templates
        //Used when card layout is not mixed in
        rowTemplate: new Simplate([
            '<li data-action="activateEntry" data-key="{%= $.$key %}" data-descriptor="{%: $.type %}">',
            '<div class="item-static-icon"><img src="{%: $$.iconPathsByType[$.type] %}" alt="{%: $.type %}" /></div>',
            '{%! $$.itemTemplate %}',
            '</li>'
        ]),

        itemTemplate: new Simplate([
            '<div>',
            '<h3>{%: $.type %}</h3>',
            '<h4>{%: $.$contextDescription %}</h3>',
            '<div class="card-layout-speed-search-linking">',
               '{%= $$.getRelatedLinksHTML( $) %}',
             '</div>',
             '{% if ($$.showSynopsis) { %}',
                '{%! $$.synposisTemplate %}',
             '{% }  %}',
             '</div>'
        ]),
        synposisTemplate: new Simplate([
           '<div class="card-layout-speed-search-synopsis">',
            '<h4>{%: $$.scoreText %}: {%: $.scorePercent %} | {%: $$.hitsText %}: {%: $.hitCount %} </h4>',
              '{%= $.synopsis %}',
            '</div>'
        ]),
        //Localization
        titleText: 'SpeedSearch',
        scoreText: 'Score',
        hitsText: 'hits',

        //View Properties
        id: 'speedsearch_list',
        icon: 'content/images/icons/SpeedSearch_24x24.png',
        enableSearch: true,
        enableActions: true,
        showSynopsis: false,
        searchWidgetClass: SpeedSearchWidget,
        expose: false,
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
        iconPathsByType: {
            'Account': 'content/images/icons/Company_24.png',
            'Activity': 'content/images/icons/To_Do_24x24.png',
            'Contact': 'content/images/icons/Contacts_24x24.png',
            'History': 'content/images/icons/journal_24.png',
            'Lead': 'content/images/icons/Leads_24x24.png',
            'Opportunity': 'content/images/icons/opportunity_24.png',
            'Ticket': 'content/images/icons/Ticket_24x24.png'
        },
        iconPathsByType2: {
            'Account': 'Company_24.png',
            'Activity': 'To_Do_24x24.png',
            'Contact': 'Contacts_24x24.png',
            'History': 'journal_24.png',
            'Lead': 'Leads_24x24.png',
            'Opportunity': 'opportunity_24.png',
            'Ticket': 'Ticket_24x24.png'
        },
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
        getRelatedLinksHTML: function(entry) {
            var type, linksNode, linkNode, linksHTML, linkHTML;
            type = entry.type;
            linksHTML = "<div>";
            if ((entry.relationLink1) && (entry.relationName1))
            {
                linkHTML = this.getRelatedLinkHTML(entry.type, entry.relationLink1, entry.relationName1);
                linksHTML = linksHTML + "" +  linkHTML;
            }
            if ((entry.relationLink2) && (entry.relationName2)) {
                linkHTML = this.getRelatedLinkHTML(entry.type, entry.relationLink2, entry.relationName2);
                linksHTML = linksHTML + "" + linkHTML;
            }
            if ((entry.relationLink3) && (entry.relationName3)) {
                linkHTML = this.getRelatedLinkHTML(entry.type, entry.relationLink3, entry.relationName3);
                linksHTML = linksHTML + "" + linkHTML;
            }
            if ((entry.relationLink4) && (entry.relationName4)) {
                linkHTML = this.getRelatedLinkHTML(entry.type, entry.relationLink4, entry.relationName4);
                linksHTML = linksHTML + "" + linkHTML;
            }
            linksHTML = linksHTML + "</div>";
            return linksHTML;

        },
        getRelatedLinkHTML:function(parentType, linkValue, linkDescription){
        
            var linkInfo, link;
            //linkInfo = this.getLinkInfo(linkValue);
            //linkInfo.linkDescription = linkDescription;
            //link = string.substitute('<div><span><button data-view="${0}" data-linkId="${1}" data-action="goToLink" >${2}: ${3}</button></span></div> ', [ linkInfo.viewId, linkInfo.linkId, linkInfo.linkName, linkInfo.linkDescription]);
            link = string.substitute('<div><span><button  data-action="goToLink"  data-linkvalue="${0}" >${1}</button></span></div> ', [linkValue, linkDescription]);
            return link;
        },
        extractLinkType: function(linkValue)
        {
             var linkType, startpos, endPos;
            //Sample "../../ACCOUNT.aspx?entityId=AGHEA0002669"
            startPos = linkValue.indexOf("../../");
            endPos = linkValue.indexOf(".aspx");
            linkType = linkValue.substring(startPos + 6, endPos);
            return linkType;
        },
        extractLinkId: function(linkValue) {
            var linkId, length;
            //Sample "../../ACCOUNT.aspx?entityId=AGHEA0002669"
            length = linkValue.length;
            linkId = linkValue.substring(length - 12, length);
            return linkId;
        },
        getLinkInfo: function(linkValue) {
            var type, linkInfo;

            linkInfo = {
                linkType: null,
                linkDescription:null,
                linkId:null,            };
            type = this.extractLinkType(linkValue);
            linkInfo.linkId = this.extractLinkId(linkValue);
            switch (type.toUpperCase()) {
                case 'ACCOUNT':
                    linkInfo.linkName = "Account";
                    linkInfo.linkType = "Account";
                    break;
                case 'ACTIVITY':
                    linkInfo.linkName = "Activity";
                    linkInfo.linkType = "Activity";
                    break;
                case 'CONTACT':
                    linkInfo.linkName = "Contact";
                    linkInfo.linkType = "Contact";
                    break;
                case 'LEAD':
                    linkInfo.linkName = "Lead";
                    linkInfo.linkType = "Lead";
                    break;
                case 'OPPORTUNITY':
                    linkInfo.linkName = "Opp";
                    linkInfo.linkType = "Opportunity";
                    break;
                case 'HISTORY':
                    linkInfo.linkName = "History";
                    linkInfo.linkType = "History";
                    break;
                case 'TICKET':
                    linkInfo.linkName = "Ticket";
                    linkInfo.linkType = "Ticket";
                    break;
            }
            return linkInfo;
        },
        goToLink:function(arg){
            var linkInfo;
            if (arg) {
                linkInfo = this.getLinkInfo(arg.linkvalue);
                this.navigateToDetailView(linkInfo.linkId, linkInfo.linkType);
            }
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
                    var rowNode,
                        synopNode;
                    entry.type = this.extractTypeFromItem(entry);
                    entry.$descriptor = entry.$descriptor || entry.uiDisplayName; // this.extractDescriptorFromItem(entry, entry.type); 
                    entry.$key = this.extractKeyFromItem(entry);
                    entry.$contextDescription = this.extractDescriptorFromItem(entry, entry.type);
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
        _htmlEncode:function(s){
                var el = document.createElement("div");
                el.innerText = el.textContent = s;
                s = el.innerHTML;
                return s;
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

            this.showSearchExpression(entry);
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
        getItemIconSource: function(entry) {
            return   this.itemIcon || this.iconPathsByType[entry.type] ;
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
                label: 'speadSearch',
                onApply: function(entry, parent) {
                    parent.applyActivityIndicator(entry, this);
                }
            }]
            );
        },
        applyActivityIndicator: function(entry, indicator) {
            var dataType = entry['type']
            indicator.isEnabled = true;
            indicator.showIcon = true;
            indicator.icon = this.iconPathsByType2[entry.type];

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
                this.activeIndexes.push(indexName)
                activated = true;
            }
            return activated
        },
        showSearchExpression: function(entry) {
            var html, searchNode, searchText;
            searchText =  entry.request.searchText ||'';
            if (this.searchWidget) {
                searchNode = query('#' + this.id + '_search-expression');
                if (searchNode[0]) {
                    html = '<div>' + searchText + '</div>';
                    domAttr.set(searchNode[0], { innerHTML: html });
                }
            }
        }
    });
});


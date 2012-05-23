define('Mobile/SalesLogix/Views/SpeedSearchList', [
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/_base/array',
    'dojo/dom-class',
    'dojo/dom-construct',
    'dojo/string',
    'Mobile/SalesLogix/SpeedSearchWidget',
    'Sage/Platform/Mobile/List'
], function(
    declare,
    lang,
    array,
    domClass,
    domConstruct,
    string,
    SpeedSearchWidget,
    List
) {

    return declare('Mobile.SalesLogix.Views.SpeedSearchList', [List], {
        //Templates
        rowTemplate: new Simplate([
            '<li data-action="activateEntry" data-key="{%= $.$key %}" data-descriptor="{%: $.type %}">',
            '<div class="item-static-icon"><img src="{%: $$.iconPathsByType[$.type] %}" alt="{%: $.type %}" /></div>',
            '{%! $$.itemTemplate %}',
            '</li>'
        ]),

        itemTemplate: new Simplate([
            '<h3>{%: $.$descriptor %}</h3>'
        ]),

        //Localization
        titleText: 'Search Results',

        //View Properties
        id: 'speedsearch_list',
        enableSearch: true,
        searchWidgetClass: SpeedSearchWidget,
        expose: false,

        indexes: [
            {indexName: 'Account', indexType: 1, isSecure: true},
            {indexName: 'Activity', indexType: 1, isSecure: true},
            {indexName: 'Contact', indexType: 1, isSecure: true},
            {indexName: 'History', indexType: 1, isSecure: true},
            {indexName: 'Lead', indexType: 1, isSecure: true},
            {indexName: 'Opportunity', indexType: 1, isSecure: true},
            {indexName: 'Ticket', indexType: 1, isSecure: true}
        ],
        types: ['Account', 'Activity', 'Contact', 'History', 'Lead', 'Opportunity', 'Ticket'],
        iconPathsByType: {
            'Account': 'content/images/icons/Company_24.png',
            'Activity': 'content/images/icons/To_Do_24x24.png',
            'Contact': 'content/images/icons/Contacts_24x24.png',
            'History': 'content/images/icons/journal_24.png',
            'Lead': 'content/images/icons/Leads_24x24.png',
            'Opportunity': 'content/images/icons/opportunity_24.png',
            'Ticket': 'content/images/icons/Ticket_24x24.png'
        },
        currentPage: null,

        clear: function() {
            this.inherited(arguments);

            this.currentPage = 0;
        },

        extractTypeFromItem: function(item) {
            for (var i = 0; i < this.types.length; i++)
            {
                if (item.source.indexOf(this.types[i]) !== -1)
                    return this.types[i];
            }

            return null;
        },

        extractDescriptorFromItem: function(item, type) {
            var descriptor = '';

            switch (type)
            {
                case 'Account': descriptor = this.getFieldValue(item.fields, 'account');
                    break;
                case 'Activity': descriptor = string.substitute('${0} (${1})', this.getFieldValues(item.fields, ['subject', 'date_created']));
                    break;
                case 'Contact': descriptor = string.substitute('${0} ${1} (${2})', this.getFieldValues(item.fields, ['firstname', 'lastname', 'account']));
                    break;
                case 'Lead': descriptor = string.substitute('${0} ${1} (${2})', this.getFieldValues(item.fields, ['firstname', 'lastname', 'account']));
                    break;
                case 'Opportunity': descriptor = this.getFieldValue(item.fields, 'subject');
                    break;
                case 'History': descriptor = string.substitute('${0} (${1})', this.getFieldValues(item.fields, ['subject', 'date_created']));
                    break;
                case 'Ticket': descriptor = item['uiDisplayName'];
                    break;
            }
            return descriptor;
        },
        extractKeyFromItem: function(item) {
            return item['fileName'].substr(-12);
        },

        getFieldValue: function(fields, name) {
            for (var i = 0; i < fields.length; i++)
            {
                var field = fields[i];
                if (field['fieldName'] == name)
                    return field['fieldValue'];
            }

            return '';
        },
        getFieldValues: function(fields, names) {
            var response = [];
            array.forEach(fields, function(field) {
                array.forEach(names, function(name, i) {
                    if (field['fieldName'] == name)
                        response[i] = field['fieldValue']
                });
            });

            return response;
        },


        more: function() {
            this.currentPage += 1;

            this.inherited(arguments);
        },
        hasMoreData: function() {
            var total = this.feed['totalCount'];
            var count = (this.currentPage + 1) * this.pageSize;
            return count < total;
        },

        processFeed: function(feed) {
            if (!this.feed) this.set('listContent', '');

            this.feed = feed = feed['response'];

            if (feed['totalCount'] === 0)
            {
                this.set('listContent', this.noDataTemplate.apply(this));
            }
            else if (feed['items'])
            {
                var o = [];

                for (var i = 0; i < feed['items'].length; i++)
                {
                    var entry = feed['items'][i];

                    entry['type'] = this.extractTypeFromItem(entry);
                    entry['$descriptor'] = entry['$descriptor'] || this.extractDescriptorFromItem(entry, entry['type']);
                    entry['$key'] = entry['$key'] || this.extractKeyFromItem(entry);

                    this.entries[entry['$key']] = entry;

                    o.push(this.rowTemplate.apply(entry, this));
                }

                if (o.length > 0)
                    domConstruct.place(o.join(''), this.contentNode, 'last');
            }

            if (typeof feed['totalCount'] !== 'undefined')
            {
                var remaining = this.feed['totalCount'] - ( (this.currentPage + 1) * this.pageSize);
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
                        searchType: 1,
                        noiseFile: 'PMINoise.dat',
                        includeStemming: false,
                        includeThesaurus: false,
                        includePhonic: false,
                        useFrequentFilter: false,
                        indexes: this.indexes,
                        whichPage: this.currentPage,
                        itemsPerPage: this.pageSize,
                        filters: null
                    },
                    response: null
                };

            return entry;
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
            if (view)
                view.show({
                    key: key
                });
        },

        createToolLayout: function() {
            return this.tools || (this.tools = {
                'tbar': []
            });
        }
    });
});
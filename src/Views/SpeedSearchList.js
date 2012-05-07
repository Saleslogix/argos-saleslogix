define('Mobile/SalesLogix/Views/SpeedSearchList', [
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/dom-class',
    'dojo/string',
    'Mobile/SalesLogix/SpeedSearchWidget',
    'Sage/Platform/Mobile/List'
], function(
    declare,
    lang,
    domClass,
    string,
    SpeedSearchWidget,
    List
) {

    return declare('Mobile.SalesLogix.Views.SpeedSearchList', [List], {
        //Templates
        itemTemplate: new Simplate([
            '<h3>{%: $.uiDisplayname %}</h3>',
            '<h4>{%: $.$key %}</h4>'
        ]),

        //Localization
        titleText: 'Search Results',

        //View Properties
        id: 'speedsearch_list',
        enableSearch: true,
        searchWidgetClass: SpeedSearchWidget,
        expose: false,

        createRequest: function() {
            var request = new Sage.SData.Client.SDataServiceOperationRequest(this.getService())
                .setContractName('system')
                .setOperationName('doSpeedSearch');
            return request;
        },
        createSearchEntry: function() {
            var searchQuery = this.options.searchQuery,
                entry = {
                    request: {
                        docTextItem: -1,
                        searchText: searchQuery,
                        searchType: 0,
                        noiseFile: 'PMINoise.dat',
                        IncludeStemming: false,
                        IncludeThesaurus: false,
                        IncludePhonic: false,
                        useFrequentFilter: false,
                        indexes: [
                            {
                                indexName: 'PMI.Contact',
                                indexType: 1
                            },
                            {
                                indexName: 'PMI.Account',
                                indexType: 1
                            }
                        ],
                        whichPage: 1,
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
        createToolLayout: function() {
            return this.tools || (this.tools = {
                'tbar': []
            });
        }
    });
});
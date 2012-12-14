define('Mobile/SalesLogix/Views/Opportunity/List', [
    'dojo/_base/declare',
    'dojo/string',
    'dojo/_base/array',
    'Mobile/SalesLogix/Action',
    'Mobile/SalesLogix/Format',
    'Sage/Platform/Mobile/Format',
    'Mobile/SalesLogix/Views/MetricWidget',
    'Sage/Platform/Mobile/List'
], function(
    declare,
    string,
    array,
    action,
    format,
    platformFormat,
    MetricWidget,
    List
) {

    return declare('Mobile.SalesLogix.Views.Opportunity.List', [List], {
        //Templates
        widgetTemplate: new Simplate([
            '<div id="{%= $.id %}" title="{%= $.titleText %}" class="list {%= $.cls %}" {% if ($.resourceKind) { %}data-resource-kind="{%= $.resourceKind %}"{% } %}>',
            '<div data-dojo-attach-point="searchNode"></div>',
            '<ul data-dojo-attach-point="metricNode" class="metric-list"></ul>',
            '<a href="#" class="android-6059-fix">fix for android issue #6059</a>',
            '{%! $.emptySelectionTemplate %}',
            '<ul class="list-content" data-dojo-attach-point="contentNode"></ul>',
            '{%! $.moreTemplate %}',
            '{%! $.listActionTemplate %}',
            '</div>'
        ]),
        rowTemplate: new Simplate([
            '<li data-action="activateEntry" data-key="{%= $.$key %}" data-descriptor="{%: $.$descriptor %}" data-type="{%: $.Type || $$.defaultActionType %}">',
                '<button data-action="selectEntry" class="list-item-selector button">',
                    '<img src="{%= $$.statusIcons[$.Status] || $$.icon || $$.selectIcon %}" class="icon" />',
                '</button>',
                '<div class="list-item-content">{%! $$.itemTemplate %}</div>',
            '</li>'
        ]),

        //TODO: Support ExchangeRateCode with proper symbol
        itemTemplate: new Simplate([
            '<h3>{%: $.Description %} <span class="p-account">{% if ($.Account) { %}({%: $.Account.AccountName %}){% } %}</span></h3>',
            '<h4>',
            '{%: $.Status %} {%: Mobile.SalesLogix.Format.currency($.SalesPotential) %}',
            '{% if ($.Stage) { %} | {%: $.Stage %}{% } %}',
            '{% if ($.Account) { %} | {%: $.Account.AccountManager.UserInfo.UserName %}{% } %}',
            '{% if ($.Account && $.Account.AccountManager.UserInfo.Region) { %} - {%: $.Account.AccountManager.UserInfo.Region %}{% } %}',
            '</h4>'
        ]),

        //Localization
        titleText: 'Opportunities',
        activitiesText: 'Activities',
        notesText: 'Notes',
        scheduleText: 'Schedule',
        editActionText: 'Edit',
        viewAccountActionText: 'Account',
        viewContactsActionText: 'Contacts',
        viewProductsActionText: 'Products',
        addNoteActionText: 'Add Note',
        addActivityActionText: 'Add Activity',
        hashTagQueriesText: {
          'open': 'open',
          'closed': 'closed',
          'won': 'won',
          'lost': 'lost'
        },

        //View Properties
        id: 'opportunity_list',
        security: 'Entities/Opportunity/View',
        icon: 'content/images/icons/opportunity_24.png',
        detailView: 'opportunity_detail',
        insertView: 'opportunity_edit',
        hashTagQueries: {
            'open': 'Closed eq false',
            'closed': 'Closed eq true',
            'won': 'Status eq "Closed - Won"',
            'lost': 'Status eq "Closed - Lost"'
        },
        statusIcons: {
            'Open': 'content/images/icons/opportunity_24.png',
            'Closed - Won': 'content/images/icons/Opportunity_Won_24.png',
            'Closed - Lost': 'content/images/icons/Opportunity_Lost_24.png'
        },
        queryOrderBy: 'EstimatedClose desc',
        querySelect: [
            'Account/AccountName',
            'Account/AccountManager/UserInfo/UserName',
            'Account/AccountManager/UserInfo/Region',
            'Description',
            'Stage',
            'Status',
            'SalesPotential'
        ],
        resourceKind: 'opportunities',
        allowSelection: true,
        enableActions: true,

        // Metrics
        metricNode: null,
        metricWidgets: null,
        entityName: 'opporuntity',

        postCreate: function() {
            this.inherited(arguments);
            // Create metrics widget
            // TODO: Add data-actions or a navigate to view id
            this.metricWidgets = [];
            this.metricWidgets.push(new MetricWidget({
                resourceKind: this.resourceKind,
                title: 'Open Sales Potential',
                queryName: 'executeMetric',
                queryArgs: {
                    '_filterName': 'Stage',
                    '_metricName': 'SumSalesPotential',
                    '_activeFilter': 'Closed eq false'
                },
                formatter: Mobile.SalesLogix.Format.bigNumber, 
                reportViewId: 'chart_opportunity_salesotential'
            }));

            this.metricWidgets.push(new MetricWidget({
                resourceKind: this.resourceKind,
                title: 'Actual Amount',
                queryName: 'executeMetric',
                queryArgs: {
                    '_filterName': 'Stage',
                    '_metricName': 'SumActualAmount'
                },
                formatter: Mobile.SalesLogix.Format.bigNumber, 
                reportViewId: 'chart_opportunity_actualamount'
            }));

            this.metricWidgets.push(new MetricWidget({
                resourceKind: this.resourceKind,
                title: 'Open Opportunities',
                queryName: 'executeMetric',
                queryArgs: {
                    '_filterName': 'AccountManager',
                    '_metricName': 'CountOpportunities',
                    '_activeFilter': 'Closed ne true'
                },
                formatter: Mobile.SalesLogix.Format.bigNumber, 
                reportViewId: 'chart_opportunity_actualamount'
            }));

            array.forEach(this.metricWidgets, function(metricWidget) {
                metricWidget.placeAt(this.metricNode, 'last');
            }, this);
        },
        onShow: function() {
            this.inherited(arguments);
            array.forEach(this.metricWidgets, function(metricWidget) {
                metricWidget.requestData();
            }, this);
        },
        createActionLayout: function() {
            return this.actions || (this.actions = [{
                    id: 'edit',
                    icon: 'content/images/icons/edit_24.png',
                    label: this.editActionText,
                    action: 'navigateToEditView'
                },{
                    id: 'viewAccount',
                    icon: 'content/images/icons/Company_24.png',
                    label: this.viewAccountActionText,
                    enabled: action.hasProperty.bindDelegate(this, 'Account.$key'),
                    fn: action.navigateToEntity.bindDelegate(this, {
                        view: 'account_detail',
                        keyProperty: 'Account.$key',
                        textProperty: 'Account.AccountName'
                    })
                },{
                    id: 'viewContacts',
                    icon: 'content/images/icons/Contacts_24x24.png',
                    label: 'Contacts',
                    fn: this.navigateToRelatedView.bindDelegate(this, 'opportunitycontact_related', 'Opportunity.Id eq "${0}"')
                },{
                    id: 'viewProducts',
                    icon: 'content/images/icons/product_24.png',
                    label: this.viewProductsActionText,
                    fn: this.navigateToRelatedView.bindDelegate(this, 'opportunityproduct_related', 'Opportunity.Id eq "${0}"')
                },{
                    id: 'addNote',
                    icon: 'content/images/icons/New_Note_24x24.png',
                    label: this.addNoteActionText,
                    fn: action.addNote.bindDelegate(this)
                },{
                    id: 'addActivity',
                    icon: 'content/images/icons/Schedule_ToDo_24x24.png',
                    label: this.addActivityActionText,
                    fn: action.addActivity.bindDelegate(this)
                }]
            );
        },

        formatSearchQuery: function(searchQuery) {
            return string.substitute('(upper(Description) like "${0}%" or Account.AccountNameUpper like "${0}%")', [this.escapeSearchQuery(searchQuery.toUpperCase())]);
        }
    });
});

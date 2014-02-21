/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */
define('Mobile/SalesLogix/ApplicationModule', [
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/query',
    'dojo/_base/window',

    'Sage/Platform/Mobile/ApplicationModule',
    'Sage/Platform/Mobile/Calendar',
    'Sage/Platform/Mobile/RelatedViewManager',
    'Sage/Platform/Mobile/RelatedViewWidget',

    'Sage/Platform/Mobile/List',
    'Sage/Platform/Mobile/Views/Signature',
    'Sage/Platform/Mobile/SearchWidget',
    'Sage/Platform/Mobile/Views/FileSelect',

    'Mobile/SalesLogix/Views/AddAccountContact',
    'Mobile/SalesLogix/Views/AreaCategoryIssueLookup',
    'Mobile/SalesLogix/Views/ExchangeRateLookup',
    'Mobile/SalesLogix/Views/MainToolbar',
    'Mobile/SalesLogix/Views/UpdateToolbar',
    'Mobile/SalesLogix/Views/LeftDrawer',
    'Mobile/SalesLogix/Views/RightDrawer',
    'Mobile/SalesLogix/Views/Login',
    'Mobile/SalesLogix/Views/Settings',
    'Mobile/SalesLogix/Views/Configure',
    'Mobile/SalesLogix/Views/MetricConfigure',
    'Mobile/SalesLogix/Views/MetricFilterLookup',
    'Mobile/SalesLogix/Views/Help',
    'Mobile/SalesLogix/Views/NameEdit',
    'Mobile/SalesLogix/Views/PickList',
    'Mobile/SalesLogix/Views/SelectList',
    'Mobile/SalesLogix/Views/SpeedSearchList',
    'Mobile/SalesLogix/Views/TextEdit',
    'Mobile/SalesLogix/Views/Account/List',
    'Mobile/SalesLogix/Views/Account/Detail',
    'Mobile/SalesLogix/Views/Account/Edit',
    'Mobile/SalesLogix/Views/Address/List',
    'Mobile/SalesLogix/Views/Address/Edit',
    'Mobile/SalesLogix/Views/Activity/List',
    'Mobile/SalesLogix/Views/Activity/MyList',
    'Mobile/SalesLogix/Views/Activity/Detail',
    'Mobile/SalesLogix/Views/Activity/Edit',
    'Mobile/SalesLogix/Views/Activity/Complete',
    'Mobile/SalesLogix/Views/Activity/TypesList',
    'Mobile/SalesLogix/Views/Activity/Recurring',
    'Mobile/SalesLogix/Views/Calendar/DayView',
    'Mobile/SalesLogix/Views/Calendar/WeekView',
    'Mobile/SalesLogix/Views/Calendar/MonthView',

    'Mobile/SalesLogix/Views/Charts/GenericBar',
    'Mobile/SalesLogix/Views/Charts/GenericPie',

    'Mobile/SalesLogix/Views/Competitor/List',
    'Mobile/SalesLogix/Views/Contact/List',
    'Mobile/SalesLogix/Views/Contact/Detail',
    'Mobile/SalesLogix/Views/Contact/Edit',
    'Mobile/SalesLogix/Views/Contract/List',
    'Mobile/SalesLogix/Views/ErrorLog/List',
    'Mobile/SalesLogix/Views/ErrorLog/Detail',
    'Mobile/SalesLogix/Views/Event/List',
    'Mobile/SalesLogix/Views/Event/Detail',
    'Mobile/SalesLogix/Views/Event/Edit',
    'Mobile/SalesLogix/Views/Lead/List',
    'Mobile/SalesLogix/Views/Lead/Detail',
    'Mobile/SalesLogix/Views/Lead/Edit',
    'Mobile/SalesLogix/Views/LeadSource/List',
    'Mobile/SalesLogix/Views/Opportunity/List',
    'Mobile/SalesLogix/Views/Opportunity/Detail',
    'Mobile/SalesLogix/Views/Opportunity/Edit',
    'Mobile/SalesLogix/Views/OpportunityContact/List',
    'Mobile/SalesLogix/Views/OpportunityContact/Detail',
    'Mobile/SalesLogix/Views/OpportunityContact/Edit',
    'Mobile/SalesLogix/Views/OpportunityProduct/List',
    'Mobile/SalesLogix/Views/OpportunityProduct/Detail',
    'Mobile/SalesLogix/Views/OpportunityProduct/Edit',
    'Mobile/SalesLogix/Views/Owner/List',
    'Mobile/SalesLogix/Views/Product/List',
    'Mobile/SalesLogix/Views/ProductProgram/List',
    'Mobile/SalesLogix/Views/Ticket/List',
    'Mobile/SalesLogix/Views/Ticket/Detail',
    'Mobile/SalesLogix/Views/Ticket/Edit',
    'Mobile/SalesLogix/Views/Ticket/UrgencyLookup',
    'Mobile/SalesLogix/Views/TicketActivity/List',
    'Mobile/SalesLogix/Views/TicketActivity/Detail',
    'Mobile/SalesLogix/Views/TicketActivity/Edit',
    'Mobile/SalesLogix/Views/TicketActivity/RateLookup',
    'Mobile/SalesLogix/Views/TicketActivityItem/List',
    'Mobile/SalesLogix/Views/TicketActivityItem/Detail',
    'Mobile/SalesLogix/Views/History/List',
    'Mobile/SalesLogix/Views/History/Detail',
    'Mobile/SalesLogix/Views/History/Edit',
    'Mobile/SalesLogix/Views/History/RelatedView',
    'Mobile/SalesLogix/Views/User/List',
    'Mobile/SalesLogix/Views/Attachment/ViewAttachment',
    'Mobile/SalesLogix/Views/Attachment/List',
    'Mobile/SalesLogix/Views/Attachment/AddAttachment',
    'Mobile/SalesLogix/Views/Attachment/MyAttachmentList',

    'Mobile/SalesLogix/Fields/AddressField',
    'Mobile/SalesLogix/Fields/MultiCurrencyField',
    'Mobile/SalesLogix/Fields/NameField',
    'Mobile/SalesLogix/Fields/PicklistField',
    'Mobile/SalesLogix/Fields/RecurrencesField',

    'Mobile/SalesLogix/Action',
    'Mobile/SalesLogix/Format',
    'Mobile/SalesLogix/Template',
    'Mobile/SalesLogix/Validator',
    'Mobile/SalesLogix/Environment',
    'Mobile/SalesLogix/Utility'
    
], function(
    declare,
    lang,
    query,
    win,
    ApplicationModule,
    Calendar,
    RelatedViewManager,
    RelatedViewWidget,
    List,
    Signature,
    SearchWidget,
    FileSelect,
    AddAccountContact,
    AreaCategoryIssueLookup,
    ExchangeRateLookup,
    MainToolbar,
    UpdateToolbar,
    LeftDrawer,
    RightDrawer,
    Login,
    Settings,
    Configure,
    MetricConfigure,
    MetricFilterLookup,
    Help,
    NameEdit,
    PickList,
    SelectList,
    SpeedSearchList,
    TextEdit,
    AccountList,
    AccountDetail,
    AccountEdit,
    AddressList,
    AddressEdit,
    ActivityList,
    MyActivityList,
    ActivityDetail,
    ActivityEdit,
    ActivityComplete,
    ActivityTypesList,
    ActivityRecurring,
    CalendarDayView,
    CalendarWeekView,
    CalendarMonthView,
    GenericBar,
    GenericPie,
    CompetitorList,
    ContactList,
    ContactDetail,
    ContactEdit,
    ContractList,
    ErrorLogList,
    ErrorLogDetail,
    EventList,
    EventDetail,
    EventEdit,
    LeadList,
    LeadDetail,
    LeadEdit,
    LeadSourceList,
    OpportunityList,
    OpportunityDetail,
    OpportunityEdit,
    OpportunityContactList,
    OpportunityContactDetail,
    OpportunityContactEdit,
    OpportunityProductList,
    OpportunityProductDetail,
    OpportunityProductEdit,
    OwnerList,
    ProductList,
    ProductProgramList,
    TicketList,
    TicketDetail,
    TicketEdit,
    TicketUrgencyLookup,
    TicketActivityList,
    TicketActivityDetail,
    TicketActivityEdit,
    TicketActivityRateLookup,
    TicketActivityItemList,
    TicketActivityItemDetail,
    HistoryList,
    HistoryDetail,
    HistoryEdit,
    HistoryRelatedView,
    UserList,
    ViewAttachment,
    AttachmentList,
    AddAttachment,
    MyAttachmentList
) {
    return declare('Mobile.SalesLogix.ApplicationModule', [ApplicationModule], {
        searchText: 'Lookup',
        loadViews: function() {
            this.inherited(arguments);

            this.registerView(new Calendar({
                expose: false
            }));

            this.registerView(new Signature({
                expose: false
            }));

            this.registerView(new Login());

            this.registerView(new LeftDrawer(), query('.left-drawer')[0]);
            this.registerView(new RightDrawer(), query('.right-drawer')[0]);

            this.registerView(new Help());
            this.registerView(new Settings());
            this.registerView(new Configure());
            this.registerView(new MetricConfigure());
            this.registerView(new MetricFilterLookup());
            this.registerView(new PickList());
            this.registerView(new SelectList());
            this.registerView(new SpeedSearchList());
            this.registerView(new AddAccountContact());
            this.registerView(new AreaCategoryIssueLookup());
            this.registerView(new ExchangeRateLookup());
            this.registerView(new FileSelect());

            this.registerView(new NameEdit());
            this.registerView(new TextEdit());
            this.registerView(new AddressList({
                id: 'address_related',
                expose: false,
                defaultSearchTerm: function() {
                    return '';
                }
            }));
            this.registerView(new AddressEdit());

            this.registerView(new AccountList());
            this.registerView(new AccountDetail());
            this.registerView(new AccountEdit());
            this.registerView(new AccountList({
                id: 'account_related',
                expose: false,
                defaultSearchTerm: function() {
                    return '';
                }
            }));

            this.registerView(new CalendarMonthView());
            this.registerView(new CalendarWeekView());
            this.registerView(new CalendarDayView());

            // Charts
            this.registerView(new GenericBar({ expose: false }));
            this.registerView(new GenericPie({ expose: false }));

            this.registerView(new CompetitorList({
                id: 'competitor_related',
                expose: false,
                defaultSearchTerm: function() {
                    return '';
                }
            }));

            this.registerView(new ContactList());
            this.registerView(new ContactDetail());
            this.registerView(new ContactEdit());
            this.registerView(new ContactList({
                id: 'contact_related',
                expose: false,
                defaultSearchTerm: function() {
                    return '';
                }
            }));

            this.registerView(new ContractList({
                id: 'contract_related',
                expose: false,
                defaultSearchTerm: function() {
                    return '';
                }
            }));

            this.registerView(new ErrorLogList());
            this.registerView(new ErrorLogDetail());

            this.registerView(new EventEdit());
            this.registerView(new EventList({expose: false}));
            this.registerView(new EventDetail());
            this.registerView(new EventList({
                id: 'event_related',
                expose: false,
                defaultSearchTerm: function() {
                    return '';
                }
            }));

            this.registerView(new OpportunityEdit());
            this.registerView(new OpportunityList());
            this.registerView(new OpportunityDetail());
            this.registerView(new OpportunityList({
                id: 'opportunity_related',
                expose: false,
                defaultSearchTerm: function() {
                    return '';
                }
            }));

            this.registerView(new OpportunityContactEdit());
            this.registerView(new OpportunityContactList());
            this.registerView(new OpportunityContactDetail());
            this.registerView(new OpportunityContactList({
                id: 'opportunitycontact_related',
                expose: false,
                defaultSearchTerm: function() {
                    return '';
                }
            }));

            this.registerView(new OpportunityProductList({
                id: 'opportunityproduct_related',
                expose: false,
                defaultSearchTerm: function() {
                    return '';
                }
            }));

            this.registerView(new OpportunityProductDetail({
                id: 'opportunityproduct_detail',
                expose: false
            }));

            this.registerView(new OpportunityProductEdit({
                id: 'opportunityproduct_edit',
                expose: false
            }));

            this.registerView(new LeadEdit());
            this.registerView(new LeadList());
            this.registerView(new LeadDetail());
            this.registerView(new LeadList({
                id: 'lead_related',
                expose: false,
                defaultSearchTerm: function() {
                    return '';
                }
            }));

            this.registerView(new TicketList());
            this.registerView(new TicketDetail());
            this.registerView(new TicketEdit());
            this.registerView(new TicketList({
                id: 'ticket_related',
                expose: false,
                defaultSearchTerm: function() {
                    return '';
                }
            }));

            this.registerView(new TicketActivityList());
            this.registerView(new TicketActivityDetail());
            this.registerView(new TicketActivityEdit());
            this.registerView(new TicketActivityRateLookup());
            this.registerView(new TicketActivityList({
                id: 'ticketactivity_related',
                expose: false,
                defaultSearchTerm: function() {
                    return '';
                }
            }));

            this.registerView(new TicketActivityItemList());
            this.registerView(new TicketActivityItemDetail());
            this.registerView(new TicketActivityItemList({
                id: 'ticketactivityitem_related',
                expose: false,
                defaultSearchTerm: function() {
                    return '';
                }
            }));

            this.registerView(new ActivityDetail());
            this.registerView(new ActivityEdit());
            this.registerView(new ActivityComplete());
            this.registerView(new ActivityTypesList());
            this.registerView(new ActivityList({
                id: 'activity_related',
                expose: false,
                defaultSearchTerm: function() {
                    return '';
                }
            }));

            this.registerView(new MyActivityList());
            this.registerView(new ActivityRecurring());

            this.registerView(new HistoryDetail());
            this.registerView(new HistoryList());
            this.registerView(new HistoryEdit());
            this.registerView(new HistoryList({
                id: 'history_related',
                expose: false,
                defaultSearchTerm: function() {
                    return '';
                }
            }));

            this.registerView(new UserList({
                expose: false
            }));

            this.registerView(new OwnerList({
                expose: false
            }));

            this.registerView(new ProductList({
                id: 'product_related',
                expose: false,
                defaultSearchTerm: function() {
                    return '';
                }
            }));

            this.registerView(new ProductProgramList({
                id: 'productprogram_related',
                expose: false,
                defaultSearchTerm: function() {
                    return '';
                }
            }));

            this.registerView(new LeadSourceList({
                expose: false
            }));

            this.registerView(new TicketUrgencyLookup({
                expose: false
            }));

            this.registerView(new ViewAttachment());
            this.registerView(new AddAttachment());
            this.registerView(new MyAttachmentList());
            this.registerView(new AttachmentList({
                id: 'account_attachment_related',
                expose: false,
                defaultSearchTerm: function() {
                    return '';
                }
            }));
            this.registerView(new AttachmentList({
                id: 'contact_attachment_related',
                expose: false,
                defaultSearchTerm: function() {
                    return '';
                }
            }));
            this.registerView(new AttachmentList({
                id: 'lead_attachment_related',
                expose: false,
                defaultSearchTerm: function() {
                    return '';
                }
            }));
            this.registerView(new AttachmentList({
                id: 'ticket_attachment_related',
                expose: false,
                defaultSearchTerm: function() {
                    return '';
                }
            }));
            this.registerView(new AttachmentList({
                id: 'opportunity_attachment_related',
                expose: false,
                defaultSearchTerm: function() {
                    return '';
                }
            }));
            this.registerView(new AttachmentList({
                id: 'activity_attachment_related',
                expose: false,
                defaultSearchTerm: function() {
                    return '';
                }
            }));
            this.registerView(new AttachmentList({
                id: 'history_attachment_related',
                expose: false,
                defaultSearchTerm: function() {
                    return '';
                }
            }));
        },
        loadToolbars: function() {
            this.inherited(arguments);

            this.registerToolbar(new MainToolbar({
                name: 'tbar'
            }));

            this.registerToolbar(new UpdateToolbar({
                name: 'updatebar'
            }));
        },
        loadCustomizations: function() {
            this.loadBaseCustomizations();
        },
        loadBaseCustomizations: function() {
            lang.extend(List, {
                expose: true,
                getSecurity: function() {
                    return (this.expose && this.security); // only check security on exposed views
                }
            });

            lang.extend(SearchWidget, {
                searchText: this.searchText 
            });
        }
    });
});


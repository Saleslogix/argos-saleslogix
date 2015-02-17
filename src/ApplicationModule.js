/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */

/**
 * @class crm.ApplicationModule
 *
 * @extends argos.ApplicationModule
 * @requires argos.Calendar
 * @requires argos.RelatedViewManager
 * @requires argos.RelatedViewWidget
 * @requires argos.List
 * @requires argos.Views.Signature
 * @requires argos.Views.FileSelect
 * @requires argos.SearchWidget
 *
 */
define('crm/ApplicationModule', [
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/query',
    'dojo/_base/window',

    'argos/ApplicationModule',
    'argos/Calendar',
    'argos/RelatedViewManager',
    'argos/RelatedViewWidget',

    'argos/List',
    'argos/Views/Signature',
    'argos/SearchWidget',
    'argos/Views/FileSelect',

    'crm/Views/AddAccountContact',
    'crm/Views/AreaCategoryIssueLookup',
    'crm/Views/ExchangeRateLookup',
    'crm/Views/MainToolbar',
    'crm/Views/UpdateToolbar',
    'crm/Views/LeftDrawer',
    'crm/Views/RightDrawer',
    'crm/Views/Login',
    'crm/Views/LogOff',
    'crm/Views/Settings',
    'crm/Views/Configure',
    'crm/Views/MetricConfigure',
    'crm/Views/MetricFilterLookup',
    'crm/Views/Help',
    'crm/Views/NameEdit',
    'crm/Views/PickList',
    'crm/Views/SelectList',
    'crm/Views/SpeedSearchList',
    'crm/Views/TextEdit',
    'crm/Views/Account/List',
    'crm/Views/Account/Detail',
    'crm/Views/Account/Edit',
    'crm/Views/Address/List',
    'crm/Views/Address/Edit',
    'crm/Views/Activity/List',
    'crm/Views/Activity/MyList',
    'crm/Views/Activity/Detail',
    'crm/Views/Activity/Edit',
    'crm/Views/Activity/Complete',
    'crm/Views/Activity/TypesList',
    'crm/Views/Activity/Recurring',
    'crm/Views/Calendar/DayView',
    'crm/Views/Calendar/WeekView',
    'crm/Views/Calendar/MonthView',

    'crm/Views/Charts/GenericBar',
    'crm/Views/Charts/GenericLine',
    'crm/Views/Charts/GenericPie',

    'crm/Views/Competitor/List',
    'crm/Views/Contact/List',
    'crm/Views/Contact/Detail',
    'crm/Views/Contact/Edit',
    'crm/Views/Contract/List',
    'crm/Views/ErrorLog/List',
    'crm/Views/ErrorLog/Detail',
    'crm/Views/Event/List',
    'crm/Views/Event/Detail',
    'crm/Views/Event/Edit',
    'crm/Views/Groups/Selector',
    'crm/Views/Lead/List',
    'crm/Views/Lead/Detail',
    'crm/Views/Lead/Edit',
    'crm/Views/LeadSource/List',
    'crm/Views/Opportunity/List',
    'crm/Views/Opportunity/Detail',
    'crm/Views/Opportunity/Edit',
    'crm/Views/OpportunityContact/List',
    'crm/Views/OpportunityContact/Detail',
    'crm/Views/OpportunityContact/Edit',
    'crm/Views/OpportunityProduct/List',
    'crm/Views/OpportunityProduct/Detail',
    'crm/Views/OpportunityProduct/Edit',
    'crm/Views/Owner/List',
    'crm/Views/Product/List',
    'crm/Views/ProductProgram/List',
    'crm/Views/Ticket/List',
    'crm/Views/Ticket/Detail',
    'crm/Views/Ticket/Edit',
    'crm/Views/Ticket/UrgencyLookup',
    'crm/Views/TicketActivity/List',
    'crm/Views/TicketActivity/Detail',
    'crm/Views/TicketActivity/Edit',
    'crm/Views/TicketActivity/RateLookup',
    'crm/Views/TicketActivityItem/List',
    'crm/Views/TicketActivityItem/Detail',
    'crm/Views/History/List',
    'crm/Views/History/Detail',
    'crm/Views/History/Edit',
    'crm/Views/History/RelatedView',
    'crm/Views/User/CalendarAccessList',
    'crm/Views/User/List',
    'crm/Views/Attachment/ViewAttachment',
    'crm/Views/Attachment/List',
    'crm/Views/Attachment/AddAttachment',
    'crm/Views/Attachment/MyAttachmentList',

    'crm/Fields/AddressField',
    'crm/Fields/MultiCurrencyField',
    'crm/Fields/NameField',
    'crm/Fields/PicklistField',
    'crm/Fields/RecurrencesField',

    'crm/Action',
    'crm/Format',
    'crm/Template',
    'crm/Validator',
    'crm/Environment',
    'crm/Utility'
    
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
    LogOff,
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
    GenericLine,
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
    GroupsSelector,
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
    CalendarAccessList,
    UserList,
    ViewAttachment,
    AttachmentList,
    AddAttachment,
    MyAttachmentList
) {
    return declare('crm.ApplicationModule', [ApplicationModule], {
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
            this.registerView(new LogOff());

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
                groupsEnabled: false,
                defaultSearchTerm: function() {
                    return '';
                }
            }));

            this.registerView(new CalendarMonthView());
            this.registerView(new CalendarWeekView());
            this.registerView(new CalendarDayView());

            // Charts
            this.registerView(new GenericBar({ expose: false }));
            this.registerView(new GenericLine({ expose: false }));
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
                groupsEnabled: false,
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

            this.registerView(new GroupsSelector());

            this.registerView(new OpportunityEdit());
            this.registerView(new OpportunityList());
            this.registerView(new OpportunityDetail());
            this.registerView(new OpportunityList({
                id: 'opportunity_related',
                expose: false,
                groupsEnabled: false,
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
                groupsEnabled: false,
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
                groupsEnabled: false,
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
                groupsEnabled: false,
                defaultSearchTerm: function() {
                    return '';
                }
            }));

            this.registerView(new CalendarAccessList({
                expose: false
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


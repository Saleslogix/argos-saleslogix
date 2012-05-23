define('Mobile/SalesLogix/ApplicationViews', {
    'main': {type: 'Sage/Platform/Mobile/List'},
    'account_list': {type: 'Mobile/SalesLogix/Views/Account/List'}
});

/*
'Sage/Platform/Mobile/Calendar',
'Sage/Platform/Mobile/Views/Signature',

'Mobile/SalesLogix/Views/AddAccountContact',
'Mobile/SalesLogix/Views/AreaCategoryIssueLookup',
'Mobile/SalesLogix/Views/MainToolbar',
'Mobile/SalesLogix/Views/FooterToolbar',
'Mobile/SalesLogix/Views/Home',
'Mobile/SalesLogix/Views/Login',
'Mobile/SalesLogix/Views/Settings',
'Mobile/SalesLogix/Views/Configure',
'Mobile/SalesLogix/Views/Help',
'Mobile/SalesLogix/Views/NameEdit',
'Mobile/SalesLogix/Views/PickList',
'Mobile/SalesLogix/Views/SelectList',
'Mobile/SalesLogix/Views/TextEdit',

'Mobile/SalesLogix/Views/Account/List',
'Mobile/SalesLogix/Views/Account/Detail',
'Mobile/SalesLogix/Views/Account/Edit',
'Mobile/SalesLogix/Views/Address/Edit',
'Mobile/SalesLogix/Views/Activity/List',
'Mobile/SalesLogix/Views/Activity/Detail',
'Mobile/SalesLogix/Views/Activity/Edit',
'Mobile/SalesLogix/Views/Activity/Complete',
'Mobile/SalesLogix/Views/Activity/TypesList',
'Mobile/SalesLogix/Views/Calendar/DayView',
'Mobile/SalesLogix/Views/Calendar/WeekView',
'Mobile/SalesLogix/Views/Calendar/MonthView',
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
'Mobile/SalesLogix/Views/Owner/List',
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
'Mobile/SalesLogix/Views/User/List',

'Mobile/SalesLogix/Fields/AddressField',
'Mobile/SalesLogix/Fields/NameField',
'Mobile/SalesLogix/Fields/PicklistField',

'Mobile/SalesLogix/Format',
'Mobile/SalesLogix/Template',
'Mobile/SalesLogix/Validator',
'Mobile/SalesLogix/Environment'
*/

/*
this.registerView(new Calendar({
    expose:false
}));

this.registerView(new Signature({
    expose:false
}));

this.registerView(new Login());
this.registerView(new Home());
this.registerView(new Help());
this.registerView(new Settings());
this.registerView(new Configure());
this.registerView(new PickList());
this.registerView(new SelectList());
this.registerView(new AddAccountContact());
this.registerView(new AreaCategoryIssueLookup());

this.registerView(new NameEdit());
this.registerView(new TextEdit());
this.registerView(new AddressEdit());

this.registerView(new AccountList());
this.registerView(new AccountDetail());
this.registerView(new AccountEdit());
this.registerView(new AccountList({
    id: 'account_related',
    expose: false
}));

this.registerView(new CalendarMonthView());
this.registerView(new CalendarWeekView());
this.registerView(new CalendarDayView());

this.registerView(new CompetitorList({
    id: 'competitor_related',
    expose: false
}));

this.registerView(new ContactList());
this.registerView(new ContactDetail());
this.registerView(new ContactEdit());
this.registerView(new ContactList({
    id: 'contact_related',
    expose: false
}));

this.registerView(new ContractList({
    id: 'contract_related',
    expose: false
}));

this.registerView(new ErrorLogList());
this.registerView(new ErrorLogDetail());


this.registerView(new EventEdit());
this.registerView(new EventList({ expose: false }));
this.registerView(new EventDetail());
this.registerView(new EventList({
    id: 'event_related',
    expose: false
}));

this.registerView(new OpportunityEdit());
this.registerView(new OpportunityList());
this.registerView(new OpportunityDetail());
this.registerView(new OpportunityList({
    id: 'opportunity_related',
    expose: false
}));

this.registerView(new OpportunityContactEdit());
this.registerView(new OpportunityContactList());
this.registerView(new OpportunityContactDetail());
this.registerView(new OpportunityContactList({
    id: 'opportunitycontact_related',
    expose: false
}));


this.registerView(new OpportunityProductList({
    id: 'opportunityproduct_related',
    expose: false
}));

this.registerView(new LeadEdit());
this.registerView(new LeadList());
this.registerView(new LeadDetail());
this.registerView(new LeadList({
    id: 'lead_related',
    expose: false
}));

this.registerView(new TicketList());
this.registerView(new TicketDetail());
this.registerView(new TicketEdit());
this.registerView(new TicketList({
    id: 'ticket_related',
    expose: false
}));


this.registerView(new TicketActivityList());
this.registerView(new TicketActivityDetail());
this.registerView(new TicketActivityEdit());
this.registerView(new TicketActivityRateLookup());
this.registerView(new TicketActivityList({
    id: 'ticketactivity_related',
    expose: false
}));

this.registerView(new TicketActivityItemList());
this.registerView(new TicketActivityItemDetail());
this.registerView(new TicketActivityItemList({
    id: 'ticketactivityitem_related',
    expose: false
}));

this.registerView(new ActivityDetail());
this.registerView(new ActivityEdit());
this.registerView(new ActivityComplete());
this.registerView(new ActivityTypesList());
this.registerView(new ActivityList({
    id: 'activity_related',
    expose: false
}));

this.registerView(new HistoryDetail());
this.registerView(new HistoryList());
this.registerView(new HistoryEdit());
this.registerView(new HistoryList({
    id: 'history_related',
    expose: false
}));


this.registerView(new UserList({
    expose: false
}));

this.registerView(new OwnerList({
    expose: false
}));

this.registerView(new LeadSourceList({
    expose: false
}));

this.registerView(new TicketUrgencyLookup({
    expose: false
}));
*/
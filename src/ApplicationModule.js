
define('Mobile/SalesLogix/ApplicationModule', [
    'Sage/Platform/Mobile/ApplicationModule',

    'Mobile/SalesLogix/Format',
    'Mobile/SalesLogix/Template',
    'Mobile/SalesLogix/Validator',
    'Mobile/SalesLogix/Environment',

    'Mobile/SalesLogix/Views/AddAccountContact',
    'Mobile/SalesLogix/Views/AreaCategoryIssueLookup',
    'Mobile/SalesLogix/Views/ContextDialog',
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
    'Mobile/SalesLogix/Views/Calendar/YearView',
    'Mobile/SalesLogix/Views/Contact/List',
    'Mobile/SalesLogix/Views/Contact/Detail',
    'Mobile/SalesLogix/Views/Contact/Edit',
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
    'Mobile/SalesLogix/Views/History/List',
    'Mobile/SalesLogix/Views/History/Detail',
    'Mobile/SalesLogix/Views/History/Edit',
    'Mobile/SalesLogix/Views/User/List',

    'Mobile/SalesLogix/Fields/AddressField',
    'Mobile/SalesLogix/Fields/NameField',
    'Mobile/SalesLogix/Fields/PicklistField'
], function() {

    return dojo.declare('Mobile.SalesLogix.ApplicationModule', [Sage.Platform.Mobile.ApplicationModule], {
        loadViews: function() {
            this.inherited(arguments);

            this.registerView(new Sage.Platform.Mobile.Calendar({
                expose:false
            }));

            this.registerView(new Mobile.SalesLogix.Views.Login());
            this.registerView(new Mobile.SalesLogix.Views.Home());
            this.registerView(new Mobile.SalesLogix.Views.Help());
            this.registerView(new Mobile.SalesLogix.Views.Settings());
            this.registerView(new Mobile.SalesLogix.Views.Configure());
            this.registerView(new Mobile.SalesLogix.Views.PickList());
            this.registerView(new Mobile.SalesLogix.Views.SelectList());
            this.registerView(new Mobile.SalesLogix.Views.ContextDialog());
            this.registerView(new Mobile.SalesLogix.Views.AddAccountContact());
            this.registerView(new Mobile.SalesLogix.Views.AreaCategoryIssueLookup());

            this.registerView(new Mobile.SalesLogix.Views.NameEdit());
            this.registerView(new Mobile.SalesLogix.Views.TextEdit());
            this.registerView(new Mobile.SalesLogix.Views.Address.Edit());

            this.registerView(new Mobile.SalesLogix.Views.Account.List());
            this.registerView(new Mobile.SalesLogix.Views.Account.Detail());
            this.registerView(new Mobile.SalesLogix.Views.Account.Edit());
            this.registerView(new Mobile.SalesLogix.Views.Account.List({
                id: 'account_related',
                expose: false
            }));

            this.registerView(new Mobile.SalesLogix.Views.Calendar.YearView());
            this.registerView(new Mobile.SalesLogix.Views.Calendar.MonthView());
            this.registerView(new Mobile.SalesLogix.Views.Calendar.WeekView());
            this.registerView(new Mobile.SalesLogix.Views.Calendar.DayView());

            this.registerView(new Mobile.SalesLogix.Views.Contact.List());
            this.registerView(new Mobile.SalesLogix.Views.Contact.Detail());
            this.registerView(new Mobile.SalesLogix.Views.Contact.Edit());
            this.registerView(new Mobile.SalesLogix.Views.Contact.List({
                id: 'contact_related',
                expose: false
            }));

            this.registerView(new Mobile.SalesLogix.Views.Event.Edit());
            this.registerView(new Mobile.SalesLogix.Views.Event.List({ expose: false }));
            this.registerView(new Mobile.SalesLogix.Views.Event.Detail());
            this.registerView(new Mobile.SalesLogix.Views.Event.List({
                id: 'event_related',
                expose: false
            }));

            this.registerView(new Mobile.SalesLogix.Views.Opportunity.Edit());
            this.registerView(new Mobile.SalesLogix.Views.Opportunity.List());
            this.registerView(new Mobile.SalesLogix.Views.Opportunity.Detail());
            this.registerView(new Mobile.SalesLogix.Views.Opportunity.List({
                id: 'opportunity_related',
                expose: false
            }));

            this.registerView(new Mobile.SalesLogix.Views.OpportunityProduct.List({
                id: 'opportunityproduct_related',
                expose: false
            }));

            this.registerView(new Mobile.SalesLogix.Views.Lead.Edit());
            this.registerView(new Mobile.SalesLogix.Views.Lead.List());
            this.registerView(new Mobile.SalesLogix.Views.Lead.Detail());
            this.registerView(new Mobile.SalesLogix.Views.Lead.List({
                id: 'lead_related',
                expose: false
            }));

            this.registerView(new Mobile.SalesLogix.Views.Ticket.List());
            this.registerView(new Mobile.SalesLogix.Views.Ticket.Detail());
            this.registerView(new Mobile.SalesLogix.Views.Ticket.Edit());
            this.registerView(new Mobile.SalesLogix.Views.Ticket.List({
                id: 'ticket_related',
                expose: false
            }));
            this.registerView(new Mobile.SalesLogix.Views.TicketActivity.List());
            this.registerView(new Mobile.SalesLogix.Views.TicketActivity.Detail());
            this.registerView(new Mobile.SalesLogix.Views.TicketActivity.Edit());
            this.registerView(new Mobile.SalesLogix.Views.TicketActivity.RateLookup({
                expose: false
            }));
            this.registerView(new Mobile.SalesLogix.Views.TicketActivity.List({
                id: 'ticket_activity_related',
                expose: false
            }));

            this.registerView(new Mobile.SalesLogix.Views.TicketActivityItem.List());
            this.registerView(new Mobile.SalesLogix.Views.TicketActivityItem.List({
                id: 'ticket_activity_item_list_related',
                expose: false
            }));

            this.registerView(new Mobile.SalesLogix.Views.Activity.Detail());
            this.registerView(new Mobile.SalesLogix.Views.Activity.Edit());
            this.registerView(new Mobile.SalesLogix.Views.Activity.Complete());
            this.registerView(new Mobile.SalesLogix.Views.Activity.TypesList());
            this.registerView(new Mobile.SalesLogix.Views.Activity.List({
                id: 'activity_related',
                expose: false
            }));

            this.registerView(new Mobile.SalesLogix.Views.History.Detail());
            this.registerView(new Mobile.SalesLogix.Views.History.List());
            this.registerView(new Mobile.SalesLogix.Views.History.Edit());
            this.registerView(new Mobile.SalesLogix.Views.History.List({
                id: 'history_related',
                expose: false
            }));


            this.registerView(new Mobile.SalesLogix.Views.User.List({
                expose: false
            }));

            this.registerView(new Mobile.SalesLogix.Views.Owner.List({
                expose: false
            }));

            this.registerView(new Mobile.SalesLogix.Views.LeadSource.List({
                expose: false
            }));

            this.registerView(new Mobile.SalesLogix.Views.Ticket.UrgencyLookup({
                expose: false
            }));
        },
        loadToolbars: function() {
            this.inherited(arguments);


            this.registerToolbar(new Mobile.SalesLogix.Views.MainToolbar({
                name: 'tbar',
                title: this.titleText
            }));

            this.registerToolbar(new Mobile.SalesLogix.Views.FooterToolbar({
                name: 'bbar'
            }));
        },
        loadCustomizations: function() {
            this.loadBaseCustomizations();
        },
        loadBaseCustomizations: function() {
            dojo.extend(Sage.Platform.Mobile.List, {
                expose: true,
                getSecurity: function() {
                    return (this.expose && this.security); // only check security on exposed views
                }
            });

            if(App.serverVersion.major >= 8)
            {
                // Activity Location Sawgrass+
                //todo: Limit visibility to Meeting or PhoneCall Type only
                dojo.extend(Mobile.SalesLogix.Views.Activity.Detail, {
                    querySelect: Mobile.SalesLogix.Views.Activity.Detail.prototype.querySelect.concat([
                        'Location'])
                });
                this.registerCustomization('detail', 'activity_detail', {
                    at: function(row) { return row.name === 'Priority'; },
                    type: 'insert',
                    where: 'before',
                    value: {
                        name: 'Location',
                        label: Mobile.SalesLogix.Views.Activity.Detail.prototype.locationText
                    }
                });
                this.registerCustomization('edit', 'activity_edit', {
                    at: function(row) { return row.name === 'Priority'; },
                    type: 'insert',
                    where: 'before',
                    value: {
                        name: 'Location',
                        label: Mobile.SalesLogix.Views.Activity.Edit.prototype.locationText,
                        type: 'text'
                    }
                });
            }
        }
    });

});

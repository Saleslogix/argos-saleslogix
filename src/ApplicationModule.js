Ext.namespace("Mobile.SalesLogix");

Mobile.SalesLogix.ApplicationModule = Ext.extend(Sage.Platform.Mobile.ApplicationModule, {
    loadViews: function() {
        Mobile.SalesLogix.ApplicationModule.superclass.loadViews.apply(this, arguments);
        
        this.registerView(new Sage.Platform.Mobile.Calendar());

        this.registerView(new Mobile.SalesLogix.Login());
        this.registerView(new Mobile.SalesLogix.Home());
        this.registerView(new Mobile.SalesLogix.Help());
        this.registerView(new Mobile.SalesLogix.Settings());
        this.registerView(new Mobile.SalesLogix.Configure());
        this.registerView(new Mobile.SalesLogix.PickList());
        this.registerView(new Mobile.SalesLogix.SelectList());
        this.registerView(new Mobile.SalesLogix.ContextDialog());
        this.registerView(new Mobile.SalesLogix.AddAccountContact());
        this.registerView(new Mobile.SalesLogix.AreaCategoryIssueLookup());

        this.registerView(new Mobile.SalesLogix.NameEdit());
        this.registerView(new Mobile.SalesLogix.TextEdit());
        this.registerView(new Mobile.SalesLogix.Address.Edit());

        this.registerView(new Mobile.SalesLogix.Account.List());
        this.registerView(new Mobile.SalesLogix.Account.Detail());
        this.registerView(new Mobile.SalesLogix.Account.Edit());
        this.registerView(new Mobile.SalesLogix.Account.List({
            id: 'account_related',
            expose: false
        }));

        this.registerView(new Mobile.SalesLogix.Calendar.MonthView());
        this.registerView(new Mobile.SalesLogix.Calendar.UserActivityList());

        this.registerView(new Mobile.SalesLogix.Campaign.List({
            expose: false
        }));
        this.registerView(new Mobile.SalesLogix.Campaign.Detail());
        this.registerView(new Mobile.SalesLogix.Campaign.Edit());
        this.registerView(new Mobile.SalesLogix.Campaign.List({
            id: 'campaign_related',
            expose: false
        }));

        this.registerView(new Mobile.SalesLogix.Contact.Edit());
        this.registerView(new Mobile.SalesLogix.Contact.List());
        this.registerView(new Mobile.SalesLogix.Contact.Detail());
        this.registerView(new Mobile.SalesLogix.Contact.List({
            id: 'contact_related',
            expose: false
        }));

        this.registerView(new Mobile.SalesLogix.SalesOrder.Edit());
        this.registerView(new Mobile.SalesLogix.SalesOrder.List({
            expose: false
        }));
        this.registerView(new Mobile.SalesLogix.SalesOrder.Detail());
        this.registerView(new Mobile.SalesLogix.SalesOrder.List({
            id: 'salesorder_related',
            expose: false
        }));

        this.registerView(new Mobile.SalesLogix.Contract.Edit());
        this.registerView(new Mobile.SalesLogix.Contract.List({
            expose: false
        }));
        this.registerView(new Mobile.SalesLogix.Contract.Detail());
        this.registerView(new Mobile.SalesLogix.Contract.List({
            id: 'contract_related',
            expose: false
        }));

        this.registerView(new Mobile.SalesLogix.Opportunity.Edit());
        this.registerView(new Mobile.SalesLogix.Opportunity.List());
        this.registerView(new Mobile.SalesLogix.Opportunity.Detail());
        this.registerView(new Mobile.SalesLogix.Opportunity.List({
            id: 'opportunity_related',
            expose: false
        }));

        this.registerView(new Mobile.SalesLogix.OpportunityProduct.List({
            id: 'opportunityproduct_related',
            expose: false
        }));
        
        this.registerView(new Mobile.SalesLogix.Lead.Edit());
        this.registerView(new Mobile.SalesLogix.Lead.List());
        this.registerView(new Mobile.SalesLogix.Lead.Detail());
        this.registerView(new Mobile.SalesLogix.Lead.List({
            id: 'lead_related',
            expose: false
        }));

        this.registerView(new Mobile.SalesLogix.Return.List({
            expose: false
        }));
        this.registerView(new Mobile.SalesLogix.Return.Detail());
        this.registerView(new Mobile.SalesLogix.Return.Edit());
        this.registerView(new Mobile.SalesLogix.Return.List({
            id: 'return_related',
            expose: false
        }));

        this.registerView(new Mobile.SalesLogix.Ticket.List());
        this.registerView(new Mobile.SalesLogix.Ticket.Detail());
        this.registerView(new Mobile.SalesLogix.Ticket.Edit());
        this.registerView(new Mobile.SalesLogix.Ticket.List({
            id: 'ticket_related',
            expose: false
        }));

        this.registerView(new Mobile.SalesLogix.Activity.Detail());
        this.registerView(new Mobile.SalesLogix.Activity.Edit());
        this.registerView(new Mobile.SalesLogix.Activity.Complete());
        this.registerView(new Mobile.SalesLogix.Activity.TypesList());
        this.registerView(new Mobile.SalesLogix.Activity.List({
            id: 'activity_related',
            expose: false
        }));

        this.registerView(new Mobile.SalesLogix.Defect.List({
            expose: false
        }));
        this.registerView(new Mobile.SalesLogix.Defect.Detail());
        this.registerView(new Mobile.SalesLogix.Defect.Edit());
        this.registerView(new Mobile.SalesLogix.Defect.List({
            id: 'defect_related',
            expose: false
        }));

        this.registerView(new Mobile.SalesLogix.DefectProblem.Detail());
        this.registerView(new Mobile.SalesLogix.DefectProblem.Edit());
        this.registerView(new Mobile.SalesLogix.DefectProblem.Detail({
            id: 'defectproblem_related',
            expose: false
        }));

        this.registerView(new Mobile.SalesLogix.DefectSolution.Detail());
        this.registerView(new Mobile.SalesLogix.DefectSolution.Edit());
        this.registerView(new Mobile.SalesLogix.DefectSolution.Detail({
            id: 'defectsolution_related',
            expose: false
        }));

        this.registerView(new Mobile.SalesLogix.History.Detail());
        this.registerView(new Mobile.SalesLogix.History.List());
        this.registerView(new Mobile.SalesLogix.History.Edit());
        this.registerView(new Mobile.SalesLogix.History.Edit());
        this.registerView(new Mobile.SalesLogix.History.List({
            id: 'history_related',
            expose: false
        }));

        this.registerView(new Mobile.SalesLogix.User.List({
            expose: false
        }));

        this.registerView(new Mobile.SalesLogix.Owner.List({
            expose: false
        }));

        this.registerView(new Mobile.SalesLogix.LeadSource.List({
            expose: false
        }));

        this.registerView(new Mobile.SalesLogix.Ticket.UrgencyLookup({
            expose: false
        }));
    },
    loadToolbars: function() {
        Mobile.SalesLogix.ApplicationModule.superclass.loadToolbars.apply(this, arguments);
        
        this.registerToolbar(new Mobile.SalesLogix.MainToolbar({
            name: 'tbar',
            title: this.titleText
        }));

        this.registerToolbar(new Mobile.SalesLogix.FooterToolbar({
            name: 'bbar'
        }));

        this.registerToolbar(new Mobile.SalesLogix.UpdateToolbar({
            name: 'updatebar'
        }));
    }
});

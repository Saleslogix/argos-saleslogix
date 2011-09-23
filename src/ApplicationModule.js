
(function() {

    var imports = [
        'Sage/Platform/Mobile/ApplicationModule',
        'Mobile/SalesLogix/Format',
        'Mobile/SalesLogix/Template',
        'Mobile/SalesLogix/Validator',

        'Mobile/SalesLogix/Views/AddAccountContact',
        'Mobile/SalesLogix/Views/AreaCategoryIssueLookup',
        'Mobile/SalesLogix/Views/ContextDialog',
        'Mobile/SalesLogix/Views/MainToolbar',
        'Mobile/SalesLogix/Views/Home',
        'Mobile/SalesLogix/Views/NameEdit',
        'Mobile/SalesLogix/Views/PickList',
        'Mobile/SalesLogix/Views/SelectList',
        'Mobile/SalesLogix/Views/TextEdit',

        'Mobile/SalesLogix/Views/Account/List',
        'Mobile/SalesLogix/Views/Account/Detail',
        'Mobile/SalesLogix/Views/Account/Edit',
        'Mobile/SalesLogix/Views/Address/Edit',
        'Mobile/SalesLogix/Views/Contact/List',
        'Mobile/SalesLogix/Views/Contact/Detail',
        'Mobile/SalesLogix/Views/Contact/Edit',
        'Mobile/SalesLogix/Views/Lead/List',
        'Mobile/SalesLogix/Views/Lead/Detail',
        'Mobile/SalesLogix/Views/Lead/Edit',
        'Mobile/SalesLogix/Views/LeadSource/List',
        'Mobile/SalesLogix/Views/Opportunity/List',
        'Mobile/SalesLogix/Views/Opportunity/Detail',
        'Mobile/SalesLogix/Views/Opportunity/Edit',
        'Mobile/SalesLogix/Views/Owner/List',
        'Mobile/SalesLogix/Views/Ticket/List',
        'Mobile/SalesLogix/Views/Ticket/Detail',
        'Mobile/SalesLogix/Views/Ticket/Edit',
        'Mobile/SalesLogix/Views/Ticket/UrgencyLookup',
        'Mobile/SalesLogix/Views/History/List',
        'Mobile/SalesLogix/Views/History/Detail',
        'Mobile/SalesLogix/Views/History/Edit',
        'Mobile/SalesLogix/Views/User/List'
    ];

    define('Mobile/SalesLogix/ApplicationModule', imports, function() {

        dojo.declare('Mobile.SalesLogix.ApplicationModule', [Sage.Platform.Mobile.ApplicationModule], {
            loadViews: function() {
                this.inherited(arguments);

                /*
                this.registerView(new Sage.Platform.Mobile.Calendar());

                this.registerView(new Mobile.SalesLogix.Login());
                */

                this.registerView(new Mobile.SalesLogix.Views.Home());

                /*
                this.registerView(new Mobile.SalesLogix.Help());
                this.registerView(new Mobile.SalesLogix.Settings());
                this.registerView(new Mobile.SalesLogix.Configure());
                */
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

                /*
                this.registerView(new Mobile.SalesLogix.Calendar.MonthView());
                this.registerView(new Mobile.SalesLogix.Calendar.WeekView());
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
*/
                this.registerView(new Mobile.SalesLogix.Views.Contact.Edit());
                this.registerView(new Mobile.SalesLogix.Views.Contact.List());
                this.registerView(new Mobile.SalesLogix.Views.Contact.Detail());
                this.registerView(new Mobile.SalesLogix.Views.Contact.List({
                    id: 'contact_related',
                    expose: false
                }));
/*
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
*/
                this.registerView(new Mobile.SalesLogix.Views.Opportunity.Edit());
                this.registerView(new Mobile.SalesLogix.Views.Opportunity.List());
                this.registerView(new Mobile.SalesLogix.Views.Opportunity.Detail());
                this.registerView(new Mobile.SalesLogix.Views.Opportunity.List({
                    id: 'opportunity_related',
                    expose: false
                }));
/*
                this.registerView(new Mobile.SalesLogix.OpportunityProduct.List({
                    id: 'opportunityproduct_related',
                    expose: false
                }));
*/
                this.registerView(new Mobile.SalesLogix.Views.Lead.Edit());
                this.registerView(new Mobile.SalesLogix.Views.Lead.List());
                this.registerView(new Mobile.SalesLogix.Views.Lead.Detail());
                this.registerView(new Mobile.SalesLogix.Views.Lead.List({
                    id: 'lead_related',
                    expose: false
                }));
/*
                this.registerView(new Mobile.SalesLogix.Return.List({
                    expose: false
                }));
                this.registerView(new Mobile.SalesLogix.Return.Detail());
                this.registerView(new Mobile.SalesLogix.Return.Edit());
                this.registerView(new Mobile.SalesLogix.Return.List({
                    id: 'return_related',
                    expose: false
                }));
*/
                this.registerView(new Mobile.SalesLogix.Views.Ticket.List());
                this.registerView(new Mobile.SalesLogix.Views.Ticket.Detail());
                this.registerView(new Mobile.SalesLogix.Views.Ticket.Edit());
                this.registerView(new Mobile.SalesLogix.Views.Ticket.List({
                    id: 'ticket_related',
                    expose: false
                }));
/*
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
*/
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
                
                /*
                this.registerToolbar(new Mobile.SalesLogix.FooterToolbar({
                    name: 'bbar'
                }));

                this.registerToolbar(new Mobile.SalesLogix.UpdateToolbar({
                    name: 'updatebar'
                }));
                */
            }
        });

    });

})();

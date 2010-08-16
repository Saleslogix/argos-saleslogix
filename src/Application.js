/// <reference path="../../ext/ext-core-debug.js"/>
/// <reference path="../../platform/Application.js"/>
/// <reference path="../../sdata/SDataService.js"/>

Ext.namespace("Mobile.SalesLogix");

Mobile.SalesLogix.Application = Ext.extend(Sage.Platform.Mobile.Application, {
    defaultVirtualDirectory: 'sdata',
    defaultApplicationName: 'slx',
    defaultContractName: 'dynamic',
    titleText: 'Mobile Demo',
    constructor: function (o) {
        Mobile.SalesLogix.Application.superclass.constructor.call(this);

        Ext.apply(this, o, {
            enableCaching: true,
            context: {}
        });
    },
    init: function() {
        Mobile.SalesLogix.Application.superclass.init.call(this);
        var home;
        Ext.get("backButton").on("clicklong", function() {
            home = App.getView('home');
            if (home) {
                home.show();
            }
        });
    },
    setup: function () {
        Mobile.SalesLogix.Application.superclass.setup.apply(this, arguments);
       
        this.registerToolbar(new Sage.Platform.Mobile.MainToolbar({
            name: 'tbar',
            title: this.titleText
        }));
        
        this.registerToolbar(new Sage.Platform.Mobile.FloatToolbar({
            name: 'fbar'
        }));

        this.registerView(new Mobile.SalesLogix.LoginDialog());
        this.registerView(new Mobile.SalesLogix.ContextDialog());
        this.registerView(new Mobile.SalesLogix.Home());
        this.registerView(new Mobile.SalesLogix.Configure());

        this.registerView(new Mobile.SalesLogix.Account.List());
        this.registerView(new Mobile.SalesLogix.Account.Detail());
        this.registerView(new Mobile.SalesLogix.Account.Edit());
        this.registerView(new Mobile.SalesLogix.Account.List({
            id: 'account_related',
            expose: false
        }));

        this.registerView(new Mobile.SalesLogix.Campaign.List());
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
        this.registerView(new Mobile.SalesLogix.SalesOrder.List());
        this.registerView(new Mobile.SalesLogix.SalesOrder.Detail());
        this.registerView(new Mobile.SalesLogix.SalesOrder.List({
            id: 'salesorder_related',
            expose: false
        }));

        this.registerView(new Mobile.SalesLogix.Contract.Edit());
        this.registerView(new Mobile.SalesLogix.Contract.List());
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
        
        this.registerView(new Mobile.SalesLogix.Lead.Edit());
        this.registerView(new Mobile.SalesLogix.Lead.List());
        this.registerView(new Mobile.SalesLogix.Lead.Detail());
        this.registerView(new Mobile.SalesLogix.Lead.List({
            id: 'lead_related',
            expose: false
        }));
     
        this.registerView(new Mobile.SalesLogix.Return.List());
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
        this.registerView(new Mobile.SalesLogix.Activity.List({
            id: 'activity_related',
            expose: false
        }));
        
        this.registerView(new Mobile.SalesLogix.Defect.List());
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

        this.registerView(new Mobile.SalesLogix.Note.Detail());
        this.registerView(new Mobile.SalesLogix.Note.Edit());
        this.registerView(new Mobile.SalesLogix.Note.List({
            id: 'note_related',
            expose: false
        }));
     
        /*
        this.registerView(new Mobile.SalesLogix.Activity.List({
        title: 'My Activities',
        context: {
            where: function() { return String.format('UserId eq "{0}"', App.context['user']); }
        }
        }));
        */
    }
});

// instantiate application instance

var App = new Mobile.SalesLogix.Application();

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
        this.registerView(new Mobile.SalesLogix.SearchDialog());
        this.registerView(new Mobile.SalesLogix.Home());

        this.registerView(new Mobile.SalesLogix.Account.List());
        this.registerView(new Mobile.SalesLogix.Account.Detail());
        this.registerView(new Mobile.SalesLogix.Account.Edit());
        this.registerView(new Mobile.SalesLogix.Account.List({
            id: 'account_related',
            expose: false
        }));

        this.registerView(new Mobile.SalesLogix.Contact.List());
        this.registerView(new Mobile.SalesLogix.Contact.Detail());
        this.registerView(new Mobile.SalesLogix.Contact.List({
            id: 'contact_related',
            expose: false
        }));

        this.registerView(new Mobile.SalesLogix.Opportunity.List());
        this.registerView(new Mobile.SalesLogix.Opportunity.Detail());
        this.registerView(new Mobile.SalesLogix.Opportunity.List({
            id: 'opportunity_related',
            expose: false
        }));

        this.registerView(new Mobile.GCRM.TradingAccount.List({
            serviceName: 'erp'
        }));
        this.registerView(new Mobile.GCRM.TradingAccount.Detail({
            serviceName: 'erp'
        }));

        this.registerView(new Mobile.GCRM.SalesInvoice.Detail({
            serviceName: 'erp'
        }));
        this.registerView(new Mobile.GCRM.SalesInvoice.List({
            id: 'gcrm_salesinvoice_related',
            serviceName: 'erp',
            expose: false,
            resourceProperty: 'salesInvoices'
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
define('Mobile/SalesLogix/Views/Opportunity/Edit', [
    'dojo/_base/declare',
    'Mobile/SalesLogix/Validator',
    'Mobile/SalesLogix/Template',
    'Sage/Platform/Mobile/Utility',
    'Sage/Platform/Mobile/Edit'
], function(
    declare,
    validator,
    template,
    utility,
    Edit
) {

    return declare('Mobile.SalesLogix.Views.Opportunity.Edit', [Edit], {
        //Localization
        accountText: 'acct',
        acctMgrText: 'acct mgr',
        estCloseText: 'est close',
        importSourceText: 'lead source',
        opportunityStatusTitleText: 'Opportunity Status',
        opportunityText: 'opportunity',
        opportunityTypeTitleText: 'Opportunity Type',
        ownerText: 'owner',
        potentialText: 'sales potential',
        probabilityText: 'close prob',
        probabilityTitleText: 'Opportunity Probability',
        resellerText: 'reseller',
        statusText: 'status',
        titleText: 'Opportunity',
        typeText: 'type',

        //View Properties
        entityName: 'Opportunity',
        id: 'opportunity_edit',
        resourceKind: 'opportunities',
        insertSecurity: 'Entities/Opportunity/Add',
        updateSecurity: 'Entities/Opportunity/Edit',
        querySelect: [
            'Account/AccountName',
            'AccountManager/UserInfo/FirstName',
            'AccountManager/UserInfo/LastName',
            'CloseProbability',
            'Contacts',
            'Description',
            'EstimatedClose',
            'LeadSource/Description',
            'Owner/OwnerDescription',
            'Reseller/AccountName',
            'SalesPotential',
            'Stage',
            'Status',
            'Type',
            'Weighted'
        ],

        init: function() {
            this.inherited(arguments);

            this.connect(this.fields['Account'], 'onChange', this.onAccountChange);
        },
        applyContext: function() {
            var found = App.queryNavigationContext(function(o) {
                return /^(accounts|contacts)$/.test(o.resourceKind) && o.key;
            });

            var lookup = {
                'accounts': this.applyAccountContext,
                'contacts': this.applyContactContext
            };

            if (found && lookup[found.resourceKind])
                lookup[found.resourceKind].call(this, found);
            else
                this.applyDefaultContext();
        },
        applyDefaultContext: function() {
            this.fields['AccountManager'].setValue(App.context.user);
            this.fields['Owner'].setValue(App.context['defaultOwner']);
        },
        applyAccountContext: function(context) {
            var view = App.getView(context.id),
                entry = view && view.entry;

            this.fields['Account'].setValue(entry);
            this.fields['AccountManager'].setValue(utility.getValue(entry, 'AccountManager'));
            this.fields['Owner'].setValue(utility.getValue(entry, 'Owner'));
        },
        applyContactContext: function(context) {
            var view = App.getView(context.id),
                entry = view && view.entry;

            this.fields['Account'].setValue(utility.getValue(entry, 'Account'));
            this.fields['AccountManager'].setValue(utility.getValue(entry, 'AccountManager'));
            this.fields['Owner'].setValue(utility.getValue(entry, 'Owner'));
            this.fields['Contacts.$resources[0].Contact.$key'].setValue(entry.$key);
        },
        onAccountChange: function(value, field) {
            var selection = field.getSelection();

            // todo: match behavior in web client; if the account manager (AM) is explicitly set, it should stay, otherwise
            // it should be set to the AM for the selected account (and change each time).
            if (selection && this.insert)
            {
                this.fields['AccountManager'].setValue(utility.getValue(selection, 'AccountManager'));
            }   
        },
        createLayout: function() {
            return this.layout || (this.layout = [
                {
                    label: this.opportunityText,
                    name: 'Description',
                    property: 'Description',
                    type: 'text',
                    maxTextLength: 64,
                    validator: [
                        validator.hasText,
                        validator.exceedsMaxTextLength
                    ]
                },
                {
                    label: this.accountText,
                    name: 'Account',
                    property: 'Account',
                    textProperty: 'AccountName',
                    type: 'lookup',
                    validator: validator.exists,
                    view: 'account_related'
                },
                {
                    label: this.acctMgrText,
                    name: 'AccountManager',
                    property: 'AccountManager',
                    textProperty: 'UserInfo',
                    textTemplate: template.nameLF,
                    type: 'lookup',
                    view: 'user_list'
                },
                {
                    label: this.resellerText,
                    name: 'Reseller',
                    property: 'Reseller',
                    textProperty: 'AccountName',
                    type: 'lookup',
                    view: 'account_related'
                },
                {
                    label: this.estCloseText,
                    name: 'EstimatedClose',
                    property: 'EstimatedClose',
                    type: 'date',
                    timeless: true,
                    validator: validator.exists
                },
                {
                    label: this.potentialText,
                    name: 'SalesPotential',
                    property: 'SalesPotential',
                    precision: 2,
                    type: 'decimal',
                    validationTrigger: 'keyup',
                    validator: validator.isCurrency
                },
                {
                    label: this.typeText,
                    name: 'Type',
                    property: 'Type',
                    picklist: 'Opportunity Type',
                    title: this.opportunityTypeTitleText,
                    type: 'picklist',
                    maxTextLength: 64,
                    validator: validator.exceedsMaxTextLength
                },
                {
                    label: this.statusText,
                    name: 'Status',
                    property: 'Status',
                    picklist: 'Opportunity Status',
                    requireSelection: true,
                    title: this.opportunityStatusTitleText,
                    type: 'picklist'
                },
                {
                    label: this.importSourceText,
                    name: 'LeadSource',
                    property: 'LeadSource',
                    textProperty: 'Description',
                    type: 'lookup',
                    view: 'leadsource_list'
                },
                {
                    label: this.ownerText,
                    name: 'Owner',
                    property: 'Owner',
                    keyProperty: '$key',
                    textProperty: 'OwnerDescription',
                    type: 'lookup',
                    validator: validator.exists,
                    view: 'owner_list'
                },
                {
                    label: this.probabilityText,
                    name: 'CloseProbability',
                    property: 'CloseProbability',
                    picklist: 'Opportunity Probability',
                    title: this.probabilityTitleText,
                    type: 'picklist',
                    validator: [
                        validator.isInt32,
                        validator.isInteger
                    ]
                },
                {
                    name: 'Contacts.$resources[0].Contact.$key',
                    property: 'Contacts.$resources[0].Contact.$key',
                    type: 'hidden'
                }
            ]);
        }
    });
});
/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/Edit.js"/>
/// <reference path="../../Format.js"/>

Ext.namespace("Mobile.SalesLogix.Activity");

(function() {  
    Mobile.SalesLogix.Activity.Edit = Ext.extend(Sage.Platform.Mobile.Edit, {
        //Localization
        accountText: 'account',
        activityCategoryTitleText: 'Activity Category',
        activityDescriptionTitleText: 'Activity Description',
        activityTypeTitleText: 'Activity Type',
        alarmText: 'reminder',
        alarmTimeText: 'reminder',
        categoryText: 'category',
        companyText: 'company',
        contactText: 'contact',
        durationText: 'duration',
        leadIdText: 'leader',
        leadText: 'lead',
        longNotesText: 'notes',
        opportunityText: 'opportunity',
        priorityText: 'priority',
        priorityTitleText: 'Priority',
        regardingText: 'regarding',
        rolloverText: 'auto rollover',
        startingText: 'start time',
        ticketNumberText: 'ticket',
        timelessText: 'timeless',
        titleText: 'Activity',
        typeText: 'type',

        //View Properties
        activityTypeText: {
            'atAppointment': 'Meeting',
            'atLiterature': 'Literature Request',
            'atPersonal': 'Personal Activity',
            'atPhoneCall': 'Phone Call',
            'atToDo': 'To-Do'
        },
        picklistsByType: {
            'atAppointment': {
                'Category': 'Meeting Category Codes',
                'Description': 'Meeting Regarding'
            },
            'atLiterature': {
                'Description': 'Lit Request Regarding'
            },
            'atPersonal': {
                'Category': 'Meeting Category Codes',
                'Description': 'Personal Activity Regarding'
            },
            'atPhoneCall': {
                'Category': 'Phone Call Category Codes',
                'Description': 'Phone Call Regarding'
            },
            'atToDo': {
                'Category': 'To Do Category Codes',
                'Description': 'To Do Regarding'
            }
        },

        entityName: 'Activity', // todo: is this correct?
        id: 'activity_edit',
        querySelect: [
            'AccountName',
            'Alarm',
            'AlarmTime',
            'Category',
            'Company',
            'ContactName',
            'Duration',
            'LeadId',
            'LeadName',
            'LongNotes',
            'OpportunityName',
            'Priority',
            'Regarding',
            'Rollover',
            'StartDate',
            'TicketNumber',
            'Timeless',
            'Type'
        ],        
        resourceKind: 'activities',

        createTypeList: function() {
            var list = [];

            for (var type in this.activityTypeText)
            {
                list.push({
                    '$descriptor': this.activityTypeText[type],
                    '$key': type
                });
            }

            return list;
        },       
        formatTypeDependentPicklist: function(type, which) {
            return this.picklistsByType[type] && this.picklistsByType[type][which];
        },
        processTemplateEntry: function() {
            Mobile.SalesLogix.Activity.Edit.superclass.processTemplateEntry.apply(this, arguments);

            this.applyContext();
        },
        show: function(options) {
            Mobile.SalesLogix.Activity.Edit.superclass.show.apply(this, arguments);

            if (options.insert === true) this.applyContext();
        },
        applyContext: function() {
            var contexts = ['accounts', 'leads', 'contacts', 'tickets', 'opportunities'],
                primaryContext = App.queryNavigationContext(function(){return true}, 1),
                secondaryContext = App.getMatchingContext(contexts), entry;

            if (!secondaryContext) return;
            
            entry = App.getView(secondaryContext.id).entry;

            if (entry && secondaryContext.resourceKind === 'accounts')
            {
                this.applyAccountContext(entry);
            }
            else if (entry && secondaryContext.resourceKind === 'leads')
            {
                this.applyLeadContext(entry);
            }
            else if (entry && secondaryContext.resourceKind === 'contacts')
            {
                this.applyContactContext(entry);
            }
            else if (entry && secondaryContext.resourceKind === 'tickets')
            {
                this.applyTicketContext(entry);
            }
            else if (entry && secondaryContext.resourceKind === 'opportunities')
            {
                this.applyOpportunityContext(entry);
            }
        },
        applyAccountContext: function(entry) {
            this.fields['AccountName'].setValue(entry.AccountName);
        },
        applyLeadContext: function(entry) {
            this.fields['ContactName'].setValue(entry.LeadNameLastFirst);
            this.fields['AccountName'].setValue(entry.Company);
        },
        applyContactContext: function(entry) {
            this.fields['ContactName'].setValue(entry.NameLF);
            this.fields['AccountName'].setValue(entry.AccountName);
        },
        applyTicketContext: function(entry) {
            this.fields['ContactName'].setValue(entry.Contact.NameLF);
            this.fields['AccountName'].setValue(entry.Account.AccountName);
            this.fields['TicketNumber'].setValue(entry.TicketNumber);
        },
        applyOpportunityContext: function(entry) {
            this.fields['OpportunityName'].setValue(entry.Description);
            this.fields['AccountName'].setValue(entry.Account.AccountName);
        },
        createLayout: function() {
            return this.layout || (this.layout = [
                {
                    name: 'Type',
                    data: this.createTypeList(),
                    label: this.typeText,
                    title: this.activityTypeTitleText,
                    type: 'select',
                    view: 'select_list'            
                },
                {
                    name: 'Description',
                    dependsOn: 'Type',
                    label: this.regardingText,
                    picklist: this.formatTypeDependentPicklist.createDelegate(
                                    this,
                                    ['Description'],
                                    true
                               ),
                    title: this.activityDescriptionTitleText,
                    type: 'picklist'
                },
                {
                    name: 'Priority',
                    label: this.priorityText,
                    picklist: 'Priorities',                    
                    title: this.priorityTitleText,
                    type: 'picklist'
                },
                {
                    name: 'Category',
                    dependsOn: 'Type',
                    label: this.categoryText,
                    picklist: this.formatTypeDependentPicklist.createDelegate(
                                    this,
                                    ['Category'],
                                    true
                              ),
                    title: this.activityCategoryTitleText,
                    type: 'picklist'
                },
                {
                    name: 'StartDate',
                    label: this.startingText,
                    showTime: true,
                    type: 'date'
                },
                {
                    name: 'Timeless',
                    label: this.timelessText,
                    type: 'boolean'
                },
                {
                    name: 'Duration',
                    label: this.durationText,
                    type: 'text',
                    validator: Mobile.SalesLogix.Validator.isInteger
                },
                {
                    name: 'Alarm',
                    label: this.alarmText,
                    type: 'boolean'
                },
                {
                    name: 'AlarmTime',
                    label: this.alarmTimeText,
                    showTime: true,
                    type: 'date'
                },
                {
                    name: 'Rollover',
                    label: this.rolloverText,
                    type: 'boolean'
                },
                {
                    name: 'LeadId',
                    label: this.leadIdText,
                    type: 'text'
                },
                {
                    name: 'ContactName',
                    label: this.contactText,
                    type: 'text'
                },
                {
                    name: 'OpportunityName',
                    label: this.opportunityText,
                    type: 'text'
                },
                {
                    name: 'TicketNumber',
                    label: this.ticketNumberText,
                    type: 'text'
                },
                {
                    name: 'LeadName',
                    label: this.leadText,
                    type: 'text'
                },
                {
                    name: 'AccountName',
                    label: this.companyText,
                    type: 'text'
                },
                {
                    name: 'LongNotes',
                    label: this.longNotesText,
                    type: 'text'
                }
            ]);
        }
    });
})();
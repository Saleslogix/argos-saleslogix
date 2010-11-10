/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/Edit.js"/>
/// <reference path="../../Format.js"/>

Ext.namespace("Mobile.SalesLogix.Activity");

(function() {  
    Mobile.SalesLogix.Activity.AbstractEdit = Ext.extend(Sage.Platform.Mobile.Edit, {
        //Localization
        activityCategoryTitleText: 'Activity Category',
        activityDescriptionTitleText: 'Activity Description',
        activityTypeTitleText: 'Activity Type',
        alarmText: 'reminder',
        alarmTimeText: 'reminder',
        categoryText: 'category',
        durationText: 'duration',
        leadIdText: 'leader',
        longNotesText: 'notes',
        priorityText: 'priority',
        priorityTitleText: 'Priority',
        regardingText: 'regarding',
        rolloverText: 'auto rollover',
        startingText: 'start time',
        timelessText: 'timeless',
        titleText: 'Activity',
        typeText: 'type',

        //View Properties
        activityContext: false,
        contextLookup: false,
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
        id: 'abstract_activity_edit',
        querySelect: [
            'AccountId',
            'AccountName',
            'Alarm',
            'AlarmTime',
            'Category',
            'ContactId',
            'ContactName',
            'Duration',
            'LeadId',
            'LeadName',
            'LongNotes',
            'OpportunityId',
            'OpportunityName',
            'Priority',
            'Regarding',
            'Rollover',
            'StartDate',
            'TicketId',
            'TicketNumber',
            'Timeless',
            'Type'
        ],        
        resourceKind: 'activities',

        formatTypeDependentPicklist: function(type, which) {
            return this.picklistsByType[type.$key] && this.picklistsByType[type.$key][which];
        },
        show: function(options) {
            var type, typesLookup;
            //TODO:This must be a part of Select Field.  
            //Fix "Type" value from "text" to "object".
            if (options.entry)
            {
                type = options.entry.Type,
                typesLookup = Mobile.SalesLogix.Activity.ActivityTypesLookup;

                if (type && typesLookup[type])
                {
                    options.entry.Type = {
                        "$key": type,
                        "$descriptor": typesLookup[type]
                    };
                }
            }

            if (options.context === 'ScheduleActivity')
            {
                this.activityContext = {
                    'entry': options.entry || {},
                    'type': options.key,
                    'resourceKind': options.relatedResourceKind
                };
            }

            Mobile.SalesLogix.Activity.AbstractEdit.superclass.show.apply(this, arguments);
        },
        applyScheduleActivityContext: function(resourceKindPattern) {
            if (resourceKindPattern.constructor !== RegExp) return false;

            var types = Mobile.SalesLogix.Activity.Types,
                activityType, lookup = this.contextLookup,
                entry = this.activityContext.entry,
                resourceKind = this.activityContext.resourceKind;

            if (!resourceKindPattern.test(resourceKind)) return;

            if (lookup && lookup[resourceKind]) lookup[resourceKind].call(this, entry);

            for (var i = 0, len = types.length; i < len; i++)
            {
                if (types[i].$key === this.activityContext.type)
                {
                    activityType = types[i];
                    break;
                }
            }

            this.fields['Type'].setValue(activityType);
            this.activityContext = false;
        },
        findMatchingContextEntry: function(resourceKindPattern) {
            var hist = [], view;

            if (this.activityContext)
            {
                this.applyScheduleActivityContext(resourceKindPattern);
                return;
            }

            if (resourceKindPattern.constructor !== RegExp) return false;

            var found = App.queryNavigationContext(function(o) {
                hist.push(o);
                return resourceKindPattern.test(o.resourceKind) && o.key;
            });

            //TODO: Context menu must also go into history, since its also a view.
            //Could have gotten here from context menu, bypassing details screen.
            //In this case, the second history item will be our resource kind
            //for eg: activity_related -> accounts -> home -> login
            if (!found && resourceKindPattern.test(hist[1].resourceKind))
            {
                return {
                    'entry': hist[0].options && hist[0].options.entry,
                    'resourceKind': hist[1].resourceKind
                };
            }
            else
            {
                view = App.getView(found.id);
                return {
                    'entry': view && view.entry,
                    'resourceKind': view.resourceKind
                };
            }

            return false;
        },
        createLayout: function() {
            return this.layout || (this.layout = [
                {
                    data: Mobile.SalesLogix.Activity.Types,
                    label: this.typeText,
                    name: 'Type',
                    title: this.activityTypeTitleText,
                    type: 'select',
                    validator: Mobile.SalesLogix.Validator.exists,
                    valueKeyProperty: '$key',
                    valueTextProperty: '$descriptor',
                    view: 'select_list'
                },
                {
                    dependsOn: 'Type',
                    label: this.regardingText,
                    name: 'Description',
                    picklist: this.formatTypeDependentPicklist.createDelegate(
                        this, ['Description'], true
                    ),
                    title: this.activityDescriptionTitleText,
                    type: 'picklist'
                },
                {
                    label: this.priorityText,
                    name: 'Priority',
                    picklist: 'Priorities',                    
                    title: this.priorityTitleText,
                    type: 'picklist'
                },
                {
                    dependsOn: 'Type',
                    label: this.categoryText,
                    name: 'Category',
                    picklist: this.formatTypeDependentPicklist.createDelegate(
                        this, ['Category'], true
                    ),
                    title: this.activityCategoryTitleText,
                    type: 'picklist'
                },
                {
                    label: this.startingText,
                    name: 'StartDate',
                    showTime: true,
                    type: 'date'
                },
                {
                    label: this.timelessText,
                    name: 'Timeless',
                    type: 'boolean'
                },
                {
                    label: this.durationText,
                    name: 'Duration',
                    type: 'text',
                    validator: Mobile.SalesLogix.Validator.isInteger
                },
                {
                    label: this.alarmText,
                    name: 'Alarm',
                    type: 'boolean'
                },
                {
                    label: this.alarmTimeText,
                    name: 'AlarmTime',
                    showTime: true,
                    type: 'date'
                },
                {
                    label: this.rolloverText,
                    name: 'Rollover',
                    type: 'boolean'
                },
                {
                    label: this.leadIdText,
                    name: 'UserId',
                    textProperty: 'UserInfo',
                    textTemplate: Mobile.SalesLogix.Template.nameLF,
                    type: 'lookup',
                    view: 'user_list'
                },
                {
                    label: this.longNotesText,
                    multiline: true,
                    name: 'LongNotes',
                    type: 'text'
                }
            ]);
        }
    });

    Mobile.SalesLogix.Activity.Edit = Ext.extend(Mobile.SalesLogix.Activity.AbstractEdit, {
        //Localization
        accountText: 'account',
        contactText: 'contact',
        opportunityText: 'opportunity',
        ticketNumberText: 'ticket',

        //View Properties
        id: 'activity_edit',


        init: function() {
            Mobile.SalesLogix.Activity.Edit.superclass.init.apply(this, arguments);
            this.contextLookup = {
                'accounts': this.applyAccountContext,
                'contacts': this.applyContactContext,
                'opportunities': this.applyOpportunityContext,
                'tickets': this.applyTicketContext
            };
        },
        createLayout: function() {
            var layout = Mobile.SalesLogix.Activity.Edit.superclass.createLayout.apply(this, arguments);

            this.layout = this.layout.concat([
                {
                    label: this.accountText,
                    name: 'Account',
                    textProperty: 'AccountName',
                    type: 'lookup',
                    validator: Mobile.SalesLogix.Validator.exists,
                    view: 'account_lookup'
                },
                {
                    label: this.contactText,
                    name: 'Contact',
                    textProperty: 'NameLF',
                    type: 'lookup',
                    validator: Mobile.SalesLogix.Validator.exists,
                    view: 'contact_lookup'
                },
                {
                    label: this.opportunityText,
                    name: 'Opportunity',
                    textProperty: 'Description',
                    type: 'lookup',
                    validator: Mobile.SalesLogix.Validator.exists,
                    view: 'opportunity_lookup'
                },
                {
                    label: this.ticketNumberText,
                    name: 'Ticket',
                    textProperty: 'TicketNumber',
                    type: 'lookup',
                    validator: Mobile.SalesLogix.Validator.exists,
                    view: 'ticket_lookup'
                }
            ]);

            return this.layout;
        },
        applyContext: function() {
            var matcher = /^(accounts|contacts|opportunities|tickets)$/,
                match = this.findMatchingContextEntry(matcher),
                lookup = this.contextLookup;

            if (lookup && match && lookup[match.resourceKind])
                lookup[match.resourceKind].call(this, match.entry);
        },
        applyAccountContext: function(entry) {
            this.fields['Account'].setValue(entry);
        },
        applyContactContext: function(entry) {
            this.fields['Contact'].setValue(entry);

            this.fields['Account'].setValue({
                '$key': entry.Account.$key,
                'AccountName': entry.AccountName
            });
        },
        applyTicketContext: function(entry) {
            this.fields['Contact'].setValue(entry.Contact);
            this.fields['Account'].setValue(entry.Account);
            this.fields['Ticket'].setValue(entry);
        },
        applyOpportunityContext: function(entry) {
            this.fields['Opportunity'].setValue(entry);
            this.fields['Account'].setValue(entry.Account);
        },
        setValues: function(entry) {
            Sage.Platform.Mobile.Edit.prototype.setValues.apply(this, arguments);

            this.fields['Account'].setValue({
                '$key': entry.AccountId,
                'AccountName': entry.AccountName
            });

            this.fields['Contact'].setValue({
                '$key': entry.ContactId,
                'NameLF': entry.ContactName
            });

            this.fields['Ticket'].setValue({
                '$key': entry.TicketId,
                'TicketNumber': entry.TicketNumber
            });

            this.fields['Opportunity'].setValue({
                '$key': entry.OpportunityId,
                'Description': entry.OpportunityName
            });
        },
        getValues: function() {
            var entry = Sage.Platform.Mobile.Edit.prototype.getValues.apply(this, arguments);

            entry.Type = entry.Type.$key;
            entry.AccountName = entry.Account.$descriptor;
            entry.AccountId = entry.Account.$key;
            entry.ContactName = entry.Contact.$descriptor;
            entry.ContactId = entry.Contact.$key;
            entry.OpportunityName = entry.Opportunity.$descriptor;
            entry.OpportunityId = entry.Opportunity.$key;
            entry.TicketNumber = entry.Ticket.$descriptor;
            entry.TicketId = entry.Ticket.$key;

            delete entry.Account;
            delete entry.Contact;
            delete entry.Opportunity;
            delete entry.Ticket;

            return entry;
        }
    });

    Mobile.SalesLogix.Activity.LeadContextEdit = Ext.extend(Mobile.SalesLogix.Activity.AbstractEdit, {
        //Localization
        companyText: 'company',
        leadText: 'lead',
        opportunityText: 'opportunity',
        ticketNumberText: 'ticket',

        //View Properties
        id: 'lead_related_activity_edit',

        init: function() {
            Mobile.SalesLogix.Activity.LeadContextEdit.superclass.init.apply(this, arguments);
            this.contextLookup = {
                'leads': this.applyLeadContext
            };
        },
        createLayout: function() {
            var layout = Mobile.SalesLogix.Activity.LeadContextEdit.superclass.createLayout.apply(this, arguments);

            this.layout = this.layout.concat([
                {
                    label: this.companyText,
                    name: 'Company',
                    type: 'text'
                },
                {
                    label: this.leadText,
                    name: 'Lead',
                    textProperty: 'LeadNameLastFirst',
                    type: 'lookup',
                    validator: Mobile.SalesLogix.Validator.exists,
                    view: 'leads_lookup'
                }
            ]);

            return this.layout;
        },
        applyContext: function() {
            var matcher = /^(leads)$/,
                match = this.findMatchingContextEntry(matcher),
                lookup = this.contextLookup;

            if (lookup && match && lookup[match.resourceKind])
                lookup[match.resourceKind].call(this, match.entry);
        },
        applyLeadContext: function(entry) {
            this.fields['Company'].setValue(entry.Company);
            this.fields['Lead'].setValue(entry);
        },
        setValues: function(entry) {
            Sage.Platform.Mobile.Edit.prototype.setValues.apply(this, arguments);

            this.fields['Lead'].setValue({
                '$key': entry.LeadId,
                'LeadNameLastFirst': entry.LeadName
            });

            this.fields['Company'].setValue(entry.AccountName);
        },
        getValues: function() {
            var entry = Sage.Platform.Mobile.Edit.prototype.getValues.apply(this, arguments);

            entry.Type = entry.Type.$key;
            entry.LeadName = entry.Lead.$descriptor;
            entry.LeadId = entry.Lead.$key;
            entry.AccountName = entry.Company;

            delete entry.Lead;
            delete entry.Company;

            return entry;
        }
    });
})();
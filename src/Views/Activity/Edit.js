/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/Edit.js"/>
/// <reference path="../../Format.js"/>

define('Mobile/SalesLogix/Views/Activity/Edit', ['Sage/Platform/Mobile/Edit'], function() {

    return dojo.declare('Mobile.SalesLogix.Views.Activity.Edit', [Sage.Platform.Mobile.Edit], {
        //Localization
        activityCategoryTitleText: 'Activity Category',
        activityDescriptionTitleText: 'Activity Description',
        locationText: 'location',
        activityTypeTitleText: 'Activity Type',
        alarmText: 'alarm',
        reminderText: '',
        categoryText: 'category',
        durationText: 'duration',
        durationTitleText: 'Duration',
		durationInvalidText: "The field '${2}' must have a value.",
		reminderInvalidText: "The field 'reminder' must have a value.",
        reminderTitleText: 'Reminder',
        leaderText: 'leader',
        longNotesText: 'notes',
        longNotesTitleText: 'Notes',
        priorityText: 'priority',
        priorityTitleText: 'Priority',
        regardingText: 'regarding',
        rolloverText: 'auto rollover',
        startingText: 'start time',
		startingFormatText: 'M/d/yyyy h:mm tt',
        startingFormatTimelessText: 'M/d/yyyy',
        timelessText: 'timeless',
        titleText: 'Activity',
        typeText: 'type',
        accountText: 'account',
        contactText: 'contact',
        opportunityText: 'opportunity',
        ticketNumberText: 'ticket',
        companyText: 'company',
        leadText: 'lead',
        isLeadText: 'for lead',
        yesText: 'YES',
        noText: 'NO',
        updateUserActErrorText: 'An error occured updating user activities.',
        reminderValueText: {
            0: 'none',
            5: '5 minutes',
            15: '15 minutes',
            30: '30 minutes',
            60: '1 hour',
            1440: '1 day'
        },
        durationValueText: {
            0: 'none',
            15: '15 minutes',
            30: '30 minutes',
            60: '1 hour',
            90: '1.5 hours',
            120: '2 hours'
        },

        //View Properties
        id: 'activity_edit',
        fieldsForLeads: ['AccountName', 'Lead'],
        fieldsForStandard: ['Account', 'Contact', 'Opportunity', 'Ticket'],
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
            },
            'atEMail': {
                'Category': 'E-mail Category Codes',
                'Description': 'E-mail Regarding'
            }
        },       

        entityName: 'Activity', // todo: is this correct?
        insertSecurity: null, //'Entities/Activity/Add',
        updateSecurity: null, //'Entities/Activity/Edit',
        querySelect: [
            'AccountId',
            'AccountName',
            'Alarm',
            'AlarmTime',
            'Category',
            'ContactId',
            'ContactName',
            'Description',
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
            'Type',
            'UserId'
        ],
        resourceKind: 'activities',

        init: function() {
            this.inherited(arguments);

            this.connect(this.fields['Lead'], 'onChange', this.onLeadChange);
            this.connect(this.fields['IsLead'], 'onChange', this.onIsLeadChange);
            this.connect(this.fields['Leader'], 'onChange', this.onLeaderChange);
            this.connect(this.fields['Timeless'], 'onChange', this.onTimelessChange);
            this.connect(this.fields['Alarm'], 'onChange', this.onAlarmChange);

            this.connect(this.fields['Account'], 'onChange', this.onAccountChange);
            this.connect(this.fields['Contact'], 'onChange', this.onAccountDependentChange);
            this.connect(this.fields['Opportunity'], 'onChange', this.onAccountDependentChange);
            this.connect(this.fields['Ticket'], 'onChange', this.onAccountDependentChange);
        },
        currentUserCanEdit: function(entry) {
            return !!entry && (entry['UserId'] === App.context['user']['$key']);
        },
        currentUserCanSetAlarm: function(entry) {
            return !!entry && (entry['UserId'] === App.context['user']['$key']);
        },
        isActivityForLead: function(entry) {
            return entry && /^[\w]{12}$/.test(entry['LeadId']);
        },
        isInLeadContext: function() {
            var insert = this.options && this.options.insert,
                entry = this.options && this.options.entry,
                lead = (insert && App.isNavigationFromResourceKind('leads', function(o, c) { return c.key; })) || this.isActivityForLead(entry);

            return !!lead;
        },
        beforeTransitionTo: function() {
            this.inherited(arguments);

            // we hide the lead or standard fields here, as the view is currently hidden, in order to prevent flashing.
            // the value for the 'IsLead' field will be set later, based on the value derived here.
            if (this.options.isForLead != undefined) return;

            this.options.isForLead = this.isInLeadContext();

            if (this.options.isForLead)
                this.showFieldsForLead();
            else
                this.showFieldsForStandard();
        },
        disableFields: function(predicate) {
            for (var name in this.fields)
                if (!predicate || predicate(this.fields[name]))
                    this.fields[name].disable();
        },
        enableFields: function(predicate) {
            for (var name in this.fields)
                if (!predicate || predicate(this.fields[name]))
                    this.fields[name].enable();
        },
        onIsLeadChange: function(value, field) {
            this.options.isForLead = value;

            if (this.options.isForLead)
                this.showFieldsForLead();
            else
                this.showFieldsForStandard();
        },
        showFieldsForLead: function() {
            dojo.forEach(this.fieldsForStandard.concat(this.fieldsForLeads), function(item) {
                if (this.fields[item])
                    this.fields[item].hide();
            }, this);

            dojo.forEach(this.fieldsForLeads, function(item) {
                if (this.fields[item])
                    this.fields[item].show();
            }, this);
        },
        showFieldsForStandard: function() {
            dojo.forEach(this.fieldsForStandard.concat(this.fieldsForLeads), function(item) {
                if (this.fields[item])
                    this.fields[item].hide();
            }, this);

            dojo.forEach(this.fieldsForStandard, function(item) {
                    if (this.fields[item])
                        this.fields[item].show();
                }, this);
        },
        toggleSelectField: function(field, disable, options) {
            disable === true ? field.disable() : field.enable();
        },
        onTimelessChange: function(value, field) {
            this.toggleSelectField(this.fields['Duration'], value);

            var startDateField = this.fields['StartDate'];

            if (value)
            {
                this.fields['Rollover'].enable();
                startDateField['dateFormatText'] = this.startingFormatTimelessText;
                startDateField['showTimePicker'] = false;
                startDateField['asTimeless'] = true;
                var startDate =startDateField.getValue();
                if(!this.isDateTimeless(startDate))
                    startDate = startDate.clone().clearTime().add({minutes:-1*startDate.getTimezoneOffset(), seconds:5});
                startDateField.setValue(startDate);
            }
            else
            {
                this.fields['Rollover'].setValue(false);
                this.fields['Rollover'].disable();
                startDateField['dateFormatText'] = this.startingFormatText;
                startDateField['showTimePicker'] = true;
                startDateField['asTimeless'] = false;
                var startDate =startDateField.getValue();
                if(this.isDateTimeless(startDate))
                    startDate = startDate.clone().add({minutes:startDate.getTimezoneOffset()+1, seconds: -5});
                startDateField.setValue(startDate);
            }
        },
        onAlarmChange: function() {
            if(this.fields['Alarm'].getValue())
            {
                this.fields['Reminder'].enable();
            }
            else
            {
                this.fields['Reminder'].disable();
            }
        },
        onLeadChange: function(value, field) {
            var selection = field.getSelection(),
                getV = Sage.Platform.Mobile.Utility.getValue;

            if (selection && this.insert)
            {
                this.fields['AccountName'].setValue(getV(selection, 'Company'));
            }
        },
        onLeaderChange: function(value, field) {
            var userId = field.getValue();
            this.fields['UserId'].setValue(userId && userId['$key']);
        },
        onAccountChange: function(value, field) {
            var fields = this.fields;
            dojo.forEach(['Contact', 'Opportunity', 'Ticket'], function(f) {
                if (value) {
                    fields[f].dependsOn = 'Account';
                    fields[f].where = dojo.string.substitute('Account.Id eq "${0}"', [value['AccountId'] || value['key']]);

                    if (fields[f].currentSelection &&
                        fields[f].currentSelection.Account['$key'] != (value['AccountId'] || value['key'])) {

                        fields[f].setValue(false);
                    }

                } else {
                    fields[f].dependsOn = null;
                    fields[f].where = 'Account.AccountName ne null';
                }
            });
        },
        onAccountDependentChange: function(value, field) {
            if (value && !field.dependsOn && field.currentSelection && field.currentSelection.Account) {
                this.fields['Account'].setValue({
                    'AccountId': field.currentSelection.Account['$key'],
                    'AccountName': field.currentSelection.Account['AccountName']
                });
            }
        },

        formatPicklistForType: function(type, which) {
            return this.picklistsByType[type] && this.picklistsByType[type][which];
        },
        applyUserActivityContext: function(context) {
            var view = App.getView(context.id);
            if (view && view.currentDate)
            {
                var currentDate = view.currentDate.clone().clearTime(),
                    userOptions = App.context['userOptions'],
                    startTimeOption = userOptions && userOptions['Calendar:DayStartTime'],
                    startTime = startTimeOption && Date.parse(startTimeOption),
                    startDate;

                if (startTime && (currentDate.compareTo(Date.today()) !== 0))
                {
                    startDate = currentDate.clone().set({
                        'hour': startTime.getHours(),
                        'minute': startTime.getMinutes()
                    });
                }
                else
                {
                    startTime = Date.now(),
                    startDate = currentDate.clone().clearTime().set({
                        'hour': startTime.getHours()
                    }).add({
                        'minute': (Math.floor(startTime.getMinutes() / 15) * 15) + 15
                    });
                }

                this.fields['StartDate'].setValue(startDate);
            }
        },
        resolveActivityGroup: function(type){
            var group = null;
            switch(type){
                case "atToDo": group = 'ActivityToDoOptions'; break;
                case "atPersonal": group = 'ActivityPersonalOptions'; break;
                case "atPhoneCall": group = 'ActivityPhoneOptions'; break;
                case "atAppointment": group = 'ActivityMeetingOptions'; break;
            }
            return group;
        },
        applyContext: function() {
            this.inherited(arguments);

            var startTime = Date.now(),
                startDate = Date.now().clearTime().set({
                    'hour': startTime.getHours()
                }).add({
                    'minute': (Math.floor(startTime.getMinutes() / 15) * 15) + 15
                }),
                activityType = this.options && this.options.activityType,
                activityGroup = this.resolveActivityGroup(activityType),
                activityDuration = App.context.userOptions && App.context.userOptions[activityGroup+':Duration'] || 15,
                alarmEnabled = App.context.userOptions && App.context.userOptions[activityGroup+':AlarmEnabled'] || true,
                alarmDuration = App.context.userOptions && App.context.userOptions[activityGroup+':AlarmLead'] || 15;

            this.fields['StartDate'].setValue(startDate);
            this.fields['Type'].setValue(activityType);
            this.fields['Duration'].setValue(activityDuration);
            this.fields['Alarm'].setValue(alarmEnabled);
            this.fields['Reminder'].setValue(alarmDuration);

            var user = App.context['user'];
            if (user)
            {    
                this.fields['UserId'].setValue(user['$key']);
                this.fields['Leader'].setValue(user);
            }

            var found = App.queryNavigationContext(function(o) {
                var context = (o.options && o.options.source) || o;

                return (/^(accounts|contacts|opportunities|tickets|leads)$/.test(context.resourceKind) && context.key) ||
                       (/^(useractivities)$/.test(context.resourceKind));
            });

            var context = (found && found.options && found.options.source) || found,
                lookup = {
                    'accounts': this.applyAccountContext,
                    'contacts': this.applyContactContext,
                    'opportunities': this.applyOpportunityContext,
                    'tickets': this.applyTicketContext,
                    'leads': this.applyLeadContext,
                    'useractivities': this.applyUserActivityContext
                };

            if (context && lookup[context.resourceKind]) lookup[context.resourceKind].call(this, context);
        },
        applyAccountContext: function(context) {
            var view = App.getView(context.id),
                entry = context.entry || (view && view.entry);

            if (!entry || !entry['$key']) return;

            this.fields['Account'].setValue({
                'AccountId': entry['$key'],
                'AccountName': entry['$descriptor']
            });
        },
        applyContactContext: function(context) {
            var view = App.getView(context.id),
                entry = context.entry || (view && view.entry),
                getV = Sage.Platform.Mobile.Utility.getValue;

            if (!entry || !entry['$key']) return;

            this.fields['Contact'].setValue({
                'ContactId': entry['$key'],
                'ContactName': entry['$descriptor']
            });

            this.fields['Account'].setValue({
                'AccountId': getV(entry, 'Account.$key'),
                'AccountName': getV(entry, 'Account.AccountName')
            });
        },
        applyTicketContext: function(context) {
            var view = App.getView(context.id),
                entry = context.entry || (view && view.entry),
                getV = Sage.Platform.Mobile.Utility.getValue;

            if (!entry || !entry['$key']) return;

            this.fields['Ticket'].setValue({
                'TicketId': entry['$key'],
                'TicketNumber': entry['$descriptor']
            });

            this.fields['Contact'].setValue({
                'ContactId': getV(entry, 'Contact.$key'),
                'ContactName': getV(entry, 'Contact.NameLF')
            });

            this.fields['Account'].setValue({
                'AccountId': getV(entry, 'Account.$key'),
                'AccountName': getV(entry, 'Account.AccountName')
            });
        },
        applyOpportunityContext: function(context) {
            var view = App.getView(context.id),
                entry = context.entry || (view && view.entry),
                getV = Sage.Platform.Mobile.Utility.getValue;

            if (!entry || !entry['$key']) return;

            this.fields['Opportunity'].setValue({
                'OpportunityId': entry['$key'],
                'OpportunityName': entry['$descriptor']
            });

            this.fields['Account'].setValue({
                'AccountId': getV(entry, 'Account.$key'),
                'AccountName': getV(entry, 'Account.AccountName')
            });
        },
        applyLeadContext: function(context) {
            var view = App.getView(context.id),
                entry = context.entry || (view && view.entry),
                getV = Sage.Platform.Mobile.Utility.getValue;

            if (!entry || !entry['$key']) return;

            this.fields['Lead'].setValue({
                'LeadId': entry['$key'],
                'LeadName': entry['$descriptor']
            });

            this.fields['AccountName'].setValue(entry['Company']);

            this.fields['IsLead'].setValue(context.resourceKind == 'leads');
        },        
        setValues: function(values) {
            if (values['StartDate'] && values['AlarmTime'])
            {
                var startTime = (this.isDateTimeless(values['StartDate']))
                    ? values['StartDate'].clone().add({minutes: values['StartDate'].getTimezoneOffset()}).getTime()
                    : values['StartDate'].getTime();


                var span = startTime - values['AlarmTime'].getTime(), // ms
                    reminder = span / (1000 * 60);
                
                values['Reminder'] = reminder;
            }

            this.inherited(arguments);

            this.enableFields();

            if (values['Timeless'])
            {
                this.fields['Duration'].disable();
                this.fields['Rollover'].enable();
            }
            else
            {
                this.fields['Duration'].enable();
                this.fields['Rollover'].disable();
            }

            if (values['Alarm'])
                this.fields['Reminder'].enable();
            else
                this.fields['Reminder'].disable();

            this.fields['IsLead'].setValue(this.options.isForLead);

            var entry = this.options.entry,
                denyEdit = !this.options.insert && !this.currentUserCanEdit(entry),
                allowSetAlarm = !denyEdit || this.currentUserCanSetAlarm(entry);

            if (denyEdit)
                this.disableFields();

            if (allowSetAlarm)
                this.enableFields(function(f) { return /^Alarm|Reminder$/.test(f.name) });
        },
        isDateTimeless: function(date) {
            if (!date) return false;
            if (date.getUTCHours() != 0) return false;
            if (date.getUTCMinutes() != 0) return false;
            if (date.getUTCSeconds() != 5) return false;

            return true;
        },
        getValues: function() {
            var values = this.inherited(arguments),
                isStartDateDirty = this.fields['StartDate'].isDirty(),
                isReminderDirty = this.fields['Reminder'].isDirty(),
                startDate = this.fields['StartDate'].getValue(),
                reminderIn = this.fields['Reminder'].getValue(),
                timeless = this.fields['Timeless'].getValue();

            // if StartDate is dirty, always update AlarmTime
            if (startDate && (isStartDateDirty || isReminderDirty))
            {
                values = values || {};
                values['AlarmTime'] = startDate.clone().add({'minutes': -1 * reminderIn});

                // if timeless, convert back to local time
                if (timeless)
                    values['AlarmTime'].add({'minutes': startDate.getTimezoneOffset()});
            }

            return values;
        },
        createReminderData: function() {
            var list = [];

            for (var duration in this.reminderValueText)
            {
                list.push({
                    '$key': duration,
                    '$descriptor': this.reminderValueText[duration]
                });
            }

            return {'$resources': list};
        },
        createDurationData: function() {
            var list = [];

            for (var duration in this.durationValueText)
            {
                list.push({
                    '$key': duration,
                    '$descriptor': this.durationValueText[duration]
                });
            }

            return {'$resources': list};
        },
        formatDependentQuery: function(dependentValue, format, property) {
            var getV = Sage.Platform.Mobile.Utility.getValue;
            return dojo.string.substitute(format, [getV(dependentValue, property || '$key')]);
        },
        createLayout: function() {
            return this.layout || (this.layout = [{
                name: 'Type',
                property: 'Type',
                type: 'hidden'
            },{
                dependsOn: 'Type',
                label: this.regardingText,
                name: 'Description',
                property: 'Description',
                picklist: this.formatPicklistForType.bindDelegate(this, 'Description'),
                title: this.activityDescriptionTitleText,
                orderBy: 'text asc',
                type: 'picklist',
                maxTextLength: 64,
                validator: Mobile.SalesLogix.Validator.exceedsMaxTextLength
            },{
                label: this.priorityText,
                name: 'Priority',
                property: 'Priority',
                picklist: 'Priorities',
                title: this.priorityTitleText,
                type: 'picklist',
                maxTextLength: 64,
                validator: Mobile.SalesLogix.Validator.exceedsMaxTextLength
            },{
                dependsOn: 'Type',
                label: this.categoryText,
                name: 'Category',
                property: 'Category',
                picklist: this.formatPicklistForType.bindDelegate(this, 'Category'),
                orderBy: 'text asc',
                title: this.activityCategoryTitleText,
                type: 'picklist',
                maxTextLength: 64,
                validator: Mobile.SalesLogix.Validator.exceedsMaxTextLength
            },{
                label: this.startingText,
                name: 'StartDate',
                property: 'StartDate',
                type: 'date',
                asTimeless: false,
                showTimePicker: true,
                dateFormatText: this.startingFormatText,
                minValue: (new Date(1900, 0, 1)),
                validator: [
                    Mobile.SalesLogix.Validator.exists,
                    Mobile.SalesLogix.Validator.isDateInRange
                ]
            },{
                label: this.timelessText,
                name: 'Timeless',
                property: 'Timeless',
                type: 'boolean'
            },{
                label: this.durationText,
                title: this.durationTitleText,
                name: 'Duration',
                property: 'Duration',
                type: 'duration',
                view: 'select_list',
                data: this.createDurationData()
            },{
                name: 'Alarm',
                property: 'Alarm',
                label: this.alarmText,
                type: 'boolean'
            },{
                label: this.reminderText,
                title: this.reminderTitleText,
                include: false,
                name: 'Reminder',
                property: 'Reminder',
                type: 'duration',
                view: 'select_list',
                data: this.createReminderData()
            },{
                label: this.rolloverText,
                name: 'Rollover',
                property: 'Rollover',
                type: 'boolean'
            },{
                type: 'hidden',
                name: 'UserId',
                property: 'UserId'
            },{
                label: this.leaderText,
                name: 'Leader',
                property: 'Leader',
                include: false,
                type: 'lookup',
                textProperty: 'UserInfo',
                textTemplate: Mobile.SalesLogix.Template.nameLF,
                requireSelection: true,
                view: 'user_list',
                where: 'Type ne "Template" and Type ne "Retired"'
            },{
                label: this.longNotesText,
                noteProperty: false,
                name: 'LongNotes',
                property: 'LongNotes',
                title: this.longNotesTitleText,
                type: 'note',
                view: 'text_edit'
            },{
                label: this.isLeadText,
                name: 'IsLead',
                property: 'IsLead',
                include: false,
                type: 'boolean',
                onText: this.yesText,
                offText: this.noText
            },{
                label: this.accountText,
                name: 'Account',
                property: 'Account',
                type: 'lookup',
                emptyText: '',
                applyTo: '.',
                valueKeyProperty: 'AccountId',
                valueTextProperty: 'AccountName',
                view: 'account_related'
            },{
                dependsOn: 'Account',
                label: this.contactText,
                name: 'Contact',
                property: 'Contact',
                type: 'lookup',
                emptyText: '',
                applyTo: '.',
                valueKeyProperty: 'ContactId',
                valueTextProperty: 'ContactName',
                view: 'contact_related',
                where: this.formatDependentQuery.bindDelegate(
                    this, 'Account.Id eq "${0}"', 'AccountId'
                )
            },{
                dependsOn: 'Account',
                label: this.opportunityText,
                name: 'Opportunity',
                property: 'Opportunity',
                type: 'lookup',
                emptyText: '',
                applyTo: '.',
                valueKeyProperty: 'OpportunityId',
                valueTextProperty: 'OpportunityName',
                view: 'opportunity_related',
                where: this.formatDependentQuery.bindDelegate(
                    this, 'Account.Id eq "${0}"', 'AccountId'
                )
            },{
                dependsOn: 'Account',
                label: this.ticketNumberText,
                name: 'Ticket',
                property: 'Ticket',
                type: 'lookup',
                emptyText: '',
                applyTo: '.',
                valueKeyProperty: 'TicketId',
                valueTextProperty: 'TicketNumber',
                view: 'ticket_related',
                where: this.formatDependentQuery.bindDelegate(
                    this, 'Account.Id eq "${0}"', 'AccountId'
                )
            },{
                label: this.leadText,
                name: 'Lead',
                property: 'Lead',
                type: 'lookup',
                emptyText: '',
                applyTo: '.',
                valueKeyProperty: 'LeadId',
                valueTextProperty: 'LeadName',
                view: 'lead_related'
            },{
                label: this.companyText,
                name: 'AccountName',
                property: 'AccountName',
                type: 'text'
            }]);
        }
    });     
});

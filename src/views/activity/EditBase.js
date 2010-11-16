/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/Edit.js"/>
/// <reference path="../../Format.js"/>

Ext.namespace("Mobile.SalesLogix.Activity");

(function() {
    Mobile.SalesLogix.Activity.EditBase = Ext.extend(Sage.Platform.Mobile.Edit, {
        //Localization
        activityCategoryTitleText: 'Activity Category',
        activityDescriptionTitleText: 'Activity Description',
        activityTypeTitleText: 'Activity Type',
        alarmText: 'reminder',
        alarmTimeText: ' ',
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
            'Type',
            'UserId'
        ],
        resourceKind: 'activities',

        render: function() {
            Mobile.SalesLogix.Activity.EditBase.superclass.render.apply(this, arguments);
            //TODO: Move this to CSS, with a special class.
            this.fields['Alarm'].el.findParent('[data-field]', 3, true).setStyle('borderBottom', 'none');
        },
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

            Mobile.SalesLogix.Activity.EditBase.superclass.show.apply(this, arguments);
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
        setDefaultReminder: function() {
            var startDate = this.fields['StartDate'].getValue(),
                alarmTime = startDate.match(/Date\((\d+)\)/),
                duration = parseInt(this.fields['Duration'].getValue(), 10);

            if (alarmTime)
            {
                alarmTime = parseInt(alarmTime[1], 10);
                alarmTime -= (duration * 60 * 1000);
                alarmTime = String.format("\/Date({0})\/", alarmTime);
                this.fields['AlarmTime'].setValue(alarmTime, true);
            }
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
})();
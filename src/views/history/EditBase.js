/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/Edit.js"/>
/// <reference path="../../Format.js"/>

Ext.namespace("Mobile.SalesLogix.History");

(function() {
    Mobile.SalesLogix.History.EditBase = Ext.extend(Sage.Platform.Mobile.Edit, {
        //Localization
        activityCategoryTitleText: 'Activity Category',
        activityDescriptionTitleText: 'Activity Description',
        categoryText: 'category',
        completedText: 'completed',
        durationText: 'duration',
        fbarHomeTitleText: 'home',
        fbarScheduleTitleText: 'schedule',
        leaderText: 'leader',
        longNotesText: 'notes',
        longNotesTitleText: 'Notes',
        moreDetailsText: 'More Details',
        priorityText: 'priority',
        priorityTitleText: 'Priority',
        regardingText: 'regarding',
        scheduledText: 'scheduled',
        timelessText: 'timeless',
        titleText: 'History',
        typeText: 'type',       

        //View Properties
        entityName: 'History',
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
                'Description': 'E-Mail Regarding'
            }
        },
        durationValueText: {
            0: 'none',
            15: '15 minutes',
            30: '30 minutes',
            60: '1 hour',
            90: '1.5 hours',
            120: '2 hours'
        },
        resourceKind: 'history',

        init: function() {
            Mobile.SalesLogix.History.EditBase.superclass.init.apply(this, arguments);

            this.fields['Timeless'].on('change', this.onTimelessChange, this);
        },
        onTimelessChange: function(value, field) {
            var field = this.fields['Duration'];

            value === true ? field.disable() : field.enable();
        },
        formatPicklistForType: function(type, which) {
            return this.picklistsByType[type] && this.picklistsByType[type][which];
        },
        formatDurationText: function(val, key, text) {
            return this.durationValueText[key] || text;
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
        createLayout: function() {
            return this.layout || (this.layout = [
                {
                    name: 'Type',
                    type: 'hidden'
                },
                {
                    dependsOn: 'Type',
                    label: this.regardingText,
                    name: 'Description',
                    picklist: this.formatPicklistForType.createDelegate(
                        this, ['Description'], true
                    ),
                    orderBy: 'text asc',
                    title: this.activityDescriptionTitleText,
                    type: 'picklist'
                },
                {
                    name: 'LongNotes',
                    label: this.longNotesText,
                    noteProperty: false,
                    title: this.longNotesTitleText,
                    type: 'note',
                    view: 'text_edit'
                },
                {
                    options: {
                        title: this.moreDetailsText,
                        collapsed: true
                    },
                    as: [{
                            label: this.priorityText,
                            name: 'Priority',
                            picklist: 'Priorities',
                            title: this.priorityTitleText,
                            type: 'picklist',
                            maxTextLength: 64,
                            validator: Mobile.SalesLogix.Validator.exceedsMaxTextLength
                        },
                        {
                            dependsOn: 'Type',
                            label: this.categoryText,
                            name: 'Category',
                            picklist: this.formatPicklistForType.createDelegate(
                                this, ['Category'], true
                            ),
                            title: this.activityCategoryTitleText,
                            type: 'picklist',
                            maxTextLength: 64,
                            validator: Mobile.SalesLogix.Validator.exceedsMaxTextLength
                        },
                        {
                            label: this.completedText,
                            name: 'CompletedDate',
                            type: 'date',
                            showTimePicker: true,
                            formatString: 'M/d/yyyy h:mm tt'
                        },
                        {
                            label: this.scheduledText,
                            name: 'StartDate',
                            type: 'date',
                            showTimePicker: true,
                            formatString: 'M/d/yyyy h:mm tt'
                        },
                        {
                            label: this.timelessText,
                            name: 'Timeless',
                            type: 'boolean'
                        },
                        {
                            label: this.durationText,
                            name: 'Duration',
                            type: 'select',
                            view: 'select_list',
                            textRenderer: this.formatDurationText.createDelegate(this),
                            requireSelection: true,
                            valueKeyProperty: false,
                            valueTextProperty: false,
                            data: this.createDurationData()
                        },
                        {
                            label: this.leaderText,
                            name: 'User',
                            emptyText: '',
                            applyTo: '.',
                            valueKeyProperty: 'UserId',
                            valueTextProperty: 'UserName',
                            type: 'lookup',
                            view: 'user_list'
                        }
                    ]
                }
           ]);
        }
    });
})();
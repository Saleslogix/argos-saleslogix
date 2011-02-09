/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/Detail.js"/>

Ext.namespace("Mobile.SalesLogix.History");

(function() {
    Mobile.SalesLogix.History.DetailBase = Ext.extend(Sage.Platform.Mobile.Detail, {
        //Localization
        categoryText: 'category',
        completeText: 'completed',
        durationText: 'duration',
        fbarHomeTitleText: 'home',
        fbarScheduleTitleText: 'schedule',
        leaderText: 'leader',
        longNotesText: 'notes',
        priorityText: 'priority',
        regardingText: 'regarding',
        scheduledText: 'scheduled',
        timelessText: 'timeless',
        titleText: 'History',
        typeText: 'type',
        activityTypeText: {
            'atToDo': 'To-Do',
            'atPhoneCall': 'Phone Call',
            'atAppointment': 'Meeting',
            'atLiterature': 'Literature Request',
            'atPersonal': 'Personal Activity',
            'atQuestion': 'Question',
            'atEMail': 'E-mail'
        },
        //View Properties
        resourceKind: 'history',

        init: function() {
            Mobile.SalesLogix.History.DetailBase.superclass.init.apply(this, arguments);
            this.tools.tbar = [];
        },
        formatActivityType: function(val) {
            return this.activityTypeText[val] || val;
        },
        createLayout: function() {
            return this.layout || (this.layout = [
                {
                    name: 'Type',
                    label: this.typeText,
                    renderer: this.formatActivityType
                },
                {
                    name: 'Description',
                    label: this.regardingText
                },
                {
                    name: 'Priority',
                    label: this.priorityText
                },
                {
                    name: 'Category',
                    label: this.categoryText
                },
                {
                    name: 'CompletedDate',
                    label: this.completeText,
                    renderer: Mobile.SalesLogix.Format.date.createDelegate(
                        this, ['M/d/yyyy h:mm:ss tt'], true
                    )                },
                {
                    name: 'StartDate',
                    label: this.scheduledText,
                    renderer: Mobile.SalesLogix.Format.date.createDelegate(
                        this, ['M/d/yyyy h:mm:ss tt'], true
                    )                },
                {
                    name: 'Timeless',
                    label: this.timelessText
                },
                {
                    name: 'Duration',
                    label: this.durationText,
                    renderer: Mobile.SalesLogix.Format.timespan
                },
                {
                    name: 'UserName',
                    label: this.leaderText
                }
            ]);
        }
    });
})();
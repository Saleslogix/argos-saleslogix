/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/Detail.js"/>

Ext.namespace("Mobile.SalesLogix.Activity");

(function() {
    Mobile.SalesLogix.Activity.DetailBase = Ext.extend(Sage.Platform.Mobile.Detail, {
        //Templates
        leaderTemplate: Mobile.SalesLogix.Template.nameLF,

        //Localization
        activityTypeText: {
            'atToDo': 'To-Do',
            'atPhoneCall': 'Phone Call',
            'atAppointment': 'Meeting',
            'atLiterature': 'Literature Request',
            'atPersonal': 'Personal Activity'
        },
        alarmText: 'reminder',
        alarmTimeText: 'reminder',
        categoryText: 'category',
        durationText: 'duration',
        fbarHomeTitleText: 'home',
        fbarScheduleTitleText: 'schedule',
        leaderText: 'leader',
        longNotesText: 'notes',
        priorityText: 'priority',
        regardingText: 'regarding',
        rolloverText: 'auto rollover',
        startingText: 'start time',
        timelessText: 'timeless',
        titleText: 'Activity',
        typeText: 'type',

        //View Properties
        querySelect: [
            'AccountId',
            'AccountName',
            'Alarm',
            'AlarmTime',
            'Category',
            'Company',
            'ContactId',
            'ContactName',
            'Description',
            'Duration',
            'UserId',
            'LeadId',
            'LeadName',
            'LongNotes',
            'OpportunityId',
            'OpportunityName',
            'Priority',
            'Rollover',
            'StartDate',
            'TicketId',
            'TicketNumber',
            'Timeless',
            'Type'
        ],
        resourceKind: 'activities',

        formatActivityType: function(val) {
            return this.activityTypeText[val] || val;
        },
        init: function() {
            Mobile.SalesLogix.Activity.DetailBase.superclass.init.apply(this, arguments);

            this.tools.fbar = [{
                cls: '',
                fn: function() {
                    App.navigateToActivityInsertView.call(App, {"id": this.id});
                },
                icon: 'content/images/icons/To_Do_24x24.png',
                name: 'schedule',
                scope: this,
                title: this.fbarScheduleTitleText
            }];
        },
        requestLeader: function(userId)
        {
            var request = new Sage.SData.Client.SDataSingleResourceRequest(this.getService())
                .setResourceKind('users')
                .setResourceSelector(String.format("'{0}'", userId))
                .setQueryArg('select', [
                    'UserInfo/FirstName',
                    'UserInfo/LastName'
                ].join(','));

            request.allowCacheUse = true;
            request.read({
                success: this.processLeader,
                failure: this.requestLeaderFailure,
                scope: this
            });
        },
        requestLeaderFailure: function(xhr, o) {
        },
        processLeader: function(leader) {
            if (leader)
            {
                this.entry['Leader'] = leader;

                var rowEl = this.el.child('[data-property="Leader"]'),
                    contentEl = rowEl && rowEl.child('span');

                if (rowEl)
                    rowEl.removeClass('content-loading');

                if (contentEl)
                    contentEl.update(this.leaderTemplate.apply(leader['UserInfo']));
            }
        },
        processEntry: function(entry) {
            Mobile.SalesLogix.Activity.DetailBase.superclass.processEntry.apply(this, arguments);

            if (entry && entry['UserId']) this.requestLeader(entry['UserId']);
        },        
        createLayout: function() {
            return this.layout || (this.layout = [
                {
                    name: 'Type',
                    label: this.typeText,
                    renderer: this.formatActivityType.createDelegate(this)
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
                    name: 'StartDate',
                    label: this.startingText,
                    renderer: Mobile.SalesLogix.Format.date.createDelegate(
                        this, ['M/d/yyyy h:mm:ss tt'], true
                    )
                },
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
                    name: 'Alarm',
                    label: this.alarmText
                },
                {
                    name: 'AlarmTime',
                    label: this.alarmTimeText,
                    renderer: Mobile.SalesLogix.Format.date.createDelegate(
                        this, ['M/d/yyyy h:mm:ss tt'], true
                    )
                },
                {
                    name: 'Rollover',
                    label: this.rolloverText
                },
                {
                    name: 'Leader',
                    label: this.leaderText,
                    cls: 'content-loading',
                    value: 'loading...'
                },
                {
                    name: 'LongNotes',
                    label: this.longNotesText
                }
            ]);
        }        
    });
})();

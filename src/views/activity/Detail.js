/// <reference path="../../../../ext/ext-core-debug.js"/>
/// <reference path="../../../../Simplate.js"/>
/// <reference path="../../../../sdata/SDataSingleResourceRequest.js"/>
/// <reference path="../../../../sdata/SDataService.js"/>
/// <reference path="../../../../platform/View.js"/>
/// <reference path="../../../../platform/Detail.js"/>
/// <reference path="../../Format.js"/>

Ext.namespace("Mobile.SalesLogix.Activity");

Mobile.SalesLogix.Activity.Detail = Ext.extend(Sage.Platform.Mobile.Detail, {
    titleText: 'Activity',
    typeText: 'type',
    accountText: 'account',
    startingText: 'starting',
    endingText: 'ending',
    timelessText: 'timeless',
    nameText: 'name',
    regardingText: 'regarding',
    priorityText: 'priority',
    recurringText: 'recurring',
    alarmText: 'alarm',
    createUserText: 'create user',
    createDateText: 'create date',
    constructor: function(o) {
        Mobile.SalesLogix.Activity.Detail.superclass.constructor.call(this);

        Ext.apply(this, o, {
            id: 'activity_detail',
            title: this.titleText,
            editor: 'activity_edit',
            resourceKind: 'activities'
        });

        this.layout = [
            {name: 'Type', label: this.typeText},
            {name: 'AccountName', label: this.accountText},
            {name: 'StartDate', label: this.startingText,renderer: Mobile.SalesLogix.Format.date},
            {name: 'EndDate', label: this.endingText,renderer: Mobile.SalesLogix.Format.date},
            //{name: 'EndDate - StartDate', label: 'duration',renderer: Mobile.SalesLogix.Format.date},
            {name: 'Timeless', label: this.timelessText},
            {name: 'ContactName', label: this.nameText},
            {name: 'Description', label: this.regardingText},
            {name: 'Priority', label: this.priorityText},
            {name: 'Recurring', label: this.recurringText},
            {name: 'Alarm', label: this.alarmText},
            {name: 'CreateUser', label: this.createUserText},
            {name: 'CreateDate', label: this.createDateText,renderer: Mobile.SalesLogix.Format.date}
           ];
    },
    init: function() {
        Mobile.SalesLogix.Activity.Detail.superclass.init.call(this);
    },
    createRequest: function() {
        var request = Mobile.SalesLogix.Activity.Detail.superclass.createRequest.call(this);

        request
            .setQueryArgs({
                //'select': 'Type,AccountName,StartDate,EndDate,EndDate - StartDate,Timeless,ContactName,Description,Priority,Recurring,Alarm,CreateUser,CreateDate'
                'select': [
                        'Type',
                        'AccountName',
                        'StartDate',
                        'EndDate',
                        'Timeless',
                        'ContactName',
                        'Description',
                        'Priority',
                        'Recurring',
                        'Alarm',
                        'CreateUser',
                        'CreateDate'
                        ]
            });

        return request;
    }
});
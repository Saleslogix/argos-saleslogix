/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/Detail.js"/>

Ext.namespace("Mobile.SalesLogix.Lead");

(function() {
    Mobile.SalesLogix.Lead.Detail = Ext.extend(Sage.Platform.Mobile.Detail, {
        //Localization
        activityTypeText: {
            'atPhoneCall': 'Phone Call',
            'atEMail': 'E-mail'
        },
        accountText: 'company',
        addressText: 'address',
        businessDescriptionText: 'bus desc',
        createDateText: 'create date',
        createUserText: 'create user',
        eMailText: 'email',
        leadSourceText: 'lead source',
        industryText: 'industry',
        interestsText: 'interests',
        leadTitleText: 'title',
        nameText: 'name',
        notesText: 'comments',
        ownerText: 'owner',
        relatedActivitiesText: 'Activities',
        relatedHistoriesText: 'History',
        relatedItemsText: 'Related Items',
        relatedNotesText: 'Notes',
        sicCodeText: 'sic code',
        titleText: 'Lead',
        tollFreeText: 'toll free',
        webText: 'web',
        workText: 'phone',
        actionsText: 'Actions',
        callWorkNumberText: 'Call main number',
        scheduleActivityText: 'Schedule activity',
        addNoteText: 'Add note',
        sendEmailText: 'Send email',
        viewAddressText: 'View address',
        moreDetailsText: 'More Details',
        calledText: 'Called {0}',
        emailedText: 'Emailed {0}',

        //View Properties
        id: 'lead_detail',
        editView: 'lead_edit',
        historyEditView: 'history_edit',
        noteEditView: 'note_edit',
        querySelect: [
            'Address/*',
            'BusinessDescription',
            'Company',
            'CreateDate',
            'CreateUser',
            'Email',
            'FirstName',
            'FullAddress',
            'Industry',
            'Interests',
            'LastName',
            'LeadNameLastFirst',
            'LeadSource/Description',
            'MiddleName',
            'Notes',
            'Owner/OwnerDescription',
            'Prefix',
            'SICCode',
            'Suffix',
            'Title',
            'TollFree',
            'WebAddress',
            'WorkPhone'
        ],
        resourceKind: 'leads',
        
        navigateToHistoryInsert: function(type, entry) {
            var view = App.getView(this.historyEditView);
            if (view)
            {
                view.show({
                    title: this.activityTypeText[type],
                    template: {},
                    entry: entry,
                    insert: true
                });
            }
        },
        recordCallToHistory: function() {
            var entry = {
                '$name': 'History',
                'Type': 'atEMail',
                'AccountName': this.entry['Company'],
                'LeadId': this.entry['$key'],
                'LeadName': this.entry['LeadNameLastFirst'],
                'Description': String.format(this.calledText, this.entry['LeadNameLastFirst']),
                'UserId': App.context && App.context.user['$key'],
                'UserName': App.context && App.context.user['UserName'],
                'Duration': 15,
                'CompletedDate': (new Date())
            };

            this.navigateToHistoryInsert('atPhoneCall', entry);
        },
        recordEmailToHistory: function() {
            var entry = {
                '$name': 'History',
                'Type': 'atEMail',
                'AccountName': this.entry['Company'],
                'LeadId': this.entry['$key'],
                'LeadName': this.entry['LeadNameLastFirst'],
                'Description': String.format(this.emailedText, this.entry['LeadNameLastFirst']),
                'UserId': App.context && App.context.user['$key'],
                'UserName': App.context && App.context.user['UserName'],
                'Duration': 15,
                'CompletedDate': (new Date())
            };

            this.navigateToHistoryInsert('atEMail', entry);
        },
        callWorkPhone: function() {
            this.recordCallToHistory();

            App.initiateCall(this.entry['WorkPhone']);
        },
        sendEmail: function() {
            this.recordEmailToHistory();

            App.initiateEmail(this.entry['Email'])
        },
        viewAddress: function() {
            App.showMapForAddress(Mobile.SalesLogix.Format.address(this.entry['Address'], true, ' '));
        },
        scheduleActivity: function() {
            App.navigateToActivityInsertView();
        },
        addNote: function() {
            var view = App.getView(this.noteEditView);
            if (view)
            {
                view.show({
                    template: {},
                    insert: true
                });
            }
        },
        createLayout: function() {
            return this.layout || (this.layout = [{
                options: {
                    list: true,
                    title: this.actionsText,
                    cls: 'action-list'
                },
                as: [{
                    name: 'WorkPhone',
                    label: this.callWorkNumberText,
                    icon: 'content/images/icons/Schedule_Call_24x24.png',
                    action: 'callWorkPhone',
                    renderer: Mobile.SalesLogix.Format.phone.createDelegate(this, [false], true)
                },{
                    name: 'Email',
                    label: this.sendEmailText,
                    icon: 'content/images/icons/letters_24.png',
                    action: 'sendEmail'
                },{
                    name: '',
                    label: this.scheduleActivityText,
                    icon: 'content/images/icons/job_24.png',
                    action: 'scheduleActivity',
                    tpl: new Simplate([
                        '{%: $.Company %} / {%: $.LeadNameLastFirst %}'
                    ])
                },{
                    name: 'LeadNameLastFirst',
                    label: this.addNoteText,
                    icon: 'content/images/icons/note_24.png',
                    action: 'addNote'
                },{
                    name: 'Address',
                    label: this.viewAddressText,
                    icon: 'content/images/icons/internet_24.png',
                    action: 'viewAddress',
                    renderer: Mobile.SalesLogix.Format.address.createDelegate(this, [true, ' '], true)
                }]
            },{
                options: {
                    title: this.detailsText
                },
                as: [{
                    label: this.nameText,
                    name: 'LeadNameLastFirst'
                },{
                    label: this.accountText,
                    name: 'Company'
                },{
                    label: this.webText,
                    name: 'WebAddress',
                    renderer: Mobile.SalesLogix.Format.link
                },{
                    label: this.leadTitleText,
                    name: 'Title'
                },{
                    label: this.tollFreeText,
                    name: 'TollFree',
                    renderer: Mobile.SalesLogix.Format.phone
                },{
                    label: this.leadSourceText,
                    name: 'LeadSource.Description'
                }]
            },{
                options: {
                    title: this.moreDetailsText,
                    collapsed: true
                },
                as: [{
                    label: this.interestsText,
                    name: 'Interests'
                },{
                    label: this.industryText,
                    name: 'Industry'
                },{
                    label: this.sicCodeText,
                    name: 'SICCode'
                },{
                    label: this.businessDescriptionText,
                    name: 'BusinessDescription'
                },{
                    label: this.notesText,
                    name: 'Notes'
                },{
                    label: this.ownerText,
                    name: 'Owner.OwnerDescription'
                }]
            },{
                options: {
                    list: true,
                    title: this.relatedItemsText
                },
                as: [{
                    icon: 'content/images/icons/job_24.png',
                    label: this.relatedActivitiesText,
                    view: 'activity_related',
                    where: this.formatRelatedQuery.createDelegate(
                        this, ['LeadId eq "{0}"'], true
                    )
                },
                {
                    icon: 'content/images/icons/note_24.png',
                    label: this.relatedNotesText,
                    view: 'note_related',
                    where: this.formatRelatedQuery.createDelegate(
                        this, ['LeadId eq "{0}" and Type eq "atNote"'], true
                    )
                },
                {
                    icon: 'content/images/icons/journal_24.png',
                    label: this.relatedHistoriesText,
                    where: this.formatRelatedQuery.createDelegate(
                        this, ['LeadId eq "{0}" and Type ne "atNote" and Type ne "atDatabaseChange"'], true
                    ),
                    view: 'history_related'
                }]
            }]);
        }
    });
})();
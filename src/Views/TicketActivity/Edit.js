/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */
define('Mobile/SalesLogix/Views/TicketActivity/Edit', [
    'dojo/_base/declare',
    'dojo/_base/lang',
    'Mobile/SalesLogix/Template',
    'Mobile/SalesLogix/Validator',
    'Sage/Platform/Mobile/ErrorManager',
    'Sage/Platform/Mobile/Edit'
], function(
    declare,
    lang,
    template,
	validator,
    ErrorManager,
    Edit
) {

    return declare('Mobile.SalesLogix.Views.TicketActivity.Edit', [Edit], {
        //Localization
        titleText: 'Edit Ticket Activity',
        activityTypeText: 'type',
        activityTypeTitleText: 'Type',
        publicAccessText: 'public access',
        publicAccessTitleText: 'Public Access',
        userText: 'user',
        startDateText: 'start date',
        endDateText: 'end date',
        commentsText: 'comments',
        startingFormatText: 'M/D/YYYY h:mm A',

        //View Properties
        entityName: 'TicketActivity',
        id: 'ticketactivity_edit',
        querySelect: [
            'ActivityDescription',
            'ActivityTypeCode',
            'AssignedDate',
            'CompletedDate',
            'PublicAccessCode',
            'User/UserName',
            'User/UserInfo/FirstName',
            'User/UserInfo/LastName'
        ],
        resourceKind: 'ticketActivities',

        processTemplateEntry: function(entry) {
            this.inherited(arguments);

            if (entry['PublicAccessCode']) {
                this.requestCodeData('name eq "Ticket Activity Public Access"', entry['PublicAccessCode'], this.fields['PublicAccessCode']);
            }
        },
        createPicklistRequest: function(name) {
            var request = new Sage.SData.Client.SDataResourceCollectionRequest(App.getService())
                .setResourceKind('picklists')
                .setContractName('system');

            var uri = request.getUri();
            uri.setPathSegment(Sage.SData.Client.SDataUri.ResourcePropertyIndex, 'items');
            uri.setCollectionPredicate(name);

            request.allowCacheUse = true;
            return request;
        },
        requestCodeData: function(picklistName, code, field) {
            var request = this.createPicklistRequest(picklistName);
            request.read({
                success: lang.hitch(this, this.onRequestCodeDataSuccess, code, field),
                failure: this.onRequestCodeDataFailure,
                scope: this
            });
        },
        onRequestCodeDataSuccess: function(code, field, feed) {
            var value = this.processCodeDataFeed(feed, code);
            field.setValue(code);
            field.setText(value);
        },
        onRequestCodeDataFailure: function(response, o) {
            ErrorManager.addError(response, o, this.options, 'failure');
        },
        processCodeDataFeed: function(feed, currentValue, options) {
            var keyProperty = options && options.keyProperty ? options.keyProperty : '$key';
            var textProperty = options && options.textProperty ? options.textProperty : 'text';

            for (var i = 0; i < feed.$resources.length; i++) {
                if (feed.$resources[i][keyProperty] === currentValue) {
                    return feed.$resources[i][textProperty];
                }
            }

            return currentValue;
        },

        applyContext: function() {
            this.inherited(arguments);

            var ticketContext = App.isNavigationFromResourceKind(['tickets']),
                ticketKey = ticketContext && ticketContext.key,
                user = App.context.user,
                userField = this.fields.User;

            if (ticketKey) {
                this.fields['TicketId'].setValue(ticketKey);
            }

            if (userField) {
                userField.setValue(user);
            }
        },

        createLayout: function() {
            return this.layout || (this.layout = [
                {
                    name: 'TicketId',
                    property: 'Ticket.$key',
                    type: 'hidden'
                },
                {
                    label: this.activityTypeText,
                    name: 'ActivityTypeCode',
                    property: 'ActivityTypeCode',
                    requireSelection: true,
                    title: this.activityTypeTitleText,
                    storageMode: 'id',
                    picklist: 'Ticket Activity',
                    type: 'picklist'
                }, {
                    label: this.publicAccessText,
                    name: 'PublicAccessCode',
                    property: 'PublicAccessCode',
                    title: this.publicAccessTitleText,
                    storageMode: 'id',
                    picklist: 'Ticket Activity Public Access',
                    type: 'picklist'
                }, {
                    label: this.userText,
                    name: 'User',
                    property: 'User',
                    textProperty: 'UserInfo',
                    textTemplate: template.nameLF,
                    type: 'lookup',
                    view: 'user_list'
                }, {
                    label: this.startDateText,
                    name: 'AssignedDate',
                    property: 'AssignedDate',
                    type: 'date',
                    showTimePicker: true,
                    dateFormatText: this.startingFormatText,
                    minValue: (new Date(1900, 0, 1)),
                    validator: [
                        validator.exists,
                        validator.isDateInRange
                    ]
                }, {
                    label: this.endDateText,
                    name: 'CompletedDate',
                    property: 'CompletedDate',
                    type: 'date',
                    showTimePicker: true,
                    dateFormatText: this.startingFormatText,
                    minValue: (new Date(1900, 0, 1)),
                    validator: [
                        validator.exists,
                        validator.isDateInRange
                    ]
                }, {
                    label: this.commentsText,
                    name: 'ActivityDescription',
                    property: 'ActivityDescription',
                    rows: 6,
                    type: 'textarea'
                }
            ]);
        }
    });
});


/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */

/**
 * @class Mobile.SalesLogix.Views.ActivityAttendee.RelatedView
 *
 * @extends Sage.Platform.Mobile.RelatedViewWidget
 *
 * @requires Sage.Platform.Mobile.Convert
 *
 * @requires Mobile.SalesLogix.Format
 *
 * @requires moment
 */

define('Mobile/SalesLogix/Views/ActivityAttendee/RelatedView', [
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/_base/connect',
    'Mobile/SalesLogix/Format',
    'Sage/Platform/Mobile/Convert',
    'Sage/Platform/Mobile/RelatedViewWidget',
    'moment',
    'Sage/Platform/Mobile/FieldManager'
], function(
    declare,
    lang,
    connect,
    format,
    convert,
    RelatedViewWidget,
    moment,
    FieldManager
) {
    return declare('Mobile.SalesLogix.Views.ActivityAttendee.RelatedView', [RelatedViewWidget], {
        contactText: 'Contact',
        leadText: 'lead',
        addContactText: 'Add Contact',
        addLeadText: 'Add lead',
        isAttendeeText: 'Is Attendee',
        isPrimaryText: 'Is Primary',

        luContact: null,
        luLead: null,


        id: 'relatedView_activity_attendee',
        icon: 'content/images/icons/journal_24.png',
        itemIcon: 'content/images/icons/journal_24.png',
        title: "Attendee's",
        detailViewId: 'activity_attendee_detail',
        listViewId: 'activity_attendee_related',
        listViewWhere: null,
        enabled: true,
        showTab: true,
        enableActions: true,
        enableItemActions: true,
        showItemActionAsButton: true,
        showItemFooter:false,
        showTotalInTab: true,
        hideWhenNoData: false,
        showSelectMore: true,
        resourceKind: 'activityAttendees',
        select: ['EntityType', 'ModifyDate', 'EntityId', 'IsPrimary', 'Attendee', 'RoleName', 'Name', 'AccountName', 'PhoneNumber', 'Email','TimeZone'],
        where:null ,
        sort: 'IsPrimary desc, Name asc',
        pageSize: 3,
        relatedItemIconTemplate: new Simplate([
            '<div class="user-icon">{%: Mobile.SalesLogix.Format.formatUserInitial($.EntityType) %}</div>'
        ]),
        relatedItemHeaderTemplate: new Simplate([
            '<h3 ><strong>{%: $$.getDescription($) %} </strong></h4>',
            '{% if ($.IsPrimary) { %}',
                 '<span class="" style="float:left;padding:2px">',
                    '<img src="content/images/icons/IsPrimary_24x24.png" alt="{%= $$.IsPrimaryText %}" />',
                '</span>',
             '{% } %}',
           //'<h3>{%: $.EntityType %}  {%: Mobile.SalesLogix.Format.relativeDate($.ModifyDate, false) %}</h4>'
        ]),
        relatedItemDetailTemplate: new Simplate([
               '<div>',
                '<h3>{%: $.PhoneNumber %}</h4>',
                '<h3>{%: $.Email %}</h4>',
              '</div>'
        ]),
        relatedItemFooterTemplate: new Simplate([
           '<br>'
        ]),
        getDescription: function(entry) {
            return (entry.Name)? entry.Name : entry.$descriptor;
        },
        createActionLayout: function() {

            if (!this.actions) {
                this.actions = [];
            }
           this.actions.push({
                id: 'add_contact',
                icon: 'content/images/icons/Contacts_24x24.png',
                label: this.addContactText,
                action: 'onAddContact',
                isEnabled: true,
                fn: this.onAddContact.bindDelegate(this)
            });
            this.actions.push({
                id: 'add_lead',
                icon: 'content/images/icons/Leads_24x24.png',
                label: this.addLeadText,
                action: 'onAddLead',
                isEnabled: true,
                fn: this.onAddLead.bindDelegate(this)
            });
            return this.actions;
        },
        createItemActionLayout: function() {

            if (!this.itemActions) {
                this.itemActions = [];
            }
            this.itemActions.push({
                id: 'isPrimary',
                icon: 'content/images/icons/IsPrimary_24x24.png',
                label: this.isPrimaryText,
                action: 'onIsPrimary',
                selected: function(itemEntry) {
                    if (itemEntry.IsPrimary) {
                        return true;
                    }
                    return false;
                },
                isEnabled: true
            });
            this.itemActions.push({
                id: 'isAttendee',
                icon: 'content/images/icons/IsAttendee_24.png',
                label: this.isAttendeeText,
                action: 'onIsAttendee',
                selected: function(itemEntry) {
                    if (itemEntry.Attendee) {
                        return true;
                    }
                    return false;
                },
                isEnabled: true,
                fn: this.onIsAttendee.bindDelegate(this)
            });
            return this.itemActions;
        },
        onAddContact: function(evt) {
            var ctor;

            if (!this.luContact) {
                ctor = FieldManager.get('lookup'),
                 this.luContact = new ctor(lang.mixin({
                     owner: this
                 }, {
                     name: 'Contact',
                     property: 'Contact',
                     textProperty: 'Contct',
                     singleSelect:false,
                     view: 'contact_related'

                 }));
                this.connect(this.luContact, 'onChange', this._processContactLookupResults);
            }

            this.luContact.buttonClick();

        },
        onAddLead: function(evt) {
            var ctor;

            if (!this.luLead) {
                ctor = FieldManager.get('lookup'),
                 this.luLead = new ctor(lang.mixin({
                     owner: this
                 }, {
                     name: 'Lead',
                     property: 'Lead',
                     textProperty: 'Lead',
                     singleSelect: false,
                     view: 'lead_related'

                 }));
                this.connect(this.luLead, 'onChange', this._processLeadLookupResults);
            }

            this.luLead.buttonClick();

        },
        _processContactLookupResults: function(values, field) {

            var contactAttendees = [];
            var attendee;

            for (var contactKey in values) {
                if (!this._attendeeExists(contactKey)) {
                   
                    contactAttendees.push(contactKey);
                }
            }
            if (contactAttendees.length > 0) {

                this._addLContactAttendees(contactAttendees);
            }
        },
        _processLeadLookupResults: function(values, field) {

            var leadAttendees = [];
            var attendee;

            for (var leadKey in values) {
                if (!this._attendeeExists(leadKey)) {
                    leadAttendees.push(leadKey);
                }
            }
            if (leadAttendees.length > 0) {

                this._addLeadAttendees(leadAttendees);
            }
        },
        _getActivityId: function() {

            if (this.parentEntry) {
                return this.parentEntry.$key;
            }
            return null;

        },
        _attendeeExists: function(attendeeKey) {
            return false;
        },
        _setAttendeeEntityFromContactLead: function(type, results) {
            var attendeeEntity = false;
            if (results && results.$key) {
                attendeeEntity = {};
                attendeeEntity.ActivityId = this._getActivityId();
                attendeeEntity.Activity = { '$key': attendeeEntity.ActivityId };
                attendeeEntity.EntityType = type;
                attendeeEntity.EntityId = results.$key;
                attendeeEntity.$key = results.$key;
                attendeeEntity.IsPrimary = false;
                attendeeEntity.Name = results.$descriptor;
                attendeeEntity.$descriptor = results.$descriptor;
                attendeeEntity.Account = results.Account;
                attendeeEntity.AccountName = results.AccountName || results.Company;
                if (type == "Lead") {
                    attendeeEntity.Company = results.Company;
                    attendeeEntity.LeadFullName = results.$descriptor;
                }
                attendeeEntity.Company = results.Company;
                attendeeEntity.Email = results.Email;
                attendeeEntity.Description = "";
                attendeeEntity.Notes = "";
                if (results.Address) {
                    attendeeEntity.TimeZone = results.Address.TimeZone;
                    if (attendeeEntity.TimeZone) {
                        //attendeeEntity.TimeZone = this._getTimeZoneDisplayName(attendeeEntity.TimeZone);
                    }
                }
                attendeeEntity.PhoneNumber = results.WorkPhone;
                attendeeEntity.RoleName = "";
                attendeeEntity.general = false;

            }
            return attendeeEntity;
        },
       _addAtteendees:function(attendees){
            var service = this.store.service;
            var resourceKind = this.store.resourceKind;
            //if (this.useBatchRequest) {
                var batch = new Sage.SData.Client.SDataBatchRequest(service);
                batch.setResourceKind(resourceKind);
                batch.using(function () {
                    
                    for (var i = 0; i < attendees.length; i++) {
                        var brequest = new Sage.SData.Client.SDataSingleResourceRequest(service);
                        brequest.setResourceKind(resourceKind);
                        brequest.create(attendees[i]);
                    }
                });

                batch.commit({
                    success: lang.hitch(this, this._attendeesAddSuccess),
                    failure: lang.hitch(this, this._attendeesAddFailed)
                });

           // }
       },
       _attendeesAddSuccess: function(result) {
           this.onRefreshView();
       },
       _attendeesAddFailed: function(result) {

       },
       _addLContactAttendees: function(contactIds) {
           var entry;
           var service = this.store.service;
           var request = new Sage.SData.Client.SDataServiceOperationRequest(service)
                 .setResourceKind('activities')
                 .setOperationName('AddContactAttendees');

           entry = {
               "$name": "AddContactAttendees",
               "request": {
                   "ActivityId": this._getActivityId(),
                   "contactIds": contactIds.join()
               }
           };
           request.execute(entry, {
               success: lang.hitch(this, this._attendeesAddSuccess),
              failure: lang.hitch(this, this._attendeesAddFailed)
           });

       },
       _addLeadAttendees: function(leadIds) {
           var entry;
           var service = this.store.service;
           var request = new Sage.SData.Client.SDataServiceOperationRequest(service)
                  .setResourceKind('activities')
                  .setOperationName('AddLeadAttendees');
              
                   entry = {
                   "$name": "AddLeadAttendees",
                   "request": {
                       "ActivityId": this._getActivityId(),
                       "leadIds": leadIds.join()

                   }
               };
               request.execute(entry, {
                   success: lang.hitch(this, this._attendeesAddSuccess),
                   failure: lang.hitch(this, this._attendeesAddFailed)
               });

       },
       _updatePrimaryAttendee: function(attendee, activityId) {
           var service = this.store.service;
           var request = new Sage.SData.Client.SDataServiceOperationRequest(service)
               .setResourceKind('activities')
               .setOperationName('UpdatePrimaryActivityAttendee');
           var entry = {
               "$name": "UpdatePrimaryActivityAttendee",
               "request": {
                   "ActivityId": activityId,
                   "entityId": attendee.EntityId,
                   "isAttendee": attendee.IsAttendee,
                   "roleName": attendee.RoleName
               }
           };
           request.execute(entry, {
               success: function(result) {
                   this.onRefreshView();
               },
               failure: function(ex) {
                   console.log("failed to Update Attendee");
               },
               scope: this
           });
       },
       onIsPrimary: function(action, entryKey, entry) {
           //alert('onIsPrimary ' + entryKey);
           var attendee = {
               EntityId: entry.EntityId,
               IsAttendee: entry.IsAttendee,
               RoleName: entry.RoleName
           };
           this._updatePrimaryAttendee(attendee, this._getActivityId());

       },
       onIsAttendee: function(action, entryKey, entry) {
           alert('onIsAttendee ' + entryKey);
       },
       onItemEdit: function(action, entryKey, entry) {
           alert('Edit ' + entryKey);
       },
       onItemDelete: function(action, entryKey, entry) {
           alert('Delete ' + entryKey);
       },
    });
});

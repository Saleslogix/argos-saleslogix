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
        primaryIndText: 'P',
        attendeeIndText:'A',
        roleText: 'role',

        luContact: null,
        luLead: null,


        id: 'relatedView_activity_attendee',
        icon: 'content/images/icons/Attendees_24.png',
        itemIcon: 'content/images/icons/ContactProfile_48x48.png',
        title: "Attendees",
        detailViewId: 'activity_attendee_detail',
        editViewId: 'activity_attendee_edit',
        listViewId: 'activity_attendee_list',
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
        autoLoad: false,
        pageSize: 20,
        resourceKind: 'activityAttendees',
        select: ['EntityType', 'ModifyDate', 'EntityId', 'IsPrimary', 'IsAttendee', 'RoleName', 'Name', 'AccountName', 'PhoneNumber', 'Email','TimeZone'],
        where:null ,
        sort: 'Name asc',
        osort: 'IsPrimary desc, Name asc',
        relatedItemIconTemplate: new Simplate([
           // '<div class="user-icon">{%: Mobile.SalesLogix.Format.formatUserInitial($.Name) %}</div>'
              '<div class="',
              '{% if (($.IsPrimary)||($.IsAttendee)) { %}',
                'attendee-indicator',
              '{% } %}',
              '" >',
             '{% if ($.EntityType === "Contact") { %}',
                    '<img src="content/images/icons/Contacts_24x24.png" alt="{%= $$.contactText %}" />',
             '{% } else { %}',
                    '<img src="content/images/icons/Leads_24x24.png" alt="{%= $$.leadText %}" />',
             '{% } %}',
             '{% if ($.IsPrimary) { %}',
                '<span>{%= $$.primaryIndText %}</span>',
              '{% } %}',
              '{% if ($.IsAttendee) { %}',
                '<span>{%= $$.attendeeIndText %}</span>',
              '{% } %}',
              '</div>'
        ]),
        relatedItemHeaderTemplate: new Simplate([
            '<h3><strong>{%: $$.getItemDescriptor($) %} </h3>',
            //'<h3>{%: $.EntityType %}  {%: Mobile.SalesLogix.Format.relativeDate($.ModifyDate, false) %}</h4>'
        ]),
        relatedItemDetailTemplate: new Simplate([
               '<div>',
                '<h3>{%: $.RoleName %} </h3>',
                '<h3>{%: Sage.Platform.Mobile.Format.phone($.PhoneNumber) %}</h3>',
                '<h3>{%: $.Email %}</h3>',
              '</div>'
        ]),
        relatedItemFooterTemplate: new Simplate([
           '<br>'
        ]),
        getItemDescriptor: function(entry) {
            if (entry) {
                entry['$descriptor'] =  (entry.Name) ? entry.Name : entry.$descriptor;
                return  entry.$descriptor;
            }
            return '';
        },
        createActionLayout: function() {

            if (!this.actions) {
                this.actions = [];
            }
           this.actions.push({
                id: 'add_contact',
                icon: 'content/images/icons/Add_Contact_Attendee_24.png',
                label: this.addContactText,
                action: 'onAddContact',
                isEnabled: true,
                fn: this.onAddContact.bindDelegate(this)
            });
            this.actions.push({
                id: 'add_lead',
                icon: 'content/images/icons/Add_Lead_Attendee_24.png',
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
                options: function(itemEntry) {
                    var options = {};
                   // options.label = '';
                    if (itemEntry.IsPrimary) {
                        options.cls = 'selected';
                        options.icon = 'content/images/icons/Checked_24.png';
                    } else {
                        options.cls = 'un-selected';
                        options.icon = 'content/images/icons/UnChecked_24.png';
                    }
                    options.cls = 'clear';
                    return  options;
                },
                isEnabled: true,
            });
            this.itemActions.push({
                id: 'isAttendee',
                icon: 'content/images/icons/IsAttendee_24.png',
                label: this.isAttendeeText,
                action: 'onIsAttendee',
                options: function(itemEntry) {
                    var options = {};
                    //options.label = '';
                    if (itemEntry.IsAttendee) {
                        options.cls = 'selected';
                        options.icon = 'content/images/icons/Checked_24.png';
                    } else {
                        options.cls = 'un-selected';
                        options.icon = 'content/images/icons/UnChecked_24.png';
                    }
                    options.cls = 'clear';
                    return options;
                },
                isEnabled: true,
                fn: this.onIsAttendee.bindDelegate(this)
            });
            this.itemActions.push({
                id: 'role',
                icon: 'content/images/icons/Role_24.png',
                label: this.roleText,
                action: 'onAssignRole',
                cls: 'clear',
                isEnabled: true,
                fn: this.onAssignRole.bindDelegate(this)
            });

            return this.itemActions;
        },
        onAddContact: function(evt) {
            var ctor, options;

            if (!this.luContact) {
                ctor = FieldManager.get('lookup'),
                options = lang.mixin({
                    owner: this
                }, {
                    name: 'Contact',
                    property: 'Contact',
                    textProperty: 'Contct',
                    singleSelect: false,
                    view: 'contact_related'
                });
                this.luContact = new ctor(options);
                this.connect(this.luContact, 'onChange', this._processContactLookupResults);
            }

            this.luContact.buttonClick();

        },
        onAddLead: function(evt) {
            var ctor, options;

            if (!this.luLead) {
                ctor = FieldManager.get('lookup'),
                options = lang.mixin({
                    owner: this
                }, {
                    name: 'Lead',
                    property: 'Lead',
                    textProperty: 'Lead',
                    singleSelect: false,
                    view: 'lead_related'

                });
                 this.luLead = new ctor(options);
                this.connect(this.luLead, 'onChange', this._processLeadLookupResults);
            }

            this.luLead.buttonClick();

        },
        onItemEdit: function(action, entryKey, entry) {
            var view = App.getView(this.editViewId);

            if (view) {
                view.show({title:this.getItemDescriptor(entry), key: entryKey });
                //view.show({ title: this.getItemDescriptor(entry), descriptor: this.getItemDescriptor(entry), entry: entry });
                // view.show({ entry: entry });
                //view.show({ key: entryKey });
            }
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

                this._addContactAttendees(contactAttendees);
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
       _addContactAttendees: function(contactIds) {
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
               .setOperationName('updatePrimaryActivityAttendee');
           var entry = {
               "$name": "updatePrimaryActivityAttendee",
               "request": {
                   "ActivityId": activityId,
                   "entityId": attendee.EntityId,
                   "isAttendee": attendee.IsAttendee,
                   "roleName": attendee.RoleName
               }
           };
           request.execute(entry, {
               success: function(result) {
                   this._onRefreshView();
               },
               failure: function(ex) {
                   console.log("failed to Update Attendee");
               },
               scope: this
           });
       },
       onIsPrimary: function(action, entryKey, entry) {
           
           var updateEntry = {
               $key: entry.$key,
               IsPrimary: !entry.IsPrimary
           };
           this.UpdateItem(updateEntry, { onSuccess: this.onSetPrimaryComplete, onFailed: this.onSetPrimaryFailed });
       },
       onSetPrimaryComplete: function(result, entry) {
           this._onRefreshView();
       },
       onSetPrimaryFailed: function(result, entry) {
           console.log("failed setting attendee as primary");
       },
       onIsAttendee: function(action, entryKey, entry) {
           var updateEntry = {
               $key: entry.$key,
               IsAttendee: !entry.IsAttendee
           };
           this.UpdateItem(updateEntry, { onSuccess: this.onSetAttendeeComplete, onFailed: this.onSetAttendeeFailed });
       },
       onSetAttendeeComplete: function(result, entry) {
           this._onRefreshView();
       },
       onSetAttendeeFailed: function(result, entry) {
           console.log("failed setting attendee as an attendee");
       },
       onAssignRole: function(action, entryKey, entry) {
           var ctor;

           if (!this.rolePicklist) {
               ctor = FieldManager.get('picklist'),
                this.rolePicklist = new ctor(lang.mixin({
                    owner: this
                }, {
                    name: 'role',
                    property: 'roleName',
                    picklist: 'Attendee Role',
                    requireSelection: false,
                    title: 'Attendee Role'
                }));
               this.connect(this.rolePicklist, 'onChange', this._processRoleResults);
           }
           this.rolePicklist.currentEntryKey = entryKey;
           this.rolePicklist.buttonClick();

       },
       _processRoleResults: function(values, field) {
           var updateEntry;
           
           updateEntry = {
               $key: this.rolePicklist.currentEntryKey,
               RoleName: values.text
           }
           this.UpdateItem(updateEntry, { onSuccess: this.onUpdateRoleComplete, onFailed: this.onUpdateRoleFailed });

       },
       onUpdateRoleComplete: function(result, entry) {
           this._onRefreshView();
       },
       onUpdateRoleFailed: function(result, entry) {
           console.log("failed updating role");
       },
    });
});

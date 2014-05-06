/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */

/**
 * @class Mobile.SalesLogix.Views.Activity.RelatedView
 *
 * @extends Sage.Platform.Mobile.RelatedViewWidget
 *
 * @requires Sage.Platform.Mobile.Convert
 *
 * @requires Mobile.SalesLogix.Format
 *
 * @requires moment
 */

define('Mobile/SalesLogix/Views/Activity/RelatedView', [
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
    return declare('Mobile.SalesLogix.Views.Activity.RelatedView', [RelatedViewWidget], {

        activitiesText: 'Actvities',

        id: 'relatedView_actvity',
        icon: 'content/images/icons/To_Do_24x24.png',
        itemIcon: 'content/images/icons/To_Do_24x24.png',
        title: "Activities",
        detailViewId: 'activity_detail',
        insertViewId: 'activity_types_list',
        listViewId: 'activity_related',
        listViewWhere: null,
        enabled: true,
        showAdd: true,
        resourceKind: 'activities',
        contractName: 'system',
        include: ['Leader'],
        select: [
            'Description',
            'StartDate',
            'Type',
            'AccountId',
            'AccountName',
            'ConatactId',
            'ContactName',
            'PhoneNumber',
            'LeadId',
            'LeadName',
            'TicketId',
            'OpportunityId',
            'Leader',
            'UserId',
            'Timeless',
            'Alarm',
            'Priority',
            'ModifyDate',
            'RecurrenceState',
            'Recurring'
        ],
        where:null ,
        sort: 'StartDate Desc',
        relatedItemIconTemplate: new Simplate([
          //'<div class="user-icon">{%: Mobile.SalesLogix.Format.formatUserInitial($.Leader.$descriptor) %}</div>',
          '<img src="{%= $$.getActivityIcon($) %}" />'
          
        ]),
        relatedItemHeaderTemplate: new Simplate([
            '<h3><strong>{%: $$.getItemDescriptor($) %} </h3>',
        ]),
       relatedItemDetailTemplate: new Simplate([
            '<h3>{%: Mobile.SalesLogix.Format.relativeDate($.StartDate, Sage.Platform.Mobile.Convert.toBoolean($.Timeless)) %}</h3>',
            //'<h3>{%: $.Leader.$descriptor  %}</h3>',
       ]),
       activityIconByType: {
           'atToDo': 'content/images/icons/To_Do_24x24.png',
           'atPhoneCall': 'content/images/icons/Call_24x24.png',
           'atAppointment': 'content/images/icons/Meeting_24x24.png',
           'atLiterature': 'content/images/icons/Schedule_Literature_Request_24x24.gif',
           'atPersonal': 'content/images/icons/Personal_24x24.png',
           'atQuestion': 'content/images/icons/help_24.png',
           'atNote': 'content/images/icons/note_24.png',
           'atEMail': 'content/images/icons/letters_24.png'
       },
       nameTemplate: new Simplate([
         '{% if ($.ContactName) { %}',
         '{%: $.ContactName %} | {%: $.AccountName %}',
         '{% } else if ($.AccountName) { %}',
         '{%: $.AccountName %}',
         '{% } else { %}',
         '{%: $.LeadName %}',
         '{% } %}'
       ]),
       getActivityIcon: function(entry){
           var icon;
           icon = this.activityIconByType[entry.Type] ? this.activityIconByType[entry.Type] : 'content/images/icons/To_Do_24x24.png';
           return icon;
       },
        getItemDescriptor: function(entry) {
            if (entry) {
                entry['$descriptor'] = (entry.description) ? entry.description : entry.$descriptor;
                return  entry.$descriptor;
            }
            return '';
        }
    });
});

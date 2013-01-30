define('Mobile/SalesLogix/Views/Activity/MyList', [
    'dojo/_base/declare',
    'dojo/string',
    'Sage/Platform/Mobile/List',
    'Mobile/SalesLogix/Format',
    'Mobile/SalesLogix/Views/Activity/List',
    'Sage/Platform/Mobile/Convert'
], function(
    declare,
    string,
    List,
    format,
    ActivityList,
    convert
) {

    return declare('Mobile.SalesLogix.Views.Activity.MyList', [ActivityList], {

        //Templates
        rowTemplate: new Simplate([
            '<li data-action="activateEntry" data-key="{%= $.Activity.$key %}" data-descriptor="{%: $.Activity.$descriptor %}" data-activity-type="{%: $.Activity.Type %}">',
                '<div class="list-item-static-selector">',
                    '<img src="{%= $$.activityIconByType[$.Activity.Type] || $$.icon || $$.selectIcon %}" class="icon" />',
                '</div>',
                '<div class="list-item-content">{%! $$.itemTemplate %}</div>',
            '</li>'
        ]),
        activityTimeTemplate: new Simplate([
            '{% if ($.Activity.Timeless) { %}',
            '<span class="p-meridiem">{%: $$.allDayText %}</span>',
            '{% } else { %}',
            '<span class="p-time">{%: Mobile.SalesLogix.Format.date($.Activity.StartDate, $$.startTimeFormatText) %}</span>',
            '<span class="p-meridiem">&nbsp;{%: Mobile.SalesLogix.Format.date($.Activity.StartDate, "tt") %}</span>,',
            '{% } %}'
        ]),
        itemTemplate: new Simplate([
            '<h3>',
            '{%! $$.activityTimeTemplate %}',
            '<span class="p-description">&nbsp;{%: $.Activity.Description %}</span>',
            '</h3>',
            '<h4>{%: Mobile.SalesLogix.Format.date($.Activity.StartDate, $$.startDateFormatText, Sage.Platform.Mobile.Convert.toBoolean($.Activity.Timeless)) %} - {%! $$.nameTemplate %}</h4>'
        ]),
        nameTemplate: new Simplate([
            '{% if ($.Activity.ContactName) { %}',
            '{%: $.Activity.ContactName %} / {%: $.Activity.AccountName %}',
            '{% } else if ($.Activity.AccountName) { %}',
            '{%: $.Activity.AccountName %}',
            '{% } else { %}',
            '{%: $.Activity.LeadName %}',
            '{% } %}'
        ]),

        //Localization
        titleText: 'My Activities',      

        //View Properties
        id: 'myactivity_list',

        queryWhere: function() {
            return string.substitute('User.Id eq "${0}" and Status ne "asDeclned" and Activity.Type ne "atLiterature"', [App.context['user'].$key]);
        },
        queryOrderBy: 'Activity.Timeless desc, Activity.StartDate desc',
        querySelect: [
            'Alarm',
            'AlarmTime',
            'Status',
            'Activity/Description',
            'Activity/StartDate',
            'Activity/Type',
            'Activity/AccountName',
            'Activity/ContactName',
            'Activity/LeadId',
            'Activity/LeadName',
            'Activity/UserId',
            'Activity/Timeless'
        ],
        resourceKind: 'userActivities',
                
        formatSearchQuery: function(searchQuery) {
            return string.substitute('upper(Activity.Description) like "%${0}%"', [this.escapeSearchQuery(searchQuery.toUpperCase())]);
        }
    });
});

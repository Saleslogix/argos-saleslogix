define('Mobile/SalesLogix/Views/Activity/MyList', [
    'dojo/_base/declare',
    'dojo/string',
    'dojo/query',
    'Sage/Platform/Mobile/List',
    'Mobile/SalesLogix/Format',
    'Mobile/SalesLogix/Views/Activity/List',
    'Sage/Platform/Mobile/Convert',
    'Mobile/SalesLogix/Recurrence'
], function(
    declare,
    string,
    query,
    List,
    format,
    ActivityList,
    convert,
    recur
) {

    return declare('Mobile.SalesLogix.Views.Activity.MyList', [ActivityList], {

        //Templates
        rowTemplate: new Simplate([
            '<li data-action="activateEntry" data-my-activity-key="{%= $.$key %}" data-key="{%= $.Activity.$key %}" data-descriptor="{%: $.Activity.$descriptor %}" data-activity-type="{%: $.Activity.Type %}">',
                '<div data-action="selectEntry" class="list-item-static-selector">',
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
        completeActivityText: 'Complete',
        completeView: 'activity_complete',

        //View Properties
        id: 'myactivity_list',

        queryWhere: function() {
            return string.substitute('User.Id eq "${0}" and Status ne "asDeclned" and Activity.Type ne "atLiterature"', [App.context['user'].$key]);
        },
        queryOrderBy: 'Activity.StartDate desc',
        querySelect: [
            'Alarm',
            'AlarmTime',
            'Status',
            'Activity/Description',
            'Activity/StartDate',
            'Activity/Type',
            'Activity/AccountName',
            'Activity/ContactName',
            'Activity/Leader',
            'Activity/LeadName',
            'Activity/UserId',
            'Activity/Timeless'
        ],
        resourceKind: 'userActivities',
        allowSelection: true,
        enableActions: true,

        isActivityRecurring: function(entry) {
            return entry && (entry['Activity']['Recurring'] || entry['Activity']['RecurrenceState'] == 'rstOccurrence');
        },
        createActionLayout: function() {
            return this.actions || (this.actions = [{
                    id: 'complete',
                    icon: 'content/images/icons/Clear_Activity_24x24.png',
                    label: this.completeActivityText,
                    enabled: function(action, selection) {
                        var entry = selection && selection.data;
                        if (!entry) {
                            return false;
                        }

                        return entry.Activity['Leader']['$key'] === App.context['user']['$key'] && !this.isActivityRecurring(entry);
                    },
                    fn: (function(action, selection) {
                        var view, entry, options;

                        view = App.getView(this.completeView);
                        entry = selection && selection.data;

                        if (view) {
                            this.refreshRequired = true;

                            options = {
                                title: 'Complete',
                                template: {}
                            };

                            options.entry = entry.Activity; 

                            view.show(options, {});

                        }
                    }).bindDelegate(this)
                }]
            );
        },
        selectEntry: function(params, evt, node) {
            /* Override selectEntry from the base List mixin.
             * Grabbing a different key here, since we use entry.Activity.$key as the main data-key.
             * TODO: Make [data-key] overrideable in the base class.
             */
            var row = query(node).closest('[data-my-activity-key]')[0],
                key = row ? row.getAttribute('data-my-activity-key') : false;

            if (this._selectionModel && key) {
                this._selectionModel.toggle(key, this.entries[key], row);
            }

            if (this.options.singleSelect && this.options.singleSelectAction && !this.enableActions) {
                this.invokeSingleSelectAction();
            }
        },
        formatSearchQuery: function(searchQuery) {
            return string.substitute('upper(Activity.Description) like "%${0}%"', [this.escapeSearchQuery(searchQuery.toUpperCase())]);
        }
    });
});

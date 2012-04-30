define('Mobile/SalesLogix/Views/History/List', [
    'dojo/_base/declare',
    'dojo/_base/array',
    'dojo/string',
    'dojo/dom-style',
    'dojo/dom-geometry',
    'dojo/query',
    'Mobile/SalesLogix/Format',
    'Sage/Platform/Mobile/Convert',
    'Sage/Platform/Mobile/List'
], function(
    declare,
    array,
    string,
    domStyle,
    domGeom,
    query,
    format,
    convert,
    List
) {

    return declare('Mobile.SalesLogix.Views.History.List', [List], {
        //Templates
        rowTemplate: new Simplate([
            '<li data-action="activateEntry" data-key="{%= $.$key %}" data-descriptor="{%: $.$descriptor %}" data-activity-type="{%: $.Type %}" data-entity-name="{%: $$.resolveEntityName($) %}">',
            '<div data-action="selectEntry" class="list-item-selector"></div>',
            '{%! $$.itemTemplate %}',
            '</li>'
        ]),
        itemTemplate: new Simplate([
            '<h3>',
            '{% if ($.Type === "atNote") { %}',
            '<span class="p-time">{%: $$.formatDate($.ModifyDate) %}</span>',
            '<span class="p-meridiem">&nbsp;{%: $$.formatMeridiem($.ModifyDate) %}</span>',
            '{% } else { %}',
            '<span class="p-time">{%: $$.formatDate($.CompletedDate) %}</span>',
            '<span class="p-meridiem">&nbsp;{%: $$.formatMeridiem($.CompletedDate) %}</span>',
            '{% } %}',
            '<span class="p-description">&nbsp;{%= $$.nameTemplate.apply($) %}</span>',
            '</h3>',
            '<h4>{%: $.Description %}</h4>',
            '<div class="note-text-item">',
                '<div class="note-text-wrap">',
                    '{%: $.Notes %}',
                '</div>',
                '<div class="note-text-more"></div>',
            '</div>'
        ]),
        nameTemplate: new Simplate([
            '{% if ($.LeadName && $.AccountName) { %}',
            '{%: $.LeadName %} / {%: $.AccountName %}',
            '{% } else if ($.LeadName) { %}',
            '{%: $.LeadName %}',
            '{% } else if ($.ContactName && $.AccountName) { %}',
            '{%: $.ContactName %} / {%: $.AccountName %}',
            '{% } else if ($.ContactName) { %}',
            '{%: $.ContactName %}',
            '{% } else { %}',
            '{%: $.AccountName %}',
            '{% } %}'
        ]),
 
        //Localization
        activityTypeText: {
            'atToDo': 'To-Do',
            'atPhoneCall': 'Phone Call',
            'atAppointment': 'Meeting',
            'atLiterature': 'Literature Request',
            'atPersonal': 'Personal Activity',
            'atQuestion': 'Question',
            'atEMail': 'E-mail'
        },
		hourMinuteFormatText: "h:mm",
		dateFormatText: "M/D/YY",
        hashTagQueriesText: {
          'note': 'note',
          'phonecall': 'phonecall',
          'meeting': 'meeting',
          'personal': 'personal',
          'email': 'email'
        },
        titleText: 'Notes/History',
        
        //View Properties
        detailView: 'history_detail',
        icon: 'content/images/icons/journal_24.png',
        id: 'history_list',
        security: null, //'Entities/History/View',
        existsRE: /^[\w]{12}$/,
        insertView: 'history_edit',
        queryOrderBy: 'CompletedDate desc',
        querySelect: [
            'AccountName',
            'ContactName',
            'LeadName',
            'CompletedDate',
            'Description',
            'StartDate',
            'TimeLess',
            'Type',
            'LeadId',
            'OpportunityId',
            'AccountId',
            'ContactId',
            'ModifyDate',
            'Notes'
        ],
        queryWhere: 'Type ne "atDatabaseChange"',
        resourceKind: 'history',
        hashTagQueries: {
            'note': 'Type eq "atNote"',
            'phonecall': 'Type eq "atPhoneCall"',
            'meeting': 'Type eq "atAppointment"',
            'personal': 'Type eq "atPersonal"',
            'email': 'Type eq "atEMail"'
        },

        resolveEntityName: function(entry) {
            var exists = this.existsRE;

            if (entry)
            {
                if (exists.test(entry['LeadId'])) return 'Lead';
                if (exists.test(entry['OpportunityId'])) return 'Opportunity';
                if (exists.test(entry['ContactId'])) return 'Contact';
                if (exists.test(entry['AccountId'])) return 'Account';
            }
        },
        formatDate: function(date) {
            var startDate = moment(convert.toDateFromString(date)),
                nextDate = startDate.clone().add({hours: 24}),
                fmt = this.dateFormatText;

            if (startDate.valueOf() < nextDate.valueOf() && startDate.valueOf() > moment().sod().valueOf())
                fmt = this.hourMinuteFormatText;

            return format.date(startDate.toDate(), fmt);
        },
        formatMeridiem: function(date) {
            var startDate = moment(convert.toDateFromString(date)),
                nextDate = startDate.clone().add({hours: 24});

            if (startDate.valueOf() < nextDate.valueOf() && startDate.valueOf() > moment().sod().valueOf())
                return format.date(startDate.toDate(), 'A');

            return '';
        },
        formatSearchQuery: function(searchQuery) {
            return string.substitute('upper(Description) like "%${0}%"', [this.escapeSearchQuery(searchQuery.toUpperCase())]);
        },
        _onResize: function() {
            query('.note-text-item', this.contentNode).forEach(function(node){
                var wrapNode = query('.note-text-wrap', node)[0],
                    moreNode = query('.note-text-more', node)[0];
                if (domGeom.getMarginBox(node).h < domGeom.getMarginBox(wrapNode).h)
                    domStyle.set(moreNode, 'visibility', 'visible');
                else
                    domStyle.set(moreNode, 'visibility', 'hidden');
            });
        },
        processFeed: function() {
            this.inherited(arguments);
            this._onResize();
        },
        postCreate: function() {
            this.inherited(arguments);
            this.subscribe('/app/resize', this._onResize);
        }
    });
});

define('Mobile/SalesLogix/Views/History/List', [
    'dojo/_base/declare',
    'dojo/_base/array',
    'dojo/string',
    'dojo/dom-style',
    'dojo/dom-geometry',
    'dojo/query',
    'Mobile/SalesLogix/Format',
    'Sage/Platform/Mobile/Convert',
    'Mobile/SalesLogix/Action',
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
    action,
    List
) {

    return declare('Mobile.SalesLogix.Views.History.List', [List], {
        //Templates
        rowTemplate: new Simplate([
            '<li data-action="activateEntry" data-key="{%= $.$key %}" data-descriptor="{%: $.$descriptor %}">',
                '<button data-action="selectEntry" class="list-item-selector button">',
                    '<img src="{%= $$.entityIconByType[$.Type] || $$.icon || $$.selectIcon %}" class="icon" />',
                '</button>',
                '<div class="list-item-content">{%! $$.itemTemplate %}</div>',
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
		dateFormatText: "M/d/yy",
        hashTagQueriesText: {
          'note': 'note',
          'phonecall': 'phonecall',
          'meeting': 'meeting',
          'personal': 'personal',
          'email': 'email'
        },
        titleText: 'Notes/History',
        viewAccountActionText: 'Account',
        viewOpportunityActionText: 'Opp.',
        viewContactActionText: 'Contact',

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
            'OpportunityName',
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
        entityIconByType: {
            'atToDo': 'content/images/icons/To_Do_24x24.png',
            'atPhoneCall': 'content/images/icons/Call_24x24.png',
            'atAppointment': 'content/images/icons/Meeting_24x24.png',
            'atLiterature': 'content/images/icons/Schedule_Literature_Request_24x24.gif',
            'atPersonal': 'content/images/icons/Personal_24x24.png',
            'atQuestion': 'content/images/icons/help_24.png',
            'atNote': 'content/images/icons/note_24.png',
            'atEMail': 'content/images/icons/letters_24.png'
        },

        allowSelection: true,
        enableActions: true,

        createActionLayout: function() {
            return this.actions || (this.actions = [{
                    id: 'viewAccount',
                    icon: 'content/images/icons/Company_24.png',
                    label: this.viewAccountActionText,
                    enabled: action.hasProperty.bindDelegate(this, 'AccountId'),
                    fn: action.navigateToEntity.bindDelegate(this, {
                        view: 'account_detail',
                        keyProperty: 'AccountId',
                        textProperty: 'AccountName'
                    })
                },{
                    id: 'viewOpportunity',
                    icon: 'content/images/icons/opportunity_24.png',
                    label: this.viewOpportunityActionText,
                    enabled: action.hasProperty.bindDelegate(this, 'OpportunityId'),
                    fn: action.navigateToEntity.bindDelegate(this, {
                        view: 'opportunity_detail',
                        keyProperty: 'OpportunityId',
                        textProperty: 'OpportunityName'
                    })
                },{
                    id: 'viewContact',
                    icon: 'content/images/icons/Contacts_24x24.png',
                    label: this.viewContactActionText,
                    action: 'navigateToContactOrLead',
                    enabled: this.hasContactOrLead
                }]
            );
        },
        hasContactOrLead: function(action, selection) {
            return (selection.data['ContactId']) || (selection.data['LeadId']);
        },
        navigateToContactOrLead: function(action, selection) {
            var entity = this.resolveEntityName(selection.data),
                viewId,
                options;

            switch(entity)
            {
                case 'Contact':
                    viewId = 'contact_detail';
                    options = {
                        key: selection.data['ContactId'],
                        descriptor: selection.data['ContactName']
                    };
                    break;

                case 'Lead':
                    viewId = 'lead_detail';
                    options = {
                        key: selection.data['LeadId'],
                        descriptor: selection.data['LeadName']
                    };
                    break;
            }

            var view = App.getView(viewId);

            if (view && options)
                view.show(options);
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
            if (convert.toDateFromString(date).between(Date.today(), Date.today().add({hours:24})))
                return format.date(date, this.hourMinuteFormatText);

            return format.date(date, this.dateFormatText);
        },
        formatMeridiem: function(date) {
            if (convert.toDateFromString(date).between(Date.today(), Date.today().add({hours:24})))
                return format.date(date, "tt");

            return "";
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

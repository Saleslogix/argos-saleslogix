define('Mobile/SalesLogix/QuickNav', [
    'dojo/_base/declare',
    'dojo/_base/array',
    'dojo/_base/lang',
    'dojo/_base/window',
    'dojo/dom-attr',
    'dojo/dom-construct',
    'dojo/dom-class',
    'dojo/topic',
    'dojox/mobile/FixedSplitterPane',
    'Sage/Platform/Mobile/_UiComponent',
    'Sage/Platform/Mobile/_EventMapMixin',
    'Sage/Platform/Mobile/ScrollContainer',
    'argos!scene',
    'argos!customizations'
], function(
    declare,
    array,
    lang,
    win,
    domAttr,
    domConstruct,
    domClass,
    topic,
    FixedSplitterPane,
    _UiComponent,
    _EventMapMixin,
    ScrollContainer,
    scene,
    customizations
) {
    return declare('Mobile.SalesLogix.QuickNav', [FixedSplitterPane, _EventMapMixin, _UiComponent], {
        events: {
            'click': true
        },
        baseClass: 'quick-nav',
        components: [
            {name: 'back', content: Simplate.make([
                '<div class="quick-nav-fixed" data-action="navigateBack">',
                '<button class="button"><div></div></button>',
                '<span>{%: $.backText %}</span>',
                '</div>'
            ])},
            {name: 'home', content: Simplate.make([
                '<div class="quick-nav-fixed" data-action="navigateToView" data-view="home">',
                '<button class="button"><div></div></button>',
                '<span>{%: $.homeText %}</span>',
                '</div>'
            ])},
            {name: 'scroller', type: ScrollContainer, subscribeEvent: 'onContentChange:onContentChange', components: [
                {name: 'scroll', tag: 'div', components: [
                    {name: 'content', tag: 'ul', attrs: {'class': 'quick-nav-content'}, attachPoint: 'contentNode'}
                ]}
            ]},
            {name: 'expand', content: '<button class="button quick-nav-toggle" data-action="toggle"><div></div></button>'}
        ],

        id: 'quick_nav',
        rowTemplate: new Simplate([
            '<li class="quick-nav-item" data-action="navigateToView" data-view="{%= $.view %}">',
            '{%! $$.itemTemplate %}',
            '</li>'
        ]),
        itemTemplate: new Simplate([
            '<button class="button"><div></div></button>',
            '<span>{%: $.title %}</span>'
        ]),

        _expanded: false,
        expanded: false,

        backText: 'Back',
        homeText: 'Home',
        accountsText: 'Accounts',
        contactsText: 'Contacts',
        leadsText: 'Leads',
        opportunitiesText: 'Opportunities',
        ticketsText: 'Tickets',
        calendarText: 'Calendar',
        historyText: 'History',

        _setExpandedAttr: function(value) {
            this._expanded = value;

            domClass.toggle(win.body(), 'has-expanded-navigation', value);
        },
        _getExpandedAttr: function() {
            return this._expanded;
        },
        onStartup: function() {
            this.inherited(arguments);

            this.createNavigation();
        },
        onContentChange: function() {
        },
        navigateBack: function() {
            scene().back();
        },
        navigateToView: function(evt, node) {
            var view = node && domAttr.get(node, 'data-view');
            if (view)
            {
                scene().showView(view);

                this.set('expanded', false);
            }
        },
        createLayout: function() {
            return this.layout || (this.layout = [{
                'name': 'account_list',
                'view': 'account_list',
                'action': 'navigateToView',
                'icon': 'content/images/icons/Company_24.png',
                'title': this.accountsText,
                'security': 'Entities/Account/View'
            },{
                'name': 'contact_list',
                'view': 'contact_list',
                'action': 'navigateToView',
                'icon': 'content/images/icons/Contacts_24x24.png',
                'title': this.contactsText,
                'security': 'Entities/Contact/View'
            },{
                'name': 'lead_list',
                'view': 'lead_list',
                'action': 'navigateToView',
                'icon': 'content/images/icons/Leads_24x24.png',
                'title': this.leadsText,
                'security': 'Entities/Lead/View'
            },{
                'name': 'opportunity_list',
                'view': 'opportunity_list',
                'action': 'navigateToView',
                'icon': 'content/images/icons/opportunity_24.png',
                'title': this.opportunitiesText,
                'security': 'Entities/Opportunity/View'
            }/*,{
                'name': 'calendar_daylist',
                'view': 'calendar_daylist',
                'action': 'navigateToView',
                'icon': 'content/images/icons/Calendar_24x24.png',
                'title': this.calendarText,
                'security': null
            }*/]);
        },
        createNavigation: function() {
            var layout = customizations().apply(customizations().toPath(this.customizationSet, 'navigation', this.id), this.createLayout()),
                output = [];

            array.forEach(layout, function(row) {
                output.push(this.rowTemplate.apply(row, this));
            }, this);

            domConstruct.place(output.join(''), this.contentNode, 'only');

            this.onContentChange();
        },
        toggle: function() {
            this.set('expanded', !this.get('expanded'));
        }
    });
});
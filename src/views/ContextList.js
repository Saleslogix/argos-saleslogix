/// <reference path="../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../argos-sdk/src/Detail.js"/>

Ext.namespace("Mobile.SalesLogix");

Mobile.SalesLogix.ContextList = Ext.extend(Sage.Platform.Mobile.List, {
    cancelText: 'Cancel',
    activitiesText: 'Activities',
    atToDoText: 'To-Do',
    atPhoneCallText: 'Phone Call',
    atAppointmentText: 'Meeting',
    atLiteratureText: 'Literature Request',
    atPersonalText: 'Personal Activity',
    notesText: 'Notes',
    detailView: '',
    relatedKey: '',
    relatedDescriptor: '',
    hideSearch: true,
    itemTemplate: new Simplate([
        '<li data-action="activateEntry" data-key="{%= $.$key %}" ',
            'data-descriptor="{%: $.$descriptor %}" data-where="{%= $.where %}"',
            'data-view="{%= $.view %}">',
        '<div data-action="selectEntry" class="list-item-selector"></div>',
        '<h3>{%: $.title %}</h3>',
        '</li>'
    ]),
    id: 'context_list',
    contextItems: false,
    expose: false,
    titleText: 'Actions',        
    activateEntry: function(params) {
        var o = {
            'key': this.relatedKey
        };
        if (params.where) o.where = String.format(params.where, this.relatedKey);

        this.navigateToRelatedView(params.view, o, this.relatedDescriptor);
    },
    hasMoreData: function() {
        return false;
    },
    requestData: function() {
        var list = [],
            item;

        for (var i = 0; i < this.contextItems.length; i++)
        {
            item = this.contextItems[i];
            item.title = item.descriptor = this[(item['$key']+'Text')] || item['$key'];

            list.push(item);
        }

        this.processFeed({'$resources': list});
    },
    init: function() {
        Mobile.SalesLogix.ContextList.superclass.init.apply(this, arguments);        

        this.tools.tbar = [];
    },
    show: function(options) {
        Mobile.SalesLogix.ContextList.superclass.show.call(this, options);
        this.contextItems = options.contextItems || [];
        this.detailView = options.detailView;
        this.relatedKey = options.key;
        this.relatedDescriptor = options.descriptor;
    },
    navigateToRelatedView: function(view, o, descriptor) {
        if (typeof o === 'string')
            var context = {
                key: o,
                descriptor: descriptor
            };
        else
        {
            var context = o;

            if (descriptor) context['descriptor'] = descriptor;
        }

        if (context)
        {
            var v = App.getView(view);
            if (v)
                v.show(context);
        }
    }
});
/// <reference path="../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../argos-sdk/src/Detail.js"/>

Ext.namespace("Mobile.SalesLogix");

Mobile.SalesLogix.ContextDialog = Ext.extend(Sage.Platform.Mobile.View, {
    //Templates
    viewTemplate: new Simplate([
        '<div id="{%= id %}" class="dialog">',
            '<fieldset>',
                '<ul class="list-content"></ul>',
            '</fieldset>',
        '</div>'
    ]),
    itemTemplate: new Simplate([
        '<li data-action="activateItem" data-view="{%= $.view %}" data-context="{%: $.context %}" data-descriptor="{%: $.descriptor %}" href="#">',
        '<a href="#" class="button taskButton">{%= $.label || $.value %}</a>',
        '</li>'
    ]),
    cancelButtonTemplate: new Simplate([
        '<li>',
        '<a href="#" type="cancel" class="button cancelButton">{%: $.cancelText %}</a>',
        '</li>'
    ]),

    //Localization
    activitiesText: 'Activities',
    addAccountContactText: 'Add Account/Contact',
    cancelText: 'Cancel',
    notesText: 'Notes',
    scheduleText: 'Schedule',

    //View Properties
    attachmentPoints: {
        contentEl: '.list-content'
    },
    contextMenu: [],
    detailView: false,
    expose: false,
    id: 'context_dialog',
    parentViewId: false,
    relatedKey: false,
    relatedEntry: false,

    activateItem: function(params) {
        if (params.context)
        {
            if (params.view) this.navigateToView(params.view, Ext.decode(params.context), params.descriptor);
        }
    },  
    navigateToView: function(view, context, descriptor) {
        if (context)
        {
            if (descriptor) context['descriptor'] = descriptor;

            var instance = App.getView(view);
            if (instance)
                instance.show(Ext.apply(context, {
                    returnTo: this.options && this.options.returnTo,
                    source: {
                        id: this.options && this.options.returnTo,
                        entry: this.options && this.options.entry,
                        resourceKind: this.options && this.options.resourceKind,
                        descriptor: this.options && this.options.descriptor,
                        key: this.options && this.options.key
                    }
                }));
        }
    },   
    expandExpression: function(expression) {
        /// <summary>
        ///     Expands the passed expression if it is a function.
        /// </summary>
        /// <param name="expression" type="String">
        ///     1: function - Called on this object and must return a string.
        ///     2: string - Returned directly.
        /// </param>
        if (typeof expression === 'function')
            return expression.apply(this, Array.prototype.slice.call(arguments, 1));
        else
            return expression;
    },
    processItems: function(items, layoutOptions, entry)
    {        
        var content = [];

        for (var i = 0; i < items.length; i++)
        {
            var current = items[i];

            var provider = current['provider'] || Sage.Platform.Mobile.Utility.getValue;
            var value = provider(entry, current['name']);

            if (current['tpl'])
            {
                var rendered = current['tpl'].apply(value);
                var formatted = current['encode'] === true
                    ? Sage.Platform.Mobile.Format.encode(rendered)
                    : rendered;
            }
            else if (current['renderer'] && typeof current['renderer'] === 'function')
            {
                var rendered = current['renderer'].call(this, value);
                var formatted = current['encode'] === true
                    ? Sage.Platform.Mobile.Format.encode(rendered)
                    : rendered;
            }
            else
            {
                var formatted = current['encode'] !== false
                    ? Sage.Platform.Mobile.Format.encode(value)
                    : value;
            }

            var options = {
                cls: current['cls'],
                icon: current['icon'],
                name: current['name'],
                label: current['label'],
                entry: entry,
                value: formatted,
                raw: value
            };

            if (current['descriptor'])
                options['descriptor'] = typeof current['descriptor'] === 'function'
                    ? this.expandExpression(current['descriptor'], entry)
                    : provider(entry, current['descriptor']);

            if (current['view'])
            {
                var context = {};
                if (current['key'])
                    context['key'] = typeof current['key'] === 'function'
                    ? this.expandExpression(current['key'], entry)
                    : provider(entry, current['key']);
                if (current['where'])
                    context['where'] = this.expandExpression(current['where'], entry);
                if (current['resourceKind'])
                    context['resourceKind'] = this.expandExpression(current['resourceKind'], entry);
                if (current['resourceProperty'])
                    context['resourceProperty'] = this.expandExpression(current['resourceProperty'], entry);
                if (current['resourcePredicate'])
                    context['resourcePredicate'] = this.expandExpression(current['resourcePredicate'], entry);
                if (current['insert'] === true)
                    context['insert'] = true;

                options['view'] = current['view'];
                options['context'] = Ext.util.JSON.encode(context);
            }

            var template = current['wrap']
                ? current['wrap']
                : this.itemTemplate;

            content.push(template.apply(options));
        }

        content.push(this.cancelButtonTemplate.apply(this));

        this.contentEl.update(content.join(''));
    },    
    refresh: function() {
        var items = (this.options && this.options.items) || [],
            entry = (this.options && this.options.entry);

        this.processItems(items, {}, entry);
    },
    //FIXME: Temporary fix for toolbar button getting hidden on context dialog.
    //This must be fixed from ReUI. On ContextDialog Show, we clear out all toolbar buttons.
    //But when we cancel the dialog, we don't restore them. ReUI simply hides the dialog box.
    show: function(options) {
        Mobile.SalesLogix.ContextDialog.superclass.show.apply(this, arguments);

        var mainView = false;
        if (options.returnTo) mainView = App.getView(options.returnTo);

        if (mainView.tools)
        {
            App.bars.tbar.display(mainView.tools.tbar);
        }
    }
});
/// <reference path="../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../argos-sdk/src/Detail.js"/>

Ext.namespace("Mobile.SalesLogix");

(function() {
    Mobile.SalesLogix.Configure = Ext.extend(Sage.Platform.Mobile.List, {
        //Templates
        emptyTemplate: new Simplate(['']),      
        contentTemplate: new Simplate([
            '<h3>',
            '{% if ($.icon) { %}',
            '<img src="{%: $.icon %}" alt="icon" class="icon" />',
            '{% } %}',
            '<span>{%: $.$descriptor %}</span>',
            '<span data-action="moveUp"></span>',
            '<span data-action="moveDown"></span>',
            '</h3>'
        ]),

        //Localization
        titleText: 'Configure',
        savePrefs: 'Save',

        //View Properties
        id: 'configure',
        expose: false,
        hideSearch: true,
        selectionOnly: true,
        allowSelection: true,
        autoClearSelection: false,
      
        init: function() {
            Mobile.SalesLogix.Configure.superclass.init.apply(this, arguments);
          
            this.tools.tbar =  [{                
                id: 'save',
                fn: this.savePreferences,
                scope: this
            },{
                id: 'cancel',
                side: 'left',
                fn: ReUI.back,
                scope: ReUI
            }];
        },        
        savePreferences: function() {
            App.preferences.home = App.preferences.home || {};
            App.preferences.configure = App.preferences.configure || {};

            // clear existing
            var visible = App.preferences.home.visible = [];
            var order = App.preferences.configure.order = [];

            // since the selection model does not have ordering, use the DOM
            this.el.select('li').each(function(el, c, i) {
                var key = el.getAttribute('data-key');
                if (key)
                {
                    order.push(key);

                    if (el.is('.list-item-selected')) visible.push(key);
                }               
            });
         
            App.persistPreferences();
            
            ReUI.back();
        },
        moveUp: function(params) {
            var row = params.$source.parent('li');
            if (row)
                row.insertBefore(row.prev('li', true));
        },
        moveDown: function(params) {
            var row = params.$source.parent('li');
            if (row)
                row.insertAfter(row.next('li', true));
        },
        hasMoreData: function() {
            return false;
        },
        requestData: function() {
            var list = [],
                lookup = {},
                exposed = App.getExposedViews(),
                order = (App.preferences.configure && App.preferences.configure.order) || [],
                view, i, n;

            for (i = 0; i < exposed.length; i++)
                lookup[exposed[i]] = true;

            for (i = 0; i < order.length; i++)
                if (lookup[order[i]])
                    delete lookup[order[i]];

            for (n in lookup)
                order.push(n);

            for (i = 0; i < order.length; i++)
            {
                view = App.getView(order[i]);

                if (view)
                {
                    list.push({
                        '$key': view.id,
                        '$descriptor': view.titleText,
                        'icon': view.icon
                    });
                }
                else
                    order.splice(i, 1);
            }

            this.processFeed({'$resources': list});           
        },
        processFeed: function(feed) {
            Mobile.SalesLogix.Configure.superclass.processFeed.apply(this, arguments);

            var visible = (App.preferences.home && App.preferences.home.visible) || [],
                row, i;            

            for (i = 0; i < visible.length; i++)
            {
                row = this.el.child(String.format('[data-key="{0}"]', visible[i]));

                if (row) this.selectionModel.toggle(visible[i], this.entries[visible[i]], row);
            }    
        }
    });
})();
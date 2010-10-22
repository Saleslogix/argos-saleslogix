/// <reference path="../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../argos-sdk/src/Detail.js"/>

Ext.namespace("Mobile.SalesLogix");

(function() {
    /// this is a simple configure screen for Home View.
    Mobile.SalesLogix.Configure = Ext.extend(Sage.Platform.Mobile.List, {
        //Templates
        emptyTemplate: new Simplate(['']),
        itemTemplate: new Simplate([
            '<li>',
            '{%! $$.contentTemplate %}',
            '</li>'
        ]),
        contentTemplate: new Simplate([
            '<input type="checkbox" value="{%= $.id %}" class="list-selector" />',
            '<span class="moveup"></span>',
            '<span class="movedown"></span>',
            '<span class="resource">',
            '{% if ($.icon) { %}',
            '<img src="{%= $.icon %}" alt="icon" class="icon" />',
            '{% } %}',
            '{%= $.titleText %}',
            '</span>'
        ]),

        //Localization
        titleText: 'Configure',
        savePrefs: 'Save',

        constructor: function(o) {
            Mobile.SalesLogix.Configure.superclass.constructor.call(this);

            Ext.apply(this, o, {
                expose: false,
                id: 'configure',
                selected: false,
                title: this.titleText
            });
        },
        init: function() {
            Mobile.SalesLogix.Configure.superclass.init.call(this);

            this.el
                .on('click', function(evt, el, o) {
                    var Li;
                    el = Ext.get(el);

                    if (el.is('.moveup'))
                    {
                        evt.stopEvent();
                        Li = el.parent('li');
                        Li.insertBefore(Li.prev('li', true));
                    }
                    else if (el.is('.movedown'))
                    {
                        evt.stopEvent();
                        Li = el.parent('li');
                        Li.insertAfter(Li.next('li', true));
                    }
                }, this);

            this.tools.tbar =  [{
                cls: 'save button',
                fn: this.savePreferences,
                name: 'save',
                scope: this,
                title: this.savePrefs
            }];
        },
        savePreferences: function() {
            //Make sure the object hierarchy is defined.
            Ext.namespace("App.preferences.home");
            Ext.namespace("App.preferences.configure");

            //Clear App Preferences
            App.preferences.home.visible = [];
            App.preferences.configure.order = [];

            var visibleHomeList = App.preferences.home.visible;
            var configureListOrder = App.preferences.configure.order;

            this.el.select("input.list-selector").each(function(el) {
                configureListOrder.push(el.dom.value);
                if (el.dom.checked) visibleHomeList.push(el.dom.value);
            }, this);

            App.persistPreferences();
            App.getView('home').show();
        },
        // We dont have a feed to subscribe to for this List view.
        // So let's override "refresh" to do our logic, where we
        // display items stored in Application preferences (local storage).

        // Later when we persist this on server, we will as usual override
        // formatSearchQuery and createRequest, rather than refresh method.
        refresh: function() {
            var appConfigureOrder,
                viewLookup = {},
                exposedViews,
                o = [],
                v, i, j;

            //App.preferences.configure.order will not be available,
            //when App calls it's init.
            try {
                appConfigureOrder = App.preferences.configure.order;
            }
            catch(e) {
                return;
            }

            //Defered initialization.
            exposedViews = App.getExposedViews();

            //Update Configure List, to include any new views
            //not included in local storage.
            //Find out whats new, and append them to user's configure list.

            // Create a lookup cache for all exposed views.
            for (j = exposedViews.length - 1; j >= 0; j--)
                viewLookup[exposedViews[j]] = true;

            // Delete existing views from lookup.
            for (i = 0, len = appConfigureOrder.length; i < len; i++)
                if (viewLookup[appConfigureOrder[i]] === true)
                    delete viewLookup[appConfigureOrder[i]];

            for (v in viewLookup)
                appConfigureOrder.push(v);

            for (i = appConfigureOrder.length - 1; i >= 0; i--)
            {
                v = App.getView(appConfigureOrder[i]);

                // If a persisted view is not loaded/unavailable/removed
                // we have to remove it from persistence.
                if (!v)
                {
                    appConfigureOrder.splice(i, 1);
                    continue;
                }

                o.unshift(this.itemTemplate.apply(v, this));
            }
            //Persist this back to local storage.
            App.persistPreferences();

            Ext.DomHelper.append(this.el.child('.list-content'), o.join(''));
            this.selectPersistedItems();
        },
        selectPersistedItems: function() {
            var selectedViews = App.preferences.home.visible,
                selectedRegEx = [];

            for (var j = 0; j < selectedViews.length; j++) {
                selectedRegEx.push(selectedViews[j]);
            }
            selectedRegEx = '^(' + selectedRegEx.join(')|(') + ')$';
            selectedRegEx = new RegExp(selectedRegEx, 'i');

            this.el.select('li').each(function(li){
                var chkbox = li.child('input.list-selector');
                if (!chkbox) return;
                chkbox = chkbox.dom;
                if (selectedRegEx.test(chkbox.value))
                {
                    chkbox.checked = true;
                }
            });
        },
        show: function() {
            Mobile.SalesLogix.Configure.superclass.show.call(this);
            this.selectPersistedItems();
        }
    });
})();
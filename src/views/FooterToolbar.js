/// <reference path="../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../argos-sdk/src/List.js"/>

Ext.namespace("Mobile.SalesLogix");

(function() {
    Mobile.SalesLogix.FooterToolbar = Ext.extend(Sage.Platform.Mobile.MainToolbar, {
        attachmentPoints: Ext.apply({}, {
            copyrightEl: '.copyright'
        }, Sage.Platform.Mobile.MainToolbar.prototype.attachmentPoints),
        barTemplate: new Simplate([
            '<div class="footer-toolbar {%= $.cls %}">',
            '<hr />',
            '<span class="copyright">{%= $.copyrightText %}</span>',
            '</div>'
        ]),
        toolTemplate: new Simplate([
            '<button class="button toolButton toolButton-{%= $.side || "right" %} {%= $.cls %}" data-action="invokeTool" data-tool="{%= $.id %}">',
            '{% if ($.icon) { %}',
            '<img src="{%= $.icon %}" alt="{%= $.id %}" />',
            '{% } %}',
            '<span>{%: $.title %}</span>',            
            '</button>'
        ]),
        settingsView: 'settings',
        helpView: 'help',
        copyrightText: '&copy; 2011 Sage Software, Inc. All rights reserved.',
        logOutConfirmText: 'Are you sure you want to log out?',
        settingsText: 'Settings',
        helpText: 'Help',
        topText: 'Top',
        logOutText: 'Log Out',
        render: function() {
            this.el = Ext.DomHelper.append(
                Ext.getBody(),
                this.barTemplate.apply(this),
                true
            );

            for (var n in this.attachmentPoints)
                if (this.attachmentPoints.hasOwnProperty(n))
                    this[n] = this.el.child(this.attachmentPoints[n]);
        },
        showTools: function(tools) {
            if ((tools && tools.length <= 0) || (tools !== false))
            {
                tools = [{
                    id: 'settings',
                    title: this.settingsText,
                    side: 'left',
                    fn: this.navigateToSettingsView,
                    scope: this
                },{
                    id: 'help',
                    title: this.helpText,
                    side: 'left',
                    fn: this.navigateToHelpView,
                    scope: this
                },{
                    id: 'top',
                    title: this.topText,
                    side: 'left',
                    fn: this.scrollToTop,
                    scope: this
                },{
                    id: 'logout',
                    title: this.logOutText,
                    fn: this.logOut,
                    scope: this
                }];

                this.show();
            }
            else if (tools === false)
            {
                this.hide();
            }

            // skip parent implementation
            Sage.Platform.Mobile.MainToolbar.superclass.showTools.apply(this, arguments);

            if (tools)
            {
                for (var i = 0; i < tools.length; i++)
                {
                    if (this.copyrightEl)
                        Ext.DomHelper.insertBefore(this.copyrightEl, this.toolTemplate.apply(tools[i]));
                    else
                        Ext.DomHelper.append(this.el, this.toolTemplate.apply(tools[i]));
                }
            }
        },
        navigateToSettingsView: function() {
            var view = App.getView(this.settingsView);
            if (view)
                view.show();
        },
        navigateToHelpView: function() {
            var view = App.getView(this.helpView);
            if (view)
                view.show();
        },
        scrollToTop: function() {
            scrollTo(0, 1); 
        },
        logOut: function() {
            var sure = window.confirm(this.logOutConfirmText);
            if (sure) App.logOut();
        }
    });
})();
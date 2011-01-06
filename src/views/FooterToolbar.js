/// <reference path="../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../argos-sdk/src/List.js"/>

Ext.namespace("Mobile.SalesLogix");

(function() {
    Mobile.SalesLogix.FooterToolbar = Ext.extend(Sage.Platform.Mobile.MainToolbar, {
        barTemplate: new Simplate([
            '<div class="footer-toolbar {%= $.cls %}">',
            '</div>'
        ]),
        toolTemplate: new Simplate([
            '<a class="button toolButton toolButton-{%= $.side || "right" %} {%= $.cls %}" data-action="invokeTool" data-tool="{%= $.id %}">',
            '{% if ($.icon) { %}',
            '<img src="{%= $.icon %}" alt="{%= $.id %}" />',
            '{% } %}',
            '<span>{%: $.title %}</span>',            
            '</a>'
        ]),
        settingsView: 'settings',
        helpView: 'help',
        logOutConfirmText: 'Are you sure you want to log out?',
        settingsText: 'Settings',
        helpText: 'Help',
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
                    id: 'logout',
                    title: this.logOutText,
                    fn: this.logOut,
                    scope: this
                }];
            }

            Mobile.SalesLogix.FooterToolbar.superclass.showTools.call(this, tools);
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
            if (sure)
            {
                if (window.localStorage)
                    window.localStorage.removeItem('credentials');

                var service = App.getService();
                if (service)
                    service
                        .setUserName(false)
                        .setPassword(false);

                App.navigateToLoginView(); // todo: trim all history
            }
        }
    });
})();
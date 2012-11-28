define('Mobile/SalesLogix/Views/FooterToolbar', [
    'dojo/_base/declare',
    'Sage/Platform/Mobile/MainToolbar'
], function(
    declare,
    MainToolbar
) {

    return declare('Mobile.SalesLogix.Views.FooterToolbar', [MainToolbar], {
        // Localization
        copyrightText: '&copy; 2012 Sage Software, Inc. All rights reserved.',
        logOutConfirmText: 'Are you sure you want to log out?',
        settingsText: 'Settings',
        helpText: 'Help',
        topText: 'Top',
        logOutText: 'Log Out',

        widgetTemplate: new Simplate([
            '<div class="footer-toolbar {%= $.cls %}">',
            '<hr />',
            '<div data-dojo-attach-point="contentNode"></div>',
            '<span data-dojo-attach-point="copyrightNode" class="copyright">{%= $.copyrightText %}</span>',
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
        attributeMap: {
            footerContents: {
                node: 'contentNode',
                type: 'innerHTML'
            }
        },

        settingsView: 'settings',
        helpView: 'help',

        showTools: function(tools) {
            var contents = [];
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
            else
                if (tools === false)
                {
                    this.hide();
                }

            // skip parent implementation
            Sage.Platform.Mobile.MainToolbar.superclass.showTools.apply(this, arguments);

            if (tools)
            {
                for (var i = 0; i < tools.length; i++)
                {
                    contents.push(this.toolTemplate.apply(tools[i]));
                }
                this.set('footerContents', contents.join(''));
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
});

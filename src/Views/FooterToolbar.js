/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */

/**
 * @class crm.Views.FooterToolbar
 *
 *
 * @extends argos.MainToolbar
 *
 */
define('crm/Views/FooterToolbar', [
    'dojo/_base/declare',
    'dojo/_base/lang',
    'argos/MainToolbar'
], function(
    declare,
    lang,
    MainToolbar
) {

    var __class = declare('crm.Views.FooterToolbar', [MainToolbar], {
        // Localization
        copyrightText: '&copy; 2014 SalesLogix, NA, LLC. All rights reserved.',

        widgetTemplate: new Simplate([
            '<div class="footer-toolbar {%= $.cls %}">',
            '<hr />',
            '<div data-dojo-attach-point="contentNode"></div>',
            '<span data-dojo-attach-point="copyrightNode" class="copyright">{%= $.copyrightText %}</span>',
            '<span data-dojo-attach-point="version" class="copyright">{%= App.getVersionInfo() %}</span>',
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
        showTools: function(tools) {
            var contents,
                i;

            contents = [];
            if ((tools && tools.length <= 0) || (tools !== false)) {
                this.show();
            } else if (tools === false) {
                this.hide();
            }

            // skip parent implementation
            argos.MainToolbar.superclass.showTools.apply(this, arguments);

            if (tools) {
                for (i = 0; i < tools.length; i++) {
                    contents.push(this.toolTemplate.apply(tools[i]));
                }
                this.set('footerContents', contents.join(''));
            }
        }
    });

    lang.setObject('Mobile.SalesLogix.Views.FooterToolbar', __class);
    return __class;
});


/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */
/**
 * @class crm.Views.Help
 *
 *
 * @extends argos.Detail
 * @mixins argos._LegacySDataDetailMixin
 *
 */
define('crm/Views/Help', [
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/string',
    'dojo/dom-class',
    'dojo/dom-construct',
    'argos/ErrorManager',
    'argos/Detail',
    'dojo/NodeList-manipulate',
    'argos/_LegacySDataDetailMixin'
], function (declare, lang, string, domClass, domConstruct, ErrorManager, Detail, _LegacySDataDetailMixin) {
    var __class = declare('crm.Views.Help', [Detail, _LegacySDataDetailMixin], {
        //Templates
        errorTemplate: new Simplate([
            '<div data-dojo-attach-point="errorNode" class="panel-validation-summary">',
            '<h2>{%: $.errorText %}</h2>',
            '<ul>',
            '<li>{%: $.errorMessageText %}</li>',
            '</ul>',
            '</div>'
        ]),
        //Localization
        titleText: 'Help',
        errorText: 'Error',
        errorMessageText: 'Unable to load the help document.',
        //View Properties
        id: 'help',
        url: 'help/help.html',
        expose: false,
        createToolLayout: function () {
            return this.tools && (this.tools.tbar = []);
        },
        onRequestFailure: function (response, o) {
            domConstruct.place(this.errorTemplate.apply(this), this.contentNode, 'last');
            domClass.remove(this.domNode, 'panel-loading');
            ErrorManager.addError(response, o, this.options, 'failure');
        },
        onLocalizedRequestFirstFailure: function () {
            Sage.SData.Client.Ajax.request({
                url: this.resolveGenericLocalizedUrl(),
                cache: true,
                success: this.onRequestSuccess,
                failure: this.onLocalizedRequestSecondFailure,
                scope: this
            });
        },
        onLocalizedRequestSecondFailure: function () {
            Sage.SData.Client.Ajax.request({
                url: this.url,
                cache: true,
                success: this.onRequestSuccess,
                failure: this.onRequestFailure,
                scope: this
            });
        },
        onRequestSuccess: function (response, o) {
            this.processContent(response, o);
            domClass.remove(this.domNode, 'panel-loading');
        },
        resolveLocalizedUrl: function () {
            var localizedUrl = string.substitute('help/help_${0}.html', [Mobile.CultureInfo['name']]);
            return localizedUrl;
        },
        resolveGenericLocalizedUrl: function () {
            var languageSpec = Mobile.CultureInfo['name'], languageGen = (languageSpec.indexOf('-') !== -1) ? languageSpec.split('-')[0] : languageSpec, localizedUrl = string.substitute('help/help_${0}.html', [languageGen]);
            return localizedUrl;
        },
        requestData: function () {
            domClass.add(this.domNode, 'panel-loading');
            Sage.SData.Client.Ajax.request({
                url: this.resolveLocalizedUrl(),
                cache: true,
                success: this.onRequestSuccess,
                failure: this.onLocalizedRequestFirstFailure,
                scope: this
            });
        },
        processContent: function (xhr) {
            domConstruct.place(xhr.responseText, this.contentNode, 'last');
        }
    });
    lang.setObject('Mobile.SalesLogix.Views.Help', __class);
    return __class;
});

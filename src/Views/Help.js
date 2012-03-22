/// <reference path="../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../argos-sdk/src/List.js"/>

define('Mobile/SalesLogix/Views/Help', [
    'dojo/_base/declare',
    'dojo/query',
    'dojo/string',
    'dojo/dom-class',
    'Sage/Platform/Mobile/ErrorManager',
    'Sage/Platform/Mobile/Detail',
    'dojo/NodeList-manipulate'
], function(
    declare,
    query,
    string,
    domClass,
    ErrorManager,
    Detail
) {

    return declare('Mobile.SalesLogix.Views.Help', [Detail], {
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
        icon: 'content/images/icons/help_24.png',
        expose: false,

        init: function() {
            this.inherited(arguments);
        },
        createToolLayout: function() {
            return this.tools && (this.tools.tbar = []);
        },
        onRequestFailure: function(response, o) {
            query(this.contentNode).append(this.errorTemplate.apply(this));
            ErrorManager.addError(response, o, this.options, 'failure');
            domClass.remove(this.domNode, 'panel-loading');
        },
        onLocalizedRequestFirstFailure: function(response, o) {
            Sage.SData.Client.Ajax.request({
                url: this.resolveGenericLocalizedUrl(),
                cache: true,
                success: this.onRequestSuccess,
                failure: this.onLocalizedRequestSecondFailure,
                scope: this
            });
        },
        onLocalizedRequestSecondFailure: function(response, o) {
            Sage.SData.Client.Ajax.request({
                url: this.url,
                cache: true,
                success: this.onRequestSuccess,
                failure: this.onRequestFailure,
                scope: this
            });
        },
        onRequestSuccess: function(response, o) {
            this.processContent(response, o);
            domClass.remove(this.domNode, 'panel-loading');
        },
        resolveLocalizedUrl: function() {
            var localizedUrl = string.substitute("help/help_${0}.html", [Mobile.CultureInfo['name']]);
            return localizedUrl;
        },
        resolveGenericLocalizedUrl: function(){
            var languageSpec = Mobile.CultureInfo['name'],
                languageGen = (languageSpec.indexOf('-') !== -1) ? languageSpec.split('-')[0] : languageSpec,
                localizedUrl = string.substitute("help/help_${0}.html", [languageGen]);
            return localizedUrl;
        },
        requestData: function() {
            domClass.add(this.domNode, 'panel-loading');

            Sage.SData.Client.Ajax.request({
                url: this.resolveLocalizedUrl(),
                cache: true,
                success: this.onRequestSuccess,
                failure: this.onLocalizedRequestFirstFailure,
                scope: this
            });
        },
        processContent: function(xhr, o) {
            query(this.contentNode).append(xhr.responseText);
        }
    });
});
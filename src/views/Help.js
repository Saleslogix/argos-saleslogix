/// <reference path="../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../argos-sdk/src/List.js"/>

Ext.namespace("Mobile.SalesLogix");

Mobile.SalesLogix.Help = Ext.extend(Sage.Platform.Mobile.Detail, {
    //Templates
    errorTemplate: new Simplate([
        '<div class="panel-validation-summary">',
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
    url: 'help.html',
    icon: 'content/images/icons/help_24.png',
    expose: false,
    
    init: function() {
        Mobile.SalesLogix.Help.superclass.init.apply(this, arguments);        
     
        this.tools.tbar = [];
    },
    onRequestFailure: function(response, o) {
        Ext.DomHelper.append(this.contentEl, this.errorTemplate.apply(this));       
        this.el.removeClass('panel-loading');
    },
    onRequestSuccess: function(response, o) {
        this.processContent(response, o);
        this.el.removeClass('panel-loading');
    },
    requestData: function() {
        this.el.addClass('panel-loading');
        
        Sage.SData.Client.Ajax.request({
            url: this.url,
            // todo: this is backwards, fix in SData client.
            cache: false,
            success: this.onRequestSuccess,
            failure: this.onRequestFailure,
            scope: this
        });
    },
    processContent: function(xhr, o) {
        Ext.DomHelper.append(this.contentEl, xhr.responseText);        
    }
});
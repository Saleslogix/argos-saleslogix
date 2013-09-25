/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */
define('Mobile/SalesLogix/Views/ErrorLog/Detail', [
    'dojo/_base/declare',
    'dojo/_base/json',
    'dojo/string',
    'Mobile/SalesLogix/Format',
    'Sage/Platform/Mobile/ErrorManager',
    'Sage/Platform/Mobile/Detail'
], function(
    declare,
    json,
    string,
    format,
    ErrorManager,
    Detail
) {

    return declare('Mobile.SalesLogix.Views.ErrorLog.Detail', [Detail], {
        //Localization
        titleText: 'Error Log',

        detailsText: 'Details',
        errorDateText: 'date',
        errorDateFormatText: 'MM/DD/YYYY hh:mm A',
        statusTextText: 'error',
        urlText: 'url',

        moreDetailsText: 'More Details',
        severityText: 'severity',
        statusCodeText: 'status code',
        errorText: 'error',

        emailSubjectText: 'Error received in Saleslogix Mobile Client',
        copiedSuccessText: 'Copied to clipboard',

        //Templates
        longDetailProperty: new Simplate([
            '<div class="row note-text-row" data-property="{%= $.name %}">',
            '<label>{%: $.label %}</label>',
            '<pre>',
            '{%= $.value %}',
            '</pre>',
            '</div>'
        ]),
        copyButtonTemplate: new Simplate([
            '<div class="copyButton button toolButton toolButton-right">',
            '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" width="40" height="36" id="errorlog-detail-copy">',
            '<param name="movie" value="content/clippy.swf"/>',
            '<param name="allowScriptAccess" value="always" />',
            '<param name="quality" value="high" />',
            '<param name="scale" value="noscale" />',
            '<param name="FlashVars" value="{%= $.flashVars %}" />',
            '<param name="wmode" value="transparent" />',
            '<embed src="content/clippy.swf" width="45" height="36" scale="noscale" name="clippy" quality="high" allowScriptAccess="always" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" FlashVars="{%= $.flashVars %}" wmode="transparent" />',
            '</object>',
            '</div>'
        ]),


        //View Properties
        id: 'errorlog_detail',
        sendType: null,

        /**
         * Email address to be placed in the "To:" field when sending a report via a mobile device
         */
        defaultToAddress: null,

        init: function() {
            this.inherited(arguments);
            this.determineSendType();
        },

        createToolLayout: function() {
            var tools = {
                'tbar': []
            };

            if (this.sendType === 'mailto') {
                tools.tbar.push({
                    id: 'generateEmail',
                    action: 'constructReport',
                    icon: 'content/images/icons/Send_Write_email_24x24.png',
                    title: 'Generate Email Report'
                });
            }

            if (this.sendType === 'copy') {
                var flashVars = this.constructFlashVars({
                    "retrieveFunction": "App.views." + this.id + ".constructReport",
                    "callbackFunction": "App.views." + this.id + ".onCopySuccess",
                    "labelVisible": "0"
                });

                tools.tbar.push({
                    template: this.copyButtonTemplate,
                    flashVars: flashVars
                });
            }

            return this.tools || tools;
        },

        /**
         * Determines the method to use for sending the error report
         * 'mailto': Used on Mobile devices to indicate to form a mailto: url
         * 'copy': Used on desktops to indicate a "copy" button should be placed on the page
         */
        determineSendType: function() {
            switch (true) {
                case (typeof window.orientation !== 'undefined'):
                    this.sendType = 'mailto';
                    break;
                default:
                    this.sendType = 'copy';
            }
        },

        constructFlashVars: function(options) {
            var flashVars = [];
            for (var key in options) {
                flashVars.push(string.substitute('${0}=${1}', [key, options[key]]));
            }

            return flashVars.join('&');
        },

        onCopySuccess: function() {
            alert(this.copiedSuccessText);
        },

        constructReport: function() {
            var body = string.substitute('\r\n\r\n\r\n-----------------\r\n${0}',
                [json.toJson(this.entry, true)]);

            if (this.sendType === 'mailto') {
                this.sendEmailReport(body);
            } else {
                return body;
            }
        },

        sendEmailReport: function(body) {
            var email = this.defaultToAddress || '',
                subject = encodeURIComponent(this.emailSubjectText);
            body = encodeURIComponent(body);
            App.initiateEmail(email, subject, body);
        },

        requestData: function() {
            var errorItem = ErrorManager.getError('$key', this.options.key);
            this.processEntry(errorItem);
        },

        createLayout: function() {
            return this.layout || (this.layout = [{
                    title: this.detailsText,
                    name: 'DetailsSection',
                    children: [{
                            label: this.errorDateText,
                            name: 'errorDateStamp',
                            property: 'errorDateStamp',
                            renderer: format.date.bindDelegate(this, this.errorDateFormatText)
                        }, {
                            label: this.statusTextText,
                            name: 'serverResponse.statusText',
                            property: 'serverResponse.statusText'
                        }, {
                            label: this.urlText,
                            name: 'url',
                            property: 'url',
                            use: this.longDetailProperty
                        }]
                }, {
                    title: this.moreDetailsText,
                    collapsed: true,
                    name: 'MoreDetailsTextSection',
                    children: [{
                            label: this.severityText,
                            name: 'severity',
                            property: 'serverResponse.responseText.severity'
                        }, {
                            label: this.statusCodeText,
                            name: 'statusCode',
                            property: 'serverResponse.status'
                        }, {
                            label: this.errorText,
                            name: 'ErrorMessage',
                            property: 'serverResponse.responseText.message',
                            use: this.longDetailProperty
                        }]
                }]);
        }
    });
});


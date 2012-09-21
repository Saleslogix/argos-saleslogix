define('Mobile/SalesLogix/Views/ErrorLog/Detail', [
    'dojo/_base/declare',
    'dojo/_base/json',
    'dojo/string',
    '../../FlashToolbarButton',
    '../../Format',
    '../../Environment',
    'argos/Utility',
    'argos/ErrorManager',
    'argos/Detail',
    'argos/_SDataDetailMixin'
], function(
    declare,
    json,
    string,
    FlashToolbarButton,
    format,
    environment,
    utility,
    ErrorManager,
    Detail,
    _SDataDetailMixin
) {

    return declare('Mobile.SalesLogix.Views.ErrorLog.Detail', [Detail, _SDataDetailMixin], {
        //Localization
        titleText: 'Error Log',

        detailsText: 'Details',
        errorDateText: 'date',
        errorDateFormatText: 'MM/DD/YYYY hh:mm A',
        descriptionText: 'description',

        moreDetailsText: 'More Details',

        emailSubjectText: 'Error received in Sage SalesLogix Mobile Client',
        copiedSuccessText: 'Copied to clipboard',

        //Templates
        longDetailProperty: new Simplate([
            '<div class="row note-text-row" data-property="{%= $.name %}">',
                '<label>{%: $.label %}</label>',
                '<pre>',
                    '{%= $.formatted %}',
                '</pre>',
            '</div>'
        ]),

        //View Properties
        id: 'errorlog_detail',
        sendType: null,

        /**
         * Email address to be placed in the "To:" field when sending a report via a mobile device
         */
        defaultToAddress: null,

        onStartup: function() {
            this.inherited(arguments);
            this.determineSendType();
        },

        createToolLayout: function() {
            var tools = {
                'top': []
            };

            if (this.sendType === 'mailto')
            {
                tools.top.push({
                    id: 'generateEmail',
                    action: 'constructReport',
                    icon: 'content/images/icons/Send_Write_email_24x24.png',
                    title: 'Generate Email Report'
                });
            }

            if (this.sendType === 'copy')
            {
                var flashVars = this.constructFlashVars({
                    "retrieveFunction": "App.scene.getView('"+this.id+"').constructReport",
                    "callbackFunction": "App.scene.getView('"+this.id+"').onCopySuccess",
                    "labelVisible": "0"
                });

                tools.top.push({
                    cls: 'copyButton',
                    type: FlashToolbarButton,
                    id: 'errorlog-detail-copy',
                    swf: 'content/clippy.swf',
                    flashVars: flashVars
                });
            }

            return this.tools || (this.tools = tools);
        },

        /**
         * Determines the method to use for sending the error report
         * 'mailto': Used on Mobile devices to indicate to form a mailto: url
         * 'copy': Used on desktops to indicate a "copy" button should be placed on the page
         */
        determineSendType: function() {
            switch(true){
                case (typeof window.orientation !== 'undefined'):
                    this.sendType = 'mailto';
                    break;

                default: this.sendType = 'copy';
            }
        },

        constructFlashVars: function(options) {
            var flashVars = [];
            for (var key in options)
                flashVars.push(string.substitute('${0}=${1}', [key, options[key]]));

            return flashVars.join('&');
        },

        onCopySuccess: function() {
            alert(this.copiedSuccessText);
        },

        constructReport: function() {
            var body = string.substitute('\r\n\r\n\r\n-----------------\r\n${0}',
                    [json.toJson(utility.sanitizeForJson(this.item), true)]);

            if (this.sendType === 'mailto')
                this.sendEmailReport(body);
            else
                return body;
        },

        sendEmailReport: function(body) {
            var email = this.defaultToAddress || '',
                subject = encodeURIComponent(this.emailSubjectText);
            body = encodeURIComponent(body);
            environment.initiateEmail(email, subject, body);
        },

        _requestData: function() {
            var errorItem = ErrorManager.getError('$key', this.options.key);

            this._onGetComplete(errorItem);
        },

        createLayout: function() {
            return this.layout || (this.layout = [{
                title: this.detailsText,
                name: 'DetailsSection',
                children: [{
                    label: this.descriptionText,
                    name: 'Description',
                    property: 'Description'
                },{
                    label: this.errorDateText,
                    name: 'Date',
                    property: 'Date',
                    renderer: format.date.bindDelegate(this, this.errorDateFormatText)
                }]
            },{
                title: this.moreDetailsText,
                collapsed: true,
                name: 'MoreDetailsTextSection',
                children: [{
                    label: this.errorText,
                    name: 'Error',
                    property: 'Error',
                    use: this.longDetailProperty
                }]
            }]);
        }
    });
});
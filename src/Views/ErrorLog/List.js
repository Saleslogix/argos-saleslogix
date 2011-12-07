/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/Detail.js"/>

define('Mobile/SalesLogix/Views/ErrorLog/List', ['Sage/Platform/Mobile/List'], function() {

    return dojo.declare('Mobile.SalesLogix.Views.ErrorLog.List', [Sage.Platform.Mobile.List], {
        //Localization
        titleText: 'Error Logs',
        emailSubjectLineText: 'Error received in Sage SalesLogix Mobile Client',
        errorDateFormatText: 'MM/dd/yyyy hh:mm tt',

        //Templates
        itemTemplate: new Simplate([
            '<h3>{%: Mobile.SalesLogix.Format.date($.errorDateStamp, $$.errorDateFormatText) %}</h3>',
            '<h4>{%= $.serverResponse.statusText %}</h4>'
        ]),

        //View Properties
        id: 'errorlog_list',
        enableSearch:false,
        hideSearch: true,
        expose: false,
        detailView: 'errorlog_detail',

        /**
         * String. Address to be filled in to the TO: field by default
         */
        supportEmailAddress: null,

        /**
         * Boolean. True to use mailto: (email), false to use data: (download)
         * Set in init() for mobile to use email, desktop to use download
         * This is due to desktops limit of mailto: length
         */
        useMailTo: null,

        init: function() {
            this.inherited(arguments);
            this.useMailTo = (typeof window.orientation !== 'undefined');
            dojo.connect(Sage.Platform.Mobile.ErrorManager, 'onErrorAdd', this, '_onRefresh');
        },
        
        _onRefresh: function(){
            this.inherited(arguments);
            this.refreshRequired = true;
        },

        requestData: function(){
            var errors = Sage.Platform.Mobile.ErrorManager.getAllErrors(),
                C = Sage.Platform.Mobile.Convert;

            errors.sort(function(a,b){
               var A = C.toDateFromString(a.errorDateStamp), B = C.toDateFromString(b.errorDateStamp);
               return B.compareTo(A); // new -> old
            });

            this.processFeed({
                '$resources':errors,
                '$totalResults': errors.length,
                '$startIndex':1,
                '$itemsPerPage':20
            });
        },

        emailAllReports: function(){
            var email = this.supportEmailAddress || '',
                subject = encodeURIComponent(this.emailSubjectLineText),
                contents = [],
                errors = this.feed['$resources'];

            dojo.forEach(errors, function(item){
                contents.push('-----------------');
                item.serverResponse.response = dojo.fromJson(item.serverResponse.response);
                item.serverResponse.responseText = dojo.fromJson(item.serverResponse.responseText);
                contents.push(dojo.toJson(item, true));
                contents.push('-----------------');
            });

            if(this.useMailTo)
            {
                contents.unshift('','',''); // 3 blank lines for user write ins
                App.initiateEmail(email, subject, encodeURIComponent(contents.join('\r\n')));
            }
            else
            {
                App.initiateDataDownload(encodeURIComponent(contents.join('\r\n')), 'application/octet-stream', 'UTF-8');
            }
        },
        createToolLayout: function() {
            return this.tools || (this.tools = {
                'tbar': [{
                    id: 'emailAllReportsAction',
                    title:'Email All Reports',
                    icon: 'content/images/icons/Send_Write_email_24x24.png',
                    action: 'emailAllReports'
                }]
            });
        }
    });
});
/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/Detail.js"/>

Ext.namespace("Mobile.SalesLogix.Campaign");

(function() {
    Mobile.SalesLogix.Campaign.Detail = Ext.extend(Sage.Platform.Mobile.Detail, {
        id: 'campaign_detail',
        editView: 'campaign_edit',
        titleText: 'Campaign',
        nameText: 'name',
        codeText: 'code',
        startText: 'start',
        acctMgrText: 'acct mgr',
        createUserText: 'create user',
        createDateText: 'create date',
        resourceKind: 'campaigns',
        queryInclude: [
            'Address',
            'AccountManager/UserInfo'
        ],
        querySelect: [
            'CampaignName',
            'CampaignCode',
            'StartDate',
            'AccountManager/UserInfo/UserName',
            'AccountManager/UserInfo/FirstName',
            'AccountManager/UserInfo/LastName',
            'CreateUser',
            'CreateDate'
        ],
        init: function() {
            Mobile.SalesLogix.Campaign.Detail.superclass.init.apply(this, arguments);
            
            this.tools.fbar = [{
                name: 'home',
                title: 'home',
                cls: 'tool-note',
                icon: 'content/images/welcome_32x32.gif',
                fn: App.goHome,
                scope: this
            },{
                name: 'schedule',
                title: 'schedule',
                cls: 'tool-note',
                icon: 'content/images/Schdedule_To_Do_32x32.gif',
                fn: App.navigateToNewActivity,
                scope: this
            }];
        },       
        createLayout: function() {
            return this.layout || (this.layout = [
                {name: 'CampaignName', label: this.nameText},
                {name: 'CampaignCode', label: this.codeText},
                {name: 'StartDate', label: this.startText, renderer: Mobile.SalesLogix.Format.date},
                {name: 'AccountManager.UserInfo', label: this.acctMgrText, tpl: Mobile.SalesLogix.Template.nameLF},
                {name: 'CreateUser', label: this.createUserText},
                {name: 'CreateDate', label: this.createDateText, renderer: Mobile.SalesLogix.Format.date},
            ]);
        }
    });
})();
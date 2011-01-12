/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/Detail.js"/>

Ext.namespace("Mobile.SalesLogix.Campaign");

(function() {
    Mobile.SalesLogix.Campaign.Detail = Ext.extend(Sage.Platform.Mobile.Detail, {
        //Localization
        acctMgrText: 'acct mgr',
        codeText: 'code',
        createDateText: 'create date',
        createUserText: 'create user',
        fbarHomeTitleText: 'home',
        fbarScheduleTitleText: 'schedule',
        nameText: 'name',
        startText: 'start',
        titleText: 'Campaign',

        //View Properties
        editView: 'campaign_edit',
        id: 'campaign_detail',
        querySelect: [
            'AccountManager/UserInfo/FirstName',
            'AccountManager/UserInfo/LastName',
            'AccountManager/UserInfo/UserName',
            'CampaignCode',
            'CampaignName',
            'CreateDate',
            'CreateUser',
            'StartDate',
        ],
        resourceKind: 'campaigns',

        init: function() {
            Mobile.SalesLogix.Campaign.Detail.superclass.init.apply(this, arguments);

            this.tools.fbar = [{
                cls: '',
                fn: function() {
                    App.navigateToActivityInsertView.call(App, {"id": this.id});
                },
                icon: 'content/images/icons/Scheduling_24x24.png',
                name: 'schedule',
                scope: this,
                title: this.fbarScheduleTitleText
            }];
        },
        createLayout: function() {
            return this.layout || (this.layout = [
                {
                    name: 'CampaignName',
                    label: this.nameText
                },
                {
                    name: 'CampaignCode',
                    label: this.codeText
                },
                {
                    name: 'StartDate',
                    label: this.startText,
                    renderer: Mobile.SalesLogix.Format.date
                },
                {
                    name: 'AccountManager.UserInfo',
                    label: this.acctMgrText,
                    tpl: Mobile.SalesLogix.Template.nameLF
                },
                {
                    name: 'CreateUser',
                    label: this.createUserText
                },
                {
                    name: 'CreateDate',
                    label: this.createDateText,
                    renderer: Mobile.SalesLogix.Format.date
                }
            ]);
        }
    });
})();
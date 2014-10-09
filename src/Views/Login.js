/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */

/**
 * @class Mobile.SalesLogix.Views.Login
 *
 *
 * @extends Sage.Platform.Mobile.Edit
 *
 */
define('Mobile/SalesLogix/Views/Login', [
    'dojo/_base/declare',
    'dojo/_base/lang',
    'Sage/Platform/Mobile/Edit'
], function(
    declare,
    lang,
    Edit
) {

    return declare('Mobile.SalesLogix.Views.Login', [Edit], {
        //Templates
        widgetTemplate: new Simplate([
            '<div id="{%= $.id %}" title="{%: $.titleText %}" class="panel {%= $.cls %}" hideBackButton="true">',
            '<p class="logo"><img src="content/images/logo-64.png" /><span>{%: $.logoText %}<span></p>',
            '<div class="panel-content" data-dojo-attach-event="onkeypress: _onKeyPress" data-dojo-attach-point="contentNode"></div>',
            '<button class="button actionButton" data-action="authenticate"><span class="indicator fa fa-spinner fa-spin"></span><span>{%: $.logOnText %}</span></button>',
            '<span class="copyright">{%= $.copyrightText %}</span>',
            '<span class="copyright">{%= App.getVersionInfo() %}</span>',
            '</div>'
        ]),

        //Localization
        id: 'login',
        busy: false,
        copyrightText: 'Copyright &copy; 2014 Infor. All rights reserved. www.infor.com',
        logOnText: 'Sign in',
        passText: 'Password',
        rememberText: 'Remember me',
        titleText: 'Sign in',
        userText: 'User ID',
        invalidUserText: 'The user name or password is invalid.',
        missingUserText: 'The user record was not found.',
        serverProblemText: 'A problem occured on the server.',
        requestAbortedText: 'The request was aborted.',
        logoText: 'Infor CRM',

        ENTER_KEY: 13,

        _onKeyPress: function(evt) {
            if (evt.charOrCode === this.ENTER_KEY) {
                this.authenticate();
            }
        },
        onShow: function() {
            var credentials;
            credentials = App.getCredentials();

            if (credentials) {
                App.authenticateUser(credentials, {
                    success: function(result) {
                        App.requestUserDetails();
                        App.navigateToInitialView();
                    },
                    scope: this
                });
            }
        },
        createToolLayout: function() {
            return this.tools || (this.tools = {
                bbar: false,
                tbar: false
            });
        },
        getContext: function() {
            return {id: this.id};
        },
        createLayout: function() {
            return this.layout || (this.layout = [
                {
                    name: 'username',
                    placeHolderText: this.userText,
                    type: 'text',
                    autoFocus: true
                },
                {
                    name: 'password',
                    placeHolderText: this.passText,
                    type: 'text',
                    inputType: 'password'
                },
                {
                    name: 'remember',
                    label: this.rememberText,
                    type: 'boolean'
                }
            ]);
        },
        authenticate: function() {
            if (this.busy) {
                return;
            }

            var credentials = this.getValues(),
                username = credentials && credentials.username;

            if (username) {
                this.validateCredentials(credentials);
            }
        },
        validateCredentials: function(credentials) {
            this.disable();

            App.authenticateUser(credentials, {
                success: function(result) {
                    this.enable();
                    App.requestUserDetails();
                    App.navigateToInitialView();
                },
                failure: function(result) {
                    this.enable();

                    if (result.response) {
                        if (result.response.status == 403) {
                            alert(this.invalidUserText);
                        } else {
                            alert(this.serverProblemText);
                        }
                    } else {
                        alert(this.missingUserText);
                    }
                },
                aborted: function(result) {
                    this.enable();

                    alert(this.requestAbortedText);
                },
                scope: this
            });
        }
    });
});


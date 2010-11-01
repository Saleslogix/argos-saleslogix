/// <reference path="../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../argos-sdk/src/Edit.js"/>

Ext.namespace("Mobile.SalesLogix.Login");

Mobile.SalesLogix.Login = Ext.extend(Sage.Platform.Mobile.Edit, {
    //Templates
    viewTemplate: new Simplate([
        '<div id="{%= id %}" title="{%= title %}" class="panel" effect="flip" hideBackButton="hideBackButton">',        
        '<div class="panel-content"></div>',
        '<a class="button whiteButton actionButton" data-action="login">Login</a>',
        '</div>'
    ]),

    //Localization
    passText: 'pass',
    rememberText: 'remember',
    titleText: 'Login',
    userText: 'user',

    constructor: function(o) {
        Mobile.SalesLogix.Login.superclass.constructor.call(this);

        Ext.apply(this, o, {
            id: 'login',
            title: this.titleText,
            tools: {}
        });

        this.layout = [
            {
                name: 'user',
                label: this.userText,
                type: 'text'
            },
            {
                name: 'pass',
                label: this.passText,
                type: 'text'
            },
            {
                name: 'remember',
                label: this.rememberText,
                type: 'boolean'
            }
        ];
        this.busy = false;
    },
    getContext: function() {
        return {id: this.id};
    },
    login: function () {        
        if (this.busy) return;

        var values = this.getValues();

        this.validateCredentials(values.user, values.pass, values.remember);
    },
    validateCredentials: function (username, password) {
        this.busy = true;
        this.el.addClass('dialog-busy');

        var service = App.getService()
            .setUserName(username)
            .setPassword(password || '');

        var request = new Sage.SData.Client.SDataResourceCollectionRequest(service)
            .setResourceKind('users')
            .setQueryArgs({
                'select': 'UserName',
                'where': String.format('UserName eq "{0}"', username)
            })
            .setCount(1)
            .setStartIndex(1);

        request.read({
            success: function (feed) {
                this.busy = false;
                this.el.removeClass('dialog-busy');

                if (feed['$resources'].length <= 0) {
                    service
                        .setUserName(false)
                        .setPassword(false);

                    alert('User does not exist.');
                }
                else {
                    App.context['user'] = feed['$resources'][0]['$key'];

                    var view = App.getView('home'),
                        options;

                    if (window.localStorage)
                    {
                        var restoreState = window.localStorage.getItem('restore'),
                            restoreContext = restoreState && Ext.decode(restoreState),
                            restoreView = restoreContext && App.getView(restoreContext.id),
                            restoreOptions = restoreContext && restoreContext.options;

                        if (restoreView && restoreView != this)
                        {
                            view = restoreView;
                            options = restoreOptions;
                            
                            window.localStorage.removeItem('restore');
                        }
                    }

                    // todo: add successful login eventing
                    
                    if (view)
                        view.show(options);
                }
            },
            failure: function (response, o) {
                this.busy = false;
                this.el.removeClass('dialog-busy');

                service
                    .setUserName(false)
                    .setPassword(false);

                if (response.status == 403)
                    alert('Username or password is invalid.');
                else
                    alert('A problem occured on the server.');
            },
            scope: this
        });
    }
});
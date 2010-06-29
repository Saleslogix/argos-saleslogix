/// <reference path="../../../ext/ext-core-debug.js"/>
/// <reference path="../../../reui/reui.js"/>
/// <reference path="../../../platform/Application.js"/>
/// <reference path="../../../../sdata/SDataResourceCollectionRequest.js"/>
/// <reference path="../../../platform/View.js"/>
/// <reference path="Application.js"/>

Ext.namespace("Mobile.SalesLogix");

/// this is a very simple home view.
Mobile.SalesLogix.LoginDialog = Ext.extend(Sage.Platform.Mobile.View, {
    viewTemplate: new Simplate([
        '<form id="{%= id %}" class="dialog">',
        '<fieldset>',
        '<h1>{%= title %}</h1>',
        '<a class="button blueButton" target="_none"><span>Login</span></a>',
        '<label>user:</label>',
        '<input id="{%= id %}_user" type="text" name="user" value="lee" /><br />',
        '<label>pass:</label>',
        '<input id="{%= id %}_pass" type="text" name="password" />',
        '</fieldset>',
        '</form>'
    ]),
    constructor: function (o) {
        Mobile.SalesLogix.LoginDialog.superclass.constructor.call(this);

        Ext.apply(this, o, {
            id: 'login_dialog',
            title: 'Login',
            expose: false
        });

        this.busy = false;
    },
    init: function () {
        Mobile.SalesLogix.LoginDialog.superclass.init.call(this);

        this.el.select('.blueButton')
            .on('click', function (evt, el, o) {
                this.login();
            }, this, { preventDefault: true, stopPropagation: true });
    },
    login: function () {
        if (this.busy) return;

        var username = this.el
            .child('input[name="user"]')
            .getValue();

        var password = this.el
            .child('input[name="password"]')
            .getValue();

        this.validateCredentials(username, password);
    },
    validateCredentials: function (username, password) {
        this.busy = true;
        this.el.addClass('dialog-busy');

        var service = App.getService()
            .setUserName(username)
            .setPassword(password);

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
                    
                    // todo: add successful login eventing                    

                    this.el.dom.removeAttribute('selected');
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
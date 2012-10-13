define('Mobile/SalesLogix/Views/User/List', [
    'dojo/_base/declare',
    'dojo/string',
    'Sage/Platform/Mobile/List'
], function(
    declare,
    string,
    List
) {

    return declare('Mobile.SalesLogix.Views.User.List', [List], {
        //Templates
        itemTemplate: new Simplate([
            '<h3>{%: $.UserInfo.LastName %}, {%: $.UserInfo.FirstName %}</h3>',
            '<h4>{%: $.UserInfo.Title %}</h4>'
        ]),

        //Localization
        titleText: 'Users',

        //View Properties
        id: 'user_list',
        queryOrderBy: 'UserInfo.LastName asc, UserInfo.FirstName asc',
        queryWhere: 'Enabled eq true',
        querySelect: [
            'UserInfo/FirstName',
            'UserInfo/LastName',
            'UserInfo/Title',
            'UserInfo/UserName'
        ],
        resourceKind: 'users',

        formatSearchQuery: function(searchQuery) {
            return string.substitute('upper(UserInfo.UserName) like "%${0}%"', [this.escapeSearchQuery(searchQuery.toUpperCase())]);
        }
    });
});
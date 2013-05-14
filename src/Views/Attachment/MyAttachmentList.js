define('Mobile/SalesLogix/Views/Attachment/MyAttachmentList', [
    'dojo/_base/declare',
    'dojo/string',
    'Mobile/SalesLogix/Format',
    'Mobile/SalesLogix/Views/Attachment/List'
], function(
    declare,
    string,
    format,
    AttachmentList
) {

    return declare('Mobile.SalesLogix.Views.Attachment.MyAttachmentList', [AttachmentList], {
        id: 'myattachment_list',
        titleText: 'My Attachments',
       // queryInclude: [],
        queryWhere: function() {
            return string.substitute('user eq "${0}"', [App.context['user'].$key]);
       }
    });
});


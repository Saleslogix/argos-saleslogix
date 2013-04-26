define('Mobile/SalesLogix/Views/Attachment/AddAttachment', [
    'dojo/_base/declare',
    'dojo/string',
    'Mobile/SalesLogix/Format',
    'Sage/Platform/Mobile/Views/FileSelect',
    'Mobile/SalesLogix/AttatchmentManager'
], function(
    declare,
    string,
    format,
    FileSelect,
    AttatchmentManager
) {

    return declare('Mobile.SalesLogix.Views.Attachment.AddAttachment', [FileSelect], {
        //Templates
        /*itemTemplate: new Simplate([
            '<h3>{%: $.description %}</h3>',
            '<h4>',
                '<span>{%: $.fileName %}&nbsp;</span>',
                '<span>({%: Mobile.SalesLogix.Format.date($.attachDate, $$.attachmentDateFormatText) %})&nbsp;</span>',
                '<span>{%: $.fileSize %} Bytes </span>',
            '</h4>'

        ]),
        */
        //Localization
        titleText: 'Add Attachments',
        attachmentDateFormatText: 'ddd M/d/yy h:mm:tt',
        //View Properties       
        id: 'attachment_Add',
        icon: 'content/images/icons/attachment_24.png',
        _okSelect: function() {
            var am = new AttatchmentManager();
            am.createAttachment(this._files[0], {});
        }
    });
});


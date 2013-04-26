define('Mobile/SalesLogix/Views/Attachment/AddAttachment', [
    'dojo/_base/declare',
    'dojo/string',
    'Mobile/SalesLogix/Format',
    'Sage/Platform/Mobile/Views/FileSelect',
    'Mobile/SalesLogix/AttatchmentManager',
    'Mobile/SalesLogix/Environment'
], function(
    declare,
    string,
    format,
    FileSelect,
    AttatchmentManager,
    Environment
) {

    return declare('Mobile.SalesLogix.Views.Attachment.AddAttachment', [FileSelect], {
        //Localization
        titleText: 'Add Attachments',
        attachmentDateFormatText: 'ddd M/d/yy h:mm:tt',

        //View Properties       
        id: 'attachment_Add',
        icon: 'content/images/icons/attachment_24.png',

        okSelect: function() {
            if (this._files && this._files.length > 0) {
                this.inherited(arguments);
                var am = new AttatchmentManager();
                am.createAttachment(this._files[0], {});
                am.onSuccessUpdate = function() {
                    Environment.refreshAttachmentViews();
                    ReUI.back();
                }
            }
        },
        cancelSelect: function() {
            ReUI.back();
        }
    });
});


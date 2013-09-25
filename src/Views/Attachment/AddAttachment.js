/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */
define('Mobile/SalesLogix/Views/Attachment/AddAttachment', [
    'dojo/_base/declare',
    'dojo/string',
    'Mobile/SalesLogix/Format',
    'Sage/Platform/Mobile/Format',
    'Sage/Platform/Mobile/Views/FileSelect',
    'Mobile/SalesLogix/AttachmentManager',
    'Mobile/SalesLogix/Environment'
], function(
    declare,
    string,
    format,
    sdkFormat,
    FileSelect,
    AttachmentManager,
    Environment
) {

    return declare('Mobile.SalesLogix.Views.Attachment.AddAttachment', [FileSelect], {
        //Localization
        titleText: 'Add Attachments',

        //View Properties       
        id: 'attachment_Add',
        icon: 'content/images/icons/attachment_24.png',

        onUploadFiles: function() {
            var fileItems, self;
            self = this;
            if (this._files && this._files.length > 0) {
                this.inherited(arguments);
                fileItems = this.getFileItems();
                var am = new AttachmentManager();

                am.onSuccessUpdate = function() {
                    Environment.refreshAttachmentViews();
                    ReUI.back();
                };

                am.onFailedUpload = function(errorMessage) {
                    self.onUpdateFailed(errorMessage);
                    alert(errorMessage);
                    ReUI.back();
                };

                am.onUpdateProgress = function(percent) {
                    var msg = sdkFormat.percent(percent / 100);
                    self.onUpdateProgress(msg);
                };

                am.createAttachment(fileItems[0].file, {description: fileItems[0].description});
            }
        },
        cancelSelect: function() {
            ReUI.back();
        }
    });
});


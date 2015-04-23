/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */

/**
 * @class crm.Views.Attachment.AddAttachment
 *
 * @extends argos.Views.FileSelect
 *
 * @requires argos.Views.FileSelect
 * @requires argos.Format
 *
 * @requires crm.AttachmentManager
 * @requires crm.Environment
 *
 */
define('crm/Views/Attachment/AddAttachment', [
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/string',
    '../../Format',
    'argos/Format',
    'argos/Views/FileSelect',
    '../../AttachmentManager',
    '../../Environment'
], function(
    declare,
    lang,
    string,
    format,
    sdkFormat,
    FileSelect,
    AttachmentManager,
    Environment
) {

    var __class = declare('crm.Views.Attachment.AddAttachment', [FileSelect], {
        //Localization
        titleText: 'Add Attachments',

        //View Properties
        id: 'attachment_Add',

        onUploadFiles: function() {
            var fileItems,
                am,
                self;

            self = this;
            if (this._files && this._files.length > 0) {
                this.inherited(arguments);
                fileItems = this.getFileItems();
                am = new AttachmentManager();

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

    lang.setObject('Mobile.SalesLogix.Views.Attachment.AddAttachment', __class);
    return __class;
});


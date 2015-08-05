import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import string from 'dojo/string';
import format from '../../Format';
import sdkFormat from 'argos/Format';
import FileSelect from 'argos/Views/FileSelect';
import AttachmentManager from '../../AttachmentManager';
import Environment from '../../Environment';

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

      am.createAttachment(fileItems[0].file, {
        description: fileItems[0].description
      });
    }
  },
  cancelSelect: function() {
    ReUI.back();
  }
});

lang.setObject('Mobile.SalesLogix.Views.Attachment.AddAttachment', __class);
export default __class;

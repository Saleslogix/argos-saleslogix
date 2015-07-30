define('crm/Views/Attachment/AddAttachment', ['exports', 'module', 'dojo/_base/declare', 'dojo/_base/lang', 'dojo/string', '../../Format', 'argos/Format', 'argos/Views/FileSelect', '../../AttachmentManager', '../../Environment'], function (exports, module, _dojo_baseDeclare, _dojo_baseLang, _dojoString, _Format, _argosFormat, _argosViewsFileSelect, _AttachmentManager, _Environment) {
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _declare = _interopRequireDefault(_dojo_baseDeclare);

  var _lang = _interopRequireDefault(_dojo_baseLang);

  var _string = _interopRequireDefault(_dojoString);

  var _format = _interopRequireDefault(_Format);

  var _sdkFormat = _interopRequireDefault(_argosFormat);

  var _FileSelect = _interopRequireDefault(_argosViewsFileSelect);

  var _AttachmentManager2 = _interopRequireDefault(_AttachmentManager);

  var _Environment2 = _interopRequireDefault(_Environment);

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
  var __class = (0, _declare['default'])('crm.Views.Attachment.AddAttachment', [_FileSelect['default']], {
    //Localization
    titleText: 'Add Attachments',

    //View Properties
    id: 'attachment_Add',

    onUploadFiles: function onUploadFiles() {
      var fileItems, am, self;

      self = this;
      if (this._files && this._files.length > 0) {
        this.inherited(arguments);
        fileItems = this.getFileItems();
        am = new _AttachmentManager2['default']();

        am.onSuccessUpdate = function () {
          _Environment2['default'].refreshAttachmentViews();
          ReUI.back();
        };

        am.onFailedUpload = function (errorMessage) {
          self.onUpdateFailed(errorMessage);
          alert(errorMessage);
          ReUI.back();
        };

        am.onUpdateProgress = function (percent) {
          var msg = _sdkFormat['default'].percent(percent / 100);
          self.onUpdateProgress(msg);
        };

        am.createAttachment(fileItems[0].file, {
          description: fileItems[0].description
        });
      }
    },
    cancelSelect: function cancelSelect() {
      ReUI.back();
    }
  });

  _lang['default'].setObject('Mobile.SalesLogix.Views.Attachment.AddAttachment', __class);
  module.exports = __class;
});

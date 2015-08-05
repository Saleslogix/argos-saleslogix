define('crm/Views/ErrorLog/Detail', ['exports', 'module', 'dojo/_base/declare', 'dojo/_base/lang', 'dojo/_base/json', 'dojo/string', 'crm/Format', 'argos/ErrorManager', 'argos/Detail'], function (exports, module, _dojo_baseDeclare, _dojo_baseLang, _dojo_baseJson, _dojoString, _crmFormat, _argosErrorManager, _argosDetail) {
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _declare = _interopRequireDefault(_dojo_baseDeclare);

  var _lang = _interopRequireDefault(_dojo_baseLang);

  var _json = _interopRequireDefault(_dojo_baseJson);

  var _string = _interopRequireDefault(_dojoString);

  var _format = _interopRequireDefault(_crmFormat);

  var _ErrorManager = _interopRequireDefault(_argosErrorManager);

  var _Detail = _interopRequireDefault(_argosDetail);

  /**
   * @class crm.Views.ErrorLog.Detail
   *
   * @extends argos.Detail
   *
   * @requires crm.Format
   * @requires argos.ErrorManager
   */
  var __class = (0, _declare['default'])('crm.Views.ErrorLog.Detail', [_Detail['default']], {
    // Localization
    titleText: 'Error Log',

    detailsText: 'Details',
    errorDateText: 'date',
    errorDateFormatText: 'MM/DD/YYYY hh:mm A',
    statusTextText: 'error',
    urlText: 'url',

    moreDetailsText: 'More Details',
    errorText: 'error',

    emailSubjectText: 'Error received in Saleslogix Mobile Client',
    copiedSuccessText: 'Copied to clipboard',

    // Templates
    longDetailProperty: new Simplate(['<div class="row note-text-row" data-property="{%= $.name %}">', '<label>{%: $.label %}</label>', '<pre>', '{%= $.value %}', '</pre>', '</div>']),
    copyButtonTemplate: new Simplate(['<div class="copyButton button toolButton toolButton-right">', '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" width="40" height="36" id="errorlog-detail-copy" class="fa fa-clipboard fa-lg">', '<param name="movie" value="content/clippy.swf"/>', '<param name="allowScriptAccess" value="always" />', '<param name="quality" value="high" />', '<param name="scale" value="noscale" />', '<param name="FlashVars" value="{%= $.flashVars %}" />', '<param name="wmode" value="transparent" />', '<embed src="content/clippy.swf" width="45" height="36" scale="noscale" name="clippy" quality="high" allowScriptAccess="always" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" FlashVars="{%= $.flashVars %}" wmode="transparent" />', '</object>', '</div>']),

    // View Properties
    id: 'errorlog_detail',
    sendType: null,

    /**
     * Email address to be placed in the "To:" field when sending a report via a mobile device
     */
    defaultToAddress: null,

    init: function init() {
      this.inherited(arguments);
      this.determineSendType();
    },

    createToolLayout: function createToolLayout() {
      var tools = {
        'tbar': []
      };

      if (this.sendType === 'mailto') {
        tools.tbar.push({
          id: 'generateEmail',
          action: 'constructReport',
          cls: 'fa fa-envelope fa-lg',
          title: 'Generate Email Report'
        });
      }

      if (this.sendType === 'copy') {
        var flashVars = this.constructFlashVars({
          'retrieveFunction': 'App.views.' + this.id + '.constructReport',
          'callbackFunction': 'App.views.' + this.id + '.onCopySuccess',
          'labelVisible': '0'
        });

        tools.tbar.push({
          template: this.copyButtonTemplate,
          flashVars: flashVars
        });
      }

      return this.tools || tools;
    },

    /**
     * Determines the method to use for sending the error report
     * 'mailto': Used on Mobile devices to indicate to form a mailto: url
     * 'copy': Used on desktops to indicate a "copy" button should be placed on the page
     */
    determineSendType: function determineSendType() {
      switch (true) {
        case typeof window.orientation !== 'undefined':
          this.sendType = 'mailto';
          break;
        default:
          this.sendType = 'copy';
      }
    },

    constructFlashVars: function constructFlashVars(options) {
      var flashVars = [];
      for (var key in options) {
        if (options.hasOwnProperty(key)) {
          flashVars.push(_string['default'].substitute('${0}=${1}', [key, options[key]]));
        }
      }

      return flashVars.join('&');
    },

    onCopySuccess: function onCopySuccess() {
      alert(this.copiedSuccessText); // eslint-disable-line
    },

    constructReport: function constructReport() {
      var body = _string['default'].substitute('\r\n\r\n\r\n-----------------\r\n${0}', [_json['default'].toJson(this.entry, true)]);

      if (this.sendType === 'mailto') {
        this.sendEmailReport(body);
      } else {
        return body;
      }
    },

    sendEmailReport: function sendEmailReport(body) {
      var email = this.defaultToAddress || '';
      var subject = encodeURIComponent(this.emailSubjectText);
      var theBody = encodeURIComponent(body);
      App.initiateEmail(email, subject, theBody);
    },

    requestData: function requestData() {
      var errorItem = _ErrorManager['default'].getError('$key', this.options.key);
      this.processEntry(errorItem);
    },

    createLayout: function createLayout() {
      return this.layout || (this.layout = [{
        title: this.detailsText,
        name: 'DetailsSection',
        children: [{
          label: this.errorDateText,
          name: 'Date',
          property: 'Date',
          renderer: _format['default'].date.bindDelegate(this, this.errorDateFormatText)
        }, {
          label: this.statusTextText,
          name: 'Description',
          property: 'Description'
        }]
      }, {
        title: this.moreDetailsText,
        collapsed: true,
        name: 'MoreDetailsTextSection',
        children: [{
          label: this.errorText,
          name: 'Error',
          property: 'Error'
        }]
      }]);
    }
  });

  _lang['default'].setObject('Mobile.SalesLogix.Views.ErrorLog.Detail', __class);
  module.exports = __class;
});

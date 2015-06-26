define('crm/Views/Attachment/List', ['exports', 'module', 'dojo/_base/declare', 'dojo/_base/lang', 'dojo/string', 'dojo/has', '../../Format', '../../Utility', 'argos/List', 'argos/_LegacySDataListMixin', 'argos/Convert', '../_RightDrawerListMixin', '../_CardLayoutListMixin', 'moment'], function (exports, module, _dojo_baseDeclare, _dojo_baseLang, _dojoString, _dojoHas, _Format, _Utility, _argosList, _argos_LegacySDataListMixin, _argosConvert, _RightDrawerListMixin2, _CardLayoutListMixin2, _moment) {
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    var _declare = _interopRequireDefault(_dojo_baseDeclare);

    var _lang = _interopRequireDefault(_dojo_baseLang);

    var _string = _interopRequireDefault(_dojoString);

    var _has = _interopRequireDefault(_dojoHas);

    var _format = _interopRequireDefault(_Format);

    var _utility = _interopRequireDefault(_Utility);

    var _List = _interopRequireDefault(_argosList);

    var _LegacySDataListMixin2 = _interopRequireDefault(_argos_LegacySDataListMixin);

    var _convert = _interopRequireDefault(_argosConvert);

    var _RightDrawerListMixin3 = _interopRequireDefault(_RightDrawerListMixin2);

    var _CardLayoutListMixin3 = _interopRequireDefault(_CardLayoutListMixin2);

    var _moment2 = _interopRequireDefault(_moment);

    /**
    * @class crm.Views.Attachments.List
    *
    * @extends argos.List
    * @mixins argos.List
    * @mixins crm.Views._RightDrawerListMixin
    * @mixins crm.Views._CardLayoutListMixin
    * @mixins argos._LegacySDataListMixin
    *
    * @requires argos.List
    * @requires argos._LegacySDataListMixin
    * @requires argos.Convert
    *
    * @requires crm.Format
    * @requires crm.Views._RightDrawerListMixin
    * @requires crm.Views._CardLayoutListMixin
    *
    * @requires moment
    *
    */
    var __class = (0, _declare['default'])('crm.Views.Attachment.List', [_List['default'], _RightDrawerListMixin3['default'], _CardLayoutListMixin3['default'], _LegacySDataListMixin2['default']], {
        //Templates
        itemTemplate: new Simplate(['{% if ($.dataType === "R") { %}', '{%! $$.fileTemplate %}', '{% } else { %}', '{%! $$.urlTemplate %}', '{% } %}']),
        fileTemplate: new Simplate(['<h3><span>{%: $.description %}&nbsp;</span></h3>', '<h4><span>({%: $$.uploadedOnText %} {%: crm.Format.relativeDate($.attachDate) %})&nbsp;</span>', '<span>{%: crm.Format.fileSize($.fileSize) %} </span></h4>', '<h4><span>{%: crm.Utility.getFileExtension($.fileName) %} </span></h4>', '{% if($.user) { %}', '<h4><span>{%: $.user.$descriptor  %}</span></h4>', '{% } %}']),
        urlTemplate: new Simplate(['<h3><span>{%: $.description %} &nbsp;</span></h3>', '{% if ($.attachDate) { %}', '<h4><span>({%: $$.uploadedOnText %} {%: crm.Format.relativeDate($.attachDate) %})&nbsp;</span></h4>', '{% } %}', '<h4><span>{%: $.url %}&nbsp;</span></h4>', '{% if($.user) { %}', '<h4><span>{%: $.user.$descriptor  %}</span></h4>', '{% } %}']),

        //Localization
        titleText: 'Attachments',
        attachmentDateFormatText: 'ddd M/D/YYYY hh:mm:ss',
        uploadedOnText: 'Uploaded ', // Uploaded 10 days ago

        //View Properties
        id: 'attachment_list',
        security: null,
        enableActions: true,
        detailView: 'view_attachment',
        insertView: 'attachment_Add',
        iconClass: 'fa fa-paperclip fa-lg',
        queryOrderBy: 'attachDate desc',
        querySelect: ['description', 'user', 'createUser', 'attachDate', 'fileSize', 'fileName', 'url', 'fileExists', 'remoteStatus', 'dataType', 'ModifyDate'],
        resourceKind: 'attachments',
        contractName: 'system',
        queryInclude: ['$descriptors'],

        hashTagQueries: {
            'url': 'url ne null',
            'binary': 'url eq null'
        },
        hashTagQueriesText: {
            'url': 'url',
            'binary': 'binary'
        },
        createToolLayout: function createToolLayout() {
            if (!(0, _has['default'])('html5-file-api')) {
                this.insertView = null;
            } else {
                return this.inherited(arguments);
            }
        },
        createRequest: function createRequest() {
            var request = this.inherited(arguments);
            request.setQueryArg('_includeFile', 'false');
            return request;
        },
        formatSearchQuery: function formatSearchQuery(searchQuery) {
            return _string['default'].substitute('upper(description) like "%${0}%"', [this.escapeSearchQuery(searchQuery.toUpperCase())]);
        },
        getLink: function getLink(attachment) {
            if (attachment['url']) {
                var href = attachment['url'] || '';
                href = href.indexOf('http') < 0 ? 'http://' + href : href;
                return _string['default'].substitute('<a href="${0}" target="_blank" title="${1}">${2}</a>', [href, attachment['url'], attachment['$descriptor']]);
            } else {
                if (attachment['fileExists']) {
                    return _string['default'].substitute('<a href="javascript: Sage.Utility.File.Attachment.getAttachment(\'${0}\');" title="${1}">${1}</a>', [attachment['$key'], attachment['$descriptor']]);
                } else {
                    return attachment['$descriptor'];
                }
            }
        },
        itemIconClass: 'fa-file-o',
        fileIconByType: {
            'xls': 'fa-file-excel-o',
            'xlsx': 'fa-file-excel-o',
            'doc': 'fa-file-word-o',
            'docx': 'fa-file-word-o',
            'ppt': 'fa-file-powerpoint-o',
            'pptx': 'fa-file-powerpoint-o',
            'txt': 'fa-file-text-o',
            'rtf': 'fa-file-text-o',
            'csv': 'fa-file-text-o',
            'pdf': 'fa-file-pdf-o',
            'zip': 'fa-file-zip-o',
            'png': 'fa-file-image-o',
            'jpg': 'fa-file-image-o',
            'gif': 'fa-file-image-o',
            'bmp': 'fa-file-image-o'
        },
        getItemIconClass: function getItemIconClass(entry) {
            var cls,
                typeCls,
                type,
                fileName = entry && entry.fileName;
            type = _utility['default'].getFileExtension(fileName);
            cls = this.itemIconClass;
            if (type) {
                type = type.substr(1); //Remove the '.' from the ext.
                typeCls = this.fileIconByType[type];
                if (typeCls) {
                    cls = typeCls;
                }
            }
            if (cls) {
                cls = 'fa ' + cls + ' fa-2x';
            }
            return cls;
        },
        createIndicatorLayout: function createIndicatorLayout() {
            return this.itemIndicators || (this.itemIndicators = [{
                id: 'touched',
                cls: 'fa fa-hand-o-up fa-lg',
                label: 'Touched',
                onApply: function onApply(entry, parent) {
                    this.isEnabled = parent.hasBeenTouched(entry);
                }
            }]);
        },
        hasBeenTouched: function hasBeenTouched(entry) {
            var modifiedDate, currentDate, weekAgo;
            if (entry['modifyDate']) {
                modifiedDate = (0, _moment2['default'])(_convert['default'].toDateFromString(entry['modifyDate']));
                currentDate = (0, _moment2['default'])().endOf('day');
                weekAgo = (0, _moment2['default'])().subtract(1, 'weeks');

                return modifiedDate.isAfter(weekAgo) && modifiedDate.isBefore(currentDate);
            }
            return false;
        }
    });

    _lang['default'].setObject('Mobile.SalesLogix.Views.Attachment.List', __class);
    module.exports = __class;
});

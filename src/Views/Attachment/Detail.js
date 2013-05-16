define('Mobile/SalesLogix/Views/Attachment/Detail', [
    'dojo/_base/declare',
    'dojo/string',
    'dojo/_base/connect',
    'dojo/_base/array',
    'Mobile/SalesLogix/Format',
    'Sage/Platform/Mobile/Detail'
], function(
    declare,
    string,
    connect,
    array,
    format,
    Detail
) {

    return declare('Mobile.SalesLogix.Views.Attachment.Detail', [Detail], {
        //Localization
        detailsText: 'Attachment Details',
        descriptionText: 'description',
        fileNameText: 'file name',
        attachDateText: 'attachment date',
        fileSizeText: 'file size',
        userText: 'user',
        attachmentDateFormatText: 'ddd M/d/yy h:mm:tt',
        //View Properties
        id: 'attachment_detail',
        editView: 'attachment_edit',

        security: null,
        querySelect: ['description', 'user', 'attachDate', 'fileSize', 'fileName', 'url', 'fileExists', 'remoteStatus', 'dataType'],
        resourceKind: 'attachments',
        contractName: 'system',
        queryInclude: ['$descriptors'],
        createRequest: function() {
            var request = this.inherited(arguments);
            request.setQueryArg('_includeFile', 'false');
            return request;
        },
        createEntryForDelete: function(e) {
            var entry = {
                '$key': e['$key'],
                '$etag': e['$etag'],
                '$name': e['$name']
            };
            return entry;
        },
        deleteAttachmemt: function() {
            var confirmMessage = string.substitute(this.confirmDeleteText, [this.entry.description]);

            if (!confirm(confirmMessage)) {
                return;
            }

            var entry = this.createEntryForDelete(this.entry),
                request = this.createRequest();

            if (request) {
                request['delete'](entry, {
                    success: this.onDeleteSuccess,
                    failure: this.onRequestDataFailure,
                    scope: this
                });
            }
        },
        onDeleteSuccess: function() {
            var views = [
               // App.getView('opportunityproduct_related'),
               // App.getView('opportunity_detail'),
               // App.getView('opportunity_list')
            ];

            array.forEach(views, function(view) {
                if (view) {
                    view.refreshRequired = true;
                }
            }, this);

            connect.publish('/app/refresh', [{
                resourceKind: this.resourceKind
            }]);
            ReUI.back();
        },
        createToolLayout: function() {
            return this.tools || (this.tools = {
                'tbar': [{
                        id: 'edit',
                        action: 'navigateToEditView',
                        security: App.getViewSecurity(this.editView, 'update')
                    }, {
                        id: 'deleteAttachment',
                        icon: 'content/images/icons/del_24.png',
                        action: 'deleteAttachment',
                        title: this.deleteAttachmentTitleText
                    }]
            });
        },
        createLayout: function() {
            var layout, details;
            layout = this.layout || (this.layout = []);

            if (layout.length > 0) {
                return layout;
            }

            details = {
                title: this.detailsText,
                name: 'DetailsSection',
                children: [
                    {
                        label: this.descriptionText,
                        name: 'description',
                        property: 'description'
                    }, {
                        label: this.fileNameText,
                        name: 'fileName',
                        property: 'fileName'
                    }, {
                        label: this.fileSizeText,
                        name: 'fileSize',
                        property: 'fileSize',
                        renderer: format.fileSize
                    }, {
                        label: this.attachDateText,
                        name: 'attachDate',
                        property: 'attachDate',
                        //renderer: format.fileSize
                    }, {
                        label: this.userText,
                        name: 'user',
                        property: 'user.$descriptor',
                        //renderer: format.fileSize
                    }
                ]
            };

            layout = this.layout || (this.layout = []);

            if (layout.length > 0) {
                return layout;
            }

            layout.push(details);

            return layout;
        }
    });
});


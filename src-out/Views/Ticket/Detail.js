define('crm/Views/Ticket/Detail', ['exports', 'module', 'dojo/_base/declare', 'dojo/_base/lang', 'dojo/query', 'dojo/dom-class', '../../Format', 'argos/ErrorManager', 'argos/Detail'], function (exports, module, _dojo_baseDeclare, _dojo_baseLang, _dojoQuery, _dojoDomClass, _Format, _argosErrorManager, _argosDetail) {
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    var _declare = _interopRequireDefault(_dojo_baseDeclare);

    var _lang = _interopRequireDefault(_dojo_baseLang);

    var _query = _interopRequireDefault(_dojoQuery);

    var _domClass = _interopRequireDefault(_dojoDomClass);

    var _format = _interopRequireDefault(_Format);

    var _ErrorManager = _interopRequireDefault(_argosErrorManager);

    var _Detail = _interopRequireDefault(_argosDetail);

    /**
     * @class crm.Views.Ticket.Detail
     *
     * @extends argos.Detail
     *
     * @requires argos.ErrorManager
     *
     * @requires crm.Format
     */
    var __class = (0, _declare['default'])('crm.Views.Ticket.Detail', [_Detail['default']], {
        //Localization
        accountText: 'account',
        areaText: 'area',
        assignedDateText: 'assigned date',
        assignedToText: 'assigned to',
        completedByText: 'completed by',
        categoryText: 'category',
        contactText: 'contact',
        contractText: 'contract',
        descriptionText: 'desc',
        issueText: 'issue',
        needByText: 'needed date',
        notesText: 'comments',
        phoneText: 'phone',
        actionsText: 'Quick Actions',
        relatedAttachmentText: 'Attachments',
        relatedAttachmentTitleText: 'Ticket Attachments',
        relatedActivitiesText: 'Activities',
        relatedItemsText: 'Related Items',
        resolutionText: 'resolution',
        sourceText: 'source',
        statusText: 'status',
        subjectText: 'subject',
        ticketIdText: 'ticket number',
        titleText: 'Ticket',
        urgencyText: 'urgency',
        scheduleActivityText: 'Schedule activity',
        moreDetailsText: 'More Details',
        relatedTicketActivitiesText: 'Ticket Activities',
        loadingText: 'loading...',

        //View Properties
        id: 'ticket_detail',
        editView: 'ticket_edit',
        security: 'Entities/Ticket/View',
        querySelect: ['Account/AccountName', 'Account/MainPhone', 'Area', 'AssignedDate', 'AssignedTo/OwnerDescription', 'Category', 'Contact/NameLF', 'Contact/WorkPhone', 'Contract/ReferenceNumber', 'Issue', 'NeededByDate', 'Notes', 'ViaCode', 'StatusCode', 'UrgencyCode', 'Subject', 'TicketNumber', 'TicketProblem/Notes', 'TicketSolution/Notes', 'Urgency/Description', 'Urgency/UrgencyCode', 'CompletedBy/OwnerDescription'],
        resourceKind: 'tickets',

        scheduleActivity: function scheduleActivity() {
            App.navigateToActivityInsertView();
        },

        createPicklistRequest: function createPicklistRequest(predicate) {
            var request, uri;

            request = new Sage.SData.Client.SDataResourceCollectionRequest(App.getService()).setResourceKind('picklists').setContractName('system');
            uri = request.getUri();

            uri.setPathSegment(Sage.SData.Client.SDataUri.ResourcePropertyIndex, 'items');
            uri.setCollectionPredicate(predicate);

            request.allowCacheUse = true;

            return request;
        },

        requestCodeData: function requestCodeData(row, node, value, entry, predicate) {
            var request = this.createPicklistRequest(predicate);
            request.read({
                success: _lang['default'].hitch(this, this.onRequestCodeDataSuccess, row, node, value, entry),
                failure: this.onRequestCodeDataFailure,
                scope: this
            });
        },

        onRequestCodeDataSuccess: function onRequestCodeDataSuccess(row, node, value, entry, data) {
            var codeText = this.processCodeDataFeed(data, entry[row.property]);
            this.setNodeText(node, codeText);
            this.entry[row.name] = codeText;
        },

        onRequestCodeDataFailure: function onRequestCodeDataFailure(response, o) {
            _ErrorManager['default'].addError(response, o, this.options, 'failure');
        },

        processCodeDataFeed: function processCodeDataFeed(feed, currentValue, options) {
            var keyProperty, textProperty, i;

            keyProperty = options && options.keyProperty ? options.keyProperty : '$key';
            textProperty = options && options.textProperty ? options.textProperty : 'text';

            for (i = 0; i < feed.$resources.length; i++) {
                if (feed.$resources[i][keyProperty] === currentValue) {
                    return feed.$resources[i][textProperty];
                }
            }

            return currentValue;
        },
        setNodeText: function setNodeText(node, value) {
            _domClass['default'].remove(node, 'content-loading');

            (0, _query['default'])('span', node).text(value);
        },

        createLayout: function createLayout() {
            return this.layout || (this.layout = [{
                list: true,
                title: this.actionsText,
                cls: 'action-list',
                name: 'QuickActionsSection',
                children: [{
                    name: 'ScheduleActivityAction',
                    property: 'TicketNumber',
                    label: this.scheduleActivityText,
                    iconClass: 'fa fa-calendar fa-lg',
                    action: 'scheduleActivity'
                }]
            }, {
                title: this.detailsText,
                name: 'DetailsSection',
                children: [{
                    name: 'Account.AccountName',
                    property: 'Account.AccountName',
                    descriptor: 'Account.AccountName',
                    label: this.accountText,
                    view: 'account_detail',
                    key: 'Account.$key'
                }, {
                    name: 'Contact.NameLF',
                    property: 'Contact.NameLF',
                    descriptor: 'Contact.NameLF',
                    label: this.contactText,
                    view: 'contact_detail',
                    key: 'Contact.$key'
                }, {
                    label: this.assignedToText,
                    name: 'AssignedTo.OwnerDescription',
                    property: 'AssignedTo.OwnerDescription'
                }, {
                    label: this.urgencyText,
                    name: 'Urgency.Description',
                    property: 'Urgency.Description'
                }, {
                    label: this.needByText,
                    name: 'NeededByDate',
                    property: 'NeededByDate',
                    renderer: _format['default'].date
                }]
            }, {
                title: this.moreDetailsText,
                name: 'MoreDetailsSection',
                collapsed: true,
                children: [{
                    label: this.areaText,
                    name: 'Area',
                    property: 'Area'
                }, {
                    label: this.categoryText,
                    name: 'Category',
                    property: 'Category'
                }, {
                    label: this.issueText,
                    name: 'Issue',
                    property: 'Issue'
                }, {
                    label: this.subjectText,
                    name: 'Subject',
                    property: 'Subject'
                }, {
                    label: this.descriptionText,
                    name: 'TicketProblem.Notes',
                    property: 'TicketProblem.Notes'
                }, {
                    label: this.statusText,
                    cls: 'content-loading',
                    value: this.loadingText,
                    name: 'StatusCode',
                    property: 'StatusCode',
                    onCreate: this.requestCodeData.bindDelegate(this, 'name eq "Ticket Status"')
                }, {
                    label: this.completedByText,
                    name: 'CompletedBy.OwnerDescription',
                    property: 'CompletedBy.OwnerDescription'
                }, {
                    label: this.contractText,
                    name: 'Contract.ReferenceNumber',
                    property: 'Contract.ReferenceNumber'
                }, {
                    label: this.sourceText,
                    name: 'ViaCode',
                    property: 'ViaCode',
                    value: this.loadingText,
                    cls: 'content-loading',
                    onCreate: this.requestCodeData.bindDelegate(this, 'name eq "Source"')
                }, {
                    label: this.assignedDateText,
                    name: 'AssignedDate',
                    property: 'AssignedDate',
                    renderer: _format['default'].date
                }, {
                    label: this.resolutionText,
                    name: 'TicketSolution.Notes',
                    property: 'TicketSolution.Notes'
                }, {
                    label: this.notesText,
                    name: 'Notes',
                    property: 'Notes'
                }]
            }, {
                list: true,
                title: this.relatedItemsText,
                name: 'RelatedItemsSection',
                children: [{
                    name: 'ActivityRelated',
                    label: this.relatedActivitiesText,
                    view: 'activity_related',
                    where: this.formatRelatedQuery.bindDelegate(this, 'TicketId eq "${0}"')
                }, {
                    name: 'TicketActivityRelated',
                    label: this.relatedTicketActivitiesText,
                    view: 'ticketactivity_related',
                    where: this.formatRelatedQuery.bindDelegate(this, 'Ticket.Id eq "${0}"')
                }, {
                    name: 'AttachmentRelated',
                    label: this.relatedAttachmentText,
                    where: this.formatRelatedQuery.bindDelegate(this, 'ticketId eq "${0}"'), // must be lower case because of feed
                    view: 'ticket_attachment_related',
                    title: this.relatedAttachmentTitleText
                }]
            }]);
        }
    });

    _lang['default'].setObject('Mobile.SalesLogix.Views.Ticket.Detail', __class);
    module.exports = __class;
});

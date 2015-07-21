define('crm/Views/Activity/Complete', ['exports', 'module', 'dojo/_base/declare', 'dojo/_base/lang', 'dojo/_base/array', 'dojo/_base/connect', 'dojo/string', '../../Environment', '../../Validator', '../../Template', 'argos/Utility', 'argos/Edit', 'moment'], function (exports, module, _dojo_baseDeclare, _dojo_baseLang, _dojo_baseArray, _dojo_baseConnect, _dojoString, _Environment, _Validator, _Template, _argosUtility, _argosEdit, _moment) {
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    var _declare = _interopRequireDefault(_dojo_baseDeclare);

    var _lang = _interopRequireDefault(_dojo_baseLang);

    var _array = _interopRequireDefault(_dojo_baseArray);

    var _connect = _interopRequireDefault(_dojo_baseConnect);

    var _string = _interopRequireDefault(_dojoString);

    var _environment = _interopRequireDefault(_Environment);

    var _validator = _interopRequireDefault(_Validator);

    var _template = _interopRequireDefault(_Template);

    var _utility = _interopRequireDefault(_argosUtility);

    var _Edit = _interopRequireDefault(_argosEdit);

    var _moment2 = _interopRequireDefault(_moment);

    /**
    * @class crm.Views.Activity.Complete
    *
    * @extends argos.Edit
    * @mixins argos.Edit
    *
    * @requires argos.Edit
    * @requires argos.Utility
    *
    * @requires crm.Environment
    * @requires crm.Validator
    * @requires crm.Template
    *
    * @requires moment
    *
    */
    var __class = (0, _declare['default'])('crm.Views.Activity.Complete', [_Edit['default']], {
        //Localization
        activityInfoText: 'Activity Info',
        accountText: 'account',
        contactText: 'contact',
        opportunityText: 'opportunity',
        ticketNumberText: 'ticket',
        companyText: 'company',
        leadText: 'lead',
        asScheduledText: 'as scheduled',
        categoryText: 'category',
        categoryTitleText: 'Activity Category',
        completedText: 'completed date',
        completedFormatText: 'M/D/YYYY h:mm A',
        completionText: 'Completion',
        durationText: 'duration',
        durationInvalidText: 'The field \'${2}\' must have a value.',
        carryOverNotesText: 'carry over notes',
        followUpText: 'follow-up',
        followUpTitleText: 'Follow-up type',
        leaderText: 'leader',
        longNotesText: 'notes',
        longNotesTitleText: 'Notes',
        otherInfoText: 'Other Info',
        priorityText: 'priority',
        priorityTitleText: 'Priority',
        regardingText: 'regarding',
        regardingTitleText: 'Activity Regarding',
        resultText: 'result',
        resultTitleText: 'Result',
        startingText: 'start date',
        startingFormatText: 'M/D/YYYY h:mm A',
        startingTimelessFormatText: 'M/D/YYYY',
        timelessText: 'timeless',
        durationValueText: {
            0: 'none',
            15: '15 minutes',
            30: '30 minutes',
            60: '1 hour',
            90: '1.5 hours',
            120: '2 hours'
        },
        followupValueText: {
            'none': 'None',
            'atPhoneCall': 'Phone Call',
            'atAppointment': 'Meeting',
            'atToDo': 'To-Do',
            'atPersonal': 'Personal Activity'
        },

        //View Properties
        id: 'activity_complete',
        followupView: 'activity_edit',
        fieldsForLeads: ['AccountName', 'Lead'],
        fieldsForStandard: ['Account', 'Contact', 'Opportunity', 'Ticket'],
        picklistsByType: {
            'atAppointment': {
                'Category': 'Meeting Category Codes',
                'Description': 'Meeting Regarding',
                'Result': 'Meeting Result Codes'
            },
            'atLiterature': {
                'Description': 'Lit Request Regarding'
            },
            'atPersonal': {
                'Category': 'Meeting Category Codes',
                'Description': 'Personal Activity Regarding',
                'Result': 'Personal Activity Result Codes'
            },
            'atPhoneCall': {
                'Category': 'Phone Call Category Codes',
                'Description': 'Phone Call Regarding',
                'Result': 'Phone Call Result Codes'
            },
            'atToDo': {
                'Category': 'To Do Category Codes',
                'Description': 'To Do Regarding',
                'Result': 'To Do Result Codes'
            },
            'atEMail': {
                'Category': 'E-mail Category Codes',
                'Description': 'E-mail Regarding'
            }
        },

        entityName: 'Activity',
        querySelect: ['AccountId', 'AccountName', 'Alarm', 'AlarmTime', 'Category', 'ContactId', 'ContactName', 'CompletedDate', 'Description', 'Duration', 'Leader/$key', 'LeadId', 'LeadName', 'LongNotes', 'OpportunityId', 'OpportunityName', 'Priority', 'Regarding', 'Result', 'Rollover', 'StartDate', 'TicketId', 'TicketNumber', 'Timeless', 'Type', 'Recurring', 'RecurrenceState', 'AllowAdd', 'AllowEdit', 'AllowDelete', 'AllowComplete'],
        resourceKind: 'activities',
        contractName: 'system',

        init: function init() {
            this.inherited(arguments);

            this.connect(this.fields['Leader'], 'onChange', this.onLeaderChange);
            this.connect(this.fields['Timeless'], 'onChange', this.onTimelessChange);
            this.connect(this.fields['AsScheduled'], 'onChange', this.onAsScheduledChange);
            this.connect(this.fields['Followup'], 'onChange', this.onFollowupChange);
            this.connect(this.fields['Lead'], 'onChange', this.onLeadChange);
            this.connect(this.fields['Result'], 'onChange', this.onResultChange);
        },
        onResultChange: function onResultChange(value, field) {
            // Set the Result field back to the text value, and take the picklist code and set that to the ResultsCode
            field.setValue(value.text);

            // Max length for RESULTCODE is 8 chars, the sdata endpoint doesn't handle this, so we will truncate like the LAN if necessary
            this.fields['ResultCode'].setValue(/.{0,8}/ig.exec(value.key));
        },
        isActivityForLead: function isActivityForLead(entry) {
            return entry && /^[\w]{12}$/.test(entry['LeadId']);
        },
        beforeTransitionTo: function beforeTransitionTo() {
            this.inherited(arguments);

            _array['default'].forEach(this.fieldsForStandard.concat(this.fieldsForLeads), function (item) {
                if (this.fields[item]) {
                    this.fields[item].hide();
                }
            }, this);

            var entry = this.options && this.options.entry;
            if (this.isActivityForLead(entry)) {
                _array['default'].forEach(this.fieldsForLeads, function (item) {
                    if (this.fields[item]) {
                        this.fields[item].show();
                    }
                }, this);
            } else {
                _array['default'].forEach(this.fieldsForStandard, function (item) {
                    if (this.fields[item]) {
                        this.fields[item].show();
                    }
                }, this);
            }
        },
        toggleSelectField: function toggleSelectField(field, disable) {
            if (disable) {
                field.disable();
            } else {
                field.enable();
            }
        },
        onTimelessChange: function onTimelessChange(value) {
            this.toggleSelectField(this.fields['Duration'], value);

            var startDateField = this.fields['StartDate'],
                startDate = startDateField.getValue();

            if (value) {
                startDateField['dateFormatText'] = this.startingTimelessFormatText;
                startDateField['showTimePicker'] = false;
                startDateField['timeless'] = true;
                if (!this.isDateTimeless(startDate)) {
                    startDate = startDate.clone().clearTime().add({ minutes: -1 * startDate.getTimezoneOffset(), seconds: 5 });
                }
                startDateField.setValue(startDate);
            } else {
                startDateField['dateFormatText'] = this.startingFormatText;
                startDateField['showTimePicker'] = true;
                startDateField['timeless'] = false;
                if (this.isDateTimeless(startDate)) {
                    startDate = startDate.clone().add({ minutes: startDate.getTimezoneOffset() + 1, seconds: -5 });
                }
                startDateField.setValue(startDate);
            }
        },
        isDateTimeless: function isDateTimeless(date) {
            if (!date) {
                return false;
            }
            if (date.getUTCHours() !== 0) {
                return false;
            }
            if (date.getUTCMinutes() !== 0) {
                return false;
            }
            if (date.getUTCSeconds() !== 5) {
                return false;
            }

            return true;
        },
        onAsScheduledChange: function onAsScheduledChange(scheduled) {
            var duration, startDate, completedDate;
            if (scheduled) {
                duration = this.fields['Duration'].getValue();
                startDate = (0, _moment2['default'])(this.fields['StartDate'].getValue());
                completedDate = startDate.add({ minutes: duration }).toDate();

                this.toggleSelectField(this.fields['CompletedDate'], true);
                this.fields['CompletedDate'].setValue(completedDate);
            } else {
                this.toggleSelectField(this.fields['CompletedDate'], false);
                this.fields['CompletedDate'].setValue(new Date());
            }
        },
        onFollowupChange: function onFollowupChange(value) {
            var disable = value === 'none' || value && value.key === 'none';
            this.toggleSelectField(this.fields['CarryOverNotes'], disable);
        },
        onLeadChange: function onLeadChange(value, field) {
            var selection = field.getSelection();

            if (selection && this.insert) {
                this.fields['Company'].setValue(_utility['default'].getValue(selection, 'Company'));
            }
        },
        formatPicklistForType: function formatPicklistForType(type, which) {
            return this.picklistsByType[type] && this.picklistsByType[type][which];
        },
        setValues: function setValues() {
            this.inherited(arguments);
            this.fields['CarryOverNotes'].setValue(true);
            this.fields['CompletedDate'].setValue(new Date());
            this.fields['Followup'].setValue('none');
            this.fields['Result'].setValue('Complete');
            this.fields['ResultCode'].setValue('COM');

            this.toggleSelectField(this.fields['CarryOverNotes'], true);
            this.toggleSelectField(this.fields['CompletedDate'], false);
        },
        onLeaderChange: function onLeaderChange(value, field) {
            var userId = field.getValue();
            this.fields['UserId'].setValue(userId && userId['$key']);
        },
        formatFollowupText: function formatFollowupText(val, key, text) {
            return this.followupValueText[key] || text;
        },
        createDurationData: function createDurationData() {
            var list = [],
                duration;

            for (duration in this.durationValueText) {
                if (this.durationValueText.hasOwnProperty(duration)) {
                    list.push({
                        '$key': duration,
                        '$descriptor': this.durationValueText[duration]
                    });
                }
            }

            return { '$resources': list };
        },
        createFollowupData: function createFollowupData() {
            var list = [],
                followup;

            for (followup in this.followupValueText) {
                if (this.followupValueText.hasOwnProperty(followup)) {
                    list.push({
                        '$key': followup,
                        '$descriptor': this.followupValueText[followup]
                    });
                }
            }

            return { '$resources': list };
        },
        navigateToFollowUpView: function navigateToFollowUpView(entry) {
            var view = App.getView(this.followupView),
                followupEntry = {
                'Type': this.fields['Followup'].getValue(),
                'Description': entry.Description,
                'AccountId': entry.AccountId,
                'AccountName': entry.AccountName,
                'ContactId': entry.ContactId,
                'ContactName': entry.ContactName,
                'LeadId': entry.LeadId,
                'LeadName': entry.LeadName,
                'LongNotes': this.fields['CarryOverNotes'].getValue() && entry['LongNotes'] || '',
                'OpportunityId': entry.OpportunityId,
                'OpportunityName': entry.OpportunityName,
                'StartDate': (0, _moment2['default'])().toDate(),
                'TicketId': entry.TicketId,
                'TicketNumber': entry.TicketNumber
            };

            //Return to activity list view after follow up.
            view.show({
                entry: followupEntry,
                insert: true,
                title: this.followupValueText[this.fields['Followup'].getValue()]
            }, {
                returnTo: -1
            });
        },
        completeActivity: function completeActivity(entry, callback) {
            if (!entry['$key']) {
                return;
            }

            var leader, success, request, completeActivityEntry;

            leader = this.fields['Leader'].getValue();
            completeActivityEntry = {
                '$name': 'ActivityComplete',
                'request': {
                    'entity': { '$key': entry['$key'] },
                    'ActivityId': entry['$key'],
                    'userId': leader['$key'],
                    'result': this.fields['Result'].getValue(),
                    'resultCode': this.fields['ResultCode'].getValue(),
                    'completeDate': this.fields['CompletedDate'].getValue()
                }
            };

            success = (function (scope, callback, entry) {
                return function () {
                    _environment['default'].refreshStaleDetailViews();
                    _connect['default'].publish('/app/refresh', [{
                        resourceKind: 'history'
                    }]);

                    callback.apply(scope, [entry]);
                };
            })(this, callback, entry);

            request = new Sage.SData.Client.SDataServiceOperationRequest(this.getService()).setResourceKind('activities').setContractName('system').setOperationName('Complete');

            request.execute(completeActivityEntry, {
                success: success,
                failure: this.onRequestFailure,
                scope: this
            });
        },
        onUpdateCompleted: function onUpdateCompleted(entry) {
            if (!entry) {
                return;
            }

            var followup = this.fields['Followup'].getValue() === 'none' ? this.getInherited(arguments) : this.navigateToFollowUpView;

            this.completeActivity(entry, followup);
        },
        formatDependentQuery: function formatDependentQuery(dependentValue, format, property) {
            property = property || '$key';

            return _string['default'].substitute(format, [_utility['default'].getValue(dependentValue, property)]);
        },
        createLayout: function createLayout() {
            return this.layout || (this.layout = [{
                title: this.activityInfoText,
                name: 'ActivityInfoSection',
                collapsed: false,
                children: [{
                    name: 'Type',
                    property: 'Type',
                    type: 'hidden'
                }, {
                    dependsOn: 'Type',
                    label: this.regardingText,
                    name: 'Description',
                    property: 'Description',
                    picklist: this.formatPicklistForType.bindDelegate(this, 'Description'),
                    title: this.regardingTitleText,
                    orderBy: 'text asc',
                    type: 'picklist',
                    maxTextLength: 64,
                    validator: _validator['default'].exceedsMaxTextLength
                }, {
                    label: this.longNotesText,
                    noteProperty: false,
                    name: 'LongNotes',
                    property: 'LongNotes',
                    title: this.longNotesTitleText,
                    type: 'note',
                    view: 'text_edit'
                }, {
                    label: this.startingText,
                    name: 'StartDate',
                    property: 'StartDate',
                    type: 'date',
                    showTimePicker: true,
                    formatString: this.startingFormatText,
                    minValue: new Date(1900, 0, 1),
                    validator: [_validator['default'].exists, _validator['default'].isDateInRange]
                }, {
                    label: this.durationText,
                    title: this.durationTitleText,
                    name: 'Duration',
                    property: 'Duration',
                    type: 'duration',
                    view: 'select_list',
                    data: this.createDurationData(),
                    validator: {
                        fn: function fn(val, field) {
                            if (field.isDisabled()) {
                                return false;
                            }
                            if (!/^\d+$/.test(val)) {
                                return true;
                            }
                        },
                        message: this.durationInvalidText
                    }
                }, {
                    label: this.timelessText,
                    name: 'Timeless',
                    property: 'Timeless',
                    type: 'boolean'
                }]
            }, {
                title: this.completionText,
                name: 'CompletionSection',
                collapsed: false,
                children: [{
                    label: this.asScheduledText,
                    include: false,
                    name: 'AsScheduled',
                    property: 'AsScheduled',
                    type: 'boolean'
                }, {
                    label: this.completedText,
                    name: 'CompletedDate',
                    property: 'CompletedDate',
                    type: 'date',
                    showTimePicker: true,
                    formatString: this.completedFormatText,
                    minValue: new Date(1900, 0, 1),
                    validator: [_validator['default'].exists, _validator['default'].isDateInRange]
                }, {
                    dependsOn: 'Type',
                    label: this.resultText,
                    name: 'Result',
                    property: 'Result',
                    storageMode: 'code', // The onResultChange changes the value back to text
                    picklist: this.formatPicklistForType.bindDelegate(this, 'Result'),
                    title: this.resultTitleText,
                    orderBy: 'text asc',
                    type: 'picklist',
                    maxTextLength: 64,
                    validator: _validator['default'].exceedsMaxTextLength
                }, {
                    name: 'ResultCode',
                    property: 'ResultCode',
                    type: 'hidden'
                }, {
                    label: this.followUpText,
                    title: this.followUpTitleText,
                    name: 'Followup',
                    property: 'Followup',
                    type: 'select',
                    view: 'select_list',
                    textRenderer: this.formatFollowupText.bindDelegate(this),
                    requireSelection: true,
                    valueKeyProperty: false,
                    valueTextProperty: false,
                    data: this.createFollowupData(),
                    include: false
                }, {
                    label: this.carryOverNotesText,
                    include: false,
                    name: 'CarryOverNotes',
                    property: 'CarryOverNotes',
                    type: 'boolean'
                }]
            }, {
                title: this.otherInfoText,
                name: 'OtherInfoSection',
                collapsed: false,
                children: [{
                    label: this.priorityText,
                    name: 'Priority',
                    property: 'Priority',
                    picklist: 'Priorities',
                    title: this.priorityTitleText,
                    type: 'picklist',
                    maxTextLength: 64,
                    validator: _validator['default'].exceedsMaxTextLength
                }, {
                    dependsOn: 'Type',
                    label: this.categoryText,
                    name: 'Category',
                    property: 'Category',
                    picklist: this.formatPicklistForType.bindDelegate(this, 'Category'),
                    orderBy: 'text asc',
                    title: this.categoryTitleText,
                    type: 'picklist',
                    maxTextLength: 64,
                    validator: _validator['default'].exceedsMaxTextLength
                }, {
                    type: 'hidden',
                    name: 'UserId',
                    property: 'UserId'
                }, {
                    label: this.leaderText,
                    name: 'Leader',
                    property: 'Leader',
                    include: false,
                    type: 'lookup',
                    textProperty: 'UserInfo',
                    textTemplate: _template['default'].nameLF,
                    requireSelection: true,
                    view: 'user_list'
                }, {
                    label: this.accountText,
                    name: 'Account',
                    property: 'Account',
                    type: 'lookup',
                    emptyText: '',
                    applyTo: '.',
                    valueKeyProperty: 'AccountId',
                    valueTextProperty: 'AccountName',
                    view: 'account_related'
                }, {
                    dependsOn: 'Account',
                    label: this.contactText,
                    name: 'Contact',
                    property: 'Contact',
                    type: 'lookup',
                    emptyText: '',
                    applyTo: '.',
                    valueKeyProperty: 'ContactId',
                    valueTextProperty: 'ContactName',
                    view: 'contact_related',
                    where: this.formatDependentQuery.bindDelegate(this, 'Account.Id eq "${0}"', 'AccountId')
                }, {
                    dependsOn: 'Account',
                    label: this.opportunityText,
                    name: 'Opportunity',
                    property: 'Opportunity',
                    type: 'lookup',
                    emptyText: '',
                    applyTo: '.',
                    valueKeyProperty: 'OpportunityId',
                    valueTextProperty: 'OpportunityName',
                    view: 'opportunity_related',
                    where: this.formatDependentQuery.bindDelegate(this, 'Account.Id eq "${0}"', 'AccountId')
                }, {
                    dependsOn: 'Account',
                    label: this.ticketNumberText,
                    name: 'Ticket',
                    property: 'Ticket',
                    type: 'lookup',
                    emptyText: '',
                    applyTo: '.',
                    valueKeyProperty: 'TicketId',
                    valueTextProperty: 'TicketNumber',
                    view: 'ticket_related',
                    where: this.formatDependentQuery.bindDelegate(this, 'Account.Id eq "${0}"', 'AccountId')
                }, {
                    label: this.leadText,
                    name: 'Lead',
                    property: 'Lead',
                    type: 'lookup',
                    emptyText: '',
                    applyTo: '.',
                    valueKeyProperty: 'LeadId',
                    valueTextProperty: 'LeadName',
                    view: 'lead_related'
                }, {
                    label: this.companyText,
                    name: 'AccountName',
                    property: 'AccountName',
                    type: 'text'
                }]
            }]);
        }
    });

    _lang['default'].setObject('Mobile.SalesLogix.Views.Activity.Complete', __class);
    module.exports = __class;
});
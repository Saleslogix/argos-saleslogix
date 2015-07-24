define('crm/Views/History/Edit', ['exports', 'module', 'dojo/_base/declare', 'dojo/_base/lang', 'dojo/_base/array', 'dojo/string', '../../Environment', '../../Validator', 'argos/Utility', 'argos/Edit'], function (exports, module, _dojo_baseDeclare, _dojo_baseLang, _dojo_baseArray, _dojoString, _Environment, _Validator, _argosUtility, _argosEdit) {
    function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

    var _declare = _interopRequireDefault(_dojo_baseDeclare);

    var _lang = _interopRequireDefault(_dojo_baseLang);

    var _array = _interopRequireDefault(_dojo_baseArray);

    var _string = _interopRequireDefault(_dojoString);

    var _environment = _interopRequireDefault(_Environment);

    var _validator = _interopRequireDefault(_Validator);

    var _utility = _interopRequireDefault(_argosUtility);

    var _Edit = _interopRequireDefault(_argosEdit);

    /**
     * @class crm.Views.History.Edit
     *
     * @extends argos.Edit
     *
     * @requires argos.Utility
     *
     * @requires crm.Environment
     * @requires crm.Validator
     */
    var __class = (0, _declare['default'])('crm.Views.History.Edit', [_Edit['default']], {
        //Localization
        accountText: 'account',
        noteDescriptionTitleText: 'Note Description',
        contactText: 'contact',
        longNotesText: 'notes',
        longNotesTitleText: 'Notes',
        opportunityText: 'opportunity',
        ticketNumberText: 'ticket',
        regardingText: 'regarding',
        isLeadText: 'for lead',
        startingText: 'time',
        startingFormatText: 'M/D/YYYY h:mm A',
        titleText: 'Note',
        companyText: 'company',
        leadText: 'lead',
        relatedItemsText: 'Related Items',
        yesText: 'YES',
        noText: 'NO',
        validationText: "The field '${2}' must have a value",
        validationCanEditText: 'You are not allowed to edit',
        //View Properties
        id: 'history_edit',
        fieldsForLeads: ['AccountName', 'Lead'],
        fieldsForStandard: ['Account', 'Contact', 'Opportunity', 'Ticket'],
        entityName: 'History',
        resourceKind: 'history',
        insertSecurity: null, //'Entities/History/Add',
        updateSecurity: null, //'Entities/History/Edit',
        querySelect: ['AccountId', 'AccountName', 'Category', 'ModifyDate', 'CompletedDate', 'ContactId', 'ContactName', 'CompletedUser', 'Description', 'Duration', 'Notes', 'LongNotes', 'OpportunityId', 'OpportunityName', 'Priority', 'StartDate', 'TicketId', 'TicketNumber', 'LeadId', 'LeadName', 'Timeless', 'Type', 'UserName', 'UserId'],
        existsRE: /^[\w]{12}$/,
        init: function init() {
            this.inherited(arguments);

            this.connect(this.fields['Lead'], 'onChange', this.onLeadChange);
            this.connect(this.fields['IsLead'], 'onChange', this.onIsLeadChange);

            this.connect(this.fields['Account'], 'onChange', this.onAccountChange);
            this.connect(this.fields['Contact'], 'onChange', this.onAccountDependentChange);
            this.connect(this.fields['Opportunity'], 'onChange', this.onAccountDependentChange);
            this.connect(this.fields['Ticket'], 'onChange', this.onAccountDependentChange);
        },
        isHistoryForLead: function isHistoryForLead(entry) {
            return entry && this.existsRE.test(entry['LeadId']);
        },
        isInLeadContext: function isInLeadContext() {
            var insert, entry, isLeadContext, lead, context;
            insert = this.options && this.options.insert;
            entry = this.options && this.options.entry;
            isLeadContext = false;
            context = this._getNavContext();
            if (context && context.resourceKind === 'leads') {
                isLeadContext = true;
            }

            lead = insert && isLeadContext || this.isHistoryForLead(entry);
            return !!lead;
        },
        beforeTransitionTo: function beforeTransitionTo() {
            this.inherited(arguments);

            // we hide the lead or standard fields here, as the view is currently hidden, in order to prevent flashing.
            // the value for the 'IsLead' field will be set later, based on the value derived here.

            // todo: there is an issue when refreshing the edit view as options.isLead is persisted in the navigation state.
            if (this.options.isForLead !== undefined) {
                return;
            }

            this.options.isForLead = this.isInLeadContext();

            if (this.options.isForLead) {
                this.showFieldsForLead();
            } else {
                this.showFieldsForStandard();
            }
        },
        onIsLeadChange: function onIsLeadChange(value) {
            this.options.isForLead = value;

            if (this.options.isForLead) {
                this.showFieldsForLead();
            } else {
                this.showFieldsForStandard();
            }
        },
        onLeadChange: function onLeadChange(value, field) {
            var selection = field.getSelection();

            if (selection && this.insert) {
                this.fields['AccountName'].setValue(_utility['default'].getValue(selection, 'Company'));
            }
        },
        onAccountChange: function onAccountChange(value) {
            var fields = this.fields;
            _array['default'].forEach(['Contact', 'Opportunity', 'Ticket'], function (f) {
                if (value) {
                    fields[f].dependsOn = 'Account';
                    fields[f].where = _string['default'].substitute('Account.Id eq "${0}"', [value['AccountId'] || value['key']]);

                    if (fields[f].currentSelection && fields[f].currentSelection.Account['$key'] !== (value['AccountId'] || value['key'])) {

                        fields[f].setValue(false);
                    }
                } else {
                    fields[f].dependsOn = null;
                    fields[f].where = 'Account.AccountName ne null';
                    fields[f].setValue(false);
                }
            });
        },
        onAccountDependentChange: function onAccountDependentChange(value, field) {
            if (value && !field.dependsOn && field.currentSelection && field.currentSelection.Account) {

                var accountField = this.fields['Account'];
                accountField.setValue({
                    'AccountId': field.currentSelection.Account['$key'],
                    'AccountName': field.currentSelection.Account['AccountName']
                });
                this.onAccountChange(accountField.getValue(), accountField);
            }
        },
        showFieldsForLead: function showFieldsForLead() {
            _array['default'].forEach(this.fieldsForStandard.concat(this.fieldsForStandard), function (item) {
                if (this.fields[item]) {
                    this.fields[item].hide();
                }
            }, this);

            _array['default'].forEach(this.fieldsForLeads, function (item) {
                if (this.fields[item]) {
                    this.fields[item].show();
                }
            }, this);
        },
        showFieldsForStandard: function showFieldsForStandard() {
            _array['default'].forEach(this.fieldsForStandard.concat(this.fieldsForLeads), function (item) {
                if (this.fields[item]) {
                    this.fields[item].hide();
                }
            }, this);

            _array['default'].forEach(this.fieldsForStandard, function (item) {
                if (this.fields[item]) {
                    this.fields[item].show();
                }
            }, this);
        },
        onInsertSuccess: function onInsertSuccess() {
            _environment['default'].refreshStaleDetailViews();
            this.inherited(arguments);
        },
        applyContext: function applyContext() {
            var found, user, lookup;

            found = this._getNavContext();

            lookup = {
                'accounts': this.applyAccountContext,
                'contacts': this.applyContactContext,
                'opportunities': this.applyOpportunityContext,
                'leads': this.applyLeadContext,
                'tickets': this.applyTicketContext
            };

            if (found && lookup[found.resourceKind]) {
                lookup[found.resourceKind].call(this, found);
            }

            user = App.context && App.context.user;

            this.fields['Type'].setValue('atNote');
            this.fields['UserId'].setValue(user && user['$key']);
            this.fields['UserName'].setValue(user && user['$descriptor']);
            this.fields['StartDate'].setValue(new Date());
            this.fields['Text'].setValue('');
        },
        _getNavContext: function _getNavContext() {
            var found;
            found = App.queryNavigationContext(function (o) {
                var context = o.options && o.options.source || o;
                return /^(accounts|contacts|opportunities|leads|tickets)$/.test(context.resourceKind) && context.key;
            });
            found = found && found.options && found.options.source || found;
            return found;
        },
        applyAccountContext: function applyAccountContext(context) {
            var accountField = this.fields['Account'],
                accountValue = {
                'AccountId': context.key,
                'AccountName': context.descriptor
            };
            accountField.setValue(accountValue);
            this.onAccountChange(accountValue, accountField);
        },
        applyLeadContext: function applyLeadContext(context) {
            var view = App.getView(context.id),
                leadField,
                leadValue,
                isLeadField,
                entry = context.entry || view && view.entry;

            if (!entry || !entry['$key']) {
                return;
            }

            leadField = this.fields['Lead'];
            leadValue = {
                'LeadId': entry['$key'],
                'LeadName': entry['$descriptor']
            };

            leadField.setValue(leadValue);
            this.onLeadChange(leadValue, leadField);

            this.fields['AccountName'].setValue(entry['Company']);

            isLeadField = this.fields['IsLead'];
            isLeadField.setValue(context.resourceKind === 'leads');
            this.onIsLeadChange(isLeadField.getValue(), isLeadField);
        },
        applyOpportunityContext: function applyOpportunityContext(context) {
            var opportunityField, accountEntry, accountField, view, entry;

            opportunityField = this.fields['Opportunity'];
            opportunityField.setValue({
                'OpportunityId': context.key,
                'OpportunityName': context.descriptor
            });

            this.onAccountDependentChange(opportunityField.getValue, opportunityField);

            if (context.entry && context.entry['Account']) {
                accountEntry = context.entry['Account'];
            } else {
                view = App.getView(context.id);
                entry = view && view.entry;
                accountEntry = entry && entry['Account'];
            }

            if (accountEntry) {
                accountField = this.fields['Account'];
                accountField.setValue({
                    'AccountId': accountEntry['$key'],
                    'AccountName': accountEntry['AccountName']
                });
                this.onAccountChange(accountField.getValue(), accountField);
            }

            // todo: find a good way to get the primary contact and apply
        },
        applyContactContext: function applyContactContext(context) {
            var contactField, accountEntry, view, entry, accountField;

            contactField = this.fields['Contact'];
            contactField.setValue({
                'ContactId': context.key,
                'ContactName': context.descriptor
            });

            this.onAccountDependentChange(contactField.getValue(), contactField);

            if (context.entry && context.entry['Account']) {
                accountEntry = context.entry['Account'];
            } else {
                view = App.getView(context.id);
                entry = view && view.entry;
                accountEntry = entry && entry['Account'];
            }

            if (accountEntry) {
                accountField = this.fields['Account'];
                accountField.setValue({
                    'AccountId': accountEntry['$key'],
                    'AccountName': accountEntry['AccountName']
                });
                this.onAccountChange(accountField.getValue(), accountField);
            }
        },
        applyTicketContext: function applyTicketContext(context) {
            var ticketField, accountEntry, accountField, contactEntry, contactField, view, entry;

            ticketField = this.fields['Ticket'];
            ticketField.setValue({
                'TicketId': context.key,
                'TicketNumber': context.descriptor
            });
            this.onAccountDependentChange(ticketField.getValue(), ticketField);

            if (context.entry && context.entry['Account']) {
                accountEntry = context.entry['Account'];
                contactEntry = context.entry['Contact'];
            } else {
                view = App.getView(context.id);
                entry = view && view.entry;
                accountEntry = entry && entry['Account'];
                contactEntry = entry && entry['Contact'];
            }

            if (accountEntry) {
                accountField = this.fields['Account'];
                accountField.setValue({
                    'AccountId': accountEntry['$key'],
                    'AccountName': accountEntry['AccountName']
                });
                this.onAccountChange(accountField.getValue(), accountField);
            }

            if (contactEntry) {
                contactField = this.fields['Contact'];
                contactField.setValue({
                    'ContactId': contactEntry['$key'],
                    'ContactName': contactEntry['NameLF']
                });
                this.onAccountDependentChange(contactField.getValue(), contactField);
            }
        },
        setValues: function setValues(values) {
            var isLeadField, field, value, leadCompany, longNotes, insert, lookup, denyEdit;

            this.inherited(arguments);
            isLeadField = this.fields['IsLead'];
            if (this.isInLeadContext()) {
                isLeadField.setValue(true);
                this.onIsLeadChange(true, isLeadField);
                field = this.fields['Lead'];
                value = _utility['default'].getValue(values, field.applyTo, {});
                field.setValue(value, true);
                leadCompany = _utility['default'].getValue(values, 'AccountName');
                if (leadCompany) {
                    this.fields['AccountName'].setValue(leadCompany);
                }
            } else {
                isLeadField.setValue(false);
            }

            longNotes = _utility['default'].getValue(values, 'LongNotes');
            if (longNotes) {
                this.fields['Text'].setValue(longNotes);
            }

            insert = this.options && this.options.insert;
            this.context = this._getNavContext();
            // entry may have been passed as full entry, reapply context logic to extract properties
            if (insert && this.context && this.context.resourceKind) {
                lookup = {
                    'accounts': this.applyAccountContext,
                    'contacts': this.applyContactContext,
                    'opportunities': this.applyOpportunityContext,
                    'leads': this.applyLeadContext,
                    'tickets': this.applyTicketContext
                };
                lookup[this.context.resourceKind].call(this, this.context);
            }
            this.enableFields();
            denyEdit = !this.currentUserCanEdit();
            if (denyEdit) {
                this.disableFields();
            }
        },
        disableFields: function disableFields(predicate) {
            for (var name in this.fields) {
                if (!predicate || predicate(this.fields[name])) {
                    this.fields[name].disable();
                }
            }
        },
        enableFields: function enableFields(predicate) {
            for (var name in this.fields) {
                if (!predicate || predicate(this.fields[name])) {
                    this.fields[name].enable();
                }
            }
        },
        currentUserCanEdit: function currentUserCanEdit() {
            var entry = this.options.entry || this.entry,
                insert = this.options && this.options.insert;
            if (!insert) {
                if (App.context['user']['$key'] === 'ADMIN') {
                    return true;
                }
                return entry && entry['UserId'] === App.context['user']['$key'];
            }
            return true;
        },
        formatDependentQuery: function formatDependentQuery(dependentValue, format, property) {
            var propertyValue;
            property = property || '$key';
            propertyValue = _utility['default'].getValue(dependentValue, property);
            if (propertyValue) {
                return _string['default'].substitute(format, [propertyValue]);
            }
            return '';
        },
        getValues: function getValues() {
            var values, text;

            values = this.inherited(arguments);

            if (this.fields['Text'].isDirty()) {
                text = this.fields['Text'].getValue();

                values = values || {};
                values['LongNotes'] = text;
                values['Notes'] = text && text.length > 250 ? text.substr(0, 250) : text;
            }

            return values;
        },
        _lookupApplyTo: function _lookupApplyTo(payload, value) {
            if (value === null) {
                payload[this.valueKeyProperty] = null;
                payload[this.valueTextProperty] = null;
            }
        },
        createLayout: function createLayout() {
            return this.layout || (this.layout = [{
                title: this.longNotesTitleText,
                name: 'NotesSection',
                children: [{
                    name: 'Text',
                    property: 'Text',
                    label: this.longNotesText,
                    cls: 'row-edit-text',
                    type: 'textarea',
                    autoFocus: true
                }]
            }, {
                title: this.detailsText,
                name: 'DetailsSection',
                children: [{
                    name: 'Type',
                    property: 'Type',
                    type: 'hidden'
                }, {
                    name: 'UserId',
                    property: 'UserId',
                    type: 'hidden'
                }, {
                    name: 'UserName',
                    property: 'UserName',
                    type: 'hidden'
                }, {
                    label: this.startingText,
                    name: 'StartDate',
                    property: 'StartDate',
                    type: 'date',
                    showTimePicker: true,
                    dateFormatText: this.startingFormatText,
                    minValue: new Date(1900, 0, 1),
                    validator: [_validator['default'].exists, _validator['default'].isDateInRange]
                }, {
                    dependsOn: 'Type',
                    label: this.regardingText,
                    name: 'Description',
                    property: 'Description',
                    picklist: 'Note Regarding',
                    orderBy: 'text asc',
                    title: this.noteDescriptionTitleText,
                    type: 'picklist'
                }]
            }, {
                title: this.relatedItemsText,
                name: 'RelatedItemsSection',
                children: [{
                    label: this.isLeadText,
                    name: 'IsLead',
                    include: false,
                    type: 'boolean',
                    onText: this.yesText,
                    offText: this.noText
                }, {
                    label: this.accountText,
                    name: 'Account',
                    property: 'Account',
                    type: 'lookup',
                    requireSelection: false,
                    emptyText: '',
                    applyTo: this._lookupApplyTo,
                    valueKeyProperty: 'AccountId',
                    valueTextProperty: 'AccountName',
                    view: 'account_related',
                    validator: {
                        fn: (function (value, field) {
                            var insert = field.owner.options && field.owner.options.insert;
                            if (insert && !value) {
                                return true;
                            }
                            return false;
                        }).bindDelegate(this),
                        message: this.validationText
                    }
                }, {
                    dependsOn: 'Account',
                    label: this.contactText,
                    name: 'Contact',
                    property: 'Contact',
                    type: 'lookup',
                    requireSelection: false,
                    emptyText: '',
                    applyTo: this._lookupApplyTo,
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
                    requireSelection: false,
                    emptyText: '',
                    applyTo: this._lookupApplyTo,
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
                    requireSelection: false,
                    emptyText: '',
                    applyTo: this._lookupApplyTo,
                    valueKeyProperty: 'TicketId',
                    valueTextProperty: 'TicketNumber',
                    view: 'ticket_related',
                    where: this.formatDependentQuery.bindDelegate(this, 'Account.Id eq "${0}"', 'AccountId')
                }, {
                    label: this.leadText,
                    name: 'Lead',
                    property: 'Lead',
                    type: 'lookup',
                    requireSelection: false,
                    emptyText: '',
                    applyTo: this._lookupApplyTo,
                    valueKeyProperty: 'LeadId',
                    valueTextProperty: 'LeadName',
                    view: 'lead_related',
                    validator: _validator['default'].exists
                }, {
                    label: this.companyText,
                    name: 'AccountName',
                    property: 'AccountName',
                    type: 'text'
                }, {
                    label: 'UserId',
                    name: 'UserId',
                    property: 'UserId',
                    type: 'hidden',
                    validator: {
                        fn: (function (value, field) {
                            var canEdit;
                            canEdit = field.owner.currentUserCanEdit();
                            if (!canEdit) {
                                return true;
                            }
                            return false;
                        }).bindDelegate(this),
                        message: this.validationCanEditText
                    }
                }]
            }]);
        }
    });

    _lang['default'].setObject('Mobile.SalesLogix.Views.History.Edit', __class);
    module.exports = __class;
});

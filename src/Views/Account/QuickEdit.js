/*
 * See copyright file.
 */

/**
 * @class crm.Views.Account.QuickEdit
 *
 * @extends argos.Edit
 *
 * @requires argos.Edit
 * @requires crm.Format
 * @requires crm.Validator
 * @requires crm.Template
 *
 */
define('crm/Views/Account/QuickEdit', [
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/string',
    '../../Validator',
    '../../Format',
    '../../Template',
    'argos/Edit'
], function(
    declare,
    lang,
    string,
    validator,
    format,
    template,
    Edit
) {

    var __class = declare('crm.Views.Account.QuickEdit', [Edit], {
        //Localization
        accountStatusTitleText: 'Account Status',
        accountSubTypeTitleText: 'Account Subtype',
        accountText: 'account',
        accountTypeTitleText: 'Account Type',
        statusText: 'status',
        subTypeText: 'subtype',
        titleText: 'Account',
        typeText: 'type',
        //View Properties
        entityName: 'Account',
        id: 'account_quick_edit',
        updateSecurity: 'Entities/Account/Edit',
        querySelect: [
            'AccountName',
            'Status',
            'SubType',
            'Type'
        ],
        resourceKind: 'accounts',

        formatDependentPicklist: function(dependentValue, format) {
            return string.substitute(format, [dependentValue]);
        },
        applyContext: function(templateEntry) {
            this.inherited(arguments);

            this.fields['Type'].setValue(templateEntry.Type);
            this.fields['Status'].setValue(templateEntry.Status);
        },
        createLayout: function() {
            return this.layout || (this.layout = [{
                relatedView: {
                    widgetType: 'relatedContext',
                    id: 'account_related_context_quickEdit',
                }
            },{
                label: this.accountText,
                name: 'AccountName',
                property: 'AccountName',
                type: 'text',
                validator: validator.notEmpty,
                autoFocus: true
            }, {
                label: this.typeText,
                name: 'Type',
                property: 'Type',
                picklist: 'Account Type',
                requireSelection: true,
                title: this.accountTypeTitleText,
                type: 'picklist'
            }, {
                dependsOn: 'Type',
                label: this.subTypeText,
                name: 'SubType',
                property: 'SubType',
                picklist: this.formatDependentPicklist.bindDelegate(
                    this, 'Account ${0}', true
                ),
                requireSelection: false,
                title: this.accountSubTypeTitleText,
                type: 'picklist',
                maxTextLength: 64,
                validator: validator.exceedsMaxTextLength
            }, {
                label: this.statusText,
                name: 'Status',
                property: 'Status',
                picklist: 'Account Status',
                requireSelection: false,
                title: this.accountStatusTitleText,
                type: 'picklist'
            }]);
        }
    });

    return __class;
});


import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import string from 'dojo/string';
import format from 'crm/Format';
import List from 'argos/List';

/**
 * @class crm.Views.ProductProgram.List
 *
 * @extends argos.List
 *
 * @requires crm.Format
 */
var __class = declare('crm.Views.ProductProgram.List', [List], {
    //Templates
    itemTemplate: new Simplate([
        '<h3>{%: $.Program %}</h3>',
        '<h4>',
        '{%: $.Price %}',
        '</h4>'
    ]),

    //Localization
    titleText: 'Product Programs',

    //View Properties
    id: 'productprogram_list',
    security: 'Entities/ProductProgram/View',
    queryOrderBy: 'Program',
    querySelect: [
        'DefaultProgram',
        'Program',
        'Price'
    ],
    resourceKind: 'productPrograms',

    formatSearchQuery: function(searchQuery) {
        return string.substitute('(upper(Program) like "${0}%")', [this.escapeSearchQuery(searchQuery.toUpperCase())]);
    }
});

lang.setObject('Mobile.SalesLogix.Views.ProductProgram.List', __class);
export default __class;

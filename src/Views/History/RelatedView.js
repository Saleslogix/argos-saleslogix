/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */

/**
 * @class crm.Views.History.RelatedView
 *
 * @extends argos.RelatedViewWidget
 *
 * @requires argos.Convert
 *
 * @requires crm.Format
 *
 * @requires moment
 */

define('crm/Views/History/RelatedView', [
    'dojo/_base/declare',
    'crm/Format',
    'argos/Convert',
    'argos/RelatedViewWidget',
    'moment'
], function(
    declare,
    format,
    convert,
    RelatedViewWidget,
    moment
) {
    return declare('crm.Views.History.RelatedView', [RelatedViewWidget], {
        regardingText: 'Regarding',
        byText: 'wrote ',
        id: 'relatedNotes',
        titleText: 'Notes',
        detailViewId: 'history_detail',
        listViewId: 'history_related',
        listViewWhere: null,
        enabled: true,
        showTab: false,
        enableActions: false,
        showTotalInTab: false,
        hideWhenNoData: true,
        resourceKind: 'history',
        select: ['Type','ModifyDate', 'CompleteDate', 'UserName', 'Description', 'Notes', 'AccountName'],
        where:null ,
        sort: 'ModifyDate desc',
        pageSize: 3,
        relatedItemIconTemplate: new Simplate([
            '<div class="user-icon">{%: crm.Format.formatUserInitial($.UserName) %}</div>'
        ]),
        relatedItemHeaderTemplate: new Simplate([
           '<h4 ><strong>{%: $$.getDescription($) %} </strong></h4>',
           '<h4>{%: crm.Format.formatByUser($.UserName) %} {%: $$.byText %}  {%: crm.Format.relativeDate($.ModifyDate, false) %}</h4>'
        ]),
        relatedItemDetailTemplate: new Simplate([
               '<div class="note-text-wrap">',
                '<h4>{%: $.Notes %} ... </h4>',
              '</div>'
        ]),
        relatedViewHeaderTemplate: new Simplate([
             '<div class="line-bar"></div>'
        ]),
        getDescription: function(entry) {
            return (entry.Description)? entry.Description : entry.$descriptor;
        }
    });
});

/* Copyright (c) 2010, Sage Software, Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */


define('Mobile/SalesLogix/Views/History/RelatedView', [
    'dojo/_base/declare',
    'Mobile/SalesLogix/Format',
    'Sage/Platform/Mobile/Convert',
    'Sage/Platform/Mobile/RelatedViewWidget',
    'moment'
], function(
    declare,
    format,
    convert,
    RelatedViewWidget,
    moment
) {
    return declare('Mobile.SalesLogix.Views.History.RelatedView', [RelatedViewWidget], {
        regardingText:'Regarding',
        id: 'relatedNotes',
        icon: 'content/images/icons/ContactProfile_48x48.png',
        title: 'Notes',
        detailViewId: 'history_detail',
        listViewId: 'history_list',
        listViewWhere: null,
        enabled: true,
        resourceKind: 'history',
        select: ['Type','ModifyDate', 'CompleteDate', 'UserName', 'Description', 'Notes', 'AccountName'],
        where:null ,
        sort: 'ModifyDate desc',
        pageSize: 3,
        relatedItemIconTemplate: new Simplate([
            '<div class="user-icon">{%: Mobile.SalesLogix.Format.formatUserInitial($.UserName) %}</div>'
        ]),
        relatedItemTemplate: new Simplate([
            '<div class="header"> {%: Mobile.SalesLogix.Format.relativeDate($.ModifyDate, false) %} by {%: Mobile.SalesLogix.Format.formatByUser($.UserName) %}</div>',
            '<h4>{%: $$.regardingText %} : {%: $.Description %}</h4>',
            '<div class="note-text-item">',
                '<div class="note-text-wrap">',
                    '{%: $.Notes %}',
                '</div>',
            '</div>'
        ]),
        formatDate: function(date) {
            var startDate = moment(convert.toDateFromString(date)),
                nextDate = startDate.clone().add({ hours: 24 }),
                fmt = this.dateFormatText;

            if (startDate.valueOf() < nextDate.valueOf() && startDate.valueOf() > moment().startOf('day').valueOf())
                fmt = this.hourMinuteFormatText;

            return format.date(startDate.toDate(), fmt);
        },
        formatMeridiem: function(date) {
            var startDate = moment(convert.toDateFromString(date)),
                nextDate = startDate.clone().add({ hours: 24 });

            if (startDate.valueOf() < nextDate.valueOf() && startDate.valueOf() > moment().startOf('day').valueOf())
                return format.date(startDate.toDate(), 'A');

            return '';
        }
    });
});

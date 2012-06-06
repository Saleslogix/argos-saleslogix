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

define('Mobile/SalesLogix/Fields/RecurrencesField', [
    'dojo/_base/declare',
    'Sage/Platform/Mobile/Fields/EditorField',
    'Sage/Platform/Mobile/FieldManager'
], function(
    declare,
    EditorField,
    FieldManager
) {
    var control = declare('Mobile.SalesLogix.Fields.RecurrencesField', [EditorField], {
        // Localization
        titleText: 'Recurring',
        emptyText: '',
        attributeMap: {
            noteText: {
                node: 'inputNode',
                type: 'innerHTML'
            }
        },

        widgetTemplate: new Simplate([
            '<label for="{%= $.name %}">{%: $.label %}</label>',
            '<button class="button simpleSubHeaderButton" aria-label="{%: $.lookupLabelText %}"><span>{%: $.lookupText %}</span></button>',
            '<div data-dojo-attach-point="inputNode" class="note-text"></div>'
        ]),

        setText: function(text) {
            this.set('noteText', text);
        }
    });

    return FieldManager.register('recurrences', control);
});
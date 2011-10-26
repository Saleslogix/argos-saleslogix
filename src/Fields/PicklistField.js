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

define('Mobile/SalesLogix/Fields/PicklistField', ['Sage/Platform/Mobile/Fields/LookupField', 'Mobile/SalesLogix/Views/PickList'], function() {
    var viewsByName = {},
        viewsByNameCount = 0;

    var getOrCreateViewFor = function(name) {
        if (viewsByName[name])
            return viewsByName[name];

        var view = new Mobile.SalesLogix.Views.PickList({
            id: 'pick_list_' + viewsByNameCount++,
            expose: false
        });

        App.registerView(view);

        return (viewsByName[name] = view);
    };

    var control = dojo.declare('Mobile.SalesLogix.Fields.PicklistField', [Sage.Platform.Mobile.Fields.LookupField], {
        picklist: false,
        orderBy: 'number asc',
        storageMode: 'text',
        requireSelection: false,
        valueKeyProperty: false,
        valueTextProperty: false,
        constructor: function(options) {
            switch (this.storageMode)
            {
                case 'text':
                    this.keyProperty = 'text';
                    this.textProperty = 'text';
                    break;
                case 'code':
                    this.keyProperty = 'code';
                    this.textProperty = 'text';
                    this.requireSelection = typeof options.requireSelection !== 'undefined'
                        ? options.requireSelection
                        : true;
                    break;
                case 'id':
                    this.keyProperty = '$key';
                    this.textProperty = 'text';
                    this.requireSelection = typeof options.requireSelection !== 'undefined'
                        ? options.requireSelection
                        : true;
                    break;
            }
        },
        isReadOnly: function() {
            return !this.picklist;
        },
        formatResourcePredicate: function(name) {
            return dojo.string.substitute('name eq "${0}"', [name]);
        },
        createSelections: function(){
            var value = this.getText(),
                selections = (value)
                    ? (value.indexOf(', ') !== -1)
                        ? value.split(', ')
                        : [value]
                    : [];
            return selections;
        },
        createNavigationOptions: function() {
            var options = this.inherited(arguments);

            if (this.picklist) {
                options.resourcePredicate = this.formatResourcePredicate(
                    this.dependsOn // only pass dependentValue if there is a dependency
                        ? this.expandExpression(this.picklist, options.dependentValue)
                        : this.expandExpression(this.picklist)
                );
                options.multi = this.multi;
                options.singleSelect = !options.multi;
                options.previousSelections = this.multi ? this.createSelections() : null;
                options.pickListType = this.storageMode;
            }

            return options;
        },
        navigateToListView: function() {
            var options = this.createNavigationOptions(),
                view = App.getView(this.view) || getOrCreateViewFor(this.picklist);

            if (view && options)
                view.show(options);
        }
    });

    return Sage.Platform.Mobile.FieldManager.register('picklist', control);
});
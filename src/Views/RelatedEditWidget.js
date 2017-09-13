/* Copyright 2017 Infor
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import declare from 'dojo/_base/declare';
import event from 'dojo/_base/event';
import on from 'dojo/on';
import connect from 'dojo/_base/connect';
import RelatedViewManager from 'argos/RelatedViewManager';
import _RelatedViewWidgetBase from 'argos/_RelatedViewWidgetBase';
import Edit from 'argos/Edit';


const __class = declare('crm.Views.RelatedEditWidget', [_RelatedViewWidgetBase], {
  cls: 'related-edit-widget',
  owner: null,
  id: 'related-edit-widget',
  editView: null,
  toolBarTemplate: new Simplate([
    '<div class="toolBar">',
    '<button class="button toolButton toolButton-right  fa fa-save fa-fw fa-lg" data-action="save"></button>',
    '<div>',
  ]),
  onLoad: function onLoad() {
    this.processEntry(this.parentEntry);
  },
  processEntry: function processEntry(entry) {
    const Ctor = (this.editView) ? this.editView : Edit;
    const editView = new Ctor({
      id: `${this.id}_edit`,
    });
    if (editView && !editView._started) {
      editView.sectionBeginTemplate = new Simplate([
        '<fieldset class="{%= ($.cls || $.options.cls) %}">',
      ]);
      editView.init();
      editView._started = true;
      editView.onUpdateCompleted = this.onUpdateCompleted.bind(this);
    }
    // Add the toolbar for save
    const toolBarNode = $(this.toolBarTemplate.apply(entry, this)).get(0);
    on(toolBarNode, 'click', this.onInvokeToolBarAction.bind(this));
    $(this.containerNode).append(toolBarNode);

    // Add the edit view to view
    editView.placeAt(this.containerNode, 'last');

    const options = {
      select: this.getEditSelect(),
      key: entry.$key,
    };
    editView.options = options;
    editView.activate();
    editView.requestData();
    this.editViewInstance = editView;
  },
  onInvokeToolBarAction: function onInvokeToolBarAction(evt) {
    this.editViewInstance.save();
    event.stop(evt);
  },
  getEditLayout: function getEditLayout() {
    const editLayout = [];
    if (this.layout) {
      this.layout.forEach((item) => {
        if (!item.readonly) {
          editLayout.push(item);
        }
      });
    }
    return editLayout;
  },
  getEditSelect: function getEditSelect() {
    let select = null;
    if (this.formModel) {
      select = this.formModel.getEditSelect();
    }
    return select;
  },
  onUpdateCompleted: function onUpdateCompleted() {
    if (this.owner && this.owner._refreshClicked) {
      this.owner._refreshClicked();
    }
    this.inherited(arguments);
  },
  destroy: function destroy() {
    this._subscribes.forEach((handle) => {
      connect.unsubscribe(handle);
    });

    if (this.editViewInstance) {
      for (const name in this.editViewInstance.fields) {
        if (this.editViewInstance.fields.hasOwnProperty(name)) {
          this.editViewInstance.fields[name].destroy();
        }
      }
      this.editViewInstance.destroy();
    }
    this.inherited(arguments);
  },
});
const rvm = new RelatedViewManager();
rvm.registerType('relatedEdit', __class);
export default __class;

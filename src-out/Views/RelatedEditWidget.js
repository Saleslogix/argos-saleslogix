define("crm/Views/RelatedEditWidget", ["exports", "dojo/_base/declare", "dojo/_base/event", "dojo/on", "dojo/_base/connect", "argos/RelatedViewManager", "argos/_RelatedViewWidgetBase", "argos/Edit"], function (_exports, _declare, _event, _on, _connect, _RelatedViewManager, _RelatedViewWidgetBase2, _Edit) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports["default"] = void 0;
  _declare = _interopRequireDefault(_declare);
  _event = _interopRequireDefault(_event);
  _on = _interopRequireDefault(_on);
  _connect = _interopRequireDefault(_connect);
  _RelatedViewManager = _interopRequireDefault(_RelatedViewManager);
  _RelatedViewWidgetBase2 = _interopRequireDefault(_RelatedViewWidgetBase2);
  _Edit = _interopRequireDefault(_Edit);

  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
  var __class = (0, _declare["default"])('crm.Views.RelatedEditWidget', [_RelatedViewWidgetBase2["default"]], {
    cls: 'related-edit-widget',
    owner: null,
    id: 'related-edit-widget',
    editView: null,
    toolBarTemplate: new Simplate(['<div class="toolBar">', '<button class="button toolButton toolButton-right  fa fa-save fa-fw fa-lg" data-action="save"></button>', '<div>']),
    onLoad: function onLoad() {
      this.processEntry(this.parentEntry);
    },
    processEntry: function processEntry(entry) {
      var Ctor = this.editView ? this.editView : _Edit["default"];
      var editView = new Ctor({
        id: "".concat(this.id, "_edit")
      });

      if (editView && !editView._started) {
        editView.sectionBeginTemplate = new Simplate(['<fieldset class="{%= ($.cls || $.options.cls) %}">']);
        editView.init();
        editView._started = true;
        editView.onUpdateCompleted = this.onUpdateCompleted.bind(this);
      } // Add the toolbar for save


      var toolBarNode = $(this.toolBarTemplate.apply(entry, this)).get(0);
      (0, _on["default"])(toolBarNode, 'click', this.onInvokeToolBarAction.bind(this));
      $(this.containerNode).append(toolBarNode); // Add the edit view to view

      editView.placeAt(this.containerNode, 'last');
      var options = {
        select: this.getEditSelect(),
        key: entry.$key
      };
      editView.options = options;
      editView.activate();
      editView.requestData();
      this.editViewInstance = editView;
    },
    onInvokeToolBarAction: function onInvokeToolBarAction(evt) {
      this.editViewInstance.save();

      _event["default"].stop(evt);
    },
    getEditLayout: function getEditLayout() {
      var editLayout = [];

      if (this.layout) {
        this.layout.forEach(function (item) {
          if (!item.readonly) {
            editLayout.push(item);
          }
        });
      }

      return editLayout;
    },
    getEditSelect: function getEditSelect() {
      var select = null;

      if (this.formModel) {
        select = this.formModel.getEditSelect();
      }

      return select;
    },
    onUpdateCompleted: function onUpdateCompleted() {
      if (this.owner && this.owner._refreshClicked) {
        this.owner._refreshClicked();
      }

      this.inherited(onUpdateCompleted, arguments);
    },
    destroy: function destroy() {
      this._subscribes.forEach(function (handle) {
        _connect["default"].unsubscribe(handle);
      });

      if (this.editViewInstance) {
        for (var name in this.editViewInstance.fields) {
          if (this.editViewInstance.fields.hasOwnProperty(name)) {
            this.editViewInstance.fields[name].destroy();
          }
        }

        this.editViewInstance.destroy();
      }

      this.inherited(destroy, arguments);
    }
  });

  var rvm = new _RelatedViewManager["default"]();
  rvm.registerType('relatedEdit', __class);
  var _default = __class;
  _exports["default"] = _default;
});
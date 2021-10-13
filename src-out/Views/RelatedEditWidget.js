define('crm/Views/RelatedEditWidget', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/event', 'dojo/on', 'dojo/_base/connect', 'argos/RelatedViewManager', 'argos/_RelatedViewWidgetBase', 'argos/Edit'], function (module, exports, _declare, _event, _on, _connect, _RelatedViewManager, _RelatedViewWidgetBase2, _Edit) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _event2 = _interopRequireDefault(_event);

  var _on2 = _interopRequireDefault(_on);

  var _connect2 = _interopRequireDefault(_connect);

  var _RelatedViewManager2 = _interopRequireDefault(_RelatedViewManager);

  var _RelatedViewWidgetBase3 = _interopRequireDefault(_RelatedViewWidgetBase2);

  var _Edit2 = _interopRequireDefault(_Edit);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  const __class = (0, _declare2.default)('crm.Views.RelatedEditWidget', [_RelatedViewWidgetBase3.default], {
    cls: 'related-edit-widget',
    owner: null,
    id: 'related-edit-widget',
    editView: null,
    toolBarTemplate: new Simplate(['<div class="toolBar">', '<button class="button toolButton toolButton-right  fa fa-save fa-fw fa-lg" data-action="save"></button>', '<div>']),
    onLoad: function onLoad() {
      this.processEntry(this.parentEntry);
    },
    processEntry: function processEntry(entry) {
      const Ctor = this.editView ? this.editView : _Edit2.default;
      const editView = new Ctor({
        id: `${this.id}_edit`
      });
      if (editView && !editView._started) {
        editView.sectionBeginTemplate = new Simplate(['<fieldset class="{%= ($.cls || $.options.cls) %}">']);
        editView.init();
        editView._started = true;
        editView.onUpdateCompleted = this.onUpdateCompleted.bind(this);
      }
      // Add the toolbar for save
      const toolBarNode = $(this.toolBarTemplate.apply(entry, this)).get(0);
      (0, _on2.default)(toolBarNode, 'click', this.onInvokeToolBarAction.bind(this));
      $(this.containerNode).append(toolBarNode);

      // Add the edit view to view
      editView.placeAt(this.containerNode, 'last');

      const options = {
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
      _event2.default.stop(evt);
    },
    getEditLayout: function getEditLayout() {
      const editLayout = [];
      if (this.layout) {
        this.layout.forEach(item => {
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
      this.inherited(onUpdateCompleted, arguments);
    },
    destroy: function destroy() {
      this._subscribes.forEach(handle => {
        _connect2.default.unsubscribe(handle);
      });

      if (this.editViewInstance) {
        for (const name in this.editViewInstance.fields) {
          if (this.editViewInstance.fields.hasOwnProperty(name)) {
            this.editViewInstance.fields[name].destroy();
          }
        }
        this.editViewInstance.destroy();
      }
      this.inherited(destroy, arguments);
    }
  }); /* Copyright 2017 Infor
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

  const rvm = new _RelatedViewManager2.default();
  rvm.registerType('relatedEdit', __class);
  exports.default = __class;
  module.exports = exports['default'];
});
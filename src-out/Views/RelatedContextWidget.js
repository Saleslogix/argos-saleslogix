define('crm/Views/RelatedContextWidget', ['module', 'exports', 'dojo/_base/declare', 'dojo/aspect', 'argos/RelatedViewManager', 'argos/_RelatedViewWidgetBase'], function (module, exports, _declare, _aspect, _RelatedViewManager, _RelatedViewWidgetBase2) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _aspect2 = _interopRequireDefault(_aspect);

  var _RelatedViewManager2 = _interopRequireDefault(_RelatedViewManager);

  var _RelatedViewWidgetBase3 = _interopRequireDefault(_RelatedViewWidgetBase2);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

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

  const __class = (0, _declare2.default)('crm.Views.RelatedContextWidget', [_RelatedViewWidgetBase3.default], {

    cls: 'related-context-widget',
    contextCls: null,
    contextWrapperTemplate: new Simplate(['<div class="context-snapshot {%: $$.contextCls %}"></div>']),
    onInit: function onInit() {
      const self = this;
      this.onLoad();
      if (this.owner) {
        _aspect2.default.after(this.owner, 'show', () => {
          self.onRefreshView();
        });
      }
    },
    onLoad: function onLoad() {
      const snapShot = this.getContextSnapShot();
      if (snapShot) {
        this.processSnapShot(snapShot);
      }
    },
    getContextSnapShot: function getContextSnapShot() {
      let snapShot;
      if (this.owner && this.owner.options && this.owner.options.fromContext) {
        const ctx = this.owner.options.fromContext;
        snapShot = ctx.getContextSnapShot(this.owner.options);
      }
      return snapShot;
    },
    processSnapShot: function processSnapShot(snapShot) {
      if (this.containerNode && snapShot) {
        const wrapper = $(this.contextWrapperTemplate.apply(this));
        $(wrapper).append(snapShot);
        $(this.containerNode).append(wrapper);
      }
    },
    onRefreshView: function onRefreshView() {
      if (this.containerNode) {
        const node = $('<div></div>');
        $(this.containerNode).empty().append(node);
        this.onLoad();
      }
    }
  });
  const rvm = new _RelatedViewManager2.default();
  rvm.registerType('relatedContext', __class);
  exports.default = __class;
  module.exports = exports['default'];
});
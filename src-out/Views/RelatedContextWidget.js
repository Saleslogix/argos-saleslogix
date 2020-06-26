define("crm/Views/RelatedContextWidget", ["exports", "dojo/_base/declare", "dojo/aspect", "argos/RelatedViewManager", "argos/_RelatedViewWidgetBase"], function (_exports, _declare, _aspect, _RelatedViewManager, _RelatedViewWidgetBase2) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports["default"] = void 0;
  _declare = _interopRequireDefault(_declare);
  _aspect = _interopRequireDefault(_aspect);
  _RelatedViewManager = _interopRequireDefault(_RelatedViewManager);
  _RelatedViewWidgetBase2 = _interopRequireDefault(_RelatedViewWidgetBase2);

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
  var __class = (0, _declare["default"])('crm.Views.RelatedContextWidget', [_RelatedViewWidgetBase2["default"]], {
    cls: 'related-context-widget',
    contextCls: null,
    contextWrapperTemplate: new Simplate(['<div class="context-snapshot {%: $$.contextCls %}"></div>']),
    onInit: function onInit() {
      var self = this;
      this.onLoad();

      if (this.owner) {
        _aspect["default"].after(this.owner, 'show', function () {
          self.onRefreshView();
        });
      }
    },
    onLoad: function onLoad() {
      var snapShot = this.getContextSnapShot();

      if (snapShot) {
        this.processSnapShot(snapShot);
      }
    },
    getContextSnapShot: function getContextSnapShot() {
      var snapShot;

      if (this.owner && this.owner.options && this.owner.options.fromContext) {
        var ctx = this.owner.options.fromContext;
        snapShot = ctx.getContextSnapShot(this.owner.options);
      }

      return snapShot;
    },
    processSnapShot: function processSnapShot(snapShot) {
      if (this.containerNode && snapShot) {
        var wrapper = $(this.contextWrapperTemplate.apply(this));
        $(wrapper).append(snapShot);
        $(this.containerNode).append(wrapper);
      }
    },
    onRefreshView: function onRefreshView() {
      if (this.containerNode) {
        var node = $('<div></div>');
        $(this.containerNode).empty().append(node);
        this.onLoad();
      }
    }
  });

  var rvm = new _RelatedViewManager["default"]();
  rvm.registerType('relatedContext', __class);
  var _default = __class;
  _exports["default"] = _default;
});
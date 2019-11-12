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

  var __class = (0, _declare2.default)('crm.Views.RelatedContextWidget', [_RelatedViewWidgetBase3.default], {

    cls: 'related-context-widget',
    contextCls: null,
    contextWrapperTemplate: new Simplate(['<div class="context-snapshot {%: $$.contextCls %}"></div>']),
    onInit: function onInit() {
      var self = this;
      this.onLoad();
      if (this.owner) {
        _aspect2.default.after(this.owner, 'show', function () {
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
      var snapShot = void 0;
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
  var rvm = new _RelatedViewManager2.default();
  rvm.registerType('relatedContext', __class);
  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9WaWV3cy9SZWxhdGVkQ29udGV4dFdpZGdldC5qcyJdLCJuYW1lcyI6WyJfX2NsYXNzIiwiY2xzIiwiY29udGV4dENscyIsImNvbnRleHRXcmFwcGVyVGVtcGxhdGUiLCJTaW1wbGF0ZSIsIm9uSW5pdCIsInNlbGYiLCJvbkxvYWQiLCJvd25lciIsImFmdGVyIiwib25SZWZyZXNoVmlldyIsInNuYXBTaG90IiwiZ2V0Q29udGV4dFNuYXBTaG90IiwicHJvY2Vzc1NuYXBTaG90Iiwib3B0aW9ucyIsImZyb21Db250ZXh0IiwiY3R4IiwiY29udGFpbmVyTm9kZSIsIndyYXBwZXIiLCIkIiwiYXBwbHkiLCJhcHBlbmQiLCJub2RlIiwiZW1wdHkiLCJydm0iLCJyZWdpc3RlclR5cGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7O0FBcUJBLE1BQU1BLFVBQVUsdUJBQVEsZ0NBQVIsRUFBMEMsaUNBQTFDLEVBQW9FOztBQUVsRkMsU0FBSyx3QkFGNkU7QUFHbEZDLGdCQUFZLElBSHNFO0FBSWxGQyw0QkFBd0IsSUFBSUMsUUFBSixDQUFhLENBQ25DLDJEQURtQyxDQUFiLENBSjBEO0FBT2xGQyxZQUFRLFNBQVNBLE1BQVQsR0FBa0I7QUFDeEIsVUFBTUMsT0FBTyxJQUFiO0FBQ0EsV0FBS0MsTUFBTDtBQUNBLFVBQUksS0FBS0MsS0FBVCxFQUFnQjtBQUNkLHlCQUFPQyxLQUFQLENBQWEsS0FBS0QsS0FBbEIsRUFBeUIsTUFBekIsRUFBaUMsWUFBTTtBQUNyQ0YsZUFBS0ksYUFBTDtBQUNELFNBRkQ7QUFHRDtBQUNGLEtBZmlGO0FBZ0JsRkgsWUFBUSxTQUFTQSxNQUFULEdBQWtCO0FBQ3hCLFVBQU1JLFdBQVcsS0FBS0Msa0JBQUwsRUFBakI7QUFDQSxVQUFJRCxRQUFKLEVBQWM7QUFDWixhQUFLRSxlQUFMLENBQXFCRixRQUFyQjtBQUNEO0FBQ0YsS0FyQmlGO0FBc0JsRkMsd0JBQW9CLFNBQVNBLGtCQUFULEdBQThCO0FBQ2hELFVBQUlELGlCQUFKO0FBQ0EsVUFBSyxLQUFLSCxLQUFOLElBQWlCLEtBQUtBLEtBQUwsQ0FBV00sT0FBNUIsSUFBeUMsS0FBS04sS0FBTCxDQUFXTSxPQUFYLENBQW1CQyxXQUFoRSxFQUE4RTtBQUM1RSxZQUFNQyxNQUFNLEtBQUtSLEtBQUwsQ0FBV00sT0FBWCxDQUFtQkMsV0FBL0I7QUFDQUosbUJBQVdLLElBQUlKLGtCQUFKLENBQXVCLEtBQUtKLEtBQUwsQ0FBV00sT0FBbEMsQ0FBWDtBQUNEO0FBQ0QsYUFBT0gsUUFBUDtBQUNELEtBN0JpRjtBQThCbEZFLHFCQUFpQixTQUFTQSxlQUFULENBQXlCRixRQUF6QixFQUFtQztBQUNsRCxVQUFJLEtBQUtNLGFBQUwsSUFBc0JOLFFBQTFCLEVBQW9DO0FBQ2xDLFlBQU1PLFVBQVVDLEVBQUUsS0FBS2hCLHNCQUFMLENBQTRCaUIsS0FBNUIsQ0FBa0MsSUFBbEMsQ0FBRixDQUFoQjtBQUNBRCxVQUFFRCxPQUFGLEVBQVdHLE1BQVgsQ0FBa0JWLFFBQWxCO0FBQ0FRLFVBQUUsS0FBS0YsYUFBUCxFQUFzQkksTUFBdEIsQ0FBNkJILE9BQTdCO0FBQ0Q7QUFDRixLQXBDaUY7QUFxQ2xGUixtQkFBZSxTQUFTQSxhQUFULEdBQXlCO0FBQ3RDLFVBQUksS0FBS08sYUFBVCxFQUF3QjtBQUN0QixZQUFNSyxPQUFPSCxFQUFFLGFBQUYsQ0FBYjtBQUNBQSxVQUFFLEtBQUtGLGFBQVAsRUFBc0JNLEtBQXRCLEdBQThCRixNQUE5QixDQUFxQ0MsSUFBckM7QUFDQSxhQUFLZixNQUFMO0FBQ0Q7QUFDRjtBQTNDaUYsR0FBcEUsQ0FBaEI7QUE2Q0EsTUFBTWlCLE1BQU0sa0NBQVo7QUFDQUEsTUFBSUMsWUFBSixDQUFpQixnQkFBakIsRUFBbUN6QixPQUFuQztvQkFDZUEsTyIsImZpbGUiOiJSZWxhdGVkQ29udGV4dFdpZGdldC5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBDb3B5cmlnaHQgMjAxNyBJbmZvclxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBkZWNsYXJlIGZyb20gJ2Rvam8vX2Jhc2UvZGVjbGFyZSc7XHJcbmltcG9ydCBhc3BlY3QgZnJvbSAnZG9qby9hc3BlY3QnO1xyXG5pbXBvcnQgUmVsYXRlZFZpZXdNYW5hZ2VyIGZyb20gJ2FyZ29zL1JlbGF0ZWRWaWV3TWFuYWdlcic7XHJcbmltcG9ydCBfUmVsYXRlZFZpZXdXaWRnZXRCYXNlIGZyb20gJ2FyZ29zL19SZWxhdGVkVmlld1dpZGdldEJhc2UnO1xyXG5cclxuXHJcbmNvbnN0IF9fY2xhc3MgPSBkZWNsYXJlKCdjcm0uVmlld3MuUmVsYXRlZENvbnRleHRXaWRnZXQnLCBbX1JlbGF0ZWRWaWV3V2lkZ2V0QmFzZV0sIHtcclxuXHJcbiAgY2xzOiAncmVsYXRlZC1jb250ZXh0LXdpZGdldCcsXHJcbiAgY29udGV4dENsczogbnVsbCxcclxuICBjb250ZXh0V3JhcHBlclRlbXBsYXRlOiBuZXcgU2ltcGxhdGUoW1xyXG4gICAgJzxkaXYgY2xhc3M9XCJjb250ZXh0LXNuYXBzaG90IHslOiAkJC5jb250ZXh0Q2xzICV9XCI+PC9kaXY+JyxcclxuICBdKSxcclxuICBvbkluaXQ6IGZ1bmN0aW9uIG9uSW5pdCgpIHtcclxuICAgIGNvbnN0IHNlbGYgPSB0aGlzO1xyXG4gICAgdGhpcy5vbkxvYWQoKTtcclxuICAgIGlmICh0aGlzLm93bmVyKSB7XHJcbiAgICAgIGFzcGVjdC5hZnRlcih0aGlzLm93bmVyLCAnc2hvdycsICgpID0+IHtcclxuICAgICAgICBzZWxmLm9uUmVmcmVzaFZpZXcoKTtcclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBvbkxvYWQ6IGZ1bmN0aW9uIG9uTG9hZCgpIHtcclxuICAgIGNvbnN0IHNuYXBTaG90ID0gdGhpcy5nZXRDb250ZXh0U25hcFNob3QoKTtcclxuICAgIGlmIChzbmFwU2hvdCkge1xyXG4gICAgICB0aGlzLnByb2Nlc3NTbmFwU2hvdChzbmFwU2hvdCk7XHJcbiAgICB9XHJcbiAgfSxcclxuICBnZXRDb250ZXh0U25hcFNob3Q6IGZ1bmN0aW9uIGdldENvbnRleHRTbmFwU2hvdCgpIHtcclxuICAgIGxldCBzbmFwU2hvdDtcclxuICAgIGlmICgodGhpcy5vd25lcikgJiYgKHRoaXMub3duZXIub3B0aW9ucykgJiYgKHRoaXMub3duZXIub3B0aW9ucy5mcm9tQ29udGV4dCkpIHtcclxuICAgICAgY29uc3QgY3R4ID0gdGhpcy5vd25lci5vcHRpb25zLmZyb21Db250ZXh0O1xyXG4gICAgICBzbmFwU2hvdCA9IGN0eC5nZXRDb250ZXh0U25hcFNob3QodGhpcy5vd25lci5vcHRpb25zKTtcclxuICAgIH1cclxuICAgIHJldHVybiBzbmFwU2hvdDtcclxuICB9LFxyXG4gIHByb2Nlc3NTbmFwU2hvdDogZnVuY3Rpb24gcHJvY2Vzc1NuYXBTaG90KHNuYXBTaG90KSB7XHJcbiAgICBpZiAodGhpcy5jb250YWluZXJOb2RlICYmIHNuYXBTaG90KSB7XHJcbiAgICAgIGNvbnN0IHdyYXBwZXIgPSAkKHRoaXMuY29udGV4dFdyYXBwZXJUZW1wbGF0ZS5hcHBseSh0aGlzKSk7XHJcbiAgICAgICQod3JhcHBlcikuYXBwZW5kKHNuYXBTaG90KTtcclxuICAgICAgJCh0aGlzLmNvbnRhaW5lck5vZGUpLmFwcGVuZCh3cmFwcGVyKTtcclxuICAgIH1cclxuICB9LFxyXG4gIG9uUmVmcmVzaFZpZXc6IGZ1bmN0aW9uIG9uUmVmcmVzaFZpZXcoKSB7XHJcbiAgICBpZiAodGhpcy5jb250YWluZXJOb2RlKSB7XHJcbiAgICAgIGNvbnN0IG5vZGUgPSAkKCc8ZGl2PjwvZGl2PicpO1xyXG4gICAgICAkKHRoaXMuY29udGFpbmVyTm9kZSkuZW1wdHkoKS5hcHBlbmQobm9kZSk7XHJcbiAgICAgIHRoaXMub25Mb2FkKCk7XHJcbiAgICB9XHJcbiAgfSxcclxufSk7XHJcbmNvbnN0IHJ2bSA9IG5ldyBSZWxhdGVkVmlld01hbmFnZXIoKTtcclxucnZtLnJlZ2lzdGVyVHlwZSgncmVsYXRlZENvbnRleHQnLCBfX2NsYXNzKTtcclxuZXhwb3J0IGRlZmF1bHQgX19jbGFzcztcclxuIl19
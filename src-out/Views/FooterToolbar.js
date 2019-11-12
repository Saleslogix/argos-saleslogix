define('crm/Views/FooterToolbar', ['module', 'exports', 'dojo/_base/declare', 'argos/MainToolbar'], function (module, exports, _declare, _MainToolbar) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _MainToolbar2 = _interopRequireDefault(_MainToolbar);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  /**
   * @class crm.Views.FooterToolbar
   *
   * @deprecated
   * @extends argos.MainToolbar
   *
   */
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

  var __class = (0, _declare2.default)('crm.Views.FooterToolbar', [_MainToolbar2.default], {
    // Localization
    copyrightText: '',

    widgetTemplate: new Simplate(['<div class="footer-toolbar {%= $.cls %}">', '<hr />', '<div data-dojo-attach-point="contentNode"></div>', '<span data-dojo-attach-point="copyrightNode" class="copyright">{%= $.copyrightText %}</span>', '<span data-dojo-attach-point="version" class="copyright">{%= App.getVersionInfo() %}</span>', '</div>']),
    toolTemplate: new Simplate(['<button class="button toolButton toolButton-{%= $.side || "right" %} {%= $.cls %}" data-action="invokeTool" data-tool="{%= $.id %}">', '{% if ($.icon) { %}', '<img src="{%= $.icon %}" alt="{%= $.id %}" />', '{% } %}', '<span>{%: $.title %}</span>', '</button>']),
    attributeMap: {
      footerContents: {
        node: 'contentNode',
        type: 'innerHTML'
      }
    },
    showTools: function showTools(tools) {
      var contents = [];
      if (tools && tools.length <= 0 || tools !== false) {
        this.show();
      } else if (tools === false) {
        this.hide();
      }

      // skip parent implementation
      argos.MainToolbar.superclass.showTools.apply(this, arguments); // TODO: Avoid global

      if (tools) {
        for (var i = 0; i < tools.length; i++) {
          contents.push(this.toolTemplate.apply(tools[i]));
        }
        this.set('footerContents', contents.join(''));
      }
    }
  });

  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9WaWV3cy9Gb290ZXJUb29sYmFyLmpzIl0sIm5hbWVzIjpbIl9fY2xhc3MiLCJjb3B5cmlnaHRUZXh0Iiwid2lkZ2V0VGVtcGxhdGUiLCJTaW1wbGF0ZSIsInRvb2xUZW1wbGF0ZSIsImF0dHJpYnV0ZU1hcCIsImZvb3RlckNvbnRlbnRzIiwibm9kZSIsInR5cGUiLCJzaG93VG9vbHMiLCJ0b29scyIsImNvbnRlbnRzIiwibGVuZ3RoIiwic2hvdyIsImhpZGUiLCJhcmdvcyIsIk1haW5Ub29sYmFyIiwic3VwZXJjbGFzcyIsImFwcGx5IiwiYXJndW1lbnRzIiwiaSIsInB1c2giLCJzZXQiLCJqb2luIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFtQkE7Ozs7Ozs7QUFuQkE7Ozs7Ozs7Ozs7Ozs7OztBQTBCQSxNQUFNQSxVQUFVLHVCQUFRLHlCQUFSLEVBQW1DLHVCQUFuQyxFQUFrRDtBQUNoRTtBQUNBQyxtQkFBZSxFQUZpRDs7QUFJaEVDLG9CQUFnQixJQUFJQyxRQUFKLENBQWEsQ0FDM0IsMkNBRDJCLEVBRTNCLFFBRjJCLEVBRzNCLGtEQUgyQixFQUkzQiw4RkFKMkIsRUFLM0IsNkZBTDJCLEVBTTNCLFFBTjJCLENBQWIsQ0FKZ0Q7QUFZaEVDLGtCQUFjLElBQUlELFFBQUosQ0FBYSxDQUN6QixzSUFEeUIsRUFFekIscUJBRnlCLEVBR3pCLCtDQUh5QixFQUl6QixTQUp5QixFQUt6Qiw2QkFMeUIsRUFNekIsV0FOeUIsQ0FBYixDQVprRDtBQW9CaEVFLGtCQUFjO0FBQ1pDLHNCQUFnQjtBQUNkQyxjQUFNLGFBRFE7QUFFZEMsY0FBTTtBQUZRO0FBREosS0FwQmtEO0FBMEJoRUMsZUFBVyxTQUFTQSxTQUFULENBQW1CQyxLQUFuQixFQUEwQjtBQUNuQyxVQUFNQyxXQUFXLEVBQWpCO0FBQ0EsVUFBS0QsU0FBU0EsTUFBTUUsTUFBTixJQUFnQixDQUExQixJQUFpQ0YsVUFBVSxLQUEvQyxFQUF1RDtBQUNyRCxhQUFLRyxJQUFMO0FBQ0QsT0FGRCxNQUVPLElBQUlILFVBQVUsS0FBZCxFQUFxQjtBQUMxQixhQUFLSSxJQUFMO0FBQ0Q7O0FBRUQ7QUFDQUMsWUFBTUMsV0FBTixDQUFrQkMsVUFBbEIsQ0FBNkJSLFNBQTdCLENBQXVDUyxLQUF2QyxDQUE2QyxJQUE3QyxFQUFtREMsU0FBbkQsRUFUbUMsQ0FTNEI7O0FBRS9ELFVBQUlULEtBQUosRUFBVztBQUNULGFBQUssSUFBSVUsSUFBSSxDQUFiLEVBQWdCQSxJQUFJVixNQUFNRSxNQUExQixFQUFrQ1EsR0FBbEMsRUFBdUM7QUFDckNULG1CQUFTVSxJQUFULENBQWMsS0FBS2pCLFlBQUwsQ0FBa0JjLEtBQWxCLENBQXdCUixNQUFNVSxDQUFOLENBQXhCLENBQWQ7QUFDRDtBQUNELGFBQUtFLEdBQUwsQ0FBUyxnQkFBVCxFQUEyQlgsU0FBU1ksSUFBVCxDQUFjLEVBQWQsQ0FBM0I7QUFDRDtBQUNGO0FBM0MrRCxHQUFsRCxDQUFoQjs7b0JBOENldkIsTyIsImZpbGUiOiJGb290ZXJUb29sYmFyLmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAyMDE3IEluZm9yXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuaW1wb3J0IGRlY2xhcmUgZnJvbSAnZG9qby9fYmFzZS9kZWNsYXJlJztcclxuaW1wb3J0IE1haW5Ub29sYmFyIGZyb20gJ2FyZ29zL01haW5Ub29sYmFyJztcclxuXHJcblxyXG4vKipcclxuICogQGNsYXNzIGNybS5WaWV3cy5Gb290ZXJUb29sYmFyXHJcbiAqXHJcbiAqIEBkZXByZWNhdGVkXHJcbiAqIEBleHRlbmRzIGFyZ29zLk1haW5Ub29sYmFyXHJcbiAqXHJcbiAqL1xyXG5jb25zdCBfX2NsYXNzID0gZGVjbGFyZSgnY3JtLlZpZXdzLkZvb3RlclRvb2xiYXInLCBbTWFpblRvb2xiYXJdLCB7XHJcbiAgLy8gTG9jYWxpemF0aW9uXHJcbiAgY29weXJpZ2h0VGV4dDogJycsXHJcblxyXG4gIHdpZGdldFRlbXBsYXRlOiBuZXcgU2ltcGxhdGUoW1xyXG4gICAgJzxkaXYgY2xhc3M9XCJmb290ZXItdG9vbGJhciB7JT0gJC5jbHMgJX1cIj4nLFxyXG4gICAgJzxociAvPicsXHJcbiAgICAnPGRpdiBkYXRhLWRvam8tYXR0YWNoLXBvaW50PVwiY29udGVudE5vZGVcIj48L2Rpdj4nLFxyXG4gICAgJzxzcGFuIGRhdGEtZG9qby1hdHRhY2gtcG9pbnQ9XCJjb3B5cmlnaHROb2RlXCIgY2xhc3M9XCJjb3B5cmlnaHRcIj57JT0gJC5jb3B5cmlnaHRUZXh0ICV9PC9zcGFuPicsXHJcbiAgICAnPHNwYW4gZGF0YS1kb2pvLWF0dGFjaC1wb2ludD1cInZlcnNpb25cIiBjbGFzcz1cImNvcHlyaWdodFwiPnslPSBBcHAuZ2V0VmVyc2lvbkluZm8oKSAlfTwvc3Bhbj4nLFxyXG4gICAgJzwvZGl2PicsXHJcbiAgXSksXHJcbiAgdG9vbFRlbXBsYXRlOiBuZXcgU2ltcGxhdGUoW1xyXG4gICAgJzxidXR0b24gY2xhc3M9XCJidXR0b24gdG9vbEJ1dHRvbiB0b29sQnV0dG9uLXslPSAkLnNpZGUgfHwgXCJyaWdodFwiICV9IHslPSAkLmNscyAlfVwiIGRhdGEtYWN0aW9uPVwiaW52b2tlVG9vbFwiIGRhdGEtdG9vbD1cInslPSAkLmlkICV9XCI+JyxcclxuICAgICd7JSBpZiAoJC5pY29uKSB7ICV9JyxcclxuICAgICc8aW1nIHNyYz1cInslPSAkLmljb24gJX1cIiBhbHQ9XCJ7JT0gJC5pZCAlfVwiIC8+JyxcclxuICAgICd7JSB9ICV9JyxcclxuICAgICc8c3Bhbj57JTogJC50aXRsZSAlfTwvc3Bhbj4nLFxyXG4gICAgJzwvYnV0dG9uPicsXHJcbiAgXSksXHJcbiAgYXR0cmlidXRlTWFwOiB7XHJcbiAgICBmb290ZXJDb250ZW50czoge1xyXG4gICAgICBub2RlOiAnY29udGVudE5vZGUnLFxyXG4gICAgICB0eXBlOiAnaW5uZXJIVE1MJyxcclxuICAgIH0sXHJcbiAgfSxcclxuICBzaG93VG9vbHM6IGZ1bmN0aW9uIHNob3dUb29scyh0b29scykge1xyXG4gICAgY29uc3QgY29udGVudHMgPSBbXTtcclxuICAgIGlmICgodG9vbHMgJiYgdG9vbHMubGVuZ3RoIDw9IDApIHx8ICh0b29scyAhPT0gZmFsc2UpKSB7XHJcbiAgICAgIHRoaXMuc2hvdygpO1xyXG4gICAgfSBlbHNlIGlmICh0b29scyA9PT0gZmFsc2UpIHtcclxuICAgICAgdGhpcy5oaWRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gc2tpcCBwYXJlbnQgaW1wbGVtZW50YXRpb25cclxuICAgIGFyZ29zLk1haW5Ub29sYmFyLnN1cGVyY2xhc3Muc2hvd1Rvb2xzLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7IC8vIFRPRE86IEF2b2lkIGdsb2JhbFxyXG5cclxuICAgIGlmICh0b29scykge1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRvb2xzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgY29udGVudHMucHVzaCh0aGlzLnRvb2xUZW1wbGF0ZS5hcHBseSh0b29sc1tpXSkpO1xyXG4gICAgICB9XHJcbiAgICAgIHRoaXMuc2V0KCdmb290ZXJDb250ZW50cycsIGNvbnRlbnRzLmpvaW4oJycpKTtcclxuICAgIH1cclxuICB9LFxyXG59KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IF9fY2xhc3M7XHJcbiJdfQ==
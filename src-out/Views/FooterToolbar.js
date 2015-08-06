define('crm/Views/FooterToolbar', ['exports', 'module', 'dojo/_base/declare', 'dojo/_base/lang', 'argos/MainToolbar'], function (exports, module, _dojo_baseDeclare, _dojo_baseLang, _argosMainToolbar) {
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _declare = _interopRequireDefault(_dojo_baseDeclare);

  var _lang = _interopRequireDefault(_dojo_baseLang);

  var _MainToolbar = _interopRequireDefault(_argosMainToolbar);

  /**
   * @class crm.Views.FooterToolbar
   *
   *
   * @extends argos.MainToolbar
   *
   */
  var __class = (0, _declare['default'])('crm.Views.FooterToolbar', [_MainToolbar['default']], {
    // Localization
    copyrightText: '&copy; 2014 SalesLogix, NA, LLC. All rights reserved.',

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
      argos.MainToolbar.superclass.showTools.apply(this, arguments);

      if (tools) {
        for (var i = 0; i < tools.length; i++) {
          contents.push(this.toolTemplate.apply(tools[i]));
        }
        this.set('footerContents', contents.join(''));
      }
    }
  });

  _lang['default'].setObject('Mobile.SalesLogix.Views.FooterToolbar', __class);
  module.exports = __class;
});

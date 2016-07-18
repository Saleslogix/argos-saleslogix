import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import MainToolbar from 'argos/MainToolbar';


/**
 * @class crm.Views.FooterToolbar
 *
 * @deprecated
 * @extends argos.MainToolbar
 *
 */
const __class = declare('crm.Views.FooterToolbar', [MainToolbar], {
  // Localization
  copyrightText: '',

  widgetTemplate: new Simplate([
    '<div class="footer-toolbar {%= $.cls %}">',
    '<hr />',
    '<div data-dojo-attach-point="contentNode"></div>',
    '<span data-dojo-attach-point="copyrightNode" class="copyright">{%= $.copyrightText %}</span>',
    '<span data-dojo-attach-point="version" class="copyright">{%= App.getVersionInfo() %}</span>',
    '</div>',
  ]),
  toolTemplate: new Simplate([
    '<button class="button toolButton toolButton-{%= $.side || "right" %} {%= $.cls %}" data-action="invokeTool" data-tool="{%= $.id %}">',
    '{% if ($.icon) { %}',
    '<img src="{%= $.icon %}" alt="{%= $.id %}" />',
    '{% } %}',
    '<span>{%: $.title %}</span>',
    '</button>',
  ]),
  attributeMap: {
    footerContents: {
      node: 'contentNode',
      type: 'innerHTML',
    },
  },
  showTools: function showTools(tools) {
    const contents = [];
    if ((tools && tools.length <= 0) || (tools !== false)) {
      this.show();
    } else if (tools === false) {
      this.hide();
    }

    // skip parent implementation
    argos.MainToolbar.superclass.showTools.apply(this, arguments);

    if (tools) {
      for (let i = 0; i < tools.length; i++) {
        contents.push(this.toolTemplate.apply(tools[i]));
      }
      this.set('footerContents', contents.join(''));
    }
  },
});

lang.setObject('Mobile.SalesLogix.Views.FooterToolbar', __class);
export default __class;

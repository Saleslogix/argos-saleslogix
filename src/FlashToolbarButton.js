define('Mobile/SalesLogix/FlashToolbarButton', [
    'dojo/_base/declare',
    'dojo/_base/lang',
    'dojo/dom-class',
    'dojo/dom-attr',
    'Sage/Platform/Mobile/Control'
], function(
    declare,
    lang,
    domClass,
    domAttr,
    Control
) {
    return declare('Mobile.SalesLogix.FlashToolbarButton', [Control], {
        tag: 'button',
        attrs: {
            'data-action': 'invoke'
        },
        baseClass: 'button tool-button',
        components: [
            {content: Simplate.make([
                '<div class="{%= $.cls %}">',
                    '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" width="36" height="36" id="{%= $.id %}">',
                        '<param name="movie" value="{%= $.swf %}"/>',
                        '<param name="allowScriptAccess" value="always" />',
                        '<param name="quality" value="high" />',
                        '<param name="scale" value="noscale" />',
                        '<param name="FlashVars" value="{%= $.flashVars %}" />',
                        '<param name="wmode" value="transparent" />',
                        '<embed src="{%= $.swf %}" width="36" height="36" scale="noscale" name="clippy" quality="high" allowScriptAccess="always" type="application/x-shockwave-flash" pluginspage="http://www.macromedia.com/go/getflashplayer" FlashVars="{%= $.flashVars %}" wmode="transparent" />',
                    '</object>',
                '</div>'
            ])}
        ],
        enabled: true,
        visible: true,
        place: null,
        icon: null,
        name: null,
        label: null,

        _setNameAttr: function(value) {
            this.name = value;
        },
        _getNameAttr: function() {
            return this.name;
        },
        _setLabelAttr: function(value) {
            this.label = value;
        },
        _getLabelAttr: function() {
            return this.label;
        },
        _setEnabledAttr: function(value) {
            this.enabled = value;

            domClass.toggle(this.domNode, 'is-disabled', !value);
        },
        _getEnabledAttr: function() {
            return this.enabled;
        },
        _setVisibleAttr: function(value) {
            this.visible = value;

            domClass.toggle(this.domNode, 'is-hidden', !value);
        },
        _getVisibleAttr: function() {
            return this.visible;
        },
        update: function(context) {}
    });
});
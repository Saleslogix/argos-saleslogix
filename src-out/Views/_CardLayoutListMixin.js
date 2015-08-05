define('crm/Views/_CardLayoutListMixin', ['exports', 'module', 'dojo/_base/array', 'dojo/_base/declare', 'dojo/_base/event', 'dojo/_base/lang', 'dojo/dom-attr', 'dojo/dom', 'dojo/dom-construct', 'dojo/query', 'dojo/dom-class', 'argos/Convert', 'moment'], function (exports, module, _dojo_baseArray, _dojo_baseDeclare, _dojo_baseEvent, _dojo_baseLang, _dojoDomAttr, _dojoDom, _dojoDomConstruct, _dojoQuery, _dojoDomClass, _argosConvert, _moment) {
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _array = _interopRequireDefault(_dojo_baseArray);

  var _declare = _interopRequireDefault(_dojo_baseDeclare);

  var _event = _interopRequireDefault(_dojo_baseEvent);

  var _lang = _interopRequireDefault(_dojo_baseLang);

  var _domAttr = _interopRequireDefault(_dojoDomAttr);

  var _dom = _interopRequireDefault(_dojoDom);

  var _domConstruct = _interopRequireDefault(_dojoDomConstruct);

  var _query = _interopRequireDefault(_dojoQuery);

  var _domClass = _interopRequireDefault(_dojoDomClass);

  var _convert = _interopRequireDefault(_argosConvert);

  var _moment2 = _interopRequireDefault(_moment);

  var mixinName, __class;

  mixinName = 'crm.Views._CardLayoutListMixin';

  /**
   * @class crm.Views._CardLayoutListMixin
   *
   * Mixin for card list layouts.
   *
   * @since 3.0
   *
   * @requires argos.Convert
   *
   */
  __class = (0, _declare['default'])('crm.Views._CardLayoutListMixin', null, {
    itemIcon: 'content/images/icons/man_1.png',
    itemIconAltText: 'Contact',
    itemIconClass: '',
    allRecordsText: 'no search applied',
    itemIndicators: null,
    itemExts: null,
    itemIndicatorIconPath: 'content/images/icons/',
    itemIndicatorShowDisabled: true,
    currentSearchExpression: '',
    itemIndicatorTemplate: new Simplate(['<span{% if ($.iconCls) { %} class="{%= $.iconCls %}" {% } %}>', '{% if ($.showIcon === false) { %}', '{%: $.valueText %}', '{% } else if ($.indicatorIcon && !$.iconCls) { %}', '<img src="{%= $.indicatorIcon %}" alt="{%= $.label %}" />', '{% } %}', '</span>']),
    itemExtTemplate: new Simplate(['<li data-dojo-attach-point="itemExtNode" class="card-item-ext-row"></li>']),
    itemRowContainerTemplate: new Simplate(['<li data-action="activateEntry" data-key="{%= $$.getItemActionKey($) %}" data-descriptor="{%: $$.getItemDescriptor($) %}">', '{%! $$.itemRowContentTemplate %}', '</li>']),
    itemFooterTemplate: new Simplate(['<div id="list-item-footer" class="list-item-footer">', '</div>']),
    itemIconTemplate: new Simplate(['<button data-action="selectEntry" class="list-item-selector button">', '{% if ($$.getItemIconClass($)) { %}', '<span class="{%= $$.getItemIconClass($) %}"></span>', '{% } else { %}', '<img id="list-item-image_{%: $.$key %}" src="{%: $$.getItemIconSource($) %}" alt="{%: $$.getItemIconAlt($) %}" class="icon" />', '{% } %}', '</button>']),
    itemRowContentTemplate: new Simplate(['<div id="top_item_indicators" class="list-item-indicator-content"></div>', '{%! $$.itemIconTemplate %}', '<div class="list-item-content" data-snap-ignore="true">{%! $$.itemTemplate %}</div>', '<div id="bottom_item_indicators" class="list-item-indicator-content"></div>', '<div id="list-item-content-related"></div>', '{%! $$.itemFooterTemplate %}']),
    postMixInProperties: function postMixInProperties() {
      this.inherited(arguments);
      this.cls = ' card-layout';
      this.rowTemplate = new Simplate(['{%! $$.itemRowContainerTemplate %}']);
      this.createIndicatorLayout();
    },
    placeAt: function placeAt() {
      this.inherited(arguments);
      this._intFooter();
    },
    show: function show(options) {
      if (options && options.simpleMode && options.simpleMode === true) {
        this.itemFooterTemplate = new Simplate([]);
      }
      this.inherited(arguments);
    },
    _intFooter: function _intFooter() {
      if (!this.actions.length) {
        this.itemFooterTemplate = new Simplate(['']);
      }
    },
    getItemActionKey: function getItemActionKey(entry) {
      return entry.$key || entry[this.idProperty];
    },
    getItemDescriptor: function getItemDescriptor(entry) {
      return entry.$descriptor || entry[this.labelProperty];
    },
    getItemIconClass: function getItemIconClass() {
      return this.itemIconClass;
    },
    getItemIconSource: function getItemIconSource() {
      return this.itemIcon || this.icon || this.selectIcon;
    },
    getItemIconAlt: function getItemIconAlt() {
      return this.itemIconAltText;
    },
    createIndicators: function createIndicators(topIndicatorsNode, bottomIndicatorsNode, indicators, entry) {
      var indicatorTemplate,
          options,
          indicatorHTML,
          i,
          iconPath,
          self = this;
      for (i = 0; i < indicators.length; i++) {
        (function (indicator) {
          iconPath = indicator.iconPath || self.itemIndicatorIconPath;
          if (indicator.onApply) {
            try {
              indicator.onApply(entry, self);
            } catch (err) {
              indicator.isEnabled = false;
            }
          }
          options = {
            indicatorIndex: i,
            indicatorIcon: indicator.icon ? iconPath + indicator.icon : '',
            iconCls: indicator.cls || ''
          };

          indicatorTemplate = indicator.template || self.itemIndicatorTemplate;

          _lang['default'].mixin(indicator, options);

          if (indicator.isEnabled === false) {
            indicator.label = '';
            if (indicator.cls) {
              indicator.iconCls = indicator.cls + ' disabled';
            } else {
              indicator.indicatorIcon = indicator.icon ? iconPath + 'disabled_' + indicator.icon : '';
            }
          } else {
            indicator.indicatorIcon = indicator.icon ? iconPath + indicator.icon : '';
          }

          if (indicator.isEnabled === false && indicator.showIcon === false) {
            return;
          }

          if (self.itemIndicatorShowDisabled || indicator.isEnabled) {

            if (indicator.isEnabled === false && indicator.showIcon === false) {
              return;
            } else {

              indicatorHTML = indicatorTemplate.apply(indicator, indicator.id);
              if (indicator.location === 'top') {
                _domConstruct['default'].place(indicatorHTML, topIndicatorsNode, 'last');
              } else {
                _domConstruct['default'].place(indicatorHTML, bottomIndicatorsNode, 'last');
              }
            }
          }
        })(indicators[i]);
      }
    },
    onApplyRowTemplate: function onApplyRowTemplate(entry, rowNode) {
      if (this.options && this.options.simpleMode && this.options.simpleMode === true) {
        return;
      }

      this.applyRowIndicators(entry, rowNode);
      this.inherited(arguments);
    },
    applyRowIndicators: function applyRowIndicators(entry, rowNode) {
      var topIndicatorsNode, bottomIndicatorsNode;
      if (this.itemIndicators && this.itemIndicators.length > 0) {
        topIndicatorsNode = (0, _query['default'])('> #top_item_indicators', rowNode);
        bottomIndicatorsNode = (0, _query['default'])('> #bottom_item_indicators', rowNode);
        if (bottomIndicatorsNode[0] && topIndicatorsNode[0]) {
          if (bottomIndicatorsNode[0].childNodes.length === 0 && topIndicatorsNode[0].childNodes.length === 0) {
            this.createIndicators(topIndicatorsNode[0], bottomIndicatorsNode[0], this._createCustomizedLayout(this.itemIndicators, 'indicators'), entry);
          }
        }
      }
    },
    createIndicatorLayout: function createIndicatorLayout() {
      return this.itemIndicators || (this.itemIndicators = [{
        id: 'touched',
        cls: 'fa fa-hand-o-up fa-lg',
        onApply: function onApply(entry, parent) {
          this.isEnabled = parent.hasBeenTouched(entry);
        }
      }]);
    },
    hasBeenTouched: function hasBeenTouched(entry) {
      var modifiedDate, currentDate, weekAgo;
      if (entry['ModifyDate']) {
        modifiedDate = (0, _moment2['default'])(_convert['default'].toDateFromString(entry['ModifyDate']));
        currentDate = (0, _moment2['default'])().endOf('day');
        weekAgo = (0, _moment2['default'])().subtract(1, 'weeks');

        return modifiedDate.isAfter(weekAgo) && modifiedDate.isBefore(currentDate);
      }
      return false;
    },
    requestData: function requestData() {
      var mixin = _lang['default'].getObject(mixinName);
      if (this.searchWidget) {
        this.currentSearchExpression = this.searchWidget.getSearchExpression() || mixin.prototype.allRecordsText;
      }

      this.inherited(arguments);
    },
    /**
     * Returns a rendered html snap shot of the entry.
     */
    getContextSnapShot: function getContextSnapShot(options) {
      var snapShot,
          entry = this.entries[options.key];
      if (entry) {
        snapShot = this.itemRowContainerTemplate.apply(entry, this);
      }

      return snapShot;
    }
  });

  _lang['default'].setObject('Mobile.SalesLogix.Views._CardLayoutListMixin', __class);
  module.exports = __class;
});

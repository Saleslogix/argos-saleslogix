import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import SearchWidget from 'argos/SearchWidget';

const resource = window.localeContext.getEntitySync('speedSearchWidget').attributes;

/**
 * @class crm.SpeedSearchWidget
 *
 * @mixins argos._Templated
 *
 */
const __class = declare('crm.SpeedSearchWidget', [SearchWidget], {
  /**
   * @property {String} searchText The placeholder text for the input.
   */
  searchText: resource.searchText,

  _setQueryValueAttr: function _setQueryValueAttr(value) {
    this._onFocus();
    this.queryNode.value = value;
  },
});

lang.setObject('Mobile.SalesLogix.SpeedSearchWidget', __class);
export default __class;

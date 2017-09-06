import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import SearchWidget from 'argos/SearchWidget';
import getResource from 'argos/I18n';

const resource = getResource('speedSearchWidget');

/**
 * @class crm.SpeedSearchWidget
 * @mixins argos._Templated
 */
const __class = declare('crm.SpeedSearchWidget', [SearchWidget], /** @lends crm.SpeedSearchWidget# */{
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

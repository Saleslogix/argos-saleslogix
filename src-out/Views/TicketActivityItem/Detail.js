define('crm/Views/TicketActivityItem/Detail', ['exports', 'module', 'dojo/_base/declare', 'dojo/_base/lang', '../../Format', 'argos/Detail'], function (exports, module, _dojo_baseDeclare, _dojo_baseLang, _Format, _argosDetail) {
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _declare = _interopRequireDefault(_dojo_baseDeclare);

  var _lang = _interopRequireDefault(_dojo_baseLang);

  var _format = _interopRequireDefault(_Format);

  var _Detail = _interopRequireDefault(_argosDetail);

  /**
   * @class crm.Views.TicketActivityItem.Detail
   *
   * @extends argos.Detail
   *
   * @requires crm.Format
   */
  var __class = (0, _declare['default'])('crm.Views.TicketActivityItem.Detail', [_Detail['default']], {
    //Localization
    titleText: 'Ticket Activity Part',
    productNameText: 'product',
    skuText: 'SKU',
    serialNumberText: 'serial #',
    itemAmountText: 'price',
    itemDescriptionText: 'description',

    //View Properties
    id: 'ticketactivityitem_detail',

    querySelect: ['Product/Name', 'Product/ActualId', 'AccountProduct/SerialNumber', 'ItemDescription', 'ItemAmount', 'TicketActivity/$key'],
    resourceKind: 'ticketActivityItems',

    createToolLayout: function createToolLayout() {
      return this.tools || (this.tools = {
        'tbar': []
      });
    },
    createLayout: function createLayout() {
      return this.layout || (this.layout = [{
        title: this.detailsText,
        name: 'DetailsSection',
        children: [{
          name: 'ProductName',
          property: 'Product.Name',
          label: this.productNameText
        }, {
          name: 'ProductActualId',
          property: 'Product.ActualId',
          label: this.skuText
        }, {
          name: 'SerialNumber',
          property: 'AccountProduct.SerialNumber',
          label: this.serialNumberText
        }, {
          name: 'ItemAmount',
          property: 'ItemAmount',
          label: this.itemAmountText,
          renderer: _format['default'].currency
        }, {
          name: 'ItemDescription',
          property: 'ItemDescription',
          label: this.itemDescriptionText
        }]
      }]);
    }
  });

  _lang['default'].setObject('Mobile.SalesLogix.Views.TicketActivityItem.Detail', __class);
  module.exports = __class;
});

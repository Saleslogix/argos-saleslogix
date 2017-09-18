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

import declare from 'dojo/_base/declare';
import format from '../../Format';
import Detail from 'argos/Detail';
import getResource from 'argos/I18n';

const resource = getResource('ticketActivityItemDetail');

/**
 * @class crm.Views.TicketActivityItem.Detail
 *
 * @extends argos.Detail
 *
 * @requires crm.Format
 */
const __class = declare('crm.Views.TicketActivityItem.Detail', [Detail], {
  // Localization
  titleText: resource.titleText,
  productNameText: resource.productNameText,
  skuText: resource.skuText,
  serialNumberText: resource.serialNumberText,
  itemAmountText: resource.itemAmountText,
  itemDescriptionText: resource.itemDescriptionText,
  entityText: resource.entityText,

  // View Properties
  id: 'ticketactivityitem_detail',

  querySelect: [
    'Product/Name',
    'Product/ActualId',
    'AccountProduct/SerialNumber',
    'ItemDescription',
    'ItemAmount',
    'TicketActivity/$key',
  ],
  resourceKind: 'ticketActivityItems',

  createToolLayout: function createToolLayout() {
    return this.tools || (this.tools = {
      tbar: [],
    });
  },
  createLayout: function createLayout() {
    return this.layout || (this.layout = [{
      title: this.detailsText,
      name: 'DetailsSection',
      children: [{
        name: 'ProductName',
        property: 'Product.Name',
        label: this.productNameText,
      }, {
        name: 'ProductActualId',
        property: 'Product.ActualId',
        label: this.skuText,
      }, {
        name: 'SerialNumber',
        property: 'AccountProduct.SerialNumber',
        label: this.serialNumberText,
      }, {
        name: 'ItemAmount',
        property: 'ItemAmount',
        label: this.itemAmountText,
        renderer: format.currency,
      }, {
        name: 'ItemDescription',
        property: 'ItemDescription',
        label: this.itemDescriptionText,
      }],
    }]);
  },
});

export default __class;

define('crm/Integrations/BOE/Modules/OpportunityModule', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', './_Module', '../Views/Quotes/List', '../Views/SalesOrders/List', 'argos/I18n'], function (module, exports, _declare, _lang, _Module2, _List, _List3, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _lang2 = _interopRequireDefault(_lang);

  var _Module3 = _interopRequireDefault(_Module2);

  var _List2 = _interopRequireDefault(_List);

  var _List4 = _interopRequireDefault(_List3);

  var _I18n2 = _interopRequireDefault(_I18n);

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

  var resource = (0, _I18n2.default)('opportunityModule');

  var __class = (0, _declare2.default)('crm.Integrations.BOE.Modules.OpportunityModule', [_Module3.default], {
    addQuoteText: resource.addQuoteText,
    addOrderText: resource.addOrderText,
    relatedERPItemsText: resource.relatedERPItemsText,
    quotesText: resource.quotesText,
    ordersText: resource.ordersText,

    init: function init() {},
    loadViews: function loadViews() {
      var am = this.applicationModule;

      am.registerView(new _List2.default({
        id: 'opportunity_quotes_related',
        groupsEnabled: false,
        hasSettings: false,
        expose: false,
        queryOrderBy: 'CreateDate asc'
      }));

      am.registerView(new _List4.default({
        id: 'opportunity_salesorders_related',
        groupsEnabled: false,
        hasSettings: false,
        expose: false,
        queryOrderBy: 'CreateDate asc'
      }));
    },
    loadCustomizations: function loadCustomizations() {
      var am = this.applicationModule;

      _lang2.default.extend(crm.Views.Opportunity.Detail, {
        _onAddQuoteClick: function _onAddQuoteClick() {
          var request = new Sage.SData.Client.SDataServiceOperationRequest(App.getService());
          request.setResourceKind('Opportunities');
          request.setOperationName('CreateQuoteFromOpportunity');
          var entry = {
            $name: 'CreateQuoteFromOpportunity',
            request: {
              entity: {
                $key: this.entry.$key
              }
            }
          };
          request.execute(entry, {
            success: function success(data) {
              var view = App.getView('quote_detail');
              view.show({
                key: data.response.Result
              });
            },
            failure: function failure() {}
          });
        },
        _onAddOrderClick: function _onAddOrderClick() {
          var request = new Sage.SData.Client.SDataServiceOperationRequest(App.getService());
          request.setResourceKind('Opportunities');
          request.setOperationName('CreateSalesOrderFromOpportunity');

          var entry = {
            $name: 'CreateSalesOrderFromOpportunity',
            request: {
              entity: {
                $key: this.entry.$key
              }
            }
          };
          request.execute(entry, {
            success: function success(data) {
              var view = App.getView('salesorder_detail');
              view.show({
                key: data.response.Result
              });
            },
            failure: function failure() {}
          });
        }
      });

      /*
       * Quick Actions
       */
      am.registerCustomization('detail', 'opportunity_detail', {
        at: function at(row) {
          return row.name === 'AddNoteAction';
        },
        type: 'insert',
        where: 'after',
        value: [{
          name: 'AddQuote',
          property: 'Description',
          label: this.addQuoteText,
          iconClass: 'document',
          action: '_onAddQuoteClick',
          security: 'Entities/Quote/Add'
        }, {
          name: 'AddOrder',
          property: 'Description',
          label: this.addOrderText,
          iconClass: 'cart',
          action: '_onAddOrderClick',
          security: 'Entities/SalesOrder/Add'
        }]
      });

      /*
       * Related Items
       */
      am.registerCustomization('detail', 'opportunity_detail', {
        at: function at(row) {
          return row.name === 'RelatedItemsSection';
        },
        type: 'insert',
        where: 'after',
        value: {
          title: this.relatedERPItemsText,
          list: true,
          name: 'RelatedERPItemsSection',
          enableOffline: false,
          children: [{
            name: 'Quotes',
            label: this.quotesText,
            where: function where(entry) {
              return 'Opportunity.Id eq "' + entry.$key + '"';
            },
            view: 'opportunity_quotes_related'
          }, {
            name: 'SalesOrders',
            label: this.ordersText,
            where: function where(entry) {
              return 'Opportunity.Id eq "' + entry.$key + '"';
            },
            view: 'opportunity_salesorders_related'
          }]
        }
      });
    },
    loadToolbars: function loadToolbars() {}
  });

  _lang2.default.setObject('icboe.Modules.OpportunityModule', __class);
  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQk9FL01vZHVsZXMvT3Bwb3J0dW5pdHlNb2R1bGUuanMiXSwibmFtZXMiOlsicmVzb3VyY2UiLCJfX2NsYXNzIiwiYWRkUXVvdGVUZXh0IiwiYWRkT3JkZXJUZXh0IiwicmVsYXRlZEVSUEl0ZW1zVGV4dCIsInF1b3Rlc1RleHQiLCJvcmRlcnNUZXh0IiwiaW5pdCIsImxvYWRWaWV3cyIsImFtIiwiYXBwbGljYXRpb25Nb2R1bGUiLCJyZWdpc3RlclZpZXciLCJpZCIsImdyb3Vwc0VuYWJsZWQiLCJoYXNTZXR0aW5ncyIsImV4cG9zZSIsInF1ZXJ5T3JkZXJCeSIsImxvYWRDdXN0b21pemF0aW9ucyIsImV4dGVuZCIsImNybSIsIlZpZXdzIiwiT3Bwb3J0dW5pdHkiLCJEZXRhaWwiLCJfb25BZGRRdW90ZUNsaWNrIiwicmVxdWVzdCIsIlNhZ2UiLCJTRGF0YSIsIkNsaWVudCIsIlNEYXRhU2VydmljZU9wZXJhdGlvblJlcXVlc3QiLCJBcHAiLCJnZXRTZXJ2aWNlIiwic2V0UmVzb3VyY2VLaW5kIiwic2V0T3BlcmF0aW9uTmFtZSIsImVudHJ5IiwiJG5hbWUiLCJlbnRpdHkiLCIka2V5IiwiZXhlY3V0ZSIsInN1Y2Nlc3MiLCJkYXRhIiwidmlldyIsImdldFZpZXciLCJzaG93Iiwia2V5IiwicmVzcG9uc2UiLCJSZXN1bHQiLCJmYWlsdXJlIiwiX29uQWRkT3JkZXJDbGljayIsInJlZ2lzdGVyQ3VzdG9taXphdGlvbiIsImF0Iiwicm93IiwibmFtZSIsInR5cGUiLCJ3aGVyZSIsInZhbHVlIiwicHJvcGVydHkiLCJsYWJlbCIsImljb25DbGFzcyIsImFjdGlvbiIsInNlY3VyaXR5IiwidGl0bGUiLCJsaXN0IiwiZW5hYmxlT2ZmbGluZSIsImNoaWxkcmVuIiwibG9hZFRvb2xiYXJzIiwic2V0T2JqZWN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7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QUFLbEQsVUFGWDtBQUdEK0MsbUJBQU8sU0FBU0EsS0FBVCxDQUFlcEIsS0FBZixFQUFzQjtBQUMzQiw2Q0FBNkJBLE1BQU1HLElBQW5DO0FBQ0QsYUFMQTtBQU1ESSxrQkFBTTtBQU5MLFdBUE87QUFMTDtBQU5nRCxPQUF6RDtBQTRCRCxLQTFJa0Y7QUEySW5Gd0Isa0JBQWMsU0FBU0EsWUFBVCxHQUF3QixDQUNyQztBQTVJa0YsR0FBckUsQ0FBaEI7O0FBK0lBLGlCQUFLQyxTQUFMLENBQWUsaUNBQWYsRUFBa0RoRSxPQUFsRDtvQkFDZUEsTyIsImZpbGUiOiJPcHBvcnR1bml0eU1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBDb3B5cmlnaHQgMjAxNyBJbmZvclxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBkZWNsYXJlIGZyb20gJ2Rvam8vX2Jhc2UvZGVjbGFyZSc7XHJcbmltcG9ydCBsYW5nIGZyb20gJ2Rvam8vX2Jhc2UvbGFuZyc7XHJcbmltcG9ydCBfTW9kdWxlIGZyb20gJy4vX01vZHVsZSc7XHJcbmltcG9ydCBRdW90ZXNMaXN0IGZyb20gJy4uL1ZpZXdzL1F1b3Rlcy9MaXN0JztcclxuaW1wb3J0IFNhbGVzT3JkZXJzTGlzdCBmcm9tICcuLi9WaWV3cy9TYWxlc09yZGVycy9MaXN0JztcclxuaW1wb3J0IGdldFJlc291cmNlIGZyb20gJ2FyZ29zL0kxOG4nO1xyXG5cclxuY29uc3QgcmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgnb3Bwb3J0dW5pdHlNb2R1bGUnKTtcclxuXHJcbmNvbnN0IF9fY2xhc3MgPSBkZWNsYXJlKCdjcm0uSW50ZWdyYXRpb25zLkJPRS5Nb2R1bGVzLk9wcG9ydHVuaXR5TW9kdWxlJywgW19Nb2R1bGVdLCB7XHJcbiAgYWRkUXVvdGVUZXh0OiByZXNvdXJjZS5hZGRRdW90ZVRleHQsXHJcbiAgYWRkT3JkZXJUZXh0OiByZXNvdXJjZS5hZGRPcmRlclRleHQsXHJcbiAgcmVsYXRlZEVSUEl0ZW1zVGV4dDogcmVzb3VyY2UucmVsYXRlZEVSUEl0ZW1zVGV4dCxcclxuICBxdW90ZXNUZXh0OiByZXNvdXJjZS5xdW90ZXNUZXh0LFxyXG4gIG9yZGVyc1RleHQ6IHJlc291cmNlLm9yZGVyc1RleHQsXHJcblxyXG4gIGluaXQ6IGZ1bmN0aW9uIGluaXQoKSB7XHJcbiAgfSxcclxuICBsb2FkVmlld3M6IGZ1bmN0aW9uIGxvYWRWaWV3cygpIHtcclxuICAgIGNvbnN0IGFtID0gdGhpcy5hcHBsaWNhdGlvbk1vZHVsZTtcclxuXHJcbiAgICBhbS5yZWdpc3RlclZpZXcobmV3IFF1b3Rlc0xpc3Qoe1xyXG4gICAgICBpZDogJ29wcG9ydHVuaXR5X3F1b3Rlc19yZWxhdGVkJyxcclxuICAgICAgZ3JvdXBzRW5hYmxlZDogZmFsc2UsXHJcbiAgICAgIGhhc1NldHRpbmdzOiBmYWxzZSxcclxuICAgICAgZXhwb3NlOiBmYWxzZSxcclxuICAgICAgcXVlcnlPcmRlckJ5OiAnQ3JlYXRlRGF0ZSBhc2MnLFxyXG4gICAgfSkpO1xyXG5cclxuICAgIGFtLnJlZ2lzdGVyVmlldyhuZXcgU2FsZXNPcmRlcnNMaXN0KHtcclxuICAgICAgaWQ6ICdvcHBvcnR1bml0eV9zYWxlc29yZGVyc19yZWxhdGVkJyxcclxuICAgICAgZ3JvdXBzRW5hYmxlZDogZmFsc2UsXHJcbiAgICAgIGhhc1NldHRpbmdzOiBmYWxzZSxcclxuICAgICAgZXhwb3NlOiBmYWxzZSxcclxuICAgICAgcXVlcnlPcmRlckJ5OiAnQ3JlYXRlRGF0ZSBhc2MnLFxyXG4gICAgfSkpO1xyXG4gIH0sXHJcbiAgbG9hZEN1c3RvbWl6YXRpb25zOiBmdW5jdGlvbiBsb2FkQ3VzdG9taXphdGlvbnMoKSB7XHJcbiAgICBjb25zdCBhbSA9IHRoaXMuYXBwbGljYXRpb25Nb2R1bGU7XHJcblxyXG4gICAgbGFuZy5leHRlbmQoY3JtLlZpZXdzLk9wcG9ydHVuaXR5LkRldGFpbCwge1xyXG4gICAgICBfb25BZGRRdW90ZUNsaWNrOiBmdW5jdGlvbiBfb25BZGRRdW90ZUNsaWNrKCkge1xyXG4gICAgICAgIGNvbnN0IHJlcXVlc3QgPSBuZXcgU2FnZS5TRGF0YS5DbGllbnQuU0RhdGFTZXJ2aWNlT3BlcmF0aW9uUmVxdWVzdChBcHAuZ2V0U2VydmljZSgpKTtcclxuICAgICAgICByZXF1ZXN0LnNldFJlc291cmNlS2luZCgnT3Bwb3J0dW5pdGllcycpO1xyXG4gICAgICAgIHJlcXVlc3Quc2V0T3BlcmF0aW9uTmFtZSgnQ3JlYXRlUXVvdGVGcm9tT3Bwb3J0dW5pdHknKTtcclxuICAgICAgICBjb25zdCBlbnRyeSA9IHtcclxuICAgICAgICAgICRuYW1lOiAnQ3JlYXRlUXVvdGVGcm9tT3Bwb3J0dW5pdHknLFxyXG4gICAgICAgICAgcmVxdWVzdDoge1xyXG4gICAgICAgICAgICBlbnRpdHk6IHtcclxuICAgICAgICAgICAgICAka2V5OiB0aGlzLmVudHJ5LiRrZXksXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmVxdWVzdC5leGVjdXRlKGVudHJ5LCB7XHJcbiAgICAgICAgICBzdWNjZXNzOiAoZGF0YSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCB2aWV3ID0gQXBwLmdldFZpZXcoJ3F1b3RlX2RldGFpbCcpO1xyXG4gICAgICAgICAgICB2aWV3LnNob3coe1xyXG4gICAgICAgICAgICAgIGtleTogZGF0YS5yZXNwb25zZS5SZXN1bHQsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGZhaWx1cmU6ICgpID0+IHtcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0sXHJcbiAgICAgIF9vbkFkZE9yZGVyQ2xpY2s6IGZ1bmN0aW9uIF9vbkFkZE9yZGVyQ2xpY2soKSB7XHJcbiAgICAgICAgY29uc3QgcmVxdWVzdCA9IG5ldyBTYWdlLlNEYXRhLkNsaWVudC5TRGF0YVNlcnZpY2VPcGVyYXRpb25SZXF1ZXN0KEFwcC5nZXRTZXJ2aWNlKCkpO1xyXG4gICAgICAgIHJlcXVlc3Quc2V0UmVzb3VyY2VLaW5kKCdPcHBvcnR1bml0aWVzJyk7XHJcbiAgICAgICAgcmVxdWVzdC5zZXRPcGVyYXRpb25OYW1lKCdDcmVhdGVTYWxlc09yZGVyRnJvbU9wcG9ydHVuaXR5Jyk7XHJcblxyXG4gICAgICAgIGNvbnN0IGVudHJ5ID0ge1xyXG4gICAgICAgICAgJG5hbWU6ICdDcmVhdGVTYWxlc09yZGVyRnJvbU9wcG9ydHVuaXR5JyxcclxuICAgICAgICAgIHJlcXVlc3Q6IHtcclxuICAgICAgICAgICAgZW50aXR5OiB7XHJcbiAgICAgICAgICAgICAgJGtleTogdGhpcy5lbnRyeS4ka2V5LFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgfSxcclxuICAgICAgICB9O1xyXG4gICAgICAgIHJlcXVlc3QuZXhlY3V0ZShlbnRyeSwge1xyXG4gICAgICAgICAgc3VjY2VzczogKGRhdGEpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgdmlldyA9IEFwcC5nZXRWaWV3KCdzYWxlc29yZGVyX2RldGFpbCcpO1xyXG4gICAgICAgICAgICB2aWV3LnNob3coe1xyXG4gICAgICAgICAgICAgIGtleTogZGF0YS5yZXNwb25zZS5SZXN1bHQsXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIGZhaWx1cmU6ICgpID0+IHtcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgfSk7XHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuXHJcbiAgICAvKlxyXG4gICAgICogUXVpY2sgQWN0aW9uc1xyXG4gICAgICovXHJcbiAgICBhbS5yZWdpc3RlckN1c3RvbWl6YXRpb24oJ2RldGFpbCcsICdvcHBvcnR1bml0eV9kZXRhaWwnLCB7XHJcbiAgICAgIGF0OiBmdW5jdGlvbiBhdChyb3cpIHtcclxuICAgICAgICByZXR1cm4gcm93Lm5hbWUgPT09ICdBZGROb3RlQWN0aW9uJztcclxuICAgICAgfSxcclxuICAgICAgdHlwZTogJ2luc2VydCcsXHJcbiAgICAgIHdoZXJlOiAnYWZ0ZXInLFxyXG4gICAgICB2YWx1ZTogW3tcclxuICAgICAgICBuYW1lOiAnQWRkUXVvdGUnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnRGVzY3JpcHRpb24nLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLmFkZFF1b3RlVGV4dCxcclxuICAgICAgICBpY29uQ2xhc3M6ICdkb2N1bWVudCcsXHJcbiAgICAgICAgYWN0aW9uOiAnX29uQWRkUXVvdGVDbGljaycsXHJcbiAgICAgICAgc2VjdXJpdHk6ICdFbnRpdGllcy9RdW90ZS9BZGQnLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ0FkZE9yZGVyJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0Rlc2NyaXB0aW9uJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5hZGRPcmRlclRleHQsXHJcbiAgICAgICAgaWNvbkNsYXNzOiAnY2FydCcsXHJcbiAgICAgICAgYWN0aW9uOiAnX29uQWRkT3JkZXJDbGljaycsXHJcbiAgICAgICAgc2VjdXJpdHk6ICdFbnRpdGllcy9TYWxlc09yZGVyL0FkZCcsXHJcbiAgICAgIH1dLFxyXG4gICAgfSk7XHJcblxyXG4gICAgLypcclxuICAgICAqIFJlbGF0ZWQgSXRlbXNcclxuICAgICAqL1xyXG4gICAgYW0ucmVnaXN0ZXJDdXN0b21pemF0aW9uKCdkZXRhaWwnLCAnb3Bwb3J0dW5pdHlfZGV0YWlsJywge1xyXG4gICAgICBhdDogZnVuY3Rpb24gYXQocm93KSB7XHJcbiAgICAgICAgcmV0dXJuIHJvdy5uYW1lID09PSAnUmVsYXRlZEl0ZW1zU2VjdGlvbic7XHJcbiAgICAgIH0sXHJcbiAgICAgIHR5cGU6ICdpbnNlcnQnLFxyXG4gICAgICB3aGVyZTogJ2FmdGVyJyxcclxuICAgICAgdmFsdWU6IHtcclxuICAgICAgICB0aXRsZTogdGhpcy5yZWxhdGVkRVJQSXRlbXNUZXh0LFxyXG4gICAgICAgIGxpc3Q6IHRydWUsXHJcbiAgICAgICAgbmFtZTogJ1JlbGF0ZWRFUlBJdGVtc1NlY3Rpb24nLFxyXG4gICAgICAgIGVuYWJsZU9mZmxpbmU6IGZhbHNlLFxyXG4gICAgICAgIGNoaWxkcmVuOiBbe1xyXG4gICAgICAgICAgbmFtZTogJ1F1b3RlcycsXHJcbiAgICAgICAgICBsYWJlbDogdGhpcy5xdW90ZXNUZXh0LFxyXG4gICAgICAgICAgd2hlcmU6IGZ1bmN0aW9uIHdoZXJlKGVudHJ5KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBgT3Bwb3J0dW5pdHkuSWQgZXEgXCIke2VudHJ5LiRrZXl9XCJgO1xyXG4gICAgICAgICAgfSxcclxuICAgICAgICAgIHZpZXc6ICdvcHBvcnR1bml0eV9xdW90ZXNfcmVsYXRlZCcsXHJcbiAgICAgICAgfSwge1xyXG4gICAgICAgICAgbmFtZTogJ1NhbGVzT3JkZXJzJyxcclxuICAgICAgICAgIGxhYmVsOiB0aGlzLm9yZGVyc1RleHQsXHJcbiAgICAgICAgICB3aGVyZTogZnVuY3Rpb24gd2hlcmUoZW50cnkpIHtcclxuICAgICAgICAgICAgcmV0dXJuIGBPcHBvcnR1bml0eS5JZCBlcSBcIiR7ZW50cnkuJGtleX1cImA7XHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgICAgdmlldzogJ29wcG9ydHVuaXR5X3NhbGVzb3JkZXJzX3JlbGF0ZWQnLFxyXG4gICAgICAgIH1dLFxyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcbiAgfSxcclxuICBsb2FkVG9vbGJhcnM6IGZ1bmN0aW9uIGxvYWRUb29sYmFycygpIHtcclxuICB9LFxyXG59KTtcclxuXHJcbmxhbmcuc2V0T2JqZWN0KCdpY2JvZS5Nb2R1bGVzLk9wcG9ydHVuaXR5TW9kdWxlJywgX19jbGFzcyk7XHJcbmV4cG9ydCBkZWZhdWx0IF9fY2xhc3M7XHJcbiJdfQ==
define('crm/Integrations/BOE/Models/QuoteItem/Base', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', 'argos/Models/_ModelBase', '../Names', 'argos/I18n'], function (module, exports, _declare, _lang, _ModelBase2, _Names, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _lang2 = _interopRequireDefault(_lang);

  var _ModelBase3 = _interopRequireDefault(_ModelBase2);

  var _Names2 = _interopRequireDefault(_Names);

  var _I18n2 = _interopRequireDefault(_I18n);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var resource = (0, _I18n2.default)('quoteItemModel'); /* Copyright 2017 Infor
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

  var quoteResource = (0, _I18n2.default)('quoteModel');

  var __class = (0, _declare2.default)('crm.Integrations.BOE.Models.QuoteItem.Base', [_ModelBase3.default], {
    contractName: 'dynamic',
    resourceKind: 'quoteItems',
    entityName: 'QuoteItem',
    entityDisplayName: resource.entityDisplayName,
    entityDisplayNamePlural: resource.entityDisplayNamePlural,
    modelName: _Names2.default.QUOTEITEM,
    iconClass: 'document',
    detailViewId: 'quote_lines_detail',
    listViewId: 'quote_lines_list',
    editViewId: '',
    createRelationships: function createRelationships() {
      var rel = this.relationships || (this.relationships = [{
        name: 'Quote',
        displayName: quoteResource.entityDisplayName,
        type: 'ManyToOne',
        parentProperty: 'Quote',
        parentPropertyType: 'object',
        relatedEntity: 'Quote'
      }]);
      return rel;
    }
  });
  _lang2.default.setObject('icboe.Models.QuoteItem.Base', __class);
  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQk9FL01vZGVscy9RdW90ZUl0ZW0vQmFzZS5qcyJdLCJuYW1lcyI6WyJyZXNvdXJjZSIsInF1b3RlUmVzb3VyY2UiLCJfX2NsYXNzIiwiY29udHJhY3ROYW1lIiwicmVzb3VyY2VLaW5kIiwiZW50aXR5TmFtZSIsImVudGl0eURpc3BsYXlOYW1lIiwiZW50aXR5RGlzcGxheU5hbWVQbHVyYWwiLCJtb2RlbE5hbWUiLCJRVU9URUlURU0iLCJpY29uQ2xhc3MiLCJkZXRhaWxWaWV3SWQiLCJsaXN0Vmlld0lkIiwiZWRpdFZpZXdJZCIsImNyZWF0ZVJlbGF0aW9uc2hpcHMiLCJyZWwiLCJyZWxhdGlvbnNoaXBzIiwibmFtZSIsImRpc3BsYXlOYW1lIiwidHlwZSIsInBhcmVudFByb3BlcnR5IiwicGFyZW50UHJvcGVydHlUeXBlIiwicmVsYXRlZEVudGl0eSIsInNldE9iamVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBcUJBLE1BQU1BLFdBQVcsb0JBQVksZ0JBQVosQ0FBakIsQyxDQXJCQTs7Ozs7Ozs7Ozs7Ozs7O0FBc0JBLE1BQU1DLGdCQUFnQixvQkFBWSxZQUFaLENBQXRCOztBQUVBLE1BQU1DLFVBQVUsdUJBQVEsNENBQVIsRUFBc0QscUJBQXRELEVBQW9FO0FBQ2xGQyxrQkFBYyxTQURvRTtBQUVsRkMsa0JBQWMsWUFGb0U7QUFHbEZDLGdCQUFZLFdBSHNFO0FBSWxGQyx1QkFBbUJOLFNBQVNNLGlCQUpzRDtBQUtsRkMsNkJBQXlCUCxTQUFTTyx1QkFMZ0Q7QUFNbEZDLGVBQVcsZ0JBQVlDLFNBTjJEO0FBT2xGQyxlQUFXLFVBUHVFO0FBUWxGQyxrQkFBYyxvQkFSb0U7QUFTbEZDLGdCQUFZLGtCQVRzRTtBQVVsRkMsZ0JBQVksRUFWc0U7QUFXbEZDLHlCQUFxQixTQUFTQSxtQkFBVCxHQUErQjtBQUNsRCxVQUFNQyxNQUFNLEtBQUtDLGFBQUwsS0FBdUIsS0FBS0EsYUFBTCxHQUFxQixDQUFDO0FBQ3ZEQyxjQUFNLE9BRGlEO0FBRXZEQyxxQkFBYWpCLGNBQWNLLGlCQUY0QjtBQUd2RGEsY0FBTSxXQUhpRDtBQUl2REMsd0JBQWdCLE9BSnVDO0FBS3ZEQyw0QkFBb0IsUUFMbUM7QUFNdkRDLHVCQUFlO0FBTndDLE9BQUQsQ0FBNUMsQ0FBWjtBQVFBLGFBQU9QLEdBQVA7QUFDRDtBQXJCaUYsR0FBcEUsQ0FBaEI7QUF1QkEsaUJBQUtRLFNBQUwsQ0FBZSw2QkFBZixFQUE4Q3JCLE9BQTlDO29CQUNlQSxPIiwiZmlsZSI6IkJhc2UuanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IDIwMTcgSW5mb3JcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG5pbXBvcnQgZGVjbGFyZSBmcm9tICdkb2pvL19iYXNlL2RlY2xhcmUnO1xyXG5pbXBvcnQgbGFuZyBmcm9tICdkb2pvL19iYXNlL2xhbmcnO1xyXG5pbXBvcnQgX01vZGVsQmFzZSBmcm9tICdhcmdvcy9Nb2RlbHMvX01vZGVsQmFzZSc7XHJcbmltcG9ydCBNT0RFTF9OQU1FUyBmcm9tICcuLi9OYW1lcyc7XHJcbmltcG9ydCBnZXRSZXNvdXJjZSBmcm9tICdhcmdvcy9JMThuJztcclxuXHJcbmNvbnN0IHJlc291cmNlID0gZ2V0UmVzb3VyY2UoJ3F1b3RlSXRlbU1vZGVsJyk7XHJcbmNvbnN0IHF1b3RlUmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgncXVvdGVNb2RlbCcpO1xyXG5cclxuY29uc3QgX19jbGFzcyA9IGRlY2xhcmUoJ2NybS5JbnRlZ3JhdGlvbnMuQk9FLk1vZGVscy5RdW90ZUl0ZW0uQmFzZScsIFtfTW9kZWxCYXNlXSwge1xyXG4gIGNvbnRyYWN0TmFtZTogJ2R5bmFtaWMnLFxyXG4gIHJlc291cmNlS2luZDogJ3F1b3RlSXRlbXMnLFxyXG4gIGVudGl0eU5hbWU6ICdRdW90ZUl0ZW0nLFxyXG4gIGVudGl0eURpc3BsYXlOYW1lOiByZXNvdXJjZS5lbnRpdHlEaXNwbGF5TmFtZSxcclxuICBlbnRpdHlEaXNwbGF5TmFtZVBsdXJhbDogcmVzb3VyY2UuZW50aXR5RGlzcGxheU5hbWVQbHVyYWwsXHJcbiAgbW9kZWxOYW1lOiBNT0RFTF9OQU1FUy5RVU9URUlURU0sXHJcbiAgaWNvbkNsYXNzOiAnZG9jdW1lbnQnLFxyXG4gIGRldGFpbFZpZXdJZDogJ3F1b3RlX2xpbmVzX2RldGFpbCcsXHJcbiAgbGlzdFZpZXdJZDogJ3F1b3RlX2xpbmVzX2xpc3QnLFxyXG4gIGVkaXRWaWV3SWQ6ICcnLFxyXG4gIGNyZWF0ZVJlbGF0aW9uc2hpcHM6IGZ1bmN0aW9uIGNyZWF0ZVJlbGF0aW9uc2hpcHMoKSB7XHJcbiAgICBjb25zdCByZWwgPSB0aGlzLnJlbGF0aW9uc2hpcHMgfHwgKHRoaXMucmVsYXRpb25zaGlwcyA9IFt7XHJcbiAgICAgIG5hbWU6ICdRdW90ZScsXHJcbiAgICAgIGRpc3BsYXlOYW1lOiBxdW90ZVJlc291cmNlLmVudGl0eURpc3BsYXlOYW1lLFxyXG4gICAgICB0eXBlOiAnTWFueVRvT25lJyxcclxuICAgICAgcGFyZW50UHJvcGVydHk6ICdRdW90ZScsXHJcbiAgICAgIHBhcmVudFByb3BlcnR5VHlwZTogJ29iamVjdCcsXHJcbiAgICAgIHJlbGF0ZWRFbnRpdHk6ICdRdW90ZScsXHJcbiAgICB9XSk7XHJcbiAgICByZXR1cm4gcmVsO1xyXG4gIH0sXHJcbn0pO1xyXG5sYW5nLnNldE9iamVjdCgnaWNib2UuTW9kZWxzLlF1b3RlSXRlbS5CYXNlJywgX19jbGFzcyk7XHJcbmV4cG9ydCBkZWZhdWx0IF9fY2xhc3M7XHJcbiJdfQ==
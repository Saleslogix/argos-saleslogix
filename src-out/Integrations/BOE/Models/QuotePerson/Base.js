define('crm/Integrations/BOE/Models/QuotePerson/Base', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', 'argos/Models/_ModelBase', '../Names', 'argos/I18n'], function (module, exports, _declare, _lang, _ModelBase2, _Names, _I18n) {
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

  var resource = (0, _I18n2.default)('quotePersonModel'); /* Copyright 2017 Infor
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

  var __class = (0, _declare2.default)('crm.Integrations.BOE.Models.QuotePerson.Base', [_ModelBase3.default], {
    contractName: 'dynamic',
    resourceKind: 'quotePersons',
    entityName: 'QuotePerson',
    entityDisplayName: resource.entityDisplayName,
    entityDisplayNamePlural: resource.entityDisplayNamePlural,
    modelName: _Names2.default.QUOTEPERSON,
    iconClass: '',
    detailViewId: '',
    listViewId: 'quotePerson_list',
    editViewId: '',
    createRelationships: function createRelationships() {
      var rel = this.relationships || (this.relationships = [{
        name: 'Quote',
        displayName: quoteResource.entityDisplayNamePlural,
        type: 'OneToMany',
        relatedEntity: 'Quote',
        relatedProperty: 'EntityId'
      }]);
      return rel;
    }
  });
  _lang2.default.setObject('icboe.Models.QuotePerson.Base', __class);
  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQk9FL01vZGVscy9RdW90ZVBlcnNvbi9CYXNlLmpzIl0sIm5hbWVzIjpbInJlc291cmNlIiwicXVvdGVSZXNvdXJjZSIsIl9fY2xhc3MiLCJjb250cmFjdE5hbWUiLCJyZXNvdXJjZUtpbmQiLCJlbnRpdHlOYW1lIiwiZW50aXR5RGlzcGxheU5hbWUiLCJlbnRpdHlEaXNwbGF5TmFtZVBsdXJhbCIsIm1vZGVsTmFtZSIsIlFVT1RFUEVSU09OIiwiaWNvbkNsYXNzIiwiZGV0YWlsVmlld0lkIiwibGlzdFZpZXdJZCIsImVkaXRWaWV3SWQiLCJjcmVhdGVSZWxhdGlvbnNoaXBzIiwicmVsIiwicmVsYXRpb25zaGlwcyIsIm5hbWUiLCJkaXNwbGF5TmFtZSIsInR5cGUiLCJyZWxhdGVkRW50aXR5IiwicmVsYXRlZFByb3BlcnR5Iiwic2V0T2JqZWN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFxQkEsTUFBTUEsV0FBVyxvQkFBWSxrQkFBWixDQUFqQixDLENBckJBOzs7Ozs7Ozs7Ozs7Ozs7QUFzQkEsTUFBTUMsZ0JBQWdCLG9CQUFZLFlBQVosQ0FBdEI7O0FBRUEsTUFBTUMsVUFBVSx1QkFBUSw4Q0FBUixFQUF3RCxxQkFBeEQsRUFBc0U7QUFDcEZDLGtCQUFjLFNBRHNFO0FBRXBGQyxrQkFBYyxjQUZzRTtBQUdwRkMsZ0JBQVksYUFId0U7QUFJcEZDLHVCQUFtQk4sU0FBU00saUJBSndEO0FBS3BGQyw2QkFBeUJQLFNBQVNPLHVCQUxrRDtBQU1wRkMsZUFBVyxnQkFBWUMsV0FONkQ7QUFPcEZDLGVBQVcsRUFQeUU7QUFRcEZDLGtCQUFjLEVBUnNFO0FBU3BGQyxnQkFBWSxrQkFUd0U7QUFVcEZDLGdCQUFZLEVBVndFO0FBV3BGQyx5QkFBcUIsU0FBU0EsbUJBQVQsR0FBK0I7QUFDbEQsVUFBTUMsTUFBTSxLQUFLQyxhQUFMLEtBQXVCLEtBQUtBLGFBQUwsR0FBcUIsQ0FBQztBQUN2REMsY0FBTSxPQURpRDtBQUV2REMscUJBQWFqQixjQUFjTSx1QkFGNEI7QUFHdkRZLGNBQU0sV0FIaUQ7QUFJdkRDLHVCQUFlLE9BSndDO0FBS3ZEQyx5QkFBaUI7QUFMc0MsT0FBRCxDQUE1QyxDQUFaO0FBUUEsYUFBT04sR0FBUDtBQUNEO0FBckJtRixHQUF0RSxDQUFoQjtBQXVCQSxpQkFBS08sU0FBTCxDQUFlLCtCQUFmLEVBQWdEcEIsT0FBaEQ7b0JBQ2VBLE8iLCJmaWxlIjoiQmFzZS5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBDb3B5cmlnaHQgMjAxNyBJbmZvclxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBkZWNsYXJlIGZyb20gJ2Rvam8vX2Jhc2UvZGVjbGFyZSc7XHJcbmltcG9ydCBsYW5nIGZyb20gJ2Rvam8vX2Jhc2UvbGFuZyc7XHJcbmltcG9ydCBfTW9kZWxCYXNlIGZyb20gJ2FyZ29zL01vZGVscy9fTW9kZWxCYXNlJztcclxuaW1wb3J0IE1PREVMX05BTUVTIGZyb20gJy4uL05hbWVzJztcclxuaW1wb3J0IGdldFJlc291cmNlIGZyb20gJ2FyZ29zL0kxOG4nO1xyXG5cclxuY29uc3QgcmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgncXVvdGVQZXJzb25Nb2RlbCcpO1xyXG5jb25zdCBxdW90ZVJlc291cmNlID0gZ2V0UmVzb3VyY2UoJ3F1b3RlTW9kZWwnKTtcclxuXHJcbmNvbnN0IF9fY2xhc3MgPSBkZWNsYXJlKCdjcm0uSW50ZWdyYXRpb25zLkJPRS5Nb2RlbHMuUXVvdGVQZXJzb24uQmFzZScsIFtfTW9kZWxCYXNlXSwge1xyXG4gIGNvbnRyYWN0TmFtZTogJ2R5bmFtaWMnLFxyXG4gIHJlc291cmNlS2luZDogJ3F1b3RlUGVyc29ucycsXHJcbiAgZW50aXR5TmFtZTogJ1F1b3RlUGVyc29uJyxcclxuICBlbnRpdHlEaXNwbGF5TmFtZTogcmVzb3VyY2UuZW50aXR5RGlzcGxheU5hbWUsXHJcbiAgZW50aXR5RGlzcGxheU5hbWVQbHVyYWw6IHJlc291cmNlLmVudGl0eURpc3BsYXlOYW1lUGx1cmFsLFxyXG4gIG1vZGVsTmFtZTogTU9ERUxfTkFNRVMuUVVPVEVQRVJTT04sXHJcbiAgaWNvbkNsYXNzOiAnJyxcclxuICBkZXRhaWxWaWV3SWQ6ICcnLFxyXG4gIGxpc3RWaWV3SWQ6ICdxdW90ZVBlcnNvbl9saXN0JyxcclxuICBlZGl0Vmlld0lkOiAnJyxcclxuICBjcmVhdGVSZWxhdGlvbnNoaXBzOiBmdW5jdGlvbiBjcmVhdGVSZWxhdGlvbnNoaXBzKCkge1xyXG4gICAgY29uc3QgcmVsID0gdGhpcy5yZWxhdGlvbnNoaXBzIHx8ICh0aGlzLnJlbGF0aW9uc2hpcHMgPSBbe1xyXG4gICAgICBuYW1lOiAnUXVvdGUnLFxyXG4gICAgICBkaXNwbGF5TmFtZTogcXVvdGVSZXNvdXJjZS5lbnRpdHlEaXNwbGF5TmFtZVBsdXJhbCxcclxuICAgICAgdHlwZTogJ09uZVRvTWFueScsXHJcbiAgICAgIHJlbGF0ZWRFbnRpdHk6ICdRdW90ZScsXHJcbiAgICAgIHJlbGF0ZWRQcm9wZXJ0eTogJ0VudGl0eUlkJyxcclxuICAgIH0sXHJcbiAgICBdKTtcclxuICAgIHJldHVybiByZWw7XHJcbiAgfSxcclxufSk7XHJcbmxhbmcuc2V0T2JqZWN0KCdpY2JvZS5Nb2RlbHMuUXVvdGVQZXJzb24uQmFzZScsIF9fY2xhc3MpO1xyXG5leHBvcnQgZGVmYXVsdCBfX2NsYXNzO1xyXG4iXX0=
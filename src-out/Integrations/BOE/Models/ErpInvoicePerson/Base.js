define('crm/Integrations/BOE/Models/ErpInvoicePerson/Base', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', 'argos/Models/_ModelBase', '../Names', 'argos/I18n'], function (module, exports, _declare, _lang, _ModelBase2, _Names, _I18n) {
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

  var resource = (0, _I18n2.default)('erpInvoicePersonModel'); /* Copyright 2017 Infor
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

  var __class = (0, _declare2.default)('crm.Integrations.BOE.Models.ErpInvoicePerson.Base', [_ModelBase3.default], {
    contractName: 'dynamic',
    resourceKind: 'erpInvoicePersons',
    entityName: 'ERPInvoicePerson',
    entityDisplayName: resource.entityDisplayName,
    entityDisplayNamePlural: resource.entityDisplayNamePlural,
    modelName: _Names2.default.ERPINVOICEPERSON,
    iconClass: 'user',
    detailViewId: '',
    listViewId: 'invoiceperson_list',
    editViewId: '',
    createRelationships: function createRelationships() {
      var rel = this.relationships || (this.relationships = []);
      return rel;
    }
  });
  _lang2.default.setObject('icboe.Models.ErpInvoicePerson.Base', __class);
  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQk9FL01vZGVscy9FcnBJbnZvaWNlUGVyc29uL0Jhc2UuanMiXSwibmFtZXMiOlsicmVzb3VyY2UiLCJfX2NsYXNzIiwiY29udHJhY3ROYW1lIiwicmVzb3VyY2VLaW5kIiwiZW50aXR5TmFtZSIsImVudGl0eURpc3BsYXlOYW1lIiwiZW50aXR5RGlzcGxheU5hbWVQbHVyYWwiLCJtb2RlbE5hbWUiLCJFUlBJTlZPSUNFUEVSU09OIiwiaWNvbkNsYXNzIiwiZGV0YWlsVmlld0lkIiwibGlzdFZpZXdJZCIsImVkaXRWaWV3SWQiLCJjcmVhdGVSZWxhdGlvbnNoaXBzIiwicmVsIiwicmVsYXRpb25zaGlwcyIsInNldE9iamVjdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBcUJBLE1BQU1BLFdBQVcsb0JBQVksdUJBQVosQ0FBakIsQyxDQXJCQTs7Ozs7Ozs7Ozs7Ozs7O0FBdUJBLE1BQU1DLFVBQVUsdUJBQVEsbURBQVIsRUFBNkQscUJBQTdELEVBQTJFO0FBQ3pGQyxrQkFBYyxTQUQyRTtBQUV6RkMsa0JBQWMsbUJBRjJFO0FBR3pGQyxnQkFBWSxrQkFINkU7QUFJekZDLHVCQUFtQkwsU0FBU0ssaUJBSjZEO0FBS3pGQyw2QkFBeUJOLFNBQVNNLHVCQUx1RDtBQU16RkMsZUFBVyxnQkFBWUMsZ0JBTmtFO0FBT3pGQyxlQUFXLE1BUDhFO0FBUXpGQyxrQkFBYyxFQVIyRTtBQVN6RkMsZ0JBQVksb0JBVDZFO0FBVXpGQyxnQkFBWSxFQVY2RTtBQVd6RkMseUJBQXFCLFNBQVNBLG1CQUFULEdBQStCO0FBQ2xELFVBQU1DLE1BQU0sS0FBS0MsYUFBTCxLQUF1QixLQUFLQSxhQUFMLEdBQXFCLEVBQTVDLENBQVo7QUFDQSxhQUFPRCxHQUFQO0FBQ0Q7QUFkd0YsR0FBM0UsQ0FBaEI7QUFnQkEsaUJBQUtFLFNBQUwsQ0FBZSxvQ0FBZixFQUFxRGYsT0FBckQ7b0JBQ2VBLE8iLCJmaWxlIjoiQmFzZS5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBDb3B5cmlnaHQgMjAxNyBJbmZvclxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBkZWNsYXJlIGZyb20gJ2Rvam8vX2Jhc2UvZGVjbGFyZSc7XHJcbmltcG9ydCBsYW5nIGZyb20gJ2Rvam8vX2Jhc2UvbGFuZyc7XHJcbmltcG9ydCBfTW9kZWxCYXNlIGZyb20gJ2FyZ29zL01vZGVscy9fTW9kZWxCYXNlJztcclxuaW1wb3J0IE1PREVMX05BTUVTIGZyb20gJy4uL05hbWVzJztcclxuaW1wb3J0IGdldFJlc291cmNlIGZyb20gJ2FyZ29zL0kxOG4nO1xyXG5cclxuY29uc3QgcmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgnZXJwSW52b2ljZVBlcnNvbk1vZGVsJyk7XHJcblxyXG5jb25zdCBfX2NsYXNzID0gZGVjbGFyZSgnY3JtLkludGVncmF0aW9ucy5CT0UuTW9kZWxzLkVycEludm9pY2VQZXJzb24uQmFzZScsIFtfTW9kZWxCYXNlXSwge1xyXG4gIGNvbnRyYWN0TmFtZTogJ2R5bmFtaWMnLFxyXG4gIHJlc291cmNlS2luZDogJ2VycEludm9pY2VQZXJzb25zJyxcclxuICBlbnRpdHlOYW1lOiAnRVJQSW52b2ljZVBlcnNvbicsXHJcbiAgZW50aXR5RGlzcGxheU5hbWU6IHJlc291cmNlLmVudGl0eURpc3BsYXlOYW1lLFxyXG4gIGVudGl0eURpc3BsYXlOYW1lUGx1cmFsOiByZXNvdXJjZS5lbnRpdHlEaXNwbGF5TmFtZVBsdXJhbCxcclxuICBtb2RlbE5hbWU6IE1PREVMX05BTUVTLkVSUElOVk9JQ0VQRVJTT04sXHJcbiAgaWNvbkNsYXNzOiAndXNlcicsXHJcbiAgZGV0YWlsVmlld0lkOiAnJyxcclxuICBsaXN0Vmlld0lkOiAnaW52b2ljZXBlcnNvbl9saXN0JyxcclxuICBlZGl0Vmlld0lkOiAnJyxcclxuICBjcmVhdGVSZWxhdGlvbnNoaXBzOiBmdW5jdGlvbiBjcmVhdGVSZWxhdGlvbnNoaXBzKCkge1xyXG4gICAgY29uc3QgcmVsID0gdGhpcy5yZWxhdGlvbnNoaXBzIHx8ICh0aGlzLnJlbGF0aW9uc2hpcHMgPSBbXSk7XHJcbiAgICByZXR1cm4gcmVsO1xyXG4gIH0sXHJcbn0pO1xyXG5sYW5nLnNldE9iamVjdCgnaWNib2UuTW9kZWxzLkVycEludm9pY2VQZXJzb24uQmFzZScsIF9fY2xhc3MpO1xyXG5leHBvcnQgZGVmYXVsdCBfX2NsYXNzO1xyXG4iXX0=
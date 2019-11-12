define('crm/Integrations/BOE/Views/ERPContactAssociations/List', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', 'argos/List', 'crm/Views/_RightDrawerListMixin', 'crm/Views/_MetricListMixin', 'crm/Views/_GroupListMixin', '../../Models/Names', 'argos/I18n'], function (module, exports, _declare, _lang, _List, _RightDrawerListMixin2, _MetricListMixin2, _GroupListMixin2, _Names, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _lang2 = _interopRequireDefault(_lang);

  var _List2 = _interopRequireDefault(_List);

  var _RightDrawerListMixin3 = _interopRequireDefault(_RightDrawerListMixin2);

  var _MetricListMixin3 = _interopRequireDefault(_MetricListMixin2);

  var _GroupListMixin3 = _interopRequireDefault(_GroupListMixin2);

  var _Names2 = _interopRequireDefault(_Names);

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

  var resource = (0, _I18n2.default)('erpContactAssociationsList');

  /**
   * @class crm.Integrations.BOE.Views.ERPContactAssociations.List
   */
  var __class = (0, _declare2.default)('crm.Integrations.BOE.Views.ERPContactAssociations.List', [_List2.default, _RightDrawerListMixin3.default, _MetricListMixin3.default, _GroupListMixin3.default], /** @lends crm.Integrations.BOE.Views.ERPContactAssociations.List# */{
    // Templates
    itemTemplate: new Simplate(['<p class="listview-heading">{%: $.Contact.NameLF %}</p>', '<p class="micro-text">{%: $.Account.AccountName %}</p>']),

    // Localization
    titleText: resource.titleText,

    // View Properties
    id: 'erpcontactassociations_list',
    detailView: 'contact_detail',
    allowSelection: true,
    enableActions: false,
    modelName: _Names2.default.ERPCONTACTASSOCIATION,
    resourceKind: 'erpContactAccounts',
    security: 'Entities/Contact/View',
    insertSecurity: 'Entities/Contact/Add',

    // Card layout
    itemIconClass: 'spreadsheet',

    // Groups
    enableDynamicGroupLayout: true,
    groupsEnabled: true,

    /**
     * Override _ListBase function - Navigates to the defined `this.detailView` passing the params as navigation options.
     * @param {String} key Key of the entry to be shown in detail
     * @param {String} descriptor Description of the entry, will be used as the top toolbar title text
     * @param {Object} additionalOptions Additional options to be passed into the next view
     */
    navigateToDetailView: function navigateToDetailView(key, descriptor, additionalOptions) {
      // Ignore ContactAssociation and navigate to contact detail view
      var contact = this.entries[key].Contact;
      var view = this.app.getView(this.detailView);
      var options = {
        descriptor: contact.NameLF, // keep for backwards compat
        title: contact.NameLF,
        key: contact.$key,
        fromContext: this
      };

      if (additionalOptions) {
        options = _lang2.default.mixin(options, additionalOptions);
      }

      if (view) {
        view.show(options);
      }
    },
    formatSearchQuery: function formatSearchQuery(searchQuery) {
      var q = this.escapeSearchQuery(searchQuery.toUpperCase());
      return 'upper(Contact.NameLF) like "%' + q + '%" or upper(Account.AccountName) like "%' + q + '%"';
    }
  });

  _lang2.default.setObject('icboe.Views.ERPContactAssociations.List', __class);
  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQk9FL1ZpZXdzL0VSUENvbnRhY3RBc3NvY2lhdGlvbnMvTGlzdC5qcyJdLCJuYW1lcyI6WyJyZXNvdXJjZSIsIl9fY2xhc3MiLCJpdGVtVGVtcGxhdGUiLCJTaW1wbGF0ZSIsInRpdGxlVGV4dCIsImlkIiwiZGV0YWlsVmlldyIsImFsbG93U2VsZWN0aW9uIiwiZW5hYmxlQWN0aW9ucyIsIm1vZGVsTmFtZSIsIkVSUENPTlRBQ1RBU1NPQ0lBVElPTiIsInJlc291cmNlS2luZCIsInNlY3VyaXR5IiwiaW5zZXJ0U2VjdXJpdHkiLCJpdGVtSWNvbkNsYXNzIiwiZW5hYmxlRHluYW1pY0dyb3VwTGF5b3V0IiwiZ3JvdXBzRW5hYmxlZCIsIm5hdmlnYXRlVG9EZXRhaWxWaWV3Iiwia2V5IiwiZGVzY3JpcHRvciIsImFkZGl0aW9uYWxPcHRpb25zIiwiY29udGFjdCIsImVudHJpZXMiLCJDb250YWN0IiwidmlldyIsImFwcCIsImdldFZpZXciLCJvcHRpb25zIiwiTmFtZUxGIiwidGl0bGUiLCIka2V5IiwiZnJvbUNvbnRleHQiLCJtaXhpbiIsInNob3ciLCJmb3JtYXRTZWFyY2hRdWVyeSIsInNlYXJjaFF1ZXJ5IiwicSIsImVzY2FwZVNlYXJjaFF1ZXJ5IiwidG9VcHBlckNhc2UiLCJzZXRPYmplY3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7QUF3QkEsTUFBTUEsV0FBVyxvQkFBWSw0QkFBWixDQUFqQjs7QUFFQTs7O0FBR0EsTUFBTUMsVUFBVSx1QkFBUSx3REFBUixFQUFrRSxxR0FBbEUsRUFBb0kscUVBQXFFO0FBQ3ZOO0FBQ0FDLGtCQUFjLElBQUlDLFFBQUosQ0FBYSxDQUN6Qix5REFEeUIsRUFFekIsd0RBRnlCLENBQWIsQ0FGeU07O0FBT3ZOO0FBQ0FDLGVBQVdKLFNBQVNJLFNBUm1NOztBQVV2TjtBQUNBQyxRQUFJLDZCQVhtTjtBQVl2TkMsZ0JBQVksZ0JBWjJNO0FBYXZOQyxvQkFBZ0IsSUFidU07QUFjdk5DLG1CQUFlLEtBZHdNO0FBZXZOQyxlQUFXLGdCQUFZQyxxQkFmZ007QUFnQnZOQyxrQkFBYyxvQkFoQnlNO0FBaUJ2TkMsY0FBVSx1QkFqQjZNO0FBa0J2TkMsb0JBQWdCLHNCQWxCdU07O0FBb0J2TjtBQUNBQyxtQkFBZSxhQXJCd007O0FBdUJ2TjtBQUNBQyw4QkFBMEIsSUF4QjZMO0FBeUJ2TkMsbUJBQWUsSUF6QndNOztBQTJCdk47Ozs7OztBQU1BQywwQkFBc0IsU0FBU0Esb0JBQVQsQ0FBOEJDLEdBQTlCLEVBQW1DQyxVQUFuQyxFQUErQ0MsaUJBQS9DLEVBQWtFO0FBQ3RGO0FBQ0EsVUFBTUMsVUFBVSxLQUFLQyxPQUFMLENBQWFKLEdBQWIsRUFBa0JLLE9BQWxDO0FBQ0EsVUFBTUMsT0FBTyxLQUFLQyxHQUFMLENBQVNDLE9BQVQsQ0FBaUIsS0FBS3BCLFVBQXRCLENBQWI7QUFDQSxVQUFJcUIsVUFBVTtBQUNaUixvQkFBWUUsUUFBUU8sTUFEUixFQUNnQjtBQUM1QkMsZUFBT1IsUUFBUU8sTUFGSDtBQUdaVixhQUFLRyxRQUFRUyxJQUhEO0FBSVpDLHFCQUFhO0FBSkQsT0FBZDs7QUFPQSxVQUFJWCxpQkFBSixFQUF1QjtBQUNyQk8sa0JBQVUsZUFBS0ssS0FBTCxDQUFXTCxPQUFYLEVBQW9CUCxpQkFBcEIsQ0FBVjtBQUNEOztBQUVELFVBQUlJLElBQUosRUFBVTtBQUNSQSxhQUFLUyxJQUFMLENBQVVOLE9BQVY7QUFDRDtBQUNGLEtBbkRzTjtBQW9Edk5PLHVCQUFtQixTQUFTQSxpQkFBVCxDQUEyQkMsV0FBM0IsRUFBd0M7QUFDekQsVUFBTUMsSUFBSSxLQUFLQyxpQkFBTCxDQUF1QkYsWUFBWUcsV0FBWixFQUF2QixDQUFWO0FBQ0EsK0NBQXVDRixDQUF2QyxnREFBbUZBLENBQW5GO0FBQ0Q7QUF2RHNOLEdBQXpNLENBQWhCOztBQTBEQSxpQkFBS0csU0FBTCxDQUFlLHlDQUFmLEVBQTBEdEMsT0FBMUQ7b0JBQ2VBLE8iLCJmaWxlIjoiTGlzdC5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBDb3B5cmlnaHQgMjAxNyBJbmZvclxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBkZWNsYXJlIGZyb20gJ2Rvam8vX2Jhc2UvZGVjbGFyZSc7XHJcbmltcG9ydCBsYW5nIGZyb20gJ2Rvam8vX2Jhc2UvbGFuZyc7XHJcbmltcG9ydCBMaXN0IGZyb20gJ2FyZ29zL0xpc3QnO1xyXG5pbXBvcnQgX1JpZ2h0RHJhd2VyTGlzdE1peGluIGZyb20gJ2NybS9WaWV3cy9fUmlnaHREcmF3ZXJMaXN0TWl4aW4nO1xyXG5pbXBvcnQgX01ldHJpY0xpc3RNaXhpbiBmcm9tICdjcm0vVmlld3MvX01ldHJpY0xpc3RNaXhpbic7XHJcbmltcG9ydCBfR3JvdXBMaXN0TWl4aW4gZnJvbSAnY3JtL1ZpZXdzL19Hcm91cExpc3RNaXhpbic7XHJcbmltcG9ydCBNT0RFTF9OQU1FUyBmcm9tICcuLi8uLi9Nb2RlbHMvTmFtZXMnO1xyXG5pbXBvcnQgZ2V0UmVzb3VyY2UgZnJvbSAnYXJnb3MvSTE4bic7XHJcblxyXG5jb25zdCByZXNvdXJjZSA9IGdldFJlc291cmNlKCdlcnBDb250YWN0QXNzb2NpYXRpb25zTGlzdCcpO1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBjcm0uSW50ZWdyYXRpb25zLkJPRS5WaWV3cy5FUlBDb250YWN0QXNzb2NpYXRpb25zLkxpc3RcclxuICovXHJcbmNvbnN0IF9fY2xhc3MgPSBkZWNsYXJlKCdjcm0uSW50ZWdyYXRpb25zLkJPRS5WaWV3cy5FUlBDb250YWN0QXNzb2NpYXRpb25zLkxpc3QnLCBbTGlzdCwgX1JpZ2h0RHJhd2VyTGlzdE1peGluLCBfTWV0cmljTGlzdE1peGluLCBfR3JvdXBMaXN0TWl4aW5dLCAvKiogQGxlbmRzIGNybS5JbnRlZ3JhdGlvbnMuQk9FLlZpZXdzLkVSUENvbnRhY3RBc3NvY2lhdGlvbnMuTGlzdCMgKi97XHJcbiAgLy8gVGVtcGxhdGVzXHJcbiAgaXRlbVRlbXBsYXRlOiBuZXcgU2ltcGxhdGUoW1xyXG4gICAgJzxwIGNsYXNzPVwibGlzdHZpZXctaGVhZGluZ1wiPnslOiAkLkNvbnRhY3QuTmFtZUxGICV9PC9wPicsXHJcbiAgICAnPHAgY2xhc3M9XCJtaWNyby10ZXh0XCI+eyU6ICQuQWNjb3VudC5BY2NvdW50TmFtZSAlfTwvcD4nLFxyXG4gIF0pLFxyXG5cclxuICAvLyBMb2NhbGl6YXRpb25cclxuICB0aXRsZVRleHQ6IHJlc291cmNlLnRpdGxlVGV4dCxcclxuXHJcbiAgLy8gVmlldyBQcm9wZXJ0aWVzXHJcbiAgaWQ6ICdlcnBjb250YWN0YXNzb2NpYXRpb25zX2xpc3QnLFxyXG4gIGRldGFpbFZpZXc6ICdjb250YWN0X2RldGFpbCcsXHJcbiAgYWxsb3dTZWxlY3Rpb246IHRydWUsXHJcbiAgZW5hYmxlQWN0aW9uczogZmFsc2UsXHJcbiAgbW9kZWxOYW1lOiBNT0RFTF9OQU1FUy5FUlBDT05UQUNUQVNTT0NJQVRJT04sXHJcbiAgcmVzb3VyY2VLaW5kOiAnZXJwQ29udGFjdEFjY291bnRzJyxcclxuICBzZWN1cml0eTogJ0VudGl0aWVzL0NvbnRhY3QvVmlldycsXHJcbiAgaW5zZXJ0U2VjdXJpdHk6ICdFbnRpdGllcy9Db250YWN0L0FkZCcsXHJcblxyXG4gIC8vIENhcmQgbGF5b3V0XHJcbiAgaXRlbUljb25DbGFzczogJ3NwcmVhZHNoZWV0JyxcclxuXHJcbiAgLy8gR3JvdXBzXHJcbiAgZW5hYmxlRHluYW1pY0dyb3VwTGF5b3V0OiB0cnVlLFxyXG4gIGdyb3Vwc0VuYWJsZWQ6IHRydWUsXHJcblxyXG4gIC8qKlxyXG4gICAqIE92ZXJyaWRlIF9MaXN0QmFzZSBmdW5jdGlvbiAtIE5hdmlnYXRlcyB0byB0aGUgZGVmaW5lZCBgdGhpcy5kZXRhaWxWaWV3YCBwYXNzaW5nIHRoZSBwYXJhbXMgYXMgbmF2aWdhdGlvbiBvcHRpb25zLlxyXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBrZXkgS2V5IG9mIHRoZSBlbnRyeSB0byBiZSBzaG93biBpbiBkZXRhaWxcclxuICAgKiBAcGFyYW0ge1N0cmluZ30gZGVzY3JpcHRvciBEZXNjcmlwdGlvbiBvZiB0aGUgZW50cnksIHdpbGwgYmUgdXNlZCBhcyB0aGUgdG9wIHRvb2xiYXIgdGl0bGUgdGV4dFxyXG4gICAqIEBwYXJhbSB7T2JqZWN0fSBhZGRpdGlvbmFsT3B0aW9ucyBBZGRpdGlvbmFsIG9wdGlvbnMgdG8gYmUgcGFzc2VkIGludG8gdGhlIG5leHQgdmlld1xyXG4gICAqL1xyXG4gIG5hdmlnYXRlVG9EZXRhaWxWaWV3OiBmdW5jdGlvbiBuYXZpZ2F0ZVRvRGV0YWlsVmlldyhrZXksIGRlc2NyaXB0b3IsIGFkZGl0aW9uYWxPcHRpb25zKSB7XHJcbiAgICAvLyBJZ25vcmUgQ29udGFjdEFzc29jaWF0aW9uIGFuZCBuYXZpZ2F0ZSB0byBjb250YWN0IGRldGFpbCB2aWV3XHJcbiAgICBjb25zdCBjb250YWN0ID0gdGhpcy5lbnRyaWVzW2tleV0uQ29udGFjdDtcclxuICAgIGNvbnN0IHZpZXcgPSB0aGlzLmFwcC5nZXRWaWV3KHRoaXMuZGV0YWlsVmlldyk7XHJcbiAgICBsZXQgb3B0aW9ucyA9IHtcclxuICAgICAgZGVzY3JpcHRvcjogY29udGFjdC5OYW1lTEYsIC8vIGtlZXAgZm9yIGJhY2t3YXJkcyBjb21wYXRcclxuICAgICAgdGl0bGU6IGNvbnRhY3QuTmFtZUxGLFxyXG4gICAgICBrZXk6IGNvbnRhY3QuJGtleSxcclxuICAgICAgZnJvbUNvbnRleHQ6IHRoaXMsXHJcbiAgICB9O1xyXG5cclxuICAgIGlmIChhZGRpdGlvbmFsT3B0aW9ucykge1xyXG4gICAgICBvcHRpb25zID0gbGFuZy5taXhpbihvcHRpb25zLCBhZGRpdGlvbmFsT3B0aW9ucyk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKHZpZXcpIHtcclxuICAgICAgdmlldy5zaG93KG9wdGlvbnMpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgZm9ybWF0U2VhcmNoUXVlcnk6IGZ1bmN0aW9uIGZvcm1hdFNlYXJjaFF1ZXJ5KHNlYXJjaFF1ZXJ5KSB7XHJcbiAgICBjb25zdCBxID0gdGhpcy5lc2NhcGVTZWFyY2hRdWVyeShzZWFyY2hRdWVyeS50b1VwcGVyQ2FzZSgpKTtcclxuICAgIHJldHVybiBgdXBwZXIoQ29udGFjdC5OYW1lTEYpIGxpa2UgXCIlJHtxfSVcIiBvciB1cHBlcihBY2NvdW50LkFjY291bnROYW1lKSBsaWtlIFwiJSR7cX0lXCJgO1xyXG4gIH0sXHJcbn0pO1xyXG5cclxubGFuZy5zZXRPYmplY3QoJ2ljYm9lLlZpZXdzLkVSUENvbnRhY3RBc3NvY2lhdGlvbnMuTGlzdCcsIF9fY2xhc3MpO1xyXG5leHBvcnQgZGVmYXVsdCBfX2NsYXNzO1xyXG4iXX0=
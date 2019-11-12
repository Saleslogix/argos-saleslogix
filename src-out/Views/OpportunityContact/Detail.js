define('crm/Views/OpportunityContact/Detail', ['module', 'exports', 'dojo/_base/declare', 'dojo/string', 'argos/Detail', 'argos/I18n', 'crm/Format', '../../Models/Names'], function (module, exports, _declare, _string, _Detail, _I18n, _Format, _Names) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _string2 = _interopRequireDefault(_string);

  var _Detail2 = _interopRequireDefault(_Detail);

  var _I18n2 = _interopRequireDefault(_I18n);

  var _Format2 = _interopRequireDefault(_Format);

  var _Names2 = _interopRequireDefault(_Names);

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

  var resource = (0, _I18n2.default)('opportunityContactDetail');

  /**
   * @class crm.Views.OpportunityContact.Detail
   *
   * @extends argos.Detail
   * @mixins argos._LegacySDataDetailMixin
   */

  // import _LegacySDataDetailMixin from 'argos/_LegacySDataDetailMixin';
  var __class = (0, _declare2.default)('crm.Views.OpportunityContact.Detail', [_Detail2.default], {
    // Localization
    titleText: resource.titleText,
    accountText: resource.accountText,
    contactTitleText: resource.contactTitleText,
    nameText: resource.nameText,
    salesRoleText: resource.salesRoleText,
    strategyText: resource.strategyText,
    personalBenefitsText: resource.personalBenefitsText,
    standingText: resource.standingText,
    issuesText: resource.issuesText,
    competitorNameText: resource.competitorNameText,
    removeContactTitleText: resource.removeContactTitleText,
    confirmDeleteText: resource.confirmDeleteText,
    contactText: resource.contactText,
    entityText: resource.entityText,

    // View Properties
    id: 'opportunitycontact_detail',
    editView: 'opportunitycontact_edit',
    security: 'Entities/Contact/View',
    querySelect: [],
    resourceKind: 'opportunityContacts',
    modelName: _Names2.default.OPPORTUNITYCONTACT,

    removeContact: function removeContact() {
      var confirmMessage = _string2.default.substitute(this.confirmDeleteText, [this.entry.Contact.NameLF]);
      if (!confirm(confirmMessage)) {
        // eslint-disable-line
        return;
      }
      this.removeEntry();
    },
    formatPicklist: function formatPicklist(property) {
      return _Format2.default.picklist(this.app.picklistService, this._model, property);
    },
    createToolLayout: function createToolLayout() {
      return this.tools || (this.tools = {
        tbar: [{
          id: 'edit',
          title: this.editText,
          action: 'navigateToEditView',
          svg: 'edit',
          security: App.getViewSecurity(this.editView, 'update')
        }, {
          id: 'removeContact',
          svg: 'close',
          action: 'removeContact',
          title: this.removeContactTitleText
        }]
      });
    },
    createLayout: function createLayout() {
      return this.layout || (this.layout = [{
        title: this.contactText,
        name: 'DetailsSection',
        children: [{
          name: 'NameLF',
          property: 'Contact.NameLF',
          label: this.nameText,
          view: 'contact_detail',
          key: 'Contact.$key',
          descriptor: 'Contact.NameLF'
        }, {
          name: 'AccountName',
          property: 'Contact.AccountName',
          descriptor: 'AccountName',
          label: this.accountText,
          view: 'account_detail',
          key: 'Contact.Account.$key'
        }, {
          name: 'Title',
          property: 'Contact.Title',
          label: this.contactTitleText
        }, {
          name: 'SalesRole',
          property: 'SalesRole',
          label: this.salesRoleText,
          renderer: this.formatPicklist('SalesRole')
        }, {
          name: 'Standing',
          property: 'Standing',
          label: this.standingText,
          renderer: this.formatPicklist('Standing')
        }, {
          name: 'PersonalBenefits',
          property: 'PersonalBenefits',
          label: this.personalBenefitsText
        }, {
          name: 'CompetitorName',
          property: 'Competitors.CompetitorName',
          label: this.competitorNameText
        }, {
          name: 'Strategy',
          property: 'Strategy',
          label: this.strategyText
        }, {
          name: 'Issues',
          property: 'Issues',
          label: this.issuesText
        }]
      }]);
    }
  });

  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9WaWV3cy9PcHBvcnR1bml0eUNvbnRhY3QvRGV0YWlsLmpzIl0sIm5hbWVzIjpbInJlc291cmNlIiwiX19jbGFzcyIsInRpdGxlVGV4dCIsImFjY291bnRUZXh0IiwiY29udGFjdFRpdGxlVGV4dCIsIm5hbWVUZXh0Iiwic2FsZXNSb2xlVGV4dCIsInN0cmF0ZWd5VGV4dCIsInBlcnNvbmFsQmVuZWZpdHNUZXh0Iiwic3RhbmRpbmdUZXh0IiwiaXNzdWVzVGV4dCIsImNvbXBldGl0b3JOYW1lVGV4dCIsInJlbW92ZUNvbnRhY3RUaXRsZVRleHQiLCJjb25maXJtRGVsZXRlVGV4dCIsImNvbnRhY3RUZXh0IiwiZW50aXR5VGV4dCIsImlkIiwiZWRpdFZpZXciLCJzZWN1cml0eSIsInF1ZXJ5U2VsZWN0IiwicmVzb3VyY2VLaW5kIiwibW9kZWxOYW1lIiwiT1BQT1JUVU5JVFlDT05UQUNUIiwicmVtb3ZlQ29udGFjdCIsImNvbmZpcm1NZXNzYWdlIiwic3Vic3RpdHV0ZSIsImVudHJ5IiwiQ29udGFjdCIsIk5hbWVMRiIsImNvbmZpcm0iLCJyZW1vdmVFbnRyeSIsImZvcm1hdFBpY2tsaXN0IiwicHJvcGVydHkiLCJwaWNrbGlzdCIsImFwcCIsInBpY2tsaXN0U2VydmljZSIsIl9tb2RlbCIsImNyZWF0ZVRvb2xMYXlvdXQiLCJ0b29scyIsInRiYXIiLCJ0aXRsZSIsImVkaXRUZXh0IiwiYWN0aW9uIiwic3ZnIiwiQXBwIiwiZ2V0Vmlld1NlY3VyaXR5IiwiY3JlYXRlTGF5b3V0IiwibGF5b3V0IiwibmFtZSIsImNoaWxkcmVuIiwibGFiZWwiLCJ2aWV3Iiwia2V5IiwiZGVzY3JpcHRvciIsInJlbmRlcmVyIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7QUF1QkEsTUFBTUEsV0FBVyxvQkFBWSwwQkFBWixDQUFqQjs7QUFFQTs7Ozs7OztBQVBBO0FBYUEsTUFBTUMsVUFBVSx1QkFB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LGNBQUwsQ0FBb0IsV0FBcEI7QUFKVCxTQWxCTyxFQXVCUDtBQUNEaUIsZ0JBQU0sVUFETDtBQUVEaEIsb0JBQVUsVUFGVDtBQUdEa0IsaUJBQU8sS0FBS3pDLFlBSFg7QUFJRDZDLG9CQUFVLEtBQUt2QixjQUFMLENBQW9CLFVBQXBCO0FBSlQsU0F2Qk8sRUE0QlA7QUFDRGlCLGdCQUFNLGtCQURMO0FBRURoQixvQkFBVSxrQkFGVDtBQUdEa0IsaUJBQU8sS0FBSzFDO0FBSFgsU0E1Qk8sRUFnQ1A7QUFDRHdDLGdCQUFNLGdCQURMO0FBRURoQixvQkFBVSw0QkFGVDtBQUdEa0IsaUJBQU8sS0FBS3ZDO0FBSFgsU0FoQ08sRUFvQ1A7QUFDRHFDLGdCQUFNLFVBREw7QUFFRGhCLG9CQUFVLFVBRlQ7QUFHRGtCLGlCQUFPLEtBQUszQztBQUhYLFNBcENPLEVBd0NQO0FBQ0R5QyxnQkFBTSxRQURMO0FBRURoQixvQkFBVSxRQUZUO0FBR0RrQixpQkFBTyxLQUFLeEM7QUFIWCxTQXhDTztBQUgwQixPQUFELENBQTlCLENBQVA7QUFpREQ7QUFyR3FHLEdBQXhGLENBQWhCOztvQkF3R2VULE8iLCJmaWxlIjoiRGV0YWlsLmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAyMDE3IEluZm9yXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuaW1wb3J0IGRlY2xhcmUgZnJvbSAnZG9qby9fYmFzZS9kZWNsYXJlJztcclxuaW1wb3J0IHN0cmluZyBmcm9tICdkb2pvL3N0cmluZyc7XHJcbmltcG9ydCBEZXRhaWwgZnJvbSAnYXJnb3MvRGV0YWlsJztcclxuLy8gaW1wb3J0IF9MZWdhY3lTRGF0YURldGFpbE1peGluIGZyb20gJ2FyZ29zL19MZWdhY3lTRGF0YURldGFpbE1peGluJztcclxuaW1wb3J0IGdldFJlc291cmNlIGZyb20gJ2FyZ29zL0kxOG4nO1xyXG5pbXBvcnQgZm9ybWF0IGZyb20gJ2NybS9Gb3JtYXQnO1xyXG5pbXBvcnQgTU9ERUxfTkFNRVMgZnJvbSAnLi4vLi4vTW9kZWxzL05hbWVzJztcclxuXHJcbmNvbnN0IHJlc291cmNlID0gZ2V0UmVzb3VyY2UoJ29wcG9ydHVuaXR5Q29udGFjdERldGFpbCcpO1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBjcm0uVmlld3MuT3Bwb3J0dW5pdHlDb250YWN0LkRldGFpbFxyXG4gKlxyXG4gKiBAZXh0ZW5kcyBhcmdvcy5EZXRhaWxcclxuICogQG1peGlucyBhcmdvcy5fTGVnYWN5U0RhdGFEZXRhaWxNaXhpblxyXG4gKi9cclxuY29uc3QgX19jbGFzcyA9IGRlY2xhcmUoJ2NybS5WaWV3cy5PcHBvcnR1bml0eUNvbnRhY3QuRGV0YWlsJywgW0RldGFpbC8qICwgX0xlZ2FjeVNEYXRhRGV0YWlsTWl4aW4gKi9dLCB7XHJcbiAgLy8gTG9jYWxpemF0aW9uXHJcbiAgdGl0bGVUZXh0OiByZXNvdXJjZS50aXRsZVRleHQsXHJcbiAgYWNjb3VudFRleHQ6IHJlc291cmNlLmFjY291bnRUZXh0LFxyXG4gIGNvbnRhY3RUaXRsZVRleHQ6IHJlc291cmNlLmNvbnRhY3RUaXRsZVRleHQsXHJcbiAgbmFtZVRleHQ6IHJlc291cmNlLm5hbWVUZXh0LFxyXG4gIHNhbGVzUm9sZVRleHQ6IHJlc291cmNlLnNhbGVzUm9sZVRleHQsXHJcbiAgc3RyYXRlZ3lUZXh0OiByZXNvdXJjZS5zdHJhdGVneVRleHQsXHJcbiAgcGVyc29uYWxCZW5lZml0c1RleHQ6IHJlc291cmNlLnBlcnNvbmFsQmVuZWZpdHNUZXh0LFxyXG4gIHN0YW5kaW5nVGV4dDogcmVzb3VyY2Uuc3RhbmRpbmdUZXh0LFxyXG4gIGlzc3Vlc1RleHQ6IHJlc291cmNlLmlzc3Vlc1RleHQsXHJcbiAgY29tcGV0aXRvck5hbWVUZXh0OiByZXNvdXJjZS5jb21wZXRpdG9yTmFtZVRleHQsXHJcbiAgcmVtb3ZlQ29udGFjdFRpdGxlVGV4dDogcmVzb3VyY2UucmVtb3ZlQ29udGFjdFRpdGxlVGV4dCxcclxuICBjb25maXJtRGVsZXRlVGV4dDogcmVzb3VyY2UuY29uZmlybURlbGV0ZVRleHQsXHJcbiAgY29udGFjdFRleHQ6IHJlc291cmNlLmNvbnRhY3RUZXh0LFxyXG4gIGVudGl0eVRleHQ6IHJlc291cmNlLmVudGl0eVRleHQsXHJcblxyXG4gIC8vIFZpZXcgUHJvcGVydGllc1xyXG4gIGlkOiAnb3Bwb3J0dW5pdHljb250YWN0X2RldGFpbCcsXHJcbiAgZWRpdFZpZXc6ICdvcHBvcnR1bml0eWNvbnRhY3RfZWRpdCcsXHJcbiAgc2VjdXJpdHk6ICdFbnRpdGllcy9Db250YWN0L1ZpZXcnLFxyXG4gIHF1ZXJ5U2VsZWN0OiBbXSxcclxuICByZXNvdXJjZUtpbmQ6ICdvcHBvcnR1bml0eUNvbnRhY3RzJyxcclxuICBtb2RlbE5hbWU6IE1PREVMX05BTUVTLk9QUE9SVFVOSVRZQ09OVEFDVCxcclxuXHJcbiAgcmVtb3ZlQ29udGFjdDogZnVuY3Rpb24gcmVtb3ZlQ29udGFjdCgpIHtcclxuICAgIGNvbnN0IGNvbmZpcm1NZXNzYWdlID0gc3RyaW5nLnN1YnN0aXR1dGUodGhpcy5jb25maXJtRGVsZXRlVGV4dCwgW3RoaXMuZW50cnkuQ29udGFjdC5OYW1lTEZdKTtcclxuICAgIGlmICghY29uZmlybShjb25maXJtTWVzc2FnZSkpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcbiAgICB0aGlzLnJlbW92ZUVudHJ5KCk7XHJcbiAgfSxcclxuICBmb3JtYXRQaWNrbGlzdDogZnVuY3Rpb24gZm9ybWF0UGlja2xpc3QocHJvcGVydHkpIHtcclxuICAgIHJldHVybiBmb3JtYXQucGlja2xpc3QodGhpcy5hcHAucGlja2xpc3RTZXJ2aWNlLCB0aGlzLl9tb2RlbCwgcHJvcGVydHkpO1xyXG4gIH0sXHJcbiAgY3JlYXRlVG9vbExheW91dDogZnVuY3Rpb24gY3JlYXRlVG9vbExheW91dCgpIHtcclxuICAgIHJldHVybiB0aGlzLnRvb2xzIHx8ICh0aGlzLnRvb2xzID0ge1xyXG4gICAgICB0YmFyOiBbe1xyXG4gICAgICAgIGlkOiAnZWRpdCcsXHJcbiAgICAgICAgdGl0bGU6IHRoaXMuZWRpdFRleHQsXHJcbiAgICAgICAgYWN0aW9uOiAnbmF2aWdhdGVUb0VkaXRWaWV3JyxcclxuICAgICAgICBzdmc6ICdlZGl0JyxcclxuICAgICAgICBzZWN1cml0eTogQXBwLmdldFZpZXdTZWN1cml0eSh0aGlzLmVkaXRWaWV3LCAndXBkYXRlJyksXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBpZDogJ3JlbW92ZUNvbnRhY3QnLFxyXG4gICAgICAgIHN2ZzogJ2Nsb3NlJyxcclxuICAgICAgICBhY3Rpb246ICdyZW1vdmVDb250YWN0JyxcclxuICAgICAgICB0aXRsZTogdGhpcy5yZW1vdmVDb250YWN0VGl0bGVUZXh0LFxyXG4gICAgICB9XSxcclxuICAgIH0pO1xyXG4gIH0sXHJcbiAgY3JlYXRlTGF5b3V0OiBmdW5jdGlvbiBjcmVhdGVMYXlvdXQoKSB7XHJcbiAgICByZXR1cm4gdGhpcy5sYXlvdXQgfHwgKHRoaXMubGF5b3V0ID0gW3tcclxuICAgICAgdGl0bGU6IHRoaXMuY29udGFjdFRleHQsXHJcbiAgICAgIG5hbWU6ICdEZXRhaWxzU2VjdGlvbicsXHJcbiAgICAgIGNoaWxkcmVuOiBbe1xyXG4gICAgICAgIG5hbWU6ICdOYW1lTEYnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnQ29udGFjdC5OYW1lTEYnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLm5hbWVUZXh0LFxyXG4gICAgICAgIHZpZXc6ICdjb250YWN0X2RldGFpbCcsXHJcbiAgICAgICAga2V5OiAnQ29udGFjdC4ka2V5JyxcclxuICAgICAgICBkZXNjcmlwdG9yOiAnQ29udGFjdC5OYW1lTEYnLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ0FjY291bnROYW1lJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0NvbnRhY3QuQWNjb3VudE5hbWUnLFxyXG4gICAgICAgIGRlc2NyaXB0b3I6ICdBY2NvdW50TmFtZScsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMuYWNjb3VudFRleHQsXHJcbiAgICAgICAgdmlldzogJ2FjY291bnRfZGV0YWlsJyxcclxuICAgICAgICBrZXk6ICdDb250YWN0LkFjY291bnQuJGtleScsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnVGl0bGUnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnQ29udGFjdC5UaXRsZScsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMuY29udGFjdFRpdGxlVGV4dCxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdTYWxlc1JvbGUnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnU2FsZXNSb2xlJyxcclxuICAgICAgICBsYWJlbDogdGhpcy5zYWxlc1JvbGVUZXh0LFxyXG4gICAgICAgIHJlbmRlcmVyOiB0aGlzLmZvcm1hdFBpY2tsaXN0KCdTYWxlc1JvbGUnKSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdTdGFuZGluZycsXHJcbiAgICAgICAgcHJvcGVydHk6ICdTdGFuZGluZycsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMuc3RhbmRpbmdUZXh0LFxyXG4gICAgICAgIHJlbmRlcmVyOiB0aGlzLmZvcm1hdFBpY2tsaXN0KCdTdGFuZGluZycpLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ1BlcnNvbmFsQmVuZWZpdHMnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnUGVyc29uYWxCZW5lZml0cycsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMucGVyc29uYWxCZW5lZml0c1RleHQsXHJcbiAgICAgIH0sIHtcclxuICAgICAgICBuYW1lOiAnQ29tcGV0aXRvck5hbWUnLFxyXG4gICAgICAgIHByb3BlcnR5OiAnQ29tcGV0aXRvcnMuQ29tcGV0aXRvck5hbWUnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLmNvbXBldGl0b3JOYW1lVGV4dCxcclxuICAgICAgfSwge1xyXG4gICAgICAgIG5hbWU6ICdTdHJhdGVneScsXHJcbiAgICAgICAgcHJvcGVydHk6ICdTdHJhdGVneScsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMuc3RyYXRlZ3lUZXh0LFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbmFtZTogJ0lzc3VlcycsXHJcbiAgICAgICAgcHJvcGVydHk6ICdJc3N1ZXMnLFxyXG4gICAgICAgIGxhYmVsOiB0aGlzLmlzc3Vlc1RleHQsXHJcbiAgICAgIH1dLFxyXG4gICAgfV0pO1xyXG4gIH0sXHJcbn0pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgX19jbGFzcztcclxuIl19
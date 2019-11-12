define('crm/Views/OpportunityContact/Edit', ['module', 'exports', 'dojo/_base/declare', '../../Format', 'argos/Edit', 'argos/I18n'], function (module, exports, _declare, _Format, _Edit, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _Format2 = _interopRequireDefault(_Format);

  var _Edit2 = _interopRequireDefault(_Edit);

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

  var resource = (0, _I18n2.default)('opportunityContactEdit');

  /**
   * @class crm.Views.OpportunityContact.Edit
   *
   * @extends argos.Edit
   *
   * @requires argos.Utility
   */
  var __class = (0, _declare2.default)('crm.Views.OpportunityContact.Edit', [_Edit2.default], {
    // Localization
    titleText: resource.titleText,
    nameText: resource.nameText,
    accountNameText: resource.accountNameText,
    contactTitleText: resource.contactTitleText,
    salesRoleText: resource.salesRoleText,
    salesRoleTitleText: resource.salesRoleTitleText,
    personalBenefitsText: resource.personalBenefitsText,
    strategyText: resource.strategyText,
    issuesText: resource.issuesText,
    standingText: resource.standingText,
    standingTitleText: resource.standingTitleText,
    contactText: resource.contactText,
    competitorPrefText: resource.competitorPrefText,

    // View Properties
    entityName: 'OpportunityContact',
    id: 'opportunitycontact_edit',
    insertSecurity: 'Entities/Contact/Add',
    updateSecurity: 'Entities/Contact/Edit',
    querySelect: ['Contact/Account/AccountName', 'Contact/NameLF', 'Contact/Title'],
    queryInclude: ['$permissions'],
    resourceKind: 'opportunityContacts',

    createLayout: function createLayout() {
      return this.layout || (this.layout = [{
        title: this.contactText,
        name: 'ContactSection',
        children: [{
          formatValue: _Format2.default.nameLF,
          label: this.nameText,
          name: 'ContactName',
          type: 'text',
          property: 'Contact.NameLF',
          readonly: true,
          exclude: true
        }, {
          label: this.accountNameText,
          name: 'ContactAccountName',
          property: 'Contact.AccountName',
          type: 'text',
          readonly: true,
          exclude: true
        }, {
          label: this.contactTitleText,
          name: 'ContactTitle',
          property: 'Contact.Title',
          type: 'text',
          readonly: true,
          exclude: true
        }]
      }, {
        label: this.salesRoleText,
        name: 'SalesRole',
        property: 'SalesRole',
        type: 'picklist',
        title: this.salesRoleTitleText,
        picklist: 'Role'
      }, {
        label: this.standingText,
        name: 'Standing',
        property: 'Standing',
        type: 'picklist',
        title: this.standingTitleText,
        picklist: 'Standing'
      }, {
        label: this.personalBenefitsText,
        name: 'PersonalBenefits',
        property: 'PersonalBenefits',
        type: 'text'
      }, {
        label: this.competitorPrefText,
        name: 'Competitors',
        property: 'Competitors',
        textProperty: 'CompetitorName',
        view: 'competitor_related',
        type: 'lookup'
      }, {
        label: this.strategyText,
        name: 'Strategy',
        property: 'Strategy',
        type: 'textarea'
      }, {
        label: this.issuesText,
        name: 'Issues',
        property: 'Issues',
        type: 'textarea'
      }, {
        name: 'OpportunityKey',
        property: 'Opportunity.$key',
        type: 'hidden',
        include: true
      }, {
        name: 'ContactKey',
        property: 'Contact.$key',
        type: 'hidden',
        include: true
      }]);
    }
  });

  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9WaWV3cy9PcHBvcnR1bml0eUNvbnRhY3QvRWRpdC5qcyJdLCJuYW1lcyI6WyJyZXNvdXJjZSIsIl9fY2xhc3MiLCJ0aXRsZVRleHQiLCJuYW1lVGV4dCIsImFjY291bnROYW1lVGV4dCIsImNvbnRhY3RUaXRsZVRleHQiLCJzYWxlc1JvbGVUZXh0Iiwic2FsZXNSb2xlVGl0bGVUZXh0IiwicGVyc29uYWxCZW5lZml0c1RleHQiLCJzdHJhdGVneVRleHQiLCJpc3N1ZXNUZXh0Iiwic3RhbmRpbmdUZXh0Iiwic3RhbmRpbmdUaXRsZVRleHQiLCJjb250YWN0VGV4dCIsImNvbXBldGl0b3JQcmVmVGV4dCIsImVudGl0eU5hbWUiLCJpZCIsImluc2VydFNlY3VyaXR5IiwidXBkYXRlU2VjdXJpdHkiLCJxdWVyeVNlbGVjdCIsInF1ZXJ5SW5jbHVkZSIsInJlc291cmNlS2luZCIsImNyZWF0ZUxheW91dCIsImxheW91dCIsInRpdGxlIiwibmFtZSIsImNoaWxkcmVuIiwiZm9ybWF0VmFsdWUiLCJuYW1lTEYiLCJsYWJlbCIsInR5cGUiLCJwcm9wZXJ0eSIsInJlYWRvbmx5IiwiZXhjbHVkZSIsInBpY2tsaXN0IiwidGV4dFByb3BlcnR5IiwidmlldyIsImluY2x1ZGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7Ozs7O0FBb0JBLE1BQU1BLFdBQVcsb0JBQVksd0JBQVosQ0FBakI7O0FBRUE7Ozs7Ozs7QUFPQSxNQUFNQyxVQUFVLHVCQUFRLG1DQUFSLEVBQTZDLGdCQUE3QyxFQUFxRDtBQUNuRTtBQUNBQyxlQUFXRixTQUFTRSxTQUYrQztBQUduRUMsY0FBVUgsU0FBU0csUUFIZ0Q7QUFJbkVDLHFCQUFpQkosU0FBU0ksZUFKeUM7QUFLbkVDLHNCQUFrQkwsU0FBU0ssZ0JBTHdDO0FBTW5FQyxtQkFBZU4sU0FBU00sYUFOMkM7QUFPbkVDLHdCQUFvQlAsU0FBU08sa0JBUHNDO0FBUW5FQywwQkFB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LCJzb3VyY2VzQ29udGVudCI6WyIvKiBDb3B5cmlnaHQgMjAxNyBJbmZvclxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBkZWNsYXJlIGZyb20gJ2Rvam8vX2Jhc2UvZGVjbGFyZSc7XHJcbmltcG9ydCBmb3JtYXQgZnJvbSAnLi4vLi4vRm9ybWF0JztcclxuaW1wb3J0IEVkaXQgZnJvbSAnYXJnb3MvRWRpdCc7XHJcbmltcG9ydCBnZXRSZXNvdXJjZSBmcm9tICdhcmdvcy9JMThuJztcclxuXHJcbmNvbnN0IHJlc291cmNlID0gZ2V0UmVzb3VyY2UoJ29wcG9ydHVuaXR5Q29udGFjdEVkaXQnKTtcclxuXHJcbi8qKlxyXG4gKiBAY2xhc3MgY3JtLlZpZXdzLk9wcG9ydHVuaXR5Q29udGFjdC5FZGl0XHJcbiAqXHJcbiAqIEBleHRlbmRzIGFyZ29zLkVkaXRcclxuICpcclxuICogQHJlcXVpcmVzIGFyZ29zLlV0aWxpdHlcclxuICovXHJcbmNvbnN0IF9fY2xhc3MgPSBkZWNsYXJlKCdjcm0uVmlld3MuT3Bwb3J0dW5pdHlDb250YWN0LkVkaXQnLCBbRWRpdF0sIHtcclxuICAvLyBMb2NhbGl6YXRpb25cclxuICB0aXRsZVRleHQ6IHJlc291cmNlLnRpdGxlVGV4dCxcclxuICBuYW1lVGV4dDogcmVzb3VyY2UubmFtZVRleHQsXHJcbiAgYWNjb3VudE5hbWVUZXh0OiByZXNvdXJjZS5hY2NvdW50TmFtZVRleHQsXHJcbiAgY29udGFjdFRpdGxlVGV4dDogcmVzb3VyY2UuY29udGFjdFRpdGxlVGV4dCxcclxuICBzYWxlc1JvbGVUZXh0OiByZXNvdXJjZS5zYWxlc1JvbGVUZXh0LFxyXG4gIHNhbGVzUm9sZVRpdGxlVGV4dDogcmVzb3VyY2Uuc2FsZXNSb2xlVGl0bGVUZXh0LFxyXG4gIHBlcnNvbmFsQmVuZWZpdHNUZXh0OiByZXNvdXJjZS5wZXJzb25hbEJlbmVmaXRzVGV4dCxcclxuICBzdHJhdGVneVRleHQ6IHJlc291cmNlLnN0cmF0ZWd5VGV4dCxcclxuICBpc3N1ZXNUZXh0OiByZXNvdXJjZS5pc3N1ZXNUZXh0LFxyXG4gIHN0YW5kaW5nVGV4dDogcmVzb3VyY2Uuc3RhbmRpbmdUZXh0LFxyXG4gIHN0YW5kaW5nVGl0bGVUZXh0OiByZXNvdXJjZS5zdGFuZGluZ1RpdGxlVGV4dCxcclxuICBjb250YWN0VGV4dDogcmVzb3VyY2UuY29udGFjdFRleHQsXHJcbiAgY29tcGV0aXRvclByZWZUZXh0OiByZXNvdXJjZS5jb21wZXRpdG9yUHJlZlRleHQsXHJcblxyXG4gIC8vIFZpZXcgUHJvcGVydGllc1xyXG4gIGVudGl0eU5hbWU6ICdPcHBvcnR1bml0eUNvbnRhY3QnLFxyXG4gIGlkOiAnb3Bwb3J0dW5pdHljb250YWN0X2VkaXQnLFxyXG4gIGluc2VydFNlY3VyaXR5OiAnRW50aXRpZXMvQ29udGFjdC9BZGQnLFxyXG4gIHVwZGF0ZVNlY3VyaXR5OiAnRW50aXRpZXMvQ29udGFjdC9FZGl0JyxcclxuICBxdWVyeVNlbGVjdDogW1xyXG4gICAgJ0NvbnRhY3QvQWNjb3VudC9BY2NvdW50TmFtZScsXHJcbiAgICAnQ29udGFjdC9OYW1lTEYnLFxyXG4gICAgJ0NvbnRhY3QvVGl0bGUnLFxyXG4gIF0sXHJcbiAgcXVlcnlJbmNsdWRlOiBbXHJcbiAgICAnJHBlcm1pc3Npb25zJyxcclxuICBdLFxyXG4gIHJlc291cmNlS2luZDogJ29wcG9ydHVuaXR5Q29udGFjdHMnLFxyXG5cclxuICBjcmVhdGVMYXlvdXQ6IGZ1bmN0aW9uIGNyZWF0ZUxheW91dCgpIHtcclxuICAgIHJldHVybiB0aGlzLmxheW91dCB8fCAodGhpcy5sYXlvdXQgPSBbe1xyXG4gICAgICB0aXRsZTogdGhpcy5jb250YWN0VGV4dCxcclxuICAgICAgbmFtZTogJ0NvbnRhY3RTZWN0aW9uJyxcclxuICAgICAgY2hpbGRyZW46IFt7XHJcbiAgICAgICAgZm9ybWF0VmFsdWU6IGZvcm1hdC5uYW1lTEYsXHJcbiAgICAgICAgbGFiZWw6IHRoaXMubmFtZVRleHQsXHJcbiAgICAgICAgbmFtZTogJ0NvbnRhY3ROYW1lJyxcclxuICAgICAgICB0eXBlOiAndGV4dCcsXHJcbiAgICAgICAgcHJvcGVydHk6ICdDb250YWN0Lk5hbWVMRicsXHJcbiAgICAgICAgcmVhZG9ubHk6IHRydWUsXHJcbiAgICAgICAgZXhjbHVkZTogdHJ1ZSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIGxhYmVsOiB0aGlzLmFjY291bnROYW1lVGV4dCxcclxuICAgICAgICBuYW1lOiAnQ29udGFjdEFjY291bnROYW1lJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0NvbnRhY3QuQWNjb3VudE5hbWUnLFxyXG4gICAgICAgIHR5cGU6ICd0ZXh0JyxcclxuICAgICAgICByZWFkb25seTogdHJ1ZSxcclxuICAgICAgICBleGNsdWRlOiB0cnVlLFxyXG4gICAgICB9LCB7XHJcbiAgICAgICAgbGFiZWw6IHRoaXMuY29udGFjdFRpdGxlVGV4dCxcclxuICAgICAgICBuYW1lOiAnQ29udGFjdFRpdGxlJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0NvbnRhY3QuVGl0bGUnLFxyXG4gICAgICAgIHR5cGU6ICd0ZXh0JyxcclxuICAgICAgICByZWFkb25seTogdHJ1ZSxcclxuICAgICAgICBleGNsdWRlOiB0cnVlLFxyXG4gICAgICB9XSxcclxuICAgIH0sIHtcclxuICAgICAgbGFiZWw6IHRoaXMuc2FsZXNSb2xlVGV4dCxcclxuICAgICAgbmFtZTogJ1NhbGVzUm9sZScsXHJcbiAgICAgIHByb3BlcnR5OiAnU2FsZXNSb2xlJyxcclxuICAgICAgdHlwZTogJ3BpY2tsaXN0JyxcclxuICAgICAgdGl0bGU6IHRoaXMuc2FsZXNSb2xlVGl0bGVUZXh0LFxyXG4gICAgICBwaWNrbGlzdDogJ1JvbGUnLFxyXG4gICAgfSwge1xyXG4gICAgICBsYWJlbDogdGhpcy5zdGFuZGluZ1RleHQsXHJcbiAgICAgIG5hbWU6ICdTdGFuZGluZycsXHJcbiAgICAgIHByb3BlcnR5OiAnU3RhbmRpbmcnLFxyXG4gICAgICB0eXBlOiAncGlja2xpc3QnLFxyXG4gICAgICB0aXRsZTogdGhpcy5zdGFuZGluZ1RpdGxlVGV4dCxcclxuICAgICAgcGlja2xpc3Q6ICdTdGFuZGluZycsXHJcbiAgICB9LCB7XHJcbiAgICAgIGxhYmVsOiB0aGlzLnBlcnNvbmFsQmVuZWZpdHNUZXh0LFxyXG4gICAgICBuYW1lOiAnUGVyc29uYWxCZW5lZml0cycsXHJcbiAgICAgIHByb3BlcnR5OiAnUGVyc29uYWxCZW5lZml0cycsXHJcbiAgICAgIHR5cGU6ICd0ZXh0JyxcclxuICAgIH0sIHtcclxuICAgICAgbGFiZWw6IHRoaXMuY29tcGV0aXRvclByZWZUZXh0LFxyXG4gICAgICBuYW1lOiAnQ29tcGV0aXRvcnMnLFxyXG4gICAgICBwcm9wZXJ0eTogJ0NvbXBldGl0b3JzJyxcclxuICAgICAgdGV4dFByb3BlcnR5OiAnQ29tcGV0aXRvck5hbWUnLFxyXG4gICAgICB2aWV3OiAnY29tcGV0aXRvcl9yZWxhdGVkJyxcclxuICAgICAgdHlwZTogJ2xvb2t1cCcsXHJcbiAgICB9LCB7XHJcbiAgICAgIGxhYmVsOiB0aGlzLnN0cmF0ZWd5VGV4dCxcclxuICAgICAgbmFtZTogJ1N0cmF0ZWd5JyxcclxuICAgICAgcHJvcGVydHk6ICdTdHJhdGVneScsXHJcbiAgICAgIHR5cGU6ICd0ZXh0YXJlYScsXHJcbiAgICB9LCB7XHJcbiAgICAgIGxhYmVsOiB0aGlzLmlzc3Vlc1RleHQsXHJcbiAgICAgIG5hbWU6ICdJc3N1ZXMnLFxyXG4gICAgICBwcm9wZXJ0eTogJ0lzc3VlcycsXHJcbiAgICAgIHR5cGU6ICd0ZXh0YXJlYScsXHJcbiAgICB9LCB7XHJcbiAgICAgIG5hbWU6ICdPcHBvcnR1bml0eUtleScsXHJcbiAgICAgIHByb3BlcnR5OiAnT3Bwb3J0dW5pdHkuJGtleScsXHJcbiAgICAgIHR5cGU6ICdoaWRkZW4nLFxyXG4gICAgICBpbmNsdWRlOiB0cnVlLFxyXG4gICAgfSwge1xyXG4gICAgICBuYW1lOiAnQ29udGFjdEtleScsXHJcbiAgICAgIHByb3BlcnR5OiAnQ29udGFjdC4ka2V5JyxcclxuICAgICAgdHlwZTogJ2hpZGRlbicsXHJcbiAgICAgIGluY2x1ZGU6IHRydWUsXHJcbiAgICB9XSk7XHJcbiAgfSxcclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBfX2NsYXNzO1xyXG4iXX0=
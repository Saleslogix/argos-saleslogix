define('crm/Views/Lead/List', ['module', 'exports', 'dojo/_base/declare', '../../Action', '../../Format', 'argos/Utility', 'argos/List', '../_GroupListMixin', '../_MetricListMixin', '../_RightDrawerListMixin', 'argos/I18n', '../../Models/Names'], function (module, exports, _declare, _Action, _Format, _Utility, _List, _GroupListMixin2, _MetricListMixin2, _RightDrawerListMixin2, _I18n, _Names) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _Action2 = _interopRequireDefault(_Action);

  var _Format2 = _interopRequireDefault(_Format);

  var _Utility2 = _interopRequireDefault(_Utility);

  var _List2 = _interopRequireDefault(_List);

  var _GroupListMixin3 = _interopRequireDefault(_GroupListMixin2);

  var _MetricListMixin3 = _interopRequireDefault(_MetricListMixin2);

  var _RightDrawerListMixin3 = _interopRequireDefault(_RightDrawerListMixin2);

  var _I18n2 = _interopRequireDefault(_I18n);

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

  var resource = (0, _I18n2.default)('leadList');

  /**
   * @class crm.Views.Lead.List
   *
   * @extends argos.List
   * @mixins crm.Views._RightDrawerListMixin
   * @mixins crm.Views._MetricListMixin
   * @mixins crm.Views._GroupListMixin
   *
   * @requires argos.Format
   * @requires argos.Utility
   *
   * @requires crm.Action
   */
  var __class = (0, _declare2.default)('crm.Views.Lead.List', [_List2.default, _RightDrawerListMixin3.default, _MetricListMixin3.default, _GroupListMixin3.default], {
    // Templates
    itemTemplate: new Simplate(['<p class="micro-text">', '{%: $$.joinFields(" | ", [$$.formatPicklist("Title")($.Title), $.Company]) %}', '</p>', '{% if ($.WorkPhone) { %}', '<p class="micro-text">', '{%: $$.phoneAbbreviationText %} <span class="hyperlink" data-action="callWork" data-key="{%: $.$key %}">{%: argos.Format.phone($.WorkPhone) %}</span>', // TODO: Avoid global
    '</p>', '{% } %}', '{% if ($.Mobile) { %}', '<p class="micro-text">', '{%: $$.mobileAbbreviationText %} <span class="hyperlink" data-action="callMobile" data-key="{%: $.$key %}">{%: argos.Format.phone($.Mobile) %}</span>', // TODO: Avoid global
    '</p>', '{% } %}', '{% if ($.TollFree) { %}', '<p class="micro-text">', '{%: $$.tollFreeAbbreviationText %} {%: argos.Format.phone($.TollFree) %}', // TODO: Avoid global
    '</p>', '{% } %}', '<p class="micro-text">{%: $.WebAddress %}</p>', '{% if ($.Email) { %}', '<p class="micro-text">', '<span class="hyperlink" data-action="sendEmail" data-key="{%: $.$key %}">{%: $.Email %}</span>', '</p>', '{% } %}']),

    joinFields: function joinFields(sep, fields) {
      return _Utility2.default.joinFields(sep, fields);
    },
    callWork: function callWork(params) {
      this.invokeActionItemBy(function (theAction) {
        return theAction.id === 'callWork';
      }, params.key);
    },
    callMobile: function callMobile(params) {
      this.invokeActionItemBy(function (theAction) {
        return theAction.id === 'callMobile';
      }, params.key);
    },
    sendEmail: function sendEmail(params) {
      this.invokeActionItemBy(function (theAction) {
        return theAction.id === 'sendEmail';
      }, params.key);
    },
    formatPicklist: function formatPicklist(property) {
      return _Format2.default.picklist(this.app.picklistService, this._model, property);
    },

    // Localization
    titleText: resource.titleText,
    activitiesText: resource.activitiesText,
    notesText: resource.notesText,
    scheduleText: resource.scheduleText,
    emailedText: resource.emailedText,
    calledText: resource.calledText,
    editActionText: resource.editActionText,
    callMobileActionText: resource.callMobileActionText,
    callWorkActionText: resource.callWorkActionText,
    sendEmailActionText: resource.sendEmailActionText,
    addNoteActionText: resource.addNoteActionText,
    addActivityActionText: resource.addActivityActionText,
    addAttachmentActionText: resource.addAttachmentActionText,
    phoneAbbreviationText: resource.phoneAbbreviationText,
    mobileAbbreviationText: resource.mobileAbbreviationText,
    tollFreeAbbreviationText: resource.tollFreeAbbreviationText,

    // View Properties
    detailView: 'lead_detail',
    itemIconClass: 'agent',
    iconTemplate: new Simplate(['<span class="fa-stack">', '<i class="fa fa-square-o fa-stack-2x"></i>', '<i class="fa fa-user fa-stack-1x fa-inverse"></i>', '</span>']),
    id: 'lead_list',
    security: 'Entities/Lead/View',
    insertView: 'lead_edit',
    queryOrderBy: null,
    querySelect: [],
    modelName: _Names2.default.LEAD,
    resourceKind: 'leads',
    entityName: 'Lead',
    groupsEnabled: true,
    allowSelection: true,
    enableActions: true,
    createActionLayout: function createActionLayout() {
      var _this = this;

      return this.actions || (this.actions = [{
        id: 'edit',
        cls: 'edit',
        label: this.editActionText,
        action: 'navigateToEditView',
        security: 'Entities/Lead/Edit'
      }, {
        id: 'callWork',
        cls: 'phone',
        label: this.callWorkActionText,
        enabled: _Action2.default.hasProperty.bindDelegate(this, 'WorkPhone'),
        fn: function fn(act, selectionIn) {
          var selectionOut = _this.linkLeadProperties(selectionIn);
          _Action2.default.callPhone.call(_this, act, selectionOut, 'WorkPhone');
        }
      }, {
        id: 'callMobile',
        cls: 'phone',
        label: this.callMobileActionText,
        enabled: _Action2.default.hasProperty.bindDelegate(this, 'Mobile'),
        fn: function fn(act, selectionIn) {
          var selectionOut = _this.linkLeadProperties(selectionIn);
          _Action2.default.callPhone.call(_this, act, selectionOut, 'Mobile');
        }
      }, {
        id: 'sendEmail',
        cls: 'mail',
        label: this.sendEmailActionText,
        enabled: _Action2.default.hasProperty.bindDelegate(this, 'Email'),
        fn: function fn(act, selectionIn) {
          var selectionOut = _this.linkLeadProperties(selectionIn);
          _Action2.default.sendEmail.call(_this, act, selectionOut, 'Email');
        }
      }, {
        id: 'addNote',
        cls: 'edit',
        label: this.addNoteActionText,
        fn: _Action2.default.addNote.bindDelegate(this)
      }, {
        id: 'addActivity',
        cls: 'calendar',
        label: this.addActivityActionText,
        fn: _Action2.default.addActivity.bindDelegate(this)
      }, {
        id: 'addAttachment',
        cls: 'attach',
        label: this.addAttachmentActionText,
        fn: _Action2.default.addAttachment.bindDelegate(this)
      }]);
    },

    linkLeadProperties: function linkLeadProperties() {
      var selection = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var data = selection.data;


      if (data) {
        selection.data.LeadId = data.$key;
        selection.data.AccountName = data.Company;
        selection.data.LeadName = data.LeadNameLastFirst;
      }
      return selection;
    },

    groupInvokeActionByName: function groupInvokeActionByName(actionName, options) {
      if (options) {
        options.selection = this.linkLeadProperties(options.selection);
      }
      this.inherited(groupInvokeActionByName, arguments);
    },

    formatSearchQuery: function formatSearchQuery(searchQuery) {
      var q = this.escapeSearchQuery(searchQuery.toUpperCase());
      return '(LastNameUpper like "' + q + '%" or upper(FirstName) like "' + q + '%" or CompanyUpper like "' + q + '%" or upper(LeadNameLastFirst) like "%' + q + '%")';
    }
  });

  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9WaWV3cy9MZWFkL0xpc3QuanMiXSwibmFtZXMiOlsicmVzb3VyY2UiLCJfX2NsYXNzIiwiaXRlbVRlbXBsYXRlIiwiU2ltcGxhdGUiLCJqb2luRmllbGRzIiwic2VwIiwiZmllbGRzIiwiY2FsbFdvcmsiLCJwYXJhbXMiLCJpbnZva2VBY3Rpb25JdGVtQnkiLCJ0aGVBY3Rpb24iLCJpZCIsImtleSIsImNhbGxNb2JpbGUiLCJzZW5kRW1haWwiLCJmb3JtYXRQaWNrbGlzdCIsInByb3BlcnR5IiwicGlja2xpc3QiLCJhcHAiLCJwaWNrbGlzdFNlcnZpY2UiLCJfbW9kZWwiLCJ0aXRsZVRleHQiLCJhY3Rpdml0aWVzVGV4dCIsIm5vdGVzVGV4dCIsInNjaGVkdWxlVGV4dCIsImVtYWlsZWRUZXh0IiwiY2FsbGVkVGV4dCIsImVkaXRBY3Rpb25UZXh0IiwiY2FsbE1vYmlsZUFjdGlvblRleHQiLCJjYWxsV29ya0FjdGlvblRleHQiLCJzZW5kRW1haWxBY3Rpb25UZXh0IiwiYWRkTm90ZUFjdGlvblRleHQiLCJhZGRBY3Rpdml0eUFjdGlvblRleHQiLCJhZGRBdHRhY2htZW50QWN0aW9uVGV4dCIsInBob25lQWJicmV2aWF0aW9uVGV4dCIsIm1vYmlsZUFiYnJldmlhdGlvblRleHQiLCJ0b2xsRnJlZUFiYnJldmlhdGlvblRleHQiLCJkZXRhaWxWaWV3IiwiaXRlbUljb25DbGFzcyIsImljb25UZW1wbGF0ZSIsInNlY3VyaXR5IiwiaW5zZXJ0VmlldyIsInF1ZXJ5T3JkZXJCeSIsInF1ZXJ5U2VsZWN0IiwibW9kZWxOYW1lIiwiTEVBRCIsInJlc291cmNlS2luZCIsImVudGl0eU5hbWUiLCJncm91cHNFbmFibGVkIiwiYWxsb3dTZWxlY3Rpb24iLCJlbmFibGVBY3Rpb25zIiwiY3JlYXRlQWN0aW9uTGF5b3V0IiwiYWN0aW9ucyIsImNscyIsImxhYmVsIiwiYWN0aW9uIiwiZW5hYmxlZCIsImhhc1Byb3BlcnR5IiwiYmluZERlbGVnYXRlIiwiZm4iLCJhY3QiLCJzZWxlY3Rpb25JbiIsInNlbGVjdGlvbk91dCIsImxpbmtMZWFkUHJvcGVydGllcyIsImNhbGxQaG9uZSIsImNhbGwiLCJhZGROb3RlIiwiYWRkQWN0aXZpdHkiLCJhZGRBdHRhY2htZW50Iiwic2VsZWN0aW9uIiwiZGF0YSIsIkxlYWRJZCIsIiRrZXkiLCJBY2NvdW50TmFtZSIsIkNvbXBhbnkiLCJMZWFkTmFtZSIsIkxlYWROYW1lTGFzdEZpcnN0IiwiZ3JvdXBJbnZva2VBY3Rpb25CeU5hbWUiLCJhY3Rpb25OYW1lIiwib3B0aW9ucyIsImluaGVyaXRlZCIsImFyZ3VtZW50cyIsImZvcm1hdFNlYXJjaFF1ZXJ5Iiwic2VhcmNoUXVlcnkiLCJxIiwiZXNjYXBlU2VhcmNoUXVlcnkiLCJ0b1VwcGVyQ2FzZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7QUEwQkEsTUFBTUEsV0FBVyxvQkFBWSxVQUFaLENBQWpCOztBQUVBOzs7Ozs7Ozs7Ozs7O0FBYUEsTUFBTUMsVUFBVSx1QkFBUSxxQkFBUixFQUErQixxR0FBL0IsRUFBaUc7QUFDL0c7QUFDQUMsa0JBQWMsSUFBSUMsUUFBSixDQUFhLENBQ3pCLHdCQUR5QixFQUV6QiwrRUFGeUIsRUFHekIsTUFIeUIsRUFJekIsMEJBSnlCLEVBS3pCLHdCQUx5QixFQU16Qix1SkFOeUIsRUFNZ0k7QUFDekosVUFQeUIsRUFRekIsU0FSeUIsRUFTekIsdUJBVHlCLEVBVXpCLHdCQVZ5QixFQVd6Qix1SkFYeUIsRUFXZ0k7QUFDekosVUFaeUIsRUFhekIsU0FieUIsRUFjekIseUJBZHlCLEVBZXpCLHdCQWZ5QixFQWdCekIsMEVBaEJ5QixFQWdCbUQ7QUFDNUUsVUFqQnlCLEVBa0J6QixTQWxCeUIsRUFtQnpCLCtDQW5CeUIsRUFvQnpCLHNCQXBCeUIsRUFxQnpCLHdCQXJCeUIsRUFzQnpCLGdHQXRCeUIsRUF1QnpCLE1BdkJ5QixFQXdCekIsU0F4QnlCLENBQWIsQ0FGaUc7O0FBNkIvR0MsZ0JBQVksU0FBU0EsVUFBVCxDQUFvQkMsR0FBcEIsRUFBeUJDLE1BQXpCLEVBQWlDO0FBQzNDLGFBQU8sa0JBQVFGLFVBQVIsQ0FBbUJDLEdBQW5CLEVBQXdCQyxNQUF4QixDQUFQO0FBQ0QsS0EvQjhHO0FBZ0MvR0MsY0FBVSxTQUFTQSxRQUFULENBQWtCQyxNQUFsQixFQUEwQjtBQUNsQyxXQUFLQyxrQkFBTCxDQUF3QixVQUFDQyxTQUFELEVBQWU7QUFDckMsZUFBT0EsVUFBVUMsRUFBVixLQUFpQixVQUF4QjtBQUNELE9BRkQsRUFFR0gsT0FBT0ksR0FGVjtBQUdELEtBcEM4RztBQXFDL0dDLGdCQUFZLFNBQVNBLFVBQVQsQ0FBb0JMLE1BQXBCLEVBQTRCO0FBQ3RDLFdBQUtDLGtCQUFMLENBQXdCLFVBQUNDLFNBQUQsRUFBZTtBQUNyQyxlQUFPQSxVQUFVQyxFQUFWLEtBQWlCLFlBQXhCO0FBQ0QsT0FGRCxFQUVHSCxPQUFPSSxHQUZWO0FBR0QsS0F6QzhHO0FBMEMvR0UsZUFBVyxTQUFTQSxTQUFULENBQW1CTixNQUFuQixFQUEyQjtBQUNwQyxXQUFLQyxrQkFBTCxDQUF3QixVQUFDQyxTQUFELEVBQWU7QUFDckMsZUFBT0EsVUFBVUMsRUFBVixLQUFpQixXQUF4QjtBQUNELE9BRkQsRUFFR0gsT0FBT0ksR0FGVjtBQUdELEtBOUM4RztBQStDL0dHLG9CQUFnQixTQUFTQSxjQUFULENBQXdCQyxRQUF4QixFQUFrQztBQUNoRCxhQUFPLGlCQUFPQyxRQUFQLENBQWdCLEtBQUtDLEdBQUwsQ0FBU0MsZUFBekIsRUFBMEMsS0FBS0MsTUFBL0MsRUFBdURKLFFBQXZELENBQVA7QUFDRCxLQWpEOEc7O0FBbUQvRztBQUNBSyxlQUFXckIsU0FBU3FCLFNBcEQyRjtBQXFEL0dDLG9CQUFnQnRCLFNBQVNzQixjQXJEc0Y7QUFzRC9HQyxlQUFXdkIsU0FBU3VCLFNBdEQyRjtBQXVEL0dDLGtCQUFjeEIsU0FBU3dCLFlBdkR3RjtBQXdEL0dDLGlCQUFhekIsU0FBU3lCLFdBeER5RjtBQXlEL0dDLGdCQUFZMUIsU0FBUzBCLFVBekQwRjtBQTBEL0dDLG9CQUFnQjNCLFNBQVMyQixjQTFEc0Y7QUEyRC9HQywwQkFBc0I1QixTQUFTNEIsb0JBM0RnRjtBQTREL0dDLHdCQUFvQjdCLFNBQVM2QixrQkE1RGtGO0FBNkQvR0MseUJBQXFCOUIsU0FBUzhCLG1CQTdEaUY7QUE4RC9HQyx1QkFBbUIvQixTQUFTK0IsaUJBOURtRjtBQStEL0dDLDJCQUF1QmhDLFNBQVNnQyxxQkEvRCtFO0FBZ0UvR0MsNkJBQXlCakMsU0FBU2lDLHVCQWhFNkU7QUFpRS9HQywyQkFBdUJsQyxTQUFTa0MscUJBakUrRTtBQWtFL0dDLDRCQUF3Qm5DLFNBQVNtQyxzQkFsRThFO0FBbUUvR0MsOEJBQTBCcEMsU0FBU29DLHdCQW5FNEU7O0FBcUUvRztBQUNBQyxnQkFBWSxhQXRFbUc7QUF1RS9HQyxtQkFBZSxPQXZFZ0c7QUF3RS9HQyxrQkFBYyxJQUFJcEMsUUFBSixDQUFhLENBQ3pCLHlCQUR5QixFQUV6Qiw0Q0FGeUIsRUFHekIsbURBSHlCLEVBSXpCLFNBSnlCLENBQWIsQ0F4RWlHO0FBOEUvR1EsUUFBSSxXQTlFMkc7QUErRS9HNkIsY0FBVSxvQkEvRXFHO0FBZ0YvR0MsZ0JBQVksV0FoRm1HO0FBaUYvR0Msa0JBQWMsSUFqRmlHO0FBa0YvR0MsaUJBQWEsRUFsRmtHO0FBbUYvR0MsZUFBVyxnQkFBWUMsSUFuRndGO0FBb0YvR0Msa0JBQWMsT0FwRmlHO0FBcUYvR0MsZ0JBQVksTUFyRm1HO0FBc0YvR0MsbUJBQWUsSUF0RmdHO0FBdUYvR0Msb0JBQWdCLElBdkYrRjtBQXdGL0dDLG1CQUFlLElBeEZnRztBQXlGL0dDLHdCQUFvQixTQUFTQSxrQkFBVCxHQUE4QjtBQUFBOztBQUNoRCxhQUFPLEtBQUtDLE9BQUwsS0FBaUIsS0FBS0EsT0FBTCxHQUFlLENBQUM7QUFDdEN6QyxZQUFJLE1BRGtDO0FBRXRDMEMsYUFBSyxNQUZpQztBQUd0Q0MsZUFBTyxLQUFLM0IsY0FIMEI7QUFJdEM0QixnQkFBUSxvQkFKOEI7QUFLdENmLGtCQUFVO0FBTDRCLE9BQUQsRUFNcEM7QUFDRDdCLFlBQUksVUFESDtBQUVEMEMsYUFBSyxPQUZKO0FBR0RDLGVBQU8sS0FBS3pCLGtCQUhYO0FBSUQyQixpQkFBUyxpQkFBT0MsV0FBUCxDQUFtQkMsWUFBbkIsQ0FBZ0MsSUFBaEMsRUFBc0MsV0FBdEMsQ0FKUjtBQUtEQyxZQUFJLFlBQUNDLEdBQUQsRUFBTUMsV0FBTixFQUFzQjtBQUN4QixjQUFNQyxlQUFlLE1BQUtDLGtCQUFMLENBQXdCRixXQUF4QixDQUFyQjtBQUNBLDJCQUFPRyxTQUFQLENBQWlCQyxJQUFqQixRQUE0QkwsR0FBNUIsRUFBaUNFLFlBQWpDLEVBQStDLFdBQS9DO0FBQ0Q7QUFSQSxPQU5vQyxFQWVwQztBQUNEbkQsWUFBSSxZQURIO0FBRUQwQyxhQUFLLE9BRko7QUFHREMsZUFBTyxLQUFLMUIsb0JBSFg7QUFJRDRCLGlCQUFTLGlCQUFPQyxXQUFQLENBQW1CQyxZQUFuQixDQUFnQyxJQUFoQyxFQUFzQyxRQUF0QyxDQUpSO0FBS0RDLFlBQUksWUFBQ0MsR0FBRCxFQUFNQyxXQUFOLEVBQXNCO0FBQ3hCLGNBQU1DLGVBQWUsTUFBS0Msa0JBQUwsQ0FBd0JGLFdBQXhCLENBQXJCO0FBQ0EsMkJBQU9HLFNBQVAsQ0FBaUJDLElBQWpCLFFBQTRCTCxHQUE1QixFQUFpQ0UsWUFBakMsRUFBK0MsUUFBL0M7QUFDRDtBQVJBLE9BZm9DLEVBd0JwQztBQUNEbkQsWUFBSSxXQURIO0FBRUQwQyxhQUFLLE1BRko7QUFHREMsZUFBTyxLQUFLeEIsbUJBSFg7QUFJRDBCLGlCQUFTLGlCQUFPQyxXQUFQLENBQW1CQyxZQUFuQixDQUFnQyxJQUFoQyxFQUFzQyxPQUF0QyxDQUpSO0FBS0RDLFlBQUksWUFBQ0MsR0FBRCxFQUFNQyxXQUFOLEVBQXNCO0FBQ3hCLGNBQU1DLGVBQWUsTUFBS0Msa0JBQUwsQ0FBd0JGLFdBQXhCLENBQXJCO0FBQ0EsMkJBQU8vQyxTQUFQLENBQWlCbUQsSUFBakIsUUFBNEJMLEdBQTVCLEVBQWlDRSxZQUFqQyxFQUErQyxPQUEvQztBQUNEO0FBUkEsT0F4Qm9DLEVBaUNwQztBQUNEbkQsWUFBSSxTQURIO0FBRUQwQyxhQUFLLE1BRko7QUFHREMsZUFBTyxLQUFLdkIsaUJBSFg7QUFJRDRCLFlBQUksaUJBQU9PLE9BQVAsQ0FBZVIsWUFBZixDQUE0QixJQUE1QjtBQUpILE9BakNvQyxFQXNDcEM7QUFDRC9DLFlBQUksYUFESDtBQUVEMEMsYUFBSyxVQUZKO0FBR0RDLGVBQU8sS0FBS3RCLHFCQUhYO0FBSUQyQixZQUFJLGlCQUFPUSxXQUFQLENBQW1CVCxZQUFuQixDQUFnQyxJQUFoQztBQUpILE9BdENvQyxFQTJDcEM7QUFDRC9DLFlBQUksZUFESDtBQUVEMEMsYUFBSyxRQUZKO0FBR0RDLGVBQU8sS0FBS3JCLHVCQUhYO0FBSUQwQixZQUFJLGlCQUFPUyxhQUFQLENBQXFCVixZQUFyQixDQUFrQyxJQUFsQztBQUpILE9BM0NvQyxDQUFoQyxDQUFQO0FBaURELEtBM0k4Rzs7QUE2SS9HSyx3QkFBb0IsU0FBU0Esa0JBQVQsR0FBNEM7QUFBQSxVQUFoQk0sU0FBZ0IsdUVBQUosRUFBSTtBQUFBLFVBQ3REQyxJQURzRCxHQUM3Q0QsU0FENkMsQ0FDdERDLElBRHNEOzs7QUFHOUQsVUFBSUEsSUFBSixFQUFVO0FBQ1JELGtCQUFVQyxJQUFWLENBQWVDLE1BQWYsR0FBd0JELEtBQUtFLElBQTdCO0FBQ0FILGtCQUFVQyxJQUFWLENBQWVHLFdBQWYsR0FBNkJILEtBQUtJLE9BQWxDO0FBQ0FMLGtCQUFVQyxJQUFWLENBQWVLLFFBQWYsR0FBMEJMLEtBQUtNLGlCQUEvQjtBQUNEO0FBQ0QsYUFBT1AsU0FBUDtBQUNELEtBdEo4Rzs7QUF3Si9HUSw2QkFBeUIsU0FBU0EsdUJBQVQsQ0FBaUNDLFVBQWpDLEVBQTZDQyxPQUE3QyxFQUFzRDtBQUM3RSxVQUFJQSxPQUFKLEVBQWE7QUFDWEEsZ0JBQVFWLFNBQVIsR0FBb0IsS0FBS04sa0JBQUwsQ0FBd0JnQixRQUFRVixTQUFoQyxDQUFwQjtBQUNEO0FBQ0QsV0FBS1csU0FBTCxDQUFlSCx1QkFBZixFQUF3Q0ksU0FBeEM7QUFDRCxLQTdKOEc7O0FBK0ovR0MsdUJBQW1CLFNBQVNBLGlCQUFULENBQTJCQyxXQUEzQixFQUF3QztBQUN6RCxVQUFNQyxJQUFJLEtBQUtDLGlCQUFMLENBQXVCRixZQUFZRyxXQUFaLEVBQXZCLENBQVY7QUFDQSx1Q0FBK0JGLENBQS9CLHFDQUFnRUEsQ0FBaEUsaUNBQTZGQSxDQUE3Riw4Q0FBdUlBLENBQXZJO0FBQ0Q7QUFsSzhHLEdBQWpHLENBQWhCOztvQkFxS2VuRixPIiwiZmlsZSI6Ikxpc3QuanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IDIwMTcgSW5mb3JcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG5pbXBvcnQgZGVjbGFyZSBmcm9tICdkb2pvL19iYXNlL2RlY2xhcmUnO1xyXG5pbXBvcnQgYWN0aW9uIGZyb20gJy4uLy4uL0FjdGlvbic7XHJcbmltcG9ydCBmb3JtYXQgZnJvbSAnLi4vLi4vRm9ybWF0JztcclxuaW1wb3J0IHV0aWxpdHkgZnJvbSAnYXJnb3MvVXRpbGl0eSc7XHJcbmltcG9ydCBMaXN0IGZyb20gJ2FyZ29zL0xpc3QnO1xyXG5pbXBvcnQgX0dyb3VwTGlzdE1peGluIGZyb20gJy4uL19Hcm91cExpc3RNaXhpbic7XHJcbmltcG9ydCBfTWV0cmljTGlzdE1peGluIGZyb20gJy4uL19NZXRyaWNMaXN0TWl4aW4nO1xyXG5pbXBvcnQgX1JpZ2h0RHJhd2VyTGlzdE1peGluIGZyb20gJy4uL19SaWdodERyYXdlckxpc3RNaXhpbic7XHJcbmltcG9ydCBnZXRSZXNvdXJjZSBmcm9tICdhcmdvcy9JMThuJztcclxuaW1wb3J0IE1PREVMX05BTUVTIGZyb20gJy4uLy4uL01vZGVscy9OYW1lcyc7XHJcblxyXG5jb25zdCByZXNvdXJjZSA9IGdldFJlc291cmNlKCdsZWFkTGlzdCcpO1xyXG5cclxuLyoqXHJcbiAqIEBjbGFzcyBjcm0uVmlld3MuTGVhZC5MaXN0XHJcbiAqXHJcbiAqIEBleHRlbmRzIGFyZ29zLkxpc3RcclxuICogQG1peGlucyBjcm0uVmlld3MuX1JpZ2h0RHJhd2VyTGlzdE1peGluXHJcbiAqIEBtaXhpbnMgY3JtLlZpZXdzLl9NZXRyaWNMaXN0TWl4aW5cclxuICogQG1peGlucyBjcm0uVmlld3MuX0dyb3VwTGlzdE1peGluXHJcbiAqXHJcbiAqIEByZXF1aXJlcyBhcmdvcy5Gb3JtYXRcclxuICogQHJlcXVpcmVzIGFyZ29zLlV0aWxpdHlcclxuICpcclxuICogQHJlcXVpcmVzIGNybS5BY3Rpb25cclxuICovXHJcbmNvbnN0IF9fY2xhc3MgPSBkZWNsYXJlKCdjcm0uVmlld3MuTGVhZC5MaXN0JywgW0xpc3QsIF9SaWdodERyYXdlckxpc3RNaXhpbiwgX01ldHJpY0xpc3RNaXhpbiwgX0dyb3VwTGlzdE1peGluXSwge1xyXG4gIC8vIFRlbXBsYXRlc1xyXG4gIGl0ZW1UZW1wbGF0ZTogbmV3IFNpbXBsYXRlKFtcclxuICAgICc8cCBjbGFzcz1cIm1pY3JvLXRleHRcIj4nLFxyXG4gICAgJ3slOiAkJC5qb2luRmllbGRzKFwiIHwgXCIsIFskJC5mb3JtYXRQaWNrbGlzdChcIlRpdGxlXCIpKCQuVGl0bGUpLCAkLkNvbXBhbnldKSAlfScsXHJcbiAgICAnPC9wPicsXHJcbiAgICAneyUgaWYgKCQuV29ya1Bob25lKSB7ICV9JyxcclxuICAgICc8cCBjbGFzcz1cIm1pY3JvLXRleHRcIj4nLFxyXG4gICAgJ3slOiAkJC5waG9uZUFiYnJldmlhdGlvblRleHQgJX0gPHNwYW4gY2xhc3M9XCJoeXBlcmxpbmtcIiBkYXRhLWFjdGlvbj1cImNhbGxXb3JrXCIgZGF0YS1rZXk9XCJ7JTogJC4ka2V5ICV9XCI+eyU6IGFyZ29zLkZvcm1hdC5waG9uZSgkLldvcmtQaG9uZSkgJX08L3NwYW4+JywgLy8gVE9ETzogQXZvaWQgZ2xvYmFsXHJcbiAgICAnPC9wPicsXHJcbiAgICAneyUgfSAlfScsXHJcbiAgICAneyUgaWYgKCQuTW9iaWxlKSB7ICV9JyxcclxuICAgICc8cCBjbGFzcz1cIm1pY3JvLXRleHRcIj4nLFxyXG4gICAgJ3slOiAkJC5tb2JpbGVBYmJyZXZpYXRpb25UZXh0ICV9IDxzcGFuIGNsYXNzPVwiaHlwZXJsaW5rXCIgZGF0YS1hY3Rpb249XCJjYWxsTW9iaWxlXCIgZGF0YS1rZXk9XCJ7JTogJC4ka2V5ICV9XCI+eyU6IGFyZ29zLkZvcm1hdC5waG9uZSgkLk1vYmlsZSkgJX08L3NwYW4+JywgLy8gVE9ETzogQXZvaWQgZ2xvYmFsXHJcbiAgICAnPC9wPicsXHJcbiAgICAneyUgfSAlfScsXHJcbiAgICAneyUgaWYgKCQuVG9sbEZyZWUpIHsgJX0nLFxyXG4gICAgJzxwIGNsYXNzPVwibWljcm8tdGV4dFwiPicsXHJcbiAgICAneyU6ICQkLnRvbGxGcmVlQWJicmV2aWF0aW9uVGV4dCAlfSB7JTogYXJnb3MuRm9ybWF0LnBob25lKCQuVG9sbEZyZWUpICV9JywgLy8gVE9ETzogQXZvaWQgZ2xvYmFsXHJcbiAgICAnPC9wPicsXHJcbiAgICAneyUgfSAlfScsXHJcbiAgICAnPHAgY2xhc3M9XCJtaWNyby10ZXh0XCI+eyU6ICQuV2ViQWRkcmVzcyAlfTwvcD4nLFxyXG4gICAgJ3slIGlmICgkLkVtYWlsKSB7ICV9JyxcclxuICAgICc8cCBjbGFzcz1cIm1pY3JvLXRleHRcIj4nLFxyXG4gICAgJzxzcGFuIGNsYXNzPVwiaHlwZXJsaW5rXCIgZGF0YS1hY3Rpb249XCJzZW5kRW1haWxcIiBkYXRhLWtleT1cInslOiAkLiRrZXkgJX1cIj57JTogJC5FbWFpbCAlfTwvc3Bhbj4nLFxyXG4gICAgJzwvcD4nLFxyXG4gICAgJ3slIH0gJX0nLFxyXG4gIF0pLFxyXG5cclxuICBqb2luRmllbGRzOiBmdW5jdGlvbiBqb2luRmllbGRzKHNlcCwgZmllbGRzKSB7XHJcbiAgICByZXR1cm4gdXRpbGl0eS5qb2luRmllbGRzKHNlcCwgZmllbGRzKTtcclxuICB9LFxyXG4gIGNhbGxXb3JrOiBmdW5jdGlvbiBjYWxsV29yayhwYXJhbXMpIHtcclxuICAgIHRoaXMuaW52b2tlQWN0aW9uSXRlbUJ5KCh0aGVBY3Rpb24pID0+IHtcclxuICAgICAgcmV0dXJuIHRoZUFjdGlvbi5pZCA9PT0gJ2NhbGxXb3JrJztcclxuICAgIH0sIHBhcmFtcy5rZXkpO1xyXG4gIH0sXHJcbiAgY2FsbE1vYmlsZTogZnVuY3Rpb24gY2FsbE1vYmlsZShwYXJhbXMpIHtcclxuICAgIHRoaXMuaW52b2tlQWN0aW9uSXRlbUJ5KCh0aGVBY3Rpb24pID0+IHtcclxuICAgICAgcmV0dXJuIHRoZUFjdGlvbi5pZCA9PT0gJ2NhbGxNb2JpbGUnO1xyXG4gICAgfSwgcGFyYW1zLmtleSk7XHJcbiAgfSxcclxuICBzZW5kRW1haWw6IGZ1bmN0aW9uIHNlbmRFbWFpbChwYXJhbXMpIHtcclxuICAgIHRoaXMuaW52b2tlQWN0aW9uSXRlbUJ5KCh0aGVBY3Rpb24pID0+IHtcclxuICAgICAgcmV0dXJuIHRoZUFjdGlvbi5pZCA9PT0gJ3NlbmRFbWFpbCc7XHJcbiAgICB9LCBwYXJhbXMua2V5KTtcclxuICB9LFxyXG4gIGZvcm1hdFBpY2tsaXN0OiBmdW5jdGlvbiBmb3JtYXRQaWNrbGlzdChwcm9wZXJ0eSkge1xyXG4gICAgcmV0dXJuIGZvcm1hdC5waWNrbGlzdCh0aGlzLmFwcC5waWNrbGlzdFNlcnZpY2UsIHRoaXMuX21vZGVsLCBwcm9wZXJ0eSk7XHJcbiAgfSxcclxuXHJcbiAgLy8gTG9jYWxpemF0aW9uXHJcbiAgdGl0bGVUZXh0OiByZXNvdXJjZS50aXRsZVRleHQsXHJcbiAgYWN0aXZpdGllc1RleHQ6IHJlc291cmNlLmFjdGl2aXRpZXNUZXh0LFxyXG4gIG5vdGVzVGV4dDogcmVzb3VyY2Uubm90ZXNUZXh0LFxyXG4gIHNjaGVkdWxlVGV4dDogcmVzb3VyY2Uuc2NoZWR1bGVUZXh0LFxyXG4gIGVtYWlsZWRUZXh0OiByZXNvdXJjZS5lbWFpbGVkVGV4dCxcclxuICBjYWxsZWRUZXh0OiByZXNvdXJjZS5jYWxsZWRUZXh0LFxyXG4gIGVkaXRBY3Rpb25UZXh0OiByZXNvdXJjZS5lZGl0QWN0aW9uVGV4dCxcclxuICBjYWxsTW9iaWxlQWN0aW9uVGV4dDogcmVzb3VyY2UuY2FsbE1vYmlsZUFjdGlvblRleHQsXHJcbiAgY2FsbFdvcmtBY3Rpb25UZXh0OiByZXNvdXJjZS5jYWxsV29ya0FjdGlvblRleHQsXHJcbiAgc2VuZEVtYWlsQWN0aW9uVGV4dDogcmVzb3VyY2Uuc2VuZEVtYWlsQWN0aW9uVGV4dCxcclxuICBhZGROb3RlQWN0aW9uVGV4dDogcmVzb3VyY2UuYWRkTm90ZUFjdGlvblRleHQsXHJcbiAgYWRkQWN0aXZpdHlBY3Rpb25UZXh0OiByZXNvdXJjZS5hZGRBY3Rpdml0eUFjdGlvblRleHQsXHJcbiAgYWRkQXR0YWNobWVudEFjdGlvblRleHQ6IHJlc291cmNlLmFkZEF0dGFjaG1lbnRBY3Rpb25UZXh0LFxyXG4gIHBob25lQWJicmV2aWF0aW9uVGV4dDogcmVzb3VyY2UucGhvbmVBYmJyZXZpYXRpb25UZXh0LFxyXG4gIG1vYmlsZUFiYnJldmlhdGlvblRleHQ6IHJlc291cmNlLm1vYmlsZUFiYnJldmlhdGlvblRleHQsXHJcbiAgdG9sbEZyZWVBYmJyZXZpYXRpb25UZXh0OiByZXNvdXJjZS50b2xsRnJlZUFiYnJldmlhdGlvblRleHQsXHJcblxyXG4gIC8vIFZpZXcgUHJvcGVydGllc1xyXG4gIGRldGFpbFZpZXc6ICdsZWFkX2RldGFpbCcsXHJcbiAgaXRlbUljb25DbGFzczogJ2FnZW50JyxcclxuICBpY29uVGVtcGxhdGU6IG5ldyBTaW1wbGF0ZShbXHJcbiAgICAnPHNwYW4gY2xhc3M9XCJmYS1zdGFja1wiPicsXHJcbiAgICAnPGkgY2xhc3M9XCJmYSBmYS1zcXVhcmUtbyBmYS1zdGFjay0yeFwiPjwvaT4nLFxyXG4gICAgJzxpIGNsYXNzPVwiZmEgZmEtdXNlciBmYS1zdGFjay0xeCBmYS1pbnZlcnNlXCI+PC9pPicsXHJcbiAgICAnPC9zcGFuPicsXHJcbiAgXSksXHJcbiAgaWQ6ICdsZWFkX2xpc3QnLFxyXG4gIHNlY3VyaXR5OiAnRW50aXRpZXMvTGVhZC9WaWV3JyxcclxuICBpbnNlcnRWaWV3OiAnbGVhZF9lZGl0JyxcclxuICBxdWVyeU9yZGVyQnk6IG51bGwsXHJcbiAgcXVlcnlTZWxlY3Q6IFtdLFxyXG4gIG1vZGVsTmFtZTogTU9ERUxfTkFNRVMuTEVBRCxcclxuICByZXNvdXJjZUtpbmQ6ICdsZWFkcycsXHJcbiAgZW50aXR5TmFtZTogJ0xlYWQnLFxyXG4gIGdyb3Vwc0VuYWJsZWQ6IHRydWUsXHJcbiAgYWxsb3dTZWxlY3Rpb246IHRydWUsXHJcbiAgZW5hYmxlQWN0aW9uczogdHJ1ZSxcclxuICBjcmVhdGVBY3Rpb25MYXlvdXQ6IGZ1bmN0aW9uIGNyZWF0ZUFjdGlvbkxheW91dCgpIHtcclxuICAgIHJldHVybiB0aGlzLmFjdGlvbnMgfHwgKHRoaXMuYWN0aW9ucyA9IFt7XHJcbiAgICAgIGlkOiAnZWRpdCcsXHJcbiAgICAgIGNsczogJ2VkaXQnLFxyXG4gICAgICBsYWJlbDogdGhpcy5lZGl0QWN0aW9uVGV4dCxcclxuICAgICAgYWN0aW9uOiAnbmF2aWdhdGVUb0VkaXRWaWV3JyxcclxuICAgICAgc2VjdXJpdHk6ICdFbnRpdGllcy9MZWFkL0VkaXQnLFxyXG4gICAgfSwge1xyXG4gICAgICBpZDogJ2NhbGxXb3JrJyxcclxuICAgICAgY2xzOiAncGhvbmUnLFxyXG4gICAgICBsYWJlbDogdGhpcy5jYWxsV29ya0FjdGlvblRleHQsXHJcbiAgICAgIGVuYWJsZWQ6IGFjdGlvbi5oYXNQcm9wZXJ0eS5iaW5kRGVsZWdhdGUodGhpcywgJ1dvcmtQaG9uZScpLFxyXG4gICAgICBmbjogKGFjdCwgc2VsZWN0aW9uSW4pID0+IHtcclxuICAgICAgICBjb25zdCBzZWxlY3Rpb25PdXQgPSB0aGlzLmxpbmtMZWFkUHJvcGVydGllcyhzZWxlY3Rpb25Jbik7XHJcbiAgICAgICAgYWN0aW9uLmNhbGxQaG9uZS5jYWxsKHRoaXMsIGFjdCwgc2VsZWN0aW9uT3V0LCAnV29ya1Bob25lJyk7XHJcbiAgICAgIH0sXHJcbiAgICB9LCB7XHJcbiAgICAgIGlkOiAnY2FsbE1vYmlsZScsXHJcbiAgICAgIGNsczogJ3Bob25lJyxcclxuICAgICAgbGFiZWw6IHRoaXMuY2FsbE1vYmlsZUFjdGlvblRleHQsXHJcbiAgICAgIGVuYWJsZWQ6IGFjdGlvbi5oYXNQcm9wZXJ0eS5iaW5kRGVsZWdhdGUodGhpcywgJ01vYmlsZScpLFxyXG4gICAgICBmbjogKGFjdCwgc2VsZWN0aW9uSW4pID0+IHtcclxuICAgICAgICBjb25zdCBzZWxlY3Rpb25PdXQgPSB0aGlzLmxpbmtMZWFkUHJvcGVydGllcyhzZWxlY3Rpb25Jbik7XHJcbiAgICAgICAgYWN0aW9uLmNhbGxQaG9uZS5jYWxsKHRoaXMsIGFjdCwgc2VsZWN0aW9uT3V0LCAnTW9iaWxlJyk7XHJcbiAgICAgIH0sXHJcbiAgICB9LCB7XHJcbiAgICAgIGlkOiAnc2VuZEVtYWlsJyxcclxuICAgICAgY2xzOiAnbWFpbCcsXHJcbiAgICAgIGxhYmVsOiB0aGlzLnNlbmRFbWFpbEFjdGlvblRleHQsXHJcbiAgICAgIGVuYWJsZWQ6IGFjdGlvbi5oYXNQcm9wZXJ0eS5iaW5kRGVsZWdhdGUodGhpcywgJ0VtYWlsJyksXHJcbiAgICAgIGZuOiAoYWN0LCBzZWxlY3Rpb25JbikgPT4ge1xyXG4gICAgICAgIGNvbnN0IHNlbGVjdGlvbk91dCA9IHRoaXMubGlua0xlYWRQcm9wZXJ0aWVzKHNlbGVjdGlvbkluKTtcclxuICAgICAgICBhY3Rpb24uc2VuZEVtYWlsLmNhbGwodGhpcywgYWN0LCBzZWxlY3Rpb25PdXQsICdFbWFpbCcpO1xyXG4gICAgICB9LFxyXG4gICAgfSwge1xyXG4gICAgICBpZDogJ2FkZE5vdGUnLFxyXG4gICAgICBjbHM6ICdlZGl0JyxcclxuICAgICAgbGFiZWw6IHRoaXMuYWRkTm90ZUFjdGlvblRleHQsXHJcbiAgICAgIGZuOiBhY3Rpb24uYWRkTm90ZS5iaW5kRGVsZWdhdGUodGhpcyksXHJcbiAgICB9LCB7XHJcbiAgICAgIGlkOiAnYWRkQWN0aXZpdHknLFxyXG4gICAgICBjbHM6ICdjYWxlbmRhcicsXHJcbiAgICAgIGxhYmVsOiB0aGlzLmFkZEFjdGl2aXR5QWN0aW9uVGV4dCxcclxuICAgICAgZm46IGFjdGlvbi5hZGRBY3Rpdml0eS5iaW5kRGVsZWdhdGUodGhpcyksXHJcbiAgICB9LCB7XHJcbiAgICAgIGlkOiAnYWRkQXR0YWNobWVudCcsXHJcbiAgICAgIGNsczogJ2F0dGFjaCcsXHJcbiAgICAgIGxhYmVsOiB0aGlzLmFkZEF0dGFjaG1lbnRBY3Rpb25UZXh0LFxyXG4gICAgICBmbjogYWN0aW9uLmFkZEF0dGFjaG1lbnQuYmluZERlbGVnYXRlKHRoaXMpLFxyXG4gICAgfV0pO1xyXG4gIH0sXHJcblxyXG4gIGxpbmtMZWFkUHJvcGVydGllczogZnVuY3Rpb24gbGlua0xlYWRQcm9wZXJ0aWVzKHNlbGVjdGlvbiA9IHt9KSB7XHJcbiAgICBjb25zdCB7IGRhdGEgfSA9IHNlbGVjdGlvbjtcclxuXHJcbiAgICBpZiAoZGF0YSkge1xyXG4gICAgICBzZWxlY3Rpb24uZGF0YS5MZWFkSWQgPSBkYXRhLiRrZXk7XHJcbiAgICAgIHNlbGVjdGlvbi5kYXRhLkFjY291bnROYW1lID0gZGF0YS5Db21wYW55O1xyXG4gICAgICBzZWxlY3Rpb24uZGF0YS5MZWFkTmFtZSA9IGRhdGEuTGVhZE5hbWVMYXN0Rmlyc3Q7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc2VsZWN0aW9uO1xyXG4gIH0sXHJcblxyXG4gIGdyb3VwSW52b2tlQWN0aW9uQnlOYW1lOiBmdW5jdGlvbiBncm91cEludm9rZUFjdGlvbkJ5TmFtZShhY3Rpb25OYW1lLCBvcHRpb25zKSB7XHJcbiAgICBpZiAob3B0aW9ucykge1xyXG4gICAgICBvcHRpb25zLnNlbGVjdGlvbiA9IHRoaXMubGlua0xlYWRQcm9wZXJ0aWVzKG9wdGlvbnMuc2VsZWN0aW9uKTtcclxuICAgIH1cclxuICAgIHRoaXMuaW5oZXJpdGVkKGdyb3VwSW52b2tlQWN0aW9uQnlOYW1lLCBhcmd1bWVudHMpO1xyXG4gIH0sXHJcblxyXG4gIGZvcm1hdFNlYXJjaFF1ZXJ5OiBmdW5jdGlvbiBmb3JtYXRTZWFyY2hRdWVyeShzZWFyY2hRdWVyeSkge1xyXG4gICAgY29uc3QgcSA9IHRoaXMuZXNjYXBlU2VhcmNoUXVlcnkoc2VhcmNoUXVlcnkudG9VcHBlckNhc2UoKSk7XHJcbiAgICByZXR1cm4gYChMYXN0TmFtZVVwcGVyIGxpa2UgXCIke3F9JVwiIG9yIHVwcGVyKEZpcnN0TmFtZSkgbGlrZSBcIiR7cX0lXCIgb3IgQ29tcGFueVVwcGVyIGxpa2UgXCIke3F9JVwiIG9yIHVwcGVyKExlYWROYW1lTGFzdEZpcnN0KSBsaWtlIFwiJSR7cX0lXCIpYDtcclxuICB9LFxyXG59KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IF9fY2xhc3M7XHJcbiJdfQ==
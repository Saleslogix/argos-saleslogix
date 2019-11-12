define('crm/Action', ['module', 'exports', 'dojo/_base/lang', 'dojo/string', 'argos/Utility', 'argos/I18n'], function (module, exports, _lang, _string, _Utility, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _lang2 = _interopRequireDefault(_lang);

  var _string2 = _interopRequireDefault(_string);

  var _Utility2 = _interopRequireDefault(_Utility);

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

  var resource = (0, _I18n2.default)('action');
  /**
   * @class crm.Action
   * @requires argos.Utility
   */
  var __class = _lang2.default.setObject('crm.Action', {
    calledText: resource.calledText,
    emailedText: resource.emailedText,

    navigateToHistoryInsert: function navigateToHistoryInsert(entry, complete, title) {
      var view = App.getView('history_edit');
      if (view) {
        view.show({
          title: title,
          template: {},
          entry: entry,
          insert: true
        }, {
          complete: complete
        });
      }
    },
    recordToHistory: function recordToHistory(complete, o, title) {
      var entry = {
        UserId: App.context && App.context.user.$key,
        UserName: App.context && App.context.user.$descriptor,
        Duration: 15,
        CompletedDate: new Date()
      };
      _lang2.default.mixin(entry, o);

      this.navigateToHistoryInsert(entry, complete, title);
    },
    callPhone: function callPhone(action, selection, phoneProperty, title) {
      if (!selection || !selection.data) {
        return;
      }

      var actionInitiated = false;
      this.setSource({
        entry: selection.data,
        descriptor: selection.data.$descriptor,
        key: selection.data.$key
      });

      _lang2.default.mixin(selection.data, {
        Type: 'atPhoneCall',
        Description: _string2.default.substitute(crm.Action.calledText, [selection.data.$descriptor])
      });

      var value = _Utility2.default.getValue(selection.data, phoneProperty, '');
      crm.Action.recordToHistory(function () {
        if (!actionInitiated) {
          App.initiateCall(value);
          actionInitiated = true;
        }
      }, selection.data, title);
    },
    sendEmail: function sendEmail(action, selection, emailProperty) {
      if (!selection || !selection.data) {
        return;
      }

      this.setSource({
        entry: selection.data,
        descriptor: selection.data.$descriptor,
        key: selection.data.$key
      });

      _lang2.default.mixin(selection.data, {
        Type: 'atEmail',
        Description: _string2.default.substitute(crm.Action.emailedText, [selection.data.$descriptor])
      });

      var value = _Utility2.default.getValue(selection.data, emailProperty, '');
      crm.Action.recordToHistory(function () {
        App.initiateEmail(value);
      }, selection.data);
    },
    addNote: function addNote(action, selection) {
      var entry = selection.data;
      var key = selection.data.$key;
      var desc = selection.data.$descriptor;

      this.setSource({
        entry: entry,
        descriptor: desc,
        key: key
      });

      var view = App.getView('history_edit');

      if (view) {
        view.show({
          insert: true
        });
      }
    },
    addActivity: function addActivity(action, selection) {
      this.setSource({
        entry: selection.data,
        descriptor: selection.data.$descriptor,
        key: selection.data.$key
      });
      App.navigateToActivityInsertView();
    },
    navigateToEntity: function navigateToEntity(action, selection, o) {
      var options = {
        key: _Utility2.default.getValue(selection.data, o.keyProperty),
        descriptor: _Utility2.default.getValue(selection.data, o.textProperty)
      };

      var view = App.getView(o.view);

      if (view && options.key) {
        view.show(options);
      }
    },
    hasProperty: function hasProperty(action, selection, property) {
      return _Utility2.default.getValue(selection.data, property);
    },
    addAttachment: function addAttachment(action, selection) {
      this.setSource({
        entry: selection.data,
        descriptor: selection.data.$descriptor,
        key: selection.data.$key
      });

      var view = App.getView('attachment_Add');

      if (view) {
        view.show({
          insert: true
        });
      }
    }
  });

  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9BY3Rpb24uanMiXSwibmFtZXMiOlsicmVzb3VyY2UiLCJfX2NsYXNzIiwic2V0T2JqZWN0IiwiY2FsbGVkVGV4dCIsImVtYWlsZWRUZXh0IiwibmF2aWdhdGVUb0hpc3RvcnlJbnNlcnQiLCJlbnRyeSIsImNvbXBsZXRlIiwidGl0bGUiLCJ2aWV3IiwiQXBwIiwiZ2V0VmlldyIsInNob3ciLCJ0ZW1wbGF0ZSIsImluc2VydCIsInJlY29yZFRvSGlzdG9yeSIsIm8iLCJVc2VySWQiLCJjb250ZXh0IiwidXNlciIsIiRrZXkiLCJVc2VyTmFtZSIsIiRkZXNjcmlwdG9yIiwiRHVyYXRpb24iLCJDb21wbGV0ZWREYXRlIiwiRGF0ZSIsIm1peGluIiwiY2FsbFBob25lIiwiYWN0aW9uIiwic2VsZWN0aW9uIiwicGhvbmVQcm9wZXJ0eSIsImRhdGEiLCJhY3Rpb25Jbml0aWF0ZWQiLCJzZXRTb3VyY2UiLCJkZXNjcmlwdG9yIiwia2V5IiwiVHlwZSIsIkRlc2NyaXB0aW9uIiwic3Vic3RpdHV0ZSIsImNybSIsIkFjdGlvbiIsInZhbHVlIiwiZ2V0VmFsdWUiLCJpbml0aWF0ZUNhbGwiLCJzZW5kRW1haWwiLCJlbWFpbFByb3BlcnR5IiwiaW5pdGlhdGVFbWFpbCIsImFkZE5vdGUiLCJkZXNjIiwiYWRkQWN0aXZpdHkiLCJuYXZpZ2F0ZVRvQWN0aXZpdHlJbnNlcnRWaWV3IiwibmF2aWdhdGVUb0VudGl0eSIsIm9wdGlvbnMiLCJrZXlQcm9wZXJ0eSIsInRleHRQcm9wZXJ0eSIsImhhc1Byb3BlcnR5IiwicHJvcGVydHkiLCJhZGRBdHRhY2htZW50Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7OztBQW9CQSxNQUFNQSxXQUFXLG9CQUFZLFFBQVosQ0FBakI7QUFDQTs7OztBQUlBLE1BQU1DLFVBQVUsZUFBS0MsU0FBTCxDQUFlLFlBQWYsRUFBNkI7QUFDM0NDLGdCQUFZSCxTQUFTRyxVQURzQjtBQUUzQ0Ms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RSxJQUEzQixFQUFpQ2YsRUFBRXFDLFdBQW5DLENBRFM7QUFFZG5CLG9CQUFZLGtCQUFRUSxRQUFSLENBQWlCYixVQUFVRSxJQUEzQixFQUFpQ2YsRUFBRXNDLFlBQW5DO0FBRkUsT0FBaEI7O0FBS0EsVUFBTTdDLE9BQU9DLElBQUlDLE9BQUosQ0FBWUssRUFBRVAsSUFBZCxDQUFiOztBQUVBLFVBQUlBLFFBQVEyQyxRQUFRakIsR0FBcEIsRUFBeUI7QUFDdkIxQixhQUFLRyxJQUFMLENBQVV3QyxPQUFWO0FBQ0Q7QUFDRixLQWhIMEM7QUFpSDNDRyxpQkFBYSxTQUFTQSxXQUFULENBQXFCM0IsTUFBckIsRUFBNkJDLFNBQTdCLEVBQXdDMkIsUUFBeEMsRUFBa0Q7QUFDN0QsYUFBTyxrQkFBUWQsUUFBUixDQUFpQmIsVUFBVUUsSUFBM0IsRUFBaUN5QixRQUFqQyxDQUFQO0FBQ0QsS0FuSDBDO0FBb0gzQ0MsbUJBQWUsU0FBU0EsYUFBVCxDQUF1QjdCLE1BQXZCLEVBQStCQyxTQUEvQixFQUEwQztBQUN2RCxXQUFLSSxTQUFMLENBQWU7QUFDYjNCLGVBQU91QixVQUFVRSxJQURKO0FBRWJHLG9CQUFZTCxVQUFVRSxJQUFWLENBQWVULFdBRmQ7QUFHYmEsYUFBS04sVUFBVUUsSUFBVixDQUFlWDtBQUhQLE9BQWY7O0FBTUEsVUFBTVgsT0FBT0MsSUFBSUMsT0FBSixDQUFZLGdCQUFaLENBQWI7O0FBRUEsVUFBSUYsSUFBSixFQUFVO0FBQ1JBLGFBQUtHLElBQUwsQ0FBVTtBQUNSRSxrQkFBUTtBQURBLFNBQVY7QUFHRDtBQUNGO0FBbEkwQyxHQUE3QixDQUFoQjs7b0JBcUllYixPIiwiZmlsZSI6IkFjdGlvbi5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBDb3B5cmlnaHQgMjAxNyBJbmZvclxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBsYW5nIGZyb20gJ2Rvam8vX2Jhc2UvbGFuZyc7XHJcbmltcG9ydCBzdHJpbmcgZnJvbSAnZG9qby9zdHJpbmcnO1xyXG5pbXBvcnQgdXRpbGl0eSBmcm9tICdhcmdvcy9VdGlsaXR5JztcclxuaW1wb3J0IGdldFJlc291cmNlIGZyb20gJ2FyZ29zL0kxOG4nO1xyXG5cclxuY29uc3QgcmVzb3VyY2UgPSBnZXRSZXNvdXJjZSgnYWN0aW9uJyk7XHJcbi8qKlxyXG4gKiBAY2xhc3MgY3JtLkFjdGlvblxyXG4gKiBAcmVxdWlyZXMgYXJnb3MuVXRpbGl0eVxyXG4gKi9cclxuY29uc3QgX19jbGFzcyA9IGxhbmcuc2V0T2JqZWN0KCdjcm0uQWN0aW9uJywge1xyXG4gIGNhbGxlZFRleHQ6IHJlc291cmNlLmNhbGxlZFRleHQsXHJcbiAgZW1haWxlZFRleHQ6IHJlc291cmNlLmVtYWlsZWRUZXh0LFxyXG5cclxuICBuYXZpZ2F0ZVRvSGlzdG9yeUluc2VydDogZnVuY3Rpb24gbmF2aWdhdGVUb0hpc3RvcnlJbnNlcnQoZW50cnksIGNvbXBsZXRlLCB0aXRsZSkge1xyXG4gICAgY29uc3QgdmlldyA9IEFwcC5nZXRWaWV3KCdoaXN0b3J5X2VkaXQnKTtcclxuICAgIGlmICh2aWV3KSB7XHJcbiAgICAgIHZpZXcuc2hvdyh7XHJcbiAgICAgICAgdGl0bGUsXHJcbiAgICAgICAgdGVtcGxhdGU6IHt9LFxyXG4gICAgICAgIGVudHJ5LFxyXG4gICAgICAgIGluc2VydDogdHJ1ZSxcclxuICAgICAgfSwge1xyXG4gICAgICAgIGNvbXBsZXRlLFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9LFxyXG4gIHJlY29yZFRvSGlzdG9yeTogZnVuY3Rpb24gcmVjb3JkVG9IaXN0b3J5KGNvbXBsZXRlLCBvLCB0aXRsZSkge1xyXG4gICAgY29uc3QgZW50cnkgPSB7XHJcbiAgICAgIFVzZXJJZDogQXBwLmNvbnRleHQgJiYgQXBwLmNvbnRleHQudXNlci4ka2V5LFxyXG4gICAgICBVc2VyTmFtZTogQXBwLmNvbnRleHQgJiYgQXBwLmNvbnRleHQudXNlci4kZGVzY3JpcHRvcixcclxuICAgICAgRHVyYXRpb246IDE1LFxyXG4gICAgICBDb21wbGV0ZWREYXRlOiAobmV3IERhdGUoKSksXHJcbiAgICB9O1xyXG4gICAgbGFuZy5taXhpbihlbnRyeSwgbyk7XHJcblxyXG4gICAgdGhpcy5uYXZpZ2F0ZVRvSGlzdG9yeUluc2VydChlbnRyeSwgY29tcGxldGUsIHRpdGxlKTtcclxuICB9LFxyXG4gIGNhbGxQaG9uZTogZnVuY3Rpb24gY2FsbFBob25lKGFjdGlvbiwgc2VsZWN0aW9uLCBwaG9uZVByb3BlcnR5LCB0aXRsZSkge1xyXG4gICAgaWYgKCFzZWxlY3Rpb24gfHwgIXNlbGVjdGlvbi5kYXRhKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBsZXQgYWN0aW9uSW5pdGlhdGVkID0gZmFsc2U7XHJcbiAgICB0aGlzLnNldFNvdXJjZSh7XHJcbiAgICAgIGVudHJ5OiBzZWxlY3Rpb24uZGF0YSxcclxuICAgICAgZGVzY3JpcHRvcjogc2VsZWN0aW9uLmRhdGEuJGRlc2NyaXB0b3IsXHJcbiAgICAgIGtleTogc2VsZWN0aW9uLmRhdGEuJGtleSxcclxuICAgIH0pO1xyXG5cclxuICAgIGxhbmcubWl4aW4oc2VsZWN0aW9uLmRhdGEsIHtcclxuICAgICAgVHlwZTogJ2F0UGhvbmVDYWxsJyxcclxuICAgICAgRGVzY3JpcHRpb246IHN0cmluZy5zdWJzdGl0dXRlKGNybS5BY3Rpb24uY2FsbGVkVGV4dCwgW3NlbGVjdGlvbi5kYXRhLiRkZXNjcmlwdG9yXSksXHJcbiAgICB9KTtcclxuXHJcbiAgICBjb25zdCB2YWx1ZSA9IHV0aWxpdHkuZ2V0VmFsdWUoc2VsZWN0aW9uLmRhdGEsIHBob25lUHJvcGVydHksICcnKTtcclxuICAgIGNybS5BY3Rpb24ucmVjb3JkVG9IaXN0b3J5KCgpID0+IHtcclxuICAgICAgaWYgKCFhY3Rpb25Jbml0aWF0ZWQpIHtcclxuICAgICAgICBBcHAuaW5pdGlhdGVDYWxsKHZhbHVlKTtcclxuICAgICAgICBhY3Rpb25Jbml0aWF0ZWQgPSB0cnVlO1xyXG4gICAgICB9XHJcbiAgICB9LCBzZWxlY3Rpb24uZGF0YSwgdGl0bGUpO1xyXG4gIH0sXHJcbiAgc2VuZEVtYWlsOiBmdW5jdGlvbiBzZW5kRW1haWwoYWN0aW9uLCBzZWxlY3Rpb24sIGVtYWlsUHJvcGVydHkpIHtcclxuICAgIGlmICghc2VsZWN0aW9uIHx8ICFzZWxlY3Rpb24uZGF0YSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5zZXRTb3VyY2Uoe1xyXG4gICAgICBlbnRyeTogc2VsZWN0aW9uLmRhdGEsXHJcbiAgICAgIGRlc2NyaXB0b3I6IHNlbGVjdGlvbi5kYXRhLiRkZXNjcmlwdG9yLFxyXG4gICAgICBrZXk6IHNlbGVjdGlvbi5kYXRhLiRrZXksXHJcbiAgICB9KTtcclxuXHJcbiAgICBsYW5nLm1peGluKHNlbGVjdGlvbi5kYXRhLCB7XHJcbiAgICAgIFR5cGU6ICdhdEVtYWlsJyxcclxuICAgICAgRGVzY3JpcHRpb246IHN0cmluZy5zdWJzdGl0dXRlKGNybS5BY3Rpb24uZW1haWxlZFRleHQsIFtzZWxlY3Rpb24uZGF0YS4kZGVzY3JpcHRvcl0pLFxyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc3QgdmFsdWUgPSB1dGlsaXR5LmdldFZhbHVlKHNlbGVjdGlvbi5kYXRhLCBlbWFpbFByb3BlcnR5LCAnJyk7XHJcbiAgICBjcm0uQWN0aW9uLnJlY29yZFRvSGlzdG9yeSgoKSA9PiB7XHJcbiAgICAgIEFwcC5pbml0aWF0ZUVtYWlsKHZhbHVlKTtcclxuICAgIH0sIHNlbGVjdGlvbi5kYXRhKTtcclxuICB9LFxyXG4gIGFkZE5vdGU6IGZ1bmN0aW9uIGFkZE5vdGUoYWN0aW9uLCBzZWxlY3Rpb24pIHtcclxuICAgIGNvbnN0IGVudHJ5ID0gc2VsZWN0aW9uLmRhdGE7XHJcbiAgICBjb25zdCBrZXkgPSBzZWxlY3Rpb24uZGF0YS4ka2V5O1xyXG4gICAgY29uc3QgZGVzYyA9IHNlbGVjdGlvbi5kYXRhLiRkZXNjcmlwdG9yO1xyXG5cclxuICAgIHRoaXMuc2V0U291cmNlKHtcclxuICAgICAgZW50cnksXHJcbiAgICAgIGRlc2NyaXB0b3I6IGRlc2MsXHJcbiAgICAgIGtleSxcclxuICAgIH0pO1xyXG5cclxuICAgIGNvbnN0IHZpZXcgPSBBcHAuZ2V0VmlldygnaGlzdG9yeV9lZGl0Jyk7XHJcblxyXG4gICAgaWYgKHZpZXcpIHtcclxuICAgICAgdmlldy5zaG93KHtcclxuICAgICAgICBpbnNlcnQ6IHRydWUsXHJcbiAgICAgIH0pO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgYWRkQWN0aXZpdHk6IGZ1bmN0aW9uIGFkZEFjdGl2aXR5KGFjdGlvbiwgc2VsZWN0aW9uKSB7XHJcbiAgICB0aGlzLnNldFNvdXJjZSh7XHJcbiAgICAgIGVudHJ5OiBzZWxlY3Rpb24uZGF0YSxcclxuICAgICAgZGVzY3JpcHRvcjogc2VsZWN0aW9uLmRhdGEuJGRlc2NyaXB0b3IsXHJcbiAgICAgIGtleTogc2VsZWN0aW9uLmRhdGEuJGtleSxcclxuICAgIH0pO1xyXG4gICAgQXBwLm5hdmlnYXRlVG9BY3Rpdml0eUluc2VydFZpZXcoKTtcclxuICB9LFxyXG4gIG5hdmlnYXRlVG9FbnRpdHk6IGZ1bmN0aW9uIG5hdmlnYXRlVG9FbnRpdHkoYWN0aW9uLCBzZWxlY3Rpb24sIG8pIHtcclxuICAgIGNvbnN0IG9wdGlvbnMgPSB7XHJcbiAgICAgIGtleTogdXRpbGl0eS5nZXRWYWx1ZShzZWxlY3Rpb24uZGF0YSwgby5rZXlQcm9wZXJ0eSksXHJcbiAgICAgIGRlc2NyaXB0b3I6IHV0aWxpdHkuZ2V0VmFsdWUoc2VsZWN0aW9uLmRhdGEsIG8udGV4dFByb3BlcnR5KSxcclxuICAgIH07XHJcblxyXG4gICAgY29uc3QgdmlldyA9IEFwcC5nZXRWaWV3KG8udmlldyk7XHJcblxyXG4gICAgaWYgKHZpZXcgJiYgb3B0aW9ucy5rZXkpIHtcclxuICAgICAgdmlldy5zaG93KG9wdGlvbnMpO1xyXG4gICAgfVxyXG4gIH0sXHJcbiAgaGFzUHJvcGVydHk6IGZ1bmN0aW9uIGhhc1Byb3BlcnR5KGFjdGlvbiwgc2VsZWN0aW9uLCBwcm9wZXJ0eSkge1xyXG4gICAgcmV0dXJuIHV0aWxpdHkuZ2V0VmFsdWUoc2VsZWN0aW9uLmRhdGEsIHByb3BlcnR5KTtcclxuICB9LFxyXG4gIGFkZEF0dGFjaG1lbnQ6IGZ1bmN0aW9uIGFkZEF0dGFjaG1lbnQoYWN0aW9uLCBzZWxlY3Rpb24pIHtcclxuICAgIHRoaXMuc2V0U291cmNlKHtcclxuICAgICAgZW50cnk6IHNlbGVjdGlvbi5kYXRhLFxyXG4gICAgICBkZXNjcmlwdG9yOiBzZWxlY3Rpb24uZGF0YS4kZGVzY3JpcHRvcixcclxuICAgICAga2V5OiBzZWxlY3Rpb24uZGF0YS4ka2V5LFxyXG4gICAgfSk7XHJcblxyXG4gICAgY29uc3QgdmlldyA9IEFwcC5nZXRWaWV3KCdhdHRhY2htZW50X0FkZCcpO1xyXG5cclxuICAgIGlmICh2aWV3KSB7XHJcbiAgICAgIHZpZXcuc2hvdyh7XHJcbiAgICAgICAgaW5zZXJ0OiB0cnVlLFxyXG4gICAgICB9KTtcclxuICAgIH1cclxuICB9LFxyXG59KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IF9fY2xhc3M7XHJcbiJdfQ==
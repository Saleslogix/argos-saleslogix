define('crm/Models/Authentication/Offline', ['module', 'exports', 'dojo/_base/declare', 'argos/Models/_OfflineModelBase', 'argos/Models/Manager', 'argos/Models/Types', 'dojo/Deferred', 'argos/Convert', 'argos/I18n'], function (module, exports, _declare, _OfflineModelBase2, _Manager, _Types, _Deferred, _Convert, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _OfflineModelBase3 = _interopRequireDefault(_OfflineModelBase2);

  var _Manager2 = _interopRequireDefault(_Manager);

  var _Types2 = _interopRequireDefault(_Types);

  var _Deferred2 = _interopRequireDefault(_Deferred);

  var _Convert2 = _interopRequireDefault(_Convert);

  var _I18n2 = _interopRequireDefault(_I18n);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var resource = (0, _I18n2.default)('autenticationModel'); /* Copyright 2017 Infor
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

  var __class = (0, _declare2.default)('crm.Models.Autentication.Offline', [_OfflineModelBase3.default], {
    id: 'auth_offline_model',
    entityName: 'Authentication',
    modelName: 'Authentication',
    entityDisplayName: resource.entityDisplayName,
    entityDisplayNamePlural: resource.entityDisplayNamePlural,
    isSystem: true,
    createEntry: function createEntity(userId) {
      var entity = {}; // need to dynamicly create Properties;
      entity.$key = 'Auth_00000000000';
      entity.$descriptor = resource.entityDisplayName;
      entity.CreateDate = moment().toDate();
      entity.ModifyDate = moment().toDate();
      entity.UserId = userId;
      return entity;
    },
    initAuthentication: function initAuthentication(userId) {
      var _this = this;

      var def = new _Deferred2.default();
      var result = {
        entry: null,
        hasUserChanged: false,
        hasAuthenticatedToday: false
      };
      this.getEntry('Auth_00000000000').then(function (entry) {
        if (entry) {
          if (entry.UserId === userId) {
            result.hasUserChanged = false;
            result.hasAuthenticatedToday = _this._hasAuthenticatedToday(entry);
          } else {
            result.hasUserChanged = true;
            result.hasAuthenticatedToday = false;
            entry.UserId = userId;
          }
          entry.ModifyDate = moment().toDate();
          result.entry = entry;
        }
        def.resolve(result);
      }, function () {
        var newEntry = _this.createEntry(userId);
        _this.insertEntry(newEntry);
        result.hasUserChanged = true;
        result.hasAuthenticatedToday = false;
        result.entry = newEntry;
        def.resolve(result);
      });
      return def.promise;
    },
    _hasAuthenticatedToday: function _hasAuthenticatedToday(entry) {
      if (entry.ModifyDate) {
        var currentDate = moment();
        var authDate = moment(_Convert2.default.toDateFromString(entry.ModifyDate));
        if (authDate.isAfter(currentDate.startOf('day')) && authDate.isBefore(moment().endOf('day'))) {
          return true;
        }
      }
      return false;
    }
  });

  _Manager2.default.register('Authentication', _Types2.default.OFFLINE, __class);
  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9Nb2RlbHMvQXV0aGVudGljYXRpb24vT2ZmbGluZS5qcyJdLCJuYW1lcyI6WyJyZXNvdXJjZSIsIl9fY2xhc3MiLCJpZCIsImVudGl0eU5hbWUiLCJtb2RlbE5hbWUiLCJlbnRpdHlEaXNwbGF5TmFtZSIsImVudGl0eURpc3BsYXlOYW1lUGx1cmFsIiwiaXNTeXN0ZW0iLCJjcmVhdGVFbnRyeSIsImNyZWF0ZUVudGl0eSIsInVzZXJJZCIsImVudGl0eSIsIiRrZXkiLCIkZGVzY3JpcHRvciIsIkNyZWF0ZURhdGUiLCJtb21lbnQiLCJ0b0RhdGUiLCJNb2RpZnlEYXRlIiwiVXNlcklkIiwiaW5pdEF1dGhlbnRpY2F0aW9uIiwiZGVmIiwicmVzdWx0IiwiZW50cnkiLCJoYXNVc2VyQ2hhbmdlZCIsImhhc0F1dGhlbnRpY2F0ZWRUb2RheSIsImdldEVudHJ5IiwidGhlbiIsIl9oYXNBdXRoZW50aWNhdGVkVG9kYXkiLCJyZXNvbHZlIiwibmV3RW50cnkiLCJpbnNlcnRFbnRyeSIsInByb21pc2UiLCJjdXJyZW50RGF0ZSIsImF1dGhEYXRlIiwidG9EYXRlRnJvbVN0cmluZyIsImlzQWZ0ZXIiLCJzdGFydE9mIiwiaXNCZWZvcmUiLCJlbmRPZiIsInJlZ2lzdGVyIiwiT0ZGTElORSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXdCQSxNQUFNQSxXQUFXLG9CQUFZLG9CQUFaLENBQWpCLEMsQ0F4QkE7Ozs7Ozs7Ozs7Ozs7OztBQTBCQSxNQUFNQyxVQUFVLHVCQUFRLGtDQUFSLEVBQTRDLDRCQUE1QyxFQUFpRTtBQUMvRUMsUUFBSSxvQkFEMkU7QUFFL0VDLGdCQUFZLGdCQUZtRTtBQUcvRUMsZUFBVyxnQkFIb0U7QUFJL0VDLHVCQUFtQkwsU0FBU0ssaUJBSm1EO0FBSy9FQyw2QkFBeUJOLFNBQVNNLHVCQUw2QztBQU0vRUMsY0FBVSxJQU5xRTtBQU8vRUMsaUJBQWEsU0FBU0MsWUFBVCxDQUFzQkMsTUFBdEIsRUFBOEI7QUFDekMsVUFBTUMsU0FBUyxFQUFmLENBRHlDLENBQ3RCO0FBQ25CQSxhQUFPQyxJQUFQLEdBQWMsa0JBQWQ7QUFDQUQsYUFBT0UsV0FBUCxHQUFxQmIsU0FBU0ssaUJBQTlCO0FBQ0FNLGFBQU9HLFVBQVAsR0FBb0JDLFNBQVNDLE1BQVQsRUFBcEI7QUFDQUwsYUFBT00sVUFBUCxHQUFvQkYsU0FBU0MsTUFBVCxFQUFwQjtBQUNBTCxhQUFPTyxNQUFQLEdBQWdCUixNQUFoQjtBQUNBLGFBQU9DLE1BQVA7QUFDRCxLQWY4RTtBQWdCL0VRLHdCQUFvQixTQUFTQSxrQkFBVCxDQUE0QlQsTUFBNUIsRUFBb0M7QUFBQTs7QUFDdEQsVUFBTVUsTUFBTSx3QkFBWjtBQUNBLFVBQU1DLFNBQVM7QUFDYkMsZUFBTyxJQURNO0FBRWJDLHdCQUFnQixLQUZIO0FBR2JDLCtCQUF1QjtBQUhWLE9BQWY7QUFLQSxXQUFLQyxRQUFMLENBQWMsa0JBQWQsRUFBa0NDLElBQWxDLENBQXVDLFVBQUNKLEtBQUQsRUFBVztBQUNoRCxZQUFJQSxLQUFKLEVBQVc7QUFDVCxjQUFJQSxNQUFNSixNQUFOLEtBQWlCUixNQUFyQixFQUE2QjtBQUMzQlcsbUJBQU9FLGNBQVAsR0FBd0IsS0FBeEI7QUFDQUYsbUJBQU9HLHFCQUFQLEdBQStCLE1BQUtHLHNCQUFMLENBQTRCTCxLQUE1QixDQUEvQjtBQUNELFdBSEQsTUFHTztBQUNMRCxtQkFBT0UsY0FBUCxHQUF3QixJQUF4QjtBQUNBRixtQkFBT0cscUJBQVAsR0FBK0IsS0FBL0I7QUFDQUYsa0JBQU1KLE1BQU4sR0FBZVIsTUFBZjtBQUNEO0FBQ0RZLGdCQUFNTCxVQUFOLEdBQW1CRixTQUFTQyxNQUFULEVBQW5CO0FBQ0FLLGlCQUFPQyxLQUFQLEdBQWVBLEtBQWY7QUFDRDtBQUNERixZQUFJUSxPQUFKLENBQVlQLE1BQVo7QUFDRCxPQWRELEVBY0csWUFBTTtBQUNQLFlBQU1RLFdBQVcsTUFBS3JCLFdBQUwsQ0FBaUJFLE1BQWpCLENBQWpCO0FBQ0EsY0FBS29CLFdBQUwsQ0FBaUJELFFBQWpCO0FBQ0FSLGVBQU9FLGNBQVAsR0FBd0IsSUFBeEI7QUFDQUYsZUFBT0cscUJBQVAsR0FBK0IsS0FBL0I7QUFDQUgsZUFBT0MsS0FBUCxHQUFlTyxRQUFmO0FBQ0FULFlBQUlRLE9BQUosQ0FBWVAsTUFBWjtBQUNELE9BckJEO0FBc0JBLGFBQU9ELElBQUlXLE9BQVg7QUFDRCxLQTlDOEU7QUErQy9FSiw0QkFBd0IsU0FBU0Esc0JBQVQsQ0FBZ0NMLEtBQWhDLEVBQXVDO0FBQzdELFVBQUlBLE1BQU1MLFVBQVYsRUFBc0I7QUFDcEIsWUFBTWUsY0FBY2pCLFFBQXBCO0FBQ0EsWUFBTWtCLFdBQVdsQixPQUFPLGtCQUFRbUIsZ0JBQVIsQ0FBeUJaLE1BQU1MLFVBQS9CLENBQVAsQ0FBakI7QUFDQSxZQUFJZ0IsU0FBU0UsT0FBVCxDQUFpQkgsWUFBWUksT0FBWixDQUFvQixLQUFwQixDQUFqQixLQUFnREgsU0FBU0ksUUFBVCxDQUFrQnRCLFNBQVN1QixLQUFULENBQWUsS0FBZixDQUFsQixDQUFwRCxFQUE4RjtBQUM1RixpQkFBTyxJQUFQO0FBQ0Q7QUFDRjtBQUNELGFBQU8sS0FBUDtBQUNEO0FBeEQ4RSxHQUFqRSxDQUFoQjs7QUEyREEsb0JBQVFDLFFBQVIsQ0FBaUIsZ0JBQWpCLEVBQW1DLGdCQUFZQyxPQUEvQyxFQUF3RHZDLE9BQXhEO29CQUNlQSxPIiwiZmlsZSI6Ik9mZmxpbmUuanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IDIwMTcgSW5mb3JcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG5pbXBvcnQgZGVjbGFyZSBmcm9tICdkb2pvL19iYXNlL2RlY2xhcmUnO1xyXG5pbXBvcnQgX09mZmxpbmVNb2RlbEJhc2UgZnJvbSAnYXJnb3MvTW9kZWxzL19PZmZsaW5lTW9kZWxCYXNlJztcclxuaW1wb3J0IE1hbmFnZXIgZnJvbSAnYXJnb3MvTW9kZWxzL01hbmFnZXInO1xyXG5pbXBvcnQgTU9ERUxfVFlQRVMgZnJvbSAnYXJnb3MvTW9kZWxzL1R5cGVzJztcclxuaW1wb3J0IERlZmVycmVkIGZyb20gJ2Rvam8vRGVmZXJyZWQnO1xyXG5pbXBvcnQgY29udmVydCBmcm9tICdhcmdvcy9Db252ZXJ0JztcclxuaW1wb3J0IGdldFJlc291cmNlIGZyb20gJ2FyZ29zL0kxOG4nO1xyXG5cclxuXHJcbmNvbnN0IHJlc291cmNlID0gZ2V0UmVzb3VyY2UoJ2F1dGVudGljYXRpb25Nb2RlbCcpO1xyXG5cclxuY29uc3QgX19jbGFzcyA9IGRlY2xhcmUoJ2NybS5Nb2RlbHMuQXV0ZW50aWNhdGlvbi5PZmZsaW5lJywgW19PZmZsaW5lTW9kZWxCYXNlXSwge1xyXG4gIGlkOiAnYXV0aF9vZmZsaW5lX21vZGVsJyxcclxuICBlbnRpdHlOYW1lOiAnQXV0aGVudGljYXRpb24nLFxyXG4gIG1vZGVsTmFtZTogJ0F1dGhlbnRpY2F0aW9uJyxcclxuICBlbnRpdHlEaXNwbGF5TmFtZTogcmVzb3VyY2UuZW50aXR5RGlzcGxheU5hbWUsXHJcbiAgZW50aXR5RGlzcGxheU5hbWVQbHVyYWw6IHJlc291cmNlLmVudGl0eURpc3BsYXlOYW1lUGx1cmFsLFxyXG4gIGlzU3lzdGVtOiB0cnVlLFxyXG4gIGNyZWF0ZUVudHJ5OiBmdW5jdGlvbiBjcmVhdGVFbnRpdHkodXNlcklkKSB7XHJcbiAgICBjb25zdCBlbnRpdHkgPSB7fTsgLy8gbmVlZCB0byBkeW5hbWljbHkgY3JlYXRlIFByb3BlcnRpZXM7XHJcbiAgICBlbnRpdHkuJGtleSA9ICdBdXRoXzAwMDAwMDAwMDAwJztcclxuICAgIGVudGl0eS4kZGVzY3JpcHRvciA9IHJlc291cmNlLmVudGl0eURpc3BsYXlOYW1lO1xyXG4gICAgZW50aXR5LkNyZWF0ZURhdGUgPSBtb21lbnQoKS50b0RhdGUoKTtcclxuICAgIGVudGl0eS5Nb2RpZnlEYXRlID0gbW9tZW50KCkudG9EYXRlKCk7XHJcbiAgICBlbnRpdHkuVXNlcklkID0gdXNlcklkO1xyXG4gICAgcmV0dXJuIGVudGl0eTtcclxuICB9LFxyXG4gIGluaXRBdXRoZW50aWNhdGlvbjogZnVuY3Rpb24gaW5pdEF1dGhlbnRpY2F0aW9uKHVzZXJJZCkge1xyXG4gICAgY29uc3QgZGVmID0gbmV3IERlZmVycmVkKCk7XHJcbiAgICBjb25zdCByZXN1bHQgPSB7XHJcbiAgICAgIGVudHJ5OiBudWxsLFxyXG4gICAgICBoYXNVc2VyQ2hhbmdlZDogZmFsc2UsXHJcbiAgICAgIGhhc0F1dGhlbnRpY2F0ZWRUb2RheTogZmFsc2UsXHJcbiAgICB9O1xyXG4gICAgdGhpcy5nZXRFbnRyeSgnQXV0aF8wMDAwMDAwMDAwMCcpLnRoZW4oKGVudHJ5KSA9PiB7XHJcbiAgICAgIGlmIChlbnRyeSkge1xyXG4gICAgICAgIGlmIChlbnRyeS5Vc2VySWQgPT09IHVzZXJJZCkge1xyXG4gICAgICAgICAgcmVzdWx0Lmhhc1VzZXJDaGFuZ2VkID0gZmFsc2U7XHJcbiAgICAgICAgICByZXN1bHQuaGFzQXV0aGVudGljYXRlZFRvZGF5ID0gdGhpcy5faGFzQXV0aGVudGljYXRlZFRvZGF5KGVudHJ5KTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgcmVzdWx0Lmhhc1VzZXJDaGFuZ2VkID0gdHJ1ZTtcclxuICAgICAgICAgIHJlc3VsdC5oYXNBdXRoZW50aWNhdGVkVG9kYXkgPSBmYWxzZTtcclxuICAgICAgICAgIGVudHJ5LlVzZXJJZCA9IHVzZXJJZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgZW50cnkuTW9kaWZ5RGF0ZSA9IG1vbWVudCgpLnRvRGF0ZSgpO1xyXG4gICAgICAgIHJlc3VsdC5lbnRyeSA9IGVudHJ5O1xyXG4gICAgICB9XHJcbiAgICAgIGRlZi5yZXNvbHZlKHJlc3VsdCk7XHJcbiAgICB9LCAoKSA9PiB7XHJcbiAgICAgIGNvbnN0IG5ld0VudHJ5ID0gdGhpcy5jcmVhdGVFbnRyeSh1c2VySWQpO1xyXG4gICAgICB0aGlzLmluc2VydEVudHJ5KG5ld0VudHJ5KTtcclxuICAgICAgcmVzdWx0Lmhhc1VzZXJDaGFuZ2VkID0gdHJ1ZTtcclxuICAgICAgcmVzdWx0Lmhhc0F1dGhlbnRpY2F0ZWRUb2RheSA9IGZhbHNlO1xyXG4gICAgICByZXN1bHQuZW50cnkgPSBuZXdFbnRyeTtcclxuICAgICAgZGVmLnJlc29sdmUocmVzdWx0KTtcclxuICAgIH0pO1xyXG4gICAgcmV0dXJuIGRlZi5wcm9taXNlO1xyXG4gIH0sXHJcbiAgX2hhc0F1dGhlbnRpY2F0ZWRUb2RheTogZnVuY3Rpb24gX2hhc0F1dGhlbnRpY2F0ZWRUb2RheShlbnRyeSkge1xyXG4gICAgaWYgKGVudHJ5Lk1vZGlmeURhdGUpIHtcclxuICAgICAgY29uc3QgY3VycmVudERhdGUgPSBtb21lbnQoKTtcclxuICAgICAgY29uc3QgYXV0aERhdGUgPSBtb21lbnQoY29udmVydC50b0RhdGVGcm9tU3RyaW5nKGVudHJ5Lk1vZGlmeURhdGUpKTtcclxuICAgICAgaWYgKGF1dGhEYXRlLmlzQWZ0ZXIoY3VycmVudERhdGUuc3RhcnRPZignZGF5JykpICYmIGF1dGhEYXRlLmlzQmVmb3JlKG1vbWVudCgpLmVuZE9mKCdkYXknKSkpIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG4gIH0sXHJcbn0pO1xyXG5cclxuTWFuYWdlci5yZWdpc3RlcignQXV0aGVudGljYXRpb24nLCBNT0RFTF9UWVBFUy5PRkZMSU5FLCBfX2NsYXNzKTtcclxuZXhwb3J0IGRlZmF1bHQgX19jbGFzcztcclxuIl19
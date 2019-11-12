define('crm/Models/Activity/Offline', ['module', 'exports', 'dojo/_base/declare', './Base', 'argos/Models/_OfflineModelBase', 'argos/Models/Manager', 'argos/Models/Types', '../Names', 'dojo/Deferred'], function (module, exports, _declare, _Base, _OfflineModelBase2, _Manager, _Types, _Names, _Deferred) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _Base2 = _interopRequireDefault(_Base);

  var _OfflineModelBase3 = _interopRequireDefault(_OfflineModelBase2);

  var _Manager2 = _interopRequireDefault(_Manager);

  var _Types2 = _interopRequireDefault(_Types);

  var _Names2 = _interopRequireDefault(_Names);

  var _Deferred2 = _interopRequireDefault(_Deferred);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var __class = (0, _declare2.default)('crm.Models.Activity.Offline', [_Base2.default, _OfflineModelBase3.default], {
    id: 'activity_offline_model',
    onActivityCompleted: function onActivityCompleted(entry) {
      var def = new _Deferred2.default();
      var key = entry.$completedBasedOn ? entry.$completedBasedOn.$key : entry.$key;
      this.deleteEntry(key);
      this.removeFromAuxiliaryEntities(key);
      def.resolve();
      return def.promise;
    },
    onEntryUpdated: function onEntryUpdated(entry, orginalEntry) {
      var def = new _Deferred2.default();

      if (entry && entry.$key && orginalEntry && orginalEntry.$key) {
        if (entry.$key !== orginalEntry.$key) {
          // this happens when occurence is created
          this.deleteEntry(orginalEntry.$key);
          this.removeFromAuxiliaryEntities(orginalEntry.$key);
        }
      }
      def.resolve();
      return def.promise;
    }

  }); /* Copyright 2017 Infor
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

  _Manager2.default.register(_Names2.default.ACTIVITY, _Types2.default.OFFLINE, __class);
  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9Nb2RlbHMvQWN0aXZpdHkvT2ZmbGluZS5qcyJdLCJuYW1lcyI6WyJfX2NsYXNzIiwiaWQiLCJvbkFjdGl2aXR5Q29tcGxldGVkIiwiZW50cnkiLCJkZWYiLCJrZXkiLCIkY29tcGxldGVkQmFzZWRPbiIsIiRrZXkiLCJkZWxldGVFbnRyeSIsInJlbW92ZUZyb21BdXhpbGlhcnlFbnRpdGllcyIsInJlc29sdmUiLCJwcm9taXNlIiwib25FbnRyeVVwZGF0ZWQiLCJvcmdpbmFsRW50cnkiLCJyZWdpc3RlciIsIkFDVElWSVRZIiwiT0ZGTElORSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXVCQSxNQUFNQSxVQUFVLHVCQUFRLDZCQUFSLEVBQXVDLDRDQUF2QyxFQUFrRTtBQUNoRkMsUUFBSSx3QkFENEU7QUFFaEZDLHlCQUFxQixTQUFTQSxtQkFBVCxDQUE2QkMsS0FBN0IsRUFBb0M7QUFDdkQsVUFBTUMsTUFBTSx3QkFBWjtBQUNBLFVBQU1DLE1BQU9GLE1BQU1HLGlCQUFQLEdBQTRCSCxNQUFNRyxpQkFBTixDQUF3QkMsSUFBcEQsR0FBMkRKLE1BQU1JLElBQTdFO0FBQ0EsV0FBS0MsV0FBTCxDQUFpQkgsR0FBakI7QUFDQSxXQUFLSSwyQkFBTCxDQUFpQ0osR0FBakM7QUFDQUQsVUFBSU0sT0FBSjtBQUNBLGFBQU9OLElBQUlPLE9BQVg7QUFDRCxLQVQrRTtBQVVoRkMsb0JBQWdCLFNBQVNBLGNBQVQsQ0FBd0JULEtBQXhCLEVBQStCVSxZQUEvQixFQUE2QztBQUMzRCxVQUFNVCxNQUFNLHdCQUFaOztBQUVBLFVBQUlELFNBQVNBLE1BQU1JLElBQWYsSUFBdUJNLFlBQXZCLElBQXVDQSxhQUFhTixJQUF4RCxFQUE4RDtBQUM1RCxZQUFJSixNQUFNSSxJQUFOLEtBQWVNLGFBQWFOLElBQWhDLEVBQXNDO0FBQUU7QUFDdEMsZUFBS0MsV0FBTCxDQUFpQkssYUFBYU4sSUFBOUI7QUFDQSxlQUFLRSwyQkFBTCxDQUFpQ0ksYUFBYU4sSUFBOUM7QUFDRDtBQUNGO0FBQ0RILFVBQUlNLE9BQUo7QUFDQSxhQUFPTixJQUFJTyxPQUFYO0FBQ0Q7O0FBckIrRSxHQUFsRSxDQUFoQixDLENBdkJBOzs7Ozs7Ozs7Ozs7Ozs7QUFnREEsb0JBQVFHLFFBQVIsQ0FBaUIsZ0JBQVlDLFFBQTdCLEVBQXVDLGdCQUFZQyxPQUFuRCxFQUE0RGhCLE9BQTVEO29CQUNlQSxPIiwiZmlsZSI6Ik9mZmxpbmUuanMiLCJzb3VyY2VSb290Ijoic3JjIiwic291cmNlc0NvbnRlbnQiOlsiLyogQ29weXJpZ2h0IDIwMTcgSW5mb3JcclxuICpcclxuICogTGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCAodGhlIFwiTGljZW5zZVwiKTtcclxuICogeW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxyXG4gKiBZb3UgbWF5IG9idGFpbiBhIGNvcHkgb2YgdGhlIExpY2Vuc2UgYXRcclxuICpcclxuICogICAgaHR0cDovL3d3dy5hcGFjaGUub3JnL2xpY2Vuc2VzL0xJQ0VOU0UtMi4wXHJcbiAqXHJcbiAqIFVubGVzcyByZXF1aXJlZCBieSBhcHBsaWNhYmxlIGxhdyBvciBhZ3JlZWQgdG8gaW4gd3JpdGluZywgc29mdHdhcmVcclxuICogZGlzdHJpYnV0ZWQgdW5kZXIgdGhlIExpY2Vuc2UgaXMgZGlzdHJpYnV0ZWQgb24gYW4gXCJBUyBJU1wiIEJBU0lTLFxyXG4gKiBXSVRIT1VUIFdBUlJBTlRJRVMgT1IgQ09ORElUSU9OUyBPRiBBTlkgS0lORCwgZWl0aGVyIGV4cHJlc3Mgb3IgaW1wbGllZC5cclxuICogU2VlIHRoZSBMaWNlbnNlIGZvciB0aGUgc3BlY2lmaWMgbGFuZ3VhZ2UgZ292ZXJuaW5nIHBlcm1pc3Npb25zIGFuZFxyXG4gKiBsaW1pdGF0aW9ucyB1bmRlciB0aGUgTGljZW5zZS5cclxuICovXHJcblxyXG5pbXBvcnQgZGVjbGFyZSBmcm9tICdkb2pvL19iYXNlL2RlY2xhcmUnO1xyXG5pbXBvcnQgQmFzZSBmcm9tICcuL0Jhc2UnO1xyXG5pbXBvcnQgX09mZmxpbmVNb2RlbEJhc2UgZnJvbSAnYXJnb3MvTW9kZWxzL19PZmZsaW5lTW9kZWxCYXNlJztcclxuaW1wb3J0IE1hbmFnZXIgZnJvbSAnYXJnb3MvTW9kZWxzL01hbmFnZXInO1xyXG5pbXBvcnQgTU9ERUxfVFlQRVMgZnJvbSAnYXJnb3MvTW9kZWxzL1R5cGVzJztcclxuaW1wb3J0IE1PREVMX05BTUVTIGZyb20gJy4uL05hbWVzJztcclxuaW1wb3J0IERlZmVycmVkIGZyb20gJ2Rvam8vRGVmZXJyZWQnO1xyXG5cclxuY29uc3QgX19jbGFzcyA9IGRlY2xhcmUoJ2NybS5Nb2RlbHMuQWN0aXZpdHkuT2ZmbGluZScsIFtCYXNlLCBfT2ZmbGluZU1vZGVsQmFzZV0sIHtcclxuICBpZDogJ2FjdGl2aXR5X29mZmxpbmVfbW9kZWwnLFxyXG4gIG9uQWN0aXZpdHlDb21wbGV0ZWQ6IGZ1bmN0aW9uIG9uQWN0aXZpdHlDb21wbGV0ZWQoZW50cnkpIHtcclxuICAgIGNvbnN0IGRlZiA9IG5ldyBEZWZlcnJlZCgpO1xyXG4gICAgY29uc3Qga2V5ID0gKGVudHJ5LiRjb21wbGV0ZWRCYXNlZE9uKSA/IGVudHJ5LiRjb21wbGV0ZWRCYXNlZE9uLiRrZXkgOiBlbnRyeS4ka2V5O1xyXG4gICAgdGhpcy5kZWxldGVFbnRyeShrZXkpO1xyXG4gICAgdGhpcy5yZW1vdmVGcm9tQXV4aWxpYXJ5RW50aXRpZXMoa2V5KTtcclxuICAgIGRlZi5yZXNvbHZlKCk7XHJcbiAgICByZXR1cm4gZGVmLnByb21pc2U7XHJcbiAgfSxcclxuICBvbkVudHJ5VXBkYXRlZDogZnVuY3Rpb24gb25FbnRyeVVwZGF0ZWQoZW50cnksIG9yZ2luYWxFbnRyeSkge1xyXG4gICAgY29uc3QgZGVmID0gbmV3IERlZmVycmVkKCk7XHJcblxyXG4gICAgaWYgKGVudHJ5ICYmIGVudHJ5LiRrZXkgJiYgb3JnaW5hbEVudHJ5ICYmIG9yZ2luYWxFbnRyeS4ka2V5KSB7XHJcbiAgICAgIGlmIChlbnRyeS4ka2V5ICE9PSBvcmdpbmFsRW50cnkuJGtleSkgeyAvLyB0aGlzIGhhcHBlbnMgd2hlbiBvY2N1cmVuY2UgaXMgY3JlYXRlZFxyXG4gICAgICAgIHRoaXMuZGVsZXRlRW50cnkob3JnaW5hbEVudHJ5LiRrZXkpO1xyXG4gICAgICAgIHRoaXMucmVtb3ZlRnJvbUF1eGlsaWFyeUVudGl0aWVzKG9yZ2luYWxFbnRyeS4ka2V5KTtcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgZGVmLnJlc29sdmUoKTtcclxuICAgIHJldHVybiBkZWYucHJvbWlzZTtcclxuICB9LFxyXG5cclxufSk7XHJcblxyXG5NYW5hZ2VyLnJlZ2lzdGVyKE1PREVMX05BTUVTLkFDVElWSVRZLCBNT0RFTF9UWVBFUy5PRkZMSU5FLCBfX2NsYXNzKTtcclxuZXhwb3J0IGRlZmF1bHQgX19jbGFzcztcclxuIl19
define('crm/Integrations/Contour/ApplicationModule', ['module', 'exports', 'dojo/_base/declare', 'dojo/_base/lang', 'dojo/string', 'argos/Application', 'argos/ApplicationModule', './Views/PxSearch/AccountPxSearch', './Views/PxSearch/LocationPicker', 'argos/I18n', './Models/Place/Offline', './Models/Place/SData'], function (module, exports, _declare, _lang, _string, _Application, _ApplicationModule, _AccountPxSearch, _LocationPicker, _I18n) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _lang2 = _interopRequireDefault(_lang);

  var _string2 = _interopRequireDefault(_string);

  var _Application2 = _interopRequireDefault(_Application);

  var _ApplicationModule2 = _interopRequireDefault(_ApplicationModule);

  var _AccountPxSearch2 = _interopRequireDefault(_AccountPxSearch);

  var _LocationPicker2 = _interopRequireDefault(_LocationPicker);

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

  var resource = (0, _I18n2.default)('proxAppModule');

  var __class = (0, _declare2.default)('crm.Integrations.Contour.ApplicationModule', [_ApplicationModule2.default], {
    // Localization strings
    viewAccountsNearbyText: resource.viewAccountsNearbyText,
    helpTitleText: resource.helpTitleText,

    isIntegrationEnabled: function isIntegrationEnabled() {
      var results = this.application.context.integrations.filter(function (integration) {
        return integration.Name === 'Contour';
      })[0];
      return results && results.Enabled;
    },
    loadViewsDynamic: function loadViews() {
      if (!this.isIntegrationEnabled()) {
        return;
      }

      // Register new proximity search views
      this.registerView(new _AccountPxSearch2.default({
        canRedirectTo: true
      }));
      this.registerView(new _LocationPicker2.default({
        canRedirectTo: true
      }));
    },
    loadCustomizationsDynamic: function loadCustomizations() {
      if (!this.isIntegrationEnabled()) {
        return;
      }

      // We want to add these views to the default set of home screen views.
      // Save the original getDefaultviews() function.
      var originalDefViews = _Application2.default.prototype.getDefaultViews;
      _lang2.default.extend(_Application2.default, {
        getDefaultViews: function getDefaultViews() {
          // Get view array from original function, or default to empty array
          var views = originalDefViews.apply(this, arguments) || [];
          // Add custom view(s)
          views.push('pxSearch_Accounts');
          views.push('pxSearch_locations');
          return views;
        }
      });

      // Add the new help
      var onHelpRowCreated = crm.Views.Help.prototype.onHelpRowCreated;
      this.registerCustomization('detail', 'help', {
        at: function at(row) {
          return row.name === 'HelpSection';
        },
        type: 'insert',
        where: 'after',
        value: {
          title: this.helpTitleText,
          name: 'ContourHelpSection',
          children: [{
            name: 'ContourHelp',
            devRoot: 'argos-contour',
            baseUrl: 'help/locales/contour',
            fileName: 'help.html',
            defaultUrl: 'help/locales/contour/en/help.html',
            onCreate: onHelpRowCreated
          }]
        }
      });

      this.registerAccountMods();
    },
    registerAccountMods: function registerAccountMods() {
      // add the view nearby button
      this.registerCustomization('detail', 'account_detail', {
        at: function at(row) {
          return row.name === 'AddNoteAction';
        },

        type: 'insert',
        value: {
          name: 'ViewNearbyAction',
          property: 'AccountName',
          label: this.viewAccountsNearbyText,
          iconClass: 'spreadsheet',
          action: 'viewNearby'
        }
      });
      // extend the view's class
      _lang2.default.extend(crm.Views.Account.Detail, {
        addressNotGeocodedErrorText: resource.addressNotGeocodedErrorText,
        accountsNearText: resource.accountsNearText,
        querySelect: crm.Views.Account.Detail.prototype.querySelect.concat(['Address/GeocodeFailed', 'Address/GeocodeLatitude', 'Address/GeocodeLongitude', 'Address/GeocodeProvider']),
        viewNearby: function viewNearby() {
          if (this.entry.Address.GeocodeFailed !== null && this.entry.Address.GeocodeFailed === true || this.entry.Address.GeocodeProvider === null || this.entry.Address.GeocodeLatitude === null || this.entry.Address.GeocodeLongitude === null) {
            alert(this.addressNotGeocodedErrorText); // eslint-disable-line
            return;
          }
          var geocode = this.entry.Address;
          var view = App.getView('pxSearch_Accounts');
          view.refreshRequired = true;
          view.lat = geocode.GeocodeLatitude;
          view.lon = geocode.GeocodeLongitude;
          view.show({
            title: _string2.default.substitute(this.accountsNearText, [this.entry.AccountName])
          }, {});
        }
      });
    }
  });

  exports.default = __class;
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9JbnRlZ3JhdGlvbnMvQ29udG91ci9BcHBsaWNhdGlvbk1vZHVsZS5qcyJdLCJuYW1lcyI6WyJyZXNvdXJjZSIsIl9fY2xhc3MiLCJ2aWV3QWNjb3VudHNOZWFyYnlUZXh0IiwiaGVscFRpdGxlVGV4dCIsImlzSW50ZWdyYXRpb25FbmFibGVkIiwicmVzdWx0cyIsImFwcGxpY2F0aW9uIiwiY29udGV4dCIsImludGVncmF0aW9ucyIsImZpbHRlciIsImludGVncmF0aW9uIiwiTmFtZSIsIkVuYWJsZWQiLCJsb2FkVmlld3NEeW5hbWljIiwibG9hZFZpZXdzIiwicmVnaXN0ZXJWaWV3IiwiY2FuUmVkaXJlY3RUbyIsImxvYWRDdXN0b21pemF0aW9uc0R5bmFtaWMiLCJsb2FkQ3VzdG9taXphdGlvbnMiLCJvcmlnaW5hbERlZlZpZXdzIiwicHJvdG90eXBlIiwiZ2V0RGVmYXVsdFZpZXdzIiwiZXh0ZW5kIiwidmlld3MiLCJhcHBseSIsImFyZ3VtZW50cyIsInB1c2giLCJvbkhlbHBSb3dDcmVhdGVkIiwiY3JtIiwiVmlld3MiLCJIZWxwIiwicmVnaXN0ZXJDdXN0b21pemF0aW9uIiwiYXQiLCJyb3ciLCJuYW1lIiwidHlwZSIsIndoZXJlIiwidmFsdWUiLCJ0aXRsZSIsImNoaWxkcmVuIiwiZGV2Um9vdCIsImJhc2VVcmwiLCJmaWxlTmFtZSIsImRlZmF1bHRVcmwiLCJvbkNyZWF0ZSIsInJlZ2lzdGVyQWNjb3VudE1vZHMiLCJwcm9wZXJ0eSIsImxhYmVsIiwiaWNvbkNsYXNzIiwiYWN0aW9uIiwiQWNjb3VudCIsIkRldGFpbCIsImFkZHJlc3NOb3RHZW9jb2RlZEVycm9yVGV4dCIsImFjY291bnRzTmVhclRleHQiLCJxdWVyeVNlbGVjdCIsImNvbmNhdCIsInZpZXdOZWFyYnkiLCJlbnRyeSIsIkFkZHJlc3MiLCJHZW9jb2RlRmFpbGVkIiwiR2VvY29kZVByb3ZpZGVyIiwiR2VvY29kZUxhdGl0dWRlIiwiR2VvY29kZUxvbmdpdHVkZSIsImFsZXJ0IiwiZ2VvY29kZSIsInZpZXciLCJBcHAiLCJnZXRWaWV3IiwicmVmcmVzaFJlcXVpcmVkIiwibGF0IiwibG9uIiwic2hvdyIsInN1YnN0aXR1dGUiLCJBY2NvdW50TmFtZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7Ozs7Ozs7Ozs7Ozs7OztBQTBCQSxNQUFNQSxXQUFXLG9CQUFZLGVBQVosQ0FBakI7O0FBRUEsTUFBTUMsVUFBVSx1QkFBUSw0Q0FBUixFQUFzRCw2QkFBdEQsRUFBMkU7QUFDekY7QUFDQUMsNEJBQXdCRixTQUFTRSxzQkFGd0Q7QUFHekZDLG1CQUFlSCxTQUFTRyxhQUhpRTs7QUFLekZDLDBCQUFzQixTQUFTQSxvQkFBVCxHQUFnQztBQUNwRCxVQUFNQyxVQUFVLEtBQUtDLFdBQUwsQ0FBaUJDLE9BQWpCLENBQXlCQyxZQUF6QixDQUFzQ0MsTUFBdEMsQ0FBNkM7QUFBQSxlQUFlQyxZQUFZQyxJQUFaLEtBQXFCLFNBQXBDO0FBQUEsT0FBN0MsRUFBNEYsQ0FBNUYsQ0FBaEI7QUFDQSxhQUFPTixXQUFXQSxRQUFRTyxPQUExQjtBQUNELEtBUndGO0FBU3pGQyxzQkFBa0IsU0FBU0MsU0FBVCxHQUFxQjtBQUNyQyxVQUFJLENBQUMsS0FBS1Ysb0JBQUwsRUFBTCxFQUFrQztBQUNoQztBQUNEOztBQUVEO0FBQ0EsV0FBS1csWUFBTCxDQUFrQiw4QkFBb0I7QUFDcENDLHVCQUFlO0FBRHFCLE9BQXBCLENBQWxCO0FBR0EsV0FBS0QsWUFBTCxDQUFrQiw2QkFBbUI7QUFDbkNDLHVCQUFlO0FBRG9CLE9BQW5CLENBQWxCO0FBR0QsS0FyQndGO0FBc0J6RkMsK0JBQTJCLFNBQVNDLGtCQUFULEdBQThCO0FBQ3ZELFVBQUksQ0FBQyxLQUFLZCxvQkFBTCxFQUFMLEVBQWtDO0FBQ2hDO0FBQ0Q7O0FBRUQ7QUFDQTtBQUNBLFVBQU1lLG1CQUFtQixzQkFBWUMsU0FBWixDQUFzQkMsZUFBL0M7QUFDQSxxQkFBS0MsTUFBTCx3QkFBeUI7QUFD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QUFQLENBQWtCLEtBQUtuQixnQkFBdkIsRUFBeUMsQ0FBQyxLQUFLSSxLQUFMLENBQVdnQixXQUFaLENBQXpDO0FBREMsV0FBVixFQUVHLEVBRkg7QUFHRDtBQXpCbUMsT0FBdEM7QUEyQkQ7QUE1R3dGLEdBQTNFLENBQWhCOztvQkErR2V4RSxPIiwiZmlsZSI6IkFwcGxpY2F0aW9uTW9kdWxlLmpzIiwic291cmNlUm9vdCI6InNyYyIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvcHlyaWdodCAyMDE3IEluZm9yXHJcbiAqXHJcbiAqIExpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAgKHRoZSBcIkxpY2Vuc2VcIik7XHJcbiAqIHlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cclxuICogWW91IG1heSBvYnRhaW4gYSBjb3B5IG9mIHRoZSBMaWNlbnNlIGF0XHJcbiAqXHJcbiAqICAgIGh0dHA6Ly93d3cuYXBhY2hlLm9yZy9saWNlbnNlcy9MSUNFTlNFLTIuMFxyXG4gKlxyXG4gKiBVbmxlc3MgcmVxdWlyZWQgYnkgYXBwbGljYWJsZSBsYXcgb3IgYWdyZWVkIHRvIGluIHdyaXRpbmcsIHNvZnR3YXJlXHJcbiAqIGRpc3RyaWJ1dGVkIHVuZGVyIHRoZSBMaWNlbnNlIGlzIGRpc3RyaWJ1dGVkIG9uIGFuIFwiQVMgSVNcIiBCQVNJUyxcclxuICogV0lUSE9VVCBXQVJSQU5USUVTIE9SIENPTkRJVElPTlMgT0YgQU5ZIEtJTkQsIGVpdGhlciBleHByZXNzIG9yIGltcGxpZWQuXHJcbiAqIFNlZSB0aGUgTGljZW5zZSBmb3IgdGhlIHNwZWNpZmljIGxhbmd1YWdlIGdvdmVybmluZyBwZXJtaXNzaW9ucyBhbmRcclxuICogbGltaXRhdGlvbnMgdW5kZXIgdGhlIExpY2Vuc2UuXHJcbiAqL1xyXG5cclxuaW1wb3J0IGRlY2xhcmUgZnJvbSAnZG9qby9fYmFzZS9kZWNsYXJlJztcclxuaW1wb3J0IGxhbmcgZnJvbSAnZG9qby9fYmFzZS9sYW5nJztcclxuaW1wb3J0IHN0cmluZyBmcm9tICdkb2pvL3N0cmluZyc7XHJcbmltcG9ydCBBcHBsaWNhdGlvbiBmcm9tICdhcmdvcy9BcHBsaWNhdGlvbic7XHJcbmltcG9ydCBBcHBsaWNhdGlvbk1vZHVsZSBmcm9tICdhcmdvcy9BcHBsaWNhdGlvbk1vZHVsZSc7XHJcbmltcG9ydCBBY2NvdW50UHhTZWFyY2ggZnJvbSAnLi9WaWV3cy9QeFNlYXJjaC9BY2NvdW50UHhTZWFyY2gnO1xyXG5pbXBvcnQgTG9jYXRpb25QaWNrZXIgZnJvbSAnLi9WaWV3cy9QeFNlYXJjaC9Mb2NhdGlvblBpY2tlcic7XHJcbmltcG9ydCBnZXRSZXNvdXJjZSBmcm9tICdhcmdvcy9JMThuJztcclxuaW1wb3J0ICcuL01vZGVscy9QbGFjZS9PZmZsaW5lJztcclxuaW1wb3J0ICcuL01vZGVscy9QbGFjZS9TRGF0YSc7XHJcblxyXG5jb25zdCByZXNvdXJjZSA9IGdldFJlc291cmNlKCdwcm94QXBwTW9kdWxlJyk7XHJcblxyXG5jb25zdCBfX2NsYXNzID0gZGVjbGFyZSgnY3JtLkludGVncmF0aW9ucy5Db250b3VyLkFwcGxpY2F0aW9uTW9kdWxlJywgW0FwcGxpY2F0aW9uTW9kdWxlXSwge1xyXG4gIC8vIExvY2FsaXphdGlvbiBzdHJpbmdzXHJcbiAgdmlld0FjY291bnRzTmVhcmJ5VGV4dDogcmVzb3VyY2Uudmlld0FjY291bnRzTmVhcmJ5VGV4dCxcclxuICBoZWxwVGl0bGVUZXh0OiByZXNvdXJjZS5oZWxwVGl0bGVUZXh0LFxyXG5cclxuICBpc0ludGVncmF0aW9uRW5hYmxlZDogZnVuY3Rpb24gaXNJbnRlZ3JhdGlvbkVuYWJsZWQoKSB7XHJcbiAgICBjb25zdCByZXN1bHRzID0gdGhpcy5hcHBsaWNhdGlvbi5jb250ZXh0LmludGVncmF0aW9ucy5maWx0ZXIoaW50ZWdyYXRpb24gPT4gaW50ZWdyYXRpb24uTmFtZSA9PT0gJ0NvbnRvdXInKVswXTtcclxuICAgIHJldHVybiByZXN1bHRzICYmIHJlc3VsdHMuRW5hYmxlZDtcclxuICB9LFxyXG4gIGxvYWRWaWV3c0R5bmFtaWM6IGZ1bmN0aW9uIGxvYWRWaWV3cygpIHtcclxuICAgIGlmICghdGhpcy5pc0ludGVncmF0aW9uRW5hYmxlZCgpKSB7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICAvLyBSZWdpc3RlciBuZXcgcHJveGltaXR5IHNlYXJjaCB2aWV3c1xyXG4gICAgdGhpcy5yZWdpc3RlclZpZXcobmV3IEFjY291bnRQeFNlYXJjaCh7XHJcbiAgICAgIGNhblJlZGlyZWN0VG86IHRydWUsXHJcbiAgICB9KSk7XHJcbiAgICB0aGlzLnJlZ2lzdGVyVmlldyhuZXcgTG9jYXRpb25QaWNrZXIoe1xyXG4gICAgICBjYW5SZWRpcmVjdFRvOiB0cnVlLFxyXG4gICAgfSkpO1xyXG4gIH0sXHJcbiAgbG9hZEN1c3RvbWl6YXRpb25zRHluYW1pYzogZnVuY3Rpb24gbG9hZEN1c3RvbWl6YXRpb25zKCkge1xyXG4gICAgaWYgKCF0aGlzLmlzSW50ZWdyYXRpb25FbmFibGVkKCkpIHtcclxuICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFdlIHdhbnQgdG8gYWRkIHRoZXNlIHZpZXdzIHRvIHRoZSBkZWZhdWx0IHNldCBvZiBob21lIHNjcmVlbiB2aWV3cy5cclxuICAgIC8vIFNhdmUgdGhlIG9yaWdpbmFsIGdldERlZmF1bHR2aWV3cygpIGZ1bmN0aW9uLlxyXG4gICAgY29uc3Qgb3JpZ2luYWxEZWZWaWV3cyA9IEFwcGxpY2F0aW9uLnByb3RvdHlwZS5nZXREZWZhdWx0Vmlld3M7XHJcbiAgICBsYW5nLmV4dGVuZChBcHBsaWNhdGlvbiwge1xyXG4gICAgICBnZXREZWZhdWx0Vmlld3MoKSB7XHJcbiAgICAgICAgLy8gR2V0IHZpZXcgYXJyYXkgZnJvbSBvcmlnaW5hbCBmdW5jdGlvbiwgb3IgZGVmYXVsdCB0byBlbXB0eSBhcnJheVxyXG4gICAgICAgIGNvbnN0IHZpZXdzID0gb3JpZ2luYWxEZWZWaWV3cy5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IFtdO1xyXG4gICAgICAgIC8vIEFkZCBjdXN0b20gdmlldyhzKVxyXG4gICAgICAgIHZpZXdzLnB1c2goJ3B4U2VhcmNoX0FjY291bnRzJyk7XHJcbiAgICAgICAgdmlld3MucHVzaCgncHhTZWFyY2hfbG9jYXRpb25zJyk7XHJcbiAgICAgICAgcmV0dXJuIHZpZXdzO1xyXG4gICAgICB9LFxyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gQWRkIHRoZSBuZXcgaGVscFxyXG4gICAgY29uc3Qgb25IZWxwUm93Q3JlYXRlZCA9IGNybS5WaWV3cy5IZWxwLnByb3RvdHlwZS5vbkhlbHBSb3dDcmVhdGVkO1xyXG4gICAgdGhpcy5yZWdpc3RlckN1c3RvbWl6YXRpb24oJ2RldGFpbCcsICdoZWxwJywge1xyXG4gICAgICBhdDogKHJvdykgPT4ge1xyXG4gICAgICAgIHJldHVybiByb3cubmFtZSA9PT0gJ0hlbHBTZWN0aW9uJztcclxuICAgICAgfSxcclxuICAgICAgdHlwZTogJ2luc2VydCcsXHJcbiAgICAgIHdoZXJlOiAnYWZ0ZXInLFxyXG4gICAgICB2YWx1ZToge1xyXG4gICAgICAgIHRpdGxlOiB0aGlzLmhlbHBUaXRsZVRleHQsXHJcbiAgICAgICAgbmFtZTogJ0NvbnRvdXJIZWxwU2VjdGlvbicsXHJcbiAgICAgICAgY2hpbGRyZW46IFt7XHJcbiAgICAgICAgICBuYW1lOiAnQ29udG91ckhlbHAnLFxyXG4gICAgICAgICAgZGV2Um9vdDogJ2FyZ29zLWNvbnRvdXInLFxyXG4gICAgICAgICAgYmFzZVVybDogJ2hlbHAvbG9jYWxlcy9jb250b3VyJyxcclxuICAgICAgICAgIGZpbGVOYW1lOiAnaGVscC5odG1sJyxcclxuICAgICAgICAgIGRlZmF1bHRVcmw6ICdoZWxwL2xvY2FsZXMvY29udG91ci9lbi9oZWxwLmh0bWwnLFxyXG4gICAgICAgICAgb25DcmVhdGU6IG9uSGVscFJvd0NyZWF0ZWQsXHJcbiAgICAgICAgfV0sXHJcbiAgICAgIH0sXHJcbiAgICB9KTtcclxuXHJcbiAgICB0aGlzLnJlZ2lzdGVyQWNjb3VudE1vZHMoKTtcclxuICB9LFxyXG4gIHJlZ2lzdGVyQWNjb3VudE1vZHMoKSB7XHJcbiAgICAvLyBhZGQgdGhlIHZpZXcgbmVhcmJ5IGJ1dHRvblxyXG4gICAgdGhpcy5yZWdpc3RlckN1c3RvbWl6YXRpb24oJ2RldGFpbCcsICdhY2NvdW50X2RldGFpbCcsIHtcclxuICAgICAgYXQocm93KSB7XHJcbiAgICAgICAgcmV0dXJuIHJvdy5uYW1lID09PSAnQWRkTm90ZUFjdGlvbic7XHJcbiAgICAgIH0sXHJcbiAgICAgIHR5cGU6ICdpbnNlcnQnLFxyXG4gICAgICB2YWx1ZToge1xyXG4gICAgICAgIG5hbWU6ICdWaWV3TmVhcmJ5QWN0aW9uJyxcclxuICAgICAgICBwcm9wZXJ0eTogJ0FjY291bnROYW1lJyxcclxuICAgICAgICBsYWJlbDogdGhpcy52aWV3QWNjb3VudHNOZWFyYnlUZXh0LFxyXG4gICAgICAgIGljb25DbGFzczogJ3NwcmVhZHNoZWV0JyxcclxuICAgICAgICBhY3Rpb246ICd2aWV3TmVhcmJ5JyxcclxuICAgICAgfSxcclxuICAgIH0pO1xyXG4gICAgLy8gZXh0ZW5kIHRoZSB2aWV3J3MgY2xhc3NcclxuICAgIGxhbmcuZXh0ZW5kKGNybS5WaWV3cy5BY2NvdW50LkRldGFpbCwge1xyXG4gICAgICBhZGRyZXNzTm90R2VvY29kZWRFcnJvclRleHQ6IHJlc291cmNlLmFkZHJlc3NOb3RHZW9jb2RlZEVycm9yVGV4dCxcclxuICAgICAgYWNjb3VudHNOZWFyVGV4dDogcmVzb3VyY2UuYWNjb3VudHNOZWFyVGV4dCxcclxuICAgICAgcXVlcnlTZWxlY3Q6IGNybS5WaWV3cy5BY2NvdW50LkRldGFpbC5wcm90b3R5cGUucXVlcnlTZWxlY3QuY29uY2F0KFtcclxuICAgICAgICAnQWRkcmVzcy9HZW9jb2RlRmFpbGVkJyxcclxuICAgICAgICAnQWRkcmVzcy9HZW9jb2RlTGF0aXR1ZGUnLFxyXG4gICAgICAgICdBZGRyZXNzL0dlb2NvZGVMb25naXR1ZGUnLFxyXG4gICAgICAgICdBZGRyZXNzL0dlb2NvZGVQcm92aWRlcicsXHJcbiAgICAgIF0pLFxyXG4gICAgICB2aWV3TmVhcmJ5KCkge1xyXG4gICAgICAgIGlmICgodGhpcy5lbnRyeS5BZGRyZXNzLkdlb2NvZGVGYWlsZWQgIT09IG51bGwgJiYgdGhpcy5lbnRyeS5BZGRyZXNzLkdlb2NvZGVGYWlsZWQgPT09IHRydWUpIHx8XHJcbiAgICAgICAgICB0aGlzLmVudHJ5LkFkZHJlc3MuR2VvY29kZVByb3ZpZGVyID09PSBudWxsIHx8XHJcbiAgICAgICAgICB0aGlzLmVudHJ5LkFkZHJlc3MuR2VvY29kZUxhdGl0dWRlID09PSBudWxsIHx8XHJcbiAgICAgICAgICB0aGlzLmVudHJ5LkFkZHJlc3MuR2VvY29kZUxvbmdpdHVkZSA9PT0gbnVsbCkge1xyXG4gICAgICAgICAgYWxlcnQodGhpcy5hZGRyZXNzTm90R2VvY29kZWRFcnJvclRleHQpOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXHJcbiAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvbnN0IGdlb2NvZGUgPSB0aGlzLmVudHJ5LkFkZHJlc3M7XHJcbiAgICAgICAgY29uc3QgdmlldyA9IEFwcC5nZXRWaWV3KCdweFNlYXJjaF9BY2NvdW50cycpO1xyXG4gICAgICAgIHZpZXcucmVmcmVzaFJlcXVpcmVkID0gdHJ1ZTtcclxuICAgICAgICB2aWV3LmxhdCA9IGdlb2NvZGUuR2VvY29kZUxhdGl0dWRlO1xyXG4gICAgICAgIHZpZXcubG9uID0gZ2VvY29kZS5HZW9jb2RlTG9uZ2l0dWRlO1xyXG4gICAgICAgIHZpZXcuc2hvdyh7XHJcbiAgICAgICAgICB0aXRsZTogc3RyaW5nLnN1YnN0aXR1dGUodGhpcy5hY2NvdW50c05lYXJUZXh0LCBbdGhpcy5lbnRyeS5BY2NvdW50TmFtZV0pLFxyXG4gICAgICAgIH0sIHt9KTtcclxuICAgICAgfSxcclxuICAgIH0pO1xyXG4gIH0sXHJcbn0pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgX19jbGFzcztcclxuIl19
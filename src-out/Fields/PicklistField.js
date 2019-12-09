define('crm/Fields/PicklistField', ['module', 'exports', 'dojo/_base/declare', 'argos/Fields/LookupField', '../Views/PickList', 'argos/FieldManager'], function (module, exports, _declare, _LookupField, _PickList, _FieldManager) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _declare2 = _interopRequireDefault(_declare);

  var _LookupField2 = _interopRequireDefault(_LookupField);

  var _PickList2 = _interopRequireDefault(_PickList);

  var _FieldManager2 = _interopRequireDefault(_FieldManager);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  var viewsByName = {};
  var viewsByNameCount = 0;

  var getOrCreateViewFor = function getOrCreateViewFor(name) {
    if (viewsByName[name]) {
      return viewsByName[name];
    }

    var view = new _PickList2.default({
      id: 'pick_list_' + viewsByNameCount++,
      expose: false,
      picklistName: name
    });

    App.registerView(view);
    viewsByName[name] = view;

    return App.getView(view.id);
  };

  var control = (0, _declare2.default)('crm.Fields.PicklistField', [_LookupField2.default], {
    picklist: false,
    picklistName: false,
    picklistOptions: null,
    languageCode: null,
    languageCodeProperty: null,
    storageMode: 'text',
    requireSelection: false,
    valueKeyProperty: false,
    valueTextProperty: false,
    iconClass: 'more',

    constructor: function constructor(options) {
      switch (this.storageMode) {
        case 'text':
          this.keyProperty = 'text';
          this.textProperty = 'text';
          break;
        case 'code':
          this.keyProperty = 'code';
          this.textProperty = 'text';
          this.requireSelection = typeof options.requireSelection !== 'undefined' ? options.requireSelection : true;
          break;
        case 'id':
          this.keyProperty = '$key';
          this.textProperty = 'text';
          this.requireSelection = typeof options.requireSelection !== 'undefined' ? options.requireSelection : true;
          break;
        default:
          this.keyProperty = 'text';
          this.textProperty = 'text';
      }
    },
    isReadOnly: function isReadOnly() {
      return !this.picklist;
    },
    isCodePicklist: function isCodePicklist() {
      // Name Prefix and Suffix are both text picklists that have code like functionality
      if (this.picklistName === 'Name Prefix' || this.picklistName === 'Name Suffix') {
        return false;
      }
      // Current flag for checking whether the picklist is a code picklist server side is the default language
      var picklist = App.picklistService.getPicklistByName(this.picklistName, this.languageCode);
      return picklist && picklist.defaultLanguage;
    },
    formatResourcePredicate: function formatResourcePredicate(name) {
      return 'name eq "' + name + '"';
    },
    _handleSaleslogixMultiSelectPicklist: function _handleSaleslogixMultiSelectPicklist(value, unloadedValues) {
      if (typeof value === 'string') {
        return value;
      }

      var values = [];
      for (var key in value) {
        if (value.hasOwnProperty(key)) {
          var data = value[key].data;
          if (data && data.text) {
            values.push(data.text);
          } else if (typeof data === 'string') {
            values.push(data);
          }
        }
      }

      if (Array.isArray(unloadedValues)) {
        values = values.concat(unloadedValues);
      }

      return values.join(', ');
    },
    textRenderer: function textRenderer(value, unloadedValues) {
      var results = void 0;

      if (this.singleSelect) {
        if (typeof value === 'string' || typeof value === 'number') {
          results = value;
        } else {
          results = value[this.textProperty];
        }
      } else {
        results = this._handleSaleslogixMultiSelectPicklist(value, unloadedValues);
      }

      return results;
    },
    formatValue: function formatValue(value) {
      var results = void 0;
      if (this.singleSelect) {
        results = this.inherited(formatValue, arguments);
      } else {
        results = this._handleSaleslogixMultiSelectPicklist(value);
      }

      return results || value;
    },
    getLanguageCode: function getLanguageCode() {
      if (this.languageCodeProperty) {
        return this.owner && this.owner.entry && this.owner.entry[this.languageCodeProperty] && this.owner.entry[this.languageCodeProperty].trim();
      }
      return this.languageCode || App.getCurrentLocale();
    },
    setValue: function setValue(val) {
      // eslint-disable-line
      if (this.singleSelect) {
        if (val && !this.picklistName) {
          this.picklistName = this.picklist;
          if (typeof this.picklistName === 'function') {
            var dependent = this.getDependentValue();
            if ((typeof dependent === 'undefined' ? 'undefined' : _typeof(dependent)) === 'object') {
              dependent = dependent.code;
            }
            this.picklistName = this.dependsOn // only pass dependentValue if there is a dependency
            ? this.expandExpression(this.picklist, dependent) : this.expandExpression(this.picklist);
          }
        }
        var picklistItem = false;
        this.languageCode = this.getLanguageCode();
        if (this.storageMode === 'text') {
          picklistItem = this.app.picklistService.getPicklistItemTextByCode(this.picklistName, val, this.languageCode);
        } else if (this.storageMode !== 'id') {
          picklistItem = this.app.picklistService.getPicklistItemByCode(this.picklistName, val, this.languageCode);
        } else {
          // Special case of item being stored by $key...
          picklistItem = this.app.picklistService.getPicklistItemByKey(this.picklistName, val, this.languageCode);
        }
        if (picklistItem) {
          val = picklistItem;
          if (this.storageMode !== 'id' && this.storageMode !== 'text') {
            this.keyProperty = 'code';
          }
          this.textProperty = 'text';
        }
      }
      this.inherited(setValue, arguments);
    },
    createSelections: function createSelections() {
      var value = this.getText();
      var selections = [];
      if (value) {
        if (value.indexOf(', ') !== -1) {
          selections = value.split(', ');
        } else {
          selections.push(value);
        }
      }
      return selections;
    },
    createNavigationOptions: function createNavigationOptions() {
      var options = this.inherited(createNavigationOptions, arguments);

      if (this.picklist) {
        this.picklistName = this.picklist;
        if (typeof this.picklistName === 'function') {
          this.picklistName = this.dependsOn // only pass dependentValue if there is a dependency
          ? this.expandExpression(this.picklist, options.dependentValue.code || options.dependentValue) : this.expandExpression(this.picklist);
        }
        options.resourcePredicate = this.formatResourcePredicate(this.picklistName);
        options.singleSelect = this.singleSelect;
        options.previousSelections = !this.singleSelect ? this.createSelections() : null;
        options.keyProperty = this.keyProperty;
        options.textProperty = this.textProperty;
        options.picklistOptions = this.picklistOptions && this.picklistOptions(this.owner && this.owner.entry || {}) || {};

        if (this.picklistName !== 'Name Prefix' && this.picklistName !== 'Name Suffix') {
          // Default to current locale IF not name prefix and suffix picklists (these are filtered text picklists)
          this.languageCode = App.getCurrentLocale();
        }
        options.languageCode = this.languageCode;
      }

      if (!this.singleSelect) {
        options.tools = {
          tbar: [{
            id: 'cancel',
            title: this.cancelText,
            svg: 'cancel',
            side: 'left',
            fn: ReUI.back,
            scope: ReUI
          }, {
            id: 'complete',
            title: this.completeText,
            svg: 'check',
            fn: this.complete,
            scope: this
          }]
        };
      }

      return options;
    },
    navigateToListView: function navigateToListView() {
      if (this.isDisabled()) {
        return;
      }

      var options = this.createNavigationOptions();
      if (this.isCodePicklist()) {
        this.keyProperty = 'code';
      }
      var view = App.getView(this.view) || getOrCreateViewFor(this.picklistName, this.languageCode);

      if (view && options) {
        view.refreshRequired = true;
        view.show(options);
      }
    }
  });

  exports.default = _FieldManager2.default.register('picklist', control);
  module.exports = exports['default'];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9GaWVsZHMvUGlja2xpc3RGaWVsZC5qcyJdLCJuYW1lcyI6WyJ2aWV3c0J5TmFtZSIsInZpZXdzQnlOYW1lQ291bnQiLCJnZXRPckNyZWF0ZVZpZXdGb3IiLCJuYW1lIiwidmlldyIsImlkIiwiZXhwb3NlIiwicGlja2xpc3ROYW1lIiwiQXBwIiwicmVnaXN0ZXJWaWV3IiwiZ2V0VmlldyIsImNvbnRyb2wiLCJwaWNrbGlzdCIsInBpY2tsaXN0T3B0aW9ucyIsImxhbmd1YWdlQ29kZSIsImxhbmd1YWdlQ29kZVByb3BlcnR5Iiwic3RvcmFnZU1vZGUiLCJyZXF1aXJlU2VsZWN0aW9uIiwidmFsdWVLZXlQcm9wZXJ0eSIsInZhbHVlVGV4dFByb3BlcnR5IiwiaWNvbkNsYXNzIiwiY29uc3RydWN0b3IiLCJvcHRpb25zIiwia2V5UHJvcGVydHkiLCJ0ZXh0UHJvcGVydHkiLCJpc1JlYWRPbmx5IiwiaXNDb2RlUGlja2xpc3QiLCJwaWNrbGlzdFNlcnZpY2UiLCJnZXRQaWNrbGlzdEJ5TmFtZSIsImRlZmF1bHRMYW5ndWFnZSIsImZvcm1hdFJlc291cmNlUHJlZGljYXRlIiwiX2hhbmRsZVNhbGVzbG9naXhNdWx0aVNlbGVjdFBpY2tsaXN0IiwidmFsdWUiLCJ1bmxvYWRlZFZhbHVlcyIsInZhbHVlcyIsImtleSIsImhhc093blByb3BlcnR5IiwiZGF0YSIsInRleHQiLCJwdXNoIiwiQXJyYXkiLCJpc0FycmF5IiwiY29uY2F0Iiwiam9pbiIsInRleHRSZW5kZXJlciIsInJlc3VsdHMiLCJzaW5nbGVTZWxlY3QiLCJmb3JtYXRWYWx1ZSIsImluaGVyaXRlZCIsImFyZ3VtZW50cyIsImdldExhbmd1YWdlQ29kZSIsIm93bmVyIiwiZW50cnkiLCJ0cmltIiwiZ2V0Q3VycmVudExvY2FsZSIsInNldFZhbHVlIiwidmFsIiwiZGVwZW5kZW50IiwiZ2V0RGVwZW5kZW50VmFsdWUiLCJjb2RlIiwiZGVwZW5kc09uIiwiZXhwYW5kRXhwcmVzc2lvbiIsInBpY2tsaXN0SXRlbSIsImFwcCIsImdldFBpY2tsaXN0SXRlbVRleHRCeUNvZGUiLCJnZXRQaWNrbGlzdEl0ZW1CeUNvZGUiLCJnZXRQaWNrbGlzdEl0ZW1CeUtleSIsImNyZWF0ZVNlbGVjdGlvbnMiLCJnZXRUZXh0Iiwic2VsZWN0aW9ucyIsImluZGV4T2YiLCJzcGxpdCIsImNyZWF0ZU5hdmlnYXRpb25PcHRpb25zIiwiZGVwZW5kZW50VmFsdWUiLCJyZXNvdXJjZVByZWRpY2F0ZSIsInByZXZpb3VzU2VsZWN0aW9ucyIsInRvb2xzIiwidGJhciIsInRpdGxlIiwiY2FuY2VsVGV4dCIsInN2ZyIsInNpZGUiLCJmbiIsIlJlVUkiLCJiYWNrIiwic2NvcGUiLCJjb21wbGV0ZVRleHQiLCJjb21wbGV0ZSIsIm5hdmlnYXRlVG9MaXN0VmlldyIsImlzRGlzYWJsZWQiLCJyZWZyZXNoUmVxdWlyZWQiLCJzaG93IiwicmVnaXN0ZXIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFtQkEsTUFBTUEsY0FBYyxFQUFwQjtBQUNBLE1BQUlDLG1CQUFtQixDQUF2Qjs7QUFFQSxNQUFNQyxxQkFBcUIsU0FBU0Esa0JBQVQsQ0FBNEJDLElBQTVCLEVBQWtDO0FBQzNELFFBQUlILFlBQVlHLElBQVosQ0FBSixFQUF1QjtBQUNyQixhQUFPSCxZQUFZRyxJQUFaLENBQVA7QUFDRDs7QUFFRCxRQUFNQyxPQUFPLHVCQUFhO0FBQ3hCQyx5QkFBaUJKLGtCQURPO0FBRXhCSyxjQUFRLEtBRmdCO0FBR3hCQyxvQkFBY0o7QUFIVSxLQUFiLENBQWI7O0FBTUFLLFFBQUlDLFlBQUosQ0FBaUJMLElBQWpCO0FBQ0FKLGdCQUFZRyxJQUFaLElBQW9CQyxJQUFwQjs7QUFFQSxXQUFPSSxJQUFJRSxPQUFKLENBQVlOLEtBQUtDLEVBQWpCLENBQVA7QUFDRCxHQWZEOztBQWlCQSxNQUFNTSxVQUFVLHVCQUFRLDBCQUFSLEVBQW9DLHVCQUFwQyxFQUFtRDtBQUNqRUMsY0FBVSxLQUR1RDtBQUVqRUwsa0JB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K0xqRWtFLHdCQUFvQixTQUFTQSxrQkFBVCxHQUE4QjtBQUNoRCxVQUFJLEtBQUtDLFVBQUwsRUFBSixFQUF1QjtBQUNyQjtBQUNEOztBQUVELFVBQU1uRSxVQUFVLEtBQUtrRCx1QkFBTCxFQUFoQjtBQUNBLFVBQUksS0FBSzlDLGNBQUwsRUFBSixFQUEyQjtBQUN6QixhQUFLSCxXQUFMLEdBQW1CLE1BQW5CO0FBQ0Q7QUFDRCxVQUFNbkIsT0FBT0ksSUFBSUUsT0FBSixDQUFZLEtBQUtOLElBQWpCLEtBQTBCRixtQkFBbUIsS0FBS0ssWUFBeEIsRUFBc0MsS0FBS08sWUFBM0MsQ0FBdkM7O0FBRUEsVUFBSVYsUUFBUWtCLE9BQVosRUFBcUI7QUFDbkJsQixhQUFLc0YsZUFBTCxHQUF1QixJQUF2QjtBQUNBdEYsYUFBS3VGLElBQUwsQ0FBVXJFLE9BQVY7QUFDRDtBQUNGO0FBOU1nRSxHQUFuRCxDQUFoQjs7b0JBaU5lLHVCQUFhc0UsUUFBYixDQUFzQixVQUF0QixFQUFrQ2pGLE9BQWxDLEMiLCJmaWxlIjoiUGlja2xpc3RGaWVsZC5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBDb3B5cmlnaHQgMjAxNyBJbmZvclxyXG4gKlxyXG4gKiBMaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wICh0aGUgXCJMaWNlbnNlXCIpO1xyXG4gKiB5b3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXHJcbiAqIFlvdSBtYXkgb2J0YWluIGEgY29weSBvZiB0aGUgTGljZW5zZSBhdFxyXG4gKlxyXG4gKiAgICBodHRwOi8vd3d3LmFwYWNoZS5vcmcvbGljZW5zZXMvTElDRU5TRS0yLjBcclxuICpcclxuICogVW5sZXNzIHJlcXVpcmVkIGJ5IGFwcGxpY2FibGUgbGF3IG9yIGFncmVlZCB0byBpbiB3cml0aW5nLCBzb2Z0d2FyZVxyXG4gKiBkaXN0cmlidXRlZCB1bmRlciB0aGUgTGljZW5zZSBpcyBkaXN0cmlidXRlZCBvbiBhbiBcIkFTIElTXCIgQkFTSVMsXHJcbiAqIFdJVEhPVVQgV0FSUkFOVElFUyBPUiBDT05ESVRJT05TIE9GIEFOWSBLSU5ELCBlaXRoZXIgZXhwcmVzcyBvciBpbXBsaWVkLlxyXG4gKiBTZWUgdGhlIExpY2Vuc2UgZm9yIHRoZSBzcGVjaWZpYyBsYW5ndWFnZSBnb3Zlcm5pbmcgcGVybWlzc2lvbnMgYW5kXHJcbiAqIGxpbWl0YXRpb25zIHVuZGVyIHRoZSBMaWNlbnNlLlxyXG4gKi9cclxuXHJcbmltcG9ydCBkZWNsYXJlIGZyb20gJ2Rvam8vX2Jhc2UvZGVjbGFyZSc7XHJcbmltcG9ydCBMb29rdXBGaWVsZCBmcm9tICdhcmdvcy9GaWVsZHMvTG9va3VwRmllbGQnO1xyXG5pbXBvcnQgUGlja0xpc3QgZnJvbSAnLi4vVmlld3MvUGlja0xpc3QnO1xyXG5pbXBvcnQgRmllbGRNYW5hZ2VyIGZyb20gJ2FyZ29zL0ZpZWxkTWFuYWdlcic7XHJcbmNvbnN0IHZpZXdzQnlOYW1lID0ge307XHJcbmxldCB2aWV3c0J5TmFtZUNvdW50ID0gMDtcclxuXHJcbmNvbnN0IGdldE9yQ3JlYXRlVmlld0ZvciA9IGZ1bmN0aW9uIGdldE9yQ3JlYXRlVmlld0ZvcihuYW1lKSB7XHJcbiAgaWYgKHZpZXdzQnlOYW1lW25hbWVdKSB7XHJcbiAgICByZXR1cm4gdmlld3NCeU5hbWVbbmFtZV07XHJcbiAgfVxyXG5cclxuICBjb25zdCB2aWV3ID0gbmV3IFBpY2tMaXN0KHtcclxuICAgIGlkOiBgcGlja19saXN0XyR7dmlld3NCeU5hbWVDb3VudCsrfWAsXHJcbiAgICBleHBvc2U6IGZhbHNlLFxyXG4gICAgcGlja2xpc3ROYW1lOiBuYW1lLFxyXG4gIH0pO1xyXG5cclxuICBBcHAucmVnaXN0ZXJWaWV3KHZpZXcpO1xyXG4gIHZpZXdzQnlOYW1lW25hbWVdID0gdmlldztcclxuXHJcbiAgcmV0dXJuIEFwcC5nZXRWaWV3KHZpZXcuaWQpO1xyXG59O1xyXG5cclxuY29uc3QgY29udHJvbCA9IGRlY2xhcmUoJ2NybS5GaWVsZHMuUGlja2xpc3RGaWVsZCcsIFtMb29rdXBGaWVsZF0sIHtcclxuICBwaWNrbGlzdDogZmFsc2UsXHJcbiAgcGlja2xpc3ROYW1lOiBmYWxzZSxcclxuICBwaWNrbGlzdE9wdGlvbnM6IG51bGwsXHJcbiAgbGFuZ3VhZ2VDb2RlOiBudWxsLFxyXG4gIGxhbmd1YWdlQ29kZVByb3BlcnR5OiBudWxsLFxyXG4gIHN0b3JhZ2VNb2RlOiAndGV4dCcsXHJcbiAgcmVxdWlyZVNlbGVjdGlvbjogZmFsc2UsXHJcbiAgdmFsdWVLZXlQcm9wZXJ0eTogZmFsc2UsXHJcbiAgdmFsdWVUZXh0UHJvcGVydHk6IGZhbHNlLFxyXG4gIGljb25DbGFzczogJ21vcmUnLFxyXG5cclxuICBjb25zdHJ1Y3RvcjogZnVuY3Rpb24gY29uc3RydWN0b3Iob3B0aW9ucykge1xyXG4gICAgc3dpdGNoICh0aGlzLnN0b3JhZ2VNb2RlKSB7XHJcbiAgICAgIGNhc2UgJ3RleHQnOlxyXG4gICAgICAgIHRoaXMua2V5UHJvcGVydHkgPSAndGV4dCc7XHJcbiAgICAgICAgdGhpcy50ZXh0UHJvcGVydHkgPSAndGV4dCc7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ2NvZGUnOlxyXG4gICAgICAgIHRoaXMua2V5UHJvcGVydHkgPSAnY29kZSc7XHJcbiAgICAgICAgdGhpcy50ZXh0UHJvcGVydHkgPSAndGV4dCc7XHJcbiAgICAgICAgdGhpcy5yZXF1aXJlU2VsZWN0aW9uID0gdHlwZW9mIG9wdGlvbnMucmVxdWlyZVNlbGVjdGlvbiAhPT0gJ3VuZGVmaW5lZCcgPyBvcHRpb25zLnJlcXVpcmVTZWxlY3Rpb24gOiB0cnVlO1xyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICdpZCc6XHJcbiAgICAgICAgdGhpcy5rZXlQcm9wZXJ0eSA9ICcka2V5JztcclxuICAgICAgICB0aGlzLnRleHRQcm9wZXJ0eSA9ICd0ZXh0JztcclxuICAgICAgICB0aGlzLnJlcXVpcmVTZWxlY3Rpb24gPSB0eXBlb2Ygb3B0aW9ucy5yZXF1aXJlU2VsZWN0aW9uICE9PSAndW5kZWZpbmVkJyA/IG9wdGlvbnMucmVxdWlyZVNlbGVjdGlvbiA6IHRydWU7XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgdGhpcy5rZXlQcm9wZXJ0eSA9ICd0ZXh0JztcclxuICAgICAgICB0aGlzLnRleHRQcm9wZXJ0eSA9ICd0ZXh0JztcclxuICAgIH1cclxuICB9LFxyXG4gIGlzUmVhZE9ubHk6IGZ1bmN0aW9uIGlzUmVhZE9ubHkoKSB7XHJcbiAgICByZXR1cm4gIXRoaXMucGlja2xpc3Q7XHJcbiAgfSxcclxuICBpc0NvZGVQaWNrbGlzdDogZnVuY3Rpb24gaXNDb2RlUGlja2xpc3QoKSB7XHJcbiAgICAvLyBOYW1lIFByZWZpeCBhbmQgU3VmZml4IGFyZSBib3RoIHRleHQgcGlja2xpc3RzIHRoYXQgaGF2ZSBjb2RlIGxpa2UgZnVuY3Rpb25hbGl0eVxyXG4gICAgaWYgKHRoaXMucGlja2xpc3ROYW1lID09PSAnTmFtZSBQcmVmaXgnIHx8IHRoaXMucGlja2xpc3ROYW1lID09PSAnTmFtZSBTdWZmaXgnKSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuICAgIC8vIEN1cnJlbnQgZmxhZyBmb3IgY2hlY2tpbmcgd2hldGhlciB0aGUgcGlja2xpc3QgaXMgYSBjb2RlIHBpY2tsaXN0IHNlcnZlciBzaWRlIGlzIHRoZSBkZWZhdWx0IGxhbmd1YWdlXHJcbiAgICBjb25zdCBwaWNrbGlzdCA9IEFwcC5waWNrbGlzdFNlcnZpY2UuZ2V0UGlja2xpc3RCeU5hbWUodGhpcy5waWNrbGlzdE5hbWUsIHRoaXMubGFuZ3VhZ2VDb2RlKTtcclxuICAgIHJldHVybiBwaWNrbGlzdCAmJiBwaWNrbGlzdC5kZWZhdWx0TGFuZ3VhZ2U7XHJcbiAgfSxcclxuICBmb3JtYXRSZXNvdXJjZVByZWRpY2F0ZTogZnVuY3Rpb24gZm9ybWF0UmVzb3VyY2VQcmVkaWNhdGUobmFtZSkge1xyXG4gICAgcmV0dXJuIGBuYW1lIGVxIFwiJHtuYW1lfVwiYDtcclxuICB9LFxyXG4gIF9oYW5kbGVTYWxlc2xvZ2l4TXVsdGlTZWxlY3RQaWNrbGlzdDogZnVuY3Rpb24gX2hhbmRsZVNhbGVzbG9naXhNdWx0aVNlbGVjdFBpY2tsaXN0KHZhbHVlLCB1bmxvYWRlZFZhbHVlcykge1xyXG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIGxldCB2YWx1ZXMgPSBbXTtcclxuICAgIGZvciAoY29uc3Qga2V5IGluIHZhbHVlKSB7XHJcbiAgICAgIGlmICh2YWx1ZS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XHJcbiAgICAgICAgY29uc3QgZGF0YSA9IHZhbHVlW2tleV0uZGF0YTtcclxuICAgICAgICBpZiAoZGF0YSAmJiBkYXRhLnRleHQpIHtcclxuICAgICAgICAgIHZhbHVlcy5wdXNoKGRhdGEudGV4dCk7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgZGF0YSA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgIHZhbHVlcy5wdXNoKGRhdGEpO1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChBcnJheS5pc0FycmF5KHVubG9hZGVkVmFsdWVzKSkge1xyXG4gICAgICB2YWx1ZXMgPSB2YWx1ZXMuY29uY2F0KHVubG9hZGVkVmFsdWVzKTtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4gdmFsdWVzLmpvaW4oJywgJyk7XHJcbiAgfSxcclxuICB0ZXh0UmVuZGVyZXI6IGZ1bmN0aW9uIHRleHRSZW5kZXJlcih2YWx1ZSwgdW5sb2FkZWRWYWx1ZXMpIHtcclxuICAgIGxldCByZXN1bHRzO1xyXG5cclxuICAgIGlmICh0aGlzLnNpbmdsZVNlbGVjdCkge1xyXG4gICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyB8fCB0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInKSB7XHJcbiAgICAgICAgcmVzdWx0cyA9IHZhbHVlO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIHJlc3VsdHMgPSB2YWx1ZVt0aGlzLnRleHRQcm9wZXJ0eV07XHJcbiAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJlc3VsdHMgPSB0aGlzLl9oYW5kbGVTYWxlc2xvZ2l4TXVsdGlTZWxlY3RQaWNrbGlzdCh2YWx1ZSwgdW5sb2FkZWRWYWx1ZXMpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiByZXN1bHRzO1xyXG4gIH0sXHJcbiAgZm9ybWF0VmFsdWU6IGZ1bmN0aW9uIGZvcm1hdFZhbHVlKHZhbHVlKSB7XHJcbiAgICBsZXQgcmVzdWx0cztcclxuICAgIGlmICh0aGlzLnNpbmdsZVNlbGVjdCkge1xyXG4gICAgICByZXN1bHRzID0gdGhpcy5pbmhlcml0ZWQoZm9ybWF0VmFsdWUsIGFyZ3VtZW50cyk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXN1bHRzID0gdGhpcy5faGFuZGxlU2FsZXNsb2dpeE11bHRpU2VsZWN0UGlja2xpc3QodmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiByZXN1bHRzIHx8IHZhbHVlO1xyXG4gIH0sXHJcbiAgZ2V0TGFuZ3VhZ2VDb2RlOiBmdW5jdGlvbiBnZXRMYW5ndWFnZUNvZGUoKSB7XHJcbiAgICBpZiAodGhpcy5sYW5ndWFnZUNvZGVQcm9wZXJ0eSkge1xyXG4gICAgICByZXR1cm4gdGhpcy5vd25lciAmJiB0aGlzLm93bmVyLmVudHJ5ICYmIHRoaXMub3duZXIuZW50cnlbdGhpcy5sYW5ndWFnZUNvZGVQcm9wZXJ0eV0gJiYgdGhpcy5vd25lci5lbnRyeVt0aGlzLmxhbmd1YWdlQ29kZVByb3BlcnR5XS50cmltKCk7XHJcbiAgICB9XHJcbiAgICByZXR1cm4gdGhpcy5sYW5ndWFnZUNvZGUgfHwgQXBwLmdldEN1cnJlbnRMb2NhbGUoKTtcclxuICB9LFxyXG4gIHNldFZhbHVlOiBmdW5jdGlvbiBzZXRWYWx1ZSh2YWwpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxyXG4gICAgaWYgKHRoaXMuc2luZ2xlU2VsZWN0KSB7XHJcbiAgICAgIGlmICh2YWwgJiYgIXRoaXMucGlja2xpc3ROYW1lKSB7XHJcbiAgICAgICAgdGhpcy5waWNrbGlzdE5hbWUgPSB0aGlzLnBpY2tsaXN0O1xyXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5waWNrbGlzdE5hbWUgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgIGxldCBkZXBlbmRlbnQgPSB0aGlzLmdldERlcGVuZGVudFZhbHVlKCk7XHJcbiAgICAgICAgICBpZiAodHlwZW9mIGRlcGVuZGVudCA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICAgICAgZGVwZW5kZW50ID0gZGVwZW5kZW50LmNvZGU7XHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgICB0aGlzLnBpY2tsaXN0TmFtZSA9IHRoaXMuZGVwZW5kc09uIC8vIG9ubHkgcGFzcyBkZXBlbmRlbnRWYWx1ZSBpZiB0aGVyZSBpcyBhIGRlcGVuZGVuY3lcclxuICAgICAgICAgICAgPyB0aGlzLmV4cGFuZEV4cHJlc3Npb24odGhpcy5waWNrbGlzdCwgZGVwZW5kZW50KSA6IHRoaXMuZXhwYW5kRXhwcmVzc2lvbih0aGlzLnBpY2tsaXN0KTtcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgICAgbGV0IHBpY2tsaXN0SXRlbSA9IGZhbHNlO1xyXG4gICAgICB0aGlzLmxhbmd1YWdlQ29kZSA9IHRoaXMuZ2V0TGFuZ3VhZ2VDb2RlKCk7XHJcbiAgICAgIGlmICh0aGlzLnN0b3JhZ2VNb2RlID09PSAndGV4dCcpIHtcclxuICAgICAgICBwaWNrbGlzdEl0ZW0gPSB0aGlzLmFwcC5waWNrbGlzdFNlcnZpY2UuZ2V0UGlja2xpc3RJdGVtVGV4dEJ5Q29kZSh0aGlzLnBpY2tsaXN0TmFtZSwgdmFsLCB0aGlzLmxhbmd1YWdlQ29kZSk7XHJcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5zdG9yYWdlTW9kZSAhPT0gJ2lkJykge1xyXG4gICAgICAgIHBpY2tsaXN0SXRlbSA9IHRoaXMuYXBwLnBpY2tsaXN0U2VydmljZS5nZXRQaWNrbGlzdEl0ZW1CeUNvZGUodGhpcy5waWNrbGlzdE5hbWUsIHZhbCwgdGhpcy5sYW5ndWFnZUNvZGUpO1xyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgIC8vIFNwZWNpYWwgY2FzZSBvZiBpdGVtIGJlaW5nIHN0b3JlZCBieSAka2V5Li4uXHJcbiAgICAgICAgcGlja2xpc3RJdGVtID0gdGhpcy5hcHAucGlja2xpc3RTZXJ2aWNlLmdldFBpY2tsaXN0SXRlbUJ5S2V5KHRoaXMucGlja2xpc3ROYW1lLCB2YWwsIHRoaXMubGFuZ3VhZ2VDb2RlKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAocGlja2xpc3RJdGVtKSB7XHJcbiAgICAgICAgdmFsID0gcGlja2xpc3RJdGVtO1xyXG4gICAgICAgIGlmICh0aGlzLnN0b3JhZ2VNb2RlICE9PSAnaWQnICYmIHRoaXMuc3RvcmFnZU1vZGUgIT09ICd0ZXh0Jykge1xyXG4gICAgICAgICAgdGhpcy5rZXlQcm9wZXJ0eSA9ICdjb2RlJztcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy50ZXh0UHJvcGVydHkgPSAndGV4dCc7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICAgIHRoaXMuaW5oZXJpdGVkKHNldFZhbHVlLCBhcmd1bWVudHMpO1xyXG4gIH0sXHJcbiAgY3JlYXRlU2VsZWN0aW9uczogZnVuY3Rpb24gY3JlYXRlU2VsZWN0aW9ucygpIHtcclxuICAgIGNvbnN0IHZhbHVlID0gdGhpcy5nZXRUZXh0KCk7XHJcbiAgICBsZXQgc2VsZWN0aW9ucyA9IFtdO1xyXG4gICAgaWYgKHZhbHVlKSB7XHJcbiAgICAgIGlmICh2YWx1ZS5pbmRleE9mKCcsICcpICE9PSAtMSkge1xyXG4gICAgICAgIHNlbGVjdGlvbnMgPSB2YWx1ZS5zcGxpdCgnLCAnKTtcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICBzZWxlY3Rpb25zLnB1c2godmFsdWUpO1xyXG4gICAgICB9XHJcbiAgICB9XHJcbiAgICByZXR1cm4gc2VsZWN0aW9ucztcclxuICB9LFxyXG4gIGNyZWF0ZU5hdmlnYXRpb25PcHRpb25zOiBmdW5jdGlvbiBjcmVhdGVOYXZpZ2F0aW9uT3B0aW9ucygpIHtcclxuICAgIGNvbnN0IG9wdGlvbnMgPSB0aGlzLmluaGVyaXRlZChjcmVhdGVOYXZpZ2F0aW9uT3B0aW9ucywgYXJndW1lbnRzKTtcclxuXHJcbiAgICBpZiAodGhpcy5waWNrbGlzdCkge1xyXG4gICAgICB0aGlzLnBpY2tsaXN0TmFtZSA9IHRoaXMucGlja2xpc3Q7XHJcbiAgICAgIGlmICh0eXBlb2YgdGhpcy5waWNrbGlzdE5hbWUgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICB0aGlzLnBpY2tsaXN0TmFtZSA9IHRoaXMuZGVwZW5kc09uIC8vIG9ubHkgcGFzcyBkZXBlbmRlbnRWYWx1ZSBpZiB0aGVyZSBpcyBhIGRlcGVuZGVuY3lcclxuICAgICAgICAgID8gdGhpcy5leHBhbmRFeHByZXNzaW9uKHRoaXMucGlja2xpc3QsIG9wdGlvbnMuZGVwZW5kZW50VmFsdWUuY29kZSB8fCBvcHRpb25zLmRlcGVuZGVudFZhbHVlKSA6IHRoaXMuZXhwYW5kRXhwcmVzc2lvbih0aGlzLnBpY2tsaXN0KTtcclxuICAgICAgfVxyXG4gICAgICBvcHRpb25zLnJlc291cmNlUHJlZGljYXRlID0gdGhpcy5mb3JtYXRSZXNvdXJjZVByZWRpY2F0ZSh0aGlzLnBpY2tsaXN0TmFtZSk7XHJcbiAgICAgIG9wdGlvbnMuc2luZ2xlU2VsZWN0ID0gdGhpcy5zaW5nbGVTZWxlY3Q7XHJcbiAgICAgIG9wdGlvbnMucHJldmlvdXNTZWxlY3Rpb25zID0gIXRoaXMuc2luZ2xlU2VsZWN0ID8gdGhpcy5jcmVhdGVTZWxlY3Rpb25zKCkgOiBudWxsO1xyXG4gICAgICBvcHRpb25zLmtleVByb3BlcnR5ID0gdGhpcy5rZXlQcm9wZXJ0eTtcclxuICAgICAgb3B0aW9ucy50ZXh0UHJvcGVydHkgPSB0aGlzLnRleHRQcm9wZXJ0eTtcclxuICAgICAgb3B0aW9ucy5waWNrbGlzdE9wdGlvbnMgPSAodGhpcy5waWNrbGlzdE9wdGlvbnMgJiYgdGhpcy5waWNrbGlzdE9wdGlvbnMoKHRoaXMub3duZXIgJiYgdGhpcy5vd25lci5lbnRyeSkgfHwge30pKSB8fCB7fTtcclxuXHJcbiAgICAgIGlmICh0aGlzLnBpY2tsaXN0TmFtZSAhPT0gJ05hbWUgUHJlZml4JyAmJiB0aGlzLnBpY2tsaXN0TmFtZSAhPT0gJ05hbWUgU3VmZml4Jykge1xyXG4gICAgICAgIC8vIERlZmF1bHQgdG8gY3VycmVudCBsb2NhbGUgSUYgbm90IG5hbWUgcHJlZml4IGFuZCBzdWZmaXggcGlja2xpc3RzICh0aGVzZSBhcmUgZmlsdGVyZWQgdGV4dCBwaWNrbGlzdHMpXHJcbiAgICAgICAgdGhpcy5sYW5ndWFnZUNvZGUgPSBBcHAuZ2V0Q3VycmVudExvY2FsZSgpO1xyXG4gICAgICB9XHJcbiAgICAgIG9wdGlvbnMubGFuZ3VhZ2VDb2RlID0gdGhpcy5sYW5ndWFnZUNvZGU7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCF0aGlzLnNpbmdsZVNlbGVjdCkge1xyXG4gICAgICBvcHRpb25zLnRvb2xzID0ge1xyXG4gICAgICAgIHRiYXI6IFt7XHJcbiAgICAgICAgICBpZDogJ2NhbmNlbCcsXHJcbiAgICAgICAgICB0aXRsZTogdGhpcy5jYW5jZWxUZXh0LFxyXG4gICAgICAgICAgc3ZnOiAnY2FuY2VsJyxcclxuICAgICAgICAgIHNpZGU6ICdsZWZ0JyxcclxuICAgICAgICAgIGZuOiBSZVVJLmJhY2ssXHJcbiAgICAgICAgICBzY29wZTogUmVVSSxcclxuICAgICAgICB9LCB7XHJcbiAgICAgICAgICBpZDogJ2NvbXBsZXRlJyxcclxuICAgICAgICAgIHRpdGxlOiB0aGlzLmNvbXBsZXRlVGV4dCxcclxuICAgICAgICAgIHN2ZzogJ2NoZWNrJyxcclxuICAgICAgICAgIGZuOiB0aGlzLmNvbXBsZXRlLFxyXG4gICAgICAgICAgc2NvcGU6IHRoaXMsXHJcbiAgICAgICAgfV0sXHJcbiAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIG9wdGlvbnM7XHJcbiAgfSxcclxuICBuYXZpZ2F0ZVRvTGlzdFZpZXc6IGZ1bmN0aW9uIG5hdmlnYXRlVG9MaXN0VmlldygpIHtcclxuICAgIGlmICh0aGlzLmlzRGlzYWJsZWQoKSkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgb3B0aW9ucyA9IHRoaXMuY3JlYXRlTmF2aWdhdGlvbk9wdGlvbnMoKTtcclxuICAgIGlmICh0aGlzLmlzQ29kZVBpY2tsaXN0KCkpIHtcclxuICAgICAgdGhpcy5rZXlQcm9wZXJ0eSA9ICdjb2RlJztcclxuICAgIH1cclxuICAgIGNvbnN0IHZpZXcgPSBBcHAuZ2V0Vmlldyh0aGlzLnZpZXcpIHx8IGdldE9yQ3JlYXRlVmlld0Zvcih0aGlzLnBpY2tsaXN0TmFtZSwgdGhpcy5sYW5ndWFnZUNvZGUpO1xyXG5cclxuICAgIGlmICh2aWV3ICYmIG9wdGlvbnMpIHtcclxuICAgICAgdmlldy5yZWZyZXNoUmVxdWlyZWQgPSB0cnVlO1xyXG4gICAgICB2aWV3LnNob3cob3B0aW9ucyk7XHJcbiAgICB9XHJcbiAgfSxcclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBGaWVsZE1hbmFnZXIucmVnaXN0ZXIoJ3BpY2tsaXN0JywgY29udHJvbCk7XHJcbiJdfQ==
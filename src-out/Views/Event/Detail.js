define('crm/Views/Event/Detail', ['exports', 'module', 'dojo/_base/declare', 'dojo/_base/lang', '../../Format', 'argos/Detail'], function (exports, module, _dojo_baseDeclare, _dojo_baseLang, _Format, _argosDetail) {
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _declare = _interopRequireDefault(_dojo_baseDeclare);

  var _lang = _interopRequireDefault(_dojo_baseLang);

  var _format = _interopRequireDefault(_Format);

  var _Detail = _interopRequireDefault(_argosDetail);

  /**
   * @class crm.Views.Event.Detail
   *
   * @extends argos.Detail
   *
   * @requires crm.Format
   */
  var __class = (0, _declare['default'])('crm.Views.Event.Detail', [_Detail['default']], {
    // Localization
    eventTypeText: {
      'atToDo': 'To-Do',
      'atPhoneCall': 'Phone Call',
      'atAppointment': 'Meeting',
      'atLiterature': 'Literature Request',
      'atPersonal': 'Personal Activity'
    },
    actionsText: 'Quick Actions',
    startTimeText: 'start date',
    endTimeText: 'end date',
    titleText: 'Event',
    descriptionText: 'description',
    typeText: 'type',
    whenText: 'When',
    startDateFormatText: 'M/D/YYYY h:mm:ss A',
    endDateFormatText: 'M/D/YYYY h:mm:ss A',

    // View Properties
    id: 'event_detail',
    editView: 'event_edit',
    security: null, // 'Entities/Event/View',
    querySelect: ['Description', 'EndDate', 'StartDate', 'UserId', 'Type'],
    resourceKind: 'events',

    formatEventType: function formatEventType(val) {
      return this.eventTypeText[val] || val;
    },
    init: function init() {
      this.inherited(arguments);
    },
    createLayout: function createLayout() {
      return this.layout || (this.layout = [{
        title: this.detailsText,
        name: 'DetailsSection',
        children: [{
          name: 'Type',
          property: 'Type',
          label: this.typeText,
          renderer: this.formatEventType.bindDelegate(this)
        }, {
          name: 'Description',
          property: 'Description',
          label: this.descriptionText
        }]
      }, {
        title: this.whenText,
        name: 'WhenSection',
        children: [{
          name: 'StartDate',
          property: 'StartDate',
          label: this.startTimeText,
          renderer: _format['default'].date.bindDelegate(this, this.startDateFormatText)
        }, {
          name: 'EndDate',
          property: 'EndDate',
          label: this.endTimeText,
          renderer: _format['default'].date.bindDelegate(this, this.endDateFormatText)
        }]
      }]);
    }
  });

  _lang['default'].setObject('Mobile.SalesLogix.Views.Event.Detail', __class);
  module.exports = __class;
});

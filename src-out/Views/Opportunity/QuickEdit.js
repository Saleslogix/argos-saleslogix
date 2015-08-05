define('crm/Views/Opportunity/QuickEdit', ['exports', 'module', 'dojo/_base/declare', 'dojo/_base/lang', 'dojo/query', 'dojo/dom-construct', 'dojo/dom-attr', 'dojo/string', '../../Validator', '../../Template', '../../SalesProcessUtility', 'argos/Utility', 'argos/Edit'], function (exports, module, _dojo_baseDeclare, _dojo_baseLang, _dojoQuery, _dojoDomConstruct, _dojoDomAttr, _dojoString, _Validator, _Template, _SalesProcessUtility, _argosUtility, _argosEdit) {
  function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

  var _declare = _interopRequireDefault(_dojo_baseDeclare);

  var _lang = _interopRequireDefault(_dojo_baseLang);

  var _query = _interopRequireDefault(_dojoQuery);

  var _domConstruct = _interopRequireDefault(_dojoDomConstruct);

  var _domAttr = _interopRequireDefault(_dojoDomAttr);

  var _string = _interopRequireDefault(_dojoString);

  var _validator = _interopRequireDefault(_Validator);

  var _template = _interopRequireDefault(_Template);

  var _salesProcessUtility = _interopRequireDefault(_SalesProcessUtility);

  var _utility = _interopRequireDefault(_argosUtility);

  var _Edit = _interopRequireDefault(_argosEdit);

  /**
   * @class crm.Views.Opportunity.QuickEdit
   *
   * @extends argos.Edit
   *
   * @requires argos.Utility
   *
   * @requires crm.Validator
   * @requires crm.Template
   */
  var __class = (0, _declare['default'])('crm.Views.Opportunity.QuickEdit', [_Edit['default']], {
    //Localization
    estCloseText: 'est close',
    detailsText: 'Details',
    opportunityStageTitleText: 'Opportunity Stage',
    opportunityText: 'opportunity',
    stageText: 'stage',
    statusOpenText: 'Open',
    statusClosedLostText: 'Closed - Lost',
    statusClosedWonText: 'Closed - Won',
    salesProcessText: 'stage locked by sales process:',
    probabilityText: 'close prob',
    probabilityTitleText: 'Opportunity Probability',
    potentialText: 'sales potential',

    //View Properties
    entityName: 'Opportunity',
    id: 'opportunity_quick_edit',
    resourceKind: 'opportunities',
    insertSecurity: 'Entities/Opportunity/Add',
    updateSecurity: 'Entities/Opportunity/Edit',
    querySelect: ['Account/AccountName', 'CloseProbability', 'EstimatedClose', 'ExchangeRate', 'ExchangeRateCode', 'ExchangeRateDate', 'ExchangeRateLocked', 'SalesPotential', 'Stage', 'status'],
    init: function init() {
      this.inherited(arguments);
    },
    applyContext: function applyContext(templateEntry) {
      this.fields['EstimatedClose'].setValue(templateEntry.EstimatedClose);
    },
    createLayout: function createLayout() {
      var layout, details;

      details = {
        title: this.detailsText,
        name: 'OpportunityDetailsEdit',
        children: [{
          relatedView: {
            widgetType: 'relatedContext',
            id: 'opp_related_context_quickEdit'
          }
        }, {
          label: this.stageText,
          name: 'Stage',
          property: 'Stage',
          picklist: 'Opportunity Stage',
          requireSelection: true,
          enabled: false,
          title: this.opportunityStageTitleText,
          type: 'picklist'
        }, {
          label: this.probabilityText,
          name: 'CloseProbability',
          property: 'CloseProbability',
          picklist: 'Opportunity Probability',
          title: this.probabilityTitleText,
          type: 'picklist',
          validator: [_validator['default'].isInt32, _validator['default'].isInteger]
        }, {
          label: this.potentialText,
          name: 'SalesPotential',
          property: 'SalesPotential',
          precision: 2,
          type: 'multiCurrency',
          validationTrigger: 'keyup',
          validator: _validator['default'].isCurrency
        }, {
          label: this.estCloseText,
          name: 'EstimatedClose',
          property: 'EstimatedClose',
          type: 'date',
          timeless: true,
          validator: _validator['default'].exists
        }]
      };

      layout = this.layout || (this.layout = []);

      if (layout.length > 0) {
        return layout;
      }

      layout.push(details);
      return layout;
    },
    setValues: function setValues(values) {
      this.inherited(arguments);
      this.enableStage(values['$key']);
      this.enableProbability(values);
      this.fields['SalesPotential'].setCurrencyCode(App.getBaseExchangeRate().code);
    },
    enableStage: function enableStage(opportunityId) {
      var field, label;
      field = this.fields['Stage'];
      label = this.stageText;

      if (!field) {
        return;
      }

      field.disable();
      _salesProcessUtility['default'].getSalesProcessByEntityId(opportunityId).then((function (salesProcess) {
        if (salesProcess) {
          field.disable();
          label = this.salesProcessText + salesProcess.$descriptor;
          this.setStageLabel(label);
        } else {
          field.enable();
        }
      }).bind(this));
      this.setStageLabel(label);
    },
    setStageLabel: function setStageLabel(label) {
      var field, node;
      field = this.fields['Stage'];
      if (field && field.domNode) {
        node = (0, _query['default'])('[for="Stage"]', field.domNode);
        if (node && node.length > 0) {
          _domAttr['default'].set(node[0], 'innerHTML', label); // TODO: SDK's _Field should provide a label setter
        }
      }
    },
    enableProbability: function enableProbability(entry) {
      var field;
      field = this.fields['CloseProbability'];
      if (!field) {
        return;
      }
      field.enable();
      if (this.isClosed(entry)) {
        field.disable();
      }
    },
    isClosed: function isClosed(entry) {
      var status;
      status = entry['Status'];
      if (status === this.statusClosedWonText || status === this.statusClosedLostText) {
        return true;
      }
      return false;
    }
  });

  module.exports = __class;
});

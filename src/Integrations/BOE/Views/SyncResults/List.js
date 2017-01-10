import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import string from 'dojo/string';
import List from 'argos/List';
import format from 'crm/Format';
import MODEL_NAMES from '../../Models/Names';
import getResource from 'argos/I18n';

const resource = getResource('syncResultsList');
const dtFormatResource = getResource('syncResultsListDateTimeFormat');

const __class = declare('crm.Integrations.BOE.Views.SyncResults.List', [List], {
  formatter: format,
  // Templates
  itemTemplate: new Simplate([
    '<h3><label class="group-label">{%: $$.directionText %}: </label>{%: $.RunName %}</h3>',
    '<h4><label class="group-label">{%: $$.statusText %}: </label>{%: $.HttpStatus %}</h4>',
    '{% if ($.ErrorMessage) { %}',
    '<h4><label class="group-label">{%: $$.errorMessageText %}: </label>{%: $.ErrorMessage %}</h4>',
    '{% } %}',
    '{% if ($.SyncedFrom) { %}',
    '<h4><label class="group-label">{%: $$.sentFromText %}: </label>{%: $.SyncedFrom.Name %}</h4>',
    '{% } %}',
    '{% if ($.SyncedTo) { %}',
    '<h4><label class="group-label">{%: $$.processedByText %}: </label>{%: $.SyncedTo.Name %}</h4>',
    '{% } %}',
    '<h4><label class="group-label">{%: $$.loggedText %}: </label>{%: $$.formatter.date($.Stamp, $$.dateFormatText) %}</h4>',
  ]),

  // Localization
  titleText: resource.titleText,
  directionText: resource.directionText,
  userText: resource.userText,
  sentFromText: resource.sentFromText,
  processedByText: resource.processedByText,
  loggedText: resource.loggedText,
  statusText: resource.statusText,
  errorMessageText: resource.errorMessageText,
  dateFormatText: dtFormatResource.dateFormatText,

  // View Properties
  id: 'syncresult_list',
  detailView: '',
  modelName: MODEL_NAMES.SYNCRESULT,
  resourceKind: 'syncResults',
  enableActions: false,
  groupsEnabled: false,
  disableRightDrawer: true,
  expose: false,

  // Card layout
  itemIconClass: '',

  // Metrics
  entityName: 'SyncResult',

  createToolLayout: function createToolLayout() {
    return this.tools || (this.tools = {
    });
  },
  formatSearchQuery: function formatSearchQuery(searchQuery) {
    return string.substitute('upper(HttpStatus) like "${0}%"', [this.escapeSearchQuery(searchQuery.toUpperCase())]);
  },
});

lang.setObject('icboe.Views.SyncResults.List', __class);
export default __class;

import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import query from 'dojo/query';
import domClass from 'dojo/dom-class';
import format from '../../Format';
import template from '../../Template';
import ErrorManager from 'argos/ErrorManager';
import Detail from 'argos/Detail';
import getResource from 'argos/I18n';
import 'dojo/NodeList-manipulate';

const resource = getResource('ticketActivityDetail');

/**
 * @class crm.Views.TicketActivity.Detail
 *
 * @extends argos.Detail
 *
 * @requires argos.ErrorManager
 * @requires argos.Format
 *
 * @requires crm.Format
 * @requires crm.Template
 */
const __class = declare('crm.Views.TicketActivity.Detail', [Detail], {
  // Localization
  titleText: resource.titleText,
  accountText: resource.accountText,
  contactText: resource.contactText,
  typeText: resource.typeText,
  publicAccessText: resource.publicAccessText,
  assignedDateText: resource.assignedDateText,
  completedDateText: resource.completedDateText,
  followUpText: resource.followUpText,
  unitsText: resource.unitsText,
  elapsedUnitsText: resource.elapsedUnitsText,
  rateTypeDescriptionText: resource.rateTypeDescriptionText,
  rateText: resource.rateText,
  totalLaborText: resource.totalLaborText,
  totalPartsText: resource.totalPartsText,
  totalFeeText: resource.totalFeeText,
  activityDescriptionText: resource.activityDescriptionText,
  ticketNumberText: resource.ticketNumberText,
  userText: resource.userText,
  entityText: resource.entityText,
  completeTicketText: resource.completeTicketText,
  moreDetailsText: resource.moreDetailsText,
  relatedItemsText: resource.relatedItemsText,
  relatedTicketActivityItemText: resource.relatedTicketActivityItemText,

  // View Properties
  id: 'ticketactivity_detail',
  editView: 'ticketactivity_edit',

  querySelect: [
    'ActivityDescription',
    'ActivityTypeCode',
    'AssignedDate',
    'CompletedDate',
    'ElapsedUnits',
    'FollowUp',
    'PublicAccessCode',
    'Rate',
    'RateTypeDescription/Amount',
    'RateTypeDescription/RateTypeCode',
    'RateTypeDescription/TypeDescription',
    'TotalFee',
    'TotalLabor',
    'TotalParts',
    'Units',
    'Ticket/Account/AccountName',
    'Ticket/TicketNumber',
    'Ticket/Contact/Name',
    'User/UserInfo/LastName',
    'User/UserInfo/FirstName',
  ],
  resourceKind: 'ticketActivities',

  createPicklistRequest: function createPicklistRequest(predicate) {
    const request = new Sage.SData.Client.SDataResourceCollectionRequest(App.getService())
      .setResourceKind('picklists')
      .setContractName('system');
    const uri = request.getUri();

    uri.setPathSegment(Sage.SData.Client.SDataUri.ResourcePropertyIndex, 'items');
    uri.setCollectionPredicate(predicate);

    request.allowCacheUse = true;

    return request;
  },

  requestCodeData: function requestCodeData(row, node, value, entry, predicate) {
    const request = this.createPicklistRequest(predicate);
    request.read({
      success: lang.hitch(this, this.onRequestCodeDataSuccess, row, node, value, entry),
      failure: this.onRequestCodeDataFailure,
      scope: this,
    });
  },

  onRequestCodeDataSuccess: function onRequestCodeDataSuccess(row, node, value, entry, data) {
    const codeText = this.processCodeDataFeed(data, entry[row.property]);
    if (codeText) {
      this.setNodeText(node, codeText);
      this.entry[row.name] = codeText;
    }
  },

  onRequestCodeDataFailure: function onRequestCodeDataFailure(response, o) {
    ErrorManager.addError(response, o, this.options, 'failure');
  },

  processCodeDataFeed: function processCodeDataFeed(feed, currentValue, options) {
    const keyProperty = options && options.keyProperty ? options.keyProperty : '$key';
    const textProperty = options && options.textProperty ? options.textProperty : 'text';

    for (let i = 0; i < feed.$resources.length; i++) {
      if (feed.$resources[i][keyProperty] === currentValue) {
        return feed.$resources[i][textProperty];
      }
    }

    return currentValue;
  },
  setNodeText: function setNodeText(node, value) {
    domClass.remove(node, 'content-loading');

    query('span', node).text(value);
  },

  createLayout: function createLayout() {
    return this.layout || (this.layout = [{
      title: this.detailsText,
      name: 'DetailsSection',
      children: [{
        label: this.activityDescriptionText,
        name: 'ActivityDescription',
        property: 'ActivityDescription',
      }, {
        label: this.ticketNumberText,
        name: 'Ticket.TicketNumber',
        property: 'Ticket.TicketNumber',
        view: 'ticket_detail',
        key: 'Ticket.$key',
      }, {
        name: 'Ticket.Account.AccountName',
        property: 'Ticket.Account.AccountName',
        descriptor: 'Ticket.Account.AccountName',
        label: this.accountText,
        view: 'account_detail',
        key: 'Ticket.Account.$key',
      }, {
        name: 'Ticket.Contact',
        property: 'Ticket.Contact.Name',
        descriptor: 'Ticket.Contact.Name',
        label: this.contactText,
        view: 'contact_detail',
        key: 'Ticket.Contact.$key',
      }, {
        name: 'User.UserInfo',
        property: 'User.UserInfo',
        label: this.userText,
        tpl: template.nameLF,
      }, {
        label: this.typeText,
        name: 'ActivityTypeCode',
        property: 'ActivityTypeCode',
        onCreate: this.requestCodeData.bindDelegate(this, "name eq 'Ticket Activity'"),
      }, {
        label: this.publicAccessText,
        name: 'PublicAccessCode',
        property: 'PublicAccessCode',
        onCreate: this.requestCodeData.bindDelegate(this, "name eq 'Ticket Activity Public Access'"),
      }, {
        label: this.assignedDateText,
        name: 'AssignedDate',
        property: 'AssignedDate',
        renderer: format.date,
      }, {
        label: this.completedDateText,
        name: 'CompletedDate',
        property: 'CompletedDate',
        renderer: format.date,
      }, {
        label: this.followUpText,
        name: 'FollowUp',
        property: 'FollowUp',
        renderer: format.yesNo,
      }],
    }, {
      title: this.moreDetailsText,
      collapsed: true,
      name: 'MoreDetailsTextSection',
      children: [{
        label: this.unitsText,
        name: 'Units',
        property: 'Units',
      }, {
        label: this.elapsedUnitsText,
        name: 'ElapsedUnits',
        property: 'ElapsedUnits',
        renderer: format.fixedLocale,
      }, {
        label: this.rateTypeDescriptionText,
        name: 'RateTypeDescription.RateTypeCode',
        property: 'RateTypeDescription.RateTypeCode',
      }, {
        label: this.rateText,
        name: 'Rate',
        property: 'Rate',
        renderer: format.currency,
      }, {
        label: this.totalLaborText,
        name: 'TotalLabor',
        property: 'TotalLabor',
        renderer: format.currency,
      }, {
        label: this.totalPartsText,
        name: 'TotalParts',
        property: 'TotalParts',
        renderer: format.currency,
      }, {
        label: this.totalFeeText,
        name: 'TotalFee',
        property: 'TotalFee',
        renderer: format.currency,
      }],
    }, {
      list: true,
      title: this.relatedItemsText,
      name: 'RelatedItemsSection',
      children: [{
        name: 'TicketActivityItemRelated',
        label: this.relatedTicketActivityItemText,
        where: this.formatRelatedQuery.bindDelegate(this, 'TicketActivity.Id eq "${0}"'),
        view: 'ticketactivityitem_related',
      }],
    }]);
  },
});

lang.setObject('Mobile.SalesLogix.Views.TicketActivity.Detail', __class);
export default __class;

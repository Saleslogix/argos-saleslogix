import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import format from '../../Format';
import template from '../../Template';
import Detail from 'argos/Detail';
import getResource from 'argos/I18n';
// import 'dojo/NodeList-manipulate';
import MODEL_NAMES from '../../Models/Names';

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
  relatedItemsText: resource.relatedItemsText,
  relatedTicketActivityItemText: resource.relatedTicketActivityItemText,

  // View Properties
  id: 'ticketactivity_detail',
  editView: 'ticketactivity_edit',

  querySelect: [],
  modelName: MODEL_NAMES.TICKETACTIVITY,
  resourceKind: 'ticketActivities',

  formatPicklist: function formatPicklist(property) {
    // TODO: This should be changed on the entity level...
    // Special case since this is for some reason stored as $key value on the entity
    return format.picklist(this.app.picklistService, this._model, property, undefined, undefined, {
      display: 2,
      storage: 1,
    });
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
    $(node).removeClass('content-loading');

    $('span', node).text(value);
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
        renderer: this.formatPicklist('ActivityTypeCode'),
      }, {
        label: this.publicAccessText,
        name: 'PublicAccessCode',
        property: 'PublicAccessCode',
        renderer: this.formatPicklist('PublicAccessCode'),
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
      }, {
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

import declare from 'dojo/_base/declare';
import lang from 'dojo/_base/lang';
import connect from 'dojo/_base/connect';
import string from 'dojo/string';
import Detail from 'argos/Detail';
// import _LegacySDataDetailMixin from 'argos/_LegacySDataDetailMixin';
import getResource from 'argos/I18n';
import format from 'crm/Format';
import MODEL_NAMES from '../../Models/Names';

const resource = getResource('opportunityContactDetail');

/**
 * @class crm.Views.OpportunityContact.Detail
 *
 * @extends argos.Detail
 * @mixins argos._LegacySDataDetailMixin
 */
const __class = declare('crm.Views.OpportunityContact.Detail', [Detail/* , _LegacySDataDetailMixin */], {
  // Localization
  titleText: resource.titleText,
  accountText: resource.accountText,
  contactTitleText: resource.contactTitleText,
  nameText: resource.nameText,
  moreDetailsText: resource.moreDetailsText,
  salesRoleText: resource.salesRoleText,
  strategyText: resource.strategyText,
  personalBenefitsText: resource.personalBenefitsText,
  standingText: resource.standingText,
  issuesText: resource.issuesText,
  competitorNameText: resource.competitorNameText,
  removeContactTitleText: resource.removeContactTitleText,
  confirmDeleteText: resource.confirmDeleteText,
  contactText: resource.contactText,
  entityText: resource.entityText,

  // View Properties
  id: 'opportunitycontact_detail',
  editView: 'opportunitycontact_edit',
  security: 'Entities/Contact/View',
  querySelect: [],
  resourceKind: 'opportunityContacts',
  modelName: MODEL_NAMES.OPPORTUNITYCONTACT,

  createEntryForDelete: function createEntryForDelete() {
    const entry = {
      $key: this.entry.$key,
      $etag: this.entry.$etag,
      $name: this.entry.$name,
    };
    return entry;
  },
  removeContact: function removeContact() {
    const confirmMessage = string.substitute(this.confirmDeleteText, [this.entry.Contact.NameLF]);
    if (!confirm(confirmMessage)) { // eslint-disable-line
      return;
    }
    const entry = this.createEntryForDelete();
    if (entry) {
      const store = this.get('store');
      if (store) {
        store.remove(entry).then(
          this.onDeleteSuccess()
        );
      }
    }
  },
  onDeleteSuccess: function onDeleteSuccess() {
    connect.publish('/app/refresh', [{
      resourceKind: this.resourceKind,
    }]);
    ReUI.back();
  },
  formatPicklist: function formatPicklist(property) {
    return format.picklist(this.app.picklistService, this._model, property);
  },
  createToolLayout: function createToolLayout() {
    return this.tools || (this.tools = {
      tbar: [{
        id: 'edit',
        action: 'navigateToEditView',
        svg: 'edit',
        security: App.getViewSecurity(this.editView, 'update'),
      }, {
        id: 'removeContact',
        svg: 'close',
        action: 'removeContact',
        title: this.removeContactTitleText,
      }],
    });
  },
  createLayout: function createLayout() {
    return this.layout || (this.layout = [{
      title: this.contactText,
      name: 'DetailsSection',
      children: [{
        name: 'NameLF',
        property: 'Contact.NameLF',
        label: this.nameText,
        view: 'contact_detail',
        key: 'Contact.$key',
        descriptor: 'Contact.NameLF',
      }, {
        name: 'AccountName',
        property: 'Contact.AccountName',
        descriptor: 'AccountName',
        label: this.accountText,
        view: 'account_detail',
        key: 'Contact.Account.$key',
      }, {
        name: 'Title',
        property: 'Contact.Title',
        label: this.contactTitleText,
      }],
    }, {
      title: this.detailsText,
      name: 'MoreDetailsSection',
      children: [{
        name: 'SalesRole',
        property: 'SalesRole',
        label: this.salesRoleText,
        renderer: this.formatPicklist('SalesRole'),
      }, {
        name: 'Standing',
        property: 'Standing',
        label: this.standingText,
        renderer: this.formatPicklist('Standing'),
      }, {
        name: 'PersonalBenefits',
        property: 'PersonalBenefits',
        label: this.personalBenefitsText,
      }, {
        name: 'CompetitorName',
        property: 'Competitors.CompetitorName',
        label: this.competitorNameText,
      }, {
        name: 'Strategy',
        property: 'Strategy',
        label: this.strategyText,
      }, {
        name: 'Issues',
        property: 'Issues',
        label: this.issuesText,
      }],
    }]);
  },
});

lang.setObject('Mobile.SalesLogix.Views.OpportunityContact.Detail', __class);
export default __class;

/* Copyright 2020 Infor
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

import declare from 'dojo/_base/declare';
import ApplicationModule from 'argos/ApplicationModule';
import getResource from 'argos/I18n';
import ActivityAssociationList from './Views/ActivityAssociation/List';
import HistoryAssociationList from './Views/HistoryAssociation/List';
import './Models/ActivityAssociation/Offline';
import './Models/ActivityAssociation/SData';
import './Models/HistoryAssociation/Offline';
import './Models/HistoryAssociation/SData';

const resource = getResource('activityAssociationModule');

const __class = declare('crm.Integrations.ActivityAssociations.ApplicationModule', [ApplicationModule], {
  hasNewActivityAssociations: function hasNewActivityAssociations() {
    return this.application.context.enableActivityAssociations === true;
  },
  loadViewsDynamic: function loadViews() {
    if (!this.hasNewActivityAssociations()) {
      return;
    }

    this.registerView(new ActivityAssociationList({
      id: 'activity_association_related',
    }));
    this.registerView(new HistoryAssociationList({
      id: 'history_association_related',
    }));
  },
  loadCustomizationsDynamic: function loadCustomizations() {
    if (!this.hasNewActivityAssociations()) {
      return;
    }

    this.registerCustomization('detail', 'activity_detail', {
      at: function at(row) {
        return row.name === 'AttendeeRelated';
      },
      type: 'insert',
      value: {
        name: 'AssociationRelated',
        label: resource.relatedAssociationText,
        where: (entry) => {
          return `ActivityId eq "${entry.$key}"`;
        },
        view: 'activity_association_related',
        title: resource.relatedAssociationTitleText,
      },
    });

    this.registerCustomization('detail', 'history_detail', {
      at: function at(row) {
        return row.name === 'AttendeeRelated';
      },
      type: 'insert',
      value: {
        name: 'AssociationRelated',
        label: resource.relatedAssociationText,
        where: (entry) => {
          return `HistoryId eq "${entry.$key}"`;
        },
        view: 'history_association_related',
        title: resource.relatedHistoryAssociationTitleText,
      },
    });

    // Remove "for lead" toggle on activity edit, along with company, always show lead lookup
    crm.Views.Activity.Edit.prototype.fieldsForLeads = [];
    crm.Views.Activity.Edit.prototype.fieldsForStandard = [];
    crm.Views.Activity.Edit.prototype.onLeadChange = () => {};
    const companyEditAt = row => row.name === 'AccountName' && row.type === 'text';
    this.registerCustomization('edit', 'activity_edit', {
      at: function at(row) {
        return row.name === 'IsLead';
      },
      type: 'remove',
    });
    this.registerCustomization('edit', 'activity_edit', {
      at: companyEditAt,
      type: 'modify',
      value: {
        name: 'AccountName',
        property: 'AccountName',
        type: 'hidden',
        include: false,
      },
    });

    // Remove "for lead" toggle on history edit, along with company, always show lead lookup
    crm.Views.History.Edit.prototype.fieldsForLeads = [];
    crm.Views.History.Edit.prototype.fieldsForStandard = [];
    crm.Views.History.Edit.prototype.onLeadChange = () => {};
    this.registerCustomization('edit', 'history_edit', {
      at: function at(row) {
        return row.name === 'IsLead';
      },
      type: 'remove',
    });
    this.registerCustomization('edit', 'history_edit', {
      at: companyEditAt,
      type: 'modify',
      value: {
        name: 'AccountName',
        property: 'AccountName',
        type: 'hidden',
        include: false,
      },
    });

    // Remove the "company" field, which is the second AccountName binding
    const companyAt = row => row.name === 'AccountName' && typeof row.view === 'undefined';
    this.registerCustomization('detail', 'activity_detail', {
      at: companyAt,
      type: 'remove',
    });

    this.registerCustomization('detail', 'history_detail', {
      at: companyAt,
      type: 'remove',
    });

    const removeExcludedProperty = ['AccountName', 'ContactName', 'OpportunityName', 'TicketNumber'];
    removeExcludedProperty.forEach((prop) => {
      const at = row => row.name === prop;
      this.registerCustomization('detail', 'activity_detail', {
        at,
        type: 'modify',
        value: {
          exclude: null,
        },
      });
      this.registerCustomization('detail', 'history_detail', {
        at,
        type: 'modify',
        value: {
          exclude: null,
        },
      });
    });
  },
  loadAppStatePromises: function loadAppStatePromises() {
    const app = this.application;
    this.registerAppStatePromise(() => {
      return new Promise((resolve) => {
        // We are going to query the new activityAssociation endpoint to see if it 404 errors.
        // This will tell us what the server supports for activity associations, which started in 8.4.0.4
        const request = new Sage.SData.Client.SDataResourceCollectionRequest(app.getService())
          .setContractName('dynamic')
          .setResourceKind('activityAssociations')
          .setQueryArg('select', '$key')
          .setQueryArg('count', 1);

        request.read({
          success: () => {
            resolve(true);
            app.context.enableActivityAssociations = true;
          },
          failure: () => {
            resolve(false);
            app.context.enableActivityAssociations = false;
          },
        });
      });
    });
  },
});

export default __class;

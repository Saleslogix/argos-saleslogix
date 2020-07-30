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
import AssociationList from './Views/List';
import './Models/ActivityAssociation/Offline';
import './Models/ActivityAssociation/SData';

const resource = getResource('activityAssociationModule');

const __class = declare('crm.Integrations.ActivityAssociations.ApplicationModule', [ApplicationModule], {
  hasNewActivityAssociations: function hasNewActivityAssociations() {
    return this.application.context.enableActivityAssociations === true;
  },
  loadViewsDynamic: function loadViews() {
    if (!this.hasNewActivityAssociations()) {
      return;
    }

    this.registerView(new AssociationList({
      id: 'activity_association_related',
    }));
  },
  loadCustomizationsDynamic: function loadCustomizations() {
    if (!this.hasNewActivityAssociations()) {
      return;
    }

    this.registerCustomization('detail', 'activity_detail', {
      at(row) {
        return row.name === 'AccountName';
      },
      type: 'remove',
    });

    this.registerCustomization('detail', 'activity_detail', {
      at(row) {
        return row.name === 'ContactName';
      },
      type: 'remove',
    });

    this.registerCustomization('detail', 'activity_detail', {
      at(row) {
        return row.name === 'OpportunityName';
      },
      type: 'remove',
    });

    this.registerCustomization('detail', 'activity_detail', {
      at(row) {
        return row.name === 'TicketNumber';
      },
      type: 'remove',
    });

    this.registerCustomization('detail', 'activity_detail', {
      at(row) {
        return row.name === 'LeadName';
      },
      type: 'remove',
    });

    this.registerCustomization('detail', 'activity_detail', {
      at(row) {
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

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

import lang from 'dojo/_base/lang';
import string from 'dojo/string';
import utility from 'argos/Utility';
import getResource from 'argos/I18n';

const resource = getResource('action');
/**
 * @class crm.Action
 * @requires argos.Utility
 */
const __class = lang.setObject('crm.Action', {
  calledText: resource.calledText,
  emailedText: resource.emailedText,

  navigateToHistoryInsert: function navigateToHistoryInsert(entry, complete, title) {
    const view = App.getView('history_edit');
    if (view) {
      view.show({
        title,
        template: {},
        entry,
        insert: true,
      }, {
        complete,
      });
    }
  },
  recordToHistory: function recordToHistory(complete, o, title) {
    const entry = {
      UserId: App.context && App.context.user.$key,
      UserName: App.context && App.context.user.$descriptor,
      Duration: 15,
      CompletedDate: (new Date()),
    };
    lang.mixin(entry, o);

    this.navigateToHistoryInsert(entry, complete, title);
  },
  callPhone: function callPhone(action, selection, phoneProperty, title) {
    if (!selection || !selection.data) {
      return;
    }

    let actionInitiated = false;
    this.setSource({
      entry: selection.data,
      descriptor: selection.data.$descriptor,
      key: selection.data.$key,
    });

    lang.mixin(selection.data, {
      Type: 'atPhoneCall',
      Description: string.substitute(crm.Action.calledText, [selection.data.$descriptor]),
    });

    const value = utility.getValue(selection.data, phoneProperty, '');
    crm.Action.recordToHistory(() => {
      if (!actionInitiated) {
        App.initiateCall(value);
        actionInitiated = true;
      }
    }, selection.data, title);
  },
  sendEmail: function sendEmail(action, selection, emailProperty) {
    if (!selection || !selection.data) {
      return;
    }

    this.setSource({
      entry: selection.data,
      descriptor: selection.data.$descriptor,
      key: selection.data.$key,
    });

    lang.mixin(selection.data, {
      Type: 'atEmail',
      Description: string.substitute(crm.Action.emailedText, [selection.data.$descriptor]),
    });

    const value = utility.getValue(selection.data, emailProperty, '');
    crm.Action.recordToHistory(() => {
      App.initiateEmail(value);
    }, selection.data);
  },
  addNote: function addNote(action, selection) {
    const entry = selection.data;
    const key = selection.data.$key;
    const desc = selection.data.$descriptor;

    this.setSource({
      entry,
      descriptor: desc,
      key,
    });

    const view = App.getView('history_edit');

    if (view) {
      view.show({
        insert: true,
      });
    }
  },
  addActivity: function addActivity(action, selection) {
    this.setSource({
      entry: selection.data,
      descriptor: selection.data.$descriptor,
      key: selection.data.$key,
    });
    App.navigateToActivityInsertView();
  },
  navigateToEntity: function navigateToEntity(action, selection, o) {
    const options = {
      key: utility.getValue(selection.data, o.keyProperty),
      descriptor: utility.getValue(selection.data, o.textProperty),
    };

    const view = App.getView(o.view);

    if (view && options.key) {
      view.show(options);
    }
  },
  hasProperty: function hasProperty(action, selection, property) {
    return utility.getValue(selection.data, property);
  },
  addAttachment: function addAttachment(action, selection) {
    this.setSource({
      entry: selection.data,
      descriptor: selection.data.$descriptor,
      key: selection.data.$key,
    });

    const view = App.getView('attachment_Add');

    if (view) {
      view.show({
        insert: true,
      });
    }
  },
});

lang.setObject('Mobile.SalesLogix.Action', __class);
export default __class;

/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */
import lang from 'dojo/_base/lang';
import string from 'dojo/string';
import utility from 'argos/Utility';
import getResource from 'argos/I18n';

const resource = getResource('action');
/**
 * @class crm.Action
 *
 *
 * @requires argos.Utility
 *
 */
const __class = lang.setObject('crm.Action', {
  calledText: resource.calledText,
  emailedText: resource.emailedText,

  navigateToHistoryInsert: function navigateToHistoryInsert(entry, complete) {
    const view = App.getView('history_edit');
    if (view) {
      view.show({
        template: {},
        entry,
        insert: true,
      }, {
        complete,
      });
    }
  },
  recordToHistory: function recordToHistory(complete, o) {
    const entry = {
      UserId: App.context && App.context.user.$key,
      UserName: App.context && App.context.user.$descriptor,
      Duration: 15,
      CompletedDate: (new Date()),
    };
    lang.mixin(entry, o);

    this.navigateToHistoryInsert(entry, complete);
  },
  callPhone: function callPhone(action, selection, phoneProperty) {
    if (!selection || !selection.data) {
      return;
    }

    let appOpened = false;
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
      if (!appOpened) {
        App.initiateCall(value);
        appOpened = true;
      }
    }, selection.data);
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

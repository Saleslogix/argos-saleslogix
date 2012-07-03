define('localization/saleslogix/de', ['localization/de', 'Mobile/SalesLogix/ApplicationModule'], function() {

localize("Sage.Platform.Mobile.Fields.DateField", {
  "dateFormatText": "dd/MM/yyyy",
  "emptyText": "",
  "invalidDateFormatErrorText": "Ungült. Datumsformat in Feld '${0}'."
});

localize("Mobile.SalesLogix.Views.Activity.Complete", {
  "completedFormatText": "d.  M yyyy h:mm tt",
  "startingFormatText": "d.  M yyyy h:mm tt",
  "activityInfoText": "Aktivitätsinfo",
  "accountText": "Firma",
  "contactText": "Kontakt",
  "opportunityText": "Verk.chance",
  "ticketNumberText": "Ticket",
  "companyText": "Unternehmen",
  "leadText": "Inter.",
  "asScheduledText": "wie geplant",
  "categoryText": "Kategorie",
  "categoryTitleText": "Aktivit.kategorie",
  "completedText": "Abschlussdatum",
  "completionText": "Abschluss",
  "durationText": "Dauer",
  "durationInvalidText": "Feld '${2}' muss Wert enthalten.",
  "carryOverNotesText": "Notizen übertr.",
  "followUpText": "Folgeakt.",
  "followUpTitleText": "Typ für Nachfassen",
  "leaderText": "Organisator",
  "longNotesText": "Notizen",
  "longNotesTitleText": "Notizen",
  "otherInfoText": "Weit. Info",
  "priorityText": "Priorität",
  "priorityTitleText": "Priorität",
  "regardingText": "Betreff",
  "regardingTitleText": "Aktivität bezüglich",
  "resultText": "Ergebnis",
  "resultTitleText": "Ergebnis",
  "startingText": "Startdatum",
  "timelessText": "ohne Zeitangabe",
  "durationValueText": {
    "0": "keine",
    "15": "15 Minuten",
    "30": "30 Minuten",
    "60": "1 Stunde",
    "90": "1,5 Stunden",
    "120": "2 Stunden"
  },
  "followupValueText": {
    "none": "Keine",
    "atPhoneCall": "Anruf",
    "atAppointment": "Meeting",
    "atToDo": "Aufgabe",
    "atPersonal": "Persönliche Aktivität"
  }
});

localize("Mobile.SalesLogix.Views.Activity.Detail", {
  "startDateFormatText": "d/M/yyyy h:mm:ss tt",
  "timelessDateFormatText": "d/M/yyyy",
  "alarmDateFormatText": "d/M/yyyy h:mm:ss tt",
  "activityTypeText": {
    "atToDo": "Aufgabe",
    "atPhoneCall": "Anruf",
    "atAppointment": "Meeting",
    "atLiterature": "Literaturanfrage",
    "atPersonal": "Persönliche Aktivität"
  },
  "actionsText": "Schnellaktionen",
  "completeActivityText": "Aktivität abschließen",
  "completeOccurrenceText": "Ganzes Vorkommen",
  "completeSeriesText": "Ganze Abfolge",
  "locationText": "Standort",
  "alarmText": "Alarm",
  "alarmTimeText": "Alarm",
  "categoryText": "Kategorie",
  "durationText": "Dauer",
  "leaderText": "Organisator",
  "longNotesText": "Notizen",
  "priorityText": "Priorität",
  "regardingText": "Betreff",
  "rolloverText": "Auto-Rollover",
  "startTimeText": "Startzeit",
  "allDayText": "Ganztäg.",
  "timelessText": "ohne Zeitangabe",
  "titleText": "Aktivität",
  "typeText": "Typ",
  "companyText": "Unternehmen",
  "leadText": "Inter.",
  "accountText": "Firma",
  "contactText": "Kontakt",
  "opportunityText": "Verk.chance",
  "ticketNumberText": "Ticket",
  "whenText": "Wann",
  "whoText": "Wer",
  "recurrenceText": "Wiederholung",
  "confirmEditRecurrenceText": "Alle Vorkommen bearb.?\\nAbbrechen für Einzelbearb."
});

localize("Mobile.SalesLogix.Views.Activity.Edit", {
  "startingFormatText": "d.  M yyyy h:mm tt",
  "activityCategoryTitleText": "Aktivit.kategorie",
  "activityDescriptionTitleText": "Aktivitätsbeschreibung",
  "locationText": "Standort",
  "activityTypeTitleText": "Aktivitätstyp",
  "alarmText": "Alarm",
  "reminderText": "",
  "categoryText": "Kategorie",
  "durationText": "Dauer",
  "durationTitleText": "Dauer",
  "durationInvalidText": "Feld '${2}' muss Wert enthalten.",
  "reminderInvalidText": "Feld 'Erinnerung' muss einen Wert enth.",
  "reminderTitleText": "Erinnerung",
  "leaderText": "Organisator",
  "longNotesText": "Notizen",
  "longNotesTitleText": "Notizen",
  "priorityText": "Priorität",
  "priorityTitleText": "Priorität",
  "regardingText": "Betreff",
  "rolloverText": "Auto-Rollover",
  "startingText": "Startzeit",
  "repeatsText": "Wiederholung",
  "recurringText": "periodisch",
  "recurringTitleText": "Sich wiederholende Aktivität",
  "startingFormatTimelessText": "d/M/yyyy",
  "timelessText": "ohne Zeitangabe",
  "titleText": "Aktivität",
  "typeText": "Typ",
  "accountText": "Firma",
  "contactText": "Kontakt",
  "opportunityText": "Verk.chance",
  "ticketNumberText": "Ticket",
  "companyText": "Unternehmen",
  "leadText": "Inter.",
  "isLeadText": "für Inter.",
  "yesText": "JA",
  "noText": "NEIN",
  "updateUserActErrorText": "Fehler beim Aktualis. von Ben.aktivitäten.",
  "reminderValueText": {
    "0": "keine",
    "5": "5 Minuten",
    "15": "15 Minuten",
    "30": "30 Minuten",
    "60": "1 Stunde",
    "1440": "1 Tag"
  },
  "durationValueText": {
    "0": "keine",
    "15": "15 Minuten",
    "30": "30 Minuten",
    "60": "1 Stunde",
    "90": "1,5 Stunden",
    "120": "2 Stunden"
  }
});

localize("Mobile.SalesLogix.Views.Activity.List", {
  "startDateFormatText": "ddd d. M yy",
  "startTimeFormatText": "h:mm",
  "allDayText": "Täglich",
  "titleText": "Aktivitäten"
});

localize("Mobile.SalesLogix.Views.Calendar.DayView", {
  "dateHeaderFormatText": "dddd, dd/MM/yyyy",
  "startTimeFormatText": "h:mm",
  "titleText": "Kalender",
  "todayText": "Heute",
  "dayText": "Tag",
  "weekText": "Woche",
  "monthText": "Monat",
  "allDayText": "Täglich",
  "eventHeaderText": "Ereignisse",
  "activityHeaderText": "Aktivitäten",
  "eventMoreText": "${0} weit. Ereignis(se) anz.",
  "toggleCollapseText": "Ein-/Ausblenden"
});

localize("Mobile.SalesLogix.Views.Calendar.MonthView", {
  "monthTitleFormatText": "MMMM yyyy",
  "dayTitleFormatText": "ddd d. MMM yyyy",
  "startTimeFormatText": "h:mm",
  "titleText": "Kalender",
  "todayText": "Heute",
  "dayText": "Tag",
  "weekText": "Woche",
  "monthText": "Monat",
  "allDayText": "Täglich",
  "eventText": "Ereignis",
  "eventHeaderText": "Ereignisse",
  "countMoreText": "${0} weitere anzeigen",
  "activityHeaderText": "Aktivitäten",
  "toggleCollapseText": "Ein-/Ausblenden"
});

localize("Mobile.SalesLogix.Views.Calendar.WeekView", {
  "weekTitleFormatText": "d. MMM yyyy",
  "dayHeaderLeftFormatText": "dddd",
  "dayHeaderRightFormatText": "d. MMM yyyy",
  "startTimeFormatText": "h:mm",
  "titleText": "Kalender",
  "todayText": "Heute",
  "dayText": "Tag",
  "weekText": "Woche",
  "monthText": "Monat",
  "allDayText": "Täglich",
  "eventHeaderText": "Ereignisse",
  "eventMoreText": "${0} weit. Ereignis(se) anz.",
  "toggleCollapseText": "Ein-/Ausblenden"
});

localize("Mobile.SalesLogix.Views.ErrorLog.Detail", {
  "errorDateFormatText": "dd/MM/yyyy hh:mm tt",
  "titleText": "Fehlerprotokoll",
  "detailsText": "Details",
  "errorDateText": "Datum",
  "statusTextText": "Fehler",
  "urlText": "URL",
  "moreDetailsText": "Mehr Details",
  "severityText": "Schwere",
  "statusCodeText": "Statuscode",
  "errorText": "Fehler",
  "emailSubjectText": "Fehler von Sage SalesLogix Mobile Client empfangen",
  "copiedSuccessText": "In Zw.ablage kopiert"
});

localize("Mobile.SalesLogix.Views.ErrorLog.List", {
  "errorDateFormatText": "dd/MM/yyyy hh:mm tt",
  "titleText": "Fehlerprotokolle"
});

localize("Mobile.SalesLogix.Views.Event.Detail", {
  "startDateFormatText": "d/M/yyyy h:mm:ss tt",
  "endDateFormatText": "d/M/yyyy h:mm:ss tt",
  "eventTypeText": {
    "atToDo": "Aufgabe",
    "atPhoneCall": "Anruf",
    "atAppointment": "Meeting",
    "atLiterature": "Literaturanfrage",
    "atPersonal": "Persönliche Aktivität"
  },
  "actionsText": "Schnellaktionen",
  "startTimeText": "Startdatum",
  "endTimeText": "Enddatum",
  "titleText": "Ereignis",
  "descriptionText": "Beschreib.",
  "typeText": "Typ",
  "whenText": "Wann"
});

localize("Mobile.SalesLogix.Views.Event.List", {
  "eventDateFormatText": "d/M/yyyy",
  "titleText": "Ereignisse",
  "eventText": "Ereignis"
});

localize("Mobile.SalesLogix.Views.History.Detail", {
  "dateFormatText": "d/M/yyyy h:mm:ss tt",
  "categoryText": "Kategorie",
  "completedText": "abgeschl.",
  "durationText": "Dauer",
  "leaderText": "Organisator",
  "longNotesText": "Notizen",
  "notesText": "Notizen",
  "priorityText": "Priorität",
  "regardingText": "Betreff",
  "scheduledByText": "Geplant von",
  "scheduledText": "geplant",
  "timelessText": "ohne Zeitangabe",
  "companyText": "Unternehmen",
  "leadText": "Inter.",
  "titleText": "Historie",
  "accountText": "Firma",
  "contactText": "Kontakt",
  "opportunityText": "Verk.chance",
  "ticketNumberText": "Ticket",
  "moreDetailsText": "Mehr Details",
  "relatedItemsText": "Zugeh. Elemente",
  "modifiedText": "geändert",
  "typeText": "Typ",
  "activityTypeText": {
    "atToDo": "Aufgabe",
    "atPhoneCall": "Anruf",
    "atAppointment": "Meeting",
    "atLiterature": "Literaturanfrage",
    "atPersonal": "Persönliche Aktivität",
    "atQuestion": "Frage",
    "atEMail": "E-Mail"
  }
});

localize("Mobile.SalesLogix.Views.History.Edit", {
  "startingFormatText": "d.  M yyyy h:mm tt",
  "accountText": "Firma",
  "noteDescriptionTitleText": "Notizbeschreibg.",
  "contactText": "Kontakt",
  "longNotesText": "Notizen",
  "longNotesTitleText": "Notizen",
  "opportunityText": "Verk.chance",
  "ticketNumberText": "Ticket",
  "regardingText": "Betreff",
  "isLeadText": "für Inter.",
  "startingText": "Zeit",
  "titleText": "Notiz",
  "companyText": "Unternehmen",
  "leadText": "Inter.",
  "relatedItemsText": "Zugeh. Elemente",
  "yesText": "JA",
  "noText": "NEIN"
});

localize("Mobile.SalesLogix.Views.History.List", {
  "hourMinuteFormatText": "h:mm",
  "dateFormatText": "d. M yy",
  "activityTypeText": {
    "atToDo": "Aufgabe",
    "atPhoneCall": "Anruf",
    "atAppointment": "Meeting",
    "atLiterature": "Literaturanfrage",
    "atPersonal": "Persönliche Aktivität",
    "atQuestion": "Frage",
    "atEMail": "E-Mail"
  },
  "hashTagQueriesText": {
    "note": "Notiz",
    "phonecall": "Anruf",
    "meeting": "Meeting",
    "personal": "Persönl.",
    "email": "E-Mail"
  },
  "titleText": "Notizen/Historie"
});

localize("Mobile.SalesLogix.Views.TicketActivity.List", {
  "startDateFormatText": "dd/MM/yyyy h:mmtt",
  "titleText": "Ticket-Aktivitäten"
});

localize("Sage.Platform.Mobile.Calendar", {
  "titleText": "Kalender",
  "amText": "AM",
  "pmText": "PM"
});

localize("Sage.Platform.Mobile.Detail", {
  "editText": "Bearbeiten",
  "titleText": "Detail",
  "detailsText": "Details",
  "toggleCollapseText": "Ein-/Ausblenden",
  "loadingText": "Laden...",
  "requestErrorText": "Serverfehler beim Anfordern von Daten.",
  "notAvailableText": "Angeforderter Eintrag nicht verfügbar."
});

localize("Sage.Platform.Mobile.Edit", {
  "saveText": "Speichern",
  "titleText": "Bearbeiten",
  "toggleCollapseText": "Ein-/Ausblenden",
  "validationSummaryText": "Validierungszus.fass.",
  "detailsText": "Details",
  "loadingText": "Laden...",
  "requestErrorText": "Serverfehler beim Anfordern von Daten."
});

localize("Sage.Platform.Mobile.Fields.BooleanField", {
  "onText": "AN",
  "offText": "AUS"
});

localize("Sage.Platform.Mobile.Fields.DurationField", {
  "emptyText": "",
  "invalidDurationErrorText": "Keine gültige Dauer in Feld '${0}'.",
  "autoCompleteText": {
    "minute(s)": "1",
    "hour(s)": "60",
    "day(s)": "1440",
    "week(s)": "10080",
    "year(s)": "525960"
  }
});

localize("Sage.Platform.Mobile.Fields.EditorField", {
  "lookupLabelText": "Bearb.",
  "lookupText": "...",
  "emptyText": "leer",
  "completeText": "OK"
});

localize("Sage.Platform.Mobile.Fields.LookupField", {
  "dependentErrorText": "Wertauswahl nötig für '${0}'.",
  "emptyText": "",
  "completeText": "Auswählen",
  "lookupLabelText": "Suchen",
  "lookupText": "..."
});

localize("Sage.Platform.Mobile.Fields.NoteField", {
  "attributeMap": {
    "noteText": {
      "node": "inputNode",
      "type": "innerHTML"
    }
  },
  "emptyText": ""
});

localize("Sage.Platform.Mobile.Fields.SignatureField", {
  "emptyText": "",
  "titleText": "Signatur",
  "signatureLabelText": "Signatur",
  "signatureText": "..."
});

localize("Sage.Platform.Mobile.GroupedList", {
  "toggleCollapseText": "Ein-/Ausblenden"
});

localize("Sage.Platform.Mobile.List", {
  "moreText": "Mehr Datensätze abr.",
  "emptySelectionText": "Keine",
  "titleText": "Liste",
  "remainingText": "Noch ${0} Datensätze",
  "cancelText": "Abbrechen",
  "insertText": "Neu",
  "noDataText": "keine Datensätze",
  "loadingText": "Laden...",
  "requestErrorText": "Serverfehler beim Anfordern von Daten."
});

localize("Sage.Platform.Mobile.MainToolbar", {
  "titleText": "Mobil"
});

localize("Sage.Platform.Mobile.SearchWidget", {
  "searchText": "Suchen"
});

localize("Sage.Platform.Mobile.View", {
  "titleText": "Allg. Ansicht"
});

localize("Sage.Platform.Mobile.Views.Signature", {
  "titleText": "Signatur",
  "clearCanvasText": "Löschen",
  "undoText": "Rückgängig"
});

localize("Mobile.SalesLogix.Fields.AddressField", {
  "lookupLabelText": "Bearb.",
  "emptyText": "keine Adr."
});

localize("Mobile.SalesLogix.Fields.NameField", {
  "emptyText": "kein Name"
});

localize("Mobile.SalesLogix.Fields.RecurrencesField", {
  "titleText": "Sich wiederholende Aktivität",
  "emptyText": "",
  "attributeMap": {
    "noteText": {
      "node": "inputNode",
      "type": "innerHTML"
    }
  }
});

localize("Mobile.SalesLogix.Views.Account.Detail", {
  "accountText": "Firma",
  "acctMgrText": "Acct Mgr",
  "addressText": "Adresse",
  "businessDescriptionText": "Beschreibg",
  "createDateText": "Erstellt am",
  "createUserText": "Erstellt von",
  "faxText": "Fax",
  "importSourceText": "Int.quelle",
  "industryText": "Branche",
  "notesText": "Notizen",
  "ownerText": "Eigentümer",
  "phoneText": "Tel.",
  "activityTypeText": {
    "atPhoneCall": "Anruf"
  },
  "actionsText": "Schnellaktionen",
  "relatedActivitiesText": "Aktivitäten",
  "relatedContactsText": "Kontakte",
  "relatedHistoriesText": "Notizen/Historie",
  "relatedItemsText": "Zugeh. Elemente",
  "relatedNotesText": "Notizen",
  "relatedOpportunitiesText": "Verkaufschancen",
  "relatedTicketsText": "Tickets",
  "relatedAddressesText": "Adressen",
  "statusText": "Status",
  "subTypeText": "Untertyp",
  "titleText": "Firma",
  "typeText": "Typ",
  "webText": "Web",
  "callMainNumberText": "Hauptnr. anrufen",
  "scheduleActivityText": "Aktivität planen",
  "addNoteText": "Notiz hinzuf",
  "viewAddressText": "Adresse anz.",
  "moreDetailsText": "Mehr Details",
  "calledText": "${0} angerufen"
});

localize("Mobile.SalesLogix.Views.Account.Edit", {
  "accountStatusTitleText": "Firmenstatus",
  "accountSubTypeTitleText": "Firmenuntertyp",
  "accountText": "Firma",
  "accountTypeTitleText": "Firmentyp",
  "acctMgrText": "Acct Mgr",
  "businessDescriptionText": "Beschreibg",
  "businessDescriptionTitleText": "Unternehmensbeschreibung",
  "descriptionText": "Beschr.",
  "faxText": "Fax",
  "fullAddressText": "Adresse",
  "importSourceText": "Int.quelle",
  "industryText": "Branche",
  "industryTitleText": "Branche",
  "ownerText": "Eigentümer",
  "phoneText": "Tel.",
  "statusText": "Status",
  "subTypeText": "Untertyp",
  "titleText": "Firma",
  "typeText": "Typ",
  "webText": "Web"
});

localize("Mobile.SalesLogix.Views.Account.List", {
  "titleText": "Firmen",
  "activitiesText": "Aktivitäten",
  "notesText": "Notizen",
  "scheduleText": "Planen"
});

localize("Mobile.SalesLogix.Views.Activity.Recurring", {
  "startingText": "Startdatum",
  "repeatsText": "Wiederholung",
  "everyText": "alle",
  "afterCompletionText": "nach Abschluss",
  "singleWeekdayText": "Wochentag",
  "weekdaysText": "Wochentag(e)",
  "dayText": "Tag",
  "monthText": "Monat",
  "onText": "am",
  "occurrencesText": "Wiederholungen",
  "summaryText": "Zus.fassung",
  "frequencyOptionsText": {
    "0": "Tage",
    "1": "Wochen",
    "2": "Monate",
    "3": "Jahre"
  },
  "recurringFrequencyText": "Häufigkeit",
  "yesText": "Ja",
  "noText": "Nein",
  "titleText": "Wiederholung"
});

localize("Mobile.SalesLogix.Views.Activity.TypesList", {
  "titleText": "Planen...",
  "activityTypeText": {
    "atToDo": "Aufgabe",
    "atPhoneCall": "Anruf",
    "atAppointment": "Meeting",
    "atLiterature": "Literaturanfrage",
    "atPersonal": "Persönliche Aktivität",
    "event": "Ereignis"
  }
});

localize("Mobile.SalesLogix.Views.AddAccountContact", {
  "accountNameText": "Firma",
  "accountStatusTitleText": "Firmenstatus",
  "accountSubTypeTitleText": "Firmenuntertyp",
  "accountText": "Firma",
  "accountTypeTitleText": "Firmentyp",
  "addressText": "Adresse",
  "contactTitleText": "Titel",
  "descriptionText": "Beschreib.",
  "detailsAccountText": "Firmeninfo",
  "detailsContactText": "Kontaktinfo",
  "detailsText": "Kontakt-/Firmeninfo",
  "emailText": "E-Mail",
  "faxText": "Fax",
  "homePhoneText": "Tel privat",
  "industryText": "Branche",
  "lastNameText": "Nachname",
  "mobileText": "Mobil",
  "nameText": "Name",
  "statusText": "Status",
  "subTypeText": "Untertyp",
  "titleText": "Firma/Kontakt hinzuf",
  "typeText": "Typ",
  "webText": "Web",
  "workText": "Geschäftl.",
  "industryTitleText": "Branche"
});

localize("Mobile.SalesLogix.Views.Address.Edit", {
  "address1Text": "Adresse 1",
  "address2Text": "Adresse 2",
  "address3Text": "Adresse 3",
  "cityText": "Stadt",
  "cityTitleText": "Stadt",
  "countryText": "Land",
  "countryTitleText": "Land",
  "descriptionText": "Beschreib.",
  "descriptionTitleText": "Beschreibung",
  "isMailingText": "Lieferung",
  "isPrimaryText": "Haupt",
  "postalCodeText": "PLZ",
  "salutationText": "Zu Händen",
  "stateText": "Bundesl.",
  "stateTitleText": "Bundesland/Kanton",
  "titleText": "Adresse"
});

localize("Mobile.SalesLogix.Views.Address.List", {
  "titleText": "Adressen"
});

localize("Mobile.SalesLogix.Views.AreaCategoryIssueLookup", {
  "titleText": "Firmen"
});

localize("Mobile.SalesLogix.Views.Competitor.List", {
  "titleText": "Mitbewerber"
});

localize("Mobile.SalesLogix.Views.Configure", {
  "titleText": "Konfigur."
});

localize("Mobile.SalesLogix.Views.Contact.Detail", {
  "activityTypeText": {
    "atPhoneCall": "Anruf",
    "atEMail": "E-Mail"
  },
  "accountText": "Firma",
  "acctMgrText": "Acct Mgr",
  "addressText": "Adresse",
  "contactTitleText": "Titel",
  "createDateText": "Erstellt am",
  "createUserText": "Erstellt von",
  "emailText": "E-Mail",
  "faxText": "Fax",
  "homeText": "Tel privat",
  "nameText": "Kontakt",
  "ownerText": "Eigentümer",
  "actionsText": "Schnellaktionen",
  "relatedAccountsText": "Firmen",
  "relatedActivitiesText": "Aktivitäten",
  "relatedHistoriesText": "Notizen/Historie",
  "relatedItemsText": "Zugeh. Elemente",
  "relatedNotesText": "Notizen",
  "relatedOpportunitiesText": "Verkaufschancen",
  "relatedTicketsText": "Tickets",
  "relatedAddressesText": "Adressen",
  "titleText": "Kontakt",
  "webText": "Web",
  "workText": "Tel.",
  "cuisinePreferenceText": "Küche",
  "callMobileNumberText": "Auf Handy anr.",
  "callWorkNumberText": "Hauptnr. anrufen",
  "scheduleActivityText": "Aktivität planen",
  "addNoteText": "Notiz hinzuf",
  "sendEmailText": "E-Mail senden",
  "viewAddressText": "Adresse anz.",
  "moreDetailsText": "Mehr Details"
});

localize("Mobile.SalesLogix.Views.Contact.Edit", {
  "titleText": "Kontakt",
  "nameText": "Name",
  "workText": "Tel.",
  "mobileText": "Mobil",
  "emailText": "E-Mail",
  "webText": "Web",
  "acctMgrText": "Acct Mgr",
  "accountNameText": "Firma",
  "homePhoneText": "Tel privat",
  "faxText": "Fax",
  "addressText": "Adresse",
  "contactTitleText": "Titel",
  "titleTitleText": "Titel",
  "addressTitleText": "Adresse",
  "ownerText": "Eigentümer",
  "cuisinePreferenceText": "Küche",
  "cuisinePreferenceTitleText": "Küche"
});

localize("Mobile.SalesLogix.Views.Contact.List", {
  "titleText": "Kontakte",
  "activitiesText": "Aktivitäten",
  "notesText": "Notizen",
  "scheduleText": "Planen"
});

localize("Mobile.SalesLogix.Views.Contract.List", {
  "titleText": "Verträge"
});

localize("Mobile.SalesLogix.Views.Event.Edit", {
  "titleText": "Ereignis",
  "typeText": "Typ",
  "descriptionText": "Beschreib.",
  "startDateText": "Startdatum",
  "endDateText": "Enddatum"
});

localize("Mobile.SalesLogix.Views.FooterToolbar", {
  "copyrightText": "&copy; 2012 Sage Software, Inc. Alle Rechte vorbehalten.",
  "logOutConfirmText": "Möchten Sie sich wirkl. abmelden?",
  "settingsText": "Einstell",
  "helpText": "Hilfe",
  "topText": "Oben",
  "logOutText": "Abmelden"
});

localize("Mobile.SalesLogix.Views.Help", {
  "titleText": "Hilfe",
  "errorText": "Fehler",
  "errorMessageText": "Laden von Hilfedok. nicht möglich"
});

localize("Mobile.SalesLogix.Views.Home", {
  "configureText": "Konfigur.",
  "addAccountContactText": "Firma/Kontakt hinzuf",
  "titleText": "Home",
  "actionsText": "Schnellaktionen",
  "viewsText": "Gehe zu"
});

localize("Mobile.SalesLogix.Views.Lead.Detail", {
  "activityTypeText": {
    "atPhoneCall": "Anruf",
    "atEMail": "E-Mail"
  },
  "accountText": "Unternehmen",
  "addressText": "Adresse",
  "businessDescriptionText": "Beschreibg",
  "createDateText": "Erstellt am",
  "createUserText": "Erstellt von",
  "eMailText": "E-Mail",
  "leadSourceText": "Int.quelle",
  "industryText": "Branche",
  "interestsText": "Interessen",
  "leadTitleText": "Titel",
  "nameText": "Name",
  "notesText": "Kommentare",
  "ownerText": "Eigentümer",
  "relatedActivitiesText": "Aktivitäten",
  "relatedHistoriesText": "Notizen/Historie",
  "relatedItemsText": "Zugeh. Elemente",
  "relatedNotesText": "Notizen",
  "sicCodeText": "BDI-Code",
  "titleText": "Interessent",
  "tollFreeText": "Gebührenfrei",
  "webText": "Web",
  "workText": "Tel.",
  "actionsText": "Schnellaktionen",
  "callWorkNumberText": "Hauptnr. anrufen",
  "scheduleActivityText": "Aktivität planen",
  "addNoteText": "Notiz hinzuf",
  "sendEmailText": "E-Mail senden",
  "viewAddressText": "Adresse anz.",
  "moreDetailsText": "Mehr Details",
  "calledText": "${0} angerufen",
  "emailedText": "E-Mail an ${0}"
});

localize("Mobile.SalesLogix.Views.Lead.Edit", {
  "accountText": "Firma",
  "addressText": "Adresse",
  "businessText": "Beschreibg",
  "businessTitleText": "Unternehmensbeschreibung",
  "companyText": "Unternehmen",
  "contactTitleText": "Titel",
  "emailText": "E-Mail",
  "faxText": "Fax",
  "importSourceText": "Int.quelle",
  "industryText": "Branche",
  "industryTitleText": "Branche",
  "interestsText": "Interessen",
  "leadNameLastFirstText": "Name",
  "leadOwnerText": "Eigentümer",
  "nameText": "Name",
  "notesText": "Kommentare",
  "notesTitleText": "Kommentare",
  "sicCodeText": "BDI-Code",
  "titleText": "Interessent",
  "titleTitleText": "Titel",
  "tollFreeText": "Gebührenfrei",
  "webText": "Web",
  "workText": "Tel."
});

localize("Mobile.SalesLogix.Views.Lead.List", {
  "titleText": "Interessenten",
  "activitiesText": "Aktivitäten",
  "notesText": "Notizen",
  "scheduleText": "Planen"
});

localize("Mobile.SalesLogix.Views.LeadSource.List", {
  "titleText": "Interessentenquellen"
});

localize("Mobile.SalesLogix.Views.Login", {
  "copyrightText": "&copy; 2012 Sage Software, Inc. Alle Rechte vorbehalten.",
  "logOnText": "Anmelden",
  "passText": "Passwort",
  "rememberText": "Speichern",
  "titleText": "Sage SalesLogix",
  "userText": "Ben.name",
  "invalidUserText": "Benutzername/Passwort ist ungültig.",
  "missingUserText": "Benutzerdatensatz nicht gefund",
  "serverProblemText": "Problem auf dem Server.",
  "requestAbortedText": "Anforderung abgebrochen."
});

localize("Mobile.SalesLogix.Views.MainToolbar", {
  "titleText": "Sage Saleslogix"
});

localize("Mobile.SalesLogix.Views.NameEdit", {
  "titleText": "Name bearbeiten",
  "firstNameText": "Vorname",
  "middleNameText": "2. Vorname",
  "lastNameText": "Nachname",
  "prefixText": "Präfix",
  "prefixTitleText": "Präfix",
  "suffixText": "Suffix",
  "suffixTitleText": "Suffix"
});

localize("Mobile.SalesLogix.Views.Opportunity.Detail", {
  "accountText": "Firma",
  "acctMgrText": "Acct Mgr",
  "estCloseText": "Vor. Abschl.",
  "fbarHomeTitleText": "Home",
  "fbarScheduleTitleText": "Planen",
  "importSourceText": "Int.quelle",
  "opportunityText": "Verk.chance",
  "ownerText": "Eigentümer",
  "actionsText": "Schnellaktionen",
  "potentialText": "VK-Potenzial",
  "probabilityText": "Abschl.wahrsch.",
  "relatedActivitiesText": "Aktivitäten",
  "relatedContactsText": "Kontakte für Verkaufschance",
  "relatedHistoriesText": "Notizen/Historie",
  "relatedItemsText": "Zugeh. Elemente",
  "relatedNotesText": "Notizen",
  "relatedProductsText": "Produkte",
  "resellerText": "Wiederverk.",
  "statusText": "Status",
  "titleText": "Verkaufschance",
  "typeText": "Typ",
  "scheduleActivityText": "Aktivität planen",
  "addNoteText": "Notiz hinzuf",
  "moreDetailsText": "Mehr Details"
});

localize("Mobile.SalesLogix.Views.Opportunity.Edit", {
  "accountText": "Firma",
  "acctMgrText": "Acct Mgr",
  "estCloseText": "Vor. Abschl.",
  "importSourceText": "Int.quelle",
  "opportunityStatusTitleText": "Status der Verkaufschance",
  "opportunityText": "Verk.chance",
  "opportunityTypeTitleText": "Verkaufschancentyp",
  "ownerText": "Eigentümer",
  "potentialText": "VK-Potenzial",
  "probabilityText": "Abschl.wahrsch.",
  "probabilityTitleText": "VK-Chancen-Wahrscheinlichk.",
  "resellerText": "Wiederverk.",
  "statusText": "Status",
  "titleText": "Verkaufschance",
  "typeText": "Typ"
});

localize("Mobile.SalesLogix.Views.Opportunity.List", {
  "titleText": "Verkaufschancen",
  "activitiesText": "Aktivitäten",
  "notesText": "Notizen",
  "scheduleText": "Planen",
  "hashTagQueriesText": {
    "open": "offen",
    "closed": "abgeschl.",
    "won": "erfolgr.",
    "lost": "verlor."
  }
});

localize("Mobile.SalesLogix.Views.OpportunityContact.Detail", {
  "titleText": "Kontakt für Verkaufschance",
  "accountText": "Firma",
  "contactTitleText": "Titel",
  "nameText": "Kontakt",
  "moreDetailsText": "Mehr Details",
  "salesRoleText": "Rolle",
  "strategyText": "Strategie",
  "personalBenefitsText": "pers. Vorteile",
  "standingText": "Bewertung",
  "issuesText": "Probleme",
  "competitorNameText": "Einst. Mitbewerber",
  "removeContactTitleText": "Kontakt entfernen",
  "confirmDeleteText": "\"${0}\" aus VK-Chance entfernen?",
  "contactText": "Kontakt"
});

localize("Mobile.SalesLogix.Views.OpportunityContact.Edit", {
  "titleText": "VK-Chancenkont. bearb.",
  "nameText": "Name",
  "accountNameText": "Firma",
  "contactTitleText": "Titel",
  "salesRoleText": "Rolle",
  "salesRoleTitleText": "Rolle",
  "personalBenefitsText": "pers. Vorteile",
  "strategyText": "Strategie",
  "issuesText": "Probleme",
  "standingText": "Bewertung",
  "standingTitleText": "Bewertung",
  "contactText": "Kontakt",
  "competitorPrefText": "Einst. Mitbewerber"
});

localize("Mobile.SalesLogix.Views.OpportunityContact.List", {
  "titleText": "Kontakte für Verkaufschance",
  "selectTitleText": "Kontakt auswählen",
  "activitiesText": "Aktivitäten",
  "notesText": "Notizen",
  "scheduleText": "Planen"
});

localize("Mobile.SalesLogix.Views.OpportunityProduct.List", {
  "titleText": "Produkte"
});

localize("Mobile.SalesLogix.Views.Owner.List", {
  "titleText": "Zugriffsberechtigte"
});

localize("Mobile.SalesLogix.Views.Settings", {
  "clearLocalStorageTitleText": "Speich. löschen",
  "clearAuthenticationTitleText": "Gesp. Anm.daten löschen",
  "errorLogTitleText": "Fehlerprot. anz.",
  "localStorageClearedText": "Lokaler Speicher erfolgr. gelöscht.",
  "credentialsClearedText": "Gesp. Anmeldedaten erfolgr. gelöscht.",
  "titleText": "Einstell"
});

localize("Mobile.SalesLogix.Views.TextEdit", {
  "titleText": "Text bearbeiten"
});

localize("Mobile.SalesLogix.Views.Ticket.Detail", {
  "accountText": "Firma",
  "areaText": "Bereich",
  "assignedDateText": "Zugewiesen am",
  "assignedToText": "Zugewiesen zu",
  "categoryText": "Kategorie",
  "contactText": "Kontakt",
  "contractText": "Vertrag",
  "descriptionText": "Beschr.",
  "issueText": "Problem",
  "needByText": "Fälligk.datum",
  "notesText": "Kommentare",
  "phoneText": "Tel.",
  "actionsText": "Schnellaktionen",
  "relatedActivitiesText": "Aktivitäten",
  "relatedItemsText": "Zugeh. Elemente",
  "resolutionText": "Lösung",
  "sourceText": "Quelle",
  "statusText": "Status",
  "subjectText": "Betreff",
  "ticketIdText": "Ticket-Nr.",
  "titleText": "Ticket",
  "urgencyText": "Dringlichk.",
  "scheduleActivityText": "Aktivität planen",
  "moreDetailsText": "Mehr Details",
  "relatedTicketActivitiesText": "Ticket-Aktivitäten",
  "loadingText": "Laden..."
});

localize("Mobile.SalesLogix.Views.Ticket.Edit", {
  "accountText": "Firma",
  "areaText": "Bereich",
  "assignedDateText": "Zugewiesen am",
  "assignedToText": "Zugewiesen zu",
  "categoryText": "Kategorie",
  "contactText": "Kontakt",
  "contractText": "Vertrag",
  "descriptionText": "Beschr.",
  "descriptionTitleText": "Beschreibung",
  "issueText": "Problem",
  "needByText": "Fälligk.datum",
  "notesText": "Kommentare",
  "notesTitleText": "Kommentare",
  "phoneText": "Tel.",
  "relatedActivitiesText": "Aktivitäten",
  "relatedItemsText": "Zugeh. Elemente",
  "resolutionText": "Lösung",
  "resolutionTitleText": "Lösung",
  "sourceText": "Quelle",
  "sourceTitleText": "Quelle",
  "statusText": "Status",
  "subjectText": "Betreff",
  "ticketAreaTitleText": "Ticket-Bereich",
  "ticketCategoryTitleText": "Ticket-Kategorie",
  "ticketIdText": "Ticket-Nr.",
  "ticketIssueTitleText": "Ticket-Probl.",
  "ticketStatusTitleText": "Ticket-Status",
  "ticketUrgencyTitleText": "Ticket-Dringlichk.",
  "titleText": "Ticket",
  "urgencyText": "Dringlichk."
});

localize("Mobile.SalesLogix.Views.Ticket.List", {
  "titleText": "Tickets",
  "activitiesText": "Aktivitäten",
  "scheduleText": "Planen",
  "notAssignedText": "Nicht zugewiesen"
});

localize("Mobile.SalesLogix.Views.Ticket.UrgencyLookup", {
  "titleText": "Ticket-Dringlichk."
});

localize("Mobile.SalesLogix.Views.TicketActivity.Detail", {
  "titleText": "Ticket-Aktivität",
  "accountText": "Firma",
  "contactText": "Kontakt",
  "typeText": "Typ",
  "publicAccessText": "Öff. Zugriff",
  "assignedDateText": "Startdatum",
  "completedDateText": "Enddatum",
  "followUpText": "Folgeakt.",
  "unitsText": "Zeiteinh.",
  "elapsedUnitsText": "Verstrichene Einheiten",
  "rateTypeDescriptionText": "Gebührentyp",
  "rateText": "Gebühr",
  "totalLaborText": "Arbeit gesamt",
  "totalPartsText": "Teile gesamt",
  "totalFeeText": "Gebühr gesamt",
  "activityDescriptionText": "Kommentare",
  "ticketNumberText": "Ticket-Nr.",
  "userText": "Benutzer",
  "completeTicketText": "Ticket-Aktivität abschließen",
  "moreDetailsText": "Mehr Details",
  "relatedItemsText": "Zugeh. Elemente",
  "relatedTicketActivityItemText": "Ticket-Aktivität (Teile)"
});

localize("Mobile.SalesLogix.Views.TicketActivity.Edit", {
  "titleText": "Ticket-Aktivität bearbeiten",
  "activityTypeText": "Typ",
  "activityTypeTitleText": "Typ",
  "publicAccessText": "Öff. Zugriff",
  "publicAccessTitleText": "Öffentlicher Zugriff",
  "userText": "Benutzer",
  "startDateText": "Startdatum",
  "endDateText": "Enddatum",
  "commentsText": "Kommentare"
});

localize("Mobile.SalesLogix.Views.TicketActivity.RateLookup", {
  "titleText": "Gebühren"
});

localize("Mobile.SalesLogix.Views.TicketActivityItem.Detail", {
  "titleText": "Ticket-Aktivität (Teil)",
  "productNameText": "Produkt",
  "skuText": "SKU",
  "serialNumberText": "Seriennr.",
  "itemAmountText": "Preis",
  "itemDescriptionText": "Beschreib."
});

localize("Mobile.SalesLogix.Views.TicketActivityItem.List", {
  "titleText": "Ticket-Aktivität (Teile)"
});

localize("Mobile.SalesLogix.UpdateToolbar", {
  "updateText": "Update verfügbar.  Zum Neuladen klicken."
});

localize("Mobile.SalesLogix.Views.User.List", {
  "titleText": "Benutzer"
});
});
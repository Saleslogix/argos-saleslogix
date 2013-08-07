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
  "leadText": "Interessent",
  "asScheduledText": "wie geplant",
  "categoryText": "Kategorie",
  "categoryTitleText": "Aktivit.kategorie",
  "completedText": "Abschlussdatum",
  "completionText": "Abschluss",
  "durationText": "Dauer",
  "durationInvalidText": "Feld '${2}' muss Wert enthalten.",
  "carryOverNotesText": "Notizen übertragen",
  "followUpText": "Folgeaktivität",
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
  "startingFormatTimelessText": "d/M/yyyy",
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
  "allDayText": "Ganztägig",
  "timelessText": "ohne Zeitangabe",
  "titleText": "Aktivität",
  "typeText": "Typ",
  "companyText": "Unternehmen",
  "leadText": "Interessent",
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
  "leadText": "Interessent",
  "isLeadText": "Für Interessent",
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
  "descriptionText": "Beschreibung",
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
  "completedText": "Abgeschlossen",
  "durationText": "Dauer",
  "leaderText": "Organisator",
  "longNotesText": "Notizen",
  "notesText": "Notizen",
  "priorityText": "Priorität",
  "regardingText": "Betreff",
  "completedByText": "abgeschlossen von",
  "scheduledText": "geplant",
  "timelessText": "ohne Zeitangabe",
  "companyText": "Unternehmen",
  "leadText": "Interessent",
  "titleText": "Historie",
  "accountText": "Firma",
  "contactText": "Kontakt",
  "opportunityText": "Verk.chance",
  "ticketNumberText": "Ticket",
  "moreDetailsText": "Mehr Details",
  "relatedItemsText": "Zugehörige Elemente",
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
  "isLeadText": "Für Interessent",
  "startingText": "Zeit",
  "titleText": "Notiz",
  "companyText": "Unternehmen",
  "leadText": "Interessent",
  "relatedItemsText": "Zugehörige Elemente",
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
    "personal": "Persönlich",
    "email": "E-Mail"
  },
  "titleText": "Notizen/Historie",
  "viewAccountActionText": "Firma",
  "viewOpportunityActionText": "VK-Chance",
  "viewContactActionText": "Kontakt"
});

localize("Mobile.SalesLogix.Views.TicketActivity.Edit", {
  "startingFormatText": "d.  M yyyy h:mm tt",
  "titleText": "Ticket-Aktivität bearbeiten",
  "activityTypeText": "Typ",
  "activityTypeTitleText": "Typ",
  "publicAccessText": "öffentl. Zugriff",
  "publicAccessTitleText": "Öffentlicher Zugriff",
  "userText": "Benutzer",
  "startDateText": "Startdatum",
  "endDateText": "Enddatum",
  "commentsText": "Kommentare"
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

localize("Sage.Platform.Mobile.ErrorManager", {
  "abortedText": "Abgebrochen",
  "scopeSaveText": "Bereich wird nicht im Fehlerbericht gespeichert"
});

localize("Sage.Platform.Mobile.Fields.BooleanField", {
  "onText": "AN",
  "offText": "AUS"
});

localize("Sage.Platform.Mobile.Fields.DurationField", {
  "emptyText": "",
  "invalidDurationErrorText": "Keine gültige Dauer in Feld '${0}'.",
  "autoCompleteText": {
    "1": "Minute(n)",
    "60": "Stunde(n)",
    "1440": "Tag(e)",
    "10080": "Woche(n)",
    "525960": "Jahr(e)"
  }
});

localize("Sage.Platform.Mobile.Fields.EditorField", {
  "lookupLabelText": "Bearbeiten",
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
  "emptyText": ""
});

localize("Sage.Platform.Mobile.Fields.SignatureField", {
  "signatureLabelText": "Signatur",
  "signatureText": "..."
});

localize("Sage.Platform.Mobile.Format", {
  "yesText": "Ja",
  "noText": "Nein",
  "trueText": "W",
  "falseText": "F",
  "hoursText": "Stunden",
  "hourText": "Stunde",
  "minutesText": "Minuten",
  "minuteText": "Minute"
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

localize("Mobile.SalesLogix.Action", {
  "calledText": "${0} angerufen",
  "emailedText": "Gesendet per E-Mail ${0}"
});

localize("Mobile.SalesLogix.Fields.AddressField", {
  "lookupLabelText": "Bearbeiten",
  "emptyText": ""
});

localize("Mobile.SalesLogix.Fields.NameField", {
  "emptyText": ""
});

localize("Mobile.SalesLogix.Fields.RecurrencesField", {
  "titleText": "Sich wiederholende Aktivität",
  "emptyText": ""
});

localize("Mobile.SalesLogix.Recurrence", {
  "neverText": "Nie",
  "daysText": "Tage",
  "dailyText": "Täglich",
  "weeksText": "Wochen",
  "weeklyText": "Wöchentlich",
  "weeklyOnText": "Wöchentlich am ${3}",
  "monthsText": "Monate",
  "monthlyText": "Monatlich",
  "monthlyOnDayText": "Monatlich an Tag ${1}",
  "monthlyOnText": "Monatlich am ${5} ${3}",
  "yearsText": "Jahre",
  "yearlyText": "Jährlich",
  "yearlyOnText": "Jährlich am ${2}",
  "yearlyOnWeekdayText": "Jährlich am ${5} ${3} in ${4}",
  "everyText": "alle ${0} ${1}",
  "afterCompletionText": "nach Abschluss",
  "untilEndDateText": "${0} bis ${1}",
  "ordText": {
    "0": "Tag",
    "1": "Vorname",
    "2": "2.",
    "3": "3.",
    "4": "4.",
    "5": "Nachname"
  }
});

localize("Mobile.SalesLogix.Validator", {
  "exists": {
    "message": "Feld '${2}' muss Wert enthalten."
  },
  "name": {
    "message": "Für Feld '${2}' müssen Vor- und Nachname angegeben werden."
  },
  "notEmpty": {
    "message": "Feld '${2}' darf nicht leer sein."
  },
  "hasText": {
    "test": "",
    "message": "Feld '${2}' muss Text enthalten."
  },
  "isInteger": {
    "message": "Wert '${0}' ist keine gültige Zahl."
  },
  "isDecimal": {
    "message": "Wert '${0}' ist keine gültige Zahl."
  },
  "isCurrency": {
    "message": "Wert '${0}' ist kein gültiger Währungsbetrag."
  },
  "isInt32": {
    "message": "Wert von Feld '${2}' übersteigt zulässigen Zahlenbereich."
  },
  "exceedsMaxTextLength": {
    "message": "Wert von Feld '${2}' übersteigt die zulässige Höchstlänge."
  },
  "isDateInRange": {
    "message": "Wert von Feld '${2}' nicht im zuläss. Datumsbereich."
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
  "importSourceText": "Interessentenquelle",
  "industryText": "Branche",
  "notesText": "Notizen",
  "ownerText": "Eigentümer",
  "phoneText": "Telefon",
  "activityTypeText": {
    "atPhoneCall": "Anruf"
  },
  "actionsText": "Schnellaktionen",
  "relatedActivitiesText": "Aktivitäten",
  "relatedContactsText": "Kontakte",
  "relatedHistoriesText": "Notizen/Historie",
  "relatedItemsText": "Zugehörige Elemente",
  "relatedNotesText": "Notizen",
  "relatedOpportunitiesText": "Verkaufschancen",
  "relatedTicketsText": "Tickets",
  "relatedAddressesText": "Adressen",
  "statusText": "Status",
  "subTypeText": "Untertyp",
  "titleText": "Firma",
  "typeText": "Typ",
  "webText": "Web",
  "callMainNumberText": "Festnetz anrufen",
  "scheduleActivityText": "Aktivität planen",
  "addNoteText": "Notiz hinzufügen",
  "viewAddressText": "Adresse anzeigen",
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
  "importSourceText": "Interessentenquelle",
  "industryText": "Branche",
  "industryTitleText": "Branche",
  "ownerText": "Eigentümer",
  "phoneText": "Telefon",
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
  "scheduleText": "Planen",
  "editActionText": "Bearbeiten",
  "callMainActionText": "Festnetz anrufen",
  "viewContactsActionText": "Kontakte",
  "addNoteActionText": "Notiz hinzufügen",
  "addActivityActionText": "Aktivität hinzufügen"
});

localize("Mobile.SalesLogix.Views.Activity.Recurring", {
  "startingText": "Startdatum",
  "endingText": "Enddatum",
  "repeatsText": "Wiederholung",
  "everyText": "alle",
  "afterCompletionText": "nach Abschluss",
  "singleWeekdayText": "Wochentag",
  "weekdaysText": "Wochentag(e)",
  "dayText": "Tag",
  "monthText": "Monat",
  "onText": "am",
  "occurrencesText": "Wiederholungen",
  "summaryText": "Zusammenfassung",
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
  "descriptionText": "Beschreibung",
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
  "titleText": "Firma/Kontakt hinzufügen",
  "typeText": "Typ",
  "webText": "Web",
  "workText": "Geschäftlich",
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
  "descriptionText": "Beschreibung",
  "descriptionTitleText": "Beschreibung",
  "isMailingText": "Lieferung",
  "isPrimaryText": "Haupt",
  "postalCodeText": "PLZ",
  "salutationText": "Zu Händen",
  "stateText": "Bundesland",
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
  "relatedItemsText": "Zugehörige Elemente",
  "relatedNotesText": "Notizen",
  "relatedOpportunitiesText": "Verkaufschancen",
  "relatedTicketsText": "Tickets",
  "relatedAddressesText": "Adressen",
  "titleText": "Kontakt",
  "webText": "Web",
  "workText": "Telefon",
  "cuisinePreferenceText": "Küche",
  "callMobileNumberText": "Handy anrufen",
  "callWorkNumberText": "Festnetz anrufen",
  "scheduleActivityText": "Aktivität planen",
  "addNoteText": "Notiz hinzufügen",
  "sendEmailText": "E-Mail senden",
  "viewAddressText": "Adresse anzeigen",
  "moreDetailsText": "Mehr Details"
});

localize("Mobile.SalesLogix.Views.Contact.Edit", {
  "titleText": "Kontakt",
  "nameText": "Name",
  "workText": "Telefon",
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
  "scheduleText": "Planen",
  "editActionText": "Bearbeiten",
  "callMainActionText": "Festnetz anrufen",
  "callMobileActionText": "Handy anrufen",
  "sendEmailActionText": "E-Mail",
  "viewAccountActionText": "Firma",
  "addNoteActionText": "Notiz hinzufügen",
  "addActivityActionText": "Aktivität hinzufügen"
});

localize("Mobile.SalesLogix.Views.Contract.List", {
  "titleText": "Verträge"
});

localize("Mobile.SalesLogix.Views.Event.Edit", {
  "titleText": "Ereignis",
  "typeText": "Typ",
  "descriptionText": "Beschreibung",
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
  "addAccountContactText": "Firma/Kontakt hinzufügen",
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
  "leadSourceText": "Interessentenquelle",
  "industryText": "Branche",
  "interestsText": "Interessen",
  "leadTitleText": "Titel",
  "nameText": "Name",
  "notesText": "Kommentare",
  "ownerText": "Eigentümer",
  "relatedActivitiesText": "Aktivitäten",
  "relatedHistoriesText": "Notizen/Historie",
  "relatedItemsText": "Zugehörige Elemente",
  "relatedNotesText": "Notizen",
  "sicCodeText": "BDI-Code",
  "titleText": "Interessent",
  "tollFreeText": "Gebührenfrei",
  "webText": "Web",
  "workText": "Telefon",
  "actionsText": "Schnellaktionen",
  "callWorkNumberText": "Festnetz anrufen",
  "scheduleActivityText": "Aktivität planen",
  "addNoteText": "Notiz hinzufügen",
  "sendEmailText": "E-Mail senden",
  "viewAddressText": "Adresse anzeigen",
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
  "importSourceText": "Interessentenquelle",
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
  "workText": "Telefon"
});

localize("Mobile.SalesLogix.Views.Lead.List", {
  "titleText": "Interessenten",
  "activitiesText": "Aktivitäten",
  "notesText": "Notizen",
  "scheduleText": "Planen",
  "emailedText": "Gesendet per E-Mail ${0}",
  "calledText": "${0} angerufen",
  "editActionText": "Bearbeiten",
  "callMainActionText": "Festnetz anrufen",
  "sendEmailActionText": "E-Mail",
  "addNoteActionText": "Notiz hinzufügen",
  "addActivityActionText": "Aktivität hinzufügen"
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
  "userText": "Benutzername",
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
  "estCloseText": "Vor. Abschluss",
  "fbarHomeTitleText": "Home",
  "fbarScheduleTitleText": "Planen",
  "importSourceText": "Interessentenquelle",
  "opportunityText": "Verk.chance",
  "ownerText": "Eigentümer",
  "actionsText": "Schnellaktionen",
  "potentialText": "VK-Potenzial",
  "probabilityText": "Abschl.wahrsch.",
  "relatedActivitiesText": "Aktivitäten",
  "relatedContactsText": "Kontakte für Verkaufschance",
  "relatedHistoriesText": "Notizen/Historie",
  "relatedItemsText": "Zugehörige Elemente",
  "relatedNotesText": "Notizen",
  "relatedProductsText": "Produkte",
  "resellerText": "Wiederverkäufer",
  "statusText": "Status",
  "titleText": "Verkaufschance",
  "typeText": "Typ",
  "scheduleActivityText": "Aktivität planen",
  "addNoteText": "Notiz hinzufügen",
  "moreDetailsText": "Mehr Details"
});

localize("Mobile.SalesLogix.Views.Opportunity.Edit", {
  "accountText": "Firma",
  "acctMgrText": "Acct Mgr",
  "estCloseText": "Vor. Abschluss",
  "importSourceText": "Interessentenquelle",
  "opportunityStatusTitleText": "Status der Verkaufschance",
  "opportunityText": "Verk.chance",
  "opportunityTypeTitleText": "Verkaufschancentyp",
  "ownerText": "Eigentümer",
  "potentialText": "VK-Potenzial",
  "probabilityText": "Abschl.wahrsch.",
  "probabilityTitleText": "Wahrscheinlichkeit",
  "resellerText": "Wiederverkäufer",
  "statusText": "Status",
  "titleText": "Verkaufschance",
  "typeText": "Typ"
});

localize("Mobile.SalesLogix.Views.Opportunity.List", {
  "titleText": "Verkaufschancen",
  "activitiesText": "Aktivitäten",
  "notesText": "Notizen",
  "scheduleText": "Planen",
  "editActionText": "Bearbeiten",
  "viewAccountActionText": "Firma",
  "viewContactsActionText": "Kontakte",
  "viewProductsActionText": "Produkte",
  "addNoteActionText": "Notiz hinzufügen",
  "addActivityActionText": "Aktivität hinzufügen",
  "hashTagQueriesText": {
    "open": "offen",
    "closed": "abgeschlossen",
    "won": "erfolgreich",
    "lost": "verloren"
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
  "titleText": "Kontakt bearbeiten",
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
  "errorLogTitleText": "Fehlerprotokoll",
  "localStorageClearedText": "Lokaler Speicher erfolgr. gelöscht.",
  "credentialsClearedText": "Gespeicherte Anmeldedaten gelöscht",
  "titleText": "Einstell"
});

localize("Mobile.SalesLogix.Views.TextEdit", {
  "titleText": "Text bearbeiten"
});

localize("Mobile.SalesLogix.Views.Ticket.Detail", {
  "accountText": "Firma",
  "areaText": "Bereich",
  "assignedDateText": "Zugewiesen am",
  "assignedToText": "Zugewiesen an",
  "categoryText": "Kategorie",
  "contactText": "Kontakt",
  "contractText": "Vertrag",
  "descriptionText": "Beschr.",
  "issueText": "Problem",
  "needByText": "Fälligkeitsdatum",
  "notesText": "Kommentare",
  "phoneText": "Telefon",
  "actionsText": "Schnellaktionen",
  "relatedActivitiesText": "Aktivitäten",
  "relatedItemsText": "Zugehörige Elemente",
  "resolutionText": "Lösung",
  "sourceText": "Quelle",
  "statusText": "Status",
  "subjectText": "Betreff",
  "ticketIdText": "Ticket-Nummer",
  "titleText": "Ticket",
  "urgencyText": "Dringlichkeit",
  "scheduleActivityText": "Aktivität planen",
  "moreDetailsText": "Mehr Details",
  "relatedTicketActivitiesText": "Ticket-Aktivitäten",
  "loadingText": "Laden..."
});

localize("Mobile.SalesLogix.Views.Ticket.Edit", {
  "accountText": "Firma",
  "areaText": "Bereich",
  "assignedDateText": "Zugewiesen am",
  "assignedToText": "Zugewiesen an",
  "categoryText": "Kategorie",
  "contactText": "Kontakt",
  "contractText": "Vertrag",
  "descriptionText": "Beschr.",
  "descriptionTitleText": "Beschreibung",
  "issueText": "Problem",
  "needByText": "Fälligkeitsdatum",
  "notesText": "Kommentare",
  "notesTitleText": "Kommentare",
  "phoneText": "Telefon",
  "relatedActivitiesText": "Aktivitäten",
  "relatedItemsText": "Zugehörige Elemente",
  "resolutionText": "Lösung",
  "resolutionTitleText": "Lösung",
  "sourceText": "Quelle",
  "sourceTitleText": "Quelle",
  "statusText": "Status",
  "subjectText": "Betreff",
  "ticketAreaTitleText": "Ticket-Bereich",
  "ticketCategoryTitleText": "Ticket-Kategorie",
  "ticketIdText": "Ticket-Nummer",
  "ticketIssueTitleText": "Ticket-Probl.",
  "ticketStatusTitleText": "Ticket-Status",
  "ticketUrgencyTitleText": "Ticket-Dringlichk.",
  "titleText": "Ticket",
  "urgencyText": "Dringlichkeit"
});

localize("Mobile.SalesLogix.Views.Ticket.List", {
  "titleText": "Tickets",
  "activitiesText": "Aktivitäten",
  "scheduleText": "Planen",
  "notAssignedText": "Nicht zugewiesen",
  "editActionText": "Bearbeiten",
  "viewAccountActionText": "Firma",
  "viewContactActionText": "Kontakt",
  "addNoteActionText": "Notiz hinzufügen",
  "addActivityActionText": "Aktivität hinzufügen"
});

localize("Mobile.SalesLogix.Views.Ticket.UrgencyLookup", {
  "titleText": "Ticket-Dringlichk."
});

localize("Mobile.SalesLogix.Views.TicketActivity.Detail", {
  "titleText": "Ticket-Aktivität",
  "accountText": "Firma",
  "contactText": "Kontakt",
  "typeText": "Typ",
  "publicAccessText": "öffentl. Zugriff",
  "assignedDateText": "Startdatum",
  "completedDateText": "Enddatum",
  "followUpText": "Folgeaktivität",
  "unitsText": "Zeiteinh.",
  "elapsedUnitsText": "Verstrichene Einheiten",
  "rateTypeDescriptionText": "Gebührentyp",
  "rateText": "Gebühr",
  "totalLaborText": "Arbeit gesamt",
  "totalPartsText": "Teile gesamt",
  "totalFeeText": "Gebühr gesamt",
  "activityDescriptionText": "Kommentare",
  "ticketNumberText": "Ticket-Nummer",
  "userText": "Benutzer",
  "completeTicketText": "Ticket-Aktivität abschließen",
  "moreDetailsText": "Mehr Details",
  "relatedItemsText": "Zugehörige Elemente",
  "relatedTicketActivityItemText": "Ticket-Aktivität (Teile)"
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
  "itemDescriptionText": "Beschreibung"
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
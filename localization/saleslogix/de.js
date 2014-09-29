define('localization/saleslogix/de', ['localization/de', 'Mobile/SalesLogix/ApplicationModule'], function() {

localize("Sage.Platform.Mobile.Calendar", {
  "timeFormatText": "H:mm",
  "titleText": "Kalender",
  "amText": "AM",
  "pmText": "PM",
  "monthsShortText": {
    "0": "Jan.",
    "1": "Feb.",
    "2": "März",
    "3": "Apr.",
    "4": "Mai",
    "5": "Jun.",
    "6": "Jul.",
    "7": "Aug",
    "8": "Sept.",
    "9": "Okt.",
    "10": "Nov.",
    "11": "Dez."
  }
});

localize("Sage.Platform.Mobile.Fields.DateField", {
  "dateFormatText": "DD.MM.YYYY",
  "emptyText": "",
  "invalidDateFormatErrorText": "Feld '${0}' enthält ein ungültiges Datumsformat."
});

localize("Sage.Platform.Mobile.Format", {
  "shortDateFormatText": "D.M.YYYY",
  "percentFormatText": "${0}${1}",
  "yesText": "Ja",
  "noText": "Nein",
  "trueText": "T",
  "falseText": "F",
  "hoursText": "Stunden",
  "hourText": "Stunde",
  "minutesText": "Minuten",
  "minuteText": "Minute",
  "bytesText": "Byte"
});

localize("Mobile.SalesLogix.GroupUtility", {
  "groupDateFormatText": "D.M.YYYY H:mm:ss"
});

localize("Mobile.SalesLogix.Recurrence", {
  "dayFormatText": "DD",
  "monthFormatText": "MM",
  "monthAndDayFormatText": "MM.DD",
  "weekdayFormatText": "dddd",
  "endDateFormatText": "D.M.YYYY",
  "neverText": "Niemals",
  "daysText": "Tage",
  "dailyText": "Täglich",
  "weeksText": "Wochen",
  "weeklyText": "Wöchentlich",
  "weeklyOnText": "Wöchentlich jeden ${3}",
  "monthsText": "Monate",
  "monthlyText": "Monatlich",
  "monthlyOnDayText": "monatlich am ${1}. Tag",
  "monthlyOnText": "monatlich jeden ${5}. ${3}",
  "yearsText": "Jahre",
  "yearlyText": "Jährlich",
  "yearlyOnText": "jährlich am ${2}. Tag",
  "yearlyOnWeekdayText": "jährlich am ${5} ${3}. im ${4}",
  "everyText": "jeden ${0} ${1}",
  "afterCompletionText": "nach Abschluss",
  "untilEndDateText": "${0} bis ${1}",
  "weekDaysText": {
    "0": "Sonntag",
    "1": "Montag",
    "2": "Dienstag",
    "3": "Mittwoch",
    "4": "Donnerstag",
    "5": "Freitag",
    "6": "Samstag"
  },
  "ordText": {
    "0": "Tag",
    "1": "Ersten",
    "2": "Zweiten",
    "3": "Dritten",
    "4": "Vierten",
    "5": "Letzte"
  }
});

localize("Mobile.SalesLogix.Views.Activity.Complete", {
  "completedFormatText": "D.M.YYYY H:mm",
  "startingFormatText": "D.M.YYYY H:mm",
  "startingTimelessFormatText": "D.M.YYYY",
  "activityInfoText": "Tätigkeitsinfo",
  "accountText": "Firma",
  "contactText": "Kontakt",
  "opportunityText": "Verkaufschance",
  "ticketNumberText": "Ticket",
  "companyText": "Unternehmen",
  "leadText": "Interessent",
  "asScheduledText": "Wie geplant",
  "categoryText": "Kategorie",
  "categoryTitleText": "Tätigkeitskategorie",
  "completedText": "Abschlussdatum",
  "completionText": "Abschluss",
  "durationText": "Dauer",
  "durationInvalidText": "Das Feld '${2}' muss einen Wert enthalten.",
  "carryOverNotesText": "Notizen übertragen",
  "followUpText": "Folgeaktivität",
  "followUpTitleText": "Follow-up-Typ",
  "leaderText": "Organisator",
  "longNotesText": "Notizen",
  "longNotesTitleText": "Notizen",
  "otherInfoText": "Andere Informationen",
  "priorityText": "Priorität",
  "priorityTitleText": "Priorität",
  "regardingText": "Betreff",
  "regardingTitleText": "Tätigkeit zu",
  "resultText": "Ergebnis",
  "resultTitleText": "Ergebnis",
  "startingText": "Startdatum",
  "timelessText": "Ohne Zeitangabe",
  "durationValueText": {
    "0": "unbegrenzt",
    "15": "15 Minuten",
    "30": "30 Minuten",
    "60": "1 Stunde",
    "90": "1,5 Stunden",
    "120": "2 Stunden"
  },
  "followupValueText": {
    "none": "Unbegrenzt",
    "atPhoneCall": "Anruf",
    "atAppointment": "Meeting",
    "atToDo": "Aufgabe",
    "atPersonal": "Persönliche Aktivität"
  }
});

localize("Mobile.SalesLogix.Views.Activity.Detail", {
  "startDateFormatText": "D.M.YYYY H:mm:ss",
  "timelessDateFormatText": "D.M.YYYY",
  "alarmDateFormatText": "D.M.YYYY H:mm:ss",
  "activityTypeText": {
    "atToDo": "Aufgabe",
    "atPhoneCall": "Anruf",
    "atAppointment": "Meeting",
    "atLiterature": "Literaturanfrage",
    "atPersonal": "Persönliche Aktivität"
  },
  "actionsText": "Express-Optionen",
  "completeActivityText": "Aktivität abschließen",
  "completeOccurrenceText": "Gesamtes Vorkommen",
  "completeSeriesText": "Vollständige Abfolgen",
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
  "startTimeText": "Anfangszeit",
  "allDayText": "den gesamten Tag",
  "timelessText": "Ohne Zeitangabe",
  "titleText": "Aktivität",
  "typeText": "Typ",
  "companyText": "Unternehmen",
  "leadText": "Interessent",
  "accountText": "Firma",
  "contactText": "Kontakt",
  "opportunityText": "Verkaufschance",
  "ticketNumberText": "Ticket",
  "whenText": "Wann",
  "whoText": "Wer",
  "recurrenceText": "Wiederholung",
  "confirmEditRecurrenceText": "Alle Vorkommen bearbeiten? Abbrechen, um einzelnes Vorkommen zu bearbeiten.",
  "relatedAttachmentText": "Anlagen",
  "relatedAttachmentTitleText": "Anlagen mit Tätigkeiten",
  "relatedItemsText": "Verknüpfte Elemente",
  "phoneText": "Telefon"
});

localize("Mobile.SalesLogix.Views.Activity.Edit", {
  "startingFormatText": "D.M.YYYY H:mm",
  "startingTimelessFormatText": "D.M.YYYY",
  "activityCategoryTitleText": "Tätigkeitskategorie",
  "activityDescriptionTitleText": "Aktivitätsbeschreibung",
  "locationText": "Standort",
  "activityTypeTitleText": "Aktivitätstyp",
  "alarmText": "Alarm",
  "reminderText": "",
  "categoryText": "Kategorie",
  "durationText": "Dauer",
  "durationTitleText": "Dauer",
  "durationInvalidText": "Das Feld '${2}' muss einen Wert enthalten.",
  "reminderInvalidText": "Das Feld 'Erinnerung' muss einen Wert enthalten.",
  "reminderTitleText": "Erinnerung",
  "leaderText": "Organisator",
  "longNotesText": "Notizen",
  "longNotesTitleText": "Notizen",
  "priorityText": "Priorität",
  "priorityTitleText": "Priorität",
  "regardingText": "Betreff",
  "rolloverText": "Auto-Rollover",
  "startingText": "Anfangszeit",
  "repeatsText": "Wiederholungen",
  "recurringText": "Sich wiederholende Aktivität",
  "recurringTitleText": "Sich wiederholende Aktivität",
  "timelessText": "Ohne Zeitangabe",
  "titleText": "Aktivität",
  "typeText": "Typ",
  "accountText": "Firma",
  "contactText": "Kontakt",
  "opportunityText": "Verkaufschance",
  "ticketNumberText": "Ticket",
  "companyText": "Unternehmen",
  "leadText": "Interessent",
  "isLeadText": "für Interessent",
  "yesText": "Ja",
  "noText": "Nein",
  "phoneText": "Telefon",
  "updateUserActErrorText": "Bei der Aktualisierung der Benutzertätigkeiten ist ein Fehler aufgetreten.",
  "reminderValueText": {
    "0": "unbegrenzt",
    "5": "5 Minuten",
    "15": "15 Minuten",
    "30": "30 Minuten",
    "60": "1 Stunde",
    "1440": "1 Tag"
  },
  "durationValueText": {
    "0": "unbegrenzt",
    "15": "15 Minuten",
    "30": "30 Minuten",
    "60": "1 Stunde",
    "90": "1,5 Stunden",
    "120": "2 Stunden"
  }
});

localize("Mobile.SalesLogix.Views.Attachment.List", {
  "attachmentDateFormatText": "ddd D.M.YYYY HH:mm:ss",
  "titleText": "Anlagen",
  "uploadedOnText": "Hochgeladen ",
  "hashTagQueriesText": {
    "url": "URL",
    "binary": "Binär"
  }
});

localize("Mobile.SalesLogix.Views.Attachment.ViewAttachment", {
  "attachmentDateFormatText": "ddd D.M.YYYY H:mm",
  "detailsText": "Anlagendetails",
  "descriptionText": "Beschreibung",
  "fileNameText": "Dateiname",
  "attachDateText": "Anlagendatum",
  "fileSizeText": "Dateigröße",
  "userText": "Benutzer",
  "attachmentNotSupportedText": "Der Anlagentyp kann nicht angezeigt werden.",
  "downloadingText": "Anlage wird heruntergeladen ...",
  "notSupportedText": "Das Öffnen von Anhängen wird von Ihrem Gerät nicht unterstützt."
});

localize("Mobile.SalesLogix.Views.Calendar.DayView", {
  "eventDateFormatText": "D.M.YYYY",
  "dateHeaderFormatText": "dddd, D.M.YYYY",
  "startTimeFormatText": "H:mm",
  "titleText": "Kalender",
  "todayText": "Heute",
  "dayText": "Tag",
  "weekText": "Woche",
  "monthText": "Monat",
  "allDayText": "Den gesamten Tag",
  "eventHeaderText": "Ereignisse",
  "activityHeaderText": "Aktivitäten",
  "eventMoreText": "Weitere Ereignisse anzeigen",
  "toggleCollapseText": "Ein-/ausblenden"
});

localize("Mobile.SalesLogix.Views.Calendar.MonthView", {
  "monthTitleFormatText": "MMMM YYYY",
  "dayTitleFormatText": "ddd D. MMM YYYY",
  "eventDateFormatText": "D.M.YYYY",
  "startTimeFormatText": "H:mm",
  "titleText": "Kalender",
  "todayText": "Heute",
  "dayText": "Tag",
  "weekText": "Woche",
  "monthText": "Monat",
  "allDayText": "Den gesamten Tag",
  "eventText": "Ereignis",
  "eventHeaderText": "Ereignisse",
  "countMoreText": "Mehr anzeigen",
  "activityHeaderText": "Aktivitäten",
  "toggleCollapseText": "Ein-/ausblenden",
  "weekDaysShortText": {
    "0": "So",
    "1": "Mo",
    "2": "Di",
    "3": "Mi",
    "4": "Do",
    "5": "Fr",
    "6": "Sa"
  }
});

localize("Mobile.SalesLogix.Views.Calendar.WeekView", {
  "weekTitleFormatText": "D. MMM YYYY",
  "dayHeaderLeftFormatText": "dddd",
  "dayHeaderRightFormatText": "D. MMM YYYY",
  "eventDateFormatText": "D.M.YYYY",
  "startTimeFormatText": "H:mm",
  "titleText": "Kalender",
  "todayText": "Heute",
  "dayText": "Tag",
  "weekText": "Woche",
  "monthText": "Monat",
  "allDayText": "den gesamten Tag",
  "eventHeaderText": "Ereignisse",
  "eventMoreText": "${0} weitere Ereignisse anzeigen",
  "toggleCollapseText": "Ein-/ausblenden"
});

localize("Mobile.SalesLogix.Views.ErrorLog.Detail", {
  "errorDateFormatText": "DD.MM.YYYY HH:mm",
  "titleText": "Fehlerprotokoll",
  "detailsText": "Details",
  "errorDateText": "Datum",
  "statusTextText": "Fehler",
  "urlText": "URL",
  "moreDetailsText": "Weitere Informationen",
  "errorText": "Fehler",
  "emailSubjectText": "Fehler in Saleslogix Mobile Client empfangen",
  "copiedSuccessText": "In die Zwischenablage kopiert"
});

localize("Mobile.SalesLogix.Views.ErrorLog.List", {
  "errorDateFormatText": "DD.MM.YYYY HH:mm",
  "titleText": "Fehlerprotokolle"
});

localize("Mobile.SalesLogix.Views.Event.Detail", {
  "startDateFormatText": "D.M.YYYY H:mm:ss",
  "endDateFormatText": "D.M.YYYY H:mm:ss",
  "eventTypeText": {
    "atToDo": "Aufgabe",
    "atPhoneCall": "Anruf",
    "atAppointment": "Meeting",
    "atLiterature": "Literaturanfrage",
    "atPersonal": "Persönliche Aktivität"
  },
  "actionsText": "Express-Optionen",
  "startTimeText": "Startdatum",
  "endTimeText": "Enddatum",
  "titleText": "Ereignis",
  "descriptionText": "Beschreibung",
  "typeText": "Typ",
  "whenText": "Wann"
});

localize("Mobile.SalesLogix.Views.Event.Edit", {
  "startingFormatText": "D.M.YYYY H:mm",
  "titleText": "Ereignis",
  "typeText": "Typ",
  "descriptionText": "Beschreibung",
  "startDateText": "Startdatum",
  "endDateText": "Enddatum",
  "eventTypesText": {
    "Vacation": "Urlaub",
    "Business Trip": "Geschäftsreise",
    "Conference": "Konferenz",
    "Holiday": "Feiertag"
  }
});

localize("Mobile.SalesLogix.Views.Event.List", {
  "eventDateFormatText": "D.M.YYYY",
  "titleText": "Ereignisse",
  "eventText": "Ereignis"
});

localize("Mobile.SalesLogix.Views.History.Detail", {
  "dateFormatText": "D.M.YYYY H:mm:ss",
  "categoryText": "Kategorie",
  "completedText": "Abgeschlossen",
  "durationText": "Dauer",
  "leaderText": "Organisator",
  "longNotesText": "Notizen",
  "notesText": "Notizen",
  "priorityText": "Priorität",
  "regardingText": "Betreff",
  "completedByText": "Abgeschlossen von",
  "scheduledText": "Geplant",
  "timelessText": "Ohne Zeitangabe",
  "companyText": "Unternehmen",
  "leadText": "Interessent",
  "titleText": "Historie",
  "accountText": "Firma",
  "contactText": "Kontakt",
  "opportunityText": "Verkaufschance",
  "ticketNumberText": "Ticket",
  "moreDetailsText": "Weitere Informationen",
  "relatedItemsText": "Verknüpfte Elemente",
  "relatedAttachmentText": "Anlagen",
  "relatedAttachmentTitleText": "Anlagen mit Historien",
  "modifiedText": "Geändert",
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
  "startingFormatText": "D.M.YYYY H:mm",
  "accountText": "Firma",
  "noteDescriptionTitleText": "Hinweisbeschreibung",
  "contactText": "Kontakt",
  "longNotesText": "Notizen",
  "longNotesTitleText": "Notizen",
  "opportunityText": "Verkaufschance",
  "ticketNumberText": "Ticket",
  "regardingText": "Betreff",
  "isLeadText": "für Interessent",
  "startingText": "Zeit",
  "titleText": "Notiz",
  "companyText": "Unternehmen",
  "leadText": "Interessent",
  "relatedItemsText": "Verknüpfte Elemente",
  "yesText": "Ja",
  "noText": "Nein",
  "validationText": "Das Feld '${2}' muss einen Wert enthalten.",
  "validationCanEditText": "Sie besitzen keine Bearbeitungsrechte"
});

localize("Mobile.SalesLogix.Views.History.List", {
  "hourMinuteFormatText": "H:mm",
  "dateFormatText": "D.M.YY",
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
    "my-history": "meine-Historie",
    "note": "Notiz",
    "phonecall": "Telefonanruf",
    "meeting": "Meeting",
    "personal": "Persönlich",
    "email": "E-Mail"
  },
  "titleText": "Notizen/Historie",
  "viewAccountActionText": "Firma",
  "viewOpportunityActionText": "Verkaufschance",
  "viewContactActionText": "Kontakt",
  "addAttachmentActionText": "Anlage hinzufügen",
  "regardingText": "Betreff: "
});

localize("Mobile.SalesLogix.Views.Opportunity.Detail", {
  "exchangeRateDateFormatText": "D.M.YYYY H:mm",
  "accountText": "Firma",
  "acctMgrText": "Acct. Mgr.",
  "estCloseText": "voraussichtlich",
  "detailsText": "Details",
  "fbarHomeTitleText": "Privat",
  "fbarScheduleTitleText": "Planen",
  "importSourceText": "Interessentenquelle",
  "opportunityText": "Verkaufschance",
  "ownerText": "Zugriffsberechtigter",
  "actionsText": "Express-Optionen",
  "potentialText": "Verkaufspotenzial",
  "potentialBaseText": "Absatzpotenzial (Basissatz)",
  "potentialOpportunityText": "Absatzpotenzial (VKC-Satz)",
  "potentialMyRateText": "Absatzpotenzial (mein Satz)",
  "probabilityText": "Wahrscheinlichkeit",
  "relatedActivitiesText": "Aktivitäten",
  "relatedContactsText": "Kontakte für Verkaufschance",
  "relatedHistoriesText": "Notizen/Historie",
  "relatedItemsText": "Verknüpfte Elemente",
  "relatedNotesText": "Notizen",
  "relatedProductsText": "Produkte",
  "relatedAttachmentText": "Anlagen",
  "relatedAttachmentTitleText": "Anlagen mit Verkaufschancen",
  "resellerText": "Wiederverkäufer",
  "statusText": "Status",
  "titleText": "Verkaufschance",
  "typeText": "Typ",
  "scheduleActivityText": "Aktivität planen",
  "addNoteText": "Notiz hinzufügen",
  "moreDetailsText": "Weitere Informationen",
  "multiCurrencyText": "Mehrere Währungen",
  "multiCurrencyRateText": "Wechselkurs",
  "multiCurrencyCodeText": "Code",
  "multiCurrencyDateText": "Stichtag Satz",
  "multiCurrencyLockedText": "Satz gesperrt"
});

localize("Mobile.SalesLogix.Views.Opportunity.Edit", {
  "exchangeRateDateFormatText": "D.M.YYYY H:mm",
  "accountText": "Firma",
  "acctMgrText": "Acct. Mgr.",
  "estCloseText": "voraussichtlich",
  "importSourceText": "Interessentenquelle",
  "detailsText": "Details",
  "opportunityStatusTitleText": "Status der Verkaufschance",
  "opportunityText": "Verkaufschance",
  "opportunityTypeTitleText": "Verkaufschancentyp",
  "ownerText": "Zugriffsberechtigter",
  "potentialText": "Verkaufspotenzial",
  "probabilityText": "Wahrscheinlichkeit",
  "probabilityTitleText": "Wahrscheinlichkeit Verkaufschance",
  "resellerText": "Wiederverkäufer",
  "statusText": "Status",
  "titleText": "Verkaufschance",
  "typeText": "Typ",
  "multiCurrencyText": "Mehrere Währungen",
  "multiCurrencyRateText": "Wechselkurs",
  "multiCurrencyCodeText": "Code",
  "multiCurrencyDateText": "Stichtag Satz",
  "multiCurrencyLockedText": "Satz gesperrt",
  "subTypePickListResellerText": "Wiederverkäufer"
});

localize("Mobile.SalesLogix.Views.TicketActivity.Edit", {
  "startingFormatText": "D.M.YYYY H:mm",
  "titleText": "Ticket-Aktivität bearbeiten",
  "activityTypeText": "Typ",
  "activityTypeTitleText": "Typ",
  "publicAccessText": "Öffentlicher Zugriff",
  "publicAccessTitleText": "Öffentlicher Zugriff",
  "userText": "Benutzer",
  "startDateText": "Startdatum",
  "endDateText": "Enddatum",
  "commentsText": "Kommentare"
});

localize("Mobile.SalesLogix.Views.TicketActivity.List", {
  "startDateFormatText": "DD.MM.YYYY H:mm",
  "titleText": "Ticket-Aktivitäten"
});

localize("Sage.Platform.Mobile.ErrorManager", {
  "abortedText": "Abgebrochen",
  "scopeSaveText": "Umfang wird nicht in Fehlerbericht gespeichert."
});

localize("Sage.Platform.Mobile.Fields.BooleanField", {
  "onText": "An",
  "offText": "Aus"
});

localize("Sage.Platform.Mobile.Fields.DurationField", {
  "emptyText": "",
  "invalidDurationErrorText": "Feld '${0}' ist keine gültige Zeitspanne.",
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
  "dependentErrorText": "Es muss ein Wert für '${0}' ausgewählt werden.",
  "emptyText": "",
  "completeText": "Auswählen",
  "lookupLabelText": "Suchen",
  "lookupText": "..."
});

localize("Sage.Platform.Mobile.Fields.SignatureField", {
  "signatureLabelText": "Unterschrift",
  "signatureText": "..."
});

localize("Sage.Platform.Mobile.GroupedList", {
  "toggleCollapseText": "Ein-/ausblenden"
});

localize("Sage.Platform.Mobile.Groups.DateTimeSection", {
  "displayNameText": "Datums- und Zeitabschnitt",
  "todayText": "Heute",
  "tomorrowText": "Morgen",
  "laterThisWeekText": "Späterer Zeitpunkt in dieser Woche",
  "earlierThisWeekText": "Früherer Zeitpunkt in dieser Woche",
  "thisLaterMonthText": "Späterer Zeitpunkt in diesem Monat",
  "thisEarlierMonthText": "Früherer Zeitpunkt in diesem Monat",
  "thisYearEarlierText": "Früherer Zeitpunkt in diesem Jahr",
  "thisYearLaterText": "Späterer Zeitpunkt in diesem Jahr",
  "yesterdayText": "Gestern",
  "lastWeekText": "Letzte Woche",
  "lastMonthText": "Letzter Monat",
  "pastYearText": "Vergange(s) Jahr(e)",
  "nextYearText": "Nächstes Jahr",
  "nextMonthText": "Nächster Monat",
  "nextWeekText": "Nächste Woche",
  "futureText": "Zukunft",
  "twoWeeksAgoText": "Vor zwei Wochen",
  "threeWeeksAgoText": "Vor drei Wochen",
  "twoMonthsAgoText": "Vor zwei Monaten",
  "threeMonthsAgoText": "Vor drei Monaten",
  "unknownText": "Unbekannt"
});

localize("Sage.Platform.Mobile.Groups.GroupByValueSection", {
  "displayNameText": "Gruppe durch Wertauswahl"
});

localize("Sage.Platform.Mobile.MainToolbar", {
  "titleText": "Mobil"
});

localize("Sage.Platform.Mobile.RelatedViewWidget", {
  "nodataText": "keine Datensätze gefunden ...",
  "selectMoreDataText": "siehe ${0} mehr von ${1} ... ",
  "navToListText": "siehe Liste",
  "loadingText": "lädt ... ",
  "refreshViewText": "Aktualisieren",
  "itemOfCountText": " ${0} von ${1}",
  "totalCountText": " (${0})",
  "titleText": "Zugehörige Ansicht"
});

localize("Sage.Platform.Mobile.SearchWidget", {
  "searchText": "Suchen"
});

localize("Sage.Platform.Mobile.View", {
  "titleText": "Allgemeine Ansicht"
});

localize("Sage.Platform.Mobile.Views.FileSelect", {
  "titleText": "Dateiauswahl",
  "addFileText": "Zum Hinzufügen einer Datei hier klicken oder tippen.",
  "uploadText": "Hochladen",
  "cancelText": "Abbrechen",
  "selectFileText": "Datei auswählen",
  "loadingText": "Hochladen läuft...",
  "descriptionText": "Beschreibung",
  "bytesText": "Byte",
  "notSupportedText": "Das Hinzufügen von Anhängen wird von Ihrem Gerät nicht unterstützt."
});

localize("Sage.Platform.Mobile.Views.Signature", {
  "titleText": "Unterschrift",
  "clearCanvasText": "Löschen",
  "undoText": "Rückgängig"
});

localize("Sage.Platform.Mobile._DetailBase", {
  "editText": "Bearbeiten",
  "titleText": "Detail",
  "detailsText": "Details",
  "loadingText": "Wird geladen...",
  "requestErrorText": "Bei der Anforderung von Daten ist ein Serverfehler aufgetreten.",
  "notAvailableText": "Die angeforderten Daten sind nicht verfügbar.",
  "toggleCollapseText": "Ein-/ausblenden"
});

localize("Sage.Platform.Mobile._EditBase", {
  "saveText": "Speichern",
  "titleText": "Bearbeiten",
  "validationSummaryText": "Validierungszusammenfassung",
  "concurrencySummaryText": "Fehler infolge gleichzeitigen Zugriffs",
  "detailsText": "Details",
  "loadingText": "Wird geladen...",
  "requestErrorText": "Bei der Anforderung von Daten ist ein Serverfehler aufgetreten.",
  "concurrencyErrorText": "Ein anderer Benutzer hat dieses Feld aktualisiert."
});

localize("Sage.Platform.Mobile._ListBase", {
  "moreText": "Mehr Datensätze abrufen",
  "emptySelectionText": "Unbegrenzt",
  "titleText": "Liste",
  "errorRenderText": "Fehler beim Darstellen der Zeilenvorlage.",
  "remainingText": "${0} Datensätze verbleibend",
  "cancelText": "Abbrechen",
  "insertText": "Neu",
  "noDataText": "Keine Datensätze",
  "loadingText": "Wird geladen...",
  "requestErrorText": "Bei der Anforderung von Daten ist ein Serverfehler aufgetreten."
});

localize("Mobile.SalesLogix.Action", {
  "calledText": "Anruf bei ${0}",
  "emailedText": "E-Mail an ${0}"
});

localize("Mobile.SalesLogix.Application", {
  "versionInfoText": "Mobil v${0}.${1}.${2}"
});

localize("Mobile.SalesLogix.ApplicationModule", {
  "searchText": "Suchen"
});

localize("Mobile.SalesLogix.DefaultMetrics", {
  "accountsText": {
    "totalRevenue": "Gesamtumsatzerlös",
    "averageTime": "Durchschn. Zeit als Kunde",
    "total": "Firmen - gesamt"
  },
  "opportunitiesText": {
    "total": "Verkaufschancen - gesamt",
    "potential": "Verkaufspotenzial"
  },
  "ticketsText": {
    "total": "Tickets - gesamt",
    "averageOpen": "Durchschnittsalter - offen"
  },
  "contactsText": {
    "total": "Kontakte - gesamt"
  },
  "leadsText": {
    "total": "Interessenten - gesamt"
  },
  "historyText": {
    "total": "Verlauf - gesamt",
    "duration": "Dauer - gesamt"
  }
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

localize("Mobile.SalesLogix.FileManager", {
  "unableToUploadText": "Dieser Browser unterstützt keine HTML5-Datei-API.",
  "unknownSizeText": "Unbekannt",
  "unknownErrorText": "Warnung: Ein Fehler ist aufgetreten und die Datei konnte nicht hochgeladen werden.",
  "largeFileWarningText": "Warnung: Diese Abfrage überschreitet die von Ihrem Administrator festgelegte Größenbeschränkung und konnte nicht hochgeladen werden.",
  "percentCompleteText": "Upload läuft, bitte warten..."
});

localize("Mobile.SalesLogix.Format", {
  "bigNumberAbbrText": {
    "billion": "Mrd",
    "million": "Mio",
    "thousand": "Tsd"
  },
  "userActivityFormatText": {
    "asUnconfirmed": "Unbestätigt",
    "asAccepted": "Akzeptiert",
    "asDeclned": "Abgelehnt"
  }
});

localize("Mobile.SalesLogix.SpeedSearchWidget", {
  "searchText": "SpeedSearch"
});

localize("Mobile.SalesLogix.Validator", {
  "exists": {
    "message": "Das Feld '${2}' muss einen Wert enthalten."
  },
  "name": {
    "message": "Im Feld '${2}' müssen Vor- und Nachname angegeben werden."
  },
  "notEmpty": {
    "message": "Feld '${2}' darf nicht leer bleiben."
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
    "message": "Der Wert von Feld '${2}' liegt außerhalb des zulässigen Wertebereichs."
  },
  "exceedsMaxTextLength": {
    "message": "Der Wert von Feld '${2}' überschreitet die zulässige Längenbeschränkung."
  },
  "isDateInRange": {
    "message": "Der Wert von Feld '${2}' liegt außerhalb des zulässigen Datumsbereichs."
  }
});

localize("Mobile.SalesLogix.Views.Account.Detail", {
  "accountText": "Firma",
  "acctMgrText": "Acct. Mgr.",
  "addressText": "Adresse",
  "businessDescriptionText": "Unternehmensbeschreibung",
  "createDateText": "Erstellungsdatum",
  "createUserText": "Angelegt von",
  "faxText": "Fax",
  "importSourceText": "Interessentenquelle",
  "industryText": "Branche",
  "notesText": "Notizen",
  "ownerText": "Zugriffsberechtigter",
  "phoneText": "Telefon",
  "activityTypeText": {
    "atPhoneCall": "Anruf"
  },
  "actionsText": "Express-Optionen",
  "relatedActivitiesText": "Aktivitäten",
  "relatedContactsText": "Kontakte",
  "relatedHistoriesText": "Notizen/Historie",
  "relatedItemsText": "Verknüpfte Elemente",
  "relatedNotesText": "Notizen",
  "relatedOpportunitiesText": "Verkaufschancen",
  "relatedTicketsText": "Tickets",
  "relatedAddressesText": "Adressen",
  "relatedAttachmentText": "Anlagen",
  "relatedAttachmentTitleText": "Anlagen mit Firmen",
  "statusText": "Status",
  "subTypeText": "Untertyp",
  "titleText": "Firma",
  "typeText": "Typ",
  "webText": "Web",
  "scheduleActivityText": "Aktivität planen",
  "addNoteText": "Notiz hinzufügen",
  "moreDetailsText": "Weitere Informationen",
  "calledText": "Anruf bei ${0}"
});

localize("Mobile.SalesLogix.Views.Account.Edit", {
  "accountStatusTitleText": "Firmenstatus",
  "accountSubTypeTitleText": "Firmen-Untertyp",
  "accountText": "Firma",
  "accountTypeTitleText": "Firmentyp",
  "acctMgrText": "Acct. Mgr.",
  "businessDescriptionText": "Unternehmensbeschreibung",
  "businessDescriptionTitleText": "Unternehmensbeschreibung",
  "descriptionText": "Abst.",
  "faxText": "Fax",
  "fullAddressText": "Adresse",
  "importSourceText": "Interessentenquelle",
  "industryText": "Branche",
  "industryTitleText": "Branche",
  "ownerText": "Zugriffsberechtigter",
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
  "callMainActionText": "Hauptnr. anrufen",
  "viewContactsActionText": "Kontakte",
  "addNoteActionText": "Notiz hinzufügen",
  "addActivityActionText": "Tätigkeit hinzufügen",
  "addAttachmentActionText": "Anlage hinzufügen",
  "phoneAbbreviationText": "Telefon: ",
  "faxAbbreviationText": "Fax: "
});

localize("Mobile.SalesLogix.Views.Activity.List", {
  "allDayText": "Den gesamten Tag",
  "completeActivityText": "Abschließen",
  "callText": "Anruf",
  "calledText": "Angerufen",
  "addAttachmentActionText": "Anlage hinzufügen",
  "overdueText": "Überfällig",
  "alarmText": "Alarm",
  "touchedText": "angefasst",
  "importantText": "wichtig",
  "recurringText": "Sich wiederholende Aktivität",
  "activityTypeText": {
    "atToDo": "Aufgabe",
    "atPhoneCall": "Anruf",
    "atAppointment": "Meeting",
    "atLiterature": "Anforderung von Unterlagen",
    "atPersonal": "Persönlich",
    "atQuestion": "Frage",
    "atNote": "Notiz",
    "atEMail": "E-Mail"
  },
  "titleText": "Aktivitäten",
  "hashTagQueriesText": {
    "alarm": "Alarm",
    "recurring": "Sich_wiederholende_Aktivität",
    "timeless": "Ohne_Zeitangabe",
    "today": "Heute",
    "this-week": "diese-Woche",
    "yesterday": "Gestern"
  }
});

localize("Mobile.SalesLogix.Views.Activity.MyList", {
  "titleText": "Eigene Aktivitäten",
  "completeActivityText": "Abschließen",
  "acceptActivityText": "Akzeptieren",
  "declineActivityText": "Ablehnen",
  "callText": "Anruf",
  "calledText": "Angerufen",
  "addAttachmentActionText": "Anlage hinzufügen",
  "viewContactActionText": "Kontakt",
  "viewAccountActionText": "Firma",
  "viewOpportunityActionText": "Verkaufschance",
  "hashTagQueriesText": {
    "alarm": "Alarm",
    "status-unconfirmed": "Status-unbestätigt",
    "status-accepted": "Status-akzeptiert",
    "status-declined": "Status-abgelehnt",
    "recurring": "Sich_wiederholende_Aktivität",
    "timeless": "Ohne_Zeitangabe",
    "today": "Heute",
    "this-week": "diese-Woche",
    "yesterday": "Gestern"
  }
});

localize("Mobile.SalesLogix.Views.Activity.Recurring", {
  "startingText": "Startdatum",
  "endingText": "Enddatum",
  "repeatsText": "Wiederholungen",
  "everyText": "Alle",
  "afterCompletionText": "nach Abschluss",
  "singleWeekdayText": "Wochentag",
  "weekdaysText": "Wochentag(e)",
  "dayText": "Tag",
  "monthText": "Monat",
  "onText": "an",
  "occurrencesText": "Wiederholungen",
  "summaryText": "Zusammenfassung",
  "weekDaysText": {
    "0": "Sonntag",
    "1": "Montag",
    "2": "Dienstag",
    "3": "Mittwoch",
    "4": "Donnerstag",
    "5": "Freitag",
    "6": "Samstag"
  },
  "monthsText": {
    "0": "Januar",
    "1": "Februar",
    "2": "März",
    "3": "April",
    "4": "Mai",
    "5": "Juni",
    "6": "Juli",
    "7": "August",
    "8": "September",
    "9": "Oktober",
    "10": "November",
    "11": "Dezember"
  },
  "frequencyOptionsText": {
    "0": "Tage",
    "1": "Wochen",
    "2": "Monate",
    "3": "Jahre"
  },
  "recurringFrequencyText": "Wiederkehrend: Häufigkeit",
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
  "accountSubTypeTitleText": "Firmen-Untertyp",
  "accountText": "Firma",
  "accountTypeTitleText": "Firmentyp",
  "acctMgrText": "Acct. Mgr.",
  "addressText": "Adresse",
  "contactTitleText": "Titel",
  "descriptionText": "Beschreibung",
  "detailsAccountText": "Firmeninformationen",
  "detailsContactText": "Kontaktinformationen",
  "detailsText": "Kontakt-/Firmeninformationen",
  "emailText": "E-Mail",
  "faxText": "Fax",
  "homePhoneText": "Privat",
  "industryText": "Branche",
  "ownerText": "Zugriffsberechtigter",
  "lastNameText": "Nachname",
  "mobileText": "Mobil",
  "nameText": "Name",
  "statusText": "Status",
  "subTypeText": "Untertyp",
  "titleText": "Firma/Kontakt hinzufügen",
  "typeText": "Typ",
  "webText": "Web",
  "phoneText": "Telefon",
  "workText": "Geschäftliche Telefonnummer",
  "industryTitleText": "Branche"
});

localize("Mobile.SalesLogix.Views.Address.Edit", {
  "address1Text": "Zahlungsmittelsreferenz",
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
  "salutationText": "Zu Händen von",
  "stateText": "Bundesland/Kanton",
  "stateTitleText": "Bundesland/Kanton",
  "titleText": "Adresse"
});

localize("Mobile.SalesLogix.Views.Address.List", {
  "titleText": "Adressen"
});

localize("Mobile.SalesLogix.Views.AreaCategoryIssueLookup", {
  "titleText": "Firmen"
});

localize("Mobile.SalesLogix.Views.Attachment.AddAttachment", {
  "titleText": "Anlagen hinzufügen"
});

localize("Mobile.SalesLogix.Views.Attachment.MyAttachmentList", {
  "titleText": "Meine Anlagen"
});

localize("Mobile.SalesLogix.Views.Charts.GenericBar", {
  "titleText": "",
  "otherText": "Sonstige"
});

localize("Mobile.SalesLogix.Views.Charts.GenericPie", {
  "titleText": "",
  "otherText": "Sonstige"
});

localize("Mobile.SalesLogix.Views.Competitor.List", {
  "titleText": "Mitbewerber"
});

localize("Mobile.SalesLogix.Views.Configure", {
  "titleText": "Konfigurieren"
});

localize("Mobile.SalesLogix.Views.Contact.Detail", {
  "activityTypeText": {
    "atPhoneCall": "Anruf",
    "atEMail": "E-Mail"
  },
  "accountText": "Firma",
  "acctMgrText": "Acct. Mgr.",
  "addressText": "Adresse",
  "contactTitleText": "Titel",
  "createDateText": "Erstellungsdatum",
  "createUserText": "Angelegt von",
  "emailText": "E-Mail",
  "faxText": "Fax",
  "homeText": "Privat",
  "nameText": "Kontakt",
  "ownerText": "Zugriffsberechtigter",
  "actionsText": "Express-Optionen",
  "relatedAccountsText": "Firmen",
  "relatedActivitiesText": "Aktivitäten",
  "relatedHistoriesText": "Notizen/Historie",
  "relatedItemsText": "Verknüpfte Elemente",
  "relatedNotesText": "Notizen",
  "relatedOpportunitiesText": "Verkaufschancen",
  "relatedTicketsText": "Tickets",
  "relatedAddressesText": "Adressen",
  "relatedAttachmentText": "Anlagen",
  "relatedAttachmentTitleText": "Anlagen mit Kontakten",
  "titleText": "Kontakt",
  "webText": "Web",
  "workText": "Telefon",
  "cuisinePreferenceText": "Kulinarische Vorlieben",
  "callMobileNumberText": "Mobilnr. anrufen",
  "callWorkNumberText": "Hauptnr. anrufen",
  "calledText": "Angerufen",
  "scheduleActivityText": "Aktivität planen",
  "addNoteText": "Notiz hinzufügen",
  "sendEmailText": "E-Mail senden",
  "viewAddressText": "Adresse anzeigen",
  "moreDetailsText": "Weitere Informationen"
});

localize("Mobile.SalesLogix.Views.Contact.Edit", {
  "titleText": "Kontakt",
  "nameText": "Name",
  "workText": "Telefon",
  "mobileText": "Mobil",
  "emailText": "E-Mail",
  "webText": "Web",
  "acctMgrText": "Acct. Mgr.",
  "accountNameText": "Firma",
  "homePhoneText": "Privat",
  "faxText": "Fax",
  "addressText": "Adresse",
  "contactTitleText": "Titel",
  "titleTitleText": "Titel",
  "addressTitleText": "Adresse",
  "ownerText": "Zugriffsberechtigter",
  "cuisinePreferenceText": "Kulinarische Vorlieben",
  "cuisinePreferenceTitleText": "Kulinarische Vorlieben"
});

localize("Mobile.SalesLogix.Views.Contact.List", {
  "titleText": "Kontakte",
  "activitiesText": "Aktivitäten",
  "notesText": "Notizen",
  "scheduleText": "Planen",
  "editActionText": "Bearbeiten",
  "callMainActionText": "Hauptnr. anrufen",
  "callWorkActionText": "Geschäftsnr. anrufen",
  "callMobileActionText": "Mobilnr. anrufen",
  "sendEmailActionText": "E-Mail",
  "viewAccountActionText": "Firma",
  "addNoteActionText": "Notiz hinzufügen",
  "addActivityActionText": "Tätigkeit hinzufügen",
  "addAttachmentActionText": "Anlage hinzufügen",
  "phoneAbbreviationText": "Geschäftlich: ",
  "mobileAbbreviationText": "Mobil: "
});

localize("Mobile.SalesLogix.Views.Contract.List", {
  "titleText": "Verträge"
});

localize("Mobile.SalesLogix.Views.ExchangeRateLookup", {
  "titleText": "Wechselkurse"
});

localize("Mobile.SalesLogix.Views.FooterToolbar", {
  "copyrightText": "&copy; 2014 SalesLogix, NA, LLC. Alle Rechte vorbehalten."
});

localize("Mobile.SalesLogix.Views.Groups.Selector", {
  "titleText": "Gruppensuche"
});

localize("Mobile.SalesLogix.Views.Help", {
  "titleText": "Hilfe",
  "errorText": "Fehler",
  "errorMessageText": "Das Hilfedokument konnte nicht geladen werden."
});

localize("Mobile.SalesLogix.Views.History.RelatedView", {
  "regardingText": "Betreff",
  "byText": "geschrieben ",
  "titleText": "Notizen"
});

localize("Mobile.SalesLogix.Views.Home", {
  "configureText": "Konfigurieren",
  "addAccountContactText": "Firma/Kontakt hinzufügen",
  "titleText": "Privat",
  "actionsText": "Express-Optionen",
  "viewsText": "Gehe zu"
});

localize("Mobile.SalesLogix.Views.Lead.Detail", {
  "activityTypeText": {
    "atPhoneCall": "Anruf",
    "atEMail": "E-Mail"
  },
  "accountText": "Unternehmen",
  "addressText": "Adresse",
  "businessDescriptionText": "Unternehmensbeschreibung",
  "createDateText": "Erstellungsdatum",
  "createUserText": "Angelegt von",
  "eMailText": "E-Mail",
  "leadSourceText": "Interessentenquelle",
  "industryText": "Branche",
  "interestsText": "Interessen",
  "leadTitleText": "Titel",
  "nameText": "Name",
  "notesText": "Kommentare",
  "ownerText": "Zugriffsberechtigter",
  "relatedActivitiesText": "Aktivitäten",
  "relatedHistoriesText": "Notizen/Historie",
  "relatedItemsText": "Verknüpfte Elemente",
  "relatedNotesText": "Notizen",
  "relatedAttachmentText": "Anlagen",
  "relatedAttachmentTitleText": "Anlagen mit Interessenten",
  "sicCodeText": "Branchencode",
  "titleText": "Interessent",
  "tollFreeText": "Gebührenfrei",
  "mobileText": "Mobiltelefon",
  "webText": "Web",
  "workText": "Geschäftliche Telefonnummer",
  "actionsText": "Express-Optionen",
  "callWorkNumberText": "Hauptnr. anrufen",
  "scheduleActivityText": "Aktivität planen",
  "addNoteText": "Notiz hinzufügen",
  "sendEmailText": "E-Mail senden",
  "viewAddressText": "Adresse anzeigen",
  "moreDetailsText": "Weitere Informationen",
  "calledText": "Anruf bei ${0}",
  "emailedText": "E-Mail an ${0}"
});

localize("Mobile.SalesLogix.Views.Lead.Edit", {
  "accountText": "Firma",
  "addressText": "Adresse",
  "businessText": "Unternehmensbeschreibung",
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
  "leadOwnerText": "Zugriffsberechtigter",
  "nameText": "Name",
  "notesText": "Kommentare",
  "notesTitleText": "Kommentare",
  "sicCodeText": "Branchencode",
  "titleText": "Interessent",
  "titleTitleText": "Titel",
  "tollFreeText": "Gebührenfrei",
  "webText": "Web",
  "workText": "Geschäftliche Telefonnummer",
  "mobileText": "Mobiltelefon"
});

localize("Mobile.SalesLogix.Views.Lead.List", {
  "titleText": "Interessenten",
  "activitiesText": "Aktivitäten",
  "notesText": "Notizen",
  "scheduleText": "Planen",
  "emailedText": "E-Mail an ${0}",
  "calledText": "Anruf bei ${0}",
  "editActionText": "Bearbeiten",
  "callMobileActionText": "Mobilnr. anrufen",
  "callWorkActionText": "Geschäftsnr. anrufen",
  "sendEmailActionText": "E-Mail",
  "addNoteActionText": "Notiz hinzufügen",
  "addActivityActionText": "Tätigkeit hinzufügen",
  "addAttachmentActionText": "Anlage hinzufügen",
  "phoneAbbreviationText": "Geschäftlich: ",
  "mobileAbbreviationText": "Mobil: ",
  "tollFreeAbbreviationText": "Gebührenfrei: "
});

localize("Mobile.SalesLogix.Views.LeadSource.List", {
  "titleText": "Interessentenquellen"
});

localize("Mobile.SalesLogix.Views.LeftDrawer", {
  "configureText": "Menü konfigurieren",
  "addAccountContactText": "Firma/Kontakt hinzufügen",
  "titleText": "Hauptmenü",
  "actionsText": "Express-Optionen",
  "viewsText": "Gehe zu",
  "footerText": "Sonstige",
  "settingsText": "Einstellungen",
  "helpText": "Hilfe",
  "logOutText": "Abmelden",
  "logOutConfirmText": "Möchten Sie sich wirklich abmelden?"
});

localize("Mobile.SalesLogix.Views.LogOff", {
  "messageText": "Sie wurden abgemeldet. Bitte schließen Sie Ihr Browserfenster.",
  "loginText": "Klicken sie hier, um sich wieder anzumelden.",
  "titleText": "Abgemeldet"
});

localize("Mobile.SalesLogix.Views.Login", {
  "copyrightText": "Copyright &copy; 2014 Infor. Alle Rechte vorbehalten. www.infor.com",
  "logOnText": "Anmelden",
  "passText": "Passwort",
  "rememberText": "speichern",
  "titleText": "Anmelden",
  "userText": "Benutzername",
  "invalidUserText": "Der Benutzername oder das Passwort ist ungültig.",
  "missingUserText": "Der Benutzerdatensatz konnte nicht gefunden werden.",
  "serverProblemText": "Auf dem Server ist ein Problem aufgetreten.",
  "requestAbortedText": "Die Anfrage wurde abgebrochen.",
  "logoText": "Infor CRM"
});

localize("Mobile.SalesLogix.Views.MetricConfigure", {
  "titleText": "Metrik konfigurieren",
  "metricTitleText": "Titel",
  "metricFilterText": "Filter",
  "metricText": "Metrik",
  "chartTypeText": "Diagrammtyp",
  "advancedText": "Erweiterte Optionen",
  "formatterText": "Formatierer",
  "aggregateText": "Aggregat",
  "reportViewText": "ID Diagrammanzeige"
});

localize("Mobile.SalesLogix.Views.MetricFilterLookup", {
  "titleText": "Filter-/Metriksuche"
});

localize("Mobile.SalesLogix.Views.MetricWidget", {
  "loadingText": "Wird geladen...",
  "errorText": "Fehler beim Laden des Widget."
});

localize("Mobile.SalesLogix.Views.NameEdit", {
  "titleText": "Name bearbeiten",
  "firstNameText": "Ersten",
  "middleNameText": "Zweiter Name",
  "lastNameText": "Nachname",
  "prefixText": "Präfix",
  "prefixTitleText": "Namenspräfix",
  "suffixText": "Titel",
  "suffixTitleText": "Namenssuffix"
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
  "addActivityActionText": "Tätigkeit hinzufügen",
  "addAttachmentActionText": "Anlage hinzufügen",
  "actualCloseText": "Abgeschlossen ",
  "estimatedCloseText": "Voraussichtlicher Abschluss "
});

localize("Mobile.SalesLogix.Views.OpportunityContact.Detail", {
  "titleText": "Kontakt für Verkaufschance",
  "accountText": "Firma",
  "contactTitleText": "Titel",
  "nameText": "Kontakt",
  "moreDetailsText": "Weitere Informationen",
  "salesRoleText": "Rolle",
  "strategyText": "Strategie",
  "personalBenefitsText": "persönliche Vort.",
  "standingText": "Bewertung",
  "issuesText": "Probleme",
  "competitorNameText": "Wettbewerbereinst.",
  "removeContactTitleText": "Kontakt entfernen",
  "confirmDeleteText": "\"${0}\" von der Verkaufschance entfernen?",
  "contactText": "Kontakt"
});

localize("Mobile.SalesLogix.Views.OpportunityContact.Edit", {
  "titleText": "Kontakt Verkaufschance bearbeiten",
  "nameText": "Name",
  "accountNameText": "Firma",
  "contactTitleText": "Titel",
  "salesRoleText": "Rolle",
  "salesRoleTitleText": "Rolle",
  "personalBenefitsText": "persönliche Vort.",
  "strategyText": "Strategie",
  "issuesText": "Probleme",
  "standingText": "Bewertung",
  "standingTitleText": "Bewertung",
  "contactText": "Kontakt",
  "competitorPrefText": "Wettbewerbereinst."
});

localize("Mobile.SalesLogix.Views.OpportunityContact.List", {
  "titleText": "Kontakte für Verkaufschance",
  "selectTitleText": "Kontakt auswählen",
  "activitiesText": "Aktivitäten",
  "notesText": "Notizen",
  "scheduleText": "Planen"
});

localize("Mobile.SalesLogix.Views.OpportunityProduct.Detail", {
  "detailsText": "Details",
  "opportunityText": "Verkaufschance",
  "productText": "Produkt",
  "productFamilyText": "Produktfamilie",
  "priceLevelText": "Preisstufe",
  "priceText": "Preis",
  "basePriceText": "Basispreis",
  "discountText": "Rabatt",
  "quantityText": "Menge",
  "baseExtendedPriceText": "Basis",
  "extendedPriceText": "Erweiterter Preis",
  "extendedPriceSectionText": "Erweiterter Preis",
  "adjustedPriceSectionText": "Angepasster Preis",
  "baseAdjustedPriceText": "Basis",
  "adjustedPriceText": "Angepasster Preis",
  "myAdjustedPriceText": "Benutzer",
  "confirmDeleteText": "${0} von den Produkten mit Verkaufschancen entfernen?",
  "removeOppProductTitleText": "Produkt mit Verkaufschancen entfernen"
});

localize("Mobile.SalesLogix.Views.OpportunityProduct.Edit", {
  "titleText": "Verkaufschancenprodukt",
  "detailsText": "Details",
  "opportunityText": "Verkaufschance",
  "productText": "Produkt",
  "productFamilyText": "Produktfamilie",
  "priceLevelText": "Preisstufe",
  "priceText": "Preis",
  "basePriceText": "Basispreis",
  "discountText": "Rabatt %",
  "adjustedPriceText": "Angepasster Preis",
  "myAdjustedPriceText": "Benutzer",
  "baseAdjustedPriceText": "Basis",
  "quantityText": "Menge",
  "baseExtendedPriceText": "Basis",
  "extendedPriceText": "Erweiterter Preis",
  "extendedPriceSectionText": "Erweiterter Preis",
  "adjustedPriceSectionText": "Angepasster Preis"
});

localize("Mobile.SalesLogix.Views.OpportunityProduct.List", {
  "titleText": "Produkte"
});

localize("Mobile.SalesLogix.Views.Owner.List", {
  "titleText": "Zugriffsberechtigte"
});

localize("Mobile.SalesLogix.Views.Product.List", {
  "titleText": "Produkte"
});

localize("Mobile.SalesLogix.Views.ProductProgram.List", {
  "titleText": "Produktprogramme"
});

localize("Mobile.SalesLogix.Views.Settings", {
  "clearLocalStorageTitleText": "Speicher löschen",
  "clearAuthenticationTitleText": "Gespeicherte Anmeldedaten löschen",
  "errorLogTitleText": "Fehlerberichte anzeigen",
  "localStorageClearedText": "Lokaler Speicher erfolgreich gelöscht.",
  "credentialsClearedText": "Gespeicherte Anmeldedaten erfolgreich gelöscht.",
  "titleText": "Einstellungen"
});

localize("Mobile.SalesLogix.Views.SpeedSearchList", {
  "titleText": "SpeedSearch",
  "indexesText": {
    "Account": "Firma",
    "Activity": "Aktivität",
    "Contact": "Kontakt",
    "History": "Historie",
    "Lead": "Interessent",
    "Opportunity": "Verkaufschance",
    "Ticket": "Ticket"
  }
});

localize("Mobile.SalesLogix.Views.TextEdit", {
  "titleText": "Text bearbeiten"
});

localize("Mobile.SalesLogix.Views.Ticket.Detail", {
  "accountText": "Firma",
  "areaText": "Bereich",
  "assignedDateText": "Zugewiesenes Datum",
  "assignedToText": "Zugewiesen zu",
  "completedByText": "Abgeschlossen von",
  "categoryText": "Kategorie",
  "contactText": "Kontakt",
  "contractText": "Vertrag",
  "descriptionText": "Abst.",
  "issueText": "Problem",
  "needByText": "Fälligkeitsdatum",
  "notesText": "Kommentare",
  "phoneText": "Telefon",
  "actionsText": "Express-Optionen",
  "relatedAttachmentText": "Anlagen",
  "relatedAttachmentTitleText": "Anlagen mit Tickets",
  "relatedActivitiesText": "Aktivitäten",
  "relatedItemsText": "Verknüpfte Elemente",
  "resolutionText": "Lösung",
  "sourceText": "Quelle",
  "statusText": "Status",
  "subjectText": "Betreff",
  "ticketIdText": "Ticket-Nummer",
  "titleText": "Ticket",
  "urgencyText": "Dringlichkeit",
  "scheduleActivityText": "Aktivität planen",
  "moreDetailsText": "Weitere Informationen",
  "relatedTicketActivitiesText": "Ticket-Aktivitäten",
  "loadingText": "Wird geladen..."
});

localize("Mobile.SalesLogix.Views.Ticket.Edit", {
  "accountText": "Firma",
  "areaText": "Bereich",
  "assignedDateText": "Zugewiesenes Datum",
  "assignedToText": "Zugewiesen zu",
  "categoryText": "Kategorie",
  "contactText": "Kontakt",
  "contractText": "Vertrag",
  "descriptionText": "Abst.",
  "descriptionTitleText": "Beschreibung",
  "issueText": "Problem",
  "needByText": "Fälligkeitsdatum",
  "notesText": "Kommentare",
  "notesTitleText": "Kommentare",
  "phoneText": "Telefon",
  "relatedActivitiesText": "Aktivitäten",
  "relatedItemsText": "Verknüpfte Elemente",
  "resolutionText": "Lösung",
  "resolutionTitleText": "Lösung",
  "sourceText": "Quelle",
  "sourceTitleText": "Quelle",
  "statusText": "Status",
  "subjectText": "Betreff",
  "ticketAreaTitleText": "Ticket-Bereich",
  "ticketCategoryTitleText": "Ticketkategorie",
  "ticketIdText": "Ticket-Nummer",
  "ticketIssueTitleText": "Ticketausstellung",
  "ticketStatusTitleText": "Ticket-Status",
  "ticketUrgencyTitleText": "Ticketdringlichkeit",
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
  "addActivityActionText": "Tätigkeit hinzufügen",
  "addAttachmentActionText": "Anlage hinzufügen",
  "assignedToText": "Zugewiesen zu: ",
  "urgencyText": "Dringlichkeit: ",
  "createdOnText": "Erstellt  ",
  "modifiedText": "Geändert ",
  "neededByText": "Erforderlich  "
});

localize("Mobile.SalesLogix.Views.Ticket.UrgencyLookup", {
  "titleText": "Ticketdringlichkeit"
});

localize("Mobile.SalesLogix.Views.TicketActivity.Detail", {
  "titleText": "Ticket-Aktivität",
  "accountText": "Firma",
  "contactText": "Kontakt",
  "typeText": "Typ",
  "publicAccessText": "Öffentlicher Zugriff",
  "assignedDateText": "Startdatum",
  "completedDateText": "Enddatum",
  "followUpText": "Folgeaktivität",
  "unitsText": "Zeiteinheiten",
  "elapsedUnitsText": "Verstrichene Stunden",
  "rateTypeDescriptionText": "Berechnungsart",
  "rateText": "Gebühr",
  "totalLaborText": "Gesamte Arbeitskosten",
  "totalPartsText": "Teile insgesamt",
  "totalFeeText": "Gesamtgebühr",
  "activityDescriptionText": "Kommentare",
  "ticketNumberText": "Ticket-Nummer",
  "userText": "Benutzer",
  "completeTicketText": "Ticket-Aktivität abschließen",
  "moreDetailsText": "Weitere Informationen",
  "relatedItemsText": "Verknüpfte Elemente",
  "relatedTicketActivityItemText": "Ticket-Aktivität (Teile)"
});

localize("Mobile.SalesLogix.Views.TicketActivity.RateLookup", {
  "titleText": "Sätze"
});

localize("Mobile.SalesLogix.Views.TicketActivityItem.Detail", {
  "titleText": "Ticketaktivität - Teil",
  "productNameText": "Produkt",
  "skuText": "SKU",
  "serialNumberText": "Seriennummer",
  "itemAmountText": "Preis",
  "itemDescriptionText": "Beschreibung"
});

localize("Mobile.SalesLogix.Views.TicketActivityItem.List", {
  "titleText": "Ticket-Aktivität (Teile)"
});

localize("Mobile.SalesLogix.Views.UpdateToolbar", {
  "updateText": "Ein Update ist verfügbar. Zum erneuten Laden anklicken."
});

localize("Mobile.SalesLogix.Views.User.CalendarAccessList", {
  "titleText": "Tätigkeitsressourcen"
});

localize("Mobile.SalesLogix.Views.User.List", {
  "titleText": "Benutzer"
});

localize("Mobile.SalesLogix.Views._CardLayoutListMixin", {
  "itemIconAltText": "Kontakt",
  "allRecordsText": "keine Suche angewendet"
});

localize("Mobile.SalesLogix.Views._GroupListMixin", {
  "noDefaultGroupText": "Keine Standardgruppe eingestellt. Öffnen Sie das Menü rechts und wählen Sie unter dem Gruppenbereich \"Konfigurieren\", um die Gruppen einzurichten.",
  "currentGroupNotFoundText": "Die aktuelle Gruppe wurde nicht gefunden.",
  "groupsModeText": "Sie befinden sich momentan im Gruppenmodus. Führen Sie eine Suche aus oder klicken Sie auf einen Hashtag, um den Gruppenmodus zu verlassen."
});

localize("Mobile.SalesLogix.Views._RightDrawerListMixin", {
  "hashTagsSectionText": "Hashtags",
  "groupsSectionText": "Gruppen",
  "kpiSectionText": "KPI",
  "configureGroupsText": "Konfigurieren",
  "refreshGroupsText": "Aktualisieren"
});

localize("Mobile.SalesLogix.Views._SpeedSearchRightDrawerListMixin", {
  "indexSectionText": "Indexe"
});
});
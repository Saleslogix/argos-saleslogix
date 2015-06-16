define('localization/saleslogix/de', ['localization/de', 'Mobile/SalesLogix/ApplicationModule'], function() {

localize("argos.Calendar", {
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

localize("argos.Fields.DateField", {
  "dateFormatText": "DD.MM.YYYY",
  "emptyText": "",
  "invalidDateFormatErrorText": "Feld '${0}' enthält ein ungültiges Datumsformat."
});

localize("argos.Format", {
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

localize("crm.GroupUtility", {
  "groupDateFormatText": "D.M.YYYY H:mm:ss"
});

localize("crm.Recurrence", {
  "dayFormatText": "DD",
  "monthFormatText": "MM",
  "monthAndDayFormatText": "MM.DD",
  "weekdayFormatText": "tttt",
  "endDateFormatText": "D.M.YYYY",
  "neverText": "niemals",
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
    "5": "Nachname"
  }
});

localize("crm.Views.Activity.Complete", {
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

localize("crm.Views.Activity.Detail", {
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
  "timelessText": "Ohne_Zeitangabe",
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
  "phoneText": "Telefon",
  "moreDetailsText": "Weitere Informationen"
});

localize("crm.Views.Activity.Edit", {
  "startingFormatText": "D.M.YYYY H:mm",
  "startingTimelessFormatText": "D.M.YYYY",
  "activityCategoryTitleText": "Tätigkeitskategorie",
  "activityDescriptionTitleText": "Aktivitätsbeschreibung",
  "locationText": "Standort",
  "activityTypeTitleText": "Aktivitätstyp",
  "alarmText": "Alarm",
  "reminderText": "Erinnerung",
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
  "recurringText": "Sich_wiederholende_Aktivität",
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

localize("crm.Views.Attachment.List", {
  "attachmentDateFormatText": "ddd D.M.YYYY HH:mm",
  "titleText": "Anlagen",
  "uploadedOnText": "Hochgeladen ",
  "hashTagQueriesText": {
    "url": "URL",
    "binary": "Binär"
  }
});

localize("crm.Views.Attachment.ViewAttachment", {
  "attachmentDateFormatText": "ddd M/D/YYYY H:mm",
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

localize("crm.Views.Calendar.DayView", {
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

localize("crm.Views.Calendar.MonthView", {
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

localize("crm.Views.Calendar.WeekView", {
  "weekTitleFormatText": "D. MMM YYYY",
  "dayHeaderLeftFormatText": "tttt",
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

localize("crm.Views.ErrorLog.Detail", {
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

localize("crm.Views.ErrorLog.List", {
  "errorDateFormatText": "DD.MM.YYYY HH:mm",
  "titleText": "Fehlerprotokolle"
});

localize("crm.Views.Event.Detail", {
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

localize("crm.Views.Event.Edit", {
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

localize("crm.Views.Event.List", {
  "eventDateFormatText": "D.M.YYYY",
  "titleText": "Ereignisse",
  "eventText": "Ereignis"
});

localize("crm.Views.History.Detail", {
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
  "timelessText": "Ohne-Zeitangabe",
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

localize("crm.Views.History.Edit", {
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

localize("crm.Views.History.List", {
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

localize("crm.Views.Opportunity.Detail", {
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
  "multiCurrencyText": "Mehrfachwährung",
  "multiCurrencyRateText": "Wechselkurs",
  "multiCurrencyCodeText": "Code",
  "multiCurrencyDateText": "Stichtag Satz",
  "multiCurrencyLockedText": "Satz gesperrt"
});

localize("crm.Views.Opportunity.Edit", {
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
  "multiCurrencyText": "Mehrfachwährung",
  "multiCurrencyRateText": "Wechselkurs",
  "multiCurrencyCodeText": "Code",
  "multiCurrencyDateText": "Stichtag Satz",
  "multiCurrencyLockedText": "Satz gesperrt",
  "subTypePickListResellerText": "Wiederverkäufer"
});

localize("crm.Views.TicketActivity.Edit", {
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

localize("crm.Views.TicketActivity.List", {
  "startDateFormatText": "DD.MM.YYYY H:mm",
  "titleText": "Ticket-Aktivitäten"
});

localize("argos.ErrorManager", {
  "abortedText": "Abgebrochen",
  "scopeSaveText": "Umfang wird nicht in Fehlerbericht gespeichert."
});

localize("argos.Fields.DurationField", {
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

localize("argos.Fields.EditorField", {
  "lookupLabelText": "Bearbeiten",
  "lookupText": "...",
  "emptyText": "leer",
  "completeText": "OK"
});

localize("argos.Fields.LookupField", {
  "dependentErrorText": "Es muss ein Wert für '${0}' ausgewählt werden.",
  "emptyText": "",
  "completeText": "Auswählen",
  "lookupLabelText": "Suchen",
  "lookupText": "..."
});

localize("argos.Fields.SignatureField", {
  "signatureLabelText": "Unterschrift",
  "signatureText": "..."
});

localize("argos.GroupedList", {
  "toggleCollapseText": "Ein-/ausblenden"
});

localize("argos.Groups.DateTimeSection", {
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

localize("argos.Groups.GroupByValueSection", {
  "displayNameText": "Gruppe durch Wertauswahl"
});

localize("argos.MainToolbar", {
  "titleText": "Mobil"
});

localize("argos.RelatedViewWidget", {
  "nodataText": "keine Datensätze gefunden ...",
  "selectMoreDataText": "siehe ${0} mehr von ${1} ... ",
  "navToListText": "siehe Liste",
  "loadingText": "lädt ... ",
  "refreshViewText": "Aktualisieren",
  "itemOfCountText": " ${0} von ${1}",
  "totalCountText": " (${0})",
  "titleText": "Zugehörige Ansicht"
});

localize("argos.SearchWidget", {
  "searchText": "Suchen"
});

localize("argos.SelectionModel", {
  "requireSelectionText": "Eine Auswahl ist erforderlich. Sie können die Auswahl für den letzten Eintrag nicht aufheben."
});

localize("argos.View", {
  "titleText": "Allgemeine Ansicht"
});

localize("argos.Views.ConfigureQuickActions", {
  "titleText": "Schnellaktionen konfigurieren"
});

localize("argos.Views.FileSelect", {
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

localize("argos.Views.Signature", {
  "titleText": "Unterschrift",
  "clearCanvasText": "Löschen",
  "undoText": "Rückgängig"
});

localize("argos._ConfigureBase", {
  "titleText": "Konfigurieren"
});

localize("argos._DetailBase", {
  "editText": "Bearbeiten",
  "titleText": "Detail",
  "detailsText": "Details",
  "loadingText": "Wird geladen...",
  "notAvailableText": "Die angeforderten Daten sind nicht verfügbar.",
  "toggleCollapseText": "Ein-/ausblenden"
});

localize("argos._EditBase", {
  "saveText": "Speichern",
  "titleText": "Bearbeiten",
  "validationSummaryText": "Validierungszusammenfassung",
  "concurrencySummaryText": "Fehler infolge gleichzeitigen Zugriffs",
  "detailsText": "Details",
  "loadingText": "Wird geladen...",
  "errorText": {
    "general": "Bei der Anforderung von Daten ist ein Serverfehler aufgetreten.",
    "status": {
      "410": "Fehler beim Speichern. Dieser Datensatz ist nicht mehr vorhanden."
    }
  },
  "concurrencyErrorText": "Ein anderer Benutzer hat dieses Feld aktualisiert."
});

localize("argos._ErrorHandleMixin", {
  "errorText": {
    "general": "Ein Serverfehler ist aufgetreten."
  }
});

localize("argos._ListBase", {
  "moreText": "Mehr Datensätze abrufen",
  "emptySelectionText": "unbegrenzt",
  "titleText": "Liste",
  "configureText": "Konfigurieren",
  "errorRenderText": "Fehler beim Darstellen der Zeilenvorlage.",
  "remainingText": "${0} Datensätze verbleibend",
  "cancelText": "Abbrechen",
  "insertText": "Neu",
  "noDataText": "Keine Datensätze",
  "loadingText": "Wird geladen..."
});

localize("argos._PullToRefreshMixin", {
  "pullRefreshText": "Zum Aktualisieren nach unten ziehen...",
  "pullReleaseText": "Zum Aktualisieren loslassen..."
});

localize("argos._RelatedViewWidgetBase", {
  "loadingText": "lädt ... "
});

localize("crm.Action", {
  "calledText": "Anruf bei ${0}",
  "emailedText": "E-Mail an ${0}"
});

localize("crm.Application", {
  "versionInfoText": "Mobil v${0}.${1}.${2}",
  "loadingText": "Anwendungsstatus wird geladen",
  "authText": "Authentifizierung"
});

localize("crm.ApplicationModule", {
  "searchText": "Suchen"
});

localize("crm.DefaultMetrics", {
  "accountsText": {
    "totalRevenue": "Gesamtumsatzerlös",
    "averageTime": "Durchschn. Zeit als Kunde",
    "total": "Firmen - gesamt"
  },
  "opportunitiesText": {
    "total": "Verkaufschancen - gesamt",
    "potential": "Gesamt-Forecast",
    "montlyPotential": "Durchschnittlicher Forecast pro Monat"
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

localize("crm.Fields.AddressField", {
  "lookupLabelText": "Bearbeiten",
  "emptyText": ""
});

localize("crm.Fields.NameField", {
  "emptyText": ""
});

localize("crm.Fields.RecurrencesField", {
  "titleText": "Sich wiederholende Aktivität",
  "emptyText": ""
});

localize("crm.FileManager", {
  "unableToUploadText": "Dieser Browser unterstützt keine HTML5-Datei-API.",
  "unknownSizeText": "Unbekannt",
  "unknownErrorText": "Warnung: Ein Fehler ist aufgetreten und die Datei konnte nicht hochgeladen werden.",
  "largeFileWarningText": "Warnung: Diese Abfrage überschreitet die von Ihrem Administrator festgelegte Größenbeschränkung und konnte nicht hochgeladen werden.",
  "percentCompleteText": "Upload läuft, bitte warten..."
});

localize("crm.Format", {
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

localize("crm.SpeedSearchWidget", {
  "searchText": "SpeedSearch"
});

localize("crm.Validator", {
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

localize("crm.Views.Account.Detail", {
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
  "subTypeText": "SubType",
  "titleText": "Firma",
  "typeText": "Typ",
  "webText": "Web",
  "scheduleActivityText": "Aktivität planen",
  "addNoteText": "Notiz hinzufügen",
  "moreDetailsText": "Weitere Informationen",
  "calledText": "Anruf bei ${0}"
});

localize("crm.Views.Account.Edit", {
  "accountStatusTitleText": "Firmenstatus",
  "accountSubTypeTitleText": "Firmen-Untertyp",
  "accountText": "Firma",
  "accountTypeTitleText": "Firmentyp",
  "acctMgrText": "Acct. Mgr.",
  "businessDescriptionText": "Unternehmensbeschreibung",
  "businessDescriptionTitleText": "Unternehmensbeschreibung",
  "descriptionText": "Beschreibung",
  "faxText": "Fax",
  "fullAddressText": "Adresse",
  "importSourceText": "Interessentenquelle",
  "industryText": "Branche",
  "industryTitleText": "Branche",
  "ownerText": "Zugriffsberechtigter",
  "phoneText": "Telefon",
  "statusText": "Status",
  "subTypeText": "SubType",
  "titleText": "Firma",
  "typeText": "Typ",
  "webText": "Web"
});

localize("crm.Views.Account.List", {
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

localize("crm.Views.Activity.List", {
  "allDayText": "Ohne Zeitangabe",
  "completeActivityText": "Abschließen",
  "callText": "Anruf",
  "calledText": "Angerufen",
  "addAttachmentActionText": "Anlage hinzufügen",
  "overdueText": "Überfällig",
  "alarmText": "Alarm",
  "touchedText": "Zuletzt bearbeitet von",
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
    "timeless": "Ohne-Zeitangabe",
    "today": "Heute",
    "this-week": "diese-Woche",
    "yesterday": "Gestern"
  }
});

localize("crm.Views.Activity.MyList", {
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

localize("crm.Views.Activity.Recurring", {
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

localize("crm.Views.Activity.TypesList", {
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

localize("crm.Views.AddAccountContact", {
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
  "homePhoneText": "Private Telefonnummer",
  "industryText": "Branche",
  "ownerText": "Zugriffsberechtigter",
  "lastNameText": "Letzte",
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

localize("crm.Views.Address.Edit", {
  "address1Text": "Adresse 1",
  "address2Text": "Adresse 2",
  "address3Text": "Adresse 3",
  "cityText": "Stadt",
  "cityTitleText": "Stadt",
  "countryText": "Land",
  "countryTitleText": "Land",
  "descriptionText": "Beschreibung",
  "descriptionTitleText": "Beschreibung",
  "isMailingText": "Lieferadresse",
  "isPrimaryText": "Hauptadresse",
  "postalCodeText": "PLZ",
  "salutationText": "Zu Händen von",
  "stateText": "Bundesland/Kanton",
  "stateTitleText": "Bundesland/Kanton",
  "titleText": "Adresse"
});

localize("crm.Views.Address.List", {
  "titleText": "Adressen"
});

localize("crm.Views.AreaCategoryIssueLookup", {
  "titleText": "Firmen"
});

localize("crm.Views.Attachment.AddAttachment", {
  "titleText": "Anlagen hinzufügen"
});

localize("crm.Views.Attachment.MyAttachmentList", {
  "titleText": "Meine Anlagen"
});

localize("crm.Views.Charts.GenericBar", {
  "titleText": ""
});

localize("crm.Views.Charts.GenericLine", {
  "titleText": ""
});

localize("crm.Views.Charts.GenericPie", {
  "titleText": ""
});

localize("crm.Views.Charts._ChartMixin", {
  "loadingText": "Wird geladen..."
});

localize("crm.Views.Competitor.List", {
  "titleText": "Mitbewerber"
});

localize("crm.Views.Configure", {
  "titleText": "Konfigurieren"
});

localize("crm.Views.Contact.Detail", {
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
  "homeText": "Private Telefonnummer",
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
  "workText": "Geschäftliche Telefonnummer",
  "cuisinePreferenceText": "Kulinarische Vorlieben",
  "callMobileNumberText": "Mobilnr. anrufen",
  "callWorkNumberText": "Geschäftsnr. anrufen",
  "calledText": "Angerufen",
  "scheduleActivityText": "Aktivität planen",
  "addNoteText": "Notiz hinzufügen",
  "sendEmailText": "E-Mail senden",
  "viewAddressText": "Adresse anzeigen",
  "moreDetailsText": "Weitere Informationen"
});

localize("crm.Views.Contact.Edit", {
  "titleText": "Kontakt",
  "nameText": "Name",
  "workText": "Geschäftliche Telefonnummer",
  "mobileText": "Mobiltelefon",
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

localize("crm.Views.Contact.List", {
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

localize("crm.Views.Contract.List", {
  "titleText": "Verträge"
});

localize("crm.Views.ExchangeRateLookup", {
  "titleText": "Wechselkurse"
});

localize("crm.Views.FooterToolbar", {
  "copyrightText": "&copy; 2014 SalesLogix, NA, LLC. Alle Rechte vorbehalten."
});

localize("crm.Views.Groups.Selector", {
  "titleText": "Gruppensuche"
});

localize("crm.Views.Help", {
  "titleText": "Hilfe",
  "errorText": "Fehler",
  "errorMessageText": "Das Hilfedokument konnte nicht geladen werden."
});

localize("crm.Views.History.RelatedView", {
  "regardingText": "Betreff",
  "byText": "geschrieben ",
  "titleText": "Notizen"
});

localize("crm.Views.Home", {
  "configureText": "Konfigurieren",
  "addAccountContactText": "Firma/Kontakt hinzufügen",
  "titleText": "Privat",
  "actionsText": "Express-Optionen",
  "viewsText": "Gehe zu"
});

localize("crm.Views.Lead.Detail", {
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

localize("crm.Views.Lead.Edit", {
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

localize("crm.Views.Lead.List", {
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

localize("crm.Views.LeadSource.List", {
  "titleText": "Interessentenquellen"
});

localize("crm.Views.LeftDrawer", {
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

localize("crm.Views.LogOff", {
  "messageText": "Sie wurden abgemeldet. Bitte schließen Sie Ihr Browserfenster.",
  "loginText": "Klicken sie hier, um sich wieder anzumelden.",
  "titleText": "Abgemeldet"
});

localize("crm.Views.Login", {
  "copyrightText": "Copyright &copy; 2015 Infor. Alle Rechte vorbehalten. www.infor.com",
  "logOnText": "Anmelden",
  "passText": "Passwort",
  "rememberText": "Speichern",
  "titleText": "Anmelden",
  "userText": "Benutzer-ID",
  "invalidUserText": "Der Benutzername oder das Passwort ist ungültig.",
  "missingUserText": "Der Benutzerdatensatz konnte nicht gefunden werden.",
  "requestAbortedText": "Die Anfrage wurde abgebrochen.",
  "logoText": "Infor CRM"
});

localize("crm.Views.MetricConfigure", {
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

localize("crm.Views.MetricFilterLookup", {
  "titleText": "Filter-/Metriksuche"
});

localize("crm.Views.MetricWidget", {
  "loadingText": "Wird geladen...",
  "errorText": "Fehler beim Laden des Widget."
});

localize("crm.Views.NameEdit", {
  "titleText": "Name bearbeiten",
  "firstNameText": "Ersten",
  "middleNameText": "2. Vorname",
  "lastNameText": "Nachname",
  "prefixText": "Präfix",
  "prefixTitleText": "Namenspräfix",
  "suffixText": "Suffix",
  "suffixTitleText": "Namenssuffix"
});

localize("crm.Views.Opportunity.List", {
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
  "estimatedCloseText": "Voraussichtlicher Abschluss ",
  "quickEditActionText": "QuickEdit"
});

localize("crm.Views.Opportunity.QuickEdit", {
  "estCloseText": "voraussichtlich",
  "detailsText": "Details",
  "opportunityStageTitleText": "Verkaufschancen-Phase",
  "opportunityText": "Verkaufschance",
  "stageText": "Phase",
  "statusOpenText": "Offen",
  "statusClosedLostText": "Abgeschlossen - Verloren",
  "statusClosedWonText": "Abgeschlossen - Erfolg",
  "salesProcessText": "Phase durch Verkaufsprozess gesperrt:",
  "probabilityText": "Wahrscheinlichkeit",
  "probabilityTitleText": "Wahrscheinlichkeit Verkaufschance",
  "potentialText": "Verkaufspotenzial"
});

localize("crm.Views.OpportunityContact.Detail", {
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

localize("crm.Views.OpportunityContact.Edit", {
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

localize("crm.Views.OpportunityContact.List", {
  "titleText": "Kontakte für Verkaufschance",
  "selectTitleText": "Kontakt auswählen",
  "activitiesText": "Aktivitäten",
  "notesText": "Notizen",
  "scheduleText": "Planen"
});

localize("crm.Views.OpportunityProduct.Detail", {
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
  "adjustedPriceSectionText": "Angebotener Preis",
  "baseAdjustedPriceText": "Basis",
  "adjustedPriceText": "Angebotener Preis",
  "myAdjustedPriceText": "Benutzer",
  "confirmDeleteText": "${0} von den Produkten mit Verkaufschancen entfernen?",
  "removeOppProductTitleText": "Produkt mit Verkaufschancen entfernen"
});

localize("crm.Views.OpportunityProduct.Edit", {
  "titleText": "Verkaufschancenprodukt",
  "detailsText": "Details",
  "opportunityText": "Verkaufschance",
  "productText": "Produkt",
  "productFamilyText": "Produktfamilie",
  "priceLevelText": "Preisstufe",
  "priceText": "Preis",
  "basePriceText": "Basispreis",
  "discountText": "Rabatt %",
  "adjustedPriceText": "Angebotener Preis",
  "myAdjustedPriceText": "Benutzer",
  "baseAdjustedPriceText": "Basis",
  "quantityText": "Menge",
  "baseExtendedPriceText": "Basis",
  "extendedPriceText": "Erweiterter Preis",
  "extendedPriceSectionText": "Erweiterter Preis",
  "adjustedPriceSectionText": "Angebotener Preis"
});

localize("crm.Views.OpportunityProduct.List", {
  "titleText": "Produkte"
});

localize("crm.Views.Owner.List", {
  "titleText": "Zugriffsberechtigte"
});

localize("crm.Views.Product.List", {
  "titleText": "Produkte"
});

localize("crm.Views.ProductProgram.List", {
  "titleText": "Produktprogramme"
});

localize("crm.Views.Settings", {
  "clearLocalStorageTitleText": "Speicher löschen",
  "clearAuthenticationTitleText": "Gespeicherte Anmeldedaten löschen",
  "errorLogTitleText": "Fehlerberichte anzeigen",
  "localStorageClearedText": "Lokaler Speicher erfolgreich gelöscht.",
  "credentialsClearedText": "Gespeicherte Anmeldedaten erfolgreich gelöscht.",
  "titleText": "Einstellungen"
});

localize("crm.Views.SpeedSearchList", {
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

localize("crm.Views.TextEdit", {
  "titleText": "Text bearbeiten"
});

localize("crm.Views.Ticket.Detail", {
  "accountText": "Firma",
  "areaText": "Bereich",
  "assignedDateText": "Zugewiesenes Datum",
  "assignedToText": "Zugewiesen zu",
  "completedByText": "Abgeschlossen von",
  "categoryText": "Kategorie",
  "contactText": "Kontakt",
  "contractText": "Vertrag",
  "descriptionText": "Beschreibung",
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

localize("crm.Views.Ticket.Edit", {
  "accountText": "Firma",
  "areaText": "Bereich",
  "assignedDateText": "Zugewiesenes Datum",
  "assignedToText": "Zugewiesen zu",
  "categoryText": "Kategorie",
  "contactText": "Kontakt",
  "contractText": "Vertrag",
  "descriptionText": "Beschreibung",
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

localize("crm.Views.Ticket.List", {
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
  "assignedToText": "Zugewiesen: ",
  "urgencyText": "Dringlichkeit: ",
  "createdOnText": "Erstellt  ",
  "modifiedText": "Geändert ",
  "neededByText": "Erforderlich  "
});

localize("crm.Views.Ticket.UrgencyLookup", {
  "titleText": "Ticketdringlichkeit"
});

localize("crm.Views.TicketActivity.Detail", {
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

localize("crm.Views.TicketActivity.RateLookup", {
  "titleText": "Sätze"
});

localize("crm.Views.TicketActivityItem.Detail", {
  "titleText": "Ticketaktivität - Teil",
  "productNameText": "Produkt",
  "skuText": "SKU",
  "serialNumberText": "Seriennummer",
  "itemAmountText": "Preis",
  "itemDescriptionText": "Beschreibung"
});

localize("crm.Views.TicketActivityItem.List", {
  "titleText": "Ticket-Aktivität (Teile)"
});

localize("crm.Views.UpdateToolbar", {
  "updateText": "Ein Update ist verfügbar. Zum erneuten Laden anklicken."
});

localize("crm.Views.User.CalendarAccessList", {
  "titleText": "Tätigkeitsressourcen"
});

localize("crm.Views.User.List", {
  "titleText": "Benutzer"
});

localize("crm.Views._CardLayoutListMixin", {
  "itemIconAltText": "Kontakt",
  "allRecordsText": "keine Suche angewendet"
});

localize("crm.Views._GroupListMixin", {
  "noDefaultGroupText": "Keine Standardgruppe eingerichtet. Klicken Sie hier, um Gruppen zu konfigurieren.",
  "currentGroupNotFoundText": "Die aktuelle Gruppe wurde nicht gefunden.",
  "groupTemplateSummaryText": "Zusammenfassung",
  "groupTemplateDetailText": "Detail",
  "groupsModeText": "Sie befinden sich momentan im Gruppenmodus. Führen Sie eine Suche aus oder klicken Sie auf einen Hashtag, um den Gruppenmodus zu verlassen."
});

localize("crm.Views._RightDrawerListMixin", {
  "hashTagsSectionText": "Hashtags",
  "groupsSectionText": "Gruppen",
  "kpiSectionText": "KPI",
  "configureGroupsText": "Konfigurieren",
  "refreshGroupsText": "Aktualisieren",
  "layoutsText": "Layouts"
});

localize("crm.Views._SpeedSearchRightDrawerListMixin", {
  "indexSectionText": "Indexe"
});
});
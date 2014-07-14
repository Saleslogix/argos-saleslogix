define('localization/saleslogix/it', ['localization/it', 'Mobile/SalesLogix/ApplicationModule'], function() {

localize("Sage.Platform.Mobile.Calendar", {
  "timeFormatText": "H:mm",
  "titleText": "Calendario",
  "amText": "AM",
  "pmText": "PM"
});

localize("Sage.Platform.Mobile.Fields.DateField", {
  "dateFormatText": "DD/MM/YYYY",
  "emptyText": "",
  "invalidDateFormatErrorText": "Formato data del campo '${0}' non valido."
});

localize("Sage.Platform.Mobile.Format", {
  "shortDateFormatText": "D/M/YYYY",
  "percentFormatText": "${0}${1}",
  "yesText": "Sì",
  "noText": "No",
  "trueText": "T",
  "falseText": "F",
  "hoursText": "Ore",
  "hourText": "ora",
  "minutesText": "Minuti",
  "minuteText": "minuto",
  "bytesText": "bytes"
});

localize("Mobile.SalesLogix.Recurrence", {
  "dayFormatText": "DD",
  "monthFormatText": "MM",
  "monthAndDayFormatText": "MM/DD",
  "weekdayFormatText": "dddd",
  "endDateFormatText": "D/M/YYYY",
  "neverText": "Mai",
  "daysText": "Giorni",
  "dailyText": "Giornalmente",
  "weeksText": "settimane",
  "weeklyText": "Settimanalmente",
  "weeklyOnText": "Settimanale il ${3}",
  "monthsText": "mesi",
  "monthlyText": "Mensilmente",
  "monthlyOnDayText": "Mensilmente il ${1}",
  "monthlyOnText": "Mensilmente il ${5} ${3}",
  "yearsText": "anni",
  "yearlyText": "Annualmente",
  "yearlyOnText": "Annuale il ${2}",
  "yearlyOnWeekdayText": "Annuale il ${5} ${3} in ${4}",
  "everyText": "ogni ${0} ${1}",
  "afterCompletionText": "Dopo completamento",
  "untilEndDateText": "${0} fino al ${1}",
  "ordText": {
    "0": "Giorno",
    "1": "Primo",
    "2": "secondo",
    "3": "terzo",
    "4": "quarto",
    "5": "Ultimo"
  }
});

localize("Mobile.SalesLogix.Views.Activity.Complete", {
  "completedFormatText": "D/M/YYYY H:mm",
  "startingFormatText": "D/M/YYYY H:mm",
  "startingTimelessFormatText": "D/M/YYYY",
  "activityInfoText": "Info attività",
  "accountText": "Azienda",
  "contactText": "Contatto",
  "opportunityText": "Opportunità",
  "ticketNumberText": "Ticket",
  "companyText": "Società",
  "leadText": "Nominativo",
  "asScheduledText": "Come pianificato",
  "categoryText": "Categoria",
  "categoryTitleText": "Categoria attività",
  "completedText": "Data completamento",
  "completionText": "Completamento",
  "durationText": "Durata",
  "durationInvalidText": "Il campo '${2}' deve contenere un valore.",
  "carryOverNotesText": "Riporta note",
  "followUpText": "Seguito",
  "followUpTitleText": "Tipo di seguito",
  "leaderText": "Responsabile",
  "longNotesText": "Note",
  "longNotesTitleText": "Note",
  "otherInfoText": "Altre info",
  "priorityText": "Priorità",
  "priorityTitleText": "Priorità",
  "regardingText": "Argomento",
  "regardingTitleText": "Argomento attività",
  "resultText": "Risultato",
  "resultTitleText": "Risultato",
  "startingText": "Data inizio",
  "timelessText": "Senza orario",
  "durationValueText": {
    "0": "Nessuno",
    "15": "15 minuti",
    "30": "30 minuti",
    "60": "1 ora",
    "90": "1,5 ore",
    "120": "2 ore"
  },
  "followupValueText": {
    "none": "Nessuno",
    "atPhoneCall": "Telefonata",
    "atAppointment": "Riunione",
    "atToDo": "Impegno",
    "atPersonal": "Attività Personale"
  }
});

localize("Mobile.SalesLogix.Views.Activity.Detail", {
  "startDateFormatText": "D/M/YYYY H:mm:ss",
  "timelessDateFormatText": "D/M/YYYY",
  "alarmDateFormatText": "D/M/YYYY H:mm:ss",
  "activityTypeText": {
    "atToDo": "Impegno",
    "atPhoneCall": "Telefonata",
    "atAppointment": "Riunione",
    "atLiterature": "Richiesta materiale informativo",
    "atPersonal": "Attività Personale"
  },
  "actionsText": "Azioni rapide",
  "completeActivityText": "Completa Attività",
  "completeOccurrenceText": "Completa occurrenza",
  "completeSeriesText": "Completa serie",
  "locationText": "Luogo",
  "alarmText": "Allarme",
  "alarmTimeText": "Allarme",
  "categoryText": "Categoria",
  "durationText": "Durata",
  "leaderText": "Responsabile",
  "longNotesText": "Note",
  "priorityText": "Priorità",
  "regardingText": "Argomento",
  "rolloverText": "Riporta Automaticamente",
  "startTimeText": "Ora iniziale",
  "allDayText": "Tutto il giorno",
  "timelessText": "Senza orario",
  "titleText": "Attività",
  "typeText": "Tipo",
  "companyText": "Società",
  "leadText": "Nominativo",
  "accountText": "Azienda",
  "contactText": "Contatto",
  "opportunityText": "Opportunità",
  "ticketNumberText": "Ticket",
  "whenText": "Quando",
  "whoText": "Chi",
  "recurrenceText": "ricorrenza",
  "confirmEditRecurrenceText": "Modificare tutte le occorrenze?\nAnnulla per modificare una singola occorrenza.",
  "relatedAttachmentText": "Allegati",
  "relatedAttachmentTitleText": "Allegati attività",
  "relatedItemsText": "Elementi correlati",
  "phoneText": "Telefono"
});

localize("Mobile.SalesLogix.Views.Activity.Edit", {
  "startingFormatText": "D/M/YYYY H:mm",
  "startingTimelessFormatText": "D/M/YYYY",
  "activityCategoryTitleText": "Categoria attività",
  "activityDescriptionTitleText": "Descrizione Attività",
  "locationText": "Luogo",
  "activityTypeTitleText": "Tipo di Attività",
  "alarmText": "Allarme",
  "reminderText": "",
  "categoryText": "Categoria",
  "durationText": "Durata",
  "durationTitleText": "Durata",
  "durationInvalidText": "Il campo '${2}' deve contenere un valore.",
  "reminderInvalidText": "Il campo 'promemoria' deve contenere un valore.",
  "reminderTitleText": "Promemoria",
  "leaderText": "Responsabile",
  "longNotesText": "Note",
  "longNotesTitleText": "Note",
  "priorityText": "Priorità",
  "priorityTitleText": "Priorità",
  "regardingText": "Argomento",
  "rolloverText": "Riporta Automaticamente",
  "startingText": "Ora iniziale",
  "repeatsText": "ripetizioni",
  "recurringText": "Ricorrente",
  "recurringTitleText": "Ricorrente",
  "timelessText": "Senza orario",
  "titleText": "Attività",
  "typeText": "Tipo",
  "accountText": "Azienda",
  "contactText": "Contatto",
  "opportunityText": "Opportunità",
  "ticketNumberText": "Ticket",
  "companyText": "Società",
  "leadText": "Nominativo",
  "isLeadText": "Nominativo",
  "yesText": "Sì",
  "noText": "No",
  "phoneText": "Telefono",
  "updateUserActErrorText": "Si è verificato un errore durante l'aggiornamento delle attività utente.",
  "reminderValueText": {
    "0": "Nessuno",
    "5": "5 minuti",
    "15": "15 minuti",
    "30": "30 minuti",
    "60": "1 ora",
    "1440": "1 giorno"
  },
  "durationValueText": {
    "0": "Nessuno",
    "15": "15 minuti",
    "30": "30 minuti",
    "60": "1 ora",
    "90": "1,5 ore",
    "120": "2 ore"
  }
});

localize("Mobile.SalesLogix.Views.Activity.List", {
  "startDateFormatText": "ddd D/M/YYYY",
  "startTimeFormatText": "H:mm",
  "allDayText": "Tutto il giorno",
  "completeActivityText": "Completa",
  "callText": "Chiamata",
  "calledText": "Chiamati",
  "addAttachmentActionText": "Aggiungi Allegato",
  "overdueText": "In Ritardo",
  "alarmText": "Allarme",
  "touchedText": "toccato",
  "importantText": "importante",
  "recurringText": "Ricorrente",
  "activityText": "Attività",
  "activityTypeText": {
    "atToDo": "Impegno",
    "atPhoneCall": "Telefonata",
    "atAppointment": "Riunione",
    "atLiterature": "Richiesta materiale informativo",
    "atPersonal": "Personale",
    "atQuestion": "Domanda",
    "atNote": "Nota",
    "atEMail": "E-Mail"
  },
  "titleText": "Attività",
  "hashTagQueriesText": {
    "alarm": "Allarme",
    "recurring": "Ricorrente",
    "timeless": "Senza-orario",
    "today": "Oggi",
    "this-week": "questa-settimana",
    "yesterday": "Ieri"
  }
});

localize("Mobile.SalesLogix.Views.Attachment.List", {
  "attachmentDateFormatText": "ddd D/M/YYYY HH:mm:ss",
  "titleText": "Allegati",
  "uploadedOnText": "Caricato ",
  "hashTagQueriesText": {
    "url": "Url",
    "binary": "Binario"
  }
});

localize("Mobile.SalesLogix.Views.Attachment.ViewAttachment", {
  "attachmentDateFormatText": "ddd D/M/YYYY H:mm",
  "detailsText": "Dettagli allegato",
  "descriptionText": "Descrizione",
  "fileNameText": "Nome File",
  "attachDateText": "Data allegato",
  "fileSizeText": "Dimensione File",
  "userText": "Utente",
  "newWindowText": "Apri in nuova finestra",
  "attachmentNotSupportedText": "Visualizzazione del tipo di allegato non supportata.",
  "downloadingText": "Downloading allegato in corso...",
  "notSupportedText": "Visualizzazione di allegati non supportata dal dispositivo."
});

localize("Mobile.SalesLogix.Views.Calendar.DayView", {
  "eventDateFormatText": "D/M/YYYY",
  "dateHeaderFormatText": "dddd, D/M/YYYY",
  "startTimeFormatText": "H:mm",
  "titleText": "Calendario",
  "todayText": "Oggi",
  "dayText": "Giorno",
  "weekText": "Settimana",
  "monthText": "Mese",
  "allDayText": "Tutto il giorno",
  "eventHeaderText": "Eventi",
  "activityHeaderText": "Attività",
  "eventMoreText": "Visualizza più eventi",
  "toggleCollapseText": "espandi comprimi"
});

localize("Mobile.SalesLogix.Views.Calendar.MonthView", {
  "monthTitleFormatText": "MMMM YYYY",
  "dayTitleFormatText": "ddd D MMM, YYYY",
  "eventDateFormatText": "D/M/YYYY",
  "startTimeFormatText": "H:mm",
  "titleText": "Calendario",
  "todayText": "Oggi",
  "dayText": "Giorno",
  "weekText": "Settimana",
  "monthText": "Mese",
  "allDayText": "Tutto il giorno",
  "eventText": "Evento",
  "eventHeaderText": "Eventi",
  "countMoreText": "Visualizza altro",
  "activityHeaderText": "Attività",
  "toggleCollapseText": "espandi comprimi"
});

localize("Mobile.SalesLogix.Views.Calendar.WeekView", {
  "weekTitleFormatText": "D MMM, YYYY",
  "dayHeaderLeftFormatText": "dddd",
  "dayHeaderRightFormatText": "D MMM, YYYY",
  "eventDateFormatText": "D/M/YYYY",
  "startTimeFormatText": "H:mm",
  "titleText": "Calendario",
  "todayText": "Oggi",
  "dayText": "Giorno",
  "weekText": "Settimana",
  "monthText": "Mese",
  "allDayText": "Tutto il giorno",
  "eventHeaderText": "Eventi",
  "eventMoreText": "Visualizza altri ${0} eventi",
  "toggleCollapseText": "espandi comprimi"
});

localize("Mobile.SalesLogix.Views.ErrorLog.Detail", {
  "errorDateFormatText": "DD/MM/YYYY HH:mm",
  "titleText": "Log errori",
  "detailsText": "Dettagli",
  "errorDateText": "Data",
  "statusTextText": "Errore",
  "urlText": "Url",
  "moreDetailsText": "Altri dettagli",
  "severityText": "Gravità",
  "statusCodeText": "Codice Status",
  "errorText": "Errore",
  "emailSubjectText": "Errore ricevuto nel Client Mobile Saleslogix",
  "copiedSuccessText": "Copiato negli Appunti"
});

localize("Mobile.SalesLogix.Views.ErrorLog.List", {
  "errorDateFormatText": "DD/MM/YYYY H:mm",
  "titleText": "Log errori"
});

localize("Mobile.SalesLogix.Views.Event.Detail", {
  "startDateFormatText": "D/M/YYYY H:mm:ss",
  "endDateFormatText": "D/M/YYYY H:mm:ss",
  "eventTypeText": {
    "atToDo": "Impegno",
    "atPhoneCall": "Telefonata",
    "atAppointment": "Riunione",
    "atLiterature": "Richiesta materiale informativo",
    "atPersonal": "Attività Personale"
  },
  "actionsText": "Azioni rapide",
  "startTimeText": "Data inizio",
  "endTimeText": "Data finale",
  "titleText": "Evento",
  "descriptionText": "Descrizione",
  "typeText": "Tipo",
  "whenText": "Quando"
});

localize("Mobile.SalesLogix.Views.Event.Edit", {
  "startingFormatText": "D/M/YYYY H:mm",
  "titleText": "Evento",
  "typeText": "Tipo",
  "descriptionText": "Descrizione",
  "startDateText": "Data inizio",
  "endDateText": "Data finale"
});

localize("Mobile.SalesLogix.Views.Event.List", {
  "eventDateFormatText": "D/M/YYYY",
  "titleText": "Eventi",
  "eventText": "Evento"
});

localize("Mobile.SalesLogix.Views.History.Detail", {
  "dateFormatText": "D/M/YYYY H:mm",
  "categoryText": "Categoria",
  "completedText": "Completata il",
  "durationText": "Durata",
  "leaderText": "Responsabile",
  "longNotesText": "Note",
  "notesText": "Note",
  "priorityText": "Priorità",
  "regardingText": "Argomento",
  "completedByText": "Completato Da",
  "scheduledText": "Pianificato",
  "timelessText": "Senza orario",
  "companyText": "Società",
  "leadText": "Nominativo",
  "titleText": "Cronologia",
  "accountText": "Azienda",
  "contactText": "Contatto",
  "opportunityText": "Opportunità",
  "ticketNumberText": "Ticket",
  "moreDetailsText": "Altri dettagli",
  "relatedItemsText": "Elementi correlati",
  "relatedAttachmentText": "Allegati",
  "relatedAttachmentTitleText": "Allegati della cronologia",
  "modifiedText": "Modificato",
  "typeText": "Tipo",
  "activityTypeText": {
    "atToDo": "Impegno",
    "atPhoneCall": "Telefonata",
    "atAppointment": "Riunione",
    "atLiterature": "Richiesta materiale informativo",
    "atPersonal": "Attività Personale",
    "atQuestion": "Domanda",
    "atEMail": "E-mail"
  }
});

localize("Mobile.SalesLogix.Views.History.Edit", {
  "startingFormatText": "D/M/YYYY H:mm",
  "accountText": "Azienda",
  "noteDescriptionTitleText": "Descrizione nota",
  "contactText": "Contatto",
  "longNotesText": "Note",
  "longNotesTitleText": "Note",
  "opportunityText": "Opportunità",
  "ticketNumberText": "Ticket",
  "regardingText": "Argomento",
  "isLeadText": "Nominativo",
  "startingText": "Ora",
  "titleText": "Nota",
  "companyText": "Società",
  "leadText": "Nominativo",
  "relatedItemsText": "Elementi correlati",
  "yesText": "Sì",
  "noText": "No"
});

localize("Mobile.SalesLogix.Views.History.List", {
  "hourMinuteFormatText": "H:mm",
  "dateFormatText": "D/M/YY",
  "activityTypeText": {
    "atToDo": "Impegno",
    "atPhoneCall": "Telefonata",
    "atAppointment": "Riunione",
    "atLiterature": "Richiesta materiale informativo",
    "atPersonal": "Attività Personale",
    "atQuestion": "Domanda",
    "atEMail": "E-mail"
  },
  "hashTagQueriesText": {
    "my-history": "La-mia-cronologia",
    "note": "Nota",
    "phonecall": "Telefonata",
    "meeting": "Riunione",
    "personal": "Personale",
    "email": "E-Mail"
  },
  "titleText": "Note/Cronologia",
  "viewAccountActionText": "Azienda",
  "viewOpportunityActionText": "Opp.",
  "viewContactActionText": "Contatto",
  "addAttachmentActionText": "Aggiungi Allegato",
  "regardingText": "Argomento: "
});

localize("Mobile.SalesLogix.Views.Opportunity.Detail", {
  "exchangeRateDateFormatText": "D/M/YYYY H:mm",
  "accountText": "Azienda",
  "acctMgrText": "Responsabile",
  "estCloseText": "Chiusura stimata",
  "detailsText": "Dettagli",
  "fbarHomeTitleText": "Schermata principale",
  "fbarScheduleTitleText": "Pianifica",
  "importSourceText": "Origine Nominativo",
  "opportunityText": "Opportunità",
  "ownerText": "Proprietario",
  "actionsText": "Azioni rapide",
  "potentialText": "Potenziale di vendita",
  "potentialBaseText": "Potenziale di vendita (tariffa base)",
  "potentialOpportunityText": "Potenziale di vendita (tariffa opp.)",
  "potentialMyRateText": "Potenziale di vendita (mia tariffa)",
  "probabilityText": "Prob. chiusura",
  "relatedActivitiesText": "Attività",
  "relatedContactsText": "Contatti Opportunità",
  "relatedHistoriesText": "Note/Cronologia",
  "relatedItemsText": "Elementi correlati",
  "relatedNotesText": "Nota",
  "relatedProductsText": "Prodotti",
  "relatedAttachmentText": "Allegati",
  "relatedAttachmentTitleText": "Allegati opportunità",
  "resellerText": "Rivenditore",
  "statusText": "Status",
  "titleText": "Opportunità",
  "typeText": "Tipo",
  "scheduleActivityText": "Pianifica Attività",
  "addNoteText": "Aggiungi Nota",
  "moreDetailsText": "Altri dettagli",
  "multiCurrencyText": "Multi-valuta",
  "multiCurrencyRateText": "Tasso di Cambio",
  "multiCurrencyCodeText": "Codice",
  "multiCurrencyDateText": "Data tasso",
  "multiCurrencyLockedText": "Tasso bloccato"
});

localize("Mobile.SalesLogix.Views.Opportunity.Edit", {
  "exchangeRateDateFormatText": "D/M/YYYY H:mm",
  "accountText": "Azienda",
  "acctMgrText": "Responsabile",
  "estCloseText": "Chiusura stimata",
  "importSourceText": "Origine Nominativo",
  "detailsText": "Dettagli",
  "opportunityStatusTitleText": "Status opportunità",
  "opportunityText": "Opportunità",
  "opportunityTypeTitleText": "Tipo opportunità",
  "ownerText": "Proprietario",
  "potentialText": "Potenziale di vendita",
  "probabilityText": "Prob. chiusura",
  "probabilityTitleText": "Probabilità opportunità",
  "resellerText": "Rivenditore",
  "statusText": "Status",
  "titleText": "Opportunità",
  "typeText": "Tipo",
  "multiCurrencyText": "Multi-valuta",
  "multiCurrencyRateText": "Tasso di Cambio",
  "multiCurrencyCodeText": "Codice",
  "multiCurrencyDateText": "Data tasso",
  "multiCurrencyLockedText": "Tasso bloccato",
  "subTypePickListResellerText": "Rivenditore"
});

localize("Mobile.SalesLogix.Views.TicketActivity.Edit", {
  "startingFormatText": "D/M/YYYY H:mm",
  "titleText": "Modifica Attività Ticket",
  "activityTypeText": "Tipo",
  "activityTypeTitleText": "Tipo",
  "publicAccessText": "Accesso pubblico",
  "publicAccessTitleText": "Accesso pubblico",
  "userText": "Utente",
  "startDateText": "Data inizio",
  "endDateText": "Data finale",
  "commentsText": "Commenti"
});

localize("Mobile.SalesLogix.Views.TicketActivity.List", {
  "startDateFormatText": "DD/MM/YYYY H:mm",
  "titleText": "Attività Ticket"
});

localize("Sage.Platform.Mobile.Detail", {
  "editText": "Modifica",
  "titleText": "Dettaglio",
  "detailsText": "Dettagli",
  "toggleCollapseText": "espandi comprimi",
  "loadingText": "Caricamento...",
  "requestErrorText": "Si è verificato un errore del server durante la richiesta di dati.",
  "notAvailableText": "La voce richiesta non è disponibile."
});

localize("Sage.Platform.Mobile.Edit", {
  "saveText": "Salva",
  "titleText": "Modifica",
  "toggleCollapseText": "espandi comprimi",
  "validationSummaryText": "Riepilogo convalida",
  "detailsText": "Dettagli",
  "loadingText": "Caricamento...",
  "requestErrorText": "Si è verificato un errore del server durante la richiesta di dati."
});

localize("Sage.Platform.Mobile.ErrorManager", {
  "abortedText": "Interrotto",
  "scopeSaveText": "Scope non salvato nel report degli errori"
});

localize("Sage.Platform.Mobile.Fields.BooleanField", {
  "onText": "Attivo",
  "offText": "Disattivo"
});

localize("Sage.Platform.Mobile.Fields.DurationField", {
  "emptyText": "",
  "invalidDurationErrorText": "Il campo '${0}' non ha una durata valida.",
  "autoCompleteText": {
    "1": "Minuto(i)",
    "60": "Ora(e)",
    "1440": "Giorno(i)",
    "10080": "settimane",
    "525960": "anno(i)"
  }
});

localize("Sage.Platform.Mobile.Fields.EditorField", {
  "lookupLabelText": "Modifica",
  "lookupText": "...",
  "emptyText": "vuoto",
  "completeText": "OK"
});

localize("Sage.Platform.Mobile.Fields.LookupField", {
  "dependentErrorText": "È necessario selezionare un valore per '${0}'.",
  "emptyText": "",
  "completeText": "Seleziona",
  "lookupLabelText": "Ricerca",
  "lookupText": "..."
});

localize("Sage.Platform.Mobile.Fields.SignatureField", {
  "signatureLabelText": "firma",
  "signatureText": "..."
});

localize("Sage.Platform.Mobile.GroupedList", {
  "toggleCollapseText": "espandi comprimi"
});

localize("Sage.Platform.Mobile.Groups.DateTimeSection", {
  "displayNameText": "Sezione data e ora",
  "todayText": "Oggi",
  "tomorrowText": "Domani",
  "laterThisWeekText": "Dopo in questa settimana",
  "earlierThisWeekText": "Prima in questa settimana",
  "thisLaterMonthText": "Dopo in questo mese",
  "thisEarlierMonthText": "Prima in questo mese",
  "thisYearEarlierText": "Prima in questo anno",
  "thisYearLaterText": "Dopo in questo anno",
  "yesterdayText": "Ieri",
  "lastWeekText": "Ultima settimana",
  "lastMonthText": "Ultimo mese",
  "pastYearText": "Anno(i) passato(i)",
  "nextYearText": "Anno successivo",
  "nextMonthText": "Mese successivo",
  "nextWeekText": "Prossima settimana",
  "futureText": "Futuro",
  "twoWeeksAgoText": "Due settimane fa",
  "threeWeeksAgoText": "Tre settimane fa",
  "twoMonthsAgoText": "Due mesi fa",
  "threeMonthsAgoText": "Tre mesi fa",
  "unknownText": "Sconosciuto"
});

localize("Sage.Platform.Mobile.Groups.GroupByValueSection", {
  "displayNameText": "Raggruppa per sezione valore"
});

localize("Sage.Platform.Mobile.List", {
  "moreText": "Recupera altri record",
  "emptySelectionText": "Nessuno",
  "titleText": "Elenco",
  "errorRenderText": "Errore durante il rendering del modello.",
  "remainingText": "${0} record rimanenti",
  "cancelText": "Annulla",
  "insertText": "Nuovo",
  "noDataText": "Nessun record",
  "loadingText": "Caricamento...",
  "requestErrorText": "Si è verificato un errore del server durante la richiesta di dati."
});

localize("Sage.Platform.Mobile.MainToolbar", {
  "titleText": "Cellulare"
});

localize("Sage.Platform.Mobile.RelatedViewWidget", {
  "nodataText": "Nessun record trovato...",
  "selectMoreDataText": "visualizza altri ${0} di ${1} ... ",
  "navToListText": "vedere elenco",
  "loadingText": "Caricamento in corso... ",
  "refreshViewText": "Aggiorna",
  "itemOfCountText": " ${0} di ${1}",
  "totalCountText": " (${0})"
});

localize("Sage.Platform.Mobile.SearchWidget", {
  "searchText": "Cerca"
});

localize("Sage.Platform.Mobile.View", {
  "titleText": "Vista generica"
});

localize("Sage.Platform.Mobile.Views.FileSelect", {
  "titleText": "Selezione file",
  "addFileText": "Fare clic o tap per aggiungere un file.",
  "uploadText": "Carica",
  "cancelText": "Annulla",
  "selectFileText": "Selezionare File",
  "loadingText": "Caricamento...",
  "descriptionText": "Descrizione",
  "bytesText": "bytes",
  "notSupportedText": "Aggiunta di allegati non supportata dal dispositivo."
});

localize("Sage.Platform.Mobile.Views.Signature", {
  "titleText": "Firma",
  "clearCanvasText": "Cancella",
  "undoText": "Annulla"
});

localize("Mobile.SalesLogix.Action", {
  "calledText": "Chiamati ${0}",
  "emailedText": "Contattato tramite e-mail ${0}"
});

localize("Mobile.SalesLogix.Application", {
  "versionInfoText": "Piattaforma Mobile v${0}.${1}.${2} / Saleslogix v${3}"
});

localize("Mobile.SalesLogix.ApplicationModule", {
  "searchText": "Ricerca"
});

localize("Mobile.SalesLogix.DefaultMetrics", {
  "accountsText": {
    "totalRevenue": "Ricavi totali",
    "averageTime": "Tempo medio come cliente",
    "total": "Aziende totali"
  },
  "opportunitiesText": {
    "total": "Opportunità totali",
    "potential": "Potenziale di vendita"
  },
  "ticketsText": {
    "total": "Ticket totali",
    "averageOpen": "Tempo medio aperti"
  },
  "contactsText": {
    "total": "Contatti totali"
  },
  "leadsText": {
    "total": "Prospect totali"
  },
  "historyText": {
    "total": "Cronologia totale",
    "duration": "Durata totale"
  }
});

localize("Mobile.SalesLogix.Fields.AddressField", {
  "lookupLabelText": "Modifica",
  "emptyText": ""
});

localize("Mobile.SalesLogix.Fields.NameField", {
  "emptyText": ""
});

localize("Mobile.SalesLogix.Fields.RecurrencesField", {
  "titleText": "Ricorrente",
  "emptyText": ""
});

localize("Mobile.SalesLogix.FileManager", {
  "unableToUploadText": "Questo browser non supporta le API file dell'HTML5.",
  "unknownSizeText": "Sconosciuto",
  "unknownErrorText": "Avviso: Si è verificato un errore. Impossibile caricare il file.",
  "largeFileWarningText": "Avviso: Impossibile caricare, la richiesta supera il limite di dimensioni impostato dall'amministratore.",
  "percentCompleteText": "Caricamento, attendere prego..."
});

localize("Mobile.SalesLogix.Format", {
  "bigNumberAbbrText": {
    "billion": "MLD",
    "million": "MLN",
    "thousand": "M"
  }
});

localize("Mobile.SalesLogix.SpeedSearchWidget", {
  "searchText": "SpeedSearch"
});

localize("Mobile.SalesLogix.Validator", {
  "exists": {
    "message": "Il campo '${2}' deve contenere un valore."
  },
  "name": {
    "message": "Il campo '${2}' deve contenere nome e cognome."
  },
  "notEmpty": {
    "message": "Il campo '${2}' non può essere vuoto."
  },
  "hasText": {
    "test": "",
    "message": "Il campo '${2}' deve contenere del testo."
  },
  "isInteger": {
    "message": "Il valore '${0}' non è un numero valido."
  },
  "isDecimal": {
    "message": "Il valore '${0}' non è un numero valido."
  },
  "isCurrency": {
    "message": "Il valore '${0}' non è un numero di valuta valido."
  },
  "isInt32": {
    "message": "Il valore del campo '${2}' supera l'intervallo numerico ammesso."
  },
  "exceedsMaxTextLength": {
    "message": "Il valore del campo '${2}' supera il limite di lunghezza ammesso."
  },
  "isDateInRange": {
    "message": "Il valore del campo '${2}' è al di fuori dell'intervallo di date ammesso."
  }
});

localize("Mobile.SalesLogix.Views.Account.Detail", {
  "accountText": "Azienda",
  "acctMgrText": "Responsabile",
  "addressText": "Indirizzo",
  "businessDescriptionText": "Descr. lavoro",
  "createDateText": "Data Creazione",
  "createUserText": "Creato da",
  "faxText": "Fax",
  "importSourceText": "Origine Nominativo",
  "industryText": "Settore",
  "notesText": "Note",
  "ownerText": "Proprietario",
  "phoneText": "Telefono",
  "activityTypeText": {
    "atPhoneCall": "Telefonata"
  },
  "actionsText": "Azioni rapide",
  "relatedActivitiesText": "Attività",
  "relatedContactsText": "Contatti",
  "relatedHistoriesText": "Note/Cronologia",
  "relatedItemsText": "Elementi correlati",
  "relatedNotesText": "Note",
  "relatedOpportunitiesText": "Opportunità",
  "relatedTicketsText": "Ticket",
  "relatedAddressesText": "Indirizzi",
  "relatedAttachmentText": "Allegati",
  "relatedAttachmentTitleText": "Allegati azienda",
  "statusText": "Status",
  "subTypeText": "SottoTipo",
  "titleText": "Azienda",
  "typeText": "Tipo",
  "webText": "Web",
  "callMainNumberText": "Chiama numero principale",
  "scheduleActivityText": "Pianifica Attività",
  "addNoteText": "Aggiungi Nota",
  "viewAddressText": "Visualizza indirizzo",
  "moreDetailsText": "Altri dettagli",
  "calledText": "Chiamati ${0}"
});

localize("Mobile.SalesLogix.Views.Account.Edit", {
  "accountStatusTitleText": "Status azienda",
  "accountSubTypeTitleText": "Sottotipo azienda",
  "accountText": "Azienda",
  "accountTypeTitleText": "Tipo Azienda",
  "acctMgrText": "Responsabile",
  "businessDescriptionText": "Attività dell'azienda",
  "businessDescriptionTitleText": "Descrizione Attività",
  "descriptionText": "Descrizione",
  "faxText": "Fax",
  "fullAddressText": "Indirizzo",
  "importSourceText": "Origine Nominativo",
  "industryText": "Settore",
  "industryTitleText": "Settore",
  "ownerText": "Proprietario",
  "phoneText": "Telefono",
  "statusText": "Status",
  "subTypeText": "SottoTipo",
  "titleText": "Azienda",
  "typeText": "Tipo",
  "webText": "Web"
});

localize("Mobile.SalesLogix.Views.Account.List", {
  "titleText": "Aziende",
  "activitiesText": "Attività",
  "notesText": "Note",
  "scheduleText": "Pianifica",
  "editActionText": "Modifica",
  "callMainActionText": "Chiama numero principale",
  "viewContactsActionText": "Contatti",
  "addNoteActionText": "Aggiungi Nota",
  "addActivityActionText": "Aggiungi attività",
  "addAttachmentActionText": "Aggiungi Allegato",
  "phoneAbbreviationText": "Telefono: ",
  "faxAbbreviationText": "Fax: ",
  "hashTagExpressionText": {
    "active": "Attivo",
    "inactive": "Inattivo",
    "suspect": "Sospetto",
    "lead": "Nominativo",
    "prospect": "Prospetto",
    "customer": "Cliente",
    "partner": "Partner",
    "vendor": "Distributore",
    "influencer": "Influenzatore",
    "competitor": "Concorrente"
  },
  "hashTagQueriesText": {
    "my-accounts": "miei-account",
    "active": "Attivo",
    "inactive": "Inattivo",
    "suspect": "sospetto",
    "lead": "Nominativo",
    "prospect": "Prospetto",
    "customer": "Cliente",
    "partner": "Partner",
    "vendor": "Distributore",
    "influencer": "Influenzatore",
    "competitor": "Concorrente"
  }
});

localize("Mobile.SalesLogix.Views.Activity.MyList", {
  "titleText": "Le mie attività",
  "completeActivityText": "Completa",
  "acceptActivityText": "Accetta",
  "declineActivityText": "Rifiuta",
  "callText": "Chiamata",
  "calledText": "Chiamati",
  "addAttachmentActionText": "Aggiungi Allegato",
  "viewContactActionText": "Contatto",
  "viewAccountActionText": "Azienda",
  "viewOpportunityActionText": "Opportunità",
  "hashTagQueriesText": {
    "alarm": "Allarme",
    "status-unconfirmed": "status-non-confermato",
    "status-accepted": "status-accettato",
    "status-declined": "status-rifiutato",
    "recurring": "Ricorrente",
    "timeless": "Senza-orario",
    "today": "Oggi",
    "this-week": "questa-settimana",
    "yesterday": "Ieri"
  }
});

localize("Mobile.SalesLogix.Views.Activity.Recurring", {
  "startingText": "Data inizio",
  "endingText": "Data finale",
  "repeatsText": "ripetizioni",
  "everyText": "Ogni",
  "afterCompletionText": "Dopo completamento",
  "singleWeekdayText": "giorno della settimana",
  "weekdaysText": "giorni della settimana",
  "dayText": "Giorno",
  "monthText": "Mese",
  "onText": "Attivo",
  "occurrencesText": "Occorrenze",
  "summaryText": "Riepilogo",
  "frequencyOptionsText": {
    "0": "Giorni",
    "1": "settimane",
    "2": "mesi",
    "3": "anni"
  },
  "recurringFrequencyText": "Frequenza ricorrenza",
  "yesText": "Sì",
  "noText": "No",
  "titleText": "Ricorrenza"
});

localize("Mobile.SalesLogix.Views.Activity.TypesList", {
  "titleText": "Pianifica...",
  "activityTypeText": {
    "atToDo": "Impegno",
    "atPhoneCall": "Telefonata",
    "atAppointment": "Riunione",
    "atLiterature": "Richiesta materiale informativo",
    "atPersonal": "Attività Personale",
    "event": "Evento"
  }
});

localize("Mobile.SalesLogix.Views.AddAccountContact", {
  "accountNameText": "Azienda",
  "accountStatusTitleText": "Status azienda",
  "accountSubTypeTitleText": "Sottotipo azienda",
  "accountText": "Azienda",
  "accountTypeTitleText": "Tipo Azienda",
  "acctMgrText": "Responsabile",
  "addressText": "Indirizzo",
  "contactTitleText": "Titolo",
  "descriptionText": "Descrizione",
  "detailsAccountText": "Info azienda",
  "detailsContactText": "Info contatto",
  "detailsText": "Info contatto / azienda",
  "emailText": "E-Mail",
  "faxText": "Fax",
  "homePhoneText": "Tel.abitazione",
  "industryText": "Settore",
  "ownerText": "Proprietario",
  "lastNameText": "Cognome",
  "mobileText": "Cellulare",
  "nameText": "Nome",
  "statusText": "Status",
  "subTypeText": "Sotto-Tipo",
  "titleText": "Aggiungi Azienda/Contatto",
  "typeText": "Tipo",
  "webText": "Web",
  "workText": "Telefono Ufficio",
  "industryTitleText": "Settore"
});

localize("Mobile.SalesLogix.Views.Address.Edit", {
  "address1Text": "Indirizzo 1",
  "address2Text": "Indirizzo 2",
  "address3Text": "Indirizzo 3",
  "cityText": "Città",
  "cityTitleText": "Città",
  "countryText": "Nazione",
  "countryTitleText": "Nazione",
  "descriptionText": "Descrizione",
  "descriptionTitleText": "Descrizione",
  "isMailingText": "Spedizione",
  "isPrimaryText": "Primario",
  "postalCodeText": "Codice Postale",
  "salutationText": "Attenzione",
  "stateText": "Stato",
  "stateTitleText": "Stato",
  "titleText": "Indirizzo"
});

localize("Mobile.SalesLogix.Views.Address.List", {
  "titleText": "Indirizzi"
});

localize("Mobile.SalesLogix.Views.AreaCategoryIssueLookup", {
  "titleText": "Aziende"
});

localize("Mobile.SalesLogix.Views.Attachment.AddAttachment", {
  "titleText": "Aggiungi allegati"
});

localize("Mobile.SalesLogix.Views.Attachment.MyAttachmentList", {
  "titleText": "Miei allegati"
});

localize("Mobile.SalesLogix.Views.Charts.GenericBar", {
  "titleText": "",
  "otherText": "Altro"
});

localize("Mobile.SalesLogix.Views.Charts.GenericPie", {
  "titleText": "",
  "otherText": "Altro"
});

localize("Mobile.SalesLogix.Views.Competitor.List", {
  "titleText": "Concorrenti"
});

localize("Mobile.SalesLogix.Views.Configure", {
  "titleText": "Configura"
});

localize("Mobile.SalesLogix.Views.Contact.Detail", {
  "activityTypeText": {
    "atPhoneCall": "Telefonata",
    "atEMail": "E-mail"
  },
  "accountText": "Azienda",
  "acctMgrText": "Responsabile",
  "addressText": "Indirizzo",
  "contactTitleText": "Titolo",
  "createDateText": "Data Creazione",
  "createUserText": "Creato da",
  "emailText": "E-Mail",
  "faxText": "Fax",
  "homeText": "Tel.abitazione",
  "nameText": "Contatto",
  "ownerText": "Proprietario",
  "actionsText": "Azioni rapide",
  "relatedAccountsText": "Aziende",
  "relatedActivitiesText": "Attività",
  "relatedHistoriesText": "Note/Cronologia",
  "relatedItemsText": "Elementi correlati",
  "relatedNotesText": "Note",
  "relatedOpportunitiesText": "Opportunità",
  "relatedTicketsText": "Ticket",
  "relatedAddressesText": "Indirizzi",
  "relatedAttachmentText": "Allegati",
  "relatedAttachmentTitleText": "Allegati contatto",
  "titleText": "Contatto",
  "webText": "Web",
  "workText": "Telefono",
  "cuisinePreferenceText": "Pref. culinarie",
  "callMobileNumberText": "Chiama cellulare",
  "callWorkNumberText": "Chiama numero principale",
  "calledText": "Chiamati",
  "scheduleActivityText": "Pianifica Attività",
  "addNoteText": "Aggiungi Nota",
  "sendEmailText": "Invia e-mail",
  "viewAddressText": "Visualizza indirizzo",
  "moreDetailsText": "Altri dettagli"
});

localize("Mobile.SalesLogix.Views.Contact.Edit", {
  "titleText": "Contatto",
  "nameText": "Nome",
  "workText": "Telefono",
  "mobileText": "Cellulare",
  "emailText": "E-Mail",
  "webText": "Web",
  "acctMgrText": "Responsabile",
  "accountNameText": "Azienda",
  "homePhoneText": "Tel.abitazione",
  "faxText": "Fax",
  "addressText": "Indirizzo",
  "contactTitleText": "Titolo",
  "titleTitleText": "Titolo",
  "addressTitleText": "Indirizzo",
  "ownerText": "Proprietario",
  "cuisinePreferenceText": "Pref. culinarie",
  "cuisinePreferenceTitleText": "Pref. culinarie"
});

localize("Mobile.SalesLogix.Views.Contact.List", {
  "titleText": "Contatti",
  "activitiesText": "Attività",
  "notesText": "Note",
  "scheduleText": "Pianifica",
  "editActionText": "Modifica",
  "callMainActionText": "Chiama numero principale",
  "callWorkActionText": "Chiama ufficio",
  "callMobileActionText": "Chiama cellulare",
  "sendEmailActionText": "E-Mail",
  "viewAccountActionText": "Azienda",
  "addNoteActionText": "Aggiungi Nota",
  "addActivityActionText": "Aggiungi attività",
  "addAttachmentActionText": "Aggiungi Allegato",
  "phoneAbbreviationText": "Tel. Ufficio: ",
  "mobileAbbreviationText": "Cellulare: ",
  "hashTagQueriesText": {
    "my-contacts": "I-miei-contatti",
    "primary": "Primario",
    "not-primary": "Non-primari",
    "can-email": "Si-può-inviare-e-mail",
    "can-phone": "Si-può-telefonare",
    "can-fax": "Si-può-inviare-fax",
    "can-mail": "Si-può-inviare-posta",
    "can-solicit": "Si-può-contattare"
  }
});

localize("Mobile.SalesLogix.Views.Contract.List", {
  "titleText": "Contratti"
});

localize("Mobile.SalesLogix.Views.ExchangeRateLookup", {
  "titleText": "Tassi di Cambio"
});

localize("Mobile.SalesLogix.Views.FooterToolbar", {
  "copyrightText": "&copy; 2014 SalesLogix, NA, LLC. Tutti i diritti riservati."
});

localize("Mobile.SalesLogix.Views.Help", {
  "titleText": "Aiuto",
  "errorText": "Errore",
  "errorMessageText": "Impossibile caricare il documento della Guida."
});

localize("Mobile.SalesLogix.Views.History.RelatedView", {
  "regardingText": "Argomento",
  "byText": "ha scritto ",
  "titleText": "Note"
});

localize("Mobile.SalesLogix.Views.Home", {
  "configureText": "Configura",
  "addAccountContactText": "Aggiungi Azienda/Contatto",
  "titleText": "Pagina principale",
  "actionsText": "Azioni rapide",
  "viewsText": "Vai a"
});

localize("Mobile.SalesLogix.Views.Lead.Detail", {
  "activityTypeText": {
    "atPhoneCall": "Telefonata",
    "atEMail": "E-mail"
  },
  "accountText": "Società",
  "addressText": "Indirizzo",
  "businessDescriptionText": "Attività dell'azienda",
  "createDateText": "Data Creazione",
  "createUserText": "Creato da",
  "eMailText": "E-Mail",
  "leadSourceText": "Origine Nominativo",
  "industryText": "Settore",
  "interestsText": "Interessi",
  "leadTitleText": "Titolo",
  "nameText": "Nome",
  "notesText": "Commenti",
  "ownerText": "Proprietario",
  "relatedActivitiesText": "Attività",
  "relatedHistoriesText": "Note/Cronologia",
  "relatedItemsText": "Elementi correlati",
  "relatedNotesText": "Note",
  "relatedAttachmentText": "Allegati",
  "relatedAttachmentTitleText": "Allegati nominativo",
  "sicCodeText": "Codice SIC",
  "titleText": "Nominativo",
  "tollFreeText": "Num. verde",
  "mobileText": "Cellulare",
  "webText": "Web",
  "workText": "Telefono Ufficio",
  "actionsText": "Azioni rapide",
  "callWorkNumberText": "Chiama numero principale",
  "scheduleActivityText": "Pianifica Attività",
  "addNoteText": "Aggiungi Nota",
  "sendEmailText": "Invia e-mail",
  "viewAddressText": "Visualizza indirizzo",
  "moreDetailsText": "Altri dettagli",
  "calledText": "Chiamati ${0}",
  "emailedText": "Contattato tramite e-mail ${0}"
});

localize("Mobile.SalesLogix.Views.Lead.Edit", {
  "accountText": "Azienda",
  "addressText": "Indirizzo",
  "businessText": "Descr. lavoro",
  "businessTitleText": "Descrizione Attività",
  "companyText": "Società",
  "contactTitleText": "Titolo",
  "emailText": "E-Mail",
  "faxText": "Fax",
  "importSourceText": "Origine Nominativo",
  "industryText": "Settore",
  "industryTitleText": "Settore",
  "interestsText": "Interessi",
  "leadNameLastFirstText": "Nome",
  "leadOwnerText": "Proprietario",
  "nameText": "Nome",
  "notesText": "Commenti",
  "notesTitleText": "Commenti",
  "sicCodeText": "Codice SIC",
  "titleText": "Nominativo",
  "titleTitleText": "Titolo",
  "tollFreeText": "Num. verde",
  "webText": "Web",
  "workText": "Telefono Ufficio",
  "mobileText": "Cellulare"
});

localize("Mobile.SalesLogix.Views.Lead.List", {
  "titleText": "Nominativi",
  "activitiesText": "Attività",
  "notesText": "Note",
  "scheduleText": "Pianifica",
  "emailedText": "Contattato tramite e-mail ${0}",
  "calledText": "Chiamati ${0}",
  "editActionText": "Modifica",
  "callMobileActionText": "Chiama cellulare",
  "callWorkActionText": "Chiama ufficio",
  "sendEmailActionText": "E-Mail",
  "addNoteActionText": "Aggiungi Nota",
  "addActivityActionText": "Aggiungi attività",
  "addAttachmentActionText": "Aggiungi Allegato",
  "phoneAbbreviationText": "Tel. Ufficio: ",
  "mobileAbbreviationText": "Cellulare: ",
  "tollFreeAbbreviationText": "Num. verde: ",
  "hashTagQueriesText": {
    "my-leads": "I-miei-nominativi",
    "can-email": "Si-può-inviare-email",
    "can-phone": "Si-può-telefonare",
    "can-fax": "Si-può-inviare-fax",
    "can-mail": "Si-può-inviare-posta",
    "can-solicit": "Si-può-contattare"
  }
});

localize("Mobile.SalesLogix.Views.LeadSource.List", {
  "titleText": "Origine Nominativi"
});

localize("Mobile.SalesLogix.Views.LeftDrawer", {
  "configureText": "Configurazione Menù",
  "addAccountContactText": "Aggiungi Azienda/Contatto",
  "titleText": "Menu principale",
  "actionsText": "Azioni rapide",
  "viewsText": "Vai a",
  "footerText": "Altro",
  "settingsText": "Impostazioni",
  "helpText": "Aiuto",
  "logOutText": "Disconnetti",
  "logOutConfirmText": "Vuoi uscire da Saleslogix?"
});

localize("Mobile.SalesLogix.Views.Login", {
  "copyrightText": "&copy; 2014 SalesLogix, NA, LLC. Tutti i diritti riservati.",
  "logOnText": "Accedi a Saleslogix",
  "passText": "Password",
  "rememberText": "Ricorda",
  "titleText": "Connessione",
  "userText": "Nome Utente",
  "invalidUserText": "Nome utente o password non validi.",
  "missingUserText": "Record utente non trovato.",
  "serverProblemText": "Si è verificato un problema sul server.",
  "requestAbortedText": "Richiesta annullata."
});

localize("Mobile.SalesLogix.Views.MainToolbar", {
  "titleText": "Saleslogix"
});

localize("Mobile.SalesLogix.Views.MetricConfigure", {
  "titleText": "Configura metrica ",
  "metricTitleText": "Titolo",
  "metricFilterText": "Filtro",
  "metricText": "Metrica",
  "chartTypeText": "Tipo diagramma",
  "advancedText": "Opzioni Avanzate",
  "formatterText": "formato",
  "aggregateText": "Aggrega",
  "reportViewText": "ID visualizzazione diagramma"
});

localize("Mobile.SalesLogix.Views.MetricFilterLookup", {
  "titleText": "Ricerca filtro/metrica"
});

localize("Mobile.SalesLogix.Views.MetricWidget", {
  "loadingText": "Caricamento..."
});

localize("Mobile.SalesLogix.Views.NameEdit", {
  "titleText": "Modifica Nome",
  "firstNameText": "Nome",
  "middleNameText": "Secondo nome",
  "lastNameText": "Cognome",
  "prefixText": "Titolo",
  "prefixTitleText": "Titolo",
  "suffixText": "Titolo straniero",
  "suffixTitleText": "Titolo straniero"
});

localize("Mobile.SalesLogix.Views.Opportunity.List", {
  "titleText": "Opportunità",
  "activitiesText": "Attività",
  "notesText": "Note",
  "scheduleText": "Pianifica",
  "editActionText": "Modifica",
  "viewAccountActionText": "Azienda",
  "viewContactsActionText": "Contatti",
  "viewProductsActionText": "Prodotti",
  "addNoteActionText": "Aggiungi Nota",
  "addActivityActionText": "Aggiungi attività",
  "addAttachmentActionText": "Aggiungi Allegato",
  "actualCloseText": "Chiuso ",
  "estimatedCloseText": "Chiusura stimata ",
  "hashTagQueriesText": {
    "my-opportunities": "Le-mie-opportunità",
    "open": "Aperta",
    "closed": "Chiuse",
    "won": "Vinta",
    "lost": "Persa",
    "inactive": "Inattivo"
  },
  "hashTagExpressionText": {
    "open": "Aperta",
    "won": "Chiusa - Vinta",
    "lost": "Chiusa - Persa",
    "inactive": "Inattivo"
  }
});

localize("Mobile.SalesLogix.Views.OpportunityContact.Detail", {
  "titleText": "Contatto Opportunità",
  "accountText": "Azienda",
  "contactTitleText": "Titolo",
  "nameText": "Contatto",
  "moreDetailsText": "Altri dettagli",
  "salesRoleText": "Ruolo",
  "strategyText": "Strategia",
  "personalBenefitsText": "int. personale",
  "standingText": "Reputazione",
  "issuesText": "Problemi",
  "competitorNameText": "Concorrente pref.",
  "removeContactTitleText": "Rimuovi contatto",
  "confirmDeleteText": "Rimuovere \"${0}\" dalle opportunità?",
  "contactText": "Contatto"
});

localize("Mobile.SalesLogix.Views.OpportunityContact.Edit", {
  "titleText": "Modifica Contatto Opportunità",
  "nameText": "Nome",
  "accountNameText": "Azienda",
  "contactTitleText": "Titolo",
  "salesRoleText": "Ruolo",
  "salesRoleTitleText": "Ruolo",
  "personalBenefitsText": "int. personale",
  "strategyText": "Strategia",
  "issuesText": "Problemi",
  "standingText": "Reputazione",
  "standingTitleText": "Reputazione",
  "contactText": "Contatto",
  "competitorPrefText": "Concorrente pref."
});

localize("Mobile.SalesLogix.Views.OpportunityContact.List", {
  "titleText": "Contatti Opportunità",
  "selectTitleText": "Seleziona contatto",
  "activitiesText": "Attività",
  "notesText": "Note",
  "scheduleText": "Pianifica"
});

localize("Mobile.SalesLogix.Views.OpportunityProduct.Detail", {
  "detailsText": "Dettagli",
  "opportunityText": "Opportunità",
  "productText": "Prodotto",
  "productFamilyText": "Famiglia prodotto",
  "priceLevelText": "Livello di prezzo",
  "priceText": "Prezzo",
  "basePriceText": "Prezzo base",
  "discountText": "Sconto",
  "quantityText": "Quantità",
  "baseExtendedPriceText": "Base",
  "extendedPriceText": "Importo Prodotto",
  "extendedPriceSectionText": "Importo Prodotto",
  "adjustedPriceSectionText": "Prezzo scontato",
  "baseAdjustedPriceText": "Base",
  "adjustedPriceText": "Prezzo scontato",
  "myAdjustedPriceText": "Utente",
  "confirmDeleteText": "Rimuovere ${0} dai prodotti dell'opportunità?",
  "removeOppProductTitleText": "rimuovi prodotto opportunità"
});

localize("Mobile.SalesLogix.Views.OpportunityProduct.Edit", {
  "titleText": "Prodotto Opportunità",
  "detailsText": "Dettagli",
  "opportunityText": "Opportunità",
  "productText": "Prodotto",
  "productFamilyText": "Famiglia prodotto",
  "priceLevelText": "Livello di prezzo",
  "priceText": "Prezzo",
  "basePriceText": "Prezzo base",
  "discountText": "% sconto",
  "adjustedPriceText": "Prezzo scontato",
  "myAdjustedPriceText": "Utente",
  "baseAdjustedPriceText": "Base",
  "quantityText": "Quantità",
  "baseExtendedPriceText": "Base",
  "extendedPriceText": "Importo Prodotto",
  "extendedPriceSectionText": "Importo Prodotto",
  "adjustedPriceSectionText": "Prezzo scontato"
});

localize("Mobile.SalesLogix.Views.OpportunityProduct.List", {
  "titleText": "Prodotti"
});

localize("Mobile.SalesLogix.Views.Owner.List", {
  "titleText": "Proprietari"
});

localize("Mobile.SalesLogix.Views.Product.List", {
  "titleText": "Prodotti"
});

localize("Mobile.SalesLogix.Views.ProductProgram.List", {
  "titleText": "Listini Prodotto"
});

localize("Mobile.SalesLogix.Views.Settings", {
  "clearLocalStorageTitleText": "Cancella Local Storage",
  "clearAuthenticationTitleText": "Cancella credenziali salvate",
  "errorLogTitleText": "Visualizza log errori",
  "localStorageClearedText": "Local Storage cancellato.",
  "credentialsClearedText": "Credenziali salvate cancellate.",
  "titleText": "Impostazioni"
});

localize("Mobile.SalesLogix.Views.SpeedSearchList", {
  "titleText": "SpeedSearch",
  "indexesText": {
    "Account": "Azienda",
    "Activity": "Attività",
    "Contact": "Contatto",
    "History": "Cronologia",
    "Lead": "Nominativo",
    "Opportunity": "Opportunità",
    "Ticket": "Ticket"
  }
});

localize("Mobile.SalesLogix.Views.TextEdit", {
  "titleText": "Modifica testo"
});

localize("Mobile.SalesLogix.Views.Ticket.Detail", {
  "accountText": "Azienda",
  "areaText": "Area",
  "assignedDateText": "Assegnato il",
  "assignedToText": "Assegnato a",
  "completedByText": "Completato Da",
  "categoryText": "Categoria",
  "contactText": "Contatto",
  "contractText": "Contratto",
  "descriptionText": "Descrizione",
  "issueText": "Problema",
  "needByText": "Data limite",
  "notesText": "Commenti",
  "phoneText": "Telefono",
  "actionsText": "Azioni rapide",
  "relatedAttachmentText": "Allegati",
  "relatedAttachmentTitleText": "Allegati ticket",
  "relatedActivitiesText": "Attività",
  "relatedItemsText": "Elementi correlati",
  "resolutionText": "Soluzione",
  "sourceText": "Origine",
  "statusText": "Status",
  "subjectText": "Oggetto",
  "ticketIdText": "Numero Ticket",
  "titleText": "Ticket",
  "urgencyText": "Urgenza",
  "scheduleActivityText": "Pianifica Attività",
  "moreDetailsText": "Altri dettagli",
  "relatedTicketActivitiesText": "Attività Ticket",
  "loadingText": "Caricamento..."
});

localize("Mobile.SalesLogix.Views.Ticket.Edit", {
  "accountText": "Azienda",
  "areaText": "Area",
  "assignedDateText": "Assegnato il",
  "assignedToText": "Assegnato a",
  "categoryText": "Categoria",
  "contactText": "Contatto",
  "contractText": "Contratto",
  "descriptionText": "Descrizione",
  "descriptionTitleText": "Descrizione",
  "issueText": "Problema",
  "needByText": "Data limite",
  "notesText": "Commenti",
  "notesTitleText": "Commenti",
  "phoneText": "Telefono",
  "relatedActivitiesText": "Attività",
  "relatedItemsText": "Elementi correlati",
  "resolutionText": "Soluzione",
  "resolutionTitleText": "Soluzione",
  "sourceText": "Origine",
  "sourceTitleText": "Origine",
  "statusText": "Status",
  "subjectText": "Oggetto",
  "ticketAreaTitleText": "Area Ticket",
  "ticketCategoryTitleText": "Categoria ticket",
  "ticketIdText": "Numero Ticket",
  "ticketIssueTitleText": "Problema ticket",
  "ticketStatusTitleText": "Status Ticket",
  "ticketUrgencyTitleText": "Urgenza ticket",
  "titleText": "Ticket",
  "urgencyText": "Urgenza"
});

localize("Mobile.SalesLogix.Views.Ticket.List", {
  "titleText": "Ticket",
  "activitiesText": "Attività",
  "scheduleText": "Pianifica",
  "notAssignedText": "Non assegnato",
  "editActionText": "Modifica",
  "viewAccountActionText": "Azienda",
  "viewContactActionText": "Contatto",
  "addNoteActionText": "Aggiungi Nota",
  "addActivityActionText": "Aggiungi attività",
  "addAttachmentActionText": "Aggiungi Allegato",
  "assignedToText": "Assegnato a: ",
  "urgencyText": "Urgenza: ",
  "createdOnText": "Creato  ",
  "modifiedText": "Modificato ",
  "neededByText": "Data Limite  ",
  "hashTagQueriesText": {
    "assigned-to-me": "Assegnati-a-me",
    "completed-by-me": "Completati-da-me"
  }
});

localize("Mobile.SalesLogix.Views.Ticket.UrgencyLookup", {
  "titleText": "Urgenza ticket"
});

localize("Mobile.SalesLogix.Views.TicketActivity.Detail", {
  "titleText": "Attività Ticket",
  "accountText": "Azienda",
  "contactText": "Contatto",
  "typeText": "Tipo",
  "publicAccessText": "Accesso pubblico",
  "assignedDateText": "Data inizio",
  "completedDateText": "Data finale",
  "followUpText": "Seguito",
  "unitsText": "Unità di tempo",
  "elapsedUnitsText": "Ore trascorse",
  "rateTypeDescriptionText": "Tipo addebito",
  "rateText": "Tasso",
  "totalLaborText": "Lavoro Totale",
  "totalPartsText": "Totale Ricambi",
  "totalFeeText": "Totale Parcella",
  "activityDescriptionText": "Commenti",
  "ticketNumberText": "Numero Ticket",
  "userText": "Utente",
  "completeTicketText": "Completa Attività Ticket",
  "moreDetailsText": "Altri dettagli",
  "relatedItemsText": "Elementi correlati",
  "relatedTicketActivityItemText": "Ricambi"
});

localize("Mobile.SalesLogix.Views.TicketActivity.RateLookup", {
  "titleText": "Tariffe"
});

localize("Mobile.SalesLogix.Views.TicketActivityItem.Detail", {
  "titleText": "Ricambio",
  "productNameText": "Prodotto",
  "skuText": "Cod. Prodotto",
  "serialNumberText": "N. Seriale",
  "itemAmountText": "Prezzo",
  "itemDescriptionText": "Descrizione"
});

localize("Mobile.SalesLogix.Views.TicketActivityItem.List", {
  "titleText": "Ricambi"
});

localize("Mobile.SalesLogix.Views.UpdateToolbar", {
  "updateText": "Aggiornamento disponibile. Fare clic per ricaricare."
});

localize("Mobile.SalesLogix.Views.User.List", {
  "titleText": "Utenti"
});

localize("Mobile.SalesLogix.Views._CardLayoutListMixin", {
  "itemIconAltText": "Contatto",
  "allRecordsText": "Nessuna ricerca applicata"
});

localize("Mobile.SalesLogix.Views._RightDrawerListMixin", {
  "hashTagsSectionText": "Hashtag",
  "kpiSectionText": "KPI"
});

localize("Mobile.SalesLogix.Views._SpeedSearchRightDrawerListMixin", {
  "indexSectionText": "Indici",
  "configureText": "Configura"
});
});
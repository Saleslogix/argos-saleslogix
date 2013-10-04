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

localize("Mobile.SalesLogix.Views.Activity.Complete", {
  "completedFormatText": "D/M/YYYY H:mm",
  "startingFormatText": "D/M/YYYY H:mm",
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
  "followUpTitleText": "Tipo di follow-up",
  "leaderText": "Responsabile",
  "longNotesText": "Nota",
  "longNotesTitleText": "Nota",
  "otherInfoText": "Altre info",
  "priorityText": "Priorità",
  "priorityTitleText": "Priorità",
  "regardingText": "Argomento",
  "regardingTitleText": "Aargomento attività",
  "resultText": "Risultato",
  "resultTitleText": "Risultato",
  "startingText": "Data iniziale",
  "startingFormatTimelessText": "D/M/YYYY",
  "timelessText": "Senza orario",
  "durationValueText": {
    "0": "Nessuno",
    "15": "15 minuti",
    "30": "30 minuti",
    "60": "1 Ora",
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
  "startDateFormatText": "D/M/YYYY H:mm",
  "timelessDateFormatText": "D/M/YYYY",
  "alarmDateFormatText": "D/M/YYYY H:mm",
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
  "locationText": "Posizione",
  "alarmText": "Allarme",
  "alarmTimeText": "Allarme",
  "categoryText": "Categoria",
  "durationText": "Durata",
  "leaderText": "Responsabile",
  "longNotesText": "Nota",
  "priorityText": "Priorità",
  "regardingText": "Argomento",
  "rolloverText": "Riporta Automaticamente",
  "startTimeText": "Ora iniziale",
  "allDayText": "tutto il giorno",
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
  "confirmEditRecurrenceText": "Modificare tutte le occurrenze?\\nAnnulla per modificare una singola occurrenza.",
  "relatedAttachmentText": "Allegati",
  "relatedAttachmentTitleText": "Allegati attività",
  "relatedItemsText": "Elementi correlati",
  "phoneText": "Telefono"
});

localize("Mobile.SalesLogix.Views.Activity.Edit", {
  "startingFormatText": "D/M/YYYY H:mm",
  "activityCategoryTitleText": "Categoria attività",
  "activityDescriptionTitleText": "Descrizione Attività",
  "locationText": "Posizione",
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
  "longNotesText": "Nota",
  "longNotesTitleText": "Nota",
  "priorityText": "Priorità",
  "priorityTitleText": "Priorità",
  "regardingText": "Argomento",
  "rolloverText": "Riporta Automaticamente",
  "startingText": "Ora iniziale",
  "startingFormatTimelessText": "D/M/YYYY",
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
  "isLeadText": "per cliente potenziale",
  "yesText": "Sì",
  "noText": "No",
  "phoneText": "Telefono",
  "updateUserActErrorText": "Si è verificato un errore durante l'aggiornamento delle attività utente.",
  "reminderValueText": {
    "0": "Nessuno",
    "5": "5 minuti",
    "15": "15 minuti",
    "30": "30 minuti",
    "60": "1 Ora",
    "1440": "1 giorno"
  },
  "durationValueText": {
    "0": "Nessuno",
    "15": "15 minuti",
    "30": "30 minuti",
    "60": "1 Ora",
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
  "activityTypeText": {
    "atToDo": "Impegno",
    "atPhoneCall": "Telefonata",
    "atAppointment": "Riunione",
    "atLiterature": "Richiesta doc",
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
  "attachmentDateFormatText": "ddd D/M/YYYY H:mm:ss",
  "titleText": "Allegati",
  "uploadedOnText": "Caricato ",
  "hashTagQueriesText": {
    "url": "Url",
    "binary": "Binario"
  }
});

localize("Mobile.SalesLogix.Views.Attachment.ViewAttachment", {
  "attachmentDateFormatText": "ddd D/M/YYYY H:mm a",
  "detailsText": "Dettagli allegato",
  "descriptionText": "Descrizione",
  "fileNameText": "Nome File",
  "attachDateText": "data allegato",
  "fileSizeText": "Dimensione File",
  "userText": "Utente",
  "attachmentNotSupportedText": "Visualizzazione del tipo di allegato non supportata.",
  "downloadingText": "Downloading allegato in corso..."
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
  "eventMoreText": "Visualizza altri ${0} eventi",
  "toggleCollapseText": "compressione ON/OFF"
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
  "toggleCollapseText": "compressione ON/OFF"
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
  "toggleCollapseText": "compressione ON/OFF"
});

localize("Mobile.SalesLogix.Views.ErrorLog.Detail", {
  "errorDateFormatText": "DD/MM/YYYY H:mm",
  "titleText": "Log errori",
  "detailsText": "Dettagli",
  "errorDateText": "Data",
  "statusTextText": "Errore",
  "urlText": "Url",
  "moreDetailsText": "Altri dettagli",
  "severityText": "Gravità",
  "statusCodeText": "Codice Status",
  "errorText": "Errore",
  "emailSubjectText": "Errore ricevuto in Saleslogix Mobile Client",
  "copiedSuccessText": "Copiato negli Appunti"
});

localize("Mobile.SalesLogix.Views.ErrorLog.List", {
  "errorDateFormatText": "DD/MM/YYYY H:mm",
  "titleText": "Log errori"
});

localize("Mobile.SalesLogix.Views.Event.Detail", {
  "startDateFormatText": "D/M/YYYY H:mm",
  "endDateFormatText": "D/M/YYYY H:mm",
  "eventTypeText": {
    "atToDo": "Impegno",
    "atPhoneCall": "Telefonata",
    "atAppointment": "Riunione",
    "atLiterature": "Richiesta materiale informativo",
    "atPersonal": "Attività Personale"
  },
  "actionsText": "Azioni rapide",
  "startTimeText": "Data iniziale",
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
  "startDateText": "Data iniziale",
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
  "completedText": "Completato",
  "durationText": "Durata",
  "leaderText": "Responsabile",
  "longNotesText": "Nota",
  "notesText": "Nota",
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
  "relatedAttachmentTitleText": "Allegati cronologia",
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
  "longNotesText": "Nota",
  "longNotesTitleText": "Nota",
  "opportunityText": "Opportunità",
  "ticketNumberText": "Ticket",
  "regardingText": "Argomento",
  "isLeadText": "per cliente potenziale",
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
    "my-history": "mia-cronologia",
    "note": "Nota",
    "phonecall": "chiamata-telefonica",
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
  "accountText": "acct",
  "acctMgrText": "gest acct",
  "estCloseText": "chiusura est",
  "detailsText": "Dettagli",
  "fbarHomeTitleText": "Abitazione",
  "fbarScheduleTitleText": "Pianifica",
  "importSourceText": "Fonte Nominativo",
  "opportunityText": "Opportunità",
  "ownerText": "Proprietario",
  "actionsText": "Azioni rapide",
  "potentialText": "Potenziale Vendite",
  "potentialBaseText": "potentiali vendite (tariffa base)",
  "potentialOpportunityText": "potentiali vendite (tariffa opp.)",
  "potentialMyRateText": "potentiali vendite (mia tariffa)",
  "probabilityText": "prob ciusura",
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
  "multiCurrencyDateText": "data tariffa",
  "multiCurrencyLockedText": "tariffa bloccata"
});

localize("Mobile.SalesLogix.Views.Opportunity.Edit", {
  "exchangeRateDateFormatText": "D/M/YYYY H:mm",
  "accountText": "acct",
  "acctMgrText": "gest acct",
  "estCloseText": "chiusura est",
  "importSourceText": "Fonte Nominativo",
  "detailsText": "Dettagli",
  "opportunityStatusTitleText": "Status opportunità",
  "opportunityText": "Opportunità",
  "opportunityTypeTitleText": "Tipo opportunità",
  "ownerText": "Proprietario",
  "potentialText": "Potenziale Vendite",
  "probabilityText": "prob ciusura",
  "probabilityTitleText": "Probabilità opportunità",
  "resellerText": "Rivenditore",
  "statusText": "Status",
  "titleText": "Opportunità",
  "typeText": "Tipo",
  "multiCurrencyText": "Multi-valuta",
  "multiCurrencyRateText": "Tasso di Cambio",
  "multiCurrencyCodeText": "Codice",
  "multiCurrencyDateText": "data tariffa",
  "multiCurrencyLockedText": "tariffa bloccata",
  "subTypePickListResellerText": "Rivenditore"
});

localize("Mobile.SalesLogix.Views.TicketActivity.Edit", {
  "startingFormatText": "D/M/YYYY H:mm",
  "titleText": "Modifica Attività Ticket",
  "activityTypeText": "Tipo",
  "activityTypeTitleText": "Tipo",
  "publicAccessText": "accesso pubblico",
  "publicAccessTitleText": "Accesso pubblico",
  "userText": "Utente",
  "startDateText": "Data iniziale",
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
  "toggleCollapseText": "compressione ON/OFF",
  "loadingText": "Caricamento...",
  "requestErrorText": "Si è verificato un errore del server durante la richiesta di dati.",
  "notAvailableText": "La voce richiesta non è disponibile."
});

localize("Sage.Platform.Mobile.Edit", {
  "saveText": "Salva",
  "titleText": "Modifica",
  "toggleCollapseText": "compressione ON/OFF",
  "validationSummaryText": "Riepilogo convalida",
  "detailsText": "Dettagli",
  "loadingText": "Caricamento...",
  "requestErrorText": "Si è verificato un errore del server durante la richiesta di dati."
});

localize("Sage.Platform.Mobile.ErrorManager", {
  "abortedText": "Interrotto",
  "scopeSaveText": "Ambito non salavato nel rapporto errori"
});

localize("Sage.Platform.Mobile.Fields.BooleanField", {
  "onText": "su",
  "offText": "Disattivo"
});

localize("Sage.Platform.Mobile.Fields.DurationField", {
  "emptyText": "",
  "invalidDurationErrorText": "Durata nel campo '${0}' non valida.",
  "autoCompleteText": {
    "1": "Minuto(i)",
    "60": "Ora(e)",
    "1440": "Giorno(i)",
    "10080": "settimane",
    "525960": "anni"
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

localize("Sage.Platform.Mobile.Fields.NoteField", {
  "emptyText": ""
});

localize("Sage.Platform.Mobile.Fields.SignatureField", {
  "signatureLabelText": "firma",
  "signatureText": "..."
});

localize("Sage.Platform.Mobile.GroupedList", {
  "toggleCollapseText": "compressione ON/OFF"
});

localize("Sage.Platform.Mobile.Groups.DateTimeSection", {
  "displayNameText": "Sezione data e ora",
  "todayText": "Oggi",
  "tomorrowText": "Domani",
  "laterThisWeekText": "Prima in questa settimana",
  "earlierThisWeekText": "Dopo in questa settimana",
  "thisLaterMonthText": "Dopo in questo mese",
  "thisEarlierMonthText": "Prima in questo mese",
  "thisYearEarlierText": "Prima in questo anno",
  "thisYearLaterText": "Dopo in questo anno",
  "yesterdayText": "Ieri",
  "lastWeekText": "Ultima settimana",
  "lastMonthText": "Ultimo mese",
  "pastYearText": "Anni passati",
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
  "nodataText": "nessun record trovato...",
  "selectMoreDataText": "visualizza altri ${0} di ${1} ... ",
  "navToListText": "vedere elenco",
  "loadingText": "caricamento in corso... ",
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
  "addFileText": "Fare clic o toccare qui per aggiungere un file.",
  "uploadText": "Carica",
  "cancelText": "Annulla",
  "selectFileText": "Selezionare File",
  "loadingText": "Caricamento...",
  "descriptionText": "Descrizione",
  "bytesText": "bytes"
});

localize("Sage.Platform.Mobile.Views.Signature", {
  "titleText": "Firma",
  "clearCanvasText": "Cancella",
  "undoText": "Undo"
});

localize("Mobile.SalesLogix.Action", {
  "calledText": "Chiamati ${0}",
  "emailedText": "Contatti tramite e-mail ${0}"
});

localize("Mobile.SalesLogix.ApplicationModule", {
  "searchText": "Ricerca"
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
  "unableToUploadText": "Questo browser non supporta API di file HTML5.",
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

localize("Mobile.SalesLogix.Recurrence", {
  "neverText": "Mai",
  "daysText": "Giorni",
  "dailyText": "Giornalmente",
  "weeksText": "settimane",
  "weeklyText": "Settimanalmente",
  "weeklyOnText": "Settimanale su ${3}",
  "monthsText": "mesi",
  "monthlyText": "Mensilmente",
  "monthlyOnDayText": "Mensile su ${1}",
  "monthlyOnText": "Mensile su ${5} ${3}",
  "yearsText": "anni",
  "yearlyText": "Annualmente",
  "yearlyOnText": "Annuale su ${2}",
  "yearlyOnWeekdayText": "Annuale su ${5} ${3} in ${4}",
  "everyText": "ogni ${0} ${1}",
  "afterCompletionText": "dopo completamento",
  "untilEndDateText": "${0} fino al ${1}",
  "ordText": {
    "0": "Giorno",
    "1": "Nome",
    "2": "secondo",
    "3": "terzo",
    "4": "quarto",
    "5": "Ultimo"
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
  "acctMgrText": "gest acct",
  "addressText": "Indirizzo",
  "businessDescriptionText": "desc lav",
  "createDateText": "Data Creazione",
  "createUserText": "Creato da",
  "faxText": "Corretto nella Versione:",
  "importSourceText": "Fonte Nominativo",
  "industryText": "Settore",
  "notesText": "Nota",
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
  "relatedNotesText": "Nota",
  "relatedOpportunitiesText": "Opportunità",
  "relatedTicketsText": "Ticket",
  "relatedAddressesText": "Indirizzi",
  "relatedAttachmentText": "Allegati",
  "relatedAttachmentTitleText": "Allegati account",
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
  "accountStatusTitleText": "Stato account",
  "accountSubTypeTitleText": "Sottotipo account",
  "accountText": "Azienda",
  "accountTypeTitleText": "Tipo Azienda",
  "acctMgrText": "gest acct",
  "businessDescriptionText": "desc lav",
  "businessDescriptionTitleText": "Descrizione Attività",
  "descriptionText": "Disc",
  "faxText": "Corretto nella Versione:",
  "fullAddressText": "Indirizzo",
  "importSourceText": "Fonte Nominativo",
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
  "notesText": "Nota",
  "scheduleText": "Pianifica",
  "editActionText": "Modifica",
  "callMainActionText": "Chiama principale",
  "viewContactsActionText": "Contatti",
  "addNoteActionText": "Aggiungi Nota",
  "addActivityActionText": "Aggiungi attività",
  "addAttachmentActionText": "Aggiungi Allegato",
  "phoneAbbreviationText": "Telefono: ",
  "faxAbbreviationText": "Fax: ",
  "hashTagQueriesText": {
    "my-accounts": "mie-aziende",
    "active": "Attivo",
    "inactive": "Inattivo",
    "suspect": "sospetto",
    "lead": "Nominativo",
    "prospect": "Prospetto",
    "customer": "Cliente",
    "partner": "Partner",
    "vendor": "Distributore",
    "influencer": "influenzatore",
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
    "status-unconfirmed": "stato-non-confermato",
    "status-accepted": "stato-accettato",
    "status-declined": "stato-rifiutato",
    "recurring": "Ricorrente",
    "timeless": "Senza-orario",
    "today": "Oggi",
    "this-week": "questa-settimana",
    "yesterday": "Ieri"
  }
});

localize("Mobile.SalesLogix.Views.Activity.Recurring", {
  "startingText": "Data iniziale",
  "endingText": "Data finale",
  "repeatsText": "ripetizioni",
  "everyText": "Ogni",
  "afterCompletionText": "dopo completamento",
  "singleWeekdayText": "giorno della settimana",
  "weekdaysText": "giorni della settimana",
  "dayText": "Giorno",
  "monthText": "Mese",
  "onText": "su",
  "occurrencesText": "occorrenze",
  "summaryText": "Sommario",
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
  "accountStatusTitleText": "Stato account",
  "accountSubTypeTitleText": "Sottotipo account",
  "accountText": "Azienda",
  "accountTypeTitleText": "Tipo Azienda",
  "acctMgrText": "gest acct",
  "addressText": "Indirizzo",
  "contactTitleText": "Titolo",
  "descriptionText": "Descrizione",
  "detailsAccountText": "Info account",
  "detailsContactText": "Info contatto",
  "detailsText": "Info contatto/account",
  "emailText": "E-Mail",
  "faxText": "Corretto nella Versione:",
  "homePhoneText": "Tel.abitazione",
  "industryText": "Settore",
  "ownerText": "Proprietario",
  "lastNameText": "Ultimo",
  "mobileText": "Cellulare",
  "nameText": "Nome",
  "statusText": "Status",
  "subTypeText": "Sotto-Tipo",
  "titleText": "Aggiungi account/contatto",
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
  "stateText": "Status",
  "stateTitleText": "Status",
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
  "titleText": "Configure"
});

localize("Mobile.SalesLogix.Views.Contact.Detail", {
  "activityTypeText": {
    "atPhoneCall": "Telefonata",
    "atEMail": "E-mail"
  },
  "accountText": "Azienda",
  "acctMgrText": "gest acct",
  "addressText": "Indirizzo",
  "contactTitleText": "Titolo",
  "createDateText": "Data Creazione",
  "createUserText": "Creato da",
  "emailText": "E-Mail",
  "faxText": "Corretto nella Versione:",
  "homeText": "Tel.abitazione",
  "nameText": "Contatto",
  "ownerText": "Proprietario",
  "actionsText": "Azioni rapide",
  "relatedAccountsText": "Aziende",
  "relatedActivitiesText": "Attività",
  "relatedHistoriesText": "Note/Cronologia",
  "relatedItemsText": "Elementi correlati",
  "relatedNotesText": "Nota",
  "relatedOpportunitiesText": "Opportunità",
  "relatedTicketsText": "Ticket",
  "relatedAddressesText": "Indirizzi",
  "relatedAttachmentText": "Allegati",
  "relatedAttachmentTitleText": "Allegati contatto",
  "titleText": "Contatto",
  "webText": "Web",
  "workText": "Telefono",
  "cuisinePreferenceText": "cucina",
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
  "acctMgrText": "gest acct",
  "accountNameText": "Azienda",
  "homePhoneText": "Tel.abitazione",
  "faxText": "Corretto nella Versione:",
  "addressText": "Indirizzo",
  "contactTitleText": "Titolo",
  "titleTitleText": "Titolo",
  "addressTitleText": "Indirizzo",
  "ownerText": "Proprietario",
  "cuisinePreferenceText": "cucina",
  "cuisinePreferenceTitleText": "Cucina"
});

localize("Mobile.SalesLogix.Views.Contact.List", {
  "titleText": "Contatti",
  "activitiesText": "Attività",
  "notesText": "Nota",
  "scheduleText": "Pianifica",
  "editActionText": "Modifica",
  "callMainActionText": "Chiama principale",
  "callWorkActionText": "Chima ufficio",
  "callMobileActionText": "Chiama cellulare",
  "sendEmailActionText": "E-Mail",
  "viewAccountActionText": "Azienda",
  "addNoteActionText": "Aggiungi Nota",
  "addActivityActionText": "Aggiungi attività",
  "addAttachmentActionText": "Aggiungi Allegato",
  "phoneAbbreviationText": "Lavoro: ",
  "mobileAbbreviationText": "Cellulare: ",
  "hashTagQueriesText": {
    "my-contacts": "miei-contatti",
    "primary": "Primario",
    "not-primary": "non-principale",
    "can-email": "può-inviare-e-mail",
    "can-phone": "può-telefonare",
    "can-fax": "può-inviare-fax",
    "can-mail": "può-inviare-posta",
    "can-solicit": "può-sollecitare"
  }
});

localize("Mobile.SalesLogix.Views.Contract.List", {
  "titleText": "Contratti"
});

localize("Mobile.SalesLogix.Views.ExchangeRateLookup", {
  "titleText": "Tassi di Cambio"
});

localize("Mobile.SalesLogix.Views.FooterToolbar", {
  "copyrightText": "&copy; 2013 SalesLogix, NA, LLC. Tutti i diritti riservati."
});

localize("Mobile.SalesLogix.Views.Help", {
  "titleText": "Aiuto",
  "errorText": "Errore",
  "errorMessageText": "Impossibile caricare il documento della Guida."
});

localize("Mobile.SalesLogix.Views.History.RelatedView", {
  "regardingText": "Argomento",
  "byText": "ha scritto "
});

localize("Mobile.SalesLogix.Views.Home", {
  "configureText": "Configure",
  "addAccountContactText": "Aggiunti account/contatto",
  "titleText": "Abitazione",
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
  "businessDescriptionText": "desc lav",
  "createDateText": "Data Creazione",
  "createUserText": "Creato da",
  "eMailText": "E-Mail",
  "leadSourceText": "Fonte Nominativo",
  "industryText": "Settore",
  "interestsText": "Interessi",
  "leadTitleText": "Titolo",
  "nameText": "Nome",
  "notesText": "Commenti",
  "ownerText": "Proprietario",
  "relatedActivitiesText": "Attività",
  "relatedHistoriesText": "Note/Cronologia",
  "relatedItemsText": "Elementi correlati",
  "relatedNotesText": "Nota",
  "relatedAttachmentText": "Allegati",
  "relatedAttachmentTitleText": "Allegati potenziale cliente",
  "sicCodeText": "Codice SIC",
  "titleText": "Nominativo",
  "tollFreeText": "Num. verde",
  "mobileText": "telefono cellulare",
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
  "emailedText": "Contatti tramite e-mail ${0}"
});

localize("Mobile.SalesLogix.Views.Lead.Edit", {
  "accountText": "Azienda",
  "addressText": "Indirizzo",
  "businessText": "desc lav",
  "businessTitleText": "Descrizione Attività",
  "companyText": "Società",
  "contactTitleText": "Titolo",
  "emailText": "E-Mail",
  "faxText": "Corretto nella Versione:",
  "importSourceText": "Fonte Nominativo",
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
  "mobileText": "telefono cellulare"
});

localize("Mobile.SalesLogix.Views.Lead.List", {
  "titleText": "Nominativi",
  "activitiesText": "Attività",
  "notesText": "Nota",
  "scheduleText": "Pianifica",
  "emailedText": "Contatti tramite e-mail ${0}",
  "calledText": "Chiamati ${0}",
  "editActionText": "Modifica",
  "callMobileActionText": "Chiama cellulare",
  "callWorkActionText": "Chima ufficio",
  "sendEmailActionText": "E-Mail",
  "addNoteActionText": "Aggiungi Nota",
  "addActivityActionText": "Aggiungi attività",
  "addAttachmentActionText": "Aggiungi Allegato",
  "phoneAbbreviationText": "Lavoro: ",
  "mobileAbbreviationText": "Cellulare: ",
  "tollFreeAbbreviationText": "Num. verde: ",
  "hashTagQueriesText": {
    "my-leads": "miei-potenziali-clienti",
    "can-email": "può-inviare-e-mail",
    "can-phone": "può-telefonare",
    "can-fax": "può-inviare-fax",
    "can-mail": "può-inviare-posta",
    "can-solicit": "può-sollecitare"
  }
});

localize("Mobile.SalesLogix.Views.LeadSource.List", {
  "titleText": "Sorgenti Nominativi"
});

localize("Mobile.SalesLogix.Views.LeftDrawer", {
  "configureText": "Menu Configurazione",
  "addAccountContactText": "Aggiunti account/contatto",
  "titleText": "Menu principale",
  "actionsText": "Azioni rapide",
  "viewsText": "Vai a",
  "footerText": "Altro",
  "settingsText": "Impostazioni",
  "helpText": "Aiuto",
  "logOutText": "Disconnetti",
  "logOutConfirmText": "Conferma disconnessione?"
});

localize("Mobile.SalesLogix.Views.Login", {
  "copyrightText": "&copy; 2013 SalesLogix, NA, LLC. Tutti i diritti riservati.",
  "logOnText": "Accedi a Saleslogix",
  "passText": "Password",
  "rememberText": "ricorda",
  "titleText": "Connetti",
  "userText": "Nome Utente",
  "invalidUserText": "Nome utente o password non validi.",
  "missingUserText": "Record utente non trovato.",
  "serverProblemText": "Si è verificato un problema sul server.",
  "requestAbortedText": "Richiesta annullata."
});

localize("Mobile.SalesLogix.Views.MainToolbar", {
  "titleText": "SalesLogix"
});

localize("Mobile.SalesLogix.Views.MetricConfigure", {
  "titleText": "Configura metrica ",
  "metricTitleText": "Titolo",
  "metricFilterText": "Filtro",
  "metricText": "Metrica",
  "chartTypeText": "tipo diagramma",
  "advancedText": "Opzioni Avanzate",
  "formatterText": "formattatore",
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
  "middleNameText": "secondo nome",
  "lastNameText": "Ultimo",
  "prefixText": "Titolo",
  "prefixTitleText": "Prefisso nome",
  "suffixText": "Titoli stranieri",
  "suffixTitleText": "Suffisso nome"
});

localize("Mobile.SalesLogix.Views.Opportunity.List", {
  "titleText": "Opportunità",
  "activitiesText": "Attività",
  "notesText": "Nota",
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
    "my-opportunities": "mie-opportunità",
    "open": "Apri",
    "closed": "Chiuso",
    "won": "vinte",
    "lost": "perse",
    "inactive": "Inattivo",
    "prospect": "Prospetto",
    "qualification": "Qualifica",
    "negotiation": "negoziazione",
    "needs-analysis": "analisi-fabbisogni",
    "demonstration": "dimonstrazione",
    "decision": "decisione"
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
  "standingText": "Posizione",
  "issuesText": "Problemi",
  "competitorNameText": "pref. concorrente",
  "removeContactTitleText": "Rimuovi contatto",
  "confirmDeleteText": "Rimuovere \"${0}\" dalle opportunità?",
  "contactText": "Contatto"
});

localize("Mobile.SalesLogix.Views.OpportunityContact.Edit", {
  "titleText": "Modifica Opp. contatto",
  "nameText": "Nome",
  "accountNameText": "Azienda",
  "contactTitleText": "Titolo",
  "salesRoleText": "Ruolo",
  "salesRoleTitleText": "Ruolo",
  "personalBenefitsText": "int. personale",
  "strategyText": "Strategia",
  "issuesText": "Problemi",
  "standingText": "Posizione",
  "standingTitleText": "Posizione",
  "contactText": "Contatto",
  "competitorPrefText": "pref. concorrente"
});

localize("Mobile.SalesLogix.Views.OpportunityContact.List", {
  "titleText": "Contatti Opportunità",
  "selectTitleText": "Seleziona contatto",
  "activitiesText": "Attività",
  "notesText": "Nota",
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
  "baseExtendedPriceText": "base",
  "extendedPriceText": "Importo Prodotto",
  "extendedPriceSectionText": "Importo Prodotto",
  "adjustedPriceSectionText": "Prezzo modificato",
  "baseAdjustedPriceText": "base",
  "adjustedPriceText": "prezzo modificato",
  "myAdjustedPriceText": "Utente",
  "confirmDeleteText": "Rimuovere ${0} da prodotti opportunità?",
  "removeOppProductTitleText": "rimuovi prodotto opportunità"
});

localize("Mobile.SalesLogix.Views.OpportunityProduct.Edit", {
  "titleText": "OpportunitàProdotto",
  "detailsText": "Dettagli",
  "opportunityText": "Opportunità",
  "productText": "Prodotto",
  "productFamilyText": "Famiglia prodotto",
  "priceLevelText": "Livello di prezzo",
  "priceText": "Prezzo",
  "basePriceText": "Prezzo base",
  "discountText": "sconto %",
  "adjustedPriceText": "prezzo modificato",
  "myAdjustedPriceText": "Utente",
  "baseAdjustedPriceText": "base",
  "quantityText": "Quantità",
  "baseExtendedPriceText": "base",
  "extendedPriceText": "Importo Prodotto",
  "extendedPriceSectionText": "Importo Prodotto",
  "adjustedPriceSectionText": "Prezzo modificato"
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
  "clearLocalStorageTitleText": "Cancella archivio",
  "clearAuthenticationTitleText": "Cancella credenziali salvate",
  "errorLogTitleText": "Visualizza log errori",
  "localStorageClearedText": "Archivio locale cancellato.",
  "credentialsClearedText": "Credenzilai salvater cancellate.",
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
  "descriptionText": "Disc",
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
  "accountText": "acct",
  "areaText": "Area",
  "assignedDateText": "Assegnato il",
  "assignedToText": "Assegnato a",
  "categoryText": "Categoria",
  "contactText": "Contatto",
  "contractText": "Contratto",
  "descriptionText": "Disc",
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
  "ticketIssueTitleText": "Emissione ticket",
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
  "neededByText": "Necessario  ",
  "hashTagQueriesText": {
    "assigned-to-me": "assegnato-a-me",
    "completed-by-me": "completato-da-me"
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
  "publicAccessText": "accesso pubblico",
  "assignedDateText": "Data iniziale",
  "completedDateText": "Data finale",
  "followUpText": "Seguito",
  "unitsText": "Unità di tempo",
  "elapsedUnitsText": "Ore trascorse",
  "rateTypeDescriptionText": "tipo addebito",
  "rateText": "Tariffa",
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
  "titleText": "Parte attività ticket",
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
  "allRecordsText": "nessuna ricerca applicata"
});

localize("Mobile.SalesLogix.Views._RightDrawerListMixin", {
  "hashTagsSectionText": "Hashtag",
  "kpiSectionText": "KPI"
});

localize("Mobile.SalesLogix.Views._SpeedSearchRightDrawerListMixin", {
  "indexSectionText": "Indici",
  "configureText": "Configure"
});
});

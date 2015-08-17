define('localization/saleslogix/it', ['localization/it', 'Mobile/SalesLogix/ApplicationModule'], function() {

localize("argos.Calendar", {
  "timeFormatText": "H:mm",
  "titleText": "Calendario",
  "amText": "AM",
  "pmText": "PM",
  "monthsShortText": {
    "0": "Gen",
    "1": "Feb",
    "2": "Mar",
    "3": "Apr",
    "4": "Mag",
    "5": "Giu",
    "6": "Lug",
    "7": "Ago",
    "8": "Set",
    "9": "Ott",
    "10": "Nov",
    "11": "Dic"
  }
});

localize("argos.Fields.DateField", {
  "dateFormatText": "DD/MM/YYYY",
  "emptyText": "",
  "invalidDateFormatErrorText": "Formato data del campo '${0}' non valido."
});

localize("argos.Format", {
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

localize("crm.GroupUtility", {
  "groupDateFormatText": "D/M/YYYY H:mm"
});

localize("crm.Recurrence", {
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
  "weekDaysText": {
    "0": "Domenica",
    "1": "Lunedì",
    "2": "Martedì",
    "3": "Mercoledì",
    "4": "Giovedì",
    "5": "Venerdì",
    "6": "Sabato"
  },
  "ordText": {
    "0": "Giorno",
    "1": "Nome",
    "2": "secondo",
    "3": "terzo",
    "4": "quarto",
    "5": "Cognome"
  }
});

localize("crm.Views.Activity.Complete", {
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
  "longNotesText": "Nota",
  "longNotesTitleText": "Nota",
  "otherInfoText": "Altre info",
  "priorityText": "Priorità",
  "priorityTitleText": "Priorità",
  "regardingText": "Argomento",
  "regardingTitleText": "Argomento attività",
  "resultText": "Risultato",
  "resultTitleText": "Risultato",
  "startingText": "Data iniziale",
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

localize("crm.Views.Activity.Detail", {
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
  "allDayText": "Tutto il giorno",
  "timelessText": "Senza_orario",
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
  "confirmEditRecurrenceText": "Modificare tutte le occorrenze? Annulla per modificare una singola occorrenza.",
  "relatedAttachmentText": "Allegati",
  "relatedAttachmentTitleText": "Allegati attività",
  "relatedItemsText": "Elementi correlati",
  "phoneText": "Telefono",
  "moreDetailsText": "Altri dettagli"
});

localize("crm.Views.Activity.Edit", {
  "startingFormatText": "D/M/YYYY H:mm",
  "startingTimelessFormatText": "D/M/YYYY",
  "activityCategoryTitleText": "Categoria attività",
  "activityDescriptionTitleText": "Descrizione Attività",
  "locationText": "Posizione",
  "activityTypeTitleText": "Tipo di Attività",
  "alarmText": "Allarme",
  "reminderText": "Promemoria",
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
  "repeatsText": "Ripetizioni",
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

localize("crm.Views.Attachment.List", {
  "attachmentDateFormatText": "ddd D/M/YYYY H:mm:ss",
  "titleText": "Allegati",
  "uploadedOnText": "Caricato ",
  "hashTagQueriesText": {
    "url": "Url",
    "binary": "Binario"
  }
});

localize("crm.Views.Attachment.ViewAttachment", {
  "attachmentDateFormatText": "ddd D/M/YYYY H:mm",
  "detailsText": "Dettagli allegato",
  "descriptionText": "Descrizione",
  "fileNameText": "Nome File",
  "attachDateText": "Data allegato",
  "fileSizeText": "Dimensione File",
  "userText": "Utente",
  "attachmentNotSupportedText": "Visualizzazione del tipo di allegato non supportata.",
  "downloadingText": "Downloading allegato in corso...",
  "notSupportedText": "Visualizzazione di allegati non supportata dal dispositivo."
});

localize("crm.Views.Calendar.DayView", {
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

localize("crm.Views.Calendar.MonthView", {
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
  "toggleCollapseText": "espandi comprimi",
  "weekDaysShortText": {
    "0": "Dom",
    "1": "Lun",
    "2": "Mar",
    "3": "Mer",
    "4": "Gio",
    "5": "Ven",
    "6": "Sab"
  }
});

localize("crm.Views.Calendar.WeekView", {
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

localize("crm.Views.ErrorLog.Detail", {
  "errorDateFormatText": "DD/MM/YYYY H:mm",
  "titleText": "Log errori",
  "detailsText": "Dettagli",
  "errorDateText": "Data",
  "statusTextText": "Errore",
  "urlText": "Url",
  "moreDetailsText": "Altri dettagli",
  "errorText": "Errore",
  "emailSubjectText": "Errore ricevuto nel Client Mobile Saleslogix",
  "copiedSuccessText": "Copiato negli Appunti"
});

localize("crm.Views.ErrorLog.List", {
  "errorDateFormatText": "DD/MM/YYYY H:mm",
  "titleText": "Log errori"
});

localize("crm.Views.Event.Detail", {
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

localize("crm.Views.Event.Edit", {
  "startingFormatText": "D/M/YYYY H:mm",
  "titleText": "Evento",
  "typeText": "Tipo",
  "descriptionText": "Descrizione",
  "startDateText": "Data iniziale",
  "endDateText": "Data finale",
  "eventTypesText": {
    "Vacation": "vacanza",
    "Business Trip": "Trasferta",
    "Conference": "Conferenza",
    "Holiday": "Vacanza"
  }
});

localize("crm.Views.Event.List", {
  "eventDateFormatText": "D/M/YYYY",
  "titleText": "Eventi",
  "eventText": "Evento"
});

localize("crm.Views.History.Detail", {
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
  "timelessText": "Senza_orario",
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

localize("crm.Views.History.Edit", {
  "startingFormatText": "D/M/YYYY H:mm",
  "accountText": "Azienda",
  "noteDescriptionTitleText": "Descrizione nota",
  "contactText": "Contatto",
  "longNotesText": "Nota",
  "longNotesTitleText": "Nota",
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
  "noText": "No",
  "validationText": "Il campo '${2}' deve contenere un valore.",
  "validationCanEditText": "Modifica non consentita"
});

localize("crm.Views.History.List", {
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

localize("crm.Views.Opportunity.Detail", {
  "exchangeRateDateFormatText": "D/M/YYYY H:mm",
  "accountText": "Azienda",
  "acctMgrText": "Responsabile",
  "estCloseText": "Chiusura stimata",
  "detailsText": "Dettagli",
  "fbarHomeTitleText": "Pagina principale",
  "fbarScheduleTitleText": "Pianifica",
  "importSourceText": "Fonte Nominativo",
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

localize("crm.Views.Opportunity.Edit", {
  "exchangeRateDateFormatText": "D/M/YYYY H:mm",
  "accountText": "Azienda",
  "acctMgrText": "Responsabile",
  "estCloseText": "Chiusura stimata",
  "importSourceText": "Fonte Nominativo",
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

localize("crm.Views.TicketActivity.Edit", {
  "startingFormatText": "D/M/YYYY H:mm",
  "titleText": "Modifica Attività Ticket",
  "activityTypeText": "Tipo",
  "activityTypeTitleText": "Tipo",
  "publicAccessText": "Accesso pubblico",
  "publicAccessTitleText": "Accesso pubblico",
  "userText": "Utente",
  "startDateText": "Data iniziale",
  "endDateText": "Data finale",
  "commentsText": "Commenti"
});

localize("crm.Views.TicketActivity.List", {
  "startDateFormatText": "DD/MM/YYYY H:mm",
  "titleText": "Attività Ticket"
});

localize("argos.ErrorManager", {
  "abortedText": "Interrotto",
  "scopeSaveText": "Scope non salvato nel report degli errori"
});

localize("argos.Fields.DurationField", {
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

localize("argos.Fields.EditorField", {
  "lookupLabelText": "Modifica",
  "lookupText": "...",
  "emptyText": "vuoto",
  "completeText": "OK"
});

localize("argos.Fields.LookupField", {
  "dependentErrorText": "È necessario selezionare un valore per '${0}'.",
  "emptyText": "",
  "completeText": "Seleziona",
  "lookupLabelText": "Ricerca",
  "lookupText": "..."
});

localize("argos.Fields.SignatureField", {
  "signatureLabelText": "firma",
  "signatureText": "..."
});

localize("argos.GroupedList", {
  "toggleCollapseText": "espandi comprimi"
});

localize("argos.Groups.DateTimeSection", {
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

localize("argos.Groups.GroupByValueSection", {
  "displayNameText": "Raggruppa per sezione valore"
});

localize("argos.MainToolbar", {
  "titleText": "Cellulare"
});

localize("argos.RelatedViewWidget", {
  "nodataText": "Nessun record trovato...",
  "selectMoreDataText": "visualizza altri ${0} di ${1} ... ",
  "navToListText": "vedere elenco",
  "loadingText": "Caricamento in corso... ",
  "refreshViewText": "Aggiorna",
  "itemOfCountText": " ${0} di ${1}",
  "totalCountText": " (${0})",
  "titleText": "Vista correlata"
});

localize("argos.SearchWidget", {
  "searchText": "Cerca"
});

localize("argos.SelectionModel", {
  "requireSelectionText": "È necessaria una selezione. Non è possibile deselezionare l'ultimo elemento."
});

localize("argos.View", {
  "titleText": "Vista generica"
});

localize("argos.Views.ConfigureQuickActions", {
  "titleText": "Configura azioni rapide"
});

localize("argos.Views.FileSelect", {
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

localize("argos.Views.Signature", {
  "titleText": "firma",
  "clearCanvasText": "Cancella",
  "undoText": "Annulla"
});

localize("argos._ConfigureBase", {
  "titleText": "Configura"
});

localize("argos._DetailBase", {
  "editText": "Modifica",
  "titleText": "Dettaglio",
  "detailsText": "Dettagli",
  "loadingText": "Caricamento...",
  "notAvailableText": "I dati richiesti non sono disponibili.",
  "toggleCollapseText": "espandi comprimi"
});

localize("argos._EditBase", {
  "saveText": "Salva",
  "titleText": "Modifica",
  "validationSummaryText": "Riepilogo convalida",
  "concurrencySummaryText": "Errori concorrenza",
  "detailsText": "Dettagli",
  "loadingText": "Caricamento...",
  "errorText": {
    "general": "Si è verificato un errore del server durante la richiesta di dati.",
    "status": {
      "410": "Errore durante il salvataaggio. Il record non esiste più."
    }
  },
  "concurrencyErrorText": "Un altro utente ha aggiornato questo campo."
});

localize("argos._ErrorHandleMixin", {
  "errorText": {
    "general": "Si è verificato un errore del server."
  }
});

localize("argos._ListBase", {
  "moreText": "Recupera altri record",
  "emptySelectionText": "Nessuno",
  "titleText": "Elenco",
  "configureText": "Configura",
  "errorRenderText": "Errore durante il rendering del modello.",
  "remainingText": "${0} record rimanenti",
  "cancelText": "Annulla",
  "insertText": "Nuovo",
  "noDataText": "Nessun record",
  "loadingText": "Caricamento..."
});

localize("argos._PullToRefreshMixin", {
  "pullRefreshText": "Tirare giù per aggiornare...",
  "pullReleaseText": "Rilasciare per aggiornare..."
});

localize("argos._RelatedViewWidgetBase", {
  "loadingText": "Caricamento in corso... "
});

localize("crm.Action", {
  "calledText": "Chiamati ${0}",
  "emailedText": "Contattato tramite e-mail ${0}"
});

localize("crm.Application", {
  "versionInfoText": "Mobile v${0}.${1}.${2}",
  "loadingText": "Caricamento stato aapplicazione",
  "authText": "Autenticazione"
});

localize("crm.ApplicationModule", {
  "searchText": "Ricerca"
});

localize("crm.DefaultMetrics", {
  "accountsText": {
    "totalRevenue": "Ricavi totali",
    "averageTime": "Tempo medio come cliente",
    "total": "Numero aziende"
  },
  "opportunitiesText": {
    "total": "Numero Opportunità",
    "potential": "Potenziale vendite totali",
    "montlyPotential": "Potenziale vendite mensili medio"
  },
  "ticketsText": {
    "total": "Numero Ticket",
    "averageOpen": "Tempo medio di apertura"
  },
  "contactsText": {
    "total": "Numero Contatti"
  },
  "leadsText": {
    "total": "Numero Nominativi"
  },
  "historyText": {
    "total": "Numero Cronologie",
    "duration": "Durata totale"
  }
});

localize("crm.Fields.AddressField", {
  "lookupLabelText": "Modifica",
  "emptyText": ""
});

localize("crm.Fields.NameField", {
  "emptyText": ""
});

localize("crm.Fields.RecurrencesField", {
  "titleText": "Ricorrente",
  "emptyText": ""
});

localize("crm.FileManager", {
  "unableToUploadText": "Questo browser non supporta le API file dell'HTML5.",
  "unknownSizeText": "Sconosciuto",
  "unknownErrorText": "Avviso: Si è verificato un errore. Impossibile caricare il file.",
  "largeFileWarningText": "Avviso: Impossibile caricare, la richiesta supera il limite di dimensioni impostato dall'amministratore.",
  "percentCompleteText": "Caricamento, attendere prego..."
});

localize("crm.Format", {
  "bigNumberAbbrText": {
    "billion": "MLD",
    "million": "MLN",
    "thousand": "M"
  },
  "userActivityFormatText": {
    "asUnconfirmed": "Non confermato",
    "asAccepted": "Accettato",
    "asDeclned": "Diminuito"
  }
});

localize("crm.SpeedSearchWidget", {
  "searchText": "SpeedSearch"
});

localize("crm.Validator", {
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

localize("crm.Views.Account.Detail", {
  "accountText": "Azienda",
  "acctMgrText": "Responsabile",
  "addressText": "Indirizzo",
  "businessDescriptionText": "Descr. lavoro",
  "createDateText": "Data Creazione",
  "createUserText": "Creato da",
  "faxText": "Fax",
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
  "relatedAttachmentTitleText": "Allegati azienda",
  "statusText": "Status",
  "subTypeText": "SubType",
  "titleText": "Azienda",
  "typeText": "Tipo",
  "webText": "Web",
  "scheduleActivityText": "Pianifica Attività",
  "addNoteText": "Aggiungi Nota",
  "moreDetailsText": "Altri dettagli",
  "calledText": "Chiamati ${0}"
});

localize("crm.Views.Account.Edit", {
  "accountStatusTitleText": "Status azienda",
  "accountSubTypeTitleText": "Sottotipo azienda",
  "accountText": "Azienda",
  "accountTypeTitleText": "Tipo Azienda",
  "acctMgrText": "Responsabile",
  "businessDescriptionText": "Descr. lavoro",
  "businessDescriptionTitleText": "Descrizione Attività",
  "descriptionText": "Descr",
  "faxText": "Fax",
  "fullAddressText": "Indirizzo",
  "importSourceText": "Fonte Nominativo",
  "industryText": "Settore",
  "industryTitleText": "Settore",
  "ownerText": "Proprietario",
  "phoneText": "Telefono",
  "statusText": "Status",
  "subTypeText": "SubType",
  "titleText": "Azienda",
  "typeText": "Tipo",
  "webText": "Web"
});

localize("crm.Views.Account.List", {
  "titleText": "Aziende",
  "activitiesText": "Attività",
  "notesText": "Nota",
  "scheduleText": "Pianifica",
  "editActionText": "Modifica",
  "callMainActionText": "Chiama numero principale",
  "viewContactsActionText": "Contatti",
  "addNoteActionText": "Aggiungi Nota",
  "addActivityActionText": "Aggiungi attività",
  "addAttachmentActionText": "Aggiungi Allegato",
  "phoneAbbreviationText": "Telefono: ",
  "faxAbbreviationText": "Fax: "
});

localize("crm.Views.Activity.List", {
  "allDayText": "Senza orario",
  "completeActivityText": "Completa",
  "callText": "Chiamata",
  "calledText": "Chiamati",
  "addAttachmentActionText": "Aggiungi Allegato",
  "overdueText": "In Ritardo",
  "alarmText": "Allarme",
  "touchedText": "toccato",
  "importantText": "importante",
  "recurringText": "Ricorrente",
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
    "timeless": "Senza orario",
    "today": "Oggi",
    "this-week": "questa-settimana",
    "yesterday": "Ieri"
  }
});

localize("crm.Views.Activity.MyList", {
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
    "status-unconfirmed": "status:non-confermato",
    "status-accepted": "status:accettato",
    "status-declined": "status:rifiutato",
    "recurring": "Ricorrente",
    "timeless": "Senza_orario",
    "today": "Oggi",
    "this-week": "questa-settimana",
    "yesterday": "Ieri"
  }
});

localize("crm.Views.Activity.Recurring", {
  "startingText": "Data iniziale",
  "endingText": "Data finale",
  "repeatsText": "Ripetizioni",
  "everyText": "Ogni",
  "afterCompletionText": "Dopo completamento",
  "singleWeekdayText": "giorno della settimana",
  "weekdaysText": "giorni della settimana",
  "dayText": "Giorno",
  "monthText": "Mese",
  "onText": "su",
  "occurrencesText": "Occorrenze",
  "summaryText": "Riepilogo",
  "weekDaysText": {
    "0": "Domenica",
    "1": "Lunedì",
    "2": "Martedì",
    "3": "Mercoledì",
    "4": "Giovedì",
    "5": "Venerdì",
    "6": "Sabato"
  },
  "monthsText": {
    "0": "Gennaio",
    "1": "Febbraio",
    "2": "Marzo",
    "3": "Aprile",
    "4": "Maggio",
    "5": "Giugno",
    "6": "Luglio",
    "7": "Agosto",
    "8": "Settembre",
    "9": "Ottobre",
    "10": "Novembre",
    "11": "Dicembre"
  },
  "frequencyOptionsText": {
    "0": "Giorni",
    "1": "settimane",
    "2": "mesi",
    "3": "anni"
  },
  "recurringFrequencyText": "Frequenza ricorrenza",
  "yesText": "Sì",
  "noText": "No",
  "titleText": "ricorrenza"
});

localize("crm.Views.Activity.TypesList", {
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

localize("crm.Views.AddAccountContact", {
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
  "lastNameText": "Ultimo",
  "mobileText": "Cellulare",
  "nameText": "Nome",
  "statusText": "Status",
  "subTypeText": "Sotto-Tipo",
  "titleText": "Aggiungi Azienda/Contatto",
  "typeText": "Tipo",
  "webText": "Web",
  "phoneText": "Telefono",
  "workText": "Telefono Ufficio",
  "industryTitleText": "Settore"
});

localize("crm.Views.Address.Edit", {
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
  "stateText": "Stato/Provincia",
  "stateTitleText": "Stato/Provincia",
  "titleText": "Indirizzo"
});

localize("crm.Views.Address.List", {
  "titleText": "Indirizzi"
});

localize("crm.Views.AreaCategoryIssueLookup", {
  "titleText": "Aziende"
});

localize("crm.Views.Attachment.AddAttachment", {
  "titleText": "Aggiungi allegati"
});

localize("crm.Views.Attachment.MyAttachmentList", {
  "titleText": "Miei allegati"
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
  "loadingText": "Caricamento..."
});

localize("crm.Views.Competitor.List", {
  "titleText": "Concorrenti"
});

localize("crm.Views.Configure", {
  "titleText": "Configura"
});

localize("crm.Views.Contact.Detail", {
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
  "relatedNotesText": "Nota",
  "relatedOpportunitiesText": "Opportunità",
  "relatedTicketsText": "Ticket",
  "relatedAddressesText": "Indirizzi",
  "relatedAttachmentText": "Allegati",
  "relatedAttachmentTitleText": "Allegati contatto",
  "titleText": "Contatto",
  "webText": "Web",
  "workText": "Telefono Ufficio",
  "cuisinePreferenceText": "Pref. culinarie",
  "callMobileNumberText": "Chiama cellulare",
  "callWorkNumberText": "Chiama ufficio",
  "calledText": "Chiamati",
  "scheduleActivityText": "Pianifica Attività",
  "addNoteText": "Aggiungi Nota",
  "sendEmailText": "Invia e-mail",
  "viewAddressText": "Visualizza indirizzo",
  "moreDetailsText": "Altri dettagli"
});

localize("crm.Views.Contact.Edit", {
  "titleText": "Contatto",
  "nameText": "Nome",
  "workText": "Telefono Ufficio",
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

localize("crm.Views.Contact.List", {
  "titleText": "Contatti",
  "activitiesText": "Attività",
  "notesText": "Nota",
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
  "mobileAbbreviationText": "Cellulare: "
});

localize("crm.Views.Contract.List", {
  "titleText": "Contratti"
});

localize("crm.Views.ExchangeRateLookup", {
  "titleText": "Tassi di Cambio"
});

localize("crm.Views.FooterToolbar", {
  "copyrightText": "&copy; 2014 SalesLogix, NA, LLC. Tutti i diritti riservati."
});

localize("crm.Views.Groups.Selector", {
  "titleText": "Lookup di gruppi"
});

localize("crm.Views.Help", {
  "titleText": "Aiuto",
  "errorText": "Errore",
  "errorMessageText": "Impossibile caricare il documento della Guida."
});

localize("crm.Views.History.RelatedView", {
  "regardingText": "Argomento",
  "byText": "ha scritto ",
  "titleText": "Nota"
});

localize("crm.Views.Home", {
  "configureText": "Configura",
  "addAccountContactText": "Aggiungi Azienda/Contatto",
  "titleText": "Pagina principale",
  "actionsText": "Azioni rapide",
  "viewsText": "Vai a"
});

localize("crm.Views.Lead.Detail", {
  "activityTypeText": {
    "atPhoneCall": "Telefonata",
    "atEMail": "E-mail"
  },
  "accountText": "Società",
  "addressText": "Indirizzo",
  "businessDescriptionText": "Descr. lavoro",
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

localize("crm.Views.Lead.Edit", {
  "accountText": "Azienda",
  "addressText": "Indirizzo",
  "businessText": "Descr. lavoro",
  "businessTitleText": "Descrizione Attività",
  "companyText": "Società",
  "contactTitleText": "Titolo",
  "emailText": "E-Mail",
  "faxText": "Fax",
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
  "mobileText": "Cellulare"
});

localize("crm.Views.Lead.List", {
  "titleText": "Nominativi",
  "activitiesText": "Attività",
  "notesText": "Nota",
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
  "tollFreeAbbreviationText": "Num. verde: "
});

localize("crm.Views.LeadSource.List", {
  "titleText": "Origine Nominativi"
});

localize("crm.Views.LeftDrawer", {
  "configureText": "Configurazione Menù",
  "addAccountContactText": "Aggiungi Azienda/Contatto",
  "titleText": "Menu principale",
  "actionsText": "Azioni rapide",
  "viewsText": "Vai a",
  "footerText": "Altro",
  "settingsText": "Impostazioni",
  "helpText": "Aiuto",
  "logOutText": "Disconnetti",
  "logOutConfirmText": "Vuoi uscire da Mobile?"
});

localize("crm.Views.LogOff", {
  "messageText": "L'utente è stato disconnesso. Chiudere la finestra del browser.",
  "loginText": "Fare clic qui per eseguire nuovamente l'accesso.",
  "titleText": "Disconnesso"
});

localize("crm.Views.Login", {
  "copyrightText": "Copyright &copy; 2015 Infor. Tutti i diritti riservati. www.infor.com",
  "logOnText": "Connetti",
  "passText": "Password",
  "rememberText": "Ricorda",
  "titleText": "Connetti",
  "userText": "ID Utente",
  "invalidUserText": "Nome utente o password non validi.",
  "missingUserText": "Record utente non trovato.",
  "requestAbortedText": "Richiesta annullata.",
  "logoText": "Infor CRM"
});

localize("crm.Views.MetricConfigure", {
  "titleText": "Configura metrica",
  "metricTitleText": "Titolo",
  "metricFilterText": "Filtro",
  "metricText": "Metrica",
  "chartTypeText": "Tipo diagramma",
  "advancedText": "Opzioni Avanzate",
  "formatterText": "formato",
  "aggregateText": "Aggrega",
  "reportViewText": "ID visualizzazione diagramma"
});

localize("crm.Views.MetricFilterLookup", {
  "titleText": "Ricerca filtro/metrica"
});

localize("crm.Views.MetricWidget", {
  "loadingText": "Caricamento...",
  "errorText": "Errore durante il caricamento del widget."
});

localize("crm.Views.NameEdit", {
  "titleText": "Modifica Nome",
  "firstNameText": "Nome",
  "middleNameText": "secondo nome",
  "lastNameText": "Cognome",
  "prefixText": "Titolo",
  "prefixTitleText": "Titolo",
  "suffixText": "Titoli stranieri",
  "suffixTitleText": "Titolo straniero"
});

localize("crm.Views.Opportunity.List", {
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
  "quickEditActionText": "Modifica rapida"
});

localize("crm.Views.Opportunity.QuickEdit", {
  "estCloseText": "Chiusura stimata",
  "detailsText": "Dettagli",
  "opportunityStageTitleText": "Scena opportunità",
  "opportunityText": "Opportunità",
  "stageText": "Fase",
  "statusOpenText": "Apri",
  "statusClosedLostText": "Chiusa - Persa",
  "statusClosedWonText": "Chiusa - Vinta",
  "salesProcessText": "scena bloccata dal processo di vendita:",
  "probabilityText": "Prob. chiusura",
  "probabilityTitleText": "Probabilità opportunità",
  "potentialText": "Potenziale di vendita"
});

localize("crm.Views.OpportunityContact.Detail", {
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

localize("crm.Views.OpportunityContact.Edit", {
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

localize("crm.Views.OpportunityContact.List", {
  "titleText": "Contatti Opportunità",
  "selectTitleText": "Seleziona contatto",
  "activitiesText": "Attività",
  "notesText": "Nota",
  "scheduleText": "Pianifica"
});

localize("crm.Views.OpportunityProduct.Detail", {
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

localize("crm.Views.OpportunityProduct.Edit", {
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

localize("crm.Views.OpportunityProduct.List", {
  "titleText": "Prodotti"
});

localize("crm.Views.Owner.List", {
  "titleText": "Proprietari"
});

localize("crm.Views.Product.List", {
  "titleText": "Prodotti"
});

localize("crm.Views.ProductProgram.List", {
  "titleText": "Listini Prodotto"
});

localize("crm.Views.Settings", {
  "clearLocalStorageTitleText": "Cancella Local Storage",
  "clearAuthenticationTitleText": "Cancella credenziali salvate",
  "errorLogTitleText": "Visualizza log errori",
  "localStorageClearedText": "Local Storage cancellato.",
  "credentialsClearedText": "Credenziali salvate cancellate.",
  "titleText": "Impostazioni"
});

localize("crm.Views.SpeedSearchList", {
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

localize("crm.Views.TextEdit", {
  "titleText": "Modifica testo"
});

localize("crm.Views.Ticket.Detail", {
  "accountText": "Azienda",
  "areaText": "Area",
  "assignedDateText": "Assegnato il",
  "assignedToText": "Assegnato a",
  "completedByText": "Completato Da",
  "categoryText": "Categoria",
  "contactText": "Contatto",
  "contractText": "Contratto",
  "descriptionText": "Descr",
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

localize("crm.Views.Ticket.Edit", {
  "accountText": "Azienda",
  "areaText": "Area",
  "assignedDateText": "Assegnato il",
  "assignedToText": "Assegnato a",
  "categoryText": "Categoria",
  "contactText": "Contatto",
  "contractText": "Contratto",
  "descriptionText": "Descr",
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

localize("crm.Views.Ticket.List", {
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
  "neededByText": "Data limite  "
});

localize("crm.Views.Ticket.UrgencyLookup", {
  "titleText": "Urgenza ticket"
});

localize("crm.Views.TicketActivity.Detail", {
  "titleText": "Attività Ticket",
  "accountText": "Azienda",
  "contactText": "Contatto",
  "typeText": "Tipo",
  "publicAccessText": "Accesso pubblico",
  "assignedDateText": "Data iniziale",
  "completedDateText": "Data finale",
  "followUpText": "Seguito",
  "unitsText": "Unità di tempo",
  "elapsedUnitsText": "Ore trascorse",
  "rateTypeDescriptionText": "Tipo addebito",
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

localize("crm.Views.TicketActivity.RateLookup", {
  "titleText": "Tariffe"
});

localize("crm.Views.TicketActivityItem.Detail", {
  "titleText": "Ricambio",
  "productNameText": "Prodotto",
  "skuText": "Cod. Prodotto",
  "serialNumberText": "N. Seriale",
  "itemAmountText": "Prezzo",
  "itemDescriptionText": "Descrizione"
});

localize("crm.Views.TicketActivityItem.List", {
  "titleText": "Ricambi"
});

localize("crm.Views.UpdateToolbar", {
  "updateText": "Aggiornamento disponibile. Fare clic per ricaricare."
});

localize("crm.Views.User.CalendarAccessList", {
  "titleText": "Risorse attività"
});

localize("crm.Views.User.List", {
  "titleText": "Utenti"
});

localize("crm.Views._CardLayoutListMixin", {
  "itemIconAltText": "Contatto",
  "allRecordsText": "Nessuna ricerca applicata"
});

localize("crm.Views._GroupListMixin", {
  "noDefaultGroupText": "Nessun gruppo predefinito impostato. fare clic qui per configurare i gruppi.",
  "currentGroupNotFoundText": "Gruppo corrente non trovato.",
  "groupTemplateSummaryText": "Riepilogo",
  "groupTemplateDetailText": "Dettaglio",
  "groupsModeText": "Attualmente si è in modalità gruppi. Eseguire una ricerca o fare clic su un hashtag per uscire dalla modalità gruppi."
});

localize("crm.Views._RightDrawerListMixin", {
  "hashTagsSectionText": "Hashtag",
  "groupsSectionText": "Gruppi",
  "kpiSectionText": "KPI",
  "configureGroupsText": "Configura",
  "refreshGroupsText": "Aggiorna",
  "layoutsText": "Layouts"
});

localize("crm.Views._SpeedSearchRightDrawerListMixin", {
  "indexSectionText": "Indici"
});
});
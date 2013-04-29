define('localization/saleslogix/it', ['localization/it', 'Mobile/SalesLogix/ApplicationModule'], function() {

localize("Sage.Platform.Mobile.Fields.DateField", {
  "dateFormatText": "dd/MM/yyyy",
  "emptyText": "",
  "invalidDateFormatErrorText": "Campo '${0}' ha formato data invalido"
});

localize("Mobile.SalesLogix.Views.Activity.Complete", {
  "completedFormatText": "d/M/yyyy h:mm tt",
  "startingFormatText": "d/M/yyyy h:mm tt",
  "activityInfoText": "Info Attività",
  "accountText": "azienda",
  "contactText": "cont.",
  "opportunityText": "opportunità",
  "ticketNumberText": "ticket",
  "companyText": "società",
  "leadText": "nom.",
  "asScheduledText": "come prog.",
  "categoryText": "cat.",
  "categoryTitleText": "Cat. Attività",
  "completedText": "completato il",
  "completionText": "Completata",
  "durationText": "durata",
  "durationInvalidText": "Campo '${2}' deve avere valore.",
  "carryOverNotesText": "riporta note",
  "followUpText": "seguito",
  "followUpTitleText": "Tipo seguito",
  "leaderText": "leader",
  "longNotesText": "note",
  "longNotesTitleText": "Note",
  "otherInfoText": "Altro",
  "priorityText": "priorità",
  "priorityTitleText": "Priorità",
  "regardingText": "argomento",
  "regardingTitleText": "Attività Argomento",
  "resultText": "esito",
  "resultTitleText": "Risul.",
  "startingText": "data iniz.",
  "startingFormatTimelessText": "d/M/yyyy",
  "timelessText": "No ora",
  "durationValueText": {
    "0": "ness",
    "15": "15 minuti",
    "30": "30 minuti",
    "60": "1 ora",
    "90": "1,5 ore",
    "120": "2 ore"
  },
  "followupValueText": {
    "none": "Nes.",
    "atPhoneCall": "Telefonata",
    "atAppointment": "Riunio.",
    "atToDo": "Impe.",
    "atPersonal": "Attività Person."
  }
});

localize("Mobile.SalesLogix.Views.Activity.Detail", {
  "startDateFormatText": "d/M/yyyy h:mm:ss tt",
  "timelessDateFormatText": "d/M/yyyy",
  "alarmDateFormatText": "d/M/yyyy h:mm:ss tt",
  "activityTypeText": {
    "atToDo": "Impe.",
    "atPhoneCall": "Telefonata",
    "atAppointment": "Riunio.",
    "atLiterature": "Rich. Mat. Inform.",
    "atPersonal": "Attività Person."
  },
  "actionsText": "Azioni rapide",
  "completeActivityText": "Completa Attività",
  "completeOccurrenceText": "Completa Occorrenza",
  "completeSeriesText": "Completa Serie",
  "locationText": "posiz.",
  "alarmText": "all.",
  "alarmTimeText": "all.",
  "categoryText": "cat.",
  "durationText": "durata",
  "leaderText": "leader",
  "longNotesText": "note",
  "priorityText": "priorità",
  "regardingText": "argomento",
  "rolloverText": "rinvio autom.",
  "startTimeText": "ora iniz.",
  "allDayText": "1g int",
  "timelessText": "No ora",
  "titleText": "Attività",
  "typeText": "tipo",
  "companyText": "società",
  "leadText": "nom.",
  "accountText": "azienda",
  "contactText": "cont.",
  "opportunityText": "opportunità",
  "ticketNumberText": "ticket",
  "whenText": "Data",
  "whoText": "Chi",
  "recurrenceText": "ricorrenza",
  "confirmEditRecurrenceText": "Modificare tutte le occorrenze?\\nAnnulla modif sing occor."
});

localize("Mobile.SalesLogix.Views.Activity.Edit", {
  "startingFormatText": "d/M/yyyy h:mm tt",
  "activityCategoryTitleText": "Cat. Attività",
  "activityDescriptionTitleText": "Descrizione Attività",
  "locationText": "posiz.",
  "activityTypeTitleText": "Tipo Attività",
  "alarmText": "all.",
  "reminderText": "",
  "categoryText": "cat.",
  "durationText": "durata",
  "durationTitleText": "Durata",
  "durationInvalidText": "Campo '${2}' deve avere valore.",
  "reminderInvalidText": "Il 'promemoria' deve avere un valore.",
  "reminderTitleText": "Promem.",
  "leaderText": "leader",
  "longNotesText": "note",
  "longNotesTitleText": "Note",
  "priorityText": "priorità",
  "priorityTitleText": "Priorità",
  "regardingText": "argomento",
  "rolloverText": "rinvio autom.",
  "startingText": "ora iniz.",
  "repeatsText": "ripeti",
  "recurringText": "ricorre",
  "recurringTitleText": "Ricorrente",
  "startingFormatTimelessText": "d/M/yyyy",
  "timelessText": "No ora",
  "titleText": "Attività",
  "typeText": "tipo",
  "accountText": "azienda",
  "contactText": "cont.",
  "opportunityText": "opportunità",
  "ticketNumberText": "ticket",
  "companyText": "società",
  "leadText": "nom.",
  "isLeadText": "per nom.",
  "yesText": "SI",
  "noText": "NO",
  "updateUserActErrorText": "Errore aggiornamento attività utente",
  "reminderValueText": {
    "0": "ness",
    "5": "5 minuti",
    "15": "15 minuti",
    "30": "30 minuti",
    "60": "1 ora",
    "1440": "1 giorno"
  },
  "durationValueText": {
    "0": "ness",
    "15": "15 minuti",
    "30": "30 minuti",
    "60": "1 ora",
    "90": "1,5 ore",
    "120": "2 ore"
  }
});

localize("Mobile.SalesLogix.Views.Activity.List", {
  "startDateFormatText": "ddd d/M/yy",
  "startTimeFormatText": "h:mm",
  "allDayText": "Giorno",
  "titleText": "Attività"
});

localize("Mobile.SalesLogix.Views.Calendar.DayView", {
  "dateHeaderFormatText": "dddd, dd/MM/yyyy",
  "startTimeFormatText": "h:mm",
  "titleText": "Calend.",
  "todayText": "Oggi",
  "dayText": "Dì",
  "weekText": "Set.",
  "monthText": "Mese",
  "allDayText": "Giorno",
  "eventHeaderText": "Eventi",
  "activityHeaderText": "Attività",
  "eventMoreText": "Mostra ${0} più eventi",
  "toggleCollapseText": "espandi compr."
});

localize("Mobile.SalesLogix.Views.Calendar.MonthView", {
  "monthTitleFormatText": "MMMM yyyy",
  "dayTitleFormatText": "ddd d MMM, yyyy",
  "startTimeFormatText": "h:mm",
  "titleText": "Calend.",
  "todayText": "Oggi",
  "dayText": "Dì",
  "weekText": "Set.",
  "monthText": "Mese",
  "allDayText": "Giorno",
  "eventText": "Evento",
  "eventHeaderText": "Eventi",
  "countMoreText": "Vedi ${0} più",
  "activityHeaderText": "Attività",
  "toggleCollapseText": "espandi compr."
});

localize("Mobile.SalesLogix.Views.Calendar.WeekView", {
  "weekTitleFormatText": "d MMM, yyyy",
  "dayHeaderLeftFormatText": "dddd",
  "dayHeaderRightFormatText": "d MMM, yyyy",
  "startTimeFormatText": "h:mm",
  "titleText": "Calend.",
  "todayText": "Oggi",
  "dayText": "Dì",
  "weekText": "Set.",
  "monthText": "Mese",
  "allDayText": "Giorno",
  "eventHeaderText": "Eventi",
  "eventMoreText": "Mostra ${0} più eventi",
  "toggleCollapseText": "espandi compr."
});

localize("Mobile.SalesLogix.Views.ErrorLog.Detail", {
  "errorDateFormatText": "dd/MM/yyyy hh:mm tt",
  "titleText": "Log Error",
  "detailsText": "Dett.",
  "errorDateText": "data",
  "statusTextText": "errore",
  "urlText": "url",
  "moreDetailsText": "Più Dettagli",
  "severityText": "gravità",
  "statusCodeText": "cod. status",
  "errorText": "errore",
  "emailSubjectText": "Errore ricevuto nel Mobile Client SalesLogix",
  "copiedSuccessText": "Copiato in Appunti"
});

localize("Mobile.SalesLogix.Views.ErrorLog.List", {
  "errorDateFormatText": "dd/MM/yyyy hh:mm tt",
  "titleText": "Log errori"
});

localize("Mobile.SalesLogix.Views.Event.Detail", {
  "startDateFormatText": "d/M/yyyy h:mm:ss tt",
  "endDateFormatText": "d/M/yyyy h:mm:ss tt",
  "eventTypeText": {
    "atToDo": "Impe.",
    "atPhoneCall": "Telefonata",
    "atAppointment": "Riunio.",
    "atLiterature": "Rich. Mat. Inform.",
    "atPersonal": "Attività Person."
  },
  "actionsText": "Azioni rapide",
  "startTimeText": "data iniz.",
  "endTimeText": "data fin",
  "titleText": "Evento",
  "descriptionText": "descrizione",
  "typeText": "tipo",
  "whenText": "Data"
});

localize("Mobile.SalesLogix.Views.Event.List", {
  "eventDateFormatText": "d/M/yyyy",
  "titleText": "Eventi",
  "eventText": "Evento"
});

localize("Mobile.SalesLogix.Views.History.Detail", {
  "dateFormatText": "d/M/yyyy h:mm:ss tt",
  "categoryText": "cat.",
  "completedText": "concluso",
  "durationText": "durata",
  "leaderText": "leader",
  "longNotesText": "note",
  "notesText": "Note",
  "priorityText": "priorità",
  "regardingText": "argomento",
  "completedByText": "completato da",
  "scheduledText": "pianif.",
  "timelessText": "No ora",
  "companyText": "società",
  "leadText": "nom.",
  "titleText": "Cronol.",
  "accountText": "azienda",
  "contactText": "cont.",
  "opportunityText": "opportunità",
  "ticketNumberText": "ticket",
  "moreDetailsText": "Più Dettagli",
  "relatedItemsText": "VociCorrelate",
  "modifiedText": "mod.",
  "typeText": "tipo",
  "activityTypeText": {
    "atToDo": "Impe.",
    "atPhoneCall": "Telefonata",
    "atAppointment": "Riunio.",
    "atLiterature": "Rich. Mat. Inform.",
    "atPersonal": "Attività Person.",
    "atQuestion": "Domanda",
    "atEMail": "E-mail"
  }
});

localize("Mobile.SalesLogix.Views.History.Edit", {
  "startingFormatText": "d/M/yyyy h:mm tt",
  "accountText": "azienda",
  "noteDescriptionTitleText": "Descrizione Nota",
  "contactText": "cont.",
  "longNotesText": "note",
  "longNotesTitleText": "Note",
  "opportunityText": "opportunità",
  "ticketNumberText": "ticket",
  "regardingText": "argomento",
  "isLeadText": "per nom.",
  "startingText": "ora",
  "titleText": "Nota",
  "companyText": "società",
  "leadText": "nom.",
  "relatedItemsText": "VociCorrelate",
  "yesText": "SI",
  "noText": "NO"
});

localize("Mobile.SalesLogix.Views.History.List", {
  "hourMinuteFormatText": "h:mm",
  "dateFormatText": "d/M/yy",
  "activityTypeText": {
    "atToDo": "Impe.",
    "atPhoneCall": "Telefonata",
    "atAppointment": "Riunio.",
    "atLiterature": "Rich. Mat. Inform.",
    "atPersonal": "Attività Person.",
    "atQuestion": "Domanda",
    "atEMail": "E-mail"
  },
  "hashTagQueriesText": {
    "note": "nota",
    "phonecall": "telefon.",
    "meeting": "meeting",
    "personal": "person.",
    "email": "email"
  },
  "titleText": "Note/Cronol.",
  "viewAccountActionText": "Azienda",
  "viewOpportunityActionText": "Opp.",
  "viewContactActionText": "Contat."
});

localize("Mobile.SalesLogix.Views.TicketActivity.Edit", {
  "startingFormatText": "d/M/yyyy h:mm tt",
  "titleText": "Modifica Attività Ticket",
  "activityTypeText": "tipo",
  "activityTypeTitleText": "Tipo",
  "publicAccessText": "acc. pubblico",
  "publicAccessTitleText": "Acc. pubblico",
  "userText": "utente",
  "startDateText": "data iniz.",
  "endDateText": "data fin",
  "commentsText": "commenti"
});

localize("Mobile.SalesLogix.Views.TicketActivity.List", {
  "startDateFormatText": "dd/MM/yyyy h:mmtt",
  "titleText": "Attività Ticket"
});

localize("Sage.Platform.Mobile.Calendar", {
  "titleText": "Calend.",
  "amText": "AM",
  "pmText": "PM"
});

localize("Sage.Platform.Mobile.Detail", {
  "editText": "Mod.",
  "titleText": "Dett.",
  "detailsText": "Dett.",
  "toggleCollapseText": "espandi compr.",
  "loadingText": "carica...",
  "requestErrorText": "Errore server durante la richiesta dei dati.",
  "notAvailableText": "La voce richiesta non è disponibile."
});

localize("Sage.Platform.Mobile.Edit", {
  "saveText": "Save",
  "titleText": "Mod.",
  "toggleCollapseText": "espandi compr.",
  "validationSummaryText": "Sintesi Convalida",
  "detailsText": "Dett.",
  "loadingText": "carica...",
  "requestErrorText": "Errore server durante la richiesta dei dati."
});

localize("Sage.Platform.Mobile.ErrorManager", {
  "abortedText": "Interrotto",
  "scopeSaveText": "Campo non salvato in report errori"
});

localize("Sage.Platform.Mobile.Fields.BooleanField", {
  "onText": "ON",
  "offText": "OFF"
});

localize("Sage.Platform.Mobile.Fields.DurationField", {
  "emptyText": "",
  "invalidDurationErrorText": "Campo '${0}' è durata invalida.",
  "autoCompleteText": {
    "1": "minuto(i)",
    "60": "ora(e)",
    "1440": "Giorno(i)",
    "10080": "sett.",
    "525960": "anno"
  }
});

localize("Sage.Platform.Mobile.Fields.EditorField", {
  "lookupLabelText": "mod.",
  "lookupText": "...",
  "emptyText": "vuoto",
  "completeText": "Ok"
});

localize("Sage.Platform.Mobile.Fields.LookupField", {
  "dependentErrorText": "Deve essere selez. valore per '${0}'.",
  "emptyText": "",
  "completeText": "Selez.",
  "lookupLabelText": "cerca",
  "lookupText": "..."
});

localize("Sage.Platform.Mobile.Fields.NoteField", {
  "emptyText": ""
});

localize("Sage.Platform.Mobile.Fields.SignatureField", {
  "signatureLabelText": "firma",
  "signatureText": "..."
});

localize("Sage.Platform.Mobile.Format", {
  "yesText": "Sì",
  "noText": "No",
  "trueText": "T",
  "falseText": "F",
  "hoursText": "ore",
  "hourText": "ora",
  "minutesText": "Minuti",
  "minuteText": "minuto"
});

localize("Sage.Platform.Mobile.GroupedList", {
  "toggleCollapseText": "espandi compr."
});

localize("Sage.Platform.Mobile.List", {
  "moreText": "Recupera Più Record",
  "emptySelectionText": "Nes.",
  "titleText": "List",
  "remainingText": "${0} record rimanenti",
  "cancelText": "Annul.",
  "insertText": "New",
  "noDataText": "no record",
  "loadingText": "carica...",
  "requestErrorText": "Errore server durante la richiesta dei dati."
});

localize("Sage.Platform.Mobile.MainToolbar", {
  "titleText": "Cell."
});

localize("Sage.Platform.Mobile.SearchWidget", {
  "searchText": "Cerca"
});

localize("Sage.Platform.Mobile.View", {
  "titleText": "Vista Gen."
});

localize("Sage.Platform.Mobile.Views.Signature", {
  "titleText": "Firma",
  "clearCanvasText": "Canc.",
  "undoText": "Undo"
});

localize("Mobile.SalesLogix.Action", {
  "calledText": "Chiam. ${0}",
  "emailedText": "Inviato per email ${0}"
});

localize("Mobile.SalesLogix.Fields.AddressField", {
  "lookupLabelText": "mod.",
  "emptyText": ""
});

localize("Mobile.SalesLogix.Fields.NameField", {
  "emptyText": ""
});

localize("Mobile.SalesLogix.Fields.RecurrencesField", {
  "titleText": "Ricorrente",
  "emptyText": ""
});

localize("Mobile.SalesLogix.Recurrence", {
  "neverText": "Mai",
  "daysText": "Giorni",
  "dailyText": "Giornalmente",
  "weeksText": "sett.",
  "weeklyText": "Settimanalmente",
  "weeklyOnText": "Settimanale il ${3}",
  "monthsText": "mesi",
  "monthlyText": "Mensilmente",
  "monthlyOnDayText": "Mensile il giorno ${1}",
  "monthlyOnText": "Mensile il ${5} ${3}",
  "yearsText": "anni",
  "yearlyText": "Annualmente",
  "yearlyOnText": "Annuale il ${2}",
  "yearlyOnWeekdayText": "Annuale il ${5} ${3} in ${4}",
  "everyText": "ogni ${0} ${1}",
  "afterCompletionText": "dopo completam.",
  "untilEndDateText": "${0} fino a ${1}",
  "ordText": {
    "0": "giorno",
    "1": "nome",
    "2": "secondo",
    "3": "terzo",
    "4": "quarto",
    "5": "cogn"
  }
});

localize("Mobile.SalesLogix.Validator", {
  "exists": {
    "message": "Campo '${2}' deve avere valore."
  },
  "name": {
    "message": "Il campo '${2}' deve avere un nome e cognome specificato."
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
    "message": "Il valore '${0}' non è un numero valido di valuta."
  },
  "isInt32": {
    "message": "Il valore del campo '${2}' supera l'intervallo numerico consentito."
  },
  "exceedsMaxTextLength": {
    "message": "Il valore del campo '${2}' supera il limite consentito in lunghezza."
  },
  "isDateInRange": {
    "message": "Il valore del campo '${2}' è fuori dell'intervallo di date consentito."
  }
});

localize("Mobile.SalesLogix.Views.Account.Detail", {
  "accountText": "azienda",
  "acctMgrText": "resp.",
  "addressText": "indir.",
  "businessDescriptionText": "desc.att.",
  "createDateText": "creato il",
  "createUserText": "creato da",
  "faxText": "fax",
  "importSourceText": "fonte nom.",
  "industryText": "settore",
  "notesText": "note",
  "ownerText": "prop.",
  "phoneText": "tel.",
  "activityTypeText": {
    "atPhoneCall": "Telefonata"
  },
  "actionsText": "Azioni rapide",
  "relatedActivitiesText": "Attività",
  "relatedContactsText": "Contatti",
  "relatedHistoriesText": "Note/Cronol.",
  "relatedItemsText": "VociCorrelate",
  "relatedNotesText": "Note",
  "relatedOpportunitiesText": "Opportunità",
  "relatedTicketsText": "Ticket",
  "relatedAddressesText": "Indirizzi",
  "statusText": "status",
  "subTypeText": "sottoT.",
  "titleText": "Azienda",
  "typeText": "tipo",
  "webText": "web",
  "callMainNumberText": "Tel. num. princ.",
  "scheduleActivityText": "PianificaAttività",
  "addNoteText": "Agg.nota",
  "viewAddressText": "Vedi indir.",
  "moreDetailsText": "Più Dettagli",
  "calledText": "Chiam. ${0}"
});

localize("Mobile.SalesLogix.Views.Account.Edit", {
  "accountStatusTitleText": "Status Azienda",
  "accountSubTypeTitleText": "SottoT. Azienda",
  "accountText": "azienda",
  "accountTypeTitleText": "Tipo Azienda",
  "acctMgrText": "resp.",
  "businessDescriptionText": "desc.att.",
  "businessDescriptionTitleText": "Descrizione Attività",
  "descriptionText": "desc",
  "faxText": "fax",
  "fullAddressText": "indir.",
  "importSourceText": "fonte nom.",
  "industryText": "settore",
  "industryTitleText": "Settore",
  "ownerText": "prop.",
  "phoneText": "tel.",
  "statusText": "status",
  "subTypeText": "sottoT.",
  "titleText": "Azienda",
  "typeText": "tipo",
  "webText": "web"
});

localize("Mobile.SalesLogix.Views.Account.List", {
  "titleText": "Aziende",
  "activitiesText": "Attività",
  "notesText": "Note",
  "scheduleText": "Pianif.",
  "editActionText": "Mod.",
  "callMainActionText": "Chiama Principale",
  "viewContactsActionText": "Contatti",
  "addNoteActionText": "Aggiungi Nota",
  "addActivityActionText": "Aggiungi Attività"
});

localize("Mobile.SalesLogix.Views.Activity.Recurring", {
  "startingText": "data iniz.",
  "endingText": "data fin",
  "repeatsText": "ripeti",
  "everyText": "ogni",
  "afterCompletionText": "dopo completam.",
  "singleWeekdayText": "feriali",
  "weekdaysText": "feriali",
  "dayText": "giorno",
  "monthText": "mese",
  "onText": "su",
  "occurrencesText": "occorrenze",
  "summaryText": "sommar.",
  "frequencyOptionsText": {
    "0": "Giorni",
    "1": "sett.",
    "2": "mesi",
    "3": "anni"
  },
  "recurringFrequencyText": "Frequenza ricorr.",
  "yesText": "Sì",
  "noText": "No",
  "titleText": "Ricorrenza"
});

localize("Mobile.SalesLogix.Views.Activity.TypesList", {
  "titleText": "Pianifica..",
  "activityTypeText": {
    "atToDo": "Impe.",
    "atPhoneCall": "Telefonata",
    "atAppointment": "Riunio.",
    "atLiterature": "Rich. Mat. Inform.",
    "atPersonal": "Attività Person.",
    "event": "Evento"
  }
});

localize("Mobile.SalesLogix.Views.AddAccountContact", {
  "accountNameText": "azienda",
  "accountStatusTitleText": "Status Azienda",
  "accountSubTypeTitleText": "SottoT. Azienda",
  "accountText": "Azienda",
  "accountTypeTitleText": "Tipo Azienda",
  "addressText": "indir.",
  "contactTitleText": "Tit.",
  "descriptionText": "descrizione",
  "detailsAccountText": "Info Azienda",
  "detailsContactText": "InfoContatto",
  "detailsText": "Info Contatto/Azienda",
  "emailText": "email",
  "faxText": "fax",
  "homePhoneText": "tel. fisso",
  "industryText": "settore",
  "lastNameText": "cogn",
  "mobileText": "cell.",
  "nameText": "nome",
  "statusText": "status",
  "subTypeText": "sottoTip",
  "titleText": "Agg. Azienda/Contatto",
  "typeText": "tipo",
  "webText": "web",
  "workText": "telUfficio",
  "industryTitleText": "Settore"
});

localize("Mobile.SalesLogix.Views.Address.Edit", {
  "address1Text": "indir. 1",
  "address2Text": "indir. 2",
  "address3Text": "indir. 3",
  "cityText": "city",
  "cityTitleText": "Cit.",
  "countryText": "nazione",
  "countryTitleText": "Nazione",
  "descriptionText": "descrizione",
  "descriptionTitleText": "Descrizione",
  "isMailingText": "sped.",
  "isPrimaryText": "princ.",
  "postalCodeText": "post.",
  "salutationText": "attenz.",
  "stateText": "stato",
  "stateTitleText": "Prov.",
  "titleText": "Indirizzo"
});

localize("Mobile.SalesLogix.Views.Address.List", {
  "titleText": "Indirizzi"
});

localize("Mobile.SalesLogix.Views.AreaCategoryIssueLookup", {
  "titleText": "Aziende"
});

localize("Mobile.SalesLogix.Views.Competitor.List", {
  "titleText": "Concorrenti"
});

localize("Mobile.SalesLogix.Views.Configure", {
  "titleText": "Config."
});

localize("Mobile.SalesLogix.Views.Contact.Detail", {
  "activityTypeText": {
    "atPhoneCall": "Telefonata",
    "atEMail": "E-mail"
  },
  "accountText": "azienda",
  "acctMgrText": "resp.",
  "addressText": "indir.",
  "contactTitleText": "tit.",
  "createDateText": "creato il",
  "createUserText": "creato da",
  "emailText": "email",
  "faxText": "fax",
  "homeText": "tel. fisso",
  "nameText": "cont.",
  "ownerText": "prop.",
  "actionsText": "Azioni rapide",
  "relatedAccountsText": "Aziende",
  "relatedActivitiesText": "Attività",
  "relatedHistoriesText": "Note/Cronol.",
  "relatedItemsText": "VociCorrelate",
  "relatedNotesText": "Note",
  "relatedOpportunitiesText": "Opportunità",
  "relatedTicketsText": "Ticket",
  "relatedAddressesText": "Indirizzi",
  "titleText": "Contat.",
  "webText": "web",
  "workText": "tel.",
  "cuisinePreferenceText": "cucina",
  "callMobileNumberText": "Tel. cell.",
  "callWorkNumberText": "Tel. num. princ.",
  "scheduleActivityText": "PianificaAttività",
  "addNoteText": "Agg.nota",
  "sendEmailText": "Inv. email",
  "viewAddressText": "Vedi indir.",
  "moreDetailsText": "Più Dettagli"
});

localize("Mobile.SalesLogix.Views.Contact.Edit", {
  "titleText": "Contat.",
  "nameText": "nome",
  "workText": "tel.",
  "mobileText": "cell.",
  "emailText": "email",
  "webText": "web",
  "acctMgrText": "resp.",
  "accountNameText": "azienda",
  "homePhoneText": "tel. fisso",
  "faxText": "fax",
  "addressText": "indir.",
  "contactTitleText": "tit.",
  "titleTitleText": "Tit.",
  "addressTitleText": "Indirizzo",
  "ownerText": "prop.",
  "cuisinePreferenceText": "cucina",
  "cuisinePreferenceTitleText": "Cucina"
});

localize("Mobile.SalesLogix.Views.Contact.List", {
  "titleText": "Contatti",
  "activitiesText": "Attività",
  "notesText": "Note",
  "scheduleText": "Pianif.",
  "editActionText": "Mod.",
  "callMainActionText": "Chiama Principale",
  "callMobileActionText": "Chiama Cell.",
  "sendEmailActionText": "E-Mail",
  "viewAccountActionText": "Azienda",
  "addNoteActionText": "Aggiungi Nota",
  "addActivityActionText": "Aggiungi Attività"
});

localize("Mobile.SalesLogix.Views.Contract.List", {
  "titleText": "Contratti"
});

localize("Mobile.SalesLogix.Views.Event.Edit", {
  "titleText": "Evento",
  "typeText": "tipo",
  "descriptionText": "descrizione",
  "startDateText": "data iniz.",
  "endDateText": "data fin"
});

localize("Mobile.SalesLogix.Views.FooterToolbar", {
  "copyrightText": "&copia; 2012 Sage Software, Inc. Diritti riservati.",
  "logOutConfirmText": "Sei sicuro di voler uscire?",
  "settingsText": "Opzioni",
  "helpText": "Help",
  "topText": "Su",
  "logOutText": "Uscita"
});

localize("Mobile.SalesLogix.Views.Help", {
  "titleText": "Help",
  "errorText": "Err.",
  "errorMessageText": "Documento di help non caricato"
});

localize("Mobile.SalesLogix.Views.Home", {
  "configureText": "Config.",
  "addAccountContactText": "Agg. Azienda/Contatto",
  "titleText": "Casa",
  "actionsText": "Azioni rapide",
  "viewsText": "Vai A"
});

localize("Mobile.SalesLogix.Views.Lead.Detail", {
  "activityTypeText": {
    "atPhoneCall": "Telefonata",
    "atEMail": "E-mail"
  },
  "accountText": "società",
  "addressText": "indir.",
  "businessDescriptionText": "desc.att.",
  "createDateText": "creato il",
  "createUserText": "creato da",
  "eMailText": "email",
  "leadSourceText": "fonte nom.",
  "industryText": "settore",
  "interestsText": "interessi",
  "leadTitleText": "tit.",
  "nameText": "nome",
  "notesText": "commenti",
  "ownerText": "prop.",
  "relatedActivitiesText": "Attività",
  "relatedHistoriesText": "Note/Cronol.",
  "relatedItemsText": "VociCorrelate",
  "relatedNotesText": "Note",
  "sicCodeText": "cod.sic",
  "titleText": "Lead",
  "tollFreeText": "n. verde",
  "webText": "web",
  "workText": "tel.",
  "actionsText": "Azioni rapide",
  "callWorkNumberText": "Tel. num. princ.",
  "scheduleActivityText": "PianificaAttività",
  "addNoteText": "Agg.nota",
  "sendEmailText": "Inv. email",
  "viewAddressText": "Vedi indir.",
  "moreDetailsText": "Più Dettagli",
  "calledText": "Chiam. ${0}",
  "emailedText": "Emailed ${0}"
});

localize("Mobile.SalesLogix.Views.Lead.Edit", {
  "accountText": "azienda",
  "addressText": "indir.",
  "businessText": "desc.att.",
  "businessTitleText": "Descrizione Attività",
  "companyText": "società",
  "contactTitleText": "tit.",
  "emailText": "email",
  "faxText": "fax",
  "importSourceText": "fonte nom.",
  "industryText": "settore",
  "industryTitleText": "Settore",
  "interestsText": "interessi",
  "leadNameLastFirstText": "nome",
  "leadOwnerText": "prop.",
  "nameText": "nome",
  "notesText": "commenti",
  "notesTitleText": "Commenti",
  "sicCodeText": "cod.sic",
  "titleText": "Lead",
  "titleTitleText": "Tit.",
  "tollFreeText": "n. verde",
  "webText": "web",
  "workText": "tel."
});

localize("Mobile.SalesLogix.Views.Lead.List", {
  "titleText": "Lead",
  "activitiesText": "Attività",
  "notesText": "Note",
  "scheduleText": "Pianif.",
  "emailedText": "Inviato per email ${0}",
  "calledText": "Chiam. ${0}",
  "editActionText": "Mod.",
  "callMainActionText": "Chiama Principale",
  "sendEmailActionText": "E-Mail",
  "addNoteActionText": "Aggiungi Nota",
  "addActivityActionText": "Aggiungi Attività"
});

localize("Mobile.SalesLogix.Views.LeadSource.List", {
  "titleText": "Sorg. Lead"
});

localize("Mobile.SalesLogix.Views.Login", {
  "copyrightText": "&copia; 2012 Sage Software, Inc. Diritti riservati.",
  "logOnText": "Conn.",
  "passText": "password",
  "rememberText": "ricorda",
  "titleText": "Sage SalesLogix",
  "userText": "nome",
  "invalidUserText": "Nome o password errati",
  "missingUserText": "Utente non trovato.",
  "serverProblemText": "Errore sul server.",
  "requestAbortedText": "Richiesta interrotta"
});

localize("Mobile.SalesLogix.Views.MainToolbar", {
  "titleText": "Sage Saleslogix"
});

localize("Mobile.SalesLogix.Views.NameEdit", {
  "titleText": "Modifica Nome",
  "firstNameText": "nome",
  "middleNameText": "2°nome",
  "lastNameText": "cogn",
  "prefixText": "pref.",
  "prefixTitleText": "Titolo",
  "suffixText": "suff.",
  "suffixTitleText": "Titoli est."
});

localize("Mobile.SalesLogix.Views.Opportunity.Detail", {
  "accountText": "az.",
  "acctMgrText": "resp.",
  "estCloseText": "chiusura",
  "fbarHomeTitleText": "home",
  "fbarScheduleTitleText": "pianif.",
  "importSourceText": "fonte nom.",
  "opportunityText": "opportunità",
  "ownerText": "prop.",
  "actionsText": "Azioni rapide",
  "potentialText": "pot. vendita",
  "probabilityText": "stima prob",
  "relatedActivitiesText": "Attività",
  "relatedContactsText": "Contatti Opport.",
  "relatedHistoriesText": "Note/Cronol.",
  "relatedItemsText": "VociCorrelate",
  "relatedNotesText": "Note",
  "relatedProductsText": "Prodotti",
  "resellerText": "rivend.",
  "statusText": "status",
  "titleText": "Opportunità",
  "typeText": "tipo",
  "scheduleActivityText": "PianificaAttività",
  "addNoteText": "Agg.nota",
  "moreDetailsText": "Più Dettagli"
});

localize("Mobile.SalesLogix.Views.Opportunity.Edit", {
  "accountText": "az.",
  "acctMgrText": "resp.",
  "estCloseText": "chiusura",
  "importSourceText": "fonte nom.",
  "opportunityStatusTitleText": "Status Opportunità",
  "opportunityText": "opportunità",
  "opportunityTypeTitleText": "Tipo Opportunità",
  "ownerText": "prop.",
  "potentialText": "pot. vendita",
  "probabilityText": "stima prob",
  "probabilityTitleText": "Probabilità Opportunit.",
  "resellerText": "rivend.",
  "statusText": "status",
  "titleText": "Opportunità",
  "typeText": "tipo"
});

localize("Mobile.SalesLogix.Views.Opportunity.List", {
  "titleText": "Opportunità",
  "activitiesText": "Attività",
  "notesText": "Note",
  "scheduleText": "Pianif.",
  "editActionText": "Mod.",
  "viewAccountActionText": "Azienda",
  "viewContactsActionText": "Contatti",
  "viewProductsActionText": "Prodotti",
  "addNoteActionText": "Aggiungi Nota",
  "addActivityActionText": "Aggiungi Attività",
  "hashTagQueriesText": {
    "open": "apri",
    "closed": "chiuso",
    "won": "won",
    "lost": "lost"
  }
});

localize("Mobile.SalesLogix.Views.OpportunityContact.Detail", {
  "titleText": "Contatto Opport.",
  "accountText": "azienda",
  "contactTitleText": "tit.",
  "nameText": "cont.",
  "moreDetailsText": "Più Dettagli",
  "salesRoleText": "ruol",
  "strategyText": "strateg.",
  "personalBenefitsText": "ben person.",
  "standingText": "in piedi",
  "issuesText": "probl.",
  "competitorNameText": "concorr. pref",
  "removeContactTitleText": "Rimuovi contat",
  "confirmDeleteText": "Rimuovere \"${0}\" da opportunità?",
  "contactText": "Contat."
});

localize("Mobile.SalesLogix.Views.OpportunityContact.Edit", {
  "titleText": "Modif. Cont. Opp.",
  "nameText": "nome",
  "accountNameText": "azienda",
  "contactTitleText": "tit.",
  "salesRoleText": "ruol",
  "salesRoleTitleText": "Ruolo",
  "personalBenefitsText": "ben person.",
  "strategyText": "strateg.",
  "issuesText": "probl.",
  "standingText": "in piedi",
  "standingTitleText": "Posizione",
  "contactText": "Contat.",
  "competitorPrefText": "concorr. pref"
});

localize("Mobile.SalesLogix.Views.OpportunityContact.List", {
  "titleText": "Contatti Opport.",
  "selectTitleText": "Selez. Contat.",
  "activitiesText": "Attività",
  "notesText": "Note",
  "scheduleText": "Pianif."
});

localize("Mobile.SalesLogix.Views.OpportunityProduct.List", {
  "titleText": "Prodotti"
});

localize("Mobile.SalesLogix.Views.Owner.List", {
  "titleText": "Propr."
});

localize("Mobile.SalesLogix.Views.Settings", {
  "clearLocalStorageTitleText": "Canc. Memoria",
  "clearAuthenticationTitleText": "Canc. Credenz. Salvate",
  "errorLogTitleText": "Vedi log errori",
  "localStorageClearedText": "Memoria locale svuotatata",
  "credentialsClearedText": "Credenziali salvate eliminate",
  "titleText": "Opzioni"
});

localize("Mobile.SalesLogix.Views.TextEdit", {
  "titleText": "Mod Testo"
});

localize("Mobile.SalesLogix.Views.Ticket.Detail", {
  "accountText": "azienda",
  "areaText": "area",
  "assignedDateText": "assegnato il",
  "assignedToText": "assegnato a",
  "categoryText": "cat.",
  "contactText": "cont.",
  "contractText": "contr.",
  "descriptionText": "desc",
  "issueText": "prob.",
  "needByText": "data limite",
  "notesText": "commenti",
  "phoneText": "tel.",
  "actionsText": "Azioni rapide",
  "relatedActivitiesText": "Attività",
  "relatedItemsText": "VociCorrelate",
  "resolutionText": "soluzione",
  "sourceText": "fonte",
  "statusText": "status",
  "subjectText": "sogg.",
  "ticketIdText": "num. ticket",
  "titleText": "Ticket",
  "urgencyText": "urgenza",
  "scheduleActivityText": "PianificaAttività",
  "moreDetailsText": "Più Dettagli",
  "relatedTicketActivitiesText": "Attività Ticket",
  "loadingText": "carica..."
});

localize("Mobile.SalesLogix.Views.Ticket.Edit", {
  "accountText": "az.",
  "areaText": "area",
  "assignedDateText": "assegnato il",
  "assignedToText": "assegnato a",
  "categoryText": "cat.",
  "contactText": "cont.",
  "contractText": "contr.",
  "descriptionText": "desc",
  "descriptionTitleText": "Descrizione",
  "issueText": "prob.",
  "needByText": "data limite",
  "notesText": "commenti",
  "notesTitleText": "Commenti",
  "phoneText": "tel.",
  "relatedActivitiesText": "Attività",
  "relatedItemsText": "VociCorrelate",
  "resolutionText": "soluzione",
  "resolutionTitleText": "Soluzione",
  "sourceText": "fonte",
  "sourceTitleText": "Orig.",
  "statusText": "status",
  "subjectText": "sogg.",
  "ticketAreaTitleText": "Area Ticket",
  "ticketCategoryTitleText": "Cat. Ticket",
  "ticketIdText": "num. ticket",
  "ticketIssueTitleText": "Prob.Ticket",
  "ticketStatusTitleText": "Status Ticket",
  "ticketUrgencyTitleText": "Urgenza Ticket",
  "titleText": "Ticket",
  "urgencyText": "urgenza"
});

localize("Mobile.SalesLogix.Views.Ticket.List", {
  "titleText": "Ticket",
  "activitiesText": "Attività",
  "scheduleText": "Pianif.",
  "notAssignedText": "Non assegn.",
  "editActionText": "Mod.",
  "viewAccountActionText": "Azienda",
  "viewContactActionText": "Contat.",
  "addNoteActionText": "Aggiungi Nota",
  "addActivityActionText": "Aggiungi Attività"
});

localize("Mobile.SalesLogix.Views.Ticket.UrgencyLookup", {
  "titleText": "Urgenza Ticket"
});

localize("Mobile.SalesLogix.Views.TicketActivity.Detail", {
  "titleText": "Attività Ticket",
  "accountText": "azienda",
  "contactText": "cont.",
  "typeText": "tipo",
  "publicAccessText": "acc. pubblico",
  "assignedDateText": "data iniz.",
  "completedDateText": "data fin",
  "followUpText": "seguito",
  "unitsText": "unità temp",
  "elapsedUnitsText": "unità trasco.",
  "rateTypeDescriptionText": "tipo carica",
  "rateText": "tasso",
  "totalLaborText": "lav. totale",
  "totalPartsText": "tot. parti",
  "totalFeeText": "costo tot",
  "activityDescriptionText": "commenti",
  "ticketNumberText": "num. ticket",
  "userText": "utente",
  "completeTicketText": "Completa Attività Ticket",
  "moreDetailsText": "Più Dettagli",
  "relatedItemsText": "VociCorrelate",
  "relatedTicketActivityItemText": "Ricambi"
});

localize("Mobile.SalesLogix.Views.TicketActivity.RateLookup", {
  "titleText": "Tassi"
});

localize("Mobile.SalesLogix.Views.TicketActivityItem.Detail", {
  "titleText": "Parte Attiv. Ticket",
  "productNameText": "prodott",
  "skuText": "Cod. Prodotto",
  "serialNumberText": "# serial",
  "itemAmountText": "prezz",
  "itemDescriptionText": "descrizione"
});

localize("Mobile.SalesLogix.Views.TicketActivityItem.List", {
  "titleText": "Ricambi"
});

localize("Mobile.SalesLogix.UpdateToolbar", {
  "updateText": "Clicca per effettuare l'aggiornamento"
});

localize("Mobile.SalesLogix.Views.User.List", {
  "titleText": "Utent"
});
});
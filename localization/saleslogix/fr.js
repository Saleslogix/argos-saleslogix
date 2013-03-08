define('localization/saleslogix/fr', ['localization/fr', 'Mobile/SalesLogix/ApplicationModule'], function() {

localize("Sage.Platform.Mobile.Fields.DateField", {
  "dateFormatText": "dd/MM/yyyy",
  "emptyText": "",
  "invalidDateFormatErrorText": "Champ '${0}' : format de date non valide."
});

localize("Mobile.SalesLogix.Views.Activity.Complete", {
  "completedFormatText": "d/M/yyyy h:mm tt",
  "startingFormatText": "d/M/yyyy h:mm tt",
  "activityInfoText": "Info activité",
  "accountText": "compte",
  "contactText": "contact",
  "opportunityText": "opportunité",
  "ticketNumberText": "ticket",
  "companyText": "société",
  "leadText": "lead",
  "asScheduledText": "comme plan.",
  "categoryText": "catégor.",
  "categoryTitleText": "Catégor. activité",
  "completedText": "date de réal.",
  "completionText": "Fin",
  "durationText": "durée",
  "durationInvalidText": "Le champ '${2}' doit comporter une valeur.",
  "carryOverNotesText": "reporter notes",
  "followUpText": "suivi",
  "followUpTitleText": "Type de suivi",
  "leaderText": "resp.",
  "longNotesText": "notes",
  "longNotesTitleText": "Notes",
  "otherInfoText": "Plus infos",
  "priorityText": "priorité",
  "priorityTitleText": "Priorité",
  "regardingText": "objet",
  "regardingTitleText": "Objet activité",
  "resultText": "résult",
  "resultTitleText": "Résultat",
  "startingText": "date début",
  "startingFormatTimelessText": "d/M/yyyy",
  "timelessText": "Heure indéfinie",
  "durationValueText": {
    "0": "aucun",
    "15": "15 minutes",
    "30": "30 minutes",
    "60": "1 heure",
    "90": "1,5 heure",
    "120": "2 heures"
  },
  "followupValueText": {
    "none": "Aucun",
    "atPhoneCall": "Appel",
    "atAppointment": "Rendez-vous",
    "atToDo": "Tâche à faire",
    "atPersonal": "Activité personnelle"
  }
});

localize("Mobile.SalesLogix.Views.Activity.Detail", {
  "startDateFormatText": "d/M/yyyy h:mm:ss tt",
  "timelessDateFormatText": "d/M/yyyy",
  "alarmDateFormatText": "d/M/yyyy h:mm:ss tt",
  "activityTypeText": {
    "atToDo": "Tâche à faire",
    "atPhoneCall": "Appel",
    "atAppointment": "Rendez-vous",
    "atLiterature": "Demande de documentation",
    "atPersonal": "Activité personnelle"
  },
  "actionsText": "Actions rapides",
  "completeActivityText": "Terminer l'activité",
  "completeOccurrenceText": "Terminer l'occurrence",
  "completeSeriesText": "Terminer la série",
  "locationText": "emplacement",
  "alarmText": "alarme",
  "alarmTimeText": "alarme",
  "categoryText": "catégor.",
  "durationText": "durée",
  "leaderText": "resp.",
  "longNotesText": "notes",
  "priorityText": "priorité",
  "regardingText": "objet",
  "rolloverText": "report auto.",
  "startTimeText": "heure déb.",
  "allDayText": "journée",
  "timelessText": "Heure indéfinie",
  "titleText": "Activité",
  "typeText": "type",
  "companyText": "société",
  "leadText": "lead",
  "accountText": "compte",
  "contactText": "contact",
  "opportunityText": "opportunité",
  "ticketNumberText": "ticket",
  "whenText": "Qd",
  "whoText": "Qui",
  "recurrenceText": "répétition",
  "confirmEditRecurrenceText": "Modif. ttes les occurrences ?\\nAnnul. pour modif. une occurrence."
});

localize("Mobile.SalesLogix.Views.Activity.Edit", {
  "startingFormatText": "d/M/yyyy h:mm tt",
  "activityCategoryTitleText": "Catégor. activité",
  "activityDescriptionTitleText": "Description de l'activité",
  "locationText": "emplacement",
  "activityTypeTitleText": "Type d'activité",
  "alarmText": "alarme",
  "reminderText": "",
  "categoryText": "catégor.",
  "durationText": "durée",
  "durationTitleText": "Durée",
  "durationInvalidText": "Le champ '${2}' doit comporter une valeur.",
  "reminderInvalidText": "Champ 'rappel' doit contenir une valeur",
  "reminderTitleText": "Rappel",
  "leaderText": "resp.",
  "longNotesText": "notes",
  "longNotesTitleText": "Notes",
  "priorityText": "priorité",
  "priorityTitleText": "Priorité",
  "regardingText": "objet",
  "rolloverText": "report auto.",
  "startingText": "heure déb.",
  "repeatsText": "répétitions",
  "recurringText": "périodicité",
  "recurringTitleText": "Périodicité",
  "startingFormatTimelessText": "d/M/yyyy",
  "timelessText": "Heure indéfinie",
  "titleText": "Activité",
  "typeText": "type",
  "accountText": "compte",
  "contactText": "contact",
  "opportunityText": "opportunité",
  "ticketNumberText": "ticket",
  "companyText": "société",
  "leadText": "lead",
  "isLeadText": "pr lead",
  "yesText": "OUI",
  "noText": "NON",
  "updateUserActErrorText": "Erreur survenue lors de la MàJ acti. util.",
  "reminderValueText": {
    "0": "aucun",
    "5": "5 minutes",
    "15": "15 minutes",
    "30": "30 minutes",
    "60": "1 heure",
    "1440": "1 jour"
  },
  "durationValueText": {
    "0": "aucun",
    "15": "15 minutes",
    "30": "30 minutes",
    "60": "1 heure",
    "90": "1,5 heure",
    "120": "2 heures"
  }
});

localize("Mobile.SalesLogix.Views.Activity.List", {
  "startDateFormatText": "ddd d/M/yy",
  "startTimeFormatText": "h:mm",
  "allDayText": "Journée",
  "titleText": "Activités"
});

localize("Mobile.SalesLogix.Views.Calendar.DayView", {
  "dateHeaderFormatText": "dddd, dd/MM/yyyy",
  "startTimeFormatText": "h:mm",
  "titleText": "Agenda",
  "todayText": "Aujourd'hui",
  "dayText": "Jour",
  "weekText": "Sem.",
  "monthText": "Mois",
  "allDayText": "Journée",
  "eventHeaderText": "Evénements",
  "activityHeaderText": "Activités",
  "eventMoreText": "Voir ${0} plus d'évén.",
  "toggleCollapseText": "Afficher/cacher"
});

localize("Mobile.SalesLogix.Views.Calendar.MonthView", {
  "monthTitleFormatText": "MMMM yyyy",
  "dayTitleFormatText": "ddd d MMM yyyy",
  "startTimeFormatText": "h:mm",
  "titleText": "Agenda",
  "todayText": "Aujourd'hui",
  "dayText": "Jour",
  "weekText": "Sem.",
  "monthText": "Mois",
  "allDayText": "Journée",
  "eventText": "Evénement",
  "eventHeaderText": "Evénements",
  "countMoreText": "Voir ${0} Plus",
  "activityHeaderText": "Activités",
  "toggleCollapseText": "Afficher/cacher"
});

localize("Mobile.SalesLogix.Views.Calendar.WeekView", {
  "weekTitleFormatText": "d MMM yyyy",
  "dayHeaderLeftFormatText": "dddd",
  "dayHeaderRightFormatText": "d MMM yyyy",
  "startTimeFormatText": "h:mm",
  "titleText": "Agenda",
  "todayText": "Aujourd'hui",
  "dayText": "Jour",
  "weekText": "Sem.",
  "monthText": "Mois",
  "allDayText": "Journée",
  "eventHeaderText": "Evénements",
  "eventMoreText": "Voir ${0} plus d'évén.",
  "toggleCollapseText": "Afficher/cacher"
});

localize("Mobile.SalesLogix.Views.ErrorLog.Detail", {
  "errorDateFormatText": "dd/MM/yyyy hh:mm tt",
  "titleText": "Journ. err.",
  "detailsText": "Détails",
  "errorDateText": "date",
  "statusTextText": "\\s-1\\plain l'erreur",
  "urlText": "url",
  "moreDetailsText": "Plus détails",
  "severityText": "gravité",
  "statusCodeText": "code d'état",
  "errorText": "\\s-1\\plain l'erreur",
  "emailSubjectText": "Erreur reçue par le client mobile Sage SalesLogix",
  "copiedSuccessText": "Copié dans le Presse-papier"
});

localize("Mobile.SalesLogix.Views.ErrorLog.List", {
  "errorDateFormatText": "dd/MM/yyyy hh:mm tt",
  "titleText": "Journ. err."
});

localize("Mobile.SalesLogix.Views.Event.Detail", {
  "startDateFormatText": "d/M/yyyy h:mm:ss tt",
  "endDateFormatText": "d/M/yyyy h:mm:ss tt",
  "eventTypeText": {
    "atToDo": "Tâche à faire",
    "atPhoneCall": "Appel",
    "atAppointment": "Rendez-vous",
    "atLiterature": "Demande de documentation",
    "atPersonal": "Activité personnelle"
  },
  "actionsText": "Actions rapides",
  "startTimeText": "date début",
  "endTimeText": "date de fin",
  "titleText": "Evénement",
  "descriptionText": "description",
  "typeText": "type",
  "whenText": "Qd"
});

localize("Mobile.SalesLogix.Views.Event.List", {
  "eventDateFormatText": "d/M/yyyy",
  "titleText": "Evénements",
  "eventText": "Evénement"
});

localize("Mobile.SalesLogix.Views.History.Detail", {
  "dateFormatText": "d/M/yyyy h:mm:ss tt",
  "categoryText": "catégor.",
  "completedText": "terminé",
  "durationText": "durée",
  "leaderText": "resp.",
  "longNotesText": "notes",
  "notesText": "Notes",
  "priorityText": "priorité",
  "regardingText": "objet",
  "completedByText": "complété par",
  "scheduledText": "planifié",
  "timelessText": "Heure indéfinie",
  "companyText": "société",
  "leadText": "lead",
  "titleText": "Historique",
  "accountText": "compte",
  "contactText": "contact",
  "opportunityText": "opportunité",
  "ticketNumberText": "ticket",
  "moreDetailsText": "Plus détails",
  "relatedItemsText": "Élém. assoc.",
  "modifiedText": "modifié",
  "typeText": "type",
  "activityTypeText": {
    "atToDo": "Tâche à faire",
    "atPhoneCall": "Appel",
    "atAppointment": "Rendez-vous",
    "atLiterature": "Demande de documentation",
    "atPersonal": "Activité personnelle",
    "atQuestion": "Question",
    "atEMail": "Envoyer par e-mail"
  }
});

localize("Mobile.SalesLogix.Views.History.Edit", {
  "startingFormatText": "d/M/yyyy h:mm tt",
  "accountText": "compte",
  "noteDescriptionTitleText": "Description note",
  "contactText": "contact",
  "longNotesText": "notes",
  "longNotesTitleText": "Notes",
  "opportunityText": "opportunité",
  "ticketNumberText": "ticket",
  "regardingText": "objet",
  "isLeadText": "pr lead",
  "startingText": "heur",
  "titleText": "Note",
  "companyText": "société",
  "leadText": "lead",
  "relatedItemsText": "Élém. assoc.",
  "yesText": "OUI",
  "noText": "NON"
});

localize("Mobile.SalesLogix.Views.History.List", {
  "hourMinuteFormatText": "h:mm",
  "dateFormatText": "d/M/yy",
  "activityTypeText": {
    "atToDo": "Tâche à faire",
    "atPhoneCall": "Appel",
    "atAppointment": "Rendez-vous",
    "atLiterature": "Demande de documentation",
    "atPersonal": "Activité personnelle",
    "atQuestion": "Question",
    "atEMail": "Envoyer par e-mail"
  },
  "hashTagQueriesText": {
    "note": "note",
    "phonecall": "appel tél",
    "meeting": "RDV",
    "personal": "perso.",
    "email": "e-mail"
  },
  "titleText": "Notes/Historique",
  "viewAccountActionText": "Compte",
  "viewOpportunityActionText": "Opp.",
  "viewContactActionText": "Contact"
});

localize("Mobile.SalesLogix.Views.TicketActivity.Edit", {
  "startingFormatText": "d/M/yyyy h:mm tt",
  "titleText": "Modifier l'activité du ticket",
  "activityTypeText": "type",
  "activityTypeTitleText": "Type",
  "publicAccessText": "accès public",
  "publicAccessTitleText": "Accès public",
  "userText": "utilisateur",
  "startDateText": "date début",
  "endDateText": "date de fin",
  "commentsText": "comm."
});

localize("Mobile.SalesLogix.Views.TicketActivity.List", {
  "startDateFormatText": "dd/MM/yyyy h:mmtt",
  "titleText": "Activités du ticket"
});

localize("Sage.Platform.Mobile.Calendar", {
  "titleText": "Agenda",
  "amText": "AM",
  "pmText": "PM"
});

localize("Sage.Platform.Mobile.Detail", {
  "editText": "Modifier",
  "titleText": "Détail",
  "detailsText": "Détails",
  "toggleCollapseText": "Afficher/cacher",
  "loadingText": "chargement...",
  "requestErrorText": "Erreur serveur lors de la demande de données.",
  "notAvailableText": "Entrée demandée non disponible."
});

localize("Sage.Platform.Mobile.Edit", {
  "saveText": "Enregis.",
  "titleText": "Modifier",
  "toggleCollapseText": "Afficher/cacher",
  "validationSummaryText": "Synthèse de valid.",
  "detailsText": "Détails",
  "loadingText": "chargement...",
  "requestErrorText": "Erreur serveur lors de la demande de données."
});

localize("Sage.Platform.Mobile.ErrorManager", {
  "abortedText": "Abandonné",
  "scopeSaveText": "La portée n'est pas enregistrée dans le rapport d'erreur"
});

localize("Sage.Platform.Mobile.Fields.BooleanField", {
  "onText": "ON",
  "offText": "OFF"
});

localize("Sage.Platform.Mobile.Fields.DurationField", {
  "emptyText": "",
  "invalidDurationErrorText": "Le champ '${0}' n'est pas une durée valide.",
  "autoCompleteText": {
    "1": "minute(s)",
    "60": "heure(s)",
    "1440": "jour(s)",
    "10080": "semaine(s)",
    "525960": "année(s)"
  }
});

localize("Sage.Platform.Mobile.Fields.EditorField", {
  "lookupLabelText": "modif",
  "lookupText": "...",
  "emptyText": "vide",
  "completeText": "OK"
});

localize("Sage.Platform.Mobile.Fields.LookupField", {
  "dependentErrorText": "Une valeur doit être sélectionnée pour '${0}'.",
  "emptyText": "",
  "completeText": "Sélectionner",
  "lookupLabelText": "rech.",
  "lookupText": "..."
});

localize("Sage.Platform.Mobile.Fields.NoteField", {
  "emptyText": ""
});

localize("Sage.Platform.Mobile.Fields.SignatureField", {
  "signatureLabelText": "signature",
  "signatureText": "..."
});

localize("Sage.Platform.Mobile.Format", {
  "yesText": "Oui",
  "noText": "Non",
  "trueText": "T",
  "falseText": "F",
  "hoursText": "heures",
  "hourText": "heure",
  "minutesText": "minutes",
  "minuteText": "minute"
});

localize("Sage.Platform.Mobile.GroupedList", {
  "toggleCollapseText": "Afficher/cacher"
});

localize("Sage.Platform.Mobile.List", {
  "moreText": "Récup. plus d'enreg.",
  "emptySelectionText": "Aucun",
  "titleText": "Liste",
  "remainingText": "${0} enregistrements restants",
  "cancelText": "Annuler",
  "insertText": "Nouveau",
  "noDataText": "0 enreg.",
  "loadingText": "chargement...",
  "requestErrorText": "Erreur serveur lors de la demande de données."
});

localize("Sage.Platform.Mobile.MainToolbar", {
  "titleText": "Mobile"
});

localize("Sage.Platform.Mobile.SearchWidget", {
  "searchText": "Rech."
});

localize("Sage.Platform.Mobile.View", {
  "titleText": "Vue normale"
});

localize("Sage.Platform.Mobile.Views.Signature", {
  "titleText": "Signature",
  "clearCanvasText": "Effacer",
  "undoText": "Annuler"
});

localize("Mobile.SalesLogix.Action", {
  "calledText": "Appelé ${0}",
  "emailedText": "Envoyé un e-mail ${0}"
});

localize("Mobile.SalesLogix.Fields.AddressField", {
  "lookupLabelText": "modif",
  "emptyText": ""
});

localize("Mobile.SalesLogix.Fields.NameField", {
  "emptyText": ""
});

localize("Mobile.SalesLogix.Fields.RecurrencesField", {
  "titleText": "Périodicité",
  "emptyText": ""
});

localize("Mobile.SalesLogix.Recurrence", {
  "neverText": "Jamais",
  "daysText": "jours",
  "dailyText": "Quotidienne",
  "weeksText": "semaines",
  "weeklyText": "Hebdomadaire",
  "weeklyOnText": "Toutes les semaines, le ${3}",
  "monthsText": "mois",
  "monthlyText": "Mensuelle",
  "monthlyOnDayText": "Tous les mois, le ${1}",
  "monthlyOnText": "Tous les mois, les ${5} ${3}",
  "yearsText": "ans",
  "yearlyText": "Annuelle",
  "yearlyOnText": "Tous les ans, le ${2}",
  "yearlyOnWeekdayText": "Tous les ans, les ${5} ${3} en ${4}",
  "everyText": "Tous les ${0} ${1}",
  "afterCompletionText": "après achèvement",
  "untilEndDateText": "Du ${0} jusqu'au ${1}",
  "ordText": {
    "0": "jour",
    "1": "prén.",
    "2": "second",
    "3": "troisième",
    "4": "quatrième",
    "5": "fam."
  }
});

localize("Mobile.SalesLogix.Validator", {
  "exists": {
    "message": "Le champ '${2}' doit comporter une valeur."
  },
  "name": {
    "message": "Le champ '${2}' doit inclure un nom et un prénom spécifiés."
  },
  "notEmpty": {
    "message": "Le champ '${2}' ne peut pas être vide."
  },
  "hasText": {
    "test": "",
    "message": "Le champ '${2}' doit contenir du texte."
  },
  "isInteger": {
    "message": "La valeur '${0}' n'est pas un numéro valide."
  },
  "isDecimal": {
    "message": "La valeur '${0}' n'est pas un numéro valide."
  },
  "isCurrency": {
    "message": "La valeur '${0}' n'est pas un numéro de devise valide."
  },
  "isInt32": {
    "message": "La valeur du champ '${2}' dépasse la plage numérique autorisée."
  },
  "exceedsMaxTextLength": {
    "message": "La longueur de la valeur du champ '${2}' dépasse la limite autorisée."
  },
  "isDateInRange": {
    "message": "La valeur du champ '${2}' est hors de la plage de dates autorisée."
  }
});

localize("Mobile.SalesLogix.Views.Account.Detail", {
  "accountText": "compte",
  "acctMgrText": "resp cpt",
  "addressText": "adresse",
  "businessDescriptionText": "desc act",
  "createDateText": "date créa.",
  "createUserText": "créé par",
  "faxText": "fax",
  "importSourceText": "source lead",
  "industryText": "secteur",
  "notesText": "notes",
  "ownerText": "propr",
  "phoneText": "Tél.",
  "activityTypeText": {
    "atPhoneCall": "Appel"
  },
  "actionsText": "Actions rapides",
  "relatedActivitiesText": "Activités",
  "relatedContactsText": "Contacts",
  "relatedHistoriesText": "Notes/Historique",
  "relatedItemsText": "Élém. assoc.",
  "relatedNotesText": "Notes",
  "relatedOpportunitiesText": "Opportunités",
  "relatedTicketsText": "Tickets",
  "relatedAddressesText": "Adresses",
  "statusText": "état",
  "subTypeText": "ss-type",
  "titleText": "Compte",
  "typeText": "type",
  "webText": "web",
  "callMainNumberText": "Appel num. princ",
  "scheduleActivityText": "Planifier activ.",
  "addNoteText": "Aj. note",
  "viewAddressText": "Aff. adresse",
  "moreDetailsText": "Plus détails",
  "calledText": "Appelé ${0}"
});

localize("Mobile.SalesLogix.Views.Account.Edit", {
  "accountStatusTitleText": "État compte",
  "accountSubTypeTitleText": "Ss-type compte",
  "accountText": "compte",
  "accountTypeTitleText": "Type de compte",
  "acctMgrText": "resp cpt",
  "businessDescriptionText": "desc act",
  "businessDescriptionTitleText": "Description de l'activité professionnelle",
  "descriptionText": "desc",
  "faxText": "fax",
  "fullAddressText": "adresse",
  "importSourceText": "source lead",
  "industryText": "secteur",
  "industryTitleText": "Secteur",
  "ownerText": "propr",
  "phoneText": "Tél.",
  "statusText": "état",
  "subTypeText": "ss-type",
  "titleText": "Compte",
  "typeText": "type",
  "webText": "web"
});

localize("Mobile.SalesLogix.Views.Account.List", {
  "titleText": "Comptes",
  "activitiesText": "Activités",
  "notesText": "Notes",
  "scheduleText": "Planification",
  "editActionText": "Modifier",
  "callMainActionText": "Appeler le numéro principal",
  "viewContactsActionText": "Contacts",
  "addNoteActionText": "Ajouter une note",
  "addActivityActionText": "Ajouter une activité"
});

localize("Mobile.SalesLogix.Views.Activity.Recurring", {
  "startingText": "date début",
  "endingText": "date de fin",
  "repeatsText": "répétitions",
  "everyText": "chaque",
  "afterCompletionText": "après achèvement",
  "singleWeekdayText": "jour de la semaine",
  "weekdaysText": "jour(s) de la semaine",
  "dayText": "jour",
  "monthText": "mois",
  "onText": "sur",
  "occurrencesText": "occurrences",
  "summaryText": "résumé",
  "frequencyOptionsText": {
    "0": "jours",
    "1": "semaines",
    "2": "mois",
    "3": "ans"
  },
  "recurringFrequencyText": "Fréq. périodicité",
  "yesText": "Oui",
  "noText": "Non",
  "titleText": "Périodicité"
});

localize("Mobile.SalesLogix.Views.Activity.TypesList", {
  "titleText": "Planification...",
  "activityTypeText": {
    "atToDo": "Tâche à faire",
    "atPhoneCall": "Appel",
    "atAppointment": "Rendez-vous",
    "atLiterature": "Demande de documentation",
    "atPersonal": "Activité personnelle",
    "event": "Evénement"
  }
});

localize("Mobile.SalesLogix.Views.AddAccountContact", {
  "accountNameText": "compte",
  "accountStatusTitleText": "État compte",
  "accountSubTypeTitleText": "SousType compte",
  "accountText": "Compte",
  "accountTypeTitleText": "Type de compte",
  "addressText": "adresse",
  "contactTitleText": "Titre",
  "descriptionText": "description",
  "detailsAccountText": "Infos compte",
  "detailsContactText": "Info contact",
  "detailsText": "Infos contact/compte",
  "emailText": "e-mail",
  "faxText": "fax",
  "homePhoneText": "Tél. dom.",
  "industryText": "secteur",
  "lastNameText": "fam.",
  "mobileText": "mobile",
  "nameText": "nom",
  "statusText": "état",
  "subTypeText": "ss-type",
  "titleText": "Ajout contact/compte",
  "typeText": "type",
  "webText": "web",
  "workText": "Tél. pro",
  "industryTitleText": "Secteur"
});

localize("Mobile.SalesLogix.Views.Address.Edit", {
  "address1Text": "adresse 1",
  "address2Text": "adresse 2",
  "address3Text": "adresse 3",
  "cityText": "ville",
  "cityTitleText": "Ville",
  "countryText": "pays",
  "countryTitleText": "Pays",
  "descriptionText": "description",
  "descriptionTitleText": "Description",
  "isMailingText": "expédi.",
  "isPrimaryText": "primair",
  "postalCodeText": "CP",
  "salutationText": "attention",
  "stateText": "dépt",
  "stateTitleText": "Département",
  "titleText": "Adresse"
});

localize("Mobile.SalesLogix.Views.Address.List", {
  "titleText": "Adresses"
});

localize("Mobile.SalesLogix.Views.AreaCategoryIssueLookup", {
  "titleText": "Comptes"
});

localize("Mobile.SalesLogix.Views.Competitor.List", {
  "titleText": "Concurrents"
});

localize("Mobile.SalesLogix.Views.Configure", {
  "titleText": "Config."
});

localize("Mobile.SalesLogix.Views.Contact.Detail", {
  "activityTypeText": {
    "atPhoneCall": "Appel",
    "atEMail": "Envoyer par e-mail"
  },
  "accountText": "compte",
  "acctMgrText": "resp cpt",
  "addressText": "adresse",
  "contactTitleText": "titre",
  "createDateText": "date créa.",
  "createUserText": "créé par",
  "emailText": "e-mail",
  "faxText": "fax",
  "homeText": "Tél. dom.",
  "nameText": "contact",
  "ownerText": "propr",
  "actionsText": "Actions rapides",
  "relatedAccountsText": "Comptes",
  "relatedActivitiesText": "Activités",
  "relatedHistoriesText": "Notes/Historique",
  "relatedItemsText": "Élém. assoc.",
  "relatedNotesText": "Notes",
  "relatedOpportunitiesText": "Opportunités",
  "relatedTicketsText": "Tickets",
  "relatedAddressesText": "Adresses",
  "titleText": "Contact",
  "webText": "web",
  "workText": "Tél.",
  "cuisinePreferenceText": "cuisine",
  "callMobileNumberText": "Appel port.",
  "callWorkNumberText": "Appel num. princ",
  "scheduleActivityText": "Planifier activ.",
  "addNoteText": "Aj. note",
  "sendEmailText": "Env. email",
  "viewAddressText": "Aff. adresse",
  "moreDetailsText": "Plus détails"
});

localize("Mobile.SalesLogix.Views.Contact.Edit", {
  "titleText": "Contact",
  "nameText": "nom",
  "workText": "Tél.",
  "mobileText": "mobile",
  "emailText": "e-mail",
  "webText": "web",
  "acctMgrText": "resp cpt",
  "accountNameText": "compte",
  "homePhoneText": "Tél. dom.",
  "faxText": "fax",
  "addressText": "adresse",
  "contactTitleText": "titre",
  "titleTitleText": "Titre",
  "addressTitleText": "Adresse",
  "ownerText": "propr",
  "cuisinePreferenceText": "cuisine",
  "cuisinePreferenceTitleText": "Cuisine"
});

localize("Mobile.SalesLogix.Views.Contact.List", {
  "titleText": "Contacts",
  "activitiesText": "Activités",
  "notesText": "Notes",
  "scheduleText": "Planification",
  "editActionText": "Modifier",
  "callMainActionText": "Appeler le numéro principal",
  "callMobileActionText": "Appeler le numéro mobile",
  "sendEmailActionText": "E-mail",
  "viewAccountActionText": "Compte",
  "addNoteActionText": "Ajouter une note",
  "addActivityActionText": "Ajouter une activité"
});

localize("Mobile.SalesLogix.Views.Contract.List", {
  "titleText": "Contrats"
});

localize("Mobile.SalesLogix.Views.Event.Edit", {
  "titleText": "Evénement",
  "typeText": "type",
  "descriptionText": "description",
  "startDateText": "date début",
  "endDateText": "date de fin"
});

localize("Mobile.SalesLogix.Views.FooterToolbar", {
  "copyrightText": "&copy; 2012 Sage Software, Inc. Tous droits réservés.",
  "logOutConfirmText": "Confirmer la déconnexion ?",
  "settingsText": "Param.",
  "helpText": "Aide",
  "topText": "Haut",
  "logOutText": "Déconnexion"
});

localize("Mobile.SalesLogix.Views.Help", {
  "titleText": "Aide",
  "errorText": "Erreur",
  "errorMessageText": "Impossible de charger doc d’aide."
});

localize("Mobile.SalesLogix.Views.Home", {
  "configureText": "Config.",
  "addAccountContactText": "Aj. contact/compte",
  "titleText": "Dom.",
  "actionsText": "Actions rapides",
  "viewsText": "Aller à"
});

localize("Mobile.SalesLogix.Views.Lead.Detail", {
  "activityTypeText": {
    "atPhoneCall": "Appel",
    "atEMail": "Envoyer par e-mail"
  },
  "accountText": "société",
  "addressText": "adresse",
  "businessDescriptionText": "desc act",
  "createDateText": "date créa.",
  "createUserText": "créé par",
  "eMailText": "e-mail",
  "leadSourceText": "source lead",
  "industryText": "secteur",
  "interestsText": "interêts",
  "leadTitleText": "titre",
  "nameText": "nom",
  "notesText": "comm.",
  "ownerText": "propr",
  "relatedActivitiesText": "Activités",
  "relatedHistoriesText": "Notes/Historique",
  "relatedItemsText": "Élém. assoc.",
  "relatedNotesText": "Notes",
  "sicCodeText": "Code APE",
  "titleText": "Lead",
  "tollFreeText": "num. vert",
  "webText": "web",
  "workText": "Tél.",
  "actionsText": "Actions rapides",
  "callWorkNumberText": "Appel num. princ",
  "scheduleActivityText": "Planifier activ.",
  "addNoteText": "Aj. note",
  "sendEmailText": "Env. email",
  "viewAddressText": "Aff. adresse",
  "moreDetailsText": "Plus détails",
  "calledText": "Appelé ${0}",
  "emailedText": "Envoyé par e-mail ${0}"
});

localize("Mobile.SalesLogix.Views.Lead.Edit", {
  "accountText": "compte",
  "addressText": "adresse",
  "businessText": "desc act",
  "businessTitleText": "Description de l'activité professionnelle",
  "companyText": "société",
  "contactTitleText": "titre",
  "emailText": "e-mail",
  "faxText": "fax",
  "importSourceText": "source lead",
  "industryText": "secteur",
  "industryTitleText": "Secteur",
  "interestsText": "interêts",
  "leadNameLastFirstText": "nom",
  "leadOwnerText": "propr",
  "nameText": "nom",
  "notesText": "comm.",
  "notesTitleText": "Commentaires",
  "sicCodeText": "Code APE",
  "titleText": "Lead",
  "titleTitleText": "Titre",
  "tollFreeText": "num. vert",
  "webText": "web",
  "workText": "Tél."
});

localize("Mobile.SalesLogix.Views.Lead.List", {
  "titleText": "Leads",
  "activitiesText": "Activités",
  "notesText": "Notes",
  "scheduleText": "Planification",
  "emailedText": "Envoyé un e-mail ${0}",
  "calledText": "Appelé ${0}",
  "editActionText": "Modifier",
  "callMainActionText": "Appeler le numéro principal",
  "sendEmailActionText": "E-mail",
  "addNoteActionText": "Ajouter une note",
  "addActivityActionText": "Ajouter une activité"
});

localize("Mobile.SalesLogix.Views.LeadSource.List", {
  "titleText": "Sources des leads"
});

localize("Mobile.SalesLogix.Views.Login", {
  "copyrightText": "&copy; 2012 Sage Software, Inc. Tous droits réservés.",
  "logOnText": "Connexion",
  "passText": "Mot pass",
  "rememberText": "mémo.",
  "titleText": "Sage SalesLogix",
  "userText": "nom util.",
  "invalidUserText": "Nom d’utilisateur/password non valide",
  "missingUserText": "Enregis. util. introuvable.",
  "serverProblemText": "Problème survenu sur le serveur.",
  "requestAbortedText": "Demande annulée."
});

localize("Mobile.SalesLogix.Views.MainToolbar", {
  "titleText": "Sage Saleslogix"
});

localize("Mobile.SalesLogix.Views.NameEdit", {
  "titleText": "Modifier le nom",
  "firstNameText": "prén.",
  "middleNameText": "2e pré",
  "lastNameText": "fam.",
  "prefixText": "préfix",
  "prefixTitleText": "Préfixe nom",
  "suffixText": "suffix",
  "suffixTitleText": "Suffixe nom"
});

localize("Mobile.SalesLogix.Views.Opportunity.Detail", {
  "accountText": "cmpt",
  "acctMgrText": "resp cpt",
  "estCloseText": "clôt est.",
  "fbarHomeTitleText": "dom.",
  "fbarScheduleTitleText": "plan.",
  "importSourceText": "source lead",
  "opportunityText": "opportunité",
  "ownerText": "propr",
  "actionsText": "Actions rapides",
  "potentialText": "potentiel vente",
  "probabilityText": "prob clôt.",
  "relatedActivitiesText": "Activités",
  "relatedContactsText": "Contacts d'opportunité",
  "relatedHistoriesText": "Notes/Historique",
  "relatedItemsText": "Élém. assoc.",
  "relatedNotesText": "Notes",
  "relatedProductsText": "Produits",
  "resellerText": "revend.",
  "statusText": "état",
  "titleText": "Opportunité",
  "typeText": "type",
  "scheduleActivityText": "Planifier activ.",
  "addNoteText": "Aj. note",
  "moreDetailsText": "Plus détails"
});

localize("Mobile.SalesLogix.Views.Opportunity.Edit", {
  "accountText": "cmpt",
  "acctMgrText": "resp cpt",
  "estCloseText": "clôt est.",
  "importSourceText": "source lead",
  "opportunityStatusTitleText": "Etat de l'opportunité",
  "opportunityText": "opportunité",
  "opportunityTypeTitleText": "Type d'opportunité",
  "ownerText": "propr",
  "potentialText": "potentiel vente",
  "probabilityText": "prob clôt.",
  "probabilityTitleText": "Proba de l'opportunité",
  "resellerText": "revend.",
  "statusText": "état",
  "titleText": "Opportunité",
  "typeText": "type"
});

localize("Mobile.SalesLogix.Views.Opportunity.List", {
  "titleText": "Opportunités",
  "activitiesText": "Activités",
  "notesText": "Notes",
  "scheduleText": "Planification",
  "editActionText": "Modifier",
  "viewAccountActionText": "Compte",
  "viewContactsActionText": "Contacts",
  "viewProductsActionText": "Produits",
  "addNoteActionText": "Ajouter une note",
  "addActivityActionText": "Ajouter une activité",
  "hashTagQueriesText": {
    "open": "ouv.",
    "closed": "clos",
    "won": "gagné",
    "lost": "perdu"
  }
});

localize("Mobile.SalesLogix.Views.OpportunityContact.Detail", {
  "titleText": "Contact d'opportunité",
  "accountText": "compte",
  "contactTitleText": "titre",
  "nameText": "contact",
  "moreDetailsText": "Plus détails",
  "salesRoleText": "rôle",
  "strategyText": "stratégie",
  "personalBenefitsText": "avantages perso.",
  "standingText": "position",
  "issuesText": "problèmes",
  "competitorNameText": "Préf. concurrent",
  "removeContactTitleText": "Supprimer contact",
  "confirmDeleteText": "Supprimer \"${0}\" de l'opportunité ?",
  "contactText": "Contact"
});

localize("Mobile.SalesLogix.Views.OpportunityContact.Edit", {
  "titleText": "Modif. Contact Opp.",
  "nameText": "nom",
  "accountNameText": "compte",
  "contactTitleText": "titre",
  "salesRoleText": "rôle",
  "salesRoleTitleText": "Rôle",
  "personalBenefitsText": "avantages perso.",
  "strategyText": "stratégie",
  "issuesText": "problèmes",
  "standingText": "position",
  "standingTitleText": "Position",
  "contactText": "Contact",
  "competitorPrefText": "Préf. concurrent"
});

localize("Mobile.SalesLogix.Views.OpportunityContact.List", {
  "titleText": "Contacts d'opportunité",
  "selectTitleText": "Sélectionner un contact",
  "activitiesText": "Activités",
  "notesText": "Notes",
  "scheduleText": "Planification"
});

localize("Mobile.SalesLogix.Views.OpportunityProduct.List", {
  "titleText": "Produits"
});

localize("Mobile.SalesLogix.Views.Owner.List", {
  "titleText": "Propriétaires"
});

localize("Mobile.SalesLogix.Views.Settings", {
  "clearLocalStorageTitleText": "Effac. stock.",
  "clearAuthenticationTitleText": "Effac info ident enreg.",
  "errorLogTitleText": "Voir journ. erreurs",
  "localStorageClearedText": "Stockage local effacé avec succès.",
  "credentialsClearedText": "Infors d’ident. effacées avec succès.",
  "titleText": "Param."
});

localize("Mobile.SalesLogix.Views.TextEdit", {
  "titleText": "Modifier le texte"
});

localize("Mobile.SalesLogix.Views.Ticket.Detail", {
  "accountText": "compte",
  "areaText": "zone",
  "assignedDateText": "date d'affect",
  "assignedToText": "affecté à",
  "categoryText": "catégor.",
  "contactText": "contact",
  "contractText": "contrat",
  "descriptionText": "desc",
  "issueText": "prob.",
  "needByText": "échéance",
  "notesText": "comm.",
  "phoneText": "Tél.",
  "actionsText": "Actions rapides",
  "relatedActivitiesText": "Activités",
  "relatedItemsText": "Élém. assoc.",
  "resolutionText": "résolution",
  "sourceText": "source",
  "statusText": "état",
  "subjectText": "objet",
  "ticketIdText": "num de ticket",
  "titleText": "Ticket",
  "urgencyText": "prior.",
  "scheduleActivityText": "Planifier activ.",
  "moreDetailsText": "Plus détails",
  "relatedTicketActivitiesText": "Activités du ticket",
  "loadingText": "chargement..."
});

localize("Mobile.SalesLogix.Views.Ticket.Edit", {
  "accountText": "cmpt",
  "areaText": "zone",
  "assignedDateText": "date d'affect",
  "assignedToText": "affecté à",
  "categoryText": "catégor.",
  "contactText": "contact",
  "contractText": "contrat",
  "descriptionText": "desc",
  "descriptionTitleText": "Description",
  "issueText": "prob.",
  "needByText": "échéance",
  "notesText": "comm.",
  "notesTitleText": "Commentaires",
  "phoneText": "Tél.",
  "relatedActivitiesText": "Activités",
  "relatedItemsText": "Élém. assoc.",
  "resolutionText": "résolution",
  "resolutionTitleText": "Résolution",
  "sourceText": "source",
  "sourceTitleText": "Source",
  "statusText": "état",
  "subjectText": "objet",
  "ticketAreaTitleText": "Zone de ticket",
  "ticketCategoryTitleText": "Cat. ticket",
  "ticketIdText": "num de ticket",
  "ticketIssueTitleText": "Prob. ticket",
  "ticketStatusTitleText": "Etat du ticket",
  "ticketUrgencyTitleText": "Prior. ticket",
  "titleText": "Ticket",
  "urgencyText": "prior."
});

localize("Mobile.SalesLogix.Views.Ticket.List", {
  "titleText": "Tickets",
  "activitiesText": "Activités",
  "scheduleText": "Planification",
  "notAssignedText": "Non affecté",
  "editActionText": "Modifier",
  "viewAccountActionText": "Compte",
  "viewContactActionText": "Contact",
  "addNoteActionText": "Ajouter une note",
  "addActivityActionText": "Ajouter une activité"
});

localize("Mobile.SalesLogix.Views.Ticket.UrgencyLookup", {
  "titleText": "Prior. ticket"
});

localize("Mobile.SalesLogix.Views.TicketActivity.Detail", {
  "titleText": "Activité du ticket",
  "accountText": "compte",
  "contactText": "contact",
  "typeText": "type",
  "publicAccessText": "accès public",
  "assignedDateText": "date début",
  "completedDateText": "date de fin",
  "followUpText": "suivi",
  "unitsText": "unités de temps",
  "elapsedUnitsText": "unités écoulées",
  "rateTypeDescriptionText": "type prestation",
  "rateText": "taux",
  "totalLaborText": "main d'oeuvre totale",
  "totalPartsText": "parties totales",
  "totalFeeText": "frais totaux",
  "activityDescriptionText": "comm.",
  "ticketNumberText": "num de ticket",
  "userText": "utilisateur",
  "completeTicketText": "Terminer l'activité du ticket",
  "moreDetailsText": "Plus détails",
  "relatedItemsText": "Élém. assoc.",
  "relatedTicketActivityItemText": "Parties de l'activité du ticket"
});

localize("Mobile.SalesLogix.Views.TicketActivity.RateLookup", {
  "titleText": "Taux"
});

localize("Mobile.SalesLogix.Views.TicketActivityItem.Detail", {
  "titleText": "Partie de l'activité du ticket",
  "productNameText": "produit",
  "skuText": "Code Article",
  "serialNumberText": "n° de série",
  "itemAmountText": "prix",
  "itemDescriptionText": "description"
});

localize("Mobile.SalesLogix.Views.TicketActivityItem.List", {
  "titleText": "Parties de l'activité du ticket"
});

localize("Mobile.SalesLogix.UpdateToolbar", {
  "updateText": "MàJ disponible. Cliquer pour recharger."
});

localize("Mobile.SalesLogix.Views.User.List", {
  "titleText": "Utilisateurs"
});
});
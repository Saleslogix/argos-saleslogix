define('localization/saleslogix/fr', ['localization/fr', 'Mobile/SalesLogix/ApplicationModule'], function() {

localize("Sage.Platform.Mobile.Calendar", {
  "timeFormatText": "H:mm",
  "titleText": "Agenda",
  "amText": "AM",
  "pmText": "PM"
});

localize("Sage.Platform.Mobile.Fields.DateField", {
  "dateFormatText": "DD/MM/YYYY   ",
  "emptyText": "",
  "invalidDateFormatErrorText": "Le format de la date du champ \"${0}\" n'est pas valide."
});

localize("Sage.Platform.Mobile.Format", {
  "shortDateFormatText": "D/M/YYYY",
  "percentFormatText": "${0}${1}",
  "yesText": "Oui",
  "noText": "Non",
  "trueText": "T",
  "falseText": "F",
  "hoursText": "Heures",
  "hourText": "heure",
  "minutesText": "Minutes",
  "minuteText": "minute",
  "bytesText": "octets"
});

localize("Mobile.SalesLogix.Views.Activity.Complete", {
  "completedFormatText": "D/M/YYYY H:mm",
  "startingFormatText": "D/M/YYYY H:mm",
  "activityInfoText": "Infos sur l'activité",
  "accountText": "Compte",
  "contactText": "Contact",
  "opportunityText": "Opportunité",
  "ticketNumberText": "Ticket",
  "companyText": "Société",
  "leadText": "Lead",
  "asScheduledText": "Telle que planifiée",
  "categoryText": "Catégorie",
  "categoryTitleText": "Catégorie de l'activité",
  "completedText": "Date de réalisation",
  "completionText": "Fin",
  "durationText": "Durée",
  "durationInvalidText": "Le champ \"${2}\" doit contenir une valeur.",
  "carryOverNotesText": "Reporter les notes",
  "followUpText": "Suivi",
  "followUpTitleText": "Type de suivi",
  "leaderText": "Responsable",
  "longNotesText": "Notes",
  "longNotesTitleText": "Notes",
  "otherInfoText": "Autres infos",
  "priorityText": "Priorité",
  "priorityTitleText": "Priorité",
  "regardingText": "Objet",
  "regardingTitleText": "Activité concernant",
  "resultText": "Résultat",
  "resultTitleText": "Résultat",
  "startingText": "Date de début",
  "startingFormatTimelessText": "D/M/YYYY",
  "timelessText": "Heure indéfinie",
  "durationValueText": {
    "0": "Aucun",
    "15": "15 minutes",
    "30": "30 minutes",
    "60": "1 heure",
    "90": "1,5 heure",
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
  "startDateFormatText": "D/M/YYYY H:mm",
  "timelessDateFormatText": "D/M/YYYY",
  "alarmDateFormatText": "D/M/YYYY H:mm",
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
  "locationText": "Emplacement",
  "alarmText": "Alarme",
  "alarmTimeText": "Alarme",
  "categoryText": "Catégorie",
  "durationText": "Durée",
  "leaderText": "Responsable",
  "longNotesText": "Notes",
  "priorityText": "Priorité",
  "regardingText": "Objet",
  "rolloverText": "report automatique",
  "startTimeText": "Heure de début",
  "allDayText": "toute la journée",
  "timelessText": "Heure indéfinie",
  "titleText": "Activité",
  "typeText": "Type",
  "companyText": "Société",
  "leadText": "Lead",
  "accountText": "Compte",
  "contactText": "Contact",
  "opportunityText": "Opportunité",
  "ticketNumberText": "Ticket",
  "whenText": "Quand",
  "whoText": "Qui",
  "recurrenceText": "récurrence",
  "confirmEditRecurrenceText": "Modifier toutes les occurrences ?\\n Annuler pour modifier une seule occurrence.",
  "relatedAttachmentText": "Pièces jointes",
  "relatedAttachmentTitleText": "Pièces jointes de l'activité",
  "relatedItemsText": "Eléments associés",
  "phoneText": "Téléphone"
});

localize("Mobile.SalesLogix.Views.Activity.Edit", {
  "startingFormatText": "D/M/YYYY H:mm",
  "activityCategoryTitleText": "Catégorie de l'activité",
  "activityDescriptionTitleText": "Description de l'activité",
  "locationText": "Emplacement",
  "activityTypeTitleText": "Type d'activité",
  "alarmText": "Alarme",
  "reminderText": "",
  "categoryText": "Catégorie",
  "durationText": "Durée",
  "durationTitleText": "Durée",
  "durationInvalidText": "Le champ \"${2}\" doit contenir une valeur.",
  "reminderInvalidText": "Le champ \"rappel\" doit contenir une valeur.",
  "reminderTitleText": "Rappel",
  "leaderText": "Responsable",
  "longNotesText": "Notes",
  "longNotesTitleText": "Notes",
  "priorityText": "Priorité",
  "priorityTitleText": "Priorité",
  "regardingText": "Objet",
  "rolloverText": "report automatique",
  "startingText": "Heure de début",
  "startingFormatTimelessText": "D/M/YYYY",
  "repeatsText": "répétitions",
  "recurringText": "Périodicité",
  "recurringTitleText": "Périodicité",
  "timelessText": "Heure indéfinie",
  "titleText": "Activité",
  "typeText": "Type",
  "accountText": "Compte",
  "contactText": "Contact",
  "opportunityText": "Opportunité",
  "ticketNumberText": "Ticket",
  "companyText": "Société",
  "leadText": "Lead",
  "isLeadText": "pour la prospection",
  "yesText": "Oui",
  "noText": "Non",
  "phoneText": "Téléphone",
  "updateUserActErrorText": "Une erreur s'est produite pendant la mise à jour des activités des utilisateurs.",
  "reminderValueText": {
    "0": "Aucun",
    "5": "5 minutes",
    "15": "15 minutes",
    "30": "30 minutes",
    "60": "1 heure",
    "1440": "1 jour"
  },
  "durationValueText": {
    "0": "Aucun",
    "15": "15 minutes",
    "30": "30 minutes",
    "60": "1 heure",
    "90": "1,5 heure",
    "120": "2 heures"
  }
});

localize("Mobile.SalesLogix.Views.Activity.List", {
  "startDateFormatText": "ddd D/M/YYYY",
  "startTimeFormatText": "H:mm",
  "allDayText": "Toute la journée",
  "completeActivityText": "Terminer",
  "callText": "Appel",
  "calledText": "Appelé",
  "addAttachmentActionText": "Ajouter une pièce jointe",
  "activityTypeText": {
    "atToDo": "Tâche à faire",
    "atPhoneCall": "Appel",
    "atAppointment": "Rendez-vous",
    "atLiterature": "Demande de doc.",
    "atPersonal": "Personnel",
    "atQuestion": "Question",
    "atNote": "Note",
    "atEMail": "E-mail"
  },
  "titleText": "Activités",
  "hashTagQueriesText": {
    "alarm": "Alarme",
    "recurring": "Périodicité",
    "timeless": "Heure-indéfinie",
    "today": "Aujourd'hui",
    "this-week": "cette-semaine",
    "yesterday": "Hier"
  }
});

localize("Mobile.SalesLogix.Views.Attachment.List", {
  "attachmentDateFormatText": "ddd D/M/YYYY H:mm",
  "titleText": "Pièces jointes",
  "uploadedOnText": "Téléchargé ",
  "hashTagQueriesText": {
    "url": "Url",
    "binary": "Binaire"
  }
});

localize("Mobile.SalesLogix.Views.Attachment.ViewAttachment", {
  "attachmentDateFormatText": "ddd M/D/YYYY H:mm a",
  "detailsText": "Détails de la pièce jointe",
  "descriptionText": "Description",
  "fileNameText": "Nom de fichier",
  "attachDateText": "date de la pièce jointe",
  "fileSizeText": "Taille de fichier",
  "userText": "Utilisateur",
  "attachmentNotSupportedText": "Le type de pièce jointe ne permet pas sa visualisation.",
  "downloadingText": "Téléchargement de la pièce jointe..."
});

localize("Mobile.SalesLogix.Views.Calendar.DayView", {
  "eventDateFormatText": "D/M/YYYY",
  "dateHeaderFormatText": "dddd, D/M/YYYY",
  "startTimeFormatText": "H:mm",
  "titleText": "Agenda",
  "todayText": "Aujourd'hui",
  "dayText": "Jour",
  "weekText": "Semaine",
  "monthText": "Mois",
  "allDayText": "Toute la journée",
  "eventHeaderText": "Evénements",
  "activityHeaderText": "Activités",
  "eventMoreText": "Voir ${0} élément(s) supplémentaire(s)",
  "toggleCollapseText": "développer/réduire"
});

localize("Mobile.SalesLogix.Views.Calendar.MonthView", {
  "monthTitleFormatText": "MMMM YYYY",
  "dayTitleFormatText": "ddd D MMM YYYY",
  "eventDateFormatText": "D/M/YYYY",
  "startTimeFormatText": "H:mm",
  "titleText": "Agenda",
  "todayText": "Aujourd'hui",
  "dayText": "Jour",
  "weekText": "Semaine",
  "monthText": "Mois",
  "allDayText": "Toute la journée",
  "eventText": "Evénement",
  "eventHeaderText": "Evénements",
  "countMoreText": "Voir plus",
  "activityHeaderText": "Activités",
  "toggleCollapseText": "développer/réduire"
});

localize("Mobile.SalesLogix.Views.Calendar.WeekView", {
  "weekTitleFormatText": "D MMM YYYY",
  "dayHeaderLeftFormatText": "dddd",
  "dayHeaderRightFormatText": "D MMM YYYY",
  "eventDateFormatText": "D/M/YYYY",
  "startTimeFormatText": "H:mm",
  "titleText": "Agenda",
  "todayText": "Aujourd'hui",
  "dayText": "Jour",
  "weekText": "Semaine",
  "monthText": "Mois",
  "allDayText": "Toute la journée",
  "eventHeaderText": "Evénements",
  "eventMoreText": "Voir ${0} élément(s) supplémentaire(s)",
  "toggleCollapseText": "développer/réduire"
});

localize("Mobile.SalesLogix.Views.ErrorLog.Detail", {
  "errorDateFormatText": "DD/MM/YYYY H:mm",
  "titleText": "Journal d'erreur",
  "detailsText": "Détails",
  "errorDateText": "Date",
  "statusTextText": "Erreur",
  "urlText": "Url",
  "moreDetailsText": "Plus de détails",
  "severityText": "Gravité",
  "statusCodeText": "Code d'état",
  "errorText": "Erreur",
  "emailSubjectText": "Erreur dans le client mobile Saleslogix",
  "copiedSuccessText": "Copié dans le presse-papier"
});

localize("Mobile.SalesLogix.Views.ErrorLog.List", {
  "errorDateFormatText": "DD/MM/YYYY H:mm",
  "titleText": "Journaux d'erreur"
});

localize("Mobile.SalesLogix.Views.Event.Detail", {
  "startDateFormatText": "D/M/YYYY H:mm",
  "endDateFormatText": "D/M/YYYY H:mm",
  "eventTypeText": {
    "atToDo": "Tâche à faire",
    "atPhoneCall": "Appel",
    "atAppointment": "Rendez-vous",
    "atLiterature": "Demande de documentation",
    "atPersonal": "Activité personnelle"
  },
  "actionsText": "Actions rapides",
  "startTimeText": "Date de début",
  "endTimeText": "Date de fin",
  "titleText": "Evénement",
  "descriptionText": "Description",
  "typeText": "Type",
  "whenText": "Quand"
});

localize("Mobile.SalesLogix.Views.Event.Edit", {
  "startingFormatText": "D/M/YYYY H:mm",
  "titleText": "Evénement",
  "typeText": "Type",
  "descriptionText": "Description",
  "startDateText": "Date de début",
  "endDateText": "Date de fin"
});

localize("Mobile.SalesLogix.Views.Event.List", {
  "eventDateFormatText": "D/M/YYYY",
  "titleText": "Evénements",
  "eventText": "Evénement"
});

localize("Mobile.SalesLogix.Views.History.Detail", {
  "dateFormatText": "D/M/YYYY H:mm",
  "categoryText": "Catégorie",
  "completedText": "Terminé",
  "durationText": "Durée",
  "leaderText": "Responsable",
  "longNotesText": "Notes",
  "notesText": "Notes",
  "priorityText": "Priorité",
  "regardingText": "Objet",
  "completedByText": "Terminé par",
  "scheduledText": "Planifié",
  "timelessText": "Heure indéfinie",
  "companyText": "Société",
  "leadText": "Lead",
  "titleText": "Historique",
  "accountText": "Compte",
  "contactText": "Contact",
  "opportunityText": "Opportunité",
  "ticketNumberText": "Ticket",
  "moreDetailsText": "Plus de détails",
  "relatedItemsText": "Eléments associés",
  "relatedAttachmentText": "Pièces jointes",
  "relatedAttachmentTitleText": "Pièces jointes de l'historique",
  "modifiedText": "Modifié",
  "typeText": "Type",
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
  "startingFormatText": "D/M/YYYY H:mm",
  "accountText": "Compte",
  "noteDescriptionTitleText": "Description de la note",
  "contactText": "Contact",
  "longNotesText": "Notes",
  "longNotesTitleText": "Notes",
  "opportunityText": "Opportunité",
  "ticketNumberText": "Ticket",
  "regardingText": "Objet",
  "isLeadText": "pour la prospection",
  "startingText": "Heure",
  "titleText": "Note",
  "companyText": "Société",
  "leadText": "Lead",
  "relatedItemsText": "Eléments associés",
  "yesText": "Oui",
  "noText": "Non"
});

localize("Mobile.SalesLogix.Views.History.List", {
  "hourMinuteFormatText": "H:mm",
  "dateFormatText": "D/M/YY",
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
    "my-history": "mon-historique",
    "note": "Note",
    "phonecall": "appel-téléphonique",
    "meeting": "Rendez-vous",
    "personal": "Personnel",
    "email": "E-mail"
  },
  "titleText": "Notes/Historique",
  "viewAccountActionText": "Compte",
  "viewOpportunityActionText": "Opp.",
  "viewContactActionText": "Contact",
  "addAttachmentActionText": "Ajouter une pièce jointe",
  "regardingText": "Objet : "
});

localize("Mobile.SalesLogix.Views.Opportunity.Detail", {
  "exchangeRateDateFormatText": "D/M/YYYY H:mm",
  "accountText": "cpte",
  "acctMgrText": "resp cpte",
  "estCloseText": "clôture est.",
  "detailsText": "Détails",
  "fbarHomeTitleText": "Domicile",
  "fbarScheduleTitleText": "Planification",
  "importSourceText": "Source du lead",
  "opportunityText": "Opportunité",
  "ownerText": "Propriétaire",
  "actionsText": "Actions rapides",
  "potentialText": "Potentiel de ventes",
  "potentialBaseText": "ventes potentielles (taux de base)",
  "potentialOpportunityText": "ventes potentielles (taux opp.)",
  "potentialMyRateText": "ventes potentielles (mon taux)",
  "probabilityText": "prob. de clôture",
  "relatedActivitiesText": "Activités",
  "relatedContactsText": "Contacts d'opportunité",
  "relatedHistoriesText": "Notes/Historique",
  "relatedItemsText": "Eléments associés",
  "relatedNotesText": "Notes",
  "relatedProductsText": "Produits",
  "relatedAttachmentText": "Pièces jointes",
  "relatedAttachmentTitleText": "Pièces jointes des opportunités",
  "resellerText": "Revendeur",
  "statusText": "Etat",
  "titleText": "Opportunité",
  "typeText": "Type",
  "scheduleActivityText": "Planifier l'activité",
  "addNoteText": "Ajouter une note",
  "moreDetailsText": "Plus de détails",
  "multiCurrencyText": "Multidevise",
  "multiCurrencyRateText": "Taux de change",
  "multiCurrencyCodeText": "Code",
  "multiCurrencyDateText": "date du taux",
  "multiCurrencyLockedText": "taux verrouillés"
});

localize("Mobile.SalesLogix.Views.Opportunity.Edit", {
  "exchangeRateDateFormatText": "D/M/YYYY H:mm",
  "accountText": "cpte",
  "acctMgrText": "resp cpte",
  "estCloseText": "clôture est.",
  "importSourceText": "Source du lead",
  "detailsText": "Détails",
  "opportunityStatusTitleText": "Etat de l'opportunité",
  "opportunityText": "Opportunité",
  "opportunityTypeTitleText": "Type d'opportunité",
  "ownerText": "Propriétaire",
  "potentialText": "Potentiel de ventes",
  "probabilityText": "prob. de clôture",
  "probabilityTitleText": "Probabilité d'opportunité",
  "resellerText": "Revendeur",
  "statusText": "Etat",
  "titleText": "Opportunité",
  "typeText": "Type",
  "multiCurrencyText": "Multidevise",
  "multiCurrencyRateText": "Taux de change",
  "multiCurrencyCodeText": "Code",
  "multiCurrencyDateText": "date du taux",
  "multiCurrencyLockedText": "taux verrouillés",
  "subTypePickListResellerText": "Revendeur"
});

localize("Mobile.SalesLogix.Views.TicketActivity.Edit", {
  "startingFormatText": "D/M/YYYY H:mm",
  "titleText": "Modifier l'activité du ticket",
  "activityTypeText": "Type",
  "activityTypeTitleText": "Type",
  "publicAccessText": "Accès public",
  "publicAccessTitleText": "Accès public",
  "userText": "Utilisateur",
  "startDateText": "Date de début",
  "endDateText": "Date de fin",
  "commentsText": "Commentaires"
});

localize("Mobile.SalesLogix.Views.TicketActivity.List", {
  "startDateFormatText": "DD/MM/YYYY H:mm",
  "titleText": "Activités du ticket"
});

localize("Sage.Platform.Mobile.Detail", {
  "editText": "Modifier",
  "titleText": "Détail",
  "detailsText": "Détails",
  "toggleCollapseText": "développer/réduire",
  "loadingText": "Chargement ...",
  "requestErrorText": "Une erreur s'est produite sur le serveur pendant la demande de données.",
  "notAvailableText": "L'entrée requise n'est pas disponible."
});

localize("Sage.Platform.Mobile.Edit", {
  "saveText": "Enregistrer",
  "titleText": "Modifier",
  "toggleCollapseText": "développer/réduire",
  "validationSummaryText": "Récapitulatif de validation",
  "detailsText": "Détails",
  "loadingText": "Chargement ...",
  "requestErrorText": "Une erreur s'est produite sur le serveur pendant la demande de données."
});

localize("Sage.Platform.Mobile.ErrorManager", {
  "abortedText": "Abandonné",
  "scopeSaveText": "La portée n'est pas enregistrée dans le rapport d'erreur."
});

localize("Sage.Platform.Mobile.Fields.BooleanField", {
  "onText": "sur",
  "offText": "Désactivé"
});

localize("Sage.Platform.Mobile.Fields.DurationField", {
  "emptyText": "",
  "invalidDurationErrorText": "La durée du champ \"${0}\" n'est pas valide.",
  "autoCompleteText": {
    "1": "Minute(s)",
    "60": "Heure(s)",
    "1440": "Jour(s)",
    "10080": "semaine(s)",
    "525960": "année(s)"
  }
});

localize("Sage.Platform.Mobile.Fields.EditorField", {
  "lookupLabelText": "Modifier",
  "lookupText": "...",
  "emptyText": "vide",
  "completeText": "OK"
});

localize("Sage.Platform.Mobile.Fields.LookupField", {
  "dependentErrorText": "Une valeur doit être sélectionnée pour \"${0}\".",
  "emptyText": "",
  "completeText": "Sélectionner",
  "lookupLabelText": "Recherche",
  "lookupText": "..."
});

localize("Sage.Platform.Mobile.Fields.NoteField", {
  "emptyText": ""
});

localize("Sage.Platform.Mobile.Fields.SignatureField", {
  "signatureLabelText": "signature",
  "signatureText": "..."
});

localize("Sage.Platform.Mobile.GroupedList", {
  "toggleCollapseText": "développer/réduire"
});

localize("Sage.Platform.Mobile.Groups.DateTimeSection", {
  "displayNameText": "Section date heure",
  "todayText": "Aujourd'hui",
  "tomorrowText": "Demain",
  "laterThisWeekText": "Plus tard cette semaine",
  "earlierThisWeekText": "Plus tôt cette semaine",
  "thisLaterMonthText": "Plus tard ce mois",
  "thisEarlierMonthText": "Plus tôt ce mois",
  "thisYearEarlierText": "Plus tôt cette année",
  "thisYearLaterText": "Plus tard cette année",
  "yesterdayText": "Hier",
  "lastWeekText": "Semaine dernière",
  "lastMonthText": "Mois dernier",
  "pastYearText": "Année(s) passée(s)",
  "nextYearText": "Année suivante",
  "nextMonthText": "Mois prochain",
  "nextWeekText": "Semaine prochaine",
  "futureText": "Futur",
  "twoWeeksAgoText": "Il y a deux semaines",
  "threeWeeksAgoText": "Il y a trois semaines",
  "twoMonthsAgoText": "Il y a deux mois",
  "threeMonthsAgoText": "Il y a trois mois",
  "unknownText": "Inconnu"
});

localize("Sage.Platform.Mobile.Groups.GroupByValueSection", {
  "displayNameText": "Section Groupe par valeur"
});

localize("Sage.Platform.Mobile.List", {
  "moreText": "Récupérer plus de fiches",
  "emptySelectionText": "Aucun",
  "titleText": "Liste",
  "remainingText": "${0} fiches restantes",
  "cancelText": "Annuler",
  "insertText": "Nouveau",
  "noDataText": "Aucun enregistrement",
  "loadingText": "Chargement ...",
  "requestErrorText": "Une erreur s'est produite sur le serveur pendant la demande de données."
});

localize("Sage.Platform.Mobile.MainToolbar", {
  "titleText": "Mobile"
});

localize("Sage.Platform.Mobile.RelatedViewWidget", {
  "nodataText": "aucune fiche trouvée...",
  "selectMoreDataText": "voir ${0} plus de ${1} ... ",
  "navToListText": "voir liste",
  "loadingText": "chargement ... ",
  "refreshViewText": "Actualiser",
  "itemOfCountText": " ${0} sur ${1}",
  "totalCountText": " (${0})"
});

localize("Sage.Platform.Mobile.SearchWidget", {
  "searchText": "Rechercher"
});

localize("Sage.Platform.Mobile.View", {
  "titleText": "Vue générale"
});

localize("Sage.Platform.Mobile.Views.FileSelect", {
  "titleText": "Sélection de fichier",
  "addFileText": "Cliquez ou appuyez ici pour ajouter un fichier.",
  "uploadText": "Charger",
  "cancelText": "Annuler",
  "selectFileText": "Sélectionner un fichier",
  "loadingText": "Téléchargement en cours...",
  "descriptionText": "Description",
  "bytesText": "octets"
});

localize("Sage.Platform.Mobile.Views.Signature", {
  "titleText": "signature",
  "clearCanvasText": "Effacer",
  "undoText": "Annuler"
});

localize("Mobile.SalesLogix.Action", {
  "calledText": "Appelé ${0}",
  "emailedText": "Envoyé un e-mail à ${0}"
});

localize("Mobile.SalesLogix.ApplicationModule", {
  "searchText": "Recherche"
});

localize("Mobile.SalesLogix.Fields.AddressField", {
  "lookupLabelText": "Modifier",
  "emptyText": ""
});

localize("Mobile.SalesLogix.Fields.NameField", {
  "emptyText": ""
});

localize("Mobile.SalesLogix.Fields.RecurrencesField", {
  "titleText": "Périodicité",
  "emptyText": ""
});

localize("Mobile.SalesLogix.FileManager", {
  "unableToUploadText": "Ce navigateur ne prend pas en charge l'API File HTML5.",
  "unknownSizeText": "Inconnu",
  "unknownErrorText": "Attention : une erreur s'est produite et le fichier n'a pas pu être chargé. ",
  "largeFileWarningText": "Attention : cette requête dépasse la taille limite définie par votre administrateur et n'a pas pu être chargée. ",
  "percentCompleteText": "En cours de chargement, veuillez patienter..."
});

localize("Mobile.SalesLogix.Format", {
  "bigNumberAbbrText": {
    "billion": "G",
    "million": "M",
    "thousand": "K"
  }
});

localize("Mobile.SalesLogix.Recurrence", {
  "neverText": "Jamais",
  "daysText": "Jours",
  "dailyText": "Quotidienne",
  "weeksText": "semaines",
  "weeklyText": "Hebdomadaire",
  "weeklyOnText": "Toutes les semaines le ${3}",
  "monthsText": "mois",
  "monthlyText": "Mensuelle",
  "monthlyOnDayText": "Tous les mois le ${1}",
  "monthlyOnText": "Tous les mois le ${5} ${3}",
  "yearsText": "ans",
  "yearlyText": "Annuelle",
  "yearlyOnText": "Tous les ans le ${2}",
  "yearlyOnWeekdayText": "Tous les ans le ${5} ${3} en ${4}",
  "everyText": "chaque ${0} ${1}",
  "afterCompletionText": "après la fin",
  "untilEndDateText": "${0} jusqu'à ${1}",
  "ordText": {
    "0": "Jour",
    "1": "Prénom",
    "2": "deuxième",
    "3": "troisième",
    "4": "quatrième",
    "5": "Dernier"
  }
});

localize("Mobile.SalesLogix.SpeedSearchWidget", {
  "searchText": "SpeedSearch"
});

localize("Mobile.SalesLogix.Validator", {
  "exists": {
    "message": "Le champ \"${2}\" doit contenir une valeur."
  },
  "name": {
    "message": "Le champ \"${2}\" doit contenir un prénom et un nom de famille."
  },
  "notEmpty": {
    "message": "Le champ \"${2}\" ne peut pas être vide."
  },
  "hasText": {
    "test": "",
    "message": "Le champ \"${2}\" doit contenir du texte."
  },
  "isInteger": {
    "message": "Le nombre \"${0}\" n'est pas une valeur valide."
  },
  "isDecimal": {
    "message": "La valeur \"${0}\" n'est pas valide."
  },
  "isCurrency": {
    "message": "Le montant \"${0}\" n'est pas une valeur valide."
  },
  "isInt32": {
    "message": "La valeur du champ \"${2}\" dépasse la plage numérique autorisée."
  },
  "exceedsMaxTextLength": {
    "message": "La valeur du champ \"${2}\" dépasse la longueur autorisée."
  },
  "isDateInRange": {
    "message": "La valeur du champ \"${2}\" n'est pas comprise dans la plage autorisée."
  }
});

localize("Mobile.SalesLogix.Views.Account.Detail", {
  "accountText": "Compte",
  "acctMgrText": "resp cpte",
  "addressText": "Adresse",
  "businessDescriptionText": "desc bus",
  "createDateText": "Date de création",
  "createUserText": "Créé par",
  "faxText": "Fax",
  "importSourceText": "Source du lead",
  "industryText": "Secteur",
  "notesText": "Notes",
  "ownerText": "Propriétaire",
  "phoneText": "Téléphone",
  "activityTypeText": {
    "atPhoneCall": "Appel"
  },
  "actionsText": "Actions rapides",
  "relatedActivitiesText": "Activités",
  "relatedContactsText": "Contacts",
  "relatedHistoriesText": "Notes/Historique",
  "relatedItemsText": "Eléments associés",
  "relatedNotesText": "Notes",
  "relatedOpportunitiesText": "Opportunités",
  "relatedTicketsText": "Tickets",
  "relatedAddressesText": "Adresses",
  "relatedAttachmentText": "Pièces jointes",
  "relatedAttachmentTitleText": "Pièces jointes du compte",
  "statusText": "Etat",
  "subTypeText": "SousType",
  "titleText": "Compte",
  "typeText": "Type",
  "webText": "Web",
  "callMainNumberText": "Appeler le numéro principal",
  "scheduleActivityText": "Planifier l'activité",
  "addNoteText": "Ajouter une note",
  "viewAddressText": "Voir l'adresse",
  "moreDetailsText": "Plus de détails",
  "calledText": "Appelé ${0}"
});

localize("Mobile.SalesLogix.Views.Account.Edit", {
  "accountStatusTitleText": "Statut du compte",
  "accountSubTypeTitleText": "Sous-type du compte",
  "accountText": "Compte",
  "accountTypeTitleText": "Type de compte",
  "acctMgrText": "resp cpte",
  "businessDescriptionText": "desc bus",
  "businessDescriptionTitleText": "Description de l'activité professionnelle",
  "descriptionText": "Décroissant",
  "faxText": "Fax",
  "fullAddressText": "Adresse",
  "importSourceText": "Source du lead",
  "industryText": "Secteur",
  "industryTitleText": "Secteur",
  "ownerText": "Propriétaire",
  "phoneText": "Téléphone",
  "statusText": "Etat",
  "subTypeText": "SousType",
  "titleText": "Compte",
  "typeText": "Type",
  "webText": "Web"
});

localize("Mobile.SalesLogix.Views.Account.List", {
  "titleText": "Comptes",
  "activitiesText": "Activités",
  "notesText": "Notes",
  "scheduleText": "Planification",
  "editActionText": "Modifier",
  "callMainActionText": "Appeler principal",
  "viewContactsActionText": "Contacts",
  "addNoteActionText": "Ajouter une note",
  "addActivityActionText": "Ajouter activité",
  "addAttachmentActionText": "Ajouter une pièce jointe",
  "phoneAbbreviationText": "N° de téléphone : ",
  "faxAbbreviationText": "Fax : ",
  "hashTagQueriesText": {
    "my-accounts": "mes-comptes",  
    "active": "Actif",
    "inactive": "Inactive",
    "suspect": "suspect",
    "lead": "Lead",
    "prospect": "Prospect",
    "customer": "Client",
    "partner": "Partenaire",
    "vendor": "Revendeur",
    "influencer": "influenceur",
    "competitor": "Concurrent"
  }
});

localize("Mobile.SalesLogix.Views.Activity.MyList", {
  "titleText": "Mes activités",
  "completeActivityText": "Terminer",
  "acceptActivityText": "Accepter",
  "declineActivityText": "Refuser",
  "callText": "Appel",
  "calledText": "Appelé",
  "addAttachmentActionText": "Ajouter une pièce jointe",
  "viewContactActionText": "Contact",
  "viewAccountActionText": "Compte",
  "viewOpportunityActionText": "Opportunité",
  "hashTagQueriesText": {
    "alarm": "Alarme",
    "status-unconfirmed": "statut-non-confirmé",
    "status-accepted": "statut-accepté",
    "status-declined": "statut-refusé",
    "recurring": "Périodicité",
    "timeless": "Heure-indéfinie",
    "today": "Aujourd'hui",
    "this-week": "cette-semaine",
    "yesterday": "Hier"
  }
});

localize("Mobile.SalesLogix.Views.Activity.Recurring", {
  "startingText": "Date de début",
  "endingText": "Date de fin",
  "repeatsText": "répétitions",
  "everyText": "Chaque",
  "afterCompletionText": "après la fin",
  "singleWeekdayText": "jour de semaine",
  "weekdaysText": "jour(s) de semaine",
  "dayText": "Jour",
  "monthText": "Mois",
  "onText": "sur",
  "occurrencesText": "occurrences",
  "summaryText": "Résumé",
  "frequencyOptionsText": {
    "0": "Jours",
    "1": "semaines",
    "2": "mois",
    "3": "ans"
  },
  "recurringFrequencyText": "Fréquence de récurrence",
  "yesText": "Oui",
  "noText": "Non",
  "titleText": "Récurrence"
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
  "accountNameText": "Compte",
  "accountStatusTitleText": "Statut du compte",
  "accountSubTypeTitleText": "Sous-type de compte",
  "accountText": "Compte",
  "accountTypeTitleText": "Type de compte",
  "acctMgrText": "resp cpte",
  "addressText": "Adresse",
  "contactTitleText": "Titre",
  "descriptionText": "Description",
  "detailsAccountText": "Infos du compte",
  "detailsContactText": "Infos du contact",
  "detailsText": "Infos du contact/compte",
  "emailText": "E-mail",
  "faxText": "Fax",
  "homePhoneText": "N° de téléphone personnel",
  "industryText": "Secteur",
  "ownerText": "Propriétaire",
  "lastNameText": "Dernier",
  "mobileText": "Mobile",
  "nameText": "Nom",
  "statusText": "Etat",
  "subTypeText": "Sous-Type",
  "titleText": "Ajouter un compte/contact",
  "typeText": "Type",
  "webText": "Web",
  "workText": "Téléphone professionnel",
  "industryTitleText": "Secteur"
});

localize("Mobile.SalesLogix.Views.Address.Edit", {
  "address1Text": "Adresse 1",
  "address2Text": "Adresse 2",
  "address3Text": "Adresse 3",
  "cityText": "Ville",
  "cityTitleText": "Ville",
  "countryText": "Pays",
  "countryTitleText": "Pays",
  "descriptionText": "Description",
  "descriptionTitleText": "Description",
  "isMailingText": "Expédition",
  "isPrimaryText": "Principal",
  "postalCodeText": "Code postal",
  "salutationText": "Attention",
  "stateText": "Département",
  "stateTitleText": "Département",
  "titleText": "Adresse"
});

localize("Mobile.SalesLogix.Views.Address.List", {
  "titleText": "Adresses"
});

localize("Mobile.SalesLogix.Views.AreaCategoryIssueLookup", {
  "titleText": "Comptes"
});

localize("Mobile.SalesLogix.Views.Attachment.AddAttachment", {
  "titleText": "Ajouter des pièces jointes"
});

localize("Mobile.SalesLogix.Views.Attachment.MyAttachmentList", {
  "titleText": "Mes pièces jointes"
});

localize("Mobile.SalesLogix.Views.Charts.GenericBar", {
  "titleText": "",
  "otherText": "Autre"
});

localize("Mobile.SalesLogix.Views.Charts.GenericPie", {
  "titleText": "",
  "otherText": "Autre"
});

localize("Mobile.SalesLogix.Views.Competitor.List", {
  "titleText": "Concurrents"
});

localize("Mobile.SalesLogix.Views.Configure", {
  "titleText": "Configurer"
});

localize("Mobile.SalesLogix.Views.Contact.Detail", {
  "activityTypeText": {
    "atPhoneCall": "Appel",
    "atEMail": "Envoyer par e-mail"
  },
  "accountText": "Compte",
  "acctMgrText": "resp cpte",
  "addressText": "Adresse",
  "contactTitleText": "Titre",
  "createDateText": "Date de création",
  "createUserText": "Créé par",
  "emailText": "E-mail",
  "faxText": "Fax",
  "homeText": "N° de téléphone personnel",
  "nameText": "Contact",
  "ownerText": "Propriétaire",
  "actionsText": "Actions rapides",
  "relatedAccountsText": "Comptes",
  "relatedActivitiesText": "Activités",
  "relatedHistoriesText": "Notes/Historique",
  "relatedItemsText": "Eléments associés",
  "relatedNotesText": "Notes",
  "relatedOpportunitiesText": "Opportunités",
  "relatedTicketsText": "Tickets",
  "relatedAddressesText": "Adresses",
  "relatedAttachmentText": "Pièces jointes",
  "relatedAttachmentTitleText": "Pièces jointes des contacts",
  "titleText": "Contact",
  "webText": "Web",
  "workText": "Téléphone",
  "cuisinePreferenceText": "Cuisine",
  "callMobileNumberText": "Appeler le portable",
  "callWorkNumberText": "Appeler le numéro principal",
  "calledText": "Appelé",
  "scheduleActivityText": "Planifier l'activité",
  "addNoteText": "Ajouter une note",
  "sendEmailText": "Envoyer un e-mail",
  "viewAddressText": "Voir l'adresse",
  "moreDetailsText": "Plus de détails"
});

localize("Mobile.SalesLogix.Views.Contact.Edit", {
  "titleText": "Contact",
  "nameText": "Nom",
  "workText": "Téléphone",
  "mobileText": "Mobile",
  "emailText": "E-mail",
  "webText": "Web",
  "acctMgrText": "resp cpte",
  "accountNameText": "Compte",
  "homePhoneText": "N° de téléphone personnel",
  "faxText": "Fax",
  "addressText": "Adresse",
  "contactTitleText": "Titre",
  "titleTitleText": "Titre",
  "addressTitleText": "Adresse",
  "ownerText": "Propriétaire",
  "cuisinePreferenceText": "Cuisine",
  "cuisinePreferenceTitleText": "Cuisine"
});

localize("Mobile.SalesLogix.Views.Contact.List", {
  "titleText": "Contacts",
  "activitiesText": "Activités",
  "notesText": "Notes",
  "scheduleText": "Planification",
  "editActionText": "Modifier",
  "callMainActionText": "Appeler principal",
  "callWorkActionText": "Appeler bureau",
  "callMobileActionText": "Appeler portable",
  "sendEmailActionText": "E-mail",
  "viewAccountActionText": "Compte",
  "addNoteActionText": "Ajouter une note",
  "addActivityActionText": "Ajouter activité",
  "addAttachmentActionText": "Ajouter une pièce jointe",
  "phoneAbbreviationText": "Professionnel : ",
  "mobileAbbreviationText": "Mobile : ",
  "hashTagQueriesText": {
    "my-contacts": "mes-contacts",
    "primary": "Principal",
    "not-primary": "pas-principal",
    "can-email": "e-mail-possible",
    "can-phone": "téléphone-possible",
    "can-fax": "fax-possible",
    "can-mail": "courrier-possible",
    "can-solicit": "sollicitation-possible"
  }
});

localize("Mobile.SalesLogix.Views.Contract.List", {
  "titleText": "Contrats"
});

localize("Mobile.SalesLogix.Views.ExchangeRateLookup", {
  "titleText": "Taux de change"
});

localize("Mobile.SalesLogix.Views.FooterToolbar", {
  "copyrightText": "&copy; 2013 SalesLogix, NA, LLC. Tous droits réservés."
});

localize("Mobile.SalesLogix.Views.Help", {
  "titleText": "Aide",
  "errorText": "Erreur",
  "errorMessageText": "Impossible de charger le document d'aide."
});

localize("Mobile.SalesLogix.Views.History.RelatedView", {
  "regardingText": "Objet",
  "byText": "écrit "
});

localize("Mobile.SalesLogix.Views.Home", {
  "configureText": "Configurer",
  "addAccountContactText": "Ajouter un compte/contact",
  "titleText": "Domicile",
  "actionsText": "Actions rapides",
  "viewsText": "Aller à"
});

localize("Mobile.SalesLogix.Views.Lead.Detail", {
  "activityTypeText": {
    "atPhoneCall": "Appel",
    "atEMail": "Envoyer par e-mail"
  },
  "accountText": "Société",
  "addressText": "Adresse",
  "businessDescriptionText": "desc bus",
  "createDateText": "Date de création",
  "createUserText": "Créé par",
  "eMailText": "E-mail",
  "leadSourceText": "Source du lead",
  "industryText": "Secteur",
  "interestsText": "Intérêts",
  "leadTitleText": "Titre",
  "nameText": "Nom",
  "notesText": "Commentaires",
  "ownerText": "Propriétaire",
  "relatedActivitiesText": "Activités",
  "relatedHistoriesText": "Notes/Historique",
  "relatedItemsText": "Eléments associés",
  "relatedNotesText": "Notes",
  "relatedAttachmentText": "Pièces jointes",
  "relatedAttachmentTitleText": "Pièces jointes prospect",
  "sicCodeText": "Code APE",
  "titleText": "Lead",
  "tollFreeText": "Numéro vert",
  "mobileText": "téléphone portable",
  "webText": "Web",
  "workText": "Téléphone professionnel",
  "actionsText": "Actions rapides",
  "callWorkNumberText": "Appeler le numéro principal",
  "scheduleActivityText": "Planifier l'activité",
  "addNoteText": "Ajouter une note",
  "sendEmailText": "Envoyer un e-mail",
  "viewAddressText": "Voir l'adresse",
  "moreDetailsText": "Plus de détails",
  "calledText": "Appelé ${0}",
  "emailedText": "Envoyé un e-mail à ${0}"
});

localize("Mobile.SalesLogix.Views.Lead.Edit", {
  "accountText": "Compte",
  "addressText": "Adresse",
  "businessText": "desc bus",
  "businessTitleText": "Description de l'activité professionnelle",
  "companyText": "Société",
  "contactTitleText": "Titre",
  "emailText": "E-mail",
  "faxText": "Fax",
  "importSourceText": "Source du lead",
  "industryText": "Secteur",
  "industryTitleText": "Secteur",
  "interestsText": "Intérêts",
  "leadNameLastFirstText": "Nom",
  "leadOwnerText": "Propriétaire",
  "nameText": "Nom",
  "notesText": "Commentaires",
  "notesTitleText": "Commentaires",
  "sicCodeText": "Code APE",
  "titleText": "Lead",
  "titleTitleText": "Titre",
  "tollFreeText": "Numéro vert",
  "webText": "Web",
  "workText": "Téléphone professionnel",
  "mobileText": "téléphone portable"
});

localize("Mobile.SalesLogix.Views.Lead.List", {
  "titleText": "Leads",
  "activitiesText": "Activités",
  "notesText": "Notes",
  "scheduleText": "Planification",
  "emailedText": "Envoyé un e-mail à ${0}",
  "calledText": "Nommé ${0}",
  "editActionText": "Modifier",
  "callMobileActionText": "Appeler portable",
  "callWorkActionText": "Appeler bureau",
  "sendEmailActionText": "E-mail",
  "addNoteActionText": "Ajouter une note",
  "addActivityActionText": "Ajouter activité",
  "addAttachmentActionText": "Ajouter une pièce jointe",
  "phoneAbbreviationText": "Professionnel : ",
  "mobileAbbreviationText": "Mobile : ",
  "tollFreeAbbreviationText": "Numéro vert : ",
  "hashTagQueriesText": {
    "my-leads": "mes-prospects",
    "can-email": "e-mail-possible",
    "can-phone": "téléphone-possible",
    "can-fax": "fax-possible",
    "can-mail": "courrier-possible",
    "can-solicit": "sollicitation-possible"
  }
});

localize("Mobile.SalesLogix.Views.LeadSource.List", {
  "titleText": "Sources des leads"
});

localize("Mobile.SalesLogix.Views.LeftDrawer", {
  "configureText": "Menu Configurer",
  "addAccountContactText": "Ajouter un compte/contact",
  "titleText": "Menu principal",
  "actionsText": "Actions rapides",
  "viewsText": "Aller à",
  "footerText": "Autre",
  "settingsText": "Paramètres",
  "helpText": "Aide",
  "logOutText": "Déconnexion",
  "logOutConfirmText": "Voulez-vous vraiment vous déconnecter ?"
});

localize("Mobile.SalesLogix.Views.Login", {
  "copyrightText": "&copy; 2013 SalesLogix, NA, LLC. Tous droits réservés.",
  "logOnText": "Se connecter à Saleslogix",
  "passText": "Mot de passe",
  "rememberText": "se rappeler",
  "titleText": "Connexion",
  "userText": "Nom d'utilisateur",
  "invalidUserText": "Le nom d'utilisateur ou mot de passe n'est pas valide. ",
  "missingUserText": "La fiche utilisateur est introuvable. ",
  "serverProblemText": "Un problème est survenu sur le serveur.",
  "requestAbortedText": "La requête a été abandonnée."
});

localize("Mobile.SalesLogix.Views.MainToolbar", {
  "titleText": "SalesLogix"
});

localize("Mobile.SalesLogix.Views.MetricConfigure", {
  "titleText": "Configurer les mesures",
  "metricTitleText": "Titre",
  "metricFilterText": "Filtrer",
  "metricText": "Mesure",
  "chartTypeText": "type de graphique",
  "advancedText": "Options avancées",
  "formatterText": "formatteur",
  "aggregateText": "Agrégat",
  "reportViewText": "identifiant de la vue graphique"
});

localize("Mobile.SalesLogix.Views.MetricFilterLookup", {
  "titleText": "Recherche filtre/mesure"
});

localize("Mobile.SalesLogix.Views.MetricWidget", {
  "loadingText": "Chargement ..."
});

localize("Mobile.SalesLogix.Views.NameEdit", {
  "titleText": "Modifier le nom",
  "firstNameText": "Prénom",
  "middleNameText": "milieu",
  "lastNameText": "Dernier",
  "prefixText": "Préfixe",
  "prefixTitleText": "Préfixe de nom",
  "suffixText": "Suffixe",
  "suffixTitleText": "Suffixe de nom"
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
  "addActivityActionText": "Ajouter activité",
  "addAttachmentActionText": "Ajouter une pièce jointe",
  "actualCloseText": "Terminée ",
  "estimatedCloseText": "Date de clôture approx. ",
  "hashTagQueriesText": {
    "my-opportunities": "mes-opportunités",
    "open": "Ouvrir",
    "closed": "Terminée",
    "won": "gagné",
    "lost": "perdu",
    "inactive": "Inactive",
    "prospect": "Prospect",
    "qualification": "Qualification",
    "negotiation": "négociation",
    "needs-analysis": "analyse-nécessaire",
    "demonstration": "démonstration",
    "decision": "décision"
  }
});

localize("Mobile.SalesLogix.Views.OpportunityContact.Detail", {
  "titleText": "Contact d'opportunité",
  "accountText": "Compte",
  "contactTitleText": "Titre",
  "nameText": "Contact",
  "moreDetailsText": "Plus de détails",
  "salesRoleText": "Rôle",
  "strategyText": "Stratégie",
  "personalBenefitsText": "bén. personnels",
  "standingText": "Position",
  "issuesText": "Problèmes",
  "competitorNameText": "préf. concurrent",
  "removeContactTitleText": "Supprimer le contact",
  "confirmDeleteText": "Supprimer  \"${0}\" de l'opportunité ?",
  "contactText": "Contact"
});

localize("Mobile.SalesLogix.Views.OpportunityContact.Edit", {
  "titleText": "Modifier le contact de l'opp.",
  "nameText": "Nom",
  "accountNameText": "Compte",
  "contactTitleText": "Titre",
  "salesRoleText": "Rôle",
  "salesRoleTitleText": "Rôle",
  "personalBenefitsText": "bén. personnels",
  "strategyText": "Stratégie",
  "issuesText": "Problèmes",
  "standingText": "Position",
  "standingTitleText": "Position",
  "contactText": "Contact",
  "competitorPrefText": "préf. concurrent"
});

localize("Mobile.SalesLogix.Views.OpportunityContact.List", {
  "titleText": "Contacts d'opportunité",
  "selectTitleText": "Sélectionner un contact",
  "activitiesText": "Activités",
  "notesText": "Notes",
  "scheduleText": "Planification"
});

localize("Mobile.SalesLogix.Views.OpportunityProduct.Detail", {
  "detailsText": "Détails",
  "opportunityText": "Opportunité",
  "productText": "Produit",
  "productFamilyText": "Famille du produit",
  "priceLevelText": "Niveau de prix",
  "priceText": "Prix",
  "basePriceText": "Prix de base",
  "discountText": "Remise",
  "quantityText": "Quantité",
  "baseExtendedPriceText": "Base",
  "extendedPriceText": "Prix étendu",
  "extendedPriceSectionText": "Prix étendu",
  "adjustedPriceSectionText": "Prix ajusté",
  "baseAdjustedPriceText": "Base",
  "adjustedPriceText": "prix ajusté",
  "myAdjustedPriceText": "Utilisateur",
  "confirmDeleteText": "Supprimer ${0} des produits de l'opportunité ?",
  "removeOppProductTitleText": "supprimer le produit de l'opportunité"
});

localize("Mobile.SalesLogix.Views.OpportunityProduct.Edit", {
  "titleText": "Produit d'opportunité",
  "detailsText": "Détails",
  "opportunityText": "Opportunité",
  "productText": "Produit",
  "productFamilyText": "Famille du produit",
  "priceLevelText": "Niveau de prix",
  "priceText": "Prix",
  "basePriceText": "Prix de base",
  "discountText": "% de réduction",
  "adjustedPriceText": "prix ajusté",
  "myAdjustedPriceText": "Utilisateur",
  "baseAdjustedPriceText": "Base",
  "quantityText": "Quantité",
  "baseExtendedPriceText": "Base",
  "extendedPriceText": "Prix étendu",
  "extendedPriceSectionText": "Prix étendu",
  "adjustedPriceSectionText": "Prix ajusté"
});

localize("Mobile.SalesLogix.Views.OpportunityProduct.List", {
  "titleText": "Produits"
});

localize("Mobile.SalesLogix.Views.Owner.List", {
  "titleText": "Propriétaires"
});

localize("Mobile.SalesLogix.Views.Product.List", {
  "titleText": "Produits"
});

localize("Mobile.SalesLogix.Views.ProductProgram.List", {
  "titleText": "Programmes du produit"
});

localize("Mobile.SalesLogix.Views.Settings", {
  "clearLocalStorageTitleText": "Effacer le stockage",
  "clearAuthenticationTitleText": "Effacer les identifiants enregistrés",
  "errorLogTitleText": "Afficher les journaux d'erreur",
  "localStorageClearedText": "Stockage local effacé.",
  "credentialsClearedText": "Identifiants enregistrés effacés.",
  "titleText": "Paramètres"
});

localize("Mobile.SalesLogix.Views.SpeedSearchList", {
  "titleText": "SpeedSearch",
  "indexesText": {
    "Account": "Compte",
    "Activity": "Activité",
    "Contact": "Contact",
    "History": "Historique",
    "Lead": "Lead",
    "Opportunity": "Opportunité",
    "Ticket": "Ticket"
  }
});

localize("Mobile.SalesLogix.Views.TextEdit", {
  "titleText": "Modifier le texte"
});

localize("Mobile.SalesLogix.Views.Ticket.Detail", {
  "accountText": "Compte",
  "areaText": "Zone",
  "assignedDateText": "Date de l'affectation",
  "assignedToText": "Affecté à",
  "completedByText": "Terminé par",
  "categoryText": "Catégorie",
  "contactText": "Contact",
  "contractText": "Contrat",
  "descriptionText": "Décroissant",
  "issueText": "Problème",
  "needByText": "Echéance",
  "notesText": "Commentaires",
  "phoneText": "Téléphone",
  "actionsText": "Actions rapides",
  "relatedAttachmentText": "Pièces jointes",
  "relatedAttachmentTitleText": "Pièces jointes du ticket",
  "relatedActivitiesText": "Activités",
  "relatedItemsText": "Eléments associés",
  "resolutionText": "Résolution",
  "sourceText": "Source",
  "statusText": "Etat",
  "subjectText": "Objet",
  "ticketIdText": "Numéro de ticket",
  "titleText": "Ticket",
  "urgencyText": "Priorité",
  "scheduleActivityText": "Planifier l'activité",
  "moreDetailsText": "Plus de détails",
  "relatedTicketActivitiesText": "Activités du ticket",
  "loadingText": "Chargement ..."
});

localize("Mobile.SalesLogix.Views.Ticket.Edit", {
  "accountText": "cpte",
  "areaText": "Zone",
  "assignedDateText": "Date de l'affectation",
  "assignedToText": "Affecté à",
  "categoryText": "Catégorie",
  "contactText": "Contact",
  "contractText": "Contrat",
  "descriptionText": "Décroissant",
  "descriptionTitleText": "Description",
  "issueText": "Problème",
  "needByText": "Echéance",
  "notesText": "Commentaires",
  "notesTitleText": "Commentaires",
  "phoneText": "Téléphone",
  "relatedActivitiesText": "Activités",
  "relatedItemsText": "Eléments associés",
  "resolutionText": "Résolution",
  "resolutionTitleText": "Résolution",
  "sourceText": "Source",
  "sourceTitleText": "Source",
  "statusText": "Etat",
  "subjectText": "Objet",
  "ticketAreaTitleText": "Zone de ticket",
  "ticketCategoryTitleText": "Catégorie du ticket",
  "ticketIdText": "Numéro de ticket",
  "ticketIssueTitleText": "Problème du ticket",
  "ticketStatusTitleText": "Etat du ticket",
  "ticketUrgencyTitleText": "Urgence du ticket",
  "titleText": "Ticket",
  "urgencyText": "Priorité"
});

localize("Mobile.SalesLogix.Views.Ticket.List", {
  "titleText": "Tickets",
  "activitiesText": "Activités",
  "scheduleText": "Planification",
  "notAssignedText": "Non attribué",
  "editActionText": "Modifier",
  "viewAccountActionText": "Compte",
  "viewContactActionText": "Contact",
  "addNoteActionText": "Ajouter une note",
  "addActivityActionText": "Ajouter activité",
  "addAttachmentActionText": "Ajouter une pièce jointe",
  "assignedToText": "Affecté à : ",
  "urgencyText": "Priorité : ",
  "createdOnText": "Créé  ",
  "modifiedText": "Modifié ",
  "neededByText": "Nécessaire  ",
  "hashTagQueriesText": {
    "assigned-to-me": "attribué-à-moi",
    "completed-by-me": "réalisé-par-moi"
  }
});

localize("Mobile.SalesLogix.Views.Ticket.UrgencyLookup", {
  "titleText": "Urgence du ticket"
});

localize("Mobile.SalesLogix.Views.TicketActivity.Detail", {
  "titleText": "Activité du ticket",
  "accountText": "Compte",
  "contactText": "Contact",
  "typeText": "Type",
  "publicAccessText": "Accès public",
  "assignedDateText": "Date de début",
  "completedDateText": "Date de fin",
  "followUpText": "Suivi",
  "unitsText": "Unités de temps",
  "elapsedUnitsText": "Heures écoulées",
  "rateTypeDescriptionText": "type de frais",
  "rateText": "Taux",
  "totalLaborText": "Main d'œuvre totale",
  "totalPartsText": "Total de pièces",
  "totalFeeText": "Frais totaux",
  "activityDescriptionText": "Commentaires",
  "ticketNumberText": "Numéro de ticket",
  "userText": "Utilisateur",
  "completeTicketText": "Terminer l'activité du ticket",
  "moreDetailsText": "Plus de détails",
  "relatedItemsText": "Eléments associés",
  "relatedTicketActivityItemText": "Parties de l'activité du ticket"
});

localize("Mobile.SalesLogix.Views.TicketActivity.RateLookup", {
  "titleText": "Taux"
});

localize("Mobile.SalesLogix.Views.TicketActivityItem.Detail", {
  "titleText": "Pièce de l'activité de ticket",
  "productNameText": "Produit",
  "skuText": "Code Article",
  "serialNumberText": "N° de série",
  "itemAmountText": "Prix",
  "itemDescriptionText": "Description"
});

localize("Mobile.SalesLogix.Views.TicketActivityItem.List", {
  "titleText": "Parties de l'activité du ticket"
});

localize("Mobile.SalesLogix.Views.UpdateToolbar", {
  "updateText": "Une mise à jour est disponible. Cliquez pour recharger."
});

localize("Mobile.SalesLogix.Views.User.List", {
  "titleText": "Utilisateurs"
});

localize("Mobile.SalesLogix.Views._CardLayoutListMixin", {
  "itemIconAltText": "Contact",
  "allRecordsText": "aucune recherche appliquée"
});

localize("Mobile.SalesLogix.Views._RightDrawerListMixin", {
  "hashTagsSectionText": "Hashtags",
  "kpiSectionText": "ICP"
});

localize("Mobile.SalesLogix.Views._SpeedSearchRightDrawerListMixin", {
  "indexSectionText": "Index",
  "configureText": "Configurer"
});
});

(function() {
    var getV = Sage.Platform.Mobile.Utility.getValue,
        scope = this,
        localize = function(name, values) {
            var target = getV(scope, name);
            if (target) apply(target, values);
        },
        apply = function(object, values){
            var target = object.prototype || object;
            for(var key in values){
                if(typeof values[key] === 'object'){
                    apply(target[key], values[key]);
                } else {
                    target[key] = values[key];
                }
            }
        };

    localize('Mobile.SalesLogix.Validator',{
        exists : {
            message : 'Champ "{2}" doit contenir une val.'
		},
        name : {
            message : 'Le champ "{2}" doit contenir un nom et un prénom.'
		},
        notEmpty : {
            message : 'Le champ "{2}" ne peut être vide'
		},
        hasText : {
            message : 'Le champ "{2}" doit contenir du texte.'
		},
        isInteger : {
            message : 'Valeur "{0}" n"est pas un n° valide'
		},
        isDecimal : {
            message : 'Valeur "{0}" n"est pas un n° valide'
		},
        isCurrency : {
            message : 'Valeur "{0}" n"est pas un n° de devise valide'
		},
        isInt32 : {
            message : 'La valeur du champ "{2}" dépasse la plage autorisée'
		},
        exceedsMaxTextLength : {
            message : 'La valeur du champ "{2}" dépasse la longueur autorisée'
		},
        isDateInRange : {
            message : 'Valeur du champ "{2}" hors de la plage de don. aut.'
		}
    });
    localize('Mobile.SalesLogix.AddAccountContact',{
        accountNameText : 'Compte',
        accountStatusTitleText : 'État compte',
        accountSubTypeTitleText : 'SousType Compte',
        accountText : 'Compte',
        accountTypeTitleText : 'Type de Compte',
        addressText : 'Adresse',
        contactTitleText : 'Titre',
        descriptionText : 'Description',
        detailsAccountText : 'Infos Compte',
        detailsContactText : 'Info Contact',
        detailsText : 'Infos Contact/Compte',
        emailText : 'E-mail',
        faxText : 'Fax',
        homePhoneText : 'Tél. dom.',
        industryText : 'Secteur',
        lastNameText : 'Fam.',
        mobileText : 'Mobile',
        nameText : 'Nom',
        statusText : 'Etat',
        subTypeText : 'Ss-type',
        titleText : 'Ajout Contact/Compte',
        typeText : 'Type',
        webText : 'Web',
        workText : 'Tél. pro',
        industryTitleText : 'Secteur'
    });
    localize('Mobile.SalesLogix.AreaCategoryIssueLookup',{
        titleText : 'Comptes'
    });
    localize('Mobile.SalesLogix.Configure',{
        titleText : 'Config.',
        savePrefsText : 'Enregis.'
    });
    localize('Mobile.SalesLogix.ContextDialog',{
        activitiesText : 'Activités',
        addAccountContactText : 'Aj. Contact/Compte',
        cancelText : 'Annuler',
        notesText : 'Notes',
        scheduleText : 'Planification'
    });
    localize('Mobile.SalesLogix.FooterToolbar',{
        copyrightText : '© 2011 Sage Software, Inc. Tous droits réservés',
        logOutConfirmText : 'Confirmer la deconnexion ?',
        settingsText : 'Param.',
        helpText : 'Aide',
        topText : 'Haut',
        logOutText : 'Déco.'
    });
    localize('Mobile.SalesLogix.Help',{
        titleText : 'Aide',
        errorText : 'Erreur',
        errorMessageText : 'Impossible de charger doc d’aide.'
    });
    localize('Mobile.SalesLogix.Home',{
        configureText : 'Config.',
        addAccountContactText : 'Aj. Contact/Compte',
        titleText : 'Dom.',
        actionsText : 'Actions Rapides',
        viewsText : 'Aller À'
    });
    localize('Mobile.SalesLogix.Login',{
        copyrightText : '© 2011 Sage Software, Inc. Tous droits réservés',
        logOnText : 'Connexion',
        passText : 'Mot pass',
        rememberText : 'Mémo.',
        titleText : 'Sage SalesLogix',
        userText : 'Nom util.',
        invalidUserText : 'Nom d’utilisateur/password non valide',
        missingUserText : 'Enregis. util. introuvable.',
        serverProblemText : 'Problème survenu sur le serveur.',
        requestAbortedText : 'Demande annulée.'
    });
    localize('Mobile.SalesLogix.NameEdit',{
        firstNameText : 'Prén.',
        middleNameText : '2e pré',
        lastNameText : 'Fam.',
        prefixText : 'Préfix',
        prefixTitleText : 'Préfixe Nom',
        suffixText : 'Suffix',
        suffixTitleText : 'Suffixe Nom'
    });
    localize('Mobile.SalesLogix.Settings',{
        clearLocalStorageTitleText : 'Effac. Stock.',
        clearAuthenticationTitleText : 'Effac Info Ident Enreg.',
        localStorageClearedText : 'Stockage local effacé avec succès.',
        credentialsClearedText : 'Infors d’ident. effacées avec succès.',
        titleText : 'Param.'
    });
    localize('Mobile.SalesLogix.TextEdit',{
        titleText : 'Texte'
    });
    localize('Mobile.SalesLogix.UpdateToolbar',{
        updateText : 'MàJ disponible. Cliquer pour recharger.'
    });
    localize('Mobile.SalesLogix.Account.Detail',{
        accountText : 'Compte',
        acctMgrText : 'Resp cpt',
        addressText : 'Adresse',
        businessDescriptionText : 'Desc act',
        createDateText : 'Date créa.',
        createUserText : 'Créé par',
        faxText : 'Fax',
        importSourceText : 'Source lead',
        industryText : 'Secteur',
        notesText : 'Notes',
        ownerText : 'Propr',
        phoneText : 'Tél.',
        activityTypeText : {
            atPhoneCall : 'Appel'
		},
        actionsText : 'Actions Rapides',
        relatedActivitiesText : 'Activités',
        relatedContactsText : 'Contacts',
        relatedHistoriesText : 'Notes/Historique',
        relatedItemsText : 'Élém. Assoc.',
        relatedNotesText : 'Notes',
        relatedOpportunitiesText : 'Opportunités',
        relatedTicketsText : 'Tickets',
        statusText : 'Etat',
        subTypeText : 'Ss-type',
        titleText : 'Compte',
        typeText : 'Type',
        webText : 'Web',
        callMainNumberText : 'Appel num. princ',
        scheduleActivityText : 'Planifier activ.',
        addNoteText : 'Aj. note',
        viewAddressText : 'Aff. adresse',
        moreDetailsText : 'Plus Détails',
        calledText : 'Appelé {0}'
    });
    localize('Mobile.SalesLogix.Account.Edit',{
        accountStatusTitleText : 'État Compte',
        accountSubTypeTitleText : 'Ss-type Compte',
        accountText : 'Compte',
        accountTypeTitleText : 'Type de Compte',
        acctMgrText : 'Resp cpt',
        businessDescriptionText : 'Desc act',
        businessDescriptionTitleText : 'Description de l"Activité Professionnelle',
        descriptionText : 'Desc',
        faxText : 'Fax',
        fullAddressText : 'Adresse',
        importSourceText : 'Source lead',
        industryText : 'Secteur',
        industryTitleText : 'Secteur',
        ownerText : 'Propr',
        phoneText : 'Tél.',
        statusText : 'Etat',
        subTypeText : 'Ss-type',
        titleText : 'Compte',
        typeText : 'Type',
        webText : 'Web'
    });
    localize('Mobile.SalesLogix.Account.List',{
        titleText : 'Comptes',
        activitiesText : 'Activités',
        notesText : 'Notes',
        scheduleText : 'Planification'
    });
    localize('Mobile.SalesLogix.Activity.Complete',{
        activityInfoText : 'Info Activité',
        accountText : 'Compte',
        contactText : 'Contact',
        opportunityText : 'Opportunité',
        ticketNumberText : 'Ticket',
        companyText : 'Société',
        leadText : 'Lead',
        asScheduledText : 'Comme plan.',
        categoryText : 'Catégor.',
        categoryTitleText : 'Catégor. Activité',
        completedText : 'Date de réal.',
        completedFormatText : 'd/M/yyyy H:mm',
        completionText : 'Fin',
        durationText : 'Durée',
        durationInvalidText : 'Champ "{2}" doit contenir une val.',
        carryOverNotesText : 'Reporter notes',
        followUpText : 'Suivi',
        followUpTitleText : 'Type de Suivi',
        leaderText : 'Resp.',
        longNotesText : 'Notes',
        longNotesTitleText : 'Notes',
        otherInfoText : 'Plus Infos',
        priorityText : 'Priorité',
        priorityTitleText : 'Priorité',
        regardingText : 'Objet',
        regardingTitleText : 'Objet Activité',
        resultText : 'Résult',
        resultTitleText : 'Résultat',
        startingText : 'Date début',
        startingFormatText : 'd/M/yyyy H:mm',
        timelessText : 'Heure indéfinie',
        durationValueText : {
            0 : 'Aucun',
            15 : '15 minutes',
            30 : '30 minutes',
            60 : '1 heure',
            90 : '1,5 heure',
            120 : '2 heures'
		},
        followupValueText : {
            none : 'Aucun',
            atPhoneCall : 'Appel',
            atAppointment : 'Rendez-vous',
            atToDo : 'Tâche à Faire'
		}
    });
    localize('Mobile.SalesLogix.Activity.Detail',{
        activityTypeText : {
            atToDo : 'Tâche à Faire',
            atPhoneCall : 'Appel',
            atAppointment : 'Rendez-vous',
            atLiterature : 'Demande de Documentation',
            atPersonal : 'Activité Personnelle'
		},
        actionsText : 'Actions Rapides',
        completeActivityText : 'Terminer l"Activité',
        alarmText : 'Rappel',
        alarmTimeText : 'Rappel',
        categoryText : 'Catégor.',
        durationText : 'Durée',
        leaderText : 'Resp.',
        longNotesText : 'Notes',
        priorityText : 'Priorité',
        regardingText : 'Objet',
        rolloverText : 'Report auto.',
        startTimeText : 'Heure déb.',
        allDayText : 'Journée',
        timelessText : 'Heure indéfinie',
        titleText : 'Activité',
        typeText : 'Type',
        companyText : 'Société',
        leadText : 'Lead',
        accountText : 'Compte',
        contactText : 'Contact',
        opportunityText : 'Opportunité',
        ticketNumberText : 'Ticket',
        whenText : 'Qd',
        whoText : 'Qui',
        startDateFormatText : 'd/M/yyyy H:mm:ss',
        timelessDateFormatText : 'd/M/yyyy',
        alarmDateFormatText : 'd/M/yyyy H:mm:ss'
    });
    localize('Mobile.SalesLogix.Activity.Edit',{
        activityCategoryTitleText : 'Catégor. Activité',
        activityDescriptionTitleText : 'Description de l"Activité',
        activityTypeTitleText : 'Type d"Activité',
        alarmText : 'Rappel',
        alarmTimeText : '',
        categoryText : 'Catégor.',
        durationText : 'Durée',
        durationTitleText : 'Durée',
        durationInvalidText : 'Champ "{2}" doit contenir une val.',
        reminderInvalidText : 'Champ "rappel" doit contenir une valeur',
        reminderTitleText : 'Rappel',
        leaderText : 'Resp.',
        longNotesText : 'Notes',
        longNotesTitleText : 'Notes',
        priorityText : 'Priorité',
        priorityTitleText : 'Priorité',
        regardingText : 'Objet',
        rolloverText : 'Report auto.',
        startingText : 'Heure déb.',
        startingFormatText : 'd/M/yyyy H:mm',
        timelessText : 'Heure indéfinie',
        titleText : 'Activité',
        typeText : 'Type',
        accountText : 'Compte',
        contactText : 'Contact',
        opportunityText : 'Opportunité',
        ticketNumberText : 'Ticket',
        companyText : 'Société',
        leadText : 'Lead',
        isLeadText : 'Pr lead',
        yesText : 'OUI',
        noText : 'NON',
        updateUserActErrorText : 'Erreur survenue lors de la MàJ acti. util.',
        reminderValueText : {
            0 : 'Aucun',
            5 : '5 minutes',
            15 : '15 minutes',
            30 : '30 minutes',
            60 : '1 heure',
            1440 : '1 jour'
		},
        durationValueText : {
            0 : 'Aucun',
            15 : '15 minutes',
            30 : '30 minutes',
            60 : '1 heure',
            90 : '1,5 heure',
            120 : '2 heures'
		}
    });
    localize('Mobile.SalesLogix.Activity.List',{
        startDateFormatText : 'ddd d/M/yy',
        startTimeFormatText : 'H:mm',
        titleText : 'Activités'
    });
    localize('Mobile.SalesLogix.Activity.TypesList',{
        titleText : 'Planification...',
        activityTypeText : {
            atToDo : 'Tâche à Faire',
            atPhoneCall : 'Appel',
            atAppointment : 'Rendez-vous',
            atLiterature : 'Demande de Documentation',
            atPersonal : 'Activité Personnelle'
		}
    });
    localize('Mobile.SalesLogix.Address.Edit',{
        address1Text : 'Adresse 1',
        address2Text : 'Adresse 2',
        address3Text : 'Adresse 3',
        cityText : 'Ville',
        cityTitleText : 'Ville',
        countryText : 'Pays',
        countryTitleText : 'Pays',
        descriptionText : 'Description',
        descriptionTitleText : 'Description',
        isMailingText : 'Expédi.',
        isPrimaryText : 'Primair',
        postalCodeText : 'CP',
        salutationText : 'Attention',
        stateText : 'Dépt',
        stateTitleText : 'Département',
        titleText : 'Adresse'
    });
    localize('Mobile.SalesLogix.Calendar.MonthView',{
        titleText : 'Agenda',
        todayText : 'Aujourd"hui',
        dayText : 'Jour',
        weekText : 'Sem.',
        monthText : 'Mois',
        monthTitleFormatText : 'MMMM yyyy',
        dayTitleFormatText : 'ddd d MMM yyyy',
        dayStartTimeFormatText : 'H:mm'
    });
    localize('Mobile.SalesLogix.Calendar.UserActivityList',{
        titleText : 'Agenda',
        dateHeaderFormatText : 'dddd, dd/MM/yyyy',
        startTimeFormatText : 'H:mm',
        todayText : 'Aujourd"hui',
        dayText : 'Jour',
        weekText : 'Sem.',
        monthText : 'Mois',
        allDayText : 'Journée'
    });
    localize('Mobile.SalesLogix.Calendar.WeekView',{
        titleText : 'Agenda',
        weekTitleFormatText : 'd MMM yyyy',
        dayHeaderLeftFormatText : 'ddd',
        dayHeaderRightFormatText : 'd MMM yyyy',
        startTimeFormatText : 'H:mm',
        todayText : 'Aujourd"hui',
        dayText : 'Jour',
        weekText : 'Sem.',
        monthText : 'Mois',
        allDayText : 'Journée'
    });
    localize('Mobile.SalesLogix.Campaign.Detail',{
        acctMgrText : 'Resp cpt',
        codeText : 'Code',
        createDateText : 'Date créa.',
        createUserText : 'Créé par',
        fbarHomeTitleText : 'Dom.',
        fbarScheduleTitleText : 'Plan.',
        nameText : 'Nom',
        startText : 'Comm.',
        titleText : 'Campagne'
    });
    localize('Mobile.SalesLogix.Campaign.Edit',{
        codeText : 'Code',
        nameText : 'Nom',
        startText : 'Comm.',
        titleText : 'Campagne'
    });
    localize('Mobile.SalesLogix.Campaign.List',{
        titleText : 'Campagnes'
    });
    localize('Mobile.SalesLogix.Contact.Detail',{
        activityTypeText : {
            atPhoneCall : 'Appel',
            atEMail : 'Envoyer par E-mail'
		},
        accountText : 'Compte',
        acctMgrText : 'Resp cpt',
        addressText : 'Adresse',
        contactTitleText : 'Titre',
        createDateText : 'Date créa.',
        createUserText : 'Créé par',
        emailText : 'E-mail',
        faxText : 'Fax',
        homeText : 'Tél. dom.',
        nameText : 'Contact',
        ownerText : 'Propr',
        actionsText : 'Actions Rapides',
        relatedAccountsText : 'Comptes',
        relatedActivitiesText : 'Activités',
        relatedHistoriesText : 'Notes/Historique',
        relatedItemsText : 'Élém. Assoc.',
        relatedNotesText : 'Notes',
        relatedOpportunitiesText : 'Opportunités',
        relatedTicketsText : 'Tickets',
        titleText : 'Contact',
        webText : 'Web',
        workText : 'Tél.',
        callMobileNumberText : 'Appel port.',
        callWorkNumberText : 'Appel num. princ',
        scheduleActivityText : 'Planifier activ.',
        addNoteText : 'Aj. note',
        sendEmailText : 'Env. email',
        viewAddressText : 'Aff. adresse',
        moreDetailsText : 'Plus Détails'
    });
    localize('Mobile.SalesLogix.Contact.Edit',{
        titleText : 'Contact',
        nameText : 'Nom',
        workText : 'Tél.',
        mobileText : 'Mobile',
        emailText : 'E-mail',
        webText : 'Web',
        acctMgrText : 'Resp cpt',
        accountNameText : 'Compte',
        homePhoneText : 'Tél. dom.',
        faxText : 'Fax',
        addressText : 'Adresse',
        contactTitleText : 'Titre',
        titleTitleText : 'Titre',
        addressTitleText : 'Adresse',
        ownerText : 'Propr'
    });
    localize('Mobile.SalesLogix.Contact.List',{
        titleText : 'Contacts',
        activitiesText : 'Activités',
        notesText : 'Notes',
        scheduleText : 'Planification'
    });
    localize('Mobile.SalesLogix.Contract.Detail',{
        accountText : 'Compte',
        activeText : 'Actif',
        contactText : 'Contact',
        contractTypeText : 'TypeContrat',
        createDateText : 'Date créa.',
        createUserText : 'Créé par',
        endText : 'Fin',
        fbarHomeTitleText : 'Dom.',
        fbarScheduleTitleText : 'Plan.',
        quantityText : 'Quantité',
        refNumText : 'Numref',
        relatedItemsText : 'Élém. Assoc.',
        relatedTicketsText : 'Tickets',
        remainingText : 'Restant',
        startText : 'Comm.',
        svcTypeText : 'Type svc',
        titleText : 'Contrat'
    });
    localize('Mobile.SalesLogix.Contract.Edit',{
        titleText : 'Contrat',
        refNumText : 'Numref',
        quantityText : 'Quantité',
        activeText : 'Actif'
    });
    localize('Mobile.SalesLogix.Contract.List',{
        titleText : 'Contrats'
    });
    localize('Mobile.SalesLogix.Defect.Detail',{
        areaText : 'Zone',
        assignedText : 'Affecté',
        categoryText : 'Catégor.',
        createDateText : 'Date créa.',
        createUserText : 'Créé par',
        defectIdText : 'Id défaut',
        fbarHomeTitleText : 'Dom.',
        fbarNewTitleText : 'Nv.',
        fbarScheduleTitleText : 'Plan.',
        moreText : 'Plus >>',
        priorityText : 'Priorité',
        relatedDefectProblemsText : 'Problème',
        relatedDefectSolutionsText : 'Solution',
        relatedItemsText : 'Élém. Assoc.',
        reportDateText : 'Date rapp.',
        severityText : 'Gravité',
        statusText : 'Etat',
        subjectText : 'Objet',
        titleText : 'Défaut'
    });
    localize('Mobile.SalesLogix.Defect.Edit',{
        idPrefixText : 'Préfix id',
        idSuffixText : 'Suffix id',
        titleText : 'Défaut',
        areaText : 'Zone',
        categoryText : 'Catégor.',
        subjectText : 'Objet'
    });
    localize('Mobile.SalesLogix.Defect.List',{
        titleText : 'Défauts'
    });
    localize('Mobile.SalesLogix.DefectProblem.Detail',{
        createDateText : 'Date créa.',
        createUserText : 'Créé par',
        notesText : 'Notes',
        titleText : 'Problème de Défaut'
    });
    localize('Mobile.SalesLogix.DefectProblem.Edit',{
        notesText : 'Notes',
        titleText : 'Solution de Défaut'
    });
    localize('Mobile.SalesLogix.DefectSolution.Detail',{
        createDateText : 'Date créa.',
        createUserText : 'Créé par',
        notesText : 'Notes',
        titleText : 'Solution de Défaut'
    });
    localize('Mobile.SalesLogix.DefectSolution.Edit',{
        notesText : 'Notes',
        titleText : 'Solution de Défaut'
    });
    localize('Mobile.SalesLogix.History.Detail',{
        categoryText : 'Catégor.',
        completedText : 'Terminé',
        durationText : 'Durée',
        leaderText : 'Resp.',
        longNotesText : 'Notes',
        notesText : 'Notes',
        priorityText : 'Priorité',
        regardingText : 'Objet',
        scheduledText : 'Planifié',
        timelessText : 'Heure Indéfinie',
        companyText : 'Société',
        leadText : 'Lead',
        titleText : 'Historique',
        accountText : 'Compte',
        contactText : 'Contact',
        opportunityText : 'Opportunité',
        ticketNumberText : 'Ticket',
        moreDetailsText : 'Plus Détails',
        relatedItemsText : 'Élém. Assoc.',
        modifiedText : 'Modifié',
        typeText : 'Type',
        activityTypeText : {
            atToDo : 'Tâche à Faire',
            atPhoneCall : 'Appel',
            atAppointment : 'Rendez-vous',
            atLiterature : 'Demande de Documentation',
            atPersonal : 'Activité Personnelle',
            atQuestion : 'Question',
            atEMail : 'Envoyer par E-mail'
		},
        dateFormatText : 'd/M/yyyy H:mm:ss'
    });
    localize('Mobile.SalesLogix.History.Edit',{
        accountText : 'Compte',
        noteDescriptionTitleText : 'Description Note',
        contactText : 'Contact',
        longNotesText : 'Notes',
        longNotesTitleText : 'Notes',
        opportunityText : 'Opportunité',
        ticketNumberText : 'Ticket',
        regardingText : 'Objet',
        isLeadText : 'Pr lead',
        startingText : 'Heur',
        startingFormatText : 'd/M/yyyy H:mm',
        titleText : 'Note',
        companyText : 'Société',
        leadText : 'Lead',
        relatedItemsText : 'Élém. Assoc.'
    });
    localize('Mobile.SalesLogix.History.List',{
        activityTypeText : {
            atToDo : 'Tâche à Faire',
            atPhoneCall : 'Appel',
            atAppointment : 'Rendez-vous',
            atLiterature : 'Demande de Documentation',
            atPersonal : 'Activité Personnelle',
            atQuestion : 'Question',
            atEMail : 'Envoyer par E-mail'
		},
        hourMinuteFormatText : 'H:mm',
        dateFormatText : 'd/M/yy',
        hashTagQueriesText : {
            note : 'Note',
            phonecall : 'Appel tél',
            meeting : 'RDV',
            personal : 'Perso.',
            email : 'E-mail'
		},
        titleText : 'Notes/Historique'
    });
    localize('Mobile.SalesLogix.Lead.Detail',{
        activityTypeText : {
            atPhoneCall : 'Appel',
            atEMail : 'Envoyer par E-mail'
		},
        accountText : 'Société',
        addressText : 'Adresse',
        businessDescriptionText : 'Desc act',
        createDateText : 'Date créa.',
        createUserText : 'Créé par',
        eMailText : 'E-mail',
        leadSourceText : 'Source lead',
        industryText : 'Secteur',
        interestsText : 'Interêts',
        leadTitleText : 'Titre',
        nameText : 'Nom',
        notesText : 'Comm.',
        ownerText : 'Propr',
        relatedActivitiesText : 'Activités',
        relatedHistoriesText : 'Notes/Historique',
        relatedItemsText : 'Élém. Assoc.',
        relatedNotesText : 'Notes',
        sicCodeText : 'Code APE',
        titleText : 'Lead',
        tollFreeText : 'Num. vert',
        webText : 'Web',
        workText : 'Tél.',
        actionsText : 'Actions Rapides',
        callWorkNumberText : 'Appel num. princ',
        scheduleActivityText : 'Planifier activ.',
        addNoteText : 'Aj. note',
        sendEmailText : 'Env. email',
        viewAddressText : 'Aff. adresse',
        moreDetailsText : 'Plus Détails',
        calledText : 'Appelé {0}',
        emailedText : 'Email à {0}'
    });
    localize('Mobile.SalesLogix.Lead.Edit',{
        accountText : 'Compte',
        addressText : 'Adresse',
        businessText : 'Desc act',
        businessTitleText : 'Description de l"Activité Professionnelle',
        companyText : 'Société',
        contactTitleText : 'Titre',
        emailText : 'E-mail',
        faxText : 'Fax',
        importSourceText : 'Source lead',
        industryText : 'Secteur',
        industryTitleText : 'Secteur',
        interestsText : 'Interêts',
        leadNameLastFirstText : 'Nom',
        leadOwnerText : 'Propr',
        nameText : 'Nom',
        notesText : 'Comm.',
        notesTitleText : 'Commentaires',
        sicCodeText : 'Code APE',
        titleText : 'Lead',
        titleTitleText : 'Titre',
        tollFreeText : 'Num. vert',
        webText : 'Web',
        workText : 'Tél.'
    });
    localize('Mobile.SalesLogix.Lead.List',{
        titleText : 'Leads',
        activitiesText : 'Activités',
        notesText : 'Notes',
        scheduleText : 'Planification'
    });
    localize('Mobile.SalesLogix.LeadSource.List',{
        titleText : 'Sources des Leads'
    });
    localize('Mobile.SalesLogix.Opportunity.Detail',{
        accountText : 'Cmpt',
        acctMgrText : 'Resp cpt',
        estCloseText : 'Clôt est.',
        fbarHomeTitleText : 'Dom.',
        fbarScheduleTitleText : 'Plan.',
        importSourceText : 'Source lead',
        opportunityText : 'Opportunité',
        ownerText : 'Propr',
        actionsText : 'Actions Rapides',
        potentialText : 'Potentiel vente',
        probabilityText : 'Prob clôt.',
        relatedActivitiesText : 'Activités',
        relatedContactsText : 'Contacts',
        relatedHistoriesText : 'Notes/Historique',
        relatedItemsText : 'Élém. Assoc.',
        relatedNotesText : 'Notes',
        relatedProductsText : 'Produits',
        resellerText : 'Revend.',
        statusText : 'Etat',
        titleText : 'Opportunité',
        typeText : 'Type',
        scheduleActivityText : 'Planifier activ.',
        addNoteText : 'Aj. note',
        moreDetailsText : 'Plus Détails'
    });
    localize('Mobile.SalesLogix.Opportunity.Edit',{
        accountText : 'Cmpt',
        acctMgrText : 'Resp cpt',
        estCloseText : 'Clôt est.',
        importSourceText : 'Source lead',
        opportunityProbabilityTitleText : 'Proba de l"Opportunité',
        opportunityStatusTitleText : 'Etat de l"Opportunité',
        opportunityText : 'Opportunité',
        opportunityTypeTitleText : 'Type d"Opportunité',
        ownerText : 'Propr',
        potentialText : 'Potentiel vente',
        probabilityText : 'Prob clôt.',
        resellerText : 'Revend.',
        statusText : 'Etat',
        titleText : 'Opportunité',
        typeText : 'Type'
    });
    localize('Mobile.SalesLogix.Opportunity.List',{
        titleText : 'Opportunités',
        activitiesText : 'Activités',
        notesText : 'Notes',
        scheduleText : 'Planification',
        hashTagQueriesText : {
            open : 'Ouv.',
            closed : 'Clos',
            won : 'Gagné',
            lost : 'Perdu'
		}
    });
    localize('Mobile.SalesLogix.OpportunityProduct.List',{
        titleText : 'Produits'
    });
    localize('Mobile.SalesLogix.Owner.List',{
        titleText : 'Propriétaires'
    });
    localize('Mobile.SalesLogix.Return.Detail',{
        accountText : 'Compte',
        assignedToText : 'Affecté À',
        createDateText : 'Date créa.',
        createUserText : 'Créé par',
        fbarHomeTitleText : 'Dom.',
        fbarScheduleTitleText : 'Plan.',
        priorityText : 'Priorité',
        regDateText : 'Date enr',
        returnedByText : 'Retour par',
        returnIdText : 'Id retour',
        shipToText : 'Livr. à',
        titleText : 'Retour',
        typeText : 'Type'
    });
    localize('Mobile.SalesLogix.Return.Edit',{
        titleText : 'Retour',
        returnIdText : 'Id retour',
        priorityText : 'Priorité',
        typeText : 'Type',
        regDateText : 'Date enr',
        returnedByText : 'Retour par'
    });
    localize('Mobile.SalesLogix.Return.List',{
        titleText : 'Retours'
    });
    localize('Mobile.SalesLogix.SalesOrder.Detail',{
        accountText : 'Compte',
        acctMgrText : 'Resp cpt',
        commentsText : 'Comm.',
        createDateText : 'Date créa.',
        createUserText : 'Créé par',
        fbarHomeTitleText : 'Dom.',
        fbarScheduleTitleText : 'Plan.',
        reqDateText : 'Date dem',
        salesOrderIdText : 'Id bon comm.',
        statusText : 'Etat',
        titleText : 'Bon de Commande',
        totalText : 'Total',
        typeText : 'Type'
    });
    localize('Mobile.SalesLogix.SalesOrder.Edit',{
        commentsText : 'Comm.',
        reqDateText : 'Date dem',
        salesOrderIdText : 'Id bon comm.',
        statusText : 'Etat',
        titleText : 'Bon de Commande',
        totalText : 'Total',
        typeText : 'Type'
    });
    localize('Mobile.SalesLogix.SalesOrder.List',{
        titleText : 'Bon de Commande'
    });
    localize('Mobile.SalesLogix.Ticket.Detail',{
        accountText : 'Compte',
        areaText : 'Zone',
        assignedDateText : 'Date d"affect',
        assignedToText : 'Affecté à',
        categoryText : 'Catégor.',
        contactText : 'Contact',
        contractText : 'Contrat',
        descriptionText : 'Desc',
        issueText : 'Prob.',
        needByText : 'Echéance',
        notesText : 'Comm.',
        phoneText : 'Tél.',
        actionsText : 'Actions Rapides',
        relatedActivitiesText : 'Activités',
        relatedItemsText : 'Élém. Assoc.',
        resolutionText : 'Résolution',
        sourceText : 'Source',
        statusText : 'Etat',
        subjectText : 'Objet',
        ticketIdText : 'Num de ticket',
        titleText : 'Ticket',
        urgencyText : 'Prior.',
        scheduleActivityText : 'Planifier Activ.',
        moreDetailsText : 'Plus Détails'
    });
    localize('Mobile.SalesLogix.Ticket.Edit',{
        accountText : 'Cmpt',
        areaText : 'Zone',
        assignedDateText : 'Date d"affect',
        assignedToText : 'Affecté à',
        categoryText : 'Catégor.',
        contactText : 'Contact',
        contractText : 'Contrat',
        descriptionText : 'Desc',
        descriptionTitleText : 'Description',
        issueText : 'Prob.',
        needByText : 'Echéance',
        notesText : 'Comm.',
        notesTitleText : 'Commentaires',
        phoneText : 'Tél.',
        relatedActivitiesText : 'Activités',
        relatedItemsText : 'Élém. Assoc.',
        resolutionText : 'Résolution',
        resolutionTitleText : 'Résolution',
        sourceText : 'Source',
        sourceTitleText : 'Source',
        statusText : 'Etat',
        subjectText : 'Objet',
        ticketAreaTitleText : 'Zone de Ticket',
        ticketCategoryTitleText : 'Cat. Ticket',
        ticketIdText : 'Num de ticket',
        ticketIssueTitleText : 'Prob. Ticket',
        ticketStatusTitleText : 'Etat du Ticket',
        ticketUrgencyTitleText : 'Prior. Ticket',
        titleText : 'Ticket',
        urgencyText : 'Prior.'
    });
    localize('Mobile.SalesLogix.Ticket.List',{
        titleText : 'Tickets',
        activitiesText : 'Activités',
        scheduleText : 'Planification'
    });
    localize('Mobile.SalesLogix.Ticket.UrgencyLookup',{
        titleText : 'Prior. Ticket'
    });
    localize('Mobile.SalesLogix.User.List',{
        titleText : 'Utilisateurs'
    });
    localize('Sage.Platform.Mobile.Calendar',{
        validationSummaryText : 'Synthèse de Valid.',
        titleText : 'Agenda',
        amText : 'AM',
        pmText : 'PM',
        invalidHourErrorText : 'Form heure invalide',
        invalidMinuteErrorText : 'Form minute invalide'
    });
    localize('Sage.Platform.Mobile.Controls.AddressField',{
        lookupLabelText : 'Modif',
        emptyText : 'Aucune adr'
    });
    localize('Sage.Platform.Mobile.Controls.BooleanField',{
        onText : 'ON',
        offText : 'OFF'
    });
    localize('Sage.Platform.Mobile.Controls.DateField',{
        emptyText : '',
        dateFormatText : 'dd/MM/yyyy',
        invalidDateFormatErrorText : 'Format date champ "{0}" non valide.'
    });
    localize('Sage.Platform.Mobile.Controls.EditorField',{
        lookupLabelText : 'Modif',
        lookupText : '...',
        emptyText : 'Vide',
        completeText : 'OK'
    });
    localize('Sage.Platform.Mobile.Controls.LookupField',{
        dependentErrorText : 'Valeur doit être sélec. pour "{0}".',
        emptyText : '',
        completeText : 'Sélectionner',
        lookupLabelText : 'Rech.',
        lookupText : '...'
    });
    localize('Sage.Platform.Mobile.Controls.NameField',{
        emptyText : '0 nom'
    });
    localize('Sage.Platform.Mobile.Controls.NoteField',{
        emptyText : ''
    });
    localize('Sage.Platform.Mobile.Detail',{
        editText : 'Modifier',
        titleText : 'Détail',
        detailsText : 'Détails',
        toggleCollapseText : 'Afficher/cacher',
        loadingText : 'Chargement',
        requestErrorText : 'Erreur serveur survenue lors demande données.',
        notAvailableText : 'Entrée demandée non disponible.'
    });
    localize('Sage.Platform.Mobile.Edit',{
        saveText : 'Enregis.',
        titleText : 'Modifier',
        toggleCollapseText : 'Afficher/cacher',
        validationSummaryText : 'Synthèse de Valid.',
        detailsText : 'Détails',
        loadingText : 'Chargement',
        requestErrorText : 'Erreur serveur survenue lors demande données.'
    });
    localize('Sage.Platform.Mobile.GroupedList',{
        toggleCollapseText : 'Afficher/cacher'
    });
    localize('Sage.Platform.Mobile.List',{
        moreText : 'Récup. Plus d"Enreg.',
        emptySelectionText : 'Aucun',
        titleText : 'Liste',
        remainingText : '{0} enreg. restants',
        searchText : 'Rechercher',
        cancelText : 'Annuler',
        insertText : 'Nouveau',
        noDataText : '0 enreg.',
        loadingText : 'Chargement',
        requestErrorText : 'Erreur serveur survenue lors demande données.'
    });
    localize('Sage.Platform.Mobile.MainToolbar',{
        titleText : 'Mobile'
    });
    localize('Sage.Platform.Mobile.View',{
        titleText : 'Vue Normale'
    });
    
})();

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
        accountNameText : 'compte',
        accountStatusTitleText : 'État compte',
        accountSubTypeTitleText : 'SousType compte',
        accountText : 'Compte',
        accountTypeTitleText : 'Type de compte',
        addressText : 'adresse',
        contactTitleText : 'Titre',
        descriptionText : 'description',
        detailsAccountText : 'Infos compte',
        detailsContactText : 'Info contact',
        detailsText : 'Infos contact/compte',
        emailText : 'e-mail',
        faxText : 'fax',
        homePhoneText : 'Tél. dom.',
        industryText : 'secteur',
        lastNameText : 'fam.',
        mobileText : 'mobile',
        nameText : 'nom',
        statusText : 'état',
        subTypeText : 'ss-type',
        titleText : 'Ajout contact/compte',
        typeText : 'type',
        webText : 'web',
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
        addAccountContactText : 'Aj. contact/compte',
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
        addAccountContactText : 'Aj. contact/compte',
        titleText : 'Dom.',
        actionsText : 'Actions rapides',
        viewsText : 'Aller à'
    });
    localize('Mobile.SalesLogix.Login',{
        copyrightText : '© 2011 Sage Software, Inc. Tous droits réservés',
        logOnText : 'Connexion',
        passText : 'Mot pass',
        rememberText : 'mémo.',
        titleText : 'Sage SalesLogix',
        userText : 'nom util.',
        invalidUserText : 'Nom d’utilisateur/password non valide',
        missingUserText : 'Enregis. util. introuvable.',
        serverProblemText : 'Problème survenu sur le serveur.',
        requestAbortedText : 'Demande annulée.'
    });
    localize('Mobile.SalesLogix.NameEdit',{
        firstNameText : 'prén.',
        middleNameText : '2e pré',
        lastNameText : 'fam.',
        prefixText : 'préfix',
        prefixTitleText : 'Préfixe nom',
        suffixText : 'suffix',
        suffixTitleText : 'Suffixe nom'
    });
    localize('Mobile.SalesLogix.Settings',{
        clearLocalStorageTitleText : 'Effac. stock.',
        clearAuthenticationTitleText : 'Effac info ident enreg.',
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
        accountText : 'compte',
        acctMgrText : 'resp cpt',
        addressText : 'adresse',
        businessDescriptionText : 'desc act',
        createDateText : 'date créa.',
        createUserText : 'créé par',
        faxText : 'fax',
        importSourceText : 'source lead',
        industryText : 'secteur',
        notesText : 'notes',
        ownerText : 'propr',
        phoneText : 'Tél.',
        activityTypeText : {
            atPhoneCall : 'Appel'
		},
        actionsText : 'Actions rapides',
        relatedActivitiesText : 'Activités',
        relatedContactsText : 'Contacts',
        relatedHistoriesText : 'Notes/Historique',
        relatedItemsText : 'Élém. assoc.',
        relatedNotesText : 'Notes',
        relatedOpportunitiesText : 'Opportunités',
        relatedTicketsText : 'Tickets',
        statusText : 'état',
        subTypeText : 'ss-type',
        titleText : 'Compte',
        typeText : 'type',
        webText : 'web',
        callMainNumberText : 'Appel num. princ',
        scheduleActivityText : 'Planifier activ.',
        addNoteText : 'Aj. note',
        viewAddressText : 'Aff. adresse',
        moreDetailsText : 'Plus détails',
        calledText : 'Appelé {0}'
    });
    localize('Mobile.SalesLogix.Account.Edit',{
        accountStatusTitleText : 'État compte',
        accountSubTypeTitleText : 'Ss-type compte',
        accountText : 'compte',
        accountTypeTitleText : 'Type de compte',
        acctMgrText : 'resp cpt',
        businessDescriptionText : 'desc act',
        businessDescriptionTitleText : 'Description de l"activité professionnelle',
        descriptionText : 'desc',
        faxText : 'fax',
        fullAddressText : 'adresse',
        importSourceText : 'source lead',
        industryText : 'secteur',
        industryTitleText : 'Secteur',
        ownerText : 'propr',
        phoneText : 'Tél.',
        statusText : 'état',
        subTypeText : 'ss-type',
        titleText : 'Compte',
        typeText : 'type',
        webText : 'web'
    });
    localize('Mobile.SalesLogix.Account.List',{
        titleText : 'Comptes',
        activitiesText : 'Activités',
        notesText : 'Notes',
        scheduleText : 'Planification'
    });
    localize('Mobile.SalesLogix.Activity.Complete',{
        activityInfoText : 'Info activité',
        accountText : 'compte',
        contactText : 'contact',
        opportunityText : 'opportunité',
        ticketNumberText : 'ticket',
        companyText : 'société',
        leadText : 'lead',
        asScheduledText : 'comme plan.',
        categoryText : 'catégor.',
        categoryTitleText : 'Catégor. activité',
        completedText : 'date de réal.',
        completedFormatText : 'd/M/yyyy H:mm',
        completionText : 'Fin',
        durationText : 'durée',
        durationInvalidText : 'Champ "{2}" doit contenir une val.',
        carryOverNotesText : 'reporter notes',
        followUpText : 'suivi',
        followUpTitleText : 'Type de suivi',
        leaderText : 'resp.',
        longNotesText : 'notes',
        longNotesTitleText : 'Notes',
        otherInfoText : 'Plus infos',
        priorityText : 'priorité',
        priorityTitleText : 'Priorité',
        regardingText : 'objet',
        regardingTitleText : 'Objet activité',
        resultText : 'résult',
        resultTitleText : 'Résultat',
        startingText : 'date début',
        startingFormatText : 'd/M/yyyy H:mm',
        timelessText : 'Heure indéfinie',
        durationValueText : {
            0 : 'aucun',
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
            atToDo : 'Tâche à faire'
		}
    });
    localize('Mobile.SalesLogix.Activity.Detail',{
        activityTypeText : {
            atToDo : 'Tâche à faire',
            atPhoneCall : 'Appel',
            atAppointment : 'Rendez-vous',
            atLiterature : 'Demande de documentation',
            atPersonal : 'Activité personnelle'
		},
        actionsText : 'Actions rapides',
        completeActivityText : 'Terminer l"activité',
        alarmText : 'rappel',
        alarmTimeText : 'rappel',
        categoryText : 'catégor.',
        durationText : 'durée',
        leaderText : 'resp.',
        longNotesText : 'notes',
        priorityText : 'priorité',
        regardingText : 'objet',
        rolloverText : 'report auto.',
        startTimeText : 'heure déb.',
        allDayText : 'journée',
        timelessText : 'Heure indéfinie',
        titleText : 'Activité',
        typeText : 'type',
        companyText : 'société',
        leadText : 'lead',
        accountText : 'compte',
        contactText : 'contact',
        opportunityText : 'opportunité',
        ticketNumberText : 'ticket',
        whenText : 'Qd',
        whoText : 'Qui',
        startDateFormatText : 'd/M/yyyy H:mm:ss',
        timelessDateFormatText : 'd/M/yyyy',
        alarmDateFormatText : 'd/M/yyyy H:mm:ss'
    });
    localize('Mobile.SalesLogix.Activity.Edit',{
        activityCategoryTitleText : 'Catégor. activité',
        activityDescriptionTitleText : 'Description de l"activité',
        activityTypeTitleText : 'Type d"activité',
        alarmText : 'rappel',
        alarmTimeText : '',
        categoryText : 'catégor.',
        durationText : 'durée',
        durationTitleText : 'Durée',
        durationInvalidText : 'Champ "{2}" doit contenir une val.',
        reminderInvalidText : 'Champ "rappel" doit contenir une valeur',
        reminderTitleText : 'Rappel',
        leaderText : 'resp.',
        longNotesText : 'notes',
        longNotesTitleText : 'Notes',
        priorityText : 'priorité',
        priorityTitleText : 'Priorité',
        regardingText : 'objet',
        rolloverText : 'report auto.',
        startingText : 'heure déb.',
        startingFormatText : 'd/M/yyyy H:mm',
        timelessText : 'Heure indéfinie',
        titleText : 'Activité',
        typeText : 'type',
        accountText : 'compte',
        contactText : 'contact',
        opportunityText : 'opportunité',
        ticketNumberText : 'ticket',
        companyText : 'société',
        leadText : 'lead',
        isLeadText : 'pr lead',
        yesText : 'OUI',
        noText : 'NON',
        updateUserActErrorText : 'Erreur survenue lors de la MàJ acti. util.',
        reminderValueText : {
            0 : 'aucun',
            5 : '5 minutes',
            15 : '15 minutes',
            30 : '30 minutes',
            60 : '1 heure',
            1440 : '1 jour'
		},
        durationValueText : {
            0 : 'aucun',
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
            atToDo : 'Tâche à faire',
            atPhoneCall : 'Appel',
            atAppointment : 'Rendez-vous',
            atLiterature : 'Demande de documentation',
            atPersonal : 'Activité personnelle'
		}
    });
    localize('Mobile.SalesLogix.Address.Edit',{
        address1Text : 'adresse 1',
        address2Text : 'adresse 2',
        address3Text : 'adresse 3',
        cityText : 'ville',
        cityTitleText : 'Ville',
        countryText : 'pays',
        countryTitleText : 'Pays',
        descriptionText : 'description',
        descriptionTitleText : 'Description',
        isMailingText : 'expédi.',
        isPrimaryText : 'primair',
        postalCodeText : 'CP',
        salutationText : 'attention',
        stateText : 'dépt',
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
        dayStartTimeFormatText : 'H:mm',
        allDayText : 'Journée'
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
        acctMgrText : 'resp cpt',
        codeText : 'code',
        createDateText : 'date créa.',
        createUserText : 'créé par',
        fbarHomeTitleText : 'dom.',
        fbarScheduleTitleText : 'plan.',
        nameText : 'nom',
        startText : 'comm.',
        titleText : 'Campagne'
    });
    localize('Mobile.SalesLogix.Campaign.Edit',{
        codeText : 'code',
        nameText : 'nom',
        startText : 'comm.',
        titleText : 'Campagne'
    });
    localize('Mobile.SalesLogix.Campaign.List',{
        titleText : 'Campagnes'
    });
    localize('Mobile.SalesLogix.Contact.Detail',{
        activityTypeText : {
            atPhoneCall : 'Appel',
            atEMail : 'Envoyer par e-mail'
		},
        accountText : 'compte',
        acctMgrText : 'resp cpt',
        addressText : 'adresse',
        contactTitleText : 'titre',
        createDateText : 'date créa.',
        createUserText : 'créé par',
        emailText : 'e-mail',
        faxText : 'fax',
        homeText : 'Tél. dom.',
        nameText : 'contact',
        ownerText : 'propr',
        actionsText : 'Actions rapides',
        relatedAccountsText : 'Comptes',
        relatedActivitiesText : 'Activités',
        relatedHistoriesText : 'Notes/Historique',
        relatedItemsText : 'Élém. assoc.',
        relatedNotesText : 'Notes',
        relatedOpportunitiesText : 'Opportunités',
        relatedTicketsText : 'Tickets',
        titleText : 'Contact',
        webText : 'web',
        workText : 'Tél.',
        callMobileNumberText : 'Appel port.',
        callWorkNumberText : 'Appel num. princ',
        scheduleActivityText : 'Planifier activ.',
        addNoteText : 'Aj. note',
        sendEmailText : 'Env. email',
        viewAddressText : 'Aff. adresse',
        moreDetailsText : 'Plus détails'
    });
    localize('Mobile.SalesLogix.Contact.Edit',{
        titleText : 'Contact',
        nameText : 'nom',
        workText : 'Tél.',
        mobileText : 'mobile',
        emailText : 'e-mail',
        webText : 'web',
        acctMgrText : 'resp cpt',
        accountNameText : 'compte',
        homePhoneText : 'Tél. dom.',
        faxText : 'fax',
        addressText : 'adresse',
        contactTitleText : 'titre',
        titleTitleText : 'Titre',
        addressTitleText : 'Adresse',
        ownerText : 'propr'
    });
    localize('Mobile.SalesLogix.Contact.List',{
        titleText : 'Contacts',
        activitiesText : 'Activités',
        notesText : 'Notes',
        scheduleText : 'Planification'
    });
    localize('Mobile.SalesLogix.Contract.Detail',{
        accountText : 'compte',
        activeText : 'actif',
        contactText : 'contact',
        contractTypeText : 'TypeContrat',
        createDateText : 'date créa.',
        createUserText : 'créé par',
        endText : 'fin',
        fbarHomeTitleText : 'dom.',
        fbarScheduleTitleText : 'plan.',
        quantityText : 'quantité',
        refNumText : 'Numref',
        relatedItemsText : 'Élém. assoc.',
        relatedTicketsText : 'Tickets',
        remainingText : 'restant',
        startText : 'comm.',
        svcTypeText : 'Type svc',
        titleText : 'Contrat'
    });
    localize('Mobile.SalesLogix.Contract.Edit',{
        titleText : 'Contrat',
        refNumText : 'Numref',
        quantityText : 'quantité',
        activeText : 'actif'
    });
    localize('Mobile.SalesLogix.Contract.List',{
        titleText : 'Contrats'
    });
    localize('Mobile.SalesLogix.Defect.Detail',{
        areaText : 'zone',
        assignedText : 'affecté',
        categoryText : 'catégor.',
        createDateText : 'date créa.',
        createUserText : 'créé par',
        defectIdText : 'id défaut',
        fbarHomeTitleText : 'dom.',
        fbarNewTitleText : 'nv.',
        fbarScheduleTitleText : 'plan.',
        moreText : 'plus >>',
        priorityText : 'priorité',
        relatedDefectProblemsText : 'Problème',
        relatedDefectSolutionsText : 'Solution',
        relatedItemsText : 'Élém. assoc.',
        reportDateText : 'date rapp.',
        severityText : 'gravité',
        statusText : 'état',
        subjectText : 'objet',
        titleText : 'Défaut'
    });
    localize('Mobile.SalesLogix.Defect.Edit',{
        idPrefixText : 'préfix id',
        idSuffixText : 'suffix id',
        titleText : 'Défaut',
        areaText : 'zone',
        categoryText : 'catégor.',
        subjectText : 'objet'
    });
    localize('Mobile.SalesLogix.Defect.List',{
        titleText : 'Défauts'
    });
    localize('Mobile.SalesLogix.DefectProblem.Detail',{
        createDateText : 'date créa.',
        createUserText : 'créé par',
        notesText : 'notes',
        titleText : 'Problème de défaut'
    });
    localize('Mobile.SalesLogix.DefectProblem.Edit',{
        notesText : 'notes',
        titleText : 'Solution de défaut'
    });
    localize('Mobile.SalesLogix.DefectSolution.Detail',{
        createDateText : 'date créa.',
        createUserText : 'créé par',
        notesText : 'notes',
        titleText : 'Solution de défaut'
    });
    localize('Mobile.SalesLogix.DefectSolution.Edit',{
        notesText : 'notes',
        titleText : 'Solution de défaut'
    });
    localize('Mobile.SalesLogix.History.Detail',{
        categoryText : 'catégor.',
        completedText : 'terminé',
        durationText : 'durée',
        leaderText : 'resp.',
        longNotesText : 'notes',
        notesText : 'Notes',
        priorityText : 'priorité',
        regardingText : 'objet',
        scheduledText : 'planifié',
        timelessText : 'Heure indéfinie',
        companyText : 'société',
        leadText : 'lead',
        titleText : 'Historique',
        accountText : 'compte',
        contactText : 'contact',
        opportunityText : 'opportunité',
        ticketNumberText : 'ticket',
        moreDetailsText : 'Plus détails',
        relatedItemsText : 'Élém. assoc.',
        modifiedText : 'modifié',
        typeText : 'type',
        activityTypeText : {
            atToDo : 'Tâche à faire',
            atPhoneCall : 'Appel',
            atAppointment : 'Rendez-vous',
            atLiterature : 'Demande de documentation',
            atPersonal : 'Activité personnelle',
            atQuestion : 'Question',
            atEMail : 'Envoyer par e-mail'
		},
        dateFormatText : 'd/M/yyyy H:mm:ss'
    });
    localize('Mobile.SalesLogix.History.Edit',{
        accountText : 'compte',
        noteDescriptionTitleText : 'Description note',
        contactText : 'contact',
        longNotesText : 'notes',
        longNotesTitleText : 'Notes',
        opportunityText : 'opportunité',
        ticketNumberText : 'ticket',
        regardingText : 'objet',
        isLeadText : 'pr lead',
        startingText : 'heur',
        startingFormatText : 'd/M/yyyy H:mm',
        titleText : 'Note',
        companyText : 'société',
        leadText : 'lead',
        relatedItemsText : 'Élém. assoc.'
    });
    localize('Mobile.SalesLogix.History.List',{
        activityTypeText : {
            atToDo : 'Tâche à faire',
            atPhoneCall : 'Appel',
            atAppointment : 'Rendez-vous',
            atLiterature : 'Demande de documentation',
            atPersonal : 'Activité personnelle',
            atQuestion : 'Question',
            atEMail : 'Envoyer par e-mail'
		},
        hourMinuteFormatText : 'H:mm',
        dateFormatText : 'd/M/yy',
        hashTagQueriesText : {
            note : 'note',
            phonecall : 'appel tél',
            meeting : 'RDV',
            personal : 'perso.',
            email : 'e-mail'
		},
        titleText : 'Notes/Historique'
    });
    localize('Mobile.SalesLogix.Lead.Detail',{
        activityTypeText : {
            atPhoneCall : 'Appel',
            atEMail : 'Envoyer par e-mail'
		},
        accountText : 'société',
        addressText : 'adresse',
        businessDescriptionText : 'desc act',
        createDateText : 'date créa.',
        createUserText : 'créé par',
        eMailText : 'e-mail',
        leadSourceText : 'source lead',
        industryText : 'secteur',
        interestsText : 'interêts',
        leadTitleText : 'titre',
        nameText : 'nom',
        notesText : 'comm.',
        ownerText : 'propr',
        relatedActivitiesText : 'Activités',
        relatedHistoriesText : 'Notes/Historique',
        relatedItemsText : 'Élém. assoc.',
        relatedNotesText : 'Notes',
        sicCodeText : 'Code APE',
        titleText : 'Lead',
        tollFreeText : 'num. vert',
        webText : 'web',
        workText : 'Tél.',
        actionsText : 'Actions rapides',
        callWorkNumberText : 'Appel num. princ',
        scheduleActivityText : 'Planifier activ.',
        addNoteText : 'Aj. note',
        sendEmailText : 'Env. email',
        viewAddressText : 'Aff. adresse',
        moreDetailsText : 'Plus détails',
        calledText : 'Appelé {0}',
        emailedText : 'Email à {0}'
    });
    localize('Mobile.SalesLogix.Lead.Edit',{
        accountText : 'compte',
        addressText : 'adresse',
        businessText : 'desc act',
        businessTitleText : 'Description de l"activité professionnelle',
        companyText : 'société',
        contactTitleText : 'titre',
        emailText : 'e-mail',
        faxText : 'fax',
        importSourceText : 'source lead',
        industryText : 'secteur',
        industryTitleText : 'Secteur',
        interestsText : 'interêts',
        leadNameLastFirstText : 'nom',
        leadOwnerText : 'propr',
        nameText : 'nom',
        notesText : 'comm.',
        notesTitleText : 'Commentaires',
        sicCodeText : 'Code APE',
        titleText : 'Lead',
        titleTitleText : 'Titre',
        tollFreeText : 'num. vert',
        webText : 'web',
        workText : 'Tél.'
    });
    localize('Mobile.SalesLogix.Lead.List',{
        titleText : 'Leads',
        activitiesText : 'Activités',
        notesText : 'Notes',
        scheduleText : 'Planification'
    });
    localize('Mobile.SalesLogix.LeadSource.List',{
        titleText : 'Sources des leads'
    });
    localize('Mobile.SalesLogix.Opportunity.Detail',{
        accountText : 'cmpt',
        acctMgrText : 'resp cpt',
        estCloseText : 'clôt est.',
        fbarHomeTitleText : 'dom.',
        fbarScheduleTitleText : 'plan.',
        importSourceText : 'source lead',
        opportunityText : 'opportunité',
        ownerText : 'propr',
        actionsText : 'Actions rapides',
        potentialText : 'potentiel vente',
        probabilityText : 'prob clôt.',
        relatedActivitiesText : 'Activités',
        relatedContactsText : 'Contacts',
        relatedHistoriesText : 'Notes/Historique',
        relatedItemsText : 'Élém. assoc.',
        relatedNotesText : 'Notes',
        relatedProductsText : 'Produits',
        resellerText : 'revend.',
        statusText : 'état',
        titleText : 'Opportunité',
        typeText : 'type',
        scheduleActivityText : 'Planifier activ.',
        addNoteText : 'Aj. note',
        moreDetailsText : 'Plus détails'
    });
    localize('Mobile.SalesLogix.Opportunity.Edit',{
        accountText : 'cmpt',
        acctMgrText : 'resp cpt',
        estCloseText : 'clôt est.',
        importSourceText : 'source lead',
        opportunityProbabilityTitleText : 'Proba de l"opportunité',
        opportunityStatusTitleText : 'Etat de l"opportunité',
        opportunityText : 'opportunité',
        opportunityTypeTitleText : 'Type d"opportunité',
        ownerText : 'propr',
        potentialText : 'potentiel vente',
        probabilityText : 'prob clôt.',
        resellerText : 'revend.',
        statusText : 'état',
        titleText : 'Opportunité',
        typeText : 'type'
    });
    localize('Mobile.SalesLogix.Opportunity.List',{
        titleText : 'Opportunités',
        activitiesText : 'Activités',
        notesText : 'Notes',
        scheduleText : 'Planification',
        hashTagQueriesText : {
            open : 'ouv.',
            closed : 'clos',
            won : 'gagné',
            lost : 'perdu'
		}
    });
    localize('Mobile.SalesLogix.OpportunityProduct.List',{
        titleText : 'Produits'
    });
    localize('Mobile.SalesLogix.Owner.List',{
        titleText : 'Propriétaires'
    });
    localize('Mobile.SalesLogix.Return.Detail',{
        accountText : 'compte',
        assignedToText : 'Affecté à',
        createDateText : 'date créa.',
        createUserText : 'créé par',
        fbarHomeTitleText : 'dom.',
        fbarScheduleTitleText : 'plan.',
        priorityText : 'priorité',
        regDateText : 'date enr',
        returnedByText : 'retour par',
        returnIdText : 'id retour',
        shipToText : 'livr. à',
        titleText : 'Retour',
        typeText : 'type'
    });
    localize('Mobile.SalesLogix.Return.Edit',{
        titleText : 'Retour',
        returnIdText : 'id retour',
        priorityText : 'priorité',
        typeText : 'type',
        regDateText : 'date enr',
        returnedByText : 'retour par'
    });
    localize('Mobile.SalesLogix.Return.List',{
        titleText : 'Retours'
    });
    localize('Mobile.SalesLogix.SalesOrder.Detail',{
        accountText : 'compte',
        acctMgrText : 'resp cpt',
        commentsText : 'comm.',
        createDateText : 'date créa.',
        createUserText : 'créé par',
        fbarHomeTitleText : 'dom.',
        fbarScheduleTitleText : 'plan.',
        reqDateText : 'date dem',
        salesOrderIdText : 'id bon comm.',
        statusText : 'état',
        titleText : 'Bon de commande',
        totalText : 'total',
        typeText : 'type'
    });
    localize('Mobile.SalesLogix.SalesOrder.Edit',{
        commentsText : 'comm.',
        reqDateText : 'date dem',
        salesOrderIdText : 'id bon comm.',
        statusText : 'état',
        titleText : 'Bon de commande',
        totalText : 'total',
        typeText : 'type'
    });
    localize('Mobile.SalesLogix.SalesOrder.List',{
        titleText : 'Bon de commande'
    });
    localize('Mobile.SalesLogix.Ticket.Detail',{
        accountText : 'compte',
        areaText : 'zone',
        assignedDateText : 'date d"affect',
        assignedToText : 'affecté à',
        categoryText : 'catégor.',
        contactText : 'contact',
        contractText : 'contrat',
        descriptionText : 'desc',
        issueText : 'prob.',
        needByText : 'échéance',
        notesText : 'comm.',
        phoneText : 'Tél.',
        actionsText : 'Actions rapides',
        relatedActivitiesText : 'Activités',
        relatedItemsText : 'Élém. assoc.',
        resolutionText : 'résolution',
        sourceText : 'source',
        statusText : 'état',
        subjectText : 'objet',
        ticketIdText : 'num de ticket',
        titleText : 'Ticket',
        urgencyText : 'prior.',
        scheduleActivityText : 'Planifier activ.',
        moreDetailsText : 'Plus détails'
    });
    localize('Mobile.SalesLogix.Ticket.Edit',{
        accountText : 'cmpt',
        areaText : 'zone',
        assignedDateText : 'date d"affect',
        assignedToText : 'affecté à',
        categoryText : 'catégor.',
        contactText : 'contact',
        contractText : 'contrat',
        descriptionText : 'desc',
        descriptionTitleText : 'Description',
        issueText : 'prob.',
        needByText : 'échéance',
        notesText : 'comm.',
        notesTitleText : 'Commentaires',
        phoneText : 'Tél.',
        relatedActivitiesText : 'Activités',
        relatedItemsText : 'Élém. assoc.',
        resolutionText : 'résolution',
        resolutionTitleText : 'Résolution',
        sourceText : 'source',
        sourceTitleText : 'Source',
        statusText : 'état',
        subjectText : 'objet',
        ticketAreaTitleText : 'Zone de ticket',
        ticketCategoryTitleText : 'Cat. ticket',
        ticketIdText : 'num de ticket',
        ticketIssueTitleText : 'Prob. ticket',
        ticketStatusTitleText : 'Etat du ticket',
        ticketUrgencyTitleText : 'Prior. ticket',
        titleText : 'Ticket',
        urgencyText : 'prior.'
    });
    localize('Mobile.SalesLogix.Ticket.List',{
        titleText : 'Tickets',
        activitiesText : 'Activités',
        scheduleText : 'Planification'
    });
    localize('Mobile.SalesLogix.Ticket.UrgencyLookup',{
        titleText : 'Prior. ticket'
    });
    localize('Mobile.SalesLogix.User.List',{
        titleText : 'Utilisateurs'
    });
    localize('Sage.Platform.Mobile.Calendar',{
        validationSummaryText : 'Synthèse de valid.',
        titleText : 'Agenda',
        amText : 'AM',
        pmText : 'PM',
        invalidHourErrorText : 'Form heure invalide',
        invalidMinuteErrorText : 'Form minute invalide'
    });
    localize('Sage.Platform.Mobile.Controls.AddressField',{
        lookupLabelText : 'modif',
        emptyText : 'aucune adr'
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
        lookupLabelText : 'modif',
        lookupText : '...',
        emptyText : 'vide',
        completeText : 'OK'
    });
    localize('Sage.Platform.Mobile.Controls.LookupField',{
        dependentErrorText : 'Valeur doit être sélec. pour "{0}".',
        emptyText : '',
        completeText : 'Sélectionner',
        lookupLabelText : 'rech.',
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
        loadingText : 'chargement',
        requestErrorText : 'Erreur serveur survenue lors demande données.',
        notAvailableText : 'Entrée demandée non disponible.'
    });
    localize('Sage.Platform.Mobile.Edit',{
        saveText : 'Enregis.',
        titleText : 'Modifier',
        toggleCollapseText : 'Afficher/cacher',
        validationSummaryText : 'Synthèse de valid.',
        detailsText : 'Détails',
        loadingText : 'chargement',
        requestErrorText : 'Erreur serveur survenue lors demande données.'
    });
    localize('Sage.Platform.Mobile.GroupedList',{
        toggleCollapseText : 'Afficher/cacher'
    });
    localize('Sage.Platform.Mobile.List',{
        moreText : 'Récup. plus d"enreg.',
        emptySelectionText : 'Aucun',
        titleText : 'Liste',
        remainingText : '{0} enreg. restants',
        searchText : 'Rechercher',
        cancelText : 'Annuler',
        insertText : 'Nouveau',
        noDataText : '0 enreg.',
        loadingText : 'chargement',
        requestErrorText : 'Erreur serveur survenue lors demande données.'
    });
    localize('Sage.Platform.Mobile.MainToolbar',{
        titleText : 'Mobile'
    });
    localize('Sage.Platform.Mobile.View',{
        titleText : 'Vue normale'
    });
    
})();

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
            message : 'Il campo "{2}" deve avere valore.'
		},
        name : {
            message : 'Il campo "{2}" deve avere un nome e cognome specificati.'
		},
        notEmpty : {
            message : 'Campo "{2}" deve essere pieno.'
		},
        hasText : {
            message : 'Il campo "{2}" deve contenere testo.'
		},
        isInteger : {
            message : 'Non è un numero  valido "{0}".'
		},
        isDecimal : {
            message : 'Non è un numero  valido "{0}".'
		},
        isCurrency : {
            message : '"{0}" non è una valuta valida.'
		},
        isInt32 : {
            message : 'Il campo "{2}" eccede l"intervallo numerico ammesso.'
		},
        exceedsMaxTextLength : {
            message : 'Il campo "{2}" eccede la lunghezza massima ammessa.'
		},
        isDateInRange : {
            message : 'Il campo "{2}" eccede l"intervallo di date ammesso.'
		}
    });
    localize('Mobile.SalesLogix.AddAccountContact',{
        accountNameText : 'azienda',
        accountStatusTitleText : 'Status azienda',
        accountSubTypeTitleText : 'SubCat. Azienda',
        accountText : 'Azienda',
        accountTypeTitleText : 'Tipo Azienda',
        addressText : ' Indi. ',
        contactTitleText : 'Titolo',
        descriptionText : 'descrizione',
        detailsAccountText : 'Info Azienda',
        detailsContactText : 'InfoContatto',
        detailsText : 'InfoContatto/Azienda',
        emailText : 'email',
        faxText : 'fax',
        homePhoneText : 'Tel. fisso',
        industryText : ' settore',
        lastNameText : 'cogn',
        mobileText : 'cell. ',
        nameText : 'nome',
        statusText : 'status',
        subTypeText : 'sub-cat.',
        titleText : 'Agg.Account / Contact',
        typeText : 'tipo',
        webText : 'web',
        workText : 'TelUfficio',
        industryTitleText : 'Settore'
    });
    localize('Mobile.SalesLogix.AreaCategoryIssueLookup',{
        titleText : 'Aziende'
    });
    localize('Mobile.SalesLogix.Configure',{
        titleText : 'Config. ',
        savePrefsText : 'Salva'
    });
    localize('Mobile.SalesLogix.ContextDialog',{
        activitiesText : 'Attività',
        addAccountContactText : 'Agg.Account/Contact',
        cancelText : 'Annulla',
        notesText : 'Nota',
        scheduleText : 'Pianifica'
    });
    localize('Mobile.SalesLogix.FooterToolbar',{
        copyrightText : '© 2011 Sage Software, Inc. Diritti riservati.',
        logOutConfirmText : 'Sei sicuro di voler uscire?',
        settingsText : 'Opzioni',
        helpText : 'Aiuto',
        topText : 'Su',
        logOutText : 'Uscita'
    });
    localize('Mobile.SalesLogix.Help',{
        titleText : 'Aiuto',
        errorText : 'Errore',
        errorMessageText : 'Documento di Help non caricato'
    });
    localize('Mobile.SalesLogix.Home',{
        configureText : 'Config.',
        addAccountContactText : 'Agg.Account/Contact',
        titleText : 'Home',
        actionsText : 'Azioni rapide',
        viewsText : 'VaiA'
    });
    localize('Mobile.SalesLogix.Login',{
        copyrightText : '© 2011 Sage Software, Inc. Diritti riservati.',
        logOnText : 'Connetti',
        passText : 'password',
        rememberText : 'ricorda',
        titleText : 'Sage SalesLogix',
        userText : 'Nome',
        invalidUserText : 'Nome o password errati',
        missingUserText : 'Utente non trovato.',
        serverProblemText : 'Errore sul server.',
        requestAbortedText : 'Richiesta interrotta'
    });
    localize('Mobile.SalesLogix.NameEdit',{
        firstNameText : 'nome',
        middleNameText : '2°nome',
        lastNameText : 'cogn',
        prefixText : 'pref.',
        prefixTitleText : 'Titolo',
        suffixText : 'suff.',
        suffixTitleText : 'Titoli est.'
    });
    localize('Mobile.SalesLogix.Settings',{
        clearLocalStorageTitleText : 'Canc. Memoria',
        clearAuthenticationTitleText : 'Canc. Credenz. Salvate',
        localStorageClearedText : 'Memoria locale svuotatata',
        credentialsClearedText : 'Credenziali salvate eliminate',
        titleText : 'Opzioni'
    });
    localize('Mobile.SalesLogix.TextEdit',{
        titleText : 'Testo'
    });
    localize('Mobile.SalesLogix.UpdateToolbar',{
        updateText : 'Clicca per effettuare l"aggiornamento'
    });
    localize('Mobile.SalesLogix.Account.Detail',{
        accountText : 'azienda',
        acctMgrText : 'resp.',
        addressText : 'Indi.',
        businessDescriptionText : 'desc.att.',
        createDateText : 'creato il',
        createUserText : 'creato da',
        faxText : 'fax',
        importSourceText : 'Fonte Nom.',
        industryText : 'settore',
        notesText : 'note',
        ownerText : 'prop.',
        phoneText : 'tel.',
        activityTypeText : {
            atPhoneCall : 'Telefonata'
		},
        actionsText : 'Azioni rapide',
        relatedActivitiesText : 'Attività',
        relatedContactsText : 'Contatti',
        relatedHistoriesText : 'Note/Cronologia',
        relatedItemsText : 'VociCorrelate',
        relatedNotesText : 'Nota',
        relatedOpportunitiesText : 'Opportunità',
        relatedTicketsText : 'Ticket',
        statusText : 'status',
        subTypeText : 'cat.',
        titleText : 'Azienda',
        typeText : 'tipo',
        webText : 'web',
        callMainNumberText : 'Tel. num. princ.',
        scheduleActivityText : 'PianificaAttività',
        addNoteText : 'Agg.nota',
        viewAddressText : 'Vedi Ind.',
        moreDetailsText : 'Più Dettagli',
        calledText : 'Tel. {0}'
    });
    localize('Mobile.SalesLogix.Account.Edit',{
        accountStatusTitleText : 'Status azienda',
        accountSubTypeTitleText : 'Account SubCat.',
        accountText : 'azienda',
        accountTypeTitleText : 'Tipo Azienda',
        acctMgrText : 'resp.',
        businessDescriptionText : 'desc.att.',
        businessDescriptionTitleText : 'Descrizione Attività',
        descriptionText : 'desc',
        faxText : 'fax',
        fullAddressText : 'Indi.',
        importSourceText : 'Fonte Nom.',
        industryText : 'settore',
        industryTitleText : 'Settore',
        ownerText : 'prop.',
        phoneText : 'tel.',
        statusText : 'status',
        subTypeText : 'cat.',
        titleText : 'Azienda',
        typeText : 'tipo',
        webText : 'web'
    });
    localize('Mobile.SalesLogix.Account.List',{
        titleText : 'Aziende',
        activitiesText : 'Attività',
        notesText : 'Nota',
        scheduleText : 'Pianifica'
    });
    localize('Mobile.SalesLogix.Activity.Complete',{
        activityInfoText : 'Info Attività',
        accountText : 'azienda',
        contactText : 'cont.',
        opportunityText : 'opportunità',
        ticketNumberText : 'ticket',
        companyText : 'società',
        leadText : 'nom.',
        asScheduledText : 'come prog.',
        categoryText : 'cat.',
        categoryTitleText : 'Cat. Attività',
        completedText : 'completato il',
        completedFormatText : 'd/M/yyyy H:mm',
        completionText : 'Completata',
        durationText : 'durata',
        durationInvalidText : 'Il campo "{2}" deve avere valore.',
        carryOverNotesText : 'riporta note',
        followUpText : 'seguito',
        followUpTitleText : 'Tipo seguito',
        leaderText : 'leader',
        longNotesText : 'note',
        longNotesTitleText : 'Nota',
        otherInfoText : 'Altro',
        priorityText : 'priorità',
        priorityTitleText : 'Priorità',
        regardingText : 'argomento',
        regardingTitleText : 'Attività Argomento',
        resultText : 'esito',
        resultTitleText : 'Risultato',
        startingText : 'data iniz.',
        startingFormatText : 'd/M/yyyy H:mm',
        timelessText : 'Senza orario',
        durationValueText : {
            0 : 'Nessuno',
            15 : '15 minuti',
            30 : '30 minuti',
            60 : '1 Ora',
            90 : '1,5 ore',
            120 : '2 ore'
		},
        followupValueText : {
            none : 'Nessuno',
            atPhoneCall : 'Telefonata',
            atAppointment : 'Riunione',
            atToDo : 'Impegno'
		}
    });
    localize('Mobile.SalesLogix.Activity.Detail',{
        activityTypeText : {
            atToDo : 'Impegno',
            atPhoneCall : 'Telefonata',
            atAppointment : 'Riunione',
            atLiterature : 'Richiesta materiale informativo',
            atPersonal : 'Attività personale'
		},
        actionsText : 'Azioni rapide',
        completeActivityText : 'Completa attività',
        alarmText : 'avviso',
        alarmTimeText : 'avviso',
        categoryText : 'cat.',
        durationText : 'durata',
        leaderText : 'leader',
        longNotesText : 'note',
        priorityText : 'priorità',
        regardingText : 'argomento',
        rolloverText : 'rinvio autom.',
        startTimeText : 'ora iniz.',
        allDayText : '1g int',
        timelessText : 'Senza orario',
        titleText : 'Attività',
        typeText : 'tipo',
        companyText : 'società',
        leadText : 'nom.',
        accountText : 'azienda',
        contactText : 'cont.',
        opportunityText : 'opportunità',
        ticketNumberText : 'ticket',
        whenText : 'Data',
        whoText : 'Chi',
        startDateFormatText : 'd/M/yyyy H:mm:ss',
        timelessDateFormatText : 'd/M/yyyy',
        alarmDateFormatText : 'd/M/yyyy H:mm:ss'
    });
    localize('Mobile.SalesLogix.Activity.Edit',{
        activityCategoryTitleText : 'Cat. Attività',
        activityDescriptionTitleText : 'Descrizione Attività',
        activityTypeTitleText : 'Tipo di attività',
        alarmText : 'avviso',
        alarmTimeText : '',
        categoryText : 'cat.',
        durationText : 'durata',
        durationTitleText : 'Durata',
        durationInvalidText : 'Il campo "{2}" deve avere valore.',
        reminderInvalidText : 'Il "promemoria" deve avere un valore.',
        reminderTitleText : 'Promem.',
        leaderText : 'leader',
        longNotesText : 'note',
        longNotesTitleText : 'Nota',
        priorityText : 'priorità',
        priorityTitleText : 'Priorità',
        regardingText : 'argomento',
        rolloverText : 'rinvio autom.',
        startingText : 'ora iniz.',
        startingFormatText : 'd/M/yyyy H:mm',
        timelessText : 'Senza orario',
        titleText : 'Attività',
        typeText : 'tipo',
        accountText : 'azienda',
        contactText : 'cont.',
        opportunityText : 'opportunità',
        ticketNumberText : 'ticket',
        companyText : 'società',
        leadText : 'nom.',
        isLeadText : 'per nom.',
        yesText : 'SI',
        noText : 'NO',
        updateUserActErrorText : 'Errore aggiornamento attività utente',
        reminderValueText : {
            0 : 'Nessuno',
            5 : '5 minuti',
            15 : '15 minuti',
            30 : '30 minuti',
            60 : '1 Ora',
            1440 : '1 giorno'
		},
        durationValueText : {
            0 : 'Nessuno',
            15 : '15 minuti',
            30 : '30 minuti',
            60 : '1 Ora',
            90 : '1,5 ore',
            120 : '2 ore'
		}
    });
    localize('Mobile.SalesLogix.Activity.List',{
        startDateFormatText : 'ddd d/M/yy',
        startTimeFormatText : 'H:mm',
        titleText : 'Attività'
    });
    localize('Mobile.SalesLogix.Activity.TypesList',{
        titleText : 'Pianifica...',
        activityTypeText : {
            atToDo : 'Impegno',
            atPhoneCall : 'Telefonata',
            atAppointment : 'Riunione',
            atLiterature : 'Richiesta materiale informativo',
            atPersonal : 'Attività personale'
		}
    });
    localize('Mobile.SalesLogix.Address.Edit',{
        address1Text : 'ind. 1',
        address2Text : 'ind. 2',
        address3Text : 'ind. 3',
        cityText : 'città',
        cityTitleText : 'Città',
        countryText : 'nazione',
        countryTitleText : 'Nazione',
        descriptionText : 'descrizione',
        descriptionTitleText : 'Descrizione',
        isMailingText : 'sped.',
        isPrimaryText : 'princ.',
        postalCodeText : 'post.',
        salutationText : 'att.',
        stateText : 'stato',
        stateTitleText : 'Provincia',
        titleText : 'Indirizzo'
    });
    localize('Mobile.SalesLogix.Calendar.MonthView',{
        titleText : 'Calendario',
        todayText : 'Oggi',
        dayText : 'Giorno',
        weekText : 'Set.',
        monthText : 'Mese',
        monthTitleFormatText : 'MMMM yyyy',
        dayTitleFormatText : 'ddd d MMM, yyyy',
        dayStartTimeFormatText : 'H:mm',
        allDayText : 'Giorno'
    });
    localize('Mobile.SalesLogix.Calendar.UserActivityList',{
        titleText : 'Calendario',
        dateHeaderFormatText : 'dddd, dd/MM/yyyy',
        startTimeFormatText : 'H:mm',
        todayText : 'Oggi',
        dayText : 'Giorno',
        weekText : 'Set.',
        monthText : 'Mese',
        allDayText : 'Giorno'
    });
    localize('Mobile.SalesLogix.Calendar.WeekView',{
        titleText : 'Calendario',
        weekTitleFormatText : 'd MMM, yyyy',
        dayHeaderLeftFormatText : 'ddd',
        dayHeaderRightFormatText : 'd MMM, yyyy',
        startTimeFormatText : 'H:mm',
        todayText : 'Oggi',
        dayText : 'Giorno',
        weekText : 'Set.',
        monthText : 'Mese',
        allDayText : 'Giorno'
    });
    localize('Mobile.SalesLogix.Campaign.Detail',{
        acctMgrText : 'resp.',
        codeText : 'cod.',
        createDateText : 'creato il',
        createUserText : 'creato da',
        fbarHomeTitleText : 'Home',
        fbarScheduleTitleText : 'progetta',
        nameText : 'nome',
        startText : 'iniz.',
        titleText : 'Campagna'
    });
    localize('Mobile.SalesLogix.Campaign.Edit',{
        codeText : 'cod.',
        nameText : 'nome',
        startText : 'iniz.',
        titleText : 'Campagna'
    });
    localize('Mobile.SalesLogix.Campaign.List',{
        titleText : 'Campagne'
    });
    localize('Mobile.SalesLogix.Contact.Detail',{
        activityTypeText : {
            atPhoneCall : 'Telefonata',
            atEMail : 'E-mail'
		},
        accountText : 'azienda',
        acctMgrText : 'resp.',
        addressText : 'Indi.',
        contactTitleText : 'tit.',
        createDateText : 'creato il',
        createUserText : 'creato da',
        emailText : 'email',
        faxText : 'fax',
        homeText : 'Tel. fisso',
        nameText : 'cont.',
        ownerText : 'prop.',
        actionsText : 'Azioni rapide',
        relatedAccountsText : 'Aziende',
        relatedActivitiesText : 'Attività',
        relatedHistoriesText : 'Note/Cronologia',
        relatedItemsText : 'VociCorrelate',
        relatedNotesText : 'Nota',
        relatedOpportunitiesText : 'Opportunità',
        relatedTicketsText : 'Ticket',
        titleText : 'Contatto',
        webText : 'web',
        workText : 'tel.',
        callMobileNumberText : 'Tel. cell.',
        callWorkNumberText : 'Tel. num. princ.',
        scheduleActivityText : 'PianificaAttività',
        addNoteText : 'Agg.nota',
        sendEmailText : 'Inv. email',
        viewAddressText : 'Vedi Ind.',
        moreDetailsText : 'Più Dettagli'
    });
    localize('Mobile.SalesLogix.Contact.Edit',{
        titleText : 'Contatto',
        nameText : 'nome',
        workText : 'tel.',
        mobileText : 'cell.',
        emailText : 'email',
        webText : 'web',
        acctMgrText : 'resp.',
        accountNameText : 'azienda',
        homePhoneText : 'Tel. fisso',
        faxText : 'fax',
        addressText : 'Indi.',
        contactTitleText : 'tit.',
        titleTitleText : 'Titolo',
        addressTitleText : 'Indirizzo',
        ownerText : 'prop.'
    });
    localize('Mobile.SalesLogix.Contact.List',{
        titleText : 'Contatti',
        activitiesText : 'Attività',
        notesText : 'Nota',
        scheduleText : 'Pianifica'
    });
    localize('Mobile.SalesLogix.Contract.Detail',{
        accountText : 'azienda',
        activeText : 'attivo',
        contactText : 'cont.',
        contractTypeText : 'Tipo Contr.',
        createDateText : 'creato il',
        createUserText : 'creato da',
        endText : 'end',
        fbarHomeTitleText : 'Home',
        fbarScheduleTitleText : 'progetta',
        quantityText : 'quantità',
        refNumText : 'refNum',
        relatedItemsText : 'VociCorrelate',
        relatedTicketsText : 'Ticket',
        remainingText : 'restante',
        startText : 'iniz.',
        svcTypeText : 'Tipo-svc',
        titleText : 'Contratto'
    });
    localize('Mobile.SalesLogix.Contract.Edit',{
        titleText : 'Contratto',
        refNumText : 'refNum',
        quantityText : 'quantità',
        activeText : 'attivo'
    });
    localize('Mobile.SalesLogix.Contract.List',{
        titleText : 'Contratti'
    });
    localize('Mobile.SalesLogix.Defect.Detail',{
        areaText : 'area',
        assignedText : 'assegn.',
        categoryText : 'cat.',
        createDateText : 'creato il',
        createUserText : 'creato da',
        defectIdText : 'ID dif.',
        fbarHomeTitleText : 'Home',
        fbarNewTitleText : 'new',
        fbarScheduleTitleText : 'progetta',
        moreText : 'più >>',
        priorityText : 'priorità',
        relatedDefectProblemsText : 'Problema',
        relatedDefectSolutionsText : 'Soluzione',
        relatedItemsText : 'VociCorrelate',
        reportDateText : 'data report',
        severityText : 'gravità',
        statusText : 'status',
        subjectText : 'sogg.',
        titleText : 'Difetto'
    });
    localize('Mobile.SalesLogix.Defect.Edit',{
        idPrefixText : 'id pref.',
        idSuffixText : 'id suff.',
        titleText : 'Difetto',
        areaText : 'area',
        categoryText : 'cat.',
        subjectText : 'sogg.'
    });
    localize('Mobile.SalesLogix.Defect.List',{
        titleText : 'Difetti'
    });
    localize('Mobile.SalesLogix.DefectProblem.Detail',{
        createDateText : 'creato il',
        createUserText : 'creato da',
        notesText : 'note',
        titleText : 'Problema Difetto'
    });
    localize('Mobile.SalesLogix.DefectProblem.Edit',{
        notesText : 'note',
        titleText : 'Soluzione Difetto'
    });
    localize('Mobile.SalesLogix.DefectSolution.Detail',{
        createDateText : 'creato il',
        createUserText : 'creato da',
        notesText : 'note',
        titleText : 'Soluzione Difetto'
    });
    localize('Mobile.SalesLogix.DefectSolution.Edit',{
        notesText : 'note',
        titleText : 'Soluzione Difetto'
    });
    localize('Mobile.SalesLogix.History.Detail',{
        categoryText : 'cat.',
        completedText : 'concluso',
        durationText : 'durata',
        leaderText : 'leader',
        longNotesText : 'note',
        notesText : 'Nota',
        priorityText : 'priorità',
        regardingText : 'argomento',
        scheduledText : 'pianif.',
        timelessText : 'Senza orario',
        companyText : 'società',
        leadText : 'nom.',
        titleText : 'Cronologia',
        accountText : 'azienda',
        contactText : 'cont.',
        opportunityText : 'opportunità',
        ticketNumberText : 'ticket',
        moreDetailsText : 'Più Dettagli',
        relatedItemsText : 'VociCorrelate',
        modifiedText : 'mod.',
        typeText : 'tipo',
        activityTypeText : {
            atToDo : 'Impegno',
            atPhoneCall : 'Telefonata',
            atAppointment : 'Riunione',
            atLiterature : 'Richiesta materiale informativo',
            atPersonal : 'Attività personale',
            atQuestion : 'Domanda',
            atEMail : 'E-mail'
		},
        dateFormatText : 'd/M/yyyy H:mm:ss'
    });
    localize('Mobile.SalesLogix.History.Edit',{
        accountText : 'azienda',
        noteDescriptionTitleText : 'Descrizione Nota',
        contactText : 'cont.',
        longNotesText : 'note',
        longNotesTitleText : 'Nota',
        opportunityText : 'opportunità',
        ticketNumberText : 'ticket',
        regardingText : 'argomento',
        isLeadText : 'per nom.',
        startingText : 'ora',
        startingFormatText : 'd/M/yyyy H:mm',
        titleText : 'Nota',
        companyText : 'società',
        leadText : 'nom.',
        relatedItemsText : 'VociCorrelate'
    });
    localize('Mobile.SalesLogix.History.List',{
        activityTypeText : {
            atToDo : 'Impegno',
            atPhoneCall : 'Telefonata',
            atAppointment : 'Riunione',
            atLiterature : 'Richiesta materiale informativo',
            atPersonal : 'Attività personale',
            atQuestion : 'Domanda',
            atEMail : 'E-mail'
		},
        hourMinuteFormatText : 'H:mm',
        dateFormatText : 'd/M/yy',
        hashTagQueriesText : {
            note : 'nota',
            phonecall : 'telefon.',
            meeting : 'meeting',
            personal : 'personal',
            email : 'email'
		},
        titleText : 'Note/Cronologia'
    });
    localize('Mobile.SalesLogix.Lead.Detail',{
        activityTypeText : {
            atPhoneCall : 'Telefonata',
            atEMail : 'E-mail'
		},
        accountText : 'società',
        addressText : 'Indi.',
        businessDescriptionText : 'desc.att.',
        createDateText : 'creato il',
        createUserText : 'creato da',
        eMailText : 'email',
        leadSourceText : 'Fonte Nom.',
        industryText : 'settore',
        interestsText : 'interessi',
        leadTitleText : 'tit.',
        nameText : 'nome',
        notesText : 'commenti',
        ownerText : 'prop.',
        relatedActivitiesText : 'Attività',
        relatedHistoriesText : 'Note/Cronologia',
        relatedItemsText : 'VociCorrelate',
        relatedNotesText : 'Nota',
        sicCodeText : 'cod.sic ',
        titleText : 'Nominativo',
        tollFreeText : 'n. verde',
        webText : 'web',
        workText : 'tel.',
        actionsText : 'Azioni rapide',
        callWorkNumberText : 'Tel. num. princ.',
        scheduleActivityText : 'PianificaAttività',
        addNoteText : 'Agg.nota',
        sendEmailText : 'Inv. email',
        viewAddressText : 'Vedi Ind.',
        moreDetailsText : 'Più Dettagli',
        calledText : 'Tel. {0}',
        emailedText : 'Emailed {0}'
    });
    localize('Mobile.SalesLogix.Lead.Edit',{
        accountText : 'azienda',
        addressText : ' Indi. ',
        businessText : 'desc.att.',
        businessTitleText : 'Descrizione Attività',
        companyText : 'società',
        contactTitleText : 'tit.',
        emailText : 'email',
        faxText : 'fax',
        importSourceText : 'Fonte Nom.',
        industryText : 'settore',
        industryTitleText : 'Settore',
        interestsText : 'interessi',
        leadNameLastFirstText : 'nome',
        leadOwnerText : 'prop.',
        nameText : 'nome',
        notesText : 'commenti',
        notesTitleText : 'Commenti',
        sicCodeText : 'cod.sic',
        titleText : 'Nominativo',
        titleTitleText : 'Titolo',
        tollFreeText : 'n. verde',
        webText : 'web',
        workText : 'tel.'
    });
    localize('Mobile.SalesLogix.Lead.List',{
        titleText : 'Nominativi',
        activitiesText : 'Attività',
        notesText : 'Nota',
        scheduleText : 'Pianifica'
    });
    localize('Mobile.SalesLogix.LeadSource.List',{
        titleText : 'Sorgenti Nominativi'
    });
    localize('Mobile.SalesLogix.Opportunity.Detail',{
        accountText : 'az.',
        acctMgrText : 'resp.',
        estCloseText : 'chiusura',
        fbarHomeTitleText : 'Home',
        fbarScheduleTitleText : 'progetta',
        importSourceText : 'Fonte Nom.',
        opportunityText : 'opportunità',
        ownerText : 'prop.',
        actionsText : 'Azioni rapide',
        potentialText : 'pot. vendita',
        probabilityText : 'stima prob',
        relatedActivitiesText : 'Attività',
        relatedContactsText : 'Contatti',
        relatedHistoriesText : 'Note/Cronologia',
        relatedItemsText : 'VociCorrelate',
        relatedNotesText : 'Nota',
        relatedProductsText : 'Prodotti',
        resellerText : 'rivend.',
        statusText : 'status',
        titleText : 'Opportunità',
        typeText : 'tipo',
        scheduleActivityText : 'PianificaAttività',
        addNoteText : 'Agg.nota',
        moreDetailsText : 'Più Dettagli'
    });
    localize('Mobile.SalesLogix.Opportunity.Edit',{
        accountText : 'az.',
        acctMgrText : 'resp.',
        estCloseText : 'chiusura',
        importSourceText : 'Fonte Nom.',
        opportunityProbabilityTitleText : 'Probabilità Opportunit.',
        opportunityStatusTitleText : 'Status opportunità',
        opportunityText : 'opportunità',
        opportunityTypeTitleText : 'Tipo opportunità',
        ownerText : 'prop.',
        potentialText : 'pot. vendita',
        probabilityText : 'stima prob',
        resellerText : 'rivend.',
        statusText : 'status',
        titleText : 'Opportunità',
        typeText : 'tipo'
    });
    localize('Mobile.SalesLogix.Opportunity.List',{
        titleText : 'Opportunità',
        activitiesText : 'Attività',
        notesText : 'Nota',
        scheduleText : 'Pianifica',
        hashTagQueriesText : {
            open : 'apri',
            closed : 'chiuso',
            won : 'won',
            lost : 'lost'
		}
    });
    localize('Mobile.SalesLogix.OpportunityProduct.List',{
        titleText : 'Prodotti'
    });
    localize('Mobile.SalesLogix.Owner.List',{
        titleText : 'Proprietari'
    });
    localize('Mobile.SalesLogix.Return.Detail',{
        accountText : 'azienda',
        assignedToText : 'Assegnato a',
        createDateText : 'creato il',
        createUserText : 'creato da',
        fbarHomeTitleText : 'Home',
        fbarScheduleTitleText : 'progetta',
        priorityText : 'priorità',
        regDateText : 'data reg',
        returnedByText : 'reso da',
        returnIdText : 'ID reso',
        shipToText : 'invia a',
        titleText : 'Reso',
        typeText : 'tipo'
    });
    localize('Mobile.SalesLogix.Return.Edit',{
        titleText : 'Reso',
        returnIdText : 'ID reso',
        priorityText : 'priorità',
        typeText : 'tipo',
        regDateText : 'data reg',
        returnedByText : 'reso da'
    });
    localize('Mobile.SalesLogix.Return.List',{
        titleText : 'Resi'
    });
    localize('Mobile.SalesLogix.SalesOrder.Detail',{
        accountText : 'azienda',
        acctMgrText : 'resp.',
        commentsText : 'commenti',
        createDateText : 'creato il',
        createUserText : 'creato da',
        fbarHomeTitleText : 'Home',
        fbarScheduleTitleText : 'progetta',
        reqDateText : 'chiesto',
        salesOrderIdText : 'ID ord.vendita',
        statusText : 'status',
        titleText : 'Ordine di Vendita',
        totalText : 'tot',
        typeText : 'tipo'
    });
    localize('Mobile.SalesLogix.SalesOrder.Edit',{
        commentsText : 'commenti',
        reqDateText : 'chiesto',
        salesOrderIdText : 'ID ord.vendita',
        statusText : 'status',
        titleText : 'Ordine di Vendita',
        totalText : 'tot',
        typeText : 'tipo'
    });
    localize('Mobile.SalesLogix.SalesOrder.List',{
        titleText : 'Ordine di Vendita'
    });
    localize('Mobile.SalesLogix.Ticket.Detail',{
        accountText : 'azienda',
        areaText : 'area',
        assignedDateText : 'assegnato il',
        assignedToText : 'assegnato a',
        categoryText : 'cat.',
        contactText : 'cont.',
        contractText : 'contr.',
        descriptionText : 'desc',
        issueText : 'prob.',
        needByText : 'data limite',
        notesText : 'commenti',
        phoneText : 'tel.',
        actionsText : 'Azioni rapide',
        relatedActivitiesText : 'Attività',
        relatedItemsText : 'VociCorrelate',
        resolutionText : 'soluzione',
        sourceText : 'fonte',
        statusText : 'status',
        subjectText : 'sogg.',
        ticketIdText : 'num. ticket ',
        titleText : 'Ticket',
        urgencyText : 'urgenza',
        scheduleActivityText : 'PianificaAttività',
        moreDetailsText : 'Più Dettagli'
    });
    localize('Mobile.SalesLogix.Ticket.Edit',{
        accountText : 'az.',
        areaText : 'area',
        assignedDateText : 'assegnato il',
        assignedToText : 'assegnato a',
        categoryText : 'cat.',
        contactText : 'cont.',
        contractText : 'contr.',
        descriptionText : 'desc',
        descriptionTitleText : 'Descrizione',
        issueText : 'prob.',
        needByText : 'data limite',
        notesText : 'commenti',
        notesTitleText : 'Commenti',
        phoneText : 'tel.',
        relatedActivitiesText : 'Attività',
        relatedItemsText : 'VociCorrelate',
        resolutionText : 'soluzione',
        resolutionTitleText : 'Soluzione',
        sourceText : 'fonte',
        sourceTitleText : 'Origine',
        statusText : 'status',
        subjectText : 'sogg.',
        ticketAreaTitleText : 'Area Ticket',
        ticketCategoryTitleText : 'Cat. Ticket ',
        ticketIdText : 'num. ticket ',
        ticketIssueTitleText : 'Prob.Ticket ',
        ticketStatusTitleText : 'Status Ticket',
        ticketUrgencyTitleText : 'Urgenza Ticket',
        titleText : 'Ticket',
        urgencyText : 'urgenza'
    });
    localize('Mobile.SalesLogix.Ticket.List',{
        titleText : 'Ticket',
        activitiesText : 'Attività',
        scheduleText : 'Pianifica'
    });
    localize('Mobile.SalesLogix.Ticket.UrgencyLookup',{
        titleText : 'Urgenza Ticket'
    });
    localize('Mobile.SalesLogix.User.List',{
        titleText : 'Utenti'
    });
    localize('Sage.Platform.Mobile.Calendar',{
        validationSummaryText : 'Sintesi Convalida',
        titleText : 'Calendario',
        amText : 'AM',
        pmText : 'PM',
        invalidHourErrorText : 'Formato ora invalido',
        invalidMinuteErrorText : 'Formato min. invalido'
    });
    localize('Sage.Platform.Mobile.Controls.AddressField',{
        lookupLabelText : 'mod.',
        emptyText : 'nessun ind'
    });
    localize('Sage.Platform.Mobile.Controls.BooleanField',{
        onText : 'ON',
        offText : 'OFF'
    });
    localize('Sage.Platform.Mobile.Controls.DateField',{
        emptyText : '',
        dateFormatText : 'dd/MM/yyyy',
        invalidDateFormatErrorText : 'Formato data non valido "{0}".'
    });
    localize('Sage.Platform.Mobile.Controls.EditorField',{
        lookupLabelText : 'mod.',
        lookupText : '...',
        emptyText : 'vuoto',
        completeText : 'Ok'
    });
    localize('Sage.Platform.Mobile.Controls.LookupField',{
        dependentErrorText : 'Selezionare un valore per  "{0}" .',
        emptyText : '',
        completeText : 'Seleziona',
        lookupLabelText : 'cerca',
        lookupText : '...'
    });
    localize('Sage.Platform.Mobile.Controls.NameField',{
        emptyText : 'no nome'
    });
    localize('Sage.Platform.Mobile.Controls.NoteField',{
        emptyText : ''
    });
    localize('Sage.Platform.Mobile.Detail',{
        editText : 'Modifica',
        titleText : 'Dettaglio',
        detailsText : 'Dettagli',
        toggleCollapseText : 'espandi compr.',
        loadingText : 'carica...',
        requestErrorText : 'Errore server durante la richiesta dei dati.',
        notAvailableText : 'La voce richiesta non è disponibile.'
    });
    localize('Sage.Platform.Mobile.Edit',{
        saveText : 'Salva',
        titleText : 'Modifica',
        toggleCollapseText : 'espandi compr.',
        validationSummaryText : 'Sintesi Convalida',
        detailsText : 'Dettagli',
        loadingText : 'carica...',
        requestErrorText : 'Errore server durante la richiesta dei dati.'
    });
    localize('Sage.Platform.Mobile.GroupedList',{
        toggleCollapseText : 'espandi compr.'
    });
    localize('Sage.Platform.Mobile.List',{
        moreText : 'Recupera più record',
        emptySelectionText : 'Nessuno',
        titleText : 'Elenco',
        remainingText : '{0} record restanti',
        searchText : 'Cerca',
        cancelText : 'Annulla',
        insertText : 'Nuovo',
        noDataText : 'no record',
        loadingText : 'carica...',
        requestErrorText : 'Errore server durante la richiesta dei dati.'
    });
    localize('Sage.Platform.Mobile.MainToolbar',{
        titleText : 'Cellulare'
    });
    localize('Sage.Platform.Mobile.View',{
        titleText : 'Vista Gen.'
    });
    
})();

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
        accountStatusTitleText : 'Status Azienda',
        accountSubTypeTitleText : 'SottoT. Azienda',
        accountText : 'Azienda',
        accountTypeTitleText : 'Tipo Azienda',
        addressText : ' Indi. ',
        contactTitleText : 'Tit.',
        descriptionText : 'descrizione',
        detailsAccountText : 'Info Azienda',
        detailsContactText : 'InfoContatto',
        detailsText : 'Info Contatto/Azienda',
        emailText : 'email',
        faxText : 'fax',
        homePhoneText : 'tel. fisso',
        industryText : 'settore',
        lastNameText : 'cogn',
        mobileText : 'cell. ',
        nameText : 'nome',
        statusText : 'status',
        subTypeText : 'sottoTip',
        titleText : 'Agg. Azienda/Contatto',
        typeText : 'tipo',
        webText : 'web',
        workText : 'telUfficio',
        industryTitleText : 'Settore'
    });
    localize('Mobile.SalesLogix.AreaCategoryIssueLookup',{
        titleText : 'Aziende'
    });
    localize('Mobile.SalesLogix.Configure',{
        titleText : 'Config. ',
        savePrefsText : 'Save'
    });
    localize('Mobile.SalesLogix.ContextDialog',{
        activitiesText : 'Attività',
        addAccountContactText : 'Agg. Azienda/Contatto',
        cancelText : 'Annul.',
        notesText : 'Nota',
        scheduleText : 'Pianif.'
    });
    localize('Mobile.SalesLogix.FooterToolbar',{
        copyrightText : '© 2011 Sage Software, Inc. Diritti riservati.',
        logOutConfirmText : 'Sei sicuro di voler uscire?      ',
        settingsText : 'Opzioni ',
        helpText : 'Help',
        topText : 'Su ',
        logOutText : 'Uscita '
    });
    localize('Mobile.SalesLogix.Help',{
        titleText : 'Help',
        errorText : 'Err.',
        errorMessageText : 'Documento di help non caricato   '
    });
    localize('Mobile.SalesLogix.Home',{
        configureText : 'Config. ',
        addAccountContactText : 'Agg. Azienda/Contatto',
        titleText : 'Casa',
        actionsText : 'Azioni Rapide',
        viewsText : 'Vai A'
    });
    localize('Mobile.SalesLogix.Login',{
        copyrightText : '© 2011 Sage Software, Inc. Diritti riservati.',
        logOnText : 'Conn.',
        passText : 'password',
        rememberText : 'ricorda',
        titleText : 'Sage SalesLogix',
        userText : 'nome ',
        invalidUserText : 'Nome o password errati ',
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
        titleText : 'Opzioni '
    });
    localize('Mobile.SalesLogix.TextEdit',{
        titleText : 'Text'
    });
    localize('Mobile.SalesLogix.UpdateToolbar',{
        updateText : 'Clicca per effettuare l"aggiornamento'
    });
    localize('Mobile.SalesLogix.Account.Detail',{
        accountText : 'azienda',
        acctMgrText : 'resp.',
        addressText : ' Indi. ',
        businessDescriptionText : 'desc.att.',
        createDateText : 'creato il',
        createUserText : 'creato da',
        faxText : 'fax',
        importSourceText : 'fonte nom.',
        industryText : 'settore',
        notesText : 'note',
        ownerText : 'prop.',
        phoneText : 'tel.',
        activityTypeText : {
            atPhoneCall : 'Telefonata'
		},
        actionsText : 'Azioni Rapide',
        relatedActivitiesText : 'Attività',
        relatedContactsText : 'Contatti',
        relatedHistoriesText : 'Note/Cronol.',
        relatedItemsText : 'VociCorrelate',
        relatedNotesText : 'Nota',
        relatedOpportunitiesText : 'Opportunità',
        relatedTicketsText : 'Ticket',
        statusText : 'status',
        subTypeText : 'sottoT.',
        titleText : 'Azienda',
        typeText : 'tipo',
        webText : 'web',
        callMainNumberText : 'Tel. num. princ.',
        scheduleActivityText : 'PianificaAttività',
        addNoteText : 'Agg.nota',
        viewAddressText : 'Vedi indir.',
        moreDetailsText : 'Più Dettagli',
        calledText : 'Tel. {0}'
    });
    localize('Mobile.SalesLogix.Account.Edit',{
        accountStatusTitleText : 'Status Azienda',
        accountSubTypeTitleText : 'SottoT. Azienda',
        accountText : 'azienda',
        accountTypeTitleText : 'Tipo Azienda',
        acctMgrText : 'resp.',
        businessDescriptionText : 'desc.att.',
        businessDescriptionTitleText : 'Descrizione Attività',
        descriptionText : 'desc',
        faxText : 'fax',
        fullAddressText : 'Indir.',
        importSourceText : 'fonte nom.',
        industryText : 'settore',
        industryTitleText : 'Settore',
        ownerText : 'prop.',
        phoneText : 'tel.',
        statusText : 'status',
        subTypeText : 'sottoT.',
        titleText : 'Azienda',
        typeText : 'tipo',
        webText : 'web'
    });
    localize('Mobile.SalesLogix.Account.List',{
        titleText : 'Aziende',
        activitiesText : 'Attività',
        notesText : 'Nota',
        scheduleText : 'Pianif.'
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
        resultTitleText : 'Risul.',
        startingText : 'data iniz.',
        startingFormatText : 'd/M/yyyy H:mm',
        timelessText : 'No ora',
        durationValueText : {
            0 : 'ness',
            15 : '15 minuti',
            30 : '30 minuti',
            60 : '1 Ora',
            90 : '1,5 ore',
            120 : '2 ore'
		},
        followupValueText : {
            none : 'Nes.',
            atPhoneCall : 'Telefonata',
            atAppointment : 'Riunio.',
            atToDo : 'Impe.'
		}
    });
    localize('Mobile.SalesLogix.Activity.Detail',{
        activityTypeText : {
            atToDo : 'Impe.',
            atPhoneCall : 'Telefonata',
            atAppointment : 'Riunio.',
            atLiterature : 'Rich. mat. inform.',
            atPersonal : 'Attività person.'
		},
        actionsText : 'Azioni rapide',
        completeActivityText : 'Completa Attività',
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
        timelessText : 'No ora',
        titleText : 'Attività',
        typeText : 'tipo',
        companyText : 'società',
        leadText : 'nom.',
        accountText : 'azienda',
        contactText : 'cont.',
        opportunityText : 'opportunità',
        recurringText: 'recurring',
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
        activityTypeTitleText : 'Tipo Attività',
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
        timelessText : 'No ora',
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
            0 : 'ness',
            5 : '5 minuti',
            15 : '15 minuti',
            30 : '30 minuti',
            60 : '1 Ora',
            1440 : '1 giorno'
		},
        durationValueText : {
            0 : 'ness',
            15 : '15 minuti',
            30 : '30 minuti',
            60 : '1 ora',
            90 : '1,5 ore',
            120 : '2 ore'
		}
    });
    localize('Mobile.SalesLogix.Activity.List',{
        startDateFormatText : 'ddd d/M/yy',
        startTimeFormatText : 'H:mm',
        allDayText: 'Giorno',
        titleText : 'Attività'
    });
    localize('Mobile.SalesLogix.Activity.TypesList',{
        titleText : 'Pianifica..',
        activityTypeText : {
            atToDo : 'Impe.',
            atPhoneCall : 'Telefonata',
            atAppointment : 'Riunio.',
            atLiterature : 'Rich. mat. inform.',
            atPersonal : 'Attività Person.'
		}
    });
    localize('Mobile.SalesLogix.Address.Edit',{
        address1Text : 'indir. 1',
        address2Text : 'indir. 2',
        address3Text : 'indir. 3',
        cityText : 'city',
        cityTitleText : 'Cit.',
        countryText : 'nazione',
        countryTitleText : 'Nazione',
        descriptionText : 'descrizione',
        descriptionTitleText : 'Descrizione',
        isMailingText : 'sped.',
        isPrimaryText : 'princ.',
        postalCodeText : 'post.',
        salutationText : 'attenz.',
        stateText : 'stato',
        stateTitleText : 'Prov.',
        titleText : 'Indirizzo'
    });
    localize('Mobile.SalesLogix.Calendar.MonthView',{
        titleText : 'Calend.',
        todayText : 'Oggi',
        dayText : 'Dì',
        weekText : 'Set.',
        monthText : 'Mese',
        monthTitleFormatText : 'MMMM yyyy',
        dayTitleFormatText : 'ddd d MMM, yyyy',
        dayStartTimeFormatText : 'H:mm'
    });
    localize('Mobile.SalesLogix.Calendar.UserActivityList',{
        titleText : 'Calend.',
        dateHeaderFormatText : 'dddd, dd/MM/yyyy',
        startTimeFormatText : 'H:mm',
        todayText : 'Oggi',
        dayText : 'Dì',
        weekText : 'Set.',
        monthText : 'Mese',
        allDayText : 'Giorno'
    });
    localize('Mobile.SalesLogix.Calendar.WeekView',{
        titleText : 'Calend.',
        weekTitleFormatText : 'd MMM, yyyy',
        dayHeaderLeftFormatText : 'ddd',
        dayHeaderRightFormatText : 'd MMM, yyyy',
        startTimeFormatText : 'H:mm',
        todayText : 'Oggi',
        dayText : 'Dì',
        weekText : 'Set.',
        monthText : 'Mese',
        allDayText : 'Giorno'
    });
    localize('Mobile.SalesLogix.Campaign.Detail',{
        acctMgrText : 'resp.',
        codeText : 'cod.',
        createDateText : 'creato il',
        createUserText : 'creato da',
        fbarHomeTitleText : 'home',
        fbarScheduleTitleText : 'pianif.',
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
        addressText : ' Indi. ',
        contactTitleText : 'tit.',
        createDateText : 'creato il',
        createUserText : 'creato da',
        emailText : 'email',
        faxText : 'fax',
        homeText : 'tel. fisso',
        nameText : 'cont.',
        ownerText : 'prop.',
        actionsText : 'Azioni Rapide',
        relatedAccountsText : 'Aziende',
        relatedActivitiesText : 'Attività',
        relatedHistoriesText : 'Note/Cronol.',
        relatedItemsText : 'VociCorrelate',
        relatedNotesText : 'Note',
        relatedOpportunitiesText : 'Opportunità',
        relatedTicketsText : 'Ticket',
        titleText : 'Contat.',
        webText : 'web',
        workText : 'tel.',
        callMobileNumberText : 'Tel. cell.',
        callWorkNumberText : 'Tel. num. princ.',
        scheduleActivityText : 'PianificaAttività',
        addNoteText : 'Agg.nota',
        sendEmailText : 'Inv. email',
        viewAddressText : 'Vedi indir.',
        moreDetailsText : 'Più Dettagli'
    });
    localize('Mobile.SalesLogix.Contact.Edit',{
        titleText : 'Contat.',
        nameText : 'nome',
        workText : 'tel.',
        mobileText : 'cell. ',
        emailText : 'email',
        webText : 'web',
        acctMgrText : 'resp.',
        accountNameText : 'azienda',
        homePhoneText : 'tel. fisso',
        faxText : 'fax',
        addressText : ' Indi. ',
        contactTitleText : 'tit.',
        titleTitleText : 'Tit.',
        addressTitleText : 'Indirizzo',
        ownerText : 'prop.'
    });
    localize('Mobile.SalesLogix.Contact.List',{
        titleText : 'Contatti',
        activitiesText : 'Attività',
        notesText : 'Nota',
        scheduleText : 'Pianif.'
    });
    localize('Mobile.SalesLogix.Contract.Detail',{
        accountText : 'azienda',
        activeText : 'attivo',
        contactText : 'cont.',
        contractTypeText : 'Tipo Contr.',
        createDateText : 'creato il',
        createUserText : 'creato da',
        endText : 'end',
        fbarHomeTitleText : 'home',
        fbarScheduleTitleText : 'pianif.',
        quantityText : 'quantità',
        refNumText : 'rifNum',
        relatedItemsText : 'VociCorrelate',
        relatedTicketsText : 'Ticket',
        remainingText : 'restante',
        startText : 'iniz.',
        svcTypeText : 'Tipo-svc',
        titleText : 'Contrat.'
    });
    localize('Mobile.SalesLogix.Contract.Edit',{
        titleText : 'Contrat.',
        refNumText : 'rifNum',
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
        fbarHomeTitleText : 'home',
        fbarNewTitleText : 'new',
        fbarScheduleTitleText : 'pianif.',
        moreText : 'più >>',
        priorityText : 'priorità',
        relatedDefectProblemsText : 'Probl.',
        relatedDefectSolutionsText : 'Soluz.',
        relatedItemsText : 'VociCorrelate',
        reportDateText : 'data report',
        severityText : 'gravità',
        statusText : 'status',
        subjectText : 'sogg.',
        titleText : 'Difet.'
    });
    localize('Mobile.SalesLogix.Defect.Edit',{
        idPrefixText : 'id pref.',
        idSuffixText : 'id suff.',
        titleText : 'Difet.',
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
        titleText : 'ProblDifetto'
    });
    localize('Mobile.SalesLogix.DefectProblem.Edit',{
        notesText : 'note',
        titleText : 'SoluzDifetto'
    });
    localize('Mobile.SalesLogix.DefectSolution.Detail',{
        createDateText : 'creato il',
        createUserText : 'creato da',
        notesText : 'note',
        titleText : 'SoluzDifetto'
    });
    localize('Mobile.SalesLogix.DefectSolution.Edit',{
        notesText : 'note',
        titleText : 'SoluzDifetto'
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
        timelessText : 'No ora',
        companyText : 'società',
        leadText : 'nom.',
        titleText : 'Cronol.',
        accountText : 'azienda',
        contactText : 'cont.',
        opportunityText : 'opportunità',
        ticketNumberText : 'ticket',
        moreDetailsText : 'Più Dettagli',
        relatedItemsText : 'VociCorrelate',
        modifiedText : 'mod.',
        typeText : 'tipo',
        activityTypeText : {
            atToDo : 'Impe.',
            atPhoneCall : 'Telefonata',
            atAppointment : 'Riunio.',
            atLiterature : 'Rich. Mat. Inform.',
            atPersonal : 'Attività Person.',
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
            atToDo : 'Impe.',
            atPhoneCall : 'Telefonata',
            atAppointment : 'Riunio.',
            atLiterature : 'Rich. Mat. Inform.',
            atPersonal : 'Attività Person.',
            atQuestion : 'Domanda',
            atEMail : 'E-mail'
		},
        hourMinuteFormatText : 'H:mm',
        dateFormatText : 'd/M/yy',
        hashTagQueriesText : {
            note : 'nota',
            phonecall : 'telefon.',
            meeting : 'meeting',
            personal : 'person.',
            email : 'email'
		},
        titleText : 'Note/Cronol.'
    });
    localize('Mobile.SalesLogix.Lead.Detail',{
        activityTypeText : {
            atPhoneCall : 'Telefonata',
            atEMail : 'E-mail'
		},
        accountText : 'società',
        addressText : 'indir.',
        businessDescriptionText : 'desc.att.',
        createDateText : 'creato il',
        createUserText : 'creato da',
        eMailText : 'email',
        leadSourceText : 'fonte nom.',
        industryText : ' settore',
        interestsText : 'interessi',
        leadTitleText : 'tit.',
        nameText : 'nome',
        notesText : 'commenti',
        ownerText : 'prop.',
        relatedActivitiesText : 'Attività',
        relatedHistoriesText : 'Note/Cronol.',
        relatedItemsText : 'VociCorrelate',
        relatedNotesText : 'Nota',
        sicCodeText : 'cod.sic ',
        titleText : 'Lead',
        tollFreeText : 'n. verde',
        webText : 'web',
        workText : 'tel.',
        actionsText : 'Azioni Rapide',
        callWorkNumberText : 'Tel. num. princ.',
        scheduleActivityText : 'PianificaAttività',
        addNoteText : 'Agg.nota',
        sendEmailText : 'Inv. email',
        viewAddressText : 'Vedi indir.',
        moreDetailsText : 'Più Dettagli',
        calledText : 'Tel. {0}',
        emailedText : 'Emailed {0}'
    });
    localize('Mobile.SalesLogix.Lead.Edit',{
        accountText : 'azienda',
        addressText : 'indir. ',
        businessText : 'desc.att.',
        businessTitleText : 'Descrizione Attività',
        companyText : 'società',
        contactTitleText : 'tit.',
        emailText : 'email',
        faxText : 'fax',
        importSourceText : 'fonte nom.',
        industryText : 'settore',
        industryTitleText : 'Settore',
        interestsText : 'interessi',
        leadNameLastFirstText : 'nome',
        leadOwnerText : 'prop.',
        nameText : 'nome',
        notesText : 'commenti',
        notesTitleText : 'Commenti',
        sicCodeText : 'cod.sic ',
        titleText : 'Lead',
        titleTitleText : 'Tit.',
        tollFreeText : 'n. verde',
        webText : 'web',
        workText : 'tel.'
    });
    localize('Mobile.SalesLogix.Lead.List',{
        titleText : 'Lead',
        activitiesText : 'Attività',
        notesText : 'Nota',
        scheduleText : 'Pianif.'
    });
    localize('Mobile.SalesLogix.LeadSource.List',{
        titleText : 'Sorg. Lead'
    });
    localize('Mobile.SalesLogix.Opportunity.Detail',{
        accountText : 'az.',
        acctMgrText : 'resp.',
        estCloseText : 'chiusura',
        fbarHomeTitleText : 'home',
        fbarScheduleTitleText : 'pianif.',
        importSourceText : 'fonte nom.',
        opportunityText : 'opportunità',
        ownerText : 'prop.',
        actionsText : 'Azioni Rapide',
        potentialText : 'pot. vendita',
        probabilityText : 'stima prob',
        relatedActivitiesText : 'Attività',
        relatedContactsText : 'Contatti',
        relatedHistoriesText : 'Note/Cronol.',
        relatedItemsText : 'VociCorrelate',
        relatedNotesText : 'Note',
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
        importSourceText : 'fonte nom.',
        opportunityProbabilityTitleText : 'Probabilità Opportunit.',
        opportunityStatusTitleText : 'Status Opportunità',
        opportunityText : 'opportunità',
        opportunityTypeTitleText : 'Tipo Opportunità',
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
        scheduleText : 'Pianif.',
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
        titleText : 'Propr.'
    });
    localize('Mobile.SalesLogix.Return.Detail',{
        accountText : 'azienda',
        assignedToText : 'AssegnatoA',
        createDateText : 'creato il',
        createUserText : 'creato da',
        fbarHomeTitleText : 'home',
        fbarScheduleTitleText : 'pianif.',
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
        fbarHomeTitleText : 'home',
        fbarScheduleTitleText : 'pianif.',
        reqDateText : 'chiesto',
        salesOrderIdText : 'ID ord.vendita',
        statusText : 'status',
        titleText : 'Ord. Vend.',
        totalText : 'tot',
        typeText : 'tipo'
    });
    localize('Mobile.SalesLogix.SalesOrder.Edit',{
        commentsText : 'commenti',
        reqDateText : 'chiesto',
        salesOrderIdText : 'id ord.vendita',
        statusText : 'status',
        titleText : 'Ord. Vend.',
        totalText : 'tot',
        typeText : 'tipo'
    });
    localize('Mobile.SalesLogix.SalesOrder.List',{
        titleText : 'Ord. Vend.'
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
        actionsText : 'Azioni Rapide',
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
        sourceTitleText : 'Orig.',
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
        scheduleText : 'Pianif.'
    });
    localize('Mobile.SalesLogix.Ticket.UrgencyLookup',{
        titleText : 'Urgenza Ticket'
    });
    localize('Mobile.SalesLogix.User.List',{
        titleText : 'Utent'
    });
    localize('Sage.Platform.Mobile.Calendar',{
        validationSummaryText : 'Sintesi Convalida',
        titleText : 'Calend.',
        amText : 'AM',
        pmText : 'PM',
        invalidHourErrorText : 'Format ora invalido',
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
        completeText : 'Selez.',
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
        editText : 'Mod.',
        titleText : 'Dett.',
        detailsText : 'Dett.',
        toggleCollapseText : 'espandi compr.',
        loadingText : 'carica...',
        requestErrorText : 'Errore server durante la richiesta dei dati.',
        notAvailableText : 'La voce richiesta non è disponibile.'
    });
    localize('Sage.Platform.Mobile.Edit',{
        saveText : 'Save',
        titleText : 'Mod.',
        toggleCollapseText : 'espandi compr.',
        validationSummaryText : 'Sintesi Convalida',
        detailsText : 'Dett.',
        loadingText : 'carica...',
        requestErrorText : 'Errore server durante la richiesta dei dati.'
    });
    localize('Sage.Platform.Mobile.GroupedList',{
        toggleCollapseText : 'espandi compr.'
    });
    localize('Sage.Platform.Mobile.List',{
        moreText : 'Recupera Più Record',
        emptySelectionText : 'Nes.',
        titleText : 'List',
        remainingText : '{0} record restanti',
        searchText : 'Cerca',
        cancelText : 'Annul.',
        insertText : 'New',
        noDataText : 'no record',
        loadingText : 'carica...',
        requestErrorText : 'Errore server durante la richiesta dei dati.'
    });
    localize('Sage.Platform.Mobile.MainToolbar',{
        titleText : 'Cell.'
    });
    localize('Sage.Platform.Mobile.View',{
        titleText : 'Vista Gen.'
    });
    
})();

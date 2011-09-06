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
            message : 'Поле "{2}" должно быть заполнено.'
		},
        name : {
            message : 'Поле "{2}" должно содержать имя и фамилию.'
		},
        notEmpty : {
            message : 'Поле "{2}" не может быть пустым.'
		},
        hasText : {
            message : 'Поле "{2}" должено содержать текст.'
		},
        isInteger : {
            message : 'Значение "{0} "не является допустимым числом.'
		},
        isDecimal : {
            message : 'Значение "{0} "не является допустимым числом.'
		},
        isCurrency : {
            message : 'Значение "{0} "не является допустимой суммой.'
		},
        isInt32 : {
            message : 'Поле "{2}" превышает допустимое значение числовое диапазона.'
		},
        exceedsMaxTextLength : {
            message : 'Значение  поля "{2}" превышает допустимую длину.'
		},
        isDateInRange : {
            message : 'Значение поля "{2}" вне разрешенного диапазона дат.'
		}
    });
    localize('Mobile.SalesLogix.AddAccountContact',{
        accountNameText : 'субъект',
        accountStatusTitleText : 'Статус субъекта',
        accountSubTypeTitleText : 'Подтип субъекта',
        accountText : 'тема',
        accountTypeTitleText : 'Тип субъекта',
        addressText : 'адрес',
        contactTitleText : 'Должность',
        descriptionText : 'описание',
        detailsAccountText : 'Инф. о субъекте',
        detailsContactText : 'Инф. о контакте',
        detailsText : 'Инф. о контакте/субъекте',
        emailText : 'эл.почта',
        faxText : 'факс',
        homePhoneText : 'дом. тел.',
        industryText : 'отрасль',
        lastNameText : 'фамилия',
        mobileText : 'моб. тел.',
        nameText : 'имя',
        statusText : 'статус',
        subTypeText : 'подтип',
        titleText : 'Создать Контакт/Субъект',
        typeText : 'тип',
        webText : 'веб:',
        workText : 'раб. тел.',
        industryTitleText : 'Отрасль'
    });
    localize('Mobile.SalesLogix.AreaCategoryIssueLookup',{
        titleText : 'Субъекты'
    });
    localize('Mobile.SalesLogix.Configure',{
        titleText : 'Настройка',
        savePrefsText : 'Сохранить'
    });
    localize('Mobile.SalesLogix.ContextDialog',{
        activitiesText : 'Дела',
        addAccountContactText : 'Создать Контакт/Субъект',
        cancelText : 'Отмена',
        notesText : 'Заметки',
        scheduleText : 'Планировать'
    });
    localize('Mobile.SalesLogix.FooterToolbar',{
        copyrightText : 'A© 2011 Sage Software, Inc. All rights reserved.',
        logOutConfirmText : 'Вы уверены, что хотите выйти из системы?',
        settingsText : 'Настройки',
        helpText : 'Помощь',
        topText : 'Верх',
        logOutText : 'Выход'
    });
    localize('Mobile.SalesLogix.Help',{
        titleText : 'Помощь',
        errorText : 'Ошибка',
        errorMessageText : 'Не удается загрузить файл справки.'
    });
    localize('Mobile.SalesLogix.Home',{
        configureText : 'Настройка',
        addAccountContactText : 'Создать Контакт/Субъект',
        titleText : 'Домой',
        actionsText : 'Быстрые действия',
        viewsText : 'Перейти'
    });
    localize('Mobile.SalesLogix.Login',{
        copyrightText : 'A© 2011 Sage Software, Inc. All rights reserved.',
        logOnText : 'Вход ',
        passText : 'пароль',
        rememberText : 'запомнить',
        titleText : 'Sage SalesLogix',
        userText : 'пользователь',
        invalidUserText : 'Неправильное имя пользователя или пароль.',
        missingUserText : 'Пользователь не был найден.',
        serverProblemText : 'Возникла проблема на сервере.',
        requestAbortedText : 'Запрос был прерван.'
    });
    localize('Mobile.SalesLogix.NameEdit',{
        firstNameText : 'имя',
        middleNameText : 'отчество',
        lastNameText : 'фамилия',
        prefixText : 'префикс',
        prefixTitleText : 'Префикс имени',
        suffixText : 'суфикс',
        suffixTitleText : 'Суффикс имени'
    });
    localize('Mobile.SalesLogix.Settings',{
        clearLocalStorageTitleText : 'Очистить хранилище',
        clearAuthenticationTitleText : 'Очистить сохраненные учетные данные',
        localStorageClearedText : 'Локальное хранилище данных успешно очищено.',
        credentialsClearedText : 'Сохраненные учетные данные очищены успешно.',
        titleText : 'Настройки'
    });
    localize('Mobile.SalesLogix.TextEdit',{
        titleText : 'Текст'
    });
    localize('Mobile.SalesLogix.UpdateToolbar',{
        updateText : 'Обновление доступно. Нажмите, чтобы обновить.'
    });
    localize('Mobile.SalesLogix.Account.Detail',{
        accountText : 'субъект',
        acctMgrText : 'менеджер',
        addressText : 'адрес',
        businessDescriptionText : 'описание бизнеса',
        createDateText : 'дата создания',
        createUserText : 'создал',
        faxText : 'факс',
        importSourceText : 'источник наводки',
        industryText : 'отрасль',
        notesText : 'заметки',
        ownerText : 'доступ',
        phoneText : 'телефон',
        activityTypeText : {
            atPhoneCall : 'Звонок'
		},
        actionsText : 'Быстрые действия',
        relatedActivitiesText : 'Дела',
        relatedContactsText : 'Контакты',
        relatedHistoriesText : 'Заметки/История',
        relatedItemsText : 'Связанные записи',
        relatedNotesText : 'Заметки',
        relatedOpportunitiesText : 'Сделки',
        relatedTicketsText : 'Заявки',
        statusText : 'статус',
        subTypeText : 'подтип',
        titleText : 'тема',
        typeText : 'тип',
        webText : 'веб:',
        callMainNumberText : 'Позвонить на основной тел.',
        scheduleActivityText : 'Запланировать дело',
        addNoteText : 'Добавить заметки',
        viewAddressText : 'Просмотр адресов',
        moreDetailsText : 'Подробнее',
        calledText : 'Вызов {0}'
    });
    localize('Mobile.SalesLogix.Account.Edit',{
        accountStatusTitleText : 'Статус субъекта',
        accountSubTypeTitleText : 'Подтип субъекта',
        accountText : 'субъект',
        accountTypeTitleText : 'Тип субъекта',
        acctMgrText : 'менеджер',
        businessDescriptionText : 'описание бизнеса',
        businessDescriptionTitleText : 'Описание бизнеса',
        descriptionText : 'описание',
        faxText : 'факс',
        fullAddressText : 'адрес',
        importSourceText : 'источник наводки',
        industryText : 'отрасль',
        industryTitleText : 'Отрасль',
        ownerText : 'доступ',
        phoneText : 'телефон',
        statusText : 'статус',
        subTypeText : 'подтип',
        titleText : 'тема',
        typeText : 'тип',
        webText : 'веб:'
    });
    localize('Mobile.SalesLogix.Account.List',{
        titleText : 'Субъекты',
        activitiesText : 'Дела',
        notesText : 'Заметки',
        scheduleText : 'Планировать'
    });
    localize('Mobile.SalesLogix.Activity.Complete',{
        activityInfoText : 'Инф. о деле',
        accountText : 'субъект',
        contactText : 'контакт',
        opportunityText : 'сделка',
        ticketNumberText : 'заявка',
        companyText : 'компания',
        leadText : 'нводка',
        asScheduledText : 'как запланировано',
        categoryText : 'категория',
        categoryTitleText : 'Категория дела',
        completedText : 'дата завершения',
        completedFormatText : 'dd.MM.yyyy HH:mm',
        completionText : 'Завершение',
        durationText : 'длительность',
        durationInvalidText : 'Поле "{2}" должно быть заполнено.',
        carryOverNotesText : 'перенос заметок',
        followUpText : 'последующий',
        followUpTitleText : 'Последующий тип',
        leaderText : 'пользователь',
        longNotesText : 'заметки',
        longNotesTitleText : 'Заметки',
        otherInfoText : 'Прочая информация',
        priorityText : 'приоритет',
        priorityTitleText : 'Приоритет',
        regardingText : 'относительно',
        regardingTitleText : 'Тема дела',
        resultText : 'результат',
        resultTitleText : 'Результат',
        startingText : 'дата начала',
        startingFormatText : 'dd.MM.yyyy HH:mm',
        timelessText : 'вневременный',
        durationValueText : {
            0 : 'нет',
            15 : '15 минут',
            30 : '30 минут',
            60 : '1 час',
            90 : '1.5 часа',
            120 : '2 часа'
		},
        followupValueText : {
            none : 'Нет',
            atPhoneCall : 'Звонок',
            atAppointment : 'Встреча',
            atToDo : 'Выполнить'
		}
    });
    localize('Mobile.SalesLogix.Activity.Detail',{
        activityTypeText : {
            atToDo : 'Выполнить',
            atPhoneCall : 'Звонок',
            atAppointment : 'Встреча',
            atLiterature : 'Инф. материалы',
            atPersonal : 'Личные дела'
		},
        actionsText : 'Быстрые действия',
        completeActivityText : 'Завершить дело',
        alarmText : 'напоминание',
        alarmTimeText : 'напоминание',
        categoryText : 'категория',
        durationText : 'длительность',
        leaderText : 'пользователь',
        longNotesText : 'заметки',
        priorityText : 'приоритет',
        regardingText : 'относительно',
        rolloverText : 'автоматическое продление',
        startTimeText : 'время начала',
        allDayText : 'на весь день',
        timelessText : 'вневременный',
        titleText : 'Дело',
        typeText : 'тип',
        companyText : 'компания',
        leadText : 'нводка',
        accountText : 'субъект',
        contactText : 'контакт',
        opportunityText : 'сделка',
        ticketNumberText : 'заявка',
        whenText : 'Когда',
        whoText : 'Кто',
        startDateFormatText : 'dd.MM.yyyy HH:mm:ss',
        timelessDateFormatText : 'dd.MM.yyyy',
        alarmDateFormatText : 'dd.MM.yyyy HH:mm:ss'
    });
    localize('Mobile.SalesLogix.Activity.Edit',{
        activityCategoryTitleText : 'Категория дела',
        activityDescriptionTitleText : 'Описание Дела',
        activityTypeTitleText : 'Тип дела',
        alarmText : 'напоминание',
        alarmTimeText : '',
        categoryText : 'категория',
        durationText : 'длительность',
        durationTitleText : 'Длит.',
        durationInvalidText : 'Поле "{2}" должно быть заполнено.',
        reminderInvalidText : 'Поле "напоминание" должно быть заполнено.',
        reminderTitleText : 'Напомин.',
        leaderText : 'пользователь',
        longNotesText : 'заметки',
        longNotesTitleText : 'Заметки',
        priorityText : 'приоритет',
        priorityTitleText : 'Приоритет',
        regardingText : 'относительно',
        rolloverText : 'автоматическое продление',
        startingText : 'время начала',
        startingFormatText : 'dd.MM.yyyy HH:mm',
        timelessText : 'вневременный',
        titleText : 'Дело',
        typeText : 'тип',
        accountText : 'субъект',
        contactText : 'контакт',
        opportunityText : 'сделка',
        ticketNumberText : 'заявка',
        companyText : 'компания',
        leadText : 'нводка',
        isLeadText : 'для наводки',
        yesText : 'ДА',
        noText : 'НЕТ',
        updateUserActErrorText : 'Ошибка обновления дел пользователя.',
        reminderValueText : {
            0 : 'нет',
            5 : '5 минут',
            15 : '15 минут',
            30 : '30 минут',
            60 : '1 час',
            1440 : '1 день'
		},
        durationValueText : {
            0 : 'нет',
            15 : '15 минут',
            30 : '30 минут',
            60 : '1 час',
            90 : '1.5 часа',
            120 : '2 часа'
		}
    });
    localize('Mobile.SalesLogix.Activity.List',{
        startDateFormatText : 'ddd d.MM.yy',
        startTimeFormatText : 'HH:mm',
        titleText : 'Дела'
    });
    localize('Mobile.SalesLogix.Activity.TypesList',{
        titleText : 'Планировать...',
        activityTypeText : {
            atToDo : 'Выполнить',
            atPhoneCall : 'Звонок',
            atAppointment : 'Встреча',
            atLiterature : 'Инф. материалы',
            atPersonal : 'Личные дела'
		}
    });
    localize('Mobile.SalesLogix.Address.Edit',{
        address1Text : 'адрес 1',
        address2Text : 'адрес 2',
        address3Text : 'адрес 3',
        cityText : 'город',
        cityTitleText : 'Город',
        countryText : 'страна',
        countryTitleText : 'Страна',
        descriptionText : 'описание',
        descriptionTitleText : 'Описание',
        isMailingText : 'адрес доставки',
        isPrimaryText : 'основной',
        postalCodeText : 'индекс',
        salutationText : 'обращение',
        stateText : 'область',
        stateTitleText : 'Штат',
        titleText : 'Адрес'
    });
    localize('Mobile.SalesLogix.Calendar.MonthView',{
        titleText : 'Календарь',
        todayText : 'Сегодня',
        dayText : 'День',
        weekText : 'Неделя',
        monthText : 'Месяц',
        allDayText : 'день',
        monthTitleFormatText : 'MMMM yyyy',
        dayTitleFormatText : 'ddd d MMM yyyy',
        dayStartTimeFormatText : 'HH:mm'
    });
    localize('Mobile.SalesLogix.Calendar.UserActivityList',{
        titleText : 'Календарь',
        dateHeaderFormatText : 'dddd, dd.MM.yyyy',
        startTimeFormatText : 'HH:mm',
        todayText : 'Сегодня',
        dayText : 'День',
        weekText : 'Неделя',
        monthText : 'Месяц',
        allDayText : 'день'
    });
    localize('Mobile.SalesLogix.Calendar.WeekView',{
        titleText : 'Календарь',
        weekTitleFormatText : 'd MMM yyyy',
        dayHeaderLeftFormatText : 'ddd',
        dayHeaderRightFormatText : 'd MMM yyyy',
        startTimeFormatText : 'HH:mm',
        todayText : 'Сегодня',
        dayText : 'День',
        weekText : 'Неделя',
        monthText : 'Месяц',
        allDayText : 'день'
    });
    localize('Mobile.SalesLogix.Campaign.Detail',{
        acctMgrText : 'менеджер',
        codeText : 'код',
        createDateText : 'дата создания',
        createUserText : 'создал',
        fbarHomeTitleText : 'домой',
        fbarScheduleTitleText : 'планировать',
        nameText : 'имя',
        startText : 'старт',
        titleText : 'Маркетинг'
    });
    localize('Mobile.SalesLogix.Campaign.Edit',{
        codeText : 'код',
        nameText : 'имя',
        startText : 'старт',
        titleText : 'Маркетинг'
    });
    localize('Mobile.SalesLogix.Campaign.List',{
        titleText : 'Маркетинг'
    });
    localize('Mobile.SalesLogix.Contact.Detail',{
        activityTypeText : {
            atPhoneCall : 'Звонок',
            atEMail : 'Эл. почта'
		},
        accountText : 'субъект',
        acctMgrText : 'менеджер',
        addressText : 'адрес',
        contactTitleText : 'должность',
        createDateText : 'дата создания',
        createUserText : 'создал',
        emailText : 'эл.почта',
        faxText : 'факс',
        homeText : 'дом. тел.',
        nameText : 'контакт',
        ownerText : 'доступ',
        actionsText : 'Быстрые действия',
        relatedAccountsText : 'Субъекты',
        relatedActivitiesText : 'Дела',
        relatedHistoriesText : 'Заметки/История',
        relatedItemsText : 'Связанные записи',
        relatedNotesText : 'Заметки',
        relatedOpportunitiesText : 'Сделки',
        relatedTicketsText : 'Заявки',
        titleText : 'Контакт',
        webText : 'веб:',
        workText : 'телефон',
        callMobileNumberText : 'Позвонить на мобильный',
        callWorkNumberText : 'Позвонить на основной тел.',
        scheduleActivityText : 'Запланировать дело',
        addNoteText : 'Добавить заметки',
        sendEmailText : 'Отправить email',
        viewAddressText : 'Просмотр адресов',
        moreDetailsText : 'Подробнее'
    });
    localize('Mobile.SalesLogix.Contact.Edit',{
        titleText : 'Контакт',
        nameText : 'имя',
        workText : 'телефон',
        mobileText : 'моб. тел.',
        emailText : 'эл.почта',
        webText : 'веб:',
        acctMgrText : 'менеджер',
        accountNameText : 'субъект',
        homePhoneText : 'дом. тел.',
        faxText : 'факс',
        addressText : 'адрес',
        contactTitleText : 'должность',
        titleTitleText : 'Должность',
        addressTitleText : 'Адрес',
        ownerText : 'доступ'
    });
    localize('Mobile.SalesLogix.Contact.List',{
        titleText : 'Контакты',
        activitiesText : 'Дела',
        notesText : 'Заметки',
        scheduleText : 'Планировать'
    });
    localize('Mobile.SalesLogix.Contract.Detail',{
        accountText : 'субъект',
        activeText : 'активный',
        contactText : 'контакт',
        contractTypeText : 'тип контакта',
        createDateText : 'дата создания',
        createUserText : 'создал',
        endText : 'конец',
        fbarHomeTitleText : 'домой',
        fbarScheduleTitleText : 'планировать',
        quantityText : 'кол-во',
        refNumText : 'refNum',
        relatedItemsText : 'Связанные записи',
        relatedTicketsText : 'Заявки',
        remainingText : 'остаток',
        startText : 'старт',
        svcTypeText : 'svc-Type',
        titleText : 'Контракт'
    });
    localize('Mobile.SalesLogix.Contract.Edit',{
        titleText : 'Контракт',
        refNumText : 'refNum',
        quantityText : 'кол-во',
        activeText : 'активный'
    });
    localize('Mobile.SalesLogix.Contract.List',{
        titleText : 'Контракты'
    });
    localize('Mobile.SalesLogix.Defect.Detail',{
        areaText : 'область',
        assignedText : 'назначенный',
        categoryText : 'категория',
        createDateText : 'дата создания',
        createUserText : 'создал',
        defectIdText : 'id дефекта',
        fbarHomeTitleText : 'домой',
        fbarNewTitleText : 'новый',
        fbarScheduleTitleText : 'планировать',
        moreText : 'еще >>',
        priorityText : 'приоритет',
        relatedDefectProblemsText : 'Проблема',
        relatedDefectSolutionsText : 'Решение',
        relatedItemsText : 'Связанные записи',
        reportDateText : 'дата отчета',
        severityText : 'точность',
        statusText : 'статус',
        subjectText : 'тема',
        titleText : 'Дефект'
    });
    localize('Mobile.SalesLogix.Defect.Edit',{
        idPrefixText : 'id prefix',
        idSuffixText : 'id suffix',
        titleText : 'Дефект',
        areaText : 'область',
        categoryText : 'категория',
        subjectText : 'тема'
    });
    localize('Mobile.SalesLogix.Defect.List',{
        titleText : 'Дефекты'
    });
    localize('Mobile.SalesLogix.DefectProblem.Detail',{
        createDateText : 'дата создания',
        createUserText : 'создал',
        notesText : 'заметки',
        titleText : 'Проблема'
    });
    localize('Mobile.SalesLogix.DefectProblem.Edit',{
        notesText : 'заметки',
        titleText : 'Решение дефекта'
    });
    localize('Mobile.SalesLogix.DefectSolution.Detail',{
        createDateText : 'дата создания',
        createUserText : 'создал',
        notesText : 'заметки',
        titleText : 'Решение дефекта'
    });
    localize('Mobile.SalesLogix.DefectSolution.Edit',{
        notesText : 'заметки',
        titleText : 'Решение дефекта'
    });
    localize('Mobile.SalesLogix.History.Detail',{
        categoryText : 'категория',
        completedText : 'заверненный',
        durationText : 'длительность',
        leaderText : 'пользователь',
        longNotesText : 'заметки',
        notesText : 'Заметки',
        priorityText : 'приоритет',
        regardingText : 'относительно',
        scheduledText : 'планировать',
        timelessText : 'вневременный',
        companyText : 'компания',
        leadText : 'нводка',
        titleText : 'История',
        accountText : 'субъект',
        contactText : 'контакт',
        opportunityText : 'сделка',
        ticketNumberText : 'заявка',
        moreDetailsText : 'Подробнее',
        relatedItemsText : 'Связанные записи',
        modifiedText : 'изменено',
        typeText : 'тип',
        activityTypeText : {
            atToDo : 'Выполнить',
            atPhoneCall : 'Звонок',
            atAppointment : 'Встреча',
            atLiterature : 'Инф. материалы',
            atPersonal : 'Личные дела',
            atQuestion : 'Вопрос',
            atEMail : 'Эл. почта'
		},
        dateFormatText : 'dd.MM.yyyy HH:mm:ss'
    });
    localize('Mobile.SalesLogix.History.Edit',{
        accountText : 'субъект',
        noteDescriptionTitleText : 'Описание заметки',
        contactText : 'контакт',
        longNotesText : 'заметки',
        longNotesTitleText : 'Заметки',
        opportunityText : 'сделка',
        ticketNumberText : 'заявка',
        regardingText : 'относительно',
        isLeadText : 'для наводки',
        startingText : 'время',
        startingFormatText : 'dd.MM.yyyy HH:mm',
        titleText : 'Заметка',
        companyText : 'компания',
        leadText : 'нводка',
        relatedItemsText : 'Связанные записи'
    });
    localize('Mobile.SalesLogix.History.List',{
        activityTypeText : {
            atToDo : 'Выполнить',
            atPhoneCall : 'Звонок',
            atAppointment : 'Встреча',
            atLiterature : 'Инф. материалы',
            atPersonal : 'Личные дела',
            atQuestion : 'Вопрос',
            atEMail : 'Эл. почта'
		},
        hourMinuteFormatText : 'HH:mm',
        dateFormatText : 'd.MM.yy',
        hashTagQueriesText : {
            note : 'заметка',
            phonecall : 'тел. звонок',
            meeting : 'встреча',
            personal : 'личное',
            email : 'эл.почта'
		},
        titleText : 'Заметки/История'
    });
    localize('Mobile.SalesLogix.Lead.Detail',{
        activityTypeText : {
            atPhoneCall : 'Звонок',
            atEMail : 'Эл. почта'
		},
        accountText : 'компания',
        addressText : 'адрес',
        businessDescriptionText : 'описание бизнеса',
        createDateText : 'дата создания',
        createUserText : 'создал',
        eMailText : 'эл.почта',
        leadSourceText : 'источник наводки',
        industryText : 'отрасль',
        interestsText : 'интересы',
        leadTitleText : 'должность',
        nameText : 'имя',
        notesText : 'комментарии',
        ownerText : 'доступ',
        relatedActivitiesText : 'Дела',
        relatedHistoriesText : 'Заметки/История',
        relatedItemsText : 'Связанные записи',
        relatedNotesText : 'Заметки',
        sicCodeText : 'sic код',
        titleText : 'Наводка',
        tollFreeText : 'справ. тел.',
        webText : 'веб:',
        workText : 'телефон',
        actionsText : 'Быстрые действия',
        callWorkNumberText : 'Позвонить на основной тел.',
        scheduleActivityText : 'Запланировать дело',
        addNoteText : 'Добавить заметки',
        sendEmailText : 'Отправить email',
        viewAddressText : 'Просмотр адресов',
        moreDetailsText : 'Подробнее',
        calledText : 'Вызов {0}',
        emailedText : 'Отправлено {0}'
    });
    localize('Mobile.SalesLogix.Lead.Edit',{
        accountText : 'субъект',
        addressText : 'адрес',
        businessText : 'описание бизнеса',
        businessTitleText : 'Описание бизнеса',
        companyText : 'компания',
        contactTitleText : 'должность',
        emailText : 'эл.почта',
        faxText : 'факс',
        importSourceText : 'источник наводки',
        industryText : 'отрасль',
        industryTitleText : 'Отрасль',
        interestsText : 'интересы',
        leadNameLastFirstText : 'имя',
        leadOwnerText : 'доступ',
        nameText : 'имя',
        notesText : 'комментарии',
        notesTitleText : 'Комментарии',
        sicCodeText : 'sic код',
        titleText : 'Наводка',
        titleTitleText : 'Должность',
        tollFreeText : 'справ. тел.',
        webText : 'веб:',
        workText : 'телефон'
    });
    localize('Mobile.SalesLogix.Lead.List',{
        titleText : 'Наводки',
        activitiesText : 'Дела',
        notesText : 'Заметки',
        scheduleText : 'Планировать'
    });
    localize('Mobile.SalesLogix.LeadSource.List',{
        titleText : 'Источники наводки'
    });
    localize('Mobile.SalesLogix.Opportunity.Detail',{
        accountText : 'субъект',
        acctMgrText : 'менеджер',
        estCloseText : 'закрыта (план)',
        fbarHomeTitleText : 'домой',
        fbarScheduleTitleText : 'планировать',
        importSourceText : 'источник наводки',
        opportunityText : 'сделка',
        ownerText : 'доступ',
        actionsText : 'Быстрые действия',
        potentialText : 'потенциал',
        probabilityText : 'вероятность',
        relatedActivitiesText : 'Дела',
        relatedContactsText : 'Контакты',
        relatedHistoriesText : 'Заметки/История',
        relatedItemsText : 'Связанные записи',
        relatedNotesText : 'Заметки',
        relatedProductsText : 'Продукты',
        resellerText : 'реселлер',
        statusText : 'статус',
        titleText : 'Сделка',
        typeText : 'тип',
        scheduleActivityText : 'Запланировать дело',
        addNoteText : 'Добавить заметки',
        moreDetailsText : 'Подробнее'
    });
    localize('Mobile.SalesLogix.Opportunity.Edit',{
        accountText : 'субъект',
        acctMgrText : 'менеджер',
        estCloseText : 'закрыта (план)',
        importSourceText : 'источник наводки',
        opportunityProbabilityTitleText : 'Вероятность сделки',
        opportunityStatusTitleText : 'Статус Сделки',
        opportunityText : 'сделка',
        opportunityTypeTitleText : 'Тип сделки',
        ownerText : 'доступ',
        potentialText : 'потенциал',
        probabilityText : 'вероятность',
        resellerText : 'реселлер',
        statusText : 'статус',
        titleText : 'Сделка',
        typeText : 'тип'
    });
    localize('Mobile.SalesLogix.Opportunity.List',{
        titleText : 'Сделки',
        activitiesText : 'Дела',
        notesText : 'Заметки',
        scheduleText : 'Планировать',
        hashTagQueriesText : {
            open : 'открыта',
            closed : 'закрытая',
            won : 'выиграна',
            lost : 'проиграна'
		}
    });
    localize('Mobile.SalesLogix.OpportunityProduct.List',{
        titleText : 'Продукты'
    });
    localize('Mobile.SalesLogix.Owner.List',{
        titleText : 'Владельцы'
    });
    localize('Mobile.SalesLogix.Return.Detail',{
        accountText : 'субъект',
        assignedToText : 'Поручено',
        createDateText : 'дата создания',
        createUserText : 'создал',
        fbarHomeTitleText : 'домой',
        fbarScheduleTitleText : 'планировать',
        priorityText : 'приоритет',
        regDateText : 'дата регистрации',
        returnedByText : 'возвратить',
        returnIdText : 'возращенный id',
        shipToText : 'доставить в',
        titleText : 'Возврат',
        typeText : 'тип'
    });
    localize('Mobile.SalesLogix.Return.Edit',{
        titleText : 'Возврат',
        returnIdText : 'возращенный id',
        priorityText : 'приоритет',
        typeText : 'тип',
        regDateText : 'дата регистрации',
        returnedByText : 'возвратить'
    });
    localize('Mobile.SalesLogix.Return.List',{
        titleText : 'Возвраты'
    });
    localize('Mobile.SalesLogix.SalesOrder.Detail',{
        accountText : 'субъект',
        acctMgrText : 'менеджер',
        commentsText : 'комментарии',
        createDateText : 'дата создания',
        createUserText : 'создал',
        fbarHomeTitleText : 'домой',
        fbarScheduleTitleText : 'планировать',
        reqDateText : 'треб. дата',
        salesOrderIdText : 'ид заказа',
        statusText : 'статус',
        titleText : 'Заказ на продажи',
        totalText : 'всего',
        typeText : 'тип'
    });
    localize('Mobile.SalesLogix.SalesOrder.Edit',{
        commentsText : 'комментарии',
        reqDateText : 'треб. дата',
        salesOrderIdText : 'ид заказа',
        statusText : 'статус',
        titleText : 'Заказ на продажи',
        totalText : 'всего',
        typeText : 'тип'
    });
    localize('Mobile.SalesLogix.SalesOrder.List',{
        titleText : 'Заказ на продажи'
    });
    localize('Mobile.SalesLogix.Ticket.Detail',{
        accountText : 'субъект',
        areaText : 'область',
        assignedDateText : 'дата поручения',
        assignedToText : 'поручено',
        categoryText : 'категория',
        contactText : 'контакт',
        contractText : 'контракт',
        descriptionText : 'описание',
        issueText : 'вопрос',
        needByText : 'необходима дата',
        notesText : 'комментарии',
        phoneText : 'телефон',
        actionsText : 'Быстрые действия',
        relatedActivitiesText : 'Дела',
        relatedItemsText : 'Связанные записи',
        resolutionText : 'решение',
        sourceText : 'источник',
        statusText : 'статус',
        subjectText : 'тема',
        ticketIdText : 'номер заявки',
        titleText : 'Заявка',
        urgencyText : 'срочность',
        scheduleActivityText : 'Запланировать дело',
        moreDetailsText : 'Подробнее'
    });
    localize('Mobile.SalesLogix.Ticket.Edit',{
        accountText : 'субъект',
        areaText : 'область',
        assignedDateText : 'дата поручения',
        assignedToText : 'поручено',
        categoryText : 'категория',
        contactText : 'контакт',
        contractText : 'контракт',
        descriptionText : 'описание',
        descriptionTitleText : 'Описание',
        issueText : 'вопрос',
        needByText : 'необходима дата',
        notesText : 'комментарии',
        notesTitleText : 'Комментарии',
        phoneText : 'телефон',
        relatedActivitiesText : 'Дела',
        relatedItemsText : 'Связанные записи',
        resolutionText : 'решение',
        resolutionTitleText : 'Решение',
        sourceText : 'источник',
        sourceTitleText : 'Источник',
        statusText : 'статус',
        subjectText : 'тема',
        ticketAreaTitleText : 'Область заявки',
        ticketCategoryTitleText : 'Категория заявки',
        ticketIdText : 'номер заявки',
        ticketIssueTitleText : 'Проблема заявки',
        ticketStatusTitleText : 'Статус заявки',
        ticketUrgencyTitleText : 'Срочность заявки',
        titleText : 'Заявка',
        urgencyText : 'срочность'
    });
    localize('Mobile.SalesLogix.Ticket.List',{
        titleText : 'Заявки',
        activitiesText : 'Дела',
        scheduleText : 'Планировать'
    });
    localize('Mobile.SalesLogix.Ticket.UrgencyLookup',{
        titleText : 'Срочность заявки'
    });
    localize('Mobile.SalesLogix.User.List',{
        titleText : 'Пользователи'
    });
    localize('Sage.Platform.Mobile.Calendar',{
        validationSummaryText : 'Результат проверки',
        titleText : 'Календарь',
        amText : 'AM',
        pmText : 'PM',
        invalidHourErrorText : 'Не правильный формат часа',
        invalidMinuteErrorText : 'Не правильный формат минут'
    });
    localize('Sage.Platform.Mobile.Controls.AddressField',{
        lookupLabelText : 'редактировать',
        emptyText : 'нет адреса'
    });
    localize('Sage.Platform.Mobile.Controls.BooleanField',{
        onText : 'Вкл.',
        offText : 'Выкл.'
    });
    localize('Sage.Platform.Mobile.Controls.DateField',{
        emptyText : '',
        dateFormatText : 'dd.MM.yyyy',
        invalidDateFormatErrorText : 'Поле "{0}" имеет неправильный формат даты.'
    });
    localize('Sage.Platform.Mobile.Controls.EditorField',{
        lookupLabelText : 'редактировать',
        lookupText : '...',
        emptyText : 'пусто',
        completeText : 'Ок'
    });
    localize('Sage.Platform.Mobile.Controls.LookupField',{
        dependentErrorText : 'Значение для "{0}" должно быть выбрано.',
        emptyText : '',
        completeText : 'Выбрать',
        lookupLabelText : 'быстрый поиск',
        lookupText : '...'
    });
    localize('Sage.Platform.Mobile.Controls.NameField',{
        emptyText : 'нет имени'
    });
    localize('Sage.Platform.Mobile.Controls.NoteField',{
        emptyText : ''
    });
    localize('Sage.Platform.Mobile.Detail',{
        editText : 'Изменить',
        titleText : 'Детали',
        detailsText : 'Детали',
        toggleCollapseText : 'свернуть/развернуть',
        loadingText : 'загрузка...',
        requestErrorText : 'Ошибка сервера при запросе данных.',
        notAvailableText : 'Запрашиваемая запись недоступна.'
    });
    localize('Sage.Platform.Mobile.Edit',{
        saveText : 'Сохранить',
        titleText : 'Изменить',
        toggleCollapseText : 'свернуть/развернуть',
        validationSummaryText : 'Результат проверки',
        detailsText : 'Детали',
        loadingText : 'загрузка...',
        requestErrorText : 'Ошибка сервера при запросе данных.'
    });
    localize('Sage.Platform.Mobile.GroupedList',{
        toggleCollapseText : 'свернуть/развернуть'
    });
    localize('Sage.Platform.Mobile.List',{
        moreText : 'Получить больше записей',
        emptySelectionText : 'Нет',
        titleText : 'Список',
        remainingText : 'осталось {0} записей',
        searchText : 'Поиск',
        cancelText : 'Отмена',
        insertText : 'Создать',
        noDataText : 'нет записей',
        loadingText : 'загрузка...',
        requestErrorText : 'Ошибка сервера при запросе данных.'
    });
    localize('Sage.Platform.Mobile.MainToolbar',{
        titleText : 'Мобильный тел.'
    });
    localize('Sage.Platform.Mobile.View',{
        titleText : 'Общий вид'
    });
    
})();

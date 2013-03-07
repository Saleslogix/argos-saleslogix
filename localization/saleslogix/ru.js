define('localization/saleslogix/ru', ['localization/ru', 'Mobile/SalesLogix/ApplicationModule'], function() {

localize("Sage.Platform.Mobile.Fields.DateField", {
  "dateFormatText": "dd.MM.yyyy",
  "emptyText": "",
  "invalidDateFormatErrorText": "Поле '${0}' имеет недопустимый формат даты."
});

localize("Mobile.SalesLogix.Views.Activity.Complete", {
  "completedFormatText": "dd.MM.yyyy hh:mm tt",
  "startingFormatText": "dd.MM.yyyy hh:mm tt",
  "activityInfoText": "Инф. о деле",
  "accountText": "субъект",
  "contactText": "контакт",
  "opportunityText": "сделка",
  "ticketNumberText": "заявка",
  "companyText": "компания",
  "leadText": "наводка",
  "asScheduledText": "как запланировано",
  "categoryText": "категория",
  "categoryTitleText": "Категория дела",
  "completedText": "дата завершения",
  "completionText": "Завершение",
  "durationText": "длительность",
  "durationInvalidText": "Поле '${2}' должно быть заполнено.",
  "carryOverNotesText": "перенос заметок",
  "followUpText": "последующий",
  "followUpTitleText": "Последующий тип",
  "leaderText": "пользователь",
  "longNotesText": "заметки",
  "longNotesTitleText": "Заметки",
  "otherInfoText": "Прочая информация",
  "priorityText": "приоритет",
  "priorityTitleText": "Приоритет",
  "regardingText": "относительно",
  "regardingTitleText": "Тема дела",
  "resultText": "результат",
  "resultTitleText": "Результат",
  "startingText": "дата начала",
  "startingFormatTimelessText": "dd.MM.yyyy",
  "timelessText": "в течение дня",
  "durationValueText": {
    "0": "нет",
    "15": "15 минут",
    "30": "30 минут",
    "60": "1 час",
    "90": "1.5 часа",
    "120": "2 часа"
  },
  "followupValueText": {
    "none": "Нет",
    "atPhoneCall": "Звонок",
    "atAppointment": "Встреча",
    "atToDo": "Дело",
    "atPersonal": "Личные дела"
  }
});

localize("Mobile.SalesLogix.Views.Activity.Detail", {
  "startDateFormatText": "dd.MM.yyyy hh:mm:ss tt",
  "timelessDateFormatText": "dd.MM.yyyy",
  "alarmDateFormatText": "dd.MM.yyyy hh:mm:ss tt",
  "activityTypeText": {
    "atToDo": "Дело",
    "atPhoneCall": "Звонок",
    "atAppointment": "Встреча",
    "atLiterature": "Инф. материалы",
    "atPersonal": "Личные дела"
  },
  "actionsText": "Быстрые действия",
  "completeActivityText": "Завершить дело",
  "completeOccurrenceText": "Завершить повторение",
  "completeSeriesText": "Завершить серию",
  "locationText": "место",
  "alarmText": "напоминание",
  "alarmTimeText": "напоминание",
  "categoryText": "категория",
  "durationText": "длительность",
  "leaderText": "пользователь",
  "longNotesText": "заметки",
  "priorityText": "приоритет",
  "regardingText": "относительно",
  "rolloverText": "автоматическое продление",
  "startTimeText": "время начала",
  "allDayText": "на весь день",
  "timelessText": "в течение дня",
  "titleText": "Дело",
  "typeText": "тип",
  "companyText": "компания",
  "leadText": "наводка",
  "accountText": "субъект",
  "contactText": "контакт",
  "opportunityText": "сделка",
  "ticketNumberText": "заявка",
  "whenText": "Когда",
  "whoText": "Кто",
  "recurrenceText": "повторение",
  "confirmEditRecurrenceText": "Редактировать все повторения?\\nОтмена для редактирования одного повторения."
});

localize("Mobile.SalesLogix.Views.Activity.Edit", {
  "startingFormatText": "dd.MM.yyyy hh:mm tt",
  "activityCategoryTitleText": "Категория дела",
  "activityDescriptionTitleText": "Описание Дела",
  "locationText": "место",
  "activityTypeTitleText": "Тип дела",
  "alarmText": "напоминание",
  "reminderText": "",
  "categoryText": "категория",
  "durationText": "длительность",
  "durationTitleText": "Длит.",
  "durationInvalidText": "Поле '${2}' должно быть заполнено.",
  "reminderInvalidText": "Поле 'напоминание' должно быть заполнено.",
  "reminderTitleText": "Напомин.",
  "leaderText": "пользователь",
  "longNotesText": "заметки",
  "longNotesTitleText": "Заметки",
  "priorityText": "приоритет",
  "priorityTitleText": "Приоритет",
  "regardingText": "относительно",
  "rolloverText": "автоматическое продление",
  "startingText": "время начала",
  "repeatsText": "повторяется",
  "recurringText": "повторение",
  "recurringTitleText": "Повторяющийся",
  "startingFormatTimelessText": "dd.MM.yyyy",
  "timelessText": "в течение дня",
  "titleText": "Дело",
  "typeText": "тип",
  "accountText": "субъект",
  "contactText": "контакт",
  "opportunityText": "сделка",
  "ticketNumberText": "заявка",
  "companyText": "компания",
  "leadText": "наводка",
  "isLeadText": "для наводки",
  "yesText": "ДА",
  "noText": "НЕТ",
  "updateUserActErrorText": "Ошибка обновления дел пользователя.",
  "reminderValueText": {
    "0": "нет",
    "5": "5 минут",
    "15": "15 минут",
    "30": "30 минут",
    "60": "1 час",
    "1440": "1 день"
  },
  "durationValueText": {
    "0": "нет",
    "15": "15 минут",
    "30": "30 минут",
    "60": "1 час",
    "90": "1.5 часа",
    "120": "2 часа"
  }
});

localize("Mobile.SalesLogix.Views.Activity.List", {
  "startDateFormatText": "ddd dd.MM.yy",
  "startTimeFormatText": "hh:mm",
  "allDayText": "Весь день",
  "titleText": "Дела"
});

localize("Mobile.SalesLogix.Views.Calendar.DayView", {
  "dateHeaderFormatText": "dddd, dd.MM.yyyy",
  "startTimeFormatText": "hh:mm",
  "titleText": "Календарь",
  "todayText": "Сегодня",
  "dayText": "День",
  "weekText": "Неделя",
  "monthText": "Месяц",
  "allDayText": "Весь день",
  "eventHeaderText": "События",
  "activityHeaderText": "Дела",
  "eventMoreText": "Показать еще ${0} событие(ий)",
  "toggleCollapseText": "свернуть/развернуть"
});

localize("Mobile.SalesLogix.Views.Calendar.MonthView", {
  "monthTitleFormatText": "MMMM yyyy",
  "dayTitleFormatText": "ddd d MMM yyyy",
  "startTimeFormatText": "hh:mm",
  "titleText": "Календарь",
  "todayText": "Сегодня",
  "dayText": "День",
  "weekText": "Неделя",
  "monthText": "Месяц",
  "allDayText": "Весь день",
  "eventText": "Событие",
  "eventHeaderText": "События",
  "countMoreText": "Показать еще ${0}",
  "activityHeaderText": "Дела",
  "toggleCollapseText": "свернуть/развернуть"
});

localize("Mobile.SalesLogix.Views.Calendar.WeekView", {
  "weekTitleFormatText": "d MMM yyyy",
  "dayHeaderLeftFormatText": "dddd",
  "dayHeaderRightFormatText": "d MMM yyyy",
  "startTimeFormatText": "hh:mm",
  "titleText": "Календарь",
  "todayText": "Сегодня",
  "dayText": "День",
  "weekText": "Неделя",
  "monthText": "Месяц",
  "allDayText": "Весь день",
  "eventHeaderText": "События",
  "eventMoreText": "Показать еще ${0} событие(ий)",
  "toggleCollapseText": "свернуть/развернуть"
});

localize("Mobile.SalesLogix.Views.ErrorLog.Detail", {
  "errorDateFormatText": "dd.MM.yyyy hh:mm tt",
  "titleText": "Журнал ошибок",
  "detailsText": "Детали",
  "errorDateText": "дата",
  "statusTextText": "ошибка",
  "urlText": "url",
  "moreDetailsText": "Подробнее",
  "severityText": "точность",
  "statusCodeText": "код сост.",
  "errorText": "ошибка",
  "emailSubjectText": "Получена ошибка в мобильном клиенте Sage SalesLogix",
  "copiedSuccessText": "Скопировать в буфер обмена"
});

localize("Mobile.SalesLogix.Views.ErrorLog.List", {
  "errorDateFormatText": "dd.MM.yyyy hh:mm tt",
  "titleText": "Журналы ошибок"
});

localize("Mobile.SalesLogix.Views.Event.Detail", {
  "startDateFormatText": "dd.MM.yyyy hh:mm:ss tt",
  "endDateFormatText": "dd.MM.yyyy hh:mm:ss tt",
  "eventTypeText": {
    "atToDo": "Дело",
    "atPhoneCall": "Звонок",
    "atAppointment": "Встреча",
    "atLiterature": "Инф. материалы",
    "atPersonal": "Личные дела"
  },
  "actionsText": "Быстрые действия",
  "startTimeText": "дата начала",
  "endTimeText": "дата окончания",
  "titleText": "Событие",
  "descriptionText": "описание",
  "typeText": "тип",
  "whenText": "Когда"
});

localize("Mobile.SalesLogix.Views.Event.List", {
  "eventDateFormatText": "dd.MM.yyyy",
  "titleText": "События",
  "eventText": "Событие"
});

localize("Mobile.SalesLogix.Views.History.Detail", {
  "dateFormatText": "dd.MM.yyyy hh:mm:ss tt",
  "categoryText": "категория",
  "completedText": "завершенное",
  "durationText": "длительность",
  "leaderText": "пользователь",
  "longNotesText": "заметки",
  "notesText": "Заметки",
  "priorityText": "приоритет",
  "regardingText": "относительно",
  "completedByText": "завершено",
  "scheduledText": "планировать",
  "timelessText": "в течение дня",
  "companyText": "компания",
  "leadText": "наводка",
  "titleText": "История",
  "accountText": "субъект",
  "contactText": "контакт",
  "opportunityText": "сделка",
  "ticketNumberText": "заявка",
  "moreDetailsText": "Подробнее",
  "relatedItemsText": "Связанные записи",
  "modifiedText": "изменено",
  "typeText": "тип",
  "activityTypeText": {
    "atToDo": "Дело",
    "atPhoneCall": "Звонок",
    "atAppointment": "Встреча",
    "atLiterature": "Инф. материалы",
    "atPersonal": "Личные дела",
    "atQuestion": "Вопрос",
    "atEMail": "Эл. почта"
  }
});

localize("Mobile.SalesLogix.Views.History.Edit", {
  "startingFormatText": "dd.MM.yyyy hh:mm tt",
  "accountText": "субъект",
  "noteDescriptionTitleText": "Описание заметки",
  "contactText": "контакт",
  "longNotesText": "заметки",
  "longNotesTitleText": "Заметки",
  "opportunityText": "сделка",
  "ticketNumberText": "заявка",
  "regardingText": "относительно",
  "isLeadText": "для наводки",
  "startingText": "время",
  "titleText": "Заметка",
  "companyText": "компания",
  "leadText": "наводка",
  "relatedItemsText": "Связанные записи",
  "yesText": "ДА",
  "noText": "НЕТ"
});

localize("Mobile.SalesLogix.Views.History.List", {
  "hourMinuteFormatText": "hh:mm",
  "dateFormatText": "dd.MM.yy",
  "activityTypeText": {
    "atToDo": "Дело",
    "atPhoneCall": "Звонок",
    "atAppointment": "Встреча",
    "atLiterature": "Инф. материалы",
    "atPersonal": "Личные дела",
    "atQuestion": "Вопрос",
    "atEMail": "Эл. почта"
  },
  "hashTagQueriesText": {
    "note": "заметка",
    "phonecall": "тел. звонок",
    "meeting": "встреча",
    "personal": "личное",
    "email": "эл.почта"
  },
  "titleText": "Комментарии/История",
  "viewAccountActionText": "тема",
  "viewOpportunityActionText": "Сделка",
  "viewContactActionText": "Контакт"
});

localize("Mobile.SalesLogix.Views.TicketActivity.Edit", {
  "startingFormatText": "dd.MM.yyyy hh:mm tt",
  "titleText": "Измен. дело по заявке",
  "activityTypeText": "тип",
  "activityTypeTitleText": "Тип",
  "publicAccessText": "публичный доступ",
  "publicAccessTitleText": "Публичный доступ",
  "userText": "пользователь",
  "startDateText": "дата начала",
  "endDateText": "дата окончания",
  "commentsText": "комментарии"
});

localize("Mobile.SalesLogix.Views.TicketActivity.List", {
  "startDateFormatText": "dd.MM.yyyy hh:mm tt",
  "titleText": "Дела по заявке"
});

localize("Sage.Platform.Mobile.Calendar", {
  "titleText": "Календарь",
  "amText": "AM",
  "pmText": "PM"
});

localize("Sage.Platform.Mobile.Detail", {
  "editText": "Изменить",
  "titleText": "Детали",
  "detailsText": "Детали",
  "toggleCollapseText": "свернуть/развернуть",
  "loadingText": "загрузка...",
  "requestErrorText": "Ошибка сервера при запросе данных.",
  "notAvailableText": "Запрашиваемая запись недоступна."
});

localize("Sage.Platform.Mobile.Edit", {
  "saveText": "Сохранить",
  "titleText": "Изменить",
  "toggleCollapseText": "свернуть/развернуть",
  "validationSummaryText": "Результат проверки",
  "detailsText": "Детали",
  "loadingText": "загрузка...",
  "requestErrorText": "Ошибка сервера при запросе данных."
});

localize("Sage.Platform.Mobile.ErrorManager", {
  "abortedText": "Прервано",
  "scopeSaveText": "Cфера деятельности не сохраняется в отчете об ошибке"
});

localize("Sage.Platform.Mobile.Fields.BooleanField", {
  "onText": "Вкл.",
  "offText": "Выкл."
});

localize("Sage.Platform.Mobile.Fields.DurationField", {
  "emptyText": "",
  "invalidDurationErrorText": "Значение поля '${0}' не является допустимым значением продолжительности.",
  "autoCompleteText": {
    "1": "минут(а)",
    "60": "час(ов)",
    "1440": "день(дней)",
    "10080": "неделя(и)",
    "525960": "год(ы)"
  }
});

localize("Sage.Platform.Mobile.Fields.EditorField", {
  "lookupLabelText": "редактировать",
  "lookupText": "...",
  "emptyText": "пусто",
  "completeText": "Ок"
});

localize("Sage.Platform.Mobile.Fields.LookupField", {
  "dependentErrorText": "Поле '${0}' должно быть заполнено.",
  "emptyText": "",
  "completeText": "Выбрать",
  "lookupLabelText": "быстрый поиск",
  "lookupText": "..."
});

localize("Sage.Platform.Mobile.Fields.NoteField", {
  "emptyText": ""
});

localize("Sage.Platform.Mobile.Fields.SignatureField", {
  "signatureLabelText": "подпись",
  "signatureText": "..."
});

localize("Sage.Platform.Mobile.Format", {
  "yesText": "Да",
  "noText": "Нет",
  "trueText": "T",
  "falseText": "F",
  "hoursText": "часы",
  "hourText": "час",
  "minutesText": "Минуты",
  "minuteText": "минута"
});

localize("Sage.Platform.Mobile.GroupedList", {
  "toggleCollapseText": "свернуть/развернуть"
});

localize("Sage.Platform.Mobile.List", {
  "moreText": "Получить больше записей",
  "emptySelectionText": "Нет",
  "titleText": "Список",
  "remainingText": "Осталось ${0} записей",
  "cancelText": "Отмена",
  "insertText": "Создать",
  "noDataText": "нет записей",
  "loadingText": "загрузка...",
  "requestErrorText": "Ошибка сервера при запросе данных."
});

localize("Sage.Platform.Mobile.MainToolbar", {
  "titleText": "Мобильный тел."
});

localize("Sage.Platform.Mobile.SearchWidget", {
  "searchText": "Поиск"
});

localize("Sage.Platform.Mobile.View", {
  "titleText": "Общий вид"
});

localize("Sage.Platform.Mobile.Views.Signature", {
  "titleText": "Подпись",
  "clearCanvasText": "Стереть",
  "undoText": "Отменить ввод"
});

localize("Mobile.SalesLogix.Action", {
  "calledText": "Звонок ${0}",
  "emailedText": "Отпр. писем ${0}"
});

localize("Mobile.SalesLogix.Fields.AddressField", {
  "lookupLabelText": "редактировать",
  "emptyText": ""
});

localize("Mobile.SalesLogix.Fields.NameField", {
  "emptyText": ""
});

localize("Mobile.SalesLogix.Fields.RecurrencesField", {
  "titleText": "Повторяющийся",
  "emptyText": ""
});

localize("Mobile.SalesLogix.Recurrence", {
  "neverText": "Никогда",
  "daysText": "Дней",
  "dailyText": "Ежедневно",
  "weeksText": "недели",
  "weeklyText": "Еженедельно",
  "weeklyOnText": "Еженедельно по ${3}",
  "monthsText": "месяцы",
  "monthlyText": "Ежемесячно",
  "monthlyOnDayText": "Ежемесячно, ${1}-го числа",
  "monthlyOnText": "Ежемесячно по ${5} ${3}",
  "yearsText": "годы",
  "yearlyText": "Ежегодно",
  "yearlyOnText": "Ежегодно ${2}",
  "yearlyOnWeekdayText": "Ежегодно по ${5} ${3} в ${4}",
  "everyText": "каждые ${0} ${1}",
  "afterCompletionText": "после завершения",
  "untilEndDateText": "${0} до ${1}",
  "ordText": {
    "0": "день",
    "1": "имя",
    "2": "второй",
    "3": "третий",
    "4": "четвертый",
    "5": "фамилия"
  }
});

localize("Mobile.SalesLogix.Validator", {
  "exists": {
    "message": "Поле '${2}' должно быть заполнено."
  },
  "name": {
    "message": "В поле '${2}' должны быть указаны имя и фамилия."
  },
  "notEmpty": {
    "message": "Поле '${2}' не может быть пустым."
  },
  "hasText": {
    "test": "",
    "message": "Поле '${2}' должно содержать текст."
  },
  "isInteger": {
    "message": "Значение '${0}' не является допустимым числом."
  },
  "isDecimal": {
    "message": "Значение '${0}' не является допустимым числом."
  },
  "isCurrency": {
    "message": "Значение '${0}' не является допустимым значением для денежного поля."
  },
  "isInt32": {
    "message": "Значение поля '${2}' выходит за пределы допустимого числового диапазона."
  },
  "exceedsMaxTextLength": {
    "message": "Значение поля '${2}' превышает допустимую длину."
  },
  "isDateInRange": {
    "message": "Значение поля '${2}' выходит за пределы допустимого диапазона дат."
  }
});

localize("Mobile.SalesLogix.Views.Account.Detail", {
  "accountText": "субъект",
  "acctMgrText": "менеджер",
  "addressText": "адрес",
  "businessDescriptionText": "описание бизнеса",
  "createDateText": "дата создания",
  "createUserText": "создал",
  "faxText": "факс",
  "importSourceText": "источник наводки",
  "industryText": "отрасль",
  "notesText": "заметки",
  "ownerText": "доступ",
  "phoneText": "телефон",
  "activityTypeText": {
    "atPhoneCall": "Звонок"
  },
  "actionsText": "Быстрые действия",
  "relatedActivitiesText": "Дела",
  "relatedContactsText": "Контакты",
  "relatedHistoriesText": "Комментарии/История",
  "relatedItemsText": "Связанные записи",
  "relatedNotesText": "Заметки",
  "relatedOpportunitiesText": "Сделки",
  "relatedTicketsText": "Заявки",
  "relatedAddressesText": "Адреса",
  "statusText": "статус",
  "subTypeText": "подтип",
  "titleText": "тема",
  "typeText": "тип",
  "webText": "веб:",
  "callMainNumberText": "Позвонить на основной тел.",
  "scheduleActivityText": "Запланировать дело",
  "addNoteText": "Добавить заметки",
  "viewAddressText": "Просмотр адресов",
  "moreDetailsText": "Подробнее",
  "calledText": "Звонок ${0}"
});

localize("Mobile.SalesLogix.Views.Account.Edit", {
  "accountStatusTitleText": "Статус субъекта",
  "accountSubTypeTitleText": "Подтип субъекта",
  "accountText": "субъект",
  "accountTypeTitleText": "Тип субъекта",
  "acctMgrText": "менеджер",
  "businessDescriptionText": "описание бизнеса",
  "businessDescriptionTitleText": "Описание бизнеса",
  "descriptionText": "описание",
  "faxText": "факс",
  "fullAddressText": "адрес",
  "importSourceText": "источник наводки",
  "industryText": "отрасль",
  "industryTitleText": "Отрасль",
  "ownerText": "доступ",
  "phoneText": "телефон",
  "statusText": "статус",
  "subTypeText": "подтип",
  "titleText": "тема",
  "typeText": "тип",
  "webText": "веб:"
});

localize("Mobile.SalesLogix.Views.Account.List", {
  "titleText": "Субъекты",
  "activitiesText": "Дела",
  "notesText": "Заметки",
  "scheduleText": "Планировать",
  "editActionText": "Изменить",
  "callMainActionText": "Звонок на осн. тел.",
  "viewContactsActionText": "Контакты",
  "addNoteActionText": "Добавить заметку",
  "addActivityActionText": "Добавить дело"
});

localize("Mobile.SalesLogix.Views.Activity.Recurring", {
  "startingText": "дата начала",
  "endingText": "дата окончания",
  "repeatsText": "повторяется",
  "everyText": "каждый",
  "afterCompletionText": "после завершения",
  "singleWeekdayText": "день недели",
  "weekdaysText": "будний день(и)",
  "dayText": "день",
  "monthText": "месяц",
  "onText": "на",
  "occurrencesText": "повторений",
  "summaryText": "сводка",
  "frequencyOptionsText": {
    "0": "Дней",
    "1": "недели",
    "2": "месяцы",
    "3": "годы"
  },
  "recurringFrequencyText": "Частота повторения",
  "yesText": "Да",
  "noText": "Нет",
  "titleText": "Повторения"
});

localize("Mobile.SalesLogix.Views.Activity.TypesList", {
  "titleText": "Планировать...",
  "activityTypeText": {
    "atToDo": "Дело",
    "atPhoneCall": "Звонок",
    "atAppointment": "Встреча",
    "atLiterature": "Инф. материалы",
    "atPersonal": "Личные дела",
    "event": "Событие"
  }
});

localize("Mobile.SalesLogix.Views.AddAccountContact", {
  "accountNameText": "субъект",
  "accountStatusTitleText": "Статус субъекта",
  "accountSubTypeTitleText": "Подтип субъекта",
  "accountText": "тема",
  "accountTypeTitleText": "Тип субъекта",
  "addressText": "адрес",
  "contactTitleText": "Должность",
  "descriptionText": "описание",
  "detailsAccountText": "Инф. о субъекте",
  "detailsContactText": "Инф. о контакте",
  "detailsText": "Инф. о контакте/субъекте",
  "emailText": "эл.почта",
  "faxText": "факс",
  "homePhoneText": "дом. тел.",
  "industryText": "отрасль",
  "lastNameText": "фамилия",
  "mobileText": "моб. тел.",
  "nameText": "имя",
  "statusText": "статус",
  "subTypeText": "подтип",
  "titleText": "Создать Контакт/Субъект",
  "typeText": "тип",
  "webText": "веб:",
  "workText": "раб. тел.",
  "industryTitleText": "Отрасль"
});

localize("Mobile.SalesLogix.Views.Address.Edit", {
  "address1Text": "адрес 1",
  "address2Text": "адрес 2",
  "address3Text": "адрес 3",
  "cityText": "город",
  "cityTitleText": "Город",
  "countryText": "страна",
  "countryTitleText": "Страна",
  "descriptionText": "описание",
  "descriptionTitleText": "Описание",
  "isMailingText": "адрес доставки",
  "isPrimaryText": "основной",
  "postalCodeText": "индекс",
  "salutationText": "обращение",
  "stateText": "область",
  "stateTitleText": "Область",
  "titleText": "Адрес"
});

localize("Mobile.SalesLogix.Views.Address.List", {
  "titleText": "Адреса"
});

localize("Mobile.SalesLogix.Views.AreaCategoryIssueLookup", {
  "titleText": "Субъекты"
});

localize("Mobile.SalesLogix.Views.Competitor.List", {
  "titleText": "Конкуренты"
});

localize("Mobile.SalesLogix.Views.Configure", {
  "titleText": "Настройка"
});

localize("Mobile.SalesLogix.Views.Contact.Detail", {
  "activityTypeText": {
    "atPhoneCall": "Звонок",
    "atEMail": "Эл. почта"
  },
  "accountText": "субъект",
  "acctMgrText": "менеджер",
  "addressText": "адрес",
  "contactTitleText": "должность",
  "createDateText": "дата создания",
  "createUserText": "создал",
  "emailText": "эл.почта",
  "faxText": "факс",
  "homeText": "дом. тел.",
  "nameText": "контакт",
  "ownerText": "доступ",
  "actionsText": "Быстрые действия",
  "relatedAccountsText": "Субъекты",
  "relatedActivitiesText": "Дела",
  "relatedHistoriesText": "Комментарии/История",
  "relatedItemsText": "Связанные записи",
  "relatedNotesText": "Заметки",
  "relatedOpportunitiesText": "Сделки",
  "relatedTicketsText": "Заявки",
  "relatedAddressesText": "Адреса",
  "titleText": "Контакт",
  "webText": "веб:",
  "workText": "телефон",
  "cuisinePreferenceText": "кухня",
  "callMobileNumberText": "Позвонить на мобильный",
  "callWorkNumberText": "Позвонить на основной тел.",
  "scheduleActivityText": "Запланировать дело",
  "addNoteText": "Добавить заметки",
  "sendEmailText": "Отправить email",
  "viewAddressText": "Просмотр адресов",
  "moreDetailsText": "Подробнее"
});

localize("Mobile.SalesLogix.Views.Contact.Edit", {
  "titleText": "Контакт",
  "nameText": "имя",
  "workText": "телефон",
  "mobileText": "моб. тел.",
  "emailText": "эл.почта",
  "webText": "веб:",
  "acctMgrText": "менеджер",
  "accountNameText": "субъект",
  "homePhoneText": "дом. тел.",
  "faxText": "факс",
  "addressText": "адрес",
  "contactTitleText": "должность",
  "titleTitleText": "Должность",
  "addressTitleText": "Адрес",
  "ownerText": "доступ",
  "cuisinePreferenceText": "кухня",
  "cuisinePreferenceTitleText": "Кухня"
});

localize("Mobile.SalesLogix.Views.Contact.List", {
  "titleText": "Контакты",
  "activitiesText": "Дела",
  "notesText": "Заметки",
  "scheduleText": "Планировать",
  "editActionText": "Изменить",
  "callMainActionText": "Звонок на осн. тел.",
  "callMobileActionText": "Звонок на моб. тел.",
  "sendEmailActionText": "Эл.почта",
  "viewAccountActionText": "тема",
  "addNoteActionText": "Добавить заметку",
  "addActivityActionText": "Добавить дело"
});

localize("Mobile.SalesLogix.Views.Contract.List", {
  "titleText": "Контракты"
});

localize("Mobile.SalesLogix.Views.Event.Edit", {
  "titleText": "Событие",
  "typeText": "тип",
  "descriptionText": "описание",
  "startDateText": "дата начала",
  "endDateText": "дата окончания"
});

localize("Mobile.SalesLogix.Views.FooterToolbar", {
  "copyrightText": "&copy; 2012 Sage Software, Inc. Все права защищены.",
  "logOutConfirmText": "Вы уверены, что хотите выйти из системы?",
  "settingsText": "Настройки",
  "helpText": "Помощь",
  "topText": "Верх",
  "logOutText": "Выход"
});

localize("Mobile.SalesLogix.Views.Help", {
  "titleText": "Помощь",
  "errorText": "Ошибка",
  "errorMessageText": "Не удается загрузить файл справки."
});

localize("Mobile.SalesLogix.Views.Home", {
  "configureText": "Настройка",
  "addAccountContactText": "Создать Контакт/Субъект",
  "titleText": "Домой",
  "actionsText": "Быстрые действия",
  "viewsText": "Перейти"
});

localize("Mobile.SalesLogix.Views.Lead.Detail", {
  "activityTypeText": {
    "atPhoneCall": "Звонок",
    "atEMail": "Эл. почта"
  },
  "accountText": "компания",
  "addressText": "адрес",
  "businessDescriptionText": "описание бизнеса",
  "createDateText": "дата создания",
  "createUserText": "создал",
  "eMailText": "эл.почта",
  "leadSourceText": "источник наводки",
  "industryText": "отрасль",
  "interestsText": "интересы",
  "leadTitleText": "должность",
  "nameText": "имя",
  "notesText": "комментарии",
  "ownerText": "доступ",
  "relatedActivitiesText": "Дела",
  "relatedHistoriesText": "Комментарии/История",
  "relatedItemsText": "Связанные записи",
  "relatedNotesText": "Заметки",
  "sicCodeText": "sic код",
  "titleText": "Наводка",
  "tollFreeText": "справ. тел.",
  "webText": "веб:",
  "workText": "телефон",
  "actionsText": "Быстрые действия",
  "callWorkNumberText": "Позвонить на основной тел.",
  "scheduleActivityText": "Запланировать дело",
  "addNoteText": "Добавить заметки",
  "sendEmailText": "Отправить email",
  "viewAddressText": "Просмотр адресов",
  "moreDetailsText": "Подробнее",
  "calledText": "Звонок ${0}",
  "emailedText": "Отправлено ${0}"
});

localize("Mobile.SalesLogix.Views.Lead.Edit", {
  "accountText": "субъект",
  "addressText": "адрес",
  "businessText": "описание бизнеса",
  "businessTitleText": "Описание бизнеса",
  "companyText": "компания",
  "contactTitleText": "должность",
  "emailText": "эл.почта",
  "faxText": "факс",
  "importSourceText": "источник наводки",
  "industryText": "отрасль",
  "industryTitleText": "Отрасль",
  "interestsText": "интересы",
  "leadNameLastFirstText": "имя",
  "leadOwnerText": "доступ",
  "nameText": "имя",
  "notesText": "комментарии",
  "notesTitleText": "Комментарии",
  "sicCodeText": "sic код",
  "titleText": "Наводка",
  "titleTitleText": "Должность",
  "tollFreeText": "справ. тел.",
  "webText": "веб:",
  "workText": "телефон"
});

localize("Mobile.SalesLogix.Views.Lead.List", {
  "titleText": "Наводки",
  "activitiesText": "Дела",
  "notesText": "Заметки",
  "scheduleText": "Планировать",
  "emailedText": "Отпр. писем ${0}",
  "calledText": "Звонок ${0}",
  "editActionText": "Изменить",
  "callMainActionText": "Звонок на осн. тел.",
  "sendEmailActionText": "Эл.почта",
  "addNoteActionText": "Добавить заметку",
  "addActivityActionText": "Добавить дело"
});

localize("Mobile.SalesLogix.Views.LeadSource.List", {
  "titleText": "Источники наводки"
});

localize("Mobile.SalesLogix.Views.Login", {
  "copyrightText": "&copy; 2012 Sage Software, Inc. Все права защищены.",
  "logOnText": "Вход",
  "passText": "пароль",
  "rememberText": "запомнить",
  "titleText": "Sage SalesLogix",
  "userText": "пользователь",
  "invalidUserText": "Неправильное имя пользователя или пароль.",
  "missingUserText": "Пользователь не был найден.",
  "serverProblemText": "Возникла проблема на сервере.",
  "requestAbortedText": "Запрос был прерван."
});

localize("Mobile.SalesLogix.Views.MainToolbar", {
  "titleText": "Sage Saleslogix"
});

localize("Mobile.SalesLogix.Views.NameEdit", {
  "titleText": "Изменить имя",
  "firstNameText": "имя",
  "middleNameText": "отчество",
  "lastNameText": "фамилия",
  "prefixText": "префикс",
  "prefixTitleText": "Префикс имени",
  "suffixText": "суфикс",
  "suffixTitleText": "Суффикс имени"
});

localize("Mobile.SalesLogix.Views.Opportunity.Detail", {
  "accountText": "субъект",
  "acctMgrText": "менеджер",
  "estCloseText": "закрыта (план)",
  "fbarHomeTitleText": "домой",
  "fbarScheduleTitleText": "планировать",
  "importSourceText": "источник наводки",
  "opportunityText": "сделка",
  "ownerText": "доступ",
  "actionsText": "Быстрые действия",
  "potentialText": "потенциал",
  "probabilityText": "вероятность",
  "relatedActivitiesText": "Дела",
  "relatedContactsText": "Контакты сделки",
  "relatedHistoriesText": "Комментарии/История",
  "relatedItemsText": "Связанные записи",
  "relatedNotesText": "Заметки",
  "relatedProductsText": "Продукты",
  "resellerText": "реселлер",
  "statusText": "статус",
  "titleText": "Сделка",
  "typeText": "тип",
  "scheduleActivityText": "Запланировать дело",
  "addNoteText": "Добавить заметки",
  "moreDetailsText": "Подробнее"
});

localize("Mobile.SalesLogix.Views.Opportunity.Edit", {
  "accountText": "субъект",
  "acctMgrText": "менеджер",
  "estCloseText": "закрыта (план)",
  "importSourceText": "источник наводки",
  "opportunityStatusTitleText": "Статус Сделки",
  "opportunityText": "сделка",
  "opportunityTypeTitleText": "Тип сделки",
  "ownerText": "доступ",
  "potentialText": "потенциал",
  "probabilityText": "вероятность",
  "probabilityTitleText": "Вероятность сделки",
  "resellerText": "реселлер",
  "statusText": "статус",
  "titleText": "Сделка",
  "typeText": "тип"
});

localize("Mobile.SalesLogix.Views.Opportunity.List", {
  "titleText": "Сделки",
  "activitiesText": "Дела",
  "notesText": "Заметки",
  "scheduleText": "Планировать",
  "editActionText": "Изменить",
  "viewAccountActionText": "тема",
  "viewContactsActionText": "Контакты",
  "viewProductsActionText": "Продукты",
  "addNoteActionText": "Добавить заметку",
  "addActivityActionText": "Добавить дело",
  "hashTagQueriesText": {
    "open": "открыта",
    "closed": "закрыта",
    "won": "выиграна",
    "lost": "проиграна"
  }
});

localize("Mobile.SalesLogix.Views.OpportunityContact.Detail", {
  "titleText": "Контакт сделки",
  "accountText": "субъект",
  "contactTitleText": "должность",
  "nameText": "контакт",
  "moreDetailsText": "Подробнее",
  "salesRoleText": "роль",
  "strategyText": "стратегия",
  "personalBenefitsText": "личная выгода",
  "standingText": "оценка",
  "issuesText": "проблемы",
  "competitorNameText": "конкурент",
  "removeContactTitleText": "Удаление контакта",
  "confirmDeleteText": "Удалить \"${0}\" из сделки?",
  "contactText": "Контакт"
});

localize("Mobile.SalesLogix.Views.OpportunityContact.Edit", {
  "titleText": "Изменить контакт сделки",
  "nameText": "имя",
  "accountNameText": "субъект",
  "contactTitleText": "должность",
  "salesRoleText": "роль",
  "salesRoleTitleText": "Роль",
  "personalBenefitsText": "личная выгода.",
  "strategyText": "стратегия",
  "issuesText": "проблемы",
  "standingText": "оценка",
  "standingTitleText": "Оценка предложения",
  "contactText": "Контакт",
  "competitorPrefText": "конкурент"
});

localize("Mobile.SalesLogix.Views.OpportunityContact.List", {
  "titleText": "Контакты сделки",
  "selectTitleText": "Выбор контакта",
  "activitiesText": "Дела",
  "notesText": "Заметки",
  "scheduleText": "Планировать"
});

localize("Mobile.SalesLogix.Views.OpportunityProduct.List", {
  "titleText": "Продукты"
});

localize("Mobile.SalesLogix.Views.Owner.List", {
  "titleText": "Владельцы"
});

localize("Mobile.SalesLogix.Views.Settings", {
  "clearLocalStorageTitleText": "Очистить хранилище",
  "clearAuthenticationTitleText": "Очистить сохраненные учетные данные",
  "errorLogTitleText": "Просмотр журналов ошибок",
  "localStorageClearedText": "Локальное хранилище данных успешно очищено.",
  "credentialsClearedText": "Сохраненные учетные данные очищены успешно.",
  "titleText": "Настройки"
});

localize("Mobile.SalesLogix.Views.TextEdit", {
  "titleText": "Изменить текст"
});

localize("Mobile.SalesLogix.Views.Ticket.Detail", {
  "accountText": "субъект",
  "areaText": "область",
  "assignedDateText": "дата поручения",
  "assignedToText": "поручено",
  "categoryText": "категория",
  "contactText": "контакт",
  "contractText": "контракт",
  "descriptionText": "описание",
  "issueText": "вопрос",
  "needByText": "необходима дата",
  "notesText": "комментарии",
  "phoneText": "телефон",
  "actionsText": "Быстрые действия",
  "relatedActivitiesText": "Дела",
  "relatedItemsText": "Связанные записи",
  "resolutionText": "решение",
  "sourceText": "источник",
  "statusText": "статус",
  "subjectText": "тема",
  "ticketIdText": "номер заявки",
  "titleText": "Заявка",
  "urgencyText": "срочность",
  "scheduleActivityText": "Запланировать дело",
  "moreDetailsText": "Подробнее",
  "relatedTicketActivitiesText": "Дела по заявке",
  "loadingText": "загрузка..."
});

localize("Mobile.SalesLogix.Views.Ticket.Edit", {
  "accountText": "субъект",
  "areaText": "область",
  "assignedDateText": "дата поручения",
  "assignedToText": "поручено",
  "categoryText": "категория",
  "contactText": "контакт",
  "contractText": "контракт",
  "descriptionText": "описание",
  "descriptionTitleText": "Описание",
  "issueText": "вопрос",
  "needByText": "необходима дата",
  "notesText": "комментарии",
  "notesTitleText": "Комментарии",
  "phoneText": "телефон",
  "relatedActivitiesText": "Дела",
  "relatedItemsText": "Связанные записи",
  "resolutionText": "решение",
  "resolutionTitleText": "Решение",
  "sourceText": "источник",
  "sourceTitleText": "Источник",
  "statusText": "статус",
  "subjectText": "тема",
  "ticketAreaTitleText": "Область заявки",
  "ticketCategoryTitleText": "Категория заявки",
  "ticketIdText": "номер заявки",
  "ticketIssueTitleText": "Проблема заявки",
  "ticketStatusTitleText": "Статус заявки",
  "ticketUrgencyTitleText": "Срочность заявки",
  "titleText": "Заявка",
  "urgencyText": "срочность"
});

localize("Mobile.SalesLogix.Views.Ticket.List", {
  "titleText": "Заявки",
  "activitiesText": "Дела",
  "scheduleText": "Планировать",
  "notAssignedText": "Не назначен",
  "editActionText": "Изменить",
  "viewAccountActionText": "тема",
  "viewContactActionText": "Контакт",
  "addNoteActionText": "Добавить заметку",
  "addActivityActionText": "Добавить дело"
});

localize("Mobile.SalesLogix.Views.Ticket.UrgencyLookup", {
  "titleText": "Срочность заявки"
});

localize("Mobile.SalesLogix.Views.TicketActivity.Detail", {
  "titleText": "Дело по заявке",
  "accountText": "субъект",
  "contactText": "контакт",
  "typeText": "тип",
  "publicAccessText": "публичный доступ",
  "assignedDateText": "дата начала",
  "completedDateText": "дата окончания",
  "followUpText": "завершено",
  "unitsText": "затрачено ед. времени",
  "elapsedUnitsText": "прошло единиц",
  "rateTypeDescriptionText": "тип затрат",
  "rateText": "ставка",
  "totalLaborText": "всего трудозатрат",
  "totalPartsText": "всего компонентов",
  "totalFeeText": "общая стоимость",
  "activityDescriptionText": "комментарии",
  "ticketNumberText": "номер заявки",
  "userText": "пользователь",
  "completeTicketText": "Завершить дело по заявке",
  "moreDetailsText": "Подробнее",
  "relatedItemsText": "Связанные записи",
  "relatedTicketActivityItemText": "Компоненты дела по заявке"
});

localize("Mobile.SalesLogix.Views.TicketActivity.RateLookup", {
  "titleText": "Ставка"
});

localize("Mobile.SalesLogix.Views.TicketActivityItem.Detail", {
  "titleText": "Компоненты дела по заявке",
  "productNameText": "продукт",
  "skuText": "Единица учета",
  "serialNumberText": "серийный №",
  "itemAmountText": "цена",
  "itemDescriptionText": "описание"
});

localize("Mobile.SalesLogix.Views.TicketActivityItem.List", {
  "titleText": "Компоненты дела по заявке"
});

localize("Mobile.SalesLogix.UpdateToolbar", {
  "updateText": "Обновление доступно. Нажмите, чтобы обновить."
});

localize("Mobile.SalesLogix.Views.User.List", {
  "titleText": "Пользователи"
});
});
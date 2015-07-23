define('localization/saleslogix/ru', ['localization/ru', 'Mobile/SalesLogix/ApplicationModule'], function() {

localize("argos.Calendar", {
  "timeFormatText": "H:mm",
  "titleText": "Календарь",
  "amText": "д. п.",
  "pmText": "п. п.",
  "monthsShortText": {
    "0": "Янв",
    "1": "Фев",
    "2": "Мар",
    "3": "Апр",
    "4": "Май",
    "5": "Июнь",
    "6": "Июль",
    "7": "Авг",
    "8": "Сен",
    "9": "Окт",
    "10": "Ноя",
    "11": "Дек"
  }
});

localize("argos.Fields.DateField", {
  "dateFormatText": "DD.MM.YYYY",
  "emptyText": "",
  "invalidDateFormatErrorText": "Некорректный формат даты в поле \"${0}\"."
});

localize("argos.Format", {
  "shortDateFormatText": "D.M.YYYY",
  "percentFormatText": "${0}${1}",
  "yesText": "Да",
  "noText": "Нет",
  "trueText": "И",
  "falseText": "Л",
  "hoursText": "Часы",
  "hourText": "час",
  "minutesText": "Минуты",
  "minuteText": "минута",
  "bytesText": "байт"
});

localize("crm.GroupUtility", {
  "groupDateFormatText": "D.M.YYYY H:mm"
});

localize("crm.Recurrence", {
  "dayFormatText": "D",
  "monthFormatText": "M",
  "monthAndDayFormatText": "D.M",
  "weekdayFormatText": "dddd",
  "endDateFormatText": "D.M.YYYY",
  "neverText": "Никогда",
  "daysText": "Дней",
  "dailyText": "Ежедневно",
  "weeksText": "недель",
  "weeklyText": "Еженедельно",
  "weeklyOnText": "Еженедельно (${3})",
  "monthsText": "месяцев",
  "monthlyText": "Ежемесячно",
  "monthlyOnDayText": "Ежемесячно (${1}-го числа)",
  "monthlyOnText": "Ежемесячно (${5} ${3})",
  "yearsText": "лет",
  "yearlyText": "Ежегодно",
  "yearlyOnText": "Ежегодно (${2})",
  "yearlyOnWeekdayText": "Ежегодно (${5} ${3} в ${4})",
  "everyText": "каждые ${0} ${1}",
  "afterCompletionText": "по завершении",
  "untilEndDateText": "${0} вплоть до ${1}",
  "weekDaysText": {
    "0": "Воскресенье",
    "1": "Понедельник",
    "2": "Вторник",
    "3": "Среда",
    "4": "Четверг",
    "5": "Пятница",
    "6": "Суббота"
  },
  "ordText": {
    "0": "День",
    "1": "Первый",
    "2": "втор.",
    "3": "трет.",
    "4": "четверт.",
    "5": "Фамилия"
  }
});

localize("crm.Views.Activity.Complete", {
  "completedFormatText": "D.M.YYYY H:mm",
  "startingFormatText": "D.M.YYYY H:mm",
  "startingTimelessFormatText": "D.M.YYYY",
  "activityInfoText": "Информация о действии",
  "accountText": "Субъект",
  "contactText": "Контакт",
  "opportunityText": "Сделка",
  "ticketNumberText": "Заявка",
  "companyText": "Компания",
  "leadText": "Наводка",
  "asScheduledText": "Как запланировано",
  "categoryText": "Категория",
  "categoryTitleText": "Категория действия",
  "completedText": "Дата завершен.",
  "completionText": "Завершение",
  "durationText": "Длительность",
  "durationInvalidText": "Поле \"${2}\" должно иметь значение.",
  "carryOverNotesText": "Перенести заметки",
  "followUpText": "Следующее дело",
  "followUpTitleText": "Тип дальнейших действий",
  "leaderText": "Исполнитель",
  "longNotesText": "Заметки",
  "longNotesTitleText": "Заметки",
  "otherInfoText": "Прочая информация",
  "priorityText": "Приоритет",
  "priorityTitleText": "Приоритет",
  "regardingText": "Тема",
  "regardingTitleText": "Относительно действия",
  "resultText": "Результат",
  "resultTitleText": "Результат",
  "startingText": "Дата начала",
  "timelessText": "В течение дня",
  "durationValueText": {
    "0": "Нет",
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
    "atToDo": "Выполнить",
    "atPersonal": "Личные дела"
  }
});

localize("crm.Views.Activity.Detail", {
  "startDateFormatText": "D.M.YYYY H:mm",
  "timelessDateFormatText": "D.M.YYYY",
  "alarmDateFormatText": "D.M.YYYY H:mm",
  "activityTypeText": {
    "atToDo": "Выполнить",
    "atPhoneCall": "Звонок",
    "atAppointment": "Встреча",
    "atLiterature": "Инф. материалы",
    "atPersonal": "Личные дела"
  },
  "actionsText": "Быстрые действия",
  "completeActivityText": "Завершить дело",
  "completeOccurrenceText": "Выполнить повторение",
  "completeSeriesText": "Выполнить серию",
  "locationText": "Размещение",
  "alarmText": "С_оповещением",
  "alarmTimeText": "С_оповещением",
  "categoryText": "Категория",
  "durationText": "Длительность",
  "leaderText": "Исполнитель",
  "longNotesText": "Заметки",
  "priorityText": "Приоритет",
  "regardingText": "Тема",
  "rolloverText": "Автопродление",
  "startTimeText": "Время начала",
  "allDayText": "Дата начала",
  "timelessText": "В_течение_дня",
  "titleText": "Дело",
  "typeText": "Тип",
  "companyText": "Компания",
  "leadText": "Наводка",
  "accountText": "Субъект",
  "contactText": "Контакт",
  "opportunityText": "Сделка",
  "ticketNumberText": "Заявка",
  "whenText": "Когда",
  "whoText": "Кто",
  "recurrenceText": "периодичность",
  "confirmEditRecurrenceText": "Изменить все повторения? Отмена для изменения одного повторения.",
  "relatedAttachmentText": "Вложения",
  "relatedAttachmentTitleText": "Вложения действия",
  "relatedItemsText": "Связанные элементы",
  "phoneText": "Телефон",
  "moreDetailsText": "Подробнее"
});

localize("crm.Views.Activity.Edit", {
  "startingFormatText": "D.M.YYYY H:mm",
  "startingTimelessFormatText": "D.M.YYYY",
  "activityCategoryTitleText": "Категория действия",
  "activityDescriptionTitleText": "Описание Дела",
  "locationText": "Размещение",
  "activityTypeTitleText": "Тип дела",
  "alarmText": "Оповещение",
  "reminderText": "Напоминание",
  "categoryText": "Категория",
  "durationText": "Длительность",
  "durationTitleText": "Длительность",
  "durationInvalidText": "Поле \"${2}\" должно иметь значение.",
  "reminderInvalidText": "Поле \"напоминание\" должно иметь значение.",
  "reminderTitleText": "Напоминание",
  "leaderText": "Исполнитель",
  "longNotesText": "Заметки",
  "longNotesTitleText": "Заметки",
  "priorityText": "Приоритет",
  "priorityTitleText": "Приоритет",
  "regardingText": "Тема",
  "rolloverText": "Автопродление",
  "startingText": "Время начала",
  "repeatsText": "Повтор",
  "recurringText": "Повторяющиеся",
  "recurringTitleText": "Повторяющиеся",
  "timelessText": "Без-времени",
  "titleText": "Дело",
  "typeText": "Тип",
  "accountText": "Субъект",
  "contactText": "Контакт",
  "opportunityText": "Сделка",
  "ticketNumberText": "Заявка",
  "companyText": "Компания",
  "leadText": "Наводка",
  "isLeadText": "Это наводка",
  "yesText": "Да",
  "noText": "Нет",
  "phoneText": "Телефон",
  "updateUserActErrorText": "Сбой при обновлении пользовательских действий.",
  "reminderValueText": {
    "0": "Нет",
    "5": "5 минут",
    "15": "15 минут",
    "30": "30 минут",
    "60": "1 час",
    "1440": "1 день"
  },
  "durationValueText": {
    "0": "Нет",
    "15": "15 минут",
    "30": "30 минут",
    "60": "1 час",
    "90": "1,5 часа",
    "120": "2 часа"
  }
});

localize("crm.Views.Attachment.List", {
  "attachmentDateFormatText": "ddd D.M.YYYY HH:mm",
  "titleText": "Вложения",
  "uploadedOnText": "Загружено ",
  "hashTagQueriesText": {
    "url": "URL",
    "binary": "Файл"
  }
});

localize("crm.Views.Attachment.ViewAttachment", {
  "attachmentDateFormatText": "ddd D.M.YYYY H:mm",
  "detailsText": "Информация о вложении",
  "descriptionText": "Описание",
  "fileNameText": "Название файла",
  "attachDateText": "дата вложения",
  "fileSizeText": "Размер файла",
  "userText": "Пользователь",
  "attachmentNotSupportedText": "Тип вложения не поддерживается для просмотра.",
  "downloadingText": "Загрузка вложения ...",
  "notSupportedText": "Ваше устройство не поддерживает просмотр вложений."
});

localize("crm.Views.Calendar.DayView", {
  "eventDateFormatText": "D.M.YYYY",
  "dateHeaderFormatText": "dddd, D.M.YYYY",
  "startTimeFormatText": "H:mm",
  "titleText": "Календарь",
  "todayText": "Сегодняшние",
  "dayText": "День",
  "weekText": "Неделя",
  "monthText": "Месяц",
  "allDayText": "Круглосуточн.",
  "eventHeaderText": "События",
  "activityHeaderText": "Дела",
  "eventMoreText": "Больше событий",
  "toggleCollapseText": "показать/скрыть"
});

localize("crm.Views.Calendar.MonthView", {
  "monthTitleFormatText": "MMMM YYYY",
  "dayTitleFormatText": "ddd D.MMMM YYYY",
  "eventDateFormatText": "D.M.YYYY",
  "startTimeFormatText": "H:mm",
  "titleText": "Календарь",
  "todayText": "Сегодняшние",
  "dayText": "День",
  "weekText": "Неделя",
  "monthText": "Месяц",
  "allDayText": "Круглосуточн.",
  "eventText": "Событие",
  "eventHeaderText": "События",
  "countMoreText": "Показать больше",
  "activityHeaderText": "Дела",
  "toggleCollapseText": "показать/скрыть",
  "weekDaysShortText": {
    "0": "Вс",
    "1": "Пн",
    "2": "Вт",
    "3": "Ср",
    "4": "Чт",
    "5": "Пт",
    "6": "Сб"
  }
});

localize("crm.Views.Calendar.WeekView", {
  "weekTitleFormatText": "D.MMM YYYY",
  "dayHeaderLeftFormatText": "dddd",
  "dayHeaderRightFormatText": "D.MMM YYYY",
  "eventDateFormatText": "D.M.YYYY",
  "startTimeFormatText": "H:mm",
  "titleText": "Календарь",
  "todayText": "Сегодняшние",
  "dayText": "День",
  "weekText": "Неделя",
  "monthText": "Месяц",
  "allDayText": "Дата начала",
  "eventHeaderText": "События",
  "eventMoreText": "Показать больше событий (${0})",
  "toggleCollapseText": "показать/скрыть"
});

localize("crm.Views.ErrorLog.Detail", {
  "errorDateFormatText": "DD.MM.YYYY H:mm",
  "titleText": "Журнал ошибок",
  "detailsText": "Детали",
  "errorDateText": "Дата",
  "statusTextText": "Ошибка",
  "urlText": "URL",
  "moreDetailsText": "Подробнее",
  "errorText": "Ошибка",
  "emailSubjectText": "Получена ошибка в Saleslogix Mobile Client",
  "copiedSuccessText": "Скопировано в буфер"
});

localize("crm.Views.ErrorLog.List", {
  "errorDateFormatText": "DD.MM.YYYY H:mm",
  "titleText": "Журналы ошибок"
});

localize("crm.Views.Event.Detail", {
  "startDateFormatText": "D.M.YYYY H:mm",
  "endDateFormatText": "D.M.YYYY H:mm",
  "eventTypeText": {
    "atToDo": "Выполнить",
    "atPhoneCall": "Звонок",
    "atAppointment": "Встреча",
    "atLiterature": "Инф. материалы",
    "atPersonal": "Личные дела"
  },
  "actionsText": "Быстрые действия",
  "startTimeText": "Дата начала",
  "endTimeText": "Дата окончания",
  "titleText": "Событие",
  "descriptionText": "Описание",
  "typeText": "Тип",
  "whenText": "Когда"
});

localize("crm.Views.Event.Edit", {
  "startingFormatText": "D.M.YYYY H:mm",
  "titleText": "Событие",
  "typeText": "Тип",
  "descriptionText": "Описание",
  "startDateText": "Дата начала",
  "endDateText": "Дата окончания",
  "eventTypesText": {
    "Vacation": "Вакансия",
    "Business Trip": "Командировка",
    "Conference": "Конференция",
    "Holiday": "Праздник"
  }
});

localize("crm.Views.Event.List", {
  "eventDateFormatText": "D.M.YYYY",
  "titleText": "События",
  "eventText": "Событие"
});

localize("crm.Views.History.Detail", {
  "dateFormatText": "D.M.YYYY H:mm",
  "categoryText": "Категория",
  "completedText": "Заверш.",
  "durationText": "Длительность",
  "leaderText": "Исполнитель",
  "longNotesText": "Заметки",
  "notesText": "Заметки",
  "priorityText": "Приоритет",
  "regardingText": "Тема",
  "completedByText": "Завершено",
  "scheduledText": "Запланировано",
  "timelessText": "В_течение_дня",
  "companyText": "Компания",
  "leadText": "Наводка",
  "titleText": "История",
  "accountText": "Субъект",
  "contactText": "Контакт",
  "opportunityText": "Сделка",
  "ticketNumberText": "Заявка",
  "moreDetailsText": "Подробнее",
  "relatedItemsText": "Связанные элементы",
  "relatedAttachmentText": "Вложения",
  "relatedAttachmentTitleText": "Журнал вложений",
  "modifiedText": "Измененный",
  "typeText": "Тип",
  "activityTypeText": {
    "atToDo": "Выполнить",
    "atPhoneCall": "Звонок",
    "atAppointment": "Встреча",
    "atLiterature": "Инф. материалы",
    "atPersonal": "Личные дела",
    "atQuestion": "Вопрос",
    "atEMail": "Эл. почта"
  }
});

localize("crm.Views.History.Edit", {
  "startingFormatText": "D.M.YYYY H:mm",
  "accountText": "Субъект",
  "noteDescriptionTitleText": "Описание заметки",
  "contactText": "Контакт",
  "longNotesText": "Заметки",
  "longNotesTitleText": "Заметки",
  "opportunityText": "Сделка",
  "ticketNumberText": "Заявка",
  "regardingText": "Тема",
  "isLeadText": "Это наводка",
  "startingText": "Время",
  "titleText": "Заметка",
  "companyText": "Компания",
  "leadText": "Наводка",
  "relatedItemsText": "Связанные элементы",
  "yesText": "Да",
  "noText": "Нет",
  "validationText": "Поле \"${2}\" должно иметь значение.",
  "validationCanEditText": "У вас нет прав для редактирования"
});

localize("crm.Views.History.List", {
  "hourMinuteFormatText": "H:mm",
  "dateFormatText": "D.M.YY",
  "activityTypeText": {
    "atToDo": "Выполнить",
    "atPhoneCall": "Звонок",
    "atAppointment": "Встреча",
    "atLiterature": "Инф. материалы",
    "atPersonal": "Личные дела",
    "atQuestion": "Вопрос",
    "atEMail": "Эл. почта"
  },
  "hashTagQueriesText": {
    "my-history": "моя-история",
    "note": "Заметка",
    "phonecall": "Звонок",
    "meeting": "Встреча",
    "personal": "Личное",
    "email": "Эл.почта"
  },
  "titleText": "Заметки/История",
  "viewAccountActionText": "Субъект",
  "viewOpportunityActionText": "Возможность",
  "viewContactActionText": "Контакт",
  "addAttachmentActionText": "Добавить Вложение",
  "regardingText": "Тема: "
});

localize("crm.Views.Opportunity.Detail", {
  "exchangeRateDateFormatText": "D.M.YYYY H:mm",
  "accountText": "Субъект",
  "acctMgrText": "Менеджер",
  "estCloseText": "закрыта",
  "detailsText": "Детали",
  "fbarHomeTitleText": "Домой",
  "fbarScheduleTitleText": "Планировать",
  "importSourceText": "Источник наводки",
  "opportunityText": "Сделка",
  "ownerText": "Куратор",
  "actionsText": "Быстрые действия",
  "potentialText": "Потенциал продаж",
  "potentialBaseText": "потенциал (базовая ставка)",
  "potentialOpportunityText": "потенциал (ставка доходности)",
  "potentialMyRateText": "потенциал (моя ставка)",
  "probabilityText": "Вероятность закрытия",
  "relatedActivitiesText": "Дела",
  "relatedContactsText": "Контакты по сделке",
  "relatedHistoriesText": "Заметки/История",
  "relatedItemsText": "Связанные элементы",
  "relatedNotesText": "Заметки",
  "relatedProductsText": "Продукты",
  "relatedAttachmentText": "Вложения",
  "relatedAttachmentTitleText": "Вложения сделки",
  "resellerText": "Партнер",
  "statusText": "Статус",
  "titleText": "Сделка",
  "typeText": "Тип",
  "scheduleActivityText": "Планировать дело",
  "addNoteText": "Добавить заметку",
  "moreDetailsText": "Подробнее",
  "multiCurrencyText": "Мультивалют.",
  "multiCurrencyRateText": "Курс обмена",
  "multiCurrencyCodeText": "Код",
  "multiCurrencyDateText": "дата ставки",
  "multiCurrencyLockedText": "ставка заблок."
});

localize("crm.Views.Opportunity.Edit", {
  "exchangeRateDateFormatText": "D.M.YYYY H:mm",
  "accountText": "Субъект",
  "acctMgrText": "Менеджер",
  "estCloseText": "Закрыта",
  "importSourceText": "Источник наводки",
  "detailsText": "Детали",
  "opportunityStatusTitleText": "Статус Сделки",
  "opportunityText": "Сделка",
  "opportunityTypeTitleText": "Тип сделки",
  "ownerText": "Куратор",
  "potentialText": "Потенциал продаж",
  "probabilityText": "Вероятность закрытия",
  "probabilityTitleText": "Вероятность сделки",
  "resellerText": "Партнер",
  "statusText": "Статус",
  "titleText": "Сделка",
  "typeText": "Тип",
  "multiCurrencyText": "Мультивалют.",
  "multiCurrencyRateText": "Курс обмена",
  "multiCurrencyCodeText": "Код",
  "multiCurrencyDateText": "дата ставки",
  "multiCurrencyLockedText": "ставка заблок.",
  "subTypePickListResellerText": "Партнер"
});

localize("crm.Views.TicketActivity.Edit", {
  "startingFormatText": "D.M.YYYY H:mm",
  "titleText": "Измен. дело по заявке",
  "activityTypeText": "Тип",
  "activityTypeTitleText": "Тип",
  "publicAccessText": "Общий доступ",
  "publicAccessTitleText": "Общий доступ",
  "userText": "Пользователь",
  "startDateText": "Дата начала",
  "endDateText": "Дата окончания",
  "commentsText": "Комментарии"
});

localize("crm.Views.TicketActivity.List", {
  "startDateFormatText": "DD.MM.YYYY H:mm",
  "titleText": "Дела по заявке"
});

localize("argos.ErrorManager", {
  "abortedText": "Прервано",
  "scopeSaveText": "Область не сохраняется в отчете об ошибках"
});

localize("argos.Fields.DurationField", {
  "emptyText": "",
  "invalidDurationErrorText": "Поле \"${0}\" не является допустимой длительностью.",
  "autoCompleteText": {
    "1": "Минута(ы)",
    "60": "Час(ы)",
    "1440": "День(дней)",
    "10080": "нед.",
    "525960": "г."
  }
});

localize("argos.Fields.EditorField", {
  "lookupLabelText": "Изменить",
  "lookupText": "...",
  "emptyText": "пусто",
  "completeText": "Ок"
});

localize("argos.Fields.LookupField", {
  "dependentErrorText": "Необходимо выбрать значение \"${0}\".",
  "emptyText": "",
  "completeText": "Выбрать",
  "lookupLabelText": "Поиск",
  "lookupText": "..."
});

localize("argos.Fields.SignatureField", {
  "signatureLabelText": "подпись",
  "signatureText": "..."
});

localize("argos.GroupedList", {
  "toggleCollapseText": "показать/скрыть"
});

localize("argos.Groups.DateTimeSection", {
  "displayNameText": "Выбор даты/времени",
  "todayText": "Сегодняшние",
  "tomorrowText": "Завтра",
  "laterThisWeekText": "Позднее на этой неделе",
  "earlierThisWeekText": "Ранее на этой неделе",
  "thisLaterMonthText": "Позднее в этом месяце",
  "thisEarlierMonthText": "Ранее в этом месяце",
  "thisYearEarlierText": "Ранее в этом году",
  "thisYearLaterText": "Позднее в этом году",
  "yesterdayText": "Вчерашние",
  "lastWeekText": "Последняя неделя",
  "lastMonthText": "Прошлый месяц",
  "pastYearText": "В прошлом году",
  "nextYearText": "Следующий год",
  "nextMonthText": "Следующий месяц",
  "nextWeekText": "Следующая неделя",
  "futureText": "Будущ.",
  "twoWeeksAgoText": "Две недели назад",
  "threeWeeksAgoText": "Три недели назад",
  "twoMonthsAgoText": "Два месяца назад",
  "threeMonthsAgoText": "Три месяца назад",
  "unknownText": "Неизвестен"
});

localize("argos.Groups.GroupByValueSection", {
  "displayNameText": "Раздел групп по значению"
});

localize("argos.MainToolbar", {
  "titleText": "Мобильный тел."
});

localize("argos.RelatedViewWidget", {
  "nodataText": "записи не найдены ...",
  "selectMoreDataText": "показать еще ${0} ${1} ... ",
  "navToListText": "см. список",
  "loadingText": "загрузка ... ",
  "refreshViewText": "Обновить",
  "itemOfCountText": " ${0} из ${1}",
  "totalCountText": " (${0})",
  "titleText": "Связанное представление"
});

localize("argos.SearchWidget", {
  "searchText": "Поиск"
});

localize("argos.SelectionModel", {
  "requireSelectionText": "Должно быть что-то выбрано, нельзя отменить выбор последнего элемента."
});

localize("argos.View", {
  "titleText": "Общий вид"
});

localize("argos.Views.ConfigureQuickActions", {
  "titleText": "Настроить экспресс-действия"
});

localize("argos.Views.FileSelect", {
  "titleText": "Выбор файла",
  "addFileText": "Нажмите или коснитесь здесь, чтобы добавить файл.",
  "uploadText": "Отправить",
  "cancelText": "Отмена",
  "selectFileText": "Выбрать файл",
  "loadingText": "Загрузка...",
  "descriptionText": "Описание",
  "bytesText": "байт",
  "notSupportedText": "Ваше устройство не поддерживает добавление вложений."
});

localize("argos.Views.Signature", {
  "titleText": "подпись",
  "clearCanvasText": "Очистить",
  "undoText": "Отменить ввод"
});

localize("argos._ConfigureBase", {
  "titleText": "Конфигурировать"
});

localize("argos._DetailBase", {
  "editText": "Изменить",
  "titleText": "Детали",
  "detailsText": "Детали",
  "loadingText": "Загрузка...",
  "notAvailableText": "Запрошенные данные недоступны.",
  "toggleCollapseText": "показать/скрыть"
});

localize("argos._EditBase", {
  "saveText": "Сохранить",
  "titleText": "Изменить",
  "validationSummaryText": "Сводка проверки",
  "concurrencySummaryText": "Ошибки при совместном доступе",
  "detailsText": "Детали",
  "loadingText": "Загрузка...",
  "errorText": {
    "general": "При запросе данных возникла ошибка сервера.",
    "status": {
      "410": "Ошибка при сохранении. Эта запись больше не существует."
    }
  },
  "concurrencyErrorText": "Другой пользователь обновил это поле."
});

localize("argos._ErrorHandleMixin", {
  "errorText": {
    "general": "Произошла ошибка сервера."
  }
});

localize("argos._ListBase", {
  "moreText": "Получить больше записей",
  "emptySelectionText": "Нет",
  "titleText": "Список",
  "configureText": "Конфигурировать",
  "errorRenderText": "Ошибка при визуализации шаблона строки.",
  "remainingText": "Осталось записей: ${0}",
  "cancelText": "Отмена",
  "insertText": "Создать",
  "noDataText": "Нет записей",
  "loadingText": "Загрузка..."
});

localize("argos._PullToRefreshMixin", {
  "pullRefreshText": "Раскрыть для обновления...",
  "pullReleaseText": "Освободить для обновления..."
});

localize("argos._RelatedViewWidgetBase", {
  "loadingText": "загрузка ... "
});

localize("crm.Action", {
  "calledText": "Вызовов: ${0}",
  "emailedText": "Отправлено писем: ${0}"
});

localize("crm.Application", {
  "versionInfoText": "Мобильный клиент v${0}.${1}.${2}",
  "loadingText": "Загрузка состояния приложения",
  "authText": "Проверка подлинности"
});

localize("crm.ApplicationModule", {
  "searchText": "Поиск"
});

localize("crm.DefaultMetrics", {
  "accountsText": {
    "totalRevenue": "Общий доход",
    "averageTime": "Ср. время  по типам",
    "total": "Кол-во субъектов"
  },
  "opportunitiesText": {
    "total": "Кол-во сделок",
    "potential": "Общий потенциал продаж",
    "montlyPotential": "Среднемесячный потенциал продаж"
  },
  "ticketsText": {
    "total": "Кол-во заявок",
    "averageOpen": "Ср. время открытия"
  },
  "contactsText": {
    "total": "Кол-во контактов"
  },
  "leadsText": {
    "total": "Кол-во наводок"
  },
  "historyText": {
    "total": "Общая история",
    "duration": "Общая продолжительность"
  }
});

localize("crm.Fields.AddressField", {
  "lookupLabelText": "Изменить",
  "emptyText": ""
});

localize("crm.Fields.NameField", {
  "emptyText": ""
});

localize("crm.Fields.RecurrencesField", {
  "titleText": "Повторяющиеся",
  "emptyText": ""
});

localize("crm.FileManager", {
  "unableToUploadText": "Этот браузер не поддерживает операции с файлами API в HTML5.",
  "unknownSizeText": "Неизвестен",
  "unknownErrorText": "Внимание! Сбой отправки файла в результате ошибки.",
  "largeFileWarningText": "Предупреждение: запрос не смог быть загружен так как он превышает ограничение на размер установленное администратором.",
  "percentCompleteText": "Загрузка, пожалуйста подождите ..."
});

localize("crm.Format", {
  "bigNumberAbbrText": {
    "billion": "млрд",
    "million": "млн",
    "thousand": "тыс."
  },
  "userActivityFormatText": {
    "asUnconfirmed": "Неподтверженный",
    "asAccepted": "Принят",
    "asDeclned": "Отклонено"
  }
});

localize("crm.SpeedSearchWidget", {
  "searchText": "Быстрый Поиск"
});

localize("crm.Validator", {
  "exists": {
    "message": "Поле \"${2}\" должно иметь значение."
  },
  "name": {
    "message": "В поле \"${2}\" должны быть указаны имя и фамилия."
  },
  "notEmpty": {
    "message": "Поле \"${2}\" не может быть пустым."
  },
  "hasText": {
    "test": "",
    "message": "Поле \"${2}\" должно содержать текст."
  },
  "isInteger": {
    "message": "Значение \"${0}\" не является допустимым числом."
  },
  "isDecimal": {
    "message": "Значение \"${0}\" не является допустимым числом."
  },
  "isCurrency": {
    "message": "Значение \"${0}\" не является допустимым денежным форматом."
  },
  "isInt32": {
    "message": "Значение поля \"${2}\" превышает заданный числовой диапазон."
  },
  "exceedsMaxTextLength": {
    "message": "Значение поля \"${2}\" превышает ограничение по длине."
  },
  "isDateInRange": {
    "message": "Значение поля \"${2}\" не соответствует заданному диапазону дат."
  }
});

localize("crm.Views.Account.Detail", {
  "accountText": "Субъект",
  "acctMgrText": "Менеджер",
  "addressText": "Адрес",
  "businessDescriptionText": "Описание бизнеса",
  "createDateText": "Дата создания",
  "createUserText": "Создано",
  "faxText": "Факс",
  "importSourceText": "Источник наводки",
  "industryText": "Отрасль",
  "notesText": "Заметки",
  "ownerText": "Куратор",
  "phoneText": "Телефон",
  "activityTypeText": {
    "atPhoneCall": "Звонок"
  },
  "actionsText": "Быстрые действия",
  "relatedActivitiesText": "Дела",
  "relatedContactsText": "Контакты",
  "relatedHistoriesText": "Заметки/История",
  "relatedItemsText": "Связанные элементы",
  "relatedNotesText": "Заметки",
  "relatedOpportunitiesText": "Сделки",
  "relatedTicketsText": "Заявки",
  "relatedAddressesText": "Адреса",
  "relatedAttachmentText": "Вложения",
  "relatedAttachmentTitleText": "Вложения субъекта",
  "statusText": "Статус",
  "subTypeText": "SubType",
  "titleText": "Субъект",
  "typeText": "Тип",
  "webText": "Веб-адрес",
  "scheduleActivityText": "Планировать дело",
  "addNoteText": "Добавить заметку",
  "moreDetailsText": "Подробнее",
  "calledText": "Вызовов: ${0}"
});

localize("crm.Views.Account.Edit", {
  "accountStatusTitleText": "Статус субъекта",
  "accountSubTypeTitleText": "Подтип субъекта",
  "accountText": "Субъект",
  "accountTypeTitleText": "Тип субъекта",
  "acctMgrText": "Менеджер",
  "businessDescriptionText": "Описание бизнеса",
  "businessDescriptionTitleText": "Описание бизнеса",
  "descriptionText": "Описание",
  "faxText": "Факс",
  "fullAddressText": "Адрес",
  "importSourceText": "Источник наводки",
  "industryText": "Отрасль",
  "industryTitleText": "Отрасль",
  "ownerText": "Куратор",
  "phoneText": "Телефон",
  "statusText": "Статус",
  "subTypeText": "SubType",
  "titleText": "Субъект",
  "typeText": "Тип",
  "webText": "Веб-адрес"
});

localize("crm.Views.Account.List", {
  "titleText": "Субъекты",
  "activitiesText": "Дела",
  "notesText": "Заметки",
  "scheduleText": "Планировать",
  "editActionText": "Изменить",
  "callMainActionText": "Вызов по основному номеру",
  "viewContactsActionText": "Контакты",
  "addNoteActionText": "Добавить заметку",
  "addActivityActionText": "Добавить действие",
  "addAttachmentActionText": "Добавить Вложение",
  "phoneAbbreviationText": "Телефон: ",
  "faxAbbreviationText": "Факс: "
});

localize("crm.Views.Activity.List", {
  "allDayText": "Без-времени",
  "completeActivityText": "Завершить",
  "callText": "Звонок",
  "calledText": "Выз.",
  "addAttachmentActionText": "Добавить Вложение",
  "overdueText": "Просроченные",
  "alarmText": "С_оповещением",
  "touchedText": "затронуто",
  "importantText": "важно",
  "recurringText": "Повторяющиеся",
  "activityTypeText": {
    "atToDo": "Выполнить",
    "atPhoneCall": "Звонок",
    "atAppointment": "Встреча",
    "atLiterature": "Запрос литературы",
    "atPersonal": "Личное",
    "atQuestion": "Вопрос",
    "atNote": "Заметка",
    "atEMail": "Эл.почта"
  },
  "titleText": "Дела",
  "hashTagQueriesText": {
    "alarm": "С оповещением",
    "recurring": "Повторяющиеся",
    "timeless": "Без-времени",
    "today": "Сегодняшние",
    "this-week": "На-этой-неделе",
    "yesterday": "Вчерашние"
  }
});

localize("crm.Views.Activity.MyList", {
  "titleText": "Мои дела",
  "completeActivityText": "Завершить",
  "acceptActivityText": "Принять",
  "declineActivityText": "Отклонить",
  "callText": "Звонок",
  "calledText": "Выз.",
  "addAttachmentActionText": "Добавить Вложение",
  "viewContactActionText": "Контакт",
  "viewAccountActionText": "Субъект",
  "viewOpportunityActionText": "Сделка",
  "hashTagQueriesText": {
    "alarm": "С оповещением",
    "status-unconfirmed": "Неподтвержденные",
    "status-accepted": "Подтвержденные",
    "status-declined": "Отмененные",
    "recurring": "Повторяющиеся",
    "timeless": "В_течение_дня",
    "today": "Сегодняшние",
    "this-week": "На-этой-неделе",
    "yesterday": "Вчерашние"
  }
});

localize("crm.Views.Activity.Recurring", {
  "startingText": "Дата начала",
  "endingText": "Дата окончания",
  "repeatsText": "Повтор",
  "everyText": "Каждый(е)",
  "afterCompletionText": "после выполнения",
  "singleWeekdayText": "будний день",
  "weekdaysText": "будни",
  "dayText": "День",
  "monthText": "Месяц",
  "onText": "на",
  "occurrencesText": "вхождения",
  "summaryText": "Сводно",
  "weekDaysText": {
    "0": "Воскресенье",
    "1": "Понедельник",
    "2": "Вторник",
    "3": "Среда",
    "4": "Четверг",
    "5": "Пятница",
    "6": "Суббота"
  },
  "monthsText": {
    "0": "Январь",
    "1": "Февраль",
    "2": "Март",
    "3": "Апрель",
    "4": "Май",
    "5": "Июнь",
    "6": "Июль",
    "7": "Август",
    "8": "Сентябрь",
    "9": "Октябрь",
    "10": "Ноябрь",
    "11": "Декабрь"
  },
  "frequencyOptionsText": {
    "0": "Дней",
    "1": "недель",
    "2": "месяцев",
    "3": "лет"
  },
  "recurringFrequencyText": "Частота повторений",
  "yesText": "Да",
  "noText": "Нет",
  "titleText": "периодичность"
});

localize("crm.Views.Activity.TypesList", {
  "titleText": "Планировать...",
  "activityTypeText": {
    "atToDo": "Выполнить",
    "atPhoneCall": "Звонок",
    "atAppointment": "Встреча",
    "atLiterature": "Инф. материалы",
    "atPersonal": "Личные дела",
    "event": "Событие"
  }
});

localize("crm.Views.AddAccountContact", {
  "accountNameText": "Субъект",
  "accountStatusTitleText": "Статус субъекта",
  "accountSubTypeTitleText": "Подтип субъекта",
  "accountText": "Субъект",
  "accountTypeTitleText": "Тип субъекта",
  "acctMgrText": "Менеджер",
  "addressText": "Адрес",
  "contactTitleText": "Должность",
  "descriptionText": "Описание",
  "detailsAccountText": "Данные субъекта",
  "detailsContactText": "Данные контакта",
  "detailsText": "Данные контакта и субъекта",
  "emailText": "Эл.почта",
  "faxText": "Факс",
  "homePhoneText": "Домашний тел.",
  "industryText": "Отрасль",
  "ownerText": "Куратор",
  "lastNameText": "Последний",
  "mobileText": "Мобильный тел.",
  "nameText": "Имя",
  "statusText": "Статус",
  "subTypeText": "Подтип",
  "titleText": "Добавить контакт/субъект",
  "typeText": "Тип",
  "webText": "Веб-адрес",
  "phoneText": "Телефон",
  "workText": "Рабочий телефон",
  "industryTitleText": "Отрасль"
});

localize("crm.Views.Address.Edit", {
  "address1Text": "Улица",
  "address2Text": "Дом",
  "address3Text": "Квартира/Офис",
  "cityText": "Город",
  "cityTitleText": "Город",
  "countryText": "Страна",
  "countryTitleText": "Страна",
  "descriptionText": "Описание",
  "descriptionTitleText": "Описание",
  "isMailingText": "Доставка",
  "isPrimaryText": "Основной",
  "postalCodeText": "Почтовый",
  "salutationText": "Адресат(ы)",
  "stateText": "Штат",
  "stateTitleText": "Штат",
  "titleText": "Адрес"
});

localize("crm.Views.Address.List", {
  "titleText": "Адреса"
});

localize("crm.Views.AreaCategoryIssueLookup", {
  "titleText": "Субъекты"
});

localize("crm.Views.Attachment.AddAttachment", {
  "titleText": "Добавить вложения"
});

localize("crm.Views.Attachment.MyAttachmentList", {
  "titleText": "Мои вложения"
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
  "loadingText": "Загрузка..."
});

localize("crm.Views.Competitor.List", {
  "titleText": "Конкуренты"
});

localize("crm.Views.Configure", {
  "titleText": "Конфигурировать"
});

localize("crm.Views.Contact.Detail", {
  "activityTypeText": {
    "atPhoneCall": "Звонок",
    "atEMail": "Эл. почта"
  },
  "accountText": "Субъект",
  "acctMgrText": "Менеджер",
  "addressText": "Адрес",
  "contactTitleText": "Должность",
  "createDateText": "Дата создания",
  "createUserText": "Создано",
  "emailText": "Эл.почта",
  "faxText": "Факс",
  "homeText": "Домашний тел.",
  "nameText": "Контакт",
  "ownerText": "Куратор",
  "actionsText": "Быстрые действия",
  "relatedAccountsText": "Субъекты",
  "relatedActivitiesText": "Дела",
  "relatedHistoriesText": "Заметки/История",
  "relatedItemsText": "Связанные элементы",
  "relatedNotesText": "Заметки",
  "relatedOpportunitiesText": "Сделки",
  "relatedTicketsText": "Заявки",
  "relatedAddressesText": "Адреса",
  "relatedAttachmentText": "Вложения",
  "relatedAttachmentTitleText": "Вложения контакта",
  "titleText": "Контакт",
  "webText": "Веб-адрес",
  "workText": "Рабочий телефон",
  "cuisinePreferenceText": "Предпочтения в кухне",
  "callMobileNumberText": "Вызов на мобильный",
  "callWorkNumberText": "Вызов по рабочему номеру",
  "calledText": "Выз.",
  "scheduleActivityText": "Планировать дело",
  "addNoteText": "Добавить заметку",
  "sendEmailText": "Отправить эл. письмо",
  "viewAddressText": "Просмотр адреса",
  "moreDetailsText": "Подробнее"
});

localize("crm.Views.Contact.Edit", {
  "titleText": "Контакт",
  "nameText": "Имя",
  "workText": "Рабочий телефон",
  "mobileText": "Мобильный клиент",
  "emailText": "Эл.почта",
  "webText": "Веб-адрес",
  "acctMgrText": "Менеджер",
  "accountNameText": "Субъект",
  "homePhoneText": "Домашний тел.",
  "faxText": "Факс",
  "addressText": "Адрес",
  "contactTitleText": "Должность",
  "titleTitleText": "Должность",
  "addressTitleText": "Адрес",
  "ownerText": "Доступ",
  "cuisinePreferenceText": "Предпочтения в кухне",
  "cuisinePreferenceTitleText": "Предпочтения в кухне"
});

localize("crm.Views.Contact.List", {
  "titleText": "Контакты",
  "activitiesText": "Дела",
  "notesText": "Заметки",
  "scheduleText": "Планировать",
  "editActionText": "Изменить",
  "callMainActionText": "Вызов по основному номеру",
  "callWorkActionText": "Вызов по рабочему номеру",
  "callMobileActionText": "Вызов на мобильный",
  "sendEmailActionText": "Эл.почта",
  "viewAccountActionText": "Субъект",
  "addNoteActionText": "Добавить заметку",
  "addActivityActionText": "Добавить действие",
  "addAttachmentActionText": "Добавить Вложение",
  "phoneAbbreviationText": "Рабочий: ",
  "mobileAbbreviationText": "Мобильный тел.: "
});

localize("crm.Views.Contract.List", {
  "titleText": "Контракты"
});

localize("crm.Views.ExchangeRateLookup", {
  "titleText": "Курс обмена"
});

localize("crm.Views.FooterToolbar", {
  "copyrightText": "&copy; 2014 SalesLogix, NA, LLC. Все права защищены."
});

localize("crm.Views.Groups.Selector", {
  "titleText": "Просмотр групп"
});

localize("crm.Views.Help", {
  "titleText": "Помощь",
  "errorText": "Ошибка",
  "errorMessageText": "Не удалось загрузить справочный документ."
});

localize("crm.Views.History.RelatedView", {
  "regardingText": "Тема",
  "byText": "написал(-а) ",
  "titleText": "Заметки"
});

localize("crm.Views.Home", {
  "configureText": "Конфигурировать",
  "addAccountContactText": "Добавить контакт/субъект",
  "titleText": "Домой",
  "actionsText": "Быстрые действия",
  "viewsText": "Перейти к"
});

localize("crm.Views.Lead.Detail", {
  "activityTypeText": {
    "atPhoneCall": "Звонок",
    "atEMail": "Эл. почта"
  },
  "accountText": "Компания",
  "addressText": "Адрес",
  "businessDescriptionText": "Описание бизнеса",
  "createDateText": "Дата создания",
  "createUserText": "Создано",
  "eMailText": "Эл.почта",
  "leadSourceText": "Источник наводки",
  "industryText": "Отрасль",
  "interestsText": "Интересы",
  "leadTitleText": "Должность",
  "nameText": "Имя",
  "notesText": "Комментарии",
  "ownerText": "Куратор",
  "relatedActivitiesText": "Дела",
  "relatedHistoriesText": "Заметки/История",
  "relatedItemsText": "Связанные элементы",
  "relatedNotesText": "Заметки",
  "relatedAttachmentText": "Вложения",
  "relatedAttachmentTitleText": "Вложения интересов",
  "sicCodeText": "Код доступа",
  "titleText": "Наводка",
  "tollFreeText": "Справочный тел.",
  "mobileText": "Мобильный телефон",
  "webText": "Веб-адрес",
  "workText": "Рабочий телефон",
  "actionsText": "Быстрые действия",
  "callWorkNumberText": "Вызов по основному номеру",
  "scheduleActivityText": "Планировать дело",
  "addNoteText": "Добавить заметку",
  "sendEmailText": "Отправить эл. письмо",
  "viewAddressText": "Просмотр адреса",
  "moreDetailsText": "Подробнее",
  "calledText": "Вызовов: ${0}",
  "emailedText": "Отправлено писем: ${0}"
});

localize("crm.Views.Lead.Edit", {
  "accountText": "Субъект",
  "addressText": "Адрес",
  "businessText": "Описание бизнеса",
  "businessTitleText": "Описание бизнеса",
  "companyText": "Компания",
  "contactTitleText": "Должность",
  "emailText": "Эл.почта",
  "faxText": "Факс",
  "importSourceText": "Источник наводки",
  "industryText": "Отрасль",
  "industryTitleText": "Отрасль",
  "interestsText": "Интересы",
  "leadNameLastFirstText": "Имя",
  "leadOwnerText": "Куратор",
  "nameText": "Имя",
  "notesText": "Комментарии",
  "notesTitleText": "Комментарии",
  "sicCodeText": "Код доступа",
  "titleText": "Наводка",
  "titleTitleText": "Должность",
  "tollFreeText": "Справочный тел.",
  "webText": "Веб-адрес",
  "workText": "Рабочий телефон",
  "mobileText": "Мобильный телефон"
});

localize("crm.Views.Lead.List", {
  "titleText": "Наводки",
  "activitiesText": "Дела",
  "notesText": "Заметки",
  "scheduleText": "Планировать",
  "emailedText": "Отправлено писем: ${0}",
  "calledText": "Вызовов: ${0}",
  "editActionText": "Изменить",
  "callMobileActionText": "Вызов на мобильный",
  "callWorkActionText": "Вызов по рабочему номеру",
  "sendEmailActionText": "Эл.почта",
  "addNoteActionText": "Добавить заметку",
  "addActivityActionText": "Добавить действие",
  "addAttachmentActionText": "Добавить Вложение",
  "phoneAbbreviationText": "Рабочий: ",
  "mobileAbbreviationText": "Мобильный тел.: ",
  "tollFreeAbbreviationText": "Справочный тел.: "
});

localize("crm.Views.LeadSource.List", {
  "titleText": "Источники наводки"
});

localize("crm.Views.LeftDrawer", {
  "configureText": "Настройка меню",
  "addAccountContactText": "Добавить контакт/субъект",
  "titleText": "Главное меню",
  "actionsText": "Быстрые действия",
  "viewsText": "Перейти к",
  "footerText": "Дополнительно",
  "settingsText": "Параметры",
  "helpText": "Помощь",
  "logOutText": "Выход",
  "logOutConfirmText": "Уверены, что хотите выйти?"
});

localize("crm.Views.LogOff", {
  "messageText": "Вы вышли из системы. Закройте окно браузера.",
  "loginText": "Нажмите здесь, чтобы вернуться в систему.",
  "titleText": "Выполнен выход"
});

localize("crm.Views.Login", {
  "copyrightText": "&copy; Infor, 2015 г. Все права защищены. www.infor.com",
  "logOnText": "Вход",
  "passText": "Пароль",
  "rememberText": "Запомнить меня",
  "titleText": "Вход",
  "userText": "ИД пользователя",
  "invalidUserText": "Неверное имя пользователя или пароль.",
  "missingUserText": "Запись пользователя не найдена.",
  "requestAbortedText": "Запрос не выполнен.",
  "logoText": "Infor CRM"
});

localize("crm.Views.MetricConfigure", {
  "titleText": "Настройка метрики",
  "metricTitleText": "Должность",
  "metricFilterText": "Фильтр",
  "metricText": "Метрика",
  "chartTypeText": "тип диаграммы",
  "advancedText": "Расширенные параметры",
  "formatterText": "модуль форматирования",
  "aggregateText": "Агрегировать",
  "reportViewText": "идентификатор вида диаграммы"
});

localize("crm.Views.MetricFilterLookup", {
  "titleText": "Фильтр/Просмотр метрики"
});

localize("crm.Views.MetricWidget", {
  "loadingText": "Загрузка...",
  "errorText": "Ошибка при загрузке виджета."
});

localize("crm.Views.NameEdit", {
  "titleText": "Изменить имя",
  "firstNameText": "Первый",
  "middleNameText": "Отчество",
  "lastNameText": "Фамилия",
  "prefixText": "Префикс",
  "prefixTitleText": "Префикс имени",
  "suffixText": "Суффикс",
  "suffixTitleText": "Суффикс имени"
});

localize("crm.Views.Opportunity.List", {
  "titleText": "Сделки",
  "activitiesText": "Дела",
  "notesText": "Заметки",
  "scheduleText": "Планировать",
  "editActionText": "Изменить",
  "viewAccountActionText": "Субъект",
  "viewContactsActionText": "Контакты",
  "viewProductsActionText": "Продукты",
  "addNoteActionText": "Добавить заметку",
  "addActivityActionText": "Добавить действие",
  "addAttachmentActionText": "Добавить Вложение",
  "actualCloseText": "Закрыта ",
  "estimatedCloseText": "План. Закрытие.  ",
  "quickEditActionText": "Быстрое изменение"
});

localize("crm.Views.Opportunity.QuickEdit", {
  "estCloseText": "закрыта",
  "detailsText": "Детали",
  "opportunityStageTitleText": "Этап возможности",
  "opportunityText": "Сделка",
  "stageText": "Стадия",
  "statusOpenText": "Открыть",
  "statusClosedLostText": "Закрыта и проиграна",
  "statusClosedWonText": "Закрыта и выиграна",
  "salesProcessText": "этап заблокирован процессом продаж:",
  "probabilityText": "Вероятность закрытия",
  "probabilityTitleText": "Вероятность сделки",
  "potentialText": "Потенциал продаж"
});

localize("crm.Views.OpportunityContact.Detail", {
  "titleText": "Контакт по сделке",
  "accountText": "Субъект",
  "contactTitleText": "Должность",
  "nameText": "Контакт",
  "moreDetailsText": "Подробнее",
  "salesRoleText": "Роль",
  "strategyText": "Стратегия",
  "personalBenefitsText": "Личные достоинства",
  "standingText": "Оценка предложения",
  "issuesText": "Проблемы",
  "competitorNameText": "Конкурент",
  "removeContactTitleText": "Удалить контакт",
  "confirmDeleteText": "Удалить \"${0}\" из сделки?",
  "contactText": "Контакт"
});

localize("crm.Views.OpportunityContact.Edit", {
  "titleText": "Редактировать контакт",
  "nameText": "Имя",
  "accountNameText": "Субъект",
  "contactTitleText": "Должность",
  "salesRoleText": "Роль",
  "salesRoleTitleText": "Роль",
  "personalBenefitsText": "Личные достоинства",
  "strategyText": "Стратегия",
  "issuesText": "Проблемы",
  "standingText": "Оценка предложения",
  "standingTitleText": "Оценка предложения",
  "contactText": "Контакт",
  "competitorPrefText": "Конкурент"
});

localize("crm.Views.OpportunityContact.List", {
  "titleText": "Контакты по сделке",
  "selectTitleText": "Выбор контакта",
  "activitiesText": "Дела",
  "notesText": "Заметки",
  "scheduleText": "Планировать"
});

localize("crm.Views.OpportunityProduct.Detail", {
  "detailsText": "Детали",
  "opportunityText": "Сделка",
  "productText": "Продукт",
  "productFamilyText": "Семейство продукта",
  "priceLevelText": "Уровень цены",
  "priceText": "Цена",
  "basePriceText": "Базовая цена",
  "discountText": "Скидка",
  "quantityText": "Кол-во",
  "baseExtendedPriceText": "База",
  "extendedPriceText": "Общая сумма",
  "extendedPriceSectionText": "Общая сумма",
  "adjustedPriceSectionText": "Скорректированная цена",
  "baseAdjustedPriceText": "База",
  "adjustedPriceText": "Скорректированная цена",
  "myAdjustedPriceText": "Пользователь",
  "confirmDeleteText": "Удалить ${0} из перспективных товаров?",
  "removeOppProductTitleText": "удалить перспективный товар"
});

localize("crm.Views.OpportunityProduct.Edit", {
  "titleText": "Продукт сделки",
  "detailsText": "Детали",
  "opportunityText": "Сделка",
  "productText": "Продукт",
  "productFamilyText": "Семейство продукта",
  "priceLevelText": "Уровень цены",
  "priceText": "Цена",
  "basePriceText": "Базовая цена",
  "discountText": "% скидки",
  "adjustedPriceText": "Скорректированная цена",
  "myAdjustedPriceText": "Пользователь",
  "baseAdjustedPriceText": "База",
  "quantityText": "Кол-во",
  "baseExtendedPriceText": "База",
  "extendedPriceText": "Общая сумма",
  "extendedPriceSectionText": "Общая сумма",
  "adjustedPriceSectionText": "Скорректированная цена"
});

localize("crm.Views.OpportunityProduct.List", {
  "titleText": "Продукты"
});

localize("crm.Views.Owner.List", {
  "titleText": "Доступ"
});

localize("crm.Views.Product.List", {
  "titleText": "Продукты"
});

localize("crm.Views.ProductProgram.List", {
  "titleText": "Программы продукта"
});

localize("crm.Views.Settings", {
  "clearLocalStorageTitleText": "Очистить хранилище",
  "clearAuthenticationTitleText": "Очистить сохраненные учетные данные",
  "errorLogTitleText": "Просмотр журналов ошибок",
  "localStorageClearedText": "Локальные хранилища успешно очищены.",
  "credentialsClearedText": "Сохраненные учетные данные успешно очищены.",
  "titleText": "Параметры"
});

localize("crm.Views.SpeedSearchList", {
  "titleText": "Быстрый Поиск",
  "indexesText": {
    "Account": "Субъект",
    "Activity": "Дело",
    "Contact": "Контакт",
    "History": "История",
    "Lead": "Наводка",
    "Opportunity": "Сделка",
    "Ticket": "Заявка"
  }
});

localize("crm.Views.TextEdit", {
  "titleText": "Редактировать текст"
});

localize("crm.Views.Ticket.Detail", {
  "accountText": "Субъект",
  "areaText": "Область",
  "assignedDateText": "Дата поручения",
  "assignedToText": "Поручено",
  "completedByText": "Завершено",
  "categoryText": "Категория",
  "contactText": "Контакт",
  "contractText": "Контракт",
  "descriptionText": "Описание",
  "issueText": "Проблема",
  "needByText": "Срок исполнения",
  "notesText": "Комментарии",
  "phoneText": "Телефон",
  "actionsText": "Быстрые действия",
  "relatedAttachmentText": "Вложения",
  "relatedAttachmentTitleText": "Вложения заявки",
  "relatedActivitiesText": "Дела",
  "relatedItemsText": "Связанные элементы",
  "resolutionText": "Решение",
  "sourceText": "Источник",
  "statusText": "Статус",
  "subjectText": "Тема",
  "ticketIdText": "Номер заявки",
  "titleText": "Заявка",
  "urgencyText": "Срочность:",
  "scheduleActivityText": "Планировать дело",
  "moreDetailsText": "Подробнее",
  "relatedTicketActivitiesText": "Дела по заявке",
  "loadingText": "Загрузка..."
});

localize("crm.Views.Ticket.Edit", {
  "accountText": "Субъект",
  "areaText": "Область",
  "assignedDateText": "Дата поручения",
  "assignedToText": "Поручено",
  "categoryText": "Категория",
  "contactText": "Контакт",
  "contractText": "Контракт",
  "descriptionText": "Описание",
  "descriptionTitleText": "Описание",
  "issueText": "Проблема",
  "needByText": "Срок исполнения",
  "notesText": "Комментарии",
  "notesTitleText": "Комментарии",
  "phoneText": "Телефон",
  "relatedActivitiesText": "Дела",
  "relatedItemsText": "Связанные элементы",
  "resolutionText": "Решение",
  "resolutionTitleText": "Решение",
  "sourceText": "Источник",
  "sourceTitleText": "Источник",
  "statusText": "Статус",
  "subjectText": "Тема",
  "ticketAreaTitleText": "Область заявки",
  "ticketCategoryTitleText": "Категория заявки",
  "ticketIdText": "Номер заявки",
  "ticketIssueTitleText": "Предмет заявки",
  "ticketStatusTitleText": "Статус заявки",
  "ticketUrgencyTitleText": "Срочность заявки",
  "titleText": "Заявка",
  "urgencyText": "Срочность:"
});

localize("crm.Views.Ticket.List", {
  "titleText": "Заявки",
  "activitiesText": "Дела",
  "scheduleText": "Планировать",
  "notAssignedText": "Без поручения",
  "editActionText": "Изменить",
  "viewAccountActionText": "Субъект",
  "viewContactActionText": "Контакт",
  "addNoteActionText": "Добавить заметку",
  "addActivityActionText": "Добавить действие",
  "addAttachmentActionText": "Добавить Вложение",
  "assignedToText": "Поручено: ",
  "urgencyText": "Срочность: ",
  "createdOnText": "Создано  ",
  "modifiedText": "Измененный ",
  "neededByText": "Необход.  "
});

localize("crm.Views.Ticket.UrgencyLookup", {
  "titleText": "Срочность заявки"
});

localize("crm.Views.TicketActivity.Detail", {
  "titleText": "Дело по заявке",
  "accountText": "Субъект",
  "contactText": "Контакт",
  "typeText": "Тип",
  "publicAccessText": "Общий доступ",
  "assignedDateText": "Дата начала",
  "completedDateText": "Дата окончания",
  "followUpText": "Завершенный",
  "unitsText": "Единицы времени",
  "elapsedUnitsText": "Затрачено часов",
  "rateTypeDescriptionText": "Тип ставки",
  "rateText": "Курс",
  "totalLaborText": "Всего трудозатрат",
  "totalPartsText": "Всего компонент:",
  "totalFeeText": "Всего вознаграждения",
  "activityDescriptionText": "Комментарии",
  "ticketNumberText": "Номер заявки",
  "userText": "Пользователь",
  "completeTicketText": "Завершить дело по заявке",
  "moreDetailsText": "Подробнее",
  "relatedItemsText": "Связанные элементы",
  "relatedTicketActivityItemText": "Компоненты дела по заявке"
});

localize("crm.Views.TicketActivity.RateLookup", {
  "titleText": "Ставки"
});

localize("crm.Views.TicketActivityItem.Detail", {
  "titleText": "Компонент заявки",
  "productNameText": "Продукт",
  "skuText": "Код продукта",
  "serialNumberText": "Серийный №",
  "itemAmountText": "Цена",
  "itemDescriptionText": "Описание"
});

localize("crm.Views.TicketActivityItem.List", {
  "titleText": "Компоненты дела по заявке"
});

localize("crm.Views.UpdateToolbar", {
  "updateText": "Доступно обновление. Нажмите для перезагрузки."
});

localize("crm.Views.User.CalendarAccessList", {
  "titleText": "Ресурсы действия"
});

localize("crm.Views.User.List", {
  "titleText": "Пользователи"
});

localize("crm.Views._CardLayoutListMixin", {
  "itemIconAltText": "Контакт",
  "allRecordsText": "поиск не выполнен"
});

localize("crm.Views._GroupListMixin", {
  "noDefaultGroupText": "Не задана группа по умолчанию. Щелкните здесь, чтобы настроить группы. ",
  "currentGroupNotFoundText": "Текущая группа не найдена.",
  "groupTemplateSummaryText": "Сводно",
  "groupTemplateDetailText": "Детали",
  "groupsModeText": "В настоящий момент вы находитесь в режиме групп. Выполните поиск или выберите хэштег для выхода из режима групп."
});

localize("crm.Views._RightDrawerListMixin", {
  "hashTagsSectionText": "Группы",
  "groupsSectionText": "Группы",
  "kpiSectionText": "KPI",
  "configureGroupsText": "Конфигурировать",
  "refreshGroupsText": "Обновить",
  "layoutsText": "Макеты"
});

localize("crm.Views._SpeedSearchRightDrawerListMixin", {
  "indexSectionText": "Индексы"
});
});
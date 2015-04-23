define('localization/saleslogix/ru', ['localization/ru', 'Mobile/SalesLogix/ApplicationModule'], function() {

localize("Sage.Platform.Mobile.Calendar", {
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

localize("Sage.Platform.Mobile.Fields.DateField", {
  "dateFormatText": "DD.MM.YYYY",
  "emptyText": "",
  "invalidDateFormatErrorText": "Некорректный формат даты в поле \"${0}\"."
});

localize("Sage.Platform.Mobile.Format", {
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

localize("Mobile.SalesLogix.GroupUtility", {
  "groupDateFormatText": "D.M.YYYY H:mm:ss"
});

localize("Mobile.SalesLogix.Recurrence", {
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

localize("Mobile.SalesLogix.Views.Activity.Complete", {
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
  "timelessText": "В_течение_дня",
  "durationValueText": {
    "0": "Нет",
    "15": "15 минут",
    "30": "30 минут",
    "60": "1 час",
    "90": "1,5 часа",
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
  "startDateFormatText": "D.M.YYYY H:mm:ss",
  "timelessDateFormatText": "D.M.YYYY",
  "alarmDateFormatText": "D.M.YYYY H:mm:ss",
  "activityTypeText": {
    "atToDo": "Дело",
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
  "alarmTimeText": "С оповещением",
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

localize("Mobile.SalesLogix.Views.Activity.Edit", {
  "startingFormatText": "D.M.YYYY H:mm",
  "startingTimelessFormatText": "D.M.YYYY",
  "activityCategoryTitleText": "Категория действия",
  "activityDescriptionTitleText": "Описание Дела",
  "locationText": "Размещение",
  "activityTypeTitleText": "Тип дела",
  "alarmText": "С оповещением",
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
  "timelessText": "В течение дня",
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

localize("Mobile.SalesLogix.Views.Attachment.List", {
  "attachmentDateFormatText": "ddd D/M/YYYY HH:mm:ss",
  "titleText": "Вложения",
  "uploadedOnText": "Загружено ",
  "hashTagQueriesText": {
    "url": "URL",
    "binary": "Файл"
  }
});

localize("Mobile.SalesLogix.Views.Attachment.ViewAttachment", {
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

localize("Mobile.SalesLogix.Views.Calendar.DayView", {
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

localize("Mobile.SalesLogix.Views.Calendar.MonthView", {
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

localize("Mobile.SalesLogix.Views.Calendar.WeekView", {
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

localize("Mobile.SalesLogix.Views.ErrorLog.Detail", {
  "errorDateFormatText": "DD.MM.YYYY HH:mm",
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

localize("Mobile.SalesLogix.Views.ErrorLog.List", {
  "errorDateFormatText": "DD.MM.YYYY HH:mm",
  "titleText": "Журналы ошибок"
});

localize("Mobile.SalesLogix.Views.Event.Detail", {
  "startDateFormatText": "D.M.YYYY H:mm:ss",
  "endDateFormatText": "D.M.YYYY H:mm:ss",
  "eventTypeText": {
    "atToDo": "Дело",
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

localize("Mobile.SalesLogix.Views.Event.Edit", {
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

localize("Mobile.SalesLogix.Views.Event.List", {
  "eventDateFormatText": "D.M.YYYY",
  "titleText": "События",
  "eventText": "Событие"
});

localize("Mobile.SalesLogix.Views.History.Detail", {
  "dateFormatText": "D.M.YYYY H:mm:ss",
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

localize("Mobile.SalesLogix.Views.History.List", {
  "hourMinuteFormatText": "H:mm",
  "dateFormatText": "D.M.YY",
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

localize("Mobile.SalesLogix.Views.Opportunity.Detail", {
  "exchangeRateDateFormatText": "D.M.YYYY H:mm",
  "accountText": "Субъект",
  "acctMgrText": "Менеджер",
  "estCloseText": "Закрыта",
  "detailsText": "Детали",
  "fbarHomeTitleText": "Домой",
  "fbarScheduleTitleText": "Планировать",
  "importSourceText": "Источник наводки",
  "opportunityText": "Сделка",
  "ownerText": "Доступ",
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

localize("Mobile.SalesLogix.Views.Opportunity.Edit", {
  "exchangeRateDateFormatText": "D.M.YYYY H:mm",
  "accountText": "Субъект",
  "acctMgrText": "Менеджер",
  "estCloseText": "Закрыта",
  "importSourceText": "Источник наводки",
  "detailsText": "Детали",
  "opportunityStatusTitleText": "Статус Сделки",
  "opportunityText": "Сделка",
  "opportunityTypeTitleText": "Тип сделки",
  "ownerText": "Доступ",
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

localize("Mobile.SalesLogix.Views.TicketActivity.Edit", {
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

localize("Mobile.SalesLogix.Views.TicketActivity.List", {
  "startDateFormatText": "DD.MM.YYYY H:mm",
  "titleText": "Дела по заявке"
});

localize("Sage.Platform.Mobile.ErrorManager", {
  "abortedText": "Прервано",
  "scopeSaveText": "Область не сохраняется в отчете об ошибках"
});

localize("Sage.Platform.Mobile.Fields.DurationField", {
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

localize("Sage.Platform.Mobile.Fields.EditorField", {
  "lookupLabelText": "Изменить",
  "lookupText": "...",
  "emptyText": "пусто",
  "completeText": "Ок"
});

localize("Sage.Platform.Mobile.Fields.LookupField", {
  "dependentErrorText": "Необходимо выбрать значение \"${0}\".",
  "emptyText": "",
  "completeText": "Выбрать",
  "lookupLabelText": "Поиск",
  "lookupText": "..."
});

localize("Sage.Platform.Mobile.Fields.SignatureField", {
  "signatureLabelText": "подпись",
  "signatureText": "..."
});

localize("Sage.Platform.Mobile.GroupedList", {
  "toggleCollapseText": "показать/скрыть"
});

localize("Sage.Platform.Mobile.Groups.DateTimeSection", {
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

localize("Sage.Platform.Mobile.Groups.GroupByValueSection", {
  "displayNameText": "Раздел групп по значению"
});

localize("Sage.Platform.Mobile.MainToolbar", {
  "titleText": "Мобильный тел."
});

localize("Sage.Platform.Mobile.RelatedViewWidget", {
  "nodataText": "записи не найдены ...",
  "selectMoreDataText": "показать еще ${0} ${1} ... ",
  "navToListText": "см. список",
  "loadingText": "загрузка ... ",
  "refreshViewText": "Обновить",
  "itemOfCountText": " ${0} из ${1}",
  "totalCountText": " (${0})",
  "titleText": "Связанное представление"
});

localize("Sage.Platform.Mobile.SearchWidget", {
  "searchText": "Поиск"
});

localize("Sage.Platform.Mobile.View", {
  "titleText": "Общий вид"
});

localize("Sage.Platform.Mobile.Views.FileSelect", {
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

localize("Sage.Platform.Mobile.Views.Signature", {
  "titleText": "подпись",
  "clearCanvasText": "Очистить",
  "undoText": "Отменить ввод"
});

localize("Sage.Platform.Mobile._DetailBase", {
  "editText": "Изменить",
  "titleText": "Детали",
  "detailsText": "Детали",
  "loadingText": "Загрузка...",
  "requestErrorText": "При запросе данных возникла ошибка сервера.",
  "notAvailableText": "Запрошенные данные недоступны.",
  "toggleCollapseText": "показать/скрыть"
});

localize("Sage.Platform.Mobile._EditBase", {
  "saveText": "Сохранить",
  "titleText": "Изменить",
  "validationSummaryText": "Сводка проверки",
  "concurrencySummaryText": "Ошибки при совместном доступе",
  "detailsText": "Детали",
  "loadingText": "Загрузка...",
  "requestErrorText": "При запросе данных возникла ошибка сервера.",
  "concurrencyErrorText": "Другой пользователь обновил это поле."
});

localize("Sage.Platform.Mobile._ListBase", {
  "moreText": "Получить больше записей",
  "emptySelectionText": "Нет",
  "titleText": "Список",
  "errorRenderText": "Ошибка при визуализации шаблона строки.",
  "remainingText": "Осталось записей: ${0}",
  "cancelText": "Отмена",
  "insertText": "Создать",
  "noDataText": "Нет записей",
  "loadingText": "Загрузка...",
  "requestErrorText": "При запросе данных возникла ошибка сервера."
});

localize("Mobile.SalesLogix.Action", {
  "calledText": "Вызовов: ${0}",
  "emailedText": "Отправлено писем: ${0}"
});

localize("Mobile.SalesLogix.Application", {
  "versionInfoText": "Мобильный клиент v${0}.${1}.${2}"
});

localize("Mobile.SalesLogix.ApplicationModule", {
  "searchText": "Поиск"
});

localize("Mobile.SalesLogix.DefaultMetrics", {
  "accountsText": {
    "totalRevenue": "Общий доход",
    "averageTime": "Ср. время  по типам",
    "total": "Кол-во субъектов"
  },
  "opportunitiesText": {
    "total": "Кол-во сделок",
    "potential": "Потенциал продаж"
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

localize("Mobile.SalesLogix.Fields.AddressField", {
  "lookupLabelText": "Изменить",
  "emptyText": ""
});

localize("Mobile.SalesLogix.Fields.NameField", {
  "emptyText": ""
});

localize("Mobile.SalesLogix.Fields.RecurrencesField", {
  "titleText": "Повторяющиеся",
  "emptyText": ""
});

localize("Mobile.SalesLogix.FileManager", {
  "unableToUploadText": "Этот браузер не поддерживает операции с файлами API в HTML5.",
  "unknownSizeText": "Неизвестен",
  "unknownErrorText": "Внимание! Сбой отправки файла в результате ошибки.",
  "largeFileWarningText": "Предупреждение: запрос не смог быть загружен так как он превышает ограничение на размер установленное администратором.",
  "percentCompleteText": "Загрузка, пожалуйста подождите ..."
});

localize("Mobile.SalesLogix.Format", {
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

localize("Mobile.SalesLogix.SpeedSearchWidget", {
  "searchText": "Быстрый Поиск"
});

localize("Mobile.SalesLogix.Validator", {
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

localize("Mobile.SalesLogix.Views.Account.Detail", {
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
  "ownerText": "Доступ",
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
  "subTypeText": "Подтип",
  "titleText": "Субъект",
  "typeText": "Тип",
  "webText": "Веб-адрес",
  "scheduleActivityText": "Планировать дело",
  "addNoteText": "Добавить заметку",
  "moreDetailsText": "Подробнее",
  "calledText": "Вызовов: ${0}"
});

localize("Mobile.SalesLogix.Views.Account.Edit", {
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
  "ownerText": "Доступ",
  "phoneText": "Телефон",
  "statusText": "Статус",
  "subTypeText": "Подтип",
  "titleText": "Субъект",
  "typeText": "Тип",
  "webText": "Веб-адрес"
});

localize("Mobile.SalesLogix.Views.Account.List", {
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

localize("Mobile.SalesLogix.Views.Activity.List", {
  "allDayText": "Круглосуточн.",
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
    "atToDo": "Дело",
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
    "alarm": "С_оповещением",
    "recurring": "Повторяющиеся",
    "timeless": "В_течение_дня",
    "today": "Сегодняшние",
    "this-week": "на-этой-неделе",
    "yesterday": "Вчерашние"
  }
});

localize("Mobile.SalesLogix.Views.Activity.MyList", {
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
    "alarm": "С_оповещением",
    "status-unconfirmed": "Неподтвержденные",
    "status-accepted": "Подтвержденные",
    "status-declined": "Отмененные",
    "recurring": "Повторяющиеся",
    "timeless": "В_течение_дня",
    "today": "Сегодняшние",
    "this-week": "на-этой-неделе",
    "yesterday": "Вчерашние"
  }
});

localize("Mobile.SalesLogix.Views.Activity.Recurring", {
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
  "ownerText": "Доступ",
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

localize("Mobile.SalesLogix.Views.Address.Edit", {
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
  "stateText": "Регион/Область",
  "stateTitleText": "Регион/Область",
  "titleText": "Адрес"
});

localize("Mobile.SalesLogix.Views.Address.List", {
  "titleText": "Адреса"
});

localize("Mobile.SalesLogix.Views.AreaCategoryIssueLookup", {
  "titleText": "Субъекты"
});

localize("Mobile.SalesLogix.Views.Attachment.AddAttachment", {
  "titleText": "Добавить вложения"
});

localize("Mobile.SalesLogix.Views.Attachment.MyAttachmentList", {
  "titleText": "Мои вложения"
});

localize("Mobile.SalesLogix.Views.Charts.GenericBar", {
  "titleText": "",
  "otherText": "Другой"
});

localize("Mobile.SalesLogix.Views.Charts.GenericPie", {
  "titleText": "",
  "otherText": "Другой"
});

localize("Mobile.SalesLogix.Views.Competitor.List", {
  "titleText": "Конкуренты"
});

localize("Mobile.SalesLogix.Views.Configure", {
  "titleText": "Конфигурировать"
});

localize("Mobile.SalesLogix.Views.Contact.Detail", {
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
  "ownerText": "Доступ",
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

localize("Mobile.SalesLogix.Views.Contact.Edit", {
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

localize("Mobile.SalesLogix.Views.Contact.List", {
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

localize("Mobile.SalesLogix.Views.Contract.List", {
  "titleText": "Контракты"
});

localize("Mobile.SalesLogix.Views.ExchangeRateLookup", {
  "titleText": "Курс обмена"
});

localize("Mobile.SalesLogix.Views.FooterToolbar", {
  "copyrightText": "&copy; 2014 SalesLogix, NA, LLC. Все права защищены."
});

localize("Mobile.SalesLogix.Views.Groups.Selector", {
  "titleText": "Просмотр групп"
});

localize("Mobile.SalesLogix.Views.Help", {
  "titleText": "Помощь",
  "errorText": "Ошибка",
  "errorMessageText": "Не удалось загрузить справочный документ."
});

localize("Mobile.SalesLogix.Views.History.RelatedView", {
  "regardingText": "Тема",
  "byText": "написал(-а) ",
  "titleText": "Заметки"
});

localize("Mobile.SalesLogix.Views.Home", {
  "configureText": "Конфигурировать",
  "addAccountContactText": "Добавить контакт/субъект",
  "titleText": "Домой",
  "actionsText": "Быстрые действия",
  "viewsText": "Перейти к"
});

localize("Mobile.SalesLogix.Views.Lead.Detail", {
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
  "ownerText": "Доступ",
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

localize("Mobile.SalesLogix.Views.Lead.Edit", {
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
  "leadOwnerText": "Доступ",
  "nameText": "Имя",
  "notesText": "Комментарии",
  "notesTitleText": "Комментарии",
  "sicCodeText": "Код доступа",
  "titleText": "Наводка",
  "titleTitleText": "Должность",
  "tollFreeText": "Справочный тел.",
  "webText": "Веб-адрес",
  "workText": "Рабочий телефон",
  "mobileText": "Мобильный клиент"
});

localize("Mobile.SalesLogix.Views.Lead.List", {
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

localize("Mobile.SalesLogix.Views.LeadSource.List", {
  "titleText": "Источники наводки"
});

localize("Mobile.SalesLogix.Views.LeftDrawer", {
  "configureText": "Настройка меню",
  "addAccountContactText": "Добавить контакт/субъект",
  "titleText": "Главное меню",
  "actionsText": "Быстрые действия",
  "viewsText": "Перейти к",
  "footerText": "Другой",
  "settingsText": "Параметры",
  "helpText": "Помощь",
  "logOutText": "Выход",
  "logOutConfirmText": "Уверены, что хотите выйти?"
});

localize("Mobile.SalesLogix.Views.LogOff", {
  "messageText": "Вы вышли из системы. Закройте окно браузера.",
  "loginText": "Нажмите здесь, чтобы вернуться в систему.",
  "titleText": "Выполнен выход"
});

localize("Mobile.SalesLogix.Views.Login", {
  "copyrightText": "&copy; Infor, 2015 г. Все права защищены. www.infor.com",
  "logOnText": "Вход",
  "passText": "Пароль",
  "rememberText": "Запомнить меня",
  "titleText": "Вход",
  "userText": "ИД пользователя",
  "invalidUserText": "Неверное имя пользователя или пароль.",
  "missingUserText": "Запись пользователя не найдена.",
  "serverProblemText": "Сбой на сервере.",
  "requestAbortedText": "Запрос не выполнен.",
  "logoText": "Infor CRM"
});

localize("Mobile.SalesLogix.Views.MetricConfigure", {
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

localize("Mobile.SalesLogix.Views.MetricFilterLookup", {
  "titleText": "Фильтр/Просмотр метрики"
});

localize("Mobile.SalesLogix.Views.MetricWidget", {
  "loadingText": "Загрузка...",
  "errorText": "Ошибка при загрузке виджета."
});

localize("Mobile.SalesLogix.Views.NameEdit", {
  "titleText": "Изменить имя",
  "firstNameText": "Имя",
  "middleNameText": "Отчество",
  "lastNameText": "Фамилия",
  "prefixText": "Префикс",
  "prefixTitleText": "Префикс имени",
  "suffixText": "Суффикс",
  "suffixTitleText": "Суффикс имени"
});

localize("Mobile.SalesLogix.Views.Opportunity.List", {
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
  "estimatedCloseText": "План. Закрытие.  "
});

localize("Mobile.SalesLogix.Views.OpportunityContact.Detail", {
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

localize("Mobile.SalesLogix.Views.OpportunityContact.Edit", {
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

localize("Mobile.SalesLogix.Views.OpportunityContact.List", {
  "titleText": "Контакты по сделке",
  "selectTitleText": "Выбор контакта",
  "activitiesText": "Дела",
  "notesText": "Заметки",
  "scheduleText": "Планировать"
});

localize("Mobile.SalesLogix.Views.OpportunityProduct.Detail", {
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

localize("Mobile.SalesLogix.Views.OpportunityProduct.Edit", {
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

localize("Mobile.SalesLogix.Views.OpportunityProduct.List", {
  "titleText": "Продукты"
});

localize("Mobile.SalesLogix.Views.Owner.List", {
  "titleText": "Доступ"
});

localize("Mobile.SalesLogix.Views.Product.List", {
  "titleText": "Продукты"
});

localize("Mobile.SalesLogix.Views.ProductProgram.List", {
  "titleText": "Программы продукта"
});

localize("Mobile.SalesLogix.Views.Settings", {
  "clearLocalStorageTitleText": "Очистить хранилище",
  "clearAuthenticationTitleText": "Очистить сохраненные учетные данные",
  "errorLogTitleText": "Просмотр журналов ошибок",
  "localStorageClearedText": "Локальные хранилища успешно очищены.",
  "credentialsClearedText": "Сохраненные учетные данные успешно очищены.",
  "titleText": "Параметры"
});

localize("Mobile.SalesLogix.Views.SpeedSearchList", {
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

localize("Mobile.SalesLogix.Views.TextEdit", {
  "titleText": "Редактировать текст"
});

localize("Mobile.SalesLogix.Views.Ticket.Detail", {
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

localize("Mobile.SalesLogix.Views.Ticket.Edit", {
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

localize("Mobile.SalesLogix.Views.Ticket.List", {
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

localize("Mobile.SalesLogix.Views.Ticket.UrgencyLookup", {
  "titleText": "Срочность заявки"
});

localize("Mobile.SalesLogix.Views.TicketActivity.Detail", {
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

localize("Mobile.SalesLogix.Views.TicketActivity.RateLookup", {
  "titleText": "Ставки"
});

localize("Mobile.SalesLogix.Views.TicketActivityItem.Detail", {
  "titleText": "Компонент заявки",
  "productNameText": "Продукт",
  "skuText": "Код продукта",
  "serialNumberText": "Серийный №",
  "itemAmountText": "Цена",
  "itemDescriptionText": "Описание"
});

localize("Mobile.SalesLogix.Views.TicketActivityItem.List", {
  "titleText": "Компоненты дела по заявке"
});

localize("Mobile.SalesLogix.Views.UpdateToolbar", {
  "updateText": "Доступно обновление. Нажмите для перезагрузки."
});

localize("Mobile.SalesLogix.Views.User.CalendarAccessList", {
  "titleText": "Ресурсы действия"
});

localize("Mobile.SalesLogix.Views.User.List", {
  "titleText": "Пользователи"
});

localize("Mobile.SalesLogix.Views._CardLayoutListMixin", {
  "itemIconAltText": "Контакт",
  "allRecordsText": "поиск не выполнен"
});

localize("Mobile.SalesLogix.Views._GroupListMixin", {
  "noDefaultGroupText": "Не задана группа по умолчанию. Щелкните здесь, чтобы настроить группы. ",
  "currentGroupNotFoundText": "Текущая группа не найдена.",
  "groupTemplateSummaryText": "Сводно",
  "groupTemplateDetailText": "Детали",
  "groupsModeText": "В настоящий момент вы находитесь в режиме групп. Выполните поиск или выберите хэштег для выхода из режима групп."
});

localize("Mobile.SalesLogix.Views._RightDrawerListMixin", {
  "hashTagsSectionText": "Группы",
  "groupsSectionText": "Группы",
  "kpiSectionText": "KPI",
  "configureGroupsText": "Конфигурировать",
  "refreshGroupsText": "Обновить",
  "layoutsText": "Макеты"
});

localize("Mobile.SalesLogix.Views._SpeedSearchRightDrawerListMixin", {
  "indexSectionText": "Индексы"
});
});
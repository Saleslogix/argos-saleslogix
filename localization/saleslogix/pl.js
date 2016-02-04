define('localization/saleslogix/pl', ['localization/pl', 'Mobile/SalesLogix/ApplicationModule'], function() {

localize("argos.Calendar", {
  "timeFormatText": "h:mm A",
  "titleText": "Kalendarz",
  "amText": "Przed południem",
  "pmText": "Po południu",
  "monthsShortText": {
    "0": "Sty",
    "1": "Lut",
    "2": "Mar",
    "3": "Kwi",
    "4": "Maj",
    "5": "Cze",
    "6": "Lip",
    "7": "Sie",
    "8": "Wrz",
    "9": "Paź",
    "10": "Lis",
    "11": "Gru"
  }
});

localize("argos.Fields.DateField", {
  "dateFormatText": "DD/MM/YYYY",
  "emptyText": "",
  "invalidDateFormatErrorText": "Błędny format daty w polu '${0}'."
});

localize("argos.Format", {
  "shortDateFormatText": "D/M/YYYY",
  "percentFormatText": "${0}${1}",
  "yesText": "Tak",
  "noText": "Nie",
  "trueText": "P",
  "falseText": "F",
  "hoursText": "godz.",
  "hourText": "godz.",
  "minutesText": "min.",
  "minuteText": "min.",
  "bytesText": "B"
});

localize("crm.GroupUtility", {
  "groupDateFormatText": "D/M/YYYY h:mm:ss a"
});

localize("crm.Recurrence", {
  "dayFormatText": "DD",
  "monthFormatText": "MM",
  "monthAndDayFormatText": "DD/MM",
  "weekdayFormatText": "dddd",
  "endDateFormatText": "D/M/YYYY",
  "neverText": "Nigdy",
  "daysText": "dni",
  "dailyText": "Codziennie",
  "weeksText": "tygodni",
  "weeklyText": "Cotygodniowo",
  "weeklyOnText": "Cotygodniowo w ${3}",
  "monthsText": "mies.",
  "monthlyText": "Comiesięcznie",
  "monthlyOnDayText": "Miesięcznie dnia ${1}",
  "monthlyOnText": "Miesięcznie w ${5} ${3}",
  "yearsText": "lat",
  "yearlyText": "Corocznie",
  "yearlyOnText": "Corocznie w ${2}",
  "yearlyOnWeekdayText": "Corocznie w ${5} ${3} w ${4}",
  "everyText": "co ${0} ${1}",
  "afterCompletionText": "po ukończeniu",
  "untilEndDateText": "${0} do ${1}",
  "weekDaysText": {
    "0": "niedziela",
    "1": "poniedziałek",
    "2": "wtorek",
    "3": "środa",
    "4": "czwartek",
    "5": "piątek",
    "6": "sobota"
  },
  "ordText": {
    "0": "dzień",
    "1": "pierwszy",
    "2": "drugi",
    "3": "trzeci",
    "4": "czwarty",
    "5": "ostatni"
  }
});

localize("crm.Views.Activity.Complete", {
  "completedFormatText": "D/M/YYYY h:mm A",
  "startingFormatText": "D/M/YYYY h:mm A",
  "startingTimelessFormatText": "D/M/YYYY",
  "activityInfoText": "Dane czynności",
  "accountText": "klient",
  "contactText": "kontakt",
  "opportunityText": "szansa",
  "ticketNumberText": "zgłoszenie",
  "companyText": "firma",
  "leadText": "potencjalny klient",
  "asScheduledText": "jak zaplanowano",
  "categoryText": "kategoria",
  "categoryTitleText": "Kategoria czynności",
  "completedText": "data zakończenia",
  "completionText": "Zakończenie",
  "durationText": "czas trwania",
  "durationInvalidText": "Pole '${2}' musi mieć wartość.",
  "carryOverNotesText": "przenieś notatki",
  "followUpText": "kontynuacja",
  "followUpTitleText": "Typ kontynuacji",
  "leaderText": "lider",
  "longNotesText": "notatki",
  "longNotesTitleText": "Notatki",
  "otherInfoText": "Inne informacje",
  "priorityText": "priorytet",
  "priorityTitleText": "Priorytet",
  "regardingText": "dotyczy",
  "regardingTitleText": "Czynność dotycząca",
  "resultText": "wynik",
  "resultTitleText": "Wynik",
  "startingText": "data rozpoczęcia",
  "timelessText": "bez ograniczeń czasowych",
  "durationValueText": {
    "0": "brak",
    "15": "15 minut",
    "30": "30 minut",
    "60": "1 godzina",
    "90": "1,5 godziny",
    "120": "2 godziny"
  },
  "followupValueText": {
    "none": "Brak",
    "atPhoneCall": "Telefon",
    "atAppointment": "Spotkanie",
    "atToDo": "Lista do zrobienia",
    "atPersonal": "Czynność osobista"
  }
});

localize("crm.Views.Activity.Detail", {
  "startDateFormatText": "D/M/YYYY h:mm:ss A",
  "timelessDateFormatText": "D/M/YYYY",
  "alarmDateFormatText": "D/M/YYYY h:mm:ss A",
  "activityTypeText": {
    "atToDo": "Lista do zrobienia",
    "atPhoneCall": "Telefon",
    "atAppointment": "Spotkanie",
    "atLiterature": "Wniosek o literaturę",
    "atPersonal": "Czynność osobista"
  },
  "actionsText": "Szybki dostęp",
  "completeActivityText": "Zakończ czynność",
  "completeOccurrenceText": "Zakończ wystąpienie",
  "completeSeriesText": "Zakończ serię",
  "locationText": "lokalizacja",
  "alarmText": "alarm",
  "alarmTimeText": "alarm",
  "categoryText": "kategoria",
  "durationText": "czas trwania",
  "leaderText": "lider",
  "longNotesText": "notatki",
  "priorityText": "priorytet",
  "regardingText": "dotyczy",
  "rolloverText": "automatyczne przesunięcie",
  "startTimeText": "czas rozpoczęcia",
  "allDayText": "cały dzień",
  "timelessText": "bez ograniczeń czasowych",
  "titleText": "Czynność",
  "typeText": "typ",
  "companyText": "firma",
  "leadText": "potencjalny klient",
  "accountText": "klient",
  "contactText": "kontakt",
  "opportunityText": "szansa",
  "ticketNumberText": "zgłoszenie",
  "whenText": "Kiedy",
  "whoText": "Kto",
  "recurrenceText": "powtarzanie",
  "confirmEditRecurrenceText": "Czy edytować wszystkie wystąpienia? Anuluj, aby edytować pojedyncze wystąpienie.",
  "relatedAttachmentText": "Załączniki",
  "relatedAttachmentTitleText": "Załączniki czynności",
  "relatedItemsText": "Pozycje powiązane",
  "phoneText": "telefon",
  "moreDetailsText": "Więcej szczegółów"
});

localize("crm.Views.Activity.Edit", {
  "startingFormatText": "D/M/YYYY h:mm A",
  "startingTimelessFormatText": "D/M/YYYY",
  "activityCategoryTitleText": "Kategoria czynności",
  "activityDescriptionTitleText": "Opis czynności",
  "locationText": "lokalizacja",
  "activityTypeTitleText": "Typ czynności",
  "alarmText": "alarm",
  "reminderText": "przypomnienie",
  "categoryText": "kategoria",
  "durationText": "czas trwania",
  "durationTitleText": "Czas trwania",
  "durationInvalidText": "Pole '${2}' musi mieć wartość.",
  "reminderInvalidText": "Pole 'Przypomnienie' musi mieć wartość.",
  "reminderTitleText": "Przypomnienie",
  "leaderText": "lider",
  "longNotesText": "notatki",
  "longNotesTitleText": "Notatki",
  "priorityText": "priorytet",
  "priorityTitleText": "Priorytet",
  "regardingText": "dotyczy",
  "rolloverText": "automatyczne przesunięcie",
  "startingText": "czas rozpoczęcia",
  "repeatsText": "powtarzaj",
  "recurringText": "cyklicznie",
  "recurringTitleText": "Cyklicznie",
  "timelessText": "bez ograniczeń czasowych",
  "titleText": "Czynność",
  "typeText": "typ",
  "accountText": "klient",
  "contactText": "kontakt",
  "opportunityText": "szansa",
  "ticketNumberText": "zgłoszenie",
  "companyText": "firma",
  "leadText": "potencjalny klient",
  "isLeadText": "dla potencjalnego klienta",
  "yesText": "Tak",
  "noText": "Nie",
  "phoneText": "telefon",
  "updateUserActErrorText": "Podczas aktualizowania czynności użytkownika wystąpił błąd.",
  "reminderValueText": {
    "0": "brak",
    "5": "5 minut",
    "15": "15 minut",
    "30": "30 minut",
    "60": "1 godzina",
    "1440": "1 dzień"
  },
  "durationValueText": {
    "0": "brak",
    "15": "15 minut",
    "30": "30 minut",
    "60": "1 godzina",
    "90": "1,5 godziny",
    "120": "2 godziny"
  }
});

localize("crm.Views.Attachment.List", {
  "attachmentDateFormatText": "ddd D/M/YYYY hh:mm:ss",
  "titleText": "Załączniki",
  "uploadedOnText": "Wczytano ",
  "hashTagQueriesText": {
    "url": "URL",
    "binary": "binarne"
  }
});

localize("crm.Views.Attachment.ViewAttachment", {
  "attachmentDateFormatText": "ddd D/MYYYY h:mm a",
  "detailsText": "Szczegóły załącznika",
  "descriptionText": "opis",
  "fileNameText": "nazwa pliku",
  "attachDateText": "data załącznika",
  "fileSizeText": "rozmiar pliku",
  "userText": "użytkownik",
  "attachmentNotSupportedText": "Załącznik ma typ pliku nieobsługiwany przy podglądzie.",
  "downloadingText": "Pobieranie załącznika...",
  "notSupportedText": "Twoje urządzenie nie obsługuje podglądu załączników."
});

localize("crm.Views.Calendar.DayView", {
  "eventDateFormatText": "D/M/YYYY",
  "dateHeaderFormatText": "dddd, D/M/YYYY",
  "startTimeFormatText": "h:mm A",
  "titleText": "Kalendarz",
  "todayText": "Dziś",
  "dayText": "Dzień",
  "weekText": "Tydzień",
  "monthText": "Miesiąc",
  "allDayText": "Cały dzień",
  "eventHeaderText": "Wydarzenia",
  "activityHeaderText": "Czynności",
  "eventMoreText": "Pokaż więcej wydarzeń",
  "toggleCollapseText": "zwiń/rozwiń"
});

localize("crm.Views.Calendar.MonthView", {
  "monthTitleFormatText": "MMMM YYYY",
  "dayTitleFormatText": "ddd D MMM, YYYY",
  "eventDateFormatText": "D/M/YYYY",
  "startTimeFormatText": "h:mm A",
  "titleText": "Kalendarz",
  "todayText": "Dziś",
  "dayText": "Dzień",
  "weekText": "Tydzień",
  "monthText": "Miesiąc",
  "allDayText": "Cały dzień",
  "eventText": "Wydarzenie",
  "eventHeaderText": "Wydarzenia",
  "countMoreText": "Pokaż więcej",
  "activityHeaderText": "Czynności",
  "toggleCollapseText": "zwiń/rozwiń",
  "weekDaysShortText": {
    "0": "Nd",
    "1": "Pon",
    "2": "Wt",
    "3": "Śr",
    "4": "Czw",
    "5": "Pt",
    "6": "Sob"
  }
});

localize("crm.Views.Calendar.WeekView", {
  "weekTitleFormatText": "D MMM, YYYY",
  "dayHeaderLeftFormatText": "dddd",
  "dayHeaderRightFormatText": "D MMM, YYYY",
  "eventDateFormatText": "D/M/YYYY",
  "startTimeFormatText": "h:mm A",
  "titleText": "Kalendarz",
  "todayText": "Dziś",
  "dayText": "Dzień",
  "weekText": "Tydzień",
  "monthText": "Miesiąc",
  "allDayText": "Cały dzień",
  "eventHeaderText": "Wydarzenia",
  "eventMoreText": "Pokaż ${0} więcej wydarzeń",
  "toggleCollapseText": "zwiń/rozwiń"
});

localize("crm.Views.ErrorLog.Detail", {
  "errorDateFormatText": "DD/MM/YYYY hh:mm A",
  "titleText": "Rejestr błędów",
  "detailsText": "Szczegóły",
  "errorDateText": "data",
  "statusTextText": "błąd",
  "urlText": "URL",
  "moreDetailsText": "Więcej szczegółów",
  "errorText": "błąd",
  "emailSubjectText": "Błąd klienta mobilnego Saleslogix",
  "copiedSuccessText": "Skopiowano do schowka"
});

localize("crm.Views.ErrorLog.List", {
  "errorDateFormatText": "DD/MM/YYYY hh:mm A",
  "titleText": "Rejestry błędów"
});

localize("crm.Views.Event.Detail", {
  "startDateFormatText": "D/M/YYYY h:mm:ss A",
  "endDateFormatText": "D/M/YYYY h:mm:ss A",
  "eventTypeText": {
    "atToDo": "Lista do zrobienia",
    "atPhoneCall": "Telefon",
    "atAppointment": "Spotkanie",
    "atLiterature": "Wniosek o literaturę",
    "atPersonal": "Czynność osobista"
  },
  "actionsText": "Szybki dostęp",
  "startTimeText": "data rozpoczęcia",
  "endTimeText": "data zakończenia",
  "titleText": "Wydarzenie",
  "descriptionText": "opis",
  "typeText": "typ",
  "whenText": "Kiedy"
});

localize("crm.Views.Event.Edit", {
  "startingFormatText": "D/M/YYYY h:mm A",
  "titleText": "Wydarzenie",
  "typeText": "typ",
  "descriptionText": "opis",
  "startDateText": "data rozpoczęcia",
  "endDateText": "data zakończenia",
  "eventTypesText": {
    "Vacation": "Urlop",
    "Business Trip": "Delegacja",
    "Conference": "Konferencja",
    "Holiday": "Dzień wolny"
  }
});

localize("crm.Views.Event.List", {
  "eventDateFormatText": "D/M/YYYY",
  "titleText": "Wydarzenia",
  "eventText": "Wydarzenie"
});

localize("crm.Views.History.Detail", {
  "dateFormatText": "D/M/YYYY h:mm:ss A",
  "categoryText": "kategoria",
  "completedText": "zakończone",
  "durationText": "czas trwania",
  "leaderText": "lider",
  "longNotesText": "notatki",
  "notesText": "Notatki",
  "priorityText": "priorytet",
  "regardingText": "dotyczy",
  "completedByText": "zakończył/a",
  "scheduledText": "zaplanowano",
  "timelessText": "bez ograniczeń czasowych",
  "companyText": "firma",
  "leadText": "potencjalny klient",
  "titleText": "Historia",
  "accountText": "klient",
  "contactText": "kontakt",
  "opportunityText": "szansa",
  "ticketNumberText": "zgłoszenie",
  "moreDetailsText": "Więcej szczegółów",
  "relatedItemsText": "Pozycje powiązane",
  "relatedAttachmentText": "Załączniki",
  "relatedAttachmentTitleText": "Historia załączników",
  "modifiedText": "data zmiany",
  "typeText": "typ",
  "activityTypeText": {
    "atToDo": "Lista do zrobienia",
    "atPhoneCall": "Telefon",
    "atAppointment": "Spotkanie",
    "atLiterature": "Wniosek o literaturę",
    "atPersonal": "Czynność osobista",
    "atQuestion": "Pytanie",
    "atEMail": "Mail"
  }
});

localize("crm.Views.History.Edit", {
  "startingFormatText": "D/M/YYYY h:mm A",
  "accountText": "klient",
  "noteDescriptionTitleText": "Opis notatki",
  "contactText": "kontakt",
  "longNotesText": "notatki",
  "longNotesTitleText": "Notatki",
  "opportunityText": "szansa",
  "ticketNumberText": "zgłoszenie",
  "regardingText": "dotyczy",
  "isLeadText": "dla potencjalnego klienta",
  "startingText": "czas",
  "titleText": "Notatka",
  "companyText": "firma",
  "leadText": "potencjalny klient",
  "relatedItemsText": "Pozycje powiązane",
  "yesText": "Tak",
  "noText": "Nie",
  "validationText": "Pole '${2}' musi mieć wartość",
  "validationCanEditText": "Brak uprawnień do edycji"
});

localize("crm.Views.History.List", {
  "hourMinuteFormatText": "h:mm A",
  "dateFormatText": "D/M/YY",
  "activityTypeText": {
    "atToDo": "Lista do zrobienia",
    "atPhoneCall": "Telefon",
    "atAppointment": "Spotkanie",
    "atLiterature": "Wniosek o literaturę",
    "atPersonal": "Czynność osobista",
    "atQuestion": "Pytanie",
    "atEMail": "Mail"
  },
  "hashTagQueriesText": {
    "my-history": "moja-historia",
    "note": "notatka",
    "phonecall": "telefon",
    "meeting": "spotkanie",
    "personal": "indywidualny",
    "email": "mail"
  },
  "titleText": "Notatki/historia",
  "viewAccountActionText": "Klient",
  "viewOpportunityActionText": "Szansa",
  "viewContactActionText": "Kontakt",
  "addAttachmentActionText": "Dodaj załącznik",
  "regardingText": "Dotyczy: "
});

localize("crm.Views.Opportunity.Detail", {
  "exchangeRateDateFormatText": "D/M/YYYY h:mm A",
  "accountText": "klient",
  "acctMgrText": "opiekun klienta",
  "estCloseText": "szacowana data zamknięcia",
  "detailsText": "Szczegóły",
  "fbarHomeTitleText": "domowy",
  "fbarScheduleTitleText": "harmonogram",
  "importSourceText": "źródło",
  "opportunityText": "szansa",
  "ownerText": "właściciel",
  "actionsText": "Szybki dostęp",
  "potentialText": "potencjał sprzedaży",
  "potentialBaseText": "potencjał sprzedaży (kurs podstawowy)",
  "potentialOpportunityText": "potencjał sprzedaży (kurs szansy)",
  "potentialMyRateText": "potencjał sprzedaży (mój kurs)",
  "probabilityText": "prawdopodobieństwo zamknięcia",
  "relatedActivitiesText": "Czynności",
  "relatedContactsText": "Kontakty szansy",
  "relatedHistoriesText": "Notatki/historia",
  "relatedItemsText": "Pozycje powiązane",
  "relatedNotesText": "Notatki",
  "relatedProductsText": "Produkty",
  "relatedAttachmentText": "Załączniki",
  "relatedAttachmentTitleText": "Załączniki szansy",
  "resellerText": "pośrednik sprzedaży",
  "statusText": "status",
  "titleText": "Szansa",
  "typeText": "typ",
  "scheduleActivityText": "Zaplanuj czynność",
  "addNoteText": "Dodaj notatkę",
  "moreDetailsText": "Więcej szczegółów",
  "multiCurrencyText": "Wielowalutowość",
  "multiCurrencyRateText": "kurs wymiany",
  "multiCurrencyCodeText": "kod",
  "multiCurrencyDateText": "data kursu",
  "multiCurrencyLockedText": "kurs zablokowany"
});

localize("crm.Views.Opportunity.Edit", {
  "exchangeRateDateFormatText": "D/M/YYYY h:mm A",
  "accountText": "klient",
  "acctMgrText": "opiekun klienta",
  "estCloseText": "szacowana data zamknięcia",
  "importSourceText": "źródło",
  "detailsText": "Szczegóły",
  "opportunityStatusTitleText": "Status szansy",
  "opportunityText": "szansa",
  "opportunityTypeTitleText": "Typ szansy",
  "ownerText": "właściciel",
  "potentialText": "potencjał sprzedaży",
  "probabilityText": "prawdopodobieństwo zamknięcia",
  "probabilityTitleText": "Prawdopodobieństwo szansy",
  "resellerText": "pośrednik sprzedaży",
  "statusText": "status",
  "titleText": "Szansa",
  "typeText": "typ",
  "multiCurrencyText": "Wielowalutowość",
  "multiCurrencyRateText": "kurs wymiany",
  "multiCurrencyCodeText": "kod",
  "multiCurrencyDateText": "data kursu",
  "multiCurrencyLockedText": "kurs zablokowany",
  "subTypePickListResellerText": "Pośrednik sprzedaży"
});

localize("crm.Views.TicketActivity.Edit", {
  "startingFormatText": "D/M/YYYY h:mm A",
  "titleText": "Edytuj czynność zgłoszenia",
  "activityTypeText": "typ",
  "activityTypeTitleText": "Typ",
  "publicAccessText": "dostęp publiczny",
  "publicAccessTitleText": "Dostęp publiczny",
  "userText": "użytkownik",
  "startDateText": "data rozpoczęcia",
  "endDateText": "data zakończenia",
  "commentsText": "uwagi"
});

localize("crm.Views.TicketActivity.List", {
  "startDateFormatText": "DD/MM/YYYY h:mm A",
  "titleText": "Czynności zgłoszenia"
});

localize("argos.ErrorManager", {
  "abortedText": "Przerwano",
  "scopeSaveText": "Nie zapisano zakresu w raporcie błędu"
});

localize("argos.Fields.DurationField", {
  "emptyText": "",
  "invalidDurationErrorText": "Błędny czas trwania w polu '${0}'.",
  "autoCompleteText": {
    "1": "min.",
    "60": "godz.",
    "1440": "dni",
    "10080": "tygodni",
    "525960": "lat"
  }
});

localize("argos.Fields.EditorField", {
  "lookupLabelText": "edycja",
  "lookupText": "...",
  "emptyText": "puste",
  "completeText": "OK"
});

localize("argos.Fields.LookupField", {
  "dependentErrorText": "Wybierz wartość dla '${0}'",
  "emptyText": "",
  "completeText": "Wybierz",
  "lookupLabelText": "wyszukiwanie",
  "lookupText": "..."
});

localize("argos.Fields.SignatureField", {
  "signatureLabelText": "podpis",
  "signatureText": "..."
});

localize("argos.GroupedList", {
  "toggleCollapseText": "zwiń/rozwiń"
});

localize("argos.Groups.DateTimeSection", {
  "displayNameText": "Wybór daty i czasu",
  "todayText": "Dziś",
  "tomorrowText": "Jutro",
  "laterThisWeekText": "Później w tym tygodniu",
  "earlierThisWeekText": "Wcześniej w tym tygodniu  ",
  "thisLaterMonthText": "Później w tym miesiącu",
  "thisEarlierMonthText": "Wcześniej w tym miesiącu ",
  "thisYearEarlierText": "Wcześniej w tym roku",
  "thisYearLaterText": "Później w tym roku",
  "yesterdayText": "Wczoraj",
  "lastWeekText": "Ostatni tydzień",
  "lastMonthText": "Ostatni miesiąc",
  "pastYearText": "Wcześniejsze lata",
  "nextYearText": "Kolejny rok",
  "nextMonthText": "Kolejny miesiąc",
  "nextWeekText": "Kolejny tydzień",
  "futureText": "Przyszłość",
  "twoWeeksAgoText": "Dwa tygodnie temu",
  "threeWeeksAgoText": "Trzy tygodnie temu",
  "twoMonthsAgoText": "Dwa miesiące temu",
  "threeMonthsAgoText": "Trzy miesiące temu",
  "unknownText": "Nieznany"
});

localize("argos.Groups.GroupByValueSection", {
  "displayNameText": "Grupa wg wyboru wartości"
});

localize("argos.MainToolbar", {
  "titleText": "Komórka"
});

localize("argos.RelatedViewWidget", {
  "nodataText": "nie znaleziono rekordów...",
  "selectMoreDataText": "zobacz ${0} więcej ${1}... ",
  "navToListText": "zobacz listę",
  "loadingText": "wczytywanie... ",
  "refreshViewText": "odśwież",
  "itemOfCountText": " ${0} z ${1}",
  "totalCountText": " (${0})",
  "titleText": "Widok powiązany"
});

localize("argos.SearchWidget", {
  "searchText": "Szukaj"
});

localize("argos.SelectionModel", {
  "requireSelectionText": "Wybór jest wymagany; nie można odznaczyć ostatniej pozycji."
});

localize("argos.View", {
  "titleText": "Widok ogólny"
});

localize("argos.Views.ConfigureQuickActions", {
  "titleText": "Konfiguracja szybkich czynności"
});

localize("argos.Views.FileSelect", {
  "titleText": "Wybór pola",
  "addFileText": "Aby dodać plik, kliknij/dotknij tutaj.",
  "uploadText": "Wczytaj",
  "cancelText": "Anuluj",
  "selectFileText": "Wybierz plik",
  "loadingText": "Wczytywanie...",
  "descriptionText": "opis",
  "bytesText": "B",
  "notSupportedText": "Twoje urządzenie nie obsługuje dodawania załączników."
});

localize("argos.Views.Signature", {
  "titleText": "Podpis",
  "clearCanvasText": "Wymaż",
  "undoText": "Cofnij"
});

localize("argos._ConfigureBase", {
  "titleText": "Konfiguruj"
});

localize("argos._DetailBase", {
  "editText": "Edycja",
  "titleText": "Szczegół",
  "detailsText": "Szczegóły",
  "loadingText": "wczytywanie...",
  "notAvailableText": "Żądane dane są niedostępne.",
  "toggleCollapseText": "zwiń/rozwiń"
});

localize("argos._EditBase", {
  "saveText": "Zapisz",
  "titleText": "Edycja",
  "validationSummaryText": "Podsumowanie zatwierdzenia",
  "concurrencySummaryText": "Błąd zgodności",
  "detailsText": "Szczegóły",
  "loadingText": "wczytywanie...",
  "errorText": {
    "general": "Podczas żądania danych wystąpił błąd serwera. ",
    "status": {
      "410": "Błąd zapisu. Ten rekord już nie istnieje. "
    }
  },
  "concurrencyErrorText": "To pole zostało zaktualizowane przez innego użytkownika. "
});

localize("argos._ErrorHandleMixin", {
  "errorText": {
    "general": "Błąd serwera."
  }
});

localize("argos._ListBase", {
  "moreText": "Pobierz więcej rekordów",
  "emptySelectionText": "Brak",
  "titleText": "Lista",
  "configureText": "Konfiguruj",
  "errorRenderText": "Błąd przedkładania szablonu wierszy.",
  "remainingText": "Pozostałe rekordy: ${0} ",
  "cancelText": "Anuluj",
  "insertText": "Nowy",
  "noDataText": "brak rekordów",
  "loadingText": "wczytywanie..."
});

localize("argos._PullToRefreshMixin", {
  "pullRefreshText": "Przeciągnij w dół, aby odświeżyć...",
  "pullReleaseText": "Upuść, aby odświeżyć..."
});

localize("argos._RelatedViewWidgetBase", {
  "loadingText": "wczytywanie... "
});

localize("crm.Action", {
  "calledText": "Dzwoniono ${0}",
  "emailedText": "Wysłano mail ${0}"
});

localize("crm.Application", {
  "versionInfoText": "Urządzenie mobilne v${0}.${1}.${2}",
  "loadingText": "Wczytywanie stanu aplikacji",
  "authText": "Uwierzytelnianie"
});

localize("crm.ApplicationModule", {
  "searchText": "Wyszukiwanie"
});

localize("crm.DefaultMetrics", {
  "accountsText": {
    "totalRevenue": "Łączny przychód",
    "averageTime": "Średni czas jako klient",
    "total": "Wszyscy klienci"
  },
  "opportunitiesText": {
    "total": "Wszystkie szanse",
    "potential": "Łączny potencjał sprzedaży",
    "montlyPotential": "Średni miesięczny potencjał sprzedaży"
  },
  "ticketsText": {
    "total": "Wszystkie zgłoszenia",
    "averageOpen": "Średni czas otwarcia"
  },
  "contactsText": {
    "total": "Wszystkie kontakty"
  },
  "leadsText": {
    "total": "Wszyscy potencjalni klienci"
  },
  "historyText": {
    "total": "Cała historia",
    "duration": "Łączny czas trwania"
  }
});

localize("crm.Fields.AddressField", {
  "lookupLabelText": "edycja",
  "emptyText": ""
});

localize("crm.Fields.NameField", {
  "emptyText": ""
});

localize("crm.Fields.RecurrencesField", {
  "titleText": "Cyklicznie",
  "emptyText": ""
});

localize("crm.FileManager", {
  "unableToUploadText": "Ta przeglądarka nie obsługuje API pliku HTML5.",
  "unknownSizeText": "nieznany",
  "unknownErrorText": "Uwaga: Wystąpił błąd, pliku nie wczytano.",
  "largeFileWarningText": "Uwaga: To żądanie przekracza limit rozmiaru ustawiony przez administratora. Wczytywanie nie powiodło się.",
  "percentCompleteText": "Trwa wczytywanie; proszę czekać..."
});

localize("crm.Format", {
  "bigNumberAbbrText": {
    "billion": "B",
    "million": "M",
    "thousand": "K"
  },
  "userActivityFormatText": {
    "asUnconfirmed": "Niepotwierdzone",
    "asAccepted": "Zaakceptowane",
    "asDeclned": "Odrzucone"
  }
});

localize("crm.SpeedSearchWidget", {
  "searchText": "Szybkie wyszukiwanie"
});

localize("crm.Validator", {
  "exists": {
    "message": "Pole '${2}' musi mieć wartość."
  },
  "name": {
    "message": "W polu '${2}' należy podać imię i nazwisko."
  },
  "notEmpty": {
    "message": "Pole '${2}' nie może być puste."
  },
  "hasText": {
    "test": "",
    "message": "Pole '${2}' musi zawierać tekst."
  },
  "isInteger": {
    "message": "Wartość '${0}' jest błędna."
  },
  "isDecimal": {
    "message": "Wartość '${0}' jest błędna."
  },
  "isCurrency": {
    "message": "Wartość '${0}' to błędna waluta."
  },
  "isInt32": {
    "message": "Wartość pola '${2}' przekracza dozwolony zakres liczbowy.   "
  },
  "exceedsMaxTextLength": {
    "message": "Wartość  pola '${2}' przekracza dozwoloną długość."
  },
  "isDateInRange": {
    "message": "Wartość pola '${2}' przekracza dozwolony zakres dat. "
  }
});

localize("crm.Views.Account.Detail", {
  "accountText": "klient",
  "acctMgrText": "opiekun klienta",
  "addressText": "adres",
  "businessDescriptionText": "opis działalności",
  "createDateText": "data utworzenia",
  "createUserText": "utworzył/a",
  "faxText": "faks",
  "importSourceText": "źródło",
  "industryText": "branża",
  "notesText": "notatki",
  "ownerText": "właściciel",
  "phoneText": "telefon",
  "activityTypeText": {
    "atPhoneCall": "Telefon"
  },
  "actionsText": "Szybki dostęp",
  "relatedActivitiesText": "Czynności",
  "relatedContactsText": "Kontakty",
  "relatedHistoriesText": "Notatki/historia",
  "relatedItemsText": "Pozycje powiązane",
  "relatedNotesText": "Notatki",
  "relatedOpportunitiesText": "Szanse",
  "relatedTicketsText": "Zgłoszenia",
  "relatedAddressesText": "Adresy",
  "relatedAttachmentText": "Załączniki",
  "relatedAttachmentTitleText": "Załączniki klienta",
  "statusText": "status",
  "subTypeText": "podtyp",
  "titleText": "Klient",
  "typeText": "typ",
  "webText": "strona www",
  "scheduleActivityText": "Zaplanuj czynność",
  "addNoteText": "Dodaj notatkę",
  "moreDetailsText": "Więcej szczegółów",
  "calledText": "Dzwoniono ${0}"
});

localize("crm.Views.Account.Edit", {
  "accountStatusTitleText": "Status klienta",
  "accountSubTypeTitleText": "Podtyp klienta",
  "accountText": "klient",
  "accountTypeTitleText": "Typ klienta",
  "acctMgrText": "opiekun klienta",
  "businessDescriptionText": "opis działalności",
  "businessDescriptionTitleText": "Opis działalności",
  "descriptionText": "opis",
  "faxText": "faks",
  "fullAddressText": "adres",
  "importSourceText": "źródło",
  "industryText": "branża",
  "industryTitleText": "Branża",
  "ownerText": "właściciel",
  "phoneText": "telefon",
  "statusText": "status",
  "subTypeText": "podtyp",
  "titleText": "Klient",
  "typeText": "typ",
  "webText": "strona www"
});

localize("crm.Views.Account.List", {
  "titleText": "Klienci",
  "activitiesText": "Czynności",
  "notesText": "Notatki",
  "scheduleText": "Harmonogram",
  "editActionText": "Edycja",
  "callMainActionText": "Zadzwoń na główny ",
  "viewContactsActionText": "Kontakty",
  "addNoteActionText": "Dodaj notatkę",
  "addActivityActionText": "Dodaj czynność",
  "addAttachmentActionText": "Dodaj załącznik",
  "phoneAbbreviationText": "Telefon: ",
  "faxAbbreviationText": "Faks: "
});

localize("crm.Views.Activity.List", {
  "allDayText": "Bez ograniczeń czasowych",
  "completeActivityText": "Zakończenie",
  "callText": "Telefon",
  "calledText": "Dzwoniono",
  "addAttachmentActionText": "Dodaj załącznik",
  "overdueText": "zaległe",
  "alarmText": "alarm",
  "touchedText": "zmieniony",
  "importantText": "ważny",
  "recurringText": "cyklicznie",
  "activityTypeText": {
    "atToDo": "Lista do zrobienia",
    "atPhoneCall": "Telefon",
    "atAppointment": "Spotkanie",
    "atLiterature": "Wniosek o literaturę",
    "atPersonal": "Indywidualny",
    "atQuestion": "Pytanie",
    "atNote": "Notatka",
    "atEMail": "Mail"
  },
  "titleText": "Czynności",
  "hashTagQueriesText": {
    "alarm": "alarm",
    "recurring": "cyklicznie",
    "timeless": "bez-ograniczeń-czasowych",
    "today": "dziś",
    "this-week": "ten-tydzień",
    "yesterday": "wczoraj"
  }
});

localize("crm.Views.Activity.MyList", {
  "titleText": "Moje czynności",
  "completeActivityText": "Zakończ",
  "acceptActivityText": "Akceptuj",
  "declineActivityText": "Odrzuć",
  "callText": "Telefon",
  "calledText": "Dzwoniono",
  "addAttachmentActionText": "Dodaj załącznik",
  "viewContactActionText": "Kontakt",
  "viewAccountActionText": "Klient",
  "viewOpportunityActionText": "Szansa",
  "hashTagQueriesText": {
    "alarm": "alarm",
    "status-unconfirmed": "status-niepotwierdzony",
    "status-accepted": "status-zaakceptowany",
    "status-declined": "status-odrzucony",
    "recurring": "cyklicznie",
    "timeless": "bez-ograniczeń-czasowych",
    "today": "dziś",
    "this-week": "ten-tydzień",
    "yesterday": "wczoraj"
  }
});

localize("crm.Views.Activity.Recurring", {
  "startingText": "data rozpoczęcia",
  "endingText": "data zakończenia",
  "repeatsText": "powtarzaj",
  "everyText": "co",
  "afterCompletionText": "po ukończeniu",
  "singleWeekdayText": "dzień roboczy",
  "weekdaysText": "dni robocze",
  "dayText": "dzień",
  "monthText": "miesiąc",
  "onText": "dn.",
  "occurrencesText": "wystąpień",
  "summaryText": "podsumowanie",
  "weekDaysText": {
    "0": "niedziela",
    "1": "poniedziałek",
    "2": "wtorek",
    "3": "środa",
    "4": "czwartek",
    "5": "piątek",
    "6": "sobota"
  },
  "monthsText": {
    "0": "styczeń",
    "1": "luty",
    "2": "marzec",
    "3": "kwiecień",
    "4": "maj",
    "5": "czerwiec",
    "6": "lipiec",
    "7": "sierpień",
    "8": "wrzesień",
    "9": "październik",
    "10": "listopad",
    "11": "grudzień"
  },
  "frequencyOptionsText": {
    "0": "dni",
    "1": "tygodni",
    "2": "mies.",
    "3": "lat"
  },
  "recurringFrequencyText": "Częstotliwość powtarzania",
  "yesText": "Tak",
  "noText": "Nie",
  "titleText": "Powtarzanie"
});

localize("crm.Views.Activity.TypesList", {
  "titleText": "Zaplanuj...",
  "activityTypeText": {
    "atToDo": "Lista do zrobienia",
    "atPhoneCall": "Telefon",
    "atAppointment": "Spotkanie",
    "atLiterature": "Wniosek o literaturę",
    "atPersonal": "Czynność osobista",
    "event": "Wydarzenie"
  }
});

localize("crm.Views.AddAccountContact", {
  "accountNameText": "klient",
  "accountStatusTitleText": "Status klienta",
  "accountSubTypeTitleText": "Podtyp klienta",
  "accountText": "Klient",
  "accountTypeTitleText": "Typ klienta",
  "acctMgrText": "opiekun klienta",
  "addressText": "adres",
  "contactTitleText": "Tytuł",
  "descriptionText": "opis",
  "detailsAccountText": "Dane klienta",
  "detailsContactText": "Dane kontaktu",
  "detailsText": "Dane kontaktu/klienta",
  "emailText": "mail",
  "faxText": "faks",
  "homePhoneText": "telefon domowy",
  "industryText": "branża",
  "ownerText": "właściciel",
  "lastNameText": "ostatni",
  "mobileText": "komórka",
  "nameText": "imię i nazwisko",
  "statusText": "status",
  "subTypeText": "podtyp",
  "titleText": "Dodaj klienta/kontakt",
  "typeText": "typ",
  "webText": "strona www",
  "phoneText": "telefon",
  "workText": "telefon służbowy",
  "industryTitleText": "Branża"
});

localize("crm.Views.Address.Edit", {
  "address1Text": "1. adres",
  "address2Text": "2. adres",
  "address3Text": "3. adres",
  "cityText": "miasto",
  "cityTitleText": "Miasto",
  "countryText": "kraj",
  "countryTitleText": "Kraj",
  "descriptionText": "opis",
  "descriptionTitleText": "Opis",
  "isMailingText": "wysyłka",
  "isPrimaryText": "główny",
  "postalCodeText": "pocztowy",
  "salutationText": "do rąk",
  "stateText": "województwo",
  "stateTitleText": "Województwo",
  "titleText": "Adres"
});

localize("crm.Views.Address.List", {
  "titleText": "Adresy"
});

localize("crm.Views.AreaCategoryIssueLookup", {
  "titleText": "Klienci"
});

localize("crm.Views.Attachment.AddAttachment", {
  "titleText": "Dodaj załączniki"
});

localize("crm.Views.Attachment.MyAttachmentList", {
  "titleText": "Moje załączniki"
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
  "loadingText": "wczytywanie..."
});

localize("crm.Views.Competitor.List", {
  "titleText": "Konkurenci"
});

localize("crm.Views.Configure", {
  "titleText": "Konfiguruj"
});

localize("crm.Views.Contact.Detail", {
  "activityTypeText": {
    "atPhoneCall": "Telefon",
    "atEMail": "Mail"
  },
  "accountText": "klient",
  "acctMgrText": "opiekun klienta",
  "addressText": "adres",
  "contactTitleText": "tytuł",
  "createDateText": "data utworzenia",
  "createUserText": "utworzył/a",
  "emailText": "mail",
  "faxText": "faks",
  "homeText": "telefon domowy",
  "nameText": "kontakt",
  "ownerText": "właściciel",
  "actionsText": "Szybki dostęp",
  "relatedAccountsText": "Klienci",
  "relatedActivitiesText": "Czynności",
  "relatedHistoriesText": "Notatki/historia",
  "relatedItemsText": "Pozycje powiązane",
  "relatedNotesText": "Notatki",
  "relatedOpportunitiesText": "Szanse",
  "relatedTicketsText": "Zgłoszenia",
  "relatedAddressesText": "Adresy",
  "relatedAttachmentText": "Załączniki",
  "relatedAttachmentTitleText": "Załączniki kontaktu",
  "titleText": "Kontakt",
  "webText": "strona www",
  "workText": "telefon służbowy",
  "cuisinePreferenceText": "kuchnia",
  "callMobileNumberText": "Zadzwoń na komórkę",
  "callWorkNumberText": "Zadzwoń na służbowy",
  "calledText": "Dzwoniono",
  "scheduleActivityText": "Zaplanuj czynność",
  "addNoteText": "Dodaj notatkę",
  "sendEmailText": "Wyślij mail",
  "viewAddressText": "Pokaż adres",
  "moreDetailsText": "Więcej szczegółów"
});

localize("crm.Views.Contact.Edit", {
  "titleText": "Kontakt",
  "nameText": "imię i nazwisko",
  "workText": "telefon służbowy",
  "mobileText": "telefon komórkowy",
  "emailText": "mail",
  "webText": "strona www",
  "acctMgrText": "opiekun klienta",
  "accountNameText": "klient",
  "homePhoneText": "telefon domowy",
  "faxText": "faks",
  "addressText": "adres",
  "contactTitleText": "tytuł",
  "titleTitleText": "Tytuł",
  "addressTitleText": "Adres",
  "ownerText": "właściciel",
  "cuisinePreferenceText": "kuchnia",
  "cuisinePreferenceTitleText": "Kuchnia"
});

localize("crm.Views.Contact.List", {
  "titleText": "Kontakty",
  "activitiesText": "Czynności",
  "notesText": "Notatki",
  "scheduleText": "Harmonogram",
  "editActionText": "Edycja",
  "callMainActionText": "Zadzwoń na główny ",
  "callWorkActionText": "Zadzwoń na służbowy",
  "callMobileActionText": "Zadzwoń na komórkę",
  "sendEmailActionText": "Mail",
  "viewAccountActionText": "Klient",
  "addNoteActionText": "Dodaj notatkę",
  "addActivityActionText": "Dodaj czynność",
  "addAttachmentActionText": "Dodaj załącznik",
  "phoneAbbreviationText": "Praca: ",
  "mobileAbbreviationText": "Komórka: "
});

localize("crm.Views.Contract.List", {
  "titleText": "Umowy"
});

localize("crm.Views.ExchangeRateLookup", {
  "titleText": "Kursy wymiany"
});

localize("crm.Views.FooterToolbar", {
  "copyrightText": "&copy; 2014 SalesLogix, NA, LLC. Wszelkie prawa zastrzeżone."
});

localize("crm.Views.Groups.Selector", {
  "titleText": "Wyszukiwanie grup"
});

localize("crm.Views.Help", {
  "titleText": "Pomoc",
  "errorText": "Błąd",
  "errorMessageText": "Nie można wczytać dokumentu pomocy."
});

localize("crm.Views.History.RelatedView", {
  "regardingText": "Dotyczy",
  "byText": "napisano ",
  "titleText": "Notatki"
});

localize("crm.Views.Home", {
  "configureText": "Konfiguruj",
  "addAccountContactText": "Dodaj klienta/kontakt",
  "titleText": "Domowy",
  "actionsText": "Szybki dostęp",
  "viewsText": "Idź do"
});

localize("crm.Views.Lead.Detail", {
  "activityTypeText": {
    "atPhoneCall": "Telefon",
    "atEMail": "Mail"
  },
  "accountText": "firma",
  "addressText": "adres",
  "businessDescriptionText": "opis działalności",
  "createDateText": "data utworzenia",
  "createUserText": "utworzył/a",
  "eMailText": "mail",
  "leadSourceText": "źródło",
  "industryText": "branża",
  "interestsText": "zainteresowania",
  "leadTitleText": "tytuł",
  "nameText": "imię i nazwisko",
  "notesText": "uwagi",
  "ownerText": "właściciel",
  "relatedActivitiesText": "Czynności",
  "relatedHistoriesText": "Notatki/historia",
  "relatedItemsText": "Pozycje powiązane",
  "relatedNotesText": "Notatki",
  "relatedAttachmentText": "Załączniki",
  "relatedAttachmentTitleText": "Załączniki potencjalnego klienta",
  "sicCodeText": "kod SIC",
  "titleText": "Potencjalny klient",
  "tollFreeText": "bezpłatnie",
  "mobileText": "telefon komórkowy",
  "webText": "strona www",
  "workText": "telefon służbowy",
  "actionsText": "Szybki dostęp",
  "callWorkNumberText": "Zadzwoń na numer główny",
  "scheduleActivityText": "Zaplanuj czynność",
  "addNoteText": "Dodaj notatkę",
  "sendEmailText": "Wyślij mail",
  "viewAddressText": "Pokaż adres",
  "moreDetailsText": "Więcej szczegółów",
  "calledText": "Dzwoniono ${0}",
  "emailedText": "Wysłano maila ${0}"
});

localize("crm.Views.Lead.Edit", {
  "accountText": "klient",
  "addressText": "adres",
  "businessText": "opis działalności",
  "businessTitleText": "Opis działalności",
  "companyText": "firma",
  "contactTitleText": "tytuł",
  "emailText": "mail",
  "faxText": "faks",
  "importSourceText": "źródło",
  "industryText": "branża",
  "industryTitleText": "Branża",
  "interestsText": "zainteresowania",
  "leadNameLastFirstText": "imię i nazwisko",
  "leadOwnerText": "właściciel",
  "nameText": "imię i nazwisko",
  "notesText": "uwagi",
  "notesTitleText": "Uwagi",
  "sicCodeText": "kod SIC",
  "titleText": "Potencjalny klient",
  "titleTitleText": "Tytuł",
  "tollFreeText": "bezpłatnie",
  "webText": "strona www",
  "workText": "telefon służbowy",
  "mobileText": "telefon komórkowy"
});

localize("crm.Views.Lead.List", {
  "titleText": "Potencjalni klienci",
  "activitiesText": "Czynności",
  "notesText": "Notatki",
  "scheduleText": "Harmonogram",
  "emailedText": "Wysłano mail ${0}",
  "calledText": "Dzwoniono ${0}",
  "editActionText": "Edycja",
  "callMobileActionText": "Zadzwoń na komórkę",
  "callWorkActionText": "Zadzwoń na służbowy",
  "sendEmailActionText": "Mail",
  "addNoteActionText": "Dodaj notatkę",
  "addActivityActionText": "Dodaj czynność",
  "addAttachmentActionText": "Dodaj załącznik",
  "phoneAbbreviationText": "Praca: ",
  "mobileAbbreviationText": "Komórka: ",
  "tollFreeAbbreviationText": "Bezpłatnie: "
});

localize("crm.Views.LeadSource.List", {
  "titleText": "Źródła"
});

localize("crm.Views.LeftDrawer", {
  "configureText": "Konfiguracja menu",
  "addAccountContactText": "Dodaj klienta/kontakt",
  "titleText": "Menu główne",
  "actionsText": "Szybki dostęp",
  "viewsText": "Idź do",
  "footerText": "Inne",
  "settingsText": "Ustawienia",
  "helpText": "Pomoc",
  "logOutText": "Wyloguj",
  "logOutConfirmText": "Czy na pewno wylogować?"
});

localize("crm.Views.LogOff", {
  "messageText": "Wylogowano. Zamknij okno przeglądarki.",
  "loginText": "Aby zalogować ponownie, kliknij tutaj.",
  "titleText": "Wylogowano"
});

localize("crm.Views.Login", {
  "copyrightText": "Copyright &copy; 2015 Infor. Wszelkie prawa zastrzeżone. www.infor.com",
  "logOnText": "Zaloguj",
  "passText": "Hasło",
  "rememberText": "Zapamiętaj mnie",
  "titleText": "Zaloguj",
  "userText": "ID użytkownika",
  "invalidUserText": "Błędna nazwa użytkownika lub hasło.",
  "missingUserText": "Nie znaleziono rekordu użytkownika. ",
  "requestAbortedText": "Przerwano wniosek.",
  "logoText": "Infor CRM"
});

localize("crm.Views.MetricConfigure", {
  "titleText": "Konfiguracja metryki",
  "metricTitleText": "tytuł",
  "metricFilterText": "filtr",
  "metricText": "metryka",
  "chartTypeText": "typ wykresu",
  "advancedText": "zaawansowane opcje",
  "formatterText": "formater",
  "aggregateText": "połącz",
  "reportViewText": "ID widoku wykresu"
});

localize("crm.Views.MetricFilterLookup", {
  "titleText": "Wyszukiwanie filtra/metryki"
});

localize("crm.Views.MetricWidget", {
  "loadingText": "wczytywanie...",
  "errorText": "Błąd wczytywania widgetu."
});

localize("crm.Views.NameEdit", {
  "titleText": "Edytuj imię i nazwisko",
  "firstNameText": "imię",
  "middleNameText": "drugie imię",
  "lastNameText": "nazwisko",
  "prefixText": "tytuł",
  "prefixTitleText": "Tytuł",
  "suffixText": "2. tytuł",
  "suffixTitleText": "2. tytuł"
});

localize("crm.Views.Opportunity.List", {
  "titleText": "Szanse",
  "activitiesText": "Czynności",
  "notesText": "Notatki",
  "scheduleText": "Harmonogram",
  "editActionText": "Edycja",
  "viewAccountActionText": "Klient",
  "viewContactsActionText": "Kontakty",
  "viewProductsActionText": "Produkty",
  "addNoteActionText": "Dodaj notatkę",
  "addActivityActionText": "Dodaj czynność",
  "addAttachmentActionText": "Dodaj załącznik",
  "actualCloseText": "Zamknięte ",
  "estimatedCloseText": "Szacowane zamknięcie ",
  "quickEditActionText": "Szybka edycja"
});

localize("crm.Views.Opportunity.QuickEdit", {
  "estCloseText": "szacowana data zamknięcia",
  "detailsText": "Szczegóły",
  "opportunityStageTitleText": "Etap szansy",
  "opportunityText": "szansa",
  "stageText": "etap",
  "statusOpenText": "Otwarta",
  "statusClosedLostText": "Zamknięta - odrzucona",
  "statusClosedWonText": "Zamknięta - przyjęta",
  "salesProcessText": "etap zablokowany przez proces sprzedaży:",
  "probabilityText": "prawdopodobieństwo zamknięcia",
  "probabilityTitleText": "Prawdopodobieństwo szansy",
  "potentialText": "potencjał sprzedaży"
});

localize("crm.Views.OpportunityContact.Detail", {
  "titleText": "Kontakt szansy",
  "accountText": "klient",
  "contactTitleText": "tytuł",
  "nameText": "kontakt",
  "moreDetailsText": "Więcej szczegółów",
  "salesRoleText": "rola",
  "strategyText": "strategia",
  "personalBenefitsText": "osobista korzyść",
  "standingText": "rzetelność",
  "issuesText": "problemy",
  "competitorNameText": "preferencja konkurenta",
  "removeContactTitleText": "Usuń kontakt",
  "confirmDeleteText": "Czy usunąć \"${0}\" z szansy?",
  "contactText": "Kontakt"
});

localize("crm.Views.OpportunityContact.Edit", {
  "titleText": "Edytuj kontakt szansy",
  "nameText": "imię i nazwisko",
  "accountNameText": "klient",
  "contactTitleText": "tytuł",
  "salesRoleText": "rola",
  "salesRoleTitleText": "Rola",
  "personalBenefitsText": "osobista korzyść",
  "strategyText": "strategia",
  "issuesText": "problemy",
  "standingText": "rzetelność",
  "standingTitleText": "Rzetelność",
  "contactText": "Kontakt",
  "competitorPrefText": "preferencja konkurenta"
});

localize("crm.Views.OpportunityContact.List", {
  "titleText": "Kontakty szansy",
  "selectTitleText": "Wybierz kontakt",
  "activitiesText": "Czynności",
  "notesText": "Notatki",
  "scheduleText": "Harmonogram"
});

localize("crm.Views.OpportunityProduct.Detail", {
  "detailsText": "Szczegóły",
  "opportunityText": "szansa",
  "productText": "produkt",
  "productFamilyText": "rodzina produktów",
  "priceLevelText": "typ ceny",
  "priceText": "cena",
  "basePriceText": "cena podstawowa",
  "discountText": "rabat",
  "quantityText": "ilość",
  "baseExtendedPriceText": "podstawa",
  "extendedPriceText": "cena rozszerzona",
  "extendedPriceSectionText": "Cena rozszerzona",
  "adjustedPriceSectionText": "Cena skorygowana",
  "baseAdjustedPriceText": "podstawa",
  "adjustedPriceText": "cena skorygowana",
  "myAdjustedPriceText": "użytkownik",
  "confirmDeleteText": "Czy usunąć ${0} z produktów szansy?",
  "removeOppProductTitleText": "usuń produkt szansy"
});

localize("crm.Views.OpportunityProduct.Edit", {
  "titleText": "Produkt szansy",
  "detailsText": "Szczegóły",
  "opportunityText": "szansa",
  "productText": "produkt",
  "productFamilyText": "rodzina produktów",
  "priceLevelText": "typ ceny",
  "priceText": "cena",
  "basePriceText": "cena podstawowa",
  "discountText": "% rabatu",
  "adjustedPriceText": "cena skorygowana",
  "myAdjustedPriceText": "użytkownik",
  "baseAdjustedPriceText": "podstawa",
  "quantityText": "ilość",
  "baseExtendedPriceText": "podstawa",
  "extendedPriceText": "cena rozszerzona",
  "extendedPriceSectionText": "Cena rozszerzona",
  "adjustedPriceSectionText": "Cena skorygowana"
});

localize("crm.Views.OpportunityProduct.List", {
  "titleText": "Produkty"
});

localize("crm.Views.Owner.List", {
  "titleText": "Właściciele"
});

localize("crm.Views.Product.List", {
  "titleText": "Produkty"
});

localize("crm.Views.ProductProgram.List", {
  "titleText": "Programy produktu"
});

localize("crm.Views.Settings", {
  "clearLocalStorageTitleText": "Wyczyść pamięć",
  "clearAuthenticationTitleText": "Usuń zapisane uwierzytelnienia",
  "errorLogTitleText": "Pokaż rejestry błędów",
  "localStorageClearedText": "Wyczyszczono pamięć lokalną.",
  "credentialsClearedText": "Usunięto zapisane uwierzytelnienia.",
  "titleText": "Ustawienia"
});

localize("crm.Views.SpeedSearchList", {
  "titleText": "Szybkie wyszukiwanie",
  "indexesText": {
    "Account": "Klient",
    "Activity": "Czynność",
    "Contact": "Kontakt",
    "History": "Historia",
    "Lead": "Potencjalny klient",
    "Opportunity": "Szansa",
    "Ticket": "Zgłoszenie"
  }
});

localize("crm.Views.TextEdit", {
  "titleText": "Edytuj tekst"
});

localize("crm.Views.Ticket.Detail", {
  "accountText": "klient",
  "areaText": "obszar",
  "assignedDateText": "data przydziału",
  "assignedToText": "przydzielono do",
  "completedByText": "zakończył/a",
  "categoryText": "kategoria",
  "contactText": "kontakt",
  "contractText": "umowa",
  "descriptionText": "opis",
  "issueText": "problem",
  "needByText": "data zapotrzebowania",
  "notesText": "uwagi",
  "phoneText": "telefon",
  "actionsText": "Szybki dostęp",
  "relatedAttachmentText": "Załączniki",
  "relatedAttachmentTitleText": "Załączniki zgłoszenia",
  "relatedActivitiesText": "Czynności",
  "relatedItemsText": "Pozycje powiązane",
  "resolutionText": "rozwiązanie",
  "sourceText": "źródło",
  "statusText": "status",
  "subjectText": "temat",
  "ticketIdText": "nr zgłoszenia",
  "titleText": "Zgłoszenie",
  "urgencyText": "priorytet",
  "scheduleActivityText": "Zaplanuj czynność",
  "moreDetailsText": "Więcej szczegółów",
  "relatedTicketActivitiesText": "Czynności zgłoszenia",
  "loadingText": "wczytywanie..."
});

localize("crm.Views.Ticket.Edit", {
  "accountText": "klient",
  "areaText": "obszar",
  "assignedDateText": "data przydziału",
  "assignedToText": "przydzielono do",
  "categoryText": "kategoria",
  "contactText": "kontakt",
  "contractText": "umowa",
  "descriptionText": "opis",
  "descriptionTitleText": "Opis",
  "issueText": "problem",
  "needByText": "data zapotrzebowania",
  "notesText": "uwagi",
  "notesTitleText": "Uwagi",
  "phoneText": "telefon",
  "relatedActivitiesText": "Czynności",
  "relatedItemsText": "Pozycje powiązane",
  "resolutionText": "rozwiązanie",
  "resolutionTitleText": "Rozwiązanie",
  "sourceText": "źródło",
  "sourceTitleText": "Źródło",
  "statusText": "status",
  "subjectText": "temat",
  "ticketAreaTitleText": "Obszar zgłoszenia",
  "ticketCategoryTitleText": "Kategoria zgłoszenia",
  "ticketIdText": "nr zgłoszenia",
  "ticketIssueTitleText": "Problem w zgłoszeniu",
  "ticketStatusTitleText": "Status zgłoszenia",
  "ticketUrgencyTitleText": "Priorytet zgłoszenia",
  "titleText": "Zgłoszenie",
  "urgencyText": "priorytet"
});

localize("crm.Views.Ticket.List", {
  "titleText": "Zgłoszenia",
  "activitiesText": "Czynności",
  "scheduleText": "Harmonogram",
  "notAssignedText": "Nie przydzielono",
  "editActionText": "Edycja",
  "viewAccountActionText": "Klient",
  "viewContactActionText": "Kontakt",
  "addNoteActionText": "Dodaj notatkę",
  "addActivityActionText": "Dodaj czynność",
  "addAttachmentActionText": "Dodaj załącznik",
  "assignedToText": "Przydzielono do: ",
  "urgencyText": "Priorytet: ",
  "createdOnText": "Data utworzenia  ",
  "modifiedText": "Data zmiany ",
  "neededByText": "Zapotrzebowanie  "
});

localize("crm.Views.Ticket.UrgencyLookup", {
  "titleText": "Priorytet zgłoszenia"
});

localize("crm.Views.TicketActivity.Detail", {
  "titleText": "Czynność zgłoszenia",
  "accountText": "klient",
  "contactText": "kontakt",
  "typeText": "typ",
  "publicAccessText": "dostęp publiczny",
  "assignedDateText": "data rozpoczęcia",
  "completedDateText": "data zakończenia",
  "followUpText": "kontynuacja",
  "unitsText": "jednostki czasu",
  "elapsedUnitsText": "czas trwania [h]",
  "rateTypeDescriptionText": "typ opłaty",
  "rateText": "kurs",
  "totalLaborText": "suma robocizny",
  "totalPartsText": "suma części",
  "totalFeeText": "suma opłat",
  "activityDescriptionText": "uwagi",
  "ticketNumberText": "nr zgłoszenia",
  "userText": "użytkownik",
  "completeTicketText": "Zakończ czynność zgłoszenia",
  "moreDetailsText": "Więcej szczegółów",
  "relatedItemsText": "Pozycje powiązane",
  "relatedTicketActivityItemText": "Części do czynności zgłoszenia"
});

localize("crm.Views.TicketActivity.RateLookup", {
  "titleText": "Kursy"
});

localize("crm.Views.TicketActivityItem.Detail", {
  "titleText": "Część do czynności zgłoszenia",
  "productNameText": "produkt",
  "skuText": "Jednostka magazynowa",
  "serialNumberText": "nr seryjny",
  "itemAmountText": "cena",
  "itemDescriptionText": "opis"
});

localize("crm.Views.TicketActivityItem.List", {
  "titleText": "Części do czynności zgłoszenia"
});

localize("crm.Views.UpdateToolbar", {
  "updateText": "Dostępna aktualizacja. Kliknij, aby ją pobrać.  "
});

localize("crm.Views.User.CalendarAccessList", {
  "titleText": "Zasoby czynności"
});

localize("crm.Views.User.List", {
  "titleText": "Użytkownicy"
});

localize("crm.Views._CardLayoutListMixin", {
  "itemIconAltText": "Kontakt",
  "allRecordsText": "nie zastosowano wyszukiwania"
});

localize("crm.Views._GroupListMixin", {
  "noDefaultGroupText": "Nie ustawiono grupy domyślnej. Aby skonfigurować grupy, kliknij tutaj.",
  "currentGroupNotFoundText": "Nie znaleziono bieżącej grupy. ",
  "groupTemplateSummaryText": "Podsumowanie",
  "groupTemplateDetailText": "Szczegóły",
  "groupsModeText": "Jesteś w trybie grup. Aby go opuścić, użyj wyszukiwania lub naciśnij hashtag."
});

localize("crm.Views._RightDrawerListMixin", {
  "hashTagsSectionText": "Hashtagi",
  "groupsSectionText": "Grupy",
  "kpiSectionText": "KPI",
  "configureGroupsText": "Konfiguruj",
  "refreshGroupsText": "Odśwież",
  "layoutsText": "Układy"
});

localize("crm.Views._SpeedSearchRightDrawerListMixin", {
  "indexSectionText": "Indeksy"
});
});
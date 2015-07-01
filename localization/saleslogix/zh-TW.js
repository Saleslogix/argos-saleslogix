define('localization/saleslogix/zh-TW', ['localization/zh-TW', 'Mobile/SalesLogix/ApplicationModule'], function() {

localize("argos.Calendar", {
  "timeFormatText": "h:mm A",
  "titleText": "行事曆",
  "amText": "上午",
  "pmText": "下午",
  "monthsShortText": {
    "0": "1 月",
    "1": "2 月",
    "2": "3 月",
    "3": "4 月",
    "4": "5 月",
    "5": "6 月",
    "6": "7 月",
    "7": "8 月",
    "8": "9 月",
    "9": "10 月",
    "10": "11 月",
    "11": "12 月"
  }
});

localize("argos.Fields.DateField", {
  "dateFormatText": "MM/DD/YYYY",
  "emptyText": "",
  "invalidDateFormatErrorText": "欄位 '${0}' 的日期格式無效。"
});

localize("argos.Format", {
  "shortDateFormatText": "M/D/YYYY",
  "percentFormatText": "${0}${1}",
  "yesText": "是",
  "noText": "否",
  "trueText": "T",
  "falseText": "F",
  "hoursText": "小時",
  "hourText": "小時",
  "minutesText": "分鐘",
  "minuteText": "分鐘",
  "bytesText": "位元組"
});

localize("crm.GroupUtility", {
  "groupDateFormatText": "M/D/YYYY h:mm:ss A"
});

localize("crm.Recurrence", {
  "dayFormatText": "DD",
  "monthFormatText": "MM",
  "monthAndDayFormatText": "MM/DD",
  "weekdayFormatText": "dddd",
  "endDateFormatText": "M/D/YYYY",
  "neverText": "永遠不要",
  "daysText": "天",
  "dailyText": "每天",
  "weeksText": "週",
  "weeklyText": "每週",
  "weeklyOnText": "每週 ${3}",
  "monthsText": "月",
  "monthlyText": "每月",
  "monthlyOnDayText": "每月第 ${1} 天",
  "monthlyOnText": "每月 ${5} ${3}",
  "yearsText": "年",
  "yearlyText": "每年",
  "yearlyOnText": "每年 ${2}",
  "yearlyOnWeekdayText": "每年 ${4} 的 ${5} ${3}",
  "everyText": "每 ${0} ${1}",
  "afterCompletionText": "完成之後",
  "untilEndDateText": "${0} 到 ${1}",
  "weekDaysText": {
    "0": "週日",
    "1": "週一",
    "2": "週二",
    "3": "週三",
    "4": "週四",
    "5": "週五",
    "6": "週六"
  },
  "ordText": {
    "0": "天",
    "1": "名字",
    "2": "第二個",
    "3": "第三個",
    "4": "第四個",
    "5": "姓氏"
  }
});

localize("crm.Views.Activity.Complete", {
  "completedFormatText": "M/D/YYYY h:mm A",
  "startingFormatText": "M/D/YYYY h:mm A",
  "startingTimelessFormatText": "M/D/YYYY",
  "activityInfoText": "活動資訊",
  "accountText": "帳戶",
  "contactText": "聯絡人",
  "opportunityText": "商機",
  "ticketNumberText": "記錄單",
  "companyText": "公司",
  "leadText": "銷售線索",
  "asScheduledText": "如期",
  "categoryText": "類別",
  "categoryTitleText": "活動類別",
  "completedText": "完成日期",
  "completionText": "完成",
  "durationText": "持續時間",
  "durationInvalidText": "欄位 '${2}' 必須要有一個值。",
  "carryOverNotesText": "沿用備註",
  "followUpText": "後續",
  "followUpTitleText": "後續類型",
  "leaderText": "負責人",
  "longNotesText": "備註",
  "longNotesTitleText": "備註",
  "otherInfoText": "其他資訊",
  "priorityText": "優先順序",
  "priorityTitleText": "優先順序",
  "regardingText": "關於",
  "regardingTitleText": "活動關於",
  "resultText": "結果",
  "resultTitleText": "結果",
  "startingText": "開始日期",
  "timelessText": "無指定時間",
  "durationValueText": {
    "0": "無",
    "15": "15 分鐘",
    "30": "30 分鐘",
    "60": "1 小時",
    "90": "1.5 小時",
    "120": "2 小時"
  },
  "followupValueText": {
    "none": "無",
    "atPhoneCall": "電話",
    "atAppointment": "會議",
    "atToDo": "待辦事項",
    "atPersonal": "個人活動"
  }
});

localize("crm.Views.Activity.Detail", {
  "startDateFormatText": "M/D/YYYY h:mm:ss A",
  "timelessDateFormatText": "M/D/YYYY",
  "alarmDateFormatText": "M/D/YYYY h:mm:ss A",
  "activityTypeText": {
    "atToDo": "待辦事項",
    "atPhoneCall": "電話",
    "atAppointment": "會議",
    "atLiterature": "文宣要求",
    "atPersonal": "個人活動"
  },
  "actionsText": "快速動作",
  "completeActivityText": "完成活動",
  "completeOccurrenceText": "完成次數",
  "completeSeriesText": "完成系列",
  "locationText": "地點",
  "alarmText": "鬧鐘",
  "alarmTimeText": "鬧鐘",
  "categoryText": "類別",
  "durationText": "持續時間",
  "leaderText": "負責人",
  "longNotesText": "備註",
  "priorityText": "優先順序",
  "regardingText": "關於",
  "rolloverText": "自動展期",
  "startTimeText": "開始時間",
  "allDayText": "全天",
  "timelessText": "無指定時間",
  "titleText": "活動",
  "typeText": "類型",
  "companyText": "公司",
  "leadText": "銷售線索",
  "accountText": "帳戶",
  "contactText": "聯絡人",
  "opportunityText": "商機",
  "ticketNumberText": "記錄單",
  "whenText": "時間",
  "whoText": "對象",
  "recurrenceText": "週期性",
  "confirmEditRecurrenceText": "編輯所有出現次數？按一下 [取消] 以編輯單一次數。",
  "relatedAttachmentText": "附件",
  "relatedAttachmentTitleText": "活動附件",
  "relatedItemsText": "相關項目",
  "phoneText": "電話",
  "moreDetailsText": "更多詳細資料"
});

localize("crm.Views.Activity.Edit", {
  "startingFormatText": "M/D/YYYY h:mm A",
  "startingTimelessFormatText": "M/D/YYYY",
  "activityCategoryTitleText": "活動類別",
  "activityDescriptionTitleText": "活動描述",
  "locationText": "地點",
  "activityTypeTitleText": "活動類型",
  "alarmText": "鬧鐘",
  "reminderText": "提醒",
  "categoryText": "類別",
  "durationText": "持續時間",
  "durationTitleText": "持續時間",
  "durationInvalidText": "欄位 '${2}' 必須要有一個值。",
  "reminderInvalidText": "“提醒”欄位必須要有一個值。",
  "reminderTitleText": "提醒",
  "leaderText": "負責人",
  "longNotesText": "備註",
  "longNotesTitleText": "備註",
  "priorityText": "優先順序",
  "priorityTitleText": "優先順序",
  "regardingText": "關於",
  "rolloverText": "自動展期",
  "startingText": "開始時間",
  "repeatsText": "重複",
  "recurringText": "週期性",
  "recurringTitleText": "週期性",
  "timelessText": "無指定時間",
  "titleText": "活動",
  "typeText": "類型",
  "accountText": "帳戶",
  "contactText": "聯絡人",
  "opportunityText": "商機",
  "ticketNumberText": "記錄單",
  "companyText": "公司",
  "leadText": "銷售線索",
  "isLeadText": "銷售線索",
  "yesText": "是",
  "noText": "否",
  "phoneText": "電話",
  "updateUserActErrorText": "更新使用者活動時發生錯誤。",
  "reminderValueText": {
    "0": "無",
    "5": "5 分鐘",
    "15": "15 分鐘",
    "30": "30 分鐘",
    "60": "1 小時",
    "1440": "1 天"
  },
  "durationValueText": {
    "0": "無",
    "15": "15 分鐘",
    "30": "30 分鐘",
    "60": "1 小時",
    "90": "1.5 小時",
    "120": "2 小時"
  }
});

localize("crm.Views.Attachment.List", {
  "attachmentDateFormatText": "ddd M/D/YYYY hh:mm:ss",
  "titleText": "附件",
  "uploadedOnText": "已上傳 ",
  "hashTagQueriesText": {
    "url": "URL",
    "binary": "二進位"
  }
});

localize("crm.Views.Attachment.ViewAttachment", {
  "attachmentDateFormatText": "ddd M/D/YYYY h:mm a",
  "detailsText": "附件詳細資料",
  "descriptionText": "描述",
  "fileNameText": "檔案名稱",
  "attachDateText": "附件日期",
  "fileSizeText": "檔案大小",
  "userText": "使用者",
  "attachmentNotSupportedText": "無法檢視這種附件類型。",
  "downloadingText": "下載附件中...",
  "notSupportedText": "您的裝置不支援檢視附件。"
});

localize("crm.Views.Calendar.DayView", {
  "eventDateFormatText": "M/D/YYYY",
  "dateHeaderFormatText": "dddd, M/D/YYYY",
  "startTimeFormatText": "h:mm A",
  "titleText": "行事曆",
  "todayText": "今天",
  "dayText": "天",
  "weekText": "週",
  "monthText": "月",
  "allDayText": "全天",
  "eventHeaderText": "事件",
  "activityHeaderText": "活動",
  "eventMoreText": "檢視更多事件",
  "toggleCollapseText": "切換摺疊"
});

localize("crm.Views.Calendar.MonthView", {
  "monthTitleFormatText": "MMMM YYYY",
  "dayTitleFormatText": "ddd MMM D, YYYY",
  "eventDateFormatText": "M/D/YYYY",
  "startTimeFormatText": "h:mm A",
  "titleText": "行事曆",
  "todayText": "今天",
  "dayText": "天",
  "weekText": "週",
  "monthText": "月",
  "allDayText": "全天",
  "eventText": "事件",
  "eventHeaderText": "事件",
  "countMoreText": "檢視更多",
  "activityHeaderText": "活動",
  "toggleCollapseText": "切換摺疊",
  "weekDaysShortText": {
    "0": "日",
    "1": "一",
    "2": "二",
    "3": "三",
    "4": "四",
    "5": "五",
    "6": "六"
  }
});

localize("crm.Views.Calendar.WeekView", {
  "weekTitleFormatText": "MMM D, YYYY",
  "dayHeaderLeftFormatText": "dddd",
  "dayHeaderRightFormatText": "MMM D, YYYY",
  "eventDateFormatText": "M/D/YYYY",
  "startTimeFormatText": "h:mm A",
  "titleText": "行事曆",
  "todayText": "今天",
  "dayText": "天",
  "weekText": "週",
  "monthText": "月",
  "allDayText": "全天",
  "eventHeaderText": "事件",
  "eventMoreText": "再檢視 ${0} 個事件",
  "toggleCollapseText": "切換摺疊"
});

localize("crm.Views.ErrorLog.Detail", {
  "errorDateFormatText": "MM/DD/YYYY hh:mm A",
  "titleText": "錯誤日誌",
  "detailsText": "詳細資料",
  "errorDateText": "日期",
  "statusTextText": "錯誤",
  "urlText": "URL",
  "moreDetailsText": "更多詳細資料",
  "errorText": "錯誤",
  "emailSubjectText": "Saleslogix 行動用戶端發生錯誤",
  "copiedSuccessText": "已複製到剪貼簿"
});

localize("crm.Views.ErrorLog.List", {
  "errorDateFormatText": "MM/DD/YYYY hh:mm A",
  "titleText": "錯誤日誌"
});

localize("crm.Views.Event.Detail", {
  "startDateFormatText": "M/D/YYYY h:mm:ss A",
  "endDateFormatText": "M/D/YYYY h:mm:ss A",
  "eventTypeText": {
    "atToDo": "待辦事項",
    "atPhoneCall": "電話",
    "atAppointment": "會議",
    "atLiterature": "文宣要求",
    "atPersonal": "個人活動"
  },
  "actionsText": "快速動作",
  "startTimeText": "開始日期",
  "endTimeText": "結束日期",
  "titleText": "事件",
  "descriptionText": "描述",
  "typeText": "類型",
  "whenText": "時間"
});

localize("crm.Views.Event.Edit", {
  "startingFormatText": "M/D/YYYY h:mm A",
  "titleText": "事件",
  "typeText": "類型",
  "descriptionText": "描述",
  "startDateText": "開始日期",
  "endDateText": "結束日期",
  "eventTypesText": {
    "Vacation": "休假",
    "Business Trip": "出差",
    "Conference": "會議",
    "Holiday": "假日"
  }
});

localize("crm.Views.Event.List", {
  "eventDateFormatText": "M/D/YYYY",
  "titleText": "事件",
  "eventText": "事件"
});

localize("crm.Views.History.Detail", {
  "dateFormatText": "M/D/YYYY h:mm:ss A",
  "categoryText": "類別",
  "completedText": "已完成",
  "durationText": "持續時間",
  "leaderText": "負責人",
  "longNotesText": "備註",
  "notesText": "備註",
  "priorityText": "優先順序",
  "regardingText": "關於",
  "completedByText": "完成者",
  "scheduledText": "已安排",
  "timelessText": "無指定時間",
  "companyText": "公司",
  "leadText": "銷售線索",
  "titleText": "歷程記錄",
  "accountText": "帳戶",
  "contactText": "聯絡人",
  "opportunityText": "商機",
  "ticketNumberText": "記錄單",
  "moreDetailsText": "更多詳細資料",
  "relatedItemsText": "相關項目",
  "relatedAttachmentText": "附件",
  "relatedAttachmentTitleText": "歷史附件",
  "modifiedText": "已修改",
  "typeText": "類型",
  "activityTypeText": {
    "atToDo": "待辦事項",
    "atPhoneCall": "電話",
    "atAppointment": "會議",
    "atLiterature": "文宣要求",
    "atPersonal": "個人活動",
    "atQuestion": "問題",
    "atEMail": "電子郵件"
  }
});

localize("crm.Views.History.Edit", {
  "startingFormatText": "M/D/YYYY h:mm A",
  "accountText": "帳戶",
  "noteDescriptionTitleText": "備註描述",
  "contactText": "聯絡人",
  "longNotesText": "備註",
  "longNotesTitleText": "備註",
  "opportunityText": "商機",
  "ticketNumberText": "記錄單",
  "regardingText": "關於",
  "isLeadText": "銷售線索",
  "startingText": "時間",
  "titleText": "備註",
  "companyText": "公司",
  "leadText": "銷售線索",
  "relatedItemsText": "相關項目",
  "yesText": "是",
  "noText": "否",
  "validationText": "欄位 '${2}' 必須要有一個值",
  "validationCanEditText": "您無權編輯"
});

localize("crm.Views.History.List", {
  "hourMinuteFormatText": "h:mm A",
  "dateFormatText": "M/D/YY",
  "activityTypeText": {
    "atToDo": "待辦事項",
    "atPhoneCall": "電話",
    "atAppointment": "會議",
    "atLiterature": "文宣要求",
    "atPersonal": "個人活動",
    "atQuestion": "問題",
    "atEMail": "電子郵件"
  },
  "hashTagQueriesText": {
    "my-history": "我的歷程記錄",
    "note": "備註",
    "phonecall": "電話",
    "meeting": "會議",
    "personal": "個人",
    "email": "電子郵件"
  },
  "titleText": "備註/歷程記錄",
  "viewAccountActionText": "帳戶",
  "viewOpportunityActionText": "商機",
  "viewContactActionText": "聯絡人",
  "addAttachmentActionText": "新增附件",
  "regardingText": "關於: "
});

localize("crm.Views.Opportunity.Detail", {
  "exchangeRateDateFormatText": "M/D/YYYY h:mm A",
  "accountText": "帳戶",
  "acctMgrText": "帳戶管理者",
  "estCloseText": "預計關閉",
  "detailsText": "詳細資料",
  "fbarHomeTitleText": "首頁",
  "fbarScheduleTitleText": "排程",
  "importSourceText": "銷售線索來源",
  "opportunityText": "商機",
  "ownerText": "擁有者",
  "actionsText": "快速動作",
  "potentialText": "銷售潛力",
  "potentialBaseText": "銷售潛力 (基本率)",
  "potentialOpportunityText": "銷售潛力 (商機率)",
  "potentialMyRateText": "銷售潛力 (我的評級)",
  "probabilityText": "關閉機率",
  "relatedActivitiesText": "活動",
  "relatedContactsText": "商機聯絡人",
  "relatedHistoriesText": "備註/歷程記錄",
  "relatedItemsText": "相關項目",
  "relatedNotesText": "備註",
  "relatedProductsText": "產品",
  "relatedAttachmentText": "附件",
  "relatedAttachmentTitleText": "商機附件",
  "resellerText": "經銷商",
  "statusText": "狀態",
  "titleText": "商機",
  "typeText": "類型",
  "scheduleActivityText": "排程活動",
  "addNoteText": "新增備註",
  "moreDetailsText": "更多詳細資料",
  "multiCurrencyText": "多重貨幣",
  "multiCurrencyRateText": "匯率",
  "multiCurrencyCodeText": "代碼",
  "multiCurrencyDateText": "匯率日期",
  "multiCurrencyLockedText": "匯率已鎖定"
});

localize("crm.Views.Opportunity.Edit", {
  "exchangeRateDateFormatText": "M/D/YYYY h:mm A",
  "accountText": "帳戶",
  "acctMgrText": "帳戶管理者",
  "estCloseText": "預計關閉",
  "importSourceText": "銷售線索來源",
  "detailsText": "詳細資料",
  "opportunityStatusTitleText": "商機狀態",
  "opportunityText": "商機",
  "opportunityTypeTitleText": "商機類型",
  "ownerText": "擁有者",
  "potentialText": "銷售潛力",
  "probabilityText": "關閉機率",
  "probabilityTitleText": "商機概率",
  "resellerText": "經銷商",
  "statusText": "狀態",
  "titleText": "商機",
  "typeText": "類型",
  "multiCurrencyText": "多重貨幣",
  "multiCurrencyRateText": "匯率",
  "multiCurrencyCodeText": "代碼",
  "multiCurrencyDateText": "匯率日期",
  "multiCurrencyLockedText": "匯率已鎖定",
  "subTypePickListResellerText": "經銷商"
});

localize("crm.Views.TicketActivity.Edit", {
  "startingFormatText": "M/D/YYYY h:mm A",
  "titleText": "編輯記錄單活動",
  "activityTypeText": "類型",
  "activityTypeTitleText": "類型",
  "publicAccessText": "公開存取",
  "publicAccessTitleText": "公開存取",
  "userText": "使用者",
  "startDateText": "開始日期",
  "endDateText": "結束日期",
  "commentsText": "註解"
});

localize("crm.Views.TicketActivity.List", {
  "startDateFormatText": "MM/DD/YYYY h:mm A",
  "titleText": "記錄單活動"
});

localize("argos.ErrorManager", {
  "abortedText": "已中止",
  "scopeSaveText": "未將範圍儲存至錯誤報告中"
});

localize("argos.Fields.DurationField", {
  "emptyText": "",
  "invalidDurationErrorText": "欄位 '${0}' 不是有效的持續時間。",
  "autoCompleteText": {
    "1": "分鐘",
    "60": "小時",
    "1440": "天",
    "10080": "週",
    "525960": "年"
  }
});

localize("argos.Fields.EditorField", {
  "lookupLabelText": "編輯",
  "lookupText": "...",
  "emptyText": "空白",
  "completeText": "確定"
});

localize("argos.Fields.LookupField", {
  "dependentErrorText": "必須為 '${0}' 選取值。",
  "emptyText": "",
  "completeText": "選取",
  "lookupLabelText": "查閱",
  "lookupText": "..."
});

localize("argos.Fields.SignatureField", {
  "signatureLabelText": "簽名",
  "signatureText": "..."
});

localize("argos.GroupedList", {
  "toggleCollapseText": "切換摺疊"
});

localize("argos.Groups.DateTimeSection", {
  "displayNameText": "日期時間區段",
  "todayText": "今天",
  "tomorrowText": "明天",
  "laterThisWeekText": "本週末",
  "earlierThisWeekText": "本週初",
  "thisLaterMonthText": "本月末",
  "thisEarlierMonthText": "本月初",
  "thisYearEarlierText": "今年年初",
  "thisYearLaterText": "今年年末",
  "yesterdayText": "昨天",
  "lastWeekText": "上週",
  "lastMonthText": "上個月",
  "pastYearText": "過去一 (幾) 年",
  "nextYearText": "明年",
  "nextMonthText": "下個月",
  "nextWeekText": "下週",
  "futureText": "未來",
  "twoWeeksAgoText": "兩週前",
  "threeWeeksAgoText": "三週前",
  "twoMonthsAgoText": "兩個月前",
  "threeMonthsAgoText": "三個月前",
  "unknownText": "不明"
});

localize("argos.Groups.GroupByValueSection", {
  "displayNameText": "依值分組區段"
});

localize("argos.MainToolbar", {
  "titleText": "行動電話"
});

localize("argos.RelatedViewWidget", {
  "nodataText": "找不到記錄...",
  "selectMoreDataText": "再查看 ${0} 個 ${1}... ",
  "navToListText": "查看清單",
  "loadingText": "載入中... ",
  "refreshViewText": "重新整理",
  "itemOfCountText": " ${1} 之 ${0} ",
  "totalCountText": " (${0})",
  "titleText": "相關檢視"
});

localize("argos.SearchWidget", {
  "searchText": "搜尋"
});

localize("argos.SelectionModel", {
  "requireSelectionText": "必須選取項目，您不能取消選取最後一個項目。"
});

localize("argos.View", {
  "titleText": "一般檢視"
});

localize("argos.Views.ConfigureQuickActions", {
  "titleText": "設定快速動作"
});

localize("argos.Views.FileSelect", {
  "titleText": "檔案選取",
  "addFileText": "按一下或點選這裡以新增檔案。",
  "uploadText": "上傳",
  "cancelText": "取消",
  "selectFileText": "選取檔案",
  "loadingText": "上傳中...",
  "descriptionText": "描述",
  "bytesText": "位元組",
  "notSupportedText": "您的裝置不支援新增附件。"
});

localize("argos.Views.Signature", {
  "titleText": "簽名",
  "clearCanvasText": "清除",
  "undoText": "復原"
});

localize("argos._ConfigureBase", {
  "titleText": "組態"
});

localize("argos._DetailBase", {
  "editText": "編輯",
  "titleText": "詳細資料",
  "detailsText": "詳細資料",
  "loadingText": "載入中...",
  "notAvailableText": "要求的資料無法使用。",
  "toggleCollapseText": "切換摺疊"
});

localize("argos._EditBase", {
  "saveText": "儲存",
  "titleText": "編輯",
  "validationSummaryText": "驗證摘要",
  "concurrencySummaryText": "並行錯誤",
  "detailsText": "詳細資料",
  "loadingText": "載入中...",
  "errorText": {
    "general": "要求資料時發生伺服器錯誤。",
    "status": {
      "410": "儲存時發生錯誤。此記錄已不再存在。"
    }
  },
  "concurrencyErrorText": "其他使用者已更新此欄位。"
});

localize("argos._ErrorHandleMixin", {
  "errorText": {
    "general": "伺服器發生錯誤。"
  }
});

localize("argos._ListBase", {
  "moreText": "擷取更多記錄",
  "emptySelectionText": "無",
  "titleText": "清單",
  "configureText": "組態",
  "errorRenderText": "轉譯列範本時發生錯誤。",
  "remainingText": "剩餘 ${0} 筆記錄",
  "cancelText": "取消",
  "insertText": "新增",
  "noDataText": "無記錄",
  "loadingText": "載入中..."
});

localize("argos._PullToRefreshMixin", {
  "pullRefreshText": "下拉以重新整理...",
  "pullReleaseText": "放開以重新整理..."
});

localize("argos._RelatedViewWidgetBase", {
  "loadingText": "載入中... "
});

localize("crm.Action", {
  "calledText": "已撥打 ${0}",
  "emailedText": "已傳送電子郵件給 ${0}"
});

localize("crm.Application", {
  "versionInfoText": "行動電話 v${0}.${1}.${2}",
  "loadingText": "載入應用程式狀態",
  "authText": "驗證"
});

localize("crm.ApplicationModule", {
  "searchText": "查閱"
});

localize("crm.DefaultMetrics", {
  "accountsText": {
    "totalRevenue": "總收入",
    "averageTime": "消費者平均時間",
    "total": "帳戶總數"
  },
  "opportunitiesText": {
    "total": "商機總數",
    "potential": "銷售潛力總計",
    "montlyPotential": "平均每月銷售潛力"
  },
  "ticketsText": {
    "total": "記錄單總數",
    "averageOpen": "開放平均存留時間"
  },
  "contactsText": {
    "total": "聯絡人總數"
  },
  "leadsText": {
    "total": "銷售線索總數"
  },
  "historyText": {
    "total": "歷程記錄總數",
    "duration": "持續時間總數"
  }
});

localize("crm.Fields.AddressField", {
  "lookupLabelText": "編輯",
  "emptyText": ""
});

localize("crm.Fields.NameField", {
  "emptyText": ""
});

localize("crm.Fields.RecurrencesField", {
  "titleText": "週期性",
  "emptyText": ""
});

localize("crm.FileManager", {
  "unableToUploadText": "此瀏覽器不支援 HTML5 File API。",
  "unknownSizeText": "不明",
  "unknownErrorText": "警告:發生錯誤而且檔案無法上傳。",
  "largeFileWarningText": "警告:此要求超過管理員設定的大小限制，因此無法上傳。",
  "percentCompleteText": "上傳中，請稍候..."
});

localize("crm.Format", {
  "bigNumberAbbrText": {
    "billion": "B",
    "million": "M",
    "thousand": "K"
  },
  "userActivityFormatText": {
    "asUnconfirmed": "未確認",
    "asAccepted": "已接受",
    "asDeclned": "已拒絕"
  }
});

localize("crm.SpeedSearchWidget", {
  "searchText": "快速搜尋"
});

localize("crm.Validator", {
  "exists": {
    "message": "欄位 '${2}' 必須要有一個值。"
  },
  "name": {
    "message": "欄位 '${2}' 必須指定名字和姓氏。"
  },
  "notEmpty": {
    "message": "欄位 '${2}' 不可以空白。"
  },
  "hasText": {
    "test": "",
    "message": "欄位 '${2}' 必須包含一些文字。"
  },
  "isInteger": {
    "message": "值 '${0}' 不是有效數字。"
  },
  "isDecimal": {
    "message": "值 '${0}' 不是有效數字。"
  },
  "isCurrency": {
    "message": "值 '${0}' 不是有效的貨幣數字。"
  },
  "isInt32": {
    "message": "欄位 '${2}' 值超過允許的數字範圍。"
  },
  "exceedsMaxTextLength": {
    "message": "欄位 '${2}' 值超出允許的長度限制。"
  },
  "isDateInRange": {
    "message": "欄位 '${2}' 值超出允許的日期範圍。"
  }
});

localize("crm.Views.Account.Detail", {
  "accountText": "帳戶",
  "acctMgrText": "帳戶管理者",
  "addressText": "地址",
  "businessDescriptionText": "業務描述",
  "createDateText": "建立日期",
  "createUserText": "建立使用者",
  "faxText": "傳真",
  "importSourceText": "銷售線索來源",
  "industryText": "行業",
  "notesText": "備註",
  "ownerText": "擁有者",
  "phoneText": "電話",
  "activityTypeText": {
    "atPhoneCall": "電話"
  },
  "actionsText": "快速動作",
  "relatedActivitiesText": "活動",
  "relatedContactsText": "聯絡人",
  "relatedHistoriesText": "備註/歷程記錄",
  "relatedItemsText": "相關項目",
  "relatedNotesText": "備註",
  "relatedOpportunitiesText": "商機",
  "relatedTicketsText": "記錄單",
  "relatedAddressesText": "地址",
  "relatedAttachmentText": "附件",
  "relatedAttachmentTitleText": "帳戶附件",
  "statusText": "狀態",
  "subTypeText": "子類型",
  "titleText": "帳戶",
  "typeText": "類型",
  "webText": "網頁",
  "scheduleActivityText": "排程活動",
  "addNoteText": "新增備註",
  "moreDetailsText": "更多詳細資料",
  "calledText": "已撥打 ${0}"
});

localize("crm.Views.Account.Edit", {
  "accountStatusTitleText": "帳戶狀態",
  "accountSubTypeTitleText": "帳戶子類型",
  "accountText": "帳戶",
  "accountTypeTitleText": "帳戶類型",
  "acctMgrText": "帳戶管理者",
  "businessDescriptionText": "業務描述",
  "businessDescriptionTitleText": "業務描述",
  "descriptionText": "描述",
  "faxText": "傳真",
  "fullAddressText": "地址",
  "importSourceText": "銷售線索來源",
  "industryText": "行業",
  "industryTitleText": "行業",
  "ownerText": "擁有者",
  "phoneText": "電話",
  "statusText": "狀態",
  "subTypeText": "子類型",
  "titleText": "帳戶",
  "typeText": "類型",
  "webText": "網頁"
});

localize("crm.Views.Account.List", {
  "titleText": "帳戶",
  "activitiesText": "活動",
  "notesText": "備註",
  "scheduleText": "排程",
  "editActionText": "編輯",
  "callMainActionText": "撥打主要電話",
  "viewContactsActionText": "聯絡人",
  "addNoteActionText": "新增備註",
  "addActivityActionText": "新增活動",
  "addAttachmentActionText": "新增附件",
  "phoneAbbreviationText": "電話: ",
  "faxAbbreviationText": "傳真: "
});

localize("crm.Views.Activity.List", {
  "allDayText": "無指定時間",
  "completeActivityText": "完成",
  "callText": "撥打",
  "calledText": "已撥打",
  "addAttachmentActionText": "新增附件",
  "overdueText": "逾期",
  "alarmText": "鬧鐘",
  "touchedText": "已更動",
  "importantText": "重要",
  "recurringText": "週期性",
  "activityTypeText": {
    "atToDo": "待辦事項",
    "atPhoneCall": "電話",
    "atAppointment": "會議",
    "atLiterature": "文宣要求",
    "atPersonal": "個人",
    "atQuestion": "問題",
    "atNote": "備註",
    "atEMail": "電子郵件"
  },
  "titleText": "活動",
  "hashTagQueriesText": {
    "alarm": "鬧鐘",
    "recurring": "週期性",
    "timeless": "無指定時間",
    "today": "今天",
    "this-week": "本週",
    "yesterday": "昨天"
  }
});

localize("crm.Views.Activity.MyList", {
  "titleText": "我的活動",
  "completeActivityText": "完成",
  "acceptActivityText": "接受",
  "declineActivityText": "拒絕",
  "callText": "撥打",
  "calledText": "已撥打",
  "addAttachmentActionText": "新增附件",
  "viewContactActionText": "聯絡人",
  "viewAccountActionText": "帳戶",
  "viewOpportunityActionText": "商機",
  "hashTagQueriesText": {
    "alarm": "鬧鐘",
    "status-unconfirmed": "狀態-未確認",
    "status-accepted": "狀態-已接受",
    "status-declined": "狀態-已拒絕",
    "recurring": "週期性",
    "timeless": "無指定時間",
    "today": "今天",
    "this-week": "本週",
    "yesterday": "昨天"
  }
});

localize("crm.Views.Activity.Recurring", {
  "startingText": "開始日期",
  "endingText": "結束日期",
  "repeatsText": "重複",
  "everyText": "每",
  "afterCompletionText": "完成之後",
  "singleWeekdayText": "平日",
  "weekdaysText": "平日",
  "dayText": "天",
  "monthText": "月",
  "onText": "於",
  "occurrencesText": "出現次數",
  "summaryText": "摘要",
  "weekDaysText": {
    "0": "週日",
    "1": "週一",
    "2": "週二",
    "3": "週三",
    "4": "週四",
    "5": "週五",
    "6": "週六"
  },
  "monthsText": {
    "0": "一月",
    "1": "二月",
    "2": "三月",
    "3": "四月",
    "4": "五月",
    "5": "六 月",
    "6": "七月",
    "7": "八月",
    "8": "九月",
    "9": "十月",
    "10": "十一月",
    "11": "十二月"
  },
  "frequencyOptionsText": {
    "0": "天",
    "1": "週",
    "2": "月",
    "3": "年"
  },
  "recurringFrequencyText": "週期頻率",
  "yesText": "是",
  "noText": "否",
  "titleText": "週期性"
});

localize("crm.Views.Activity.TypesList", {
  "titleText": "排程...",
  "activityTypeText": {
    "atToDo": "待辦事項",
    "atPhoneCall": "電話",
    "atAppointment": "會議",
    "atLiterature": "文宣要求",
    "atPersonal": "個人活動",
    "event": "事件"
  }
});

localize("crm.Views.AddAccountContact", {
  "accountNameText": "帳戶",
  "accountStatusTitleText": "帳戶狀態",
  "accountSubTypeTitleText": "帳戶子類型",
  "accountText": "帳戶",
  "accountTypeTitleText": "帳戶類型",
  "acctMgrText": "帳戶管理者",
  "addressText": "地址",
  "contactTitleText": "職稱",
  "descriptionText": "描述",
  "detailsAccountText": "帳戶資訊",
  "detailsContactText": "聯絡人資訊",
  "detailsText": "聯絡人/帳戶資訊",
  "emailText": "電子郵件",
  "faxText": "傳真",
  "homePhoneText": "住家電話",
  "industryText": "行業",
  "ownerText": "擁有者",
  "lastNameText": "最後一個",
  "mobileText": "行動電話",
  "nameText": "名稱",
  "statusText": "狀態",
  "subTypeText": "子類型",
  "titleText": "新增帳戶/聯絡人",
  "typeText": "類型",
  "webText": "網頁",
  "phoneText": "電話",
  "workText": "公司電話",
  "industryTitleText": "行業"
});

localize("crm.Views.Address.Edit", {
  "address1Text": "地址 1",
  "address2Text": "地址 2",
  "address3Text": "地址 3",
  "cityText": "縣/市",
  "cityTitleText": "縣/市",
  "countryText": "國家/地區",
  "countryTitleText": "國家/地區",
  "descriptionText": "描述",
  "descriptionTitleText": "描述",
  "isMailingText": "出貨",
  "isPrimaryText": "主要",
  "postalCodeText": "郵遞區號",
  "salutationText": "注意",
  "stateText": "狀態",
  "stateTitleText": "狀態",
  "titleText": "地址"
});

localize("crm.Views.Address.List", {
  "titleText": "地址"
});

localize("crm.Views.AreaCategoryIssueLookup", {
  "titleText": "帳戶"
});

localize("crm.Views.Attachment.AddAttachment", {
  "titleText": "新增附件"
});

localize("crm.Views.Attachment.MyAttachmentList", {
  "titleText": "我的附件"
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
  "loadingText": "載入中..."
});

localize("crm.Views.Competitor.List", {
  "titleText": "競爭者"
});

localize("crm.Views.Configure", {
  "titleText": "組態"
});

localize("crm.Views.Contact.Detail", {
  "activityTypeText": {
    "atPhoneCall": "電話",
    "atEMail": "電子郵件"
  },
  "accountText": "帳戶",
  "acctMgrText": "帳戶管理者",
  "addressText": "地址",
  "contactTitleText": "職稱",
  "createDateText": "建立日期",
  "createUserText": "建立使用者",
  "emailText": "電子郵件",
  "faxText": "傳真",
  "homeText": "住家電話",
  "nameText": "聯絡人",
  "ownerText": "擁有者",
  "actionsText": "快速動作",
  "relatedAccountsText": "帳戶",
  "relatedActivitiesText": "活動",
  "relatedHistoriesText": "備註/歷程記錄",
  "relatedItemsText": "相關項目",
  "relatedNotesText": "備註",
  "relatedOpportunitiesText": "商機",
  "relatedTicketsText": "記錄單",
  "relatedAddressesText": "地址",
  "relatedAttachmentText": "附件",
  "relatedAttachmentTitleText": "聯絡人附件",
  "titleText": "聯絡人",
  "webText": "網頁",
  "workText": "公司電話",
  "cuisinePreferenceText": "餐飲",
  "callMobileNumberText": "撥打行動電話",
  "callWorkNumberText": "撥打公司電話",
  "calledText": "已撥打",
  "scheduleActivityText": "排程活動",
  "addNoteText": "新增備註",
  "sendEmailText": "傳送電子郵件",
  "viewAddressText": "檢視地址",
  "moreDetailsText": "更多詳細資料"
});

localize("crm.Views.Contact.Edit", {
  "titleText": "聯絡人",
  "nameText": "名稱",
  "workText": "公司電話",
  "mobileText": "行動電話",
  "emailText": "電子郵件",
  "webText": "網頁",
  "acctMgrText": "帳戶管理者",
  "accountNameText": "帳戶",
  "homePhoneText": "住家電話",
  "faxText": "傳真",
  "addressText": "地址",
  "contactTitleText": "職稱",
  "titleTitleText": "職稱",
  "addressTitleText": "地址",
  "ownerText": "擁有者",
  "cuisinePreferenceText": "餐飲",
  "cuisinePreferenceTitleText": "餐飲"
});

localize("crm.Views.Contact.List", {
  "titleText": "聯絡人",
  "activitiesText": "活動",
  "notesText": "備註",
  "scheduleText": "排程",
  "editActionText": "編輯",
  "callMainActionText": "撥打主要電話",
  "callWorkActionText": "撥打公司電話",
  "callMobileActionText": "撥打行動電話",
  "sendEmailActionText": "電子郵件",
  "viewAccountActionText": "帳戶",
  "addNoteActionText": "新增備註",
  "addActivityActionText": "新增活動",
  "addAttachmentActionText": "新增附件",
  "phoneAbbreviationText": "公司電話: ",
  "mobileAbbreviationText": "行動電話: "
});

localize("crm.Views.Contract.List", {
  "titleText": "合約"
});

localize("crm.Views.ExchangeRateLookup", {
  "titleText": "匯率"
});

localize("crm.Views.FooterToolbar", {
  "copyrightText": "&copy; 2014 SalesLogix, NA, LLC. 著作權所有，並保留一切權利。"
});

localize("crm.Views.Groups.Selector", {
  "titleText": "群組查閱"
});

localize("crm.Views.Help", {
  "titleText": "說明",
  "errorText": "錯誤",
  "errorMessageText": "無法載入說明文件。"
});

localize("crm.Views.History.RelatedView", {
  "regardingText": "關於",
  "byText": "撰寫 ",
  "titleText": "備註"
});

localize("crm.Views.Home", {
  "configureText": "組態",
  "addAccountContactText": "新增帳戶/聯絡人",
  "titleText": "首頁",
  "actionsText": "快速動作",
  "viewsText": "移至"
});

localize("crm.Views.Lead.Detail", {
  "activityTypeText": {
    "atPhoneCall": "電話",
    "atEMail": "電子郵件"
  },
  "accountText": "公司",
  "addressText": "地址",
  "businessDescriptionText": "業務描述",
  "createDateText": "建立日期",
  "createUserText": "建立使用者",
  "eMailText": "電子郵件",
  "leadSourceText": "銷售線索來源",
  "industryText": "行業",
  "interestsText": "興趣",
  "leadTitleText": "職稱",
  "nameText": "名稱",
  "notesText": "註解",
  "ownerText": "擁有者",
  "relatedActivitiesText": "活動",
  "relatedHistoriesText": "備註/歷程記錄",
  "relatedItemsText": "相關項目",
  "relatedNotesText": "備註",
  "relatedAttachmentText": "附件",
  "relatedAttachmentTitleText": "銷售線索附件",
  "sicCodeText": "標準產業分類碼",
  "titleText": "銷售線索",
  "tollFreeText": "免付費",
  "mobileText": "行動電話",
  "webText": "網頁",
  "workText": "公司電話",
  "actionsText": "快速動作",
  "callWorkNumberText": "撥打主要電話號碼",
  "scheduleActivityText": "排程活動",
  "addNoteText": "新增備註",
  "sendEmailText": "傳送電子郵件",
  "viewAddressText": "檢視地址",
  "moreDetailsText": "更多詳細資料",
  "calledText": "已撥打 ${0}",
  "emailedText": "已傳送電子郵件給 ${0}"
});

localize("crm.Views.Lead.Edit", {
  "accountText": "帳戶",
  "addressText": "地址",
  "businessText": "業務描述",
  "businessTitleText": "業務描述",
  "companyText": "公司",
  "contactTitleText": "職稱",
  "emailText": "電子郵件",
  "faxText": "傳真",
  "importSourceText": "銷售線索來源",
  "industryText": "行業",
  "industryTitleText": "行業",
  "interestsText": "興趣",
  "leadNameLastFirstText": "名稱",
  "leadOwnerText": "擁有者",
  "nameText": "名稱",
  "notesText": "註解",
  "notesTitleText": "註解",
  "sicCodeText": "標準產業分類碼",
  "titleText": "銷售線索",
  "titleTitleText": "職稱",
  "tollFreeText": "免付費",
  "webText": "網頁",
  "workText": "公司電話",
  "mobileText": "行動電話"
});

localize("crm.Views.Lead.List", {
  "titleText": "銷售線索",
  "activitiesText": "活動",
  "notesText": "備註",
  "scheduleText": "排程",
  "emailedText": "已傳送電子郵件給 ${0}",
  "calledText": "已撥打 ${0}",
  "editActionText": "編輯",
  "callMobileActionText": "撥打行動電話",
  "callWorkActionText": "撥打公司電話",
  "sendEmailActionText": "電子郵件",
  "addNoteActionText": "新增備註",
  "addActivityActionText": "新增活動",
  "addAttachmentActionText": "新增附件",
  "phoneAbbreviationText": "公司電話: ",
  "mobileAbbreviationText": "行動電話: ",
  "tollFreeAbbreviationText": "免付費: "
});

localize("crm.Views.LeadSource.List", {
  "titleText": "銷售線索來源"
});

localize("crm.Views.LeftDrawer", {
  "configureText": "組態功能表",
  "addAccountContactText": "新增帳戶/聯絡人",
  "titleText": "主功能表",
  "actionsText": "快速動作",
  "viewsText": "移至",
  "footerText": "其他",
  "settingsText": "設定",
  "helpText": "說明",
  "logOutText": "登出",
  "logOutConfirmText": "您確定要登出？"
});

localize("crm.Views.LogOff", {
  "messageText": "您已經登出，請關閉瀏覽器視窗。",
  "loginText": "按一下這裡，重新登入。",
  "titleText": "已登出"
});

localize("crm.Views.Login", {
  "copyrightText": "著作權 &copy; 2015 Infor. 著作權所有，並保留一切權利。www.infor.com",
  "logOnText": "登入",
  "passText": "密碼",
  "rememberText": "記住我的帳戶",
  "titleText": "登入",
  "userText": "使用者 ID",
  "invalidUserText": "使用者名稱或密碼無效。",
  "missingUserText": "找不到使用者記錄。",
  "requestAbortedText": "要求已被中止。",
  "logoText": "Infor CRM"
});

localize("crm.Views.MetricConfigure", {
  "titleText": "設定計量",
  "metricTitleText": "職稱",
  "metricFilterText": "篩選",
  "metricText": "計量",
  "chartTypeText": "圖表類型",
  "advancedText": "進階選項",
  "formatterText": "格式器",
  "aggregateText": "彙總",
  "reportViewText": "圖表檢視 ID"
});

localize("crm.Views.MetricFilterLookup", {
  "titleText": "篩選/計量查閱"
});

localize("crm.Views.MetricWidget", {
  "loadingText": "載入中...",
  "errorText": "載入 widget 時發生錯誤。"
});

localize("crm.Views.NameEdit", {
  "titleText": "編輯名稱",
  "firstNameText": "第一個",
  "middleNameText": "中間名",
  "lastNameText": "姓氏",
  "prefixText": "首碼",
  "prefixTitleText": "名稱首碼",
  "suffixText": "尾碼",
  "suffixTitleText": "名稱尾碼"
});

localize("crm.Views.Opportunity.List", {
  "titleText": "商機",
  "activitiesText": "活動",
  "notesText": "備註",
  "scheduleText": "排程",
  "editActionText": "編輯",
  "viewAccountActionText": "帳戶",
  "viewContactsActionText": "聯絡人",
  "viewProductsActionText": "產品",
  "addNoteActionText": "新增備註",
  "addActivityActionText": "新增活動",
  "addAttachmentActionText": "新增附件",
  "actualCloseText": "已關閉 ",
  "estimatedCloseText": "預計關閉 ",
  "quickEditActionText": "快速編輯"
});

localize("crm.Views.Opportunity.QuickEdit", {
  "estCloseText": "預計關閉",
  "detailsText": "詳細資料",
  "opportunityStageTitleText": "商機階段",
  "opportunityText": "商機",
  "stageText": "階段",
  "statusOpenText": "開啟",
  "statusClosedLostText": "已關閉 - 失去",
  "statusClosedWonText": "已關閉 - 贏得",
  "salesProcessText": "銷售程序鎖定的階段:",
  "probabilityText": "關閉機率",
  "probabilityTitleText": "商機概率",
  "potentialText": "銷售潛力"
});

localize("crm.Views.OpportunityContact.Detail", {
  "titleText": "商機聯絡人",
  "accountText": "帳戶",
  "contactTitleText": "職稱",
  "nameText": "聯絡人",
  "moreDetailsText": "更多詳細資料",
  "salesRoleText": "角色",
  "strategyText": "策略",
  "personalBenefitsText": "個人利益",
  "standingText": "職位",
  "issuesText": "問題",
  "competitorNameText": "競爭者偏好",
  "removeContactTitleText": "移除聯絡人",
  "confirmDeleteText": "將 \"${0}\" 從商機移除？",
  "contactText": "聯絡人"
});

localize("crm.Views.OpportunityContact.Edit", {
  "titleText": "編輯商機聯絡人",
  "nameText": "名稱",
  "accountNameText": "帳戶",
  "contactTitleText": "職稱",
  "salesRoleText": "角色",
  "salesRoleTitleText": "角色",
  "personalBenefitsText": "個人利益",
  "strategyText": "策略",
  "issuesText": "問題",
  "standingText": "職位",
  "standingTitleText": "職位",
  "contactText": "聯絡人",
  "competitorPrefText": "競爭者偏好"
});

localize("crm.Views.OpportunityContact.List", {
  "titleText": "商機聯絡人",
  "selectTitleText": "選取聯絡人",
  "activitiesText": "活動",
  "notesText": "備註",
  "scheduleText": "排程"
});

localize("crm.Views.OpportunityProduct.Detail", {
  "detailsText": "詳細資料",
  "opportunityText": "商機",
  "productText": "產品",
  "productFamilyText": "產品系列",
  "priceLevelText": "價格等級",
  "priceText": "價格",
  "basePriceText": "基價",
  "discountText": "折扣",
  "quantityText": "數量",
  "baseExtendedPriceText": "基本",
  "extendedPriceText": "總價",
  "extendedPriceSectionText": "總價",
  "adjustedPriceSectionText": "調整後價格",
  "baseAdjustedPriceText": "基本",
  "adjustedPriceText": "調整後價格",
  "myAdjustedPriceText": "使用者",
  "confirmDeleteText": "將 ${0} 從商機產品移除？",
  "removeOppProductTitleText": "移除商機產品"
});

localize("crm.Views.OpportunityProduct.Edit", {
  "titleText": "商機產品",
  "detailsText": "詳細資料",
  "opportunityText": "商機",
  "productText": "產品",
  "productFamilyText": "產品系列",
  "priceLevelText": "價格等級",
  "priceText": "價格",
  "basePriceText": "基價",
  "discountText": "折扣 %",
  "adjustedPriceText": "調整後價格",
  "myAdjustedPriceText": "使用者",
  "baseAdjustedPriceText": "基本",
  "quantityText": "數量",
  "baseExtendedPriceText": "基本",
  "extendedPriceText": "總價",
  "extendedPriceSectionText": "總價",
  "adjustedPriceSectionText": "調整後價格"
});

localize("crm.Views.OpportunityProduct.List", {
  "titleText": "產品"
});

localize("crm.Views.Owner.List", {
  "titleText": "擁有者"
});

localize("crm.Views.Product.List", {
  "titleText": "產品"
});

localize("crm.Views.ProductProgram.List", {
  "titleText": "產品方案"
});

localize("crm.Views.Settings", {
  "clearLocalStorageTitleText": "清除儲存空間",
  "clearAuthenticationTitleText": "清除儲存的認證",
  "errorLogTitleText": "檢視錯誤日誌",
  "localStorageClearedText": "本機儲存空間已清除成功。",
  "credentialsClearedText": "儲存的認證已清除成功。",
  "titleText": "設定"
});

localize("crm.Views.SpeedSearchList", {
  "titleText": "快速搜尋",
  "indexesText": {
    "Account": "帳戶",
    "Activity": "活動",
    "Contact": "聯絡人",
    "History": "歷程記錄",
    "Lead": "銷售線索",
    "Opportunity": "商機",
    "Ticket": "記錄單"
  }
});

localize("crm.Views.TextEdit", {
  "titleText": "編輯文字"
});

localize("crm.Views.Ticket.Detail", {
  "accountText": "帳戶",
  "areaText": "區域",
  "assignedDateText": "指派日期",
  "assignedToText": "已指派至",
  "completedByText": "完成者",
  "categoryText": "類別",
  "contactText": "聯絡人",
  "contractText": "合約",
  "descriptionText": "描述",
  "issueText": "問題",
  "needByText": "需要日期",
  "notesText": "註解",
  "phoneText": "電話",
  "actionsText": "快速動作",
  "relatedAttachmentText": "附件",
  "relatedAttachmentTitleText": "記錄單附件",
  "relatedActivitiesText": "活動",
  "relatedItemsText": "相關項目",
  "resolutionText": "解決方案",
  "sourceText": "來源",
  "statusText": "狀態",
  "subjectText": "主旨",
  "ticketIdText": "記錄單編號",
  "titleText": "記錄單",
  "urgencyText": "急迫性",
  "scheduleActivityText": "排程活動",
  "moreDetailsText": "更多詳細資料",
  "relatedTicketActivitiesText": "記錄單活動",
  "loadingText": "載入中..."
});

localize("crm.Views.Ticket.Edit", {
  "accountText": "帳戶",
  "areaText": "區域",
  "assignedDateText": "指派日期",
  "assignedToText": "已指派至",
  "categoryText": "類別",
  "contactText": "聯絡人",
  "contractText": "合約",
  "descriptionText": "描述",
  "descriptionTitleText": "描述",
  "issueText": "問題",
  "needByText": "需要日期",
  "notesText": "註解",
  "notesTitleText": "註解",
  "phoneText": "電話",
  "relatedActivitiesText": "活動",
  "relatedItemsText": "相關項目",
  "resolutionText": "解決方案",
  "resolutionTitleText": "解決方案",
  "sourceText": "來源",
  "sourceTitleText": "來源",
  "statusText": "狀態",
  "subjectText": "主旨",
  "ticketAreaTitleText": "記錄單區域",
  "ticketCategoryTitleText": "記錄單類別",
  "ticketIdText": "記錄單編號",
  "ticketIssueTitleText": "記錄單問題",
  "ticketStatusTitleText": "記錄單狀態",
  "ticketUrgencyTitleText": "記錄單急迫性",
  "titleText": "記錄單",
  "urgencyText": "急迫性"
});

localize("crm.Views.Ticket.List", {
  "titleText": "記錄單",
  "activitiesText": "活動",
  "scheduleText": "排程",
  "notAssignedText": "未指派",
  "editActionText": "編輯",
  "viewAccountActionText": "帳戶",
  "viewContactActionText": "聯絡人",
  "addNoteActionText": "新增備註",
  "addActivityActionText": "新增活動",
  "addAttachmentActionText": "新增附件",
  "assignedToText": "已指派至: ",
  "urgencyText": "急迫性: ",
  "createdOnText": "已建立  ",
  "modifiedText": "已修改 ",
  "neededByText": "需要  "
});

localize("crm.Views.Ticket.UrgencyLookup", {
  "titleText": "記錄單急迫性"
});

localize("crm.Views.TicketActivity.Detail", {
  "titleText": "記錄單活動",
  "accountText": "帳戶",
  "contactText": "聯絡人",
  "typeText": "類型",
  "publicAccessText": "公開存取",
  "assignedDateText": "開始日期",
  "completedDateText": "結束日期",
  "followUpText": "後續",
  "unitsText": "時間單位",
  "elapsedUnitsText": "經歷時數",
  "rateTypeDescriptionText": "費用類型",
  "rateText": "費用",
  "totalLaborText": "人工總費用",
  "totalPartsText": "零件總費用",
  "totalFeeText": "總費用",
  "activityDescriptionText": "註解",
  "ticketNumberText": "記錄單編號",
  "userText": "使用者",
  "completeTicketText": "完成記錄單活動",
  "moreDetailsText": "更多詳細資料",
  "relatedItemsText": "相關項目",
  "relatedTicketActivityItemText": "記錄單活動部分"
});

localize("crm.Views.TicketActivity.RateLookup", {
  "titleText": "費用"
});

localize("crm.Views.TicketActivityItem.Detail", {
  "titleText": "記錄單活動部分",
  "productNameText": "產品",
  "skuText": "SKU",
  "serialNumberText": "序號",
  "itemAmountText": "價格",
  "itemDescriptionText": "描述"
});

localize("crm.Views.TicketActivityItem.List", {
  "titleText": "記錄單活動部分"
});

localize("crm.Views.UpdateToolbar", {
  "updateText": "已有更新，請按一下重新載入。"
});

localize("crm.Views.User.CalendarAccessList", {
  "titleText": "活動資源"
});

localize("crm.Views.User.List", {
  "titleText": "使用者"
});

localize("crm.Views._CardLayoutListMixin", {
  "itemIconAltText": "聯絡人",
  "allRecordsText": "未套用搜尋"
});

localize("crm.Views._GroupListMixin", {
  "noDefaultGroupText": "未設定預設群組，請按一下這裡以設定群組。",
  "currentGroupNotFoundText": "找不到目前的群組。",
  "groupTemplateSummaryText": "摘要",
  "groupTemplateDetailText": "詳細資料",
  "groupsModeText": "您目前處於群組模式，請執行搜尋或按一下 # 標籤離開群組模式。"
});

localize("crm.Views._RightDrawerListMixin", {
  "hashTagsSectionText": "# 標籤",
  "groupsSectionText": "群組",
  "kpiSectionText": "KPI",
  "configureGroupsText": "組態",
  "refreshGroupsText": "重新整理",
  "layoutsText": "配置"
});

localize("crm.Views._SpeedSearchRightDrawerListMixin", {
  "indexSectionText": "索引"
});
});
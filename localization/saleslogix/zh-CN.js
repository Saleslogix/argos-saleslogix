define('localization/saleslogix/zh-CN', ['localization/zh-CN', 'Mobile/SalesLogix/ApplicationModule'], function() {

localize("argos.Calendar", {
  "timeFormatText": "A h:mm",
  "titleText": "日历",
  "amText": "上午",
  "pmText": "下午",
  "monthsShortText": {
    "0": "一月",
    "1": "二月",
    "2": "三月",
    "3": "四月",
    "4": "五月",
    "5": "六月",
    "6": "七月",
    "7": "八月",
    "8": "九月",
    "9": "十月",
    "10": "十一月",
    "11": "十二月"
  }
});

localize("argos.Fields.DateField", {
  "dateFormatText": "YYYY/MM/DD",
  "emptyText": "",
  "invalidDateFormatErrorText": "字段“${0}”的日期格式无效。"
});

localize("argos.Format", {
  "shortDateFormatText": "YYYY/M/D",
  "percentFormatText": "${0}${1}",
  "yesText": "是",
  "noText": "否",
  "trueText": "T",
  "falseText": "F",
  "hoursText": "小时",
  "hourText": "小时",
  "minutesText": "分钟",
  "minuteText": "分钟",
  "bytesText": "字节"
});

localize("crm.GroupUtility", {
  "groupDateFormatText": "YYYY/M/D A h:mm:ss"
});

localize("crm.Recurrence", {
  "dayFormatText": "DD",
  "monthFormatText": "MM",
  "monthAndDayFormatText": "MM/DD",
  "weekdayFormatText": "dddd",
  "endDateFormatText": "YYYY/M/D",
  "neverText": "从不",
  "daysText": "天",
  "dailyText": "每天",
  "weeksText": "周",
  "weeklyText": "每周",
  "weeklyOnText": "每周${3}",
  "monthsText": "月",
  "monthlyText": "每月",
  "monthlyOnDayText": "每月 ${1} 号",
  "monthlyOnText": "每月${5} ${3}",
  "yearsText": "年",
  "yearlyText": "每月",
  "yearlyOnText": "每年${2}",
  "yearlyOnWeekdayText": "每年${4}中的${5} ${3}",
  "everyText": "每${0} ${1}",
  "afterCompletionText": "完成后",
  "untilEndDateText": "${0} 直至 ${1}",
  "weekDaysText": {
    "0": "星期天",
    "1": "星期一",
    "2": "星期二",
    "3": "星期三",
    "4": "星期四",
    "5": "星期五",
    "6": "星期六"
  },
  "ordText": {
    "0": "天",
    "1": "第一",
    "2": "第二",
    "3": "第三",
    "4": "第四",
    "5": "姓"
  }
});

localize("crm.Views.Activity.Complete", {
  "completedFormatText": "YYYY/M/D A h:mm",
  "startingFormatText": "YYYY/M/D A h:mm",
  "startingTimelessFormatText": "YYYY/M/D",
  "activityInfoText": "活动信息",
  "accountText": "客户",
  "contactText": "联系人",
  "opportunityText": "销售机会",
  "ticketNumberText": "工单",
  "companyText": "公司",
  "leadText": "销售线索",
  "asScheduledText": "按日程安排",
  "categoryText": "类别",
  "categoryTitleText": "活动类别",
  "completedText": "完成日期",
  "completionText": "完成",
  "durationText": "持续时间",
  "durationInvalidText": "字段“${2}”必须具有值。",
  "carryOverNotesText": "沿用备注",
  "followUpText": "后续",
  "followUpTitleText": "后续类型",
  "leaderText": "主管",
  "longNotesText": "备注",
  "longNotesTitleText": "备注",
  "otherInfoText": "其他信息",
  "priorityText": "优先级",
  "priorityTitleText": "优先级",
  "regardingText": "相关事项",
  "regardingTitleText": "活动相关事项",
  "resultText": "结果",
  "resultTitleText": "结果",
  "startingText": "开始日期",
  "timelessText": "无时间限制",
  "durationValueText": {
    "0": "无",
    "15": "15 分钟",
    "30": "30 分钟",
    "60": "1 小时",
    "90": "1.5 小时",
    "120": "2 小时"
  },
  "followupValueText": {
    "none": "无",
    "atPhoneCall": "电话呼叫",
    "atAppointment": "会议",
    "atToDo": "任务列表",
    "atPersonal": "个人活动"
  }
});

localize("crm.Views.Activity.Detail", {
  "startDateFormatText": "YYYY/M/D A h:mm:ss",
  "timelessDateFormatText": "YYYY/M/D",
  "alarmDateFormatText": "YYYY/M/D A h:mm:ss",
  "activityTypeText": {
    "atToDo": "任务列表",
    "atPhoneCall": "电话呼叫",
    "atAppointment": "会议",
    "atLiterature": "营销材料申请",
    "atPersonal": "个人活动"
  },
  "actionsText": "快速操作",
  "completeActivityText": "完成活动",
  "completeOccurrenceText": "完成出现的情况",
  "completeSeriesText": "完成序列",
  "locationText": "位置",
  "alarmText": "警报",
  "alarmTimeText": "警报",
  "categoryText": "类别",
  "durationText": "持续时间",
  "leaderText": "主管",
  "longNotesText": "备注",
  "priorityText": "优先级",
  "regardingText": "相关事项",
  "rolloverText": "自动续期",
  "startTimeText": "开始时间",
  "allDayText": "整天",
  "timelessText": "无时间限制",
  "titleText": "活动",
  "typeText": "类型",
  "companyText": "公司",
  "leadText": "销售线索",
  "accountText": "客户",
  "contactText": "联系人",
  "opportunityText": "销售机会",
  "ticketNumberText": "工单",
  "whenText": "时间",
  "whoText": "人员",
  "recurrenceText": "定期",
  "confirmEditRecurrenceText": "是否要编辑所有出现的情况？或者点击“取消”以编辑单个出现的情况。",
  "relatedAttachmentText": "附件",
  "relatedAttachmentTitleText": "活动附件",
  "relatedItemsText": "相关项",
  "phoneText": "电话",
  "moreDetailsText": "更多详细信息"
});

localize("crm.Views.Activity.Edit", {
  "startingFormatText": "YYYY/M/D A h:mm",
  "startingTimelessFormatText": "YYYY/M/D",
  "activityCategoryTitleText": "活动类别",
  "activityDescriptionTitleText": "活动描述",
  "locationText": "位置",
  "activityTypeTitleText": "活动类型",
  "alarmText": "警报",
  "reminderText": "提醒",
  "categoryText": "类别",
  "durationText": "持续时间",
  "durationTitleText": "持续时间",
  "durationInvalidText": "字段“${2}”必须具有值。",
  "reminderInvalidText": "字段“提醒”必须具有值。",
  "reminderTitleText": "提醒",
  "leaderText": "主管",
  "longNotesText": "备注",
  "longNotesTitleText": "备注",
  "priorityText": "优先级",
  "priorityTitleText": "优先级",
  "regardingText": "相关事项",
  "rolloverText": "自动续期",
  "startingText": "开始时间",
  "repeatsText": "重复",
  "recurringText": "定期",
  "recurringTitleText": "定期",
  "timelessText": "无时间限制",
  "titleText": "活动",
  "typeText": "类型",
  "accountText": "客户",
  "contactText": "联系人",
  "opportunityText": "销售机会",
  "ticketNumberText": "工单",
  "companyText": "公司",
  "leadText": "销售线索",
  "isLeadText": "针对销售线索",
  "yesText": "是",
  "noText": "否",
  "phoneText": "电话",
  "updateUserActErrorText": "更新用户活动时发生错误。",
  "reminderValueText": {
    "0": "无",
    "5": "5 分钟",
    "15": "15 分钟",
    "30": "30 分钟",
    "60": "1 小时",
    "1440": "1 天"
  },
  "durationValueText": {
    "0": "无",
    "15": "15 分钟",
    "30": "30 分钟",
    "60": "1 小时",
    "90": "1.5 小时",
    "120": "2 小时"
  }
});

localize("crm.Views.Attachment.List", {
  "attachmentDateFormatText": "YYYY/M/D  ddd hh:mm:ss ",
  "titleText": "附件",
  "uploadedOnText": "已上传 ",
  "hashTagQueriesText": {
    "url": "url",
    "binary": "二进制"
  }
});

localize("crm.Views.Attachment.ViewAttachment", {
  "attachmentDateFormatText": "YYYY/M/D ddd a h:mm",
  "detailsText": "附件详细信息",
  "descriptionText": "描述",
  "fileNameText": "文件名",
  "attachDateText": "附件日期",
  "fileSizeText": "文件大小",
  "userText": "用户",
  "attachmentNotSupportedText": "不支持查看此附件类型。",
  "downloadingText": "正在下载附件...",
  "notSupportedText": "您的设备不支持查看此附件。"
});

localize("crm.Views.Calendar.DayView", {
  "eventDateFormatText": "YYYY/M/D",
  "dateHeaderFormatText": "YYYY/M/D dddd",
  "startTimeFormatText": "A h:mm",
  "titleText": "日历",
  "todayText": "今天",
  "dayText": "天",
  "weekText": "周",
  "monthText": "月",
  "allDayText": "全天",
  "eventHeaderText": "事件",
  "activityHeaderText": "活动",
  "eventMoreText": "查看更多事件",
  "toggleCollapseText": "切换折叠"
});

localize("crm.Views.Calendar.MonthView", {
  "monthTitleFormatText": "YYYY MMMM",
  "dayTitleFormatText": "YYYY MMM D ddd",
  "eventDateFormatText": "YYYY/M/D",
  "startTimeFormatText": "A h:mm",
  "titleText": "日历",
  "todayText": "今天",
  "dayText": "天",
  "weekText": "周",
  "monthText": "月",
  "allDayText": "全天",
  "eventText": "事件",
  "eventHeaderText": "事件",
  "countMoreText": "查看更多",
  "activityHeaderText": "活动",
  "toggleCollapseText": "切换折叠",
  "weekDaysShortText": {
    "0": "星期天",
    "1": "星期一",
    "2": "星期二",
    "3": "星期三",
    "4": "星期四",
    "5": "星期五",
    "6": "星期六"
  }
});

localize("crm.Views.Calendar.WeekView", {
  "weekTitleFormatText": "YYYY MMM D",
  "dayHeaderLeftFormatText": "dddd",
  "dayHeaderRightFormatText": "YYYY MMM D",
  "eventDateFormatText": "YYYY/M/D",
  "startTimeFormatText": "A h:mm",
  "titleText": "日历",
  "todayText": "今天",
  "dayText": "天",
  "weekText": "周",
  "monthText": "月",
  "allDayText": "全天",
  "eventHeaderText": "事件",
  "eventMoreText": "查看另外 ${0} 个事件",
  "toggleCollapseText": "切换折叠"
});

localize("crm.Views.ErrorLog.Detail", {
  "errorDateFormatText": "YYYY/MM/DD A hh:mm",
  "titleText": "错误日志",
  "detailsText": "详细信息",
  "errorDateText": "日期",
  "statusTextText": "错误",
  "urlText": "url",
  "moreDetailsText": "更多详细信息",
  "errorText": "错误",
  "emailSubjectText": "在 Saleslogix Mobile Client 中收到错误",
  "copiedSuccessText": "已复制到剪贴板"
});

localize("crm.Views.ErrorLog.List", {
  "errorDateFormatText": "YYYY/MM/DD A hh:mm",
  "titleText": "错误日志"
});

localize("crm.Views.Event.Detail", {
  "startDateFormatText": "YYYY/M/D A h:mm:ss",
  "endDateFormatText": "YYYY/M/D A h:mm:ss",
  "eventTypeText": {
    "atToDo": "任务列表",
    "atPhoneCall": "电话呼叫",
    "atAppointment": "会议",
    "atLiterature": "营销材料申请",
    "atPersonal": "个人活动"
  },
  "actionsText": "快速操作",
  "startTimeText": "开始日期",
  "endTimeText": "结束日期",
  "titleText": "事件",
  "descriptionText": "描述",
  "typeText": "类型",
  "whenText": "时间"
});

localize("crm.Views.Event.Edit", {
  "startingFormatText": "YYYY/M/D A h:mm",
  "titleText": "事件",
  "typeText": "类型",
  "descriptionText": "描述",
  "startDateText": "开始日期",
  "endDateText": "结束日期",
  "eventTypesText": {
    "Vacation": "休假",
    "Business Trip": "出差",
    "Conference": "会议",
    "Holiday": "假日"
  }
});

localize("crm.Views.Event.List", {
  "eventDateFormatText": "YYYY/M/D",
  "titleText": "事件",
  "eventText": "事件"
});

localize("crm.Views.History.Detail", {
  "dateFormatText": "YYYY/M/D A h:mm:ss",
  "categoryText": "类别",
  "completedText": "已完成",
  "durationText": "持续时间",
  "leaderText": "主管",
  "longNotesText": "备注",
  "notesText": "备注",
  "priorityText": "优先级",
  "regardingText": "相关事项",
  "completedByText": "完成者",
  "scheduledText": "已安排",
  "timelessText": "无时间限制",
  "companyText": "公司",
  "leadText": "销售线索",
  "titleText": "历史记录",
  "accountText": "客户",
  "contactText": "联系人",
  "opportunityText": "销售机会",
  "ticketNumberText": "工单",
  "moreDetailsText": "更多详细信息",
  "relatedItemsText": "相关项",
  "relatedAttachmentText": "附件",
  "relatedAttachmentTitleText": "历史附件",
  "modifiedText": "已修改",
  "typeText": "类型",
  "activityTypeText": {
    "atToDo": "任务列表",
    "atPhoneCall": "电话呼叫",
    "atAppointment": "会议",
    "atLiterature": "营销材料申请",
    "atPersonal": "个人活动",
    "atQuestion": "问题",
    "atEMail": "电子邮件"
  }
});

localize("crm.Views.History.Edit", {
  "startingFormatText": "YYYY/M/D A h:mm",
  "accountText": "客户",
  "noteDescriptionTitleText": "备注描述",
  "contactText": "联系人",
  "longNotesText": "备注",
  "longNotesTitleText": "备注",
  "opportunityText": "销售机会",
  "ticketNumberText": "工单",
  "regardingText": "相关事项",
  "isLeadText": "针对销售线索",
  "startingText": "时间",
  "titleText": "备注",
  "companyText": "公司",
  "leadText": "销售线索",
  "relatedItemsText": "相关项",
  "yesText": "是",
  "noText": "否",
  "validationText": "字段“${2}”必须具有值",
  "validationCanEditText": "不允许进行编辑"
});

localize("crm.Views.History.List", {
  "hourMinuteFormatText": "A h:mm",
  "dateFormatText": "YY/M/D",
  "activityTypeText": {
    "atToDo": "任务列表",
    "atPhoneCall": "电话呼叫",
    "atAppointment": "会议",
    "atLiterature": "营销材料申请",
    "atPersonal": "个人活动",
    "atQuestion": "问题",
    "atEMail": "电子邮件"
  },
  "hashTagQueriesText": {
    "my-history": "我的历史记录",
    "note": "备注",
    "phonecall": "电话呼叫",
    "meeting": "会议",
    "personal": "个人",
    "email": "电子邮件"
  },
  "titleText": "备注/历史",
  "viewAccountActionText": "客户",
  "viewOpportunityActionText": "销售机会",
  "viewContactActionText": "联系人",
  "addAttachmentActionText": "添加附件",
  "regardingText": "相关事项： "
});

localize("crm.Views.Opportunity.Detail", {
  "exchangeRateDateFormatText": "YYYY/M/D A h:mm",
  "accountText": "客户",
  "acctMgrText": "客户经理",
  "estCloseText": "预计结束日期",
  "detailsText": "详细信息",
  "fbarHomeTitleText": "住宅",
  "fbarScheduleTitleText": "日程安排",
  "importSourceText": "销售线索来源",
  "opportunityText": "销售机会",
  "ownerText": "所有者",
  "actionsText": "快速操作",
  "potentialText": "销售潜力",
  "potentialBaseText": "销售潜力（基本费率）",
  "potentialOpportunityText": "销售潜力（销售机会费率）",
  "potentialMyRateText": "销售潜力（我的费率）",
  "probabilityText": "结束概率",
  "relatedActivitiesText": "活动",
  "relatedContactsText": "销售机会联系人",
  "relatedHistoriesText": "备注/历史",
  "relatedItemsText": "相关项",
  "relatedNotesText": "备注",
  "relatedProductsText": "产品",
  "relatedAttachmentText": "附件",
  "relatedAttachmentTitleText": "销售机会附件",
  "resellerText": "经销商",
  "statusText": "状态",
  "titleText": "销售机会",
  "typeText": "类型",
  "scheduleActivityText": "日程安排活动",
  "addNoteText": "添加备注",
  "moreDetailsText": "更多详细信息",
  "multiCurrencyText": "多种货币",
  "multiCurrencyRateText": "汇率",
  "multiCurrencyCodeText": "代码",
  "multiCurrencyDateText": "汇率日期",
  "multiCurrencyLockedText": "锁定汇率"
});

localize("crm.Views.Opportunity.Edit", {
  "exchangeRateDateFormatText": "YYYY/M/D A h:mm",
  "accountText": "客户",
  "acctMgrText": "客户经理",
  "estCloseText": "预计结束日期",
  "importSourceText": "销售线索来源",
  "detailsText": "详细信息",
  "opportunityStatusTitleText": "销售机会状态",
  "opportunityText": "销售机会",
  "opportunityTypeTitleText": "销售机会类型",
  "ownerText": "所有者",
  "potentialText": "销售潜力",
  "probabilityText": "结束概率",
  "probabilityTitleText": "销售机会概率",
  "resellerText": "经销商",
  "statusText": "状态",
  "titleText": "销售机会",
  "typeText": "类型",
  "multiCurrencyText": "多种货币",
  "multiCurrencyRateText": "汇率",
  "multiCurrencyCodeText": "代码",
  "multiCurrencyDateText": "汇率日期",
  "multiCurrencyLockedText": "锁定汇率",
  "subTypePickListResellerText": "经销商"
});

localize("crm.Views.TicketActivity.Edit", {
  "startingFormatText": "YYYY/M/D A h:mm",
  "titleText": "编辑工单活动",
  "activityTypeText": "类型",
  "activityTypeTitleText": "类型",
  "publicAccessText": "公共访问",
  "publicAccessTitleText": "公共访问",
  "userText": "用户",
  "startDateText": "开始日期",
  "endDateText": "结束日期",
  "commentsText": "注释"
});

localize("crm.Views.TicketActivity.List", {
  "startDateFormatText": "YYYY/MM/DD A h:mm",
  "titleText": "工单活动"
});

localize("argos.ErrorManager", {
  "abortedText": "已中止",
  "scopeSaveText": "未在错误报告中保存作用域"
});

localize("argos.Fields.DurationField", {
  "emptyText": "",
  "invalidDurationErrorText": "字段“${0}”不是有效的持续时间。",
  "autoCompleteText": {
    "1": "分钟",
    "60": "小时",
    "1440": "天",
    "10080": "周",
    "525960": "年"
  }
});

localize("argos.Fields.EditorField", {
  "lookupLabelText": "编辑",
  "lookupText": "...",
  "emptyText": "空",
  "completeText": "确定"
});

localize("argos.Fields.LookupField", {
  "dependentErrorText": "必须为“${0}”选择值。",
  "emptyText": "",
  "completeText": "选择",
  "lookupLabelText": "查找",
  "lookupText": "..."
});

localize("argos.Fields.SignatureField", {
  "signatureLabelText": "签名",
  "signatureText": "..."
});

localize("argos.GroupedList", {
  "toggleCollapseText": "切换折叠"
});

localize("argos.Groups.DateTimeSection", {
  "displayNameText": "日期时间部分",
  "todayText": "今天",
  "tomorrowText": "明天",
  "laterThisWeekText": "本周晚些时候",
  "earlierThisWeekText": "本周早些时候",
  "thisLaterMonthText": "本月晚些时候",
  "thisEarlierMonthText": "本月早些时候",
  "thisYearEarlierText": "今年早些时候",
  "thisYearLaterText": "今年晚些时候",
  "yesterdayText": "昨天",
  "lastWeekText": "上周",
  "lastMonthText": "上个月",
  "pastYearText": "去年",
  "nextYearText": "明年",
  "nextMonthText": "下个月",
  "nextWeekText": "下周",
  "futureText": "未来",
  "twoWeeksAgoText": "两周前",
  "threeWeeksAgoText": "三周前",
  "twoMonthsAgoText": "两个月前",
  "threeMonthsAgoText": "三个月前",
  "unknownText": "未知"
});

localize("argos.Groups.GroupByValueSection", {
  "displayNameText": "按值部分进行分组"
});

localize("argos.MainToolbar", {
  "titleText": "Mobile"
});

localize("argos.RelatedViewWidget", {
  "nodataText": "找不到任何记录...",
  "selectMoreDataText": "查看另外 ${0} 个 ${1} ... ",
  "navToListText": "查看列表",
  "loadingText": "正在加载... ",
  "refreshViewText": "刷新",
  "itemOfCountText": " ${0} 个 ${1}",
  "totalCountText": " (${0})",
  "titleText": "相关视图"
});

localize("argos.SearchWidget", {
  "searchText": "搜索"
});

localize("argos.SelectionModel", {
  "requireSelectionText": "必须进行选择，不能取消选择最后一项。"
});

localize("argos.View", {
  "titleText": "通用视图"
});

localize("argos.Views.ConfigureQuickActions", {
  "titleText": "配置快速操作"
});

localize("argos.Views.FileSelect", {
  "titleText": "文件选择",
  "addFileText": "单击或点击此处以添加文件。",
  "uploadText": "上传",
  "cancelText": "取消",
  "selectFileText": "选择文件",
  "loadingText": "正在上传...",
  "descriptionText": "描述",
  "bytesText": "字节",
  "notSupportedText": "您的设备不支持添加附件。"
});

localize("argos.Views.Signature", {
  "titleText": "签名",
  "clearCanvasText": "擦除",
  "undoText": "撤销"
});

localize("argos._ConfigureBase", {
  "titleText": "配置"
});

localize("argos._DetailBase", {
  "editText": "编辑",
  "titleText": "详细信息",
  "detailsText": "详细信息",
  "loadingText": "正在加载...",
  "notAvailableText": "请求的数据不可用。",
  "toggleCollapseText": "切换折叠"
});

localize("argos._EditBase", {
  "saveText": "保存",
  "titleText": "编辑",
  "validationSummaryText": "验证摘要",
  "concurrencySummaryText": "并行性错误",
  "detailsText": "详细信息",
  "loadingText": "正在加载...",
  "errorText": {
    "general": "请求数据时发生服务器错误。",
    "status": {
      "410": "保存时发生错误。此记录不再存在。"
    }
  },
  "concurrencyErrorText": "其他用户已更新该字段。"
});

localize("argos._ErrorHandleMixin", {
  "errorText": {
    "general": "发生服务器错误。"
  }
});

localize("argos._ListBase", {
  "moreText": "检索更多记录",
  "emptySelectionText": "无",
  "titleText": "列表",
  "configureText": "配置",
  "errorRenderText": "呈现行模板时出错。",
  "remainingText": "剩余 ${0} 条记录",
  "cancelText": "取消",
  "insertText": "新建",
  "noDataText": "无记录",
  "loadingText": "正在加载..."
});

localize("argos._PullToRefreshMixin", {
  "pullRefreshText": "通过下拉进行刷新...",
  "pullReleaseText": "通过释放进行刷新..."
});

localize("argos._RelatedViewWidgetBase", {
  "loadingText": "正在加载... "
});

localize("crm.Action", {
  "calledText": "已致电 ${0}",
  "emailedText": "已通过电子邮件联系 ${0}"
});

localize("crm.Application", {
  "versionInfoText": "Mobile v${0}.${1}.${2} ",
  "loadingText": "正在加载应用程序状态",
  "authText": "正在验证"
});

localize("crm.ApplicationModule", {
  "searchText": "查找"
});

localize("crm.DefaultMetrics", {
  "accountsText": {
    "totalRevenue": "总收入",
    "averageTime": "客户平均时间",
    "total": "客户总数"
  },
  "opportunitiesText": {
    "total": "销售机会总数",
    "potential": "销售潜力总计",
    "montlyPotential": "每月平均销售潜力"
  },
  "ticketsText": {
    "total": "工单总数",
    "averageOpen": "平均开放期限"
  },
  "contactsText": {
    "total": "联系人总数"
  },
  "leadsText": {
    "total": "销售线索总数"
  },
  "historyText": {
    "total": "历史总数",
    "duration": "总持续时间"
  }
});

localize("crm.Fields.AddressField", {
  "lookupLabelText": "编辑",
  "emptyText": ""
});

localize("crm.Fields.NameField", {
  "emptyText": ""
});

localize("crm.Fields.RecurrencesField", {
  "titleText": "定期",
  "emptyText": ""
});

localize("crm.FileManager", {
  "unableToUploadText": "此浏览器不支持 HTML5 File API。",
  "unknownSizeText": "未知",
  "unknownErrorText": "警告：发生错误，无法上传文件。",
  "largeFileWarningText": "警告：此请求超过管理员设置的大小限制，无法上传。",
  "percentCompleteText": "正在上传，请稍候..."
});

localize("crm.Format", {
  "bigNumberAbbrText": {
    "billion": "十亿",
    "million": "百万",
    "thousand": "千"
  },
  "userActivityFormatText": {
    "asUnconfirmed": "未确认",
    "asAccepted": "已接受",
    "asDeclned": "已拒绝"
  }
});

localize("crm.SpeedSearchWidget", {
  "searchText": "SpeedSearch"
});

localize("crm.Validator", {
  "exists": {
    "message": "字段“${2}”必须具有值。"
  },
  "name": {
    "message": "必须在字段“${2}”中指定姓名。"
  },
  "notEmpty": {
    "message": "字段“${2}”不能为空。"
  },
  "hasText": {
    "test": "",
    "message": "字段“${2}”必须包含文本。"
  },
  "isInteger": {
    "message": "值“${0}”不是有效数字。"
  },
  "isDecimal": {
    "message": "值“${0}”不是有效数字。"
  },
  "isCurrency": {
    "message": "值“${0}”不是有效的货币数字。"
  },
  "isInt32": {
    "message": "字段“${2}”的值超过允许的数值范围。"
  },
  "exceedsMaxTextLength": {
    "message": "字段“${2}”的值超过允许的长度限制。"
  },
  "isDateInRange": {
    "message": "字段“${2}”的值超出允许的日期范围。"
  }
});

localize("crm.Views.Account.Detail", {
  "accountText": "客户",
  "acctMgrText": "客户经理",
  "addressText": "地址",
  "businessDescriptionText": "业务描述",
  "createDateText": "创建日期",
  "createUserText": "创建用户",
  "faxText": "传真",
  "importSourceText": "销售线索来源",
  "industryText": "行业",
  "notesText": "备注",
  "ownerText": "所有者",
  "phoneText": "电话",
  "activityTypeText": {
    "atPhoneCall": "电话呼叫"
  },
  "actionsText": "快速操作",
  "relatedActivitiesText": "活动",
  "relatedContactsText": "联系人",
  "relatedHistoriesText": "备注/历史",
  "relatedItemsText": "相关项",
  "relatedNotesText": "备注",
  "relatedOpportunitiesText": "销售机会",
  "relatedTicketsText": "工单",
  "relatedAddressesText": "地址",
  "relatedAttachmentText": "附件",
  "relatedAttachmentTitleText": "客户附件",
  "statusText": "状态",
  "subTypeText": "子类型",
  "titleText": "客户",
  "typeText": "类型",
  "webText": "web",
  "scheduleActivityText": "日程安排活动",
  "addNoteText": "添加备注",
  "moreDetailsText": "更多详细信息",
  "calledText": "已致电 ${0}"
});

localize("crm.Views.Account.Edit", {
  "accountStatusTitleText": "客户状态",
  "accountSubTypeTitleText": "客户子类型",
  "accountText": "客户",
  "accountTypeTitleText": "客户类型",
  "acctMgrText": "客户经理",
  "businessDescriptionText": "业务描述",
  "businessDescriptionTitleText": "业务描述",
  "descriptionText": "描述",
  "faxText": "传真",
  "fullAddressText": "地址",
  "importSourceText": "销售线索来源",
  "industryText": "行业",
  "industryTitleText": "行业",
  "ownerText": "所有者",
  "phoneText": "电话",
  "statusText": "状态",
  "subTypeText": "子类型",
  "titleText": "客户",
  "typeText": "类型",
  "webText": "web"
});

localize("crm.Views.Account.List", {
  "titleText": "客户",
  "activitiesText": "活动",
  "notesText": "备注",
  "scheduleText": "日程安排",
  "editActionText": "编辑",
  "callMainActionText": "呼叫主要号码",
  "viewContactsActionText": "联系人",
  "addNoteActionText": "添加备注",
  "addActivityActionText": "添加活动",
  "addAttachmentActionText": "添加附件",
  "phoneAbbreviationText": "电话： ",
  "faxAbbreviationText": "传真： "
});

localize("crm.Views.Activity.List", {
  "allDayText": "无时间限制",
  "completeActivityText": "完成",
  "callText": "呼叫",
  "calledText": "已呼叫",
  "addAttachmentActionText": "添加附件",
  "overdueText": "过期",
  "alarmText": "警报",
  "touchedText": "已接触",
  "importantText": "重要",
  "recurringText": "定期",
  "activityTypeText": {
    "atToDo": "任务列表",
    "atPhoneCall": "电话呼叫",
    "atAppointment": "会议",
    "atLiterature": "营销材料申请",
    "atPersonal": "个人",
    "atQuestion": "问题",
    "atNote": "备注",
    "atEMail": "电子邮件"
  },
  "titleText": "活动",
  "hashTagQueriesText": {
    "alarm": "警报",
    "recurring": "定期",
    "timeless": "无时间限制",
    "today": "今天",
    "this-week": "本周",
    "yesterday": "昨天"
  }
});

localize("crm.Views.Activity.MyList", {
  "titleText": "我的活动",
  "completeActivityText": "完成",
  "acceptActivityText": "接受",
  "declineActivityText": "拒绝",
  "callText": "呼叫",
  "calledText": "已呼叫",
  "addAttachmentActionText": "添加附件",
  "viewContactActionText": "联系人",
  "viewAccountActionText": "客户",
  "viewOpportunityActionText": "销售机会",
  "hashTagQueriesText": {
    "alarm": "警报",
    "status-unconfirmed": "未确认状态",
    "status-accepted": "已接受状态",
    "status-declined": "已拒绝状态",
    "recurring": "定期",
    "timeless": "无时间限制",
    "today": "今天",
    "this-week": "本周",
    "yesterday": "昨天"
  }
});

localize("crm.Views.Activity.Recurring", {
  "startingText": "开始日期",
  "endingText": "结束日期",
  "repeatsText": "重复",
  "everyText": "每",
  "afterCompletionText": "完成后",
  "singleWeekdayText": "星期几",
  "weekdaysText": "星期几",
  "dayText": "天",
  "monthText": "月",
  "onText": "于",
  "occurrencesText": "出现的情况",
  "summaryText": "摘要",
  "weekDaysText": {
    "0": "星期天",
    "1": "星期一",
    "2": "星期二",
    "3": "星期三",
    "4": "星期四",
    "5": "星期五",
    "6": "星期六"
  },
  "monthsText": {
    "0": "一月",
    "1": "二月",
    "2": "三月",
    "3": "四月",
    "4": "五月",
    "5": "六月",
    "6": "七月",
    "7": "八月",
    "8": "九月",
    "9": "十月",
    "10": "十一月",
    "11": "十二月"
  },
  "frequencyOptionsText": {
    "0": "天",
    "1": "周",
    "2": "月",
    "3": "年"
  },
  "recurringFrequencyText": "重复频率",
  "yesText": "是",
  "noText": "否",
  "titleText": "定期"
});

localize("crm.Views.Activity.TypesList", {
  "titleText": "日程安排...",
  "activityTypeText": {
    "atToDo": "任务列表",
    "atPhoneCall": "电话呼叫",
    "atAppointment": "会议",
    "atLiterature": "营销材料申请",
    "atPersonal": "个人活动",
    "event": "事件"
  }
});

localize("crm.Views.AddAccountContact", {
  "accountNameText": "客户",
  "accountStatusTitleText": "客户状态",
  "accountSubTypeTitleText": "客户子类型",
  "accountText": "客户",
  "accountTypeTitleText": "客户类型",
  "acctMgrText": "客户经理",
  "addressText": "地址",
  "contactTitleText": "职务",
  "descriptionText": "描述",
  "detailsAccountText": "客户信息",
  "detailsContactText": "联系人信息",
  "detailsText": "联系人/客户信息",
  "emailText": "电子邮件",
  "faxText": "传真",
  "homePhoneText": "住宅电话",
  "industryText": "行业",
  "ownerText": "所有者",
  "lastNameText": "最后",
  "mobileText": "移动电话",
  "nameText": "姓名",
  "statusText": "状态",
  "subTypeText": "子类型",
  "titleText": "添加客户/联系人",
  "typeText": "类型",
  "webText": "web",
  "phoneText": "电话",
  "workText": "工作电话",
  "industryTitleText": "行业"
});

localize("crm.Views.Address.Edit", {
  "address1Text": "地址 1",
  "address2Text": "地址 2",
  "address3Text": "地址 3",
  "cityText": "城市",
  "cityTitleText": "城市",
  "countryText": "国家/地区",
  "countryTitleText": "国家/地区",
  "descriptionText": "描述",
  "descriptionTitleText": "描述",
  "isMailingText": "送货",
  "isPrimaryText": "主要",
  "postalCodeText": "邮编",
  "salutationText": "注意",
  "stateText": "省/州",
  "stateTitleText": "省/州",
  "titleText": "地址"
});

localize("crm.Views.Address.List", {
  "titleText": "地址"
});

localize("crm.Views.AreaCategoryIssueLookup", {
  "titleText": "客户"
});

localize("crm.Views.Attachment.AddAttachment", {
  "titleText": "添加附件"
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
  "loadingText": "正在加载..."
});

localize("crm.Views.Competitor.List", {
  "titleText": "竞争对手"
});

localize("crm.Views.Configure", {
  "titleText": "配置"
});

localize("crm.Views.Contact.Detail", {
  "activityTypeText": {
    "atPhoneCall": "电话呼叫",
    "atEMail": "电子邮件"
  },
  "accountText": "客户",
  "acctMgrText": "客户经理",
  "addressText": "地址",
  "contactTitleText": "职务",
  "createDateText": "创建日期",
  "createUserText": "创建用户",
  "emailText": "电子邮件",
  "faxText": "传真",
  "homeText": "住宅电话",
  "nameText": "联系人",
  "ownerText": "所有者",
  "actionsText": "快速操作",
  "relatedAccountsText": "客户",
  "relatedActivitiesText": "活动",
  "relatedHistoriesText": "备注/历史",
  "relatedItemsText": "相关项",
  "relatedNotesText": "备注",
  "relatedOpportunitiesText": "销售机会",
  "relatedTicketsText": "工单",
  "relatedAddressesText": "地址",
  "relatedAttachmentText": "附件",
  "relatedAttachmentTitleText": "联系人附件",
  "titleText": "联系人",
  "webText": "web",
  "workText": "工作电话",
  "cuisinePreferenceText": "美食",
  "callMobileNumberText": "呼叫移动电话",
  "callWorkNumberText": "呼叫工作电话",
  "calledText": "已呼叫",
  "scheduleActivityText": "日程安排活动",
  "addNoteText": "添加备注",
  "sendEmailText": "发送电子邮件",
  "viewAddressText": "查看地址",
  "moreDetailsText": "更多详细信息"
});

localize("crm.Views.Contact.Edit", {
  "titleText": "联系人",
  "nameText": "姓名",
  "workText": "工作电话",
  "mobileText": "移动电话",
  "emailText": "电子邮件",
  "webText": "web",
  "acctMgrText": "客户经理",
  "accountNameText": "客户",
  "homePhoneText": "住宅电话",
  "faxText": "传真",
  "addressText": "地址",
  "contactTitleText": "职务",
  "titleTitleText": "职务",
  "addressTitleText": "地址",
  "ownerText": "所有者",
  "cuisinePreferenceText": "美食",
  "cuisinePreferenceTitleText": "美食"
});

localize("crm.Views.Contact.List", {
  "titleText": "联系人",
  "activitiesText": "活动",
  "notesText": "备注",
  "scheduleText": "日程安排",
  "editActionText": "编辑",
  "callMainActionText": "呼叫主要号码",
  "callWorkActionText": "呼叫工作电话",
  "callMobileActionText": "呼叫移动电话",
  "sendEmailActionText": "电子邮件",
  "viewAccountActionText": "客户",
  "addNoteActionText": "添加备注",
  "addActivityActionText": "添加活动",
  "addAttachmentActionText": "添加附件",
  "phoneAbbreviationText": "工作电话： ",
  "mobileAbbreviationText": "移动电话： "
});

localize("crm.Views.Contract.List", {
  "titleText": "联系人"
});

localize("crm.Views.ExchangeRateLookup", {
  "titleText": "汇率"
});

localize("crm.Views.FooterToolbar", {
  "copyrightText": "&copy; 2014 SalesLogix, NA, LLC. All rights reserved."
});

localize("crm.Views.Groups.Selector", {
  "titleText": "组查找"
});

localize("crm.Views.Help", {
  "titleText": "帮助",
  "errorText": "错误",
  "errorMessageText": "无法加载帮助文档。"
});

localize("crm.Views.History.RelatedView", {
  "regardingText": "相关事项",
  "byText": "已撰写 ",
  "titleText": "备注"
});

localize("crm.Views.Home", {
  "configureText": "配置",
  "addAccountContactText": "添加客户/联系人",
  "titleText": "住宅",
  "actionsText": "快速操作",
  "viewsText": "转至"
});

localize("crm.Views.Lead.Detail", {
  "activityTypeText": {
    "atPhoneCall": "电话呼叫",
    "atEMail": "电子邮件"
  },
  "accountText": "公司",
  "addressText": "地址",
  "businessDescriptionText": "业务描述",
  "createDateText": "创建日期",
  "createUserText": "创建用户",
  "eMailText": "电子邮件",
  "leadSourceText": "销售线索来源",
  "industryText": "行业",
  "interestsText": "兴趣",
  "leadTitleText": "职务",
  "nameText": "姓名",
  "notesText": "注释",
  "ownerText": "所有者",
  "relatedActivitiesText": "活动",
  "relatedHistoriesText": "备注/历史",
  "relatedItemsText": "相关项",
  "relatedNotesText": "备注",
  "relatedAttachmentText": "附件",
  "relatedAttachmentTitleText": "销售线索附件",
  "sicCodeText": "标准行业分类代码",
  "titleText": "销售线索",
  "tollFreeText": "免费电话",
  "mobileText": "移动电话",
  "webText": "web",
  "workText": "工作电话",
  "actionsText": "快速操作",
  "callWorkNumberText": "呼叫总机",
  "scheduleActivityText": "日程安排活动",
  "addNoteText": "添加备注",
  "sendEmailText": "发送电子邮件",
  "viewAddressText": "查看地址",
  "moreDetailsText": "更多详细信息",
  "calledText": "已致电 ${0}",
  "emailedText": "已通过电子邮件联系 ${0}"
});

localize("crm.Views.Lead.Edit", {
  "accountText": "客户",
  "addressText": "地址",
  "businessText": "业务描述",
  "businessTitleText": "业务描述",
  "companyText": "公司",
  "contactTitleText": "职务",
  "emailText": "电子邮件",
  "faxText": "传真",
  "importSourceText": "销售线索来源",
  "industryText": "行业",
  "industryTitleText": "行业",
  "interestsText": "兴趣",
  "leadNameLastFirstText": "姓名",
  "leadOwnerText": "所有者",
  "nameText": "姓名",
  "notesText": "注释",
  "notesTitleText": "注释",
  "sicCodeText": "标准行业分类代码",
  "titleText": "销售线索",
  "titleTitleText": "职务",
  "tollFreeText": "免费电话",
  "webText": "web",
  "workText": "工作电话",
  "mobileText": "移动电话"
});

localize("crm.Views.Lead.List", {
  "titleText": "销售线索",
  "activitiesText": "活动",
  "notesText": "备注",
  "scheduleText": "日程安排",
  "emailedText": "已通过电子邮件联系 ${0}",
  "calledText": "已致电 ${0}",
  "editActionText": "编辑",
  "callMobileActionText": "呼叫移动电话",
  "callWorkActionText": "呼叫工作电话",
  "sendEmailActionText": "电子邮件",
  "addNoteActionText": "添加备注",
  "addActivityActionText": "添加活动",
  "addAttachmentActionText": "添加附件",
  "phoneAbbreviationText": "工作电话： ",
  "mobileAbbreviationText": "移动电话： ",
  "tollFreeAbbreviationText": "免费电话： "
});

localize("crm.Views.LeadSource.List", {
  "titleText": "销售线索来源"
});

localize("crm.Views.LeftDrawer", {
  "configureText": "配置菜单",
  "addAccountContactText": "添加客户/联系人",
  "titleText": "主菜单",
  "actionsText": "快速操作",
  "viewsText": "转至",
  "footerText": "其他",
  "settingsText": "设置",
  "helpText": "帮助",
  "logOutText": "注销",
  "logOutConfirmText": "是否确定要注销？"
});

localize("crm.Views.LogOff", {
  "messageText": "已注销。请关闭浏览器窗口。",
  "loginText": "单击此处以重新登录。",
  "titleText": "已注销"
});

localize("crm.Views.Login", {
  "copyrightText": "版权所有 &copy; 2015 Infor。保留所有权利。www.infor.com",
  "logOnText": "登录",
  "passText": "密码",
  "rememberText": "记住我",
  "titleText": "登录",
  "userText": "用户 ID",
  "invalidUserText": "用户名或密码无效。",
  "missingUserText": "找不到用户记录。",
  "requestAbortedText": "请求已中止。",
  "logoText": "Infor CRM"
});

localize("crm.Views.MetricConfigure", {
  "titleText": "配置指标",
  "metricTitleText": "职务",
  "metricFilterText": "过滤器",
  "metricText": "指标",
  "chartTypeText": "图表类型",
  "advancedText": "高级选项",
  "formatterText": "格式化程序",
  "aggregateText": "汇总",
  "reportViewText": "图表视图 ID"
});

localize("crm.Views.MetricFilterLookup", {
  "titleText": "过滤器/指标查找"
});

localize("crm.Views.MetricWidget", {
  "loadingText": "正在加载...",
  "errorText": "加载小组件时出错。"
});

localize("crm.Views.NameEdit", {
  "titleText": "编辑姓名",
  "firstNameText": "第一",
  "middleNameText": "中间名",
  "lastNameText": "最后",
  "prefixText": "前缀",
  "prefixTitleText": "姓名前缀",
  "suffixText": "后缀",
  "suffixTitleText": "姓名后缀"
});

localize("crm.Views.Opportunity.List", {
  "titleText": "销售机会",
  "activitiesText": "活动",
  "notesText": "备注",
  "scheduleText": "日程安排",
  "editActionText": "编辑",
  "viewAccountActionText": "客户",
  "viewContactsActionText": "联系人",
  "viewProductsActionText": "产品",
  "addNoteActionText": "添加备注",
  "addActivityActionText": "添加活动",
  "addAttachmentActionText": "添加附件",
  "actualCloseText": "已结束 ",
  "estimatedCloseText": "预计结束日期 ",
  "quickEditActionText": "快速编辑"
});

localize("crm.Views.Opportunity.QuickEdit", {
  "estCloseText": "预计结束日期",
  "detailsText": "详细信息",
  "opportunityStageTitleText": "销售机会阶段",
  "opportunityText": "销售机会",
  "stageText": "阶段",
  "statusOpenText": "打开",
  "statusClosedLostText": "已关闭 - 失去",
  "statusClosedWonText": "已关闭 - 赢得",
  "salesProcessText": "销售流程锁定的阶段:",
  "probabilityText": "结束概率",
  "probabilityTitleText": "销售机会概率",
  "potentialText": "销售潜力"
});

localize("crm.Views.OpportunityContact.Detail", {
  "titleText": "销售机会联系人",
  "accountText": "客户",
  "contactTitleText": "职务",
  "nameText": "联系人",
  "moreDetailsText": "更多详细信息",
  "salesRoleText": "角色",
  "strategyText": "策略",
  "personalBenefitsText": "个人权益",
  "standingText": "常备",
  "issuesText": "问题",
  "competitorNameText": "竞争对手前缀",
  "removeContactTitleText": "删除联系人",
  "confirmDeleteText": "是否从销售机会中删除“${0}”？",
  "contactText": "联系人"
});

localize("crm.Views.OpportunityContact.Edit", {
  "titleText": "编辑销售机会联系人",
  "nameText": "姓名",
  "accountNameText": "客户",
  "contactTitleText": "职务",
  "salesRoleText": "角色",
  "salesRoleTitleText": "角色",
  "personalBenefitsText": "个人权益",
  "strategyText": "策略",
  "issuesText": "问题",
  "standingText": "常备",
  "standingTitleText": "常备",
  "contactText": "联系人",
  "competitorPrefText": "竞争对手前缀"
});

localize("crm.Views.OpportunityContact.List", {
  "titleText": "销售机会联系人",
  "selectTitleText": "选择联系人",
  "activitiesText": "活动",
  "notesText": "备注",
  "scheduleText": "日程安排"
});

localize("crm.Views.OpportunityProduct.Detail", {
  "detailsText": "详细信息",
  "opportunityText": "销售机会",
  "productText": "产品",
  "productFamilyText": "产品系列",
  "priceLevelText": "价位",
  "priceText": "价格",
  "basePriceText": "基价",
  "discountText": "折扣",
  "quantityText": "数量",
  "baseExtendedPriceText": "基本",
  "extendedPriceText": "总价",
  "extendedPriceSectionText": "总价",
  "adjustedPriceSectionText": "调整价",
  "baseAdjustedPriceText": "基本",
  "adjustedPriceText": "调整价",
  "myAdjustedPriceText": "用户",
  "confirmDeleteText": "是否从销售机会产品中删除 ${0}？",
  "removeOppProductTitleText": "删除销售机会产品"
});

localize("crm.Views.OpportunityProduct.Edit", {
  "titleText": "销售机会产品",
  "detailsText": "详细信息",
  "opportunityText": "销售机会",
  "productText": "产品",
  "productFamilyText": "产品系列",
  "priceLevelText": "价位",
  "priceText": "价格",
  "basePriceText": "基价",
  "discountText": "折扣百分比",
  "adjustedPriceText": "调整价",
  "myAdjustedPriceText": "用户",
  "baseAdjustedPriceText": "基本",
  "quantityText": "数量",
  "baseExtendedPriceText": "基本",
  "extendedPriceText": "总价",
  "extendedPriceSectionText": "总价",
  "adjustedPriceSectionText": "调整价"
});

localize("crm.Views.OpportunityProduct.List", {
  "titleText": "产品"
});

localize("crm.Views.Owner.List", {
  "titleText": "所有者"
});

localize("crm.Views.Product.List", {
  "titleText": "产品"
});

localize("crm.Views.ProductProgram.List", {
  "titleText": "产品计划"
});

localize("crm.Views.Settings", {
  "clearLocalStorageTitleText": "清空存储",
  "clearAuthenticationTitleText": "清空保存的凭据",
  "errorLogTitleText": "查看错误日志",
  "localStorageClearedText": "已成功清空本地存储。",
  "credentialsClearedText": "已成功清空保存的凭据。",
  "titleText": "设置"
});

localize("crm.Views.SpeedSearchList", {
  "titleText": "SpeedSearch",
  "indexesText": {
    "Account": "客户",
    "Activity": "活动",
    "Contact": "联系人",
    "History": "历史记录",
    "Lead": "销售线索",
    "Opportunity": "销售机会",
    "Ticket": "工单"
  }
});

localize("crm.Views.TextEdit", {
  "titleText": "编辑文本"
});

localize("crm.Views.Ticket.Detail", {
  "accountText": "客户",
  "areaText": "区域",
  "assignedDateText": "分配的日期",
  "assignedToText": "分配给",
  "completedByText": "完成者",
  "categoryText": "类别",
  "contactText": "联系人",
  "contractText": "联系人",
  "descriptionText": "描述",
  "issueText": "问题",
  "needByText": "所需日期",
  "notesText": "注释",
  "phoneText": "电话",
  "actionsText": "快速操作",
  "relatedAttachmentText": "附件",
  "relatedAttachmentTitleText": "工单附件",
  "relatedActivitiesText": "活动",
  "relatedItemsText": "相关项",
  "resolutionText": "解决方案",
  "sourceText": "源",
  "statusText": "状态",
  "subjectText": "主题",
  "ticketIdText": "工单编号",
  "titleText": "工单",
  "urgencyText": "紧急性",
  "scheduleActivityText": "日程安排活动",
  "moreDetailsText": "更多详细信息",
  "relatedTicketActivitiesText": "工单活动",
  "loadingText": "正在加载..."
});

localize("crm.Views.Ticket.Edit", {
  "accountText": "客户",
  "areaText": "区域",
  "assignedDateText": "分配的日期",
  "assignedToText": "分配给",
  "categoryText": "类别",
  "contactText": "联系人",
  "contractText": "联系人",
  "descriptionText": "描述",
  "descriptionTitleText": "描述",
  "issueText": "问题",
  "needByText": "所需日期",
  "notesText": "注释",
  "notesTitleText": "注释",
  "phoneText": "电话",
  "relatedActivitiesText": "活动",
  "relatedItemsText": "相关项",
  "resolutionText": "解决方案",
  "resolutionTitleText": "解决方案",
  "sourceText": "源",
  "sourceTitleText": "源",
  "statusText": "状态",
  "subjectText": "主题",
  "ticketAreaTitleText": "工单区域",
  "ticketCategoryTitleText": "工单类别",
  "ticketIdText": "工单编号",
  "ticketIssueTitleText": "工单问题",
  "ticketStatusTitleText": "工单状态",
  "ticketUrgencyTitleText": "工单紧急性",
  "titleText": "工单",
  "urgencyText": "紧急性"
});

localize("crm.Views.Ticket.List", {
  "titleText": "工单",
  "activitiesText": "活动",
  "scheduleText": "日程安排",
  "notAssignedText": "未分配",
  "editActionText": "编辑",
  "viewAccountActionText": "客户",
  "viewContactActionText": "联系人",
  "addNoteActionText": "添加备注",
  "addActivityActionText": "添加活动",
  "addAttachmentActionText": "添加附件",
  "assignedToText": "已分配给： ",
  "urgencyText": "紧急性： ",
  "createdOnText": "已创建  ",
  "modifiedText": "已修改 ",
  "neededByText": "需要  "
});

localize("crm.Views.Ticket.UrgencyLookup", {
  "titleText": "工单紧急性"
});

localize("crm.Views.TicketActivity.Detail", {
  "titleText": "工单活动",
  "accountText": "客户",
  "contactText": "联系人",
  "typeText": "类型",
  "publicAccessText": "公共访问",
  "assignedDateText": "开始日期",
  "completedDateText": "结束日期",
  "followUpText": "后续",
  "unitsText": "时间单位",
  "elapsedUnitsText": "历经时数",
  "rateTypeDescriptionText": "费用类型",
  "rateText": "费率",
  "totalLaborText": "人工总计",
  "totalPartsText": "部件总计",
  "totalFeeText": "费用总计",
  "activityDescriptionText": "注释",
  "ticketNumberText": "工单编号",
  "userText": "用户",
  "completeTicketText": "完成工单活动",
  "moreDetailsText": "更多详细信息",
  "relatedItemsText": "相关项",
  "relatedTicketActivityItemText": "工单活动部分"
});

localize("crm.Views.TicketActivity.RateLookup", {
  "titleText": "费率"
});

localize("crm.Views.TicketActivityItem.Detail", {
  "titleText": "工单活动部分",
  "productNameText": "产品",
  "skuText": "SKU",
  "serialNumberText": "序列号",
  "itemAmountText": "价格",
  "itemDescriptionText": "描述"
});

localize("crm.Views.TicketActivityItem.List", {
  "titleText": "工单活动部分"
});

localize("crm.Views.UpdateToolbar", {
  "updateText": "有更新可用。请单击以重新加载。"
});

localize("crm.Views.User.CalendarAccessList", {
  "titleText": "活动资源"
});

localize("crm.Views.User.List", {
  "titleText": "用户"
});

localize("crm.Views._CardLayoutListMixin", {
  "itemIconAltText": "联系人",
  "allRecordsText": "未应用搜索"
});

localize("crm.Views._GroupListMixin", {
  "noDefaultGroupText": "未设置默认组。请单击此处以配置组。",
  "currentGroupNotFoundText": "找不到当前组。",
  "groupTemplateSummaryText": "摘要",
  "groupTemplateDetailText": "详细信息",
  "groupsModeText": "您当前处于组模式。请执行搜索或单击井号标签以退出组模式。"
});

localize("crm.Views._RightDrawerListMixin", {
  "hashTagsSectionText": "井号标签",
  "groupsSectionText": "组",
  "kpiSectionText": "KPI",
  "configureGroupsText": "配置",
  "refreshGroupsText": "刷新",
  "layoutsText": "布局"
});

localize("crm.Views._SpeedSearchRightDrawerListMixin", {
  "indexSectionText": "索引"
});
});
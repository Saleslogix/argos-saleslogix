define('localization/saleslogix/pt', ['localization/pt', 'Mobile/SalesLogix/ApplicationModule'], function() {

localize("argos.Calendar", {
  "timeFormatText": "h:mm A",
  "titleText": "Calendário",
  "amText": "AM",
  "pmText": "PM",
  "monthsShortText": {
    "0": "Jan",
    "1": "Fev",
    "2": "Mar",
    "3": "Abr",
    "4": "Maio",
    "5": "Jun",
    "6": "Jul",
    "7": "Ago",
    "8": "Set",
    "9": "Out",
    "10": "Nov",
    "11": "Dez"
  }
});

localize("argos.Fields.DateField", {
  "dateFormatText": "DD/MM/YYYY",
  "emptyText": "",
  "invalidDateFormatErrorText": "O Campo '${0}' tem formato de data inválido."
});

localize("argos.Format", {
  "shortDateFormatText": "D/M/YYYY",
  "percentFormatText": "${0}${1}",
  "yesText": "Sim",
  "noText": "Não",
  "trueText": "V",
  "falseText": "F",
  "hoursText": "Horas",
  "hourText": "hora",
  "minutesText": "Minutos",
  "minuteText": "minuto",
  "bytesText": "bytes"
});

localize("crm.GroupUtility", {
  "groupDateFormatText": "D/M/YYYY h:mm:ss A"
});

localize("crm.Recurrence", {
  "dayFormatText": "DD",
  "monthFormatText": "MM",
  "monthAndDayFormatText": "DD/MM",
  "weekdayFormatText": "dddd",
  "endDateFormatText": "D/M/YYYY",
  "neverText": "Nunca",
  "daysText": "Dias",
  "dailyText": "Diariamente",
  "weeksText": "semanas",
  "weeklyText": "Semanalmente",
  "weeklyOnText": "Semanalmente em ${3}",
  "monthsText": "meses",
  "monthlyText": "Mensalmente",
  "monthlyOnDayText": "Mensalmente no dia ${1}",
  "monthlyOnText": "Mensalmente em ${5} ${3}",
  "yearsText": "anos",
  "yearlyText": "Anualmente",
  "yearlyOnText": "Anualmente em ${2}",
  "yearlyOnWeekdayText": "Anualmente em ${5} ${3} em ${4}",
  "everyText": "cada ${0} ${1}",
  "afterCompletionText": "após a conclusão",
  "untilEndDateText": "${0} até ${1}",
  "weekDaysText": {
    "0": "Domingo",
    "1": "Segunda-Feira",
    "2": "Terça-Feira",
    "3": "Quarta-feira",
    "4": "Quinta-Feira",
    "5": "Sexta-feira",
    "6": "Sábado"
  },
  "ordText": {
    "0": "Dia",
    "1": "Primeiro",
    "2": "segundo",
    "3": "terceiro",
    "4": "quarto",
    "5": "Último"
  }
});

localize("crm.Views.Activity.Complete", {
  "completedFormatText": "D/M/YYYY h:mm A",
  "startingFormatText": "D/M/YYYY h:mm A",
  "startingTimelessFormatText": "D/M/YYYY",
  "activityInfoText": "Informação da Atividade",
  "accountText": "Conta",
  "contactText": "Contato",
  "opportunityText": "Oportunidade",
  "ticketNumberText": "Tíquete",
  "companyText": "Empresa",
  "leadText": "Lead",
  "asScheduledText": "Agendamento",
  "categoryText": "Categoria",
  "categoryTitleText": "Categoria da Atividade",
  "completedText": "Data de Conclusão",
  "completionText": "Conclusão",
  "durationText": "Duração",
  "durationInvalidText": "O campo '${2}' deve ter um valor.",
  "carryOverNotesText": "Carregar Notas",
  "followUpText": "Follow-Up",
  "followUpTitleText": "Tipo de acompanhamento",
  "leaderText": "Responsável",
  "longNotesText": "Notas",
  "longNotesTitleText": "Notas",
  "otherInfoText": "Outras Informações",
  "priorityText": "Prioridade",
  "priorityTitleText": "Prioridade",
  "regardingText": "Referência",
  "regardingTitleText": "Referência da Atividade",
  "resultText": "Resultado",
  "resultTitleText": "Resultado",
  "startingText": "Data Inicial",
  "timelessText": "Duração Indeterminada",
  "durationValueText": {
    "0": "Nenhum",
    "15": "15 minutos",
    "30": "30 minutos",
    "60": "1 hora",
    "90": "1,5 horas",
    "120": "2 Horas"
  },
  "followupValueText": {
    "none": "Nenhum",
    "atPhoneCall": "Chamada Telefônica",
    "atAppointment": "Reunião",
    "atToDo": "Tarefa",
    "atPersonal": "Atividade Pessoal"
  }
});

localize("crm.Views.Activity.Detail", {
  "startDateFormatText": "D/M/YYYY h:mm:ss A",
  "timelessDateFormatText": "D/M/YYYY",
  "alarmDateFormatText": "D/M/YYYY h:mm:ss A",
  "activityTypeText": {
    "atToDo": "Tarefa",
    "atPhoneCall": "Chamada Telefônica",
    "atAppointment": "Reunião",
    "atLiterature": "Solicitação de Documentação",
    "atPersonal": "Atividade Pessoal"
  },
  "actionsText": "Ações Rápidas",
  "completeActivityText": "Completar Atividade",
  "completeOccurrenceText": "Completar Ocorrência",
  "completeSeriesText": "Completar Série",
  "locationText": "Localização",
  "alarmText": "Alarme",
  "alarmTimeText": "Alarme",
  "categoryText": "Categoria",
  "durationText": "Duração",
  "leaderText": "Responsável",
  "longNotesText": "Notas",
  "priorityText": "Prioridade",
  "regardingText": "Referência",
  "rolloverText": "postergar automaticamente",
  "startTimeText": "Hora de Inicio",
  "allDayText": "dia inteiro",
  "timelessText": "Duração Indeterminada",
  "titleText": "Atividade",
  "typeText": "Tipo",
  "companyText": "Empresa",
  "leadText": "Lead",
  "accountText": "Conta",
  "contactText": "Contato",
  "opportunityText": "Oportunidade",
  "ticketNumberText": "Tíquete",
  "whenText": "Quando",
  "whoText": "Quem",
  "recurrenceText": "recorrência",
  "confirmEditRecurrenceText": "Editar todas as Ocorrências? Cancele para editar somente uma Ocorrência.",
  "relatedAttachmentText": "Anexos",
  "relatedAttachmentTitleText": "Anexos da Atividade",
  "relatedItemsText": "Itens Relacionados",
  "phoneText": "Telefone",
  "moreDetailsText": "Mais Detalhes"
});

localize("crm.Views.Activity.Edit", {
  "startingFormatText": "D/M/YYYY h:mm A",
  "startingTimelessFormatText": "D/M/YYYY",
  "activityCategoryTitleText": "Categoria da Atividade",
  "activityDescriptionTitleText": "Descrição da Atividade",
  "locationText": "Localização",
  "activityTypeTitleText": "Tipo de Atividade",
  "alarmText": "Alarme",
  "reminderText": "Lembrete",
  "categoryText": "Categoria",
  "durationText": "Duração",
  "durationTitleText": "Duração",
  "durationInvalidText": "O campo '${2}' deve ter um valor.",
  "reminderInvalidText": "O campo 'lembrete' deve ter um valor.",
  "reminderTitleText": "Lembrete",
  "leaderText": "Responsável",
  "longNotesText": "Notas",
  "longNotesTitleText": "Notas",
  "priorityText": "Prioridade",
  "priorityTitleText": "Prioridade",
  "regardingText": "Referência",
  "rolloverText": "postergar automaticamente",
  "startingText": "Hora de Inicio",
  "repeatsText": "repetir",
  "recurringText": "Recorrência",
  "recurringTitleText": "Recorrência",
  "timelessText": "Duração Indeterminada",
  "titleText": "Atividade",
  "typeText": "Tipo",
  "accountText": "Conta",
  "contactText": "Contato",
  "opportunityText": "Oportunidade",
  "ticketNumberText": "Tíquete",
  "companyText": "Empresa",
  "leadText": "Lead",
  "isLeadText": "para o lead",
  "yesText": "Sim",
  "noText": "Não",
  "phoneText": "Telefone",
  "updateUserActErrorText": "Ocorreu um erro ao atualizar as atividades do usuário.",
  "reminderValueText": {
    "0": "Nenhum",
    "5": "5 minutos",
    "15": "15 minutos",
    "30": "30 minutos",
    "60": "1 hora",
    "1440": "1 dia"
  },
  "durationValueText": {
    "0": "Nenhum",
    "15": "15 minutos",
    "30": "30 minutos",
    "60": "1 hora",
    "90": "1,5 horas",
    "120": "2 Horas"
  }
});

localize("crm.Views.Attachment.List", {
  "attachmentDateFormatText": "ddd D/M/YYYY hh:mm:ss",
  "titleText": "Anexos",
  "uploadedOnText": "Carregado ",
  "hashTagQueriesText": {
    "url": "Url",
    "binary": "Binario"
  }
});

localize("crm.Views.Attachment.ViewAttachment", {
  "attachmentDateFormatText": "ddd D/M/YYYY h:mm a",
  "detailsText": "Detalhes do Anexo",
  "descriptionText": "Descrição",
  "fileNameText": "Nome do Arquivo",
  "attachDateText": "data do anexo",
  "fileSizeText": "Tamanho do Arquivo",
  "userText": "Usuário",
  "attachmentNotSupportedText": "O tipo do anexo não é suportado para visualização.",
  "downloadingText": "Fazendo download do anexo...",
  "notSupportedText": "A visualização do anexo não é suportada pelo seu dispositivo."
});

localize("crm.Views.Calendar.DayView", {
  "eventDateFormatText": "D/M/YYYY",
  "dateHeaderFormatText": "dddd, D/M/YYYY",
  "startTimeFormatText": "h:mm A",
  "titleText": "Calendário",
  "todayText": "Hoje",
  "dayText": "Dia",
  "weekText": "Semana",
  "monthText": "Mês",
  "allDayText": "Dia Inteiro",
  "eventHeaderText": "Eventos",
  "activityHeaderText": "Atividades",
  "eventMoreText": "Visualizar Mais Eventos",
  "toggleCollapseText": "alternar recolher"
});

localize("crm.Views.Calendar.MonthView", {
  "monthTitleFormatText": "MMMM YYYY",
  "dayTitleFormatText": "ddd D MMM YYYY",
  "eventDateFormatText": "D/M/YYYY",
  "startTimeFormatText": "h:mm A",
  "titleText": "Calendário",
  "todayText": "Hoje",
  "dayText": "Dia",
  "weekText": "Semana",
  "monthText": "Mês",
  "allDayText": "Dia Inteiro",
  "eventText": "Evento",
  "eventHeaderText": "Eventos",
  "countMoreText": "Visualizar Mais",
  "activityHeaderText": "Atividades",
  "toggleCollapseText": "alternar recolher",
  "weekDaysShortText": {
    "0": "Dom",
    "1": "Seg",
    "2": "Ter",
    "3": "Qua",
    "4": "Qui",
    "5": "Sex",
    "6": "Sáb"
  }
});

localize("crm.Views.Calendar.WeekView", {
  "weekTitleFormatText": "MMM D, YYYY",
  "dayHeaderLeftFormatText": "dddd",
  "dayHeaderRightFormatText": "MMM D, YYYY",
  "eventDateFormatText": "D/M/YYYY",
  "startTimeFormatText": "h:mm A",
  "titleText": "Calendário",
  "todayText": "Hoje",
  "dayText": "Dia",
  "weekText": "Semana",
  "monthText": "Mês",
  "allDayText": "dia inteiro",
  "eventHeaderText": "Eventos",
  "eventMoreText": "Visualizar ${0} Mais Eventos(s)",
  "toggleCollapseText": "alternar recolher"
});

localize("crm.Views.ErrorLog.Detail", {
  "errorDateFormatText": "DD/MM/YYYY hh:mm A",
  "titleText": "Log de Erro",
  "detailsText": "Detalhes",
  "errorDateText": "Data",
  "statusTextText": "Erro",
  "urlText": "Url",
  "moreDetailsText": "Mais Detalhes",
  "errorText": "Erro",
  "emailSubjectText": "Erro recebido no Saleslogix Mobile",
  "copiedSuccessText": "Copiado para a área de transferência"
});

localize("crm.Views.ErrorLog.List", {
  "errorDateFormatText": "DD/MM/YYYY hh:mm A",
  "titleText": "Logs de Erro"
});

localize("crm.Views.Event.Detail", {
  "startDateFormatText": "D/M/YYYY h:mm:ss A",
  "endDateFormatText": "D/M/YYYY h:mm:ss A",
  "eventTypeText": {
    "atToDo": "Tarefa",
    "atPhoneCall": "Chamada Telefônica",
    "atAppointment": "Reunião",
    "atLiterature": "Solicitação de Documentação",
    "atPersonal": "Atividade Pessoal"
  },
  "actionsText": "Ações Rápidas",
  "startTimeText": "Data Inicial",
  "endTimeText": "Data Final",
  "titleText": "Evento",
  "descriptionText": "Descrição",
  "typeText": "Tipo",
  "whenText": "Quando"
});

localize("crm.Views.Event.Edit", {
  "startingFormatText": "D/M/YYYY h:mm A",
  "titleText": "Evento",
  "typeText": "Tipo",
  "descriptionText": "Descrição",
  "startDateText": "Data Inicial",
  "endDateText": "Data Final",
  "eventTypesText": {
    "Vacation": "Férias",
    "Business Trip": "Viagem de Negócios",
    "Conference": "Conferência",
    "Holiday": "Feriado"
  }
});

localize("crm.Views.Event.List", {
  "eventDateFormatText": "D/M/YYYY",
  "titleText": "Eventos",
  "eventText": "Evento"
});

localize("crm.Views.History.Detail", {
  "dateFormatText": "D/M/YYYY h:mm:ss A",
  "categoryText": "Categoria",
  "completedText": "Concluído",
  "durationText": "Duração",
  "leaderText": "Responsável",
  "longNotesText": "Notas",
  "notesText": "Notas",
  "priorityText": "Prioridade",
  "regardingText": "Referência",
  "completedByText": "Concluído Por",
  "scheduledText": "Agendado",
  "timelessText": "Duração Indeterminada",
  "companyText": "Empresa",
  "leadText": "Lead",
  "titleText": "Histórico",
  "accountText": "Conta",
  "contactText": "Contato",
  "opportunityText": "Oportunidade",
  "ticketNumberText": "Tíquete",
  "moreDetailsText": "Mais Detalhes",
  "relatedItemsText": "Itens Relacionados",
  "relatedAttachmentText": "Anexos",
  "relatedAttachmentTitleText": "Anexos do Histórico",
  "modifiedText": "Modificado",
  "typeText": "Tipo",
  "activityTypeText": {
    "atToDo": "Tarefa",
    "atPhoneCall": "Chamada Telefônica",
    "atAppointment": "Reunião",
    "atLiterature": "Solicitação de Documentação",
    "atPersonal": "Atividade Pessoal",
    "atQuestion": "Pergunta",
    "atEMail": "E-mail"
  }
});

localize("crm.Views.History.Edit", {
  "startingFormatText": "D/M/YYYY h:mm A",
  "accountText": "Conta",
  "noteDescriptionTitleText": "Descrição da Nota",
  "contactText": "Contato",
  "longNotesText": "Notas",
  "longNotesTitleText": "Notas",
  "opportunityText": "Oportunidade",
  "ticketNumberText": "Tíquete",
  "regardingText": "Referência",
  "isLeadText": "para o lead",
  "startingText": "Hora",
  "titleText": "Nota",
  "companyText": "Empresa",
  "leadText": "Lead",
  "relatedItemsText": "Itens Relacionados",
  "yesText": "Sim",
  "noText": "Não",
  "validationText": "O campo '${2}' deve conter um valor",
  "validationCanEditText": "Você não possui autorização para editar"
});

localize("crm.Views.History.List", {
  "hourMinuteFormatText": "h:mm A",
  "dateFormatText": "D/M/YY",
  "activityTypeText": {
    "atToDo": "Tarefa",
    "atPhoneCall": "Chamada Telefônica",
    "atAppointment": "Reunião",
    "atLiterature": "Solicitação de Documentação",
    "atPersonal": "Atividade Pessoal",
    "atQuestion": "Pergunta",
    "atEMail": "E-mail"
  },
  "hashTagQueriesText": {
    "my-history": "meu-histórico",
    "note": "Nota",
    "phonecall": "chamada-telefônica",
    "meeting": "Reunião",
    "personal": "Pessoal",
    "email": "E-mail"
  },
  "titleText": "Notas/Histórico",
  "viewAccountActionText": "Conta",
  "viewOpportunityActionText": "Oport.",
  "viewContactActionText": "Contato",
  "addAttachmentActionText": "Adicionar Anexo",
  "regardingText": "Referente a: "
});

localize("crm.Views.Opportunity.Detail", {
  "exchangeRateDateFormatText": "D/M/YYYY h:mm A",
  "accountText": "conta",
  "acctMgrText": "ger. conta",
  "estCloseText": "estimativa de fechamento",
  "detailsText": "Detalhes",
  "fbarHomeTitleText": "Início",
  "fbarScheduleTitleText": "Agendar",
  "importSourceText": "Origem do Lead",
  "opportunityText": "Oportunidade",
  "ownerText": "Proprietário",
  "actionsText": "Ações Rápidas",
  "potentialText": "Potencial de Vendas",
  "potentialBaseText": "potencial de vendas (câmbio base)",
  "potentialOpportunityText": "potencial de vendas (câmbio da oport.)",
  "potentialMyRateText": "potencial de vendas (meu câmbio)",
  "probabilityText": "prob. de fechamento",
  "relatedActivitiesText": "Atividades",
  "relatedContactsText": "Contatos da Oportunidade",
  "relatedHistoriesText": "Notas/Histórico",
  "relatedItemsText": "Itens Relacionados",
  "relatedNotesText": "Notas",
  "relatedProductsText": "Produtos",
  "relatedAttachmentText": "Anexos",
  "relatedAttachmentTitleText": "Anexos da Oportunidade",
  "resellerText": "Revendedor",
  "statusText": "Status",
  "titleText": "Oportunidade",
  "typeText": "Tipo",
  "scheduleActivityText": "Agendar Atividade",
  "addNoteText": "Adicionar Nota",
  "moreDetailsText": "Mais Detalhes",
  "multiCurrencyText": "Multi Moedas",
  "multiCurrencyRateText": "Taxa de Câmbio",
  "multiCurrencyCodeText": "Código",
  "multiCurrencyDateText": "data do câmbio",
  "multiCurrencyLockedText": "câmbio bloqueado"
});

localize("crm.Views.Opportunity.Edit", {
  "exchangeRateDateFormatText": "D/M/YYYY h:mm A",
  "accountText": "conta",
  "acctMgrText": "ger. conta",
  "estCloseText": "estimativa de fechamento",
  "importSourceText": "Origem do Lead",
  "detailsText": "Detalhes",
  "opportunityStatusTitleText": "Status da Oportunidade",
  "opportunityText": "Oportunidade",
  "opportunityTypeTitleText": "Tipo da Oportunidade",
  "ownerText": "Proprietário",
  "potentialText": "Potencial de Vendas",
  "probabilityText": "prob. de fechamento",
  "probabilityTitleText": "Probabilidade da Oportunidade",
  "resellerText": "Revendedor",
  "statusText": "Status",
  "titleText": "Oportunidade",
  "typeText": "Tipo",
  "multiCurrencyText": "Multi Moedas",
  "multiCurrencyRateText": "Taxa de Câmbio",
  "multiCurrencyCodeText": "Código",
  "multiCurrencyDateText": "data do câmbio",
  "multiCurrencyLockedText": "câmbio bloqueado",
  "subTypePickListResellerText": "Revendedor"
});

localize("crm.Views.TicketActivity.Edit", {
  "startingFormatText": "D/M/YYYY h:mm A",
  "titleText": "Editar Atividade do Tíquete",
  "activityTypeText": "Tipo",
  "activityTypeTitleText": "Tipo",
  "publicAccessText": "Acesso Público",
  "publicAccessTitleText": "Acesso Público",
  "userText": "Usuário",
  "startDateText": "Data Inicial",
  "endDateText": "Data Final",
  "commentsText": "Comentários"
});

localize("crm.Views.TicketActivity.List", {
  "startDateFormatText": "DD/MM/YYYY h:mm A",
  "titleText": "Atividades do Tíquete"
});

localize("argos.ErrorManager", {
  "abortedText": "Abortado",
  "scopeSaveText": "O escopo não foi salvo no relatório de erro"
});

localize("argos.Fields.DurationField", {
  "emptyText": "",
  "invalidDurationErrorText": "O Campo '${0}' não é uma duração válida.",
  "autoCompleteText": {
    "1": "Minuto(s)",
    "60": "Hora(s)",
    "1440": "Dia(s)",
    "10080": "semana(s)",
    "525960": "ano(s)"
  }
});

localize("argos.Fields.EditorField", {
  "lookupLabelText": "Editar",
  "lookupText": "...",
  "emptyText": "vazio",
  "completeText": "OK"
});

localize("argos.Fields.LookupField", {
  "dependentErrorText": "Um valor para '${0}' deve ser selecionado.",
  "emptyText": "",
  "completeText": "Selecionar",
  "lookupLabelText": "Pesquisa",
  "lookupText": "..."
});

localize("argos.Fields.SignatureField", {
  "signatureLabelText": "assinatura",
  "signatureText": "..."
});

localize("argos.GroupedList", {
  "toggleCollapseText": "alternar recolher"
});

localize("argos.Groups.DateTimeSection", {
  "displayNameText": "Seção de Data e Hora",
  "todayText": "Hoje",
  "tomorrowText": "Amanhã",
  "laterThisWeekText": "Final dessa semana",
  "earlierThisWeekText": "Início dessa semana",
  "thisLaterMonthText": "Final desse mês",
  "thisEarlierMonthText": "Início desse mês",
  "thisYearEarlierText": "Início desse ano",
  "thisYearLaterText": "Final desse ano",
  "yesterdayText": "Ontem",
  "lastWeekText": "Última Semana",
  "lastMonthText": "Último Mês",
  "pastYearText": "Ano(s) anterior(es)",
  "nextYearText": "Próximo Ano",
  "nextMonthText": "Próximo Mês",
  "nextWeekText": "Próxima Semana",
  "futureText": "Futuro",
  "twoWeeksAgoText": "Duas semanas atrás",
  "threeWeeksAgoText": "Três semanas atrás",
  "twoMonthsAgoText": "Dois meses atrás",
  "threeMonthsAgoText": "Três meses atrás",
  "unknownText": "Desconhecido"
});

localize("argos.Groups.GroupByValueSection", {
  "displayNameText": "Agrupar por Seção de Valor"
});

localize("argos.MainToolbar", {
  "titleText": "Celular"
});

localize("argos.RelatedViewWidget", {
  "nodataText": "nenhum registro encontrado ...",
  "selectMoreDataText": "ver ${0} mais de ${1} ... ",
  "navToListText": "visualizar lista",
  "loadingText": "carregando ... ",
  "refreshViewText": "Atualizar",
  "itemOfCountText": " ${0} de ${1}",
  "totalCountText": " (${0})",
  "titleText": "Visualização Relacionada"
});

localize("argos.SearchWidget", {
  "searchText": "Pesquisar"
});

localize("argos.SelectionModel", {
  "requireSelectionText": "Uma seleção é requerida, você não pode desmarcar o último item."
});

localize("argos.View", {
  "titleText": "Visualização Genérica"
});

localize("argos.Views.ConfigureQuickActions", {
  "titleText": "Configurar Ações Rápidas"
});

localize("argos.Views.FileSelect", {
  "titleText": "Selecionar Arquivo",
  "addFileText": "Clique ou Toque aqui para adicionar um arquivo.",
  "uploadText": "Carregar",
  "cancelText": "Cancelar",
  "selectFileText": "Selecionar arquivo",
  "loadingText": "Enviando ...",
  "descriptionText": "Descrição",
  "bytesText": "bytes",
  "notSupportedText": "A inclusão de anexos não é suportado pelo seu dispositivo."
});

localize("argos.Views.Signature", {
  "titleText": "assinatura",
  "clearCanvasText": "Apagar",
  "undoText": "Desfazer"
});

localize("argos._ConfigureBase", {
  "titleText": "Configurar"
});

localize("argos._DetailBase", {
  "editText": "Editar",
  "titleText": "Detalhe",
  "detailsText": "Detalhes",
  "loadingText": "Carregando...",
  "notAvailableText": "O dado solicitado não está disponível.",
  "toggleCollapseText": "alternar recolher"
});

localize("argos._EditBase", {
  "saveText": "Salvar",
  "titleText": "Editar",
  "validationSummaryText": "Resumo de Validação",
  "concurrencySummaryText": "Simultaneidade de Erro(s)",
  "detailsText": "Detalhes",
  "loadingText": "Carregando...",
  "errorText": {
    "general": "Ocorreu um erro no servidor enquanto solicitava dados.",
    "status": {
      "410": "Erro ao salvar. Este registro não existe."
    }
  },
  "concurrencyErrorText": "Outro usuário atualizou este campo."
});

localize("argos._ErrorHandleMixin", {
  "errorText": {
    "general": "Ocorreu um erro do servidor."
  }
});

localize("argos._ListBase", {
  "moreText": "Carregar Mais Registros",
  "emptySelectionText": "Nenhum",
  "titleText": "Lista",
  "configureText": "Configurar",
  "errorRenderText": "Erro ao renderizar o modelo de linha.",
  "remainingText": "${0} registros restantes",
  "cancelText": "Cancelar",
  "insertText": "Novo",
  "noDataText": "nenhum registro",
  "loadingText": "Carregando..."
});

localize("argos._PullToRefreshMixin", {
  "pullRefreshText": "Puxe para baixo para atualizar...",
  "pullReleaseText": "Disponibilizar para atualização..."
});

localize("argos._RelatedViewWidgetBase", {
  "loadingText": "carregando ... "
});

localize("crm.Action", {
  "calledText": "Chamado ${0}",
  "emailedText": "E-mail enviado ${0}"
});

localize("crm.Application", {
  "versionInfoText": "Móvel v${0}.${1}.${2}",
  "loadingText": "Carregando estado da aplicação",
  "authText": "Autenticando"
});

localize("crm.ApplicationModule", {
  "searchText": "Pesquisa"
});

localize("crm.DefaultMetrics", {
  "accountsText": {
    "totalRevenue": "Total de Faturamento",
    "averageTime": "Tempo Médio como Cliente",
    "total": "Total de Contas"
  },
  "opportunitiesText": {
    "total": "Total de Oportunidades",
    "potential": "Total do Potencial de Vendas",
    "montlyPotential": "Média Mensal do Potencial de Vendas"
  },
  "ticketsText": {
    "total": "Total de Tíquetes",
    "averageOpen": "Abrir Prazo Médio"
  },
  "contactsText": {
    "total": "Total de Contatos"
  },
  "leadsText": {
    "total": "Total de Leads"
  },
  "historyText": {
    "total": "Total de Histórico",
    "duration": "Total de Duração"
  }
});

localize("crm.Fields.AddressField", {
  "lookupLabelText": "Editar",
  "emptyText": ""
});

localize("crm.Fields.NameField", {
  "emptyText": ""
});

localize("crm.Fields.RecurrencesField", {
  "titleText": "Recorrência",
  "emptyText": ""
});

localize("crm.FileManager", {
  "unableToUploadText": "Este navegador não suporta arquivos de APIs HTML5.",
  "unknownSizeText": "Desconhecido",
  "unknownErrorText": "Aviso: Ocorreu um erro e o arquivo falhou durante processo de upload.",
  "largeFileWarningText": "Aviso: Esta requisição excede o tamanho máximo definido pelo seu administrador e falhou durante processo de upload.",
  "percentCompleteText": "Carregando, favor aguardar..."
});

localize("crm.Format", {
  "bigNumberAbbrText": {
    "billion": "B",
    "million": "M",
    "thousand": "K"
  },
  "userActivityFormatText": {
    "asUnconfirmed": "Não confirmado",
    "asAccepted": "Aceita",
    "asDeclned": "Recusada"
  }
});

localize("crm.SpeedSearchWidget", {
  "searchText": "SpeedSearch"
});

localize("crm.Validator", {
  "exists": {
    "message": "O campo '${2}' deve ter um valor."
  },
  "name": {
    "message": "O campo '${2}' deve ter o primeiro nome e o sobrenome especificados."
  },
  "notEmpty": {
    "message": "O campo '${2}' não pode ser vazio."
  },
  "hasText": {
    "test": "",
    "message": "O campo '${2}' deve conter algum texto."
  },
  "isInteger": {
    "message": "O valor '${0}' não é um número válido."
  },
  "isDecimal": {
    "message": "O valor '${0}' não é um número válido."
  },
  "isCurrency": {
    "message": "O valor '${0}' não é um número de moeda válido."
  },
  "isInt32": {
    "message": "O valor do campo '${2}' excedeu o intervalo numérico permitido."
  },
  "exceedsMaxTextLength": {
    "message": "O valor do campo '${2}' excedeu o tamanho máximo permitido."
  },
  "isDateInRange": {
    "message": "O Campo '${2}' está fora do intervalo de data permitido."
  }
});

localize("crm.Views.Account.Detail", {
  "accountText": "Conta",
  "acctMgrText": "ger. conta",
  "addressText": "Endereço",
  "businessDescriptionText": "descr. do negócio",
  "createDateText": "Data de Criação",
  "createUserText": "Usuário de Criação",
  "faxText": "Fax",
  "importSourceText": "Origem do Lead",
  "industryText": "Indústria",
  "notesText": "Notas",
  "ownerText": "Proprietário",
  "phoneText": "Telefone",
  "activityTypeText": {
    "atPhoneCall": "Chamada Telefônica"
  },
  "actionsText": "Ações Rápidas",
  "relatedActivitiesText": "Atividades",
  "relatedContactsText": "Contatos",
  "relatedHistoriesText": "Notas/Histórico",
  "relatedItemsText": "Itens Relacionados",
  "relatedNotesText": "Notas",
  "relatedOpportunitiesText": "Oportunidades",
  "relatedTicketsText": "Tíquetes",
  "relatedAddressesText": "Endereços",
  "relatedAttachmentText": "Anexos",
  "relatedAttachmentTitleText": "Anexos da Conta",
  "statusText": "Status",
  "subTypeText": "Sub-Tipo",
  "titleText": "Conta",
  "typeText": "Tipo",
  "webText": "Web",
  "scheduleActivityText": "Agendar Atividade",
  "addNoteText": "Adicionar Nota",
  "moreDetailsText": "Mais Detalhes",
  "calledText": "Chamado ${0}"
});

localize("crm.Views.Account.Edit", {
  "accountStatusTitleText": "Status da Conta",
  "accountSubTypeTitleText": "Subtipo da Conta",
  "accountText": "Conta",
  "accountTypeTitleText": "Tipo de Conta",
  "acctMgrText": "ger. conta",
  "businessDescriptionText": "descr. do negócio",
  "businessDescriptionTitleText": "Descrição do Negócio",
  "descriptionText": "Desc",
  "faxText": "Fax",
  "fullAddressText": "Endereço",
  "importSourceText": "Origem do Lead",
  "industryText": "Indústria",
  "industryTitleText": "Indústria",
  "ownerText": "Proprietário",
  "phoneText": "Telefone",
  "statusText": "Status",
  "subTypeText": "Sub-Tipo",
  "titleText": "Conta",
  "typeText": "Tipo",
  "webText": "Web"
});

localize("crm.Views.Account.List", {
  "titleText": "Contas",
  "activitiesText": "Atividades",
  "notesText": "Notas",
  "scheduleText": "Agendar",
  "editActionText": "Editar",
  "callMainActionText": "Ligar para o Tel. Principal",
  "viewContactsActionText": "Contatos",
  "addNoteActionText": "Adicionar Nota",
  "addActivityActionText": "Adicionar Atividade",
  "addAttachmentActionText": "Adicionar Anexo",
  "phoneAbbreviationText": "Telefone: ",
  "faxAbbreviationText": "Fax: "
});

localize("crm.Views.Activity.List", {
  "allDayText": "Duração Indeterminada",
  "completeActivityText": "Completar",
  "callText": "Chamada",
  "calledText": "Chamado",
  "addAttachmentActionText": "Adicionar Anexo",
  "overdueText": "Vencido",
  "alarmText": "Alarme",
  "touchedText": "alterado",
  "importantText": "importante",
  "recurringText": "Recorrência",
  "activityTypeText": {
    "atToDo": "Tarefa",
    "atPhoneCall": "Chamada Telefônica",
    "atAppointment": "Reunião",
    "atLiterature": "Solicitação de Doc.",
    "atPersonal": "Pessoal",
    "atQuestion": "Pergunta",
    "atNote": "Nota",
    "atEMail": "E-mail"
  },
  "titleText": "Atividades",
  "hashTagQueriesText": {
    "alarm": "Alarme",
    "recurring": "Recorrência",
    "timeless": "duração-indeterminada",
    "today": "Hoje",
    "this-week": "esta-semana",
    "yesterday": "Ontem"
  }
});

localize("crm.Views.Activity.MyList", {
  "titleText": "Minhas Atividades",
  "completeActivityText": "Completar",
  "acceptActivityText": "Aceitar",
  "declineActivityText": "Recusado",
  "callText": "Chamada",
  "calledText": "Chamado",
  "addAttachmentActionText": "Adicionar Anexo",
  "viewContactActionText": "Contato",
  "viewAccountActionText": "Conta",
  "viewOpportunityActionText": "Oportunidade",
  "hashTagQueriesText": {
    "alarm": "Alarme",
    "status-unconfirmed": "status-não-confirmado",
    "status-accepted": "status-aceito",
    "status-declined": "status-declinado",
    "recurring": "Recorrência",
    "timeless": "duração-indeterminada",
    "today": "Hoje",
    "this-week": "esta-semana",
    "yesterday": "Ontem"
  }
});

localize("crm.Views.Activity.Recurring", {
  "startingText": "Data Inicial",
  "endingText": "Data Final",
  "repeatsText": "repetir",
  "everyText": "Cada",
  "afterCompletionText": "após concluída",
  "singleWeekdayText": "dia útil",
  "weekdaysText": "dia(s) útil(eis)",
  "dayText": "Dia",
  "monthText": "Mês",
  "onText": "em",
  "occurrencesText": "ocorrências",
  "summaryText": "Sumário",
  "weekDaysText": {
    "0": "Domingo",
    "1": "Segunda-Feira",
    "2": "Terça-Feira",
    "3": "Quarta-feira",
    "4": "Quinta-Feira",
    "5": "Sexta-feira",
    "6": "Sábado"
  },
  "monthsText": {
    "0": "Janeiro",
    "1": "Fevereiro",
    "2": "Março",
    "3": "Abril",
    "4": "Maio",
    "5": "Junho",
    "6": "Julho",
    "7": "Agosto",
    "8": "Setembro",
    "9": "Outubro",
    "10": "Novembro",
    "11": "Dezembro"
  },
  "frequencyOptionsText": {
    "0": "Dias",
    "1": "semanas",
    "2": "meses",
    "3": "anos"
  },
  "recurringFrequencyText": "Frequência da Recorrência",
  "yesText": "Sim",
  "noText": "Não",
  "titleText": "recorrência"
});

localize("crm.Views.Activity.TypesList", {
  "titleText": "Agendar...",
  "activityTypeText": {
    "atToDo": "Tarefa",
    "atPhoneCall": "Chamada Telefônica",
    "atAppointment": "Reunião",
    "atLiterature": "Solicitação de Documentação",
    "atPersonal": "Atividade Pessoal",
    "event": "Evento"
  }
});

localize("crm.Views.AddAccountContact", {
  "accountNameText": "Conta",
  "accountStatusTitleText": "Status da Conta",
  "accountSubTypeTitleText": "Subtipo da Conta",
  "accountText": "Conta",
  "accountTypeTitleText": "Tipo de Conta",
  "acctMgrText": "ger. conta",
  "addressText": "Endereço",
  "contactTitleText": "Cargo",
  "descriptionText": "Descrição",
  "detailsAccountText": "Informações da Conta",
  "detailsContactText": "Informações do Contato",
  "detailsText": "Informações do Contato / Conta",
  "emailText": "E-mail",
  "faxText": "Fax",
  "homePhoneText": "Telefone Residencial",
  "industryText": "Indústria",
  "ownerText": "Proprietário",
  "lastNameText": "Último",
  "mobileText": "Celular",
  "nameText": "Nome",
  "statusText": "Status",
  "subTypeText": "Sub-Tipo",
  "titleText": "Adicionar Conta / Contato",
  "typeText": "Tipo",
  "webText": "Web",
  "phoneText": "Telefone",
  "workText": "Telefone Comercial",
  "industryTitleText": "Indústria"
});

localize("crm.Views.Address.Edit", {
  "address1Text": "Endereço 1",
  "address2Text": "Endereço 2",
  "address3Text": "Endereço 3",
  "cityText": "Cidade",
  "cityTitleText": "Cidade",
  "countryText": "País",
  "countryTitleText": "País",
  "descriptionText": "Descrição",
  "descriptionTitleText": "Descrição",
  "isMailingText": "Enviar",
  "isPrimaryText": "Primário",
  "postalCodeText": "Postal",
  "salutationText": "Atenção",
  "stateText": "Estado",
  "stateTitleText": "Estado",
  "titleText": "Endereço"
});

localize("crm.Views.Address.List", {
  "titleText": "Endereços"
});

localize("crm.Views.AreaCategoryIssueLookup", {
  "titleText": "Contas"
});

localize("crm.Views.Attachment.AddAttachment", {
  "titleText": "Adicionar Anexos"
});

localize("crm.Views.Attachment.MyAttachmentList", {
  "titleText": "Meus Anexos"
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
  "loadingText": "Carregando..."
});

localize("crm.Views.Competitor.List", {
  "titleText": "Concorrentes"
});

localize("crm.Views.Configure", {
  "titleText": "Configurar"
});

localize("crm.Views.Contact.Detail", {
  "activityTypeText": {
    "atPhoneCall": "Chamada Telefônica",
    "atEMail": "E-mail"
  },
  "accountText": "Conta",
  "acctMgrText": "ger. conta",
  "addressText": "Endereço",
  "contactTitleText": "Cargo",
  "createDateText": "Data de Criação",
  "createUserText": "Usuário de Criação",
  "emailText": "E-mail",
  "faxText": "Fax",
  "homeText": "Telefone Residencial",
  "nameText": "Contato",
  "ownerText": "Proprietário",
  "actionsText": "Ações Rápidas",
  "relatedAccountsText": "Contas",
  "relatedActivitiesText": "Atividades",
  "relatedHistoriesText": "Notas/Histórico",
  "relatedItemsText": "Itens Relacionados",
  "relatedNotesText": "Notas",
  "relatedOpportunitiesText": "Oportunidades",
  "relatedTicketsText": "Tíquetes",
  "relatedAddressesText": "Endereços",
  "relatedAttachmentText": "Anexos",
  "relatedAttachmentTitleText": "Anexos do Contato",
  "titleText": "Contato",
  "webText": "Web",
  "workText": "Telefone Comercial",
  "cuisinePreferenceText": "Culinária",
  "callMobileNumberText": "Ligar para o celular",
  "callWorkNumberText": "Ligar para o Comercial",
  "calledText": "Chamado",
  "scheduleActivityText": "Agendar Atividade",
  "addNoteText": "Adicionar Nota",
  "sendEmailText": "Enviar e-mail",
  "viewAddressText": "Visualizar Endereços",
  "moreDetailsText": "Mais Detalhes"
});

localize("crm.Views.Contact.Edit", {
  "titleText": "Contato",
  "nameText": "Nome",
  "workText": "Telefone Comercial",
  "mobileText": "telefone celular",
  "emailText": "E-mail",
  "webText": "Web",
  "acctMgrText": "ger. conta",
  "accountNameText": "Conta",
  "homePhoneText": "Telefone Residencial",
  "faxText": "Fax",
  "addressText": "Endereço",
  "contactTitleText": "Cargo",
  "titleTitleText": "Cargo",
  "addressTitleText": "Endereço",
  "ownerText": "Proprietário",
  "cuisinePreferenceText": "Culinária",
  "cuisinePreferenceTitleText": "Culinária"
});

localize("crm.Views.Contact.List", {
  "titleText": "Contatos",
  "activitiesText": "Atividades",
  "notesText": "Notas",
  "scheduleText": "Agendar",
  "editActionText": "Editar",
  "callMainActionText": "Ligar para o Tel. Principal",
  "callWorkActionText": "Ligar para o Comercial",
  "callMobileActionText": "Ligar para o celular",
  "sendEmailActionText": "E-mail",
  "viewAccountActionText": "Conta",
  "addNoteActionText": "Adicionar Nota",
  "addActivityActionText": "Adicionar Atividade",
  "addAttachmentActionText": "Adicionar Anexo",
  "phoneAbbreviationText": "Comercial: ",
  "mobileAbbreviationText": "Celular: "
});

localize("crm.Views.Contract.List", {
  "titleText": "Contratos"
});

localize("crm.Views.ExchangeRateLookup", {
  "titleText": "Taxas de Câmbio"
});

localize("crm.Views.FooterToolbar", {
  "copyrightText": "&cópia; 2014 SalesLogix, NA, LLC. Todos os direitos reservados."
});

localize("crm.Views.Groups.Selector", {
  "titleText": "Pesquisa de Grupos"
});

localize("crm.Views.Help", {
  "titleText": "Ajuda",
  "errorText": "Erro",
  "errorMessageText": "Não foi possível carregar o documento de ajuda."
});

localize("crm.Views.History.RelatedView", {
  "regardingText": "Referência",
  "byText": "escrito ",
  "titleText": "Notas"
});

localize("crm.Views.Home", {
  "configureText": "Configurar",
  "addAccountContactText": "Adicionar Conta/Contato",
  "titleText": "Início",
  "actionsText": "Ações Rápidas",
  "viewsText": "Ir Para"
});

localize("crm.Views.Lead.Detail", {
  "activityTypeText": {
    "atPhoneCall": "Chamada Telefônica",
    "atEMail": "E-mail"
  },
  "accountText": "Empresa",
  "addressText": "Endereço",
  "businessDescriptionText": "descr. do negócio",
  "createDateText": "Data de Criação",
  "createUserText": "Usuário de Criação",
  "eMailText": "E-mail",
  "leadSourceText": "Origem do Lead",
  "industryText": "Indústria",
  "interestsText": "Interesses",
  "leadTitleText": "Cargo",
  "nameText": "Nome",
  "notesText": "Comentários",
  "ownerText": "Proprietário",
  "relatedActivitiesText": "Atividades",
  "relatedHistoriesText": "Notas/Histórico",
  "relatedItemsText": "Itens Relacionados",
  "relatedNotesText": "Notas",
  "relatedAttachmentText": "Anexos",
  "relatedAttachmentTitleText": "Anexos do Lead",
  "sicCodeText": "Código SIC",
  "titleText": "Lead",
  "tollFreeText": "Tel. Gratuito",
  "mobileText": "telefone celular",
  "webText": "Web",
  "workText": "Telefone Comercial",
  "actionsText": "Ações Rápidas",
  "callWorkNumberText": "Ligar para o número principal",
  "scheduleActivityText": "Agendar Atividade",
  "addNoteText": "Adicionar Nota",
  "sendEmailText": "Enviar e-mail",
  "viewAddressText": "Visualizar Endereços",
  "moreDetailsText": "Mais Detalhes",
  "calledText": "Chamado ${0}",
  "emailedText": "Enviado por e-mail ${0}"
});

localize("crm.Views.Lead.Edit", {
  "accountText": "Conta",
  "addressText": "Endereço",
  "businessText": "descr. do negócio",
  "businessTitleText": "Descrição do Negócio",
  "companyText": "Empresa",
  "contactTitleText": "Cargo",
  "emailText": "E-mail",
  "faxText": "Fax",
  "importSourceText": "Origem do Lead",
  "industryText": "Indústria",
  "industryTitleText": "Indústria",
  "interestsText": "Interesses",
  "leadNameLastFirstText": "Nome",
  "leadOwnerText": "Proprietário",
  "nameText": "Nome",
  "notesText": "Comentários",
  "notesTitleText": "Comentários",
  "sicCodeText": "Código SIC",
  "titleText": "Lead",
  "titleTitleText": "Cargo",
  "tollFreeText": "Tel. Gratuito",
  "webText": "Web",
  "workText": "Telefone Comercial",
  "mobileText": "telefone celular"
});

localize("crm.Views.Lead.List", {
  "titleText": "Leads",
  "activitiesText": "Atividades",
  "notesText": "Notas",
  "scheduleText": "Agendar",
  "emailedText": "E-mail enviado ${0}",
  "calledText": "Chamado ${0}",
  "editActionText": "Editar",
  "callMobileActionText": "Ligar para o celular",
  "callWorkActionText": "Ligar para o Comercial",
  "sendEmailActionText": "E-mail",
  "addNoteActionText": "Adicionar Nota",
  "addActivityActionText": "Adicionar Atividade",
  "addAttachmentActionText": "Adicionar Anexo",
  "phoneAbbreviationText": "Comercial: ",
  "mobileAbbreviationText": "Celular: ",
  "tollFreeAbbreviationText": "Telefone Gratuito: "
});

localize("crm.Views.LeadSource.List", {
  "titleText": "Origens do Lead"
});

localize("crm.Views.LeftDrawer", {
  "configureText": "Configurar Menu",
  "addAccountContactText": "Adicionar Conta/Contato",
  "titleText": "Menu Principal",
  "actionsText": "Ações Rápidas",
  "viewsText": "Ir Para",
  "footerText": "Outro",
  "settingsText": "Definições",
  "helpText": "Ajuda",
  "logOutText": "Sair",
  "logOutConfirmText": "Deseja realmente sair?"
});

localize("crm.Views.LogOff", {
  "messageText": "Você foi desconectado. Favor fechar sua janela de navegação.",
  "loginText": "Clique aqui para entrar novamente.",
  "titleText": "Desconectado"
});

localize("crm.Views.Login", {
  "copyrightText": "Direitos Autorais &cópia; 2015 Infor. Todos os direitos reservados. www.infor.com",
  "logOnText": "Iniciar Sessão",
  "passText": "Senha",
  "rememberText": "Lembrar-se de mim",
  "titleText": "Iniciar Sessão",
  "userText": "Id Usuário",
  "invalidUserText": "O nome de usuário ou senha estão inválidos.",
  "missingUserText": "O registro de usuário não foi encontrado.",
  "requestAbortedText": "A requisição foi abortada.",
  "logoText": "Infor CRM"
});

localize("crm.Views.MetricConfigure", {
  "titleText": "Configurar Métrica",
  "metricTitleText": "Cargo",
  "metricFilterText": "Filter",
  "metricText": "Métrica",
  "chartTypeText": "tipo de gráfico",
  "advancedText": "Opções Avançadas",
  "formatterText": "formatado",
  "aggregateText": "Agregado",
  "reportViewText": "id de visualização do gráfico"
});

localize("crm.Views.MetricFilterLookup", {
  "titleText": "Filtro/Métrica da Pesquisa"
});

localize("crm.Views.MetricWidget", {
  "loadingText": "Carregando...",
  "errorText": "Erro ao carregar o widget."
});

localize("crm.Views.NameEdit", {
  "titleText": "Editar Nome",
  "firstNameText": "Primeiro",
  "middleNameText": "segundo nome",
  "lastNameText": "Último",
  "prefixText": "Prefixo",
  "prefixTitleText": "Prefixo",
  "suffixText": "Sufixo",
  "suffixTitleText": "Sufixo do Nome"
});

localize("crm.Views.Opportunity.List", {
  "titleText": "Oportunidades",
  "activitiesText": "Atividades",
  "notesText": "Notas",
  "scheduleText": "Agendar",
  "editActionText": "Editar",
  "viewAccountActionText": "Conta",
  "viewContactsActionText": "Contatos",
  "viewProductsActionText": "Produtos",
  "addNoteActionText": "Adicionar Nota",
  "addActivityActionText": "Adicionar Atividade",
  "addAttachmentActionText": "Adicionar Anexo",
  "actualCloseText": "Fechada ",
  "estimatedCloseText": "Fechamento Estimado ",
  "quickEditActionText": "Edição Rápida"
});

localize("crm.Views.Opportunity.QuickEdit", {
  "estCloseText": "estimativa de fechamento",
  "detailsText": "Detalhes",
  "opportunityStageTitleText": "Etapa da Oportunidade",
  "opportunityText": "Oportunidade",
  "stageText": "Estágio",
  "statusOpenText": "Aberta",
  "statusClosedLostText": "Fechada - Perdida",
  "statusClosedWonText": "Fechada - Ganha",
  "salesProcessText": "etapa bloqueada pelo processo de vendas:",
  "probabilityText": "prob. de fechamento",
  "probabilityTitleText": "Probabilidade da Oportunidade",
  "potentialText": "Potencial de Vendas"
});

localize("crm.Views.OpportunityContact.Detail", {
  "titleText": "Contato da Oportunidade",
  "accountText": "Conta",
  "contactTitleText": "Cargo",
  "nameText": "Contato",
  "moreDetailsText": "Mais Detalhes",
  "salesRoleText": "Função",
  "strategyText": "Estratégia",
  "personalBenefitsText": "benefícios pessoais",
  "standingText": "Posicionamento",
  "issuesText": "Problemas",
  "competitorNameText": "concorrente principal",
  "removeContactTitleText": "Remover Contato",
  "confirmDeleteText": "Remover \"${0}\" da oportunidade?",
  "contactText": "Contato"
});

localize("crm.Views.OpportunityContact.Edit", {
  "titleText": "Editar Contato da Oport.",
  "nameText": "Nome",
  "accountNameText": "Conta",
  "contactTitleText": "Cargo",
  "salesRoleText": "Função",
  "salesRoleTitleText": "Função",
  "personalBenefitsText": "benefícios pessoais",
  "strategyText": "Estratégia",
  "issuesText": "Problemas",
  "standingText": "Posicionamento",
  "standingTitleText": "Posicionamento",
  "contactText": "Contato",
  "competitorPrefText": "concorrente principal"
});

localize("crm.Views.OpportunityContact.List", {
  "titleText": "Contatos da Oportunidade",
  "selectTitleText": "Selecionar Contato",
  "activitiesText": "Atividades",
  "notesText": "Notas",
  "scheduleText": "Agendar"
});

localize("crm.Views.OpportunityProduct.Detail", {
  "detailsText": "Detalhes",
  "opportunityText": "Oportunidade",
  "productText": "Produto",
  "productFamilyText": "Família do Produto",
  "priceLevelText": "Tipo de Preço",
  "priceText": "Preço",
  "basePriceText": "Preço Base",
  "discountText": "Desconto",
  "quantityText": "Quantidade",
  "baseExtendedPriceText": "Base",
  "extendedPriceText": "Preço Estendido",
  "extendedPriceSectionText": "Preço Estendido",
  "adjustedPriceSectionText": "Preço Ajustado",
  "baseAdjustedPriceText": "Base",
  "adjustedPriceText": "Preço Ajustado",
  "myAdjustedPriceText": "Usuário",
  "confirmDeleteText": "Remover ${0} dos produtos da oportunidade?",
  "removeOppProductTitleText": "remover produto da oportunidade"
});

localize("crm.Views.OpportunityProduct.Edit", {
  "titleText": "Produto da Oportunidade",
  "detailsText": "Detalhes",
  "opportunityText": "Oportunidade",
  "productText": "Produto",
  "productFamilyText": "Família do Produto",
  "priceLevelText": "Tipo de Preço",
  "priceText": "Preço",
  "basePriceText": "Preço Base",
  "discountText": "desconto %",
  "adjustedPriceText": "Preço Ajustado",
  "myAdjustedPriceText": "Usuário",
  "baseAdjustedPriceText": "Base",
  "quantityText": "Quantidade",
  "baseExtendedPriceText": "Base",
  "extendedPriceText": "Preço Estendido",
  "extendedPriceSectionText": "Preço Estendido",
  "adjustedPriceSectionText": "Preço Ajustado"
});

localize("crm.Views.OpportunityProduct.List", {
  "titleText": "Produtos"
});

localize("crm.Views.Owner.List", {
  "titleText": "Proprietários"
});

localize("crm.Views.Product.List", {
  "titleText": "Produtos"
});

localize("crm.Views.ProductProgram.List", {
  "titleText": "Programas Produto"
});

localize("crm.Views.Settings", {
  "clearLocalStorageTitleText": "Limpar Dados",
  "clearAuthenticationTitleText": "Limpar Credenciais Salvas",
  "errorLogTitleText": "Visualizar Logs de Erro",
  "localStorageClearedText": "Dados locais excluídos com sucesso.",
  "credentialsClearedText": "Credenciais salvas com sucesso.",
  "titleText": "Definições"
});

localize("crm.Views.SpeedSearchList", {
  "titleText": "SpeedSearch",
  "indexesText": {
    "Account": "Conta",
    "Activity": "Atividade",
    "Contact": "Contato",
    "History": "Histórico",
    "Lead": "Lead",
    "Opportunity": "Oportunidade",
    "Ticket": "Tíquete"
  }
});

localize("crm.Views.TextEdit", {
  "titleText": "Editar Texto"
});

localize("crm.Views.Ticket.Detail", {
  "accountText": "Conta",
  "areaText": "Área",
  "assignedDateText": "Atribuído na Data",
  "assignedToText": "Atribuído á",
  "completedByText": "Concluído Por",
  "categoryText": "Categoria",
  "contactText": "Contato",
  "contractText": "Contrato",
  "descriptionText": "Desc",
  "issueText": "Problema",
  "needByText": "Data Requerida",
  "notesText": "Comentários",
  "phoneText": "Telefone",
  "actionsText": "Ações Rápidas",
  "relatedAttachmentText": "Anexos",
  "relatedAttachmentTitleText": "Anexos de Tíquete",
  "relatedActivitiesText": "Atividades",
  "relatedItemsText": "Itens Relacionados",
  "resolutionText": "Resolução",
  "sourceText": "Origem",
  "statusText": "Status",
  "subjectText": "Assunto",
  "ticketIdText": "Número Tíquete",
  "titleText": "Tíquete",
  "urgencyText": "Urgência",
  "scheduleActivityText": "Agendar Atividade",
  "moreDetailsText": "Mais Detalhes",
  "relatedTicketActivitiesText": "Atividades do Tíquete",
  "loadingText": "Carregando..."
});

localize("crm.Views.Ticket.Edit", {
  "accountText": "conta",
  "areaText": "Área",
  "assignedDateText": "Atribuído na Data",
  "assignedToText": "Atribuído á",
  "categoryText": "Categoria",
  "contactText": "Contato",
  "contractText": "Contrato",
  "descriptionText": "Desc",
  "descriptionTitleText": "Descrição",
  "issueText": "Problema",
  "needByText": "Data Requerida",
  "notesText": "Comentários",
  "notesTitleText": "Comentários",
  "phoneText": "Telefone",
  "relatedActivitiesText": "Atividades",
  "relatedItemsText": "Itens Relacionados",
  "resolutionText": "Resolução",
  "resolutionTitleText": "Resolução",
  "sourceText": "Origem",
  "sourceTitleText": "Origem",
  "statusText": "Status",
  "subjectText": "Assunto",
  "ticketAreaTitleText": "Área do Tíquete",
  "ticketCategoryTitleText": "Categoria do Tíquete",
  "ticketIdText": "Número Tíquete",
  "ticketIssueTitleText": "Ocorrência do Tíquete",
  "ticketStatusTitleText": "Status do Tíquete",
  "ticketUrgencyTitleText": "Urgência do Tíquete",
  "titleText": "Tíquete",
  "urgencyText": "Urgência"
});

localize("crm.Views.Ticket.List", {
  "titleText": "Tíquetes",
  "activitiesText": "Atividades",
  "scheduleText": "Agendar",
  "notAssignedText": "Não atribuído",
  "editActionText": "Editar",
  "viewAccountActionText": "Conta",
  "viewContactActionText": "Contato",
  "addNoteActionText": "Adicionar Nota",
  "addActivityActionText": "Adicionar Atividade",
  "addAttachmentActionText": "Adicionar Anexo",
  "assignedToText": "Atribuído A: ",
  "urgencyText": "Urgência: ",
  "createdOnText": "Criado  ",
  "modifiedText": "Modificado ",
  "neededByText": "Requerido  "
});

localize("crm.Views.Ticket.UrgencyLookup", {
  "titleText": "Urgência do Tíquete"
});

localize("crm.Views.TicketActivity.Detail", {
  "titleText": "Atividade do Tíquete",
  "accountText": "Conta",
  "contactText": "Contato",
  "typeText": "Tipo",
  "publicAccessText": "Acesso Público",
  "assignedDateText": "Data Inicial",
  "completedDateText": "Data Final",
  "followUpText": "Follow Up",
  "unitsText": "Unidades de Tempo",
  "elapsedUnitsText": "Horas Decorridas",
  "rateTypeDescriptionText": "tipo de cobrança",
  "rateText": "Taxa",
  "totalLaborText": "Total Trabalho",
  "totalPartsText": "Total Partes",
  "totalFeeText": "Total Honorários",
  "activityDescriptionText": "Comentários",
  "ticketNumberText": "Número Tíquete",
  "userText": "Usuário",
  "completeTicketText": "Completar Atividades do Tíquete",
  "moreDetailsText": "Mais Detalhes",
  "relatedItemsText": "Itens Relacionados",
  "relatedTicketActivityItemText": "Peças da Atividade do Tíquete"
});

localize("crm.Views.TicketActivity.RateLookup", {
  "titleText": "Taxas"
});

localize("crm.Views.TicketActivityItem.Detail", {
  "titleText": "Peça da Atividade do Tíquete",
  "productNameText": "Produto",
  "skuText": "SKU",
  "serialNumberText": "Serial #",
  "itemAmountText": "Preço",
  "itemDescriptionText": "Descrição"
});

localize("crm.Views.TicketActivityItem.List", {
  "titleText": "Peças da Atividade do Tíquete"
});

localize("crm.Views.UpdateToolbar", {
  "updateText": "Uma atualização está disponível. Clique para recarregar."
});

localize("crm.Views.User.CalendarAccessList", {
  "titleText": "Recursos da Atividade"
});

localize("crm.Views.User.List", {
  "titleText": "Usuários"
});

localize("crm.Views._CardLayoutListMixin", {
  "itemIconAltText": "Contato",
  "allRecordsText": "pesquisa não aplicada"
});

localize("crm.Views._GroupListMixin", {
  "noDefaultGroupText": "Nenhum grupo padrão definido. Clique aqui para configurar os grupos.",
  "currentGroupNotFoundText": "O grupo atual não foi encontrado.",
  "groupTemplateSummaryText": "Sumário",
  "groupTemplateDetailText": "Detalhe",
  "groupsModeText": "Você está atualmente no modo de grupos. Realize uma pesquisa ou clique em um hashtag para sair do modo de grupos."
});

localize("crm.Views._RightDrawerListMixin", {
  "hashTagsSectionText": "Hash Tags",
  "groupsSectionText": "Grupos",
  "kpiSectionText": "KPI",
  "configureGroupsText": "Configurar",
  "refreshGroupsText": "Atualizar",
  "layoutsText": "Layouts"
});

localize("crm.Views._SpeedSearchRightDrawerListMixin", {
  "indexSectionText": "Índices"
});
});
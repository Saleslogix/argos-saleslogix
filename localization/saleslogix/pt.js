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
    "4": "Mai",
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
  "hoursText": "horas",
  "hourText": "hora",
  "minutesText": "minutos",
  "minuteText": "minuto",
  "bytesText": "bytes"
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
  "neverText": "Nunca",
  "daysText": "dias",
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
    "0": "dia",
    "1": "primeiro",
    "2": "segundo",
    "3": "terceiro",
    "4": "quarto",
    "5": "último"
  }
});

localize("crm.Views.Activity.Complete", {
  "completedFormatText": "D/M/YYYY h:mm A",
  "startingFormatText": "D/M/YYYY h:mm A",
  "startingTimelessFormatText": "D/M/YYYY",
  "activityInfoText": "Informação da Atividade",
  "accountText": "conta",
  "contactText": "contato",
  "opportunityText": "oportunidade",
  "ticketNumberText": "ticket",
  "companyText": "empresa",
  "leadText": "lead",
  "asScheduledText": "como agendado",
  "categoryText": "categoria",
  "categoryTitleText": "Categoria da Atividade",
  "completedText": "data de conclusão",
  "completionText": "Conclusão",
  "durationText": "duração",
  "durationInvalidText": "O campo '${2}' deve ter um valor.",
  "carryOverNotesText": "transportar notas",
  "followUpText": "acompanhamento",
  "followUpTitleText": "Tipo de acompanhamento",
  "leaderText": "responsável",
  "longNotesText": "notas",
  "longNotesTitleText": "Notas",
  "otherInfoText": "Outras Informações",
  "priorityText": "prioridade",
  "priorityTitleText": "Prioridade",
  "regardingText": "referência",
  "regardingTitleText": "Referência da Atividade",
  "resultText": "resultado",
  "resultTitleText": "Resultado",
  "startingText": "data de início",
  "timelessText": "horário indeterminado",
  "durationValueText": {
    "0": "nenhum",
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
  "locationText": "localização",
  "alarmText": "alarme",
  "alarmTimeText": "alarme",
  "categoryText": "categoria",
  "durationText": "duração",
  "leaderText": "responsável",
  "longNotesText": "notas",
  "priorityText": "prioridade",
  "regardingText": "referência",
  "rolloverText": "postergar automaticamente",
  "startTimeText": "horário de início",
  "allDayText": "dia inteiro",
  "timelessText": "horário indeterminado",
  "titleText": "Atividade",
  "typeText": "tipo",
  "companyText": "empresa",
  "leadText": "lead",
  "accountText": "conta",
  "contactText": "contato",
  "opportunityText": "oportunidade",
  "ticketNumberText": "ticket",
  "whenText": "Quando",
  "whoText": "Quem",
  "recurrenceText": "recorrência",
  "confirmEditRecurrenceText": "Editar todas as Ocorrências? Cancele para editar somente uma Ocorrência.",
  "relatedAttachmentText": "Anexos",
  "relatedAttachmentTitleText": "Anexos da Atividade",
  "relatedItemsText": "Itens Relacionados",
  "phoneText": "telefone",
  "moreDetailsText": "Mais Detalhes"
});

localize("crm.Views.Activity.Edit", {
  "startingFormatText": "D/M/YYYY h:mm A",
  "startingTimelessFormatText": "D/M/YYYY",
  "activityCategoryTitleText": "Categoria da Atividade",
  "activityDescriptionTitleText": "Descrição da Atividade",
  "locationText": "localização",
  "activityTypeTitleText": "Tipo de Atividade",
  "alarmText": "alarme",
  "reminderText": "Lembrete",
  "categoryText": "categoria",
  "durationText": "duração",
  "durationTitleText": "Duração",
  "durationInvalidText": "O campo '${2}' deve ter um valor.",
  "reminderInvalidText": "O campo 'lembrete' deve ter um valor.",
  "reminderTitleText": "Lembrete",
  "leaderText": "responsável",
  "longNotesText": "notas",
  "longNotesTitleText": "Notas",
  "priorityText": "prioridade",
  "priorityTitleText": "Prioridade",
  "regardingText": "referência",
  "rolloverText": "postergar automaticamente",
  "startingText": "horário de início",
  "repeatsText": "repetir",
  "recurringText": "recorrência",
  "recurringTitleText": "Recorrência",
  "timelessText": "horário indeterminado",
  "titleText": "Atividade",
  "typeText": "tipo",
  "accountText": "conta",
  "contactText": "contato",
  "opportunityText": "oportunidade",
  "ticketNumberText": "ticket",
  "companyText": "empresa",
  "leadText": "lead",
  "isLeadText": "para o lead",
  "yesText": "SIM",
  "noText": "NÃO",
  "phoneText": "telefone",
  "updateUserActErrorText": "Ocorreu um erro ao atualizar as atividades do usuário.",
  "reminderValueText": {
    "0": "nenhum",
    "5": "5 minutos",
    "15": "15 minutos",
    "30": "30 minutos",
    "60": "1 hora",
    "1440": "1 dia"
  },
  "durationValueText": {
    "0": "nenhum",
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
    "url": "url",
    "binary": "binário"
  }
});

localize("crm.Views.Attachment.ViewAttachment", {
  "attachmentDateFormatText": "ddd D/M/YYYY h:mm a",
  "detailsText": "Detalhes do Anexo",
  "descriptionText": "descrição",
  "fileNameText": "nome do arquivo",
  "attachDateText": "data do anexo",
  "fileSizeText": "tamanho do arquivo",
  "userText": "usuário",
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
  "monthTitleFormatText": "MMMM AAAA",
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
  "allDayText": "Dia Inteiro",
  "eventHeaderText": "Eventos",
  "eventMoreText": "Visualizar ${0} Mais Eventos(s)",
  "toggleCollapseText": "alternar recolher"
});

localize("crm.Views.ErrorLog.Detail", {
  "errorDateFormatText": "DD/MM/YYYY hh:mm A",
  "titleText": "Log de Erro",
  "detailsText": "Detalhes",
  "errorDateText": "data",
  "statusTextText": "erro",
  "urlText": "url",
  "moreDetailsText": "Mais Detalhes",
  "errorText": "erro",
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
  "startTimeText": "data de início",
  "endTimeText": "data de término",
  "titleText": "Evento",
  "descriptionText": "descrição",
  "typeText": "tipo",
  "whenText": "Quando"
});

localize("crm.Views.Event.Edit", {
  "startingFormatText": "D/M/YYYY h:mm A",
  "titleText": "Evento",
  "typeText": "tipo",
  "descriptionText": "descrição",
  "startDateText": "data de início",
  "endDateText": "data de término",
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
  "categoryText": "categoria",
  "completedText": "concluído",
  "durationText": "duração",
  "leaderText": "responsável",
  "longNotesText": "notas",
  "notesText": "Notas",
  "priorityText": "prioridade",
  "regardingText": "referência",
  "completedByText": "concluído por",
  "scheduledText": "agendado",
  "timelessText": "horário indeterminado",
  "companyText": "empresa",
  "leadText": "lead",
  "titleText": "Histórico",
  "accountText": "conta",
  "contactText": "contato",
  "opportunityText": "oportunidade",
  "ticketNumberText": "ticket",
  "moreDetailsText": "Mais Detalhes",
  "relatedItemsText": "Itens Relacionados",
  "relatedAttachmentText": "Anexos",
  "relatedAttachmentTitleText": "Anexos do Histórico",
  "modifiedText": "modificado",
  "typeText": "tipo",
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
  "accountText": "conta",
  "noteDescriptionTitleText": "Descrição da Nota",
  "contactText": "contato",
  "longNotesText": "notas",
  "longNotesTitleText": "Notas",
  "opportunityText": "oportunidade",
  "ticketNumberText": "ticket",
  "regardingText": "referência",
  "isLeadText": "para o lead",
  "startingText": "horário",
  "titleText": "Nota",
  "companyText": "empresa",
  "leadText": "lead",
  "relatedItemsText": "Itens Relacionados",
  "yesText": "SIM",
  "noText": "NÃO",
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
    "note": "nota",
    "phonecall": "chamada telefônica",
    "meeting": "reunião",
    "personal": "pessoal",
    "email": "e-mail"
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
  "fbarHomeTitleText": "início",
  "fbarScheduleTitleText": "agendar",
  "importSourceText": "origem do lead",
  "opportunityText": "oportunidade",
  "ownerText": "proprietário",
  "actionsText": "Ações Rápidas",
  "potentialText": "potencial de vendas",
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
  "resellerText": "revendedor",
  "statusText": "status",
  "titleText": "Oportunidade",
  "typeText": "tipo",
  "scheduleActivityText": "Agendar atividade",
  "addNoteText": "Adicionar nota",
  "moreDetailsText": "Mais Detalhes",
  "multiCurrencyText": "Multi Moedas",
  "multiCurrencyRateText": "taxa de câmbio",
  "multiCurrencyCodeText": "código",
  "multiCurrencyDateText": "data do câmbio",
  "multiCurrencyLockedText": "câmbio bloqueado"
});

localize("crm.Views.Opportunity.Edit", {
  "exchangeRateDateFormatText": "D/M/YYYY h:mm A",
  "accountText": "conta",
  "acctMgrText": "ger. conta",
  "estCloseText": "estimativa de fechamento",
  "importSourceText": "origem do lead",
  "detailsText": "Detalhes",
  "opportunityStatusTitleText": "Status da Oportunidade",
  "opportunityText": "oportunidade",
  "opportunityTypeTitleText": "Tipo da Oportunidade",
  "ownerText": "proprietário",
  "potentialText": "potencial de vendas",
  "probabilityText": "prob. de fechamento",
  "probabilityTitleText": "Probabilidade da Oportunidade",
  "resellerText": "revendedor",
  "statusText": "status",
  "titleText": "Oportunidade",
  "typeText": "tipo",
  "multiCurrencyText": "Multi Moedas",
  "multiCurrencyRateText": "taxa de câmbio",
  "multiCurrencyCodeText": "código",
  "multiCurrencyDateText": "data do câmbio",
  "multiCurrencyLockedText": "câmbio bloqueado",
  "subTypePickListResellerText": "REVENDEDOR"
});

localize("crm.Views.TicketActivity.Edit", {
  "startingFormatText": "D/M/YYYY h:mm A",
  "titleText": "Editar Atividade do Ticket",
  "activityTypeText": "tipo",
  "activityTypeTitleText": "Tipo",
  "publicAccessText": "acesso público",
  "publicAccessTitleText": "Acesso Público",
  "userText": "usuário",
  "startDateText": "data de início",
  "endDateText": "data de término",
  "commentsText": "comentários"
});

localize("crm.Views.TicketActivity.List", {
  "startDateFormatText": "DD/MM/YYYY h:mm A",
  "titleText": "Atividades do Ticket"
});

localize("argos.ErrorManager", {
  "abortedText": "Abortado",
  "scopeSaveText": "O escopo não foi salvo no relatório de erro"
});

localize("argos.Fields.DurationField", {
  "emptyText": "",
  "invalidDurationErrorText": "O Campo '${0}' não é uma duração válida.",
  "autoCompleteText": {
    "1": "minuto(s)",
    "60": "hora(s)",
    "1440": "dia(s)",
    "10080": "semana(s)",
    "525960": "ano(s)"
  }
});

localize("argos.Fields.EditorField", {
  "lookupLabelText": "editar",
  "lookupText": "...",
  "emptyText": "vazio",
  "completeText": "Ok"
});

localize("argos.Fields.LookupField", {
  "dependentErrorText": "Um valor para '${0}' deve ser selecionado.",
  "emptyText": "",
  "completeText": "Selecionar",
  "lookupLabelText": "pesquisa",
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
  "lastWeekText": "Última semana",
  "lastMonthText": "Último mês",
  "pastYearText": "Ano(s) anterior(es)",
  "nextYearText": "Próximo ano",
  "nextMonthText": "Próximo mês",
  "nextWeekText": "Próxima semana",
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
  "refreshViewText": "atualizar",
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
  "descriptionText": "descrição",
  "bytesText": "bytes",
  "notSupportedText": "A inclusão de anexos não é suportado pelo seu dispositivo."
});

localize("argos.Views.Signature", {
  "titleText": "Assinatura",
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
  "loadingText": "carregando...",
  "notAvailableText": "O dado solicitado não está disponível.",
  "toggleCollapseText": "alternar recolher"
});

localize("argos._EditBase", {
  "saveText": "Salvar",
  "titleText": "Editar",
  "validationSummaryText": "Resumo de Validação",
  "concurrencySummaryText": "Simultaneidade de Erro(s)",
  "detailsText": "Detalhes",
  "loadingText": "carregando...",
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
  "loadingText": "carregando..."
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
    "total": "Total de Tickets",
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
  "lookupLabelText": "editar",
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
  "unknownSizeText": "desconhecido",
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
  "accountText": "conta",
  "acctMgrText": "ger. conta",
  "addressText": "endereço",
  "businessDescriptionText": "descr. do negócio",
  "createDateText": "data de criação",
  "createUserText": "usuário de criação",
  "faxText": "fax",
  "importSourceText": "origem do lead",
  "industryText": "indústria",
  "notesText": "notas",
  "ownerText": "proprietário",
  "phoneText": "telefone",
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
  "relatedTicketsText": "Tickets",
  "relatedAddressesText": "Endereços",
  "relatedAttachmentText": "Anexos",
  "relatedAttachmentTitleText": "Anexos da Conta",
  "statusText": "status",
  "subTypeText": "subtipo",
  "titleText": "Conta",
  "typeText": "tipo",
  "webText": "web",
  "scheduleActivityText": "Agendar atividade",
  "addNoteText": "Adicionar nota",
  "moreDetailsText": "Mais Detalhes",
  "calledText": "Chamado ${0}"
});

localize("crm.Views.Account.Edit", {
  "accountStatusTitleText": "Status da Conta",
  "accountSubTypeTitleText": "Subtipo da Conta",
  "accountText": "conta",
  "accountTypeTitleText": "Tipo de Conta",
  "acctMgrText": "ger. conta",
  "businessDescriptionText": "descr. do negócio",
  "businessDescriptionTitleText": "Descrição do Negócio",
  "descriptionText": "descr.",
  "faxText": "fax",
  "fullAddressText": "endereço",
  "importSourceText": "origem do lead",
  "industryText": "indústria",
  "industryTitleText": "Indústria",
  "ownerText": "proprietário",
  "phoneText": "telefone",
  "statusText": "status",
  "subTypeText": "subtipo",
  "titleText": "Conta",
  "typeText": "tipo",
  "webText": "web"
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
  "overdueText": "vencido",
  "alarmText": "alarme",
  "touchedText": "alterado",
  "importantText": "importante",
  "recurringText": "recorrência",
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
    "alarm": "alarme",
    "recurring": "recorrência",
    "timeless": "horário indeterminado",
    "today": "hoje",
    "this-week": "esta-semana",
    "yesterday": "ontem"
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
    "alarm": "alarme",
    "status-unconfirmed": "status-não-confirmado",
    "status-accepted": "status-aceito",
    "status-declined": "status-declinado",
    "recurring": "recorrência",
    "timeless": "horário indeterminado",
    "today": "hoje",
    "this-week": "esta-semana",
    "yesterday": "ontem"
  }
});

localize("crm.Views.Activity.Recurring", {
  "startingText": "data de início",
  "endingText": "data de término",
  "repeatsText": "repetir",
  "everyText": "cada",
  "afterCompletionText": "após concluída",
  "singleWeekdayText": "dia útil",
  "weekdaysText": "dia(s) útil(eis)",
  "dayText": "dia",
  "monthText": "mês",
  "onText": "em",
  "occurrencesText": "ocorrências",
  "summaryText": "sumário",
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
    "0": "dias",
    "1": "semanas",
    "2": "meses",
    "3": "anos"
  },
  "recurringFrequencyText": "Frequência da Recorrência",
  "yesText": "Sim",
  "noText": "Não",
  "titleText": "Recorrência"
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
  "accountNameText": "conta",
  "accountStatusTitleText": "Status da Conta",
  "accountSubTypeTitleText": "Subtipo da Conta",
  "accountText": "Conta",
  "accountTypeTitleText": "Tipo de Conta",
  "acctMgrText": "ger. conta",
  "addressText": "endereço",
  "contactTitleText": "Cargo",
  "descriptionText": "descrição",
  "detailsAccountText": "Informações da Conta",
  "detailsContactText": "Informações do Contato",
  "detailsText": "Informações do Contato / Conta",
  "emailText": "e-mail",
  "faxText": "fax",
  "homePhoneText": "telefone residencial",
  "industryText": "indústria",
  "ownerText": "proprietário",
  "lastNameText": "sobrenome",
  "mobileText": "celular",
  "nameText": "nome",
  "statusText": "status",
  "subTypeText": "subtipo",
  "titleText": "Adicionar Conta / Contato",
  "typeText": "tipo",
  "webText": "web",
  "phoneText": "telefone",
  "workText": "telefone comercial",
  "industryTitleText": "Indústria"
});

localize("crm.Views.Address.Edit", {
  "address1Text": "endereço 1",
  "address2Text": "endereço 2",
  "address3Text": "endereço 3",
  "cityText": "cidade",
  "cityTitleText": "Cidade",
  "countryText": "país",
  "countryTitleText": "País",
  "descriptionText": "descrição",
  "descriptionTitleText": "Descrição",
  "isMailingText": "envio",
  "isPrimaryText": "principal",
  "postalCodeText": "CEP",
  "salutationText": "atenção",
  "stateText": "estado",
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
  "loadingText": "carregando..."
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
  "accountText": "conta",
  "acctMgrText": "ger. conta",
  "addressText": "endereço",
  "contactTitleText": "cargo",
  "createDateText": "data de criação",
  "createUserText": "usuário de criação",
  "emailText": "e-mail",
  "faxText": "fax",
  "homeText": "telefone residencial",
  "nameText": "contato",
  "ownerText": "proprietário",
  "actionsText": "Ações Rápidas",
  "relatedAccountsText": "Contas",
  "relatedActivitiesText": "Atividades",
  "relatedHistoriesText": "Notas/Histórico",
  "relatedItemsText": "Itens Relacionados",
  "relatedNotesText": "Notas",
  "relatedOpportunitiesText": "Oportunidades",
  "relatedTicketsText": "Tickets",
  "relatedAddressesText": "Endereços",
  "relatedAttachmentText": "Anexos",
  "relatedAttachmentTitleText": "Anexos do Contato",
  "titleText": "Contato",
  "webText": "web",
  "workText": "telefone comercial",
  "cuisinePreferenceText": "culinária",
  "callMobileNumberText": "Ligar para o celular",
  "callWorkNumberText": "Ligar para o Comercial",
  "calledText": "Chamado",
  "scheduleActivityText": "Agendar atividade",
  "addNoteText": "Adicionar nota",
  "sendEmailText": "Enviar e-mail",
  "viewAddressText": "Visualizar Endereços",
  "moreDetailsText": "Mais Detalhes"
});

localize("crm.Views.Contact.Edit", {
  "titleText": "Contato",
  "nameText": "nome",
  "workText": "telefone comercial",
  "mobileText": "telefone celular",
  "emailText": "e-mail",
  "webText": "web",
  "acctMgrText": "ger. conta",
  "accountNameText": "conta",
  "homePhoneText": "telefone residencial",
  "faxText": "fax",
  "addressText": "endereço",
  "contactTitleText": "cargo",
  "titleTitleText": "Cargo",
  "addressTitleText": "Endereço",
  "ownerText": "proprietário",
  "cuisinePreferenceText": "culinária",
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
  "callMobileActionText": "Ligar para o Celular",
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
  "accountText": "empresa",
  "addressText": "endereço",
  "businessDescriptionText": "descr. do negócio",
  "createDateText": "data de criação",
  "createUserText": "usuário de criação",
  "eMailText": "e-mail",
  "leadSourceText": "origem do lead",
  "industryText": "indústria",
  "interestsText": "interesses",
  "leadTitleText": "cargo",
  "nameText": "nome",
  "notesText": "comentários",
  "ownerText": "proprietário",
  "relatedActivitiesText": "Atividades",
  "relatedHistoriesText": "Notas/Histórico",
  "relatedItemsText": "Itens Relacionados",
  "relatedNotesText": "Notas",
  "relatedAttachmentText": "Anexos",
  "relatedAttachmentTitleText": "Anexos do Lead",
  "sicCodeText": "código sic",
  "titleText": "Lead",
  "tollFreeText": "telefone gratuito",
  "mobileText": "telefone celular",
  "webText": "web",
  "workText": "telefone comercial",
  "actionsText": "Ações Rápidas",
  "callWorkNumberText": "Ligar para o número principal",
  "scheduleActivityText": "Agendar atividade",
  "addNoteText": "Adicionar nota",
  "sendEmailText": "Enviar e-mail",
  "viewAddressText": "Visualizar Endereços",
  "moreDetailsText": "Mais Detalhes",
  "calledText": "Chamado ${0}",
  "emailedText": "Enviado por e-mail ${0}"
});

localize("crm.Views.Lead.Edit", {
  "accountText": "conta",
  "addressText": "endereço",
  "businessText": "descr. do negócio",
  "businessTitleText": "Descrição do Negócio",
  "companyText": "empresa",
  "contactTitleText": "cargo",
  "emailText": "e-mail",
  "faxText": "fax",
  "importSourceText": "origem do lead",
  "industryText": "indústria",
  "industryTitleText": "Indústria",
  "interestsText": "interesses",
  "leadNameLastFirstText": "nome",
  "leadOwnerText": "proprietário",
  "nameText": "nome",
  "notesText": "comentários",
  "notesTitleText": "Comentários",
  "sicCodeText": "código sic",
  "titleText": "Lead",
  "titleTitleText": "Cargo",
  "tollFreeText": "telefone gratuito",
  "webText": "web",
  "workText": "telefone comercial",
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
  "callMobileActionText": "Ligar para o Celular",
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
  "userText": "ID de Usuário",
  "invalidUserText": "O nome de usuário ou senha estão inválidos.",
  "missingUserText": "O registro de usuário não foi encontrado.",
  "requestAbortedText": "A requisição foi abortada.",
  "logoText": "Infor CRM"
});

localize("crm.Views.MetricConfigure", {
  "titleText": "Configurar Métrica",
  "metricTitleText": "cargo",
  "metricFilterText": "filtro",
  "metricText": "métrica",
  "chartTypeText": "tipo de gráfico",
  "advancedText": "opções avançadas",
  "formatterText": "formatado",
  "aggregateText": "agregado",
  "reportViewText": "id de visualização do gráfico"
});

localize("crm.Views.MetricFilterLookup", {
  "titleText": "Filtro/Métrica da Pesquisa"
});

localize("crm.Views.MetricWidget", {
  "loadingText": "carregando...",
  "errorText": "Erro ao carregar o widget."
});

localize("crm.Views.NameEdit", {
  "titleText": "Editar Nome",
  "firstNameText": "primeiro nome",
  "middleNameText": "segundo nome",
  "lastNameText": "sobrenome",
  "prefixText": "prefixo",
  "prefixTitleText": "Prefixo",
  "suffixText": "sufixo",
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
  "estimatedCloseText": "Estimativa de fechamento ",
  "quickEditActionText": "Edição Rápida"
});

localize("crm.Views.Opportunity.QuickEdit", {
  "estCloseText": "estimativa de fechamento",
  "detailsText": "Detalhes",
  "opportunityStageTitleText": "Etapa da Oportunidade",
  "opportunityText": "oportunidade",
  "stageText": "estágio",
  "statusOpenText": "Aberta",
  "statusClosedLostText": "Fechada - Perdida",
  "statusClosedWonText": "Fechada - Ganha",
  "salesProcessText": "etapa bloqueada pelo processo de vendas:",
  "probabilityText": "prob. de fechamento",
  "probabilityTitleText": "Probabilidade da Oportunidade",
  "potentialText": "potencial de vendas"
});

localize("crm.Views.OpportunityContact.Detail", {
  "titleText": "Contato da Oportunidade",
  "accountText": "conta",
  "contactTitleText": "cargo",
  "nameText": "contato",
  "moreDetailsText": "Mais Detalhes",
  "salesRoleText": "função",
  "strategyText": "estratégia",
  "personalBenefitsText": "benefícios pessoais",
  "standingText": "posicionamento",
  "issuesText": "ocorrências",
  "competitorNameText": "concorrente principal",
  "removeContactTitleText": "Remover Contato",
  "confirmDeleteText": "Remover \"${0}\" da oportunidade?",
  "contactText": "Contato"
});

localize("crm.Views.OpportunityContact.Edit", {
  "titleText": "Editar Contato da Oport.",
  "nameText": "nome",
  "accountNameText": "conta",
  "contactTitleText": "cargo",
  "salesRoleText": "função",
  "salesRoleTitleText": "Função",
  "personalBenefitsText": "benefícios pessoais",
  "strategyText": "estratégia",
  "issuesText": "ocorrências",
  "standingText": "posicionamento",
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
  "opportunityText": "oportunidade",
  "productText": "produto",
  "productFamilyText": "família do produto",
  "priceLevelText": "nível de preço",
  "priceText": "preço",
  "basePriceText": "preço base",
  "discountText": "desconto",
  "quantityText": "quantidade",
  "baseExtendedPriceText": "base",
  "extendedPriceText": "preço estendido",
  "extendedPriceSectionText": "Preço Estendido",
  "adjustedPriceSectionText": "Preço Ajustado",
  "baseAdjustedPriceText": "base",
  "adjustedPriceText": "preço ajustado",
  "myAdjustedPriceText": "usuário",
  "confirmDeleteText": "Remover ${0} dos produtos da oportunidade?",
  "removeOppProductTitleText": "remover produto da oportunidade"
});

localize("crm.Views.OpportunityProduct.Edit", {
  "titleText": "Produto da Oportunidade",
  "detailsText": "Detalhes",
  "opportunityText": "oportunidade",
  "productText": "produto",
  "productFamilyText": "família do produto",
  "priceLevelText": "nível de preço",
  "priceText": "preço",
  "basePriceText": "preço base",
  "discountText": "desconto %",
  "adjustedPriceText": "preço ajustado",
  "myAdjustedPriceText": "usuário",
  "baseAdjustedPriceText": "base",
  "quantityText": "quantidade",
  "baseExtendedPriceText": "base",
  "extendedPriceText": "preço estendido",
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
    "Ticket": "Ticket"
  }
});

localize("crm.Views.TextEdit", {
  "titleText": "Editar Texto"
});

localize("crm.Views.Ticket.Detail", {
  "accountText": "conta",
  "areaText": "área",
  "assignedDateText": "data de atribuição",
  "assignedToText": "atribuído a",
  "completedByText": "concluído por",
  "categoryText": "categoria",
  "contactText": "contato",
  "contractText": "contrato",
  "descriptionText": "descr.",
  "issueText": "ocorrência",
  "needByText": "data requerida",
  "notesText": "comentários",
  "phoneText": "telefone",
  "actionsText": "Ações Rápidas",
  "relatedAttachmentText": "Anexos",
  "relatedAttachmentTitleText": "Anexos de Ticket",
  "relatedActivitiesText": "Atividades",
  "relatedItemsText": "Itens Relacionados",
  "resolutionText": "resolução",
  "sourceText": "origem",
  "statusText": "status",
  "subjectText": "assunto",
  "ticketIdText": "número do ticket",
  "titleText": "Ticket",
  "urgencyText": "urgência",
  "scheduleActivityText": "Agendar atividade",
  "moreDetailsText": "Mais Detalhes",
  "relatedTicketActivitiesText": "Atividades do Ticket",
  "loadingText": "carregando..."
});

localize("crm.Views.Ticket.Edit", {
  "accountText": "conta",
  "areaText": "área",
  "assignedDateText": "data de atribuição",
  "assignedToText": "atribuído a",
  "categoryText": "categoria",
  "contactText": "contato",
  "contractText": "contrato",
  "descriptionText": "descr.",
  "descriptionTitleText": "Descrição",
  "issueText": "ocorrência",
  "needByText": "data requerida",
  "notesText": "comentários",
  "notesTitleText": "Comentários",
  "phoneText": "telefone",
  "relatedActivitiesText": "Atividades",
  "relatedItemsText": "Itens Relacionados",
  "resolutionText": "resolução",
  "resolutionTitleText": "Resolução",
  "sourceText": "origem",
  "sourceTitleText": "Origem",
  "statusText": "status",
  "subjectText": "assunto",
  "ticketAreaTitleText": "Área do Ticket",
  "ticketCategoryTitleText": "Categoria do Ticket",
  "ticketIdText": "número do ticket",
  "ticketIssueTitleText": "Ocorrência do Ticket",
  "ticketStatusTitleText": "Status do Ticket",
  "ticketUrgencyTitleText": "Urgência do Ticket",
  "titleText": "Ticket",
  "urgencyText": "urgência"
});

localize("crm.Views.Ticket.List", {
  "titleText": "Tickets",
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
  "titleText": "Urgência do Ticket"
});

localize("crm.Views.TicketActivity.Detail", {
  "titleText": "Atividade do Ticket",
  "accountText": "conta",
  "contactText": "contato",
  "typeText": "tipo",
  "publicAccessText": "acesso público",
  "assignedDateText": "data de início",
  "completedDateText": "data de término",
  "followUpText": "acompanhamento",
  "unitsText": "unidades de tempo",
  "elapsedUnitsText": "horas decorridas",
  "rateTypeDescriptionText": "tipo de cobrança",
  "rateText": "câmbio",
  "totalLaborText": "total de mão-de-obra",
  "totalPartsText": "total de peças",
  "totalFeeText": "total de taxas",
  "activityDescriptionText": "comentários",
  "ticketNumberText": "número do ticket",
  "userText": "usuário",
  "completeTicketText": "Completar Atividades do Ticket",
  "moreDetailsText": "Mais Detalhes",
  "relatedItemsText": "Itens Relacionados",
  "relatedTicketActivityItemText": "Peças da Atividade do Ticket"
});

localize("crm.Views.TicketActivity.RateLookup", {
  "titleText": "Taxas"
});

localize("crm.Views.TicketActivityItem.Detail", {
  "titleText": "Peça da Atividade do Ticket",
  "productNameText": "produto",
  "skuText": "SKU",
  "serialNumberText": "nº de série",
  "itemAmountText": "preço",
  "itemDescriptionText": "descrição"
});

localize("crm.Views.TicketActivityItem.List", {
  "titleText": "Peças da Atividade do Ticket"
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
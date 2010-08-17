/// <reference path="../../../../ext/ext-core-debug.js"/>
/// <reference path="../../../../Simplate.js"/>
/// <reference path="../../../../sdata/SDataSingleResourceRequest.js"/>
/// <reference path="../../../../sdata/SDataService.js"/>
/// <reference path="../../../../platform/View.js"/>
/// <reference path="../../../../platform/Detail.js"/>
/// <reference path="../../Format.js"/>
/// <reference path="../../Template.js"/>

Ext.namespace("Mobile.SalesLogix.Defect");

Mobile.SalesLogix.Defect.Detail = Ext.extend(Sage.Platform.Mobile.Detail, {
    titleText: 'Defect',
    moreText:'more &gt;&gt;',
    defectIdText: 'defect id',
    priorityText: 'priority',
    severityText: 'severity',
    areaText: 'area',
    categoryText: 'category',
    subjectText: 'subject',
    reportDateText: 'report date',
    assignedText: 'assigned',
    statusText: 'status',
    createUserText: 'create user',
    createDateText: 'create date',
    relatedItemsText: 'Related Items',
    relatedDefectProblemsText: 'Problem',
    relatedItemsText: 'Related Items',
    relatedDefectSolutionsText: 'Solution',

    textBlockTemplate: new Simplate([
        '<div class="row defect-text-row">',
        '<div class="defect-text-wrap">',
        '<a href="#{%= $["view"] %}" target="_related" m:context={%= $["context"] %}>{%= $["value"] %}</a>',
        '</div>',
        '<div class="defect-text-more">{%= this.moreText %}</div>',
        '</div>'
    ]),
    constructor: function(o) {
        Mobile.SalesLogix.Defect.Detail.superclass.constructor.call(this);

        Ext.apply(this, o, {
            id: 'defect_detail',
            title: this.titleText,
            editor: 'defect_edit',
            resourceKind: 'defects'
        });

        this.layout = [
            {label: this.defectIdText, tpl: Mobile.SalesLogix.Template.alternateKeyPrefixSuffix},
            {name: 'PriorityCode', label: this.priorityText},
            {name: 'SeverityCode', label: this.severityText},
            {name: 'Area', label: this.areaText},
            {name: 'Category', label: this.categoryText},
            {name: 'Subject', label: this.subjectText},
            {name: 'RecordedDate', label: this.reportDateText, renderer: Mobile.SalesLogix.Format.date},
            {name: 'AssignedTo.OwnerDescription', label: this.assignedText},
            {name: 'StatusCode', label: this.statusText},
            {name: 'CreateUser', label: this.createUserText},
            {name: 'CreateDate', label: this.createDateText, renderer: Mobile.SalesLogix.Format.date},
            {options: {title: this.relatedDefectProblemsText}, as: [
                {
                    name: 'DefectProblem.Notes',
                    label: this.relatedDefectProblemsText,
                    wrap: this.textBlockTemplate,
                    view: 'defectproblem_detail', key: 'DefectProblem.$key'
                }
            ]},
            {options: {title: this.relatedDefectSolutionsText}, as: [
                {
                    name: 'DefectSolution.Notes',
                    label: this.relatedDefectSolutionsText,
                    wrap: this.textBlockTemplate,
                    view: 'defectsolution_detail', key: 'DefectSolution.$key'

                }
            ]},
//            {options: {title: 'Related Items', list: true}, as: [
//                {
//                    view: 'defectproblem_related',
//                    where: this.formatRelatedQuery.createDelegate(this, ['CreateUser eq "{0}"'], true),
//                    label: 'Problem',
//                    icon: 'content/images/defect_detail_24x24.gif'
//                }
//            ]}
        ];
    },
    init: function() {
        Mobile.SalesLogix.Defect.Detail.superclass.init.call(this);

        App.on('resize', this.onResize, this);
    },
    onResize: function() {
        this.el.select('.defect-text-row').each(function(el) {
            if (el.child('.defect-text-wrap').getHeight(true) < el.child('.defect-text-wrap a').getHeight())
                el.child('.defect-text-more').show();
            else
                el.child('.defect-text-more').hide();
        });
    },
    createRequest: function() {
        var request = Mobile.SalesLogix.Defect.Detail.superclass.createRequest.call(this);

        request
            .setQueryArgs({
                'include': 'AssignedTo,DefectProblem,DefectSolution',
                'select': [
                    'AlternateKeyPrefix',
                    'AlternateKeySuffix',
                    'PriorityCode',
                    'SeverityCode',
                    'Area',
                    'Category',
                    'Subject',
                    'RecordedDate',
                    'AssignedTo/OwnerDescription',
                    'DefectProblem/Notes',
                    'DefectSolution/Notes',
                    'StatusCode',
                    'CreateUser',
                    'CreateDate'
                  ].join(',')
            });

        return request;
    },
    processEntry: function(entry) {
        Mobile.SalesLogix.Defect.Detail.superclass.processEntry.call(this, entry);

        this.onResize();
    }
});

/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/Detail.js"/>

define('Mobile/SalesLogix/Views/Defect/Detail', ['Sage/Platform/Mobile/Detail'], function() {

    dojo.declare('Mobile.SalesLogix.Views.Defect.Detail', [Sage.Platform.Mobile.Detail], {
        //Templates
        textBlockTemplate: new Simplate([
            '<div class="row defect-text-row">',
            '<div class="defect-text-wrap">',
                '<a href="#{%= $["view"] %}" target="_related" data-context={%= $["context"] %}>',
                    '{%= $["value"] %}',
                '</a>',
            '</div>',
            '<div class="defect-text-more">',
                '<a href="#{%= $["view"] %}" target="_related" data-context={%= $["context"] %}>',
                    'more &gt;&gt;',
                '</a>',
            '</div>',
            '</div>'
        ]),

        //Localization
        areaText: 'area',
        assignedText: 'assigned',
        categoryText: 'category',
        createDateText: 'create date',
        createUserText: 'create user',
        defectIdText: 'defect id',
        fbarHomeTitleText: 'home',
        fbarNewTitleText: 'new',
        fbarScheduleTitleText: 'schedule',
        moreText:'more &gt;&gt;',
        priorityText: 'priority',
        relatedDefectProblemsText: 'Problem',
        relatedDefectSolutionsText: 'Solution',
        relatedItemsText: 'Related Items',
        reportDateText: 'report date',
        severityText: 'severity',
        statusText: 'status',
        subjectText: 'subject',
        titleText: 'Defect',

        //View Properties
        editView: 'defect_edit',
        id: 'defect_detail',
        security: 'Entities/Defect/View',
        querySelect: [
            'AlternateKeyPrefix',
            'AlternateKeySuffix',
            'Area',
            'AssignedTo/OwnerDescription',
            'Category',
            'CreateDate',
            'CreateUser',
            'DefectProblem/Notes',
            'DefectSolution/Notes',
            'PriorityCode',
            'RecordedDate',
            'SeverityCode',
            'StatusCode',
            'Subject'
        ],
        resourceKind: 'defects',

        createToolLayout: function(){
            return this.tools || (this.tools = {
                tbar: [
                    {
                        cls: '',
                        fn: function() {
                            App.navigateToActivityInsertView.call(App, {"id": this.id});
                        },
                        icon: 'content/images/icons/Scheduling_24x24.png',
                        name: 'schedule',
                        scope: this,
                        title: this.fbarScheduleTitleText
                    }
                ]
            });
        },
        createLayout: function() {
            return this.layout || (this.layout = [{
                label: this.defectIdText,
                tpl: Mobile.SalesLogix.Template.alternateKeyPrefixSuffix
            },
            {
                label: this.priorityText,
                name: 'PriorityCode',
                property: 'PriorityCode'
            },
            {
                label: this.severityText,
                name: 'SeverityCode',
                property: 'SeverityCode'
            },
            {
                label: this.areaText,
                name: 'Area',
                property: 'Area'
            },
            {
                label: this.categoryText,
                name: 'Category',
                property: 'Category'
            },
            {
                label: this.subjectText,
                name: 'Subject',
                property: 'Subject'
            },
            {
                label: this.reportDateText,
                name: 'RecordedDate',
                property: 'RecordedDate',
                renderer: Mobile.SalesLogix.Format.date
            },
            {
                label: this.assignedText,
                name: 'AssignedTo.OwnerDescription',
                property: 'AssignedTo.OwnerDescription'
            },
            {
                label: this.statusText,
                name: 'StatusCode',
                property: 'StatusCode'
            },
            {
                label: this.createUserText,
                name: 'CreateUser',
                property: 'CreateUser'
            },
            {
                label: this.createDateText,
                name: 'CreateDate',
                property: 'CreateDate',
                renderer: Mobile.SalesLogix.Format.date
            },
            {
                title: this.relatedDefectProblemsText,
                name: 'ProblemSection',
                children: [{
                    label: this.relatedDefectProblemsText,
                    name: 'DefectProblem.Notes',
                    property: 'DefectProblem.Notes',
                    key: 'DefectProblem.$key',
                    view: 'defectproblem_detail',
                    use: this.textBlockTemplate
                }]
            },
            {
                title: this.relatedDefectSolutionsText,
                name: 'SolutionSection',
                children: [{
                    label: this.relatedDefectSolutionsText,
                    name: 'DefectSolution.Notes',
                    property: 'DefectSolution.Notes',
                    key: 'DefectSolution.$key',
                    view: 'defectsolution_detail',
                    use: this.textBlockTemplate
                }]
            }]);
        }
    });
});
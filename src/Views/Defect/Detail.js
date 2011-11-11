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

        init: function() {
            Mobile.SalesLogix.Defect.Detail.superclass.init.call(this);

            App.on('resize', this.onResize, this);

            this.tools.fbar = [{
                cls: '',
                fn: function() {
                    App.navigateToActivityInsertView.call(App, {"id": this.id});
                },
                icon: 'content/images/icons/Scheduling_24x24.png',
                name: 'schedule',
                scope: this,
                title: this.fbarScheduleTitleText
            }];
        },
        onResize: function() {
            this.el.select('.defect-text-row').each(function(el) {
                if (el.child('.defect-text-wrap').getHeight(true) < el.child('.defect-text-wrap a').getHeight())
                    el.child('.defect-text-more').show();
                else
                    el.child('.defect-text-more').hide();
            });
        },
        createLayout: function() {
            return this.layout || (this.layout = [{
                label: this.defectIdText,
                tpl: Mobile.SalesLogix.Template.alternateKeyPrefixSuffix
            },
            {
                label: this.priorityText,
                property: 'PriorityCode'
            },
            {
                label: this.severityText,
                property: 'SeverityCode'
            },
            {
                label: this.areaText,
                property: 'Area'
            },
            {
                label: this.categoryText,
                property: 'Category'
            },
            {
                label: this.subjectText,
                property: 'Subject'
            },
            {
                label: this.reportDateText,
                property: 'RecordedDate',
                renderer: Mobile.SalesLogix.Format.date
            },
            {
                label: this.assignedText,
                property: 'AssignedTo.OwnerDescription'
            },
            {
                label: this.statusText,
                property: 'StatusCode'
            },
            {
                label: this.createUserText,
                property: 'CreateUser'
            },
            {
                label: this.createDateText,
                property: 'CreateDate',
                renderer: Mobile.SalesLogix.Format.date
            },
            {
                title: this.relatedDefectProblemsText,
                children: [{
                    label: this.relatedDefectProblemsText,
                    property: 'DefectProblem.Notes',
                    key: 'DefectProblem.$key',
                    view: 'defectproblem_detail',
                    wrap: this.textBlockTemplate
                }]
            },
            {
                title: this.relatedDefectSolutionsText,
                children: [{
                    label: this.relatedDefectSolutionsText,
                    property: 'DefectSolution.Notes',
                    key: 'DefectSolution.$key',
                    view: 'defectsolution_detail',
                    wrap: this.textBlockTemplate
                }]
            }]);
        },
        processEntry: function(entry) {
            Mobile.SalesLogix.Defect.Detail.superclass.processEntry.call(this, entry);

            this.onResize();
        }
    });
});
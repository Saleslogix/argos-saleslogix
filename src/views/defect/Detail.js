/// <reference path="../../../../../argos-sdk/libraries/ext/ext-core-debug.js"/>
/// <reference path="../../../../../argos-sdk/libraries/sdata/sdata-client-debug"/>
/// <reference path="../../../../../argos-sdk/libraries/Simplate.js"/>
/// <reference path="../../../../../argos-sdk/src/View.js"/>
/// <reference path="../../../../../argos-sdk/src/Detail.js"/>

Ext.namespace("Mobile.SalesLogix.Defect");

(function() {
    Mobile.SalesLogix.Defect.Detail = Ext.extend(Sage.Platform.Mobile.Detail, {
        textBlockTemplate: new Simplate([
            '<div class="row defect-text-row">',
            '<div class="defect-text-wrap">',
            '<a href="#{%= $["view"] %}" target="_related" data-context={%= $["context"] %}>{%= $["value"] %}</a>',
            '</div>',
            '<div class="defect-text-more">',
            '<a href="#{%= $["view"] %}" target="_related" data-context={%= $["context"] %}>more &gt;&gt;</a>',
            '</div>',
            '</div>'
        ]),
        id: 'defect_detail',
        editView: 'defect_edit',
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
        resourceKind: 'defects',
        queryInclude: [
            'AssignedTo',
            'DefectProblem',
            'DefectSolution'
        ],
        querySelect: [
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
        ],
        init: function() {
            Mobile.SalesLogix.Defect.Detail.superclass.init.call(this);

            App.on('resize', this.onResize, this);

            this.tools.fbar = [{
                name: 'home',
                title: 'home',
                cls: 'tool-note',
                icon: 'content/images/welcome_32x32.gif',
                fn: App.goHome,
                scope: this
            },{
                name: 'new',
                title: 'new',
                cls: 'tool-note',
                icon: 'content/images/Note_32x32.gif',
                fn: function(){
                  App.getView('defect_list').navigateToInsert.call({editor:'defect_edit'});
                },
                scope: this
            },{
                name: 'schedule',
                title: 'schedule',
                cls: 'tool-note',
                icon: 'content/images/Schdedule_To_Do_32x32.gif',
                fn: App.navigateToNewActivity,
                scope: this
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
            return this.layout || (this.layout = [
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
                ]}
            ]);
        },        
        processEntry: function(entry) {
            Mobile.SalesLogix.Defect.Detail.superclass.processEntry.call(this, entry);

            this.onResize();
        }
    });
})();
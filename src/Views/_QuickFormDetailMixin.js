/* 
 * See copyright file.
 */

/**
 * @class crm.Views._QuickFormDetailMixin
 *
 * Mixin for adding QuickForm widgets to detail views. 
 *
 * @since 3.3
 *
 *
 */
define('crm/Views/_QuickFormDetailMixin', [
    'dojo/_base/declare',
    'dojo/_base/array',
    'dojo/_base/lang',
    'dojo/aspect',
], function(
    declare,
    array,
    lang,
    aspect
   
) {
    return declare('crm.Views._QuickFormDetailMixin', null, {
       
        entityName: null,
        originalCreateLayout: null,
        enabledSections: {
            'QuickActionsSection':true,
            'DetailsSection': false,
            'MoreDetailsSection': false,
            'RelatedItemsSection':true
        },
        postMixInProperties: function () {
            if (App.enableQuickFormDetail) {
                this.originalCreateLayout = this.createLayout;
                this.createLayout = this.quickFormCreateLayout;
            }
        },
        quickFormCreateLayout: function () {
            var formLoaded, qfService, quickFormDetailSection, quickFormEditSection, currentLayout, newLayout = [];
            currentLayout = this.originalCreateLayout(arguments);

            formLoaded = false;
            qfService = App.serviceManager.get('quickFormService');
            if (qfService) {
                formLoaded = qfService.isFormLoaded(this.entityName + 'MobileDetail');
            }
            if (!formLoaded) {
                return currentLayout;
            }
            //add Quick Form related view widget
            quickFormDetailSection = {
                title: 'Detail',
                list: true,
                name: 'QuickFormDetailViews',
                children: [{
                    name: this.entityName + '_quickFormDetail',
                    relatedView: {
                        widgetType: 'quickFormDetail',
                        id: this.entityName + '_quickFormDetail'
                        //quickFormName:  this.entityName + 'MobileDetail'
                    }
                }]
            };
            quickFormEditSection = {
                title: 'Quick Edit',
                list: true,
                collapsed: true,
                name: 'QuickFormEditViews',
                children: [{
                    name: this.entityName + '_quickFormEdit',
                    relatedView: {
                        widgetType: 'quickFormEdit',
                        id: this.entityName + '_quickFormEdit'
                        //quickFormName:  this.entityName + 'MobileDetail'
                    }
                }]
            };
            this.layout.forEach(function (section) {
                if (this.enabledSections[section.name]) {
                    newLayout.push(section);
                    if (section.name === 'QuickActionsSection') {
                        newLayout.push(quickFormDetailSection);
                        newLayout.push(quickFormEditSection);
                    }
                }
            }.bind(this));
            this.layout = newLayout;
            return this.layout;
        }
       
    });
});


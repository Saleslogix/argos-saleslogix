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
            var detailLoaded,
                moreLoaded,
                editLoaded,
                qfService,
                quickFormDetailSection,
                quickFormEditSection,
                quickFormMoreSection,
                currentLayout,
                newLayout = [];
            currentLayout = this.originalCreateLayout(arguments);

            qfService = App.serviceManager.get('quickFormService');
            if (qfService) {
                detailLoaded = qfService.isFormLoaded(this.entityName + 'MobileDetail');
                moreLoaded = qfService.isFormLoaded(this.entityName + 'MobileDetailMore');
                editLoaded = qfService.isFormLoaded(this.entityName + 'MobileDetailEdit');
            }
            if (!detailLoaded) {
                return currentLayout;
            }
            //add Quick Form related view widget
            if (detailLoaded) {
                quickFormDetailSection = {
                    title: 'Detail',
                    list: true,
                    name: 'QuickFormDetailViews',
                    children: [{
                        name: this.entityName + '_quickFormDetail',
                        relatedView: {
                            widgetType: 'quickFormDetail',
                            id: this.entityName + '_quickFormDetail',
                            quickFormName: this.entityName + 'MobileDetail'
                        }
                    }]
                };
                if (!editLoaded) {
                    quickFormEditSection = {
                        title: 'Quick Edit',
                        list: true,
                        collapsed: true,
                        name: 'QuickFormEditViews',
                        children: [{
                            name: this.entityName + '_quickFormDetailQEdit',
                            relatedView: {
                                widgetType: 'quickFormEdit',
                                id: this.entityName + '_quickFormDetailQEdit',
                                quickFormName: this.entityName + 'MobileDetail'
                            }
                        }]
                    };
                }
            }
            if (moreLoaded) {
                quickFormMoreSection = {
                    title: 'More Detail',
                    list: true,
                    name: 'QuickFormMoreDetailViews',
                    children: [{
                        name: this.entityName + '_quickFormDetailMore',
                        relatedView: {
                            widgetType: 'quickFormDetail',
                            id: this.entityName + '_quickFormDetailMore',
                            showHeader: false,
                            quickFormName: this.entityName + 'MobileDetailMore'
                        }
                    }]
                };
                
            }
            if (editLoaded) {
                quickFormEditSection = {
                    title: 'Edit',
                    list: true,
                    name: 'QuickFormDetailEditViews',
                    children: [{
                        name: this.entityName + '_quickFormDetailEdit',
                        relatedView: {
                            widgetType: 'quickFormEdit',
                            id: this.entityName + '_quickFormDetailEdit',
                            quickFormName: this.entityName + 'MobileDetailEdit'

                        }
                    }]
                };
            }
            this.layout.forEach(function (section) {
                if (this.enabledSections[section.name]) {
                    newLayout.push(section);
                    if (section.name === 'QuickActionsSection') {
                        if (quickFormDetailSection) {newLayout.push(quickFormDetailSection); }
                        if (quickFormMoreSection) { newLayout.push(quickFormMoreSection); }
                        if (quickFormEditSection) { newLayout.push(quickFormEditSection); }
                    }
                }
            }.bind(this));
            this.layout = newLayout;
            return this.layout;
        }
       
    });
});


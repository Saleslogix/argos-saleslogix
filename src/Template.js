/// <reference path="../ext/ext-core-debug.js"/>
/// <reference path="../platform/Application.js"/>
/// <reference path="../sdata/SDataService.js"/>

Ext.namespace("Mobile.SalesLogix");

/// common frequently used templates
Mobile.SalesLogix.Template = (function() {
    return {
        nameLF: new Simplate([
            '{%= $.LastName %}, {%= $.FirstName %}'
        ]),        
        alternateKeyPrefixSuffix: new Simplate([
            '{%= $.AlternateKeyPrefix %}-{%= $.AlternateKeySuffix %}'
        ]),
        noteDetailPropertyOld: new Simplate([
            '{% var F = Sage.Platform.Mobile.Format; %}',
            '<div class="row note-text-row {%= $.cls %}" data-property="{%= $.name %}">',
                '<label>{%: $.label %}</label>',
                '<div class="note-text-property">',
                    '<div class="note-text-wrap">',
                        '{%= F.nl2br(F.encode($.value)) %}',
                    '</div>',
                '</div>',
            '</div>'
        ]),
        noteDetailProperty: new Simplate([
            '{% var F = Sage.Platform.Mobile.Format; %}',
            '<div class="row note-text-row {%= $.cls %}" data-property="{%= $.name %}">',
                '<label>{%: $.label %}</label>',
                '<pre>',
                '{%= F.encode($.value) %}',
                '</pre>',
            '</div>'
        ])
    };
})();
define('Mobile/SalesLogix/Template', [
    'dojo/_base/lang',
    'Argos/Format'
], function(
    lang,
    format
) {
    return lang.setObject('Mobile.SalesLogix.Template', {
        nameLF: new Simplate([
            '{% if ($) { %}',
                '{% if ($.LastName && $.FirstName) { %}',
                    '{%= $.LastName %}, {%= $.FirstName%}',
                '{% } else { %}',
                    '{%: $.LastName ? $.LastName : $.FirstName %}',
                '{% } %}',
            '{% } %}'
        ]),
        alternateKeyPrefixSuffix: new Simplate([
            '{%= $.AlternateKeyPrefix %}-{%= $.AlternateKeySuffix %}'
        ]),
        noteDetailPropertyOld: new Simplate([
            '{% var F = Argos.Format; %}',
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
            '{% var F = Argos.Format; %}',
            '<div class="row note-text-row {%= $.cls %}" data-property="{%= $.name %}">',
                '<label>{%: $.label %}</label>',
                '<pre>',
                '{%= F.encode($.value) %}',
                '</pre>',
            '</div>'
        ])
    });
});
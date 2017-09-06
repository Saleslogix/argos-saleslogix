import lang from 'dojo/_base/lang';
import 'argos/Format';

/**
 * @class crm.Template
 * @classdesc Helper class that contains re-usuable {@link Simplate} templates.
 * @requires argos.Format
 */
const __class = lang.setObject('crm.Template', /** @lends crm.Template */ {
  /**
   * @property {Simplate} nameLF
   * Template for lastname, firstname
   */
  nameLF: new Simplate([
    '{% if ($) { %}',
    '{% if ($.LastName && $.FirstName) { %}',
    '{%= $.LastName %}, {%= $.FirstName%}',
    '{% } else { %}',
    '{%: $.LastName ? $.LastName : $.FirstName %}',
    '{% } %}',
    '{% } %}',
  ]),

  /**
   * @property {Simplate} alternateKeyPrefixSuffix
   * Template for alternate key, takes a prefix and suffix
   */
  alternateKeyPrefixSuffix: new Simplate([
    '{%= $.AlternateKeyPrefix %}-{%= $.AlternateKeySuffix %}',
  ]),

  /**
   * @property {Simplate} noteDetailPropertyOld
   * Template for note details
   */
  noteDetailPropertyOld: new Simplate([
    '{% var F = argos.Format; %}', // TODO: Avoid global
    '<div class="row note-text-row {%= $.cls %}" data-property="{%= $.name %}">',
    '<label>{%: $.label %}</label>',
    '<div class="note-text-property">',
    '<div class="note-text-wrap">',
    '{%= F.nl2br(F.encode($.value)) %}',
    '</div>',
    '</div>',
    '</div>',
  ]),

  /**
   * @property {Simplate} noteDetailProperty
   * Template for note details
   */
  noteDetailProperty: new Simplate([
    '{% var F = argos.Format; %}', // TODO: Avoid global
    '<div class="row note-text-row {%= $.cls %}" data-property="{%= $.name %}">',
    '<label>{%: $.label %}</label>',
    '<pre>',
    '{%= F.encode($.value) %}',
    '</pre>',
    '</div>',
  ]),
});

lang.setObject('Mobile.SalesLogix.Template', __class);
export default __class;

/* eslint-disable */
define('spec/Fields/PicklistField.spec', [
  'Mobile/SalesLogix/Fields/PicklistField'
], function(PicklistField) {
  return describe('Mobile/SalesLogix/Fields/PicklistField', function() {
    it('default to text', function() {
      var field = new PicklistField();
      expect(field.keyProperty)
        .toEqual('text');
      expect(field.textProperty)
        .toEqual('text');
    });
  });
});

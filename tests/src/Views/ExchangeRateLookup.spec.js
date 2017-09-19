/* eslint-disable */
define('spec/Views/ExchangeRateLookup.spec', [
  'dojo/json',
  'dojo/store/Memory',
  'dojo/text!spec/feeds/feed.json',
  'Mobile/SalesLogix/Views/ExchangeRateLookup'
], function(
  json,
  MemoryStore,
  feed,
  ExchangeRateLookup
) {
  var data = json.parse(feed);

  describe('crm.Views.ExchangeRateLookup', function() {
    var _app = window.App;
    beforeEach(function() {
      window.App = {
        supportsTouch: function() {}
      };
    });

    afterEach(function() {
      window.App = _app;
    });

    it('should be true', function() {
      var createLookup = function() {
        var widget = new ExchangeRateLookup();
      }

      expect(createLookup).not.toThrow();
    });
  });
});

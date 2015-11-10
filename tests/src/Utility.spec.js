/* eslint-disable */
define('spec/Utility.spec', ['Mobile/SalesLogix/Utility'], function(Utility) {
  describe('Mobile/SalesLogix/Utility', function() {
    it('should get the correct file extension', function() {
      expect(Utility.getFileExtension('file1.txt'))
        .toBe('.txt');
      expect(Utility.getFileExtension('file1.jpeg'))
        .toBe('.jpeg');
    });
    it('should get the correct file extension when empty', function() {
      expect(Utility.getFileExtension(''))
        .toBe('.');
    });
    it('should get the correct file extension when contains multiple periods', function() {
      expect(Utility.getFileExtension('file1.bonus.jpeg'))
        .toBe('.jpeg');
    });
    it('should get the real activity id', function() {
      expect(Utility.getRealActivityId('ABCDEFGHIJKL;asdf'))
        .toBe('ABCDEFGHIJKL');
      expect(Utility.getRealActivityId('1234'))
        .toBe('1234');
      expect(Utility.getRealActivityId(''))
        .toBe('');
    });
    it('should get base64', function() {
      expect(Utility.base64ArrayBuffer([0, 0, 0, 0]))
        .toBe('AAAAAA==');
      expect(Utility.base64ArrayBuffer([0, 0, 0, 0, 0]))
        .toBe('AAAAAAA=');
      expect(Utility.base64ArrayBuffer([0, 0, 0, 0, 0, 0]))
        .toBe('AAAAAAAA');
    });
    it('should strip query args', function() {
      expect(Utility.stripQueryArgs(''))
        .toBe('');
      expect(Utility.stripQueryArgs('http://google.com?compact=true'))
        .toBe('http://google.com');
      expect(Utility.stripQueryArgs('https://google.com?foo=bar&something=something'))
        .toBe('https://google.com');
      expect(Utility.stripQueryArgs('google.com'))
        .toBe('google.com');
    });
  });
});

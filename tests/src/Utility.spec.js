/*
 * Copyright (c) 1997-2013, SalesLogix, NA., LLC. All rights reserved.
 */
define('spec/Utility.spec', ['Mobile/SalesLogix/Utility'],function(Utility) {
    describe('Mobile/SalesLogix/Utility', function() {
        it('should get the correct file extension', function() {
            expect(Utility.getFileExtension('file1.txt')).toBe('.txt');
            expect(Utility.getFileExtension('file1.jpeg')).toBe('.jpeg');
        });
        it('should get the correct file extension when empty', function() {
            expect(Utility.getFileExtension('')).toBe('.');
        });
        it('should get the correct file extension when contains multiple periods', function() {
            expect(Utility.getFileExtension('file1.bonus.jpeg')).toBe('.jpeg');
        });
        it('should get the real activity id', function() {
            expect(Utility.getRealActivityId('ABCDEFGHIJKL;asdf')).toBe('ABCDEFGHIJKL');
            expect(Utility.getRealActivityId('1234')).toBe('1234');
            expect(Utility.getRealActivityId('')).toBe('');
        });
        it('should get base64', function() {
            expect(Utility.base64ArrayBuffer([0,0,0,0])).toBe('AAAAAA==');
            expect(Utility.base64ArrayBuffer([0,0,0,0,0])).toBe('AAAAAAA=');
            expect(Utility.base64ArrayBuffer([0,0,0,0,0,0])).toBe('AAAAAAAA');
        });
    });
});


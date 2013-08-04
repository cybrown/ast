describe('Class Types', function () {
    'use strict';
    var Type = require('../../type');
    var Class = require('../../class');

    var a, b, c;
    var ta, tb, tc;

    beforeEach(function () {
        a = new Class('A');
        b = new Class('B');
            b.setParent(a);
        c = new Class('C');
            c.setParent(b);
        ta = new Type();
            ta.setInterface(a);
        tb = new Type();
            tb.setInterface(b);
        tc = new Type();
            tc.setInterface(c);
    });

    it('distanceTo (with int)', function () {
        expect(Type.int8.distanceTo(Type.int8)).toBe(0);
        expect(Type.int8.distanceTo(Type.byte8)).toBe(-1);
        expect(Type.int8.distanceTo(Type.byte8)).toBe(-1);
    });

    it('distanceTo (with class)', function () {
        expect(ta.distanceTo(ta)).toBe(0);
        expect(tb.distanceTo(ta)).toBe(1);
        expect(tc.distanceTo(ta)).toBe(2);
        expect(tc.distanceTo(tb)).toBe(1);
        expect(tb.distanceTo(tc)).toBe(-1);
    });
});

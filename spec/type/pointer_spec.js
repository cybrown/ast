describe('Primitive Types', function () {
    'use strict';
    var Type = require('../../type');

    var pointer1, pointer2, pointer3, ppointer1;

    beforeEach(function () {
        pointer1 = new Type(Type.int8);
        pointer2 = new Type(Type.int8);
        pointer3 = new Type(Type.int16);
        ppointer1 = new Type(new Type(Type.int8));
    });

    it('equals', function () {
        expect(pointer1.equals(pointer2)).toBe(true);
        expect(pointer2.equals(pointer1)).toBe(true);
        expect(pointer1.equals(pointer3)).toBe(false);
        expect(pointer2.equals(pointer3)).toBe(false);
        expect(ppointer1.equals(new Type(pointer1))).toBe(true);
    });

    it('getPointedType', function () {
        expect(ppointer1.getPointedType().equals(pointer1)).toBe(true);
    });

});

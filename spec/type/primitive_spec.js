describe('Primitive Types', function () {
    'use strict';
    var Type = require('../../type');
    var Class = require('../../class');

    var int8, int8_2, int16, int32, int64;
    var byte8, byte8_2, byte16, byte32, byte64;
    var float32, float64;

    beforeEach(function () {
        int8 = new Type();
        int8.setInt(8);
        int8_2 = new Type();
        int8_2.setInt(8);
        int16 = new Type();
        int16.setInt(16);
        int32 = new Type();
        int32.setInt(32);
        int64 = new Type();
        int64.setInt(64);

        byte8 = new Type('byte', 8);
        byte8_2 = new Type('byte', 8);
        byte16 = new Type('byte', 16);
        byte32 = new Type('byte', 32);
        byte64 = new Type('byte', 64);

        float32 = new Type();
        float32.setFloat(32);
        float64 = new Type();
        float64.setFloat(64);
    });

    it('int types', function () {
        expect(int8.equals(int8)).toBe(true);
        expect(int8.equals(int8_2)).toBe(true);
        expect(int8.equals(int16)).toBe(false);
        expect(int16.equals(int32)).toBe(false);
        expect(int32.equals(int64)).toBe(false);
    });

    it('predefined int types', function () {
        expect(int8.equals(Type.int8)).toBe(true);
        expect(int8.equals(Type.int16)).toBe(false);
        expect(int16.equals(Type.int32)).toBe(false);
        expect(int32.equals(Type.int64)).toBe(false);
    });

    it('byte types', function () {
        expect(byte8.equals(byte8)).toBe(true);
        expect(byte8.equals(byte8_2)).toBe(true);
        expect(byte8.equals(byte16)).toBe(false);
        expect(byte16.equals(byte32)).toBe(false);
        expect(byte32.equals(byte64)).toBe(false);
    });

    it('predefined byte types', function () {
        expect(byte8.equals(Type.byte8)).toBe(true);
        expect(byte8.equals(Type.byte16)).toBe(false);
        expect(byte16.equals(Type.byte32)).toBe(false);
        expect(byte32.equals(Type.byte64)).toBe(false);
    });

    it('byte and int types', function () {
        expect(byte8.equals(int8)).toBe(false);
        expect(byte16.equals(int16)).toBe(false);
        expect(byte32.equals(int32)).toBe(false);
        expect(byte64.equals(int64)).toBe(false);
    });

    it('float types', function () {
        expect(float32.equals(float32)).toBe(true);
        expect(float64.equals(float64)).toBe(true);
        expect(float64.equals(float32)).toBe(false);
        expect(float32.equals(float64)).toBe(false);
    });

    it('predefined float types', function () {
        expect(float32.equals(Type.float32)).toBe(true);
        expect(float64.equals(Type.float64)).toBe(true);
    });

});

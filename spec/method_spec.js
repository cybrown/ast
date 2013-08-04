describe('Method', function () {
    'use strict';
    var Type = require('../type');
    var Method = require('../method');
    var Class = require('../class');

    var close, clone, addi8, addi16, addi8opt, addta, addtbtc;
    var a, b, c;
    var ta, tb, tc;

    beforeEach(function () {
        close = new Method('close');
            close.setReturnType(Type.int8);
        clone = new Method('clone');
            clone.setReturnType(Type.int16);
        addi8 = new Method('add');
            addi8.setReturnType(Type.int8);
            addi8.addArgument(Type.int8);
            addi8.addArgument(Type.int8);
        addi8opt = new Method('add');
            addi8opt.setReturnType(Type.int8);
            addi8opt.addArgument(Type.int8);
            addi8opt.addArgument(Type.int8);
            addi8opt.addArgument(Type.int8, '', true);
        addi16 = new Method('add');
            addi16.setReturnType(Type.int16);
            addi16.addArgument(Type.int16);
            addi16.addArgument(Type.int16);
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
        addta = new Method('add');
            addta.setReturnType(Type.int8);
            addta.addArgument(ta);
            addta.addArgument(ta);
        addtbtc = new Method('add');
            addtbtc.setReturnType(Type.int8);
            addtbtc.addArgument(tb);
            addtbtc.addArgument(tc);
    });

    it('returnType', function () {
        expect(close.returnType.equals(Type.int8)).toBe(true);
        expect(clone.returnType.equals(Type.int8)).toBe(false);
        expect(clone.returnType.equals(Type.int16)).toBe(true);
    });

    it('Arguments', function () {
        expect(addi8.args.length).toBe(2);
        expect(addi8.args[0].type.equals(Type.int8)).toBe(true);
        expect(addi8.args[1].type.equals(Type.int8)).toBe(true);
    });

    it('isCompatible', function () {
        expect(addi8.isCompatible([])).toBe(false);
        expect(addi8.isCompatible([Type.int8, Type.int8])).toBe(true);
        expect(addi8.isCompatible([Type.int16, Type.int8])).toBe(false);
        expect(addi8.isCompatible([Type.int8, Type.int16])).toBe(false);
    });

    it('addArgument (with optional parameters)', function () {
        var m = new Method('test');
        expect(function () {
            m.addArgument('test1', Type.int8, false);
        }).not.toThrow();
        expect(function () {
            m.addArgument('test1', Type.int8, true);
        }).not.toThrow();
        expect(function () {
            m.addArgument('test1', Type.int8, false);
        }).toThrow();
    });

    it('isCompatible (with optional parameters)', function () {
        expect(addi8opt.isCompatible([])).toBe(false);
        expect(addi8opt.isCompatible([Type.int8, Type.int8])).toBe(true);
        expect(addi8opt.isCompatible([Type.int8, Type.int8, Type.int8])).toBe(true);
        expect(addi8opt.isCompatible([Type.int8, Type.int8, Type.int16])).toBe(false);
    });

    it('getDistances', function () {
        expect(addi8.getDistances([Type.int8, Type.int8])).toEqual([0, 0]);
        expect(addta.getDistances([ta, ta])).toEqual([0, 0]);
        expect(addta.getDistances([tb, ta])).toEqual([1, 0]);
        expect(addta.getDistances([tb, tc])).toEqual([1, 2]);
        expect(function () {addtbtc.getDistances([]); }).toThrow();
        expect(addtbtc.getDistances([tc, tc])).toEqual([1, 0]);
    });
});

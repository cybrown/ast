describe('Interface', function () {
    'use strict';
    var Type = require('../type');
    var Interface = require('../interface');
    var Method = require('../method');

    var close;
    var clone;
    var clone2;
    var idisposable;
    var iclonable;
    var dispoableclonable;
    var newclonnable;
    var newnewclonnable;
    var noparent;
    var dummy_c_c;
    var dummy_nc_nc;
    var dummy_nnc_nnc;
    var dummy;
    var dummy2;

    var same;
    var same2;

    beforeEach(function () {
        // Defining methods
        close = new Method('close', Type.int8);
        clone = new Method('clone', Type.int8);
        clone2 = new Method('clone', Type.int8);
        // Defining interfaces
        idisposable = new Interface('IDisposable');
            idisposable.addMethod(close);
        iclonable = new Interface('IClonable');
            iclonable.addMethod(clone);
        dispoableclonable = new Interface('DisposableClonable');
            dispoableclonable.addInterface(idisposable);
            dispoableclonable.addInterface(iclonable);
        newclonnable = new Interface('DummyClonnable');
            newclonnable.addInterface(iclonable);
        newnewclonnable = new Interface('DummyClonnable');
            newnewclonnable.addInterface(newclonnable);
        noparent = new Interface('NoParent');

        dummy_c_c = new Method('dummy');
            dummy_c_c.addArgument(iclonable);
            dummy_c_c.addArgument(iclonable);
        dummy_nc_nc = new Method('dummy');
            dummy_nc_nc.addArgument(newclonnable);
            dummy_nc_nc.addArgument(newclonnable);
        dummy_nnc_nnc = new Method('dummy');
            dummy_nnc_nnc.addArgument(newnewclonnable);
            dummy_nnc_nnc.addArgument(newnewclonnable);

        dummy = new Interface('Dummy');
            dummy.addMethod(dummy_nc_nc);
            dummy.addMethod(dummy_nnc_nnc);
        dummy2 = new Interface('Dummy2');
            dummy2.addInterface(dummy);

        same = new Method('same');
            same.addArgument(Type.int8);
        same2 = new Method('same');
            same2.addArgument(Type.int8);
    });

    it('addMethod', function () {
        iclonable.addMethod(same);
        expect(function () {iclonable.addMethod(same2)}).toThrow();
        expect(function () {newclonnable.addMethod(same2)}).not.toThrow();
    });

    it('isImplementing', function () {
        expect(newclonnable.isImplementing(iclonable)).toBe(true);
        expect(newnewclonnable.isImplementing(newclonnable)).toBe(true);
        expect(newnewclonnable.isImplementing(iclonable)).toBe(true);
        expect(noparent.isImplementing(iclonable)).toBe(false);
    });

    it('hasMethod', function () {
        expect(iclonable.hasMethod(clone)).toBe(true);
        expect(newclonnable.hasMethod(clone)).toBe(true);
        expect(dispoableclonable.hasMethod(clone)).toBe(true);
        expect(dispoableclonable.hasMethod(close)).toBe(true);
        expect(noparent.hasMethod(close)).toBe(false);
    });

    it('findMethodsByName (with string)', function () {
        var a = iclonable.findMethodsByName('clone');
        expect(a.length).toBe(1);
        expect(a.indexOf(clone)).not.toBe(-1);
        var b = dispoableclonable.findMethodsByName('close');
        expect(b.length).toBe(1);
        expect(b.indexOf(close)).not.toBe(-1);
    });

    it('findMethodsByName (with regex)', function () {
        var a = iclonable.findMethodsByName(/^clo/);
        expect(a.length).toBe(1);
        expect(a.indexOf(clone)).not.toBe(-1);
        var b = dispoableclonable.findMethodsByName(/^clo/);
        expect(b.length).toBe(2);
        expect(b.indexOf(close)).not.toBe(-1);
        expect(b.indexOf(clone)).not.toBe(-1);
    });

    it('distanceTo', function () {
        expect(newclonnable.distanceTo(newclonnable)).toBe(0);
        expect(newclonnable.distanceTo(iclonable)).toBe(1);
        expect(newnewclonnable.distanceTo(iclonable)).toBe(2);
    });

    it('findBestMethod', function () {
        expect(dummy.findBestMethod('dummy', [iclonable, iclonable])).toBe(null);
        expect(dummy.findBestMethod('dummy', [newclonnable, newclonnable])).toBe(dummy_nc_nc);
        expect(dummy.findBestMethod('dummy', [newnewclonnable, newnewclonnable])).toBe(dummy_nnc_nnc);
        expect(dummy2.findBestMethod('dummy', [iclonable, iclonable])).toBe(null);
        expect(dummy2.findBestMethod('dummy', [newclonnable, newclonnable])).toBe(dummy_nc_nc);
        expect(dummy2.findBestMethod('dummy', [newnewclonnable, newnewclonnable])).toBe(dummy_nnc_nnc);
    });
});

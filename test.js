
    'use strict';
    var Type = require('./type');
    var Interface = require('./interface');
    var Method = require('./method');

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

        var a = new Interface('A');
            a.addMethod(close);
        var b = new Interface('B');
            b.addMethod(clone);
            b.addInterface(a);
        var c = new Interface('C');
            c.addMethod(clone2);
            c.addInterface(b);
        var ma = a.findAllMethods();
//        var mb = b.findAllMethods();
//        var mc = c.findAllMethods();

(function () {
    'use strict';

    var Type = require('./type');
    var Node  = require('./nodes');
    var op    = require('./operator');

    var sem = require('./semantic');
    var run = require('./interpretor');

    var demos = [];

    demos.push(
    Node.unary(
        op.NOT,Node.literal(Type.int8, 0))
    );

    demos.push(
    Node.unary(op.NEG,
        Node.literal(Type.int8, 3))
    );

    demos.push(
    Node.binary(op.SHL,
        Node.literal(Type.int8, 1),
        Node.literal(Type.int8, 2))
    );

    demos.push(
    Node.binary(op.ADD,
        Node.unary(op.NEG,
            Node.literal(Type.int8, 5)),
        Node.literal(Type.int8, 4))
    );

    demos.push(
    Node.binary(op.ADD,
        Node.literal(Type.int8, 4),
        Node.literal(Type.int8, 5))
    );

    demos.push(
    Node.declaration(Type.int8,
        'foo',
        Node.literal(Type.int8, 42))
    );

    demos.forEach(function (demo) {
        console.log('----------------------');
        sem(demo);
        console.log(demo);
        console.log(run(demo));
    });
})();

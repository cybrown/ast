(function () {
    'use strict';

    var Node  = require('./nodes');
    var op    = require('./operator');

    var run = require('./interpretor');
    var Type = require('./type');

    var sem = require('./semantic');


    var demos = [];

    demos.push(
    Node.Unary(
        op.NOT,Node.Literal(Type.int8, 0))
    );

    demos.push(
    Node.Unary(op.NEG,
        Node.Literal(Type.int8, 3))
    );

    demos.push(
    Node.Binary(op.SHL,
        Node.Literal(Type.int8, 1),
        Node.Literal(Type.int8, 2))
    );

    demos.push(
    Node.Binary(op.ADD,
        Node.Unary(op.NEG,
            Node.Literal(Type.int8, 5)),
        Node.Literal(Type.int8, 4))
    );

    demos.push(
    Node.Binary(op.ADD,
        Node.Literal(Type.int8, 4),
        Node.Literal(Type.int8, 5))
    );

    demos.forEach(function (demo) {
        console.log(sem(demo));
        console.log(run(demo));
    });
})();

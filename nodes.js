(function () {
    'use strict';

    var Node = function () {
        this.kind = 0;
        this.type = null;
    };

    Node.UNARY   = 'UNARY'; //1;
    Node.BINARY  = 'BINARY'; //2;
    Node.LITERAL = 'LITERAL'; //3;

    Node.literal = function (type, value) {
        // TODO Test if literal value is in valid
        // Numbers must be in range, strings with correct characters etc...
        var res = new Node();
        res.kind = Node.LITERAL;
        res.type = type;
        res.value = value;
        return res;
    };

    Node.unary = function (operator, operand) {
        var res = new Node();
        res.kind = Node.UNARY;
        res.operator = operator;
        res.operand = operand;
        return res;
    };

    Node.binary = function (operator, left, right) {
        var res = new Node();
        res.kind = Node.BINARY;
        res.operator = operator;
        res.left = left;
        res.right = right;
        return res;
    };

    module.exports = Node;
})();

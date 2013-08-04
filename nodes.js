(function () {
    'use strict';

    var Node = function () {
        this.kind = 0;
        this.type = null;
    };

    Node.UNARY       = 'UNARY'; //1;
    Node.BINARY      = 'BINARY'; //2;
    Node.LITERAL     = 'LITERAL'; //3;
    Node.DECLARATION = 'DECLARATION'; //4;
    Node.ASSIGN      = 'ASSIGN'; //5;
    Node.IF          = 'IF'; //6;
    Node.FOR         = 'FOR'; //7;

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

    Node.invoke = function (func, args) {
        var res = new Node();
        res.kind = Node.INVOKE;
        res.func = func;
        res.args = args;
        return res;
    };

    Node.declaration = function (type, name, value) {
        var res = new Node();
        res.kind = Node.DECLARATION;
        res.type = type;
        res.name = name;
        res.value = value;
        return res;
    };

    Node.assign = function (left, right) {
        var res = new Node();
        res.kind = Node.ASSIGN;
        this.left = left;
        this.right = right;
        return res;
    };

    Node.if = function (condition, onTrue, onFalse) {
        var res = new Node();
        res.kind = Node.IF;
        res.condition = condition;
        res.onTrue = onTrue;
        res.onFalse = onFalse;
        return res;
    };

    Node.for = function (condition, body) {
        var res = new Node();
        res.kind = Node.FOR;
        res.condition = condition;
        res.body = body;
        return res;
    };

    module.exports = Node;
})();

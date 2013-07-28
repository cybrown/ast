(function () {
    'use strict';

    var nodes = require('./nodes');
    var op    = require('./operator');
    var int   = require('./intops');

    var LiteralNode = function (node) {
        return node.value;
    };

    var UnaryNode = function (node) {
        var value = RunNode(node.value);
        switch (node.operator) {
            case op.POS:
                return int.Pos(value);
                break;
            case op.NEG:
                return int.Neg(value);
                break;
            case op.NOT:
                return int.Not(value);
                break;
            case op.BNOT:
                return int.BNot(value);
                break;
        }
    };

    var BinaryNode = function (node) {
        var left = RunNode(node.left);
        var right = RunNode(node.right);
        switch (node.operator) {
            case op.AND:
                return int.And(left, right);
                break;
            case op.OR:
                return int.Or(left, right);
                break;
        }
        switch (node.operator) {
            case op.ADD:
                return int.Add(left, right);
                break;
            case op.SUB:
                return int.Sub(left, right);
                break;
            case op.MUL:
                return int.Mul(left, right);
                break;
            case op.DIV:
                return int.Div(left, right);
                break;
            case op.MOD:
                return int.Mod(left, right);
                break;
            case op.BAND:
                return int.BAnd(left, right);
                break;
            case op.BOR:
                return int.BOr(left, right);
                break;
            case op.BXOR:
                return int.BXor(left, right);
                break;
            case op.SHL:
                return int.Shl(left, right);
                break;
            case op.SHR:
                return int.Shr(left, right);
                break;
        }
    };

    var RunNodeArray = {};
    RunNodeArray[nodes.LITERAL] = LiteralNode;
    RunNodeArray[nodes.UNARY]   = UnaryNode;
    RunNodeArray[nodes.BINARY]  = BinaryNode;

    var RunNode = function (node) {
        return RunNodeArray[node.kind](node);
    };

    module.exports = RunNode;

})();

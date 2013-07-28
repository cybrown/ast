(function () {
    var Node = require('./nodes');
    var op   = require('./operator');

    var LiteralNode = function (node) {
        return node.type;
    };

    var UnaryNode = function (node) {
        var type = RunNode(node.value);
        switch (node.operator) {
            case op.POS:
                node.type = type;
                break;
            case op.NEG:
                node.type = type;
                break;
            case op.NOT:
                node.type = type;
                break;
            case op.BNOT:
                node.type = type;
                break;
        }
        return node.type;
    };

    var BinaryNode = function (node) {
        var left  = RunNode(node.left);
        var right = RunNode(node.right);
        if (!left.equals(right)) {
            throw new Error("Both sides must have the same type !");
        }
        switch (node.operator) {
            case op.AND:
                node.type = left;
                break;
            case op.OR:
                node.type = left;
                break;
        }
        switch (node.operator) {
            case op.ADD:
                node.type = left;
                break;
            case op.SUB:
                node.type = left;
                break;
            case op.MUL:
                node.type = left;
                break;
            case op.DIV:
                node.type = left;
                break;
            case op.MOD:
                node.type = left;
                break;
            case op.BAND:
                node.type = left;
                break;
            case op.BOR:
                node.type = left;
                break;
            case op.BXOR:
                node.type = left;
                break;
            case op.SHL:
                node.type = left;
                break;
            case op.SHR:
                node.type = left;
                break;
        }
        return node.type;
    };

    var RunNodeArray = {};
    RunNodeArray[Node.LITERAL] = LiteralNode;
    RunNodeArray[Node.UNARY]   = UnaryNode;
    RunNodeArray[Node.BINARY]  = BinaryNode;

    var RunNode = function (node) {
        return RunNodeArray[node.kind](node);
    };

    module.exports = RunNode;
})();

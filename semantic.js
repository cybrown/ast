(function () {
    var Node = require('./nodes');
    var op   = require('./operator');

    var LiteralNode = function (node) {
        //return node.type;
    };

    var UnaryNode = function (node) {
        RunNode(node.operand);
        switch (node.operator) {
            case op.POS:
                node.type = node.operand.type;
                break;
            case op.NEG:
                node.type = node.operand.type;
                break;
            case op.NOT:
                node.type = node.operand.type;
                break;
            case op.BNOT:
                node.type = node.operand.type;
                break;
            default:
                throw new Error('Semantic.UnaryNode: Uknown operator');
        }
    };

    var BinaryNode = function (node) {
        RunNode(node.left);
        RunNode(node.right);
        if (!node.left.type.equals(node.right.type)) {
            throw new Error("Both sides must have the same type !");
        }
        switch (node.operator) {
            case op.AND:
                node.type = node.left.type;
                break;
            case op.OR:
                node.type = node.left.type;
                break;
        }
        switch (node.operator) {
            case op.ADD:
                node.type = node.left.type;
                break;
            case op.SUB:
                node.type = node.left.type;
                break;
            case op.MUL:
                node.type = node.left.type;
                break;
            case op.DIV:
                node.type = node.left.type;
                break;
            case op.MOD:
                node.type = node.left.type;
                break;
            case op.BAND:
                node.type = node.left.type;
                break;
            case op.BOR:
                node.type = node.left.type;
                break;
            case op.BXOR:
                node.type = node.left.type;
                break;
            case op.SHL:
                node.type = node.left.type;
                break;
            case op.SHR:
                node.type = node.left.type;
                break;
            default:
                throw new Error('Semantic.UnaryNode: Uknown operator');
        }
    };

    var DeclarationNode = function (node) {
        // TODO if value, type must be compatible
    };

    var AssignNode = function (node) {
        /*  TODO
         *  Left and right values must be compatible
         */
        RunNode(node.left);
        RunNode(node.right);
        node.type = node.left.type;
    };

    var IfNode = function (node) {
        /*  TODO
         *  Condition must be boolean
         *  onTrue and onFalse types must me compatible
         */
        RunNode(node.condition);
        RunNode(node.onTrue);
        RunNode(node.onFalse);
        node.type = node.onTrue.type;
    };

    var ForNode = function (node) {
        /*  TODO
         *  Condition must be boolean
         */
        RunNode(node.condition);
        RunNode(node.body);
        node.type = node.body.type;
    };

    var RunNodeArray = {};
    RunNodeArray[Node.LITERAL]      = LiteralNode;
    RunNodeArray[Node.UNARY]        = UnaryNode;
    RunNodeArray[Node.BINARY]       = BinaryNode;
    RunNodeArray[Node.DECLARATION]  = DeclarationNode;
    RunNodeArray[Node.ASSIGN]       = AssignNode;
    RunNodeArray[Node.IF]           = IfNode;
    RunNodeArray[Node.FOR]          = ForNode;

    var RunNode = function (node) {
        RunNodeArray[node.kind](node);
    };

    module.exports = RunNode;
})();

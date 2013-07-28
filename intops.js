(function () {
    'use strict';

    module.exports.Neg = function (value) {
        return -value;
    };
    module.exports.Pos = function (value) {
        return value;
    };

    module.exports.Add = function (left, right) {
        return left + right;
    };
    module.exports.Sub = function (left, right) {
        return left - right;
    };
    module.exports.Mul = function (left, right) {
        return left * right;
    };
    module.exports.Div = function (left, right) {
        return left / right;
    };
    module.exports.Mod = function (left, right) {
        return left % right;
    };

    module.exports.And = function (left, right) {
        return left % right;
    };
    module.exports.Or = function (left, right) {
        return left % right;
    };
    module.exports.Not = function (value) {
        return value === 0 ? 1 : 0;
    };

    module.exports.BAnd = function (left, right) {
        return left & right;
    };
    module.exports.BOr = function (left, right) {
        return left | right;
    };
    module.exports.BXor = function (left, right) {
        return left ^ right;
    };
    module.exports.BNot = function (value) {
        return ~value;
    };

    module.exports.Shl = function (left, right) {
        return left << right;
    };
    module.exports.Shr = function (left, right) {
        return left >> right;
    };

})();

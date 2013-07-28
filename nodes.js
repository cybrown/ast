(function () {
    'use strict';

    var UNARY = module.exports.UNARY = 1;
    var BINARY = module.exports.BINARY = 2;
    var LITERAL = module.exports.LITERAL = 3;


    module.exports.Literal = function (type, value) {
        // TODO Test if literal value is in range
        return {
            kind: LITERAL,
            type: type,
            value: value
        };
    };

    module.exports.Unary = function (operator, value) {
        return {
            kind: UNARY,
            operator: operator,
            value: value
        };
    };

    module.exports.Binary = function (operator, left, right) {
        return {
            kind: BINARY,
            operator: operator,
            left: left,
            right: right
        };
    };

})();

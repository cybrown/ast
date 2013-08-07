(function () {
    'use strict';

    var Value = require('./Value');

    var BinaryOpValue = function (op, left, right) {
        Value.call(this);
        this.op = op;
        this.left = left;
        this.right = right;
    };

    BinaryOpValue.prototype.isValid = function () {
        // TODO Check operator exists
    };

    module.exports = BinaryOpValue;
})();

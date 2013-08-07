(function () {
    'use strict';

    var Value = require('./Value');

    var UnaryOpValue = function (op, operand) {
        Value.call(this);
        this.op = op;
        this.operand = operand;
    };

    module.exports = UnaryOpValue;
})();

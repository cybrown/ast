(function () {
    'use strict';

    var Value = require('./Value');

    var ConstantByteValue = function (size, value) {
        Value.call(this);
        this.size = size;
        this.value = value;
    };

    ConstantByteValue.prototype.isValid = function () {
        if (!(this.size === 1) && !(this.size === 2) && !(this.size === 4) && !(this.size === 8)) {
            return false;
        }
        // TODO Check int value in bound
    };

    module.exports = ConstantByteValue;
})();

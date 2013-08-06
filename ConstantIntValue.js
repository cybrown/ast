(function () {
    'use strict';

    var Value = require('./Value');

    var ConstantIntValue = function (value, size) {
        Value.call(this);
        this.size = size;
        this.value = value;
    };

    ConstantIntValue.prototype.isValid = function () {
        if (!(this.size === 1) && !(this.size === 2) && !(this.size === 4) && !(this.size === 8)) {
            return false;
        }
        // TODO Check int value in bound
    };

    module.exports = ConstantIntValue;
})();

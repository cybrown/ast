(function () {
    'use strict';

    var Value = require('./Value');

    var ConstantFloatValue = function (size, value) {
        Value.call(this);
        this.size = size;
        this.value = value;
    };

    ConstantFloatValue.prototype.isValid = function () {
        if (!(this.size === 4) && !(this.size === 8)) {
            return false;
        }
        // TODO Check int value in bound
    };

    module.exports = ConstantFloatValue;
})();

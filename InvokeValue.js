(function () {
    'use strict';

    var Value = require('./Value');

    var CallValue = function (object, method, args) {
        Value.call(this);
        this.object = object;
        this.method = method;
        this.args = args;
    };

    CallValue.prototype.isValid = function () {
        // TODO Check operator exists
    };

    module.exports = CallValue;
})();

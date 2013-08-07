(function () {
    'use strict';

    var Value = require('./Value');

    var CallValue = function (callable, args) {
        Value.call(this);
        this.callable = callable;
        this.args = args;
    };

    CallValue.prototype.isValid = function () {
        // TODO Check operator exists
    };

    module.exports = CallValue;
})();

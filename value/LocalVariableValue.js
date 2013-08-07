(function () {
    'use strict';

    var Value = require('./Value');

    var LocalVariableValue = function (name) {
        Value.call(this);
        this.name = name;
    };

    module.exports = LocalVariableValue;
})();

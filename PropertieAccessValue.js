(function () {
    'use strict';

    var Value = require('./Value');

    var PropertyAccessValue = function (name) {
        Value.call(this);
        this.name = name;
    };

    module.exports = PropertyAccessValue;
})();

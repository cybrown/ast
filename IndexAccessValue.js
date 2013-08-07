(function () {
    'use strict';

    var Value = require('./Value');

    var IndexAccessValue = function (value, index) {
        Value.call(this);
        this.value = value;
        this.index = index;
    };

    module.exports = IndexAccessValue;
})();

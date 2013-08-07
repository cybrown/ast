(function () {
    'use strict';

    var Value = require('./Value');

    var MemberValue = function (object, name) {
        Value.call(this);
        this.object = object;
        this.name = name;
    };

    MemberValue.prototype.isValid = function () {
        // TODO Name must be a string
    };

    module.exports = MemberValue;
})();

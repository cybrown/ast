(function () {
    'use strict';

    var Type = require('./Type');

    var Value = function () {
        this.type = null;
    };

    Value.prototype.setType = function (type) {
        if (this.type !== null) {
            throw new Error('Type is not null');
        }
        this.type = type;
    };


    module.exports = Value;
})();

(function () {
    'use strict';

    var Interface = function (name) {
        this.name = name;
        this.methods = [];
    };

    Interface.prototype.addMethod = function (method) {
        this.methods.push(method);
    };

    return Interface;
})();

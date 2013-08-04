(function () {
    'use strict';

    /**
     * Represents an interface
     * @class
     * @param {string} name
     */
    var Interface = function (name) {
        this.name = name;
        this.methods = [];
        this.interfaces = [];
    };

    /**
     * @param {Method} method
     */
    Interface.prototype.addMethod = function (method) {
        this.methods.push(method);
    };

    Interface.prototype.addInterface = function (_interface) {
        this.interfaces.push(_interface);
    };

    Interface.prototype.isImplementing = function (_interface) {
        if (this === _interface) {
            return true;
        } else {
            for (var i = 0; i < this.interfaces.length; i++) {
                if (this.interfaces[i].isImplementing(_interface)) {
                    return true;
                }
            }
        }
        return false;
    };

    Interface.prototype.findMethodsByName = function (regex) {
        var res = [];
        this.methods.forEach(function (method) {
            if (method.name.match(regex)) {
                res.push(method);
            }
        });
        this.interfaces.forEach(function (_interface) {
            res = res.concat(_interface.findMethodsByName(regex));
        });
        return res;
    };

    Interface.prototype.hasMethod = function (method) {
        if (this.methods.indexOf(method) !== -1) {
            return true;
        } else {
            for (var i = 0; i < this.interfaces.length; i++) {
                if (this.interfaces[i].hasMethod(method)) {
                    return true;
                }
            }
        }
        return false;
    };

    Interface.prototype.distanceTo = function (_interface) {
        if (this === _interface) {
            return 0;
        } else {
            var tmp;
            for (var i = 0; i < this.interfaces.length; i++) {
                tmp = this.interfaces[i].distanceTo(_interface);
                if (tmp !== -1) {
                    return tmp + 1;
                }
            }
        }
        return -1;
    };

    module.exports = Interface;
})();

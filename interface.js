(function () {
    'use strict';

    var Interface = function (name) {
        this.name = name;
        this.methods = [];
        this.interfaces = [];
    };

    Interface.prototype.addInterface = function (_interface) {
        this.interfaces.push(_interface);
    };
    
    Interface.prototype.addMethod = function (method) {
        var bestMethod = this.findBestMethod(method.name, method.getArgumentTypes(), true);
        if (bestMethod !== null) {
            var distance = bestMethod.getDistancesSum(method);
            if (distance === 0) {
                //throw new Error('Overriding a method own by this class.');
            }
        }
        this.methods.push(method);
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

    Interface.prototype.findBestMethod = function (regex, arrayOfTypes, onlyOwnMethods) {
        var methods = this.findMethodsByName(regex, onlyOwnMethods);
        var min = 1000;
        var res = null;
        var distance;
        methods.forEach(function (method) {
            distance = method.getDistancesSum(arrayOfTypes);
            if (distance === min) {
                return null;
                //throw new Error('There is an ambiguity while choosing best method !');
            }
            if (distance < min && distance >= 0) {
                min = distance;
                res = method;
            }
        });
        return res;
    };

    Interface.prototype.findMethodsByName = function (regex, onlyOwnMethods) {
        var res = [];
        this.methods.forEach(function (method) {
            if (method.name.match(regex)) {
                res.push(method);
            }
        });
        if (!onlyOwnMethods) {
            this.interfaces.forEach(function (_interface) {
                res = res.concat(_interface.findMethodsByName(regex));
            });
        }
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

    Interface.prototype.isA = function (_interface) {
        return this.isImplementing(_interface);
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

    module.exports = Interface;
})();

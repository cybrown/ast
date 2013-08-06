(function () {
    'use strict';

    var Interface = function (name) {
        this.name = name;
        this.methods = [];
        this.interfaces = [];
    };

    Interface.prototype.addInterface = function (_interface) {
        if (_interface.isA(this)) {
            throw new Error('Can not add this interface.');
        }
        if (this.interfaces.indexOf(_interface) !== -1) {
            throw new Error('Own interface already implements this interface.')
        }
        this.interfaces.push(_interface);
    };
    
    Interface.prototype.addMethod = function (method) {
        var bestMethod = this.findBestMethod(method.name, method.getArgumentTypes(), true);
        if (bestMethod !== null) {
            var distance = bestMethod.getDistancesSum(method.getArgumentTypes());
            if (distance === 0) {
                throw new Error('A method with same signature is already declared.');
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

    Interface.prototype.findAllMethods = function () {
        return this.interfaces.reduce(function (methods, _interface) {
            methods.push.apply(methods, _interface.findAllMethods());
            return methods;
        }, this.methods.slice(0));
    };

    Interface.prototype.findBestMethod = function (regex, arrayOfTypes, onlyOwnMethods) {
        var methods = this.findMethodsByName(regex, onlyOwnMethods);
        var min = 1000;
        var res = null;
        var distance;
        methods.forEach(function (method) {
            distance = method.getDistancesSum(arrayOfTypes);
            if (distance === min) {
                throw new Error('There is an ambiguity while choosing best method !');
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

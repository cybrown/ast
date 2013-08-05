(function () {
    'use strict';

    var Interface = require('./interface');

    var Class = function (name) {
        this.name = name;
        this.parent = null;
        this.fields = [];
        this.methods = [];
        this.interfaces = [];
    };

    Class.prototype.setParent = function (parent) {
        if (parent === this) {
            throw new Error('Class must not be it\'s own parent');
        }
        this.parent = parent;
    };

    Class.prototype.addField = function (name, type) {
        this.fields.push({
            name: name,
            type: type
        });
    };

    Class.prototype.addInterface = function (_interface) {
        this.interfaces.push(_interface);
    };

    Class.prototype.addMethod = function (method) {
        this.methods.push(method);
    };

    Class.prototype.isExtending = function (classOrInterface) {
        var currentClass = this.parent;
        while (currentClass != null) {
            if (currentClass === classOrInterface) {
                return true;
            }
            currentClass = currentClass.parent;
        };
        return false;
    };

    Class.prototype.isImplementing = function (_interface) {
        if (!_interface instanceof Interface) {
            throw new Error('Argument must be an interface');
        }
        for (var i = 0; i < this.interfaces.length; i++) {
            if (this.interfaces[i].isImplementing(_interface)) {
                return true;
            }
        }
        if (this.parent) {
            return this.parent.isImplementing(_interface);
        }
        return false;
    };

    Class.prototype.isA = function (classOrInterface) {
        if (classOrInterface instanceof Class) {
            if (classOrInterface === this) return true;
            return this.isExtending(classOrInterface);
        } else if (classOrInterface instanceof Interface) {
            return this.isImplementing(classOrInterface);
        } else {
            throw new Error('Must be a class or an interface');
        }
    };

    Class.prototype.distanceTo = function (classOrInterface) {
        if (classOrInterface instanceof Class) {
            return this.distanceToClass(classOrInterface);
        } else if (classOrInterface instanceof Interface) {
            return this.distanceToInterface(classOrInterface);
        } else {
            throw new Error('Must be a class or an interface');
        }
    };

    Class.prototype.distanceToClass = function (cls) {
        if (this === cls) {
            return 0;
        } else if (this.parent) {
            var tmp = this.parent.distanceToClass(cls);
            if (tmp !== -1) {
                return tmp + 1;
            }
        }
        return -1;
    };

    Class.prototype.distanceToInterface = function (_interface) {
        for (var i = 0; i < this.interfaces.length; i++) {
            var tmp = this.interfaces[i].distanceTo(_interface);
            if (tmp !== -1) {
                return tmp + 1;
            }
        }
        if (this.parent) {
            tmp = this.parent.distanceToInterface(_interface);
            if (tmp !== -1) {
                return tmp + 1;
            }
        }
        return -1;
    };

    Class.prototype.findMethodsByName = function (regex) {
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

    Class.prototype.hasMethodDefined = function (method) {
        for (var i = 0; i < this.methods.length; i++) {
            if (this.methods[i] === method) {
                return true;
            }
        }
        if (this.parent) {
            return this.parent.hasMethodDefined(method);
        }
        return false;
    };

    Class.prototype.hasMethodDeclared = function (method) {
        for (var i = 0; i < this.methods.length; i++) {
            if (this.methods[i] === method) {
                return true;
            }
        }
        for (var i = 0; i < this.interfaces.length; i++) {
            if (this.interfaces[i].hasMethod(method)) {
                return true;
            }
        }
        if (this.parent) {
            return this.parent.hasMethodDeclared(method);
        }
        return false;
    };

    Class.prototype.findBestMethod = function (regex, arrayOfTypes) {
        var methods = this.findMethodsByName(regex);
        var min = 1000;
        var res = null;
        var distance;
        this.methods.forEach(function (method) {
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

    module.exports = Class;
})();

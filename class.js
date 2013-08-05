(function () {
    'use strict';

    var Interface = require('./interface');

    var Class = function (name) {
        Interface.call(this, name);
        this.parent = null;
        this.fields = [];
    };
    Class.prototype = Object.create(Interface.prototype);

    Class.prototype.addField = function (name, type) {
        this.fields.push({
            name: name,
            type: type
        });
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

    Class.prototype.setParent = function (parent) {
        if (parent === this) {
            throw new Error('Class must not be it\'s own parent');
        }
        this.parent = parent;
    };

    // Interface methods

    Class.prototype.distanceTo = function (classOrInterface) {
        var tmp, tmp2;
        if (this === classOrInterface) {
            return 0;
        }
        if (classOrInterface instanceof Class) {
            if (this.parent) {
                tmp = this.parent.distanceTo(classOrInterface);
                if (tmp !== -1) {
                    return tmp + 1;
                }
            }
        }
        if (classOrInterface instanceof Interface) {
            tmp = Interface.prototype.distanceTo.call(this, classOrInterface);
            tmp2 = -1;
            if (this.parent) {
                tmp2 = this.parent.distanceTo(classOrInterface);
                if (tmp2 !== -1) {
                    tmp2++;
                }
            }
            if (tmp === -1) {
                return tmp2;
            } else if (tmp2 === -1) {
                return tmp;
            } else {
                return Math.min(tmp, tmp2);
            }
        }
        return -1;
    };

    Class.prototype.findBestMethod = function (regex, arrayOfTypes) {
        return Interface.prototype.findBestMethod.call(this, regex, arrayOfTypes);
    };

    Class.prototype.findMethodsByName = function (regex, onlyOwnMethods) {
        var res = Interface.prototype.findMethodsByName.call(this, regex);
        if (!onlyOwnMethods && this.parent) {
            res.push.apply(res, this.parent.findMethodsByName(regex));
        }
        return res;
    };

    Class.prototype.hasMethod = function (method) {
        if (Interface.prototype.hasMethod.call(this, method)) {
            return true;
        }
        if (this.parent) {
            return this.parent.hasMethod(method);
        }
        return false;
    };

    Class.prototype.isA = function (classOrInterface) {
        if (Interface.prototype.isA.call(this, classOrInterface)) {
            return true;
        }
        return this.isExtending(classOrInterface);
    };

    Class.prototype.isImplementing = function (_interface) {
        if (Interface.prototype.isImplementing.call(this, _interface)) {
            return true;
        }
        if (this.parent) {
            return this.parent.isImplementing(_interface);
        }
        return false;
    };

    module.exports = Class;
})();

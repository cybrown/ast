(function () {
    'use strict';

    var Method = function (name, returnType) {
        this.args = [];
        this.setName(name);
        this.setReturnType(returnType);
        this.mandatoryArgsCount = 0;
        this.hasOptionalArgs = false;
    };

    Method.prototype.setName = function (name) {
        this.name = name;
    };

    Method.prototype.setReturnType = function (type) {
        this.returnType = type;
    };

    Method.prototype.addArgument = function (type, name, optional) {
        if (optional !== true) optional = false;
        if (!optional && this.hasOptionalArgs == true) {
            throw Error('Arguments must be optional');
        }
        this.args.push({
            name: name,
            type: type,
            optional: optional
        });
        if (optional) {
            this.hasOptionalArgs = true;
        } else {
            this.mandatoryArgsCount++;
        }
    };

    Method.prototype.isCompatible = function (arrayOfTypes) {
        if (this.mandatoryArgsCount <= arrayOfTypes.length) {
            for (var i = 0; i < arrayOfTypes.length; i++) {
                if (!this.args[i].type.isA(arrayOfTypes[i])) {
                    return false;
                }
            }
            return true;
        } else {
            return false;
        }
    };

    Method.prototype.getDistances = function (arrayOfTypes) {
        var res = [];
        if (arrayOfTypes.length < this.mandatoryArgsCount) {
            throw new Error('Not enough parameters');
        }
        for (var i = 0; i < arrayOfTypes.length; i++) {
            res.push(arrayOfTypes[i].distanceTo(this.args[i].type));
        }
        return res;
    };

    Method.prototype.getDistancesSum = function (arrayOfTypes) {
        return this.getDistances(arrayOfTypes).reduce(function (a, b) {
            return a + b;
        });
        var res = [];
        if (arrayOfTypes.length < this.mandatoryArgsCount) {
            throw new Error('Not enough parameters');
        }
        for (var i = 0; i < arrayOfTypes.length; i++) {
            res.push(arrayOfTypes[i].distanceTo(this.args[i].type));
        }
        return res;
    };

    module.exports = Method;
})();

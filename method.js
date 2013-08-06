(function () {
    'use strict';

    var Type = require('./type');

    var Method = function (name, returnType) {
        this.args = [];
        this.setName(name);
        this.setReturnType(returnType);
        this.mandatoryArgsCount = 0;
        this.hasOptionalArgs = false;
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

    Method.prototype.getArgumentTypes = function () {
        return this.args.map(function (arg) {
            return arg.type;
        });
    };

    Method.prototype.getDistances = function (arrayOfTypes) {
        var res = [];
        if (!Array.isArray(arrayOfTypes)) {
            throw new Error('arrayOfTypes must be an array');
        }
        if (arrayOfTypes.length < this.mandatoryArgsCount) {
            throw new Error('Not enough parameters');
        }
        for (var i = 0; i < arrayOfTypes.length; i++) {
            if (!arrayOfTypes[i] instanceof Type) {
                throw new Error('arrayOfTypes must be an array of Type');
            }
            res.push(arrayOfTypes[i].distanceTo(this.args[i].type));
        }
        return res;
    };

    Method.prototype.getDistancesSum = function (arrayOfTypes) {
        var res = 0;
        var distances = this.getDistances(arrayOfTypes);
        for (var i = 0; i < distances.length; i++) {
            if (distances[i] === -1) {
                return -1;
            }
            res += distances[i];
        }
        return res;
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

    Method.prototype.setName = function (name) {
        this.name = name;
    };

    Method.prototype.setReturnType = function (type) {
        this.returnType = type;
    };

    module.exports = Method;
})();

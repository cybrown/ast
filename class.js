(function () {
    'use strict';

    var Class = function (name) {
        this.name = name;
        this.super = null;
        this.fields = [];
        this.methods = [];
        this.interfaces = [];
    };

    Class.prototype.setSuper = function (super) {
        this.super = super;
    };

    Class.prototype.addField = function (field) {
        this.fields.push(field);
    };

    Class.prototype.addMethod = function (method) {
        this.methods.push(method);
    };

    Class.prototype.addInterface = function (interface) {
        this.interfaces.push(interface);
    };

    Class.prototype.isChild = function (cls) {
        cls2 = this.super;
        while (cls2 != null) {
            if (cls2 === cls) {
                return true;
            }
            cls2 = cls2.super;
        };
        return false;
    };

    Class.prototype.hasInterface = function (interface) {

    };

    Class.prototype.hasMethod = function (method) {

    };

    module.exports = Class;
})();

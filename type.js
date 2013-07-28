(function () {
    'use strict';

    // Private constants
    var NONE     = 0;
    var INT      = 1;
    var BYTE     = 2;
    var FLOAT    = 3;
    var POINTER  = 4;
    var TUPLE    = 5;
    var FUNCTION = 6;


    var Type = function () {
        this.type = NONE;
        this.value = null;
    };

    Type.prototype.setInt = function (size) {
        this.type = INT;
        this.size = size;

        return this;
    };

    Type.prototype.setByte = function (size) {
        this.type = BYTE;
        this.size = size;
        return this;
    };

    Type.prototype.setFloat = function (size) {
        this.type = FLOAT;
        this.size = size;
        return this;
    };

    Type.prototype.setPointer = function (type) {
        this.type = POINTER;
        this.value = type;
        return this;
    };

    // Return true if two types are the same
    Type.prototype.equals = function (other) {
        if (this.type !== other.type) {
            return false;
        }
        switch (this.type) {
            case NONE:
                throw new Exception('Type NONE');
                break;
            case INT:
            case BYTE:
            case FLOAT:
                return this.size == other.size;
                break;
            case POINTER:
                return this.value.equals(other.value);
                break;
            case TUPLE:

                break;
            case FUNCTION:

                break;
        }
        return true;
    };

    // Return a string representation of the type
    Type.prototype.toString = function () {
        switch (this.type) {
            case INT:
                return 'INT' + this.size;
                break;
            case BYTE:
                return 'BYTE' + this.size;
                break;
            case FLOAT:
                return 'FLOAT' + this.size;
                break;
            case POINTER:
                return 'Pointer of ' + this.value.toString();
            default:
                return 'Uknown type.';
        }
    };

    // Predefined simple types
    Type.int8 = (new Type()).setInt(8);
    Type.int16 = (new Type()).setInt(16);
    Type.int32 = (new Type()).setInt(32);
    Type.int64 = (new Type()).setInt(64);

    Type.byte8 = (new Type()).setByte(8);
    Type.byte16 = (new Type()).setByte(16);
    Type.byte32 = (new Type()).setByte(32);
    Type.byte64 = (new Type()).setByte(64);

    Type.float32 = (new Type()).setFloat(32);
    Type.float64 = (new Type()).setFloat(64);

    module.exports = Type;
})();

(function () {
    'use strict';




    var Type = function () {
        this.type = Type.NONE;
    };

        // Private constants
    Type.NONE     = 'NONE'; //0;
    Type.INT      = 'INT'; //1;
    Type.BYTE     = 'BYTE'; //2;
    Type.FLOAT    = 'FLOAT'; //3;
    Type.POINTER  = 'POINTER'; //4;
    Type.TUPLE    = 'TUPLE'; //5;
    Type.FUNCTION = 'FUNCTION'; //6;

    Type.prototype.setInt = function (size) {
        this.type = Type.INT;
        this.size = size;

        return this;
    };

    Type.prototype.setByte = function (size) {
        this.type = Type.BYTE;
        this.size = size;
        return this;
    };

    Type.prototype.setFloat = function (size) {
        this.type = Type.FLOAT;
        this.size = size;
        return this;
    };

    Type.prototype.setPointer = function (type) {
        this.type = Type.POINTER;
        this.value = type;
        return this;
    };

    // Return true if two types are the same
    Type.prototype.equals = function (other) {
        if (this.type !== other.type) {
            return false;
        }
        switch (this.type) {
            case Type.NONE:
                throw new Exception('Type NONE');
                break;
            case Type.INT:
            case Type.BYTE:
            case Type.FLOAT:
                return this.size == other.size;
                break;
            case Type.POINTER:
                return this.value.equals(other.value);
                break;
            case Type.TUPLE:

                break;
            case Type.FUNCTION:

                break;
        }
        return true;
    };

    // Return a string representation of the type
    Type.prototype.toString = function () {
        switch (this.type) {
            case Type.INT:
                return 'INT' + this.size;
                break;
            case Type.BYTE:
                return 'BYTE' + this.size;
                break;
            case Type.FLOAT:
                return 'FLOAT' + this.size;
                break;
            case Type.POINTER:
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

describe('Interface', function () {
    'use strict';
    var Type = require('../type');
    var Interface = require('../interface');
    var Class = require('../class');
    var Method = require('../method');

    var setAge;
    var noOneHasThisMethod;
    var person;
    var employee;
    var hasId;
    var getId;
    var manager;
    var superManager;
    var personUtil;

    var util_employee_employee;
    var util_employee_manager;
    var util_manager_manager;

    beforeEach(function () {
        // Defining methods
        setAge = new Method('setAge', Type.int8);
            setAge.addArgument(Type.int8, 'age');
        getId = new Method('getId', Type.int8);
        noOneHasThisMethod = new Method('noOne', Type.int8);
        // Defining interfaces
        hasId = new Interface('hasId');
            hasId.addMethod(getId);
        // Defining classes
        person = new Class('Person');
            person.addMethod(setAge);
        employee = new Class('Employee');
            employee.setParent(person);
            employee.addInterface(hasId);
        manager = new Class('Manager');
            manager.setParent(employee);
        superManager = new Class('SuperManager');
            superManager.setParent(manager);
            superManager.addInterface(hasId);
        util_employee_employee = new Method('util');
            util_employee_employee.addArgument(employee);
            util_employee_employee.addArgument(employee);
        util_employee_manager = new Method('util');
            util_employee_manager.addArgument(employee);
            util_employee_manager.addArgument(manager);
        util_manager_manager = new Method('util');
            util_manager_manager.addArgument(manager);
            util_manager_manager.addArgument(manager);
        personUtil = new Class('PersonUtil');
            personUtil.addMethod(util_employee_employee);
            personUtil.addMethod(util_employee_manager);
            personUtil.addMethod(util_manager_manager);
    });

    it('setParent', function () {
        var a = new Class('A');
        var b = new Class('B');
        expect(function () {b.setParent(a); }).not.toThrow();
        expect(function () {a.setParent(a); }).toThrow();
    })

    it('hasMethodDeclared', function () {
        expect(person.hasMethodDeclared(setAge)).toBe(true);
        expect(person.hasMethodDeclared(noOneHasThisMethod)).toBe(false);
        expect(employee.hasMethodDeclared(setAge)).toBe(true);
        expect(employee.hasMethodDeclared(noOneHasThisMethod)).toBe(false);
        expect(person.hasMethodDeclared(getId)).toBe(false);
        expect(employee.hasMethodDeclared(getId)).toBe(true);
        expect(manager.hasMethodDeclared(getId)).toBe(true);
    });

    it('hasMethodDefined', function () {
        expect(person.hasMethodDefined(setAge)).toBe(true);
        expect(person.hasMethodDefined(noOneHasThisMethod)).toBe(false);
        expect(employee.hasMethodDefined(setAge)).toBe(true);
        expect(employee.hasMethodDefined(noOneHasThisMethod)).toBe(false);
    });

    it('isExtending', function () {
        expect(person.isExtending(person)).toBe(false);
        expect(employee.isExtending(person)).toBe(true);
        expect(manager.isExtending(employee)).toBe(true);
        expect(manager.isExtending(person)).toBe(true);
    });

    it('isImplementing', function () {
        expect(employee.isImplementing(hasId)).toBe(true);
        expect(manager.isImplementing(hasId)).toBe(true);
    });

    it ('isA', function () {
        expect(person.isA(hasId)).toBe(false);
        expect(person.isA(person)).toBe(true);
        expect(employee.isA(person)).toBe(true);
        expect(employee.isA(hasId)).toBe(true);
        expect(manager.isA(employee)).toBe(true);
        expect(manager.isA(person)).toBe(true);
        expect(manager.isA(hasId)).toBe(true);
    });

    it('distanceTo', function () {
        expect(person.distanceTo(person)).toBe(0);
        expect(employee.distanceTo(person)).toBe(1);
        expect(person.distanceTo(employee)).toBe(-1);
        expect(manager.distanceTo(person)).toBe(2);
        expect(superManager.distanceTo(person)).toBe(3);
        expect(person.distanceTo(hasId)).toBe(-1);
        expect(employee.distanceTo(hasId)).toBe(1);
        expect(manager.distanceTo(hasId)).toBe(2);
        expect(superManager.distanceTo(hasId)).toBe(1);
        expect(superManager.distanceTo(hasId)).not.toBe(3);
    });

    it('distanceToClass', function () {
        expect(person.distanceToClass(person)).toBe(0);
        expect(employee.distanceToClass(person)).toBe(1);
        expect(person.distanceToClass(employee)).toBe(-1);
        expect(manager.distanceToClass(person)).toBe(2);
        expect(superManager.distanceToClass(person)).toBe(3);
    });

    it('distanceToInterface', function () {
        expect(person.distanceToInterface(hasId)).toBe(-1);
        expect(employee.distanceToInterface(hasId)).toBe(1);
        expect(manager.distanceToInterface(hasId)).toBe(2);
        expect(superManager.distanceToInterface(hasId)).toBe(1);
        expect(superManager.distanceToInterface(hasId)).not.toBe(3);
    });

    it('getDistancesSum', function () {
        var methods = personUtil.findMethodsByName('util');
        expect(methods[0].getDistancesSum([manager, manager])).toBe(2);
        expect(methods[2].getDistancesSum([manager, manager])).toBe(0);
    });

    it('findBestMethod', function () {
        expect(personUtil.findBestMethod('util', [person, person])).toBe(null);
        expect(personUtil.findBestMethod('util', [manager, manager])).toBe(util_manager_manager);
        expect(personUtil.findBestMethod('util', [employee, manager])).toBe(util_employee_manager);
        expect(personUtil.findBestMethod('util', [employee, employee])).toBe(util_employee_employee);
    });

});

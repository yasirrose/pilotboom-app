"use strict";
exports.__esModule = true;
var testing_1 = require("@angular/core/testing");
var auth_guard_1 = require("./auth.guard");
describe('AuthGuard', function () {
    var guard;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({});
        guard = testing_1.TestBed.inject(auth_guard_1.AuthGuard);
    });
    it('should be created', function () {
        expect(guard).toBeTruthy();
    });
});

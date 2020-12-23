"use strict";
exports.__esModule = true;
var testing_1 = require("@angular/core/testing");
var rest_service_1 = require("./rest.service");
describe('RestService', function () {
    var service;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({});
        service = testing_1.TestBed.inject(rest_service_1.RestService);
    });
    it('should be created', function () {
        expect(service).toBeTruthy();
    });
});

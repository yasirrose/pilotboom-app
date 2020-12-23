"use strict";
exports.__esModule = true;
var testing_1 = require("@angular/core/testing");
var fcm_service_1 = require("./fcm.service");
describe('FcmService', function () {
    var service;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({});
        service = testing_1.TestBed.inject(fcm_service_1.FcmService);
    });
    it('should be created', function () {
        expect(service).toBeTruthy();
    });
});

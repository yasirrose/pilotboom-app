"use strict";
exports.__esModule = true;
var testing_1 = require("@angular/core/testing");
var network_service_1 = require("./network.service");
describe('NetworkService', function () {
    var service;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({});
        service = testing_1.TestBed.inject(network_service_1.NetworkService);
    });
    it('should be created', function () {
        expect(service).toBeTruthy();
    });
});

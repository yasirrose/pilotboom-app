"use strict";
exports.__esModule = true;
var testing_1 = require("@angular/core/testing");
var autoblog_service_1 = require("./autoblog.service");
describe('AutoblogService', function () {
    var service;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({});
        service = testing_1.TestBed.inject(autoblog_service_1.AutoblogService);
    });
    it('should be created', function () {
        expect(service).toBeTruthy();
    });
});

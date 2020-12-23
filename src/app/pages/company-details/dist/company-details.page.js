"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CompanyDetailsPage = void 0;
var core_1 = require("@angular/core");
var CompanyDetailsPage = /** @class */ (function () {
    function CompanyDetailsPage(api, global, globlData, router, route, alertCtrl, toastCtrl) {
        var _this = this;
        this.api = api;
        this.global = global;
        this.globlData = globlData;
        this.router = router;
        this.route = route;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.route.queryParams.subscribe(function (params) {
            _this.global.showLoading("bubbles", "Please wait...");
            if (params && params.contactId) {
                _this.getContact(params.contactId);
            }
        });
    }
    CompanyDetailsPage.prototype.ngOnInit = function () {
    };
    CompanyDetailsPage.prototype.getContact = function (id) {
        var _this = this;
        this.api.getContactDetail(id).subscribe(function (res) {
            _this.contactData = res;
            _this.global.closeLoading();
        }, function (err) {
            _this.global.checkErrorStatus(err);
        });
    };
    CompanyDetailsPage.prototype.showActivity = function () {
        var navigationExtras = {
            queryParams: this.contactData
        };
        this.router.navigate(["/contact-activities"], navigationExtras);
    };
    CompanyDetailsPage.prototype.getCountry = function () {
        var country = this.contactData.country;
        return country ? this.globlData.countries[country] : '';
    };
    CompanyDetailsPage.prototype.getState = function () {
        var country = this.contactData.country;
        var state = this.contactData.state;
        return country && state ? this.globlData.states[country][state] : '';
    };
    CompanyDetailsPage.prototype.getSource = function () {
        var source = this.contactData.source;
        return source ? this.globlData.contactSource[source] : '';
    };
    CompanyDetailsPage = __decorate([
        core_1.Component({
            selector: 'app-company-details',
            templateUrl: './company-details.page.html',
            styleUrls: ['./company-details.page.scss']
        })
    ], CompanyDetailsPage);
    return CompanyDetailsPage;
}());
exports.CompanyDetailsPage = CompanyDetailsPage;

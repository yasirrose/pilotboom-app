"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ContactDetailsPage = void 0;
var core_1 = require("@angular/core");
var ContactDetailsPage = /** @class */ (function () {
    function ContactDetailsPage(api, global, globlData, router, route, alertCtrl, toastCtrl) {
        var _this = this;
        this.api = api;
        this.global = global;
        this.globlData = globlData;
        this.router = router;
        this.route = route;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.openActSection = false;
        this.route.queryParams.subscribe(function (params) {
            _this.global.showLoading("bubbles", "Please wait...");
            if (params && params.contactId) {
                _this.contact_id = params.contactId;
                _this.getContact();
            }
        });
    }
    ContactDetailsPage.prototype.ngOnInit = function () {
    };
    ContactDetailsPage.prototype.getContact = function () {
        var _this = this;
        this.api.getContactDetail(this.contact_id).subscribe(function (res) {
            _this.contactData = res;
            _this.global.closeLoading();
        }, function (err) {
            _this.global.checkErrorStatus(err);
        });
    };
    ContactDetailsPage.prototype.showActivity = function () {
        var navigationExtras = {
            queryParams: this.contactData
        };
        this.router.navigate(["/contact-activities"], navigationExtras);
    };
    ContactDetailsPage.prototype.getCountry = function () {
        var country = this.contactData.country;
        return country ? this.globlData.countries[country] : '';
    };
    ContactDetailsPage.prototype.getState = function () {
        var country = this.contactData.country;
        var state = this.contactData.state;
        return country && state ? this.globlData.states[country][state] : '';
    };
    ContactDetailsPage.prototype.getSource = function () {
        var source = this.contactData.source;
        return source ? this.globlData.contactSource[source] : '';
    };
    ContactDetailsPage = __decorate([
        core_1.Component({
            selector: 'app-contact-details',
            templateUrl: './contact-details.page.html',
            styleUrls: ['./contact-details.page.scss']
        })
    ], ContactDetailsPage);
    return ContactDetailsPage;
}());
exports.ContactDetailsPage = ContactDetailsPage;

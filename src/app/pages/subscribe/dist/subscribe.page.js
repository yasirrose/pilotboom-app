"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SubscribePage = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var SubscribePage = /** @class */ (function () {
    function SubscribePage(api, fb, alertCtrl, toastCtrl, router, route, navCtrl, global, globalData) {
        var _this = this;
        this.api = api;
        this.fb = fb;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.router = router;
        this.route = route;
        this.navCtrl = navCtrl;
        this.global = global;
        this.globalData = globalData;
        this.validation_messages = this.globalData.validationMessages;
        this.route.queryParams.subscribe(function (params) {
            if (params && params.contactGrpId) {
                _this.groupId = params.contactGrpId;
                _this.getAllContacts();
            }
        });
    }
    SubscribePage.prototype.ngOnInit = function () {
        this.subscribeForm = this.fb.group({
            contact_ids: [[], forms_1.Validators.required]
        });
        // this.modalTitle = this.navParams.data.paramTitle;
    };
    SubscribePage.prototype.getAllContacts = function () {
        var _this = this;
        this.global.showLoading("bubbles", "Loading...");
        this.api.getCrmContacts('all').subscribe(function (res) {
            _this.allContacts = res;
            _this.global.closeLoading();
        }, function (err) {
            _this.global.checkErrorStatus(err);
        });
    };
    SubscribePage.prototype.subscribeContact = function () {
        var _this = this;
        this.global.showLoading("bubbles", "Please wait...");
        this.api.subscribeContact(this.groupId, this.subscribeForm.value.contact_ids.toString()).subscribe(function (res) {
            _this.global.closeLoading();
            _this.router.navigate(["/contact-group-subs"]);
        }, function (err) {
            _this.global.checkErrorStatus(err);
        });
    };
    SubscribePage = __decorate([
        core_1.Component({
            selector: 'app-subscribe',
            templateUrl: './subscribe.page.html',
            styleUrls: ['./subscribe.page.scss']
        })
    ], SubscribePage);
    return SubscribePage;
}());
exports.SubscribePage = SubscribePage;

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AddContactGroupPage = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var AddContactGroupPage = /** @class */ (function () {
    function AddContactGroupPage(api, fb, alertCtrl, toastCtrl, router, navCtrl, global, globalData) {
        this.api = api;
        this.fb = fb;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.router = router;
        this.navCtrl = navCtrl;
        this.global = global;
        this.globalData = globalData;
        this.toggleAdvance = false;
        this.validation_messages = this.globalData.validationMessages;
    }
    AddContactGroupPage.prototype.ngOnInit = function () {
        this.addContactGrpForm = this.fb.group({
            name: ['', forms_1.Validators.required],
            description: '',
            group_private: 0
        });
    };
    AddContactGroupPage.prototype.addContactGrp = function () {
        var _this = this;
        this.global.showLoading("bubbles", "Please wait...");
        this.api.addNewContactGroup(this.addContactGrpForm.value).subscribe(function (res) {
            _this.global.closeLoading();
            _this.router.navigate(["/contact-groups"]);
        }, function (err) {
            _this.global.checkErrorStatus(err);
        });
    };
    AddContactGroupPage = __decorate([
        core_1.Component({
            selector: 'app-add-contact-group',
            templateUrl: './add-contact-group.page.html',
            styleUrls: ['./add-contact-group.page.scss']
        })
    ], AddContactGroupPage);
    return AddContactGroupPage;
}());
exports.AddContactGroupPage = AddContactGroupPage;

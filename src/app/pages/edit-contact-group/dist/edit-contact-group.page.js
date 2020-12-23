"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.EditContactGroupPage = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var EditContactGroupPage = /** @class */ (function () {
    function EditContactGroupPage(api, global, fb, router, route, globalData) {
        var _this = this;
        this.api = api;
        this.global = global;
        this.fb = fb;
        this.router = router;
        this.route = route;
        this.globalData = globalData;
        this.toggleAdvance = false;
        this.validation_messages = this.globalData.validationMessages;
        this.route.queryParams.subscribe(function (params) {
            _this.global.showLoading("bubbles", "Please wait...");
            if (params && params.contactGrpId) {
                _this.id = params.contactGrpId;
                _this.getContactGrpDetail();
            }
        });
    }
    EditContactGroupPage.prototype.ngOnInit = function () {
        this.editContactGrpForm = this.fb.group({
            name: ['', forms_1.Validators.required],
            description: '',
            group_private: 0
        });
    };
    EditContactGroupPage.prototype.getContactGrpDetail = function () {
        var _this = this;
        this.api.getContactGroupDetail(this.id).subscribe(function (res) {
            _this.editContactGrpForm.patchValue(res);
            _this.global.closeLoading();
        }, function (err) {
            _this.global.checkErrorStatus(err);
        });
    };
    EditContactGroupPage.prototype.updateContactGrp = function () {
        var _this = this;
        this.global.showLoading("bubbles", "Please wait...");
        this.api.updateContactGroup(this.editContactGrpForm.value, this.id).subscribe(function (res) {
            _this.global.closeLoading();
            _this.router.navigate(["/contact-groups"]);
        }, function (err) {
            _this.global.checkErrorStatus(err);
        });
    };
    EditContactGroupPage = __decorate([
        core_1.Component({
            selector: 'app-edit-contact-group',
            templateUrl: './edit-contact-group.page.html',
            styleUrls: ['./edit-contact-group.page.scss']
        })
    ], EditContactGroupPage);
    return EditContactGroupPage;
}());
exports.EditContactGroupPage = EditContactGroupPage;

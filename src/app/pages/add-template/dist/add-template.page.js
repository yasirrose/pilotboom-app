"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AddTemplatePage = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var AddTemplatePage = /** @class */ (function () {
    function AddTemplatePage(api, fb, router, global, autoBlogApi, globalData) {
        this.api = api;
        this.fb = fb;
        this.router = router;
        this.global = global;
        this.autoBlogApi = autoBlogApi;
        this.globalData = globalData;
        this.toggleAdvance = false;
        this.validation_messages = this.globalData.validationMessages;
    }
    AddTemplatePage.prototype.ngOnInit = function () {
        this.addTempForm = this.fb.group({
            template: ['', forms_1.Validators.required]
        });
    };
    AddTemplatePage.prototype.addTemplate = function () {
        var _this = this;
        this.global.showLoading("bubbles", "Please wait...");
        this.autoBlogApi.addAutoBlog(this.addTempForm.value).subscribe(function (res) {
            _this.global.closeLoading();
            _this.router.navigate(["/auto-blogging"]);
        }, function (err) {
            _this.global.checkErrorStatus(err);
        });
    };
    AddTemplatePage = __decorate([
        core_1.Component({
            selector: 'app-add-template',
            templateUrl: './add-template.page.html',
            styleUrls: ['./add-template.page.scss']
        })
    ], AddTemplatePage);
    return AddTemplatePage;
}());
exports.AddTemplatePage = AddTemplatePage;

"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AddAutoblogPage = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var AddAutoblogPage = /** @class */ (function () {
    function AddAutoblogPage(api, fb, router, global, autoBlogApi, globalData) {
        this.api = api;
        this.fb = fb;
        this.router = router;
        this.global = global;
        this.autoBlogApi = autoBlogApi;
        this.globalData = globalData;
        this.toggleAdvance = false;
        this.validation_messages = this.globalData.validationMessages;
        this.global.showLoading("bubbles", "Please wait...");
        this.getAllUsers();
    }
    AddAutoblogPage.prototype.ngOnInit = function () {
        this.addAutoBlogForm = this.fb.group({
            type: "dashboard",
            title: ['', forms_1.Validators.required],
            content: '',
            excerpt: '',
            status: ['draft', forms_1.Validators.required],
            author: ['', forms_1.Validators.required]
        });
    };
    AddAutoblogPage.prototype.addAutoBlog = function () {
        var _this = this;
        this.global.showLoading("bubbles", "Please wait...");
        this.autoBlogApi.addAutoBlog(this.addAutoBlogForm.value).subscribe(function (res) {
            _this.global.closeLoading();
            _this.router.navigate(["/auto-blogging"]);
        }, function (err) {
            _this.global.checkErrorStatus(err);
        });
    };
    AddAutoblogPage.prototype.getAllUsers = function () {
        var _this = this;
        this.api.getUsers().subscribe(function (res) {
            _this.allUsers = res;
            _this.global.closeLoading();
        }, function (err) {
            _this.global.checkErrorStatus(err);
        });
    };
    AddAutoblogPage = __decorate([
        core_1.Component({
            selector: 'app-add-autoblog',
            templateUrl: './add-autoblog.page.html',
            styleUrls: ['./add-autoblog.page.scss']
        })
    ], AddAutoblogPage);
    return AddAutoblogPage;
}());
exports.AddAutoblogPage = AddAutoblogPage;

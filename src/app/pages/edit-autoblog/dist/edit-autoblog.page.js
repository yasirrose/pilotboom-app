"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.EditAutoblogPage = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var EditAutoblogPage = /** @class */ (function () {
    function EditAutoblogPage(api, fb, router, route, global, autoBlogApi, globalData) {
        var _this = this;
        this.api = api;
        this.fb = fb;
        this.router = router;
        this.route = route;
        this.global = global;
        this.autoBlogApi = autoBlogApi;
        this.globalData = globalData;
        this.validation_messages = this.globalData.validationMessages;
        this.route.queryParams.subscribe(function (params) {
            _this.global.showLoading("bubbles", "Please wait...");
            if (params && params.blogId) {
                _this.id = params.blogId;
                _this.getBlog();
            }
        });
    }
    EditAutoblogPage.prototype.ngOnInit = function () {
        this.editAutoBlogForm = this.fb.group({
            type: "dashboard",
            title: ['', forms_1.Validators.required],
            content: '',
            excerpt: '',
            status: ['', forms_1.Validators.required],
            author: ['', forms_1.Validators.required]
        });
    };
    EditAutoblogPage.prototype.getBlog = function () {
        var _this = this;
        this.autoBlogApi.getAutoBlogDetail(this.id).subscribe(function (res) {
            _this.blogData = res;
            _this.blogData.title = _this.global.stripHtmlTags(_this.blogData.title.rendered);
            _this.blogData.content = _this.global.stripHtmlTags(_this.blogData.content.rendered);
            _this.blogData.excerpt = _this.global.stripHtmlTags(_this.blogData.excerpt.rendered);
            _this.api.getUsers().subscribe(function (res) {
                _this.allUsers = res;
                _this.blogData.author = _this.global.filterObjectByValue(res, 'name', _this.blogData.author, 'get')[0].id.toString();
                _this.editAutoBlogForm.patchValue(_this.blogData);
                _this.global.closeLoading();
            }, function (err) {
                _this.global.checkErrorStatus(err);
            });
        }, function (err) {
            _this.global.checkErrorStatus(err);
        });
    };
    EditAutoblogPage.prototype.updateAutoBlog = function () {
        var _this = this;
        this.global.showLoading("bubbles", "Please wait...");
        this.autoBlogApi.updateAutoBlog(this.editAutoBlogForm.value, this.id).subscribe(function (res) {
            _this.global.closeLoading();
            _this.router.navigate(["/auto-blogging"]);
        }, function (err) {
            _this.global.checkErrorStatus(err);
        });
    };
    EditAutoblogPage = __decorate([
        core_1.Component({
            selector: 'app-edit-autoblog',
            templateUrl: './edit-autoblog.page.html',
            styleUrls: ['./edit-autoblog.page.scss']
        })
    ], EditAutoblogPage);
    return EditAutoblogPage;
}());
exports.EditAutoblogPage = EditAutoblogPage;

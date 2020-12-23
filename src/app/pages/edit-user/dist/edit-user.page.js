"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.EditUserPage = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var EditUserPage = /** @class */ (function () {
    function EditUserPage(userApi, fb, alertCtrl, toastCtrl, router, route, navCtrl, global, globalData) {
        var _this = this;
        this.userApi = userApi;
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
            _this.global.showLoading("bubbles", "Please wait...");
            if (params && params.userId) {
                _this.id = params.userId;
                _this.getUserDetail();
            }
        });
    }
    EditUserPage.prototype.ngOnInit = function () {
        this.editUserForm = this.fb.group({
            username: ['', forms_1.Validators.required],
            email: [
                '',
                forms_1.Validators.compose([
                    forms_1.Validators.required,
                    forms_1.Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
                ])
            ],
            name: '',
            first_name: '',
            last_name: '',
            url: '',
            description: '',
            roles: ['subscriber'],
            password: [
                '',
                forms_1.Validators.minLength(5)
            ]
        });
    };
    EditUserPage.prototype.getUserDetail = function () {
        var _this = this;
        this.userApi.getUserDetails(this.id).subscribe(function (response) {
            _this.userData = response;
            var res = response;
            res.username = res.data.user_login;
            res.email = res.data.user_email;
            res.name = res.data.display_name;
            res.first_name = res.data.metadata.first_name[0];
            res.last_name = res.data.metadata.last_name[0];
            res.description = res.data.metadata.description[0];
            res.url = res.data.user_url;
            _this.editUserForm.patchValue(res);
            _this.global.closeLoading();
        }, function (err) {
            _this.global.checkErrorStatus(err);
        });
    };
    EditUserPage.prototype.updateUser = function () {
        var _this = this;
        if (this.editUserForm.value.password == '') {
            this.editUserForm.value.password = this.userData.data.user_pass;
        }
        this.global.showLoading("bubbles", "Please wait...");
        this.userApi.updateUser(this.editUserForm.value, this.id).subscribe(function (res) {
            _this.global.closeLoading();
            _this.global.presentToast('User updated successfully.');
            _this.router.navigate(["/users"]);
        }, function (err) {
            _this.global.checkErrorStatus(err);
        });
    };
    EditUserPage = __decorate([
        core_1.Component({
            selector: 'app-edit-user',
            templateUrl: './edit-user.page.html',
            styleUrls: ['./edit-user.page.scss']
        })
    ], EditUserPage);
    return EditUserPage;
}());
exports.EditUserPage = EditUserPage;
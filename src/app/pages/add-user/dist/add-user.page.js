"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AddUserPage = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var AddUserPage = /** @class */ (function () {
    function AddUserPage(userApi, fb, alertCtrl, toastCtrl, router, navCtrl, global, globalData) {
        this.userApi = userApi;
        this.fb = fb;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.router = router;
        this.navCtrl = navCtrl;
        this.global = global;
        this.globalData = globalData;
        // toggleAdvance = false;
        // allUsers = [];
        this.validation_messages = this.globalData.validationMessages;
    }
    AddUserPage.prototype.ngOnInit = function () {
        this.addUserForm = this.fb.group({
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
                forms_1.Validators.compose([
                    forms_1.Validators.required,
                    forms_1.Validators.minLength(5),
                ])
            ]
        });
    };
    AddUserPage.prototype.addUser = function () {
        var _this = this;
        this.global.showLoading("bubbles", "Please wait...");
        this.userApi.addUser(this.addUserForm.value).subscribe(function (res) {
            _this.global.closeLoading();
            _this.global.presentToast('User added successfully.');
            _this.router.navigate(["/users"]);
        }, function (err) {
            _this.global.checkErrorStatus(err);
        });
    };
    AddUserPage = __decorate([
        core_1.Component({
            selector: 'app-add-user',
            templateUrl: './add-user.page.html',
            styleUrls: ['./add-user.page.scss']
        })
    ], AddUserPage);
    return AddUserPage;
}());
exports.AddUserPage = AddUserPage;
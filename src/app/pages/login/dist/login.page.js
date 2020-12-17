"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.LoginPage = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var LoginPage = /** @class */ (function () {
    function LoginPage(platform, api, fb, alertCtrl, toastCtrl, router, global, chatApi) {
        this.platform = platform;
        this.api = api;
        this.fb = fb;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.router = router;
        this.global = global;
        this.chatApi = chatApi;
        this.validation_messages = this.global.getValidationMessages();
        this.passwordType = 'password';
        this.passwordIcon = 'eye';
    }
    LoginPage.prototype.ngOnInit = function () {
        this.userForm = this.fb.group({
            username: ['', forms_1.Validators.required],
            website: ['', forms_1.Validators.required],
            email: '',
            password: ['', forms_1.Validators.required]
        });
    };
    LoginPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.subscription = this.platform.backButton.subscribe(function () {
            _this.global.confirmExitApp();
        });
    };
    LoginPage.prototype.ionViewWillLeave = function () {
        this.subscription.unsubscribe();
    };
    LoginPage.prototype.login = function () {
        var _this = this;
        if (!this.global.checkConnection()) {
            return false;
        }
        else {
            this.global.showLoading("bubbles", "Logging in...");
            this.api.getMasterData(this.userForm.value.website).subscribe(function (res) {
                _this.global.setUserDomain(_this.userForm.value.website);
                _this.api.signIn(_this.userForm.value.username, _this.userForm.value.password).subscribe(function (res) {
                    _this.chatApi.saveToken().subscribe();
                    _this.global.closeLoading();
                }, function (err) {
                    _this.processLoginError(err);
                });
            });
        }
    };
    LoginPage.prototype.signUp = function () {
        var _this = this;
        this.api.signUp(this.userForm.value.username, this.userForm.value.email, this.userForm.value.password).subscribe(function (res) { return __awaiter(_this, void 0, void 0, function () {
            var toast;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastCtrl.create({
                            message: res['message'],
                            duration: 3000
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        }); }, function (err) {
            _this.global.checkErrorStatus(err);
        });
    };
    LoginPage.prototype.openPwReset = function () {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertCtrl.create({
                            header: 'Forgot password?',
                            message: 'Enter your email or username to retrieve a new password',
                            inputs: [
                                {
                                    type: 'text',
                                    name: 'usernameOrEmail'
                                }
                            ],
                            buttons: [
                                {
                                    role: 'cancel',
                                    text: 'Back'
                                },
                                {
                                    text: 'Reset Password',
                                    handler: function (data) {
                                        _this.resetPw(data['usernameOrEmail']);
                                    }
                                }
                            ]
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    LoginPage.prototype.resetPw = function (usernameOrEmail) {
        var _this = this;
        this.api.resetPassword(usernameOrEmail).subscribe(function (res) { return __awaiter(_this, void 0, void 0, function () {
            var toast;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastCtrl.create({
                            message: res['message'],
                            duration: 2000
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        }); }, function (err) {
            _this.global.checkErrorStatus(err);
        });
    };
    LoginPage.prototype.hideShowPassword = function () {
        this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
        this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
    };
    LoginPage.prototype.forgotPassword = function () {
        this.global.InAppBrowser(this.global.getBaseUrl() + "/wp-login.php?action=lostpassword");
    };
    LoginPage.prototype.processLoginError = function (err) {
        if (err.status == 403) {
            if (err.error.code.indexOf('incorrect_password') > -1) {
                err.error.message = 'The password you entered is incorrect. Please try again.';
            }
        }
        this.global.checkErrorStatus(err, 'Login Failed', false, true);
    };
    LoginPage = __decorate([
        core_1.Component({
            selector: 'app-login',
            templateUrl: './login.page.html',
            styleUrls: ['./login.page.scss']
        })
    ], LoginPage);
    return LoginPage;
}());
exports.LoginPage = LoginPage;

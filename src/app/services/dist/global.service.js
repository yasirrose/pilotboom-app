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
exports.GlobalService = void 0;
var core_1 = require("@angular/core");
var environment_1 = require("../../environments/environment");
var rxjs_1 = require("rxjs");
var JWT_KEY = '#|TS9!T&v5%12?Iu(q|]O^K|<Pmxw#RK{) JXn*b,,}fIrnV,5u:)UIqMAql<fwV';
var GlobalService = /** @class */ (function () {
    function GlobalService(router, storage, _santizer, loadingCtrl, alertCtrl, toastCtrl, network, iab, plt) {
        this.router = router;
        this.storage = storage;
        this._santizer = _santizer;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.network = network;
        this.iab = iab;
        this.plt = plt;
        this.is_notif = false;
        this.user = new rxjs_1.BehaviorSubject(null);
    }
    GlobalService.prototype.showLoading = function (spinner, message) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        // if (!environment.showloader) {
                        // 	return false;
                        // }
                        _a = this;
                        return [4 /*yield*/, this.loadingCtrl.create({
                                spinner: spinner,
                                message: message
                            })];
                    case 1:
                        // if (!environment.showloader) {
                        // 	return false;
                        // }
                        _a.loading = _b.sent();
                        return [4 /*yield*/, this.loading.present()];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    GlobalService.prototype.closeLoading = function () {
        if (this.loading) {
            this.loading.dismiss();
        }
    };
    GlobalService.prototype.alertMessage = function (header, message, buttons, cssClass) {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertCtrl.create({
                            header: header,
                            message: message,
                            buttons: [buttons],
                            cssClass: cssClass,
                            mode: "md"
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
    GlobalService.prototype.getSafeHtml = function (value) {
        return this._santizer.bypassSecurityTrustHtml(value);
    };
    GlobalService.prototype.InAppBrowser = function (link) {
        // const openingMode = "_blank";
        var browser = this.iab.create(link);
        // browser.executeScript(...);
        // browser.insertCSS(...);
        browser.on('loadstop').subscribe(function (event) {
            browser.insertCSS({ code: "body{color: red;" });
        });
    };
    GlobalService.prototype.InAppBrowserClose = function () {
        this.browser.close();
    };
    GlobalService.prototype.getValidationMessages = function () {
        return {
            'username': [
                { type: 'required', message: 'Username/Email is required.' },
                { type: 'minlength', message: 'Username must be at least 5 characters long.' },
                { type: 'maxlength', message: 'Username cannot be more than 25 characters long.' },
                { type: 'pattern', message: 'Your username must contain only numbers and letters.' },
                { type: 'validUsername', message: 'Your username has already been taken.' }
            ],
            'name': [
                { type: 'required', message: 'Name is required.' }
            ],
            'first_name': [
                { type: 'required', message: 'First name is required.' }
            ],
            'last_name': [
                { type: 'required', message: 'Last name is required.' }
            ],
            'email': [
                { type: 'required', message: 'Email is required.' },
                { type: 'pattern', message: 'Please enter a valid email.' }
            ],
            'phone': [
                { type: 'required', message: 'Phone is required.' },
                { type: 'validCountryPhone', message: 'The phone is incorrect for the selected country.' }
            ],
            'password': [
                { type: 'required', message: 'Password is required.' },
                { type: 'minlength', message: 'Password must be at least 5 characters long.' },
                { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number.' }
            ],
            'confirm_password': [
                { type: 'required', message: 'Confirm password is required.' }
            ],
            'matching_passwords': [
                { type: 'areEqual', message: 'Password mismatch.' }
            ],
            'terms': [
                { type: 'pattern', message: 'You must accept terms and conditions.' }
            ],
            'owner': [
                { type: 'required', message: 'Contact owner is required.' }
            ],
            'life_stage': [
                { type: 'required', message: 'Life Stage is required.' }
            ],
            'company': [
                { type: 'required', message: 'Company Name is required.' }
            ],
            'contact_ids': [
                { type: 'required', message: 'At Least one Contact is required.' }
            ],
            'website': [
                { type: 'required', message: 'Website name is required.' }
            ]
        };
    };
    GlobalService.prototype.showPopup = function (header, message, exitApp) {
        if (exitApp === void 0) { exitApp = false; }
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.closeLoading();
                        return [4 /*yield*/, this.alertCtrl.create({
                                header: header,
                                message: message,
                                buttons: exitApp ?
                                    [
                                        {
                                            text: 'OK',
                                            handler: function () {
                                                navigator['app'].exitApp();
                                            }
                                        }
                                    ] :
                                    ['OK']
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
    GlobalService.prototype.presentToast = function (message, duration) {
        if (duration === void 0) { duration = 2000; }
        return __awaiter(this, void 0, void 0, function () {
            var toast;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastCtrl.create({
                            message: message,
                            duration: duration
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    GlobalService.prototype.checkErrorStatus = function (error, header, exitApp, login) {
        var _this = this;
        if (header === void 0) { header = 'Failed'; }
        if (exitApp === void 0) { exitApp = false; }
        if (login === void 0) { login = false; }
        this.closeLoading();
        if (!this.checkConnection()) {
            return false;
        }
        if ((error.status == 403 || error.status == 401) && !login) {
            this.storage.remove(JWT_KEY).then(function () {
                _this.router.navigate(["/login"]);
            });
        }
        else {
            this.showPopup(header, error.error.message, exitApp);
        }
    };
    GlobalService.prototype.filterObjectByValue = function (objArray, key, value, type) {
        if (type === void 0) { type = 'remove'; }
        return objArray.filter(function (obj) {
            if (type == 'remove') {
                return obj[key] != value;
            }
            else if (type == 'get') {
                return obj[key] == value;
            }
        });
    };
    GlobalService.prototype.filterSearch = function (objArray, value, key1, key2) {
        return objArray.filter(function (obj) {
            if (key2) {
                return (obj[key1].toLowerCase().indexOf(value.toLowerCase()) > -1 || obj[key2].toLowerCase().indexOf(value.toLowerCase()) > -1);
            }
            else {
                return obj[key1].toLowerCase().indexOf(value.toLowerCase()) > -1;
            }
        });
    };
    GlobalService.prototype.stripHtmlTags = function (text) {
        return text ? String(text).replace(/<[^>]+>/gm, '') : '';
    };
    GlobalService.prototype.checkConnection = function (exitApp) {
        if (exitApp === void 0) { exitApp = false; }
        if (this.network.getConnectionType() == "none") {
            this.closeLoading();
            this.showPopup("Network connection error", "Please check your internet connection and try again.", exitApp);
            return false;
        }
        else {
            return true;
        }
    };
    GlobalService.prototype.confirmExitApp = function (confirm) {
        if (confirm === void 0) { confirm = true; }
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!confirm) {
                            navigator['app'].exitApp();
                            return [2 /*return*/, false];
                        }
                        return [4 /*yield*/, this.alertCtrl.create({
                                header: 'Pilotboom',
                                message: 'Are you sure you want to exit?',
                                buttons: [
                                    {
                                        text: 'Cancel',
                                        role: 'cancel',
                                        handler: function () {
                                        }
                                    },
                                    {
                                        text: 'Exit',
                                        handler: function () { return __awaiter(_this, void 0, void 0, function () {
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0: return [4 /*yield*/, alert.onDidDismiss().then(function () {
                                                            navigator['app'].exitApp();
                                                        })];
                                                    case 1:
                                                        _a.sent();
                                                        return [2 /*return*/];
                                                }
                                            });
                                        }); }
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
    GlobalService.prototype.setDeviceToken = function (token) {
        this.device_token = token.value;
    };
    GlobalService.prototype.getDeviceToken = function () {
        return this.device_token;
    };
    GlobalService.prototype.setUserDomain = function (domain) {
        localStorage.setItem('capUserDom', domain);
    };
    GlobalService.prototype.getUserDomain = function () {
        return localStorage.getItem('capUserDom');
    };
    GlobalService.prototype.getBaseUrl = function () {
        return environment_1.environment.production ? "https://" + this.getUserDomain() + ".pilotboom.com" : "http://localhost/pilotboom";
    };
    GlobalService.prototype.getApiUrl = function () {
        var base = this.getBaseUrl();
        return base + "/wp-json";
    };
    GlobalService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], GlobalService);
    return GlobalService;
}());
exports.GlobalService = GlobalService;

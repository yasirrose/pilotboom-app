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
exports.CompaniesPage = void 0;
var core_1 = require("@angular/core");
var angular_1 = require("@ionic/angular");
var CompaniesPage = /** @class */ (function () {
    function CompaniesPage(api, global, router, alertCtrl, toastCtrl, navCtrl, navParam) {
        this.api = api;
        this.global = global;
        this.router = router;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.navCtrl = navCtrl;
        this.navParam = navParam;
        this.categories = 'All';
        this.companiesData = [];
        this.all = [];
        this.customer = [];
        this.lead = [];
        this.opportunity = [];
        this.subscriber = [];
        // trash = [];
        this.loadView = false;
        this.page = 1;
        this.per_page = 10;
        this.hasMore = true;
        this.search = false;
        this.searchTerm = '';
        this.searching = false;
    }
    CompaniesPage.prototype.ngOnInit = function () {
    };
    CompaniesPage.prototype.ionViewDidEnter = function () {
        this.resetData();
        this.global.showLoading("bubbles", "Loading...");
        this.getContacts();
    };
    CompaniesPage.prototype.resetData = function () {
        this.hasMore = true;
        this.page = 1;
        this.per_page = 10;
        this.content.scrollToTop();
    };
    CompaniesPage.prototype.clearSearch = function () {
        this.search = false;
        this.searchTerm = '';
        this.searching = false;
    };
    CompaniesPage.prototype.getContacts = function (event, refresh) {
        var _this = this;
        this.api.getCrmContacts('company', 'all', this.per_page, this.page).subscribe(function (res) {
            // let all_length = res.length;
            _this.hasMore = res.length < _this.per_page ? false : true;
            if (!event || refresh) {
                _this.companiesData = [];
                _this.clearSearch();
            }
            _this.companiesData = _this.companiesData.concat(res);
            if (event && _this.search && _this.searchTerm) { //Pagination called and search exists already
                var filtered = _this.global.filterSearch(_this.companiesData, _this.searchTerm, 'first_name');
                _this.setData(filtered);
            }
            else {
                _this.setData(_this.companiesData);
            }
            event ? event.target.complete() : '';
            _this.loadView = true;
            _this.global.closeLoading();
            // //Getting Trashed Contacts
            // this.api.getCrmContacts('company', 'trash', this.per_page, this.page).subscribe(trashed => {
            // 	this.hasMore = all_length < this.per_page && trashed.length < this.per_page ? false : true;
            // 	event ? event.target.complete() : '';
            // 	this.trash = this.trash.concat(trashed);
            // 	this.global.closeLoading();
            // });
        }, function (err) {
            event ? event.target.complete() : '';
            _this.global.checkErrorStatus(err);
        });
    };
    CompaniesPage.prototype.setData = function (contactData) {
        this.all = [];
        this.customer = [];
        this.lead = [];
        this.opportunity = [];
        this.subscriber = [];
        this.all = contactData;
        for (var i = 0; i < contactData.length; i++) {
            var elem = contactData[i];
            this[elem.life_stage].push(elem);
        }
    };
    CompaniesPage.prototype.getDetail = function (event, id) {
        var navigationExtras = {
            queryParams: {
                contactId: id
            }
        };
        this.router.navigate(["/company-details"], navigationExtras);
    };
    CompaniesPage.prototype.editContact = function (event, id) {
        var navigationExtras = {
            queryParams: {
                contactId: id
            }
        };
        this.router.navigate(["/edit-company"], navigationExtras);
    };
    CompaniesPage.prototype["delete"] = function (event, id) {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertCtrl.create({
                            header: 'Confirm Delete',
                            message: 'Do you really want to delete this company?',
                            buttons: [
                                {
                                    text: 'Cancel',
                                    role: 'cancel',
                                    handler: function () {
                                    }
                                },
                                {
                                    text: 'Delete',
                                    handler: function () {
                                        _this.global.showLoading("bubbles", "Please wait...");
                                        _this.api.deleteCompany(id).subscribe(function (res) {
                                            _this.companiesData = _this.global.filterObjectByValue(_this.companiesData, 'id', id, 'remove');
                                            _this.setData(_this.companiesData);
                                            // this.trash.unshift(res);
                                            _this.global.closeLoading();
                                        }, function (err) {
                                            _this.global.checkErrorStatus(err);
                                        });
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
    CompaniesPage.prototype.permanentDelete = function (event, id) {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertCtrl.create({
                            header: 'Confirm Delete',
                            message: 'Do you really want to delete this contact permanently?',
                            buttons: [
                                {
                                    text: 'Cancel',
                                    role: 'cancel',
                                    handler: function () {
                                    }
                                },
                                {
                                    text: 'Delete',
                                    handler: function () {
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
    CompaniesPage.prototype.loadMore = function (event) {
        this.page++;
        this.getContacts(event);
    };
    CompaniesPage.prototype.doRefresh = function (event) {
        this.resetData();
        this.getContacts(event, true);
    };
    CompaniesPage.prototype.enableSearch = function (evt) {
        this.search = !this.search;
        if (!this.search) {
            this.searchTerm = '';
        }
    };
    CompaniesPage.prototype.filterItems = function (evt) {
        var _this = this;
        this.searching = true;
        var filtered = this.global.filterSearch(this.companiesData, this.searchTerm, 'first_name');
        setTimeout(function () {
            _this.setData(filtered);
            _this.searching = false;
        }, 300);
    };
    __decorate([
        core_1.ViewChild(angular_1.IonContent)
    ], CompaniesPage.prototype, "content");
    CompaniesPage = __decorate([
        core_1.Component({
            selector: 'app-companies',
            templateUrl: './companies.page.html',
            styleUrls: ['./companies.page.scss'],
            providers: [angular_1.NavParams]
        })
    ], CompaniesPage);
    return CompaniesPage;
}());
exports.CompaniesPage = CompaniesPage;

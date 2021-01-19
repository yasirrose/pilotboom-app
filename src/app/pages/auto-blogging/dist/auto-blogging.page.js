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
exports.AutoBloggingPage = void 0;
var core_1 = require("@angular/core");
var angular_1 = require("@ionic/angular");
var AutoBloggingPage = /** @class */ (function () {
    function AutoBloggingPage(router, global, autoBlogApi, alertCtrl, toastCtrl, navCtrl, navParam) {
        this.router = router;
        this.global = global;
        this.autoBlogApi = autoBlogApi;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.navCtrl = navCtrl;
        this.navParam = navParam;
        this.postsData = [];
        this.posts = [];
        this.loadView = false;
        this.page = 1;
        this.per_page = 10;
        this.hasMore = true;
        this.search = false;
        this.searchTerm = '';
        this.searching = false;
    }
    AutoBloggingPage.prototype.ngOnInit = function () {
    };
    AutoBloggingPage.prototype.ionViewDidEnter = function () {
        this.resetData();
        this.global.showLoading("bubbles", "Loading...");
        this.loadAutoBlogging();
    };
    AutoBloggingPage.prototype.resetData = function () {
        this.hasMore = true;
        this.page = 1;
        this.per_page = 10;
        this.content.scrollToTop();
    };
    AutoBloggingPage.prototype.clearSearch = function () {
        this.search = false;
        this.searchTerm = '';
        this.searching = false;
    };
    AutoBloggingPage.prototype.loadAutoBlogging = function (event, refresh) {
        var _this = this;
        this.autoBlogApi.getAutoBlog(this.per_page, this.page).subscribe(function (res) {
            _this.hasMore = res.length < _this.per_page ? false : true;
            if (!event || refresh) {
                _this.postsData = [];
                _this.clearSearch();
            }
            _this.postsData = _this.postsData.concat(res);
            if (event && _this.search && _this.searchTerm) { //Pagination called and search exists already
                _this.posts = _this.filterSearch(_this.postsData, _this.searchTerm);
            }
            else {
                _this.posts = _this.postsData;
            }
            event ? event.target.complete() : '';
            _this.global.closeLoading();
            _this.loadView = true;
        }, function (err) {
            event ? event.target.complete() : '';
            _this.global.checkErrorStatus(err);
        });
    };
    AutoBloggingPage.prototype.getDetail = function (event, id) {
        var navigationExtras = {
            queryParams: {
                blogId: id
            }
        };
        this.router.navigate(["/autoblog-details"], navigationExtras);
    };
    AutoBloggingPage.prototype.editAutoBlog = function (event, id) {
        var navigationExtras = {
            queryParams: {
                blogId: id
            }
        };
        this.router.navigate(["/edit-autoblog"], navigationExtras);
    };
    AutoBloggingPage.prototype["delete"] = function (event, id) {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertCtrl.create({
                            header: 'Confirm Delete',
                            message: 'Do you really want to delete this post?',
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
                                        _this.autoBlogApi["delete"](id).subscribe(function (res) {
                                            _this.posts = _this.global.filterObjectByValue(_this.posts, 'id', id, 'remove');
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
    AutoBloggingPage.prototype.loadMore = function (event) {
        this.page++;
        this.loadAutoBlogging(event);
    };
    AutoBloggingPage.prototype.doRefresh = function (event) {
        this.resetData();
        this.loadAutoBlogging(event, true);
    };
    AutoBloggingPage.prototype.enableSearch = function (evt) {
        this.search = !this.search;
        if (!this.search) {
            this.searchTerm = '';
        }
    };
    AutoBloggingPage.prototype.filterItems = function (evt) {
        var _this = this;
        this.searching = true;
        var filtered = this.filterSearch(this.postsData, this.searchTerm);
        setTimeout(function () {
            _this.posts = filtered;
            _this.searching = false;
        }, 300);
    };
    AutoBloggingPage.prototype.filterSearch = function (objArray, value) {
        return objArray.filter(function (obj) {
            return obj.title.rendered.toLowerCase().indexOf(value.toLowerCase()) > -1;
        });
    };
    __decorate([
        core_1.ViewChild(angular_1.IonContent)
    ], AutoBloggingPage.prototype, "content");
    AutoBloggingPage = __decorate([
        core_1.Component({
            selector: 'app-auto-blogging',
            templateUrl: './auto-blogging.page.html',
            styleUrls: ['./auto-blogging.page.scss'],
            providers: [angular_1.NavParams]
        })
    ], AutoBloggingPage);
    return AutoBloggingPage;
}());
exports.AutoBloggingPage = AutoBloggingPage;
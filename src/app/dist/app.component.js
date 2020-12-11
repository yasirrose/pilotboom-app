"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppComponent = void 0;
var core_1 = require("@angular/core");
var core_2 = require("@capacitor/core");
var PushNotifications = core_2.Plugins.PushNotifications;
var AppComponent = /** @class */ (function () {
    function AppComponent(platform, splashScreen, statusBar, api, router, fcmService, global) {
        this.platform = platform;
        this.splashScreen = splashScreen;
        this.statusBar = statusBar;
        this.api = api;
        this.router = router;
        this.fcmService = fcmService;
        this.global = global;
        this.versionNo = '1.0.0';
        this.user = this.api.getCurrentUser();
        this.initializeApp();
    }
    AppComponent.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            _this.user.subscribe(function (user) {
                if (user) {
                    _this.userData = _this.api.getCurrentUserData();
                    if (!_this.global.is_notif) {
                        _this.router.navigate(["/dashboard"]);
                    }
                    else {
                        _this.global.is_notif = false;
                    }
                }
            });
            _this.statusBar.styleDefault();
            _this.splashScreen.hide();
            // Trigger the push setup 
            _this.fcmService.initPush();
        });
    };
    AppComponent.prototype.logout = function () {
        this.api.logout();
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: 'app-root',
            templateUrl: 'app.component.html',
            styleUrls: ['app.component.scss']
        })
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;

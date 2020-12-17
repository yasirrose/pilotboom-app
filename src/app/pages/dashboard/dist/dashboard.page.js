"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.DashboardPage = void 0;
var core_1 = require("@angular/core");
var angular_1 = require("@ionic/angular");
var DashboardPage = /** @class */ (function () {
    function DashboardPage(platform, api, global, router, alertCtrl, toastCtrl, navCtrl, navParam) {
        this.platform = platform;
        this.api = api;
        this.global = global;
        this.router = router;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.navCtrl = navCtrl;
        this.navParam = navParam;
        this.contact = 0;
        this.contact_customer = 0;
        this.contact_lead = 0;
        this.contact_opportunity = 0;
        this.contact_subscriber = 0;
        this.company = 0;
        this.company_customer = 0;
        this.company_lead = 0;
        this.company_opportunity = 0;
        this.company_subscriber = 0;
        this.loadView = false;
    }
    DashboardPage.prototype.ngOnInit = function () {
    };
    DashboardPage.prototype.ionViewDidEnter = function () {
        // this.api.logout();
        this.global.showLoading("bubbles", "Loading...");
        this.getDashboardInfo();
        var gb = this.global;
        this.platform.backButton.subscribeWithPriority(99999, function () {
            document.addEventListener('backbutton', function (event) {
                event.preventDefault();
                event.stopPropagation();
                // gb.presentToast('Press back button again to exit');
                navigator['app'].exitApp();
            }, false);
        });
    };
    DashboardPage.prototype.userLogout = function () {
        this.api.logout();
    };
    DashboardPage.prototype.getDashboardInfo = function (event) {
        var _this = this;
        this.api.CountCrmContacts().subscribe(function (res) {
            event ? event.target.complete() : '';
            _this.resetData();
            _this.setData(res);
            _this.loadView = true;
            _this.global.closeLoading();
        }, function (err) {
            event ? event.target.complete() : '';
            _this.global.checkErrorStatus(err);
        });
    };
    DashboardPage.prototype.resetData = function () {
        this.contact = 0;
        this.contact_customer = 0;
        this.contact_lead = 0;
        this.contact_opportunity = 0;
        this.contact_subscriber = 0;
        this.company = 0;
        this.company_customer = 0;
        this.company_lead = 0;
        this.company_opportunity = 0;
        this.company_subscriber = 0;
    };
    DashboardPage.prototype.setData = function (data) {
        this.contact = data.contact.all.count;
        this.contact_customer = data.contact.customer.count;
        this.contact_lead = data.contact.lead.count;
        this.contact_opportunity = data.contact.opportunity.count;
        this.contact_subscriber = data.contact.subscriber.count;
        this.company = data.company.all.count;
        this.company_customer = data.company.customer.count;
        this.company_lead = data.company.lead.count;
        this.company_opportunity = data.company.opportunity.count;
        this.company_subscriber = data.company.subscriber.count;
    };
    DashboardPage.prototype.doRefresh = function (event) {
        this.getDashboardInfo(event);
    };
    DashboardPage = __decorate([
        core_1.Component({
            selector: 'app-dashboard',
            templateUrl: './dashboard.page.html',
            styleUrls: ['./dashboard.page.scss'],
            providers: [angular_1.NavParams]
        })
    ], DashboardPage);
    return DashboardPage;
}());
exports.DashboardPage = DashboardPage;

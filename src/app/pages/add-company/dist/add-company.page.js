"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AddCompanyPage = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var AddCompanyPage = /** @class */ (function () {
    function AddCompanyPage(api, fb, alertCtrl, toastCtrl, router, navCtrl, global, globalData) {
        this.api = api;
        this.fb = fb;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.router = router;
        this.navCtrl = navCtrl;
        this.global = global;
        this.globalData = globalData;
        this.toggleAdvance = false;
        this.allUsers = [];
        this.validation_messages = this.globalData.validationMessages;
        this.sources = this.globalData.contactSource;
        this.global.showLoading("bubbles", "Please wait...");
        this.getAllUsers();
    }
    AddCompanyPage.prototype.ngOnInit = function () {
        this.addCompanyForm = this.fb.group({
            type: "company",
            company: ['', forms_1.Validators.required],
            email: [
                '',
                forms_1.Validators.compose([
                    forms_1.Validators.required,
                    forms_1.Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
                ])
            ],
            phone: '',
            life_stage: ['', forms_1.Validators.required],
            owner: ['', forms_1.Validators.required],
            mobile: '',
            other: '',
            website: '',
            fax: '',
            notes: '',
            street_1: '',
            street_2: '',
            city: '',
            state: '',
            postal_code: '',
            country: '',
            currency: '',
            date_of_birth: '',
            contact_age: '',
            source: '',
            facebook: '',
            twitter: '',
            googleplus: '',
            linkedin: ''
        });
    };
    AddCompanyPage.prototype.ionViewDidEnter = function () {
        this.countries = this.globalData.countries;
    };
    AddCompanyPage.prototype.getAllUsers = function () {
        var _this = this;
        this.api.getUsers().subscribe(function (res) {
            _this.allUsers = res;
            _this.global.closeLoading();
        }, function (err) {
            _this.global.checkErrorStatus(err);
        });
    };
    AddCompanyPage.prototype.addContact = function () {
        var _this = this;
        this.global.showLoading("bubbles", "Please wait...");
        this.api.addNewCompany(this.addCompanyForm.value).subscribe(function (res) {
            _this.global.closeLoading();
            _this.router.navigate(["/companies"]);
        }, function (err) {
            _this.processError(err);
        });
    };
    AddCompanyPage.prototype.getStates = function () {
        console.log('Here');
        var country = this.addCompanyForm.value.country;
        this.states = this.globalData.states[country];
    };
    AddCompanyPage.prototype.returnZero = function () {
        // to disable the default sorting behaviour of keyvalue
        return 0;
    };
    AddCompanyPage.prototype.processError = function (err) {
        if (err.status == 500) {
            err.error.message = 'Please enter valid information.';
        }
        this.global.checkErrorStatus(err);
    };
    AddCompanyPage = __decorate([
        core_1.Component({
            selector: 'app-add-company',
            templateUrl: './add-company.page.html',
            styleUrls: ['./add-company.page.scss']
        })
    ], AddCompanyPage);
    return AddCompanyPage;
}());
exports.AddCompanyPage = AddCompanyPage;

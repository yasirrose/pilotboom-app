"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.EditCompanyPage = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var EditCompanyPage = /** @class */ (function () {
    function EditCompanyPage(api, global, globalData, fb, alertCtrl, toastCtrl, router, route, navCtrl) {
        var _this = this;
        this.api = api;
        this.global = global;
        this.globalData = globalData;
        this.fb = fb;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.router = router;
        this.route = route;
        this.navCtrl = navCtrl;
        this.allUsers = [];
        this.validation_messages = this.globalData.validationMessages;
        this.sources = this.globalData.contactSource;
        this.loadView = false;
        this.route.queryParams.subscribe(function (params) {
            _this.global.showLoading("bubbles", "Please wait...");
            if (params && params.contactId) {
                _this.id = params.contactId;
                _this.getContactDetail();
                _this.getAllUsers();
            }
        });
    }
    EditCompanyPage.prototype.ngOnInit = function () {
        this.editCompanyForm = this.fb.group({
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
            user_id: '',
            date_of_birth: '',
            contact_age: '',
            source: '',
            facebook: '',
            twitter: '',
            googleplus: '',
            linkedin: ''
        });
    };
    EditCompanyPage.prototype.ionViewDidEnter = function () {
        this.countries = this.globalData.countries;
    };
    EditCompanyPage.prototype.getContactDetail = function () {
        var _this = this;
        this.api.getContactDetail(this.id).subscribe(function (response) {
            var res = response;
            res.owner = res.owner['ID'].toString();
            _this.loadView = true;
            _this.editCompanyForm.patchValue(res);
            _this.getStates();
        }, function (err) {
            _this.global.checkErrorStatus(err);
        });
    };
    EditCompanyPage.prototype.getAllUsers = function () {
        var _this = this;
        this.api.getUsers().subscribe(function (res) {
            _this.allUsers = res;
            _this.global.closeLoading();
        }, function (err) {
            _this.global.checkErrorStatus(err);
        });
    };
    EditCompanyPage.prototype.updateCompany = function () {
        var _this = this;
        this.global.showLoading("bubbles", "Please wait...");
        this.api.updateCompany(this.editCompanyForm.value, this.id).subscribe(function (res) {
            _this.global.closeLoading();
            _this.router.navigate(["/companies"]);
        }, function (err) {
            _this.processError(err);
        });
    };
    EditCompanyPage.prototype.getStates = function () {
        var country = this.editCompanyForm.value.country;
        this.states = this.globalData.states[country];
    };
    EditCompanyPage.prototype.returnZero = function () {
        // to disable the default sorting behaviour of keyvalue
        return 0;
    };
    EditCompanyPage.prototype.processError = function (err) {
        if (err.status == 500) {
            err.error.message = 'Please enter valid information.';
        }
        this.global.checkErrorStatus(err);
    };
    EditCompanyPage = __decorate([
        core_1.Component({
            selector: 'app-edit-company',
            templateUrl: './edit-company.page.html',
            styleUrls: ['./edit-company.page.scss']
        })
    ], EditCompanyPage);
    return EditCompanyPage;
}());
exports.EditCompanyPage = EditCompanyPage;

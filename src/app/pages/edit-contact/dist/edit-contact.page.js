"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.EditContactPage = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var EditContactPage = /** @class */ (function () {
    function EditContactPage(api, global, globalData, fb, router, route, navCtrl) {
        var _this = this;
        this.api = api;
        this.global = global;
        this.globalData = globalData;
        this.fb = fb;
        this.router = router;
        this.route = route;
        this.navCtrl = navCtrl;
        this.allUsers = [];
        this.toggleAdvance = false;
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
    EditContactPage.prototype.ngOnInit = function () {
        this.editContactForm = this.fb.group({
            type: "contact",
            first_name: ['', forms_1.Validators.required],
            last_name: '',
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
            company: '',
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
    EditContactPage.prototype.ionViewDidEnter = function () {
        this.countries = this.globalData.countries;
    };
    EditContactPage.prototype.getContactDetail = function () {
        var _this = this;
        this.api.getContactDetail(this.id).subscribe(function (response) {
            var res = response;
            res.owner = res.owner['ID'].toString();
            _this.loadView = true;
            _this.editContactForm.patchValue(res);
            _this.getStates();
        }, function (err) {
            _this.global.checkErrorStatus(err);
        });
    };
    EditContactPage.prototype.getAllUsers = function () {
        var _this = this;
        this.api.getUsers().subscribe(function (res) {
            _this.allUsers = res;
            _this.global.closeLoading();
        }, function (err) {
            _this.global.checkErrorStatus(err);
        });
    };
    EditContactPage.prototype.updateContact = function () {
        var _this = this;
        this.global.showLoading("bubbles", "Please wait...");
        this.api.updateContact(this.editContactForm.value, this.id).subscribe(function (res) {
            _this.global.closeLoading();
            _this.router.navigate(["/contacts"]);
        }, function (err) {
            _this.processError(err);
        });
    };
    EditContactPage.prototype.getStates = function () {
        var country = this.editContactForm.value.country;
        this.states = this.globalData.states[country];
    };
    EditContactPage.prototype.returnZero = function () {
        // to disable the default sorting behaviour of keyvalue
        return 0;
    };
    EditContactPage.prototype.processError = function (err) {
        if (err.status == 500) {
            err.error.message = 'Please enter valid information.';
        }
        this.global.checkErrorStatus(err);
    };
    EditContactPage = __decorate([
        core_1.Component({
            selector: 'app-edit-contact',
            templateUrl: './edit-contact.page.html',
            styleUrls: ['./edit-contact.page.scss']
        })
    ], EditContactPage);
    return EditContactPage;
}());
exports.EditContactPage = EditContactPage;

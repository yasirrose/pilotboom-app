"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var __decorate = void 0 && (void 0).__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

exports.__esModule = true;
exports.AddContactPage = void 0;

var core_1 = require("@angular/core");

var forms_1 = require("@angular/forms");

var AddContactPage =
/** @class */
function () {
  function AddContactPage(api, fb, alertCtrl, toastCtrl, router, navCtrl, global) {
    this.api = api;
    this.fb = fb;
    this.alertCtrl = alertCtrl;
    this.toastCtrl = toastCtrl;
    this.router = router;
    this.navCtrl = navCtrl;
    this.global = global;
    this.toggleAdvance = false;
    this.allUsers = [];
    this.validation_messages = this.globalData.validationMessages;
    this.global.showLoading("bubbles", "Please wait...");
    this.getAllUsers();
  }

  AddContactPage.prototype.ngOnInit = function () {
    this.addContactForm = this.fb.group({
      type: "contact",
      first_name: ['', forms_1.Validators.required],
      last_name: '',
      email: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')])],
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
      currency: ''
    });
  };

  AddContactPage.prototype.getAllUsers = function () {
    var _this = this;

    this.api.getUsers().subscribe(function (res) {
      _this.allUsers = res;

      _this.global.closeLoading();
    }, function (err) {
      _this.global.checkErrorStatus(err);
    });
  };

  AddContactPage.prototype.addContact = function () {
    var _this = this;

    this.global.showLoading("bubbles", "Please wait...");
    this.api.addNewContact(this.addContactForm.value).subscribe(function (res) {
      _this.global.closeLoading();

      _this.router.navigate(["/contacts"]);
    }, function (err) {
      _this.global.checkErrorStatus(err);
    });
  };

  AddContactPage = __decorate([core_1.Component({
    selector: 'app-add-contact',
    templateUrl: './add-contact.page.html',
    styleUrls: ['./add-contact.page.scss']
  })], AddContactPage);
  return AddContactPage;
}();

exports.AddContactPage = AddContactPage;
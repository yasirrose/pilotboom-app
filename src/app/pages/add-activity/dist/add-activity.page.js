"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AddActivityPage = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var AddActivityPage = /** @class */ (function () {
    function AddActivityPage(api, global, fb, router, route, alertCtrl, toastCtrl, navCtrl, globalData) {
        var _this = this;
        this.api = api;
        this.global = global;
        this.fb = fb;
        this.router = router;
        this.route = route;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.navCtrl = navCtrl;
        this.globalData = globalData;
        this.tab = 'note';
        this.validation_messages = this.globalData.validationMessages;
        this.scheduleExpandNotify = false;
        this.route.queryParams.subscribe(function (params) {
            _this.global.showLoading("bubbles", "Please wait...");
            if (params && params.conatctId) {
                _this.contact_id = params.conatctId;
                _this.getAllUsers();
            }
        });
    }
    AddActivityPage.prototype.ngOnInit = function () {
        this.addNoteForm = this.fb.group({
            type: "note",
            contact_id: this.contact_id,
            content: ['', forms_1.Validators.required]
        });
        this.addEmailForm = this.fb.group({
            type: "email",
            contact_id: this.contact_id,
            subject: ['', forms_1.Validators.required],
            body: ['', forms_1.Validators.required]
        });
        this.addLogForm = this.fb.group({
            type: "log",
            contact_id: this.contact_id,
            log_type: ['', forms_1.Validators.required],
            date_time: ['', forms_1.Validators.required],
            content: ['', forms_1.Validators.required]
        });
        this.addScheduleForm = this.fb.group({
            type: "schedule",
            contact_id: this.contact_id,
            title: ['', forms_1.Validators.required],
            content: ['', forms_1.Validators.required],
            start_date_time: ['', forms_1.Validators.required],
            end_date_time: ['', forms_1.Validators.required],
            all_day: "false",
            employee_ids: [[], forms_1.Validators.required],
            schedule_type: ['', forms_1.Validators.required],
            allow_notification: false,
            notification_via: "",
            notification_time: "",
            notification_time_interval: ""
        });
        this.addTaskForm = this.fb.group({
            type: "task",
            contact_id: this.contact_id,
            title: ['', forms_1.Validators.required],
            content: ['', forms_1.Validators.required],
            employee_ids: [[], forms_1.Validators.required],
            date_time: ['', forms_1.Validators.required]
        });
    };
    AddActivityPage.prototype.getAllUsers = function () {
        var _this = this;
        this.api.getUsers().subscribe(function (res) {
            _this.allUsers = res;
            _this.global.closeLoading();
        }, function (err) {
            _this.global.checkErrorStatus(err);
        });
    };
    AddActivityPage.prototype.addActivity = function (type) {
        var _this = this;
        var formData;
        if (type == 'note') {
            formData = this.addNoteForm.value;
        }
        else if (type == 'email') {
            formData = this.addEmailForm.value;
        }
        else if (type == 'log') {
            formData = this.addLogForm.value;
        }
        else if (type == 'schedule') {
            this.addScheduleForm.value.employee_ids = this.addScheduleForm.value.employee_ids.toString(); //array to string
            this.addScheduleForm.value.allow_notification = this.addScheduleForm.value.allow_notification.toString();
            this.addScheduleForm.value.all_day = this.addScheduleForm.value.all_day.toString();
            formData = this.addScheduleForm.value;
        }
        else if (type == 'tasks') {
            this.addTaskForm.value.employee_ids = this.addTaskForm.value.employee_ids.toString(); //array to string
            formData = this.addTaskForm.value;
        }
        this.global.showLoading("bubbles", "Please wait...");
        this.api.addActivity(formData).subscribe(function (res) {
            _this.global.closeLoading();
            _this.navCtrl.back();
        }, function (err) {
            _this.global.checkErrorStatus(err);
        });
    };
    AddActivityPage.prototype.scheduleAllowNotification = function (e) {
        this.scheduleExpandNotify = e;
        if (e) { // for setting validations
            this.addScheduleForm.get('notification_via').setValidators([forms_1.Validators.required]);
            this.addScheduleForm.get('notification_via').updateValueAndValidity();
            this.addScheduleForm.get('notification_time').setValidators([forms_1.Validators.required]);
            this.addScheduleForm.get('notification_time').updateValueAndValidity();
            this.addScheduleForm.get('notification_time_interval').setValidators([forms_1.Validators.required]);
            this.addScheduleForm.get('notification_time_interval').updateValueAndValidity();
        }
        else { // for clearing validations;
            this.addScheduleForm.get('notification_via').clearValidators();
            this.addScheduleForm.get('notification_via').updateValueAndValidity();
            this.addScheduleForm.get('notification_time').clearValidators();
            this.addScheduleForm.get('notification_time').updateValueAndValidity();
            this.addScheduleForm.get('notification_time_interval').clearValidators();
            this.addScheduleForm.get('notification_time_interval').updateValueAndValidity();
        }
    };
    AddActivityPage = __decorate([
        core_1.Component({
            selector: 'app-add-activity',
            templateUrl: './add-activity.page.html',
            styleUrls: ['./add-activity.page.scss'],
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        })
    ], AddActivityPage);
    return AddActivityPage;
}());
exports.AddActivityPage = AddActivityPage;

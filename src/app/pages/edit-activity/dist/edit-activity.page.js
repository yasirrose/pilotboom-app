"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.EditActivityPage = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var EditActivityPage = /** @class */ (function () {
    function EditActivityPage(api, global, fb, router, route, alertCtrl, toastCtrl, navCtrl, globalData) {
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
        this.type = '';
        this.validation_messages = this.globalData.validationMessages;
        this.scheduleExpandNotify = false;
        this.route.queryParams.subscribe(function (params) {
            _this.global.showLoading("bubbles", "Please wait...");
            if (params && params.conatctId && params.activityId) {
                _this.contact_id = params.conatctId;
                _this.activity_id = params.activityId;
                _this.getActivityDetail();
                _this.getAllUsers();
            }
        });
    }
    EditActivityPage.prototype.ngOnInit = function () {
        this.add_note_form = this.fb.group({
            type: "note",
            contact_id: this.contact_id,
            content: ['', forms_1.Validators.required]
        });
        this.add_email_form = this.fb.group({
            type: "email",
            contact_id: this.contact_id,
            subject: ['', forms_1.Validators.required],
            body: ['', forms_1.Validators.required]
        });
        this.add_log_form = this.fb.group({
            type: "log",
            contact_id: this.contact_id,
            log_type: ['', forms_1.Validators.required],
            date_time: ['', forms_1.Validators.required],
            content: ['', forms_1.Validators.required]
        });
        this.add_schedule_form = this.fb.group({
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
        this.add_task_form = this.fb.group({
            type: "task",
            contact_id: this.contact_id,
            title: ['', forms_1.Validators.required],
            content: ['', forms_1.Validators.required],
            employee_ids: [[], forms_1.Validators.required],
            date_time: ['', forms_1.Validators.required]
        });
    };
    EditActivityPage.prototype.getActivityDetail = function () {
        var _this = this;
        this.api.getActivityDetail(this.activity_id).subscribe(function (res) {
            _this.activityData = res;
            delete _this.activityData.created_by;
            _this.type = _this.activityData.type;
            if (_this.activityData['employee_ids']) {
                _this.activityData.employee_ids = [_this.activityData.employee_ids];
            }
            _this["add_" + _this.type + "_form"].patchValue(_this.activityData);
        }, function (err) {
            _this.global.checkErrorStatus(err);
        });
    };
    EditActivityPage.prototype.getAllUsers = function () {
        var _this = this;
        this.api.getUsers().subscribe(function (res) {
            _this.allUsers = res;
            _this.global.closeLoading();
        }, function (err) {
            _this.global.checkErrorStatus(err);
        });
    };
    EditActivityPage.prototype.updateActivity = function (type) {
        var _this = this;
        var formData;
        if (type == 'note') {
            formData = this.add_note_form.value;
        }
        else if (type == 'email') {
            formData = this.add_email_form.value;
        }
        else if (type == 'log') {
            formData = this.add_log_form.value;
        }
        else if (type == 'schedule') {
            this.add_schedule_form.value.employee_ids = this.add_schedule_form.value.employee_ids.toString(); //array to string
            this.add_schedule_form.value.allow_notification = this.add_schedule_form.value.allow_notification.toString();
            this.add_schedule_form.value.all_day = this.add_schedule_form.value.all_day.toString();
            formData = this.add_schedule_form.value;
        }
        else if (type == 'tasks') {
            this.add_task_form.value.employee_ids = this.add_task_form.value.employee_ids.toString();
            formData = this.add_task_form.value;
        }
        this.global.showLoading("bubbles", "Please wait...");
        this.api.updateActivity(this.activity_id, formData).subscribe(function (res) {
            _this.global.closeLoading();
            _this.navCtrl.back();
        }, function (err) {
            _this.global.checkErrorStatus(err);
        });
    };
    EditActivityPage.prototype.scheduleAllowNotification = function (e) {
        this.scheduleExpandNotify = e;
        if (e) { // for setting validations
            this.add_schedule_form.get('notification_via').setValidators([forms_1.Validators.required]);
            this.add_schedule_form.get('notification_via').updateValueAndValidity();
            this.add_schedule_form.get('notification_time').setValidators([forms_1.Validators.required]);
            this.add_schedule_form.get('notification_time').updateValueAndValidity();
            this.add_schedule_form.get('notification_time_interval').setValidators([forms_1.Validators.required]);
            this.add_schedule_form.get('notification_time_interval').updateValueAndValidity();
        }
        else { // for clearing validations;
            this.add_schedule_form.get('notification_via').clearValidators();
            this.add_schedule_form.get('notification_via').updateValueAndValidity();
            this.add_schedule_form.get('notification_time').clearValidators();
            this.add_schedule_form.get('notification_time').updateValueAndValidity();
            this.add_schedule_form.get('notification_time_interval').clearValidators();
            this.add_schedule_form.get('notification_time_interval').updateValueAndValidity();
        }
    };
    EditActivityPage = __decorate([
        core_1.Component({
            selector: 'app-edit-activity',
            templateUrl: './edit-activity.page.html',
            styleUrls: ['./edit-activity.page.scss']
        })
    ], EditActivityPage);
    return EditActivityPage;
}());
exports.EditActivityPage = EditActivityPage;

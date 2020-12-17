"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RestService = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var http_1 = require("@angular/common/http");
var operators_1 = require("rxjs/operators");
var environment_1 = require("src/environments/environment");
var JWT_KEY = '#|TS9!T&v5%12?Iu(q|]O^K|<Pmxw#RK{) JXn*b,,}fIrnV,5u:)UIqMAql<fwV';
var RestService = /** @class */ (function () {
    function RestService(http, storage, plt, global) {
        var _this = this;
        this.http = http;
        this.storage = storage;
        this.plt = plt;
        this.global = global;
        this.user = new rxjs_1.BehaviorSubject(null);
        this.plt.ready().then(function () {
            _this.storage.get(JWT_KEY).then(function (data) {
                if (data) {
                    _this.user.next(data);
                }
            });
        });
    }
    RestService.prototype.signIn = function (username, password) {
        var _this = this;
        return this.http.post(this.global.getApiUrl() + "/jwt-auth/v1/token", { username: username, password: password }).pipe(operators_1.switchMap(function (data) {
            return rxjs_1.from(_this.storage.set(JWT_KEY, data));
            // return from(this.storage.set(JWT_KEY, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3RcL3BpbG90Ym9vbSIsImlhdCI6MTYwMzI5MTMwMywibmJmIjoxNjAzMjkxMzAzLCJleHAiOjE2MDM4OTYxMDMsImRhdGEiOnsidXNlciI6eyJpZCI6IjQifX19.vPf1Tvrqbp9zfieMGE3w6K4LkegemhQFvYzxqdUpqNM'));
        }), operators_1.tap(function (data) {
            _this.user.next(data);
        }));
    };
    RestService.prototype.logout = function () {
        var _this = this;
        this.storage.remove(JWT_KEY).then(function () {
            _this.user.next(null);
        });
    };
    RestService.prototype.signUp = function (username, email, password) {
        return this.http.post(this.global.getApiUrl() + "/wp/v2/users/register", { username: username, email: email, password: password });
    };
    RestService.prototype.resetPassword = function (usernameOrEmail) {
        return this.http.post(this.global.getApiUrl() + "/wp/v2/users/lostpassword", { user_login: usernameOrEmail });
    };
    RestService.prototype.getMasterData = function (domain, action) {
        if (action === void 0) { action = 'GetClientsProducts'; }
        if (environment_1.environment.production) {
            var postData = {
                'username': 'gOVhAuoeLdgyh9FQRpb8kdjO58hDemTW',
                'password': 'XrNvd5ok8ddHT4CXoE6N1e8j8GdQQn0y',
                'accesskey': 'UXwkMOvKE72UTAvLNKLUJ20geoFuZ3xx',
                'action': action,
                'responsetype': 'json'
            };
            return this.http.post("https://pilotboom.com/includes/api.php", postData).pipe(operators_1.map(function (data) {
                return data;
            }));
        }
        else {
            return this.http.get(this.global.getApiUrl() + "/wp/v2/users").pipe(operators_1.map(function (data) {
                return data;
            }));
        }
    };
    RestService.prototype.getPosts = function (per_page, page) {
        if (per_page === void 0) { per_page = 10; }
        if (page === void 0) { page = 1; }
        var headers = new http_1.HttpHeaders();
        headers = headers.set('Authorization', 'Bearer ' + JWT_KEY);
        return this.http.get(this.global.getApiUrl() + "/wp/v2/posts?per_page=" + per_page + "&page=" + page, { headers: headers }).pipe(operators_1.map(function (data) {
            return data;
        }));
    };
    RestService.prototype.getUsers = function () {
        var headers = new http_1.HttpHeaders();
        headers = headers.set('Authorization', 'Bearer ' + JWT_KEY);
        return this.http.get(this.global.getApiUrl() + "/wp/v2/users", { headers: headers }).pipe(operators_1.map(function (data) {
            return data;
        }));
    };
    RestService.prototype.getCurrentUser = function () {
        return this.user.asObservable();
    };
    RestService.prototype.getCurrentUserData = function () {
        var user = this.user;
        return user._value;
    };
    RestService.prototype.getCurrentUserID = function () {
        return this.getCurrentUserData().user_id;
    };
    RestService.prototype.getMyself = function () {
        var headers = new http_1.HttpHeaders();
        headers = headers.set('Authorization', 'Bearer ' + JWT_KEY);
        return this.http.get(this.global.getApiUrl() + "/wp/v2/users", { headers: headers }).pipe(operators_1.map(function (data) {
            return data;
        }));
    };
    RestService.prototype.getUserValue = function () {
        return this.user.getValue();
    };
    RestService.prototype.getCrmContacts = function (type, status, per_page, page, search, include_owner) {
        if (type === void 0) { type = 'contact'; }
        if (status === void 0) { status = 'all'; }
        if (per_page === void 0) { per_page = 20; }
        if (page === void 0) { page = 1; }
        if (search === void 0) { search = ''; }
        if (include_owner === void 0) { include_owner = true; }
        var headers = new http_1.HttpHeaders();
        headers = headers.set('Authorization', 'Bearer ' + JWT_KEY);
        return this.http.get(this.global.getApiUrl() + "/erp/v1/crm/contacts?type=" + type + "&status=" + status + "&per_page=" + per_page + "&page=" + page + "&search=" + search + (include_owner ? '&include=owner' : ''), { headers: headers }).pipe(operators_1.map(function (data) {
            return data;
        }));
    };
    RestService.prototype.CountCrmContacts = function (contact, company) {
        if (contact === void 0) { contact = true; }
        if (company === void 0) { company = true; }
        var headers = new http_1.HttpHeaders();
        headers = headers.set('Authorization', 'Bearer ' + JWT_KEY);
        return this.http.get(this.global.getApiUrl() + "/erp/v1/crm/contacts/count?contact=" + contact + "&company=" + company, { headers: headers }).pipe(operators_1.map(function (data) {
            return data;
        }));
    };
    RestService.prototype.getContactDetail = function (id, include_owner) {
        if (include_owner === void 0) { include_owner = true; }
        var headers = new http_1.HttpHeaders();
        headers = headers.set('Authorization', 'Bearer ' + JWT_KEY);
        return this.http.get(this.global.getApiUrl() + "/erp/v1/crm/contacts/" + id + (include_owner ? '?include=owner' : ''), { headers: headers }).pipe(operators_1.map(function (data) {
            return data;
        }));
    };
    RestService.prototype.addNewContact = function (contactData) {
        return this.http.post(this.global.getApiUrl() + "/erp/v1/crm/contacts", contactData).pipe(operators_1.map(function (data) {
            return data;
        }));
    };
    RestService.prototype.updateContact = function (contactData, id) {
        return this.http.put(this.global.getApiUrl() + "/erp/v1/crm/contacts/" + id, contactData).pipe(operators_1.map(function (data) {
            return data;
        }));
    };
    RestService.prototype.deleteContact = function (id, hard) {
        if (hard === void 0) { hard = 0; }
        var headers = new http_1.HttpHeaders();
        headers = headers.set('Authorization', 'Bearer ' + JWT_KEY);
        return this.http["delete"](this.global.getApiUrl() + "/erp/v1/crm/contacts/" + id).pipe(operators_1.map(function (data) {
            return data;
        }));
    };
    RestService.prototype.addNewCompany = function (companyData) {
        return this.http.post(this.global.getApiUrl() + "/erp/v1/crm/contacts/company", companyData).pipe(operators_1.map(function (data) {
            return data;
        }));
    };
    RestService.prototype.updateCompany = function (companyData, id) {
        return this.http.put(this.global.getApiUrl() + "/erp/v1/crm/contacts/company/" + id, companyData).pipe(operators_1.map(function (data) {
            return data;
        }));
    };
    RestService.prototype.deleteCompany = function (id, hard) {
        if (hard === void 0) { hard = 0; }
        var headers = new http_1.HttpHeaders();
        headers = headers.set('Authorization', 'Bearer ' + JWT_KEY);
        return this.http["delete"](this.global.getApiUrl() + "/erp/v1/crm/contacts/company/" + id).pipe(operators_1.map(function (data) {
            return data;
        }));
    };
    //Contact Groups
    RestService.prototype.getCrmContactGroups = function (page, per_page, search) {
        if (page === void 0) { page = 1; }
        if (per_page === void 0) { per_page = 20; }
        if (search === void 0) { search = ''; }
        var headers = new http_1.HttpHeaders();
        headers = headers.set('Authorization', 'Bearer ' + JWT_KEY);
        return this.http.get(this.global.getApiUrl() + "/erp/v1/crm/contacts/groups?per_page=" + per_page + "&page=" + page + "&search=" + search, { headers: headers }).pipe(operators_1.map(function (data) {
            return data;
        }));
    };
    RestService.prototype.getContactGroupDetail = function (contactGrpId) {
        var headers = new http_1.HttpHeaders();
        headers = headers.set('Authorization', 'Bearer ' + JWT_KEY);
        return this.http.get(this.global.getApiUrl() + "/erp/v1/crm/contacts/groups/" + contactGrpId, { headers: headers }).pipe(operators_1.map(function (data) {
            return data;
        }));
    };
    RestService.prototype.addNewContactGroup = function (contactData) {
        return this.http.post(this.global.getApiUrl() + "/erp/v1/crm/contacts/groups", contactData).pipe(operators_1.map(function (data) {
            return data;
        }));
    };
    RestService.prototype.updateContactGroup = function (contactData, id) {
        return this.http.put(this.global.getApiUrl() + "/erp/v1/crm/contacts/groups/" + id, contactData).pipe(operators_1.map(function (data) {
            return data;
        }));
    };
    RestService.prototype.deleteContactGroup = function (id, hard) {
        if (hard === void 0) { hard = 0; }
        var headers = new http_1.HttpHeaders();
        headers = headers.set('Authorization', 'Bearer ' + JWT_KEY);
        return this.http["delete"](this.global.getApiUrl() + "/erp/v1/crm/contacts/groups/" + id).pipe(operators_1.map(function (data) {
            return data;
        }));
    };
    RestService.prototype.getContactGrpSubs = function (contactGrpId, page, per_page) {
        if (page === void 0) { page = 1; }
        if (per_page === void 0) { per_page = 10; }
        var headers = new http_1.HttpHeaders();
        headers = headers.set('Authorization', 'Bearer ' + JWT_KEY);
        return this.http.get(this.global.getApiUrl() + "/erp/v1/crm/contacts/groups/" + contactGrpId + "/subscribes?per_page=" + per_page + "&page=" + page, { headers: headers }).pipe(operators_1.map(function (data) {
            return data;
        }));
    };
    RestService.prototype.subscribeContact = function (group_id, contact_ids) {
        var headers = new http_1.HttpHeaders();
        headers = headers.set('Authorization', 'Bearer ' + JWT_KEY);
        return this.http.post(this.global.getApiUrl() + "/erp/v1/crm/contacts/groups/" + group_id + "/subscribes", { contact_ids: contact_ids }).pipe(operators_1.map(function (data) {
            return data;
        }));
    };
    RestService.prototype.unsubContact = function (group_id, contact_id) {
        var headers = new http_1.HttpHeaders();
        headers = headers.set('Authorization', 'Bearer ' + JWT_KEY);
        return this.http["delete"](this.global.getApiUrl() + "/erp/v1/crm/contacts/groups/" + group_id + "/subscribes/" + contact_id).pipe(operators_1.map(function (data) {
            return data;
        }));
    };
    //Activities
    RestService.prototype.getActivities = function (customer_id, per_page, page, type) {
        if (customer_id === void 0) { customer_id = ''; }
        if (per_page === void 0) { per_page = 10; }
        if (page === void 0) { page = 1; }
        if (type === void 0) { type = 'log%7Cnote%7Cemail%7Cschedule%7Ctask'; }
        var headers = new http_1.HttpHeaders();
        headers = headers.set('Authorization', 'Bearer ' + JWT_KEY);
        return this.http.get(this.global.getApiUrl() + "/erp/v1/crm/activities?type=" + type + "&per_page=" + per_page + "&page=" + page + "&customer_id=" + customer_id, { headers: headers }).pipe(operators_1.map(function (data) {
            return data;
        }));
    };
    RestService.prototype.addActivity = function (activityData) {
        return this.http.post(this.global.getApiUrl() + "/erp/v1/crm/activities", activityData).pipe(operators_1.map(function (data) {
            return data;
        }));
    };
    RestService.prototype.getActivityDetail = function (id) {
        var headers = new http_1.HttpHeaders();
        headers = headers.set('Authorization', 'Bearer ' + JWT_KEY);
        return this.http.get(this.global.getApiUrl() + "/erp/v1/crm/activities/" + id, { headers: headers }).pipe(operators_1.map(function (data) {
            return data;
        }));
    };
    RestService.prototype.updateActivity = function (id, formData) {
        return this.http.put(this.global.getApiUrl() + "/erp/v1/crm/activities/" + id, formData).pipe(operators_1.map(function (data) {
            return data;
        }));
    };
    RestService.prototype.deleteActivity = function (id) {
        var headers = new http_1.HttpHeaders();
        headers = headers.set('Authorization', 'Bearer ' + JWT_KEY);
        return this.http["delete"](this.global.getApiUrl() + "/erp/v1/crm/activities/" + id).pipe(operators_1.map(function (data) {
            return data;
        }));
    };
    //Schedules
    RestService.prototype.getSchedules = function (tab, per_page, page) {
        if (tab === void 0) { tab = 'own'; }
        if (per_page === void 0) { per_page = 40; }
        if (page === void 0) { page = 1; }
        var headers = new http_1.HttpHeaders();
        headers = headers.set('Authorization', 'Bearer ' + JWT_KEY);
        return this.http.get(this.global.getApiUrl() + "/erp/v1/crm/schedules?tab=" + tab + "&per_page=" + per_page + "&page=" + page, { headers: headers }).pipe(operators_1.map(function (data) {
            return data;
        }));
    };
    RestService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], RestService);
    return RestService;
}());
exports.RestService = RestService;

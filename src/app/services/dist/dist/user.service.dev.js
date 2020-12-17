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
exports.UserService = void 0;

var core_1 = require("@angular/core");

var rxjs_1 = require("rxjs");

var http_1 = require("@angular/common/http");

var operators_1 = require("rxjs/operators");

var JWT_KEY = '#|TS9!T&v5%12?Iu(q|]O^K|<Pmxw#RK{) JXn*b,,}fIrnV,5u:)UIqMAql<fwV';

var UserService =
/** @class */
function () {
  function UserService(http, storage, plt, rest, global) {
    var _this = this;

    this.http = http;
    this.storage = storage;
    this.plt = plt;
    this.rest = rest;
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

  UserService.prototype.getUsersWithMeta = function (per_page, page) {
    if (per_page === void 0) {
      per_page = 10;
    }

    if (page === void 0) {
      page = 1;
    }

    var headers = new http_1.HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + JWT_KEY);
    return this.http.get(this.global.getApiUrl() + "/wp/v2/usersmeta", {
      headers: headers
    }).pipe(operators_1.map(function (data) {
      return data;
    }));
  };

  UserService.prototype.getUserDetails = function (id) {
    return this.http.get(this.global.getApiUrl() + "/wp/v2/usersmeta/" + id).pipe(operators_1.map(function (data) {
      return data;
    }));
  };

  UserService.prototype["delete"] = function (id, hard) {
    if (hard === void 0) {
      hard = 0;
    }

    var my_id = this.rest.getCurrentUserID();
    return this.http["delete"](this.global.getApiUrl() + "/wp/v2/users/" + id + "?force=true&reassign=" + my_id).pipe(operators_1.map(function (data) {
      return data;
    }));
  };

  UserService.prototype.addUser = function (formData) {
    return this.http.post(this.global.getApiUrl() + "/wp/v2/users", formData).pipe(operators_1.map(function (data) {
      return data;
    }));
  };

  UserService.prototype.updateUser = function (formData, id) {
    return this.http.put(this.global.getApiUrl() + "/wp/v2/users/" + id, formData).pipe(operators_1.map(function (data) {
      return data;
    }));
  };

  UserService = __decorate([core_1.Injectable({
    providedIn: 'root'
  })], UserService);
  return UserService;
}();

exports.UserService = UserService;
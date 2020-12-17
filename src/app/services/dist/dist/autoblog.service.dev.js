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
exports.AutoblogService = void 0;

var core_1 = require("@angular/core");

var rxjs_1 = require("rxjs");

var http_1 = require("@angular/common/http");

var operators_1 = require("rxjs/operators");

var JWT_KEY = '#|TS9!T&v5%12?Iu(q|]O^K|<Pmxw#RK{) JXn*b,,}fIrnV,5u:)UIqMAql<fwV';

var AutoblogService =
/** @class */
function () {
  function AutoblogService(http, storage, plt, global) {
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

  AutoblogService.prototype.getAutoBlog = function (per_page, page) {
    if (per_page === void 0) {
      per_page = 10;
    }

    if (page === void 0) {
      page = 1;
    }

    var headers = new http_1.HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + JWT_KEY);
    return this.http.get(this.global.getApiUrl() + "/autoblog/v1/blogs?per_page=" + per_page + "&page=" + page, {
      headers: headers
    }).pipe(operators_1.map(function (data) {
      return data;
    }));
  };

  AutoblogService.prototype.getAutoBlogDetail = function (id) {
    return this.http.get(this.global.getApiUrl() + "/autoblog/v1/blogs/" + id).pipe(operators_1.map(function (data) {
      return data;
    }));
  };

  AutoblogService.prototype["delete"] = function (id, hard) {
    if (hard === void 0) {
      hard = 0;
    }

    return this.http["delete"](this.global.getApiUrl() + "/autoblog/v1/blogs/" + id).pipe(operators_1.map(function (data) {
      return data;
    }));
  };

  AutoblogService.prototype.addAutoBlog = function (formData) {
    return this.http.post(this.global.getApiUrl() + "/autoblog/v1/blogs", formData).pipe(operators_1.map(function (data) {
      return data;
    }));
  };

  AutoblogService.prototype.updateAutoBlog = function (formData, id) {
    return this.http.put(this.global.getApiUrl() + "/autoblog/v1/blogs/" + id, formData).pipe(operators_1.map(function (data) {
      return data;
    }));
  };

  AutoblogService = __decorate([core_1.Injectable({
    providedIn: 'root'
  })], AutoblogService);
  return AutoblogService;
}();

exports.AutoblogService = AutoblogService;
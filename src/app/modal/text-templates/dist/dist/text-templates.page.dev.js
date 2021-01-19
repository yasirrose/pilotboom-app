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

var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function (resolve) {
      resolve(value);
    });
  }

  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var __generator = void 0 && (void 0).__generator || function (thisArg, body) {
  var _ = {
    label: 0,
    sent: function sent() {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  },
      f,
      y,
      t,
      g;
  return g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g;

  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }

  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");

    while (_) {
      try {
        if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
        if (y = 0, t) op = [op[0] & 2, t.value];

        switch (op[0]) {
          case 0:
          case 1:
            t = op;
            break;

          case 4:
            _.label++;
            return {
              value: op[1],
              done: false
            };

          case 5:
            _.label++;
            y = op[1];
            op = [0];
            continue;

          case 7:
            op = _.ops.pop();

            _.trys.pop();

            continue;

          default:
            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
              _ = 0;
              continue;
            }

            if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
              _.label = op[1];
              break;
            }

            if (op[0] === 6 && _.label < t[1]) {
              _.label = t[1];
              t = op;
              break;
            }

            if (t && _.label < t[2]) {
              _.label = t[2];

              _.ops.push(op);

              break;
            }

            if (t[2]) _.ops.pop();

            _.trys.pop();

            continue;
        }

        op = body.call(thisArg, _);
      } catch (e) {
        op = [6, e];
        y = 0;
      } finally {
        f = t = 0;
      }
    }

    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
};

exports.__esModule = true;
exports.TextTemplatesPage = void 0;

var core_1 = require("@angular/core");

var forms_1 = require("@angular/forms");

var TextTemplatesPage =
/** @class */
function () {
  function TextTemplatesPage(api, fb, router, global, autoBlogApi, globalData, modalCtrl, storage, alertCtrl) {
    this.api = api;
    this.fb = fb;
    this.router = router;
    this.global = global;
    this.autoBlogApi = autoBlogApi;
    this.globalData = globalData;
    this.modalCtrl = modalCtrl;
    this.storage = storage;
    this.alertCtrl = alertCtrl;
    this.additionalTemplates = [];
    this.defaultTemplates = [];
    this.showAddForm = false;
    this.toggleAdvance = false;
    this.validation_messages = this.globalData.validationMessages;
  }

  TextTemplatesPage.prototype.ngOnInit = function () {
    this.addTempForm = this.fb.group({
      template: ['', forms_1.Validators.required]
    });
  };

  TextTemplatesPage.prototype.ionViewDidEnter = function () {
    this.setTemplates();
  };

  TextTemplatesPage.prototype.hideTempForm = function () {
    this.showAddForm = false;
    this.addTempForm.value.template = '';
  };

  TextTemplatesPage.prototype.closeModal = function (data) {
    this.global.closeLoading();
    data ? this.modalCtrl.dismiss(this.formatWildcards(data)) : this.modalCtrl.dismiss();
  };

  TextTemplatesPage.prototype.selectTemplate = function (text) {
    this.closeModal(text);
  };

  TextTemplatesPage.prototype.addTemplate = function () {
    var _this = this;

    this.global.showLoading("bubbles", "Please wait..."); // this.storage.remove('additionalTemplates');

    this.storage.get('additionalTemplates').then(function (data) {
      if (!data || !(data instanceof Array)) {
        data = [];
      }

      data.push(_this.addTempForm.value.template);

      _this.storage.set('additionalTemplates', data);

      setTimeout(function () {
        _this.setAdditionalTemplates();

        _this.hideTempForm();

        _this.global.closeLoading();
      }, 1000);
    });
  };

  TextTemplatesPage.prototype.setAdditionalTemplates = function () {
    var _this = this;

    this.storage.get('additionalTemplates').then(function (data) {
      if (data) {
        _this.additionalTemplates = data;
      }
    });
  };

  TextTemplatesPage.prototype.setTemplates = function () {
    this.defaultTemplates = [];
    this.defaultTemplates = this.globalData.textTemplates["default"];
    this.setAdditionalTemplates();
  };

  TextTemplatesPage.prototype.formatWildcards = function (temp) {
    return temp.replace('{user_name}', this.contact.first_name);
  };

  TextTemplatesPage.prototype.deleteTemplate = function (evt, index) {
    return __awaiter(this, void 0, void 0, function () {
      var alert;

      var _this = this;

      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            return [4
            /*yield*/
            , this.alertCtrl.create({
              header: 'Confirm Delete',
              message: 'Do you really want to delete this template?',
              buttons: [{
                text: 'Cancel',
                role: 'cancel',
                handler: function handler() {}
              }, {
                text: 'Delete',
                handler: function handler() {
                  _this.global.showLoading("bubbles", "Please wait...");

                  _this.storage.get('additionalTemplates').then(function (data) {
                    if (!data || !(data instanceof Array)) {
                      data = [];
                    } // data = this.global.filterArrayByIndex(data, index);


                    data.splice(index, 1);

                    _this.storage.set('additionalTemplates', data);

                    setTimeout(function () {
                      _this.setAdditionalTemplates();

                      _this.global.closeLoading();
                    }, 300);
                  });
                }
              }]
            })];

          case 1:
            alert = _a.sent();
            return [4
            /*yield*/
            , alert.present()];

          case 2:
            _a.sent();

            return [2
            /*return*/
            ];
        }
      });
    });
  };

  TextTemplatesPage = __decorate([core_1.Component({
    selector: 'app-text-templates',
    templateUrl: './text-templates.page.html',
    styleUrls: ['./text-templates.page.scss'],
    providers: [forms_1.FormBuilder]
  })], TextTemplatesPage);
  return TextTemplatesPage;
}();

exports.TextTemplatesPage = TextTemplatesPage;
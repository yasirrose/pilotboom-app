"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.GlobalData = exports.GlobalService = void 0;
var core_1 = require("@angular/core");
var environment_1 = require("../../environments/environment");
var rxjs_1 = require("rxjs");
var JWT_KEY = '#|TS9!T&v5%12?Iu(q|]O^K|<Pmxw#RK{) JXn*b,,}fIrnV,5u:)UIqMAql<fwV';
var GlobalService = /** @class */ (function () {
    function GlobalService(router, storage, _santizer, loadingCtrl, alertCtrl, toastCtrl, network, iab, plt) {
        this.router = router;
        this.storage = storage;
        this._santizer = _santizer;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.toastCtrl = toastCtrl;
        this.network = network;
        this.iab = iab;
        this.plt = plt;
        this.is_notif = false;
        this.user = new rxjs_1.BehaviorSubject(null);
    }
    GlobalService.prototype.showLoading = function (spinner, message) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        // if (!environment.showloader) {
                        // 	return false;
                        // }
                        _a = this;
                        return [4 /*yield*/, this.loadingCtrl.create({
                                spinner: spinner,
                                message: message
                            })];
                    case 1:
                        // if (!environment.showloader) {
                        // 	return false;
                        // }
                        _a.loading = _b.sent();
                        return [4 /*yield*/, this.loading.present()];
                    case 2:
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    GlobalService.prototype.closeLoading = function () {
        if (this.loading) {
            this.loading.dismiss();
        }
    };
    GlobalService.prototype.alertMessage = function (header, message, buttons, cssClass) {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertCtrl.create({
                            header: header,
                            message: message,
                            buttons: [buttons],
                            cssClass: cssClass,
                            mode: "md"
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    GlobalService.prototype.getSafeHtml = function (value) {
        return this._santizer.bypassSecurityTrustHtml(value);
    };
    GlobalService.prototype.InAppBrowser = function (link) {
        // const openingMode = "_blank";
        var browser = this.iab.create(link);
        // browser.executeScript(...);
        // browser.insertCSS(...);
        browser.on('loadstop').subscribe(function (event) {
            browser.insertCSS({ code: "body{color: red;" });
        });
    };
    GlobalService.prototype.InAppBrowserClose = function () {
        this.browser.close();
    };
    GlobalService.prototype.showPopup = function (header, message, exitApp) {
        if (exitApp === void 0) { exitApp = false; }
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.closeLoading();
                        return [4 /*yield*/, this.alertCtrl.create({
                                header: header,
                                message: message,
                                buttons: exitApp ?
                                    [
                                        {
                                            text: 'OK',
                                            handler: function () {
                                                navigator['app'].exitApp();
                                            }
                                        }
                                    ] :
                                    ['OK']
                            })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    GlobalService.prototype.presentToast = function (message, duration) {
        if (duration === void 0) { duration = 2000; }
        return __awaiter(this, void 0, void 0, function () {
            var toast;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastCtrl.create({
                            message: message,
                            duration: duration
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    GlobalService.prototype.checkErrorStatus = function (error, header, exitApp, login) {
        var _this = this;
        if (header === void 0) { header = 'Failed'; }
        if (exitApp === void 0) { exitApp = false; }
        if (login === void 0) { login = false; }
        this.closeLoading();
        if (!this.checkConnection()) {
            return false;
        }
        if ((error.status == 403 || error.status == 401) && !login) {
            this.storage.remove(JWT_KEY).then(function () {
                _this.router.navigate(["/login"]);
            });
        }
        else {
            this.showPopup(header, error.error.message, exitApp);
        }
    };
    GlobalService.prototype.filterObjectByValue = function (objArray, key, value, type) {
        if (type === void 0) { type = 'remove'; }
        return objArray.filter(function (obj) {
            if (type == 'remove') {
                return obj[key] != value;
            }
            else if (type == 'get') {
                return obj[key] == value;
            }
        });
    };
    GlobalService.prototype.filterArrayByValue = function (arr, value) {
        return arr.filter(function (elem, index) {
            return elem != value;
        });
    };
    GlobalService.prototype.filterArrayByIndex = function (arr, value) {
        return arr.filter(function (elem, index) {
            return index != value;
        });
    };
    GlobalService.prototype.filterSearch = function (objArray, value, key1, key2) {
        return objArray.filter(function (obj) {
            if (key2) {
                return (obj[key1].toLowerCase().indexOf(value.toLowerCase()) > -1 || obj[key2].toLowerCase().indexOf(value.toLowerCase()) > -1);
            }
            else {
                return obj[key1].toLowerCase().indexOf(value.toLowerCase()) > -1;
            }
        });
    };
    GlobalService.prototype.stripHtmlTags = function (text) {
        return text ? String(text).replace(/<[^>]+>/gm, '') : '';
    };
    GlobalService.prototype.checkConnection = function (exitApp) {
        if (exitApp === void 0) { exitApp = false; }
        if (this.network.getConnectionType() == "none") {
            this.closeLoading();
            this.showPopup("Network connection error", "Please check your internet connection and try again.", exitApp);
            return false;
        }
        else {
            return true;
        }
    };
    GlobalService.prototype.confirmExitApp = function (confirm) {
        if (confirm === void 0) { confirm = true; }
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!confirm) {
                            navigator['app'].exitApp();
                            return [2 /*return*/, false];
                        }
                        return [4 /*yield*/, this.alertCtrl.create({
                                header: 'Pilotboom',
                                message: 'Are you sure you want to exit?',
                                buttons: [
                                    {
                                        text: 'Cancel',
                                        role: 'cancel',
                                        handler: function () {
                                        }
                                    },
                                    {
                                        text: 'Exit',
                                        handler: function () { return __awaiter(_this, void 0, void 0, function () {
                                            return __generator(this, function (_a) {
                                                switch (_a.label) {
                                                    case 0: return [4 /*yield*/, alert.onDidDismiss().then(function () {
                                                            navigator['app'].exitApp();
                                                        })];
                                                    case 1:
                                                        _a.sent();
                                                        return [2 /*return*/];
                                                }
                                            });
                                        }); }
                                    }
                                ]
                            })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    GlobalService.prototype.setDeviceToken = function (token) {
        this.device_token = token.value;
    };
    GlobalService.prototype.getDeviceToken = function () {
        return this.device_token;
    };
    GlobalService.prototype.setUserDomain = function (domain) {
        localStorage.setItem('capUserDom', domain);
    };
    GlobalService.prototype.getUserDomain = function () {
        return localStorage.getItem('capUserDom');
    };
    GlobalService.prototype.getBaseUrl = function () {
        return environment_1.environment.production ? "https://" + this.getUserDomain() : "http://localhost/pilotboom";
    };
    GlobalService.prototype.getApiUrl = function () {
        var base = this.getBaseUrl();
        return base + "/wp-json";
    };
    GlobalService.prototype.toTitleCase = function (str) {
        return str && str.charAt(0).toUpperCase() + str.slice(1);
    };
    GlobalService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], GlobalService);
    return GlobalService;
}());
exports.GlobalService = GlobalService;
var GlobalData = /** @class */ (function () {
    function GlobalData() {
        this.validationMessages = {
            'username': [
                { type: 'required', message: 'Username/Email is required.' },
                { type: 'minlength', message: 'Username must be at least 5 characters long.' },
                { type: 'maxlength', message: 'Username cannot be more than 25 characters long.' },
                { type: 'pattern', message: 'Your username must contain only numbers and letters.' },
                { type: 'validUsername', message: 'Your username has already been taken.' }
            ],
            'name': [
                { type: 'required', message: 'Name is required.' }
            ],
            'first_name': [
                { type: 'required', message: 'First name is required.' }
            ],
            'last_name': [
                { type: 'required', message: 'Last name is required.' }
            ],
            'email': [
                { type: 'required', message: 'Email is required.' },
                { type: 'pattern', message: 'Please enter a valid email.' }
            ],
            'phone': [
                { type: 'required', message: 'Phone is required.' },
                { type: 'validCountryPhone', message: 'The phone is incorrect for the selected country.' }
            ],
            'password': [
                { type: 'required', message: 'Password is required.' },
                { type: 'minlength', message: 'Password must be at least 5 characters long.' },
                { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number.' }
            ],
            'confirm_password': [
                { type: 'required', message: 'Confirm password is required.' }
            ],
            'matching_passwords': [
                { type: 'areEqual', message: 'Password mismatch.' }
            ],
            'terms': [
                { type: 'pattern', message: 'You must accept terms and conditions.' }
            ],
            'owner': [
                { type: 'required', message: 'Contact owner is required.' }
            ],
            'life_stage': [
                { type: 'required', message: 'Life Stage is required.' }
            ],
            'company': [
                { type: 'required', message: 'Company Name is required.' }
            ],
            'contact_ids': [
                { type: 'required', message: 'At Least one Contact is required.' }
            ],
            'website': [
                { type: 'required', message: 'Website name is required.' },
                { type: 'pattern', message: 'Please enter a valid website.' }
            ]
        };
        this.contactSource = {
            "chat": "Chat",
            "contact_form": "Contact Form",
            "employee_referral": "Employee Referral",
            "external_referral": "External Referral",
            "marketing_campaign": "Marketing campaign",
            "newsletter": "Newsletter",
            "online_store": "OnlineStore",
            "optin_form": "Optin Forms",
            "partner": "Partner",
            "phone": "Phone Call",
            "public_relations": "Public Relations",
            "sales_mail_alias": "Sales Mail Alias",
            "search_engine": "Search Engine",
            "seminar_internal": "Seminar-Internal",
            "seminar_partner": "Seminar Partner",
            "social_media": "Social Media",
            "trade_show": "Trade Show",
            "web_download": "Web Download",
            "web_research": "Web Research"
        };
        this.erpRoles = {
            erp_crm_manager: 'CRM Manager',
            erp_crm_agent: 'CRM Agent'
        };
        this.erpRolesAll = {
            erp_crm_manager: 'CRM Manager',
            erp_crm_agent: 'CRM Agent',
            erp_hr_manager: 'HR Manager',
            erp_ac_manager: 'Accounting Manager'
        };
        this.textTemplates = {
            "default": [
                'Hi {user_name}, How are you doing today.',
                'There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain',
                'Hello {user_name}, This message is to remind you about your pending payments.',
                'There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain',
            ],
            additional: []
        };
        this.countries = {
            "AX": "Åland Islands",
            "AF": "Afghanistan",
            "AL": "Albania",
            "DZ": "Algeria",
            "AD": "Andorra",
            "AO": "Angola",
            "AI": "Anguilla",
            "AQ": "Antarctica",
            "AG": "Antigua and Barbuda",
            "AR": "Argentina",
            "AM": "Armenia",
            "AW": "Aruba",
            "AU": "Australia",
            "AT": "Austria",
            "AZ": "Azerbaijan",
            "BS": "Bahamas",
            "BH": "Bahrain",
            "BD": "Bangladesh",
            "BB": "Barbados",
            "BY": "Belarus",
            "BE": "Belgium",
            "BZ": "Belize",
            "BJ": "Benin",
            "BM": "Bermuda",
            "BT": "Bhutan",
            "BO": "Bolivia",
            "BQ": "Bonaire, Saint Eustatius and Saba",
            "BA": "Bosnia and Herzegovina",
            "BW": "Botswana",
            "BV": "Bouvet Island",
            "BR": "Brazil",
            "IO": "British Indian Ocean Territory",
            "VG": "British Virgin Islands",
            "BN": "Brunei",
            "BG": "Bulgaria",
            "BF": "Burkina Faso",
            "BI": "Burundi",
            "KH": "Cambodia",
            "CM": "Cameroon",
            "CA": "Canada",
            "CV": "Cape Verde",
            "KY": "Cayman Islands",
            "CF": "Central African Republic",
            "TD": "Chad",
            "CL": "Chile",
            "CN": "China",
            "CX": "Christmas Island",
            "CC": "Cocos (Keeling) Islands",
            "CO": "Colombia",
            "KM": "Comoros",
            "CG": "Congo (Brazzaville)",
            "CD": "Congo (Kinshasa)",
            "CK": "Cook Islands",
            "CR": "Costa Rica",
            "HR": "Croatia",
            "CU": "Cuba",
            "CW": "CuraÇao",
            "CY": "Cyprus",
            "CZ": "Czech Republic",
            "DK": "Denmark",
            "DJ": "Djibouti",
            "DM": "Dominica",
            "DO": "Dominican Republic",
            "EC": "Ecuador",
            "EG": "Egypt",
            "SV": "El Salvador",
            "GQ": "Equatorial Guinea",
            "ER": "Eritrea",
            "EE": "Estonia",
            "ET": "Ethiopia",
            "FK": "Falkland Islands",
            "FO": "Faroe Islands",
            "FJ": "Fiji",
            "FI": "Finland",
            "FR": "France",
            "GF": "French Guiana",
            "PF": "French Polynesia",
            "TF": "French Southern Territories",
            "GA": "Gabon",
            "GM": "Gambia",
            "GE": "Georgia",
            "DE": "Germany",
            "GH": "Ghana",
            "GI": "Gibraltar",
            "GR": "Greece",
            "GL": "Greenland",
            "GD": "Grenada",
            "GP": "Guadeloupe",
            "GT": "Guatemala",
            "GG": "Guernsey",
            "GN": "Guinea",
            "GW": "Guinea-Bissau",
            "GY": "Guyana",
            "HT": "Haiti",
            "HM": "Heard Island and McDonald Islands",
            "HN": "Honduras",
            "HK": "Hong Kong",
            "HU": "Hungary",
            "IS": "Iceland",
            "IN": "India",
            "ID": "Indonesia",
            "IR": "Iran",
            "IQ": "Iraq",
            "IE": "Ireland",
            "IM": "Isle of Man",
            "IL": "Israel",
            "IT": "Italy",
            "CI": "Ivory Coast",
            "JM": "Jamaica",
            "JP": "Japan",
            "JE": "Jersey",
            "JO": "Jordan",
            "KZ": "Kazakhstan",
            "KE": "Kenya",
            "KI": "Kiribati",
            "KW": "Kuwait",
            "KG": "Kyrgyzstan",
            "LA": "Laos",
            "LV": "Latvia",
            "LB": "Lebanon",
            "LS": "Lesotho",
            "LR": "Liberia",
            "LY": "Libya",
            "LI": "Liechtenstein",
            "LT": "Lithuania",
            "LU": "Luxembourg",
            "MO": "Macao S.A.R., China",
            "MK": "Macedonia",
            "MG": "Madagascar",
            "MW": "Malawi",
            "MY": "Malaysia",
            "MV": "Maldives",
            "ML": "Mali",
            "MT": "Malta",
            "MH": "Marshall Islands",
            "MQ": "Martinique",
            "MR": "Mauritania",
            "MU": "Mauritius",
            "YT": "Mayotte",
            "MX": "Mexico",
            "FM": "Micronesia",
            "MD": "Moldova",
            "MC": "Monaco",
            "MN": "Mongolia",
            "ME": "Montenegro",
            "MS": "Montserrat",
            "MA": "Morocco",
            "MZ": "Mozambique",
            "MM": "Myanmar",
            "NA": "Namibia",
            "NR": "Nauru",
            "NP": "Nepal",
            "NL": "Netherlands",
            "AN": "Netherlands Antilles",
            "NC": "New Caledonia",
            "NZ": "New Zealand",
            "NI": "Nicaragua",
            "NE": "Niger",
            "NG": "Nigeria",
            "NU": "Niue",
            "NF": "Norfolk Island",
            "KP": "North Korea",
            "NO": "Norway",
            "OM": "Oman",
            "PK": "Pakistan",
            "PW": "Palau",
            "PS": "Palestinian Territory",
            "PA": "Panama",
            "PG": "Papua New Guinea",
            "PY": "Paraguay",
            "PE": "Peru",
            "PH": "Philippines",
            "PN": "Pitcairn",
            "PL": "Poland",
            "PT": "Portugal",
            "QA": "Qatar",
            "RE": "Reunion",
            "RO": "Romania",
            "RU": "Russia",
            "RW": "Rwanda",
            "ST": "São Tomé and Príncipe",
            "BL": "Saint Barthélemy",
            "SH": "Saint Helena",
            "KN": "Saint Kitts and Nevis",
            "LC": "Saint Lucia",
            "SX": "Saint Martin (Dutch part)",
            "MF": "Saint Martin (French part)",
            "PM": "Saint Pierre and Miquelon",
            "VC": "Saint Vincent and the Grenadines",
            "SM": "San Marino",
            "SA": "Saudi Arabia",
            "SN": "Senegal",
            "RS": "Serbia",
            "SC": "Seychelles",
            "SL": "Sierra Leone",
            "SG": "Singapore",
            "SK": "Slovakia",
            "SI": "Slovenia",
            "SB": "Solomon Islands",
            "SO": "Somalia",
            "ZA": "South Africa",
            "GS": "South Georgia/Sandwich Islands",
            "KR": "South Korea",
            "SS": "South Sudan",
            "ES": "Spain",
            "LK": "Sri Lanka",
            "SD": "Sudan",
            "SR": "Suriname",
            "SJ": "Svalbard and Jan Mayen",
            "SZ": "Swaziland",
            "SE": "Sweden",
            "CH": "Switzerland",
            "SY": "Syria",
            "TW": "Taiwan",
            "TJ": "Tajikistan",
            "TZ": "Tanzania",
            "TH": "Thailand",
            "TL": "Timor-Leste",
            "TG": "Togo",
            "TK": "Tokelau",
            "TO": "Tonga",
            "TT": "Trinidad and Tobago",
            "TN": "Tunisia",
            "TR": "Turkey",
            "TM": "Turkmenistan",
            "TC": "Turks and Caicos Islands",
            "TV": "Tuvalu",
            "UG": "Uganda",
            "UA": "Ukraine",
            "AE": "United Arab Emirates",
            "GB": "United Kingdom (UK)",
            "US": "United States (US)",
            "UY": "Uruguay",
            "UZ": "Uzbekistan",
            "VU": "Vanuatu",
            "VA": "Vatican",
            "VE": "Venezuela",
            "VN": "Vietnam",
            "WF": "Wallis and Futuna",
            "EH": "Western Sahara",
            "WS": "Western Samoa",
            "YE": "Yemen",
            "ZM": "Zambia",
            "ZW": "Zimbabwe"
        };
        this.states = { SG: {}, AF: { BADAKHSHAN: "Badakhshan", BADGHIS: "Badghis", BAGHLAN: "Baghlan", BALKH: "Balkh", BAMIAN: "Bamian", DAYKONDI: "Daykondi", FARAH: "Farah", FARYAB: "Faryab", GHAZNI: "Ghazni", GHOWR: "Ghowr", HELMAND: "Helmand", HERAT: "Herat", JOWZJAN: "Jowzjan", KABUL: "Kabul", KANDAHAR: "Kandahar", KAPISA: "Kapisa", KHOST: "Khost", KONAR: "Konar", KONDOZ: "Kondoz", LAGHMAN: "Laghman", LOWGAR: "Lowgar", NANGARHAR: "Nangarhar", NIMRUZ: "Nimruz", NURESTAN: "Nurestan", ORUZGAN: "Oruzgan", PAKTIA: "Paktia", PAKTIKA: "Paktika", PANJSHIR: "Panjshir", PARVAN: "Parvan", SAMANGAN: "Samangan", "SAR-EPOL": "Sar-e Pol", TAKHAR: "Takhar", VARDAK: "Vardak", ZABOL: "Zabol" }, AL: { BERAT: "Berat", DIBRES: "Dibres", DURRES: "Durres", ELBASAN: "Elbasan", FIER: "Fier", GJIROKASTRE: "Gjirokastre", KORCE: "Korce", KUKES: "Kukes", LEZHE: "Lezhe", SHKODER: "Shkoder", TIRANE: "Tirane", VLORE: "Vlore" }, DZ: { ADRAR: "Adrar", AINDEFLA: "Ain Defla", AINTEMOUCHENT: "Ain Temouchent", ALGER: "Alger", ANNABA: "Annaba", BATNA: "Batna", BECHAR: "Bechar", BEJAIA: "Bejaia", BISKRA: "Biskra", BLIDA: "Blida", BORDJBOUARRERIDJ: "Bordj Bou Arreridj", BOUIRA: "Bouira", BOUMERDES: "Boumerdes", CHLEF: "Chlef", CONSTANTINE: "Constantine", DJELFA: "Djelfa", ELBAYADH: "El Bayadh", ELOUED: "El Oued", ELTARF: "El Tarf", GHARDAIA: "Ghardaia", GUELMA: "Guelma", ILLIZI: "Illizi", JIJEL: "Jijel", KHENCHELA: "Khenchela", LAGHOUAT: "Laghouat", MUASKAR: "Muaskar", MEDEA: "Medea", MILA: "Mila", MOSTAGANEM: "Mostaganem", "M'SILA": "M'Sila", NAAMA: "Naama", ORAN: "Oran", OUARGLA: "Ouargla", OUMELBOUAGHI: "Oum el Bouaghi", RELIZANE: "Relizane", SAIDA: "Saida", SETIF: "Setif", SIDIBELABBES: "Sidi Bel Abbes", SKIKDA: "Skikda", SOUKAHRAS: "Souk Ahras", TAMANGHASSET: "Tamanghasset", TEBESSA: "Tebessa", TIARET: "Tiaret", TINDOUF: "Tindouf", TIPAZA: "Tipaza", TISSEMSILT: "Tissemsilt", TIZIOUZOU: "Tizi Ouzou", TLEMCEN: "Tlemcen" }, AD: { ANDORRALAVELLA: "Andorra la Vella", CANILLO: "Canillo", ENCAMP: "Encamp", "ESCALDES-ENGORDANY": "Escaldes-Engordany", LAMASSANA: "La Massana", ORDINO: "Ordino", SANTJULIADELORIA: "Sant Julia de Loria" }, AO: { BENGO: "Bengo", BENGUELA: "Benguela", BIE: "Bie", CABINDA: "Cabinda", CUANDOCUBANGO: "Cuando Cubango", CUANZANORTE: "Cuanza Norte", CUANZASUL: "Cuanza Sul", CUNENE: "Cunene", HUAMBO: "Huambo", HUILA: "Huila", LUANDA: "Luanda", LUNDANORTE: "Lunda Norte", LUNDASUL: "Lunda Sul", MALANJE: "Malanje", MOXICO: "Moxico", NAMIBE: "Namibe", UIGE: "Uige", ZAIRE: "Zaire" }, AG: { BARBUDA: "Barbuda", REDONDA: "Redonda", SAINTGEORGE: "Saint George", SAINTJOHN: "Saint John", SAINTMARY: "Saint Mary", SAINTPAUL: "Saint Paul", SAINTPETER: "Saint Peter", SAINTPHILIP: "Saint Philip" }, AR: { DF: "Ciudad de Buenos Aires", BA: "Buenos Aires", CT: "Catamarca", CC: "Chaco", CH: "Chubut", CB: "Cordoba", CN: "Corrientes", ER: "Entre Rios", FM: "Formosa", JY: "Jujuy", LP: "La Pampa", LR: "La Rioja", MZ: "Mendoza", MN: "Misiones", NQ: "Neuquen", RN: "Rio Negro", SA: "Salta", SJ: "San Juan", SL: "San Luis", SC: "Santa Cruz", SF: "Santa Fe", SE: "Santiago del Estero", TF: "Tierra del Fuego", TM: "Tucuman" }, AM: { ARAGATSOTN: "Aragatsotn", ARARAT: "Ararat", ARMAVIR: "Armavir", "GEGHARK'UNIK'": "Geghark'unik'", "KOTAYK'": "Kotayk'", LORRI: "Lorri", SHIRAK: "Shirak", "SYUNIK'": "Syunik'", TAVUSH: "Tavush", "VAYOTS'DZOR": "Vayots' Dzor", YEREVAN: "Yerevan" }, AU: { ACT: "Australian Capital Territory", NSW: "New South Wales", NT: "Northern Territory", QLD: "Queensland", SA: "South Australia", TAS: "Tasmania", VIC: "Victoria", WA: "Western Australia" }, AT: { BURGENLAND: "Burgenland", KAERNTEN: "Kaernten", NIEDEROESTERREICH: "Niederoesterreich", OBEROESTERREICH: "Oberoesterreich", SALZBURG: "Salzburg", STEIERMARK: "Steiermark", TIROL: "Tirol", VORARLBERG: "Vorarlberg", WIEN: "Wien" }, AZ: { ABSERONRAYONU: "Abseron Rayonu", AGCABADIRAYONU: "Agcabadi Rayonu", AGDAMRAYONU: "Agdam Rayonu", AGDASRAYONU: "Agdas Rayonu", AGSTAFARAYONU: "Agstafa Rayonu", AGSURAYONU: "Agsu Rayonu", ASTARARAYONU: "Astara Rayonu", BALAKANRAYONU: "Balakan Rayonu", BARDARAYONU: "Barda Rayonu", BEYLAQANRAYONU: "Beylaqan Rayonu", BILASUVONU: "Bilasuvar Rayonu", CABRAYILRAYONU: "Cabrayil Rayonu", CALILABADRAYONU: "Calilabad Rayonu", DASKASANRAYONU: "Daskasan Rayonu", DAVACIRAYONU: "Davaci Rayonu", FUZULIRAYONU: "Fuzuli Rayonu", GADABAYRAYONU: "Gadabay Rayonu", GORANBOYRAYONU: "Goranboy Rayonu", GOYCAYRAYONU: "Goycay Rayonu", HACIQABULRAYONU: "Haciqabul Rayonu", IMISLIRAYONU: "Imisli Rayonu", ISMAYILLIRAYONU: "Ismayilli Rayonu", KALBACONU: "Kalbacar Rayonu", KURDAMIRRAYONU: "Kurdamir Rayonu", LACINRAYONU: "Lacin Rayonu", LANKARANRAYONU: "Lankaran Rayonu", LERIKRAYONU: "Lerik Rayonu", MASALLIRAYONU: "Masalli Rayonu", NEFTCALARAYONU: "Neftcala Rayonu", OGUZRAYONU: "Oguz Rayonu", QABALARAYONU: "Qabala Rayonu", QAXRAYONU: "Qax Rayonu", QAZAXRAYONU: "Qazax Rayonu", QOBUSTANRAYONU: "Qobustan Rayonu", QUBARAYONU: "Quba Rayonu", QUBADLIRAYONU: "Qubadli Rayonu", QUSONU: "Qusar Rayonu", SAATLIRAYONU: "Saatli Rayonu", SABIRABADRAYONU: "Sabirabad Rayonu", SAKIRAYONU: "Saki Rayonu", SALYANRAYONU: "Salyan Rayonu", SAMAXIRAYONU: "Samaxi Rayonu", SAMKIRRAYONU: "Samkir Rayonu", SAMUXRAYONU: "Samux Rayonu", SIYAZANRAYONU: "Siyazan Rayonu", SUSARAYONU: "Susa Rayonu", TARTONU: "Tartar Rayonu", TOVUZRAYONU: "Tovuz Rayonu", UCONU: "Ucar Rayonu", XACMAZRAYONU: "Xacmaz Rayonu", XANLONU: "Xanlar Rayonu", XIZIRAYONU: "Xizi Rayonu", XOCALIRAYONU: "Xocali Rayonu", XOCAVANDRAYONU: "Xocavand Rayonu", YARDIMLIRAYONU: "Yardimli Rayonu", YEVLAXRAYONU: "Yevlax Rayonu", ZANGILANRAYONU: "Zangilan Rayonu", ZAQATALARAYONU: "Zaqatala Rayonu", ZARDABRAYONU: "Zardab Rayonu", ALIBAYRAMLISAHARI: "Ali Bayramli Sahari", BAKISAHARI: "Baki Sahari", GANCASAHARI: "Ganca Sahari", LANKARANSAHARI: "Lankaran Sahari", MINGACEVIRSAHARI: "Mingacevir Sahari", NAFTALANSAHARI: "Naftalan Sahari", SAKISAHARI: "Saki Sahari", SUMQAYITSAHARI: "Sumqayit Sahari", SUSASAHARI: "Susa Sahari", XANKANDISAHARI: "Xankandi Sahari", YEVLAXSAHARI: "Yevlax Sahari", NAXCIVANMUXTAR: "Naxcivan Muxtar" }, BS: { ACKLINSANDCROOKEDISLANDS: "Acklins and Crooked Islands", BIMINI: "Bimini", CATISLAND: "Cat Island", EXUMA: "Exuma", FREEPORT: "Freeport", FRESHCREEK: "Fresh Creek", "GOVERNOR'SHARBOUR": "Governor's Harbour", GREENTURTLECAY: "Green Turtle Cay", HARBOURISLAND: "Harbour Island", HIGHROCK: "High Rock", INAGUA: "Inagua", KEMPSBAY: "Kemps Bay", LONGISLAND: "Long Island", MARSHHARBOUR: "Marsh Harbour", MAYAGUANA: "Mayaguana", NEWPROVIDENCE: "New Providence", NICHOLLSTOWNANDBERRYISLANDS: "Nichollstown and Berry Islands", RAGGEDISLAND: "Ragged Island", ROCKSOUND: "Rock Sound", SANDYPOINT: "Sandy Point", SANSALVADORANDRUMCAY: "San Salvador and Rum Cay" }, BH: { ALHADD: "Al Hadd", ALMANAMAH: "Al Manamah", ALMINTAQAHALGHARBIYAH: "Al Mintaqah al Gharbiyah", ALMINTAQAHALWUSTA: "Al Mintaqah al Wusta", ALMINTAQAHASHSHAMALIYAH: "Al Mintaqah ash Shamaliyah", ALMUHARRAQ: "Al Muharraq", "ARRIFA'WAALMINTAQAHALJANUBIYAH": "Ar Rifa' wa al Mintaqah al Janubiyah", JIDDHAFS: "Jidd Hafs", MADINATHAMAD: "Madinat Hamad", "MADINAT'ISA": "Madinat 'Isa", JUZURHAWAR: "Juzur Hawar", SITRAH: "Sitrah" }, BD: { BAG: "Bagerhat", BAN: "Bandarban", BAR: "Barguna", BARI: "Barisal", BHO: "Bhola", BOG: "Bogra", BRA: "Brahmanbaria", CHA: "Chandpur", CHI: "Chittagong", CHU: "Chuadanga", COM: "Comilla", COX: "Cox's Bazar", DHA: "Dhaka", DIN: "Dinajpur", FAR: "Faridpur ", FEN: "Feni", GAI: "Gaibandha", GAZI: "Gazipur", GOP: "Gopalganj", HAB: "Habiganj", JAM: "Jamalpur", JES: "Jessore", JHA: "Jhalokati", JHE: "Jhenaidah", JOY: "Joypurhat", KHA: "Khagrachhari", KHU: "Khulna", KIS: "Kishoreganj", KUR: "Kurigram", KUS: "Kushtia", LAK: "Lakshmipur", LAL: "Lalmonirhat", MAD: "Madaripur", MAG: "Magura", MAN: "Manikganj ", MEH: "Meherpur", MOU: "Moulvibazar", MUN: "Munshiganj", MYM: "Mymensingh", NAO: "Naogaon", NAR: "Narail", NARG: "Narayanganj", NARD: "Narsingdi", NAT: "Natore", NAW: "Nawabganj", NET: "Netrakona", NIL: "Nilphamari", NOA: "Noakhali", PAB: "Pabna", PAN: "Panchagarh", PAT: "Patuakhali", PIR: "Pirojpur", RAJB: "Rajbari", RAJ: "Rajshahi", RAN: "Rangamati", RANP: "Rangpur", SAT: "Satkhira", SHA: "Shariatpur", SHE: "Sherpur", SIR: "Sirajganj", SUN: "Sunamganj", SYL: "Sylhet", TAN: "Tangail", THA: "Thakurgaon" }, BB: { CHRISTCHURCH: "Christ Church", SAINTANDREW: "Saint Andrew", SAINTGEORGE: "Saint George", SAINTJAMES: "Saint James", SAINTJOHN: "Saint John", SAINTJOSEPH: "Saint Joseph", SAINTLUCY: "Saint Lucy", SAINTMICHAEL: "Saint Michael", SAINTPETER: "Saint Peter", SAINTPHILIP: "Saint Philip", SAINTTHOMAS: "Saint Thomas" }, BY: { BREST: "Brest", HOMYEL: "Homyel", HORADMINSK: "Horad Minsk", HRODNA: "Hrodna", MAHILYOW: "Mahilyow", MINSK: "Minsk", VITSYEBSK: "Vitsyebsk" }, BE: { ANTWERPEN: "Antwerpen", BRABANTWALLON: "Brabant Wallon", BRUSSELS: "Brussels", FLANDERS: "Flanders", HAINAUT: "Hainaut", LIEGE: "Liege", LIMBURG: "Limburg", LUXEMBOURG: "Luxembourg", NAMUR: "Namur", "OOST-VLAANDEREN": "Oost-Vlaanderen", "VLAAMS-BRABANT": "Vlaams-Brabant", WALLONIA: "Wallonia", "WEST-VLAANDEREN": "West-Vlaanderen" }, BZ: { BELIZE: "Belize", CAYO: "Cayo", COROZAL: "Corozal", ORANGEWALK: "Orange Walk", STANNCREEK: "Stann Creek", TOLEDO: "Toledo" }, BJ: { ALIBORI: "Alibori", ATAKORA: "Atakora", ATLANTIQUE: "Atlantique", BORGOU: "Borgou", COLLINES: "Collines", DONGA: "Donga", KOUFFO: "Kouffo", LITTORAL: "Littoral", MONO: "Mono", OUEME: "Oueme", PLATEAU: "Plateau", ZOU: "Zou" }, BM: { DEVONSHIRE: "Devonshire", HAMILTON: "Hamilton", PAGET: "Paget", PEMBROKE: "Pembroke", SAINTGEORGE: "Saint George", "SAINTGEORGE'S": "Saint George's", SANDYS: "Sandys", "SMITH'S": "Smith's", SOUTHAMPTON: "Southampton", WARWICK: "Warwick" }, BT: { BUMTHANG: "Bumthang", CHUKHA: "Chukha", DAGANA: "Dagana", GASA: "Gasa", HAA: "Haa", LHUNTSE: "Lhuntse", MONGAR: "Mongar", PARO: "Paro", PEMAGATSHEL: "Pemagatshel", PUNAKHA: "Punakha", SAMDRUPJONGKHAR: "Samdrup Jongkhar", SAMTSE: "Samtse", SARPANG: "Sarpang", THIMPHU: "Thimphu", TRASHIGANG: "Trashigang", TRASHIYANGSTE: "Trashiyangste", TRONGSA: "Trongsa", TSIRANG: "Tsirang", WANGDUEPHODRANG: "Wangdue Phodrang", ZHEMGANG: "Zhemgang" }, BO: { CHUQUISACA: "Chuquisaca", COCHABAMBA: "Cochabamba", BENI: "Beni", LAPAZ: "La Paz", ORURO: "Oruro", PANDO: "Pando", POTOSI: "Potosi", SANTACRUZ: "Santa Cruz", TARIJA: "Tarija" }, BA: { "UNA-SANA[FEDERATION]": "Una-Sana [Federation]", "POSAVINA[FEDERATION]": "Posavina [Federation]", "TUZLA[FEDERATION]": "Tuzla [Federation]", "ZENICA-DOBOJ[FEDERATION]": "Zenica-Doboj [Federation]", "BOSNIANPODRINJE[FEDERATION]": "Bosnian Podrinje [Federation]", "CENTRALBOSNIA[FEDERATION]": "Central Bosnia [Federation]", "HERZEGOVINA-NERETVA[FEDERATION]": "Herzegovina-Neretva [Federation]", "WESTHERZEGOVINA[FEDERATION]": "West Herzegovina [Federation]", "SARAJEVO[FEDERATION]": "Sarajevo [Federation]", "WESTBOSNIA[FEDERATION]": " West Bosnia [Federation]", "BANJALUKA[RS]": "Banja Luka [RS]", "BIJELJINA[RS]": "Bijeljina [RS]", "DOBOJ[RS]": "Doboj [RS]", "FO?A[RS]": "Fo?a [RS]", "SARAJEVO-ROMANIJA[RS]": "Sarajevo-Romanija [RS]", "TREBINJE[RS]": "Trebinje [RS]", "VLASENICA[RS]": "Vlasenica [RS]" }, BW: { CENTRAL: "Central", GHANZI: "Ghanzi", KGALAGADI: "Kgalagadi", KGATLENG: "Kgatleng", KWENENG: "Kweneng", NORTHEAST: "North East", NORTHWEST: "North West", SOUTHEAST: "South East", SOUTHERN: "Southern" }, BR: { AC: "Acre", AL: "Alagoas", AP: "Amapá", AM: "Amazonas", BA: "Bahia", CE: "Ceará", DF: "Distrito Federal", ES: "Espírito Santo", GO: "Goiás", MA: "Maranhão", MT: "Mato Grosso", MS: "Mato Grosso do Sul", MG: "Minas Gerais", PA: "Pará", PB: "Paraíba", PR: "Paraná", PE: "Pernambuco", PI: "Piauí", RJ: "Rio de Janeiro", RN: "Rio Grande do Norte", RS: "Rio Grande do Sul", RO: "Rondônia", RR: "Roraima", SC: "Santa Catarina", SP: "São Paulo", SE: "Sergipe", TO: "Tocantins" }, BN: { BELAIT: "Belait", BRUNEIANDMUARA: "Brunei and Muara", TEMBURONG: "Temburong", TUTONG: "Tutong" }, BG: { "BG-01": "Blagoevgrad", "BG-02": "Burgas", "BG-08": "Dobrich", "BG-07": "Gabrovo", "BG-26": "Haskovo", "BG-09": "Kardzhali", "BG-10": "Kyustendil", "BG-11": "Lovech", "BG-12": "Montana", "BG-13": "Pazardzhik", "BG-14": "Pernik", "BG-15": "Pleven", "BG-16": "Plovdiv", "BG-17": "Razgrad", "BG-18": "Ruse", "BG-27": "Shumen", "BG-19": "Silistra", "BG-20": "Sliven", "BG-21": "Smolyan", "BG-23": "Sofia", "BG-22": "Sofia-Grad", "BG-24": "Stara Zagora", "BG-25": "Targovishte", "BG-03": "Varna", "BG-04": "Veliko Tarnovo", "BG-05": "Vidin", "BG-06": "Vratsa", "BG-28": "Yambol" }, BF: { BALE: "Bale", BAM: "Bam", BANWA: "Banwa", BAZEGA: "Bazega", BOUGOURIBA: "Bougouriba", BOULGOU: "Boulgou", BOULKIEMDE: "Boulkiemde", COMOE: "Comoe", GANZOURGOU: "Ganzourgou", GNAGNA: "Gnagna", GOURMA: "Gourma", HOUET: "Houet", IOBA: "Ioba", KADIOGO: "Kadiogo", KENEDOUGOU: "Kenedougou", KOMONDJARI: "Komondjari", KOMPIENGA: "Kompienga", KOSSI: "Kossi", KOULPELOGO: "Koulpelogo", KOURITENGA: "Kouritenga", KOURWEOGO: "Kourweogo", LERABA: "Leraba", LOROUM: "Loroum", MOUHOUN: "Mouhoun", NAMENTENGA: "Namentenga", NAHOURI: "Nahouri", NAYALA: "Nayala", NOUMBIEL: "Noumbiel", OUBRITENGA: "Oubritenga", OUDALAN: "Oudalan", PASSORE: "Passore", PONI: "Poni", SANGUIE: "Sanguie", SANMATENGA: "Sanmatenga", SENO: "Seno", SISSILI: "Sissili", SOUM: "Soum", SOUROU: "Sourou", TAPOA: "Tapoa", TUY: "Tuy", YAGHA: "Yagha", YATENGA: "Yatenga", ZIRO: "Ziro", ZONDOMA: "Zondoma", ZOUNDWEOGO: "Zoundweogo" }, BI: { BUBANZA: "Bubanza", BUJUMBURAMAIRIE: "Bujumbura Mairie", BUJUMBURARURAL: "Bujumbura Rural", BURURI: "Bururi", CANKUZO: "Cankuzo", CIBITOKE: "Cibitoke", GITEGA: "Gitega", KARUZI: "Karuzi", KAYANZA: "Kayanza", KIRUNDO: "Kirundo", MAKAMBA: "Makamba", MURAMVYA: "Muramvya", MUYINGA: "Muyinga", MWARO: "Mwaro", NGOZI: "Ngozi", RUTANA: "Rutana", RUYIGI: "Ruyigi" }, KH: { BANTEAYMEANCHEY: "Banteay Mean Chey", BATDAMBANG: "Batdambang", KAMPONGCHAM: "Kampong Cham", KAMPONGCHHNANG: "Kampong Chhnang", KAMPONGSPOE: "Kampong Spoe", KAMPONGTHUM: "Kampong Thum", KAMPOT: "Kampot", KANDAL: "Kandal", KOHKONG: "Koh Kong", KRACHEH: "Kracheh", MONDOLKIRI: "Mondol Kiri", OTDARMEANCHEY: "Otdar Mean Chey", POUTHISAT: "Pouthisat", PREAHVIHEAR: "Preah Vihear", PREYVENG: "Prey Veng", ROTANAKIR: "Rotanakir", SIEMREAB: "Siem Reab", STOENGTRENG: "Stoeng Treng", SVAYRIENG: "Svay Rieng", TAKAO: "Takao", KEB: "Keb", PAILIN: "Pailin", PHNOMPENH: "Phnom Penh", PREAHSEIHANU: "Preah Seihanu" }, CM: { ADAMAOUA: "Adamaoua", CENTRE: "Centre", EST: "Est", "EXTREME-NORD": "Extreme-Nord", LITTORAL: "Littoral", NORD: "Nord", "NORD-OUEST": "Nord-Ouest", OUEST: "Ouest", SUD: "Sud", "SUD-OUEST": "Sud-Ouest" }, CA: { AB: "Alberta", BC: "British Columbia", MB: "Manitoba", NB: "New Brunswick", NL: "Newfoundland", NT: "Northwest Territories", NS: "Nova Scotia", NU: "Nunavut", ON: "Ontario", PE: "Prince Edward Island", QC: "Quebec", SK: "Saskatchewan", YT: "Yukon Territory" }, CF: { "BAMINGUI-BANGORAN": "Bamingui-Bangoran", BANGUI: "Bangui", "BASSE-KOTTO": "Basse-Kotto", "HAUTE-KOTTO": "Haute-Kotto", "HAUT-MBOMOU": "Haut-Mbomou", KEMO: "Kemo", LOBAYE: "Lobaye", "MAMBERE-KADEI": "Mambere-Kadei", MBOMOU: "Mbomou", "NANA-GREBIZI": "Nana-Grebizi", "NANA-MAMBERE": "Nana-Mambere", "OMBELLA-MPOKO": "Ombella-Mpoko", OUAKA: "Ouaka", OUHAM: "Ouham", "OUHAM-PENDE": "Ouham-Pende", "SANGHA-MBAERE": "Sangha-Mbaere", VAKAGA: "Vakaga" }, TD: { BATHA: "Batha", BILTINE: "Biltine", "BORKOU-ENNEDI-TIBESTI": "Borkou-Ennedi-Tibesti", "CHARI-BAGUIRMI": "Chari-Baguirmi", "GUéRA": "Guéra", KANEM: "Kanem", LAC: "Lac", LOGONEOCCIDENTAL: "Logone Occidental", LOGONEORIENTAL: "Logone Oriental", "MAYO-KEBBI": "Mayo-Kebbi", "MOYEN-CHARI": "Moyen-Chari", "OUADDAï": "Ouaddaï", SALAMAT: "Salamat", TANDJILE: "Tandjile" }, CL: { AYSEN: "Aysen", ANTOFAGASTA: "Antofagasta", ARAUCANIA: "Araucania", ATACAMA: "Atacama", "BIO-BIO": "Bio-Bio", COQUIMBO: "Coquimbo", "O'HIGGINS": "O'Higgins", LOSLAGOS: "Los Lagos", MAGALLANESYLAANTARTICACHILENA: "Magallanes y la Antartica Chilena", MAULE: "Maule", SANTIAGOREGIONMETROPOLITANA: "Santiago Region Metropolitana", TARAPACA: "Tarapaca", VALPARAISO: "Valparaiso" }, CN: { CN1: "Yunnan / 云南", CN2: "Beijing / 北京", CN3: "Tianjin / 天津", CN4: "Hebei / 河北", CN5: "Shanxi / 山西", CN6: "Inner Mongolia / 內蒙古", CN7: "Liaoning / 辽宁", CN8: "Jilin / 吉林", CN9: "Heilongjiang / 黑龙江", CN10: "Shanghai / 上海", CN11: "Jiangsu / 江苏", CN12: "Zhejiang / 浙江", CN13: "Anhui / 安徽", CN14: "Fujian / 福建", CN15: "Jiangxi / 江西", CN16: "Shandong / 山东", CN17: "Henan / 河南", CN18: "Hubei / 湖北", CN19: "Hunan / 湖南", CN20: "Guangdong / 广东", CN21: "Guangxi Zhuang / 广西壮族", CN22: "Hainan / 海南", CN23: "Chongqing / 重庆", CN24: "Sichuan / 四川", CN25: "Guizhou / 贵州", CN26: "Shaanxi / 陕西", CN27: "Gansu / 甘肃", CN28: "Qinghai / 青海", CN29: "Ningxia Hui / 宁夏", CN30: "Macau / 澳门", CN31: "Tibet / 西藏", CN32: "Xinjiang / 新疆" }, CO: { AMAZONAS: "Amazonas", ANTIOQUIA: "Antioquia", ARAUCA: "Arauca", ATLANTICO: "Atlantico", BOGOTADISTRICTCAPITAL: "Bogota District Capital", BOLIVAR: "Bolivar", BOYACA: "Boyaca", CALDAS: "Caldas", CAQUETA: "Caqueta", CASANARE: "Casanare", CAUCA: "Cauca", CESAR: "Cesar", CHOCO: "Choco", CORDOBA: "Cordoba", CUNDINAMARCA: "Cundinamarca", GUAINIA: "Guainia", GUAVIARE: "Guaviare", HUILA: "Huila", LAGUAJIRA: "La Guajira", MAGDALENA: "Magdalena", META: "Meta", NARINO: "Narino", NORTEDESANTANDER: "Norte de Santander", PUTUMAYO: "Putumayo", QUINDIO: "Quindio", RISARALDA: "Risaralda", "SANANDRES&PROVIDENCIA": "San Andres & Providencia", SANTANDER: "Santander", SUCRE: "Sucre", TOLIMA: "Tolima", VALLEDELCAUCA: "Valle del Cauca", VAUPES: "Vaupes", VICHADA: "Vichada" }, KM: { "GRANDECOMORE{NJAZIDJA},": "Grande Comore {Njazidja},", "ANJOUAN{NZWANI},": "Anjouan {Nzwani},", "MOHELI{MWALI},": "Moheli {Mwali}," }, CR: { ALAJUELA: "Alajuela", CARTAGO: "Cartago", GUANACASTE: "Guanacaste", HEREDIA: "Heredia", LIMON: "Limon", PUNTARENAS: "Puntarenas", SANJOSE: "San Jose" }, HR: { "BJELOVARSKO-BILOGORSKA": "Bjelovarsko-Bilogorska", "BRODSKO-POSAVSKA": "Brodsko-Posavska", "DUBROVACKO-NERETVANSKA": "Dubrovacko-Neretvanska", ISTARSKA: "Istarska", KARLOVACKA: "Karlovacka", "KOPRIVNICKO-KRIZEVACKA": "Koprivnicko-Krizevacka", "KRAPINSKO-ZAGORSKA": "Krapinsko-Zagorska", "LICKO-SENJSKA": "Licko-Senjska", MEDIMURSKA: "Medimurska", "OSJECKO-BARANJSKA": "Osjecko-Baranjska", "POZESKO-SLAVONSKA": "Pozesko-Slavonska", "PRIMORSKO-GORANSKA": "Primorsko-Goranska", "SIBENSKO-KNINSKA": "Sibensko-Kninska", "SISACKO-MOSLAVACKA": "Sisacko-Moslavacka", "SPLITSKO-DALMATINSKA": "Splitsko-Dalmatinska", VARAZDINSKA: "Varazdinska", "VIROVITICKO-PODRAVSKA": "Viroviticko-Podravska", "VUKOVARSKO-SRIJEMSKA": "Vukovarsko-Srijemska", ZADARSKA: "Zadarska", ZAGREB: "Zagreb", ZAGREBACKA: "Zagrebacka" }, CU: { CAMAGUEY: "Camaguey", CIEGODEAVILA: "Ciego de Avila", CIENFUEGOS: "Cienfuegos", CIUDADDELAHABANA: "Ciudad de La Habana", GRANMA: "Granma", GUANTANAMO: "Guantanamo", HOLGUIN: "Holguin", ISLADELAJUVENTUD: "Isla de la Juventud", LAHABANA: "La Habana", LASTUNAS: "Las Tunas", MATANZAS: "Matanzas", PINARDELRIO: "Pinar del Rio", SANCTISPIRITUS: "Sancti Spiritus", SANTIAGODECUBA: "Santiago de Cuba", VILLACLARA: "Villa Clara" }, CY: { FAMAGUSTA: "Famagusta", KYRENIA: "Kyrenia", LARNACA: "Larnaca", LIMASSOL: "Limassol", NICOSIA: "Nicosia", PAPHOS: "Paphos" }, CZ: { JIHOCESKYKRAJ: "Jihocesky Kraj", JIHOMORAVSKYKRAJ: "Jihomoravsky Kraj", KARLOVARSKYKRAJ: "Karlovarsky Kraj", KRALOVEHRADECKYKRAJ: "Kralovehradecky Kraj", LIBERECKYKRAJ: "Liberecky Kraj", MORAVSKOSLEZSKYKRAJ: "Moravskoslezsky Kraj", OLOMOUCKYKRAJ: "Olomoucky Kraj", PARDUBICKYKRAJ: "Pardubicky Kraj", PLZENSKYKRAJ: "Plzensky Kraj", PRAHA: "Praha", STREDOCESKYKRAJ: "Stredocesky Kraj", USTECKYKRAJ: "Ustecky Kraj", VYSOCINA: "Vysocina", ZLINSKYKRAJ: "Zlinsky Kraj" }, DK: { ARHUS: "Arhus", BORNHOLM: "Bornholm", FREDERIKSBERG: "Frederiksberg", FREDERIKSBORG: "Frederiksborg", FYN: "Fyn", KOBENHAVN: "Kobenhavn", KOBENHAVNS: "Kobenhavns", NORDJYLLAND: "Nordjylland", RIBE: "Ribe", RINGKOBING: "Ringkobing", ROSKILDE: "Roskilde", SONDERJYLLAND: "Sonderjylland", STORSTROM: "Storstrom", VEJLE: "Vejle", VESTSJALLAND: "Vestsjalland", VIBORG: "Viborg" }, DJ: { ALISABIH: "Ali Sabih", DIKHIL: "Dikhil", DJIBOUTI: "Djibouti", OBOCK: "Obock", TADJOURA: "Tadjoura" }, DM: { SAINTANDREW: "Saint Andrew", SAINTDAVID: "Saint David", SAINTGEORGE: "Saint George", SAINTJOHN: "Saint John", SAINTJOSEPH: "Saint Joseph", SAINTLUKE: "Saint Luke", SAINTMARK: "Saint Mark", SAINTPATRICK: "Saint Patrick", SAINTPAUL: "Saint Paul", SAINTPETER: "Saint Peter" }, DO: { AZUA: "Azua", BAORUCO: "Baoruco", BARAHONA: "Barahona", DAJABON: "Dajabon", DISTRITONACIONAL: "Distrito Nacional", DUARTE: "Duarte", ELIASPINA: "Elias Pina", ELSEIBO: "El Seibo", ESPAILLAT: "Espaillat", HATOMAYOR: "Hato Mayor", INDEPENDENCIA: "Independencia", LAALTAGRACIA: "La Altagracia", LAROMANA: "La Romana", LAVEGA: "La Vega", MARIATRINIDADSANCHEZ: "Maria Trinidad Sanchez", MONSENORNOUEL: "Monsenor Nouel", MONTECRISTI: "Monte Cristi", MONTEPLATA: "Monte Plata", PEDERNALES: "Pedernales", PERAVIA: "Peravia", PUERTOPLATA: "Puerto Plata", SALCEDO: "Salcedo", SAMANA: "Samana", SANCHEZRAMIREZ: "Sanchez Ramirez", SANCRISTOBAL: "San Cristobal", SANJOSEDEOCOA: "San Jose de Ocoa", SANJUAN: "San Juan", SANPEDRODEMACORIS: "San Pedro de Macoris", SANTIAGO: "Santiago", SANTIAGORODRIGUEZ: "Santiago Rodriguez", SANTODOMINGO: "Santo Domingo", VALVERDE: "Valverde" }, EC: { AZUAY: "Azuay", BOLIVAR: "Bolivar", CANAR: "Canar", CARCHI: "Carchi", CHIMBORAZO: "Chimborazo", COTOPAXI: "Cotopaxi", ELORO: "El Oro", ESMERALDAS: "Esmeraldas", GALAPAGOS: "Galapagos", GUAYAS: "Guayas", IMBABURA: "Imbabura", LOJA: "Loja", LOSRIOS: "Los Rios", MANABI: "Manabi", "MORONA-SANTIAGO": "Morona-Santiago", NAPO: "Napo", ORELLANA: "Orellana", PASTAZA: "Pastaza", PICHINCHA: "Pichincha", SUCUMBIOS: "Sucumbios", TUNGURAHUA: "Tungurahua", "ZAMORA-CHINCHIPE": "Zamora-Chinchipe" }, EG: { ADDAQAHLIYAH: "Ad Daqahliyah", ALBAHRALAHMAR: "Al Bahr al Ahmar", ALBUHAYRAH: "Al Buhayrah", ALFAYYUM: "Al Fayyum", ALGHARBIYAH: "Al Gharbiyah", ALISKANDARIYAH: "Al Iskandariyah", "ALISMA'ILIYAH": "Al Isma'iliyah", ALJIZAH: "Al Jizah", ALMINUFIYAH: "Al Minufiyah", ALMINYA: "Al Minya", ALQAHIRAH: "Al Qahirah", ALQALYUBIYAH: "Al Qalyubiyah", ALWADIALJADID: "Al Wadi al Jadid", ASHSHARQIYAH: "Ash Sharqiyah", ASSUWAYS: "As Suways", ASWAN: "Aswan", ASYUT: "Asyut", BANISUWAYF: "Bani Suwayf", "BURSA'ID": "Bur Sa'id", DUMYAT: "Dumyat", "JANUBSINA'": "Janub Sina'", KAFRASHSHAYKH: "Kafr ash Shaykh", MATRUH: "Matruh", QINA: "Qina", "SHAMALSINA'": "Shamal Sina'", SUHAJ: "Suhaj" }, SV: { AHUACHAPAN: "Ahuachapan", CABANAS: "Cabanas", CHALATENANGO: "Chalatenango", CUSCATLAN: "Cuscatlan", LALIBERTAD: "La Libertad", LAPAZ: "La Paz", LAUNION: "La Union", MORAZAN: "Morazan", SANMIGUEL: "San Miguel", SANSALVADOR: "San Salvador", SANTAANA: "Santa Ana", SANVICENTE: "San Vicente", SONSONATE: "Sonsonate", USULUTAN: "Usulutan" }, GQ: { ANNOBON: "Annobon", BIOKONORTE: "Bioko Norte", BIOKOSUR: "Bioko Sur", CENTROSUR: "Centro Sur", "KIE-NTEM": "Kie-Ntem", LITORAL: "Litoral", "WELE-NZAS": "Wele-Nzas" }, ER: { ANSEBA: "Anseba", DEBUB: "Debub", "DEBUBAWIK'EYIHBAHRI": "Debubawi K'eyih Bahri", GASHBARKA: "Gash Barka", "MA'AKEL": "Ma'akel", SEMENAWIKEYIHBAHRI: "Semenawi Keyih Bahri" }, EE: { "HARJUMAA{TALLINN},": "Harjumaa {Tallinn},", "HIIUMAA{KARDLA},": "Hiiumaa {Kardla},", "IDA-VIRUMAA{JOHVI},": "Ida-Virumaa {Johvi},", "JARVAMAA{PAIDE},": "Jarvamaa {Paide},", "JOGEVAMAA{JOGEVA},": "Jogevamaa {Jogeva},", "LAANEMAA{HAAPSALU},": "Laanemaa {Haapsalu},", "LAANE-VIRUMAA{RAKVERE},": "Laane-Virumaa {Rakvere},", "PARNUMAA{PARNU},": "Parnumaa {Parnu},", "POLVAMAA{POLVA},": "Polvamaa {Polva},", "RAPLAMAA{RAPLA},": "Raplamaa {Rapla},", "SAAREMAA{KURESSAARE},": "Saaremaa {Kuressaare},", "TARTUMAA{TARTU},": "Tartumaa {Tartu},", "VALGAMAA{VALGA},": "Valgamaa {Valga},", "VILJANDIMAA{VILJANDI},": "Viljandimaa {Viljandi},", "VORUMAA{VORU},": "Vorumaa {Voru}," }, ET: { ADDISABABA: "Addis Ababa", AFAR: "Afar", AMHARA: "Amhara", BINSHANGULGUMUZ: "Binshangul Gumuz", DIREDAWA: "Dire Dawa", GAMBELAHIZBOCH: "Gambela Hizboch", HARARI: "Harari", OROMIA: "Oromia", SOMALI: "Somali", TIGRAY: "Tigray", "SOUTHERNNATIONS,NATIONALITIES,ANDPEOPLESREGION": "Southern Nations, Nationalities, and Peoples Region" }, FJ: { "CENTRAL{SUVA},": "Central {Suva},", "EASTERN{LEVUKA},": "Eastern {Levuka},", "NORTHERN{LABASA},": "Northern {Labasa},", ROTUMA: "Rotuma", "WESTERN{LAUTOKA},": "Western {Lautoka}," }, FI: { ALAND: "Aland", "ETELA-SUOMENLAANI": "Etela-Suomen Laani", "ITA-SUOMENLAANI": "Ita-Suomen Laani", "LANSI-SUOMENLAANI": "Lansi-Suomen Laani", LAPPI: "Lappi", OULUNLAANI: "Oulun Laani" }, FR: { ALSACE: "Alsace", AQUITAINE: "Aquitaine", AUVERGNE: "Auvergne", "BASSE-NORMANDIE": "Basse-Normandie", BOURGOGNE: "Bourgogne", BRETAGNE: "Bretagne", CENTRE: "Centre", CHAMPAGNEARDENNE: "Champagne-Ardenne", CORSE: "Corse", FRANCHECOMTE: "Franche-Comte", HAUTENORMANDIE: "Haute-Normandie", ILEDEFRANCE: "Ile-de-France", LANGUEDOCROUSSILLON: "Languedoc-Roussillon", LIMOUSIN: "Limousin", LORRAINE: "Lorraine", MIDIPYRENEES: "Midi-Pyrenees", NORDPASDECALAIS: "Nord-Pas-de-Calais", PAYSDELALOIRE: "Pays de la Loire", PICARDIE: "Picardie", POITOUCHARENTES: "Poitou-Charentes", PROVENCEALPESCOTEDAZUR: "Provence-Alpes-Cote d'Azur", RHONEALPES: "Rhone-Alpes" }, GA: { ESTUAIRE: "Estuaire", "HAUT-OGOOUE": "Haut-Ogooue", "MOYEN-OGOOUE": "Moyen-Ogooue", NGOUNIE: "Ngounie", NYANGA: "Nyanga", "OGOOUE-IVINDO": "Ogooue-Ivindo", "OGOOUE-LOLO": "Ogooue-Lolo", "OGOOUE-MARITIME": "Ogooue-Maritime", "WOLEU-NTEM": "Woleu-Ntem" }, GM: { BANJUL: "Banjul", CENTRALRIVER: "Central River", LOWERRIVER: "Lower River", NORTHBANK: "North Bank", UPPERRIVER: "Upper River", WESTERN: "Western" }, DE: { "BADEN-WUERTTEMBERG": "Baden-Wuerttemberg", BAYERN: "Bayern", BERLIN: "Berlin", BRANDENBURG: "Brandenburg", BREMEN: "Bremen", HAMBURG: "Hamburg", HESSEN: "Hessen", "MECKLENBURG-VORPOMMERN": "Mecklenburg-Vorpommern", NIEDERSACHSEN: "Niedersachsen", "NORDRHEIN-WESTFALEN": "Nordrhein-Westfalen", "RHEINLAND-PFALZ": "Rheinland-Pfalz", SAARLAND: "Saarland", SACHSEN: "Sachsen", "SACHSEN-ANHALT": "Sachsen-Anhalt", "SCHLESWIG-HOLSTEIN": "Schleswig-Holstein", THUERINGEN: "Thueringen" }, GH: { ASHANTI: "Ashanti", "BRONG-AHAFO": "Brong-Ahafo", CENTRAL: "Central", EASTERN: "Eastern", GREATERACCRA: "Greater Accra", NORTHERN: "Northern", UPPEREAST: "Upper East", UPPERWEST: "Upper West", VOLTA: "Volta", WESTERN: "Western" }, GR: { AGIONOROS: "Agion Oros", ACHAIA: "Achaia", AITOLIAKAIAKARMANIA: "Aitolia kai Akarmania", ARGOLIS: "Argolis", ARKADIA: "Arkadia", ARTA: "Arta", ATTIKI: "Attiki", CHALKIDIKI: "Chalkidiki", CHANION: "Chanion", CHIOS: "Chios", DODEKANISOS: "Dodekanisos", DRAMA: "Drama", EVROS: "Evros", EVRYTANIA: "Evrytania", EVVOIA: "Evvoia", FLORINA: "Florina", FOKIDOS: "Fokidos", FTHIOTIS: "Fthiotis", GREVENA: "Grevena", ILEIA: "Ileia", IMATHIA: "Imathia", IOANNINA: "Ioannina", IRAKLEION: "Irakleion", KARDITSA: "Karditsa", KASTORIA: "Kastoria", KAVALA: "Kavala", KEFALLINIA: "Kefallinia", KERKYRA: "Kerkyra", KILKIS: "Kilkis", KORINTHIA: "Korinthia", KOZANI: "Kozani", KYKLADES: "Kyklades", LAKONIA: "Lakonia", LARISA: "Larisa", LASITHI: "Lasithi", LEFKAS: "Lefkas", LESVOS: "Lesvos", MAGNISIA: "Magnisia", MESSINIA: "Messinia", PELLA: "Pella", PIERIA: "Pieria", PREVEZA: "Preveza", RETHYNNIS: "Rethynnis", RODOPI: "Rodopi", SAMOS: "Samos", SERRAI: "Serrai", THESPROTIA: "Thesprotia", THESSALONIKI: "Thessaloniki", TRIKALA: "Trikala", VOIOTIA: "Voiotia", XANTHI: "Xanthi", ZAKYNTHOS: "Zakynthos" }, GL: { "AVANNAA{NORDGRONLAND},": "Avannaa {Nordgronland},", "TUNU{OSTGRONLAND},": "Tunu {Ostgronland},", "KITAA{VESTGRONLAND},": "Kitaa {Vestgronland}," }, GD: { CARRIACOUANDPETITMARTINIQUE: "Carriacou and Petit Martinique", SAINTANDREW: "Saint Andrew", SAINTDAVID: "Saint David", SAINTGEORGE: "Saint George", SAINTJOHN: "Saint John", SAINTMARK: "Saint Mark", SAINTPATRICK: "Saint Patrick" }, GT: { ALTAVERAPAZ: "Alta Verapaz", BAJAVERAPAZ: "Baja Verapaz", CHIMALTENANGO: "Chimaltenango", CHIQUIMULA: "Chiquimula", ELPROGRESO: "El Progreso", ESCUINTLA: "Escuintla", GUATEMALA: "Guatemala", HUEHUETENANGO: "Huehuetenango", IZABAL: "Izabal", JALAPA: "Jalapa", JUTIAPA: "Jutiapa", PETEN: "Peten", QUETZALTENANGO: "Quetzaltenango", QUICHE: "Quiche", RETALHULEU: "Retalhuleu", SACATEPEQUEZ: "Sacatepequez", SANMARCOS: "San Marcos", SANTAROSA: "Santa Rosa", SOLOLA: "Solola", SUCHITEPEQUEZ: "Suchitepequez", TOTONICAPAN: "Totonicapan", ZACAPA: "Zacapa" }, GN: { BEYLA: "Beyla", BOFFA: "Boffa", BOKE: "Boke", CONAKRY: "Conakry", COYAH: "Coyah", DABOLA: "Dabola", DALABA: "Dalaba", DINGUIRAYE: "Dinguiraye", DUBREKA: "Dubreka", FARANAH: "Faranah", FORECARIAH: "Forecariah", FRIA: "Fria", GAOUAL: "Gaoual", GUECKEDOU: "Gueckedou", KANKAN: "Kankan", KEROUANE: "Kerouane", KINDIA: "Kindia", KISSIDOUGOU: "Kissidougou", KOUBIA: "Koubia", KOUNDARA: "Koundara", KOUROUSSA: "Kouroussa", LABE: "Labe", LELOUMA: "Lelouma", LOLA: "Lola", MACENTA: "Macenta", MALI: "Mali", MAMOU: "Mamou", MANDIANA: "Mandiana", NZEREKORE: "Nzerekore", PITA: "Pita", SIGUIRI: "Siguiri", TELIMELE: "Telimele", TOUGUE: "Tougue", YOMOU: "Yomou" }, GW: { BAFATA: "Bafata", BIOMBO: "Biombo", BISSAU: "Bissau", BOLAMA: "Bolama", CACHEU: "Cacheu", GABU: "Gabu", OIO: "Oio", QUINARA: "Quinara", TOMBALI: "Tombali" }, GY: { "BARIMA-WAINI": "Barima-Waini", "CUYUNI-MAZARUNI": "Cuyuni-Mazaruni", "DEMERARA-MAHAICA": "Demerara-Mahaica", "EASTBERBICE-CORENTYNE": "East Berbice-Corentyne", "ESSEQUIBOISLANDS-WESTDEMERARA": "Essequibo Islands-West Demerara", "MAHAICA-BERBICE": "Mahaica-Berbice", "POMEROON-SUPENAAM": "Pomeroon-Supenaam", "POTARO-SIPARUNI": "Potaro-Siparuni", "UPPERDEMERARA-BERBICE": "Upper Demerara-Berbice", "UPPERTAKUTU-UPPERESSEQUIBO": "Upper Takutu-Upper Essequibo" }, HT: { ARTIBONITE: "Artibonite", CENTRE: "Centre", "GRAND'ANSE": "Grand 'Anse", NORD: "Nord", "NORD-EST": "Nord-Est", "NORD-OUEST": "Nord-Ouest", OUEST: "Ouest", SUD: "Sud", "SUD-EST": "Sud-Est" }, HN: { ATLANTIDA: "Atlantida", CHOLUTECA: "Choluteca", COLON: "Colon", COMAYAGUA: "Comayagua", COPAN: "Copan", CORTES: "Cortes", ELPARAISO: "El Paraiso", FRANCISCOMORAZAN: "Francisco Morazan", GRACIASADIOS: "Gracias a Dios", INTIBUCA: "Intibuca", ISLASDELABAHIA: "Islas de la Bahia", LAPAZ: "La Paz", LEMPIRA: "Lempira", OCOTEPEQUE: "Ocotepeque", OLANCHO: "Olancho", SANTABARBARA: "Santa Barbara", VALLE: "Valle", YORO: "Yoro" }, HK: { "HONG KONG": "Hong Kong Island", KOWLOON: "Kowloon", "NEW TERRITORIES": "New Territories" }, HU: { BK: "Bács-Kiskun", BE: "Békés", BA: "Baranya", BZ: "Borsod-Abaúj-Zemplén", BU: "Budapest", CS: "Csongrád", FE: "Fejér", GS: "Győr-Moson-Sopron", HB: "Hajdú-Bihar", HE: "Heves", JN: "Jász-Nagykun-Szolnok", KE: "Komárom-Esztergom", NO: "Nógrád", PE: "Pest", SO: "Somogy", SZ: "Szabolcs-Szatmár-Bereg", TO: "Tolna", VA: "Vas", VE: "Veszprém", ZA: "Zala" }, IS: { AUSTURLAND: "Austurland", HOFUDHBORGARSVAEDHI: "Hofudhborgarsvaedhi", NORDHURLANDEYSTRA: "Nordhurland Eystra", NORDHURLANDVESTRA: "Nordhurland Vestra", SUDHURLAND: "Sudhurland", SUDHURNES: "Sudhurnes", VESTFIRDHIR: "Vestfirdhir", VESTURLAND: "Vesturland" }, IN: { AP: "Andra Pradesh", AR: "Arunachal Pradesh", AS: "Assam", BR: "Bihar", CT: "Chhattisgarh", GA: "Goa", GJ: "Gujarat", HR: "Haryana", HP: "Himachal Pradesh", JK: "Jammu and Kashmir", JH: "Jharkhand", KA: "Karnataka", KL: "Kerala", MP: "Madhya Pradesh", MH: "Maharashtra", MN: "Manipur", ML: "Meghalaya", MZ: "Mizoram", NL: "Nagaland", OR: "Orissa", PB: "Punjab", RJ: "Rajasthan", SK: "Sikkim", TN: "Tamil Nadu", TS: "Telangana", TR: "Tripura", UK: "Uttarakhand", UP: "Uttar Pradesh", WB: "West Bengal", AN: "Andaman and Nicobar Islands", CH: "Chandigarh", DN: "Dadar and Nagar Haveli", DD: "Daman and Diu", DL: "Delhi", LD: "Lakshadeep", PY: "Pondicherry {Puducherry}," }, ID: { AC: "Daerah Istimewa Aceh", SU: "Sumatera Utara", SB: "Sumatera Barat", RI: "Riau", KR: "Kepulauan Riau", JA: "Jambi", SS: "Sumatera Selatan", BB: "Bangka Belitung", BE: "Bengkulu", LA: "Lampung", JK: "DKI Jakarta", JB: "Jawa Barat", BT: "Banten", JT: "Jawa Tengah", JI: "Jawa Timur", YO: "Daerah Istimewa Yogyakarta", BA: "Bali", NB: "Nusa Tenggara Barat", NT: "Nusa Tenggara Timur", KB: "Kalimantan Barat", KT: "Kalimantan Tengah", KI: "Kalimantan Timur", KS: "Kalimantan Selatan", KU: "Kalimantan Utara", SA: "Sulawesi Utara", ST: "Sulawesi Tengah", SG: "Sulawesi Tenggara", SR: "Sulawesi Barat", SN: "Sulawesi Selatan", GO: "Gorontalo", MA: "Maluku", MU: "Maluku Utara", PA: "Papua", PB: "Papua Barat" }, IR: { KHZ: "Khuzestan  {خوزستان},", THR: "Tehran  {تهران},", ILM: "Ilaam {ایلام},", BHR: "Bushehr {بوشهر},", ADL: "Ardabil {اردبیل},", ESF: "Isfahan {اصفهان},", YZD: "Yazd {یزد},", KRH: "Kermanshah {کرمانشاه},", KRN: "Kerman {کرمان},", HDN: "Hamadan {همدان},", GZN: "Ghazvin {قزوین},", ZJN: "Zanjan {زنجان},", LRS: "Luristan {لرستان},", ABZ: "Alborz {البرز},", EAZ: "East Azarbaijan {آذربایجان شرقی},", WAZ: "West Azarbaijan {آذربایجان غربی},", CHB: "Chaharmahal and Bakhtiari {چهارمحال و بختیاری},", SKH: "South Khorasan {خراسان جنوبی},", RKH: "Razavi Khorasan {خراسان رضوی},", NKH: "North Khorasan {خراسان جنوبی},", SMN: "Semnan {سمنان},", FRS: "Fars {فارس},", QHM: "Qom {قم},", KRD: "Kurdistan / کردستان},", KBD: "Kohgiluyeh and BoyerAhmad {کهگیلوییه و بویراحمد},", GLS: "Golestan {گلستان},", GIL: "Gilan {گیلان},", MZN: "Mazandaran {مازندران},", MKZ: "Markazi {مرکزی},", HRZ: "Hormozgan {هرمزگان},", SBN: "Sistan and Baluchestan {سیستان و بلوچستان}," }, IQ: { ALANBAR: "Al Anbar", ALBASRAH: "Al Basrah", ALMUTHANNA: "Al Muthanna", ALQADISIYAH: "Al Qadisiyah", ANNAJAF: "An Najaf", ARBIL: "Arbil", ASSULAYMANIYAH: "As Sulaymaniyah", "ATTA'MIM": "At Ta'mim", BABIL: "Babil", BAGHDAD: "Baghdad", DAHUK: "Dahuk", DHIQAR: "Dhi Qar", DIYALA: "Diyala", "KARBALA'": "Karbala'", MAYSAN: "Maysan", NINAWA: "Ninawa", SALAHADDIN: "Salah ad Din", WASIT: "Wasit" }, IE: { CARLOW: "Carlow", CAVAN: "Cavan", CLARE: "Clare", CORK: "Cork", DONEGAL: "Donegal", DUBLIN: "Dublin", GALWAY: "Galway", KERRY: "Kerry", KILDARE: "Kildare", KILKENNY: "Kilkenny", LAOIS: "Laois", LEITRIM: "Leitrim", LIMERICK: "Limerick", LONGFORD: "Longford", LOUTH: "Louth", MAYO: "Mayo", MEATH: "Meath", MONAGHAN: "Monaghan", OFFALY: "Offaly", ROSCOMMON: "Roscommon", SLIGO: "Sligo", TIPPERARY: "Tipperary", WATERFORD: "Waterford", WESTMEATH: "Westmeath", WEXFORD: "Wexford", WICKLOW: "Wicklow" }, IL: { CENTRAL: "Central", HAIFA: "Haifa", JERUSALEM: "Jerusalem", NORTHERN: "Northern", SOUTHERN: "Southern", TELAVIV: "Tel Aviv" }, IT: { AG: "Agrigento", AL: "Alessandria", AN: "Ancona", AO: "Aosta", AR: "Arezzo", AP: "Ascoli Piceno", AT: "Asti", AV: "Avellino", BA: "Bari", BT: "Barletta-Andria-Trani", BL: "Belluno", BN: "Benevento", BG: "Bergamo", BI: "Biella", BO: "Bologna", BZ: "Bolzano", BS: "Brescia", BR: "Brindisi", CA: "Cagliari", CL: "Caltanissetta", CB: "Campobasso", CI: "Carbonia-Iglesias", CE: "Caserta", CT: "Catania", CZ: "Catanzaro", CH: "Chieti", CO: "Como", CS: "Cosenza", CR: "Cremona", KR: "Crotone", CN: "Cuneo", EN: "Enna", FM: "Fermo", FE: "Ferrara", FI: "Firenze", FG: "Foggia", FC: "Forlì-Cesena", FR: "Frosinone", GE: "Genova", GO: "Gorizia", GR: "Grosseto", IM: "Imperia", IS: "Isernia", SP: "La Spezia", AQ: "L'Aquila", LT: "Latina", LE: "Lecce", LC: "Lecco", LI: "Livorno", LO: "Lodi", LU: "Lucca", MC: "Macerata", MN: "Mantova", MS: "Massa-Carrara", MT: "Matera", ME: "Messina", MI: "Milano", MO: "Modena", MB: "Monza e della Brianza", NA: "Napoli", NO: "Novara", NU: "Nuoro", OT: "Olbia-Tempio", OR: "Oristano", PD: "Padova", PA: "Palermo", PR: "Parma", PV: "Pavia", PG: "Perugia", PU: "Pesaro e Urbino", PE: "Pescara", PC: "Piacenza", PI: "Pisa", PT: "Pistoia", PN: "Pordenone", PZ: "Potenza", PO: "Prato", RG: "Ragusa", RA: "Ravenna", RC: "Reggio Calabria", RE: "Reggio Emilia", RI: "Rieti", RN: "Rimini", RM: "Roma", RO: "Rovigo", SA: "Salerno", VS: "Medio Campidano", SS: "Sassari", SV: "Savona", SI: "Siena", SR: "Siracusa", SO: "Sondrio", TA: "Taranto", TE: "Teramo", TR: "Terni", TO: "Torino", OG: "Ogliastra", TP: "Trapani", TN: "Trento", TV: "Treviso", TS: "Trieste", UD: "Udine", VA: "Varese", VE: "Venezia", VB: "Verbano-Cusio-Ossola", VC: "Vercelli", VR: "Verona", VV: "Vibo Valentia", VI: "Vicenza", VT: "Viterbo" }, JM: { CLARENDON: "Clarendon", HANOVER: "Hanover", KINGSTON: "Kingston", MANCHESTER: "Manchester", PORTLAND: "Portland", SAINTANDREW: "Saint Andrew", SAINTANN: "Saint Ann", SAINTCATHERINE: "Saint Catherine", SAINTELIZABETH: "Saint Elizabeth", SAINTJAMES: "Saint James", SAINTMARY: "Saint Mary", SAINTTHOMAS: "Saint Thomas", TRELAWNY: "Trelawny", WESTMORELAND: "Westmoreland" }, JP: { JP01: "Hokkaido", JP02: "Aomori", JP03: "Iwate", JP04: "Miyagi", JP05: "Akita", JP06: "Yamagata", JP07: "Fukushima", JP08: "Ibaraki", JP09: "Tochigi", JP10: "Gunma", JP11: "Saitama", JP12: "Chiba", JP13: "Tokyo", JP14: "Kanagawa", JP15: "Niigata", JP16: "Toyama", JP17: "Ishikawa", JP18: "Fukui", JP19: "Yamanashi", JP20: "Nagano", JP21: "Gifu", JP22: "Shizuoka", JP23: "Aichi", JP24: "Mie", JP25: "Shiga", JP26: "Kyouto", JP27: "Osaka", JP28: "Hyougo", JP29: "Nara", JP30: "Wakayama", JP31: "Tottori", JP32: "Shimane", JP33: "Okayama", JP34: "Hiroshima", JP35: "Yamaguchi", JP36: "Tokushima", JP37: "Kagawa", JP38: "Ehime", JP39: "Kochi", JP40: "Fukuoka", JP41: "Saga", JP42: "Nagasaki", JP43: "Kumamoto", JP44: "Oita", JP45: "Miyazaki", JP46: "Kagoshima", JP47: "Okinawa" }, JO: { AJLUN: "Ajlun", "AL'AQABAH": "Al 'Aqabah", "ALBALQA'": "Al Balqa'", ALKARAK: "Al Karak", ALMAFRAQ: "Al Mafraq", "'AMMAN": "'Amman", ATTAFILAH: "At Tafilah", "AZZARQA'": "Az Zarqa'", IRBID: "Irbid", JARASH: "Jarash", "MA'AN": "Ma'an", MADABA: "Madaba" }, KZ: { ALMATYOBLYSY: "Almaty Oblysy", ALMATYQALASY: "Almaty Qalasy", AQMOLAOBLYSY: "Aqmola Oblysy", AQTOBEOBLYSY: "Aqtobe Oblysy", ASTANAQALASY: "Astana Qalasy", ATYRAUOBLYSY: "Atyrau Oblysy", BATYSQAZAQSTANOBLYSY: "Batys Qazaqstan Oblysy", BAYQONGYRQALASY: "Bayqongyr Qalasy", MANGGHYSTAUOBLYSY: "Mangghystau Oblysy", ONGTUSTIKQAZAQSTANOBLYSY: "Ongtustik Qazaqstan Oblysy", PAVLODAROBLYSY: "Pavlodar Oblysy", QARAGHANDYOBLYSY: "Qaraghandy Oblysy", QOSTANAYOBLYSY: "Qostanay Oblysy", QYZYLORDAOBLYSY: "Qyzylorda Oblysy", SHYGHYSQAZAQSTANOBLYSY: "Shyghys Qazaqstan Oblysy", SOLTUSTIKQAZAQSTANOBLYSY: "Soltustik Qazaqstan Oblysy", ZHAMBYLOBLYSY: "Zhambyl Oblysy" }, KE: { CENTRAL: "Central", COAST: "Coast", EASTERN: "Eastern", NAIROBIAREA: "Nairobi Area", NORTHEASTERN: "North Eastern", NYANZA: "Nyanza", RIFTVALLEY: "Rift Valley", WESTERN: "Western" }, KW: { ALAHMADI: "Al Ahmadi", ALFARWANIYAH: "Al Farwaniyah", ALASIMAH: "Al Asimah", ALJAHRA: "Al Jahra", HAWALLI: "Hawalli", "MUBARAKAL-KABEER": "Mubarak Al-Kabeer" }, KG: { BATKENOBLASTY: "Batken Oblasty", BISHKEKSHAARY: "Bishkek Shaary", CHUYOBLASTY: "Chuy Oblasty", "JALAL-ABADOBLASTY": "Jalal-Abad Oblasty", NARYNOBLASTY: "Naryn Oblasty", OSHOBLASTY: "Osh Oblasty", TALASOBLASTY: "Talas Oblasty", "YSYK-KOLOBLASTY": "Ysyk-Kol Oblasty" }, LA: { ATTAPU: "Attapu", BOKEO: "Bokeo", BOLIKHAMXAI: "Bolikhamxai", CHAMPASAK: "Champasak", HOUAPHAN: "Houaphan", KHAMMOUAN: "Khammouan", LOUANGNAMTHA: "Louangnamtha", LOUANGPHRABANG: "Louangphrabang", OUDOMXAI: "Oudomxai", PHONGSALI: "Phongsali", SALAVAN: "Salavan", SAVANNAKHET: "Savannakhet", VIANGCHAN: "Viangchan", XAIGNABOULI: "Xaignabouli", XAISOMBOUN: "Xaisomboun", XEKONG: "Xekong", XIANGKHOANG: "Xiangkhoang" }, LV: { AIZKRAUKLESRAJONS: "Aizkraukles Rajons", ALUKSNESRAJONS: "Aluksnes Rajons", BALVURAJONS: "Balvu Rajons", BAUSKASRAJONS: "Bauskas Rajons", CESURAJONS: "Cesu Rajons", DAUGAVPILS: "Daugavpils", DAUGAVPILSRAJONS: "Daugavpils Rajons", DOBELESRAJONS: "Dobeles Rajons", GULBENESRAJONS: "Gulbenes Rajons", JEKABPILSRAJONS: "Jekabpils Rajons", JELGAVA: "Jelgava", JELGAVASRAJONS: "Jelgavas Rajons", JURMALA: "Jurmala", KRASLAVASRAJONS: "Kraslavas Rajons", KULDIGASRAJONS: "Kuldigas Rajons", LIEPAJA: "Liepaja", LIEPAJASRAJONS: "Liepajas Rajons", LIMBAZURAJONS: "Limbazu Rajons", LUDZASRAJONS: "Ludzas Rajons", MADONASRAJONS: "Madonas Rajons", OGRESRAJONS: "Ogres Rajons", PREILURAJONS: "Preilu Rajons", REZEKNE: "Rezekne", REZEKNESRAJONS: "Rezeknes Rajons", RIGA: "Riga", RIGASRAJONS: "Rigas Rajons", SALDUSRAJONS: "Saldus Rajons", TALSURAJONS: "Talsu Rajons", TUKUMARAJONS: "Tukuma Rajons", VALKASRAJONS: "Valkas Rajons", VALMIERASRAJONS: "Valmieras Rajons", VENTSPILS: "Ventspils", VENTSPILSRAJONS: "Ventspils Rajons" }, LB: { BEYROUTH: "Beyrouth", BEQAA: "Beqaa", "LIBAN-NORD": "Liban-Nord", "LIBAN-SUD": "Liban-Sud", "MONT-LIBAN": "Mont-Liban", NABATIYE: "Nabatiye" }, LS: { BEREA: "Berea", "BUTHA-BUTHE": "Butha-Buthe", LERIBE: "Leribe", MAFETENG: "Mafeteng", MASERU: "Maseru", "MOHALE'SHOEK": "Mohale's Hoek", MOKHOTLONG: "Mokhotlong", "QACHA'SNEK": "Qacha's Nek", QUTHING: "Quthing", "THABA-TSEKA": "Thaba-Tseka" }, LR: { BOMI: "Bomi", BONG: "Bong", GBARPOLU: "Gbarpolu", GRANDBASSA: "Grand Bassa", GRANDCAPEMOUNT: "Grand Cape Mount", GRANDGEDEH: "Grand Gedeh", GRANDKRU: "Grand Kru", LOFA: "Lofa", MARGIBI: "Margibi", MARYLAND: "Maryland", MONTSERRADO: "Montserrado", NIMBA: "Nimba", RIVERCESS: "River Cess", RIVERGEE: "River Gee", SINOE: "Sinoe" }, LY: { AJDABIYA: "Ajdabiya", "AL'AZIZIYAH": "Al 'Aziziyah", ALFATIH: "Al Fatih", ALJABALALAKHDAR: "Al Jabal al Akhdar", ALJUFRAH: "Al Jufrah", ALKHUMS: "Al Khums", ALKUFRAH: "Al Kufrah", ANNUQATALKHAMS: "An Nuqat al Khams", "ASHSHATI'": "Ash Shati'", AWBARI: "Awbari", AZZAWIYAH: "Az Zawiyah", BANGHAZI: "Banghazi", DARNAH: "Darnah", GHADAMIS: "Ghadamis", GHARYAN: "Gharyan", MISRATAH: "Misratah", MURZUQ: "Murzuq", SABHA: "Sabha", SAWFAJJIN: "Sawfajjin", SURT: "Surt", TARABULUS: "Tarabulus", TARHUNAH: "Tarhunah", TUBRUQ: "Tubruq", YAFRAN: "Yafran", ZLITAN: "Zlitan" }, LI: { BALZERS: "Balzers", ESCHEN: "Eschen", GAMPRIN: "Gamprin", MAUREN: "Mauren", PLANKEN: "Planken", RUGGELL: "Ruggell", SCHAAN: "Schaan", SCHELLENBERG: "Schellenberg", TRIESEN: "Triesen", TRIESENBERG: "Triesenberg", VADUZ: "Vaduz" }, LT: { ALYTAUS: "Alytaus", KAUNO: "Kauno", KLAIPEDOS: "Klaipedos", MARIJAMPOLES: "Marijampoles", PANEVEZIO: "Panevezio", SIAULIU: "Siauliu", TAURAGES: "Taurages", TELSIU: "Telsiu", UTENOS: "Utenos", VILNIAUS: "Vilniaus" }, LU: { DIEKIRCH: "Diekirch", GREVENMACHER: "Grevenmacher", LUXEMBOURG: "Luxembourg" }, MK: { AERODROM: "Aerodrom", ARACINOVO: "Aracinovo", BEROVO: "Berovo", BITOLA: "Bitola", BOGDANCI: "Bogdanci", BOGOVINJE: "Bogovinje", BOSILOVO: "Bosilovo", BRVENICA: "Brvenica", BUTEL: "Butel", CAIR: "Cair", CASKA: "Caska", CENTAR: "Centar", CENTARZUPA: "Centar Zupa", CESINOVO: "Cesinovo", "CUCER-SANDEVO": "Cucer-Sandevo", DEBAR: "Debar", DEBARTSA: "Debartsa", DELCEVO: "Delcevo", DEMIRHISAR: "Demir Hisar", DEMIRKAPIJA: "Demir Kapija", DOJRAN: "Dojran", DOLNENI: "Dolneni", DRUGOVO: "Drugovo", GAZIBABA: "Gazi Baba", GEVGELIJA: "Gevgelija", GJORCEPETROV: "Gjorce Petrov", GOSTIVAR: "Gostivar", GRADSKO: "Gradsko", ILINDEN: "Ilinden", JEGUNOVCE: "Jegunovce", KARBINCI: "Karbinci", KARPOS: "Karpos", KAVADARCI: "Kavadarci", KICEVO: "Kicevo", KISELAVODA: "Kisela Voda", KOCANI: "Kocani", KONCE: "Konce", KRATOVO: "Kratovo", KRIVAPALANKA: "Kriva Palanka", KRIVOGASTANI: "Krivogastani", KRUSEVO: "Krusevo", KUMANOVO: "Kumanovo", LIPKOVO: "Lipkovo", LOZOVO: "Lozovo", MAKEDONSKAKAMENICA: "Makedonska Kamenica", MAKEDONSKIBROD: "Makedonski Brod", MAVROVOIRASTUSA: "Mavrovo i Rastusa", MOGILA: "Mogila", NEGOTINO: "Negotino", NOVACI: "Novaci", NOVOSELO: "Novo Selo", OHRID: "Ohrid", OSLOMEJ: "Oslomej", PEHCEVO: "Pehcevo", PETROVEC: "Petrovec", PLASNICA: "Plasnica", PRILEP: "Prilep", PROBISTIP: "Probistip", RADOVIS: "Radovis", RANKOVCE: "Rankovce", RESEN: "Resen", ROSOMAN: "Rosoman", SARAJ: "Saraj", SKOPJE: "Skopje", SOPISTE: "Sopiste", STARONAGORICANE: "Staro Nagoricane", STIP: "Stip", STRUGA: "Struga", STRUMICA: "Strumica", STUDENICANI: "Studenicani", SUTOORIZARI: "Suto Orizari", SVETINIKOLE: "Sveti Nikole", TEARCE: "Tearce", TETOVO: "Tetovo", VALANDOVO: "Valandovo", VASILEVO: "Vasilevo", VELES: "Veles", VEVCANI: "Vevcani", VINICA: "Vinica", VRANESTICA: "Vranestica", VRAPCISTE: "Vrapciste", ZAJAS: "Zajas", ZELENIKOVO: "Zelenikovo", ZELINO: "Zelino", ZRNOVCI: "Zrnovci" }, MG: { ANTANANARIVO: "Antananarivo", ANTSIRANANA: "Antsiranana", FIANARANTSOA: "Fianarantsoa", MAHAJANGA: "Mahajanga", TOAMASINA: "Toamasina", TOLIARA: "Toliara" }, MW: { BALAKA: "Balaka", BLANTYRE: "Blantyre", CHIKWAWA: "Chikwawa", CHIRADZULU: "Chiradzulu", CHITIPA: "Chitipa", DEDZA: "Dedza", DOWA: "Dowa", KARONGA: "Karonga", KASUNGU: "Kasungu", LIKOMA: "Likoma", LILONGWE: "Lilongwe", MACHINGA: "Machinga", MANGOCHI: "Mangochi", MCHINJI: "Mchinji", MULANJE: "Mulanje", MWANZA: "Mwanza", MZIMBA: "Mzimba", NTCHEU: "Ntcheu", NKHATABAY: "Nkhata Bay", NKHOTAKOTA: "Nkhotakota", NSANJE: "Nsanje", NTCHISI: "Ntchisi", PHALOMBE: "Phalombe", RUMPHI: "Rumphi", SALIMA: "Salima", THYOLO: "Thyolo", ZOMBA: "Zomba" }, MY: { JHR: "Johor", KDH: "Kedah", KTN: "Kelantan", MLK: "Melaka", NSN: "Negeri Sembilan", PHG: "Pahang", PRK: "Perak", PLS: "Perlis", PNG: "Pulau Pinang", SBH: "Sabah", SWK: "Sarawak", SGR: "Selangor", TRG: "Terengganu", KUL: "W.P. Kuala Lumpur", LBN: "W.P. Labuan", PJY: "W.P. Putrajaya" }, MV: { ALIFU: "Alifu", BAA: "Baa", DHAALU: "Dhaalu", FAAFU: "Faafu", GAAFUALIFU: "Gaafu Alifu", GAAFUDHAALU: "Gaafu Dhaalu", GNAVIYANI: "Gnaviyani", HAAALIFU: "Haa Alifu", HAADHAALU: "Haa Dhaalu", KAAFU: "Kaafu", LAAMU: "Laamu", LHAVIYANI: "Lhaviyani", MAALE: "Maale", MEEMU: "Meemu", NOONU: "Noonu", RAA: "Raa", SEENU: "Seenu", SHAVIYANI: "Shaviyani", THAA: "Thaa", VAAVU: "Vaavu" }, ML: { "BAMAKO{CAPITAL},": "Bamako {Capital},", GAO: "Gao", KAYES: "Kayes", KIDAL: "Kidal", KOULIKORO: "Koulikoro", MOPTI: "Mopti", SEGOU: "Segou", SIKASSO: "Sikasso", TOMBOUCTOU: "Tombouctou" }, MR: { ADRAR: "Adrar", ASSABA: "Assaba", BRAKNA: "Brakna", DAKHLETNOUADHIBOU: "Dakhlet Nouadhibou", GORGOL: "Gorgol", GUIDIMAKA: "Guidimaka", HODHECHCHARGUI: "Hodh Ech Chargui", HODHELGHARBI: "Hodh El Gharbi", INCHIRI: "Inchiri", NOUAKCHOTT: "Nouakchott", TAGANT: "Tagant", TIRISZEMMOUR: "Tiris Zemmour", TRARZA: "Trarza" }, MU: { AGALEGAISLANDS: "Agalega Islands", BLACKRIVER: "Black River", CARGADOSCARAJOSSHOALS: "Cargados Carajos Shoals", FLACQ: "Flacq", GRANDPORT: "Grand Port", MOKA: "Moka", PAMPLEMOUSSES: "Pamplemousses", PLAINESWILHEMS: "Plaines Wilhems", PORTLOUIS: "Port Louis", RIVIEREDUREMPART: "Riviere du Rempart", RODRIGUES: "Rodrigues", SAVANNE: "Savanne" }, MX: { "Distrito Federal": "Distrito Federal", Jalisco: "Jalisco", "Nuevo Leon": "Nuevo León", Aguascalientes: "Aguascalientes", "Baja California": "Baja California", "Baja California Sur": "Baja California Sur", Campeche: "Campeche", Chiapas: "Chiapas", Chihuahua: "Chihuahua", Coahuila: "Coahuila", Colima: "Colima", Durango: "Durango", Guanajuato: "Guanajuato", Guerrero: "Guerrero", Hidalgo: "Hidalgo", "Estado de Mexico": "Edo. de México", Michoacan: "Michoacán", Morelos: "Morelos", Nayarit: "Nayarit", Oaxaca: "Oaxaca", Puebla: "Puebla", Queretaro: "Querétaro", "Quintana Roo": "Quintana Roo", "San Luis Potosi": "San Luis Potosí", Sinaloa: "Sinaloa", Sonora: "Sonora", Tabasco: "Tabasco", Tamaulipas: "Tamaulipas", Tlaxcala: "Tlaxcala", Veracruz: "Veracruz", Yucatan: "Yucatán", Zacatecas: "Zacatecas" }, MD: { ANENIINOI: "Anenii Noi", BASARABEASCA: "Basarabeasca", BRICENI: "Briceni", CAHUL: "Cahul", CANTEMIR: "Cantemir", CALARASI: "Calarasi", CAUSENI: "Causeni", CIMISLIA: "Cimislia", CRIULENI: "Criuleni", DONDUSENI: "Donduseni", DROCHIA: "Drochia", DUBASARI: "Dubasari", EDINET: "Edinet", FALESTI: "Falesti", FLORESTI: "Floresti", GLODENI: "Glodeni", HINCESTI: "Hincesti", IALOVENI: "Ialoveni", LEOVA: "Leova", NISPORENI: "Nisporeni", OCNITA: "Ocnita", ORHEI: "Orhei", REZINA: "Rezina", RISCANI: "Riscani", SINGEREI: "Singerei", SOLDANESTI: "Soldanesti", SOROCA: "Soroca", "STEFAN-VODA": "Stefan-Voda", STRASENI: "Straseni", TARACLIA: "Taraclia", TELENESTI: "Telenesti", UNGHENI: "Ungheni", BALTI: "Balti", BENDER: "Bender", CHISINAU: "Chisinau", GAGAUZIA: "Gagauzia", STINGANISTRULUI: "Stinga Nistrului" }, MN: { ARHANGAY: "Arhangay", BAYANHONGOR: "Bayanhongor", "BAYAN-OLGIY": "Bayan-Olgiy", BULGAN: "Bulgan", DARHANUUL: "Darhan Uul", DORNOD: "Dornod", DORNOGOVI: "Dornogovi", DUNDGOVI: "Dundgovi", DZAVHAN: "Dzavhan", "GOVI-ALTAY": "Govi-Altay", "GOVI-SUMBER": "Govi-Sumber", HENTIY: "Hentiy", HOVD: "Hovd", HOVSGOL: "Hovsgol", OMNOGOVI: "Omnogovi", ORHON: "Orhon", OVORHANGAY: "Ovorhangay", SELENGE: "Selenge", SUHBAATAR: "Suhbaatar", TOV: "Tov", ULAANBAATAR: "Ulaanbaatar", UVS: "Uvs" }, MA: { AGADIR: "Agadir", ALHOCEIMA: "Al Hoceima", AZILAL: "Azilal", BENIMELLAL: "Beni Mellal", BENSLIMANE: "Ben Slimane", BOULEMANE: "Boulemane", CASABLANCA: "Casablanca", CHAOUEN: "Chaouen", ELJADIDA: "El Jadida", ELKELAADESSRAGHNA: "El Kelaa des Sraghna", ERRACHIDIA: "Er Rachidia", ESSAOUIRA: "Essaouira", FES: "Fes", FIGUIG: "Figuig", GUELMIM: "Guelmim", IFRANE: "Ifrane", KENITRA: "Kenitra", KHEMISSET: "Khemisset", KHENIFRA: "Khenifra", KHOURIBGA: "Khouribga", LAAYOUNE: "Laayoune", LARACHE: "Larache", MARRAKECH: "Marrakech", MEKNES: "Meknes", NADOR: "Nador", OUARZAZATE: "Ouarzazate", OUJDA: "Oujda", "RABAT-SALE": "Rabat-Sale", SAFI: "Safi", SETTAT: "Settat", SIDIKACEM: "Sidi Kacem", TANGIER: "Tangier", "TAN-TAN": "Tan-Tan", TAOUNATE: "Taounate", TAROUDANNT: "Taroudannt", TATA: "Tata", TAZA: "Taza", TETOUAN: "Tetouan", TIZNIT: "Tiznit" }, MZ: { CABODELGADO: "Cabo Delgado", GAZA: "Gaza", INHAMBANE: "Inhambane", MANICA: "Manica", MAPUTO: "Maputo", CIDADEDEMAPUTO: "Cidade de Maputo", NAMPULA: "Nampula", NIASSA: "Niassa", SOFALA: "Sofala", TETE: "Tete", ZAMBEZIA: "Zambezia" }, NA: { CAPRIVI: "Caprivi", ERONGO: "Erongo", HARDAP: "Hardap", KARAS: "Karas", KHOMAS: "Khomas", KUNENE: "Kunene", OHANGWENA: "Ohangwena", OKAVANGO: "Okavango", OMAHEKE: "Omaheke", OMUSATI: "Omusati", OSHANA: "Oshana", OSHIKOTO: "Oshikoto", OTJOZONDJUPA: "Otjozondjupa" }, NP: { ILL: "Illam", JHA: "Jhapa", PAN: "Panchthar", TAP: "Taplejung", BHO: "Bhojpur", DKA: "Dhankuta", MOR: "Morang", SUN: "Sunsari", SAN: "Sankhuwa", TER: "Terhathum", KHO: "Khotang", OKH: "Okhaldhunga", SAP: "Saptari", SIR: "Siraha", SOL: "Solukhumbu", UDA: "Udayapur", DHA: "Dhanusa", DLK: "Dolakha", MOH: "Mohottari", RAM: "Ramechha", SAR: "Sarlahi", SIN: "Sindhuli", BHA: "Bhaktapur", DHD: "Dhading", KTM: "Kathmandu", KAV: "Kavrepalanchowk", LAL: "Lalitpur", NUW: "Nuwakot", RAS: "Rasuwa", SPC: "Sindhupalchowk", BAR: "Bara", CHI: "Chitwan", MAK: "Makwanpur", PAR: "Parsa", RAU: "Rautahat", GOR: "Gorkha", KAS: "Kaski", LAM: "Lamjung", MAN: "Manang", SYN: "Syangja", TAN: "Tanahun", BAG: "Baglung", PBT: "Parbat", MUS: "Mustang", MYG: "Myagdi", AGR: "Agrghakanchi", GUL: "Gulmi", KAP: "Kapilbastu", NAW: "Nawalparasi", PAL: "Palpa", RUP: "Rupandehi", DAN: "Dang", PYU: "Pyuthan", ROL: "Rolpa", RUK: "Rukum", SAL: "Salyan", BAN: "Banke", BDA: "Bardiya", DAI: "Dailekh", JAJ: "Jajarkot", SUR: "Surkhet", DOL: "Dolpa", HUM: "Humla", JUM: "Jumla", KAL: "Kalikot", MUG: "Mugu", ACH: "Achham", BJH: "Bajhang", BJU: "Bajura", DOT: "Doti", KAI: "Kailali", BAI: "Baitadi", DAD: "Dadeldhura", DAR: "Darchula", KAN: "Kanchanpur" }, NL: { DRENTHE: "Drenthe", FLEVOLAND: "Flevoland", FRIESLAND: "Friesland", GELDERLAND: "Gelderland", GRONINGEN: "Groningen", LIMBURG: "Limburg", "NOORD-BRABANT": "Noord-Brabant", "NOORD-HOLLAND": "Noord-Holland", OVERIJSSEL: "Overijssel", UTRECHT: "Utrecht", ZEELAND: "Zeeland", "ZUID-HOLLAND": "Zuid-Holland" }, NZ: { NL: "Northland", AK: "Auckland", WA: "Waikato", BP: "Bay of Plenty", TK: "Taranaki", HB: "Hawke’s Bay", MW: "Manawatu-Wanganui", WE: "Wellington", NS: "Nelson", MB: "Marlborough", TM: "Tasman", WC: "West Coast", CT: "Canterbury", OT: "Otago", SL: "Southland" }, NI: { ATLANTICONORTE: "Atlantico Norte", ATLANTICOSUR: "Atlantico Sur", BOACO: "Boaco", CARAZO: "Carazo", CHINANDEGA: "Chinandega", CHONTALES: "Chontales", ESTELI: "Esteli", GRANADA: "Granada", JINOTEGA: "Jinotega", LEON: "Leon", MADRIZ: "Madriz", MANAGUA: "Managua", MASAYA: "Masaya", MATAGALPA: "Matagalpa", NUEVASEGOVIA: "Nueva Segovia", RIOSANJUAN: "Rio San Juan", RIVAS: "Rivas" }, NE: { AGADEZ: "Agadez", DIFFA: "Diffa", DOSSO: "Dosso", MARADI: "Maradi", NIAMEY: "Niamey", TAHOUA: "Tahoua", TILLABERI: "Tillaberi", ZINDER: "Zinder" }, NG: { ABIA: "Abia", ABUJAFEDERALCAPITAL: "Abuja Federal Capital", ADAMAWA: "Adamawa", AKWAIBOM: "Akwa Ibom", ANAMBRA: "Anambra", BAUCHI: "Bauchi", BAYELSA: "Bayelsa", BENUE: "Benue", BORNO: "Borno", CROSSRIVER: "Cross River", DELTA: "Delta", EBONYI: "Ebonyi", EDO: "Edo", EKITI: "Ekiti", ENUGU: "Enugu", GOMBE: "Gombe", IMO: "Imo", JIGAWA: "Jigawa", KADUNA: "Kaduna", KANO: "Kano", KATSINA: "Katsina", KEBBI: "Kebbi", KOGI: "Kogi", KWARA: "Kwara", LAGOS: "Lagos", NASSARAWA: "Nassarawa", NIGER: "Niger", OGUN: "Ogun", ONDO: "Ondo", OSUN: "Osun", OYO: "Oyo", PLATEAU: "Plateau", RIVERS: "Rivers", SOKOTO: "Sokoto", TARABA: "Taraba", YOBE: "Yobe", ZAMFARA: "Zamfara" }, NO: { AKERSHUS: "Akershus", "AUST-AGDER": "Aust-Agder", BUSKERUD: "Buskerud", FINNMARK: "Finnmark", HEDMARK: "Hedmark", HORDALAND: "Hordaland", MOREOGROMSDAL: "More og Romsdal", NORDLAND: "Nordland", "NORD-TRONDELAG": "Nord-Trondelag", OPPLAND: "Oppland", OSLO: "Oslo", OSTFOLD: "Ostfold", ROGALAND: "Rogaland", SOGNOGFJORDANE: "Sogn og Fjordane", "SOR-TRONDELAG": "Sor-Trondelag", TELEMARK: "Telemark", TROMS: "Troms", "VEST-AGDER": "Vest-Agder", VESTFOLD: "Vestfold" }, OM: { ADDAKHILIYAH: "Ad Dakhiliyah", ALBATINAH: "Al Batinah", ALWUSTA: "Al Wusta", ASHSHARQIYAH: "Ash Sharqiyah", AZZAHIRAH: "Az Zahirah", MASQAT: "Masqat", MUSANDAM: "Musandam", DHOFAR: "Dhofar" }, PK: { BALOCHISTAN: "Balochistan", "NORTH-WESTFRONTIERPROVINCE": "North-West Frontier Province", PUNJAB: "Punjab", SINDH: "Sindh", ISLAMABADCAPITALTERRITORY: "Islamabad Capital Territory", FEDERALLYADMINISTEREDTRIBALAREAS: "Federally Administered Tribal Areas" }, PA: { BOCASDELTORO: "Bocas del Toro", CHIRIQUI: "Chiriqui", COCLE: "Cocle", COLON: "Colon", DARIEN: "Darien", HERRERA: "Herrera", LOSSANTOS: "Los Santos", PANAMA: "Panama", SANBLAS: "San Blas", VERAGUAS: "Veraguas" }, PG: { BOUGAINVILLE: "Bougainville", CENTRAL: "Central", CHIMBU: "Chimbu", EASTERNHIGHLANDS: "Eastern Highlands", EASTNEWBRITAIN: "East New Britain", EASTSEPIK: "East Sepik", ENGA: "Enga", GULF: "Gulf", MADANG: "Madang", MANUS: "Manus", MILNEBAY: "Milne Bay", MOROBE: "Morobe", NATIONALCAPITAL: "National Capital", NEWIRELAND: "New Ireland", NORTHERN: "Northern", SANDAUN: "Sandaun", SOUTHERNHIGHLANDS: "Southern Highlands", WESTERN: "Western", WESTERNHIGHLANDS: "Western Highlands", WESTNEWBRITAIN: "West New Britain" }, PY: { ALTOPARAGUAY: "Alto Paraguay", ALTOPARANA: "Alto Parana", AMAMBAY: "Amambay", ASUNCION: "Asuncion", BOQUERON: "Boqueron", CAAGUAZU: "Caaguazu", CAAZAPA: "Caazapa", CANINDEYU: "Canindeyu", CENTRAL: "Central", CONCEPCION: "Concepcion", CORDILLERA: "Cordillera", GUAIRA: "Guaira", ITAPUA: "Itapua", MISIONES: "Misiones", NEEMBUCU: "Neembucu", PARAGUARI: "Paraguari", PRESIDENTEHAYES: "Presidente Hayes", SANPEDRO: "San Pedro" }, PE: { CAL: "El Callao", LMA: "Municipalidad Metropolitana de Lima", AMA: "Amazonas", ANC: "Ancash", APU: "Apurímac", ARE: "Arequipa", AYA: "Ayacucho", CAJ: "Cajamarca", CUS: "Cusco", HUV: "Huancavelica", HUC: "Huánuco", ICA: "Ica", JUN: "Junín", LAL: "La Libertad", LAM: "Lambayeque", LIM: "Lima", LOR: "Loreto", MDD: "Madre de Dios", MOQ: "Moquegua", PAS: "Pasco", PIU: "Piura", PUN: "Puno", SAM: "San Martín", TAC: "Tacna", TUM: "Tumbes", UCA: "Ucayali" }, PH: { MM: "Metro Manila", ABR: "Abra", APA: "Apayao", IFU: "Ifugao", KAL: "Kalinga", MOU: "Mountain Province", ILN: "Ilocos Norte", ILS: "Ilocos Sur", LUN: "La Union", PAN: "Pangasinan", BTN: "Batanes", CAG: "Cagayan", ISA: "Isabela", NUV: "Nueva Vizcaya", QUI: "Quirino", AUR: "Aurora", BAN: "Bataan", BUL: "Bulacan", NUE: "Nueva Ecija", PAM: "Pampanga", TAR: "Tarlac", ZMB: "Zambales", BTG: "Batangas", CAV: "Cavite", LAG: "Laguna", QUE: "Quezon", RIZ: "Rizal", MAD: "Marinduque", MDC: "Occidental Mindoro", MDR: "Oriental Mindoro", PLW: "Palawan", ROM: "Romblon", ALB: "Albay", CAN: "Camarines Norte", CAS: "Camarines Sur", CAT: "Catanduanes", MAS: "Masbate", SOR: "Sorsogon", AKL: "Aklan", ANT: "Antique", CAP: "Capiz", GUI: "Guimaras", ILI: "Iloilo", NEC: "Negros Occidental", BOH: "Bohol", CEB: "Cebu", NER: "Negros Oriental", SIG: "Siquijor", BIL: "Biliran", EAS: "Eastern Samar", LEY: "Leyte", NSA: "Northern Samar", WSA: "Samar", SLE: "Southern Leyte", ZAN: "Zamboanga del Norte", ZAS: "Zamboanga del Sur", ZSI: "Zamboanga Sibugay", BUK: "Bukidnon", CAM: "Camiguin", LAN: "Lanao del Norte", MSC: "Misamis Occidental", MSR: "Misamis Oriental", COM: "Compostela Valley", DAV: "Davao del Norte", DAS: "Davao del Sur", DAC: "Davao Occidental", DAO: "Davao Oriental", NCO: "Cotabato", SAR: "Sarangani", SCO: "South Cotabato", SUK: "Sultan Kudarat", AGN: "Agusan del Norte", AGS: "Agusan del Sur", DIN: "Dinagat Islands", SUN: "Surigao del Norte", SUR: "Surigao del Sur", BAS: "Basilan", LAS: "Lanao del Sur", MAG: "Maguindanao", SLU: "Sulu", TAW: "Tawi-tawi" }, PL: { "GREATERPOLAND{WIELKOPOLSKIE},": "Greater Poland {Wielkopolskie},", "KUYAVIAN-POMERANIAN{KUJAWSKO-POMORSKIE},": "Kuyavian-Pomeranian {Kujawsko-Pomorskie},", "LESSERPOLAND{MALOPOLSKIE},": "Lesser Poland {Malopolskie},", "LODZ{LODZKIE},": "Lodz {Lodzkie},", "LOWERSILESIAN{DOLNOSLASKIE},": "Lower Silesian {Dolnoslaskie},", "LUBLIN{LUBELSKIE},": "Lublin {Lubelskie},", "LUBUSZ{LUBUSKIE},": "Lubusz {Lubuskie},", "MASOVIAN{MAZOWIECKIE},": "Masovian {Mazowieckie},", "OPOLE{OPOLSKIE},": "Opole {Opolskie},", "PODLASIE{PODLASKIE},": "Podlasie {Podlaskie},", "POMERANIAN{POMORSKIE},": "Pomeranian {Pomorskie},", "SILESIAN{SLASKIE},": "Silesian {Slaskie},", "SUBCARPATHIAN{PODKARPACKIE},": "Subcarpathian {Podkarpackie},", "SWIETOKRZYSKIE{SWIETOKRZYSKIE},": "Swietokrzyskie {Swietokrzyskie},", "WARMIAN-MASURIAN{WARMINSKO-MAZURSKIE},": "Warmian-Masurian {Warminsko-Mazurskie},", "WESTPOMERANIAN{ZACHODNIOPOMORSKIE},": "West Pomeranian {Zachodniopomorskie}," }, PT: { AO: "Aveiro", AS: "Azores", BJ: "Beja", BG: "Braga", BC: "Braganca", CB: "Castelo Branco", CR: "Coimbra", EV: "Evora", FO: "Faro", GD: "Guarda", LR: "Leiria", LB: "Lisboa", MA: "Madeira", PE: "Portalegre", PR: "Porto", SN: "Santarem", VD: "Viana Do Castelo", VL: "Vila Real", VU: "Viseu" }, QA: { ADDAWHAH: "Ad Dawhah", ALGHUWAYRIYAH: "Al Ghuwayriyah", ALJUMAYLIYAH: "Al Jumayliyah", ALKHAWR: "Al Khawr", ALWAKRAH: "Al Wakrah", YAN: "Ar Rayyan", JARAYANALBATINAH: "Jarayan al Batinah", MADINATASHSHAMAL: "Madinat ash Shamal", "UMMSA'ID": "Umm Sa'id", UMMSALAL: "Umm Salal" }, RO: { ALBA: "Alba", ARAD: "Arad", ARGES: "Arges", BACAU: "Bacau", BIHOR: "Bihor", "BISTRITA-NASAUD": "Bistrita-Nasaud", BOTOSANI: "Botosani", BRAILA: "Braila", BRASOV: "Brasov", BUCURESTI: "Bucuresti", BUZAU: "Buzau", CALARASI: "Calarasi", "CARAS-SEVERIN": "Caras-Severin", CLUJ: "Cluj", CONSTANTA: "Constanta", COVASNA: "Covasna", DIMBOVITA: "Dimbovita", DOLJ: "Dolj", GALATI: "Galati", GORJ: "Gorj", GIURGIU: "Giurgiu", HARGHITA: "Harghita", HUNEDOARA: "Hunedoara", IALOMITA: "Ialomita", IASI: "Iasi", ILFOV: "Ilfov", MARAMURES: "Maramures", MEHEDINTI: "Mehedinti", MURES: "Mures", NEAMT: "Neamt", OLT: "Olt", PRAHOVA: "Prahova", SALAJ: "Salaj", SATUMARE: "Satu Mare", SIBIU: "Sibiu", SUCEAVA: "Suceava", TELEORMAN: "Teleorman", TIMIS: "Timis", TULCEA: "Tulcea", VASLUI: "Vaslui", VILCEA: "Vilcea", VRANCEA: "Vrancea" }, RU: { AMUR: "Amur", "ARKHANGEL'SK": "Arkhangel'sk", "ASTRAKHAN'": "Astrakhan'", BELGOROD: "Belgorod", BRYANSK: "Bryansk", CHELYABINSK: "Chelyabinsk", CHITA: "Chita", IRKUTSK: "Irkutsk", IVANOVO: "Ivanovo", KALININGRAD: "Kaliningrad", KALUGA: "Kaluga", KAMCHATKA: "Kamchatka", KEMEROVO: "Kemerovo", KIROV: "Kirov", KOSTROMA: "Kostroma", KURGAN: "Kurgan", KURSK: "Kursk", LENINGRAD: "Leningrad", LIPETSK: "Lipetsk", MAGADAN: "Magadan", MOSCOW: "Moscow", MURMANSK: "Murmansk", NIZHNIYNOVGOROD: "Nizhniy Novgorod", NOVGOROD: "Novgorod", NOVOSIBIRSK: "Novosibirsk", OMSK: "Omsk", ORENBURG: "Orenburg", OREL: "Orel", PENZA: "Penza", "PERM'": "Perm'", PSKOV: "Pskov", ROSTOV: "Rostov", "RYAZAN'": "Ryazan'", SAKHALIN: "Sakhalin", SAMARA: "Samara", SARATOV: "Saratov", SMOLENSK: "Smolensk", SVERDLOVSK: "Sverdlovsk", TAMBOV: "Tambov", TOMSK: "Tomsk", TULA: "Tula", "TVER'": "Tver'", "TYUMEN'": "Tyumen'", "UL'YANOVSK": "Ul'yanovsk", VLADIMIR: "Vladimir", VOLGOGRAD: "Volgograd", VOLOGDA: "Vologda", VORONEZH: "Voronezh", "YAROSLAVL'": "Yaroslavl'", ADYGEYA: "Adygeya", ALTAY: "Altay", BASHKORTOSTAN: "Bashkortostan", BURYATIYA: "Buryatiya", CHECHNYA: "Chechnya", CHUVASHIYA: "Chuvashiya", DAGESTAN: "Dagestan", INGUSHETIYA: "Ingushetiya", "KABARDINO-BALKARIYA": "Kabardino-Balkariya", KALMYKIYA: "Kalmykiya", "KARACHAYEVO-CHERKESIYA": "Karachayevo-Cherkesiya", KARELIYA: "Kareliya", KHAKASIYA: "Khakasiya", KOMI: "Komi", "MARIY-EL": "Mariy-El", MORDOVIYA: "Mordoviya", SAKHA: "Sakha", NORTHOSSETIA: "North Ossetia", TATARSTAN: "Tatarstan", TYVA: "Tyva", UDMURTIYA: "Udmurtiya", AGABURYAT: "Aga Buryat", CHUKOTKA: "Chukotka", EVENK: "Evenk", "KHANTY-MANSI": "Khanty-Mansi", "KOMI-PERMYAK": "Komi-Permyak", KORYAK: "Koryak", NENETS: "Nenets", TAYMYR: "Taymyr", "UST'-ORDABURYAT": "Ust'-Orda Buryat", "YAMALO-NENETS": "Yamalo-Nenets", KHABAROVSK: "Khabarovsk", KRASNODAR: "Krasnodar", KRASNOYARSK: "Krasnoyarsk", PRIMORSKIY: "Primorskiy", "STAVROPOL'": "Stavropol'", "ST.PETERSBURG": "St. Petersburg", YEVREY: "Yevrey" }, RW: { BUTARE: "Butare", BYUMBA: "Byumba", CYANGUGU: "Cyangugu", GIKONGORO: "Gikongoro", GISENYI: "Gisenyi", GITARAMA: "Gitarama", KIBUNGO: "Kibungo", KIBUYE: "Kibuye", KIGALIRURALE: "Kigali Rurale", "KIGALI-VILLE": "Kigali-ville", UMUTARA: "Umutara", RUHENGERI: "Ruhengeri" }, SM: { ACQUAVIVA: "Acquaviva", BORGOMAGGIORE: "Borgo Maggiore", CHIESANUOVA: "Chiesanuova", DOMAGNANO: "Domagnano", FAETANO: "Faetano", FIORENTINO: "Fiorentino", MONTEGIARDINO: "Montegiardino", SANMARINOCITTA: "San Marino Citta", SERRAVALLE: "Serravalle" }, SA: { Riyadh: "Riyadh", Makkah: "Makkah", Madinah: "Madinah", Qassim: "Qassim", Eastern: "Eastern", Asir: "Asir", Tabuk: "Tabuk", Hail: "Hail", DC: "Northern Borders", Jizan: "Jizan", Najran: "Najran", Bahah: "Bahah", Jawf: "Jawf" }, SN: { DAKAR: "Dakar", DIOURBEL: "Diourbel", FATICK: "Fatick", KAOLACK: "Kaolack", KOLDA: "Kolda", LOUGA: "Louga", MATAM: "Matam", "SAINT-LOUIS": "Saint-Louis", TAMBACOUNDA: "Tambacounda", THIES: "Thies", ZIGUINCHOR: "Ziguinchor" }, SC: { ANSEAUXPINS: "Anse aux Pins", ANSEBOILEAU: "Anse Boileau", ANSEETOILE: "Anse Etoile", ANSELOUIS: "Anse Louis", ANSEROYALE: "Anse Royale", BAIELAZARE: "Baie Lazare", BAIESAINTEANNE: "Baie Sainte Anne", BEAUVALLON: "Beau Vallon", BELAIR: "Bel Air", BELOMBRE: "Bel Ombre", CASCADE: "Cascade", GLACIS: "Glacis", "GRAND'ANSE": "Grand' Anse", LADIGUE: "La Digue", LARIVIEREANGLAISE: "La Riviere Anglaise", MONTBUXTON: "Mont Buxton", MONTFLEURI: "Mont Fleuri", PLAISANCE: "Plaisance", POINTELARUE: "Pointe La Rue", PORTGLAUD: "Port Glaud", SAINTLOUIS: "Saint Louis", TAKAMAKA: "Takamaka" }, SK: { BANSKOBYSTRICKY: "Banskobystricky", BRATISLAVSKY: "Bratislavsky", KOSICKY: "Kosicky", NITRIANSKY: "Nitriansky", PRESOVSKY: "Presovsky", TRENCIANSKY: "Trenciansky", TRNAVSKY: "Trnavsky", ZILINSKY: "Zilinsky" }, SI: { AJDOVSCINA: "Ajdovscina", BELTINCI: "Beltinci", BENEDIKT: "Benedikt", BISTRICAOBSOTLI: "Bistrica ob Sotli", BLED: "Bled", BLOKE: "Bloke", BOHINJ: "Bohinj", BOROVNICA: "Borovnica", BOVEC: "Bovec", BRASLOVCE: "Braslovce", BRDA: "Brda", BREZICE: "Brezice", BREZOVICA: "Brezovica", CANKOVA: "Cankova", CELJE: "Celje", CERKLJENAGORENJSKEM: "Cerklje na Gorenjskem", CERKNICA: "Cerknica", CERKNO: "Cerkno", CERKVENJAK: "Cerkvenjak", CRENSOVCI: "Crensovci", CRNANAKOROSKEM: "Crna na Koroskem", CRNOMELJ: "Crnomelj", DESTRNIK: "Destrnik", DIVACA: "Divaca", DOBJE: "Dobje", DOBREPOLJE: "Dobrepolje", DOBRNA: "Dobrna", "DOBROVA-HORJUL-POLHOVGRADEC": "Dobrova-Horjul-Polhov Gradec", "DOBROVNIK-DOBRONAK": "Dobrovnik-Dobronak", DOLENJSKETOPLICE: "Dolenjske Toplice", DOLPRILJUBLJANI: "Dol pri Ljubljani", DOMZALE: "Domzale", DORNAVA: "Dornava", DRAVOGRAD: "Dravograd", DUPLEK: "Duplek", "GORENJAVAS-POLJANE": "Gorenja Vas-Poljane", GORISNICA: "Gorisnica", GORNJARADGONA: "Gornja Radgona", GORNJIGRAD: "Gornji Grad", GORNJIPETROVCI: "Gornji Petrovci", GRAD: "Grad", GROSUPLJE: "Grosuplje", HAJDINA: "Hajdina", "HOCE-SLIVNICA": "Hoce-Slivnica", "HODOS-HODOS": "Hodos-Hodos", HORJUL: "Horjul", HRASTNIK: "Hrastnik", "HRPELJE-KOZINA": "Hrpelje-Kozina", IDRIJA: "Idrija", IG: "Ig", ILIRSKABISTRICA: "Ilirska Bistrica", IVANCNAGORICA: "Ivancna Gorica", "IZOLA-ISOLA": "Izola-Isola", JESENICE: "Jesenice", JEZERSKO: "Jezersko", JURSINCI: "Jursinci", KAMNIK: "Kamnik", KANAL: "Kanal", KIDRICEVO: "Kidricevo", KOBARID: "Kobarid", KOBILJE: "Kobilje", KOCEVJE: "Kocevje", KOMEN: "Komen", KOMENDA: "Komenda", "KOPER-CAPODISTRIA": "Koper-Capodistria", KOSTEL: "Kostel", KOZJE: "Kozje", KRANJ: "Kranj", KRANJSKAGORA: "Kranjska Gora", KRIZEVCI: "Krizevci", KRSKO: "Krsko", KUNGOTA: "Kungota", KUZMA: "Kuzma", LASKO: "Lasko", LENART: "Lenart", "LENDAVA-LENDVA": "Lendava-Lendva", LITIJA: "Litija", LJUBLJANA: "Ljubljana", LJUBNO: "Ljubno", LJUTOMER: "Ljutomer", LOGATEC: "Logatec", LOSKADOLINA: "Loska Dolina", LOSKIPOTOK: "Loski Potok", LOVRENCNAPOHORJU: "Lovrenc na Pohorju", LUCE: "Luce", LUKOVICA: "Lukovica", MAJSPERK: "Majsperk", MARIBOR: "Maribor", MARKOVCI: "Markovci", MEDVODE: "Medvode", MENGES: "Menges", METLIKA: "Metlika", MEZICA: "Mezica", MIKLAVZNADRAVSKEMPOLJU: "Miklavz na Dravskem Polju", "MIREN-KOSTANJEVICA": "Miren-Kostanjevica", MIRNAPEC: "Mirna Pec", MISLINJA: "Mislinja", MORAVCE: "Moravce", MORAVSKETOPLICE: "Moravske Toplice", MOZIRJE: "Mozirje", MURSKASOBOTA: "Murska Sobota", MUTA: "Muta", NAKLO: "Naklo", NAZARJE: "Nazarje", NOVAGORICA: "Nova Gorica", NOVOMESTO: "Novo Mesto", ODRANCI: "Odranci", OPLOTNICA: "Oplotnica", ORMOZ: "Ormoz", OSILNICA: "Osilnica", PESNICA: "Pesnica", "PIRAN-PIRANO": "Piran-Pirano", PIVKA: "Pivka", PODCETRTEK: "Podcetrtek", PODLEHNIK: "Podlehnik", PODVELKA: "Podvelka", POLZELA: "Polzela", POSTOJNA: "Postojna", PREBOLD: "Prebold", PREDDVOR: "Preddvor", PREVALJE: "Prevalje", PTUJ: "Ptuj", PUCONCI: "Puconci", "RACE-FRAM": "Race-Fram", RADECE: "Radece", RADENCI: "Radenci", RADLJEOBDRAVI: "Radlje ob Dravi", RADOVLJICA: "Radovljica", RAVNENAKOROSKEM: "Ravne na Koroskem", RAZKRIZJE: "Razkrizje", RIBNICA: "Ribnica", RIBNICANAPOHORJU: "Ribnica na Pohorju", ROGASOVCI: "Rogasovci", ROGASKASLATINA: "Rogaska Slatina", ROGATEC: "Rogatec", RUSE: "Ruse", SALOVCI: "Salovci", SELNICAOBDRAVI: "Selnica ob Dravi", SEMIC: "Semic", "SEMPETER-VRTOJBA": "Sempeter-Vrtojba", SENCUR: "Sencur", SENTILJ: "Sentilj", SENTJERNEJ: "Sentjernej", SENTJURPRICELJU: "Sentjur pri Celju", SEVNICA: "Sevnica", SEZANA: "Sezana", SKOCJAN: "Skocjan", SKOFJALOKA: "Skofja Loka", SKOFLJICA: "Skofljica", SLOVENJGRADEC: "Slovenj Gradec", SLOVENSKABISTRICA: "Slovenska Bistrica", SLOVENSKEKONJICE: "Slovenske Konjice", SMARJEPRIJELSAH: "Smarje pri Jelsah", SMARTNOOBPAKI: "Smartno ob Paki", SMARTNOPRILITIJI: "Smartno pri Litiji", SODRAZICA: "Sodrazica", SOLCAVA: "Solcava", SOSTANJ: "Sostanj", STARSE: "Starse", STORE: "Store", SVETAANA: "Sveta Ana", SVETIANDRAZVSLOVENSKIHGORICAH: "Sveti Andraz v Slovenskih Goricah", SVETIJURIJ: "Sveti Jurij", TABOR: "Tabor", TISINA: "Tisina", TOLMIN: "Tolmin", TRBOVLJE: "Trbovlje", TREBNJE: "Trebnje", TRNOVSKAVAS: "Trnovska Vas", TRZIC: "Trzic", TRZIN: "Trzin", TURNISCE: "Turnisce", VELENJE: "Velenje", VELIKAPOLANA: "Velika Polana", VELIKELASCE: "Velike Lasce", VERZEJ: "Verzej", VIDEM: "Videm", VIPAVA: "Vipava", VITANJE: "Vitanje", VODICE: "Vodice", VOJNIK: "Vojnik", VRANSKO: "Vransko", VRHNIKA: "Vrhnika", VUZENICA: "Vuzenica", ZAGORJEOBSAVI: "Zagorje ob Savi", ZALEC: "Zalec", ZAVRC: "Zavrc", ZELEZNIKI: "Zelezniki", ZETALE: "Zetale", ZIRI: "Ziri", ZIROVNICA: "Zirovnica", ZUZEMBERK: "Zuzemberk", ZRECE: "Zrece" }, SB: { CENTRAL: "Central", CHOISEUL: "Choiseul", GUADALCANAL: "Guadalcanal", HONIARA: "Honiara", ISABEL: "Isabel", MAKIRA: "Makira", MALAITA: "Malaita", RENNELLANDBELLONA: "Rennell and Bellona", TEMOTU: "Temotu", WESTERN: "Western" }, SO: { AWDAL: "Awdal", BAKOOL: "Bakool", BANAADIR: "Banaadir", BARI: "Bari", BAY: "Bay", GALGUDUUD: "Galguduud", GEDO: "Gedo", HIIRAAN: "Hiiraan", JUBBADADHEXE: "Jubbada Dhexe", JUBBADAHOOSE: "Jubbada Hoose", MUDUG: "Mudug", NUGAAL: "Nugaal", SANAAG: "Sanaag", SHABEELLAHADHEXE: "Shabeellaha Dhexe", SHABEELLAHAHOOSE: "Shabeellaha Hoose", SOOL: "Sool", TOGDHEER: "Togdheer", WOQOOYIGALBEED: "Woqooyi Galbeed" }, ZA: { EC: "Eastern Cape", FS: "Free State", GP: "Gauteng", KZN: "KwaZulu-Natal", LP: "Limpopo", MP: "Mpumalanga", NC: "Northern Cape", NW: "North West", WC: "Western Cape" }, KR: { SEOUL: "Seoul", BUSANCITY: "Busan City", DAEGUCITY: "Daegu City", INCHEONCITY: "Incheon City", GWANGJUCITY: "Gwangju City", DAEJEONCITY: "Daejeon City", ULSAN: "Ulsan", GYEONGGIPROVINCE: "Gyeonggi Province", GANGWONPROVINCE: "Gangwon Province", NORTHCHUNGCHEONGPROVINCE: "North Chungcheong Province", SOUTHCHUNGCHEONGPROVINCE: "South Chungcheong Province", NORTHJEOLLAPROVINCE: "North Jeolla Province", SOUTHJEOLLAPROVINCE: "South Jeolla Province", NORTHGYEONGSANGPROVINCE: "North Gyeongsang Province", SOUTHGYEONGSANGPROVINCE: "South Gyeongsang Province", JEJU: "Jeju" }, ES: { C: "A Coruña", VI: "Araba/Álava", AB: "Albacete", A: "Alicante", AL: "Almería", O: "Asturias", AV: "Ávila", BA: "Badajoz", PM: "Baleares", B: "Barcelona", BU: "Burgos", CC: "Cáceres", CA: "Cádiz", S: "Cantabria", CS: "Castellón", CE: "Ceuta", CR: "Ciudad Real", CO: "Córdoba", CU: "Cuenca", GI: "Girona", GR: "Granada", GU: "Guadalajara", SS: "Gipuzkoa", H: "Huelva", HU: "Huesca", J: "Jaén", LO: "La Rioja", GC: "Las Palmas", LE: "León", L: "Lleida", LU: "Lugo", M: "Madrid", MA: "Málaga", ML: "Melilla", MU: "Murcia", NA: "Navarra", OR: "Ourense", P: "Palencia", PO: "Pontevedra", SA: "Salamanca", TF: "Santa Cruz de Tenerife", SG: "Segovia", SE: "Sevilla", SO: "Soria", T: "Tarragona", TE: "Teruel", TO: "Toledo", V: "Valencia", VA: "Valladolid", BI: "Bizkaia", ZA: "Zamora", Z: "Zaragoza" }, LK: { CENTRAL: "Central", NORTHCENTRAL: "North Central", NORTHEASTERN: "North Eastern", NORTHWESTERN: "North Western", SABARAGAMUWA: "Sabaragamuwa", SOUTHERN: "Southern", UVA: "Uva", WESTERN: "Western" }, SD: { "A'ALIANNIL": "A'ali an Nil", ALBAHRALAHMAR: "Al Bahr al Ahmar", ALBUHAYRAT: "Al Buhayrat", ALJAZIRAH: "Al Jazirah", ALKHARTUM: "Al Khartum", ALQADARIF: "Al Qadarif", ALWAHDAH: "Al Wahdah", ANNILALABYAD: "An Nil al Abyad", ANNILALAZRAQ: "An Nil al Azraq", ASHSHAMALIYAH: "Ash Shamaliyah", BAHRALJABAL: "Bahr al Jabal", "GHARBALISTIWA'IYAH": "Gharb al Istiwa'iyah", GHARBBAHRALGHAZAL: "Gharb Bahr al Ghazal", GHARBDARFUR: "Gharb Darfur", GHARBKURDUFAN: "Gharb Kurdufan", JANUBDARFUR: "Janub Darfur", JANUBKURDUFAN: "Janub Kurdufan", JUNQALI: "Junqali", KASSALA: "Kassala", NAHRANNIL: "Nahr an Nil", SHAMALBAHRALGHAZAL: "Shamal Bahr al Ghazal", SHAMALDARFUR: "Shamal Darfur", SHAMALKURDUFAN: "Shamal Kurdufan", "SHARQALISTIWA'IYAH": "Sharq al Istiwa'iyah", SINNAR: "Sinnar", WARAB: "Warab" }, SR: { BROKOPONDO: "Brokopondo", COMMEWIJNE: "Commewijne", CORONIE: "Coronie", MAROWIJNE: "Marowijne", NICKERIE: "Nickerie", PARA: "Para", PARAMARIBO: "Paramaribo", SARAMACCA: "Saramacca", SIPALIWINI: "Sipaliwini", WANICA: "Wanica" }, SZ: { HHOHHO: "Hhohho", LUBOMBO: "Lubombo", MANZINI: "Manzini", SHISELWENI: "Shiselweni" }, SE: { BLEKINGE: "Blekinge", DALARNAS: "Dalarnas", GAVLEBORGS: "Gavleborgs", GOTLANDS: "Gotlands", HALLANDS: "Hallands", JAMTLANDS: "Jamtlands", JONKOPINGS: "Jonkopings", KALMAR: "Kalmar", KRONOBERGS: "Kronobergs", NORRBOTTENS: "Norrbottens", OREBRO: "Orebro", OSTERGOTLANDS: "Ostergotlands", SKANE: "Skane", SODERMANLANDS: "Sodermanlands", STOCKHOLMS: "Stockholms", UPPSALA: "Uppsala", VARMLANDS: "Varmlands", VASTERBOTTENS: "Vasterbottens", VASTERNORRLANDS: "Vasternorrlands", VASTMANLANDS: "Vastmanlands", VASTRAGOTALANDS: "Vastra Gotalands" }, CH: { AARGAU: "Aargau", "APPENZELLAUSSER-RHODEN": "Appenzell Ausser-Rhoden", "APPENZELLINNER-RHODEN": "Appenzell Inner-Rhoden", "BASEL-LANDSCHAFT": "Basel-Landschaft", "BASEL-STADT": "Basel-Stadt", BERN: "Bern", FRIBOURG: "Fribourg", GENEVE: "Geneve", GLARUS: "Glarus", GRAUBUNDEN: "Graubunden", JURA: "Jura", LUZERN: "Luzern", NEUCHATEL: "Neuchatel", NIDWALDEN: "Nidwalden", OBWALDEN: "Obwalden", SANKTGALLEN: "Sankt Gallen", SCHAFFHAUSEN: "Schaffhausen", SCHWYZ: "Schwyz", SOLOTHURN: "Solothurn", THURGAU: "Thurgau", TICINO: "Ticino", URI: "Uri", VALAIS: "Valais", VAUD: "Vaud", ZUG: "Zug", ZURICH: "Zurich" }, SY: { ALHASAKAH: "Al Hasakah", ALLADHIQIYAH: "Al Ladhiqiyah", ALQUNAYTIRAH: "Al Qunaytirah", ARRAQQAH: "Ar Raqqah", "ASSUWAYDA'": "As Suwayda'", "DAR'A": "Dar'a", DAYRAZZAWR: "Dayr az Zawr", DIMASHQ: "Dimashq", HALAB: "Halab", HAMAH: "Hamah", HIMS: "Hims", IDLIB: "Idlib", RIFDIMASHQ: "Rif Dimashq", TARTUS: "Tartus" }, TW: { "CHANG-HUA": "Chang-hua", "CHIA-I": "Chia-i", "HSIN-CHU": "Hsin-chu", "HUA-LIEN": "Hua-lien", "I-LAN": "I-lan", "KAO-HSIUNG": "Kao-hsiung", "KIN-MEN": "Kin-men", "LIEN-CHIANG": "Lien-chiang", "MIAO-LI": "Miao-li", "NAN-T'OU": "Nan-t'ou", "P'ENG-HU": "P'eng-hu", "P'ING-TUNG": "P'ing-tung", "T'AI-CHUNG": "T'ai-chung", "T'AI-NAN": "T'ai-nan", "T'AI-PEI": "T'ai-pei", "T'AI-TUNG": "T'ai-tung", "T'AO-YUAN": "T'ao-yuan", "YUN-LIN": "Yun-lin", "CHI-LUNG": "Chi-lung", "KAO-HSIUNGCITY": "Kao-hsiung city", "T'AI-PEICITY": "T'ai-pei city" }, TZ: { ARUSHA: "Arusha", DARESSALAAM: "Dar es Salaam", DODOMA: "Dodoma", IRINGA: "Iringa", KAGERA: "Kagera", KIGOMA: "Kigoma", KILIMANJARO: "Kilimanjaro", LINDI: "Lindi", MANYARA: "Manyara", MARA: "Mara", MBEYA: "Mbeya", MOROGORO: "Morogoro", MTWARA: "Mtwara", MWANZA: "Mwanza", PEMBANORTH: "Pemba North", PEMBASOUTH: "Pemba South", PWANI: "Pwani", RUKWA: "Rukwa", RUVUMA: "Ruvuma", SHINYANGA: "Shinyanga", SINGIDA: "Singida", TABORA: "Tabora", TANGA: "Tanga", "ZANZIBARCENTRAL/SOUTH": "Zanzibar Central/South", ZANZIBARNORTH: "Zanzibar North", "ZANZIBARURBAN/WEST": "Zanzibar Urban/West" }, TH: { "TH-37": "Amnat Charoen {อำนาจเจริญ},", "TH-15": "Ang Thong {อ่างทอง},", "TH-14": "Ayutthaya {พระนครศรีอยุธยา},", "TH-10": "Bangkok {กรุงเทพมหานคร},", "TH-38": "Bueng Kan {บึงกาฬ},", "TH-31": "Buri Ram {บุรีรัมย์},", "TH-24": "Chachoengsao {ฉะเชิงเทรา},", "TH-18": "Chai Nat {ชัยนาท},", "TH-36": "Chaiyaphum {ชัยภูมิ},", "TH-22": "Chanthaburi {จันทบุรี},", "TH-50": "Chiang Mai {เชียงใหม่},", "TH-57": "Chiang Rai {เชียงราย},", "TH-20": "Chonburi {ชลบุรี},", "TH-86": "Chumphon {ชุมพร},", "TH-46": "Kalasin {กาฬสินธุ์},", "TH-62": "Kamphaeng Phet {กำแพงเพชร},", "TH-71": "Kanchanaburi {กาญจนบุรี},", "TH-40": "Khon Kaen {ขอนแก่น},", "TH-81": "Krabi {กระบี่},", "TH-52": "Lampang {ลำปาง},", "TH-51": "Lamphun {ลำพูน},", "TH-42": "Loei {เลย},", "TH-16": "Lopburi {ลพบุรี},", "TH-58": "Mae Hong Son {แม่ฮ่องสอน},", "TH-44": "Maha Sarakham {มหาสารคาม},", "TH-49": "Mukdahan {มุกดาหาร},", "TH-26": "Nakhon Nayok {นครนายก},", "TH-73": "Nakhon Pathom {นครปฐม},", "TH-48": "Nakhon Phanom {นครพนม},", "TH-30": "Nakhon Ratchasima {นครราชสีมา},", "TH-60": "Nakhon Sawan {นครสวรรค์},", "TH-80": "Nakhon Si Thammarat {นครศรีธรรมราช},", "TH-55": "Nan {น่าน},", "TH-96": "Narathiwat {นราธิวาส},", "TH-39": "Nong Bua Lam Phu {หนองบัวลำภู},", "TH-43": "Nong Khai {หนองคาย},", "TH-12": "Nonthaburi {นนทบุรี},", "TH-13": "Pathum Thani {ปทุมธานี},", "TH-94": "Pattani {ปัตตานี},", "TH-82": "Phang Nga {พังงา},", "TH-93": "Phatthalung {พัทลุง},", "TH-56": "Phayao {พะเยา},", "TH-67": "Phetchabun {เพชรบูรณ์},", "TH-76": "Phetchaburi {เพชรบุรี},", "TH-66": "Phichit {พิจิตร},", "TH-65": "Phitsanulok {พิษณุโลก},", "TH-54": "Phrae {แพร่},", "TH-83": "Phuket {ภูเก็ต},", "TH-25": "Prachin Buri {ปราจีนบุรี},", "TH-77": "Prachuap Khiri Khan {ประจวบคีรีขันธ์},", "TH-85": "Ranong {ระนอง},", "TH-70": "Ratchaburi {ราชบุรี},", "TH-21": "Rayong {ระยอง},", "TH-45": "Roi Et {ร้อยเอ็ด},", "TH-27": "Sa Kaeo {สระแก้ว},", "TH-47": "Sakon Nakhon {สกลนคร},", "TH-11": "Samut Prakan {สมุทรปราการ},", "TH-74": "Samut Sakhon {สมุทรสาคร},", "TH-75": "Samut Songkhram {สมุทรสงคราม},", "TH-19": "Saraburi {สระบุรี},", "TH-91": "Satun {สตูล},", "TH-17": "Sing Buri {สิงห์บุรี},", "TH-33": "Sisaket {ศรีสะเกษ},", "TH-90": "Songkhla {สงขลา},", "TH-64": "Sukhothai {สุโขทัย},", "TH-72": "Suphan Buri {สุพรรณบุรี},", "TH-84": "Surat Thani {สุราษฎร์ธานี},", "TH-32": "Surin {สุรินทร์},", "TH-63": "Tak {ตาก},", "TH-92": "Trang {ตรัง},", "TH-23": "Trat {ตราด},", "TH-34": "Ubon Ratchathani {อุบลราชธานี},", "TH-41": "Udon Thani {อุดรธานี},", "TH-61": "Uthai Thani {อุทัยธานี},", "TH-53": "Uttaradit {อุตรดิตถ์},", "TH-95": "Yala {ยะลา},", "TH-35": "Yasothon {ยโสธร}," }, TG: { KARA: "Kara", PLATEAUX: "Plateaux", SAVANES: "Savanes", CENTRALE: "Centrale", MARITIME: "Maritime" }, TT: { COUVA: "Couva", DIEGOMARTIN: "Diego Martin", MAYARO: "Mayaro", PENAL: "Penal", PRINCESTOWN: "Princes Town", SANGREGRANDE: "Sangre Grande", SANJUAN: "San Juan", SIPARIA: "Siparia", TUNAPUNA: "Tunapuna", "PORT-OF-SPAIN": "Port-of-Spain", SANFERNANDO: "San Fernando", ARIMA: "Arima", POINTFORTIN: "Point Fortin", CHAGUANAS: "Chaguanas", TOBAGO: "Tobago" }, TN: { "ARIANA{ARYANAH},": "Ariana {Aryanah},", "BEJA{BAJAH},": "Beja {Bajah},", "BENAROUS{BIN'ARUS},": "Ben Arous {Bin 'Arus},", "BIZERTE{BANZART},": "Bizerte {Banzart},", "GABES{QABIS},": "Gabes {Qabis},", "GAFSA{QAFSAH},": "Gafsa {Qafsah},", "JENDOUBA{JUNDUBAH},": "Jendouba {Jundubah},", "KAIROUAN{ALQAYRAWAN},": "Kairouan {Al Qayrawan},", "KASSERINE{ALQASRAYN},": "Kasserine {Al Qasrayn},", "KEBILI{QIBILI},": "Kebili {Qibili},", "KEF{ALKAF},": "Kef {Al Kaf},", "MAHDIA{ALMAHDIYAH},": "Mahdia {Al Mahdiyah},", "MANOUBA{MANUBAH},": "Manouba {Manubah},", "MEDENINE{MADANIN},": "Medenine {Madanin},", "MONASTIR{ALMUNASTIR},": "Monastir {Al Munastir},", "NABEUL{NABUL},": "Nabeul {Nabul},", "SFAX{SAFAQIS},": "Sfax {Safaqis},", "SIDIBOUZID{SIDIBUZAYD},": "Sidi Bou Zid {Sidi Bu Zayd},", "SILIANA{SILYANAH},": "Siliana {Silyanah},", "SOUSSE{SUSAH},": "Sousse {Susah},", "TATAOUINE{TATAWIN},": "Tataouine {Tatawin},", "TOZEUR{TAWZAR},": "Tozeur {Tawzar},", TUNIS: "Tunis", "ZAGHOUAN{ZAGHWAN},": "Zaghouan {Zaghwan}," }, TR: { TR01: "Adana", TR02: "Adıyaman", TR03: "Afyon", TR04: "Ağrı", TR05: "Amasya", TR06: "Ankara", TR07: "Antalya", TR08: "Artvin", TR09: "Aydın", TR10: "Balıkesir", TR11: "Bilecik", TR12: "Bingöl", TR13: "Bitlis", TR14: "Bolu", TR15: "Burdur", TR16: "Bursa", TR17: "Çanakkale", TR18: "Çankırı", TR19: "Çorum", TR20: "Denizli", TR21: "Diyarbakır", TR22: "Edirne", TR23: "Elazığ", TR24: "Erzincan", TR25: "Erzurum", TR26: "Eskişehir", TR27: "Gaziantep", TR28: "Giresun", TR29: "Gümüşhane", TR30: "Hakkari", TR31: "Hatay", TR32: "Isparta", TR33: "İçel", TR34: "İstanbul", TR35: "İzmir", TR36: "Kars", TR37: "Kastamonu", TR38: "Kayseri", TR39: "Kırklareli", TR40: "Kırşehir", TR41: "Kocaeli", TR42: "Konya", TR43: "Kütahya", TR44: "Malatya", TR45: "Manisa", TR46: "Kahramanmaraş", TR47: "Mardin", TR48: "Muğla", TR49: "Muş", TR50: "Nevşehir", TR51: "Niğde", TR52: "Ordu", TR53: "Rize", TR54: "Sakarya", TR55: "Samsun", TR56: "Siirt", TR57: "Sinop", TR58: "Sivas", TR59: "Tekirdağ", TR60: "Tokat", TR61: "Trabzon", TR62: "Tunceli", TR63: "Şanlıurfa", TR64: "Uşak", TR65: "Van", TR66: "Yozgat", TR67: "Zonguldak", TR68: "Aksaray", TR69: "Bayburt", TR70: "Karaman", TR71: "Kırıkkale", TR72: "Batman", TR73: "Şırnak", TR74: "Bartın", TR75: "Ardahan", TR76: "Iğdır", TR77: "Yalova", TR78: "Karabük", TR79: "Kilis", TR80: "Osmaniye", TR81: "Düzce" }, TM: { "AHALWELAYATY{ASHGABAT},": "Ahal Welayaty {Ashgabat},", "BALKANWELAYATY{BALKANABAT},": "Balkan Welayaty {Balkanabat},", DASHOGUZWELAYATY: "Dashoguz Welayaty", "LEBAPWELAYATY{TURKMENABAT},": "Lebap Welayaty {Turkmenabat},", MARYWELAYATY: "Mary Welayaty" }, UG: { ADJUMANI: "Adjumani", APAC: "Apac", ARUA: "Arua", BUGIRI: "Bugiri", BUNDIBUGYO: "Bundibugyo", BUSHENYI: "Bushenyi", BUSIA: "Busia", GULU: "Gulu", HOIMA: "Hoima", IGANGA: "Iganga", JINJA: "Jinja", KABALE: "Kabale", KABAROLE: "Kabarole", KABERAMAIDO: "Kaberamaido", KALANGALA: "Kalangala", KAMPALA: "Kampala", KAMULI: "Kamuli", KAMWENGE: "Kamwenge", KANUNGU: "Kanungu", KAPCHORWA: "Kapchorwa", KASESE: "Kasese", KATAKWI: "Katakwi", KAYUNGA: "Kayunga", KIBALE: "Kibale", KIBOGA: "Kiboga", KISORO: "Kisoro", KITGUM: "Kitgum", KOTIDO: "Kotido", KUMI: "Kumi", KYENJOJO: "Kyenjojo", LIRA: "Lira", LUWERO: "Luwero", MASAKA: "Masaka", MASINDI: "Masindi", MAYUGE: "Mayuge", MBALE: "Mbale", MBARARA: "Mbarara", MOROTO: "Moroto", MOYO: "Moyo", MPIGI: "Mpigi", MUBENDE: "Mubende", MUKONO: "Mukono", NAKAPIRIPIRIT: "Nakapiripirit", NAKASONGOLA: "Nakasongola", NEBBI: "Nebbi", NTUNGAMO: "Ntungamo", PADER: "Pader", PALLISA: "Pallisa", RAKAI: "Rakai", RUKUNGIRI: "Rukungiri", SEMBABULE: "Sembabule", SIRONKO: "Sironko", SOROTI: "Soroti", TORORO: "Tororo", WAKISO: "Wakiso", YUMBE: "Yumbe" }, UA: { CHERKASY: "Cherkasy", CHERNIHIV: "Chernihiv", CHERNIVTSI: "Chernivtsi", CRIMEA: "Crimea", "DNIPROPETROVS'K": "Dnipropetrovs'k", "DONETS'K": "Donets'k", "IVANO-FRANKIVS'K": "Ivano-Frankivs'k", KHARKIV: "Kharkiv", KHERSON: "Kherson", "KHMEL'NYTS'KYY": "Khmel'nyts'kyy", KIROVOHRAD: "Kirovohrad", KIEV: "Kiev", KYYIV: "Kyyiv", "LUHANS'K": "Luhans'k", "L'VIV": "L'viv", MYKOLAYIV: "Mykolayiv", ODESA: "Odesa", POLTAVA: "Poltava", RIVNE: "Rivne", "SEVASTOPOL'": "Sevastopol'", SUMY: "Sumy", "TERNOPIL'": "Ternopil'", VINNYTSYA: "Vinnytsya", "VOLYN'": "Volyn'", ZAKARPATTYA: "Zakarpattya", ZAPORIZHZHYA: "Zaporizhzhya", ZHYTOMYR: "Zhytomyr" }, AE: { ABUDHABI: "Abu Dhabi", "'AJMAN": "Ajman", ALFUJAYRAH: "Al Fujayrah", SHARJAH: "Sharjah", DUBAI: "Dubai", "RA'SALKHAYMAH": "Ra's al Khaymah", UMMALQAYWAYN: "Umm al Qaywayn" }, GB: { ABERCONWYANDCOLWYN: "Aberconwy and Colwyn", ABERDEENCITY: "Aberdeen City", ABERDEENSHIRE: "Aberdeenshire", ANGLESEY: "Anglesey", ANGUS: "Angus", ANTRIM: "Antrim", ARGYLLANDBUTE: "Argyll and Bute", ARMAGH: "Armagh", AVON: "Avon", AYRSHIRE: "Ayrshire", BATHANDNESOMERSET: "Bath and NE Somerset", BEDFORDSHIRE: "Bedfordshire", BELFAST: "Belfast", BERKSHIRE: "Berkshire", BERWICKSHIRE: "Berwickshire", BFPO: "BFPO", BLAENAUGWENT: "Blaenau Gwent", BUCKINGHAMSHIRE: "Buckinghamshire", CAERNARFONSHIRE: "Caernarfonshire", CAERPHILLY: "Caerphilly", CAITHNESS: "Caithness", CAMBRIDGESHIRE: "Cambridgeshire", CARDIFF: "Cardiff", CARDIGANSHIRE: "Cardiganshire", CARMARTHENSHIRE: "Carmarthenshire", CEREDIGION: "Ceredigion", CHANNELISLANDS: "Channel Islands", CHESHIRE: "Cheshire", CITYOFBRISTOL: "City of Bristol", CLACKMANNANSHIRE: "Clackmannanshire", CLWYD: "Clwyd", CONWY: "Conwy", "CORNWALL/SCILLY": "Cornwall/Scilly", CUMBRIA: "Cumbria", DENBIGHSHIRE: "Denbighshire", DERBYSHIRE: "Derbyshire", "DERRY/LONDONDERRY": "Derry/Londonderry", DEVON: "Devon", DORSET: "Dorset", DOWN: "Down", DUMFRIESANDGALLOWAY: "Dumfries and Galloway", DUNBARTONSHIRE: "Dunbartonshire", DUNDEE: "Dundee", DURHAM: "Durham", DYFED: "Dyfed", EASTAYRSHIRE: "East Ayrshire", EASTDUNBARTONSHIRE: "East Dunbartonshire", EASTLOTHIAN: "East Lothian", EASTRENFREWSHIRE: "East Renfrewshire", EASTRIDINGYORKSHIRE: "East Riding Yorkshire", EASTSUSSEX: "East Sussex", EDINBURGH: "Edinburgh", ENGLAND: "England", ESSEX: "Essex", FALKIRK: "Falkirk", FERMANAGH: "Fermanagh", FIFE: "Fife", FLINTSHIRE: "Flintshire", GLASGOW: "Glasgow", GLOUCESTERSHIRE: "Gloucestershire", GREATERLONDON: "Greater London", GREATERMANCHESTER: "Greater Manchester", GWENT: "Gwent", GWYNEDD: "Gwynedd", HAMPSHIRE: "Hampshire", HARTLEPOOL: "Hartlepool", HEREFORDANDWORCESTER: "Hereford and Worcester", HERTFORDSHIRE: "Hertfordshire", HIGHLANDS: "Highlands", INVERCLYDE: "Inverclyde", "INVERNESS-SHIRE": "Inverness-Shire", ISLEOFMAN: "Isle of Man", ISLEOFWIGHT: "Isle of Wight", KENT: "Kent", KINCARDINSHIRE: "Kincardinshire", KINGSTONUPONHULL: "Kingston Upon Hull", "KINROSS-SHIRE": "Kinross-Shire", KIRKLEES: "Kirklees", LANARKSHIRE: "Lanarkshire", LANCASHIRE: "Lancashire", LEICESTERSHIRE: "Leicestershire", LINCOLNSHIRE: "Lincolnshire", LONDONDERRY: "Londonderry", MERSEYSIDE: "Merseyside", MERTHYRTYDFIL: "Merthyr Tydfil", MIDGLAMORGAN: "Mid Glamorgan", MIDLOTHIAN: "Mid Lothian", MIDDLESEX: "Middlesex", MONMOUTHSHIRE: "Monmouthshire", MORAY: "Moray", "NEATH&PORTTALBOT": "Neath & Port Talbot", NEWPORT: "Newport", NORFOLK: "Norfolk", NORTHAYRSHIRE: "North Ayrshire", NORTHEASTLINCOLNSHIRE: "North East Lincolnshire", NORTHLANARKSHIRE: "North Lanarkshire", NORTHLINCOLNSHIRE: "North Lincolnshire", NORTHSOMERSET: "North Somerset", NORTHYORKSHIRE: "North Yorkshire", NORTHAMPTONSHIRE: "Northamptonshire", NORTHERNIRELAND: "Northern Ireland", NORTHUMBERLAND: "Northumberland", NOTTINGHAMSHIRE: "Nottinghamshire", ORKNEYANDSHETLANDISLES: "Orkney and Shetland Isles", OXFORDSHIRE: "Oxfordshire", PEMBROKESHIRE: "Pembrokeshire", PERTHANDKINROSS: "Perth and Kinross", POWYS: "Powys", REDCARANDCLEVELAND: "Redcar and Cleveland", RENFREWSHIRE: "Renfrewshire", RHONDACYNONTAFF: "Rhonda Cynon Taff", RUTLAND: "Rutland", SCOTTISHBORDERS: "Scottish Borders", SHETLAND: "Shetland", SHROPSHIRE: "Shropshire", SOMERSET: "Somerset", SOUTHAYRSHIRE: "South Ayrshire", SOUTHGLAMORGAN: "South Glamorgan", SOUTHGLOUCESTESHIRE: "South Gloucesteshire", SOUTHLANARKSHIRE: "South Lanarkshire", SOUTHYORKSHIRE: "South Yorkshire", STAFFORDSHIRE: "Staffordshire", STIRLING: "Stirling", STOCKTONONTEES: "Stockton On Tees", SUFFOLK: "Suffolk", SURREY: "Surrey", SWANSEA: "Swansea", TORFAEN: "Torfaen", TYNEANDWEAR: "Tyne and Wear", TYRONE: "Tyrone", VALEOFGLAMORGAN: "Vale Of Glamorgan", WALES: "Wales", WARWICKSHIRE: "Warwickshire", WESTBERKSHIRE: "West Berkshire", WESTDUNBARTONSHIRE: "West Dunbartonshire", WESTGLAMORGAN: "West Glamorgan", WESTLOTHIAN: "West Lothian", WESTMIDLANDS: "West Midlands", WESTSUSSEX: "West Sussex", WESTYORKSHIRE: "West Yorkshire", WESTERNISLES: "Western Isles", WILTSHIRE: "Wiltshire", WIRRAL: "Wirral", WORCESTERSHIRE: "Worcestershire", WREXHAM: "Wrexham", YORK: "York" }, US: { AL: "Alabama", AK: "Alaska", AZ: "Arizona", AR: "Arkansas", CA: "California", CO: "Colorado", CT: "Connecticut", DE: "Delaware", DC: "District Of Columbia", FL: "Florida", GA: "Georgia", HI: "Hawaii", ID: "Idaho", IL: "Illinois", IN: "Indiana", IA: "Iowa", KS: "Kansas", KY: "Kentucky", LA: "Louisiana", ME: "Maine", MD: "Maryland", MA: "Massachusetts", MI: "Michigan", MN: "Minnesota", MS: "Mississippi", MO: "Missouri", MT: "Montana", NE: "Nebraska", NV: "Nevada", NH: "New Hampshire", NJ: "New Jersey", NM: "New Mexico", NY: "New York", NC: "North Carolina", ND: "North Dakota", OH: "Ohio", OK: "Oklahoma", OR: "Oregon", PA: "Pennsylvania", RI: "Rhode Island", SC: "South Carolina", SD: "South Dakota", TN: "Tennessee", TX: "Texas", UT: "Utah", VT: "Vermont", VA: "Virginia", WA: "Washington", WV: "West Virginia", WI: "Wisconsin", WY: "Wyoming", AA: "Armed Forces {AA},", AE: "Armed Forces {AE},", AP: "Armed Forces {AP},", AS: "American Samoa", GU: "Guam", MP: "Northern Mariana Islands", PR: "Puerto Rico", UM: "US Minor Outlying Islands", VI: "US Virgin Islands" }, UY: { ARTIGAS: "Artigas", CANELONES: "Canelones", CERROLARGO: "Cerro Largo", COLONIA: "Colonia", DURAZNO: "Durazno", FLORES: "Flores", FLORIDA: "Florida", LAVALLEJA: "Lavalleja", MALDONADO: "Maldonado", MONTEVIDEO: "Montevideo", PAYSANDU: "Paysandu", RIONEGRO: "Rio Negro", RIVERA: "Rivera", ROCHA: "Rocha", SALTO: "Salto", SANJOSE: "San Jose", SORIANO: "Soriano", TACUAREMBO: "Tacuarembo", TREINTAYTRES: "Treinta y Tres" }, UZ: { ANDIJONVILOYATI: "Andijon Viloyati", BUXOROVILOYATI: "Buxoro Viloyati", "FARG'ONAVILOYATI": "Farg'ona Viloyati", JIZZAXVILOYATI: "Jizzax Viloyati", NAMANGANVILOYATI: "Namangan Viloyati", NAVOIYVILOYATI: "Navoiy Viloyati", QASHQADARYOVILOYATI: "Qashqadaryo Viloyati", "QARAQALPOG'ISTONRESPUBLIKASI": "Qaraqalpog'iston Respublikasi", SAMARQANDVILOYATI: "Samarqand Viloyati", SIRDARYOVILOYATI: "Sirdaryo Viloyati", SURXONDARYOVILOYATI: "Surxondaryo Viloyati", TOSHKENTSHAHRI: "Toshkent Shahri", TOSHKENTVILOYATI: "Toshkent Viloyati", XORAZMVILOYATI: "Xorazm Viloyati" }, VU: { MALAMPA: "Malampa", PENAMA: "Penama", SANMA: "Sanma", SHEFA: "Shefa", TAFEA: "Tafea", TORBA: "Torba" }, VE: { AMAZONAS: "Amazonas", ANZOATEGUI: "Anzoategui", APURE: "Apure", ARAGUA: "Aragua", BARINAS: "Barinas", BOLIVAR: "Bolivar", CARABOBO: "Carabobo", COJEDES: "Cojedes", DELTAAMACURO: "Delta Amacuro", DEPENDENCIASFEDERALES: "Dependencias Federales", DISTRITOFEDERAL: "Distrito Federal", FALCON: "Falcon", GUARICO: "Guarico", LARA: "Lara", MERIDA: "Merida", MIRANDA: "Miranda", MONAGAS: "Monagas", NUEVAESPARTA: "Nueva Esparta", PORTUGUESA: "Portuguesa", SUCRE: "Sucre", TACHIRA: "Tachira", TRUJILLO: "Trujillo", VARGAS: "Vargas", YARACUY: "Yaracuy", ZULIA: "Zulia" }, VN: { ANGIANG: "An Giang", BACGIANG: "Bac Giang", BACKAN: "Bac Kan", BACLIEU: "Bac Lieu", BACNINH: "Bac Ninh", "BARIA-VUNGTAU": "Ba Ria-Vung Tau", BENTRE: "Ben Tre", BINHDINH: "Binh Dinh", BINHDUONG: "Binh Duong", BINHPHUOC: "Binh Phuoc", BINHTHUAN: "Binh Thuan", CAMAU: "Ca Mau", CAOBANG: "Cao Bang", DACLAK: "Dac Lak", DACNONG: "Dac Nong", DIENBIEN: "Dien Bien", DONGNAI: "Dong Nai", DONGTHAP: "Dong Thap", GIALAI: "Gia Lai", HAGIANG: "Ha Giang", HAIDUONG: "Hai Duong", HANAM: "Ha Nam", HATAY: "Ha Tay", HATINH: "Ha Tinh", HAUGIANG: "Hau Giang", HOABINH: "Hoa Binh", HUNGYEN: "Hung Yen", KHANHHOA: "Khanh Hoa", KIENGIANG: "Kien Giang", KONTUM: "Kon Tum", LAICHAU: "Lai Chau", LAMDONG: "Lam Dong", LANGSON: "Lang Son", LAOCAI: "Lao Cai", LONGAN: "Long An", NAMDINH: "Nam Dinh", NGHEAN: "Nghe An", NINHBINH: "Ninh Binh", NINHTHUAN: "Ninh Thuan", PHUTHO: "Phu Tho", PHUYEN: "Phu Yen", QUANGBINH: "Quang Binh", QUANGNAM: "Quang Nam", QUANGNGAI: "Quang Ngai", QUANGNINH: "Quang Ninh", QUANGTRI: "Quang Tri", SOCTRANG: "Soc Trang", SONLA: "Son La", TAYNINH: "Tay Ninh", THAIBINH: "Thai Binh", THAINGUYEN: "Thai Nguyen", THANHHOA: "Thanh Hoa", "THUATHIEN-HUE": "Thua Thien-Hue", TIENGIANG: "Tien Giang", TRAVINH: "Tra Vinh", TUYENQUANG: "Tuyen Quang", VINHLONG: "Vinh Long", VINHPHUC: "Vinh Phuc", YENBAI: "Yen Bai", CANTHO: "Can Tho", DANANG: "Da Nang", HAIPHONG: "Hai Phong", HANOI: "Hanoi", HOCHIMINH: "Ho Chi Minh" }, YE: { ABYAN: "Abyan", "'ADAN": "'Adan", "ADDALI'": "Ad Dali'", "ALBAYDA'": "Al Bayda'", ALHUDAYDAH: "Al Hudaydah", ALJAWF: "Al Jawf", ALMAHRAH: "Al Mahrah", ALMAHWIT: "Al Mahwit", "'AMRAN": "'Amran", DHAMAR: "Dhamar", HADRAMAWT: "Hadramawt", HAJJAH: "Hajjah", IBB: "Ibb", LAHIJ: "Lahij", "MA'RIB": "Ma'rib", "SA'DAH": "Sa'dah", "SAN'A'": "San'a'", SHABWAH: "Shabwah", "TA'IZZ": "Ta'izz" }, ZM: { CENTRAL: "Central", COPPERBELT: "Copperbelt", EASTERN: "Eastern", LUAPULA: "Luapula", LUSAKA: "Lusaka", NORTHERN: "Northern", "NORTH-WESTERN": "North-Western", SOUTHERN: "Southern", WESTERN: "Western" }, ZW: { BULAWAYO: "Bulawayo", HARARE: "Harare", MANICALAND: "Manicaland", MASHONALANDCENTRAL: "Mashonaland Central", MASHONALANDEAST: "Mashonaland East", MASHONALANDWEST: "Mashonaland West", MASVINGO: "Masvingo", MATABELELANDNORTH: "Matabeleland North", MATABELELANDSOUTH: "Matabeleland South", MIDLANDS: "Midlands" } };
    }
    return GlobalData;
}());
exports.GlobalData = GlobalData;

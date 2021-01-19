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
exports.ChatPage = void 0;
var core_1 = require("@angular/core");
var angular_1 = require("@ionic/angular");
var text_templates_page_1 = require("src/app/modal/text-templates/text-templates.page");
var ChatPage = /** @class */ (function () {
    function ChatPage(chatService, global, rest, router, route, alertCtrl, modalCtrl) {
        var _this = this;
        this.chatService = chatService;
        this.global = global;
        this.rest = rest;
        this.router = router;
        this.route = route;
        this.alertCtrl = alertCtrl;
        this.modalCtrl = modalCtrl;
        this.msgsList = [];
        this.textMsg = '';
        this.showEmojiPicker = false;
        this.contactData = { first_name: '', last_name: '' };
        this.user_id = this.rest.getCurrentUserID();
        this.route.queryParams.subscribe(function (params) {
            if (params && params.contactId) {
                _this.contactId = params.contactId;
            }
        });
    }
    ChatPage.prototype.ngOnInit = function () {
    };
    ChatPage.prototype.ionViewDidEnter = function () {
        this.global.showLoading("bubbles", "Please wait...");
        this.getContactChat();
    };
    ChatPage.prototype.scrollToBottom = function (delay) {
        var _this = this;
        if (delay === void 0) { delay = 300; }
        setTimeout(function () {
            if (_this.content.scrollToBottom) {
                _this.content.scrollToBottom();
            }
        }, delay);
    };
    ChatPage.prototype.pushMessage = function () {
        var msg = [];
        msg['status'] = 'send';
        msg['avatar'] = 'assets/img/user-comment-img-01.png';
        msg['time'] = 'Luff over 3 years ago';
        msg['text'] = '	Hello, hope you are doing great. I want to meet you soon.';
        // this.msgsList.push(msg);
        this.scrollToBottom();
    };
    ChatPage.prototype.receiveMessage = function () {
        var msg = [];
        msg['status'] = 'receive';
        msg['avatar'] = 'assets/img/user-comment-img-01.png';
        msg['time'] = 'Anna over 3 years ago';
        msg['text'] = 'Hi, I\'m great, Yes I will meet you as soon I get free.';
        // this.msgsList.push(msg);
        this.scrollToBottom();
    };
    // getMsg() {
    // 	// Get mock message list
    // 	return this.chatService
    // 		.getMsgList()
    // 		.subscribe(res => {
    // 			this.msgsList = res;
    // 			this.scrollToBottom();
    // 		});
    // }
    ChatPage.prototype.sendMsg = function () {
        var _this = this;
        this.textMsg = this.textMsg.trim();
        if (!this.textMsg) {
            return;
        }
        var id = Date.now().toString();
        var newMsg = this.getNewMsg(this.textMsg, id);
        this.pushNewMsg(newMsg);
        this.textMsg = '';
        // if (!this.showEmojiPicker) {
        // 	this.focus();
        // }
        this.chatService.sendMsg(newMsg).subscribe(function (res) {
            var rest = res;
            var index = _this.getMsgIndexById(id);
            if (index !== -1) {
                _this.msgsList[index].status = 'success';
                _this.msgsList[index].id = rest.msg_id;
            }
        }, function (err) {
            var index = _this.getMsgIndexById(id);
            if (index !== -1) {
                _this.msgsList[index].status = 'failed';
                _this.msgsList[index].id = err.error.msg_id;
            }
            _this.processError(err);
        });
    };
    ChatPage.prototype.pushNewMsg = function (msg) {
        // 	toUserId = this.toUser.id;
        // // Verify user relationships
        // if (msg.userId === userId && msg.toUserId === toUserId) {
        // 	this.msgsList.push(msg);
        // } else if (msg.toUserId === userId && msg.userId === toUserId) {
        // 	this.msgsList.push(msg);
        // }
        this.msgsList.push(msg);
        this.scrollToBottom();
    };
    ChatPage.prototype.getMsgIndexById = function (id) {
        return this.msgsList.findIndex(function (e) { return e.messageTempId === id; });
    };
    // private focus() {
    // 	if (this.messageInput && this.messageInput.nativeElement) {
    // 		this.messageInput.nativeElement.focus();
    // 	}
    // }
    // private setTextareaScroll() {
    // 	const textarea = this.messageInput.nativeElement;
    // 	textarea.scrollTop = textarea.scrollHeight;
    // }
    ChatPage.prototype.getNewMsg = function (text, tempId) {
        var mockMsg = {
            id: null,
            messageTempId: tempId,
            user_id: this.user_id,
            contact_id: this.contactId,
            time: Date.now(),
            text: text,
            status: 'pending',
            type: 'send'
        };
        return mockMsg;
    };
    ChatPage.prototype.processError = function (err) {
        if (err.error.errorCode == 21211) {
            err.error.message = 'Invalid recipient phone number.';
        }
        this.global.checkErrorStatus(err);
    };
    ChatPage.prototype.getContactChat = function (event, refresh) {
        var _this = this;
        this.chatService.getChat(this.user_id, this.contactId).subscribe(function (res) {
            _this.scrollToBottom(0);
            // this.msgsList = this.msgsList.concat(res);
            _this.contactData = res.contactData;
            _this.msgsList = res.texts;
            event ? event.target.complete() : '';
            _this.global.closeLoading();
            // this.loadView = true;
        }, function (err) {
            event ? event.target.complete() : '';
            _this.global.checkErrorStatus(err);
        });
    };
    ChatPage.prototype.resendMsg = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertCtrl.create({
                            header: 'Confirm Resend',
                            message: 'Do you want to resend this message?',
                            buttons: [
                                {
                                    text: 'No',
                                    role: 'cancel',
                                    handler: function () {
                                    }
                                },
                                {
                                    text: 'Yes',
                                    handler: function () {
                                        var index = _this.msgsList.findIndex(function (e) { return e.id === id; });
                                        console.log('Index = ', index);
                                        _this.msgsList[index].status = 'pending';
                                        _this.chatService.resendMsg(id).subscribe(function (res) {
                                            _this.msgsList[index].status = 'success';
                                        }, function (err) {
                                            _this.msgsList[index].status = 'failed';
                                            _this.processError(err);
                                        });
                                    }
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
    ChatPage.prototype.openTemplates = function (evt) {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalCtrl.create({
                            component: text_templates_page_1.TextTemplatesPage,
                            componentProps: {
                                contact: this.contactData
                            },
                            backdropDismiss: true,
                            cssClass: 'modalClass'
                        })];
                    case 1:
                        modal = _a.sent();
                        modal.onDidDismiss().then(function (data) {
                            console.log('Modal is closed');
                            if (data) {
                                _this.textMsg = data.data;
                            }
                        });
                        return [4 /*yield*/, modal.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    __decorate([
        core_1.ViewChild(angular_1.IonContent)
    ], ChatPage.prototype, "content");
    ChatPage = __decorate([
        core_1.Component({
            selector: 'app-chat',
            templateUrl: './chat.page.html',
            styleUrls: ['./chat.page.scss']
        })
    ], ChatPage);
    return ChatPage;
}());
exports.ChatPage = ChatPage;

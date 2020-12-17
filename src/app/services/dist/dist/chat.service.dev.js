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
exports.ChatService = exports.UserInfo = exports.ChatMessage = void 0;

var core_1 = require("@angular/core");

var rxjs_1 = require("rxjs");

var operators_1 = require("rxjs/operators"); // import { Events } from 'ionic-angular';


var JWT_KEY = '#|TS9!T&v5%12?Iu(q|]O^K|<Pmxw#RK{) JXn*b,,}fIrnV,5u:)UIqMAql<fwV';

var ChatMessage =
/** @class */
function () {
  function ChatMessage() {}

  return ChatMessage;
}();

exports.ChatMessage = ChatMessage;

var UserInfo =
/** @class */
function () {
  function UserInfo() {}

  return UserInfo;
}();

exports.UserInfo = UserInfo;

var ChatService =
/** @class */
function () {
  function ChatService(http, storage, plt, global // private events: Events
  ) {
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

  ChatService.prototype.testTwilio = function () {
    return this.http.get(this.global.getApiUrl() + "/erp/v1/messaging/texts").pipe(operators_1.map(function (data) {
      return data;
    }));
  }; // mockNewMsg(msg, msgId, type = 'send') {
  // 	const mockMsg: ChatMessage = {
  // 		messageId: msgId,
  // 		userId: '210000198410281948',
  // 		userName: 'Hancock',
  // 		userAvatar: 'assets/img/user-comment-img-01.png',
  // 		toUserId: '140000198202211138',
  // 		time: Date.now(),
  // 		message: msg,
  // 		status: 'pending',
  // 		type: type
  // 	};
  // 	return mockMsg;
  // 	// setTimeout(() => {
  // 	// 	this.events.publish('chat:received', mockMsg, Date.now())
  // 	// }, Math.random() * 1800)
  // }
  // getMsgList(): Observable<ChatMessage[]> {
  // 	const msgListUrl = './assets/mock/msg-list.json';
  // 	return this.http.get<any>(msgListUrl)
  // 		.pipe(map(response => response.array));
  // }


  ChatService.prototype.sendMsg = function (msg) {
    // return new Promise(resolve => setTimeout(() => resolve(msg), Math.random() * 1000))
    // 	.then(() => this.mockNewMsg(msg));
    // return this.http.get<any[]>(`${this.global.getApiUrl()}/erp/v1/messaging/texts`).pipe(
    // 	map(data => {
    // 		return data;
    // 	})
    // );
    return this.http.post(this.global.getApiUrl() + "/erp/v1/messaging/texts", msg).pipe(operators_1.map(function (data) {
      return data;
    }));
  }; // getUserInfo(): Promise<UserInfo> {
  // 	const userInfo: UserInfo = {
  // 		id: '140000198202211138',
  // 		name: 'Luff',
  // 		avatar: './assets/user.jpg'
  // 	};
  // 	return new Promise(resolve => resolve(userInfo));
  // }


  ChatService.prototype.getChat = function (user_id, contact_id, per_page, page, search) {
    if (per_page === void 0) {
      per_page = 20;
    }

    if (page === void 0) {
      page = 1;
    }

    if (search === void 0) {
      search = '';
    }

    return this.http.get(this.global.getApiUrl() + "/erp/v1/messaging/texts?user_id=" + user_id + "&contact_id=" + contact_id + "&per_page=" + per_page + "&page=" + page + "&search=" + search).pipe(operators_1.map(function (data) {
      return data;
    }));
  };

  ChatService.prototype.resendMsg = function (id) {
    return this.http.post(this.global.getApiUrl() + "/erp/v1/messaging/texts/resend", {
      id: id
    }).pipe(operators_1.map(function (data) {
      return data;
    }));
  };

  ChatService.prototype.myTestFunc = function () {
    return this.http.get(this.global.getApiUrl() + "/erp/v1/messaging/chats").pipe(operators_1.map(function (data) {
      return data;
    }));
  };

  ChatService.prototype.saveToken = function () {
    console.log('in the chat service');
    return this.http.post(this.global.getApiUrl() + "/erp/v1/messaging/save_token", {
      token: this.global.getDeviceToken()
    }).pipe(operators_1.map(function (data) {
      return data;
    }));
  };

  ChatService = __decorate([core_1.Injectable({
    providedIn: 'root'
  })], ChatService);
  return ChatService;
}();

exports.ChatService = ChatService;
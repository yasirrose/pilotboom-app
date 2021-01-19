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
exports.ChatListingPage = void 0;

var core_1 = require("@angular/core");

var ChatListingPage =
/** @class */
function () {
  function ChatListingPage(restApi, global, router, chatApi) {
    this.restApi = restApi;
    this.global = global;
    this.router = router;
    this.chatApi = chatApi;
    this.contactListData = [];
    this.contactList = [];
    this.loadView = false;
    this.page = 1;
    this.per_page = 20;
    this.hasMore = true;
    this.search = false;
    this.searchTerm = '';
    this.searching = false;
  }

  ChatListingPage.prototype.ngOnInit = function () {};

  ChatListingPage.prototype.ionViewDidEnter = function () {
    this.global.showLoading("bubbles", "Loading...");
    this.getContacts();
  };

  ChatListingPage.prototype.getContacts = function (event, refresh) {
    var _this = this;

    this.restApi.getCrmContacts('', 'all', this.per_page, this.page).subscribe(function (res) {
      // console.log(res);
      // let all_length = res.length;
      // this.hasMore = res.length < this.per_page ? false : true;
      // if (!event || refresh) {
      // 	this.contactsData = [];
      // 	this.clearSearch();
      // }
      // this.contactList = this.contactList.concat(res);
      _this.contactList = res; // if (event && this.search && this.searchTerm) { //Pagination called and search exists already
      // 	var filtered = this.global.filterSearch(this.contactList, this.searchTerm, 'first_name', 'last_name');
      // 	this.setData(filtered);
      // } else {
      // 	this.setData(this.contactList);
      // }
      // event ? event.target.complete() : '';
      // this.loadView = true;

      _this.global.closeLoading(); // //Getting Trashed Contacts
      // this.api.getCrmContacts('contact', 'trash', this.per_page, this.page).subscribe(trashed => {
      // 	this.hasMore = all_length < this.per_page && trashed.length < this.per_page ? false : true;
      // 	event ? event.target.complete() : '';
      // 	this.trash = this.trash.concat(trashed);
      // 	this.global.closeLoading();
      // });

    }, function (err) {
      event ? event.target.complete() : '';

      _this.global.checkErrorStatus(err);
    });
  };

  ChatListingPage.prototype.getChat = function (event, id) {
    var navigationExtras = {
      queryParams: {
        contactId: id
      }
    };
    this.router.navigate(["/chat"], navigationExtras);
  };

  ChatListingPage.prototype.enableSearch = function (evt) {
    this.search = !this.search;

    if (!this.search) {
      this.searchTerm = '';
    }
  };

  ChatListingPage.prototype.filterItems = function (evt) {
    var _this = this;

    this.searching = true;
    var filtered = this.global.filterSearch(this.contactListData, this.searchTerm, 'name');
    setTimeout(function () {
      _this.contactList = filtered;
      _this.searching = false;
    }, 300);
  };

  ChatListingPage = __decorate([core_1.Component({
    selector: 'app-chat-listing',
    templateUrl: './chat-listing.page.html',
    styleUrls: ['./chat-listing.page.scss']
  })], ChatListingPage);
  return ChatListingPage;
}();

exports.ChatListingPage = ChatListingPage;
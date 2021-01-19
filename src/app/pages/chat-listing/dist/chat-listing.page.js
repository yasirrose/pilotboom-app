"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ChatListingPage = void 0;
var core_1 = require("@angular/core");
var angular_1 = require("@ionic/angular");
var ChatListingPage = /** @class */ (function () {
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
    ChatListingPage.prototype.ngOnInit = function () {
    };
    ChatListingPage.prototype.ionViewDidEnter = function () {
        this.resetData();
        this.global.showLoading("bubbles", "Loading...");
        this.getContacts();
    };
    ChatListingPage.prototype.getContacts = function (event, refresh) {
        var _this = this;
        this.restApi.getCrmContacts('', 'all', this.per_page, this.page).subscribe(function (res) {
            _this.hasMore = res.length < _this.per_page ? false : true;
            if (!event || refresh) {
                _this.contactListData = [];
                _this.clearSearch();
            }
            _this.contactListData = _this.contactListData.concat(res);
            if (event && _this.search && _this.searchTerm) { //Pagination called and search exists already
                _this.contactList = _this.global.filterSearch(_this.contactListData, _this.searchTerm, 'first_name', 'last_name');
            }
            else {
                _this.contactList = _this.contactListData;
            }
            event ? event.target.complete() : '';
            _this.loadView = true;
            _this.global.closeLoading();
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
    ChatListingPage.prototype.clearSearch = function () {
        this.search = false;
        this.searchTerm = '';
        this.searching = false;
    };
    ChatListingPage.prototype.filterItems = function (evt) {
        var _this = this;
        this.searching = true;
        var filtered = this.global.filterSearch(this.contactListData, this.searchTerm, 'first_name', 'last_name');
        setTimeout(function () {
            _this.contactList = filtered;
            _this.searching = false;
        }, 300);
    };
    ChatListingPage.prototype.doRefresh = function (event) {
        this.resetData();
        this.getContacts(event, true);
    };
    ChatListingPage.prototype.resetData = function () {
        this.hasMore = true;
        this.page = 1;
        this.per_page = 20;
        this.content.scrollToTop();
    };
    ChatListingPage.prototype.loadMore = function (event) {
        this.page++;
        this.getContacts(event);
    };
    __decorate([
        core_1.ViewChild(angular_1.IonContent)
    ], ChatListingPage.prototype, "content");
    ChatListingPage = __decorate([
        core_1.Component({
            selector: 'app-chat-listing',
            templateUrl: './chat-listing.page.html',
            styleUrls: ['./chat-listing.page.scss']
        })
    ], ChatListingPage);
    return ChatListingPage;
}());
exports.ChatListingPage = ChatListingPage;

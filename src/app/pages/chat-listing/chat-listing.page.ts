import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { ChatService } from 'src/app/services/chat.service';
import { GlobalService } from 'src/app/services/global.service';
import { RestService } from 'src/app/services/rest.service';

@Component({
	selector: 'app-chat-listing',
	templateUrl: './chat-listing.page.html',
	styleUrls: ['./chat-listing.page.scss'],
})
export class ChatListingPage implements OnInit {

	contactListData: any = [];
	contactList: any = [];

	loadView = false;
	page = 1;
	per_page = 20;
	hasMore = true;
	search = false;
	searchTerm = '';
	searching = false;
	@ViewChild(IonContent) content: IonContent;

	constructor(
		private restApi: RestService,
		private global: GlobalService,
		private router: Router,
		private chatApi: ChatService
	) { }

	ngOnInit() {
	}

	ionViewDidEnter() {
		this.resetData();
		this.global.showLoading("bubbles", "Loading...");
		this.getContacts();
	}

	getContacts(event?, refresh?) {
		this.restApi.getCrmContacts('', 'all', this.per_page, this.page).subscribe(
			res => {
				this.hasMore = res.length < this.per_page ? false : true;
				if (!event || refresh) {
					this.contactListData = [];
					this.clearSearch();
				}
				this.contactListData = this.contactListData.concat(res);

				if (event && this.search && this.searchTerm) { //Pagination called and search exists already
					this.contactList = this.global.filterSearch(this.contactListData, this.searchTerm, 'first_name', 'last_name');
				} else {
					this.contactList = this.contactListData;
				}

				event ? event.target.complete() : '';
				this.loadView = true;
				this.global.closeLoading();
			},
			err => {
				event ? event.target.complete() : '';
				this.global.checkErrorStatus(err);
			}
		);
	}

	getChat(event, id) {
		let navigationExtras: NavigationExtras = {
			queryParams: {
				contactId: id
			}
		}
		this.router.navigate(["/chat"], navigationExtras);
	}

	enableSearch(evt) {
		this.search = !this.search;
		if (!this.search) {
			this.searchTerm = '';
		}
	}

	clearSearch() {
		this.search = false;
		this.searchTerm = '';
		this.searching = false;
	}

	filterItems(evt) {
		this.searching = true;
		var filtered = this.global.filterSearch(this.contactListData, this.searchTerm, 'first_name', 'last_name');
		setTimeout(() => {
			this.contactList = filtered;
			this.searching = false;
		}, 300);
	}

	doRefresh(event) {
		this.resetData();
		this.getContacts(event, true);
	}

	resetData() {
		this.hasMore = true;
		this.page = 1;
		this.per_page = 20;
		this.content.scrollToTop();
	}

	loadMore(event) {
		this.page++;
		this.getContacts(event);
	}

}

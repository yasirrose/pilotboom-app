import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ChatService } from 'src/app/services/chat.service';
import { GlobalService } from 'src/app/services/global.service';
import { RestService } from 'src/app/services/rest.service';

@Component({
	selector: 'app-chat-listing',
	templateUrl: './chat-listing.page.html',
	styleUrls: ['./chat-listing.page.scss'],
})
export class ChatListingPage implements OnInit {

	contactList: any = [];

	loadView = false;
	page = 1;
	per_page = 20;
	hasMore = true;
	search = false;
	searchTerm = '';
	searching = false;

	constructor(
		private restApi: RestService,
		private global: GlobalService,
		private router: Router,
		private chatApi: ChatService
	) { }

	ngOnInit() {
	}

	ionViewDidEnter() {
		this.global.showLoading("bubbles", "Loading...");
		this.getContacts();
	}

	getContacts(event?, refresh?) {
		this.restApi.getCrmContacts('', 'all', this.per_page, this.page).subscribe(
			res => {
				// console.log(res);
				// let all_length = res.length;
				// this.hasMore = res.length < this.per_page ? false : true;
				// if (!event || refresh) {
				// 	this.contactsData = [];
				// 	this.clearSearch();
				// }
				// this.contactList = this.contactList.concat(res);
				this.contactList = res;

				// if (event && this.search && this.searchTerm) { //Pagination called and search exists already
				// 	var filtered = this.global.filterSearch(this.contactList, this.searchTerm, 'first_name', 'last_name');
				// 	this.setData(filtered);
				// } else {
				// 	this.setData(this.contactList);
				// }

				// event ? event.target.complete() : '';
				// this.loadView = true;
				this.global.closeLoading();

				// //Getting Trashed Contacts
				// this.api.getCrmContacts('contact', 'trash', this.per_page, this.page).subscribe(trashed => {
				// 	this.hasMore = all_length < this.per_page && trashed.length < this.per_page ? false : true;
				// 	event ? event.target.complete() : '';
				// 	this.trash = this.trash.concat(trashed);
				// 	this.global.closeLoading();
				// });
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

	// testFunc() {
	// 	this.chatApi.myTestFunc().subscribe(
	// 		res => {
	// 			console.log('Success Response', res);
	// 		},
	// 		err => {
	// 			console.log('Error Response', err);
	// 		}
	// 	)
	// }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AlertController, ToastController, NavController, NavParams, IonContent } from '@ionic/angular';
import { GlobalService } from 'src/app/services/global.service';
import { RestService } from 'src/app/services/rest.service';

@Component({
	selector: 'app-contacts',
	templateUrl: './contacts.page.html',
	styleUrls: ['./contacts.page.scss'],
	providers: [NavParams]
})
export class ContactsPage implements OnInit {
	categories = 'All';
	contactsData = [];
	all = [];
	customer = [];
	lead = [];
	opportunity = [];
	subscriber = [];
	// trash = [];

	loadView = false;
	page = 1;
	per_page = 10;
	hasMore = true;
	search = false;
	searchTerm = '';
	searching = false;
	@ViewChild(IonContent) content: IonContent;

	constructor(
		private api: RestService,
		private global: GlobalService,
		private router: Router,
		private alertCtrl: AlertController,
		private toastCtrl: ToastController,
		private navCtrl: NavController,
		private navParam: NavParams,
	) {
	}

	ngOnInit() {
	}

	ionViewDidEnter() {
		this.resetData();
		this.global.showLoading("bubbles", "Loading...");
		this.getContacts();
	}

	resetData() {
		this.hasMore = true;
		this.page = 1;
		this.per_page = 10;
		this.content.scrollToTop();
	}

	clearSearch() {
		this.search = false;
		this.searchTerm = '';
		this.searching = false;
	}

	getContacts(event?, refresh?) {
		this.api.getCrmContacts('contact', 'all', this.per_page, this.page).subscribe(
			res => {
				// let all_length = res.length;
				this.hasMore = res.length < this.per_page ? false : true;
				if (!event || refresh) {
					this.contactsData = [];
					this.clearSearch();
				}
				this.contactsData = this.contactsData.concat(res);

				if (event && this.search && this.searchTerm) { //Pagination called and search exists already
					var filtered = this.global.filterSearch(this.contactsData, this.searchTerm, 'first_name', 'last_name');
					this.setData(filtered);
				} else {
					this.setData(this.contactsData);
				}

				event ? event.target.complete() : '';
				this.loadView = true;
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

	setData(contactData) {
		this.all = []; this.customer = []; this.lead = []; this.opportunity = []; this.subscriber = [];
		this.all = contactData;
		for (let i = 0; i < contactData.length; i++) {
			const elem = contactData[i];
			this[elem.life_stage].push(elem);
		}
	}

	getDetail(event, id) {
		let navigationExtras: NavigationExtras = {
			queryParams: {
				contactId: id
			}
		}
		this.router.navigate(["/contact-details"], navigationExtras);
	}

	editContact(event, id) {
		let navigationExtras: NavigationExtras = {
			queryParams: {
				contactId: id
			}
		}
		this.router.navigate(["/edit-contact"], navigationExtras);
	}

	async delete(event, id) {
		let alert = await this.alertCtrl.create({
			header: 'Confirm Delete',
			message: 'Do you really want to delete this contact?',
			buttons: [
				{
					text: 'Cancel',
					role: 'cancel',
					handler: () => {
					}
				},
				{
					text: 'Delete',
					handler: () => {
						this.global.showLoading("bubbles", "Please wait...");
						this.api.deleteContact(id).subscribe(
							res => {
								this.contactsData = this.global.filterObjectByValue(this.contactsData, 'id', id, 'remove');
								this.setData(this.contactsData);
								// this.trash.unshift(res); //Pushing the object at start of array.
								this.global.closeLoading();
							},
							err => {
								this.global.checkErrorStatus(err);
							}
						);
					}
				}
			]
		});
		await alert.present();
	}

	async permanentDelete(event, id) {
		let alert = await this.alertCtrl.create({
			header: 'Confirm Delete',
			message: 'Do you really want to delete this contact permanently?',
			buttons: [
				{
					text: 'Cancel',
					role: 'cancel',
					handler: () => {
					}
				},
				{
					text: 'Delete',
					handler: () => {
					}
				}
			]
		});
		await alert.present();
	}

	loadMore(event) {
		this.page++;
		this.getContacts(event);
	}

	doRefresh(event) {
		this.resetData();
		this.getContacts(event, true);
	}

	enableSearch(evt) {
		this.search = !this.search;
		if (!this.search) {
			this.searchTerm = '';
		}
	}

	filterItems(evt) {
		this.searching = true;
		var filtered = this.global.filterSearch(this.contactsData, this.searchTerm, 'first_name', 'last_name');
		setTimeout(() => {
			this.setData(filtered);
			this.searching = false;
		}, 500);
	}
}
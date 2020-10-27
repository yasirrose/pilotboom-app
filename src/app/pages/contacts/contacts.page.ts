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
	contacts = [];
	customer = [];
	lead = [];
	opportunity = [];
	subscriber = [];
	trash = [];

	loadView = false;
	page = 1;
	per_page = 10;
	hasMore = true;
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

	resetContactsData() {
		this.contacts = []; this.customer = []; this.lead = []; this.opportunity = []; this.subscriber = []; this.trash = [];
	}

	getContacts(event?, refresh?) {
		this.api.getCrmContacts('contact', 'all', this.per_page, this.page).subscribe(
			res => {
				let all_length = res.length;
				if (!event || refresh) {
					this.resetContactsData();
				}
				this.contacts = this.contacts.concat(res);
				this.setCategoriesData(res);
				this.loadView = true;
				//Getting Trashed Contacts
				this.api.getCrmContacts('contact', 'trash', this.per_page, this.page).subscribe(trashed => {
					this.hasMore = all_length < this.per_page && trashed.length < this.per_page ? false : true;
					event ? event.target.complete() : '';
					this.trash = this.trash.concat(trashed);
					this.global.closeLoading();
				});
			},
			err => {
				event ? event.target.complete() : '';
				this.global.checkErrorStatus(err);
			}
		);
	}

	setCategoriesData(result) {
		for (let i = 0; i < result.length; i++) {
			const elem = result[i];
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
								this.contacts = this.global.filterObjectByValue(this.contacts, 'id', id, 'remove');
								this.customer = []; this.lead = []; this.opportunity = []; this.subscriber = [];
								this.setCategoriesData(this.contacts);
								this.trash.unshift(res);
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
}

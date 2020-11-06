import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AlertController, ToastController, NavController, NavParams, IonContent } from '@ionic/angular';
import { GlobalService } from 'src/app/services/global.service';
import { RestService } from 'src/app/services/rest.service';

@Component({
	selector: 'app-contact-groups',
	templateUrl: './contact-groups.page.html',
	styleUrls: ['./contact-groups.page.scss'],
	providers: [NavParams]
})
export class ContactGroupsPage implements OnInit {
	loadView = false;
	contactGroupsData = [];
	contactGroups = [];
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
		private navParam: NavParams
	) {
	}

	ngOnInit() {
	}

	ionViewDidEnter() {
		this.resetData();
		this.global.showLoading("bubbles", "Loading...");
		this.getContactGroups();
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

	getContactGroups(event?, refresh?) {
		this.api.getCrmContactGroups(this.page, this.per_page).subscribe(
			res => {
				this.hasMore = res.length < this.per_page ? false : true;
				if (!event || refresh) {
					this.contactGroupsData = [];
					this.clearSearch();
				}
				this.contactGroupsData = this.contactGroupsData.concat(res);

				if (event && this.search && this.searchTerm) { //Pagination called and search exists already
					this.contactGroups = this.global.filterSearch(this.contactGroupsData, this.searchTerm, 'name');
				} else {
					this.contactGroups = this.contactGroupsData;
				}

				event ? event.target.complete() : '';
				this.global.closeLoading();
				this.loadView = true;
			},
			err => {
				event ? event.target.complete() : '';
				this.global.checkErrorStatus(err);
			}
		);
	}

	getSubscribers(event, id) {
		let navigationExtras: NavigationExtras = {
			queryParams: {
				contactGrpId: id
			}
		}
		this.router.navigate(["/contact-group-subs"], navigationExtras);
	}

	editContactGroup(event, id) {
		let navigationExtras: NavigationExtras = {
			queryParams: {
				contactGrpId: id
			}
		}
		this.router.navigate(["/edit-contact-group"], navigationExtras);
	}

	async delete(event, id) {
		let alert = await this.alertCtrl.create({
			header: 'Confirm Delete',
			message: 'Do you really want to delete this contact group?',
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
						this.api.deleteContactGroup(id).subscribe(
							res => {
								this.contactGroupsData = this.global.filterObjectByValue(this.contactGroupsData, 'id', id, 'remove');
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
						// this.api.deleteContact(id).subscribe(res => {
						// 	this.getContacts();
						// });
					}
				}
			]
		});
		await alert.present();
	}

	loadMore(event) {
		this.page++;
		this.getContactGroups(event);
	}

	doRefresh(event) {
		this.resetData();
		this.getContactGroups(event, true);
	}

	enableSearch(evt) {
		this.search = !this.search;
		if (!this.search) {
			this.searchTerm = '';
		}
	}

	filterItems(evt) {
		this.searching = true;
		var filtered = this.global.filterSearch(this.contactGroupsData, this.searchTerm, 'name');
		setTimeout(() => {
			this.contactGroups = filtered;
			this.searching = false;
		}, 500);
	}
}

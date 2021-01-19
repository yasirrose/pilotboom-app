import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AlertController, ToastController, NavController, NavParams, IonContent } from '@ionic/angular';
import { GlobalService } from 'src/app/services/global.service';
import { RestService } from 'src/app/services/rest.service';

@Component({
	selector: 'app-companies',
	templateUrl: './companies.page.html',
	styleUrls: ['./companies.page.scss'],
	providers: [NavParams]
})
export class CompaniesPage implements OnInit {
	categories = 'All';
	companiesData = [];
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
		this.api.getCrmContacts('company', 'all', this.per_page, this.page).subscribe(
			res => {
				// let all_length = res.length;
				this.hasMore = res.length < this.per_page ? false : true;
				if (!event || refresh) {
					this.companiesData = [];
					this.clearSearch();
				}
				this.companiesData = this.companiesData.concat(res);

				if (event && this.search && this.searchTerm) { //Pagination called and search exists already
					var filtered = this.global.filterSearch(this.companiesData, this.searchTerm, 'first_name');
					this.setData(filtered);
				} else {
					this.setData(this.companiesData);
				}

				event ? event.target.complete() : '';
				this.loadView = true;
				this.global.closeLoading();

				// //Getting Trashed Contacts
				// this.api.getCrmContacts('company', 'trash', this.per_page, this.page).subscribe(trashed => {
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
		this.router.navigate(["/company-details"], navigationExtras);
	}

	editContact(event, id) {
		let navigationExtras: NavigationExtras = {
			queryParams: {
				contactId: id
			}
		}
		this.router.navigate(["/edit-company"], navigationExtras);
	}

	async delete(event, id) {
		let alert = await this.alertCtrl.create({
			header: 'Confirm Delete',
			message: 'Do you really want to delete this company?',
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
						this.api.deleteCompany(id).subscribe(
							res => {
								this.companiesData = this.global.filterObjectByValue(this.companiesData, 'id', id, 'remove');
								this.setData(this.companiesData);
								// this.trash.unshift(res);
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
		var filtered = this.global.filterSearch(this.companiesData, this.searchTerm, 'first_name');
		setTimeout(() => {
			this.setData(filtered);
			this.searching = false;
		}, 300);
	}
}
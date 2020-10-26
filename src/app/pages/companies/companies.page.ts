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
	companies = [];
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
		this.companies = []; this.customer = []; this.lead = []; this.opportunity = []; this.subscriber = []; this.trash = [];
	}

	getContacts(event?, refresh?) {
		this.api.getCrmContacts('company', 'all', this.per_page, this.page).subscribe(
			res => {
				let all_length = res.length;
				if (!event || refresh) {
					this.resetContactsData();
				}
				this.companies = this.companies.concat(res);
				this.setCategoriesData(res);
				this.loadView = true;
				//Getting Trashed Contacts
				this.api.getCrmContacts('company', 'trash', this.per_page, this.page).subscribe(trashed => {
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
								this.companies = this.global.filterObjectByValue(this.companies, 'id', id, 'remove');
								this.customer = []; this.lead = []; this.opportunity = []; this.subscriber = [];
								this.setCategoriesData(this.companies);
								this.trash.unshift(res); //Pushing the object at start of array.
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

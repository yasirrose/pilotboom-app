import { Component, OnInit } from '@angular/core';
import { RestService } from '../services/rest.service';
import { Router, NavigationExtras } from '@angular/router';
import { AlertController, ToastController, NavController, NavParams } from '@ionic/angular';
import { GlobalService } from 'src/app/services/global.service';

@Component({
	selector: 'app-companies',
	templateUrl: './companies.page.html',
	styleUrls: ['./companies.page.scss'],
	providers: [NavParams]
})
export class CompaniesPage implements OnInit {
	user = this.api.getCurrentUser();
	categories = 'All';
	companies = [];
	customer = [];
	lead = [];
	opportunity = [];
	subscriber = [];
	trash = [];
	constructor(
		private api: RestService,
		private global: GlobalService,
		private router: Router,
		private alertCtrl: AlertController,
		private toastCtrl: ToastController,
		private navCtrl: NavController,
		private navParam: NavParams,
	) {
		this.user.subscribe(user => {
			if (!user) {
				this.companies = [];
				this.router.navigate(["/login"]);
			}
		});
	}

	ngOnInit() {
	}

	ionViewDidEnter() {
		this.global.showLoading("bubbles", "Loading...");
		this.getContacts();
	}

	getContacts() {
		this.api.getCrmContacts('company').subscribe(res => {
			this.companies = []; this.customer = []; this.lead = []; this.opportunity = []; this.subscriber = [];
			this.companies = res;
			for (let i = 0; i < res.length; i++) {
				const elem = res[i];
				this[elem.life_stage].push(elem);
			}
		});

		this.api.getCrmContacts('company', 'trash').subscribe(trashed => {
			this.trash = [];
			this.trash = trashed;
			this.global.closeLoading();
		});
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
						this.api.deleteCompany(id).subscribe(res => {
							this.getContacts();
						});
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

}

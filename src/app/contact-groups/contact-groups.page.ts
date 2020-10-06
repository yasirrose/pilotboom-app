import { Component, OnInit } from '@angular/core';
import { RestService } from '../services/rest.service';
import { Router, NavigationExtras } from '@angular/router';
import { AlertController, ToastController, NavController, NavParams } from '@ionic/angular';
import { GlobalService } from 'src/app/services/global.service';

@Component({
	selector: 'app-contact-groups',
	templateUrl: './contact-groups.page.html',
	styleUrls: ['./contact-groups.page.scss'],
	providers: [NavParams]
})
export class ContactGroupsPage implements OnInit {
	user = this.api.getCurrentUser();
	contactGroups = [];

	constructor(
		private api: RestService,
		private global: GlobalService,
		private router: Router,
		private alertCtrl: AlertController,
		private toastCtrl: ToastController,
		private navCtrl: NavController,
		private navParam: NavParams
	) {
		this.user.subscribe(user => {
			if (!user) {
				this.router.navigate(["/login"]);
			}
		});
	}

	ngOnInit() {
	}

	ionViewDidEnter() {
		this.global.showLoading("bubbles", "Loading...");
		this.getContactGroups();
	}

	getContactGroups() {
		this.api.getCrmContactGroups().subscribe(res => {
			this.contactGroups = [];
			this.contactGroups = res;
			this.global.closeLoading();
		});
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
						this.api.deleteContactGroup(id).subscribe(res => {
							this.getContactGroups();
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

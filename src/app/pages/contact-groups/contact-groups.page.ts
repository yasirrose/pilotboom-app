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
	contactGroups = [];
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

	getContactGroups(event?, refresh?) {
		this.api.getCrmContactGroups(this.page, this.per_page).subscribe(
			res => {
				this.hasMore = res.length < this.per_page ? false : true;
				if (event) {
					this.contactGroups = refresh ? [] : this.contactGroups;
					event.target.complete();
				} else {
					this.contactGroups = [];
				}
				this.contactGroups = this.contactGroups.concat(res);
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
								this.contactGroups = this.global.filterObjectByValue(this.contactGroups, 'id', id, 'remove');
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
}

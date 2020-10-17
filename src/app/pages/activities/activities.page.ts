import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AlertController, ToastController, NavController, NavParams, IonContent } from '@ionic/angular';
import { GlobalService } from 'src/app/services/global.service';
import { RestService } from 'src/app/services/rest.service';

@Component({
	selector: 'app-activities',
	templateUrl: './activities.page.html',
	styleUrls: ['./activities.page.scss'],
	providers: [NavParams]
})
export class ActivitiesPage implements OnInit {
	user = this.api.getCurrentUser();
	activities = [];

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
		this.resetData();
		this.global.showLoading("bubbles", "Loading...");
		this.getActivities();
	}

	resetData() {
		this.hasMore = true;
		this.page = 1;
		this.per_page = 10;
		this.content.scrollToTop();
	}

	getActivities(event?) {
		this.api.getActivities('', this.per_page, this.page).subscribe(res => {
			if (res.length < this.per_page) {
				this.hasMore = false
			}
			if (event) {
				event.target.complete();
			} else {
				this.activities = [];
			}
			this.activities = this.activities.concat(res);
			this.global.closeLoading();
			this.loadView = true;
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
							this.getActivities();
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

	loadMore(event) {
		this.page++;
		this.getActivities(event);
	}
}

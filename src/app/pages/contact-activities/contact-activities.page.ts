import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { AlertController, IonContent, ToastController } from '@ionic/angular';
import { GlobalService } from 'src/app/services/global.service';
import { RestService } from 'src/app/services/rest.service';

@Component({
	selector: 'app-contact-activities',
	templateUrl: './contact-activities.page.html',
	styleUrls: ['./contact-activities.page.scss'],
})
export class ContactActivitiesPage implements OnInit {
	contactActivities = [];
	contactData: any;
	openActSection = false;
	loadView = false;
	page = 1;
	per_page = 10;
	hasMore = true;
	@ViewChild(IonContent) content: IonContent;

	constructor(
		private api: RestService,
		private global: GlobalService,
		private router: Router,
		private route: ActivatedRoute,
		private alertCtrl: AlertController,
		private toastCtrl: ToastController,
	) {
		this.route.queryParams.subscribe(params => {
			this.global.showLoading("bubbles", "Loading...");
			if (params && params.id) {
				this.contactData = params;
				this.getContactActivities();
			}
		});
	}

	ngOnInit() {
		this.resetData();
	}

	getContactActivities(event?) {
		this.api.getActivities(this.contactData.id, this.per_page, this.page).subscribe(
			res => {
				if (res.length < this.per_page) {
					this.hasMore = false
				}
				if (event) {
					event.target.complete();
				} else {
					this.contactActivities = [];
				}
				this.contactActivities = this.contactActivities.concat(res);
				this.global.closeLoading();
				this.loadView = true;
			},
			err => {
				this.global.checkErrorStatus(err);
			}
		);
	}

	resetData() {
		this.hasMore = true;
		this.page = 1;
		this.per_page = 10;
		// this.content.scrollToTop();
	}

	addActivityPage() {
		let navigationExtras: NavigationExtras = {
			queryParams: {
				conatctId: this.contactData.id
			}
		}
		this.router.navigate(["/add-activity"], navigationExtras);
	}

	editActivity(event, id) {
		let navigationExtras: NavigationExtras = {
			queryParams: {
				conatctId: this.contactData.id,
				activityId: id
			}
		}
		this.router.navigate(["/edit-activity"], navigationExtras);
	}

	async deleteActivity(event, id) {
		let alert = await this.alertCtrl.create({
			header: 'Confirm Delete',
			message: 'Do you really want to delete this activity?',
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
						this.api.deleteActivity(id).subscribe(
							res => {
								this.getContactActivities();
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

	doRefresh(event) {
		// console.log('Begin async operation');
		setTimeout(() => {
			this.getContactActivities();
			// console.log('Async operation has ended');
			event.target.complete();
		}, 2000);
	}

	loadMore(event) {
		this.page++;
		this.getContactActivities(event);
	}
}
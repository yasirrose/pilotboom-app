import { Component, OnInit } from '@angular/core';
import { RestService } from '../services/rest.service';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { GlobalService } from 'src/app/services/global.service';

@Component({
	selector: 'app-contact-activities',
	templateUrl: './contact-activities.page.html',
	styleUrls: ['./contact-activities.page.scss'],
})
export class ContactActivitiesPage implements OnInit {
	user = this.api.getCurrentUser();
	contactActivities = [];
	contactData: any;
	openActSection = false;
	constructor(
		private api: RestService,
		private global: GlobalService,
		private router: Router,
		private route: ActivatedRoute,
		private alertCtrl: AlertController,
		private toastCtrl: ToastController,

	) {
		this.user.subscribe(user => {
			if (user) {
				this.route.queryParams.subscribe(params => {
					this.global.showLoading("bubbles", "Loading...");
					if (params && params.id) {
						this.contactData = params;
						this.getContactActivities();
					}
				})
			} else {
				this.contactData = [];
				this.router.navigate(["/login"]);
			}
		});
	}

	ngOnInit() {
	}

	getContactActivities() {
		this.api.getActivities(this.contactData.id).subscribe(res => {
			this.contactActivities = res;
			this.global.closeLoading();
		});
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
						// console.log('cancelled');
					}
				},
				{
					text: 'Delete',
					handler: () => {
						this.global.showLoading("bubbles", "Please wait...");
						this.api.deleteActivity(id).subscribe(res => {
							this.getContactActivities();
						});
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
}
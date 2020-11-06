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
	activitiesData = [];
	activities = [];
	contactData: any;
	openActSection = false;
	loadView = false;
	page = 1;
	per_page = 10;
	hasMore = true;
	filterType = '';
	searching = false;
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

	resetData() {
		this.hasMore = true;
		this.page = 1;
		this.per_page = 10;
		// this.content.scrollToTop();
	}

	getContactActivities(event?, refresh?) {
		this.api.getActivities(this.contactData.id, this.per_page, this.page).subscribe(
			res => {
				this.hasMore = res.length < this.per_page ? false : true;
				if (!event || refresh) {
					this.activitiesData = [];
					this.filterType = '';
				}
				this.activitiesData = this.activitiesData.concat(res);

				if (event && this.filterType) { //Pagination called and search exists already
					this.activities = this.global.filterSearch(this.activitiesData, this.filterType, 'type');
				} else {
					this.activities = this.activitiesData;
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

	loadMore(event) {
		this.page++;
		this.getContactActivities(event);
	}

	doRefresh(event) {
		this.resetData();
		this.getContactActivities(event, true);
	}

	filterItems(evt) {
		this.searching = true;
		// this.filterType = this.filterType == 'all' ? '' : this.filterType;
		var filtered = this.global.filterSearch(this.activitiesData, this.filterType, 'type');
		setTimeout(() => {
			this.activities = filtered;
			this.searching = false;
		}, 500);
	}
}
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
	activitiesData = [];
	activities = [];
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
		this.getActivities();
	}

	resetData() {
		this.hasMore = true;
		this.page = 1;
		this.per_page = 10;
		this.content.scrollToTop();
	}

	getActivities(event?, refresh?) {
		this.api.getActivities('', this.per_page, this.page).subscribe(
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
								this.getActivities();
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
		this.getActivities(event);
	}

	doRefresh(event) {
		this.resetData();
		this.getActivities(event, true);
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
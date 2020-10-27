import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { AlertController, ToastController, NavController, NavParams, ModalController, IonContent } from '@ionic/angular';
import { GlobalService } from 'src/app/services/global.service';
import { RestService } from 'src/app/services/rest.service';

@Component({
	selector: 'app-contact-group-subs',
	templateUrl: './contact-group-subs.page.html',
	styleUrls: ['./contact-group-subs.page.scss'],
})
export class ContactGroupSubsPage implements OnInit {
	subsContactData = [];
	group_id: any;

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
		private modalCtrl: ModalController,
	) {
		this.route.queryParams.subscribe(params => {
			if (params && params.contactGrpId) {
				this.group_id = params.contactGrpId;
			}
		});
	}

	ngOnInit() {
	}

	ionViewDidEnter() {
		this.resetData();
		this.global.showLoading("bubbles", "Loading...");
		this.getSubsContacts();
	}

	resetData() {
		this.hasMore = true;
		this.page = 1;
		this.per_page = 10;
		this.content.scrollToTop();
	}

	getSubsContacts(event?, refresh?) {
		this.api.getContactGrpSubs(this.group_id,this.page, this.per_page).subscribe(
			res => {
				this.hasMore = res.length < this.per_page ? false : true;
				if (event) {
					this.subsContactData = refresh ? [] : this.subsContactData;
					event.target.complete();
				} else {
					this.subsContactData = [];
				}
				this.subsContactData = this.subsContactData.concat(res);
				this.global.closeLoading();
				this.loadView = true;
			},
			err => {
				event ? event.target.complete() : '';
				this.global.checkErrorStatus(err);
			}
		);
	}

	async unsubscribe(event, contact_id) {
		let alert = await this.alertCtrl.create({
			header: 'Confirm Unsubscribe',
			message: 'Do you really want to unsubscribe this contact?',
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
						this.api.unsubContact(this.group_id, contact_id).subscribe(
							res => {
								this.subsContactData = this.global.filterObjectByValue(this.subsContactData, 'user_id', contact_id, 'remove');
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

	async subscribeContacts() {
		let navigationExtras: NavigationExtras = {
			queryParams: {
				contactGrpId: this.group_id
			}
		}
		this.router.navigate(["/subscribe"], navigationExtras);
	}

	loadMore(event) {
		this.page++;
		this.getSubsContacts(event);
	}

	doRefresh(event) {
		this.resetData();
		this.getSubsContacts(event, true);
	}
}
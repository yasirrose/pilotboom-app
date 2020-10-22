import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { AlertController, ToastController, NavController, NavParams, ModalController } from '@ionic/angular';
import { SubscribePage } from 'src/app/modal/subscribe/subscribe.page';
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
		this.global.showLoading("bubbles", "Loading...");
		this.getSubsContacts();
	}

	getSubsContacts() {
		this.api.getContactGrpSubs(this.group_id).subscribe(
			res => {
				this.subsContactData = res;
				this.global.closeLoading();
			},
			err => {
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
								this.getSubsContacts();
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

	async presentModal() {
		let profileModal = await this.modalCtrl.create({
			component: SubscribePage,
			componentProps: {
				contactGrpId: this.group_id,
			}
		});

		profileModal.onDidDismiss().then(() => {
			this.global.showLoading("bubbles", "Loading...");
			this.getSubsContacts();

		});
		return await profileModal.present();
	}
}
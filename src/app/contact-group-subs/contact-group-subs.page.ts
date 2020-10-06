import { Component, OnInit } from '@angular/core';
import { RestService } from '../services/rest.service';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { AlertController, ToastController, NavController, NavParams, ModalController } from '@ionic/angular';
import { GlobalService } from 'src/app/services/global.service';
import { SubscribePage } from '../modal/subscribe/subscribe.page';

@Component({
	selector: 'app-contact-group-subs',
	templateUrl: './contact-group-subs.page.html',
	styleUrls: ['./contact-group-subs.page.scss'],
})
export class ContactGroupSubsPage implements OnInit {

	user = this.api.getCurrentUser();
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
		this.user.subscribe(user => {
			if (user) {
				this.route.queryParams.subscribe(params => {
					if (params && params.contactGrpId) {
						this.group_id = params.contactGrpId;
					}
				})
			} else {
				this.subsContactData = [];
				this.router.navigate(["/login"]);
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
		this.api.getContactGrpSubs(this.group_id).subscribe(res => {
			this.subsContactData = res;
			this.global.closeLoading();
		});
	}

	async unsubscribe(event, contact_id) {
		let alert = await this.alertCtrl.create({
			header: 'Confirm Delete',
			message: 'Do you really want to delete?',
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
						this.api.unsubContact(this.group_id, contact_id).subscribe(res => {
							this.getSubsContacts();
						});
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
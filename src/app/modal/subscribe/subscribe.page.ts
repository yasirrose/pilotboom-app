import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController, ToastController, NavController, ModalController, NavParams } from '@ionic/angular';
import { Router } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';
import { RestService } from 'src/app/services/rest.service';

@Component({
	selector: "app-subscribe",
	templateUrl: "./subscribe.page.html",
	styleUrls: ["./subscribe.page.scss"],
	providers: [FormBuilder],
})

export class SubscribePage implements OnInit {
	modalTitle: string;
	groupId: number;
	allContacts: any;
	contact_ids: [];
	subscribeForm: FormGroup

	constructor(
		private api: RestService,
		private fb: FormBuilder,
		private alertCtrl: AlertController,
		private toastCtrl: ToastController,
		private router: Router,
		private navCtrl: NavController,
		private global: GlobalService,
		private modalCtrl: ModalController,
		private navParams: NavParams,
	) { }

	ngOnInit() {
		this.subscribeForm = this.fb.group({
			contact_ids: '',
		});
		this.groupId = this.navParams.data.contactGrpId;
		this.getAllContacts();
		// this.modalTitle = this.navParams.data.paramTitle;
	}

	closeModal() {
		this.global.closeLoading();
		this.modalCtrl.dismiss();
	}

	getAllContacts() {
		this.global.showLoading("bubbles", "Loading...");
		this.api.getCrmContacts('all').subscribe(res => {
			this.allContacts = res;
			this.global.closeLoading();
		});
	}

	subscribeContact() {
		this.global.showLoading("bubbles", "Please wait...");
		this.api.subscribeContact(this.groupId, this.subscribeForm.value.contact_ids.toString()).subscribe(
			res => {
				this.global.closeLoading();
				this.closeModal();
			},
			err => {
				this.global.closeLoading();
				this.showError(err);
			}
		);
	}

	async showError(err) {
		const alert = await this.alertCtrl.create({
			header: err.error.code,
			subHeader: err.error.data.status,
			message: err.error.message,
			buttons: ['OK']
		});
		await alert.present();
	}

}
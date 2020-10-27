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
	validation_messages = this.global.getValidationMessages();

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
			contact_ids: [[], Validators.required],
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
		this.api.getCrmContacts('all').subscribe(
			res => {
				this.allContacts = res;
				this.global.closeLoading();
			},
			err => {
				this.global.checkErrorStatus(err);
			}
		);
	}

	subscribeContact() {
		this.global.showLoading("bubbles", "Please wait...");
		this.api.subscribeContact(this.groupId, this.subscribeForm.value.contact_ids.toString()).subscribe(
			res => {
				this.global.closeLoading();
				this.closeModal();
			},
			err => {
				this.global.checkErrorStatus(err);
			}
		);
	}
}
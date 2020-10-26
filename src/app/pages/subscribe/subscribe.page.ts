import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController, ToastController, NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
	selector: 'app-subscribe',
	templateUrl: './subscribe.page.html',
	styleUrls: ['./subscribe.page.scss']
})
export class SubscribePage implements OnInit {
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
		private route: ActivatedRoute,
		private navCtrl: NavController,
		private global: GlobalService,
	) {
		this.route.queryParams.subscribe(params => {
			if (params && params.contactGrpId) {
				this.groupId = params.contactGrpId;
				this.getAllContacts();
			}
		});
	}

	ngOnInit() {
		this.subscribeForm = this.fb.group({
			contact_ids: [[], Validators.required],
		});
		// this.modalTitle = this.navParams.data.paramTitle;
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
				this.router.navigate(["/contact-group-subs"]);
			},
			err => {
				this.global.checkErrorStatus(err);
			}
		);
	}
}
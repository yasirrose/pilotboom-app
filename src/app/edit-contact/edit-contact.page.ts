import { Component, OnInit } from '@angular/core';
import { RestService } from '../services/rest.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController, ToastController, NavController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';

@Component({
	selector: 'app-edit-contact',
	templateUrl: './edit-contact.page.html',
	styleUrls: ['./edit-contact.page.scss'],
})
export class EditContactPage implements OnInit {
	editContactForm: FormGroup;

	user = this.api.getCurrentUser();
	id: any;
	allUsers = [];
	toggleAdvance = false;
	constructor(
		private api: RestService,
		private global: GlobalService,
		private fb: FormBuilder,
		private alertCtrl: AlertController,
		private toastCtrl: ToastController,
		private router: Router,
		private route: ActivatedRoute,
		private navCtrl: NavController
	) {
		this.user.subscribe(user => {
			if (user) {
				this.route.queryParams.subscribe(params => {
					this.global.showLoading("bubbles", "Please wait...");
					if (params && params.contactId) {
						this.id = params.contactId;
						this.getContactDetail();
						this.getAllUsers();
					}
				})
			} else {
				this.router.navigate(["/login"]);
			}
		});
	}

	ngOnInit() {
		this.editContactForm = this.fb.group({
			type: "contact",
			first_name: ['', Validators.required],
			last_name: ['', Validators.required],
			email: '',
			phone: ['', Validators.required],
			life_stage: ['', Validators.required],
			owner: ['', Validators.required],
			company: '',
			mobile: '',
			other: '',
			website: '',
			fax: '',
			notes: '',
			street_1: '',
			street_2: '',
			city: '',
			state: '',
			postal_code: '',
			country: '',
			currency: '',
			user_id: ''
		});
	}

	getContactDetail() {
		this.api.getContactDetail(this.id).subscribe(res => {
			this.editContactForm = this.fb.group(res);
		});
	}

	getAllUsers() {
		this.api.getUsers().subscribe(res => {
			this.allUsers = res;
			this.global.closeLoading();
		});
	}


	updateContact() {
		this.global.showLoading("bubbles", "Please wait...");
		this.api.updateContact(this.editContactForm.value, this.id).subscribe(
			res => {
				this.global.closeLoading();
				this.router.navigate(["/contacts"]);
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

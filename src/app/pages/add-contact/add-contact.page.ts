import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController, ToastController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
	selector: 'app-add-contact',
	templateUrl: './add-contact.page.html',
	styleUrls: ['./add-contact.page.scss'],
})
export class AddContactPage implements OnInit {
	addContactForm: FormGroup;
	toggleAdvance = false;
	allUsers = [];
	validation_messages = this.global.getValidationMessages();

	constructor(
		private api: RestService,
		private fb: FormBuilder,
		private alertCtrl: AlertController,
		private toastCtrl: ToastController,
		private router: Router,
		private navCtrl: NavController,
		private global: GlobalService
	) {
		this.global.showLoading("bubbles", "Please wait...");
		this.getAllUsers();
	}

	ngOnInit() {
		this.addContactForm = this.fb.group({
			type: "contact",
			first_name: ['', Validators.required],
			last_name: '',
			email: [
				'',
				Validators.compose([
					Validators.required,
					Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
				])
			],
			phone: '',
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
		});
	}

	getAllUsers() {
		this.api.getUsers().subscribe(
			res => {
				this.allUsers = res;
				this.global.closeLoading();
			},
			err => {
				this.global.checkErrorStatus(err);
			}
		);
	}

	addContact() {
		this.global.showLoading("bubbles", "Please wait...");
		this.api.addNewContact(this.addContactForm.value).subscribe(
			res => {
				this.global.closeLoading();
				this.router.navigate(["/contacts"]);
			},
			err => {
				this.global.checkErrorStatus(err);
			}
		);
	}
}

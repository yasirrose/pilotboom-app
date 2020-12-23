import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController, ToastController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';
import { GlobalData, GlobalService } from 'src/app/services/global.service';

@Component({
	selector: 'app-add-contact',
	templateUrl: './add-contact.page.html',
	styleUrls: ['./add-contact.page.scss'],
})
export class AddContactPage implements OnInit {
	addContactForm: FormGroup;
	toggleAdvance = false;
	allUsers = [];
	validation_messages = this.globalData.validationMessages;
	countries: object;
	states: object;
	sources = this.globalData.contactSource;
	
	constructor(
		private api: RestService,
		private fb: FormBuilder,
		private alertCtrl: AlertController,
		private toastCtrl: ToastController,
		private router: Router,
		private navCtrl: NavController,
		private global: GlobalService,
		private globalData: GlobalData
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
			date_of_birth: '',
			contact_age: '',
			source: '',
			facebook: '',
			twitter: '',
			googleplus: '',
			linkedin: '',
		});
	}

	ionViewDidEnter() {
		this.countries = this.globalData.countries;
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
				this.processError(err);
			}
		);
	}

	getStates() {
		console.log('Here');
		let country = this.addContactForm.value.country;
		this.states = this.globalData.states[country];
	}

	returnZero() {
		// to disable the default sorting behaviour of keyvalue
		return 0;
	}

	processError(err) {
		if (err.status == 500) {
			err.error.message = 'Please enter valid information.'
		}
		this.global.checkErrorStatus(err);
	}
}

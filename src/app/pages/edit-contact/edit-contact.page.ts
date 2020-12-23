import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalData, GlobalService } from 'src/app/services/global.service';
import { RestService } from 'src/app/services/rest.service';

@Component({
	selector: 'app-edit-contact',
	templateUrl: './edit-contact.page.html',
	styleUrls: ['./edit-contact.page.scss'],
})
export class EditContactPage implements OnInit {
	editContactForm: FormGroup;
	id: any;
	allUsers = [];
	toggleAdvance = false;
	validation_messages = this.globalData.validationMessages;
	countries: object;
	states: object;
	sources = this.globalData.contactSource;
	loadView = false;

	constructor(
		private api: RestService,
		private global: GlobalService,
		private globalData: GlobalData,
		private fb: FormBuilder,
		private router: Router,
		private route: ActivatedRoute,
		private navCtrl: NavController
	) {
		this.route.queryParams.subscribe(params => {
			this.global.showLoading("bubbles", "Please wait...");
			if (params && params.contactId) {
				this.id = params.contactId;
				this.getContactDetail();
				this.getAllUsers();
			}
		});
	}

	ngOnInit() {
		this.editContactForm = this.fb.group({
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
			user_id: '',
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

	getContactDetail() {
		this.api.getContactDetail(this.id).subscribe(
			response => {
				let res: any = response;
				res.owner = res.owner['ID'].toString();
				this.loadView = true;
				this.editContactForm.patchValue(res);
				this.getStates();
			},
			err => {
				this.global.checkErrorStatus(err);
			}
		);
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

	updateContact() {
		this.global.showLoading("bubbles", "Please wait...");
		this.api.updateContact(this.editContactForm.value, this.id).subscribe(
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
		let country = this.editContactForm.value.country;
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
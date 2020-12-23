import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController, ToastController, NavController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalData, GlobalService } from 'src/app/services/global.service';
import { RestService } from 'src/app/services/rest.service';

@Component({
	selector: 'app-edit-company',
	templateUrl: './edit-company.page.html',
	styleUrls: ['./edit-company.page.scss'],
})
export class EditCompanyPage implements OnInit {
	editCompanyForm: FormGroup;
	id: any;
	allUsers = [];
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
		private alertCtrl: AlertController,
		private toastCtrl: ToastController,
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
		this.editCompanyForm = this.fb.group({
			type: "company",
			company: ['', Validators.required],
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
				this.editCompanyForm.patchValue(res);
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

	updateCompany() {
		this.global.showLoading("bubbles", "Please wait...");
		this.api.updateCompany(this.editCompanyForm.value, this.id).subscribe(
			res => {
				this.global.closeLoading();
				this.router.navigate(["/companies"]);
			},
			err => {
				this.processError(err);
			}
		);
	}

	getStates() {
		let country = this.editCompanyForm.value.country;
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

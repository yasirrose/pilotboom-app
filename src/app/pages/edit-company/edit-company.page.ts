import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController, ToastController, NavController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';
import { RestService } from 'src/app/services/rest.service';

@Component({
	selector: 'app-edit-company',
	templateUrl: './edit-company.page.html',
	styleUrls: ['./edit-company.page.scss'],
})
export class EditCompanyPage implements OnInit {
	editCompanyForm: FormGroup;

	user = this.api.getCurrentUser();
	id: any;
	allUsers = [];
	validation_messages = this.global.getValidationMessages();

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
			user_id: ''
		});
	}

	getContactDetail() {
		this.api.getContactDetail(this.id).subscribe(response => {
			let res: any = response;
			res.owner = res.owner['ID'].toString();
			this.editCompanyForm.patchValue(res);
		});
	}

	getAllUsers() {
		this.api.getUsers().subscribe(res => {
			this.allUsers = res;
			this.global.closeLoading();
		});
	}


	updateCompany() {
		this.global.showLoading("bubbles", "Please wait...");
		this.api.updateCompany(this.editCompanyForm.value, this.id).subscribe(
			res => {
				this.global.closeLoading();
				this.router.navigate(["/companies"]);
			},
			err => {
				this.global.closeLoading();
				this.global.showPopup('Failed', err.error.message);
			}
		);
	}
}

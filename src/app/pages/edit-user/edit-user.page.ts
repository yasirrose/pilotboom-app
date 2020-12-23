import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalData, GlobalService } from 'src/app/services/global.service';
import { UserService } from 'src/app/services/user.service';

@Component({
	selector: 'app-edit-user',
	templateUrl: './edit-user.page.html',
	styleUrls: ['./edit-user.page.scss'],
})
export class EditUserPage implements OnInit {
	id: any;
	editUserForm: FormGroup;
	userData: any;
	validation_messages = this.globalData.validationMessages;

	constructor(
		private userApi: UserService,
		private fb: FormBuilder,
		private alertCtrl: AlertController,
		private toastCtrl: ToastController,
		private router: Router,
		private route: ActivatedRoute,
		private navCtrl: NavController,
		private global: GlobalService,
		private globalData: GlobalData
	) {
		this.route.queryParams.subscribe(params => {
			this.global.showLoading("bubbles", "Please wait...");
			if (params && params.userId) {
				this.id = params.userId;
				this.getUserDetail();
			}
		});
	}

	ngOnInit() {
		this.editUserForm = this.fb.group({
			username: ['', Validators.required],
			email: [
				'',
				Validators.compose([
					Validators.required,
					Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
				])
			],
			name: '',
			first_name: '',
			last_name: '',
			url: '',
			description: '',
			roles: ['subscriber'],
			password: [
				'',
				Validators.minLength(5)
			],
		});
	}

	getUserDetail() {
		this.userApi.getUserDetails(this.id).subscribe(
			response => {
				this.userData = response;
				let res: any = response;
				res.username = res.data.user_login;
				res.email = res.data.user_email;
				res.name = res.data.display_name;

				res.first_name = res.data.metadata.first_name[0];
				res.last_name = res.data.metadata.last_name[0];
				res.description = res.data.metadata.description[0];

				res.url = res.data.user_url;
				this.editUserForm.patchValue(res);
				this.global.closeLoading();
			},
			err => {
				this.global.checkErrorStatus(err);
			}
		);
	}

	updateUser() {
		if (this.editUserForm.value.password == '') {
			this.editUserForm.value.password = this.userData.data.user_pass;
		}
		this.global.showLoading("bubbles", "Please wait...");
		this.userApi.updateUser(this.editUserForm.value, this.id).subscribe(
			res => {
				this.global.closeLoading();
				this.global.presentToast('User updated successfully.');
				this.router.navigate(["/users"]);
			},
			err => {
				this.global.checkErrorStatus(err);
			}
		);
	}
}

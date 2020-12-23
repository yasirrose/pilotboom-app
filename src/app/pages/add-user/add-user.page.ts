import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController, ToastController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { GlobalData, GlobalService } from 'src/app/services/global.service';
import { UserService } from 'src/app/services/user.service';

@Component({
	selector: 'app-add-user',
	templateUrl: './add-user.page.html',
	styleUrls: ['./add-user.page.scss'],
})
export class AddUserPage implements OnInit {
	addUserForm: FormGroup;
	// toggleAdvance = false;
	// allUsers = [];
	validation_messages = this.globalData.validationMessages;

	constructor(
		private userApi: UserService,
		private fb: FormBuilder,
		private alertCtrl: AlertController,
		private toastCtrl: ToastController,
		private router: Router,
		private navCtrl: NavController,
		private global: GlobalService,
		private globalData: GlobalData
	) {
	}

	ngOnInit() {
		this.addUserForm = this.fb.group({
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
				Validators.compose([
					Validators.required,
					Validators.minLength(5),
				])
			],
		});
	}

	addUser() {
		this.global.showLoading("bubbles", "Please wait...");
		this.userApi.addUser(this.addUserForm.value).subscribe(
			res => {
				this.global.closeLoading();
				this.global.presentToast('User added successfully.');
				this.router.navigate(["/users"]);
			},
			err => {
				this.global.checkErrorStatus(err);
			}
		);
	}
}


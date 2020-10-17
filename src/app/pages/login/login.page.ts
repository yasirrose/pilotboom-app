import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.page.html',
	styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
	userForm: FormGroup;

	user = this.api.getCurrentUser();
	posts = [];

	loginObj: object = {
		email: '',
		pass: ''
	};

	validation_messages = this.global.getValidationMessages();

	constructor(
		private api: RestService,
		private fb: FormBuilder,
		private alertCtrl: AlertController,
		private toastCtrl: ToastController,
		private router: Router,
		private global: GlobalService
	) {
		this.user.subscribe(user => {
			if (user) {
				// this.loadPrivatePosts();
				this.router.navigate(["/dashboard"]);
			} else {
				this.posts = [];
			}
		});
	}

	ngOnInit() {
		this.userForm = this.fb.group({
			username: ['', Validators.required],
			email: '',
			password: ['', Validators.required]
		});
	}

	login() {
		this.global.showLoading("bubbles", "Logging in...");
		this.api.signIn(this.userForm.value.username, this.userForm.value.password).subscribe(
			res => {
				this.global.closeLoading();
			},
			err => {
				this.global.closeLoading();
				this.global.showPopup('Login Failed', err.error.message);
			}
		);
	}

	signUp() {
		this.api.signUp(this.userForm.value.username, this.userForm.value.email, this.userForm.value.password).subscribe(
			async res => {
				const toast = await this.toastCtrl.create({
					message: res['message'],
					duration: 3000
				});
				toast.present();
			},
			err => {
				this.global.showPopup('Sign up Failed', err.error.message);
			}
		);
	}

	async openPwReset() {
		const alert = await this.alertCtrl.create({
			header: 'Forgot password?',
			message: 'Enter your email or username to retrieve a new password',
			inputs: [
				{
					type: 'text',
					name: 'usernameOrEmail'
				}
			],
			buttons: [
				{
					role: 'cancel',
					text: 'Back'
				},
				{
					text: 'Reset Password',
					handler: (data) => {
						this.resetPw(data['usernameOrEmail']);
					}
				}
			]
		});

		await alert.present();
	}

	resetPw(usernameOrEmail) {
		this.api.resetPassword(usernameOrEmail).subscribe(
			async res => {
				const toast = await this.toastCtrl.create({
					message: res['message'],
					duration: 2000
				});
				toast.present();
			},
			err => {
				this.global.showPopup('Reset Failed', err.error.message);
			}
		);
	}

	logout() {
		this.api.logout();
	}
}
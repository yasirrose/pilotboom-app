import { Component, OnInit } from '@angular/core';
import { RestService } from '../services/rest.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

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

	constructor(
		private api: RestService,
		private fb: FormBuilder,
		private alertCtrl: AlertController,
		private toastCtrl: ToastController,
		private router: Router
	) {
		this.user.subscribe(user => {
			if (user) {
				// this.loadPrivatePosts();
				this.router.navigate(["/posts"]);
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

		console.log(this.userForm.value);
		this.api.signIn(this.userForm.value.username, this.userForm.value.password).subscribe(
			res => {
				console.log(res);
			 },
			err => {
				this.showError(err);
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
				this.showError(err);
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
				this.showError(err);
			}
		);
	}

	logout() {
		this.api.logout();
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
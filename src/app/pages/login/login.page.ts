
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AlertController, Platform, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';
import { GlobalService } from 'src/app/services/global.service';
import { environment } from 'src/environments/environment';
import { ChatService } from 'src/app/services/chat.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.page.html',
	styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
	userForm: FormGroup;
	validation_messages = this.global.getValidationMessages();
	subscription: any;

	constructor(
		private platform: Platform,
		private api: RestService,
		private fb: FormBuilder,
		private alertCtrl: AlertController,
		private toastCtrl: ToastController,
		private router: Router,
		private global: GlobalService,
		private chatApi: ChatService
	) {
	}

	ngOnInit() {
		this.userForm = this.fb.group({
			username: ['', Validators.required],
			website: ['', Validators.required],
			email: '',
			password: ['', Validators.required]
		});
	}

	ionViewDidEnter() {
		this.subscription = this.platform.backButton.subscribe(() => {
			this.global.confirmExitApp();
		});
	}

	ionViewWillLeave() {
		this.subscription.unsubscribe();
	}

	login() {
		if (!this.global.checkConnection()) {
			return false;
		} else {
			this.global.showLoading("bubbles", "Logging in...");
			this.api.getMasterData(this.userForm.value.website).subscribe(
				res => {
					this.global.setUserDomain(this.userForm.value.website);
					this.api.signIn(this.userForm.value.username, this.userForm.value.password).subscribe(
						res => {
							this.chatApi.saveToken().subscribe();
							this.global.closeLoading();
						},
						err => {
							this.processLoginError(err);
						}
					);
				}
			)
		}
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
				this.global.checkErrorStatus(err);
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
				this.global.checkErrorStatus(err);
			}
		);
	}

	passwordType: string = 'password';
	passwordIcon: string = 'eye';

	hideShowPassword() {
		this.passwordType = this.passwordType === 'text' ? 'password' : 'text';
		this.passwordIcon = this.passwordIcon === 'eye-off' ? 'eye' : 'eye-off';
	}

	forgotPassword() {
		this.global.InAppBrowser(`${this.global.getBaseUrl()}/wp-login.php?action=lostpassword`);
	}

	processLoginError(err) {
		if (err.status == 403) {
			if (err.error.code.indexOf('incorrect_password') > -1) {
				err.error.message = 'The password you entered is incorrect. Please try again.'
			}
		}
		this.global.checkErrorStatus(err, 'Login Failed', false, true);
	}
}
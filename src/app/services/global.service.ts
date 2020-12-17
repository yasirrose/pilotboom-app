import { Injectable } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { LoadingController, AlertController, ToastController, Platform } from '@ionic/angular';
import { environment } from '../../environments/environment';
import { NetworkService } from './network.service';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';

const JWT_KEY = '#|TS9!T&v5%12?Iu(q|]O^K|<Pmxw#RK{) JXn*b,,}fIrnV,5u:)UIqMAql<fwV';

@Injectable({
	providedIn: 'root'
})
export class GlobalService {
	isTablet: any;
	loading: any;
	browser: any;
	device_token: any;
	is_notif: boolean = false;
	domain: any;
	private user = new BehaviorSubject(null);
	constructor(
		private router: Router,
		private storage: Storage,
		private _santizer: DomSanitizer,
		private loadingCtrl: LoadingController,
		private alertCtrl: AlertController,
		private toastCtrl: ToastController,
		private network: NetworkService,
		private iab: InAppBrowser,
		private plt: Platform
	) {
	}

	async showLoading(spinner, message) {
		// if (!environment.showloader) {
		// 	return false;
		// }
		this.loading = await this.loadingCtrl.create({
			spinner,
			message
		});
		await this.loading.present();
	}

	closeLoading() {
		if (this.loading) {
			this.loading.dismiss();
		}
	}

	async alertMessage(header, message, buttons, cssClass) {
		const alert = await this.alertCtrl.create({
			header,
			message,
			buttons: [buttons],
			cssClass,
			mode: "md"
		});
		await alert.present();
	}

	getSafeHtml(value): SafeHtml {
		return this._santizer.bypassSecurityTrustHtml(value);
	}

	InAppBrowser(link) {
		// const openingMode = "_blank";
		const browser = this.iab.create(link);
		// browser.executeScript(...);

		// browser.insertCSS(...);
		browser.on('loadstop').subscribe(event => {
			browser.insertCSS({ code: "body{color: red;" });
		});
	}

	InAppBrowserClose() {
		this.browser.close();
	}

	getValidationMessages() {
		return {
			'username': [
				{ type: 'required', message: 'Username/Email is required.' },
				{ type: 'minlength', message: 'Username must be at least 5 characters long.' },
				{ type: 'maxlength', message: 'Username cannot be more than 25 characters long.' },
				{ type: 'pattern', message: 'Your username must contain only numbers and letters.' },
				{ type: 'validUsername', message: 'Your username has already been taken.' }
			],
			'name': [
				{ type: 'required', message: 'Name is required.' }
			],
			'first_name': [
				{ type: 'required', message: 'First name is required.' }
			],
			'last_name': [
				{ type: 'required', message: 'Last name is required.' }
			],
			'email': [
				{ type: 'required', message: 'Email is required.' },
				{ type: 'pattern', message: 'Please enter a valid email.' }
			],
			'phone': [
				{ type: 'required', message: 'Phone is required.' },
				{ type: 'validCountryPhone', message: 'The phone is incorrect for the selected country.' }
			],
			'password': [
				{ type: 'required', message: 'Password is required.' },
				{ type: 'minlength', message: 'Password must be at least 5 characters long.' },
				{ type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number.' }
			],
			'confirm_password': [
				{ type: 'required', message: 'Confirm password is required.' }
			],
			'matching_passwords': [
				{ type: 'areEqual', message: 'Password mismatch.' }
			],
			'terms': [
				{ type: 'pattern', message: 'You must accept terms and conditions.' }
			],
			'owner': [
				{ type: 'required', message: 'Contact owner is required.' }
			],
			'life_stage': [
				{ type: 'required', message: 'Life Stage is required.' }
			],
			'company': [
				{ type: 'required', message: 'Company Name is required.' }
			],
			'contact_ids': [
				{ type: 'required', message: 'At Least one Contact is required.' }
			],
			'website': [
				{ type: 'required', message: 'Website name is required.' }
			],
		};
	}

	async showPopup(header, message, exitApp = false) {
		this.closeLoading();
		const alert = await this.alertCtrl.create({
			header: header,
			message: message,
			buttons: exitApp ?
				[
					{
						text: 'OK',
						handler: () => {
							navigator['app'].exitApp();
						}
					}
				] :
				['OK']
		});
		await alert.present();
	}

	async presentToast(message, duration = 2000) {
		const toast = await this.toastCtrl.create({
			message: message,
			duration: duration
		});
		toast.present();
	}

	checkErrorStatus(error, header = 'Failed', exitApp = false, login = false) {
		this.closeLoading();
		if (!this.checkConnection()) {
			return false;
		}
		if ((error.status == 403 || error.status == 401) && !login) {
			this.storage.remove(JWT_KEY).then(() => {
				this.router.navigate(["/login"]);
			});
		} else {
			this.showPopup(header, error.error.message, exitApp);
		}
	}

	filterObjectByValue(objArray, key, value, type = 'remove') {
		return objArray.filter(obj => {
			if (type == 'remove') {
				return obj[key] != value;
			} else if (type == 'get') {
				return obj[key] == value;
			}
		});
	}

	filterSearch(objArray, value, key1, key2?) {
		return objArray.filter(obj => {
			if (key2) {
				return (obj[key1].toLowerCase().indexOf(value.toLowerCase()) > -1 || obj[key2].toLowerCase().indexOf(value.toLowerCase()) > -1);
			} else {
				return obj[key1].toLowerCase().indexOf(value.toLowerCase()) > -1;
			}
		});
	}

	stripHtmlTags(text) {
		return text ? String(text).replace(/<[^>]+>/gm, '') : '';
	}

	checkConnection(exitApp = false) {
		if (this.network.getConnectionType() == "none") {
			this.closeLoading();
			this.showPopup(
				"Network connection error",
				"Please check your internet connection and try again.",
				exitApp
			);
			return false;
		} else {
			return true;
		}
	}

	async confirmExitApp(confirm = true) {
		if (!confirm) {
			navigator['app'].exitApp();
			return false;
		}
		let alert = await this.alertCtrl.create({
			header: 'Pilotboom',
			message: 'Are you sure you want to exit?',
			buttons: [
				{
					text: 'Cancel',
					role: 'cancel',
					handler: () => {
					}
				},
				{
					text: 'Exit',
					handler: async () => {
						await alert.onDidDismiss().then(() => {
							navigator['app'].exitApp();
						});
					}
				}
			]
		});
		await alert.present();
	}

	setDeviceToken(token) {
		this.device_token = token.value;
	}

	getDeviceToken() {
		return this.device_token;
	}

	setUserDomain(domain) {
		localStorage.setItem('capUserDom', domain);
	}

	getUserDomain() {
		return localStorage.getItem('capUserDom');
	}

	getBaseUrl() {
		return environment.production ? `https://${this.getUserDomain()}.pilotboom.com` : `http://localhost/pilotboom`;
	}

	getApiUrl() {
		var base = this.getBaseUrl();
		return `${base}/wp-json`;
	}
}
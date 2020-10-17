import { Injectable } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { LoadingController, AlertController, ToastController } from '@ionic/angular';
// import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { environment } from '../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class GlobalService {
	isTablet: any;
	loading: any;
	browser: any;
	constructor(
		private _santizer: DomSanitizer,
		private loadingCtrl: LoadingController,
		private alertCtrl: AlertController,
		private toastCtrl: ToastController,
		// private iab: InAppBrowser
	) {
	}

	async showLoading(spinner, message) {
		if (!environment.showloader) {
			return false;
		}
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

	// InAppBrowser(link) {
	// 	// const openingMode = "_blank";
	// 	const browser = this.iab.create(link);
	// 	// browser.executeScript(...);

	// 	// browser.insertCSS(...);
	// 	browser.on('loadstop').subscribe(event => {
	// 		browser.insertCSS({ code: "body{color: red;" });
	// 	});
	// }

	// InAppBrowserClose() {
	// 	this.browser.close();
	// }

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
		};
	}

	async showPopup(header, message) {
		const alert = await this.alertCtrl.create({
			header: header,
			message: message,
			buttons: ['OK']
		});
		await alert.present();
	}
}

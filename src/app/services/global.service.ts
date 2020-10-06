import { Injectable } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { LoadingController, AlertController } from '@ionic/angular';
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
		// private iab: InAppBrowser
	) {
	}

	async showLoading(spinner, message) {
		if(!environment.showloader){
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

}

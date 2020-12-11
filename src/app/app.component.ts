import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { RestService } from './services/rest.service';
import { Router } from '@angular/router';
import { FcmService } from './services/fcm.service';
import { Plugins, PushNotification, PushNotificationToken, PushNotificationActionPerformed, Capacitor, } from "@capacitor/core";
import { listenerCount } from 'process';
import { GlobalService } from './services/global.service';
const { PushNotifications } = Plugins;
@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.scss']
})
export class AppComponent {
	versionNo: string = '1.0.0';
	user = this.api.getCurrentUser();
	userData: any;

	constructor(
		private platform: Platform,
		private splashScreen: SplashScreen,
		private statusBar: StatusBar,
		private api: RestService,
		private router: Router,
		private fcmService: FcmService,
		private global: GlobalService
	) {
		this.initializeApp();
	}

	initializeApp() {
		this.platform.ready().then(() => {
			this.user.subscribe(user => {
				if (user) {
					this.userData = this.api.getCurrentUserData();
					if (!this.global.is_notif) {
						this.router.navigate(["/dashboard"]);
					} else {
						this.global.is_notif = false;
					}
				}
			});
			this.statusBar.styleDefault();
			this.splashScreen.hide();

			// Trigger the push setup 
			this.fcmService.initPush();
		});
	}

	logout() {
		this.api.logout();
	}
}

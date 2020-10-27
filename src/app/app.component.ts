import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { RestService } from './services/rest.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.scss']
})
export class AppComponent {
	versionNo: string = '1.0.0';
	user = this.api.getCurrentUser();

	constructor(
		private platform: Platform,
		private splashScreen: SplashScreen,
		private statusBar: StatusBar,
		private api: RestService,
		private router: Router
	) {
		this.initializeApp();
	}

	initializeApp() {
		this.platform.ready().then(() => {
			this.user.subscribe(user => {
				if (user) {
					this.router.navigate(["/dashboard"]);
				}
			});
			this.statusBar.styleDefault();
			this.splashScreen.hide();
		});
	}

	logout() {
		this.api.logout();
	}
}

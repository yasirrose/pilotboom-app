import { Component, OnInit } from '@angular/core';
import { RestService } from '../services/rest.service';
import { Router, NavigationExtras } from '@angular/router';
import { AlertController, ToastController, NavController, NavParams } from '@ionic/angular';
import { GlobalService } from 'src/app/services/global.service';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.page.html',
	styleUrls: ['./dashboard.page.scss'],
	providers: [NavParams]
})
export class DashboardPage implements OnInit {
	user = this.api.getCurrentUser();
	contact = 0;
	contact_customer = 0;
	contact_lead = 0;
	contact_opportunity = 0;
	contact_subscriber = 0;

	company = 0;
	company_customer = 0;
	company_lead = 0;
	company_opportunity = 0;
	company_subscriber = 0;

	constructor(
		private api: RestService,
		private global: GlobalService,
		private router: Router,
		private alertCtrl: AlertController,
		private toastCtrl: ToastController,
		private navCtrl: NavController,
		private navParam: NavParams,
	) {
		this.user.subscribe(user => {
			if (!user) {
				this.router.navigate(["/login"]);
			}
		});
	}

	ngOnInit() {
	}

	ionViewDidEnter() {
		this.global.showLoading("bubbles", "Loading...");
		this.getDashboardInfo();
	}

	userLogout() {
		this.api.logout();
	}

	getDashboardInfo() {
		this.api.getCrmContacts('all').subscribe(res => {
			this.reset();
			for (let i = 0; i < res.length; i++) {
				const elem = res[i];
				this[elem.types[0]]++;
				this[`${elem.types[0]}_${elem.life_stage}`]++;
			}
			this.global.closeLoading();
		});
	}

	reset() {
		this.contact = 0;
		this.contact_customer = 0;
		this.contact_lead = 0;
		this.contact_opportunity = 0;
		this.contact_subscriber = 0;

		this.company = 0;
		this.company_customer = 0;
		this.company_lead = 0;
		this.company_opportunity = 0;
		this.company_subscriber = 0;
	}
}

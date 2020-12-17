import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { AlertController, ToastController, NavController, NavParams, Platform } from '@ionic/angular';
import { GlobalService } from 'src/app/services/global.service';
import { RestService } from 'src/app/services/rest.service';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.page.html',
	styleUrls: ['./dashboard.page.scss'],
	providers: [NavParams]
})
export class DashboardPage implements OnInit {
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

	loadView = false;

	subscription: any;
	constructor(
		private platform: Platform,
		private api: RestService,
		private global: GlobalService,
		private router: Router,
		private alertCtrl: AlertController,
		private toastCtrl: ToastController,
		private navCtrl: NavController,
		private navParam: NavParams,
	) {
	}

	ngOnInit() {
	}

	ionViewDidEnter() {
		// this.api.logout();
		this.global.showLoading("bubbles", "Loading...");
		this.getDashboardInfo();
		const gb = this.global;

		this.platform.backButton.subscribeWithPriority(99999, () => {
			document.addEventListener('backbutton', function (event) {
				event.preventDefault();
				event.stopPropagation();
				// gb.presentToast('Press back button again to exit');
				navigator['app'].exitApp();
			}, false);
		});
	}

	userLogout() {
		this.api.logout();
	}

	getDashboardInfo(event?) {
		this.api.CountCrmContacts().subscribe(
			res => {
				event ? event.target.complete() : '';
				this.resetData();
				this.setData(res);
				this.loadView = true;
				this.global.closeLoading();
			},
			err => {
				event ? event.target.complete() : '';
				this.global.checkErrorStatus(err);
			}
		);
	}

	resetData() {
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

	setData(data) {
		this.contact = data.contact.all.count;
		this.contact_customer = data.contact.customer.count
		this.contact_lead = data.contact.lead.count
		this.contact_opportunity = data.contact.opportunity.count
		this.contact_subscriber = data.contact.subscriber.count

		this.company = data.company.all.count
		this.company_customer = data.company.customer.count
		this.company_lead = data.company.lead.count
		this.company_opportunity = data.company.opportunity.count
		this.company_subscriber = data.company.subscriber.count
	}

	doRefresh(event) {
		this.getDashboardInfo(event);
	}
}

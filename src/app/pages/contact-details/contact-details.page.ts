import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { GlobalService } from 'src/app/services/global.service';
import { RestService } from 'src/app/services/rest.service';

@Component({
	selector: 'app-contact-details',
	templateUrl: './contact-details.page.html',
	styleUrls: ['./contact-details.page.scss'],
})

export class ContactDetailsPage implements OnInit {
	contactData = [];
	contact_id: any;
	openActSection = false;
	activities: any
	constructor(
		private api: RestService,
		private global: GlobalService,
		private router: Router,
		private route: ActivatedRoute,
		private alertCtrl: AlertController,
		private toastCtrl: ToastController,
	) {
		this.route.queryParams.subscribe(params => {
			this.global.showLoading("bubbles", "Please wait...");
			if (params && params.contactId) {
				this.contact_id = params.contactId;
				this.getContact();
			}
		});
	}

	ngOnInit() {
	}

	getContact() {
		this.api.getContactDetail(this.contact_id).subscribe(
			res => {
				this.contactData = res;
				this.global.closeLoading();
			},
			err => {
				this.global.checkErrorStatus(err);
			}
		);
	}

	showActivity() {
		let navigationExtras: NavigationExtras = {
			queryParams: this.contactData
		}
		this.router.navigate(["/contact-activities"], navigationExtras);
	}
}
import { Component, OnInit } from '@angular/core';
import { RestService } from '../services/rest.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { GlobalService } from 'src/app/services/global.service';

@Component({
	selector: 'app-contact-details',
	templateUrl: './contact-details.page.html',
	styleUrls: ['./contact-details.page.scss'],
})

export class ContactDetailsPage implements OnInit {
	user = this.api.getCurrentUser();
	contactData = [];
	constructor(
		private api: RestService,
		private global: GlobalService,
		private router: Router,
		private route: ActivatedRoute,
		private alertCtrl: AlertController,
		private toastCtrl: ToastController,
	) {
		this.user.subscribe(user => {
			if (user) {
				this.route.queryParams.subscribe(params => {
					this.global.showLoading("bubbles", "Please wait...");
					if (params && params.contactId) {
						this.getContact(params.contactId);
					}
				})
			} else {
				this.contactData = [];
				this.router.navigate(["/login"]);
			}
		});
	}

	ngOnInit() {
	}

	getContact(id) {
		this.api.getContactDetail(id).subscribe(res => {
			this.contactData = res;
			this.global.closeLoading();
		});
	}
}
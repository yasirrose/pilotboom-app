import { Component, OnInit } from '@angular/core';
import { RestService } from '../services/rest.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController, ToastController, NavController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';

@Component({
	selector: 'app-edit-contact-group',
	templateUrl: './edit-contact-group.page.html',
	styleUrls: ['./edit-contact-group.page.scss'],
})
export class EditContactGroupPage implements OnInit {
	editContactGrpForm: FormGroup;

	user = this.api.getCurrentUser();
	toggleAdvance = false;
	id: any;

	constructor(
		private api: RestService,
		private global: GlobalService,
		private fb: FormBuilder,
		private alertCtrl: AlertController,
		private toastCtrl: ToastController,
		private router: Router,
		private route: ActivatedRoute,
		private navCtrl: NavController
	) {
		this.user.subscribe(user => {
			this.user.subscribe(user => {
				if (user) {
					this.route.queryParams.subscribe(params => {
						// this.global.showLoading("bubbles", "Please wait...");
						if (params && params.contactGrpId) {
							this.id = params.contactGrpId;
							this.getContactGrpDetail();
						}
					})
				} else {
					this.router.navigate(["/login"]);
				}
			});
		});
	}

	ngOnInit() {
		this.editContactGrpForm = this.fb.group({
			name: ['', Validators.required],
			description: '',
			group_private: 0,
		});
	}

	getContactGrpDetail() {
		this.api.getContactGroupDetail(this.id).subscribe(res => {
			this.editContactGrpForm = this.fb.group(res);
			this.global.closeLoading();
		});
	}

	updateContactGrp() {
		this.api.updateContactGroup(this.editContactGrpForm.value, this.id).subscribe(
			res => {
				this.router.navigate(["/contact-groups"]);
			},
			err => {
				this.showError(err);
			}
		);
	}

	async showError(err) {
		const alert = await this.alertCtrl.create({
			header: err.error.code,
			subHeader: err.error.data.status,
			message: err.error.message,
			buttons: ['OK']
		});
		await alert.present();
	}
}

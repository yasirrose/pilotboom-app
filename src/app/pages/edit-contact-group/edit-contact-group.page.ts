import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController, ToastController, NavController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalService } from 'src/app/services/global.service';
import { RestService } from 'src/app/services/rest.service';

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
	validation_messages = this.global.getValidationMessages();

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
						this.global.showLoading("bubbles", "Please wait...");
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
			this.editContactGrpForm.patchValue(res);
			this.global.closeLoading();
		});
	}

	updateContactGrp() {
		this.global.showLoading("bubbles", "Please wait...");
		this.api.updateContactGroup(this.editContactGrpForm.value, this.id).subscribe(
			res => {
				this.global.closeLoading();
				this.router.navigate(["/contact-groups"]);
			},
			err => {
				this.global.closeLoading();
				this.global.showPopup('Failed', err.error.message);
			}
		);
	}
}
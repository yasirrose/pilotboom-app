import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController, ToastController, NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
	selector: 'app-add-contact-group',
	templateUrl: './add-contact-group.page.html',
	styleUrls: ['./add-contact-group.page.scss'],
})
export class AddContactGroupPage implements OnInit {
	addContactGrpForm: FormGroup;

	user = this.api.getCurrentUser();
	toggleAdvance = false;
	validation_messages = this.global.getValidationMessages();

	constructor(
		private api: RestService,
		private fb: FormBuilder,
		private alertCtrl: AlertController,
		private toastCtrl: ToastController,
		private router: Router,
		private navCtrl: NavController,
		private global: GlobalService
	) {
		this.user.subscribe(user => {
			if (!user) {
				this.router.navigate(["/login"]);
			}
		});
	}

	ngOnInit() {
		this.addContactGrpForm = this.fb.group({
			name: ['', Validators.required],
			description: '',
			group_private: 0,
		});
	}

	addContactGrp() {
		this.global.showLoading("bubbles", "Please wait...");
		this.api.addNewContactGroup(this.addContactGrpForm.value).subscribe(
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
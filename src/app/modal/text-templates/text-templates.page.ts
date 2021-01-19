import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { AutoblogService } from 'src/app/services/autoblog.service';
import { GlobalData, GlobalService } from 'src/app/services/global.service';
import { RestService } from 'src/app/services/rest.service';
import { Storage } from '@ionic/storage';

@Component({
	selector: 'app-text-templates',
	templateUrl: './text-templates.page.html',
	styleUrls: ['./text-templates.page.scss'],
	providers: [FormBuilder],
})
export class TextTemplatesPage implements OnInit {

	additionalTemplates = [];
	defaultTemplates = [];

	contact: any;
	showAddForm = false;
	addTempForm: FormGroup;
	toggleAdvance = false;
	validation_messages = this.globalData.validationMessages;

	constructor(
		private api: RestService,
		private fb: FormBuilder,
		private router: Router,
		private global: GlobalService,
		private autoBlogApi: AutoblogService,
		private globalData: GlobalData,
		private modalCtrl: ModalController,
		private storage: Storage,
		private alertCtrl: AlertController
	) { }

	ngOnInit() {
		this.addTempForm = this.fb.group({
			template: ['', Validators.required],
		});
	}

	ionViewDidEnter() {
		this.setTemplates();
	}

	hideTempForm() {
		this.showAddForm = false;
		this.addTempForm.value.template = '';
	}

	closeModal(data?) {
		this.global.closeLoading();
		data ? this.modalCtrl.dismiss(this.formatWildcards(data)) : this.modalCtrl.dismiss();
	}

	selectTemplate(text) {
		this.closeModal(text);
	}

	addTemplate() {
		this.global.showLoading("bubbles", "Please wait...");
		// this.storage.remove('additionalTemplates');
		this.storage.get('additionalTemplates').then(data => {
			if (!data || !(data instanceof Array)) {
				data = [];
			}
			data.push(this.addTempForm.value.template);
			this.storage.set('additionalTemplates', data);
			setTimeout(() => {
				this.setAdditionalTemplates();
				this.hideTempForm();
				this.global.closeLoading();
			}, 1000);
		});
	}

	setAdditionalTemplates() {
		this.storage.get('additionalTemplates').then(data => {
			if (data) {
				this.additionalTemplates = data;
			}
		});
	}

	setTemplates() {
		this.defaultTemplates = [];
		this.defaultTemplates = this.globalData.textTemplates.default;
		this.setAdditionalTemplates();
	}

	formatWildcards(temp) {
		return temp.replace('{user_name}', this.contact.first_name);
	}

	async deleteTemplate(evt, index) {
		let alert = await this.alertCtrl.create({
			header: 'Confirm Delete',
			message: 'Do you really want to delete this template?',
			buttons: [
				{
					text: 'Cancel',
					role: 'cancel',
					handler: () => {
					}
				},
				{
					text: 'Delete',
					handler: () => {
						this.global.showLoading("bubbles", "Please wait...");
						this.storage.get('additionalTemplates').then(data => {
							if (!data || !(data instanceof Array)) {
								data = [];
							}
							// data = this.global.filterArrayByIndex(data, index);
							data.splice(index, 1);
							this.storage.set('additionalTemplates', data);
							setTimeout(() => {
								this.setAdditionalTemplates();
								this.global.closeLoading();
							}, 300);
						});
					}
				}
			]
		});
		await alert.present();
	}
}
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalData, GlobalService } from 'src/app/services/global.service';
import { RestService } from 'src/app/services/rest.service';

@Component({
	selector: 'app-edit-contact-group',
	templateUrl: './edit-contact-group.page.html',
	styleUrls: ['./edit-contact-group.page.scss'],
})
export class EditContactGroupPage implements OnInit {
	editContactGrpForm: FormGroup;
	toggleAdvance = false;
	id: any;
	validation_messages = this.globalData.validationMessages;

	constructor(
		private api: RestService,
		private global: GlobalService,
		private fb: FormBuilder,
		private router: Router,
		private route: ActivatedRoute,
		private globalData: GlobalData
	) {
		this.route.queryParams.subscribe(params => {
			this.global.showLoading("bubbles", "Please wait...");
			if (params && params.contactGrpId) {
				this.id = params.contactGrpId;
				this.getContactGrpDetail();
			}
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
		this.api.getContactGroupDetail(this.id).subscribe(
			res => {
				this.editContactGrpForm.patchValue(res);
				this.global.closeLoading();
			},
			err => {
				this.global.checkErrorStatus(err);
			}
		);
	}

	updateContactGrp() {
		this.global.showLoading("bubbles", "Please wait...");
		this.api.updateContactGroup(this.editContactGrpForm.value, this.id).subscribe(
			res => {
				this.global.closeLoading();
				this.router.navigate(["/contact-groups"]);
			},
			err => {
				this.global.checkErrorStatus(err);
			}
		);
	}
}

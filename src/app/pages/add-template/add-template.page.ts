import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';
import { GlobalData, GlobalService } from 'src/app/services/global.service';
import { AutoblogService } from 'src/app/services/autoblog.service';

@Component({
	selector: 'app-add-template',
	templateUrl: './add-template.page.html',
	styleUrls: ['./add-template.page.scss'],
})
export class AddTemplatePage implements OnInit {

	addTempForm: FormGroup;
	toggleAdvance = false;
	validation_messages = this.globalData.validationMessages;

	constructor(
		private api: RestService,
		private fb: FormBuilder,
		private router: Router,
		private global: GlobalService,
		private autoBlogApi: AutoblogService,
		private globalData: GlobalData
	) { }

	ngOnInit() {
		this.addTempForm = this.fb.group({
			template: ['', Validators.required],
		});
	}

	addTemplate() {
		this.global.showLoading("bubbles", "Please wait...");
		this.autoBlogApi.addAutoBlog(this.addTempForm.value).subscribe(
			res => {
				this.global.closeLoading();
				this.router.navigate(["/auto-blogging"]);
			},
			err => {
				this.global.checkErrorStatus(err);
			}
		);
	}
}

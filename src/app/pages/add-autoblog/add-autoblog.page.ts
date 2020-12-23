import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';
import { GlobalData, GlobalService } from 'src/app/services/global.service';
import { AutoblogService } from 'src/app/services/autoblog.service';

@Component({
	selector: 'app-add-autoblog',
	templateUrl: './add-autoblog.page.html',
	styleUrls: ['./add-autoblog.page.scss'],
})
export class AddAutoblogPage implements OnInit {
	addAutoBlogForm: FormGroup;
	toggleAdvance = false;
	validation_messages = this.globalData.validationMessages;
	allUsers: any;

	constructor(
		private api: RestService,
		private fb: FormBuilder,
		private router: Router,
		private global: GlobalService,
		private autoBlogApi: AutoblogService,
		private globalData: GlobalData
	) {
		this.global.showLoading("bubbles", "Please wait...");
		this.getAllUsers();
	}

	ngOnInit() {
		this.addAutoBlogForm = this.fb.group({
			type: "dashboard",
			title: ['', Validators.required],
			content: '',
			excerpt: '',
			status: ['draft', Validators.required],
			author: ['', Validators.required],
		});
	}

	addAutoBlog() {
		this.global.showLoading("bubbles", "Please wait...");
		this.autoBlogApi.addAutoBlog(this.addAutoBlogForm.value).subscribe(
			res => {
				this.global.closeLoading();
				this.router.navigate(["/auto-blogging"]);
			},
			err => {
				this.global.checkErrorStatus(err);
			}
		);
	}

	getAllUsers() {
		this.api.getUsers().subscribe(
			res => {
				this.allUsers = res;
				this.global.closeLoading();
			},
			err => {
				this.global.checkErrorStatus(err);
			}
		);
	}
}
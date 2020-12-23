import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';
import { GlobalData, GlobalService } from 'src/app/services/global.service';
import { AutoblogService } from 'src/app/services/autoblog.service';

@Component({
	selector: 'app-edit-autoblog',
	templateUrl: './edit-autoblog.page.html',
	styleUrls: ['./edit-autoblog.page.scss'],
})
export class EditAutoblogPage implements OnInit {
	editAutoBlogForm: FormGroup;
	validation_messages = this.globalData.validationMessages;
	allUsers: any;
	id: any;
	blogData: any;

	constructor(
		private api: RestService,
		private fb: FormBuilder,
		private router: Router,
		private route: ActivatedRoute,
		private global: GlobalService,
		private autoBlogApi: AutoblogService,
		private globalData: GlobalData
	) {
		this.route.queryParams.subscribe(params => {
			this.global.showLoading("bubbles", "Please wait...");
			if (params && params.blogId) {
				this.id = params.blogId;
				this.getBlog();
			}
		});
	}

	ngOnInit() {
		this.editAutoBlogForm = this.fb.group({
			type: "dashboard",
			title: ['', Validators.required],
			content: '',
			excerpt: '',
			status: ['', Validators.required],
			author: ['', Validators.required],
		});
	}

	getBlog() {
		this.autoBlogApi.getAutoBlogDetail(this.id).subscribe(
			res => {
				this.blogData = res;
				this.blogData.title = this.global.stripHtmlTags(this.blogData.title.rendered);
				this.blogData.content = this.global.stripHtmlTags(this.blogData.content.rendered);
				this.blogData.excerpt = this.global.stripHtmlTags(this.blogData.excerpt.rendered);
				this.api.getUsers().subscribe(
					res => {
						this.allUsers = res;
						this.blogData.author = this.global.filterObjectByValue(res, 'name', this.blogData.author, 'get')[0].id.toString();
						this.editAutoBlogForm.patchValue(this.blogData);
						this.global.closeLoading();
					},
					err => {
						this.global.checkErrorStatus(err);
					}
				);
			},
			err => {
				this.global.checkErrorStatus(err);
			}
		);
	}

	updateAutoBlog() {
		this.global.showLoading("bubbles", "Please wait...");
		this.autoBlogApi.updateAutoBlog(this.editAutoBlogForm.value, this.id).subscribe(
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
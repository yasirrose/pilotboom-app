import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { AutoblogService } from 'src/app/services/autoblog.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
	selector: 'app-autoblog-details',
	templateUrl: './autoblog-details.page.html',
	styleUrls: ['./autoblog-details.page.scss'],
})
export class AutoblogDetailsPage implements OnInit {
	blogData = [];
	blog_id: any;
	openActSection = false;
	activities: any
	constructor(
		private global: GlobalService,
		private router: Router,
		private route: ActivatedRoute,
		private autoBlogApi: AutoblogService
	) {
		this.route.queryParams.subscribe(params => {
			this.global.showLoading("bubbles", "Please wait...");
			if (params && params.blogId) {
				this.blog_id = params.blogId;
				this.getContact();
			}
		});
	}

	ngOnInit() {
	}

	getContact() {
		this.autoBlogApi.getAutoBlogDetail(this.blog_id).subscribe(
			res => {

				console.log(res);

				this.blogData = res;
				this.global.closeLoading();
			},
			err => {
				this.global.checkErrorStatus(err);
			}
		);
	}

	// showActivity() {
	// 	let navigationExtras: NavigationExtras = {
	// 		queryParams: this.blogData
	// 	}
	// 	this.router.navigate(["/contact-activities"], navigationExtras);
	// }
}

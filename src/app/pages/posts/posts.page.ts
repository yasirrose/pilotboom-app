import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { GlobalService } from 'src/app/services/global.service';
import { RestService } from 'src/app/services/rest.service';

@Component({
	selector: 'app-posts',
	templateUrl: './posts.page.html',
	styleUrls: ['./posts.page.scss'],
})
export class PostsPage implements OnInit {

	user = this.api.getCurrentUser();
	posts = [];

	loadView = false;
	page = 1;
	per_page = 10;
	hasMore = true;

	@ViewChild(IonContent) content: IonContent;

	constructor(
		private router: Router,
		private api: RestService,
		private global: GlobalService
	) {
		this.user.subscribe(user => {
			if (user) {
				this.loadPosts();
			} else {
				this.posts = [];
				this.router.navigate(["/login"]);
			}
		});
	}

	ngOnInit() {
	}

	ionViewDidEnter() {
		this.resetData();
		this.global.showLoading("bubbles", "Loading...");
	}

	resetData() {
		this.hasMore = true;
		this.page = 1;
		this.per_page = 10;
		this.content.scrollToTop();
	}

	loadPosts(event?) {
		this.api.getPosts(this.per_page, this.page).subscribe(res => {
			this.posts = res;

			if (res.length < this.per_page) {
				this.hasMore = false
			}
			if (event) {
				event.target.complete();
			} else {
				this.posts = [];
			}
			this.posts = this.posts.concat(res);
			this.global.closeLoading();
			this.loadView = true;
		});
	}

	loadMore(event) {
		this.page++;
		this.loadPosts(event);
	}

	userLogout() {
		this.api.logout();
	}
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';

@Component({
	selector: 'app-posts',
	templateUrl: './posts.page.html',
	styleUrls: ['./posts.page.scss'],
})
export class PostsPage implements OnInit {

	user = this.api.getCurrentUser();
	posts = [];

	constructor(
		private api: RestService,
		private router: Router
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

	loadPosts() {
		this.api.getPosts().subscribe(res => {
			this.posts = res;
		});
	}

	userLogout() {
		this.api.logout();
	}

}

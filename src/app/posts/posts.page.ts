import { Component, OnInit } from '@angular/core';
import { RestService } from '../services/rest.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-posts',
	templateUrl: './posts.page.html',
	styleUrls: ['./posts.page.scss'],
})
export class PostsPage implements OnInit {

	// constructor() { }
	user = this.api.getCurrentUser();
	posts = [];

	constructor(
		private api: RestService,
		private router: Router
	) {
		this.user.subscribe(user => {
			if (user) {
				this.loadPrivatePosts();
			} else {
				this.router.navigate(["/login"]);
				// this.posts = [];
			}
		});
	}

	ngOnInit() {
	}

	loadPrivatePosts() {
		this.api.getPrivatePosts().subscribe(res => {
			this.posts = res;
			console.log(this.posts);
		});
	}

	userLogout(){
		this.api.logout();
	}

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular';
import { ChatService } from 'src/app/services/chat.service';
import { GlobalService } from 'src/app/services/global.service';
import { RestService } from 'src/app/services/rest.service';

@Component({
	selector: 'app-chat',
	templateUrl: './chat.page.html',
	styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
	posts = [];
	loadView = false;
	page = 1;
	per_page = 10;
	hasMore = true;
	@ViewChild(IonContent) content: IonContent;

	constructor(
		private router: Router,
		private rest: RestService,
		private chatApi: ChatService,
		private global: GlobalService
	) {
	}

	ngOnInit() {
	}

	ionViewDidEnter() {
		this.resetData();
		this.global.showLoading("bubbles", "Loading...");
		this.loadPosts();
	}

	resetData() {
		this.hasMore = true;
		this.page = 1;
		this.per_page = 10;
		this.content.scrollToTop();
	}

	loadPosts(event?, refresh?) {
		this.rest.getPosts(this.per_page, this.page).subscribe(
			res => {
				this.hasMore = res.length < this.per_page ? false : true;
				if (event) {
					this.posts = refresh ? [] : this.posts;
					event.target.complete();
				} else {
					this.posts = [];
				}

				this.posts = this.posts.concat(res);
				this.global.closeLoading();
				this.loadView = true;
			},
			err => {
				if (event) {
					event.target.complete();
				}
				this.global.checkErrorStatus(err);
			}
		);
	}

	loadMore(event) {
		this.page++;
		this.loadPosts(event);
	}

	doRefresh(event) {
		this.resetData();
		this.loadPosts(event, true);
	}

	testing() {
		this.chatApi.testTwilio().subscribe(
			res => {
				console.log(res);
			}
		);
	}
}
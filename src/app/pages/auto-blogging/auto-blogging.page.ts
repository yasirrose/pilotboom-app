import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, IonContent, NavController, NavParams, ToastController } from '@ionic/angular';
import { AutoblogService } from 'src/app/services/autoblog.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
	selector: 'app-auto-blogging',
	templateUrl: './auto-blogging.page.html',
	styleUrls: ['./auto-blogging.page.scss'],
	providers: [NavParams]
})
export class AutoBloggingPage implements OnInit {
	postsData = [];
	posts = [];
	loadView = false;
	page = 1;
	per_page = 10;
	hasMore = true;
	search = false;
	searchTerm = '';
	searching = false;
	@ViewChild(IonContent) content: IonContent;

	constructor(
		private router: Router,
		private global: GlobalService,
		private autoBlogApi: AutoblogService,
		private alertCtrl: AlertController,
		private toastCtrl: ToastController,
		private navCtrl: NavController,
		private navParam: NavParams,
	) {
	}

	ngOnInit() {
	}

	ionViewDidEnter() {
		this.resetData();
		this.global.showLoading("bubbles", "Loading...");
		this.loadAutoBlogging();
	}

	resetData() {
		this.hasMore = true;
		this.page = 1;
		this.per_page = 10;
		this.content.scrollToTop();
	}

	clearSearch() {
		this.search = false;
		this.searchTerm = '';
		this.searching = false;
	}

	loadAutoBlogging(event?, refresh?) {
		this.autoBlogApi.getAutoBlog(this.per_page, this.page).subscribe(
			res => {
				this.hasMore = res.length < this.per_page ? false : true;
				if (!event || refresh) {
					this.postsData = [];
					this.clearSearch();
				}
				this.postsData = this.postsData.concat(res);

				if (event && this.search && this.searchTerm) { //Pagination called and search exists already
					this.posts = this.filterSearch(this.postsData, this.searchTerm);
				} else {
					this.posts = this.postsData;
				}
				event ? event.target.complete() : '';
				this.global.closeLoading();
				this.loadView = true;
			},
			err => {
				event ? event.target.complete() : '';
				this.global.checkErrorStatus(err);
			}
		);
	}

	getDetail(event, id) {
		let navigationExtras: NavigationExtras = {
			queryParams: {
				blogId: id
			}
		}
		this.router.navigate(["/autoblog-details"], navigationExtras);
	}

	editAutoBlog(event, id) {
		let navigationExtras: NavigationExtras = {
			queryParams: {
				blogId: id
			}
		}
		this.router.navigate(["/edit-autoblog"], navigationExtras);
	}

	async delete(event, id) {
		let alert = await this.alertCtrl.create({
			header: 'Confirm Delete',
			message: 'Do you really want to delete this post?',
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
						this.autoBlogApi.delete(id).subscribe(
							res => {
								this.posts = this.global.filterObjectByValue(this.posts, 'id', id, 'remove');
								this.global.closeLoading();
							},
							err => {
								this.global.checkErrorStatus(err);
							}
						);
					}
				}
			]
		});
		await alert.present();
	}

	loadMore(event) {
		this.page++;
		this.loadAutoBlogging(event);
	}

	doRefresh(event) {
		this.resetData();
		this.loadAutoBlogging(event, true);
	}

	enableSearch(evt) {
		this.search = !this.search;
		if (!this.search) {
			this.searchTerm = '';
		}
	}

	filterItems(evt) {
		this.searching = true;
		var filtered = this.filterSearch(this.postsData, this.searchTerm);
		setTimeout(() => {
			this.posts = filtered;
			this.searching = false;
		}, 300);
	}

	filterSearch(objArray, value) {
		return objArray.filter(obj => {
			return obj.title.rendered.toLowerCase().indexOf(value.toLowerCase()) > -1;
		});
	}
}
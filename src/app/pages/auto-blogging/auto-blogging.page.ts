import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, IonContent, NavController, NavParams, ToastController } from '@ionic/angular';
import { AutoblogService } from 'src/app/services/autoblog.service';
import { GlobalService } from 'src/app/services/global.service';
import { RestService } from 'src/app/services/rest.service';

@Component({
	selector: 'app-auto-blogging',
	templateUrl: './auto-blogging.page.html',
	styleUrls: ['./auto-blogging.page.scss'],
	providers: [NavParams]
})
export class AutoBloggingPage implements OnInit {
	posts = [];
	loadView = true;
	page = 1;
	per_page = 10;
	hasMore = true;
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

	loadAutoBlogging(event?) {
		this.autoBlogApi.getAutoBlog(this.per_page, this.page).subscribe(
			res => {

				if (res.length < this.per_page) {
					this.hasMore = false
				}
				if (event) {
					event.target.complete();
				} else {
					this.posts = [];
				}
				this.global.closeLoading();
				this.posts = res;
			},
			err => {
				if (event) {
					event.target.complete();
				}
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
		return false;

		let navigationExtras: NavigationExtras = {
			queryParams: {
				contactGrpId: id
			}
		}
		this.router.navigate(["/edit-contact-group"], navigationExtras);
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
								this.loadAutoBlogging();
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
		// this.loadPosts(event);
	}

	doRefresh(event) {
		this.resetData();
		this.loadAutoBlogging(event);
	}
}
import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, IonContent, NavController, NavParams } from '@ionic/angular';
import { GlobalData, GlobalService } from 'src/app/services/global.service';
import { UserService } from 'src/app/services/user.service';

@Component({
	selector: 'app-users',
	templateUrl: './users.page.html',
	styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {
	usersData = [];
	users = [];
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
		private userApi: UserService,
		private global: GlobalService,
		private globalData: GlobalData,
		private alertCtrl: AlertController
	) {
	}

	ngOnInit() {
	}

	ionViewDidEnter() {
		this.resetData();
		this.global.showLoading("bubbles", "Loading...");
		this.loadUsers();
	}

	resetData() {
		this.hasMore = true;
		this.page = 1;
		this.per_page = 10;
		this.content.scrollToTop();
	}

	loadUsers(event?, refresh?) {
		this.userApi.getUsersWithMeta(this.per_page, this.page).subscribe(
			res => {
				this.hasMore = res.length < this.per_page ? false : true;
				if (!event || refresh) {
					this.usersData = [];
					this.clearSearch();
				}
				this.usersData = this.usersData.concat(res);

				if (event && this.search && this.searchTerm) { //Pagination called and search exists already
					this.users = this.filterSearch(this.usersData, this.searchTerm);
				} else {
					this.users = this.usersData;
				}

				event ? event.target.complete() : '';
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

	editUser(event, id) {
		let navigationExtras: NavigationExtras = {
			queryParams: {
				userId: id
			}
		}
		this.router.navigate(["/edit-user"], navigationExtras);
	}

	async delete(event, id) {
		let alert = await this.alertCtrl.create({
			header: 'Confirm Delete',
			message: 'Do you really want to delete this user?',
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
						this.userApi.delete(id).subscribe(
							res => {
								this.users = this.global.filterObjectByValue(this.users, 'ID', id, 'remove');
								this.global.closeLoading();
								this.global.presentToast('User deleted successfully.')
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
		this.loadUsers(event);
	}

	doRefresh(event) {
		this.resetData();
		this.loadUsers(event, true);
	}

	getRoleText(roles) {
		var text: string = '';
		for (let i = 0; i < roles.length; i++) {
			var elem = roles[i];
			if (elem in this.globalData.erpRolesAll) {
				elem = this.globalData.erpRolesAll[elem];
			}
			text = `${text}${i ? ', ' : ''}${this.global.toTitleCase(elem)}`;
		}
		return text;
	}

	enableSearch(evt) {
		this.search = !this.search;
		if (!this.search) {
			this.searchTerm = '';
		}
	}

	clearSearch() {
		this.search = false;
		this.searchTerm = '';
		this.searching = false;
	}

	filterItems(evt) {
		this.searching = true;
		var filtered = this.filterSearch(this.usersData, this.searchTerm);
		setTimeout(() => {
			this.users = filtered;
			this.searching = false;
		}, 300);
	}

	filterSearch(objArray, value) {
		return objArray.filter(obj => {
			return (
				obj.data.display_name.toLowerCase().indexOf(value.toLowerCase()) > -1 ||
				obj.data.user_login.toLowerCase().indexOf(value.toLowerCase()) > -1 ||
				obj.data.user_nicename.toLowerCase().indexOf(value.toLowerCase()) > -1
			);
		});
	}
}
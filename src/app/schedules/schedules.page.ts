import { Component, OnInit } from '@angular/core';
import { RestService } from '../services/rest.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-schedules',
	templateUrl: './schedules.page.html',
	styleUrls: ['./schedules.page.scss'],
})
export class SchedulesPage implements OnInit {

	user = this.api.getCurrentUser();
	schedules = [];

	constructor(
		private api: RestService,
		private router: Router
	) {
		this.user.subscribe(user => {
			if (user) {
				this.getSchedules();
			} else {
				this.schedules = [];
				this.router.navigate(["/login"]);
			}
		});
	}

	ngOnInit() {
	}

	getSchedules() {
		this.api.getSchedules().subscribe(res => {
			this.schedules = res;
		});
	}
}


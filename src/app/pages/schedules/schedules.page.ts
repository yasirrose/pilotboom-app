import { CalendarComponent } from 'ionic2-calendar';
import { Component, ViewChild, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';
import { RestService } from 'src/app/services/rest.service';
import { GlobalService } from 'src/app/services/global.service';

@Component({
	selector: 'app-schedules',
	templateUrl: './schedules.page.html',
	styleUrls: ['./schedules.page.scss'],
})
export class SchedulesPage implements OnInit {
	event = {
		title: '',
		desc: '',
		startTime: '',
		endTime: '',
		allDay: false
	};

	minDate = new Date().toISOString();

	eventSource = [];
	viewTitle;

	calendar = {
		mode: 'month',
		currentDate: new Date(),
	};

	@ViewChild(CalendarComponent) myCal: CalendarComponent;

	user = this.api.getCurrentUser();
	schedules = [];
	tab = 'own';

	constructor(
		private alertCtrl: AlertController, @Inject(LOCALE_ID)
		private locale: string,
		private router: Router,
		private api: RestService,
		private global: GlobalService
	) {
		this.user.subscribe(user => {
			if (user) {
				this.global.showLoading("bubbles", "Loading...");
				this.getSchedules();
			} else {
				this.schedules = [];
				this.router.navigate(["/login"]);
			}
		});
	}

	ngOnInit() {
		this.resetEvent();
	}

	resetEvent() {
		this.event = {
			title: '',
			desc: '',
			startTime: new Date().toISOString(),
			endTime: new Date().toISOString(),
			allDay: false
		};
	}

	// Create the right event format and reload source
	addEvent() {
		let eventCopy = {
			title: this.event.title,
			startTime: new Date(this.event.startTime),
			endTime: new Date(this.event.endTime),
			allDay: this.event.allDay,
			desc: this.event.desc
		}

		if (eventCopy.allDay) {
			let start = eventCopy.startTime;
			let end = eventCopy.endTime;

			eventCopy.startTime = new Date(Date.UTC(start.getUTCFullYear(), start.getUTCMonth(), start.getUTCDate()));
			eventCopy.endTime = new Date(Date.UTC(end.getUTCFullYear(), end.getUTCMonth(), end.getUTCDate() + 1));
		}

		this.eventSource.push(eventCopy);
		this.myCal.loadEvents();
		this.resetEvent();
	}
	next() {
		var swiper = document.querySelector('.swiper-container')['swiper'];
		swiper.slideNext();
	}

	back() {
		var swiper = document.querySelector('.swiper-container')['swiper'];
		swiper.slidePrev();
	}

	// Change between month/week/day
	changeMode(mode) {
		this.calendar.mode = mode;
	}

	// Focus today
	today() {
		this.calendar.currentDate = new Date();
	}

	// Selected date reange and hence title changed
	onViewTitleChanged(title) {
		this.viewTitle = title;
	}

	// Calendar event was clicked
	async onEventSelected(event) {
		// Use Angular date pipe for conversion
		let start = formatDate(event.startTime, 'medium', this.locale);
		let end = formatDate(event.endTime, 'medium', this.locale);

		const alert = await this.alertCtrl.create({
			header: event.title,
			subHeader: event.desc,
			message: 'From: ' + start + '<br><br>To: ' + end,
			buttons: ['OK']
		});
		alert.present();
	}

	// Time slot was clicked
	onTimeSelected(ev) {
		let selected = new Date(ev.selectedTime);
		this.event.startTime = selected.toISOString();
		selected.setHours(selected.getHours() + 1);
		this.event.endTime = (selected.toISOString());
	}

	changeTab() {
		this.global.showLoading("bubbles", "Loading...");
		this.getSchedules();
	}

	getSchedules() {
		this.api.getSchedules(this.tab).subscribe(res => {
			this.schedules = res;
			this.global.closeLoading();
			this.populateEvents();
		});
	}

	populateEvents() {
		this.eventSource = [];
		for (const schedule of this.schedules) {
			this.eventSource.push({
				title: schedule.title,
				startTime: new Date(schedule.schedule.start_date),
				endTime: new Date(schedule.schedule.end_date ? schedule.schedule.end_date : schedule.schedule.start_date),
				allDay: false,
				desc: ''
			});
		}
		this.myCal.loadEvents();
		// this.resetEvent();
	}
}
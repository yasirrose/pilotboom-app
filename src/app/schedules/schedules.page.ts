import { AlertController } from '@ionic/angular';
import { Component, ViewChild, OnInit, Inject, LOCALE_ID } from '@angular/core';
import { formatDate } from '@angular/common';
import { CalendarComponent } from 'ionic2-calendar';
import { RestService } from '../services/rest.service';
import { Router } from '@angular/router';

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

	constructor(
		private alertCtrl: AlertController, @Inject(LOCALE_ID)
		private locale: string,
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

	getSchedules() {
		this.api.getSchedules().subscribe(res => {
			this.schedules = res;
			this.populateEvents();
		});
	}

	populateEvents() {
		let i = 0;
		for (const schedule of this.schedules) {
			this.eventSource.push({
				title: schedule.title,
				startTime: new Date(schedule.schedule.start_date),
				endTime: new Date(schedule.schedule.end_date),
				allDay: false
			});
		}
		console.log(this.eventSource);
		this.myCal.loadEvents();
		// this.resetEvent();
		// console.log(i);
	}
}
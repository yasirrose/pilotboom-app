import { Component, OnInit } from '@angular/core';
import { RestService } from '../services/rest.service';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { AlertController, ToastController, NavController, NavParams } from '@ionic/angular';
import { GlobalService } from 'src/app/services/global.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
	selector: 'app-edit-activity',
	templateUrl: './edit-activity.page.html',
	styleUrls: ['./edit-activity.page.scss'],
})
export class EditActivityPage implements OnInit {
	add_note_form: FormGroup;
	add_email_form: FormGroup;
	add_log_form: FormGroup;
	add_schedule_form: FormGroup;
	add_task_form: FormGroup;

	user = this.api.getCurrentUser();
	contact_id: any;
	activity_id: any;
	type = '';
	activityData: any;
	allUsers: any;

	scheduleExpandNotify = false;
	constructor(
		private api: RestService,
		private global: GlobalService,
		private fb: FormBuilder,
		private router: Router,
		private route: ActivatedRoute,
		private alertCtrl: AlertController,
		private toastCtrl: ToastController,
		private navCtrl: NavController
	) {
		this.user.subscribe(user => {
			if (user) {
				this.route.queryParams.subscribe(params => {
					this.global.showLoading("bubbles", "Please wait...");
					if (params && params.conatctId && params.activityId) {
						this.contact_id = params.conatctId;
						this.activity_id = params.activityId;
						this.getActivityDetail();
						this.getAllUsers();
					}
				})
			} else {
				this.router.navigate(["/login"]);
			}
		});
	}

	ngOnInit() {
		this.add_note_form = this.fb.group({
			type: "note",
			contact_id: this.contact_id,
			content: ''
		});

		this.add_email_form = this.fb.group({
			type: "email",
			contact_id: this.contact_id,
			subject: "",
			body: ''
		});

		this.add_log_form = this.fb.group({
			type: "log",
			contact_id: this.contact_id,
			log_type: '',
			date_time: '',
			date: '',
			time: '',
			content: ''
		});

		this.add_schedule_form = this.fb.group({
			type: "schedule",
			contact_id: this.contact_id,
			title: "",
			content: '',
			start_date_time: "",
			end_date_time: "",
			all_day: "false",
			schedule_type: "",
			allow_notification: false,
			notification_via: "",
			notification_time: "",
			notification_time_interval: "",
			employee_ids: []
		});

		this.add_task_form = this.fb.group({
			type: "task",
			contact_id: this.contact_id,
			title: "",
			content: '',
			employee_ids: [],
			date_time: ""
		});
	}

	getActivityDetail() {
		this.api.getActivityDetail(this.activity_id).subscribe(res => {
			this.activityData = res;
			delete this.activityData.created_by;
			this.type = this.activityData.type;
			if(this.activityData['employee_ids']){
				this.activityData.employee_ids = [this.activityData.employee_ids];
			}

			this[`add_${this.type}_form`] = this.fb.group(this.activityData);
			// this.activityData = res;
		});
	}

	getAllUsers() {
		this.api.getUsers().subscribe(res => {
			this.allUsers = res;
			this.global.closeLoading();
		});
	}

	updateActivity(type) {
		let formData: any;
		if (type == 'note') {
			formData = this.add_note_form.value;
		} else if (type == 'email') {
			formData = this.add_email_form.value;
		} else if (type == 'log') {
			formData = this.add_log_form.value;
		} else if (type == 'schedule') {
			this.add_schedule_form.value.employee_ids = this.add_schedule_form.value.employee_ids.toString(); //array to string
			this.add_schedule_form.value.allow_notification = this.add_schedule_form.value.allow_notification.toString();
			this.add_schedule_form.value.all_day = this.add_schedule_form.value.all_day.toString();
			formData = this.add_schedule_form.value;
		} else if (type == 'tasks') {
			this.add_task_form.value.employee_ids = this.add_task_form.value.employee_ids.toString();
			formData = this.add_task_form.value;
		}

		this.global.showLoading("bubbles", "Please wait...");
		this.api.updateActivity(this.activity_id,formData).subscribe(
			res => {
				this.global.closeLoading();
				this.navCtrl.back();
			},
			err => {
				this.global.closeLoading();
				this.showError(err);
			}
		);
	}

	async showError(err) {
		const alert = await this.alertCtrl.create({
			header: err.error.code,
			subHeader: err.error.data.status,
			message: err.error.message,
			buttons: ['OK']
		});
		await alert.present();
	}

	scheduleAllowNotification(e) {
		this.scheduleExpandNotify = e;
	}

}

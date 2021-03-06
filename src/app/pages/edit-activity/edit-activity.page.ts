import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { AlertController, ToastController, NavController, NavParams } from '@ionic/angular';
import { GlobalService } from 'src/app/services/global.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RestService } from 'src/app/services/rest.service';

@Component({
	selector: 'app-edit-activity',
	templateUrl: './edit-activity.page.html',
	styleUrls: ['./edit-activity.page.scss'],
	// changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditActivityPage implements OnInit {
	add_note_form: FormGroup;
	add_email_form: FormGroup;
	add_log_form: FormGroup;
	add_schedule_form: FormGroup;
	add_task_form: FormGroup;

	contact_id: any;
	activity_id: any;
	type = '';
	activityData: any;
	allUsers: any;
	validation_messages = this.global.getValidationMessages();

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
		this.route.queryParams.subscribe(params => {
			this.global.showLoading("bubbles", "Please wait...");
			if (params && params.conatctId && params.activityId) {
				this.contact_id = params.conatctId;
				this.activity_id = params.activityId;
				this.getActivityDetail();
				this.getAllUsers();
			}
		});
	}

	ngOnInit() {
		this.add_note_form = this.fb.group({
			type: "note",
			contact_id: this.contact_id,
			content: ['', Validators.required]
		});

		this.add_email_form = this.fb.group({
			type: "email",
			contact_id: this.contact_id,
			subject: ['', Validators.required],
			body: ['', Validators.required]
		});

		this.add_log_form = this.fb.group({
			type: "log",
			contact_id: this.contact_id,
			log_type: ['', Validators.required],
			date_time: ['', Validators.required],
			content: ['', Validators.required],
			// title: ['', Validators.required]
		});

		this.add_schedule_form = this.fb.group({
			type: "schedule",
			contact_id: this.contact_id,
			title: ['', Validators.required],
			content: ['', Validators.required],
			start_date_time: ['', Validators.required],
			end_date_time: ['', Validators.required],
			all_day: "false",
			employee_ids: [[], Validators.required],
			schedule_type: ['', Validators.required],
			allow_notification: false,
			notification_via: "",
			notification_time: "",
			notification_time_interval: ""
		});

		this.add_task_form = this.fb.group({
			type: "task",
			contact_id: this.contact_id,
			title: ['', Validators.required],
			content: ['', Validators.required],
			employee_ids: [[], Validators.required],
			date_time: ['', Validators.required]
		});
	}

	getActivityDetail() {
		this.api.getActivityDetail(this.activity_id).subscribe(
			res => {
				this.activityData = res;
				delete this.activityData.created_by;
				this.type = this.activityData.type;
				if (this.activityData['employee_ids']) {
					this.activityData.employee_ids = [this.activityData.employee_ids];
				}

				this[`add_${this.type}_form`].patchValue(this.activityData);
			},
			err => {
				this.global.checkErrorStatus(err);
			}
		);
	}

	getAllUsers() {
		this.api.getUsers().subscribe(
			res => {
				this.allUsers = res;
				this.global.closeLoading();
			},
			err => {
				this.global.checkErrorStatus(err);
			}
		);
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
		this.api.updateActivity(this.activity_id, formData).subscribe(
			res => {
				this.global.closeLoading();
				this.navCtrl.back();
			},
			err => {
				this.global.checkErrorStatus(err);
			}
		);
	}

	scheduleAllowNotification(e) {
		this.scheduleExpandNotify = e;
		if (e) { // for setting validations
			this.add_schedule_form.get('notification_via').setValidators([Validators.required]);
			this.add_schedule_form.get('notification_via').updateValueAndValidity();
			this.add_schedule_form.get('notification_time').setValidators([Validators.required]);
			this.add_schedule_form.get('notification_time').updateValueAndValidity();
			this.add_schedule_form.get('notification_time_interval').setValidators([Validators.required]);
			this.add_schedule_form.get('notification_time_interval').updateValueAndValidity();
		} else { // for clearing validations;
			this.add_schedule_form.get('notification_via').clearValidators();
			this.add_schedule_form.get('notification_via').updateValueAndValidity();
			this.add_schedule_form.get('notification_time').clearValidators();
			this.add_schedule_form.get('notification_time').updateValueAndValidity();
			this.add_schedule_form.get('notification_time_interval').clearValidators();
			this.add_schedule_form.get('notification_time_interval').updateValueAndValidity();
		}
	}

}

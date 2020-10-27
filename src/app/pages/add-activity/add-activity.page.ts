import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { AlertController, ToastController, NavController, NavParams } from '@ionic/angular';
import { GlobalService } from 'src/app/services/global.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RestService } from 'src/app/services/rest.service';

@Component({
	selector: 'app-add-activity',
	templateUrl: './add-activity.page.html',
	styleUrls: ['./add-activity.page.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddActivityPage implements OnInit {
	addNoteForm: FormGroup;
	addEmailForm: FormGroup;
	addLogForm: FormGroup;
	addScheduleForm: FormGroup;
	addTaskForm: FormGroup;

	contact_id: any;
	tab = 'note';
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
			if (params && params.conatctId) {
				this.contact_id = params.conatctId;
				this.getAllUsers();
			}
		});
	}

	ngOnInit() {
		this.addNoteForm = this.fb.group({
			type: "note",
			contact_id: this.contact_id,
			content: ['', Validators.required]
		});

		this.addEmailForm = this.fb.group({
			type: "email",
			contact_id: this.contact_id,
			subject: ['', Validators.required],
			body: ['', Validators.required]
		});

		this.addLogForm = this.fb.group({
			type: "log",
			contact_id: this.contact_id,
			log_type: ['', Validators.required],
			date_time: ['', Validators.required],
			content: ['', Validators.required],
			// title: ['', Validators.required]
		});

		this.addScheduleForm = this.fb.group({
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

		this.addTaskForm = this.fb.group({
			type: "task",
			contact_id: this.contact_id,
			title: ['', Validators.required],
			content: ['', Validators.required],
			employee_ids: [[], Validators.required],
			date_time: ['', Validators.required]
		});
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

	addActivity(type) {
		let formData: any;
		if (type == 'note') {
			formData = this.addNoteForm.value;
		} else if (type == 'email') {
			formData = this.addEmailForm.value;
		} else if (type == 'log') {
			formData = this.addLogForm.value;
		} else if (type == 'schedule') {
			this.addScheduleForm.value.employee_ids = this.addScheduleForm.value.employee_ids.toString(); //array to string
			this.addScheduleForm.value.allow_notification = this.addScheduleForm.value.allow_notification.toString();
			this.addScheduleForm.value.all_day = this.addScheduleForm.value.all_day.toString();
			formData = this.addScheduleForm.value;
		} else if (type == 'tasks') {
			this.addTaskForm.value.employee_ids = this.addTaskForm.value.employee_ids.toString(); //array to string
			formData = this.addTaskForm.value;
		}

		this.global.showLoading("bubbles", "Please wait...");
		this.api.addActivity(formData).subscribe(
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
			this.addScheduleForm.get('notification_via').setValidators([Validators.required]);
			this.addScheduleForm.get('notification_via').updateValueAndValidity();
			this.addScheduleForm.get('notification_time').setValidators([Validators.required]);
			this.addScheduleForm.get('notification_time').updateValueAndValidity();
			this.addScheduleForm.get('notification_time_interval').setValidators([Validators.required]);
			this.addScheduleForm.get('notification_time_interval').updateValueAndValidity();
		} else { // for clearing validations;
			this.addScheduleForm.get('notification_via').clearValidators();
			this.addScheduleForm.get('notification_via').updateValueAndValidity();
			this.addScheduleForm.get('notification_time').clearValidators();
			this.addScheduleForm.get('notification_time').updateValueAndValidity();
			this.addScheduleForm.get('notification_time_interval').clearValidators();
			this.addScheduleForm.get('notification_time_interval').updateValueAndValidity();
		}
	}
}
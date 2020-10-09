import { Component, OnInit } from '@angular/core';
import { RestService } from '../services/rest.service';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { AlertController, ToastController, NavController, NavParams } from '@ionic/angular';
import { GlobalService } from 'src/app/services/global.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
	selector: 'app-add-activity',
	templateUrl: './add-activity.page.html',
	styleUrls: ['./add-activity.page.scss'],
})
export class AddActivityPage implements OnInit {
	addNoteForm: FormGroup;
	addEmailForm: FormGroup;
	addLogForm: FormGroup;
	addScheduleForm: FormGroup;
	addTaskForm: FormGroup;

	user = this.api.getCurrentUser();
	contact_id: any;
	tab = 'note';
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
					if (params && params.conatctId) {
						this.contact_id = params.conatctId;
						this.getAllUsers();
					}
				})
			} else {
				this.router.navigate(["/login"]);
			}
		});
	}

	ngOnInit() {
		this.addNoteForm = this.fb.group({
			type: "note",
			contact_id: this.contact_id,
			content: ''
		});

		this.addEmailForm = this.fb.group({
			type: "email",
			contact_id: this.contact_id,
			subject: "",
			body: ''
		});

		this.addLogForm = this.fb.group({
			type: "log",
			contact_id: this.contact_id,
			log_type: '',
			date_time: '',
			date: '',
			time: '',
			content: ''
		});

		this.addScheduleForm = this.fb.group({
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

		this.addTaskForm = this.fb.group({
			type: "task",
			contact_id: this.contact_id,
			title: "",
			content: '',
			employee_ids: [],
			date_time: ""
		});
	}

	getAllUsers() {
		this.api.getUsers().subscribe(res => {
			this.allUsers = res;
			this.global.closeLoading();
		});
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

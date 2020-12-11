import { Injectable } from "@angular/core";
import { Plugins, PushNotification, PushNotificationToken, PushNotificationActionPerformed, Capacitor, } from "@capacitor/core";
import { NavigationExtras, Router } from "@angular/router";
import { GlobalService } from './global.service';

const { PushNotifications } = Plugins;

@Injectable({
	providedIn: "root",
})
export class FcmService {
	constructor(
		private router: Router,
		private global: GlobalService
	) { }

	initPush() {
		if (Capacitor.platform !== "web") {
			this.registerPush();
		}
	}

	private registerPush() {
		PushNotifications.requestPermission().then((permission) => {
			if (permission.granted) {
				// Register with Apple / Google to receive push via APNS/FCM
				PushNotifications.register();
			} else {
				// No permission for push granted
			}
		});

		PushNotifications.addListener(
			"registration",
			(token: PushNotificationToken) => {
				console.log("My token: " + JSON.stringify(token));
				this.global.setDeviceToken(token);
			}
		);

		PushNotifications.addListener("registrationError", (error: any) => {
			// console.log("Error: " + JSON.stringify(error));
		});

		PushNotifications.addListener(
			"pushNotificationReceived",
			async (notification: PushNotification) => {
				// console.log("Push received: " + JSON.stringify(notification));
			}
		);

		PushNotifications.addListener(
			"pushNotificationActionPerformed",
			async (notification: PushNotificationActionPerformed) => {
				this.global.is_notif = true;
				const data = notification.notification.data;
				// this.router.navigateByUrl(`/chat-listing`);
				let navigationExtras: NavigationExtras = {
					queryParams: {
						contactId: data.contactId
					}
				}
				this.router.navigate(["/chat"], navigationExtras);
			}
		);
	}
}

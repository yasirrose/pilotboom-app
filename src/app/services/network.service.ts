import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Network } from '@ionic-native/network/ngx';

@Injectable({
	providedIn: 'root',
})
export class NetworkService {

	constructor(
		private platform: Platform,
		private network: Network
	) {
		this.platform.ready().then(() => {
			// watch network for a disconnection
			let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
				console.log('network was disconnected :-(');
			});

			// watch network for a connection
			let connectSubscription = this.network.onConnect().subscribe(() => {
				setTimeout(() => {
					if (this.network.type === 'wifi') {
						console.log('we got a wifi connection, woohoo!');
					}
				}, 3000);
			});
		});
	}

	getConnectionType() {
		return this.network.type;
	}
}

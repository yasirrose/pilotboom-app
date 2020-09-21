import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';

@Injectable({
	providedIn: 'root'
})
export class RestService {
	baseUrl: string;
	constructor(private http: HTTP) {
		this.baseUrl = 'the url here';

	}
	userAuthenticate() {
		return new Promise((resolve, reject) => {
			this.http.get(this.baseUrl + "Classes/Home.cfc?method=getAllCasinos&key=" + 'key', {}, {}).then(data => {
				resolve(JSON.parse(data.data));
			}, err => {
				reject(err);
			});
		});
	}
}



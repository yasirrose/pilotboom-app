import { Injectable } from '@angular/core';
import { BehaviorSubject, from } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Platform } from '@ionic/angular';
import { environment } from '../../environments/environment';
import { map, switchMap, tap } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
import { RestService } from './rest.service';
import { GlobalService } from './global.service';

const JWT_KEY = '#|TS9!T&v5%12?Iu(q|]O^K|<Pmxw#RK{) JXn*b,,}fIrnV,5u:)UIqMAql<fwV';

@Injectable({
	providedIn: 'root'
})
export class UserService {
	private user = new BehaviorSubject(null);
	constructor(
		private http: HttpClient,
		private storage: Storage,
		private plt: Platform,
		private rest: RestService,
		private global: GlobalService
	) {
		this.plt.ready().then(() => {
			this.storage.get(JWT_KEY).then(data => {
				if (data) {
					this.user.next(data);
				}
			})
		})
	}

	getUsersWithMeta(per_page = 10, page = 1) {
		let headers = new HttpHeaders();
		headers = headers.set('Authorization', 'Bearer ' + JWT_KEY);
		return this.http.get<any[]>(`${this.global.getApiUrl()}/wp/v2/usersmeta`, { headers: headers }).pipe(
			map(data => {
				return data;
			})
		);
	}

	getUserDetails(id) {
		return this.http.get<any[]>(`${this.global.getApiUrl()}/wp/v2/usersmeta/${id}`).pipe(
			map(data => {
				return data;
			})
		);
	}

	delete(id, hard = 0) {
		let my_id = this.rest.getCurrentUserID();
		return this.http.delete(`${this.global.getApiUrl()}/wp/v2/users/${id}?force=true&reassign=${my_id}`).pipe(
			map(data => {
				return data;
			})
		);
	}

	addUser(formData) {
		return this.http.post(`${this.global.getApiUrl()}/wp/v2/users`, formData).pipe(
			map(data => {
				return data;
			})
		);
	}

	updateUser(formData, id) {
		return this.http.put(`${this.global.getApiUrl()}/wp/v2/users/${id}`, formData).pipe(
			map(data => {
				return data;
			})
		);
	}
}

import { Injectable } from '@angular/core';
import { BehaviorSubject, from } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Platform } from '@ionic/angular';
import { environment } from '../../environments/environment';
import { map, switchMap, tap } from 'rxjs/operators';
import { Storage } from '@ionic/storage';

const JWT_KEY = '#|TS9!T&v5%12?Iu(q|]O^K|<Pmxw#RK{) JXn*b,,}fIrnV,5u:)UIqMAql<fwV';

@Injectable({
	providedIn: 'root'
})
export class AutoblogService {
	private user = new BehaviorSubject(null);
	constructor(private http: HttpClient, private storage: Storage, private plt: Platform) {
		this.plt.ready().then(() => {
			this.storage.get(JWT_KEY).then(data => {
				if (data) {
					this.user.next(data);
				}
			})
		})
	}

	getAutoBlog(per_page = 10, page = 1) {
		console.log('hererere');
		let headers = new HttpHeaders();
		headers = headers.set('Authorization', 'Bearer ' + JWT_KEY);
		return this.http.get<any[]>(`${environment.apiUrl}/autoblog/v1/blogs?per_page=${per_page}&page=${page}`, { headers: headers }).pipe(
			map(data => {
				return data;
			})
		);
	}

	getAutoBlogDetail(id) {
		return this.http.get<any[]>(`${environment.apiUrl}/autoblog/v1/blogs/${id}`).pipe(
			map(data => {
				return data;
			})
		);
	}

	delete(id, hard = 0) {
		return this.http.delete(`${environment.apiUrl}/autoblog/v1/blogs/${id}`).pipe(
			map(data => {
				return data;
			})
		);
	}

}

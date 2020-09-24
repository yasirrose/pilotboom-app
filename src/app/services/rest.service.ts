import { Injectable } from '@angular/core';
import { BehaviorSubject, from } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Platform } from '@ionic/angular';
import { environment } from '../../environments/environment';
import { map, switchMap, tap } from 'rxjs/operators';
import { Storage } from '@ionic/storage';

const JWT_KEY = ',GV7|uQrxQ0)8$lN..:m1R@WSKA{v58yq6l4}I&(eAAaeGheZ;gW:>-q{I6}fv;W';

@Injectable({
	providedIn: 'root'
})
export class RestService {
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

	signIn(username, password) {
		return this.http.post(`${environment.apiUrl}/jwt-auth/v1/token`, { username, password }).pipe(
			switchMap(data => {
				return from(this.storage.set(JWT_KEY, data));
			}),
			tap(data => {
				this.user.next(data);
			})
		);
	}

	signUp(username, email, password) {
		return this.http.post(`${environment.apiUrl}/wp/v2/users/register`, { username, email, password });
	}

	resetPassword(usernameOrEmail) {
		return this.http.post(`${environment.apiUrl}/wp/v2/users/lostpassword`, { user_login: usernameOrEmail });
	}

	getPrivatePosts() {
		// let headers = new HttpHeaders();
		// headers = headers.set('Authorization', 'Bearer ' + JWT_KEY);
		const headers = {
			'Content-Type': 'application/json',
			'Authorization': JWT_KEY
		  }
		return this.http.get(`${environment.apiUrl}/wp/v2/posts`,{headers: headers}).pipe(
			map(data => {
				return data;
			})
		);
	}

	getCurrentUser() {
		return this.user.asObservable();
	}

	getUserValue() {
		return this.user.getValue();
	}

	logout() {
		this.storage.remove(JWT_KEY).then(() => {
			this.user.next(null);
		});
	}
}
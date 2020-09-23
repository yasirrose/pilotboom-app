import { Injectable } from '@angular/core';
import { BehaviorSubject, from } from 'rxjs';
import { HttpClient } from '@angular/common/http';
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
		return this.http.get<any[]>(`${environment.apiUrl}/wp/v2/posts?_embed&status=private`).pipe(
			map(data => {
				for (let post of data) {
					if (post['_embedded']['wp:featuredmedia']) {
						post.media_url =
							post['_embedded']['wp:featuredmedia'][0]['media_details'].sizes['medium'].source_url;
					}
				}
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
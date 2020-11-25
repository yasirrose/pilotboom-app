import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Platform } from '@ionic/angular';
import { environment } from '../../environments/environment';
import { map, switchMap, tap } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
// import { Events } from 'ionic-angular';

const JWT_KEY = '#|TS9!T&v5%12?Iu(q|]O^K|<Pmxw#RK{) JXn*b,,}fIrnV,5u:)UIqMAql<fwV';

export class ChatMessage {
	id: number;
	messageTempId: string;
	user_id: string;
	contact_id: string;
	phone: string;
	time: number | string;
	text: string;
	type: string;
	status: string;
}

export class UserInfo {
	id: string;
	name?: string;
	avatar?: string;
}

@Injectable({
	providedIn: 'root'
})
export class ChatService {

	private user = new BehaviorSubject(null);
	constructor(
		private http: HttpClient,
		private storage: Storage,
		private plt: Platform,
		// private events: Events
	) {
		this.plt.ready().then(() => {
			this.storage.get(JWT_KEY).then(data => {
				if (data) {
					this.user.next(data);
				}
			})
		})
	}

	testTwilio() {
		return this.http.get<any[]>(`${environment.apiUrl}/erp/v1/messaging/texts`).pipe(
			map(data => {
				return data;
			})
		);
	}

	// mockNewMsg(msg, msgId, type = 'send') {
	// 	const mockMsg: ChatMessage = {
	// 		messageId: msgId,
	// 		userId: '210000198410281948',
	// 		userName: 'Hancock',
	// 		userAvatar: 'assets/img/user-comment-img-01.png',
	// 		toUserId: '140000198202211138',
	// 		time: Date.now(),
	// 		message: msg,
	// 		status: 'pending',
	// 		type: type
	// 	};
	// 	return mockMsg;

	// 	// setTimeout(() => {
	// 	// 	this.events.publish('chat:received', mockMsg, Date.now())
	// 	// }, Math.random() * 1800)
	// }

	// getMsgList(): Observable<ChatMessage[]> {
	// 	const msgListUrl = './assets/mock/msg-list.json';
	// 	return this.http.get<any>(msgListUrl)
	// 		.pipe(map(response => response.array));
	// }

	sendMsg(msg) {
		// return new Promise(resolve => setTimeout(() => resolve(msg), Math.random() * 1000))
		// 	.then(() => this.mockNewMsg(msg));

		// return this.http.get<any[]>(`${environment.apiUrl}/erp/v1/messaging/texts`).pipe(
		// 	map(data => {
		// 		return data;
		// 	})
		// );
		return this.http.post(`${environment.apiUrl}/erp/v1/messaging/texts`, msg).pipe(
			map(data => {
				return data;
			})
		);
	}

	// getUserInfo(): Promise<UserInfo> {
	// 	const userInfo: UserInfo = {
	// 		id: '140000198202211138',
	// 		name: 'Luff',
	// 		avatar: './assets/user.jpg'
	// 	};
	// 	return new Promise(resolve => resolve(userInfo));
	// }

	getChat(user_id, contact_id, per_page = 20, page = 1, search = '',) {
		return this.http.get<any[]>(`${environment.apiUrl}/erp/v1/messaging/texts?user_id=${user_id}&contact_id=${contact_id}&per_page=${per_page}&page=${page}&search=${search}`).pipe(
			map(data => {
				return data;
			})
		);
	}

	resendMsg(id) {
		return this.http.post(`${environment.apiUrl}/erp/v1/messaging/texts/resend`, { id: id }).pipe(
			map(data => {
				return data;
			})
		);
	}
}

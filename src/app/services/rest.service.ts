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
export class RestService {
	private user = new BehaviorSubject(null);
	constructor(
		private http: HttpClient,
		private storage: Storage,
		private plt: Platform
	) {
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
				// return from(this.storage.set(JWT_KEY, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3RcL3BpbG90Ym9vbSIsImlhdCI6MTYwMzI5MTMwMywibmJmIjoxNjAzMjkxMzAzLCJleHAiOjE2MDM4OTYxMDMsImRhdGEiOnsidXNlciI6eyJpZCI6IjQifX19.vPf1Tvrqbp9zfieMGE3w6K4LkegemhQFvYzxqdUpqNM'));
			}),
			tap(data => {
				this.user.next(data);
			})
		);
	}

	logout() {
		this.storage.remove(JWT_KEY).then(() => {
			this.user.next(null);
		});
	}

	signUp(username, email, password) {
		return this.http.post(`${environment.apiUrl}/wp/v2/users/register`, { username, email, password });
	}

	resetPassword(usernameOrEmail) {
		return this.http.post(`${environment.apiUrl}/wp/v2/users/lostpassword`, { user_login: usernameOrEmail });
	}

	getPosts(per_page = 10, page = 1) {
		let headers = new HttpHeaders();
		headers = headers.set('Authorization', 'Bearer ' + JWT_KEY);
		return this.http.get<any[]>(`${environment.apiUrl}/wp/v2/posts?per_page=${per_page}&page=${page}`, { headers: headers }).pipe(
			map(data => {
				return data;
			})
		);
	}

	getUsers() {
		let headers = new HttpHeaders();
		headers = headers.set('Authorization', 'Bearer ' + JWT_KEY);
		return this.http.get<any[]>(`${environment.apiUrl}/wp/v2/users`, { headers: headers }).pipe(
			map(data => {
				return data;
			})
		);
	}

	getCurrentUser() {
		return this.user.asObservable();
	}

	getCurrentUserData() {
		let user: any = this.user;
		return user._value;
	}

	getCurrentUserID(){
		return this.getCurrentUserData().user_id;
	}

	getMyself() {
		let headers = new HttpHeaders();
		headers = headers.set('Authorization', 'Bearer ' + JWT_KEY);
		return this.http.get<any[]>(`${environment.apiUrl}/wp/v2/users`, { headers: headers }).pipe(
			map(data => {
				return data;
			})
		);
	}

	getUserValue() {
		return this.user.getValue();
	}

	getCrmContacts(type = 'contact', status = 'all', per_page = 20, page = 1, search = '', include_owner = true) {
		let headers = new HttpHeaders();
		headers = headers.set('Authorization', 'Bearer ' + JWT_KEY);
		return this.http.get<any[]>(`${environment.apiUrl}/erp/v1/crm/contacts?type=${type}&status=${status}&per_page=${per_page}&page=${page}&search=${search}${include_owner ? '&include=owner' : ''}`, { headers: headers }).pipe(
			map(data => {
				return data;
			})
		);
	}

	CountCrmContacts(contact = true, company = true) {
		let headers = new HttpHeaders();
		headers = headers.set('Authorization', 'Bearer ' + JWT_KEY);
		return this.http.get<any[]>(`${environment.apiUrl}/erp/v1/crm/contacts/count?contact=${contact}&company=${company}`, { headers: headers }).pipe(
			map(data => {
				return data;
			})
		);
	}

	getContactDetail(id, include_owner = true) {
		let headers = new HttpHeaders();
		headers = headers.set('Authorization', 'Bearer ' + JWT_KEY);
		return this.http.get<any[]>(`${environment.apiUrl}/erp/v1/crm/contacts/${id}${include_owner ? '?include=owner' : ''}`, { headers: headers }).pipe(
			map(data => {
				return data;
			})
		);
	}

	addNewContact(contactData) {
		return this.http.post(`${environment.apiUrl}/erp/v1/crm/contacts`, contactData).pipe(
			map(data => {
				return data;
			})
		);
	}

	updateContact(contactData, id) {
		return this.http.put(`${environment.apiUrl}/erp/v1/crm/contacts/${id}`, contactData).pipe(
			map(data => {
				return data;
			})
		);
	}

	deleteContact(id, hard = 0) {
		let headers = new HttpHeaders();
		headers = headers.set('Authorization', 'Bearer ' + JWT_KEY);
		return this.http.delete(`${environment.apiUrl}/erp/v1/crm/contacts/${id}`).pipe(
			map(data => {
				return data;
			})
		);
	}

	addNewCompany(companyData) {
		return this.http.post(`${environment.apiUrl}/erp/v1/crm/contacts/company`, companyData).pipe(
			map(data => {
				return data;
			})
		);
	}

	updateCompany(companyData, id) {
		return this.http.put(`${environment.apiUrl}/erp/v1/crm/contacts/company/${id}`, companyData).pipe(
			map(data => {
				return data;
			})
		);
	}

	deleteCompany(id, hard = 0) {
		let headers = new HttpHeaders();
		headers = headers.set('Authorization', 'Bearer ' + JWT_KEY);
		return this.http.delete(`${environment.apiUrl}/erp/v1/crm/contacts/company/${id}`).pipe(
			map(data => {
				return data;
			})
		);
	}

	//Contact Groups

	getCrmContactGroups(page = 1, per_page = 20, search = '') {
		let headers = new HttpHeaders();
		headers = headers.set('Authorization', 'Bearer ' + JWT_KEY);
		return this.http.get<any[]>(`${environment.apiUrl}/erp/v1/crm/contacts/groups?per_page=${per_page}&page=${page}&search=${search}`, { headers: headers }).pipe(
			map(data => {
				return data;
			})
		);
	}

	getContactGroupDetail(contactGrpId) {
		let headers = new HttpHeaders();
		headers = headers.set('Authorization', 'Bearer ' + JWT_KEY);
		return this.http.get<any[]>(`${environment.apiUrl}/erp/v1/crm/contacts/groups/${contactGrpId}`, { headers: headers }).pipe(
			map(data => {
				return data;
			})
		);
	}

	addNewContactGroup(contactData) {
		return this.http.post(`${environment.apiUrl}/erp/v1/crm/contacts/groups`, contactData).pipe(
			map(data => {
				return data;
			})
		);
	}

	updateContactGroup(contactData, id) {
		return this.http.put(`${environment.apiUrl}/erp/v1/crm/contacts/groups/${id}`, contactData).pipe(
			map(data => {
				return data;
			})
		);
	}

	deleteContactGroup(id, hard = 0) {
		let headers = new HttpHeaders();
		headers = headers.set('Authorization', 'Bearer ' + JWT_KEY);
		return this.http.delete(`${environment.apiUrl}/erp/v1/crm/contacts/groups/${id}`).pipe(
			map(data => {
				return data;
			})
		);
	}

	getContactGrpSubs(contactGrpId, page = 1, per_page = 10) {
		let headers = new HttpHeaders();
		headers = headers.set('Authorization', 'Bearer ' + JWT_KEY);
		return this.http.get<any[]>(`${environment.apiUrl}/erp/v1/crm/contacts/groups/${contactGrpId}/subscribes?per_page=${per_page}&page=${page}`, { headers: headers }).pipe(
			map(data => {
				return data;
			})
		);
	}

	subscribeContact(group_id, contact_ids) {
		let headers = new HttpHeaders();
		headers = headers.set('Authorization', 'Bearer ' + JWT_KEY);
		return this.http.post(`${environment.apiUrl}/erp/v1/crm/contacts/groups/${group_id}/subscribes`, { contact_ids: contact_ids }).pipe(
			map(data => {
				return data;
			})
		);
	}

	unsubContact(group_id, contact_id) {
		let headers = new HttpHeaders();
		headers = headers.set('Authorization', 'Bearer ' + JWT_KEY);
		return this.http.delete(`${environment.apiUrl}/erp/v1/crm/contacts/groups/${group_id}/subscribes/${contact_id}`).pipe(
			map(data => {
				return data;
			})
		);
	}

	//Activities
	getActivities(customer_id = '', per_page = 10, page = 1, type = 'log%7Cnote%7Cemail%7Cschedule%7Ctask') {
		let headers = new HttpHeaders();
		headers = headers.set('Authorization', 'Bearer ' + JWT_KEY);
		return this.http.get<any[]>(`${environment.apiUrl}/erp/v1/crm/activities?type=${type}&per_page=${per_page}&page=${page}&customer_id=${customer_id}`, { headers: headers }).pipe(
			map(data => {
				return data;
			})
		);
	}

	addActivity(activityData) {
		return this.http.post(`${environment.apiUrl}/erp/v1/crm/activities`, activityData).pipe(
			map(data => {
				return data;
			})
		);
	}

	getActivityDetail(id) {
		let headers = new HttpHeaders();
		headers = headers.set('Authorization', 'Bearer ' + JWT_KEY);
		return this.http.get<any[]>(`${environment.apiUrl}/erp/v1/crm/activities/${id}`, { headers: headers }).pipe(
			map(data => {
				return data;
			})
		);
	}

	updateActivity(id, formData) {
		return this.http.put(`${environment.apiUrl}/erp/v1/crm/activities/${id}`, formData).pipe(
			map(data => {
				return data;
			})
		);
	}

	deleteActivity(id) {
		let headers = new HttpHeaders();
		headers = headers.set('Authorization', 'Bearer ' + JWT_KEY);
		return this.http.delete(`${environment.apiUrl}/erp/v1/crm/activities/${id}`).pipe(
			map(data => {
				return data;
			})
		);
	}

	//Schedules

	getSchedules(tab = 'own', per_page = 40, page = 1) {
		let headers = new HttpHeaders();
		headers = headers.set('Authorization', 'Bearer ' + JWT_KEY);
		return this.http.get<any[]>(`${environment.apiUrl}/erp/v1/crm/schedules?tab=${tab}&per_page=${per_page}&page=${page}`, { headers: headers }).pipe(
			map(data => {
				return data;
			})
		);
	}
}
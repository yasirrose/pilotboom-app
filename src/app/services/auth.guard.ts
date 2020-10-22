import { Injectable, ɵConsole } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { RestService } from './rest.service';

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate {
	user = this.restApi.getCurrentUser();
	constructor(
		private router: Router,
		private restApi: RestService
	) { }

	canActivate(route: ActivatedRouteSnapshot): boolean {
		this.user.subscribe(user => {
			if (!user) {
				this.router.navigate(["/login"]);
				return false;
			}
		});
		return true;
	}
}

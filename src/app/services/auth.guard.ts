import { Injectable, ɵConsole } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GlobalService } from './global.service';
import { NetworkService } from './network.service';
import { RestService } from './rest.service';

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate {
	user = this.restApi.getCurrentUser();
	constructor(
		private router: Router,
		private restApi: RestService,
		private global: GlobalService
	) { }

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		if (!this.global.checkConnection(state.url == '/dashboard')) {
			return false;
		}

		this.user.subscribe(user => {
			if (!user) {
				this.router.navigate(["/login"]);
				return false;
			}
		});
		return true;
	}
}

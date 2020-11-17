// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var production = false;

var baseUrl: any;
var apiUrl: any;
if (production) {
	baseUrl = 'https://demo.pilotboom.com';
	apiUrl = 'https://demo.pilotboom.com/wp-json';
} else {
	baseUrl = 'http://localhost/pilotboom';
	apiUrl = 'http://localhost/pilotboom/wp-json';
}

export const environment = {
	production: production,
	environmentName: 'Development Environment',
	ionicEnvName: 'dev',
	baseUrl: baseUrl,
	apiUrl: apiUrl,
	key: ",GV7|uQrxQ0)8$lN..:m1R@WSKA{v58yq6l4}I&(eAAaeGheZ;gW:>-q{I6}fv;W'",
	showloader: true
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

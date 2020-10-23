import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'dashboard',
		pathMatch: 'full'
	},
	{
		path: 'login',
		loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
	},
	{
		path: 'dashboard',
		loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardPageModule),
		canActivate: [AuthGuard]
	},
	{
		path: 'contacts',
		loadChildren: () => import('./pages/contacts/contacts.module').then(m => m.ContactsPageModule),
		canActivate: [AuthGuard]
	},
	{
		path: 'companies',
		loadChildren: () => import('./pages/companies/companies.module').then(m => m.CompaniesPageModule),
		canActivate: [AuthGuard]
	},
	{
		path: 'activities',
		loadChildren: () => import('./pages/activities/activities.module').then(m => m.ActivitiesPageModule),
		canActivate: [AuthGuard]
	},
	{
		path: 'schedules',
		loadChildren: () => import('./pages/schedules/schedules.module').then(m => m.SchedulesPageModule),
		canActivate: [AuthGuard]
	},
	{
		path: 'posts',
		loadChildren: () => import('./pages/posts/posts.module').then(m => m.PostsPageModule),
		canActivate: [AuthGuard]
	},
	{
		path: 'addcontact',
		loadChildren: () => import('./pages/add-contact/add-contact.module').then(m => m.AddContactPageModule),
		canActivate: [AuthGuard]
	},
	{
		path: 'addcompany',
		loadChildren: () => import('./pages/add-company/add-company.module').then(m => m.AddCompanyPageModule),
		canActivate: [AuthGuard]
	},
	{
		path: 'contact-details',
		loadChildren: () => import('./pages/contact-details/contact-details.module').then(m => m.ContactDetailsPageModule),
		canActivate: [AuthGuard]
	},
	{
		path: 'edit-contact',
		loadChildren: () => import('./pages/edit-contact/edit-contact.module').then(m => m.EditContactPageModule),
		canActivate: [AuthGuard]
	},
	{
		path: 'company-details',
		loadChildren: () => import('./pages/company-details/company-details.module').then(m => m.CompanyDetailsPageModule),
		canActivate: [AuthGuard]
	},
	{
		path: 'edit-company',
		loadChildren: () => import('./pages/edit-company/edit-company.module').then(m => m.EditCompanyPageModule),
		canActivate: [AuthGuard]
	},
	{
		path: 'contact-groups',
		loadChildren: () => import('./pages/contact-groups/contact-groups.module').then(m => m.ContactGroupsPageModule),
		canActivate: [AuthGuard]
	},
	{
		path: 'contact-group-subs',
		loadChildren: () => import('./pages/contact-group-subs/contact-group-subs.module').then(m => m.ContactGroupSubsPageModule),
		canActivate: [AuthGuard]
	},
	{
		path: 'add-contact-group',
		loadChildren: () => import('./pages/add-contact-group/add-contact-group.module').then(m => m.AddContactGroupPageModule),
		canActivate: [AuthGuard]
	},
	{
		path: 'edit-contact-group',
		loadChildren: () => import('./pages/edit-contact-group/edit-contact-group.module').then(m => m.EditContactGroupPageModule),
		canActivate: [AuthGuard]
	},
	// {
	// 	path: 'subscribe',
	// 	loadChildren: () => import('./modal/subscribe/subscribe.module').then(m => m.SubscribePageModule)
	// },
	{
		path: 'contact-activities',
		loadChildren: () => import('./pages/contact-activities/contact-activities.module').then(m => m.ContactActivitiesPageModule),
		canActivate: [AuthGuard]
	},
	{
		path: 'add-activity',
		loadChildren: () => import('./pages/add-activity/add-activity.module').then(m => m.AddActivityPageModule),
		canActivate: [AuthGuard]
	},
	{
		path: 'edit-activity',
		loadChildren: () => import('./pages/edit-activity/edit-activity.module').then(m => m.EditActivityPageModule),
		canActivate: [AuthGuard]
	},
	{
		path: 'auto-blogging',
		loadChildren: () => import('./pages/auto-blogging/auto-blogging.module').then(m => m.AutoBloggingPageModule),
		canActivate: [AuthGuard]
	},
	{
		path: 'autoblog-details',
		loadChildren: () => import('./pages/autoblog-details/autoblog-details.module').then(m => m.AutoblogDetailsPageModule),
		canActivate: [AuthGuard]
	},
	{
		path: 'add-autoblog',
		loadChildren: () => import('./pages/add-autoblog/add-autoblog.module').then(m => m.AddAutoblogPageModule),
		canActivate: [AuthGuard]
	},
	{
		path: 'edit-autoblog',
		loadChildren: () => import('./pages/edit-autoblog/edit-autoblog.module').then(m => m.EditAutoblogPageModule),
		canActivate: [AuthGuard]
	},



];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
	],
	exports: [RouterModule]
})
export class AppRoutingModule { }

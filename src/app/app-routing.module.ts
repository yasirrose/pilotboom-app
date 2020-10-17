import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path: '',
		redirectTo: 'login',
		pathMatch: 'full'
	},
	{
		path: 'home',
		loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule)
	},
	{
		path: 'login',
		loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
	},
	{
		path: 'dashboard',
		loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardPageModule)
	},
	{
		path: 'contacts',
		loadChildren: () => import('./pages/contacts/contacts.module').then(m => m.ContactsPageModule)
	},
	{
		path: 'companies',
		loadChildren: () => import('./pages/companies/companies.module').then(m => m.CompaniesPageModule)
	},
	{
		path: 'activities',
		loadChildren: () => import('./pages/activities/activities.module').then(m => m.ActivitiesPageModule)
	},
	{
		path: 'schedules',
		loadChildren: () => import('./pages/schedules/schedules.module').then(m => m.SchedulesPageModule)
	},
	{
		path: 'posts',
		loadChildren: () => import('./pages/posts/posts.module').then(m => m.PostsPageModule)
	},
	{
		path: 'addcontact',
		loadChildren: () => import('./pages/add-contact/add-contact.module').then(m => m.AddContactPageModule)
	},
	{
		path: 'addcompany',
		loadChildren: () => import('./pages/add-company/add-company.module').then(m => m.AddCompanyPageModule)
	},
	{
		path: 'contact-details',
		loadChildren: () => import('./pages/contact-details/contact-details.module').then(m => m.ContactDetailsPageModule)
	},
	{
		path: 'edit-contact',
		loadChildren: () => import('./pages/edit-contact/edit-contact.module').then(m => m.EditContactPageModule)
	},
	{
		path: 'company-details',
		loadChildren: () => import('./pages/company-details/company-details.module').then(m => m.CompanyDetailsPageModule)
	},
	{
		path: 'edit-company',
		loadChildren: () => import('./pages/edit-company/edit-company.module').then(m => m.EditCompanyPageModule)
	},
	{
		path: 'contact-groups',
		loadChildren: () => import('./pages/contact-groups/contact-groups.module').then(m => m.ContactGroupsPageModule)
	},
	{
		path: 'contact-group-subs',
		loadChildren: () => import('./pages/contact-group-subs/contact-group-subs.module').then(m => m.ContactGroupSubsPageModule)
	},
	{
		path: 'add-contact-group',
		loadChildren: () => import('./pages/add-contact-group/add-contact-group.module').then(m => m.AddContactGroupPageModule)
	},
	{
		path: 'edit-contact-group',
		loadChildren: () => import('./pages/edit-contact-group/edit-contact-group.module').then(m => m.EditContactGroupPageModule)
	},
	// {
	// 	path: 'subscribe',
	// 	loadChildren: () => import('./modal/subscribe/subscribe.module').then(m => m.SubscribePageModule)
	// },
	{
		path: 'contact-activities',
		loadChildren: () => import('./pages/contact-activities/contact-activities.module').then(m => m.ContactActivitiesPageModule)
	},
	{
		path: 'add-activity',
		loadChildren: () => import('./pages/add-activity/add-activity.module').then(m => m.AddActivityPageModule)
	},
	{
		path: 'edit-activity',
		loadChildren: () => import('./pages/edit-activity/edit-activity.module').then(m => m.EditActivityPageModule)
	},

];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
	],
	exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'contacts',
    loadChildren: () => import('./contacts/contacts.module').then( m => m.ContactsPageModule)
  },
  {
    path: 'companies',
    loadChildren: () => import('./companies/companies.module').then( m => m.CompaniesPageModule)
  },
  {
    path: 'activities',
    loadChildren: () => import('./activities/activities.module').then( m => m.ActivitiesPageModule)
  },
  {
    path: 'schedules',
    loadChildren: () => import('./schedules/schedules.module').then( m => m.SchedulesPageModule)
  },
  {
    path: 'addcontact',
    loadChildren: () => import('./add-contact/add-contact.module').then( m => m.AddContactPageModule)
  },
  {
    path: 'addcompany',
    loadChildren: () => import('./add-company/add-company.module').then( m => m.AddCompanyPageModule)
  },
  {
    path: 'viewcontacts',
    loadChildren: () => import('./viewcontacts/viewcontacts.module').then( m => m.ViewcontactsPageModule)
  },
  {
    path: 'chat',
    loadChildren: () => import('./chat/chat.module').then( m => m.ChatPageModule)
  },
  {
    path: 'listing',
    loadChildren: () => import('./listing/listing.module').then( m => m.ListingPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

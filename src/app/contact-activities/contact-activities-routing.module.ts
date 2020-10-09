import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContactActivitiesPage } from './contact-activities.page';

const routes: Routes = [
  {
    path: '',
    component: ContactActivitiesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContactActivitiesPageRoutingModule {}

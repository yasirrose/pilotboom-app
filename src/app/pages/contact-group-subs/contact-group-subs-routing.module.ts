import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContactGroupSubsPage } from './contact-group-subs.page';

const routes: Routes = [
  {
    path: '',
    component: ContactGroupSubsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContactGroupSubsPageRoutingModule {}

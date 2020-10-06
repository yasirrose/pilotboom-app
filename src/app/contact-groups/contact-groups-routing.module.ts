import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ContactGroupsPage } from './contact-groups.page';

const routes: Routes = [
  {
    path: '',
    component: ContactGroupsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContactGroupsPageRoutingModule {}

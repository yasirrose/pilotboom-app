import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewcontactsPage } from './viewcontacts.page';

const routes: Routes = [
  {
    path: '',
    component: ViewcontactsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewcontactsPageRoutingModule {}

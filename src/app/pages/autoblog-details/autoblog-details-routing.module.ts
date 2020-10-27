import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AutoblogDetailsPage } from './autoblog-details.page';

const routes: Routes = [
  {
    path: '',
    component: AutoblogDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AutoblogDetailsPageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddAutoblogPage } from './add-autoblog.page';

const routes: Routes = [
  {
    path: '',
    component: AddAutoblogPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddAutoblogPageRoutingModule {}

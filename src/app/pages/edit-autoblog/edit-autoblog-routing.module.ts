import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditAutoblogPage } from './edit-autoblog.page';

const routes: Routes = [
  {
    path: '',
    component: EditAutoblogPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditAutoblogPageRoutingModule {}

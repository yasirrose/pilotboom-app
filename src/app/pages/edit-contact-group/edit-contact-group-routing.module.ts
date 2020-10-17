import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditContactGroupPage } from './edit-contact-group.page';

const routes: Routes = [
  {
    path: '',
    component: EditContactGroupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditContactGroupPageRoutingModule {}

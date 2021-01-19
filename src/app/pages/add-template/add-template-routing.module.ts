import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddTemplatePage } from './add-template.page';

const routes: Routes = [
  {
    path: '',
    component: AddTemplatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddTemplatePageRoutingModule {}

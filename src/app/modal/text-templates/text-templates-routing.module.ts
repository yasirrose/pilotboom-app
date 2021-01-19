import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TextTemplatesPage } from './text-templates.page';

const routes: Routes = [
  {
    path: '',
    component: TextTemplatesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TextTemplatesPageRoutingModule {}

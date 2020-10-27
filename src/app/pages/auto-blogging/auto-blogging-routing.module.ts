import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AutoBloggingPage } from './auto-blogging.page';

const routes: Routes = [
  {
    path: '',
    component: AutoBloggingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AutoBloggingPageRoutingModule {}

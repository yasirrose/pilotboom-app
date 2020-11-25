import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChatListingPage } from './chat-listing.page';

const routes: Routes = [
  {
    path: '',
    component: ChatListingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatListingPageRoutingModule {}

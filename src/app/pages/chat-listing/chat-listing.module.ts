import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ChatListingPageRoutingModule } from './chat-listing-routing.module';
import { ChatListingPage } from './chat-listing.page';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		ChatListingPageRoutingModule
	],
	declarations: [ChatListingPage]
})
export class ChatListingPageModule { }

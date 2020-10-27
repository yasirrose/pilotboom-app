import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SubscribePageRoutingModule } from './subscribe-routing.module';
import { SubscribePage } from './subscribe.page';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
	imports: [
		CommonModule,
		BrowserModule,
		FormsModule,
		IonicModule,
		SubscribePageRoutingModule,
		ReactiveFormsModule
	],
	declarations: [SubscribePage]
})
export class SubscribePageModule { }

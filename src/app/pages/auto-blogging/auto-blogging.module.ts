import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AutoBloggingPageRoutingModule } from './auto-blogging-routing.module';
import { AutoBloggingPage } from './auto-blogging.page';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		AutoBloggingPageRoutingModule
	],
	declarations: [AutoBloggingPage]
})
export class AutoBloggingPageModule { }

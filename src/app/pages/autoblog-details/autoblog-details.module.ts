import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AutoblogDetailsPageRoutingModule } from './autoblog-details-routing.module';
import { AutoblogDetailsPage } from './autoblog-details.page';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		AutoblogDetailsPageRoutingModule
	],
	declarations: [AutoblogDetailsPage]
})
export class AutoblogDetailsPageModule { }

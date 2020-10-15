import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivitiesPageRoutingModule } from './activities-routing.module';
import { ActivitiesPage } from './activities.page';
import { FormatActivitiesPipe } from '../pipes/format-activities.pipe';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		ActivitiesPageRoutingModule,
	],
	declarations: [ActivitiesPage, FormatActivitiesPipe]
})
export class ActivitiesPageModule { }

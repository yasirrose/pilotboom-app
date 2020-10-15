import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ContactActivitiesPageRoutingModule } from './contact-activities-routing.module';
import { ContactActivitiesPage } from './contact-activities.page';
import { FormatActivitiesPipe } from '../pipes/format-activities.pipe';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		ContactActivitiesPageRoutingModule
	],
	declarations: [ContactActivitiesPage, FormatActivitiesPipe]
})
export class ContactActivitiesPageModule { }

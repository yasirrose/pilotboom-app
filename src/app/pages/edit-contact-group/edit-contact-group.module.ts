import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { EditContactGroupPageRoutingModule } from './edit-contact-group-routing.module';
import { EditContactGroupPage } from './edit-contact-group.page';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		EditContactGroupPageRoutingModule,
		ReactiveFormsModule
	],
	declarations: [EditContactGroupPage]
})
export class EditContactGroupPageModule { }

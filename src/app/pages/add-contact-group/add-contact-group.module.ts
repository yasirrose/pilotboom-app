import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AddContactGroupPageRoutingModule } from './add-contact-group-routing.module';
import { AddContactGroupPage } from './add-contact-group.page';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		AddContactGroupPageRoutingModule,
		ReactiveFormsModule
	],
	declarations: [AddContactGroupPage]
})
export class AddContactGroupPageModule { }

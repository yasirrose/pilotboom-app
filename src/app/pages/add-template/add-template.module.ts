import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AddTemplatePageRoutingModule } from './add-template-routing.module';
import { AddTemplatePage } from './add-template.page';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		AddTemplatePageRoutingModule,
		ReactiveFormsModule
	],
	declarations: [AddTemplatePage]
})
export class AddTemplatePageModule { }

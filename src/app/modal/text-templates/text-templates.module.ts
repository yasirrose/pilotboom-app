import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TextTemplatesPageRoutingModule } from './text-templates-routing.module';
import { TextTemplatesPage } from './text-templates.page';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		TextTemplatesPageRoutingModule,
		ReactiveFormsModule
	],
	declarations: [TextTemplatesPage]
})
export class TextTemplatesPageModule { }
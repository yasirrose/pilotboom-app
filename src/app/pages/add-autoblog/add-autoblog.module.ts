import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AddAutoblogPageRoutingModule } from './add-autoblog-routing.module';
import { AddAutoblogPage } from './add-autoblog.page';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		IonicModule,
		AddAutoblogPageRoutingModule,
		ReactiveFormsModule
	],
	declarations: [AddAutoblogPage]
})
export class AddAutoblogPageModule { }

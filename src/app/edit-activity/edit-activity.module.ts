import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditActivityPageRoutingModule } from './edit-activity-routing.module';

import { EditActivityPage } from './edit-activity.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditActivityPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [EditActivityPage]
})
export class EditActivityPageModule {}

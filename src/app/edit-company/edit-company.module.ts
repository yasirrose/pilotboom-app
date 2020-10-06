import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditCompanyPageRoutingModule } from './edit-company-routing.module';

import { EditCompanyPage } from './edit-company.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditCompanyPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [EditCompanyPage]
})
export class EditCompanyPageModule {}

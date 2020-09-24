import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddCompanyPageRoutingModule } from './add-company-routing.module';

import { AddCompanyPage } from './add-company.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddCompanyPageRoutingModule
  ],
  declarations: [AddCompanyPage]
})
export class AddCompanyPageModule {}

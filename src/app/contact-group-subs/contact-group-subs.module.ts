import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContactGroupSubsPageRoutingModule } from './contact-group-subs-routing.module';

import { ContactGroupSubsPage } from './contact-group-subs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContactGroupSubsPageRoutingModule
  ],
  declarations: [ContactGroupSubsPage]
})
export class ContactGroupSubsPageModule {}

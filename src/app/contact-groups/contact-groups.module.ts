import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContactGroupsPageRoutingModule } from './contact-groups-routing.module';

import { ContactGroupsPage } from './contact-groups.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ContactGroupsPageRoutingModule
  ],
  declarations: [ContactGroupsPage]
})
export class ContactGroupsPageModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewcontactsPageRoutingModule } from './viewcontacts-routing.module';

import { ViewcontactsPage } from './viewcontacts.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ViewcontactsPageRoutingModule
  ],
  declarations: [ViewcontactsPage]
})
export class ViewcontactsPageModule {}

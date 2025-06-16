import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AcercadePageRoutingModule } from './acercade-routing.module';
import { NombreCompaniaComponent } from '../components/nombre-compania/nombre-compania/nombre-compania.component';

import { AcercadePage } from './acercade.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AcercadePageRoutingModule,
    NombreCompaniaComponent
  ],
  declarations: [AcercadePage]
})
export class AcercadePageModule {}

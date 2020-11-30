import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StockPicksPageRoutingModule } from './stock-picks-routing.module';

import { StockPicksPage } from './stock-picks.page';
import { StockInputComponent } from '../components/stock-input/stock-input.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    StockPicksPageRoutingModule
  ],
  declarations: [
    StockPicksPage,
    StockInputComponent,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class StockPicksPageModule {}

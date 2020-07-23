import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { PricingComponent } from './pricing.component';
import { YearlyComponent } from './yearly/yearly.component';
import { MonthlyComponent } from './monthly/monthly.component';

export const routes = [
  { path: '', component: PricingComponent, pathMatch: 'full'  }
];

@NgModule({
  declarations: [
    PricingComponent, 
    YearlyComponent, 
    MonthlyComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class PricingModule { }

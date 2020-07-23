import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AgmCoreModule } from '@agm/core'; 
import { MatVideoModule } from 'mat-video';
import { SharedModule } from '../../shared/shared.module';
import { OffersComponent } from './offers.component';
import { OfferComponent } from './offer/offer.component';

export const routes = [
  { path: '', component: OffersComponent, pathMatch: 'full' },
  { path: ':id', component: OfferComponent }
];

@NgModule({
  declarations: [
    OffersComponent, 
    OfferComponent
  ],
  exports: [
    OffersComponent, 
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AgmCoreModule, 
    MatVideoModule,
    SharedModule
  ]
})
export class OffersModule { }

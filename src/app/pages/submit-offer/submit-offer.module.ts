import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { AgmCoreModule } from '@agm/core';  
import { InputFileModule } from 'ngx-input-file';
import { SubmitOfferComponent } from './submit-offer.component';

export const routes = [
  { path: '', component: SubmitOfferComponent, pathMatch: 'full'  }
];

@NgModule({
  declarations: [SubmitOfferComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    AgmCoreModule, 
    InputFileModule
  ]
})
export class SubmitOfferModule { }

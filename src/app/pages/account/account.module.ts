import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { InputFileModule } from 'ngx-input-file';
import { AgmCoreModule } from '@agm/core';  
import { AccountComponent } from './account.component';
import { DashboardComponent } from './dashboard/dashboard.component'; 
import { MyOffersComponent } from './my-offers/my-offers.component';
import { DealControlPanelComponent } from './deal-control-panel/deal-control-panel.component';
import { ProfileComponent } from './profile/profile.component';
import { EditOfferComponent } from './edit-offer/edit-offer.component';

export const routes = [
  { 
    path: '', 
    component: AccountComponent, children: [
      { path: '', redirectTo: 'profile', pathMatch: 'full' }, 
      { path: 'my-offers', component: MyOffersComponent },
      { path: 'my-offers/:id', component: EditOfferComponent },
      { path: 'deal-control-panel', component: DealControlPanelComponent },
      { path: 'profile', component: ProfileComponent }
    ]
  }
];

@NgModule({
  declarations: [
    DashboardComponent,
    AccountComponent,  
    MyOffersComponent, 
    DealControlPanelComponent, 
    ProfileComponent, 
    EditOfferComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    InputFileModule,
    AgmCoreModule
  ]
})
export class AccountModule { }

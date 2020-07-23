import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { CompareComponent } from './compare.component';

export const routes = [
  { path: '', component: CompareComponent, pathMatch: 'full'  }
];

@NgModule({
  declarations: [CompareComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class CompareModule { }

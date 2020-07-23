import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { MissionComponent } from './mission.component';

export const routes = [
  { path: '', component: MissionComponent, pathMatch: 'full'  }
];

@NgModule({
  declarations: [MissionComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class MissionModule { }

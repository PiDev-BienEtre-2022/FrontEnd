import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { mytrainingComponent } from './mytraining.component';
import { AllTrainingComponent } from './all-training/all-training.component';
import { AllowdTrainingComponent } from './allowd-training/allowd-training.component';
import { ParticipationTrainingComponent } from './participation-training/participation-training.component';

const routes: Routes = [
  {
    path: '',
    component: mytrainingComponent,
    children: [
      {
        path: 'all',
        component: AllTrainingComponent,
      },
      {
        path: 'allowd',
        component: AllowdTrainingComponent,
      },
      {
        path: 'participation',
        component: ParticipationTrainingComponent,
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class mytrainingRoutingModule {
}


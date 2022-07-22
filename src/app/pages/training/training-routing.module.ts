import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TrainingComponent } from './training.component';
import { ListTrainingComponent } from './list-training/list-training.component';
import { AddTrainingComponent } from './add-training/add-training.component';

const routes: Routes = [
  {
    path: '',
    component: TrainingComponent,
    children: [
      {
        path: 'list',
        component: ListTrainingComponent,
      },
      {
        path: 'add',
        component: AddTrainingComponent,
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
export class TrainingRoutingModule {
}


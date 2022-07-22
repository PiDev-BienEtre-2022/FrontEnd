import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MyevaluationComponent } from './myevaluation.component';
import { ListEvaluationComponent } from './list-evaluation/list-evaluation.component';
import { DetailsEvaluationComponent } from './details-evaluation/details-evaluation.component';
import { AddGoalComponent } from './add-goal/add-goal.component';
import { EditGoalComponent } from './edit-goal/edit-goal.component';

const routes: Routes = [
  {
    path: '',
    component: MyevaluationComponent,
    children: [
      {
        path: 'add',
        component: AddGoalComponent,
      },
      {
        path: 'list',
        component: ListEvaluationComponent,
      },
      {
        path: 'details',
        component: DetailsEvaluationComponent,
      },
      {
        path: 'edit',
        component: EditGoalComponent,
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
export class  MyevaluationRoutingModule {
}


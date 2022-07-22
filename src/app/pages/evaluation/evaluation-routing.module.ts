import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EvaluationComponent } from './evaluation.component';
import { AddEvaluationComponent } from './add-evaluation/add-evaluation.component';
import { EditEvaluationComponent } from './edit-evaluation/edit-evaluation.component';
import { ListEvaluationComponent } from './list-evaluation/list-evaluation.component';
import { DetailsEvaluationComponent } from './details-evaluation/details-evaluation.component';
import { UserEvaluationComponent } from './user-evaluation/user-evaluation.component';
import { EditGoalComponent } from './edit-goal/edit-goal.component';

const routes: Routes = [
  {
    path: '',
    component: EvaluationComponent,
    children: [
      {
        path: 'add',
        component: AddEvaluationComponent,
      },
      {
        path: 'list',
        component: ListEvaluationComponent,
      },
      {
        path: 'userlist',
        component: UserEvaluationComponent,
      },
      {
        path: 'edit',
        component: AddEvaluationComponent,
      },
      {
        path: 'validate',
        component: EditEvaluationComponent,
      },
      {
        path: 'editGoal',
        component: EditGoalComponent,
      },
      {
        path: 'details',
        component: DetailsEvaluationComponent,
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
export class  EvaluationRoutingModule {
}


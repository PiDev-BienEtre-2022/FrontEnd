import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDatepickerModule, NbIconModule,
  NbInputModule,
  NbRadioModule,
  NbSelectModule,
  NbUserModule,
  NbTimepickerModule,
  NbTabsetModule,
  NbAccordionModule,
} from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';
import { EvaluationRoutingModule } from './evaluation-routing.module';
import { AddEvaluationComponent } from './add-evaluation/add-evaluation.component';
import { EditEvaluationComponent } from './edit-evaluation/edit-evaluation.component';
import { UserEvaluationComponent } from './user-evaluation/user-evaluation.component';
import { ListEvaluationComponent } from './list-evaluation/list-evaluation.component';
import { DetailsEvaluationComponent } from './details-evaluation/details-evaluation.component';
import { EditGoalComponent } from './edit-goal/edit-goal.component';
import { ChartModule } from 'angular2-chartjs';


@NgModule({
  imports: [
    ThemeModule,
    NbInputModule,
    NbCardModule,
    NbButtonModule,
    NbActionsModule,
    NbUserModule,
    NbCheckboxModule,
    NbRadioModule,
    NbDatepickerModule,
    EvaluationRoutingModule,
    NbSelectModule,
    NbIconModule,
    Ng2SmartTableModule,
    NbCardModule,
    NbTimepickerModule,
    FormsModule,
    NbTabsetModule,
    NbAccordionModule,
    ChartModule,
  ],
  declarations: [
    AddEvaluationComponent,
    ListEvaluationComponent,
    EditEvaluationComponent,
    EditGoalComponent,
    UserEvaluationComponent,
    DetailsEvaluationComponent,

  ],
})
export class EvaluationModule { }

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
import { MyevaluationRoutingModule } from './myevaluation-routing.module';
import { AddGoalComponent } from './add-goal/add-goal.component';
import { EditGoalComponent } from './edit-goal/edit-goal.component';
import { ListEvaluationComponent } from './list-evaluation/list-evaluation.component';
import { DetailsEvaluationComponent } from './details-evaluation/details-evaluation.component';

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
    MyevaluationRoutingModule,
    NbSelectModule,
    NbIconModule,
    Ng2SmartTableModule,
    NbCardModule,
    NbTimepickerModule,
    FormsModule,
    NbTabsetModule,
    NbAccordionModule,
    NbCardModule,

  ],
  declarations: [
    AddGoalComponent,
    EditGoalComponent,
    ListEvaluationComponent,
    DetailsEvaluationComponent
  ],
})
export class MyevaluationModule { }

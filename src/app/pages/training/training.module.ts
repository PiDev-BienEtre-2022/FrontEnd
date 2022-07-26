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
} from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';
import { AddTrainingComponent } from './add-training/add-training.component';
import { ListTrainingComponent } from './list-training/list-training.component';
import { TrainingRoutingModule } from './training-routing.module';


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
    TrainingRoutingModule,
    NbSelectModule,
    NbIconModule,
    Ng2SmartTableModule,
    NbCardModule,
    NbTimepickerModule,
    FormsModule,

  ],
  declarations: [
    ListTrainingComponent,
    AddTrainingComponent
  ],
})
export class TrainingModule { }

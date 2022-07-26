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
  NbAccordionModule,
} from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { ThemeModule } from '../../@theme/theme.module';
import { mytrainingRoutingModule } from './mytraining-routing.module';
import { AllTrainingComponent } from './all-training/all-training.component';
import { AllowdTrainingComponent } from './allowd-training/allowd-training.component';


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
    mytrainingRoutingModule,
    NbSelectModule,
    NbIconModule,
    Ng2SmartTableModule,
    NbCardModule,
    NbTimepickerModule,
    FormsModule,
    NbAccordionModule
  ],
  declarations: [
    AllTrainingComponent,
    AllowdTrainingComponent
  ],
})
export class mytrainingModule { }

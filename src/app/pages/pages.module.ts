import { NgModule } from '@angular/core';
import { NbCardModule, NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { WorkFromHomeComponent } from './work-from-home/work-from-home.component';
import { FilterComponent } from './filter/filter.component';
import { CategoryComponent } from './category/category.component';
import { EvaluationComponent } from './evaluation/evaluation.component';
import { MyevaluationComponent } from './myevaluation/myevaluation.component';
import { TrainingComponent } from './training/training.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    ECommerceModule,
    MiscellaneousModule,
    Ng2SmartTableModule,
    NbCardModule
  ],
  declarations: [
    PagesComponent,
    WorkFromHomeComponent,
    FilterComponent,
    CategoryComponent,
    EvaluationComponent,
    MyevaluationComponent,
    TrainingComponent,
  ],
})
export class PagesModule {
}

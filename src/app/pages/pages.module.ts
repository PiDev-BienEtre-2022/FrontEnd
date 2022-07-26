import { NgModule } from '@angular/core';
import { NbAccordionModule, NbActionsModule, NbButtonModule, NbCalendarComponent, NbCalendarKitModule, NbCalendarModule, NbCalendarRangeModule, NbCardModule, NbContextMenuModule, NbDatepickerModule, NbIconModule, NbInputModule, NbMenuModule, NbPopoverModule, NbSelectModule, NbTabsetModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { WorkFromHomeComponent } from './work-from-home/work-from-home.component';
import { FilterComponent } from './filter/filter.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DemandListComponent } from './demand-list/demand-list.component';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    ECommerceModule,
    MiscellaneousModule,
    Ng2SmartTableModule,
    NbCardModule,
    NbCalendarKitModule,
    NbCalendarModule,
    NbActionsModule,
    NbIconModule,
    FormsModule,
    ReactiveFormsModule,
    NbInputModule,
    NbButtonModule,
    NbSelectModule,
    NbTabsetModule,
    NbAccordionModule,
    NbDatepickerModule,
    NbCalendarRangeModule,
  ],
  declarations: [
    PagesComponent,
    WorkFromHomeComponent,
    FilterComponent,
    DemandListComponent
  ],
})
export class PagesModule {
}

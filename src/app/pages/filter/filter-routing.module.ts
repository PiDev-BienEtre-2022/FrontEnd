import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddFilterComponent } from './add-filter/add-filter.component';
import { FilterComponent } from './filter.component';
import { ListFilterComponent } from './list-filter/list-filter.component';

const routes: Routes = [
  {
    path: '',
    component: FilterComponent,
    children: [
      {
        path: 'addFilter',
        component: AddFilterComponent,
      },
      {
        path: 'list',
        component: ListFilterComponent,
      }
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
export class FilterRoutingModule {
}


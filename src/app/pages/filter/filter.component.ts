import { Component, NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';
import { FilterData } from '../../@core/data/FilterData';


@Component({
  selector: 'ngx-filter',
  template: `
    <router-outlet></router-outlet>
  `,
})
export class FilterComponent {

  
}

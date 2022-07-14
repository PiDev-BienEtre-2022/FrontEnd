import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';
import { FilterData } from '../../../@core/data/FilterData';

@Component({
  selector: 'ngx-list-filter',
  templateUrl: './list-filter.component.html',
  styleUrls: ['./list-filter.component.scss']
})
export class ListFilterComponent {

  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      id: {
        title: 'ID',
        type: 'number',
      },
      nom:{
        title: 'Filter Name',
        type: 'string',
      },
      eqPeriode:{
        title: 'Team Filter',
        type: 'string',
      }

    },
    mode:"external"
  };

  /**
   *  "nom": "Filter 2",
        "eqPeriode": "week",
        "eqFilterType": "fstatic",
        "eqMetrique": 4,
        "epPeriode": null,
        "epFilterType": null,
        "epMetrique": 0,
        "commitLogic": "onlyAccept",
        "runSchedule": "eachThur",
        "runAt": "13:36",
        "lastRun": null,
        "nextRun": null,
        "sortLogic": "byUrgency",
        "id": 25
   * 
   * 
   * 
   */
  source: LocalDataSource = new LocalDataSource();

  constructor(private service: FilterData,private router: Router) {
    this.service.getData().subscribe(data => {
      this.source.load(data);
    });;
    
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      event.confirm.resolve();
    } else {
      event.confirm.reject();
    }
  }

  onCreateClick(event): void {
    
    this.router.navigateByUrl('/pages/filter/addFilter');
  }

}

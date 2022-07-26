import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NbGlobalPhysicalPosition, NbToastrService, NbWindowService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { FilterData } from '../../../@core/data/FilterData';
import { StateService } from '../../../@core/utils';
import { Filter } from '../../../entities/filter';

@Component({
  selector: 'ngx-list-filter',
  templateUrl: './list-filter.component.html',
  styleUrls: ['./list-filter.component.scss']
})
export class ListFilterComponent {

  @ViewChild('contentTemplate', { static: true }) contentTemplate: TemplateRef<any>;
  positions = NbGlobalPhysicalPosition;
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
      nom:{
        title: 'Filter Name',
        type: 'string',
    
      },
      lastRun :{
        title: 'Last Run',
        type: 'string',
     
      },
      nextRun :{
        title: 'Next Run',
        type: 'string',
     
      },
    },
    mode:"external",
    actions: {
      columnTitle: 'Actions',
      add: true,
      edit: false,
      delete: false,
      custom: [
        { name: 'processrecord', title: '<i class="nb-loop"></i>'},
        { name: 'viewrecord', title: '<i class ="nb-search"></i>'},
        { name: 'editrecord', title: '<i class="nb-edit"></i>' },
        { name: 'deleterecord', title: '<i class="nb-trash"></i>' },
    ],
      position: 'right'
    },
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

  constructor(private toastrService: NbToastrService,private windowService: NbWindowService,private service: FilterData,private router: Router, private stateService: StateService) {
    this.service.getData().subscribe(data => {
      this.source.load(data);
    });
    
  }

  onCustomAction(event) {
    switch ( event.action) {
      case 'processrecord':
        this.onProcess(event);
        break;
      case 'viewrecord':
        this.onView(event);
        break;
      case 'editrecord':
        this.onEditClick(event);
        break;
      case 'deleterecord':
        this.onDeleteConfirm(event);
    }
  }


  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete this Filter?')) {
      this.service.delete(event.data.id).subscribe((data: any[])=>{
        this.showToast(this.positions.TOP_RIGHT, 'success', "delete" );
        this.service.getData().subscribe(data => {
          this.source.load(data);
        });
      });
    } 
  }

  showToast(position, status , action, nbProcess = 0) {
    if(action == "process"){
      var msg = "";
      if(nbProcess == 0){
        msg = "No Demand Found To be processed"
        this.toastrService.info(msg, `Info`,  {position} );
      }
      else if(nbProcess== 1){
        this.toastrService.show('1 Demand is Processed', `Success`,  {position, status} );
      }
      else{
        this.toastrService.info(nbProcess + ' Demands Are Processed', `Success`,  {position, status} );
      }
    }else{
      this.toastrService.show('Filter Deleted Successfully ', `Success`,  {position, status} );
    }
  }
  onProcess(event): void {
    if (window.confirm('Are you sure you want to process this Filter?')) {
      this.service.process(event.data.id).subscribe((data: any[])=>{
        this.showToast(this.positions.TOP_RIGHT, 'success' , "process",data.length);
        this.service.getData().subscribe(data => {
          this.source.load(data);
        });
      });
    } 
  }

  
  onView(event) {
    console.log(event);
    var ft : Filter = event.data;
    var accept = "";
    var perTeam = ft.eqFilterType != null && ft.eqFilterType != '';
    var ifStatic = false;
    if(perTeam){
      ifStatic = ft.eqFilterType == 'fstatic';
    }else{
      ifStatic = ft.epFilterType == 'fstatic';
    }

    if(!perTeam){
      accept = "<div>Demand accepted only if the Employee has less than <b> " + ft.epMetrique 
      + " </b> Demand Per <b> " + ft.epPeriode + "</b></div>";
    }
    else{
      if(ifStatic){
        accept = "<div>Demand accepted only if there are less than <b>" + ft.eqMetrique 
          + "</b> Demand for the team Per <b>" + ft.eqPeriode+ "</b></div>";
      }
      else{
        accept = "<div>Demand accepted only if the demand's numbers Per <b>"+ ft.eqPeriode 
        + "</b> is less than <b>" + ft.eqMetrique + "% </b> of the number of the employee for the team"+ "</div>";
      }
    }

    var commit = "";
    var run = "";
    var sortLogic = "";

    switch ( ft.sortLogic) {
      case 'byDateCreation':
        sortLogic = "Use FIFO for the sort logic"
        break;
      case 'byUrgency':
        sortLogic = "Handle Urgent Demand First " ;
        break;
      case 'lessNbrOfDaysThisMonth':
        sortLogic ="The Demand Handle Priority will be for the Employees that have less demands on the process week";
        break;
      case 'lessNbrOfDaysThisWeek':
        sortLogic ="The Demand Handle Priority will be for the Employees that have less demands on the process month";
        break;
    }

    switch ( ft.runSchedule) {
      case 'eachDemande':
        run = "Demand"
        break;
      case 'eachMon':
        run = "Monday At " + ft.runAt;
        break;
      case 'eachTues':
        run ="Tuesday At " + ft.runAt;
        break;
      case 'eachWed':
        run = "Wednesday At " + ft.runAt;
        break;
      case 'eachThur':
        run ="Thursday At " + ft.runAt;
        break;
      case 'eachFri':
        run = "Friday At " + ft.runAt;
        break;
      case 'eachSat':
        run = "Saturday At " + ft.runAt;
        break;
      case 'eachSun':
        run = "Sunday At " + ft.runAt;
        break;
    }

    
    switch ( ft.commitLogic) {
      case 'all':
        commit = "All Demands"
        break;
      case 'onlyAccept':
        commit = "Only if the Demand is accepted";
        break;
      case 'onlyRefus':
        commit ="Only if the Demand is Refused";
        break;
      case 'refusWithNoNote':
        commit = "Only if the Demand has no note and it is Refused ";
        break;
      case 'refusNotUrgent':
        commit ="Only if the Demand his not Urgent and it is Refused ";
        break;
      case 'refusUrgentAndLess':
        commit = "Only if the Demand is Urgent and it is Accepted ";
        break;
    }

    this.windowService.open(
      this.contentTemplate,
      {
        title: 'Filter Info - ' + ft.nom,
        context: {
          name: event.data.nom,
          acceptCriteria: accept,
          commit : commit,
          run : run,
          sortLogic:sortLogic
        },
      },
    );
  }

  onCreateClick(event): void {
    this.stateService.data = { mode : "Add"}
    this.router.navigateByUrl('/pages/filter/addFilter');
  }

  onEditClick(event): void {
    this.stateService.data = { mode : "Edit", filter : event.data}
    console.log(event.data)
    this.router.navigateByUrl('/pages/filter/addFilter');
  }
}

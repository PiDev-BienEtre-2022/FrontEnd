import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Demand } from '../../entities/demand';
import { FilterData } from '../../@core/data/FilterData';
import { Filter } from '../../entities/filter';
import { NbGlobalPhysicalPosition, NbToastrService, NbWindowService } from '@nebular/theme';
import { DemandData } from '../../@core/data/DemandData';
import { LocalDataSource } from 'ng2-smart-table';

@Component({
  selector: 'ngx-work-from-home',
  templateUrl: './work-from-home.component.html',
  styleUrls: ['./work-from-home.component.scss']
})
export class WorkFromHomeComponent implements OnInit {

  @ViewChild('contentTemplate', { static: true }) contentTemplate: TemplateRef<any>;

  date : Date;
  minDate = new Date();
  demand = new Demand();
  filter = new Filter();
  demands : Demand[];
  positions = NbGlobalPhysicalPosition;
  filterDates :any;
  period = "thisMonth";
  approvedDemands : Demand[];
  waitingDemands:Demand[];
  rejectedDemands:Demand[];

  waitingSource: LocalDataSource = new LocalDataSource();
  approvedSource: LocalDataSource = new LocalDataSource();
  rejectedSource: LocalDataSource = new LocalDataSource();

  settings = {
    columns: {
      dateCreation:{
        title: 'Date Creation',
        type: 'string',
    
      },
      dateDemande :{
        title: 'Date Demand',
        type: 'string',
     
      },
      urgency:{
        title: 'Urgency',
        type: 'string',
      },
      systemApprove:{
        title: 'System Approve',
        type: 'string',
      },
      managerApprove:{
        title: 'Manager Approve',
        type: 'string',
      },
      noteManager:{
        title: 'Note Manager',
        type: 'string',
      },
    },
    mode:"external",
    actions: {
      
      add: false,
      edit: false,
      delete: false
    },
  };

  constructor(private windowService: NbWindowService,private toastrService: NbToastrService,private filterService: FilterData, private demandService: DemandData) {
    this.filterService.getDataByUserId(1).subscribe(data => {
      this.filter = data;
    });
    this.demandService.getDataByUserId(1).subscribe(data => {
      this.demands = data;
      console.log(this.demands);
      this.approvedDemands = this.demands.filter(d => d.managerApprove == "approved" && new Date(d.dateDemande.toString()).getMonth() == new Date().getMonth());
      this.waitingDemands = this.demands.filter(d => d.managerApprove == "waiting" && new Date(d.dateDemande.toString()).getMonth() == new Date().getMonth());
      this.rejectedDemands = this.demands.filter(d => d.managerApprove == "rejected" && new Date(d.dateDemande.toString()).getMonth() == new Date().getMonth());
      this.filterDates = date => this.isInArray(this.demands,date);
      this.waitingSource.load(this.waitingDemands);
      this.rejectedSource.load(this.rejectedDemands);
      this.approvedSource.load(this.approvedDemands);
    });
  }

  ngOnInit(): void {
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)
    this.date = tomorrow;
  }

  handleDateChange(event){
    this.Clear();
    this.demand.dateDemande = event;
  }

  Clear(){
    this.demand.extra = false;
    this.demand.noteEmp = "";
    this.demand.reason = "";
    this.demand.urgency = ""
  }

  save()
  {
    this.demand.dateCreation = new Date();
    this.demand.dateDemande = this.date;
    this.demand.extra = false;
    this.demandService.addData(this.demand, 1).subscribe(
      data => {
       console.log(data);
       this.showToast(this.positions.TOP_RIGHT, 'success');
       this.Clear();
       this.demandService.getDataByUserId(1).subscribe(data => {
        this.demands = data;
        this.approvedDemands = this.demands.filter(d => d.managerApprove == "approved" && new Date(d.dateDemande.toString()).getMonth() == new Date().getMonth());
        this.waitingDemands = this.demands.filter(d => d.managerApprove == "waiting" && new Date(d.dateDemande.toString()).getMonth() == new Date().getMonth());
        this.rejectedDemands = this.demands.filter(d => d.managerApprove == "rejected" && new Date(d.dateDemande.toString()).getMonth() == new Date().getMonth());
        this.filterDates = date => this.isInArray(this.demands,date);
        this.waitingSource.load(this.waitingDemands);
        this.rejectedSource.load(this.rejectedDemands);
        this.approvedSource.load(this.approvedDemands);
      });
      },
      error => {
        console.log('Error', error);
      }
    )
  }
  showToast(position, status) {
    this.toastrService.show('Demand Added Successfully ', `Success`, { position, status });
  }

  isInArray(array, value) {
    var dt = this.formatDate(value);
    var tb = array.find((item : Demand) => {return item.dateDemande.toString() == dt})
    return (tb == undefined)
  }

 formatDate(d) {
    var  month = '' + (d.getMonth() + 1);
    var  day = '' + d.getDate();
    var year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
  }

  ViewMyDemandList(){
    this.windowService.open(
      this.contentTemplate,
      {
        title:"Demands List",
        context: {
         
        },
      },
    );
  }
  changePeriod(event){
    console.log(event)
    if(event == 'thisMonth'){
      this.approvedDemands = this.demands.filter(d => d.managerApprove == "approved" && new Date(d.dateDemande.toString()).getMonth() == new Date().getMonth());
      this.waitingDemands = this.demands.filter(d => d.managerApprove == "waiting" && new Date(d.dateDemande.toString()).getMonth() == new Date().getMonth());
      this.rejectedDemands = this.demands.filter(d => d.managerApprove == "rejected" && new Date(d.dateDemande.toString()).getMonth() == new Date().getMonth());
    }else{
      this.approvedDemands = this.demands.filter(d => d.managerApprove == "approved");
      this.waitingDemands = this.demands.filter(d => d.managerApprove == "waiting");
      this.rejectedDemands = this.demands.filter(d => d.managerApprove == "rejected");
    }
    this.waitingSource.load(this.waitingDemands);
    this.rejectedSource.load(this.rejectedDemands);
    this.approvedSource.load(this.approvedDemands);
  }

}

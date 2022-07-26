import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { NbCalendarRange, NbDateService, NbDialogService, NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { LocalDataSource } from 'ng2-smart-table';
import { DemandData } from '../../@core/data/DemandData';
import { Demand } from '../../entities/demand';

@Component({
  selector: 'ngx-demand-list',
  templateUrl: './demand-list.component.html',
  styleUrls: ['./demand-list.component.scss']
})
export class DemandListComponent implements OnInit {

  demands : Demand[];
  data : Demand[];
  positions = NbGlobalPhysicalPosition;
  range: NbCalendarRange<Date>;
  constructor(protected dateService: NbDateService<Date>,private toastrService: NbToastrService,private dialogService: NbDialogService, private demandService: DemandData) { 
    this.range = {
      start: this.dateService.getMonthStart(new Date()),
      end: this.dateService.getMonthEnd(new Date()),
    };
    this.demandService.getData().subscribe(data => {
      this.demands = data;
      this.data = data;
      this.demands = this.data.filter(d => new Date(d.dateDemande.toString()) > this.range.start &&new Date(d.dateDemande.toString()) < this.range.end )
      console.log(this.demands)
    });

  }


 
  ngOnInit(): void {
    
  }
   
  OpenFilter(contentTemplate){
    this.dialogService.open(contentTemplate)
  }

  approve(demand){
    if (window.confirm('Are you sure you want to Approve this Demand?')) {
      demand.managerApprove = 'approved'
      this.demandService.editData(demand).subscribe((data: any[])=>{
        this.showToast(this.positions.TOP_RIGHT, 'success', "Approved" );
        this.demandService.getData().subscribe(data => {
          this.data = data;
          this.demands = this.data.filter(d => new Date(d.dateDemande.toString()) > this.range.start &&new Date(d.dateDemande.toString()) < this.range.end )
        });
      });
    } 
  }

  filter(ref){
    this.demands = this.data.filter(d => new Date(d.dateDemande.toString()) > this.range.start &&new Date(d.dateDemande.toString()) < this.range.end )
    ref.close();
  }
  reject(demand){
    if (window.confirm('Are you sure you want to Reject this Demand?')) {
      demand.managerApprove = 'rejected'
      this.demandService.editData(demand).subscribe((data: any[])=>{
        this.showToast(this.positions.TOP_RIGHT, 'success', "Rejected" );
        this.demandService.getData().subscribe(data => {
          this.demands = data;
          console.log(this.demands)
        });
      });
    } 
  }
  
  showToast(position, status , action) {
    this.toastrService.success('Demand ' + action + ' Successfully', `Success`,  {position,status} );
  }
}

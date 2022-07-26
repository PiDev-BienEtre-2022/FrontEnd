import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NbGlobalPhysicalPosition, NbToastrService } from '@nebular/theme';
import { FilterData } from '../../../@core/data/FilterData';
import { StateService } from '../../../@core/utils';
import { Filter } from '../../../entities/filter';

@Component({
  selector: 'ngx-add-filter',
  templateUrl: './add-filter.component.html',
  styleUrls: ['./add-filter.component.scss']
})
export class AddFilterComponent implements OnInit {


  appliedFor = 'team';
  mode : string;
  filter : Filter;

  values = {
    filterType :"",
    filterMetric : 0,
    filterPeriod :"" ,
  }

  positions = NbGlobalPhysicalPosition;

  formControl = new FormControl(new Date());

  constructor(private toastrService: NbToastrService,private stateService: StateService,private router: Router ,private service: FilterData) {}

  ngOnInit(): void {
   
      
      if(this.stateService.data == undefined || this.stateService.data.mode == 'Add'){
        this.mode = 'Add';
        this.filter = new Filter();
        
      }
      else{
        this.mode = this.stateService.data.mode;
        this.filter = this.stateService.data.filter;
        var time = this.stateService.data.filter.runAt.split(":")
        var dt = new Date();
        dt.setHours(parseInt(time[0]));
        dt.setMinutes(parseInt(time[1]));
        if(this.stateService.data.filter.epFilterType == null || this.stateService.data.filter.epFilterType == "" ){
          this.values.filterType = this.stateService.data.filter.eqFilterType; 
          this.values.filterMetric = this.stateService.data.filter.eqMetrique;
          this.values.filterPeriod = this.stateService.data.filter.eqPeriode;
        }else{
          this.values.filterType = this.stateService.data.filter.epFilterType; 
          this.values.filterMetric = this.stateService.data.filter.epMetrique;
          this.values.filterPeriod = this.stateService.data.filter.epPeriode;
        }
        this.formControl.setValue(dt);
      }
      this.stateService.data = undefined;
  }


  save(){
    var dt = new Date(this.formControl.value);
      var h = dt.getHours().toString();
      var m = dt.getMinutes().toString();
      this.filter.runAt = h + ":" + m;
      
      if(this.appliedFor == 'team'){
        this.filter.eqFilterType = this.values.filterType;
        this.filter.eqMetrique = this.values.filterMetric;
        this.filter.eqPeriode = this.values.filterPeriod;
        this.filter.epFilterType = null;
        this.filter.epMetrique = 0;
        this.filter.epPeriode = null;
      }else{
        this.filter.epFilterType = this.values.filterType;
        this.filter.epMetrique = this.values.filterMetric;
        this.filter.epPeriode = this.values.filterPeriod;
        this.filter.eqFilterType =  null;
        this.filter.eqMetrique =  0;
        this.filter.eqPeriode =null;
        
      }

      console.log(this.filter);
    if(this.mode == 'Add')
    {
      this.service.addData(this.filter).subscribe(
        data => {
         console.log(data);
         this.showToast(this.positions.TOP_RIGHT, 'success')
         this.router.navigateByUrl('/pages/filter/list');
         
        },
        error => {
          console.log('Error', error);
        }
      )
    }
    else{
      this.service.editData(this.filter).subscribe(
        data => {
         console.log(data)
         this.showToast(this.positions.TOP_RIGHT, 'success')
         this.router.navigateByUrl('/pages/filter/list');
        },
        error => {
          console.log('Error', error);
        }
      )
    }

  }

  showToast(position, status) {
    if(this.mode == 'Add'){
      this.toastrService.show('Filter Added Successfully ', `Success`, { position, status });
    }else{
      this.toastrService.show('Filter Updated Successfully ', `Success`, { position, status });
    }
   
  }

  Cancel(){
    this.router.navigateByUrl('/pages/filter/list');
  }
  onChange(event){
    this.values.filterType = "";
    if(event = 'employee'){
      this.values.filterType = "fstatic";
    }
  }
}

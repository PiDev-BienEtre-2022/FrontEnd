import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';
import { EvaluationData } from '../../../@core/data/EvaluationData';
import { Evaluation } from '../../../entities/evaluation';

@Component({
  selector: 'ngx-list-evaluation',
  templateUrl: './list-evaluation.component.html',
  styleUrls: ['./list-evaluation.component.scss']
})
export class ListEvaluationComponent implements OnInit {
  currentEval : Evaluation; 
  evalList : Evaluation[];
  exist = false; 
  existList = false; 
  //id of conected user
  id = 1;

  constructor(private service: EvaluationData, private router: Router, private route: ActivatedRoute) { }


  ngOnInit(): void {

    this.service.currentEval(this.id).subscribe((data: any)=>{
      this.currentEval = data;
      if(Object.keys(this.currentEval).length!=0){
        this.exist = true; 
      }
    })

    this.service.MyEval(this.id).subscribe((data: any[])=>{
      this.evalList = data;
      if(this.evalList.length != 0){
        this.existList = true; 
      }
    })

  }


  viewDetails(id){
    this.router.navigate(['/pages/myevaluation/details'], { queryParams: { id: id} });
  }
  

  
}

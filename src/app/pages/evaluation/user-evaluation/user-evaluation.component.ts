import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';
import { EvaluationData } from '../../../@core/data/EvaluationData';
import { UserrData } from '../../../@core/data/UserData';
import { Evaluation } from '../../../entities/evaluation';
import { User } from '../../../entities/user';

@Component({
  selector: 'ngx-user-evaluation',
  templateUrl: './user-evaluation.component.html',
  styleUrls: ['./user-evaluation.component.scss']
})
export class UserEvaluationComponent implements OnInit {
  evalList : Evaluation[];
  user: any;
  existList = false; 
  id = 0;

  constructor(private service: EvaluationData,private userService: UserrData,  private router: Router, private route: ActivatedRoute) { }


  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        this.id = params.id;
      } );

      this.userService.getById(this.id).subscribe((data: any[])=>{
        this.user = data;
      
      })

      this.service.MyEval(this.id).subscribe((data: any[])=>{
        this.evalList = data;
        if(this.evalList.length != 0){
          this.existList = true; 
        }
      })
  }

  viewDetails(id){
    this.router.navigate(['/pages/evaluation/details'], { queryParams: { id: id} });
  }

  
}

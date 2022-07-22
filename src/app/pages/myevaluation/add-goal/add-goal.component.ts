import { NONE_TYPE } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EvaluationData } from '../../../@core/data/EvaluationData';
import { GoalData } from '../../../@core/data/GoalData';
import { Evaluation } from '../../../entities/evaluation';
import { Goal } from '../../../entities/Goal';
import { Category } from '../../../entities/category';
import { CategoryData } from '../../../@core/data/CategoryData';
import { User } from '../../../entities/user';


@Component({
  selector: 'ngx-add-goal',
  templateUrl: './add-goal.component.html',
  styleUrls: ['./add-goal.component.scss']
})
export class AddGoalComponent implements OnInit {
  id = 0;
  num = [] ;
  numOther = [] ;

  iduser : any;
  displayAdd = "none";
  evaluation : Evaluation;
  goal : Goal;
  user : User;
  CategoryDomainList: Category[];
  CategoryAllList: Category[];
  type="";
  message = "";
  displayBtn = "block";
  added = 0;
  one = 1;
  zero = 0;

  constructor(private service: GoalData, private serviceEval: EvaluationData, private serviceCategory: CategoryData, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.goal = new Goal;

    this.route.queryParams
    .subscribe(params => {
      this.id = params.id;
    } );

    this.serviceEval.getById(this.id).subscribe((result)=>{
      this.evaluation = result;
      this.iduser = this.evaluation.user.id;

      for (let i = 0; i < Number(this.evaluation.nb_goals_domain); i++) {
        this.num.push(i);
      }
      for (let i = Number(this.evaluation.nb_goals_domain); i < Number(this.evaluation.nb_goals_domain)+Number(this.evaluation.nb_goals_other); i++) {
        this.numOther.push(i);
      }

      this.serviceCategory.getDataByDomain(this.iduser).subscribe((result)=>{
        this.CategoryDomainList = result;
      })

      this.serviceCategory.getData().subscribe((result)=>{
        this.CategoryAllList = result;
      })
    })

    
   
 }

  add(goal){
    for (let i = 0; i < this.numOther.length + this.num.length ; i++) {
      let g = new Goal;

      this.added = 0;
      let t = 'title'+i;
      let c = 'category'+i;
      let d = 'description'+i;
      let l = 'domain'+i;

      if(goal[t] == "" || goal[c] == "" || goal[d] == ""){
          this.type = "alert-danger";
          this.displayAdd="block";
          this.message= "All fields are required !";
      }else{
        g.category= goal[c];
        g.titre= goal[t];
        g.description= goal[d];
        g.domain= goal[l];


        this.service.add(g, this.id).subscribe(
          data => {  
          },
          error => {
            console.log('Error', error);
          }
        )
        
        this.added = 1;
      }
      }
      if(this.added == 1){
        this.displayBtn = "none"  ;
        this.displayAdd="block";
        this.type = "alert-success";
        this.message= "Goals Added successfully !";

        setTimeout(() => {
          this.router.navigate(['/pages/myevaluation/details'], { queryParams: { id: this.id} });
        }, 2000); 
      }
    }
}

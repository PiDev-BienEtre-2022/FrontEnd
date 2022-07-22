import { NONE_TYPE } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EvaluationData } from '../../../@core/data/EvaluationData';
import { GoalData } from '../../../@core/data/GoalData';
import { Goal } from '../../../entities/Goal';
import { Category } from '../../../entities/category';
import { CategoryData } from '../../../@core/data/CategoryData';


@Component({
  selector: 'ngx-edit-goal',
  templateUrl: './edit-goal.component.html',
  styleUrls: ['./edit-goal.component.scss']
})
export class EditGoalComponent implements OnInit {
  id=0;
  displayBtn= "block";
  displayEdit = "none";
  public goal : Goal;
  CategoryAllList: Category[];
  

  constructor(private service: GoalData,private categoryService: CategoryData,  private serviceEval: EvaluationData, private serviceCategory: CategoryData, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams
    .subscribe(params => {
      this.id = params.id;
    } );

    this.service.getById(this.id).subscribe((result)=>{
      this.goal = result;
      if(this.goal.domain == "1"){
        this.serviceCategory.getDataByDomain(this.goal.evaluation.user.id).subscribe((result)=>{
          this.CategoryAllList = result;
        })
      }else{
        this.serviceCategory.getData().subscribe((result)=>{
          this.CategoryAllList = result;
        })
      }
    })

 }


  edit(goal){
    this.service.getById(this.id).subscribe((result)=>{
      this.goal = result;
    })

    this.goal.percentage = goal.percentage;

    this.service.editPercentage(this.goal, this.goal.evaluation.id, this.goal.category.id).subscribe(
      data => {  
      },
      error => {
        this.displayEdit = "block";
        this.displayBtn = "none";
        setTimeout(() => {
          this.router.navigate(['/pages/evaluation/validate'], { queryParams: { id: this.goal.evaluation.id} });
        }, 2000); 

        console.log('Error', error);
      }
    )
  }
}

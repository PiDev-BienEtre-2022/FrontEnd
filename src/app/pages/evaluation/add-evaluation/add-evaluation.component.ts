import { NONE_TYPE } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EvaluationData } from '../../../@core/data/EvaluationData';
import { Evaluation } from '../../../entities/evaluation';
import { Goal } from '../../../entities/goal';
import { User } from '../../../entities/user';

@Component({
  selector: 'ngx-add-evaluation',
  templateUrl: './add-evaluation.component.html',
  styleUrls: ['./add-evaluation.component.scss']
})
export class AddEvaluationComponent implements OnInit {
  
  evaluation  : Evaluation;
  displayBtn = "block";
  displayAdd = "none";
  displayEdit = "none";
  message = "";
  type="";
  Title = "";
  id = 0;
  column = false;
  UsersList : User[]; 
  myDate = new Date();
  goalsList : Goal[]; 
  empty = "block";
  nothing = "none";
  disabledValidate= false;
  listGoals = 'none !important';
  listGoalsBtn = 'none !important';

  filterFn = (date) => date > this.myDate;


  constructor(private service: EvaluationData, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.evaluation = new Evaluation;
    this.Title = "Add New Evaluation";
    this.evaluation.user = new User
   
    
    this.route.queryParams
    .subscribe(params => {
      this.id = params.id;
    } );

    if(this.id != 0){
      this.service.getById(this.id).subscribe((result)=>{
        this.evaluation = result;
        this.Title = "Edit Evaluation";
        this.column = true;
        this.listGoals = 'block';
        this.listGoalsBtn = 'block';

      });
    }
    this.service.getUsers().subscribe((data: any[])=>{
      this.UsersList = data;
    })

    this.service.getGoals(this.id).subscribe((data: any[])=>{
      this.goalsList = data;
      if(this.goalsList.length === 0){
        this.empty = 'none';
        this.nothing = "block";
        this.disabledValidate= true;

      }    
    })


 }

  add(evaluation){
    const date_eval = new Date(evaluation.date_eval);
    const date_goals = new Date(evaluation.date_goals);

    evaluation.date_eval = date_eval.setDate(date_eval.getDate()+1);
    evaluation.date_goals = date_eval.setDate(date_goals.getDate()+1)

    if(evaluation.id != undefined){
      console.log(this.evaluation)
      this.service.edit(evaluation.id , evaluation ).subscribe(
        data => {  
        },
        error => {
          this.displayAdd = "block";
          if(error.error.text == "Evaluation exist !"){
            this.type="alert-danger";
            this.message=error.error.text;
          }else {
            this.displayBtn = "none";
            this.type="alert-success";
            this.message="Evaluation updated successfully !";
            setTimeout(() => {
              this.router.navigate(['/pages/evaluation/list']);
            }, 2000); 
        }

          console.log('Error', error);
        }
      )
    }else{
      this.service.add(evaluation).subscribe( 
        data => {  
        },
        error => {
          this.displayAdd = "block";
          if(error.error.text == "Evaluation exist !"){
            this.type="alert-danger";
            this.message="This user already has an evaluation in progress !";
          }else {
            this.displayBtn = "none";
            this.type="alert-success";
            this.message="Evaluation added successfully !";
            setTimeout(() => {
              this.router.navigate(['/pages/evaluation/list']);
            }, 2000); 
          }
          console.log('Error', error);
        }
      )
      }
  
  }

  validateGoals(evaluation){
    this.service.validate(evaluation.id).subscribe(
      data => {  
      },
      error => {
        this.displayBtn = "none !important";
        this.listGoalsBtn = 'none !important';
        this.displayAdd = "block";

          this.type="alert-success";
          this.message="Evaluation validated successfully !";
          setTimeout(() => {
            this.router.navigate(['/pages/evaluation/list']);
          }, 2000); 

        console.log('Error', error);
      }
    )
  }


}

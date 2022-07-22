import { NONE_TYPE } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';
import { EvaluationData } from '../../../@core/data/EvaluationData';
import { GoalData } from '../../../@core/data/GoalData';
import { Evaluation } from '../../../entities/evaluation';
import { Goal } from '../../../entities/goal';
import { User } from '../../../entities/user';

@Component({
  selector: 'ngx-edit-evaluation',
  templateUrl: './edit-evaluation.component.html',
  styleUrls: ['./edit-evaluation.component.scss']
})
export class EditEvaluationComponent implements OnInit {
  id= 0 ;
  evaluation : Evaluation;
  displayBtn = "block";
  displayAdd = "none";

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
      titre:{
        title: 'Titre',
        type: 'string',
      },
      description:{
        title: 'Description',
        type: 'string',
      },
      categoryName :{
        title: 'Category',
        type: 'string',
      },
      percentage:{
        title: 'Percentage (%)',
        type: 'string',
      },
    },
    mode:"external",
    hideSubHeader: true,
    actions: {
      delete:false,
    }
  };

  source: LocalDataSource = new LocalDataSource();


  constructor(private service: EvaluationData,private serviceGolas: GoalData, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams
    .subscribe(params => {
      this.id = params.id;
    } );

    this.service.getById(this.id).subscribe((result)=>{
      this.evaluation = result;
    })

    this.serviceGolas.getData(this.id).subscribe(data => {
      for (let i = 0; i < data.length ; i++) {
        data[i].categoryName = data[i].category.nom;
      } 
      this.source.load(data);
    });
 }

 validate(evaluation){
    this.evaluation.comment = evaluation.comment;
    this.evaluation.finalValidate = "1";

    this.service.edit(Number(this.evaluation.id) ,  this.evaluation ).subscribe(
      data => {  
      },
      error => {
        this.displayBtn = "none";
        this.displayAdd = "block";

        setTimeout(() => {
          this.router.navigate(['/pages/evaluation/list']);
        }, 2000); 

        console.log('Error', error);
      }
    )
 }

 onEditGoal(event) : void {
  this.router.navigate(['/pages/evaluation/editGoal'], { queryParams: { id: event.data.id} });
}


}

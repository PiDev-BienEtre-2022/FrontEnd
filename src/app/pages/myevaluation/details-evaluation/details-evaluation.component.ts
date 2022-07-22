import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';
import { EvaluationData } from '../../../@core/data/EvaluationData';
import { GoalData } from '../../../@core/data/GoalData';
import { Evaluation } from '../../../entities/evaluation';

@Component({
  selector: 'ngx-details-evaluation',
  templateUrl: './details-evaluation.component.html',
  styleUrls: ['./details-evaluation.component.scss']
})
export class DetailsEvaluationComponent implements OnInit {
  id= 0 ;
  evaluation : Evaluation;
  size = 0;

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
    },
    mode:"external",
    hideSubHeader: true,
    actions: {
      delete:false,
    }
  };

  settingsValidated = {
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
      percentage :{
        title: 'Percentage',
        type: 'string',
      },
    },
    mode:"external",
    hideSubHeader: true,
    actions: false,
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: EvaluationData,private serviceGolas: GoalData, private router: Router, private route: ActivatedRoute) { 
   
  }

  
  ngOnInit(): void {
    this.route.queryParams
    .subscribe(params => {
      this.id = params.id;
    } );

    this.serviceGolas.getData(this.id).subscribe(data => {
      for (let i = 0; i < data.length ; i++) {
        data[i].categoryName = data[i].category.nom;
      } 
      this.size = data.length;
      this.source.load(data);
    });

    this.service.getById(this.id).subscribe((result)=>{
      console.log(result)
      this.evaluation = result;
    })

    this.service.getData().subscribe(data => {
      this.source.load(data);
    });
  }

  onCreateClick(id){
    this.router.navigate(['/pages/myevaluation/add'], { queryParams: { id: id} });
  }
  
  onEditConfirm(event) : void {
    this.router.navigate(['/pages/myevaluation/edit'], { queryParams: { id: event.data.id} });
  }



 
}

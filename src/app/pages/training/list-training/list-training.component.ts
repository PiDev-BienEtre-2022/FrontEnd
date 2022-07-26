import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';
import { TrainingData } from '../../../@core/data/TrainingData';

@Component({
  selector: 'ngx-list-training',
  templateUrl: './list-training.component.html',
  styleUrls: ['./list-training.component.scss']
})
export class ListTrainingComponent implements OnInit {
  displayDelete = "none";
  type = "";
  message="";

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
      label:{
        title: 'Training Label',
        type: 'string',
      },
      date:{
        title: 'Date',
        type: 'string',
      },
      nbParticipant:{
        title: 'Number of participant',
        type: 'string',
      },
      place:{
        title: 'Place',
        type: 'string',
      },
      categoryname:{
        title: 'Category',
        type: 'string',
      }
    },
    mode:"external",
    hideSubHeader: true,
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private service:TrainingData,private router: Router) { 
    this.service.getData().subscribe(data => {
      for (let i = 0; i < data.length ; i++) {
        data[i].categoryname = data[i].category.nom;
        data[i].date =  data[i].date .substring(0, 10)
      } 
      this.source.load(data);
    });
  }

  ngOnInit(): void {
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure to delete this category?')) {


    }
  }

  onCreateClick(event): void {
    this.router.navigateByUrl('/pages/category/add');
  }

  onEditConfirm(event) : void {
    this.router.navigate(['/pages/category/edit'], { queryParams: { id: event.data.id} });
  }
}

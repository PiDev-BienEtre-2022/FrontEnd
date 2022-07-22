import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';
import { EvaluationData } from '../../../@core/data/EvaluationData';
import { UserrData } from '../../../@core/data/UserData';
import { User } from '../../../entities/user';

@Component({
  selector: 'ngx-list-evaluation',
  templateUrl: './list-evaluation.component.html',
  styleUrls: ['./list-evaluation.component.scss']
})
export class ListEvaluationComponent implements OnInit {
  displayDelete = "none";
  type = "";
  message="";
  user : User[];

  settingsOne = {
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
      username:{
        columns: {
          username:{}
        },
        title: 'User',
        type: 'string',
      },
      min_per_domain:{
        title: 'Min percentage domain (%)',
        type: 'string',
      },
      // nb_goals_domain :{
      //   title: 'Number of goals domain',
      //   type: 'string',
      // },
      // nb_goals_other :{
      //   title: 'Number of goals other domain',
      //   type: 'string',
      // },
      date_goals :{
        title: 'Date First validation',
        type: 'string',
      },
      date_eval :{
        title: 'Date Final validation',
        type: 'string',
      }
    },
    mode:"external",
    hideSubHeader: true,
  };

  settingsTwo = {
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
      username:{
        columns: {
          username:{}
        },
        title: 'User',
        type: 'string',
      },
      min_per_domain:{
        title: 'Min percentage domain (%)',
        type: 'string',
      },
      // nb_goals_domain :{
      //   title: 'Number of goals domain',
      //   type: 'string',
      // },
      // nb_goals_other :{
      //   title: 'Number of goals other domain',
      //   type: 'string',
      // },
      date_goals :{
        title: 'Date First validation',
        type: 'string',
      },
      date_eval :{
        title: 'Date Final validation',
        type: 'string',
      }
    },
    mode:"external",
    hideSubHeader: true,
    actions: {
      delete:false,
    }
  };

  
  sourceOne: LocalDataSource = new LocalDataSource();
  sourceTwo: LocalDataSource = new LocalDataSource();


  constructor(private service: EvaluationData ,private userService: UserrData , private router: Router) {
    this.service.getNotValidated().subscribe(data => {
      for (let i = 0; i < data.length ; i++) {
        data[i].username = data[i].user.username;
      }      
      this.sourceOne.load(data);
    });

    this.service.getInProgress().subscribe(data => {
      for (let i = 0; i < data.length ; i++) {
        data[i].username = data[i].user.username;
      }
      this.sourceTwo.load(data);
    });

    this.service.getValidated().subscribe(data => {
      for (let i = 0; i < data.length ; i++) {
        data[i].username = data[i].user.username;
      }
  });

  this.userService.getData().subscribe(data => {
    this.user = data;
    console.log(this.user)
  });

  }

  ngOnInit(): void {
  }
  onCreateClick(event): void {
    this.router.navigateByUrl('/pages/evaluation/add');
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure to delete this evaluation?')) {
      this.service.delete(event.data.id).subscribe();
      this.displayDelete = "block";
      this.type="alert-success";
      this.message = "Evaluation deleted successfully !";
    }

    setTimeout(() => {
      this.displayDelete = "none";
      this.service.getNotValidated().subscribe(data => {
        for (let i = 0; i < data.length ; i++) {
          data[i].username = data[i].user.username;
        } 
        this.sourceOne.load(data);
      });
    }, 3000);

  }

  onEditConfirm(event) : void {
    this.router.navigate(['/pages/evaluation/edit'], { queryParams: { id: event.data.id} });
  }

  onValidate(event) : void {
    this.router.navigate(['/pages/evaluation/validate'], { queryParams: { id: event.data.id} });
  }

  show(id): void{
    this.router.navigate(['/pages/evaluation/userlist'], { queryParams: { id: id} });
  }
}

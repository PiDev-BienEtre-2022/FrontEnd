import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';
import { CategoryData } from '../../../@core/data/CategoryData';

@Component({
  selector: 'ngx-list-Category',
  templateUrl: './list-Category.component.html',
  styleUrls: ['./list-Category.component.scss']
})
export class ListCategoryComponent {
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
      nom:{
        title: 'Category Name',
        type: 'string',
      },
      domain:{
        title: 'Domain',
        type: 'string',
      },
      percentage :{
        title: 'Percentage (%)',
        type: 'string',
      }
    },
    mode:"external",
    hideSubHeader: true,
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private service: CategoryData,private router: Router) {
    this.service.getData().subscribe(data => {
      this.source.load(data);
    });
    
  }

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure to delete this category?')) {
      this.service.delete(event.data.id).subscribe();
      this.displayDelete = "block";
      this.type="alert-success";
      this.message = "Category deleted successfully !";

      setTimeout(() => {
        this.displayDelete = "none";
        this.service.getData().subscribe(data => {
          this.source.load(data);
        });
      }, 2000);

    }
  }

  onCreateClick(event): void {
    this.router.navigateByUrl('/pages/category/add');
  }

  onEditConfirm(event) : void {
    this.router.navigate(['/pages/category/edit'], { queryParams: { id: event.data.id} });
  }

}

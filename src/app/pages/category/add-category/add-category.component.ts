import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryData } from '../../../@core/data/CategoryData';
import { Category } from '../../../entities/category';

@Component({
  selector: 'ngx-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnInit {
  category  : Category;
  displayBtn = "block";
  displayAdd = "none";
  displayEdit = "none";
  message = "";
  type="";
  id = 0;
  Title = "";
 
  constructor(private service: CategoryData, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.category = new Category;
    this.Title = "Add New Category";

    this.route.queryParams
      .subscribe(params => {
        this.id = params.id;
      }
    );

    if(this.id != 0){
      this.service.getById(this.id).subscribe((result)=>{
        this.category = result;
        this.Title = "Edit Category";
      });
    }
  }

  addOrUpdate(category){
    if(category.id != undefined){

      this.service.edit(category.id , category ).subscribe(
        data => {  
        },
        error => {
          this.displayAdd = "block";
          if(error.error.text == "Category exist !"){
            this.type="alert-danger";
            this.message=error.error.text;
          }else {
            this.displayBtn = "none";
            this.type="alert-success";
            this.message="Category updated successfully !";
            setTimeout(() => {
              this.router.navigate(['/pages/category/list']);
            }, 2000); 
        }

          console.log('Error', error);
        }
      )

    }else{
      this.service.add(category).subscribe(
          data => {  
          },
          error => {
            this.displayAdd = "block";
            if(error.error.text == "Category exist !"){
              this.type="alert-danger";
              this.message=error.error.text;
            }else {
              this.displayBtn = "none";
              this.type="alert-success";
              this.message="Category added successfully !";
              setTimeout(() => {
                this.router.navigate(['/pages/category/list']);
              }, 2000); 
            }
            console.log('Error', error);
          }
        )
      }

}


}

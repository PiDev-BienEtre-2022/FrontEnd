import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TrainingData } from '../../../@core/data/TrainingData';
import { Training } from '../../../entities/training';

@Component({
  selector: 'ngx-all-training',
  templateUrl: './all-training.component.html',
  styleUrls: ['./all-training.component.scss']
})
export class AllTrainingComponent implements OnInit {
  traningsList : Training[];
  //ID of connected user
  id = 1;

  constructor(private service: TrainingData, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.service.getData().subscribe((data: any[])=>{
      this.traningsList = data;
      for (let i = 0; i < this.traningsList.length; i++) {
        this.service.verif(this.id, this.traningsList[i].id).subscribe(
          data => {  
          },
          error => {
            if(error.error.text != "ok"){
              this.traningsList[i].message=error.error.text;

            }else{
              this.traningsList[i].message="ok";
            }
            console.log('Error', error);
          }
        )
      }
    })
    
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TrainingData } from '../../../@core/data/TrainingData';
import { Training } from '../../../entities/training';

@Component({
  selector: 'ngx-allowd-training',
  templateUrl: './allowd-training.component.html',
  styleUrls: ['./allowd-training.component.scss']
})
export class AllowdTrainingComponent implements OnInit {
  traningsList : Training[];
  //ID of connected user
  id = 1;
  constructor(private service: TrainingData, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.service.allowd(this.id).subscribe((data: any[])=>{
      this.traningsList = data;
    })
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';
import { EvaluationData } from '../../../@core/data/EvaluationData';
import { UserrData } from '../../../@core/data/UserData';
import { Evaluation } from '../../../entities/evaluation';
import { User } from '../../../entities/user';
import { Chart } from 'chart.js';
import { NbThemeService } from '@nebular/theme';
import { ChartModule } from 'angular2-chartjs';
import { GoalData } from '../../../@core/data/GoalData';

@Component({
  selector: 'ngx-user-evaluation',
  templateUrl: './user-evaluation.component.html',
  styleUrls: ['./user-evaluation.component.scss']
})
export class UserEvaluationComponent implements OnInit {
  evalList : Evaluation[];
  user: any;
  existList = false; 
  id = 0;
  PieChart=[];

  data: any;
  options: any;
  themeSubscription: any;
  stat=[];

  constructor(private theme: NbThemeService, private service: EvaluationData, private goalService: GoalData, private userService: UserrData,  private router: Router, private route: ActivatedRoute) {
    this.route.queryParams
      .subscribe(params => {
        this.id = params.id;
      } );
      
    this.goalService.stat(this.id).subscribe((data: any[])=>{
      this.stat = data;

      this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

        const colors: any = config.variables;
        const chartjs: any = config.variables.chartjs;
  
        this.data = {
          labels: ['Software', 'Administration', 'Soft', 'Management'],
          datasets: [{
            data: this.stat,
            backgroundColor: ["#1abc9c", "#2980b9", "#f39c12", "#ff7675"],
          }],
        };
  
        this.options = {
          maintainAspectRatio: false,
          responsive: true,
          scales: {
            xAxes: [
              {
                display: false,
              },
            ],
            yAxes: [
              {
                display: false,
              },
            ],
          },
          legend: {
            labels: {
              fontColor: chartjs.textColor,
            },
          },
        };
      });
    })
    
   
   }


  ngOnInit(): void {
   

    this.route.queryParams
      .subscribe(params => {
        this.id = params.id;
      } );

      this.userService.getById(this.id).subscribe((data: any[])=>{
        this.user = data;
      
      })

      this.service.MyEval(this.id).subscribe((data: any[])=>{
        this.evalList = data;
        if(this.evalList.length != 0){
          this.existList = true; 
        }
      })
  }

  viewDetails(id){
    this.router.navigate(['/pages/evaluation/details'], { queryParams: { id: id} });
  }

  
}

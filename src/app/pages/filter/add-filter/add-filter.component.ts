import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-add-filter',
  templateUrl: './add-filter.component.html',
  styleUrls: ['./add-filter.component.scss']
})
export class AddFilterComponent implements OnInit {

  constructor() { }

  appliedFor = 'team';

  ngOnInit(): void {
  }

}

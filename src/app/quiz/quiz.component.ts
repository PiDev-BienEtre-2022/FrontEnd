import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Quiz } from '../entities/quiz';
import { QuizService } from '../Service/quiz.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'ngx-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
  form : boolean = false;
   quiz!: Quiz;
   closeResult! : string;
   listQuiz : any;
   

  constructor(private quizService: QuizService, private modalService : NgbModal) { }

  ngOnInit(): void {
    this.getAllQuiz();;
    this.quiz = {
      id_product: null,
      title: null,
      price: null,
      quantity: null
    }
  }

}

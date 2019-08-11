import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { QuizService } from '../../../../services/quiz.service';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {

  addQnForm: FormGroup;
  public createQuizData;
  public newQuizData;
  public qnFormArray;
  public editIndex;
  public qnId: number;
  public shorterPath;
  public over_time_limit: Boolean = false;
  public invalid_right_answer: Boolean = false;


  constructor(private route: ActivatedRoute, private fb: FormBuilder, private router: Router, private quizService: QuizService) { }

  ngOnInit() {
    let qnId = this.route.snapshot.paramMap.get('id')
    this.editIndex = +qnId - 1
    this.addQnForm = this.fb.group({
      question_string: '',
      answer_1: '',
      answer_2: '',
      answer_3: '',
      answer_4: '',
      time_limit: '',
      correct_answer: ''

    });

    this.quizService.currentCreateQuizData.subscribe(data => {
      this.createQuizData = data;


    });
  }

  getEditIndex() {
    return this.editIndex
  }

  onAddQn() {
    this.over_time_limit = false;
    this.invalid_right_answer = false;
    this.qnFormArray = {
      "question_string": this.addQnForm.value.question_string, "time_limit": this.addQnForm.value.time_limit,
      "correct_answer": this.addQnForm.value.correct_answer, answers: [this.addQnForm.value.answer_1, this.addQnForm.value.answer_2, this.addQnForm.value.answer_3
        , this.addQnForm.value.answer_4]
    }

    if (this.addQnForm.value.time_limit > 99) {
      this.over_time_limit = true;
    }
    else if (1 > this.addQnForm.value.invalid_right_answer || this.addQnForm.value.invalid_right_answer > 4) {
      this.invalid_right_answer = true;
    }
    else {


      if (this.createQuizData.length < this.qnId) {
        this.createQuizData[0].questions.push(this.qnFormArray)

      } else {
        this.shorterPath = this.createQuizData[0].questions[this.editIndex];

        if (this.qnFormArray.question_string == '' && this.shorterPath.question_string != '') {
          this.qnFormArray.question_string = this.shorterPath.question_string
        }

        if (this.qnFormArray.time_limit == '') {
          if (this.shorterPath.time_limit == '') {
            this.qnFormArray.time_limit = 20

          }
          else {
            this.qnFormArray.time_limit = this.shorterPath.time_limit

          }
        }

        if (this.qnFormArray.correct_answer == '' && this.shorterPath.correct_answer != '') {
          this.qnFormArray.correct_answer = this.shorterPath.correct_answer


        }

        if (this.qnFormArray.answers[0] == '' && this.shorterPath.answers[0] != '') {
          this.qnFormArray.answers[0] = this.shorterPath.answers[0]
        }
        if (this.qnFormArray.answers[1] == '' && this.shorterPath.answers[1] != '') {
          this.qnFormArray.answers[1] = this.shorterPath.answers[1]
        }
        if (this.qnFormArray.answers[2] == '' && this.shorterPath.answers[2] != '') {
          this.qnFormArray.answers[2] = this.shorterPath.answers[2]
        }
        if (this.qnFormArray.answers[3] == '' && this.shorterPath.answers[3] != '') {
          this.qnFormArray.answers[3] = this.shorterPath.answers[3]
        }
        this.createQuizData[0].questions.splice(this.editIndex, 1, this.qnFormArray)

      }

      this.newQuizData = this.createQuizData
      this.quizService.changeCreateQuizData(this.newQuizData)
      this.router.navigate(["/main/quiz/create/overview"])
    }
  }

  routeToCreate() {
    this.router.navigate(["/main/quiz/create/overview"])
  }

}


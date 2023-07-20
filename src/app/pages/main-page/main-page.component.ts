import {Component, OnInit} from '@angular/core';
import {JsonService} from '../../services/json.service';
import {Json} from '../../models/json';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {timer} from 'rxjs';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  jsonDatas: Json[] = [];
  currentPage = 1;
  questionsForm: FormGroup;
  timerSubscription: any;
  timerValue: number = 30;
  canAnswer: boolean = false;
  quizFinish: boolean = false;

  constructor(private jsonService: JsonService,
              private formBuilder: FormBuilder) {
    this.questionsForm = this.formBuilder.group({});
  }

  ngOnInit(): void {
    this.getDatas();
    this.startTimer();
  }

  getDatas() {
    this.jsonService.getDatas().subscribe(data => {
      this.jsonDatas = data.slice(0, 10);
      this.jsonDatas.forEach(object => {
        const array = object.body.split('\n');
        object.optionA = array[0];
        object.optionB = array[1];
        object.optionC = array[2];
        object.optionD = array[3];
        const newFormControl = new FormControl();
        newFormControl.setValidators(Validators.required);
        this.questionsForm.addControl(object.id.toString(), newFormControl);
      });
    });
  }

  selectOption(event, id: number) {
    this.questionsForm.get(id.toString()).setValue(event.target.value);
  }

  startTimer() {
    this.timerSubscription = timer(0, 1000).subscribe(() => {
      this.timerValue--;
      if (this.timerValue === 20) {
        this.canAnswer = true;
      }
      if (this.timerValue === 0) {
        this.questionsForm.get(this.currentPage.toString()).setValue(null);

        this.nextQuestion();
      }
    });
  }


  nextQuestion() {
    this.currentPage = this.currentPage + 1;
    console.log(this.questionsForm);
    this.timerSubscription.unsubscribe();
    if (this.currentPage < this.jsonDatas.length) {
      this.timerValue = 30;
      this.canAnswer = false;
      this.startTimer();
    } else {
      // Tüm sorular tamamlandı, burada sonuçları işleyebilirsiniz.
      console.log('Quiz tamamlandı.');
      this.timerValue = null;
      this.quizFinish = true;
    }
  }
}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cronometro',
  templateUrl: './cronometro.component.html',
  styleUrls: ['./cronometro.component.css']
})
export class CronometroComponent implements OnInit {
  name = 'Angular 6';
  timeLeft: number = 60;
  timeCounter: number = 0;
  interval;
  estaContando: Boolean = false;
  startTimer() {
    if(!this.estaContando){
      this.interval = setInterval(() => {
        if(this.timeLeft > 0) {
          this.timeLeft--;
        } else {
          this.timeLeft = 60;
        }
      },1000);
      this.estaContando = true;
    }   
  }

  startTimeCounter() {
    if(!this.estaContando){
      this.interval = setInterval(() => {
        if(this.timeCounter >= 0) {
          this.timeCounter++;
        } else {
          this.timeCounter = 0;
        }
      },1000);
      this.estaContando=true;
    }  
  }

  pauseTimer() {
    clearInterval(this.interval);
    this.estaContando = false;
  }
  constructor() { }

  ngOnInit() {
  }

}

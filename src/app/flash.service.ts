import { Injectable } from '@angular/core';
import { IFlash } from './flash.model';
import { BehaviorSubject } from 'rxjs';

function getRandomNumber(): number {
  return Math.floor(Math.random() * 10000);
}

@Injectable({
  providedIn: 'root'
})

export class FlashService {
  flashs: IFlash[];
  flashs$: BehaviorSubject<IFlash[]>;

  constructor() {
    this.flashs = [
      {
      question: 'Question 1',
      answer: 'Answer 1',
      show: false,
      id: getRandomNumber()
    } ,
      {
      question: 'Question 2',
      answer: 'Answer 2',
      show: false,
      id: getRandomNumber()
    } ,
      {
      question: 'Question 3',
      answer: 'Answer 3',
      show: false,
      id: getRandomNumber()
    }]
    this.flashs$ = new BehaviorSubject<IFlash[]>(this.flashs);
  }

  addFlash(flash: IFlash) {
    this.flashs = [
      ...this.flashs, {
        ...flash,
        show: false,
        id: getRandomNumber()
      }
    ]
    this.flashs$.next(this.flashs);
  }
  createFlash(question: string, answer:string){
    return {id: getRandomNumber(), show:false, question, answer};
  }

  getFlash(id: number) : any{
    return this.flashs.find(flash => flash.id === id);
  }

  toggleFlash(id: number) {
    const index = this.flashs.findIndex(flash => flash.id  === id);
    this.flashs = [
      ...this.flashs.slice(0, index),
      {
        ...this.flashs[index],
        show: !this.flashs[index].show
      },
      ...this.flashs.slice(index + 1),
    ]
    this.flashs$.next(this.flashs);
  }

  deleteFlash(id: number) {
    const index = this.flashs.findIndex(flash => flash.id === id);
    this.flashs = [
      ...this.flashs.slice(0, index),
      ...this.flashs.slice(index + 1)
    ]
    this.flashs$.next(this.flashs);
  }

  rememberedChange(id: number, flag: 'correct' | 'incorrect') {
    const index = this.flashs.findIndex(flash => flash.id === id);
    this.flashs = [
      ...this.flashs.slice(0, index),
      {
        ...this.flashs[index],
        remembered: flag
      },
      ...this.flashs.slice(index + 1)
    ]
    this.flashs$.next(this.flashs);
  }

  updateFlash(id: number, question: string, answer: string) {
    const index = this.flashs.findIndex(flash => flash.id === id);
    this.flashs = [
      ...this.flashs.slice(0, index),
      {
        ...this.flashs[index],
        question,
        answer
      },
      ...this.flashs.slice(index + 1)
    ]
    this.flashs$.next(this.flashs);
  }
}

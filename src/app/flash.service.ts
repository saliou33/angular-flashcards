import { Injectable } from '@angular/core';
import { IFlash } from './flash.model';

function getRandomNumber(): number {
  return Math.floor(Math.random() * 10000);
}

@Injectable({
  providedIn: 'root'
})
export class FlashService {
  flashs: IFlash[];

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
  }

  addFlash(flash: IFlash) {
    this.flashs.push({
      ...flash,
      show:false,
      id: getRandomNumber()
    })
  }
  createFlash(question: string, answer:string){
    return {id: getRandomNumber(), show:false, question, answer};
  }

  getFlash(id: number) : any{
    return this.flashs.find(flash => flash.id === id);
  }

  toggleFlash(id: number) {
    const flash = this.getFlash(id);
    if (flash) flash.show = !flash.show;
  }

  deleteFlash(id: number) {
    const index = this.flashs.findIndex(flash => flash.id === id);
    this.flashs.splice(index, 1);
  }

  rememberedChange(id: number, flag: 'correct' | 'incorrect') {
    const flash = this.getFlash(id);
    if(flash) flash.remembered = flag;
  }

  updateFlash(id: number, question: string, answer: string) {
    const flash = this.getFlash(id);
    if(flash) {
      flash.question = question;
      flash.answer = answer;
    }
  }
}

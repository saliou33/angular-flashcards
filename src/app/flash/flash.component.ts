import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { IFlash } from '../flash.model';
@Component({
  selector: 'app-flash',
  templateUrl: './flash.component.html',
  styleUrls: ['./flash.component.css']
})
export class FlashComponent implements OnInit {
  @Input() flash : IFlash;
  @Output() onToggleCArd = new EventEmitter<number>();
  @Output() onDelete = new EventEmitter<number>();
  @Output() onEdit = new EventEmitter<number>();
  @Output() onRememberedChange = new EventEmitter<Object>();

  constructor() {
    this.flash = {
      id: 1,
      question: 'Best Buddy',
      answer: 'No reaction',
      show: false
    }
  }

  toggleCard(): void {
    this.onToggleCArd.emit(this.flash.id);
  }

  deleteFlash(): void {
    this.onDelete.emit(this.flash.id);
  }

  editFlash(): void {
    this.onEdit.emit(this.flash.id);
  }

  markCorrect(): void {
    this.onRememberedChange.emit({
      id: this.flash.id,
      flag: 'correct'
    })
  }

  markIncorrect(): void {
    this.onRememberedChange.emit({
      id: this.flash.id,
      flag: 'incorrect'
    })
  }


  ngOnInit(): void {
  }

}

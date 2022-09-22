import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';
import { FlashService } from './flash.service';
import { IFlash } from './flash.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string;
  // flash editing
  editing: boolean;
  editingId: number;
  // flash list
  flashs: IFlash[];
  // flash form
  flashForm: FormGroup;
  question: FormControl;
  answer: FormControl;

  constructor (fb: FormBuilder, private flashService: FlashService) {
    this.title = 'angular-flashcards';
    this.editing = false;
    this.editingId = -1;
    this.flashForm = fb.group({
      'question': ['', Validators.required],
      'answer': ['', Validators.required]
    });
    this.question = this.flashForm.controls['question'] as FormControl;
    this.answer = this.flashForm.controls['answer'] as FormControl;
    this.flashs = flashService.flashs;
  }

  trackByFlashId (index: number, flash: IFlash) : number {
    return flash.id;
  }

  handleToggleCard(id: number) {
    this.flashService.toggleFlash(id);
  }
  //
  handleDelete(id: number) {
    this.flashService.deleteFlash(id);
  }

  handleEdit(id: number) {
    const flash = this.flashService.getFlash(id);
    this.editing = true;
    this.editingId = id;
    this.question.setValue(flash.question);
    this.answer.setValue(flash.answer);
  }

  handleRememberedChange(data: any) {
    this.flashService.rememberedChange(data.id, data.flag);
  }

  handleSubmit() {
    this.flashService.addFlash(this.flashService.createFlash(this.question.value, this.answer.value));
  }

  handleClear() {
    this.flashForm.reset();
  }

  handleCancel() {
    this.editing = false;
    this.editingId = -1;
    this.handleClear();
  }

  handleUpdate() {
    this.flashService.updateFlash(this.editingId, this.question.value, this.answer.value);
    this.handleCancel();
  }
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule], // Import CommonModule and RouterModule
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent {
  task = {
    title: '',
    description: ''
  };
  isEdit = false;

  submitForm() {
    if (this.isEdit) {
      console.log('Editing task:', this.task);
    } else {
      console.log('Creating new task:', this.task);
    }
  }
}

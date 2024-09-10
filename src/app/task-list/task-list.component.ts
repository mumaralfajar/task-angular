import { Component } from '@angular/core';
import { TaskService, Task } from '../task.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent {
  tasks: Task[] = [];
  currentPage = 1;
  pageSize = 5;
  totalPages = 1;

  constructor(private taskService: TaskService) {}

  loadTasks() {
    this.taskService.getTasks(this.currentPage, this.pageSize).subscribe(
      (response) => {
        this.tasks = response.data.items;
        this.totalPages = Math.ceil(response.data.totalItems / this.pageSize);
      },
      (error) => {
        console.error('Failed to load tasks', error);
      }
    );
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadTasks();
    }
  }
}

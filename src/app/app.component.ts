import { Component } from '@angular/core';
import { TaskService, Task } from './task.service';
import { FormsModule } from '@angular/forms';
import { TaskListComponent } from "./task-list/task-list.component";
import { TaskFormComponent } from "./task-form/task-form.component";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [
    FormsModule, CommonModule, RouterModule, TaskFormComponent, TaskListComponent
  ],
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  tasks: Task[] = [];
  task: Task = { id: 0, title: '', description: '' };
  showTaskForm = false;
  currentPage = 1;
  totalPages = 1;

  constructor(private taskService: TaskService) {
    this.fetchTasks();
  }

  fetchTasks() {
    this.taskService.getTasks(this.currentPage, 5).subscribe(
      (response) => {
        this.tasks = response.data.items;
        this.totalPages = Math.ceil(response.data.totalItems / 5);
      },
      (error) => {
        console.error('Error fetching tasks:', error);
      }
    );
  }

  editTask(task: Task) {
    console.log('Task to edit:', task);  // Log task details here
    this.task = { ...task };  // Copy the task object into this.task
    this.showTaskForm = true;
  }

  updateTask() {
    console.log('Updating task with ID:', this.task.id);  // Log the task ID before updating

    if (this.task.id) {
      this.taskService.updateTask(this.task.id, this.task).subscribe(
        (updatedTask) => {
          this.showTaskForm = false;
          this.task = { id: 0, title: '', description: '' };  // Reset the form
          this.fetchTasks();  // Refresh the task list
        },
        (error) => {
          console.error('Failed to update task', error);
        }
      );
    } else {
      console.error('Task ID is undefined');
    }
  }

  // Method to open the form for creating a new task
  openTaskForm() {
    this.showTaskForm = !this.showTaskForm;
    if (!this.showTaskForm) {
      this.task = { id: 0, title: '', description: '' }; // Reset the form
    }
  }

  // Method to create a new task
  createTask() {
    this.taskService.createTask(this.task).subscribe(
      (newTask) => {
        this.tasks.push(newTask);
        this.showTaskForm = false;
        this.task = { id: 0, title: '', description: '' }; // Reset the form
        this.fetchTasks(); // Refresh the task list
      },
      (error) => {
        console.error('Error creating task:', error);
      }
    );
  }

  // Method to delete a task
  deleteTask(taskId: number) {
    this.taskService.deleteTask(taskId).subscribe(
      () => {
        this.fetchTasks(); // Refresh the task list after deletion
      },
      (error) => {
        console.error('Error deleting task:', error);
      }
    );
  }

  // Method to change pages in pagination
  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.fetchTasks(); // Fetch tasks for the new page
    }
  }
}

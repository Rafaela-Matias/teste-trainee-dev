import { Component, OnInit } from '@angular/core';
import { Todo } from '../shared/models/todo.model';
import { TodoService } from '../shared/services/todo.service';
import jsPDF from 'jspdf';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  todos: Todo[] = [];
  showCompletedTasks: boolean = true;

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos() {
    this.todoService.getTodos().subscribe(todos => {
      this.todos = todos;
    });
  }

  addTodo(newTodoTitle: string) {
    const newTodo: Todo = {
      id: this.todos.length + 1,
      title: newTodoTitle,
      completed: false
    };

    this.todoService.addTodo(newTodo);
  }

  updateTodo(updatedTodo: Todo) {
    this.todoService.updateTodo(updatedTodo);
  }

  deleteTodo(todoId: number) {
    this.todoService.deleteTodo(todoId);
  }

  clearAll() {
    if (this.todos.length === 0) return;

    Swal.fire({
      title: 'Tem certeza que deseja apagar todas as tarefas?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#228B22',
      cancelButtonColor: 'red',
      confirmButtonText: 'Sim',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.isConfirmed) {
        this.todoService.clearAll();
        this.loadTodos();
      }
    });
 }

  clearCompletedTasks() {
    Swal.fire({
      title: 'Tem certeza que deseja apagar todas as tarefas concluídas?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#228B22',
      cancelButtonColor: 'red',
      confirmButtonText: 'Sim',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.isConfirmed) {
        this.todoService.clearCompletedTasks();
      this.loadTodos();
      }
    });
  }

  toggleCompletedTasks() {
    this.showCompletedTasks = !this.showCompletedTasks;
    this.loadTodos();
    this.todos = this.filteredTodos();
  }

  filteredTodos() {
    return this.showCompletedTasks ? this.todos : this.todos.filter(todo => !todo.completed);
  }

  get labelClearAll(){
    return 'Clear All'
  }

  ordemAlfabetica() {
    this.todos.sort((a, b) => a.title.localeCompare(b.title));
  }

  exportarPDF() {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Lista de Tarefas', 85, 10);

    const tarefas = this.filteredTodos();
    let y = 30;

    tarefas.forEach((todo) => {
      const status = todo.completed ? '[X]' : '[ ]';
      doc.text(`${status} ${todo.title}`, 10, y);
      y+=10;
    });

    doc.save('Lista_de_Tarefas.pdf');
  }
}

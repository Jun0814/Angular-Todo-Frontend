import { Injectable } from '@angular/core';
import { Todo, TodoStatusType } from '../@models/todo.model';
import { TodoApiService } from './todo-api.service';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  toggleAllBtn = false;
  nowTodoStatusType = TodoStatusType.All;
  toDoDataList:Todo[] = [];

  constructor(private todoApiService: TodoApiService) {
    this.getData();
   }

  toggleAll() {
    this.toggleAllBtn = !this.toggleAllBtn;
    this.toDoDataList.forEach(item => {
      item.Status = this.toggleAllBtn;
    });

    this.todoApiService.toggleTodoStatus(this.toggleAllBtn).subscribe();
  }

  clickCheck(item: Todo) {
    item.Status = !item.Status;
    this.todoApiService.updateTodo(item).subscribe();
    this.checkToggleAllBtn();
  }

  checkToggleAllBtn() {
    if(this.todoCompleted.length === this.toDoDataList.length) {
      this.toggleAllBtn = true;
    } else {
      this.toggleAllBtn = false;
    }
  }

  getData(){
    this.todoApiService.getTodoList().subscribe(data => {
      this.toDoDataList = data;
    });
  }

  add(value: string) {
      const newItem: Todo = {
        Status: false,
        Thing: value,
        Editing: false,
        TodoId: ''
      };
      this.todoApiService.addTodo(newItem).subscribe(data => {
        this.toDoDataList.push(data);
      });
      value = '';
  }

  //First way to delete
  delete(index: number) {
    this.toDoDataList.splice(index, 1);
  }

  //Second way to delete
  delete2(item: Todo) {
    this.todoApiService.deleteTodo(item).subscribe();
    this.toDoDataList = this.toDoDataList.filter(data => data !== item);
  }

  edit(item: Todo) {
    item.Editing = true;
  }

  update(item: Todo) {
    this.todoApiService.updateTodo(item).subscribe();
    item.Editing = false;
  }

  setTodoStatusType(type: number) {
    this.nowTodoStatusType = type;
  }

  get todoList(){
    let list: Todo[] = [];
    switch (this.nowTodoStatusType) {
      case TodoStatusType.Active:
        list = this.todoActive;
        break;
      case TodoStatusType.Completed:
        list = this.todoCompleted;
        break;
      default:
        list = this.toDoDataList;
        break;
    }

    return list;
  }

  get todoActive(){
    return this.toDoDataList.filter(data => !data.Status);
  }

  get todoCompleted(){
    return this.toDoDataList.filter(data => data.Status);
  }

  //First way to clear completed, but easy to overload the server if there are a lot of data
  clearCompleted() {
    this.toDoDataList.forEach(item => {
      if(item.Status) {
        this.todoApiService.clearCompleted(item).subscribe();
      }
    });
    this.toDoDataList = this.todoActive;
  }

  //Second way to clear completed, but need to cooperate with the backend
  clearCompleted2() {
    let idList = '';
    this.toDoDataList.forEach(data => {
      if (data.Status) {
        idList = idList + ',' + data.TodoId;
      }
    });
    this.todoApiService.clearCompleted2(idList).subscribe();
    this.toDoDataList = this.todoActive;
  }

  //Third way to clear completed using API, still need to cooperate with the backend
  clearCompleted3() {
    this.todoApiService.clearCompleted3().subscribe();
    this.toDoDataList = this.todoActive;
  }
}

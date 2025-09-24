import { Component, OnInit } from '@angular/core';
import { Todo, TodoStatusType } from './@models/todo.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'OneTodo';
  placeholder = 'What needs to be done????'

  date = new Date();
  note = 'Note: This is a note';
  toggleAllBtn = false;
  check1 = false;
  check2 = false;
  nowTodoStatusType = TodoStatusType.All;
  TodoStatusType = TodoStatusType;
  todoInputModel = '';

  toDoDataList:Todo[] = [];

  constructor(private http: HttpClient) {

  }

  ngOnInit(): void {
    //To get data from backend, just need to change the url to the backend url
    this.http.get<Todo[]>('/api/todo2_16').subscribe(data => {
      this.toDoDataList = data;
    });
  }

  toggleAll() {
    this.toggleAllBtn = !this.toggleAllBtn;
    this.toDoDataList.forEach(item => {
      item.Status = this.toggleAllBtn;
    });

    this.http.put('/api/todo2_16/Status/' + this.toggleAllBtn, null).subscribe();
  }

  clickCheck(item: Todo) {
    item.Status = !item.Status;
    this.http.put('/api/todo2_16/' + item.TodoId, item).subscribe();
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
    this.http.get<Todo[]>('/api/todo2_16').subscribe(data => {
      this.toDoDataList = data;
    });
  }

  add() {
      const newItem: Todo = {
        Status: false,
        Thing: this.todoInputModel,
        Editing: false,
        TodoId: ''
      };
      this.http.post<Todo>('/api/todo2_16', newItem).subscribe(data => {
        this.toDoDataList.push(data);
      });
      this.todoInputModel = '';
  }

  //First way to delete
  delete(index: number) {
    this.toDoDataList.splice(index, 1);
  }

  //Second way to delete
  delete2(item: Todo) {
    this.http.delete('/api/todo2_16/' + item.TodoId).subscribe();
    this.toDoDataList = this.toDoDataList.filter(data => data !== item);
  }

  edit(item: Todo) {
    item.Editing = true;
  }

  update(item: Todo) {
    this.http.put('/api/todo2_16/' + item.TodoId, item).subscribe();
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
        this.http.delete('/api/todo2_16/' + item.TodoId).subscribe();
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
    this.http.delete('/api/todo2_16/' + idList).subscribe();
    this.toDoDataList = this.todoActive;
  }

  //Third way to clear completed using API, still need to cooperate with the backend
  clearCompleted3() {
    this.http.delete('/api/todo2_16/clearCompleted').subscribe();
    this.toDoDataList = this.todoActive;
  }
}

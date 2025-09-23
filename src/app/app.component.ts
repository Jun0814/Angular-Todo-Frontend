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
  }

  clickCheck(item: Todo) {
    item.Status = !item.Status;
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
        Editing: false
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
    this.toDoDataList = this.toDoDataList.filter(data => data !== item);
  }

  edit(item: Todo) {
    item.Editing = true;
  }

  update(item: Todo, value: string) {
    item.Thing = value;
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

  clearCompleted() {
    this.toDoDataList = this.todoActive;
  }
}

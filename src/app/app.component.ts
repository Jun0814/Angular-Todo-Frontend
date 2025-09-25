import { Component, OnInit } from '@angular/core';
import { TodoStatusType } from './@models/todo.model';
import { TodoService } from './@services/todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'OneTodo';
  placeholder = 'What needs to be done????'
  TodoStatusType = TodoStatusType;
  date = new Date();
  note = 'Note: This is a note';
  todoInputModel = '';

  constructor(private todoService: TodoService) {

  }

  ngOnInit(): void {
  }

  add(){

  }
}

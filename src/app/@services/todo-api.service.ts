import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Todo } from '../@models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoApiService {
  private url = '/api/todo2_16';

  constructor(private http: HttpClient) { }

  getTodoList() {
    return this.http.get<Todo[]>(this.url)
  }

  addTodo(todo: Todo) {
    return this.http.post<Todo>(this.url, todo)
  }

  updateTodo(todo: Todo) {
    return this.http.put(`${this.url}/${todo.TodoId}`, todo)
  }

  deleteTodo(todo: Todo) {
    return this.http.delete(`${this.url}/${todo.TodoId}`)
  }

  toggleTodoStatus(value: boolean) {
    return this.http.put(`${this.url}/Status/${value}`, null)
  }

  clearCompleted3() {
    return this.http.delete(`${this.url}/clearCompleted`)
  }
  
  clearCompleted2(idList: string) {
    return this.http.delete(`${this.url}/${idList}`)
  }

  clearCompleted(todo: Todo) {
    return this.http.delete(`${this.url}/${todo.TodoId}`)
  }
}

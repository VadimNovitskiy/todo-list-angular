import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Item } from 'src/app/models/item.model';
import {
  AddTodo,
  GetTodos,
  DeleteTodo,
  UpdateTodo,
  FilterTodo,
} from './app.actions'; // UpdateTodo, DeleteTodo
import { DataService } from '../services/data.service';
import { Injectable } from '@angular/core';

export class TodoStateModel {
  todos!: Item[];
}

@Injectable({
  providedIn: 'root',
})
@State<TodoStateModel>({
  name: 'todos',
  defaults: {
    todos: [],
  },
})
export class TodoState {
  constructor(private dataService: DataService) {}

  @Selector()
  static todos(state: TodoStateModel): Item[] {
    return state.todos;
  }

  @Action(GetTodos)
  getTodo(
    { setState, getState }: StateContext<TodoStateModel>,
    { userId, date }: GetTodos
  ) {
    const state = getState();
    this.dataService.getItems(userId, date).subscribe((data) => {
      setState({
        ...state,
        todos: [...data],
      });
    });
  }

  @Action(AddTodo)
  createTodo(
    { patchState, getState }: StateContext<TodoStateModel>,
    action: AddTodo
  ) {
    const state = getState();
    const todo = action.payload;
    this.dataService.create(todo);
    patchState({
      todos: [...state.todos, todo],
    });
  }

  @Action(UpdateTodo)
  updateTodo(
    { setState, getState }: StateContext<TodoStateModel>,
    { id, payload }: UpdateTodo
  ) {
    this.dataService.update(id, payload);
    const state = getState();
    const todoList = [...state.todos];
    const todoIndex = todoList.findIndex((item) => item.id === id);
    const item = { ...todoList[todoIndex] };
    item.done = payload.done;
    item.text = payload.text;
    todoList[todoIndex] = { ...item };
    setState({
      ...state,
      todos: todoList,
    });
  }

  @Action(FilterTodo)
  FilterTodo(
    { setState, getState }: StateContext<TodoStateModel>,
    { userId, date, typeOfFilter }: FilterTodo
  ) {
    const state = getState();
    this.dataService.getItems(userId, date).subscribe((data) => {
      const filteredItems = data.filter((item) =>
        typeOfFilter === 'done' ? item.done : !item.done
      );
      setState({
        ...state,
        todos: [...filteredItems],
      });
    });
  }

  @Action(DeleteTodo)
  deleteTodo(
    { getState, setState }: StateContext<TodoStateModel>,
    action: DeleteTodo
  ) {
    this.dataService.delete(action.id);
    const state = getState();
    const { todos } = getState();
    setState({
      ...state,
      todos: todos.filter((todo) => todo !== action.id),
    });
  }
}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';

import { AppComponent } from './app.component';
import { TodoComponent } from './todo/todo.component';
import { AutoFocusDirectiveDirective } from './auxiliary_components/auto-focus-directive.directive';
import { TodoListComponent } from './todo-list/todo-list.component';

@NgModule({
  declarations: [
    AppComponent,
    TodoComponent,
    AutoFocusDirectiveDirective,
    TodoListComponent,
  ],
  imports: [
    BrowserModule,
    MatButtonModule,
    BrowserAnimationsModule,
    FormsModule,
    MatCheckboxModule,
    MatInputModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

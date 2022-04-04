import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { CoolSocialLoginButtonsModule } from '@angular-cool/social-login-buttons';

import { environment } from '../environments/environment';
import { AutoFocusDirectiveDirective } from './shared/auto-focus.directive.directive';

import { AppComponent } from './app.component';
import { TodoComponent } from './todo/todo.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoInputComponent } from './todo-input/todo-input.component';
import { MenuComponent } from './menu/menu.component';
import { SignInComponent } from './authentication/sign-in/sign-in.component';
import { DashboardComponent } from './authentication/dashboard/dashboard.component';
import { ForgotPasswordComponent } from './authentication/forgot-password/forgot-password.component';
import { SignUpComponent } from './authentication/sign-up/sign-up.component';
import { VerifyEmailComponent } from './authentication/verify-email/verify-email.component';

import { DataService } from './services/data.service';
import { AuthService } from './services/auth.service';

const modules = [
  BrowserModule,
  MatButtonModule,
  BrowserAnimationsModule,
  FormsModule,
  MatCheckboxModule,
  MatInputModule,
  MatIconModule,
  RouterModule,
  MatButtonToggleModule,
  HttpClientModule,
  AngularFireModule.initializeApp(environment.firebase),
  AngularFireDatabaseModule,
  AppRoutingModule,
  MatFormFieldModule,
  CoolSocialLoginButtonsModule,
  ReactiveFormsModule,
];

const declarations = [
  AppComponent,
  TodoComponent,
  AutoFocusDirectiveDirective,
  TodoListComponent,
  TodoInputComponent,
  MenuComponent,
  SignInComponent,
  SignUpComponent,
  DashboardComponent,
  ForgotPasswordComponent,
  VerifyEmailComponent,
];

@NgModule({
  declarations: [...declarations],
  imports: [...modules],
  providers: [DataService, AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}

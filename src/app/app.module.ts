import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { CoolSocialLoginButtonsModule } from '@angular-cool/social-login-buttons';
import { environment } from '../environments/environment';
import { AutoFocusDirectiveDirective } from './shared/auto-focus.directive.directive';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';

import { NgxsModule } from '@ngxs/store';
import { TodoState } from './store/app.state';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { ngxLoadingAnimationTypes, NgxLoadingModule } from 'ngx-loading';

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
import { MomentPipe } from './shared/moment.pipe';

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
  MatDatepickerModule,
  MatMomentDateModule,
  NgxsModule.forRoot([TodoState], {
    developmentMode: !environment.production,
  }),
  NgxsReduxDevtoolsPluginModule.forRoot(),
  NgxsLoggerPluginModule.forRoot(),
  NgxLoadingModule.forRoot({
    animationType: ngxLoadingAnimationTypes.wanderingCubes,
    backdropBackgroundColour: 'rgba(0,0,0,0.1)',
    backdropBorderRadius: '4px',
    primaryColour: '#ffffff',
    secondaryColour: '#ffffff',
    tertiaryColour: '#ffffff',
  }),
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
  MomentPipe,
];

@NgModule({
  declarations: [...declarations],
  imports: [...modules],
  providers: [DataService, AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}

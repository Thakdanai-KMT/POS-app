import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { AppComponent } from './app.component';
import { DashboardComponent,  } from './pages/dashboard/dashboard.component';
import { LoginComponent    } from './pages/logincomponent/login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent,  } from './service/sidebar/sidebar.component';
import { NotificationComponent } from './service/notification/notification.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent ,
    SidebarComponent,
    NotificationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

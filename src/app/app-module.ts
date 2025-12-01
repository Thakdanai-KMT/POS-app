import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Homecomponent } from './pages/home/homecomponent';
// import { Logincomponent1 } from './pages/login1/logincomponent1';
import { Logincomponent  } from './pages/logincomponent/logincomponent';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    App,
    Homecomponent,
    Logincomponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule   
    // Logincomponent
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }

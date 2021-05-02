import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormSharedModule } from './form-components/form-components.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RequestsInterceptor } from './_interceptor/requests.interceptor';

@NgModule( {
  declarations: [
    AppComponent
  ],
  imports: [ BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    ComponentsModule,
    HttpClientModule,
    FormSharedModule,

  ],
  providers: [ {
    provide: HTTP_INTERCEPTORS,
    useClass: RequestsInterceptor,
    multi: true,
  } ],
  bootstrap: [ AppComponent ]
} )
export class AppModule {
}

import {BrowserModule} from '@angular/platform-browser'
import {NgModule} from '@angular/core'
import {FlexLayoutModule} from '@angular/flex-layout'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {NgxMdModule} from "ngx-md"

import {CoreModule} from "./core/core.module"
import {SharedModule} from './shared/shared.module'

import {
  HttpClientModule,
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HTTP_INTERCEPTORS
} from '@angular/common/http'

import {AppRoutingModule} from './app-routing.module'
import {AppComponent} from './app.component'
import {environment} from '../environments/environment'
import { NgxsModule } from '@ngxs/store'

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FlexLayoutModule,
    CoreModule,
    HttpClientModule,
    SharedModule,

    //Ngxs module
    NgxsModule.forRoot(
      [] , {
        developmentMode: !environment.production
      }),

    NgxMdModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}

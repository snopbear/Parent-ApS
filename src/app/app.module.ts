import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './layouts/nav-bar/nav-bar.component';
import { AuthorizationInterceptor } from './shared/serivces/basic/interceptors/authorization/authorization.interceptor';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SharedModule } from './shared/shared.module';
@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NgxSpinnerModule,
    ModalModule.forRoot(),
    SharedModule
  ],
  
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthorizationInterceptor,
      multi: true,
    }, // Handle Http headers
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

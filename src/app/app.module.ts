import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppLayoutModule } from './layout/app.layout.module';
import { MenuModule } from 'primeng/menu';
import { ProductService } from './demo/service/product.service';

import { NotfoundComponent } from './demo/components/notfound/notfound.component';

@NgModule({
  declarations: [
    AppComponent,
    NotfoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,

    AppLayoutModule,
    MenuModule,
  ],
  providers: [ ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { OrdenTrabajoComponent } from './orden-trabajo/orden-trabajo.component';
import { AsignarComponent } from './asignar/asignar.component';
import { FichaComponent } from './ficha/ficha.component';
import { FichaIndComponent } from './ficha-ind/ficha-ind.component';
import { AddNewActivityComponent } from './add-new-activity/add-new-activity.component';
import { AddNewProductComponent } from './add-new-product/add-new-product.component';
import { AddMotocicletaComponent } from './add-motocicleta/add-motocicleta.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule, MatIconModule, MatSidenavModule, MatListModule } from  '@angular/material';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    OrdenTrabajoComponent,
    AsignarComponent,
    FichaComponent,
    FichaIndComponent,
    AddNewActivityComponent,
    AddNewProductComponent,
    AddMotocicletaComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule,
    AngularSvgIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

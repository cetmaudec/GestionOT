import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { NgxPaginationModule } from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeComponent } from './home/home.component';
import { OrdenTrabajoComponent } from './orden-trabajo/orden-trabajo.component';

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
import { AddClienteComponent } from './add-cliente/add-cliente.component';
import { ClientesComponent } from './clientes/clientes.component';
import { ClienteDetalleComponent } from './cliente-detalle/cliente-detalle.component';
import { ActividadDetalleComponent } from './actividad-detalle/actividad-detalle.component';
import { NewComponent } from './new/new.component';
import { ChartsComponent } from './charts/charts.component';
import { NavbarComponent } from './navbar/navbar.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    OrdenTrabajoComponent,
    FichaComponent,
    FichaIndComponent,
    AddNewActivityComponent,
    AddNewProductComponent,
    AddMotocicletaComponent,
    LoginComponent,
    AddClienteComponent,
    ClientesComponent,
    ClienteDetalleComponent,
    ActividadDetalleComponent,
    NewComponent,
    ChartsComponent,
    NavbarComponent,
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
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { OrdenTrabajoComponent } from './orden-trabajo/orden-trabajo.component';
import { AsignarComponent } from './asignar/asignar.component';
import {  FichaComponent } from './ficha/ficha.component';
import { FichaIndComponent } from './ficha-ind/ficha-ind.component';
import { AddMotocicletaComponent } from './add-motocicleta/add-motocicleta.component';
import { AddNewActivityComponent } from './add-new-activity/add-new-activity.component';
import { AddNewProductComponent } from './add-new-product/add-new-product.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'home', component: HomeComponent },
  { path: 'orden-trabajo', component: OrdenTrabajoComponent},
  { path: 'asignar', component: AsignarComponent},
  { path: 'ficha', component: FichaComponent },
  { path: 'ficha-ind', component: FichaIndComponent },
  { path: 'nueva-moto', component: AddMotocicletaComponent},
  { path: 'nueva-actividad', component: AddNewActivityComponent},
  { path: 'nuevo-producto', component: AddNewProductComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

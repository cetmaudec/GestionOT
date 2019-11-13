import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { OrdenTrabajoComponent } from './orden-trabajo/orden-trabajo.component';
import { FichaComponent } from './ficha/ficha.component';
import { FichaIndComponent } from './ficha-ind/ficha-ind.component';
import { AddMotocicletaComponent } from './add-motocicleta/add-motocicleta.component';
import { AddNewActivityComponent } from './add-new-activity/add-new-activity.component';
import { AddNewProductComponent } from './add-new-product/add-new-product.component';
import { LoginComponent } from './login/login.component';
import { ClientesComponent } from './clientes/clientes.component';
import { ClienteDetalleComponent } from './cliente-detalle/cliente-detalle.component';
import { ActividadDetalleComponent } from './actividad-detalle/actividad-detalle.component';
import { NewComponent } from './new/new.component';
import { ChartsComponent } from './charts/charts.component';




const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'home', component: HomeComponent },
  { path: 'orden-trabajo', component: OrdenTrabajoComponent},
  { path: 'ficha', component: FichaComponent },
  { path: 'ficha-ind/:id', component: FichaIndComponent },
  { path: 'nueva-moto', component: AddMotocicletaComponent},
  { path: 'nueva-actividad', component: AddNewActivityComponent},
  { path: 'nuevo-producto', component: AddNewProductComponent},
  { path: 'clientes', component: ClientesComponent},
  { path: 'cliente/:id', component: ClienteDetalleComponent},
  { path: 'actividad-detalle/:id', component: ActividadDetalleComponent},
  { path: 'new', component: NewComponent},
  { path: 'charts', component:ChartsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

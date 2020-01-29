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
import { RegisterComponent } from './register/register.component';
import { ForgetpassComponent } from './forgetpass/forgetpass.component';
import { UserforgetpassComponent } from './userforgetpass/userforgetpass.component';
import { ChangepassComponent } from './changepass/changepass.component';
import { AuthGuard } from './auth.guard';


const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'register', component:RegisterComponent},
  { path: 'forgetpass', component:UserforgetpassComponent },
  { path: 'forgetpass/:user', component: ForgetpassComponent },
  { path: 'forgetpass/password/:user', component: ChangepassComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'orden-trabajo', component: OrdenTrabajoComponent, canActivate: [AuthGuard]},
  { path: 'ficha', component: FichaComponent, canActivate: [AuthGuard] },
  { path: 'ficha-ind/:id', component: FichaIndComponent, canActivate: [AuthGuard] },
  { path: 'nueva-moto', component: AddMotocicletaComponent, canActivate: [AuthGuard]},
  { path: 'nueva-actividad', component: AddNewActivityComponent, canActivate: [AuthGuard]},
  { path: 'nuevo-producto', component: AddNewProductComponent, canActivate: [AuthGuard]},
  { path: 'clientes', component: ClientesComponent, canActivate: [AuthGuard]},
  { path: 'cliente/:id', component: ClienteDetalleComponent, canActivate: [AuthGuard]},
  { path: 'actividad-detalle/:id', component: ActividadDetalleComponent, canActivate: [AuthGuard]},
  { path: 'new', component: NewComponent, canActivate: [AuthGuard]},
  { path: 'charts', component:ChartsComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarComponent } from './pages/listar/listar.component';
import { NuevoComponent } from './pages/nuevo/nuevo.component';

const routes: Routes = [
  {path:'nuevo',component:NuevoComponent},
  {path:'listar',component:ListarComponent},
  {path:'nuevo/:id/:name/:email/:address/:phone/:website/:company',component:NuevoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }

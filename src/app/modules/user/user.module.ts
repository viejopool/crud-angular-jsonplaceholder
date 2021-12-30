import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { ListarComponent } from './pages/listar/listar.component';
import { NuevoComponent } from './pages/nuevo/nuevo.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzFormModule } from 'ng-zorro-antd/form';
import { ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';

@NgModule({
  declarations: [
    ListarComponent,
    NuevoComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    NzTableModule,
    NzDividerModule,
    NzIconModule,
    NzMessageModule,
    NzFormModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzPopconfirmModule 
  ]
})
export class UserModule { }
